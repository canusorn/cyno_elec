<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Wire Gauge & Ampacity Calculator
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Calculate wire properties, current capacity, and voltage drop
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Panel -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Input Parameters
          </h2>

          <!-- AWG Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wire Gauge (AWG)
            </label>
            <select
              v-model.number="selectedAWG"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option v-for="awg in awgData" :key="awg.number" :value="awg.number">
                AWG {{ awg.number }} ({{ awg.diameter.toFixed(3) }}mm / {{ awg.area.toFixed(2) }}mm²)
              </option>
            </select>
          </div>

          <!-- Wire Material -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wire Material
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="material in materials"
                :key="material.name"
                @click="selectedMaterial = material.name"
                :class="[
                  'px-4 py-3 rounded-lg font-semibold transition-all',
                  selectedMaterial === material.name
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ material.name }}
              </button>
            </div>
          </div>

          <!-- Wire Length -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Wire Length: <span class="text-blue-600 font-bold">{{ wireLength }}</span> <span class="text-gray-500">{{ lengthUnit }}</span>
            </label>
            <input
              v-model.number="wireLength"
              type="number"
              min="0.1"
              step="0.1"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div class="flex gap-2 mt-2">
              <button
                v-for="unit in ['m', 'ft']"
                :key="unit"
                @click="lengthUnit = unit"
                :class="[
                  'px-3 py-1 rounded text-sm font-medium',
                  lengthUnit === unit
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                ]"
              >
                {{ unit }}
              </button>
            </div>
          </div>

          <!-- Current -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current: <span class="text-green-600 font-bold">{{ current }}</span> A
            </label>
            <input
              v-model.number="current"
              type="number"
              min="0.1"
              step="0.1"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              v-model.number="current"
              type="range"
              min="0.1"
              max="100"
              step="0.1"
              class="w-full h-2 mt-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <!-- Temperature Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Temperature Rating
            </label>
            <select
              v-model.number="temperatureRating"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="60">60°C (140°F) - Typical</option>
              <option :value="75">75°C (167°F) - Wet Locations</option>
              <option :value="90">90°C (194°F) - High Temperature</option>
            </select>
          </div>

          <!-- Installation Type -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Installation Type
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="type in installationTypes"
                :key="type.name"
                @click="installationType = type.name"
                :class="[
                  'px-4 py-3 rounded-lg font-medium transition-all text-sm',
                  installationType === type.name
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ type.name }}
                <span class="block text-xs opacity-75">{{ type.correction }}%</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          <!-- Wire Properties -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Wire Properties
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Diameter</p>
                <p class="text-xl font-bold text-blue-600">{{ diameter }} mm</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ diameterMils }} mils</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Cross-sectional Area</p>
                <p class="text-xl font-bold text-purple-600">{{ area }} mm²</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ areaCircularMils }} circular mils</p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Resistance ({{ lengthUnit }})</p>
                <p class="text-xl font-bold text-green-600">{{ resistance }} Ω</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ resistancePer100m }} Ω/100m</p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Weight ({{ lengthUnit }})</p>
                <p class="text-xl font-bold text-orange-600">{{ weight }} kg</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ weightPer100m }} kg/100m</p>
              </div>
            </div>
          </div>

          <!-- Ampacity & Safety -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Ampacity & Safety
            </h3>
            <div class="space-y-4">
              <div :class="['rounded-lg p-4', isCurrentSafe ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20']">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Your Current</p>
                    <p class="text-2xl font-bold" :class="isCurrentSafe ? 'text-green-600' : 'text-red-600'">{{ current }} A</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Max Ampacity</p>
                    <p class="text-2xl font-bold text-blue-600">{{ maxAmpacity }} A</p>
                  </div>
                </div>
                <div class="mt-3 flex items-center gap-2">
                  <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      class="h-3 rounded-full transition-all"
                      :class="isCurrentSafe ? 'bg-green-500' : 'bg-red-500'"
                      :style="{ width: Math.min((current / maxAmpacity) * 100, 100) + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-bold" :class="isCurrentSafe ? 'text-green-600' : 'text-red-600'">
                    {{ ((current / maxAmpacity) * 100).toFixed(0) }}%
                  </span>
                </div>
                <p v-if="!isCurrentSafe" class="mt-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                  ⚠️ Current exceeds ampacity! Use larger wire.
                </p>
              </div>

              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Temperature Rating</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-white">{{ temperatureRating }}°C</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Base Ampacity</p>
                    <p class="text-lg font-bold text-gray-900 dark:text-white">{{ baseAmpacity }} A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Voltage Drop -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Voltage Drop
            </h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                System Voltage
              </label>
              <input
                v-model.number="systemVoltage"
                type="number"
                min="1"
                step="1"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div :class="['rounded-lg p-4', voltageDropPercent < 3 ? 'bg-green-50 dark:bg-green-900/20' : voltageDropPercent < 5 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20']">
                <p class="text-sm text-gray-600 dark:text-gray-400">Voltage Drop</p>
                <p class="text-xl font-bold text-gray-900 dark:text-white">{{ voltageDrop }} V</p>
              </div>
              <div :class="['rounded-lg p-4', voltageDropPercent < 3 ? 'bg-green-50 dark:bg-green-900/20' : voltageDropPercent < 5 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20']">
                <p class="text-sm text-gray-600 dark:text-gray-400">Percentage</p>
                <p class="text-xl font-bold" :class="voltageDropPercent < 3 ? 'text-green-600' : voltageDropPercent < 5 ? 'text-yellow-600' : 'text-red-600'">
                  {{ voltageDropPercent.toFixed(2) }}%
                </p>
              </div>
            </div>
            <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-semibold">Output Voltage:</span> {{ outputVoltage }} V
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <span class="font-semibold">Power Loss:</span> {{ powerLoss }} W
              </p>
            </div>
            <p v-if="voltageDropPercent >= 5" class="mt-3 text-sm text-red-600 dark:text-red-400 font-semibold">
              ⚠️ Voltage drop exceeds 5%! Consider larger wire.
            </p>
          </div>

          <!-- AWG Reference Table -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Reference</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-semibold">AWG</th>
                    <th class="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-semibold">Diameter</th>
                    <th class="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-semibold">Area</th>
                    <th class="text-left py-2 px-3 text-gray-600 dark:text-gray-400 font-semibold">Ampacity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="awg in commonAWGs" :key="awg.number" class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td class="py-2 px-3 font-semibold text-gray-900 dark:text-white">{{ awg.number }}</td>
                    <td class="py-2 px-3 text-gray-600 dark:text-gray-300">{{ awg.diameter.toFixed(2) }}mm</td>
                    <td class="py-2 px-3 text-gray-600 dark:text-gray-300">{{ awg.area.toFixed(1) }}mm²</td>
                    <td class="py-2 px-3 text-blue-600 dark:text-blue-400 font-semibold">{{ calculateAmpacity(awg.number) }}A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Wire Gauge & Ampacity</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Concepts</h3>
            <div class="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <strong class="text-gray-900 dark:text-white">AWG (American Wire Gauge):</strong>
                <p class="text-sm mt-1">A standardized system for wire diameters. Lower AWG = thicker wire. AWG 0000 (4/0) is the thickest, AWG 40 is the thinnest.</p>
              </div>
              <div>
                <strong class="text-gray-900 dark:text-white">Ampacity:</strong>
                <p class="text-sm mt-1">The maximum current a conductor can carry continuously without exceeding its temperature rating. Depends on wire size, material, insulation, and installation conditions.</p>
              </div>
              <div>
                <strong class="text-gray-900 dark:text-white">Voltage Drop:</strong>
                <p class="text-sm mt-1">The reduction in voltage due to wire resistance. Should be kept below 3% for optimal efficiency, or below 5% maximum.</p>
              </div>
              <div>
                <strong class="text-gray-900 dark:text-white">Circular Mil:</strong>
                <p class="text-sm mt-1">A unit of area equal to the area of a circle with a diameter of one mil (0.001 inch). 1 circular mil = π/4 square mils ≈ 5.07×10⁻⁴ mm².</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Formulas</h3>
            <div class="space-y-3">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Resistance</p>
                <p class="text-lg font-mono font-bold text-blue-600">R = ρ × L / A</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">ρ = resistivity, L = length, A = cross-sectional area</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Voltage Drop</p>
                <p class="text-lg font-mono font-bold text-purple-600">Vdrop = I × R × 2</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">×2 for round-trip (both conductors)</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power Loss</p>
                <p class="text-lg font-mono font-bold text-red-600">Ploss = I² × R</p>
              </div>
            </div>

            <div class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">⚠️ Safety Guidelines</h4>
              <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Always use wire rated above your maximum current</li>
                <li>• Consider ambient temperature (derate above 30°C)</li>
                <li>• Account for voltage drop in long runs</li>
                <li>• Follow local electrical codes (NEC, IEC, etc.)</li>
                <li>• Copper is preferred over aluminum for most applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

const colorMode = useColorMode()

// AWG wire data (standard copper wire)
interface AWGData {
  number: string | number
  diameter: number // mm
  area: number // mm²
  circularMils: number
  resistancePer100m: number // Ω/100m at 20°C
  weightPer100m: number // kg/100m
}

const awgData: AWGData[] = [
  { number: '0000', diameter: 11.684, area: 107.16, circularMils: 211600, resistancePer100m: 0.0161, weightPer100m: 0.953 },
  { number: '000', diameter: 10.403, area: 85.03, circularMils: 167800, resistancePer100m: 0.0203, weightPer100m: 0.756 },
  { number: '00', diameter: 9.266, area: 67.43, circularMils: 133100, resistancePer100m: 0.0256, weightPer100m: 0.600 },
  { number: 0, diameter: 8.252, area: 53.49, circularMils: 105600, resistancePer100m: 0.0323, weightPer100m: 0.476 },
  { number: 1, diameter: 7.348, area: 42.41, circularMils: 83690, resistancePer100m: 0.0407, weightPer100m: 0.377 },
  { number: 2, diameter: 6.544, area: 33.63, circularMils: 66360, resistancePer100m: 0.0513, weightPer100m: 0.299 },
  { number: 3, diameter: 5.827, area: 26.67, circularMils: 52620, resistancePer100m: 0.0647, weightPer100m: 0.237 },
  { number: 4, diameter: 5.189, area: 21.15, circularMils: 41740, resistancePer100m: 0.0815, weightPer100m: 0.188 },
  { number: 5, diameter: 4.621, area: 16.77, circularMils: 33100, resistancePer100m: 0.1028, weightPer100m: 0.149 },
  { number: 6, diameter: 4.115, area: 13.30, circularMils: 26250, resistancePer100m: 0.1296, weightPer100m: 0.118 },
  { number: 7, diameter: 3.665, area: 10.55, circularMils: 20820, resistancePer100m: 0.1634, weightPer100m: 0.0937 },
  { number: 8, diameter: 3.264, area: 8.37, circularMils: 16510, resistancePer100m: 0.2060, weightPer100m: 0.0743 },
  { number: 9, diameter: 2.906, area: 6.63, circularMils: 13090, resistancePer100m: 0.2597, weightPer100m: 0.0589 },
  { number: 10, diameter: 2.588, area: 5.26, circularMils: 10380, resistancePer100m: 0.3275, weightPer100m: 0.0467 },
  { number: 11, diameter: 2.305, area: 4.17, circularMils: 8230, resistancePer100m: 0.4129, weightPer100m: 0.0370 },
  { number: 12, diameter: 2.053, area: 3.31, circularMils: 6530, resistancePer100m: 0.5206, weightPer100m: 0.0294 },
  { number: 13, diameter: 1.828, area: 2.62, circularMils: 5180, resistancePer100m: 0.6564, weightPer100m: 0.0233 },
  { number: 14, diameter: 1.628, area: 2.08, circularMils: 4110, resistancePer100m: 0.8278, weightPer100m: 0.0185 },
  { number: 15, diameter: 1.450, area: 1.65, circularMils: 3260, resistancePer100m: 1.0433, weightPer100m: 0.0146 },
  { number: 16, diameter: 1.291, area: 1.31, circularMils: 2580, resistancePer100m: 1.3150, weightPer100m: 0.0116 },
  { number: 17, diameter: 1.150, area: 1.04, circularMils: 2050, resistancePer100m: 1.6580, weightPer100m: 0.0092 },
  { number: 18, diameter: 1.024, area: 0.82, circularMils: 1620, resistancePer100m: 2.0900, weightPer100m: 0.0073 },
  { number: 19, diameter: 0.912, area: 0.65, circularMils: 1290, resistancePer100m: 2.6340, weightPer100m: 0.0058 },
  { number: 20, diameter: 0.812, area: 0.52, circularMils: 1020, resistancePer100m: 3.3210, weightPer100m: 0.0046 },
  { number: 21, diameter: 0.723, area: 0.41, circularMils: 812, resistancePer100m: 4.1860, weightPer100m: 0.0036 },
  { number: 22, diameter: 0.644, area: 0.33, circularMils: 642, resistancePer100m: 5.2760, weightPer100m: 0.0029 },
  { number: 23, diameter: 0.573, area: 0.26, circularMils: 511, resistancePer100m: 6.6510, weightPer100m: 0.0023 },
  { number: 24, diameter: 0.511, area: 0.20, circularMils: 404, resistancePer100m: 8.3840, weightPer100m: 0.0018 }
]

const commonAWGs = awgData.filter(awg => [10, 12, 14, 16, 18, 20, 22, 24].includes(awg.number))

// Input parameters
const selectedAWG = ref(12)
const selectedMaterial = ref('Copper')
const wireLength = ref(10)
const lengthUnit = ref('m')
const current = ref(10)
const temperatureRating = ref(75)
const installationType = ref('Free Air')
const systemVoltage = ref(120)

// Materials data
const materials = [
  { name: 'Copper', resistivity: 1.724e-8 },
  { name: 'Aluminum', resistivity: 2.65e-8 }
]

// Installation types with correction factors
const installationTypes = [
  { name: 'Free Air', correction: 100 },
  { name: 'Conduit', correction: 80 },
  { name: 'Buried', correction: 75 }
]

// Get selected AWG data
const selectedAWGData = computed(() => {
  return awgData.find(awg => awg.number === selectedAWG.value || awg.number === parseInt(selectedAWG.value as any)) || awgData[11]
})

// Wire properties
const diameter = computed(() => selectedAWGData.value.diameter)
const diameterMils = computed(() => (selectedAWGData.value.diameter / 0.0254).toFixed(1))
const area = computed(() => selectedAWGData.value.area)
const areaCircularMils = computed(() => selectedAWGData.value.circularMils)

// Calculate resistance based on material and length
const resistance = computed(() => {
  const material = materials.find(m => m.name === selectedMaterial.value) || materials[0]
  const baseResistance = selectedAWGData.value.resistancePer100m

  // Adjust for material (copper is baseline)
  const materialFactor = material.resistivity / 1.724e-8

  // Calculate based on length
  const lengthInUnits = lengthUnit.value === 'm' ? wireLength.value : wireLength.value * 0.3048
  const lengthFactor = lengthInUnits / 100

  return baseResistance * materialFactor * lengthFactor
})

const resistancePer100m = computed(() => {
  const material = materials.find(m => m.name === selectedMaterial.value) || materials[0]
  return selectedAWGData.value.resistancePer100m * (material.resistivity / 1.724e-8)
})

// Weight calculations
const weight = computed(() => {
  const lengthInUnits = lengthUnit.value === 'm' ? wireLength.value : wireLength.value * 0.3048
  const lengthFactor = lengthInUnits / 100
  return selectedAWGData.value.weightPer100m * lengthFactor
})

const weightPer100m = computed(() => selectedAWGData.value.weightPer100m)

// Ampacity calculations
const calculateAmpacity = (awg: string | number) => {
  const data = awgData.find(d => d.number === awg)
  if (!data) return 0

  // Base ampacity based on AWG (simplified NEC table for copper)
  const baseAmpacities: Record<string, number> = {
    '10': 30, '12': 20, '14': 15, '16': 10, '18': 7, '20': 5, '22': 3, '24': 2,
    '8': 40, '6': 55, '4': 70, '2': 95, '1': 110, '0': 125, '00': 145, '000': 165, '0000': 195
  }

  const awgKey = String(awg)
  let base = baseAmpacities[awgKey] || 15

  // Temperature adjustment
  const tempFactor = temperatureRating.value / 75

  // Installation type adjustment
  const installType = installationTypes.find(t => t.name === installationType.value)
  const installFactor = (installType?.correction || 100) / 100

  // Material adjustment
  const material = materials.find(m => m.name === selectedMaterial.value)
  const materialFactor = material?.name === 'Copper' ? 1 : 0.84

  return Math.round(base * tempFactor * installFactor * materialFactor)
}

const baseAmpacity = computed(() => {
  const baseAmpacities: Record<string, number> = {
    '10': 30, '12': 20, '14': 15, '16': 10, '18': 7, '20': 5, '22': 3, '24': 2,
    '8': 40, '6': 55, '4': 70, '2': 95, '1': 110, '0': 125, '00': 145, '000': 165, '0000': 195
  }
  const awgKey = String(selectedAWG.value)
  return baseAmpacities[awgKey] || 15
})

const maxAmpacity = computed(() => calculateAmpacity(selectedAWG.value))

const isCurrentSafe = computed(() => current.value <= maxAmpacity.value)

// Voltage drop calculations
const voltageDrop = computed(() => {
  // Round trip (2 conductors)
  return current.value * resistance.value * 2
})

const voltageDropPercent = computed(() => {
  return (voltageDrop.value / systemVoltage.value) * 100
})

const outputVoltage = computed(() => {
  return systemVoltage.value - voltageDrop.value
})

const powerLoss = computed(() => {
  return current.value * current.value * resistance.value * 2
})

// SEO
useHead({
  title: 'Wire Gauge & Ampacity Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate wire gauge, ampacity, voltage drop, and resistance for electrical wiring projects.' }
  ]
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent inductance for inductors in series or parallel configurations
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col items-center gap-3 text-xl font-mono font-bold">
              <div v-if="mode === 'series'" class="flex items-center gap-3">
                <span class="text-primary-highlight">L_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">L1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">L2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div v-else class="flex items-center gap-3">
                <span class="text-primary-highlight">1/L_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">1/L1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">1/L2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">

          <!-- Mode Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select Configuration</h3>
            <div class="flex gap-4">
              <button
                @click="mode = 'series'"
                :class="mode === 'series' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Series
              </button>
              <button
                @click="mode = 'parallel'"
                :class="mode === 'parallel' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Parallel
              </button>
            </div>
          </div>

          <!-- Inductor Input Section -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Inductors</h3>
              <div class="flex gap-2">
                <button
                  @click="addInductor"
                  :disabled="inductors.length >= 10"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Inductor
                </button>
                <button
                  @click="resetInductors"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <!-- Inductor Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div
                v-for="(inductor, index) in inductors"
                :key="index"
                :class="[
                  'bg-gradient-to-br rounded-xl p-4 shadow-md transition-all duration-200 hover:shadow-lg',
                  colorMap[index % 10].gradient
                ]"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <div :class="['w-4 h-4 rounded-full', colorMap[index % 10].solid]"></div>
                    <span class="font-bold text-gray-900 dark:text-white">L{{ index + 1 }}</span>
                  </div>
                  <button
                    @click="removeInductor(index)"
                    :disabled="inductors.length <= 2"
                    class="p-1 text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div class="space-y-3">
                  <!-- Value Input -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Inductance Value
                    </label>
                    <div class="flex gap-2">
                      <input
                        v-model.number="inductor.value"
                        type="number"
                        min="0.001"
                        step="0.001"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter value"
                      />
                      <select
                        v-model="inductor.unit"
                        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="pH">pH</option>
                        <option value="nH">nH</option>
                        <option value="μH">μH</option>
                        <option value="mH">mH</option>
                        <option value="H">H</option>
                      </select>
                    </div>
                  </div>

                  <!-- Quick Presets -->
                  <div>
                    <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Common Values
                    </label>
                    <select
                      @change="setInductorValue(index, $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select preset...</option>
                      <option v-for="preset in commonInductors" :key="preset" :value="preset">
                        {{ preset }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Circuit Presets -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Circuit Presets</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  @click="loadPreset('filter')"
                  class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  LC Filter
                </button>
                <button
                  @click="loadPreset('oscillator')"
                  class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  Oscillator
                </button>
                <button
                  @click="loadPreset('power')"
                  class="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  Power Supply
                </button>
                <button
                  @click="loadPreset('rf')"
                  class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  RF Circuit
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Results Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Circuit Diagram -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circuit Diagram</h4>
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
                <svg viewBox="0 0 400 250" class="w-full h-auto">
                  <g v-if="mode === 'series'">
                    <!-- Series circuit -->
                    <line x1="50" y1="125" x2="350" y2="125" stroke="#6B7280" stroke-width="3" />
                    <line x1="50" y1="50" x2="50" y2="200" stroke="#6B7280" stroke-width="3" />
                    <line x1="350" y1="50" x2="350" y2="200" stroke="#6B7280" stroke-width="3" />

                    <!-- Inductors in series -->
                    <g v-for="(inductor, index) in inductors.slice(0, 5)" :key="index">
                      <g :transform="`translate(${80 + index * 50}, 125)`">
                        <path
                          d="M 0 -20 Q 8 -18, 8 -14 Q 8 -10, 0 -8 Q -8 -6, -8 -2 Q -8 2, 0 4 Q 8 6, 8 10 Q 8 14, 0 20"
                          fill="none"
                          :stroke="colorMap[index % 10].stroke"
                          stroke-width="3"
                          stroke-linecap="round"
                        />
                        <text
                          x="0"
                          y="-35"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="#374151"
                        >L{{ index + 1 }}</text>
                      </g>
                    </g>

                    <!-- More indicator -->
                    <g v-if="inductors.length > 5">
                      <text x="280" y="130" text-anchor="middle" font-size="14" fill="#6B7280">
                        +{{ inductors.length - 5 }}
                      </text>
                    </g>
                  </g>

                  <g v-else>
                    <!-- Parallel circuit -->
                    <line x1="50" y1="40" x2="350" y2="40" stroke="#6B7280" stroke-width="3" />
                    <line x1="50" y1="210" x2="350" y2="210" stroke="#6B7280" stroke-width="3" />
                    <line x1="50" y1="40" x2="50" y2="210" stroke="#6B7280" stroke-width="3" />
                    <line x1="350" y1="40" x2="350" y2="210" stroke="#6B7280" stroke-width="3" />

                    <!-- Inductors in parallel -->
                    <g v-for="(inductor, index) in inductors.slice(0, 5)" :key="index">
                      <g :transform="`translate(${70 + index * 55}, 125)`">
                        <line x1="0" y1="-85" x2="0" y2="-30" :stroke="colorMap[index % 10].stroke" stroke-width="2" />
                        <path
                          d="M 0 -30 Q 8 -28, 8 -24 Q 8 -20, 0 -18 Q -8 -16, -8 -12 Q -8 -8, 0 -6 Q 8 -4, 8 0 Q 8 4, 0 6 Q -8 8, -8 12 Q -8 16, 0 18 Q 8 20, 8 24 Q 8 28, 0 30"
                          fill="none"
                          :stroke="colorMap[index % 10].stroke"
                          stroke-width="3"
                          stroke-linecap="round"
                        />
                        <line x1="0" y1="30" x2="0" y2="85" :stroke="colorMap[index % 10].stroke" stroke-width="2" />
                        <text
                          x="0"
                          y="-95"
                          text-anchor="middle"
                          font-size="12"
                          font-weight="bold"
                          fill="#374151"
                        >L{{ index + 1 }}</text>
                      </g>
                    </g>

                    <!-- More indicator -->
                    <g v-if="inductors.length > 5">
                      <text x="330" y="130" text-anchor="middle" font-size="14" fill="#6B7280">
                        +{{ inductors.length - 5 }}
                      </text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Calculation Results -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Equivalent Inductance</h4>
              <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 mb-4">
                <div class="text-center">
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ formattedTotalInductance }}
                  </div>
                  <div class="text-lg text-gray-600 dark:text-gray-400">
                    {{ optimalUnit }}
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div class="text-sm text-gray-600 dark:text-gray-400">In Henrys (H)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ totalInductanceInHenries.toFixed(9) }} H
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div class="text-sm text-gray-600 dark:text-gray-400">Configuration</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white capitalize">
                    {{ mode }}
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div class="text-sm text-gray-600 dark:text-gray-400">Number of Inductors</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ inductors.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Calculation Breakdown -->
          <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Breakdown</h4>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="space-y-2 font-mono text-sm">
                <div v-for="(inductor, index) in inductors" :key="index" class="flex items-center gap-2">
                  <div :class="['w-3 h-3 rounded-full', colorMap[index % 10].solid]"></div>
                  <span class="text-gray-700 dark:text-gray-300">
                    L{{ index + 1 }} = {{ formatInductance(inductor.value, inductor.unit) }}
                  </span>
                  <span class="text-gray-500">= {{ inductor.value }} {{ inductor.unit }}</span>
                </div>
                <div class="border-t border-gray-300 dark:border-gray-600 my-2 pt-2"></div>
                <div class="text-lg font-bold text-primary">
                  L_total = {{ calculationSteps }}
                </div>
                <div class="text-lg font-bold text-primary">
                  L_total = {{ totalInductanceInHenries.toFixed(9) }} H
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Inductor Combinations
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series Inductors</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When inductors are connected in series, the total inductance is the sum of all individual inductances. This is because the magnetic flux linkage adds up.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              L_total = L1 + L2 + L3 + ...
            </div>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Total inductance is <strong>greater</strong> than any individual inductor</li>
              <li>Current is the <strong>same</strong> through all inductors</li>
              <li>Used when higher inductance is needed</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Parallel Inductors</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When inductors are connected in parallel, the reciprocal of the total inductance equals the sum of the reciprocals of individual inductances.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              1/L_total = 1/L1 + 1/L2 + 1/L3 + ...
            </div>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Total inductance is <strong>less</strong> than the smallest inductor</li>
              <li>Voltage is the <strong>same</strong> across all inductors</li>
              <li>Used when lower inductance or higher current handling is needed</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Mutual Inductance Consideration</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Note:</strong> These formulas assume no mutual inductance between the inductors. If inductors are placed close together and share magnetic flux, mutual inductance (M) must be considered:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-1">
              <div>Series aiding: L_total = L1 + L2 + 2M</div>
              <div>Series opposing: L_total = L1 + L2 - 2M</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>LC Filters:</strong> Series inductors for low-pass filters</li>
              <li><strong>Power Supplies:</strong> Parallel inductors for higher current capacity</li>
              <li><strong>RF Circuits:</strong> Inductor arrays for impedance matching</li>
              <li><strong>Oscillators:</strong> Tank circuits with precise inductance values</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import { computed, ref } from 'vue'

// SEO
useHead({
  title: 'Inductance Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate equivalent inductance for inductors in series or parallel configurations with unit conversion.' },
    { name: 'keywords', content: 'inductance calculator, inductor series, inductor parallel, inductance conversion' }
  ]
})

const colorMode = useColorMode()

// Reactive state
const mode = ref<'series' | 'parallel'>('series')

interface Inductor {
  value: number
  unit: string
}

const inductors = ref<Inductor[]>([
  { value: 10, unit: 'μH' },
  { value: 22, unit: 'μH' },
  { value: 47, unit: 'μH' }
])

// Common inductor values (E6 series)
const commonInductors = [
  '1 pH', '10 pH', '100 pH', '1 nH', '10 nH', '100 nH',
  '1 μH', '2.2 μH', '4.7 μH', '10 μH', '22 μH', '47 μH',
  '100 μH', '220 μH', '470 μH', '1 mH', '2.2 mH', '4.7 mH',
  '10 mH', '22 mH', '47 mH', '100 mH', '220 mH', '470 mH',
  '1 H', '2.2 H', '4.7 H', '10 H'
]

// Color map for inductor visualization
const colorMap = [
  {
    gradient: 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30',
    solid: 'bg-red-500',
    stroke: '#EF4444'
  },
  {
    gradient: 'from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
    solid: 'bg-orange-500',
    stroke: '#F97316'
  },
  {
    gradient: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30',
    solid: 'bg-amber-500',
    stroke: '#F59E0B'
  },
  {
    gradient: 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
    solid: 'bg-green-500',
    stroke: '#22C55E'
  },
  {
    gradient: 'from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30',
    solid: 'bg-teal-500',
    stroke: '#14B8A6'
  },
  {
    gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
    solid: 'bg-blue-500',
    stroke: '#3B82F6'
  },
  {
    gradient: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30',
    solid: 'bg-indigo-500',
    stroke: '#6366F1'
  },
  {
    gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
    solid: 'bg-purple-500',
    stroke: '#A855F7'
  },
  {
    gradient: 'from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30',
    solid: 'bg-pink-500',
    stroke: '#EC4899'
  },
  {
    gradient: 'from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30',
    solid: 'bg-cyan-500',
    stroke: '#06B6D4'
  }
]

// Unit conversion factors to Henrys
const unitFactors: Record<string, number> = {
  'pH': 1e-12,
  'nH': 1e-9,
  'μH': 1e-6,
  'mH': 1e-3,
  'H': 1
}

// Convert inductance to Henrys
const toHenries = (value: number, unit: string): number => {
  return value * unitFactors[unit]
}

// Format inductance for display
const formatInductance = (value: number, unit: string): string => {
  if (value === 0) return '0 H'

  const henries = toHenries(value, unit)

  // Find optimal unit
  const units = ['pH', 'nH', 'μH', 'mH', 'H']
  const thresholds = [1e-12, 1e-9, 1e-6, 1e-3, 1]

  for (let i = 0; i < units.length; i++) {
    if (henries < thresholds[i] * 1000 || i === units.length - 1) {
      const displayValue = henries / thresholds[i]
      if (displayValue >= 0.001) {
        return `${displayValue.toFixed(3)} ${units[i]}`
      }
    }
  }

  return `${henries.toFixed(9)} H`
}

// Calculate total inductance in Henrys
const totalInductanceInHenries = computed(() => {
  if (mode.value === 'series') {
    // Series: L_total = L1 + L2 + ...
    return inductors.value.reduce((sum, ind) => {
      return sum + toHenries(ind.value, ind.unit)
    }, 0)
  } else {
    // Parallel: 1/L_total = 1/L1 + 1/L2 + ...
    const reciprocalSum = inductors.value.reduce((sum, ind) => {
      const henries = toHenries(ind.value, ind.unit)
      if (henries === 0) return sum
      return sum + (1 / henries)
    }, 0)

    if (reciprocalSum === 0) return 0
    return 1 / reciprocalSum
  }
})

// Optimal unit for display
const optimalUnit = computed(() => {
  const henries = totalInductanceInHenries.value

  if (henries === 0) return 'H'

  const units = ['pH', 'nH', 'μH', 'mH', 'H']
  const thresholds = [1e-12, 1e-9, 1e-6, 1e-3, 1]

  for (let i = 0; i < units.length; i++) {
    if (henries < thresholds[i] * 1000 || i === units.length - 1) {
      return units[i]
    }
  }

  return 'H'
})

// Formatted total inductance
const formattedTotalInductance = computed(() => {
  const henries = totalInductanceInHenries.value
  const unit = optimalUnit.value
  const displayValue = henries / unitFactors[unit]

  if (displayValue >= 1000) {
    return displayValue.toExponential(3)
  }

  return displayValue.toFixed(3)
})

// Calculation steps
const calculationSteps = computed(() => {
  const henriesList = inductors.value.map(ind => toHenries(ind.value, ind.unit))

  if (mode.value === 'series') {
    const sum = henriesList.join(' + ')
    return sum
  } else {
    const reciprocals = henriesList.map(h => `1/${h.toExponential(2)}`).join(' + ')
    return `1/(${reciprocals})`
  }
})

// Methods
const addInductor = () => {
  if (inductors.value.length < 10) {
    inductors.value.push({ value: 10, unit: 'μH' })
  }
}

const removeInductor = (index: number) => {
  if (inductors.value.length > 2) {
    inductors.value.splice(index, 1)
  }
}

const resetInductors = () => {
  inductors.value = [
    { value: 10, unit: 'μH' },
    { value: 22, unit: 'μH' },
    { value: 47, unit: 'μH' }
  ]
}

const setInductorValue = (index: number, valueStr: string) => {
  if (!valueStr) return

  const match = valueStr.match(/^([\d.]+)\s+(\w+)$/)
  if (match) {
    const [, value, unit] = match
    inductors.value[index].value = parseFloat(value)
    inductors.value[index].unit = unit
  }
}

const loadPreset = (preset: string) => {
  switch (preset) {
    case 'filter':
      mode.value = 'series'
      inductors.value = [
        { value: 10, unit: 'μH' },
        { value: 100, unit: 'μH' }
      ]
      break
    case 'oscillator':
      mode.value = 'parallel'
      inductors.value = [
        { value: 47, unit: 'μH' },
        { value: 100, unit: 'μH' }
      ]
      break
    case 'power':
      mode.value = 'parallel'
      inductors.value = [
        { value: 100, unit: 'μH' },
        { value: 220, unit: 'μH' },
        { value: 470, unit: 'μH' }
      ]
      break
    case 'rf':
      mode.value = 'series'
      inductors.value = [
        { value: 1, unit: 'nH' },
        { value: 2.2, unit: 'nH' },
        { value: 4.7, unit: 'nH' }
      ]
      break
  }
}
</script>

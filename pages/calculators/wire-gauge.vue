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
            Wire Gauge Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate current capacity, voltage drop, and select the right wire gauge for your project
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive Wire Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔌 Wire Cross-Section Comparison
          </h3>
          
          <!-- Wire Size Visualization -->
          <div class="flex justify-center items-end gap-4 mb-8 h-64">
            <!-- Selected Wire -->
            <div class="flex flex-col items-center">
              <div 
                class="rounded-full border-4 border-primary shadow-lg transition-all duration-500 flex items-center justify-center"
                :style="{ 
                  width: `${Math.min(selectedWireDiameter * 10, 150)}px`, 
                  height: `${Math.min(selectedWireDiameter * 10, 150)}px`,
                  backgroundColor: wireColor 
                }"
              >
                <span class="text-xs font-bold text-white text-shadow">{{ selectedAWG }} AWG</span>
              </div>
              <p class="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Selected Wire</p>
              <p class="text-xs text-gray-500">{{ selectedWireDiameter.toFixed(2) }} mm diameter</p>
            </div>
            
            <!-- Reference Wires -->
            <div class="flex flex-col items-center">
              <div 
                class="rounded-full border-2 border-gray-400 opacity-50"
                :style="{ 
                  width: '30px', 
                  height: '30px',
                  backgroundColor: '#c0c0c0' 
                }"
              ></div>
              <p class="mt-2 text-xs text-gray-500">24 AWG</p>
            </div>
            
            <div class="flex flex-col items-center">
              <div 
                class="rounded-full border-2 border-gray-400 opacity-50"
                :style="{ 
                  width: '60px', 
                  height: '60px',
                  backgroundColor: '#c0c0c0' 
                }"
              ></div>
              <p class="mt-2 text-xs text-gray-500">18 AWG</p>
            </div>
            
            <div class="flex flex-col items-center">
              <div 
                class="rounded-full border-2 border-gray-400 opacity-50"
                :style="{ 
                  width: '100px', 
                  height: '100px',
                  backgroundColor: '#c0c0c0' 
                }"
              ></div>
              <p class="mt-2 text-xs text-gray-500">12 AWG</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Input Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Current Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current (A)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="current"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">A</span>
                </div>
                <input 
                  v-model.number="current"
                  type="range"
                  min="0.1"
                  max="50"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Wire Length -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wire Length
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="wireLength"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select 
                    v-model="lengthUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="m">meters</option>
                    <option value="ft">feet</option>
                  </select>
                </div>
                <input 
                  v-model.number="wireLength"
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  System Voltage (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="voltage"
                    type="number" 
                    step="0.1"
                    min="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="voltage"
                  type="range"
                  min="1"
                  max="240"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Material Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wire Material
                </label>
                <select 
                  v-model="material"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="copper">Copper (most common)</option>
                  <option value="aluminum">Aluminum (lighter)</option>
                  <option value="gold">Gold (corrosion resistant)</option>
                  <option value="silver">Silver (best conductor)</option>
                </select>
              </div>

              <!-- Temperature Rating -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temperature Rating
                </label>
                <select 
                  v-model="temperatureRating"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="60">60°C (140°F) - Standard</option>
                  <option value="75">75°C (167°F) - Moisture Resistant</option>
                  <option value="90">90°C (194°F) - High Temperature</option>
                </select>
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="applyPreset('automotive')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Automotive (12V)
                  </button>
                  <button 
                    @click="applyPreset('household')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Household (120V)
                  </button>
                  <button 
                    @click="applyPreset('lowVoltage')"
                    class="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Low Voltage (5V)
                  </button>
                  <button 
                    @click="applyPreset('industrial')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Industrial (240V)
                  </button>
                </div>
              </div>
            </div>

            <!-- Results Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculated Results</h3>
              
              <!-- Recommended Gauge -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4 mb-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Recommended Wire Gauge</p>
                <p class="text-3xl font-bold text-primary">
                  {{ recommendedAWG }} AWG
                </p>
                <p v-if="!isSafe" class="text-sm text-red-600 dark:text-red-400 mt-2">
                  ⚠️ Warning: Current exceeds safe capacity!
                </p>
              </div>

              <!-- Wire Properties -->
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Wire Diameter</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ selectedWireDiameter.toFixed(2) }} mm</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Cross-Section Area</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ selectedWireArea.toFixed(2) }} mm²</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Max Current Capacity</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ maxCurrentCapacity.toFixed(1) }} A</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Wire Resistance</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ wireResistance.toFixed(3) }} Ω</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Voltage Drop</span>
                  <span :class="['font-bold', voltageDropClass]">
                    {{ voltageDrop.toFixed(2) }} V ({{ voltageDropPercentage.toFixed(1) }}%)
                  </span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Power Loss</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ powerLoss.toFixed(2) }} W</span>
                </div>
              </div>

              <!-- Safety Status -->
              <div :class="['mt-4 p-4 rounded-lg', safetyClass]">
                <p class="font-bold text-lg mb-2">{{ safetyMessage }}</p>
                <p class="text-sm">{{ safetyDescription }}</p>
              </div>

              <!-- AWG Reference Table -->
              <div class="mt-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Common AWG Sizes</h4>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">AWG</th>
                        <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Diameter (mm)</th>
                        <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Area (mm²)</th>
                        <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Max Current (A)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="awg in commonAWG" :key="awg.size" 
                          :class="{'bg-primary/20': awg.size === recommendedAWG}"
                          class="border-b border-gray-200 dark:border-gray-700">
                        <td class="px-3 py-2 font-medium">{{ awg.size }} AWG</td>
                        <td class="px-3 py-2">{{ awg.diameter.toFixed(2) }}</td>
                        <td class="px-3 py-2">{{ awg.area.toFixed(2) }}</td>
                        <td class="px-3 py-2">{{ awg.maxCurrent }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Wire Gauge</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">What is AWG?</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                AWG (American Wire Gauge) is a standardized wire gauge system used in the United States and other countries. 
                The gauge number is inversely related to the wire diameter - <strong>smaller AWG numbers mean thicker wires</strong>.
              </p>
              
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Formulas</h4>
              <div class="space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="font-mono text-sm">
                  Resistance: R = (ρ × L) / A
                </p>
                <p class="font-mono text-sm">
                  Voltage Drop: V_drop = I × R
                </p>
                <p class="font-mono text-sm">
                  Power Loss: P_loss = I² × R
                </p>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Where: ρ = resistivity, L = length, A = cross-sectional area, I = current
                </p>
              </div>
            </div>
            
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Design Tips</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Keep voltage drop below 3% for power circuits</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Use temperature-rated wire for harsh environments</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Consider both current capacity and voltage drop</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Aluminum wire needs larger gauge than copper for same current</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Always follow local electrical codes and standards</span>
                </li>
              </ul>
              
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 mt-6">Common Applications</h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                  <span class="font-medium">18-22 AWG:</span> Low voltage signals
                </div>
                <div class="bg-green-50 dark:bg-green-900/30 p-2 rounded">
                  <span class="font-medium">14-16 AWG:</span> Automotive, lighting
                </div>
                <div class="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded">
                  <span class="font-medium">10-12 AWG:</span> Household outlets
                </div>
                <div class="bg-red-50 dark:bg-red-900/30 p-2 rounded">
                  <span class="font-medium">6-8 AWG:</span> High power appliances
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Wire Gauge Calculator - Cyno Electric © 2026</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input values
const current = ref(5)
const wireLength = ref(10)
const voltage = ref(12)
const lengthUnit = ref('m')
const material = ref('copper')
const temperatureRating = ref(60)

// AWG wire data (diameter in mm, area in mm², max current in A at 60°C)
const awgData = {
  0: { diameter: 8.25, area: 53.5, maxCurrent: 150 },
  2: { diameter: 6.54, area: 33.6, maxCurrent: 115 },
  4: { diameter: 5.19, area: 21.2, maxCurrent: 95 },
  6: { diameter: 4.11, area: 13.3, maxCurrent: 75 },
  8: { diameter: 3.26, area: 8.37, maxCurrent: 55 },
  10: { diameter: 2.59, area: 5.26, maxCurrent: 40 },
  12: { diameter: 2.05, area: 3.31, maxCurrent: 30 },
  14: { diameter: 1.63, area: 2.08, maxCurrent: 20 },
  16: { diameter: 1.29, area: 1.31, maxCurrent: 15 },
  18: { diameter: 1.02, area: 0.823, maxCurrent: 10 },
  20: { diameter: 0.812, area: 0.518, maxCurrent: 7.5 },
  22: { diameter: 0.644, area: 0.326, maxCurrent: 5 },
  24: { diameter: 0.511, area: 0.205, maxCurrent: 3.5 },
  26: { diameter: 0.405, area: 0.129, maxCurrent: 2.2 },
  28: { diameter: 0.321, area: 0.081, maxCurrent: 1.5 }
}

// Material resistivity (Ω·m at 20°C)
const materialResistivity = {
  copper: 1.68e-8,
  aluminum: 2.65e-8,
  gold: 2.44e-8,
  silver: 1.59e-8
}

// Temperature derating factors
const tempDerating = {
  60: 1.0,
  75: 1.15,
  90: 1.25
}

// Common AWG reference table
const commonAWG = computed(() => {
  return [
    { size: 18, diameter: 1.02, area: 0.823, maxCurrent: 10 },
    { size: 16, diameter: 1.29, area: 1.31, maxCurrent: 15 },
    { size: 14, diameter: 1.63, area: 2.08, maxCurrent: 20 },
    { size: 12, diameter: 2.05, area: 3.31, maxCurrent: 30 },
    { size: 10, diameter: 2.59, area: 5.26, maxCurrent: 40 },
    { size: 8, diameter: 3.26, area: 8.37, maxCurrent: 55 },
    { size: 6, diameter: 4.11, area: 13.3, maxCurrent: 75 },
    { size: 4, diameter: 5.19, area: 21.2, maxCurrent: 95 }
  ]
})

// Calculate recommended AWG based on current
const recommendedAWG = computed(() => {
  const adjustedCurrent = current.value / tempDerating[temperatureRating.value]
  
  // Find the smallest AWG that can handle the current
  for (const [awg, data] of Object.entries(awgData)) {
    if (data.maxCurrent >= adjustedCurrent) {
      return parseInt(awg)
    }
  }
  return 0 // Return 0 AWG if current exceeds all standard sizes
})

// Selected wire properties
const selectedAWG = computed(() => recommendedAWG.value)
const selectedWireData = computed(() => awgData[selectedAWG.value])
const selectedWireDiameter = computed(() => selectedWireData.value.diameter)
const selectedWireArea = computed(() => selectedWireData.value.area)

// Wire resistance calculation
const wireResistance = computed(() => {
  const lengthMeters = lengthUnit.value === 'ft' ? wireLength.value * 0.3048 : wireLength.value
  const resistivity = materialResistivity[material.value]
  const area = selectedWireArea.value * 1e-6 // Convert mm² to m²
  
  return (resistivity * lengthMeters * 2) / area // Round trip (2-way)
})

// Maximum current capacity
const maxCurrentCapacity = computed(() => {
  return selectedWireData.value.maxCurrent * tempDerating[temperatureRating.value]
})

// Voltage drop
const voltageDrop = computed(() => {
  return current.value * wireResistance.value
})

// Voltage drop percentage
const voltageDropPercentage = computed(() => {
  return (voltageDrop.value / voltage.value) * 100
})

// Power loss
const powerLoss = computed(() => {
  return Math.pow(current.value, 2) * wireResistance.value
})

// Safety checks
const isSafe = computed(() => {
  return current.value <= maxCurrentCapacity.value && voltageDropPercentage.value <= 3
})

const safetyClass = computed(() => {
  if (isSafe.value) {
    return 'bg-green-100 dark:bg-green-900/30 border border-green-500'
  } else if (current.value > maxCurrentCapacity.value) {
    return 'bg-red-100 dark:bg-red-900/30 border border-red-500'
  } else {
    return 'bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-500'
  }
})

const safetyMessage = computed(() => {
  if (isSafe.value) {
    return '✅ Safe Design'
  } else if (current.value > maxCurrentCapacity.value) {
    return '⚠️ Current Overload!'
  } else {
    return '⚠️ Excessive Voltage Drop!'
  }
})

const safetyDescription = computed(() => {
  if (isSafe.value) {
    return 'The selected wire gauge safely handles your current with minimal voltage drop.'
  } else if (current.value > maxCurrentCapacity.value) {
    return `Current (${current.value}A) exceeds maximum capacity (${maxCurrentCapacity.value.toFixed(1)}A). Use a larger gauge wire.`
  } else {
    return `Voltage drop (${voltageDropPercentage.value.toFixed(1)}%) exceeds recommended 3% limit. Consider larger wire or shorter length.`
  }
})

const voltageDropClass = computed(() => {
  if (voltageDropPercentage.value <= 2) {
    return 'text-green-600 dark:text-green-400'
  } else if (voltageDropPercentage.value <= 3) {
    return 'text-yellow-600 dark:text-yellow-400'
  } else {
    return 'text-red-600 dark:text-red-400'
  }
})

// Wire color based on material
const wireColor = computed(() => {
  const colors = {
    copper: '#b87333',
    aluminum: '#a0a0a0',
    gold: '#ffd700',
    silver: '#c0c0c0'
  }
  return colors[material.value]
})

// Preset configurations
const applyPreset = (preset) => {
  switch (preset) {
    case 'automotive':
      voltage.value = 12
      current.value = 10
      wireLength.value = 5
      lengthUnit.value = 'm'
      temperatureRating.value = 75
      break
    case 'household':
      voltage.value = 120
      current.value = 15
      wireLength.value = 30
      lengthUnit.value = 'ft'
      temperatureRating.value = 75
      break
    case 'lowVoltage':
      voltage.value = 5
      current.value = 2
      wireLength.value = 3
      lengthUnit.value = 'm'
      temperatureRating.value = 60
      break
    case 'industrial':
      voltage.value = 240
      current.value = 30
      wireLength.value = 50
      lengthUnit.value = 'ft'
      temperatureRating.value = 90
      break
  }
}

// Format number helper
const formatNumber = (num) => {
  return num.toFixed(2)
}
</script>

<style scoped>
.slider-primary {
  accent-color: #7986CB;
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>

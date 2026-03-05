<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Reactive state
const vcc = ref(12) // Volts
const referenceCurrent = ref(1) // mA
const betaNPN = ref(100) // Current gain
const earlyVoltage = ref(100) // Volts
const outputResistance = ref(10000) // Ohms
const loadResistance = ref(1000) // Ohms

// Calculated values
const referenceResistor = computed(() => {
  if (referenceCurrent.value === 0) return 0
  // R_ref = (Vcc - V_be) / I_ref
  // V_be ≈ 0.7V for silicon transistor
  const Vbe = 0.7
  const R_ref = (vcc.value - Vbe) / (referenceCurrent.value / 1000)
  return R_ref
})

const outputCurrent = computed(() => {
  if (referenceCurrent.value === 0) return 0
  // I_out = I_ref * (1 / (1 + 2/β))
  // Factor for base current error
  const betaFactor = 1 / (1 + 2 / betaNPN.value)
  I_out = referenceCurrent.value * betaFactor
  return I_out
})

const outputVoltage = computed(() => {
  // V_out = I_out * R_load
  const V_out = (outputCurrent.value / 1000) * loadResistance.value
  return V_out
})

const collectorVoltage = computed(() => {
  // V_c = Vcc - V_out
  const V_c = vcc.value - outputVoltage.value
  return V_c
})

const complianceVoltage = computed(() => {
  // Minimum voltage needed for proper operation
  // V_out(min) = V_ce(sat) ≈ 0.3V
  return 0.3
})

const isInCompliance = computed(() => {
  return collectorVoltage.value > complianceVoltage.value
})

const baseCurrent = computed(() => {
  // I_b = I_out / β
  if (betaNPN.value === 0) return 0
  const I_b = outputCurrent.value / betaNPN.value
  return I_b
})

const outputCurrentWithError = computed(() => {
  // Include Early effect
  // I_out = I_ref * (1 + V_ce / V_A) / (1 + 2/β)
  const betaFactor = 1 / (1 + 2 / betaNPN.value)
  const earlyFactor = 1 + (collectorVoltage.value / earlyVoltage.value)
  const I_out_with_error = referenceCurrent.value * betaFactor * earlyFactor
  return I_out_with_error
})

const errorPercent = computed(() => {
  if (referenceCurrent.value === 0) return 0
  const error = ((outputCurrentWithError.value - referenceCurrent.value) / referenceCurrent.value) * 100
  return error
})

// Animated current flow
const currentFlow = ref(0)
setInterval(() => {
  currentFlow.value = (currentFlow.value + 1) % 20
}, 100)

// Format functions
const formatVoltage = (val: number) => {
  return `${val.toFixed(2)} V`
}

const formatCurrent = (val: number) => {
  if (Math.abs(val) < 1) return `${(val * 1000).toFixed(2)} µA`
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(2)} A`
  return `${val.toFixed(2)} mA`
}

const formatResistance = (val: number) => {
  if (Math.abs(val) >= 1000000) return `${(val / 1000000).toFixed(2)} MΩ`
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(2)} kΩ`
  return `${val.toFixed(2)} Ω`
}

// Preset configurations
const presets = {
  'basic': () => {
    vcc.value = 12
    referenceCurrent.value = 1
    betaNPN.value = 100
    earlyVoltage.value = 100
    outputResistance.value = 10000
    loadResistance.value = 1000
  },
  'high-beta': () => {
    vcc.value = 12
    referenceCurrent.value = 1
    betaNPN.value = 200
    earlyVoltage.value = 100
    outputResistance.value = 10000
    loadResistance.value = 1000
  },
  'low-voltage': () => {
    vcc.value = 3.3
    referenceCurrent.value = 0.5
    betaNPN.value = 100
    earlyVoltage.value = 50
    outputResistance.value = 5000
    loadResistance.value = 500
  },
  'precision': () => {
    vcc.value = 12
    referenceCurrent.value = 1
    betaNPN.value = 300
    earlyVoltage.value = 150
    outputResistance.value = 50000
    loadResistance.value = 2000
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <section class="relative pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-6">
            🔄 Current Mirror Circuit
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore bipolar transistor current mirror with configurable parameters and real-time visualization
          </p>
          
          <!-- Current Mirror Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 inline-block mb-8 shadow-lg">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-xl font-mono font-bold">
                <span class="text-emerald-600 dark:text-emerald-400">I<sub>out</sub></span>
                <span class="text-gray-400">≈</span>
                <span class="text-emerald-600 dark:text-emerald-400">I<sub>ref</sub></span>
              </div>
              <div class="flex items-center gap-3 text-lg font-mono text-gray-600 dark:text-gray-400">
                <span>I<sub>out</sub></span>
                <span class="text-gray-400">=</span>
                <span>I<sub>ref</sub> / (1 + 2/β)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
              <!-- VCC Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Supply Voltage (V<sub>CC</sub>)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="vcc"
                    min="1" 
                    max="24" 
                    step="0.1"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="vcc"
                    min="1" 
                    max="50"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">V</span>
                </div>
              </div>

              <!-- Reference Current Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reference Current (I<sub>ref</sub>)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="referenceCurrent"
                    min="0.01" 
                    max="10" 
                    step="0.01"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="referenceCurrent"
                    min="0.01" 
                    max="100"
                    step="0.01"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">mA</span>
                </div>
              </div>

              <!-- Beta (Current Gain) Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transistor β (h<sub>FE</sub>)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="betaNPN"
                    min="20" 
                    max="500" 
                    step="5"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="betaNPN"
                    min="20" 
                    max="1000"
                    step="5"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical: 50-300 for general purpose NPN
                </p>
              </div>

              <!-- Early Voltage Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Early Voltage (V<sub>A</sub>)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="earlyVoltage"
                    min="20" 
                    max="200" 
                    step="5"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="earlyVoltage"
                    min="20" 
                    max="500"
                    step="5"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">V</span>
                </div>
              </div>

              <!-- Load Resistance Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistance (R<sub>L</sub>)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="loadResistance"
                    min="100" 
                    max="10000" 
                    step="100"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="loadResistance"
                    min="100" 
                    max="100000"
                    step="100"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Ω</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current: {{ formatResistance(loadResistance) }}
                </p>
              </div>

              <!-- Quick Presets -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="presets['basic']()"
                    class="px-3 py-2 text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
                  >
                    Basic Mirror
                  </button>
                  <button 
                    @click="presets['high-beta']()"
                    class="px-3 py-2 text-sm bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
                  >
                    High Beta
                  </button>
                  <button 
                    @click="presets['low-voltage']()"
                    class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Low Voltage
                  </button>
                  <button 
                    @click="presets['precision']()"
                    class="px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    Precision
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results & Visualization -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Current Mirror Circuit
              </h3>
              
              <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
                <svg viewBox="0 0 600 350" class="w-full h-auto">
                  <!-- Background Grid -->
                  <defs>
                    <pattern id="gridMirror" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.3" class="text-gray-300 dark:text-gray-600"/>
                    </pattern>
                    <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="350" fill="url(#gridMirror)" />
                  
                  <!-- VCC Line -->
                  <line x1="50" y1="30" x2="550" y2="30" stroke="#dc2626" stroke-width="3" />
                  <text x="300" y="20" text-anchor="middle" class="text-sm font-bold fill-red-600">VCC = {{ vcc }}V</text>
                  
                  <!-- Reference Branch (Left) -->
                  <!-- R_ref -->
                  <rect x="90" y="30" width="60" height="80" fill="white" stroke="#374151" stroke-width="2" rx="3" />
                  <text x="120" y="70" text-anchor="middle" class="text-xs font-bold fill-gray-700">R_ref</text>
                  <text x="120" y="85" text-anchor="middle" class="text-xs fill-gray-600">{{ formatResistance(referenceResistor) }}</text>
                  
                  <!-- Q1 (Reference Transistor) -->
                  <circle cx="120" cy="150" r="30" fill="white" stroke="#374151" stroke-width="2" />
                  <text x="120" y="155" text-anchor="middle" class="text-sm font-bold fill-gray-700">Q1</text>
                  <text x="120" y="170" text-anchor="middle" class="text-xs fill-gray-600">Ref</text>
                  
                  <!-- Base Connection Line -->
                  <line x1="120" y1="180" x2="120" y2="210" stroke="#374151" stroke-width="2" />
                  <line x1="120" y1="210" x2="480" y2="210" stroke="#374151" stroke-width="2" />
                  
                  <!-- Output Branch (Right) -->
                  <!-- Q2 (Output Transistor) -->
                  <circle cx="480" cy="150" r="30" fill="white" stroke="#374151" stroke-width="2" />
                  <text x="480" y="155" text-anchor="middle" class="text-sm font-bold fill-gray-700">Q2</text>
                  <text x="480" y="170" text-anchor="middle" class="text-xs fill-gray-600">Out</text>
                  
                  <!-- Base Connection from Q2 -->
                  <line x1="480" y1="180" x2="480" y2="210" stroke="#374151" stroke-width="2" />
                  
                  <!-- Load Resistor -->
                  <rect x="450" y="230" width="60" height="60" fill="white" stroke="#374151" stroke-width="2" rx="3" />
                  <text x="480" y="255" text-anchor="middle" class="text-xs font-bold fill-gray-700">R_L</text>
                  <text x="480" y="270" text-anchor="middle" class="text-xs fill-gray-600">{{ formatResistance(loadResistance) }}</text>
                  
                  <!-- Ground Line -->
                  <line x1="50" y1="300" x2="550" y2="300" stroke="#374151" stroke-width="2" />
                  <text x="570" y="305" text-anchor="middle" class="text-sm font-bold fill-gray-600">GND</text>
                  
                  <!-- Current Flow Animation (Reference Branch) -->
                  <g v-for="i in 3" :key="`ref-${i}-${currentFlow}`">
                    <circle 
                      :cx="120"
                      :cy="30 + (currentFlow + i * 30) % 100"
                      r="4"
                      fill="url(#currentGradient)"
                      opacity="0.8"
                    />
                  </g>
                  
                  <!-- Current Flow Animation (Output Branch) -->
                  <g v-for="i in 3" :key="`out-${i}-${currentFlow}`">
                    <circle 
                      :cx="480"
                      :cy="30 + (currentFlow + i * 30) % 100"
                      r="4"
                      fill="url(#currentGradient)"
                      opacity="0.8"
                    />
                  </g>
                  
                  <!-- Current Labels -->
                  <text x="80" y="120" text-anchor="end" class="text-xs font-bold fill-emerald-600">I_ref = {{ formatCurrent(referenceCurrent) }}</text>
                  <text x="520" y="120" text-anchor="start" class="text-xs font-bold fill-emerald-600">I_out = {{ formatCurrent(outputCurrentWithError) }}</text>
                  
                  <!-- Compliance Indicator -->
                  <rect :x="420" :y="180" width="120" height="25" :fill="isInCompliance ? '#d1fae5' : '#fee2e2'" :stroke="isInCompliance ? '#10b981' : '#ef4444'" stroke-width="2" rx="3" />
                  <text :x="480" :y="197" text-anchor="middle" :class="isInCompliance ? 'text-xs font-bold fill-green-700' : 'text-xs font-bold fill-red-700'">
                    {{ isInCompliance ? '✓ In Compliance' : '✗ Saturated' }}
                  </text>
                  
                  <!-- Node Voltages -->
                  <text x="170" y="145" text-anchor="start" class="text-xs fill-blue-600">V_c1 ≈ 0.7V</text>
                  <text x="510" y="145" text-anchor="end" class="text-xs fill-blue-600">V_c2 = {{ formatVoltage(collectorVoltage) }}</text>
                </svg>
              </div>
            </div>

            <!-- Calculated Values -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Circuit Analysis
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Reference Resistor -->
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                  <div class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Reference Resistor</div>
                  <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {{ formatResistance(referenceResistor) }}
                  </div>
                  <div class="text-xs text-blue-500 dark:text-blue-400 mt-1">
                    R_ref = (Vcc - V_be) / I_ref
                  </div>
                </div>

                <!-- Output Current -->
                <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border-2 border-emerald-200 dark:border-emerald-800">
                  <div class="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Output Current</div>
                  <div class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {{ formatCurrent(outputCurrentWithError) }}
                  </div>
                  <div class="text-xs text-emerald-500 dark:text-emerald-400 mt-1">
                    With Early effect
                  </div>
                </div>

                <!-- Base Current -->
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-800">
                  <div class="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Base Current (I_b)</div>
                  <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {{ formatCurrent(baseCurrent) }}
                  </div>
                  <div class="text-xs text-purple-500 dark:text-purple-400 mt-1">
                    I_b = I_out / β
                  </div>
                </div>

                <!-- Output Voltage -->
                <div class="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border-2 border-orange-200 dark:border-orange-800">
                  <div class="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">Output Voltage</div>
                  <div class="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {{ formatVoltage(outputVoltage) }}
                  </div>
                  <div class="text-xs text-orange-500 dark:text-orange-400 mt-1">
                    V_out = I_out × R_L
                  </div>
                </div>

                <!-- Collector Voltage -->
                <div class="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border-2 border-pink-200 dark:border-pink-800">
                  <div class="text-sm text-pink-600 dark:text-pink-400 font-medium mb-1">Collector Voltage</div>
                  <div class="text-2xl font-bold text-pink-700 dark:text-pink-300">
                    {{ formatVoltage(collectorVoltage) }}
                  </div>
                  <div class="text-xs text-pink-500 dark:text-pink-400 mt-1">
                    V_c = Vcc - V_out
                  </div>
                </div>

                <!-- Mirror Error -->
                <div :class="{
                  'rounded-xl p-4 border-2': true,
                  'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800': Math.abs(errorPercent) < 5,
                  'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800': Math.abs(errorPercent) >= 5 && Math.abs(errorPercent) < 10,
                  'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800': Math.abs(errorPercent) >= 10
                }">
                  <div class="text-sm font-medium mb-1" :class="{
                    'text-green-600 dark:text-green-400': Math.abs(errorPercent) < 5,
                    'text-yellow-600 dark:text-yellow-400': Math.abs(errorPercent) >= 5 && Math.abs(errorPercent) < 10,
                    'text-red-600 dark:text-red-400': Math.abs(errorPercent) >= 10
                  }">
                    Mirror Error
                  </div>
                  <div class="text-2xl font-bold" :class="{
                    'text-green-700 dark:text-green-300': Math.abs(errorPercent) < 5,
                    'text-yellow-700 dark:text-yellow-300': Math.abs(errorPercent) >= 5 && Math.abs(errorPercent) < 10,
                    'text-red-700 dark:text-red-300': Math.abs(errorPercent) >= 10
                  }">
                    {{ errorPercent >= 0 ? '+' : '' }}{{ errorPercent.toFixed(2) }}%
                  </div>
                  <div class="text-xs mt-1" :class="{
                    'text-green-500 dark:text-green-400': Math.abs(errorPercent) < 5,
                    'text-yellow-500 dark:text-yellow-400': Math.abs(errorPercent) >= 5 && Math.abs(errorPercent) < 10,
                    'text-red-500 dark:text-red-400': Math.abs(errorPercent) >= 10
                  }">
                    {{ Math.abs(errorPercent) < 5 ? '✓ Excellent' : Math.abs(errorPercent) < 10 ? '⚠ Fair' : '✗ Poor' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Current Mirrors</h3>
              
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">What is a Current Mirror?</h4>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A current mirror is a circuit designed to copy a current through one active device by controlling the current in another active device of a circuit, keeping the output current constant regardless of loading. The current being 'copied' can be, and sometimes is, a varying signal current.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                    <h5 class="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Operation Principle</h5>
                    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Q1 and Q2 are matched transistors</li>
                      <li>• Same V_be → same I_c (ideally)</li>
                      <li>• Reference branch sets the current</li>
                      <li>• Output branch mirrors the current</li>
                      <li>• Load can vary without affecting I_out</li>
                    </ul>
                  </div>
                  
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h5 class="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Characteristics</h5>
                    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• High output impedance</li>
                      <li>• Low input impedance</li>
                      <li>• Good matching accuracy</li>
                      <li>• Temperature stable (if matched)</li>
                      <li>• Wide compliance range</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h5 class="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Sources of Error</h5>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Base Current Error:</strong> I_out = I_ref / (1 + 2/β) - worse at low β</li>
                    <li>• <strong>Early Effect:</strong> V_ce affects I_c due to channel-length modulation</li>
                    <li>• <strong>Mismatch:</strong> V_be and β differences between Q1 and Q2</li>
                    <li>• <strong>Temperature:</strong> ΔT between transistors causes mismatch</li>
                    <li>• <strong>Saturation:</strong> When V_c < V_ce(sat), mirroring fails</li>
                  </ul>
                </div>

                <div>
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Applications</h5>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Bias Circuits:</strong> Set operating points for amplifiers</li>
                    <li>• <strong>Active Loads:</strong> Replace passive resistors in ICs</li>
                    <li>• <strong>Current Sources:</strong> Provide stable bias currents</li>
                    <li>• <strong>Differential Pairs:</strong> Tail current sources</li>
                    <li>• <strong>Analog ICs:</strong> Op-amps, comparators, etc.</li>
                  </ul>
                </div>

                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h5 class="font-semibold text-purple-700 dark:text-purple-400 mb-2">Improvement Techniques</h5>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Emitter Degeneration:</strong> Add resistors to reduce mismatch sensitivity</li>
                    <li>• <strong>Wilson Mirror:</strong> Uses feedback to improve accuracy</li>
                    <li>• <strong>Cascode Mirror:</strong> Increases output impedance</li>
                    <li>• <strong>Widlar Mirror:</strong> Allows small current ratios</li>
                    <li>• <strong>Multi-Output Mirrors:</strong> One reference, multiple outputs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

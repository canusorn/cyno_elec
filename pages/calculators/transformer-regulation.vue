<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const primaryVoltage = ref(230)
const secondaryVoltage = ref(24)
const primaryResistance = ref(0.5)
const secondaryResistance = ref(0.1)
const primaryReactance = ref(1.0)
const secondaryReactance = ref(0.2)
const coreLoss = ref(15)
const loadPowerFactor = ref(0.85)
const loadType = ref('inductive')
const loadCurrent = ref(5)

// Computed calculations
const turnsRatio = computed(() => {
  return primaryVoltage.value / secondaryVoltage.value
})

const secondaryResistanceReferred = computed(() => {
  return secondaryResistance.value / Math.pow(turnsRatio.value, 2)
})

const totalResistanceReferred = computed(() => {
  return primaryResistance.value + secondaryResistanceReferred.value
})

const totalReactanceReferred = computed(() => {
  const secReferred = secondaryReactance.value / Math.pow(turnsRatio.value, 2)
  return primaryReactance.value + secReferred
})

const equivalentImpedance = computed(() => {
  const r = totalResistanceReferred.value
  const x = totalReactanceReferred.value
  return Math.sqrt(r * r + x * x)
})

// Calculate regulation for given load
const calculateRegulation = (current: number, pf: number) => {
  const r = totalResistanceReferred.value
  const x = totalReactanceReferred.value
  const v = primaryVoltage.value
  
  // Voltage drop components
  const resistiveDrop = current * r
  const reactiveDrop = current * x
  
  // No-load voltage (referred to primary)
  const noLoadVoltage = v
  
  // Full-load voltage (with load)
  const pfAngle = Math.acos(pf)
  const voltageDrop = resistiveDrop * pf + reactiveDrop * Math.sin(pfAngle)
  const fullLoadVoltage = v - voltageDrop
  
  // Regulation percentage
  const regulation = ((noLoadVoltage - fullLoadVoltage) / fullLoadVoltage) * 100
  
  return {
    regulation,
    noLoadVoltage,
    fullLoadVoltage,
    voltageDrop
  }
}

const currentRegulation = computed(() => {
  return calculateRegulation(loadCurrent.value, loadPowerFactor.value)
})

// Secondary side values (actual)
const secondaryNoLoadVoltage = computed(() => {
  return currentRegulation.value.noLoadVoltage / turnsRatio.value
})

const secondaryFullLoadVoltage = computed(() => {
  return currentRegulation.value.fullLoadVoltage / turnsRatio.value
})

const actualSecondaryRegulation = computed(() => {
  return ((secondaryNoLoadVoltage.value - secondaryFullLoadVoltage.value) / 
          secondaryFullLoadVoltage.value) * 100
})

// Power calculations
const inputPower = computed(() => {
  const v = secondaryFullLoadVoltage.value
  const i = loadCurrent.value
  const pf = loadPowerFactor.value
  return v * i * pf
})

const outputPower = computed(() => {
  return inputPower.value - coreLoss.value
})

const copperLoss = computed(() => {
  const i = loadCurrent.value
  const rEq = totalResistanceReferred.value / Math.pow(turnsRatio.value, 2)
  return i * i * rEq
})

const totalLoss = computed(() => {
  return coreLoss.value + copperLoss.value
})

const efficiency = computed(() => {
  if (inputPower.value === 0) return 0
  return (outputPower.value / inputPower.value) * 100
})

// Format functions
const formatVoltage = (volts: number) => {
  if (volts >= 1000) return `${(volts / 1000).toFixed(2)} kV`
  if (volts < 1) return `${(volts * 1000).toFixed(2)} mV`
  return `${volts.toFixed(2)} V`
}

const formatResistance = (ohms: number) => {
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(2)} kΩ`
  if (ohms < 0.01) return `${(ohms * 1000).toFixed(2)} mΩ`
  return `${ohms.toFixed(3)} Ω`
}

const formatCurrent = (amps: number) => {
  if (amps >= 1000) return `${(amps / 1000).toFixed(2)} kA`
  if (amps >= 1) return `${amps.toFixed(2)} A`
  if (amps >= 0.001) return `${(amps * 1000).toFixed(2)} mA`
  return `${(amps * 1000000).toFixed(2)} µA`
}

const formatPower = (watts: number) => {
  if (watts >= 1000000) return `${(watts / 1000000).toFixed(2)} MW`
  if (watts >= 1000) return `${(watts / 1000).toFixed(2)} kW`
  if (watts >= 1) return `${watts.toFixed(2)} W`
  return `${(watts * 1000).toFixed(2)} mW`
}

// Regulation curve data points
const regulationCurveData = computed(() => {
  const data = []
  for (let i = 0; i <= 100; i += 5) {
    const loadPercent = i / 100
    const current = loadCurrent.value * loadPercent
    const result = calculateRegulation(current, loadPowerFactor.value)
    data.push({
      loadPercent: i,
      regulation: result.regulation
    })
  }
  return data
})

// Efficiency curve data points
const efficiencyCurveData = computed(() => {
  const data = []
  for (let i = 10; i <= 100; i += 5) {
    const loadPercent = i / 100
    const current = loadCurrent.value * loadPercent
    const pf = loadPowerFactor.value
    const rEq = totalResistanceReferred.value / Math.pow(turnsRatio.value, 2)
    const v = secondaryFullLoadVoltage.value
    const pOut = v * current * pf
    const pCu = current * current * rEq
    const pLoss = coreLoss.value + pCu
    const pIn = pOut + pLoss
    const eff = pIn > 0 ? (pOut / pIn) * 100 : 0
    data.push({
      loadPercent: i,
      efficiency: eff
    })
  }
  return data
})

// Presets
const presets = [
  {
    name: 'Distribution Transformer',
    primary: 11000,
    secondary: 400,
    r1: 2.5,
    r2: 0.02,
    x1: 5.0,
    x2: 0.04,
    core: 200,
    current: 144,
    pf: 0.8
  },
  {
    name: 'Power Transformer',
    primary: 230,
    secondary: 24,
    r1: 0.5,
    r2: 0.1,
    x1: 1.0,
    x2: 0.2,
    core: 15,
    current: 20,
    pf: 0.85
  },
  {
    name: 'Instrument Transformer',
    primary: 230,
    secondary: 12,
    r1: 1.5,
    r2: 0.15,
    x1: 2.0,
    x2: 0.25,
    core: 5,
    current: 2,
    pf: 0.9
  },
  {
    name: 'Auto Transformer',
    primary: 230,
    secondary: 115,
    r1: 0.3,
    r2: 0.2,
    x1: 0.6,
    x2: 0.4,
    core: 10,
    current: 10,
    pf: 0.95
  }
]

const applyPreset = (preset: typeof presets[0]) => {
  primaryVoltage.value = preset.primary
  secondaryVoltage.value = preset.secondary
  primaryResistance.value = preset.r1
  secondaryResistance.value = preset.r2
  primaryReactance.value = preset.x1
  secondaryReactance.value = preset.x2
  coreLoss.value = preset.core
  loadCurrent.value = preset.current
  loadPowerFactor.value = preset.pf
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        🔌 Transformer Regulation Calculator
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Calculate voltage regulation, efficiency, and performance parameters for transformers
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Input Parameters -->
      <div class="space-y-6">
        <!-- Voltage Ratings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Voltage Ratings
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Voltage: {{ formatVoltage(primaryVoltage) }}
              </label>
              <input
                v-model.number="primaryVoltage"
                type="range"
                min="1"
                max="15000"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Voltage: {{ formatVoltage(secondaryVoltage) }}
              </label>
              <input
                v-model.number="secondaryVoltage"
                type="range"
                min="1"
                max="1000"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div class="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
              <span class="text-sm text-gray-600 dark:text-gray-400">Turns Ratio</span>
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                {{ turnsRatio.toFixed(2) }}:1
              </span>
            </div>
          </div>
        </div>

        <!-- Winding Parameters -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🌀 Winding Parameters
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Resistance: {{ formatResistance(primaryResistance) }}
              </label>
              <input
                v-model.number="primaryResistance"
                type="range"
                min="0.01"
                max="100"
                step="0.01"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Resistance: {{ formatResistance(secondaryResistance) }}
              </label>
              <input
                v-model.number="secondaryResistance"
                type="range"
                min="0.01"
                max="100"
                step="0.01"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Reactance: {{ formatResistance(primaryReactance) }}
              </label>
              <input
                v-model.number="primaryReactance"
                type="range"
                min="0.01"
                max="100"
                step="0.01"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Reactance: {{ formatResistance(secondaryReactance) }}
              </label>
              <input
                v-model.number="secondaryReactance"
                type="range"
                min="0.01"
                max="100"
                step="0.01"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <!-- Core & Load Parameters -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔧 Core & Load
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Core Loss: {{ formatPower(coreLoss) }}
              </label>
              <input
                v-model.number="coreLoss"
                type="range"
                min="0.1"
                max="500"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Load Current: {{ formatCurrent(loadCurrent) }}
              </label>
              <input
                v-model.number="loadCurrent"
                type="range"
                min="0.1"
                max="200"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Power Factor: {{ loadPowerFactor.toFixed(2) }}
              </label>
              <input
                v-model.number="loadPowerFactor"
                type="range"
                min="0.1"
                max="1.0"
                step="0.01"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Load Type
              </label>
              <select
                v-model="loadType"
                class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              >
                <option value="resistive">Resistive</option>
                <option value="inductive">Inductive</option>
                <option value="capacitive">Capacitive</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 class="text-lg font-semibold mb-4">🎯 Quick Presets</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Middle Column: Results -->
      <div class="space-y-6">
        <!-- Regulation Results -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Voltage Regulation
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Regulation</span>
              <span class="text-2xl font-bold" 
                    :class="actualSecondaryRegulation < 3 ? 'text-green-600 dark:text-green-400' : 
                            actualSecondaryRegulation < 5 ? 'text-yellow-600 dark:text-yellow-400' : 
                            'text-red-600 dark:text-red-400'">
                {{ actualSecondaryRegulation.toFixed(2) }}%
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">No-Load Voltage</span>
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                {{ formatVoltage(secondaryNoLoadVoltage) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Full-Load Voltage</span>
              <span class="text-lg font-bold text-purple-600 dark:text-purple-400">
                {{ formatVoltage(secondaryFullLoadVoltage) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600 dark:text-gray-400">Voltage Drop</span>
              <span class="text-lg font-bold text-orange-600 dark:text-orange-400">
                {{ formatVoltage(currentRegulation.voltageDrop / turnsRatio) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Efficiency Results -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Efficiency
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Efficiency</span>
              <span class="text-2xl font-bold" 
                    :class="efficiency > 95 ? 'text-green-600 dark:text-green-400' : 
                            efficiency > 90 ? 'text-yellow-600 dark:text-yellow-400' : 
                            'text-red-600 dark:text-red-400'">
                {{ efficiency.toFixed(2) }}%
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Output Power</span>
              <span class="text-lg font-bold text-green-600 dark:text-green-400">
                {{ formatPower(outputPower) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Input Power</span>
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                {{ formatPower(inputPower) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600 dark:text-gray-400">Total Loss</span>
              <span class="text-lg font-bold text-red-600 dark:text-red-400">
                {{ formatPower(totalLoss) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Loss Breakdown -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔥 Loss Breakdown
          </h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Core Loss (Iron)</span>
                <span class="font-bold text-orange-600 dark:text-orange-400">
                  {{ formatPower(coreLoss) }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
                  :style="{ width: `${(coreLoss / totalLoss) * 100}%` }"
                />
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Copper Loss (I²R)</span>
                <span class="font-bold text-yellow-600 dark:text-yellow-400">
                  {{ formatPower(copperLoss) }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                  :style="{ width: `${(copperLoss / totalLoss) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Visualization & Education -->
      <div class="space-y-6">
        <!-- Equivalent Circuit -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔌 Equivalent Circuit
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 300 400" class="w-full">
              <!-- Primary side -->
              <g transform="translate(0, 50)">
                <text x="80" y="15" text-anchor="middle" 
                      class="text-xs fill-current text-gray-700 dark:text-gray-300 font-semibold">
                  Primary
                </text>
                
                <!-- R1 -->
                <path d="M 40 40 L 40 70 L 55 80 L 65 60 L 75 80 L 85 60 L 95 80 L 105 60 L 115 80 L 120 70 L 120 40"
                      fill="none" stroke="currentColor" class="text-red-600 dark:text-red-400" stroke-width="2"/>
                <text x="80" y="100" text-anchor="middle" 
                      class="text-[10px] fill-current text-red-600 dark:text-red-400">
                  R₁: {{ formatResistance(primaryResistance) }}
                </text>

                <!-- X1 -->
                <path d="M 40 130 L 40 160 L 55 170 L 65 150 L 75 170 L 85 150 L 95 170 L 105 150 L 115 170 L 120 160 L 120 130"
                      fill="none" stroke="currentColor" class="text-blue-600 dark:text-blue-400" stroke-width="2"/>
                <text x="80" y="190" text-anchor="middle" 
                      class="text-[10px] fill-current text-blue-600 dark:text-blue-400">
                  X₁: {{ formatResistance(primaryReactance) }}
                </text>

                <!-- Connections -->
                <line x1="40" y1="40" x2="40" y2="20" stroke="currentColor" 
                      class="text-green-500 dark:text-green-400" stroke-width="2"/>
                <line x1="120" y1="40" x2="120" y2="20" stroke="currentColor" 
                      class="text-green-500 dark:text-green-400" stroke-width="2"/>
              </g>

              <!-- Transformer symbol -->
              <g transform="translate(40, 220)">
                <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" 
                        class="text-purple-600 dark:text-purple-400" stroke-width="2"/>
                <circle cx="90" cy="30" r="25" fill="none" stroke="currentColor" 
                        class="text-purple-600 dark:text-purple-400" stroke-width="2"/>
                <text x="60" y="70" text-anchor="middle" 
                      class="text-[10px] fill-current text-purple-600 dark:text-purple-400">
                  {{ turnsRatio.toFixed(1) }}:1
                </text>
              </g>

              <!-- Secondary side (referred to primary) -->
              <g transform="translate(0, 290)">
                <text x="80" y="15" text-anchor="middle" 
                      class="text-xs fill-current text-gray-700 dark:text-gray-300 font-semibold">
                  Secondary (Referred)
                </text>
                
                <!-- R2' -->
                <path d="M 40 40 L 40 70 L 55 80 L 65 60 L 75 80 L 85 60 L 95 80 L 105 60 L 115 80 L 120 70 L 120 40"
                      fill="none" stroke="currentColor" class="text-red-600 dark:text-red-400" stroke-width="2"/>
                <text x="80" y="100" text-anchor="middle" 
                      class="text-[10px] fill-current text-red-600 dark:text-red-400">
                  R₂': {{ formatResistance(secondaryResistanceReferred) }}
                </text>

                <!-- X2' -->
                <path d="M 40 130 L 40 160 L 55 170 L 65 150 L 75 170 L 85 150 L 95 170 L 105 150 L 115 170 L 120 160 L 120 130"
                      fill="none" stroke="currentColor" class="text-blue-600 dark:text-blue-400" stroke-width="2"/>
                <text x="80" y="190" text-anchor="middle" 
                      class="text-[10px] fill-current text-blue-600 dark:text-blue-400">
                  X₂': {{ formatResistance(secondaryReactance / Math.pow(turnsRatio, 2)) }}
                </text>

                <!-- Connections -->
                <line x1="40" y1="40" x2="40" y2="20" stroke="currentColor" 
                      class="text-green-500 dark:text-green-400" stroke-width="2"/>
                <line x1="120" y1="40" x2="120" y2="20" stroke="currentColor" 
                      class="text-green-500 dark:text-green-400" stroke-width="2"/>
              </g>

              <!-- Vertical connections -->
              <line x1="40" y1="70" x2="40" y2="130" stroke="currentColor" 
                    class="text-green-500 dark:text-green-400" stroke-width="2"/>
              <line x1="120" y1="70" x2="120" y2="130" stroke="currentColor" 
                    class="text-green-500 dark:text-green-400" stroke-width="2"/>
            </svg>
          </div>
          <div class="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>Total Equivalent Impedance:</strong> {{ formatResistance(equivalentImpedance) }}
            </p>
          </div>
        </div>

        <!-- Regulation Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📈 Regulation vs Load
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 300 200" class="w-full">
              <!-- Axes -->
              <line x1="50" y1="170" x2="280" y2="170" stroke="currentColor" 
                    class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              <line x1="50" y1="20" x2="50" y2="170" stroke="currentColor" 
                    class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              
              <!-- Labels -->
              <text x="165" y="195" text-anchor="middle" 
                    class="text-[10px] fill-current text-gray-600 dark:text-gray-400">
                Load (%)
              </text>
              <text x="15" y="100" text-anchor="middle" transform="rotate(-90, 15, 100)"
                    class="text-[10px] fill-current text-gray-600 dark:text-gray-400">
                Regulation (%)
              </text>

              <!-- Data points -->
              <polyline
                :points="regulationCurveData.map(d => 
                  `${50 + (d.loadPercent / 100) * 230},${170 - (d.regulation / 10) * 150}`
                ).join(' ')"
                fill="none"
                stroke="currentColor"
                class="text-blue-600 dark:text-blue-400"
                stroke-width="2"
              />

              <!-- Current point marker -->
              <circle
                :cx="50 + (loadCurrent / loadCurrent) * 230"
                :cy="170 - (actualSecondaryRegulation / 10) * 150"
                r="5"
                class="fill-red-600 dark:fill-red-400"
              />
            </svg>
          </div>
        </div>

        <!-- Efficiency Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Efficiency vs Load
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 300 200" class="w-full">
              <!-- Axes -->
              <line x1="50" y1="170" x2="280" y2="170" stroke="currentColor" 
                    class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              <line x1="50" y1="20" x2="50" y2="170" stroke="currentColor" 
                    class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              
              <!-- Labels -->
              <text x="165" y="195" text-anchor="middle" 
                    class="text-[10px] fill-current text-gray-600 dark:text-gray-400">
                Load (%)
              </text>
              <text x="15" y="100" text-anchor="middle" transform="rotate(-90, 15, 100)"
                    class="text-[10px] fill-current text-gray-600 dark:text-gray-400">
                Efficiency (%)
              </text>

              <!-- Data points -->
              <polyline
                :points="efficiencyCurveData.map(d => 
                  `${50 + (d.loadPercent / 100) * 230},${170 - ((d.efficiency - 80) / 20) * 150}`
                ).join(' ')"
                fill="none"
                stroke="currentColor"
                class="text-green-600 dark:text-green-400"
                stroke-width="2"
              />

              <!-- Current point marker -->
              <circle
                cx="50 + (loadCurrent / loadCurrent) * 230"
                :cy="170 - ((efficiency - 80) / 20) * 150"
                r="5"
                class="fill-red-600 dark:fill-red-400"
              />
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📚 Key Concepts
          </h3>
          <div class="space-y-4 text-sm">
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Voltage Regulation:</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                Measures how much secondary voltage drops from no-load to full-load:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 font-mono text-xs text-center">
                % Regulation = (V<sub class="text-xs">no-load</sub> - V<sub class="text-xs">full-load</sub>) / V<sub class="text-xs">full-load</sub> × 100
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Efficiency:</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                Ratio of output power to input power:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-2 font-mono text-xs text-center">
                η = P<sub class="text-xs">out</sub> / P<sub class="text-xs">in</sub> × 100%
              </div>
            </div>

            <div class="border-t border-gray-300 dark:border-gray-600 pt-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Loss Components:</h4>
              <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• <strong>Core Loss:</strong> Constant (hysteresis + eddy currents)</li>
                <li>• <strong>Copper Loss:</strong> Varies with load (I²R)</li>
              </ul>
            </div>

            <div class="border-t border-gray-300 dark:border-gray-600 pt-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Design Tips:</h4>
              <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Good regulation: &lt;3%</li>
                <li>• High efficiency: &gt;95%</li>
                <li>• Low resistance windings reduce copper loss</li>
                <li>• High-grade core steel reduces core loss</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

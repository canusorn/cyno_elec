<template>
  <div class="opamp-gain-calculator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🧮 Op-Amp Gain Calculator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Select a configuration and enter resistor values to calculate the gain
      </p>
    </div>

    <!-- Configuration Selection -->
    <div class="config-selector mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Amplifier Configuration:
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="config in configurations"
          :key="config.id"
          @click="selectedConfig = config.id"
          :class="[
            'px-4 py-3 rounded-lg font-semibold transition-all',
            selectedConfig === config.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          {{ config.name }}
        </button>
      </div>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <!-- Inverting Amplifier -->
        <g v-if="selectedConfig === 'inverting'">
          <text x="400" y="30" text-anchor="middle" :font-size="18" font-weight="bold" fill="#3B82F6">
            Inverting Amplifier
          </text>
          
          <!-- Op-Amp Triangle -->
          <polygon points="300,150 300,250 450,200" fill="white" stroke="#3B82F6" stroke-width="3"/>
          <text x="315" y="190" :font-size="16" font-weight="bold" fill="#3B82F6">-</text>
          <text x="315" y="220" :font-size="16" font-weight="bold" fill="#3B82F6">+</text>
          
          <!-- Input resistor R_in -->
          <line x1="100" y1="170" x2="300" y2="170" stroke="#22C55E" stroke-width="3"/>
          <rect x="180" y="155" width="40" height="30" fill="white" stroke="#22C55E" stroke-width="2" rx="3"/>
          <polyline points="185,170 195,160 205,180 215,160 225,180" fill="none" stroke="#22C55E" stroke-width="2"/>
          <text x="200" y="145" text-anchor="middle" :font-size="12" font-weight="bold" fill="#22C55E">
            R_in
          </text>
          <text x="200" y="200" text-anchor="middle" :font-size="11" fill="#22C55E">
            {{ rin }}Ω
          </text>
          
          <!-- Feedback resistor R_f -->
          <line x1="200" y1="130" x2="200" y2="80" stroke="#EF4444" stroke-width="3"/>
          <line x1="200" y1="80" x2="380" y2="80" stroke="#EF4444" stroke-width="3"/>
          <line x1="380" y1="80" x2="380" y2="150" stroke="#EF4444" stroke-width="3"/>
          <rect x="270" y="65" width="40" height="30" fill="white" stroke="#EF4444" stroke-width="2" rx="3"/>
          <polyline points="275,80 285,70 295,90 305,70 315,90" fill="none" stroke="#EF4444" stroke-width="2"/>
          <text x="290" y="55" text-anchor="middle" :font-size="12" font-weight="bold" fill="#EF4444">
            R_f
          </text>
          <text x="290" y="110" text-anchor="middle" :font-size="11" fill="#EF4444">
            {{ rf }}Ω
          </text>
          
          <!-- Ground -->
          <line x1="300" y1="230" x2="260" y2="230" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="260" y1="230" x2="260" y2="280" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="245" y1="280" x2="275" y2="280" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="252" y1="287" x2="268" y2="287" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="257" y1="294" x2="263" y2="294" stroke="#9CA3AF" stroke-width="3"/>
          
          <!-- Output -->
          <line x1="450" y1="200" x2="550" y2="200" stroke="#8B5CF6" stroke-width="3"/>
          <text x="500" y="185" text-anchor="middle" :font-size="12" font-weight="bold" fill="#8B5CF6">
            V_out
          </text>
          
          <!-- Input -->
          <text x="80" y="165" text-anchor="middle" :font-size="12" font-weight="bold" fill="#22C55E">
            V_in
          </text>
          
          <!-- Gain formula -->
          <text x="400" y="350" text-anchor="middle" :font-size="16" font-weight="bold" fill="#3B82F6">
            A_v = -R_f / R_in = {{ gain.toFixed(2) }}x
          </text>
        </g>

        <!-- Non-Inverting Amplifier -->
        <g v-if="selectedConfig === 'noninverting'">
          <text x="400" y="30" text-anchor="middle" :font-size="18" font-weight="bold" fill="#22C55E">
            Non-Inverting Amplifier
          </text>
          
          <!-- Op-Amp Triangle -->
          <polygon points="300,150 300,250 450,200" fill="white" stroke="#22C55E" stroke-width="3"/>
          <text x="315" y="190" :font-size="16" font-weight="bold" fill="#22C55E">-</text>
          <text x="315" y="220" :font-size="16" font-weight="bold" fill="#22C55E">+</text>
          
          <!-- Input to + terminal -->
          <line x1="100" y1="220" x2="300" y2="220" stroke="#3B82F6" stroke-width="3"/>
          <text x="80" y="225" text-anchor="middle" :font-size="12" font-weight="bold" fill="#3B82F6">
            V_in
          </text>
          
          <!-- Voltage divider R1 and R2 -->
          <line x1="250" y1="170" x2="300" y2="170" stroke="#EF4444" stroke-width="3"/>
          <line x1="250" y1="170" x2="250" y2="280" stroke="#EF4444" stroke-width="3"/>
          <rect x="235" y="220" width="30" height="25" fill="white" stroke="#EF4444" stroke-width="2" rx="3"/>
          <polyline points="240,232 250,225 260,240" fill="none" stroke="#EF4444" stroke-width="2"/>
          <text x="250" y="265" text-anchor="middle" :font-size="11" fill="#EF4444">
            R1={{ r1 }}Ω
          </text>
          
          <!-- Ground -->
          <line x1="235" y1="280" x2="265" y2="280" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="240" y1="287" x2="260" y2="287" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="245" y1="294" x2="255" y2="294" stroke="#9CA3AF" stroke-width="3"/>
          
          <!-- Feedback R2 -->
          <line x1="380" y1="150" x2="380" y2="100" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="380" y1="100" x2="250" y2="100" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="250" y1="100" x2="250" y2="170" stroke="#8B5CF6" stroke-width="3"/>
          <rect x="300" y="85" width="30" height="30" fill="white" stroke="#8B5CF6" stroke-width="2" rx="3"/>
          <polyline points="305,100 315,90 325,110" fill="none" stroke="#8B5CF6" stroke-width="2"/>
          <text x="315" y="75" text-anchor="middle" :font-size="11" fill="#8B5CF6">
            R2
          </text>
          <text x="315" y="125" text-anchor="middle" :font-size="11" fill="#8B5CF6">
            {{ r2 }}Ω
          </text>
          
          <!-- Output -->
          <line x1="450" y1="200" x2="550" y2="200" stroke="#22C55E" stroke-width="3"/>
          <text x="500" y="185" text-anchor="middle" :font-size="12" font-weight="bold" fill="#22C55E">
            V_out
          </text>
          
          <!-- Gain formula -->
          <text x="400" y="350" text-anchor="middle" :font-size="16" font-weight="bold" fill="#22C55E">
            A_v = 1 + (R2 / R1) = {{ gain.toFixed(2) }}x
          </text>
        </g>

        <!-- Differential Amplifier -->
        <g v-if="selectedConfig === 'differential'">
          <text x="400" y="30" text-anchor="middle" :font-size="18" font-weight="bold" fill="#8B5CF6">
            Differential Amplifier
          </text>
          
          <!-- Op-Amp Triangle -->
          <polygon points="350,150 350,250 500,200" fill="white" stroke="#8B5CF6" stroke-width="3"/>
          <text x="365" y="190" :font-size="16" font-weight="bold" fill="#8B5CF6">-</text>
          <text x="365" y="220" :font-size="16" font-weight="bold" fill="#8B5CF6">+</text>
          
          <!-- Input 1 to - terminal -->
          <line x1="100" y1="170" x2="350" y2="170" stroke="#EF4444" stroke-width="3"/>
          <rect x="200" y="155" width="40" height="30" fill="white" stroke="#EF4444" stroke-width="2" rx="3"/>
          <polyline points="205,170 215,160 225,180 235,160" fill="none" stroke="#EF4444" stroke-width="2"/>
          <text x="220" y="145" text-anchor="middle" :font-size="11" fill="#EF4444">
            R_in1
          </text>
          <text x="80" y="175" text-anchor="middle" :font-size="12" font-weight="bold" fill="#EF4444">
            V1
          </text>
          
          <!-- Feedback -->
          <line x1="280" y1="130" x2="280" y2="80" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="280" y1="80" x2="430" y2="80" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="430" y1="80" x2="430" y2="150" stroke="#8B5CF6" stroke-width="3"/>
          <rect x="340" y="65" width="40" height="30" fill="white" stroke="#8B5CF6" stroke-width="2" rx="3"/>
          <polyline points="345,80 355,70 365,90 375,70" fill="none" stroke="#8B5CF6" stroke-width="2"/>
          <text x="360" y="55" text-anchor="middle" :font-size="11" fill="#8B5CF6">
            R_f
          </text>
          
          <!-- Input 2 to + terminal -->
          <line x1="100" y1="230" x2="250" y2="230" stroke="#22C55E" stroke-width="3"/>
          <rect x="150" y="215" width="30" height="30" fill="white" stroke="#22C55E" stroke-width="2" rx="3"/>
          <polyline points="155,230 165,220 175,240 185,220" fill="none" stroke="#22C55E" stroke-width="2"/>
          <text x="165" y="205" text-anchor="middle" :font-size="11" fill="#22C55E">
            R_in2
          </text>
          <line x1="250" y1="230" x2="350" y2="230" stroke="#22C55E" stroke-width="3"/>
          <text x="80" y="235" text-anchor="middle" :font-size="12" font-weight="bold" fill="#22C55E">
            V2
          </text>
          
          <!-- Ground -->
          <line x1="190" y1="230" x2="190" y2="280" stroke="#9CA3AF" stroke-width="2"/>
          <line x1="180" y1="280" x2="200" y2="280" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="183" y1="287" x2="197" y2="287" stroke="#9CA3AF" stroke-width="3"/>
          
          <!-- Output -->
          <line x1="500" y1="200" x2="580" y2="200" stroke="#8B5CF6" stroke-width="3"/>
          <text x="540" y="185" text-anchor="middle" :font-size="12" font-weight="bold" fill="#8B5CF6">
            V_out
          </text>
          
          <!-- Gain formula -->
          <text x="400" y="350" text-anchor="middle" :font-size="16" font-weight="bold" fill="#8B5CF6">
            A_v = R_f / R_in = {{ gain.toFixed(2) }}x
          </text>
        </g>

        <!-- Voltage Follower -->
        <g v-if="selectedConfig === 'follower'">
          <text x="400" y="30" text-anchor="middle" :font-size="18" font-weight="bold" fill="#F59E0B">
            Voltage Follower (Buffer)
          </text>
          
          <!-- Op-Amp Triangle -->
          <polygon points="300,150 300,250 450,200" fill="white" stroke="#F59E0B" stroke-width="3"/>
          <text x="315" y="190" :font-size="16" font-weight="bold" fill="#F59E0B">-</text>
          <text x="315" y="220" :font-size="16" font-weight="bold" fill="#F59E0B">+</text>
          
          <!-- Input -->
          <line x1="100" y1="220" x2="300" y2="220" stroke="#3B82F6" stroke-width="3"/>
          <text x="80" y="225" text-anchor="middle" :font-size="12" font-weight="bold" fill="#3B82F6">
            V_in
          </text>
          
          <!-- Feedback (direct connection) -->
          <line x1="450" y1="200" x2="500" y2="200" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="500" y1="200" x2="500" y2="130" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="500" y1="130" x2="300" y2="130" stroke="#8B5CF6" stroke-width="3"/>
          <line x1="300" y1="130" x2="300" y2="170" stroke="#8B5CF6" stroke-width="3"/>
          
          <!-- Output label -->
          <text x="520" y="195" text-anchor="middle" :font-size="12" font-weight="bold" fill="#8B5CF6">
            V_out
          </text>
          
          <!-- Gain formula -->
          <text x="400" y="350" text-anchor="middle" :font-size="16" font-weight="bold" fill="#F59E0B">
            A_v = 1 (Unity Gain)
          </text>
        </g>
      </svg>
    </div>

    <!-- Resistor Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- R_in / R1 Control (for applicable configs) -->
      <div v-if="selectedConfig === 'inverting' || selectedConfig === 'differential'" 
           class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          R_in (Ω): {{ rin }}
        </label>
        <input
          type="range"
          v-model.number="rin"
          min="100"
          max="100000"
          :step="getStep(rin)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>{{ formatResistance(rin) }}</span>
          <span>100kΩ</span>
        </div>
      </div>

      <!-- R1 Control (for non-inverting) -->
      <div v-if="selectedConfig === 'noninverting'" 
           class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          R1 (Ω): {{ r1 }}
        </label>
        <input
          type="range"
          v-model.number="r1"
          min="100"
          max="100000"
          :step="getStep(r1)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>{{ formatResistance(r1) }}</span>
          <span>100kΩ</span>
        </div>
      </div>

      <!-- R_f / R2 Control (for applicable configs) -->
      <div v-if="selectedConfig === 'inverting' || selectedConfig === 'differential'" 
           class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          R_f (Ω): {{ rf }}
        </label>
        <input
          type="range"
          v-model.number="rf"
          min="100"
          max="100000"
          :step="getStep(rf)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>{{ formatResistance(rf) }}</span>
          <span>100kΩ</span>
        </div>
      </div>

      <!-- R2 Control (for non-inverting) -->
      <div v-if="selectedConfig === 'noninverting'" 
           class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          R2 (Ω): {{ r2 }}
        </label>
        <input
          type="range"
          v-model.number="r2"
          min="100"
          max="100000"
          :step="getStep(r2)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>{{ formatResistance(r2) }}</span>
          <span>100kΩ</span>
        </div>
      </div>
    </div>

    <!-- Results Panel -->
    <div class="results-panel bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📊 Calculation Results
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Configuration</div>
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
            {{ currentConfig.name }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Voltage Gain (A_v)</div>
          <div class="text-2xl font-bold" :class="gain < 0 ? 'text-red-500' : 'text-green-500'">
            {{ gain > 0 ? '+' : '' }}{{ gain.toFixed(2) }}x
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Gain (dB)</div>
          <div class="text-2xl font-bold text-purple-500">
            {{ gainDB.toFixed(1) }} dB
          </div>
        </div>
      </div>
      
      <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
        <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Formula:</div>
        <div class="text-sm text-gray-800 dark:text-gray-200 font-mono">
          {{ currentConfig.formula }}
        </div>
      </div>
      
      <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
        <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Example Output:</div>
        <div class="text-sm text-gray-800 dark:text-gray-200">
          If V_in = 1V → V_out = {{ (gain * 1).toFixed(2) }}V
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Configuration data
const configurations = [
  { id: 'inverting', name: 'Inverting', formula: 'A_v = -R_f / R_in' },
  { id: 'noninverting', name: 'Non-Inverting', formula: 'A_v = 1 + (R2 / R1)' },
  { id: 'differential', name: 'Differential', formula: 'A_v = R_f / R_in' },
  { id: 'follower', name: 'Voltage Follower', formula: 'A_v = 1' }
]

// State
const selectedConfig = ref('inverting')
const rin = ref(10000) // 10k
const rf = ref(47000) // 47k
const r1 = ref(10000) // 10k
const r2 = ref(47000) // 47k

// Current configuration
const currentConfig = computed(() => {
  return configurations.find(c => c.id === selectedConfig.value) || configurations[0]
})

// Gain calculation
const gain = computed(() => {
  switch (selectedConfig.value) {
    case 'inverting':
      return -rf.value / rin.value
    case 'noninverting':
      return 1 + (r2.value / r1.value)
    case 'differential':
      return rf.value / rin.value
    case 'follower':
      return 1
    default:
      return 1
  }
})

// Gain in dB
const gainDB = computed(() => {
  return 20 * Math.log10(Math.abs(gain.value))
})

// Helper function to format resistance
const formatResistance = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}MΩ`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}kΩ`
  }
  return `${value}Ω`
}

// Get step size for slider
const getStep = (value: number) => {
  if (value >= 10000) return 1000
  if (value >= 1000) return 100
  return 10
}
</script>

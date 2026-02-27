<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Gate Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Gate Voltage (V_GS): {{ gateVoltage.toFixed(1) }} V
        </label>
        <input
          type="range"
          v-model.number="gateVoltage"
          min="0"
          max="10"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0V</span>
          <span>{{ thresholdVoltage }}V</span>
          <span>10V</span>
        </div>
      </div>

      <!-- Drain Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Drain Supply Voltage (V_DD): {{ drainVoltage }} V
        </label>
        <input
          type="range"
          v-model.number="drainVoltage"
          min="5"
          max="50"
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>5V</span>
          <span>24V</span>
          <span>50V</span>
        </div>
      </div>

      <!-- Load Resistance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Load Resistance (R_L): {{ formatResistance(loadResistance) }}
        </label>
        <input
          type="range"
          v-model.number="loadResistance"
          min="10"
          max="1000"
          :step="getLoadStep()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>100Ω</span>
          <span>1kΩ</span>
        </div>
      </div>

      <!-- Threshold Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Threshold Voltage (V_th): {{ thresholdVoltage }} V
        </label>
        <select
          v-model.number="thresholdVoltage"
          class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
        >
          <option :value="2">2V (Logic Level MOSFET)</option>
          <option :value="4">4V (Standard MOSFET)</option>
          <option :value="5">5V (High Threshold)</option>
        </select>
      </div>

      <!-- Transconductance (K) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Transconductance Parameter (K): {{ transconductance }} mA/V²
        </label>
        <input
          type="range"
          v-model.number="transconductance"
          min="10"
          max="500"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10</span>
          <span>250</span>
          <span>500</span>
        </div>
      </div>

      <!-- MOSFET State Indicator -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          MOSFET State
        </label>
        <div class="h-10 rounded-lg flex items-center justify-center font-bold text-white"
          :class="getStateClass()">
          {{ mosfetState }}
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          @click="setPreset('off')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-400 hover:text-white transition-all"
        >
          OFF (Cutoff)
        </button>
        <button
          @click="setPreset('on')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-all"
        >
          ON (Saturation)
        </button>
        <button
          @click="setPreset('linear')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-all"
        >
          Linear Region
        </button>
        <button
          @click="setPreset('motor')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-all"
        >
          Motor Drive
        </button>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Circuit Diagram -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">N-Channel MOSFET Switch Circuit</h3>
        <svg viewBox="0 0 300 280" class="w-full h-auto">
          <!-- Background grid -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="300" height="280" fill="url(#grid)" />
          
          <!-- V_DD (top) -->
          <line x1="150" y1="20" x2="150" y2="40" stroke="#374151" stroke-width="2"/>
          <circle cx="150" cy="20" r="3" fill="#374151"/>
          <text x="155" y="18" class="text-xs fill-gray-700 dark:fill-gray-300">V_DD ({{ drainVoltage }}V)</text>
          
          <!-- Load Resistor R_L -->
          <rect x="140" y="40" width="20" height="40" fill="none" stroke="#374151" stroke-width="2"/>
          <path d="M145 45 L155 50 L145 55 L155 60 L145 65 L155 70 L145 75" fill="none" stroke="#374151" stroke-width="1.5"/>
          <text x="165" y="65" class="text-xs fill-gray-700 dark:fill-gray-300">R_L</text>
          <text x="165" y="80" class="text-xs fill-gray-500 dark:fill-gray-400">{{ formatResistance(loadResistance) }}</text>
          
          <!-- Wire from resistor to MOSFET -->
          <line x1="150" y1="80" x2="150" y2="100" stroke="#374151" stroke-width="2"/>
          
          <!-- MOSFET Symbol -->
          <!-- Gate -->
          <line x1="100" y1="110" x2="100" y2="160" stroke="#374151" stroke-width="2"/>
          <line x1="100" y1="130" x2="85" y2="130" stroke="#374151" stroke-width="2"/>
          <circle cx="82" cy="130" r="3" fill="#374151"/>
          <text x="55" y="125" class="text-xs fill-gray-700 dark:fill-gray-300">V_GS</text>
          <text x="50" y="140" class="text-xs fill-gray-500 dark:fill-gray-400">({{ gateVoltage.toFixed(1) }}V)</text>
          
          <!-- Gate plate -->
          <line x1="100" y1="115" x2="100" y2="155" stroke="#374151" stroke-width="3"/>
          
          <!-- Channel (broken line for enhancement mode) -->
          <line x1="115" y1="115" x2="115" y2="155" stroke="#374151" stroke-width="2" stroke-dasharray="5,3"/>
          
          <!-- Drain -->
          <line x1="115" y1="120" x2="150" y2="120" stroke="#374151" stroke-width="2"/>
          <line x1="150" y1="100" x2="150" y2="120" stroke="#374151" stroke-width="2"/>
          
          <!-- Source -->
          <line x1="115" y1="150" x2="150" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="150" y1="150" x2="150" y2="170" stroke="#374151" stroke-width="2"/>
          
          <!-- Arrow pointing inward (N-channel) -->
          <line x1="140" y1="145" x2="132" y2="138" stroke="#374151" stroke-width="2"/>
          <line x1="132" y1="138" x2="138" y2="132" stroke="#374151" stroke-width="2"/>
          
          <!-- Ground symbol -->
          <line x1="135" y1="170" x2="165" y2="170" stroke="#374151" stroke-width="2"/>
          <line x1="140" y1="175" x2="160" y2="175" stroke="#374151" stroke-width="2"/>
          <line x1="145" y1="180" x2="155" y2="180" stroke="#374151" stroke-width="2"/>
          <text x="170" y="178" class="text-xs fill-gray-700 dark:fill-gray-300">GND</text>
          
          <!-- Current flow arrow -->
          <line x1="160" y1="90" :x2="isOn ? 180 : 160" :y1="90" :y2="90" 
            :stroke="isOn ? '#10B981' : '#9CA3AF'" stroke-width="3"/>
          <polygon :points="isOn ? '185,90 175,85 175,95' : '165,90 155,85 155,95'" 
            :fill="isOn ? '#10B981' : '#9CA3AF'"/>
          <text x="185" y="95" :class="isOn ? 'text-xs fill-green-600 dark:fill-green-400' : 'text-xs fill-gray-500'">
            I_D = {{ formatCurrent(drainCurrent) }}
          </text>
          
          <!-- MOSFET label -->
          <text x="80" y="200" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">N-Channel MOSFET</text>
          <text x="80" y="215" class="text-xs fill-gray-500 dark:fill-gray-400">Enhancement Mode</text>
          
          <!-- V_DS indicator -->
          <line x1="180" y1="120" x2="180" y2="150" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,2"/>
          <text x="185" y="140" class="text-xs fill-amber-600 dark:fill-amber-400">V_DS = {{ drainSourceVoltage.toFixed(2) }}V</text>
        </svg>
      </div>

      <!-- Calculations and Status -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Circuit Analysis</h3>
        
        <!-- MOSFET State -->
        <div class="mb-4 p-3 rounded-lg" :class="getStateBackgroundClass()">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Operating Region:</span>
            <span class="font-bold text-lg" :class="getStateTextColor()">{{ mosfetState }}</span>
          </div>
        </div>
        
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Gate-Source Voltage (V_GS):</span>
            <span class="font-mono font-semibold text-blue-600 dark:text-blue-400">{{ gateVoltage.toFixed(2) }} V</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Threshold Voltage (V_th):</span>
            <span class="font-mono font-semibold text-gray-600 dark:text-gray-400">{{ thresholdVoltage.toFixed(2) }} V</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Overdrive Voltage (V_ov):</span>
            <span class="font-mono font-semibold" :class="overdriveVoltage > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ overdriveVoltage.toFixed(2) }} V
            </span>
          </div>
          <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
            <span class="text-gray-800 dark:text-gray-200 font-semibold">Drain Current (I_D):</span>
            <span class="font-mono font-bold text-green-600 dark:text-green-400">{{ formatCurrent(drainCurrent) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Drain-Source Voltage (V_DS):</span>
            <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ drainSourceVoltage.toFixed(2) }} V</span>
          </div>
          <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
            <span class="text-gray-800 dark:text-gray-200 font-semibold">Power Dissipation:</span>
            <span class="font-mono font-bold text-amber-600 dark:text-amber-400">{{ powerDissipation.toFixed(2) }} W</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Load Voltage:</span>
            <span class="font-mono font-semibold text-blue-600 dark:text-blue-400">{{ loadVoltage.toFixed(2) }} V</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Characteristic Curve -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">I_D vs V_DS Characteristic Curve</h3>
      <svg viewBox="0 0 400 250" class="w-full h-auto">
        <!-- Grid -->
        <line v-for="i in 5" :key="'h'+i"
          x1="50" y1="30 + i*40" x2="380" y2="30 + i*40"
          stroke="#e5e7eb" stroke-width="1"
        />
        <line v-for="i in 10" :key="'v'+i"
          x1="50 + i*33" y1="30" x2="50 + i*33" y2="230"
          stroke="#e5e7eb" stroke-width="1"
        />
        
        <!-- Axes -->
        <line x1="50" y1="230" x2="380" y2="230" stroke="#374151" stroke-width="2"/>
        <line x1="50" y1="230" x2="50" y2="30" stroke="#374151" stroke-width="2"/>
        
        <!-- Axis labels -->
        <text x="215" y="245" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">V_DS (V)</text>
        <text x="20" y="130" text-anchor="middle" transform="rotate(-90 20 130)" class="text-xs fill-gray-600 dark:fill-gray-400">I_D (mA)</text>
        
        <!-- V_DS ticks -->
        <text x="50" y="242" text-anchor="middle" class="text-xs fill-gray-500">0</text>
        <text x="116" y="242" text-anchor="middle" class="text-xs fill-gray-500">10</text>
        <text x="182" y="242" text-anchor="middle" class="text-xs fill-gray-500">20</text>
        <text x="248" y="242" text-anchor="middle" class="text-xs fill-gray-500">30</text>
        <text x="314" y="242" text-anchor="middle" class="text-xs fill-gray-500">40</text>
        <text x="380" y="242" text-anchor="middle" class="text-xs fill-gray-500">50</text>
        
        <!-- Characteristic curve for current V_GS -->
        <path 
          :d="getCharacteristicPath()"
          fill="none"
          stroke="#9FA8DA"
          stroke-width="3"
        />
        
        <!-- Current operating point -->
        <circle 
          :cx="50 + drainSourceVoltage * 6.6" 
          :cy="230 - (drainCurrent * 1000 / transconductance) * 40"
          r="5"
          :fill="isOn ? '#10B981' : '#EF4444'"
        />
        
        <!-- Operating point label -->
        <text :x="60 + drainSourceVoltage * 6.6" :y="225 - (drainCurrent * 1000 / transconductance) * 40" 
          class="text-xs font-semibold" :class="isOn ? 'fill-green-600 dark:fill-green-400' : 'fill-red-600 dark:fill-red-400'">
          Current Point
        </text>
        
        <!-- Saturation region line -->
        <text x="300" y="50" class="text-xs fill-gray-500 dark:fill-gray-400">Saturation Region</text>
        <text x="80" y="150" class="text-xs fill-gray-500 dark:fill-gray-400">Linear Region</text>
        <text x="60" y="220" class="text-xs fill-gray-500 dark:fill-gray-400">Cutoff</text>
        
        <!-- V_GS label -->
        <text x="300" y="230" class="text-xs fill-blue-600 dark:fill-blue-400 font-semibold">V_GS = {{ gateVoltage.toFixed(1) }}V</text>
      </svg>
    </div>

    <!-- Formulas -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Formulas</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <p>V_ov = V_GS - V_th</p>
        <p v-if="mosfetState === 'Cutoff'">I_D = 0</p>
        <p v-else-if="mosfetState === 'Linear'">I_D = K[(2×V_ov×V_DS) - V_DS²]</p>
        <p v-else>I_D = K × V_ov²</p>
        <p>P = I_D × V_DS</p>
        <p>V_DS(sat) = V_GS - V_th</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const gateVoltage = ref(0)
const drainVoltage = ref(12)
const loadResistance = ref(100)
const thresholdVoltage = ref(4)
const transconductance = ref(100) // mA/V²

// Calculated values
const overdriveVoltage = computed(() => {
  return gateVoltage.value - thresholdVoltage.value
})

const drainCurrent = computed(() => {
  const V_ov = overdriveVoltage.value
  const V_DS_max = drainVoltage.value
  const K = transconductance.value / 1000 // Convert to A/V²
  
  // Cutoff region
  if (V_ov <= 0) {
    return 0
  }
  
  // Calculate I_D in saturation
  const I_D_sat = K * V_ov * V_ov
  
  // Calculate V_DS(sat)
  const V_DS_sat = V_ov
  
  // Check if in linear or saturation
  if (V_DS_max >= V_DS_sat) {
    // Saturation region
    return I_D_sat
  } else {
    // Linear region (triode)
    return K * (2 * V_ov * V_DS_max - V_DS_max * V_DS_max)
  }
})

const drainSourceVoltage = computed(() => {
  const I_D = drainCurrent.value
  return drainVoltage.value - (I_D * loadResistance.value)
})

const mosfetState = computed(() => {
  const V_ov = overdriveVoltage.value
  const V_DS = drainSourceVoltage.value
  const V_DS_sat = V_ov
  
  if (V_ov <= 0) {
    return 'Cutoff (OFF)'
  } else if (V_DS > V_DS_sat) {
    return 'Saturation (ON)'
  } else {
    return 'Linear'
  }
})

const isOn = computed(() => {
  return mosfetState.value !== 'Cutoff (OFF)'
})

const powerDissipation = computed(() => {
  return drainCurrent.value * drainSourceVoltage.value
})

const loadVoltage = computed(() => {
  return drainCurrent.value * loadResistance.value
})

// Helper functions
const formatResistance = (r: number): string => {
  if (r >= 1000) {
    return (r / 1000).toFixed(1) + 'kΩ'
  }
  return r.toFixed(0) + 'Ω'
}

const formatCurrent = (current: number): string => {
  if (current >= 1) {
    return current.toFixed(3) + ' A'
  }
  return (current * 1000).toFixed(1) + ' mA'
}

const getLoadStep = () => {
  if (loadResistance.value >= 500) return 50
  if (loadResistance.value >= 100) return 10
  return 5
}

const getStateClass = () => {
  const state = mosfetState.value
  if (state === 'Cutoff (OFF)') return 'bg-gray-400'
  if (state === 'Saturation (ON)') return 'bg-green-500'
  return 'bg-blue-500'
}

const getStateBackgroundClass = () => {
  const state = mosfetState.value
  if (state === 'Cutoff (OFF)') return 'bg-gray-100 dark:bg-gray-700'
  if (state === 'Saturation (ON)') return 'bg-green-100 dark:bg-green-900/30'
  return 'bg-blue-100 dark:bg-blue-900/30'
}

const getStateTextColor = () => {
  const state = mosfetState.value
  if (state === 'Cutoff (OFF)') return 'text-gray-600 dark:text-gray-400'
  if (state === 'Saturation (ON)') return 'text-green-600 dark:text-green-400'
  return 'text-blue-600 dark:text-blue-400'
}

const getCharacteristicPath = () => {
  const K = transconductance.value / 1000
  const V_ov = overdriveVoltage.value
  const V_DD = drainVoltage.value
  
  if (V_ov <= 0) {
    // Just show x-axis
    return 'M 50 230 L 380 230'
  }
  
  const V_DS_sat = V_ov
  const I_D_sat = K * V_ov * V_ov
  
  // Scale factors
  const xScale = 6.6 // V_DS scale
  const yScale = 40 / (K * 100) // I_D scale (normalized to transconductance)
  
  let path = `M 50 230`
  
  // Linear region (0 to V_DS_sat)
  for (let V_DS = 0; V_DS <= Math.min(V_DS_sat, 50); V_DS += 0.5) {
    const I_D = K * (2 * V_ov * V_DS - V_DS * V_DS)
    const x = 50 + V_DS * xScale
    const y = 230 - I_D * yScale * 1000
    path += ` L ${x} ${y}`
  }
  
  // Saturation region (V_DS_sat to V_DD)
  if (V_DS_sat < 50) {
    const x_sat = 50 + V_DS_sat * xScale
    const y_sat = 230 - I_D_sat * yScale * 1000
    const x_end = 50 + Math.min(50, V_DD) * xScale
    path += ` L ${x_end} ${y_sat}`
  }
  
  return path
}

// Presets
const setPreset = (preset: string) => {
  switch (preset) {
    case 'off':
      gateVoltage.value = 0
      drainVoltage.value = 12
      loadResistance.value = 100
      break
    case 'on':
      gateVoltage.value = 8
      drainVoltage.value = 12
      loadResistance.value = 100
      thresholdVoltage.value = 4
      break
    case 'linear':
      gateVoltage.value = 5
      drainVoltage.value = 12
      loadResistance.value = 50
      thresholdVoltage.value = 4
      break
    case 'motor':
      gateVoltage.value = 10
      drainVoltage.value = 24
      loadResistance.value = 20
      thresholdVoltage.value = 4
      transconductance.value = 200
      break
  }
}
</script>

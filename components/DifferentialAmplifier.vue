<template>
  <div class="differential-amplifier-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🔬 Differential Amplifier
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Adjust input voltages to see how the differential amplifier responds
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 800 450" class="w-full h-auto">
        <!-- Title -->
        <text x="400" y="30" text-anchor="middle" :font-size="18" font-weight="bold" fill="#3B82F6">
          Differential Amplifier Circuit
        </text>
        
        <!-- Op-Amp Symbol -->
        <g transform="translate(350, 200)">
          <!-- Triangle body -->
          <polygon points="-100,-80 -100,80 100,0" fill="white" stroke="#3B82F6" stroke-width="3"/>
          
          <!-- Input labels -->
          <text x="-90" y="-35" text-anchor="middle" :font-size="16" font-weight="bold" fill="#3B82F6">-</text>
          <text x="-90" y="45" text-anchor="middle" :font-size="16" font-weight="bold" fill="#3B82F6">+</text>
          
          <!-- Input 1 (Inverting) -->
          <line x1="-200" y1="-40" x2="-100" y2="-40" :stroke="vin1Color" stroke-width="3"/>
          <circle cx="-210" cy="-40" r="8" :fill="vin1Color"/>
          <text x="-210" y="-65" text-anchor="middle" :font-size="12" font-weight="bold" :fill="vin1Color">
            V<sub>in1</sub>
          </text>
          <text x="-210" y="-15" text-anchor="middle" :font-size="11" :fill="vin1Color">
            {{ vin1.toFixed(2) }}V
          </text>
          
          <!-- Input 2 (Non-inverting) -->
          <line x1="-200" y1="40" x2="-100" y2="40" :stroke="vin2Color" stroke-width="3"/>
          <circle cx="-210" cy="40" r="8" :fill="vin2Color"/>
          <text x="-210" y="20" text-anchor="middle" :font-size="12" font-weight="bold" :fill="vin2Color">
            V<sub>in2</sub>
          </text>
          <text x="-210" y="60" text-anchor="middle" :font-size="11" :fill="vin2Color">
            {{ vin2.toFixed(2) }}V
          </text>
          
          <!-- Output -->
          <line x1="100" y1="0" x2="200" y2="0" :stroke="voutColor" stroke-width="3"/>
          <circle cx="210" cy="0" r="8" :fill="voutColor"/>
          <text x="210" y="-15" text-anchor="middle" :font-size="12" font-weight="bold" :fill="voutColor">
            V<sub>out</sub>
          </text>
          <text x="210" y="25" text-anchor="middle" :font-size="11" :fill="voutColor">
            {{ vout.toFixed(2) }}V
          </text>
          
          <!-- Power supply labels -->
          <text x="0" y="-95" text-anchor="middle" :font-size="12" font-weight="bold" fill="#22C55E">
            +V<sub>CC</sub>
          </text>
          <text x="0" y="105" text-anchor="middle" :font-size="12" font-weight="bold" fill="#EF4444">
            -V<sub>EE</sub>
          </text>
          
          <!-- Differential gain label -->
          <text x="0" y="130" text-anchor="middle" :font-size="13" font-weight="bold" fill="#8B5CF6">
            A<sub>d</sub> = {{ differentialGain }}x
          </text>
        </g>
        
        <!-- Voltage indicators -->
        <g transform="translate(50, 380)">
          <rect x="0" y="0" width="180" height="50" rx="5" fill="white" stroke="#3B82F6" stroke-width="2"/>
          <text x="90" y="20" text-anchor="middle" :font-size="12" font-weight="bold" fill="#3B82F6">
            Differential (V<sub>diff</sub>)
          </text>
          <text x="90" y="40" text-anchor="middle" :font-size="14" font-weight="bold" :fill="vdiff > 0 ? '#22C55E' : vdiff < 0 ? '#EF4444' : '#6B7280'">
            {{ vdiff > 0 ? '+' : '' }}{{ vdiff.toFixed(3) }}V
          </text>
        </g>
        
        <g transform="translate(260, 380)">
          <rect x="0" y="0" width="180" height="50" rx="5" fill="white" stroke="#8B5CF6" stroke-width="2"/>
          <text x="90" y="20" text-anchor="middle" :font-size="12" font-weight="bold" fill="#8B5CF6">
            Common-Mode (V<sub>cm</sub>)
          </text>
          <text x="90" y="40" text-anchor="middle" :font-size="14" font-weight="bold" fill="#8B5CF6">
            {{ vcm.toFixed(3) }}V
          </text>
        </g>
        
        <g transform="translate(470, 380)">
          <rect x="0" y="0" width="180" height="50" rx="5" fill="white" stroke="#F59E0B" stroke-width="2"/>
          <text x="90" y="20" text-anchor="middle" :font-size="12" font-weight="bold" fill="#F59E0B">
            CMRR
          </text>
          <text x="90" y="40" text-anchor="middle" :font-size="14" font-weight="bold" fill="#F59E0B">
            {{ cmrr }} dB
          </text>
        </g>
      </svg>
    </div>

    <!-- Controls Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Input 1 Control -->
      <div class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Input 1 (V<sub>in1</sub>): {{ vin1.toFixed(2) }}V
        </label>
        <input
          type="range"
          v-model.number="vin1"
          min="-5"
          max="5"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>-5V</span>
          <span>0V</span>
          <span>+5V</span>
        </div>
      </div>

      <!-- Input 2 Control -->
      <div class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Input 2 (V<sub>in2</sub>): {{ vin2.toFixed(2) }}V
        </label>
        <input
          type="range"
          v-model.number="vin2"
          min="-5"
          max="5"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>-5V</span>
          <span>0V</span>
          <span>+5V</span>
        </div>
      </div>

      <!-- Differential Gain Control -->
      <div class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Differential Gain: {{ differentialGain }}x
        </label>
        <input
          type="range"
          v-model.number="differentialGain"
          min="1"
          max="20"
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1x</span>
          <span>10x</span>
          <span>20x</span>
        </div>
      </div>

      <!-- CMRR Control -->
      <div class="control-panel bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          CMRR: {{ cmrr }} dB
        </label>
        <input
          type="range"
          v-model.number="cmrr"
          min="40"
          max="120"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        >
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>40 dB</span>
          <span>80 dB</span>
          <span>120 dB</span>
        </div>
      </div>
    </div>

    <!-- Waveform Visualization -->
    <div class="waveform-visual bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📊 Input/Output Waveforms
      </h3>
      <svg viewBox="0 0 800 250" class="w-full h-auto">
        <!-- Grid lines -->
        <line x1="50" y1="125" x2="750" y2="125" stroke="#9CA3AF" stroke-width="1" stroke-dasharray="5,5"/>
        <text x="760" y="130" :font-size="12" fill="#6B7280">0V</text>
        
        <!-- Y-axis labels -->
        <text x="20" y="50" text-anchor="middle" :font-size="11" fill="#6B7280">+5V</text>
        <text x="20" y="200" text-anchor="middle" :font-size="11" fill="#6B7280">-5V</text>
        
        <!-- Waveform 1: Input 1 -->
        <path :d="generateWaveform(vin1, 1, 50)" fill="none" :stroke="vin1Color" stroke-width="2"/>
        <text x="60" y="20" :font-size="12" font-weight="bold" :fill="vin1Color">
          V<sub>in1</sub> ({{ vin1.toFixed(2) }}V)
        </text>
        
        <!-- Waveform 2: Input 2 -->
        <path :d="generateWaveform(vin2, 2, 50)" fill="none" :stroke="vin2Color" stroke-width="2"/>
        <text x="200" y="20" :font-size="12" font-weight="bold" :fill="vin2Color">
          V<sub>in2</sub> ({{ vin2.toFixed(2) }}V)
        </text>
        
        <!-- Waveform 3: Output -->
        <path :d="generateWaveform(vout, 3, 50)" fill="none" :stroke="voutColor" stroke-width="3"/>
        <text x="400" y="20" :font-size="12" font-weight="bold" :fill="voutColor">
          V<sub>out</sub> ({{ vout.toFixed(2) }}V)
        </text>
      </svg>
    </div>

    <!-- Results Panel -->
    <div class="results-panel bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📈 Analysis Results
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Differential Signal</div>
          <div class="text-2xl font-bold" :class="vdiff > 0 ? 'text-green-500' : vdiff < 0 ? 'text-red-500' : 'text-gray-500'">
            {{ vdiff > 0 ? '+' : '' }}{{ vdiff.toFixed(3) }}V
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Common-Mode Signal</div>
          <div class="text-2xl font-bold text-purple-500">
            {{ vcm.toFixed(3) }}V
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300">Output Voltage</div>
          <div class="text-2xl font-bold" :class="vout > 0 ? 'text-green-500' : vout < 0 ? 'text-red-500' : 'text-gray-500'">
            {{ vout > 0 ? '+' : '' }}{{ vout.toFixed(3) }}V
          </div>
        </div>
      </div>
      
      <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
        <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Signal Analysis:</div>
        <div class="text-sm text-gray-800 dark:text-gray-200">
          <span v-if="Math.abs(vdiff) < 0.01">⚠️ No differential signal detected</span>
          <span v-else-if="Math.abs(vcm) < 0.01">✅ Pure differential signal (excellent rejection)</span>
          <span v-else>
            📊 Differential: {{ ((Math.abs(vdiff) / (Math.abs(vdiff) + Math.abs(vcm))) * 100).toFixed(1) }}% | 
            Common-mode: {{ ((Math.abs(vcm) / (Math.abs(vdiff) + Math.abs(vcm))) * 100).toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Input controls
const vin1 = ref(1.0)
const vin2 = ref(-1.0)
const differentialGain = ref(5)
const cmrr = ref(80)

// Calculations
const vdiff = computed(() => vin1.value - vin2.value)
const vcm = computed(() => (vin1.value + vin2.value) / 2)

// CMRR linear value
const cmrrLinear = computed(() => {
  return Math.pow(10, cmrr.value / 20)
})

// Common-mode gain
const commonModeGain = computed(() => {
  return differentialGain.value / cmrrLinear.value
})

// Output voltage (limited to +/- 15V for saturation)
const vout = computed(() => {
  const idealOutput = differentialGain.value * vdiff.value + commonModeGain.value * vcm.value
  return Math.max(-15, Math.min(15, idealOutput))
})

// Color calculations
const vin1Color = computed(() => {
  if (vin1.value > 0.1) return '#22C55E' // Green for positive
  if (vin1.value < -0.1) return '#EF4444' // Red for negative
  return '#6B7280' // Gray for zero
})

const vin2Color = computed(() => {
  if (vin2.value > 0.1) return '#22C55E'
  if (vin2.value < -0.1) return '#EF4444'
  return '#6B7280'
})

const voutColor = computed(() => {
  if (vout.value > 0.1) return '#22C55E'
  if (vout.value < -0.1) return '#EF4444'
  return '#6B7280'
})

// Generate waveform path
const generateWaveform = (voltage: number, offsetMultiplier: number, startX: number) => {
  const amplitude = (voltage / 5) * 80
  const centerY = 125
  const points: string[] = []
  
  for (let x = 0; x <= 700; x += 10) {
    const angle = (x / 700) * Math.PI * 4
    const y = centerY + amplitude * Math.sin(angle + offsetMultiplier)
    points.push(`${startX + x},${y}`)
  }
  
  return `M ${points.join(' L ')}`
}
</script>

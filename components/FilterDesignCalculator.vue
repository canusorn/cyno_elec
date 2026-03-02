<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <svg class="w-7 h-7 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      Filter Design Calculator
    </h2>

    <!-- Filter Type Selection -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Filter Type
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="type in filterTypes"
          :key="type.value"
          @click="filterType = type.value"
          :class="[
            'px-4 py-3 rounded-lg font-medium transition-all',
            filterType === type.value
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <!-- Circuit Type Selection -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Circuit Type
      </label>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="circuit in circuitTypes"
          :key="circuit.value"
          @click="circuitType = circuit.value"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all',
            circuitType === circuit.value
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          {{ circuit.label }}
        </button>
      </div>
    </div>

    <!-- Input Parameters -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Cutoff Frequency (fc)
        </label>
        <div class="relative">
          <input
            v-model.number="cutoffFreq"
            type="number"
            step="any"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter cutoff frequency"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 dark:text-gray-400 text-sm">Hz</span>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {{ capacitorLabel }}
        </label>
        <div class="relative">
          <input
            v-model.number="capacitance"
            type="number"
            step="any"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            :placeholder="'Enter ' + (circuitType === 'RC' ? 'capacitance' : 'inductance')"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 dark:text-gray-400 text-sm">{{ circuitType === 'RC' ? 'F' : 'H' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Calculate Button -->
    <button
      @click="calculateFilter"
      class="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all mb-6"
    >
      Calculate Filter Design
    </button>

    <!-- Results -->
    <div v-if="calculated" class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Design Results</h3>

      <!-- Calculated Component Value -->
      <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-gray-700 dark:text-gray-300 font-medium">
          {{ resistanceLabel }}:
        </span>
        <span class="text-2xl font-bold text-primary">
          {{ formatValue(resistanceValue) }} {{ circuitType === 'RC' ? 'Ω' : 'F' }}
        </span>
      </div>

      <!-- Cutoff Frequency -->
      <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-gray-700 dark:text-gray-300 font-medium">
          Cutoff Frequency (fc):
        </span>
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ formatFreq(cutoffFreq) }}
        </span>
      </div>

      <!-- Angular Frequency -->
      <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-gray-700 dark:text-gray-300 font-medium">
          Angular Frequency (ωc):
        </span>
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ angularFreq.toFixed(2) }} rad/s
        </span>
      </div>

      <!-- Time Constant (for RC/RL) -->
      <div v-if="circuitType !== 'LC'" class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
        <span class="text-gray-700 dark:text-gray-300 font-medium">
          Time Constant (τ):
        </span>
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ timeConstant.toFixed(6) }} s
        </span>
      </div>

      <!-- Formulas -->
      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">📚 Formula Used:</h4>
        <p class="text-blue-800 dark:text-blue-200 font-mono text-sm">{{ formula }}</p>
      </div>
    </div>

    <!-- Frequency Response Chart -->
    <div v-if="calculated" class="mt-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Frequency Response</h3>
      <div class="bg-white dark:bg-gray-900 rounded-lg p-4">
        <canvas ref="chartCanvas" height="300"></canvas>
      </div>
      <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>🔴 Cutoff Frequency ({{ formatFreq(cutoffFreq) }}) marked at -3dB point</p>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div v-if="calculated" class="mt-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔌 Circuit Diagram</h3>
      <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 flex justify-center items-center">
        <svg v-html="circuitDiagram" class="w-full max-w-2xl" viewBox="0 0 600 200"></svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📖 Understanding Filters</h3>

      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">{{ filterTypeDescriptions[filterType].title }}</h4>
          <p class="text-sm">{{ filterTypeDescriptions[filterType].description }}</p>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Characteristics:</h4>
          <ul class="list-disc pl-6 text-sm space-y-1">
            <li>{{ circuitType }} filters use {{ circuitType === 'RC' ? 'resistors and capacitors' : circuitType === 'RL' ? 'resistors and inductors' : 'inductors and capacitors' }}</li>
            <li>Cutoff frequency is where output drops to -3dB (70.7% of input)</li>
            <li>Roll-off rate: {{ circuitType === 'RC' || circuitType === 'RL' ? '20dB/decade (1st order)' : '40dB/decade (2nd order)' }}</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Common Applications:</h4>
          <ul class="list-disc pl-6 text-sm space-y-1">
            <li>Audio systems: tone controls, crossovers</li>
            <li>Communication systems: signal selection</li>
            <li>Power supplies: noise reduction</li>
            <li>Signal processing: anti-aliasing</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const filterType = ref('lowpass')
const circuitType = ref('RC')
const cutoffFreq = ref(1000)
const capacitance = ref(0.0001) // 100µF
const calculated = ref(false)
const chartCanvas = ref(null)
let chartInstance = null

const filterTypes = [
  { value: 'lowpass', label: 'Low-Pass' },
  { value: 'highpass', label: 'High-Pass' },
  { value: 'bandpass', label: 'Band-Pass' },
  { value: 'bandstop', label: 'Band-Stop' }
]

const circuitTypes = [
  { value: 'RC', label: 'RC Filter' },
  { value: 'RL', label: 'RL Filter' },
  { value: 'LC', label: 'LC Filter' }
]

const filterTypeDescriptions = {
  lowpass: {
    title: 'Low-Pass Filter',
    description: 'Allows signals with a frequency lower than the cutoff frequency to pass through, attenuating frequencies higher than the cutoff.'
  },
  highpass: {
    title: 'High-Pass Filter',
    description: 'Allows signals with a frequency higher than the cutoff frequency to pass through, attenuating frequencies lower than the cutoff.'
  },
  bandpass: {
    title: 'Band-Pass Filter',
    description: 'Allows frequencies within a certain range to pass through, attenuating frequencies outside that range.'
  },
  bandstop: {
    title: 'Band-Stop Filter',
    description: 'Attenuates frequencies within a certain range, allowing frequencies outside that range to pass through.'
  }
}

const resistanceValue = ref(0)
const angularFreq = ref(0)
const timeConstant = ref(0)

const capacitorLabel = computed(() => {
  return circuitType.value === 'RC' ? 'Capacitance (C)' : 'Inductance (L)'
})

const resistanceLabel = computed(() => {
  return circuitType.value === 'RC' ? 'Resistance (R)' : 'Capacitance (C)'
})

const formula = computed(() => {
  if (circuitType.value === 'RC') {
    return filterType.value === 'lowpass'
      ? 'fc = 1 / (2π × R × C)'
      : 'fc = 1 / (2π × R × C)'
  } else if (circuitType.value === 'RL') {
    return filterType.value === 'lowpass'
      ? 'fc = R / (2π × L)'
      : 'fc = R / (2π × L)'
  } else {
    return 'fc = 1 / (2π × √(L × C))'
  }
})

const circuitDiagram = computed(() => {
  if (circuitType.value === 'RC') {
    if (filterType.value === 'lowpass') {
      return `
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#9FA8DA"/>
          </marker>
        </defs>
        <!-- Input -->
        <text x="30" y="100" font-size="14" fill="#666">Vin</text>
        <line x1="60" y1="95" x2="100" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
        
        <!-- Resistor -->
        <rect x="100" y="85" width="80" height="20" fill="none" stroke="#333" stroke-width="2"/>
        <text x="140" y="80" font-size="12" fill="#666">R</text>
        
        <!-- Wire to capacitor -->
        <line x1="180" y1="95" x2="220" y2="95" stroke="#333" stroke-width="2"/>
        
        <!-- Capacitor -->
        <line x1="220" y1="75" x2="220" y2="115" stroke="#333" stroke-width="3"/>
        <line x1="230" y1="75" x2="230" y2="115" stroke="#333" stroke-width="3"/>
        <text x="225" y="70" font-size="12" fill="#666">C</text>
        
        <!-- To output -->
        <line x1="230" y1="95" x2="300" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="310" y="100" font-size="14" fill="#666">Vout</text>
        
        <!-- Ground -->
        <line x1="250" y1="95" x2="250" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="235" y1="140" x2="265" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="240" y1="145" x2="260" y2="145" stroke="#333" stroke-width="2"/>
        <line x1="245" y1="150" x2="255" y2="150" stroke="#333" stroke-width="2"/>
      `
    } else {
      return `
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#9FA8DA"/>
          </marker>
        </defs>
        <!-- Input -->
        <text x="30" y="100" font-size="14" fill="#666">Vin</text>
        <line x1="60" y1="95" x2="100" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow2)"/>
        
        <!-- Capacitor -->
        <line x1="100" y1="75" x2="100" y2="115" stroke="#333" stroke-width="3"/>
        <line x1="110" y1="75" x2="110" y2="115" stroke="#333" stroke-width="3"/>
        <text x="105" y="70" font-size="12" fill="#666">C</text>
        
        <!-- Wire to resistor -->
        <line x1="110" y1="95" x2="160" y2="95" stroke="#333" stroke-width="2"/>
        
        <!-- Resistor -->
        <rect x="160" y="85" width="80" height="20" fill="none" stroke="#333" stroke-width="2"/>
        <text x="200" y="80" font-size="12" fill="#666">R</text>
        
        <!-- To output -->
        <line x1="240" y1="95" x2="300" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow2)"/>
        <text x="310" y="100" font-size="14" fill="#666">Vout</text>
        
        <!-- Ground -->
        <line x1="270" y1="95" x2="270" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="255" y1="140" x2="285" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="260" y1="145" x2="280" y2="145" stroke="#333" stroke-width="2"/>
        <line x1="265" y1="150" x2="275" y2="150" stroke="#333" stroke-width="2"/>
      `
    }
  } else if (circuitType.value === 'RL') {
    if (filterType.value === 'lowpass') {
      return `
        <defs>
          <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#9FA8DA"/>
          </marker>
        </defs>
        <!-- Input -->
        <text x="30" y="100" font-size="14" fill="#666">Vin</text>
        <line x1="60" y1="95" x2="100" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
        
        <!-- Resistor -->
        <rect x="100" y="85" width="80" height="20" fill="none" stroke="#333" stroke-width="2"/>
        <text x="140" y="80" font-size="12" fill="#666">R</text>
        
        <!-- Wire to inductor -->
        <line x1="180" y1="95" x2="220" y2="95" stroke="#333" stroke-width="2"/>
        
        <!-- Inductor -->
        <path d="M220,95 Q230,80 240,95 Q250,110 260,95 Q270,80 280,95 Q290,110 300,95" fill="none" stroke="#333" stroke-width="2"/>
        <text x="260" y="70" font-size="12" fill="#666">L</text>
        
        <!-- To output -->
        <line x1="300" y1="95" x2="350" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow3)"/>
        <text x="360" y="100" font-size="14" fill="#666">Vout</text>
        
        <!-- Ground -->
        <line x1="325" y1="95" x2="325" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="310" y1="140" x2="340" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="315" y1="145" x2="335" y2="145" stroke="#333" stroke-width="2"/>
        <line x1="320" y1="150" x2="330" y2="150" stroke="#333" stroke-width="2"/>
      `
    } else {
      return `
        <defs>
          <marker id="arrow4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#9FA8DA"/>
          </marker>
        </defs>
        <!-- Input -->
        <text x="30" y="100" font-size="14" fill="#666">Vin</text>
        <line x1="60" y1="95" x2="100" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow4)"/>
        
        <!-- Inductor -->
        <path d="M100,95 Q110,80 120,95 Q130,110 140,95 Q150,80 160,95 Q170,110 180,95" fill="none" stroke="#333" stroke-width="2"/>
        <text x="140" y="70" font-size="12" fill="#666">L</text>
        
        <!-- Wire to resistor -->
        <line x1="180" y1="95" x2="220" y2="95" stroke="#333" stroke-width="2"/>
        
        <!-- Resistor -->
        <rect x="220" y="85" width="80" height="20" fill="none" stroke="#333" stroke-width="2"/>
        <text x="260" y="80" font-size="12" fill="#666">R</text>
        
        <!-- To output -->
        <line x1="300" y1="95" x2="350" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow4)"/>
        <text x="360" y="100" font-size="14" fill="#666">Vout</text>
        
        <!-- Ground -->
        <line x1="325" y1="95" x2="325" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="310" y1="140" x2="340" y2="140" stroke="#333" stroke-width="2"/>
        <line x1="315" y1="145" x2="335" y2="145" stroke="#333" stroke-width="2"/>
        <line x1="320" y1="150" x2="330" y2="150" stroke="#333" stroke-width="2"/>
      `
    }
  } else {
    // LC filter
    return `
      <defs>
        <marker id="arrow5" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#9FA8DA"/>
        </marker>
      </defs>
      <!-- Input -->
      <text x="30" y="100" font-size="14" fill="#666">Vin</text>
      <line x1="60" y1="95" x2="100" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow5)"/>
      
      <!-- Inductor -->
      <path d="M100,95 Q110,80 120,95 Q130,110 140,95 Q150,80 160,95 Q170,110 180,95" fill="none" stroke="#333" stroke-width="2"/>
      <text x="140" y="70" font-size="12" fill="#666">L</text>
      
      <!-- Wire to capacitor -->
      <line x1="180" y1="95" x2="220" y2="95" stroke="#333" stroke-width="2"/>
      
      <!-- Capacitor -->
      <line x1="220" y1="75" x2="220" y2="115" stroke="#333" stroke-width="3"/>
      <line x1="230" y1="75" x2="230" y2="115" stroke="#333" stroke-width="3"/>
      <text x="225" y="70" font-size="12" fill="#666">C</text>
      
      <!-- To output -->
      <line x1="230" y1="95" x2="300" y2="95" stroke="#333" stroke-width="2" marker-end="url(#arrow5)"/>
      <text x="310" y="100" font-size="14" fill="#666">Vout</text>
      
      <!-- Ground -->
      <line x1="265" y1="95" x2="265" y2="140" stroke="#333" stroke-width="2"/>
      <line x1="250" y1="140" x2="280" y2="140" stroke="#333" stroke-width="2"/>
      <line x1="255" y1="145" x2="275" y2="145" stroke="#333" stroke-width="2"/>
      <line x1="260" y1="150" x2="270" y2="150" stroke="#333" stroke-width="2"/>
    `
  }
})

function formatValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + 'M'
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'k'
  } else if (value < 0.000001) {
    return (value * 1000000000).toFixed(2) + 'n'
  } else if (value < 0.001) {
    return (value * 1000000).toFixed(2) + 'µ'
  } else if (value < 1) {
    return (value * 1000).toFixed(2) + 'm'
  }
  return value.toFixed(2)
}

function formatFreq(freq) {
  if (freq >= 1000000) {
    return (freq / 1000000).toFixed(2) + ' MHz'
  } else if (freq >= 1000) {
    return (freq / 1000).toFixed(2) + ' kHz'
  } else if (freq < 1) {
    return (freq * 1000).toFixed(2) + ' mHz'
  }
  return freq.toFixed(2) + ' Hz'
}

async function calculateFilter() {
  const fc = cutoffFreq.value
  const C = capacitance.value

  if (circuitType.value === 'RC') {
    // For RC filters: fc = 1/(2πRC), solving for R
    resistanceValue.value = 1 / (2 * Math.PI * fc * C)
    angularFreq.value = 2 * Math.PI * fc
    timeConstant.value = resistanceValue.value * C
  } else if (circuitType.value === 'RL') {
    // For RL filters: fc = R/(2πL), solving for R (L is known)
    const L = C // Using capacitance variable as inductance
    resistanceValue.value = 2 * Math.PI * fc * L
    angularFreq.value = 2 * Math.PI * fc
    timeConstant.value = L / resistanceValue.value
  } else {
    // For LC filters: fc = 1/(2π√LC)
    const L = C // Using capacitance variable as inductance
    // fc^2 = 1/(4π²LC), LC = 1/(4π²fc²)
    const LC = 1 / (4 * Math.PI * Math.PI * fc * fc)
    // C = LC/L
    resistanceValue.value = LC / L
    angularFreq.value = 2 * Math.PI * fc
    timeConstant.value = Math.sqrt(L * resistanceValue.value)
  }

  calculated.value = true

  await nextTick()
  drawChart()
}

function drawChart() {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  const width = chartCanvas.value.width = chartCanvas.value.offsetWidth
  const height = chartCanvas.value.height

  // Generate frequency response data
  const frequencies = []
  const magnitudes = []
  const minFreq = Math.log10(cutoffFreq.value / 100)
  const maxFreq = Math.log10(cutoffFreq.value * 100)

  for (let i = 0; i <= 200; i++) {
    const logFreq = minFreq + (maxFreq - minFreq) * (i / 200)
    const freq = Math.pow(10, logFreq)
    frequencies.push(freq)

    let magnitude
    const fc = cutoffFreq.value

    if (filterType.value === 'lowpass') {
      magnitude = 1 / Math.sqrt(1 + Math.pow(freq / fc, 2))
    } else if (filterType.value === 'highpass') {
      magnitude = (freq / fc) / Math.sqrt(1 + Math.pow(freq / fc, 2))
    } else if (filterType.value === 'bandpass') {
      const Q = 1 // Quality factor
      magnitude = (freq / fc) / Math.sqrt(Math.pow(1 - Math.pow(freq / fc, 2), 2) + Math.pow(freq / (fc * Q), 2))
    } else {
      // bandstop
      const Q = 1
      magnitude = Math.abs(1 - Math.pow(freq / fc, 2)) / Math.sqrt(Math.pow(1 - Math.pow(freq / fc, 2), 2) + Math.pow(freq / (fc * Q), 2))
    }

    magnitudes.push(20 * Math.log10(magnitude)) // Convert to dB
  }

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 1

  // Horizontal lines (dB)
  for (let dB = -40; dB <= 0; dB += 10) {
    const y = 40 + (40 + dB) * (height - 80) / 40
    ctx.beginPath()
    ctx.moveTo(50, y)
    ctx.lineTo(width - 20, y)
    ctx.stroke()

    // Label
    ctx.fillStyle = '#666'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(dB + ' dB', 45, y + 4)
  }

  // Draw frequency response curve
  ctx.strokeStyle = '#9FA8DA'
  ctx.lineWidth = 3
  ctx.beginPath()

  for (let i = 0; i < frequencies.length; i++) {
    const x = 50 + (i / 200) * (width - 70)
    const y = 40 + (magnitudes[i] + 40) * (height - 80) / 40

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Mark cutoff frequency (-3dB point)
  const fcIndex = frequencies.findIndex(f => f >= cutoffFreq.value)
  if (fcIndex >= 0) {
    const x = 50 + (fcIndex / 200) * (width - 70)
    const y = 40 + (magnitudes[fcIndex] + 40) * (height - 80) / 40

    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, 2 * Math.PI)
    ctx.fill()

    // Label
    ctx.fillStyle = '#ef4444'
    ctx.font = 'bold 12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('fc = ' + formatFreq(cutoffFreq.value), x, y - 15)
  }

  // X-axis labels (frequency)
  ctx.fillStyle = '#666'
  ctx.font = '11px sans-serif'
  ctx.textAlign = 'center'

  const freqLabels = [cutoffFreq.value / 100, cutoffFreq.value / 10, cutoffFreq.value, cutoffFreq.value * 10, cutoffFreq.value * 100]
  freqLabels.forEach(freq => {
    const logFreq = Math.log10(freq)
    const x = 50 + ((logFreq - minFreq) / (maxFreq - minFreq)) * (width - 70)
    ctx.fillText(formatFreq(freq), x, height - 10)
  })
}
</script>

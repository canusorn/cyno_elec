<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🔮 Resonant Frequency Calculator
    </h3>

    <!-- Circuit Type Selection -->
    <div class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Circuit Type
      </label>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="circuitType = 'series'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            circuitType === 'series'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Series LC
        </button>
        <button
          @click="circuitType = 'parallel'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            circuitType === 'parallel'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Parallel LC
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Inductance Input -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Inductance (L)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="inductance"
            type="number"
            step="0.1"
            min="0.1"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <select
            v-model="inductanceUnit"
            class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          >
            <option value="H">H</option>
            <option value="mH">mH</option>
            <option value="μH">μH</option>
            <option value="nH">nH</option>
          </select>
        </div>
        <SliderInput
          v-model="inductance"
          :min="0.1"
          :max="100"
          :step="0.1"
          unit=""
          :show-value="false"
        />
      </div>

      <!-- Capacitance Input -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Capacitance (C)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="capacitance"
            type="number"
            step="0.1"
            min="0.1"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <select
            v-model="capacitanceUnit"
            class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          >
            <option value="F">F</option>
            <option value="μF">μF</option>
            <option value="nF">nF</option>
            <option value="pF">pF</option>
          </select>
        </div>
        <SliderInput
          v-model="capacitance"
          :min="0.1"
          :max="1000"
          :step="0.1"
          unit=""
          :show-value="false"
        />
      </div>
    </div>

    <!-- Parallel RLC: Resistance Input -->
    <div v-if="circuitType === 'parallel'" class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Resistance (R) - for Bandwidth
      </label>
      <div class="flex items-center gap-4 mb-3">
        <input
          v-model.number="resistance"
          type="number"
          step="1"
          min="1"
          class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
        />
        <span class="text-gray-600 dark:text-gray-300 font-semibold">Ω</span>
      </div>
      <SliderInput
        v-model="resistance"
        :min="1"
        :max="10000"
        :step="1"
        unit="Ω"
        :show-value="true"
      />
    </div>

    <!-- Results Display -->
    <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Results</h4>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Resonant Frequency -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Resonant Frequency (f₀)</div>
          <div class="text-3xl font-bold text-primary-highlight mb-2">
            {{ formattedFrequency }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            f₀ = 1 / (2π√LC)
          </div>
        </div>

        <!-- Angular Frequency -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Angular Frequency (ω₀)</div>
          <div class="text-3xl font-bold text-primary-highlight mb-2">
            {{ formattedAngularFrequency }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            ω₀ = 1 / √LC rad/s
          </div>
        </div>

        <!-- Bandwidth (Parallel only) -->
        <div v-if="circuitType === 'parallel'" class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Bandwidth (BW)</div>
          <div class="text-3xl font-bold text-green-500 mb-2">
            {{ formattedBandwidth }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            BW = f₀ / Q
          </div>
        </div>

        <!-- Q Factor -->
        <div v-if="circuitType === 'parallel'" class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Quality Factor (Q)</div>
          <div class="text-3xl font-bold text-blue-500 mb-2">
            {{ qFactor.toFixed(2) }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Q = R / √(L/C)
          </div>
        </div>
      </div>
    </div>

    <!-- Reactance Curve Visualization -->
    <div class="mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 Reactance vs Frequency</h4>
      <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
        <svg viewBox="0 0 600 300" class="w-full h-auto">
          <!-- Grid -->
          <defs>
            <pattern id="reactanceGrid" width="60" height="30" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
            </pattern>
          </defs>
          <rect width="600" height="300" fill="url(#reactanceGrid)" />

          <!-- Axes -->
          <line x1="60" y1="270" x2="580" y2="270" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="60" y1="20" x2="60" y2="270" stroke="currentColor" stroke-width="2" class="text-gray-400"/>

          <!-- Axis Labels -->
          <text x="320" y="295" text-anchor="middle" font-size="12" fill="currentColor" class="text-gray-600 dark:text-gray-300">
            Frequency (Hz)
          </text>
          <text x="25" y="150" text-anchor="middle" font-size="12" fill="currentColor" class="text-gray-600 dark:text-gray-300" transform="rotate(-90, 25, 150)">
            Reactance (Ω)
          </text>

          <!-- Inductive Reactance (XL) - Increasing -->
          <path
            :d="inductiveReactancePath"
            fill="none"
            stroke="#ef4444"
            stroke-width="2"
          />
          <text x="500" y="50" font-size="11" fill="#ef4444" font-weight="bold">XL (Inductive)</text>

          <!-- Capacitive Reactance (XC) - Decreasing -->
          <path
            :d="capacitiveReactancePath"
            fill="none"
            stroke="#3b82f6"
            stroke-width="2"
          />
          <text x="500" y="240" font-size="11" fill="#3b82f6" font-weight="bold">XC (Capacitive)</text>

          <!-- Resonant Frequency Marker -->
          <line
            :x1="resonantX"
            y1="20"
            :x2="resonantX"
            y2="270"
            stroke="#22c55e"
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <circle :cx="resonantX" cy="150" r="6" fill="#22c55e"/>
          <text :x="resonantX" y="15" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="bold">
            f₀ = {{ formattedFrequency }}
          </text>

          <!-- Frequency Scale Labels -->
          <text x="60" y="285" text-anchor="middle" font-size="10" fill="currentColor" class="text-gray-500">0</text>
          <text x="200" y="285" text-anchor="middle" font-size="10" fill="currentColor" class="text-gray-500">{{ (resonantFrequency / 4).toExponential(1) }}</text>
          <text x="320" y="285" text-anchor="middle" font-size="10" fill="currentColor" class="text-gray-500">{{ (resonantFrequency / 2).toExponential(1) }}</text>
          <text x="440" y="285" text-anchor="middle" font-size="10" fill="currentColor" class="text-gray-500">{{ (resonantFrequency * 3 / 4).toExponential(1) }}</text>
          <text x="580" y="285" text-anchor="middle" font-size="10" fill="currentColor" class="text-gray-500">{{ (resonantFrequency).toExponential(1) }}</text>
        </svg>
      </div>
    </div>

    <!-- Preset Circuits -->
    <div class="mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 Preset Circuits</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="loadPreset('radio')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          📻 Radio Tuner
        </button>
        <button
          @click="loadPreset('tank')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🔄 Tank Circuit
        </button>
        <button
          @click="loadPreset('filter')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🔊 Filter Design
        </button>
        <button
          @click="loadPreset('oscillator')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          〰️ Oscillator
        </button>
      </div>
    </div>

    <!-- Formulas Reference -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📐 Formulas</h4>
      <div class="space-y-3 text-sm">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            f₀ = 1 / (2π√LC)
          </div>
          <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Resonant frequency (Hz)
          </div>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            ω₀ = 1 / √LC
          </div>
          <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Angular frequency (rad/s)
          </div>
        </div>
        <div v-if="circuitType === 'parallel'" class="bg-white dark:bg-gray-700 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            Q = R / √(L/C) &nbsp;&nbsp;|&nbsp;&nbsp; BW = f₀ / Q
          </div>
          <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Quality factor & Bandwidth
          </div>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            XL = 2πfL &nbsp;&nbsp;|&nbsp;&nbsp; XC = 1 / (2πfC)
          </div>
          <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">
            Reactance at resonance: XL = XC
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SliderInput from './SliderInput.vue'

const circuitType = ref<'series' | 'parallel'>('series')
const inductance = ref(10)
const inductanceUnit = ref('mH')
const capacitance = ref(100)
const capacitanceUnit = ref('μF')
const resistance = ref(1000)

// Unit multipliers
const inductanceMultipliers: Record<string, number> = {
  H: 1,
  mH: 0.001,
  μH: 0.000001,
  nH: 0.000000001
}

const capacitanceMultipliers: Record<string, number> = {
  F: 1,
  μF: 0.000001,
  nF: 0.000000001,
  pF: 0.000000000001
}

// Convert to base units
const inductanceBase = computed(() => inductance.value * inductanceMultipliers[inductanceUnit.value])
const capacitanceBase = computed(() => capacitance.value * capacitanceMultipliers[capacitanceUnit.value])

// Calculate resonant frequency: f0 = 1 / (2π√LC)
const resonantFrequency = computed(() => {
  const L = inductanceBase.value
  const C = capacitanceBase.value
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

// Calculate angular frequency: ω0 = 1 / √LC
const angularFrequency = computed(() => {
  const L = inductanceBase.value
  const C = capacitanceBase.value
  return 1 / Math.sqrt(L * C)
})

// Calculate Q factor for parallel RLC
const qFactor = computed(() => {
  if (circuitType.value === 'series') return 0
  const L = inductanceBase.value
  const C = capacitanceBase.value
  return resistance.value / Math.sqrt(L / C)
})

// Calculate bandwidth
const bandwidth = computed(() => {
  if (circuitType.value === 'series' || qFactor.value === 0) return 0
  return resonantFrequency.value / qFactor.value
})

// Format frequency with appropriate unit
const formatFrequency = (freq: number) => {
  if (freq >= 1000000) {
    return `${(freq / 1000000).toFixed(3)} MHz`
  } else if (freq >= 1000) {
    return `${(freq / 1000).toFixed(3)} kHz`
  } else {
    return `${freq.toFixed(3)} Hz`
  }
}

const formattedFrequency = computed(() => formatFrequency(resonantFrequency.value))
const formattedAngularFrequency = computed(() => `${angularFrequency.value.toExponential(3)} rad/s`)
const formattedBandwidth = computed(() => formatFrequency(bandwidth.value))

// SVG visualization data
const resonantX = computed(() => 320) // Center of graph

// Generate inductive reactance curve (increasing)
const inductiveReactancePath = computed(() => {
  const L = inductanceBase.value
  let path = 'M 60 270'
  
  for (let i = 1; i <= 10; i++) {
    const x = 60 + (i * 52)
    const freq = (resonantFrequency.value / 10) * i
    const xl = 2 * Math.PI * freq * L
    
    // Scale XL for display (logarithmic-ish)
    const normalizedXl = Math.min(Math.log10(xl + 1) * 80, 250)
    const y = 270 - normalizedXl
    
    path += ` L ${x} ${y}`
  }
  
  return path
})

// Generate capacitive reactance curve (decreasing)
const capacitiveReactancePath = computed(() => {
  const C = capacitanceBase.value
  let path = 'M 60 20'
  
  for (let i = 1; i <= 10; i++) {
    const x = 60 + (i * 52)
    const freq = (resonantFrequency.value / 10) * i
    const xc = 1 / (2 * Math.PI * freq * C)
    
    // Scale XC for display (logarithmic-ish)
    const normalizedXc = Math.min(Math.log10(xc + 1) * 80, 250)
    const y = 30 + normalizedXc
    
    path += ` L ${x} ${y}`
  }
  
  return path
})

// Preset circuits
const loadPreset = (type: string) => {
  switch (type) {
    case 'radio':
      // AM radio tuner: ~1 MHz
      inductance.value = 200
      inductanceUnit.value = 'μH'
      capacitance.value = 127
      capacitanceUnit.value = 'pF'
      circuitType.value = 'parallel'
      resistance.value = 10000
      break
    case 'tank':
      // LC tank circuit: ~10 kHz
      inductance.value = 10
      inductanceUnit.value = 'mH'
      capacitance.value = 25.3
      capacitanceUnit.value = 'nF'
      circuitType.value = 'parallel'
      resistance.value = 5000
      break
    case 'filter':
      // Audio filter: ~1 kHz
      inductance.value = 100
      inductanceUnit.value = 'mH'
      capacitance.value = 253.3
      capacitanceUnit.value = 'nF'
      circuitType.value = 'parallel'
      resistance.value = 1000
      break
    case 'oscillator':
      // Oscillator: ~100 kHz
      inductance.value = 1
      inductanceUnit.value = 'mH'
      capacitance.value = 2.53
      capacitanceUnit.value = 'nF'
      circuitType.value = 'parallel'
      resistance.value = 2000
      break
  }
}
</script>

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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Cutoff Frequency Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate cutoff frequencies for RC, RL, and RLC filter circuits
          </p>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          
          <!-- Filter Type Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🔧 Filter Configuration
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <button v-for="type in filterTypes" :key="type.id" 
                @click="filterType = type.id"
                :class="[
                  'p-4 rounded-xl transition-all duration-300 border-2',
                  filterType === type.id 
                    ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-lg scale-105' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50'
                ]">
                <div class="text-center">
                  <div class="text-3xl mb-2">{{ type.icon }}</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ type.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ type.desc }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Input Parameters -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Resistance -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Resistance (R): {{ formatValue(resistance, 'Ω', resistanceUnit) }}
              </label>
              <input type="range" v-model.number="resistance" min="1" max="1000000" step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="grid grid-cols-4 gap-2">
                <button v-for="unit in ['Ω', 'kΩ', 'MΩ']" :key="unit"
                  @click="resistanceUnit = unit"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    resistanceUnit === unit
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]">
                  {{ unit }}
                </button>
              </div>
              <input type="number" v-model.number="resistance" min="1" max="1000000000"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>

            <!-- Capacitance -->
            <div v-if="filterType !== 'rl'" class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Capacitance (C): {{ formatValue(capacitance, 'F', capacitanceUnit) }}
              </label>
              <input type="range" v-model.number="capacitance" min="1" max="1000000" step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="grid grid-cols-5 gap-2">
                <button v-for="unit in ['pF', 'nF', 'μF', 'mF', 'F']" :key="unit"
                  @click="capacitanceUnit = unit"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    capacitanceUnit === unit
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]">
                  {{ unit }}
                </button>
              </div>
              <input type="number" v-model.number="capacitance" min="1" max="1000000000000000"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>

            <!-- Inductance -->
            <div v-if="filterType !== 'rc'" class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Inductance (L): {{ formatValue(inductance, 'H', inductanceUnit) }}
              </label>
              <input type="range" v-model.number="inductance" min="1" max="10000" step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="grid grid-cols-5 gap-2">
                <button v-for="unit in ['nH', 'μH', 'mH', 'H', 'kH']" :key="unit"
                  @click="inductanceUnit = unit"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    inductanceUnit === unit
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]">
                  {{ unit }}
                </button>
              </div>
              <input type="number" v-model.number="inductance" min="1" max="10000000"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            </div>

            <!-- Additional RLC Parameters -->
            <div v-if="filterType === 'rlc-series' || filterType === 'rlc-parallel'" class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Circuit Type: {{ filterType === 'rlc-series' ? 'Series RLC' : 'Parallel RLC' }}
              </label>
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-sm text-blue-800 dark:text-blue-300">
                  <div v-if="filterType === 'rlc-series'">
                    <strong>Series RLC:</strong> Creates a bandpass filter with center frequency f₀ and bandwidth determined by resistance
                  </div>
                  <div v-else>
                    <strong>Parallel RLC:</strong> Creates a bandstop (notch) filter with center frequency f₀
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📊 Results
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Cutoff Frequency -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Cutoff Frequency (fₙ)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ formattedCutoffFrequency }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ cutoffFrequencyHz }} Hz
                  </div>
                </div>
              </div>

              <!-- Period -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Time Period (T)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ formattedPeriod }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ periodSeconds }} s
                  </div>
                </div>
              </div>

              <!-- Angular Frequency -->
              <div v-if="filterType !== 'rlc-series' && filterType !== 'rlc-parallel'" 
                class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Angular Frequency (ω)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ formattedAngularFrequency }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    rad/s
                  </div>
                </div>
              </div>

              <!-- Reactance at Cutoff -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {{ filterType === 'rc' ? 'Capacitive Reactance (Xₙ)' : 
                       filterType === 'rl' ? 'Inductive Reactance (Xₙ)' : 
                       'Reactance Magnitude' }}
                  </div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ formattedReactance }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Ω
                  </div>
                </div>
              </div>

              <!-- Bandwidth (RLC only) -->
              <div v-if="filterType === 'rlc-series' || filterType === 'rlc-parallel'" 
                class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Bandwidth (BW)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ formattedBandwidth }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Hz
                  </div>
                </div>
              </div>

              <!-- Q Factor (RLC only) -->
              <div v-if="filterType === 'rlc-series' || filterType === 'rlc-parallel'" 
                class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Quality Factor (Q)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ qFactor.toFixed(2) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ qFactor < 1 ? 'Wide band' : qFactor < 10 ? 'Medium Q' : 'High Q' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              ⚡ Quick Presets
            </h3>
            <div class="flex flex-wrap justify-center gap-3">
              <button v-for="preset in currentPresets" :key="preset.name"
                @click="applyPreset(preset)"
                class="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- Formula Display -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📐 Formula Used:</h4>
            <div class="font-mono text-sm bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              {{ currentFormula }}
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
            📚 Understanding Cutoff Frequency
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Cutoff Frequency?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The cutoff frequency (also called corner frequency, break frequency, or -3dB frequency) is the frequency at which 
              the output power drops to half the input power, or the output voltage drops to 1/√2 (≈70.7%) of the input voltage.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why -3dB?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In logarithmic scale (decibels), power ratio is calculated as:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              dB = 10 × log₁₀(P_out / P_in)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When P_out = P_in / 2:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              dB = 10 × log₁₀(0.5) ≈ -3.01 dB
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Filter Types:</h3>
            
            <div class="space-y-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">RC Low-Pass Filter</h4>
                <p class="text-sm text-blue-700 dark:text-blue-400 mb-2">
                  Passes low frequencies, attenuates high frequencies. Common in audio systems and signal conditioning.
                </p>
                <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-xs">
                  f_c = 1 / (2π × R × C)
                </div>
              </div>

              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">RL High-Pass Filter</h4>
                <p class="text-sm text-green-700 dark:text-green-400 mb-2">
                  Passes high frequencies, attenuates low frequencies. Used in RF applications and crossover networks.
                </p>
                <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-xs">
                  f_c = R / (2π × L)
                </div>
              </div>

              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">RLC Bandpass/Notch Filter</h4>
                <p class="text-sm text-purple-700 dark:text-purple-400 mb-2">
                  Creates resonant circuits with narrow bandwidth. Used in radio tuning and signal selection.
                </p>
                <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-xs">
                  f_0 = 1 / (2π × √(L × C))
                </div>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio crossovers:</strong> Separate bass, midrange, and tweeter frequencies</li>
              <li><strong>Power supply smoothing:</strong> Remove ripple from rectified AC</li>
              <li><strong>Radio tuning:</strong> Select specific stations (bandpass filters)</li>
              <li><strong>Anti-aliasing:</strong> Remove frequencies above Nyquist limit before ADC</li>
              <li><strong>Signal conditioning:</strong> Remove noise or unwanted frequency components</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>For sharper roll-off, cascade multiple filter stages</li>
              <li>Higher Q factor means narrower bandwidth (more selective)</li>
              <li>Real components have tolerances that affect actual cutoff frequency</li>
              <li>Impedance matching may be required for multi-stage filters</li>
              <li>Consider op-amp based active filters for better performance</li>
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

// SEO
useHead({
  title: 'Cutoff Frequency Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate cutoff frequency for RC, RL, and RLC filters. Design low-pass, high-pass, bandpass, and notch filters with interactive calculator.' },
    { name: 'keywords', content: 'cutoff frequency, filter design, RC filter, RL filter, RLC filter, bandwidth, Q factor' }
  ]
})

const colorMode = useColorMode()

// Filter types
const filterTypes = [
  { id: 'rc', name: 'RC Filter', icon: '🔌', desc: 'Low-Pass' },
  { id: 'rl', name: 'RL Filter', icon: '🧲', desc: 'High-Pass' },
  { id: 'rlc-series', name: 'Series RLC', icon: '📡', desc: 'Bandpass' },
  { id: 'rlc-parallel', name: 'Parallel RLC', icon: '🎯', desc: 'Notch' }
]

const filterType = ref('rc')
const resistance = ref(1000)
const resistanceUnit = ref('Ω')
const capacitance = ref(100)
const capacitanceUnit = ref('nF')
const inductance = ref(100)
const inductanceUnit = ref('μH')

// Unit multipliers
const resistanceMultipliers: Record<string, number> = {
  'Ω': 1,
  'kΩ': 1000,
  'MΩ': 1000000
}

const capacitanceMultipliers: Record<string, number> = {
  'pF': 1e-12,
  'nF': 1e-9,
  'μF': 1e-6,
  'mF': 1e-3,
  'F': 1
}

const inductanceMultipliers: Record<string, number> = {
  'nH': 1e-9,
  'μH': 1e-6,
  'mH': 1e-3,
  'H': 1,
  'kH': 1000
}

// Get base values
const resistanceBase = computed(() => resistance.value * resistanceMultipliers[resistanceUnit.value])
const capacitanceBase = computed(() => capacitance.value * capacitanceMultipliers[capacitanceUnit.value])
const inductanceBase = computed(() => inductance.value * inductanceMultipliers[inductanceUnit.value])

// Calculate cutoff frequency
const cutoffFrequency = computed(() => {
  const r = resistanceBase.value
  const c = capacitanceBase.value
  const l = inductanceBase.value

  switch (filterType.value) {
    case 'rc':
      return 1 / (2 * Math.PI * r * c)
    case 'rl':
      return r / (2 * Math.PI * l)
    case 'rlc-series':
    case 'rlc-parallel':
      return 1 / (2 * Math.PI * Math.sqrt(l * c))
    default:
      return 0
  }
})

// Period
const period = computed(() => 1 / cutoffFrequency.value)

// Angular frequency
const angularFrequency = computed(() => 2 * Math.PI * cutoffFrequency.value)

// Reactance at cutoff frequency
const reactance = computed(() => {
  const r = resistanceBase.value
  
  // At cutoff frequency, Xc = Xl = R for simple RC/RL filters
  if (filterType.value === 'rc' || filterType.value === 'rl') {
    return r
  }
  
  // For RLC at resonance, reactance is minimum
  const l = inductanceBase.value
  const c = capacitanceBase.value
  const xl = 2 * Math.PI * cutoffFrequency.value * l
  const xc = 1 / (2 * Math.PI * cutoffFrequency.value * c)
  
  return Math.abs(xl - xc)
})

// Bandwidth (for RLC)
const bandwidth = computed(() => {
  if (filterType.value !== 'rlc-series' && filterType.value !== 'rlc-parallel') {
    return 0
  }
  
  const r = resistanceBase.value
  const l = inductanceBase.value
  
  return r / (2 * Math.PI * l)
})

// Q factor
const qFactor = computed(() => {
  if (filterType.value !== 'rlc-series' && filterType.value !== 'rlc-parallel') {
    return 0
  }
  
  return cutoffFrequency.value / bandwidth.value
})

// Format functions
const formatValue = (value: number, baseUnit: string, currentUnit: string): string => {
  if (value < 1000) {
    return `${value} ${currentUnit}`
  }
  
  // Auto-scale
  const units = baseUnit === 'Ω' ? ['Ω', 'kΩ', 'MΩ'] : 
                baseUnit === 'F' ? ['pF', 'nF', 'μF', 'mF', 'F'] :
                baseUnit === 'H' ? ['nH', 'μH', 'mH', 'H', 'kH'] : ['']
  
  const multipliers = baseUnit === 'Ω' ? [1, 1000, 1000000] :
                     baseUnit === 'F' ? [1e-12, 1e-9, 1e-6, 1e-3, 1] :
                     baseUnit === 'H' ? [1e-9, 1e-6, 1e-3, 1, 1000] : [1]
  
  for (let i = units.length - 1; i >= 0; i--) {
    if (value >= multipliers[i]) {
      return `${(value / multipliers[i]).toFixed(2)} ${units[i]}`
    }
  }
  
  return `${value} ${currentUnit}`
}

const formatFrequency = (hz: number): string => {
  if (hz >= 1e9) return `${(hz / 1e9).toFixed(3)} GHz`
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(3)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(3)} kHz`
  if (hz >= 1) return `${hz.toFixed(3)} Hz`
  return `${(hz * 1000).toFixed(3)} mHz`
}

const formatTime = (seconds: number): string => {
  if (seconds >= 1) return `${seconds.toFixed(6)} s`
  if (seconds >= 1e-3) return `${(seconds * 1000).toFixed(6)} ms`
  if (seconds >= 1e-6) return `${(seconds * 1e6).toFixed(6)} μs`
  if (seconds >= 1e-9) return `${(seconds * 1e9).toFixed(6)} ns`
  return `${(seconds * 1e12).toFixed(6)} ps`
}

const formatReactance = (ohms: number): string => {
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(3)} MΩ`
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(3)} kΩ`
  if (ohms >= 1) return `${ohms.toFixed(3)} Ω`
  return `${(ohms * 1000).toFixed(3)} mΩ`
}

// Computed formatted values
const cutoffFrequencyHz = computed(() => cutoffFrequency.value)
const formattedCutoffFrequency = computed(() => formatFrequency(cutoffFrequency.value))
const periodSeconds = computed(() => period.value)
const formattedPeriod = computed(() => formatTime(period.value))
const formattedAngularFrequency = computed(() => angularFrequency.value.toFixed(3))
const formattedReactance = computed(() => formatReactance(reactance.value))
const formattedBandwidth = computed(() => formatFrequency(bandwidth.value))

// Current formula display
const currentFormula = computed(() => {
  switch (filterType.value) {
    case 'rc':
      return 'f_c = 1 / (2π × R × C)'
    case 'rl':
      return 'f_c = R / (2π × L)'
    case 'rlc-series':
    case 'rlc-parallel':
      return 'f_0 = 1 / (2π × √(L × C))'
    default:
      return ''
  }
})

// Presets
const presets: Record<string, any[]> = {
  rc: [
    { name: 'Audio Low-Pass', r: 1000, ru: 'Ω', c: 100, cu: 'nF' },
    { name: 'Power Supply', r: 100, ru: 'Ω', c: 10000, cu: 'μF' },
    { name: 'RF Filter', r: 50, ru: 'Ω', c: 10, cu: 'pF' },
    { name: 'Subwoofer', r: 100, ru: 'Ω', c: 470, cu: 'μF' }
  ],
  rl: [
    { name: 'Tweeter', r: 8, ru: 'Ω', l: 200, lu: 'μH' },
    { name: 'RF Choke', r: 50, ru: 'Ω', l: 1, lu: 'μH' },
    { name: 'Power Inductor', r: 10, ru: 'Ω', l: 100, lu: 'mH' },
    { name: 'Audio High-Pass', r: 600, ru: 'Ω', l: 100, lu: 'mH' }
  ],
  'rlc-series': [
    { name: 'AM Radio', r: 100, ru: 'Ω', l: 200, lu: 'μH', c: 200, cu: 'pF' },
    { name: 'FM Tuner', r: 50, ru: 'Ω', l: 100, lu: 'nH', c: 10, cu: 'pF' },
    { name: 'Crystal Filter', r: 1000, ru: 'Ω', l: 10, lu: 'mH', c: 100, cu: 'pF' }
  ],
  'rlc-parallel': [
    { name: 'Notch Filter', r: 1000, ru: 'Ω', l: 100, lu: 'mH', c: 100, cu: 'nF' },
    { name: 'Trap Circuit', r: 75, ru: 'Ω', l: 1, lu: 'μH', c: 1, cu: 'nF' },
    { name: 'Interference', r: 50, ru: 'Ω', l: 10, lu: 'μH', c: 10, cu: 'pF' }
  ]
}

const currentPresets = computed(() => presets[filterType.value] || [])

const applyPreset = (preset: any) => {
  resistance.value = preset.r
  resistanceUnit.value = preset.ru
  if (preset.c) {
    capacitance.value = preset.c
    capacitanceUnit.value = preset.cu
  }
  if (preset.l) {
    inductance.value = preset.l
    inductanceUnit.value = preset.lu
  }
}
</script>

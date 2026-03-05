<script setup lang="ts">
import { ref, computed } from 'vue'

const peakVoltage = ref(170)
const waveformType = ref('sine')

const waveforms = [
  { value: 'sine', name: 'Sine Wave', crestFactor: 1.414, formFactor: 1.111, description: 'Standard AC waveform' },
  { value: 'square', name: 'Square Wave', crestFactor: 1, formFactor: 1, description: 'Digital signal waveform' },
  { value: 'triangle', name: 'Triangle Wave', crestFactor: 1.732, formFactor: 1.155, description: 'Linear ramp waveform' },
  { value: 'sawtooth', name: 'Sawtooth Wave', crestFactor: 1.732, formFactor: 1.155, description: 'Asymmetric ramp waveform' },
  { value: 'half-wave', name: 'Half-Wave Rectified', crestFactor: 2, formFactor: 1.571, description: 'Sine wave with negative half removed' },
  { value: 'full-wave', name: 'Full-Wave Rectified', crestFactor: 1.414, formFactor: 1.111, description: 'Sine wave with negative half inverted' }
]

const selectedWaveform = computed(() => {
  return waveforms.find(w => w.value === waveformType.value) || waveforms[0]
})

// Calculate RMS based on waveform type
const rmsVoltage = computed(() => {
  const Vp = peakVoltage.value
  
  switch(waveformType.value) {
    case 'sine':
      return Vp / 1.414  // Vp / √2
    case 'square':
      return Vp  // For symmetrical square wave
    case 'triangle':
      return Vp / 1.732  // Vp / √3
    case 'sawtooth':
      return Vp / 1.732  // Vp / √3
    case 'half-wave':
      return Vp / 2  // Vp / 2
    case 'full-wave':
      return Vp / 1.414  // Vp / √2 (same as sine)
    default:
      return Vp / 1.414
  }
})

// Average voltage (rectified)
const avgVoltage = computed(() => {
  const Vp = peakVoltage.value
  
  switch(waveformType.value) {
    case 'sine':
      return Vp * 0.637  // 2Vp/π
    case 'square':
      return Vp  // For symmetrical square wave
    case 'triangle':
      return Vp / 2  // Vp / 2
    case 'sawtooth':
      return Vp / 2  // Vp / 2
    case 'half-wave':
      return Vp / Math.PI  // Vp/π
    case 'full-wave':
      return Vp * 0.637  // 2Vp/π
    default:
      return Vp * 0.637
  }
})

// Peak-to-peak voltage
const peakToPeak = computed(() => {
  const Vp = peakVoltage.value
  
  switch(waveformType.value) {
    case 'sine':
    case 'triangle':
    case 'square':
      return Vp * 2
    case 'sawtooth':
      return Vp * 2
    case 'half-wave':
      return Vp  // Only positive half
    case 'full-wave':
      return Vp * 2
    default:
      return Vp * 2
  }
})

// Crest factor: Peak / RMS
const crestFactor = computed(() => {
  return (peakVoltage.value / rmsVoltage.value).toFixed(3)
})

// Form factor: RMS / Average
const formFactor = computed(() => {
  return (rmsVoltage.value / avgVoltage.value).toFixed(3)
})

// Convert to different units
const rmsMillivolts = computed(() => (rmsVoltage.value * 1000).toFixed(2))
const rmsKilovolts = computed(() => (rmsVoltage.value / 1000).toFixed(4))

const avgMillivolts = computed(() => (avgVoltage.value * 1000).toFixed(2))
const avgKilovolts = computed(() => (avgVoltage.value / 1000).toFixed(4))

const peakMillivolts = computed(() => (peakVoltage.value * 1000).toFixed(2))
const peakKilovolts = computed(() => (peakVoltage.value / 1000).toFixed(4))

// Waveform SVG generation
const waveformPath = computed(() => {
  const width = 300
  const height = 100
  const cycles = 2
  const points = []
  
  for (let i = 0; i <= width; i += 2) {
    const t = (i / width) * cycles * 2 * Math.PI
    let y = 0
    
    switch(waveformType.value) {
      case 'sine':
        y = Math.sin(t)
        break
      case 'square':
        y = Math.sin(t) >= 0 ? 1 : -1
        break
      case 'triangle':
        // Triangle wave: (2/π) * arcsin(sin(t))
        y = (2 / Math.PI) * Math.asin(Math.sin(t))
        break
      case 'sawtooth':
        // Sawtooth: 2 * (t/(2π) - floor(0.5 + t/(2π)))
        const period = 2 * Math.PI
        y = 2 * ((t % period) / period - 0.5)
        break
      case 'half-wave':
        y = Math.max(0, Math.sin(t))
        break
      case 'full-wave':
        y = Math.abs(Math.sin(t))
        break
    }
    
    // Scale to fit (40px amplitude, centered at 50px)
    const px = i
    const py = 50 - (y * 40)
    points.push(`${px},${py}`)
  }
  
  return `M ${points.join(' L ')}`
})

// Example presets
const presets = [
  {
    name: '120V AC (US Mains)',
    config: {
      peakVoltage: 170,
      waveformType: 'sine'
    }
  },
  {
    name: '230V AC (EU Mains)',
    config: {
      peakVoltage: 325,
      waveformType: 'sine'
    }
  },
  {
    name: 'Digital Logic (5V)',
    config: {
      peakVoltage: 5,
      waveformType: 'square'
    }
  },
  {
    name: 'Audio Signal (1V)',
    config: {
      peakVoltage: 1,
      waveformType: 'sine'
    }
  }
]

const applyPreset = (preset: typeof presets[0]) => {
  peakVoltage.value = preset.config.peakVoltage
  waveformType.value = preset.config.waveformType
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          RMS Voltage Calculator
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Calculate RMS, Average, and Peak values for different AC waveforms
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Input Parameters -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              Input Parameters
            </h2>

            <!-- Waveform Type -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Waveform Type
              </label>
              <select v-model="waveformType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="wave in waveforms" :key="wave.value" :value="wave.value">
                  {{ wave.name }} - {{ wave.description }}
                </option>
              </select>
            </div>

            <!-- Peak Voltage Input -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peak Voltage (Vp): {{ peakVoltage }}V
              </label>
              <input type="range" v-model.number="peakVoltage" min="0.1" max="500" step="0.1" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0.1V</span>
                <span>500V</span>
              </div>
            </div>

            <!-- Direct Input -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Or Enter Direct Value
              </label>
              <div class="flex">
                <input type="number" v-model.number="peakVoltage" step="0.01" min="0" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <span class="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-600 dark:text-gray-300">Vp</span>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Quick Presets
            </h2>
            <div class="grid grid-cols-1 gap-2">
              <button v-for="preset in presets" :key="preset.name" @click="applyPreset(preset)" class="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md">
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- Waveform Reference -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Waveform Factors
            </h2>
            
            <div class="space-y-3">
              <div v-for="wave in waveforms" :key="wave.value" 
                class="p-3 rounded-lg cursor-pointer transition-colors"
                :class="waveformType === wave.value ? 'bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-500' : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent'"
                @click="waveformType = wave.value">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-medium text-sm text-gray-900 dark:text-white">{{ wave.name }}</span>
                  <span v-if="waveformType === wave.value" class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">SELECTED</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>Crest: {{ wave.crestFactor.toFixed(3) }}</span>
                  <span>Form: {{ wave.formFactor.toFixed(3) }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Results Panel -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Waveform Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Waveform Visualization
            </h2>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
              <svg viewBox="0 0 300 100" class="w-full h-auto">
                <!-- Grid lines -->
                <line x1="0" y1="50" x2="300" y2="50" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="5,5"/>
                <line x1="0" y1="10" x2="300" y2="10" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="0" y1="90" x2="300" y2="90" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3,3"/>
                
                <!-- Zero line label -->
                <text x="5" y="48" class="text-xs" fill="#94A3B8">0V</text>
                <text x="5" y="13" class="text-xs" fill="#94A3B8">+Vp</text>
                <text x="5" y="93" class="text-xs" fill="#94A3B8">-Vp</text>
                
                <!-- Waveform path -->
                <path :d="waveformPath" fill="none" stroke="#3B82F6" stroke-width="2"/>
                
                <!-- Peak indicators -->
                <line x1="0" y1="10" x2="300" y2="10" stroke="#10B981" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
                <line x1="0" y1="90" x2="300" y2="90" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
                
                <!-- Voltage labels -->
                <text x="280" y="8" class="text-xs font-semibold" fill="#10B981">+{{ peakVoltage }}V</text>
                <text x="280" y="98" class="text-xs font-semibold" :fill="waveformType === 'half-wave' ? '#94A3B8' : '#EF4444'">{{ waveformType === 'half-wave' ? '0V' : '-' + peakVoltage + 'V' }}</text>
              </svg>
              
              <div class="mt-4 flex items-center justify-center space-x-6">
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Waveform</span>
                </div>
                <div class="flex items-center">
                  <div class="w-4 h-1 bg-green-500 mr-2"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">+Peak</span>
                </div>
                <div class="flex items-center">
                  <div class="w-4 h-1 bg-red-500 mr-2"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">-Peak</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Results -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Calculated Values
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <!-- RMS Voltage -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-semibold text-blue-600 dark:text-blue-300">RMS Voltage</h3>
                  <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p class="text-3xl font-bold text-blue-900 dark:text-blue-100">{{ rmsVoltage.toFixed(4) }}V</p>
                <div class="mt-3 space-y-1 text-xs text-blue-700 dark:text-blue-400">
                  <p>{{ rmsMillivolts }} mV</p>
                  <p>{{ rmsKilovolts }} kV</p>
                </div>
                <div class="mt-3 p-2 bg-white dark:bg-gray-800 rounded">
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Formula:</strong> Vp / {{ selectedWaveform.crestFactor.toFixed(3) }}
                  </p>
                </div>
              </div>

              <!-- Average Voltage -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-semibold text-green-600 dark:text-green-300">Average Voltage</h3>
                  <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <p class="text-3xl font-bold text-green-900 dark:text-green-100">{{ avgVoltage.toFixed(4) }}V</p>
                <div class="mt-3 space-y-1 text-xs text-green-700 dark:text-green-400">
                  <p>{{ avgMillivolts }} mV</p>
                  <p>{{ avgKilovolts }} kV</p>
                </div>
                <div class="mt-3 p-2 bg-white dark:bg-gray-800 rounded">
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Rectified</strong> average
                  </p>
                </div>
              </div>

              <!-- Peak-to-Peak -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-sm font-semibold text-purple-600 dark:text-purple-300">Peak-to-Peak</h3>
                  <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <p class="text-3xl font-bold text-purple-900 dark:text-purple-100">{{ peakToPeak.toFixed(4) }}V</p>
                <div class="mt-3 space-y-1 text-xs text-purple-700 dark:text-purple-400">
                  <p>{{ (peakToPeak * 1000).toFixed(2) }} mV</p>
                  <p>{{ (peakToPeak / 1000).toFixed(4) }} kV</p>
                </div>
                <div class="mt-3 p-2 bg-white dark:bg-gray-800 rounded">
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Range:</strong> Max to Min
                  </p>
                </div>
              </div>

            </div>

            <!-- Form Factors -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold text-amber-700 dark:text-amber-300">Crest Factor</p>
                    <p class="text-xs text-amber-600 dark:text-amber-400">Peak / RMS</p>
                  </div>
                  <p class="text-2xl font-bold text-amber-900 dark:text-amber-100">{{ crestFactor }}</p>
                </div>
              </div>
              
              <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Form Factor</p>
                    <p class="text-xs text-cyan-600 dark:text-cyan-400">RMS / Average</p>
                  </div>
                  <p class="text-2xl font-bold text-cyan-900 dark:text-cyan-100">{{ formFactor }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison Table -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
              </svg>
              Waveform Comparison ({{ peakVoltage }}V Peak)
            </h2>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b-2 border-gray-200 dark:border-gray-700">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Waveform</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">RMS (V)</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Average (V)</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Crest Factor</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Form Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="wave in waveforms" :key="wave.value" 
                    class="border-b border-gray-100 dark:border-gray-700"
                    :class="waveformType === wave.value ? 'bg-indigo-50 dark:bg-indigo-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'">
                    <td class="py-3 px-4 font-medium" :class="waveformType === wave.value ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'">
                      {{ wave.name }}
                      <span v-if="waveformType === wave.value" class="ml-2 text-xs text-indigo-600 dark:text-indigo-400">● Current</span>
                    </td>
                    <td class="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                      {{ (peakVoltage / wave.crestFactor).toFixed(3) }}V
                    </td>
                    <td class="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                      {{ (peakVoltage / wave.crestFactor / wave.formFactor).toFixed(3) }}V
                    </td>
                    <td class="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                      {{ wave.crestFactor.toFixed(3) }}
                    </td>
                    <td class="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                      {{ wave.formFactor.toFixed(3) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Understanding RMS Voltage
            </h2>

            <div class="space-y-6 text-gray-700 dark:text-gray-300">
              
              <!-- What is RMS -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is RMS Voltage?</h3>
                <p class="text-sm leading-relaxed">
                  RMS (Root Mean Square) is the effective value of an AC voltage. It's the DC equivalent voltage that would 
                  produce the same average power dissipation in a resistive load. For a sine wave, VRMS = Vpeak / √2 ≈ 0.707 × Vpeak.
                </p>
              </div>

              <!-- Why RMS Matters -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why RMS Matters</h3>
                <ul class="text-sm space-y-2">
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    <span><strong>Power Calculations:</strong> P = V²/R uses RMS values for AC power</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    <span><strong>Mains Voltage:</strong> 120V AC (US) and 230V AC (EU) are RMS values</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    <span><strong>Meter Readings:</strong> Most multimeters display RMS by default</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    <span><strong>Component Ratings:</strong> Voltage ratings are typically for RMS values</span>
                  </li>
                </ul>
              </div>

              <!-- Waveform Differences -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Waveform Characteristics</h3>
                <div class="space-y-3">
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white mb-1">Sine Wave</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Pure AC waveform. RMS = Vp/√2, Average = 2Vp/π. Crest factor = √2 ≈ 1.414
                    </p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white mb-1">Square Wave</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Digital signal. RMS = Vp, Average = Vp. Crest factor = 1. Used in digital logic
                    </p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white mb-1">Triangle Wave</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Linear ramp. RMS = Vp/√3, Average = Vp/2. Crest factor = √3 ≈ 1.732
                    </p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white mb-1">Half-Wave Rectified</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Only positive half-cycles. RMS = Vp/2, Average = Vp/π. Used in simple power supplies
                    </p>
                  </div>
                </div>
              </div>

              <!-- Crest Factor -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Crest Factor</h3>
                <p class="text-sm leading-relaxed mb-2">
                  Crest factor (CF) is the ratio of peak value to RMS value: CF = Vpeak / VRMS
                </p>
                <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <p class="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    <strong>Why Crest Factor Matters:</strong>
                  </p>
                  <ul class="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Higher crest factor means more "peaky" waveform</li>
                    <li>• Affects power supply design and component stress</li>
                    <li>• True-RMS multimeters needed for accurate measurements of high CF waveforms</li>
                    <li>• Sine wave: 1.414, Square wave: 1, Triangle: 1.732</li>
                  </ul>
                </div>
              </div>

              <!-- Form Factor -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Form Factor</h3>
                <p class="text-sm leading-relaxed mb-2">
                  Form factor (FF) is the ratio of RMS value to average value: FF = VRMS / Vaverage
                </p>
                <div class="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <p class="text-sm text-green-800 dark:text-green-200 mb-2">
                    <strong>Practical Significance:</strong>
                  </p>
                  <ul class="text-xs text-green-700 dark:text-green-300 space-y-1">
                    <li>• Indicates waveform shape complexity</li>
                    <li>• Used in transformer and inductor design</li>
                    <li>• Sine wave: 1.111, Square wave: 1, Triangle: 1.155</li>
                    <li>• Higher form factor = more "peaked" distribution</li>
                  </ul>
                </div>
              </div>

              <!-- Key Formulas -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Formulas</h3>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <p class="text-sm"><strong>RMS (Sine):</strong> VRMS = Vpeak / √2 ≈ 0.707 × Vpeak</p>
                  <p class="text-sm"><strong>RMS (Square):</strong> VRMS = Vpeak</p>
                  <p class="text-sm"><strong>RMS (Triangle/Sawtooth):</strong> VRMS = Vpeak / √3</p>
                  <p class="text-sm"><strong>Average (Sine, rectified):</strong> Vavg = 2Vpeak / π ≈ 0.637 × Vpeak</p>
                  <p class="text-sm"><strong>Peak-to-Peak:</strong> Vp-p = 2 × Vpeak (for symmetrical waveforms)</p>
                  <p class="text-sm"><strong>Crest Factor:</strong> CF = Vpeak / VRMS</p>
                  <p class="text-sm"><strong>Form Factor:</strong> FF = VRMS / Vaverage</p>
                  <p class="text-sm"><strong>Power (RMS):</strong> P = VRMS² / R</p>
                </div>
              </div>

              <!-- Practical Applications -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Practical Applications</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Power Distribution</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">AC mains voltage specified as RMS (120V, 230V)</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Audio Equipment</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Speaker power ratings use RMS values</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Multimeters</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">True-RMS meters measure non-sinusoidal waveforms accurately</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Power Supplies</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Rectifier output depends on waveform type</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}
</style>

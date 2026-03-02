<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
      🎛️ RC High-Pass Filter Simulator
    </h2>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Component Values -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Component Values
          </h3>
          
          <!-- Resistance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resistance (R): <span class="text-orange-500 font-bold">{{ resistance.toFixed(1) }} Ω</span>
            </label>
            <input type="range" v-model.number="resistance" min="100" max="100000" step="100" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>100 Ω</span>
              <span>100 kΩ</span>
            </div>
          </div>

          <!-- Capacitance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capacitance (C): <span class="text-orange-500 font-bold">{{ (capacitance * 1e9).toFixed(1) }} nF</span>
            </label>
            <input type="range" v-model.number="capacitance" min="1e-10" max="1e-6" step="1e-11" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.1 nF</span>
              <span>1000 nF</span>
            </div>
          </div>

          <!-- Input Frequency -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Frequency: <span class="text-orange-500 font-bold">{{ inputFrequency.toFixed(1) }} Hz</span>
            </label>
            <input type="range" v-model.number="inputFrequency" min="1" max="100000" step="1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 Hz</span>
              <span>100 kHz</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Presets
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="preset in presets" :key="preset.name" @click="applyPreset(preset)"
              class="px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/50 dark:hover:to-orange-800/50 transition-all duration-200 border border-orange-200 dark:border-orange-700">
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Calculations Display -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Filter Characteristics
          </h3>
          
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 space-y-3 border border-orange-200 dark:border-orange-800">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Cutoff Frequency (fc):</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ formatFrequency(cutoffFreq) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Time Constant (τ):</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ formatTime(timeConstant) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Frequency Ratio (f/fc):</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ frequencyRatio.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Output Gain:</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ (gain * 100).toFixed(1) }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Phase Shift:</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ phaseShift.toFixed(1) }}°</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Capacitive Reactance:</span>
              <span class="font-bold text-orange-600 dark:text-orange-400">{{ formatResistance(capacitiveReactance) }}</span>
            </div>
          </div>
        </div>

        <!-- Circuit Status -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Filter Behavior
          </h3>
          <div class="space-y-2">
            <div v-if="frequencyRatio > 10" class="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-green-700 dark:text-green-300 text-sm font-medium">Pass Band - Signals pass through (~99%)</span>
            </div>
            <div v-else-if="frequencyRatio < 0.1" class="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-red-700 dark:text-red-300 text-sm font-medium">Stop Band - Signals blocked (~1%)</span>
            </div>
            <div v-else class="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-yellow-700 dark:text-yellow-300 text-sm font-medium">Transition Band - Partial attenuation</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bode Plot Visualization -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        Bode Plot - Frequency Response
      </h3>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <svg viewBox="0 0 800 400" class="w-full h-auto">
          <!-- Grid lines -->
          <g stroke="#e5e7eb" stroke-width="1" opacity="0.3">
            <!-- Vertical lines (frequency) -->
            <line v-for="i in 10" :key="'v' + i" :x1="i * 80" y1="0" x2="i * 80" y2="400"/>
            <!-- Horizontal lines (gain) -->
            <line v-for="i in 8" :key="'h' + i" x1="0" :y1="i * 50" x2="800" :y2="i * 50"/>
          </g>

          <!-- Y-axis labels (Gain in dB) -->
          <g font-size="12" fill="#6b7280" text-anchor="end">
            <text x="45" y="54">0 dB</text>
            <text x="45" y="104">-10 dB</text>
            <text x="45" y="154">-20 dB</text>
            <text x="45" y="204">-30 dB</text>
            <text x="45" y="254">-40 dB</text>
            <text x="45" y="304">-50 dB</text>
            <text x="45" y="354">-60 dB</text>
          </g>

          <!-- X-axis labels (Frequency) -->
          <g font-size="12" fill="#6b7280" text-anchor="middle">
            <text x="80" y="390">0.01fc</text>
            <text x="240" y="390">0.1fc</text>
            <text x="400" y="390" font-weight="bold" fill="#f97316">fc</text>
            <text x="560" y="390">10fc</text>
            <text x="720" y="390">100fc</text>
          </g>

          <!-- High-Pass Filter Curve -->
          <path :d="bodeCurve" stroke="#f97316" stroke-width="3" fill="none"/>
          
          <!-- -3dB Point marker -->
          <circle cx="400" cy="104" r="6" fill="#f97316" opacity="0.8"/>
          <text x="400" y="90" font-size="12" fill="#f97316" text-anchor="middle" font-weight="bold">-3dB</text>

          <!-- Current frequency marker -->
          <g v-if="currentFreqMarker">
            <line :x1="currentFreqMarker.x" y1="0" :x2="currentFreqMarker.x" y2="400" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
            <circle :cx="currentFreqMarker.x" :cy="currentFreqMarker.y" r="8" fill="#ef4444"/>
            <text :x="currentFreqMarker.x" y="30" font-size="11" fill="#ef4444" text-anchor="middle" font-weight="bold">
              {{ formatFrequency(inputFrequency) }}
            </text>
          </g>

          <!-- Axis titles -->
          <text x="400" y="30" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold">Frequency (log scale)</text>
          <text x="15" y="200" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold" transform="rotate(-90, 15, 200)">Gain (dB)</text>
        </svg>
      </div>
    </div>

    <!-- Time Domain Visualization -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Time Domain - Input vs Output Waveforms
      </h3>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <svg viewBox="0 0 800 300" class="w-full h-auto">
          <!-- Grid -->
          <g stroke="#e5e7eb" stroke-width="1" opacity="0.3">
            <line v-for="i in 8" :key="'h' + i" x1="0" :y1="i * 37.5" x2="800" :y2="i * 37.5"/>
          </g>

          <!-- Zero line -->
          <line x1="0" y1="150" x2="800" y2="150" stroke="#9ca3af" stroke-width="1"/>

          <!-- Input waveform (blue) -->
          <path :d="inputWaveform" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.7"/>
          
          <!-- Output waveform (orange) -->
          <path :d="outputWaveform" stroke="#f97316" stroke-width="2" fill="none"/>

          <!-- Labels -->
          <text x="20" y="25" font-size="12" fill="#3b82f6" font-weight="bold">Input (100%)</text>
          <text x="20" y="45" font-size="12" fill="#f97316" font-weight="bold">Output ({{ (gain * 100).toFixed(1) }}%)</text>

          <!-- Phase shift indicator -->
          <g v-if="Math.abs(phaseShift) > 1">
            <line :x1="200" y1="50" :x2="200 + phaseShift * 2" y2="50" stroke="#ef4444" stroke-width="2"/>
            <text x="400" y="45" font-size="11" fill="#ef4444" text-anchor="middle">Phase shift: {{ phaseShift.toFixed(1) }}°</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Attenuation Table -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Attenuation at Key Frequencies
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase tracking-wider">Frequency</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase tracking-wider">Ratio (f/fc)</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase tracking-wider">Gain</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase tracking-wider">Attenuation</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase tracking-wider">Phase Shift</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="row in attenuationTable" :key="row.freq" 
              :class="{'bg-orange-50 dark:bg-orange-900/20': row.isCurrent}">
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ row.freq }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.ratio }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium" :class="getGainColor(row.gain)">{{ row.gain }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.attenuation }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{{ row.phase }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Component values
const resistance = ref(1590) // Ohms
const capacitance = ref(10e-9) // Farads (10 nF)
const inputFrequency = ref(1000) // Hz

// Quick presets
const presets = [
  { name: 'Audio 1kHz', r: 1590, c: 10e-9, f: 1000 },
  { name: 'Audio 10kHz', r: 1590, c: 1e-9, f: 10000 },
  { name: 'RF 1MHz', r: 159, c: 100e-12, f: 1000000 },
  { name: 'DC Block 100Hz', r: 15900, c: 100e-9, f: 100 }
]

const applyPreset = (preset) => {
  resistance.value = preset.r
  capacitance.value = preset.c
  inputFrequency.value = preset.f
}

// Calculations
const cutoffFreq = computed(() => {
  return 1 / (2 * Math.PI * resistance.value * capacitance.value)
})

const timeConstant = computed(() => {
  return resistance.value * capacitance.value
})

const frequencyRatio = computed(() => {
  return inputFrequency.value / cutoffFreq.value
})

const capacitiveReactance = computed(() => {
  return 1 / (2 * Math.PI * inputFrequency.value * capacitance.value)
})

const gain = computed(() => {
  const ratio = frequencyRatio.value
  return ratio / Math.sqrt(1 + ratio * ratio)
})

const gainDb = computed(() => {
  return 20 * Math.log10(gain.value)
})

const phaseShift = computed(() => {
  const ratio = frequencyRatio.value
  return (Math.atan(1 / ratio) * 180) / Math.PI
})

// Bode curve for visualization
const bodeCurve = computed(() => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const logRatio = (i - 50) / 10 // Range from -5 to +5 in log scale
    const ratio = Math.pow(10, logRatio)
    const g = ratio / Math.sqrt(1 + ratio * ratio)
    const db = 20 * Math.log10(g)
    const x = 80 + i * 7.2 // Spread across width
    const y = 50 + db * 5 // Scale dB to pixels
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Current frequency marker on Bode plot
const currentFreqMarker = computed(() => {
  const logRatio = Math.log10(frequencyRatio.value)
  const x = 400 + logRatio * 72 // Center at fc (400), scale by log
  const db = gainDb.value
  const y = 50 + db * 5
  return { x: Math.max(80, Math.min(720, x)), y }
})

// Time domain waveforms
const inputWaveform = computed(() => {
  const points = []
  const amplitude = 50
  for (let i = 0; i <= 800; i++) {
    const angle = (i / 800) * 4 * Math.PI
    const y = 150 + amplitude * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`)
  }
  return points.join(' ')
})

const outputWaveform = computed(() => {
  const points = []
  const amplitude = 50 * gain.value
  const phaseRad = (phaseShift.value * Math.PI) / 180
  for (let i = 0; i <= 800; i++) {
    const angle = (i / 800) * 4 * Math.PI + phaseRad
    const y = 150 + amplitude * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`)
  }
  return points.join(' ')
})

// Attenuation table
const attenuationTable = computed(() => {
  const frequencies = [0.01, 0.1, 0.5, 1, 2, 10, 100]
  return frequencies.map(ratio => {
    const g = ratio / Math.sqrt(1 + ratio * ratio)
    const db = 20 * Math.log10(g)
    const phase = (Math.atan(1 / ratio) * 180) / Math.PI
    const freqVal = ratio * cutoffFreq.value
    
    return {
      freq: formatFrequency(freqVal),
      ratio: ratio < 1 ? `1/${(1/ratio).toFixed(0)}` : `${ratio.toFixed(0)}`,
      gain: (g * 100).toFixed(1) + '%',
      attenuation: db.toFixed(1) + ' dB',
      phase: phase.toFixed(1) + '°',
      isCurrent: Math.abs(frequencyRatio.value - ratio) < 0.15
    }
  })
})

// Formatting helpers
const formatFrequency = (freq) => {
  if (freq >= 1e6) return (freq / 1e6).toFixed(2) + ' MHz'
  if (freq >= 1e3) return (freq / 1e3).toFixed(2) + ' kHz'
  return freq.toFixed(2) + ' Hz'
}

const formatTime = (tau) => {
  if (tau >= 1) return tau.toFixed(2) + ' s'
  if (tau >= 1e-3) return (tau * 1e3).toFixed(2) + ' ms'
  if (tau >= 1e-6) return (tau * 1e6).toFixed(2) + ' µs'
  return (tau * 1e9).toFixed(2) + ' ns'
}

const formatResistance = (r) => {
  if (r >= 1e6) return (r / 1e6).toFixed(2) + ' MΩ'
  if (r >= 1e3) return (r / 1e3).toFixed(2) + ' kΩ'
  return r.toFixed(2) + ' Ω'
}

const getGainColor = (gain) => {
  const g = parseFloat(gain)
  if (g > 70) return 'text-green-600 dark:text-green-400'
  if (g > 30) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}
</script>

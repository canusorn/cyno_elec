<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RMS & Peak Voltage Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Bidirectional conversion between RMS, Peak, and Peak-to-Peak voltages for different waveforms
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-purple-600">V</span>
              <span class="text-gray-400">rms</span>
              <span class="text-gray-400">=</span>
              <span class="text-purple-600">V</span>
              <span class="text-gray-400">peak</span>
              <span class="text-gray-400">/</span>
              <span class="text-pink-600">√2</span>
              <span class="text-gray-400 mx-2">(sine)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Conversion varies by waveform type</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Waveform Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📊 Waveform Visualization
          </h3>
          
          <!-- SVG Waveform Display -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 700 300" class="w-full max-w-4xl h-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid -->
              <defs>
                <pattern id="waveGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
              </defs>
              <rect x="50" y="30" width="620" height="240" fill="url(#waveGrid)" />
              
              <!-- Zero line -->
              <line x1="50" y1="150" x2="670" y2="150" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Peak level lines -->
              <line x1="50" :y1="peakY" x2="670" :y2="peakY" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,4"/>
              <line x1="50" :y1="negativePeakY" x2="670" :y2="negativePeakY" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,4"/>
              
              <!-- Peak-to-Peak arrow -->
              <g transform="translate(660, 0)">
                <line x1="0" :y1="peakY" x2="0" :y2="negativePeakY" stroke="#F59E0B" stroke-width="2"/>
                <polygon points="-4,peakY 4,peakY 0,peakY + 6" fill="#F59E0B"/>
                <polygon points="-4,negativePeakY 4,negativePeakY 0,negativePeakY - 6" fill="#F59E0B"/>
                <text x="10" :y="(peakY + negativePeakY) / 2 + 5" font-size="12" fill="#F59E0B" font-weight="bold">
                  Vpp = {{ peakToPeakVoltage.toFixed(2) }}V
                </text>
              </g>
              
              <!-- RMS level indicators -->
              <rect x="55" :y="rmsPositiveY" width="610" :height="rmsHeight" fill="#8B5CF6" opacity="0.3"/>
              <line x1="50" :y1="rmsPositiveY" x2="670" :y2="rmsPositiveY" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="3,3"/>
              <line x1="50" :y1="rmsNegativeY" x2="670" :y2="rmsNegativeY" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="3,3"/>
              <text x="675" :y="rmsPositiveY + 5" font-size="11" fill="#8B5CF6" font-weight="bold">
                +Vrms
              </text>
              <text x="675" :y="rmsNegativeY + 5" font-size="11" fill="#8B5CF6" font-weight="bold">
                -Vrms
              </text>
              
              <!-- Peak labels -->
              <text x="55" :y="peakY - 5" font-size="11" fill="#EF4444" font-weight="bold">
                +Vpeak = {{ peakVoltage.toFixed(2) }}V
              </text>
              <text x="55" :y="negativePeakY + 15" font-size="11" fill="#EF4444" font-weight="bold">
                -Vpeak = {{ (-peakVoltage).toFixed(2) }}V
              </text>
              
              <!-- Waveform path -->
              <path 
                :d="waveformPath"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="3"
                stroke-linejoin="round"
              />
              
              <!-- Axis labels -->
              <text x="25" y="155" font-size="13" fill="#374151" font-weight="bold" text-anchor="middle" transform="rotate(-90, 25, 155)">Voltage (V)</text>
              <text x="360" y="290" font-size="13" fill="#374151" font-weight="bold" text-anchor="middle">Time →</text>
            </svg>
          </div>
          
          <!-- Legend -->
          <div class="flex justify-center gap-6 text-sm flex-wrap">
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-red-500" style="border-style: dashed;"></div>
              <span class="text-gray-700 dark:text-gray-300">Peak Levels</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-purple-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Waveform</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-purple-500 opacity-30"></div>
              <span class="text-gray-700 dark:text-gray-300">RMS Area</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-0.5 bg-amber-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Peak-to-Peak</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enter Value</h3>
              
              <!-- Waveform Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waveform Type
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="wave in waveformTypes"
                    :key="wave.value"
                    @click="waveform = wave.value"
                    :class="[
                      'px-4 py-3 rounded-lg font-semibold transition-colors text-sm',
                      waveform === wave.value 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    {{ wave.label }}
                  </button>
                </div>
              </div>
              
              <!-- Input Type Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Type
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    @click="inputType = 'rms'"
                    :class="[
                      'px-4 py-3 rounded-lg font-semibold transition-colors text-sm',
                      inputType === 'rms' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    RMS
                  </button>
                  <button 
                    @click="inputType = 'peak'"
                    :class="[
                      'px-4 py-3 rounded-lg font-semibold transition-colors text-sm',
                      inputType === 'peak' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    Peak
                  </button>
                  <button 
                    @click="inputType = 'peakToPeak'"
                    :class="[
                      'px-4 py-3 rounded-lg font-semibold transition-colors text-sm',
                      inputType === 'peakToPeak' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    Peak-to-Peak
                  </button>
                </div>
              </div>

              <!-- Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ inputLabel }}
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputVoltage"
                    type="number" 
                    step="any"
                    min="0"
                    placeholder="Enter voltage"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">V</span>
                </div>
                <input 
                  v-model.number="inputVoltage"
                  type="range"
                  min="0"
                  max="240"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style="background: linear-gradient(to right, #8B5CF6, #A78BFA);"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0V</span>
                  <span>120V</span>
                  <span>240V</span>
                </div>
              </div>
              
              <!-- Quick Presets -->
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
                <div class="grid grid-cols-2 gap-2">
                  <button @click="applyPreset('mains')" 
                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    ⚡ Mains (230V)
                  </button>
                  <button @click="applyPreset('usb')" 
                    class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    🔌 USB (5V)
                  </button>
                  <button @click="applyPreset('audio')" 
                    class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    🎵 Audio (1V)
                  </button>
                  <button @click="resetValues" 
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Conversion Results</h3>
              
              <!-- Results Display -->
              <div class="space-y-4">
                <!-- RMS Result -->
                <div :class="['bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 transition-colors', inputType === 'rms' ? 'border-purple-500' : 'border-transparent']">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">RMS Voltage</h4>
                      <p class="text-xs text-gray-600 dark:text-gray-400">Root Mean Square</p>
                    </div>
                    <div class="text-right">
                      <p class="text-3xl font-bold" :class="inputType === 'rms' ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'">
                        {{ rmsVoltage.toFixed(3) }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">V</p>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Formula:</span> {{ waveformFormulas[waveform].rms }}
                  </div>
                </div>

                <!-- Peak Result -->
                <div :class="['bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 transition-colors', inputType === 'peak' ? 'border-purple-500' : 'border-transparent']">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">Peak Voltage</h4>
                      <p class="text-xs text-gray-600 dark:text-gray-400">Maximum amplitude</p>
                    </div>
                    <div class="text-right">
                      <p class="text-3xl font-bold" :class="inputType === 'peak' ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'">
                        {{ peakVoltage.toFixed(3) }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">V</p>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Formula:</span> {{ waveformFormulas[waveform].peak }}
                  </div>
                </div>

                <!-- Peak-to-Peak Result -->
                <div :class="['bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 transition-colors', inputType === 'peakToPeak' ? 'border-purple-500' : 'border-transparent']">
                  <div class="flex justify-between items-center">
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">Peak-to-Peak Voltage</h4>
                      <p class="text-xs text-gray-600 dark:text-gray-400">Total swing</p>
                    </div>
                    <div class="text-right">
                      <p class="text-3xl font-bold" :class="inputType === 'peakToPeak' ? 'text-purple-600' : 'text-gray-700 dark:text-gray-300'">
                        {{ peakToPeakVoltage.toFixed(3) }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">V</p>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span class="font-medium">Formula:</span> Vpp = 2 × Vpeak
                  </div>
                </div>
              </div>

              <!-- Waveform Characteristics -->
              <div class="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Waveform Characteristics:</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Form Factor (Kf):</span>
                    <span class="font-bold text-purple-600">{{ formFactor.toFixed(3) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Crest Factor (Kc):</span>
                    <span class="font-bold text-pink-600">{{ crestFactor.toFixed(3) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-700 dark:text-gray-300">Average Value:</span>
                    <span class="font-bold text-blue-600">{{ averageVoltage.toFixed(3) }} V</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Voltage Measurements</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-red-700 dark:text-red-300 mb-2">🔴 Peak Voltage (Vpeak)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Maximum instantaneous value of voltage from zero. For AC signals, this is the amplitude of the waveform.
              </p>
            </div>
            
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-purple-700 dark:text-purple-300 mb-2">🟣 RMS Voltage (Vrms)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Root Mean Square - equivalent DC voltage that delivers the same power to a resistive load.
              </p>
            </div>
            
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 class="font-semibold text-amber-700 dark:text-amber-300 mb-2">🟡 Peak-to-Peak (Vpp)</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Total voltage swing from negative peak to positive peak. Always 2× Vpeak for symmetrical waveforms.
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Form Factor & Crest Factor</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li><strong>Form Factor (Kf) = Vrms / Vavg:</strong> Indicates waveform shape. Sine = 1.11</li>
                <li><strong>Crest Factor (Kc) = Vpeak / Vrms:</strong> Peak-to-RMS ratio. Sine = 1.414</li>
                <li>Higher crest factors indicate more "peaky" waveforms with transient spikes</li>
                <li>Important for designing power supplies and measuring instruments</li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Common Applications</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>⚡ <strong>Mains Power:</strong> 230V RMS (sine) → 325V peak → 650V peak-to-peak</li>
                <li>🔌 <strong>USB/Audio:</strong> Often specified in peak-to-peak for signal levels</li>
                <li>📊 <strong>Multimeters:</strong> Usually display RMS for AC measurements</li>
                <li>🔧 <strong>Oscilloscopes:</strong> Show peak-to-peak by default</li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">💡 Why RMS Matters</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              RMS is the most useful voltage measurement for power calculations because it represents the 
              equivalent DC voltage that would produce the same heating effect in a resistor. This is why 
              mains voltage is always specified in RMS (e.g., 120V or 230V) - it directly relates to the 
              power available: P = V²/R. Peak and peak-to-peak values are more useful for signal analysis, 
              component rating (voltage ratings), and oscilloscope measurements.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

// SEO
useHead({
  title: 'RMS & Peak Voltage Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Convert between RMS, Peak, and Peak-to-Peak voltages for sine, square, triangle, and sawtooth waveforms. Interactive visualization with conversion formulas.' },
    { name: 'keywords', content: 'RMS voltage, peak voltage, peak-to-peak, voltage conversion, AC waveform, form factor, crest factor' }
  ]
})

const colorMode = useColorMode()

// Waveform types
const waveformTypes = [
  { value: 'sine', label: 'Sine' },
  { value: 'square', label: 'Square' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'sawtooth', label: 'Sawtooth' }
]

// Conversion factors for each waveform
const conversionFactors = {
  sine: {
    rmsToPeak: Math.sqrt(2),
    rmsToPeakToPeak: 2 * Math.sqrt(2),
    avgToRms: Math.PI / (2 * Math.sqrt(2)),
    formFactor: 1.11,
    crestFactor: 1.414
  },
  square: {
    rmsToPeak: 1,
    rmsToPeakToPeak: 2,
    avgToRms: 1,
    formFactor: 1.0,
    crestFactor: 1.0
  },
  triangle: {
    rmsToPeak: Math.sqrt(3),
    rmsToPeakToPeak: 2 * Math.sqrt(3),
    avgToRms: (2 * Math.sqrt(3)) / 3,
    formFactor: 1.15,
    crestFactor: 1.732
  },
  sawtooth: {
    rmsToPeak: Math.sqrt(3),
    rmsToPeakToPeak: 2 * Math.sqrt(3),
    avgToRms: (2 * Math.sqrt(3)) / 3,
    formFactor: 1.15,
    crestFactor: 1.732
  }
}

// Input values
const waveform = ref('sine')
const inputType = ref('rms') // 'rms', 'peak', 'peakToPeak'
const inputVoltage = ref(230) // Default: mains voltage RMS

// Presets
const presets = {
  mains: { voltage: 230, type: 'rms', waveform: 'sine' },
  usb: { voltage: 5, type: 'peak', waveform: 'square' },
  audio: { voltage: 1, type: 'peakToPeak', waveform: 'sine' }
}

function applyPreset(type) {
  const preset = presets[type]
  if (preset) {
    inputVoltage.value = preset.voltage
    inputType.value = preset.type
    waveform.value = preset.waveform
  }
}

function resetValues() {
  inputVoltage.value = 230
  inputType.value = 'rms'
  waveform.value = 'sine'
}

// Computed: Conversion factors for current waveform
const factors = computed(() => conversionFactors[waveform.value])

// Computed: All voltage values
const rmsVoltage = computed(() => {
  if (inputType.value === 'rms') {
    return inputVoltage.value
  } else if (inputType.value === 'peak') {
    return inputVoltage.value / factors.value.rmsToPeak
  } else {
    return inputVoltage.value / factors.value.rmsToPeakToPeak
  }
})

const peakVoltage = computed(() => {
  return rmsVoltage.value * factors.value.rmsToPeak
})

const peakToPeakVoltage = computed(() => {
  return rmsVoltage.value * factors.value.rmsToPeakToPeak
})

const averageVoltage = computed(() => {
  // For full-wave rectified average
  return rmsVoltage.value / factors.value.formFactor
})

const formFactor = computed(() => factors.value.formFactor)
const crestFactor = computed(() => factors.value.crestFactor)

// Computed: Input label
const inputLabel = computed(() => {
  const labels = {
    rms: 'RMS Voltage (V_rms)',
    peak: 'Peak Voltage (V_peak)',
    peakToPeak: 'Peak-to-Peak Voltage (V_pp)'
  }
  return labels[inputType.value]
})

// Computed: Waveform formulas
const waveformFormulas = {
  sine: {
    rms: 'Vrms = Vpeak / √2',
    peak: 'Vpeak = Vrms × √2'
  },
  square: {
    rms: 'Vrms = Vpeak',
    peak: 'Vpeak = Vrms'
  },
  triangle: {
    rms: 'Vrms = Vpeak / √3',
    peak: 'Vpeak = Vrms × √3'
  },
  sawtooth: {
    rms: 'Vrms = Vpeak / √3',
    peak: 'Vpeak = Vrms × √3'
  }
}

// Computed: Y positions for waveform display
const peakY = computed(() => {
  const maxVoltage = 240 // Maximum for display scaling
  const voltageRatio = Math.min(peakVoltage.value / maxVoltage, 1)
  return 60 + (1 - voltageRatio) * 20
})

const negativePeakY = computed(() => {
  return 300 - peakY.value
})

const rmsPositiveY = computed(() => {
  const rmsRatio = (rmsVoltage.value / peakVoltage.value)
  const yOffset = (peakY.value - 150) * rmsRatio
  return 150 - yOffset
})

const rmsNegativeY = computed(() => {
  return 300 - rmsPositiveY.value
})

const rmsHeight = computed(() => {
  return rmsNegativeY.value - rmsPositiveY.value
})

// Computed: Waveform path
const waveformPath = computed(() => {
  const cycles = 4
  let path = 'M'
  const points = []
  
  if (waveform.value === 'sine') {
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * cycles * 2 * Math.PI
      const y = 150 - Math.sin(t) * (150 - peakY.value)
      const x = 50 + (i / 200) * 620
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
  } else if (waveform.value === 'square') {
    for (let i = 0; i <= 200; i++) {
      const phase = (i / 200) * cycles * 2 * Math.PI
      const y = Math.sin(phase) >= 0 ? peakY.value : negativePeakY.value
      const x = 50 + (i / 200) * 620
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
  } else if (waveform.value === 'triangle') {
    for (let i = 0; i <= 200; i++) {
      const phase = ((i / 200) * cycles * 2 * Math.PI) % (2 * Math.PI)
      let normalized
      if (phase < Math.PI) {
        normalized = (phase / Math.PI) * 2 - 1
      } else {
        normalized = ((phase - Math.PI) / Math.PI) * 2 - 1
        normalized = -normalized
      }
      const y = 150 - normalized * (150 - peakY.value)
      const x = 50 + (i / 200) * 620
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
  } else if (waveform.value === 'sawtooth') {
    for (let i = 0; i <= 200; i++) {
      const phase = ((i / 200) * cycles) % 1
      const normalized = phase * 2 - 1
      const y = 150 - normalized * (150 - peakY.value)
      const x = 50 + (i / 200) * 620
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    }
  }
  
  return path + points.join(' L')
})
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}
</style>

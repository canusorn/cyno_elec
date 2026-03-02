<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Rectifier Smoothing Filter Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Interactive simulation of capacitor smoothing in full-wave rectifier circuits
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-blue-600">V</span>
              <span class="text-gray-400">ripple</span>
              <span class="text-gray-400">≈</span>
              <span class="text-blue-600">I</span>
              <span class="text-gray-400">load</span>
              <span class="text-gray-400">/</span>
              <span class="text-blue-600">2 × f × C</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Ripple Voltage Formula for Full-Wave Rectifier</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Waveform Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📊 Waveform Comparison: Before & After Smoothing
          </h3>
          
          <!-- SVG Waveform Display -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 700 450" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid -->
              <defs>
                <pattern id="waveformGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
              </defs>
              <rect x="50" y="30" width="620" height="180" fill="url(#waveformGrid)" />
              <rect x="50" y="240" width="620" height="180" fill="url(#waveformGrid)" />
              
              <!-- === BEFORE SMOOTHING (Unsmoothed Full-Wave) === -->
              <text x="60" y="55" font-size="14" font-weight="bold" fill="#374151">Before Smoothing (Pulsating DC)</text>
              <line x1="50" y1="30" x2="50" y2="210" stroke="#6B7280" stroke-width="2"/>
              <line x1="50" y1="120" x2="670" y2="120" stroke="#6B7280" stroke-width="2"/>
              
              <!-- Unsmoothed waveform -->
              <path 
                :d="unsmoothedWaveformPath"
                fill="none"
                stroke="#EF4444"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              
              <!-- Peak labels for unsmoothed -->
              <text x="55" y="45" font-size="11" fill="#EF4444" font-weight="bold">Vpeak = {{ vPeak.toFixed(1) }}V</text>
              <text x="55" y="200" font-size="11" fill="#EF4444">0V</text>
              
              <!-- === AFTER SMOOTHING (With Capacitor) === -->
              <text x="60" y="265" font-size="14" font-weight="bold" fill="#374151">After Smoothing (Filtered DC)</text>
              <line x1="50" y1="240" x2="50" y2="420" stroke="#6B7280" stroke-width="2"/>
              <line x1="50" y1="330" x2="670" y2="330" stroke="#6B7280" stroke-width="2"/>
              
              <!-- Smoothed waveform with ripple -->
              <path 
                :d="smoothedWaveformPath"
                fill="none"
                stroke="#22C55E"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              
              <!-- DC level indicators -->
              <line x1="50" :y1="dcLevelY" x2="670" :y2="dcLevelY" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="5,5"/>
              <text x="675" :y="dcLevelY + 5" font-size="11" fill="#3B82F6" font-weight="bold">
                DC ≈ {{ dcVoltage.toFixed(1) }}V
              </text>
              
              <!-- Ripple indicators -->
              <line x1="50" :y1="rippleTopY" x2="670" :y2="rippleTopY" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
              <line x1="50" :y1="rippleBottomY" x2="670" :y2="rippleBottomY" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
              
              <!-- Ripple arrow -->
              <g transform="translate(620, 0)">
                <line x1="0" :y1="rippleTopY" x2="0" :y2="rippleBottomY" stroke="#F59E0B" stroke-width="2"/>
                <polygon points="-4,rippleTopY -4,rippleBottomY 4,(rippleTopY + rippleBottomY)/2" fill="#F59E0B"/>
                <text x="10" :y="(rippleTopY + rippleBottomY) / 2 + 5" font-size="12" fill="#F59E0B" font-weight="bold">
                  Vr = {{ rippleVoltage.toFixed(2) }}V
                </text>
              </g>
              
              <!-- Time labels -->
              <text x="50" y="445" font-size="11" fill="#6B7280" text-anchor="middle">0</text>
              <text x="205" y="445" font-size="11" fill="#6B7280" text-anchor="middle">T/2</text>
              <text x="360" y="445" font-size="11" fill="#6B7280" text-anchor="middle">T</text>
              <text x="515" y="445" font-size="11" fill="#6B7280" text-anchor="middle">3T/2</text>
              <text x="670" y="445" font-size="11" fill="#6B7280" text-anchor="middle">2T</text>
              <text x="360" y="465" font-size="13" fill="#374151" font-weight="bold" text-anchor="middle">Time (periods)</text>
            </svg>
          </div>
          
          <!-- Legend -->
          <div class="flex justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-red-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Pulsating DC (no filter)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-green-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Smoothed DC (with capacitor)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-0.5 bg-blue-500" style="border-style: dashed;"></div>
              <span class="text-gray-700 dark:text-gray-300">DC level</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-0.5 bg-amber-500" style="border-style: dashed;"></div>
              <span class="text-gray-700 dark:text-gray-300">Ripple</span>
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Parameters</h3>
              
              <!-- Peak Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peak Voltage (V_peak)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="vPeak"
                    type="number" 
                    step="0.1"
                    min="1"
                    placeholder="Enter peak voltage"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">V</span>
                </div>
                <input 
                  v-model.number="vPeak"
                  type="range"
                  min="5"
                  max="50"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style="background: linear-gradient(to right, #3B82F6, #60A5FA);"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>5V</span>
                  <span>25V</span>
                  <span>50V</span>
                </div>
              </div>

              <!-- Load Current Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Current (I_load)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="loadCurrent"
                    type="number" 
                    step="0.01"
                    min="0.001"
                    placeholder="Enter load current"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">A</span>
                </div>
                <input 
                  v-model.number="loadCurrent"
                  type="range"
                  min="0.01"
                  max="5"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style="background: linear-gradient(to right, #10B981, #34D399);"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>10mA</span>
                  <span>1A</span>
                  <span>5A</span>
                </div>
              </div>

              <!-- Frequency Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  AC Frequency (f)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="frequency"
                    type="number" 
                    step="1"
                    min="10"
                    placeholder="Enter frequency"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-16">Hz</span>
                </div>
                <input 
                  v-model.number="frequency"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style="background: linear-gradient(to right, #8B5CF6, #A78BFA);"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>10Hz</span>
                  <span>500Hz</span>
                  <span>1kHz</span>
                </div>
              </div>

              <!-- Capacitance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter Capacitance (C)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="capacitance"
                    type="number" 
                    step="1"
                    min="1"
                    placeholder="Enter capacitance"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-16">μF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="1"
                  max="10000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style="background: linear-gradient(to right, #F59E0B, #FBBF24);"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1μF</span>
                  <span>5mF</span>
                  <span>10mF</span>
                </div>
              </div>
              
              <!-- Preset Buttons -->
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
                <div class="grid grid-cols-2 gap-2">
                  <button @click="applyPreset('audio')" 
                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    🎵 Audio Amp
                  </button>
                  <button @click="applyPreset('digital')" 
                    class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    🔌 Digital Circuit
                  </button>
                  <button @click="applyPreset('power')" 
                    class="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium">
                    ⚡ Power Supply
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h3>
              
              <!-- Ripple Voltage Display -->
              <div class="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Ripple Voltage (V_ripple)</p>
                  <div class="text-5xl font-bold text-amber-600 mb-2">
                    {{ rippleVoltage.toFixed(3) }} V
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    Vr ≈ I_load / (2 × f × C)
                  </p>
                </div>
              </div>

              <!-- DC Output Voltage -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Output Voltage Analysis:</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Peak Input (V_peak):</span>
                    <span class="font-bold text-red-600">{{ vPeak.toFixed(2) }} V</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">DC Output (V_dc):</span>
                    <span class="font-bold text-blue-600">{{ dcVoltage.toFixed(2) }} V</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Min Output (V_min):</span>
                    <span class="font-bold text-green-600">{{ (dcVoltage - rippleVoltage/2).toFixed(2) }} V</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Max Output (V_max):</span>
                    <span class="font-bold text-green-600">{{ (dcVoltage + rippleVoltage/2).toFixed(2) }} V</span>
                  </div>
                </div>
              </div>

              <!-- Ripple Percentage -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📈 Ripple Percentage:</h4>
                <div class="flex items-center gap-4">
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full transition-all duration-300"
                        :class="ripplePercentageClass"
                        :style="{ width: Math.min(ripplePercentage, 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                  <span class="text-2xl font-bold" :class="ripplePercentageTextClass">
                    {{ ripplePercentage.toFixed(1) }}%
                  </span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Lower ripple % = smoother DC output. Good design: < 5%
                </p>
              </div>

              <!-- Quality Assessment -->
              <div :class="['rounded-lg p-4 border-2', qualityClass]">
                <h4 class="font-semibold mb-2">✨ Quality Assessment:</h4>
                <p class="text-sm">{{ qualityMessage }}</p>
              </div>

              <!-- Formulas -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📘 Key Formulas:</h4>
                <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><strong>Ripple Voltage:</strong> Vr ≈ I_load / (2 × f × C)</p>
                  <p><strong>DC Output:</strong> V_dc ≈ V_peak - Vr/2</p>
                  <p><strong>Ripple %:</strong> (Vr / V_dc) × 100%</p>
                  <p><strong>Load Resistance:</strong> R_L = V_dc / I_load</p>
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
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Capacitor Smoothing</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">How It Works</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span><strong>Charging:</strong> When rectified voltage exceeds capacitor voltage, diode conducts and charges the capacitor</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span><strong>Discharging:</strong> Between peaks, capacitor supplies current to load, discharging slowly</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 mt-1">•</span>
                  <span><strong>Ripple:</strong> The voltage difference between max and min output voltage</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-purple-500 mt-1">•</span>
                  <span><strong>Time Constant:</strong> Larger C = slower discharge = less ripple</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Design Considerations</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-red-500 mt-1">•</span>
                  <span><strong>Higher Current:</strong> Increases ripple proportionally</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span><strong>Higher Frequency:</strong> Reduces ripple (full-wave: 2× line frequency)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span><strong>Larger Capacitor:</strong> Exponentially reduces ripple</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-500 mt-1">•</span>
                  <span><strong>Trade-offs:</strong> Large capacitors are expensive and physically large</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">💡 Real-World Applications</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• <strong>Power Supplies:</strong> Converting AC to clean DC for electronics</li>
              <li>• <strong>Audio Amplifiers:</strong> Reducing hum in audio circuits</li>
              <li>• <strong>Digital Circuits:</strong> Providing stable voltage for logic ICs</li>
              <li>• <strong>Battery Chargers:</strong> Smooth charging current</li>
            </ul>
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
  title: 'Rectifier Smoothing Filter Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of capacitor smoothing in full-wave rectifier circuits. Learn about ripple voltage, filter design, and DC power supply design.' },
    { name: 'keywords', content: 'rectifier smoothing, capacitor filter, ripple voltage, DC power supply, full-wave rectifier' }
  ]
})

const colorMode = useColorMode()

// Input values
const vPeak = ref(12) // Peak voltage in volts
const loadCurrent = ref(0.5) // Load current in amps
const frequency = ref(50) // AC frequency in Hz
const capacitance = ref(1000) // Capacitance in microfarads

// Presets
const presets = {
  audio: { vPeak: 25, loadCurrent: 1.5, frequency: 50, capacitance: 4700 },
  digital: { vPeak: 5, loadCurrent: 0.1, frequency: 50, capacitance: 470 },
  power: { vPeak: 18, loadCurrent: 2, frequency: 60, capacitance: 10000 }
}

function applyPreset(type) {
  const preset = presets[type]
  if (preset) {
    vPeak.value = preset.vPeak
    loadCurrent.value = preset.loadCurrent
    frequency.value = preset.frequency
    capacitance.value = preset.capacitance
  }
}

function resetValues() {
  vPeak.value = 12
  loadCurrent.value = 0.5
  frequency.value = 50
  capacitance.value = 1000
}

// Computed: Ripple voltage using approximate formula for full-wave rectifier
// Vr ≈ I_load / (2 * f * C)
const rippleVoltage = computed(() => {
  const c = capacitance.value * 1e-6 // Convert μF to F
  return loadCurrent.value / (2 * frequency.value * c)
})

// Computed: DC output voltage (approximate)
// V_dc ≈ V_peak - Vr/2
const dcVoltage = computed(() => {
  return vPeak.value - (rippleVoltage.value / 2)
})

// Computed: Ripple percentage
const ripplePercentage = computed(() => {
  if (dcVoltage.value === 0) return 0
  return (rippleVoltage.value / dcVoltage.value) * 100
})

// Computed: Quality class based on ripple percentage
const qualityClass = computed(() => {
  if (ripplePercentage.value < 5) {
    return 'border-green-500 bg-green-50 dark:bg-green-900/20'
  } else if (ripplePercentage.value < 10) {
    return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
  } else {
    return 'border-red-500 bg-red-50 dark:bg-red-900/20'
  }
})

const qualityMessage = computed(() => {
  if (ripplePercentage.value < 5) {
    return '✅ Excellent! Very low ripple. Suitable for sensitive electronics and precision circuits.'
  } else if (ripplePercentage.value < 10) {
    return '⚠️ Acceptable. Moderate ripple. May be suitable for non-critical applications.'
  } else {
    return '❌ High ripple! Consider increasing capacitance or reducing load current for better performance.'
  }
})

const ripplePercentageClass = computed(() => {
  if (ripplePercentage.value < 5) return 'bg-green-500'
  if (ripplePercentage.value < 10) return 'bg-yellow-500'
  return 'bg-red-500'
})

const ripplePercentageTextClass = computed(() => {
  if (ripplePercentage.value < 5) return 'text-green-600'
  if (ripplePercentage.value < 10) return 'text-yellow-600'
  return 'text-red-600'
})

// Computed: Y positions for waveform display
const dcLevelY = computed(() => {
  return 330 + 90 - ((dcVoltage.value / vPeak.value) * 85)
})

const rippleTopY = computed(() => {
  return dcLevelY.value - (rippleVoltage.value / vPeak.value) * 42
})

const rippleBottomY = computed(() => {
  return dcLevelY.value + (rippleVoltage.value / vPeak.value) * 42
})

// Computed: Unsmoothed waveform path (full-wave rectified sine)
const unsmoothedWaveformPath = computed(() => {
  let path = 'M'
  const points = []
  const cycles = 4 // Show 4 complete cycles
  
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * cycles * Math.PI // 0 to 4π
    const absSine = Math.abs(Math.sin(t))
    const x = 50 + (i / 200) * 620
    const y = 120 - (absSine * 85)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  
  return path + points.join(' L')
})

// Computed: Smoothed waveform path with ripple
const smoothedWaveformPath = computed(() => {
  let path = 'M'
  const points = []
  const cycles = 4
  const rippleAmplitude = (rippleVoltage.value / vPeak.value) * 42
  const dcY = dcLevelY.value
  
  for (let i = 0; i <= 200; i++) {
    const phase = (i / 200) * cycles * 2 * Math.PI // 0 to 8π (4 cycles)
    // Slow discharge with sharp recharge peaks
    const cyclePhase = (phase % (2 * Math.PI))
    let yOffset
    
    if (cyclePhase < 0.5) {
      // Charging phase (near peak)
      const chargeProgress = cyclePhase / 0.5
      yOffset = rippleAmplitude * (1 - chargeProgress * 0.3)
    } else {
      // Discharging phase (exponential decay)
      const dischargeProgress = (cyclePhase - 0.5) / (2 * Math.PI - 0.5)
      yOffset = rippleAmplitude * (0.7 + 0.3 * Math.exp(-dischargeProgress * 3))
    }
    
    const x = 50 + (i / 200) * 620
    const y = dcY - yOffset
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
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
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}
</style>

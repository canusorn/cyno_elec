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
            RC Low Pass Filter Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate cutoff frequency, time constant, and frequency response for RC low pass filters
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary-highlight">fₙ</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">1</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary-highlight">(2πRC)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Cutoff Frequency (fc) = 1 / (2π × Resistance × Capacitance)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Frequency Response Curve -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📊 Frequency Response (Bode Plot)
          </h3>
          
          <!-- Interactive Bode Plot -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 400" class="w-full max-w-5xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid -->
              <defs>
                <pattern id="bodeGrid" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
              </defs>
              <rect x="80" y="40" width="680" height="280" fill="url(#bodeGrid)" />
              
              <!-- Axes -->
              <line x1="80" y1="40" x2="80" y2="320" stroke="#374151" stroke-width="2"/>
              <line x1="80" y1="320" x2="760" y2="320" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels (dB) -->
              <text x="70" y="325" text-anchor="end" :font-size="12" fill="#6B7280">-40</text>
              <text x="70" y="255" text-anchor="end" :font-size="12" fill="#6B7280">-20</text>
              <text x="70" y="185" text-anchor="end" :font-size="12" fill="#6B7280">0</text>
              <text x="70" y="115" text-anchor="end" :font-size="12" fill="#6B7280">+20</text>
              <text x="70" y="45" text-anchor="end" :font-size="12" fill="#6B7280">+40</text>
              <text x="40" y="180" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 180)">Gain (dB)</text>
              
              <!-- X-axis labels (Frequency - logarithmic scale representation) -->
              <text x="80" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">0.01fc</text>
              <text x="250" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">0.1fc</text>
              <text x="420" y="340" text-anchor="middle" :font-size="12" fill="#EF4444" font-weight="bold">fc</text>
              <text x="590" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">10fc</text>
              <text x="760" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">100fc</text>
              <text x="420" y="370" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151">Frequency (relative to fc)</text>
              
              <!-- 0dB line (passband) -->
              <line x1="80" y1="185" x2="760" y2="185" stroke="#22C55E" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
              <text x="765" y="189" :font-size="11" fill="#22C55E" font-weight="bold">0dB</text>
              
              <!-- -3dB line (cutoff) -->
              <line x1="80" y1="197" x2="760" y2="197" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
              <text x="765" y="201" :font-size="11" fill="#EF4444" font-weight="bold">-3dB</text>
              
              <!-- Cutoff frequency marker -->
              <line x1="420" y1="40" x2="420" y2="320" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5" opacity="0.6"/>
              <text x="420" y="35" text-anchor="middle" :font-size="12" fill="#EF4444" font-weight="bold">{{ cutoffFreqText }}</text>
              
              <!-- Frequency Response Curve -->
              <path 
                :d="bodeCurvePath"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="3"
                stroke-linecap="round"
              />
              
              <!-- Current frequency marker -->
              <circle v-if="testFreqGain !== null" :cx="testFreqX" :cy="testFreqY" r="6" fill="#F59E0B" stroke="white" stroke-width="2"/>
            </svg>
          </div>
          
          <!-- Frequency input for testing -->
          <div class="max-w-md mx-auto mt-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Frequency (Hz)
            </label>
            <div class="flex items-center gap-4">
              <input 
                v-model.number="testFrequency"
                type="number" 
                step="1"
                min="1"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter test frequency"
              />
              <span class="text-gray-500 dark:text-gray-400">Hz</span>
            </div>
            <div v-if="testFrequency > 0 && cutoffFrequency > 0" class="mt-3 text-center">
              <div class="text-lg font-bold text-primary-highlight">
                Gain: {{ testFreqGain !== null ? testFreqGain.toFixed(2) : '-' }} dB
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ testFreqGain !== null && testFreqGain >= -3 ? '✅ In passband' : '❌ In stopband' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Input Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Component Values
            </h3>
            
            <!-- Resistance Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resistance (R)
              </label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  v-model.number="resistance"
                  type="number" 
                  step="0.1"
                  min="0.1"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select 
                  v-model="resistanceUnit"
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="ohms">Ω</option>
                  <option value="kohms">kΩ</option>
                  <option value="mohms">MΩ</option>
                </select>
              </div>
              <input 
                v-model.number="resistance"
                type="range"
                min="100"
                max="100000"
                step="100"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
            
            <!-- Capacitance Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacitance (C)
              </label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  v-model.number="capacitance"
                  type="number" 
                  step="0.1"
                  min="0.1"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select 
                  v-model="capacitanceUnit"
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="pf">pF</option>
                  <option value="nf">nF</option>
                  <option value="uf">µF</option>
                  <option value="f">F</option>
                </select>
              </div>
              <input 
                v-model.number="capacitance"
                type="range"
                min="1"
                max="1000000"
                step="10"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
          </div>
          
          <!-- Results Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculated Results
            </h3>
            
            <!-- Cutoff Frequency -->
            <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Cutoff Frequency (fc)</div>
              <div class="text-3xl font-bold text-primary-highlight">
                {{ formatFrequency(cutoffFrequency) }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Frequency at -3dB point (70.7% amplitude)
              </div>
            </div>
            
            <!-- Time Constant -->
            <div class="mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Constant (τ = RC)</div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">
                {{ formatTime(timeConstant) }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Time to reach 63.2% of final value
              </div>
            </div>
            
            <!-- Reactance at Cutoff -->
            <div class="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Capacitive Reactance at fc</div>
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {{ formatResistance(reactanceAtCutoff) }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Xc = R at cutoff frequency (voltage divider 50%)
              </div>
            </div>
            
            <!-- Filter Classification -->
            <div class="p-4 bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Filter Type</div>
              <div class="text-xl font-bold text-pink-600 dark:text-pink-400">
                {{ filterClassification }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Based on cutoff frequency range
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding RC Low Pass Filters
          </h3>
          
          <div class="prose dark:prose-invert max-w-none">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">📌 Key Concepts</h4>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Passband:</strong> Frequencies below fc pass through with minimal attenuation</li>
                  <li><strong>Stopband:</strong> Frequencies above fc are increasingly attenuated</li>
                  <li><strong>Cutoff Frequency:</strong> The frequency where output is 70.7% (-3dB) of input</li>
                  <li><strong>Rolloff Rate:</strong> -20dB/decade for first-order RC filters</li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">🔧 Design Tips</h4>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Audio:</strong> Use fc = 20kHz - 100kHz for preamp filtering</li>
                  <li><strong>Power Supply:</strong> Use fc = 10Hz - 100Hz for ripple rejection</li>
                  <li><strong>DC Removal:</strong> Use fc = 0.1Hz - 1Hz for AC coupling</li>
                  <li><strong>Anti-aliasing:</strong> Set fc below Nyquist frequency</li>
                </ul>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">📐 Transfer Function</h4>
              <div class="font-mono text-lg text-center mb-2">
                H(f) = 1 / √(1 + (f/fc)²)
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                The magnitude response shows how the filter attenuates higher frequencies. At the cutoff frequency, 
                the output is 1/√2 (approximately 0.707 or -3dB) of the input amplitude.
              </p>
            </div>
            
            <div class="mt-6 p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">⚡ Practical Notes</h4>
              <ul class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• Component tolerances affect actual cutoff frequency (use 1% or better for precision)</li>
                <li>• Source impedance should be much lower than R for accurate response</li>
                <li>• Load impedance should be much higher than R to avoid loading effects</li>
                <li>• For steeper rolloff, cascade multiple RC filter stages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-gray-400">
          RC Low Pass Filter Calculator • Cyno Electric • Educational Tool
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const $colorMode = useColorMode()

// Component values
const resistance = ref(1000)
const resistanceUnit = ref('ohms')
const capacitance = ref(100)
const capacitanceUnit = ref('nf')

// Test frequency
const testFrequency = ref(1000)

// Get resistance in ohms
const resistanceInOhms = computed(() => {
  switch (resistanceUnit.value) {
    case 'kohms': return resistance.value * 1000
    case 'mohms': return resistance.value * 1000000
    default: return resistance.value
  }
})

// Get capacitance in farads
const capacitanceInFarads = computed(() => {
  switch (capacitanceUnit.value) {
    case 'pf': return capacitance.value * 1e-12
    case 'nf': return capacitance.value * 1e-9
    case 'uf': return capacitance.value * 1e-6
    default: return resistance.value
  }
})

// Calculate cutoff frequency
const cutoffFrequency = computed(() => {
  const r = resistanceInOhms.value
  const c = capacitanceInFarads.value
  if (r <= 0 || c <= 0) return 0
  return 1 / (2 * Math.PI * r * c)
})

// Calculate time constant
const timeConstant = computed(() => {
  return resistanceInOhms.value * capacitanceInFarads.value
})

// Calculate reactance at cutoff frequency
const reactanceAtCutoff = computed(() => {
  const fc = cutoffFrequency.value
  const c = capacitanceInFarads.value
  if (fc <= 0 || c <= 0) return 0
  return 1 / (2 * Math.PI * fc * c)
})

// Filter classification based on cutoff frequency
const filterClassification = computed(() => {
  const fc = cutoffFrequency.value
  if (fc < 10) return 'Very Low Frequency (Sub-10Hz)'
  if (fc < 100) return 'Low Frequency (10-100Hz)'
  if (fc < 1000) return 'Audio Low Band (100-1kHz)'
  if (fc < 10000) return 'Audio Mid/High (1-10kHz)'
  if (fc < 100000) return 'High Frequency (10-100kHz)'
  if (fc < 1000000) return 'Very High Frequency (100kHz-1MHz)'
  return 'RF (>1MHz)'
})

// Format frequency for display
const formatFrequency = (hz) => {
  if (hz <= 0) return '0 Hz'
  if (hz < 1000) return `${hz.toFixed(2)} Hz`
  if (hz < 1000000) return `${(hz / 1000).toFixed(2)} kHz`
  return `${(hz / 1000000).toFixed(2)} MHz`
}

// Format time for display
const formatTime = (seconds) => {
  if (seconds <= 0) return '0 s'
  if (seconds < 1e-6) return `${(seconds * 1e9).toFixed(2)} ns`
  if (seconds < 1e-3) return `${(seconds * 1e6).toFixed(2)} µs`
  if (seconds < 1) return `${(seconds * 1000).toFixed(2)} ms`
  return `${seconds.toFixed(4)} s`
}

// Format resistance for display
const formatResistance = (ohms) => {
  if (ohms <= 0) return '0 Ω'
  if (ohms < 1000) return `${ohms.toFixed(2)} Ω`
  if (ohms < 1000000) return `${(ohms / 1000).toFixed(2)} kΩ`
  return `${(ohms / 1000000).toFixed(2)} MΩ`
}

// Cutoff frequency text
const cutoffFreqText = computed(() => {
  return formatFrequency(cutoffFrequency.value)
})

// Calculate gain at test frequency
const testFreqGain = computed(() => {
  if (testFrequency.value <= 0 || cutoffFrequency.value <= 0) return null
  const ratio = testFrequency.value / cutoffFrequency.value
  const magnitude = 1 / Math.sqrt(1 + ratio * ratio)
  const db = 20 * Math.log10(magnitude)
  return db
})

// Calculate test frequency position on Bode plot
const testFreqX = computed(() => {
  if (testFrequency.value <= 0 || cutoffFrequency.value <= 0) return 80
  const ratio = testFrequency.value / cutoffFrequency.value
  // Log scale: map ratio to x position (80 to 760, with 420 at ratio=1)
  const logRatio = Math.log10(ratio)
  // fc=1 is at x=420, fc=0.1 is at x=250, fc=10 is at x=590
  const xPos = 420 + (logRatio * 170)
  return Math.max(80, Math.min(760, xPos))
})

const testFreqY = computed(() => {
  if (testFreqGain.value === null) return 185
  // Map dB to y position (0dB = 185, -20dB = 255, etc.)
  return 185 - (testFreqGain.value * 3.5)
})

// Generate Bode curve path
const bodeCurvePath = computed(() => {
  let path = 'M'
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    // Generate points from 0.01fc to 100fc
    const logRatio = -2 + (i / 100) * 4  // -2 to +2 in log scale
    const ratio = Math.pow(10, logRatio)
    const magnitude = 1 / Math.sqrt(1 + ratio * ratio)
    const db = 20 * Math.log10(magnitude)
    
    const xPos = 420 + (logRatio * 170)
    const yPos = 185 - (db * 3.5)
    
    points.push(`${xPos.toFixed(1)},${yPos.toFixed(1)}`)
  }
  
  return path + points.join(' L')
})

// SEO Meta
useHead({
  title: 'RC Low Pass Filter Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate RC low pass filter cutoff frequency, time constant, and frequency response. Interactive Bode plot visualization with educational content.' }
  ]
})
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: 2px solid #7986CB;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: 2px solid #7986CB;
}
</style>

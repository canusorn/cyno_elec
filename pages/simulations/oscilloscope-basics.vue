<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            📊 Oscilloscope Basics
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how to read waveforms and use an oscilloscope. Measure voltage, frequency, and period like a pro!
          </p>

          <!-- Key Formulas -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary">Frequency:</span> f = 1/T &nbsp;|&nbsp; 
              <span class="text-primary">Vpp:</span> Vmax - Vmin
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Signal Controls</h3>

              <!-- Waveform Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Waveform Type
                </label>
                <select v-model="waveformType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="sine">Sine Wave</option>
                  <option value="square">Square Wave</option>
                  <option value="triangle">Triangle Wave</option>
                  <option value="sawtooth">Sawtooth Wave</option>
                </select>
              </div>

              <!-- Amplitude -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amplitude (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input v-model.number="amplitude" type="number" step="0.5" min="0.5" max="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input v-model.number="amplitude" type="range" min="0.5" max="10" step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary" />
              </div>

              <!-- Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency (Hz)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input v-model.number="frequency" type="number" step="0.5" min="0.5" max="20"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Hz</span>
                </div>
                <input v-model.number="frequency" type="range" min="0.5" max="20" step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary" />
              </div>

              <!-- Timebase -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timebase (ms/div)
                </label>
                <select v-model="timebase" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option :value="5">5 ms/div</option>
                  <option :value="10">10 ms/div</option>
                  <option :value="20">20 ms/div</option>
                  <option :value="50">50 ms/div</option>
                  <option :value="100">100 ms/div</option>
                </select>
              </div>

              <!-- Volts/Div -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Volts/Div
                </label>
                <select v-model="voltsPerDiv" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option :value="0.5">0.5 V/div</option>
                  <option :value="1">1 V/div</option>
                  <option :value="2">2 V/div</option>
                  <option :value="5">5 V/div</option>
                </select>
              </div>

              <!-- DC Offset -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  DC Offset (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input v-model.number="dcOffset" type="number" step="0.5" min="-5" max="5"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input v-model.number="dcOffset" type="range" min="-5" max="5" step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary" />
              </div>

              <!-- Trigger Level -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trigger Level (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input v-model.number="triggerLevel" type="number" step="0.5" min="-5" max="5"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input v-model.number="triggerLevel" type="range" min="-5" max="5" step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary" />
              </div>

              <!-- Auto/Normal Trigger -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trigger Mode
                </label>
                <div class="flex gap-2">
                  <button @click="triggerMode = 'auto'"
                    :class="triggerMode === 'auto' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors">
                    Auto
                  </button>
                  <button @click="triggerMode = 'normal'"
                    :class="triggerMode === 'normal' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors">
                    Normal
                  </button>
                </div>
              </div>

              <!-- Freeze/Run -->
              <button @click="isRunning = !isRunning"
                :class="isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                class="w-full px-6 py-3 text-white font-bold rounded-lg transition-colors mb-4">
                {{ isRunning ? '⏸ Freeze' : '▶ Run' }}
              </button>
            </div>
          </div>

          <!-- Display Panel -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Oscilloscope Display</h3>

              <!-- Oscilloscope Screen -->
              <div class="relative bg-gradient-to-br from-green-900 to-green-950 rounded-lg overflow-hidden" style="height: 400px;">
                <!-- Grid Overlay -->
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                  <!-- Vertical Grid Lines (10 divisions) -->
                  <line v-for="i in 11" :key="'v' + i" 
                    :x1="(i - 1) * 80" y1="0" :x2="(i - 1) * 80" y2="400" 
                    stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                  <!-- Horizontal Grid Lines (8 divisions) -->
                  <line v-for="i in 9" :key="'h' + i"
                    x1="0" :y1="(i - 1) * 50" x2="800" :y2="(i - 1) * 50"
                    stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                  <!-- Center Lines -->
                  <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-dasharray="5,5" />
                  <line x1="400" y1="0" x2="400" y2="400" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-dasharray="5,5" />
                </svg>

                <!-- Waveform Display -->
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                  <defs>
                    <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:0.6" />
                      <stop offset="50%" style="stop-color:#22c55e;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#22c55e;stop-opacity:0.6" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Waveform Path -->
                  <path :d="waveformPath" 
                    fill="none" 
                    stroke="url(#waveformGradient)" 
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />

                  <!-- Trigger Level Indicator -->
                  <line x1="0" :y1="triggerY" x2="800" :y2="triggerY" 
                    stroke="rgba(239, 68, 68, 0.6)" stroke-width="1" stroke-dasharray="5,5" />
                  <text x="5" :y="triggerY - 5" fill="rgba(239, 68, 68, 0.8)" font-size="12" font-weight="bold">
                    T: {{ triggerLevel.toFixed(1) }}V
                  </text>
                </svg>

                <!-- Screen Info Overlay -->
                <div class="absolute top-3 left-3 bg-black/50 text-green-400 px-3 py-1 rounded font-mono text-sm">
                  <div>{{ timebase }} ms/div | {{ voltsPerDiv }} V/div</div>
                  <div>{{ triggerMode.toUpperCase() }} Trigger</div>
                </div>

                <!-- Measurement Info -->
                <div class="absolute top-3 right-3 bg-black/50 text-green-400 px-3 py-1 rounded font-mono text-sm text-right">
                  <div>Vpp: {{ measuredVpp.toFixed(2) }} V</div>
                  <div>Freq: {{ measuredFrequency.toFixed(2) }} Hz</div>
                  <div>Period: {{ measuredPeriod.toFixed(2) }} ms</div>
                </div>
              </div>
            </div>

            <!-- Measurements Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Measurements</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak-to-Peak Voltage</div>
                  <div class="text-2xl font-bold text-primary">{{ measuredVpp.toFixed(2) }} <span class="text-lg">V</span></div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Vmax - Vmin</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Frequency</div>
                  <div class="text-2xl font-bold text-primary">{{ measuredFrequency.toFixed(2) }} <span class="text-lg">Hz</span></div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">f = 1/T</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Period</div>
                  <div class="text-2xl font-bold text-primary">{{ measuredPeriod.toFixed(2) }} <span class="text-lg">ms</span></div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">T = 1/f</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">DC Offset</div>
                  <div class="text-2xl font-bold text-primary">{{ dcOffset.toFixed(2) }} <span class="text-lg">V</span></div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">From zero</div>
                </div>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 How to Read an Oscilloscope</h3>
              
              <div class="space-y-4">
                <div class="border-l-4 border-primary pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Understanding the Display</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    The oscilloscope displays voltage on the vertical axis (Y) and time on the horizontal axis (X). 
                    The grid is divided into divisions - count them to measure signal characteristics.
                  </p>
                </div>

                <div class="border-l-4 border-primary pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Measuring Voltage</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>Peak-to-Peak (Vpp):</strong> Count vertical divisions from lowest to highest point, then multiply by Volts/Div.<br>
                    <strong>Amplitude:</strong> Vpp / 2 for symmetric waves centered at zero.<br>
                    <strong>RMS Voltage:</strong> For sine waves, Vrms = Vpp / (2√2) ≈ Vpp / 2.828
                  </p>
                </div>

                <div class="border-l-4 border-primary pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Measuring Time & Frequency</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>Period (T):</strong> Count horizontal divisions for one complete cycle, then multiply by Time/Div.<br>
                    <strong>Frequency (f):</strong> f = 1/T, where T is in seconds.<br>
                    Example: If T = 10ms (0.01s), then f = 1/0.01 = 100 Hz
                  </p>
                </div>

                <div class="border-l-4 border-primary pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Triggering</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>Trigger Level:</strong> The voltage level at which the oscilloscope starts drawing the waveform.<br>
                    <strong>Auto Mode:</strong> Continuously updates the display, good for stable signals.<br>
                    <strong>Normal Mode:</strong> Only updates when trigger condition is met, good for capturing intermittent signals.
                  </p>
                </div>

                <div class="border-l-4 border-primary pl-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Common Waveforms</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>Sine Wave:</strong> Pure AC signal, smooth oscillation. Used in audio, power systems.<br>
                    <strong>Square Wave:</strong> Instant transitions between two levels. Used in digital electronics.<br>
                    <strong>Triangle Wave:</strong> Linear rise and fall. Used in function generators, PWM.<br>
                    <strong>Sawtooth Wave:</strong> Linear rise, sharp fall. Used in sweep circuits, music synthesis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Signal parameters
const waveformType = ref('sine')
const amplitude = ref(2) // Volts
const frequency = ref(2) // Hz
const timebase = ref(20) // ms/div
const voltsPerDiv = ref(1) // V/div
const dcOffset = ref(0) // Volts
const triggerLevel = ref(0) // Volts
const triggerMode = ref('auto')
const isRunning = ref(true)

// Animation
let animationId = null
const time = ref(0)

// Computed measurements
const measuredVpp = computed(() => amplitude.value * 2)
const measuredFrequency = computed(() => frequency.value)
const measuredPeriod = computed(() => (1 / frequency.value) * 1000) // Convert to ms

// Trigger level Y position (in SVG coordinates)
const triggerY = computed(() => {
  const voltsTotal = voltsPerDiv.value * 8 // 8 divisions vertical
  const yPerVolt = 400 / voltsTotal
  const zeroY = 200 // Center of screen
  return zeroY - (triggerLevel.value * yPerVolt)
})

// Generate waveform path
const waveformPath = computed(() => {
  if (!isRunning.value && time.value === 0) return ''
  
  const width = 800
  const height = 400
  const centerY = height / 2
  const centerX = width / 2
  
  // Volts per division to pixels
  const vScale = (height / 8) / voltsPerDiv.value // 8 divisions vertical
  // Timebase to pixels
  const hScale = width / 10 // 10 divisions horizontal
  
  let path = ''
  const startPhase = time.value * frequency.value * 2 * Math.PI
  
  for (let x = 0; x <= width; x += 2) {
    // Convert x position to time offset from center
    const timeOffset = ((x - centerX) / hScale) * (timebase.value / 1000) // Convert to seconds
    
    // Calculate phase for this x position
    const phase = startPhase + (timeOffset * frequency.value * 2 * Math.PI)
    
    // Calculate voltage based on waveform type
    let voltage = 0
    switch (waveformType.value) {
      case 'sine':
        voltage = amplitude.value * Math.sin(phase)
        break
      case 'square':
        voltage = amplitude.value * (Math.sin(phase) >= 0 ? 1 : -1)
        break
      case 'triangle':
        voltage = amplitude.value * (2 / Math.PI) * Math.asin(Math.sin(phase))
        break
      case 'sawtooth':
        voltage = amplitude.value * (2 * (phase / (2 * Math.PI) - Math.floor(0.5 + phase / (2 * Math.PI))))
        break
    }
    
    // Add DC offset
    voltage += dcOffset.value
    
    // Convert voltage to Y position (inverted because SVG Y increases downward)
    const y = centerY - (voltage * vScale)
    
    if (x === 0) {
      path += `M ${x} ${y}`
    } else {
      path += ` L ${x} ${y}`
    }
  }
  
  return path
})

// Animation loop
const animate = () => {
  if (isRunning.value) {
    const now = Date.now() / 1000
    time.value = now
  }
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

// SEO
useHead({
  title: 'Oscilloscope Basics - Learn to Read Waveforms',
  meta: [
    { name: 'description', content: 'Interactive oscilloscope simulation. Learn to read waveforms, measure voltage, frequency, and period. Practice with sine, square, triangle, and sawtooth waves.' }
  ]
})
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
  appearance: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

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

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}
</style>

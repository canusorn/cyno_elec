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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🎵 RLC Circuit Resonance
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how resistance, inductance, and capacitance interact at resonant frequency
          </p>
          
          <!-- Resonance Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">f₀</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">1</span>
              <span class="text-gray-400">/</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary">2π</span>
              <span class="text-gray-400">√</span>
              <span class="text-primary">LC</span>
              <span class="text-gray-400">)</span>
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
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Resistance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="resistance"
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="1"
                  max="500"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Inductance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inductance (L)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inductance"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mH</span>
                </div>
                <input 
                  v-model.number="inductance"
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Capacitance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitance (C)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="capacitance"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">µF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peak Voltage (V₀)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="voltage"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="voltage"
                  type="range"
                  min="1"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Frequency Sweep -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency Range
                </label>
                <div class="flex items-center gap-2 text-sm">
                  <span class="text-gray-500 dark:text-gray-400">10 Hz</span>
                  <div class="flex-1 text-center text-primary font-semibold">
                    {{ resonantFreq.toFixed(1) }} Hz
                  </div>
                  <span class="text-gray-500 dark:text-gray-400">1000 Hz</span>
                </div>
                <div class="mt-2 h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full relative">
                  <div 
                    class="absolute w-3 h-3 bg-white border-2 border-gray-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2"
                    :style="{ left: ((resonantFreq - 10) / 990 * 100) + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3">
                <button 
                  @click="isRunning = !isRunning"
                  class="w-full px-4 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="!isRunning" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
                  </svg>
                  {{ isRunning ? 'Pause' : 'Start Simulation' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Resonance Curve -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequency Response Curve</h3>
              <div class="relative">
                <svg viewBox="0 0 600 300" class="w-full">
                  <!-- Background grid -->
                  <defs>
                    <pattern id="gridRLC" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                    </pattern>
                  </defs>
                  <rect width="600" height="300" fill="url(#gridRLC)" />
                  
                  <!-- Axes -->
                  <line x1="60" y1="250" x2="580" y2="250" stroke="#4B5563" stroke-width="2"/>
                  <line x1="60" y1="250" x2="60" y2="30" stroke="#4B5563" stroke-width="2"/>
                  
                  <!-- Axis labels -->
                  <text x="320" y="290" text-anchor="middle" class="text-sm fill-gray-600 dark:fill-gray-400">Frequency (Hz)</text>
                  <text x="25" y="140" text-anchor="middle" class="text-sm fill-gray-600 dark:fill-gray-400" transform="rotate(-90, 25, 140)">Current (mA)</text>
                  
                  <!-- X-axis ticks -->
                  <text x="60" y="265" text-anchor="middle" class="text-xs fill-gray-500">10</text>
                  <text x="173" y="265" text-anchor="middle" class="text-xs fill-gray-500">100</text>
                  <text x="286" y="265" text-anchor="middle" class="text-xs fill-gray-500">200</text>
                  <text x="400" y="265" text-anchor="middle" class="text-xs fill-gray-500">400</text>
                  <text x="513" y="265" text-anchor="middle" class="text-xs fill-gray-500">600</text>
                  
                  <!-- Resonance curve -->
                  <path 
                    :d="generateResonanceCurve()" 
                    fill="none" 
                    stroke="#9FA8DA" 
                    stroke-width="3"
                    class="transition-all duration-300"
                  />
                  
                  <!-- Peak marker -->
                  <circle 
                    :cx="getResonanceX()" 
                    :cy="getResonanceY()" 
                    r="6" 
                    fill="#7986CB"
                    class="transition-all duration-300"
                  />
                  <text 
                    :x="getResonanceX()" 
                    :y="getResonanceY() - 15" 
                    text-anchor="middle" 
                    class="text-xs font-bold fill-primary"
                  >
                    f₀ = {{ resonantFreq.toFixed(1) }} Hz
                  </text>
                  
                  <!-- Bandwidth indicators -->
                  <line 
                    v-if="bandwidth > 0"
                    :x1="getFreqX(bandwidthFreqs.lower)" 
                    y1="250" 
                    :x2="getFreqX(bandwidthFreqs.upper)" 
                    y2="250" 
                    stroke="#22C55E" 
                    stroke-width="3"
                    class="transition-all duration-300"
                  />
                  <text 
                    v-if="bandwidth > 0"
                    :x="(getFreqX(bandwidthFreqs.lower) + getFreqX(bandwidthFreqs.upper)) / 2" 
                    y="275" 
                    text-anchor="middle" 
                    class="text-xs font-semibold fill-green-500"
                  >
                    BW = {{ bandwidth.toFixed(1) }} Hz
                  </text>
                  
                  <!-- Current frequency indicator -->
                  <line 
                    v-if="isRunning"
                    :x1="getFreqX(currentFreq)" 
                    y1="250" 
                    :x2="getFreqX(currentFreq)" 
                y2="50" 
                    stroke="#F59E0B" 
                    stroke-width="2" 
                    stroke-dasharray="5,5"
                    class="transition-all duration-100"
                  />
                  <circle 
                    v-if="isRunning"
                    :cx="getFreqX(currentFreq)" 
                    :cy="getCurrentY()" 
                    r="5" 
                    fill="#F59E0B"
                  />
                </svg>
              </div>
            </div>

            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">RLC Circuit Diagram</h3>
              <div class="flex justify-center">
                <svg viewBox="0 0 500 200" class="w-full max-w-lg">
                  <!-- Background -->
                  <rect x="0" y="0" width="500" height="200" fill="transparent"/>
                  
                  <!-- Main circuit loop -->
                  <rect x="50" y="40" width="400" height="120" fill="none" stroke="#94A3B8" stroke-width="3"/>
                  
                  <!-- AC Source (left side) -->
                  <circle cx="50" cy="100" r="25" fill="white" stroke="#3B82F6" stroke-width="2"/>
                  <path d="M 40 100 Q 45 90, 50 100 Q 55 110, 60 100" fill="none" stroke="#3B82F6" stroke-width="2"/>
                  <text x="50" y="70" text-anchor="middle" class="text-xs font-semibold" fill="#3B82F6">AC {{ voltage }}V</text>
                  
                  <!-- Resistor (top) -->
                  <rect x="170" y="35" width="60" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                  <text x="200" y="25" text-anchor="middle" class="text-xs font-semibold" fill="#8B5CF6">R = {{ resistance }}Ω</text>
                  
                  <!-- Inductor (right side) -->
                  <g transform="translate(450, 100)">
                    <path d="M0,-40 Q10,-35 10,-30 Q10,-25 0,-20 Q-10,-15 -10,-10 Q-10,-5 0,0 Q10,5 10,10 Q10,15 0,20 Q-10,25 -10,30 Q-10,35 0,40" 
                          fill="none" stroke="#22C55E" stroke-width="3"/>
                    <text x="-20" y="0" text-anchor="end" class="text-xs font-semibold" fill="#22C55E">L = {{ inductance }}mH</text>
                  </g>
                  
                  <!-- Capacitor (bottom) -->
                  <g transform="translate(250, 160)">
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="#EC4899" stroke-width="4"/>
                    <line x1="10" y1="-15" x2="10" y2="15" stroke="#EC4899" stroke-width="4"/>
                    <text x="5" y="35" text-anchor="middle" class="text-xs font-semibold" fill="#EC4899">C = {{ capacitance }}µF</text>
                  </g>
                  
                  <!-- Current animation -->
                  <g v-if="isRunning">
                    <circle r="5" fill="#F59E0B">
                      <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath href="#circuitPath"/>
                      </animateMotion>
                    </circle>
                  </g>
                  <path id="circuitPath" d="M 50 100 L 50 40 L 450 40 L 450 160 L 250 160 L 50 160 L 50 100" fill="none" stroke="transparent"/>
                </svg>
              </div>
            </div>

            <!-- Real-time Values -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Resonant Freq</div>
                <div class="text-2xl font-bold text-primary">{{ resonantFreq.toFixed(2) }} Hz</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Impedance @ f₀</div>
                <div class="text-2xl font-bold text-green-500">{{ resistance.toFixed(1) }} Ω</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Max Current</div>
                <div class="text-2xl font-bold text-blue-500">{{ maxCurrent.toFixed(2) }} mA</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Q Factor</div>
                <div class="text-2xl font-bold text-purple-500">{{ qFactor.toFixed(2) }}</div>
              </div>
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
            📚 Understanding RLC Resonance
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Resonance?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              At resonant frequency, the inductive reactance (Xₗ) equals capacitive reactance (X꜀), causing them to cancel out. 
              The circuit becomes purely resistive, and current reaches its maximum value.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Resonant Frequency:</strong> f₀ = 1 / (2π√LC)</div>
              <div><strong>Inductive Reactance:</strong> Xₗ = 2πfL</div>
              <div><strong>Capacitive Reactance:</strong> X꜀ = 1 / (2πfC)</div>
              <div><strong>Impedance:</strong> Z = √(R² + (Xₗ - X꜀)²)</div>
              <div><strong>Q Factor:</strong> Q = f₀ / BW</div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Maximum current</strong> flows at resonant frequency</li>
              <li><strong>Impedance is minimum</strong> and equals resistance (Z = R)</li>
              <li><strong>Xₗ = X꜀</strong> at resonance</li>
              <li><strong>Phase angle is zero</strong> - current and voltage are in phase</li>
              <li><strong>Q factor</strong> determines selectivity - higher Q means sharper resonance</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Radio tuning circuits</li>
              <li>Bandpass/Notch filters</li>
              <li>Wireless communication systems</li>
              <li>Impedance matching networks</li>
              <li>Oscillator circuits</li>
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
  title: 'RLC Circuit Resonance - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive RLC circuit resonance simulator. Explore how RLC circuits behave at resonant frequency with real-time visualization.' },
    { name: 'keywords', content: 'RLC circuit, resonance, frequency response, impedance, Q factor' }
  ]
})

const colorMode = useColorMode()

// Circuit parameters
const resistance = ref(100)
const inductance = ref(10)  // mH
const capacitance = ref(10)  // µF
const voltage = ref(10)
const isRunning = ref(false)

// Animation state
const currentFreq = ref(10)
const animationId = ref<number | null>(null)

// Calculated values
const resonantFreq = computed(() => {
  const L = inductance.value * 1e-3  // Convert to H
  const C = capacitance.value * 1e-6  // Convert to F
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

const maxCurrent = computed(() => {
  return (voltage.value / resistance.value) * 1000  // mA
})

const qFactor = computed(() => {
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const w0 = 1 / Math.sqrt(L * C)
  return (w0 * L) / resistance.value
})

const bandwidth = computed(() => {
  return resonantFreq.value / qFactor.value
})

const bandwidthFreqs = computed(() => ({
  lower: resonantFreq.value - bandwidth.value / 2,
  upper: resonantFreq.value + bandwidth.value / 2
}))

// Frequency sweep animation
const animateFreq = () => {
  if (!isRunning.value) return
  
  currentFreq.value += 2
  if (currentFreq.value > 600) {
    currentFreq.value = 10
  }
  
  animationId.value = requestAnimationFrame(animateFreq)
}

watch(isRunning, (running) => {
  if (running) {
    animateFreq()
  } else if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// Helper functions for graph
const getFreqX = (freq: number) => {
  return 60 + ((freq - 10) / 590) * 520
}

const getCurrentAtFreq = (freq: number) => {
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const omega = 2 * Math.PI * freq
  const XL = omega * L
  const XC = 1 / (omega * C)
  const Z = Math.sqrt(resistance.value ** 2 + (XL - XC) ** 2)
  return (voltage.value / Z) * 1000  // mA
}

const getCurrentY = () => {
  const current = getCurrentAtFreq(currentFreq.value)
  const maxI = maxCurrent.value
  const normalized = current / maxI
  return 250 - (normalized * 200)
}

const getResonanceX = () => {
  return getFreqX(resonantFreq.value)
}

const getResonanceY = () => {
  return 50  // Peak position
}

const generateResonanceCurve = () => {
  const points: [number, number][] = []
  const maxI = maxCurrent.value
  
  for (let freq = 10; freq <= 600; freq += 5) {
    const current = getCurrentAtFreq(freq)
    const normalized = current / maxI
    const x = getFreqX(freq)
    const y = 250 - (normalized * 200)
    points.push([x, y])
  }
  
  if (points.length === 0) return ''
  
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  return path
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-dark {
  color: var(--tw-color-primary-dark) !important;
}

.text-primary-light {
  color: var(--tw-color-primary-light) !important;
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

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--tw-color-primary);
  cursor: pointer;
  border-radius: 50%;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--tw-color-primary);
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

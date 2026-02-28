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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            〰️ AC Circuit Analysis
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore alternating current circuits with real-time waveform visualization and impedance analysis
          </p>
          
          <!-- Impedance Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">Z</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">√(</span>
              <span class="text-primary">R²</span>
              <span class="text-gray-400">+</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary">Xₗ</span>
              <span class="text-gray-400">−</span>
              <span class="text-primary">X꜀</span>
              <span class="text-gray-400">)²</span>
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
              
              <!-- Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Peak Voltage (Vₚ)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="voltage" 
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="voltage"
                  type="range"
                  min="1"
                  max="240"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Frequency Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency (f)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="frequency" 
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Hz</span>
                </div>
                <input 
                  v-model.number="frequency"
                  type="range"
                  min="1"
                  max="1000"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Resistance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="resistance" 
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
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
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mH</span>
                </div>
                <input 
                  v-model.number="inductance"
                  type="range"
                  min="0"
                  max="500"
                  step="1"
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
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setPreset('resistive')"
                    class="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Resistive
                  </button>
                  <button 
                    @click="setPreset('inductive')"
                    class="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Inductive
                  </button>
                  <button 
                    @click="setPreset('capacitive')"
                    class="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Capacitive
                  </button>
                  <button 
                    @click="setPreset('resonance')"
                    class="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:text-primary-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Resonance
                  </button>
                </div>
              </div>

              <!-- Animation Speed -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Animation Speed
                </label>
                <input 
                  v-model.number="animationSpeed"
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="text-center text-sm text-gray-500 dark:text-gray-400">
                  {{ animationSpeed.toFixed(1) }}x
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Calculations Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Analysis</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Reactance (Xₗ)</div>
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {{ inductiveReactance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Reactance (X꜀)</div>
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                    {{ capacitiveReactance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Impedance (Z)</div>
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {{ impedance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Resonance (f₀)</div>
                  <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {{ resonanceFreq.toFixed(2) }} Hz
                  </div>
                </div>
              </div>
              
              <!-- Phase Angle -->
              <div class="mt-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Phase Angle (φ)</div>
                    <div class="text-3xl font-bold text-pink-600 dark:text-pink-400">
                      {{ phaseAngle.toFixed(2) }}°
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Current (Iₚ)</div>
                    <div class="text-3xl font-bold text-primary">
                      {{ peakCurrent.toFixed(3) }} A
                    </div>
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Circuit Type: <span class="font-semibold" :class="circuitTypeClass">{{ circuitType }}</span>
                </div>
              </div>
            </div>

            <!-- Waveform Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Waveform Visualization</h3>
              <div class="relative" style="height: 350px;">
                <canvas ref="waveformCanvas" class="w-full h-full"></canvas>
              </div>
              <div class="flex justify-center gap-6 mt-4">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-blue-500 rounded"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Voltage (V)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-red-500 rounded"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Current (I)</span>
                </div>
              </div>
            </div>

            <!-- Phasor Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Phasor Diagram</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="relative flex items-center justify-center" style="min-height: 300px;">
                  <canvas ref="phasorCanvas" width="300" height="300" class="max-w-full"></canvas>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Voltage (V) - Reference</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Current (I) - {{ phaseAngle > 0 ? 'Lagging' : phaseAngle < 0 ? 'Leading' : 'In Phase' }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span class="text-sm text-gray-700 dark:text-gray-300">Impedance (Z)</span>
                  </div>
                  <hr class="border-gray-300 dark:border-gray-600">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <div>• Voltage is always at 0° (reference)</div>
                    <div>• Current {{ phaseAngle > 0 ? 'lags voltage' : phaseAngle < 0 ? 'leads voltage' : 'is in phase with voltage' }}</div>
                    <div>• Phase angle: {{ Math.abs(phaseAngle).toFixed(2) }}°</div>
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding AC Circuits</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Concepts</h3>
              <div class="space-y-4">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Impedance (Z)</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">Total opposition to current flow in AC circuits</p>
                  <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-sm">
                    Z = √(R² + (Xₗ - X꜀)²)
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Inductive Reactance (Xₗ)</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">Opposition from inductance, increases with frequency</p>
                  <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-sm">
                    Xₗ = 2πfL
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Capacitive Reactance (X꜀)</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-2">Opposition from capacitance, decreases with frequency</p>
                  <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-sm">
                    X꜀ = 1/(2πfC)
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Phase Relationships</h3>
              <div class="space-y-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Resistive Circuit</h4>
                  <p class="text-blue-700 dark:text-blue-300 text-sm">Voltage and current are IN PHASE (φ = 0°)</p>
                </div>
                
                <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-orange-900 dark:text-orange-300 mb-2">Inductive Circuit</h4>
                  <p class="text-orange-700 dark:text-orange-300 text-sm">Current LAGS voltage (φ > 0°)</p>
                </div>
                
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">Capacitive Circuit</h4>
                  <p class="text-green-700 dark:text-green-300 text-sm">Current LEADS voltage (φ < 0°)</p>
                </div>
                
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">Resonance</h4>
                  <p class="text-purple-700 dark:text-purple-300 text-sm">Xₗ = X꜀, circuit is purely resistive</p>
                  <div class="bg-white dark:bg-gray-800 rounded p-2 font-mono text-sm mt-2">
                    f₀ = 1/(2π√LC)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">💡 Real-World Applications</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>Power distribution systems use AC for efficient long-distance transmission</li>
              <li>Inductive loads (motors, transformers) cause current to lag</li>
              <li>Capacitive loads can correct power factor by offsetting inductive effects</li>
              <li>Tuning circuits use resonance for radio and communication systems</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Circuit parameters
const voltage = ref(120)
const frequency = ref(60)
const resistance = ref(100)
const inductance = ref(50)
const capacitance = ref(50)
const animationSpeed = ref(1)
const animationTime = ref(0)
let animationId = null

// Canvas refs
const waveformCanvas = ref(null)
const phasorCanvas = ref(null)

// Computed values
const inductiveReactance = computed(() => {
  return 2 * Math.PI * frequency.value * (inductance.value / 1000)
})

const capacitiveReactance = computed(() => {
  if (capacitance.value === 0) return Infinity
  return 1 / (2 * Math.PI * frequency.value * (capacitance.value / 1000000))
})

const netReactance = computed(() => {
  const xc = capacitiveReactance.value
  if (xc === Infinity) return inductiveReactance.value
  return inductiveReactance.value - xc
})

const impedance = computed(() => {
  return Math.sqrt(Math.pow(resistance.value, 2) + Math.pow(netReactance.value, 2))
})

const phaseAngle = computed(() => {
  if (impedance.value === 0) return 0
  return (Math.atan2(netReactance.value, resistance.value) * 180 / Math.PI)
})

const peakCurrent = computed(() => {
  if (impedance.value === 0) return 0
  return voltage.value / impedance.value
})

const resonanceFreq = computed(() => {
  if (inductance.value === 0 || capacitance.value === 0) return 0
  return 1 / (2 * Math.PI * Math.sqrt((inductance.value / 1000) * (capacitance.value / 1000000)))
})

const circuitType = computed(() => {
  if (Math.abs(phaseAngle.value) < 1) return 'Resistive'
  if (phaseAngle.value > 0) return 'Inductive'
  return 'Capacitive'
})

const circuitTypeClass = computed(() => {
  if (Math.abs(phaseAngle.value) < 1) return 'text-blue-600 dark:text-blue-400'
  if (phaseAngle.value > 0) return 'text-orange-600 dark:text-orange-400'
  return 'text-green-600 dark:text-green-400'
})

// Presets
const setPreset = (type) => {
  switch (type) {
    case 'resistive':
      resistance.value = 100
      inductance.value = 0
      capacitance.value = 0
      break
    case 'inductive':
      resistance.value = 50
      inductance.value = 100
      capacitance.value = 0
      break
    case 'capacitive':
      resistance.value = 50
      inductance.value = 0
      capacitance.value = 100
      break
    case 'resonance':
      const resFreq = resonanceFreq.value
      if (resFreq > 0) {
        frequency.value = Math.round(resFreq)
      } else {
        resistance.value = 50
        inductance.value = 100
        capacitance.value = 42
        frequency.value = Math.round(1 / (2 * Math.PI * Math.sqrt((100 / 1000) * (42 / 1000000))))
      }
      break
  }
}

// Drawing functions
const drawWaveform = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * window.devicePixelRatio
  canvas.height = rect.height * window.devicePixelRatio
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  
  const width = rect.width
  const height = rect.height
  const centerY = height / 2
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = colorMode.value === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let i = 0; i <= 5; i++) {
    const y = (height / 5) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  // Draw center line
  ctx.strokeStyle = colorMode.value === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()
  
  // Calculate scaling
  const maxVoltage = voltage.value * 1.2
  const maxCurrent = peakCurrent.value * 1.2 || 1
  const voltageScale = (height * 0.35) / maxVoltage
  const currentScale = (height * 0.35) / maxCurrent
  
  // Draw voltage waveform (blue)
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 3
  ctx.beginPath()
  const phaseRad = phaseAngle.value * Math.PI / 180
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI
    const v = voltage.value * Math.sin(t - animationTime.value)
    const y = centerY - v * voltageScale
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  
  // Draw current waveform (red)
  ctx.strokeStyle = '#EF4444'
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI
    const i = peakCurrent.value * Math.sin(t - phaseRad - animationTime.value)
    const y = centerY - i * currentScale
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

const drawPhasor = () => {
  const canvas = phasorCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.35
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Draw circle
  ctx.strokeStyle = colorMode.value === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()
  
  // Draw axes
  ctx.strokeStyle = colorMode.value === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(centerX - radius - 20, centerY)
  ctx.lineTo(centerX + radius + 20, centerY)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - radius - 20)
  ctx.lineTo(centerX, centerY + radius + 20)
  ctx.stroke()
  
  // Draw voltage phasor (reference, at 0°)
  const vLength = radius * 0.8
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(centerX + vLength, centerY)
  ctx.stroke()
  
  // Voltage arrow
  ctx.fillStyle = '#3B82F6'
  ctx.beginPath()
  ctx.moveTo(centerX + vLength + 10, centerY)
  ctx.lineTo(centerX + vLength - 5, centerY - 5)
  ctx.lineTo(centerX + vLength - 5, centerY + 5)
  ctx.closePath()
  ctx.fill()
  
  // Draw current phasor (with phase shift)
  const phaseRad = phaseAngle.value * Math.PI / 180
  const iLength = radius * (peakCurrent.value / (voltage.value / (resistance.value || 1))) * 0.8
  const iEndX = centerX + iLength * Math.cos(-phaseRad)
  const iEndY = centerY + iLength * Math.sin(-phaseRad)
  
  ctx.strokeStyle = '#EF4444'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(iEndX, iEndY)
  ctx.stroke()
  
  // Current arrow
  ctx.fillStyle = '#EF4444'
  const arrowAngle = -phaseRad
  ctx.beginPath()
  ctx.moveTo(iEndX + 10 * Math.cos(arrowAngle), iEndY + 10 * Math.sin(arrowAngle))
  ctx.lineTo(iEndX - 5 * Math.cos(arrowAngle - 0.3), iEndY - 5 * Math.sin(arrowAngle - 0.3))
  ctx.lineTo(iEndX - 5 * Math.cos(arrowAngle + 0.3), iEndY - 5 * Math.sin(arrowAngle + 0.3))
  ctx.closePath()
  ctx.fill()
  
  // Draw phase angle arc
  if (Math.abs(phaseAngle.value) > 1) {
    ctx.strokeStyle = colorMode.value === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    const arcRadius = 30
    if (phaseAngle.value > 0) {
      ctx.arc(centerX, centerY, arcRadius, 0, -phaseRad, true)
    } else {
      ctx.arc(centerX, centerY, arcRadius, -phaseRad, 0, true)
    }
    ctx.stroke()
    ctx.setLineDash([])
  }
  
  // Labels
  ctx.fillStyle = colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
  ctx.font = 'bold 14px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('V', centerX + vLength + 25, centerY + 5)
  ctx.fillText('I', iEndX + 20, iEndY - 10)
  ctx.fillText('0°', centerX + radius + 25, centerY + 20)
  ctx.fillText('90°', centerX, centerY - radius - 15)
}

const animate = () => {
  animationTime.value += 0.05 * animationSpeed.value
  drawWaveform()
  drawPhasor()
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

// Watch for color mode changes
watch(colorMode, () => {
  drawWaveform()
  drawPhasor()
})
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

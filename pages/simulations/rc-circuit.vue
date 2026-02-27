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
            ⏱️ RC Circuit Time Constant
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore capacitor charging and discharging behavior with interactive time constant visualization
          </p>
          
          <!-- Time Constant Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">τ</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">R</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary">C</span>
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
                  Supply Voltage (V)
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

              <!-- Resistance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="resistance"
                    type="number" 
                    step="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">kΩ</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="1"
                  max="100"
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
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">µF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3">
                <button 
                  @click="startCharging"
                  :disabled="isCharging || isDischarging"
                  class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Charging
                </button>
                <button 
                  @click="startDischarging"
                  :disabled="isCharging || isDischarging"
                  class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Start Discharging
                </button>
                <button 
                  @click="resetSimulation"
                  class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>

              <!-- Time Constant Display -->
              <div class="mt-6 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Time Constant (τ)</h4>
                <div class="text-3xl font-bold text-primary mb-1">
                  {{ timeConstant.toFixed(2) }}s
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  5τ = {{ (5 * timeConstant).toFixed(2) }}s (full charge)
                </p>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Circuit Diagram
              </h3>
              <svg viewBox="0 0 600 250" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="rcgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                  </pattern>
                </defs>
                <rect width="600" height="250" fill="url(#rcgrid)" />
                
                <!-- Wires -->
                <path d="M 100 125 L 200 125" :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
                <path d="M 200 125 L 200 80 L 400 80 L 400 125" :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
                <path d="M 400 125 L 500 125" :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
                <path d="M 500 125 L 500 200 L 100 200 L 100 125" :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
                
                <!-- Voltage Source -->
                <circle cx="100" cy="125" r="35" fill="white" :stroke="voltageColor" stroke-width="3" class="transition-all duration-300"/>
                <text x="100" y="120" text-anchor="middle" font-size="16" font-weight="bold" :fill="voltageColor">{{ voltage }}V</text>
                <text x="100" y="138" text-anchor="middle" font-size="12" fill="#666">DC</text>
                <text x="75" y="105" font-size="14" fill="#22c55e" font-weight="bold">+</text>
                <text x="75" y="150" font-size="14" fill="#ef4444" font-weight="bold">−</text>
                
                <!-- Resistor -->
                <g transform="translate(200, 80)">
                  <rect x="0" y="-15" width="100" height="30" fill="white" :stroke="resistorColor" stroke-width="3" :rx="5" class="transition-all duration-300"/>
                  <!-- Zigzag pattern -->
                  <polyline points="5,0 15,-10 25,10 35,-10 45,10 55,-10 65,10 75,-10 85,10 95,0" 
                    fill="none" :stroke="resistorColor" stroke-width="2" class="transition-all duration-300"/>
                  <text x="50" y="30" text-anchor="middle" font-size="12" font-weight="bold" :fill="resistorColor">
                    {{ resistance }}kΩ
                  </text>
                </g>
                
                <!-- Capacitor -->
                <g transform="translate(500, 125)">
                  <line x1="-30" y1="-25" x2="-30" y2="25" :stroke="capacitorColor" stroke-width="3" class="transition-all duration-300"/>
                  <line x1="30" y1="-25" x2="30" y2="25" :stroke="capacitorColor" stroke-width="3" class="transition-all duration-300"/>
                  <text x="0" y="-35" text-anchor="middle" font-size="12" font-weight="bold" :fill="capacitorColor">
                    {{ capacitance }}µF
                  </text>
                  <text x="0" y="50" text-anchor="middle" font-size="14" font-weight="bold" :fill="voltageCapColor">
                    {{ capacitorVoltage.toFixed(2) }}V
                  </text>
                </g>
                
                <!-- Current Flow Animation -->
                <g v-if="currentFlow > 0">
                  <circle r="5" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion :dur="animationSpeed" repeatCount="indefinite">
                      <mpath href="#currentPathRC"/>
                    </animateMotion>
                  </circle>
                  <circle r="5" fill="#fbbf24" filter="url(#glow)">
                    <animateMotion :dur="animationSpeed" repeatCount="indefinite" begin="0.3s">
                      <mpath href="#currentPathRC"/>
                    </animateMotion>
                  </circle>
                </g>
                
                <path id="currentPathRC" d="M 100 125 L 200 125 L 200 80 L 400 80 L 400 125 L 500 125 L 500 200 L 100 200 L 100 125" 
                  fill="none" stroke="none"/>
                
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <!-- Current Arrow -->
                <g v-if="currentFlow > 0">
                  <polygon :points="arrowPoints" fill="#fbbf24"/>
                  <text x="300" y="220" text-anchor="middle" font-size="14" font-weight="bold" fill="#fbbf24">
                    I = {{ currentFlow.toFixed(4) }}mA
                  </text>
                </g>
              </svg>
            </div>

            <!-- Voltage vs Time Graph -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Capacitor Voltage vs Time
              </h3>
              <svg viewBox="0 0 600 300" class="w-full h-auto">
                <!-- Grid lines -->
                <g stroke="#e5e7eb" stroke-width="1">
                  <line x1="60" y1="50" x2="60" y2="250"/>
                  <line x1="60" y1="250" x2="560" y2="250"/>
                  <!-- Horizontal grid lines -->
                  <line x1="60" y1="50" x2="560" y2="50" stroke-dasharray="5,5"/>
                  <line x1="60" y1="100" x2="560" y2="100" stroke-dasharray="5,5"/>
                  <line x1="60" y1="150" x2="560" y2="150" stroke-dasharray="5,5"/>
                  <line x1="60" y1="200" x2="560" y2="200" stroke-dasharray="5,5"/>
                  <!-- Vertical grid lines -->
                  <line x1="160" y1="50" x2="160" y2="250" stroke-dasharray="5,5"/>
                  <line x1="260" y1="50" x2="260" y2="250" stroke-dasharray="5,5"/>
                  <line x1="360" y1="50" x2="360" y2="250" stroke-dasharray="5,5"/>
                  <line x1="460" y1="50" x2="460" y2="250" stroke-dasharray="5,5"/>
                </g>
                
                <!-- Axis labels -->
                <text x="310" y="280" text-anchor="middle" font-size="14" fill="#666">Time (s)</text>
                <text x="25" y="150" text-anchor="middle" font-size="14" fill="#666" transform="rotate(-90, 25, 150)">Voltage (V)</text>
                
                <!-- Y-axis labels -->
                <text x="50" y="255" text-anchor="end" font-size="12" fill="#666">0</text>
                <text x="50" y="205" text-anchor="end" font-size="12" fill="#666">{{ (voltage * 0.25).toFixed(1) }}</text>
                <text x="50" y="155" text-anchor="end" font-size="12" fill="#666">{{ (voltage * 0.5).toFixed(1) }}</text>
                <text x="50" y="105" text-anchor="end" font-size="12" fill="#666">{{ (voltage * 0.75).toFixed(1) }}</text>
                <text x="50" y="55" text-anchor="end" font-size="12" fill="#666">{{ voltage.toFixed(1) }}</text>
                
                <!-- X-axis labels (time constants) -->
                <text x="60" y="270" text-anchor="middle" font-size="12" fill="#666">0</text>
                <text x="160" y="270" text-anchor="middle" font-size="12" fill="#666">τ</text>
                <text x="260" y="270" text-anchor="middle" font-size="12" fill="#666">2τ</text>
                <text x="360" y="270" text-anchor="middle" font-size="12" fill="#666">3τ</text>
                <text x="460" y="270" text-anchor="middle" font-size="12" fill="#666">4τ</text>
                <text x="560" y="270" text-anchor="middle" font-size="12" fill="#666">5τ</text>
                
                <!-- Charging curve (theoretical) -->
                <path 
                  :d="chargingCurvePath"
                  fill="none" 
                  stroke="#9FA8DA" 
                  stroke-width="3"
                  stroke-dasharray="5,5"
                />
                
                <!-- Discharging curve (theoretical) -->
                <path 
                  v-if="dischargeCurvePath"
                  :d="dischargeCurvePath"
                  fill="none" 
                  stroke="#F87171" 
                  stroke-width="3"
                  stroke-dasharray="5,5"
                />
                
                <!-- Actual data points -->
                <polyline 
                  :points="dataPoints"
                  fill="none" 
                  :stroke="isCharging ? '#22C55E' : '#EF4444'" 
                  stroke-width="3"
                />
                
                <!-- Current voltage indicator -->
                <line 
                  x1="60" 
                  :y1="currentYPos" 
                  x2="560" 
                  :y2="currentYPos" 
                  stroke="#fbbf24" 
                  stroke-width="2" 
                  stroke-dasharray="10,5"
                />
                <circle :cx="currentXPos" :cy="currentYPos" r="6" fill="#fbbf24" stroke="white" stroke-width="2"/>
                
                <!-- Legend -->
                <g transform="translate(420, 30)">
                  <line x1="0" y1="0" x2="30" y2="0" stroke="#22C55E" stroke-width="3"/>
                  <text x="35" y="4" font-size="11" fill="#666">Charging</text>
                  <line x1="0" y1="20" x2="30" y2="20" stroke="#EF4444" stroke-width="3"/>
                  <text x="35" y="24" font-size="11" fill="#666">Discharging</text>
                  <line x1="0" y1="40" x2="30" y2="40" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5,3"/>
                  <text x="35" y="44" font-size="11" fill="#666">Current</text>
                </g>
              </svg>
            </div>

            <!-- Current Status -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Status</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Capacitor Voltage</p>
                  <p class="text-2xl font-bold text-primary">{{ capacitorVoltage.toFixed(2) }}V</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Current</p>
                  <p class="text-2xl font-bold text-orange-500">{{ currentFlow.toFixed(4) }}mA</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Elapsed</p>
                  <p class="text-2xl font-bold text-blue-500">{{ timeElapsed.toFixed(2) }}s</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Charge %</p>
                  <p class="text-2xl font-bold text-green-500">{{ chargePercentage }}%</p>
                </div>
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
            📚 Understanding RC Time Constant
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Time Constant?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The time constant (τ, tau) of an RC circuit is the time it takes for the capacitor to charge to approximately 63.2% of the supply voltage, or discharge to 36.8% of its initial voltage.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>Time Constant:</strong> τ = R × C</p>
              <p><strong>Charging:</strong> V(t) = Vs × (1 - e^(-t/τ))</p>
              <p><strong>Discharging:</strong> V(t) = V0 × e^(-t/τ)</p>
              <p><strong>Current:</strong> I(t) = (Vs/R) × e^(-t/τ)</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Time Points:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>1τ:</strong> 63.2% charged (or 36.8% discharged)</li>
              <li><strong>2τ:</strong> 86.5% charged (or 13.5% discharged)</li>
              <li><strong>3τ:</strong> 95.0% charged (or 5.0% discharged)</li>
              <li><strong>5τ:</strong> 99.3% charged (considered fully charged)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Filters in audio and radio circuits</li>
              <li>Timing circuits and delay generators</li>
              <li>Debouncing switches</li>
              <li>Power supply smoothing</li>
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
import { ref, computed, watch, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'RC Circuit Time Constant Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive RC circuit time constant simulator. Visualize capacitor charging and discharging with real-time graphs.' },
    { name: 'keywords', content: 'RC circuit, time constant, capacitor charging, circuit simulation, electrical engineering' }
  ]
})

const colorMode = useColorMode()

// Circuit parameters
const voltage = ref(10)
const resistance = ref(10) // kΩ
const capacitance = ref(100) // µF

// Simulation state
const capacitorVoltage = ref(0)
const isCharging = ref(false)
const isDischarging = ref(false)
const timeElapsed = ref(0)
const dataHistory = ref<Array<{time: number, voltage: number}>>([])

let animationFrame: number | null = null
let startTime: number = 0
let initialVoltage = 0

// Computed: Time constant (τ = R × C)
const timeConstant = computed(() => {
  return (resistance.value * 1000) * (capacitance.value * 0.000001) // Convert to seconds
})

// Computed: Current flow
const currentFlow = computed(() => {
  if (!isCharging.value && !isDischarging.value) return 0
  if (timeConstant.value === 0) return 0
  
  const r = resistance.value * 1000 // Convert kΩ to Ω
  if (isCharging.value) {
    return ((voltage.value - capacitorVoltage.value) / r) * 1000 // mA
  } else {
    return (capacitorVoltage.value / r) * 1000 // mA
  }
})

// Computed: Charge percentage
const chargePercentage = computed(() => {
  return Math.round((capacitorVoltage.value / voltage.value) * 100)
})

// Computed: Charging curve path (theoretical)
const chargingCurvePath = computed(() => {
  const points = []
  for (let i = 0; i <= 500; i += 10) {
    const x = 60 + i
    const t = (i / 100) * timeConstant.value * 5 // Map to 5τ
    const v = voltage.value * (1 - Math.exp(-t / timeConstant.value))
    const y = 250 - (v / voltage.value) * 200
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Computed: Discharging curve path (theoretical)
const dischargeCurvePath = computed(() => {
  if (initialVoltage === 0) return ''
  const points = []
  for (let i = 0; i <= 500; i += 10) {
    const x = 60 + i
    const t = (i / 100) * timeConstant.value * 5
    const v = initialVoltage * Math.exp(-t / timeConstant.value)
    const y = 250 - (v / voltage.value) * 200
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Computed: Data points for actual simulation
const dataPoints = computed(() => {
  return dataHistory.value.map((point, index) => {
    const x = 60 + (point.time / (timeConstant.value * 5)) * 500
    const y = 250 - (point.voltage / voltage.value) * 200
    return `${x},${y}`
  }).join(' ')
})

// Computed: Current position on graph
const currentXPos = computed(() => {
  if (dataHistory.value.length === 0) return 60
  const latestPoint = dataHistory.value[dataHistory.value.length - 1]
  return 60 + (latestPoint.time / (timeConstant.value * 5)) * 500
})

const currentYPos = computed(() => {
  return 250 - (capacitorVoltage.value / voltage.value) * 200
})

// Computed: Animation speed
const animationSpeed = computed(() => {
  const current = currentFlow.value
  if (current <= 0) return '0s'
  const speed = Math.max(0.5, Math.min(current, 10))
  return `${4 / speed}s`
})

// Computed: Colors
const wireColor = computed(() => {
  const current = currentFlow.value
  if (current <= 0) return '#94A3B8'
  if (current < 0.1) return '#22C55E'
  if (current < 1) return '#EAB308'
  if (current < 5) return '#F97316'
  return '#EF4444'
})

const voltageColor = computed(() => {
  if (voltage.value < 5) return '#22C55E'
  if (voltage.value < 12) return '#3B82F6'
  return '#EF4444'
})

const resistorColor = computed(() => '#8B5CF6')

const capacitorColor = computed(() => {
  const pct = chargePercentage.value
  if (pct < 25) return '#EF4444'
  if (pct < 50) return '#F97316'
  if (pct < 75) return '#EAB308'
  return '#22C55E'
})

const voltageCapColor = computed(() => {
  const pct = chargePercentage.value
  if (pct < 25) return '#EF4444'
  if (pct < 50) return '#F97316'
  if (pct < 75) return '#EAB308'
  return '#22C55E'
})

const arrowPoints = computed(() => {
  return "280,205 310,205 305,200 320,205 305,210"
})

// Functions
function startCharging() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isCharging.value = true
  isDischarging.value = false
  initialVoltage = capacitorVoltage.value
  startTime = performance.now()
  dataHistory.value = [{ time: 0, voltage: capacitorVoltage.value }]
  
  animate()
}

function startDischarging() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isDischarging.value = true
  isCharging.value = false
  initialVoltage = capacitorVoltage.value
  startTime = performance.now()
  dataHistory.value = [{ time: 0, voltage: capacitorVoltage.value }]
  
  animate()
}

function resetSimulation() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isCharging.value = false
  isDischarging.value = false
  capacitorVoltage.value = 0
  timeElapsed.value = 0
  dataHistory.value = []
  initialVoltage = 0
}

function animate() {
  const currentTime = performance.now()
  const deltaTime = (currentTime - startTime) / 1000 // seconds
  startTime = currentTime
  
  timeElapsed.value += deltaTime
  
  const dt = deltaTime / timeConstant.value
  
  if (isCharging.value) {
    // V(t) = Vs * (1 - e^(-t/τ))
    capacitorVoltage.value = voltage.value * (1 - Math.exp(-timeElapsed.value / timeConstant.value))
  } else if (isDischarging.value) {
    // V(t) = V0 * e^(-t/τ)
    capacitorVoltage.value = initialVoltage * Math.exp(-timeElapsed.value / timeConstant.value)
  }
  
  // Record data point every 50ms
  if (dataHistory.value.length === 0 || 
      timeElapsed.value - dataHistory.value[dataHistory.value.length - 1].time >= 0.05) {
    dataHistory.value.push({ time: timeElapsed.value, voltage: capacitorVoltage.value })
  }
  
  // Stop when fully charged or discharged (5τ)
  if (timeElapsed.value >= timeConstant.value * 5) {
    isCharging.value = false
    isDischarging.value = false
    return
  }
  
  animationFrame = requestAnimationFrame(animate)
}

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}
</style>

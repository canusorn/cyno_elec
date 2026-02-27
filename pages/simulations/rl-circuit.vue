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
            🌀 RL Circuit Transient
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore inductor charging and discharging behavior with interactive time constant visualization
          </p>
          
          <!-- Time Constant Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">τ</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">L</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary">R</span>
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
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="10"
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
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">H</span>
                </div>
                <input 
                  v-model.number="inductance"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3">
                <button 
                  @click="startCharging"
                  :disabled="isCharging || currentProgress < 100"
                  class="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ isCharging ? 'Charging...' : 'Start Charging' }}
                </button>
                
                <button 
                  @click="startDischarging"
                  :disabled="isDischarging || currentProgress > 0"
                  class="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  {{ isDischarging ? 'Discharging...' : 'Start Discharging' }}
                </button>

                <button 
                  @click="resetSimulation"
                  class="w-full px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
              <div class="flex justify-center">
                <svg viewBox="0 0 400 200" class="w-full max-w-lg">
                  <!-- Background -->
                  <rect x="0" y="0" width="400" height="200" fill="transparent"/>
                  
                  <!-- Main circuit loop -->
                  <rect x="50" y="40" width="300" height="120" fill="none" stroke="#94A3B8" stroke-width="3"/>
                  
                  <!-- Voltage source (left side) -->
                  <circle cx="50" cy="100" r="25" fill="white" stroke="#3B82F6" stroke-width="2"/>
                  <text x="50" y="105" text-anchor="middle" class="text-sm font-bold" fill="#3B82F6">{{ voltage }}V</text>
                  <text x="25" y="60" text-anchor="middle" class="text-xs" fill="#3B82F6">+</text>
                  <text x="25" y="145" text-anchor="middle" class="text-xs" fill="#3B82F6">−</text>
                  
                  <!-- Resistor (top) -->
                  <rect x="150" y="35" width="60" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                  <text x="180" y="25" text-anchor="middle" class="text-xs font-semibold" fill="#8B5CF6">R = {{ resistance }}Ω</text>
                  
                  <!-- Inductor (right side) - coil representation -->
                  <g transform="translate(330, 100)">
                    <!-- Inductor coils -->
                    <path d="M0,-40 Q10,-35 10,-30 Q10,-25 0,-20 Q-10,-15 -10,-10 Q-10,-5 0,0 Q10,5 10,10 Q10,15 0,20 Q-10,25 -10,30 Q-10,35 0,40" 
                          fill="none" stroke="#22C55E" stroke-width="3"/>
                    <text x="25" y="0" text-anchor="start" class="text-xs font-semibold" fill="#22C55E">L = {{ inductance }}H</text>
                  </g>
                  
                  <!-- Current arrow (animated when charging) -->
                  <g v-if="isCharging || currentProgress > 0">
                    <polygon :points="getArrowPoints('top')" fill="#F59E0B" opacity="0.8"/>
                    <polygon :points="getArrowPoints('right')" fill="#F59E0B" opacity="0.8"/>
                    <polygon :points="getArrowPoints('bottom')" fill="#F59E0B" opacity="0.8"/>
                    <polygon :points="getArrowPoints('left')" fill="#F59E0B" opacity="0.8"/>
                  </g>
                  
                  <!-- Current label -->
                  <text x="200" y="185" text-anchor="middle" class="text-sm font-bold" fill="#F59E0B">
                    I = {{ currentCurrent.toFixed(3) }} A
                  </text>
                </svg>
              </div>
            </div>

            <!-- Current vs Time Graph -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Current vs Time</h3>
              <div class="relative">
                <svg viewBox="0 0 400 200" class="w-full">
                  <!-- Grid lines -->
                  <line x1="40" y1="20" x2="40" y2="170" stroke="#E5E7EB" stroke-width="1"/>
                  <line x1="40" y1="170" x2="380" y2="170" stroke="#E5E7EB" stroke-width="1"/>
                  
                  <!-- Y-axis labels -->
                  <text x="35" y="25" text-anchor="end" class="text-xs" fill="#6B7280">{{ maxCurrent.toFixed(2) }}A</text>
                  <text x="35" y="97" text-anchor="end" class="text-xs" fill="#6B7280">{{ (maxCurrent / 2).toFixed(2) }}A</text>
                  <text x="35" y="170" text-anchor="end" class="text-xs" fill="#6B7280">0A</text>
                  
                  <!-- X-axis labels (time constants) -->
                  <text x="40" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">0</text>
                  <text x="130" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">τ</text>
                  <text x="220" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">2τ</text>
                  <text x="310" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">3τ</text>
                  <text x="380" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">4τ</text>
                  
                  <!-- Target current line (charging) or zero line (discharging) -->
                  <line 
                    x1="40" 
                    :y1="getGraphY(isCharging || (!isCharging && !isDischarging) ? maxCurrent : 0)" 
                    x2="380" 
                    :y2="getGraphY(isCharging || (!isCharging && !isDischarging) ? maxCurrent : 0)" 
                    :stroke="isCharging || (!isCharging && !isDischarging) ? '#22C55E' : '#EF4444'" 
                    stroke-width="1" 
                    stroke-dasharray="5,5"
                    opacity="0.5"
                  />
                  
                  <!-- Theoretical curve -->
                  <path 
                    :d="getTheoreticalCurve()" 
                    fill="none" 
                    :stroke="isCharging ? '#22C55E' : '#EF4444'" 
                    stroke-width="2"
                    opacity="0.4"
                  />
                  
                  <!-- Actual curve (up to current progress) -->
                  <path 
                    :d="getActualCurve()" 
                    fill="none" 
                    :stroke="isCharging ? '#22C55E' : '#EF4444'" 
                    stroke-width="3"
                  />
                  
                  <!-- Current point indicator -->
                  <circle 
                    :cx="getGraphX(currentTime / timeConstant)" 
                    :cy="getGraphY(currentCurrent)" 
                    r="5" 
                    :fill="isCharging ? '#22C55E' : '#EF4444'"
                  />
                </svg>
              </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⏱️ Time Constant (τ)</h4>
                <div class="text-3xl font-bold text-primary mb-2">
                  {{ timeConstant.toFixed(3) }} s
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Time to reach 63.2% of final current
                </p>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Current</h4>
                <div class="text-3xl font-bold" :class="isCharging ? 'text-green-500' : isDischarging ? 'text-red-500' : 'text-primary'">
                  {{ currentCurrent.toFixed(3) }} A
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ isCharging ? 'Rising toward' : isDischarging ? 'Falling from' : 'Target' }}: {{ maxCurrent.toFixed(3) }} A
                </p>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Progress</h4>
                <div class="text-3xl font-bold text-primary mb-2">
                  {{ currentProgress.toFixed(1) }}%
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    class="h-3 rounded-full transition-all duration-300"
                    :class="isCharging ? 'bg-green-500' : isDischarging ? 'bg-red-500' : 'bg-primary'"
                    :style="{ width: currentProgress + '%' }"
                  ></div>
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⏰ Elapsed Time</h4>
                <div class="text-3xl font-bold text-primary mb-2">
                  {{ currentTime.toFixed(3) }} s
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ (currentTime / timeConstant).toFixed(2) }} τ
                </p>
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
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RL Circuits
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">What is an RL Circuit?</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                An RL circuit consists of a resistor (R) and an inductor (L) connected in series with a voltage source. 
                When voltage is applied, the inductor opposes changes in current, creating a transient response.
              </p>
              
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Time Constant (τ)</h3>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-lg font-mono font-bold text-center">
                  τ = L / R
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                The time constant represents the time required for the current to reach 63.2% of its final value during charging, 
                or to drop to 36.8% during discharging.
              </p>
            </div>
            
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Charging Phase</h3>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-sm font-mono font-bold text-center">
                  i(t) = (V/R) × (1 - e^(-t/τ))
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                During charging, current increases exponentially from 0 to V/R. After 5τ, the current reaches 99.3% of its final value.
              </p>
              
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Discharging Phase</h3>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-sm font-mono font-bold text-center">
                  i(t) = (V/R) × e^(-t/τ)
                </p>
              </div>
              <p class="text-gray-600 dark:text-gray-300">
                During discharging, current decreases exponentially from V/R to 0. The inductor releases stored energy back into the circuit.
              </p>
            </div>
          </div>
          
          <div class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">💡 Key Insight</h4>
            <p class="text-blue-800 dark:text-blue-200">
              Inductors oppose changes in current. When voltage is first applied, current starts at 0 and gradually increases. 
              When voltage is removed, the inductor maintains current flow, causing it to decrease gradually. 
              This property makes inductors useful for filtering and energy storage applications.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// Color mode
const colorMode = useColorMode()

// Circuit parameters
const voltage = ref(12)
const resistance = ref(100)
const inductance = ref(2)

// Simulation state
const isCharging = ref(false)
const isDischarging = ref(false)
const currentProgress = ref(0)
const currentTime = ref(0)
let animationFrame: number | null = null
let lastTimestamp: number | null = null

// Computed values
const timeConstant = computed(() => inductance.value / resistance.value)
const maxCurrent = computed(() => voltage.value / resistance.value)
const currentCurrent = computed(() => {
  if (isCharging.value) {
    return maxCurrent.value * (1 - Math.exp(-currentTime.value / timeConstant.value))
  } else if (isDischarging.value) {
    return maxCurrent.value * Math.exp(-currentTime.value / timeConstant.value)
  } else {
    return currentProgress.value > 50 ? maxCurrent.value : 0
  }
})

// Graph helper functions
const getGraphX = (tauUnits: number) => {
  const x = 40 + (tauUnits * 90)
  return Math.min(x, 380)
}

const getGraphY = (current: number) => {
  const y = 170 - (current / maxCurrent.value) * 150
  return Math.max(y, 20)
}

const getArrowPoints = (position: string) => {
  const offset = (currentProgress.value / 100) * 0.8 + 0.1
  switch (position) {
    case 'top':
      return `${200 + offset * 100},35 210 + offset * 100,40 200 + offset * 100,45`
    case 'right':
      return `350,${100 - offset * 40} 355,${100 - offset * 40} 360,${95 - offset * 40}`
    case 'bottom':
      return `${200 - offset * 100},165 190 - offset * 100,160 200 - offset * 100,155`
    case 'left':
      return `50,${100 + offset * 40} 45,${100 + offset * 40} 40,${105 + offset * 40}`
    default:
      return ''
  }
}

const getTheoreticalCurve = () => {
  let points = ''
  const startT = isCharging.value || (!isCharging && !isDischarging) ? 0 : currentTime.value
  const endT = isCharging.value || (!isCharging && !isDischarging) ? timeConstant.value * 4 : currentTime.value + timeConstant.value * 4
  
  for (let t = 0; t <= 4; t += 0.1) {
    const tau = t * timeConstant.value
    let current: number
    if (isCharging.value || (!isCharging && !isDischarging)) {
      current = maxCurrent.value * (1 - Math.exp(-tau / timeConstant.value))
    } else {
      current = maxCurrent.value * Math.exp(-tau / timeConstant.value)
    }
    const x = getGraphX(t)
    const y = getGraphY(current)
    points += `${x === 40 ? 'M' : 'L'} ${x} ${y} `
  }
  
  return points
}

const getActualCurve = () => {
  let points = ''
  const tauElapsed = currentTime.value / timeConstant.value
  
  for (let t = 0; t <= Math.min(tauElapsed, 4); t += 0.05) {
    const tau = t * timeConstant.value
    let current: number
    if (isCharging.value) {
      current = maxCurrent.value * (1 - Math.exp(-tau / timeConstant.value))
    } else if (isDischarging.value) {
      current = maxCurrent.value * Math.exp(-tau / timeConstant.value)
    } else {
      current = 0
    }
    const x = getGraphX(t)
    const y = getGraphY(current)
    points += `${x === 40 ? 'M' : 'L'} ${x} ${y} `
  }
  
  // Add current point
  const x = getGraphX(tauElapsed)
  const y = getGraphY(currentCurrent.value)
  points += `L ${x} ${y}`
  
  return points
}

// Animation function
const animate = (timestamp: number) => {
  if (!lastTimestamp.value) lastTimestamp.value = timestamp
  const deltaTime = (timestamp - lastTimestamp.value) / 1000 // Convert to seconds
  lastTimestamp.value = timestamp
  
  // Speed multiplier (real-time is too slow, so we accelerate)
  const speedMultiplier = 5
  currentTime.value += deltaTime * speedMultiplier
  
  // Calculate progress
  const tauElapsed = currentTime.value / timeConstant.value
  if (isCharging.value) {
    currentProgress.value = Math.min((currentCurrent.value / maxCurrent.value) * 100, 100)
    if (currentProgress.value >= 99.9) {
      stopAnimation()
      isCharging.value = false
      currentProgress.value = 100
    }
  } else if (isDischarging.value) {
    currentProgress.value = Math.max((1 - currentCurrent.value / maxCurrent.value) * 100, 0)
    if (currentProgress.value >= 99.9) {
      stopAnimation()
      isDischarging.value = false
      currentProgress.value = 0
      currentTime.value = 0
    }
  }
  
  if (isCharging.value || isDischarging.value) {
    animationFrame = requestAnimationFrame(animate)
  }
}

const startCharging = () => {
  resetSimulation()
  isCharging.value = true
  lastTimestamp.value = null
  animationFrame = requestAnimationFrame(animate)
}

const startDischarging = () => {
  if (currentProgress.value < 99) return // Need to be fully charged first
  currentTime.value = 0
  isDischarging.value = true
  lastTimestamp.value = null
  animationFrame = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  lastTimestamp.value = null
}

const resetSimulation = () => {
  stopAnimation()
  isCharging.value = false
  isDischarging.value = false
  currentProgress.value = 0
  currentTime.value = 0
}

// Watch for parameter changes during simulation
watch([voltage, resistance, inductance], () => {
  if (isCharging.value || isDischarging.value) {
    resetSimulation()
  }
})

// SEO
useHead({
  title: 'RL Circuit Transient - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive RL circuit simulator. Explore inductor charging and discharging with time constant visualization.' },
    { name: 'keywords', content: 'RL circuit, inductor, time constant, transient response, electrical simulation' }
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
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
}
</style>

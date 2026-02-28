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
            <svg class="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Capacitor Charging & Discharging
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Visualize the exponential charging and discharging curves of capacitors in RC circuits
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold">
              <span class="text-primary">V(t)</span> = <span class="text-blue-600">V₀</span>(1 - e^(-t/<span class="text-purple-600">τ</span>)) <span class="text-gray-400 mx-2">|</span> 
              <span class="text-primary">V(t)</span> = <span class="text-blue-600">V₀</span>e^(-t/<span class="text-purple-600">τ</span>)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Circuit Diagram -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Interactive RC Circuit
          </h3>
          
          <!-- Circuit SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 700 350" class="w-full max-w-4xl h-auto">
              <!-- Background -->
              <rect width="700" height="350" fill="transparent"/>
              
              <!-- Circuit Wires -->
              <!-- Complete circuit loop -->
              <path d="M 100 150 L 250 150 L 250 100 L 450 100 L 450 150 L 600 150 L 600 250 L 450 250 L 450 300 L 250 300 L 250 250 L 100 250 Z" 
                :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
              
              <!-- Voltage Source (Left) -->
              <g class="voltage-source">
                <circle cx="100" cy="150" r="50" fill="white" :stroke="voltageColor" stroke-width="4"/>
                <text x="100" y="145" text-anchor="middle" font-size="18" font-weight="bold" :fill="voltageColor">
                  {{ voltageSource }}V
                </text>
                <text x="100" y="165" text-anchor="middle" font-size="12" fill="#666">DC Source</text>
                <text x="90" y="110" font-size="14" fill="#22c55e" font-weight="bold">+</text>
                <text x="90" y="195" font-size="14" fill="#ef4444" font-weight="bold">−</text>
              </g>
              
              <!-- Resistor (Top) -->
              <g class="resistor">
                <rect x="300" y="85" width="100" height="30" fill="white" :stroke="resistorColor" stroke-width="3" rx="5"/>
                <polyline points="305,100 315,90 325,110 335,90 345,110 355,90 365,110 375,90 385,110 395,100" 
                  fill="none" :stroke="resistorColor" stroke-width="2.5"/>
                <text x="350" y="130" text-anchor="middle" font-size="14" font-weight="bold" :fill="resistorColor">
                  {{ resistance }}Ω
                </text>
              </g>
              
              <!-- Capacitor (Right) -->
              <g class="capacitor">
                <!-- Top plate -->
                <line x1="430" y1="150" x2="470" y2="150" :stroke="capacitorColor" stroke-width="6"/>
                <!-- Bottom plate -->
                <line x1="430" y1="250" x2="470" y2="250" :stroke="capacitorColor" stroke-width="6"/>
                <!-- Dielectric -->
                <rect x="432" y="152" width="36" height="96" fill="url(#dielectricPattern)" opacity="0.3"/>
                <text x="530" y="205" text-anchor="middle" font-size="14" font-weight="bold" :fill="capacitorColor">
                  {{ capacitance }}µF
                </text>
                
                <!-- Charge indicators -->
                <g v-if="isCharging || isDischarging">
                  <text x="475" y="145" font-size="12" fill="#ef4444">+++++</text>
                  <text x="475" y="265" font-size="12" fill="#3b82f6">−−−−−</text>
                </g>
              </g>
              
              <!-- Switch (Bottom) -->
              <g class="switch" transform="translate(100, 250)">
                <circle cx="0" cy="0" r="8" fill="#374151"/>
                <circle cx="60" cy="0" r="8" fill="#374151"/>
                <circle cx="120" cy="0" r="8" fill="#374151"/>
                
                <!-- Switch arm -->
                <line x1="0" y1="0" x2="55" y2="-15" :stroke="switchColor" stroke-width="4" 
                  class="transition-all duration-300"
                  :transform="isCharging ? 'rotate(15, 0, 0)' : (isDischarging ? 'rotate(-30, 0, 0)' : 'rotate(0, 0, 0)')"/>
                
                <text x="60" y="30" text-anchor="middle" font-size="11" fill="#666">Charge</text>
                <text x="120" y="30" text-anchor="middle" font-size="11" fill="#666">Discharge</text>
                <text x="0" y="30" text-anchor="middle" font-size="11" fill="#666">Source</text>
              </g>
              
              <!-- Current Flow Animation -->
              <g v-if="(isCharging || isDischarging) && currentFlow > 0">
                <!-- Animated particles -->
                <circle r="5" fill="#fbbf24" filter="url(#glow)">
                  <animateMotion :dur="animationDuration" repeatCount="indefinite">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
                <circle r="5" fill="#fbbf24" filter="url(#glow)">
                  <animateMotion :dur="animationDuration" repeatCount="indefinite" begin="0.3s">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
              </g>
              
              <!-- Current path (invisible) -->
              <path id="currentPath" 
                :d="isCharging ? 'M 100 150 L 250 150 L 250 100 L 450 100 L 450 150 L 600 150 L 600 250 L 450 250 L 450 300 L 250 300 L 250 250 L 100 250 Z' : 
                   'M 100 250 L 250 250 L 250 300 L 450 300 L 450 250 L 600 250 L 600 150 L 450 150 L 450 100 L 250 100 L 250 150 L 100 150 Z'"
                fill="none" stroke="none"/>
              
              <!-- Glow filter -->
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <pattern id="dielectricPattern" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L4,4" stroke="#9CA3AF" stroke-width="0.5"/>
                </pattern>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Controls and Chart Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
            
            <!-- Voltage Source -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voltage Source (V₀)
              </label>
              <div class="flex items-center gap-4 mb-2">
                <input 
                  v-model.number="voltageSource"
                  type="number" 
                  step="0.1"
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
              </div>
              <input 
                v-model.number="voltageSource"
                type="range"
                min="1"
                max="24"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <!-- Resistance -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resistance (R)
              </label>
              <div class="flex items-center gap-4 mb-2">
                <input 
                  v-model.number="resistance"
                  type="number" 
                  step="100"
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
              </div>
              <input 
                v-model.number="resistance"
                type="range"
                min="100"
                max="100000"
                step="100"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <!-- Capacitance -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacitance (C)
              </label>
              <div class="flex items-center gap-4 mb-2">
                <input 
                  v-model.number="capacitance"
                  type="number" 
                  step="1"
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 w-16">µF</span>
              </div>
              <input 
                v-model.number="capacitance"
                type="range"
                min="1"
                max="1000"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <!-- Time Constant Display -->
            <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4 mb-6">
              <div class="text-center">
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Constant (τ = R × C)</p>
                <p class="text-3xl font-bold text-primary">{{ formatTime(timeConstant) }}</p>
              </div>
            </div>
            
            <!-- Control Buttons -->
            <div class="grid grid-cols-2 gap-4">
              <button 
                @click="startCharging"
                :disabled="isCharging"
                class="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Charge
              </button>
              <button 
                @click="startDischarging"
                :disabled="isDischarging"
                class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                </svg>
                Discharge
              </button>
            </div>
            
            <button 
              @click="resetSimulation"
              class="w-full mt-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
          
          <!-- Chart and Status -->
          <div class="space-y-6">
            <!-- Voltage/Current Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Voltage vs Time</h3>
              <div class="relative h-64">
                <canvas ref="chartCanvas"></canvas>
              </div>
            </div>
            
            <!-- Real-time Status -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-time Status</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Capacitor Voltage</p>
                  <p class="text-2xl font-bold text-blue-600">{{ capacitorVoltage.toFixed(2) }}V</p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Current</p>
                  <p class="text-2xl font-bold text-green-600">{{ currentFlow.toFixed(4) }}A</p>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Time Elapsed</p>
                  <p class="text-2xl font-bold text-purple-600">{{ formatTime(elapsedTime) }}</p>
                </div>
                <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">% Charged</p>
                  <p class="text-2xl font-bold text-orange-600">{{ chargePercentage.toFixed(1) }}%</p>
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
            📚 Understanding Capacitor Charging & Discharging
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What Happens During Charging?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When a capacitor is connected to a DC voltage source through a resistor, it doesn't charge instantly. 
              Instead, the voltage across the capacitor increases exponentially following this formula:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              V(t) = V₀ × (1 - e^(-t/τ))
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where τ (tau) is the time constant = R × C. After 1τ, the capacitor reaches ~63.2% of the source voltage. 
              After 5τ, it's considered fully charged (99.3%).
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What Happens During Discharging?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When the voltage source is removed and the capacitor is connected to a discharge path (through the resistor), 
              the stored charge flows out exponentially:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              V(t) = V₀ × e^(-t/τ)
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Points:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Time Constant (τ)</strong>: Determines how fast the capacitor charges/discharges</li>
              <li><strong>Never Fully Charged/Discharged</strong>: Theoretically approaches but never quite reaches 0% or 100%</li>
              <li><strong>Current Flow</strong>: Maximum at the start, decreases as voltage builds up</li>
              <li><strong>Energy Storage</strong>: E = ½CV² - energy stored in the electric field</li>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Capacitor Charging & Discharging - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of capacitor charging and discharging in RC circuits with real-time graphing.' },
    { name: 'keywords', content: 'capacitor charging, rc circuit, time constant, exponential curve' }
  ]
})

const colorMode = useColorMode()

// Component parameters
const voltageSource = ref(10)
const resistance = ref(10000)
const capacitance = ref(100)

// Simulation state
const isCharging = ref(false)
const isDischarging = ref(false)
const elapsedTime = ref(0)
const capacitorVoltage = ref(0)
const initialVoltage = ref(0)

// Chart
const chartCanvas = ref(null)
let chart = null
let animationFrame = null
let lastTime = null

// Computed properties
const timeConstant = computed(() => {
  return resistance.value * capacitance.value * 1e-6 // Convert µF to F
})

const currentFlow = computed(() => {
  if (isCharging.value) {
    return (voltageSource.value - capacitorVoltage.value) / resistance.value
  } else if (isDischarging.value) {
    return capacitorVoltage.value / resistance.value
  }
  return 0
})

const chargePercentage = computed(() => {
  if (voltageSource.value === 0) return 0
  return (capacitorVoltage.value / voltageSource.value) * 100
})

const animationDuration = computed(() => {
  const current = currentFlow.value
  if (current <= 0) return '0s'
  return `${Math.max(0.5, 3 / Math.abs(current) * 0.001)}s`
})

// Colors
const wireColor = computed(() => {
  if (!isCharging.value && !isDischarging.value) return '#94A3B8'
  return '#3B82F6'
})

const voltageColor = computed(() => '#3B82F6')
const resistorColor = computed(() => '#8B5CF6')
const capacitorColor = computed(() => '#10B981')
const switchColor = computed(() => {
  if (isCharging.value) return '#22C55E'
  if (isDischarging.value) return '#EF4444'
  return '#6B7280'
})

// Methods
function formatTime(seconds) {
  if (seconds >= 1) {
    return `${seconds.toFixed(3)}s`
  }
  return `${(seconds * 1000).toFixed(1)}ms`
}

function startCharging() {
  isDischarging.value = false
  initialVoltage.value = capacitorVoltage.value
  isCharging.value = true
  elapsedTime.value = 0
  lastTime = performance.now()
  animate()
}

function startDischarging() {
  isCharging.value = false
  initialVoltage.value = capacitorVoltage.value
  isDischarging.value = true
  elapsedTime.value = 0
  lastTime = performance.now()
  animate()
}

function resetSimulation() {
  isCharging.value = false
  isDischarging.value = false
  capacitorVoltage.value = 0
  initialVoltage.value = 0
  elapsedTime.value = 0
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (chart) {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    chart.update('none')
  }
}

function animate() {
  if (!isCharging.value && !isDischarging.value) return
  
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
  lastTime = currentTime
  
  elapsedTime.value += deltaTime
  
  // Calculate voltage
  const tau = timeConstant.value
  const t = elapsedTime.value
  
  if (isCharging.value) {
    // V(t) = V_initial + (V_source - V_initial) * (1 - e^(-t/τ))
    capacitorVoltage.value = initialVoltage.value + (voltageSource.value - initialVoltage.value) * (1 - Math.exp(-t / tau))
  } else if (isDischarging.value) {
    // V(t) = V_initial * e^(-t/τ)
    capacitorVoltage.value = initialVoltage.value * Math.exp(-t / tau)
  }
  
  // Update chart
  updateChart(t, capacitorVoltage.value)
  
  // Continue animation if voltage hasn't settled
  if (capacitorVoltage.value > 0.01 && (isCharging.value ? capacitorVoltage.value < voltageSource.value * 0.999 : true)) {
    animationFrame = requestAnimationFrame(animate)
  } else {
    // Stop if nearly complete
    if (isDischarging.value) {
      capacitorVoltage.value = 0
    }
  }
}

function initChart() {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  // Destroy existing chart if any
  if (chart) {
    chart.destroy()
  }
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Capacitor Voltage (V)',
        data: [],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Time (s)',
            color: colorMode.value === 'dark' ? '#E5E7EB' : '#374151'
          },
          ticks: {
            color: colorMode.value === 'dark' ? '#9CA3AF' : '#6B7280'
          },
          grid: {
            color: colorMode.value === 'dark' ? '#374151' : '#E5E7EB'
          }
        },
        y: {
          min: 0,
          max: voltageSource.value * 1.1,
          title: {
            display: true,
            text: 'Voltage (V)',
            color: colorMode.value === 'dark' ? '#E5E7EB' : '#374151'
          },
          ticks: {
            color: colorMode.value === 'dark' ? '#9CA3AF' : '#6B7280'
          },
          grid: {
            color: colorMode.value === 'dark' ? '#374151' : '#E5E7EB'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colorMode.value === 'dark' ? '#E5E7EB' : '#374151'
          }
        }
      }
    }
  })
}

function updateChart(time, voltage) {
  if (!chart) return
  
  chart.data.labels.push(time)
  chart.data.datasets[0].data.push(voltage)
  
  // Limit data points
  if (chart.data.labels.length > 500) {
    chart.data.labels.shift()
    chart.data.datasets[0].data.shift()
  }
  
  chart.update('none')
}

// Lifecycle
onMounted(() => {
  import('chart.js/auto').then((ChartJS) => {
    window.Chart = ChartJS.default
    initChart()
  })
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (chart) {
    chart.destroy()
  }
})

// Watch for parameter changes
watch([voltageSource, resistance, capacitance], () => {
  if (chart) {
    chart.options.scales.y.max = voltageSource.value * 1.1
    chart.update()
  }
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
</style>

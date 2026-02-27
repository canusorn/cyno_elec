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
            <ClockIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RC Time Constant Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate charging and discharging behavior of RC circuits with interactive visualization
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary-highlight">τ</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">R</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">C</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Time Constant (τ) = Resistance × Capacitance</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Curve Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📈 Voltage vs Time Curve
          </h3>
          
          <!-- Interactive Curve Chart -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 700 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid lines -->
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
              </defs>
              <rect x="80" y="40" width="570" height="280" fill="url(#grid)" />
              
              <!-- Axes -->
              <line x1="80" y1="40" x2="80" y2="320" stroke="#374151" stroke-width="2"/>
              <line x1="80" y1="320" x2="650" y2="320" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels -->
              <text x="70" y="325" text-anchor="end" :font-size="12" fill="#6B7280">0V</text>
              <text x="70" y="235" text-anchor="end" :font-size="12" fill="#6B7280">{{ (voltageSource / 4).toFixed(1) }}V</text>
              <text x="70" y="145" text-anchor="end" :font-size="12" fill="#6B7280">{{ (voltageSource / 2).toFixed(1) }}V</text>
              <text x="70" y="55" text-anchor="end" :font-size="12" fill="#6B7280">{{ voltageSource }}V</text>
              <text x="40" y="180" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 180)">Voltage (V)</text>
              
              <!-- X-axis labels -->
              <text x="80" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">0</text>
              <text x="222.5" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">1τ</text>
              <text x="365" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">2τ</text>
              <text x="507.5" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">3τ</text>
              <text x="650" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">4τ</text>
              <text x="365" y="370" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151">Time (τ)</text>
              
              <!-- Target voltage line -->
              <line x1="80" y1="55" x2="650" y2="55" stroke="#EF4444" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
              <text x="655" y="55" :font-size="11" fill="#EF4444" font-weight="bold">{{ voltageSource }}V</text>
              
              <!-- Voltage markers -->
              <line x1="80" y1="179" x2="650" y2="179" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
              <text x="655" y="183" :font-size="11" fill="#F59E0B" font-weight="bold">63.2%</text>
              
              <line x1="80" y1="116" x2="650" y2="116" stroke="#22C55E" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
              <text x="655" y="120" :font-size="11" fill="#22C55E" font-weight="bold">86.5%</text>
              
              <line x1="80" y1="83" x2="650" y2="83" stroke="#3B82F6" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
              <text x="655" y="87" :font-size="11" fill="#3B82F6" font-weight="bold">95.0%</text>
              
              <!-- Charging curve -->
              <path 
                v-if="mode === 'charging'"
                :d="chargingCurvePath"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="3"
                stroke-linecap="round"
              />
              
              <!-- Discharging curve -->
              <path 
                v-if="mode === 'discharging'"
                :d="dischargingCurvePath"
                fill="none"
                stroke="#EC4899"
                stroke-width="3"
                stroke-linecap="round"
              />
              
              <!-- Time constant markers -->
              <g v-if="mode === 'charging'">
                <!-- 1τ marker -->
                <circle cx="222.5" cy="179" r="6" fill="#F59E0B" stroke="white" stroke-width="2"/>
                <text x="222.5" y="170" text-anchor="middle" :font-size="11" font-weight="bold" fill="#F59E0B">63.2%</text>
                
                <!-- 2τ marker -->
                <circle cx="365" cy="116" r="6" fill="#22C55E" stroke="white" stroke-width="2"/>
                <text x="365" y="107" text-anchor="middle" :font-size="11" font-weight="bold" fill="#22C55E">86.5%</text>
                
                <!-- 3τ marker -->
                <circle cx="507.5" cy="83" r="6" fill="#3B82F6" stroke="white" stroke-width="2"/>
                <text x="507.5" y="74" text-anchor="middle" :font-size="11" font-weight="bold" fill="#3B82F6">95.0%</text>
              </g>
              
              <!-- Interactive point -->
              <g v-if="selectedTime !== null">
                <line x1="80" y1="selectedY" x2="selectedX" y2="selectedY" stroke="#6366F1" stroke-width="1" stroke-dasharray="4,4"/>
                <line x1="selectedX" y1="320" x2="selectedX" y2="selectedY" stroke="#6366F1" stroke-width="1" stroke-dasharray="4,4"/>
                <circle :cx="selectedX" :cy="selectedY" r="8" fill="#6366F1" stroke="white" stroke-width="2"/>
                <text :x="selectedX" y="selectedY - 15" text-anchor="middle" :font-size="12" font-weight="bold" fill="#6366F1">
                  {{ selectedVoltage.toFixed(2) }}V
                </text>
              </g>
            </svg>
          </div>
          
          <!-- Time buttons -->
          <div class="flex justify-center gap-2 mb-4">
            <button 
              v-for="t in [1, 2, 3, 4, 5]"
              :key="t"
              @click="selectedTime = t"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors',
                selectedTime === t 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]"
            >
              {{ t }}τ
            </button>
            <button 
              @click="selectedTime = null"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              Reset
            </button>
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Values</h3>
              
              <!-- Mode Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Circuit Mode
                </label>
                <div class="flex gap-2">
                  <button 
                    @click="mode = 'charging'"
                    :class="[
                      'flex-1 px-4 py-3 rounded-lg font-semibold transition-colors',
                      mode === 'charging' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    ⚡ Charging
                  </button>
                  <button 
                    @click="mode = 'discharging'"
                    :class="[
                      'flex-1 px-4 py-3 rounded-lg font-semibold transition-colors',
                      mode === 'discharging' 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    🔋 Discharging
                  </button>
                </div>
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
                    step="any"
                    min="0"
                    placeholder="Enter resistance"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">Ω</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="100"
                  max="1000000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>500kΩ</span>
                  <span>1MΩ</span>
                </div>
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
                    step="any"
                    min="0"
                    placeholder="Enter capacitance"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">μF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="1"
                  max="10000"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1μF</span>
                  <span>5000μF</span>
                  <span>10000μF</span>
                </div>
              </div>

              <!-- Source Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Source Voltage (V_s)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="voltageSource"
                    type="number" 
                    step="any"
                    min="0"
                    placeholder="Enter voltage"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">V</span>
                </div>
                <input 
                  v-model.number="voltageSource"
                  type="range"
                  min="1"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1V</span>
                  <span>12V</span>
                  <span>24V</span>
                </div>
              </div>
              
              <!-- Preset Buttons -->
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
                <div class="grid grid-cols-2 gap-2">
                  <button @click="applyPreset('led')" 
                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    LED Blinker
                  </button>
                  <button @click="applyPreset('filter')" 
                    class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    Audio Filter
                  </button>
                  <button @click="applyPreset('power')" 
                    class="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium">
                    Power Supply
                  </button>
                  <button @click="resetValues" 
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h3>
              
              <!-- Time Constant Display -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Time Constant (τ)</p>
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ formatTime(timeConstant) }}
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">τ = R × C</p>
                </div>
              </div>

              <!-- Voltage at Selected Time -->
              <div v-if="selectedTime !== null" class="bg-white dark:bg-gray-700 rounded-lg p-4 mb-6 border-2 border-primary">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Voltage at {{ selectedTime }}τ:</h4>
                <div class="text-center">
                  <p class="text-4xl font-bold" :class="mode === 'charging' ? 'text-purple-600' : 'text-pink-600'">
                    {{ selectedVoltage.toFixed(3) }} V
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {{ ((selectedVoltage / voltageSource) * 100).toFixed(1) }}% of {{ voltageSource }}V
                  </p>
                </div>
              </div>

              <!-- Time to Reach Percentage -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">⏱️ Time to Reach Voltage:</h4>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">63.2% (1τ):</span>
                    <span class="font-bold text-amber-600">{{ formatTime(timeConstant) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">86.5% (2τ):</span>
                    <span class="font-bold text-green-600">{{ formatTime(timeConstant * 2) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">95.0% (3τ):</span>
                    <span class="font-bold text-blue-600">{{ formatTime(timeConstant * 3) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">98.2% (4τ):</span>
                    <span class="font-bold text-purple-600">{{ formatTime(timeConstant * 4) }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300">99.3% (5τ):</span>
                    <span class="font-bold text-red-600">{{ formatTime(timeConstant * 5) }}</span>
                  </div>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📘 RC Time Constant Formulas</h4>
                <div class="space-y-2 text-sm">
                  <p class="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Time Constant:</strong> τ = R × C
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Charging:</strong> V(t) = V_s × (1 - e^(-t/τ))
                  </p>
                  <p class="text-gray-600 dark:text-gray-300">
                    <strong>Discharging:</strong> V(t) = V_s × e^(-t/τ)
                  </p>
                </div>
                <div class="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    At t = τ, capacitor reaches 63.2% of final voltage (charging) or drops to 36.8% (discharging).
                    After 5τ, capacitor is considered fully charged/discharged (99.3%).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { ClockIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'RC Time Constant Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate RC time constant (τ = R × C) for charging and discharging capacitors. Interactive visualization with voltage curves.' },
    { name: 'keywords', content: 'RC time constant, capacitor charging, capacitor discharging, exponential decay, electrical engineering' }
  ]
})

const colorMode = useColorMode()

// Input values
const resistance = ref(10000) // Ohms
const capacitance = ref(100) // microfarads
const voltageSource = ref(5) // Volts
const mode = ref('charging') // 'charging' or 'discharging'
const selectedTime = ref(null)

// Presets
const presets = {
  led: { resistance: 10000, capacitance: 100, voltageSource: 5 },
  filter: { resistance: 1600, capacitance: 10, voltageSource: 3.3 },
  power: { resistance: 100, capacitance: 4700, voltageSource: 12 }
}

function applyPreset(type) {
  const preset = presets[type]
  if (preset) {
    resistance.value = preset.resistance
    capacitance.value = preset.capacitance
    voltageSource.value = preset.voltageSource
  }
}

function resetValues() {
  resistance.value = 10000
  capacitance.value = 100
  voltageSource.value = 5
  selectedTime.value = null
}

// Computed: Time constant in seconds
const timeConstant = computed(() => {
  const r = resistance.value // Ohms
  const c = capacitance.value * 1e-6 // Convert μF to F
  return r * c // τ = R × C (seconds)
})

// Computed: Voltage at selected time
const selectedVoltage = computed(() => {
  if (selectedTime.value === null) return 0
  const t = selectedTime.value * timeConstant.value
  if (mode.value === 'charging') {
    return voltageSource.value * (1 - Math.exp(-t / timeConstant.value))
  } else {
    return voltageSource.value * Math.exp(-t / timeConstant.value)
  }
})

// Computed: Selected point coordinates for chart
const selectedX = computed(() => {
  if (selectedTime.value === null) return 0
  const x = 80 + (selectedTime.value * 142.5)
  return Math.min(x, 650)
})

const selectedY = computed(() => {
  if (selectedTime.value === null) return 320
  const voltage = selectedVoltage.value
  const y = 320 - ((voltage / voltageSource.value) * 265)
  return Math.max(y, 55)
})

// Computed: Charging curve path
const chargingCurvePath = computed(() => {
  let path = 'M'
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 4 // 0 to 4τ
    const voltage = voltageSource.value * (1 - Math.exp(-t))
    const x = 80 + ((t / 4) * 570)
    const y = 320 - ((voltage / voltageSource.value) * 265)
    points.push(`${x},${y}`)
  }
  
  return path + points.join(' L')
})

// Computed: Discharging curve path
const dischargingCurvePath = computed(() => {
  let path = 'M'
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 4 // 0 to 4τ
    const voltage = voltageSource.value * Math.exp(-t)
    const x = 80 + ((t / 4) * 570)
    const y = 320 - ((voltage / voltageSource.value) * 265)
    points.push(`${x},${y}`)
  }
  
  return path + points.join(' L')
})

// Format time for display
function formatTime(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds) || !isFinite(seconds)) {
    return '---'
  }
  
  if (seconds < 1e-6) {
    return (seconds * 1e9).toFixed(2) + ' ns'
  } else if (seconds < 1e-3) {
    return (seconds * 1e6).toFixed(2) + ' μs'
  } else if (seconds < 1) {
    return (seconds * 1000).toFixed(2) + ' ms'
  } else if (seconds < 60) {
    return seconds.toFixed(3) + ' s'
  } else {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds.toFixed(1)}s`
  }
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

.text-primary-highlight {
  color: var(--tw-color-primary-dark) !important;
  text-shadow: 0 0 20px rgba(159, 168, 218, 0.8);
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

/* Slider Styles */
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

/* Dark mode slider */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}

/* Animation for result update */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.text-5xl {
  animation: pulse 0.3s ease-in-out;
}
</style>

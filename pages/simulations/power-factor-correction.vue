<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavigationBar />
    
    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Power Factor Correction Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Learn how capacitors improve power factor and reduce reactive power in AC circuits
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Left Column: Controls -->
          <div class="space-y-6">
            
            <!-- Load Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CogIcon class="h-6 w-6 text-primary" />
                Load Configuration
              </h2>
              
              <!-- Active Power -->
              <div class="mb-6">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Active Power (P)</span>
                  <span class="text-primary font-bold">{{ activePower }} kW</span>
                </label>
                <input
                  v-model.number="activePower"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <!-- Initial Power Factor -->
              <div class="mb-6">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Initial Power Factor (cos φ)</span>
                  <span class="text-orange-500 font-bold">{{ initialPowerFactor.toFixed(2) }}</span>
                </label>
                <input
                  v-model.number="initialPowerFactor"
                  type="range"
                  min="0.3"
                  max="0.95"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical inductive load: 0.6 - 0.85
                </p>
              </div>

              <!-- System Voltage -->
              <div class="mb-4">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>System Voltage</span>
                  <span class="text-blue-500 font-bold">{{ voltage }} V</span>
                </label>
                <div class="flex gap-2">
                  <button
                    v-for="v in [230, 400, 480]"
                    :key="v"
                    @click="voltage = v"
                    class="flex-1 py-2 rounded-lg font-medium transition-all"
                    :class="voltage === v ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    {{ v }}V
                  </button>
                </div>
              </div>
            </div>

            <!-- Correction Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <SparklesIcon class="h-6 w-6 text-green-500" />
                Power Factor Correction
              </h2>

              <!-- Target Power Factor -->
              <div class="mb-6">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Target Power Factor</span>
                  <span class="text-green-500 font-bold">{{ targetPowerFactor.toFixed(2) }}</span>
                </label>
                <input
                  v-model.number="targetPowerFactor"
                  type="range"
                  min="0.85"
                  max="0.99"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <!-- Capacitor Bank -->
              <div class="mb-4">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Capacitor Bank</span>
                  <span class="text-purple-500 font-bold">{{ correctionCapacitance.toFixed(1) }} µF</span>
                </label>
                <div class="flex gap-2 items-center">
                  <button
                    @click="adjustCapacitor(-10)"
                    class="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    -10µF
                  </button>
                  <input
                    v-model.number="correctionCapacitanceAlwaysLink"
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <button
                    @click="adjustCapacitor(10)"
                    class="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    +10µF
                  </button>
                </div>
              </div>

              <!-- Auto Calculate Button -->
              <button
                @click="autoCalculateCapacitor"
                class="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg px-6 py-3 font-bold transition-all transform hover:scale-105"
              >
                🎯 Auto-Calculate Required Capacitance
              </button>
            </div>
          </div>

          <!-- Right Column: Visualizations -->
          <div class="space-y-6">
            
            <!-- Power Triangle -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                🔺 Power Triangle
              </h3>
              
              <div class="flex justify-center mb-4">
                <svg viewBox="0 0 400 350" class="w-full max-w-lg h-auto">
                  <!-- Grid background -->
                  <defs>
                    <pattern id="pfGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="400" height="350" fill="url(#pfGrid)" />
                  
                  <!-- Angle arc for corrected PF -->
                  <path
                    d="M 60 300 A 40 40 0 0 1 95 270"
                    fill="none"
                    stroke="#10B981"
                    stroke-width="3"
                    stroke-dasharray="5,5"
                  />
                  <text :x="100" :y="285" font-size="11" fill="#10B981" font-weight="bold">
                    φ₂ = {{ correctedAngle.toFixed(1) }}°
                  </text>
                  
                  <!-- Angle arc for initial PF -->
                  <path
                    :d="getAnglePath(60, 300, initialAngle)"
                    fill="none"
                    stroke="#F59E0B"
                    stroke-width="3"
                  />
                  <text :x="110" :y="260" font-size="11" fill="#F59E0B" font-weight="bold">
                    φ₁ = {{ initialAngle.toFixed(1) }}°
                  </text>
                  
                  <!-- Active Power (P) - Horizontal -->
                  <line
                    x1="60"
                    y1="300"
                    :x2="60 + activePowerLength"
                    y2="300"
                    stroke="#3B82F6"
                    stroke-width="4"
                  />
                  <polygon
                    :points="getArrowPoints(60 + activePowerLength, 300, 'right')"
                    fill="#3B82F6"
                  />
                  <text
                    :x="60 + activePowerLength / 2"
                    y="325"
                    text-anchor="middle"
                    font-size="14"
                    fill="#3B82F6"
                    font-weight="bold"
                  >
                    P = {{ activePower }} kW
                  </text>
                  
                  <!-- Initial Apparent Power (S1) -->
                  <line
                    x1="60"
                    y1="300"
                    :x2="60 + s1X"
                    :y2="300 - s1Y"
                    stroke="#F59E0B"
                    stroke-width="3"
                    stroke-dasharray="8,4"
                  />
                  <text
                    :x="60 + s1X + 10"
                    :y="290 - s1Y"
                    font-size="12"
                    fill="#F59E0B"
                    font-weight="bold"
                  >
                    S₁ = {{ initialApparentPower.toFixed(2) }} kVA
                  </text>
                  
                  <!-- Reactive Power (Q) - Initial -->
                  <line
                    :x1="60 + activePowerLength"
                    y1="300"
                    :x2="60 + activePowerLength"
                    :y2="300 - reactivePowerLength"
                    stroke="#EF4444"
                    stroke-width="3"
                  />
                  <polygon
                    :points="getArrowPoints(60 + activePowerLength, 300 - reactivePowerLength, 'up')"
                    fill="#EF4444"
                  />
                  <text
                    :x="60 + activePowerLength + 15"
                    :y="300 - reactivePowerLength / 2"
                    font-size="12"
                    fill="#EF4444"
                    font-weight="bold"
                  >
                    Q₁ = {{ initialReactivePower.toFixed(2) }} kVAR
                  </text>
                  
                  <!-- Corrected Reactive Power (Q2) -->
                  <line
                    :x1="60 + activePowerLength"
                    y1="300"
                    :x2="60 + activePowerLength"
                    :y2="300 - correctedReactiveLength"
                    stroke="#10B981"
                    stroke-width="3"
                  />
                  <text
                    :x="60 + activePowerLength + 15"
                    :y="300 - correctedReactiveLength - 10"
                    font-size="12"
                    fill="#10B981"
                    font-weight="bold"
                  >
                    Q₂ = {{ correctedReactivePower.toFixed(2) }} kVAR
                  </text>
                  
                  <!-- Corrected Apparent Power (S2) -->
                  <line
                    x1="60"
                    y1="300"
                    :x2="60 + s2X"
                    :y2="300 - s2Y"
                    stroke="#10B981"
                    stroke-width="4"
                  />
                  <polygon
                    :points="getArrowPoints(60 + s2X, 300 - s2Y, 'diag')"
                    fill="#10B981"
                  />
                  <text
                    :x="60 + s2X - 20"
                    :y="275 - s2Y"
                    font-size="14"
                    fill="#10B981"
                    font-weight="bold"
                  >
                    S₂ = {{ correctedApparentPower.toFixed(2) }} kVA
                  </text>
                  
                  <!-- Capacitive compensation arrow -->
                  <line
                    x1="60"
                    y1="300"
                    :x2="60 - 50"
                    :y2="300"
                    stroke="#8B5CF6"
                    stroke-width="3"
                    stroke-dasharray="4,2"
                  />
                  <polygon
                    :points="getArrowPoints(10, 300, 'left')"
                    fill="#8B5CF6"
                  />
                  <text
                    x="30"
                    y="320"
                    text-anchor="middle"
                    font-size="11"
                    fill="#8B5CF6"
                    font-weight="bold"
                  >
                    Qc
                  </text>
                </svg>
              </div>
              
              <!-- Legend -->
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-blue-500"></div>
                  <span class="text-gray-600 dark:text-gray-400">Active Power (P)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-red-500"></div>
                  <span class="text-gray-600 dark:text-gray-400">Initial Reactive (Q₁)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-green-500"></div>
                  <span class="text-gray-600 dark:text-gray-400">Corrected Apparent (S₂)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-purple-500"></div>
                  <span class="text-gray-600 dark:text-gray-400">Capacitive (Qc)</span>
                </div>
              </div>
            </div>

            <!-- Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Correction Results</h3>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Power Factor</p>
                  <p class="text-2xl font-bold">
                    <span class="text-orange-500">{{ initialPowerFactor.toFixed(2) }}</span>
                    <span class="text-gray-400">→</span>
                    <span class="text-green-500">{{ correctedPowerFactor.toFixed(2) }}</span>
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Apparent Power</p>
                  <p class="text-2xl font-bold">
                    <span class="text-orange-500">{{ initialApparentPower.toFixed(2) }}</span>
                    <span class="text-gray-400">→</span>
                    <span class="text-green-500">{{ correctedApparentPower.toFixed(2) }}</span>
                    <span class="text-sm text-gray-400">kVA</span>
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Current</p>
                  <p class="text-2xl font-bold">
                    <span class="text-orange-500">{{ initialCurrent.toFixed(2) }}</span>
                    <span class="text-gray-400">→</span>
                    <span class="text-green-500">{{ correctedCurrent.toFixed(2) }}</span>
                    <span class="text-sm text-gray-400">A</span>
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Reduction</p>
                  <p class="text-2xl font-bold text-green-500">
                    {{ currentReduction.toFixed(1) }}%
                  </p>
                </div>
              </div>
              
              <!-- Capacitor Details -->
              <div class="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 class="font-semibold text-purple-800 dark:text-purple-300 mb-2">⚡ Required Capacitor Bank</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">Capacitance:</span>
                    <span class="font-bold text-purple-600 dark:text-purple-400 ml-2">{{ requiredCapacitance.toFixed(1) }} µF</span>
                  </div>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">Reactive Power:</span>
                    <span class="font-bold text-purple-600 dark:text-purple-400 ml-2">{{ requiredKVAR.toFixed(2) }} kVAR</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Key Concepts</h3>
              
              <div class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">What is Power Factor?</h4>
                  <p>Power factor is the ratio of real power (P) to apparent power (S). It measures how efficiently electrical power is converted into useful work.</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Why Correct It?</h4>
                  <p>Low power factor causes higher current flow, increased I²R losses, and reduced system capacity. Utilities often penalize low PF!</p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">How Capacitors Help</h4>
                  <p>Capacitors supply reactive power (Qc) that inductive loads need, reducing the reactive power drawn from the source. This improves PF without affecting active power.</p>
                </div>
                
                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p class="font-mono text-xs">
                    <strong>Required kVAR:</strong><br>
                    Qc = P × (tan φ₁ - tan φ₂)<br>
                    <strong>Capacitance:</strong><br>
                    C = Qc / (2πf × V²)
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
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'

// Icons (inline for simplicity)
const BoltIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>'
}

const CogIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>'
}

const SparklesIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>'
}

// Input values
const activePower = ref(50) // kW
const initialPowerFactor = ref(0.75)
const targetPowerFactor = ref(0.95)
const voltage = ref(400) // V
const correctionCapacitance = ref(100) // µF
const frequency = 50 // Hz

// Calculated values
const initialAngle = computed(() => {
  return Math.acos(initialPowerFactor.value) * (180 / Math.PI)
})

const initialReactivePower = computed(() => {
  const tanPhi = Math.tan(Math.acos(initialPowerFactor.value))
  return activePower.value * tanPhi
})

const initialApparentPower = computed(() => {
  return activePower.value / initialPowerFactor.value
})

const initialCurrent = computed(() => {
  return (initialApparentPower.value * 1000) / (Math.sqrt(3) * voltage.value)
})

const correctedReactivePower = computed(() => {
  const Qc = (correctionCapacitance.value * 1e-6) * 2 * Math.PI * frequency * (voltage.value ** 2) / 1000
  return Math.max(0, initialReactivePower.value - Qc)
})

const correctedApparentPower = computed(() => {
  return Math.sqrt((activePower.value ** 2) + (correctedReactivePower.value ** 2))
})

const correctedPowerFactor = computed(() => {
  return activePower.value / correctedApparentPower.value
})

const correctedAngle = computed(() => {
  return Math.acos(Math.min(1, correctedPowerFactor.value)) * (180 / Math.PI)
})

const correctedCurrent = computed(() => {
  return (correctedApparentPower.value * 1000) / (Math.sqrt(3) * voltage.value)
})

const currentReduction = computed(() => {
  return ((initialCurrent.value - correctedCurrent.value) / initialCurrent.value) * 100
})

const requiredKVAR = computed(() => {
  const tanPhi1 = Math.tan(Math.acos(initialPowerFactor.value))
  const tanPhi2 = Math.tan(Math.acos(targetPowerFactor.value))
  return activePower.value * (tanPhi1 - tanPhi2)
})

const requiredCapacitance = computed(() => {
  const Qc = requiredKVAR.value * 1000 // VAR
  const C = Qc / (2 * Math.PI * frequency * (voltage.value ** 2))
  return C * 1e6 // Convert to µF
})

// SVG drawing calculations
const activePowerLength = computed(() => activePower.value * 2.5)

const reactivePowerLength = computed(() => initialReactivePower.value * 2.5)

const correctedReactiveLength = computed(() => correctedReactivePower.value * 2.5)

const s1X = computed(() => activePowerLength.value)
const s1Y = computed(() => reactivePowerLength.value)

const s2X = computed(() => activePowerLength.value)
const s2Y = computed(() => correctedReactiveLength.value)

// Methods
const adjustCapacitor = (amount) => {
  correctionCapacitance.value = Math.max(0, Math.min(500, correctionCapacitance.value + amount))
}

const autoCalculateCapacitor = () => {
  correctionCapacitance.value = requiredCapacitance.value
}

const getArrowPoints = (x, y, direction) => {
  const size = 10
  switch (direction) {
    case 'right':
      return `${x},${y} ${x - size},${y - size/2} ${x - size},${y + size/2}`
    case 'left':
      return `${x},${y} ${x + size},${y - size/2} ${x + size},${y + size/2}`
    case 'up':
      return `${x},${y} ${x - size/2},${y + size} ${x + size/2},${y + size}`
    case 'diag':
      return `${x},${y} ${x - size/2},${y + size/2} ${x - size},${y} ${x - size/2},${y - size}`
    default:
      return ''
  }
}

const getAnglePath = (cx, cy, angle) => {
  const radius = 40
  const startAngle = 0
  const endAngle = (angle * Math.PI) / 180
  
  const x1 = cx + radius
  const y1 = cy
  const x2 = cx + radius * Math.cos(endAngle)
  const y2 = cy - radius * Math.sin(endAngle)
  
  const largeArcFlag = angle > 180 ? 1 : 0
  
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2}`
}
</script>

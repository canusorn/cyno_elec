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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Battery Charging Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Visual simulation of battery charging and discharging with RC circuit model
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-center text-lg font-mono font-bold text-gray-700 dark:text-gray-300">
              <span class="text-primary">V(t)</span> = V₀ + (V₁ - V₀) × (1 - e^(-t/RC))
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Battery Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔋 Battery Visualization
          </h3>
          
          <!-- Battery SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 700 400" class="w-full max-w-5xl h-auto">
              <!-- Battery Container -->
              <rect x="250" y="80" width="200" height="280" rx="15" 
                fill="#E5E7EB" stroke="#374151" stroke-width="4"/>
              
              <!-- Battery Terminal -->
              <rect x="320" y="50" width="60" height="30" rx="5" 
                fill="#374151" stroke="#374151" stroke-width="2"/>
              
              <!-- Battery Fill (SOC visualization) -->
              <rect x="255" y="85" :width="190" :height="socHeight" rx="10" 
                :fill="socColor" class="transition-all duration-300">
                <animate
                  attributeName="height"
                  :from="previousSocHeight"
                  :to="socHeight"
                  dur="0.5s"
                  fill="freeze"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.2 1"/>
              </rect>
              
              <!-- Battery Grid Lines -->
              <line x1="250" y1="150" x2="450" y2="150" stroke="#374151" stroke-width="1" stroke-dasharray="5 5" opacity="0.3"/>
              <line x1="250" y1="220" x2="450" y2="220" stroke="#374151" stroke-width="1" stroke-dasharray="5 5" opacity="0.3"/>
              <line x1="250" y1="290" x2="450" y2="290" stroke="#374151" stroke-width="1" stroke-dasharray="5 5" opacity="0.3"/>
              
              <!-- Percentage Labels -->
              <text x="470" y="150" font-size="12" fill="#6B7280">100%</text>
              <text x="470" y="220" font-size="12" fill="#6B7280">66%</text>
              <text x="470" y="290" font-size="12" fill="#6B7280">33%</text>
              <text x="470" y="355" font-size="12" fill="#6B7280">0%</text>
              
              <!-- SOC Display -->
              <text x="350" y="220" text-anchor="middle" font-size="36" font-weight="bold" 
                :fill="socTextColor" class="transition-all duration-300">
                {{ socDisplay }}%
              </text>
              
              <!-- Charging Animation -->
              <g v-if="isCharging && soc < 100">
                <path d="M 500 120 Q 520 130 500 140" stroke="#10B981" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
                </path>
                <path d="M 520 130 Q 540 140 520 150" stroke="#10B981" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.2s" repeatCount="indefinite"/>
                </path>
                <path d="M 540 140 Q 560 150 540 160" stroke="#10B981" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite"/>
                </path>
                <text x="530" y="180" text-anchor="middle" font-size="14" fill="#10B981" font-weight="bold">
                  CHARGING
                </text>
              </g>
              
              <!-- Discharging Animation -->
              <g v-if="isDischarging && soc > 0">
                <path d="M 500 140 Q 480 130 500 120" stroke="#EF4444" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
                </path>
                <path d="M 520 150 Q 500 140 520 130" stroke="#EF4444" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.2s" repeatCount="indefinite"/>
                </path>
                <path d="M 540 160 Q 520 150 540 140" stroke="#EF4444" stroke-width="3" fill="none" opacity="0.8">
                  <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite"/>
                </path>
                <text x="530" y="180" text-anchor="middle" font-size="14" fill="#EF4444" font-weight="bold">
                  DISCHARGING
                </text>
              </g>
              
              <!-- Circuit Diagram (Left Side) -->
              <g transform="translate(30, 100)">
                <text x="80" y="-10" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">
                  RC Circuit Model
                </text>
                
                <!-- Voltage Source -->
                <circle cx="80" cy="30" r="25" fill="white" stroke="#2563EB" stroke-width="3"/>
                <text x="80" y="35" text-anchor="middle" font-size="12" font-weight="bold" fill="#2563EB">
                  {{ isCharging ? voltageSource : '0' }}V
                </text>
                
                <!-- Resistor -->
                <rect x="65" y="70" width="30" height="40" fill="white" stroke="#DC2626" stroke-width="2" rx="3"/>
                <text x="80" y="95" text-anchor="middle" font-size="10" fill="#DC2626">R</text>
                
                <!-- Capacitor -->
                <line x1="60" y1="140" x2="100" y2="140" stroke="#7C3AED" stroke-width="4"/>
                <line x1="60" y1="148" x2="100" y2="148" stroke="#7C3AED" stroke-width="4"/>
                <text x="50" y="148" text-anchor="end" font-size="10" fill="#7C3AED">C</text>
                
                <!-- Wires -->
                <line x1="80" y1="55" x2="80" y2="70" stroke="#374151" stroke-width="2"/>
                <line x1="80" y1="110" x2="80" y2="140" stroke="#374151" stroke-width="2"/>
                
                <!-- Current Flow -->
                <circle v-if="isCharging || isDischarging" r="4" fill="#F59E0B">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#circuitPath"/>
                  </animateMotion>
                </circle>
                
                <path id="circuitPath" d="M 80 5 L 80 70 L 80 110 L 80 165 L 80 200 L 80 165 L 80 140" fill="none" stroke="none"/>
              </g>
              
              <!-- Info Panel (Right Side) -->
              <g transform="translate(480, 200)">
                <rect width="180" height="150" fill="white" stroke="#E5E7EB" stroke-width="2" rx="5"/>
                <text x="90" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">
                  Battery Status
                </text>
                
                <text x="15" y="50" font-size="12" fill="#6B7280">Voltage:</text>
                <text x="165" y="50" text-anchor="end" font-size="12" font-weight="bold" fill="#2563EB">
                  {{ batteryVoltage.toFixed(2) }}V
                </text>
                
                <text x="15" y="75" font-size="12" fill="#6B7280">Current:</text>
                <text x="165" y="75" text-anchor="end" font-size="12" font-weight="bold" fill="#DC2626">
                  {{ current.toFixed(3) }}A
                </text>
                
                <text x="15" y="100" font-size="12" fill="#6B7280">Capacity:</text>
                <text x="165" y="100" text-anchor="end" font-size="12" font-weight="bold" fill="#059669">
                  {{ currentCapacity.toFixed(2) }}Ah
                </text>
                
                <text x="15" y="125" font-size="12" fill="#6B7280">Time Constant:</text>
                <text x="165" y="125" text-anchor="end" font-size="12" font-weight="bold" fill="#7C3AED">
                  {{ timeConstant.toFixed(1) }}s
                </text>
                
                <text x="15" y="145" font-size="11" fill="#9CA3AF">
                  τ = R × C = {{ timeConstant.toFixed(1) }}s
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Controls Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Battery Parameters -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Battery Parameters</h3>
              
              <!-- Capacity -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Battery Capacity (Ah): {{ capacity }} Ah
                </label>
                <input
                  v-model.number="capacity"
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  class="w-full accent-primary"
                />
              </div>

              <!-- Max Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Voltage (V): {{ maxVoltage }} V
                </label>
                <input
                  v-model.number="maxVoltage"
                  type="range"
                  min="3.7"
                  max="48"
                  step="0.1"
                  class="w-full accent-primary"
                />
              </div>

              <!-- Internal Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Internal Resistance (Ω): {{ internalResistance }} Ω
                </label>
                <input
                  v-model.number="internalResistance"
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  class="w-full accent-primary"
                />
              </div>

              <!-- Charging Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Charging Current (A): {{ chargingCurrent }} A
                </label>
                <input
                  v-model.number="chargingCurrent"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full accent-primary"
                />
              </div>

              <!-- Discharging Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Discharging Current (A): {{ dischargingCurrent }} A
                </label>
                <input
                  v-model.number="dischargingCurrent"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full accent-primary"
                />
              </div>
            </div>

            <!-- Control Panel -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Control Panel</h3>
              
              <!-- Mode Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Operation Mode
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    @click="setMode('charging')"
                    :class="[
                      'px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      isCharging 
                        ? 'bg-green-500 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    ⚡ Charge
                  </button>
                  <button 
                    @click="setMode('discharging')"
                    :class="[
                      'px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      isDischarging 
                        ? 'bg-red-500 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    🔋 Discharge
                  </button>
                  <button 
                    @click="setMode('idle')"
                    :class="[
                      'px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      isIdle 
                        ? 'bg-blue-500 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    ⏸️ Idle
                  </button>
                </div>
              </div>

              <!-- Time Scale -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Simulation Speed: {{ timeScale }}x
                </label>
                <input
                  v-model.number="timeScale"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full accent-primary"
                />
              </div>

              <!-- Quick Actions -->
              <div class="grid grid-cols-2 gap-2 mb-6">
                <button 
                  @click="resetBattery"
                  class="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
                >
                  🔄 Reset to 0%
                </button>
                <button 
                  @click="fullCharge"
                  class="px-4 py-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-200 font-medium"
                >
                  🔋 Full Charge
                </button>
              </div>

              <!-- Voltage-Time Curve -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-gray-200 mb-3">📈 Voltage vs Time</h4>
                <svg viewBox="0 0 300 150" class="w-full h-auto">
                  <!-- Axes -->
                  <line x1="40" y1="130" x2="290" y2="130" stroke="#374151" stroke-width="2"/>
                  <line x1="40" y1="130" x2="40" y2="10" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Grid lines -->
                  <line x1="40" y1="70" x2="290" y2="70" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="3 3"/>
                  <line x1="165" y1="10" x2="165" y2="130" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="3 3"/>
                  
                  <!-- Charging curve (exponential) -->
                  <path v-if="isCharging"
                    d="M 40 130 Q 100 30 200 20"
                    fill="none"
                    stroke="#10B981"
                    stroke-width="3"/>
                  
                  <!-- Discharging curve (exponential) -->
                  <path v-if="isDischarging"
                    d="M 40 20 Q 100 120 200 130"
                    fill="none"
                    stroke="#EF4444"
                    stroke-width="3"/>
                  
                  <!-- Current voltage point -->
                  <circle 
                    :cx="40 + (soc / 100) * 250"
                    :cy="130 - (batteryVoltage / maxVoltage) * 120"
                    r="5"
                    :fill="isCharging ? '#10B981' : isDischarging ? '#EF4444' : '#6B7280'"
                    stroke="white"
                    stroke-width="2"/>
                  
                  <!-- Axis Labels -->
                  <text x="165" y="145" text-anchor="middle" font-size="10" fill="#6B7280">Time</text>
                  <text x="20" y="70" text-anchor="middle" font-size="10" fill="#6B7280" transform="rotate(-90, 20, 70)">Voltage</text>
                </svg>
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
            📚 Understanding Battery Charging
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">RC Circuit Model</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Battery charging can be modeled as an RC circuit where the battery acts like a capacitor. 
              The charging follows an exponential curve determined by the time constant τ = R × C.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Charging Equation</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>V(t) = V₀ + (V₁ - V₀) × (1 - e^(-t/τ))</p>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Where V₀ = initial voltage, V₁ = final voltage, τ = time constant
              </p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Time Constant (τ)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The time constant represents the time to reach 63.2% of the final voltage. After 5τ, 
              the battery is considered fully charged (99.3%).
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">State of Charge (SOC)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              SOC represents the current charge level as a percentage of total capacity. It's calculated 
              from the current voltage relative to the maximum voltage:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>SOC (%) = (Current Voltage / Max Voltage) × 100</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Charging Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Higher charging current charges faster but generates more heat</li>
              <li>Internal resistance affects charging efficiency and voltage drop</li>
              <li>Most batteries should not be charged below 0°C or above 45°C</li>
              <li>Avoid deep discharges for longer battery life</li>
              <li>Use the manufacturer's recommended charging voltage</li>
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

// SEO
useHead({
  title: 'Battery Charging Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of battery charging and discharging with RC circuit model. Visual representation of voltage curves and state of charge.' },
    { name: 'keywords', content: 'battery charging, RC circuit, battery simulation, SOC, charging curve, voltage vs time' }
  ]
})

const $colorMode = useColorMode()

// Battery parameters
const capacity = ref(5) // Ah
const maxVoltage = ref(12) // V
const internalResistance = ref(0.1) // Ohms
const chargingCurrent = ref(1) // A
const dischargingCurrent = ref(1) // A
const timeScale = ref(10) // Simulation speed multiplier

// State
const mode = ref('idle') // 'charging', 'discharging', 'idle'
const soc = ref(50) // State of charge percentage
const voltageSource = ref(13.8) // Charging voltage

// Computed properties
const isCharging = computed(() => mode.value === 'charging')
const isDischarging = computed(() => mode.value === 'discharging')
const isIdle = computed(() => mode.value === 'idle')

const batteryVoltage = computed(() => {
  return (soc.value / 100) * maxVoltage.value
})

const currentCapacity = computed(() => {
  return (soc.value / 100) * capacity.value
})

const timeConstant = computed(() => {
  // τ = R × C (in seconds)
  // For battery, we estimate C from capacity and voltage
  const capacitance = (capacity.value * 3600) / maxVoltage.value // Farads
  return internalResistance.value * capacitance
})

const current = computed(() => {
  if (isIdle.value) return 0
  if (isCharging.value) return chargingCurrent.value
  if (isDischarging.value) return -dischargingCurrent.value
  return 0
})

const socDisplay = computed(() => Math.round(soc.value))

const socHeight = computed(() => {
  return (soc.value / 100) * 270
})

const previousSocHeight = ref(socHeight.value)

const socColor = computed(() => {
  if (soc.value > 60) return '#10B981' // Green
  if (soc.value > 30) return '#F59E0B' // Orange
  return '#EF4444' // Red
})

const socTextColor = computed(() => {
  if (soc.value > 50) return '#FFFFFF'
  return '#374151'
})

// Methods
function setMode(newMode) {
  mode.value = newMode
}

function resetBattery() {
  soc.value = 0
}

function fullCharge() {
  soc.value = 100
}

// Simulation loop
let simulationInterval = null

onMounted(() => {
  simulationInterval = setInterval(() => {
    if (isCharging.value && soc.value < 100) {
      // Calculate charge based on RC circuit model
      // The rate decreases as we approach full charge
      const remainingCharge = 100 - soc.value
      const chargeRate = (chargingCurrent.value / capacity.value) * 100 * (timeScale.value / 60)
      
      // Exponential charging curve
      const exponentialFactor = 1 - Math.exp(-remainingCharge / 20)
      soc.value += chargeRate * exponentialFactor
      
      if (soc.value > 100) soc.value = 100
    } else if (isDischarging.value && soc.value > 0) {
      // Linear discharging
      const dischargeRate = (dischargingCurrent.value / capacity.value) * 100 * (timeScale.value / 60)
      soc.value -= dischargeRate
      
      if (soc.value < 0) soc.value = 0
    }
  }, 100)
})

onUnmounted(() => {
  if (simulationInterval) {
    clearInterval(simulationInterval)
  }
})

// Watch for soc changes to animate
watch(soc, () => {
  previousSocHeight.value = socHeight.value
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
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

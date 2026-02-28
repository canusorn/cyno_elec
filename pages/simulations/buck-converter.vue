<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Buck Converter Simulation
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Step-down DC-DC converter with duty cycle control
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Control Panel -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Parameters
          </h2>

          <!-- Input Voltage -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Voltage (Vin): <span class="text-blue-600 font-bold">{{ inputVoltage }}V</span>
            </label>
            <input
              v-model.number="inputVoltage"
              type="range"
              min="5"
              max="48"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5V</span>
              <span>48V</span>
            </div>
          </div>

          <!-- Duty Cycle -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duty Cycle (D): <span class="text-purple-600 font-bold">{{ (dutyCycle * 100).toFixed(1) }}%</span>
            </label>
            <input
              v-model.number="dutyCycle"
              type="range"
              min="0.1"
              max="0.9"
              step="0.01"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10%</span>
              <span>90%</span>
            </div>
          </div>

          <!-- Switching Frequency -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Switching Frequency: <span class="text-green-600 font-bold">{{ switchingFrequency }} kHz</span>
            </label>
            <input
              v-model.number="switchingFrequency"
              type="range"
              min="10"
              max="500"
              step="10"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10 kHz</span>
              <span>500 kHz</span>
            </div>
          </div>

          <!-- Inductance -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inductance (L): <span class="text-orange-600 font-bold">{{ inductance }} µH</span>
            </label>
            <input
              v-model.number="inductance"
              type="range"
              min="10"
              max="1000"
              step="10"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10 µH</span>
              <span>1000 µH</span>
            </div>
          </div>

          <!-- Load Resistance -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Load Resistance: <span class="text-red-600 font-bold">{{ loadResistance }} Ω</span>
            </label>
            <input
              v-model.number="loadResistance"
              type="range"
              min="1"
              max="100"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>100Ω</span>
            </div>
          </div>

          <!-- Switch Animation Control -->
          <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Switch Animation</span>
            <button
              @click="isRunning = !isRunning"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-colors',
                isRunning
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ isRunning ? 'Running' : 'Paused' }}
            </button>
          </div>
        </div>

        <!-- Visualization Panel -->
        <div class="space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-4">
              <svg viewBox="0 0 400 250" class="w-full h-auto">
                <!-- Input Voltage Source -->
                <circle cx="60" cy="125" r="20" fill="white" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <text x="60" y="130" text-anchor="middle" :fill="switchState ? '#3B82F6' : '#94A3B8'" font-size="14" font-weight="bold">Vin</text>
                <text x="60" y="160" text-anchor="middle" fill="#6B7280" font-size="10">{{ inputVoltage }}V</text>

                <!-- Main Power Lines -->
                <line x1="80" y1="90" x2="350" y2="90" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <line x1="60" y1="145" x2="60" y2="210" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <line x1="60" y1="210" x2="350" y2="210" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>

                <!-- Switch (MOSFET) -->
                <g transform="translate(120, 90)">
                  <rect x="-15" y="-8" width="30" height="16" fill="white" :stroke="switchState ? '#10B981' : '#EF4444'" stroke-width="2" rx="2"/>
                  <text x="0" y="4" text-anchor="middle" :fill="switchState ? '#10B981' : '#EF4444'" font-size="10" font-weight="bold">Q1</text>
                  <line x1="0" y1="8" x2="0" y2="25" :stroke="switchState ? '#10B981' : '#EF4444'" stroke-width="3"/>
                </g>

                <!-- Diode -->
                <g transform="translate(120, 150)">
                  <polygon points="0,-10 12,0 0,10" fill="white" :stroke="switchState ? '#94A3B8' : '#10B981'" stroke-width="2"/>
                  <line x1="12" y1="-10" x2="12" y2="10" :stroke="switchState ? '#94A3B8' : '#10B981'" stroke-width="3"/>
                  <text x="20" y="4" fill="#6B7280" font-size="10">D1</text>
                </g>

                <!-- Inductor -->
                <g transform="translate(200, 90)">
                  <path d="M0,0 Q10,-15 20,0 Q30,-15 40,0 Q50,-15 60,0" fill="none" :stroke="switchState ? '#F59E0B' : '#94A3B8'" stroke-width="3"/>
                  <text x="30" y="-20" text-anchor="middle" fill="#6B7280" font-size="10">{{ inductance }}µH</text>
                </g>

                <!-- Capacitor -->
                <g transform="translate(300, 150)">
                  <line x1="0" y1="-15" x2="0" y2="15" :stroke="switchState ? '#8B5CF6' : '#94A3B8'" stroke-width="3"/>
                  <line x1="8" y1="-15" x2="8" y2="15" :stroke="switchState ? '#8B5CF6' : '#94A3B8'" stroke-width="3"/>
                  <text x="15" y="4" fill="#6B7280" font-size="10">C</text>
                </g>

                <!-- Load Resistor -->
                <g transform="translate(350, 150)">
                  <rect x="-10" y="-25" width="20" height="50" fill="white" :stroke="switchState ? '#EF4444' : '#94A3B8'" stroke-width="2"/>
                  <text x="0" y="4" text-anchor="middle" :fill="switchState ? '#EF4444' : '#94A3B8'" font-size="10" font-weight="bold">{{ loadResistance }}Ω</text>
                </g>

                <!-- Connection from inductor to output -->
                <line x1="260" y1="90" x2="350" y2="90" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <line x1="350" y1="90" x2="350" y2="125" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>

                <!-- Connection from load to ground -->
                <line x1="350" y1="175" x2="350" y2="210" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>

                <!-- Connection from diode/capacitor junction to ground -->
                <line x1="120" y1="160" x2="120" y2="210" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <line x1="300" y1="165" x2="300" y2="210" :stroke="switchState ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>

                <!-- Current Flow Animation -->
                <circle v-if="isRunning && switchState" cx="180" cy="90" r="4" fill="#3B82F6">
                  <animate attributeName="cx" values="140;240;140" dur="1s" repeatCount="indefinite"/>
                </circle>

                <!-- State Indicator -->
                <text x="200" y="240" text-anchor="middle" :fill="switchState ? '#10B981' : '#EF4444'" font-size="12" font-weight="bold">
                  Switch: {{ switchState ? 'ON' : 'OFF' }}
                </text>
              </svg>
            </div>
          </div>

          <!-- Results -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Results</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Output Voltage</p>
                <p class="text-2xl font-bold text-blue-600">{{ outputVoltage.toFixed(2) }} V</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Output Current</p>
                <p class="text-2xl font-bold text-purple-600">{{ outputCurrent.toFixed(2) }} A</p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Output Power</p>
                <p class="text-2xl font-bold text-green-600">{{ outputPower.toFixed(2) }} W</p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
                <p class="text-2xl font-bold text-orange-600">{{ efficiency.toFixed(1) }}%</p>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Ripple Current</p>
                <p class="text-2xl font-bold text-red-600">{{ rippleCurrent.toFixed(3) }} A</p>
              </div>
              <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">Period</p>
                <p class="text-2xl font-bold text-cyan-600">{{ period.toFixed(2) }} µs</p>
              </div>
            </div>
          </div>

          <!-- Waveforms -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Voltage Waveforms</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <svg viewBox="0 0 400 150" class="w-full h-auto">
                <!-- Grid lines -->
                <line x1="50" y1="30" x2="50" y2="120" stroke="#E5E7EB" stroke-width="1"/>
                <line x1="50" y1="120" x2="380" y2="120" stroke="#E5E7EB" stroke-width="1"/>

                <!-- Input Voltage (Vin) - Blue -->
                <path
                  :d="generateVinWaveform()"
                  fill="none"
                  stroke="#3B82F6"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />

                <!-- Output Voltage (Vout) - Green -->
                <path
                  :d="generateVoutWaveform()"
                  fill="none"
                  stroke="#10B981"
                  stroke-width="3"
                />

                <!-- Switch State - Red -->
                <path
                  :d="generateSwitchWaveform()"
                  fill="none"
                  stroke="#EF4444"
                  stroke-width="2"
                  stroke-dasharray="2,2"
                />

                <!-- Labels -->
                <text x="10" y="35" fill="#3B82F6" font-size="9" font-weight="bold">Vin</text>
                <text x="10" y="80" fill="#10B981" font-size="9" font-weight="bold">Vout</text>
                <text x="10" y="110" fill="#EF4444" font-size="9" font-weight="bold">SW</text>

                <!-- Time markers -->
                <text x="50" y="140" fill="#6B7280" font-size="8">0</text>
                <text x="140" y="140" fill="#6B7280" font-size="8">{{ (period / 4).toFixed(1) }}µs</text>
                <text x="230" y="140" fill="#6B7280" font-size="8">{{ (period / 2).toFixed(1) }}µs</text>
                <text x="320" y="140" fill="#6B7280" font-size="8">{{ (3 * period / 4).toFixed(1) }}µs</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Buck Converters</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Formulas</h3>
            <div class="space-y-3">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Voltage</p>
                <p class="text-lg font-mono font-bold text-blue-600">Vout = D × Vin</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Where D is the duty cycle (0 to 1)</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Current</p>
                <p class="text-lg font-mono font-bold text-purple-600">Iout = Vout / Rload</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ripple Current</p>
                <p class="text-lg font-mono font-bold text-red-600">ΔIL = (Vin - Vout) × D / (L × f)</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">How It Works</h3>
            <div class="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                <strong class="text-gray-900 dark:text-white">Switch ON State:</strong> Current flows from Vin through the switch and inductor to the load. The inductor stores energy in its magnetic field.
              </p>
              <p>
                <strong class="text-gray-900 dark:text-white">Switch OFF State:</strong> The inductor releases stored energy, maintaining current flow to the load through the diode (freewheeling diode).
              </p>
              <p>
                <strong class="text-gray-900 dark:text-white">Output Capacitor:</strong> Smooths the output voltage by filtering the ripple current from the inductor.
              </p>
              <p>
                <strong class="text-gray-900 dark:text-white">Duty Cycle Control:</strong> By varying the duty cycle (D), the output voltage can be precisely controlled: Vout = D × Vin
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Applications</h4>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Battery-powered devices (step-down from battery voltage)</li>
            <li>• Computer motherboards (CPU voltage regulation)</li>
            <li>• LED drivers (constant current regulation)</li>
            <li>• Automotive electronics (12V to 5V/3.3V conversion)</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

const colorMode = useColorMode()

// Input parameters
const inputVoltage = ref(12)
const dutyCycle = ref(0.5)
const switchingFrequency = ref(100)
const inductance = ref(100)
const loadResistance = ref(10)

// Animation state
const isRunning = ref(true)
const switchState = ref(true)

// Calculated values
const outputVoltage = computed(() => {
  return inputVoltage.value * dutyCycle.value
})

const outputCurrent = computed(() => {
  return outputVoltage.value / loadResistance.value
})

const outputPower = computed(() => {
  return outputVoltage.value * outputCurrent.value
})

const efficiency = computed(() => {
  // Simplified efficiency model (real efficiency depends on many factors)
  const baseEfficiency = 0.95
  const loadFactor = Math.min(outputCurrent.value / 5, 1) // Optimal at 5A
  return (baseEfficiency - 0.05 * (1 - loadFactor)) * 100
})

const rippleCurrent = computed(() => {
  const period = 1 / (switchingFrequency.value * 1000)
  const onTime = dutyCycle.value * period
  const deltaV = inputVoltage.value - outputVoltage.value
  return (deltaV * onTime) / (inductance.value * 1e-6)
})

const period = computed(() => {
  return (1 / (switchingFrequency.value * 1000)) * 1e6 // in microseconds
})

// Waveform generators
const generateVinWaveform = () => {
  const points = []
  const vinY = 30
  for (let i = 0; i <= 330; i += 10) {
    points.push(`${50 + i},${vinY}`)
  }
  return 'M ' + points.join(' L ')
}

const generateVoutWaveform = () => {
  const points = []
  const voutY = 80
  const ripple = 5 // Visual ripple
  for (let i = 0; i <= 330; i += 10) {
    const y = voutY + ripple * Math.sin((i / 330) * Math.PI * 4)
    points.push(`${50 + i},${y}`)
  }
  return 'M ' + points.join(' L ')
}

const generateSwitchWaveform = () => {
  const points = []
  const onY = 60
  const offY = 115
  const dutyPoints = Math.floor(330 * dutyCycle.value)
  let i = 0

  while (i <= 330) {
    const cycleWidth = 100
    const onWidth = cycleWidth * dutyCycle.value
    const cycleStart = Math.floor(i / cycleWidth) * cycleWidth

    if (i % cycleWidth < onWidth) {
      points.push(`${50 + i},${onY}`)
    } else {
      points.push(`${50 + i},${offY}`)
    }
    i += 5
  }

  return 'M ' + points.join(' L ')
}

// Animation loop
let animationInterval: number | null = null

const animate = () => {
  if (!isRunning.value) return

  const periodMs = (1 / (switchingFrequency.value * 1000)) * 1000
  const onTime = periodMs * dutyCycle.value

  animationInterval = setInterval(() => {
    if (isRunning.value) {
      switchState.value = !switchState.value
    }
  }, onTime) as unknown as number
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationInterval !== null) {
    clearInterval(animationInterval)
  }
})

// SEO
useHead({
  title: 'Buck Converter Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive buck converter (step-down DC-DC converter) simulation with duty cycle control and real-time waveforms.' }
  ]
})
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Input parameters
const inputVoltage = ref(12)
const outputVoltageTarget = ref(-24)
const dutyCycle = ref(66.7)
const switchingFrequency = ref(100)
const inductanceL1 = ref(100)
const inductanceL2 = ref(100)
const capacitanceC1 = ref(47)
const capacitanceC2 = ref(100)
const loadResistance = ref(10)
const isRunning = ref(true)

// Computed values
const dutyCycleDecimal = computed(() => dutyCycle.value / 100)
const outputVoltageActual = computed(() => {
  const d = dutyCycleDecimal.value
  return inputVoltage.value * (d / (1 - d))
})

const inputCurrent = ref(2.5)
const outputCurrent = ref(2.4)
const capacitorC1Voltage = ref(36)
const inductorL1Current = ref(2.5)
const inductorL2Current = ref(2.4)

// Component ratings
const peakInductorCurrentL1 = computed(() => inputCurrent.value * 1.3)
const peakInductorCurrentL2 = computed(() => outputCurrent.value * 1.3)
const rmsCapacitorCurrent = computed(() => Math.sqrt(
  Math.pow(inputCurrent.value, 2) + Math.pow(outputCurrent.value, 2)
))
const peakSwitchCurrent = computed(() => peakInductorCurrentL1.value)
const peakDiodeCurrent = computed(() => peakInductorCurrentL2.value)

// Power calculations
const inputPower = computed(() => inputVoltage.value * inputCurrent.value)
const outputPower = computed(() => Math.abs(outputVoltageActual.value) * outputCurrent.value)
const efficiency = computed(() => {
  if (inputPower.value === 0) return 0
  return (outputPower.value / inputPower.value) * 100
})

// Operating mode
const operatingMode = computed(() => {
  const rippleL1 = (inputVoltage.value * dutyCycleDecimal.value) / (inductanceL1.value * switchingFrequency.value * 1000)
  const rippleL2 = (Math.abs(outputVoltageActual.value) * (1 - dutyCycleDecimal.value)) / (inductanceL2.value * switchingFrequency.value * 1000)
  
  if (inputCurrent.value > rippleL1 / 2 && outputCurrent.value > rippleL2 / 2) {
    return 'CCM'
  } else {
    return 'DCM'
  }
})

// Waveform data for visualization
const timePoints = ref(100)
const waveformData = computed(() => {
  const points = []
  const d = dutyCycleDecimal.value
  const period = 1 / switchingFrequency.value
  
  for (let i = 0; i < timePoints.value; i++) {
    const t = (i / timePoints.value) * period
    const phase = (t / period) % 1
    
    let switchState = phase < d ? 1 : 0
    let iL1 = inductorL1Current.value
    let iL2 = inductorL2Current.value
    let vC1 = capacitorC1Voltage.value
    
    if (switchState === 1) {
      // Switch ON
      iL1 += (inputVoltage.value / inductanceL1.value) * (t % (period * d))
      iL2 -= (vC1 / inductanceL2.value) * (t % (period * d))
    } else {
      // Switch OFF
      iL1 -= ((vC1 - inputVoltage.value) / inductanceL1.value) * ((t - period * d) % (period * (1 - d)))
      iL2 += (Math.abs(outputVoltageActual.value) / inductanceL2.value) * ((t - period * d) % (period * (1 - d)))
    }
    
    points.push({
      time: t * 1000000,
      switchState,
      iL1: Math.max(0, iL1),
      iL2: Math.max(0, iL2),
      vC1
    })
  }
  
  return points
})

// Auto-update current values based on power balance
watch([inputVoltage, outputVoltageActual, loadResistance], () => {
  const vOut = Math.abs(outputVoltageActual.value)
  outputCurrent.value = vOut / loadResistance.value
  inputCurrent.value = (outputPower.value / (inputVoltage.value * (efficiency.value / 100)))
})

// Duty cycle adjustment
watch([outputVoltageTarget, inputVoltage], () => {
  if (inputVoltage.value > 0 && outputVoltageTarget.value !== 0) {
    if (outputVoltageTarget.value < 0) {
      // Inverting output (Ćuk characteristic)
      const vOutMag = Math.abs(outputVoltageTarget.value)
      dutyCycle.value = (vOutMag / (inputVoltage.value + vOutMag)) * 100
    }
  }
})

// Component stress levels
const getStressLevel = (value: number, max: number) => {
  const ratio = value / max
  if (ratio < 0.7) return 'safe'
  if (ratio < 0.9) return 'warning'
  return 'critical'
}

const switchStress = computed(() => getStressLevel(peakSwitchCurrent.value, 10))
const diodeStress = computed(() => getStressLevel(peakDiodeCurrent.value, 10))
const capStress = computed(() => getStressLevel(rmsCapacitorCurrent.value, 5))
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Ćuk Converter Simulation</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Interactive DC-DC converter simulation with inverting voltage capability and continuous input/output currents
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Controls Panel -->
      <div class="lg:col-span-1 space-y-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">⚡</span> Input Parameters
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Input Voltage (Vin): {{ inputVoltage }} V
              </label>
              <input
                v-model.number="inputVoltage"
                type="range"
                min="3"
                max="48"
                step="0.5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>3V</span>
                <span>48V</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Output Voltage: {{ outputVoltageTarget }} V
              </label>
              <input
                v-model.number="outputVoltageTarget"
                type="range"
                min="-48"
                max="-3"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>-48V</span>
                <span>-3V</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Inverting output (negative voltage)</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duty Cycle: {{ dutyCycle.toFixed(1) }} %
              </label>
              <input
                v-model.number="dutyCycle"
                type="range"
                min="10"
                max="90"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>10%</span>
                <span>90%</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Switching Frequency: {{ switchingFrequency }} kHz
              </label>
              <input
                v-model.number="switchingFrequency"
                type="range"
                min="10"
                max="500"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>10kHz</span>
                <span>500kHz</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">🔧</span> Components
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Inductor L1: {{ inductanceL1 }} µH
              </label>
              <input
                v-model.number="inductanceL1"
                type="range"
                min="10"
                max="1000"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p class="text-xs text-gray-500 mt-1">Input inductor</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Inductor L2: {{ inductanceL2 }} µH
              </label>
              <input
                v-model.number="inductanceL2"
                type="range"
                min="10"
                max="1000"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p class="text-xs text-gray-500 mt-1">Output inductor</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Capacitor C1: {{ capacitanceC1 }} µF
              </label>
              <input
                v-model.number="capacitanceC1"
                type="range"
                min="1"
                max="470"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p class="text-xs text-gray-500 mt-1">Energy transfer capacitor</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Capacitor C2: {{ capacitanceC2 }} µF
              </label>
              <input
                v-model.number="capacitanceC2"
                type="range"
                min="10"
                max="1000"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <p class="text-xs text-gray-500 mt-1">Output filter capacitor</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Load Resistance: {{ loadResistance }} Ω
              </label>
              <input
                v-model.number="loadResistance"
                type="range"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1Ω</span>
                <span>100Ω</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Visualization Panel -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Results Overview -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📊</span> Performance Metrics
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Output Voltage</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ outputVoltageActual.toFixed(1) }} V
              </p>
            </div>

            <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Input Current</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                {{ inputCurrent.toFixed(2) }} A
              </p>
            </div>

            <div class="bg-purple-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Output Current</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ outputCurrent.toFixed(2) }} A
              </p>
            </div>

            <div class="bg-orange-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Efficiency</p>
              <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {{ efficiency.toFixed(1) }} %
              </p>
            </div>
          </div>

          <div class="mt-4 p-3 rounded-lg" :class="operatingMode === 'CCM' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'">
            <p class="text-sm font-semibold" :class="operatingMode === 'CCM' ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'">
              Operating Mode: {{ operatingMode === 'CCM' ? 'Continuous Conduction Mode' : 'Discontinuous Conduction Mode' }}
            </p>
          </div>
        </div>

        <!-- Circuit Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">🔌</span> Ćuk Converter Topology
          </h2>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 800 400" class="w-full h-auto">
              <!-- Grid background -->
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.3)" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#smallGrid)" />

              <!-- Title -->
              <text x="400" y="30" text-anchor="middle" class="text-lg font-semibold" fill="currentColor">
                Ćuk Converter Schematic
              </text>

              <!-- Input Source -->
              <g transform="translate(80, 200)">
                <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                <text x="-5" y="5" font-size="20" fill="currentColor">~</text>
                <text x="0" y="40" text-anchor="middle" font-size="14" fill="currentColor">Vin</text>
                <text x="0" y="55" text-anchor="middle" font-size="12" fill="currentColor">{{ inputVoltage }}V</text>
              </g>

              <!-- Input connection -->
              <line x1="105" y1="200" x2="150" y2="200" stroke="currentColor" stroke-width="2"/>

              <!-- Inductor L1 -->
              <g transform="translate(200, 200)">
                <rect x="-30" y="-15" width="60" height="30" fill="none" stroke="currentColor" stroke-width="2" rx="5"/>
                <path d="M -20 -8 Q -10 -15, 0 -8 Q 10 -15, 20 -8" fill="none" stroke="currentColor" stroke-width="2"/>
                <text x="0" y="40" text-anchor="middle" font-size="14" fill="currentColor">L1</text>
                <text x="0" y="55" text-anchor="middle" font-size="12" fill="currentColor">{{ inductanceL1 }}µH</text>
              </g>

              <!-- Connection to switch -->
              <line x1="230" y1="200" x2="300" y2="200" stroke="currentColor" stroke-width="2"/>

              <!-- Switch (Transistor) -->
              <g transform="translate(350, 200)">
                <line x1="-30" y1="0" x2="-10" y2="0" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="0" x2="30" y2="0" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="-15" x2="-10" y2="15" stroke="currentColor" stroke-width="3"/>
                <line x1="-10" y1="-10" x2="10" y2="-20" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="10" x2="10" y2="20" stroke="currentColor" stroke-width="2"/>
                <circle cx="0" cy="0" r="3" :fill="isRunning ? '#10B981' : '#EF4444'"/>
                <text x="0" y="45" text-anchor="middle" font-size="14" fill="currentColor">SW</text>
                <text x="0" y="-30" text-anchor="middle" font-size="11" :fill="isRunning ? '#10B981' : '#EF4444'">
                  {{ isRunning ? 'ON' : 'OFF' }}
                </text>
              </g>

              <!-- Connection to capacitor C1 -->
              <line x1="350" y1="185" x2="350" y2="120" stroke="currentColor" stroke-width="2"/>
              <line x1="350" y1="120" x2="400" y2="120" stroke="currentColor" stroke-width="2"/>

              <!-- Capacitor C1 -->
              <g transform="translate(430, 120)">
                <line x1="-10" y1="-20" x2="-10" y2="20" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="-20" x2="10" y2="20" stroke="currentColor" stroke-width="2"/>
                <line x1="-30" y1="0" x2="-10" y2="0" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="0" x2="30" y2="0" stroke="currentColor" stroke-width="2"/>
                <text x="0" y="40" text-anchor="middle" font-size="14" fill="currentColor">C1</text>
                <text x="0" y="55" text-anchor="middle" font-size="12" fill="currentColor">{{ capacitanceC1 }}µF</text>
              </g>

              <!-- Connection to diode -->
              <line x1="460" y1="120" x2="550" y2="120" stroke="currentColor" stroke-width="2"/>
              <line x1="550" y1="120" x2="550" y2="200" stroke="currentColor" stroke-width="2"/>

              <!-- Diode -->
              <g transform="translate(550, 230)">
                <polygon points="-10,-15 10,-15 0,0" fill="none" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="-15" x2="10" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="15" x2="10" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="0" y1="15" x2="0" y2="30" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="-15" x2="-10" y2="-30" stroke="currentColor" stroke-width="2"/>
                <text x="0" y="50" text-anchor="middle" font-size="14" fill="currentColor">D1</text>
              </g>

              <!-- Ground connection -->
              <line x1="350" y1="215" x2="350" y2="280" stroke="currentColor" stroke-width="2"/>
              <line x1="550" y1="260" x2="550" y2="280" stroke="currentColor" stroke-width="2"/>
              <line x1="330" y1="280" x2="570" y2="280" stroke="currentColor" stroke-width="2"/>
              <line x1="340" y1="285" x2="560" y2="285" stroke="currentColor" stroke-width="2"/>
              <line x1="350" y1="290" x2="550" y2="290" stroke="currentColor" stroke-width="2"/>

              <!-- Inductor L2 -->
              <g transform="translate(630, 200)">
                <rect x="-30" y="-15" width="60" height="30" fill="none" stroke="currentColor" stroke-width="2" rx="5"/>
                <path d="M -20 -8 Q -10 -15, 0 -8 Q 10 -15, 20 -8" fill="none" stroke="currentColor" stroke-width="2"/>
                <text x="0" y="40" text-anchor="middle" font-size="14" fill="currentColor">L2</text>
                <text x="0" y="55" text-anchor="middle" font-size="12" fill="currentColor">{{ inductanceL2 }}µH</text>
              </g>

              <!-- Connection from diode to L2 -->
              <line x1="550" y1="215" x2="600" y2="215" stroke="currentColor" stroke-width="2"/>
              <line x1="600" y1="215" x2="600" y2="200" stroke="currentColor" stroke-width="2"/>
              <line x1="600" y1="200" x2="600" y2="200" stroke="currentColor" stroke-width="2"/>

              <!-- Output Capacitor C2 -->
              <g transform="translate(700, 120)">
                <line x1="-10" y1="-20" x2="-10" y2="20" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="-20" x2="10" y2="20" stroke="currentColor" stroke-width="2"/>
                <line x1="-10" y1="0" x2="-30" y2="0" stroke="currentColor" stroke-width="2"/>
                <line x1="10" y1="0" x2="30" y2="0" stroke="currentColor" stroke-width="2"/>
                <text x="0" y="40" text-anchor="middle" font-size="14" fill="currentColor">C2</text>
                <text x="0" y="55" text-anchor="middle" font-size="12" fill="currentColor">{{ capacitanceC2 }}µF</text>
              </g>

              <!-- Connection from C1 junction to C2 -->
              <line x1="460" y1="120" x2="670" y2="120" stroke="currentColor" stroke-width="2"/>

              <!-- Output Load -->
              <g transform="translate(730, 200)">
                <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" rx="3"/>
                <line x1="-10" y1="-10" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/>
                <line x1="10" y1="-10" x2="-10" y2="10" stroke="currentColor" stroke-width="1.5"/>
                <text x="0" y="45" text-anchor="middle" font-size="14" fill="currentColor">Load</text>
                <text x="0" y="60" text-anchor="middle" font-size="12" fill="currentColor">{{ loadResistance }}Ω</text>
              </g>

              <!-- Connection from L2 to load -->
              <line x1="660" y1="200" x2="710" y2="200" stroke="currentColor" stroke-width="2"/>

              <!-- Output terminals -->
              <line x1="750" y1="200" x2="780" y2="200" stroke="currentColor" stroke-width="2"/>
              <line x1="730" y1="120" x2="780" y2="120" stroke="currentColor" stroke-width="2"/>
              <circle cx="785" cy="200" r="4" fill="#EF4444"/>
              <circle cx="785" cy="120" r="4" fill="#3B82F6"/>
              <text x="770" y="160" text-anchor="middle" font-size="14" fill="currentColor">Vout</text>
              <text x="750" y="180" text-anchor="middle" font-size="12" fill="#EF4444">-</text>
              <text x="750" y="135" text-anchor="middle" font-size="12" fill="#3B82F6">+</text>
            </svg>
          </div>
        </div>

        <!-- Waveforms -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📈</span> Current Waveforms
          </h2>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 700 300" class="w-full h-auto">
              <!-- Grid -->
              <defs>
                <pattern id="waveGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="700" height="300" fill="url(#waveGrid)" />

              <!-- Axis -->
              <line x1="50" y1="270" x2="680" y2="270" stroke="currentColor" stroke-width="1"/>
              <line x1="50" y1="30" x2="50" y2="270" stroke="currentColor" stroke-width="1"/>

              <!-- Labels -->
              <text x="350" y="290" text-anchor="middle" font-size="12" fill="currentColor">Time (µs)</text>
              <text x="20" y="150" text-anchor="middle" font-size="12" fill="currentColor" transform="rotate(-90, 20, 150)">Current (A)</text>

              <!-- Legend -->
              <g transform="translate(500, 40)">
                <rect x="0" y="0" width="15" height="4" fill="#3B82F6"/>
                <text x="20" y="6" font-size="11" fill="currentColor">iL1 (Input)</text>
                
                <rect x="0" y="15" width="15" height="4" fill="#10B981"/>
                <text x="20" y="21" font-size="11" fill="currentColor">iL2 (Output)</text>
              </g>

              <!-- Waveform paths -->
              <path
                :d="waveformData.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${50 + (p.time / (10000 / switchingFrequency)) * 600} ${270 - (p.iL1 / 5) * 200}`
                ).join(' ')"
                fill="none"
                stroke="#3B82F6"
                stroke-width="2"
              />

              <path
                :d="waveformData.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${50 + (p.time / (10000 / switchingFrequency)) * 600} ${270 - (p.iL2 / 5) * 200}`
                ).join(' ')"
                fill="none"
                stroke="#10B981"
                stroke-width="2"
                stroke-dasharray="5,5"
              />

              <!-- Current values -->
              <text x="660" y="270 - (inductorL1Current / 5) * 200" font-size="11" fill="#3B82F6" text-anchor="end">
                {{ inductorL1Current.toFixed(2) }}A
              </text>
              <text x="660" y="270 - (inductorL2Current / 5) * 200" font-size="11" fill="#10B981" text-anchor="end">
                {{ inductorL2Current.toFixed(2) }}A
              </text>
            </svg>
          </div>
        </div>

        <!-- Component Stress Analysis -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">⚠️</span> Component Stress Analysis
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg" :class="{
              'bg-green-100 dark:bg-green-900': switchStress === 'safe',
              'bg-yellow-100 dark:bg-yellow-900': switchStress === 'warning',
              'bg-red-100 dark:bg-red-900': switchStress === 'critical'
            }">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Switch Stress</h3>
              <p class="text-2xl font-bold" :class="{
                'text-green-600 dark:text-green-400': switchStress === 'safe',
                'text-yellow-600 dark:text-yellow-400': switchStress === 'warning',
                'text-red-600 dark:text-red-400': switchStress === 'critical'
              }">
                {{ peakSwitchCurrent.toFixed(2) }} A
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Peak current</p>
            </div>

            <div class="p-4 rounded-lg" :class="{
              'bg-green-100 dark:bg-green-900': diodeStress === 'safe',
              'bg-yellow-100 dark:bg-yellow-900': diodeStress === 'warning',
              'bg-red-100 dark:bg-red-900': diodeStress === 'critical'
            }">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Diode Stress</h3>
              <p class="text-2xl font-bold" :class="{
                'text-green-600 dark:text-green-400': diodeStress === 'safe',
                'text-yellow-600 dark:text-yellow-400': diodeStress === 'warning',
                'text-red-600 dark:text-red-400': diodeStress === 'critical'
              }">
                {{ peakDiodeCurrent.toFixed(2) }} A
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Peak current</p>
            </div>

            <div class="p-4 rounded-lg" :class="{
              'bg-green-100 dark:bg-green-900': capStress === 'safe',
              'bg-yellow-100 dark:bg-yellow-900': capStress === 'warning',
              'bg-red-100 dark:bg-red-900': capStress === 'critical'
            }">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Capacitor C1 RMS</h3>
              <p class="text-2xl font-bold" :class="{
                'text-green-600 dark:text-green-400': capStress === 'safe',
                'text-yellow-600 dark:text-yellow-400': capStress === 'warning',
                'text-red-600 dark:text-red-400': capStress === 'critical'
              }">
                {{ rmsCapacitorCurrent.toFixed(2) }} A
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">RMS current</p>
            </div>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📚</span> Learning Resources
          </h2>

          <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 class="font-semibold text-lg mb-2">What is a Ćuk Converter?</h3>
              <p class="text-sm leading-relaxed">
                The Ćuk converter (pronounced "chook") is a type of DC-DC converter that provides an output voltage 
                that can be greater than, less than, or equal to the input voltage magnitude, but with opposite polarity 
                (inverting configuration). It's named after its inventor, Slobodan Ćuk.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Key Advantages</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li>Continuous input and output currents (unlike buck-boost)</li>
                <li>Low input/output current ripple due to inductors on both sides</li>
                <li>Energy transfer capacitor provides isolation between input and output</li>
                <li>Can achieve high efficiency with proper component selection</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Voltage Conversion Formula</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm">
                Vout = Vin × (D / (1 - D))
              </div>
              <p class="text-xs mt-1">Where D is the duty cycle (0 to 1)</p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Operating States</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-blue-700 dark:text-blue-300 mb-1">State 1: Switch ON</p>
                  <ul class="text-xs space-y-1">
                    <li>• L1 charges from input source</li>
                    <li>• C1 transfers energy to L2</li>
                    <li>• Output capacitor supplies load</li>
                    <li>• Diode is reverse biased</li>
                  </ul>
                </div>
                <div class="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-green-700 dark:text-green-300 mb-1">State 2: Switch OFF</p>
                  <ul class="text-xs space-y-1">
                    <li>• L1 discharges into C1</li>
                    <li>• L2 supplies load current</li>
                    <li>• C1 transfers energy from L1 to L2</li>
                    <li>• Diode is forward biased</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Component Selection Guidelines</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li><strong>L1, L2:</strong> Choose to keep current ripple < 30% of average current</li>
                <li><strong>C1:</strong> Must handle high RMS current, low ESR is critical</li>
                <li><strong>C2:</strong> Output filter, larger value = lower voltage ripple</li>
                <li><strong>Switch:</strong> MOSFET with Vds rating > 2×Vin, low Rds(on)</li>
                <li><strong>Diode:</strong> Fast recovery or Schottky for high efficiency</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Design Tips</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li>Use coupled inductors for L1 and L2 to reduce ripple</li>
                <li>C1 voltage rating should be > Vin + |Vout|</li>
                <li>Higher switching frequency allows smaller inductors</li>
                <li>Mind diode reverse recovery losses at high frequencies</li>
                <li>Consider synchronous rectification for higher efficiency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        ⚡ Boost Converter Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Step-up DC-DC converter: Increase voltage with inductive energy storage
      </p>
    </div>

    <!-- Circuit Diagram -->
    <div class="circuit-diagram mb-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <!-- Input Voltage Source -->
        <g transform="translate(80, 200)">
          <circle r="35" fill="white" stroke="#3B82F6" stroke-width="3"/>
          <line x1="-15" y1="-8" x2="15" y2="-8" stroke="#3B82F6" stroke-width="3"/>
          <line x1="-10" y1="8" x2="10" y2="8" stroke="#3B82F6" stroke-width="2"/>
          <text x="0" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">
            V_IN = {{ inputVoltage }}V
          </text>
        </g>

        <!-- Inductor -->
        <g transform="translate(200, 100)">
          <text x="0" y="-30" text-anchor="middle" font-size="13" font-weight="bold" fill="#8B5CF6">
            L = {{ inductance }} µH
          </text>
          <path d="M 0 0 Q 15 -15, 30 0 Q 45 -15, 60 0 Q 75 -15, 90 0" 
                fill="none" stroke="#8B5CF6" stroke-width="4" stroke-linecap="round"/>
          <line x1="-20" y1="0" x2="0" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <line x1="90" y1="0" x2="110" y2="0" stroke="#94A3B8" stroke-width="3"/>
        </g>

        <!-- MOSFET Switch -->
        <g transform="translate(320, 200)">
          <rect x="-15" y="-25" width="30" height="50" fill="#4B5563" stroke="#1F2937" stroke-width="2" rx="3"/>
          <text x="0" y="5" text-anchor="middle" font-size="10" font-weight="bold" fill="white">Q1</text>
          <line x1="0" y1="-25" x2="0" y2="-60" stroke="#94A3B8" stroke-width="3"/>
          <line x1="0" y1="25" x2="0" y2="80" stroke="#94A3B8" stroke-width="3"/>
          <text x="0" y="55" text-anchor="middle" font-size="11" font-weight="bold" :fill="switchState ? '#22C55E' : '#EF4444'">
            {{ switchState ? 'ON' : 'OFF' }}
          </text>
        </g>

        <!-- Diode -->
        <g transform="translate(450, 100)">
          <polygon points="0,-15 20,0 0,15" fill="none" stroke="#22C55E" stroke-width="3"/>
          <line x1="20" y1="-15" x2="20" y2="15" stroke="#22C55E" stroke-width="3"/>
          <line x1="-20" y1="0" x2="0" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <line x1="20" y1="0" x2="40" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <text x="10" y="-25" text-anchor="middle" font-size="11" font-weight="bold" fill="#22C55E">
            D1
          </text>
        </g>

        <!-- Capacitor -->
        <g transform="translate(580, 200)">
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#EC4899" stroke-width="3"/>
          <line x1="10" y1="-20" x2="10" y2="20" stroke="#EC4899" stroke-width="3"/>
          <line x1="-40" y1="0" x2="0" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <line x1="10" y1="0" x2="50" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <text x="5" y="45" text-anchor="middle" font-size="12" font-weight="bold" fill="#EC4899">
            C = {{ capacitance }} µF
          </text>
        </g>

        <!-- Load Resistor -->
        <g transform="translate(680, 100)">
          <rect x="-10" y="-15" width="20" height="30" fill="white" stroke="#F59E0B" stroke-width="2" rx="2"/>
          <line x1="-30" y1="0" x2="-10" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <line x1="10" y1="0" x2="30" y2="0" stroke="#94A3B8" stroke-width="3"/>
          <text x="0" y="-25" text-anchor="middle" font-size="12" font-weight="bold" fill="#F59E0B">
            R_LOAD = {{ loadResistance }}Ω
          </text>
        </g>

        <!-- Output Voltage -->
        <g transform="translate(680, 200)">
          <circle r="25" fill="white" stroke="#EF4444" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">
            {{ outputVoltage.toFixed(1) }}V
          </text>
        </g>

        <!-- Current Flow Animation -->
        <g v-if="isSimulating">
          <!-- Inductor Charging Current (switch ON) -->
          <circle v-if="switchState" r="4" fill="#3B82F6" opacity="0.8">
            <animateMotion dur="1s" repeatCount="indefinite"
              path="M 80 165 L 80 100 L 200 100 L 320 100 L 320 200"/>
          </circle>
          
          <!-- Discharging Current (switch OFF) -->
          <circle v-if="!switchState" r="4" fill="#22C55E" opacity="0.8">
            <animateMotion dur="1s" repeatCount="indefinite"
              path="M 80 165 L 80 100 L 200 100 L 450 100 L 580 100 L 580 200 L 680 200 L 680 100"/>
          </circle>
        </g>

        <!-- Main circuit wires -->
        <path d="M 80 165 L 80 100 L 200 100" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 320 100 L 450 100 L 650 100" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 710 100 L 730 100 L 730 280 L 80 280 L 80 235" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 320 200 L 320 280" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 580 200 L 580 280" stroke="#94A3B8" stroke-width="3" fill="none"/>
      </svg>
    </div>

    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Input Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Input Voltage (V_IN): {{ inputVoltage }}V
        </label>
        <input
          type="range"
          v-model.number="inputVoltage"
          min="3"
          max="24"
          step="0.5"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>3V</span>
          <span>12V</span>
          <span>24V</span>
        </div>
      </div>

      <!-- Duty Cycle -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Duty Cycle (D): {{ (dutyCycle * 100).toFixed(0) }}%
        </label>
        <input
          type="range"
          v-model.number="dutyCycle"
          min="0.1"
          max="0.9"
          step="0.05"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10%</span>
          <span>50%</span>
          <span>90%</span>
        </div>
      </div>

      <!-- Inductance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Inductance (L): {{ inductance }} µH
        </label>
        <input
          type="range"
          v-model.number="inductance"
          min="10"
          max="1000"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10µH</span>
          <span>500µH</span>
          <span>1000µH</span>
        </div>
      </div>

      <!-- Capacitance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Capacitance (C): {{ capacitance }} µF
        </label>
        <input
          type="range"
          v-model.number="capacitance"
          min="10"
          max="1000"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10µF</span>
          <span>500µF</span>
          <span>1000µF</span>
        </div>
      </div>

      <!-- Load Resistance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Load Resistance: {{ loadResistance }}Ω
        </label>
        <input
          type="range"
          v-model.number="loadResistance"
          min="10"
          max="500"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>250Ω</span>
          <span>500Ω</span>
        </div>
      </div>

      <!-- Switching Frequency -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Frequency (f): {{ switchingFrequency }} kHz
        </label>
        <input
          type="range"
          v-model.number="switchingFrequency"
          min="10"
          max="500"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10kHz</span>
          <span>250kHz</span>
          <span>500kHz</span>
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Output Voltage -->
      <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Voltage</div>
        <div class="text-3xl font-bold text-red-600 dark:text-red-400">
          {{ outputVoltage.toFixed(2) }}V
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Gain: {{ voltageGain.toFixed(2) }}x
        </div>
      </div>

      <!-- Output Current -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Current</div>
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {{ outputCurrent.toFixed(2) }}A
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          I_OUT = V_OUT / R_LOAD
        </div>
      </div>

      <!-- Input Current -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Input Current (avg)</div>
        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
          {{ inputCurrent.toFixed(2) }}A
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          I_IN = I_OUT × Gain
        </div>
      </div>

      <!-- Output Power -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Power</div>
        <div class="text-3xl font-bold text-green-600 dark:text-green-400">
          {{ outputPower.toFixed(1) }}W
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          P_OUT = V_OUT × I_OUT
        </div>
      </div>

      <!-- Efficiency -->
      <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficiency</div>
        <div class="text-3xl font-bold text-amber-600 dark:text-amber-400">
          {{ efficiency.toFixed(1) }}%
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          η = P_OUT / P_IN × 100%
        </div>
      </div>

      <!-- Ripple Voltage -->
      <div class="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ripple Voltage</div>
        <div class="text-3xl font-bold text-rose-600 dark:text-rose-400">
          {{ rippleVoltage.toFixed(2) }}V
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          V_ripple = I_OUT / (f × C)
        </div>
      </div>
    </div>

    <!-- Waveforms -->
    <div class="bg-white dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Switching Waveforms</h3>
      <div class="space-y-4">
        <!-- Switch Control -->
        <div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Switch Control (V_GATE)</div>
          <div class="h-16 bg-gray-100 dark:bg-gray-600 rounded-lg relative overflow-hidden">
            <div class="absolute inset-0 flex">
              <div :class="switchState ? 'bg-green-500' : 'bg-gray-400'" 
                   :style="{ width: (dutyCycle * 100) + '%' }"></div>
              <div :class="!switchState ? 'bg-gray-400' : 'bg-green-500'" 
                   :style="{ width: ((1 - dutyCycle) * 100) + '%' }"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-sm font-bold text-white" v-if="switchState">ON (Charging L)</span>
              <span class="text-sm font-bold text-gray-700" v-else>OFF (Discharging L)</span>
            </div>
          </div>
        </div>

        <!-- Inductor Current -->
        <div>
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Inductor Current (I_L)</div>
          <div class="h-16 bg-gray-100 dark:bg-gray-600 rounded-lg relative overflow-hidden">
            <svg viewBox="0 0 400 64" class="w-full h-full">
              <path :d="getInductorCurrentWaveform()" 
                    fill="none" stroke="#8B5CF6" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Presets -->
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Presets</h3>
      <div class="flex flex-wrap gap-2">
        <button
          @click="applyPreset('5v-to-12v')"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          5V → 12V (USB Boost)
        </button>
        <button
          @click="applyPreset('12v-to-24v')"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          12V → 24V (Automotive)
        </button>
        <button
          @click="applyPreset('3.3v-to-5v')"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          3.3V → 5V (Logic Level)
        </button>
        <button
          @click="applyPreset('high-gain')"
          class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          High Gain (5V → 20V)
        </button>
      </div>
    </div>

    <!-- Simulation Control -->
    <div class="flex gap-4 mb-8">
      <button
        @click="toggleSimulation"
        :class="isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
        class="px-6 py-3 text-white rounded-lg font-semibold transition-colors"
      >
        {{ isSimulating ? '⏹ Stop Simulation' : '▶ Start Simulation' }}
      </button>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 About Boost Converters</h3>
      
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">How It Works</h4>
          <p class="text-sm mb-2">
            A boost converter is a DC-DC power converter that steps up voltage from its input to its output. 
            It uses two key phases:
          </p>
          <ul class="text-sm list-disc list-inside space-y-1 ml-2">
            <li><strong>ON State (Switch Closed):</strong> Inductor charges from input, storing energy in its magnetic field</li>
            <li><strong>OFF State (Switch Open):</strong> Inductor releases stored energy + input energy to output</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Formulas</h4>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm font-mono space-y-1">
            <div>V_OUT = V_IN / (1 - D)</div>
            <div>Voltage Gain = 1 / (1 - D)</div>
            <div>I_IN = I_OUT / (1 - D)</div>
            <div>Ripple = I_OUT / (f × C)</div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Design Considerations</h4>
          <ul class="text-sm list-disc list-inside space-y-1 ml-2">
            <li><strong>Duty Cycle Limit:</strong> Practical limit ~80-90% due to losses</li>
            <li><strong>Inductor Selection:</strong> Must handle peak current without saturation</li>
            <li><strong>Capacitor ESR:</strong> Low ESR reduces output ripple</li>
            <li><strong>Switching Losses:</strong> Higher frequency = smaller components but more losses</li>
            <li><strong>Diode Recovery:</strong> Schottky diodes preferred for efficiency</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Common Applications</h4>
          <ul class="text-sm list-disc list-inside space-y-1 ml-2">
            <li>Battery-powered devices (step up 3.7V Li-ion to 5V)</li>
            <li>Automotive systems (12V to 24V)</li>
            <li>Solar panels (optimize voltage for charging)</li>
            <li>LED drivers (constant current, high voltage)</li>
            <li>Power supplies for audio amplifiers</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Pros & Cons</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
              <div class="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">✅ Advantages</div>
              <ul class="text-xs text-green-700 dark:text-green-400 space-y-0.5">
                <li>• High efficiency (>90%)</li>
                <li>• Simple topology</li>
                <li>• Low component count</li>
                <li>• Continuous input current</li>
              </ul>
            </div>
            <div class="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
              <div class="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">❌ Disadvantages</div>
              <ul class="text-xs text-red-700 dark:text-red-400 space-y-0.5">
                <li>• High switch current stress</li>
                <li>• Output diode losses</li>
                <li>• Limited gain at high D</li>
                <li>• EMI concerns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Input parameters
const inputVoltage = ref(5)
const dutyCycle = ref(0.5)
const inductance = ref(100) // µH
const capacitance = ref(100) // µF
const loadResistance = ref(50) // Ω
const switchingFrequency = ref(100) // kHz

// Simulation state
const isSimulating = ref(false)
const switchState = ref(false)
let animationInterval: number | null = null

// Computed values
const voltageGain = computed(() => {
  return 1 / (1 - dutyCycle.value)
})

const outputVoltage = computed(() => {
  return inputVoltage.value * voltageGain.value
})

const outputCurrent = computed(() => {
  return outputVoltage.value / loadResistance.value
})

const inputCurrent = computed(() => {
  return outputCurrent.value * voltageGain.value
})

const outputPower = computed(() => {
  return outputVoltage.value * outputCurrent.value
})

const inputPower = computed(() => {
  return inputVoltage.value * inputCurrent.value
})

const efficiency = computed(() => {
  if (inputPower.value === 0) return 0
  return (outputPower.value / inputPower.value) * 100
})

const rippleVoltage = computed(() => {
  // Simplified ripple calculation
  const f = switchingFrequency.value * 1000 // Convert to Hz
  const c = capacitance.value * 1e-6 // Convert to F
  return outputCurrent.value / (f * c)
})

// Methods
const toggleSimulation = () => {
  isSimulating.value = !isSimulating.value
  
  if (isSimulating.value) {
    const period = 1000 / switchingFrequency.value // ms
    const onTime = period * dutyCycle.value
    
    animationInterval = setInterval(() => {
      switchState.value = !switchState.value
    }, onTime) as unknown as number
  } else {
    if (animationInterval) {
      clearInterval(animationInterval)
      animationInterval = null
    }
    switchState.value = false
  }
}

const getInductorCurrentWaveform = () => {
  // Generate a sawtooth-like waveform for inductor current
  const width = 400
  const height = 64
  const baseline = height - 10
  const amplitude = 30
  
  let path = `M 0 ${baseline - amplitude * 0.3}`
  
  for (let x = 0; x <= width; x += 20) {
    const cyclePos = (x / width) * 4 // 4 complete cycles
    const phase = cyclePos % 1
    
    let y: number
    if (phase < dutyCycle.value) {
      // Charging phase (rising)
      y = baseline - amplitude * (0.3 + (phase / dutyCycle.value) * 0.4)
    } else {
      // Discharging phase (falling)
      const dischargeProgress = (phase - dutyCycle.value) / (1 - dutyCycle.value)
      y = baseline - amplitude * (0.7 - dischargeProgress * 0.4)
    }
    
    path += ` L ${x} ${y}`
  }
  
  return path
}

const applyPreset = (preset: string) => {
  switch (preset) {
    case '5v-to-12v':
      inputVoltage.value = 5
      dutyCycle.value = 0.58
      inductance.value = 100
      capacitance.value = 220
      loadResistance.value = 60
      switchingFrequency.value = 100
      break
    case '12v-to-24v':
      inputVoltage.value = 12
      dutyCycle.value = 0.5
      inductance.value = 220
      capacitance.value = 470
      loadResistance.value = 100
      switchingFrequency.value = 150
      break
    case '3.3v-to-5v':
      inputVoltage.value = 3.3
      dutyCycle.value = 0.34
      inductance.value = 47
      capacitance.value = 100
      loadResistance.value = 50
      switchingFrequency.value = 200
      break
    case 'high-gain':
      inputVoltage.value = 5
      dutyCycle.value = 0.75
      inductance.value = 150
      capacitance.value = 330
      loadResistance.value = 200
      switchingFrequency.value = 100
      break
  }
}

// Cleanup
onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style scoped>
input[type="range"] {
  accent-color: #9FA8DA;
}
</style>

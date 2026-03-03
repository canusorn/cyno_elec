<template>
  <div class="schmitt-trigger-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        📊 Schmitt Trigger Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Explore hysteresis and noise immunity in Schmitt Trigger circuits
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 900 500" class="w-full h-auto">
        <!-- Power and Ground Rails -->
        <text x="100" y="30" text-anchor="middle" :font-size="16" font-weight="bold" fill="#3B82F6">
          V_CC = {{ vcc }}V
        </text>
        <line x1="50" y1="50" x2="850" y2="50" :stroke="wireColor" stroke-width="4"/>
        <line x1="50" y1="450" x2="850" y2="450" :stroke="wireColor" stroke-width="4"/>
        <text x="450" y="480" text-anchor="middle" :font-size="14" font-weight="bold" fill="#666">GND</text>

        <!-- Op-Amp Symbol -->
        <g transform="translate(400, 200)">
          <!-- Op-Amp Triangle -->
          <polygon points="-60,-60 -60,60 80,0" fill="white" :stroke="outputHigh ? '#22C55E' : '#EF4444'" stroke-width="3"/>
          
          <!-- Input Labels -->
          <text x="-80" y="-25" text-anchor="middle" :font-size="18" font-weight="bold" fill="#3B82F6">−</text>
          <text x="-80" y="35" text-anchor="middle" :font-size="18" font-weight="bold" fill="#3B82F6">+</text>
          
          <!-- V_in to Non-Inverting Input -->
          <line x1="-150" y1="35" x2="-60" y2="35" :stroke="wireColor" stroke-width="3"/>
          <circle cx="-180" cy="35" r="25" fill="white" :stroke="inputColor" stroke-width="2"/>
          <text x="-180" y="40" text-anchor="middle" :font-size="12" font-weight="bold" :fill="inputColor">
            V_in
          </text>
          <text x="-180" y="75" text-anchor="middle" :font-size="11" fill="#666">
            {{ inputVoltage.toFixed(2) }}V
          </text>

          <!-- Feedback Divider -->
          <!-- R1 (from output to inverting input) -->
          <rect x="0" y="-130" width="60" height="25" fill="white" :stroke="resistorColor" stroke-width="2" rx="3"/>
          <polyline points="5,-117 15,-123 25,-111 35,-123 45,-111 55,-117" fill="none" :stroke="resistorColor" stroke-width="2"/>
          <text x="30" y="-145" text-anchor="middle" :font-size="11" font-weight="bold" :fill="resistorColor">
            R1 = {{ r1 }}Ω
          </text>
          
          <!-- Connection from output to R1 -->
          <line x1="80" y1="0" x2="150" y2="0" :stroke="wireColor" stroke-width="3"/>
          <line x1="150" y1="0" x2="150" y2="-117" :stroke="wireColor" stroke-width="3"/>
          <line x1="150" y1="-117" x2="60" y2="-117" :stroke="wireColor" stroke-width="3"/>
          
          <!-- R2 (from inverting input to ground) -->
          <rect x="0" y="100" width="60" height="25" fill="white" :stroke="resistorColor" stroke-width="2" rx="3"/>
          <polyline points="5,117 15,111 25,123 35,111 45,123 55,117" fill="none" :stroke="resistorColor" stroke-width="2"/>
          <text x="30" y="145" text-anchor="middle" :font-size="11" font-weight="bold" :fill="resistorColor">
            R2 = {{ r2 }}Ω
          </text>
          
          <!-- Connection from R1 to inverting input -->
          <line x1="30" y1="-105" x2="30" y2="-25" :stroke="wireColor" stroke-width="3"/>
          <line x1="30" y1="-25" x2="-60" y2="-25" :stroke="wireColor" stroke-width="3"/>
          
          <!-- Connection from inverting input to R2 -->
          <line x1="30" y1="100" x2="30" y2="25" :stroke="wireColor" stroke-width="3"/>
          <line x1="30" y1="25" x2="-60" y2="25" :stroke="wireColor" stroke-width="3"/>
          
          <!-- R2 to ground -->
          <line x1="30" y1="125" x2="30" y2="250" :stroke="wireColor" stroke-width="3"/>
          
          <!-- Reference Voltage (optional) -->
          <line x1="-30" y1="250" x2="200" y2="250" :stroke="wireColor" stroke-width="3"/>
          
          <!-- Output -->
          <line x1="80" y1="0" x2="200" y2="0" :stroke="outputHigh ? '#22C55E' : '#EF4444'" stroke-width="4"/>
          <text x="220" y="5" text-anchor="start" :font-size="14" font-weight="bold" :fill="outputHigh ? '#22C55E' : '#EF4444'">
            V_out = {{ outputVoltage.toFixed(2) }}V
          </text>
        </g>

        <!-- Voltage Reference Indicator -->
        <g transform="translate(700, 100)">
          <rect x="0" y="0" width="160" height="100" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="8"/>
          <text x="80" y="25" text-anchor="middle" :font-size="13" font-weight="bold" fill="#B45309">
            Threshold Voltages
          </text>
          <text x="80" y="50" text-anchor="middle" :font-size="12" fill="#B45309">
            Upper (V_UT): {{ upperThreshold.toFixed(2) }}V
          </text>
          <text x="80" y="70" text-anchor="middle" :font-size="12" fill="#B45309">
            Lower (V_LT): {{ lowerThreshold.toFixed(2) }}V
          </text>
          <text x="80" y="90" text-anchor="middle" :font-size="11" fill="#92400E">
            Hysteresis: {{ hysteresis.toFixed(2) }}V
          </text>
        </g>

        <!-- Output State Indicator -->
        <g transform="translate(700, 220)">
          <rect x="0" y="0" width="160" height="60" :fill="outputHigh ? '#DCFCE7' : '#FEE2E2'" :stroke="outputHigh ? '#22C55E' : '#EF4444'" stroke-width="2" rx="8"/>
          <text x="80" y="25" text-anchor="middle" :font-size="13" font-weight="bold" :fill="outputHigh ? '#166534' : '#991B1B'">
            Output State
          </text>
          <text x="80" y="48" text-anchor="middle" :font-size="16" font-weight="bold" :fill="outputHigh ? '#166534' : '#991B1B'">
            {{ outputHigh ? 'HIGH' : 'LOW' }}
          </text>
        </g>

        <!-- Hysteresis Diagram -->
        <g transform="translate(50, 300)">
          <text x="130" y="-15" text-anchor="middle" :font-size="14" font-weight="bold" fill="#1F2937">
            Transfer Characteristic
          </text>
          <rect x="0" y="0" width="260" height="180" fill="white" stroke="#666" stroke-width="2" rx="5"/>
          
          <!-- Axes -->
          <line x1="10" y1="90" x2="250" y2="90" stroke="#666" stroke-width="1"/>
          <line x1="130" y1="10" x2="130" y2="170" stroke="#666" stroke-width="1"/>
          
          <!-- Labels -->
          <text x="255" y="95" :font-size="12" fill="#666">V_in</text>
          <text x="130" y="8" text-anchor="middle" :font-size="12" fill="#666">V_out</text>
          
          <!-- Threshold lines -->
          <line x1="10" y1="45" x2="250" y2="45" stroke="#F59E0B" stroke-width="1" stroke-dasharray="5,5"/>
          <text x="255" y="48" :font-size="10" fill="#F59E0B">V_UT</text>
          
          <line x1="10" y1="135" x2="250" y2="135" stroke="#F59E0B" stroke-width="1" stroke-dasharray="5,5"/>
          <text x="255" y="138" :font-size="10" fill="#F59E0B">V_LT</text>
          
          <!-- Hysteresis loop -->
          <path d="M 30,135 L 100,135 L 100,45 L 230,45" fill="none" :stroke="outputHigh ? '#22C55E' : '#EF4444'" stroke-width="3"/>
          <path d="M 230,135 L 160,135 L 160,45 L 30,45" fill="none" :stroke="outputHigh ? '#22C55E' : '#EF4444'" stroke-width="3" stroke-dasharray="8,4"/>
          
          <!-- Current operating point -->
          <circle :cx="mapInputToX(inputVoltage)" :cy="outputHigh ? 45 : 135" r="6" :fill="outputHigh ? '#22C55E' : '#EF4444'" stroke="white" stroke-width="2"/>
        </g>
      </svg>
    </div>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Controls -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Controls</h3>
        
        <!-- Input Voltage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Voltage (V_in)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="inputVoltage"
              type="number" 
              step="0.1"
              min="0"
              max="12"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
          <input 
            v-model.number="inputVoltage"
            type="range"
            min="0"
            max="12"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- R1 Resistor -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Feedback Resistor (R1)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="r1"
              type="number" 
              step="1000"
              min="1000"
              max="100000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
          </div>
          <input 
            v-model.number="r1"
            type="range"
            min="1000"
            max="100000"
            step="1000"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- R2 Resistor -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ground Resistor (R2)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="r2"
              type="number" 
              step="1000"
              min="1000"
              max="100000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
          </div>
          <input 
            v-model.number="r2"
            type="range"
            min="1000"
            max="100000"
            step="1000"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- VCC Supply -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Supply Voltage (V_CC)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="vcc"
              type="number" 
              step="0.1"
              min="3"
              max="24"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
        </div>
      </div>

      <!-- Readings Display -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Analysis</h3>
        
        <div class="space-y-4">
          <!-- Output Voltage -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Output Voltage</span>
              <span class="text-2xl font-bold" :class="outputHigh ? 'text-green-600' : 'text-red-600'">
                {{ outputVoltage.toFixed(2) }}V
              </span>
            </div>
          </div>

          <!-- Upper Threshold -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Upper Threshold (V_UT)</span>
              <span class="text-xl font-bold text-orange-600">
                {{ upperThreshold.toFixed(2) }}V
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Switches HIGH when input exceeds this
            </p>
          </div>

          <!-- Lower Threshold -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Lower Threshold (V_LT)</span>
              <span class="text-xl font-bold text-yellow-600">
                {{ lowerThreshold.toFixed(2) }}V
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Switches LOW when input drops below this
            </p>
          </div>

          <!-- Hysteresis -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Hysteresis Voltage</span>
              <span class="text-xl font-bold text-purple-600">
                {{ hysteresis.toFixed(2) }}V
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Noise immunity margin
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Presets -->
    <div class="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h3>
      <div class="flex flex-wrap gap-3">
        <button 
          @click="applyPreset('standard')"
          class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
        >
          Standard (5V)
        </button>
        <button 
          @click="applyPreset('high-gain')"
          class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors font-medium"
        >
          High Hysteresis
        </button>
        <button 
          @click="applyPreset('low-gain')"
          class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors font-medium"
        >
          Low Hysteresis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Reactive state
const inputVoltage = ref(2.5)
const r1 = ref(10000)  // 10kΩ
const r2 = ref(10000)  // 10kΩ
const vcc = ref(5)     // 5V supply

// Output state (tracked separately to maintain hysteresis)
const outputState = ref(false)  // false = LOW, true = HIGH

// Computed properties
const upperThreshold = computed(() => {
  return vcc.value * (r2.value / (r1.value + r2.value))
})

const lowerThreshold = computed(() => {
  return vcc.value * (r2.value / (r1.value + r2.value))
})

const hysteresis = computed(() => {
  return vcc.value * (r2.value / (r1.value + r2.value))
})

const outputHigh = computed(() => {
  // Implement hysteresis logic
  if (inputVoltage.value > upperThreshold.value) {
    outputState.value = true
  } else if (inputVoltage.value < lowerThreshold.value) {
    outputState.value = false
  }
  return outputState.value
})

const outputVoltage = computed(() => {
  return outputHigh.value ? vcc.value : 0
})

const wireColor = computed(() => {
  return outputHigh.value ? '#22C55E' : '#EF4444'
})

const resistorColor = computed(() => {
  return '#9CA3AF'
})

const inputColor = computed(() => {
  if (inputVoltage.value > upperThreshold.value) return '#22C55E'
  if (inputVoltage.value < lowerThreshold.value) return '#EF4444'
  return '#F59E0B'
})

// Helper function to map input voltage to X position in transfer characteristic
const mapInputToX = (vin: number) => {
  const maxVin = 12
  const minX = 30
  const maxX = 230
  return Math.min(maxX, Math.max(minX, minX + (vin / maxVin) * (maxX - minX)))
}

// Presets
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'standard':
      vcc.value = 5
      r1.value = 10000
      r2.value = 10000
      inputVoltage.value = 2.5
      break
    case 'high-gain':
      vcc.value = 5
      r1.value = 20000
      r2.value = 10000
      inputVoltage.value = 2.0
      break
    case 'low-gain':
      vcc.value = 5
      r1.value = 5000
      r2.value = 10000
      inputVoltage.value = 2.0
      break
  }
}
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

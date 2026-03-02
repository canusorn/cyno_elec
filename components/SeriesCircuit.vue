<template>
  <div class="series-circuit-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        — Series Circuit Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Add resistors in series and see how voltage divides across them while current stays constant
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <defs>
          <filter id="glowSeries">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Circuit path rectangle -->
        <!-- Top wire -->
        <line x1="100" y1="50" x2="700" y2="50" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Right wire -->
        <line x1="700" y1="50" x2="700" y2="350" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Bottom wire -->
        <line x1="700" y1="350" x2="100" y2="350" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Left wire -->
        <line x1="100" y1="350" x2="100" y2="50" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>

        <!-- Voltage Source -->
        <g class="voltage-source" @click="$emit('component-click', 'voltage')">
          <circle cx="100" cy="200" r="45" fill="white" :stroke="voltageColor" stroke-width="3"/>
          <line x1="85" y1="190" x2="115" y2="190" :stroke="voltageColor" stroke-width="4"/>
          <line x1="90" y1="210" x2="110" y2="210" :stroke="voltageColor" stroke-width="2"/>
          <text x="100" y="245" text-anchor="middle" :font-size="14" font-weight="bold" :fill="voltageColor">
            {{ voltage }}V
          </text>
        </g>

        <!-- Series resistors on top wire -->
        <g
          v-for="(resistor, index) in resistors"
          :key="index"
          class="series-resistor"
          @click="$emit('resistor-click', index)"
        >
          <!-- Resistor zigzag -->
          <path
            :d="getSeriesResistorPath(200 + index * 150, 50)"
            fill="none"
            :stroke="getResistorColor(resistor, index)"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Resistor label -->
          <text
            :x="200 + index * 150"
            y="30"
            text-anchor="middle"
            :font-size="11"
            font-weight="bold"
            :fill="getResistorColor(resistor, index)"
          >
            R{{ index + 1 }} = {{ resistor }}Ω
          </text>

          <!-- Voltage drop label -->
          <text
            :x="200 + index * 150"
            y="75"
            text-anchor="middle"
            :font-size="10"
            :fill="getResistorColor(resistor, index)"
          >
            V{{ index + 1 }} = {{ getVoltageDrop(resistor).toFixed(1) }}V
          </text>
        </g>

        <!-- Current indicators -->
        <g class="current-indicator-top">
          <rect x="330" y="35" width="140" height="25" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" stroke-width="2"/>
          <text x="400" y="53" text-anchor="middle" :font-size="11" font-weight="bold" fill="#1E40AF">
            I = {{ current.toFixed(3) }}A
          </text>
        </g>

        <!-- Total resistance indicator -->
        <g class="total-resistance-indicator">
          <rect x="640" y="160" width="130" height="25" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#8B82F6" stroke-width="2"/>
          <text x="705" y="178" text-anchor="middle" :font-size="11" font-weight="bold" fill="#7C3AED">
            R_total = {{ totalResistance.toFixed(1) }}Ω
          </text>
        </g>

        <!-- Current flow animation -->
        <g v-if="isSimulating && current > 0">
          <circle
            r="6"
            :fill="electronColor"
            filter="url(#glowSeries)"
          >
            <animateMotion
              :dur="animationDuration"
              repeatCount="indefinite"
              path="M 100 50 L 700 50 L 700 350 L 100 350 Z"
            />
          </circle>
        </g>
      </svg>
    </div>

    <!-- Controls -->
    <div class="controls space-y-6">
      <!-- Voltage Slider -->
      <div class="slider-group">
        <div class="flex justify-between items-center mb-2">
          <label class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            🔋 Source Voltage (V)
          </label>
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ voltage }}V
          </span>
        </div>
        <input
          type="range"
          v-model.number="voltage"
          min="1"
          max="120"
          step="1"
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-blue"
        >
      </div>

      <!-- Add/Remove Resistors -->
      <div class="flex flex-wrap gap-4">
        <button
          @click="addResistor"
          :disabled="resistors.length >= 5"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span class="text-xl">➕</span> Add Resistor
        </button>
        <button
          @click="removeResistor"
          :disabled="resistors.length <= 1"
          class="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span class="text-xl">➖</span> Remove Resistor
        </button>
      </div>

      <!-- Individual Resistor Controls -->
      <div class="resistor-controls grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(resistor, index) in resistors"
          :key="index"
          class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3"
        >
          <div class="flex justify-between items-center">
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-200">
              Resistor {{ index + 1 }}
            </h4>
            <span class="text-sm font-mono bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
              {{ resistor }}Ω
            </span>
          </div>
          <input
            type="range"
            v-model.number="resistors[index]"
            min="1"
            max="1000"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-orange"
          >
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Voltage Drop: {{ getVoltageDrop(resistor).toFixed(2) }}V</span>
            <span>Power: {{ getPower(resistor).toFixed(3) }}W</span>
          </div>
        </div>
      </div>

      <!-- Simulation Controls -->
      <div class="simulation-controls flex gap-4">
        <button
          @click="toggleSimulation"
          :class="[
            'px-8 py-3 font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2',
            isSimulating
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          ]"
        >
          <span class="text-xl">{{ isSimulating ? '⏸️' : '▶️' }}</span>
          {{ isSimulating ? 'Stop Simulation' : 'Start Simulation' }}
        </button>
        <button
          @click="resetSimulation"
          class="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <span class="text-xl">🔄</span> Reset
        </button>
      </div>

      <!-- Results Display -->
      <div class="results bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Circuit Analysis</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Voltage</div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ voltage }}V</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Current</div>
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ current.toFixed(3) }}A</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Resistance</div>
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ totalResistance.toFixed(1) }}Ω</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Power</div>
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ totalPower.toFixed(3) }}W</div>
          </div>
        </div>
        <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Divider Formula (V_n):</div>
          <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
            V<sub>n</sub> = V<sub>source</sub> × (R<sub>n</sub> ÷ R<sub>total</sub>)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Emits
const emit = defineEmits(['component-click', 'resistor-click'])

// State
const voltage = ref(12)
const resistors = ref([100, 220, 330])
const isSimulating = ref(false)

// Computed properties
const totalResistance = computed(() => {
  return resistors.value.reduce((sum, r) => sum + r, 0)
})

const current = computed(() => {
  if (totalResistance.value === 0) return 0
  return voltage.value / totalResistance.value
})

const totalPower = computed(() => {
  return voltage.value * current.value
})

// Color helpers
const wireColor = computed(() => isSimulating.value ? '#3B82F6' : '#6B7280')
const voltageColor = computed(() => isSimulating.value ? '#EF4444' : '#9CA3AF')
const electronColor = computed(() => '#FBBF24')

// Animation
const animationDuration = computed(() => {
  const speed = Math.max(0.5, Math.min(5, current.value))
  return `${6 / speed}s`
})

// Methods
const getVoltageDrop = (resistance: number) => {
  return current.value * resistance
}

const getPower = (resistance: number) => {
  return (current.value ** 2) * resistance
}

const getResistorColor = (resistance: number, index: number) => {
  const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
  return colors[index % colors.length]
}

const getSeriesResistorPath = (x: number, y: number) => {
  return `M ${x - 25} ${y} L ${x - 20} ${y} L ${x - 15} ${y - 10} L ${x - 5} ${y + 10} L ${x + 5} ${y - 10} L ${x + 15} ${y + 10} L ${x + 20} ${y} L ${x + 25} ${y}`
}

const addResistor = () => {
  if (resistors.value.length < 5) {
    resistors.value.push(100)
  }
}

const removeResistor = () => {
  if (resistors.value.length > 1) {
    resistors.value.pop()
  }
}

const toggleSimulation = () => {
  isSimulating.value = !isSimulating.value
}

const resetSimulation = () => {
  isSimulating.value = false
  voltage.value = 12
  resistors.value = [100, 220, 330]
}
</script>

<style scoped>
.series-circuit-simulator {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.slider-blue::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
}

.slider-blue::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  border: none;
}

.slider-orange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #F59E0B;
  cursor: pointer;
}

.slider-orange::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #F59E0B;
  cursor: pointer;
  border: none;
}
</style>

<template>
  <div class="parallel-circuit-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        ∥ Parallel Circuit Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Add resistors in parallel and see how current divides between them
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <defs>
          <filter id="glowParallel">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Main circuit wires -->
        <!-- Top wire (common positive) -->
        <line x1="100" y1="50" x2="700" y2="50" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Bottom wire (common negative) -->
        <line x1="100" y1="350" x2="700" y2="350" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Left vertical wires (to voltage source) -->
        <line x1="100" y1="50" x2="100" y2="130" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="270" x2="100" y2="350" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Voltage Source -->
        <g class="voltage-source" @click="$emit('component-click', 'voltage')">
          <circle cx="100" cy="200" r="45" fill="white" :stroke="voltageColor" stroke-width="3"/>
          <line x1="85" y1="190" x2="115" y2="190" :stroke="voltageColor" stroke-width="4"/>
          <line x1="90" y1="210" x2="110" y2="210" :stroke="voltageColor" stroke-width="2"/>
          <text x="100" y="245" text-anchor="middle" :font-size="14" font-weight="bold" :fill="voltageColor">
            {{ voltage }}V
          </text>
        </g>
        
        <!-- Parallel branches with resistors -->
        <g
          v-for="(resistor, index) in resistors"
          :key="index"
          class="parallel-branch"
          @click="$emit('resistor-click', index)"
        >
          <!-- Vertical wire for this branch -->
          <line 
            :x1="200 + index * 120" 
            y1="50" 
            :x2="200 + index * 120" 
            y2="350" 
            :stroke="getBranchWireColor(resistor, index)" 
            stroke-width="3" 
            stroke-linecap="round"
          />
          
          <!-- Resistor label -->
          <text 
            :x="200 + index * 120" 
            y="30" 
            text-anchor="middle" 
            :font-size="11" 
            font-weight="bold" 
            :fill="getResistorColor(resistor)"
          >
            R{{ index + 1 }} = {{ resistor }}Ω
          </text>
          
          <!-- Branch current label -->
          <text 
            :x="200 + index * 120" 
            y="385" 
            text-anchor="middle" 
            :font-size="10" 
            :fill="getBranchWireColor(resistor, index)"
          >
            I{{ index + 1 }} = {{ getBranchCurrent(resistor).toFixed(3) }}A
          </text>
          
          <!-- Resistor zigzag on branch -->
          <path
            :d="getParallelResistorPath(200 + index * 120, 200)"
            fill="none"
            :stroke="getResistorColor(resistor)"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          
          <!-- Current flow for this branch -->
          <g v-if="isSimulating && getBranchCurrent(resistor) > 0">
            <circle
              :r="getBranchElectronRadius(resistor)"
              :fill="getBranchElectronColor(resistor)"
              filter="url(#glowParallel)"
            >
              <animateMotion
                :dur="getBranchAnimationDuration(resistor)"
                repeatCount="indefinite"
                :path="`M ${200 + index * 120} 60 L ${200 + index * 120} 340`"
              />
            </circle>
          </g>
        </g>
        
        <!-- Total current indicator -->
        <g class="total-current-indicator">
          <rect x="50" y="120" width="100" height="25" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" stroke-width="2"/>
          <text x="100" y="138" text-anchor="middle" :font-size="11" font-weight="bold" fill="#1E40AF">
            I_total = {{ totalCurrent.toFixed(3) }}A
          </text>
        </g>
        
        <!-- Total resistance indicator -->
        <g class="total-resistance-indicator">
          <rect x="650" y="175" width="120" height="25" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" stroke-width="2"/>
          <text x="710" y="193" text-anchor="middle" :font-size="11" font-weight="bold" fill="#7C3AED">
            R_total = {{ totalResistance.toFixed(1) }}Ω
          </text>
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
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1V</span>
          <span>60V</span>
          <span>120V</span>
        </div>
      </div>

      <!-- Resistor Management -->
      <div class="resistor-management bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Parallel Branches ({{ resistors.length }} total)
        </h3>
        
        <!-- Add Resistor -->
        <div class="flex gap-2 mb-4">
          <input
            v-model.number="newResistorValue"
            type="number"
            placeholder="Resistance (Ω)"
            min="1"
            max="100000"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            @click="addResistor"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            type="button"
          >
            ➕ Add Branch
          </button>
        </div>
        
        <!-- Resistor List -->
        <div class="resistor-list grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          <div
            v-for="(resistor, index) in resistors"
            :key="index"
            class="resistor-item flex flex-col bg-white dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-500"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="font-mono font-bold text-green-600 dark:text-green-400 text-sm">
                R{{ index + 1 }}: {{ resistor }}Ω
              </span>
              <button
                @click="removeResistor(index)"
                class="text-red-500 hover:text-red-700 font-bold text-sm"
                type="button"
              >
                ✕
              </button>
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-300">
              I: {{ getBranchCurrent(resistor).toFixed(3) }}A
            </div>
          </div>
        </div>
        
        <!-- Quick Add Buttons -->
        <div class="flex flex-wrap gap-2 mt-4">
          <button
            v-for="preset in resistorPresets"
            :key="preset.value"
            @click="addResistorWithPreset(preset.value)"
            class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            type="button"
          >
            +{{ preset.label }}
          </button>
        </div>
      </div>

      <!-- Calculated Values -->
      <div class="calculated-values grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Resistance</div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {{ totalResistance.toFixed(1) }}Ω
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            1/R_total = 1/R1 + 1/R2 + ...
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Current</div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ totalCurrent.toFixed(3) }}A
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            I_total = I1 + I2 + ...
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Power</div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ totalPower.toFixed(2) }}W
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            P = V × I_total
          </div>
        </div>
      </div>

      <!-- Current Division Table -->
      <div v-if="resistors.length > 0" class="current-division-table bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Current Division
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-600">
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Branch</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Resistance</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Branch Current</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Power</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(resistor, index) in resistors" 
                :key="index"
                class="border-b border-gray-100 dark:border-gray-600"
              >
                <td class="py-2 px-3 font-semibold text-green-600 dark:text-green-400">
                  R{{ index + 1 }}
                </td>
                <td class="py-2 px-3 font-mono">{{ resistor }}Ω</td>
                <td class="py-2 px-3 font-mono">{{ getBranchCurrent(resistor).toFixed(3) }}A</td>
                <td class="py-2 px-3 font-mono">{{ getBranchPower(resistor).toFixed(3) }}W</td>
                <td class="py-2 px-3 font-mono">{{ getCurrentPercentage(resistor).toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Formula Reference -->
      <div class="formula-reference p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div class="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">
          📚 Parallel Circuit Formulas:
        </div>
        <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <div>• Total Resistance: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ...</div>
          <div>• Total Current: I_total = I1 + I2 + I3 + ...</div>
          <div>• Branch Current: I_n = V ÷ R_n (same voltage across all)</div>
          <div>• Power: P = V × I or P = V² ÷ R</div>
          <div>• Two resistors: R_total = (R1 × R2) ÷ (R1 + R2)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
interface Props {
  initialVoltage?: number
  initialResistors?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  initialVoltage: 12,
  initialResistors: () => [100, 220, 470]
})

// Emits
const emit = defineEmits<{
  'component-click': [component: string]
  'resistor-click': [index: number]
}>()

// State
const voltage = ref(props.initialVoltage)
const resistors = ref<number[]>([...props.initialResistors])
const newResistorValue = ref(100)
const isSimulating = ref(true)

// Presets for quick add
const resistorPresets = [
  { label: '10Ω', value: 10 },
  { label: '100Ω', value: 100 },
  { label: '220Ω', value: 220 },
  { label: '470Ω', value: 470 },
  { label: '1kΩ', value: 1000 },
  { label: '10kΩ', value: 10000 }
]

// Computed
const totalResistance = computed(() => {
  // For parallel: 1/R_total = 1/R1 + 1/R2 + ...
  const reciprocalSum = resistors.value.reduce((sum, r) => sum + (1 / r), 0)
  return 1 / reciprocalSum
})

const totalCurrent = computed(() => {
  return voltage.value / totalResistance.value
})

const totalPower = computed(() => {
  return voltage.value * totalCurrent.value
})

// Colors
const voltageColor = computed(() => {
  const v = voltage.value
  if (v < 12) return '#22C55E'
  if (v < 48) return '#3B82F6'
  return '#EF4444'
})

const wireColor = computed(() => {
  return totalCurrent.value > 0 ? '#94A3B8' : '#6B7280'
})

// Methods
const getResistorColor = (resistance: number) => {
  if (resistance < 100) return '#22C55E'
  if (resistance < 1000) return '#8B5CF6'
  if (resistance < 5000) return '#F59E0B'
  return '#EF4444'
}

const getBranchWireColor = (resistance: number, index: number) => {
  const current = getBranchCurrent(resistance)
  if (current < 0.01) return '#94A3B8'
  if (current < 0.1) return '#22C55E'
  if (current < 0.5) return '#FBBF24'
  return '#EF4444'
}

const getBranchElectronColor = (resistance: number) => {
  const current = getBranchCurrent(resistance)
  if (current < 0.01) return '#60A5FA'
  if (current < 0.1) return '#FBBF24'
  return '#EF4444'
}

const getBranchCurrent = (resistance: number) => {
  return voltage.value / resistance
}

const getBranchPower = (resistance: number) => {
  const current = getBranchCurrent(resistance)
  return voltage.value * current
}

const getCurrentPercentage = (resistance: number) => {
  return (getBranchCurrent(resistance) / totalCurrent.value) * 100
}

const getBranchElectronRadius = (resistance: number) => {
  const current = getBranchCurrent(resistance)
  return Math.min(5, 2 + current * 20)
}

const getBranchAnimationDuration = (resistance: number) => {
  const current = getBranchCurrent(resistance)
  const baseDuration = 3
  return `${baseDuration / Math.max(0.01, current)}s`
}

const getParallelResistorPath = (x: number, y: number) => {
  const width = 30
  const height = 60
  return `M ${x} ${y - height/2} L ${x} ${y - height/2 + 10} L ${x - width/2} ${y - height/2 + 20} L ${x + width/2} ${y - height/2 + 30} L ${x - width/2} ${y - height/2 + 40} L ${x + width/2} ${y} L ${x - width/2} ${y + height/2 - 30} L ${x + width/2} ${y + height/2 - 40} L ${x - width/2} ${y + height/2 - 50} L ${x + width/2} ${y + height/2 - 60} L ${x} ${y + height/2 - 50} L ${x} ${y + height/2}`
}

const addResistor = () => {
  if (newResistorValue.value > 0) {
    resistors.value.push(newResistorValue.value)
    newResistorValue.value = 100
  }
}

const addResistorWithPreset = (value: number) => {
  resistors.value.push(value)
}

const removeResistor = (index: number) => {
  if (resistors.value.length > 1) {
    resistors.value.splice(index, 1)
  }
}
</script>

<style scoped>
/* Custom Slider Styles */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid #3B82F6;
}

.slider-blue::-webkit-slider-runnable-track {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(to right, #DBEAFE, #3B82F6);
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Resistor item styles */
.resistor-item {
  transition: all 0.2s ease;
}

.resistor-item:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Table styles */
table {
  border-collapse: collapse;
}

tr:last-child td {
  border-bottom: none;
}
</style>

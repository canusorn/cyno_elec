<template>
  <div class="series-circuit-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🔗 Series Circuit Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Add resistors in series and see how voltage divides across them
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 800 350" class="w-full h-auto">
        <!-- Circuit wires -->
        <path
          d="M 100 100 L 100 250 L 700 250 L 700 100"
          :stroke="wireColor"
          stroke-width="4"
          fill="none"
          stroke-linejoin="round"
        />
        <path
          d="M 100 100 L 700 100"
          :stroke="wireColor"
          stroke-width="4"
          fill="none"
        />
        
        <!-- Voltage Source -->
        <g class="voltage-source" @click="$emit('component-click', 'voltage')">
          <circle cx="100" cy="175" r="45" fill="white" :stroke="voltageColor" stroke-width="3"/>
          <line x1="85" y1="165" x2="115" y2="165" :stroke="voltageColor" stroke-width="4"/>
          <line x1="90" y1="185" x2="110" y2="185" :stroke="voltageColor" stroke-width="2"/>
          <text x="100" y="220" text-anchor="middle" :font-size="14" font-weight="bold" :fill="voltageColor">
            {{ voltage }}V
          </text>
        </g>
        
        <!-- Resistors in Series -->
        <g
          v-for="(resistor, index) in resistors"
          :key="index"
          class="resistor-group"
          @click="$emit('resistor-click', index)"
        >
          <text 
            :x="200 + index * 150" 
            y="70" 
            text-anchor="middle" 
            :font-size="12" 
            font-weight="bold" 
            :fill="getResistorColor(resistor)"
          >
            R{{ index + 1 }} = {{ resistor }}Ω
          </text>
          
          <!-- Voltage drop label -->
          <text 
            :x="200 + index * 150" 
            y="320" 
            text-anchor="middle" 
            :font-size="11" 
            :fill="getResistorColor(resistor)"
          >
            V{{ index + 1 }} = {{ getVoltageDrop(resistor).toFixed(2) }}V
          </text>
          
          <!-- Resistor zigzag -->
          <path
            :d="getResistorPath(200 + index * 150)"
            fill="none"
            :stroke="getResistorColor(resistor)"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        
        <!-- Current flow electrons -->
        <g v-if="isSimulating && totalCurrent > 0">
          <circle
            v-for="electron in electrons"
            :key="electron.id"
            :r="electronRadius"
            :fill="electronColor"
            filter="url(#glow)"
          >
            <animateMotion
              :dur="animationDuration"
              :begin="electron.delay"
              repeatCount="indefinite"
              path="M 100 100 L 700 100 L 700 250 L 100 250 L 100 100"
            />
          </circle>
        </g>
        
        <!-- Total current label -->
        <text x="400" y="30" text-anchor="middle" :font-size="14" font-weight="bold" fill="#1E40AF">
          I_total = {{ totalCurrent.toFixed(4) }}A
        </text>
        
        <!-- Total resistance label -->
        <text x="400" y="340" text-anchor="middle" :font-size="14" font-weight="bold" fill="#7C3AED">
          R_total = {{ totalResistance.toFixed(1) }}Ω
        </text>
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
          Resistors ({{ resistors.length }} total)
        </h3>
        
        <!-- Add Resistor -->
        <div class="flex gap-2 mb-4">
          <input
            v-model.number="newResistorValue"
            type="number"
            placeholder="Resistance (Ω)"
            min="1"
            max="10000"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            @click="addResistor"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            type="button"
          >
            ➕ Add
          </button>
        </div>
        
        <!-- Resistor List -->
        <div class="resistor-list grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          <div
            v-for="(resistor, index) in resistors"
            :key="index"
            class="resistor-item flex items-center justify-between bg-white dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-500"
          >
            <span class="font-mono font-bold text-purple-600 dark:text-purple-400">
              R{{ index + 1 }}: {{ resistor }}Ω
            </span>
            <button
              @click="removeResistor(index)"
              class="text-red-500 hover:text-red-700 font-bold text-lg px-2"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
        
        <!-- Quick Add Buttons -->
        <div class="flex flex-wrap gap-2 mt-4">
          <button
            v-for="preset in resistorPresets"
            :key="preset.value"
            @click="addResistorWithPreset(preset.value)"
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
            type="button"
          >
            +{{ preset.label }}
          </button>
        </div>
      </div>

      <!-- Calculated Values -->
      <div class="calculated-values grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Resistance</div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ totalResistance.toFixed(1) }}Ω
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            R_total = R1 + R2 + ...
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Current</div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ totalCurrent.toFixed(4) }}A
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            I = V ÷ R_total
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Power</div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ totalPower.toFixed(2) }}W
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            P = V × I
          </div>
        </div>
      </div>

      <!-- Voltage Division Table -->
      <div v-if="resistors.length > 0" class="voltage-division-table bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Voltage Division
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-600">
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Resistor</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Value</th>
                <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Voltage Drop</th>
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
                <td class="py-2 px-3 font-semibold text-purple-600 dark:text-purple-400">
                  R{{ index + 1 }}
                </td>
                <td class="py-2 px-3 font-mono">{{ resistor }}Ω</td>
                <td class="py-2 px-3 font-mono">{{ getVoltageDrop(resistor).toFixed(2) }}V</td>
                <td class="py-2 px-3 font-mono">{{ getResistorPower(resistor).toFixed(3) }}W</td>
                <td class="py-2 px-3 font-mono">{{ getVoltagePercentage(resistor).toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Formula Reference -->
      <div class="formula-reference p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          📚 Series Circuit Formulas:
        </div>
        <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <div>• Total Resistance: R_total = R1 + R2 + R3 + ...</div>
          <div>• Current (same through all): I = V ÷ R_total</div>
          <div>• Voltage Drop: V_n = I × R_n</div>
          <div>• Power: P = V × I or P = I² × R</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Props
interface Props {
  initialVoltage?: number
  initialResistors?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  initialVoltage: 12,
  initialResistors: () => [100, 220, 330]
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
  { label: '330Ω', value: 330 },
  { label: '1kΩ', value: 1000 },
  { label: '10kΩ', value: 10000 }
]

// Computed
const totalResistance = computed(() => {
  return resistors.value.reduce((sum, r) => sum + r, 0)
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

const electronColor = computed(() => {
  const i = totalCurrent.value
  if (i < 0.01) return '#60A5FA'
  if (i < 0.1) return '#FBBF24'
  return '#EF4444'
})

// Animation
const animationDuration = computed(() => {
  const baseDuration = 4
  const speedFactor = Math.max(0.001, totalCurrent.value)
  return `${baseDuration / Math.sqrt(speedFactor * 100)}s`
})

const electronRadius = computed(() => {
  const current = totalCurrent.value
  return Math.min(6, 3 + current * 50)
})

const electrons = computed(() => {
  const count = Math.min(10, Math.max(3, Math.ceil(totalCurrent.value * 100)))
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: `${(i * 100) / count}%`
  }))
})

// Methods
const getResistorPath = (x: number) => {
  const y = 100
  return `M ${x} ${y} L ${x} ${y + 10} L ${x - 10} ${y + 20} L ${x + 10} ${y + 30} L ${x - 10} ${y + 40} L ${x + 10} ${y + 50} L ${x - 10} ${y + 60} L ${x + 10} ${y + 70} L ${x} ${y + 80} L ${x} ${y + 100}`
}

const getResistorColor = (resistance: number) => {
  if (resistance < 100) return '#22C55E'
  if (resistance < 1000) return '#8B5CF6'
  if (resistance < 5000) return '#F59E0B'
  return '#EF4444'
}

const getVoltageDrop = (resistance: number) => {
  return totalCurrent.value * resistance
}

const getResistorPower = (resistance: number) => {
  return totalCurrent.value * totalCurrent.value * resistance
}

const getVoltagePercentage = (resistance: number) => {
  return (getVoltageDrop(resistance) / voltage.value) * 100
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

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-thumb {
    background: #1F2937;
    border-color: #60A5FA;
  }
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

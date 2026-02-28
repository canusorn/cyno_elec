<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🔀 Current Divider Simulator
    </h3>

    <!-- Circuit Diagram -->
    <div class="mb-8">
      <svg viewBox="0 0 700 400" class="w-full h-auto">
        <!-- Background Grid -->
        <defs>
          <pattern id="currentDivGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
          </pattern>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="700" height="400" fill="url(#currentDivGrid)" />

        <!-- Main Circuit Wires -->
        <!-- Top horizontal wire -->
        <line x1="100" y1="100" x2="300" y2="100" stroke="#4ade80" stroke-width="4" />
        <line x1="300" y1="100" x2="400" y2="100" stroke="#4ade80" stroke-width="4" />
        <line x1="400" y1="100" x2="600" y2="100" stroke="#4ade80" stroke-width="4" />

        <!-- Bottom horizontal wire -->
        <line x1="100" y1="300" x2="300" y2="300" stroke="#ef4444" stroke-width="4" />
        <line x1="300" y1="300" x2="400" y2="300" stroke="#ef4444" stroke-width="4" />
        <line x1="400" y1="300" x2="600" y2="300" stroke="#ef4444" stroke-width="4" />

        <!-- Branch 1 (Left) -->
        <line x1="300" y1="100" x2="300" y2="180" stroke="#4ade80" stroke-width="4" />
        <line x1="300" y1="220" x2="300" y2="300" stroke="#ef4444" stroke-width="4" />

        <!-- Branch 2 (Right) -->
        <line x1="400" y1="100" x2="400" y2="180" stroke="#4ade80" stroke-width="4" />
        <line x1="400" y1="220" x2="400" y2="300" stroke="#ef4444" stroke-width="4" />

        <!-- Resistor 1 (Branch 1) -->
        <rect x="280" y="175" width="40" height="50" fill="white" :stroke="branch1Color" stroke-width="3" rx="3" />
        <text x="300" y="195" text-anchor="middle" font-size="11" font-weight="bold" :fill="branch1Color">
          R1
        </text>
        <text x="300" y="210" text-anchor="middle" font-size="10" :fill="branch1Color">
          {{ branches[0].resistance }}Ω
        </text>

        <!-- Resistor 2 (Branch 2) -->
        <rect x="380" y="175" width="40" height="50" fill="white" :stroke="branch2Color" stroke-width="3" rx="3" />
        <text x="400" y="195" text-anchor="middle" font-size="11" font-weight="bold" :fill="branch2Color">
          R2
        </text>
        <text x="400" y="210" text-anchor="middle" font-size="10" :fill="branch2Color">
          {{ branches[1].resistance }}Ω
        </text>

        <!-- Voltage Source -->
        <circle cx="100" cy="200" r="35" fill="white" stroke="#9333ea" stroke-width="3" />
        <text x="100" y="195" text-anchor="middle" font-size="10" fill="#9333ea" font-weight="bold">
          {{ voltage }}V
        </text>
        <text x="100" y="208" text-anchor="middle" font-size="8" fill="#666">DC</text>
        <text x="80" y="165" font-size="12" fill="#22c55e" font-weight="bold">+</text>
        <text x="80" y="235" font-size="12" fill="#ef4444" font-weight="bold">−</text>

        <!-- Current Arrows & Labels -->
        <!-- Total Current -->
        <g v-if="totalCurrent > 0">
          <polygon points="200,90 205,100 195,100" fill="#fbbf24" />
          <text x="200" y="85" text-anchor="middle" font-size="11" fill="#fbbf24" font-weight="bold">
            I_total = {{ totalCurrent.toFixed(2) }}A
          </text>
        </g>

        <!-- Branch 1 Current -->
        <g v-if="branches[0].current > 0">
          <text x="300" y="165" text-anchor="middle" font-size="11" :fill="branch1Color" font-weight="bold">
            ↓ {{ branches[0].current.toFixed(2) }}A
          </text>
          <!-- Current flow animation -->
          <circle r="5" :fill="branch1Color" class="current-particle" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" :keyTimes="branch1Speed">
              <mpath href="#branch1Path"/>
            </animateMotion>
          </circle>
        </g>

        <!-- Branch 2 Current -->
        <g v-if="branches[1].current > 0">
          <text x="400" y="165" text-anchor="middle" font-size="11" :fill="branch2Color" font-weight="bold">
            ↓ {{ branches[1].current.toFixed(2) }}A
          </text>
          <!-- Current flow animation -->
          <circle r="5" :fill="branch2Color" class="current-particle" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" :keyTimes="branch2Speed">
              <mpath href="#branch2Path"/>
            </animateMotion>
          </circle>
        </g>

        <!-- Return currents -->
        <text x="200" y="320" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">
          Return to source
        </text>

        <!-- Hidden paths for animation -->
        <path id="branch1Path" d="M 300 100 L 300 175 L 300 225 L 300 300" fill="none" stroke="none"/>
        <path id="branch2Path" d="M 400 100 L 400 175 L 400 225 L 400 300" fill="none" stroke="none"/>
      </svg>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Voltage Control -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          ⚡ Source Voltage: {{ voltage }}V
        </label>
        <SliderInput
          v-model="voltage"
          :min="1"
          :max="24"
          :step="0.5"
          unit="V"
        />
      </div>

      <!-- Add/Remove Branch -->
      <div class="flex items-end gap-4">
        <button
          @click="addBranch"
          :disabled="branches.length >= 4"
          class="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          + Add Branch
        </button>
        <button
          @click="removeBranch"
          :disabled="branches.length <= 2"
          class="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          − Remove Branch
        </button>
      </div>
    </div>

    <!-- Branch Controls -->
    <div class="space-y-4 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Branch Resistances</h4>
      
      <div v-for="(branch, index) in branches" :key="index" 
        class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
        :style="{ borderLeft: `4px solid ${getBranchColor(index)}` }"
      >
        <div class="flex items-center gap-4 mb-3">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Branch {{ index + 1 }} (R{{ index + 1 }})
            </label>
            <SliderInput
              v-model="branch.resistance"
              :min="1"
              :max="100"
              :step="1"
              unit="Ω"
            />
          </div>
          <div class="text-center min-w-[120px]">
            <div class="text-2xl font-bold" :style="{ color: getBranchColor(index) }">
              {{ branch.current.toFixed(3) }}A
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ branch.percentage.toFixed(1) }}% of total
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Distribution Display -->
    <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Current Distribution</h4>
      
      <div class="space-y-4">
        <!-- Total Current -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Current (I_total)</span>
          <span class="text-xl font-bold text-primary-highlight">{{ totalCurrent.toFixed(3) }}A</span>
        </div>

        <!-- Total Resistance -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Equivalent Resistance (R_eq)</span>
          <span class="text-xl font-bold text-blue-500">{{ equivalentResistance.toFixed(2) }}Ω</span>
        </div>

        <!-- Total Power -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Power (P_total)</span>
          <span class="text-xl font-bold text-green-500">{{ totalPower.toFixed(2) }}W</span>
        </div>

        <!-- Current Bar Chart -->
        <div class="mt-6">
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Current Distribution</div>
          <div class="space-y-2">
            <div v-for="(branch, index) in branches" :key="index" class="relative">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="font-semibold" :style="{ color: getBranchColor(index) }">
                  Branch {{ index + 1 }}
                </span>
                <span class="text-gray-600 dark:text-gray-400">
                  {{ branch.current.toFixed(3) }}A ({{ branch.percentage.toFixed(1) }}%)
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :style="{ 
                    width: `${branch.percentage}%`,
                    backgroundColor: getBranchColor(index)
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formula Display -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📐 Current Divider Rule</h4>
      
      <div class="space-y-3">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">For any branch n:</div>
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200 text-center text-lg">
            I<sub>n</sub> = I<sub>total</sub> × (R<sub>eq</sub> / R<sub>n</sub>)
          </div>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Alternative form:</div>
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200 text-center text-lg">
            I<sub>n</sub> = I<sub>total</sub> × (1 / R<sub>n</sub>) / Σ(1 / R)
          </div>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Key insight:</div>
          <div class="text-gray-700 dark:text-gray-300 text-center">
            <strong>Lower resistance = Higher current</strong><br>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Current divides inversely proportional to resistance
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mt-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 Quick Presets</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="loadPreset('equal')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          ⚖️ Equal Split
        </button>
        <button
          @click="loadPreset('unbalanced')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🔀 Unbalanced
        </button>
        <button
          @click="loadPreset('dominant')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          ▶️ Dominant Path
        </button>
        <button
          @click="loadPreset('three-way')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🔺 Three-Way
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SliderInput from './SliderInput.vue'

interface Branch {
  resistance: number
  current: number
  percentage: number
}

const voltage = ref(12)
const branches = ref<Branch[]>([
  { resistance: 10, current: 0, percentage: 0 },
  { resistance: 20, current: 0, percentage: 0 }
])

// Branch colors
const branchColors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b']

const getBranchColor = (index: number) => branchColors[index % branchColors.length]

const branch1Color = computed(() => getBranchColor(0))
const branch2Color = computed(() => getBranchColor(1))

// Calculate equivalent resistance for parallel circuit
const equivalentResistance = computed(() => {
  const reciprocals = branches.value.map(b => 1 / b.resistance)
  const sum = reciprocals.reduce((a, b) => a + b, 0)
  return 1 / sum
})

// Calculate total current from voltage and equivalent resistance
const totalCurrent = computed(() => {
  return voltage.value / equivalentResistance.value
})

// Calculate total power
const totalPower = computed(() => {
  return voltage.value * totalCurrent.value
})

// Calculate current for each branch and update percentages
const calculateCurrents = () => {
  const total = totalCurrent.value
  branches.value.forEach((branch, index) => {
    // I_n = I_total * (R_eq / R_n)
    branch.current = total * (equivalentResistance.value / branch.resistance)
    // Calculate percentage
    branch.percentage = (branch.current / total) * 100
  })
}

// Watch for changes and recalculate
const updateCurrents = () => {
  calculateCurrents()
}

// Animation speeds based on current (higher current = faster animation)
const branch1Speed = computed(() => {
  const maxCurrent = totalCurrent.value
  const ratio = branches.value[0].current / maxCurrent
  return `0;${(2 - ratio).toFixed(2)};1`
})

const branch2Speed = computed(() => {
  const maxCurrent = totalCurrent.value
  const ratio = branches.value[1].current / maxCurrent
  return `0;${(2 - ratio).toFixed(2)};1`
})

// Add a new branch
const addBranch = () => {
  if (branches.value.length < 4) {
    branches.value.push({ resistance: 15, current: 0, percentage: 0 })
    updateCurrents()
  }
}

// Remove the last branch
const removeBranch = () => {
  if (branches.value.length > 2) {
    branches.value.pop()
    updateCurrents()
  }
}

// Load presets
const loadPreset = (type: string) => {
  switch (type) {
    case 'equal':
      voltage.value = 12
      branches.value = [
        { resistance: 10, current: 0, percentage: 0 },
        { resistance: 10, current: 0, percentage: 0 }
      ]
      break
    case 'unbalanced':
      voltage.value = 12
      branches.value = [
        { resistance: 10, current: 0, percentage: 0 },
        { resistance: 30, current: 0, percentage: 0 }
      ]
      break
    case 'dominant':
      voltage.value = 12
      branches.value = [
        { resistance: 5, current: 0, percentage: 0 },
        { resistance: 100, current: 0, percentage: 0 }
      ]
      break
    case 'three-way':
      voltage.value = 12
      branches.value = [
        { resistance: 10, current: 0, percentage: 0 },
        { resistance: 20, current: 0, percentage: 0 },
        { resistance: 30, current: 0, percentage: 0 }
      ]
      break
  }
  updateCurrents()
}

// Initial calculation
updateCurrents()

// Watch for changes
const stopWatch1 = watch([voltage, branches], () => {
  updateCurrents()
}, { deep: true })
</script>

<script lang="ts">
import { watch } from 'vue'
export default {
  name: 'CurrentDivider'
}
</script>

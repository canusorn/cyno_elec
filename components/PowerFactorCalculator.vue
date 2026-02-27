<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Real Power -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Real Power (P): {{ realPower }} W
        </label>
        <input
          type="range"
          v-model.number="realPower"
          min="100"
          max="10000"
          step="50"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100W</span>
          <span>5kW</span>
          <span>10kW</span>
        </div>
      </div>

      <!-- Reactive Power -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Reactive Power (Q): {{ reactivePower }} VAR
        </label>
        <input
          type="range"
          v-model.number="reactivePower"
          min="0"
          max="10000"
          step="50"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>5k</span>
          <span>10k</span>
        </div>
      </div>

      <!-- Apparent Power -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Apparent Power (S): {{ formatPower(apparentPower) }} VA
        </label>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg"
            :style="{ width: Math.min((apparentPower / 14142) * 100, 100) + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>S = √(P² + Q²)</span>
        </div>
      </div>

      <!-- Power Factor -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Power Factor (PF): {{ powerFactor.toFixed(3) }}
        </label>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
          <div 
            class="h-full rounded-lg transition-all"
            :class="getPFColor()"
            :style="{ width: (powerFactor * 100) + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0</span>
          <span>Unity (1.0)</span>
        </div>
      </div>

      <!-- Phase Angle -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Phase Angle (φ): {{ phaseAngle.toFixed(1) }}°
        </label>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
          <div 
            class="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg"
            :style="{ width: (phaseAngle / 90) * 100 + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0°</span>
          <span>45°</span>
          <span>90°</span>
        </div>
      </div>

      <!-- Frequency -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          System Frequency: {{ frequency }} Hz
        </label>
        <select
          v-model.number="frequency"
          class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
        >
          <option :value="50">50 Hz (Europe, Asia)</option>
          <option :value="60">60 Hz (North America)</option>
        </select>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          @click="setPreset('unity')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-all"
        >
          Unity PF (1.0)
        </button>
        <button
          @click="setPreset('good')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-all"
        >
          Good PF (0.9)
        </button>
        <button
          @click="setPreset('fair')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-500 hover:text-white transition-all"
        >
          Fair PF (0.75)
        </button>
        <button
          @click="setPreset('poor')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all"
        >
          Poor PF (0.5)
        </button>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Power Triangle Visualization -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Power Triangle</h3>
        <svg viewBox="0 0 300 250" class="w-full h-auto">
          <!-- Grid lines -->
          <line v-for="i in 5" :key="'v'+i"
            :x1="30" :y1="50 + i*30" :x2="280" :y2="50 + i*30"
            stroke="#e5e7eb" stroke-width="1" stroke-dasharray="3,3"
          />
          <line v-for="i in 5" :key="'h'+i"
            :x1="30 + i*50" :y1="50" :x2="30 + i*50" :y2="200"
            stroke="#e5e7eb" stroke-width="1" stroke-dasharray="3,3"
          />
          
          <!-- Axis -->
          <line x1="30" y1="200" x2="280" y2="200" stroke="#374151" stroke-width="2"/>
          <line x1="30" y1="200" x2="30" y2="50" stroke="#374151" stroke-width="2"/>
          
          <!-- Labels -->
          <text x="155" y="220" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">Real Power (P)</text>
          <text x="15" y="125" text-anchor="middle" transform="rotate(-90 15 125)" class="text-xs fill-gray-600 dark:fill-gray-400">Reactive Power (Q)</text>
          
          <!-- Power Triangle -->
          <polygon 
            :points="getTrianglePoints()"
            fill="rgba(159, 168, 218, 0.2)"
            stroke="#9FA8DA"
            stroke-width="2"
          />
          
          <!-- P arrow (horizontal) -->
            :from-x="30" :from-y="200" :to-x="200" :to-y="200"
            stroke="#10B981" stroke-width="3"
          />
          
          <!-- Q arrow (vertical) -->
            :from-x="200" :from-y="200" :to-x="200" :to-y="80"
            stroke="#8B5CF6" stroke-width="3"
          />
          
          <!-- S arrow (hypotenuse) -->
            :from-x="30" :from-y="200" :to-x="200" :to-y="80"
            stroke="#3B82F6" stroke-width="3"
          />
          
          <!-- Angle φ -->
          <path 
            :d="getAnglePath()"
            fill="none"
            stroke="#F59E0B"
            stroke-width="2"
            stroke-dasharray="4,4"
          />
          <text :x="55" :y="185" class="text-xs fill-amber-600 dark:fill-amber-400">{{ phaseAngle.toFixed(1) }}°</text>
          
          <!-- Labels on sides -->
          <text :x="115" :y="215" class="text-xs fill-green-600 dark:fill-green-400">{{ formatPower(realPower) }}W</text>
          <text :x="210" :y="140" class="text-xs fill-purple-600 dark:fill-purple-400">{{ formatPower(reactivePower) }}VAR</text>
          <text :x="100" :y="120" class="text-xs fill-blue-600 dark:fill-blue-400">{{ formatPower(apparentPower) }}VA</text>
        </svg>
      </div>

      <!-- Calculation Details -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Calculation Details</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Real Power (P):</span>
            <span class="font-mono font-semibold text-green-600 dark:text-green-400">{{ formatPower(realPower) }} W</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Reactive Power (Q):</span>
            <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ formatPower(reactivePower) }} VAR</span>
          </div>
          <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
            <span class="text-gray-800 dark:text-gray-200 font-semibold">Apparent Power (S):</span>
            <span class="font-mono font-bold text-blue-600 dark:text-blue-400">{{ formatPower(apparentPower) }} VA</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Power Factor (PF):</span>
            <span class="font-mono font-semibold" :class="getPFTextColor()">{{ powerFactor.toFixed(3) }} {{ getPFLabel() }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Phase Angle (φ):</span>
            <span class="font-mono font-semibold text-amber-600 dark:text-amber-400">{{ phaseAngle.toFixed(2) }}°</span>
          </div>
          <div class="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
            <span class="text-gray-800 dark:text-gray-200 font-semibold">Efficiency Loss:</span>
            <span class="font-mono font-bold text-red-600 dark:text-red-400">{{ efficiencyLoss.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulas -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Formulas</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <p>S = √(P² + Q²)</p>
        <p>PF = cos(φ) = P / S</p>
        <p>φ = arccos(PF)</p>
        <p>Q = S × sin(φ)</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const realPower = ref(1000)
const reactivePower = ref(500)
const frequency = ref(50)

// Calculated values
const apparentPower = computed(() => {
  return Math.sqrt(realPower.value ** 2 + reactivePower.value ** 2)
})

const powerFactor = computed(() => {
  return realPower.value / apparentPower.value
})

const phaseAngle = computed(() => {
  return Math.acos(powerFactor.value) * (180 / Math.PI)
})

const efficiencyLoss = computed(() => {
  return (1 - powerFactor.value) * 100
})

// Format power with units
const formatPower = (power: number): string => {
  if (power >= 1000000) {
    return (power / 1000000).toFixed(2) + ' M'
  } else if (power >= 1000) {
    return (power / 1000).toFixed(2) + ' k'
  }
  return power.toFixed(0)
}

// Get color based on PF value
const getPFColor = () => {
  const pf = powerFactor.value
  if (pf >= 0.95) return 'bg-green-500'
  if (pf >= 0.85) return 'bg-blue-500'
  if (pf >= 0.75) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getPFTextColor = () => {
  const pf = powerFactor.value
  if (pf >= 0.95) return 'text-green-600 dark:text-green-400'
  if (pf >= 0.85) return 'text-blue-600 dark:text-blue-400'
  if (pf >= 0.75) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

const getPFLabel = () => {
  const pf = powerFactor.value
  if (pf >= 0.95) return '(Excellent)'
  if (pf >= 0.85) return '(Good)'
  if (pf >= 0.75) return '(Fair)'
  return '(Poor)'
}

// Triangle points for visualization
const getTrianglePoints = () => {
  const scale = 0.17
  const x = 30 + realPower.value * scale
  const y = 200 - reactivePower.value * scale
  return `30,200 ${x},200 ${x},${y}`
}

// Angle arc path
const getAnglePath = () => {
  const radius = 25
  const startAngle = 0
  const endAngle = -phaseAngle.value * (Math.PI / 180)
  
  const x1 = 200 + radius * Math.cos(startAngle)
  const y1 = 200 + radius * Math.sin(startAngle)
  const x2 = 200 + radius * Math.cos(endAngle)
  const y2 = 200 + radius * Math.sin(endAngle)
  
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x2} ${y2}`
}

// Presets
const setPreset = (preset: string) => {
  switch (preset) {
    case 'unity':
      realPower.value = 1000
      reactivePower.value = 0
      break
    case 'good':
      realPower.value = 900
      reactivePower.value = 436
      break
    case 'fair':
      realPower.value = 750
      reactivePower.value = 661
      break
    case 'poor':
      realPower.value = 500
      reactivePower.value = 866
      break
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Calculator Type Selector -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">🔊 Calculator Type</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          @click="calculatorType = 'power'"
          :class="[
            'p-4 rounded-xl font-medium transition-all',
            calculatorType === 'power'
              ? 'bg-primary-highlight text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="text-3xl mb-2">⚡</div>
          <div class="font-bold">Power Ratio</div>
          <div class="text-sm opacity-80">dB = 10 × log₁₀(P₂/P₁)</div>
        </button>
        
        <button
          @click="calculatorType = 'voltage'"
          :class="[
            'p-4 rounded-xl font-medium transition-all',
            calculatorType === 'voltage'
              ? 'bg-primary-highlight text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="text-3xl mb-2">📈</div>
          <div class="font-bold">Voltage Ratio</div>
          <div class="text-sm opacity-80">dB = 20 × log₁₀(V₂/V₁)</div>
        </button>
        
        <button
          @click="calculatorType = 'current'"
          :class="[
            'p-4 rounded-xl font-medium transition-all',
            calculatorType === 'current'
              ? 'bg-primary-highlight text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="text-3xl mb-2">🔌</div>
          <div class="font-bold">Current Ratio</div>
          <div class="text-sm opacity-80">dB = 20 × log₁₀(I₂/I₁)</div>
        </button>
      </div>
    </div>

    <!-- Input Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📝 Input Values</h3>
      
      <!-- Input Value 1 (Reference) -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="font-semibold text-gray-700 dark:text-gray-300">
            {{ inputLabel1 }} (Reference/Input)
          </label>
          <input
            v-model.number="input1"
            type="number"
            min="0"
            step="any"
            class="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          v-model.number="input1"
          type="range"
          min="0"
          max="100"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      <!-- Input Value 2 (Output) -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="font-semibold text-gray-700 dark:text-gray-300">
            {{ inputLabel2 }} (Output/Measured)
          </label>
          <input
            v-model.number="input2"
            type="number"
            min="0"
            step="any"
            class="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          v-model.number="input2"
          type="range"
          min="0"
          max="100"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      <!-- Impedance (for voltage/current) -->
      <div v-if="calculatorType !== 'power'" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <InformationCircleIcon class="h-5 w-5 text-blue-500" />
          <span class="font-semibold text-blue-700 dark:text-blue-300">Equal Impedance Assumed</span>
        </div>
        <p class="text-sm text-blue-600 dark:text-blue-400">
          The voltage and current formulas assume equal impedance (Z₁ = Z₂). For unequal impedances, use the power ratio formula.
        </p>
      </div>

      <!-- Quick Presets -->
      <div class="mt-8">
        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">🎯 Common Ratios</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            @click="applyRatio(1)"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm"
          >
            1:1 (0 dB)
          </button>
          <button
            @click="applyRatio(2)"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm"
          >
            2:1 (+6 dB)
          </button>
          <button
            @click="applyRatio(10)"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm"
          >
            10:1 (+20 dB)
          </button>
          <button
            @click="applyRatio(100)"
            class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors text-sm"
          >
            100:1 (+40 dB)
          </button>
        </div>
      </div>
    </div>

    <!-- Results Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Results</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Decibel Value -->
        <div class="bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-3xl">🔊</span>
            <span class="text-gray-700 dark:text-gray-300 font-medium">Decibels</span>
          </div>
          <div class="text-4xl font-bold text-primary-highlight">
            {{ decibelValue.toFixed(2) }} dB
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {{ decibelValue >= 0 ? 'Gain' : 'Loss' }}
          </div>
        </div>

        <!-- Linear Ratio -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-3xl">📐</span>
            <span class="text-gray-700 dark:text-gray-300 font-medium">Linear Ratio</span>
          </div>
          <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {{ linearRatio.toFixed(4) }}×
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {{ ratioDescription }}
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Detailed Breakdown</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-600 dark:text-gray-400">Input Value:</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ formatValue(input1) }}</span>
          </div>
          <div>
            <span class="text-gray-600 dark:text-gray-400">Output Value:</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ formatValue(input2) }}</span>
          </div>
          <div>
            <span class="text-gray-600 dark:text-gray-400">Logarithm (log₁₀):</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ logRatio.toFixed(4) }}</span>
          </div>
          <div>
            <span class="text-gray-600 dark:text-gray-400">Multiplier:</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ multiplier }}×</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reference Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📋 Common dB Reference Table</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-gray-300 dark:border-gray-600">
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">dB</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Power Ratio</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Voltage/Current Ratio</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Application</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-primary-highlight">0</td>
              <td class="py-3 px-4">1:1</td>
              <td class="py-3 px-4">1:1</td>
              <td class="py-3 px-4">No change (unity)</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-primary-highlight">+3</td>
              <td class="py-3 px-4">~2:1</td>
              <td class="py-3 px-4">~1.41:1</td>
              <td class="py-3 px-4">Double power</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-primary-highlight">+6</td>
              <td class="py-3 px-4">~4:1</td>
              <td class="py-3 px-4">2:1</td>
              <td class="py-3 px-4">Double voltage</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-primary-highlight">+10</td>
              <td class="py-3 px-4">10:1</td>
              <td class="py-3 px-4">~3.16:1</td>
              <td class="py-3 px-4">Decade (power)</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-primary-highlight">+20</td>
              <td class="py-3 px-4">100:1</td>
              <td class="py-3 px-4">10:1</td>
              <td class="py-3 px-4">Decade (voltage)</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-red-500">-3</td>
              <td class="py-3 px-4">~1:2</td>
              <td class="py-3 px-4">~1:1.41</td>
              <td class="py-3 px-4">Half power</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-red-500">-6</td>
              <td class="py-3 px-4">~1:4</td>
              <td class="py-3 px-4">1:2</td>
              <td class="py-3 px-4">Half voltage</td>
            </tr>
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 font-mono font-bold text-red-500">-20</td>
              <td class="py-3 px-4">1:100</td>
              <td class="py-3 px-4">1:10</td>
              <td class="py-3 px-4">Significant attenuation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Formulas -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">🧮 Key Formulas</h3>
      
      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Power Ratio</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">dB = 10 × log₁₀(P₂/P₁)</p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Used for power, intensity, and energy calculations</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Voltage Ratio (equal impedance)</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">dB = 20 × log₁₀(V₂/V₁)</p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Used for voltage, current, and field quantities</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Inverse (dB to linear)</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">Ratio = 10^(dB/10) for power</p>
          <p class="font-mono text-lg text-gray-900 dark:text-white">Ratio = 10^(dB/20) for voltage/current</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

// Component state
const calculatorType = ref<'power' | 'voltage' | 'current'>('power')
const input1 = ref(1)
const input2 = ref(2)

// Input labels based on calculator type
const inputLabel1 = computed(() => {
  switch (calculatorType.value) {
    case 'power': return 'Power 1 (P₁)'
    case 'voltage': return 'Voltage 1 (V₁)'
    case 'current': return 'Current 1 (I₁)'
  }
})

const inputLabel2 = computed(() => {
  switch (calculatorType.value) {
    case 'power': return 'Power 2 (P₂)'
    case 'voltage': return 'Voltage 2 (V₂)'
    case 'current': return 'Current 2 (I₂)'
  }
})

// Calculate logarithm base 10 of ratio
const logRatio = computed(() => {
  if (input1.value === 0 || input2.value === 0) return 0
  const ratio = input2.value / input1.value
  return Math.log10(ratio)
})

// Multiplier based on calculator type
const multiplier = computed(() => {
  return calculatorType.value === 'power' ? 10 : 20
})

// Calculate decibel value
const decibelValue = computed(() => {
  if (input1.value === 0 || input2.value === 0) return -Infinity
  return multiplier.value * logRatio.value
})

// Calculate linear ratio
const linearRatio = computed(() => {
  if (input1.value === 0 || input2.value === 0) return 0
  return input2.value / input1.value
})

// Ratio description
const ratioDescription = computed(() => {
  if (input1.value === 0 || input2.value === 0) return 'Invalid'
  const ratio = linearRatio.value
  if (ratio > 1) return `${ratio.toFixed(2)}× gain`
  if (ratio < 1) return `${(1/ratio).toFixed(2)}× attenuation`
  return 'Unity (1:1)'
})

// Format value for display
const formatValue = (val: number): string => {
  if (val === 0) return '0'
  if (val >= 1e6) return `${val.toExponential(2)}`
  if (val >= 1e3) return `${val.toFixed(2)}`
  if (val >= 1) return `${val.toFixed(4)}`
  return `${val.toExponential(2)}`
}

// Apply common ratio preset
const applyRatio = (ratio: number) => {
  input1.value = 1
  input2.value = ratio
}
</script>

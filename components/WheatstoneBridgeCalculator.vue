<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Vin Input -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Input Voltage (Vin): {{ vin }} V
        </label>
        <input
          type="range"
          v-model.number="vin"
          min="1"
          max="24"
          step="0.5"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1V</span>
          <span>12V</span>
          <span>24V</span>
        </div>
      </div>

      <!-- R1 Resistor -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R1 (Top Left): {{ formatResistance(r1) }}
        </label>
        <input
          type="range"
          v-model.number="r1"
          min="10"
          max="10000"
          :step="getR1Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>1kΩ</span>
          <span>10kΩ</span>
        </div>
      </div>

      <!-- R2 Resistor -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R2 (Top Right): {{ formatResistance(r2) }}
        </label>
        <input
          type="range"
          v-model.number="r2"
          min="10"
          max="10000"
          :step="getR2Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>1kΩ</span>
          <span>10kΩ</span>
        </div>
      </div>

      <!-- R3 Resistor -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R3 (Bottom Left): {{ formatResistance(r3) }}
        </label>
        <input
          type="range"
          v-model.number="r3"
          min="10"
          max="10000"
          :step="getR3Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>1kΩ</span>
          <span>10kΩ</span>
        </div>
      </div>

      <!-- R4 Resistor (Unknown) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R4 (Bottom Right - Unknown): {{ formatResistance(r4) }}
        </label>
        <input
          type="range"
          v-model.number="r4"
          min="10"
          max="10000"
          :step="getR4Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10Ω</span>
          <span>1kΩ</span>
          <span>10kΩ</span>
        </div>
      </div>

      <!-- Calculate R4 for Balance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R4 for Balance: {{ formatResistance(r4Balanced) }}
        </label>
        <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-lg relative">
          <div 
            class="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg"
            :style="{ width: '100%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>R4 = (R2 × R3) / R1</span>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          @click="setPreset('balanced')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition-all"
        >
          Balanced
        </button>
        <button
          @click="setPreset('strain-gauge')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Strain Gauge
        </button>
        <button
          @click="setPreset('temperature')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Temperature
        </button>
        <button
          @click="setPreset('unbalanced')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Unbalanced
        </button>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div 
        class="rounded-lg p-4 text-center transition-all"
        :class="isBalanced ? 'bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10' : 'bg-gradient-to-br from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10'"
      >
        <div class="text-2xl font-bold mb-1" :class="isBalanced ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
          {{ vOut.toFixed(4) }} V
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Bridge Output (Vout)</div>
      </div>
      <div 
        class="rounded-lg p-4 text-center transition-all"
        :class="isBalanced ? 'bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10' : 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10'"
      >
        <div class="text-3xl font-bold mb-1" :class="isBalanced ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'">
          {{ isBalanced ? '✓' : '✗' }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Bridge Status</div>
      </div>
      <div class="bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ vOutPercent.toFixed(2) }}%</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">of Input Voltage</div>
      </div>
    </div>

    <!-- Bridge Circuit Diagram -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Wheatstone Bridge Circuit</h3>
      <div class="flex justify-center">
        <svg viewBox="0 0 400 300" class="w-full max-w-lg">
          <!-- Diamond shape bridge -->
          <!-- Top line (Vin) -->
          <line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="200" y="15" text-anchor="middle" class="text-sm font-semibold fill-current text-red-600">Vin = {{ vin }}V</text>
          
          <!-- Left top (R1) -->
          <line x1="200" y1="50" x2="100" y2="130" stroke="currentColor" stroke-width="3" class="text-amber-600"/>
          <rect x="130" y="70" width="40" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="150" y="65" text-anchor="middle" class="text-xs font-semibold fill-current text-amber-600">R1</text>
          <text x="150" y="95" text-anchor="middle" class="text-xs fill-current text-amber-600">{{ formatResistance(r1) }}</text>
          
          <!-- Right top (R2) -->
          <line x1="200" y1="50" x2="300" y2="130" stroke="currentColor" stroke-width="3" class="text-amber-600"/>
          <rect x="230" y="70" width="40" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="250" y="65" text-anchor="middle" class="text-xs font-semibold fill-current text-amber-600">R2</text>
          <text x="250" y="95" text-anchor="middle" class="text-xs fill-current text-amber-600">{{ formatResistance(r2) }}</text>
          
          <!-- Left bottom (R3) -->
          <line x1="100" y1="130" x2="200" y2="210" stroke="currentColor" stroke-width="3" class="text-amber-600"/>
          <rect x="130" y="155" width="40" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="150" y="150" text-anchor="middle" class="text-xs font-semibold fill-current text-amber-600">R3</text>
          <text x="150" y="180" text-anchor="middle" class="text-xs fill-current text-amber-600">{{ formatResistance(r3) }}</text>
          
          <!-- Right bottom (R4) -->
          <line x1="300" y1="130" x2="200" y2="210" stroke="currentColor" stroke-width="3" class="text-amber-600"/>
          <rect x="230" y="155" width="40" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="250" y="150" text-anchor="middle" class="text-xs font-semibold fill-current text-amber-600">R4</text>
          <text x="250" y="180" text-anchor="middle" class="text-xs fill-current text-amber-600">{{ formatResistance(r4) }}</text>
          
          <!-- Output lines (Vout) -->
          <line x1="100" y1="130" x2="60" y2="130" stroke="currentColor" stroke-width="2" class="text-blue-600"/>
          <line x1="60" y1="130" x2="60" y2="175" stroke="currentColor" stroke-width="2" class="text-blue-600"/>
          
          <line x1="300" y1="130" x2="340" y2="130" stroke="currentColor" stroke-width="2" class="text-blue-600"/>
          <line x1="340" y1="130" x2="340" y2="175" stroke="currentColor" stroke-width="2" class="text-blue-600"/>
          
          <!-- Output indicator -->
          <line x1="60" y1="175" x2="340" y2="175" stroke="currentColor" stroke-width="2" class="text-blue-600"/>
          <text x="200" y="170" text-anchor="middle" class="text-xs font-semibold fill-current text-blue-600">
            Vout = {{ vOut.toFixed(4) }}V
          </text>
          
          <!-- Voltage indicators at nodes -->
          <circle cx="100" cy="130" r="4" fill="currentColor" class="text-blue-600"/>
          <circle cx="300" cy="130" r="4" fill="currentColor" class="text-blue-600"/>
          
          <!-- Node voltages -->
          <text x="80" y="120" text-anchor="end" class="text-xs fill-current text-primary">
            {{ vA.toFixed(2) }}V
          </text>
          <text x="320" y="120" text-anchor="start" class="text-xs fill-current text-primary">
            {{ vB.toFixed(2) }}V
          </text>
          
          <!-- Ground connection -->
          <line x1="200" y1="210" x2="200" y2="250" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="185" y1="250" x2="215" y2="250" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="190" y1="255" x2="210" y2="255" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="195" y1="260" x2="205" y2="260" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <text x="200" y="275" text-anchor="middle" class="text-xs fill-current text-gray-400">GND</text>
          
          <!-- Balance indicator -->
          <g v-if="isBalanced">
            <circle cx="330" cy="40" r="25" fill="rgba(34, 197, 94, 0.1)" stroke="rgba(34, 197, 94, 0.5)" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" class="text-sm font-semibold fill-current text-green-600">✓</text>
          </g>
          <g v-else>
            <circle cx="330" cy="40" r="25" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.5)" stroke-width="2"/>
            <text x="330" y="45" text-anchor="middle" class="text-sm font-semibold fill-current text-red-600">✗</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Calculation Steps -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Calculation Details</h3>
      <div class="space-y-3 text-sm">
        <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">Voltage at node A:</span>
          <span class="font-mono font-semibold text-gray-800 dark:text-gray-200">
            VA = Vin × R3 / (R1 + R3) = {{ vA.toFixed(4) }} V
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">Voltage at node B:</span>
          <span class="font-mono font-semibold text-gray-800 dark:text-gray-200">
            VB = Vin × R4 / (R2 + R4) = {{ vB.toFixed(4) }} V
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">Output voltage:</span>
          <span class="font-mono font-semibold" :class="isBalanced ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'">
            Vout = VB - VA = {{ vOut.toFixed(4) }} V
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">Balance condition:</span>
          <span class="font-mono font-semibold" :class="isBalanced ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'">
            R1 × R4 {{ isBalanced ? '=' : '≠' }} R2 × R3
          </span>
        </div>
        <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
          <span class="text-gray-600 dark:text-gray-400">R4 for balance:</span>
          <span class="font-mono font-semibold text-primary">
            R4 = (R2 × R3) / R1 = {{ formatResistance(r4Balanced) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const vin = ref(5)
const r1 = ref(100)
const r2 = ref(100)
const r3 = ref(100)
const r4 = ref(100)

// Computed
const vA = computed(() => {
  return vin.value * r3.value / (r1.value + r3.value)
})

const vB = computed(() => {
  return vin.value * r4.value / (r2.value + r4.value)
})

const vOut = computed(() => {
  return vB.value - vA.value
})

const vOutPercent = computed(() => {
  return (Math.abs(vOut.value) / vin.value) * 100
})

const r4Balanced = computed(() => {
  return (r2.value * r3.value) / r1.value
})

const isBalanced = computed(() => {
  // Bridge is balanced when Vout is very close to zero (within 0.1% of Vin)
  return Math.abs(vOut.value) < (vin.value * 0.001)
})

// Methods
const formatResistance = (ohms: number): string => {
  if (ohms >= 1000000) {
    return `${(ohms / 1000000).toFixed(2)} MΩ`
  } else if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(1)} kΩ`
  }
  return `${ohms.toFixed(0)} Ω`
}

const getR1Step = (): number => {
  if (r1.value < 100) return 10
  if (r1.value < 1000) return 50
  return 100
}

const getR2Step = (): number => {
  if (r2.value < 100) return 10
  if (r2.value < 1000) return 50
  return 100
}

const getR3Step = (): number => {
  if (r3.value < 100) return 10
  if (r3.value < 1000) return 50
  return 100
}

const getR4Step = (): number => {
  if (r4.value < 100) return 10
  if (r4.value < 1000) return 50
  return 100
}

const setPreset = (preset: string) => {
  switch (preset) {
    case 'balanced':
      r1.value = 100
      r2.value = 100
      r3.value = 100
      r4.value = 100
      break
    case 'strain-gauge':
      // Simulate strain gauge with small change in resistance
      r1.value = 120
      r2.value = 120
      r3.value = 120
      r4.value = 121 // 1% change (simulating strain)
      break
    case 'temperature':
      // Temperature sensor bridge (PT100 approximation)
      r1.value = 100
      r2.value = 100
      r3.value = 100
      r4.value = 138.5 // PT100 at 100°C
      break
    case 'unbalanced':
      r1.value = 100
      r2.value = 220
      r3.value = 330
      r4.value = 470
      break
  }
}
</script>

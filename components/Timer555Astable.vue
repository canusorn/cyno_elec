<template>
  <div class="space-y-6">
    <!-- Controls Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">⚙️ Circuit Parameters</h3>
      
      <!-- R1 Control -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="font-semibold text-gray-700 dark:text-gray-300">R1 (Ω)</label>
          <input
            v-model.number="r1"
            type="number"
            min="1"
            max="10000000"
            step="100"
            class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          v-model.number="r1"
          type="range"
          min="1"
          max="1000000"
          step="100"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1Ω</span>
          <span>{{ formatResistance(r1) }}</span>
          <span>1MΩ</span>
        </div>
      </div>

      <!-- R2 Control -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="font-semibold text-gray-700 dark:text-gray-300">R2 (Ω)</label>
          <input
            v-model.number="r2"
            type="number"
            min="1"
            max="10000000"
            step="100"
            class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
          />
        </div>
        <input
          v-model.number="r2"
          type="range"
          min="1"
          max="1000000"
          step="100"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1Ω</span>
          <span>{{ formatResistance(r2) }}</span>
          <span>1MΩ</span>
        </div>
      </div>

      <!-- Capacitance Control -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="font-semibold text-gray-700 dark:text-gray-300">C (F)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="capacitance"
              type="number"
              min="1e-12"
              max="1"
              step="1e-12"
              class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            />
            <select
              v-model="capacitanceUnit"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            >
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="μF">μF</option>
              <option value="mF">mF</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>
        <input
          v-model.number="capacitance"
          type="range"
          min="1"
          max="1000"
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1{{ capacitanceUnit }}</span>
          <span>{{ formatCapacitance(capacitanceInFarads) }}</span>
          <span>1000{{ capacitanceUnit }}</span>
        </div>
      </div>

      <!-- Quick Presets -->
      <div class="mt-8">
        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">🎯 Quick Presets</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            @click="applyPreset('blink')"
            class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            LED Blinker
            <span class="block text-xs opacity-80">1 Hz</span>
          </button>
          <button
            @click="applyPreset('audio')"
            class="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            Audio Tone
            <span class="block text-xs opacity-80">440 Hz</span>
          </button>
          <button
            @click="applyPreset('pulse')"
            class="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            Short Pulse
            <span class="block text-xs opacity-80">~10% duty</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Results Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Output Characteristics</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Frequency -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">🔄</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium">Frequency</span>
          </div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ formatFrequency(frequency) }}
          </div>
        </div>

        <!-- Period -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">⏱️</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium">Period</span>
          </div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ formatTime(period) }}
          </div>
        </div>

        <!-- Duty Cycle -->
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">📐</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium">Duty Cycle</span>
          </div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {{ dutyCycle.toFixed(1) }}%
          </div>
        </div>

        <!-- Mark Space -->
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">⏲️</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium">Pulse Width</span>
          </div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ formatTime(tHigh) }}
          </div>
        </div>
      </div>

      <!-- Time Breakdown -->
      <div class="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Timing Breakdown</h4>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-600 dark:text-gray-400">High Time (t1):</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ formatTime(tHigh) }}</span>
          </div>
          <div>
            <span class="text-gray-600 dark:text-gray-400">Low Time (t2):</span>
            <span class="ml-2 font-mono font-bold text-gray-900 dark:text-white">{{ formatTime(tLow) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Waveform Visualization -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">〰️ Output Waveform</h3>
      
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-lg p-4">
        <svg viewBox="0 0 800 300" class="w-full h-auto">
          <!-- Background grid -->
          <defs>
            <pattern id="waveform-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
            </pattern>
          </defs>
          <rect x="50" y="30" width="720" height="240" fill="url(#waveform-grid)" />
          
          <!-- Axes -->
          <line x1="50" y1="30" x2="50" y2="270" stroke="#374151" stroke-width="2"/>
          <line x1="50" y1="150" x2="770" y2="150" stroke="#374151" stroke-width="2"/>
          
          <!-- Y-axis labels -->
          <text x="40" y="155" text-anchor="end" font-size="12" fill="#6B7280">0V</text>
          <text x="40" y="50" text-anchor="end" font-size="12" fill="#6B7280">Vcc</text>
          <text x="20" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151" transform="rotate(-90, 20, 150)">Voltage</text>
          
          <!-- X-axis labels -->
          <text x="50" y="290" text-anchor="middle" font-size="12" fill="#6B7280">0</text>
          <text x="230" y="290" text-anchor="middle" font-size="12" fill="#6B7280">T</text>
          <text x="410" y="290" text-anchor="middle" font-size="12" fill="#6B7280">2T</text>
          <text x="590" y="290" text-anchor="middle" font-size="12" fill="#6B7280">3T</text>
          <text x="770" y="290" text-anchor="middle" font-size="12" fill="#6B7280">4T</text>
          <text x="410" y="295" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Time</text>
          
          <!-- Square wave -->
          <path
            :d="waveformPath"
            fill="none"
            stroke="#8B5CF6"
            stroke-width="3"
            stroke-linejoin="round"
          />
          
          <!-- Duty cycle indicator -->
          <rect
            :x="50"
            y="30"
            :width="(720 * dutyCycle) / 100"
            height="240"
            fill="rgba(139, 92, 246, 0.1)"
          />
          
          <!-- Annotations -->
          <text :x="50 + (720 * dutyCycle) / 200" y="25" font-size="11" fill="#8B5CF6" font-weight="bold">
            HIGH ({{ dutyCycle.toFixed(1) }}%)
          </text>
          <text :x="50 + 720 * dutyCycle / 100 + 10" y="25" font-size="11" fill="#6B7280" font-weight="bold">
            LOW ({{ (100 - dutyCycle).toFixed(1) }}%)
          </text>
        </svg>
      </div>
    </div>

    <!-- Formulas -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">🧮 Key Formulas</h3>
      
      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Frequency</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">f = 1.44 / ((R1 + 2×R2) × C)</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">High Time ( Charging C through R1+R2 )</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">t1 = 0.693 × (R1 + R2) × C</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Low Time ( Discharging C through R2 )</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">t2 = 0.693 × R2 × C</p>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2">Duty Cycle</h4>
          <p class="font-mono text-lg text-gray-900 dark:text-white">DC = (R1 + R2) / (R1 + 2×R2) × 100%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Component state
const r1 = ref(1000) // 1kΩ
const r2 = ref(1000) // 1kΩ
const capacitance = ref(10)
const capacitanceUnit = ref('μF')

// Capacitance unit multipliers
const unitMultipliers: Record<string, number> = {
  pF: 1e-12,
  nF: 1e-9,
  μF: 1e-6,
  mF: 1e-3,
  F: 1
}

// Convert capacitance to Farads
const capacitanceInFarads = computed(() => {
  return capacitance.value * unitMultipliers[capacitanceUnit.value]
})

// Calculate timing parameters
const tHigh = computed(() => {
  return 0.693 * (r1.value + r2.value) * capacitanceInFarads.value
})

const tLow = computed(() => {
  return 0.693 * r2.value * capacitanceInFarads.value
})

const period = computed(() => {
  return tHigh.value + tLow.value
})

const frequency = computed(() => {
  if (period.value === 0) return 0
  return 1 / period.value
})

const dutyCycle = computed(() => {
  if (period.value === 0) return 50
  return (tHigh.value / period.value) * 100
})

// Generate waveform path
const waveformPath = computed(() => {
  const cycles = 4
  const width = 720
  const cycleWidth = width / cycles
  const highWidth = (cycleWidth * dutyCycle.value) / 100
  const lowWidth = cycleWidth - highWidth
  const startX = 50
  const highY = 50
  const lowY = 150
  
  let path = `M ${startX} ${lowY}`
  
  for (let i = 0; i < cycles; i++) {
    const x = startX + (i * cycleWidth)
    
    // Rising edge
    path += ` L ${x} ${highY}`
    // High level
    path += ` L ${x + highWidth} ${highY}`
    // Falling edge
    path += ` L ${x + highWidth} ${lowY}`
    // Low level
    path += ` L ${x + cycleWidth} ${lowY}`
  }
  
  return path
})

// Formatting functions
const formatResistance = (ohms: number): string => {
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`
  return `${ohms.toFixed(2)} Ω`
}

const formatCapacitance = (farads: number): string => {
  if (farads >= 1) return `${farads.toFixed(6)} F`
  if (farads >= 1e-3) return `${(farads * 1e3).toFixed(3)} mF`
  if (farads >= 1e-6) return `${(farads * 1e6).toFixed(3)} μF`
  if (farads >= 1e-9) return `${(farads * 1e9).toFixed(3)} nF`
  return `${(farads * 1e12).toFixed(3)} pF`
}

const formatFrequency = (hz: number): string => {
  if (hz === 0) return '0 Hz'
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(3)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(3)} kHz`
  return `${hz.toFixed(3)} Hz`
}

const formatTime = (seconds: number): string => {
  if (seconds === 0) return '0 s'
  if (seconds >= 1) return `${seconds.toFixed(3)} s`
  if (seconds >= 1e-3) return `${(seconds * 1e3).toFixed(3)} ms`
  if (seconds >= 1e-6) return `${(seconds * 1e6).toFixed(3)} μs`
  return `${(seconds * 1e9).toFixed(3)} ns`
}

// Preset configurations
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'blink':
      r1.value = 47000 // 47kΩ
      r2.value = 47000 // 47kΩ
      capacitance.value = 10
      capacitanceUnit.value = 'μF'
      break
    case 'audio':
      r1.value = 1000 // 1kΩ
      r2.value = 1000 // 1kΩ
      capacitance.value = 100
      capacitanceUnit.value = 'nF'
      break
    case 'pulse':
      r1.value = 1000 // 1kΩ
      r2.value = 10000 // 10kΩ
      capacitance.value = 10
      capacitanceUnit.value = 'nF'
      break
  }
}
</script>

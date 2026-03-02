<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
      ⚡ PWM Generator Simulator
    </h2>

    <!-- Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Duty Cycle Control -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
        <label class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Duty Cycle: {{ dutyCycle }}%
        </label>
        <input
          type="range"
          v-model.number="dutyCycle"
          min="0"
          max="100"
          step="1"
          class="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Frequency Control -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
        <label class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Frequency: {{ frequency }} Hz
        </label>
        <input
          type="range"
          v-model.number="frequency"
          min="1"
          max="1000"
          step="1"
          class="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>1 Hz</span>
          <span>250 Hz</span>
          <span>500 Hz</span>
          <span>750 Hz</span>
          <span>1 kHz</span>
        </div>
      </div>
    </div>

    <!-- PWM Waveform Visualization -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 mb-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        📊 PWM Waveform
      </h3>

      <!-- Real-time Waveform -->
      <div class="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6">
        <svg viewBox="0 0 800 200" class="w-full h-auto">
          <!-- Background grid -->
          <defs>
            <pattern id="pwmGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
            </pattern>
          </defs>
          <rect x="40" y="20" width="720" height="160" fill="url(#pwmGrid)" />

          <!-- Axes -->
          <line x1="40" y1="100" x2="760" y2="100" stroke="#6B7280" stroke-width="2" />
          <line x1="40" y1="20" x2="40" y2="180" stroke="#6B7280" stroke-width="2" />

          <!-- Y-axis labels -->
          <text x="30" y="105" text-anchor="end" font-size="12" fill="#6B7280">0V</text>
          <text x="30" y="45" text-anchor="end" font-size="12" fill="#6B7280">5V</text>
          <text x="15" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151" transform="rotate(-90, 15, 100)">Voltage</text>

          <!-- X-axis labels -->
          <text x="40" y="195" text-anchor="middle" font-size="12" fill="#6B7280">0</text>
          <text x="220" y="195" text-anchor="middle" font-size="12" fill="#6B7280">T/4</text>
          <text x="400" y="195" text-anchor="middle" font-size="12" fill="#6B7280">T/2</text>
          <text x="580" y="195" text-anchor="middle" font-size="12" fill="#6B7280">3T/4</text>
          <text x="760" y="195" text-anchor="middle" font-size="12" fill="#6B7280">T</text>
          <text x="400" y="215" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">Time</text>

          <!-- PWM Signal Path -->
          <path
            :d="pwmSignalPath"
            fill="none"
            stroke="#8B5CF6"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Duty cycle indicator -->
          <line
            :x1="40 + (dutyCycle / 100) * 720"
            y1="20"
            :x2="40 + (dutyCycle / 100) * 720"
            y2="180"
            stroke="#EF4444"
            stroke-width="2"
            stroke-dasharray="8,4"
          />
          <text
            :x="40 + (dutyCycle / 100) * 720"
            y="15"
            text-anchor="middle"
            font-size="12"
            font-weight="bold"
            fill="#EF4444"
          >
            {{ dutyCycle }}%
          </text>

          <!-- High period indicator -->
          <rect
            x="40"
            y="55"
            :width="(dutyCycle / 100) * 720"
            height="90"
            fill="rgba(139, 92, 246, 0.1)"
            stroke="none"
          />

          <!-- Low period indicator -->
          <rect
            :x="40 + (dutyCycle / 100) * 720"
            y="55"
            :width="(1 - dutyCycle / 100) * 720"
            height="90"
            fill="rgba(236, 72, 153, 0.1)"
            stroke="none"
          />
        </svg>
      </div>

      <!-- Signal Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-300">{{ dutyCycle }}%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Duty Cycle</div>
        </div>
        <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-300">{{ frequency }} Hz</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Frequency</div>
        </div>
        <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-300">{{ period }} ms</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Period</div>
        </div>
        <div class="bg-pink-100 dark:bg-pink-900 rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-pink-600 dark:text-pink-300">{{ averageVoltage }} V</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Avg. Voltage</div>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Quick Presets</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          @click="dutyCycle = 0; frequency = 100"
          class="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          0% (OFF)
        </button>
        <button
          @click="dutyCycle = 25; frequency = 100"
          class="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
        >
          25%
        </button>
        <button
          @click="dutyCycle = 50; frequency = 100"
          class="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
        >
          50%
        </button>
        <button
          @click="dutyCycle = 75; frequency = 100"
          class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          75%
        </button>
        <button
          @click="dutyCycle = 100; frequency = 100"
          class="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        >
          100% (ON)
        </button>
        <button
          @click="dutyCycle = 10; frequency = 50"
          class="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors"
        >
          Low Brightness
        </button>
        <button
          @click="dutyCycle = 90; frequency = 50"
          class="px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-colors"
        >
          High Speed
        </button>
        <button
          @click="dutyCycle = 50; frequency = 500"
          class="px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
        >
          High Freq
        </button>
      </div>
    </div>

    <!-- Applications -->
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Common Applications</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-2xl mb-2">💡</div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">LED Dimming</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Control LED brightness by adjusting duty cycle (0-100%)</p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">Typical: 100Hz - 1kHz</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-2xl mb-2">🔌</div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">Motor Speed Control</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Vary motor speed by changing average voltage</p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">Typical: 10kHz - 20kHz</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-2xl mb-2">🎮</div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-1">Servo Control</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Position servos using specific pulse widths (1-2ms)</p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">Typical: 50Hz (20ms period)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const dutyCycle = ref(50)
const frequency = ref(100)

// Calculate period in milliseconds
const period = computed(() => {
  return (1000 / frequency.value).toFixed(2)
})

// Calculate average voltage (assuming 5V logic)
const averageVoltage = computed(() => {
  return ((dutyCycle.value / 100) * 5).toFixed(2)
})

// Generate PWM signal path for SVG
const pwmSignalPath = computed(() => {
  const width = 720
  const highY = 40
  const lowY = 160
  const startX = 40
  const cycles = 4
  const cycleWidth = width / cycles

  let path = ''

  for (let i = 0; i < cycles; i++) {
    const cycleStartX = startX + (i * cycleWidth)
    const highWidth = cycleWidth * (dutyCycle.value / 100)
    const lowWidth = cycleWidth - highWidth

    // Start of cycle (rising edge)
    if (i === 0) {
      path += `M ${cycleStartX} ${lowY} `
    }

    // Rising edge
    path += `L ${cycleStartX} ${highY} `

    // High level
    path += `L ${cycleStartX + highWidth} ${highY} `

    // Falling edge
    path += `L ${cycleStartX + highWidth} ${lowY} `

    // Low level (end of cycle)
    if (i < cycles - 1) {
      path += `L ${cycleStartX + cycleWidth} ${lowY} `
    }
  }

  return path
})
</script>

<template>
  <div class="circuit-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        ⚡ Interactive Circuit Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        ปรับค่า Voltage และ Resistance ดูการเปลี่ยนแปลงของ Current แบบ real-time
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 600 200" class="w-full h-auto">
        <!-- Wires -->
        <path
          d="M 100 100 L 250 100"
          :stroke="wireColor"
          stroke-width="4"
          fill="none"
        />
        <path
          d="M 350 100 L 500 100"
          :stroke="wireColor"
          stroke-width="4"
          fill="none"
        />
        <path
          d="M 300 50 L 300 150"
          :stroke="wireColor"
          stroke-width="4"
          fill="none"
        />

        <!-- Voltage Source -->
        <circle cx="100" cy="100" r="35" fill="white" stroke="#3B82F6" stroke-width="3"/>
        <text x="100" y="105" text-anchor="middle" :font-size="14" font-weight="bold" fill="#1E40AF">{{ voltage }}V</text>

        <!-- Resistor -->
        <rect x="250" y="80" width="100" height="40" fill="white" stroke="#7C3AED" stroke-width="3"/>
        <text x="300" y="105" text-anchor="middle" :font-size="14" font-weight="bold" fill="#5B21B6">{{ resistance }}Ω</text>

        <!-- Current Animation (Electrons) -->
        <g v-if="isSimulating">
          <circle r="5" fill="#EF4444">
            <animateMotion
              :dur="animationDuration"
              repeatCount="indefinite"
              path="M 100 100 L 250 100"
            />
          </circle>
          <circle r="5" fill="#EF4444">
            <animateMotion
              :dur="animationDuration"
              repeatCount="indefinite"
              path="M 350 100 L 500 100"
            />
          </circle>
          <circle r="5" fill="#EF4444">
            <animateMotion
              :dur="animationDuration"
              repeatCount="indefinite"
              path="M 300 150 L 300 50"
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
            🔋 Voltage (V)
          </label>
          <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ voltage }}V
          </span>
        </div>
        <input
          type="range"
          v-model.number="voltage"
          min="1"
          max="24"
          step="0.5"
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-blue"
          @input="calculateCurrent"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1V</span>
          <span>12V</span>
          <span>24V</span>
        </div>
      </div>

      <!-- Resistance Slider -->
      <div class="slider-group">
        <div class="flex justify-between items-center mb-2">
          <label class="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Ω Resistance (R)
          </label>
          <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {{ resistance }}Ω
          </span>
        </div>
        <input
          type="range"
          v-model.number="resistance"
          min="1"
          max="100"
          step="1"
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-purple"
          @input="calculateCurrent"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
          <span>1Ω</span>
          <span>50Ω</span>
          <span>100Ω</span>
        </div>
      </div>

      <!-- Current Display -->
      <div class="current-display bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 text-center">
        <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Calculated Current (I = V ÷ R)</div>
        <div class="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          {{ current.toFixed(3) }}A
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {{ current.toFixed(3) }} Amperes = {{ voltage }} Volts ÷ {{ resistance }} Ohms
        </div>
      </div>

      <!-- Power Display -->
      <div class="power-display bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 text-center">
        <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Power (P = V × I)</div>
        <div class="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
          {{ power.toFixed(2) }}W
        </div>
      </div>
    </div>

    <!-- Formula Reference -->
    <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">📚 สูตรที่ใช้:</div>
      <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <div>• Current: I = V ÷ R (โอห์ม)</div>
        <div>• Power: P = V × I (กำลังไฟฟ้า)</div>
        <div>• หรือ: P = V² ÷ R หรือ P = I² × R</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// State
const voltage = ref(12) // Volts
const resistance = ref(10) // Ohms
const isSimulating = ref(true)

// Computed
const current = computed(() => {
  return voltage.value / resistance.value
})

const power = computed(() => {
  return voltage.value * current.value
})

const wireColor = computed(() => {
  // Change wire color based on current
  if (current.value < 0.5) return '#94A3B8' // Gray - low current
  if (current.value < 2) return '#22C55E' // Green - normal
  if (current.value < 5) return '#EAB308' // Yellow - medium
  return '#EF4444' // Red - high current
})

const animationDuration = computed(() => {
  // Faster animation for higher current
  const baseDuration = 3 // seconds
  const speedFactor = Math.max(0.5, current.value)
  return `${baseDuration / speedFactor}s`
})

// Methods
const calculateCurrent = () => {
  // Triggered by sliders - computed properties update automatically
  isSimulating.value = true
}

// Lifecycle
onMounted(() => {
  calculateCurrent()
})
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
  border: 2px solid currentColor;
}

.slider-blue::-webkit-slider-thumb {
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-color: #3B82F6;
}

.slider-purple::-webkit-slider-thumb {
  background: linear-gradient(135deg, #8B5CF6, #6D28D9);
  border-color: #8B5CF6;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 12px;
  border-radius: 6px;
}

.slider-blue::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #DBEAFE, #3B82F6);
}

.slider-purple::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #EDE9FE, #8B5CF6);
}

/* Dark mode slider adjustments */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-thumb {
    background: #1F2937;
    border-color: #60A5FA;
  }
}
</style>

<template>
  <div class="circuit-demo w-full max-w-4xl">
    <!-- Ohm's Law Demo -->
    <div v-if="chapterSlug === 'ohms-law'" class="ohms-law-demo">
      <div class="mb-6 p-4 bg-primary/10 dark:bg-primary/5 rounded-lg">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ohm's Law: V = I × R</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Adjust the voltage and resistance to see how the current changes. Hover over components for labels.
        </p>
      </div>

      <!-- Interactive Circuit -->
      <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border-2 border-primary/20">
        <svg viewBox="0 0 400 250" class="w-full h-auto" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
          <!-- Circuit Background -->
          <defs>
            <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#9FA8DA;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7986CB;stop-opacity:1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Voltage Source (Battery) -->
          <g class="voltage-source" @mouseenter="showLabel('voltage')" @mouseleave="hideLabel">
            <rect x="30" y="85" width="20" height="80" fill="white" stroke="#7986CB" stroke-width="3" rx="3"/>
            <line x1="35" y1="100" x2="45" y2="100" stroke="#7986CB" stroke-width="2"/>
            <line x1="35" y1="150" x2="45" y2="150" stroke="#7986CB" stroke-width="2"/>
            <text x="40" y="70" text-anchor="middle" class="text-sm font-bold fill-current text-primary">V</text>
            <text x="40" y="180" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-300">{{ voltage }}V</text>
          </g>

          <!-- Resistor -->
          <g class="resistor" @mouseenter="showLabel('resistance')" @mouseleave="hideLabel">
            <rect x="180" y="115" width="80" height="20" fill="white" stroke="#7986CB" stroke-width="3" rx="3"/>
            <path d="M185 125 L195 120 L205 130 L215 120 L225 130 L235 120 L245 130 L255 125" stroke="#9FA8DA" stroke-width="2" fill="none"/>
            <text x="220" y="110" text-anchor="middle" class="text-sm font-bold fill-current text-primary">R</text>
            <text x="220" y="155" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-300">{{ resistance }}Ω</text>
          </g>

          <!-- Ammeter -->
          <g class="ammeter" @mouseenter="showLabel('current')" @mouseleave="hideLabel">
            <circle cx="340" cy="125" r="25" fill="white" stroke="#7986CB" stroke-width="3"/>
            <text x="340" y="130" text-anchor="middle" class="text-sm font-bold fill-current text-primary">A</text>
            <text x="340" y="165" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-300">{{ current }}A</text>
          </g>

          <!-- Wires -->
          <g class="wires">
            <!-- Top wire -->
            <line x1="50" y1="85" x2="50" y2="50" stroke="url(#wireGradient)" stroke-width="3"/>
            <line x1="50" y1="50" x2="340" y2="50" stroke="url(#wireGradient)" stroke-width="3"/>
            <line x1="340" y1="50" x2="340" y2="100" stroke="url(#wireGradient)" stroke-width="3"/>

            <!-- Bottom wire -->
            <line x1="50" y1="165" x2="50" y2="200" stroke="url(#wireGradient)" stroke-width="3"/>
            <line x1="50" y1="200" x2="340" y2="200" stroke="url(#wireGradient)" stroke-width="3"/>
            <line x1="340" y1="200" x2="340" y2="150" stroke="url(#wireGradient)" stroke-width="3"/>

            <!-- Resistor connection -->
            <line x1="180" y1="125" x2="180" y2="50" stroke="url(#wireGradient)" stroke-width="3" stroke-dasharray="5,5"/>
            <line x1="260" y1="125" x2="260" y2="200" stroke="url(#wireGradient)" stroke-width="3" stroke-dasharray="5,5"/>
          </g>

          <!-- Animated Electrons -->
          <g class="electrons" filter="url(#glow)">
            <circle r="4" fill="#FFD700">
              <animateMotion
                :dur="animationDuration"
                repeatCount="indefinite"
                path="M 50,85 L 50,50 L 180,50 L 180,125 L 260,125 L 260,200 L 50,200 L 50,165"/>
            </circle>
            <circle r="4" fill="#FFD700">
              <animateMotion
                :dur="animationDuration"
                begin="0.5s"
                repeatCount="indefinite"
                path="M 50,85 L 50,50 L 180,50 L 180,125 L 260,125 L 260,200 L 50,200 L 50,165"/>
            </circle>
            <circle r="4" fill="#FFD700">
              <animateMotion
                :dur="animationDuration"
                begin="1s"
                repeatCount="indefinite"
                path="M 50,85 L 50,50 L 180,50 L 180,125 L 260,125 L 260,200 L 50,200 L 50,165"/>
            </circle>
          </g>
        </svg>

        <!-- Label Tooltip -->
        <Transition name="fade">
          <div
            v-if="hoveredLabel"
            class="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none z-10"
            :style="{ left: `${mousePosition.x}px`, top: `${mousePosition.y - 40}px` }">
            {{ hoveredLabel }}
          </div>
        </Transition>
      </div>

      <!-- Controls -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Voltage Control -->
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voltage (V): {{ voltage }}V
          </label>
          <input
            v-model.number="voltage"
            type="range"
            min="1"
            max="24"
            step="0.5"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1V</span>
            <span>24V</span>
          </div>
        </div>

        <!-- Resistance Control -->
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resistance (R): {{ resistance }}Ω
          </label>
          <input
            v-model.number="resistance"
            type="range"
            min="1"
            max="100"
            step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1Ω</span>
            <span>100Ω</span>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
        <div class="text-center">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">Calculated Current</div>
          <div class="text-4xl font-bold text-primary dark:text-primary-light">
            {{ current }} <span class="text-2xl">Amperes</span>
          </div>
          <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Formula: I = V / R = {{ voltage }}V / {{ resistance }}Ω = {{ current }}A
          </div>
        </div>
      </div>
    </div>

    <!-- Default Demo for other chapters -->
    <div v-else class="default-demo">
      <div class="text-center p-12 bg-white dark:bg-gray-800 rounded-xl">
        <div class="text-6xl mb-4">⚡</div>
        <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Interactive Demo</h4>
        <p class="text-gray-600 dark:text-gray-300">
          Demo for "{{ chapterSlug }}" coming soon!
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Components: {{ components.join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  chapterSlug: {
    type: String,
    required: true
  },
  components: {
    type: Array,
    default: () => []
  }
})

// Reactive state
const voltage = ref(12)
const resistance = ref(10)
const hoveredLabel = ref(null)
const mousePosition = ref({ x: 0, y: 0 })

// Computed values
const current = computed(() => {
  return (voltage.value / resistance.value).toFixed(2)
})

const animationDuration = computed(() => {
  // Faster animation for higher current
  const baseSpeed = 5 // seconds
  const speedFactor = Math.max(0.5, current.value / 5)
  return `${baseSpeed / speedFactor}s`
})

// Methods
const showLabel = (type) => {
  const labels = {
    voltage: 'Voltage Source (V) - The driving force',
    resistance: 'Resistor (R) - Opposes current flow',
    current: 'Ammeter (A) - Measures current'
  }
  hoveredLabel.value = labels[type] || type
}

const hideLabel = () => {
  hoveredLabel.value = null
}

const handleMouseMove = (event) => {
  const svg = event.currentTarget
  const rect = svg.getBoundingClientRect()
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

const handleMouseLeave = () => {
  hideLabel()
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-light {
  color: var(--tw-color-primary-light) !important;
}

.circuit-demo {
  @apply w-full;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(159, 168, 218, 0.5);
  transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: var(--tw-color-primary-dark);
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(159, 168, 218, 0.5);
  transition: all 0.2s;
}

input[type="range"]::-moz-range-thumb:hover {
  background: var(--tw-color-primary-dark);
  transform: scale(1.1);
}

/* Electron glow animation */
@keyframes electronPulse {
  0%, 100% {
    filter: drop-shadow(0 0 6px #FFD700);
  }
  50% {
    filter: drop-shadow(0 0 12px #FFD700);
  }
}

.electrons circle {
  animation: electronPulse 1s ease-in-out infinite;
}
</style>

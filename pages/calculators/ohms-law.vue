<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Ohm's Law Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate voltage, current, or resistance with interactive visual feedback
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span :class="{'text-primary-highlight': activeInputs.voltage}" class="transition-colors duration-300">V</span>
              <span class="text-gray-400">=</span>
              <span :class="{'text-primary-highlight': activeInputs.current}" class="transition-colors duration-300">I</span>
              <span class="text-gray-400">×</span>
              <span :class="{'text-primary-highlight': activeInputs.resistance}" class="transition-colors duration-300">R</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Circuit Diagram -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Interactive Circuit
          </h3>
          
          <!-- Large SVG Circuit Diagram -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 700 300" class="w-full max-w-4xl h-auto">
              <!-- Background Grid -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                </pattern>
              </defs>
              <rect width="700" height="300" fill="url(#grid)" />
              
              <!-- Main Circuit Wires -->
              <!-- Top wire (complete loop) -->
              <path d="M 150 150 L 250 150 L 350 150 L 450 150 L 450 100 L 550 100" 
                :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
              <path d="M 550 200 L 450 200 L 450 250 L 350 250 L 250 250 L 150 250 L 150 150" 
                :stroke="wireColor" stroke-width="4" fill="none" class="transition-all duration-300"/>
              
              <!-- Voltage Source (Left) -->
              <g class="voltage-source">
                <circle cx="150" cy="150" r="50" fill="white" :stroke="voltageColor" stroke-width="4" class="transition-all duration-300"/>
                <text x="150" y="145" text-anchor="middle" :font-size="20" font-weight="bold" :fill="voltageColor">
                  {{ inputs.voltage || '---' }}V
                </text>
                <text x="150" y="165" text-anchor="middle" :font-size="14" fill="#666">Voltage</text>
                
                <!-- +/- indicators -->
                <text x="135" y="115" :font-size="16" fill="#22c55e" font-weight="bold">+</text>
                <text x="135" y="185" :font-size="16" fill="#ef4444" font-weight="bold">−</text>
              </g>
              
              <!-- Resistor (Right) -->
              <g class="resistor">
                <rect x="450" y="130" width="100" height="40" fill="white" :stroke="resistorColor" stroke-width="4" 
                  :rx="5" class="transition-all duration-300"/>
                <!-- Zigzag pattern inside resistor -->
                <polyline points="455,150 465,140 475,160 485,140 495,160 505,140 515,160 525,140 535,160 545,150" 
                  fill="none" :stroke="resistorColor" stroke-width="3" class="transition-all duration-300"/>
                <text x="500" y="175" text-anchor="middle" :font-size="16" font-weight="bold" :fill="resistorColor">
                  {{ inputs.resistance || '---' }}Ω
                </text>
                <text x="500" y="195" text-anchor="middle" :font-size="12" fill="#666">Resistor</text>
              </g>
              
              <!-- Current Flow Animation (Multiple particles) -->
              <g v-if="displayCurrent > 0">
                <!-- Particle 1 -->
                <circle r="6" fill="#fbbf24" class="current-particle" filter="url(#glow)">
                  <animateMotion :dur="animationDuration" repeatCount="indefinite">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
                <!-- Particle 2 (delayed) -->
                <circle r="6" fill="#fbbf24" class="current-particle" filter="url(#glow)">
                  <animateMotion :dur="animationDuration" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
                <!-- Particle 3 (delayed more) -->
                <circle r="6" fill="#fbbf24" class="current-particle" filter="url(#glow)">
                  <animateMotion :dur="animationDuration" repeatCount="indefinite" begin="1s">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
              </g>
              
              <!-- Invisible path for current flow -->
              <path id="currentPath" d="M 150 150 L 250 150 L 350 150 L 450 150 L 450 100 L 550 100 L 550 200 L 450 200 L 450 250 L 350 250 L 250 250 L 150 250 L 150 150" 
                fill="none" stroke="none"/>
              
              <!-- Glow filter for current particles -->
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <!-- Current Arrow -->
              <g v-if="displayCurrent > 0">
                <polygon points="350,90 365,100 365,80" :fill="currentColor" class="transition-all duration-300"/>
                <text x="375" y="105" :font-size="16" font-weight="bold" :fill="currentColor">
                  I = {{ formatNumber(displayCurrent) }}A
                </text>
              </g>
              
              <!-- Power Display -->
              <g v-if="calculatedPower !== null">
                <rect x="250" y="260" width="200" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
                <text x="350" y="280" text-anchor="middle" :font-size="14" font-weight="bold" fill="#b45309">
                  Power: {{ formatNumber(calculatedPower) }}W
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Values</h3>
              
              <!-- Preset Buttons -->
              <div class="mb-6">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
                <div class="flex flex-wrap gap-2">
                  <button @click="applyPreset('led')" 
                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    LED (3V, 20mA)
                  </button>
                  <button @click="applyPreset('motor')" 
                    class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    Motor (12V, 2A)
                  </button>
                  <button @click="applyPreset('heater')" 
                    class="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium">
                    Heater (220V, 5A)
                  </button>
                  <button @click="clearInputs" 
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    Clear
                  </button>
                </div>
              </div>

              <!-- Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voltage (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputs.voltage"
                    type="number" 
                    step="any"
                    placeholder="Enter voltage"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">V</span>
                </div>
                <input 
                  v-model.number="inputs.voltage"
                  type="range"
                  min="0"
                  max="240"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0V</span>
                  <span>120V</span>
                  <span>240V</span>
                </div>
              </div>

              <!-- Current Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current (I)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputs.current"
                    type="number" 
                    step="any"
                    placeholder="Enter current"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">A</span>
                </div>
                <input 
                  v-model.number="inputs.current"
                  type="range"
                  min="0"
                  max="10"
                  step="0.001"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0A</span>
                  <span>5A</span>
                  <span>10A</span>
                </div>
              </div>

              <!-- Resistance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputs.resistance"
                    type="number" 
                    step="any"
                    placeholder="Enter resistance"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">Ω</span>
                </div>
                <input 
                  v-model.number="inputs.resistance"
                  type="range"
                  min="0"
                  max="1000"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0Ω</span>
                  <span>500Ω</span>
                  <span>1000Ω</span>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              
              <!-- Calculated Value Display -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">{{ calculatedVariable.label }}</p>
                  <div class="text-5xl font-bold text-primary mb-2 transition-all duration-300">
                    {{ calculatedVariable.value !== null ? formatNumber(calculatedVariable.value) : '---' }}
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-xl">{{ calculatedVariable.unit }}</p>
                </div>
              </div>

              <!-- Calculation Steps -->
              <div v-if="calculationSteps.length > 0" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📐 Calculation Steps:</h4>
                <ol class="space-y-2">
                  <li v-for="(step, index) in calculationSteps" :key="index" 
                    class="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span class="font-bold mr-2">{{ index + 1 }}.</span>
                    <span v-html="step"></span>
                  </li>
                </ol>
              </div>

              <!-- Formula Explanation -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📘 Ohm's Law</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Ohm's Law (V = I × R) states that voltage equals current multiplied by resistance. This fundamental electrical 
                  law describes the relationship between voltage, current, and resistance in an electrical circuit.
                </p>
                <div class="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-mono">
                    V = I × R<br>
                    I = V ÷ R<br>
                    R = V ÷ I
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { BoltIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: "Ohm's Law Calculator - Cyno Electric",
  meta: [
    { name: 'description', content: "Calculate voltage, current, or resistance using Ohm's Law (V = I × R). Professional electrical engineering calculator." },
    { name: 'keywords', content: "ohms law calculator, voltage calculator, current calculator, resistance calculator, electrical engineering" }
  ]
})

const colorMode = useColorMode()

// Input values
const inputs = ref({
  voltage: null,
  current: null,
  resistance: null
})

// Active inputs tracking
const activeInputs = ref({
  voltage: false,
  current: false,
  resistance: false
})

// Preset values
const presets = {
  led: { voltage: 3, current: 0.02, resistance: null },
  motor: { voltage: 12, current: 2, resistance: null },
  heater: { voltage: 220, current: 5, resistance: null }
}

// Apply preset
function applyPreset(type) {
  const preset = presets[type]
  if (preset) {
    inputs.value = { ...preset }
  }
}

// Clear all inputs
function clearInputs() {
  inputs.value = {
    voltage: null,
    current: null,
    resistance: null
  }
}

// Format number for display
function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '---'
  return parseFloat(num).toFixed(4)
}

// Check which inputs are active
watch(() => inputs.value.voltage, (newVal) => {
  activeInputs.value.voltage = newVal !== null && newVal !== ''
})
watch(() => inputs.value.current, (newVal) => {
  activeInputs.value.current = newVal !== null && newVal !== ''
})
watch(() => inputs.value.resistance, (newVal) => {
  activeInputs.value.resistance = newVal !== null && newVal !== ''
})

// Computed: Check if we have valid inputs
const hasVoltage = computed(() => {
  return inputs.value.voltage !== null && inputs.value.voltage !== '' && !isNaN(inputs.value.voltage)
})

const hasCurrent = computed(() => {
  return inputs.value.current !== null && inputs.value.current !== '' && !isNaN(inputs.value.current)
})

const hasResistance = computed(() => {
  return inputs.value.resistance !== null && inputs.value.resistance !== '' && !isNaN(inputs.value.resistance)
})

// Computed: Calculated values
const calculatedVariable = computed(() => {
  // Calculate voltage when current and resistance are provided
  if (hasCurrent.value && hasResistance.value && !hasVoltage.value) {
    const result = inputs.value.current * inputs.value.resistance
    return {
      label: 'Voltage (V)',
      value: isFinite(result) ? result : null,
      unit: 'V',
      formula: `${inputs.value.current} A × ${inputs.value.resistance} Ω = ${result.toFixed(4)} V`
    }
  }
  
  // Calculate current when voltage and resistance are provided
  if (hasVoltage.value && hasResistance.value && !hasCurrent.value) {
    const result = inputs.value.voltage / inputs.value.resistance
    return {
      label: 'Current (I)',
      value: isFinite(result) ? result : null,
      unit: 'A',
      formula: `${inputs.value.voltage} V ÷ ${inputs.value.resistance} Ω = ${result.toFixed(4)} A`
    }
  }
  
  // Calculate resistance when voltage and current are provided
  if (hasVoltage.value && hasCurrent.value && !hasResistance.value) {
    const result = inputs.value.voltage / inputs.value.current
    return {
      label: 'Resistance (R)',
      value: isFinite(result) ? result : null,
      unit: 'Ω',
      formula: `${inputs.value.voltage} V ÷ ${inputs.value.current} A = ${result.toFixed(4)} Ω`
    }
  }
  
  // Default case
  return {
    label: 'Enter any two values',
    value: null,
    unit: '',
    formula: ''
  }
})

// Computed: Display current (for animation)
const displayCurrent = computed(() => {
  if (hasCurrent.value) {
    return inputs.value.current
  }
  if (hasVoltage.value && hasResistance.value) {
    return inputs.value.voltage / inputs.value.resistance
  }
  return 0
})

// Computed: Calculated power
const calculatedPower = computed(() => {
  const v = hasVoltage.value ? inputs.value.voltage : (hasCurrent.value && hasResistance.value ? inputs.value.current * inputs.value.resistance : null)
  const i = hasCurrent.value ? inputs.value.current : (hasVoltage.value && hasResistance.value ? inputs.value.voltage / inputs.value.resistance : null)
  
  if (v !== null && i !== null && isFinite(v * i)) {
    return v * i
  }
  return null
})

// Computed: Calculation steps
const calculationSteps = computed(() => {
  const steps = []
  
  if (hasCurrent.value && hasResistance.value && !hasVoltage.value) {
    steps.push(`Given: Current = ${inputs.value.current} A, Resistance = ${inputs.value.resistance} Ω`)
    steps.push(`Formula: V = I × R`)
    steps.push(`Calculate: ${inputs.value.current} × ${inputs.value.resistance} = ${(inputs.value.current * inputs.value.resistance).toFixed(4)} V`)
  }
  
  if (hasVoltage.value && hasResistance.value && !hasCurrent.value) {
    steps.push(`Given: Voltage = ${inputs.value.voltage} V, Resistance = ${inputs.value.resistance} Ω`)
    steps.push(`Formula: I = V ÷ R`)
    steps.push(`Calculate: ${inputs.value.voltage} ÷ ${inputs.value.resistance} = ${(inputs.value.voltage / inputs.value.resistance).toFixed(4)} A`)
  }
  
  if (hasVoltage.value && hasCurrent.value && !hasResistance.value) {
    steps.push(`Given: Voltage = ${inputs.value.voltage} V, Current = ${inputs.value.current} A`)
    steps.push(`Formula: R = V ÷ I`)
    steps.push(`Calculate: ${inputs.value.voltage} ÷ ${inputs.value.current} = ${(inputs.value.voltage / inputs.value.current).toFixed(4)} Ω`)
  }
  
  return steps
})

// Computed: Animation speed based on current
const animationDuration = computed(() => {
  const current = displayCurrent.value
  if (current <= 0) return '0s'
  const baseDuration = 4 // seconds
  const speedFactor = Math.max(0.2, Math.min(current, 10))
  return `${baseDuration / speedFactor}s`
})

// Computed: Wire color based on current
const wireColor = computed(() => {
  const current = displayCurrent.value
  if (current <= 0) return '#94A3B8' // Gray
  if (current < 0.1) return '#22C55E' // Green - very low
  if (current < 1) return '#EAB308' // Yellow - low
  if (current < 5) return '#F97316' // Orange - medium
  return '#EF4444' // Red - high
})

// Computed: Voltage color based on value
const voltageColor = computed(() => {
  if (!hasVoltage.value) return '#3B82F6'
  const v = inputs.value.voltage
  if (v < 12) return '#22C55E' // Low voltage - green
  if (v < 120) return '#3B82F6' // Normal - blue
  return '#EF4444' // High voltage - red
})

// Computed: Resistor color based on value
const resistorColor = computed(() => {
  if (!hasResistance.value) return '#8B5CF6'
  const r = inputs.value.resistance
  if (r < 100) return '#22C55E' // Low resistance
  if (r < 1000) return '#8B5CF6' // Normal - purple
  return '#F59E0B' // High resistance
})

// Computed: Current color for arrow
const currentColor = computed(() => {
  const current = displayCurrent.value
  if (current <= 0) return '#94A3B8'
  if (current < 0.1) return '#22C55E'
  if (current < 1) return '#EAB308'
  if (current < 5) return '#F97316'
  return '#EF4444'
})
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

.text-primary-highlight {
  color: var(--tw-color-primary-dark) !important;
  text-shadow: 0 0 20px rgba(159, 168, 218, 0.8);
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

/* Slider Styles */
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
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

/* Dark mode slider */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}

/* Animation for result update */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.text-5xl {
  animation: pulse 0.3s ease-in-out;
}
</style>

<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Potentiometer Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate output voltage and power dissipation for potentiometer circuits
          </p>
          
          <!-- Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold">
              <span class="text-primary">Vout</span>
              <span class="text-gray-400"> = Vin × </span>
              <span class="text-primary">R2</span>
              <span class="text-gray-400"> / (</span>
              <span class="text-primary">R1</span>
              <span class="text-gray-400"> + </span>
              <span class="text-primary">R2</span>
              <span class="text-gray-400">)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Potentiometer Diagram -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎛️ Interactive Potentiometer
          </h3>
          
          <!-- Large SVG Potentiometer Diagram -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 700 350" class="w-full max-w-4xl h-auto">
              <!-- Background Grid -->
              <defs>
                <pattern id="potgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                </pattern>
                <linearGradient id="wiperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#22C55E;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#EAB308;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#EF4444;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="700" height="350" fill="url(#potgrid)" />
              
              <!-- Main Potentiometer Body -->
              <g transform="translate(350, 120)">
                <!-- Outer circle - potentiometer body -->
                <circle cx="0" cy="0" r="80" fill="white" stroke="#9FA8DA" stroke-width="4" />
                <circle cx="0" cy="0" r="70" fill="#f0f0f0" stroke="none" />
                
                <!-- Resistance track (270° arc from 135° to 45°) -->
                <path d="M -50 50 A 70 70 0 1 1 50 50" 
                  fill="none" stroke="url(#wiperGradient)" stroke-width="12" stroke-linecap="round"/>
                
                <!-- Terminal markers -->
                <circle cx="-50" cy="50" r="8" fill="#22C55E" stroke="white" stroke-width="2"/>
                <circle cx="0" cy="-70" r="8" fill="#EAB308" stroke="white" stroke-width="2"/>
                <circle cx="50" cy="50" r="8" fill="#EF4444" stroke="white" stroke-width="2"/>
                
                <!-- Terminal labels -->
                <text x="-70" y="75" font-size="14" font-weight="bold" fill="#22C55e">Terminal 1</text>
                <text x="-40" y="-90" font-size="14" font-weight="bold" fill="#EAB308">Wiper</text>
                <text x="30" y="75" font-size="14" font-weight="bold" fill="#EF4444">Terminal 3</text>
                
                <!-- Wiper arm (rotates based on position) -->
                <g :transform="`rotate(${wiperAngle}, 0, 0)`">
                  <line x1="0" y1="0" x2="0" y2="-55" stroke="#333" stroke-width="6" stroke-linecap="round"/>
                  <circle cx="0" cy="0" r="12" fill="#9FA8DA" stroke="#7986CB" stroke-width="3"/>
                </g>
                
                <!-- Center point -->
                <circle cx="0" cy="0" r="6" fill="#7986CB"/>
                
                <!-- Rotation indicator -->
                <text x="0" y="100" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">
                  {{ positionPercent }}%
                </text>
              </g>
              
              <!-- Circuit connections below -->
              <g transform="translate(100, 220)">
                <!-- Input voltage source -->
                <circle cx="50" cy="50" r="30" fill="white" stroke="#3B82F6" stroke-width="3"/>
                <text x="50" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">{{ inputVoltage }}V</text>
                <text x="50" y="60" text-anchor="middle" font-size="11" fill="#666">Vin</text>
                
                <!-- Wire to Terminal 1 -->
                <path d="M 80 50 L 150 50 L 200 30" stroke="#22C55E" stroke-width="3" fill="none"/>
                
                <!-- Terminal 1 connection point -->
                <circle cx="200" cy="30" r="6" fill="#22C55E"/>
                
                <!-- Terminal 3 to ground -->
                <circle cx="400" cy="30" r="6" fill="#EF4444"/>
                <path d="M 400 30 L 450 30 L 450 80" stroke="#EF4444" stroke-width="3" fill="none"/>
                <text x="450" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#666">GND</text>
                
                <!-- Wiper output -->
                <circle cx="300" cy="30" r="6" fill="#EAB308"/>
                <path d="M 300 30 L 300 80" stroke="#EAB308" stroke-width="3" fill="none"/>
                <text x="300" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#EAB308">Vout</text>
                
                <!-- Output voltage display -->
                <rect x="550" y="30" width="80" height="40" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="5"/>
                <text x="590" y="55" text-anchor="middle" font-size="16" font-weight="bold" fill="#B45309">
                  {{ outputVoltage.toFixed(2) }}V
                </text>
                
                <!-- Connecting lines -->
                <path d="M 300 80 L 590 80 L 590 70" stroke="#EAB308" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
              </g>
              
              <!-- Power dissipation display -->
              <g transform="translate(50, 280)">
                <rect x="0" y="0" width="200" height="40" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2" rx="5"/>
                <text x="100" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1E40AF">
                  Total Power: {{ totalPower.toFixed(3) }}W
                </text>
              </g>
              
              <!-- Current display -->
              <g transform="translate(450, 280)">
                <rect x="0" y="0" width="200" height="40" fill="#D1FAE5" stroke="#22C55E" stroke-width="2" rx="5"/>
                <text x="100" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#047857">
                  Current: {{ totalCurrent.toFixed(4) }}A
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Input Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Voltage (Vin)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputVoltage"
                    type="number" 
                    step="0.1"
                    placeholder="Enter input voltage"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">V</span>
                </div>
                <input 
                  v-model.number="inputVoltage"
                  type="range"
                  min="1"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1V</span>
                  <span>12V</span>
                  <span>24V</span>
                </div>
              </div>

              <!-- Total Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Resistance (Rtotal)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="totalResistance"
                    type="number" 
                    step="100"
                    placeholder="Enter total resistance"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-12">Ω</span>
                </div>
                <input 
                  v-model.number="totalResistance"
                  type="range"
                  min="100"
                  max="100000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>50kΩ</span>
                  <span>100kΩ</span>
                </div>
              </div>

              <!-- Wiper Position -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wiper Position (%)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="wiperPosition"
                    type="number" 
                    step="1"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-lg w-16">%</span>
                </div>
                <input 
                  v-model.number="wiperPosition"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <!-- Preset Buttons -->
              <div class="mb-6">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
                <div class="flex flex-wrap gap-2">
                  <button @click="applyPreset('10k')" 
                    class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    10kΩ Pot
                  </button>
                  <button @click="applyPreset('50k')" 
                    class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    50kΩ Pot
                  </button>
                  <button @click="applyPreset('100k')" 
                    class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    100kΩ Pot
                  </button>
                  <button @click="resetInputs" 
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h3>
              
              <!-- Output Voltage Display -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Output Voltage</p>
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ outputVoltage.toFixed(2) }}V
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    {{ (outputVoltage / inputVoltage * 100).toFixed(1) }}% of input
                  </p>
                </div>
              </div>

              <!-- Resistance Values -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">R1 (Bottom)</h4>
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                    {{ r1.toFixed(0) }}Ω
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {{ (wiperPosition).toFixed(0) }}% of total
                  </p>
                </div>
                <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">R2 (Top)</h4>
                  <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                    {{ r2.toFixed(0) }}Ω
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">
                    {{ (100 - wiperPosition).toFixed(0) }}% of total
                  </p>
                </div>
              </div>

              <!-- Power and Current -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Power & Current</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Total Current:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ totalCurrent.toFixed(4) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Total Power:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ totalPower.toFixed(3) }}W</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">R1 Power:</span>
                    <span class="font-bold text-green-600 dark:text-green-400">{{ r1Power.toFixed(4) }}W</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">R2 Power:</span>
                    <span class="font-bold text-red-600 dark:text-red-400">{{ r2Power.toFixed(4) }}W</span>
                  </div>
                </div>
              </div>

              <!-- Educational Content -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📘 Potentiometer Basics</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  A potentiometer is a three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider.
                </p>
                <div class="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <p class="text-xs text-gray-600 dark:text-gray-400 font-mono mb-2">
                    Vout = Vin × (R2 / (R1 + R2))
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    Where R2 is the resistance from wiper to ground, and R1 is from wiper to input.
                  </p>
                </div>
                <div class="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">Common Applications:</p>
                  <ul class="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>Volume control in audio equipment</li>
                    <li>Brightness control in displays</li>
                    <li>Sensor calibration and trimming</li>
                    <li>Position sensing and feedback</li>
                  </ul>
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
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

// SEO
useHead({
  title: "Potentiometer Calculator - Cyno Electric",
  meta: [
    { name: 'description', content: "Calculate potentiometer output voltage, current, and power dissipation. Interactive voltage divider calculator for electronic circuits." },
    { name: 'keywords', content: "potentiometer calculator, voltage divider, trimmer calculator, variable resistor, electronics" }
  ]
})

const colorMode = useColorMode()

// Input values
const inputVoltage = ref(5)
const totalResistance = ref(10000)
const wiperPosition = ref(50)

// Computed: Wiper angle for visualization (0% = -135°, 50% = 0°, 100% = 135°)
const wiperAngle = computed(() => {
  return (wiperPosition.value / 100) * 270 - 135
})

// Computed: Position percentage for display
const positionPercent = computed(() => {
  return wiperPosition.value.toFixed(0)
})

// Computed: R1 (from wiper to ground, varies with position)
const r1 = computed(() => {
  return totalResistance.value * (wiperPosition.value / 100)
})

// Computed: R2 (from input to wiper, varies with position)
const r2 = computed(() => {
  return totalResistance.value * ((100 - wiperPosition.value) / 100)
})

// Computed: Output voltage
const outputVoltage = computed(() => {
  if (totalResistance.value === 0) return 0
  return inputVoltage.value * (r1.value / totalResistance.value)
})

// Computed: Total current
const totalCurrent = computed(() => {
  if (totalResistance.value === 0) return 0
  return inputVoltage.value / totalResistance.value
})

// Computed: Total power
const totalPower = computed(() => {
  return inputVoltage.value * totalCurrent.value
})

// Computed: R1 power
const r1Power = computed(() => {
  return totalCurrent.value * totalCurrent.value * r1.value
})

// Computed: R2 power
const r2Power = computed(() => {
  return totalCurrent.value * totalCurrent.value * r2.value
})

// Preset values
function applyPreset(type) {
  switch(type) {
    case '10k':
      totalResistance.value = 10000
      break
    case '50k':
      totalResistance.value = 50000
      break
    case '100k':
      totalResistance.value = 100000
      break
  }
}

// Reset inputs
function resetInputs() {
  inputVoltage.value = 5
  totalResistance.value = 10000
  wiperPosition.value = 50
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
</style>

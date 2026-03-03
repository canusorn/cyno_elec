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
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Motor HP & Torque Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate motor horsepower, torque, RPM, efficiency, and current draw
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-center text-lg font-mono font-bold text-gray-700 dark:text-gray-300">
              <span class="text-primary">HP</span> = (Torque × RPM) ÷ 5252
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Motor Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚙️ Motor Visualization
          </h3>
          
          <!-- Motor SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 600 350" class="w-full max-w-4xl h-auto">
              <!-- Motor Body -->
              <defs>
                <linearGradient id="motorBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#4B5563;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="shaftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#9CA3AF;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#D1D5DB;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#9CA3AF;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Stator (Outer Ring) -->
              <circle cx="250" cy="175" r="120" fill="url(#motorBody)" stroke="#1F2937" stroke-width="3"/>
              
              <!-- Cooling Fins -->
              <line v-for="i in 12" :key="i"
                :x1="250 + 110 * Math.cos((i * 30 - 90) * Math.PI / 180)"
                :y1="175 + 110 * Math.sin((i * 30 - 90) * Math.PI / 180)"
                :x2="250 + 120 * Math.cos((i * 30 - 90) * Math.PI / 180)"
                :y2="175 + 120 * Math.sin((i * 30 - 90) * Math.PI / 180)"
                stroke="#6B7280" stroke-width="3"/>
              
              <!-- Rotor (Inner Circle) -->
              <circle cx="250" cy="175" r="70" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="2">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  :from="`0 250 175`"
                  :to="`360 250 175`"
                  :dur="animationDuration"
                  repeatCount="indefinite"/>
              </circle>
              
              <!-- Rotor Windings -->
              <circle cx="250" cy="175" r="55" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="8 4">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  :from="`0 250 175`"
                  :to="`360 250 175`"
                  :dur="animationDuration"
                  repeatCount="indefinite"/>
              </circle>
              
              <!-- Shaft -->
              <rect x="235" y="165" width="130" height="20" fill="url(#shaftGradient)" stroke="#6B7280" stroke-width="1"/>
              <circle cx="365" cy="175" r="12" fill="#9CA3AF" stroke="#6B7280" stroke-width="2"/>
              
              <!-- Motor Info Box -->
              <rect x="420" y="80" width="170" height="190" fill="white" stroke="#E5E7EB" stroke-width="2" rx="5"/>
              <text x="505" y="105" text-anchor="middle" font-size="16" font-weight="bold" fill="#374151">Motor Parameters</text>
              
              <!-- Display Values -->
              <text x="435" y="135" font-size="13" fill="#6B7280">Horsepower:</text>
              <text x="505" y="135" font-size="13" font-weight="bold" fill="#DC2626">{{ displayHP }}</text>
              
              <text x="435" y="160" font-size="13" fill="#6B7280">Torque:</text>
              <text x="505" y="160" font-size="13" font-weight="bold" fill="#2563EB">{{ displayTorque }}</text>
              
              <text x="435" y="185" font-size="13" fill="#6B7280">Speed:</text>
              <text x="505" y="185" font-size="13" font-weight="bold" fill="#059669">{{ displayRPM }}</text>
              
              <text x="435" y="210" font-size="13" fill="#6B7280">Efficiency:</text>
              <text x="505" y="210" font-size="13" font-weight="bold" fill="#7C3AED">{{ efficiency }}%</text>
              
              <text x="435" y="235" font-size="13" fill="#6B7280">Power Factor:</text>
              <text x="505" y="235" font-size="13" font-weight="bold" fill="#EA580C">{{ pf.toFixed(2) }}</text>
              
              <!-- Rotation Arrow -->
              <path v-if="rpm > 0"
                d="M 250 50 Q 320 50 320 120"
                fill="none"
                stroke="#10B981"
                stroke-width="3"
                stroke-dasharray="5 3"
                marker-end="url(#arrowhead)">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  :dur="animationDuration"
                  repeatCount="indefinite"/>
              </path>
              
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#10B981" />
                </marker>
              </defs>
              
              <!-- RPM Label -->
              <text x="285" y="45" font-size="14" font-weight="bold" fill="#10B981">{{ displayRPM }}</text>
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
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Motor Parameters</h3>
              
              <!-- Calculate Mode -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Calculate:
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="mode in calculateModes" 
                    :key="mode.value"
                    @click="calculateMode = mode.value"
                    :class="[
                      'px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      calculateMode === mode.value 
                        ? 'bg-primary text-white shadow-lg scale-105' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    {{ mode.label }}
                  </button>
                </div>
              </div>

              <!-- Torque Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Torque (lb-ft)
                </label>
                <input
                  v-model.number="torque"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter torque"
                  :disabled="calculateMode === 'torque'"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
                    calculateMode === 'torque'
                      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  ]"
                />
                <input
                  v-model.number="torque"
                  type="range"
                  min="0"
                  max="1000"
                  step="1"
                  :disabled="calculateMode === 'torque'"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- RPM Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Speed (RPM)
                </label>
                <input
                  v-model.number="rpm"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Enter RPM"
                  :disabled="calculateMode === 'rpm'"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
                    calculateMode === 'rpm'
                      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  ]"
                />
                <input
                  v-model.number="rpm"
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  :disabled="calculateMode === 'rpm'"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- HP Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horsepower (HP)
                </label>
                <input
                  v-model.number="hp"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Enter horsepower"
                  :disabled="calculateMode === 'hp'"
                  :class="[
                    'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
                    calculateMode === 'hp'
                      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  ]"
                />
                <input
                  v-model.number="hp"
                  type="range"
                  min="0"
                  max="500"
                  step="0.5"
                  :disabled="calculateMode === 'hp'"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- Additional Parameters -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Voltage (V)
                  </label>
                  <input
                    v-model.number="voltage"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Enter voltage"
                    class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Efficiency (%)
                  </label>
                  <input
                    v-model.number="efficiency"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="85"
                    class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <!-- Phase Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Phase Type
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="phase in phases" 
                    :key="phase.value"
                    @click="phaseType = phase.value"
                    :class="[
                      'px-4 py-3 rounded-lg font-medium transition-all duration-200',
                      phaseType === phase.value 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]"
                  >
                    {{ phase.label }}
                  </button>
                </div>
              </div>

              <!-- Power Factor -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Power Factor: {{ pf.toFixed(2) }}
                </label>
                <input
                  v-model.number="pf"
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  class="w-full accent-primary"
                />
              </div>
            </div>

            <!-- Results Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Results</h3>
              
              <!-- Calculated Value -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Calculated {{ calculateMode.charAt(0).toUpperCase() + calculateMode.slice(1) }}</p>
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ calculatedValue }}
                  </div>
                </div>
              </div>

              <!-- Current Draw -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">⚡ Current Draw:</h4>
                <div class="flex justify-between items-center text-sm mb-2">
                  <span class="text-gray-600 dark:text-gray-300">Full Load Amps:</span>
                  <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ fla }} A</span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ phaseType === 'single' ? 'Single-phase formula' : 'Three-phase formula' }}
                </div>
              </div>

              <!-- Power Values -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-gray-200 mb-3">📊 Power Values:</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600 dark:text-gray-300">Input Power:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ inputPower.toFixed(2) }} kW</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600 dark:text-gray-300">Output Power:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ outputPower.toFixed(2) }} kW</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600 dark:text-gray-300">Power Loss:</span>
                    <span class="font-bold text-red-600 dark:text-red-400">{{ powerLoss.toFixed(2) }} kW</span>
                  </div>
                </div>
              </div>

              <!-- Formulas Used -->
              <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📐 Formulas:</h4>
                <div class="space-y-2 text-xs font-mono text-gray-700 dark:text-gray-300">
                  <p>HP = (Torque × RPM) ÷ 5252</p>
                  <p>Torque = (HP × 5252) ÷ RPM</p>
                  <p>RPM = (HP × 5252) ÷ Torque</p>
                  <p class="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                    {{ phaseType === 'single' ? 'FLA (1φ) = (HP × 746) ÷ (V × η × PF)' : 'FLA (3φ) = (HP × 746) ÷ (√3 × V × η × PF)' }}
                  </p>
                </div>
              </div>

              <!-- Torque-Speed Curve -->
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📈 Torque-Speed Curve:</h4>
                <svg viewBox="0 0 300 150" class="w-full h-auto">
                  <!-- Axes -->
                  <line x1="40" y1="130" x2="290" y2="130" stroke="#374151" stroke-width="2"/>
                  <line x1="40" y1="130" x2="40" y2="10" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Axis Labels -->
                  <text x="165" y="145" text-anchor="middle" font-size="10" fill="#6B7280">Speed (RPM)</text>
                  <text x="20" y="70" text-anchor="middle" font-size="10" fill="#6B7280" transform="rotate(-90, 20, 70)">Torque</text>
                  
                  <!-- Operating Point -->
                  <circle v-if="rpm > 0 && calculatedTorque > 0"
                    :cx="40 + (rpm / maxRPM) * 250"
                    :cy="130 - (calculatedTorque / maxTorque) * 120"
                    r="6"
                    fill="#DC2626"
                    stroke="white"
                    stroke-width="2"/>
                  
                  <!-- Grid lines -->
                  <line x1="40" y1="70" x2="290" y2="70" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="3 3"/>
                  <line x1="165" y1="10" x2="165" y2="130" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="3 3"/>
                </svg>
                <div class="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Operating point: {{ displayRPM }} @ {{ displayTorque }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Motor HP & Torque
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Horsepower (HP)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Horsepower is a unit of power that measures the rate at which work is done. One horsepower equals 
              746 watts. In motors, horsepower represents the mechanical output power.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Torque</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Torque is a rotational force that causes an object to rotate. In motors, it's measured in pound-feet (lb-ft) 
              or Newton-meters (Nm). Higher torque means greater rotational force.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Relationship</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>HP = (Torque × RPM) ÷ 5252</p>
              <p class="mt-2">At 5252 RPM, torque (lb-ft) equals horsepower</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Current Calculations</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Full Load Amps (FLA) represents the current draw at rated horsepower and voltage:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Single-phase:</strong> FLA = (HP × 746) ÷ (V × η × PF)</li>
              <li><strong>Three-phase:</strong> FLA = (HP × 746) ÷ (√3 × V × η × PF)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Efficiency & Power Factor</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Efficiency (η)</strong> is the ratio of output power to input power. Typical motor efficiencies range 
              from 75% to 95%. <strong>Power Factor (PF)</strong> represents the ratio of real power to apparent power, 
              typically 0.8 to 0.95 for induction motors.
            </p>
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
  title: 'Motor HP & Torque Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate motor horsepower, torque, RPM, efficiency, and current draw. Interactive motor visualization with real-time calculations.' },
    { name: 'keywords', content: 'motor calculator, horsepower torque, RPM calculator, motor current, electric motor, FLA calculator' }
  ]
})

const $colorMode = useColorMode()

// Calculate modes
const calculateModes = [
  { label: 'Horsepower', value: 'hp' },
  { label: 'Torque', value: 'torque' },
  { label: 'RPM', value: 'rpm' }
]

const phases = [
  { label: 'Single Phase', value: 'single' },
  { label: 'Three Phase', value: 'three' }
]

// Input values
const calculateMode = ref('hp')
const torque = ref(10)
const rpm = ref(1750)
const hp = ref(3.35)
const voltage = ref(230)
const efficiency = ref(85)
const phaseType = ref('single')
const pf = ref(0.85)

// Constants
const CONSTANT = 5252

// Computed: Calculated values based on mode
const calculatedTorque = computed(() => {
  if (calculateMode.value === 'torque') return torque.value
  if (calculateMode.value === 'rpm') return torque.value
  // Calculate torque from HP and RPM
  if (rpm.value > 0) {
    return (hp.value * CONSTANT) / rpm.value
  }
  return 0
})

const calculatedRPM = computed(() => {
  if (calculateMode.value === 'rpm') return rpm.value
  if (calculateMode.value === 'torque') return rpm.value
  // Calculate RPM from HP and Torque
  if (torque.value > 0) {
    return (hp.value * CONSTANT) / torque.value
  }
  return 0
})

const calculatedHP = computed(() => {
  if (calculateMode.value === 'hp') return hp.value
  if (calculateMode.value === 'torque') return hp.value
  // Calculate HP from Torque and RPM
  return (torque.value * rpm.value) / CONSTANT
})

const calculatedValue = computed(() => {
  switch (calculateMode.value) {
    case 'hp':
      return calculatedHP.value.toFixed(2) + ' HP'
    case 'torque':
      return calculatedTorque.value.toFixed(2) + ' lb-ft'
    case 'rpm':
      return Math.round(calculatedRPM.value) + ' RPM'
    default:
      return '-'
  }
})

// Current calculations
const outputPower = computed(() => {
  return calculatedHP.value * 0.746 // HP to kW
})

const inputPower = computed(() => {
  if (efficiency.value > 0) {
    return outputPower.value / (efficiency.value / 100)
  }
  return 0
})

const powerLoss = computed(() => {
  return inputPower.value - outputPower.value
})

const fla = computed(() => {
  const outputWatts = calculatedHP.value * 746
  const eff = efficiency.value / 100
  
  if (phaseType.value === 'single') {
    // Single phase: I = P / (V * η * PF)
    if (voltage.value > 0 && eff > 0 && pf.value > 0) {
      return outputWatts / (voltage.value * eff * pf.value)
    }
  } else {
    // Three phase: I = P / (√3 * V * η * PF)
    if (voltage.value > 0 && eff > 0 && pf.value > 0) {
      return outputWatts / (Math.sqrt(3) * voltage.value * eff * pf.value)
    }
  }
  return 0
})

// Display values
const displayHP = computed(() => {
  return calculatedHP.value.toFixed(2) + ' HP'
})

const displayTorque = computed(() => {
  return calculatedTorque.value.toFixed(2) + ' lb-ft'
})

const displayRPM = computed(() => {
  return Math.round(calculatedRPM.value) + ' RPM'
})

// Animation
const animationDuration = computed(() => {
  if (rpm.value <= 0) return '0s'
  const speed = Math.max(rpm.value, 100)
  return Math.max(0.5, 60 / speed) + 's'
})

// Chart scaling
const maxRPM = ref(10000)
const maxTorque = ref(500)
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

input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

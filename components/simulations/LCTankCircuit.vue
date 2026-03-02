<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Reactive state
const inductance = ref(100e-6) // 100 μH default
const capacitance = ref(100e-9) // 100 nF default
const resistance = ref(1000) // Parallel resistance (losses)
const inputFrequency = ref(50000) // 50 kHz default
const isAnimating = ref(true)

// Animation frame for energy visualization
const animationFrame = ref(0)
const animationSpeed = ref(1)

// Calculated values
const resonantFreq = computed(() => {
  return 1 / (2 * Math.PI * Math.sqrt(inductance.value * capacitance.value))
})

const angularFreq = computed(() => {
  return 1 / Math.sqrt(inductance.value * capacitance.value)
})

const inductiveReactance = computed(() => {
  return 2 * Math.PI * inputFrequency.value * inductance.value
})

const capacitiveReactance = computed(() => {
  return 1 / (2 * Math.PI * inputFrequency.value * capacitance.value)
})

const impedance = computed(() => {
  const xl = inductiveReactance.value
  const xc = capacitiveReactance.value
  // Parallel LC impedance: Z = (jXL * (-jXC)) / (jXL - jXC) = XL * XC / (XL - XC) but simplified for magnitude
  // With parallel resistance, it's more complex
  const xlXcDiff = xl - xc
  if (Math.abs(xlXcDiff) < 1e-10) return resistance.value // At resonance
  
  const lcImpedance = (xl * xc) / Math.abs(xlXcDiff)
  // Parallel combination with R
  return (resistance.value * lcImpedance) / Math.sqrt(Math.pow(resistance.value, 2) + Math.pow(lcImpedance, 2))
})

const qFactor = computed(() => {
  return resistance.value * Math.sqrt(capacitance.value / inductance.value)
})

const bandwidth = computed(() => {
  return resonantFreq.value / qFactor.value
})

const lowerCutoff = computed(() => {
  return resonantFreq.value - (bandwidth.value / 2)
})

const upperCutoff = computed(() => {
  return resonantFreq.value + (bandwidth.value / 2)
})

// Current phase
const phaseAngle = computed(() => {
  const xl = inductiveReactance.value
  const xc = capacitiveReactance.value
  if (inputFrequency.value === resonantFreq.value) return 0
  if (inputFrequency.value > resonantFreq.value) {
    // Above resonance: inductive (current lags)
    return Math.atan((xl - xc) / resistance.value) * (180 / Math.PI)
  } else {
    // Below resonance: capacitive (current leads)
    return Math.atan((xc - xl) / resistance.value) * (180 / Math.PI)
  }
})

// Energy oscillation (for visualization)
const energyInL = ref(0)
const energyInC = ref(0)
const totalEnergy = ref(1)

// Animation loop
let animationId: number | null = null

const animate = () => {
  if (!isAnimating.value) {
    animationId = null
    return
  }
  
  animationFrame.value += 0.05 * animationSpeed.value
  
  // Calculate energy distribution based on phase
  // At resonance, energy oscillates between L and C
  const phase = animationFrame.value
  const freqRatio = inputFrequency.value / resonantFreq.value
  
  // Energy oscillation (simplified visualization)
  energyInL.value = 0.5 * (1 + Math.sin(phase * freqRatio))
  energyInC.value = 0.5 * (1 - Math.sin(phase * freqRatio))
  totalEnergy.value = energyInL.value + energyInC.value
  
  animationId = requestAnimationFrame(animate)
}

watch(isAnimating, (newVal) => {
  if (newVal && !animationId) {
    animate()
  } else if (!newVal && animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
})

// Start animation on mount
animate()

// Presets
const presets = [
  {
    name: 'AM Radio',
    inductance: 200e-6,
    capacitance: 1.27e-9,
    resistance: 50000,
    description: '1 MHz resonant frequency'
  },
  {
    name: 'FM Radio',
    inductance: 0.5e-6,
    capacitance: 5.07e-12,
    resistance: 10000,
    description: '100 MHz resonant frequency'
  },
  {
    name: 'Power Inductor',
    inductance: 1e-3,
    capacitance: 1e-6,
    resistance: 5000,
    description: '5 kHz resonant frequency'
  },
  {
    name: 'High Q Tank',
    inductance: 100e-6,
    capacitance: 100e-9,
    resistance: 100000,
    description: 'High Q for oscillators'
  }
]

const applyPreset = (preset: typeof presets[0]) => {
  inductance.value = preset.inductance
  capacitance.value = preset.capacitance
  resistance.value = preset.resistance
  inputFrequency.value = resonantFreq.value
}

// Format functions
const formatFreq = (hz: number) => {
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(2)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(2)} kHz`
  return `${hz.toFixed(2)} Hz`
}

const formatInductance = (h: number) => {
  if (h >= 1e-3) return `${(h * 1e3).toFixed(2)} mH`
  if (h >= 1e-6) return `${(h * 1e6).toFixed(2)} μH`
  return `${(h * 1e9).toFixed(2)} nH`
}

const formatCapacitance = (f: number) => {
  if (f >= 1e-6) return `${(f * 1e6).toFixed(2)} μF`
  if (f >= 1e-9) return `${(f * 1e9).toFixed(2)} nF`
  return `${(f * 1e12).toFixed(2)} pF`
}

// SVG paths for circuit diagram
const circuitPath = "M 100 80 L 100 120 M 120 80 L 120 120 M 140 80 L 140 120" // Inductor coils
const capacitorPath = "M 100 180 L 100 200 M 100 200 L 80 220 M 100 200 L 120 220 M 100 220 L 100 240" // Capacitor plates
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
      ⚡ LC Tank Circuit Simulator
    </h2>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Component Values -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Component Values
          </h3>
          
          <!-- Inductance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inductance (L): <span class="text-purple-500 font-bold">{{ formatInductance(inductance) }}</span>
            </label>
            <input type="range" v-model.number="inductance" min="1e-9" max="1e-3" step="1e-9" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 nH</span>
              <span>1 mH</span>
            </div>
          </div>

          <!-- Capacitance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capacitance (C): <span class="text-purple-500 font-bold">{{ formatCapacitance(capacitance) }}</span>
            </label>
            <input type="range" v-model.number="capacitance" min="1e-12" max="1e-3" step="1e-13" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 pF</span>
              <span>1000 μF</span>
            </div>
          </div>

          <!-- Resistance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Parallel Resistance (R): <span class="text-purple-500 font-bold">{{ resistance.toFixed(0) }} Ω</span>
            </label>
            <input type="range" v-model.number="resistance" min="100" max="100000" step="100" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>100 Ω</span>
              <span>100 kΩ</span>
            </div>
          </div>

          <!-- Input Frequency -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Frequency: <span class="text-purple-500 font-bold">{{ formatFreq(inputFrequency) }}</span>
            </label>
            <input type="range" v-model.number="inputFrequency" min="100" max="100000000" step="100" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>100 Hz</span>
              <span>100 MHz</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Presets
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="preset in presets" :key="preset.name" @click="applyPreset(preset)"
              class="px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/50 dark:hover:to-purple-800/50 transition-all duration-200 border border-purple-200 dark:border-purple-700">
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Calculations Display -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculated Values
          </h3>
          
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 space-y-3">
            <!-- Resonant Frequency -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resonant Frequency:</span>
              <span class="text-xl font-bold text-purple-600 dark:text-purple-400">{{ formatFreq(resonantFreq) }}</span>
            </div>
            
            <!-- Angular Frequency -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Angular Frequency:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ angularFreq.toFixed(0) }} rad/s</span>
            </div>
            
            <!-- Q Factor -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Quality Factor (Q):</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ qFactor.toFixed(2) }}</span>
            </div>
            
            <!-- Bandwidth -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Bandwidth (-3dB):</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ formatFreq(bandwidth) }}</span>
            </div>
            
            <!-- Lower/Upper Cutoff -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Cutoff Range:</span>
              <span class="font-mono text-sm text-purple-600 dark:text-purple-400">
                {{ formatFreq(lowerCutoff) }} - {{ formatFreq(upperCutoff) }}
              </span>
            </div>
            
            <!-- Reactance -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Inductive Reactance:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ inductiveReactance.toFixed(1) }} Ω</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Capacitive Reactance:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ capacitiveReactance.toFixed(1) }} Ω</span>
            </div>
            
            <!-- Impedance -->
            <div class="flex justify-between items-center border-b border-purple-200 dark:border-purple-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Tank Impedance:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ impedance.toFixed(1) }} Ω</span>
            </div>
            
            <!-- Phase -->
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Phase Angle:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">{{ phaseAngle.toFixed(1) }}°</span>
            </div>
          </div>
        </div>

        <!-- Animation Controls -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Animation Control
          </h3>
          <div class="flex gap-2">
            <button @click="isAnimating = !isAnimating"
              class="flex-1 px-4 py-2 font-medium rounded-lg transition-all duration-200"
              :class="isAnimating 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'">
              {{ isAnimating ? '⏸ Pause' : '▶ Play' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualizations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Tank Circuit Diagram -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Tank Circuit Diagram
        </h3>
        <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
          <svg viewBox="0 0 400 300" class="w-full h-auto">
            <!-- Circuit wires -->
            <line x1="200" y1="50" x2="200" y2="100" stroke="#8B5CF6" stroke-width="3" />
            <line x1="200" y1="200" x2="200" y2="250" stroke="#8B5CF6" stroke-width="3" />
            
            <!-- Inductor (coil) -->
            <g transform="translate(200, 150)">
              <text x="70" y="5" class="text-sm font-bold" fill="#8B5CF6">L</text>
              <path d="M 50 -50 Q 70 -40, 70 -30 Q 70 -20, 50 -10 Q 30 -20, 30 -30 Q 30 -40, 50 -50" 
                fill="none" stroke="#8B5CF6" stroke-width="3" />
              <path d="M 50 -30 Q 70 -20, 70 -10 Q 70 0, 50 10 Q 30 0, 30 -10 Q 30 -20, 50 -30" 
                fill="none" stroke="#8B5CF6" stroke-width="3" />
              <path d="M 50 -10 Q 70 0, 70 10 Q 70 20, 50 30 Q 30 20, 30 10 Q 30 0, 50 -10" 
                fill="none" stroke="#8B5CF6" stroke-width="3" />
              <path d="M 50 10 Q 70 20, 70 30 Q 70 40, 50 50 Q 30 40, 30 30 Q 30 20, 50 10" 
                fill="none" stroke="#8B5CF6" stroke-width="3" />
              <line x1="50" y1="-50" x2="50" y2="-100" stroke="#8B5CF6" stroke-width="3" />
              <line x1="50" y1="50" x2="50" y2="100" stroke="#8B5CF6" stroke-width="3" />
            </g>
            
            <!-- Capacitor (plates) -->
            <g transform="translate(200, 150)">
              <text x="-70" y="5" class="text-sm font-bold" fill="#8B5CF6">C</text>
              <line x1="-50" y1="-10" x2="-50" y2="10" stroke="#8B5CF6" stroke-width="4" />
              <line x1="-70" y1="-10" x2="-70" y2="10" stroke="#8B5CF6" stroke-width="4" />
              <line x1="-50" y1="-100" x2="-50" y2="-10" stroke="#8B5CF6" stroke-width="3" />
              <line x1="-70" y1="10" x2="-70" y2="100" stroke="#8B5CF6" stroke-width="3" />
            </g>
            
            <!-- Energy indicators (animated) -->
            <circle cx="50" cy="150" r="25" :fill="`rgba(139, 92, 246, ${energyInL})`" opacity="0.6" />
            <circle cx="-60" cy="150" r="25" :fill="`rgba(236, 72, 153, ${energyInC})`" opacity="0.6" />
            
            <!-- Energy labels -->
            <text x="50" y="200" text-anchor="middle" fill="#8B5CF6" font-size="12" font-weight="bold">
              Magnetic Field
            </text>
            <text x="50" y="215" text-anchor="middle" fill="#8B5CF6" font-size="10">
              {{ (energyInL * 100).toFixed(0) }}%
            </text>
            <text x="-60" y="200" text-anchor="middle" fill="#EC4899" font-size="12" font-weight="bold">
              Electric Field
            </text>
            <text x="-60" y="215" text-anchor="middle" fill="#EC4899" font-size="10">
              {{ (energyInC * 100).toFixed(0) }}%
            </text>
            
            <!-- Energy flow arrows (animated) -->
            <g v-if="isAnimating">
              <path d="M 75 150 Q 0 100 -85 150" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" opacity="0.7">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M -85 150 Q 0 200 75 150" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5" opacity="0.7">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
            
            <!-- Title -->
            <text x="200" y="30" text-anchor="middle" fill="#374151" font-size="14" font-weight="bold" class="dark:fill-gray-300">
              Energy Oscillation at Resonance
            </text>
          </svg>
        </div>
      </div>

      <!-- Frequency Response -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Frequency Response (Impedance)
        </h3>
        <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
          <svg viewBox="0 0 400 250" class="w-full h-auto">
            <!-- Grid -->
            <defs>
              <pattern id="grid-freq" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="1" class="dark:stroke-gray-700" />
              </pattern>
            </defs>
            <rect width="400" height="250" fill="url(#grid-freq)" />
            
            <!-- Axes -->
            <line x1="50" y1="200" x2="380" y2="200" stroke="#6B7280" stroke-width="2" />
            <line x1="50" y1="200" x2="50" y2="20" stroke="#6B7280" stroke-width="2" />
            
            <!-- Axis labels -->
            <text x="215" y="240" text-anchor="middle" fill="#6B7280" font-size="12">Frequency</text>
            <text x="15" y="110" text-anchor="middle" fill="#6B7280" font-size="12" transform="rotate(-90, 15, 110)">Impedance (Ω)</text>
            
            <!-- Calculate frequency response points -->
            <g v-for="i in 100" :key="i">
              <rect :x="50 + (i * 3.3)" :y="200 - (Math.min(180, (resistance / (1 + Math.pow(Math.log10((i/50) * (resonantFreq * 100) / resonantFreq) / Math.log10(resonantFreq / resonantFreq), 2)) * 180 / resistance)))" width="3" height="3" fill="#8B5CF6" opacity="0.6" />
            </g>
            
            <!-- Resonant frequency marker -->
            <line :x1="215" y1="200" x2="215" y2="20" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5" />
            <text x="215" y="15" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="bold">
              f₀ = {{ formatFreq(resonantFreq) }}
            </text>
            
            <!-- Current frequency marker -->
            <circle :cx="50 + Math.min(330, (inputFrequency / (resonantFreq * 2)) * 330)" cy="200" r="6" fill="#10B981" stroke="#059669" stroke-width="2" />
            <text :x="50 + Math.min(330, (inputFrequency / (resonantFreq * 2)) * 330)" y="235" text-anchor="middle" fill="#10B981" font-size="10" font-weight="bold">
              Current
            </text>
            
            <!-- -3dB markers -->
            <line :x1="215 - (bandwidth / resonantFreq) * 165" y1="200" x2="215 - (bandwidth / resonantFreq) * 165" y2="110" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
            <line :x1="215 + (bandwidth / resonantFreq) * 165" y1="200" x2="215 + (bandwidth / resonantFreq) * 165" y2="110" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
            <text x="215" y="175" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="bold">
              BW: {{ formatFreq(bandwidth) }}
            </text>
          </svg>
        </div>
      </div>
    </div>

    <!-- Waveform Visualization -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Voltage & Current Waveforms
      </h3>
      <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
        <svg viewBox="0 0 800 200" class="w-full h-auto">
          <!-- Grid -->
          <defs>
            <pattern id="grid-wave" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="1" class="dark:stroke-gray-700" />
            </pattern>
          </defs>
          <rect width="800" height="200" fill="url(#grid-wave)" />
          
          <!-- Center line -->
          <line x1="0" y1="100" x2="800" y2="100" stroke="#9CA3AF" stroke-width="1" stroke-dasharray="4,4" />
          
          <!-- Voltage waveform (blue) -->
          <path d="M 0 100 Q 100 20 200 100 Q 300 180 400 100 Q 500 20 600 100 Q 700 180 800 100" 
            fill="none" stroke="#3B82F6" stroke-width="2.5" />
          <text x="10" y="25" fill="#3B82F6" font-size="12" font-weight="bold">Voltage</text>
          
          <!-- Current waveform (green, with phase shift) -->
          <path :d="`M 0 100 Q 100 ${100 + Math.sin(phaseAngle * Math.PI / 180) * 80} 200 100 Q 300 ${100 - Math.sin(phaseAngle * Math.PI / 180) * 80} 400 100 Q 500 ${100 + Math.sin(phaseAngle * Math.PI / 180) * 80} 600 100 Q 700 ${100 - Math.sin(phaseAngle * Math.PI / 180) * 80} 800 100`" 
            fill="none" stroke="#10B981" stroke-width="2.5" opacity="0.8" />
          <text x="10" y="180" fill="#10B981" font-size="12" font-weight="bold">Current</text>
          
          <!-- Phase indicator -->
          <g transform="translate(650, 30)">
            <text x="0" y="0" fill="#6B7280" font-size="11">Phase: {{ phaseAngle.toFixed(1) }}°</text>
            <text x="0" y="15" fill="#6B7280" font-size="10" class="dark:fill-gray-400">
              {{ phaseAngle > 5 ? 'Inductive (Lags)' : phaseAngle < -5 ? 'Capacitive (Leads)' : 'Resistive (In Phase)' }}
            </text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Frequency Response Table -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Frequency Response Data
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-purple-100 dark:bg-purple-900/30">
              <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Frequency</th>
              <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Ratio (f/f₀)</th>
              <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Impedance</th>
              <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Phase</th>
              <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Response</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ratio in [0.01, 0.1, 0.5, 0.707, 1, 1.414, 2, 10, 100]" :key="ratio" 
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="px-4 py-2 font-mono text-purple-600 dark:text-purple-400">{{ formatFreq(ratio * resonantFreq) }}</td>
              <td class="px-4 py-2 font-mono">{{ ratio.toFixed(3) }}</td>
              <td class="px-4 py-2 font-mono">{{ ratio === 1 ? impedance.toFixed(1) : (resistance / (1 + Math.pow(ratio - 1/ratio, 2) * Math.pow(qFactor, 2))).toFixed(1) }} Ω</td>
              <td class="px-4 py-2 font-mono">{{ ratio === 1 ? '0°' : (Math.atan((ratio - 1/ratio) * qFactor) * 180 / Math.PI).toFixed(1) + '°' }}</td>
              <td class="px-4 py-2">
                <span v-if="ratio === 1" class="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Resonance</span>
                <span v-else-if="ratio >= 0.707 && ratio <= 1.414" class="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">-3dB Band</span>
                <span v-else-if="ratio < 1" class="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Capacitive</span>
                <span v-else class="px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Inductive</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📚 Understanding LC Tank Circuits
      </h3>
      
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">What is a Tank Circuit?</h4>
          <p class="text-sm">
            An LC tank circuit consists of an inductor (L) and capacitor (C) connected in parallel. It creates a resonant 
            system where energy oscillates back and forth between the magnetic field of the inductor and the electric field 
            of the capacitor. This oscillation occurs at the resonant frequency f₀ = 1/2π√LC.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Energy Oscillation</h4>
          <p class="text-sm">
            At resonance, energy continuously transfers between the inductor (magnetic energy, ½LI²) and capacitor 
            (electric energy, ½CV²). When current is maximum, all energy is stored in the inductor's magnetic field. 
            When voltage is maximum, all energy is stored in the capacitor's electric field. This energy exchange 
            continues with minimal loss in an ideal tank circuit.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quality Factor (Q)</h4>
          <p class="text-sm">
            The Q factor represents how "sharp" the resonance is. High Q means narrow bandwidth and more selective 
            frequency response. Q = R√(C/L) for parallel LC. Higher Q circuits have less energy loss per cycle, 
            making them ideal for oscillators and narrowband filters.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Applications</h4>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li><strong>RF Oscillators:</strong> Generate stable sinusoidal signals at specific frequencies</li>
            <li><strong>Bandpass Filters:</strong> Select narrow frequency ranges from broad spectra</li>
            <li><strong>Radio Tuning:</strong> Select specific stations in AM/FM receivers</li>
            <li><strong>Impedance Matching:</strong> Match source and load impedances at RF</li>
            <li><strong>Wireless Power Transfer:</strong> Resonant inductive coupling for efficient power transfer</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Frequency Regions</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded p-3">
              <p class="font-semibold text-blue-700 dark:text-blue-300 text-sm">f &lt;&lt; f₀ (Low)</p>
              <p class="text-xs text-blue-600 dark:text-blue-400">Capacitive dominates, high impedance</p>
            </div>
            <div class="bg-green-100 dark:bg-green-900/30 rounded p-3">
              <p class="font-semibold text-green-700 dark:text-green-300 text-sm">f ≈ f₀ (Resonance)</p>
              <p class="text-xs text-green-600 dark:text-green-400">Maximum impedance, Q factor determines bandwidth</p>
            </div>
            <div class="bg-purple-100 dark:bg-purple-900/30 rounded p-3">
              <p class="font-semibold text-purple-700 dark:text-purple-300 text-sm">f &gt;&gt; f₀ (High)</p>
              <p class="text-xs text-purple-600 dark:text-purple-400">Inductive dominates, high impedance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

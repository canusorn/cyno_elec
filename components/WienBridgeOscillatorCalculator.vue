<template>
  <div class="wien-bridge-calculator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🎵 Wien Bridge Oscillator Calculator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Calculate oscillation frequency and component values for Wien bridge oscillators
      </p>
    </div>

    <!-- Mode Selection -->
    <div class="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Calculation Mode
      </label>
      <div class="flex flex-wrap gap-4">
        <button
          @click="calculationMode = 'design'"
          :class="[
            'py-3 px-6 rounded-lg font-semibold transition-all',
            calculationMode === 'design'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          🎯 Design (Frequency → Components)
        </button>
        <button
          @click="calculationMode = 'analysis'"
          :class="[
            'py-3 px-6 rounded-lg font-semibold transition-all',
            calculationMode === 'analysis'
              ? 'bg-pink-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          📊 Analysis (Components → Frequency)
        </button>
      </div>
    </div>

    <!-- Design Mode: Frequency to Components -->
    <div v-if="calculationMode === 'design'" class="mb-8">
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- Target Frequency -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Target Frequency
          </label>
          <div class="flex items-center space-x-3">
            <input
              v-model.number="targetFrequency"
              type="number"
              step="0.1"
              class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all"
            />
            <select
              v-model="frequencyUnit"
              class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 transition-all"
            >
              <option value="hz">Hz</option>
              <option value="khz">kHz</option>
              <option value="mhz">MHz</option>
            </select>
          </div>
        </div>

        <!-- Component Preference -->
        <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Component Preference
          </label>
          <select
            v-model="componentPreference"
            class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 transition-all"
          >
            <option value="capacitor">Standard Capacitor (calculate R)</option>
            <option value="resistor">Standard Resistor (calculate C)</option>
          </select>
        </div>
      </div>

      <!-- Fixed Component Value -->
      <div v-if="componentPreference === 'capacitor'" class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Select Capacitor Value
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="cap in standardCapacitors"
            :key="cap.value"
            @click="fixedCapacitor = cap.value"
            :class="[
              'py-2 px-4 rounded-lg font-medium transition-all text-sm',
              fixedCapacitor === cap.value
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            ]"
          >
            {{ cap.label }}
          </button>
        </div>
      </div>

      <div v-if="componentPreference === 'resistor'" class="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Select Resistor Value
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="res in standardResistors"
            :key="res.value"
            @click="fixedResistor = res.value"
            :class="[
              'py-2 px-4 rounded-lg font-medium transition-all text-sm',
              fixedResistor === res.value
                ? 'bg-cyan-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            ]"
          >
            {{ res.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Analysis Mode: Components to Frequency -->
    <div v-if="calculationMode === 'analysis'" class="mb-8">
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- Resistor -->
        <div class="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Resistor (R = R₁ = R₂)
          </label>
          <div class="flex items-center space-x-3">
            <input
              v-model.number="analysisResistor"
              type="number"
              step="100"
              class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-800 transition-all"
            />
            <span class="text-gray-600 dark:text-gray-300 font-semibold">Ω</span>
          </div>
        </div>

        <!-- Capacitor -->
        <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Capacitor (C = C₁ = C₂)
          </label>
          <div class="flex items-center space-x-3">
            <input
              v-model.number="analysisCapacitor"
              type="number"
              step="1e-9"
              class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all"
            />
            <select
              v-model="analysisCapUnit"
              class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-orange-500 transition-all"
            >
              <option value="pf">pF</option>
              <option value="nf">nF</option>
              <option value="uf">μF</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        📌 Quick Presets
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="preset in presets"
          :key="preset.name"
          @click="applyPreset(preset)"
          class="py-2 px-4 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-gray-700 transition-all text-sm font-medium"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Results</h3>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Oscillation Frequency -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Oscillation Frequency</div>
          <div class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ displayFrequency }}
          </div>
        </div>

        <!-- Calculated Components -->
        <div v-if="calculationMode === 'design'" class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">{{ componentPreference === 'capacitor' ? 'Required Resistor' : 'Required Capacitor' }}</div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ componentPreference === 'capacitor' ? calculatedResistor : calculatedCapacitor }}
          </div>
        </div>

        <!-- Gain Requirement -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Required Amplifier Gain</div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ≥ 3.0
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            (for sustained oscillation)
          </div>
        </div>

        <!-- Feedback Attenuation -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Feedback Attenuation (β)</div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            1/3
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            at resonant frequency
          </div>
        </div>
      </div>

      <!-- Component Values Summary -->
      <div v-if="calculationMode === 'design'" class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Component Values:</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-gray-600 dark:text-gray-300">R₁ = R₂:</span>
            <span class="ml-2 font-bold text-gray-900 dark:text-white">{{ componentPreference === 'capacitor' ? calculatedResistor : fixedResistor + 'Ω' }}</span>
          </div>
          <div>
            <span class="text-gray-600 dark:text-gray-300">C₁ = C₂:</span>
            <span class="ml-2 font-bold text-gray-900 dark:text-white">{{ componentPreference === 'capacitor' ? fixedCapacitor + 'F' : calculatedCapacitor }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Wien Bridge Circuit</h3>
      <svg viewBox="0 0 700 350" class="w-full h-auto">
        <!-- Title -->
        <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#3B82F6">
          Wien Bridge Feedback Network
        </text>

        <!-- Op-Amp Triangle -->
        <g transform="translate(320, 140)">
          <polygon points="-60,-50 -60,50 60,0" fill="white" stroke="#3B82F6" stroke-width="2"/>
          <text x="-40" y="-20" font-size="14" font-weight="bold" fill="#3B82F6">-</text>
          <text x="-40" y="30" font-size="14" font-weight="bold" fill="#3B82F6">+</text>
          <text x="-15" y="5" font-size="12" font-weight="bold" fill="#3B82F6">A</text>
        </g>

        <!-- Series Branch (R1, C1) -->
        <line x1="100" y1="165" x2="180" y2="165" stroke="#10B981" stroke-width="3"/>
        <!-- R1 Symbol -->
        <g transform="translate(140, 165)">
          <rect x="-15" y="-8" width="30" height="16" fill="white" stroke="#10B981" stroke-width="2"/>
          <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">R₁</text>
        </g>
        <line x1="180" y1="165" x2="220" y2="165" stroke="#10B981" stroke-width="3"/>

        <!-- C1 Symbol -->
        <g transform="translate(240, 165)">
          <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#10B981" stroke-width="2"/>
          <line x1="10" y1="-15" x2="10" y2="15" stroke="#10B981" stroke-width="2"/>
          <text x="0" y="30" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">C₁</text>
        </g>

        <!-- Connection to Op-Amp -->
        <line x1="260" y1="165" x2="320" y2="165" stroke="#10B981" stroke-width="3"/>

        <!-- Parallel Branch (R2, C2) -->
        <line x1="380" y1="115" x2="380" y2="80" stroke="#F59E0B" stroke-width="3"/>
        <line x1="380" y1="80" x2="420" y2="80" stroke="#F59E0B" stroke-width="3"/>

        <!-- R2 Symbol (horizontal) -->
        <g transform="translate(450, 80)">
          <rect x="-15" y="-8" width="30" height="16" fill="white" stroke="#F59E0B" stroke-width="2"/>
          <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="bold" fill="#F59E0B">R₂</text>
        </g>
        <line x1="480" y1="80" x2="550" y2="80" stroke="#F59E0B" stroke-width="3"/>
        <line x1="550" y1="80" x2="550" y2="165" stroke="#F59E0B" stroke-width="3"/>

        <!-- C2 Symbol (vertical) -->
        <g transform="translate(550, 130)">
          <line x1="-15" y1="-8" x2="-15" y2="8" stroke="#F59E0B" stroke-width="2"/>
          <line x1="15" y1="-8" x2="15" y2="8" stroke="#F59E0B" stroke-width="2"/>
          <text x="25" y="5" font-size="11" font-weight="bold" fill="#F59E0B">C₂</text>
        </g>

        <!-- Output -->
        <line x1="380" y1="165" x2="550" y2="165" stroke="#8B5CF6" stroke-width="3"/>
        <circle cx="570" cy="165" r="6" fill="#8B5CF6"/>
        <text x="570" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">Vout</text>

        <!-- Input -->
        <circle cx="80" cy="165" r="6" fill="#10B981"/>
        <text x="80" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">Vin</text>

        <!-- Ground -->
        <line x1="550" y1="165" x2="550" y2="200" stroke="#6B7280" stroke-width="2"/>
        <line x1="535" y1="200" x2="565" y2="200" stroke="#6B7280" stroke-width="2"/>
        <line x1="540" y1="205" x2="560" y2="205" stroke="#6B7280" stroke-width="2"/>
        <line x1="545" y1="210" x2="555" y2="210" stroke="#6B7280" stroke-width="2"/>

        <!-- Frequency Display -->
        <g transform="translate(350, 280)">
          <rect x="-120" y="-30" width="240" height="60" fill="white" stroke="#3B82F6" stroke-width="2" rx="8"/>
          <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">
            f = 1 / (2π × R × C)
          </text>
          <text x="0" y="18" text-anchor="middle" font-size="13" font-weight="bold" fill="#10B981">
            {{ displayFrequency }}
          </text>
        </g>

        <!-- Legend -->
        <g transform="translate(50, 280)">
          <rect x="0" y="0" width="15" height="15" fill="#10B981"/>
          <text x="20" y="12" font-size="11" fill="#374151">Series Branch</text>
        </g>
        <g transform="translate(150, 280)">
          <rect x="0" y="0" width="15" height="15" fill="#F59E0B"/>
          <text x="20" y="12" font-size="11" fill="#374151">Parallel Branch</text>
        </g>
      </svg>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 How Wien Bridge Oscillators Work</h3>

      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Oscillation Condition</h4>
          <p class="text-sm mb-2">
            For sustained oscillation, the loop gain must equal exactly 1 (Barkhausen criterion):
          </p>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
            A × β = 1
          </div>
          <p class="text-sm mt-2">
            Where A is amplifier gain and β is feedback attenuation. At resonant frequency, β = 1/3, so we need A = 3.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Frequency Formula</h4>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 font-mono text-sm">
            f₀ = 1 / (2π × R × C)
          </div>
          <p class="text-sm mt-2">
            When R₁ = R₂ = R and C₁ = C₂ = C, the circuit oscillates at frequency f₀.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Practical Considerations</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li><strong>Gain Control:</strong> Use a non-linear element (lamp, thermistor, or JFET) to stabilize gain at exactly 3</li>
            <li><strong>Component Tolerance:</strong> Use 1% tolerance or better components for accurate frequency</li>
            <li><strong>Amplifier:</strong> Use an op-amp with sufficient bandwidth (at least 10× f₀)</li>
            <li><strong>Distortion:</strong> Higher gain reduces distortion but may cause clipping</li>
            <li><strong>Frequency Range:</strong> Practical from 1 Hz to 1 MHz</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Common Applications</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li>Audio signal generators (20 Hz - 20 kHz)</li>
            <li>Function generators</li>
            <li>Test tone generation</li>
            <li>Musical instrument tuners (440 Hz reference)</li>
            <li>Lab oscillators</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Design Tips</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li>Choose capacitor values first (they have fewer standard values)</li>
            <li>For audio frequencies, use C = 10nF to 100nF</li>
            <li>For RF frequencies, use C = 10pF to 100pF</li>
            <li>Calculate resistor from desired frequency: R = 1 / (2π × f × C)</li>
            <li>Use a potentiometer in series with R for fine frequency adjustment</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// State
const calculationMode = ref<'design' | 'analysis'>('design')
const targetFrequency = ref(1000)
const frequencyUnit = ref<'hz' | 'khz' | 'mhz'>('hz')
const componentPreference = ref<'capacitor' | 'resistor'>('capacitor')
const fixedCapacitor = ref(10e-9) // 10nF default
const fixedResistor = ref(10000) // 10kΩ default
const analysisResistor = ref(10000)
const analysisCapacitor = ref(10)
const analysisCapUnit = ref<'pf' | 'nf' | 'uf'>('nf')

// Standard component values
const standardCapacitors = [
  { value: 10e-12, label: '10 pF' },
  { value: 100e-12, label: '100 pF' },
  { value: 1e-9, label: '1 nF' },
  { value: 10e-9, label: '10 nF' },
  { value: 100e-9, label: '100 nF' },
  { value: 1e-6, label: '1 μF' },
  { value: 10e-6, label: '10 μF' },
]

const standardResistors = [
  { value: 1000, label: '1 kΩ' },
  { value: 10000, label: '10 kΩ' },
  { value: 47000, label: '47 kΩ' },
  { value: 100000, label: '100 kΩ' },
  { value: 220000, label: '220 kΩ' },
  { value: 470000, label: '470 kΩ' },
  { value: 1000000, label: '1 MΩ' },
]

const presets = [
  {
    name: 'Low (60 Hz)',
    mode: 'design' as const,
    frequency: 60,
    unit: 'hz' as const,
    capacitor: 100e-9,
    preference: 'capacitor' as const
  },
  {
    name: 'Audio (1 kHz)',
    mode: 'design' as const,
    frequency: 1000,
    unit: 'hz' as const,
    capacitor: 10e-9,
    preference: 'capacitor' as const
  },
  {
    name: 'Music A (440 Hz)',
    mode: 'design' as const,
    frequency: 440,
    unit: 'hz' as const,
    capacitor: 10e-9,
    preference: 'capacitor' as const
  },
  {
    name: 'RF (100 kHz)',
    mode: 'design' as const,
    frequency: 100,
    unit: 'khz' as const,
    capacitor: 1e-9,
    preference: 'capacitor' as const
  },
]

// Computed properties
const frequencyInHz = computed(() => {
  const f = targetFrequency.value
  switch (frequencyUnit.value) {
    case 'khz': return f * 1000
    case 'mhz': return f * 1000000
    default: return f
  }
})

const displayFrequency = computed(() => {
  const freq = calculatedFrequency.value
  if (freq >= 1000000) {
    return (freq / 1000000).toFixed(2) + ' MHz'
  } else if (freq >= 1000) {
    return (freq / 1000).toFixed(2) + ' kHz'
  } else {
    return freq.toFixed(2) + ' Hz'
  }
})

const calculatedFrequency = computed(() => {
  if (calculationMode.value === 'design') {
    const R = componentPreference.value === 'capacitor' ? 
      (1 / (2 * Math.PI * frequencyInHz.value * fixedCapacitor.value)) :
      fixedResistor.value
    const C = componentPreference.value === 'capacitor' ? 
      fixedCapacitor.value :
      (1 / (2 * Math.PI * frequencyInHz.value * fixedResistor.value))
    return 1 / (2 * Math.PI * R * C)
  } else {
    // Analysis mode
    const R = analysisResistor.value
    let C = analysisCapacitor.value
    switch (analysisCapUnit.value) {
      case 'pf': C *= 1e-12; break
      case 'nf': C *= 1e-9; break
      case 'uf': C *= 1e-6; break
    }
    return 1 / (2 * Math.PI * R * C)
  }
})

const calculatedResistor = computed(() => {
  if (calculationMode.value !== 'design' || componentPreference.value !== 'capacitor') return ''
  const R = 1 / (2 * Math.PI * frequencyInHz.value * fixedCapacitor.value)
  if (R >= 1000000) return (R / 1000000).toFixed(1) + ' MΩ'
  if (R >= 1000) return (R / 1000).toFixed(1) + ' kΩ'
  return R.toFixed(0) + ' Ω'
})

const calculatedCapacitor = computed(() => {
  if (calculationMode.value !== 'design' || componentPreference.value !== 'resistor') return ''
  const C = 1 / (2 * Math.PI * frequencyInHz.value * fixedResistor.value)
  if (C >= 1e-6) return (C / 1e-6).toFixed(1) + ' μF'
  if (C >= 1e-9) return (C / 1e-9).toFixed(1) + ' nF'
  return (C / 1e-12).toFixed(0) + ' pF'
})

// Methods
const applyPreset = (preset: typeof presets[0]) => {
  calculationMode.value = preset.mode
  targetFrequency.value = preset.frequency
  frequencyUnit.value = preset.unit
  if (preset.preference === 'capacitor') {
    componentPreference.value = 'capacitor'
    fixedCapacitor.value = preset.capacitor
  }
}
</script>

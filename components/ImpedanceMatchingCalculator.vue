<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🎯 Impedance Matching Designer
    </h3>

    <!-- Network Type Selection -->
    <div class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Network Type
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button v-for="type in networkTypes" :key="type.id"
          @click="networkType = type.id"
          :class="[
            'px-4 py-3 rounded-lg font-medium transition-all',
            networkType === type.id
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]">
          <div class="text-2xl mb-1">{{ type.icon }}</div>
          <div class="text-sm">{{ type.name }}</div>
        </button>
      </div>
    </div>

    <!-- Input Parameters -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Source Impedance -->
      <div class="space-y-4">
        <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">S</span>
          Source Impedance
        </h4>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Resistance (R<sub>s</sub>): {{ sourceR }} Ω
          </label>
          <input type="range" v-model.number="sourceR" min="1" max="1000" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1Ω</span>
            <span>{{ sourceR }}Ω</span>
            <span>1000Ω</span>
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Reactance (X<sub>s</sub>): {{ sourceX }} Ω
          </label>
          <input type="range" v-model.number="sourceX" min="-500" max="500" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>-500Ω</span>
            <span>{{ sourceX > 0 ? '+' : '' }}{{ sourceX }}Ω</span>
            <span>+500Ω</span>
          </div>
        </div>

        <!-- Source Presets -->
        <div class="flex flex-wrap gap-2">
          <button @click="setSourcePreset(50)" class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
            50Ω RF
          </button>
          <button @click="setSourcePreset(75)" class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
            75Ω Video
          </button>
          <button @click="setSourcePreset(600)" class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
            600Ω Audio
          </button>
        </div>
      </div>

      <!-- Load Impedance -->
      <div class="space-y-4">
        <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="w-8 h-8 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">L</span>
          Load Impedance
        </h4>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Resistance (R<sub>L</sub>): {{ loadR }} Ω
          </label>
          <input type="range" v-model.number="loadR" min="1" max="1000" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1Ω</span>
            <span>{{ loadR }}Ω</span>
            <span>1000Ω</span>
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">
            Reactance (X<sub>L</sub>): {{ loadX }} Ω
          </label>
          <input type="range" v-model.number="loadX" min="-500" max="500" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>-500Ω</span>
            <span>{{ loadX > 0 ? '+' : '' }}{{ loadX }}Ω</span>
            <span>+500Ω</span>
          </div>
        </div>

        <!-- Load Presets -->
        <div class="flex flex-wrap gap-2">
          <button @click="setLoadPreset(50)" class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800">
            50Ω RF
          </button>
          <button @click="setLoadPreset(4)" class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800">
            4Ω Speaker
          </button>
          <button @click="setLoadPreset(8)" class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:green-800">
            8Ω Speaker
          </button>
        </div>
      </div>
    </div>

    <!-- Frequency (for calculating component values) -->
    <div class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Operating Frequency: {{ frequency }} MHz
      </label>
      <input type="range" v-model.number="frequency" min="0.1" max="1000" step="0.1"
        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
      <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>0.1 MHz</span>
        <span>{{ frequency }} MHz</span>
        <span>1000 MHz</span>
      </div>
    </div>

    <!-- Results Display -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
      <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Matching Results</h4>

      <!-- Mismatch Analysis (before matching) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Reflection Coeff (|Γ|)</div>
          <div :class="['text-xl font-bold', reflectionColor]">{{ reflectionCoeff.toFixed(3) }}</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">VSWR</div>
          <div :class="['text-xl font-bold', vswrColor]">{{ vswr.toFixed(2) }}</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Return Loss</div>
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ returnLoss.toFixed(1) }} dB</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3 text-center">
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Mismatch Loss</div>
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ mismatchLoss.toFixed(2) }} dB</div>
        </div>
      </div>

      <!-- Matching Network Components -->
      <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
        <h5 class="font-medium text-gray-900 dark:text-white mb-3">{{ networkName }} Components</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(comp, index) in matchingComponents" :key="index"
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="w-10 h-10 flex items-center justify-center rounded-full"
              :class="comp.type === 'inductor' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' : 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400'">
              {{ comp.type === 'inductor' ? 'L' : 'C' }}
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ comp.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ comp.description }}</div>
            </div>
            <div class="text-right">
              <div class="text-lg font-bold text-gray-900 dark:text-white">{{ comp.value }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ comp.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Visualization -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Circuit Diagram</h4>
      <svg viewBox="0 0 800 300" class="w-full h-auto">
        <!-- Background -->
        <rect width="800" height="300" fill="transparent"/>

        <!-- Circuit based on network type -->
        <g v-if="networkType === 'lnetwork'">
          <!-- L-Network Diagram -->
          <line x1="100" y1="150" x2="250" y2="150" stroke="#3B82F6" stroke-width="4"/>
          <line x1="350" y1="150" x2="400" y2="150" stroke="#3B82F6" stroke-width="4"/>
          <line x1="450" y1="150" x2="500" y2="150" stroke="#3B82F6" stroke-width="4"/>
          <line x1="550" y1="150" x2="700" y2="150" stroke="#3B82F6" stroke-width="4"/>

          <!-- Source -->
          <circle cx="100" cy="150" r="40" fill="white" stroke="#3B82F6" stroke-width="3"/>
          <text x="100" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">{{ sourceR }}Ω</text>
          <text x="100" y="160" text-anchor="middle" font-size="10" fill="#666">Source</text>

          <!-- Series Component -->
          <rect x="250" y="130" width="100" height="40" fill="white" :stroke="matchingComponents[0]?.type === 'inductor' ? '#8B5CF6' : '#EC4899'" stroke-width="3" rx="5"/>
          <text x="300" y="145" text-anchor="middle" font-size="12" font-weight="bold" :fill="matchingComponents[0]?.type === 'inductor' ? '#8B5CF6' : '#EC4899'">
            {{ matchingComponents[0]?.type === 'inductor' ? 'L₁' : 'C₁' }}
          </text>
          <text x="300" y="160" text-anchor="middle" font-size="10" fill="#666">{{ matchingComponents[0]?.value }} {{ matchingComponents[0]?.unit }}</text>

          <!-- Shunt Component -->
          <line x1="425" y1="150" x2="425" y2="80" stroke="#3B82F6" stroke-width="3"/>
          <line x1="400" y1="80" x2="450" y2="80" stroke="#3B82F6" stroke-width="3"/>
          <rect x="400" y="60" width="50" height="40" fill="white" :stroke="matchingComponents[1]?.type === 'inductor' ? '#8B5CF6' : '#EC4899'" stroke-width="3" rx="5"/>
          <text x="425" y="85" text-anchor="middle" font-size="12" font-weight="bold" :fill="matchingComponents[1]?.type === 'inductor' ? '#8B5CF6' : '#EC4899'">
            {{ matchingComponents[1]?.type === 'inductor' ? 'L₂' : 'C₂' }}
          </text>
          <line x1="425" y1="60" x2="425" y2="40" stroke="#3B82F6" stroke-width="3"/>
          <line x1="425" y1="40" x2="575" y2="40" stroke="#3B82F6" stroke-width="3"/>
          <line x1="575" y1="40" x2="575" y2="150" stroke="#3B82F6" stroke-width="3"/>
          <text x="475" y="55" text-anchor="middle" font-size="10" fill="#666">{{ matchingComponents[1]?.value }} {{ matchingComponents[1]?.unit }}</text>

          <!-- Load -->
          <circle cx="700" cy="150" r="40" fill="white" stroke="#10B981" stroke-width="3"/>
          <text x="700" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">{{ loadR }}Ω</text>
          <text x="700" y="160" text-anchor="middle" font-size="10" fill="#666">Load</text>
        </g>

        <g v-else-if="networkType === 'transformer'">
          <!-- Transformer Matching -->
          <line x1="100" y1="150" x2="200" y2="150" stroke="#3B82F6" stroke-width="4"/>
          <line x1="600" y1="150" x2="700" y2="150" stroke="#3B82F6" stroke-width="4"/>

          <!-- Source -->
          <circle cx="100" cy="150" r="40" fill="white" stroke="#3B82F6" stroke-width="3"/>
          <text x="100" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">{{ sourceR }}Ω</text>
          <text x="100" y="160" text-anchor="middle" font-size="10" fill="#666">Source</text>

          <!-- Transformer -->
          <g transform="translate(300, 80)">
            <!-- Primary winding -->
            <path d="M 0 50 Q 20 30, 40 50 Q 60 30, 80 50 Q 100 30, 120 50" fill="none" stroke="#3B82F6" stroke-width="3"/>
            <path d="M 0 60 Q 20 40, 40 60 Q 60 40, 80 60 Q 100 40, 120 60" fill="none" stroke="#3B82F6" stroke-width="3"/>
            <path d="M 0 70 Q 20 50, 40 70 Q 60 50, 80 70 Q 100 50, 120 70" fill="none" stroke="#3B82F6" stroke-width="3"/>

            <!-- Secondary winding -->
            <path d="M 160 50 Q 180 30, 200 50 Q 220 30, 240 50 Q 260 30, 280 50" fill="none" stroke="#10B981" stroke-width="3"/>
            <path d="M 160 60 Q 180 40, 200 60 Q 220 40, 240 60 Q 260 40, 280 60" fill="none" stroke="#10B981" stroke-width="3"/>
            <path d="M 160 70 Q 180 50, 200 70 Q 220 50, 240 70 Q 260 50, 280 70" fill="none" stroke="#10B981" stroke-width="3"/>

            <!-- Core -->
            <line x1="130" y1="45" x2="130" y2="75" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="150" y1="45" x2="150" y2="75" stroke="#9CA3AF" stroke-width="2"/>
          </g>

          <!-- Turns ratio -->
          <text x="400" y="200" text-anchor="middle" font-size="14" font-weight="bold" fill="#8B5CF6">
            N<sub>p</sub>:N<sub>s</sub> = {{ turnsRatio }}:1
          </text>

          <!-- Load -->
          <circle cx="700" cy="150" r="40" fill="white" stroke="#10B981" stroke-width="3"/>
          <text x="700" y="145" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">{{ loadR }}Ω</text>
          <text x="700" y="160" text-anchor="middle" font-size="10" fill="#666">Load</text>
        </g>

        <g v-else>
          <!-- Placeholder for other network types -->
          <text x="400" y="150" text-anchor="middle" font-size="16" fill="#9CA3AF">
            {{ networkName }} diagram
          </text>
        </g>

        <!-- Power flow arrow -->
        <g transform="translate(350, 250)">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#F59E0B" stroke-width="3" marker-end="url(#arrowhead)"/>
          <text x="50" y="-10" text-anchor="middle" font-size="12" font-weight="bold" fill="#F59E0B">Power Transfer</text>
        </g>

        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#F59E0B"/>
          </marker>
        </defs>
      </svg>
    </div>

    <!-- Power Transfer Efficiency -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 text-center">
        <div class="text-sm text-green-700 dark:text-green-300 mb-1">Power Transfer</div>
        <div class="text-3xl font-bold text-green-900 dark:text-green-100">{{ powerTransfer }}%</div>
      </div>
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 text-center">
        <div class="text-sm text-blue-700 dark:text-blue-300 mb-1">Bandwidth (Q)</div>
        <div class="text-3xl font-bold text-blue-900 dark:text-blue-100">{{ QFactor.toFixed(1) }}</div>
      </div>
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 text-center">
        <div class="text-sm text-purple-700 dark:text-purple-300 mb-1">Match Status</div>
        <div class="text-lg font-bold text-purple-900 dark:text-purple-100">{{ matchStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Network type
const networkType = ref('lnetwork')
const networkTypes = [
  { id: 'lnetwork', name: 'L-Network', icon: '📐' },
  { id: 'pinetwork', name: 'Pi-Network', icon: '🥧' },
  { id: 'tnetwork', name: 'T-Network', icon: '🔧' },
  { id: 'transformer', name: 'Transformer', icon: '🔌' }
]

// Input impedances
const sourceR = ref(50)
const sourceX = ref(0)
const loadR = ref(75)
const loadX = ref(0)
const frequency = ref(100) // MHz

// Helper functions
const setSourcePreset = (r: number) => {
  sourceR.value = r
  sourceX.value = 0
}

const setLoadPreset = (r: number) => {
  loadR.value = r
  loadX.value = 0
}

// Calculate reflection coefficient and related parameters
const reflectionCoeff = computed(() => {
  // Gamma = (Zl - Zs) / (Zl + Zs)
  const Zs_real = sourceR.value
  const Zs_imag = sourceX.value
  const Zl_real = loadR.value
  const Zl_imag = loadX.value

  const numerator_real = Zl_real - Zs_real
  const numerator_imag = Zl_imag - Zs_imag
  const denominator_real = Zl_real + Zs_real
  const denominator_imag = Zl_imag + Zs_imag

  const magnitude = Math.sqrt(
    (numerator_real * numerator_real + numerator_imag * numerator_imag) /
    (denominator_real * denominator_real + denominator_imag * denominator_imag)
  )

  return magnitude
})

const vswr = computed(() => {
  const gamma = reflectionCoeff.value
  if (gamma >= 1) return Infinity
  return (1 + gamma) / (1 - gamma)
})

const returnLoss = computed(() => {
  return -20 * Math.log10(reflectionCoeff.value + 1e-10)
})

const mismatchLoss = computed(() => {
  const gamma = reflectionCoeff.value
  return -10 * Math.log10(1 - gamma * gamma)
})

const powerTransfer = computed(() => {
  return (1 - reflectionCoeff.value ** 2) * 100
})

// Network name
const networkName = computed(() => {
  const names = {
    lnetwork: 'L-Network',
    pinetwork: 'Pi-Network',
    tnetwork: 'T-Network',
    transformer: 'Transformer'
  }
  return names[networkType.value] || 'Unknown'
})

// Calculate matching components
const matchingComponents = computed(() => {
  const components = []
  const freq = frequency.value * 1e6 // Convert to Hz
  const omega = 2 * Math.PI * freq

  if (networkType.value === 'lnetwork') {
    // L-Network calculation
    // For simplicity, assuming purely resistive loads
    const Rs = sourceR.value
    const Rl = loadR.value
    const Q = Math.sqrt(Math.max(0, (Rl / Rs) - 1))

    if (Rl > Rs) {
      // Step-up configuration
      const X_series = Q * Rs
      const X_shunt = Rl / Q

      components.push({
        type: 'inductor',
        name: 'Series L',
        description: 'Series inductance',
        value: (X_series / omega * 1e9).toFixed(2),
        unit: 'nH'
      })

      components.push({
        type: 'capacitor',
        name: 'Shunt C',
        description: 'Shunt capacitance',
        value: (1 / (X_shunt * omega) * 1e12).toFixed(2),
        unit: 'pF'
      })
    } else {
      // Step-down configuration
      const Q = Math.sqrt(Math.max(0, (Rs / Rl) - 1))
      const X_series = Q * Rl
      const X_shunt = Rs / Q

      components.push({
        type: 'capacitor',
        name: 'Series C',
        description: 'Series capacitance',
        value: (1 / (X_series * omega) * 1e12).toFixed(2),
        unit: 'pF'
      })

      components.push({
        type: 'inductor',
        name: 'Shunt L',
        description: 'Shunt inductance',
        value: (X_shunt / omega * 1e9).toFixed(2),
        unit: 'nH'
      })
    }
  } else if (networkType.value === 'transformer') {
    // Transformer matching
    // Zp/Zs = (Np/Ns)^2
    const ratio = Math.sqrt(loadR.value / sourceR.value)

    components.push({
      type: 'transformer',
      name: 'Transformer',
      description: 'Impedance matching',
      value: ratio.toFixed(2),
      unit: 'turns ratio'
    })
  } else {
    // Placeholder for Pi and T networks
    components.push({
      type: 'capacitor',
      name: 'C1',
      description: 'Input capacitor',
      value: '---',
      unit: 'pF'
    })
    components.push({
      type: 'inductor',
      name: 'L',
      description: 'Series inductor',
      value: '---',
      unit: 'nH'
    })
  }

  return components
})

// Transformer turns ratio
const turnsRatio = computed(() => {
  return Math.sqrt(loadR.value / sourceR.value).toFixed(2)
})

// Q factor (approximate for L-network)
const QFactor = computed(() => {
  if (networkType.value === 'transformer') {
    return 1 // Transformers have wide bandwidth
  }
  const ratio = Math.max(loadR.value / sourceR.value, sourceR.value / loadR.value)
  return Math.sqrt(Math.max(0, ratio - 1))
})

// Match status
const matchStatus = computed(() => {
  const vswr_val = vswr.value
  if (vswr_val <= 1.1) return 'Excellent'
  if (vswr_val <= 1.5) return 'Good'
  if (vswr_val <= 2) return 'Fair'
  if (vswr_val <= 3) return 'Poor'
  return 'Mismatched'
})

// Color coding
const reflectionColor = computed(() => {
  const gamma = reflectionCoeff.value
  if (gamma < 0.1) return 'text-green-600 dark:text-green-400'
  if (gamma < 0.2) return 'text-yellow-600 dark:text-yellow-400'
  if (gamma < 0.33) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
})

const vswrColor = computed(() => {
  const vswr_val = vswr.value
  if (vswr_val <= 1.5) return 'text-green-600 dark:text-green-400'
  if (vswr_val <= 2) return 'text-yellow-600 dark:text-yellow-400'
  if (vswr_val <= 3) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
})
</script>

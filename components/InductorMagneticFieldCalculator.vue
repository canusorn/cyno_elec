<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🧲 Inductor Magnetic Field Calculator
    </h3>

    <!-- Core Type Selection -->
    <div class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Core Type
      </label>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="coreType = 'air'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            coreType === 'air'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Air Core
          <span class="block text-xs opacity-75 mt-1">μr = 1</span>
        </button>
        <button
          @click="coreType = 'ferrite'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            coreType === 'ferrite'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Ferrite Core
          <span class="block text-xs opacity-75 mt-1">μr = {{ relativePermeability }}</span>
        </button>
      </div>
    </div>

    <!-- Input Section -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Number of Turns -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Number of Turns (N)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="numTurns"
            type="number"
            min="1"
            max="10000"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <span class="text-gray-600 dark:text-gray-300 font-semibold">turns</span>
        </div>
        <SliderInput
          v-model="numTurns"
          :min="1"
          :max="1000"
          :step="1"
          unit=""
          :show-value="false"
        />
      </div>

      <!-- Current -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Current (I)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="current"
            type="number"
            step="0.1"
            min="0"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <select
            v-model="currentUnit"
            class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          >
            <option value="A">A</option>
            <option value="mA">mA</option>
          </select>
        </div>
        <SliderInput
          v-model="current"
          :min="0"
          :max="10"
          :step="0.1"
          unit=""
          :show-value="false"
        />
      </div>

      <!-- Length -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Solenoid Length (L)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="length"
            type="number"
            step="0.1"
            min="0.1"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <select
            v-model="lengthUnit"
            class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          >
            <option value="m">m</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
          </select>
        </div>
        <SliderInput
          v-model="length"
          :min="0.1"
          :max="100"
          :step="0.1"
          unit=""
          :show-value="false"
        />
      </div>

      <!-- Diameter -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Solenoid Diameter (D)
        </label>
        <div class="flex items-center gap-4 mb-3">
          <input
            v-model.number="diameter"
            type="number"
            step="0.1"
            min="0.1"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          />
          <select
            v-model="diameterUnit"
            class="px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
          >
            <option value="m">m</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
          </select>
        </div>
        <SliderInput
          v-model="diameter"
          :min="0.1"
          :max="100"
          :step="0.1"
          unit=""
          :show-value="false"
        />
      </div>
    </div>

    <!-- Ferrite Core: Relative Permeability -->
    <div v-if="coreType === 'ferrite'" class="mb-8">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Relative Permeability (μr)
      </label>
      <div class="flex items-center gap-4 mb-3">
        <input
          v-model.number="relativePermeability"
          type="number"
          min="1"
          max="10000"
          step="10"
          class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none"
        />
        <span class="text-gray-600 dark:text-gray-300 font-semibold">μr</span>
      </div>
      <SliderInput
        v-model="relativePermeability"
        :min="1"
        :max="5000"
        :step="10"
        unit="μr"
        :show-value="true"
      />
      <div class="mt-4 grid grid-cols-2 gap-2">
        <button
          @click="relativePermeability = 100"
          class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          Iron Powder (100)
        </button>
        <button
          @click="relativePermeability = 1000"
          class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          Ferrite (1000)
        </button>
        <button
          @click="relativePermeability = 2000"
          class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          High-μ Ferrite (2000)
        </button>
        <button
          @click="relativePermeability = 5000"
          class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
        >
          Nanocrystalline (5000)
        </button>
      </div>
    </div>

    <!-- Results Display -->
    <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Results</h4>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Magnetic Field at Center -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Magnetic Field (B) - Center</div>
          <div class="text-3xl font-bold text-primary-highlight mb-2">
            {{ formattedMagneticField }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            B = μ₀μr × N × I / L
          </div>
        </div>

        <!-- Ampere-Turns -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Ampere-Turns (NI)</div>
          <div class="text-3xl font-bold text-blue-500 mb-2">
            {{ formattedAmpereTurns }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            NI = {{ numTurns }} × {{ formattedCurrent }}
          </div>
        </div>

        <!-- Turn Density -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Turn Density (n)</div>
          <div class="text-3xl font-bold text-green-500 mb-2">
            {{ formattedTurnDensity }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
            n = N / L = {{ numTurns }} / {{ formattedLength }}
          </div>
        </div>

        <!-- Magnetic Field Formula -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Simplified Formula</div>
          <div class="text-lg font-bold text-purple-500 mb-2 font-mono">
            B = {{ effectivePermeability.toFixed(2) }} × n × I
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            Effective μ₀μr (T⋅m/A)
          </div>
        </div>
      </div>
    </div>

    <!-- Solenoid Visualization -->
    <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🌀 Solenoid Visualization</h4>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 overflow-x-auto">
        <svg viewBox="0 0 800 400" class="w-full h-auto" style="min-width: 600px;">
          <!-- Background -->
          <defs>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#4B5563;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <!-- Core (if ferrite) -->
          <rect v-if="coreType === 'ferrite'" x="200" y="120" width="400" height="160" fill="url(#coreGradient)" rx="5" />
          
          <!-- Solenoid coil (simplified as series of ellipses) -->
          <g v-for="i in 20" :key="i">
            <ellipse
              :cx="210 + i * 19"
              cy="100"
              :rx="12"
              :ry="30"
              fill="none"
              stroke="#F59E0B"
              stroke-width="3"
            />
            <ellipse
              :cx="210 + i * 19"
              cy="300"
              :rx="12"
              :ry="30"
              fill="none"
              stroke="#F59E0B"
              stroke-width="3"
            />
          </g>
          
          <!-- Magnetic field lines (inside) -->
          <g v-if="current > 0">
            <line
              v-for="i in 5"
              :key="'field-' + i"
              x1="220"
              y1="140 + i * 24"
              x2="580"
              y2="140 + i * 24"
              :stroke="coreType === 'ferrite' ? '#10B981' : '#3B82F6'"
              stroke-width="2"
              stroke-dasharray="10,5"
              class="field-line"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          </g>
          
          <!-- Field direction arrows -->
          <g v-if="current > 0">
            <polygon
              v-for="i in 5"
              :key="'arrow-' + i"
              :points="`${590},${140 + i * 24} ${600},${132 + i * 24} ${600},${148 + i * 24}`"
              :fill="coreType === 'ferrite' ? '#10B981' : '#3B82F6'"
            />
          </g>
          
          <!-- Labels -->
          <text x="400" y="80" text-anchor="middle" fill="#F59E0B" font-size="16" font-weight="bold">
            Solenoid Coil ({{ numTurns }} turns)
          </text>
          
          <text x="400" y="230" text-anchor="middle" fill="#9CA3AF" font-size="14" font-weight="bold" v-if="coreType === 'ferrite'">
            Ferrite Core (μr = {{ relativePermeability }})
          </text>
          
          <text x="620" y="200" text-anchor="middle" :fill="coreType === 'ferrite' ? '#10B981' : '#3B82F6'" font-size="14" font-weight="bold">
            B →
          </text>
          
          <!-- Current direction indicator -->
          <g transform="translate(100, 200)">
            <circle cx="0" cy="0" r="25" fill="#1F2937" stroke="#60A5FA" stroke-width="2" />
            <text x="0" y="5" text-anchor="middle" fill="#60A5FA" font-size="14" font-weight="bold">I</text>
            <text x="0" y="40" text-anchor="middle" fill="#60A5FA" font-size="12">{{ formattedCurrent }}</text>
          </g>
          
          <!-- Dimensions -->
          <line x1="200" y1="350" x2="600" y2="350" stroke="#9CA3AF" stroke-width="1" />
          <line x1="200" y1="345" x2="200" y2="355" stroke="#9CA3AF" stroke-width="1" />
          <line x1="600" y1="345" x2="600" y2="355" stroke="#9CA3AF" stroke-width="1" />
          <text x="400" y="370" text-anchor="middle" fill="#9CA3AF" font-size="12">L = {{ formattedLength }}</text>
          
          <line x1="650" y1="120" x2="650" y2="280" stroke="#9CA3AF" stroke-width="1" />
          <line x1="645" y1="120" x2="655" y2="120" stroke="#9CA3AF" stroke-width="1" />
          <line x1="645" y1="280" x2="655" y2="280" stroke="#9CA3AF" stroke-width="1" />
          <text x="680" y="200" text-anchor="middle" fill="#9CA3AF" font-size="12" transform="rotate(90, 680, 200)">
            D = {{ formattedDiameter }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Field Analysis -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Field Strength Comparison -->
      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📏 Field Strength Scale</h4>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-300">Earth's magnetic field</span>
            <span class="text-sm font-mono text-gray-500">~50 μT</span>
          </div>
          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
            <div class="bg-gray-400 h-3 rounded-full" style="width: 0.1%"></div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-300">Refrigerator magnet</span>
            <span class="text-sm font-mono text-gray-500">~10 mT</span>
          </div>
          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
            <div class="bg-blue-400 h-3 rounded-full" style="width: 5%"></div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">Your solenoid</span>
            <span class="text-sm font-mono font-bold text-primary-highlight">{{ formattedMagneticField }}</span>
          </div>
          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
            <div 
              class="bg-primary h-3 rounded-full transition-all duration-300"
              :style="{ width: Math.min(100, (magneticField * 100)) + '%' }"
            ></div>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-300">MRI machine</span>
            <span class="text-sm font-mono text-gray-500">~1.5 T</span>
          </div>
          <div class="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
            <div class="bg-purple-400 h-3 rounded-full" style="width: 100%"></div>
          </div>
        </div>
      </div>

      <!-- Practical Info -->
      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 Design Tips</h4>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold mb-1">To increase field strength:</p>
            <ul class="space-y-1 text-xs">
              <li>• Increase current (I)</li>
              <li>• Add more turns (N)</li>
              <li>• Use a ferrite core</li>
            </ul>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold mb-1">Saturation warning:</p>
            <p class="text-xs" v-if="coreType === 'ferrite' && magneticField > 0.5">
              ⚠️ Field above 0.5 T may saturate ferrite core
            </p>
            <p class="text-xs" v-else>
              Current field is within typical limits
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold mb-1">Power considerations:</p>
            <p class="text-xs">
              Resistance × Current² = Power dissipated as heat
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Component props
const coreType = ref<'air' | 'ferrite'>('air')
const numTurns = ref(100)
const current = ref(1)
const currentUnit = ref('A')
const length = ref(10)
const lengthUnit = ref('cm')
const diameter = ref(5)
const diameterUnit = ref('cm')
const relativePermeability = ref(1000)

// Convert to base units (SI: meters, amperes)
const currentBase = computed(() => {
  return currentUnit.value === 'mA' ? current.value / 1000 : current.value
})

const lengthBase = computed(() => {
  const unitMap: Record<string, number> = {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001
  }
  return length.value * (unitMap[lengthUnit.value] || 1)
})

const diameterBase = computed(() => {
  const unitMap: Record<string, number> = {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001
  }
  return diameter.value * (unitMap[diameterUnit.value] || 1)
})

const radiusBase = computed(() => diameterBase.value / 2)

// Constants
const mu0 = 4 * Math.PI * 1e-7 // Permeability of free space (H/m)

// Effective permeability
const effectivePermeability = computed(() => {
  return coreType.value === 'ferrite' ? mu0 * relativePermeability.value : mu0
})

// Calculate magnetic field at center of solenoid
// B = mu0 * mur * N * I / L (for long solenoid approximation)
const magneticField = computed(() => {
  const muEffective = effectivePermeability.value
  const N = numTurns.value
  const I = currentBase.value
  const L = lengthBase.value
  
  return (muEffective * N * I) / L
})

// Calculate ampere-turns
const ampereTurns = computed(() => {
  return numTurns.value * currentBase.value
})

// Calculate turn density (turns per meter)
const turnDensity = computed(() => {
  return numTurns.value / lengthBase.value
})

// Format functions
function formatMagneticField(b: number): string {
  if (b >= 1) {
    return b.toFixed(4) + ' T'
  } else if (b >= 0.001) {
    return (b * 1000).toFixed(2) + ' mT'
  } else if (b >= 0.000001) {
    return (b * 1000000).toFixed(2) + ' μT'
  } else {
    return (b * 1000000000).toFixed(2) + ' nT'
  }
}

const formattedMagneticField = computed(() => formatMagneticField(magneticField.value))

function formatCurrent(i: number): string {
  if (i >= 1) {
    return i.toFixed(2) + ' A'
  } else if (i >= 0.001) {
    return (i * 1000).toFixed(2) + ' mA'
  } else {
    return (i * 1000000).toFixed(2) + ' μA'
  }
}

const formattedCurrent = computed(() => formatCurrent(currentBase.value))

function formatLength(l: number): string {
  if (l >= 1) {
    return l.toFixed(2) + ' m'
  } else if (l >= 0.01) {
    return (l * 100).toFixed(1) + ' cm'
  } else {
    return (l * 1000).toFixed(0) + ' mm'
  }
}

const formattedLength = computed(() => formatLength(lengthBase.value))

const formattedDiameter = computed(() => formatLength(diameterBase.value))

function formatAmpereTurns(ni: number): string {
  if (ni >= 1000) {
    return (ni / 1000).toFixed(2) + ' kA⋅t'
  } else {
    return ni.toFixed(1) + ' A⋅t'
  }
}

const formattedAmpereTurns = computed(() => formatAmpereTurns(ampereTurns.value))

function formatTurnDensity(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(2) + ' k turns/m'
  } else {
    return n.toFixed(1) + ' turns/m'
  }
}

const formattedTurnDensity = computed(() => formatTurnDensity(turnDensity.value))
</script>

<style scoped>
.field-line {
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -30;
  }
}
</style>

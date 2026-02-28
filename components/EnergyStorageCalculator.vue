<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Energy Storage Calculator</h2>
    
    <!-- Component Type Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Component Type
      </label>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="componentType = 'capacitor'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            componentType === 'capacitor'
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="text-3xl mb-2">⚡</div>
          <div>Capacitor</div>
        </button>
        <button
          @click="componentType = 'inductor'"
          :class="[
            'p-4 rounded-lg font-semibold transition-all',
            componentType === 'inductor'
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="text-3xl mb-2">🌀</div>
          <div>Inductor</div>
        </button>
      </div>
    </div>

    <!-- Capacitor Calculator -->
    <div v-if="componentType === 'capacitor'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Voltage Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voltage (V)
          </label>
          <input
            v-model.number="capacitorVoltage"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter voltage"
          />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Range: 0 - 1000 V
          </div>
        </div>

        <!-- Capacitance Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Capacitance (C)
          </label>
          <div class="flex gap-2">
            <input
              v-model.number="capacitorCapacitance"
              type="number"
              step="0.1"
              class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter capacitance"
            />
            <select
              v-model="capacitorUnit"
              class="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="μF">μF</option>
              <option value="mF">mF</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Quick Presets -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Presets
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            @click="setCapacitorPreset(5, 1000, 'μF')"
            class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            5V, 1000μF
          </button>
          <button
            @click="setCapacitorPreset(12, 470, 'μF')"
            class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium"
          >
            12V, 470μF
          </button>
          <button
            @click="setCapacitorPreset(25, 100, 'μF')"
            class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
          >
            25V, 100μF
          </button>
          <button
            @click="setCapacitorPreset(400, 47, 'μF')"
            class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium"
          >
            400V, 47μF
          </button>
        </div>
      </div>

      <!-- Results Display -->
      <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Energy Stored in Capacitor</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Formula:</span>
            <span class="font-mono font-bold text-gray-900 dark:text-white">E = ½CV²</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="text-gray-600 dark:text-gray-300">Stored Energy:</span>
            <span class="font-mono font-bold text-primary">{{ formatEnergy(capacitorEnergy) }}</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="text-gray-600 dark:text-gray-300">In Joules:</span>
            <span class="font-mono font-bold text-gray-900 dark:text-white">{{ capacitorEnergyJoules.toFixed(6) }} J</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Equivalent to:</span>
            <span class="font-mono text-sm text-gray-700 dark:text-gray-300">{{ capacitorEnergyWattHours }} Wh</span>
          </div>
        </div>
      </div>

      <!-- Energy Visualization -->
      <div class="bg-white dark:bg-gray-700 rounded-xl p-6">
        <h4 class="text-md font-bold text-gray-900 dark:text-white mb-4">Energy Scale Visualization</h4>
        <div class="relative h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            :style="{ width: Math.min((capacitorEnergyJoules / 10) * 100, 100) + '%' }"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sm font-bold text-white drop-shadow-lg">{{ capacitorEnergyJoules.toFixed(3) }} J</span>
          </div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0 J</span>
          <span>5 J</span>
          <span>10 J</span>
        </div>
      </div>

      <!-- Capacitor SVG -->
      <div class="flex justify-center">
        <svg viewBox="0 0 200 150" class="w-full max-w-md">
          <!-- Wire -->
          <line x1="100" y1="20" x2="100" y2="60" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="100" y1="90" x2="100" y2="130" stroke="#9CA3AF" stroke-width="3"/>
          
          <!-- Capacitor plates -->
          <line x1="60" y1="60" x2="140" y2="60" stroke="#7C3AED" stroke-width="6"/>
          <line x1="60" y1="90" x2="140" y2="90" stroke="#7C3AED" stroke-width="6"/>
          
          <!-- Voltage label -->
          <text x="150" y="50" class="text-xs" fill="#374151">{{ capacitorVoltage }} V</text>
          <text x="150" y="65" class="text-xs" fill="#6B7280">Voltage</text>
          
          <!-- Capacitance label -->
          <text x="150" y="90" class="text-xs" fill="#374151">{{ capacitorCapacitance }} {{ capacitorUnit }}</text>
          <text x="150" y="105" class="text-xs" fill="#6B7280">Capacitance</text>
          
          <!-- Energy label -->
          <rect x="40" y="115" width="120" height="25" rx="5" fill="#EDE9FE"/>
          <text x="100" y="132" text-anchor="middle" class="text-sm font-bold" fill="#7C3AED">
            E = {{ formatEnergy(capacitorEnergy) }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Inductor Calculator -->
    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Current Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current (I)
          </label>
          <input
            v-model.number="inductorCurrent"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter current"
          />
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Range: 0 - 100 A
          </div>
        </div>

        <!-- Inductance Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inductance (L)
          </label>
          <div class="flex gap-2">
            <input
              v-model.number="inductorInductance"
              type="number"
              step="0.1"
              class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter inductance"
            />
            <select
              v-model="inductorUnit"
              class="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="pH">pH</option>
              <option value="nH">nH</option>
              <option value="μH">μH</option>
              <option value="mH">mH</option>
              <option value="H">H</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Quick Presets -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Presets
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            @click="setInductorPreset(1, 10, 'μH')"
            class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            1A, 10μH
          </button>
          <button
            @click="setInductorPreset(5, 100, 'μH')"
            class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium"
          >
            5A, 100μH
          </button>
          <button
            @click="setInductorPreset(2, 10, 'mH')"
            class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
          >
            2A, 10mH
          </button>
          <button
            @click="setInductorPreset(0.5, 1, 'H')"
            class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium"
          >
            0.5A, 1H
          </button>
        </div>
      </div>

      <!-- Results Display -->
      <div class="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Energy Stored in Inductor</h3>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Formula:</span>
            <span class="font-mono font-bold text-gray-900 dark:text-white">E = ½LI²</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="text-gray-600 dark:text-gray-300">Stored Energy:</span>
            <span class="font-mono font-bold text-primary">{{ formatEnergy(inductorEnergy) }}</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="text-gray-600 dark:text-gray-300">In Joules:</span>
            <span class="font-mono font-bold text-gray-900 dark:text-white">{{ inductorEnergyJoules.toFixed(6) }} J</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-300">Equivalent to:</span>
            <span class="font-mono text-sm text-gray-700 dark:text-gray-300">{{ inductorEnergyWattHours }} Wh</span>
          </div>
        </div>
      </div>

      <!-- Energy Visualization -->
      <div class="bg-white dark:bg-gray-700 rounded-xl p-6">
        <h4 class="text-md font-bold text-gray-900 dark:text-white mb-4">Energy Scale Visualization</h4>
        <div class="relative h-8 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300"
            :style="{ width: Math.min((inductorEnergyJoules / 5) * 100, 100) + '%' }"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sm font-bold text-white drop-shadow-lg">{{ inductorEnergyJoules.toFixed(3) }} J</span>
          </div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0 J</span>
          <span>2.5 J</span>
          <span>5 J</span>
        </div>
      </div>

      <!-- Inductor SVG -->
      <div class="flex justify-center">
        <svg viewBox="0 0 200 150" class="w-full max-w-md">
          <!-- Wire -->
          <line x1="100" y1="20" x2="100" y2="50" stroke="#9CA3AF" stroke-width="3"/>
          <line x1="100" y1="100" x2="100" y2="130" stroke="#9CA3AF" stroke-width="3"/>
          
          <!-- Inductor coils -->
          <path
            d="M100,50 Q85,55 85,62.5 Q85,70 100,75 Q115,80 115,87.5 Q115,95 100,100"
            fill="none"
            stroke="#0891B2"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M85,62.5 Q100,67.5 115,62.5 M85,87.5 Q100,92.5 115,87.5"
            fill="none"
            stroke="#0891B2"
            stroke-width="4"
            stroke-linecap="round"
          />
          
          <!-- Current label -->
          <text x="150" y="40" class="text-xs" fill="#374151">{{ inductorCurrent }} A</text>
          <text x="150" y="55" class="text-xs" fill="#6B7280">Current</text>
          
          <!-- Inductance label -->
          <text x="150" y="80" class="text-xs" fill="#374151">{{ inductorInductance }} {{ inductorUnit }}</text>
          <text x="150" y="95" class="text-xs" fill="#6B7280">Inductance</text>
          
          <!-- Energy label -->
          <rect x="40" y="115" width="120" height="25" rx="5" fill="#ECFEFF"/>
          <text x="100" y="132" text-anchor="middle" class="text-sm font-bold" fill="#0891B2">
            E = {{ formatEnergy(inductorEnergy) }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Comparison -->
    <div class="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 Practical Examples</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Camera Flash Capacitor</h4>
          <p class="text-gray-600 dark:text-gray-300">~300V, 100μF → ~4.5J</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Stores enough energy for a bright flash</p>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">SMPS Inductor</h4>
          <p class="text-gray-600 dark:text-gray-300">~5A, 100μH → ~1.25mJ</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Energy transfers continuously in switching</p>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Supercapacitor</h4>
          <p class="text-gray-600 dark:text-gray-300">~2.5V, 100F → ~312.5J</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Can power small devices for hours</p>
        </div>
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Power Inductor</h4>
          <p class="text-gray-600 dark:text-gray-300">~10A, 10mH → ~0.5J</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Used in filters and converters</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Component type
const componentType = ref('capacitor')

// Capacitor inputs
const capacitorVoltage = ref(5)
const capacitorCapacitance = ref(1000)
const capacitorUnit = ref('μF')

// Inductor inputs
const inductorCurrent = ref(1)
const inductorInductance = ref(10)
const inductorUnit = ref('μH')

// Unit multipliers
const unitMultipliers = {
  pF: 1e-12,
  nF: 1e-9,
  μF: 1e-6,
  mF: 1e-3,
  F: 1,
  pH: 1e-12,
  nH: 1e-9,
  μH: 1e-6,
  mH: 1e-3,
  H: 1
}

// Calculate capacitor energy
const capacitorEnergyJoules = computed(() => {
  const C = capacitorCapacitance.value * unitMultipliers[capacitorUnit.value]
  const V = capacitorVoltage.value
  return 0.5 * C * V * V
})

const capacitorEnergyWattHours = computed(() => {
  return (capacitorEnergyJoules.value / 3600).toFixed(6)
})

const capacitorEnergy = computed(() => {
  const E = capacitorEnergyJoules.value
  if (E < 1e-6) return `${(E * 1e9).toFixed(3)} nJ`
  if (E < 1e-3) return `${(E * 1e6).toFixed(3)} μJ`
  if (E < 1) return `${(E * 1e3).toFixed(3)} mJ`
  return `${E.toFixed(3)} J`
})

// Calculate inductor energy
const inductorEnergyJoules = computed(() => {
  const L = inductorInductance.value * unitMultipliers[inductorUnit.value]
  const I = inductorCurrent.value
  return 0.5 * L * I * I
})

const inductorEnergyWattHours = computed(() => {
  return (inductorEnergyJoules.value / 3600).toFixed(6)
})

const inductorEnergy = computed(() => {
  const E = inductorEnergyJoules.value
  if (E < 1e-6) return `${(E * 1e9).toFixed(3)} nJ`
  if (E < 1e-3) return `${(E * 1e6).toFixed(3)} μJ`
  if (E < 1) return `${(E * 1e3).toFixed(3)} mJ`
  return `${E.toFixed(3)} J`
})

// Format energy for display
function formatEnergy(energy) {
  return energy.value
}

// Preset functions
function setCapacitorPreset(voltage, capacitance, unit) {
  capacitorVoltage.value = voltage
  capacitorCapacitance.value = capacitance
  capacitorUnit.value = unit
}

function setInductorPreset(current, inductance, unit) {
  inductorCurrent.value = current
  inductorInductance.value = inductance
  inductorUnit.value = unit
}
</script>

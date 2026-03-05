<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedMaterial = ref('air')
const materialDielectricStrength = ref(3)
const customDielectricStrength = ref(3)
const insulationThickness = ref(1)
const electrodeArea = ref(100)
const appliedVoltage = ref(1000)
const temperature = ref(25)
const humidity = ref(50)
const safetyFactor = ref(2)

const materials = [
  { name: 'Air', dielectricStrength: 3, unit: 'MV/m', description: 'Standard atmospheric conditions' },
  { name: 'Vacuum', dielectricStrength: 20, unit: 'MV/m', description: 'Perfect vacuum' },
  { name: 'Paper (dry)', dielectricStrength: 14, unit: 'MV/m', description: 'Dry paper insulation' },
  { name: 'Paper (oiled)', dielectricStrength: 20, unit: 'MV/m', description: 'Oil-impregnated paper' },
  { name: 'Teflon (PTFE)', dielectricStrength: 60, unit: 'MV/m', description: 'Polytetrafluoroethylene' },
  { name: 'Polyethylene', dielectricStrength: 40, unit: 'MV/m', description: 'PE insulation' },
  { name: 'PVC', dielectricStrength: 40, unit: 'MV/m', description: 'Polyvinyl chloride' },
  { name: 'Rubber', dielectricStrength: 25, unit: 'MV/m', description: 'Natural rubber' },
  { name: 'Mica', dielectricStrength: 200, unit: 'MV/m', description: 'Mica sheets' },
  { name: 'Glass', dielectricStrength: 14, unit: 'MV/m', description: 'Standard glass' },
  { name: 'Ceramic', dielectricStrength: 10, unit: 'MV/m', description: 'Porcelain/ceramic' },
  { name: 'Transformer Oil', dielectricStrength: 12, unit: 'MV/m', description: 'Mineral oil' },
  { name: 'Epoxy Resin', dielectricStrength: 20, unit: 'MV/m', description: 'Epoxy molding compound' },
  { name: 'Silicone Rubber', dielectricStrength: 20, unit: 'MV/m', description: 'Silicone insulation' },
  { name: 'Custom', dielectricStrength: 0, unit: 'MV/m', description: 'Enter custom value' }
]

const breakdownVoltage = computed(() => {
  const strength = selectedMaterial.value === 'Custom'
    ? customDielectricStrength.value
    : materialDielectricStrength.value
  return strength * insulationThickness.value
})

const electricField = computed(() => {
  return appliedVoltage.value / insulationThickness.value
})

const fieldStrengthMVm = computed(() => {
  return electricField.value / 1000000
})

const isBreakdown = computed(() => {
  return electricField.value > breakdownVoltage.value * 1000000
})

const safetyMargin = computed(() => {
  const strength = selectedMaterial.value === 'Custom'
    ? customDielectricStrength.value
    : materialDielectricStrength.value
  const ratedVoltage = (strength * insulationThickness.value * 1000000) / safetyFactor.value
  return ((appliedVoltage.value - ratedVoltage) / ratedVoltage * 100).toFixed(1)
})

const capacitance = computed(() => {
  const ε0 = 8.854e-12
  const εr = getRelativePermittivity()
  const area = electrodeArea.value * 1e-4
  const thickness = insulationThickness.value * 1e-3
  return (ε0 * εr * area / thickness) * 1e12
})

const energyStored = computed(() => {
  const C = capacitance.value * 1e-12
  return 0.5 * C * Math.pow(appliedVoltage.value, 2)
})

const getRelativePermittivity = () => {
  const permittivityMap: Record<string, number> = {
    'Air': 1.0006,
    'Vacuum': 1.0,
    'Paper (dry)': 3.0,
    'Paper (oiled)': 4.0,
    'Teflon (PTFE)': 2.1,
    'Polyethylene': 2.3,
    'PVC': 3.0,
    'Rubber': 3.0,
    'Mica': 5.0,
    'Glass': 7.0,
    'Ceramic': 10.0,
    'Transformer Oil': 2.2,
    'Epoxy Resin': 4.0,
    'Silicone Rubber': 3.0,
    'Custom': 3.0
  }
  return permittivityMap[selectedMaterial.value] || 3.0
}

const temperatureEffect = computed(() => {
  const refTemp = 25
  const deltaT = temperature.value - refTemp
  // Simplified: 2% reduction per 10°C above reference
  const factor = 1 - Math.max(0, deltaT / 10 * 0.02)
  return factor
})

const humidityEffect = computed(() => {
  const refHumidity = 50
  const deltaH = Math.abs(humidity.value - refHumidity)
  // Simplified: 1% reduction per 10% humidity deviation
  const factor = 1 - Math.min(0.3, deltaH / 10 * 0.01)
  return factor
})

const adjustedBreakdownVoltage = computed(() => {
  return breakdownVoltage.value * temperatureEffect.value * humidityEffect.value
})

const adjustedBreakdown = computed(() => {
  return electricField.value > adjustedBreakdownVoltage.value * 1000000
})

const statusLevel = computed(() => {
  if (adjustedBreakdown.value) {
    return { level: 'BREAKDOWN!', color: 'text-red-600', bg: 'bg-red-100', icon: '⚠️' }
  }
  const fieldRatio = electricField.value / (adjustedBreakdownVoltage.value * 1000000) * 100
  if (fieldRatio > 80) {
    return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-50', icon: '🔴' }
  }
  if (fieldRatio > 60) {
    return { level: 'Warning', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '🟡' }
  }
  if (fieldRatio > 40) {
    return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🟠' }
  }
  return { level: 'Safe', color: 'text-green-600', bg: 'bg-green-50', icon: '🟢' }
})

const fieldPercentage = computed(() => {
  return (electricField.value / (adjustedBreakdownVoltage.value * 1000000) * 100).toFixed(1)
})

const showTheory = ref(false)
const showApplications = ref(false)
const showStandards = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Dielectric Strength Calculator</h1>
      <p class="text-xl text-gray-600">Calculate breakdown voltage and electric field strength for insulation materials</p>
    </div>

    <!-- Control Panel -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Material & Geometry Parameters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Dielectric Material
          </label>
          <select
            v-model="selectedMaterial"
            @change="materialDielectricStrength = materials.find(m => m.name === selectedMaterial)?.dielectricStrength || 3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="material in materials" :key="material.name" :value="material.name">
              {{ material.name }} ({{ material.dielectricStrength }} MV/m)
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-1">
            {{ materials.find(m => m.name === selectedMaterial)?.description }}
          </p>
        </div>

        <div v-if="selectedMaterial === 'Custom'">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Custom Dielectric Strength (MV/m)
          </label>
          <input
            type="number"
            v-model="customDielectricStrength"
            step="0.1"
            min="0.1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Insulation Thickness: {{ insulationThickness }} mm
          </label>
          <input
            type="range"
            v-model="insulationThickness"
            min="0.01"
            max="100"
            step="0.01"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Electrode Area: {{ electrodeArea }} cm²
          </label>
          <input
            type="range"
            v-model="electrodeArea"
            min="0.1"
            max="10000"
            step="0.1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Applied Voltage: {{ appliedVoltage }} V
          </label>
          <input
            type="range"
            v-model="appliedVoltage"
            min="0"
            max="100000"
            step="10"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Temperature: {{ temperature }} °C
          </label>
          <input
            type="range"
            v-model="temperature"
            min="-40"
            max="200"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Humidity: {{ humidity }} %
          </label>
          <input
            type="range"
            v-model="humidity"
            min="0"
            max="100"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Safety Factor: {{ safetyFactor }}x
          </label>
          <input
            type="range"
            v-model="safetyFactor"
            min="1"
            max="10"
            step="0.5"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Results Panel -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Calculation Results</h2>

      <!-- Status Indicator -->
      <div class="mb-6 p-6 rounded-lg text-center" :class="statusLevel.bg">
        <div class="text-5xl mb-2">{{ statusLevel.icon }}</div>
        <div class="text-3xl font-bold" :class="statusLevel.color">{{ statusLevel.level }}</div>
        <div class="text-lg text-gray-600 mt-2" v-if="adjustedBreakdown">
          ⚠️ BREAKDOWN OCCURRING! Reduce voltage or increase insulation.
        </div>
        <div class="text-lg text-gray-600 mt-2" v-else>
          Electric field at {{ fieldPercentage }}% of breakdown strength
        </div>
      </div>

      <!-- Main Results Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Electric Field Strength</div>
          <div class="text-2xl font-bold text-blue-600">{{ fieldStrengthMVm.toFixed(3) }} MV/m</div>
          <div class="text-xs text-gray-500 mt-1">{{ electricField.toExponential(2) }} V/m</div>
        </div>

        <div class="bg-purple-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Theoretical Breakdown Voltage</div>
          <div class="text-2xl font-bold text-purple-600">{{ breakdownVoltage.toFixed(1) }} kV</div>
          <div class="text-xs text-gray-500 mt-1">At standard conditions</div>
        </div>

        <div class="bg-green-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Adjusted Breakdown Voltage</div>
          <div class="text-2xl font-bold text-green-600">{{ adjustedBreakdownVoltage.toFixed(1) }} kV</div>
          <div class="text-xs text-gray-500 mt-1">
            With temp/humidity effects
            <br>
            <span v-if="temperatureEffect < 1" class="text-orange-600">
              Temp: -{{ ((1 - temperatureEffect) * 100).toFixed(0) }}%
            </span>
            <span v-if="humidityEffect < 1" class="text-blue-600 ml-1">
              Humidity: -{{ ((1 - humidityEffect) * 100).toFixed(0) }}%
            </span>
          </div>
        </div>

        <div class="bg-orange-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Rated Voltage ({{ safetyFactor }}x safety)</div>
          <div class="text-2xl font-bold text-orange-600">
            {{ ((adjustedBreakdownVoltage.value * 1000) / safetyFactor).toFixed(0) }} V
          </div>
          <div class="text-xs text-gray-500 mt-1">Maximum safe operating voltage</div>
        </div>

        <div class="bg-indigo-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Capacitance</div>
          <div class="text-2xl font-bold text-indigo-600">{{ capacitance.toFixed(3) }} pF</div>
          <div class="text-xs text-gray-500 mt-1">εr ≈ {{ getRelativePermittivity() }}</div>
        </div>

        <div class="bg-pink-50 rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Energy Stored</div>
          <div class="text-2xl font-bold text-pink-600">{{ energyStored.toFixed(3) }} mJ</div>
          <div class="text-xs text-gray-500 mt-1">At applied voltage</div>
        </div>
      </div>

      <!-- Safety Margin -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-2">Safety Margin Analysis</h3>
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <div class="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-300 flex items-center justify-end pr-2 text-sm font-bold"
                :class="parseFloat(safetyMargin) < 0 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'"
                :style="{ width: Math.min(100, Math.max(0, 100 + parseFloat(safetyMargin))) + '%' }"
              >
                {{ parseFloat(safetyMargin) > 0 ? '+' : '' }}{{ safetyMargin }}%
              </div>
            </div>
          </div>
          <div class="text-sm text-gray-600">
            <span v-if="parseFloat(safetyMargin) >= 0" class="text-green-600 font-semibold">✓ Within safety limit</span>
            <span v-else class="text-red-600 font-semibold">✗ Exceeds safety limit</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Diagram -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Insulation System Diagram</h2>
      <div class="flex justify-center">
        <svg viewBox="0 0 600 400" class="w-full max-w-3xl">
          <!-- Background -->
          <rect x="0" y="0" width="600" height="400" fill="#f8f9fa"/>

          <!-- Top Electrode -->
          <rect x="150" y="50" width="300" height="30" fill="#4a5568" stroke="#2d3748" stroke-width="2"/>
          <text x="300" y="70" text-anchor="middle" fill="white" class="text-sm font-bold">Positive Electrode (+)</text>

          <!-- Dielectric Material -->
          <rect
            x="150"
            y="80"
            width="300"
            :height="Math.max(40, insulationThickness * 20)"
            :fill="adjustedBreakdown ? '#fee2e2' : '#c6f6d5'"
            stroke="#2d3748"
            stroke-width="2"
          />
          <text x="300" :y="80 + (Math.max(40, insulationThickness * 20) / 2)" text-anchor="middle" fill="#2d3748" class="text-sm font-semibold">
            {{ selectedMaterial }}
          </text>
          <text x="300" :y="80 + (Math.max(40, insulationThickness * 20) / 2) + 20" text-anchor="middle" fill="#4a5568" class="text-xs">
            {{ insulationThickness }} mm
          </text>

          <!-- Electric Field Lines -->
          <g opacity="0.4">
            <line
              v-for="i in 10"
              :x1="180 + i * 24"
              :y1="110"
              :x2="180 + i * 24"
              :y2="80 + Math.max(40, insulationThickness * 20)"
              :stroke="adjustedBreakdown ? '#e53e3e' : '#3182ce'"
              stroke-width="2"
              stroke-dasharray="5,3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="16"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          <!-- Breakdown Indicator -->
          <g v-if="adjustedBreakdown">
            <path
              d="M 250 150 L 260 160 L 240 170 L 270 180 L 230 190 L 260 200 L 250 210"
              stroke="#e53e3e"
              stroke-width="3"
              fill="none"
              opacity="0.8"
            >
              <animate
                attributeName="opacity"
                values="0.8;0.4;0.8"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
            <text x="310" y="180" fill="#e53e3e" class="text-sm font-bold">⚡ BREAKDOWN</text>
          </g>

          <!-- Bottom Electrode -->
          <rect
            x="150"
            :y="80 + Math.max(40, insulationThickness * 20)"
            width="300"
            height="30"
            fill="#4a5568"
            stroke="#2d3748"
            stroke-width="2"
          />
          <text x="300" :y="80 + Math.max(40, insulationThickness * 20) + 20" text-anchor="middle" fill="white" class="text-sm font-bold">
            Negative Electrode (-)
          </text>

          <!-- Voltage Labels -->
          <text x="100" y="70" text-anchor="end" fill="#3182ce" class="text-sm font-bold">
            +{{ (appliedVoltage / 2).toFixed(0) }}V
          </text>
          <text x="100" :y="80 + Math.max(40, insulationThickness * 20) + 20" text-anchor="end" fill="#3182ce" class="text-sm font-bold">
            -{{ (appliedVoltage / 2).toFixed(0) }}V
          </text>

          <!-- Field Strength Label -->
          <g transform="translate(480, 150)">
            <rect x="-10" y="-30" width="120" height="100" fill="white" stroke="#e2e8f0" stroke-width="1" rx="5"/>
            <text x="0" y="-10" class="text-xs font-semibold">Field Strength</text>
            <text x="0" y="10" :class="adjustedBreakdown ? 'text-red-600 font-bold text-lg' : 'text-blue-600 font-bold text-lg'">
              {{ fieldStrengthMVm.toFixed(2) }} MV/m
            </text>
            <text x="0" y="35" class="text-xs">Breakdown: {{ adjustedBreakdownVoltage.toFixed(1) }} kV</text>
            <text x="0" y="55" :class="parseFloat(safetyMargin) >= 0 ? 'text-green-600 text-xs' : 'text-red-600 text-xs'">
              {{ parseFloat(safetyMargin) >= 0 ? '✓' : '✗' }} Margin: {{ safetyMargin }}%
            </text>
          </g>

          <!-- Scale Reference -->
          <g transform="translate(50, 320)">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#718096" stroke-width="2"/>
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#718096" stroke-width="2"/>
            <line x1="100" y1="-5" x2="100" y2="5" stroke="#718096" stroke-width="2"/>
            <text x="50" y="20" text-anchor="middle" class="text-xs">1 mm (not to scale)</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="space-y-6">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showTheory = !showTheory"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">📚 Dielectric Theory</h2>
          <span class="text-2xl">{{ showTheory ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showTheory" class="mt-4 space-y-4 text-gray-700">
          <p>
            <strong>Dielectric strength</strong> is the maximum electric field that a material can withstand without breaking down and becoming electrically conductive. When this threshold is exceeded, the material undergoes <strong>dielectric breakdown</strong>, resulting in a sudden flow of current.
          </p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Key Formulas:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Electric Field:</strong> E = V / d (V/m)</li>
              <li><strong>Breakdown Voltage:</strong> V_breakdown = E_strength × d</li>
              <li><strong>Capacitance:</strong> C = ε₀ × εᵣ × A / d</li>
              <li><strong>Stored Energy:</strong> E = ½ × C × V²</li>
            </ul>
            <p class="text-sm mt-2">
              Where: V = voltage, d = thickness, ε₀ = permittivity of free space (8.854×10⁻¹² F/m), εᵣ = relative permittivity, A = electrode area
            </p>
          </div>
          <p>
            During breakdown, the insulating material's molecular structure is disrupted, creating conductive paths. This can cause permanent damage to the insulation and lead to equipment failure.
          </p>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Factors Affecting Dielectric Strength:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>Temperature:</strong> Higher temperatures reduce dielectric strength</li>
              <li><strong>Humidity:</strong> Moisture can create conductive paths</li>
              <li><strong>Thickness:</strong> Thicker insulation increases breakdown voltage (not linearly)</li>
              <li><strong>Electrode Geometry:</strong> Sharp edges create field concentrations</li>
              <li><strong>Material Purity:</strong> Impurities create weak points</li>
              <li><strong>Frequency:</strong> AC breakdown may differ from DC</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showApplications = !showApplications"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">🔧 Practical Applications</h2>
          <span class="text-2xl">{{ showApplications ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showApplications" class="mt-4 space-y-4 text-gray-700">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔌 Power Cables</h4>
              <p class="text-sm">Multi-layer insulation (XLPE, EPR) for high-voltage transmission cables up to 500kV</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">⚡ Transformers</h4>
              <p class="text-sm">Paper-oil insulation and pressboard barriers between windings and core</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔋 Capacitors</h4>
              <p class="text-sm">Thin dielectric films (polyester, polypropylene) for energy storage</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📱 PCB Design</h4>
              <p class="text-sm">Creepage and clearance distances for high-voltage circuits</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🏭 Motors & Generators</h4>
              <p class="text-sm">Slot liners, phase insulation, and varnish treatments</p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔬 High-Voltage Equipment</h4>
              <p class="text-sm">SF₆ gas insulation in switchgear and circuit breakers</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showStandards = !showStandards"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">📋 Design Standards & Safety Factors</h2>
          <span class="text-2xl">{{ showStandards ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showStandards" class="mt-4 space-y-4 text-gray-700">
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Recommended Safety Factors:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>General applications:</strong> 2-3×</li>
              <li><strong>High reliability systems:</strong> 4-6×</li>
              <li><strong>Safety-critical equipment:</strong> 8-10×</li>
              <li><strong>Medical equipment:</strong> 10×+ (per IEC 60601)</li>
              <li><strong>Aerospace:</strong> Higher factors with redundancy</li>
            </ul>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Key Standards:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li><strong>IEC 60243:</strong> Electrical strength of insulating materials</li>
              <li><strong>IEC 60664:</strong> Insulation coordination for equipment</li>
              <li><strong>UL 60950:</strong> Safety of information technology equipment</li>
              <li><strong>IPC-2221:</strong> PCB creepage/clearance requirements</li>
              <li><strong>IEC 60587:</strong> Comparative tracking index (CTI)</li>
            </ul>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Design Tips:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Always include safety margins for aging and environmental factors</li>
              <li>Consider voltage transients and surges, not just steady-state</li>
              <li>Use rounded electrode edges to reduce field concentration</li>
              <li>Specify creepage (surface) and clearance (air) distances separately</li>
              <li>Test actual samples - manufacturer data is typically optimistic</li>
              <li>Account for manufacturing tolerances (+/-10-20%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Input parameters
const numberOfTurns = ref(1000)
const current = ref(1.5)
const solenoidLength = ref(50)
const solenoidDiameter = ref(20)
const coreMaterial = ref('air')
const corePermeability = ref(1.0)
const pointPosition = ref(50)
const pointRadius = ref(0)

// Core material presets
const coreMaterials = [
  { name: 'air', permeability: 1.0, label: 'Air (µr = 1)' },
  { name: 'iron', permeability: 5000, label: 'Iron (µr = 5000)' },
  { name: 'ferrite', permeability: 2000, label: 'Ferrite (µr = 2000)' },
  { name: 'steel', permeability: 1000, label: 'Steel (µr = 1000)' },
  { name: 'nickel', permeability: 600, label: 'Nickel (µr = 600)' },
  { name: 'custom', permeability: 100, label: 'Custom' }
]

// Constants
const mu0 = 4 * Math.PI * 1e-7 // Vacuum permeability

// Computed values
const solenoidRadius = computed(() => solenoidDiameter.value / 2)
const lengthMeters = computed(() => solenoidLength.value / 100) // cm to m
const radiusMeters = computed(() => solenoidRadius.value / 100) // cm to m

// Number of turns per unit length
const turnsPerMeter = computed(() => numberOfTurns.value / lengthMeters.value)

// Magnetic field at center of solenoid (on axis)
const magneticFieldCenter = computed(() => {
  const mu = mu0 * corePermeability.value
  const n = turnsPerMeter.value
  const I = current.value
  return (mu * n * I).toFixed(6)
})

// Magnetic field at arbitrary point on axis (using finite solenoid formula)
const magneticFieldAtPoint = computed(() => {
  const mu = mu0 * corePermeability.value
  const n = turnsPerMeter.value
  const I = current.value
  const R = radiusMeters.value
  const L = lengthMeters.value
  const z = pointPosition.value / 100 // cm to m, 0 at one end
  
  // Finite solenoid formula
  const term1 = (z + L) / Math.sqrt(Math.pow(z + L, 2) + Math.pow(R, 2))
  const term2 = z / Math.sqrt(Math.pow(z, 2) + Math.pow(R, 2))
  const B = (mu * n * I / 2) * (term1 - term2)
  
  return B.toFixed(6)
})

// Magnetic field at end of solenoid
const magneticFieldEnd = computed(() => {
  const mu = mu0 * corePermeability.value
  const n = turnsPerMeter.value
  const I = current.value
  const R = radiusMeters.value
  const L = lengthMeters.value
  
  const term = L / Math.sqrt(Math.pow(L, 2) + Math.pow(R, 2))
  const B = (mu * n * I / 2) * term
  
  return B.toFixed(6)
})

// Magnetic field at off-axis point (approximate)
const magneticFieldOffAxis = computed(() => {
  const mu = mu0 * corePermeability.value
  const n = turnsPerMeter.value
  const I = current.value
  const R = radiusMeters.value
  const r = pointRadius.value / 100 // cm to m
  const z = pointPosition.value / 100
  
  if (r > R) {
    return (0).toFixed(6) // Outside solenoid
  }
  
  // Approximate field inside solenoid (uniform field approximation)
  const B0 = parseFloat(magneticFieldAtPoint.value)
  const B = B0 * (1 - Math.pow(r / R, 2))
  
  return B.toFixed(6)
})

// Magnetic flux density in Tesla
const magneticFluxDensity = computed(() => {
  return (parseFloat(magneticFieldCenter) * 1000).toFixed(3) // mT
})

// Magnetomotive force (MMF)
const magnetomotiveForce = computed(() => {
  return (numberOfTurns.value * current.value).toFixed(1)
})

// Reluctance of the magnetic circuit
const reluctance = computed(() => {
  const l = lengthMeters.value
  const A = Math.PI * Math.pow(radiusMeters.value, 2)
  const mu = mu0 * corePermeability.value
  return (l / (mu * A)).toExponential(3)
})

// Inductance of solenoid
const inductance = computed(() => {
  const mu = mu0 * corePermeability.value
  const N = numberOfTurns.value
  const A = Math.PI * Math.pow(radiusMeters.value, 2)
  const l = lengthMeters.value
  
  const L = (mu * Math.pow(N, 2) * A) / l
  return L.toFixed(6)
})

// Wire length required
const wireLength = computed(() => {
  const circumference = 2 * Math.PI * radiusMeters.value
  return (circumference * numberOfTurns.value).toFixed(2)
})

// Energy stored in magnetic field
const magneticEnergy = computed(() => {
  const L = parseFloat(inductance.value)
  const I = current.value
  return (0.5 * L * Math.pow(I, 2) * 1000).toFixed(3) // mJ
})

// Magnetic field strength in Oersteds (for reference)
const magneticFieldOersteds = computed(() => {
  const B = parseFloat(magneticFieldCenter)
  return (B / (4 * Math.PI * 1e-7) * 0.001).toFixed(3)
})

// Update core permeability when preset changes
const updateCorePermeability = () => {
  const material = coreMaterials.find(m => m.name === coreMaterial.value)
  if (material && material.name !== 'custom') {
    corePermeability.value = material.permeability
  }
}

// Generate field visualization data
const fieldVisualizationData = computed(() => {
  const points = []
  const steps = 20
  
  for (let i = 0; i <= steps; i++) {
    const z = (i / steps) * lengthMeters.value
    const mu = mu0 * corePermeability.value
    const n = turnsPerMeter.value
    const I = current.value
    const R = radiusMeters.value
    
    const term1 = (z + lengthMeters.value) / Math.sqrt(Math.pow(z + lengthMeters.value, 2) + Math.pow(R, 2))
    const term2 = z / Math.sqrt(Math.pow(z, 2) + Math.pow(R, 2))
    const B = (mu * n * I / 2) * (term1 - term2)
    
    const Bmax = parseFloat(magneticFieldCenter)
    const intensity = Bmax > 0 ? (B / Bmax) * 100 : 0
    
    points.push({
      z: z * 100, // Convert to cm
      b: B,
      intensity: Math.min(100, Math.max(0, intensity))
    })
  }
  
  return points
})

// Safety checks
const isCurrentSafe = computed(() => current.value < 10)
const isTemperatureSafe = computed(() => {
  // Simple estimation based on power
  const resistance = 1 // Assumed resistance
  const power = Math.pow(current.value, 2) * resistance
  return power < 50 // Watts
})

const getSafetyStatus = (safe: boolean, warning: string) => {
  return safe ? 'OK' : warning
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Solenoid Magnetic Field Calculator</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Calculate magnetic field strength, flux density, and electromagnetic properties of solenoid coils
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Controls Panel -->
      <div class="lg:col-span-1 space-y-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">⚡</span> Coil Parameters
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Turns (N): {{ numberOfTurns }}
              </label>
              <input
                v-model.number="numberOfTurns"
                type="range"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span>10,000</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current (I): {{ current }} A
              </label>
              <input
                v-model.number="current"
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1A</span>
                <span>10A</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Solenoid Length: {{ solenoidLength }} cm
              </label>
              <input
                v-model.number="solenoidLength"
                type="range"
                min="1"
                max="200"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1cm</span>
                <span>200cm</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Solenoid Diameter: {{ solenoidDiameter }} cm
              </label>
              <input
                v-model.number="solenoidDiameter"
                type="range"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1cm</span>
                <span>100cm</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">🧲</span> Core Material
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Material Type
              </label>
              <select
                v-model="coreMaterial"
                @change="updateCorePermeability()"
                class="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option v-for="material in coreMaterials" :key="material.name" :value="material.name">
                  {{ material.label }}
                </option>
              </select>
            </div>

            <div v-if="coreMaterial === 'custom'">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Relative Permeability (µr): {{ corePermeability }}
              </label>
              <input
                v-model.number="corePermeability"
                type="range"
                min="1"
                max="10000"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 (Air)</span>
                <span>10,000</span>
              </div>
            </div>

            <div v-else class="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <strong>µr = {{ corePermeability }}</strong>
              </p>
              <p class="text-xs text-blue-600 dark:text-blue-300 mt-1">
                {{ coreMaterial === 'air' ? 'Vacuum/Air core - no magnetic enhancement' : `Magnetic material - field enhanced by ${corePermeability}×` }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📍</span> Measurement Point
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position from End: {{ pointPosition }} cm
              </label>
              <input
                v-model.number="pointPosition"
                type="range"
                min="0"
                max="200"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 (End)</span>
                <span>{{ solenoidLength }} (Center)</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">0 = at solenoid end, {{ solenoidLength }} = at center</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Radial Distance: {{ pointRadius }} cm
              </label>
              <input
                v-model.number="pointRadius"
                type="range"
                min="0"
                max="50"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 (Axis)</span>
                <span>{{ solenoidRadius }} (Edge)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Panel -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Main Results -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📊</span> Magnetic Field Results
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Field at Center</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ magneticFieldCenter }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Tesla (T)</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">At Selected Point</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                {{ magneticFieldAtPoint }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Tesla (T)</p>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Flux Density</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ magneticFluxDensity }}
              </p>
              <p class="text-xs text-gray-500 mt-1">milliTesla (mT)</p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Field at End</p>
              <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {{ magneticFieldEnd }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Tesla (T)</p>
            </div>

            <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">MMF (Magnetomotive Force)</p>
              <p class="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {{ magnetomotiveForce }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Ampere-turns</p>
            </div>

            <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">In Oersteds</p>
              <p class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {{ magneticFieldOersteds }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Oe (CGS units)</p>
            </div>
          </div>
        </div>

        <!-- Coil Properties -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">🔧</span> Coil Properties
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Inductance</h3>
              <p class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {{ inductance }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Henrys (H)</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Wire Length</h3>
              <p class="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {{ wireLength }}
              </p>
              <p class="text-xs text-gray-500 mt-1">Meters (m)</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Stored Energy</h3>
              <p class="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {{ magneticEnergy }}
              </p>
              <p class="text-xs text-gray-500 mt-1">milliJoules (mJ)</p>
            </div>
          </div>

          <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>Reluctance:</strong> {{ reluctance }} A·t/Wb
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
              <strong>Turns per meter:</strong> {{ turnsPerMeter.toFixed(0) }} turns/m
            </p>
          </div>
        </div>

        <!-- Safety Status -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">⚠️</span> Safety Status
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 rounded-lg" :class="isCurrentSafe ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'">
              <p class="font-semibold" :class="isCurrentSafe ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'">
                Current Level: {{ getSafetyStatus(isCurrentSafe, 'HIGH CURRENT!') }}
              </p>
              <p class="text-sm" :class="isCurrentSafe ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'">
                {{ isCurrentSafe ? 'Current within safe limits' : 'Caution: High current may cause overheating' }}
              </p>
            </div>

            <div class="p-3 rounded-lg" :class="isTemperatureSafe ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'">
              <p class="font-semibold" :class="isTemperatureSafe ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'">
                Thermal Status: {{ getSafetyStatus(isTemperatureSafe, 'MONITOR') }}
              </p>
              <p class="text-sm" :class="isTemperatureSafe ? 'text-green-600 dark:text-green-300' : 'text-yellow-600 dark:text-yellow-300'">
                {{ isTemperatureSafe ? 'Power dissipation acceptable' : 'Monitor temperature during operation' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Solenoid Visualization -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">🧲</span> Solenoid Cross-Section
          </h2>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 700 400" class="w-full h-auto">
              <!-- Background grid -->
              <defs>
                <pattern id="solenoidGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
                </pattern>
                
                <!-- Coil gradient -->
                <linearGradient id="coilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#CD7F32;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#B87333;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#CD7F32;stop-opacity:1" />
                </linearGradient>

                <!-- Field line gradient -->
                <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.8" />
                  <stop offset="50%" style="stop-color:#10B981;stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.8" />
                </linearGradient>
              </defs>

              <rect width="700" height="400" fill="url(#solenoidGrid)" />

              <!-- Title -->
              <text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="currentColor">
                Solenoid Cross-Section with Magnetic Field Lines
              </text>

              <!-- Core -->
              <g transform="translate(350, 200)">
                <rect
                  :x="-solenoidDiameter * 3"
                  :y="-solenoidLength * 2"
                  :width="solenoidDiameter * 6"
                  :height="solenoidLength * 4"
                  :fill="coreMaterial === 'air' ? '#E5E7EB' : '#4B5563'"
                  fill-opacity="0.3"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <text
                  :x="solenoidDiameter * 3 + 10"
                  y="0"
                  text-anchor="start"
                  font-size="12"
                  fill="currentColor"
                >
                  {{ coreMaterial.toUpperCase() }} CORE
                </text>
              </g>

              <!-- Coil windings (left side) -->
              <g transform="translate(350, 200)">
                <!-- Top coil -->
                <g v-for="i in Math.min(20, Math.ceil(numberOfTurns / 50))" :key="'top-' + i">
                  <ellipse
                    :cx="-solenoidDiameter * 3 - 5"
                    :cy="-solenoidLength * 2 + (i * solenoidLength * 4 / 20)"
                    :rx="8"
                    :ry="3"
                    fill="url(#coilGradient)"
                    stroke="currentColor"
                    stroke-width="0.5"
                  />
                </g>

                <!-- Bottom coil -->
                <g v-for="i in Math.min(20, Math.ceil(numberOfTurns / 50))" :key="'bottom-' + i">
                  <ellipse
                    :cx="-solenoidDiameter * 3 - 5"
                    :cy="solenoidLength * 2 - (i * solenoidLength * 4 / 20)"
                    :rx="8"
                    :ry="3"
                    fill="url(#coilGradient)"
                    stroke="currentColor"
                    stroke-width="0.5"
                  />
                </g>

                <!-- Current direction indicators -->
                <text x="-solenoidDiameter * 3 - 25" y="-solenoidLength * 2 + 10" font-size="20" fill="currentColor">
                  ⊗
                </text>
                <text x="-solenoidDiameter * 3 - 25" y="solenoidLength * 2 - 10" font-size="20" fill="currentColor">
                  ⊙
                </text>
                <text x="-solenoidDiameter * 3 - 45" y="0" text-anchor="middle" font-size="10" fill="currentColor">
                  I = {{ current }}A
                </text>
              </g>

              <!-- Magnetic field lines -->
              <g transform="translate(350, 200)">
                <!-- Field lines inside solenoid -->
                <line
                  x1="-solenoidDiameter * 2"
                  y1="-solenoidLength * 1.8"
                  x2="-solenoidDiameter * 2"
                  y2="solenoidLength * 1.8"
                  stroke="url(#fieldGradient)"
                  stroke-width="2"
                  opacity="0.8"
                />
                <line
                  x1="0"
                  y1="-solenoidLength * 1.8"
                  x2="0"
                  y2="solenoidLength * 1.8"
                  stroke="url(#fieldGradient)"
                  stroke-width="2"
                  opacity="0.8"
                />
                <line
                  x1="solenoidDiameter * 2"
                  y1="-solenoidLength * 1.8"
                  x2="solenoidDiameter * 2"
                  y2="solenoidLength * 1.8"
                  stroke="url(#fieldGradient)"
                  stroke-width="2"
                  opacity="0.8"
                />

                <!-- Field lines outside (looping) -->
                <path
                  d="M -60 -100 Q -150 -100, -150 0 Q -150 100, -60 100"
                  fill="none"
                  stroke="#10B981"
                  stroke-width="1.5"
                  opacity="0.6"
                  stroke-dasharray="5,5"
                />
                <path
                  d="M 60 -100 Q 150 -100, 150 0 Q 150 100, 60 100"
                  fill="none"
                  stroke="#10B981"
                  stroke-width="1.5"
                  opacity="0.6"
                  stroke-dasharray="5,5"
                />

                <!-- Field direction arrows -->
                <polygon points="0,-150 -10,-140 10,-140" fill="#3B82F6" />
                <polygon points="0,150 -10,140 10,140" fill="#3B82F6" />
              </g>

              <!-- Measurement point indicator -->
              <g transform="translate(350, 200)">
                <circle
                  :cx="0"
                  :cy="pointPosition * 4 - solenoidLength * 2"
                  r="8"
                  fill="#EF4444"
                  opacity="0.8"
                />
                <text
                  :x="15"
                  :y="pointPosition * 4 - solenoidLength * 2 + 4"
                  font-size="11"
                  fill="#EF4444"
                  font-weight="bold"
                >
                  Measurement Point
                </text>
              </g>

              <!-- Dimension lines -->
              <g transform="translate(350, 200)">
                <!-- Length dimension -->
                <line
                  :x1="solenoidDiameter * 3 + 20"
                  :y1="-solenoidLength * 2"
                  :x2="solenoidDiameter * 3 + 20"
                  :y2="solenoidLength * 2"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <line
                  :x1="solenoidDiameter * 3 + 15"
                  :y1="-solenoidLength * 2"
                  :x2="solenoidDiameter * 3 + 25"
                  :y2="-solenoidLength * 2"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <line
                  :x1="solenoidDiameter * 3 + 15"
                  :y1="solenoidLength * 2"
                  :x2="solenoidDiameter * 3 + 25"
                  :y2="solenoidLength * 2"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <text
                  :x="solenoidDiameter * 3 + 35"
                  y="0"
                  text-anchor="start"
                  font-size="11"
                  fill="currentColor"
                >
                  L = {{ solenoidLength }} cm
                </text>

                <!-- Diameter dimension -->
                <line
                  :x1="-solenoidDiameter * 3"
                  :y1="-solenoidLength * 2 - 20"
                  :x2="solenoidDiameter * 3"
                  :y2="-solenoidLength * 2 - 20"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <line
                  :x1="-solenoidDiameter * 3"
                  :y1="-solenoidLength * 2 - 25"
                  :x2="-solenoidDiameter * 3"
                  :y2="-solenoidLength * 2 - 15"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <line
                  :x1="solenoidDiameter * 3"
                  :y1="-solenoidLength * 2 - 25"
                  :x2="solenoidDiameter * 3"
                  :y2="-solenoidLength * 2 - 15"
                  stroke="currentColor"
                  stroke-width="1"
                />
                <text
                  x="0"
                  :y="-solenoidLength * 2 - 30"
                  text-anchor="middle"
                  font-size="11"
                  fill="currentColor"
                >
                  D = {{ solenoidDiameter }} cm
                </text>
              </g>

              <!-- Legend -->
              <g transform="translate(50, 350)">
                <rect x="0" y="0" width="200" height="40" fill="white" fill-opacity="0.9" stroke="currentColor" stroke-width="1" rx="5"/>
                <line x1="10" y1="12" x2="40" y2="12" stroke="url(#fieldGradient)" stroke-width="2"/>
                <text x="50" y="16" font-size="10" fill="currentColor">B field inside</text>
                
                <line x1="10" y1="28" x2="40" y2="28" stroke="#10B981" stroke-width="1.5" stroke-dasharray="5,5"/>
                <text x="50" y="32" font-size="10" fill="currentColor">B field outside</text>
                
                <circle cx="120" cy="12" r="5" fill="#EF4444"/>
                <text x="130" y="16" font-size="10" fill="currentColor">Measurement point</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Field Distribution Graph -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📈</span> Magnetic Field Distribution Along Axis
          </h2>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 700 300" class="w-full h-auto">
              <!-- Grid -->
              <defs>
                <pattern id="fieldGraphGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(156, 163, 175, 0.2)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="700" height="300" fill="url(#fieldGraphGrid)" />

              <!-- Axes -->
              <line x1="60" y1="270" x2="680" y2="270" stroke="currentColor" stroke-width="1"/>
              <line x1="60" y1="30" x2="60" y2="270" stroke="currentColor" stroke-width="1"/>

              <!-- Labels -->
              <text x="370" y="290" text-anchor="middle" font-size="12" fill="currentColor">Position along axis (cm)</text>
              <text x="25" y="150" text-anchor="middle" font-size="12" fill="currentColor" transform="rotate(-90, 25, 150)">Magnetic Field (T)</text>

              <!-- Field distribution curve -->
              <path
                :d="fieldVisualizationData.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${60 + (p.z / solenoidLength) * 600} ${270 - (p.b / parseFloat(magneticFieldCenter)) * 200}`
                ).join(' ')"
                fill="none"
                stroke="#10B981"
                stroke-width="2"
              />

              <!-- Fill under curve -->
              <path
                :d="fieldVisualizationData.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${60 + (p.z / solenoidLength) * 600} ${270 - (p.b / parseFloat(magneticFieldCenter)) * 200}`
                ).join(' ') + ' L 660 270 L 60 270 Z'"
                fill="url(#fieldGradient)"
                opacity="0.3"
              />

              <!-- Maximum field indicator -->
              <line
                x1="60"
                y1="70"
                x2="660"
                y2="70"
                stroke="#EF4444"
                stroke-width="1"
                stroke-dasharray="5,5"
              />
              <text x="665" y="74" font-size="10" fill="#EF4444">Bmax = {{ magneticFieldCenter }} T</text>

              <!-- Selected point marker -->
              <line
                :x1="60 + (pointPosition / solenoidLength) * 600"
                y1="270"
                :x2="60 + (pointPosition / solenoidLength) * 600"
                y2="270 - (parseFloat(magneticFieldAtPoint) / parseFloat(magneticFieldCenter)) * 200"
                stroke="#EF4444"
                stroke-width="2"
              />
              <circle
                :cx="60 + (pointPosition / solenoidLength) * 600"
                :cy="270 - (parseFloat(magneticFieldAtPoint) / parseFloat(magneticFieldCenter)) * 200"
                r="5"
                fill="#EF4444"
              />
              <text
                :x="60 + (pointPosition / solenoidLength) * 600"
                :y="270 - (parseFloat(magneticFieldAtPoint) / parseFloat(magneticFieldCenter)) * 200 - 10"
                text-anchor="middle"
                font-size="10"
                fill="#EF4444"
                font-weight="bold"
              >
                B = {{ magneticFieldAtPoint }} T
              </text>

              <!-- Center marker -->
              <text x="360" y="260" text-anchor="middle" font-size="10" fill="currentColor">Center</text>
              <line x1="360" y1="270" x2="360" y2="275" stroke="currentColor" stroke-width="1"/>

              <!-- End markers -->
              <text x="70" y="260" text-anchor="middle" font-size="10" fill="currentColor">0</text>
              <text x="650" y="260" text-anchor="middle" font-size="10" fill="currentColor">{{ solenoidLength }} cm</text>
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5">
          <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <span class="mr-2">📚</span> Theory & Formulas
          </h2>

          <div class="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 class="font-semibold text-lg mb-2">What is a Solenoid?</h3>
              <p class="text-sm leading-relaxed">
                A solenoid is a coil of wire designed to create a magnetic field when an electric current passes through it. 
                It's one of the most fundamental electromagnetic devices, used in everything from electromagnets and relays 
                to speakers and magnetic resonance imaging (MRI) machines.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Magnetic Field Formula</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm mb-2">
                B = μ₀ × μᵣ × n × I
              </div>
              <ul class="text-xs space-y-1">
                <li><strong>B</strong> = Magnetic field strength (Tesla)</li>
                <li><strong>μ₀</strong> = Vacuum permeability (4π × 10⁻⁷ H/m)</li>
                <li><strong>μᵣ</strong> = Relative permeability of core material</li>
                <li><strong>n</strong> = Number of turns per unit length (turns/m)</li>
                <li><strong>I</strong> = Current (Amperes)</li>
              </ul>
              <p class="text-xs mt-2 text-blue-600 dark:text-blue-400">
                This formula applies to the center of a long solenoid.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Finite Solenoid Formula (On-Axis)</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm">
                B(z) = (μ₀μᵣnI/2) × [(z+L)/√((z+L)²+R²) - z/√(z²+R²)]
              </div>
              <p class="text-xs mt-1">For field at any point along the axis of a finite solenoid</p>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Ampere's Law</h3>
              <p class="text-sm leading-relaxed">
                The magnetic field inside a solenoid can be derived from Ampere's Law, which relates the 
                magnetic field around a closed loop to the current passing through the loop:
              </p>
              <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm mt-2">
                ∮ B · dl = μ₀μᵣ × N × I
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Core Material Effects</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-blue-700 dark:text-blue-300 mb-1">Air Core (µr = 1)</p>
                  <p class="text-xs">Linear response, no saturation, low field strength</p>
                </div>
                <div class="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-green-700 dark:text-green-300 mb-1">Iron Core (µr ≈ 5000)</p>
                  <p class="text-xs">Very high field strength, but saturates at high fields</p>
                </div>
                <div class="bg-purple-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-purple-700 dark:text-purple-300 mb-1">Ferrite (µr ≈ 2000)</p>
                  <p class="text-xs">High frequency applications, low eddy current loss</p>
                </div>
                <div class="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="font-semibold text-orange-700 dark:text-orange-300 mb-1">Custom Materials</p>
                  <p class="text-xs">Input specific permeability for specialized cores</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Practical Applications</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li><strong>Electromagnets:</strong> Lifting scrap metal, magnetic separators</li>
                <li><strong>Solenoid Valves:</strong> Fluid control in industrial systems</li>
                <li><strong>Relays & Contactors:</strong> Electrical switching devices</li>
                <li><strong>Speakers:</strong> Voice coil drives the cone</li>
                <li><strong>MRI Machines:</strong> Generate strong, uniform magnetic fields</li>
                <li><strong>Particle Accelerators:</strong> Guide and focus particle beams</li>
                <li><strong>Maglev Trains:</strong> Magnetic levitation and propulsion</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Design Considerations</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li>Longer solenoids → more uniform field inside</li>
                <li>More turns → stronger magnetic field</li>
                <li>Higher current → stronger field (but watch heating!)</li>
                <li>Magnetic cores → greatly enhance field strength</li>
                <li>AC currents → alternating magnetic fields (transformers, inductors)</li>
                <li>Wire gauge must handle the current without overheating</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-lg mb-2">Key Takeaways</h3>
              <ul class="list-disc list-inside text-sm space-y-1">
                <li>Magnetic field is proportional to current and turns per meter</li>
                <li>Core materials dramatically increase field strength (µr factor)</li>
                <li>Field is strongest at the center, weaker at the ends</li>
                <li>Outside the solenoid, the field is much weaker and loops back</li>
                <li>Energy is stored in the magnetic field: E = ½LI²</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

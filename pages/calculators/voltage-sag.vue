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
            Voltage Sag Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate voltage drop in power lines and ensure proper voltage regulation
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">V_drop</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">I</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">R</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">I</span>
              <span class="text-gray-400">× (</span>
              <span class="text-primary-highlight">ρ</span>
              <span class="text-gray-400">× L / A)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Voltage Drop = Current × Resistance</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Input Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ⚙️ Circuit Parameters
            </h2>

            <!-- Source Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Source Voltage (V)
              </label>
              <input
                v-model.number="sourceVoltage"
                type="number"
                step="0.1"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter source voltage"
              />
            </div>

            <!-- Load Current -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Load Current (A): {{ current }} A
              </label>
              <input
                v-model.number="current"
                type="range"
                min="0"
                max="100"
                step="0.5"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0 A</span>
                <span>50 A</span>
                <span>100 A</span>
              </div>
            </div>

            <!-- Wire Material -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Wire Material
              </label>
              <select
                v-model="material"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="copper">Copper (ρ = 1.724 Ω·mm²/m)</option>
                <option value="aluminum">Aluminum (ρ = 2.65 Ω·mm²/m)</option>
                <option value="gold">Gold (ρ = 2.44 Ω·mm²/m)</option>
                <option value="silver">Silver (ρ = 1.59 Ω·mm²/m)</option>
              </select>
            </div>

            <!-- Wire Length -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Wire Length (m): {{ length }} m
              </label>
              <input
                v-model.number="length"
                type="range"
                min="1"
                max="500"
                step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 m</span>
                <span>250 m</span>
                <span>500 m</span>
              </div>
            </div>

            <!-- Wire Gauge (AWG) -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Wire Gauge (AWG): {{ awg }} AWG
              </label>
              <input
                v-model.number="awg"
                type="range"
                min="0"
                max="20"
                step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0 AWG</span>
                <span>10 AWG</span>
                <span>20 AWG</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Area: {{ wireArea.toFixed(2) }} mm² | Diameter: {{ wireDiameter.toFixed(2) }} mm
              </p>
            </div>

            <!-- Power Factor -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Power Factor: {{ powerFactor }}
              </label>
              <input
                v-model.number="powerFactor"
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0.5</span>
                <span>0.75</span>
                <span>1.0</span>
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📊 Calculation Results
            </h2>

            <!-- Wire Resistance -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-5 mb-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-blue-800 dark:text-blue-300">Wire Resistance</span>
                <span class="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {{ wireResistance.toFixed(4) }} Ω
                </span>
              </div>
            </div>

            <!-- Voltage Drop -->
            <div class="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-5 mb-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-amber-800 dark:text-amber-300">Voltage Drop</span>
                <span class="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  {{ voltageDrop.toFixed(2) }} V
                </span>
              </div>
            </div>

            <!-- Voltage at Load -->
            <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-5 mb-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-green-800 dark:text-green-300">Voltage at Load</span>
                <span class="text-2xl font-bold text-green-900 dark:text-green-100">
                  {{ voltageAtLoad.toFixed(2) }} V
                </span>
              </div>
            </div>

            <!-- Voltage Regulation Percentage -->
            <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-5 mb-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-purple-800 dark:text-purple-300">Voltage Regulation</span>
                <span :class="[
                  'text-2xl font-bold',
                  regulationPercentage > 5 ? 'text-red-900 dark:text-red-100' :
                  regulationPercentage > 3 ? 'text-amber-900 dark:text-amber-100' :
                  'text-green-900 dark:text-green-100'
                ]">
                  {{ regulationPercentage.toFixed(2) }}%
                </span>
              </div>
            </div>

            <!-- Power Loss -->
            <div class="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg p-5 mb-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-red-800 dark:text-red-300">Power Loss</span>
                <span class="text-2xl font-bold text-red-900 dark:text-red-100">
                  {{ powerLoss.toFixed(2) }} W
                </span>
              </div>
            </div>

            <!-- Status Indicator -->
            <div class="rounded-lg p-5" :class="[
              regulationPercentage <= 3 ? 'bg-green-100 dark:bg-green-900/30' :
              regulationPercentage <= 5 ? 'bg-amber-100 dark:bg-amber-900/30' :
              'bg-red-100 dark:bg-red-900/30'
            ]">
              <div class="flex items-center justify-center gap-2">
                <span v-if="regulationPercentage <= 3" class="text-3xl">✅</span>
                <span v-else-if="regulationPercentage <= 5" class="text-3xl">⚠️</span>
                <span v-else class="text-3xl">❌</span>
                <span :class="[
                  'text-lg font-bold',
                  regulationPercentage <= 3 ? 'text-green-800 dark:text-green-300' :
                  regulationPercentage <= 5 ? 'text-amber-800 dark:text-amber-300' :
                  'text-red-800 dark:text-red-300'
                ]">
                  {{ regulationStatus }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔌 Power Distribution Diagram
          </h3>

          <!-- SVG Circuit Diagram -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Source -->
              <g>
                <circle cx="100" cy="200" r="45" fill="white" stroke="#EF4444" stroke-width="3"/>
                <line x1="80" y1="185" x2="120" y2="185" stroke="#EF4444" stroke-width="4"/>
                <line x1="85" y1="200" x2="115" y2="200" stroke="#EF4444" stroke-width="2"/>
                <line x1="80" y1="215" x2="120" y2="215" stroke="#EF4444" stroke-width="4"/>
                <text x="100" y="260" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">
                  {{ sourceVoltage }}V
                </text>
                <text x="100" y="280" text-anchor="middle" font-size="10" fill="#EF4444">Source</text>
              </g>

              <!-- Transmission Line -->
              <g>
                <!-- Top wire -->
                <line x1="145" y1="180" x2="650" y2="180" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
                <!-- Bottom wire -->
                <line x1="650" y1="220" x2="145" y2="220" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>

                <!-- Wire resistance symbol (zigzag) -->
                <path d="M 350 180 L 350 165 L 360 170 L 340 180 L 360 190 L 340 200 L 350 205 L 350 220"
                  fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="350" y="150" text-anchor="middle" font-size="11" font-weight="bold" fill="#F59E0B">
                  R_wire = {{ wireResistance.toFixed(4) }}Ω
                </text>
              </g>

              <!-- Load -->
              <g>
                <rect x="650" y="160" width="80" height="80" fill="white" stroke="#3B82F6" stroke-width="3" rx="5"/>
                <text x="690" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">LOAD</text>
                <text x="690" y="215" text-anchor="middle" font-size="10" fill="#3B82F6">{{ current }}A</text>
              </g>

              <!-- Voltage annotations -->
              <g>
                <text x="200" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                  V_source = {{ sourceVoltage }}V
                </text>
                <text x="550" y="160" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">
                  V_drop = {{ voltageDrop.toFixed(2) }}V
                </text>
                <text x="690" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                  V_load = {{ voltageAtLoad.toFixed(2) }}V
                </text>
              </g>

              <!-- Current arrow -->
              <g>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#8B5CF6"/>
                  </marker>
                </defs>
                <line x1="250" y1="170" x2="320" y2="170" stroke="#8B5CF6" stroke-width="3" marker-end="url(#arrowhead)"/>
                <text x="285" y="160" text-anchor="middle" font-size="10" font-weight="bold" fill="#8B5CF6">
                  I = {{ current }}A
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- AWG Reference Table -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📋 AWG Wire Gauge Reference
          </h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b-2 border-gray-300 dark:border-gray-600">
                  <th class="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">AWG</th>
                  <th class="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Diameter (mm)</th>
                  <th class="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Area (mm²)</th>
                  <th class="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Resistance/1000ft</th>
                  <th class="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300">Max Current (A)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(gauge, index) in commonAwg" :key="index" 
                  class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  :class="{ 'bg-primary/10': awg === gauge.awg }">
                  <td class="py-3 px-4 font-mono">{{ gauge.awg }} AWG</td>
                  <td class="py-3 px-4">{{ gauge.diameter }}</td>
                  <td class="py-3 px-4">{{ gauge.area }}</td>
                  <td class="py-3 px-4">{{ gauge.resistance }}</td>
                  <td class="py-3 px-4 font-bold">{{ gauge.maxCurrent }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Voltage Sag
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Voltage Sag?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Voltage sag (or voltage drop) occurs when electrical current flows through a conductor with resistance,
              causing a reduction in voltage between the source and the load. This is an important consideration in
              power distribution systems to ensure equipment receives adequate voltage.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Concepts:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Ohm's Law:</strong> V_drop = I × R</li>
              <li><strong>Wire Resistance:</strong> R = ρ × L / A (resistivity × length / area)</li>
              <li><strong>Voltage Regulation:</strong> Typically should be < 3% for sensitive equipment</li>
              <li><strong>Power Loss:</strong> P_loss = I² × R (dissipated as heat in the wire)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Wire Material Resistivity (ρ):</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>Copper: 1.724 Ω·mm²/m (most common)</p>
              <p>Aluminum: 2.65 Ω·mm²/m (lighter, higher resistance)</p>
              <p>Silver: 1.59 Ω·mm²/m (best conductor, expensive)</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Acceptable Voltage Drop:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Branch circuits:</strong> ≤ 3% (NEC recommendation)</li>
              <li><strong>Feeders:</strong> ≤ 2% (NEC recommendation)</li>
              <li><strong>Total (feeder + branch):</strong> ≤ 5%</li>
              <li><strong>Sensitive electronics:</strong> ≤ 2-3%</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Mitigation Strategies:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use larger wire gauge (lower AWG number = thicker wire)</li>
              <li>Shorten wire length where possible</li>
              <li>Use materials with lower resistivity (copper vs aluminum)</li>
              <li>Use higher supply voltage to compensate for drop</li>
              <li>Implement voltage regulation equipment</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Home electrical wiring design</li>
              <li>Industrial power distribution</li>
              <li>Automotive electrical systems</li>
              <li>Solar panel wiring</li>
              <li>Battery charging systems</li>
            </ul>
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

// Input parameters
const sourceVoltage = ref(120)
const current = ref(10)
const material = ref('copper')
const length = ref(50)
const awg = ref(10)
const powerFactor = ref(0.85)

// Material resistivity (Ω·mm²/m)
const resistivity = {
  copper: 1.724,
  aluminum: 2.65,
  gold: 2.44,
  silver: 1.59
}

// AWG wire specifications
const awgTable = {
  0: { diameter: 8.252, area: 53.5, resistance: 0.098, maxCurrent: 150 },
  1: { diameter: 7.348, area: 42.4, resistance: 0.124, maxCurrent: 130 },
  2: { diameter: 6.544, area: 33.6, resistance: 0.156, maxCurrent: 115 },
  3: { diameter: 5.827, area: 26.7, resistance: 0.197, maxCurrent: 100 },
  4: { diameter: 5.189, area: 21.2, resistance: 0.248, maxCurrent: 85 },
  5: { diameter: 4.621, area: 16.8, resistance: 0.313, maxCurrent: 75 },
  6: { diameter: 4.115, area: 13.3, resistance: 0.395, maxCurrent: 65 },
  7: { diameter: 3.665, area: 10.5, resistance: 0.498, maxCurrent: 55 },
  8: { diameter: 3.264, area: 8.37, resistance: 0.628, maxCurrent: 45 },
  9: { diameter: 2.906, area: 6.63, resistance: 0.792, maxCurrent: 40 },
  10: { diameter: 2.588, area: 5.26, resistance: 0.999, maxCurrent: 30 },
  11: { diameter: 2.305, area: 4.17, resistance: 1.26, maxCurrent: 25 },
  12: { diameter: 2.053, area: 3.31, resistance: 1.59, maxCurrent: 20 },
  13: { diameter: 1.828, area: 2.62, resistance: 2.00, maxCurrent: 15 },
  14: { diameter: 1.628, area: 2.08, resistance: 2.52, maxCurrent: 15 },
  15: { diameter: 1.450, area: 1.65, resistance: 3.18, maxCurrent: 10 },
  16: { diameter: 1.291, area: 1.31, resistance: 4.02, maxCurrent: 10 },
  17: { diameter: 1.150, area: 1.04, resistance: 5.06, maxCurrent: 7 },
  18: { diameter: 1.024, area: 0.823, resistance: 6.39, maxCurrent: 7 },
  19: { diameter: 0.912, area: 0.653, resistance: 8.05, maxCurrent: 5 },
  20: { diameter: 0.812, area: 0.518, resistance: 10.2, maxCurrent: 5 }
}

// Common AWG for reference table
const commonAwg = [
  { awg: 0, diameter: '8.25', area: '53.5', resistance: '0.098', maxCurrent: '150' },
  { awg: 2, diameter: '6.54', area: '33.6', resistance: '0.156', maxCurrent: '115' },
  { awg: 4, diameter: '5.19', area: '21.2', resistance: '0.248', maxCurrent: '85' },
  { awg: 6, diameter: '4.12', area: '13.3', resistance: '0.395', maxCurrent: '65' },
  { awg: 8, diameter: '3.26', area: '8.37', resistance: '0.628', maxCurrent: '45' },
  { awg: 10, diameter: '2.59', area: '5.26', resistance: '0.999', maxCurrent: '30' },
  { awg: 12, diameter: '2.05', area: '3.31', resistance: '1.59', maxCurrent: '20' },
  { awg: 14, diameter: '1.63', area: '2.08', resistance: '2.52', maxCurrent: '15' },
  { awg: 16, diameter: '1.29', area: '1.31', resistance: '4.02', maxCurrent: '10' }
]

// Computed properties
const wireArea = computed(() => {
  return awgTable[awg.value]?.area || 5.26
})

const wireDiameter = computed(() => {
  return awgTable[awg.value]?.diameter || 2.588
})

const wireResistance = computed(() => {
  const rho = resistivity[material.value]
  const area = wireArea.value
  // R = ρ × L / A (for one way, double for round trip)
  return (2 * rho * length.value) / area
})

const voltageDrop = computed(() => {
  return current.value * wireResistance.value
})

const voltageAtLoad = computed(() => {
  return sourceVoltage.value - voltageDrop.value
})

const powerLoss = computed(() => {
  return current.value * current.value * wireResistance.value
})

const regulationPercentage = computed(() => {
  if (sourceVoltage.value === 0) return 0
  return (voltageDrop.value / sourceVoltage.value) * 100
})

const regulationStatus = computed(() => {
  const reg = regulationPercentage.value
  if (reg <= 3) return 'Excellent Regulation (< 3%)'
  if (reg <= 5) return 'Acceptable Regulation (< 5%)'
  return 'Poor Regulation (> 5%) - Consider larger wire!'
})

// Color mode
const colorMode = useColorMode()
</script>

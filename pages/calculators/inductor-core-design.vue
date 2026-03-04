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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductor Core Design Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design custom inductors with ferrite cores - calculate turns, wire gauge, and core selection
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">L</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">AL</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">N²</span>
              <span class="text-gray-400">/</span>
              <span class="text-gray-400">1000</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Inductance (nH) = AL Value × Turns² / 1000
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Input Panel -->
          <div class="space-y-6">
            <!-- Design Requirements -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Design Requirements</h3>

              <div class="space-y-6">
                <!-- Target Inductance -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Target Inductance (L): {{ targetInductance }} µH
                  </label>
                  <input
                    v-model.number="targetInductance"
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    v-model.number="targetInductance"
                    type="number"
                    min="1"
                    max="1000"
                    class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <!-- Maximum Current -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Current (I_max): {{ maxCurrent }} A
                  </label>
                  <input
                    v-model.number="maxCurrent"
                    type="range"
                    min="0.1"
                    max="20"
                    step="0.1"
                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    v-model.number="maxCurrent"
                    type="number"
                    min="0.1"
                    max="20"
                    step="0.1"
                    class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <!-- Operating Frequency -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Operating Frequency: {{ frequency }} kHz
                  </label>
                  <input
                    v-model.number="frequency"
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    v-model.number="frequency"
                    type="number"
                    min="1"
                    max="1000"
                    class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <!-- Core Material -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Core Material
                  </label>
                  <select
                    v-model="coreMaterial"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="ferrite-3c90">Ferrite 3C90 (General Purpose)</option>
                    <option value="ferrite-n87">Ferrite N87 (High Frequency)</option>
                    <option value="ferrite-77">Ferrite 77 (Low Loss)</option>
                    <option value="powder-iron">Powder Iron (High Saturation)</option>
                    <option value="molybdenum">Molybdenum Permalloy</option>
                  </select>
                </div>

                <!-- Core Shape -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Core Shape
                  </label>
                  <select
                    v-model="coreShape"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="toroid">Toroid</option>
                    <option value="e-core">E-Core</option>
                    <option value="pot-core">Pot Core</option>
                    <option value="rod">Rod</option>
                  </select>
                </div>

                <!-- Winding Method -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Winding Method
                  </label>
                  <select
                    v-model="windingMethod"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="single">Single Layer</option>
                    <option value="multi">Multi Layer</option>
                    <option value="bifilar">Bifilar</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Core Selection -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Selection</h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Standard Core Size
                  </label>
                  <select
                    v-model="coreSize"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="tn10">TN10 (Miniature)</option>
                    <option value="tn13">TN13 (Small)</option>
                    <option value="tn16">TN16 (Standard)</option>
                    <option value="tn20">TN20 (Medium)</option>
                    <option value="tn26">TN26 (Large)</option>
                    <option value="tn36">TN36 (Extra Large)</option>
                    <option value="tn50">TN50 (Power)</option>
                  </select>
                </div>

                <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-2">Selected Core Specs</h4>
                  <div class="space-y-1 text-sm">
                    <p class="text-blue-800 dark:text-blue-200">
                      AL Value: <strong>{{ selectedCoreData.al }} nH/turn²</strong>
                    </p>
                    <p class="text-blue-800 dark:text-blue-200">
                      Outer Diameter: <strong>{{ selectedCoreData.od }} mm</strong>
                    </p>
                    <p class="text-blue-800 dark:text-blue-200">
                      Inner Diameter: <strong>{{ selectedCoreData.id }} mm</strong>
                    </p>
                    <p class="text-blue-800 dark:text-blue-200">
                      Height: <strong>{{ selectedCoreData.height }} mm</strong>
                    </p>
                    <p class="text-blue-800 dark:text-blue-200">
                      Saturation Flux: <strong>{{ selectedCoreData.bsat }} mT</strong>
                  </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="applyPreset('buck')"
                  class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
                >
                  Buck Converter
                </button>
                <button
                  @click="applyPreset('boost')"
                  class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
                >
                  Boost Converter
                </button>
                <button
                  @click="applyPreset('filter')"
                  class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
                >
                  EMI Filter
                </button>
                <button
                  @click="applyPreset('rf')"
                  class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm"
                >
                  RF Choke
                </button>
              </div>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="space-y-6">
            <!-- Calculated Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Design</h3>

              <div class="space-y-4">
                <!-- Number of Turns -->
                <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                  <p class="text-sm text-green-700 dark:text-green-300 font-semibold mb-1">Number of Turns (N)</p>
                  <p class="text-3xl font-bold text-green-900 dark:text-green-100">{{ calculatedTurns }} turns</p>
                  <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                    Adjust to nearest integer: {{ Math.round(calculatedTurns) }} turns
                  </p>
                </div>

                <!-- Actual Inductance -->
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                  <p class="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-1">Actual Inductance</p>
                  <p class="text-3xl font-bold text-blue-900 dark:text-blue-100">{{ actualInductance }} µH</p>
                  <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Using {{ Math.round(calculatedTurns) }} turns
                  </p>
                </div>

                <!-- Wire Gauge -->
                <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                  <p class="text-sm text-purple-700 dark:text-purple-300 font-semibold mb-1">Recommended Wire Gauge</p>
                  <p class="text-3xl font-bold text-purple-900 dark:text-purple-100">AWG {{ recommendedWireGauge }}</p>
                  <p class="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    Diameter: {{ wireDiameter }} mm | Current capacity: {{ wireCurrentCapacity }} A
                  </p>
                </div>

                <!-- Wire Length -->
                <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg p-4">
                  <p class="text-sm text-yellow-700 dark:text-yellow-300 font-semibold mb-1">Total Wire Length</p>
                  <p class="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{{ wireLength }} m</p>
                  <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    Approximate length including leads
                  </p>
                </div>

                <!-- DC Resistance -->
                <div class="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-4">
                  <p class="text-sm text-red-700 dark:text-red-300 font-semibold mb-1">Estimated DC Resistance</p>
                  <p class="text-3xl font-bold text-red-900 dark:text-red-100">{{ dcResistance }} mΩ</p>
                  <p class="text-xs text-red-600 dark:text-red-400 mt-1">
                    Power loss at full load: {{ powerLoss }} W
                  </p>
                </div>

                <!-- Core Saturation Check -->
                <div class="rounded-lg p-4" :class="saturationClass">
                  <p class="text-sm font-semibold mb-1">Core Saturation Check</p>
                  <p class="text-2xl font-bold">{{ saturationStatus }}</p>
                  <p class="text-xs mt-1">
                    Peak flux density: {{ peakFluxDensity }} mT (Limit: {{ selectedCoreData.bsat }} mT)
                  </p>
                </div>

                <!-- Core Loss -->
                <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 rounded-lg p-4">
                  <p class="text-sm text-indigo-700 dark:text-indigo-300 font-semibold mb-1">Estimated Core Loss</p>
                  <p class="text-3xl font-bold text-indigo-900 dark:text-indigo-100">{{ coreLoss }} W</p>
                  <p class="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                    At {{ frequency }} kHz, {{ maxCurrent }} A
                  </p>
                </div>
              </div>
            </div>

            <!-- Core Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Visualization</h3>
              <svg viewBox="0 0 400 400" class="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Toroid Core -->
                <g transform="translate(200, 200)">
                  <!-- Outer ring -->
                  <circle cx="0" cy="0" :r="selectedCoreData.od * 3" fill="none" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
                  <text :x="selectedCoreData.od * 3" y="-10" font-size="10" fill="#6B7280">OD</text>

                  <!-- Core body -->
                  <circle cx="0" cy="0" :r="selectedCoreData.od * 2.5" fill="none" stroke="#3B82F6" stroke-width="30"/>
                  <circle cx="0" cy="0" :r="selectedCoreData.od * 2.5" fill="none" stroke="#1E40AF" stroke-width="26"/>

                  <!-- Inner hole -->
                  <circle cx="0" cy="0" :r="selectedCoreData.id * 2.5" fill="#F3F4F6" stroke="#6B7280" stroke-width="2"/>
                  <text :x="selectedCoreData.id * 2.5 + 5" y="0" font-size="10" fill="#6B7280">ID</text>

                  <!-- Windings -->
                  <g v-for="i in Math.min(Math.round(calculatedTurns), 20)" :key="i">
                    <circle
                      cx="0"
                      cy="0"
                      :r="selectedCoreData.id * 2.5 + (i * 2)"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="1.5"
                      :opacity="0.3 + (i / 20) * 0.7"
                    />
                  </g>

                  <!-- Center label -->
                  <text x="0" y="5" text-anchor="middle" font-size="14" font-weight="bold" fill="#1F2937">
                    {{ Math.round(calculatedTurns) }}t
                  </text>

                  <!-- Dimensions -->
                  <g transform="translate(80, 80)">
                    <line x1="-30" y1="0" x2="30" y2="0" stroke="#EF4444" stroke-width="2"/>
                    <line x1="-30" y1="-5" x2="-30" y2="5" stroke="#EF4444" stroke-width="2"/>
                    <line x1="30" y1="-5" x2="30" y2="5" stroke="#EF4444" stroke-width="2"/>
                    <text x="0" y="-10" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">
                      {{ selectedCoreData.height }} mm
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Inductor Core Design Guide</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Understanding AL Value</h4>
              <p class="mb-2">
                The <strong>AL value</strong> (inductance factor) specifies how many nanohenries of inductance you get per turn².
                It's determined by core material, geometry, and air gap.
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li>Higher AL = Fewer turns needed</li>
                <li>Typical range: 10-5000 nH/turn²</li>
                <li>Provided by core manufacturer datasheet</li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Core Materials</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li><strong>Ferrite 3C90:</strong> General purpose, 50-500 kHz</li>
                <li><strong>Ferrite N87:</strong> High frequency, low loss</li>
                <li><strong>Powder Iron:</strong> High saturation, DC bias</li>
                <li><strong>Molybdenum:</strong> High stability, expensive</li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Key Formulas</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                <p>L = (AL × N²) / 1000</p>
                <p>N = √(L × 1000 / AL)</p>
                <p>B_max = (L × I_max) / (N × A_e)</p>
                <p>R_dc = (ρ × l) / A_wire</p>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Design Tips</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Keep flux density below 80% of B_sat</li>
                <li>Use litz wire for high frequency (>100 kHz)</li>
                <li>Consider skin effect at high frequencies</li>
                <li>Leave margin for tolerance (±20%)</li>
                <li>Account for temperature derating</li>
                <li>Test actual inductance with LCR meter</li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Common Applications</h4>
              <ul class="list-disc pl-6 space-y-1">
                <li>Switching power supplies (Buck/Boost)</li>
                <li>EMI/RFI filters</li>
                <li>RF chokes and matching networks</li>
                <li>Energy storage in flyback converters</li>
                <li>Resonant tanks (LC circuits)</li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Wire Gauge Selection</h4>
              <p class="mb-2">
                Choose wire gauge based on current capacity and skin depth:
              </p>
              <ul class="list-disc pl-6 space-y-1">
                <li><1A: AWG 24-28</li>
                <li>1-3A: AWG 20-24</li>
                <li>3-5A: AWG 18-20</li>
                <li>5-10A: AWG 14-18</li>
                <li>>10A: AWG 10-14 or multiple strands</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Input parameters
const targetInductance = ref(100)
const maxCurrent = ref(2)
const frequency = ref(100)
const coreMaterial = ref('ferrite-n87')
const coreShape = ref('toroid')
const windingMethod = ref('single')
const coreSize = ref('tn16')

// Core data database
const coreDatabase = {
  'tn10': { al: 50, od: 10.5, id: 5.2, height: 4.5, bsat: 390, ae: 7.5 },
  'tn13': { al: 80, od: 13.3, id: 6.7, height: 5.7, bsat: 390, ae: 12.5 },
  'tn16': { al: 120, od: 16.3, id: 8.3, height: 6.9, bsat: 390, ae: 19.0 },
  'tn20': { al: 180, od: 20.2, id: 10.2, height: 8.4, bsat: 390, ae: 31.0 },
  'tn26': { al: 250, od: 26.2, id: 14.3, height: 10.7, bsat: 390, ae: 48.0 },
  'tn36': { al: 350, od: 36.5, id: 19.9, height: 14.3, bsat: 390, ae: 85.0 },
  'tn50': { al: 450, od: 50.0, id: 28.5, height: 19.5, bsat: 390, ae: 145.0 }
}

const materialProperties = {
  'ferrite-3c90': { permeability: 2300, lossFactor: 1.0 },
  'ferrite-n87': { permeability: 2200, lossFactor: 0.8 },
  'ferrite-77': { permeability: 2000, lossFactor: 0.6 },
  'powder-iron': { permeability: 75, lossFactor: 1.5 },
  'molybdenum': { permeability: 125, lossFactor: 0.4 }
}

// Wire gauge data (AWG)
const wireData = [
  { awg: 28, diameter: 0.32, current: 0.5, resistance: 0.214 },
  { awg: 26, diameter: 0.40, current: 0.7, resistance: 0.136 },
  { awg: 24, diameter: 0.51, current: 1.0, resistance: 0.085 },
  { awg: 22, diameter: 0.64, current: 1.5, resistance: 0.054 },
  { awg: 20, diameter: 0.81, current: 2.0, resistance: 0.034 },
  { awg: 18, diameter: 1.02, current: 3.0, resistance: 0.021 },
  { awg: 16, diameter: 1.29, current: 5.0, resistance: 0.013 },
  { awg: 14, diameter: 1.63, current: 7.0, resistance: 0.0083 },
  { awg: 12, diameter: 2.05, current: 10.0, resistance: 0.0052 },
  { awg: 10, diameter: 2.59, current: 15.0, resistance: 0.0033 }
]

// Computed values
const selectedCoreData = computed(() => coreDatabase[coreSize.value])

const calculatedTurns = computed(() => {
  const al = selectedCoreData.value.al
  const L = targetInductance.value // µH
  return Math.sqrt((L * 1000) / al)
})

const actualInductance = computed(() => {
  const turns = Math.round(calculatedTurns.value)
  const al = selectedCoreData.value.al
  return (al * turns * turns) / 1000
})

const recommendedWireGauge = computed(() => {
  const current = maxCurrent.value
  for (let i = wireData.length - 1; i >= 0; i--) {
    if (current <= wireData[i].current * 1.5) {
      return wireData[i].awg
    }
  }
  return 10
})

const wireDiameter = computed(() => {
  const wire = wireData.find(w => w.awg === recommendedWireGauge.value)
  return wire ? wire.diameter : 2.59
})

const wireCurrentCapacity = computed(() => {
  const wire = wireData.find(w => w.awg === recommendedWireGauge.value)
  return wire ? wire.current : 15.0
})

const wireLength = computed(() => {
  const turns = Math.round(calculatedTurns.value)
  const core = selectedCoreData.value
  const meanDiameter = (core.od + core.id) / 2
  const turnLength = Math.PI * (meanDiameter / 1000) // meters
  return (turnLength * turns * 1.1).toFixed(2) // 10% extra for leads
})

const dcResistance = computed(() => {
  const turns = Math.round(calculatedTurns.value)
  const core = selectedCoreData.value
  const wire = wireData.find(w => w.awg === recommendedWireGauge.value)
  if (!wire) return 0

  const meanDiameter = (core.od + core.id) / 2
  const turnLength = Math.PI * (meanDiameter / 1000) // meters
  const totalLength = turnLength * turns
  const resistance = totalLength * wire.resistance

  return (resistance * 1000).toFixed(1) // mΩ
})

const powerLoss = computed(() => {
  const r = parseFloat(dcResistance.value) / 1000 // convert to ohms
  const i = maxCurrent.value
  return (i * i * r).toFixed(3)
})

const peakFluxDensity = computed(() => {
  const turns = Math.round(calculatedTurns.value)
  const L = actualInductance.value * 1e-6 // H
  const I = maxCurrent.value
  const Ae = selectedCoreData.value.ae * 1e-6 // m²
  const B = (L * I) / (turns * Ae)
  return (B * 1000).toFixed(0) // mT
})

const saturationStatus = computed(() => {
  const bPeak = parseFloat(peakFluxDensity.value)
  const bSat = selectedCoreData.value.bsat
  const margin = (bSat - bPeak) / bSat * 100

  if (margin < 0) return 'SATURATED!'
  if (margin < 20) return 'WARNING'
  return 'OK'
})

const saturationClass = computed(() => {
  const status = saturationStatus.value
  if (status === 'SATURATED!') return 'bg-red-100 dark:bg-red-900'
  if (status === 'WARNING') return 'bg-yellow-100 dark:bg-yellow-900'
  return 'bg-green-100 dark:bg-green-900'
})

const coreLoss = computed(() => {
  const material = materialProperties[coreMaterial.value]
  const f = frequency.value / 1000 // MHz for calculation
  const bPeak = parseFloat(peakFluxDensity.value) / 1000 // T
  const vol = Math.PI * (Math.pow(selectedCoreData.value.od/2, 2) - Math.pow(selectedCoreData.value.id/2, 2)) * selectedCoreData.value.height
  const volCm3 = vol / 1000

  // Steinmetz equation (simplified)
  const pv = material.lossFactor * Math.pow(f, 1.5) * Math.pow(bPeak, 2.5) // mW/cm³
  const totalLoss = pv * volCm3 / 1000 // W

  return totalLoss.toFixed(3)
})

// Presets
const applyPreset = (preset) => {
  switch (preset) {
    case 'buck':
      targetInductance.value = 47
      maxCurrent.value = 3
      frequency.value = 150
      coreSize.value = 'tn20'
      break
    case 'boost':
      targetInductance.value = 100
      maxCurrent.value = 2
      frequency.value = 100
      coreSize.value = 'tn16'
      break
    case 'filter':
      targetInductance.value = 220
      maxCurrent.value = 1
      frequency.value = 50
      coreSize.value = 'tn26'
      break
    case 'rf':
      targetInductance.value = 10
      maxCurrent.value = 0.5
      frequency.value = 500
      coreSize.value = 'tn13'
      break
  }
}
</script>

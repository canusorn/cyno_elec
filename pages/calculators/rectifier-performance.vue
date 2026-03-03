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
            Rectifier Performance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Analyze rectifier circuits with precision - calculate DC voltage, ripple factor, and efficiency
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">DC Output Voltage:</div>
            <div class="flex items-center gap-3 text-xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">V_dc</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">V_m</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">π</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">N</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">V_m = Peak Voltage, N = 1 (Half-wave) or 2 (Full-wave)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Waveform Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📈 Input vs Output Waveforms
          </h3>

          <!-- SVG Waveform Diagram -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid lines -->
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#grid)" />

              <!-- Input AC Waveform (Red) -->
              <text x="50" y="30" font-size="14" font-weight="bold" fill="#EF4444">Input AC (Sine Wave)</text>
              <path :d="generateSineWave(50, 200, 700, 80)" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>

              <!-- Output DC Waveform (Blue) -->
              <text x="50" y="240" font-size="14" font-weight="bold" fill="#3B82F6">Output DC ({{ rectifierType }})</text>
              <path :d="generateRectifiedWaveform(50, 200, 700, 80)" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round"/>

              <!-- Zero line -->
              <line x1="50" y1="200" x2="750" y2="200" stroke="#6B7280" stroke-width="1" stroke-dasharray="5,5"/>

              <!-- Peak voltage marker -->
              <line x1="50" y1="120" x2="750" y2="120" stroke="#10B981" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="760" y="125" font-size="11" fill="#10B981">V_m = {{ vm.toFixed(1) }}V</text>

              <!-- DC voltage marker -->
              <line x1="50" :y1="200 - vdc * 0.8" x2="750" :y2="200 - vdc * 0.8" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,5"/>
              <text x="760" :y="205 - vdc * 0.8" font-size="11" fill="#F59E0B">V_dc = {{ vdc.toFixed(1) }}V</text>

              <!-- Ripple indicator (if capacitor is used) -->
              <g v-if="capacitorFilter > 0">
                <line x1="50" :y1="200 - vdc * 0.8 - rippleVoltage * 0.4" x2="750" :y2="200 - vdc * 0.8 - rippleVoltage * 0.4" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="50" :y1="200 - vdc * 0.8 + rippleVoltage * 0.4" x2="750" :y2="200 - vdc * 0.8 + rippleVoltage * 0.4" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="3,3"/>
                <text x="760" :y="195 - vdc * 0.8" font-size="10" fill="#8B5CF6">Ripple: ±{{ rippleVoltage.toFixed(2) }}V</text>
              </g>

              <!-- Labels -->
              <text x="400" y="380" text-anchor="middle" font-size="12" fill="#6B7280">Time →</text>
              <text x="20" y="200" text-anchor="middle" font-size="12" fill="#6B7280" transform="rotate(-90, 20, 200)">Voltage →</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Controls -->
    <section class="pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎛️ Calculator Controls
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Rectifier Type -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔌 Rectifier Type
              </label>
              <select
                v-model="rectifierType"
                class="w-full px-4 py-3 text-lg bg-gray-50 dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white"
              >
                <option value="half-wave">Half-Wave Rectifier</option>
                <option value="full-wave-center-tap">Full-Wave Center-Tap</option>
                <option value="full-wave-bridge">Full-Wave Bridge</option>
              </select>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ getRectifierDescription(rectifierType) }}
              </p>
            </div>

            <!-- Peak Voltage -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                📊 Peak Voltage (V_m)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="peakVoltage"
                  min="1"
                  max="1000"
                  step="0.1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">V</span>
              </div>
              <input
                type="range"
                v-model.number="peakVoltage"
                min="5"
                max="200"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <p class="text-sm text-gray-600 dark:text-gray-400">
                RMS: {{ vrms.toFixed(2) }}V | Input AC: {{ vrms.toFixed(2) }}V
              </p>
            </div>

            <!-- Diode Forward Voltage -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔴 Diode Forward Voltage (V_f)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="diodeDrop"
                  min="0"
                  max="2"
                  step="0.1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-red-300 dark:border-red-700 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">V</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Silicon: ~0.7V | Schottky: ~0.3V | Germanium: ~0.3V
              </p>
            </div>

            <!-- Load Resistance -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                ⚡ Load Resistance (R_L)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="loadResistance"
                  min="1"
                  max="100000"
                  step="1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">Ω</span>
              </div>
              <input
                type="range"
                v-model.number="loadResistance"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <!-- Filter Capacitor -->
            <div class="space-y-4 md:col-span-2">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔋 Filter Capacitor (C) - Optional
              </label>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <input
                    type="number"
                    v-model.number="capacitorFilter"
                    min="0"
                    max="100000"
                    step="1"
                    class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-700 rounded-lg focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-white"
                  >
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">µF</span>
                </div>
                <div class="relative">
                  <input
                    type="number"
                    v-model.number="frequency"
                    min="10"
                    max="1000"
                    step="1"
                    class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-purple-300 dark:border-purple-700 rounded-lg focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-white"
                  >
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">Hz</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Set to 0 for no capacitor filter. Typical values: 100µF - 10000µF
              </p>
            </div>
          </div>

          <!-- Results Display -->
          <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Calculation Results</h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">DC Output (V_dc)</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ vdc.toFixed(2) }}V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">RMS Output (V_rms)</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ voutRms.toFixed(2) }}V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Ripple Factor (γ)</div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ rippleFactor.toFixed(4) }}</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Form Factor (FF)</div>
                <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ formFactor.toFixed(3) }}</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Efficiency (η)</div>
                <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ efficiency.toFixed(1) }}%</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">DC Current (I_dc)</div>
                <div class="text-2xl font-bold text-teal-600 dark:text-teal-400">{{ idc.toFixed(3) }}A</div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak Inverse Voltage (PIV):</div>
                <div class="font-mono text-lg text-gray-900 dark:text-gray-200">
                  {{ piv.toFixed(1) }}V
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Power (P_dc):</div>
                <div class="font-mono text-lg text-gray-900 dark:text-gray-200">
                  {{ pdc.toFixed(3) }}W
                </div>
              </div>
            </div>

            <!-- Ripple Voltage (if capacitor is used) -->
            <div v-if="capacitorFilter > 0" class="mt-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4">
              <div class="text-sm text-purple-700 dark:text-purple-400 mb-1">Ripple Voltage (with {{ capacitorFilter }}µF capacitor):</div>
              <div class="font-mono text-lg text-purple-900 dark:text-purple-200">
                {{ rippleVoltage.toFixed(3) }}V (peak-to-peak)
              </div>
              <div class="text-sm text-purple-700 dark:text-purple-400 mt-1">
                Ripple period: {{ (1000 / frequency).toFixed(2) }}ms
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
            📚 Understanding Rectifier Performance
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Rectifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A rectifier is an electrical device that converts alternating current (AC) to direct current (DC). This process is called rectification.
              Rectifiers are essential components in power supplies for electronic devices, battery charging systems, and DC motor drives.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Types of Rectifiers:</h3>
            <div class="space-y-4 mb-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">🔴 Half-Wave Rectifier</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Uses only one diode</li>
                  <li>• Conducts during positive half-cycle only</li>
                  <li>• Efficiency: ~40.6%</li>
                  <li>• Simple but inefficient</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">🟢 Full-Wave Center-Tap</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Uses two diodes and center-tapped transformer</li>
                  <li>• Conducts during both half-cycles</li>
                  <li>• Efficiency: ~81.2%</li>
                  <li>• Better utilization of transformer</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">🟣 Full-Wave Bridge</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• Uses four diodes in bridge configuration</li>
                  <li>• No center-tap needed</li>
                  <li>• Efficiency: ~81.2%</li>
                  <li>• Most popular for power supplies</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Half-Wave:</strong> V_dc = (V_m - V_f) / π</div>
              <div><strong>Full-Wave:</strong> V_dc = 2(V_m - V_f) / π</div>
              <div><strong>Ripple Factor (no filter):</strong> γ = 1.21 (half-wave), 0.48 (full-wave)</div>
              <div><strong>Form Factor:</strong> FF = V_rms / V_avg</div>
              <div><strong>Efficiency:</strong> η = (P_dc / P_ac) × 100%</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Filter Capacitors:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A filter capacitor smooths the rectified output by storing charge during conduction periods and releasing it during non-conduction periods.
              This significantly reduces ripple voltage.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div>Ripple Voltage ≈ I_dc / (2 × f × C)  [full-wave]</div>
              <div>Ripple Voltage ≈ I_dc / (f × C)  [half-wave]</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Performance Parameters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Ripple Factor (γ):</strong> Ratio of RMS AC component to DC component (lower is better)</li>
              <li><strong>Form Factor (FF):</strong> Ratio of RMS value to average value</li>
              <li><strong>Efficiency (η):</strong> Ratio of DC output power to AC input power</li>
              <li><strong>PIV:</strong> Peak Inverse Voltage - maximum reverse voltage across diode</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">⚠️ Design Considerations:</h3>
            <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
              <ul class="text-sm text-red-700 dark:text-red-400 space-y-2">
                <li>• Choose diodes with PIV rating higher than calculated PIV</li>
                <li>• Consider diode forward voltage drop for low-voltage applications</li>
                <li>• Full-wave rectifiers require larger filter capacitors than half-wave</li>
                <li>• Bridge rectifiers have two diodes in series (2V_f drop)</li>
                <li>• Heat dissipation in diodes: P = I_avg × V_f</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Designing a 12V DC power supply:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Target: 12V DC output at 1A</li>
              <li>Full-wave bridge rectifier with 1000µF capacitor</li>
              <li>Required transformer: 12V RMS (≈17V peak)</li>
              <li>V_dc (no load): 2(17 - 1.4) / π ≈ 9.9V per diode drop</li>
              <li>Consider voltage regulator for stable output</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const rectifierType = ref('full-wave-bridge')
const peakVoltage = ref(169.7) // 120V RMS × √2
const diodeDrop = ref(0.7)
const loadResistance = ref(100)
const capacitorFilter = ref(0)
const frequency = ref(60)

// Helper to get rectifier description
const getRectifierDescription = (type: string) => {
  const descriptions = {
    'half-wave': 'Single diode, conducts on positive half-cycle only',
    'full-wave-center-tap': 'Two diodes with center-tapped transformer',
    'full-wave-bridge': 'Four diodes in bridge configuration (most common)'
  }
  return descriptions[type] || ''
}

// Computed properties
const vm = computed(() => {
  return peakVoltage.value
})

const vrms = computed(() => {
  return vm.value / Math.sqrt(2)
})

// Calculate number of diode drops based on rectifier type
const diodeDrops = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return 1
    case 'full-wave-center-tap':
      return 1
    case 'full-wave-bridge':
      return 2
    default:
      return 1
  }
})

// DC Output Voltage
const vdc = computed(() => {
  const effectiveVm = vm.value - (diodeDrop.value * diodeDrops.value)
  switch (rectifierType.value) {
    case 'half-wave':
      return effectiveVm / Math.PI
    case 'full-wave-center-tap':
    case 'full-wave-bridge':
      return (2 * effectiveVm) / Math.PI
    default:
      return 0
  }
})

// RMS Output Voltage (without filter)
const voutRms = computed(() => {
  const effectiveVm = vm.value - (diodeDrop.value * diodeDrops.value)
  switch (rectifierType.value) {
    case 'half-wave':
      return effectiveVm / 2
    case 'full-wave-center-tap':
    case 'full-wave-bridge':
      return effectiveVm / Math.sqrt(2)
    default:
      return 0
  }
})

// DC Current
const idc = computed(() => {
  return vdc.value / loadResistance.value
})

// Ripple Factor (without filter)
const rippleFactor = computed(() => {
  if (capacitorFilter.value > 0) {
    // With filter: ripple factor is much lower
    return rippleVoltage.value / vdc.value
  }
  switch (rectifierType.value) {
    case 'half-wave':
      return 1.21
    case 'full-wave-center-tap':
    case 'full-wave-bridge':
      return 0.48
    default:
      return 0
  }
})

// Form Factor
const formFactor = computed(() => {
  return voutRms.value / vdc.value
})

// Efficiency
const efficiency = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return 40.6
    case 'full-wave-center-tap':
    case 'full-wave-bridge':
      return 81.2
    default:
      return 0
  }
})

// Peak Inverse Voltage
const piv = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return vm.value
    case 'full-wave-center-tap':
      return 2 * vm.value
    case 'full-wave-bridge':
      return vm.value
    default:
      return 0
  }
})

// DC Output Power
const pdc = computed(() => {
  return vdc.value * idc.value
})

// Ripple Voltage (with capacitor filter)
const rippleVoltage = computed(() => {
  if (capacitorFilter.value <= 0) return 0
  
  const C = capacitorFilter.value * 1e-6 // Convert µF to F
  const I = idc.value
  const f = frequency.value
  
  switch (rectifierType.value) {
    case 'half-wave':
      return I / (f * C)
    case 'full-wave-center-tap':
    case 'full-wave-bridge':
      return I / (2 * f * C)
    default:
      return 0
  }
})

// SVG Waveform Generation
const generateSineWave = (startX: number, centerY: number, width: number, amplitude: number) => {
  const points = []
  const numPoints = 200
  
  for (let i = 0; i <= numPoints; i++) {
    const x = startX + (i / numPoints) * width
    const angle = (i / numPoints) * 4 * Math.PI // 2 full cycles
    const y = centerY - amplitude * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}

const generateRectifiedWaveform = (startX: number, centerY: number, width: number, amplitude: number) => {
  const points = []
  const numPoints = 200
  
  for (let i = 0; i <= numPoints; i++) {
    const x = startX + (i / numPoints) * width
    const angle = (i / numPoints) * 4 * Math.PI // 2 full cycles
    let y = centerY
    
    switch (rectifierType.value) {
      case 'half-wave':
        y = Math.sin(angle) > 0 ? centerY - amplitude * Math.sin(angle) : centerY
        break
      case 'full-wave-center-tap':
      case 'full-wave-bridge':
        y = centerY - amplitude * Math.abs(Math.sin(angle))
        break
    }
    
    // Apply capacitor smoothing (simplified visualization)
    if (capacitorFilter.value > 0 && rectifierType.value !== 'half-wave') {
      const smoothing = Math.min(capacitorFilter.value / 1000, 0.8)
      y = centerY - (centerY - y) * (1 - smoothing) - (amplitude * 0.6)
    }
    
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}

// SEO
useHead({
  title: 'Rectifier Performance Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate rectifier performance metrics including DC voltage, ripple factor, and efficiency. Analyze half-wave and full-wave rectifier circuits with filter capacitors.' },
    { name: 'keywords', content: 'rectifier calculator, DC voltage, ripple factor, power supply design, half-wave rectifier, full-wave bridge' }
  ]
})
</script>

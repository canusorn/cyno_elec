<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Input values
const vin = ref(12)
const vz = ref(5.1)
const rs = ref(220)
const rl = ref(1000)

// Computed values
const iz = computed(() => {
  const iTotal = (vin.value - vz.value) / rs.value
  const iLoad = vz.value / rl.value
  return Math.max(0, iTotal - iLoad)
})

const il = computed(() => vz.value / rl.value)

const isTotal = computed(() => (vin.value - vz.value) / rs.value)

const vout = computed(() => {
  if (iz.value <= 0) {
    // Zener not regulating - voltage divider
    return vin.value * rl.value / (rs.value + rl.value)
  }
  return vz.value
})

const inRegulation = computed(() => iz.value > 0)

const pz = computed(() => iz.value * vz.value)

const prs = computed(() => Math.pow(isTotal.value, 2) * rs.value)

const pl = computed(() => il.value * vout.value)

// Knee current threshold (typically 1-5mA for regulation)
const kneeCurrent = ref(0.005)

const isGoodRegulation = computed(() => iz.value >= kneeCurrent.value)

// Safety thresholds
const maxZenerPower = ref(5) // watts
const maxResistorPower = ref(2) // watts

const zenerSafe = computed(() => pz.value <= maxZenerPower.value)
const resistorSafe = computed(() => prs.value <= maxResistorPower.value)

// Generate load regulation curve data
const loadCurveData = computed(() => {
  const points = []
  for (let r = 10; r <= 10000; r *= 1.1) {
    const iTotalCalc = (vin.value - vz.value) / rs.value
    const iLoadCalc = vz.value / r
    const izCalc = Math.max(0, iTotalCalc - iLoadCalc)
    const vOutCalc = izCalc > 0 ? vz.value : vin.value * r / (rs.value + r)
    points.push({ r: r, v: vOutCalc })
  }
  return points
})

// Generate line regulation curve data
const lineCurveData = computed(() => {
  const points = []
  for (let v = vz.value + 1; v <= vin.value * 2; v += 0.5) {
    const iTotalCalc = (v - vz.value) / rs.value
    const iLoadCalc = vz.value / rl.value
    const izCalc = Math.max(0, iTotalCalc - iLoadCalc)
    const vOutCalc = izCalc > 0 ? vz.value : v * rl.value / (rs.value + rl.value)
    points.push({ vin: v, vout: vOutCalc })
  }
  return points
})

// Quick presets
const presets = [
  { name: '5V Regulator (12V→5V)', vin: 12, vz: 5.1, rs: 220, rl: 1000 },
  { name: '3.3V Regulator (9V→3.3V)', vin: 9, vz: 3.3, rs: 180, rl: 500 },
  { name: '12V Regulator (24V→12V)', vin: 24, vz: 12, rs: 390, rl: 2000 },
  { name: 'High Current (5V@1A)', vin: 12, vz: 5.1, rs: 47, rl: 10 },
]

function applyPreset(preset: typeof presets[0]) {
  vin.value = preset.vin
  vz.value = preset.vz
  rs.value = preset.rs
  rl.value = preset.rl
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Zener Voltage Regulator Simulation
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Explore how Zener diodes regulate voltage through reverse breakdown
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Controls Panel -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">🎛️</span> Circuit Parameters
          </h2>

          <!-- Input Voltage -->
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input Voltage (V<sub>in</sub>)
            </label>
            <input
              v-model.number="vin"
              type="range"
              min="1"
              max="50"
              step="0.5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">1V</span>
              <span class="font-mono font-bold text-blue-600 dark:text-blue-400">{{ vin.toFixed(1) }}V</span>
              <span class="text-gray-500 dark:text-gray-400">50V</span>
            </div>
          </div>

          <!-- Zener Voltage -->
          <div class="space-y-3 mt-5">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Zener Voltage (V<sub>z</sub>)
            </label>
            <select
              v-model.number="vz"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
            >
              <option value="2.4">2.4V</option>
              <option value="3.0">3.0V</option>
              <option value="3.3">3.3V</option>
              <option value="3.9">3.9V</option>
              <option value="4.7">4.7V</option>
              <option value="5.1">5.1V</option>
              <option value="5.6">5.6V</option>
              <option value="6.2">6.2V</option>
              <option value="6.8">6.8V</option>
              <option value="7.5">7.5V</option>
              <option value="8.2">8.2V</option>
              <option value="9.1">9.1V</option>
              <option value="10">10V</option>
              <option value="12">12V</option>
              <option value="15">15V</option>
            </select>
          </div>

          <!-- Series Resistance -->
          <div class="space-y-3 mt-5">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Series Resistance (R<sub>s</sub>)
            </label>
            <input
              v-model.number="rs"
              type="range"
              min="10"
              max="1000"
              step="10"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">10Ω</span>
              <span class="font-mono font-bold text-orange-600 dark:text-orange-400">{{ rs }}Ω</span>
              <span class="text-gray-500 dark:text-gray-400">1kΩ</span>
            </div>
          </div>

          <!-- Load Resistance -->
          <div class="space-y-3 mt-5">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Load Resistance (R<sub>L</sub>)
            </label>
            <input
              v-model.number="rl"
              type="range"
              min="10"
              max="10000"
              step="50"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">10Ω</span>
              <span class="font-mono font-bold text-green-600 dark:text-green-400">{{ rl }}Ω</span>
              <span class="text-gray-500 dark:text-gray-400">10kΩ</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">⚡ Quick Presets</h3>
          <div class="space-y-2">
            <button
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Circuit Visualization -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">🔌</span> Circuit Diagram
          </h2>
          
          <!-- SVG Circuit Diagram -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4">
            <svg viewBox="0 0 400 300" class="w-full h-auto">
              <!-- Background grid -->
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#smallGrid)"/>

              <!-- Vin -->
              <circle cx="50" cy="80" r="25" fill="none" stroke="#3B82F6" stroke-width="3"/>
              <text x="50" y="85" text-anchor="middle" class="text-sm font-bold" fill="#3B82F6">Vᵢₙ</text>
              <text x="50" y="120" text-anchor="middle" class="text-xs" fill="#3B82F6">{{ vin }}V</text>

              <!-- Wire from Vin to Rs -->
              <line x1="75" y1="80" x2="120" y2="80" stroke="#10B981" stroke-width="3" class="current-flow"/>
              <polygon points="115,75 125,80 115,85" fill="#10B981" class="current-arrow"/>

              <!-- Rs (Series Resistor) -->
              <rect x="120" y="65" width="60" height="30" fill="white" stroke="#F59E0B" stroke-width="2"/>
              <text x="150" y="85" text-anchor="middle" class="text-sm font-bold" fill="#F59E0B">Rₛ</text>
              <text x="150" y="110" text-anchor="middle" class="text-xs" fill="#F59E0B">{{ rs }}Ω</text>

              <!-- Wire from Rs to junction -->
              <line x1="180" y1="80" x2="220" y2="80" stroke="#10B981" stroke-width="3"/>
              <polygon points="215,75 225,80 215,85" fill="#10B981"/>

              <!-- Junction point -->
              <circle cx="220" cy="80" r="6" fill="#10B981"/>

              <!-- Wire to Zener (down) -->
              <line x1="220" y1="80" x2="220" y2="130" stroke="#10B981" stroke-width="3"/>
              <polygon points="215,125 220,135 225,125" fill="#10B981"/>

              <!-- Zener Diode -->
              <g transform="translate(200, 140)">
                <!-- Cathode plate -->
                <line x1="20" y1="0" x2="40" y2="0" stroke="#8B5CF6" stroke-width="4"/>
                <!-- Anode plate -->
                <line x1="10" y1="-15" x2="10" y2="15" stroke="#8B5CF6" stroke-width="3"/>
                <!-- Zener wings -->
                <line x1="20" y1="-15" x2="20" y2="-5" stroke="#8B5CF6" stroke-width="3"/>
                <line x1="20" y1="5" x2="20" y2="15" stroke="#8B5CF6" stroke-width="3"/>
                <!-- Connection to cathode -->
                <line x1="40" y1="0" x2="50" y2="0" stroke="#10B981" stroke-width="3"/>
                <!-- Connection to anode -->
                <line x1="0" y1="0" x2="10" y2="0" stroke="#10B981" stroke-width="3"/>
              </g>

              <!-- Zener label -->
              <text x="240" y="145" class="text-sm font-bold" fill="#8B5CF6">Vz</text>
              <text x="240" y="160" class="text-xs" fill="#8B5CF6">{{ vz }}V</text>

              <!-- Wire from junction to load -->
              <line x1="220" y1="80" x2="280" y2="80" stroke="#10B981" stroke-width="3"/>
              <polygon points="275,75 285,80 275,85" fill="#10B981"/>

              <!-- Load Resistor -->
              <rect x="280" y="65" width="60" height="30" fill="white" stroke="#EC4899" stroke-width="2"/>
              <text x="310" y="85" text-anchor="middle" class="text-sm font-bold" fill="#EC4899">Rₗ</text>
              <text x="310" y="110" text-anchor="middle" class="text-xs" fill="#EC4899">{{ rl }}Ω</text>

              <!-- Return path (ground) -->
              <line x1="340" y1="80" x2="360" y2="80" stroke="#10B981" stroke-width="3"/>
              <line x1="360" y1="80" x2="360" y2="200" stroke="#10B981" stroke-width="3"/>
              <line x1="360" y1="200" x2="50" y2="200" stroke="#10B981" stroke-width="3"/>
              <line x1="50" y1="200" x2="50" y2="105" stroke="#10B981" stroke-width="3"/>
              
              <!-- Ground symbols -->
              <line x1="220" y1="200" x2="220" y2="175" stroke="#10B981" stroke-width="2"/>
              <line x1="205" y1="175" x2="235" y2="175" stroke="#10B981" stroke-width="2"/>
              <line x1="210" y1="180" x2="230" y2="180" stroke="#10B981" stroke-width="2"/>
              <line x1="215" y1="185" x2="225" y2="185" stroke="#10B981" stroke-width="2"/>

              <!-- Vout label -->
              <text x="310" y="50" text-anchor="middle" class="text-lg font-bold" fill="#10B981">Vout</text>
              <text x="310" y="35" text-anchor="middle" class="text-xs" fill="#10B981">{{ vout.toFixed(2) }}V</text>

              <!-- Regulation Status -->
              <rect x="50" y="220" width="300" height="40" rx="8" 
                :fill="inRegulation ? '#D1FAE5' : '#FEE2E2'"
                class="dark:fill-opacity-20"/>
              <text x="200" y="245" text-anchor="middle" class="text-base font-bold"
                :fill="inRegulation ? '#065F46' : '#991B1B'">
                {{ inRegulation ? '✅ REGULATING' : '❌ NOT REGULATING' }}
              </text>
              <text x="200" y="260" text-anchor="middle" class="text-xs" fill="#6B7280">
                {{ inRegulation ? `Iz = ${iz.toFixed(2)}A` : 'Iz = 0A (Zener cutoff)' }}
              </text>

              <!-- Current values -->
              <text x="130" y="55" class="text-xs" fill="#6B7280">Is = {{ isTotal.toFixed(2) }}A</text>
              <text x="220" y="55" class="text-xs" fill="#6B7280">Iz = {{ iz.toFixed(2) }}A</text>
              <text x="310" y="55" class="text-xs" fill="#6B7280">IL = {{ il.toFixed(2) }}A</text>
            </svg>
          </div>
        </div>

        <!-- Real-time Values -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">📊</span> Real-time Measurements
          </h2>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Output Voltage</span>
              <span class="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">{{ vout.toFixed(2) }}V</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Zener Current (I<sub>z</sub>)</span>
              <span class="font-mono font-bold text-lg text-purple-600 dark:text-purple-400">{{ iz.toFixed(3) }}A</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Load Current (I<sub>L</sub>)</span>
              <span class="font-mono font-bold text-lg text-pink-600 dark:text-pink-400">{{ il.toFixed(3) }}A</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Series Current (I<sub>s</sub>)</span>
              <span class="font-mono font-bold text-lg text-green-600 dark:text-green-400">{{ isTotal.toFixed(3) }}A</span>
            </div>
          </div>

          <!-- Power Dissipation -->
          <div class="mt-4 space-y-3">
            <div class="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Zener Power</span>
                <span class="font-mono font-bold" :class="zenerSafe ? 'text-green-600' : 'text-red-600'">{{ pz.toFixed(2) }}W</span>
              </div>
              <div class="text-xs mt-1" :class="zenerSafe ? 'text-green-600' : 'text-red-600'">
                {{ zenerSafe ? `✓ Safe (max ${maxZenerPower}W)` : `⚠️ OVERLOAD! (max ${maxZenerPower}W)` }}
              </div>
            </div>
            <div class="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">Resistor Power</span>
                <span class="font-mono font-bold" :class="resistorSafe ? 'text-green-600' : 'text-red-600'">{{ prs.toFixed(2) }}W</span>
              </div>
              <div class="text-xs mt-1" :class="resistorSafe ? 'text-green-600' : 'text-red-600'">
                {{ resistorSafe ? `✓ Safe (max ${maxResistorPower}W)` : `⚠️ OVERLOAD! (max ${maxResistorPower}W)` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Curves Panel -->
      <div class="space-y-6">
        <!-- Load Regulation Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📈 Load Regulation</h3>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
            <svg viewBox="0 0 300 200" class="w-full h-auto">
              <!-- Axes -->
              <line x1="40" y1="10" x2="40" y2="170" stroke="#374151" stroke-width="2"/>
              <line x1="40" y1="170" x2="290" y2="170" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels -->
              <text x="35" y="20" text-anchor="end" class="text-xs" fill="#6B7280">{{ vz.toFixed(1) }}V</text>
              <text x="35" y="95" text-anchor="end" class="text-xs" fill="#6B7280">{{ (vz/2).toFixed(1) }}V</text>
              <text x="30" y="175" text-anchor="end" class="text-xs" fill="#6B7280">0V</text>
              
              <!-- X-axis labels (log scale) -->
              <text x="40" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">10Ω</text>
              <text x="165" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">1kΩ</text>
              <text x="285" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">10kΩ</text>

              <!-- Regulation threshold line -->
              <line x1="40" y1="30" x2="290" y2="30" stroke="#3B82F6" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>

              <!-- Load regulation curve -->
              <polyline
                :points="loadCurveData.map((p, i) => {
                  const x = 40 + (Math.log10(p.r) - 1) / 3 * 250
                  const y = 170 - (p.v / (vz * 1.5)) * 150
                  return `${x},${y}`
                }).join(' ')"
                fill="none"
                stroke="#3B82F6"
                stroke-width="2"
              />

              <!-- Current operating point -->
              <circle
                :cx="40 + (Math.log10(rl) - 1) / 3 * 250"
                :cy="170 - (vout / (vz * 1.5)) * 150"
                r="6"
                fill="#EF4444"
                stroke="white"
                stroke-width="2"
              />
              <text
                :x="40 + (Math.log10(rl) - 1) / 3 * 250"
                :y="170 - (vout / (vz * 1.5)) * 150 - 10"
                text-anchor="middle"
                class="text-xs font-bold"
                fill="#EF4444"
              >
                {{ vout.toFixed(1) }}V
              </text>

              <!-- Title -->
              <text x="165" y="195" text-anchor="middle" class="text-xs" fill="#374151">Load Resistance (Ω)</text>
            </svg>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Vout vs Load Resistance (log scale). Red dot = current operating point.
          </p>
        </div>

        <!-- Line Regulation Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📈 Line Regulation</h3>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
            <svg viewBox="0 0 300 200" class="w-full h-auto">
              <!-- Axes -->
              <line x1="40" y1="10" x2="40" y2="170" stroke="#374151" stroke-width="2"/>
              <line x1="40" y1="170" x2="290" y2="170" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels -->
              <text x="35" y="20" text-anchor="end" class="text-xs" fill="#6B7280">{{ vz.toFixed(1) }}V</text>
              <text x="35" y="95" text-anchor="end" class="text-xs" fill="#6B7280">{{ (vz/2).toFixed(1) }}V</text>
              <text x="30" y="175" text-anchor="end" class="text-xs" fill="#6B7280">0V</text>
              
              <!-- X-axis labels -->
              <text x="40" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">{{ Math.round(vz + 1) }}V</text>
              <text x="165" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">{{ Math.round((vin + vz) / 2) }}V</text>
              <text x="285" y="185" text-anchor="middle" class="text-xs" fill="#6B7280">{{ Math.round(vin * 2) }}V</text>

              <!-- Line regulation curve -->
              <polyline
                :points="lineCurveData.map((p) => {
                  const x = 40 + ((p.vin - vz - 1) / (vin * 2 - vz - 1)) * 250
                  const y = 170 - (p.vout / (vz * 1.5)) * 150
                  return `${x},${y}`
                }).join(' ')"
                fill="none"
                stroke="#10B981"
                stroke-width="2"
              />

              <!-- Current operating point -->
              <circle
                :cx="40 + ((vin - vz - 1) / (vin * 2 - vz - 1)) * 250"
                :cy="170 - (vout / (vz * 1.5)) * 150"
                r="6"
                fill="#EF4444"
                stroke="white"
                stroke-width="2"
              />
              <text
                :x="40 + ((vin - vz - 1) / (vin * 2 - vz - 1)) * 250"
                :y="170 - (vout / (vz * 1.5)) * 150 - 10"
                text-anchor="middle"
                class="text-xs font-bold"
                fill="#EF4444"
              >
                {{ vout.toFixed(1) }}V
              </text>

              <!-- Title -->
              <text x="165" y="195" text-anchor="middle" class="text-xs" fill="#374151">Input Voltage (V)</text>
            </svg>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Vout vs Input Voltage. Red dot = current operating point.
          </p>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📚 Understanding Zener Voltage Regulation</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- How It Works -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">⚡ How Zener Regulation Works</h3>
          <div class="prose dark:prose-invert text-sm">
            <p>
              A Zener diode regulates voltage by operating in its <strong>reverse breakdown region</strong>. 
              When reverse-biased beyond its Zener voltage (V<sub>z</sub>), it conducts current while maintaining 
              a nearly constant voltage across its terminals.
            </p>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg my-3">
              <p class="font-mono text-center text-blue-800 dark:text-blue-300 font-bold">
                V<sub>out</sub> ≈ V<sub>z</sub> (when regulating)
              </p>
            </div>
            <p>
              The series resistor (R<sub>s</sub>) drops the excess voltage and limits current through the Zener. 
              For regulation to occur:
            </p>
            <ul class="list-disc pl-5 space-y-1">
              <li>V<sub>in</sub> must be greater than V<sub>z</sub></li>
              <li>Zener current (I<sub>z</sub>) must be positive</li>
              <li>I<sub>z</sub> should be above the "knee current" (typically 1-5mA)</li>
            </ul>
          </div>
        </div>

        <!-- Key Concepts -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">🎯 Key Concepts</h3>
          <div class="space-y-3">
            <div class="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h4 class="font-semibold text-purple-800 dark:text-purple-300">Load Regulation</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Ability to maintain V<sub>out</sub> constant when load current changes. 
                Better when R<sub>s</sub> is small and I<sub>z</sub> is well above knee current.
              </p>
            </div>
            <div class="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <h4 class="font-semibold text-green-800 dark:text-green-300">Line Regulation</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Ability to maintain V<sub>out</sub> constant when input voltage changes. 
                Depends on Zener impedance and R<sub>s</sub>.
              </p>
            </div>
            <div class="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
              <h4 class="font-semibold text-orange-800 dark:text-orange-300">Power Dissipation</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                P<sub>z</sub> = V<sub>z</sub> × I<sub>z</sub>. Must stay within Zener's power rating. 
                Worst case: minimum load current (I<sub>L</sub> = 0).
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Design Considerations -->
      <div class="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 class="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-3">⚙️ Design Considerations</h3>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 class="font-semibold text-gray-800 dark:text-white mb-2">Choosing R<sub>s</sub>:</h4>
            <ul class="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Small R<sub>s</sub>: Better regulation, but higher I<sub>z</sub> and P<sub>z</sub></li>
              <li>• Large R<sub>s</sub>: Lower power, but worse regulation</li>
              <li>• Must ensure minimum I<sub>z</sub> at max load</li>
              <li>• Must limit I<sub>z</sub> at min load to prevent overload</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-800 dark:text-white mb-2">When Regulation Fails:</h4>
            <ul class="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• V<sub>in</sub> < V<sub>z</sub>: Not enough voltage to breakdown</li>
              <li>• R<sub>L</sub> too small: I<sub>z</sub> drops to zero</li>
              <li>• R<sub>s</sub> too large: Can't supply load current</li>
              <li>• Result: V<sub>out</sub> becomes voltage divider</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">🔧 Real-World Applications</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 mb-2">Reference Voltage</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Provides stable voltage reference for comparator circuits, ADCs, and voltage sensors.
            </p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-green-600 dark:text-green-400 mb-2">Simple Regulator</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Low-cost voltage regulation for non-critical loads. Used in power supplies, sensor biasing.
            </p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-purple-600 dark:text-purple-400 mb-2">Overvoltage Protection</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Protects sensitive circuits by clamping voltage to safe levels during transients.
            </p>
          </div>
        </div>
      </div>

      <!-- Key Formulas -->
      <div class="mt-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">🧮 Key Formulas</h3>
        <div class="grid md:grid-cols-2 gap-4 font-mono text-sm">
          <div class="space-y-2">
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Output Voltage (regulating)</p>
              <p class="text-blue-600 dark:text-blue-400 font-bold">V<sub>out</sub> = V<sub>z</sub></p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Zener Current</p>
              <p class="text-purple-600 dark:text-purple-400 font-bold">I<sub>z</sub> = (V<sub>in</sub> - V<sub>z</sub>)/R<sub>s</sub> - I<sub>L</sub></p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Load Current</p>
              <p class="text-pink-600 dark:text-pink-400 font-bold">I<sub>L</sub> = V<sub>out</sub> / R<sub>L</sub></p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Zener Power</p>
              <p class="text-orange-600 dark:text-orange-400 font-bold">P<sub>z</sub> = V<sub>z</sub> × I<sub>z</sub></p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Regulation Condition</p>
              <p class="text-green-600 dark:text-green-400 font-bold">I<sub>z</sub> > 0</p>
            </div>
            <div class="p-3 bg-white dark:bg-gray-700 rounded">
              <p class="text-gray-600 dark:text-gray-400 text-xs mb-1">Voltage Divider (not regulating)</p>
              <p class="text-red-600 dark:text-red-400 font-bold">V<sub>out</sub> = V<sub>in</sub> × R<sub>L</sub> / (R<sub>s</sub> + R<sub>L</sub>)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

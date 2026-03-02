<script setup lang="ts">
import { ref, computed } from 'vue'

// Input values
const vs = ref(12) // Source voltage
const rs = ref(50) // Source resistance
const rl = ref(50) // Load resistance

// Computed values
const il = computed(() => vs.value / (rs.value + rl.value))

const vl = computed(() => il.value * rl.value)

const pl = computed(() => Math.pow(il.value, 2) * rl.value)

const ps = computed(() => vs.value * il.value) // Power supplied by source

const efficiency = computed(() => {
  if (ps.value === 0) return 0
  return (pl.value / ps.value) * 100
})

// Maximum power transfer occurs when RL = RS
const maxPower = computed(() => {
  const rOptimal = rs.value
  const iOptimal = vs.value / (rs.value + rOptimal)
  return Math.pow(iOptimal, 2) * rOptimal
})

const optimalRL = computed(() => rs.value)

const efficiencyAtMaxPower = computed(() => 50) // Always 50% at max power transfer

const isMaxPower = computed(() => {
  return Math.abs(rl.value - rs.value) < 0.01
})

// Power ratio (actual / maximum)
const powerRatio = computed(() => {
  if (maxPower.value === 0) return 0
  return (pl.value / maxPower.value) * 100
})

// Generate power curve data
const powerCurveData = computed(() => {
  const points = []
  for (let r = 0.1; r <= rs.value * 5; r += rs.value * 0.05) {
    const i = vs.value / (rs.value + r)
    const p = Math.pow(i, 2) * r
    points.push({ rl: r, power: p })
  }
  return points
})

// Generate efficiency curve data
const efficiencyCurveData = computed(() => {
  const points = []
  for (let r = 0.1; r <= rs.value * 5; r += rs.value * 0.05) {
    const i = vs.value / (rs.value + r)
    const pLoad = Math.pow(i, 2) * r
    const pSource = vs.value * i
    const eff = pSource > 0 ? (pLoad / pSource) * 100 : 0
    points.push({ rl: r, efficiency: eff })
  }
  return points
})

// Quick presets
const presets = [
  { name: 'Audio Matching (8Ω)', vs: 10, rs: 8, rl: 8 },
  { name: 'RF Transmission (50Ω)', vs: 5, rs: 50, rl: 50 },
  { name: 'High Impedance (1kΩ)', vs: 12, rs: 1000, rl: 1000 },
  { name: 'Low Voltage (5V, 10Ω)', vs: 5, rs: 10, rl: 10 },
]

function applyPreset(preset: typeof presets[0]) {
  vs.value = preset.vs
  rs.value = preset.rs
  rl.value = preset.rl
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        Maximum Power Transfer Theorem Calculator
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Explore how load resistance affects power transfer and efficiency
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Controls Panel -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">⚡</span> Circuit Parameters
          </h2>

          <!-- Source Voltage -->
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Voltage (V<sub>s</sub>)
            </label>
            <input
              v-model.number="vs"
              type="range"
              min="1"
              max="50"
              step="0.5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">1V</span>
              <span class="font-mono font-bold text-blue-600 dark:text-blue-400">{{ vs.toFixed(1) }}V</span>
              <span class="text-gray-500 dark:text-gray-400">50V</span>
            </div>
          </div>

          <!-- Source Resistance -->
          <div class="space-y-3 mt-5">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Resistance (R<sub>s</sub>)
            </label>
            <input
              v-model.number="rs"
              type="range"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">1Ω</span>
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
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">1Ω</span>
              <span class="font-mono font-bold text-green-600 dark:text-green-400">{{ rl }}Ω</span>
              <span class="text-gray-500 dark:text-gray-400">1kΩ</span>
            </div>
          </div>

          <!-- Quick Match Button -->
          <button
            @click="rl = rs"
            class="w-full mt-5 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            🎯 Match Load to Source (R<sub>L</sub> = R<sub>s</sub>)
          </button>
        </div>

        <!-- Quick Presets -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📋 Quick Presets</h3>
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

      <!-- Results Panel -->
      <div class="space-y-6">
        <!-- Circuit Visualization -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">🔌</span> Circuit Diagram
          </h2>
          
          <!-- SVG Circuit Diagram -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-4">
            <svg viewBox="0 0 350 250" class="w-full h-auto">
              <!-- Background grid -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="350" height="250" fill="url(#grid)"/>

              <!-- Source (Vs) -->
              <circle cx="60" cy="100" r="30" fill="none" stroke="#3B82F6" stroke-width="3"/>
              <text x="60" y="95" text-anchor="middle" class="text-sm font-bold" fill="#3B82F6">Vₛ</text>
              <text x="60" y="115" text-anchor="middle" class="text-xs" fill="#3B82F6">{{ vs }}V</text>

              <!-- Source Resistor (Rs) -->
              <rect x="130" y="85" width="80" height="30" fill="white" stroke="#F59E0B" stroke-width="2"/>
              <text x="170" y="105" text-anchor="middle" class="text-sm font-bold" fill="#F59E0B">Rₛ</text>
              <text x="170" y="130" text-anchor="middle" class="text-xs" fill="#F59E0B">{{ rs }}Ω</text>

              <!-- Load Resistor (RL) -->
              <rect x="130" y="155" width="80" height="30" fill="white" stroke="#10B981" stroke-width="2"/>
              <text x="170" y="175" text-anchor="middle" class="text-sm font-bold" fill="#10B981">Rₗ</text>
              <text x="170" y="200" text-anchor="middle" class="text-xs" fill="#10B981">{{ rl }}Ω</text>

              <!-- Wires -->
              <line x1="90" y1="100" x2="130" y2="100" stroke="#6B7280" stroke-width="3"/>
              <line x1="210" y1="100" x2="280" y2="100" stroke="#6B7280" stroke-width="3"/>
              <line x1="280" y1="100" x2="280" y2="170" stroke="#6B7280" stroke-width="3"/>
              <line x1="280" y1="170" x2="210" y2="170" stroke="#6B7280" stroke-width="3"/>
              <line x1="130" y1="170" x2="60" y2="170" stroke="#6B7280" stroke-width="3"/>
              <line x1="60" y1="170" x2="60" y2="130" stroke="#6B7280" stroke-width="3"/>

              <!-- Current arrow -->
              <line x1="250" y1="85" x2="250" y2="40" stroke="#EC4899" stroke-width="3"/>
              <polygon points="245,45 250,35 255,45" fill="#EC4899"/>
              <text x="250" y="30" text-anchor="middle" class="text-sm font-bold" fill="#EC4899">I = {{ il.toFixed(3) }}A</text>

              <!-- Voltage across load -->
              <text x="310" y="155" text-anchor="middle" class="text-xs font-bold" fill="#10B981">Vₗ</text>
              <text x="310" y="170" text-anchor="middle" class="text-xs" fill="#10B981">{{ vl.toFixed(2) }}V</text>

              <!-- Power in load -->
              <text x="310" y="220" text-anchor="middle" class="text-sm font-bold" fill="#8B5CF6">Pₗ</text>
              <text x="310" y="235" text-anchor="middle" class="text-xs" fill="#8B5CF6">{{ pl.toFixed(3) }}W</text>

              <!-- Max power indicator -->
              <g v-if="isMaxPower">
                <circle cx="290" cy="200" r="40" fill="none" stroke="#EF4444" stroke-width="3" stroke-dasharray="5,5">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 290 200"
                    to="360 290 200"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text x="290" y="195" text-anchor="middle" class="text-xs font-bold" fill="#EF4444">MAX</text>
                <text x="290" y="210" text-anchor="middle" class="text-xs font-bold" fill="#EF4444">POWER</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Calculated Values -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
            <span class="text-2xl">📊</span> Calculated Values
          </h2>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Circuit Current (I)</span>
              <span class="font-mono font-bold text-lg text-pink-600 dark:text-pink-400">{{ il.toFixed(3) }}A</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Load Voltage (V<sub>L</sub>)</span>
              <span class="font-mono font-bold text-lg text-green-600 dark:text-green-400">{{ vl.toFixed(2) }}V</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2" :class="isMaxPower ? 'border-purple-500 dark:border-purple-400' : 'border-purple-200 dark:border-purple-800'">
              <span class="text-gray-700 dark:text-gray-300 font-semibold">Load Power (P<sub>L</sub>)</span>
              <span class="font-mono font-bold text-xl text-purple-600 dark:text-purple-400">{{ pl.toFixed(3) }}W</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span class="text-gray-700 dark:text-gray-300">Efficiency (η)</span>
              <span class="font-mono font-bold text-lg" :class="efficiency >= 50 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'">{{ efficiency.toFixed(1) }}%</span>
            </div>
          </div>

          <!-- Maximum Power Info -->
          <div class="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">🎯 Maximum Power Transfer</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700 dark:text-gray-300">Optimal R<sub>L</sub>:</span>
                <span class="font-mono font-bold text-yellow-800 dark:text-yellow-400">{{ optimalRL }}Ω</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700 dark:text-gray-300">Max Power (P<sub>max</sub>):</span>
                <span class="font-mono font-bold text-yellow-800 dark:text-yellow-400">{{ maxPower.toFixed(3) }}W</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700 dark:text-gray-300">Current Power Ratio:</span>
                <span class="font-mono font-bold" :class="isMaxPower ? 'text-green-600' : 'text-gray-600'">{{ powerRatio.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700 dark:text-gray-300">Efficiency at Max Power:</span>
                <span class="font-mono font-bold text-yellow-800 dark:text-yellow-400">{{ efficiencyAtMaxPower }}%</span>
              </div>
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="mt-4 p-3 rounded-lg text-center font-semibold"
            :class="isMaxPower ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'">
            <span v-if="isMaxPower">✅ MAXIMUM POWER TRANSFER ACHIEVED!</span>
            <span v-else-if="rl < rs">⚠️ Load too low - efficiency {{ efficiency.toFixed(1) }}%</span>
            <span v-else>📊 Load too high - power below maximum</span>
          </div>
        </div>
      </div>

      <!-- Curves Panel -->
      <div class="space-y-6">
        <!-- Power vs RL Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📈 Power vs Load Resistance</h3>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
            <svg viewBox="0 0 300 250" class="w-full h-auto">
              <!-- Axes -->
              <line x1="40" y1="10" x2="40" y2="200" stroke="#374151" stroke-width="2"/>
              <line x1="40" y1="200" x2="290" y2="200" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels -->
              <text x="35" y="20" text-anchor="end" class="text-xs" fill="#6B7280">{{ (maxPower * 1.1).toFixed(2) }}W</text>
              <text x="35" y="105" text-anchor="end" class="text-xs" fill="#6B7280">{{ (maxPower / 2).toFixed(2) }}W</text>
              <text x="30" y="205" text-anchor="end" class="text-xs" fill="#6B7280">0W</text>
              
              <!-- X-axis labels -->
              <text x="40" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">0Ω</text>
              <text x="148" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">{{ (rs * 2.5).toFixed(0) }}Ω</text>
              <text x="285" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">{{ (rs * 5).toFixed(0) }}Ω</text>

              <!-- Max power line -->
              <line x1="40" y1="40" x2="290" y2="40" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>
              <text x="295" y="43" class="text-xs" fill="#8B5CF6">Pmax</text>

              <!-- Rs marker -->
              <line :x1="40 + (rs / (rs * 5)) * 250" y1="200" :x2="40 + (rs / (rs * 5)) * 250" y2="10" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4" opacity="0.7"/>
              <text :x="40 + (rs / (rs * 5)) * 250" y="215" text-anchor="middle" class="text-xs font-bold" fill="#F59E0B">Rs</text>

              <!-- Power curve -->
              <polyline
                :points="powerCurveData.map((p) => {
                  const x = 40 + (p.rl / (rs * 5)) * 250
                  const y = 200 - (p.power / (maxPower * 1.1)) * 180
                  return `${x},${y}`
                }).join(' ')"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="2.5"
              />

              <!-- Current operating point -->
              <circle
                :cx="40 + (rl / (rs * 5)) * 250"
                :cy="200 - (pl / (maxPower * 1.1)) * 180"
                r="7"
                :fill="isMaxPower ? '#10B981' : '#EF4444'"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Power delivered to load. Maximum occurs at R<sub>L</sub> = R<sub>s</sub>.
          </p>
        </div>

        <!-- Efficiency vs RL Curve -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📈 Efficiency vs Load Resistance</h3>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
            <svg viewBox="0 0 300 250" class="w-full h-auto">
              <!-- Axes -->
              <line x1="40" y1="10" x2="40" y2="200" stroke="#374151" stroke-width="2"/>
              <line x1="40" y1="200" x2="290" y2="200" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels -->
              <text x="35" y="20" text-anchor="end" class="text-xs" fill="#6B7280">100%</text>
              <text x="35" y="105" text-anchor="end" class="text-xs" fill="#6B7280">50%</text>
              <text x="30" y="205" text-anchor="end" class="text-xs" fill="#6B7280">0%</text>
              
              <!-- X-axis labels -->
              <text x="40" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">0Ω</text>
              <text x="148" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">{{ (rs * 2.5).toFixed(0) }}Ω</text>
              <text x="285" y="220" text-anchor="middle" class="text-xs" fill="#6B7280">{{ (rs * 5).toFixed(0) }}Ω</text>

              <!-- 50% efficiency line -->
              <line x1="40" y1="105" x2="290" y2="105" stroke="#3B82F6" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>
              <text x="295" y="108" class="text-xs" fill="#3B82F6">50%</text>

              <!-- Rs marker -->
              <line :x1="40 + (rs / (rs * 5)) * 250" y1="200" :x2="40 + (rs / (rs * 5)) * 250" y2="10" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4" opacity="0.7"/>
              <text :x="40 + (rs / (rs * 5)) * 250" y="215" text-anchor="middle" class="text-xs font-bold" fill="#F59E0B">Rs</text>

              <!-- Efficiency curve -->
              <polyline
                :points="efficiencyCurveData.map((p) => {
                  const x = 40 + (p.rl / (rs * 5)) * 250
                  const y = 200 - (p.efficiency / 100) * 180
                  return `${x},${y}`
                }).join(' ')"
                fill="none"
                stroke="#3B82F6"
                stroke-width="2.5"
              />

              <!-- Current operating point -->
              <circle
                :cx="40 + (rl / (rs * 5)) * 250"
                :cy="200 - (efficiency / 100) * 180"
                r="7"
                :fill="efficiency >= 50 ? '#10B981' : '#F59E0B'"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Efficiency = P<sub>L</sub> / P<sub>S</sub>. At max power transfer, efficiency is only 50%.
          </p>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📚 Understanding Maximum Power Transfer</h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- The Theorem -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">⚡ The Theorem</h3>
          <div class="prose dark:prose-invert text-sm">
            <p>
              The <strong>Maximum Power Transfer Theorem</strong> states that maximum power is transferred 
              from a source to a load when the load resistance equals the source resistance (internal resistance).
            </p>
            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg my-3">
              <p class="font-mono text-center text-purple-800 dark:text-purple-300 font-bold text-lg">
                P<sub>max</sub> when R<sub>L</sub> = R<sub>s</sub>
              </p>
            </div>
            <p>
              At this condition, the power delivered to the load is maximized, but the efficiency is only 50% - 
              half the power is dissipated in the source resistance and half in the load.
            </p>
          </div>
        </div>

        <!-- Key Concepts -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">🎯 Key Insights</h3>
          <div class="space-y-3">
            <div class="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h4 class="font-semibold text-purple-800 dark:text-purple-300">Power vs Efficiency Trade-off</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Maximum power transfer (R<sub>L</sub> = R<sub>s</sub>) gives only 50% efficiency. 
                For higher efficiency, use R<sub>L</sub> ≫ R<sub>s</sub> (but less power).
              </p>
            </div>
            <div class="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <h4 class="font-semibold text-green-800 dark:text-green-300">Voltage Matching</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                At max power, V<sub>L</sub> = V<sub>s</sub>/2. The load voltage is exactly half the source voltage.
              </p>
            </div>
            <div class="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
              <h4 class="font-semibold text-blue-800 dark:text-blue-300">When to Use</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Use impedance matching in RF systems, audio, and signal processing where power transfer is critical. 
                Use high efficiency for power distribution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mathematical Proof -->
      <div class="mt-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">🧮 Mathematical Derivation</h3>
        <div class="space-y-4 text-sm">
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p class="text-gray-600 dark:text-gray-400 mb-2">Step 1: Express current through the circuit</p>
            <p class="font-mono text-blue-600 dark:text-blue-400 font-bold text-center">I = V<sub>s</sub> / (R<sub>s</sub> + R<sub>L</sub>)</p>
          </div>
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p class="text-gray-600 dark:text-gray-400 mb-2">Step 2: Express power delivered to the load</p>
            <p class="font-mono text-purple-600 dark:text-purple-400 font-bold text-center">P<sub>L</sub> = I²R<sub>L</sub> = V<sub>s</sub>²R<sub>L</sub> / (R<sub>s</sub> + R<sub>L</sub>)²</p>
          </div>
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p class="text-gray-600 dark:text-gray-400 mb-2">Step 3: Find maximum by differentiating with respect to R<sub>L</sub> and setting to zero</p>
            <p class="font-mono text-green-600 dark:text-green-400 font-bold text-center">dP<sub>L</sub>/dR<sub>L</sub> = 0 → R<sub>L</sub> = R<sub>s</sub></p>
          </div>
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <p class="text-gray-600 dark:text-gray-400 mb-2">Step 4: Maximum power value</p>
            <p class="font-mono text-orange-600 dark:text-orange-400 font-bold text-center">P<sub>max</sub> = V<sub>s</sub>² / 4R<sub>s</sub></p>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 Power vs Efficiency Comparison</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-700">
                <th class="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">Condition</th>
                <th class="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">Power (P<sub>L</sub>)</th>
                <th class="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">Efficiency (η)</th>
                <th class="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">Application</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="bg-green-50 dark:bg-green-900/20">
                <td class="px-4 py-3 font-semibold text-green-800 dark:text-green-300">R<sub>L</sub> = R<sub>s</sub></td>
                <td class="px-4 py-3 text-green-700 dark:text-green-400 font-bold">MAXIMUM ✓</td>
                <td class="px-4 py-3 text-orange-700 dark:text-orange-400 font-bold">50%</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">RF systems, audio matching</td>
              </tr>
              <tr class="bg-yellow-50 dark:bg-yellow-900/20">
                <td class="px-4 py-3 font-semibold text-yellow-800 dark:text-yellow-300">R<sub>L</sub> ≫ R<sub>s</sub></td>
                <td class="px-4 py-3 text-yellow-700 dark:text-yellow-400">LOW</td>
                <td class="px-4 py-3 text-green-700 dark:text-green-400 font-bold">HIGH ✓</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">Power distribution, batteries</td>
              </tr>
              <tr class="bg-red-50 dark:bg-red-900/20">
                <td class="px-4 py-3 font-semibold text-red-800 dark:text-red-300">R<sub>L</sub> ≪ R<sub>s</sub></td>
                <td class="px-4 py-3 text-red-700 dark:text-red-400">VERY LOW</td>
                <td class="px-4 py-3 text-red-700 dark:text-red-400">VERY LOW</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">Short circuit - avoid!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Real-World Applications -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">🔧 Real-World Applications</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-blue-600 dark:text-blue-400 mb-2">📻 RF & Microwave Systems</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Impedance matching (50Ω) is critical to prevent reflections and maximize power transfer 
              in antennas, transmission lines, and RF amplifiers.
            </p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-purple-600 dark:text-purple-400 mb-2">🔊 Audio Systems</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Speaker amplifiers match output impedance to speaker impedance (4Ω, 8Ω) for maximum 
              power transfer and minimal distortion.
            </p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-green-600 dark:text-green-400 mb-2">🔋 Battery-Powered Devices</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              For battery efficiency, load resistance should be much higher than internal resistance 
              (R<sub>L</sub> ≫ R<sub>s</sub>) to maximize battery life, even at lower power.
            </p>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="font-semibold text-orange-600 dark:text-orange-400 mb-2">⚡ Power Grid Distribution</h4>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Power lines use high voltage to minimize current, keeping load resistance high relative 
              to source resistance for maximum efficiency (not max power).
            </p>
          </div>
        </div>
      </div>

      <!-- Key Takeaways -->
      <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 Key Takeaways</h3>
        <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>✓ Maximum power transfer occurs when R<sub>L</sub> = R<sub>s</sub>, delivering P<sub>max</sub> = V<sub>s</sub>²/4R<sub>s</sub></li>
          <li>✓ At maximum power, efficiency is only 50% (equal power dissipated in source and load)</li>
          <li>✓ Use impedance matching when power transfer is critical (RF, audio, signal processing)</li>
          <li>✓ Use R<sub>L</sub> ≫ R<sub>s</sub> when efficiency is critical (batteries, power distribution)</li>
          <li>✓ Understanding this trade-off is essential for optimal circuit design</li>
        </ul>
      </div>
    </div>
  </div>
</template>

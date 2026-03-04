<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Input parameters
const inputVoltage = ref(12)
const outputVoltage = ref(5)
const loadCurrent = ref(1)
const dropoutVoltage = ref(2)
const ambientTemp = ref(25)
const thermalResistanceJA = ref(65)

// Real-time calculations
const powerDissipation = computed(() => {
  const pd = (inputVoltage.value - outputVoltage.value) * loadCurrent.value
  return Math.max(0, pd)
})

const junctionTemp = computed(() => {
  return ambientTemp.value + (powerDissipation.value * thermalResistanceJA.value / 1000)
})

const efficiency = computed(() => {
  if (inputVoltage.value <= 0) return 0
  const eff = (outputVoltage.value * loadCurrent.value) / (inputVoltage.value * loadCurrent.value) * 100
  return Math.min(100, Math.max(0, eff))
})

const minimumInputVoltage = computed(() => {
  return outputVoltage.value + dropoutVoltage.value
})

const safeOperatingArea = computed(() => {
  const maxJunctionTemp = 150 // Typical max for silicon
  return {
    safe: junctionTemp.value < maxJunctionTemp,
    margin: maxJunctionTemp - junctionTemp.value
  }
})

const heatsinkRequired = computed(() => {
  const maxJunctionTemp = 150
  const maxPower = (maxJunctionTemp - ambientTemp.value) / (thermalResistanceJA.value / 1000)
  return powerDissipation.value > maxPower * 0.8
})

const thermalResistanceMax = computed(() => {
  const maxJunctionTemp = 150
  if (powerDissipation.value <= 0) return 0
  return (maxJunctionTemp - ambientTemp.value) / powerDissipation.value * 1000
})

// Status indicators
const efficiencyStatus = computed(() => {
  if (efficiency.value < 50) return { text: 'Poor', color: 'text-red-400' }
  if (efficiency.value < 70) return { text: 'Fair', color: 'text-yellow-400' }
  return { text: 'Good', color: 'text-green-400' }
})

const thermalStatus = computed(() => {
  const temp = junctionTemp.value
  if (temp < 80) return { text: 'Excellent', color: 'text-green-400' }
  if (temp < 110) return { text: 'Good', color: 'text-yellow-400' }
  if (temp < 135) return { text: 'Warning', color: 'text-orange-400' }
  return { text: 'Danger', color: 'text-red-400' }
})

// Preset scenarios
const presets = [
  {
    name: '7805 (5V)',
    vin: 12,
    vout: 5,
    dropout: 2
  },
  {
    name: '7812 (12V)',
    vin: 18,
    vout: 12,
    dropout: 2
  },
  {
    name: 'LM317 (Adj)',
    vin: 15,
    vout: 9,
    dropout: 3
  },
  {
    name: 'Low Dropout',
    vin: 6,
    vout: 5,
    dropout: 0.5
  }
]

const applyPreset = (preset: typeof presets[0]) => {
  inputVoltage.value = preset.vin
  outputVoltage.value = preset.vout
  dropoutVoltage.value = preset.dropout
}

// Common thermal resistances
const thermalPresets = [
  { name: 'TO-220 (No Heatsink)', value: 65 },
  { name: 'TO-220 (Small Heatsink)', value: 40 },
  { name: 'TO-220 (Large Heatsink)', value: 20 },
  { name: 'TO-263 (SMD)', value: 50 },
  { name: 'SOT-223', value: 125 }
]
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Linear Voltage Regulator Calculator
      </h1>
      <p class="text-gray-400">Design and analyze linear voltage regulator circuits with thermal analysis</p>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Input Controls -->
      <div class="space-y-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold text-cyan-400 mb-4">📊 Input Parameters</h2>

        <!-- Voltage Settings -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Input Voltage (V<sub>in</sub>)
            </label>
            <input
              v-model.number="inputVoltage"
              type="number"
              step="0.1"
              min="0"
              max="50"
              class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Output Voltage (V<sub>out</sub>)
            </label>
            <input
              v-model.number="outputVoltage"
              type="number"
              step="0.1"
              min="0"
              max="48"
              class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Dropout Voltage (V<sub>do</sub>): {{ dropoutVoltage }}V
            </label>
            <input
              v-model.number="dropoutVoltage"
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              class="w-full accent-cyan-500"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>LDO (0.5V)</span>
              <span>Standard (5V)</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Load Current (I<sub>load</sub>): {{ loadCurrent }}A
            </label>
            <input
              v-model.number="loadCurrent"
              type="range"
              min="0.01"
              max="5"
              step="0.01"
              class="w-full accent-cyan-500"
            />
          </div>
        </div>

        <!-- Thermal Parameters -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-lg font-medium text-gray-300 mb-3">🌡️ Thermal Analysis</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Ambient Temperature (T<sub>A</sub>): {{ ambientTemp }}°C
              </label>
              <input
                v-model.number="ambientTemp"
                type="range"
                min="0"
                max="100"
                step="1"
                class="w-full accent-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Thermal Resistance (θ<sub>JA</sub>): {{ thermalResistanceJA }}°C/W
              </label>
              <select
                v-model.number="thermalResistanceJA"
                class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500"
              >
                <option v-for="preset in thermalPresets" :key="preset.name" :value="preset.value">
                  {{ preset.name }} ({{ preset.value }}°C/W)
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-gray-300 mb-3">Quick Presets</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-gray-300 transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results Display -->
      <div class="space-y-6">
        <!-- Key Metrics -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-cyan-400 mb-4">⚡ Electrical Analysis</h2>

          <div class="space-y-4">
            <!-- Power Dissipation -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-400">Power Dissipation</span>
                <span class="text-2xl font-bold text-orange-400">{{ powerDissipation.toFixed(2) }}W</span>
              </div>
              <div class="w-full bg-slate-600 rounded-full h-2">
                <div
                  class="bg-orange-500 h-2 rounded-full transition-all"
                  :style="{ width: Math.min(100, (powerDissipation / 20) * 100) + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">P = (V<sub>in</sub> - V<sub>out</sub>) × I</p>
            </div>

            <!-- Efficiency -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-400">Efficiency</span>
                <div class="text-right">
                  <span class="text-2xl font-bold" :class="efficiencyStatus.color">
                    {{ efficiency.toFixed(1) }}%
                  </span>
                  <span class="text-sm ml-2" :class="efficiencyStatus.color">
                    {{ efficiencyStatus.text }}
                  </span>
                </div>
              </div>
              <div class="w-full bg-slate-600 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all"
                  :class="efficiency > 70 ? 'bg-green-500' : efficiency > 50 ? 'bg-yellow-500' : 'bg-red-500'"
                  :style="{ width: efficiency + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">η = P<sub>out</sub> / P<sub>in</sub> × 100%</p>
            </div>

            <!-- Minimum Input Voltage -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Minimum V<sub>in</sub></span>
                <span
                  class="text-xl font-bold"
                  :class="inputVoltage >= minimumInputVoltage ? 'text-green-400' : 'text-red-400'"
                >
                  {{ minimumInputVoltage.toFixed(1) }}V
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-1">V<sub>in(min)</sub> = V<sub>out</sub> + V<sub>do</sub></p>
              <p
                v-if="inputVoltage < minimumInputVoltage"
                class="text-xs text-red-400 mt-2"
              >
                ⚠️ Input voltage too low! Need at least {{ minimumInputVoltage.toFixed(1) }}V
              </p>
            </div>

            <!-- Load Power -->
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-slate-700/50 rounded-lg p-3">
                <div class="text-xs text-gray-400">Input Power</div>
                <div class="text-lg font-bold text-blue-400">{{ (inputVoltage * loadCurrent).toFixed(2) }}W</div>
              </div>
              <div class="bg-slate-700/50 rounded-lg p-3">
                <div class="text-xs text-gray-400">Output Power</div>
                <div class="text-lg font-bold text-green-400">{{ (outputVoltage * loadCurrent).toFixed(2) }}W</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Thermal Analysis -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-orange-400 mb-4">🌡️ Thermal Analysis</h2>

          <div class="space-y-4">
            <!-- Junction Temperature -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-400">Junction Temp (T<sub>J</sub>)</span>
                <div class="text-right">
                  <span class="text-2xl font-bold" :class="thermalStatus.color">
                    {{ junctionTemp.toFixed(1) }}°C
                  </span>
                  <span class="text-sm ml-2" :class="thermalStatus.color">
                    {{ thermalStatus.text }}
                  </span>
                </div>
              </div>
              <div class="w-full bg-slate-600 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all"
                  :class="junctionTemp < 80 ? 'bg-green-500' : junctionTemp < 110 ? 'bg-yellow-500' : junctionTemp < 135 ? 'bg-orange-500' : 'bg-red-500'"
                  :style="{ width: Math.min(100, (junctionTemp / 150) * 100) + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">T<sub>J</sub> = T<sub>A</sub> + (P × θ<sub>JA</sub>)</p>
            </div>

            <!-- Safety Margin -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Safety Margin</span>
                <span
                  class="text-xl font-bold"
                  :class="safeOperatingArea.margin > 50 ? 'text-green-400' : safeOperatingArea.margin > 20 ? 'text-yellow-400' : 'text-red-400'"
                >
                  {{ safeOperatingArea.margin.toFixed(1) }}°C
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                {{ safeOperatingArea.safe ? '✅ Within safe limits (max 150°C)' : '❌ Exceeds maximum!' }}
              </p>
            </div>

            <!-- Heatsink Warning -->
            <div
              v-if="heatsinkRequired"
              class="bg-orange-900/30 border border-orange-700 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <span class="text-2xl">⚠️</span>
                <div>
                  <div class="font-semibold text-orange-400">Heatsink Required</div>
                  <p class="text-sm text-gray-300 mt-1">
                    Use a heatsink with θ<sub>SA</sub> ≤ {{ thermalResistanceMax.toFixed(1) }}°C/W
                  </p>
                  <p class="text-xs text-gray-400 mt-2">
                    Or reduce power dissipation by lowering V<sub>in</sub> or load current
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="!safeOperatingArea.safe"
              class="bg-red-900/30 border border-red-700 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <span class="text-2xl">🔥</span>
                <div>
                  <div class="font-semibold text-red-400">Thermal Overload!</div>
                  <p class="text-sm text-gray-300 mt-1">
                    Junction temperature exceeds safe limits. Component may be damaged!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="space-y-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold text-purple-400 mb-4">📚 Linear Regulators</h2>

        <!-- How It Works -->
        <div class="space-y-4">
          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">How Linear Regulators Work</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              A linear regulator uses a transistor (or FET) operating in its linear region as a variable resistor to drop excess voltage. It maintains a constant output voltage by adjusting resistance based on feedback from the output.
            </p>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Key Formulas</h3>
            <div class="space-y-2 text-sm font-mono">
              <div class="text-gray-300">
                <span class="text-cyan-400">P = (V<sub>in</sub> - V<sub>out</sub>) × I</span>
              </div>
              <div class="text-gray-300">
                <span class="text-cyan-400">η = V<sub>out</sub> / V<sub>in</sub> × 100%</span>
              </div>
              <div class="text-gray-300">
                <span class="text-cyan-400">T<sub>J</sub> = T<sub>A</sub> + (P × θ<sub>JA</sub>)</span>
              </div>
              <div class="text-gray-300">
                <span class="text-cyan-400">V<sub>in(min)</sub> = V<sub>out</sub> + V<sub>do</sub></span>
              </div>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Pros & Cons</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Low noise, clean output</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Fast transient response</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Simple, inexpensive</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400">✗</span>
                <span class="text-gray-300">Low efficiency (especially with high V<sub>in</sub>)</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400">✗</span>
                <span class="text-gray-300">Thermal issues at high power</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Types of Linear Regulators</h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="text-cyan-400 font-medium">Standard (NPN):</span>
                <span class="text-gray-300 ml-2">~2V dropout, robust (78xx series)</span>
              </div>
              <div>
                <span class="text-cyan-400 font-medium">LDO (PNP):</span>
                <span class="text-gray-300 ml-2">~0.2-0.5V dropout, efficient</span>
              </div>
              <div>
                <span class="text-cyan-400 font-medium">Quasi-LDO:</span>
                <span class="text-gray-300 ml-2">~1-1.5V dropout, balanced</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Design Tips</h3>
            <div class="space-y-2 text-sm text-gray-300">
              <p>• Keep V<sub>in</sub> close to V<sub>out</sub> + dropout for best efficiency</p>
              <p>• Use adequate heatsinking for power >1W</p>
              <p>• Add input/output capacitors for stability</p>
              <p>• Consider switching regulators for V<sub>in</sub> >> V<sub>out</sub></p>
              <p>• Watch maximum junction temperature (usually 150°C)</p>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Applications</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">Audio Systems</span>
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">Sensor Power</span>
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">RF Circuits</span>
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">MCU Power</span>
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">Instrumentation</span>
              <span class="px-2 py-1 bg-blue-900/50 rounded text-xs text-gray-300">Low-Noise Rails</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">🔌 Linear Regulator Circuit</h2>
      <div class="flex justify-center">
        <svg viewBox="0 0 800 250" class="w-full max-w-4xl">
          <!-- Background -->
          <rect width="800" height="250" fill="#1e293b"/>

          <!-- Input Section -->
          <text x="50" y="100" fill="#94a3b8" font-size="14" font-weight="bold">Input</text>
          <circle cx="80" cy="130" r="20" fill="none" stroke="#22d3ee" stroke-width="2"/>
          <text x="72" y="135" fill="#22d3ee" font-size="14" font-weight="bold">~</text>
          <text x="55" y="160" fill="#22d3ee" font-size="12">{{ inputVoltage }}V</text>

          <!-- Wire to Regulator -->
          <line x1="100" y1="130" x2="200" y2="130" stroke="#22d3ee" stroke-width="3"/>

          <!-- Linear Regulator Symbol -->
          <rect x="200" y="80" width="150" height="100" fill="#1e40af" stroke="#3b82f6" stroke-width="2" rx="5"/>
          <text x="275" y="115" fill="white" font-size="16" font-weight="bold" text-anchor="middle">Linear</text>
          <text x="275" y="140" fill="white" font-size="16" font-weight="bold" text-anchor="middle">Regulator</text>
          <text x="275" y="165" fill="#fbbf24" font-size="12" text-anchor="middle">{{ outputVoltage }}V</text>

          <!-- Power Dissipation Annotation -->
          <text x="275" y="200" fill="#f97316" font-size="12" text-anchor="middle">P = {{ powerDissipation.toFixed(2) }}W</text>

          <!-- Wire to Output -->
          <line x1="350" y1="130" x2="500" y2="130" stroke="#22c55e" stroke-width="3"/>

          <!-- Output Section -->
          <circle cx="500" cy="130" r="20" fill="none" stroke="#22c55e" stroke-width="2"/>
          <text x="492" y="135" fill="#22c55e" font-size="14" font-weight="bold">+</text>
          <text x="470" y="160" fill="#22c55e" font-size="12">{{ outputVoltage }}V</text>
          <text x="470" y="100" fill="#94a3b8" font-size="14" font-weight="bold">Output</text>

          <!-- Load -->
          <line x1="520" y1="130" x2="600" y2="130" stroke="#22c55e" stroke-width="3"/>
          <rect x="600" y="100" width="80" height="60" fill="#374151" stroke="#6b7280" stroke-width="2" rx="3"/>
          <text x="640" y="135" fill="white" font-size="14" font-weight="bold" text-anchor="middle">LOAD</text>
          <text x="640" y="175" fill="#22c55e" font-size="12" text-anchor="middle">{{ loadCurrent }}A</text>

          <!-- Ground -->
          <line x1="640" y1="160" x2="640" y2="200" stroke="#6b7280" stroke-width="2"/>
          <line x1="620" y1="200" x2="660" y2="200" stroke="#6b7280" stroke-width="2"/>
          <line x1="625" y1="205" x2="655" y2="205" stroke="#6b7280" stroke-width="2"/>
          <line x1="630" y1="210" x2="650" y2="210" stroke="#6b7280" stroke-width="2"/>

          <!-- Efficiency Annotation -->
          <text x="720" y="115" fill="#94a3b8" font-size="14" font-weight="bold">Efficiency</text>
          <text x="720" y="145" :class="efficiency > 70 ? 'fill-green-400' : efficiency > 50 ? 'fill-yellow-400' : 'fill-red-400'" font-size="28" font-weight="bold">{{ efficiency.toFixed(1) }}%</text>
          <text x="720" y="175" fill="#94a3b8" font-size="12">Power Loss:</text>
          <text x="720" y="195" fill="#f97316" font-size="16">{{ powerDissipation.toFixed(2) }}W</text>

          <!-- Heat visualization -->
          <g v-if="powerDissipation > 2">
            <circle cx="275" cy="130" r="60" fill="none" stroke="#f97316" stroke-width="2" stroke-dasharray="5,5" opacity="0.5">
              <animate attributeName="r" values="60;70;60" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite"/>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ 78xx Voltage Regulator Design Calculator
        </h1>
        <p class="text-blue-200 text-lg">
          Complete design tool for 78xx series linear voltage regulators
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-2 gap-6 mb-6">
        <!-- Input Parameters -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
            <span class="mr-2">🎛️</span> Input Parameters
          </h2>

          <!-- Regulator Selection -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              🔌 Regulator Model
            </label>
            <select v-model="regulator" @change="updateRegulator"
                    class="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-blue-500/50 focus:border-blue-400 focus:outline-none">
              <option value="7805">7805 - +5V 1.5A</option>
              <option value="7806">7806 - +6V 1.5A</option>
              <option value="7808">7808 - +8V 1.5A</option>
              <option value="7809">7809 - +9V 1.5A</option>
              <option value="7812">7812 - +12V 1.5A</option>
              <option value="7815">7815 - +15V 1.5A</option>
              <option value="7818">7818 - +18V 1.5A</option>
              <option value="7824">7824 - +24V 1.5A</option>
            </select>
          </div>

          <!-- Input Voltage -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              📥 Input Voltage (Vin): {{ inputVoltage.toFixed(1) }} V
            </label>
            <input type="range" v-model.number="inputVoltage" min="7" max="35" step="0.5"
                   class="w-full accent-blue-500">
            <div class="flex justify-between text-sm text-blue-300 mt-1">
              <span>7 V</span>
              <span>35 V</span>
            </div>
          </div>

          <!-- Output Current -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              ⚡ Output Current (Iout): {{ outputCurrent.toFixed(3) }} A
            </label>
            <input type="range" v-model.number="outputCurrent" min="0.01" max="1.5" step="0.01"
                   class="w-full accent-blue-500">
            <div class="flex justify-between text-sm text-blue-300 mt-1">
              <span>0.01 A</span>
              <span>1.5 A</span>
            </div>
          </div>

          <!-- Ambient Temperature -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              🌡️ Ambient Temperature: {{ ambientTemp.toFixed(0) }} °C
            </label>
            <input type="range" v-model.number="ambientTemp" min="0" max="100" step="5"
                   class="w-full accent-blue-500">
            <div class="flex justify-between text-sm text-blue-300 mt-1">
              <span>0 °C</span>
              <span>100 °C</span>
            </div>
          </div>

          <!-- Ripple Voltage -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              〰️ Input Ripple: {{ rippleVoltage.toFixed(1) }} V
            </label>
            <input type="range" v-model.number="rippleVoltage" min="0.1" max="3" step="0.1"
                   class="w-full accent-blue-500">
            <div class="flex justify-between text-sm text-blue-300 mt-1">
              <span>0.1 V</span>
              <span>3 V</span>
            </div>
          </div>

          <!-- Safety Margin -->
          <div class="mb-4">
            <label class="block text-blue-200 mb-2 font-semibold">
              🛡️ Design Safety Margin: {{ safetyMargin }}%
            </label>
            <input type="range" v-model.number="safetyMargin" min="10" max="50" step="5"
                   class="w-full accent-blue-500">
            <div class="flex justify-between text-sm text-blue-300 mt-1">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        <!-- Circuit Visualization -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
            <span class="mr-2">🔧</span> Circuit Diagram
          </h2>

          <!-- SVG Circuit Diagram -->
          <div class="relative bg-slate-900 rounded-xl p-4">
            <svg viewBox="0 0 400 350" class="w-full h-auto">
              <!-- Background Grid -->
              <defs>
                <pattern id="circuitGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="400" height="350" fill="url(#circuitGrid)" />

              <!-- Input -->
              <circle cx="50" cy="100" r="20" fill="none" stroke="#3b82f6" stroke-width="3"/>
              <text x="50" y="105" text-anchor="middle" fill="#3b82f6" font-size="12" font-weight="bold">IN</text>

              <!-- Wire to Cin -->
              <line x1="70" y1="100" x2="100" y2="100" stroke="#3b82f6" stroke-width="3"/>
              <line x1="100" y1="100" x2="100" y2="130" stroke="#3b82f6" stroke-width="3"/>

              <!-- Input Capacitor Cin -->
              <line x1="90" y1="140" x2="110" y2="140" stroke="#3b82f6" stroke-width="3"/>
              <line x1="90" y1="160" x2="110" y2="160" stroke="#3b82f6" stroke-width="3"/>
              <line x1="100" y1="130" x2="100" y2="140" stroke="#3b82f6" stroke-width="3"/>
              <line x1="100" y1="160" x2="100" y2="180" stroke="#3b82f6" stroke-width="3"/>
              <line x1="100" y1="180" x2="100" y2="250" stroke="#3b82f6" stroke-width="3"/>
              <text x="75" y="155" fill="#60a5fa" font-size="11" font-weight="bold">Cin</text>

              <!-- Wire to Regulator -->
              <line x1="100" y1="100" x2="150" y2="100" stroke="#3b82f6" stroke-width="3"/>
              <line x1="150" y1="100" x2="150" y2="120" stroke="#3b82f6" stroke-width="3"/>
              <line x1="150" y1="100" x2="180" y2="100" stroke="#3b82f6" stroke-width="3"/>

              <!-- 78xx Regulator -->
              <rect x="180" y="80" width="80" height="100" fill="#1e3a8a" stroke="#3b82f6" stroke-width="3" rx="5"/>
              <text x="220" y="115" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">{{ regulator }}</text>
              <text x="220" y="140" text-anchor="middle" fill="#93c5fd" font-size="12">Voltage</text>
              <text x="220" y="160" text-anchor="middle" fill="#93c5fd" font-size="12">Regulator</text>

              <!-- Ground Pin -->
              <line x1="180" y1="150" x2="160" y2="150" stroke="#3b82f6" stroke-width="2"/>
              <line x1="160" y1="150" x2="160" y2="250" stroke="#3b82f6" stroke-width="2"/>
              <circle cx="160" cy="250" r="5" fill="#3b82f6"/>
              <line x1="150" y1="250" x2="170" y2="250" stroke="#3b82f6" stroke-width="2"/>
              <line x1="155" y1="255" x2="165" y2="255" stroke="#3b82f6" stroke-width="2"/>
              <line x1="158" y1="260" x2="162" y2="260" stroke="#3b82f6" stroke-width="2"/>

              <!-- Wire to Cout -->
              <line x1="260" y1="100" x2="300" y2="100" stroke="#3b82f6" stroke-width="3"/>
              <line x1="300" y1="100" x2="300" y2="130" stroke="#3b82f6" stroke-width="3"/>

              <!-- Output Capacitor Cout -->
              <line x1="290" y1="140" x2="310" y2="140" stroke="#3b82f6" stroke-width="3"/>
              <line x1="290" y1="160" x2="310" y2="160" stroke="#3b82f6" stroke-width="3"/>
              <line x1="300" y1="130" x2="300" y2="140" stroke="#3b82f6" stroke-width="3"/>
              <line x1="300" y1="160" x2="300" y2="250" stroke="#3b82f6" stroke-width="3"/>
              <text x="320" y="155" fill="#60a5fa" font-size="11" font-weight="bold">Cout</text>

              <!-- Output -->
              <line x1="300" y1="100" x2="350" y2="100" stroke="#3b82f6" stroke-width="3"/>
              <circle cx="350" cy="100" r="20" fill="none" stroke="#10b981" stroke-width="3"/>
              <text x="350" y="105" text-anchor="middle" fill="#10b981" font-size="12" font-weight="bold">OUT</text>

              <!-- Common Ground -->
              <line x1="100" y1="250" x2="300" y2="250" stroke="#3b82f6" stroke-width="3"/>

              <!-- Voltage Labels -->
              <text x="50" y="70" text-anchor="middle" fill="#60a5fa" font-size="12">{{ inputVoltage.toFixed(1) }}V</text>
              <text x="350" y="70" text-anchor="middle" fill="#34d399" font-size="12">{{ outputVoltage.toFixed(1) }}V</text>
              <text x="220" y="65" text-anchor="middle" fill="#f87171" font-size="11">{{ voltageDrop.toFixed(1) }}V drop</text>

              <!-- Current Flow Arrow -->
              <path d="M 80 85 L 110 85" stroke="#fbbf24" stroke-width="2" marker-end="url(#arrowhead)"/>
              <text x="95" y="78" fill="#fbbf24" font-size="10">{{ outputCurrent.toFixed(2) }}A</text>

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#fbbf24"/>
                </marker>
              </defs>
            </svg>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-3 mt-4">
            <div class="bg-slate-900/50 rounded-lg p-3 text-center">
              <p class="text-blue-300 text-sm">Voltage Drop</p>
              <p class="text-xl font-bold text-white">{{ voltageDrop.toFixed(1) }} V</p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-3 text-center">
              <p class="text-blue-300 text-sm">Efficiency</p>
              <p class="text-xl font-bold text-white">{{ efficiency.toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Component Values -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">🔌</span> Recommended Components
        </h2>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- Input Capacitor -->
          <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
            <h3 class="text-purple-300 font-bold text-lg mb-3">📥 Input Capacitor (Cin)</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-white">Value:</span>
                <span class="text-xl font-bold text-white">{{ inputCapacitor.toFixed(1) }} µF</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-white">Min Voltage:</span>
                <span class="text-lg font-bold text-purple-300">{{ cinVoltageRating }}V</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-white">Type:</span>
                <span class="text-lg font-bold text-purple-300">Electrolytic</span>
              </div>
            </div>
            <p class="text-purple-200 text-sm mt-3">
              💡 Improves stability and reduces input ripple. Place close to regulator.
            </p>
          </div>

          <!-- Output Capacitor -->
          <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
            <h3 class="text-green-300 font-bold text-lg mb-3">📤 Output Capacitor (Cout)</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-white">Value:</span>
                <span class="text-xl font-bold text-white">{{ outputCapacitor.toFixed(1) }} µF</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-white">Min Voltage:</span>
                <span class="text-lg font-bold text-green-300">{{ coutVoltageRating }}V</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-white">Type:</span>
                <span class="text-lg font-bold text-green-300">Tantalum/Electrolytic</span>
              </div>
            </div>
            <p class="text-green-200 text-sm mt-3">
              💡 Improves transient response. Add 0.1µF ceramic for high frequencies.
            </p>
          </div>
        </div>
      </div>

      <!-- Thermal Analysis -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">🌡️</span> Thermal Analysis
        </h2>

        <div class="grid md:grid-cols-4 gap-4 mb-4">
          <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
            <h3 class="text-orange-300 font-semibold mb-2">Power Dissipation</h3>
            <p class="text-3xl font-bold text-white">{{ powerDissipation.toFixed(2) }} W</p>
          </div>

          <div class="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-4 border border-red-500/30">
            <h3 class="text-red-300 font-semibold mb-2">Junction Temp</h3>
            <p :class="`text-3xl font-bold ${junctionTemp > 125 ? 'text-red-400' : junctionTemp > 100 ? 'text-orange-400' : 'text-white'}`">
              {{ junctionTemp.toFixed(0) }} °C
            </p>
          </div>

          <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
            <h3 class="text-blue-300 font-semibold mb-2">Thermal Resistance</h3>
            <p class="text-3xl font-bold text-white">{{ thermalResistance.toFixed(1) }} °C/W</p>
          </div>

          <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
            <h3 class="text-green-300 font-semibold mb-2">Heatsink Needed?</h3>
            <p :class="`text-3xl font-bold ${needsHeatsink ? 'text-red-400' : 'text-green-400'}`">
              {{ needsHeatsink ? 'YES' : 'NO' }}
            </p>
          </div>
        </div>

        <!-- Thermal Status -->
        <div :class="`rounded-xl p-4 border-2 ${thermalStatus.class}`">
          <h3 class="font-bold text-lg mb-2">{{ thermalStatus.icon }} {{ thermalStatus.title }}</h3>
          <p class="text-sm">{{ thermalStatus.message }}</p>
        </div>

        <!-- Heatsink Recommendation -->
        <div v-if="needsHeatsink" class="mt-4 bg-slate-900/50 rounded-xl p-4">
          <h3 class="text-white font-bold mb-2">🔧 Heatsink Requirements:</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-blue-300">Required Thermal Resistance:</p>
              <p class="text-2xl font-bold text-white">≤ {{ requiredHeatsinkRating.toFixed(1) }} °C/W</p>
            </div>
            <div>
              <p class="text-blue-300">With {{ safetyMargin }}% Safety Margin:</p>
              <p class="text-2xl font-bold text-white">≤ {{ (requiredHeatsinkRating * (100 - safetyMargin) / 100).toFixed(1) }} °C/W</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Design Validation -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">✅</span> Design Validation
        </h2>

        <div class="grid md:grid-cols-2 gap-4">
          <div v-for="(check, index) in validationChecks" :key="index"
               :class="`rounded-lg p-3 border-2 ${check.pass ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`">
            <div class="flex items-center">
              <span class="text-2xl mr-3">{{ check.pass ? '✅' : '❌' }}</span>
              <div>
                <p class="font-bold text-white">{{ check.name }}</p>
                <p class="text-sm" :class="check.pass ? 'text-green-300' : 'text-red-300'">{{ check.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">📚</span> Understanding 78xx Regulators
        </h2>

        <div class="space-y-4 text-blue-100">
          <div>
            <h3 class="text-lg font-bold text-blue-300 mb-2">⚡ How 78xx Regulators Work</h3>
            <p>
              The 78xx series are three-terminal positive voltage regulators that use a series pass transistor 
              to maintain a constant output voltage. They internally monitor the output voltage and adjust 
              the pass transistor's resistance to compensate for input voltage or load current changes.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-bold text-blue-300 mb-2">📐 Key Design Considerations:</h3>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>Dropout Voltage:</strong> Input must be 2-3V higher than output for proper regulation</li>
              <li><strong>Power Dissipation:</strong> P = (Vin - Vout) × Iout — heatsink needed for high currents</li>
              <li><strong>Stability:</strong> Input and output capacitors improve stability and transient response</li>
              <li><strong>Maximum Junction Temperature:</strong> Keep below 125°C for reliable operation</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-blue-300 mb-2">🌡️ Thermal Management</h3>
            <p>
              The thermal resistance from junction to ambient (θJA) determines temperature rise:
            </p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Without heatsink: θJA ≈ 50-65°C/W (TO-220 package)</li>
              <li>With heatsink: θJA can be reduced to 10-30°C/W</li>
              <li>Use thermal compound for better heat transfer</li>
              <li>Consider forced air cooling for high power applications</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-blue-300 mb-2">🔌 Capacitor Selection</h3>
            <div class="grid md:grid-cols-2 gap-3 mt-2">
              <div class="bg-slate-800/50 rounded-lg p-3">
                <strong class="text-purple-400">Input Capacitor:</strong>
                <p class="text-sm">0.33µF to 10µF — prevents oscillation and improves ripple rejection</p>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-3">
                <strong class="text-green-400">Output Capacitor:</strong>
                <p class="text-sm">0.1µF to 1µF — improves transient response and stability</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold text-blue-300 mb-2">⚠️ Common Mistakes to Avoid</h3>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Forgetting input capacitor → oscillation and instability</li>
              <li>Input voltage too close to output → poor regulation</li>
              <li>Exceeding maximum input voltage (35V) → device damage</li>
              <li>Not using heatsink for high power → thermal shutdown</li>
              <li>Reversing input polarity → permanent damage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Regulator specifications
const regulators = {
  '7805': { voltage: 5, maxCurrent: 1.5, dropout: 2.0 },
  '7806': { voltage: 6, maxCurrent: 1.5, dropout: 2.0 },
  '7808': { voltage: 8, maxCurrent: 1.5, dropout: 2.0 },
  '7809': { voltage: 9, maxCurrent: 1.5, dropout: 2.0 },
  '7812': { voltage: 12, maxCurrent: 1.5, dropout: 2.0 },
  '7815': { voltage: 15, maxCurrent: 1.5, dropout: 2.5 },
  '7818': { voltage: 18, maxCurrent: 1.5, dropout: 2.5 },
  '7824': { voltage: 24, maxCurrent: 1.5, dropout: 2.5 }
}

// Input state
const regulator = ref('7812')
const inputVoltage = ref(18)
const outputCurrent = ref(0.5)
const ambientTemp = ref(25)
const rippleVoltage = ref(1.0)
const safetyMargin = ref(20)

// Derived values
const outputVoltage = computed(() => regulators[regulator.value].voltage)
const dropoutVoltage = computed(() => regulators[regulator.value].dropout)
const voltageDrop = computed(() => inputVoltage.value - outputVoltage.value)
const efficiency = computed(() => {
  if (inputVoltage.value <= 0) return 0
  return (outputVoltage.value / inputVoltage.value) * 100
})

// Power calculations
const powerDissipation = computed(() => {
  return voltageDrop.value * outputCurrent.value
})

// Thermal calculations (TO-220 package)
const thermalResistanceJunctionToCase = ref(5) // °C/W (typical for TO-220)
const thermalResistanceCaseToAmbientNoHeatsink = ref(50) // °C/W (no heatsink)
const thermalResistanceWithHeatsink = ref(20) // °C/W (with heatsink)

const thermalResistance = computed(() => {
  return needsHeatsink.value ? thermalResistanceWithHeatsink.value : thermalResistanceCaseToAmbientNoHeatsink.value
})

const junctionTemp = computed(() => {
  return ambientTemp.value + (powerDissipation.value * thermalResistance.value)
})

const needsHeatsink = computed(() => {
  return junctionTemp.value > 100 || powerDissipation.value > 1.0
})

const requiredHeatsinkRating = computed(() => {
  const maxTempRise = 125 - ambientTemp.value
  const maxAllowedTheta = maxTempRise / powerDissipation.value - thermalResistanceJunctionToCase.value
  return maxAllowedTheta
})

const thermalStatus = computed(() => {
  if (junctionTemp.value > 125) {
    return {
      icon: '🔴',
      title: 'CRITICAL: Junction temperature exceeded!',
      message: 'You MUST use a larger heatsink or reduce power dissipation.',
      class: 'bg-red-500/20 border-red-500'
    }
  } else if (junctionTemp.value > 100) {
    return {
      icon: '🟠',
      title: 'WARNING: High temperature',
      message: 'Heatsink required. Consider improving thermal management.',
      class: 'bg-orange-500/20 border-orange-500'
    }
  } else if (junctionTemp.value > 80) {
    return {
      icon: '🟡',
      title: 'CAUTION: Elevated temperature',
      message: 'Monitor temperature during operation. Heatsink recommended for continuous use.',
      class: 'bg-yellow-500/20 border-yellow-500'
    }
  } else {
    return {
      icon: '🟢',
      title: 'OK: Temperature within safe limits',
      message: 'No heatsink required for this operating condition.',
      class: 'bg-green-500/20 border-green-500'
    }
  }
})

// Capacitor calculations
const inputCapacitor = computed(() => {
  // 0.33µF per 100mA, minimum 0.33µF, max 10µF
  const baseValue = 0.33 * (outputCurrent.value / 0.1)
  return Math.min(Math.max(baseValue, 0.33), 10)
})

const outputCapacitor = computed(() => {
  // 0.1µF per 100mA, minimum 0.1µF, max 1µF
  const baseValue = 0.1 * (outputCurrent.value / 0.1)
  return Math.min(Math.max(baseValue, 0.1), 1)
})

const cinVoltageRating = computed(() => {
  // Must withstand max input voltage + 20% margin
  return Math.ceil(inputVoltage.value * 1.2 / 5) * 5 // Round to nearest 5V
})

const coutVoltageRating = computed(() => {
  // Must withstand output voltage + 20% margin
  return Math.ceil(outputVoltage.value * 1.2 / 5) * 5 // Round to nearest 5V
})

// Validation checks
const validationChecks = computed(() => {
  const checks = [
    {
      name: 'Input Voltage Range',
      pass: inputVoltage.value >= outputVoltage.value + dropoutVoltage.value && inputVoltage.value <= 35,
      status: inputVoltage.value < outputVoltage.value + dropoutVoltage.value 
        ? `Need ${outputVoltage.value + dropoutVoltage.value}V minimum`
        : inputVoltage.value > 35 
          ? 'Exceeds 35V maximum'
          : 'Within 7V-35V range ✓'
    },
    {
      name: 'Current Limit',
      pass: outputCurrent.value <= regulators[regulator.value].maxCurrent,
      status: outputCurrent.value > regulators[regulator.value].maxCurrent
        ? `Exceeds ${regulators[regulator.value].maxCurrent}A limit`
        : 'Within 1.5A limit ✓'
    },
    {
      name: 'Power Dissipation',
      pass: powerDissipation.value <= 15,
      status: powerDissipation.value > 15
        ? 'Exceeds 15W - needs large heatsink'
        : 'Manageable with proper heatsink ✓'
    },
    {
      name: 'Thermal Safety',
      pass: junctionTemp.value <= 125,
      status: junctionTemp.value > 125
        ? 'Junction temp exceeds 125°C!'
        : `Junction at ${junctionTemp.toFixed(0)}°C (max 125°C) ✓`
    },
    {
      name: 'Dropout Voltage',
      pass: voltageDrop.value >= dropoutVoltage.value,
      status: voltageDrop.value < dropoutVoltage.value
        ? `Need ${voltageDrop.value.toFixed(1)}V more`
        : `Sufficient headroom (${voltageDrop.value.toFixed(1)}V) ✓`
    },
    {
      name: 'Ripple Rejection',
      pass: rippleVoltage.value <= 2.0,
      status: rippleVoltage.value > 2.0
        ? 'High ripple - add filtering'
        : 'Ripple within acceptable range ✓'
    }
  ]

  return checks
})

const updateRegulator = () => {
  // Reset to recommended input voltage when switching regulators
  inputVoltage.value = regulators[regulator.value].voltage + 6
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputVoltage = ref(12)
const outputVoltage = ref(5)
const maxLoadCurrent = ref(1)
const dropoutVoltage = ref(2)
const quiescentCurrent = ref(0.005)
const thermalResistanceJC = ref(5)
const heatsinkThermalResistance = ref(20)
const ambientTemperature = ref(25)

const selectedRegulator = ref('custom')

const regulators = [
  { name: 'Custom', dropout: 0, quiescent: 0 },
  { name: '7805', dropout: 2, quiescent: 0.005 },
  { name: '7812', dropout: 2, quiescent: 0.005 },
  { name: 'LM317', dropout: 1.5, quiescent: 0.005 },
  { name: 'LM1117', dropout: 1.2, quiescent: 0.005 },
  { name: 'AMS1117', dropout: 1.1, quiescent: 0.005 },
  { name: 'LT1086', dropout: 1.3, quiescent: 0.006 },
]

const selectRegulator = (reg: any) => {
  selectedRegulator.value = reg.name
  if (reg.name !== 'Custom') {
    dropoutVoltage.value = reg.dropout
    quiescentCurrent.value = reg.quiescent
    outputVoltage.value = reg.name === '7805' ? 5 : reg.name === '7812' ? 12 : outputVoltage.value
  }
}

const powerDissipation = computed(() => {
  const pd = (inputVoltage.value - outputVoltage.value) * maxLoadCurrent.value
  const pq = quiescentCurrent.value * inputVoltage.value
  return pd + pq
})

const minInputVoltage = computed(() => {
  return outputVoltage.value + dropoutVoltage.value
})

const junctionTemperature = computed(() => {
  const totalThermalResistance = thermalResistanceJC.value + heatsinkThermalResistance.value
  return ambientTemperature.value + (powerDissipation.value * totalThermalResistance)
})

const maxHeatsinkResistance = computed(() => {
  const maxJunctionTemp = 125
  const maxAllowableRise = maxJunctionTemp - ambientTemperature.value
  const maxThermalResistance = maxAllowableRise / powerDissipation.value
  return Math.max(0, maxThermalResistance - thermalResistanceJC.value)
})

const efficiency = computed(() => {
  const outputPower = outputVoltage.value * maxLoadCurrent.value
  const inputPower = inputVoltage.value * maxLoadCurrent.value + (quiescentCurrent.value * inputVoltage.value)
  return (outputPower / inputPower) * 100
})

const loadRegulation = computed(() => {
  const voltageDrop = maxLoadCurrent.value * 0.1
  return (voltageDrop / outputVoltage.value) * 100
})

const powerChartData = computed(() => {
  const data = []
  for (let vin = minInputVoltage.value; vin <= 30; vin += 0.5) {
    const pd = (vin - outputVoltage.value) * maxLoadCurrent.value
    const pq = quiescentCurrent.value * vin
    data.push({ vin: vin.toFixed(1), power: (pd + pq).toFixed(2) })
  }
  return data
})

const currentPointPower = computed(() => {
  const pd = (inputVoltage.value - outputVoltage.value) * maxLoadCurrent.value
  const pq = quiescentCurrent.value * inputVoltage.value
  return pd + pq
})

const needsHeatsink = computed(() => {
  return powerDissipation.value > 0.5 || junctionTemperature.value > 100
})

const maxSafeCurrent = computed(() => {
  const maxJunctionTemp = 125
  const maxAllowableRise = maxJunctionTemp - ambientTemperature.value
  const totalThermalResistance = thermalResistanceJC.value + heatsinkThermalResistance.value
  const maxPower = maxAllowableRise / totalThermalResistance
  const maxCurrent = maxPower / (inputVoltage.value - outputVoltage.value)
  return Math.max(0, maxCurrent)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Linear Voltage Regulator Design Calculator
        </h1>
        <p class="text-slate-400">Calculate power dissipation, thermal requirements, and efficiency for linear regulators</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 text-sm">⚡</span>
              Input Parameters
            </h2>

            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">Regulator Preset</label>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="reg in regulators"
                  :key="reg.name"
                  @click="selectRegulator(reg)"
                  :class="[
                    'px-3 py-2 text-xs font-medium rounded-lg transition-all',
                    selectedRegulator === reg.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ reg.name }}
                </button>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Input Voltage (V_in)</span>
                <span class="text-blue-400">{{ inputVoltage.toFixed(1) }}V</span>
              </label>
              <input
                type="range"
                v-model.number="inputVoltage"
                min="5"
                max="30"
                step="0.5"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>5V</span>
                <span>30V</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Output Voltage (V_out)</span>
                <span class="text-cyan-400">{{ outputVoltage.toFixed(1) }}V</span>
              </label>
              <input
                type="range"
                v-model.number="outputVoltage"
                min="1.2"
                max="24"
                step="0.1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>1.2V</span>
                <span>24V</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Max Load Current (I_load)</span>
                <span class="text-green-400">{{ maxLoadCurrent.toFixed(2) }}A</span>
              </label>
              <input
                type="range"
                v-model.number="maxLoadCurrent"
                min="0.01"
                max="5"
                step="0.01"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>0.01A</span>
                <span>5A</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Dropout Voltage</span>
                <span class="text-yellow-400">{{ dropoutVoltage.toFixed(1) }}V</span>
              </label>
              <input
                type="range"
                v-model.number="dropoutVoltage"
                min="0.5"
                max="3"
                step="0.1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>0.5V</span>
                <span>3V</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Quiescent Current (I_q)</span>
                <span class="text-purple-400">{{ (quiescentCurrent * 1000).toFixed(1) }}mA</span>
              </label>
              <input
                type="range"
                v-model.number="quiescentCurrent"
                min="0.001"
                max="0.02"
                step="0.001"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>1mA</span>
                <span>20mA</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Ambient Temperature</span>
                <span class="text-orange-400">{{ ambientTemperature.toFixed(0) }}°C</span>
              </label>
              <input
                type="range"
                v-model.number="ambientTemperature"
                min="0"
                max="70"
                step="1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>0°C</span>
                <span>70°C</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <span class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3 text-sm">🌡️</span>
              Thermal Parameters
            </h2>

            <div class="mb-4">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>θ_JC (Junction to Case)</span>
                <span class="text-red-400">{{ thermalResistanceJC.toFixed(1) }}°C/W</span>
              </label>
              <input
                type="range"
                v-model.number="thermalResistanceJC"
                min="0.5"
                max="10"
                step="0.5"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            <div class="mb-4">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>θ_HEATSINK (Case to Ambient)</span>
                <span class="text-orange-400">{{ heatsinkThermalResistance.toFixed(1) }}°C/W</span>
              </label>
              <input
                type="range"
                v-model.number="heatsinkThermalResistance"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur rounded-xl p-5 border border-red-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-red-300 text-sm font-medium">Power Dissipation</span>
                <span class="text-2xl">🔥</span>
              </div>
              <div class="text-3xl font-bold text-red-400 mb-1">
                {{ powerDissipation.toFixed(2) }}W
              </div>
              <div class="text-xs text-slate-400">
                P_d = (V_in - V_out) × I_load + P_quiescent
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-900/40 to-orange-800/20 backdrop-blur rounded-xl p-5 border border-orange-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-orange-300 text-sm font-medium">Junction Temperature</span>
                <span class="text-2xl">🌡️</span>
              </div>
              <div class="text-3xl font-bold mb-1"
                   :class="junctionTemperature > 100 ? 'text-red-400' : junctionTemperature > 80 ? 'text-orange-400' : 'text-green-400'">
                {{ junctionTemperature.toFixed(1) }}°C
              </div>
              <div class="text-xs text-slate-400">
                Max safe: 125°C | Current: {{ junctionTemperature.toFixed(1) }}°C
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur rounded-xl p-5 border border-green-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-green-300 text-sm font-medium">Efficiency</span>
                <span class="text-2xl">⚡</span>
              </div>
              <div class="text-3xl font-bold text-green-400 mb-1">
                {{ efficiency.toFixed(1) }}%
              </div>
              <div class="text-xs text-slate-400">
                η = (P_out / P_in) × 100
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur rounded-xl p-5 border border-blue-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-blue-300 text-sm font-medium">Min Input Voltage</span>
                <span class="text-2xl">⬇️</span>
              </div>
              <div class="text-3xl font-bold mb-1"
                   :class="inputVoltage < minInputVoltage ? 'text-red-400' : 'text-green-400'">
                {{ minInputVoltage.toFixed(1) }}V
              </div>
              <div class="text-xs text-slate-400">
                V_in(min) = V_out + V_dropout
              </div>
            </div>
          </div>

          <div v-if="inputVoltage < minInputVoltage" class="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-4">
            <div class="flex items-center">
              <span class="text-2xl mr-3">⚠️</span>
              <div>
                <div class="text-red-300 font-semibold">Input voltage too low!</div>
                <div class="text-sm text-slate-300">Increase V_in to at least {{ minInputVoltage.toFixed(1) }}V for proper regulation</div>
              </div>
            </div>
          </div>

          <div v-if="junctionTemperature > 100" class="bg-orange-900/30 border border-orange-700 rounded-xl p-4 mb-4">
            <div class="flex items-center">
              <span class="text-2xl mr-3">🔥</span>
              <div>
                <div class="text-orange-300 font-semibold">Thermal warning!</div>
                <div class="text-sm text-slate-300">Junction temperature exceeds 100°C. Better heatsink required.</div>
              </div>
            </div>
          </div>

          <div v-if="needsHeatsink && junctionTemperature <= 100" class="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4 mb-4">
            <div class="flex items-center">
              <span class="text-2xl mr-3">💡</span>
              <div>
                <div class="text-yellow-300 font-semibold">Heatsink recommended</div>
                <div class="text-sm text-slate-300">Power dissipation > 0.5W. A heatsink will improve reliability.</div>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Power Dissipation vs Input Voltage</h3>
            <div class="relative h-48">
              <svg viewBox="0 0 600 180" class="w-full h-full">
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f97316" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                
                <line v-for="i in 6" :key="'h'+i" 
                      :x1="60" :y1="20 + (i-1)*25" :x2="580" :y2="20 + (i-1)*25"
                      stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
                <line v-for="i in 11" :key="'v'+i"
                      :x1="60 + (i-1)*50" :y1="20" :x2="60 + (i-1)*50" :y2="145"
                      stroke="#334155" stroke-width="1" stroke-dasharray="4"/>

                <path :d="powerChartData.map((p, i) => 
                  `${i === 0 ? 'M' : 'L'} ${60 + ((parseFloat(p.vin) - 5) / 25) * 520} ${145 - (parseFloat(p.power) / 15) * 125}`
                ).join(' ')"
                      fill="url(#powerGradient)" stroke="#f97316" stroke-width="2"/>

                <circle :cx="60 + ((inputVoltage - 5) / 25) * 520"
                        :cy="145 - (currentPointPower / 15) * 125"
                        r="6" fill="#3b82f6" stroke="white" stroke-width="2"/>
                
                <text :x="60 + ((inputVoltage - 5) / 25) * 520"
                      :y="145 - (currentPointPower / 15) * 125 - 15"
                      text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">
                  {{ currentPointPower.toFixed(2) }}W @ {{ inputVoltage }}V
                </text>

                <line x1="60" y1="145" x2="580" y2="145" stroke="#94a3b8" stroke-width="2"/>
                <line x1="60" y1="145" x2="60" y2="20" stroke="#94a3b8" stroke-width="2"/>

                <text x="50" y="145" text-anchor="end" fill="#94a3b8" font-size="10">0W</text>
                <text x="50" y="83" text-anchor="end" fill="#94a3b8" font-size="10">7.5W</text>
                <text x="50" y="25" text-anchor="end" fill="#94a3b8" font-size="10">15W</text>

                <text x="60" y="165" text-anchor="middle" fill="#94a3b8" font-size="10">5V</text>
                <text x="320" y="165" text-anchor="middle" fill="#94a3b8" font-size="10">17.5V</text>
                <text x="580" y="165" text-anchor="middle" fill="#94a3b8" font-size="10">30V</text>

                <text x="320" y="178" text-anchor="middle" fill="#94a3b8" font-size="11">Input Voltage (V)</text>
                <text x="15" y="82" text-anchor="middle" fill="#94a3b8" font-size="11" transform="rotate(-90, 15, 82)">Power (W)</text>
              </svg>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Detailed Analysis</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-slate-300 mb-3">Power Breakdown</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-sm">Load dissipation</span>
                    <span class="text-white font-mono">
                      {{ ((inputVoltage - outputVoltage) * maxLoadCurrent).toFixed(3) }}W
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-sm">Quiescent power</span>
                    <span class="text-white font-mono">
                      {{ (quiescentCurrent * inputVoltage).toFixed(3) }}W
                    </span>
                  </div>
                  <div class="border-t border-slate-600 pt-2 flex justify-between items-center">
                    <span class="text-slate-300 font-medium">Total</span>
                    <span class="text-blue-400 font-mono font-bold">{{ powerDissipation.toFixed(3) }}W</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-slate-300 mb-3">Thermal Analysis</h4>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-sm">Total θ (JA)</span>
                    <span class="text-white font-mono">
                      {{ (thermalResistanceJC + heatsinkThermalResistance).toFixed(1) }}°C/W
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-sm">Temp rise</span>
                    <span class="text-white font-mono">
                      {{ (powerDissipation * (thermalResistanceJC + heatsinkThermalResistance)).toFixed(1) }}°C
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-slate-400 text-sm">Max safe heatsink θ</span>
                    <span class="text-white font-mono">
                      {{ maxHeatsinkResistance.toFixed(1) }}°C/W
                    </span>
                  </div>
                  <div class="border-t border-slate-600 pt-2 flex justify-between items-center">
                    <span class="text-slate-300 font-medium">Max safe current</span>
                    <span class="text-green-400 font-mono font-bold">
                      {{ maxSafeCurrent.toFixed(2) }}A
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Thermal Resistance Diagram</h3>
            <div class="flex items-center justify-center">
              <svg viewBox="0 0 500 120" class="w-full max-w-lg">
                <rect x="50" y="40" width="80" height="40" rx="4" fill="#ef4444" opacity="0.9"/>
                <text x="90" y="65" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Junction</text>
                <text x="90" y="100" text-anchor="middle" fill="#ef4444" font-size="11">{{ junctionTemperature.toFixed(1) }}°C</text>
                
                <line x1="130" y1="60" x2="170" y2="60" stroke="#f97316" stroke-width="3" marker-end="url(#arrowhead)"/>
                <text x="150" y="50" text-anchor="middle" fill="#f97316" font-size="10">θ_JC: {{ thermalResistanceJC }}°C/W</text>
                
                <rect x="170" y="40" width="80" height="40" rx="4" fill="#f97316" opacity="0.9"/>
                <text x="210" y="65" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Case</text>
                <text x="210" y="100" text-anchor="middle" fill="#f97316" font-size="11">
                  {{ (junctionTemperature - powerDissipation * thermalResistanceJC).toFixed(1) }}°C
                </text>
                
                <line x1="250" y1="60" x2="290" y2="60" stroke="#eab308" stroke-width="3" marker-end="url(#arrowhead2)"/>
                <text x="270" y="50" text-anchor="middle" fill="#eab308" font-size="10">θ_HS: {{ heatsinkThermalResistance }}°C/W</text>
                
                <rect x="290" y="35" width="80" height="50" rx="4" fill="#eab308" opacity="0.9"/>
                <text x="330" y="62" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Heatsink</text>
                <text x="330" y="100" text-anchor="middle" fill="#eab308" font-size="11">
                  {{ (junctionTemperature - powerDissipation * (thermalResistanceJC + heatsinkThermalResistance)).toFixed(1) }}°C
                </text>
                
                <line x1="370" y1="60" x2="410" y2="60" stroke="#22c55e" stroke-width="3" stroke-dasharray="4"/>
                <text x="440" y="65" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="bold">Ambient</text>
                <text x="440" y="85" text-anchor="middle" fill="#22c55e" font-size="11">{{ ambientTemperature }}°C</text>

                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#f97316"/>
                  </marker>
                  <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#eab308"/>
                  </marker>
                </defs>
              </svg>
            </div>
            <p class="text-center text-xs text-slate-400 mt-3">
              Heat flows from junction → case → heatsink → ambient
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <span class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 text-sm">📚</span>
          Linear Regulator Fundamentals
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-medium text-blue-400 mb-3">How Linear Regulators Work</h3>
            <p class="text-slate-300 text-sm leading-relaxed mb-3">
              A linear voltage regulator uses a pass transistor (BJT or MOSFET) operating in its linear region to maintain a constant output voltage. It acts like a variable resistor that adjusts automatically to compensate for changes in input voltage or load current.
            </p>
            <p class="text-slate-300 text-sm leading-relaxed mb-3">
              The key difference between input and output voltage is dropped across the pass transistor, dissipating power as heat: <span class="text-cyan-400 font-mono">P_d = (V_in - V_out) × I_load</span>
            </p>
            <h4 class="text-md font-medium text-cyan-400 mb-2 mt-4">Key Characteristics:</h4>
            <ul class="text-slate-300 text-sm space-y-1">
              <li>• <strong class="text-white">Low noise & ripple:</strong> Excellent for sensitive analog circuits</li>
              <li>• <strong class="text-white">Fast response:</strong> Quick transient response to load changes</li>
              <li>• <strong class="text-white">Simple design:</strong> Few external components needed</li>
              <li>• <strong class="text-white">Poor efficiency:</strong> Especially with large V_in-V_out difference</li>
              <li>• <strong class="text-white">Heat generation:</strong> Requires thermal management at high power</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-medium text-blue-400 mb-3">Key Formulas</h3>
            <div class="space-y-3 text-sm">
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">P_dissipation = (V_in - V_out) × I_load + P_quiescent</div>
                <div class="text-slate-400 text-xs">Total power dissipated as heat</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">V_in(min) = V_out + V_dropout</div>
                <div class="text-slate-400 text-xs">Minimum input for regulation</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">T_junction = T_ambient + (P_d × θ_JA)</div>
                <div class="text-slate-400 text-xs">Junction temperature calculation</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">η = (P_out / P_in) × 100</div>
                <div class="text-slate-400 text-xs">Efficiency percentage</div>
              </div>
            </div>

            <h4 class="text-md font-medium text-yellow-400 mb-2 mt-4">When to Use Linear Regulators:</h4>
            <ul class="text-slate-300 text-sm space-y-1">
              <li>• Low power applications (&lt;1W)</li>
              <li>• Low noise requirements (audio, RF, instrumentation)</li>
              <li>• Small voltage differential (V_in close to V_out)</li>
              <li>• Simple, cost-effective solutions</li>
              <li>• When switching noise is unacceptable</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
          <h4 class="text-md font-medium text-orange-400 mb-2">💡 Design Tips</h4>
          <ul class="text-slate-300 text-sm space-y-2">
            <li>• Keep V_in as close to V_out + V_dropout as possible for best efficiency</li>
            <li>• Always calculate worst-case power dissipation at maximum input voltage and load current</li>
            <li>• Use a heatsink when power dissipation exceeds 0.5W or junction temperature exceeds 100°C</li>
            <li>• Consider switching pre-regulator for large V_in-V_out differences</li>
            <li>• Add input and output capacitors close to the regulator for stability</li>
            <li>• Check the datasheet for minimum capacitor values and ESR requirements</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

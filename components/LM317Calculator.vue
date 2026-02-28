<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🔋 LM317 Voltage Regulator Calculator
    </h3>

    <!-- Regulator Diagram -->
    <div class="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 700 350" class="w-full h-auto">
        <!-- Background Grid -->
        <defs>
          <pattern id="regGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
          </pattern>
        </defs>
        <rect width="700" height="350" fill="url(#regGrid)" />

        <!-- LM317 Package -->
        <rect x="280" y="80" width="140" height="180" fill="#1f2937" stroke="#374151" stroke-width="3" rx="5"/>
        <text x="350" y="120" text-anchor="middle" fill="white" font-size="22" font-weight="bold">LM317</text>
        <text x="350" y="145" text-anchor="middle" fill="#9ca3af" font-size="13">Adjustable</text>
        <text x="350" y="165" text-anchor="middle" fill="#9ca3af" font-size="13">Regulator</text>

        <!-- Pin Labels -->
        <!-- Pin 1: Adjust -->
        <text x="220" y="140" fill="#f59e0b" font-size="12" font-weight="bold">ADJ (1)</text>
        <line x1="220" y1="140" x2="280" y2="140" stroke="#f59e0b" stroke-width="3"/>

        <!-- Pin 2: Output -->
        <text x="220" y="200" fill="#10b981" font-size="12" font-weight="bold">Vout (2)</text>
        <line x1="220" y1="200" x2="280" y2="200" stroke="#10b981" stroke-width="3"/>

        <!-- Pin 3: Input -->
        <text x="220" y="260" fill="#3b82f6" font-size="12" font-weight="bold">Vin (3)</text>
        <line x1="220" y1="260" x2="280" y2="260" stroke="#3b82f6" stroke-width="3"/>

        <!-- Tab: Metal tab is also connected to output -->
        <text x="420" y="140" fill="#10b981" font-size="10" font-weight="bold">Tab = Vout</text>
        <line x1="420" y1="140" x2="420" y2="180" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3"/>

        <!-- Input Circuit (Left) -->
        <text x="80" y="260" fill="#3b82f6" font-size="14" font-weight="bold" text-anchor="middle">Vin</text>
        <text x="80" y="280" fill="#3b82f6" font-size="12" text-anchor="middle">{{ inputVoltage }}V</text>
        
        <!-- Input capacitor C1 -->
        <g transform="translate(130, 260)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#374151" stroke-width="3"/>
          <line x1="-12" y1="15" x2="12" y2="15" stroke="#374151" stroke-width="3"/>
          <line x1="-12" y1="22" x2="12" y2="22" stroke="#374151" stroke-width="3"/>
          <line x1="0" y1="22" x2="0" y2="35" stroke="#374151" stroke-width="3"/>
          <text x="0" y="-20" text-anchor="middle" fill="#374151" font-size="10">C1</text>
          <text x="0" y="45" text-anchor="middle" fill="#374151" font-size="9">0.1µF</text>
        </g>

        <!-- Wire from Vin to C1 to regulator -->
        <line x1="100" y1="260" x2="130" y2="260" stroke="#3b82f6" stroke-width="3"/>
        <line x1="130" y1="260" x2="220" y2="260" stroke="#3b82f6" stroke-width="3"/>

        <!-- R1 from Output to Adjust -->
        <rect x="200" y="130" width="60" height="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
        <text x="230" y="145" text-anchor="middle" fill="#b45309" font-size="11" font-weight="bold">R1</text>

        <!-- Output Circuit -->
        <text x="80" y="200" fill="#10b981" font-size="14" font-weight="bold" text-anchor="middle">Vout</text>
        <text x="80" y="220" fill="#10b981" font-size="12" text-anchor="middle">{{ calculatedOutput }}V</text>
        
        <!-- Output capacitor C2 -->
        <g transform="translate(130, 200)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#374151" stroke-width="3"/>
          <line x1="-12" y1="15" x2="12" y2="15" stroke="#374151" stroke-width="3"/>
          <line x1="-12" y1="22" x2="12" y2="22" stroke="#374151" stroke-width="3"/>
          <line x1="0" y1="22" x2="0" y2="35" stroke="#374151" stroke-width="3"/>
          <text x="0" y="-20" text-anchor="middle" fill="#374151" font-size="10">C2</text>
          <text x="0" y="45" text-anchor="middle" fill="#374151" font-size="9">1µF+</text>
        </g>

        <!-- Wire from Vout to C2 -->
        <line x1="100" y1="200" x2="130" y2="200" stroke="#10b981" stroke-width="3"/>
        <line x1="130" y1="200" x2="220" y2="200" stroke="#10b981" stroke-width="3"/>

        <!-- R2 from Vout to Adjust (the main adjustment resistor) -->
        <rect x="200" y="170" width="60" height="20" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" rx="3"/>
        <text x="230" y="185" text-anchor="middle" fill="#4338ca" font-size="11" font-weight="bold">R2</text>
        
        <!-- Wire from Vout through R2 to Adjust -->
        <line x1="100" y1="200" x2="100" y2="180" stroke="#10b981" stroke-width="2"/>
        <line x1="100" y1="180" x2="200" y2="180" stroke="#10b981" stroke-width="2"/>
        <line x1="260" y1="180" x2="280" y2="180" stroke="#10b981" stroke-width="2"/>
        <line x1="280" y1="180" x2="280" y2="140" stroke="#10b981" stroke-width="2"/>

        <!-- R1 wire -->
        <line x1="260" y1="140" x2="280" y2="140" stroke="#f59e0b" stroke-width="2"/>

        <!-- GND rail -->
        <line x1="50" y1="310" x2="650" y2="310" stroke="#374151" stroke-width="3"/>
        
        <!-- GND connections -->
        <line x1="130" y1="245" x2="130" y2="310" stroke="#374151" stroke-width="2"/>
        <line x1="130" y1="185" x2="130" y2="310" stroke="#374151" stroke-width="2"/>

        <!-- GND symbol -->
        <g transform="translate(350, 310)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#374151" stroke-width="3"/>
          <line x1="-10" y1="7" x2="10" y2="7" stroke="#374151" stroke-width="3"/>
          <line x1="-5" y1="14" x2="5" y2="14" stroke="#374151" stroke-width="3"/>
        </g>

        <!-- Voltage drop across LM317 -->
        <rect x="460" y="90" width="180" height="60" rx="5" fill="white" stroke="#374151" stroke-width="2"/>
        <text x="550" y="110" text-anchor="middle" fill="#374151" font-size="11">Dropout Voltage</text>
        <text x="550" y="130" text-anchor="middle" :fill="dropoutColor" font-size="16" font-weight="bold">
          {{ dropoutVoltage }}V
        </text>
        <text x="550" y="145" text-anchor="middle" fill="#6b7280" font-size="10">
          {{ dropoutVoltage >= 2 ? '✓ OK' : '⚠ Too low!' }}
        </text>

        <!-- Power Dissipation -->
        <rect x="460" y="170" width="180" height="60" rx="5" fill="white" stroke="#374151" stroke-width="2"/>
        <text x="550" y="190" text-anchor="middle" fill="#374151" font-size="11">Power Dissipation</text>
        <text x="550" y="210" text-anchor="middle" :fill="powerColor" font-size="16" font-weight="bold">
          {{ powerDissipation.toFixed(2) }}W
        </text>
        <text x="550" y="225" text-anchor="middle" fill="#6b7280" font-size="10">
          {{ powerDissipation > 0.5 ? 'May need heatsink' : 'No heatsink needed' }}
        </text>

        <!-- Load current indicator -->
        <text x="550" y="270" text-anchor="middle" fill="#374151" font-size="11">Load Current:</text>
        <text x="550" y="290" text-anchor="middle" fill="#1f2937" font-size="18" font-weight="bold">
          {{ loadCurrent }}mA
        </text>

        <!-- Safety badges -->
        <g v-if="dropoutVoltage < 2">
          <rect x="460" y="250" width="180" height="30" rx="5" fill="#fecaca"/>
          <text x="550" y="270" text-anchor="middle" fill="#dc2626" font-size="12" font-weight="bold">⚠ LOW VIN</text>
        </g>
      </svg>
    </div>

    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Desired Output Voltage -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🎯 Desired Output Voltage: {{ outputVoltage }}V
        </label>
        <input 
          type="range" 
          v-model.number="outputVoltage" 
          min="1.5" 
          max="30" 
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1.5V</span>
          <span>30V</span>
        </div>
        <input 
          type="number" 
          v-model.number="outputVoltage" 
          min="1.5" 
          max="37" 
          step="0.1"
          class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <!-- Input Voltage -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          ⚡ Input Voltage: {{ inputVoltage }}V
        </label>
        <input 
          type="range" 
          v-model.number="inputVoltage" 
          min="5" 
          max="40" 
          step="0.5"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>5V</span>
          <span>40V</span>
        </div>
        <input 
          type="number" 
          v-model.number="inputVoltage" 
          min="5" 
          max="40" 
          step="0.5"
          class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <!-- R1 Value -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🔌 R1 (Program Resistor): {{ r1 }}Ω
        </label>
        <input 
          type="range" 
          v-model.number="r1" 
          min="100" 
          max="1000" 
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>1000Ω</span>
        </div>
        <input 
          type="number" 
          v-model.number="r1" 
          min="100" 
          max="1000" 
          step="10"
          class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <!-- Load Current -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📊 Load Current: {{ loadCurrent }}mA
        </label>
        <input 
          type="range" 
          v-model.number="loadCurrent" 
          min="10" 
          max="1500" 
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>10mA</span>
          <span>1500mA</span>
        </div>
        <input 
          type="number" 
          v-model.number="loadCurrent" 
          min="10" 
          max="1500" 
          step="10"
          class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
    </div>

    <!-- Calculated Results -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Calculation Results</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- R2 Value -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">R2 (Adjust Resistor)</div>
          <div class="text-2xl font-bold" :class="r2Class">{{ calculatedR2 }}Ω</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ nearestE24(calculatedR2) }}</div>
        </div>

        <!-- Actual Output -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Actual Output Voltage</div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ actualOutput }}V</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">With standard R2</div>
        </div>

        <!-- Voltage Difference -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Voltage Difference</div>
          <div class="text-2xl font-bold" :class="diffClass">{{ voltageDiff }}V</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ accuracyText }}</div>
        </div>

        <!-- Dropout Voltage -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Dropout Voltage</div>
          <div class="text-2xl font-bold" :class="dropoutClass">{{ dropoutVoltage }}V</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ dropoutText }}</div>
        </div>

        <!-- Power Dissipation -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Power Dissipation</div>
          <div class="text-2xl font-bold" :class="powerClass">{{ powerDissipation.toFixed(2) }}W</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ heatsinkText }}</div>
        </div>

        <!-- Efficiency -->
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Efficiency</div>
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ efficiency }}%</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ efficiencyText }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Common Output Voltages</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <button 
          @click="setVoltage(3.3)"
          class="px-4 py-3 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg font-semibold transition-colors text-sm"
        >
          3.3V
        </button>
        <button 
          @click="setVoltage(5)"
          class="px-4 py-3 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg font-semibold transition-colors text-sm"
        >
          5V
        </button>
        <button 
          @click="setVoltage(9)"
          class="px-4 py-3 bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg font-semibold transition-colors text-sm"
        >
          9V
        </button>
        <button 
          @click="setVoltage(12)"
          class="px-4 py-3 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-lg font-semibold transition-colors text-sm"
        >
          12V
        </button>
        <button 
          @click="setVoltage(15)"
          class="px-4 py-3 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 rounded-lg font-semibold transition-colors text-sm"
        >
          15V
        </button>
        <button 
          @click="setVoltage(24)"
          class="px-4 py-3 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-lg font-semibold transition-colors text-sm"
        >
          24V
        </button>
      </div>
    </div>

    <!-- Formula Display -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📐 Formulas Used</h4>
      <div class="space-y-3 text-sm">
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            Vout = 1.25 × (1 + R2/R1)
          </div>
          <div class="text-gray-600 dark:text-gray-400 mt-1">Output voltage formula (1.25V is internal reference)</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            R2 = (Vout / 1.25 - 1) × R1
          </div>
          <div class="text-gray-600 dark:text-gray-400 mt-1">Solving for R2</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-3">
          <div class="font-mono font-bold text-gray-800 dark:text-gray-200">
            P = (Vin - Vout) × Iout
          </div>
          <div class="text-gray-600 dark:text-gray-400 mt-1">Power dissipation in regulator</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const outputVoltage = ref(5)
const inputVoltage = ref(12)
const r1 = ref(240)
const loadCurrent = ref(100)

// E24 resistor values (standard values)
const e24Values = [100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300, 330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910,
  1000, 1100, 1200, 1300, 1500, 1600, 1800, 2000, 2200, 2400, 2700, 3000, 3300, 3600, 3900, 4300, 4700, 5100, 5600, 6200, 6800, 7500, 8200, 9100,
  10000, 11000, 12000, 13000, 15000, 16000, 18000, 20000, 22000, 24000, 27000, 30000, 33000, 36000, 39000, 43000, 47000, 51000, 56000, 62000, 68000, 75000, 82000, 91000,
  100000, 110000, 120000, 130000, 150000, 160000, 180000, 200000, 220000, 240000, 270000, 300000, 330000, 360000, 390000, 430000, 470000, 510000, 560000, 620000, 680000, 750000, 820000, 910000,
  1000000]

// Calculated values
const calculatedR2 = computed(() => {
  const r2 = (outputVoltage.value / 1.25 - 1) * r1.value
  return Math.round(r2)
})

const calculatedOutput = computed(() => {
  return (1.25 * (1 + calculatedR2.value / r1.value)).toFixed(2)
})

const nearestE24 = (value) => {
  const nearest = e24Values.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  )
  return `Use ${nearest >= 1000 ? (nearest/1000).toFixed(1) + 'kΩ' : nearest + 'Ω'}`
}

const actualOutput = computed(() => {
  const r2Std = e24Values.reduce((prev, curr) => 
    Math.abs(curr - calculatedR2.value) < Math.abs(prev - calculatedR2.value) ? curr : prev
  )
  return (1.25 * (1 + r2Std / r1.value)).toFixed(2)
})

const voltageDiff = computed(() => {
  return Math.abs(parseFloat(actualOutput.value) - outputVoltage.value).toFixed(2)
})

const accuracyText = computed(() => {
  const diff = parseFloat(voltageDiff.value)
  const pct = (diff / outputVoltage.value * 100).toFixed(1)
  return `${pct}% deviation`
})

const dropoutVoltage = computed(() => {
  return (inputVoltage.value - parseFloat(actualOutput.value)).toFixed(2)
})

const dropoutText = computed(() => {
  const v = parseFloat(dropoutVoltage.value)
  if (v < 2) return 'Need higher Vin'
  if (v < 3) return 'Minimum'
  return 'Good'
})

const powerDissipation = computed(() => {
  const vDrop = inputVoltage.value - parseFloat(actualOutput.value)
  const current = loadCurrent.value / 1000 // Convert mA to A
  return vDrop * current
})

const heatsinkText = computed(() => {
  const p = powerDissipation.value
  if (p < 0.5) return 'No heatsink'
  if (p < 1) return 'Small heatsink'
  if (p < 2) return 'Medium heatsink'
  if (p < 5) return 'Large heatsink'
  return 'Consider switching regulator'
})

const efficiency = computed(() => {
  const eff = (parseFloat(actualOutput.value) / inputVoltage.value) * 100
  return eff.toFixed(1)
})

const efficiencyText = computed(() => {
  const eff = parseFloat(efficiency.value)
  if (eff > 80) return 'Good'
  if (eff > 60) return 'Acceptable'
  return 'Inefficient'
})

// Color classes
const r2Class = computed(() => {
  return 'text-blue-600 dark:text-blue-400'
})

const diffClass = computed(() => {
  const diff = parseFloat(voltageDiff.value)
  if (diff < 0.01) return 'text-green-600 dark:text-green-400'
  if (diff < 0.1) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-orange-600 dark:text-orange-400'
})

const dropoutClass = computed(() => {
  const v = parseFloat(dropoutVoltage.value)
  if (v < 2) return 'text-red-600 dark:text-red-400'
  if (v < 3) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
})

const powerClass = computed(() => {
  const p = powerDissipation.value
  if (p < 0.5) return 'text-green-600 dark:text-green-400'
  if (p < 2) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
})

const dropoutColor = computed(() => {
  const v = parseFloat(dropoutVoltage.value)
  if (v < 2) return '#ef4444'
  if (v < 3) return '#f59e0b'
  return '#10b981'
})

const powerColor = computed(() => {
  const p = powerDissipation.value
  if (p < 0.5) return '#10b981'
  if (p < 2) return '#f59e0b'
  return '#ef4444'
})

const setVoltage = (v) => {
  outputVoltage.value = v
}
</script>

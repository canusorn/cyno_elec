<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
      🔌 7805 Voltage Regulator Calculator
    </h2>

    <!-- Circuit Diagram -->
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        📋 Typical 7805 Circuit
      </h3>
      <div class="flex justify-center">
        <svg viewBox="0 0 600 200" class="w-full max-w-3xl h-auto">
          <!-- Input -->
          <text x="50" y="105" font-size="14" font-weight="bold" fill="#374151">INPUT</text>
          <text x="40" y="125" font-size="12" fill="#6B7280">{{ inputVoltage }}V</text>

          <!-- Input capacitor -->
          <line x1="120" y1="100" x2="120" y2="60" stroke="#374151" stroke-width="2"/>
          <line x1="110" y1="65" x2="130" y2="65" stroke="#374151" stroke-width="2"/>
          <line x1="113" y1="58" x2="127" y2="58" stroke="#374151" stroke-width="2"/>
          <text x="105" y="45" font-size="11" text-anchor="middle" fill="#6B7280">Cin</text>
          <text x="105" y="170" font-size="10" text-anchor="middle" fill="#059669">{{ inputCapacitance }}µF</text>
          <line x1="120" y1="130" x2="120" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="115" y1="150" x2="125" y2="150" stroke="#374151" stroke-width="2"/>

          <!-- Wire to 7805 -->
          <line x1="120" y1="100" x2="180" y2="100" stroke="#374151" stroke-width="3"/>
          <line x1="120" y1="150" x2="420" y2="150" stroke="#374151" stroke-width="3"/>

          <!-- 7805 Regulator -->
          <rect x="180" y="60" width="120" height="80" fill="#1F2937" stroke="#4B5563" stroke-width="2" rx="4"/>
          <text x="240" y="95" font-size="18" font-weight="bold" fill="#10B981" text-anchor="middle">7805</text>
          <text x="240" y="115" font-size="12" fill="#9CA3AF" text-anchor="middle">+5V REG</text>
          <text x="240" y="130" font-size="10" fill="#6B7280" text-anchor="middle">Vin | GND | Vout</text>

          <!-- Wire to output -->
          <line x1="300" y1="100" x2="420" y2="100" stroke="#374151" stroke-width="3"/>

          <!-- Ground connection -->
          <line x1="240" y1="140" x2="240" y2="150" stroke="#374151" stroke-width="3"/>

          <!-- Output capacitor -->
          <line x1="420" y1="100" x2="420" y2="60" stroke="#374151" stroke-width="2"/>
          <line x1="410" y1="65" x2="430" y2="65" stroke="#374151" stroke-width="2"/>
          <line x1="413" y1="58" x2="427" y2="58" stroke="#374151" stroke-width="2"/>
          <text x="420" y="45" font-size="11" text-anchor="middle" fill="#6B7280">Cout</text>
          <text x="420" y="170" font-size="10" text-anchor="middle" fill="#059669">{{ outputCapacitance }}µF</text>
          <line x1="420" y1="130" x2="420" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="415" y1="150" x2="425" y2="150" stroke="#374151" stroke-width="2"/>

          <!-- Output -->
          <line x1="420" y1="100" x2="500" y2="100" stroke="#374151" stroke-width="3"/>
          <text x="520" y="105" font-size="14" font-weight="bold" fill="#374151">OUTPUT</text>
          <text x="505" y="125" font-size="12" fill="#10B981">5.0V</text>

          <!-- Load indication -->
          <rect x="530" y="80" width="40" height="40" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="4"/>
          <text x="550" y="105" font-size="11" font-weight="bold" fill="#92400E" text-anchor="middle">LOAD</text>
        </svg>
      </div>
    </div>

    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Input Voltage -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
        <label class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Input Voltage: {{ inputVoltage }}V
        </label>
        <input
          type="range"
          v-model.number="inputVoltage"
          min="7"
          max="24"
          step="0.5"
          class="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>7V</span>
          <span>12V</span>
          <span>18V</span>
          <span>24V</span>
        </div>
        <div :class="[
          'mt-4 p-3 rounded-lg text-sm font-semibold',
          dropoutWarning ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
        ]">
          <span v-if="dropoutWarning">⚠️ Warning: Input too close to dropout!</span>
          <span v-else>✓ Input voltage acceptable (≥7V)</span>
        </div>
      </div>

      <!-- Output Current -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
        <label class="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Output Current: {{ outputCurrent }}mA
        </label>
        <input
          type="range"
          v-model.number="outputCurrent"
          min="10"
          max="1500"
          step="10"
          class="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>10mA</span>
          <span>500mA</span>
          <span>1000mA</span>
          <span>1500mA</span>
        </div>
        <div :class="[
          'mt-4 p-3 rounded-lg text-sm font-semibold',
          currentWarning ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
        ]">
          <span v-if="currentWarning">⚠️ Warning: High current - heatsink required!</span>
          <span v-else>✓ Current within safe limits</span>
        </div>
      </div>
    </div>

    <!-- Calculated Values -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 mb-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        📊 Calculations
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Power Dissipation -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Power Dissipation</div>
          <div class="text-3xl font-bold text-red-600 dark:text-red-400">{{ powerDissipation }}W</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">P = (Vin - Vout) × Iout</div>
        </div>

        <!-- Voltage Drop -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Drop</div>
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ voltageDrop }}V</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Vdrop = Vin - Vout</div>
        </div>

        <!-- Efficiency -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Efficiency</div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ efficiency }}%</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">η = Pout / Pin</div>
        </div>

        <!-- Input Capacitor -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Input Capacitor (Cin)</div>
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ inputCapacitance }}µF</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Recommended: 0.33µF</div>
        </div>

        <!-- Output Capacitor -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Capacitor (Cout)</div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ outputCapacitance }}µF</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Recommended: 0.1µF</div>
        </div>

        <!-- Heatsink Requirement -->
        <div class="bg-white dark:bg-gray-700 rounded-lg p-5 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Heatsink Required?</div>
          <div class="text-3xl font-bold" :class="needsHeatsink ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
            {{ needsHeatsink ? 'YES' : 'NO' }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ needsHeatsink ? 'Power > 0.5W' : 'Power within limits' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Thermal Considerations -->
    <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 mb-8" v-if="powerDissipation > 0.3">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌡️ Thermal Analysis</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Junction Temperature Rise</div>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ tempRise }}°C</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">ΔT = P × RθJA (65°C/W without heatsink)</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Junction Temp</div>
          <div class="text-2xl font-bold" :class="junctionTemp > 100 ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'">
            {{ junctionTemp }}°C
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Assuming 25°C ambient</div>
        </div>
      </div>
      <div v-if="junctionTemp > 100" class="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
        <p class="text-sm text-red-700 dark:text-red-300 font-semibold">
          ⚠️ Critical: Junction temperature exceeds 100°C! A heatsink is mandatory.
        </p>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Common Input Voltages</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          @click="inputVoltage = 9; outputCurrent = 100"
          class="px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
        >
          9V Battery
          <span class="block text-xs">100mA</span>
        </button>
        <button
          @click="inputVoltage = 12; outputCurrent = 500"
          class="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          12V Supply
          <span class="block text-xs">500mA</span>
        </button>
        <button
          @click="inputVoltage = 15; outputCurrent = 500"
          class="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
        >
          15V Supply
          <span class="block text-xs">500mA</span>
        </button>
        <button
          @click="inputVoltage = 24; outputCurrent = 1000"
          class="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        >
          24V Industrial
          <span class="block text-xs">1000mA</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const inputVoltage = ref(12)
const outputCurrent = ref(500)
const outputVoltage = 5.0 // Fixed for 7805
const dropoutVoltage = 2.0 // Typical dropout voltage for 7805

// Calculate voltage drop across regulator
const voltageDrop = computed(() => {
  return (inputVoltage.value - outputVoltage).toFixed(1)
})

// Calculate power dissipation
const powerDissipation = computed(() => {
  const p = (inputVoltage.value - outputVoltage) * (outputCurrent.value / 1000)
  return p.toFixed(2)
})

// Calculate efficiency
const efficiency = computed(() => {
  const pout = outputVoltage * (outputCurrent.value / 1000)
  const pin = inputVoltage.value * (outputCurrent.value / 1000)
  const eff = (pout / pin) * 100
  return eff.toFixed(1)
})

// Input capacitor recommendation
const inputCapacitance = computed(() => {
  // Standard recommendation is 0.33µF, increase for higher currents
  if (outputCurrent.value > 1000) return '0.33'
  if (outputCurrent.value > 500) return '0.33'
  return '0.33'
})

// Output capacitor recommendation
const outputCapacitance = computed(() => {
  // Standard recommendation is 0.1µF
  return '0.1'
})

// Check if input voltage is too close to dropout
const dropoutWarning = computed(() => {
  return inputVoltage.value < (outputVoltage + dropoutVoltage + 1)
})

// Check if current is high enough to need heatsink
const currentWarning = computed(() => {
  return powerDissipation.value > 0.5
})

// Check if heatsink is needed
const needsHeatsink = computed(() => {
  return powerDissipation.value > 0.5
})

// Calculate temperature rise (using thermal resistance RθJA = 65°C/W for TO-220 without heatsink)
const tempRise = computed(() => {
  return Math.round(parseFloat(powerDissipation.value) * 65)
})

// Calculate junction temperature
const junctionTemp = computed(() => {
  return 25 + tempRise.value
})
</script>

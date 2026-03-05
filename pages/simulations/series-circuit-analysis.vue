<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const sourceVoltage = ref(12)
const resistorCount = ref(3)
const resistors = ref([
  { resistance: 1000, enabled: true },
  { resistance: 2200, enabled: true },
  { resistance: 3300, enabled: true },
  { resistance: 4700, enabled: false },
  { resistance: 5600, enabled: false },
  { resistance: 6800, enabled: false },
])

// Computed calculations
const activeResistors = computed(() => {
  return resistors.value.filter(r => r.enabled)
})

const totalResistance = computed(() => {
  return activeResistors.value.reduce((sum, r) => sum + r.resistance, 0)
})

const circuitCurrent = computed(() => {
  if (totalResistance.value === 0) return 0
  return sourceVoltage.value / totalResistance.value
})

const totalPower = computed(() => {
  return sourceVoltage.value * circuitCurrent.value
})

const voltageDrops = computed(() => {
  return activeResistors.value.map(r => ({
    resistance: r.resistance,
    voltageDrop: circuitCurrent.value * r.resistance,
    power: Math.pow(circuitCurrent.value, 2) * r.resistance,
    percentage: ((circuitCurrent.value * r.resistance) / sourceVoltage.value) * 100
  }))
})

const totalVoltageDrop = computed(() => {
  return voltageDrops.value.reduce((sum, v) => sum + v.voltageDrop, 0)
})

// Format functions
const formatResistance = (ohms: number) => {
  if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(2)} MΩ`
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(2)} kΩ`
  return `${ohms.toFixed(2)} Ω`
}

const formatVoltage = (volts: number) => {
  if (volts >= 1000) return `${(volts / 1000).toFixed(2)} kV`
  if (volts < 1) return `${(volts * 1000).toFixed(2)} mV`
  return `${volts.toFixed(3)} V`
}

const formatCurrent = (amps: number) => {
  if (amps >= 1) return `${amps.toFixed(3)} A`
  if (amps >= 0.001) return `${(amps * 1000).toFixed(2)} mA`
  return `${(amps * 1000000).toFixed(2)} µA`
}

const formatPower = (watts: number) => {
  if (watts >= 1000) return `${(watts / 1000).toFixed(3)} kW`
  if (watts >= 1) return `${watts.toFixed(3)} W`
  if (watts >= 0.001) return `${(watts * 1000).toFixed(2)} mW`
  return `${(watts * 1000000).toFixed(2)} µW`
}

// Presets
const presets = [
  { name: 'Voltage Divider', voltage: 12, resistors: [1000, 2200, 3300] },
  { name: 'LED Circuit', voltage: 5, resistors: [220, 470, 680] },
  { name: 'High Resistance', voltage: 24, resistors: [10000, 22000, 33000] },
  { name: 'Low Resistance', voltage: 12, resistors: [10, 22, 33] },
]

const applyPreset = (preset: typeof presets[0]) => {
  sourceVoltage.value = preset.voltage
  resistors.value.forEach((r, i) => {
    if (i < preset.resistors.length) {
      r.resistance = preset.resistors[i]
      r.enabled = true
    } else {
      r.enabled = false
    }
  })
  resistorCount.value = preset.resistors.length
}

const updateResistorCount = () => {
  const count = resistorCount.value
  resistors.value.forEach((r, i) => {
    r.enabled = i < count
  })
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        🔌 Series Circuit Analysis
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Interactive series circuit simulation with real-time voltage drop and power analysis
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Controls -->
      <div class="space-y-6">
        <!-- Source Voltage -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ Source Voltage
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voltage: {{ formatVoltage(sourceVoltage) }}
              </label>
              <input
                v-model.number="sourceVoltage"
                type="range"
                min="0.1"
                max="100"
                step="0.1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <!-- Resistor Configuration -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔧 Resistor Configuration
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Resistors: {{ resistorCount }}
              </label>
              <input
                v-model.number="resistorCount"
                type="range"
                min="2"
                max="6"
                step="1"
                @input="updateResistorCount"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            <div v-for="(resistor, index) in resistors" :key="index" 
                 v-show="resistor.enabled"
                 class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Resistor R{{ index + 1 }}
                </span>
              </div>
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Value: {{ formatResistance(resistor.resistance) }}
                </label>
                <input
                  v-model.number="resistor.resistance"
                  type="range"
                  min="1"
                  max="100000"
                  step="1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 class="text-lg font-semibold mb-4">🎯 Quick Presets</h3>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Middle Column: Results -->
      <div class="space-y-6">
        <!-- Circuit Overview -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Circuit Overview
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Total Resistance</span>
              <span class="text-lg font-bold text-gray-900 dark:text-white">
                {{ formatResistance(totalResistance) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Circuit Current</span>
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                {{ formatCurrent(circuitCurrent) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Total Power</span>
              <span class="text-lg font-bold text-red-600 dark:text-red-400">
                {{ formatPower(totalPower) }}
              </span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600 dark:text-gray-400">Voltage Sum</span>
              <span class="text-lg font-bold text-green-600 dark:text-green-400">
                {{ formatVoltage(totalVoltageDrop) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Voltage Drop Analysis -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📉 Voltage Drop Analysis
          </h3>
          <div class="space-y-4">
            <div v-for="(drop, index) in voltageDrops" :key="index"
                 class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium text-gray-900 dark:text-white">
                  R{{ index + 1 }}: {{ formatResistance(drop.resistance) }}
                </span>
                <span class="text-blue-600 dark:text-blue-400 font-bold">
                  {{ formatVoltage(drop.voltageDrop) }}
                </span>
              </div>
              
              <!-- Voltage Bar -->
              <div class="mb-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>{{ drop.percentage.toFixed(1) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 overflow-hidden">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                    :style="{ width: `${drop.percentage}%` }"
                  />
                </div>
              </div>

              <!-- Power Dissipation -->
              <div class="flex justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Power:</span>
                <span class="text-red-600 dark:text-red-400 font-medium">
                  {{ formatPower(drop.power) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Power Distribution -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔥 Power Distribution
          </h3>
          <div class="space-y-3">
            <div v-for="(drop, index) in voltageDrops" :key="index"
                 class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                R{{ index + 1 }}
              </span>
              <div class="flex items-center gap-2">
                <div class="w-32 bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
                  <div
                    class="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${(drop.power / totalPower) * 100}%` }"
                  />
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white w-20 text-right">
                  {{ formatPower(drop.power) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Visualization & Education -->
      <div class="space-y-6">
        <!-- Circuit Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔌 Circuit Diagram
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <svg viewBox="0 0 400 500" class="w-full">
              <!-- Source -->
              <g transform="translate(200, 40)">
                <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" 
                        class="text-blue-600 dark:text-blue-400" stroke-width="3"/>
                <text x="0" y="5" text-anchor="middle" 
                      class="text-xs fill-current text-blue-600 dark:text-blue-400 font-bold">
                  {{ formatVoltage(sourceVoltage) }}
                </text>
              </g>

              <!-- Main Wire Path -->
              <path d="M 200 65 L 200 100 L 50 100" 
                    fill="none" stroke="currentColor" class="text-green-500 dark:text-green-400" 
                    stroke-width="3"/>

              <!-- Resistors in series -->
              <g v-for="(drop, index) in voltageDrops" :key="index">
                <!-- Vertical wire to resistor -->
                <path :d="`M 50 ${120 + index * 80} L 80 ${120 + index * 80}`"
                      fill="none" stroke="currentColor" class="text-green-500 dark:text-green-400" 
                      stroke-width="3"/>

                <!-- Resistor symbol (zigzag) -->
                <path :d="`M 80 ${120 + index * 80}
                          L 90 ${110 + index * 80}
                          L 110 ${130 + index * 80}
                          L 130 ${110 + index * 80}
                          L 150 ${130 + index * 80}
                          L 170 ${110 + index * 80}
                          L 190 ${120 + index * 80}`"
                      fill="none" stroke="currentColor" class="text-red-600 dark:text-red-400" 
                      stroke-width="2.5"/>

                <!-- Wire from resistor -->
                <path :d="`M 190 ${120 + index * 80} L 350 ${120 + index * 80}
                          L 350 ${200 + index * 80}`"
                      fill="none" stroke="currentColor" class="text-green-500 dark:text-green-400" 
                      stroke-width="3"/>

                <!-- Connecting wire between resistors -->
                <path v-if="index < voltageDrops.length - 1"
                      :d="`M 350 ${200 + index * 80} L 350 ${120 + (index + 1) * 80}`"
                      fill="none" stroke="currentColor" class="text-green-500 dark:text-green-400" 
                      stroke-width="3"/>

                <!-- Resistor Labels -->
                <text x="135" :y="`${100 + index * 80}`" text-anchor="middle"
                      class="text-xs fill-current text-gray-900 dark:text-white font-medium">
                  R{{ index + 1 }}
                </text>
                <text x="135" :y="`${150 + index * 80}`" text-anchor="middle"
                      class="text-[10px] fill-current text-gray-600 dark:text-gray-400">
                  {{ formatResistance(drop.resistance) }}
                </text>
              </g>

              <!-- Return path -->
              <path d="M 350 440 L 200 440 L 200 460" 
                    fill="none" stroke="currentColor" class="text-green-500 dark:text-green-400" 
                    stroke-width="3"/>

              <!-- Ground -->
              <line x1="175" y1="460" x2="225" y2="460" 
                    stroke="currentColor" class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              <line x1="185" y1="465" x2="215" y2="465" 
                    stroke="currentColor" class="text-gray-600 dark:text-gray-400" stroke-width="2"/>
              <line x1="195" y1="470" x2="205" y2="470" 
                    stroke="currentColor" class="text-gray-600 dark:text-gray-400" stroke-width="2"/>

              <!-- Current Flow Animation Indicator -->
              <text x="30" y="95" class="text-[10px] fill-current text-blue-600 dark:text-blue-400 font-bold">
                I = {{ formatCurrent(circuitCurrent) }}
              </text>
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📚 Series Circuit Rules
          </h3>
          <div class="space-y-4 text-sm">
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Principles:</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Current:</strong> Same through all components</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Resistance:</strong> Sum of all resistances (R₁ + R₂ + ...)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Voltage:</strong> Divides proportionally to resistance</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Power:</strong> Each resistor dissipates I²R</span>
                </li>
              </ul>
            </div>

            <div class="border-t border-gray-300 dark:border-gray-600 pt-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Ohm's Law:</h4>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-1">
                <p class="text-gray-700 dark:text-gray-300 font-mono text-center">
                  I = V / R<sub class="text-xs">total</sub>
                </p>
                <p class="text-gray-700 dark:text-gray-300 font-mono text-center">
                  V<sub class="text-xs">n</sub> = I × R<sub class="text-xs">n</sub>
                </p>
                <p class="text-gray-700 dark:text-gray-300 font-mono text-center">
                  P<sub class="text-xs">n</sub> = I² × R<sub class="text-xs">n</sub>
                </p>
              </div>
            </div>

            <div class="border-t border-gray-300 dark:border-gray-600 pt-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Applications:</h4>
              <ul class="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• Voltage dividers</li>
                <li>• LED current limiting</li>
                <li>• Sensor arrays</li>
                <li>• Battery monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
          🔋 Battery Life Calculator
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate how long your battery will last based on capacity and load current
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Input Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Battery Capacity -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Battery Capacity</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Capacity: {{ capacityValue }} {{ capacityUnit }}
                </label>
                <input
                  v-model.number="capacityValue"
                  type="range"
                  min="100"
                  max="20000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="mt-2 flex gap-2">
                  <input
                    v-model.number="capacityValue"
                    type="number"
                    min="100"
                    max="20000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    v-model="capacityUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="mAh">mAh</option>
                    <option value="Ah">Ah</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Load Current -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Load Current</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Draw: {{ currentValue }} {{ currentUnit }}
                </label>
                <input
                  v-model.number="currentValue"
                  type="range"
                  min="0.1"
                  max="5000"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="mt-2 flex gap-2">
                  <input
                    v-model.number="currentValue"
                    type="number"
                    min="0.1"
                    max="5000"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    v-model="currentUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="mA">mA</option>
                    <option value="A">A</option>
                  </select>
                </div>
              </div>

              <!-- Usage Pattern -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Usage Pattern
                </label>
                <select
                  v-model="usagePattern"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="continuous">Continuous Use (100%)</option>
                  <option value="intermittent">Intermittent Use (50%)</option>
                  <option value="light">Light Use (25%)</option>
                  <option value="standby">Mostly Standby (10%)</option>
                  <option value="custom">Custom Duty Cycle</option>
                </select>
              </div>

              <!-- Custom Duty Cycle -->
              <div v-if="usagePattern === 'custom'" class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Active Time: {{ activeTime }}%
                  </label>
                  <input
                    v-model.number="activeTime"
                    type="range"
                    min="1"
                    max="100"
                    class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Battery Type -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Battery Type</h3>
            
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  v-model="batteryType"
                  type="radio"
                  value="li-ion"
                  class="w-4 h-4 text-blue-600"
                />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white">Li-Ion / Li-Po</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">3.7V nominal, high energy density</p>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  v-model="batteryType"
                  type="radio"
                  value="nimh"
                  class="w-4 h-4 text-green-600"
                />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white">NiMH</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">1.2V nominal, rechargeable AA/AAA</p>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  v-model="batteryType"
                  type="radio"
                  value="lead-acid"
                  class="w-4 h-4 text-orange-600"
                />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white">Lead-Acid</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">12V nominal, automotive/UPS</p>
                </div>
              </label>

              <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  v-model="batteryType"
                  type="radio"
                  value="alkaline"
                  class="w-4 h-4 text-purple-600"
                />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 dark:text-white">Alkaline</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">1.5V nominal, disposable</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="applyPreset('smartphone')"
                class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
              >
                📱 Smartphone
              </button>
              <button
                @click="applyPreset('tablet')"
                class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
              >
                📱 Tablet
              </button>
              <button
                @click="applyPreset('laptop')"
                class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
              >
                💻 Laptop
              </button>
              <button
                @click="applyPreset('arduino')"
                class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm"
              >
                🔌 Arduino
              </button>
              <button
                @click="applyPreset('esp32')"
                class="px-3 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-lg font-semibold hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors text-sm"
              >
                📶 ESP32
              </button>
              <button
                @click="applyPreset('led')"
                class="px-3 py-2 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-lg font-semibold hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors text-sm"
              >
                💡 LED Strip
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Main Results -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Estimated Battery Life</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Hours -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 text-center">
                <p class="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Battery Life</p>
                <p class="text-5xl font-bold text-blue-900 dark:text-white mb-1">{{ batteryLife.hours }}</p>
                <p class="text-lg text-blue-700 dark:text-blue-300">Hours</p>
              </div>

              <!-- Days -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 text-center">
                <p class="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Battery Life</p>
                <p class="text-5xl font-bold text-green-900 dark:text-white mb-1">{{ batteryLife.days }}</p>
                <p class="text-lg text-green-700 dark:text-green-300">Days</p>
              </div>

              <!-- Energy -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 text-center">
                <p class="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">Total Energy</p>
                <p class="text-5xl font-bold text-purple-900 dark:text-white mb-1">{{ totalEnergy }}</p>
                <p class="text-lg text-purple-700 dark:text-purple-300">Wh</p>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-600 dark:text-gray-400">Capacity (Ah)</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ capacityAh }} Ah</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-600 dark:text-gray-400">Avg Current</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ avgCurrent }} A</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-600 dark:text-gray-400">Power Draw</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ powerDraw }} W</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-center">
                <p class="text-xs text-gray-600 dark:text-gray-400">Duty Cycle</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ dutyCycle }}%</p>
              </div>
            </div>
          </div>

          <!-- Battery Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Battery Drain Visualization</h3>
            
            <div class="space-y-4">
              <!-- Battery Icon -->
              <div class="flex items-center justify-center">
                <div class="relative">
                  <svg viewBox="0 0 200 80" class="w-full max-w-md h-auto">
                    <!-- Battery body -->
                    <rect x="10" y="20" width="170" height="40" rx="4" fill="none" :stroke="batteryColor" stroke-width="3"/>
                    <!-- Battery terminal -->
                    <rect x="180" y="30" width="10" height="20" rx="2" :fill="batteryColor"/>
                    <!-- Charge level -->
                    <rect x="13" y="23" :width="chargeLevelWidth" height="34" rx="2" :fill="batteryColor" opacity="0.6"/>
                    <!-- Percentage text -->
                    <text x="95" y="45" text-anchor="middle" class="text-lg font-bold" :fill="batteryColor">
                      {{ chargePercentage }}%
                    </text>
                  </svg>
                </div>
              </div>

              <!-- Time Breakdown -->
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Time Breakdown</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">📅 Full Days:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ batteryLife.fullDays }} days</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">⏰ Remaining Hours:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ batteryLife.remainingHours }} hours</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">📶 In Standby:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ standbyTime }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">⚡ In Active Use:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ activeTimeCalc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Battery Efficiency Info -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Battery Type Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg border-2" :class="batteryInfo.borderColor">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ batteryInfo.name }}</h4>
                <div class="space-y-1 text-sm">
                  <p class="text-gray-600 dark:text-gray-400">
                    <strong>Nominal Voltage:</strong> {{ batteryInfo.voltage }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    <strong>Energy Density:</strong> {{ batteryInfo.energyDensity }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    <strong>Rechargeable:</strong> {{ batteryInfo.rechargeable }}
                  </p>
                  <p class="text-gray-600 dark:text-gray-400">
                    <strong>Common Uses:</strong> {{ batteryInfo.uses }}
                  </p>
                </div>
              </div>

              <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">⚡ Efficiency Tips</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Lower current draw = longer battery life</li>
                  <li>• Intermittent use extends total runtime</li>
                  <li>• Temperature affects battery performance</li>
                  <li>• Battery capacity degrades over time</li>
                  <li v-if="batteryType === 'li-ion'">• Avoid full discharge when possible</li>
                  <li v-if="batteryType === 'nimh'">• Memory effect is minimal in modern NiMH</li>
                  <li v-if="batteryType === 'lead-acid'">• Don't store at low charge levels</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Formulas -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Formulas & Calculations</h3>
            
            <div class="space-y-4">
              <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Basic Battery Life Formula</h4>
                <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p class="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                    Battery Life (hours) = Battery Capacity (Ah) / Load Current (A)
                  </p>
                  <p>
                    <strong>Example:</strong> A 2000mAh battery with 500mA load:<br>
                    Battery Life = 2Ah / 0.5A = 4 hours
                  </p>
                </div>
              </div>

              <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">With Duty Cycle</h4>
                <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p class="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                    Avg Current = (Active Current × Active %) + (Sleep Current × Sleep %)
                  </p>
                  <p class="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                    Battery Life = Capacity / Avg Current
                  </p>
                </div>
              </div>

              <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Total Energy</h4>
                <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p class="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                    Energy (Wh) = Capacity (Ah) × Voltage (V)
                  </p>
                  <p>
                    <strong>Example:</strong> 3Ah Li-Ion battery (3.7V):<br>
                    Energy = 3Ah × 3.7V = 11.1Wh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Understanding Battery Capacity</h3>
            
            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">What is Battery Capacity?</h4>
                <p class="text-sm">
                  Battery capacity, measured in ampere-hours (Ah) or milliampere-hours (mAh), indicates how much charge a battery can store. A 2000mAh battery can theoretically supply 2000mA for 1 hour, or 1000mA for 2 hours.
                </p>
              </div>

              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Factors Affecting Battery Life</h4>
                <ul class="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Discharge Rate:</strong> Higher current draw reduces effective capacity (Peukert's law)</li>
                  <li><strong>Temperature:</strong> Extreme temperatures reduce battery performance</li>
                  <li><strong>Age:</strong> Batteries lose capacity over time and cycles</li>
                  <li><strong>Cut-off Voltage:</strong> Minimum usable voltage affects total capacity</li>
                  <li><strong>Duty Cycle:</strong> Intermittent use extends total runtime</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">C-Rate Explained</h4>
                <p class="text-sm">
                  C-rate is a measure of current relative to battery capacity. 1C means discharging the entire battery in 1 hour. 0.5C takes 2 hours, 2C takes 30 minutes. Most batteries perform best at 0.2C to 1C discharge rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const capacityValue = ref(3000)
const capacityUnit = ref<'mAh' | 'Ah'>('mAh')
const currentValue = ref(500)
const currentUnit = ref<'mA' | 'A'>('mA')
const usagePattern = ref<'continuous' | 'intermittent' | 'light' | 'standby' | 'custom'>('continuous')
const activeTime = ref(50)
const batteryType = ref<'li-ion' | 'nimh' | 'lead-acid' | 'alkaline'>('li-ion')

// Battery type information
const batteryInfoData = {
  'li-ion': {
    name: 'Lithium-Ion / Li-Po',
    voltage: '3.7V',
    energyDensity: 'High (150-200 Wh/kg)',
    rechargeable: 'Yes (300-500 cycles)',
    uses: 'Smartphones, laptops, drones, EVs',
    borderColor: 'border-blue-500'
  },
  'nimh': {
    name: 'Nickel-Metal Hydride',
    voltage: '1.2V',
    energyDensity: 'Medium (60-120 Wh/kg)',
    rechargeable: 'Yes (300-500 cycles)',
    uses: 'AA/AAA batteries, power tools',
    borderColor: 'border-green-500'
  },
  'lead-acid': {
    name: 'Lead-Acid',
    voltage: '12V',
    energyDensity: 'Low (30-40 Wh/kg)',
    rechargeable: 'Yes (200-300 cycles)',
    uses: 'Cars, UPS, solar systems',
    borderColor: 'border-orange-500'
  },
  'alkaline': {
    name: 'Alkaline',
    voltage: '1.5V',
    energyDensity: 'Medium (100 Wh/kg)',
    rechargeable: 'No (single use)',
    uses: 'Remote controls, toys, flashlights',
    borderColor: 'border-purple-500'
  }
}

// Computed properties
const capacityAh = computed(() => {
  if (capacityUnit.value === 'mAh') {
    return (capacityValue.value / 1000).toFixed(2)
  }
  return capacityValue.value.toFixed(2)
})

const currentAmps = computed(() => {
  if (currentUnit.value === 'mA') {
    return currentValue.value / 1000
  }
  return currentValue.value
})

const dutyCycle = computed(() => {
  switch (usagePattern.value) {
    case 'continuous': return 100
    case 'intermittent': return 50
    case 'light': return 25
    case 'standby': return 10
    case 'custom': return activeTime.value
    default: return 100
  }
})

const avgCurrent = computed(() => {
  const amps = currentAmps.value
  const duty = dutyCycle.value / 100
  return (amps * duty).toFixed(3)
})

const batteryLifeHours = computed(() => {
  const capacityAhValue = parseFloat(capacityAh.value)
  const avgCurrentValue = parseFloat(avgCurrent.value)
  
  if (avgCurrentValue === 0) return 0
  return capacityAhValue / avgCurrentValue
})

const batteryLife = computed(() => {
  const hours = batteryLifeHours.value
  const fullDays = Math.floor(hours / 24)
  const remainingHours = Math.round(hours % 24)
  
  return {
    hours: Math.round(hours).toLocaleString(),
    days: (hours / 24).toFixed(1),
    fullDays,
    remainingHours
  }
})

const totalEnergy = computed(() => {
  const capacityAhValue = parseFloat(capacityAh.value)
  let voltage = 3.7
  
  switch (batteryType.value) {
    case 'li-ion': voltage = 3.7; break
    case 'nimh': voltage = 1.2; break
    case 'lead-acid': voltage = 12; break
    case 'alkaline': voltage = 1.5; break
  }
  
  return (capacityAhValue * voltage).toFixed(1)
})

const powerDraw = computed(() => {
  const amps = currentAmps.value
  let voltage = 3.7
  
  switch (batteryType.value) {
    case 'li-ion': voltage = 3.7; break
    case 'nimh': voltage = 1.2; break
    case 'lead-acid': voltage = 12; break
    case 'alkaline': voltage = 1.5; break
  }
  
  return (amps * voltage).toFixed(2)
})

const chargePercentage = computed(() => {
  const hours = batteryLifeHours.value
  const maxHours = 100 // Reference point
  const percentage = Math.min(100, Math.max(5, (hours / maxHours) * 100))
  return Math.round(percentage)
})

const chargeLevelWidth = computed(() => {
  return Math.max(10, chargePercentage.value * 1.64)
})

const batteryColor = computed(() => {
  const pct = chargePercentage.value
  if (pct > 60) return '#22C55E' // green
  if (pct > 30) return '#F59E0B' // orange
  return '#EF4444' // red
})

const batteryInfo = computed(() => {
  return batteryInfoData[batteryType.value]
})

const standbyTime = computed(() => {
  const hours = batteryLifeHours.value
  const standbyPercent = 100 - dutyCycle.value
  const standbyHours = hours * (standbyPercent / 100)
  
  if (standbyHours > 24) {
    return `${(standbyHours / 24).toFixed(1)} days`
  }
  return `${standbyHours.toFixed(1)} hours`
})

const activeTimeCalc = computed(() => {
  const hours = batteryLifeHours.value
  const activePercent = dutyCycle.value
  const activeHours = hours * (activePercent / 100)
  
  if (activeHours > 24) {
    return `${(activeHours / 24).toFixed(1)} days`
  }
  return `${activeHours.toFixed(1)} hours`
})

// Presets
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'smartphone':
      capacityValue.value = 3000
      capacityUnit.value = 'mAh'
      currentValue.value = 300
      currentUnit.value = 'mA'
      usagePattern.value = 'intermittent'
      batteryType.value = 'li-ion'
      break
    case 'tablet':
      capacityValue.value = 8000
      capacityUnit.value = 'mAh'
      currentValue.value = 600
      currentUnit.value = 'mA'
      usagePattern.value = 'intermittent'
      batteryType.value = 'li-ion'
      break
    case 'laptop':
      capacityValue.value = 50
      capacityUnit.value = 'Ah'
      currentValue.value = 3
      currentUnit.value = 'A'
      usagePattern.value = 'continuous'
      batteryType.value = 'li-ion'
      break
    case 'arduino':
      capacityValue.value = 2000
      capacityUnit.value = 'mAh'
      currentValue.value = 20
      currentUnit.value = 'mA'
      usagePattern.value = 'continuous'
      batteryType.value = 'li-ion'
      break
    case 'esp32':
      capacityValue.value = 2000
      capacityUnit.value = 'mAh'
      currentValue.value = 200
      currentUnit.value = 'mA'
      usagePattern.value = 'light'
      batteryType.value = 'li-ion'
      break
    case 'led':
      capacityValue.value = 5000
      capacityUnit.value = 'mAh'
      currentValue.value = 1500
      currentUnit.value = 'mA'
      usagePattern.value = 'continuous'
      batteryType.value = 'li-ion'
      break
  }
}

// SEO
useHead({
  title: 'Battery Life Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate battery runtime and life. Estimate how long your battery will last based on capacity and current draw.' }
  ]
})
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #7986CB;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #7986CB;
}
</style>

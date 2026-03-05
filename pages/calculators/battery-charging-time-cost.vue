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
            Battery Charging Time & Cost Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate charging duration, energy consumption, and electricity cost for batteries
          </p>
          
          <!-- Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-primary-highlight">Time</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">Capacity</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary-highlight">(Current × Efficiency)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Battery Parameters</h3>
              
              <!-- Battery Capacity -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Battery Capacity
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="capacity"
                    type="number" 
                    step="100"
                    min="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select 
                    v-model="capacityUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="mah">mAh</option>
                    <option value="ah">Ah</option>
                  </select>
                </div>
                <input 
                  v-model.number="capacityMah"
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Charging Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Charging Current
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="chargingCurrent"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select 
                    v-model="currentUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="ma">mA</option>
                    <option value="a">A</option>
                  </select>
                </div>
                <input 
                  v-model.number="chargingCurrentMa"
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  C-rate: {{ cRate.toFixed(2) }}C
                </p>
              </div>

              <!-- Charger Efficiency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Charger Efficiency
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="efficiency"
                    type="number" 
                    step="1"
                    min="50"
                    max="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">%</span>
                </div>
                <input 
                  v-model.number="efficiency"
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical: 80-95% for modern chargers
                </p>
              </div>

              <!-- Electricity Cost -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Electricity Cost
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="electricityCost"
                    type="number" 
                    step="0.01"
                    min="0"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-20">per kWh</span>
                </div>
                <input 
                  v-model.number="electricityCost"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets
                </label>
                <div class="grid grid-cols-1 gap-2">
                  <button 
                    @click="setPreset('phone')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-left"
                  >
                    📱 Smartphone (3000mAh, 2A)
                  </button>
                  <button 
                    @click="setPreset('laptop')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-left"
                  >
                    💻 Laptop (50000mAh, 3A)
                  </button>
                  <button 
                    @click="setPreset('powerbank')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-left"
                  >
                    🔋 Power Bank (20000mAh, 2A)
                  </button>
                  <button 
                    @click="setPreset('ev')"
                    class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-left"
                  >
                    🚗 EV Battery (75kWh, 7.4kW)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Main Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Charging Results</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Charging Time</p>
                  <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ chargingTimeFormatted }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ chargingTimeHours.toFixed(2) }} hours</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Energy Used</p>
                  <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ energyUsedKWh.toFixed(3) }} kWh</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ energyUsedWh.toFixed(1) }} Wh</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Charging Cost</p>
                  <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ chargingCost.toFixed(2) }} ฿</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">@ {{ electricityCost.toFixed(2) }} ฿/kWh</p>
                </div>
              </div>
            </div>

            <!-- Charging Progress Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⏱️ Charging Progress Timeline</h3>
              
              <div class="space-y-4">
                <!-- Progress Bar -->
                <div>
                  <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Charging Progress</span>
                    <span class="text-sm font-medium text-primary">{{ chargingProgress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300"
                      :style="{ width: chargingProgress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Timeline -->
                <div class="relative pt-4">
                  <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  
                  <div class="space-y-6">
                    <div class="flex items-start gap-4 relative">
                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-semibold text-gray-900 dark:text-white">0% - Start</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Charging begins</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 relative">
                      <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-semibold text-gray-900 dark:text-white">50% - Half Charged</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ (chargingTimeHours / 2).toFixed(2) }} hours</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-4 relative">
                      <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center z-10 flex-shrink-0">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="font-semibold text-gray-900 dark:text-white">100% - Fully Charged</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ chargingTimeFormatted }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cost Breakdown -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💰 Cost Analysis</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Cost per Charge -->
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Cost per full charge:</span>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ chargingCost.toFixed(2) }} ฿</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Cost per charge (1000 cycles):</span>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ (chargingCost * 1000).toFixed(0) }} ฿</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Daily cost (1 charge/day):</span>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ chargingCost.toFixed(2) }} ฿</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Monthly cost (30 charges):</span>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ (chargingCost * 30).toFixed(2) }} ฿</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Yearly cost (365 charges):</span>
                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ (chargingCost * 365).toFixed(2) }} ฿</span>
                  </div>
                </div>

                <!-- Efficiency Loss -->
                <div class="space-y-3">
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Efficiency Breakdown</p>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-xs text-gray-600 dark:text-gray-400">Energy to battery</span>
                      <span class="text-xs font-medium text-green-600">{{ efficiency }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full" :style="{ width: efficiency + '%' }"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="text-xs text-gray-600 dark:text-gray-400">Energy lost as heat</span>
                      <span class="text-xs font-medium text-red-600">{{ (100 - efficiency).toFixed(0) }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-red-500 h-2 rounded-full" :style="{ width: (100 - efficiency) + '%' }"></div>
                    </div>
                  </div>
                  
                  <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Energy loss: {{ energyLossWh.toFixed(1) }} Wh ({{ energyLostCost.toFixed(2) }} ฿)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Key Concepts</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Charging Time Formula -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">Charging Time</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                The time required to charge a battery depends on capacity and charging current:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                Time = Capacity / (Current × Efficiency)
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Example: 3000mAh battery with 2000mA charger at 85% efficiency = 1.76 hours
              </p>
            </div>

            <!-- C-Rate -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-green-900 dark:text-green-300 mb-3">C-Rate</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                C-rate is a measure of the rate at which a battery is discharged relative to its maximum capacity:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                C-rate = Charging Current / Battery Capacity
              </div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 1C = Full charge in 1 hour</li>
                <li>• 0.5C = Full charge in 2 hours</li>
                <li>• 2C = Full charge in 30 minutes</li>
              </ul>
            </div>

            <!-- Efficiency -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-3">Charger Efficiency</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Not all energy from the wall outlet reaches the battery. Some is lost as heat:
              </p>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Standard chargers: 75-85% efficient</li>
                <li>• Quick chargers: 85-90% efficient</li>
                <li>• High-end chargers: 90-95% efficient</li>
                <li>• Lower efficiency = longer charging time</li>
              </ul>
            </div>

            <!-- Cost Calculation -->
            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-orange-900 dark:text-orange-300 mb-3">Energy Cost</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Calculate the electricity cost for charging:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                Cost = (Energy in kWh) × (Price per kWh)
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Example: 0.015 kWh × 4.35 ฿/kWh = 0.07 ฿ per charge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const $colorMode = useColorMode()

const capacity = ref(3000)
const capacityUnit = ref('mah')
const chargingCurrent = ref(2000)
const currentUnit = ref('ma')
const efficiency = ref(85)
const electricityCost = ref(4.35)

const capacityMah = computed({
  get: () => capacityUnit.value === 'mah' ? capacity.value : capacity.value * 1000,
  set: (val) => {
    capacity.value = val
    if (val > 10000) {
      capacityUnit.value = 'ah'
    } else {
      capacityUnit.value = 'mah'
    }
  }
})

const chargingCurrentMa = computed({
  get: () => currentUnit.value === 'ma' ? chargingCurrent.value : chargingCurrent.value * 1000,
  set: (val) => {
    chargingCurrent.value = val
    if (val > 1000) {
      currentUnit.value = 'a'
    } else {
      currentUnit.value = 'ma'
    }
  }
})

watch(capacityMah, (newVal) => {
  capacity.value = newVal
})

watch(chargingCurrentMa, (newVal) => {
  chargingCurrent.value = newVal
})

const capacityAh = computed(() => capacityMah.value / 1000)
const chargingCurrentA = computed(() => chargingCurrentMa.value / 1000)

const cRate = computed(() => {
  if (capacityAh.value === 0) return 0
  return chargingCurrentA.value / capacityAh.value
})

const chargingTimeHours = computed(() => {
  const currentA = chargingCurrentA.value
  const capacityAh = capacityAh.value
  const eff = efficiency.value / 100
  
  if (currentA === 0 || capacityAh === 0 || eff === 0) return 0
  
  return capacityAh / (currentA * eff)
})

const chargingTimeFormatted = computed(() => {
  const hours = chargingTimeHours.value
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  
  if (h === 0) return `${m} minutes`
  if (m === 0) return `${h} hour${h > 1 ? 's' : ''}`
  return `${h}h ${m}m`
})

const batteryEnergyWh = computed(() => {
  const capacityAh = capacityAh.value
  const voltage = 3.7
  return capacityAh * voltage
})

const energyUsedWh = computed(() => {
  const eff = efficiency.value / 100
  if (eff === 0) return 0
  return batteryEnergyWh.value / eff
})

const energyUsedKWh = computed(() => energyUsedWh.value / 1000)

const energyLossWh = computed(() => {
  return energyUsedWh.value - batteryEnergyWh.value
})

const energyLostCost = computed(() => {
  return (energyLossWh.value / 1000) * electricityCost.value
})

const chargingCost = computed(() => {
  return energyUsedKWh.value * electricityCost.value
})

const chargingProgress = computed(() => {
  return 100
})

const setPreset = (preset) => {
  switch (preset) {
    case 'phone':
      capacity.value = 3000
      capacityUnit.value = 'mah'
      chargingCurrent.value = 2000
      currentUnit.value = 'ma'
      efficiency.value = 85
      break
    case 'laptop':
      capacity.value = 50000
      capacityUnit.value = 'mah'
      chargingCurrent.value = 3000
      currentUnit.value = 'ma'
      efficiency.value = 90
      break
    case 'powerbank':
      capacity.value = 20000
      capacityUnit.value = 'mah'
      chargingCurrent.value = 2000
      currentUnit.value = 'ma'
      efficiency.value = 85
      break
    case 'ev':
      capacity.value = 75
      capacityUnit.value = 'ah'
      chargingCurrent.value = 7.4
      currentUnit.value = 'a'
      efficiency.value = 92
      break
  }
}

useHead({
  title: 'Battery Charging Time & Cost Calculator - Calculate Charging Duration and Electricity Cost',
  meta: [
    { name: 'description', content: 'Calculate battery charging time, energy consumption, and electricity cost. Supports various battery types with efficiency adjustments and cost analysis.' }
  ]
})
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3B82F6;
  cursor: pointer;
  border-radius: 50%;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3B82F6;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

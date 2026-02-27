<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <LightBulbIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            💡 LED Circuit Designer
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Design and visualize LED circuits in series or parallel. Calculate resistor values and see real-time circuit behavior.
          </p>
          
          <!-- Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-primary">R</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">(Vs</span>
              <span class="text-gray-400">−</span>
              <span class="text-primary">n×Vf)</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary">If</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Configuration</h3>
              
              <!-- Circuit Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Circuit Type
                </label>
                <div class="flex gap-2">
                  <button 
                    @click="circuitType = 'series'"
                    :class="circuitType === 'series' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Series
                  </button>
                  <button 
                    @click="circuitType = 'parallel'"
                    :class="circuitType === 'parallel' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Parallel
                  </button>
                </div>
              </div>

              <!-- Supply Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Supply Voltage (Vs)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="supplyVoltage"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="supplyVoltage"
                  type="range"
                  min="3"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- LED Forward Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LED Forward Voltage (Vf)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="ledVoltage"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <button @click="ledVoltage = 2.0" class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Red (2V)</button>
                  <button @click="ledVoltage = 3.0" class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Green (3V)</button>
                  <button @click="ledVoltage = 3.3" class="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Blue (3.3V)</button>
                </div>
              </div>

              <!-- LED Forward Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LED Forward Current (If)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="ledCurrent"
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mA</span>
                </div>
                <input 
                  v-model.number="ledCurrent"
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Number of LEDs -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of LEDs
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="ledCount"
                    type="number" 
                    min="1"
                    max="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">LEDs</span>
                </div>
                <input 
                  v-model.number="ledCount"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Power Calculation -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Power Dissipation</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Resistor Power:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ resistorPower.toFixed(3) }} W</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-300">Total LED Power:</span>
                    <span class="font-bold text-gray-900 dark:text-white">{{ totalLedPower.toFixed(3) }} W</span>
                  </div>
                  <div class="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-2">
                    <span class="text-gray-600 dark:text-gray-300">Total Power:</span>
                    <span class="font-bold text-primary">{{ totalPower.toFixed(3) }} W</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {{ circuitType === 'series' ? 'Series' : 'Parallel' }} Circuit Diagram
              </h3>
              
              <!-- Series Circuit SVG -->
              <svg v-if="circuitType === 'series'" viewBox="0 0 700 300" class="w-full h-auto">
                <!-- Grid background -->
                <defs>
                  <pattern id="gridSeries" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                  </pattern>
                </defs>
                <rect width="700" height="300" fill="url(#gridSeries)" />
                
                <!-- Voltage Source -->
                <circle cx="80" cy="150" r="35" fill="white" :stroke="voltageColor" stroke-width="3"/>
                <text x="80" y="145" text-anchor="middle" font-size="14" font-weight="bold" :fill="voltageColor">{{ supplyVoltage }}V</text>
                <text x="80" y="165" text-anchor="middle" font-size="10" fill="#666">Source</text>
                <text x="60" y="120" font-size="14" fill="#22c55e" font-weight="bold">+</text>
                <text x="60" y="175" font-size="14" fill="#ef4444" font-weight="bold">−</text>
                
                <!-- Generate LED positions -->
                <g v-for="(led, index) in displayLEDs" :key="index">
                  <!-- LED symbol -->
                  <g :transform="`translate(${led.x}, ${led.y})`">
                    <!-- Triangle -->
                    <polygon points="0,-15 12,0 0,15" fill="none" stroke="#22c55e" stroke-width="3"/>
                    <!-- Line -->
                    <line x1="12" y1="-15" x2="12" y2="15" stroke="#22c55e" stroke-width="3"/>
                    <!-- Arrows for light emission -->
                    <line x1="8" y1="-20" x2="8" y2="-30" stroke="#fbbf24" stroke-width="2"/>
                    <line x1="16" y1="-20" x2="16" y2="-30" stroke="#fbbf24" stroke-width="2"/>
                    <polygon points="8,-32 5,-26 11,-26" fill="#fbbf24"/>
                    <polygon points="16,-32 13,-26 19,-26" fill="#fbbf24"/>
                    <!-- Label -->
                    <text x="6" y="35" text-anchor="middle" font-size="10" fill="#666">LED{{ index + 1 }}</text>
                    <text x="6" y="48" text-anchor="middle" font-size="9" fill="#22c55e">{{ ledVoltage }}V</text>
                  </g>
                </g>
                
                <!-- Resistor -->
                <g :transform="`translate(${resistorPos}, 150)`">
                  <rect x="-20" y="-10" width="40" height="20" fill="white" :stroke="resistorColor" stroke-width="3" rx="3"/>
                  <polyline points="-15,0 -8,-6 0,6 8,-6 15,0" fill="none" :stroke="resistorColor" stroke-width="2"/>
                  <text x="0" y="35" text-anchor="middle" font-size="11" font-weight="bold" :fill="resistorColor">{{ resistorValue }}Ω</text>
                  <text x="0" y="48" text-anchor="middle" font-size="9" fill="#666">{{ resistorPower.toFixed(2) }}W</text>
                </g>
                
                <!-- Wire connections -->
                <path d="M 80 115 L 80 80 L 650 80 L 650 150" stroke="#94A3B8" stroke-width="3" fill="none"/>
                <path d="M 80 185 L 80 220 L 650 220 L 650 150" stroke="#94A3B8" stroke-width="3" fill="none"/>
              </svg>

              <!-- Parallel Circuit SVG -->
              <svg v-else viewBox="0 0 700 350" class="w-full h-auto">
                <!-- Grid background -->
                <defs>
                  <pattern id="gridParallel" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                  </pattern>
                </defs>
                <rect width="700" height="350" fill="url(#gridParallel)" />
                
                <!-- Voltage Source -->
                <circle cx="80" cy="175" r="35" fill="white" :stroke="voltageColor" stroke-width="3"/>
                <text x="80" y="170" text-anchor="middle" font-size="14" font-weight="bold" :fill="voltageColor">{{ supplyVoltage }}V</text>
                <text x="80" y="190" text-anchor="middle" font-size="10" fill="#666">Source</text>
                <text x="60" y="145" font-size="14" fill="#22c55e" font-weight="bold">+</text>
                <text x="60" y="200" font-size="14" fill="#ef4444" font-weight="bold">−</text>
                
                <!-- Main wires -->
                <line x1="80" y1="140" x2="80" y2="60" stroke="#94A3B8" stroke-width="3"/>
                <line x1="80" y1="210" x2="80" y2="290" stroke="#94A3B8" stroke-width="3"/>
                <line x1="80" y1="60" x2="650" y2="60" stroke="#94A3B8" stroke-width="3"/>
                <line x1="80" y1="290" x2="650" y2="290" stroke="#94A3B8" stroke-width="3"/>
                
                <!-- Resistor on main line -->
                <g transform="translate(180, 175)">
                  <rect x="-20" y="-10" width="40" height="20" fill="white" :stroke="resistorColor" stroke-width="3" rx="3"/>
                  <polyline points="-15,0 -8,-6 0,6 8,-6 15,0" fill="none" :stroke="resistorColor" stroke-width="2"/>
                  <text x="0" y="-20" text-anchor="middle" font-size="11" font-weight="bold" :fill="resistorColor">{{ resistorValue }}Ω</text>
                </g>
                <line x1="160" y1="60" x2="160" y2="175" stroke="#94A3B8" stroke-width="3"/>
                <line x1="200" y1="175" x2="200" y2="60" stroke="#94A3B8" stroke-width="3"/>
                
                <!-- LED branches -->
                <g v-for="(led, index) in displayLEDsParallel" :key="index">
                  <line :x1="led.x1" :y1="60" :x2="led.x1" :y2="led.y" stroke="#94A3B8" stroke-width="2"/>
                  <line :x1="led.x1" :y1="led.bottomY" :x2="led.x1" :y2="290" stroke="#94A3B8" stroke-width="2"/>
                  
                  <!-- LED -->
                  <g :transform="`translate(${led.x1}, ${led.midY})`">
                    <polygon points="0,-12 10,0 0,12" fill="none" stroke="#22c55e" stroke-width="3"/>
                    <line x1="10" y1="-12" x2="10" y2="12" stroke="#22c55e" stroke-width="3"/>
                    <!-- Light arrows -->
                    <line x1="7" y1="-18" x2="7" y2="-26" stroke="#fbbf24" stroke-width="2"/>
                    <line x1="13" y1="-18" x2="13" y2="-26" stroke="#fbbf24" stroke-width="2"/>
                    <text x="5" y="30" text-anchor="middle" font-size="9" fill="#666">LED{{ index + 1 }}</text>
                  </g>
                </g>
              </svg>

              <!-- Warnings -->
              <div v-if="voltageWarning" class="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
                <div class="flex items-start gap-3">
                  <svg class="h-6 w-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 class="font-semibold text-red-900 dark:text-red-200">⚠️ {{ voltageWarning }}</h4>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calculations -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Calculations</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Series calculations -->
                <div v-if="circuitType === 'series'" class="space-y-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-900 dark:text-blue-200 mb-2">Series Circuit</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Total LED Voltage:</span>
                        <span class="font-bold">{{ (ledCount * ledVoltage).toFixed(2) }} V</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Voltage Across Resistor:</span>
                        <span class="font-bold">{{ voltageAcrossResistor.toFixed(2) }} V</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Circuit Current:</span>
                        <span class="font-bold">{{ (ledCurrent / 1000).toFixed(3) }} A</span>
                      </div>
                      <div class="border-t border-blue-300 dark:border-blue-700 pt-2 mt-2">
                        <div class="flex justify-between">
                          <span class="text-gray-600 dark:text-gray-300">Required Resistor:</span>
                          <span class="font-bold text-blue-600 dark:text-blue-400 text-lg">{{ resistorValue }} Ω</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 dark:text-gray-200 mb-2">Standard Resistor Value</h4>
                    <div class="flex items-center gap-2">
                      <span class="text-2xl font-bold text-primary">{{ standardResistorValue }}</span>
                      <span class="text-gray-500 dark:text-gray-400">Ω</span>
                      <span v-if="standardResistorValue !== resistorValue.toFixed(0)" class="text-xs text-gray-500 dark:text-gray-400">
                        (nearest to {{ resistorValue.toFixed(1) }}Ω)
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Parallel calculations -->
                <div v-else class="space-y-4">
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-green-900 dark:text-green-200 mb-2">Parallel Circuit</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">LED Current (each):</span>
                        <span class="font-bold">{{ ledCurrent }} mA</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Total Current:</span>
                        <span class="font-bold">{{ totalCurrent.toFixed(2) }} mA</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-300">Voltage Across Resistor:</span>
                        <span class="font-bold">{{ voltageAcrossResistor.toFixed(2) }} V</span>
                      </div>
                      <div class="border-t border-green-300 dark:border-green-700 pt-2 mt-2">
                        <div class="flex justify-between">
                          <span class="text-gray-600 dark:text-gray-300">Required Resistor:</span>
                          <span class="font-bold text-green-600 dark:text-green-400 text-lg">{{ resistorValue }} Ω</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-900 dark:text-gray-200 mb-2">Standard Resistor Value</h4>
                    <div class="flex items-center gap-2">
                      <span class="text-2xl font-bold text-primary">{{ standardResistorValue }}</span>
                      <span class="text-gray-500 dark:text-gray-400">Ω</span>
                      <span v-if="standardResistorValue !== resistorValue.toFixed(0)" class="text-xs text-gray-500 dark:text-gray-400">
                        (nearest to {{ resistorValue.toFixed(1) }}Ω)
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Circuit Notes -->
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">📝 Design Notes</h4>
                  <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li v-if="circuitType === 'series'">• Series: All LEDs share the same current</li>
                    <li v-else>• Parallel: Each LED has independent current</li>
                    <li>• Use 1/4W resistor for power &lt; 0.25W</li>
                    <li>• Use 1/2W resistor for power ≥ 0.25W</li>
                    <li v-if="resistorPower > 0.5" class="text-red-600 dark:text-red-400 font-semibold">⚠️ High power! Consider 1W resistor</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding LED Circuits</h3>
              
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Series LED Circuits</h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-3">
                    In series, the same current flows through all LEDs. The total voltage drop is the sum of individual LED voltages.
                  </p>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm">
                    R = (Vs - n×Vf) / If
                  </div>
                  <ul class="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>✅ More efficient (single resistor)</li>
                    <li>✅ Same brightness for all LEDs</li>
                    <li>⚠️ If one LED fails, all go dark</li>
                    <li>⚠️ Total Vf must be less than Vs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Parallel LED Circuits</h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-3">
                    In parallel, each LED has its own path. The voltage is the same across all LEDs, but currents add up.
                  </p>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm">
                    R = (Vs - Vf) / (n×If)
                  </div>
                  <ul class="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>✅ If one LED fails, others stay lit</li>
                    <li>✅ Can mix different LED colors</li>
                    <li>⚠️ Less efficient (higher current)</li>
                    <li>⚠️ Brightness may vary between LEDs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import { LightBulbIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

const colorMode = useColorMode()

// Reactive state
const circuitType = ref('series')
const supplyVoltage = ref(12)
const ledVoltage = ref(2.0)
const ledCurrent = ref(20)
const ledCount = ref(3)

// Standard resistor values (E12 series)
const standardResistors = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]

// Calculated values
const resistorValue = computed(() => {
  const Vs = supplyVoltage.value
  const Vf = ledVoltage.value
  const If = ledCurrent.value / 1000 // Convert mA to A
  const n = ledCount.value
  
  if (circuitType.value === 'series') {
    const totalVf = n * Vf
    if (totalVf >= Vs) return 0
    return (Vs - totalVf) / If
  } else {
    // Parallel
    if (Vf >= Vs) return 0
    const totalCurrent = n * If
    return (Vs - Vf) / totalCurrent
  }
})

const voltageAcrossResistor = computed(() => {
  const Vs = supplyVoltage.value
  const Vf = ledVoltage.value
  const n = ledCount.value
  
  if (circuitType.value === 'series') {
    return Vs - (n * Vf)
  } else {
    return Vs - Vf
  }
})

const totalCurrent = computed(() => {
  return ledCount.value * ledCurrent.value
})

const resistorPower = computed(() => {
  const V = voltageAcrossResistor.value
  const I = circuitType.value === 'series' ? (ledCurrent.value / 1000) : (totalCurrent.value / 1000)
  return V * I
})

const totalLedPower = computed(() => {
  const Vf = ledVoltage.value
  const If = ledCurrent.value / 1000
  return ledCount.value * Vf * If
})

const totalPower = computed(() => {
  return resistorPower.value + totalLedPower.value
})

const voltageWarning = computed(() => {
  const Vs = supplyVoltage.value
  const Vf = ledVoltage.value
  const n = ledCount.value
  
  if (circuitType.value === 'series') {
    const totalVf = n * Vf
    if (totalVf >= Vs) {
      return `Total LED voltage (${totalVf.toFixed(2)}V) exceeds supply voltage! Reduce LED count or increase supply voltage.`
    }
  } else {
    if (Vf >= Vs) {
      return `LED forward voltage (${Vf}V) exceeds supply voltage! Increase supply voltage.`
    }
  }
  return null
})

const standardResistorValue = computed(() => {
  const R = resistorValue.value
  if (R <= 0) return '0'
  
  // Find the nearest standard value
  let nearest = standardResistors[0]
  let minDiff = Math.abs(R - nearest)
  
  // Try different scales
  for (let scale = 0; scale <= 6; scale++) {
    for (const base of standardResistors) {
      const value = base * Math.pow(10, scale)
      const diff = Math.abs(R - value)
      if (diff < minDiff) {
        minDiff = diff
        nearest = value
      }
    }
  }
  
  if (nearest >= 1000000) {
    return (nearest / 1000000).toFixed(1) + 'M'
  } else if (nearest >= 1000) {
    return (nearest / 1000).toFixed(1) + 'k'
  } else {
    return nearest.toFixed(1)
  }
})

// LED display positions for series circuit
const displayLEDs = computed(() => {
  const leds = []
  const startX = 220
  const spacing = 80
  
  for (let i = 0; i < Math.min(ledCount.value, 6); i++) {
    leds.push({
      x: startX + (i * spacing),
      y: 80
    })
  }
  
  return leds
})

const resistorPos = computed(() => {
  const ledCountToShow = Math.min(ledCount.value, 6)
  return 220 + (ledCountToShow * 80) + 50
})

// LED display positions for parallel circuit
const displayLEDsParallel = computed(() => {
  const leds = []
  const startX = 240
  const spacing = 75
  const totalHeight = 230
  const topY = 60
  const bottomY = 290
  
  for (let i = 0; i < Math.min(ledCount.value, 6); i++) {
    const y = topY + ((i + 1) * (totalHeight / (ledCount.value + 1)))
    leds.push({
      x1: startX + (i * spacing),
      y: y - 20,
      midY: y,
      bottomY: y + 20
    })
  }
  
  return leds
})

// Color computed properties
const voltageColor = computed(() => {
  return supplyVoltage.value > 15 ? '#ef4444' : supplyVoltage.value > 10 ? '#f59e0b' : '#22c55e'
})

const resistorColor = computed(() => {
  const power = resistorPower.value
  if (power > 0.5) return '#ef4444'
  if (power > 0.25) return '#f59e0b'
  return '#3b82f6'
})

// SEO
useHead({
  title: 'LED Circuit Designer - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design LED circuits in series or parallel. Calculate resistor values and visualize circuit behavior.' }
  ]
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  border: none;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}
</style>

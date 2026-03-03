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
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Diode Forward Bias Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate diode current, voltage drop, and power dissipation
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              Shockley Equation: I = I<sub>s</sub>(e<sup>V<sub>d</sub>/nV<sub>t</sub></sup> - 1)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Input Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <CogIcon class="h-6 w-6 mr-2 text-primary" />
              Circuit Parameters
            </h3>
            
            <!-- Diode Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Diode Type
              </label>
              <select 
                v-model="diodeType" 
                @change="updateDiodeParameters"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="silicon">Silicon Diode (1N4148, 1N4007)</option>
                <option value="germanium">Germanium Diode (1N34A, 1N60)</option>
                <option value="schottky">Schottky Diode (1N5819, BAT85)</option>
                <option value="led-red">Red LED</option>
                <option value="led-green">Green LED</option>
                <option value="led-blue">Blue LED</option>
                <option value="led-white">White LED</option>
                <option value="zener">Zener Diode (Reference)</option>
              </select>
            </div>

            <!-- Supply Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supply Voltage (V<sub>s</sub>)
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="supplyVoltage"
                  type="range"
                  min="0"
                  max="50"
                  step="0.1"
                  class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="relative w-28">
                  <input
                    v-model.number="supplyVoltage"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span class="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">V</span>
                </div>
              </div>
            </div>

            <!-- Series Resistance -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Series Resistance (R<sub>s</sub>)
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="seriesResistance"
                  type="range"
                  min="1"
                  max="10000"
                  step="10"
                  class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="relative w-28">
                  <input
                    v-model.number="seriesResistance"
                    type="number"
                    min="1"
                    max="10000"
                    step="10"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">Ω</span>
                </div>
              </div>
            </div>

            <!-- Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperature (T)
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="temperature"
                  type="range"
                  min="-40"
                  max="150"
                  step="1"
                  class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="relative w-28">
                  <input
                    v-model.number="temperature"
                    type="number"
                    min="-40"
                    max="150"
                    step="1"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span class="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">°C</span>
                </div>
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quick Presets
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="setPreset('led-5v')"
                  class="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                >
                  LED @ 5V
                </button>
                <button
                  @click="setPreset('silicon-rectifier')"
                  class="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                >
                  Silicon Rectifier
                </button>
                <button
                  @click="setPreset('schottky-power')"
                  class="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                >
                  Schottky Power
                </button>
                <button
                  @click="setPreset('germanium-rf')"
                  class="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                >
                  Germanium RF
                </button>
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div class="space-y-6">
            <!-- Main Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <ChartBarIcon class="h-6 w-6 mr-2 text-primary" />
                Results
              </h3>
              
              <div class="grid grid-cols-1 gap-4">
                <!-- Diode Current -->
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Diode Current</p>
                      <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {{ formatCurrent(diodeCurrent) }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-600 dark:text-gray-400">Range</p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {{ getCurrentRange() }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Diode Voltage Drop -->
                <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Voltage Drop</p>
                      <p class="text-3xl font-bold text-green-600 dark:text-green-400">
                        {{ diodeVoltageDrop.toFixed(3) }} V
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-600 dark:text-gray-400">Typical</p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {{ typicalForwardVoltage }} V
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Power Dissipation -->
                <div class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Power Dissipation</p>
                      <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        {{ powerDissipation.toFixed(3) }} W
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <p :class="{'text-green-600': powerDissipation < 0.5, 'text-yellow-600': powerDissipation >= 0.5 && powerDissipation < 1, 'text-red-600': powerDissipation >= 1}" class="text-lg font-semibold">
                        {{ getPowerStatus() }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Thermal Voltage -->
                <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Thermal Voltage (V<sub>t</sub>)</p>
                      <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {{ thermalVoltage.toFixed(4) }} V
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {{ temperature }}°C
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Diode Parameters Info -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Diode Parameters ({{ getDiodeTypeName() }})
              </h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p class="text-gray-600 dark:text-gray-400">Saturation Current (I<sub>s</sub>)</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                    {{ formatScientific(saturationCurrent) }} A
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p class="text-gray-600 dark:text-gray-400">Emission Coeff (n)</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                    {{ emissionCoefficient }}
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p class="text-gray-600 dark:text-gray-400">Forward Voltage (Typical)</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                    {{ typicalForwardVoltage }} V
                  </p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p class="text-gray-600 dark:text-gray-400">Breakdown Voltage</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                    {{ breakdownVoltage }} V
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- I-V Characteristic Curve -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <ChartBarIcon class="h-6 w-6 mr-2 text-primary" />
            I-V Characteristic Curve
          </h3>
          
          <div class="relative">
            <svg viewBox="0 0 800 400" class="w-full h-auto">
              <!-- Background Grid -->
              <defs>
                <pattern id="ivGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                </pattern>
              </defs>
              <rect x="50" y="20" width="720" height="340" fill="url(#ivGrid)" />
              
              <!-- Axes -->
              <line x1="50" y1="360" x2="770" y2="360" stroke="#374151" stroke-width="2" />
              <line x1="50" y1="20" x2="50" y2="360" stroke="#374151" stroke-width="2" />
              
              <!-- Axis Labels -->
              <text x="410" y="395" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">Voltage (V)</text>
              <text x="15" y="190" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151" transform="rotate(-90, 15, 190)">Current (A)</text>
              
              <!-- I-V Curve (Forward Bias) -->
              <path :d="generateIVCurvePath()" fill="none" stroke="#9FA8DA" stroke-width="3" class="transition-all duration-300"/>
              
              <!-- Operating Point -->
              <g v-if="diodeCurrent > 0">
                <circle :cx="getOperatingPointX()" :cy="getOperatingPointY()" r="8" fill="#22c55e" stroke="white" stroke-width="2"/>
                <line :x1="getOperatingPointX()" :y1="getOperatingPointY()" x2="770" :y2="getOperatingPointY()" stroke="#22c55e" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
                <line :x1="getOperatingPointX()" :y1="getOperatingPointY()" x2="getOperatingPointX()" y2="360" stroke="#22c55e" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
              </g>
              
              <!-- Voltage Scale Markings -->
              <g font-size="10" fill="#6b7280">
                <text x="50" y="375" text-anchor="middle">0</text>
                <text x="194" y="375" text-anchor="middle">0.2</text>
                <text x="338" y="375" text-anchor="middle">0.4</text>
                <text x="482" y="375" text-anchor="middle">0.6</text>
                <text x="626" y="375" text-anchor="middle">0.8</text>
                <text x="770" y="375" text-anchor="middle">1.0</text>
              </g>
              
              <!-- Legend -->
              <g transform="translate(580, 40)">
                <rect width="180" height="80" fill="white" fill-opacity="0.9" rx="8"/>
                <line x1="15" y1="25" x2="45" y2="25" stroke="#9FA8DA" stroke-width="3"/>
                <text x="55" y="29" font-size="12" fill="#374151">I-V Curve</text>
                <circle cx="30" cy="50" r="6" fill="#22c55e"/>
                <text x="55" y="54" font-size="12" fill="#374151">Operating Point</text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Diode Forward Bias
          </h3>
          
          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is Forward Bias?</h4>
              <p class="leading-relaxed">
                A diode is forward-biased when the anode voltage is higher than the cathode voltage. In this condition, 
                the diode allows current to flow easily. The relationship between voltage and current is governed by the 
                <strong>Shockley diode equation</strong>:
              </p>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mt-3 font-mono text-center text-lg">
                I = I<sub>s</sub>(e<sup>V<sub>d</sub>/nV<sub>t</sub></sup> - 1)
              </div>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Parameters</h4>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>I<sub>s</sub> (Saturation Current):</strong> The small reverse leakage current, typically 10<sup>-12</sup> to 10<sup>-6</sup> A</li>
                <li><strong>V<sub>d</sub> (Diode Voltage):</strong> Voltage across the diode</li>
                <li><strong>n (Emission Coefficient):</strong> Ideality factor, typically 1-2</li>
                <li><strong>V<sub>t</sub> (Thermal Voltage):</strong> V<sub>t</sub> = kT/q ≈ 25.85 mV at 25°C</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Temperature Effects</h4>
              <p class="leading-relaxed">
                Diode characteristics are highly temperature-dependent. As temperature increases:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Forward voltage drop <strong>decreases</strong> (~2 mV/°C for silicon)</li>
                <li>Reverse leakage current <strong>increases</strong> significantly</li>
                <li>Thermal voltage V<sub>t</sub> <strong>increases</strong> linearly</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Diode Types Comparison</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">V<sub>f</sub> (Typical)</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applications</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">Silicon</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">0.6-0.7 V</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">General purpose rectification</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">Germanium</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">0.2-0.3 V</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">RF detectors, low-voltage circuits</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">Schottky</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">0.15-0.45 V</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">High-frequency, low-loss rectification</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">LED</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">1.8-3.3 V</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">Light emission, indicator lamps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Practical Considerations</h4>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>Series Resistor:</strong> Always use a current-limiting resistor to prevent excessive current</li>
                <li><strong>Power Rating:</strong> Ensure the diode's power rating exceeds calculated dissipation</li>
                <li><strong>Reverse Voltage:</strong> Never exceed the diode's peak inverse voltage (PIV) rating</li>
                <li><strong>Switching Speed:</strong> Consider reverse recovery time for high-frequency applications</li>
                <li><strong>Heat Sinking:</strong> For power diodes, use appropriate heat sinks for thermal management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base text-gray-400">&copy; 2026 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { BoltIcon, CogIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'

useHead({
  title: 'Diode Forward Bias Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate diode forward bias current, voltage drop, and power dissipation using the Shockley equation' }
  ]
})

const colorMode = useColorMode()

// Input parameters
const diodeType = ref('silicon')
const supplyVoltage = ref(5)
const seriesResistance = ref(330)
const temperature = ref(25)

// Diode type parameters
const diodeParameters = {
  silicon: { saturationCurrent: 1e-12, emissionCoefficient: 1.5, forwardVoltage: 0.7, breakdownVoltage: 1000 },
  germanium: { saturationCurrent: 1e-6, emissionCoefficient: 1.2, forwardVoltage: 0.3, breakdownVoltage: 100 },
  schottky: { saturationCurrent: 1e-8, emissionCoefficient: 1.0, forwardVoltage: 0.3, breakdownVoltage: 100 },
  'led-red': { saturationCurrent: 1e-10, emissionCoefficient: 2.0, forwardVoltage: 1.8, breakdownVoltage: 5 },
  'led-green': { saturationCurrent: 1e-10, emissionCoefficient: 2.0, forwardVoltage: 2.1, breakdownVoltage: 5 },
  'led-blue': { saturationCurrent: 1e-10, emissionCoefficient: 2.0, forwardVoltage: 2.8, breakdownVoltage: 5 },
  'led-white': { saturationCurrent: 1e-10, emissionCoefficient: 2.0, forwardVoltage: 3.0, breakdownVoltage: 5 },
  zener: { saturationCurrent: 1e-12, emissionCoefficient: 1.5, forwardVoltage: 0.7, breakdownVoltage: 5.1 }
}

// Computed properties
const saturationCurrent = computed(() => diodeParameters[diodeType.value].saturationCurrent)
const emissionCoefficient = computed(() => diodeParameters[diodeType.value].emissionCoefficient)
const typicalForwardVoltage = computed(() => diodeParameters[diodeType.value].forwardVoltage)
const breakdownVoltage = computed(() => diodeParameters[diodeType.value].breakdownVoltage)

// Thermal voltage: Vt = kT/q
// k = 1.380649e-23 J/K (Boltzmann constant)
// q = 1.602176634e-19 C (elementary charge)
// Vt at 25°C ≈ 25.85 mV
const thermalVoltage = computed(() => {
  const T = temperature.value + 273.15 // Convert to Kelvin
  return (1.380649e-23 * T) / 1.602176634e-19
})

// Calculate diode current using iterative method
// I = Is * (exp(Vd/(n*Vt)) - 1)
// Vd = Vs - I*Rs
const diodeCurrent = computed(() => {
  if (supplyVoltage.value <= 0) return 0
  
  const Vs = supplyVoltage.value
  const Rs = seriesResistance.value
  const Is = saturationCurrent.value
  const n = emissionCoefficient.value
  const Vt = thermalVoltage.value
  
  // Iterative solution
  let I = 0.001 // Initial guess (1 mA)
  const maxIterations = 100
  const tolerance = 1e-9
  
  for (let i = 0; i < maxIterations; i++) {
    const Vd = Vs - I * Rs
    if (Vd < 0) {
      I = 0
      break
    }
    
    const newI = Is * (Math.exp(Vd / (n * Vt)) - 1)
    
    if (Math.abs(newI - I) < tolerance) {
      I = newI
      break
    }
    
    I = (I + newI) / 2 // Damping for stability
  }
  
  return I
})

// Diode voltage drop
const diodeVoltageDrop = computed(() => {
  return supplyVoltage.value - diodeCurrent.value * seriesResistance.value
})

// Power dissipation in diode
const powerDissipation = computed(() => {
  return diodeCurrent.value * diodeVoltageDrop.value
})

// Methods
const updateDiodeParameters = () => {
  // Triggered when diode type changes
}

const setPreset = (preset) => {
  switch (preset) {
    case 'led-5v':
      diodeType.value = 'led-red'
      supplyVoltage.value = 5
      seriesResistance.value = 330
      break
    case 'silicon-rectifier':
      diodeType.value = 'silicon'
      supplyVoltage.value = 12
      seriesResistance.value = 100
      break
    case 'schottky-power':
      diodeType.value = 'schottky'
      supplyVoltage.value = 5
      seriesResistance.value = 10
      break
    case 'germanium-rf':
      diodeType.value = 'germanium'
      supplyVoltage.value = 1.5
      seriesResistance.value = 100
      break
  }
}

const formatCurrent = (current) => {
  if (current < 1e-6) return (current * 1e9).toFixed(3) + ' nA'
  if (current < 1e-3) return (current * 1e6).toFixed(3) + ' µA'
  if (current < 1) return (current * 1e3).toFixed(3) + ' mA'
  return current.toFixed(3) + ' A'
}

const formatScientific = (value) => {
  if (value === 0) return '0'
  const exponent = Math.floor(Math.log10(Math.abs(value)))
  const mantissa = value / Math.pow(10, exponent)
  return `${mantissa.toFixed(2)}e${exponent}`
}

const getCurrentRange = () => {
  const current = diodeCurrent.value
  if (current < 1e-6) return 'Nanoamp'
  if (current < 1e-3) return 'Microamp'
  if (current < 1) return 'Milliamp'
  return 'Amp'
}

const getPowerStatus = () => {
  const power = powerDissipation.value
  if (power < 0.5) return 'Excellent'
  if (power < 1) return 'Good'
  return 'High Power'
}

const getDiodeTypeName = () => {
  const names = {
    'silicon': 'Silicon',
    'germanium': 'Germanium',
    'schottky': 'Schottky',
    'led-red': 'Red LED',
    'led-green': 'Green LED',
    'led-blue': 'Blue LED',
    'led-white': 'White LED',
    'zener': 'Zener'
  }
  return names[diodeType.value] || diodeType.value
}

// Generate I-V curve path for SVG
const generateIVCurvePath = () => {
  const Is = saturationCurrent.value
  const n = emissionCoefficient.value
  const Vt = thermalVoltage.value
  
  let path = 'M 50 360'
  
  // Generate points from 0V to 1V
  for (let v = 0; v <= 1.0; v += 0.01) {
    const current = Is * (Math.exp(v / (n * Vt)) - 1)
    
    // Map voltage to x coordinate (0V = 50, 1V = 770)
    const x = 50 + (v / 1.0) * 720
    
    // Map current to y coordinate (scale: 0-100mA)
    const maxCurrent = 0.1 // 100 mA max for display
    const normalizedCurrent = Math.min(current / maxCurrent, 1)
    const y = 360 - normalizedCurrent * 340
    
    path += ` L ${x} ${y}`
  }
  
  return path
}

// Get operating point coordinates for SVG
const getOperatingPointX = () => {
  const Vd = diodeVoltageDrop.value
  return 50 + (Vd / 1.0) * 720
}

const getOperatingPointY = () => {
  const I = diodeCurrent.value
  const maxCurrent = 0.1
  const normalizedCurrent = Math.min(I / maxCurrent, 1)
  return 360 - normalizedCurrent * 340
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}

input[type="range"] {
  accent-color: var(--tw-color-primary);
}
</style>

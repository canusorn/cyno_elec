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
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Transformer Basics
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how transformers change voltage levels using electromagnetic induction
          </p>

          <!-- Transformer Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">Vp/Vs</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">Np/Ns</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">Is/Ip</span>
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
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Transformer Parameters</h3>

              <!-- Input Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Voltage (Vp)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    v-model.number="primaryVoltage"
                    type="number"
                    min="1"
                    max="1000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span class="text-gray-600 dark:text-gray-400 text-sm w-12">V</span>
                </div>
                <input
                  v-model.number="primaryVoltage"
                  type="range"
                  min="1"
                  max="1000"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- Primary Turns -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Turns (Np)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    v-model.number="primaryTurns"
                    type="number"
                    min="1"
                    max="1000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span class="text-gray-600 dark:text-gray-400 text-sm w-12">turns</span>
                </div>
                <input
                  v-model.number="primaryTurns"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- Secondary Turns -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secondary Turns (Ns)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    v-model.number="secondaryTurns"
                    type="number"
                    min="1"
                    max="1000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span class="text-gray-600 dark:text-gray-400 text-sm w-12">turns</span>
                </div>
                <input
                  v-model.number="secondaryTurns"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- Load Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistance
                </label>
                <div class="flex items-center gap-3">
                  <input
                    v-model.number="loadResistance"
                    type="number"
                    min="1"
                    max="10000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span class="text-gray-600 dark:text-gray-400 text-sm w-12">Ω</span>
                </div>
                <input
                  v-model.number="loadResistance"
                  type="range"
                  min="1"
                  max="10000"
                  step="10"
                  class="w-full mt-2 accent-primary"
                />
              </div>

              <!-- Presets -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    @click="setPreset('step-down')"
                    class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    Step-Down 12V
                  </button>
                  <button
                    @click="setPreset('step-up')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Step-Up 230V
                  </button>
                  <button
                    @click="setPreset('isolation')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    Isolation 1:1
                  </button>
                  <button
                    @click="setPreset('high-voltage')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    High-Voltage
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">

            <!-- Transformer Type Badge -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Transformer Type</h3>
                <div
                  :class="{
                    'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300': transformerType === 'step-down',
                    'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300': transformerType === 'step-up',
                    'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300': transformerType === 'isolation'
                  }"
                  class="px-4 py-2 rounded-lg font-bold text-lg"
                >
                  {{ transformerTypeText }}
                </div>
              </div>

              <!-- Transformer Diagram -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-xl p-8">
                <svg viewBox="0 0 600 350" class="w-full h-auto">
                  <!-- Core -->
                  <rect x="220" y="50" width="160" height="250" fill="none" stroke="#6B7280" stroke-width="8" rx="10" />
                  <rect x="225" y="55" width="150" height="240" fill="none" stroke="#9CA3AF" stroke-width="4" rx="8" />

                  <!-- Primary Coil (Left) -->
                  <g :class="{ 'animate-pulse': animating }">
                    <!-- Primary winding representation -->
                    <path
                      d="M 200 75 Q 180 85, 160 95 Q 140 105, 120 115"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 95 Q 180 105, 160 115 Q 140 125, 120 135"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 115 Q 180 125, 160 135 Q 140 145, 120 155"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 135 Q 180 145, 160 155 Q 140 165, 120 175"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 155 Q 180 165, 160 175 Q 140 185, 120 195"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 175 Q 180 185, 160 195 Q 140 205, 120 215"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 195 Q 180 205, 160 215 Q 140 225, 120 235"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 200 215 Q 180 225, 160 235 Q 140 245, 120 255"
                      fill="none"
                      stroke="#F59E0B"
                      stroke-width="4"
                      stroke-linecap="round"
                    />

                    <!-- Primary labels -->
                    <text x="50" y="100" :font-size="primaryTurns > secondaryTurns ? '20' : '16'" font-weight="bold" fill="#F59E0B">
                      Np = {{ primaryTurns }}
                    </text>
                    <text x="50" y="130" font-size="14" fill="#6B7280">Primary</text>
                  </g>

                  <!-- Secondary Coil (Right) -->
                  <g :class="{ 'animate-pulse': animating }">
                    <!-- Secondary winding representation -->
                    <path
                      d="M 400 75 Q 420 85, 440 95 Q 460 105, 480 115"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 95 Q 420 105, 440 115 Q 460 125, 480 135"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 115 Q 420 125, 440 135 Q 460 145, 480 155"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 135 Q 420 145, 440 155 Q 460 165, 480 175"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 155 Q 420 165, 440 175 Q 460 185, 480 195"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 175 Q 420 185, 440 195 Q 460 205, 480 215"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 195 Q 420 205, 440 215 Q 460 225, 480 235"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M 400 215 Q 420 225, 440 235 Q 460 245, 480 255"
                      fill="none"
                      stroke="#3B82F6"
                      stroke-width="4"
                      stroke-linecap="round"
                    />

                    <!-- Secondary labels -->
                    <text x="490" y="100" :font-size="secondaryTurns > primaryTurns ? '20' : '16'" font-weight="bold" fill="#3B82F6">
                      Ns = {{ secondaryTurns }}
                    </text>
                    <text x="490" y="130" font-size="14" fill="#6B7280">Secondary</text>
                  </g>

                  <!-- Magnetic Flux (animated) -->
                  <g v-if="animating">
                    <circle cx="300" cy="120" r="15" fill="#FCD34D" opacity="0.6">
                      <animate
                        attributeName="cy"
                        values="120;230;120"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0.2;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  <!-- Input Source -->
                  <circle cx="80" cy="175" r="25" fill="white" stroke="#10B981" stroke-width="3" />
                  <text x="65" y="180" font-size="18" font-weight="bold" fill="#10B981">
                    {{ primaryVoltage }}V
                  </text>
                  <line x1="105" y1="175" x2="120" y2="175" stroke="#10B981" stroke-width="3" />

                  <!-- Output Load -->
                  <rect x="480" y="160" width="50" height="30" fill="white" stroke="#EF4444" stroke-width="3" rx="3" />
                  <text x="485" y="180" font-size="12" font-weight="bold" fill="#EF4444">
                    {{ loadResistance }}Ω
                  </text>
                  <line x1="480" y1="175" x2="450" y2="175" stroke="#EF4444" stroke-width="3" />

                  <!-- Voltage indicators -->
                  <text x="65" y="220" font-size="14" font-weight="bold" fill="#10B981">
                    Vp = {{ primaryVoltage }}V
                  </text>
                  <text x="490" y="220" font-size="14" font-weight="bold" fill="#EF4444">
                    Vs = {{ secondaryVoltage.toFixed(1) }}V
                  </text>

                  <!-- Current indicators -->
                  <text x="65" y="245" font-size="14" fill="#6B7280">
                    Ip = {{ primaryCurrent.toFixed(3) }}A
                  </text>
                  <text x="490" y="245" font-size="14" fill="#6B7280">
                    Is = {{ secondaryCurrent.toFixed(3) }}A
                  </text>

                  <!-- Power indicators -->
                  <text x="65" y="270" font-size="14" fill="#6B7280">
                    Pp = {{ primaryPower.toFixed(1) }}W
                  </text>
                  <text x="490" y="270" font-size="14" fill="#6B7280">
                    Ps = {{ secondaryPower.toFixed(1) }}W
                  </text>

                  <!-- Turns ratio -->
                  <text x="220" y="320" font-size="16" font-weight="bold" fill="#9CA3AF">
                    Turns Ratio = {{ turnsRatio.toFixed(2) }}:1
                  </text>
                </svg>
              </div>

              <!-- Animation Control -->
              <div class="flex justify-center mt-4">
                <button
                  @click="animating = !animating"
                  :class="animating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                  class="px-6 py-3 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg v-if="!animating" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ animating ? 'Stop Animation' : 'Start Animation' }}
                </button>
              </div>
            </div>

            <!-- Results Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Values</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Turns Ratio</div>
                  <div class="text-2xl font-bold text-primary">{{ turnsRatio.toFixed(2) }}:1</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Secondary Voltage</div>
                  <div class="text-2xl font-bold text-blue-600">{{ secondaryVoltage.toFixed(1) }}V</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Current</div>
                  <div class="text-2xl font-bold text-orange-600">{{ primaryCurrent.toFixed(3) }}A</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Secondary Current</div>
                  <div class="text-2xl font-bold text-green-600">{{ secondaryCurrent.toFixed(3) }}A</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Primary Power</div>
                  <div class="text-2xl font-bold text-purple-600">{{ primaryPower.toFixed(1) }}W</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Secondary Power</div>
                  <div class="text-2xl font-bold text-purple-600">{{ secondaryPower.toFixed(1) }}W</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficiency</div>
                  <div class="text-2xl font-bold text-green-600">{{ efficiency }}%</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Impedance Ratio</div>
                  <div class="text-2xl font-bold text-gray-600">{{ impedanceRatio.toFixed(1) }}:1</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Transformers
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Transformer?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A transformer is a passive electrical device that transfers electrical energy from one circuit to another through electromagnetic induction. It's commonly used to increase (step up) or decrease (step down) AC voltage levels.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div>Voltage Ratio: Vp/Vs = Np/Ns</div>
              <div>Current Ratio: Ip/Is = Ns/Np</div>
              <div>Turns Ratio: a = Np/Ns</div>
              <div>Power: P = V × I (ideal transformer: Pp = Ps)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Transformer Types:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Step-Down Transformer:</strong> Secondary voltage < Primary voltage (Ns < Np). Used in power adapters.</li>
              <li><strong>Step-Up Transformer:</strong> Secondary voltage > Primary voltage (Ns > Np). Used in power transmission.</li>
              <li><strong>Isolation Transformer:</strong> Primary and secondary voltages are equal (Np = Ns). Used for safety.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Power distribution systems (stepping up for transmission, stepping down for use)</li>
              <li>AC adapters and chargers</li>
              <li>Audio impedance matching</li>
              <li>Isolation for safety</li>
              <li>Voltage conversion in electronic devices</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Impedance Matching:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Transformers can also match impedances between source and load. The impedance ratio is the square of the turns ratio:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              Zp/Zs = (Np/Ns)²
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import { computed, ref } from 'vue'

// SEO
useHead({
  title: 'Transformer Basics - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive transformer simulation. Learn how transformers change voltage levels through electromagnetic induction with turns ratio visualization.' },
    { name: 'keywords', content: 'transformer, voltage conversion, turns ratio, step-up, step-down, electrical simulation' }
  ]
})

const colorMode = useColorMode()

// Reactive state
const primaryVoltage = ref(120)
const primaryTurns = ref(100)
const secondaryTurns = ref(50)
const loadResistance = ref(10)
const animating = ref(false)

// Computed values
const turnsRatio = computed(() => primaryTurns.value / secondaryTurns.value)

const secondaryVoltage = computed(() => {
  return (primaryVoltage.value * secondaryTurns.value) / primaryTurns.value
})

const secondaryCurrent = computed(() => {
  return secondaryVoltage.value / loadResistance.value
})

const primaryCurrent = computed(() => {
  return secondaryCurrent.value * (secondaryTurns.value / primaryTurns.value)
})

const primaryPower = computed(() => {
  return primaryVoltage.value * primaryCurrent.value
})

const secondaryPower = computed(() => {
  return secondaryVoltage.value * secondaryCurrent.value
})

const efficiency = computed(() => {
  if (primaryPower.value === 0) return 100
  return ((secondaryPower.value / primaryPower.value) * 100).toFixed(1)
})

const impedanceRatio = computed(() => {
  return Math.pow(turnsRatio.value, 2)
})

const transformerType = computed(() => {
  if (primaryTurns.value > secondaryTurns.value) return 'step-down'
  if (primaryTurns.value < secondaryTurns.value) return 'step-up'
  return 'isolation'
})

const transformerTypeText = computed(() => {
  switch (transformerType.value) {
    case 'step-down':
      return '⬇️ Step-Down'
    case 'step-up':
      return '⬆️ Step-Up'
    case 'isolation':
      return '🔄 Isolation'
    default:
      return 'Unknown'
  }
})

// Methods
const setPreset = (type: string) => {
  switch (type) {
    case 'step-down':
      primaryVoltage.value = 120
      primaryTurns.value = 200
      secondaryTurns.value = 50
      loadResistance.value = 10
      break
    case 'step-up':
      primaryVoltage.value = 120
      primaryTurns.value = 50
      secondaryTurns.value = 200
      loadResistance.value = 100
      break
    case 'isolation':
      primaryVoltage.value = 120
      primaryTurns.value = 100
      secondaryTurns.value = 100
      loadResistance.value = 50
      break
    case 'high-voltage':
      primaryVoltage.value = 120
      primaryTurns.value = 20
      secondaryTurns.value = 200
      loadResistance.value = 1000
      break
  }
}
</script>

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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Thevenin's Theorem Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Simplify complex circuits with Thevenin equivalent circuits
          </p>

          <!-- Animated Formulas -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
                <span class="text-primary-highlight">V_th</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">V_s</span>
                <span class="text-gray-400">×</span>
                <span class="text-primary-highlight">R2</span>
                <span class="text-gray-400">÷</span>
                <span class="text-gray-400">(</span>
                <span class="text-primary-highlight">R1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">R2</span>
                <span class="text-gray-400">)</span>
              </div>
              <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
                <span class="text-primary-highlight">R_th</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">R1</span>
                <span class="text-gray-400">||</span>
                <span class="text-primary-highlight">R2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <!-- Original Circuit -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              🔌 Original Circuit
            </h3>
            <div class="flex justify-center mb-4">
              <svg viewBox="0 0 500 350" class="w-full max-w-lg h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Main circuit rectangle -->
                <line x1="50" y1="50" x2="450" y2="50" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="450" y1="50" x2="450" y2="300" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="450" y1="300" x2="50" y2="300" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="50" y1="300" x2="50" y2="50" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>

                <!-- Voltage Source -->
                <g>
                  <circle cx="50" cy="175" r="30" fill="white" stroke="#EF4444" stroke-width="2"/>
                  <line x1="38" y1="168" x2="62" y2="168" stroke="#EF4444" stroke-width="3"/>
                  <line x1="42" y1="182" x2="58" y2="182" stroke="#EF4444" stroke-width="2"/>
                  <text x="50" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">
                    {{ vs }}V
                  </text>
                </g>

                <!-- R1 on top -->
                <g>
                  <rect x="180" y="38" width="140" height="24" fill="white" stroke="#9FA8DA" stroke-width="2" rx="3"/>
                  <path d="M180 50 L195 40 L210 60 L225 40 L240 60 L255 40 L270 60 L285 40 L300 60 L320 50" 
                        stroke="#9FA8DA" stroke-width="2" fill="none"/>
                  <text x="250" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#9FA8DA">
                    R1 = {{ r1 }}Ω
                  </text>
                </g>

                <!-- R2 on right -->
                <g>
                  <rect x="438" y="125" width="24" height="100" fill="white" stroke="#9FA8DA" stroke-width="2" rx="3"/>
                  <path d="M450 125 L440 140 L460 155 L440 170 L460 185 L440 200 L460 215 L450 225" 
                        stroke="#9FA8DA" stroke-width="2" fill="none"/>
                  <text x="470" y="180" text-anchor="start" font-size="12" font-weight="bold" fill="#9FA8DA">
                    R2 = {{ r2 }}Ω
                  </text>
                </g>

                <!-- Output Terminals -->
                <circle cx="450" cy="175" r="6" fill="#10B981"/>
                <circle cx="450" cy="175" r="10" stroke="#10B981" stroke-width="2" fill="none"/>
                <text x="475" y="175" text-anchor="start" dominant-baseline="middle" font-size="12" font-weight="bold" fill="#10B981">
                  V_out
                </text>
              </svg>
            </div>
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              Original circuit with voltage source divider
            </p>
          </div>

          <!-- Thevenin Equivalent Circuit -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              ⚡ Thevenin Equivalent
            </h3>
            <div class="flex justify-center mb-4">
              <svg viewBox="0 0 500 350" class="w-full max-w-lg h-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Main circuit rectangle -->
                <line x1="50" y1="50" x2="450" y2="50" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="450" y1="50" x2="450" y2="300" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="450" y1="300" x2="50" y2="300" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>
                <line x1="50" y1="300" x2="50" y2="50" stroke="#6B7280" stroke-width="3" stroke-linecap="round"/>

                <!-- Thevenin Voltage Source -->
                <g>
                  <circle cx="50" cy="175" r="30" fill="white" stroke="#10B981" stroke-width="3"/>
                  <text x="50" y="180" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                    V_th
                  </text>
                  <text x="50" y="220" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                    {{ vth }}V
                  </text>
                </g>

                <!-- Thevenin Resistance on top -->
                <g>
                  <rect x="180" y="38" width="140" height="24" fill="white" stroke="#10B981" stroke-width="2" rx="3"/>
                  <path d="M180 50 L195 40 L210 60 L225 40 L240 60 L255 40 L270 60 L285 40 L300 60 L320 50" 
                        stroke="#10B981" stroke-width="2" fill="none"/>
                  <text x="250" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">
                    R_th = {{ rth }}Ω
                  </text>
                </g>

                <!-- Output Terminals -->
                <circle cx="450" cy="175" r="6" fill="#10B981"/>
                <circle cx="450" cy="175" r="10" stroke="#10B981" stroke-width="2" fill="none"/>
                <text x="475" y="175" text-anchor="start" dominant-baseline="middle" font-size="12" font-weight="bold" fill="#10B981">
                  V_out
                </text>
              </svg>
            </div>
            <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
              Simplified equivalent circuit
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Source Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Source Voltage (V_s)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="vs"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="vs"
                  type="range"
                  min="1"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- R1 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistor R1
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="r1"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="r1"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- R2 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistor R2
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="r2"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="r2"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Load Resistor (Optional) -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistor (R_L) - Optional
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="rl"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="rl"
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Thevenin Equivalent Results</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- V_th -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Thevenin Voltage</span>
                    <span class="text-xs bg-green-500 text-white px-2 py-1 rounded-full">V_th</span>
                  </div>
                  <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {{ vth }} V
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Open-circuit voltage at terminals
                  </p>
                </div>

                <!-- R_th -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Thevenin Resistance</span>
                    <span class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">R_th</span>
                  </div>
                  <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ rth }} Ω
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Equivalent resistance seen from terminals
                  </p>
                </div>
              </div>

              <!-- With Load Results -->
              <div v-if="rl > 0" class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🔌 With Load Resistor Connected</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Load Voltage -->
                  <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-gray-700 dark:text-gray-300 font-semibold">Load Voltage</span>
                      <span class="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">V_L</span>
                    </div>
                    <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {{ vl }} V
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Voltage across load resistor
                    </p>
                  </div>

                  <!-- Load Current -->
                  <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-gray-700 dark:text-gray-300 font-semibold">Load Current</span>
                      <span class="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">I_L</span>
                    </div>
                    <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {{ il }} mA
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Current through load resistor
                    </p>
                  </div>
                </div>
              </div>

              <!-- Calculations Display -->
              <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📝 Step-by-Step Calculation</h4>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Step 1: Calculate V_th (voltage divider)</p>
                    <code class="text-sm font-mono text-primary">
                      V_th = {{ vs }} × ({{ r2 }} / ({{ r1 }} + {{ r2 }})) = {{ vth }} V
                    </code>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Step 2: Calculate R_th (parallel combination)</p>
                    <code class="text-sm font-mono text-primary">
                      R_th = ({{ r1 }} × {{ r2 }}) / ({{ r1 }} + {{ r2 }}) = {{ rth }} Ω
                    </code>
                  </div>

                  <div v-if="rl > 0" class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Step 3: Calculate load voltage and current</p>
                    <code class="text-sm font-mono text-primary block mb-1">
                      V_L = {{ vth }} × ({{ rl }} / ({{ rth }} + {{ rl }})) = {{ vl }} V
                    </code>
                    <code class="text-sm font-mono text-primary">
                      I_L = {{ vl }} / {{ rl }} × 1000 = {{ il }} mA
                    </code>
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
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Thevenin's Theorem</h3>
          
          <div class="prose dark:prose-invert max-w-none">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is Thevenin's Theorem?</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Thevenin's theorem states that any linear electrical network with voltage and current sources and resistances can be replaced 
              by an equivalent circuit consisting of a single voltage source (V_th) in series with a single resistance (R_th).
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">When to Use It?</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li>Analyzing complex circuits with multiple sources</li>
              <li>Simplifying circuit analysis by reducing complex networks</li>
              <li>Calculating the effect of different load resistances</li>
              <li>Designing interface circuits between different stages</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Find Thevenin Equivalent?</h4>
            <ol class="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Find V_th:</strong> Calculate the open-circuit voltage across the terminals of interest</li>
              <li><strong>Find R_th:</strong> Short all voltage sources and open all current sources, then calculate the equivalent resistance seen from the terminals</li>
            </ol>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Applications</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Power supply design and analysis</li>
              <li>Amplifier input/output impedance matching</li>
              <li>Transmission line analysis</li>
              <li>Circuit debugging and troubleshooting</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Cyno Electric - Making Electrical Engineering Easy to Understand</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input values
const vs = ref(12)      // Source voltage
const r1 = ref(100)     // Resistor 1
const r2 = ref(200)     // Resistor 2
const rl = ref(0)       // Load resistor (0 = no load)

// Computed values
const vth = computed(() => {
  return parseFloat(((vs.value * r2.value) / (r1.value + r2.value)).toFixed(3))
})

const rth = computed(() => {
  return parseFloat(((r1.value * r2.value) / (r1.value + r2.value)).toFixed(2))
})

const vl = computed(() => {
  if (rl.value <= 0) return 0
  return parseFloat((vth.value * rl.value / (rth.value + rl.value)).toFixed(3))
})

const il = computed(() => {
  if (rl.value <= 0) return 0
  return parseFloat((vl.value / rl.value * 1000).toFixed(2))
})
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

.text-primary-highlight {
  color: var(--tw-color-primary-dark) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
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
</style>

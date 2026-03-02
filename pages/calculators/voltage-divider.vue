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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Divider Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate output voltage and design voltage divider circuits with interactive visualization
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">V_out</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">V_in</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">R2</span>
              <span class="text-gray-400">÷</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary-highlight">R1</span>
              <span class="text-gray-400">+</span>
              <span class="text-primary-highlight">R2</span>
              <span class="text-gray-400">)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Output Voltage = Input × (Bottom Resistor ÷ Total Resistance)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Voltage Divider Circuit
          </h3>

          <!-- SVG Circuit Diagram -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 350" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <defs>
                <filter id="glowVoltage">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <!-- Main circuit rectangle -->
              <line x1="100" y1="50" x2="700" y2="50" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="700" y1="50" x2="700" y2="300" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="700" y1="300" x2="100" y2="300" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="100" y1="300" x2="100" y2="50" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>

              <!-- Input Voltage Source -->
              <g>
                <circle cx="100" cy="175" r="40" fill="white" stroke="#EF4444" stroke-width="3"/>
                <line x1="85" y1="165" x2="115" y2="165" stroke="#EF4444" stroke-width="4"/>
                <line x1="90" y1="185" x2="110" y2="185" stroke="#EF4444" stroke-width="2"/>
                <text x="100" y="230" text-anchor="middle" :font-size="13" font-weight="bold" fill="#EF4444">
                  V_in = {{ vin }}V
                </text>
              </g>

              <!-- R1 (Top Resistor) -->
              <g>
                <path d="M 300 50 L 300 35 L 310 40 L 290 50 L 310 60 L 290 70 L 310 80 L 290 90 L 310 100 L 300 105 L 300 120"
                  fill="none" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="300" y="30" text-anchor="middle" :font-size="12" font-weight="bold" fill="#3B82F6">
                  R1 = {{ r1 }}Ω
                </text>
                <text x="300" y="140" text-anchor="middle" :font-size="11" fill="#3B82F6">
                  VR1 = ((vin - vout).toFixed(2))V
                </text>
              </g>

              <!-- R2 (Bottom Resistor) -->
              <g>
                <path d="M 300 300 L 300 285 L 310 290 L 290 300 L 310 310 L 290 320 L 310 330 L 290 340 L 300 345 L 300 360"
                  fill="none" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, -60)"/>
                <text x="300" y="270" text-anchor="middle" :font-size="12" font-weight="bold" fill="#10B981">
                  R2 = {{ r2 }}Ω
                </text>
                <text x="300" y="215" text-anchor="middle" :font-size="11" fill="#10B981">
                  VR2 = {{ vout.toFixed(2) }}V
                </text>
              </g>

              <!-- Output Node -->
              <g>
                <circle cx="300" cy="175" r="6" fill="#F59E0B" filter="url(#glowVoltage)"/>
                <text x="320" y="180" :font-size="13" font-weight="bold" fill="#F59E0B">
                  V_out = {{ vout.toFixed(2) }}V
                </text>
              </g>

              <!-- Ground symbol -->
              <g transform="translate(700, 300)">
                <line x1="0" y1="0" x2="0" y2="20" stroke="#6B7280" stroke-width="3"/>
                <line x1="-20" y1="20" x2="20" y2="20" stroke="#6B7280" stroke-width="3"/>
                <line x1="-12" y1="26" x2="12" y2="26" stroke="#6B7280" stroke-width="3"/>
                <line x1="-4" y1="32" x2="4" y2="32" stroke="#6B7280" stroke-width="3"/>
              </g>

              <!-- Load connection indicator -->
              <g>
                <rect x="500" y="150" width="120" height="50" rx="5" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" stroke-width="2"/>
                <text x="560" y="175" text-anchor="middle" :font-size="11" fill="#8B5CF6">Load Connected</text>
                <text x="560" y="190" text-anchor="middle" :font-size="10" fill="#8B5CF6">to V_out</text>
              </g>

              <!-- Current indicator -->
              <g>
                <rect x="420" y="35" width="140" height="25" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" stroke-width="2"/>
                <text x="490" y="53" text-anchor="middle" :font-size="11" font-weight="bold" fill="#1E40AF">
                  I = {{ current.toFixed(4) }}A
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Controls -->
    <section class="pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎛️ Calculator Controls
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Input Voltage -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔋 Input Voltage (V_in)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="vin"
                  min="0"
                  max="1000"
                  step="0.1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">V</span>
              </div>
              <input
                type="range"
                v-model.number="vin"
                min="0"
                max="100"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <!-- R1 Resistor -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔵 Resistor R1 (Top)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="r1"
                  min="1"
                  max="1000000"
                  step="1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">Ω</span>
              </div>
              <input
                type="range"
                v-model.number="r1"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                VR1 = {{ (vin - vout).toFixed(2) }}V
              </div>
            </div>

            <!-- R2 Resistor -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🟢 Resistor R2 (Bottom)
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model.number="r2"
                  min="1"
                  max="1000000"
                  step="1"
                  class="w-full px-4 py-3 text-lg font-mono bg-gray-50 dark:bg-gray-700 border-2 border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-500 text-gray-900 dark:text-white"
                >
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold">Ω</span>
              </div>
              <input
                type="range"
                v-model.number="r2"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                VR2 = {{ vout.toFixed(2) }}V
              </div>
            </div>
          </div>

          <!-- Calculate Button -->
          <div class="mt-8 flex justify-center">
            <button
              @click="calculateFromVout"
              class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🔄 Reverse Calculate (Find R2 for Target V_out)
            </button>
          </div>

          <!-- Results Display -->
          <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Calculation Results</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Output Voltage</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ vout.toFixed(2) }}V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Resistance</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ (r1 + r2).toFixed(1) }}Ω</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Current</div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ current.toFixed(4) }}A</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Power</div>
                <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ totalPower.toFixed(3) }}W</div>
              </div>
            </div>

            <!-- Divider Ratio -->
            <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Voltage Divider Ratio:</div>
              <div class="font-mono text-lg text-gray-900 dark:text-gray-200">
                {{ (vout / vin).toFixed(4) }} ({{ ((vout / vin) * 100).toFixed(2) }}%)
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
            📚 Understanding Voltage Dividers
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Voltage Divider?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A voltage divider is a simple circuit that turns a large voltage into a smaller one using two resistors in series.
              It's one of the most fundamental circuits in electronics, used everywhere from sensors to power supplies.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Input voltage</strong> is applied across the series combination of R1 and R2</li>
              <li><strong>Output voltage</strong> is taken from the junction between R1 and R2</li>
              <li><strong>Voltage divides</strong> proportionally based on the ratio of resistances</li>
              <li>The same current flows through both resistors</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div>V_out = V_in × [R2 ÷ (R1 + R2)]</div>
              <div>I_total = V_in ÷ (R1 + R2)</div>
              <div>P_total = V_in × I_total</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Sensor circuits:</strong> Reducing voltage for microcontroller ADC inputs</li>
              <li><strong>Reference voltages:</strong> Creating stable voltage levels for comparators</li>
              <li><strong>Signal level shifting:</strong> Matching voltage levels between circuits</li>
              <li><strong>Bias networks:</strong> Setting operating points for transistors</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Avoid loading effects:</strong> Ensure load resistance ≫ R2 (at least 10x)</li>
              <li><strong>Power considerations:</strong> Calculate power dissipation in both resistors</li>
              <li><strong>Tolerance:</strong> Use 1% or better resistors for precise voltage division</li>
              <li><strong>Temperature:</strong> Resistor values change with temperature</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              If you have a 12V supply and need 3.3V for a microcontroller:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Desired ratio: 3.3V ÷ 12V = 0.275 (27.5%)</li>
              <li>Choose R2 = 1kΩ, then R1 = 2.6kΩ (or 2.7kΩ standard value)</li>
              <li>Current: 12V ÷ 3.7kΩ ≈ 3.2mA</li>
              <li>Power in R1: (8.7V)² ÷ 2700Ω ≈ 28mW</li>
              <li>Power in R2: (3.3V)² ÷ 1000Ω ≈ 11mW</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">⚠️ Important Warnings:</h3>
            <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
              <ul class="text-sm text-red-700 dark:text-red-400 space-y-2">
                <li>• Voltage dividers are NOT suitable for powering devices - use a voltage regulator instead</li>
                <li>• Output voltage changes when load is connected (loading effect)</li>
                <li>• Never use for high-power applications - resistors will overheat</li>
                <li>• For precision applications, use a dedicated voltage reference IC</li>
              </ul>
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
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const vin = ref(12)
const r1 = ref(220)
const r2 = ref(100)

// Computed properties
const vout = computed(() => {
  const totalR = r1.value + r2.value
  if (totalR === 0) return 0
  return vin.value * (r2.value / totalR)
})

const current = computed(() => {
  const totalR = r1.value + r2.value
  if (totalR === 0) return 0
  return vin.value / totalR
})

const totalPower = computed(() => {
  return vin.value * current.value
})

// Reverse calculation - find R2 for target V_out
const calculateFromVout = () => {
  const targetVout = parseFloat(prompt('Enter desired output voltage (V):', '3.3') || '3.3')
  if (targetVout >= vin.value) {
    alert('Output voltage must be less than input voltage!')
    return
  }

  // Formula: Vout = Vin * (R2 / (R1 + R2))
  // Rearranging: Vout/Vin = R2/(R1+R2)
  // Vout*(R1+R2) = Vin*R2
  // Vout*R1 + Vout*R2 = Vin*R2
  // Vout*R1 = (Vin - Vout)*R2
  // R2 = (Vout*R1) / (Vin - Vout)

  const newR2 = (targetVout * r1.value) / (vin.value - targetVout)
  r2.value = Math.round(newR2)
}

// SEO
useHead({
  title: 'Voltage Divider Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate voltage divider circuits with interactive visualization. Learn the voltage divider formula and design resistor networks.' },
    { name: 'keywords', content: 'voltage divider, resistor calculator, circuit design, electronics calculator' }
  ]
})
</script>

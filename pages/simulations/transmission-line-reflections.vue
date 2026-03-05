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
            📡 Transmission Line Reflections
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore signal reflections, impedance matching, and standing waves on transmission lines
          </p>
          
          <!-- Reflection Coefficient Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">Γ</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">(Z<sub>L</sub> - Z<sub>0</sub>)</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary">(Z<sub>L</sub> + Z<sub>0</sub>)</span>
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
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Line Parameters</h3>
              
              <!-- Characteristic Impedance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Characteristic Impedance (Z₀)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="z0"
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="z0"
                  type="range"
                  min="50"
                  max="300"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Line Length -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Line Length
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="lineLength"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">meters</span>
                </div>
                <input 
                  v-model.number="lineLength"
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Velocity Factor -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Velocity Factor
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="velocityFactor"
                    type="number" 
                    step="0.01"
                    max="1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">c</span>
                </div>
                <input 
                  v-model.number="velocityFactor"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical: RG-58 = 0.66, RG-213 = 0.66, LMR-400 = 0.85
                </p>
              </div>

              <!-- Load Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Configuration
                </label>
                <select 
                  v-model="loadType"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="matched">Matched Load (ZL = Z0)</option>
                  <option value="open">Open Circuit (ZL = ∞)</option>
                  <option value="short">Short Circuit (ZL = 0)</option>
                  <option value="custom">Custom Load</option>
                </select>
              </div>

              <!-- Custom Load Impedance -->
              <div v-if="loadType === 'custom'" class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Impedance (ZL)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="zl"
                    type="number" 
                    step="1"
                    min="0"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Scenarios
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setPreset('matched50')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    50Ω Matched
                  </button>
                  <button 
                    @click="setPreset('open75')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    75Ω Open
                  </button>
                  <button 
                    @click="setPreset('short50')"
                    class="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    50Ω Short
                  </button>
                  <button 
                    @click="setPreset('mismatch')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    75Ω to 50Ω
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Reflection Coefficient Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Results</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Reflection Coeff (Γ)</p>
                  <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ reflectionCoefficient.toFixed(3) }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ reflectionMagDb.toFixed(1) }} dB</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">VSWR</p>
                  <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ vswr.toFixed(2) }}</p>
                  <p class="text-xs" :class="vswrClass">{{ vswrQuality }}</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Return Loss</p>
                  <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ returnLoss.toFixed(1) }} dB</p>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Mismatch Loss</p>
                  <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ mismatchLoss.toFixed(2) }} dB</p>
                </div>
              </div>
            </div>

            <!-- Standing Wave Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Standing Wave Pattern</h3>
              
              <svg viewBox="0 0 700 300" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <defs>
                  <pattern id="grid2" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                  </pattern>
                </defs>
                <rect x="80" y="30" width="570" height="200" fill="url(#grid2)" />
                
                <line x1="80" y1="130" x2="650" y2="130" stroke="#6B7280" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
                
                <line x1="80" y1="30" x2="80" y2="230" stroke="#374151" stroke-width="2"/>
                <line x1="80" y1="230" x2="650" y2="230" stroke="#374151" stroke-width="2"/>
                
                <text x="70" y="235" text-anchor="end" font-size="11" fill="#6B7280">0</text>
                <text x="70" y="130" text-anchor="end" font-size="11" fill="#6B7280">1.0</text>
                <text x="70" y="55" text-anchor="end" font-size="11" fill="#6B7280">2.0</text>
                <text x="40" y="130" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 130)">|V|</text>
                
                <text x="80" y="250" text-anchor="middle" font-size="11" fill="#6B7280">0</text>
                <text x="222.5" y="250" text-anchor="middle" font-size="11" fill="#6B7280">λ/4</text>
                <text x="365" y="250" text-anchor="middle" font-size="11" fill="#6B7280">λ/2</text>
                <text x="507.5" y="250" text-anchor="middle" font-size="11" fill="#6B7280">3λ/4</text>
                <text x="650" y="250" text-anchor="middle" font-size="11" fill="#6B7280">λ</text>
                <text x="365" y="270" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Distance from Source</text>
                
                <path 
                  :d="standingWaveMaxPath"
                  fill="none"
                  stroke="#EF4444"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
                
                <path 
                  :d="standingWaveMinPath"
                  fill="none"
                  stroke="#3B82F6"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
                
                <path 
                  :d="incidentWavePath"
                  fill="none"
                  stroke="#10B981"
                  stroke-width="2"
                  opacity="0.6"
                />
                
                <path 
                  :d="reflectedWavePath"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-width="2"
                  opacity="0.6"
                />
                
                <g transform="translate(480, 30)">
                  <rect x="0" y="0" width="160" height="90" fill="white" fill-opacity="0.8" rx="5"/>
                  <line x1="10" y1="15" x2="40" y2="15" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5"/>
                  <text x="45" y="19" font-size="10" fill="#374151">Vmax envelope</text>
                  
                  <line x1="10" y1="35" x2="40" y2="35" stroke="#3B82F6" stroke-width="2" stroke-dasharray="5,5"/>
                  <text x="45" y="39" font-size="10" fill="#374151">Vmin envelope</text>
                  
                  <line x1="10" y1="55" x2="40" y2="55" stroke="#10B981" stroke-width="2"/>
                  <text x="45" y="59" font-size="10" fill="#374151">Incident</text>
                  
                  <line x1="10" y1="75" x2="40" y2="75" stroke="#F59E0B" stroke-width="2"/>
                  <text x="45" y="79" font-size="10" fill="#374151">Reflected</text>
                </g>
                
                <line x1="640" y1="30" x2="640" y2="230" stroke="#8B5CF6" stroke-width="3"/>
                <text x="640" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="#8B5CF6">Load</text>
              </svg>
            </div>

            <!-- Time-Domain Reflectometry -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⏱️ Time-Domain Reflectometry</h3>
              
              <svg viewBox="0 0 700 250" class="w-full h-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <rect x="80" y="30" width="570" height="170" fill="url(#grid2)" />
                
                <line x1="80" y1="30" x2="80" y2="200" stroke="#374151" stroke-width="2"/>
                <line x1="80" y1="200" x2="650" y2="200" stroke="#374151" stroke-width="2"/>
                
                <text x="70" y="200" text-anchor="end" font-size="10" fill="#6B7280">0</text>
                <text x="70" y="115" text-anchor="end" font-size="10" fill="#6B7280">0.5</text>
                <text x="70" y="40" text-anchor="end" font-size="10" fill="#6B7280">1.0</text>
                <text x="40" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 115)">Voltage</text>
                
                <text x="80" y="220" text-anchor="middle" font-size="10" fill="#6B7280">0</text>
                <text x="222.5" y="220" text-anchor="middle" font-size="10" fill="#6B7280">{{ (tdrTime * 0.25).toFixed(1) }}ns</text>
                <text x="365" y="220" text-anchor="middle" font-size="10" fill="#6B7280">{{ (tdrTime * 0.5).toFixed(1) }}ns</text>
                <text x="507.5" y="220" text-anchor="middle" font-size="10" fill="#6B7280">{{ (tdrTime * 0.75).toFixed(1) }}ns</text>
                <text x="650" y="220" text-anchor="middle" font-size="10" fill="#6B7280">{{ tdrTime.toFixed(1) }}ns</text>
                <text x="365" y="240" text-anchor="middle" font-size="11" font-weight="bold" fill="#374151">Time (ns)</text>
                
                <path 
                  :d="tdrPath"
                  fill="none"
                  stroke="#8B5CF6"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                
                <line :x1="tdrStepX" y1="40" :x2="tdrStepX" y2="200" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,4"/>
                <text :x="tdrStepX" y="30" text-anchor="middle" font-size="10" font-weight="bold" fill="#EF4444">
                  Reflection
                </text>
              </svg>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                One-way travel time: {{ (tdrTime / 2).toFixed(2) }} ns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Key Concepts</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">Reflection Coefficient (Γ)</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                The reflection coefficient measures how much of the signal is reflected back from the load:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                Γ = (Z<sub>L</sub> - Z<sub>0</sub>) / (Z<sub>L</sub> + Z<sub>0</sub>)
              </div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Γ = 0: Perfect match (no reflection)</li>
                <li>• Γ = 1: Total reflection (open circuit)</li>
                <li>• Γ = -1: Total reflection (short circuit)</li>
              </ul>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-green-900 dark:text-green-300 mb-3">VSWR</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Voltage Standing Wave Ratio indicates the impedance match quality:
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                VSWR = (1 + |Γ|) / (1 - |Γ|)
              </div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• VSWR = 1:1: Perfect match</li>
                <li>• VSWR &lt; 2:1: Good match</li>
                <li>• VSWR &gt; 3:1: Poor match</li>
              </ul>
            </div>

            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-3">Return Loss</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Return loss measures the power reflected back (in dB):
              </p>
              <div class="bg-white dark:bg-gray-800 rounded px-3 py-2 font-mono text-sm mb-2">
                RL = -20 × log₁₀(|Γ|)
              </div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Higher is better (less reflection)</li>
                <li>• RL &gt; 20 dB: Excellent match</li>
                <li>• RL &lt; 10 dB: Poor match</li>
              </ul>
            </div>

            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
              <h3 class="text-lg font-bold text-orange-900 dark:text-orange-300 mb-3">Applications</h3>
              <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>📡 <strong>RF/Microwave systems:</strong> Antenna matching, feedline design</li>
                <li>🔌 <strong>High-speed digital:</strong> PCB trace impedance control</li>
                <li>📡 <strong>Cable testing:</strong> TDR for fault location</li>
                <li>📡 <strong>TV/Satellite:</strong> Coaxial cable installations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const colorMode = useColorMode()

const z0 = ref(50)
const lineLength = ref(10)
const velocityFactor = ref(0.66)
const loadType = ref('matched')
const zl = ref(50)

const effectiveZl = computed(() => {
  switch (loadType.value) {
    case 'matched':
      return z0.value
    case 'open':
      return Infinity
    case 'short':
      return 0
    case 'custom':
      return zl.value
    default:
      return z0.value
  }
})

const reflectionCoefficient = computed(() => {
  const Z0 = z0.value
  const ZL = effectiveZl.value
  
  if (ZL === Infinity) {
    return 1
  } else if (ZL === 0) {
    return -1
  } else {
    return (ZL - Z0) / (ZL + Z0)
  }
})

const reflectionMag = computed(() => Math.abs(reflectionCoefficient.value))

const reflectionMagDb = computed(() => {
  const mag = reflectionMag.value
  if (mag === 0) return -Infinity
  return 20 * Math.log10(mag)
})

const vswr = computed(() => {
  const mag = reflectionMag.value
  if (mag === 1) return Infinity
  return (1 + mag) / (1 - mag)
})

const vswrQuality = computed(() => {
  if (vswr.value === Infinity) return 'Terrible'
  if (vswr.value <= 1.1) return 'Excellent'
  if (vswr.value <= 1.5) return 'Very Good'
  if (vswr.value <= 2) return 'Good'
  if (vswr.value <= 3) return 'Fair'
  return 'Poor'
})

const vswrClass = computed(() => {
  if (vswr.value === Infinity) return 'text-red-600 dark:text-red-400'
  if (vswr.value <= 1.5) return 'text-green-600 dark:text-green-400'
  if (vswr.value <= 2) return 'text-yellow-600 dark:text-yellow-400'
  if (vswr.value <= 3) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
})

const returnLoss = computed(() => {
  const mag = reflectionMag.value
  if (mag === 0) return Infinity
  return -20 * Math.log10(mag)
})

const mismatchLoss = computed(() => {
  const mag = reflectionMag.value
  return -10 * Math.log10(1 - mag * mag)
})

const tdrTime = computed(() => {
  const c = 299792458
  const velocity = velocityFactor.value * c
  const time = (lineLength.value / velocity) * 1e9
  return time
})

const tdrStepX = computed(() => {
  return 80 + 570 * 0.5
})

const tdrPath = computed(() => {
  const mag = reflectionCoefficient.value
  const startX = 80
  const startY = 40
  const midX = 80 + 570 * 0.5
  const endX = 650
  const baseY = 40
  const stepHeight = 100 * mag
  
  let path = `M ${startX} ${startY}`
  path += ` L ${midX} ${startY}`
  
  const reflectedY = startY - stepHeight
  path += ` L ${midX + 2} ${reflectedY}`
  path += ` L ${endX} ${reflectedY}`
  
  return path
})

const standingWaveMaxPath = computed(() => {
  const mag = reflectionMag.value
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const x = 80 + (570 * i / 100)
    const phase = (2 * Math.PI * i) / 100
    const amplitude = 1 + mag * Math.cos(phase)
    const y = 130 - (amplitude * 70)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

const standingWaveMinPath = computed(() => {
  const mag = reflectionMag.value
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const x = 80 + (570 * i / 100)
    const phase = (2 * Math.PI * i) / 100
    const amplitude = 1 - mag * Math.cos(phase)
    const y = 130 - (amplitude * 70)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

const incidentWavePath = computed(() => {
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const x = 80 + (570 * i / 100)
    const phase = (2 * Math.PI * i) / 100
    const amplitude = Math.cos(phase)
    const y = 130 - (amplitude * 70)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

const reflectedWavePath = computed(() => {
  const mag = reflectionCoefficient.value
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const x = 80 + (570 * i / 100)
    const phase = (2 * Math.PI * i) / 100
    const amplitude = mag * Math.cos(phase + Math.PI)
    const y = 130 - (amplitude * 70)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

const setPreset = (preset) => {
  switch (preset) {
    case 'matched50':
      z0.value = 50
      loadType.value = 'matched'
      break
    case 'open75':
      z0.value = 75
      loadType.value = 'open'
      break
    case 'short50':
      z0.value = 50
      loadType.value = 'short'
      break
    case 'mismatch':
      z0.value = 50
      loadType.value = 'custom'
      zl.value = 75
      break
  }
}

useHead({
  title: 'Transmission Line Reflections Simulator - Interactive RF Circuit Simulation',
  meta: [
    { name: 'description', content: 'Interactive transmission line reflection simulator. Explore standing waves, VSWR, reflection coefficient, and impedance matching in RF circuits.' }
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

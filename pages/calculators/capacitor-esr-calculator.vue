<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
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
            Capacitor ESR & Impedance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate Equivalent Series Resistance effects and impedance across frequency
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary-highlight">Z</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">√(ESR²</span>
              <span class="text-gray-400">+</span>
              <span class="text-primary-highlight">Xc²)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Total Impedance = √(ESR² + Xc²) where Xc = 1/(2πfC)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impedance vs Frequency Chart -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📊 Impedance vs Frequency Response
          </h3>
          
          <!-- Interactive Impedance Chart -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 400" class="w-full max-w-5xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid -->
              <defs>
                <pattern id="impedanceGrid" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
              </defs>
              <rect x="80" y="40" width="680" height="280" fill="url(#impedanceGrid)" />
              
              <!-- Axes -->
              <line x1="80" y1="40" x2="80" y2="320" stroke="#374151" stroke-width="2"/>
              <line x1="80" y1="320" x2="760" y2="320" stroke="#374151" stroke-width="2"/>
              
              <!-- Y-axis labels (Ohm) -->
              <text x="70" y="325" text-anchor="end" :font-size="12" fill="#6B7280">0</text>
              <text x="70" y="255" text-anchor="end" :font-size="12" fill="#6B7280">{{ (maxImpedance * 0.25).toFixed(1) }}Ω</text>
              <text x="70" y="185" text-anchor="end" :font-size="12" fill="#6B7280">{{ (maxImpedance * 0.5).toFixed(1) }}Ω</text>
              <text x="70" y="115" text-anchor="end" :font-size="12" fill="#6B7280">{{ (maxImpedance * 0.75).toFixed(1) }}Ω</text>
              <text x="70" y="45" text-anchor="end" :font-size="12" fill="#6B7280">{{ maxImpedance.toFixed(1) }}Ω</text>
              <text x="40" y="180" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 180)">Impedance (Ω)</text>
              
              <!-- X-axis labels (Frequency - logarithmic scale) -->
              <text x="80" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">10 Hz</text>
              <text x="250" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">100 Hz</text>
              <text x="420" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">1 kHz</text>
              <text x="590" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">10 kHz</text>
              <text x="760" y="340" text-anchor="middle" :font-size="12" fill="#6B7280">100 kHz</text>
              <text x="420" y="370" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151">Frequency (log scale)</text>
              
              <!-- ESR Line (constant) -->
              <line x1="80" :y1="320 - (esr / maxImpedance) * 280" x2="760" :y2="320 - (esr / maxImpedance) * 280" 
                stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5" opacity="0.7"/>
              <text x="765" :y="324 - (esr / maxImpedance) * 280" :font-size="11" fill="#EF4444" font-weight="bold">ESR ({{ esr.toFixed(3) }}Ω)</text>
              
              <!-- Test Frequency Marker -->
              <line x1="testFreqX" y1="40" x2="testFreqX" y2="320" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,5" opacity="0.6"/>
              <text x="testFreqX" y="35" text-anchor="middle" :font-size="12" fill="#F59E0B" font-weight="bold">{{ formatFreq(testFreq) }}</text>
              
              <!-- Total Impedance Curve -->
              <path 
                :d="impedanceCurvePath"
                fill="none"
                stroke="#8B5CF6"
                stroke-width="3"
                stroke-linecap="round"
              />
              
              <!-- Current frequency point -->
              <circle :cx="testFreqX" :cy="testFreqY" r="8" fill="#F59E0B" stroke="white" stroke-width="2"/>
              
              <!-- Reactance Curve (Xc only) -->
              <path 
                :d="reactanceCurvePath"
                fill="none"
                stroke="#22C55E"
                stroke-width="2"
                stroke-dasharray="5,5"
                opacity="0.6"
              />
            </svg>
          </div>
          
          <!-- Legend -->
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-6 h-1 bg-purple-500 rounded"></div>
              <span class="text-gray-700 dark:text-gray-300">Total Impedance (Z)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-6 h-1 bg-green-500 rounded" style="border-style: dashed; border-width: 1px;"></div>
              <span class="text-gray-700 dark:text-gray-300">Reactance (Xc)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-6 h-1 bg-red-500 rounded" style="border-style: dashed; border-width: 1px;"></div>
              <span class="text-gray-700 dark:text-gray-300">ESR</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Test Frequency</span>
            </div>
          </div>
        </div>

        <!-- Calculator Controls and Results -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <!-- Input Parameters -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Input Parameters
            </h3>
            
            <!-- Capacitance -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacitance (C)
              </label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  v-model.number="capacitance" 
                  type="number" 
                  step="0.1"
                  min="0.1"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 text-sm w-16">µF</span>
              </div>
              <input 
                v-model.number="capacitance" 
                type="range" 
                min="0.1" 
                max="10000" 
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
            
            <!-- ESR -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Equivalent Series Resistance (ESR)
              </label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  v-model.number="esr" 
                  type="number" 
                  step="0.001"
                  min="0"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 text-sm w-16">Ω</span>
              </div>
              <input 
                v-model.number="esr" 
                type="range" 
                min="0" 
                max="10" 
                step="0.001"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Typical values: Electrolytic 0.1-2Ω, Ceramic 0.01-0.1Ω
              </p>
            </div>
            
            <!-- Test Frequency -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Test Frequency
              </label>
              <div class="flex items-center gap-2 mb-2">
                <input 
                  v-model.number="testFreq" 
                  type="number" 
                  step="10"
                  min="1"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 text-sm w-16">Hz</span>
              </div>
              <input 
                v-model.number="testFreq" 
                type="range" 
                min="10" 
                max="100000" 
                step="10"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
          </div>
          
          <!-- Calculation Results -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Results at {{ formatFreq(testFreq) }}
            </h3>
            
            <div class="space-y-4">
              <!-- Reactance -->
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Capacitive Reactance (Xc)</span>
                  <span class="text-xs text-green-600 dark:text-green-400 font-semibold">Xc = 1/(2πfC)</span>
                </div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ reactance.toFixed(4) }} Ω
                </div>
              </div>
              
              <!-- Total Impedance -->
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total Impedance (Z)</span>
                  <span class="text-xs text-purple-600 dark:text-purple-400 font-semibold">Z = √(ESR² + Xc²)</span>
                </div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {{ totalImpedance.toFixed(4) }} Ω
                </div>
              </div>
              
              <!-- ESR -->
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">ESR Contribution</span>
                  <span class="text-xs text-red-600 dark:text-red-400 font-semibold">{{ ((esr / totalImpedance) * 100).toFixed(1) }}%</span>
                </div>
                <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                  {{ esr.toFixed(4) }} Ω
                </div>
              </div>
              
              <!-- Phase Angle -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Phase Angle (φ)</span>
                  <span class="text-xs text-blue-600 dark:text-blue-400 font-semibold">φ = arctan(Xc/ESR)</span>
                </div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ phaseAngle.toFixed(1) }}°
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Current leads voltage by {{ phaseAngle.toFixed(1) }}°
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding ESR and Impedance
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is ESR?</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>ESR (Equivalent Series Resistance)</strong> represents internal resistance in capacitors due to leads, dielectric losses, and construction</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Low frequency:</strong> ESR dominates total impedance (especially for large capacitors)</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>High frequency:</strong> ESR causes power loss and heating, reducing efficiency</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>ESR increases</strong> with age, temperature, and stress in electrolytic capacitors</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Why ESR Matters</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Power supply ripple:</strong> High ESR increases output ripple voltage</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Filter performance:</strong> Degrades filtering effectiveness at high frequencies</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Heating:</strong> I²R losses cause temperature rise, reducing lifespan</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Oscillator stability:</strong> Affects frequency stability in tank circuits</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
            <div class="flex items-start gap-3">
              <svg class="h-6 w-6 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h5 class="font-semibold text-gray-900 dark:text-white mb-1">Pro Tip</h5>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  For switching power supplies, use low-ESR capacitors (typically < 0.1Ω) in the output filter. 
                  Measure ESR with an ESR meter - standard multimeters cannot measure it accurately!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p class="mb-2">Capacitor ESR & Impedance Calculator - Cyno Electric</p>
        <p class="text-sm">Understanding real-world capacitor behavior for better circuit design</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input parameters
const capacitance = ref(100) // µF
const esr = ref(0.1) // Ohms
const testFreq = ref(1000) // Hz

// Calculate reactance at test frequency
const reactance = computed(() => {
  const C = capacitance.value * 1e-6 // Convert µF to F
  const f = testFreq.value
  return 1 / (2 * Math.PI * f * C)
})

// Calculate total impedance
const totalImpedance = computed(() => {
  return Math.sqrt(esr.value ** 2 + reactance.value ** 2)
})

// Calculate phase angle
const phaseAngle = computed(() => {
  const radians = Math.atan2(reactance.value, esr.value)
  return radians * (180 / Math.PI)
})

// Maximum impedance for chart scaling
const maxImpedance = computed(() => {
  const maxReactance = 1 / (2 * Math.PI * 10 * capacitance.value * 1e-6)
  return Math.max(esr.value * 2, maxReactance * 1.2)
})

// Format frequency for display
const formatFreq = (freq) => {
  if (freq >= 1000000) return (freq / 1000000).toFixed(1) + ' MHz'
  if (freq >= 1000) return (freq / 1000).toFixed(1) + ' kHz'
  return freq.toFixed(0) + ' Hz'
}

// Calculate chart coordinates
const testFreqX = computed(() => {
  const freq = testFreq.value
  // Log scale: 10Hz to 100kHz
  const logMin = Math.log10(10)
  const logMax = Math.log10(100000)
  const logFreq = Math.log10(freq)
  const normalized = (logFreq - logMin) / (logMax - logMin)
  return 80 + normalized * 680
})

const testFreqY = computed(() => {
  const normalized = totalImpedance.value / maxImpedance.value
  return 320 - normalized * 280
})

// Generate impedance curve path
const impedanceCurvePath = computed(() => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const freqLog = Math.log10(10) + (Math.log10(100000) - Math.log10(10)) * (i / 100)
    const freq = Math.pow(10, freqLog)
    const C = capacitance.value * 1e-6
    const xc = 1 / (2 * Math.PI * freq * C)
    const z = Math.sqrt(esr.value ** 2 + xc ** 2)
    
    const x = 80 + i * 6.8
    const y = 320 - (z / maxImpedance.value) * 280
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Generate reactance-only curve path
const reactanceCurvePath = computed(() => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const freqLog = Math.log10(10) + (Math.log10(100000) - Math.log10(10)) * (i / 100)
    const freq = Math.pow(10, freqLog)
    const C = capacitance.value * 1e-6
    const xc = 1 / (2 * Math.PI * freq * C)
    
    const x = 80 + i * 6.8
    const y = 320 - (xc / maxImpedance.value) * 280
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Reactive style for sliders
const style = computed(() => {
  return `
    .slider-primary::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #9FA8DA;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .slider-primary::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #9FA8DA;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `
})

// Inject styles
onMounted(() => {
  const styleEl = document.createElement('style')
  styleEl.textContent = style.value
  document.head.appendChild(styleEl)
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
</style>

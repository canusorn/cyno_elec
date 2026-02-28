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
            ⚡ AC Power Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate real, reactive, and apparent power in AC circuits with power factor analysis
          </p>
          
          <!-- Power Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">S²</span>
              <span class="text-gray-400">=</span>
              <span class="text-blue-500">P²</span>
              <span class="text-gray-400">+</span>
              <span class="text-red-500">Q²</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Input Controls -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Input Parameters
              </h3>
              
              <!-- RMS Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  RMS Voltage (Vᵣₘₛ)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="voltageRMS" 
                    type="number" 
                    step="1"
                    min="0"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter voltage"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">V</span>
                </div>
                <input 
                  v-model.number="voltageRMS"
                  type="range"
                  min="0"
                  max="500"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- RMS Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  RMS Current (Iᵣₘₛ)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="currentRMS" 
                    type="number" 
                    step="0.1"
                    min="0"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter current"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">A</span>
                </div>
                <input 
                  v-model.number="currentRMS"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Phase Angle -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phase Angle (φ)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="phaseAngle" 
                    type="number" 
                    step="1"
                    min="-90"
                    max="90"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter angle"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">deg</span>
                </div>
                <input 
                  v-model.number="phaseAngle"
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Power Factor Input (Alternative) -->
              <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or Enter Power Factor
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="powerFactor" 
                    type="number" 
                    step="0.01"
                    min="0"
                    max="1"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="0.00 - 1.00"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">PF</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Power factor = cos(φ)</p>
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setPreset('resistive')"
                    class="px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Resistive Load
                  </button>
                  <button 
                    @click="setPreset('motor')"
                    class="px-3 py-2 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Induction Motor
                  </button>
                  <button 
                    @click="setPreset('transformer')"
                    class="px-3 py-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Transformer
                  </button>
                  <button 
                    @click="setPreset('fluorescent')"
                    class="px-3 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Fluorescent
                  </button>
                </div>
              </div>

              <!-- Reset Button -->
              <button 
                @click="resetInputs"
                class="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
              >
                Reset Inputs
              </button>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Power Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Power Analysis
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Real Power -->
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span class="text-sm font-semibold text-blue-600 dark:text-blue-400">Real Power (P)</span>
                  </div>
                  <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ realPower.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Watts (W)</div>
                  <div class="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    P = V × I × cos(φ)
                  </div>
                </div>

                <!-- Reactive Power -->
                <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span class="text-sm font-semibold text-red-600 dark:text-red-400">Reactive Power (Q)</span>
                  </div>
                  <div class="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {{ reactivePower.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">VAR</div>
                  <div class="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    Q = V × I × sin(φ)
                  </div>
                </div>

                <!-- Apparent Power -->
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">Apparent Power (S)</span>
                  </div>
                  <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {{ apparentPower.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">VA</div>
                  <div class="mt-3 text-xs text-gray-500 dark:text-gray-500">
                    S = V × I
                  </div>
                </div>
              </div>

              <!-- Power Factor Display -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <div class="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">Power Factor</div>
                    <div class="text-5xl font-bold text-green-600 dark:text-green-400">
                      {{ calculatedPowerFactor.toFixed(3) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Phase Angle</div>
                    <div class="text-3xl font-bold text-gray-700 dark:text-gray-300">
                      {{ calculatedPhaseAngle.toFixed(2) }}°
                    </div>
                  </div>
                </div>
                
                <!-- Power Factor Bar -->
                <div class="mb-2">
                  <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>0</span>
                    <span>Power Quality</span>
                    <span>1</span>
                  </div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-300 ease-out rounded-full"
                      :class="powerFactorBarClass"
                      :style="{ width: (calculatedPowerFactor * 100) + '%' }"
                    ></div>
                  </div>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Status: <span :class="powerFactorStatusClass">{{ powerFactorStatus }}</span>
                </div>
              </div>

              <!-- Additional Metrics -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Impedance (Z)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ impedance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Resistance (R)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ resistance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Reactance (X)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ reactance.toFixed(2) }} Ω
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Load Type</div>
                  <div class="text-xl font-bold" :class="loadTypeClass">
                    {{ loadType }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Power Triangle Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Power Triangle
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex items-center justify-center" style="min-height: 300px;">
                  <canvas ref="triangleCanvas" width="300" height="300" class="max-w-full"></canvas>
                </div>
                
                <div class="space-y-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <div class="w-4 h-1 bg-blue-500 rounded"></div>
                      Real Power (P)
                    </h4>
                    <p class="text-blue-700 dark:text-blue-300 text-sm">
                      The actual power that performs work in the circuit. Measured in Watts (W).
                    </p>
                  </div>
                  
                  <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
                      <div class="w-4 h-1 bg-red-500 rounded"></div>
                      Reactive Power (Q)
                    </h4>
                    <p class="text-red-700 dark:text-red-300 text-sm">
                      Power that oscillates between source and load. Doesn't perform useful work. Measured in VAR.
                    </p>
                  </div>
                  
                  <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2">
                      <div class="w-4 h-1 bg-purple-500 rounded"></div>
                      Apparent Power (S)
                    </h4>
                    <p class="text-purple-700 dark:text-purple-300 text-sm">
                      Vector sum of real and reactive power. Total power supplied. Measured in VA.
                    </p>
                  </div>
                  
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">Power Factor (PF)</h4>
                    <p class="text-green-700 dark:text-green-300 text-sm">
                      Ratio of real power to apparent power. PF = P/S = cos(φ). Higher is better.
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
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding AC Power</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Formulas</h3>
              <div class="space-y-3">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="font-mono text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    P = Vᵣₘₛ × Iᵣₘₛ × cos(φ)
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Real power (active power) that does useful work</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="font-mono text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Q = Vᵣₘₛ × Iᵣₘₛ × sin(φ)
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Reactive power that oscillates in the circuit</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="font-mono text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    S = Vᵣₘₛ × Iᵣₘₛ
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Apparent power (vector sum of P and Q)</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="font-mono text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    PF = cos(φ) = P/S
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Power factor: ratio of real to apparent power</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Power Factor Correction</h3>
              <div class="space-y-4">
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">⚠️ Why Low PF is Bad</h4>
                  <ul class="list-disc list-inside text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                    <li>Inefficient use of power system capacity</li>
                    <li>Increased I²R losses in conductors</li>
                    <li>Possible penalties from utility companies</li>
                    <li>Larger conductors and equipment required</li>
                  </ul>
                </div>
                
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">✅ PF Correction Methods</h4>
                  <ul class="list-disc list-inside text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>Add capacitors to counteract inductive loads</li>
                    <li>Use synchronous condensers</li>
                    <li>Install automatic power factor correction units</li>
                    <li>Use high-efficiency motors with better PF</li>
                  </ul>
                </div>
                
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Typical PF Values</h4>
                  <ul class="list-disc list-inside text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>Resistive loads (heaters): PF ≈ 1.0</li>
                    <li>Induction motors: PF = 0.7 - 0.9</li>
                    <li>Fluorescent lamps: PF = 0.5 - 0.9</li>
                    <li>Computers/SMPS: PF = 0.6 - 0.8 (uncorrected)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🎯 Real-World Applications</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li>Industrial facilities use capacitor banks to correct power factor and reduce utility bills</li>
              <li>Utilities charge penalties for low PF (typically below 0.9)</li>
              <li>Power factor correction reduces current flow, allowing smaller cables and equipment</li>
              <li>Modern switch-mode power supplies include active PFC to meet international standards</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useColorMode } from '#app'

const $colorMode = useColorMode()

// Input parameters
const voltageRMS = ref(230)
const currentRMS = ref(10)
const phaseAngle = ref(30)
const powerFactor = ref(0.866)

// Canvas ref
const triangleCanvas = ref(null)

// Computed values
const calculatedPowerFactor = computed(() => {
  return Math.abs(Math.cos(phaseAngle.value * Math.PI / 180))
})

const calculatedPhaseAngle = computed(() => {
  return phaseAngle.value
})

const realPower = computed(() => {
  return voltageRMS.value * currentRMS.value * calculatedPowerFactor.value
})

const reactivePower = computed(() => {
  return voltageRMS.value * currentRMS.value * Math.sin(Math.abs(phaseAngle.value) * Math.PI / 180)
})

const apparentPower = computed(() => {
  return voltageRMS.value * currentRMS.value
})

const impedance = computed(() => {
  if (currentRMS.value === 0) return 0
  return voltageRMS.value / currentRMS.value
})

const resistance = computed(() => {
  return impedance.value * calculatedPowerFactor.value
})

const reactance = computed(() => {
  return impedance.value * Math.sin(Math.abs(phaseAngle.value) * Math.PI / 180)
})

const loadType = computed(() => {
  if (Math.abs(phaseAngle.value) < 1) return 'Resistive'
  if (phaseAngle.value > 0) return 'Inductive'
  return 'Capacitive'
})

const loadTypeClass = computed(() => {
  if (Math.abs(phaseAngle.value) < 1) return 'text-blue-600 dark:text-blue-400'
  if (phaseAngle.value > 0) return 'text-orange-600 dark:text-orange-400'
  return 'text-green-600 dark:text-green-400'
})

const powerFactorStatus = computed(() => {
  const pf = calculatedPowerFactor.value
  if (pf >= 0.95) return 'Excellent'
  if (pf >= 0.9) return 'Good'
  if (pf >= 0.8) return 'Fair'
  if (pf >= 0.7) return 'Poor'
  return 'Very Poor'
})

const powerFactorStatusClass = computed(() => {
  const pf = calculatedPowerFactor.value
  if (pf >= 0.95) return 'text-green-600 dark:text-green-400 font-semibold'
  if (pf >= 0.9) return 'text-blue-600 dark:text-blue-400 font-semibold'
  if (pf >= 0.8) return 'text-yellow-600 dark:text-yellow-400 font-semibold'
  if (pf >= 0.7) return 'text-orange-600 dark:text-orange-400 font-semibold'
  return 'text-red-600 dark:text-red-400 font-semibold'
})

const powerFactorBarClass = computed(() => {
  const pf = calculatedPowerFactor.value
  if (pf >= 0.95) return 'bg-green-500'
  if (pf >= 0.9) return 'bg-blue-500'
  if (pf >= 0.8) return 'bg-yellow-500'
  if (pf >= 0.7) return 'bg-orange-500'
  return 'bg-red-500'
})

// Presets
const setPreset = (type) => {
  switch (type) {
    case 'resistive':
      voltageRMS.value = 230
      currentRMS.value = 10
      phaseAngle.value = 0
      powerFactor.value = 1.0
      break
    case 'motor':
      voltageRMS.value = 400
      currentRMS.value = 25
      phaseAngle.value = 35
      powerFactor.value = 0.819
      break
    case 'transformer':
      voltageRMS.value = 11000
      currentRMS.value = 50
      phaseAngle.value = 25
      powerFactor.value = 0.906
      break
    case 'fluorescent':
      voltageRMS.value = 230
      currentRMS.value = 0.43
      phaseAngle.value = 50
      powerFactor.value = 0.643
      break
  }
}

const resetInputs = () => {
  voltageRMS.value = 230
  currentRMS.value = 10
  phaseAngle.value = 30
  powerFactor.value = 0.866
}

// Sync phase angle and power factor
watch(phaseAngle, (newAngle) => {
  powerFactor.value = Math.abs(Math.cos(newAngle * Math.PI / 180))
})

watch(powerFactor, (newPF) => {
  const currentPF = calculatedPowerFactor.value
  if (Math.abs(newPF - currentPF) > 0.001) {
    // Convert PF to angle
    const angle = Math.acos(Math.min(Math.max(newPF, 0), 1)) * 180 / Math.PI
    if (phaseAngle.value >= 0) {
      phaseAngle.value = angle
    } else {
      phaseAngle.value = -angle
    }
  }
})

// Draw power triangle
const drawPowerTriangle = () => {
  const canvas = triangleCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  const padding = 40
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Calculate triangle dimensions
  const maxPower = Math.max(apparentPower.value, 1)
  const scale = (Math.min(width, height) - 2 * padding) / maxPower
  
  // Triangle vertices
  const originX = padding
  const originY = height - padding
  const pX = originX + realPower.value * scale
  const pY = originY
  const qX = originX
  const qY = originY - reactivePower.value * scale
  const sX = pX
  const sY = qY
  
  // Draw reactive power (Q) - vertical
  ctx.strokeStyle = '#EF4444'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(qX, qY)
  ctx.stroke()
  
  // Draw real power (P) - horizontal
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(pX, pY)
  ctx.stroke()
  
  // Draw apparent power (S) - hypotenuse
  ctx.strokeStyle = '#A855F7'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(originX, originY)
  ctx.lineTo(sX, sY)
  ctx.stroke()
  
  // Draw phase angle arc
  if (Math.abs(phaseAngle.value) > 1) {
    ctx.strokeStyle = $colorMode.value === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    const arcRadius = 40
    const angle = Math.atan2(reactivePower.value, realPower.value)
    ctx.beginPath()
    ctx.arc(originX, originY, arcRadius, 0, -angle, true)
    ctx.stroke()
    ctx.setLineDash([])
  }
  
  // Labels
  ctx.fillStyle = $colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
  ctx.font = 'bold 14px sans-serif'
  ctx.textAlign = 'center'
  
  // P label
  ctx.fillStyle = '#3B82F6'
  ctx.fillText(`P = ${realPower.toFixed(1)} W`, (originX + pX) / 2, originY + 25)
  
  // Q label
  ctx.fillStyle = '#EF4444'
  ctx.textAlign = 'right'
  ctx.fillText(`Q = ${reactivePower.toFixed(1)} VAR`, originX - 10, (originY + qY) / 2)
  
  // S label
  ctx.fillStyle = '#A855F7'
  ctx.textAlign = 'left'
  const sMidX = (originX + sX) / 2 + 10
  const sMidY = (originY + sY) / 2 - 10
  ctx.fillText(`S = ${apparentPower.toFixed(1)} VA`, sMidX, sMidY)
  
  // Angle label
  if (Math.abs(phaseAngle.value) > 1) {
    ctx.fillStyle = $colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
    ctx.font = 'bold 12px sans-serif'
    ctx.textAlign = 'center'
    const angleLabelRadius = 55
    const angleMid = Math.atan2(reactivePower.value, realPower.value) / 2
    const angleLabelX = originX + angleLabelRadius * Math.cos(-angleMid)
    const angleLabelY = originY + angleLabelRadius * Math.sin(-angleMid)
    ctx.fillText(`${Math.abs(phaseAngle.value).toFixed(1)}°`, angleLabelX, angleLabelY)
  }
  
  // Origin label
  ctx.fillStyle = $colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('0', originX - 5, originY + 15)
}

onMounted(() => {
  drawPowerTriangle()
})

// Watch for changes and redraw
watch([voltageRMS, currentRMS, phaseAngle, $colorMode], () => {
  drawPowerTriangle()
})
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

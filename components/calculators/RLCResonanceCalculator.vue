<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
      🔄 RLC Resonance Calculator
    </h2>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Component Values -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Circuit Components
          </h3>
          
          <!-- Circuit Type Selection -->
          <div class="mb-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Circuit Type
            </label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input type="radio" v-model="circuitType" value="series" class="mr-2 text-purple-500">
                <span class="text-sm text-gray-700 dark:text-gray-300">Series RLC</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="circuitType" value="parallel" class="mr-2 text-purple-500">
                <span class="text-sm text-gray-700 dark:text-gray-300">Parallel RLC</span>
              </label>
            </div>
          </div>
          
          <!-- Resistance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resistance (R): <span class="text-purple-500 font-bold">{{ formatResistance(resistance) }}</span>
            </label>
            <input type="range" v-model.number="resistance" min="1" max="10000" step="1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 Ω</span>
              <span>10 kΩ</span>
            </div>
          </div>

          <!-- Inductance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Inductance (L): <span class="text-purple-500 font-bold">{{ formatInductance(inductance) }}</span>
            </label>
            <input type="range" v-model.number="inductance" min="1e-6" max="1" step="1e-6" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 µH</span>
              <span>1 H</span>
            </div>
          </div>

          <!-- Capacitance -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Capacitance (C): <span class="text-purple-500 font-bold">{{ formatCapacitance(capacitance) }}</span>
            </label>
            <input type="range" v-model.number="capacitance" min="1e-12" max="1e-6" step="1e-12" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 pF</span>
              <span>1 µF</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Presets
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="preset in presets" :key="preset.name" @click="applyPreset(preset)"
              class="px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/50 dark:hover:to-purple-800/50 transition-all duration-200 border border-purple-200 dark:border-purple-700">
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Calculations Display -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Resonance Parameters
          </h3>
          
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 space-y-3 border border-purple-200 dark:border-purple-800">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Resonant Frequency (f₀):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ formatFrequency(resonantFreq) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Angular Frequency (ω₀):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ angularFreq.toFixed(0) }} rad/s</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Quality Factor (Q):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ qualityFactor.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Bandwidth (BW):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ formatFrequency(bandwidth) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Lower Cutoff (f₁):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ formatFrequency(lowerCutoff) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Upper Cutoff (f₂):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ formatFrequency(upperCutoff) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Damping Ratio (ζ):</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ dampingRatio.toFixed(4) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300 text-sm">Impedance at f₀:</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ formatImpedance }}</span>
            </div>
          </div>
        </div>

        <!-- Circuit Characteristics -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Circuit Characteristics
          </h3>
          <div class="space-y-2">
            <div v-if="qualityFactor > 10" class="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-green-700 dark:text-green-300 text-sm font-medium">High Q ({{ qualityFactor.toFixed(1) }}) - Narrow bandwidth, sharp resonance</span>
            </div>
            <div v-else-if="qualityFactor > 0.5" class="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <svg class="w-5 h-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span class="text-yellow-700 dark:text-yellow-300 text-sm font-medium">Medium Q ({{ qualityFactor.toFixed(2) }}) - Moderate bandwidth</span>
            </div>
            <div v-else class="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-red-700 dark:text-red-300 text-sm font-medium">Low Q ({{ qualityFactor.toFixed(2) }}) - Overdamped, no resonance peak</span>
            </div>
          </div>
        </div>

        <!-- Reactances at Resonance -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Reactances at Resonance
          </h3>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 space-y-2 border border-blue-200 dark:border-blue-800">
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-700 dark:text-gray-300">Inductive Reactance (X<sub>L</sub>):</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ formatResistance(inductiveReactance) }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-700 dark:text-gray-300">Capacitive Reactance (X<sub>C</sub>):</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ formatResistance(capacitiveReactance) }}</span>
            </div>
            <div class="flex justify-between items-center text-sm border-t border-blue-200 dark:border-blue-700 pt-2">
              <span class="text-gray-700 dark:text-gray-300 font-medium">X<sub>L</sub> vs X<sub>C</sub>:</span>
              <span class="font-bold text-green-600 dark:text-green-400">Equal ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Frequency Response Visualization -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        Frequency Response Curve
      </h3>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <svg viewBox="0 0 800 400" class="w-full h-auto">
          <!-- Grid lines -->
          <g stroke="#e5e7eb" stroke-width="1" opacity="0.3">
            <line v-for="i in 10" :key="'v' + i" :x1="i * 80" y1="0" x2="i * 80" y2="400"/>
            <line v-for="i in 8" :key="'h' + i" x1="0" :y1="i * 50" x2="800" :y2="i * 50"/>
          </g>

          <!-- Y-axis labels -->
          <g font-size="12" fill="#6b7280" text-anchor="end">
            <text x="45" y="54">Maximum</text>
            <text x="45" y="154">-3dB</text>
            <text x="45" y="254">-10dB</text>
            <text x="45" y="354">-20dB</text>
          </g>

          <!-- X-axis labels -->
          <g font-size="12" fill="#6b7280" text-anchor="middle">
            <text x="80" y="390">{{ formatFrequency(resonantFreq / 10) }}</text>
            <text x="240" y="390">{{ formatFrequency(lowerCutoff) }}</text>
            <text x="400" y="390" font-weight="bold" fill="#9333ea">{{ formatFrequency(resonantFreq) }}</text>
            <text x="560" y="390">{{ formatFrequency(upperCutoff) }}</text>
            <text x="720" y="390">{{ formatFrequency(resonantFreq * 10) }}</text>
          </g>

          <!-- Resonance curve -->
          <path :d="resonanceCurve" stroke="#9333ea" stroke-width="3" fill="none"/>
          
          <!-- -3dB bandwidth markers -->
          <line :x1="240" y1="50" :x2="240" y2="350" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,5"/>
          <line :x1="560" y1="50" :x2="560" y2="350" stroke="#ef4444" stroke-width="1" stroke-dasharray="5,5"/>
          <text x="400" y="380" font-size="11" fill="#ef4444" text-anchor="middle" font-weight="bold">
            BW = {{ formatFrequency(bandwidth) }}
          </text>

          <!-- Peak marker -->
          <circle cx="400" cy="50" r="6" fill="#9333ea"/>
          <text x="400" y="35" font-size="12" fill="#9333ea" text-anchor="middle" font-weight="bold">f₀</text>

          <!-- -3dB points -->
          <circle cx="240" cy="154" r="5" fill="#ef4444"/>
          <circle cx="560" cy="154" r="5" fill="#ef4444"/>
          
          <!-- Axis titles -->
          <text x="400" y="30" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold">Frequency (log scale)</text>
          <text x="15" y="200" font-size="14" fill="#374151" text-anchor="middle" font-weight="bold" transform="rotate(-90, 15, 200)">Relative Response</text>
        </svg>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
        Circuit Topology: {{ circuitType === 'series' ? 'Series RLC' : 'Parallel RLC' }}
      </h3>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
        <svg viewBox="0 0 400 200" class="w-full h-auto max-w-md mx-auto">
          <!-- Series RLC -->
          <g v-if="circuitType === 'series'">
            <!-- Wire path -->
            <path d="M 50 100 L 100 100 L 100 60 L 120 60 L 120 140 L 100 140 L 100 100 L 150 100" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            <path d="M 150 100 L 200 100 L 200 60 L 220 60 L 220 140 L 200 140 L 200 100 L 250 100" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            <path d="M 250 100 L 300 100 L 300 60 L 320 60 L 320 140 L 300 140 L 300 100 L 350 100" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            
            <!-- Labels -->
            <text x="110" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">R</text>
            <text x="210" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">L</text>
            <text x="310" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">C</text>
            
            <!-- Connection points -->
            <circle cx="50" cy="100" r="4" fill="#9333ea"/>
            <circle cx="350" cy="100" r="4" fill="#9333ea"/>
            <text x="20" y="105" font-size="12" fill="#6b7280">Vin</text>
            <text x="365" y="105" font-size="12" fill="#6b7280">Vout</text>
          </g>

          <!-- Parallel RLC -->
          <g v-else>
            <!-- Main wires -->
            <path d="M 50 60 L 100 60 L 100 100 L 350 100 L 350 60 L 400 60" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            <path d="M 50 140 L 100 140 L 100 100 L 350 100 L 350 140 L 400 140" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            
            <!-- Components -->
            <rect x="135" y="55" width="30" height="10" fill="#9333ea"/>
            <rect x="135" y="135" width="30" height="10" fill="#9333ea"/>
            
            <!-- Inductor coil -->
            <path d="M 200 60 L 220 60 Q 230 50 240 60 Q 250 70 260 60 Q 270 50 280 60 L 300 60" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            <path d="M 200 140 L 220 140 Q 230 130 240 140 Q 250 150 260 140 Q 270 130 280 140 L 300 140" 
              stroke="#9333ea" stroke-width="3" fill="none"/>
            
            <!-- Capacitor -->
            <line x1="335" y1="60" x2="335" y2="75" stroke="#9333ea" stroke-width="3"/>
            <line x1="365" y1="60" x2="365" y2="75" stroke="#9333ea" stroke-width="3"/>
            <line x1="335" y1="140" x2="335" y2="125" stroke="#9333ea" stroke-width="3"/>
            <line x1="365" y1="140" x2="365" y2="125" stroke="#9333ea" stroke-width="3"/>
            
            <!-- Labels -->
            <text x="150" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">R</text>
            <text x="250" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">L</text>
            <text x="350" y="40" font-size="14" fill="#9333ea" text-anchor="middle" font-weight="bold">C</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Design Equations Reference -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Key Equations
      </h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2 text-sm">Resonant Frequency</h4>
          <p class="text-xs font-mono text-gray-700 dark:text-gray-300">f₀ = 1 / (2π√LC)</p>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2 text-sm">Quality Factor</h4>
          <p class="text-xs font-mono text-gray-700 dark:text-gray-300">
            {{ circuitType === 'series' ? 'Q = (1/R)√(L/C)' : 'Q = R√(C/L)' }}
          </p>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2 text-sm">Bandwidth</h4>
          <p class="text-xs font-mono text-gray-700 dark:text-gray-300">BW = f₀ / Q</p>
        </div>
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 class="font-bold text-purple-800 dark:text-purple-200 mb-2 text-sm">Angular Frequency</h4>
          <p class="text-xs font-mono text-gray-700 dark:text-gray-300">ω₀ = 2πf₀ = 1/√LC</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Circuit parameters
const circuitType = ref('series')
const resistance = ref(100) // Ohms
const inductance = ref(100e-6) // Henry (100 µH)
const capacitance = ref(10e-9) // Farad (10 nF)

// Quick presets
const presets = [
  { name: 'AM Radio (1MHz)', type: 'series', r: 50, l: 250e-6, c: 100e-12 },
  { name: 'FM Radio (100MHz)', type: 'series', r: 50, l: 100e-9, c: 25e-12 },
  { name: 'Power Inductor', type: 'parallel', r: 1000, l: 10e-3, c: 1e-6 },
  { name: 'High Q RF', type: 'series', r: 10, l: 1e-6, c: 25e-12 }
]

const applyPreset = (preset) => {
  circuitType.value = preset.type
  resistance.value = preset.r
  inductance.value = preset.l
  capacitance.value = preset.c
}

// Calculations
const resonantFreq = computed(() => {
  return 1 / (2 * Math.PI * Math.sqrt(inductance.value * capacitance.value))
})

const angularFreq = computed(() => {
  return 1 / Math.sqrt(inductance.value * capacitance.value)
})

const qualityFactor = computed(() => {
  if (circuitType.value === 'series') {
    return (1 / resistance.value) * Math.sqrt(inductance.value / capacitance.value)
  } else {
    return resistance.value * Math.sqrt(capacitance.value / inductance.value)
  }
})

const bandwidth = computed(() => {
  return resonantFreq.value / qualityFactor.value
})

const lowerCutoff = computed(() => {
  return resonantFreq.value - bandwidth.value / 2
})

const upperCutoff = computed(() => {
  return resonantFreq.value + bandwidth.value / 2
})

const dampingRatio = computed(() => {
  return 1 / (2 * qualityFactor.value)
})

const inductiveReactance = computed(() => {
  return 2 * Math.PI * resonantFreq.value * inductance.value
})

const capacitiveReactance = computed(() => {
  return 1 / (2 * Math.PI * resonantFreq.value * capacitance.value)
})

const formatImpedance = computed(() => {
  if (circuitType.value === 'series') {
    return formatResistance(resistance.value) + ' (minimum)'
  } else {
    return formatResistance(resistance.value) + ' (maximum)'
  }
})

// Resonance curve for visualization
const resonanceCurve = computed(() => {
  const points = []
  const Q = qualityFactor.value
  for (let i = 0; i <= 100; i++) {
    const logRatio = (i - 50) / 10 // -5 to +5
    const ratio = Math.pow(10, logRatio)
    let response
    
    if (circuitType.value === 'series') {
      // Series RLC: current is maximum at resonance
      response = 1 / Math.sqrt(Math.pow(1 - ratio * ratio, 2) + Math.pow(ratio / Q, 2))
    } else {
      // Parallel RLC: impedance is maximum at resonance
      response = 1 / Math.sqrt(Math.pow(1 - 1 / (ratio * ratio), 2) + Math.pow(1 / (ratio * Q), 2))
    }
    
    const db = 20 * Math.log10(response)
    const x = 80 + i * 7.2
    const y = 50 + db * 5
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${Math.min(350, Math.max(50, y))}`)
  }
  return points.join(' ')
})

// Formatting helpers
const formatFrequency = (freq) => {
  if (freq < 0) return '0 Hz'
  if (freq >= 1e9) return (freq / 1e9).toFixed(3) + ' GHz'
  if (freq >= 1e6) return (freq / 1e6).toFixed(3) + ' MHz'
  if (freq >= 1e3) return (freq / 1e3).toFixed(3) + ' kHz'
  return freq.toFixed(2) + ' Hz'
}

const formatResistance = (r) => {
  if (r >= 1e6) return (r / 1e6).toFixed(2) + ' MΩ'
  if (r >= 1e3) return (r / 1e3).toFixed(2) + ' kΩ'
  return r.toFixed(2) + ' Ω'
}

const formatInductance = (l) => {
  if (l >= 1) return l.toFixed(3) + ' H'
  if (l >= 1e-3) return (l * 1e3).toFixed(2) + ' mH'
  if (l >= 1e-6) return (l * 1e6).toFixed(2) + ' µH'
  return (l * 1e9).toFixed(2) + ' nH'
}

const formatCapacitance = (c) => {
  if (c >= 1e-3) return (c * 1e3).toFixed(2) + ' mF'
  if (c >= 1e-6) return (c * 1e6).toFixed(2) + ' µF'
  if (c >= 1e-9) return (c * 1e9).toFixed(2) + ' nF'
  return (c * 1e12).toFixed(2) + ' pF'
}
</script>

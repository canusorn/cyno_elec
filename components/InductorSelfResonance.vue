<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Controls Panel -->
    <div class="lg:col-span-1">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Inductor Parameters</h3>
        
        <!-- Inductance Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inductance (L)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="inductance"
              type="number" 
              step="0.1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select v-model="inductanceUnit" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="µH">µH</option>
              <option value="mH">mH</option>
              <option value="H">H</option>
            </select>
          </div>
          <input 
            v-model.number="inductance"
            type="range"
            min="0.1"
            max="1000"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- Parasitic Capacitance Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Parasitic Capacitance (C<sub>p</sub>)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="parasiticCapacitance"
              type="number" 
              step="0.1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select v-model="capacitanceUnit" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="µF">µF</option>
            </select>
          </div>
          <input 
            v-model.number="parasiticCapacitance"
            type="range"
            min="0.1"
            max="100"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- Series Resistance Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Series Resistance (R<sub>s</sub>)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="seriesResistance"
              type="number" 
              step="0.1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
          </div>
          <input 
            v-model.number="seriesResistance"
            type="range"
            min="0.01"
            max="100"
            step="0.01"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- Frequency Range for Analysis -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frequency Range
          </label>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="text-xs text-gray-500 dark:text-gray-400">Start (Hz)</label>
              <input 
                v-model.number="freqStart"
                type="number" 
                step="1000"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div class="flex-1">
              <label class="text-xs text-gray-500 dark:text-gray-400">End (MHz)</label>
              <input 
                v-model.number="freqEnd"
                type="number" 
                step="1"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Presets
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="preset in presets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualization Panel -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- SRF Result Display -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2 opacity-90">Self-Resonant Frequency (SRF)</h3>
          <div class="text-5xl font-bold mb-2">
            {{ formatFrequency(srf) }}
          </div>
          <p class="text-sm opacity-80">
            The inductor behaves like a capacitor above this frequency
          </p>
        </div>
      </div>

      <!-- Impedance vs Frequency Graph -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Impedance vs Frequency
        </h3>
        <div class="relative">
          <svg viewBox="0 0 500 300" class="w-full">
            <!-- Grid -->
            <defs>
              <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect x="50" y="20" width="430" height="250" fill="url(#grid)" />
            
            <!-- Axes -->
            <line x1="50" y1="20" x2="50" y2="270" stroke="#374151" stroke-width="2"/>
            <line x1="50" y1="270" x2="480" y2="270" stroke="#374151" stroke-width="2"/>
            
            <!-- Y-axis labels (logarithmic) -->
            <text x="45" y="270" text-anchor="end" class="text-xs" fill="#6B7280">1Ω</text>
            <text x="45" y="220" text-anchor="end" class="text-xs" fill="#6B7280">10Ω</text>
            <text x="45" y="170" text-anchor="end" class="text-xs" fill="#6B7280">100Ω</text>
            <text x="45" y="120" text-anchor="end" class="text-xs" fill="#6B7280">1kΩ</text>
            <text x="45" y="70" text-anchor="end" class="text-xs" fill="#6B7280">10kΩ</text>
            <text x="45" y="30" text-anchor="end" class="text-xs" fill="#6B7280">100kΩ</text>
            
            <!-- X-axis labels (logarithmic frequency) -->
            <text x="50" y="285" text-anchor="middle" class="text-xs" fill="#6B7280">{{ formatFrequencyCompact(freqStart) }}</text>
            <text x="265" y="285" text-anchor="middle" class="text-xs" fill="#6B7280">{{ formatFrequencyCompact(Math.sqrt(freqStart * freqEnd * 1e6)) }}</text>
            <text x="480" y="285" text-anchor="middle" class="text-xs" fill="#6B7280">{{ formatFrequencyCompact(freqEnd * 1e6) }}</text>
            
            <!-- Axis labels -->
            <text x="265" y="310" text-anchor="middle" class="text-sm font-semibold" fill="#374151">Frequency (Log Scale)</text>
            <text x="20" y="150" text-anchor="middle" class="text-sm font-semibold" fill="#374151" transform="rotate(-90, 20, 150)">Impedance (Log Scale)</text>
            
            <!-- Impedance curve -->
            <path 
              :d="impedanceCurve" 
              fill="none" 
              stroke="#8B5CF6" 
              stroke-width="3"
            />
            
            <!-- SRF marker -->
            <line 
              :x1="srfX" 
              y1="20" 
              :x2="srfX" 
              y2="270" 
              stroke="#EC4899" 
              stroke-width="2" 
              stroke-dasharray="5,5"
            />
            <circle 
              :cx="srfX" 
              :cy="srfY" 
              r="6" 
              fill="#EC4899"
            />
            <text 
              :x="srfX" 
              y="15" 
              text-anchor="middle" 
              class="text-xs font-bold" 
              fill="#EC4899"
            >
              SRF
            </text>
            
            <!-- Current frequency marker if set -->
            <g v-if="currentFrequency > 0">
              <line 
                :x1="currentFreqX" 
                y1="20" 
                :x2="currentFreqX" 
                y2="270" 
                stroke="#3B82F6" 
                stroke-width="2" 
                stroke-dasharray="3,3"
              />
              <text 
                :x="currentFreqX" 
                y="285" 
                text-anchor="middle" 
                class="text-xs font-bold" 
                fill="#3B82F6"
              >
                {{ formatFrequencyCompact(currentFrequency) }}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Equivalent Circuit Diagram -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Real Inductor Model
        </h3>
        <div class="flex justify-center">
          <svg viewBox="0 0 400 180" class="w-full max-w-lg">
            <!-- Background -->
            <rect x="0" y="0" width="400" height="180" fill="transparent"/>
            
            <!-- Main inductor (center) -->
            <g transform="translate(150, 90)">
              <!-- Inductor coils -->
              <path d="M0,-40 Q10,-35 10,-30 Q10,-25 0,-20 Q-10,-15 -10,-10 Q-10,-5 0,0 Q10,5 10,10 Q10,15 0,20 Q-10,25 -10,30 Q-10,35 0,40" 
                    fill="none" stroke="#8B5CF6" stroke-width="4"/>
              <text x="0" y="60" text-anchor="middle" class="text-sm font-bold" fill="#8B5CF6">
                L = {{ inductance }}{{ inductanceUnit }}
              </text>
            </g>
            
            <!-- Series resistance (left) -->
            <rect x="70" y="85" width="50" height="10" fill="white" stroke="#F59E0B" stroke-width="2"/>
            <text x="95" y="70" text-anchor="middle" class="text-xs font-bold" fill="#F59E0B">
              Rs = {{ seriesResistance }}Ω
            </text>
            
            <!-- Parasitic capacitance (right, parallel) -->
            <g transform="translate(280, 90)">
              <!-- Capacitor plates -->
              <line x1="-15" y1="-15" x2="-15" y2="15" stroke="#EC4899" stroke-width="3"/>
              <line x1="15" y1="-15" x2="15" y2="15" stroke="#EC4899" stroke-width="3"/>
              <text x="0" y="-25" text-anchor="middle" class="text-xs font-bold" fill="#EC4899">
                Cp = {{ parasiticCapacitance }}{{ capacitanceUnit }}
              </text>
            </g>
            
            <!-- Connection wires -->
            <line x1="50" y1="90" x2="70" y2="90" stroke="#6B7280" stroke-width="2"/>
            <line x1="120" y1="90" x2="150" y2="90" stroke="#6B7280" stroke-width="2"/>
            <line x1="150" y1="90" x2="280" y2="90" stroke="#6B7280" stroke-width="2"/>
            <line x1="280" y1="75" x2="280" y2="40" stroke="#EC4899" stroke-width="2"/>
            <line x1="280" y1="105" x2="280" y2="140" stroke="#EC4899" stroke-width="2"/>
            <line x1="50" y1="40" x2="280" y2="40" stroke="#6B7280" stroke-width="2"/>
            <line x1="50" y1="140" x2="280" y2="140" stroke="#6B7280" stroke-width="2"/>
            <line x1="50" y1="90" x2="50" y2="40" stroke="#6B7280" stroke-width="2"/>
            <line x1="50" y1="90" x2="50" y2="140" stroke="#6B7280" stroke-width="2"/>
            
            <!-- Terminals -->
            <circle cx="50" cy="40" r="4" fill="#6B7280"/>
            <circle cx="50" cy="140" r="4" fill="#6B7280"/>
            <text x="30" y="45" text-anchor="middle" class="text-sm font-bold" fill="#6B7280">+</text>
            <text x="30" y="145" text-anchor="middle" class="text-sm font-bold" fill="#6B7280">−</text>
          </svg>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 SRF</h4>
          <div class="text-2xl font-bold text-purple-500 mb-2">
            {{ formatFrequency(srf) }}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Self-Resonant Frequency
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⭕ Q Factor at 1kHz</h4>
          <div class="text-2xl font-bold text-green-500 mb-2">
            {{ qFactor.toFixed(2) }}
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Quality Factor (ωL/Rs)
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 Reactance at 1kHz</h4>
          <div class="text-2xl font-bold text-blue-500 mb-2">
            {{ reactance1kHz.toFixed(2) }}Ω
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            XL = 2πfL
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Component parameters
const inductance = ref(100)
const inductanceUnit = ref('µH')
const parasiticCapacitance = ref(5)
const capacitanceUnit = ref('pF')
const seriesResistance = ref(0.5)

// Frequency range for graph
const freqStart = ref(1000) // Hz
const freqEnd = ref(100) // MHz

// Current frequency marker (can be set by user)
const currentFrequency = ref(0)

// Presets
const presets = [
  { name: 'Small RF', L: 1, Lunit: 'µH', Cp: 2, Cpunit: 'pF', Rs: 0.1 },
  { name: 'Power Inductor', L: 100, Lunit: 'µH', Cp: 10, Cpunit: 'pF', Rs: 0.5 },
  { name: 'High Q', L: 10, Lunit: 'mH', Cp: 5, Cpunit: 'pF', Rs: 0.1 },
  { name: 'SMD 0805', L: 22, Lunit: 'nH', Cp: 0.5, Cpunit: 'pF', Rs: 0.05 },
]

// Unit conversion to base units (H and F)
const inductanceBase = computed(() => {
  switch (inductanceUnit.value) {
    case 'µH': return inductance.value * 1e-6
    case 'mH': return inductance.value * 1e-3
    case 'H': return inductance.value
    default: return inductance.value
  }
})

const capacitanceBase = computed(() => {
  switch (capacitanceUnit.value) {
    case 'pF': return parasiticCapacitance.value * 1e-12
    case 'nF': return parasiticCapacitance.value * 1e-9
    case 'µF': return parasiticCapacitance.value * 1e-6
    default: return parasiticCapacitance.value
  }
})

// Calculate Self-Resonant Frequency (SRF)
// SRF = 1 / (2π * √(L * C))
const srf = computed(() => {
  const L = inductanceBase.value
  const C = capacitanceBase.value
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

// Calculate Q factor at 1kHz
const qFactor = computed(() => {
  const f = 1000 // 1kHz
  const omega = 2 * Math.PI * f
  const XL = omega * inductanceBase.value
  return XL / seriesResistance.value
})

// Calculate inductive reactance at 1kHz
const reactance1kHz = computed(() => {
  const f = 1000 // 1kHz
  const omega = 2 * Math.PI * f
  return omega * inductanceBase.value
})

// Calculate impedance at a given frequency
const calculateImpedance = (freq: number): number => {
  const omega = 2 * Math.PI * freq
  const XL = omega * inductanceBase.value
  const XC = 1 / (omega * capacitanceBase.value)
  
  // Below SRF: inductive, impedance = √(Rs² + (XL - XC)²)
  // At SRF: XL = XC, impedance = Rs (minimum)
  // Above SRF: capacitive, impedance increases again
  
  const netReactance = XL - XC
  return Math.sqrt(Math.pow(seriesResistance.value, 2) + Math.pow(netReactance, 2))
}

// Generate impedance curve for the graph
const impedanceCurve = computed(() => {
  let points = ''
  const fStart = freqStart.value
  const fEnd = freqEnd.value * 1e6 // Convert MHz to Hz
  
  // Generate 100 points logarithmically spaced
  for (let i = 0; i <= 100; i++) {
    const logF = Math.log10(fStart) + (Math.log10(fEnd) - Math.log10(fStart)) * (i / 100)
    const freq = Math.pow(10, logF)
    const Z = calculateImpedance(freq)
    
    // Map to graph coordinates
    const x = 50 + (i / 100) * 430
    const logZ = Math.log10(Math.max(Z, 1))
    const y = 270 - ((logZ - 0) / 5) * 250 // Log scale from 1Ω to 100kΩ (5 decades)
    
    points += `${i === 0 ? 'M' : 'L'} ${x} ${y} `
  }
  
  return points
})

// SRF position on graph
const srfX = computed(() => {
  const fStart = freqStart.value
  const fEnd = freqEnd.value * 1e6
  const logSRF = Math.log10(srf.value)
  const logStart = Math.log10(fStart)
  const logEnd = Math.log10(fEnd)
  
  return 50 + ((logSRF - logStart) / (logEnd - logStart)) * 430
})

const srfY = computed(() => {
  const Z = seriesResistance.value
  const logZ = Math.log10(Math.max(Z, 1))
  return 270 - ((logZ - 0) / 5) * 250
})

// Current frequency marker position
const currentFreqX = computed(() => {
  if (currentFrequency.value <= 0) return 0
  
  const fStart = freqStart.value
  const fEnd = freqEnd.value * 1e6
  const logF = Math.log10(currentFrequency.value)
  const logStart = Math.log10(fStart)
  const logEnd = Math.log10(fEnd)
  
  return 50 + ((logF - logStart) / (logEnd - logStart)) * 430
})

// Helper functions
const formatFrequency = (freq: number): string => {
  if (freq >= 1e9) return `${(freq / 1e9).toFixed(2)} GHz`
  if (freq >= 1e6) return `${(freq / 1e6).toFixed(2)} MHz`
  if (freq >= 1e3) return `${(freq / 1e3).toFixed(2)} kHz`
  return `${freq.toFixed(2)} Hz`
}

const formatFrequencyCompact = (freq: number): string => {
  if (freq >= 1e9) return `${(freq / 1e9).toFixed(1)}G`
  if (freq >= 1e6) return `${(freq / 1e6).toFixed(1)}M`
  if (freq >= 1e3) return `${(freq / 1e3).toFixed(1)}k`
  return `${freq.toFixed(0)}`
}

const applyPreset = (preset: any) => {
  inductance.value = preset.L
  inductanceUnit.value = preset.Lunit
  parasiticCapacitance.value = preset.Cp
  capacitanceUnit.value = preset.Cpunit
  seriesResistance.value = preset.Rs
}
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8B5CF6;
  cursor: pointer;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #8B5CF6;
  cursor: pointer;
  border: none;
}
</style>

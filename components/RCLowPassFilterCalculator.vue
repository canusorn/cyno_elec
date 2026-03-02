<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Controls Panel -->
    <div class="lg:col-span-1">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Filter Parameters</h3>
        
        <!-- Cutoff Frequency Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Desired Cutoff Frequency (f<sub>c</sub>)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="cutoffFreq"
              type="number" 
              step="100"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select v-model="freqUnit" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="Hz">Hz</option>
              <option value="kHz">kHz</option>
              <option value="MHz">MHz</option>
            </select>
          </div>
          <input 
            v-model.number="cutoffFreq"
            type="range"
            min="10"
            max="100000"
            step="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>

        <!-- Design Strategy -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Design Strategy
          </label>
          <select 
            v-model="designStrategy"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="capacitor">Choose C, Calculate R</option>
            <option value="resistor">Choose R, Calculate C</option>
            <option value="impedance">Match Impedance (Z = 50Ω)</option>
          </select>
        </div>

        <!-- Component Selection based on strategy -->
        <div v-if="designStrategy === 'capacitor'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Capacitor Value
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="capacitor"
              type="number" 
              step="0.1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select v-model="capacitorUnit" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="pF">pF</option>
              <option value="nF">nF</option>
              <option value="µF">µF</option>
            </select>
          </div>
        </div>

        <div v-if="designStrategy === 'resistor'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Resistor Value
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="resistor"
              type="number" 
              step="10"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
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

        <!-- Standard Capacitor Values -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Standard Capacitor Values (nF)
          </label>
          <div class="grid grid-cols-4 gap-1">
            <button 
              v-for="val in standardCapacitors"
              :key="val"
              @click="setCapacitor(val)"
              class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
              :class="{ 'ring-2 ring-primary': capacitor === val && capacitorUnit === 'nF' }"
            >
              {{ val }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualization Panel -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Calculated Values -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
          <h4 class="text-lg font-semibold mb-2 opacity-90">Resistor (R)</h4>
          <div class="text-4xl font-bold mb-2">
            {{ formatResistance(calculatedResistor) }}
          </div>
          <p class="text-sm opacity-80">
            {{ getNearestE96(calculatedResistor) }} (E96 standard)
          </p>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
          <h4 class="text-lg font-semibold mb-2 opacity-90">Capacitor (C)</h4>
          <div class="text-4xl font-bold mb-2">
            {{ formatCapacitance(calculatedCapacitor) }}
          </div>
          <p class="text-sm opacity-80">
            {{ getNearestStandardCap(calculatedCapacitor) }} (E6 standard)
          </p>
        </div>
      </div>

      <!-- Cutoff Frequency Display -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Filter Characteristics
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-2xl font-bold text-blue-500">{{ formatFrequency(calculatedCutoff) }}</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Cutoff Frequency</p>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-2xl font-bold text-purple-500">{{ -3 }} dB</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Gain at f<sub>c</sub></p>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-2xl font-bold text-green-500">{{ calculatedTau.toFixed(2) }} ms</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Time Constant (τ)</p>
          </div>
          <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-2xl font-bold text-orange-500">{{ calculatedPhaseShift.toFixed(1) }}°</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Phase Shift at f<sub>c</sub></p>
          </div>
        </div>
      </div>

      <!-- Frequency Response Graph -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Frequency Response (Bode Plot)
        </h3>
        <div class="relative">
          <svg viewBox="0 0 500 350" class="w-full">
            <!-- Magnitude Response -->
            <text x="250" y="20" text-anchor="middle" class="text-sm font-bold" fill="#374151">Magnitude Response</text>
            
            <!-- Grid -->
            <defs>
              <pattern id="gridBode" width="50" height="30" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect x="50" y="30" width="430" height="130" fill="url(#gridBode)" />
            
            <!-- Axes for magnitude -->
            <line x1="50" y1="30" x2="50" y2="160" stroke="#374151" stroke-width="2"/>
            <line x1="50" y1="160" x2="480" y2="160" stroke="#374151" stroke-width="2"/>
            
            <!-- Y-axis labels (dB) -->
            <text x="45" y="45" text-anchor="end" class="text-xs" fill="#6B7280">0 dB</text>
            <text x="45" y="77" text-anchor="end" class="text-xs" fill="#6B7280">-10 dB</text>
            <text x="45" y="110" text-anchor="end" class="text-xs" fill="#6B7280">-20 dB</text>
            <text x="45" y="142" text-anchor="end" class="text-xs" fill="#6B7280">-30 dB</text>
            
            <!-- X-axis labels (decades) -->
            <text x="50" y="175" text-anchor="middle" class="text-xs" fill="#6B7280">0.01fc</text>
            <text x="163" y="175" text-anchor="middle" class="text-xs" fill="#6B7280">0.1fc</text>
            <text x="276" y="175" text-anchor="middle" class="text-xs" fill="#6B7280">fc</text>
            <text x="390" y="175" text-anchor="middle" class="text-xs" fill="#6B7280">10fc</text>
            <text x="480" y="175" text-anchor="middle" class="text-xs" fill="#6B7280">100fc</text>
            
            <!-- Magnitude curve -->
            <path 
              :d="magnitudeCurve" 
              fill="none" 
              stroke="#3B82F6" 
              stroke-width="3"
            />
            
            <!-- -3dB point marker -->
            <line 
              x1="276" 
              y1="30" 
              x2="276" 
              y2="160" 
              stroke="#EF4444" 
              stroke-width="2" 
              stroke-dasharray="5,5"
            />
            <text x="276" y="25" text-anchor="middle" class="text-xs font-bold" fill="#EF4444">fc</text>
            
            <!-- Phase Response -->
            <text x="250" y="200" text-anchor="middle" class="text-sm font-bold" fill="#374151">Phase Response</text>
            
            <!-- Grid for phase -->
            <rect x="50" y="210" width="430" height="130" fill="url(#gridBode)" />
            
            <!-- Axes for phase -->
            <line x1="50" y1="210" x2="50" y2="340" stroke="#374151" stroke-width="2"/>
            <line x1="50" y1="340" x2="480" y2="340" stroke="#374151" stroke-width="2"/>
            
            <!-- Y-axis labels (degrees) -->
            <text x="45" y="225" text-anchor="end" class="text-xs" fill="#6B7280">0°</text>
            <text x="45" y="275" text-anchor="end" class="text-xs" fill="#6B7280">-45°</text>
            <text x="45" y="325" text-anchor="end" class="text-xs" fill="#6B7280">-90°</text>
            
            <!-- X-axis labels (decades) -->
            <text x="50" y="355" text-anchor="middle" class="text-xs" fill="#6B7280">0.01fc</text>
            <text x="163" y="355" text-anchor="middle" class="text-xs" fill="#6B7280">0.1fc</text>
            <text x="276" y="355" text-anchor="middle" class="text-xs" fill="#6B7280">fc</text>
            <text x="390" y="355" text-anchor="middle" class="text-xs" fill="#6B7280">10fc</text>
            <text x="480" y="355" text-anchor="middle" class="text-xs" fill="#6B7280">100fc</text>
            
            <!-- Phase curve -->
            <path 
              :d="phaseCurve" 
              fill="none" 
              stroke="#8B5CF6" 
              stroke-width="3"
            />
            
            <!-- -45° point marker -->
            <line 
              x1="276" 
              y1="210" 
              x2="276" 
              y2="340" 
              stroke="#EF4444" 
              stroke-width="2" 
              stroke-dasharray="5,5"
            />
            <circle cx="276" cy="275" r="5" fill="#EF4444"/>
          </svg>
        </div>
      </div>

      <!-- Circuit Diagram -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          RC Low-Pass Filter Circuit
        </h3>
        <div class="flex justify-center">
          <svg viewBox="0 0 400 180" class="w-full max-w-lg">
            <!-- Background -->
            <rect x="0" y="0" width="400" height="180" fill="transparent"/>
            
            <!-- Input terminal -->
            <text x="30" y="95" text-anchor="middle" class="text-sm font-bold" fill="#3B82F6">Vin</text>
            
            <!-- Resistor (top) -->
            <rect x="120" y="85" width="60" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
            <text x="150" y="70" text-anchor="middle" class="text-xs font-bold" fill="#8B5CF6">
              R = {{ formatResistanceCompact(calculatedResistor) }}
            </text>
            
            <!-- Capacitor (right side, vertical) -->
            <g transform="translate(280, 90)">
              <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#22C55E" stroke-width="3"/>
              <line x1="10" y1="-15" x2="10" y2="15" stroke="#22C55E" stroke-width="3"/>
              <text x="0" y="35" text-anchor="middle" class="text-xs font-bold" fill="#22C55E">
                C = {{ formatCapacitanceCompact(calculatedCapacitor) }}
              </text>
            </g>
            
            <!-- Output terminal -->
            <text x="320" y="95" text-anchor="middle" class="text-sm font-bold" fill="#EF4444">Vout</text>
            
            <!-- Wires -->
            <line x1="50" y1="90" x2="120" y2="90" stroke="#6B7280" stroke-width="2"/> <!-- Input to R -->
            <line x1="180" y1="90" x2="280" y2="90" stroke="#6B7280" stroke-width="2"/> <!-- R to junction -->
            <line x1="280" y1="90" x2="310" y2="90" stroke="#6B7280" stroke-width="2"/> <!-- Junction to output -->
            <line x1="280" y1="75" x2="280" y2="105" stroke="#22C55E" stroke-width="2"/> <!-- Through capacitor -->
            <line x1="50" y1="90" x2="50" y2="150" stroke="#6B7280" stroke-width="2"/> <!-- Input down -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="#6B7280" stroke-width="2"/> <!-- Ground return -->
            <line x1="280" y1="105" x2="280" y2="150" stroke="#22C55E" stroke-width="2"/> <!-- Cap to ground -->
            <line x1="350" y1="90" x2="350" y2="150" stroke="#6B7280" stroke-width="2"/> <!-- Load to ground -->
            
            <!-- Ground symbol -->
            <g transform="translate(200, 160)">
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#6B7280" stroke-width="2"/>
              <line x1="-10" y1="5" x2="10" y2="5" stroke="#6B7280" stroke-width="2"/>
              <line x1="-5" y1="10" x2="5" y2="10" stroke="#6B7280" stroke-width="2"/>
            </g>
            
            <!-- Input/Output labels -->
            <text x="40" y="80" text-anchor="end" class="text-xs" fill="#6B7280">Signal Input</text>
            <text x="360" y="80" text-anchor="start" class="text-xs" fill="#6B7280">Filtered Output</text>
          </svg>
        </div>
      </div>

      <!-- Attenuation Table -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Attenuation at Different Frequencies
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Frequency</th>
                <th class="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Gain</th>
                <th class="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Attenuation</th>
                <th class="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Phase Shift</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in attenuationTable" :key="row.freq" class="border-b border-gray-100 dark:border-gray-800">
                <td class="py-2 px-4 text-gray-900 dark:text-white">{{ row.freqLabel }}</td>
                <td class="py-2 px-4 text-gray-900 dark:text-white">{{ row.gain.toFixed(3) }}</td>
                <td class="py-2 px-4 text-gray-900 dark:text-white">{{ row.attenuation.toFixed(1) }} dB</td>
                <td class="py-2 px-4 text-gray-900 dark:text-white">{{ row.phase.toFixed(1) }}°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Input parameters
const cutoffFreq = ref(1000)
const freqUnit = ref('Hz')
const designStrategy = ref('impedance')
const capacitor = ref(10)
const capacitorUnit = ref('nF')
const resistor = ref(1000)

// Presets
const presets = [
  { name: 'Audio (1kHz)', fc: 1000, fcUnit: 'Hz', C: 10, Cunit: 'nF' },
  { name: 'Audio (10kHz)', fc: 10000, fcUnit: 'Hz', C: 1, Cunit: 'nF' },
  { name: 'RF (1MHz)', fc: 1, fcUnit: 'MHz', C: 100, Cunit: 'pF' },
  { name: 'DC (100Hz)', fc: 100, fcUnit: 'Hz', C: 100, Cunit: 'nF' },
]

// Standard capacitor values (E6 series in nF)
const standardCapacitors = [1, 1.5, 2.2, 3.3, 4.7, 6.8, 10, 15, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680]

// Unit conversion
const cutoffFreqBase = computed(() => {
  switch (freqUnit.value) {
    case 'kHz': return cutoffFreq.value * 1e3
    case 'MHz': return cutoffFreq.value * 1e6
    default: return cutoffFreq.value
  }
})

const capacitorBase = computed(() => {
  switch (capacitorUnit.value) {
    case 'pF': return capacitor.value * 1e-12
    case 'nF': return capacitor.value * 1e-9
    case 'µF': return capacitor.value * 1e-6
    default: return capacitor.value
  }
})

// Calculate component values based on strategy
const calculatedResistor = computed(() => {
  const fc = cutoffFreqBase.value
  const C = capacitorBase.value
  
  switch (designStrategy.value) {
    case 'capacitor':
      // R = 1 / (2π * fc * C)
      return 1 / (2 * Math.PI * fc * C)
    case 'resistor':
      return resistor.value
    case 'impedance':
      // Match to 50Ω impedance
      return 50
    default:
      return 1 / (2 * Math.PI * fc * C)
  }
})

const calculatedCapacitor = computed(() => {
  const fc = cutoffFreqBase.value
  const R = calculatedResistor.value
  
  if (designStrategy.value === 'resistor') {
    // C = 1 / (2π * fc * R)
    return 1 / (2 * Math.PI * fc * R)
  }
  
  return capacitorBase.value
})

const calculatedCutoff = computed(() => {
  const R = calculatedResistor.value
  const C = calculatedCapacitor.value
  return 1 / (2 * Math.PI * R * C)
})

const calculatedTau = computed(() => {
  const R = calculatedResistor.value
  const C = calculatedCapacitor.value
  return R * C * 1000 // Convert to ms
})

const calculatedPhaseShift = computed(() => {
  // Phase shift at cutoff frequency is -45°
  return -45
})

// Calculate gain at a given frequency
const calculateGain = (freq: number): number => {
  const fc = calculatedCutoff.value
  const magnitude = freq / fc
  return 1 / Math.sqrt(1 + magnitude * magnitude)
}

// Calculate phase shift at a given frequency
const calculatePhase = (freq: number): number => {
  const fc = calculatedCutoff.value
  return -Math.atan(freq / fc) * (180 / Math.PI)
}

// Generate magnitude curve
const magnitudeCurve = computed(() => {
  let points = ''
  
  for (let i = 0; i <= 100; i++) {
    const logF = -2 + (4 * i / 100) // -2 to +2 decades
    const freqRatio = Math.pow(10, logF)
    const gain = calculateGain(calculatedCutoff.value * freqRatio)
    const dB = 20 * Math.log10(gain)
    
    const x = 50 + (i / 100) * 430
    const y = 45 - (dB / 40) * 100 // Scale: 0dB at 45, -40dB at 145
    
    points += `${i === 0 ? 'M' : 'L'} ${x} ${Math.max(y, 30)} `
  }
  
  return points
})

// Generate phase curve
const phaseCurve = computed(() => {
  let points = ''
  
  for (let i = 0; i <= 100; i++) {
    const logF = -2 + (4 * i / 100) // -2 to +2 decades
    const freqRatio = Math.pow(10, logF)
    const phase = -Math.atan(freqRatio) * (180 / Math.PI)
    
    const x = 50 + (i / 100) * 430
    const y = 225 - (phase / 90) * 100 // Scale: 0° at 225, -90° at 325
    
    points += `${i === 0 ? 'M' : 'L'} ${x} ${y} `
  }
  
  return points
})

// Attenuation table
const attenuationTable = computed(() => {
  const fc = calculatedCutoff.value
  return [
    {
      freq: 0.01 * fc,
      freqLabel: '0.01 fc',
      gain: calculateGain(0.01 * fc),
      attenuation: -20 * Math.log10(calculateGain(0.01 * fc)),
      phase: calculatePhase(0.01 * fc)
    },
    {
      freq: 0.1 * fc,
      freqLabel: '0.1 fc',
      gain: calculateGain(0.1 * fc),
      attenuation: -20 * Math.log10(calculateGain(0.1 * fc)),
      phase: calculatePhase(0.1 * fc)
    },
    {
      freq: fc,
      freqLabel: 'fc (cutoff)',
      gain: calculateGain(fc),
      attenuation: -20 * Math.log10(calculateGain(fc)),
      phase: calculatePhase(fc)
    },
    {
      freq: 10 * fc,
      freqLabel: '10 fc',
      gain: calculateGain(10 * fc),
      attenuation: -20 * Math.log10(calculateGain(10 * fc)),
      phase: calculatePhase(10 * fc)
    },
    {
      freq: 100 * fc,
      freqLabel: '100 fc',
      gain: calculateGain(100 * fc),
      attenuation: -20 * Math.log10(calculateGain(100 * fc)),
      phase: calculatePhase(100 * fc)
    }
  ]
})

// Helper functions
const formatResistance = (ohms: number): string => {
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`
  return `${ohms.toFixed(2)} Ω`
}

const formatResistanceCompact = (ohms: number): string => {
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(1)}MΩ`
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(1)}kΩ`
  return `${ohms.toFixed(1)}Ω`
}

const formatCapacitance = (farads: number): string => {
  if (farads >= 1e-6) return `${(farads * 1e6).toFixed(2)} µF`
  if (farads >= 1e-9) return `${(farads * 1e9).toFixed(2)} nF`
  if (farads >= 1e-12) return `${(farads * 1e12).toFixed(2)} pF`
  return `${farads.toFixed(2)} F`
}

const formatCapacitanceCompact = (farads: number): string => {
  if (farads >= 1e-6) return `${(farads * 1e6).toFixed(1)}µF`
  if (farads >= 1e-9) return `${(farads * 1e9).toFixed(1)}nF`
  if (farads >= 1e-12) return `${(farads * 1e12).toFixed(1)}pF`
  return `${farads.toFixed(1)}F`
}

const formatFrequency = (hz: number): string => {
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(2)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(2)} kHz`
  return `${hz.toFixed(2)} Hz`
}

const getNearestE96 = (ohms: number): string => {
  // E96 series values (simplified)
  const e96 = [10, 11.3, 12.1, 13.3, 14.7, 16.2, 17.8, 19.6, 21.5, 23.7, 26.1, 28.7, 31.6, 34.8, 38.3, 42.2, 46.4, 51.1, 56.2, 61.9, 68.1, 75, 82.5, 90.9, 100]
  const scale = ohms < 1000 ? 1 : ohms < 10000 ? 10 : 100
  const normalized = ohms / scale
  const nearest = e96.reduce((prev, curr) => 
    Math.abs(curr - normalized) < Math.abs(prev - normalized) ? curr : prev
  )
  return formatResistance(nearest * scale)
}

const getNearestStandardCap = (farads: number): string => {
  // E6 capacitor series (simplified)
  const e6 = [1, 1.5, 2.2, 3.3, 4.7, 6.8]
  let scale = 1e-12
  if (farads >= 1e-6) scale = 1e-6
  else if (farads >= 1e-9) scale = 1e-9
  
  const normalized = farads / scale
  const nearest = e6.reduce((prev, curr) => 
    Math.abs(curr - normalized) < Math.abs(prev - normalized) ? curr : prev
  )
  return formatCapacitance(nearest * scale)
}

const applyPreset = (preset: any) => {
  cutoffFreq.value = preset.fc
  freqUnit.value = preset.fcUnit
  capacitor.value = preset.C
  capacitorUnit.value = preset.Cunit
  designStrategy.value = 'capacitor'
}

const setCapacitor = (val: number) => {
  capacitor.value = val
  capacitorUnit.value = 'nF'
  designStrategy.value = 'capacitor'
}
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3B82F6;
  cursor: pointer;
  border: none;
}
</style>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Resonant Circuit Bandwidth Simulation</h1>
      <p class="text-gray-400">Interactive exploration of Q factor and bandwidth in RLC circuits</p>
    </div>

    <!-- Main Controls -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 class="text-2xl font-semibold text-white">Circuit Parameters</h2>
        <div class="flex gap-2">
          <button
            @click="circuitType = 'series'"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-all',
              circuitType === 'series'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            Series RLC
          </button>
          <button
            @click="circuitType = 'parallel'"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition-all',
              circuitType === 'parallel'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
          >
            Parallel RLC
          </button>
        </div>
      </div>

      <!-- Component Controls -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Inductance -->
        <div class="bg-gray-900 rounded-lg p-4">
          <label class="text-white font-medium mb-2 block">Inductance (L)</label>
          <div class="flex items-center gap-2 mb-3">
            <input
              v-model.number="inductance"
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              class="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select v-model="inductanceUnit" class="bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="H">H</option>
              <option value="mH">mH</option>
              <option value="μH">μH</option>
            </select>
          </div>
          <input
            v-model.number="inductance"
            type="range"
            min="0.1"
            max="1000"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <!-- Capacitance -->
        <div class="bg-gray-900 rounded-lg p-4">
          <label class="text-white font-medium mb-2 block">Capacitance (C)</label>
          <div class="flex items-center gap-2 mb-3">
            <input
              v-model.number="capacitance"
              type="number"
              min="0.1"
              max="10000"
              step="0.1"
              class="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select v-model="capacitanceUnit" class="bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="F">F</option>
              <option value="μF">μF</option>
              <option value="nF">nF</option>
              <option value="pF">pF</option>
            </select>
          </div>
          <input
            v-model.number="capacitance"
            type="range"
            min="0.1"
            max="10000"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <!-- Resistance -->
        <div class="bg-gray-900 rounded-lg p-4">
          <label class="text-white font-medium mb-2 block">Resistance (R)</label>
          <div class="flex items-center gap-2 mb-3">
            <input
              v-model.number="resistance"
              type="number"
              min="1"
              max="10000"
              step="1"
              class="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span class="text-gray-400 font-semibold">Ω</span>
          </div>
          <input
            v-model.number="resistance"
            type="range"
            min="1"
            max="10000"
            step="1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Key Calculations -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Circuit Analysis</h2>
        <div class="space-y-3">
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Resonant Frequency (f₀)</p>
            <p class="text-3xl font-bold text-green-400 font-mono">{{ formatFrequency(resonantFreq) }}</p>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Quality Factor (Q)</p>
            <p class="text-3xl font-bold text-blue-400 font-mono">{{ qualityFactor.toFixed(2) }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ circuitType === 'series' ? 'Q = ω₀L/R' : 'Q = R/(ω₀L)' }}</p>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Bandwidth (BW)</p>
            <p class="text-3xl font-bold text-purple-400 font-mono">{{ formatFrequency(bandwidth) }}</p>
            <p class="text-gray-500 text-xs mt-1">BW = f₀ / Q</p>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">-3dB Frequencies</p>
            <div class="flex justify-between">
              <div>
                <p class="text-xs text-gray-500">Lower (f₁)</p>
                <p class="text-lg font-bold text-orange-400 font-mono">{{ formatFrequency(f1) }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500">Upper (f₂)</p>
                <p class="text-lg font-bold text-orange-400 font-mono">{{ formatFrequency(f2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Q Factor Explanation -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Q Factor Interpretation</h2>
        <div class="space-y-4">
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-sm font-semibold mb-2">Current Q: <span :class="getQFactorColor()" class="text-xl">{{ qualityFactor.toFixed(1) }}</span></p>
            <p class="text-gray-400 text-sm">{{ getQFactorDescription() }}</p>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-white font-semibold mb-2">Selectivity</h3>
            <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                class="h-full transition-all duration-300"
                :class="getSelectivityBarColor()"
                :style="{ width: Math.min(100, (qualityFactor / 100) * 100) + '%' }"
              ></div>
            </div>
            <p class="text-gray-400 text-xs mt-2">{{ getSelectivityDescription() }}</p>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-white font-semibold mb-2">Circuit Type Behavior</h3>
            <ul class="text-gray-400 text-sm space-y-1">
              <li v-if="circuitType === 'series'">
                <span class="text-blue-400">• Series:</span> Minimum impedance at f₀
              </li>
              <li v-else>
                <span class="text-green-400">• Parallel:</span> Maximum impedance at f₀
              </li>
              <li>
                <span class="text-purple-400">• Higher Q:</span> Narrower bandwidth, sharper peak
              </li>
              <li>
                <span class="text-orange-400">• Lower Q:</span> Wider bandwidth, broader response
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Frequency Response Curve -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Frequency Response</h2>
      <div class="bg-gray-900 rounded-lg p-6">
        <svg viewBox="0 0 800 400" class="w-full h-auto">
          <!-- Background grid -->
          <defs>
            <pattern id="responseGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#responseGrid)" />
          
          <!-- Axes -->
          <line x1="60" y1="350" x2="760" y2="350" stroke="#9CA3AF" stroke-width="2" />
          <line x1="60" y1="350" x2="60" y2="50" stroke="#9CA3AF" stroke-width="2" />
          
          <!-- Y-axis labels -->
          <text x="50" y="55" text-anchor="end" fill="#9CA3AF" font-size="12">0 dB</text>
          <text x="50" y="125" text-anchor="end" fill="#9CA3AF" font-size="12">-6 dB</text>
          <text x="50" y="195" text-anchor="end" fill="#9CA3AF" font-size="12">-12 dB</text>
          <text x="50" y="265" text-anchor="end" fill="#9CA3AF" font-size="12">-18 dB</text>
          <text x="50" y="335" text-anchor="end" fill="#9CA3AF" font-size="12">-24 dB</text>
          
          <!-- Y-axis title -->
          <text x="25" y="200" text-anchor="middle" fill="#9CA3AF" font-size="12" transform="rotate(-90, 25, 200)">Gain (dB)</text>
          
          <!-- X-axis labels -->
          <text x="60" y="370" text-anchor="middle" fill="#9CA3AF" font-size="11">{{ formatFrequency(frequencyRange[0]) }}</text>
          <text x="235" y="370" text-anchor="middle" fill="#9CA3AF" font-size="11">{{ formatFrequency(frequencyRange[3]) }}</text>
          <text x="410" y="370" text-anchor="middle" fill="#9CA3AF" font-size="11">{{ formatFrequency(frequencyRange[6]) }}</text>
          <text x="585" y="370" text-anchor="middle" fill="#9CA3AF" font-size="11">{{ formatFrequency(frequencyRange[9]) }}</text>
          <text x="760" y="370" text-anchor="middle" fill="#9CA3AF" font-size="11">{{ formatFrequency(frequencyRange[12]) }}</text>
          
          <!-- X-axis title -->
          <text x="410" y="390" text-anchor="middle" fill="#9CA3AF" font-size="12">Frequency (Hz)</text>
          
          <!-- Frequency response curve -->
          <path
            :d="frequencyResponsePath"
            fill="none"
            stroke="#3B82F6"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          
          <!-- Peak point -->
          <circle :cx="peakX" :cy="peakY" r="6" fill="#10B981" />
          <text :x="peakX" :y="peakY - 15" text-anchor="middle" fill="#10B981" font-size="12" font-weight="bold">
            f₀ = {{ formatFrequency(resonantFreq) }}
          </text>
          
          <!-- -3dB points -->
          <circle :cx="f1X" :cy="f1Y" r="5" fill="#F59E0B" />
          <text :x="f1X" :y="f1Y - 10" text-anchor="middle" fill="#F59E0B" font-size="11">
            f₁
          </text>
          
          <circle :cx="f2X" :cy="f2Y" r="5" fill="#F59E0B" />
          <text :x="f2X" :y="f2Y - 10" text-anchor="middle" fill="#F59E0B" font-size="11">
            f₂
          </text>
          
          <!-- Bandwidth indication -->
          <line
            :x1="f1X"
            :y1="bandwidthY"
            :x2="f2X"
            :y2="bandwidthY"
            stroke="#8B5CF6"
            stroke-width="2"
            stroke-dasharray="5,5"
          />
          <text
            :x="(f1X + f2X) / 2"
            :y="bandwidthY - 10"
            text-anchor="middle"
            fill="#8B5CF6"
            font-size="12"
            font-weight="bold"
          >
            BW = {{ formatFrequency(bandwidth) }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">📚 Understanding Bandwidth and Q Factor</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-blue-400 font-semibold mb-2">What is Bandwidth?</h3>
            <p class="text-gray-300 text-sm">
              Bandwidth (BW) is the range of frequencies over which the circuit response is within -3dB 
              of the maximum value. It determines how "selective" the circuit is.
            </p>
            <div class="bg-gray-800 rounded p-3 mt-3 font-mono text-sm text-green-400">
              BW = f₂ - f₁ = f₀ / Q
            </div>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-green-400 font-semibold mb-2">Quality Factor (Q)</h3>
            <p class="text-gray-300 text-sm">
              Q measures the "sharpness" of resonance. Higher Q means a narrower bandwidth and more 
              selective filtering. Q depends on the circuit resistance.
            </p>
            <div class="bg-gray-800 rounded p-3 mt-3 font-mono text-sm text-blue-400">
              {{ circuitType === 'series' ? 'Q = ω₀L/R' : 'Q = R/(ω₀L)' }}
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-purple-400 font-semibold mb-2">-3dB Points</h3>
            <p class="text-gray-300 text-sm">
              The cutoff frequencies (f₁ and f₂) occur where the power is half the maximum value 
              (-3dB). These define the bandwidth edges.
            </p>
            <div class="bg-gray-800 rounded p-3 mt-3 font-mono text-sm text-orange-400">
              f₁,₂ = f₀ ∓ BW/2
            </div>
          </div>

          <div class="bg-gray-900 rounded-lg p-4">
            <h3 class="text-orange-400 font-semibold mb-2">Practical Applications</h3>
            <ul class="text-gray-300 text-sm space-y-1">
              <li>• <strong>Radio tuning:</strong> High Q for better station selectivity</li>
              <li>• <strong>Bandpass filters:</strong> Controlled Q for desired bandwidth</li>
              <li>• <strong>Oscillators:</strong> High Q for stable frequency</li>
              <li>• <strong>Audio systems:</strong> Moderate Q for natural sound</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-gray-900 rounded-lg p-4">
        <h3 class="text-white font-semibold mb-2">Interactive Learning Tips</h3>
        <ul class="text-gray-300 text-sm space-y-2">
          <li>🔹 <strong>Decrease R:</strong> Increases Q (series) or decreases Q (parallel) → narrows bandwidth</li>
          <li>🔹 <strong>Increase L or C:</strong> Changes f₀, affects Q and bandwidth differently</li>
          <li>🔹 <strong>Switch circuit type:</strong> Notice how Q changes with the same components</li>
          <li>🔹 <strong>Observe the curve:</strong> Sharper peaks mean higher Q and narrower bandwidth</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Component values
const inductance = ref(10)
const inductanceUnit = ref('mH')
const capacitance = ref(100)
const capacitanceUnit = ref('μF')
const resistance = ref(100)
const circuitType = ref<'series' | 'parallel'>('series')

// Convert to base units (H and F)
const inductanceBase = computed(() => {
  const unitMap: Record<string, number> = {
    'H': 1,
    'mH': 0.001,
    'μH': 0.000001
  }
  return inductance.value * (unitMap[inductanceUnit.value] || 1)
})

const capacitanceBase = computed(() => {
  const unitMap: Record<string, number> = {
    'F': 1,
    'μF': 0.000001,
    'nF': 0.000000001,
    'pF': 0.000000000001
  }
  return capacitance.value * (unitMap[capacitanceUnit.value] || 1)
})

// Calculate resonant frequency
const resonantFreq = computed(() => {
  const L = inductanceBase.value
  const C = capacitanceBase.value
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

// Calculate Q factor
const qualityFactor = computed(() => {
  const L = inductanceBase.value
  const R = resistance.value
  const omega = 2 * Math.PI * resonantFreq.value
  
  if (circuitType.value === 'series') {
    return (omega * L) / R
  } else {
    return R / (omega * L)
  }
})

// Calculate bandwidth
const bandwidth = computed(() => {
  return resonantFreq.value / qualityFactor.value
})

// Calculate -3dB frequencies
const f1 = computed(() => {
  return resonantFreq.value - bandwidth.value / 2
})

const f2 = computed(() => {
  return resonantFreq.value + bandwidth.value / 2
})

// Frequency range for plotting
const frequencyRange = computed(() => {
  const center = resonantFreq.value
  const range = center * 0.1
  const frequencies: number[] = []
  for (let i = 0; i <= 12; i++) {
    frequencies.push(center - range + (i * range * 2) / 12)
  }
  return frequencies
})

// Calculate frequency response for plotting
const frequencyResponsePath = computed(() => {
  const points: string[] = []
  const centerFreq = resonantFreq.value
  const Q = qualityFactor.value
  
  for (let i = 0; i <= 100; i++) {
    const freq = centerFreq * (0.5 + (i * 1.5) / 100)
    const x = 60 + (i / 100) * 700
    
    // Calculate gain in dB
    const ratio = freq / centerFreq
    let gain: number
    
    if (circuitType.value === 'series') {
      // Series RLC: impedance is minimum at resonance
      const zResonance = resistance.value
      const zAtFreq = Math.sqrt(
        Math.pow(resistance.value, 2) +
        Math.pow(2 * Math.PI * freq * inductanceBase.value - 1 / (2 * Math.PI * freq * capacitanceBase.value), 2)
      )
      gain = 20 * Math.log10(zResonance / zAtFreq)
    } else {
      // Parallel RLC: impedance is maximum at resonance
      const zResonance = resistance.value
      const xl = 2 * Math.PI * freq * inductanceBase.value
      const xc = 1 / (2 * Math.PI * freq * capacitanceBase.value)
      const xlMinusXc = xl - xc
      const zAtFreq = (resistance.value * xlMinusXc) / Math.sqrt(Math.pow(xlMinusXc, 2) + Math.pow(resistance.value, 2))
      const impedance = Math.sqrt(Math.pow(xlMinusXc, 2) + Math.pow(zAtFreq, 2))
      gain = 20 * Math.log10(impedance / zResonance)
    }
    
    // Normalize to fit the graph (0dB at top, -24dB at bottom)
    const y = 55 + Math.max(0, Math.min(24, -gain)) / 24 * 290
    
    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }
  
  return points.join(' ')
})

// Peak point coordinates
const peakX = computed(() => 410)
const peakY = computed(() => 55)

// -3dB point coordinates
const f1X = computed(() => {
  const ratio = (f1.value - resonantFreq.value * 0.5) / (resonantFreq.value * 1.5 - resonantFreq.value * 0.5)
  return 60 + ratio * 700
})

const f1Y = computed(() => 55 + (3 / 24) * 290)

const f2X = computed(() => {
  const ratio = (f2.value - resonantFreq.value * 0.5) / (resonantFreq.value * 1.5 - resonantFreq.value * 0.5)
  return 60 + ratio * 700
})

const f2Y = computed(() => 55 + (3 / 24) * 290)

const bandwidthY = computed(() => 55 + (3 / 24) * 290 + 20)

// Helper functions
function formatFrequency(freq: number): string {
  if (freq >= 1000000) {
    return (freq / 1000000).toFixed(2) + ' MHz'
  } else if (freq >= 1000) {
    return (freq / 1000).toFixed(2) + ' kHz'
  } else if (freq >= 1) {
    return freq.toFixed(2) + ' Hz'
  } else {
    return (freq * 1000).toFixed(2) + ' mHz'
  }
}

function getQFactorColor(): string {
  const q = qualityFactor.value
  if (q < 5) return 'text-red-400'
  if (q < 20) return 'text-orange-400'
  if (q < 50) return 'text-yellow-400'
  if (q < 100) return 'text-green-400'
  return 'text-blue-400'
}

function getQFactorDescription(): string {
  const q = qualityFactor.value
  if (q < 5) return 'Very low Q - very wide bandwidth, poor selectivity'
  if (q < 20) return 'Low Q - wide bandwidth, used in broadband applications'
  if (q < 50) return 'Moderate Q - balanced response, good for audio'
  if (q < 100) return 'High Q - narrow bandwidth, good selectivity'
  return 'Very high Q - extremely narrow bandwidth, highly selective'
}

function getSelectivityBarColor(): string {
  const q = qualityFactor.value
  if (q < 5) return 'bg-red-500'
  if (q < 20) return 'bg-orange-500'
  if (q < 50) return 'bg-yellow-500'
  if (q < 100) return 'bg-green-500'
  return 'bg-blue-500'
}

function getSelectivityDescription(): string {
  const q = qualityFactor.value
  if (q < 5) return 'Low selectivity'
  if (q < 20) return 'Moderate-low selectivity'
  if (q < 50) return 'Moderate selectivity'
  if (q < 100) return 'High selectivity'
  return 'Very high selectivity'
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Wien Bridge Oscillator</h2>
    
    <!-- Control Panel -->
    <div class="space-y-6">
      <!-- Frequency Control -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target Frequency: {{ frequency }} Hz
        </label>
        <input
          v-model.number="frequency"
          type="range"
          min="20"
          max="20000"
          step="10"
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>20 Hz</span>
          <span>{{ frequency }} Hz</span>
          <span>20 kHz</span>
        </div>
      </div>

      <!-- Component Selection -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Capacitor (C)
          </label>
          <select
            v-model="capacitance"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="1e-9">1 nF</option>
            <option value="10e-9">10 nF</option>
            <option value="100e-9">100 nF</option>
            <option value="1e-6">1 μF</option>
            <option value="10e-6">10 μF</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resistor R (R1 = R2 = R)
          </label>
          <div class="flex items-center gap-2">
            <input
              :value="resistorR"
              type="number"
              readonly
              class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
            />
            <span class="text-sm text-gray-500 dark:text-gray-400">Ω</span>
          </div>
        </div>
      </div>

      <!-- Feedback Ratio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Feedback Ratio (R4/R3): {{ feedbackRatio.toFixed(2) }}
        </label>
        <input
          v-model.number="feedbackRatio"
          type="range"
          min="1.5"
          max="3.5"
          step="0.01"
          class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1.5</span>
          <span>2.0 (Ideal)</span>
          <span>3.5</span>
        </div>
      </div>

      <!-- Oscillation Status -->
      <div class="bg-gradient-to-br rounded-xl p-6" :class="oscillationStatus.class">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Oscillation Status</h3>
        <div class="flex items-center gap-3">
          <div class="text-3xl">{{ oscillationStatus.icon }}</div>
          <div>
            <p class="font-semibold text-gray-900 dark:text-white">{{ oscillationStatus.text }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ oscillationStatus.description }}</p>
          </div>
        </div>
      </div>

      <!-- Circuit Parameters -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">R Value</div>
          <div class="font-mono font-bold text-gray-900 dark:text-white">{{ formatResistance(resistorR) }}</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">C Value</div>
          <div class="font-mono font-bold text-gray-900 dark:text-white">{{ formatCapacitance(capacitance) }}</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Resonant Freq</div>
          <div class="font-mono font-bold text-primary">{{ resonantFrequency.toFixed(2) }} Hz</div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Gain Needed</div>
          <div class="font-mono font-bold text-gray-900 dark:text-white">≥ 3.0</div>
        </div>
      </div>

      <!-- Presets -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick Presets
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            @click="setPreset(1000, 10e-9, 2.0)"
            class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
          >
            1 kHz
          </button>
          <button
            @click="setPreset(440, 10e-9, 2.0)"
            class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
          >
            440 Hz
          </button>
          <button
            @click="setPreset(10000, 1e-9, 2.0)"
            class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium"
          >
            10 kHz
          </button>
          <button
            @click="setPreset(60, 100e-9, 2.0)"
            class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium"
          >
            60 Hz
          </button>
        </div>
      </div>
    </div>

    <!-- Output Waveform Visualization -->
    <div class="mt-8 bg-white dark:bg-gray-700 rounded-xl p-6">
      <h3 class="text-md font-bold text-gray-900 dark:text-white mb-4">Output Waveform</h3>
      <svg viewBox="0 0 400 150" class="w-full">
        <!-- Grid -->
        <defs>
          <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="150" fill="url(#grid)" />
        
        <!-- Axis -->
        <line x1="0" y1="75" x2="400" y2="75" stroke="#9CA3AF" stroke-width="1"/>
        
        <!-- Sine wave -->
        <path
          :d="generateSineWave()"
          fill="none"
          :stroke="oscillationStatus.color"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        
        <!-- Amplitude labels -->
        <text x="5" y="15" class="text-xs" fill="#6B7280">+V</text>
        <text x="5" y="145" class="text-xs" fill="#6B7280">-V</text>
        <text x="5" y="78" class="text-xs" fill="#6B7280">0</text>
        
        <!-- Frequency label -->
        <text x="350" y="140" class="text-xs font-bold" :fill="oscillationStatus.color">
          {{ formatFrequency(resonantFrequency) }}
        </text>
      </svg>
    </div>

    <!-- Circuit Diagram -->
    <div class="mt-8 bg-white dark:bg-gray-700 rounded-xl p-6">
      <h3 class="text-md font-bold text-gray-900 dark:text-white mb-4">Wien Bridge Circuit</h3>
      <svg viewBox="0 0 400 200" class="w-full max-w-2xl mx-auto">
        <!-- Op-Amp triangle -->
        <polygon points="180,80 180,140 240,110" fill="white" stroke="#7C3AED" stroke-width="2.5"/>
        <text x="185" y="105" class="text-xs font-bold" fill="#7C3AED">-</text>
        <text x="185" y="125" class="text-xs font-bold" fill="#7C3AED">+</text>
        
        <!-- Wien bridge feedback network -->
        <!-- Series RC (top) -->
        <line x1="80" y1="95" x2="120" y2="95" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="160" y1="95" x2="180" y2="95" stroke="#9CA3AF" stroke-width="2"/>
        
        <!-- R1 -->
        <rect x="120" y="92" width="40" height="6" fill="white" stroke="#0891B2" stroke-width="2" rx="1"/>
        <text x="140" y="85" text-anchor="middle" class="text-xs" fill="#0891B2">R1</text>
        
        <!-- C1 -->
        <line x1="120" y1="95" x2="120" y2="105" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="160" y1="95" x2="160" y2="105" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="120" y1="105" x2="120" y2="115" stroke="#7C3AED" stroke-width="2"/>
        <line x1="160" y1="105" x2="160" y2="115" stroke="#7C3AED" stroke-width="2"/>
        <text x="140" y="128" text-anchor="middle" class="text-xs" fill="#7C3AED">C1</text>
        
        <!-- Connection to op-amp -->
        <line x1="140" y1="95" x2="140" y2="80" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="140" y1="80" x2="180" y2="80" stroke="#9CA3AF" stroke-width="2"/>
        
        <!-- Parallel RC (bottom) -->
        <line x1="80" y1="125" x2="100" y2="125" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="100" y1="125" x2="100" y2="105" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="180" y1="125" x2="100" y2="125" stroke="#9CA3AF" stroke-width="2"/>
        
        <!-- R2 -->
        <rect x="100" y="122" width="40" height="6" fill="white" stroke="#0891B2" stroke-width="2" rx="1"/>
        <text x="120" y="145" text-anchor="middle" class="text-xs" fill="#0891B2">R2</text>
        
        <!-- C2 -->
        <line x1="110" y1="125" x2="110" y2="140" stroke="#7C3AED" stroke-width="2"/>
        <line x1="170" y1="125" x2="170" y2="140" stroke="#7C3AED" stroke-width="2"/>
        <text x="140" y="155" text-anchor="middle" class="text-xs" fill="#7C3AED">C2</text>
        
        <!-- Connection to op-amp -->
        <line x1="140" y1="125" x2="140" y2="140" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="140" y1="140" x2="180" y2="140" stroke="#9CA3AF" stroke-width="2"/>
        
        <!-- Gain setting resistors -->
        <!-- R3 -->
        <line x1="80" y1="110" x2="180" y2="110" stroke="#9CA3AF" stroke-width="2"/>
        <rect x="120" y="107" width="30" height="6" fill="white" stroke="#EC4899" stroke-width="2" rx="1"/>
        <text x="135" y="100" text-anchor="middle" class="text-xs" fill="#EC4899">R3</text>
        
        <!-- R4 (feedback) -->
        <line x1="240" y1="110" x2="320" y2="110" stroke="#9CA3AF" stroke-width="2"/>
        <rect x="260" y="107" width="40" height="6" fill="white" stroke="#10B981" stroke-width="2" rx="1"/>
        <text x="280" y="100" text-anchor="middle" class="text-xs" fill="#10B981">R4</text>
        
        <!-- Output -->
        <line x1="320" y1="110" x2="360" y2="110" stroke="#9CA3AF" stroke-width="2"/>
        <circle cx="365" cy="110" r="5" fill="none" stroke="#7C3AED" stroke-width="2"/>
        <text x="365" y="95" text-anchor="middle" class="text-xs font-bold" fill="#7C3AED">Vout</text>
        
        <!-- Ground -->
        <line x1="80" y1="110" x2="80" y2="160" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="70" y1="160" x2="90" y2="160" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="75" y1="165" x2="85" y2="165" stroke="#9CA3AF" stroke-width="2"/>
        <line x1="78" y1="170" x2="82" y2="170" stroke="#9CA3AF" stroke-width="2"/>
      </svg>
    </div>

    <!-- Bode Plot -->
    <div class="mt-8 bg-white dark:bg-gray-700 rounded-xl p-6">
      <h3 class="text-md font-bold text-gray-900 dark:text-white mb-4">Frequency Response (Bode Plot)</h3>
      <svg viewBox="0 0 400 200" class="w-full">
        <!-- Grid -->
        <defs>
          <pattern id="bodeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#bodeGrid)" />
        
        <!-- Axis -->
        <line x1="40" y1="180" x2="400" y2="180" stroke="#9CA3AF" stroke-width="1.5"/>
        <line x1="40" y1="20" x2="40" y2="180" stroke="#9CA3AF" stroke-width="1.5"/>
        
        <!-- Frequency labels (log scale) -->
        <text x="60" y="195" class="text-xs" fill="#6B7280">10 Hz</text>
        <text x="140" y="195" class="text-xs" fill="#6B7280">100 Hz</text>
        <text x="240" y="195" class="text-xs" fill="#6B7280">1 kHz</text>
        <text x="340" y="195" class="text-xs" fill="#6B7280">10 kHz</text>
        
        <!-- Gain labels -->
        <text x="10" y="100" class="text-xs" fill="#6B7280" transform="rotate(-90, 10, 100)">Gain (dB)</text>
        
        <!-- Response curve -->
        <path
          :d="generateBodePlot()"
          fill="none"
          stroke="#7C3AED"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        
        <!-- Resonant frequency marker -->
        <line :x1="getBodeX(resonantFrequency)" y1="20" :x2="getBodeX(resonantFrequency)" y2="180" 
              stroke="#EF4444" stroke-width="1.5" stroke-dasharray="5,5"/>
        <circle :cx="getBodeX(resonantFrequency)" :cy="getBodeY(0)" r="5" fill="#EF4444"/>
        <text :x="getBodeX(resonantFrequency)" y="15" text-anchor="middle" class="text-xs font-bold" fill="#EF4444">
          fo
        </text>
      </svg>
    </div>

    <!-- Educational Info -->
    <div class="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 How Wien Bridge Oscillator Works</h3>
      <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <strong class="text-primary">Resonant Frequency:</strong> fo = 1/(2πRC) — At this frequency, the Wien bridge network 
          provides a feedback ratio of exactly 1/3 with zero phase shift.
        </p>
        <p>
          <strong class="text-primary">Barkhausen Criterion:</strong> For oscillation to start and sustain, the loop gain must be 
          ≥ 1. This means the op-amp gain (1 + R4/R3) must be ≥ 3.
        </p>
        <p>
          <strong class="text-primary">Gain Control:</strong> The feedback ratio R4/R3 sets the amplifier gain. At exactly 3.0, 
          oscillations are stable. Below 3.0, oscillations die out. Above 3.0, amplitude grows until clipping.
        </p>
        <p>
          <strong class="text-primary">Stability:</strong> In practice, a nonlinear element (lamp, thermistor, or diode) is used 
          to automatically adjust R4 and maintain stable output amplitude.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Input parameters
const frequency = ref(1000)
const capacitance = ref(10e-9) // 10 nF
const feedbackRatio = ref(2.0)

// Calculate resistor value for target frequency
// f = 1/(2πRC) → R = 1/(2πfC)
const resistorR = computed(() => {
  return 1 / (2 * Math.PI * frequency.value * capacitance.value)
})

// Calculate actual resonant frequency
const resonantFrequency = computed(() => {
  return 1 / (2 * Math.PI * resistorR.value * capacitance.value)
})

// Oscillation status
const oscillationStatus = computed(() => {
  const ratio = feedbackRatio.value
  if (ratio < 1.99) {
    return {
      icon: '❌',
      text: 'No Oscillation',
      description: 'Gain too low. Increase feedback ratio to ≥ 2.0',
      class: 'bg-red-100 dark:bg-red-900/30',
      color: '#EF4444'
    }
  } else if (ratio <= 2.01) {
    return {
      icon: '✅',
      text: 'Stable Oscillation',
      description: 'Perfect! Gain is ideal for clean sine wave output',
      class: 'bg-green-100 dark:bg-green-900/30',
      color: '#10B981'
    }
  } else if (ratio <= 2.5) {
    return {
      icon: '⚠️',
      text: 'Growing Oscillation',
      description: 'Gain slightly high. Output amplitude may increase',
      class: 'bg-yellow-100 dark:bg-yellow-900/30',
      color: '#F59E0B'
    }
  } else {
    return {
      icon: '🔴',
      text: 'Clipping / Distortion',
      description: 'Gain too high! Output will be distorted/square wave',
      class: 'bg-red-100 dark:bg-red-900/30',
      color: '#EF4444'
    }
  }
})

// Format functions
function formatResistance(ohms) {
  if (ohms < 1000) return `${ohms.toFixed(1)} Ω`
  if (ohms < 1e6) return `${(ohms / 1000).toFixed(2)} kΩ`
  return `${(ohms / 1e6).toFixed(2)} MΩ`
}

function formatCapacitance(farads) {
  if (farads < 1e-9) return `${(farads * 1e12).toFixed(1)} pF`
  if (farads < 1e-6) return `${(farads * 1e9).toFixed(1)} nF`
  if (farads < 1e-3) return `${(farads * 1e6).toFixed(1)} μF`
  return `${farads.toFixed(3)} F`
}

function formatFrequency(hz) {
  if (hz < 1000) return `${hz.toFixed(1)} Hz`
  return `${(hz / 1000).toFixed(2)} kHz`
}

// Generate sine wave path
function generateSineWave() {
  const amplitude = 50
  const centerY = 75
  const freq = 0.05
  let path = 'M'
  
  for (let x = 0; x <= 400; x += 2) {
    const y = centerY - amplitude * Math.sin(x * freq)
    path += ` ${x},${y}`
  }
  
  return path
}

// Generate Bode plot path
function generateBodePlot() {
  let path = 'M'
  
  for (let x = 60; x <= 380; x += 5) {
    const freq = getFrequencyFromX(x)
    const fo = resonantFrequency.value
    const ratio = freq / fo
    
    // Gain at frequency f: |H(jω)| = 1/3 / sqrt(1 + (f/fo - fo/f)²)
    // In dB: 20*log10(|H|)
    const gainLinear = (1/3) / Math.sqrt(1 + Math.pow(ratio - 1/ratio, 2))
    const gainDB = 20 * Math.log10(gainLinear)
    
    const y = getBodeY(gainDB)
    path += ` ${x},${y}`
  }
  
  return path
}

function getFrequencyFromX(x) {
  // Log scale mapping: 60→10Hz, 140→100Hz, 240→1kHz, 340→10kHz
  const minX = 60
  const maxX = 380
  const minF = Math.log10(10)
  const maxF = Math.log10(100000)
  
  const logF = minF + (x - minX) / (maxX - minX) * (maxF - minF)
  return Math.pow(10, logF)
}

function getBodeX(freq) {
  const minX = 60
  const maxX = 380
  const minF = Math.log10(10)
  const maxF = Math.log10(100000)
  
  const logF = Math.log10(freq)
  return minX + (logF - minF) / (maxF - minF) * (maxX - minX)
}

function getBodeY(gainDB) {
  // Map -40dB to 0dB → 180 to 20
  return 180 - (gainDB + 40) / 40 * 160
}

// Preset function
function setPreset(freq, cap, feedback) {
  frequency.value = freq
  capacitance.value = cap
  feedbackRatio.value = feedback
}
</script>

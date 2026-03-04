<script setup lang="ts">
import { ref, computed } from 'vue'

// Input parameters
const resistance = ref(1000) // Ohms
const capacitance = ref(100) // nanofarads
const inputFrequency = ref(1000) // Hz

// Calculate cutoff frequency
const cutoffFrequency = computed(() => {
  const r = resistance.value
  const c = capacitance.value * 1e-9 // Convert nF to F
  const fc = 1 / (2 * Math.PI * r * c)
  return fc
})

// Calculate reactance
const capacitiveReactance = computed(() => {
  const c = capacitance.value * 1e-9
  const f = inputFrequency.value
  const xc = 1 / (2 * Math.PI * f * c)
  return xc
})

// Calculate impedance
const impedance = computed(() => {
  const r = resistance.value
  const xc = capacitiveReactance.value
  const z = Math.sqrt(r * r + xc * xc)
  return z
})

// Calculate gain (magnitude)
const gain = computed(() => {
  const r = resistance.value
  const z = impedance.value
  const g = r / z
  return g
})

// Gain in dB
const gainDb = computed(() => {
  return 20 * Math.log10(gain.value)
})

// Calculate phase shift
const phaseShift = computed(() => {
  const xc = capacitiveReactance.value
  const r = resistance.value
  const phase = Math.atan(xc / r) * (180 / Math.PI)
  return phase
})

// Calculate output voltage (assuming 1V input)
const outputVoltage = computed(() => {
  return gain.value // For 1V input
})

// Calculate attenuation percentage
const attenuation = computed(() => {
  return (1 - gain.value) * 100
})

// Frequency ratio relative to cutoff
const frequencyRatio = computed(() => {
  return inputFrequency.value / cutoffFrequency.value
})

// Filter response characteristics
const filterType = computed(() => {
  const ratio = frequencyRatio.value
  if (ratio > 10) return 'Pass Band (Minimal Attenuation)'
  if (ratio > 1) return 'Transition Band'
  if (ratio > 0.1) return 'Cutoff Region (-3dB point)'
  return 'Stop Band (High Attenuation)'
})

const filterColor = computed(() => {
  const ratio = frequencyRatio.value
  if (ratio > 10) return 'text-green-400'
  if (ratio > 1) return 'text-blue-400'
  if (ratio > 0.1) return 'text-amber-400'
  return 'text-red-400'
})

// Bode plot data points
const bodeData = computed(() => {
  const points = []
  const fc = cutoffFrequency.value
  const r = resistance.value
  const c = capacitance.value * 1e-9
  
  for (let i = -2; i <= 3; i += 0.1) {
    const freq = fc * Math.pow(10, i)
    const xc = 1 / (2 * Math.PI * freq * c)
    const z = Math.sqrt(r * r + xc * xc)
    const g = r / z
    const gdb = 20 * Math.log10(g)
    points.push({ freq, gain: gdb })
  }
  
  return points
})

// Quick presets
function setPreset(type: string) {
  switch(type) {
    case 'audio-tweeter':
      resistance.value = 8000
      capacitance.value = 2000 // 2μF
      inputFrequency.value = 5000
      break
    case 'coupling-stage':
      resistance.value = 10000
      capacitance.value = 100 // 100nF
      inputFrequency.value = 1000
      break
    case 'bass-block':
      resistance.value = 100
      capacitance.value = 47000 // 47μF
      inputFrequency.value = 200
      break
    case 'dc-block':
      resistance.value = 1000
      capacitance.value = 100 // 100nF
      inputFrequency.value = 100
      break
    case 'voice-freq':
      resistance.value = 600
      capacitance.value = 270 // 270nF
      inputFrequency.value = 3000
      break
    case 'instrument-level':
      resistance.value = 4700
      capacitance.value = 220 // 220nF
      inputFrequency.value = 2000
      break
  }
}

function formatFrequency(freq: number): string {
  if (freq >= 1000000) {
    return `${(freq / 1000000).toFixed(2)} MHz`
  } else if (freq >= 1000) {
    return `${(freq / 1000).toFixed(2)} kHz`
  }
  return `${freq.toFixed(2)} Hz`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          RC High-Pass Filter Calculator
        </h1>
        <p class="text-lg text-gray-300 max-w-3xl mx-auto">
          Design and analyze first-order RC high-pass filters for coupling and audio applications
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Input Controls -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-bold text-blue-400 mb-4">Component Values</h2>
          
          <!-- Resistance -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Resistance (R): {{ resistance }}Ω
            </label>
            <input 
              type="range" 
              v-model.number="resistance" 
              min="100" 
              max="100000" 
              step="100"
              class="w-full accent-blue-500"
            >
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>100Ω</span>
              <span>100kΩ</span>
            </div>
          </div>
          
          <!-- Capacitance -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Capacitance (C): {{ capacitance }} nF
            </label>
            <input 
              type="range" 
              v-model.number="capacitance" 
              min="1" 
              max="100000" 
              step="1"
              class="w-full accent-cyan-500"
            >
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 nF</span>
              <span>100 μF</span>
            </div>
          </div>
          
          <!-- Input Frequency -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Input Frequency: {{ formatFrequency(inputFrequency) }}
            </label>
            <input 
              type="range" 
              v-model.number="inputFrequency" 
              min="10" 
              max="100000" 
              step="10"
              class="w-full accent-purple-500"
            >
            <div class="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 Hz</span>
              <span>100 kHz</span>
            </div>
          </div>
          
          <!-- Quick Presets -->
          <div>
            <h3 class="text-sm font-medium text-gray-300 mb-2">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="setPreset('audio-tweeter')"
                class="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-xs font-medium"
              >
                🎵 Audio Tweeter
              </button>
              <button 
                @click="setPreset('coupling-stage')"
                class="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition text-xs font-medium"
              >
                🔌 Coupling Stage
              </button>
              <button 
                @click="setPreset('bass-block')"
                class="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-xs font-medium"
              >
                🔊 Bass Block
              </button>
              <button 
                @click="setPreset('dc-block')"
                class="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-xs font-medium"
              >
                ⚡ DC Block
              </button>
              <button 
                @click="setPreset('voice-freq')"
                class="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 transition text-xs font-medium"
              >
                📞 Voice Freq
              </button>
              <button 
                @click="setPreset('instrument-level')"
                class="px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition text-xs font-medium"
              >
                🎸 Instrument
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-bold text-cyan-400 mb-4">Filter Response</h2>
          
          <!-- Cutoff Frequency -->
          <div class="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Cutoff Frequency (fc)</h3>
            <p class="text-3xl font-bold text-green-400">
              {{ formatFrequency(cutoffFrequency) }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              f<sub>c</sub> = 1 / (2π × R × C)
            </p>
          </div>
          
          <!-- Current Frequency Ratio -->
          <div class="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Frequency Ratio</h3>
            <p class="text-2xl font-bold" :class="filterColor">
              {{ frequencyRatio.toFixed(2) }} × fc
            </p>
            <p class="text-sm" :class="filterColor">
              {{ filterType }}
            </p>
          </div>
          
          <!-- Gain -->
          <div class="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Gain</h3>
            <p class="text-3xl font-bold text-blue-400">
              {{ gain.toFixed(3) }}×
            </p>
            <p class="text-lg text-purple-400">
              {{ gainDb.toFixed(1) }} dB
            </p>
          </div>
          
          <!-- Output Voltage -->
          <div class="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Output Voltage (1V input)</h3>
            <p class="text-3xl font-bold text-cyan-400">
              {{ outputVoltage.toFixed(3) }}V
            </p>
          </div>
          
          <!-- Phase Shift -->
          <div class="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Phase Shift</h3>
            <p class="text-3xl font-bold text-amber-400">
              {{ phaseShift.toFixed(1) }}°
            </p>
            <p class="text-xs text-gray-500 mt-1">
              φ = arctan(X<sub>C</sub> / R)
            </p>
          </div>
          
          <!-- Attenuation -->
          <div class="bg-slate-900/50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-400 mb-1">Attenuation</h3>
            <p class="text-2xl font-bold" :class="attenuation > 50 ? 'text-red-400' : 'text-green-400'">
              {{ attenuation.toFixed(1) }}%
            </p>
          </div>
        </div>

        <!-- Circuit Visualization -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-bold text-purple-400 mb-4">Circuit Diagram</h2>
          
          <!-- SVG Circuit Diagram -->
          <div class="bg-slate-900 rounded-lg p-4 mb-4">
            <svg viewBox="0 0 400 300" class="w-full h-auto">
              <!-- Background -->
              <rect width="400" height="300" fill="#0f172a"/>
              
              <!-- Input Label -->
              <text x="50" y="150" fill="#94a3b8" font-size="14" text-anchor="middle">Vin</text>
              
              <!-- Input terminal -->
              <circle cx="70" cy="150" r="5" fill="#ef4444"/>
              
              <!-- Input wire to capacitor -->
              <line x1="75" y1="150" x2="140" y2="150" stroke="#3b82f6" stroke-width="3"/>
              
              <!-- Capacitor symbol -->
              <line x1="140" y1="120" x2="140" y2="180" stroke="#22d3ee" stroke-width="3"/>
              <line x1="160" y1="120" x2="160" y2="180" stroke="#22d3ee" stroke-width="3"/>
              
              <!-- Wire to output junction -->
              <line x1="160" y1="150" x2="220" y2="150" stroke="#3b82f6" stroke-width="3"/>
              
              <!-- Resistor symbol (vertical) -->
              <line x1="220" y1="150" x2="220" y2="170" stroke="#3b82f6" stroke-width="3"/>
              <polyline 
                points="220,170 210,175 230,185 210,195 230,205 210,215 230,225 220,230" 
                fill="none" 
                stroke="#f59e0b" 
                stroke-width="3"
              />
              <line x1="220" y1="230" x2="220" y2="250" stroke="#3b82f6" stroke-width="3"/>
              
              <!-- Ground connection -->
              <line x1="220" y1="250" x2="250" y2="250" stroke="#6b7280" stroke-width="2"/>
              <line x1="230" y1="255" x2="240" y2="255" stroke="#6b7280" stroke-width="2"/>
              <line x1="233" y1="260" x2="237" y2="260" stroke="#6b7280" stroke-width="2"/>
              
              <!-- Output terminal -->
              <circle cx="330" cy="150" r="5" fill="#10b981"/>
              
              <!-- Output wire -->
              <line x1="220" y1="150" x2="325" y2="150" stroke="#3b82f6" stroke-width="3"/>
              
              <!-- Output Label -->
              <text x="350" y="150" fill="#94a3b8" font-size="14" text-anchor="middle">Vout</text>
              
              <!-- Component Labels -->
              <text x="150" y="200" fill="#22d3ee" font-size="16" text-anchor="middle" font-weight="bold">
                C
              </text>
              <text x="150" y="218" fill="#22d3ee" font-size="12" text-anchor="middle">
                {{ capacitance }}nF
              </text>
              
              <text x="260" y="190" fill="#f59e0b" font-size="16" text-anchor="middle" font-weight="bold">
                R
              </text>
              <text x="260" y="208" fill="#f59e0b" font-size="12" text-anchor="middle">
                {{ resistance }}Ω
              </text>
              
              <!-- Formula -->
              <text x="200" y="280" fill="#94a3b8" font-size="12" text-anchor="middle">
                fc = 1 / (2πRC) ≈ {{ formatFrequency(cutoffFrequency) }}
              </text>
            </svg>
          </div>
          
          <!-- Bode Plot Preview -->
          <h3 class="text-lg font-semibold text-purple-400 mb-2">Frequency Response</h3>
          <div class="bg-slate-900 rounded-lg p-4">
            <svg viewBox="0 0 400 200" class="w-full h-auto">
              <!-- Background -->
              <rect width="400" height="200" fill="#0f172a"/>
              
              <!-- Grid -->
              <g stroke="rgba(255,255,255,0.1)" stroke-width="1">
                <!-- Vertical lines -->
                <line x1="100" y1="20" x2="100" y2="170"/>
                <line x1="150" y1="20" x2="150" y2="170"/>
                <line x1="200" y1="20" x2="200" y2="170"/>
                <line x1="250" y1="20" x2="250" y2="170"/>
                <line x1="300" y1="20" x2="300" y2="170"/>
                <line x1="350" y1="20" x2="350" y2="170"/>
                
                <!-- Horizontal lines -->
                <line x1="50" y1="40" x2="380" y2="40"/>
                <line x1="50" y1="70" x2="380" y2="70"/>
                <line x1="50" y1="100" x2="380" y2="100"/>
                <line x1="50" y1="130" x2="380" y2="130"/>
              </g>
              
              <!-- Axes -->
              <line x1="50" y1="170" x2="380" y2="170" stroke="#94a3b8" stroke-width="2"/>
              <line x1="50" y1="170" x2="50" y2="20" stroke="#94a3b8" stroke-width="2"/>
              
              <!-- Y-axis labels (dB) -->
              <text x="40" y="45" fill="#94a3b8" font-size="10" text-anchor="end">0dB</text>
              <text x="40" y="75" fill="#94a3b8" font-size="10" text-anchor="end">-10dB</text>
              <text x="40" y="105" fill="#94a3b8" font-size="10" text-anchor="end">-20dB</text>
              <text x="40" y="135" fill="#94a3b8" font-size="10" text-anchor="end">-30dB</text>
              
              <!-- X-axis labels (Frequency) -->
              <text x="100" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">0.01fc</text>
              <text x="200" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">fc</text>
              <text x="300" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">100fc</text>
              
              <!-- Response curve -->
              <path 
                d="M 50 40 Q 100 40 120 45 T 150 55 T 200 95 T 250 130 T 300 145 T 380 150"
                fill="none" 
                stroke="#22d3ee" 
                stroke-width="3"
              />
              
              <!-- -3dB point marker -->
              <circle cx="200" cy="95" r="5" fill="#f59e0b"/>
              <text x="200" y="85" fill="#f59e0b" font-size="11" text-anchor="middle">-3dB</text>
              
              <!-- Current frequency marker -->
              <line 
                x1="50" 
                y1="40" 
                x2="380" 
                y2="40" 
                stroke="#ef4444" 
                stroke-width="2"
                stroke-dasharray="5,5"
                :opacity="gain > 0.1 ? 0.5 : 0"
              />
            </svg>
          </div>
          
          <!-- Component Values Summary -->
          <div class="mt-4 grid grid-cols-2 gap-2">
            <div class="bg-slate-900/50 p-3 rounded-lg">
              <p class="text-xs text-gray-400">Reactance (XC)</p>
              <p class="text-lg font-bold text-cyan-400">
                {{ capacitiveReactance.toFixed(1) }}Ω
              </p>
            </div>
            <div class="bg-slate-900/50 p-3 rounded-lg">
              <p class="text-xs text-gray-400">Impedance (Z)</p>
              <p class="text-lg font-bold text-purple-400">
                {{ impedance.toFixed(1) }}Ω
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
        <h2 class="text-2xl font-bold text-blue-400 mb-4">Understanding RC High-Pass Filters</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-cyan-400 mb-2">What is a High-Pass Filter?</h3>
            <p class="text-gray-300 mb-4">
              An RC high-pass filter allows high-frequency signals to pass through while attenuating low-frequency signals. It consists of a capacitor in series with the input and a resistor in parallel with the output (forming a voltage divider).
            </p>
            
            <h3 class="text-lg font-semibold text-cyan-400 mb-2">How It Works</h3>
            <ul class="list-disc list-inside text-gray-300 space-y-2">
              <li><strong class="text-blue-400">At High Frequencies:</strong> Capacitive reactance (X<sub>C</sub>) is low → capacitor acts like a short circuit → signal passes through</li>
              <li><strong class="text-blue-400">At Low Frequencies:</strong> Capacitive reactance is high → capacitor blocks signal → output is attenuated</li>
              <li><strong class="text-blue-400">At Cutoff (f<sub>c</sub>):</strong> X<sub>C</sub> = R → output is -3dB (70.7%) of input</li>
              <li><strong class="text-blue-400">DC Signal:</strong> Capacitor acts as open circuit → no output (DC blocking)</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-cyan-400 mb-2">Key Applications</h3>
            <div class="space-y-3">
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-400 mb-1">🔌 DC Blocking / AC Coupling</h4>
                <p class="text-sm text-gray-300">Remove DC offset from audio and signal paths while allowing AC signals to pass</p>
              </div>
              
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-400 mb-1">🎵 Audio Crossovers</h4>
                <p class="text-sm text-gray-300">Direct high frequencies to tweeters in speaker systems</p>
              </div>
              
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-400 mb-1">📡 RF Applications</h4>
                <p class="text-sm text-gray-300">Remove low-frequency noise and interference from RF signals</p>
              </div>
              
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-400 mb-1">🎸 Instrument Interfaces</h4>
                <p class="text-sm text-gray-300">Shape tone by removing unwanted low frequencies</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-cyan-400 mb-2">Key Formulas</h3>
          <div class="bg-slate-900/50 p-4 rounded-lg font-mono text-sm grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-green-400 mb-2">Cutoff Frequency:</p>
              <p class="text-gray-300">f<sub>c</sub> = 1 / (2π × R × C)</p>
              <p class="text-gray-400 text-xs mt-1">Where fc is in Hz, R in Ohms, C in Farads</p>
            </div>
            <div>
              <p class="text-green-400 mb-2">Capacitive Reactance:</p>
              <p class="text-gray-300">X<sub>C</sub> = 1 / (2π × f × C)</p>
            </div>
            <div>
              <p class="text-green-400 mb-2">Gain (Magnitude):</p>
              <p class="text-gray-300">Gain = R / √(R² + X<sub>C</sub>²)</p>
            </div>
            <div>
              <p class="text-green-400 mb-2">Phase Shift:</p>
              <p class="text-gray-300">φ = arctan(X<sub>C</sub> / R)</p>
              <p class="text-gray-400 text-xs mt-1">Positive phase shift (output leads input)</p>
            </div>
            <div>
              <p class="text-green-400 mb-2">Gain in Decibels:</p>
              <p class="text-gray-300">Gain<sub>dB</sub> = 20 × log₁₀(Gain)</p>
            </div>
            <div>
              <p class="text-green-400 mb-2">Impedance:</p>
              <p class="text-gray-300">Z = √(R² + X<sub>C</sub>²)</p>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-cyan-400 mb-2">Design Tips</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-amber-400 mb-2">🎯 Choose f<sub>c</sub> Based on Application</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Audio coupling: 10-100 Hz</li>
                <li>• Tweeter crossover: 2-5 kHz</li>
                <li>• RF coupling: 1-10 MHz</li>
              </ul>
            </div>
            
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-amber-400 mb-2">⚖️ R and C Trade-offs</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Larger R = less loading</li>
                <li>• Larger C = lower impedance</li>
                <li>• Keep product R×C constant</li>
              </ul>
            </div>
            
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-amber-400 mb-2">⚠️ Practical Considerations</h4>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Use NP0/C0G capacitors for stability</li>
                <li>• Consider source/load impedance</li>
                <li>• ESR affects performance at low frequencies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

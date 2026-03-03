<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Diode Clamper Circuit</h1>
      <p class="text-gray-400">Interactive exploration of DC level shifting circuits</p>
    </div>

    <!-- Main Controls -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Clamper Type -->
        <div>
          <label class="text-white font-medium mb-2 block">Clamper Type</label>
          <select 
            v-model="clamperType" 
            class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="positive">Positive Clamper</option>
            <option value="negative">Negative Clamper</option>
          </select>
        </div>

        <!-- Input Amplitude -->
        <div>
          <label class="text-white font-medium mb-2 block">Input Amplitude (V<sub>p</sub>)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="amplitude"
              type="range"
              min="1"
              max="20"
              step="0.5"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ amplitude }}V</span>
          </div>
        </div>

        <!-- Frequency -->
        <div>
          <label class="text-white font-medium mb-2 block">Frequency (Hz)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="frequency"
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ frequency }}Hz</span>
          </div>
        </div>

        <!-- DC Bias -->
        <div>
          <label class="text-white font-medium mb-2 block">DC Bias (V)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="dcBias"
              type="range"
              min="-5"
              max="5"
              step="0.5"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ dcBias }}V</span>
          </div>
        </div>

        <!-- Capacitance -->
        <div>
          <label class="text-white font-medium mb-2 block">Capacitance (µF)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="capacitance"
              type="range"
              min="0.1"
              max="100"
              step="0.1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ capacitance }}µF</span>
          </div>
        </div>

        <!-- Load Resistance -->
        <div>
          <label class="text-white font-medium mb-2 block">Load Resistance (kΩ)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="loadResistance"
              type="range"
              min="1"
              max="100"
              step="1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ loadResistance }}kΩ</span>
          </div>
        </div>

        <!-- Diode Type -->
        <div>
          <label class="text-white font-medium mb-2 block">Diode Type</label>
          <select 
            v-model="diodeType" 
            class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="silicon">Silicon (0.7V)</option>
            <option value="schottky">Schottky (0.3V)</option>
            <option value="germanium">Germanium (0.3V)</option>
            <option value="ideal">Ideal (0V)</option>
          </select>
        </div>

        <!-- Animation Speed -->
        <div>
          <label class="text-white font-medium mb-2 block">Animation Speed</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="animationSpeed"
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-16 text-right">{{ animationSpeed }}×</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram and Waveforms -->
    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      
      <!-- Circuit Diagram -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Circuit Diagram
        </h3>
        
        <div class="bg-gray-900 rounded-lg p-4">
          <svg viewBox="0 0 500 300" class="w-full h-auto">
            <!-- Background -->
            <rect width="500" height="300" fill="#1a1a2e"/>
            
            <!-- Grid -->
            <defs>
              <pattern id="circuitGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="500" height="300" fill="url(#circuitGrid)"/>
            
            <!-- Title -->
            <text x="250" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#e0e0e0">
              {{ clamperType === 'positive' ? 'Positive Clamper' : 'Negative Clamper' }}
            </text>
            
            <!-- Input Terminal -->
            <text x="60" y="65" text-anchor="middle" font-size="12" fill="#4ade80">Input</text>
            <circle cx="60" cy="80" r="8" fill="none" stroke="#4ade80" stroke-width="2"/>
            
            <!-- Capacitor -->
            <g transform="translate(100, 70)">
              <line x1="0" y1="10" x2="0" y2="40" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="-15" y1="40" x2="15" y2="40" stroke="#9fa8da" stroke-width="3"/>
              <line x1="-15" y1="50" x2="15" y2="50" stroke="#9fa8da" stroke-width="3"/>
              <line x1="0" y1="50" x2="0" y2="80" stroke="#e0e0e0" stroke-width="2"/>
              <text x="35" y="48" font-size="11" fill="#9fa8da">C</text>
              <text x="35" y="60" font-size="10" fill="#9fa8da">{{ capacitance }}µF</text>
            </g>
            
            <!-- Diode (orientation based on clamper type) -->
            <g transform="translate(100, 150)">
              <line x1="0" y1="0" x2="0" y2="30" stroke="#e0e0e0" stroke-width="2"/>
              
              <!-- Diode symbol -->
              <g transform="translate(-15, 30)">
                <polygon :points="clamperType === 'positive' ? '15,0 30,10 15,20' : '15,0 0,10 15,20'" 
                  fill="#22c55e" stroke="#22c55e" stroke-width="2"/>
                <line x1="0" y1="0" x2="0" y2="20" :stroke="clamperType === 'positive' ? '#22c55e' : '#ef4444'" 
                  stroke-width="3" transform="translate(15, 0)"/>
                <line x1="0" y1="0" x2="0" y2="20" :stroke="clamperType === 'positive' ? '#22c55e' : '#ef4444'" 
                  stroke-width="3" transform="translate(30, 0)"/>
              </g>
              
              <line x1="0" y1="50" x2="0" y2="80" stroke="#e0e0e0" stroke-width="2"/>
              <text x="35" y="48" font-size="11" fill="#22c55e">D</text>
              <text x="35" y="60" font-size="10" fill="#22c55e">{{ getDiodeVoltageDrop() }}V</text>
            </g>
            
            <!-- Resistor (Load) -->
            <g transform="translate(100, 230)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#e0e0e0" stroke-width="2"/>
              <!-- Zigzag resistor -->
              <polyline points="0,20 0,25 -5,28 5,31 -5,34 5,37 -5,40 5,43 0,46 0,50" 
                fill="none" stroke="#f59e0b" stroke-width="2"/>
              <line x1="0" y1="50" x2="0" y2="70" stroke="#e0e0e0" stroke-width="2"/>
              <text x="35" y="40" font-size="11" fill="#f59e0b">R<sub>L</sub></text>
              <text x="35" y="52" font-size="10" fill="#f59e0b">{{ loadResistance }}kΩ</text>
            </g>
            
            <!-- Output Terminal -->
            <circle cx="60" cy="280" r="8" fill="none" stroke="#60a5fa" stroke-width="2"/>
            <text x="60" y="295" text-anchor="middle" font-size="12" fill="#60a5fa">Output</text>
            
            <!-- Vertical wire connecting components -->
            <line x1="60" y1="88" x2="60" y2="90" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="60" y1="90" x2="100" y2="90" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="100" y1="120" x2="100" y2="150" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="100" y1="200" x2="100" y2="230" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="100" y1="270" x2="100" y2="272" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="100" y1="272" x2="60" y2="272" stroke="#e0e0e0" stroke-width="2"/>
            <line x1="60" y1="272" x2="60" y2="272" stroke="#e0e0e0" stroke-width="2"/>
            
            <!-- Ground reference -->
            <g transform="translate(100, 272)">
              <line x1="0" y1="0" x2="-15" y2="0" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="-15" y1="0" x2="-15" y2="5" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="-20" y1="5" x2="-10" y2="5" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="-18" y1="10" x2="-12" y2="10" stroke="#e0e0e0" stroke-width="2"/>
              <line x1="-16" y1="15" x2="-14" y2="15" stroke="#e0e0e0" stroke-width="2"/>
            </g>
            
            <!-- Reference voltage indicator -->
            <g v-if="clamperType === 'positive'" transform="translate(150, 80)">
              <text x="0" y="0" font-size="11" fill="#9ca3af">V<sub>ref</sub> = -V<sub>p</sub></text>
              <text x="0" y="15" font-size="10" fill="#9ca3af">+ V<sub>D</sub></text>
            </g>
            <g v-else transform="translate(150, 80)">
              <text x="0" y="0" font-size="11" fill="#9ca3af">V<sub>ref</sub> = +V<sub>p</sub></text>
              <text x="0" y="15" font-size="10" fill="#9ca3af">- V<sub>D</sub></text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Waveform Display -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 class="text-xl font-semibold text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Waveforms
        </h3>
        
        <div class="bg-gray-900 rounded-lg p-4">
          <svg viewBox="0 0 500 350" class="w-full h-auto">
            <!-- Background -->
            <rect width="500" height="350" fill="#1a1a2e"/>
            
            <!-- Input Waveform -->
            <g transform="translate(50, 30)">
              <text x="0" y="10" font-size="12" font-weight="bold" fill="#4ade80">Input (Vin)</text>
              
              <!-- Grid for input -->
              <g opacity="0.3">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#4ade80" stroke-dasharray="2,2"/>
                <line x1="0" y1="100" x2="400" y2="100" stroke="#4ade80" stroke-dasharray="2,2"/>
              </g>
              
              <!-- Sine wave input -->
              <path :d="generateInputWaveform(50, 80)" fill="none" stroke="#4ade80" stroke-width="2"/>
              
              <!-- Zero line -->
              <line x1="0" y1="80" x2="400" y2="80" stroke="#4ade80" stroke-width="1" opacity="0.5"/>
              
              <!-- Labels -->
              <text x="405" y="55" font-size="10" fill="#4ade80">+{{ (amplitude + dcBias).toFixed(1) }}V</text>
              <text x="405" y="105" font-size="10" fill="#4ade80">{{ (-amplitude + dcBias).toFixed(1) }}V</text>
            </g>
            
            <!-- Output Waveform -->
            <g transform="translate(50, 190)">
              <text x="0" y="10" font-size="12" font-weight="bold" fill="#60a5fa">Output (Vout)</text>
              
              <!-- Grid for output -->
              <g opacity="0.3">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#60a5fa" stroke-dasharray="2,2"/>
                <line x1="0" y1="100" x2="400" y2="100" stroke="#60a5fa" stroke-dasharray="2,2"/>
              </g>
              
              <!-- Clamped output waveform -->
              <path :d="generateOutputWaveform(50, 80)" fill="none" stroke="#60a5fa" stroke-width="2"/>
              
              <!-- Zero line -->
              <line x1="0" y1="80" x2="400" y2="80" stroke="#60a5fa" stroke-width="1" opacity="0.5"/>
              
              <!-- Clamping level indicator -->
              <line :x1="0" :y1="getClampingLevelY(80)" x2="400" :y2="getClampingLevelY(80)" 
                stroke="#ef4444" stroke-width="1" stroke-dasharray="4,4"/>
              <text :x="405" :y="getClampingLevelY(80) + 4" font-size="10" fill="#ef4444">
                Clamp: {{ getClampingLevel().toFixed(2) }}V
              </text>
              
              <!-- Labels -->
              <text x="405" y="55" font-size="10" fill="#60a5fa">+{{ getOutputPeakPositive().toFixed(1) }}V</text>
              <text x="405" y="105" font-size="10" fill="#60a5fa">{{ getOutputPeakNegative().toFixed(1) }}V</text>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Calculated Parameters -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h3 class="text-xl font-semibold text-white mb-4">Circuit Parameters</h3>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-gray-700 rounded-lg p-4">
          <p class="text-gray-400 text-sm">Time Constant (τ)</p>
          <p class="text-2xl font-bold text-white">{{ timeConstant.toFixed(3) }} ms</p>
          <p class="text-xs text-gray-500 mt-1">τ = R × C</p>
        </div>
        
        <div class="bg-gray-700 rounded-lg p-4">
          <p class="text-gray-400 text-sm">Period (T)</p>
          <p class="text-2xl font-bold text-white">{{ period.toFixed(3) }} s</p>
          <p class="text-xs text-gray-500 mt-1">T = 1 / f</p>
        </div>
        
        <div class="bg-gray-700 rounded-lg p-4">
          <p class="text-gray-400 text-sm">τ / T Ratio</p>
          <p class="text-2xl font-bold" :class="timeConstantRatio >= 10 ? 'text-green-400' : 'text-yellow-400'">
            {{ timeConstantRatio.toFixed(1) }}
          </p>
          <p class="text-xs text-gray-500 mt-1">Should be ≥ 10</p>
        </div>
        
        <div class="bg-gray-700 rounded-lg p-4">
          <p class="text-gray-400 text-sm">DC Shift</p>
          <p class="text-2xl font-bold text-purple-400">{{ dcShift.toFixed(2) }} V</p>
          <p class="text-xs text-gray-500 mt-1">{{ clamperType === 'positive' ? 'Negative peaks' : 'Positive peaks' }} clamped</p>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 class="text-xl font-semibold text-white mb-4">📚 How Diode Clampers Work</h3>
      
      <div class="space-y-4 text-gray-300">
        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">What is a Clamper?</h4>
          <p class="leading-relaxed">
            A <strong>diode clamper</strong> (also called a <strong>DC restorer</strong>) is a circuit that shifts the DC level 
            of an AC signal without changing its shape. It can shift the entire waveform up or down.
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">Types of Clampers</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gray-700 rounded-lg p-4">
              <h5 class="font-semibold text-green-400 mb-2">Positive Clamper</h5>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Clamps the negative peaks to ≈ 0V</li>
                <li>Shifts the waveform upward</li>
                <li>Diode conducts during negative half-cycle</li>
                <li>Output: V<sub>out</sub> = V<sub>in</sub> + V<sub>p</sub></li>
              </ul>
            </div>
            <div class="bg-gray-700 rounded-lg p-4">
              <h5 class="font-semibold text-red-400 mb-2">Negative Clamper</h5>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Clamps the positive peaks to ≈ 0V</li>
                <li>Shifts the waveform downward</li>
                <li>Diode conducts during positive half-cycle</li>
                <li>Output: V<sub>out</sub> = V<sub>in</sub> - V<sub>p</sub></li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">Circuit Operation</h4>
          <ol class="list-decimal list-inside space-y-2">
            <li>
              <strong>Capacitor Charging:</strong> During the half-cycle when the diode conducts, 
              the capacitor charges to the peak voltage of the input signal.
            </li>
            <li>
              <strong>DC Level Shifting:</strong> The charged capacitor acts like a battery, 
              adding or subtracting its voltage from the input signal.
            </li>
            <li>
              <strong>Clamping Action:</strong> The diode prevents the output from going 
              below (positive clamper) or above (negative clamper) the diode's forward voltage drop.
            </li>
          </ol>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">Design Considerations</h4>
          <ul class="list-disc list-inside space-y-2">
            <li>
              <strong>Time Constant (τ = RC):</strong> Should be much larger than the signal period 
              (τ ≥ 10T) to prevent significant capacitor discharge during the non-conducting half-cycle.
            </li>
            <li>
              <strong>Diode Voltage Drop:</strong> Silicon diodes have ~0.7V drop, Schottky ~0.3V, 
              Germanium ~0.3V. Ideal diodes have 0V drop.
            </li>
            <li>
              <strong>Capacitor Selection:</strong> Must be large enough to maintain the charge 
              but not so large that charging takes too long.
            </li>
            <li>
              <strong>Frequency Range:</strong> Clampers work best at frequencies where τ >> T. 
              At very low frequencies, the capacitor may discharge too much.
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">Common Applications</h4>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="bg-gray-700 rounded-lg p-3 text-center">
              <p class="font-semibold text-purple-400">DC Restoration</p>
              <p class="text-xs text-gray-400 mt-1">Video signals</p>
            </div>
            <div class="bg-gray-700 rounded-lg p-3 text-center">
              <p class="font-semibold text-purple-400">Voltage Shifting</p>
              <p class="text-xs text-gray-400 mt-1">Level converters</p>
            </div>
            <div class="bg-gray-700 rounded-lg p-3 text-center">
              <p class="font-semibold text-purple-400">Signal Processing</p>
              <p class="text-xs text-gray-400 mt-1">PWM circuits</p>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-blue-400 mb-2">Clamper vs Clipper</h4>
          <div class="bg-gray-700 rounded-lg p-4">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-600">
                  <th class="text-left py-2 text-gray-400">Feature</th>
                  <th class="text-left py-2 text-green-400">Clamper</th>
                  <th class="text-left py-2 text-yellow-400">Clipper</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-600">
                  <td class="py-2">Function</td>
                  <td class="py-2">Shifts DC level</td>
                  <td class="py-2">Removes signal parts</td>
                </tr>
                <tr class="border-b border-gray-600">
                  <td class="py-2">Waveform shape</td>
                  <td class="py-2">Preserved</td>
                  <td class="py-2">Changed</td>
                </tr>
                <tr>
                  <td class="py-2">Example</td>
                  <td class="py-2">DC restorer</td>
                  <td class="py-2">Noise limiter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Diode Clamper Circuit Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of diode clamper circuits for DC level shifting' }
  ]
})

// Input parameters
const clamperType = ref('positive')
const amplitude = ref(5)
const frequency = ref(1)
const dcBias = ref(0)
const capacitance = ref(10)
const loadResistance = ref(10)
const diodeType = ref('silicon')
const animationSpeed = ref(1)

// Animation
let animationFrame = null
const phase = ref(0)

// Diode voltage drops
const diodeVoltageDrops = {
  silicon: 0.7,
  schottky: 0.3,
  germanium: 0.3,
  ideal: 0
}

// Computed properties
const diodeDrop = computed(() => diodeVoltageDrops[diodeType.value])

const timeConstant = computed(() => {
  // τ = R × C (in milliseconds)
  const R = loadResistance.value * 1000 // Convert kΩ to Ω
  const C = capacitance.value * 1e-6 // Convert µF to F
  return (R * C) * 1000 // Convert to ms
})

const period = computed(() => {
  // T = 1 / f
  return 1 / frequency.value
})

const timeConstantRatio = computed(() => {
  // τ / T ratio (should be >= 10)
  return (timeConstant.value / 1000) / period.value
})

const dcShift = computed(() => {
  // DC shift amount
  if (clamperType.value === 'positive') {
    return amplitude.value - diodeDrop.value
  } else {
    return -(amplitude.value - diodeDrop.value)
  }
})

// Methods
const getDiodeVoltageDrop = () => {
  return diodeDrop.value
}

const getClampingLevel = () => {
  if (clamperType.value === 'positive') {
    return -diodeDrop.value
  } else {
    return diodeDrop.value
  }
}

const getClampingLevelY = (centerY) => {
  // Map voltage to Y coordinate
  const clampingLevel = getClampingLevel()
  const scale = 25 // pixels per volt
  return centerY - (clampingLevel * scale)
}

const getOutputPeakPositive = () => {
  if (clamperType.value === 'positive') {
    return 2 * amplitude.value + dcBias.value - diodeDrop.value
  } else {
    return dcBias.value - diodeDrop.value
  }
}

const getOutputPeakNegative = () => {
  if (clamperType.value === 'positive') {
    return dcBias.value - diodeDrop.value
  } else {
    return -2 * amplitude.value + dcBias.value + diodeDrop.value
  }
}

const generateInputWaveform = (startX, centerY) => {
  const width = 400
  const scale = 25 // pixels per volt
  let path = `M ${startX} ${centerY}`
  
  for (let x = 0; x <= width; x += 2) {
    const angle = (x / width) * 4 * Math.PI * phase.value
    const voltage = amplitude.value * Math.sin(angle) + dcBias.value
    const y = centerY - (voltage * scale)
    path += ` L ${startX + x} ${y}`
  }
  
  return path
}

const generateOutputWaveform = (startX, centerY) => {
  const width = 400
  const scale = 25 // pixels per volt
  let path = `M ${startX} ${centerY}`
  
  for (let x = 0; x <= width; x += 2) {
    const angle = (x / width) * 4 * Math.PI * phase.value
    const inputVoltage = amplitude.value * Math.sin(angle) + dcBias.value
    
    // Apply clamper transformation
    let outputVoltage
    if (clamperType.value === 'positive') {
      // Positive clamper: shifts waveform up
      // Negative peaks clamped to -Vd
      outputVoltage = inputVoltage + amplitude.value - diodeDrop.value
      if (outputVoltage < -diodeDrop.value) {
        outputVoltage = -diodeDrop.value
      }
    } else {
      // Negative clamper: shifts waveform down
      // Positive peaks clamped to +Vd
      outputVoltage = inputVoltage - amplitude.value + diodeDrop.value
      if (outputVoltage > diodeDrop.value) {
        outputVoltage = diodeDrop.value
      }
    }
    
    const y = centerY - (outputVoltage * scale)
    path += ` L ${startX + x} ${y}`
  }
  
  return path
}

// Animation loop
const animate = () => {
  phase.value += 0.01 * animationSpeed.value
  if (phase.value > 1) {
    phase.value = 0
  }
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

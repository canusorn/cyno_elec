<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Voltage Doubler Circuit</h1>
      <p class="text-gray-400">Interactive visualization of voltage multiplication using capacitors and diodes</p>
    </div>

    <!-- Main Circuit Diagram -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4 text-center">Circuit Diagram</h2>
      
      <!-- SVG Circuit Visualization -->
      <div class="flex justify-center mb-6">
        <svg viewBox="0 0 900 500" class="w-full max-w-5xl h-auto bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#60A5FA;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#34D399;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Title -->
          <text x="450" y="30" text-anchor="middle" font-size="20" font-weight="bold" fill="white" filter="url(#glow)">
            Voltage Doubler Circuit
          </text>

          <!-- AC Input Source -->
          <g transform="translate(100, 250)">
            <circle cx="0" cy="0" r="45" fill="none" stroke="#3B82F6" stroke-width="3"/>
            <path d="M -25 0 Q -12.5 -20 0 0 Q 12.5 20 25 0" fill="none" stroke="#3B82F6" stroke-width="3"/>
            <text x="0" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">
              AC Input
            </text>
            <text x="0" y="85" text-anchor="middle" font-size="12" fill="#60A5FA">
              {{ vin }}V
            </text>
          </g>

          <!-- Wire from source to junction -->
          <line x1="145" y1="250" x2="200" y2="250" stroke="#6B7280" stroke-width="3"/>
          
          <!-- Junction point -->
          <circle cx="200" cy="250" r="6" fill="#FBBF24"/>

          <!-- Wire up to D1 -->
          <line x1="200" y1="250" x2="200" y2="120" stroke="#6B7280" stroke-width="3"/>
          <line x1="200" y1="120" x2="280" y2="120" stroke="#6B7280" stroke-width="3"/>

          <!-- Diode D1 -->
          <g transform="translate(320, 120)">
            <polygon points="-20,-25 -20,25 20,0" fill="none" stroke="#EF4444" stroke-width="3"/>
            <line x1="20" y1="-25" x2="20" y2="25" stroke="#EF4444" stroke-width="3"/>
            <text x="0" y="-35" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">
              D1
            </text>
            <!-- Current flow indicator -->
            <g v-if="showPositiveHalf">
              <polygon points="0,-45 -5,-55 5,-55" fill="#FBBF24"/>
              <text x="0" y="-65" text-anchor="middle" font-size="11" fill="#FBBF24">Current →</text>
            </g>
          </g>

          <!-- Wire from D1 to C1 -->
          <line x1="340" y1="120" x2="420" y2="120" stroke="#6B7280" stroke-width="3"/>

          <!-- Capacitor C1 -->
          <g transform="translate(450, 120)">
            <line x1="-15" y1="-30" x2="-15" y2="30" stroke="#8B5CF6" stroke-width="3"/>
            <line x1="15" y1="-30" x2="15" y2="30" stroke="#8B5CF6" stroke-width="3"/>
            <text x="0" y="-40" text-anchor="middle" font-size="14" font-weight="bold" fill="#8B5CF6">
              C1
            </text>
            <text x="0" y="55" text-anchor="middle" font-size="12" fill="#A78BFA">
              {{ c1 }}µF
            </text>
            <!-- Voltage label -->
            <text x="0" y="0" text-anchor="middle" font-size="12" fill="#FBBF24">
              {{ vc1 }}V
            </text>
          </g>

          <!-- Wire from C1 to ground line -->
          <line x1="465" y1="120" x2="550" y2="120" stroke="#6B7280" stroke-width="3"/>
          <line x1="550" y1="120" x2="550" y2="380" stroke="#6B7280" stroke-width="3"/>

          <!-- Wire from junction to D2 -->
          <line x1="200" y1="250" x2="200" y2="280" stroke="#6B7280" stroke-width="3"/>
          <line x1="200" y1="280" x2="320" y2="280" stroke="#6B7280" stroke-width="3"/>

          <!-- Diode D2 -->
          <g transform="translate(350, 280)">
            <polygon points="-20,-25 -20,25 20,0" fill="none" stroke="#EF4444" stroke-width="3"/>
            <line x1="20" y1="-25" x2="20" y2="25" stroke="#EF4444" stroke-width="3"/>
            <text x="0" y="-35" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">
              D2
            </text>
          </g>

          <!-- Wire from D2 to C2 junction -->
          <line x1="370" y1="280" x2="650" y2="280" stroke="#6B7280" stroke-width="3"/>
          <circle cx="650" cy="280" r="6" fill="#FBBF24"/>

          <!-- Wire up from junction to output -->
          <line x1="650" y1="280" x2="650" y2="200" stroke="#6B7280" stroke-width="3"/>
          <line x1="650" y1="200" x2="750" y2="200" stroke="#6B7280" stroke-width="3"/>

          <!-- Output terminal -->
          <circle cx="780" cy="200" r="30" fill="none" stroke="#10B981" stroke-width="3"/>
          <text x="780" y="205" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">
            Vout
          </text>
          <text x="780" y="245" text-anchor="middle" font-size="14" font-weight="bold" fill="#10B981">
            {{ vout }}V
          </text>

          <!-- Capacitor C2 -->
          <g transform="translate(650, 330)">
            <line x1="-15" y1="-30" x2="-15" y2="30" stroke="#8B5CF6" stroke-width="3"/>
            <line x1="15" y1="-30" x2="15" y2="30" stroke="#8B5CF6" stroke-width="3"/>
            <text x="0" y="-40" text-anchor="middle" font-size="14" font-weight="bold" fill="#8B5CF6">
              C2
            </text>
            <text x="0" y="55" text-anchor="middle" font-size="12" fill="#A78BFA">
              {{ c2 }}µF
            </text>
            <!-- Voltage label -->
            <text x="0" y="0" text-anchor="middle" font-size="12" fill="#FBBF24">
              {{ vc2 }}V
            </text>
          </g>

          <!-- Ground line -->
          <line x1="100" y1="380" x2="750" y2="380" stroke="#6B7280" stroke-width="3"/>
          
          <!-- Ground symbols -->
          <g transform="translate(200, 380)">
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#6B7280" stroke-width="2"/>
            <line x1="-10" y1="5" x2="10" y2="5" stroke="#6B7280" stroke-width="2"/>
            <line x1="-5" y1="10" x2="5" y2="10" stroke="#6B7280" stroke-width="2"/>
          </g>
          
          <g transform="translate(550, 380)">
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#6B7280" stroke-width="2"/>
            <line x1="-10" y1="5" x2="10" y2="5" stroke="#6B7280" stroke-width="2"/>
            <line x1="-5" y1="10" x2="5" y2="10" stroke="#6B7280" stroke-width="2"/>
          </g>
          
          <g transform="translate(650, 380)">
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#6B7280" stroke-width="2"/>
            <line x1="-10" y1="5" x2="10" y2="5" stroke="#6B7280" stroke-width="2"/>
            <line x1="-5" y1="10" x2="5" y2="10" stroke="#6B7280" stroke-width="2"/>
          </g>

          <!-- Connection from C2 to ground -->
          <line x1="650" y1="360" x2="650" y2="380" stroke="#6B7280" stroke-width="3"/>

          <!-- Connection from source to ground -->
          <line x1="100" y1="295" x2="100" y2="380" stroke="#6B7280" stroke-width="3"/>

          <!-- Phase indicator -->
          <g transform="translate(450, 450)">
            <rect x="-100" y="-30" width="200" height="60" rx="8" fill="rgba(251, 191, 36, 0.2)" stroke="#FBBF24" stroke-width="2"/>
            <text x="0" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#FBBF24">
              Current Phase: {{ currentPhase }}
            </text>
            <text x="0" y="18" text-anchor="middle" font-size="12" fill="#FBBF24">
              {{ phaseDescription }}
            </text>
          </g>

          <!-- Animation overlay for current flow -->
          <circle v-if="showPositiveHalf" cx="260" cy="120" r="8" fill="#FBBF24">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle v-if="showNegativeHalf" cx="420" cy="280" r="8" fill="#FBBF24">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <!-- Legend -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-red-500 rounded"></div>
          <span class="text-gray-300 text-sm">Diodes (Rectification)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-purple-500 rounded"></div>
          <span class="text-gray-300 text-sm">Capacitors (Storage)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-yellow-400 rounded"></div>
          <span class="text-gray-300 text-sm">Active Path</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-green-500 rounded"></div>
          <span class="text-gray-300 text-sm">Output (2× Vin)</span>
        </div>
      </div>
    </div>

    <!-- Controls and Waveforms -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Input Controls -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Circuit Parameters</h2>
        
        <!-- Input Voltage -->
        <div class="mb-4">
          <label class="text-white font-medium mb-2 block">Input Voltage (V)</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="vin"
              type="range"
              min="5"
              max="50"
              step="1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              v-model.number="vin"
              type="number"
              min="5"
              max="50"
              class="w-20 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Frequency -->
        <div class="mb-4">
          <label class="text-white font-medium mb-2 block">Frequency (Hz)</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="frequency"
              type="range"
              min="1"
              max="60"
              step="1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              v-model.number="frequency"
              type="number"
              min="1"
              max="60"
              class="w-20 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Capacitor C1 -->
        <div class="mb-4">
          <label class="text-white font-medium mb-2 block">Capacitor C1 (µF)</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="c1"
              type="range"
              min="1"
              max="100"
              step="1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              v-model.number="c1"
              type="number"
              min="1"
              max="100"
              class="w-20 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Capacitor C2 -->
        <div class="mb-4">
          <label class="text-white font-medium mb-2 block">Capacitor C2 (µF)</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="c2"
              type="range"
              min="1"
              max="100"
              step="1"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <input
              v-model.number="c2"
              type="number"
              min="1"
              max="100"
              class="w-20 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Animation Speed -->
        <div class="mb-4">
          <label class="text-white font-medium mb-2 block">Animation Speed</label>
          <div class="flex items-center gap-3">
            <input
              v-model.number="animationSpeed"
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span class="text-gray-300 w-20 text-center">{{ animationSpeed }}x</span>
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="flex gap-3 mt-6">
          <button
            @click="isRunning = !isRunning"
            :class="isRunning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'"
            class="flex-1 text-white rounded-lg px-4 py-2 transition-colors font-medium"
          >
            {{ isRunning ? '⏸ Pause' : '▶ Play' }}
          </button>
          <button
            @click="reset"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors font-medium"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <!-- Waveform Visualization -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Waveforms</h2>
        <canvas ref="waveformCanvas" width="500" height="350" class="w-full bg-gray-900 rounded-lg"></canvas>
        
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="bg-gray-900 rounded-lg p-3">
            <p class="text-gray-400 text-sm">Peak Input</p>
            <p class="text-blue-400 font-mono text-xl">{{ vin.toFixed(1) }}V</p>
          </div>
          <div class="bg-gray-900 rounded-lg p-3">
            <p class="text-gray-400 text-sm">Peak Output</p>
            <p class="text-green-400 font-mono text-xl">{{ vout.toFixed(1) }}V</p>
          </div>
          <div class="bg-gray-900 rounded-lg p-3">
            <p class="text-gray-400 text-sm">Voltage Gain</p>
            <p class="text-yellow-400 font-mono text-xl">{{ gain }}×</p>
          </div>
          <div class="bg-gray-900 rounded-lg p-3">
            <p class="text-gray-400 text-sm">Ripple Voltage</p>
            <p class="text-purple-400 font-mono text-xl">{{ ripple.toFixed(2) }}V</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Results and Analysis -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Circuit Analysis</h2>
      
      <div class="grid md:grid-cols-3 gap-4">
        <!-- C1 Analysis -->
        <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/30">
          <h3 class="text-lg font-semibold text-blue-400 mb-3">Capacitor C1</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">Voltage:</span>
              <span class="text-white font-mono">{{ vc1 }}V</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Reactance:</span>
              <span class="text-white font-mono">{{ xc1.toFixed(1) }}Ω</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Time Constant:</span>
              <span class="text-white font-mono">{{ tau1.toFixed(3) }}ms</span>
            </div>
          </div>
        </div>

        <!-- C2 Analysis -->
        <div class="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
          <h3 class="text-lg font-semibold text-purple-400 mb-3">Capacitor C2</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">Voltage:</span>
              <span class="text-white font-mono">{{ vc2 }}V</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Reactance:</span>
              <span class="text-white font-mono">{{ xc2.toFixed(1) }}Ω</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Time Constant:</span>
              <span class="text-white font-mono">{{ tau2.toFixed(3) }}ms</span>
            </div>
          </div>
        </div>

        <!-- Performance -->
        <div class="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/30">
          <h3 class="text-lg font-semibold text-green-400 mb-3">Performance</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-400">Efficiency:</span>
              <span class="text-white font-mono">{{ efficiency }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Load Regulation:</span>
              <span class="text-white font-mono">{{ regulation }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Status:</span>
              <span class="text-green-400 font-mono">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">📚 How It Works</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-yellow-400 mb-3">Operation Principle</h3>
          <div class="space-y-3 text-gray-300">
            <p>
              <strong class="text-blue-400">Positive Half-Cycle:</strong> D1 conducts, charging C1 to the peak input voltage (Vin). 
              Current flows through D1 to C1, which stores the charge.
            </p>
            <p>
              <strong class="text-red-400">Negative Half-Cycle:</strong> D2 conducts. The input voltage adds to C1's voltage, 
              charging C2 to approximately 2× Vin (sum of input peak + C1 voltage).
            </p>
            <p>
              <strong class="text-green-400">Output:</strong> C2 maintains the doubled voltage, providing a DC output 
              approximately twice the peak input voltage.
            </p>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-yellow-400 mb-3">Key Formulas</h3>
          <div class="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
            <p class="text-blue-400">V_C1 = V_peak (during positive cycle)</p>
            <p class="text-purple-400">V_C2 = V_peak + V_C1 ≈ 2 × V_peak</p>
            <p class="text-green-400">V_out = V_C2 ≈ 2 × V_in(peak)</p>
            <p class="text-yellow-400">X_C = 1/(2π × f × C)</p>
            <p class="text-pink-400">Ripple ∝ 1/(f × C)</p>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-yellow-400 mb-3">Applications & Considerations</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-900 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Common Uses</h4>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>• High-voltage power supplies</li>
              <li>• CRT displays</li>
              <li>• Photomultiplier tubes</li>
              <li>• Laser power supplies</li>
              <li>• X-ray systems</li>
            </ul>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Design Tips</h4>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>• Use equal capacitor values</li>
              <li>• Diodes must withstand 2× Vin</li>
              <li>• Higher frequency = less ripple</li>
              <li>• Larger capacitors = better filtering</li>
              <li>• Add bleeder resistors for safety</li>
            </ul>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <h4 class="text-white font-medium mb-2">Limitations</h4>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>• Poor voltage regulation</li>
              <li>• Limited current output</li>
              <li>• High ripple under load</li>
              <li>• Not suitable for high current</li>
              <li>• Requires filtering for clean DC</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-500/20">
        <h4 class="text-yellow-400 font-medium mb-2">⚠️ Safety Note</h4>
        <p class="text-gray-300 text-sm">
          Voltage doubler circuits can produce dangerous voltages even from low-voltage sources. 
          Always use proper insulation, discharge capacitors before touching, and follow electrical safety guidelines. 
          The output voltage can exceed 100V even with a 12V input at sufficient frequency.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Input parameters
const vin = ref(12)
const frequency = ref(60)
const c1 = ref(47)
const c2 = ref(47)
const animationSpeed = ref(1)
const isRunning = ref(true)

// Canvas reference
const waveformCanvas = ref(null)
let ctx = null
let animationId = null
let time = 0

// Computed values
const vout = computed(() => (vin.value * 2).toFixed(1))
const vc1 = computed(() => vin.value.toFixed(1))
const vc2 = computed(() => (vin.value * 2).toFixed(1))
const gain = computed(() => '2.0')

const xc1 = computed(() => {
  const c = c1.value * 1e-6
  return 1 / (2 * Math.PI * frequency.value * c)
})

const xc2 = computed(() => {
  const c = c2.value * 1e-6
  return 1 / (2 * Math.PI * frequency.value * c)
})

const tau1 = computed(() => {
  // Simplified time constant approximation
  return (c1.value * 10 / frequency.value).toFixed(3)
})

const tau2 = computed(() => {
  return (c2.value * 10 / frequency.value).toFixed(3)
})

const ripple = computed(() => {
  // Simplified ripple calculation
  const load = 1000 // 1kΩ assumed load
  const iLoad = (vin.value * 2) / load
  const t = 1 / frequency.value
  const dv = (iLoad * t) / (c2.value * 1e-6)
  return dv.toFixed(2)
})

const efficiency = computed(() => {
  // Typical voltage doubler efficiency
  const baseEff = 85
  const freqBonus = Math.min(10, frequency.value / 6)
  return (baseEff + freqBonus).toFixed(0)
})

const regulation = computed(() => {
  // Regulation depends on capacitor size and frequency
  const baseReg = 15
  const capBonus = (c1.value + c2.value) / 20
  return Math.max(5, baseReg - capBonus).toFixed(1)
})

// Phase detection for animation
const currentPhase = computed(() => {
  const cyclePos = (time * frequency.value * animationSpeed.value) % 1
  return cyclePos < 0.5 ? 'Positive Half' : 'Negative Half'
})

const phaseDescription = computed(() => {
  const cyclePos = (time * frequency.value * animationSpeed.value) % 1
  if (cyclePos < 0.5) {
    return 'D1 conducts → C1 charges'
  } else {
    return 'D2 conducts → C2 charges to 2×Vin'
  }
})

const showPositiveHalf = computed(() => {
  const cyclePos = (time * frequency.value * animationSpeed.value) % 1
  return cyclePos < 0.5
})

const showNegativeHalf = computed(() => {
  const cyclePos = (time * frequency.value * animationSpeed.value) % 1
  return cyclePos >= 0.5
})

// Canvas drawing
const drawWaveforms = () => {
  if (!ctx || !waveformCanvas.value) return
  
  const canvas = waveformCanvas.value
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * height / 10)
    ctx.lineTo(width, i * height / 10)
    ctx.stroke()
  }
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.moveTo(i * width / 10, 0)
    ctx.lineTo(i * width / 10, height)
    ctx.stroke()
  }
  
  // Draw center line
  ctx.strokeStyle = '#6B7280'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  
  // Scale factors
  const scaleY = height / 6 / vin.value
  const centerX = height / 2
  
  // Draw input waveform (AC)
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + time * 2
    const y = centerX - Math.sin(t) * vin.value * scaleY
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  
  // Draw output waveform (Doubled DC)
  ctx.strokeStyle = '#10B981'
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + time * 2
    const sinVal = Math.sin(t)
    let y
    
    // Voltage doubler output characteristic
    if (sinVal > 0) {
      // Positive half: output follows rising C2
      y = centerX - (vin.value * 2 * 0.9 + Math.sin(t) * vin.value * 0.1) * scaleY
    } else {
      // Negative half: output droops slightly
      const droop = Math.abs(sinVal) * parseFloat(ripple.value) * scaleY
      y = centerX - (vin.value * 2 * 0.9 - droop) * scaleY
    }
    
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  
  // Draw labels
  ctx.font = '12px monospace'
  ctx.fillStyle = '#3B82F6'
  ctx.fillText('Input (AC)', 10, 20)
  ctx.fillStyle = '#10B981'
  ctx.fillText('Output (2×)', 10, 40)
  
  // Draw voltage markers
  ctx.fillStyle = '#9CA3AF'
  ctx.fillText(`+${vin.value}V`, width - 50, height / 2 - vin.value * scaleY - 10)
  ctx.fillText(`-${vin.value}V`, width - 50, height / 2 + vin.value * scaleY + 15)
  ctx.fillText(`${vout.value}V`, width - 50, height / 2 - vin.value * 2 * 0.9 * scaleY - 10)
}

// Animation loop
const animate = () => {
  if (isRunning.value) {
    time += 0.016 * animationSpeed.value
  }
  
  drawWaveforms()
  animationId = requestAnimationFrame(animate)
}

// Reset function
const reset = () => {
  time = 0
  vin.value = 12
  frequency.value = 60
  c1.value = 47
  c2.value = 47
  animationSpeed.value = 1
  isRunning.value = true
}

// Lifecycle
onMounted(() => {
  ctx = waveformCanvas.value?.getContext('2d')
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

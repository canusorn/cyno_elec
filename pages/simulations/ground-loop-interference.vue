<script setup lang="ts">
import { ref, computed } from 'vue'

const loopResistance = ref(10)
const loopInductance = ref(100)
const noiseCurrent = ref(0.1)
const signalFrequency = ref(1000)
const circuitResistance = ref(1000)
const separationDistance = ref(1)
const groundPotentialDiff = ref(0.5)

const noiseVoltage = computed(() => {
  return noiseCurrent.value * loopResistance.value
})

const inducedVoltage = computed(() => {
  // V = M * di/dt, where M is mutual inductance
  // Simplified model: M proportional to 1/distance
  const mutualInductance = (loopInductance.value * 1e-6) / (1 + separationDistance.value)
  return mutualInductance * noiseCurrent.value * 2 * Math.PI * signalFrequency.value
})

const totalInterference = computed(() => {
  return Math.sqrt(
    Math.pow(noiseVoltage.value, 2) +
    Math.pow(inducedVoltage.value, 2) +
    Math.pow(groundPotentialDiff.value, 2)
  )
})

const signalToNoise = computed(() => {
  const signalVoltage = 1 // Assume 1V signal
  const snr = 20 * Math.log10(signalVoltage / (totalInterference.value || 0.001))
  return snr
})

const interferenceLevel = computed(() => {
  const snr = signalToNoise.value
  if (snr > 60) return { level: 'Negligible', color: 'text-green-600', class: 'bg-green-100' }
  if (snr > 40) return { level: 'Low', color: 'text-yellow-600', class: 'bg-yellow-100' }
  if (snr > 20) return { level: 'Moderate', color: 'text-orange-600', class: 'bg-orange-100' }
  return { level: 'Severe', color: 'text-red-600', class: 'bg-red-100' }
})

const loopArea = computed(() => {
  // Simplified: area proportional to separation distance squared
  return Math.pow(separationDistance.value, 2) * 0.01
})

const magneticFlux = computed(() => {
  // Simplified flux calculation
  return (loopArea.value * noiseCurrent.value) / 1000
})

const showTheory = ref(false)
const showCauses = ref(false)
const showSolutions = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Ground Loop Interference Simulation</h1>
      <p class="text-xl text-gray-600">Interactive simulation of ground loop effects on electronic circuits</p>
    </div>

    <!-- Control Panel -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Circuit Parameters</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Loop Resistance: {{ loopResistance }} Ω
          </label>
          <input
            type="range"
            v-model="loopResistance"
            min="0.1"
            max="100"
            step="0.1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Loop Inductance: {{ loopInductance }} µH
          </label>
          <input
            type="range"
            v-model="loopInductance"
            min="1"
            max="1000"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Noise Current: {{ noiseCurrent }} A
          </label>
          <input
            type="range"
            v-model="noiseCurrent"
            min="0.001"
            max="1"
            step="0.001"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Signal Frequency: {{ signalFrequency }} Hz
          </label>
          <input
            type="range"
            v-model="signalFrequency"
            min="50"
            max="100000"
            step="50"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Circuit Resistance: {{ circuitResistance }} Ω
          </label>
          <input
            type="range"
            v-model="circuitResistance"
            min="100"
            max="10000"
            step="100"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Separation Distance: {{ separationDistance }} m
          </label>
          <input
            type="range"
            v-model="separationDistance"
            min="0.1"
            max="10"
            step="0.1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ground Potential Diff: {{ groundPotentialDiff }} V
          </label>
          <input
            type="range"
            v-model="groundPotentialDiff"
            min="0"
            max="5"
            step="0.1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Visualization -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Circuit Diagram & Interference Analysis</h2>

      <!-- SVG Diagram -->
      <div class="flex justify-center mb-6">
        <svg viewBox="0 0 800 500" class="w-full max-w-4xl">
          <!-- Background -->
          <rect x="0" y="0" width="800" height="500" fill="#f8f9fa"/>

          <!-- Ground Symbol 1 -->
          <g transform="translate(100, 400)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#333" stroke-width="3"/>
            <line x1="-30" y1="20" x2="30" y2="20" stroke="#333" stroke-width="3"/>
            <line x1="-20" y1="28" x2="20" y2="28" stroke="#333" stroke-width="3"/>
            <line x1="-10" y1="36" x2="10" y2="36" stroke="#333" stroke-width="3"/>
            <text x="0" y="55" text-anchor="middle" class="text-sm font-medium">Ground A</text>
            <text x="0" y="70" text-anchor="middle" class="text-xs">0V</text>
          </g>

          <!-- Ground Symbol 2 -->
          <g transform="translate(700, 400)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#333" stroke-width="3"/>
            <line x1="-30" y1="20" x2="30" y2="20" stroke="#333" stroke-width="3"/>
            <line x1="-20" y1="28" x2="20" y2="28" stroke="#333" stroke-width="3"/>
            <line x1="-10" y1="36" x2="10" y2="36" stroke="#333" stroke-width="3"/>
            <text x="0" y="55" text-anchor="middle" class="text-sm font-medium">Ground B</text>
            <text x="0" y="70" text-anchor="middle" class="text-xs" fill="#e53e3e">{{ groundPotentialDiff }}V</text>
          </g>

          <!-- Signal Source -->
          <g transform="translate(100, 200)">
            <circle cx="0" cy="0" r="40" fill="white" stroke="#3182ce" stroke-width="3"/>
            <path d="M -25 0 Q -12.5 -25 0 0 Q 12.5 25 25 0" stroke="#3182ce" stroke-width="2" fill="none"/>
            <text x="0" y="55" text-anchor="middle" class="text-sm font-medium">Signal Source</text>
          </g>

          <!-- Load -->
          <g transform="translate(700, 200)">
            <rect x="-40" y="-40" width="80" height="80" fill="white" stroke="#3182ce" stroke-width="3"/>
            <text x="0" y="5" text-anchor="middle" class="text-lg font-bold">R</text>
            <text x="0" y="55" text-anchor="middle" class="text-sm font-medium">Load</text>
          </g>

          <!-- Signal Path (top) -->
          <path
            d="M 140 180 L 700 180"
            stroke="#3182ce"
            stroke-width="3"
            fill="none"
          />
          <text x="400" y="170" text-anchor="middle" class="text-xs">Signal Path</text>

          <!-- Return Path (bottom with loop) -->
          <path
            d="M 740 240 L 740 350 L 100 350 L 100 240"
            stroke="#e53e3e"
            stroke-width="3"
            stroke-dasharray="10,5"
            fill="none"
          />
          <text x="400" y="340" text-anchor="middle" class="text-xs fill-red-600">Ground Return Path (Loop)</text>

          <!-- Noise Source -->
          <g transform="translate(400, 350)">
            <circle cx="0" cy="0" r="30" fill="#fee2e2" stroke="#e53e3e" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" class="text-sm font-bold fill-red-600">N</text>
            <text x="0" y="45" text-anchor="middle" class="text-xs">Noise Source</text>
          </g>

          <!-- Interference Arrow -->
          <g transform="translate(400, 150)">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#e53e3e"/>
              </marker>
            </defs>
            <line
              x1="0"
              y1="50"
              x2="0"
              y2="150"
              stroke="#e53e3e"
              stroke-width="2"
              marker-end="url(#arrowhead)"
              stroke-dasharray="5,5"
            />
            <text x="10" y="100" class="text-xs fill-red-600">Noise Coupling</text>
          </g>

          <!-- Magnetic Field Lines -->
          <g opacity="0.3">
            <ellipse cx="400" cy="350" rx="200" ry="50" fill="none" stroke="#e53e3e" stroke-width="2" stroke-dasharray="5,5"/>
            <ellipse cx="400" cy="350" rx="250" ry="70" fill="none" stroke="#e53e3e" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="600" y="300" class="text-xs fill-red-600">Magnetic Field</text>
          </g>

          <!-- Interference Indicators -->
          <g transform="translate(400, 50)">
            <rect x="-150" y="-30" width="300" height="60" :class="interferenceLevel.class" rx="10"/>
            <text x="0" y="-5" text-anchor="middle" class="text-lg font-bold">Interference Level</text>
            <text x="0" y="20" :class="'text-2xl font-bold ' + interferenceLevel.color">{{ interferenceLevel.level }}</text>
          </g>
        </svg>
      </div>

      <!-- Results -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-gray-600 mb-1">Noise Voltage</div>
          <div class="text-2xl font-bold text-blue-600">{{ (noiseVoltage * 1000).toFixed(3) }} mV</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-gray-600 mb-1">Induced Voltage</div>
          <div class="text-2xl font-bold text-purple-600">{{ (inducedVoltage * 1000).toFixed(3) }} mV</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-gray-600 mb-1">Total Interference</div>
          <div class="text-2xl font-bold text-red-600">{{ (totalInterference * 1000).toFixed(3) }} mV</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-sm text-gray-600 mb-1">Signal-to-Noise Ratio</div>
          <div class="text-2xl font-bold" :class="interferenceLevel.color">{{ signalToNoise.toFixed(1) }} dB</div>
        </div>
      </div>

      <!-- Magnetic Flux -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-2">Magnetic Flux Density</h3>
        <div class="flex items-center gap-4">
          <div class="text-3xl font-bold text-purple-600">{{ (magneticFlux * 1000).toFixed(3) }} mWb</div>
          <div class="text-sm text-gray-600">
            Loop Area: {{ (loopArea * 10000).toFixed(2) }} cm²
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="space-y-6">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showTheory = !showTheory"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">📚 Ground Loop Theory</h2>
          <span class="text-2xl">{{ showTheory ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showTheory" class="mt-4 space-y-4 text-gray-700">
          <p>
            A <strong>ground loop</strong> occurs when there are multiple paths for ground current to flow between two or more devices that are connected together. This creates a conducting loop that can pick up unwanted interference.
          </p>
          <p>
            The fundamental problem arises from Ohm's Law: <strong>V = I × R</strong>. When current flows through the ground path's resistance (R), a voltage drop (V) is created across different ground points.
          </p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Key Formulas:</h4>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Resistive Noise:</strong> V_noise = I_ground × R_loop</li>
              <li><strong>Inductive Noise:</strong> V_induced = M × (di/dt) = M × 2πf × I</li>
              <li><strong>Total Noise:</strong> V_total = √(V_noise² + V_induced² + V_ground²)</li>
              <li><strong>SNR:</strong> SNR(dB) = 20 × log₁₀(V_signal / V_noise)</li>
            </ul>
          </div>
          <p>
            Ground loops are particularly problematic in audio systems, measurement equipment, and sensitive analog circuits where even millivolts of interference can cause significant degradation.
          </p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showCauses = !showCauses"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">🔍 Common Causes</h2>
          <span class="text-2xl">{{ showCauses ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showCauses" class="mt-4 space-y-4 text-gray-700">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">⚡ Multiple Ground Connections</h4>
              <p class="text-sm">Devices connected to different ground points with different potentials</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔌 Improper Shielding</h4>
              <p class="text-sm">Cable shields connected at both ends, creating ground loops</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📐 Large Loop Areas</h4>
              <p class="text-sm">Physical separation creating large loops that pick up magnetic interference</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🏭 Noisy Electrical Environment</h4>
              <p class="text-sm">Nearby equipment injecting noise into ground conductors</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔗 Shared Ground Conductors</h4>
              <p class="text-sm">High-current and low-current circuits sharing return paths</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🌐 Different Ground Potentials</h4>
              <p class="text-sm">Ground points at different locations with voltage differences</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-lg p-6">
        <button
          @click="showSolutions = !showSolutions"
          class="w-full flex justify-between items-center text-left"
        >
          <h2 class="text-2xl font-semibold">✅ Solutions & Best Practices</h2>
          <span class="text-2xl">{{ showSolutions ? '▼' : '▶' }}</span>
        </button>
        <div v-if="showSolutions" class="mt-4 space-y-4 text-gray-700">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🛡️ Differential Signaling</h4>
              <p class="text-sm">Use balanced lines that reject common-mode noise (XLR, RS-485)</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔓 Single-Point Grounding</h4>
              <p class="text-sm">Connect all grounds to a single reference point (star configuration)</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">⚡ Ground Lift (Use Carefully)</h4>
              <p class="text-sm">Break ground loop by disconnecting shield at one end (safety caution!)</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔌 Isolation Transformers</h4>
              <p class="text-sm">Galvanic isolation breaks ground paths while passing signal</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📏 Minimize Loop Area</h4>
              <p class="text-sm">Keep cables close together and route return paths adjacent to signals</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🎚️ Optical Isolation</h4>
              <p class="text-sm">Convert signals to light for complete galvanic isolation</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔀 Common-Mode Chokes</h4>
              <p class="text-sm">Block common-mode noise while passing differential signals</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">⚖️ Proper Ground Plane Design</h4>
              <p class="text-sm">Use solid ground planes in PCBs to minimize impedance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

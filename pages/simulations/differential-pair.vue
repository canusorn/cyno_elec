<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Differential Pair Amplifier</h1>
      <p class="text-gray-400">Interactive exploration of differential circuits and current steering</p>
    </div>

    <!-- Main Controls -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Input Voltage Controls -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-white mb-4">Input Voltages</h3>
          
          <!-- Vin+ -->
          <div class="mb-4">
            <label class="text-gray-400 text-sm flex justify-between">
              <span>Vin+ (Non-Inverting)</span>
              <span class="text-green-400 font-mono">{{ vin1.toFixed(2) }} V</span>
            </label>
            <input
              v-model.number="vin1"
              type="range"
              min="-2"
              max="2"
              step="0.01"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <!-- Vin- -->
          <div>
            <label class="text-gray-400 text-sm flex justify-between">
              <span>Vin- (Inverting)</span>
              <span class="text-blue-400 font-mono">{{ vin2.toFixed(2) }} V</span>
            </label>
            <input
              v-model.number="vin2"
              type="range"
              min="-2"
              max="2"
              step="0.01"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <!-- Tail Current Control -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-white mb-4">Tail Current Source</h3>
          
          <div class="mb-4">
            <label class="text-gray-400 text-sm flex justify-between">
              <span>Tail Current (I_EE)</span>
              <span class="text-yellow-400 font-mono">{{ tailCurrent.toFixed(2) }} mA</span>
            </label>
            <input
              v-model.number="tailCurrent"
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label class="text-gray-400 text-sm flex justify-between">
              <span>Collector Resistance (R_C)</span>
              <span class="text-purple-400 font-mono">{{ rc }} kΩ</span>
            </label>
            <input
              v-model.number="rc"
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <!-- Differential Voltage Display -->
      <div class="mt-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-gray-400 text-sm">Differential Input</div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ (vin1 - vin2).toFixed(3) }} V
            </div>
          </div>
          <div>
            <div class="text-gray-400 text-sm">Common-Mode Input</div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ ((vin1 + vin2) / 2).toFixed(3) }} V
            </div>
          </div>
          <div>
            <div class="text-gray-400 text-sm">Differential Output</div>
            <div class="text-2xl font-bold text-white font-mono">
              {{ differentialOutput.toFixed(3) }} V
            </div>
          </div>
        </div>
      </div>

      <!-- Presets -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold text-white mb-3">Quick Presets</h3>
        <div class="flex flex-wrap gap-2">
          <button
            @click="applyPreset('balanced')"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Balanced (0V diff)
          </button>
          <button
            @click="applyPreset('positive')"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Positive Diff (+1V)
          </button>
          <button
            @click="applyPreset('negative')"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Negative Diff (-1V)
          </button>
          <button
            @click="applyPreset('large-signal')"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Large Signal
          </button>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Circuit Diagram</h2>
      <div class="bg-gray-900 rounded-lg p-6 overflow-x-auto">
        <svg viewBox="0 0 900 450" class="w-full h-auto" style="min-width: 700px;">
          <defs>
            <!-- Grid pattern -->
            <pattern id="diffGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5"/>
            </pattern>
            
            <!-- Arrow markers -->
            <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#34D399" />
            </marker>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
            </marker>
            <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#FBBF24" />
            </marker>
          </defs>
          
          <!-- Background -->
          <rect width="100%" height="100%" fill="url(#diffGrid)" />
          
          <!-- VCC rail -->
          <line x1="200" y1="50" x2="700" y2="50" stroke="#F59E0B" stroke-width="4" />
          <text x="450" y="40" text-anchor="middle" fill="#F59E0B" font-size="18" font-weight="bold">+VCC</text>
          
          <!-- VEE rail -->
          <line x1="400" y1="400" x2="500" y2="400" stroke="#3B82F6" stroke-width="4" />
          <text x="450" y="420" text-anchor="middle" fill="#3B82F6" font-size="18" font-weight="bold">-VEE</text>
          
          <!-- Left Branch (Q1) -->
          <!-- RC1 -->
          <rect x="260" y="60" width="30" height="80" fill="#1F2937" stroke="#60A5FA" stroke-width="2" rx="3" />
          <text x="275" y="105" text-anchor="middle" fill="#60A5FA" font-size="12" font-weight="bold">R_C1</text>
          <text x="310" y="105" fill="#9CA3AF" font-size="11">{{ rc }}kΩ</text>
          
          <!-- Q1 NPN -->
          <g transform="translate(275, 180)">
            <circle cx="0" cy="0" r="25" fill="#1F2937" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="-15" x2="-8" y2="15" stroke="#34D399" stroke-width="3" />
            <line x1="-8" y1="-8" x2="-18" y2="-18" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="0" x2="-18" y2="0" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="8" x2="-18" y2="8" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="15" x2="-8" y2="25" stroke="#34D399" stroke-width="2" />
            <line x1="8" y1="-5" x2="8" y2="5" stroke="#34D399" stroke-width="3" />
            <line x1="8" y1="0" x2="20" y2="0" stroke="#34D399" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" fill="#34D399" font-size="14" font-weight="bold">Q1</text>
          </g>
          
          <!-- Input 1 -->
          <line x1="220" y1="180" x2="248" y2="180" stroke="#10B981" stroke-width="2" />
          <circle cx="220" cy="180" r="5" fill="#10B981" />
          <text x="210" y="175" text-anchor="end" fill="#10B981" font-size="14" font-weight="bold">Vin+</text>
          <text x="210" y="195" text-anchor="end" fill="#10B981" font-size="11">{{ vin1.toFixed(2) }}V</text>
          
          <!-- Output 1 -->
          <line x1="295" y1="180" x2="350" y2="180" stroke="#F472B6" stroke-width="2" />
          <circle cx="350" cy="180" r="5" fill="#F472B6" />
          <text x="360" y="175" fill="#F472B6" font-size="14" font-weight="bold">Vout1</text>
          <text x="360" y="195" fill="#F472B6" font-size="11">{{ vout1.toFixed(2) }}V</text>
          
          <!-- Wire from RC1 to Q1 -->
          <line x1="275" y1="140" x2="275" y2="155" stroke="#60A5FA" stroke-width="2" />
          
          <!-- Wire from VCC to RC1 -->
          <line x1="275" y1="50" x2="275" y2="60" stroke="#60A5FA" stroke-width="2" />
          
          <!-- Right Branch (Q2) -->
          <!-- RC2 -->
          <rect x="610" y="60" width="30" height="80" fill="#1F2937" stroke="#60A5FA" stroke-width="2" rx="3" />
          <text x="625" y="105" text-anchor="middle" fill="#60A5FA" font-size="12" font-weight="bold">R_C2</text>
          <text x="660" y="105" fill="#9CA3AF" font-size="11">{{ rc }}kΩ</text>
          
          <!-- Q2 NPN -->
          <g transform="translate(625, 180)">
            <circle cx="0" cy="0" r="25" fill="#1F2937" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="-15" x2="-8" y2="15" stroke="#34D399" stroke-width="3" />
            <line x1="-8" y1="-8" x2="-18" y2="-18" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="0" x2="-18" y2="0" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="8" x2="-18" y2="8" stroke="#34D399" stroke-width="2" />
            <line x1="-8" y1="15" x2="-8" y2="25" stroke="#34D399" stroke-width="2" />
            <line x1="8" y1="-5" x2="8" y2="5" stroke="#34D399" stroke-width="3" />
            <line x1="8" y1="0" x2="20" y2="0" stroke="#34D399" stroke-width="2" />
            <text x="0" y="4" text-anchor="middle" fill="#34D399" font-size="14" font-weight="bold">Q2</text>
          </g>
          
          <!-- Input 2 -->
          <line x1="680" y1="180" x2="652" y2="180" stroke="#3B82F6" stroke-width="2" />
          <circle cx="680" cy="180" r="5" fill="#3B82F6" />
          <text x="690" y="175" fill="#3B82F6" font-size="14" font-weight="bold">Vin-</text>
          <text x="690" y="195" fill="#3B82F6" font-size="11">{{ vin2.toFixed(2) }}V</text>
          
          <!-- Output 2 -->
          <line x1="605" y1="180" x2="550" y2="180" stroke="#F472B6" stroke-width="2" />
          <circle cx="550" cy="180" r="5" fill="#F472B6" />
          <text x="540" y="175" text-anchor="end" fill="#F472B6" font-size="14" font-weight="bold">Vout2</text>
          <text x="540" y="195" text-anchor="end" fill="#F472B6" font-size="11">{{ vout2.toFixed(2) }}V</text>
          
          <!-- Wire from RC2 to Q2 -->
          <line x1="625" y1="140" x2="625" y2="155" stroke="#60A5FA" stroke-width="2" />
          
          <!-- Wire from VCC to RC2 -->
          <line x1="625" y1="50" x2="625" y2="60" stroke="#60A5FA" stroke-width="2" />
          
          <!-- Emitter Connection -->
          <line x1="283" y1="205" x2="450" y2="250" stroke="#34D399" stroke-width="2" />
          <line x1="617" y1="205" x2="450" y2="250" stroke="#34D399" stroke-width="2" />
          <line x1="450" y1="250" x2="450" y2="350" stroke="#34D399" stroke-width="2" />
          
          <!-- Tail Current Source -->
          <circle cx="450" cy="370" r="25" fill="#1F2937" stroke="#FBBF24" stroke-width="2" />
          <line x1="450" y1="345" x2="450" y2="355" stroke="#34D399" stroke-width="2" />
          <line x1="450" y1="385" x2="450" y2="400" stroke="#FBBF24" stroke-width="3" />
          <text x="450" y="375" text-anchor="middle" fill="#FBBF24" font-size="12" font-weight="bold">I_EE</text>
          <text x="450" y="320" text-anchor="middle" fill="#FBBF24" font-size="11">{{ tailCurrent.toFixed(1) }}mA</text>
          
          <!-- Current flow indicators -->
          <g v-if="ic1 > 0.01">
            <path d="M 275 140 L 275 160" stroke="#34D399" stroke-width="2" marker-end="url(#arrowGreen)" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </path>
            <text x="320" y="155" fill="#34D399" font-size="11">{{ ic1.toFixed(2) }}mA</text>
          </g>
          
          <g v-if="ic2 > 0.01">
            <path d="M 625 140 L 625 160" stroke="#34D399" stroke-width="2" marker-end="url(#arrowGreen)" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
            </path>
            <text x="580" y="155" fill="#34D399" font-size="11">{{ ic2.toFixed(2) }}mA</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Current Distribution -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Current Distribution</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Bar Chart -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-white mb-4">Tail Current Split</h3>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-sm text-gray-400 mb-1">
                <span>I_C1 (Q1)</span>
                <span class="text-green-400">{{ ic1.toFixed(2) }} mA</span>
              </div>
              <div class="h-6 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                  :style="{ width: `${(ic1 / tailCurrent) * 100}%` }"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm text-gray-400 mb-1">
                <span>I_C2 (Q2)</span>
                <span class="text-blue-400">{{ ic2.toFixed(2) }} mA</span>
              </div>
              <div class="h-6 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                  :style="{ width: `${(ic2 / tailCurrent) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center text-gray-400 text-sm">
            Total Tail Current: {{ tailCurrent.toFixed(2) }} mA
          </div>
        </div>

        <!-- Transfer Characteristic -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-white mb-4">Transfer Characteristic</h3>
          <div class="bg-gray-800 rounded-lg p-2 h-48">
            <svg viewBox="0 0 300 180" class="w-full h-full">
              <!-- Grid -->
              <line x1="30" y1="90" x2="280" y2="90" stroke="#4B5563" stroke-width="1" />
              <line x1="150" y1="20" x2="150" y2="160" stroke="#4B5563" stroke-width="1" />
              
              <!-- Labels -->
              <text x="150" y="175" text-anchor="middle" fill="#9CA3AF" font-size="10">Vdiff</text>
              <text x="10" y="95" fill="#9CA3AF" font-size="10">I_C1</text>
              
              <!-- Transfer curve -->
              <path
                :d="generateTransferCurve()"
                fill="none"
                stroke="#10B981"
                stroke-width="2"
              />
              
              <!-- Current operating point -->
              <circle
                :cx="150 + (vin1 - vin2) * 50"
                :cy="90 - (ic1 / tailCurrent) * 70"
                r="4"
                fill="#EF4444"
              />
            </svg>
          </div>
          <div class="mt-2 text-center text-sm text-gray-400">
            Operating point: Vdiff = {{ (vin1 - vin2).toFixed(3) }} V
          </div>
        </div>
      </div>
    </div>

    <!-- Output Analysis -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Output Analysis</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-gray-900 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">Vout1</div>
          <div class="text-2xl font-bold text-white font-mono">{{ vout1.toFixed(2) }} V</div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">Vout2</div>
          <div class="text-2xl font-bold text-white font-mono">{{ vout2.toFixed(2) }} V</div>
        </div>
        <div class="bg-gray-900 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">Differential Output</div>
          <div class="text-2xl font-bold text-yellow-400 font-mono">{{ differentialOutput.toFixed(2) }} V</div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-6">Understanding Differential Pairs</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-green-400 mb-3">What is a Differential Pair?</h3>
          <p class="text-gray-400 leading-relaxed">
            A differential pair is a fundamental building block in analog IC design, consisting of two matched transistors 
            sharing a common tail current source. It amplifies the difference between two input signals while rejecting 
            signals common to both inputs (common-mode rejection). This configuration is the input stage of operational 
            amplifiers and many other analog circuits.
          </p>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-green-400 mb-3">How It Works</h3>
          <ul class="list-disc list-inside text-gray-400 space-y-2">
            <li>The tail current source forces the sum of collector currents to remain constant</li>
            <li>When Vin+ > Vin-, more current flows through Q1, less through Q2</li>
            <li>When Vin- > Vin+, more current flows through Q2, less through Q1</li>
            <li>The difference in currents creates a differential output voltage</li>
            <li>Common-mode signals (both inputs changing together) are rejected</li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-green-400 mb-3">Key Equations</h3>
          <div class="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
            <div class="text-white">Differential Voltage: V_diff = Vin+ - Vin-</div>
            <div class="text-white">Common-Mode Voltage: V_cm = (Vin+ + Vin-) / 2</div>
            <div class="text-white">Differential Output: V_out,diff = Vout2 - Vout1</div>
            <div class="text-white">Voltage Gain: A_v = (I_EE × R_C) / (2 × V_T)</div>
            <div class="text-gray-500 text-xs mt-2">Where V_T ≈ 26mV at room temperature</div>
          </div>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-green-400 mb-3">Applications</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gray-900 rounded-lg p-3">
              <div class="text-white font-medium mb-1">Operational Amplifiers</div>
              <div class="text-gray-400 text-sm">Input stage provides high gain and common-mode rejection</div>
            </div>
            <div class="bg-gray-900 rounded-lg p-3">
              <div class="text-white font-medium mb-1">Differential Signaling</div>
              <div class="text-gray-400 text-sm">USB, HDMI, LVDS, and other high-speed interfaces</div>
            </div>
            <div class="bg-gray-900 rounded-lg p-3">
              <div class="text-white font-medium mb-1">RF Mixers</div>
              <div class="text-gray-400 text-sm">Frequency conversion in radio systems</div>
            </div>
            <div class="bg-gray-900 rounded-lg p-3">
              <div class="text-white font-medium mb-1">Current Steering DACs</div>
              <div class="text-gray-400 text-sm">Digital-to-analog converters</div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-green-400 mb-3">Design Considerations</h3>
          <ul class="list-disc list-inside text-gray-400 space-y-2">
            <li><strong>Transistor Matching:</strong> Q1 and Q2 should be closely matched for optimal performance</li>
            <li><strong>Emitter Degeneration:</strong> Adding resistors improves linearity but reduces gain</li>
            <li><strong>Load Balancing:</strong> RC1 and RC2 should match to maintain symmetry</li>
            <li><strong>Tail Current:</strong> Higher current increases speed and transconductance but also power</li>
            <li><strong>Common-Mode Range:</strong> Input voltages must stay within valid operating range</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Input parameters
const vin1 = ref(0)  // Non-inverting input
const vin2 = ref(0)  // Inverting input
const tailCurrent = ref(2)  // Tail current in mA
const rc = ref(5)  // Collector resistance in kΩ

// Constants
const VT = 0.026  // Thermal voltage at room temperature (26mV)

// Computed values
const differentialInput = computed(() => vin1.value - vin2.value)

// Collector currents (simplified long-tailed pair model)
const ic1 = computed(() => {
  const diff = differentialInput.value
  const iTail = tailCurrent.value
  // Using tanh for realistic current steering
  return iTail / (1 + Math.exp(-diff / VT))
})

const ic2 = computed(() => {
  return tailCurrent.value - ic1.value
})

// Output voltages
const vcc = 15  // Assume +15V supply
const vout1 = computed(() => vcc - ic1.value * rc.value)
const vout2 = computed(() => vcc - ic2.value * rc.value)

// Differential output
const differentialOutput = computed(() => vout2.value - vout1.value)

// Presets
const applyPreset = (preset) => {
  switch (preset) {
    case 'balanced':
      vin1.value = 0
      vin2.value = 0
      break
    case 'positive':
      vin1.value = 0.05
      vin2.value = -0.05
      break
    case 'negative':
      vin1.value = -0.05
      vin2.value = 0.05
      break
    case 'large-signal':
      vin1.value = 0.2
      vin2.value = -0.2
      break
  }
}

// Generate transfer characteristic curve
const generateTransferCurve = () => {
  const points = []
  const startX = 30
  const endX = 280
  const centerY = 90
  const amplitude = 70
  
  for (let x = startX; x <= endX; x += 2) {
    const vdiff = (x - 150) / 50  // Convert pixel position to voltage
    const ic1_fraction = 1 / (1 + Math.exp(-vdiff / VT))
    const y = centerY - ic1_fraction * amplitude
    points.push(`${x === startX ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  
  return points.join(' ')
}
</script>

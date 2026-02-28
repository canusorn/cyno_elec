<template>
  <div class="max-w-6xl mx-auto">
    <!-- Main Simulator Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        🔌 Full-Wave Bridge Rectifier Simulator
      </h2>

      <!-- Controls -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Peak Voltage -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Peak Voltage (V<sub>m</sub>)
          </label>
          <div class="flex items-center space-x-2">
            <input
              v-model.number="peakVoltage"
              type="range"
              min="10"
              max="340"
              step="1"
              class="flex-1"
            />
            <input
              v-model.number="peakVoltage"
              type="number"
              class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <span class="text-sm font-mono text-gray-600 dark:text-gray-400">V</span>
          </div>
        </div>

        <!-- Frequency -->
        <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Frequency
          </label>
          <div class="flex items-center space-x-2">
            <select
              v-model.number="frequency"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option :value="50">50 Hz</option>
              <option :value="60">60 Hz</option>
            </select>
            <span class="text-sm font-mono text-gray-600 dark:text-gray-400">Hz</span>
          </div>
        </div>

        <!-- Filter Capacitor -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Filter Capacitor
          </label>
          <div class="flex items-center space-x-2">
            <input
              v-model.number="capacitor"
              type="range"
              min="0"
              max="10000"
              step="100"
              class="flex-1"
            />
            <input
              v-model.number="capacitor"
              type="number"
              class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <span class="text-sm font-mono text-gray-600 dark:text-gray-400">µF</span>
          </div>
        </div>

        <!-- Load Resistance -->
        <div class="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Load Resistance
          </label>
          <div class="flex items-center space-x-2">
            <input
              v-model.number="loadResistance"
              type="range"
              min="10"
              max="1000"
              step="10"
              class="flex-1"
            />
            <input
              v-model.number="loadResistance"
              type="number"
              class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            />
            <span class="text-sm font-mono text-gray-600 dark:text-gray-400">Ω</span>
          </div>
        </div>
      </div>

      <!-- Real-time Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
          <div class="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">DC Output Voltage</div>
          <div class="text-2xl font-bold text-blue-900 dark:text-blue-200">{{ dcOutputVoltage.toFixed(1) }}</div>
          <div class="text-xs text-blue-700 dark:text-blue-400">V</div>
        </div>
        
        <div class="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
          <div class="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">Ripple Voltage</div>
          <div class="text-2xl font-bold text-green-900 dark:text-green-200">{{ rippleVoltage.toFixed(3) }}</div>
          <div class="text-xs text-green-700 dark:text-green-400">V</div>
        </div>
        
        <div class="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4">
          <div class="text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1">Ripple Factor</div>
          <div class="text-2xl font-bold text-purple-900 dark:text-purple-200">{{ (rippleFactor * 100).toFixed(2) }}</div>
          <div class="text-xs text-purple-700 dark:text-purple-400">%</div>
        </div>
        
        <div class="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4">
          <div class="text-xs font-semibold text-orange-800 dark:text-orange-300 mb-1">Efficiency</div>
          <div class="text-2xl font-bold text-orange-900 dark:text-orange-200">{{ efficiency.toFixed(1) }}</div>
          <div class="text-xs text-orange-700 dark:text-orange-400">%</div>
        </div>
      </div>

      <!-- Circuit Diagram -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
        <div class="flex justify-center">
          <svg viewBox="0 0 600 350" class="w-full max-w-3xl">
            <!-- AC Source -->
            <circle cx="80" cy="175" r="30" fill="none" stroke="#3B82F6" stroke-width="2"/>
            <path d="M65 175 Q72 165, 80 175 Q88 185, 95 175" fill="none" stroke="#3B82F6" stroke-width="2"/>
            <text x="80" y="220" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400" font-size="11">AC Input</text>
            
            <!-- Transformer symbol (simplified) -->
            <line x1="110" y1="175" x2="140" y2="175" stroke="#9CA3AF" stroke-width="2"/>
            <circle cx="150" cy="165" r="10" fill="none" stroke="#9CA3AF" stroke-width="2"/>
            <circle cx="150" cy="185" r="10" fill="none" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="160" y1="175" x2="190" y2="175" stroke="#9CA3AF" stroke-width="2"/>
            <text x="150" y="210" text-anchor="middle" class="text-xs fill-gray-500 dark:fill-gray-400" font-size="10">Transformer</text>
            
            <!-- Bridge Rectifier -->
            <g transform="translate(220, 125)">
              <!-- Diode D1 (top left) -->
              <g transform="translate(0, 0)">
                <polygon points="0,-15 0,15 -10,0" fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
                <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#EF4444" stroke-width="2"/>
                <line x1="-30" y1="0" x2="-10" y2="0" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="0" y1="0" x2="30" y2="0" stroke="#9CA3AF" stroke-width="2"/>
                <text x="0" y="-25" text-anchor="middle" class="text-xs fill-red-600" font-size="10" font-weight="bold">D1</text>
              </g>
              
              <!-- Diode D2 (top right) -->
              <g transform="translate(60, 0)">
                <polygon points="60,-15 60,15 70,0" fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
                <line x1="70" y1="-15" x2="70" y2="15" stroke="#EF4444" stroke-width="2"/>
                <line x1="30" y1="0" x2="60" y2="0" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="70" y1="0" x2="100" y2="0" stroke="#9CA3AF" stroke-width="2"/>
                <text x="60" y="-25" text-anchor="middle" class="text-xs fill-red-600" font-size="10" font-weight="bold">D2</text>
              </g>
              
              <!-- Diode D3 (bottom left) -->
              <g transform="translate(0, 100)">
                <polygon points="0,85 0,115 -10,100" fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
                <line x1="-10" y1="85" x2="-10" y2="115" stroke="#EF4444" stroke-width="2"/>
                <line x1="-30" y1="100" x2="-10" y2="100" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="0" y1="100" x2="30" y2="100" stroke="#9CA3AF" stroke-width="2"/>
                <text x="0" y="130" text-anchor="middle" class="text-xs fill-red-600" font-size="10" font-weight="bold">D3</text>
              </g>
              
              <!-- Diode D4 (bottom right) -->
              <g transform="translate(60, 100)">
                <polygon points="60,85 60,115 70,100" fill="#EF4444" stroke="#DC2626" stroke-width="1"/>
                <line x1="70" y1="85" x2="70" y2="115" stroke="#EF4444" stroke-width="2"/>
                <line x1="30" y1="100" x2="60" y2="100" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="70" y1="100" x2="100" y2="100" stroke="#9CA3AF" stroke-width="2"/>
                <text x="60" y="130" text-anchor="middle" class="text-xs fill-red-600" font-size="10" font-weight="bold">D4</text>
              </g>
              
              <!-- Connection lines -->
              <line x1="30" y1="0" x2="30" y2="50" stroke="#9CA3AF" stroke-width="2"/>
              <line x1="30" y1="50" x2="0" y2="50" stroke="#9CA3AF" stroke-width="2"/>
              <line x1="0" y1="50" x2="0" y2="100" stroke="#9CA3AF" stroke-width="2"/>
              
              <line x1="70" y1="0" x2="70" y2="50" stroke="#9CA3AF" stroke-width="2"/>
              <line x1="70" y1="50" x2="100" y2="50" stroke="#9CA3AF" stroke-width="2"/>
              <line x1="100" y1="50" x2="100" y2="100" stroke="#9CA3AF" stroke-width="2"/>
            </g>
            
            <!-- Filter Capacitor -->
            <g transform="translate(380, 145)">
              <line x1="-30" y1="30" x2="0" y2="30" stroke="#9CA3AF" stroke-width="2"/>
              <line x1="0" y1="15" x2="0" y2="45" stroke="#8B5CF6" stroke-width="3"/>
              <line x1="10" y1="15" x2="10" y2="45" stroke="#8B5CF6" stroke-width="3"/>
              <line x1="10" y1="30" x2="40" y2="30" stroke="#9CA3AF" stroke-width="2"/>
              <text x="5" y="65" text-anchor="middle" class="text-xs fill-purple-600" font-size="10" font-weight="bold">C</text>
              <text x="5" y="80" text-anchor="middle" class="text-xs fill-gray-500 dark:fill-gray-400" font-size="9">{{ capacitor }}µF</text>
            </g>
            
            <!-- Load Resistor -->
            <g transform="translate(470, 145)">
              <line x1="-30" y1="30" x2="0" y2="30" stroke="#9CA3AF" stroke-width="2"/>
              <rect x="0" y="15" width="50" height="30" fill="none" stroke="#F59E0B" stroke-width="2"/>
              <line x1="50" y1="30" x2="80" y2="30" stroke="#9CA3AF" stroke-width="2"/>
              <text x="25" y="65" text-anchor="middle" class="text-xs fill-orange-600" font-size="10" font-weight="bold">R<sub>L</sub></text>
              <text x="25" y="80" text-anchor="middle" class="text-xs fill-gray-500 dark:fill-gray-400" font-size="9">{{ loadResistance }}Ω</text>
            </g>
            
            <!-- Output terminals -->
            <circle cx="340" cy="175" r="5" fill="#10B981"/>
            <circle cx="340" cy="175" r="8" fill="none" stroke="#10B981" stroke-width="1"/>
            <text x="340" y="200" text-anchor="middle" class="text-xs fill-green-600" font-size="10" font-weight="bold">+</text>
            
            <circle cx="340" cy="275" r="5" fill="#374151"/>
            <circle cx="340" cy="275" r="8" fill="none" stroke="#374151" stroke-width="1"/>
            <text x="340" y="300" text-anchor="middle" class="text-xs fill-gray-600" font-size="10" font-weight="bold">-</text>
            
            <!-- Return path -->
            <line x1="550" y1="175" x2="570" y2="175" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="570" y1="175" x2="570" y2="275" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="570" y1="275" x2="340" y2="275" stroke="#9CA3AF" stroke-width="2"/>
            
            <!-- Ground symbol -->
            <g transform="translate(340, 290)">
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#374151" stroke-width="2"/>
              <line x1="-10" y1="5" x2="10" y2="5" stroke="#374151" stroke-width="2"/>
              <line x1="-5" y1="10" x2="5" y2="10" stroke="#374151" stroke-width="2"/>
            </g>
            
            <!-- Connection from bridge to capacitor -->
            <line x1="320" y1="175" x2="340" y2="175" stroke="#9CA3AF" stroke-width="2"/>
            
            <!-- Connection from capacitor to resistor -->
            <line x1="420" y1="175" x2="440" y2="175" stroke="#9CA3AF" stroke-width="2"/>
            
            <!-- Connection from bridge negative -->
            <line x1="280" y1="225" x2="280" y2="275" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="280" y1="275" x2="340" y2="275" stroke="#9CA3AF" stroke-width="2"/>
            
            <!-- Input connections to bridge -->
            <line x1="190" y1="175" x2="190" y2="155" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="190" y1="155" x2="220" y2="155" stroke="#9CA3AF" stroke-width="2"/>
            
            <line x1="190" y1="175" x2="190" y2="195" stroke="#9CA3AF" stroke-width="2"/>
            <line x1="190" y1="195" x2="220" y2="195" stroke="#9CA3AF" stroke-width="2"/>
          </svg>
        </div>
      </div>

      <!-- Waveform Display -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Waveforms</h3>
        
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Input AC Waveform -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Input AC Voltage</h4>
            <svg viewBox="0 0 300 150" class="w-full">
              <!-- Grid -->
              <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" stroke-width="1"/>
              <line x1="150" y1="0" x2="150" y2="150" stroke="#E5E7EB" stroke-width="1"/>
              
              <!-- AC Waveform -->
              <path
                :d="generateACWaveform()"
                fill="none"
                stroke="#3B82F6"
                stroke-width="2"
              />
              
              <!-- Labels -->
              <text x="10" y="20" class="text-xs fill-blue-600" font-size="10">+V<sub>m</sub></text>
              <text x="10" y="145" class="text-xs fill-blue-600" font-size="10">-V<sub>m</sub></text>
              <text x="280" y="90" class="text-xs fill-gray-500" font-size="9">Time →</text>
            </svg>
          </div>

          <!-- Output DC Waveform -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Output DC Voltage (Filtered)</h4>
            <svg viewBox="0 0 300 150" class="w-full">
              <!-- Grid -->
              <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" stroke-width="1"/>
              <line x1="150" y1="0" x2="150" y2="150" stroke="#E5E7EB" stroke-width="1"/>
              
              <!-- DC Output Waveform -->
              <path
                :d="generateDCWaveform()"
                fill="none"
                stroke="#10B981"
                stroke-width="2"
              />
              
              <!-- Ripple indication -->
              <line
                x1="0"
                :y1="130 - (dcOutputVoltage / peakVoltage) * 50"
                x2="300"
                :y2="130 - (dcOutputVoltage / peakVoltage) * 50"
                stroke="#F59E0B"
                stroke-width="1"
                stroke-dasharray="5,5"
              />
              
              <!-- Labels -->
              <text x="10" y="20" class="text-xs fill-green-600" font-size="10">V<sub>DC</sub></text>
              <text x="10" y="45" class="text-xs fill-orange-600" font-size="10">V<sub>ripple</sub></text>
              <text x="280" y="90" class="text-xs fill-gray-500" font-size="9">Time →</text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Full-Wave Bridge Rectifier Theory</h3>

      <!-- How It Works -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">How It Works</h4>
        <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p><strong class="text-blue-600 dark:text-blue-400">Positive Half-Cycle:</strong> Diodes D1 and D4 conduct, current flows through the load in one direction.</p>
          <p><strong class="text-blue-600 dark:text-blue-400">Negative Half-Cycle:</strong> Diodes D2 and D3 conduct, current flows through the load in the same direction.</p>
          <p><strong class="text-green-600 dark:text-green-400">Result:</strong> Both half-cycles are converted to positive pulses, creating a pulsating DC output.</p>
        </div>
      </div>

      <!-- Key Formulas -->
      <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Formulas</h4>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">DC Output Voltage (without filter)</div>
            <div class="text-lg font-mono text-blue-600 dark:text-blue-400">V<sub>dc</sub> = 2V<sub>m</sub>/π</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">DC Output (with capacitor)</div>
            <div class="text-lg font-mono text-blue-600 dark:text-blue-400">V<sub>dc</sub> ≈ V<sub>m</sub> - V<sub>ripple</sub>/2</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Ripple Voltage</div>
            <div class="text-lg font-mono text-orange-600 dark:text-orange-400">V<sub>r</sub> = I<sub>dc</sub> / (2fC)</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Ripple Factor</div>
            <div class="text-lg font-mono text-purple-600 dark:text-purple-400">γ = V<sub>r</sub> / V<sub>dc</sub></div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Common Applications</h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div class="flex items-start">
            <span class="text-2xl mr-3">🔋</span>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Battery Chargers</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Convert AC to DC for charging batteries</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">💻</span>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Power Supplies</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">DC power for electronic devices</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🚗</span>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Automotive</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Alternator output rectification</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🏭</span>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white">Industrial DC Motors</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Variable speed motor drives</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const peakVoltage = ref(170) // Peak voltage (Vm)
const frequency = ref(50) // Frequency in Hz
const capacitor = ref(1000) // Filter capacitor in µF
const loadResistance = ref(100) // Load resistance in Ω

// Constants
const PI = Math.PI

// Computed values
const dcOutputVoltage = computed(() => {
  const vm = peakVoltage.value
  const c = capacitor.value * 1e-6 // Convert to Farads
  const rl = loadResistance.value
  const f = frequency.value
  
  // Calculate ripple voltage
  const idc = (vm * 2 / PI) / rl // DC current
  const vr = idc / (2 * f * c) // Ripple voltage
  
  // DC output with filtering
  return Math.max(0, vm - vr / 2)
})

const rippleVoltage = computed(() => {
  const vm = peakVoltage.value
  const c = capacitor.value * 1e-6
  const rl = loadResistance.value
  const f = frequency.value
  
  // DC current
  const idc = (vm * 2 / PI) / rl
  
  // Ripple voltage
  const vr = idc / (2 * f * c)
  
  return vr
})

const rippleFactor = computed(() => {
  const vdc = dcOutputVoltage.value
  const vr = rippleVoltage.value
  
  if (vdc === 0) return 0
  return vr / vdc
})

const efficiency = computed(() => {
  // Full-wave rectifier has maximum theoretical efficiency of 81.2%
  // Practical efficiency is slightly lower due to diode losses
  const baseEfficiency = 81.2
  
  // Reduce efficiency slightly based on load and ripple
  const factor = 1 - (rippleFactor.value * 0.1)
  
  return Math.max(0, baseEfficiency * factor)
})

// Waveform generation
const generateACWaveform = () => {
  const points = []
  const vm = peakVoltage.value
  const amplitude = 50 // SVG amplitude
  const baseY = 75 // Center Y position
  
  for (let x = 0; x <= 300; x += 2) {
    const angle = (x / 300) * 4 * PI // Two full cycles
    const y = baseY - (Math.sin(angle) * amplitude)
    points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}

const generateDCWaveform = () => {
  const points = []
  const vm = peakVoltage.value
  const vdc = dcOutputVoltage.value
  const vr = rippleVoltage.value
  const amplitude = 50 // SVG amplitude
  const baseY = 75 // Center Y position
  
  for (let x = 0; x <= 300; x += 2) {
    const angle = (x / 300) * 4 * PI // Two full cycles
    // Full-wave rectified sine with ripple
    const rectified = Math.abs(Math.sin(angle))
    const withRipple = rectified * (1 - (vr / vm) * (0.5 + 0.5 * Math.sin(2 * angle)))
    const y = baseY - (withRipple * amplitude)
    points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.dark input[type="range"] {
  background: #4b5563;
}

select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
}
</style>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Controls Section -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
        
        <!-- Input Voltage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Voltage (Vin): {{ inputVoltage }}V
          </label>
          <input
            v-model.number="inputVoltage"
            type="range"
            min="3"
            max="48"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>3V</span>
            <span>48V</span>
          </div>
        </div>

        <!-- Duty Cycle -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duty Cycle: {{ dutyCycle }}%
          </label>
          <input
            v-model.number="dutyCycle"
            type="range"
            min="10"
            max="90"
            step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>90%</span>
          </div>
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1" v-if="dutyCycle > 75">
            ⚠️ High duty cycle - may cause instability
          </p>
        </div>

        <!-- Inductance -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inductance (L): {{ inductance }}µH
          </label>
          <input
            v-model.number="inductance"
            type="range"
            min="10"
            max="1000"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10µH</span>
            <span>1000µH</span>
          </div>
        </div>

        <!-- Capacitance -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Capacitance (C): {{ capacitance }}µF
          </label>
          <input
            v-model.number="capacitance"
            type="range"
            min="10"
            max="1000"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10µF</span>
            <span>1000µF</span>
          </div>
        </div>

        <!-- Load Resistance -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Load Resistance: {{ loadResistance }}Ω
          </label>
          <input
            v-model.number="loadResistance"
            type="range"
            min="10"
            max="500"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10Ω</span>
            <span>500Ω</span>
          </div>
        </div>

        <!-- Switching Frequency -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Switching Frequency: {{ frequency }}kHz
          </label>
          <input
            v-model.number="frequency"
            type="range"
            min="10"
            max="500"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10kHz</span>
            <span>500kHz</span>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Presets</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="setPreset('usb')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              USB 5V → ±12V
            </button>
            <button
              @click="setPreset('automotive')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              12V → -5V
            </button>
            <button
              @click="setPreset('logic')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              3.3V → -3.3V
            </button>
            <button
              @click="setPreset('high-gain')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              High Gain
            </button>
          </div>
        </div>
      </div>

      <!-- Results & Visualization Section -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Analysis</h3>
        
        <!-- Main Results Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Output Voltage -->
          <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Output Voltage</div>
            <div class="text-2xl font-bold text-red-600 dark:text-red-400">
              {{ Math.abs(outputVoltage).toFixed(2) }}V
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Inverted polarity ({{ outputVoltage < 0 ? '-' : '' }})
            </div>
          </div>

          <!-- Voltage Gain -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Voltage Gain</div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ voltageGain.toFixed(3) }}×
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              D/(1-D) = {{ (dutyCycle/100).toFixed(2) }}/{{ (1-dutyCycle/100).toFixed(2) }}
            </div>
          </div>

          <!-- Output Current -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Output Current</div>
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ outputCurrent.toFixed(2) }}A
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Iout = |Vout| / R
            </div>
          </div>

          <!-- Input Current -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Input Current</div>
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {{ inputCurrent.toFixed(2) }}A
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Iin = Iout × D/(1-D)
            </div>
          </div>

          <!-- Output Power -->
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Output Power</div>
            <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {{ outputPower.toFixed(2) }}W
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pout = |Vout| × Iout
            </div>
          </div>

          <!-- Efficiency -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Efficiency</div>
            <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {{ efficiency.toFixed(1) }}%
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ efficiency >= 85 ? '✓ Excellent' : efficiency >= 70 ? '⚠ Good' : '⚠ Low' }}
            </div>
          </div>
        </div>

        <!-- Ripple Voltage -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-300">Ripple Voltage</span>
            <span class="text-lg font-bold text-gray-900 dark:text-white">
              {{ rippleVoltage.toFixed(3) }}V
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
            <div
              class="bg-primary h-2 rounded-full transition-all duration-300"
              :style="{ width: Math.min(100, (rippleVoltage / Math.abs(outputVoltage)) * 100) + '%' }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Ripple ratio: {{ ((rippleVoltage / Math.abs(outputVoltage)) * 100).toFixed(2) }}%
          </div>
        </div>

        <!-- Circuit Diagram -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-center">Buck-Boost Circuit</h4>
          <div class="flex justify-center">
            <svg width="320" height="280" viewBox="0 0 320 280" class="text-primary">
              <!-- Input Voltage Source -->
              <g class="voltage-source">
                <circle cx="40" cy="140" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                <text x="40" y="135" class="text-xs fill-current text-center font-bold">Vin</text>
                <text x="40" y="150" class="text-xs fill-current text-center">{{ inputVoltage }}V</text>
              </g>

              <!-- Inductor (L) -->
              <g class="inductor">
                <path
                  d="M80,140 L90,140 Q95,130 100,140 Q105,150 110,140 Q115,130 120,140 Q125,150 130,140 L140,140"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="inductor-coil"/>
                <text x="110" y="120" class="text-xs fill-current text-center">L</text>
                <text x="110" y="165" class="text-xs fill-current text-center">{{ inductance }}µH</text>
              </g>

              <!-- MOSFET Switch (Q1) -->
              <g class="mosfet-switch">
                <line x1="160" y1="110" x2="160" y2="170" stroke="currentColor" stroke-width="3"/>
                <line x1="145" y1="120" x2="175" y2="120" stroke="currentColor" stroke-width="2"/>
                <line x1="145" y1="160" x2="175" y2="160" stroke="currentColor" stroke-width="2"/>
                <circle cx="160" cy="140" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <text x="160" y="100" class="text-xs fill-current text-center">Q1</text>
                
                <!-- Gate signal indicator -->
                <line x1="160" y1="158" x2="160" y2="200" stroke="#4CAF50" stroke-width="2" stroke-dasharray="4,2"/>
                <text x="175" y="180" class="text-xs fill-current" fill="#4CAF50">Gate</text>
              </g>

              <!-- Diode (D1) -->
              <g class="diode">
                <polygon points="140,230 150,220 150,240" fill="currentColor" :opacity="diodeConducting ? 1 : 0.3"/>
                <line x1="150" y1="220" x2="150" y2="240" stroke="currentColor" stroke-width="2"/>
                <text x="135" y="255" class="text-xs fill-current">D1</text>
              </g>

              <!-- Capacitor (C) -->
              <g class="capacitor">
                <line x1="200" y1="225" x2="200" y2="235" stroke="currentColor" stroke-width="2"/>
                <line x1="192" y1="235" x2="208" y2="235" stroke="currentColor" stroke-width="2"/>
                <line x1="192" y1="245" x2="208" y2="245" stroke="currentColor" stroke-width="2"/>
                <line x1="200" y1="245" x2="200" y2="255" stroke="currentColor" stroke-width="2"/>
                <text x="185" y="265" class="text-xs fill-current">C</text>
              </g>

              <!-- Load Resistor (R_LOAD) -->
              <g class="load">
                <rect x="235" y="225" width="30" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
                <path
                  d="M240,235 L245,230 L250,240 L255,230 L260,240"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"/>
                <text x="250" y="265" class="text-xs fill-current text-center">R_LOAD</text>
                <text x="250" y="220" class="text-xs fill-current text-center">{{ loadResistance }}Ω</text>
              </g>

              <!-- Output Voltage Indicator -->
              <g class="output-indicator">
                <circle cx="280" cy="235" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
                <text x="280" y="230" class="text-xs fill-current text-center font-bold">Vout</text>
                <text x="280" y="245" class="text-xs fill-current text-center">{{ Math.abs(outputVoltage).toFixed(1) }}V</text>
              </g>

              <!-- Wires -->
              <line x1="65" y1="140" x2="80" y2="140" stroke="currentColor" stroke-width="2"/>
              <line x1="140" y1="140" x2="160" y2="140" stroke="currentColor" stroke-width="2"/>
              <line x1="160" y1="140" x2="200" y2="140" stroke="currentColor" stroke-width="2"/>
              <line x1="200" y1="140" x2="200" y2="225" stroke="currentColor" stroke-width="2"/>
              <line x1="200" y1="255" x2="200" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="200" y1="270" x2="235" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="265" y1="270" x2="280" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="280" y1="270" x2="280" y2="255" stroke="currentColor" stroke-width="2"/>
              
              <!-- Ground connection -->
              <line x1="160" y1="170" x2="160" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="40" y1="165" x2="40" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="40" y1="270" x2="160" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="150" y1="240" x2="150" y2="270" stroke="currentColor" stroke-width="2"/>
              
              <!-- Ground symbols -->
              <line x1="90" y1="270" x2="110" y2="270" stroke="currentColor" stroke-width="2"/>
              <line x1="95" y1="275" x2="105" y2="275" stroke="currentColor" stroke-width="2"/>
              <line x1="98" y1="280" x2="102" y2="280" stroke="currentColor" stroke-width="2"/>

              <!-- Connection point at capacitor/inductor junction -->
              <circle cx="200" cy="140" r="3" fill="currentColor"/>
              
              <!-- Current flow animation -->
              <circle r="3" fill="#FFD700" class="current-particle" v-if="isOn">
                <animateMotion dur="2s" repeatCount="indefinite"
                  path="M65,140 L200,140 L200,270 L280,270 L280,235"/>
              </circle>
            </svg>
          </div>
          <div class="text-center mt-2">
            <span class="text-sm font-bold" :class="isOn ? 'text-green-500' : 'text-red-500'">
              {{ isOn ? 'SWITCH ON' : 'SWITCH OFF' }}
            </span>
          </div>
        </div>

        <!-- Waveform Visualization -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-center">Switching Waveforms</h4>
          <div class="grid grid-cols-2 gap-4">
            <!-- Gate Control Signal -->
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">Gate Control</div>
              <svg width="140" height="100" viewBox="0 0 140 100" class="text-green-500">
                <!-- Grid -->
                <line x1="0" y1="50" x2="140" y2="50" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                <line x1="70" y1="0" x2="70" y2="100" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                
                <!-- Square wave -->
                <polyline
                  :points="gateWaveformPoints"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="waveform-line"/>
                
                <!-- Current position indicator -->
                <line
                  :x1="currentPhase * 140"
                  y1="0"
                  :x2="currentPhase * 140"
                  y2="100"
                  stroke="#FF6B6B"
                  stroke-width="2"
                  stroke-dasharray="4,2"/>
              </svg>
            </div>

            <!-- Inductor Current -->
            <div>
              <div class="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">Inductor Current</div>
              <svg width="140" height="100" viewBox="0 0 140 100" class="text-blue-500">
                <!-- Grid -->
                <line x1="0" y1="50" x2="140" y2="50" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                <line x1="70" y1="0" x2="70" y2="100" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                
                <!-- Sawtooth-like waveform -->
                <polyline
                  :points="inductorCurrentPoints"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="waveform-line"/>
                
                <!-- Current position indicator -->
                <line
                  :x1="currentPhase * 140"
                  y1="0"
                  :x2="currentPhase * 140"
                  y2="100"
                  stroke="#FF6B6B"
                  stroke-width="2"
                  stroke-dasharray="4,2"/>
              </svg>
            </div>
          </div>
          <div class="text-center mt-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">
              Phase: {{ (currentPhase * 100).toFixed(0) }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Buck-Boost Converters</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- How It Works -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">How It Works</h4>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
            A buck-boost converter provides an output voltage that can be either higher or lower than the input voltage, 
            but with <strong>inverted polarity</strong>.
          </p>
          <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <strong>Switch ON:</strong> Inductor stores energy from input source</p>
            <p>• <strong>Switch OFF:</strong> Inductor releases energy to output (inverted)</p>
            <p>• Output voltage: <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">Vout = -Vin × D/(1-D)</code></p>
          </div>
        </div>

        <!-- Key Formulas -->
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">Key Formulas</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>Output Voltage:</strong> Vout = -Vin × D/(1-D)</p>
            <p><strong>Voltage Gain:</strong> Av = D/(1-D)</p>
            <p><strong>Output Current:</strong> Iout = |Vout| / R_load</p>
            <p><strong>Input Current:</strong> Iin = Iout × D/(1-D)</p>
            <p><strong>Ripple Voltage:</strong> Vripple = Iout / (f × C)</p>
          </div>
        </div>

        <!-- Design Considerations -->
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Design Considerations</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p>• <strong>Duty Cycle Range:</strong> 10-75% recommended</p>
            <p>• <strong>Inductor Selection:</strong> Must handle peak current</p>
            <p>• <strong>Capacitor ESR:</strong> Affects ripple voltage</p>
            <p>• <strong>Switching Frequency:</strong> Higher = smaller components</p>
            <p>• <strong>Diode Recovery:</strong> Use fast recovery diode</p>
          </div>
        </div>

        <!-- Applications -->
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">Common Applications</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p>• <strong>Battery-Powered Devices:</strong> Generate negative rails</p>
            <p>• <strong>Op-Amp Supplies:</strong> Dual supply from single battery</p>
            <p>• <strong>LED Drivers:</strong> Constant current with wide input range</p>
            <p>• <strong>Automotive:</strong> 12V to -5V for analog circuits</p>
            <p>• <strong>Portable Equipment:</strong> Flexible voltage conversion</p>
          </div>
        </div>
      </div>

      <!-- Pros and Cons -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">✓ Advantages</h4>
          <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Can step up or step down voltage</li>
            <li>• Simple topology with few components</li>
            <li>• Good efficiency (typically 75-90%)</li>
            <li>• Wide output voltage range</li>
            <li>• Low cost and easy to implement</li>
          </ul>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-red-900 dark:text-red-300 mb-2">✗ Disadvantages</h4>
          <ul class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <li>• <strong>Inverted output polarity</strong> (major limitation)</li>
            <li>• Higher switch stress (Vin + Vout)</li>
            <li>• Diode recovery losses</li>
            <li>• EMI due to hard switching</li>
            <li>• Not suitable for all applications</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Reactive state
const inputVoltage = ref(12)
const dutyCycle = ref(50)
const inductance = ref(100)
const capacitance = ref(100)
const loadResistance = ref(100)
const frequency = ref(100)

// Animation state
const isOn = ref(true)
const currentPhase = ref(0)
const diodeConducting = ref(false)

// Computed values
const outputVoltage = computed(() => {
  const D = dutyCycle.value / 100
  return -inputVoltage.value * (D / (1 - D))
})

const voltageGain = computed(() => {
  const D = dutyCycle.value / 100
  return D / (1 - D)
})

const outputCurrent = computed(() => {
  return Math.abs(outputVoltage.value) / loadResistance.value
})

const inputCurrent = computed(() => {
  return outputCurrent.value * voltageGain.value
})

const outputPower = computed(() => {
  return Math.abs(outputVoltage.value) * outputCurrent.value
})

const inputPower = computed(() => {
  return inputVoltage.value * inputCurrent.value
})

const efficiency = computed(() => {
  if (inputPower.value === 0) return 0
  const eff = (outputPower.value / inputPower.value) * 100
  return Math.min(eff, 95) // Assume 5% losses max
})

const rippleVoltage = computed(() => {
  return outputCurrent.value / (frequency.value * 1000 * capacitance.value * 1e-6)
})

// Waveform generation
const gateWaveformPoints = computed(() => {
  const points = []
  const D = dutyCycle.value / 100
  for (let i = 0; i <= 100; i += 5) {
    const x = (i / 100) * 140
    const y = i < D * 100 ? 20 : 80
    points.push(`${x},${y}`)
  }
  return points.join(' ')
})

const inductorCurrentPoints = computed(() => {
  const points = []
  const D = dutyCycle.value / 100
  let current = 30
  const slopeOn = 20
  const slopeOff = 15
  
  for (let i = 0; i <= 100; i += 5) {
    const x = (i / 100) * 140
    if (i < D * 100) {
      // Rising during ON
      current = 30 + slopeOn * (i / (D * 100))
    } else {
      // Falling during OFF
      const offProgress = (i - D * 100) / ((1 - D) * 100)
      current = (30 + slopeOn) - slopeOff * offProgress
    }
    points.push(`${x},${current}`)
  }
  return points.join(' ')
})

// Methods
const setPreset = (preset) => {
  switch (preset) {
    case 'usb':
      inputVoltage.value = 5
      dutyCycle.value = 70
      inductance.value = 100
      capacitance.value = 220
      loadResistance.value = 150
      frequency.value = 100
      break
    case 'automotive':
      inputVoltage.value = 12
      dutyCycle.value = 29
      inductance.value = 150
      capacitance.value = 150
      loadResistance.value = 100
      frequency.value = 150
      break
    case 'logic':
      inputVoltage.value = 3.3
      dutyCycle.value = 50
      inductance.value = 47
      capacitance.value = 100
      loadResistance.value = 50
      frequency.value = 200
      break
    case 'high-gain':
      inputVoltage.value = 5
      dutyCycle.value = 83
      inductance.value = 220
      capacitance.value = 330
      loadResistance.value = 200
      frequency.value = 80
      break
  }
}

// Animation loop
let animationFrame = null
let lastTime = 0
const period = 2000 // 2 seconds for full cycle

const animate = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const elapsed = timestamp - lastTime
  currentPhase.value = (elapsed % period) / period
  
  const D = dutyCycle.value / 100
  isOn.value = currentPhase.value < D
  diodeConducting.value = currentPhase.value >= D
  
  animationFrame = requestAnimationFrame(animate)
}

// Lifecycle
onMounted(() => {
  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
}

.inductor-coil {
  animation: inductorPulse 2s ease-in-out infinite;
}

@keyframes inductorPulse {
  0%, 100% {
    stroke-width: 2;
    opacity: 1;
  }
  50% {
    stroke-width: 3;
    opacity: 0.8;
  }
}

.current-particle {
  filter: drop-shadow(0 0 6px #FFD700);
}

.waveform-line {
  vector-effect: non-scaling-stroke;
}

.mosfet-switch line:first-child {
  animation: switchGlow 2s ease-in-out infinite;
}

@keyframes switchGlow {
  0%, 100% {
    stroke-width: 3;
  }
  50% {
    stroke-width: 4;
    filter: drop-shadow(0 0 4px currentColor);
  }
}
</style>

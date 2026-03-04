<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Doubler Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design and analyze Cockcroft-Walton voltage doubler circuits
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-2xl font-mono">
              <span class="text-primary">V<sub>out</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> ≈ 2 × </span>
              <span class="text-primary">V<sub>peak</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> - </span>
              <span class="text-primary">V<sub>drop</sub></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Panel: Input Controls -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Input Parameters
          </h2>

          <!-- Input Voltage (RMS) -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Input Voltage (RMS)</label>
              <span class="text-primary font-mono font-bold">{{ inputVoltage }} V</span>
            </div>
            <input
              type="range"
              v-model.number="inputVoltage"
              min="1"
              max="240"
              step="1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1V</span>
              <span>120V</span>
              <span>240V</span>
            </div>
          </div>

          <!-- Frequency -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Frequency</label>
              <span class="text-primary font-mono font-bold">{{ frequency }} Hz</span>
            </div>
            <input
              type="range"
              v-model.number="frequency"
              min="10"
              max="1000"
              step="10"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10Hz</span>
              <span>50/60Hz</span>
              <span>1kHz</span>
            </div>
          </div>

          <!-- Capacitance C1 -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Capacitor C1</label>
              <span class="text-primary font-mono font-bold">{{ formatCapacitance(c1) }}</span>
            </div>
            <input
              type="range"
              v-model.number="c1"
              min="0.000001"
              max="0.01"
              step="0.000001"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1µF</span>
              <span>100µF</span>
              <span>10,000µF</span>
            </div>
          </div>

          <!-- Capacitance C2 -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Capacitor C2</label>
              <span class="text-primary font-mono font-bold">{{ formatCapacitance(c2) }}</span>
            </div>
            <input
              type="range"
              v-model.number="c2"
              min="0.000001"
              max="0.01"
              step="0.000001"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1µF</span>
              <span>100µF</span>
              <span>10,000µF</span>
            </div>
          </div>

          <!-- Load Current -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Load Current</label>
              <span class="text-primary font-mono font-bold">{{ loadCurrent }} mA</span>
            </div>
            <input
              type="range"
              v-model.number="loadCurrent"
              min="0"
              max="100"
              step="1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0mA</span>
              <span>50mA</span>
              <span>100mA</span>
            </div>
          </div>

          <!-- Diode Forward Voltage -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Diode Forward Voltage</label>
              <span class="text-primary font-mono font-bold">{{ diodeDrop }} V</span>
            </div>
            <input
              type="range"
              v-model.number="diodeDrop"
              min="0.3"
              max="1.2"
              step="0.05"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.3V (Schottky)</span>
              <span>0.7V (Si)</span>
              <span>1.2V (LED)</span>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-6">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Quick Presets
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="setPreset('lowPower')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Low Power</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">12V → 24V @ 10mA</div>
              </button>
              <button
                @click="setPreset('mains')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Mains</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">120V → 240V @ 50mA</div>
              </button>
              <button
                @click="setPreset('highCap')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Low Ripple</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">High capacitance</div>
              </button>
              <button
                @click="setPreset('highCurrent')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">High Current</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">100mA load</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Panel: Results -->
        <div class="space-y-6">
          <!-- Output Voltage Display -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Calculated Output</h3>
            
            <div class="text-center mb-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Voltage (DC)</div>
              <div class="text-5xl font-mono font-bold text-green-600 dark:text-green-400 mb-2">
                {{ outputVoltageDC.toFixed(2) }} V
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Ideal: {{ idealOutput.toFixed(2) }} V | Efficiency: {{ efficiency }}%
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Peak Input</div>
                <div class="text-xl font-mono font-bold text-primary">{{ peakVoltage.toFixed(2) }} V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Theoretical Max</div>
                <div class="text-xl font-mono font-bold text-primary">{{ theoreticalMax.toFixed(2) }} V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Ripple Voltage</div>
                <div class="text-xl font-mono font-bold text-yellow-600 dark:text-yellow-400">{{ rippleVoltage.toFixed(3) }} V</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Voltage Drop</div>
                <div class="text-xl font-mono font-bold text-red-600 dark:text-red-400">{{ totalDrop.toFixed(2) }} V</div>
              </div>
            </div>
          </div>

          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
            <svg viewBox="0 0 400 250" class="w-full h-auto">
              <!-- Background -->
              <rect x="0" y="0" width="400" height="250" fill="none"/>
              
              <!-- AC Source -->
              <circle cx="50" cy="125" r="20" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2" fill="none"/>
              <path d="M40 125 Q50 115 60 125" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2" fill="none"/>
              <path d="M40 125 Q50 135 60 125" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2" fill="none"/>
              
              <!-- Wire from source -->
              <line x1="70" y1="125" x2="100" y2="125" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Diode D1 (upward) -->
              <line x1="100" y1="125" x2="100" y2="80" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <polygon :fill="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" points="90,60 110,60 100,80 100,40" stroke="#5C6BC0" stroke-width="1" transform="rotate(90, 100, 60)"/>
              <line x1="90" y1="80" x2="110" y2="80" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <text x="115" y="65" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">D1</text>
              
              <!-- Wire to C1 -->
              <line x1="100" y1="40" x2="150" y2="40" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Capacitor C1 -->
              <line x1="150" y1="25" x2="150" y2="55" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="3"/>
              <line x1="160" y1="25" x2="160" y2="55" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="3"/>
              <text x="140" y="20" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">C1</text>
              
              <!-- Wire from C1 junction -->
              <line x1="160" y1="40" x2="200" y2="40" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Diode D2 (downward) -->
              <polygon :fill="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" points="190,120 210,120 200,140 200,100" stroke="#5C6BC0" stroke-width="1" transform="rotate(-90, 200, 120)"/>
              <line x1="190" y1="120" x2="210" y2="120" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <text x="215" y="115" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">D2</text>
              
              <!-- Wire to output -->
              <line x1="200" y1="140" x2="200" y2="180" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="200" y1="180" x2="280" y2="180" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Capacitor C2 -->
              <line x1="280" y1="165" x2="280" y2="195" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="3"/>
              <line x1="290" y1="165" x2="290" y2="195" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="3"/>
              <text x="270" y="160" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">C2</text>
              
              <!-- Wire to load -->
              <line x1="290" y1="180" x2="330" y2="180" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Load resistor -->
              <rect x="330" y="165" width="40" height="30" :fill="colorMode === 'dark' ? '#3949AB' : '#9FA8DA'" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <text x="335" y="184" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="10" font-weight="bold">LOAD</text>
              
              <!-- Ground connection from C1 -->
              <line x1="155" y1="55" x2="155" y2="210" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="155" y1="210" x2="50" y2="210" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Ground connection from C2 -->
              <line x1="285" y1="195" x2="285" y2="210" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="285" y1="210" x2="155" y2="210" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Ground symbol -->
              <line x1="40" y1="210" x2="60" y2="210" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <line x1="45" y1="215" x2="55" y2="215" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <line x1="48" y1="220" x2="52" y2="220" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              
              <!-- Voltage labels -->
              <text x="30" y="100" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="10">{{ inputVoltage }}V AC</text>
              <text x="310" y="155" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="10" font-weight="bold">{{ outputVoltageDC.toFixed(1) }}V DC</text>
            </svg>
          </div>

          <!-- Waveform Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Output Waveform</h3>
            <svg viewBox="0 0 400 150" class="w-full h-auto">
              <!-- Background grid -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" :stroke="colorMode === 'dark' ? '#37474F' : '#E0E0E0'" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="150" fill="url(#grid)" />
              
              <!-- Axis -->
              <line x1="50" y1="75" x2="380" y2="75" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="1" stroke-dasharray="5,5"/>
              
              <!-- Input waveform (dashed) -->
              <path :d="inputWaveform" :stroke="colorMode === 'dark' ? '#757575' : '#BDBDBD'" stroke-width="1.5" fill="none" stroke-dasharray="5,3"/>
              
              <!-- Output waveform (with ripple) -->
              <path :d="outputWaveform" :stroke="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" stroke-width="2" fill="none"/>
              
              <!-- Labels -->
              <text x="10" y="45" :fill="colorMode === 'dark' ? '#757575' : '#9E9E9E'" font-size="10">Input</text>
              <text x="10" y="20" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="10" font-weight="bold">Output</text>
              
              <!-- Ripple indicator -->
              <line x1="360" y1="25" x2="360" y2="40" :stroke="colorMode === 'dark' ? '#FF9800' : '#F57C00'" stroke-width="1.5"/>
              <text x="340" y="35" :fill="colorMode === 'dark' ? '#FF9800' : '#F57C00'" font-size="9">Ripple</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <section class="mt-12">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Voltage Doubler Circuits</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-primary mb-3">How It Works</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                The Cockcroft-Walton voltage doubler uses two diodes and two capacitors to produce approximately 
                twice the peak input voltage. During the negative half-cycle, D1 conducts and charges C1 to the peak voltage. 
                During the positive half-cycle, D2 conducts and the input voltage adds to the voltage on C1, 
                charging C2 to approximately double the peak input voltage.
              </p>
              
              <h3 class="text-lg font-semibold text-primary mb-3">Key Formulas</h3>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div class="mb-2">V<sub>peak</sub> = V<sub>RMS</sub> × √2</div>
                <div class="mb-2">V<sub>out(ideal)</sub> = 2 × V<sub>peak</sub></div>
                <div class="mb-2">V<sub>drop</sub> = 2 × V<sub>diode</sub></div>
                <div class="mb-2">V<sub>ripple</sub> = I<sub>load</sub> / (f × C)</div>
                <div>V<sub>out</sub> = 2 × V<sub>peak</sub> - V<sub>drop</sub> - V<sub>ripple</sub>/2</div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-primary mb-3">Design Considerations</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Capacitor Selection:</strong> Larger capacitance reduces ripple but increases size and cost</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Diode Types:</strong> Schottky diodes (0.3V) reduce voltage drop, silicon diodes (0.7V) are common</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Load Current:</strong> Higher current increases voltage drop and ripple</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Frequency:</strong> Higher frequency allows smaller capacitors for the same ripple</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Voltage Ratings:</strong> Components must withstand peak input voltages</span>
                </li>
              </ul>
              
              <h3 class="text-lg font-semibold text-primary mb-3 mt-6">Common Applications</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Low-power DC supplies from AC sources</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Cathode ray tube (CRT) displays</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Laser power supplies</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Ion generation systems</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Photomultiplier tube bias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input parameters
const inputVoltage = ref(120)
const frequency = ref(60)
const c1 = ref(0.0001)  // 100µF
const c2 = ref(0.0001)  // 100µF
const loadCurrent = ref(10)  // mA
const diodeDrop = ref(0.7)  // Silicon diode

// Calculations
const peakVoltage = computed(() => inputVoltage.value * Math.sqrt(2))
const theoreticalMax = computed(() => 2 * peakVoltage.value)
const totalDrop = computed(() => 2 * diodeDrop.value)

// Ripple voltage calculation
const rippleVoltage = computed(() => {
  const I = loadCurrent.value / 1000  // Convert to Amps
  const C = Math.min(c1.value, c2.value)
  const ripple = I / (frequency.value * C)
  return ripple
})

// Output voltage DC
const outputVoltageDC = computed(() => {
  return theoreticalMax.value - totalDrop.value - rippleVoltage.value / 2
})

const idealOutput = computed(() => theoreticalMax.value)

const efficiency = computed(() => {
  if (theoreticalMax.value === 0) return 0
  return ((outputVoltageDC.value / theoreticalMax.value) * 100).toFixed(1)
})

// Waveform paths for SVG
const inputWaveform = computed(() => {
  const amplitude = 30
  const centerY = 75
  let path = 'M 50 ' + centerY
  
  for (let i = 0; i <= 330; i += 2) {
    const x = 50 + i
    const angle = (i / 330) * 4 * Math.PI
    const y = centerY + amplitude * Math.sin(angle)
    path += ` L ${x} ${y}`
  }
  
  return path
})

const outputWaveform = computed(() => {
  const ripple = rippleVoltage.value
  const normalizedRipple = Math.min(ripple / 10, 20) // Scale for visualization
  const baseY = 35
  let path = 'M 50 ' + baseY
  
  for (let i = 0; i <= 330; i += 2) {
    const x = 50 + i
    const cyclePos = (i / 330) * (frequency.value / 60)
    const rippleEffect = normalizedRipple * Math.abs(Math.sin(cyclePos * Math.PI))
    const y = baseY + rippleEffect
    path += ` L ${x} ${y}`
  }
  
  return path
})

// Helper functions
function formatCapacitance(c) {
  if (c >= 0.01) return (c * 1000).toFixed(0) + ' mF'
  if (c >= 0.000001) return (c * 1000000).toFixed(0) + ' µF'
  if (c >= 0.000000001) return (c * 1000000000).toFixed(0) + ' nF'
  return (c * 1000000000000).toFixed(1) + ' pF'
}

// Preset configurations
function setPreset(preset) {
  switch(preset) {
    case 'lowPower':
      inputVoltage.value = 12
      frequency.value = 60
      c1.value = 0.000047
      c2.value = 0.000047
      loadCurrent.value = 10
      diodeDrop.value = 0.7
      break
    case 'mains':
      inputVoltage.value = 120
      frequency.value = 60
      c1.value = 0.0001
      c2.value = 0.0001
      loadCurrent.value = 50
      diodeDrop.value = 1.1
      break
    case 'highCap':
      inputVoltage.value = 120
      frequency.value = 60
      c1.value = 0.0047
      c2.value = 0.0047
      loadCurrent.value = 20
      diodeDrop.value = 0.7
      break
    case 'highCurrent':
      inputVoltage.value = 24
      frequency.value = 60
      c1.value = 0.0022
      c2.value = 0.0022
      loadCurrent.value = 100
      diodeDrop.value = 0.5
      break
  }
}
</script>

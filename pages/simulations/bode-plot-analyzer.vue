<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          📊 Bode Plot Analyzer
        </h1>
        <p class="text-blue-300 text-lg">Interactive frequency response analysis for circuits</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Circuit Parameters
          </h2>

          <!-- Circuit Type Selection -->
          <div class="mb-6 p-4 bg-indigo-500/20 rounded-xl border border-indigo-400/40">
            <label class="text-white text-sm mb-2 block">Circuit Type</label>
            <select
              v-model="circuitType"
              class="w-full p-3 bg-slate-800 text-white rounded-lg border border-indigo-400/40 focus:outline-none focus:border-blue-400"
            >
              <option value="rc-low-pass">RC Low-Pass Filter</option>
              <option value="rc-high-pass">RC High-Pass Filter</option>
              <option value="rl-low-pass">RL Low-Pass Filter</option>
              <option value="rl-high-pass">RL High-Pass Filter</option>
              <option value="rlc-bandpass">RLC Bandpass Filter</option>
              <option value="rlc-bandstop">RLC Bandstop Filter</option>
            </select>
          </div>

          <!-- Component Values -->
          <div class="mb-6 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <h3 class="text-lg font-bold text-cyan-300 mb-4">🔧 Component Values</h3>

            <!-- Resistance -->
            <div class="mb-4">
              <label class="text-white text-sm mb-1 block flex justify-between">
                <span>Resistance (R)</span>
                <span class="font-mono font-bold">{{ resistance }}Ω</span>
              </label>
              <input
                type="range"
                v-model.number="resistance"
                min="100"
                max="100000"
                step="100"
                class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>100Ω</span>
                <span>100kΩ</span>
              </div>
            </div>

            <!-- Capacitance -->
            <div class="mb-4" v-if="circuitType.includes('rc') || circuitType.includes('rlc')">
              <label class="text-white text-sm mb-1 block flex justify-between">
                <span>Capacitance (C)</span>
                <span class="font-mono font-bold">{{ (capacitance * 1e6).toFixed(1) }}μF</span>
              </label>
              <input
                type="range"
                v-model.number="capacitance"
                min="1e-9"
                max="1e-3"
                step="1e-9"
                class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>1nF</span>
                <span>1mF</span>
              </div>
            </div>

            <!-- Inductance -->
            <div class="mb-4" v-if="circuitType.includes('rl') || circuitType.includes('rlc')">
              <label class="text-white text-sm mb-1 block flex justify-between">
                <span>Inductance (L)</span>
                <span class="font-mono font-bold">{{ (inductance * 1e3).toFixed(1) }}mH</span>
              </label>
              <input
                type="range"
                v-model.number="inductance"
                min="1e-6"
                max="1"
                step="1e-6"
                class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>1μH</span>
                <span>1H</span>
              </div>
            </div>

            <!-- Quality Factor (for RLC) -->
            <div v-if="circuitType.includes('rlc')">
              <label class="text-white text-sm mb-1 block flex justify-between">
                <span>Quality Factor (Q)</span>
                <span class="font-mono font-bold">{{ qualityFactor.toFixed(2) }}</span>
              </label>
              <input
                type="range"
                v-model.number="qualityFactor"
                min="0.1"
                max="10"
                step="0.1"
                class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <!-- Frequency Range -->
          <div class="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <h3 class="text-lg font-bold text-purple-300 mb-4">📈 Frequency Range</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-white text-sm mb-1 block">Start (Hz)</label>
                <input
                  type="number"
                  v-model.number="freqStart"
                  step="10"
                  class="w-full p-2 bg-slate-800 text-white rounded border border-purple-400/40"
                >
              </div>
              <div>
                <label class="text-white text-sm mb-1 block">End (Hz)</label>
                <input
                  type="number"
                  v-model.number="freqEnd"
                  step="1000"
                  class="w-full p-2 bg-slate-800 text-white rounded border border-purple-400/40"
                >
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-6 p-4 bg-green-500/20 rounded-xl border border-green-400/40">
            <h3 class="text-lg font-bold text-green-300 mb-4">⚡ Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('audio')"
                class="py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                🎵 Audio Filter
              </button>
              <button
                @click="loadPreset('radio')"
                class="py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                📻 Radio Tuner
              </button>
              <button
                @click="loadPreset('power')"
                class="py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                ⚡ Power Supply
              </button>
              <button
                @click="loadPreset('instrumentation')"
                class="py-2 px-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                🔬 Instrumentation
              </button>
            </div>
          </div>
        </div>

        <!-- Visualization Panel -->
        <div class="space-y-6">
          <!-- Bode Plot - Magnitude -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span> Magnitude Response (dB)
            </h3>
            <div class="bg-slate-900 rounded-xl p-4">
              <svg viewBox="0 0 500 300" class="w-full h-auto">
                <!-- Grid -->
                <defs>
                  <pattern id="gridMagnitude" width="50" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#334155" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#gridMagnitude)"/>

                <!-- Axes -->
                <line x1="50" y1="20" x2="50" y2="270" stroke="#94a3b8" stroke-width="2"/>
                <line x1="50" y1="270" x2="490" y2="270" stroke="#94a3b8" stroke-width="2"/>

                <!-- Y-axis labels (dB) -->
                <text x="40" y="30" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">20</text>
                <text x="40" y="90" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">0</text>
                <text x="40" y="150" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">-20</text>
                <text x="40" y="210" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">-40</text>
                <text x="40" y="270" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">-60</text>

                <!-- X-axis labels (log frequency) -->
                <text x="50" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(freqStart) }}</text>
                <text x="270" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(Math.sqrt(freqStart * freqEnd)) }}</text>
                <text x="490" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(freqEnd) }}</text>

                <!-- Magnitude curve -->
                <path
                  :d="magnitudePath"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Cutoff frequency marker -->
                <line
                  v-if="cutoffFreq"
                  :x1="cutoffFreqX"
                  y1="20"
                  :x2="cutoffFreqX"
                  y2="270"
                  stroke="#ef4444"
                  stroke-width="1.5"
                  stroke-dasharray="5,5"
                />
                <text
                  v-if="cutoffFreq"
                  :x="cutoffFreqX"
                  y="15"
                  text-anchor="middle"
                  fill="#ef4444"
                  font-size="10"
                  font-weight="bold"
                >
                  fc = {{ formatFreq(cutoffFreq) }}
                </text>

                <!-- Current frequency marker -->
                <circle
                  :cx="currentFreqX"
                  :cy="currentMagY"
                  r="6"
                  fill="#22c55e"
                  stroke="#fff"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>

          <!-- Bode Plot - Phase -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📐</span> Phase Response (degrees)
            </h3>
            <div class="bg-slate-900 rounded-xl p-4">
              <svg viewBox="0 0 500 300" class="w-full h-auto">
                <!-- Grid -->
                <defs>
                  <pattern id="gridPhase" width="50" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#334155" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#gridPhase)"/>

                <!-- Axes -->
                <line x1="50" y1="20" x2="50" y2="270" stroke="#94a3b8" stroke-width="2"/>
                <line x1="50" y1="270" x2="490" y2="270" stroke="#94a3b8" stroke-width="2"/>

                <!-- Y-axis labels (degrees) -->
                <text x="40" y="30" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">90°</text>
                <text x="40" y="90" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">45°</text>
                <text x="40" y="150" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">0°</text>
                <text x="40" y="210" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">-45°</text>
                <text x="40" y="270" text-anchor="end" fill="#94a3b8" font-size="10" font-family="monospace">-90°</text>

                <!-- X-axis labels (log frequency) -->
                <text x="50" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(freqStart) }}</text>
                <text x="270" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(Math.sqrt(freqStart * freqEnd)) }}</text>
                <text x="490" y="285" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ formatFreq(freqEnd) }}</text>

                <!-- Zero line -->
                <line x1="50" y1="150" x2="490" y2="150" stroke="#475569" stroke-width="1" stroke-dasharray="3,3"/>

                <!-- Phase curve -->
                <path
                  :d="phasePath"
                  fill="none"
                  stroke="#8b5cf6"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Current frequency marker -->
                <circle
                  :cx="currentFreqX"
                  :cy="currentPhaseY"
                  r="6"
                  fill="#22c55e"
                  stroke="#fff"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>

          <!-- Current Values Display -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🔢</span> Current Values
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-slate-800/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Frequency</div>
                <div class="text-2xl font-bold text-white font-mono">{{ formatFreq(currentFreq) }}</div>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Magnitude</div>
                <div class="text-2xl font-bold text-cyan-400 font-mono">{{ currentMagnitude.toFixed(1) }} dB</div>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Phase</div>
                <div class="text-2xl font-bold text-purple-400 font-mono">{{ currentPhase.toFixed(1) }}°</div>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-3">
                <div class="text-gray-400 text-sm">Gain (linear)</div>
                <div class="text-2xl font-bold text-green-400 font-mono">{{ currentGainLinear.toFixed(3) }}</div>
              </div>
            </div>

            <!-- Cutoff Frequency -->
            <div v-if="cutoffFreq" class="mt-4 bg-red-500/20 rounded-lg p-3 border border-red-400/40">
              <div class="text-red-300 text-sm font-semibold mb-1">🎯 Cutoff Frequency (fc)</div>
              <div class="text-2xl font-bold text-white font-mono">{{ formatFreq(cutoffFreq) }}</div>
              <div class="text-red-300 text-sm mt-1">-3dB point (half-power point)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📚</span> Understanding Bode Plots
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- What are Bode Plots -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-cyan-300 mb-3">🎯 What are Bode Plots?</h3>
            <p class="text-gray-300 mb-3">
              Bode plots are graphical representations of a system's frequency response, showing how a circuit
              behaves across different frequencies. They consist of two separate graphs:
            </p>
            <ul class="text-gray-300 space-y-2 list-disc list-inside">
              <li><strong class="text-cyan-300">Magnitude Plot:</strong> Shows gain/attenuation in decibels (dB)</li>
              <li><strong class="text-cyan-300">Phase Plot:</strong> Shows phase shift in degrees</li>
            </ul>
          </div>

          <!-- Key Concepts -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-purple-300 mb-3">🔑 Key Concepts</h3>
            <ul class="text-gray-300 space-y-2">
              <li><strong class="text-purple-300">Cutoff Frequency (fc):</strong> Frequency where output drops to -3dB (70.7% of input)</li>
              <li><strong class="text-purple-300">Bandwidth:</strong> Range of frequencies between -3dB points</li>
              <li><strong class="text-purple-300">Slope:</strong> Rate of attenuation (e.g., -20dB/decade for RC filters)</li>
              <li><strong class="text-purple-300">Phase Shift:</strong> Time delay expressed as angular difference</li>
            </ul>
          </div>

          <!-- Filter Types -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-green-300 mb-3">🎛️ Filter Types</h3>
            <div class="space-y-3">
              <div>
                <div class="font-semibold text-green-300">Low-Pass Filter</div>
                <div class="text-gray-400 text-sm">Passes frequencies BELOW cutoff, attenuates above</div>
              </div>
              <div>
                <div class="font-semibold text-green-300">High-Pass Filter</div>
                <div class="text-gray-400 text-sm">Passes frequencies ABOVE cutoff, attenuates below</div>
              </div>
              <div>
                <div class="font-semibold text-green-300">Bandpass Filter</div>
                <div class="text-gray-400 text-sm">Passes frequencies within a specific range</div>
              </div>
              <div>
                <div class="font-semibold text-green-300">Bandstop Filter</div>
                <div class="text-gray-400 text-sm">Attenuates frequencies within a specific range</div>
              </div>
            </div>
          </div>

          <!-- Formulas -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-orange-300 mb-3">📐 Key Formulas</h3>
            <div class="space-y-2 font-mono text-sm">
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">RC Cutoff Frequency:</div>
                <div class="text-white">fc = 1 / (2π × R × C)</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">RL Cutoff Frequency:</div>
                <div class="text-white">fc = R / (2π × L)</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">RLC Resonant Frequency:</div>
                <div class="text-white">f₀ = 1 / (2π × √(L × C))</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">Decibel Conversion:</div>
                <div class="text-white">dB = 20 × log₁₀(V_out / V_in)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Applications -->
        <div class="mt-6 bg-slate-800/50 rounded-xl p-5">
          <h3 class="text-xl font-bold text-yellow-300 mb-3">🔧 Practical Applications</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">🎵 Audio Systems</div>
              <div class="text-gray-400 text-sm">Crossover networks, equalizers, tone controls</div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">📻 Communications</div>
              <div class="text-gray-400 text-sm">Radio tuning, signal selection, noise filtering</div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">⚡ Power Supplies</div>
              <div class="text-gray-400 text-sm">Ripple rejection, noise reduction, stability analysis</div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">🔬 Instrumentation</div>
              <div class="text-gray-400 text-sm">Signal conditioning, anti-aliasing, measurement accuracy</div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">🎮 Control Systems</div>
              <div class="text-gray-400 text-sm">Feedback stability, phase margin, gain margin</div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300 mb-1">📡 RF Design</div>
              <div class="text-gray-400 text-sm">Impedance matching, filter design, frequency selection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Reactive state
const circuitType = ref('rc-low-pass')
const resistance = ref(1000) // Ohms
const capacitance = ref(1e-6) // Farads
const inductance = ref(10e-3) // Henries
const qualityFactor = ref(1) // For RLC circuits
const freqStart = ref(10)
const freqEnd = ref(100000)
const currentFreq = ref(1000)

// Computed cutoff frequency
const cutoffFreq = computed(() => {
  const R = resistance.value
  const C = capacitance.value
  const L = inductance.value

  switch (circuitType.value) {
    case 'rc-low-pass':
    case 'rc-high-pass':
      return 1 / (2 * Math.PI * R * C)
    case 'rl-low-pass':
    case 'rl-high-pass':
      return R / (2 * Math.PI * L)
    case 'rlc-bandpass':
    case 'rlc-bandstop':
      return 1 / (2 * Math.PI * Math.sqrt(L * C))
    default:
      return 0
  }
})

// Calculate transfer function
const transferFunction = (freq) => {
  const omega = 2 * Math.PI * freq
  const R = resistance.value
  const C = capacitance.value
  const L = inductance.value
  const Q = qualityFactor.value

  let magnitude, phase

  switch (circuitType.value) {
    case 'rc-low-pass':
      {
        const omegaC = 1 / (R * C)
        const ratio = omega / omegaC
        magnitude = 1 / Math.sqrt(1 + ratio * ratio)
        phase = -Math.atan(ratio) * (180 / Math.PI)
      }
      break
    case 'rc-high-pass':
      {
        const omegaC = 1 / (R * C)
        const ratio = omegaC / omega
        magnitude = ratio / Math.sqrt(1 + ratio * ratio)
        phase = Math.atan(omegaC / omega) * (180 / Math.PI)
      }
      break
    case 'rl-low-pass':
      {
        const omegaC = R / L
        const ratio = omegaC / omega
        magnitude = ratio / Math.sqrt(1 + ratio * ratio)
        phase = -Math.atan(omegaC / omega) * (180 / Math.PI)
      }
      break
    case 'rl-high-pass':
      {
        const omegaC = R / L
        const ratio = omega / omegaC
        magnitude = ratio / Math.sqrt(1 + ratio * ratio)
        phase = Math.atan(ratio) * (180 / Math.PI)
      }
      break
    case 'rlc-bandpass':
      {
        const omega0 = 1 / Math.sqrt(L * C)
        const ratio = omega / omega0
        const denom = Math.sqrt(1 + Q * Q * (ratio - 1 / ratio) ** 2)
        magnitude = Q * (1 / ratio) / denom
        phase = -Math.atan(Q * (ratio - 1 / ratio)) * (180 / Math.PI)
      }
      break
    case 'rlc-bandstop':
      {
        const omega0 = 1 / Math.sqrt(L * C)
        const ratio = omega / omega0
        const denom = Math.sqrt(1 + Q * Q * (ratio - 1 / ratio) ** 2)
        magnitude = Math.abs(1 - ratio * ratio) / denom
        phase = Math.atan(Q * (ratio - 1 / ratio) / (1 - ratio * ratio)) * (180 / Math.PI)
        if (omega < omega0) phase += 180
      }
      break
  }

  return { magnitude, phase }
}

// Current values
const currentValues = computed(() => transferFunction(currentFreq.value))
const currentMagnitude = computed(() => 20 * Math.log10(currentValues.value.magnitude))
const currentPhase = computed(() => currentValues.value.phase)
const currentGainLinear = computed(() => currentValues.value.magnitude)

// SVG path generation
const magnitudePath = computed(() => {
  const points = []
  const steps = 200
  const logStart = Math.log10(freqStart.value)
  const logEnd = Math.log10(freqEnd.value)

  for (let i = 0; i <= steps; i++) {
    const logFreq = logStart + (logEnd - logStart) * (i / steps)
    const freq = Math.pow(10, logFreq)
    const { magnitude } = transferFunction(freq)
    const magDB = 20 * Math.log10(magnitude)

    // Map to SVG coordinates
    const x = 50 + ((i / steps) * 440)
    const y = 90 + (-magDB * 3) // 0dB at y=90, -20dB at y=150, etc.

    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }

  return points.join(' ')
})

const phasePath = computed(() => {
  const points = []
  const steps = 200
  const logStart = Math.log10(freqStart.value)
  const logEnd = Math.log10(freqEnd.value)

  for (let i = 0; i <= steps; i++) {
    const logFreq = logStart + (logEnd - logStart) * (i / steps)
    const freq = Math.pow(10, logFreq)
    const { phase } = transferFunction(freq)

    // Map to SVG coordinates
    const x = 50 + ((i / steps) * 440)
    const y = 150 - (phase * 4 / 3) // 0° at y=150, -90° at y=270, 90° at y=30

    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }

  return points.join(' ')
})

// Current frequency marker position
const currentFreqX = computed(() => {
  const logFreq = Math.log10(currentFreq.value)
  const logStart = Math.log10(freqStart.value)
  const logEnd = Math.log10(freqEnd.value)
  return 50 + ((logFreq - logStart) / (logEnd - logStart)) * 440
})

const currentMagY = computed(() => {
  const magDB = 20 * Math.log10(currentValues.value.magnitude)
  return 90 + (-magDB * 3)
})

const currentPhaseY = computed(() => {
  const phase = currentValues.value.phase
  return 150 - (phase * 4 / 3)
})

const cutoffFreqX = computed(() => {
  const logFreq = Math.log10(cutoffFreq.value)
  const logStart = Math.log10(freqStart.value)
  const logEnd = Math.log10(freqEnd.value)
  return 50 + ((logFreq - logStart) / (logEnd - logStart)) * 440
})

// Helper function
const formatFreq = (freq) => {
  if (freq >= 1e6) return `${(freq / 1e6).toFixed(1)} MHz`
  if (freq >= 1e3) return `${(freq / 1e3).toFixed(1)} kHz`
  return `${freq.toFixed(1)} Hz`
}

// Preset loader
const loadPreset = (preset) => {
  switch (preset) {
    case 'audio':
      circuitType.value = 'rc-low-pass'
      resistance.value = 1000
      capacitance.value = 15.9e-9 // ~10kHz cutoff
      freqStart.value = 20
      freqEnd.value = 20000
      currentFreq.value = 1000
      break
    case 'radio':
      circuitType.value = 'rlc-bandpass'
      resistance.value = 50
      capacitance.value = 100e-12
      inductance.value = 253e-6 // ~1MHz resonance
      qualityFactor.value = 5
      freqStart.value = 800000
      freqEnd.value = 1200000
      currentFreq.value = 1000000
      break
    case 'power':
      circuitType.value = 'rc-low-pass'
      resistance.value = 100
      capacitance.value = 1000e-6 // ~1.6Hz cutoff
      freqStart.value = 0.1
      freqEnd.value = 1000
      currentFreq.value = 50
      break
    case 'instrumentation':
      circuitType.value = 'rc-low-pass'
      resistance.value = 10000
      capacitance.value = 1.59e-9 // ~10kHz cutoff
      freqStart.value = 10
      freqEnd.value = 100000
      currentFreq.value = 1000
      break
  }
}

// Adjust current frequency when range changes
watch([freqStart, freqEnd], () => {
  if (currentFreq.value < freqStart.value) currentFreq.value = freqStart.value
  if (currentFreq.value > freqEnd.value) currentFreq.value = freqEnd.value
})
</script>

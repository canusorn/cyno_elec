<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ Current Source Interaction Simulator
        </h1>
        <p class="text-teal-300 text-lg">Explore how multiple current sources affect circuit behavior</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Circuit Configuration
          </h2>

          <!-- Current Source 1 -->
          <div class="mb-6 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <h3 class="text-xl font-bold text-cyan-300 mb-4">🔋 Current Source 1 (I₁)</h3>
            <div class="space-y-4">
              <div>
                <label class="text-white text-sm mb-1 block">Current: {{ source1Current }}mA</label>
                <input
                  type="range"
                  v-model.number="source1Current"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              <div>
                <label class="text-white text-sm mb-1 block">Internal Resistance: {{ source1Resistance }}Ω</label>
                <input
                  type="range"
                  v-model.number="source1Resistance"
                  :min="practicalMode ? 10 : 10000"
                  :max="practicalMode ? 10000 : 10000"
                  :step="practicalMode ? 10 : 1000"
                  class="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
                >
                <div class="text-xs text-cyan-200 mt-1">
                  {{ practicalMode ? 'Practical mode' : 'Ideal mode (∞Ω)' }}
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="source1Enabled = !source1Enabled"
                  :class="source1Enabled ? 'bg-cyan-500' : 'bg-gray-600'"
                  class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
                >
                  {{ source1Enabled ? '✓ ON' : '✗ OFF' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Current Source 2 -->
          <div class="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <h3 class="text-xl font-bold text-purple-300 mb-4">🔋 Current Source 2 (I₂)</h3>
            <div class="space-y-4">
              <div>
                <label class="text-white text-sm mb-1 block">Current: {{ source2Current }}mA</label>
                <input
                  type="range"
                  v-model.number="source2Current"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              <div>
                <label class="text-white text-sm mb-1 block">Internal Resistance: {{ source2Resistance }}Ω</label>
                <input
                  type="range"
                  v-model.number="source2Resistance"
                  :min="practicalMode ? 10 : 10000"
                  :max="practicalMode ? 10000 : 10000"
                  :step="practicalMode ? 10 : 1000"
                  class="w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
                >
                <div class="text-xs text-purple-200 mt-1">
                  {{ practicalMode ? 'Practical mode' : 'Ideal mode (∞Ω)' }}
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="source2Enabled = !source2Enabled"
                  :class="source2Enabled ? 'bg-purple-500' : 'bg-gray-600'"
                  class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
                >
                  {{ source2Enabled ? '✓ ON' : '✗ OFF' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Resistors -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-yellow-300 mb-4">⚡ Resistive Network</h3>
            
            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₁: {{ r1 }}Ω</label>
              <input
                type="range"
                v-model.number="r1"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₂: {{ r2 }}Ω</label>
              <input
                type="range"
                v-model.number="r2"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₃: {{ r3 }}Ω</label>
              <input
                type="range"
                v-model.number="r3"
                min="10"
                max="10000"
                step="10"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>
          </div>

          <!-- Mode Toggle -->
          <div class="mt-6 p-4 bg-teal-500/20 rounded-xl border border-teal-400/40">
            <h3 class="text-lg font-bold text-teal-300 mb-3">🔬 Source Mode</h3>
            <div class="flex gap-2">
              <button
                @click="practicalMode = false"
                :class="!practicalMode ? 'bg-teal-500' : 'bg-gray-600'"
                class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
              >
                Ideal (∞Ω)
              </button>
              <button
                @click="practicalMode = true"
                :class="practicalMode ? 'bg-teal-500' : 'bg-gray-600'"
                class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
              >
                Practical
              </button>
            </div>
          </div>

          <!-- Presets -->
          <div class="mt-6">
            <h3 class="text-lg font-bold text-white mb-3">🎯 Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('currentMirror')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Current Mirror
              </button>
              <button
                @click="loadPreset('ledArray')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                LED Array
              </button>
              <button
                @click="loadPreset('solar')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Solar Panel
              </button>
              <button
                @click="loadPreset('battery')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Battery Charge
              </button>
            </div>
          </div>
        </div>

        <!-- Visualization Panel -->
        <div class="space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/30">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span> Circuit Diagram
            </h2>
            <div class="bg-slate-900 rounded-xl p-4">
              <svg viewBox="0 0 600 400" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
                
                <!-- Main Circuit Nodes -->
                <!-- Top Node (A) -->
                <circle cx="300" cy="100" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="3"/>
                <text x="320" y="95" fill="#fbbf24" font-size="14" font-weight="bold">Node A</text>
                
                <!-- Middle Node (B) -->
                <circle cx="300" cy="200" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="3"/>
                <text x="320" y="195" fill="#fbbf24" font-size="14" font-weight="bold">Node B</text>
                
                <!-- Bottom Node (C) -->
                <circle cx="300" cy="300" r="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="3"/>
                <text x="320" y="295" fill="#fbbf24" font-size="14" font-weight="bold">Node C</text>

                <!-- Wires -->
                <!-- Vertical wire A to B -->
                <line x1="300" y1="108" x2="300" y2="192" stroke="#94a3b8" stroke-width="3"/>
                <!-- Vertical wire B to C -->
                <line x1="300" y1="208" x2="300" y2="292" stroke="#94a3b8" stroke-width="3"/>
                
                <!-- Left branch wires -->
                <line x1="300" y1="100" x2="150" y2="100" stroke="#94a3b8" stroke-width="3"/>
                <line x1="150" y1="100" x2="150" y2="200" stroke="#94a3b8" stroke-width="3"/>
                <line x1="150" y1="200" x2="150" y2="300" stroke="#94a3b8" stroke-width="3"/>
                <line x1="150" y1="300" x2="300" y2="300" stroke="#94a3b8" stroke-width="3"/>
                
                <!-- Right branch wires -->
                <line x1="300" y1="100" x2="450" y2="100" stroke="#94a3b8" stroke-width="3"/>
                <line x1="450" y1="100" x2="450" y2="300" stroke="#94a3b8" stroke-width="3"/>
                <line x1="450" y1="300" x2="300" y2="300" stroke="#94a3b8" stroke-width="3"/>

                <!-- R1 (left branch top) -->
                <rect x="135" y="130" width="30" height="40" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
                <text x="115" y="155" fill="#fbbf24" font-size="12" font-weight="bold">R₁</text>
                <text x="115" y="170" fill="#94a3b8" font-size="10">{{ r1 }}Ω</text>

                <!-- R2 (left branch bottom) -->
                <rect x="135" y="230" width="30" height="40" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
                <text x="115" y="255" fill="#fbbf24" font-size="12" font-weight="bold">R₂</text>
                <text x="115" y="270" fill="#94a3b8" font-size="10">{{ r2 }}Ω</text>

                <!-- R3 (right branch) -->
                <rect x="435" y="180" width="30" height="40" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
                <text x="475" y="205" fill="#fbbf24" font-size="12" font-weight="bold">R₃</text>
                <text x="475" y="220" fill="#94a3b8" font-size="10">{{ r3 }}Ω</text>

                <!-- Current Source 1 (left branch, middle) -->
                <g v-if="source1Enabled">
                  <circle cx="150" cy="215" r="20" fill="#0891b2" stroke="#22d3ee" stroke-width="3" opacity="0.3"/>
                  <line x1="135" y1="215" x2="165" y2="215" stroke="#22d3ee" stroke-width="3"/>
                  <line x1="140" y1="208" x2="160" y2="208" stroke="#22d3ee" stroke-width="2"/>
                  <line x1="140" y1="222" x2="160" y2="222" stroke="#22d3ee" stroke-width="2"/>
                  <!-- Arrow pointing up -->
                  <polygon points="150,195 145,205 155,205" fill="#22d3ee"/>
                  <text x="100" y="218" fill="#22d3ee" font-size="11" font-weight="bold">I₁</text>
                  <text x="100" y="232" fill="#94a3b8" font-size="9">{{ source1Current }}mA</text>
                </g>

                <!-- Current Source 2 (right branch, middle) -->
                <g v-if="source2Enabled">
                  <circle cx="450" cy="200" r="20" fill="#7c3aed" stroke="#a855f7" stroke-width="3" opacity="0.3"/>
                  <line x1="435" y1="200" x2="465" y2="200" stroke="#a855f7" stroke-width="3"/>
                  <line x1="440" y1="193" x2="460" y2="193" stroke="#a855f7" stroke-width="2"/>
                  <line x1="440" y1="207" x2="460" y2="207" stroke="#a855f7" stroke-width="2"/>
                  <!-- Arrow pointing down -->
                  <polygon points="450,225 445,215 455,215" fill="#a855f7"/>
                  <text x="475" y="175" fill="#a855f7" font-size="11" font-weight="bold">I₂</text>
                  <text x="475" y="189" fill="#94a3b8" font-size="9">{{ source2Current }}mA</text>
                </g>

                <!-- Current Flow Animation -->
                <g v-if="source1Enabled">
                  <circle cx="150" cy="170" r="4" fill="#22d3ee" opacity="0.8">
                    <animate attributeName="cy" values="170;260;170" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
                <g v-if="source2Enabled">
                  <circle cx="450" cy="160" r="4" fill="#a855f7" opacity="0.8">
                    <animate attributeName="cy" values="160;240;160" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
            </div>
          </div>

          <!-- Real-time Results -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/30">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📈</span> Real-time Analysis
            </h2>

            <div class="space-y-4">
              <!-- Node Voltages -->
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-400/40">
                  <div class="text-yellow-300 text-xs mb-1">Node A (Top)</div>
                  <div class="text-white font-mono font-bold text-lg">{{ nodeAVoltage.toFixed(2) }}V</div>
                </div>
                <div class="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-400/40">
                  <div class="text-yellow-300 text-xs mb-1">Node B (Mid)</div>
                  <div class="text-white font-mono font-bold text-lg">{{ nodeBVoltage.toFixed(2) }}V</div>
                </div>
                <div class="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-400/40">
                  <div class="text-yellow-300 text-xs mb-1">Node C (Bot)</div>
                  <div class="text-white font-mono font-bold text-lg">{{ nodeCVoltage.toFixed(2) }}V</div>
                </div>
              </div>

              <!-- Branch Currents -->
              <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-600/40">
                <h3 class="text-white font-bold mb-3">🔌 Branch Currents</h3>
                <div class="grid grid-cols-3 gap-3">
                  <div class="text-center">
                    <div class="text-cyan-300 text-xs mb-1">I_R1</div>
                    <div class="text-white font-mono font-bold">{{ currentR1.toFixed(2) }}mA</div>
                  </div>
                  <div class="text-center">
                    <div class="text-purple-300 text-xs mb-1">I_R2</div>
                    <div class="text-white font-mono font-bold">{{ currentR2.toFixed(2) }}mA</div>
                  </div>
                  <div class="text-center">
                    <div class="text-teal-300 text-xs mb-1">I_R3</div>
                    <div class="text-white font-mono font-bold">{{ currentR3.toFixed(2) }}mA</div>
                  </div>
                </div>
              </div>

              <!-- KCL Verification -->
              <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-600/40">
                <h3 class="text-white font-bold mb-3">⚖️ KCL Verification</h3>
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Node A:</span>
                    <span :class="kclNodeA ? 'text-green-400' : 'text-red-400'" class="font-mono font-bold">
                      {{ kclNodeA ? '✓ Valid' : '✗ Invalid' }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Node B:</span>
                    <span :class="kclNodeB ? 'text-green-400' : 'text-red-400'" class="font-mono font-bold">
                      {{ kclNodeB ? '✓ Valid' : '✗ Invalid' }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-300 text-sm">Node C:</span>
                    <span :class="kclNodeC ? 'text-green-400' : 'text-red-400'" class="font-mono font-bold">
                      {{ kclNodeC ? '✓ Valid' : '✗ Invalid' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Source Contributions -->
              <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-600/40">
                <h3 class="text-white font-bold mb-3">📊 Source Contributions</h3>
                <div class="space-y-3">
                  <div v-if="source1Enabled">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-cyan-300">Source 1 (I₁):</span>
                      <span class="text-white font-mono">{{ source1Current }}mA</span>
                    </div>
                    <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
                        :style="{ width: source1Enabled ? (source1Current / Math.max(source1Current + source2Current, 1) * 100) + '%' : '0%' }"
                      ></div>
                    </div>
                  </div>
                  <div v-if="source2Enabled">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-purple-300">Source 2 (I₂):</span>
                      <span class="text-white font-mono">{{ source2Current }}mA</span>
                    </div>
                    <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-300"
                        :style="{ width: source2Enabled ? (source2Current / Math.max(source1Current + source2Current, 1) * 100) + '%' : '0%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-teal-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📚 Understanding Current Sources</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-teal-300 mb-2">⚡ Current Source Fundamentals</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li><strong class="text-white">Ideal Current Source:</strong> Maintains exact current regardless of load (infinite internal resistance)</li>
              <li><strong class="text-white">Practical Current Source:</strong> Has finite internal resistance, current varies with voltage</li>
              <li><strong class="text-white">KCL Rule:</strong> ΣI_in = ΣI_out at any node (current sources follow this law)</li>
              <li><strong class="text-white">Parallel Connection:</strong> Currents add directly (I_total = I₁ + I₂ + ...)</li>
              <li><strong class="text-white">Series Connection:</strong> Same current flows through all series current sources</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold text-teal-300 mb-2">🎯 Key Applications</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li><strong class="text-white">Current Mirrors:</strong> Copy reference current to multiple branches (IC biasing)</li>
              <li><strong class="text-white">LED Drivers:</strong> Constant current ensures consistent brightness</li>
              <li><strong class="text-white">Battery Charging:</strong> Constant current phase for fast charging</li>
              <li><strong class="text-white">Transducer Interfaces:</strong> 4-20mA current loops for industrial sensors</li>
              <li><strong class="text-white">Active Loads:</strong> High-impedance loads for testing amplifiers</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-600/40">
          <h3 class="text-lg font-bold text-teal-300 mb-2">📐 Key Formulas</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">KCL at Node:</strong></p>
              <code class="text-teal-200">ΣI_in = ΣI_out</code>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Parallel Currents:</strong></p>
              <code class="text-teal-200">I_total = I₁ + I₂ + I₃ + ...</code>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Ohm's Law:</strong></p>
              <code class="text-teal-200">V = I × R</code>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Practical Source:</strong></p>
              <code class="text-teal-200">I_actual ≈ I_ideal × (R_int / (R_int + R_load))</code>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-600/40">
          <h3 class="text-lg font-bold text-teal-300 mb-2">💡 Design Tips</h3>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• <strong class="text-white">Current sources in parallel:</strong> Add currents (same direction) or subtract (opposing directions)</li>
            <li>• <strong class="text-white">Current sources in series:</strong> All must have same current value (or one dominates)</li>
            <li>• <strong class="text-white">Practical limitation:</strong> Voltage compliance range (max voltage before current source fails)</li>
            <li>• <strong class="text-white">Output resistance:</strong> Higher is better (more ideal behavior)</li>
            <li>• <strong class="text-white">Norton equivalent:</strong> Any circuit can be represented as current source + parallel resistance</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Current source parameters
const source1Current = ref(20)
const source2Current = ref(15)
const source1Resistance = ref(10000)
const source2Resistance = ref(10000)
const source1Enabled = ref(true)
const source2Enabled = ref(true)
const practicalMode = ref(false)

// Resistors
const r1 = ref(1000)
const r2 = ref(1000)
const r3 = ref(1000)

// Node voltage calculations (using nodal analysis)
const nodeAVoltage = computed(() => {
  if (!source1Enabled && !source2Enabled) return 0
  
  // Simplified nodal analysis for this specific circuit topology
  // Node A is at top, connected to R1 (left) and R3 (right)
  const i1 = source1Enabled ? source1Current.value / 1000 : 0 // Convert mA to A
  const i2 = source2Enabled ? source2Current.value / 1000 : 0
  
  // Voltage at node depends on current sources and resistances
  // Using simplified parallel/series analysis
  const r1_val = r1.value
  const r2_val = r2.value
  const r3_val = r3.value
  
  // Equivalent resistance seen by current sources
  const r_parallel = (r1_val * r3_val) / (r1_val + r3_val)
  
  // Node A voltage (relative to ground at bottom)
  const v_a = (i1 + i2) * r_parallel
  
  return v_a * 1000 // Convert to mV, then display as V
})

const nodeBVoltage = computed(() => {
  // Node B is in the middle, voltage divider effect
  const v_a = nodeAVoltage.value
  const ratio = r2.value / (r1.value + r2.value)
  return v_a * ratio
})

const nodeCVoltage = computed(() => {
  // Node C is ground reference (0V)
  return 0
})

// Branch currents
const currentR1 = computed(() => {
  const v_a = nodeAVoltage.value
  const v_b = nodeBVoltage.value
  const voltage = v_a - v_b
  return (voltage / r1.value) * 1000 // Convert to mA
})

const currentR2 = computed(() => {
  const v_b = nodeBVoltage.value
  const voltage = v_b - nodeCVoltage.value
  return (voltage / r2.value) * 1000 // Convert to mA
})

const currentR3 = computed(() => {
  const v_a = nodeAVoltage.value
  const voltage = v_a - nodeCVoltage.value
  return (voltage / r3.value) * 1000 // Convert to mA
})

// KCL verification
const kclNodeA = computed(() => {
  const i_in = (source1Enabled ? source1Current.value : 0) + (source2Enabled ? source2Current.value : 0)
  const i_out = currentR1.value + currentR3.value
  return Math.abs(i_in - i_out) < 0.1 // Allow small numerical error
})

const kclNodeB = computed(() => {
  const i_in = currentR1.value
  const i_out = currentR2.value
  return Math.abs(i_in - i_out) < 0.1
})

const kclNodeC = computed(() => {
  const i_in = currentR2.value + currentR3.value
  const i_out = 0 // Ground node
  return Math.abs(i_in) < 0.1 // Should be close to 0
})

// Preset loader
const loadPreset = (preset) => {
  switch (preset) {
    case 'currentMirror':
      source1Current.value = 10
      source2Current.value = 10
      source1Enabled.value = true
      source2Enabled.value = true
      r1.value = 1000
      r2.value = 1000
      r3.value = 1000
      practicalMode.value = false
      break
    case 'ledArray':
      source1Current.value = 20
      source2Current.value = 20
      source1Enabled.value = true
      source2Enabled.value = true
      r1.value = 100
      r2.value = 100
      r3.value = 100
      practicalMode.value = false
      break
    case 'solar':
      source1Current.value = 50
      source2Current.value = 30
      source1Enabled.value = true
      source2Enabled.value = true
      r1.value = 100
      r2.value = 100
      r3.value = 100
      practicalMode.value = true
      source1Resistance.value = 100
      source2Resistance.value = 150
      break
    case 'battery':
      source1Current.value = 100
      source2Current.value = 50
      source1Enabled.value = true
      source2Enabled.value = false
      r1.value = 50
      r2.value = 50
      r3.value = 100
      practicalMode.value = true
      source1Resistance.value = 50
      break
  }
}

// Watch for practical mode changes
watch(practicalMode, (newVal) => {
  if (!newVal) {
    source1Resistance.value = 10000
    source2Resistance.value = 10000
  } else {
    source1Resistance.value = 100
    source2Resistance.value = 100
  }
})
</script>

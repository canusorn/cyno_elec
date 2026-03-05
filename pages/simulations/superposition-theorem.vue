<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ Superposition Theorem Simulator
        </h1>
        <p class="text-purple-300 text-lg">Explore how multiple sources affect linear circuits</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Circuit Configuration
          </h2>

          <!-- Source 1 Controls -->
          <div class="mb-6 p-4 bg-blue-500/20 rounded-xl border border-blue-400/40">
            <h3 class="text-xl font-bold text-blue-300 mb-4">🔋 Source 1 (V₁)</h3>
            <div class="space-y-4">
              <div>
                <label class="text-white text-sm mb-1 block">Voltage: {{ source1Voltage }}V</label>
                <input
                  type="range"
                  v-model.number="source1Voltage"
                  min="0"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              <div class="flex gap-2">
                <button
                  @click="source1Enabled = !source1Enabled"
                  :class="source1Enabled ? 'bg-blue-500' : 'bg-gray-600'"
                  class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
                >
                  {{ source1Enabled ? '✓ ON' : '✗ OFF' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Source 2 Controls -->
          <div class="mb-6 p-4 bg-green-500/20 rounded-xl border border-green-400/40">
            <h3 class="text-xl font-bold text-green-300 mb-4">🔋 Source 2 (V₂)</h3>
            <div class="space-y-4">
              <div>
                <label class="text-white text-sm mb-1 block">Voltage: {{ source2Voltage }}V</label>
                <input
                  type="range"
                  v-model.number="source2Voltage"
                  min="0"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-green-900 rounded-lg appearance-none cursor-pointer"
                >
              </div>
              <div class="flex gap-2">
                <button
                  @click="source2Enabled = !source2Enabled"
                  :class="source2Enabled ? 'bg-green-500' : 'bg-gray-600'"
                  class="flex-1 py-2 px-4 rounded-lg text-white font-bold transition-all"
                >
                  {{ source2Enabled ? '✓ ON' : '✗ OFF' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Resistors -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-yellow-300 mb-4">⚡ Resistors</h3>
            
            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₁: {{ r1 }}Ω</label>
              <input
                type="range"
                v-model.number="r1"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₂: {{ r2 }}Ω</label>
              <input
                type="range"
                v-model.number="r2"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>

            <div class="p-3 bg-yellow-500/10 rounded-lg">
              <label class="text-white text-sm mb-1 block">R₃: {{ r3 }}Ω</label>
              <input
                type="range"
                v-model.number="r3"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
              >
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mt-6">
            <h3 class="text-lg font-bold text-white mb-3">🎯 Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('equal')"
                class="py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Equal Sources
              </button>
              <button
                @click="loadPreset('opposing')"
                class="py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Opposing
              </button>
              <button
                @click="loadPreset('dominant1')"
                class="py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                V₁ Dominant
              </button>
              <button
                @click="loadPreset('dominant2')"
                class="py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                V₂ Dominant
              </button>
            </div>
          </div>
        </div>

        <!-- Circuit Diagram & Visualization -->
        <div class="space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">📊 Circuit Diagram</h2>
            <div class="bg-slate-900 rounded-xl p-4">
              <svg viewBox="0 0 400 250" class="w-full h-auto">
                <!-- Grid -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="400" height="250" fill="url(#grid)"/>
                
                <!-- Source 1 -->
                <g :class="{ 'opacity-30': !source1Enabled }">
                  <circle cx="60" cy="80" r="18" fill="none" stroke="#3B82F6" stroke-width="2"/>
                  <text x="60" y="85" text-anchor="middle" fill="#3B82F6" font-size="14" font-weight="bold">V₁</text>
                  <text x="60" y="55" text-anchor="middle" fill="#3B82F6" font-size="11">{{ source1Voltage }}V</text>
                  <!-- Wire from S1+ -->
                  <line x1="60" y1="62" x2="60" y2="40" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="60" y1="40" x2="150" y2="40" stroke="#3B82F6" stroke-width="2"/>
                </g>
                
                <!-- Source 2 -->
                <g :class="{ 'opacity-30': !source2Enabled }">
                  <circle cx="340" cy="170" r="18" fill="none" stroke="#10B981" stroke-width="2"/>
                  <text x="340" y="175" text-anchor="middle" fill="#10B981" font-size="14" font-weight="bold">V₂</text>
                  <text x="340" y="205" text-anchor="middle" fill="#10B981" font-size="11">{{ source2Voltage }}V</text>
                  <!-- Wire to S2+ -->
                  <line x1="340" y1="152" x2="340" y2="130" stroke="#10B981" stroke-width="2"/>
                  <line x1="340" y1="130" x2="250" y2="130" stroke="#10B981" stroke-width="2"/>
                </g>
                
                <!-- R1 (top) -->
                <g>
                  <rect x="140" y="35" width="60" height="10" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
                  <text x="170" y="30" text-anchor="middle" fill="#FBBF24" font-size="12" font-weight="bold">R₁={{ r1 }}Ω</text>
                </g>
                
                <!-- R2 (right vertical) -->
                <g>
                  <rect x="245" y="80" width="10" height="50" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
                  <text x="270" y="108" text-anchor="start" fill="#FBBF24" font-size="12" font-weight="bold">R₂={{ r2 }}Ω</text>
                </g>
                
                <!-- R3 (bottom) -->
                <g>
                  <rect x="140" y="205" width="60" height="10" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
                  <text x="170" y="235" text-anchor="middle" fill="#FBBF24" font-size="12" font-weight="bold">R₃={{ r3 }}Ω</text>
                </g>
                
                <!-- Main wires -->
                <line x1="150" y1="40" x2="150" y2="80" stroke="#64748B" stroke-width="2"/>
                <line x1="200" y1="40" x2="200" y2="80" stroke="#64748B" stroke-width="2"/>
                <line x1="250" y1="40" x2="250" y2="80" stroke="#64748B" stroke-width="2"/>
                
                <line x1="150" y1="130" x2="150" y2="205" stroke="#64748B" stroke-width="2"/>
                <line x1="200" y1="130" x2="200" y2="205" stroke="#64748B" stroke-width="2"/>
                <line x1="250" y1="130" x2="250" y2="205" stroke="#64748B" stroke-width="2"/>
                
                <!-- Node dots -->
                <circle cx="150" cy="40" r="4" fill="#A855F7"/>
                <circle cx="200" cy="40" r="4" fill="#A855F7"/>
                <circle cx="250" cy="40" r="4" fill="#A855F7"/>
                
                <circle cx="150" cy="130" r="4" fill="#A855F7"/>
                <circle cx="200" cy="130" r="4" fill="#A855F7"/>
                <circle cx="250" cy="130" r="4" fill="#A855F7"/>
                
                <!-- Ground symbols -->
                <line x1="60" y1="98" x2="60" y2="115" stroke="#3B82F6" stroke-width="2"/>
                <line x1="50" y1="115" x2="70" y2="115" stroke="#3B82F6" stroke-width="2"/>
                <line x1="53" y1="120" x2="67" y2="120" stroke="#3B82F6" stroke-width="2"/>
                <line x1="56" y1="125" x2="64" y2="125" stroke="#3B82F6" stroke-width="2"/>
                
                <line x1="340" y1="188" x2="340" y2="205" stroke="#10B981" stroke-width="2"/>
                <line x1="330" y1="205" x2="350" y2="205" stroke="#10B981" stroke-width="2"/>
                <line x1="333" y1="210" x2="347" y2="210" stroke="#10B981" stroke-width="2"/>
                <line x1="336" y1="215" x2="344" y2="215" stroke="#10B981" stroke-width="2"/>
                
                <!-- Animated current flow arrows -->
                <g v-if="source1Enabled || source2Enabled">
                  <path :d="currentArrowPath" fill="none" stroke="#A855F7" stroke-width="2" stroke-dasharray="5,5">
                    <animate attributeName="stroke-dashoffset" :dur="animationSpeed" repeatCount="indefinite" from="0" to="-10"/>
                  </path>
                  <polygon :points="arrowHead" fill="#A855F7"/>
                </g>
              </svg>
            </div>
          </div>

          <!-- Current Contributions Bar Chart -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">📈 Current Contributions</h2>
            <div class="space-y-4">
              <!-- Source 1 Contribution -->
              <div v-if="source1Enabled" class="p-4 bg-blue-500/20 rounded-xl border border-blue-400/40">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-blue-300 font-bold">From V₁</span>
                  <span class="text-white font-mono">{{ i1.toFixed(3) }}A</span>
                </div>
                <div class="w-full bg-blue-900 rounded-full h-6 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 flex items-center justify-end pr-2"
                    :style="{ width: Math.min(Math.abs(i1) * 20, 100) + '%' }"
                  >
                    <span class="text-xs text-white font-bold">{{ Math.abs(i1).toFixed(2) }}A</span>
                  </div>
                </div>
              </div>

              <!-- Source 2 Contribution -->
              <div v-if="source2Enabled" class="p-4 bg-green-500/20 rounded-xl border border-green-400/40">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-green-300 font-bold">From V₂</span>
                  <span class="text-white font-mono">{{ i2.toFixed(3) }}A</span>
                </div>
                <div class="w-full bg-green-900 rounded-full h-6 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 flex items-center justify-end pr-2"
                    :style="{ width: Math.min(Math.abs(i2) * 20, 100) + '%' }"
                  >
                    <span class="text-xs text-white font-bold">{{ Math.abs(i2).toFixed(2) }}A</span>
                  </div>
                </div>
              </div>

              <!-- Total Current -->
              <div class="p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-purple-300 font-bold text-lg">Total (Sum)</span>
                  <span class="text-white font-mono text-lg">{{ iTotal.toFixed(3) }}A</span>
                </div>
                <div class="w-full bg-purple-900 rounded-full h-8 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-purple-600 to-pink-400 transition-all duration-300 flex items-center justify-end pr-2"
                    :style="{ width: Math.min(Math.abs(iTotal) * 20, 100) + '%' }"
                  >
                    <span class="text-sm text-white font-bold">{{ Math.abs(iTotal).toFixed(2) }}A</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Results -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
        <h2 class="text-2xl font-bold text-white mb-6">📋 Detailed Analysis</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Node Voltages -->
          <div class="p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <h3 class="text-lg font-bold text-cyan-300 mb-3">⚡ Node Voltages</h3>
            <div class="space-y-2 text-white">
              <div class="flex justify-between">
                <span>Node A:</span>
                <span class="font-mono">{{ vA.toFixed(2) }}V</span>
              </div>
              <div class="flex justify-between">
                <span>Node B:</span>
                <span class="font-mono">{{ vB.toFixed(2) }}V</span>
              </div>
              <div class="flex justify-between">
                <span>Node C:</span>
                <span class="font-mono">{{ vC.toFixed(2) }}V</span>
              </div>
            </div>
          </div>

          <!-- Branch Currents -->
          <div class="p-4 bg-orange-500/20 rounded-xl border border-orange-400/40">
            <h3 class="text-lg font-bold text-orange-300 mb-3">🔌 Branch Currents</h3>
            <div class="space-y-2 text-white">
              <div class="flex justify-between">
                <span>Through R₁:</span>
                <span class="font-mono">{{ iR1.toFixed(3) }}A</span>
              </div>
              <div class="flex justify-between">
                <span>Through R₂:</span>
                <span class="font-mono">{{ iR2.toFixed(3) }}A</span>
              </div>
              <div class="flex justify-between">
                <span>Through R₃:</span>
                <span class="font-mono">{{ iR3.toFixed(3) }}A</span>
              </div>
            </div>
          </div>

          <!-- Power Dissipation -->
          <div class="p-4 bg-pink-500/20 rounded-xl border border-pink-400/40">
            <h3 class="text-lg font-bold text-pink-300 mb-3">🔥 Power Dissipation</h3>
            <div class="space-y-2 text-white">
              <div class="flex justify-between">
                <span>R₁:</span>
                <span class="font-mono">{{ pR1.toFixed(2) }}W</span>
              </div>
              <div class="flex justify-between">
                <span>R₂:</span>
                <span class="font-mono">{{ pR2.toFixed(2) }}W</span>
              </div>
              <div class="flex justify-between">
                <span>R₃:</span>
                <span class="font-mono">{{ pR3.toFixed(2) }}W</span>
              </div>
              <div class="flex justify-between border-t border-pink-400/50 pt-2 mt-2">
                <span class="font-bold">Total:</span>
                <span class="font-mono font-bold">{{ pTotal.toFixed(2) }}W</span>
              </div>
            </div>
          </div>

          <!-- Step-by-Step -->
          <div class="p-4 bg-emerald-500/20 rounded-xl border border-emerald-400/40">
            <h3 class="text-lg font-bold text-emerald-300 mb-3">📝 Superposition Steps</h3>
            <div class="text-white text-sm space-y-2">
              <p><span class="text-blue-300 font-bold">Step 1:</span> Consider V₁ alone, short V₂</p>
              <p class="text-gray-400 pl-4">I₁' = {{ i1Prime.toFixed(3) }}A</p>
              <p><span class="text-green-300 font-bold">Step 2:</span> Consider V₂ alone, short V₁</p>
              <p class="text-gray-400 pl-4">I₂' = {{ i2Prime.toFixed(3) }}A</p>
              <p><span class="text-purple-300 font-bold">Step 3:</span> Sum contributions</p>
              <p class="text-gray-400 pl-4">I = I₁' + I₂' = {{ iTotal.toFixed(3) }}A</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
        <h2 class="text-2xl font-bold text-white mb-6">📚 Superposition Theorem</h2>
        <div class="grid md:grid-cols-2 gap-6 text-white">
          <div>
            <h3 class="text-xl font-bold text-purple-300 mb-3">🎯 What is Superposition?</h3>
            <p class="mb-4">
              The Superposition Theorem states that in a linear circuit with multiple independent sources, 
              the voltage across or current through any element is the algebraic sum of the voltages or 
              currents produced by each independent source acting alone.
            </p>
            <h3 class="text-xl font-bold text-purple-300 mb-3">⚙️ Key Principles</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li>Only works with <strong class="text-white">linear circuits</strong> (resistors, linear sources)</li>
              <li>Turn off all sources except one: <strong class="text-white">short voltage sources</strong>, <strong class="text-white">open current sources</strong></li>
              <li>Calculate the contribution from the active source</li>
              <li>Repeat for each source, then <strong class="text-white">algebraically sum</strong> all contributions</li>
              <li>Sign matters! Current directions affect the sum</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold text-purple-300 mb-3">🔬 When to Use</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300 mb-4">
              <li>Circuits with 2-3 independent sources</li>
              <li>When you need to understand each source's individual effect</li>
              <li>For analyzing sensitivity to source changes</li>
              <li>Educational purposes to understand circuit behavior</li>
            </ul>
            <h3 class="text-xl font-bold text-purple-300 mb-3">⚠️ Limitations</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li>Does NOT work with non-linear components (diodes, transistors)</li>
              <li>Cannot be used for power calculations directly</li>
              <li>Power is proportional to I² or V², not linear</li>
              <li>Other methods (Nodal, Mesh analysis) may be faster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Reactive state
const source1Voltage = ref(12)
const source2Voltage = ref(6)
const source1Enabled = ref(true)
const source2Enabled = ref(true)
const r1 = ref(10)
const r2 = ref(20)
const r3 = ref(30)

// Calculate equivalent resistances and node voltages
const vA = computed(() => {
  if (!source1Enabled.value && !source2Enabled.value) return 0
  
  // Node A (top left) analysis
  const g1 = 1 / r1.value
  const g2 = 1 / r2.value
  
  let numerator = 0
  if (source1Enabled.value) {
    numerator += source1Voltage.value * g1
  }
  if (source2Enabled.value) {
    numerator += source2Voltage.value * g2
  }
  
  const v = numerator / (g1 + g2 + 1 / r3.value)
  return isNaN(v) ? 0 : v
})

const vB = computed(() => {
  if (!source1Enabled.value && !source2Enabled.value) return 0
  // Node B (top right) - same as Node A in this parallel topology
  return vA.value
})

const vC = computed(() => {
  if (!source1Enabled.value && !source2Enabled.value) return 0
  // Node C (bottom) - ground reference
  return 0
})

// Branch currents
const iR1 = computed(() => {
  if (!source1Enabled.value) return 0
  return (source1Voltage.value - vA.value) / r1.value
})

const iR2 = computed(() => {
  if (!source2Enabled.value) return 0
  return (source2Voltage.value - vA.value) / r2.value
})

const iR3 = computed(() => {
  return vA.value / r3.value
})

// Source contributions for superposition
const i1Prime = computed(() => {
  // V1 acting alone (V2 shorted)
  const rParallel = 1 / (1 / r2.value + 1 / r3.value)
  const rTotal = r1.value + rParallel
  return source1Voltage.value / rTotal
})

const i2Prime = computed(() => {
  // V2 acting alone (V1 shorted)
  const rParallel = 1 / (1 / r1.value + 1 / r3.value)
  const rTotal = r2.value + rParallel
  return source2Voltage.value / rTotal
})

// Individual source contributions (for display)
const i1 = computed(() => {
  return source1Enabled.value ? i1Prime.value : 0
})

const i2 = computed(() => {
  return source2Enabled.value ? i2Prime.value : 0
})

// Total current (superposition)
const iTotal = computed(() => {
  return i1.value + i2.value
})

// Power calculations
const pR1 = computed(() => iR1.value * iR1.value * r1.value)
const pR2 = computed(() => iR2.value * iR2.value * r2.value)
const pR3 = computed(() => iR3.value * iR3.value * r3.value)
const pTotal = computed(() => pR1.value + pR2.value + pR3.value)

// Animation
const animationSpeed = computed(() => {
  const speed = Math.max(0.5, 2 / (Math.abs(iTotal.value) + 0.1))
  return `${speed}s`
})

const currentArrowPath = computed(() => {
  // Create a circular path through the circuit
  return 'M 150 40 L 150 80 L 150 130 L 150 205 L 200 205 L 200 130 L 200 40 Z'
})

const arrowHead = computed(() => {
  // Arrow head position based on current direction
  if (iTotal.value >= 0) {
    return '150,50 145,45 155,45'
  } else {
    return '150,200 145,205 155,205'
  }
})

// Presets
const loadPreset = (preset) => {
  switch (preset) {
    case 'equal':
      source1Voltage.value = 12
      source2Voltage.value = 12
      r1.value = 10
      r2.value = 10
      r3.value = 20
      break
    case 'opposing':
      source1Voltage.value = 12
      source2Voltage.value = 12
      r1.value = 10
      r2.value = 10
      r3.value = 5
      break
    case 'dominant1':
      source1Voltage.value = 24
      source2Voltage.value = 6
      r1.value = 5
      r2.value = 20
      r3.value = 15
      break
    case 'dominant2':
      source1Voltage.value = 6
      source2Voltage.value = 24
      r1.value = 20
      r2.value = 5
      r3.value = 15
      break
  }
  source1Enabled.value = true
  source2Enabled.value = true
}
</script>

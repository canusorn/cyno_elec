<script setup lang="ts">
import { ref, computed } from 'vue'

// State for calculator mode
const calculatorMode = ref<'kvl' | 'kcl' | 'mesh'>('kvl')

// KVL State
const kvlComponents = ref([
  { type: 'voltage', value: 12, label: 'V1' },
  { type: 'resistance', value: 100, label: 'R1' },
  { type: 'resistance', value: 220, label: 'R2' },
  { type: 'resistance', value: 330, label: 'R3' }
])

// KCL State
const kclNode = ref({
  incoming: [
    { value: 0.1, label: 'I1' },
    { value: 0.05, label: 'I2' }
  ],
  outgoing: [
    { value: 0.08, label: 'I3' },
    { value: 0, label: 'I4 (unknown)' }
  ]
})

// Mesh Analysis State
const meshLoops = ref([
  {
    components: [
      { type: 'voltage', value: 12, label: 'V1' },
      { type: 'resistance', value: 100, label: 'R1' },
      { type: 'resistance', value: 220, label: 'R2' }
    ]
  },
  {
    components: [
      { type: 'voltage', value: 0, label: 'V2' },
      { type: 'resistance', value: 220, label: 'R2 (shared)' },
      { type: 'resistance', value: 330, label: 'R3' }
    ]
  }
])

// Computed results for KVL
const kvlResults = computed(() => {
  const voltageSources = kvlComponents.value
    .filter(c => c.type === 'voltage')
    .reduce((sum, c) => sum + c.value, 0)
  
  const resistances = kvlComponents.value
    .filter(c => c.type === 'resistance')
    .reduce((sum, c) => sum + c.value, 0)
  
  const current = resistances > 0 ? voltageSources / resistances : 0
  
  const voltageDrops = kvlComponents.value
    .filter(c => c.type === 'resistance')
    .map(c => ({
      label: c.label,
      voltage: current * c.value,
      resistance: c.value
    }))
  
  const totalVoltageDrops = voltageDrops.reduce((sum, v) => sum + v.voltage, 0)
  const kvlBalance = voltageSources - totalVoltageDrops
  
  return {
    voltageSources,
    totalResistance: resistances,
    current,
    voltageDrops,
    totalVoltageDrops,
    kvlBalance,
    isValid: Math.abs(kvlBalance) < 0.001
  }
})

// Computed results for KCL
const kclResults = computed(() => {
  const incomingTotal = kclNode.value.incoming.reduce((sum, i) => sum + i.value, 0)
  const knownOutgoing = kclNode.value.outgoing.filter(i => i.value > 0).reduce((sum, i) => sum + i.value, 0)
  const unknownOutgoing = incomingTotal - knownOutgoing
  
  return {
    incomingTotal,
    knownOutgoing,
    unknownOutgoing,
    kclBalance: incomingTotal - (knownOutgoing + unknownOutgoing),
    isValid: Math.abs(incomingTotal - (knownOutgoing + unknownOutgoing)) < 0.001
  }
})

// Computed results for Mesh Analysis
const meshResults = computed(() => {
  // Simplified 2-loop mesh analysis
  const loop1 = meshLoops.value[0].components
  const loop2 = meshLoops.value[1].components
  
  const R1 = loop1.find(c => c.label === 'R1')?.value || 0
  const R2 = loop1.find(c => c.label === 'R2')?.value || 0
  const R3 = loop2.find(c => c.label === 'R3')?.value || 0
  const V1 = loop1.find(c => c.type === 'voltage')?.value || 0
  
  // Mesh equations: (R1+R2)I1 - R2*I2 = V1, -R2*I1 + (R2+R3)I2 = 0
  const a = R1 + R2
  const b = -R2
  const c = -R2
  const d = R2 + R3
  
  const determinant = a * d - b * c
  const I1 = determinant !== 0 ? (V1 * d - b * 0) / determinant : 0
  const I2 = determinant !== 0 ? (a * 0 - V1 * c) / determinant : 0
  const I_R2 = I1 - I2
  
  return {
    I1,
    I2,
    I_R2,
    matrix: [[a, b, V1], [c, d, 0]],
    determinant
  }
})

// Helper functions
const addKVLComponent = () => {
  const count = kvlComponents.value.filter(c => c.type === 'resistance').length + 1
  kvlComponents.value.push({
    type: 'resistance',
    value: 100,
    label: `R${count}`
  })
}

const removeKVLComponent = (index: number) => {
  if (kvlComponents.value.length > 2) {
    kvlComponents.value.splice(index, 1)
  }
}

const addIncomingCurrent = () => {
  const count = kclNode.value.incoming.length + 1
  kclNode.value.incoming.push({ value: 0.1, label: `I${count}` })
}

const addOutgoingCurrent = () => {
  const count = kclNode.value.outgoing.length + 1
  kclNode.value.outgoing.push({ value: 0.05, label: `I${count}` })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Kirchhoff's Laws Solver
        </h1>
        <p class="text-xl text-gray-300">
          Analyze circuits using Kirchhoff's Voltage and Current Laws
        </p>
      </div>

      <!-- Mode Selector -->
      <div class="flex justify-center gap-4 mb-8">
        <button
          @click="calculatorMode = 'kvl'"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all',
            calculatorMode === 'kvl'
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          ]"
        >
          KVL (Series)
        </button>
        <button
          @click="calculatorMode = 'kcl'"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all',
            calculatorMode === 'kcl'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          ]"
        >
          KCL (Parallel Node)
        </button>
        <button
          @click="calculatorMode = 'mesh'"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all',
            calculatorMode === 'mesh'
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          ]"
        >
          Mesh Analysis
        </button>
      </div>

      <!-- KVL Calculator -->
      <div v-if="calculatorMode === 'kvl'" class="space-y-6">
        <!-- KVL Circuit Diagram -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
          <h2 class="text-2xl font-bold mb-4 text-cyan-400">Series Circuit (KVL)</h2>
          
          <!-- SVG Circuit Diagram -->
          <div class="bg-slate-900 rounded-xl p-4 mb-6">
            <svg viewBox="0 0 800 300" class="w-full h-auto">
              <!-- Main loop -->
              <rect x="50" y="50" width="700" height="200" fill="none" stroke="#22d3ee" stroke-width="3" rx="10"/>
              
              <!-- Voltage Source -->
              <g transform="translate(120, 150)">
                <circle cx="0" cy="0" r="35" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
                <text x="0" y="5" text-anchor="middle" fill="#22d3ee" font-size="18" font-weight="bold">V₁</text>
                <text x="0" y="55" text-anchor="middle" fill="#94a3b8" font-size="14">{{ kvlResults.voltageSources }}V</text>
                <!-- Plus/Minus -->
                <text x="-20" y="-10" text-anchor="middle" fill="#ef4444" font-size="16" font-weight="bold">+</text>
                <text x="-20" y="20" text-anchor="middle" fill="#3b82f6" font-size="16" font-weight="bold">-</text>
              </g>
              
              <!-- Resistors -->
              <g v-for="(comp, index) in kvlComponents.filter(c => c.type === 'resistance')" 
                 :transform="`translate(${250 + index * 140}, 150)`">
                <rect x="-40" y="-20" width="80" height="40" fill="#1e293b" stroke="#a855f7" stroke-width="2" rx="5"/>
                <text x="0" y="5" text-anchor="middle" fill="#a855f7" font-size="16" font-weight="bold">{{ comp.label }}</text>
                <text x="0" y="45" text-anchor="middle" fill="#94a3b8" font-size="12">{{ comp.value }}Ω</text>
              </g>
              
              <!-- Current direction arrow -->
              <g transform="translate(400, 30)">
                <line x1="-60" y1="0" x2="60" y2="0" stroke="#fbbf24" stroke-width="3" marker-end="url(#arrowhead)"/>
                <text x="0" y="-10" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="bold">
                  I = {{ kvlResults.current.toFixed(3) }}A
                </text>
              </g>
              
              <!-- Arrow marker definition -->
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#fbbf24"/>
                </marker>
              </defs>
            </svg>
          </div>

          <!-- Components List -->
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-cyan-400">Voltage Sources</h3>
              <div v-for="(comp, index) in kvlComponents.filter(c => c.type === 'voltage')" 
                   :key="index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-cyan-400 font-mono font-bold">{{ comp.label }}</span>
                <input 
                  v-model.number="comp.value" 
                  type="number" 
                  step="0.1"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">V</span>
              </div>
            </div>
            
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-purple-400">Resistances</h3>
              <div v-for="(comp, index) in kvlComponents.filter(c => c.type === 'resistance')" 
                   :key="'res-' + index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-purple-400 font-mono font-bold">{{ comp.label }}</span>
                <input 
                  v-model.number="comp.value" 
                  type="number" 
                  step="1"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">Ω</span>
                <button 
                  @click="removeKVLComponent(kvlComponents.indexOf(comp))"
                  class="text-red-400 hover:text-red-300 px-2"
                  v-if="kvlComponents.length > 2"
                >
                  ✕
                </button>
              </div>
              <button 
                @click="addKVLComponent"
                class="w-full bg-purple-600 hover:bg-purple-500 rounded-lg py-2 text-sm font-semibold transition-colors"
              >
                + Add Resistor
              </button>
            </div>
          </div>
        </div>

        <!-- KVL Results -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
          <h2 class="text-2xl font-bold mb-4 text-cyan-400">Results & Verification</h2>
          
          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Total Voltage</div>
              <div class="text-3xl font-bold text-cyan-400">{{ kvlResults.voltageSources }}V</div>
            </div>
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Total Resistance</div>
              <div class="text-3xl font-bold text-purple-400">{{ kvlResults.totalResistance }}Ω</div>
            </div>
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Circuit Current</div>
              <div class="text-3xl font-bold text-yellow-400">{{ kvlResults.current.toFixed(3) }}A</div>
            </div>
          </div>

          <div class="bg-slate-900/50 rounded-xl p-4 mb-4">
            <h3 class="text-lg font-semibold mb-3 text-yellow-400">Voltage Drops Across Each Resistor</h3>
            <div class="space-y-2">
              <div v-for="drop in kvlResults.voltageDrops" :key="drop.label" 
                   class="flex justify-between items-center bg-slate-800/50 rounded-lg px-4 py-2">
                <span class="text-purple-400 font-mono">{{ drop.label }}</span>
                <span class="text-gray-400">R = {{ drop.resistance }}Ω</span>
                <span class="text-cyan-400 font-bold">V = {{ drop.voltage.toFixed(2) }}V</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl" 
               :class="kvlResults.isValid ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'">
            <div class="text-4xl">
              {{ kvlResults.isValid ? '✅' : '❌' }}
            </div>
            <div>
              <div class="font-bold text-lg" :class="kvlResults.isValid ? 'text-green-400' : 'text-red-400'">
                KVL Verification
              </div>
              <div class="text-gray-300">
                ΣV_sources = {{ kvlResults.voltageSources }}V, ΣV_drops = {{ kvlResults.totalVoltageDrops.toFixed(2) }}V
              </div>
              <div class="text-sm" :class="kvlResults.isValid ? 'text-green-400' : 'text-red-400'">
                Balance: {{ kvlResults.kvlBalance.toFixed(4) }}V {{ kvlResults.isValid ? '✓ KVL Satisfied!' : '✗ KVL Violated!' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KCL Calculator -->
      <div v-if="calculatorMode === 'kcl'" class="space-y-6">
        <!-- KCL Node Diagram -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">Node Current Analysis (KCL)</h2>
          
          <!-- SVG Node Diagram -->
          <div class="bg-slate-900 rounded-xl p-4 mb-6">
            <svg viewBox="0 0 800 300" class="w-full h-auto">
              <!-- Central Node -->
              <circle cx="400" cy="150" r="40" fill="#a855f7" stroke="#fff" stroke-width="3"/>
              <text x="400" y="155" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold">Node</text>
              
              <!-- Incoming Currents (left side) -->
              <g v-for="(current, index) in kclNode.incoming" :key="'in-' + index">
                <line :x1="50" :y1="60 + index * 80" x2="360" y2="150" 
                      stroke="#22d3ee" stroke-width="3" marker-end="url(#arrowhead-in)"/>
                <text :x="120" :y="50 + index * 80" fill="#22d3ee" font-size="16" font-weight="bold">
                  {{ current.label }} = {{ current.value }}A →
                </text>
              </g>
              
              <!-- Outgoing Currents (right side) -->
              <g v-for="(current, index) in kclNode.outgoing" :key="'out-' + index">
                <line x1="440" y1="150" :x2="750" :y2="60 + index * 80" 
                      stroke="#f472b6" stroke-width="3" marker-end="url(#arrowhead-out)"/>
                <text :x="520" :y="50 + index * 80" fill="#f472b6" font-size="16" font-weight="bold">
                  → {{ current.label }} = {{ current.value || kclResults.unknownOutgoing.toFixed(3) }}A
                </text>
              </g>
              
              <!-- Arrow markers -->
              <defs>
                <marker id="arrowhead-in" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#22d3ee"/>
                </marker>
                <marker id="arrowhead-out" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#f472b6"/>
                </marker>
              </defs>
            </svg>
          </div>

          <!-- Currents List -->
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-cyan-400">Incoming Currents (→ Node)</h3>
              <div v-for="(current, index) in kclNode.incoming" 
                   :key="'in-' + index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-cyan-400 font-mono font-bold">{{ current.label }}</span>
                <input 
                  v-model.number="current.value" 
                  type="number" 
                  step="0.01"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">A</span>
              </div>
              <button 
                @click="addIncomingCurrent"
                class="w-full bg-cyan-600 hover:bg-cyan-500 rounded-lg py-2 text-sm font-semibold transition-colors"
              >
                + Add Incoming Current
              </button>
            </div>
            
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-pink-400">Outgoing Currents (Node →)</h3>
              <div v-for="(current, index) in kclNode.outgoing" 
                   :key="'out-' + index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-pink-400 font-mono font-bold">{{ current.label }}</span>
                <input 
                  v-model.number="current.value" 
                  type="number" 
                  step="0.01"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">A</span>
              </div>
              <button 
                @click="addOutgoingCurrent"
                class="w-full bg-pink-600 hover:bg-pink-500 rounded-lg py-2 text-sm font-semibold transition-colors"
              >
                + Add Outgoing Current
              </button>
            </div>
          </div>
        </div>

        <!-- KCL Results -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-2xl font-bold mb-4 text-purple-400">KCL Analysis Results</h2>
          
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Σ I_in (Total Incoming)</div>
              <div class="text-3xl font-bold text-cyan-400">{{ kclResults.incomingTotal.toFixed(3) }}A</div>
            </div>
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Σ I_out (Total Outgoing)</div>
              <div class="text-3xl font-bold text-pink-400">{{ (kclResults.knownOutgoing + kclResults.unknownOutgoing).toFixed(3) }}A</div>
            </div>
          </div>

          <div v-if="kclResults.unknownOutgoing > 0" class="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-4 mb-4">
            <div class="text-yellow-400 font-bold mb-2">🔍 Unknown Current Calculated</div>
            <div class="text-gray-300">
              Using KCL: ΣI_in = ΣI_out → Unknown I_out = {{ kclResults.incomingTotal.toFixed(3) }}A - {{ kclResults.knownOutgoing.toFixed(3) }}A = <strong class="text-yellow-400">{{ kclResults.unknownOutgoing.toFixed(3) }}A</strong>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 rounded-xl" 
               :class="kclResults.isValid ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'">
            <div class="text-4xl">
              {{ kclResults.isValid ? '✅' : '❌' }}
            </div>
            <div>
              <div class="font-bold text-lg" :class="kclResults.isValid ? 'text-green-400' : 'text-red-400'">
                KCL Verification
              </div>
              <div class="text-gray-300">
                ΣI_in = {{ kclResults.incomingTotal.toFixed(3) }}A, ΣI_out = {{ (kclResults.knownOutgoing + kclResults.unknownOutgoing).toFixed(3) }}A
              </div>
              <div class="text-sm" :class="kclResults.isValid ? 'text-green-400' : 'text-red-400'">
                Balance: {{ kclResults.kclBalance.toFixed(4) }}A {{ kclResults.isValid ? '✓ KCL Satisfied!' : '✗ KCL Violated!' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mesh Analysis Calculator -->
      <div v-if="calculatorMode === 'mesh'" class="space-y-6">
        <!-- Mesh Circuit Diagram -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
          <h2 class="text-2xl font-bold mb-4 text-pink-400">Two-Loop Mesh Analysis</h2>
          
          <!-- SVG Mesh Circuit -->
          <div class="bg-slate-900 rounded-xl p-4 mb-6">
            <svg viewBox="0 0 800 400" class="w-full h-auto">
              <!-- Loop 1 (left) -->
              <rect x="50" y="50" width="320" height="280" fill="none" stroke="#22d3ee" stroke-width="2" rx="5"/>
              <text x="210" y="30" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold">LOOP 1 (I₁)</text>
              
              <!-- Loop 2 (right) -->
              <rect x="370" y="50" width="380" height="280" fill="none" stroke="#a855f7" stroke-width="2" rx="5"/>
              <text x="560" y="30" text-anchor="middle" fill="#a855f7" font-size="14" font-weight="bold">LOOP 2 (I₂)</text>
              
              <!-- Shared branch (middle) -->
              <line x1="370" y1="50" x2="370" y2="330" stroke="#fbbf24" stroke-width="4"/>
              <text x="370" y="30" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">SHARED</text>
              
              <!-- Components Loop 1 -->
              <!-- V1 -->
              <g transform="translate(210, 100)">
                <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#22d3ee" stroke-width="2"/>
                <text x="0" y="5" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold">V₁</text>
              </g>
              
              <!-- R1 (top of loop 1) -->
              <g transform="translate(130, 50)">
                <rect x="-40" y="-15" width="80" height="30" fill="#1e293b" stroke="#22d3ee" stroke-width="2" rx="3"/>
                <text x="0" y="5" text-anchor="middle" fill="#22d3ee" font-size="12">R₁</text>
              </g>
              
              <!-- R2 (shared, vertical) -->
              <g transform="translate(370, 190)">
                <rect x="-15" y="-40" width="30" height="80" fill="#1e293b" stroke="#fbbf24" stroke-width="2" rx="3"/>
                <text x="0" y="5" text-anchor="middle" fill="#fbbf24" font-size="12">R₂</text>
              </g>
              
              <!-- R3 (top of loop 2) -->
              <g transform="translate(560, 50)">
                <rect x="-40" y="-15" width="80" height="30" fill="#1e293b" stroke="#a855f7" stroke-width="2" rx="3"/>
                <text x="0" y="5" text-anchor="middle" fill="#a855f7" font-size="12">R₃</text>
              </g>
              
              <!-- Current labels -->
              <text x="130" y="190" text-anchor="middle" fill="#22d3ee" font-size="12">I₁ →</text>
              <text x="480" y="190" text-anchor="middle" fill="#a855f7" font-size="12">I₂ →</text>
              <text x="370" y="270" text-anchor="middle" fill="#fbbf24" font-size="12">I_R₂ = I₁ - I₂</text>
            </svg>
          </div>

          <!-- Mesh Components -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-cyan-400">Loop 1 Components</h3>
              <div v-for="(comp, index) in meshLoops[0].components" :key="'loop1-' + index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-cyan-400 font-mono font-bold">{{ comp.label }}</span>
                <input 
                  v-model.number="comp.value" 
                  type="number" 
                  step="0.1"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">{{ comp.type === 'voltage' ? 'V' : 'Ω' }}</span>
              </div>
            </div>
            
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-purple-400">Loop 2 Components</h3>
              <div v-for="(comp, index) in meshLoops[1].components" :key="'loop2-' + index"
                   class="bg-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span class="text-purple-400 font-mono font-bold">{{ comp.label }}</span>
                <input 
                  v-model.number="comp.value" 
                  type="number" 
                  step="0.1"
                  class="flex-1 bg-slate-600 rounded px-3 py-2 text-white"
                >
                <span class="text-gray-400">{{ comp.type === 'voltage' ? 'V' : 'Ω' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mesh Results -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30">
          <h2 class="text-2xl font-bold mb-4 text-pink-400">Mesh Current Solutions</h2>
          
          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Loop 1 Current (I₁)</div>
              <div class="text-3xl font-bold text-cyan-400">{{ meshResults.I1.toFixed(3) }}A</div>
            </div>
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Loop 2 Current (I₂)</div>
              <div class="text-3xl font-bold text-purple-400">{{ meshResults.I2.toFixed(3) }}A</div>
            </div>
            <div class="bg-slate-700/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Shared Branch (I_R₂)</div>
              <div class="text-3xl font-bold text-yellow-400">{{ meshResults.I_R2.toFixed(3) }}A</div>
            </div>
          </div>

          <!-- Matrix Display -->
          <div class="bg-slate-900/50 rounded-xl p-4 mb-4">
            <h3 class="text-lg font-semibold mb-3 text-yellow-400">System of Equations (Matrix Form)</h3>
            <div class="font-mono text-sm space-y-2">
              <div class="text-gray-300">| {{ meshResults.matrix[0][0].toFixed(0) }}   {{ meshResults.matrix[0][1] }} | | I₁ |   | {{ meshResults.matrix[0][2] }} |</div>
              <div class="text-gray-300">| {{ meshResults.matrix[1][0] }}   {{ meshResults.matrix[1][1].toFixed(0) }} | | I₂ | = | {{ meshResults.matrix[1][2] }} |</div>
              <div class="mt-4 text-gray-400 text-xs">
                Determinant = {{ meshResults.determinant.toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="bg-blue-900/30 border border-blue-500/50 rounded-xl p-4">
            <div class="text-blue-400 font-bold mb-2">📐 Mesh Analysis Method</div>
            <div class="text-gray-300 text-sm space-y-1">
              <p>• Assign mesh currents I₁ and I₂ (clockwise)</p>
              <p>• Apply KVL to each loop: ΣV = Σ(IR)</p>
              <p>• Loop 1: (R₁+R₂)I₁ - R₂(I₂) = V₁</p>
              <p>• Loop 2: -R₂(I₁) + (R₂+R₃)I₂ = 0</p>
              <p>• Solve the system using Cramer's rule or substitution</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <h2 class="text-2xl font-bold mb-4 text-white">📚 Understanding Kirchhoff's Laws</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-cyan-400 mb-2">Kirchhoff's Voltage Law (KVL)</h3>
            <div class="text-gray-300 text-sm space-y-2">
              <p><strong class="text-white">Principle:</strong> The algebraic sum of all voltages around any closed loop is zero.</p>
              <p class="font-mono bg-slate-900/50 p-2 rounded">ΣV = 0 (around a closed loop)</p>
              <p><strong class="text-white">Applications:</strong></p>
              <ul class="list-disc list-inside ml-2">
                <li>Series circuit analysis</li>
                <li>Finding unknown voltage drops</li>
                <li>Verifying circuit calculations</li>
                <li>Complex multi-loop circuits</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-purple-400 mb-2">Kirchhoff's Current Law (KCL)</h3>
            <div class="text-gray-300 text-sm space-y-2">
              <p><strong class="text-white">Principle:</strong> The algebraic sum of currents at any node is zero.</p>
              <p class="font-mono bg-slate-900/50 p-2 rounded">ΣI = 0 (at any node)</p>
              <p><strong class="text-white">Applications:</strong></p>
              <ul class="list-disc list-inside ml-2">
                <li>Parallel circuit analysis</li>
                <li>Finding branch currents</li>
                <li>Nodal analysis techniques</li>
                <li>Current divider calculations</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-900/50 rounded-xl">
          <h3 class="text-lg font-semibold text-yellow-400 mb-2">🔬 Mesh Analysis vs Nodal Analysis</h3>
          <div class="text-gray-300 text-sm">
            <p class="mb-2"><strong class="text-white">Mesh Analysis:</strong> Uses KVL to solve for loop currents. Best for circuits with fewer loops than nodes.</p>
            <p class="mb-2"><strong class="text-white">Nodal Analysis:</strong> Uses KCL to solve for node voltages. Best for circuits with fewer nodes than loops.</p>
            <p><strong class="text-white">This Tool:</strong> Demonstrates both KVL, KCL, and introduces mesh analysis for multi-loop circuits.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

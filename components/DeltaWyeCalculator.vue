<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <span class="text-3xl mr-3">🔺</span>
      Delta-Wye (Δ-Y) Transformation Calculator
    </h2>

    <!-- Conversion Mode Toggle -->
    <div class="mb-8 flex justify-center">
      <div class="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
        <button
          @click="conversionMode = 'delta-to-wye'"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
            conversionMode === 'delta-to-wye'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Δ → Y (Delta to Wye)
        </button>
        <button
          @click="conversionMode = 'wye-to-delta'"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all duration-200',
            conversionMode === 'wye-to-delta'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Y → Δ (Wye to Delta)
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Input Section -->
      <div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <span class="text-2xl mr-2">⚡</span>
          {{ conversionMode === 'delta-to-wye' ? 'Delta (Δ) Resistances' : 'Wye (Y) Resistances' }}
        </h3>

        <!-- Delta Inputs -->
        <div v-if="conversionMode === 'delta-to-wye'" class="space-y-4">
          <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Rab (Between A & B)</label>
              <span class="text-orange-600 dark:text-orange-400 font-mono font-bold">{{ rab }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="rab"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-orange-200 dark:bg-orange-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Rbc (Between B & C)</label>
              <span class="text-green-600 dark:text-green-400 font-mono font-bold">{{ rbc }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="rbc"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-green-200 dark:bg-green-700 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Rca (Between C & A)</label>
              <span class="text-blue-600 dark:text-blue-400 font-mono font-bold">{{ rca }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="rca"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-blue-200 dark:bg-blue-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>
        </div>

        <!-- Wye Inputs -->
        <div v-else class="space-y-4">
          <div class="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Ra (To node A)</label>
              <span class="text-purple-600 dark:text-purple-400 font-mono font-bold">{{ ra }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="ra"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-purple-200 dark:bg-purple-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>

          <div class="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Rb (To node B)</label>
              <span class="text-pink-600 dark:text-pink-400 font-mono font-bold">{{ rb }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="rb"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-pink-200 dark:bg-pink-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>

          <div class="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-semibold">Rc (To node C)</label>
              <span class="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{{ rc }} Ω</span>
            </div>
            <input
              type="range"
              v-model.number="rc"
              min="1"
              max="1000"
              step="1"
              class="w-full h-2 bg-cyan-200 dark:bg-cyan-700 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1000Ω</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="mt-6">
          <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Quick Presets:</p>
          <div class="flex flex-wrap gap-2">
            <button
              @click="loadPreset('balanced')"
              class="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              Balanced (100Ω)
            </button>
            <button
              @click="loadPreset('unbalanced')"
              class="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              Unbalanced
            </button>
            <button
              @click="loadPreset('high-precision')"
              class="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors"
            >
              High Precision
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <span class="text-2xl mr-2">📊</span>
          {{ conversionMode === 'delta-to-wye' ? 'Equivalent Wye (Y)' : 'Equivalent Delta (Δ)' }}
        </h3>

        <!-- Wye Results -->
        <div v-if="conversionMode === 'delta-to-wye'" class="space-y-4">
          <div class="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Ra (to A)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(wyeRa) }}</span>
            </div>
            <div class="text-purple-100 text-sm">Rab × Rca ÷ (Rab + Rbc + Rca)</div>
          </div>

          <div class="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Rb (to B)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(wyeRb) }}</span>
            </div>
            <div class="text-pink-100 text-sm">Rab × Rbc ÷ (Rab + Rbc + Rca)</div>
          </div>

          <div class="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Rc (to C)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(wyeRc) }}</span>
            </div>
            <div class="text-cyan-100 text-sm">Rbc × Rca ÷ (Rab + Rbc + Rca)</div>
          </div>
        </div>

        <!-- Delta Results -->
        <div v-else class="space-y-4">
          <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Rab (A-B)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(deltaRab) }}</span>
            </div>
            <div class="text-orange-100 text-sm">(Ra×Rb + Rb×Rc + Rc×Ra) ÷ Rc</div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Rbc (B-C)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(deltaRbc) }}</span>
            </div>
            <div class="text-green-100 text-sm">(Ra×Rb + Rb×Rc + Rc×Ra) ÷ Ra</div>
          </div>

          <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Rca (C-A)</span>
              <span class="font-mono font-bold text-2xl">{{ formatResistance(deltaRca) }}</span>
            </div>
            <div class="text-blue-100 text-sm">(Ra×Rb + Rb×Rc + Rc×Ra) ÷ Rb</div>
          </div>
        </div>

        <!-- Circuit Visualization -->
        <div class="mt-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h4 class="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3 text-center">Circuit Visualization</h4>
          
          <!-- Delta Diagram -->
          <div v-if="conversionMode === 'delta-to-wye'" class="flex justify-center">
            <svg viewBox="0 0 200 180" class="w-full max-w-xs">
              <!-- Delta triangle -->
              <polygon points="100,20 180,140 20,140" fill="none" stroke="#f97316" stroke-width="3"/>
              
              <!-- Resistor labels -->
              <text x="140" y="70" fill="#f97316" font-size="14" font-weight="bold">Rab: {{ rab }}Ω</text>
              <text x="90" y="150" fill="#22c55e" font-size="14" font-weight="bold">Rbc: {{ rbc }}Ω</text>
              <text x="30" y="70" fill="#3b82f6" font-size="14" font-weight="bold">Rca: {{ rca }}Ω</text>
              
              <!-- Node labels -->
              <circle cx="100" cy="20" r="8" fill="#9333ea"/>
              <text x="100" y="8" fill="#9333ea" font-size="12" font-weight="bold" text-anchor="middle">A</text>
              
              <circle cx="180" cy="140" r="8" fill="#ec4899"/>
              <text x="195" y="145" fill="#ec4899" font-size="12" font-weight="bold">B</text>
              
              <circle cx="20" cy="140" r="8" fill="#06b6d4"/>
              <text x="5" y="145" fill="#06b6d4" font-size="12" font-weight="bold">C</text>
              
              <!-- Arrow -->
              <path d="M 100 90 Q 100 100 100 110" fill="none" stroke="#6b7280" stroke-width="2" marker-end="url(#arrowhead)"/>
            </svg>
          </div>
          
          <!-- Wye Diagram -->
          <div v-else class="flex justify-center">
            <svg viewBox="0 0 200 180" class="w-full max-w-xs">
              <!-- Center node -->
              <circle cx="100" cy="100" r="6" fill="#6b7280"/>
              
              <!-- Wye arms -->
              <line x1="100" y1="100" x2="100" y2="20" stroke="#9333ea" stroke-width="3"/>
              <line x1="100" y1="100" x2="180" y2="140" stroke="#ec4899" stroke-width="3"/>
              <line x1="100" y1="100" x2="20" y2="140" stroke="#06b6d4" stroke-width="3"/>
              
              <!-- Node labels -->
              <circle cx="100" cy="20" r="8" fill="#9333ea"/>
              <text x="100" y="8" fill="#9333ea" font-size="12" font-weight="bold" text-anchor="middle">A</text>
              
              <circle cx="180" cy="140" r="8" fill="#ec4899"/>
              <text x="195" y="145" fill="#ec4899" font-size="12" font-weight="bold">B</text>
              
              <circle cx="20" cy="140" r="8" fill="#06b6d4"/>
              <text x="5" y="145" fill="#06b6d4" font-size="12" font-weight="bold">C</text>
              
              <!-- Resistor labels -->
              <text x="110" y="60" fill="#9333ea" font-size="12" font-weight="bold">Ra: {{ ra }}Ω</text>
              <text x="140" y="115" fill="#ec4899" font-size="12" font-weight="bold">Rb: {{ rb }}Ω</text>
              <text x="40" y="115" fill="#06b6d4" font-size="12" font-weight="bold">Rc: {{ rc }}Ω</text>
            </svg>
          </div>
        </div>

        <!-- Calculation Steps -->
        <CalculationSteps :steps="calculationSteps" />
      </div>
    </div>

    <!-- Educational Content -->
    <div class="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span class="text-2xl mr-2">📚</span>
        Understanding Delta-Wye Transformation
      </h3>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
          <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-3">🔺 Delta (Δ) Configuration</h4>
          <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            In a Delta configuration, three resistors form a triangle (delta shape). Each resistor is connected between two of the three nodes directly, without a common connection point.
          </p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Used in 3-phase power systems</li>
            <li>• Higher line current than Wye</li>
            <li>• No neutral point</li>
          </ul>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5">
          <h4 class="font-bold text-purple-900 dark:text-purple-300 mb-3">⭐ Wye (Y) Configuration</h4>
          <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            In a Wye (or Star) configuration, three resistors connect to a common center point. Each resistor connects between a node and the common center.
          </p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Provides neutral point for grounding</li>
            <li>• Lower line current than Delta</li>
            <li>• Better for unbalanced loads</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h4 class="font-bold text-indigo-900 dark:text-indigo-300 mb-3">📐 Key Formulas</h4>
        
        <div class="space-y-3 text-sm">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-1">Delta to Wye (Δ → Y):</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Ra = (Rab × Rca) / (Rab + Rbc + Rca)</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Rb = (Rab × Rbc) / (Rab + Rbc + Rca)</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Rc = (Rbc × Rca) / (Rab + Rbc + Rca)</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-1">Wye to Delta (Y → Δ):</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Rab = (Ra×Rb + Rb×Rc + Rc×Ra) / Rc</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Rbc = (Ra×Rb + Rb×Rc + Rc×Ra) / Ra</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Rca = (Ra×Rb + Rb×Rc + Rc×Ra) / Rb</p>
          </div>
        </div>

        <div class="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <p class="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>💡 Pro Tip:</strong> These transformations are equivalent - converting Delta to Wye and back to Delta should give you the original values (within rounding error). This property is useful for simplifying complex resistor networks!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalculationSteps from './CalculationSteps.vue'

const conversionMode = ref<'delta-to-wye' | 'wye-to-delta'>('delta-to-wye')

// Delta resistances
const rab = ref(100)
const rbc = ref(100)
const rca = ref(100)

// Wye resistances
const ra = ref(100)
const rb = ref(100)
const rc = ref(100)

// Calculate Delta to Wye
const wyeRa = computed(() => {
  const denominator = rab.value + rbc.value + rca.value
  return (rab.value * rca.value) / denominator
})

const wyeRb = computed(() => {
  const denominator = rab.value + rbc.value + rca.value
  return (rab.value * rbc.value) / denominator
})

const wyeRc = computed(() => {
  const denominator = rab.value + rbc.value + rca.value
  return (rbc.value * rca.value) / denominator
})

// Calculate Wye to Delta
const deltaRab = computed(() => {
  const numerator = ra.value * rb.value + rb.value * rc.value + rc.value * ra.value
  return numerator / rc.value
})

const deltaRbc = computed(() => {
  const numerator = ra.value * rb.value + rb.value * rc.value + rc.value * ra.value
  return numerator / ra.value
})

const deltaRca = computed(() => {
  const numerator = ra.value * rb.value + rb.value * rc.value + rc.value * ra.value
  return numerator / rb.value
})

// Calculation steps
const calculationSteps = computed(() => {
  if (conversionMode.value === 'delta-to-wye') {
    const sum = rab.value + rbc.value + rca.value
    return [
      `Step 1: Calculate sum of Delta resistances: ${rab.value} + ${rbc.value} + ${rca.value} = ${sum.toFixed(2)} Ω`,
      `Step 2: Calculate Ra: (${rab.value} × ${rca.value}) ÷ ${sum.toFixed(2)} = ${wyeRa.value.toFixed(2)} Ω`,
      `Step 3: Calculate Rb: (${rab.value} × ${rbc.value}) ÷ ${sum.toFixed(2)} = ${wyeRb.value.toFixed(2)} Ω`,
      `Step 4: Calculate Rc: (${rbc.value} × ${rca.value}) ÷ ${sum.toFixed(2)} = ${wyeRc.value.toFixed(2)} Ω`
    ]
  } else {
    const numerator = ra.value * rb.value + rb.value * rc.value + rc.value * ra.value
    return [
      `Step 1: Calculate sum of products: (${ra.value}×${rb.value}) + (${rb.value}×${rc.value}) + (${rc.value}×${ra.value}) = ${numerator.toFixed(2)} Ω²`,
      `Step 2: Calculate Rab: ${numerator.toFixed(2)} ÷ ${rc.value} = ${deltaRab.value.toFixed(2)} Ω`,
      `Step 3: Calculate Rbc: ${numerator.toFixed(2)} ÷ ${ra.value} = ${deltaRbc.value.toFixed(2)} Ω`,
      `Step 4: Calculate Rca: ${numerator.toFixed(2)} ÷ ${rb.value} = ${deltaRca.value.toFixed(2)} Ω`
    ]
  }
})

function formatResistance(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)} MΩ`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} kΩ`
  } else {
    return `${value.toFixed(2)} Ω`
  }
}

function loadPreset(type: string) {
  if (conversionMode.value === 'delta-to-wye') {
    switch (type) {
      case 'balanced':
        rab.value = 100
        rbc.value = 100
        rca.value = 100
        break
      case 'unbalanced':
        rab.value = 100
        rbc.value = 200
        rca.value = 150
        break
      case 'high-precision':
        rab.value = 1000
        rbc.value = 1000
        rca.value = 1000
        break
    }
  } else {
    switch (type) {
      case 'balanced':
        ra.value = 100
        rb.value = 100
        rc.value = 100
        break
      case 'unbalanced':
        ra.value = 100
        rb.value = 200
        rc.value = 150
        break
      case 'high-precision':
        ra.value = 1000
        rb.value = 1000
        rc.value = 1000
        break
    }
  }
}
</script>

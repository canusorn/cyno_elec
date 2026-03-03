<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">VSWR Calculator</h1>
        <p class="text-purple-300 text-lg">Voltage Standing Wave Ratio • RF Transmission Analysis</p>
      </div>

      <!-- Main Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 mb-6">
        <!-- Calculation Mode Toggle -->
        <div class="flex justify-center gap-4 mb-6">
          <button
            @click="mode = 'power'"
            :class="[
              'px-6 py-2 rounded-lg font-semibold transition-all',
              mode === 'power' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            ]"
          >
            Power Mode
          </button>
          <button
            @click="mode = 'vswr'"
            :class="[
              'px-6 py-2 rounded-lg font-semibold transition-all',
              mode === 'vswr' 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            ]"
          >
            VSWR Mode
          </button>
        </div>

        <!-- Power Mode Inputs -->
        <div v-if="mode === 'power'" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Forward Power -->
            <div class="bg-slate-700/50 rounded-xl p-5">
              <label class="block text-purple-300 font-semibold mb-3">
                Forward Power (Pf)
              </label>
              <div class="flex gap-2">
                <input
                  v-model.number="forwardPower"
                  type="number"
                  min="0"
                  step="0.1"
                  class="flex-1 bg-slate-600 text-white px-4 py-3 rounded-lg text-lg font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                <select
                  v-model="powerUnit"
                  class="bg-slate-600 text-white px-3 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="W">W</option>
                  <option value="mW">mW</option>
                  <option value="kW">kW</option>
                </select>
              </div>
            </div>

            <!-- Reflected Power -->
            <div class="bg-slate-700/50 rounded-xl p-5">
              <label class="block text-purple-300 font-semibold mb-3">
                Reflected Power (Pr)
              </label>
              <div class="flex gap-2">
                <input
                  v-model.number="reflectedPower"
                  type="number"
                  min="0"
                  step="0.1"
                  class="flex-1 bg-slate-600 text-white px-4 py-3 rounded-lg text-lg font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                <select
                  v-model="powerUnit"
                  class="bg-slate-600 text-white px-3 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="W">W</option>
                  <option value="mW">mW</option>
                  <option value="kW">kW</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- VSWR Mode Inputs -->
        <div v-else class="space-y-6">
          <div class="bg-slate-700/50 rounded-xl p-5">
            <label class="block text-purple-300 font-semibold mb-3">
              VSWR Ratio
            </label>
            <input
              v-model.number="vswrInput"
              type="number"
              min="1"
              step="0.01"
              class="w-full bg-slate-600 text-white px-4 py-3 rounded-lg text-lg font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
          </div>
        </div>

        <!-- Reset Button -->
        <div class="flex justify-center mt-6">
          <button
            @click="reset"
            class="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Card -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 mb-6">
        <h2 class="text-2xl font-bold text-white mb-6 text-center">Results</h2>

        <!-- VSWR Display -->
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- VSWR Value -->
          <div :class="[
            'rounded-xl p-6 text-center transition-all',
            vswrQuality.bg
          ]">
            <div class="text-sm uppercase tracking-wide mb-2" :class="vswrQuality.text">
              VSWR
            </div>
            <div class="text-5xl font-bold text-white mb-2">
              {{ vswrDisplay }}
            </div>
            <div class="text-lg font-semibold" :class="vswrQuality.text">
              {{ vswrQuality.label }}
            </div>
          </div>

          <!-- Return Loss -->
          <div class="bg-slate-700/50 rounded-xl p-6 text-center">
            <div class="text-sm uppercase tracking-wide text-slate-400 mb-2">
              Return Loss
            </div>
            <div class="text-5xl font-bold text-white mb-2 font-mono">
              {{ returnLoss }}
            </div>
            <div class="text-lg text-slate-400">dB</div>
          </div>
        </div>

        <!-- Additional Metrics -->
        <div class="grid md:grid-cols-3 gap-4">
          <!-- Reflection Coefficient -->
          <div class="bg-slate-700/50 rounded-xl p-4 text-center">
            <div class="text-sm text-slate-400 mb-1">Reflection Coefficient (Γ)</div>
            <div class="text-2xl font-bold text-white font-mono">{{ reflectionCoef }}</div>
          </div>

          <!-- Mismatch Loss -->
          <div class="bg-slate-700/50 rounded-xl p-4 text-center">
            <div class="text-sm text-slate-400 mb-1">Mismatch Loss</div>
            <div class="text-2xl font-bold text-white font-mono">{{ mismatchLoss }}</div>
            <div class="text-xs text-slate-500">dB</div>
          </div>

          <!-- Reflected Power % -->
          <div class="bg-slate-700/50 rounded-xl p-4 text-center">
            <div class="text-sm text-slate-400 mb-1">Power Reflected</div>
            <div class="text-2xl font-bold text-white font-mono">{{ reflectedPercent }}</div>
            <div class="text-xs text-slate-500">%</div>
          </div>
        </div>
      </div>

      <!-- VSWR Scale Visualization -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6 mb-6">
        <h3 class="text-xl font-bold text-white mb-4">VSWR Quality Scale</h3>
        <div class="relative h-8 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg mb-2">
          <div
            class="absolute top-0 w-1 h-10 bg-white -mt-1 transition-all duration-300"
            :style="{ left: `${vswrIndicatorPosition}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-sm text-slate-400">
          <span>1:1 (Perfect)</span>
          <span>2:1 (Good)</span>
          <span>3:1 (Fair)</span>
          <span>∞ (Total)</span>
        </div>
      </div>

      <!-- Formulas Reference -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6">
        <h3 class="text-xl font-bold text-white mb-4">📐 Key Formulas</h3>
        <div class="space-y-4 text-slate-300">
          <div class="bg-slate-700/50 rounded-lg p-4">
            <div class="text-purple-300 font-semibold mb-2">VSWR from Power</div>
            <div class="font-mono text-sm bg-slate-800/50 p-2 rounded">
              VSWR = (1 + √(Pr/Pf)) / (1 - √(Pr/Pf))
            </div>
          </div>
          <div class="bg-slate-700/50 rounded-lg p-4">
            <div class="text-purple-300 font-semibold mb-2">Return Loss</div>
            <div class="font-mono text-sm bg-slate-800/50 p-2 rounded">
              RL (dB) = -20 log₁₀(Γ)
            </div>
          </div>
          <div class="bg-slate-700/50 rounded-lg p-4">
            <div class="text-purple-300 font-semibold mb-2">Reflection Coefficient</div>
            <div class="font-mono text-sm bg-slate-800/50 p-2 rounded">
              Γ = (VSWR - 1) / (VSWR + 1) = √(Pr/Pf)
            </div>
          </div>
          <div class="bg-slate-700/50 rounded-lg p-4">
            <div class="text-purple-300 font-semibold mb-2">Mismatch Loss</div>
            <div class="font-mono text-sm bg-slate-800/50 p-2 rounded">
              Lm (dB) = -10 log₁₀(1 - |Γ|²)
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/20 p-6">
        <h3 class="text-xl font-bold text-white mb-4">📚 Understanding VSWR</h3>
        
        <div class="space-y-4 text-slate-300">
          <div>
            <h4 class="text-purple-300 font-semibold mb-2">What is VSWR?</h4>
            <p class="text-sm leading-relaxed">
              Voltage Standing Wave Ratio (VSWR) measures the impedance matching between a transmission line and its load. 
              It indicates how much RF power is reflected back toward the source due to impedance mismatch.
            </p>
          </div>

          <div>
            <h4 class="text-purple-300 font-semibold mb-2">VSWR Interpretation</h4>
            <ul class="text-sm space-y-1">
              <li>• <span class="text-green-400 font-semibold">1:1 to 1.5:1</span> - Excellent match, minimal reflection</li>
              <li>• <span class="text-yellow-400 font-semibold">1.5:1 to 2:1</span> - Good match, acceptable for most applications</li>
              <li>• <span class="text-orange-400 font-semibold">2:1 to 3:1</span> - Fair match, may need improvement</li>
              <li>• <span class="text-red-400 font-semibold">Above 3:1</span> - Poor match, significant power loss</li>
            </ul>
          </div>

          <div>
            <h4 class="text-purple-300 font-semibold mb-2">Return Loss</h4>
            <p class="text-sm leading-relaxed">
              Return loss (RL) expresses the ratio of incident power to reflected power in decibels. 
              Higher return loss indicates better impedance matching. RL ≥ 20 dB is typically considered good.
            </p>
          </div>

          <div>
            <h4 class="text-purple-300 font-semibold mb-2">Practical Applications</h4>
            <ul class="text-sm space-y-1">
              <li>• Antenna systems and RF transmission lines</li>
              <li>• Impedance matching network design</li>
              <li>• RF amplifier output matching</li>
              <li>• Cable TV and telecommunications systems</li>
              <li>• Testing and troubleshooting RF equipment</li>
            </ul>
          </div>

          <div>
            <h4 class="text-purple-300 font-semibold mb-2">Improving VSWR</h4>
            <p class="text-sm leading-relaxed">
              To improve VSWR: use impedance matching networks (L-network, Pi-network, transformer), 
              adjust antenna dimensions, use quality connectors and cables, and minimize transmission line losses.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Mode: 'power' or 'vswr'
const mode = ref<'power' | 'vswr'>('power')

// Power mode inputs
const forwardPower = ref(100)
const reflectedPower = ref(5)
const powerUnit = ref('W')

// VSWR mode input
const vswrInput = ref(1.5)

// Unit multipliers
const unitMultipliers: Record<string, number> = {
  W: 1,
  mW: 0.001,
  kW: 1000
}

// Calculate VSWR from power ratio
const powerVswr = computed(() => {
  if (forwardPower.value <= 0) return 1
  const ratio = Math.max(0, reflectedPower.value) / forwardPower.value
  const gamma = Math.sqrt(ratio)
  if (gamma >= 1) return Infinity
  return (1 + gamma) / (1 - gamma)
})

// Current VSWR value
const vswr = computed(() => {
  if (mode.value === 'power') {
    return powerVswr.value
  }
  return Math.max(1, vswrInput.value)
})

// VSWR display format
const vswrDisplay = computed(() => {
  if (vswr.value === Infinity) return '∞:1'
  return `${vswr.value.toFixed(2)}:1`
})

// Reflection coefficient
const reflectionCoef = computed(() => {
  if (vswr.value === Infinity) return '1.000'
  const gamma = (vswr.value - 1) / (vswr.value + 1)
  return gamma.toFixed(3)
})

// Return loss in dB
const returnLoss = computed(() => {
  if (vswr.value === Infinity) return '0.00'
  const gamma = (vswr.value - 1) / (vswr.value + 1)
  if (gamma <= 0) return '∞'
  return (-20 * Math.log10(gamma)).toFixed(2)
})

// Mismatch loss in dB
const mismatchLoss = computed(() => {
  if (vswr.value === Infinity) return '∞'
  const gamma = (vswr.value - 1) / (vswr.value + 1)
  const loss = -10 * Math.log10(1 - gamma * gamma)
  return loss.toFixed(2)
})

// Reflected power percentage
const reflectedPercent = computed(() => {
  if (vswr.value === Infinity) return '100.0'
  const gamma = (vswr.value - 1) / (vswr.value + 1)
  return (gamma * gamma * 100).toFixed(1)
})

// VSWR quality indicator
const vswrQuality = computed(() => {
  const v = vswr.value
  if (v <= 1.5) return { 
    label: 'Excellent', 
    bg: 'bg-green-500/80', 
    text: 'text-green-100' 
  }
  if (v <= 2) return { 
    label: 'Good', 
    bg: 'bg-yellow-500/80', 
    text: 'text-yellow-100' 
  }
  if (v <= 3) return { 
    label: 'Fair', 
    bg: 'bg-orange-500/80', 
    text: 'text-orange-100' 
  }
  return { 
    label: 'Poor', 
    bg: 'bg-red-500/80', 
    text: 'text-red-100' 
  }
})

// VSWR indicator position on scale (log scale)
const vswrIndicatorPosition = computed(() => {
  const v = Math.min(vswr.value, 10)
  // Use logarithmic scale: 1 → 0%, 2 → 33%, 3 → 55%, 10 → 100%
  const percent = (Math.log10(v) / Math.log10(10)) * 100
  return Math.max(0, Math.min(100, percent))
})

// Reset function
function reset() {
  forwardPower.value = 100
  reflectedPower.value = 5
  vswrInput.value = 1.5
  mode.value = 'power'
}
</script>

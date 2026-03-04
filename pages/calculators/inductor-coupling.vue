<script setup lang="ts">
import { ref, computed } from 'vue'

const calculationMode = ref<'k-to-m' | 'm-to-k'>('k-to-m')
const primaryInductance = ref(100)
const secondaryInductance = ref(100)
const mutualInductance = ref(50)
const couplingCoefficient = ref(0.5)

const turnsRatio = ref('1:1')

const turnsRatioOptions = [
  '1:1', '1:2', '1:5', '1:10', '2:1', '5:1', '10:1', '1:20', '20:1'
]

const calculatedMutualInductance = computed(() => {
  const k = couplingCoefficient.value / 100
  return k * Math.sqrt(primaryInductance.value * secondaryInductance.value)
})

const calculatedCouplingCoefficient = computed(() => {
  const M = mutualInductance.value
  const L1 = primaryInductance.value
  const L2 = secondaryInductance.value
  const k = M / Math.sqrt(L1 * L2)
  return Math.min(k * 100, 100)
})

const leakageInductance = computed(() => {
  const L1 = primaryInductance.value
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  return L1 * (1 - k * k)
})

const magnetizingInductance = computed(() => {
  const L1 = primaryInductance.value
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  return L1 * k * k
})

const couplingEfficiency = computed(() => {
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  return k * k * 100
})

const turnsRatioPrimary = computed(() => {
  const ratio = turnsRatio.value.split(':')
  return parseInt(ratio[0])
})

const turnsRatioSecondary = computed(() => {
  const ratio = turnsRatio.value.split(':')
  return parseInt(ratio[1])
})

const actualTurnsRatio = computed(() => {
  return Math.sqrt(secondaryInductance.value / primaryInductance.value)
})

const couplingQuality = computed(() => {
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  if (k >= 0.95) return { text: 'Excellent (Tight)', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900', level: 5 }
  if (k >= 0.8) return { text: 'Very Good', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-800', level: 4 }
  if (k >= 0.6) return { text: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900', level: 3 }
  if (k >= 0.4) return { text: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900', level: 2 }
  if (k >= 0.2) return { text: 'Poor (Loose)', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900', level: 1 }
  return { text: 'Very Poor', color: 'text-red-700', bg: 'bg-red-200 dark:bg-red-950', level: 0 }
})

const energyTransferEfficiency = computed(() => {
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  return k * 100
})

const operatingMode = computed(() => {
  const k = (calculationMode.value === 'k-to-m' ? couplingCoefficient.value : calculatedCouplingCoefficient.value) / 100
  if (k >= 0.8) return 'Tight Coupling - Transformer Mode'
  if (k >= 0.4) return 'Moderate Coupling - Mixed Mode'
  return 'Loose Coupling - Inductive Mode'
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductor Coupling Coefficient Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate mutual inductance and coupling between transformer windings or coupled inductors
          </p>

          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-4 text-xl font-mono font-bold">
              <span class="text-gray-600 dark:text-gray-400">Coupling Coefficient:</span>
              <span class="text-4xl text-primary-highlight">
                {{ calculationMode === 'k-to-m' ? couplingCoefficient.toFixed(1) : calculatedCouplingCoefficient.toFixed(1) }}%
              </span>
              <span :class="['px-3 py-1 rounded-full text-sm font-semibold', couplingQuality.color, couplingQuality.bg]">
                {{ couplingQuality.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculation Mode</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              @click="calculationMode = 'k-to-m'"
              :class="calculationMode === 'k-to-m' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="p-6 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-2"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>Calculate Mutual Inductance (M)</div>
              <div class="text-sm opacity-75">From coupling coefficient (k)</div>
            </button>
            <button
              @click="calculationMode = 'm-to-k'"
              :class="calculationMode === 'm-to-k' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="p-6 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-2"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>Calculate Coupling Coefficient (k)</div>
              <div class="text-sm opacity-75">From mutual inductance (M)</div>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Primary Inductance (L1): {{ primaryInductance }} µH
              </label>
              <input
                v-model.number="primaryInductance"
                type="range"
                min="1"
                max="10000"
                step="1"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1µH</span>
                <span>10mH</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Secondary Inductance (L2): {{ secondaryInductance }} µH
              </label>
              <input
                v-model.number="secondaryInductance"
                type="range"
                min="1"
                max="10000"
                step="1"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1µH</span>
                <span>10mH</span>
              </div>
            </div>

            <div v-if="calculationMode === 'k-to-m'">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Coupling Coefficient (k): {{ (couplingCoefficient / 100).toFixed(2) }}
              </label>
              <input
                v-model.number="couplingCoefficient"
                type="range"
                min="0"
                max="100"
                step="0.1"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0 (uncoupled)</span>
                <span>1 (perfect)</span>
              </div>
            </div>

            <div v-if="calculationMode === 'm-to-k'">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Mutual Inductance (M): {{ mutualInductance }} µH
              </label>
              <input
                v-model.number="mutualInductance"
                type="range"
                min="0"
                max="10000"
                step="1"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0µH</span>
                <span>10mH</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Turns Ratio Reference
              </label>
              <select v-model="turnsRatio" class="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
                <option v-for="ratio in turnsRatioOptions" :key="ratio" :value="ratio">
                  {{ ratio }}
                </option>
              </select>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Actual: N2/N1 ≈ {{ actualTurnsRatio.toFixed(2) }}:1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Coupled Inductor Diagram</h3>

          <div class="flex justify-center">
            <svg viewBox="0 0 600 300" class="w-full max-w-3xl h-auto">
              <defs>
                <linearGradient id="fluxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:rgba(59, 130, 246, 0.3);stop-opacity:1" />
                  <stop offset="50%" style="stop-color:rgba(59, 130, 246, 0.6);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgba(59, 130, 246, 0.3);stop-opacity:1" />
                </linearGradient>
              </defs>

              <!-- Magnetic Core -->
              <rect x="180" y="50" width="240" height="200" rx="10" fill="none" stroke="currentColor" stroke-width="4" class="text-gray-400 dark:text-gray-600" />
              <rect x="180" y="50" width="240" height="200" rx="10" fill="url(#fluxGradient)" />

              <!-- Primary Coil -->
              <g transform="translate(150, 100)">
                <text x="0" y="-15" text-anchor="middle" class="fill-current text-base font-bold" :class="calculationMode === 'k-to-m' ? couplingQuality.color : 'text-gray-600 dark:text-gray-400'">Primary (L1)</text>
                <circle cx="0" cy="10" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-primary" />
                <circle cx="0" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-primary" />
                <circle cx="0" cy="60" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-primary" />
                <circle cx="0" cy="85" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-primary" />
                <line x1="0" y1="-30" x2="0" y2="-5" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400" />
                <line x1="0" y1="100" x2="0" y2="125" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400" />
                <text x="0" y="145" text-anchor="middle" class="fill-current text-sm font-mono" :class="calculationMode === 'k-to-m' ? couplingQuality.color : 'text-gray-600 dark:text-gray-400'">{{ primaryInductance }}µH</text>
              </g>

              <!-- Secondary Coil -->
              <g transform="translate(450, 100)">
                <text x="0" y="-15" text-anchor="middle" class="fill-current text-base font-bold" :class="calculationMode === 'k-to-m' ? couplingQuality.color : 'text-gray-600 dark:text-gray-400'">Secondary (L2)</text>
                <circle cx="0" cy="10" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-pink-500" />
                <circle cx="0" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-pink-500" />
                <circle cx="0" cy="60" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-pink-500" />
                <circle cx="0" cy="85" r="15" fill="none" stroke="currentColor" stroke-width="3" class="text-pink-500" />
                <line x1="0" y1="-30" x2="0" y2="-5" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400" />
                <line x1="0" y1="100" x2="0" y2="125" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400" />
                <text x="0" y="145" text-anchor="middle" class="fill-current text-sm font-mono" :class="calculationMode === 'k-to-m' ? couplingQuality.color : 'text-gray-600 dark:text-gray-400'">{{ secondaryInductance }}µH</text>
              </g>

              <!-- Mutual Inductance Arrow -->
              <g transform="translate(300, 150)">
                <path d="M -80 0 Q -40 -20 0 0 Q 40 -20 80 0" fill="none" stroke="currentColor" stroke-width="3" class="text-blue-500" :stroke-dasharray="calculationMode === 'k-to-m' ? couplingQuality.level * 2 + 5 : '5,5'" />
                <text x="0" y="-30" text-anchor="middle" class="fill-current text-sm font-bold text-blue-600">
                  M = {{ calculationMode === 'k-to-m' ? calculatedMutualInductance.toFixed(2) : mutualInductance }}µH
                </text>
              </g>

              <!-- Coupling Coefficient Display -->
              <g transform="translate(300, 270)">
                <text x="0" y="0" text-anchor="middle" class="fill-current text-lg font-bold">
                  k = {{ calculationMode === 'k-to-m' ? (couplingCoefficient / 100).toFixed(2) : (calculatedCouplingCoefficient / 100).toFixed(2) }}
                </text>
              </g>
            </svg>
          </div>

          <div class="mt-6 text-center">
            <span class="inline-block px-4 py-2 rounded-full text-sm font-semibold" :class="couplingQuality.color + ' ' + couplingQuality.bg">
              {{ operatingMode }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculated Parameters</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ calculationMode === 'k-to-m' ? 'Mutual Inductance (M)' : 'Coupling Coefficient (k)' }}
                </h4>
                <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-blue-600 mb-2">
                {{ calculationMode === 'k-to-m' ? calculatedMutualInductance.toFixed(2) + ' µH' : (calculatedCouplingCoefficient / 100).toFixed(3) }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ calculationMode === 'k-to-m' ? 'M = k × √(L1 × L2)' : 'k = M / √(L1 × L2)' }}
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Coupling Efficiency</h4>
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-green-600 mb-2">{{ couplingEfficiency.toFixed(1) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">η = k² × 100</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Energy transfer efficiency</div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Leakage Inductance</h4>
                <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-purple-600 mb-2">{{ leakageInductance.toFixed(2) }} µH</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">L_leak = L1 × (1 - k²)</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Uncoupled inductance</div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Magnetizing Inductance</h4>
                <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-orange-600 mb-2">{{ magnetizingInductance.toFixed(2) }} µH</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">L_mag = L1 × k²</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Coupled inductance</div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Actual Turns Ratio</h4>
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-red-600 mb-2">{{ actualTurnsRatio.toFixed(2) }}:1</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">N2/N1 = √(L2/L1)</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">From inductance ratio</div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Energy Transfer</h4>
                <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-teal-600 mb-2">{{ energyTransferEfficiency.toFixed(1) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">η = k × 100</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Voltage transfer ratio</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Magnetic Coupling</h3>

          <div class="space-y-8">
            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">🧲</span> What is Coupling Coefficient?
              </h4>
              <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                <p>
                  The coupling coefficient (k) measures the fraction of magnetic flux from one inductor that links with another. It ranges from 0 (no coupling) to 1 (perfect coupling).
                </p>
                <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 my-3 font-mono text-center text-lg">
                  k = M / √(L1 × L2)  <span class="text-gray-500 mx-2">or</span>  M = k × √(L1 × L2)
                </div>
                <p>
                  Where M is mutual inductance, L1 is primary inductance, and L2 is secondary inductance.
                </p>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">📊</span> Coupling Quality Guide
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-gray-100 dark:bg-gray-900">
                      <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Coupling (k)</th>
                      <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Quality</th>
                      <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">0.95 - 1.0</td>
                      <td class="px-4 py-3 text-green-600 font-semibold">Excellent (Tight)</td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Power transformers, RF transformers</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">0.8 - 0.95</td>
                      <td class="px-4 py-3 text-green-500 font-semibold">Very Good</td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Audio transformers, flyback transformers</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">0.6 - 0.8</td>
                      <td class="px-4 py-3 text-yellow-600 font-semibold">Good</td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Coupled inductors, EMI filters</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">0.4 - 0.6</td>
                      <td class="px-4 py-3 text-orange-600 font-semibold">Fair</td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Loosely coupled inductors</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono">&lt; 0.4</td>
                      <td class="px-4 py-3 text-red-600 font-semibold">Poor (Loose)</td>
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Wireless charging, RFID antennas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">🧮</span> Key Formulas
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Mutual Inductance</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    M = k × √(L1 × L2)<br>
                    Units: Henries (H)
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Coupling Coefficient</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    k = M / √(L1 × L2)<br>
                    Range: 0 ≤ k ≤ 1
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Leakage Inductance</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    L_leak = L1 × (1 - k²)<br>
                    Energy not coupled
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Turns Ratio</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    N2/N1 = √(L2/L1)<br>
                    Voltage transformation
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">💡</span> Practical Design Tips
              </h4>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <h5 class="font-semibold text-gray-800 dark:text-gray-200">Core Material Selection</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">High permeability cores (ferrite, powdered iron) increase coupling by concentrating magnetic flux</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <h5 class="font-semibold text-gray-800 dark:text-gray-200">Winding Geometry</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Bifilar or trifilar winding (windings parallel) achieves k > 0.95 for tight coupling</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <h5 class="font-semibold text-gray-800 dark:text-gray-200">Leakage Inductance Effects</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Loose coupling increases leakage inductance, causing voltage spikes in switching converters</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <h5 class="font-semibold text-gray-800 dark:text-gray-200">Interleaved Windings</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Alternating primary and secondary layers improves coupling and reduces proximity losses</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">🔌</span> Real-World Applications
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Power Transformers</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k > 0.95 for efficient energy transfer in AC/DC converters</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Wireless Charging</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k ≈ 0.3-0.6 due to air gap and misalignment tolerance</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">RF Transformers</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k > 0.98 for impedance matching in RF circuits</p>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Coupled Inductors</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k ≈ 0.6-0.8 for SEPIC, Cuk, and flyback converters</p>
                </div>
                <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Common Mode Chokes</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k > 0.95 for effective EMI noise suppression</p>
                </div>
                <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Transformers</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">k > 0.98 for accurate current sensing and measurement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Interactive educational tool for understanding inductor coupling and transformer design</p>
      </div>
    </footer>
  </div>
</template>

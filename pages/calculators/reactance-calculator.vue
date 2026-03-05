<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Reactive state
const frequency = ref(1000) // Hz
const capacitance = ref(1) // µF
const inductance = ref(1) // mH

// Calculated values
const capacitiveReactance = computed(() => {
  if (frequency.value === 0 || capacitance.value === 0) return 0
  const C = capacitance.value * 1e-6 // Convert µF to F
  const Xc = 1 / (2 * Math.PI * frequency.value * C)
  return Xc
})

const inductiveReactance = computed(() => {
  if (frequency.value === 0) return 0
  const L = inductance.value * 1e-3 // Convert mH to H
  const Xl = 2 * Math.PI * frequency.value * L
  return Xl
})

const netReactance = computed(() => {
  return inductiveReactance.value - capacitiveReactance.value
})

const resonanceFrequency = computed(() => {
  if (inductance.value === 0 || capacitance.value === 0) return 0
  const L = inductance.value * 1e-3 // Convert mH to H
  const C = capacitance.value * 1e-6 // Convert µF to F
  const fr = 1 / (2 * Math.PI * Math.sqrt(L * C))
  return fr
})

const resonanceReached = computed(() => {
  const tolerance = 0.05 // 5% tolerance
  const ratio = frequency.value / resonanceFrequency.value
  return ratio > (1 - tolerance) && ratio < (1 + tolerance)
})

// Generate frequency response curve data
const frequencyCurveData = computed(() => {
  const points = []
  const startFreq = resonanceFrequency.value > 0 ? resonanceFrequency.value / 10 : 10
  const endFreq = resonanceFrequency.value > 0 ? resonanceFrequency.value * 10 : 10000
  
  for (let i = 0; i <= 100; i++) {
    const freq = startFreq * Math.pow(endFreq / startFreq, i / 100)
    const L = inductance.value * 1e-3
    const C = capacitance.value * 1e-6
    
    const Xc_val = 1 / (2 * Math.PI * freq * C)
    const Xl_val = 2 * Math.PI * freq * L
    const X_net = Xl_val - Xc_val
    
    points.push({
      frequency: freq,
      Xc: Xc_val,
      Xl: Xl_val,
      Xnet: X_net
    })
  }
  return points
})

// Format functions
const formatReactance = (val: number) => {
  if (Math.abs(val) < 1) return `${(val * 1000).toFixed(2)} mΩ`
  if (Math.abs(val) >= 1000000) return `${(val / 1000000).toFixed(2)} MΩ`
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(2)} kΩ`
  return `${val.toFixed(2)} Ω`
}

const formatFrequency = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)} MHz`
  if (val >= 1000) return `${(val / 1000).toFixed(2)} kHz`
  return `${val.toFixed(2)} Hz`
}

const formatCapacitance = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)} F`
  if (val >= 1000) return `${(val / 1000).toFixed(2)} mF`
  return `${val.toFixed(2)} µF`
}

const formatInductance = (val: number) => {
  if (val >= 1000000) return `${(val / 1000).toFixed(2)} H`
  if (val >= 1000) return `${(val / 1000).toFixed(2)} H`
  return `${val.toFixed(2)} mH`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header -->
    <section class="relative pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            ⚡ Reactance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate capacitive and inductive reactance with interactive frequency response visualization
          </p>
          
          <!-- Reactance Formulas -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 inline-block mb-8 shadow-lg">
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-xl font-mono font-bold">
                <span class="text-blue-600 dark:text-blue-400">X<sub>C</sub></span>
                <span class="text-gray-400">=</span>
                <span class="text-gray-700 dark:text-gray-300">1 / (2πfC)</span>
              </div>
              <div class="flex items-center gap-3 text-xl font-mono font-bold">
                <span class="text-red-600 dark:text-red-400">X<sub>L</sub></span>
                <span class="text-gray-400">=</span>
                <span class="text-gray-700 dark:text-gray-300">2πfL</span>
              </div>
              <div class="flex items-center gap-3 text-xl font-mono font-bold">
                <span class="text-purple-600 dark:text-purple-400">X<sub>net</sub></span>
                <span class="text-gray-400">=</span>
                <span class="text-purple-600 dark:text-purple-400">X<sub>L</sub> - X<sub>C</sub></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
              <!-- Frequency Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency (f)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="frequency"
                    min="1" 
                    max="100000" 
                    step="1"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="frequency"
                    min="1" 
                    max="1000000000"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Hz</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current: {{ formatFrequency(frequency) }}
                </p>
              </div>

              <!-- Capacitance Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitance (C)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="capacitance"
                    min="0.001" 
                    max="10000" 
                    step="0.001"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="capacitance"
                    min="0.001" 
                    max="1000000"
                    step="0.001"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">µF</span>
                </div>
              </div>

              <!-- Inductance Control -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inductance (L)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    type="range" 
                    v-model.number="inductance"
                    min="0.001" 
                    max="10000" 
                    step="0.001"
                    class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    type="number" 
                    v-model.number="inductance"
                    min="0.001" 
                    max="1000000"
                    step="0.001"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                  <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">mH</span>
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="frequency = 1000; capacitance = 1; inductance = 1"
                    class="px-3 py-2 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                  >
                    Audio (1kHz)
                  </button>
                  <button 
                    @click="frequency = 10000; capacitance = 0.1; inductance = 10"
                    class="px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    RF (10kHz)
                  </button>
                  <button 
                    @click="frequency = 50; capacitance = 100; inductance = 100"
                    class="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Power Line
                  </button>
                  <button 
                    @click="frequency = 1000000; capacitance = 0.001; inductance = 0.1"
                    class="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    RF (1MHz)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results & Visualization -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Calculated Values -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculated Reactances
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Capacitive Reactance -->
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                  <div class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">X<sub>C</sub> (Capacitive)</div>
                  <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {{ formatReactance(capacitiveReactance) }}
                  </div>
                  <div class="text-xs text-blue-500 dark:text-blue-400 mt-1">
                    Leads current by 90°
                  </div>
                </div>

                <!-- Inductive Reactance -->
                <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-200 dark:border-red-800">
                  <div class="text-sm text-red-600 dark:text-red-400 font-medium mb-1">X<sub>L</sub> (Inductive)</div>
                  <div class="text-2xl font-bold text-red-700 dark:text-red-300">
                    {{ formatReactance(inductiveReactance) }}
                  </div>
                  <div class="text-xs text-red-500 dark:text-red-400 mt-1">
                    Lags current by 90°
                  </div>
                </div>

                <!-- Net Reactance -->
                <div :class="{
                  'bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-2': true,
                  'border-purple-200 dark:border-purple-800': !resonanceReached,
                  'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20': resonanceReached
                }">
                  <div class="text-sm font-medium mb-1" :class="resonanceReached ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'">
                    X<sub>net</sub> (Net)
                  </div>
                  <div class="text-2xl font-bold" :class="resonanceReached ? 'text-green-700 dark:text-green-300' : 'text-purple-700 dark:text-purple-300'">
                    {{ formatReactance(netReactance) }}
                  </div>
                  <div class="text-xs mt-1" :class="resonanceReached ? 'text-green-500 dark:text-green-400' : 'text-purple-500 dark:text-purple-400'">
                    {{ resonanceReached ? '🎯 RESONANCE!' : (netReactance > 0 ? 'Inductive (Xl > Xc)' : 'Capacitive (Xc > Xl)') }}
                  </div>
                </div>
              </div>

              <!-- Resonance Frequency -->
              <div class="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-800">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Resonance Frequency (f₀)</div>
                    <div class="text-3xl font-bold text-purple-700 dark:text-purple-300">
                      {{ formatFrequency(resonanceFrequency) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-purple-500 dark:text-purple-400 mb-1">Formula</div>
                    <div class="text-lg font-mono text-purple-600 dark:text-purple-400">
                      f₀ = 1 / 2π√LC
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Frequency Response Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Frequency Response Curve
              </h3>
              
              <div class="relative h-80">
                <svg viewBox="0 0 600 300" class="w-full h-full">
                  <!-- Background Grid -->
                  <defs>
                    <pattern id="gridReactance" width="60" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200 dark:text-gray-700"/>
                    </pattern>
                  </defs>
                  <rect width="600" height="300" fill="url(#gridReactance)" />
                  
                  <!-- Axes -->
                  <line x1="60" y1="20" x2="60" y2="260" stroke="currentColor" stroke-width="2" class="text-gray-400" />
                  <line x1="60" y1="140" x2="580" y2="140" stroke="currentColor" stroke-width="2" class="text-gray-400" />
                  
                  <!-- Axis Labels -->
                  <text x="320" y="290" text-anchor="middle" class="text-xs text-gray-600 dark:text-gray-400">Frequency (Log Scale)</text>
                  <text x="15" y="140" text-anchor="middle" transform="rotate(-90, 15, 140)" class="text-xs text-gray-600 dark:text-gray-400">Reactance (Ω)</text>
                  
                  <!-- Zero Line -->
                  <line x1="60" y1="140" x2="580" y2="140" stroke="currentColor" stroke-width="1" class="text-gray-300 dark:text-gray-600" />
                  
                  <!-- Current Frequency Indicator -->
                  <line x1="60" y1="20" x2="60" y2="260" :stroke="resonanceReached ? '#10b981' : '#8b5cf6'" stroke-width="2" stroke-dasharray="5,5" :x1="60 + (Math.log10(frequency / (resonanceFrequency / 10)) / Math.log10(100)) * 520" />
                  
                  <!-- Plot Lines -->
                  <!-- Capacitive Reactance (Blue) -->
                  <path 
                    :d="frequencyCurveData.map((p, i) => {
                      const x = 60 + (Math.log10(p.frequency / (resonanceFrequency / 10)) / Math.log10(100)) * 520
                      const maxReactance = Math.max(...frequencyCurveData.map(d => Math.max(d.Xc, d.Xl)))
                      const y = 140 - (p.Xc / maxReactance) * 100
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    }).join(' ')"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-width="2"
                  />
                  
                  <!-- Inductive Reactance (Red) -->
                  <path 
                    :d="frequencyCurveData.map((p, i) => {
                      const x = 60 + (Math.log10(p.frequency / (resonanceFrequency / 10)) / Math.log10(100)) * 520
                      const maxReactance = Math.max(...frequencyCurveData.map(d => Math.max(d.Xc, d.Xl)))
                      const y = 140 - (p.Xl / maxReactance) * 100
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    }).join(' ')"
                    fill="none"
                    stroke="#ef4444"
                    stroke-width="2"
                  />
                  
                  <!-- Net Reactance (Purple) -->
                  <path 
                    :d="frequencyCurveData.map((p, i) => {
                      const x = 60 + (Math.log10(p.frequency / (resonanceFrequency / 10)) / Math.log10(100)) * 520
                      const maxReactance = Math.max(...frequencyCurveData.map(d => Math.max(d.Xc, d.Xl)))
                      const y = 140 - (p.Xnet / maxReactance) * 100
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                    }).join(' ')"
                    fill="none"
                    stroke="#8b5cf6"
                    stroke-width="3"
                  />
                  
                  <!-- Current Operating Point -->
                  <circle 
                    :cx="60 + (Math.log10(frequency / (resonanceFrequency / 10)) / Math.log10(100)) * 520"
                    :cy="140"
                    r="6"
                    :fill="resonanceReached ? '#10b981' : '#8b5cf6'"
                    class="animate-pulse"
                  />
                  
                  <!-- Legend -->
                  <g transform="translate(420, 30)">
                    <rect width="150" height="80" fill="white" fill-opacity="0.9" rx="5" />
                    
                    <line x1="10" y1="15" x2="40" y2="15" stroke="#3b82f6" stroke-width="2" />
                    <text x="50" y="19" class="text-xs" fill="#374151">Xc (Capacitive)</text>
                    
                    <line x1="10" y1="35" x2="40" y2="35" stroke="#ef4444" stroke-width="2" />
                    <text x="50" y="39" class="text-xs" fill="#374151">Xl (Inductive)</text>
                    
                    <line x1="10" y1="55" x2="40" y2="55" stroke="#8b5cf6" stroke-width="3" />
                    <text x="50" y="59" class="text-xs" fill="#374151">Xnet</text>
                    
                    <circle cx="25" cy="72" r="4" :fill="resonanceReached ? '#10b981' : '#8b5cf6'" />
                    <text x="50" y="76" class="text-xs" fill="#374151">Operating Point</text>
                  </g>
                  
                  <!-- Frequency Labels -->
                  <text x="60" y="275" text-anchor="middle" class="text-xs text-gray-600 dark:text-gray-400">{{ formatFrequency(resonanceFrequency / 10) }}</text>
                  <text x="320" y="275" text-anchor="middle" class="text-xs text-gray-600 dark:text-gray-400">{{ formatFrequency(resonanceFrequency) }}</text>
                  <text x="580" y="275" text-anchor="middle" class="text-xs text-gray-600 dark:text-gray-400">{{ formatFrequency(resonanceFrequency * 10) }}</text>
                </svg>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Reactance</h3>
              
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">What is Reactance?</h4>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Reactance is the opposition to the flow of alternating current caused by capacitance and inductance. Unlike resistance, reactance depends on frequency and causes phase shifts between voltage and current.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h5 class="font-semibold text-blue-700 dark:text-blue-400 mb-2">Capacitive Reactance (X<sub>C</sub>)</h5>
                    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Decreases as frequency increases</li>
                      <li>• Current leads voltage by 90°</li>
                      <li>• X<sub>C</sub> = 1 / (2πfC)</li>
                      <li>• Acts as a short at high frequencies</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h5 class="font-semibold text-red-700 dark:text-red-400 mb-2">Inductive Reactance (X<sub>L</sub>)</h5>
                    <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Increases as frequency increases</li>
                      <li>• Current lags voltage by 90°</li>
                      <li>• X<sub>L</sub> = 2πfL</li>
                      <li>• Acts as an open at high frequencies</li>
                    </ul>
                  </div>
                </div>

                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h5 class="font-semibold text-purple-700 dark:text-purple-400 mb-2">Resonance</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    At resonance frequency, X<sub>L</sub> = X<sub>C</sub> and they cancel each other out. The net reactance becomes zero, and the circuit becomes purely resistive. This is the principle behind tuned circuits, filters, and oscillators.
                  </p>
                  <div class="mt-2 text-sm font-mono text-purple-600 dark:text-purple-400">
                    f₀ = 1 / (2π√LC)
                  </div>
                </div>

                <div>
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Applications</h5>
                  <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• <strong>Filter Design:</strong> Select desired frequency ranges</li>
                    <li>• <strong>Tuned Circuits:</strong> Radio receivers and transmitters</li>
                    <li>• <strong>Impedance Matching:</strong> Maximize power transfer</li>
                    <li>• <strong>Power Factor Correction:</strong> Cancel inductive loads</li>
                    <li>• <strong>Signal Processing:</strong> Phase shift networks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

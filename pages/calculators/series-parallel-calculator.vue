<script setup lang="ts">
import { ref, computed } from 'vue'
import SeriesParallelCalculator from '~/components/SeriesParallelCalculator.vue'

const pageTitle = ref('Series/Parallel Calculator')
const pageDescription = ref('Calculate total resistance, capacitance, and inductance for series and parallel circuits')

useHead({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          🔌 Series/Parallel Calculator
        </h1>
        <p class="text-xl text-purple-200">
          Calculate total impedance for series and parallel circuits
        </p>
      </div>

      <!-- Main Calculator Component -->
      <SeriesParallelCalculator />

      <!-- Educational Content -->
      <div class="mt-12 grid md:grid-cols-2 gap-6">
        <!-- Series Circuits -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            ⚡ Series Circuits
          </h2>
          <div class="text-purple-100 space-y-3">
            <p>
              In a <strong class="text-yellow-300">series circuit</strong>, components are connected end-to-end in a single path.
            </p>
            <div class="bg-black/30 rounded-lg p-4 mt-4">
              <p class="text-sm text-purple-200 mb-2">For Resistors/Inductors:</p>
              <p class="text-xl font-mono text-green-400">
                R_total = R₁ + R₂ + R₃ + ...
              </p>
            </div>
            <div class="bg-black/30 rounded-lg p-4">
              <p class="text-sm text-purple-200 mb-2">For Capacitors:</p>
              <p class="text-xl font-mono text-green-400">
                1/C_total = 1/C₁ + 1/C₂ + 1/C₃ + ...
              </p>
            </div>
            <div class="mt-4 p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
              <p class="font-semibold text-yellow-200">Key Properties:</p>
              <ul class="list-disc list-inside mt-2 space-y-1">
                <li>Same current flows through all components</li>
                <li>Voltage divides across components</li>
                <li>Total resistance is SUM of all resistances</li>
                <li>If one component fails, circuit opens</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Parallel Circuits -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🔀 Parallel Circuits
          </h2>
          <div class="text-purple-100 space-y-3">
            <p>
              In a <strong class="text-cyan-300">parallel circuit</strong>, components are connected across the same two points.
            </p>
            <div class="bg-black/30 rounded-lg p-4 mt-4">
              <p class="text-sm text-purple-200 mb-2">For Resistors/Inductors:</p>
              <p class="text-xl font-mono text-green-400">
                1/R_total = 1/R₁ + 1/R₂ + 1/R₃ + ...
              </p>
            </div>
            <div class="bg-black/30 rounded-lg p-4">
              <p class="text-sm text-purple-200 mb-2">For Capacitors:</p>
              <p class="text-xl font-mono text-green-400">
                C_total = C₁ + C₂ + C₃ + ...
              </p>
            </div>
            <div class="mt-4 p-4 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
              <p class="font-semibold text-cyan-200">Key Properties:</p>
              <ul class="list-disc list-inside mt-2 space-y-1">
                <li>Same voltage across all components</li>
                <li>Current divides among branches</li>
                <li>Total resistance is LESS than smallest resistor</li>
                <li>Each branch operates independently</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Cases -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">🎯 Special Cases</h2>
        <div class="grid md:grid-cols-3 gap-6 text-purple-100">
          <div>
            <h3 class="font-bold text-yellow-300 mb-2">Two Parallel Components</h3>
            <p class="text-sm mb-2">For two components in parallel:</p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-green-400">
              R_total = (R₁ × R₂) / (R₁ + R₂)
            </div>
          </div>
          <div>
            <h3 class="font-bold text-cyan-300 mb-2">Equal Parallel Components</h3>
            <p class="text-sm mb-2">If all N components have value R:</p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-green-400">
              R_total = R / N
            </div>
          </div>
          <div>
            <h3 class="font-bold text-pink-300 mb-2">Conductance Formula</h3>
            <p class="text-sm mb-2">Using conductance (G = 1/R):</p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-green-400">
              G_total = G₁ + G₂ + G₃ + ...
            </div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">🔧 Common Applications</h2>
        <div class="grid md:grid-cols-2 gap-4 text-purple-100">
          <div class="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
            <h3 class="font-bold text-yellow-200 mb-2">Series Applications</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Voltage dividers</li>
              <li>Current limiting resistors</li>
              <li>LED strings</li>
              <li>Filter networks</li>
              <li>Impedance matching</li>
            </ul>
          </div>
          <div class="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
            <h3 class="font-bold text-cyan-200 mb-2">Parallel Applications</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Power distribution</li>
              <li>Current sharing</li>
              <li>Capacitor banks</li>
              <li>Redundant systems</li>
              <li>Household wiring</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">💡 Design Tips</h2>
        <div class="grid md:grid-cols-2 gap-6 text-purple-100">
          <div>
            <h3 class="font-bold text-yellow-300 mb-2">Series Circuit Tips</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Add resistors to INCREASE total resistance</li>
              <li>Power dissipates in each component (P = I²R)</li>
              <li>Voltage division: V₁ = V_total × (R₁/R_total)</li>
              <li>Used when you need voltage drops across components</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-cyan-300 mb-2">Parallel Circuit Tips</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Add resistors to DECREASE total resistance</li>
              <li>Each branch can have different current</li>
              <li>Used when you need multiple independent loads</li>
              <li>Total current is SUM of branch currents</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

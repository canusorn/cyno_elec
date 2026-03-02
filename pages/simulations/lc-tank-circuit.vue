<script setup lang="ts">
import LCTankCircuit from '~/components/simulations/LCTankCircuit.vue'
import NavigationBar from '~/components/NavigationBar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'LC Tank Circuit Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive LC tank circuit simulation showing energy oscillation, resonance, and frequency response analysis' }
  ]
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            LC Tank Circuit Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Visualize energy oscillation, resonance, and frequency response in parallel LC circuits
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-purple-500">f₀</span> = 1 / (2π√LC) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-purple-500">Q</span> = R√(C/L) &nbsp;&nbsp;|&nbsp;&nbsp;
              <span class="text-purple-500">BW</span> = f₀/Q
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Tank Circuit Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulation -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LCTankCircuit />
      </div>
    </section>

    <!-- Additional Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Deep Dive: Tank Circuit Physics
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Energy Pendulum</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An LC tank circuit is like an electrical pendulum. Just as a pendulum swings back and forth 
              converting between kinetic and potential energy, a tank circuit oscillates between magnetic 
              energy (inductor) and electric energy (capacitor). At resonance, this exchange happens 
              most efficiently, with minimal energy loss per cycle.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Resonance Explained</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Resonance occurs when the inductive reactance (XL = 2πfL) equals the capacitive reactance 
              (XC = 1/2πfC). At this frequency, the reactances cancel out, leaving only the resistive 
              component. In a parallel LC circuit, this creates maximum impedance, while in a series LC 
              circuit, it creates minimum impedance.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Q Factor and Bandwidth</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The quality factor Q determines how "sharp" the resonance curve is:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Q (Q > 10):</strong> Very narrow bandwidth, highly selective, ideal for radio tuning</li>
              <li><strong>Medium Q (3 < Q < 10):</strong> Moderate bandwidth, good general-purpose filters</li>
              <li><strong>Low Q (Q < 3):</strong> Wide bandwidth, less selective, broader frequency response</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Design Considerations</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Component Selection:</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• <strong>Inductors:</strong> Choose low-loss cores (ferrite, air core) for high Q</li>
                <li>• <strong>Capacitors:</strong> Use ceramic or NP0/C0 types for stability</li>
                <li>• <strong>Parasitics:</strong> All real components have parasitic L and C</li>
                <li>• <strong>Temperature:</strong> L and C values drift with temperature</li>
                <li>• <strong>Frequency limits:</strong> Self-resonance limits usable frequency range</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p class="font-semibold text-purple-700 dark:text-purple-300 mb-2">📻 RF Oscillators</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Generate stable carrier frequencies for radio transmission. Colpitts and Hartley 
                  oscillators use tank circuits for frequency determination.
                </p>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p class="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎛️ Bandpass Filters</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Select specific frequency ranges in communication systems. Used in IF stages, 
                  audio equalizers, and signal processing.
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="font-semibold text-green-700 dark:text-green-300 mb-2">🔌 Wireless Power</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Resonant inductive coupling enables efficient wireless charging. Both transmitter 
                  and receiver use tuned tank circuits.
                </p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <p class="font-semibold text-orange-700 dark:text-orange-300 mb-2">📡 Impedance Matching</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Match source and load impedances at RF for maximum power transfer. L-networks 
                  and PI-networks use tank circuits.
                </p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Simulation Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Start with the presets to see different frequency ranges and Q factors</li>
              <li>Adjust resistance to see how Q affects the sharpness of resonance</li>
              <li>Watch the energy animation to visualize the oscillation between L and C</li>
              <li>Use the frequency response graph to understand bandwidth and selectivity</li>
              <li>Observe phase shift below, at, and above resonance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-500 dark:text-gray-400">
          <p class="text-sm">
            Part of the <span class="font-semibold text-purple-500">Cyno Electric</span> interactive learning platform
          </p>
          <p class="text-xs mt-2">
            Built with Nuxt.js, Vue 3, and TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

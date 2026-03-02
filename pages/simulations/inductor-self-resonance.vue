<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductor Self-Resonance
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore how parasitic capacitance affects real inductors at high frequencies
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-purple-500">f<sub>SRF</sub></span> = 1 / (2π√<span class="text-purple-500">LC<sub>p</sub></span>)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Self-Resonant Frequency Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InductorSelfResonance />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Inductor Self-Resonance
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Self-Resonance?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Real inductors are not ideal components. They have parasitic capacitance between the windings, 
              which creates a resonant circuit. At the self-resonant frequency (SRF), the inductive reactance 
              equals the capacitive reactance, and the inductor behaves like a resistor with minimal impedance.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Real Inductor Model</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Equivalent Circuit Components:</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• <strong>L:</strong> The ideal inductance (what you measure at low frequency)</li>
                <li>• <strong>Rs:</strong> Series resistance from wire resistance (DCR)</li>
                <li>• <strong>Cp:</strong> Parasitic capacitance between windings (inter-turn capacitance)</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Frequency Behavior:</h3>
            <div class="space-y-4 mb-6">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <p class="font-semibold text-green-900 dark:text-green-300">Below SRF (Inductive Region)</p>
                <p class="text-green-800 dark:text-green-200 text-sm">
                  The inductor behaves as expected. Impedance increases with frequency (Z = XL = 2πfL).
                  This is where you want to operate your inductor.
                </p>
              </div>
              
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <p class="font-semibold text-purple-900 dark:text-purple-300">At SRF (Resonance)</p>
                <p class="text-purple-800 dark:text-purple-200 text-sm">
                  XL = XC, and they cancel out. The impedance is minimum (just Rs). 
                  The inductor becomes resistive at this frequency.
                </p>
              </div>
              
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <p class="font-semibold text-red-900 dark:text-red-300">Above SRF (Capacitive Region)</p>
                <p class="text-red-800 dark:text-red-200 text-sm">
                  The parasitic capacitance dominates. The "inductor" now behaves like a capacitor! 
                  Impedance decreases with frequency. This is NOT where you want to be.
                </p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Does This Matter?</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Filter Design:</strong> If your operating frequency is near or above SRF, your filter won't work as expected</li>
              <li><strong>Power Supplies:</strong> Switching frequencies should be well below SRF for inductors</li>
              <li><strong>RF Circuits:</strong> SRF determines the useful frequency range of an inductor</li>
              <li><strong>EMI/EMC:</strong> Parasitic capacitance can cause unwanted coupling and resonance issues</li>
              <li><strong>Component Selection:</strong> Choose inductors with SRF at least 10x your operating frequency</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Guidelines:</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p class="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Design Rules of Thumb:</p>
              <ul class="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>• Keep operating frequency ≤ SRF/10 for reliable inductive behavior</li>
                <li>• Higher inductance generally means lower SRF (more turns = more capacitance)</li>
                <li>• Larger inductors (physically) have lower parasitic capacitance</li>
                <li>• Multi-layer windings increase parasitic capacitance significantly</li>
                <li>• Air core inductors have higher Q and SRF than iron core inductors</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Quality Factor (Q)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Q factor represents the ratio of reactive power to resistive losses. Higher Q means 
              a more efficient inductor with lower losses. Q varies with frequency:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              Q = XL / Rs = (2πfL) / Rs
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Q increases with frequency until approaching SRF, where it drops sharply due to parasitic effects.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Parasitic Capacitance Sources:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Inter-winding capacitance:</strong> Capacitance between adjacent turns in the coil</li>
              <li><strong>Layer-to-layer capacitance:</strong> In multi-layer windings, significant capacitance forms</li>
              <li><strong>Core material effects:</strong> Some core materials add dielectric effects</li>
              <li><strong>Lead capacitance:</strong> The inductor leads contribute some capacitance</li>
              <li><strong>PCB layout:</strong> Nearby traces can add parasitic capacitance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import InductorSelfResonance from '~/components/InductorSelfResonance.vue'

// SEO
useHead({
  title: 'Inductor Self-Resonance Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of inductor self-resonance and parasitic capacitance effects. Learn how real inductors behave at high frequencies.' },
    { name: 'keywords', content: 'inductor, self-resonance, parasitic capacitance, SRF, quality factor, high frequency, RF design' }
  ]
})

const $colorMode = useColorMode()
</script>

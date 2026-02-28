<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Resonant Frequency Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate resonant frequency for LC and RLC circuits with interactive visualization
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">f₀</span> = 1 / (2π√LC) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">ω₀</span> = 1 / √LC
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Resonant Frequency Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResonantFrequencyCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Resonance
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Resonance?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Resonance occurs when the inductive reactance (XL) equals the capacitive reactance (XC) in a circuit. 
              At this frequency, the circuit oscillates with maximum amplitude, making it extremely useful for filtering 
              and tuning applications.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>At resonance:</strong> XL = XC, and they cancel each other out</li>
              <li><strong>Series LC:</strong> Minimum impedance (theoretical zero), maximum current</li>
              <li><strong>Parallel LC:</strong> Maximum impedance, minimum current from source</li>
              <li><strong>Energy exchange:</strong> Continuous transfer between electric (C) and magnetic (L) fields</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Radio tuning:</strong> Select specific frequencies from broadcast signals</li>
              <li><strong>Bandpass filters:</strong> Allow only a specific frequency range</li>
              <li><strong>Oscillators:</strong> Generate stable sinusoidal signals</li>
              <li><strong>Wireless charging:</strong> Resonant inductive coupling</li>
              <li><strong>RFID systems:</strong> Resonant tags for identification</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series vs Parallel Resonance:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Series LC Circuit:</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• Minimum impedance at resonance (ideally zero)</li>
                <li>• Maximum current flows at f₀</li>
                <li>• Used for bandpass filters and tuning circuits</li>
                <li>• Voltage across L and C can be very high (Q factor)</li>
              </ul>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Parallel LC Circuit (Tank Circuit):</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• Maximum impedance at resonance (ideally infinite)</li>
                <li>• Minimum current drawn from source at f₀</li>
                <li>• Current circulates between L and C</li>
                <li>• Used in oscillators and RF amplifiers</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Quality Factor (Q):</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The quality factor Q represents the "sharpness" of resonance. Higher Q means a narrower bandwidth 
              and more selective filtering. Q is affected by the resistance in the circuit:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              Q = R / √(L/C) &nbsp;&nbsp;&nbsp; Bandwidth = f₀ / Q
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Reactance Curves:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The visualization above shows how inductive reactance (XL) increases with frequency 
              (XL = 2πfL), while capacitive reactance (XC) decreases with frequency 
              (XC = 1/(2πfC)). At resonance, these two curves cross, creating the condition XL = XC.
            </p>
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
import ResonantFrequencyCalculator from '~/components/ResonantFrequencyCalculator.vue'

// SEO
useHead({
  title: 'Resonant Frequency Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate resonant frequency for LC and RLC circuits. Interactive tool with reactance curves and bandwidth calculations.' },
    { name: 'keywords', content: 'resonant frequency, LC circuit, RLC circuit, tank circuit, bandpass filter, oscillator' }
  ]
})

const $colorMode = useColorMode()
</script>

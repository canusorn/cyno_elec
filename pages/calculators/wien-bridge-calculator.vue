<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🎵 Wien Bridge Oscillator Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate oscillation frequency and component values for Wien bridge oscillator circuits with interactive design tools and real-time calculations.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WienBridgeOscillatorCalculator />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import WienBridgeOscillatorCalculator from '~/components/WienBridgeOscillatorCalculator.vue'

// SEO
useHead({
  title: 'Wien Bridge Oscillator Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Wien bridge oscillator calculator. Design oscillators with frequency-to-component conversion, standard component values, and circuit diagrams.' },
    { name: 'keywords', content: 'Wien bridge oscillator, frequency calculator, RC oscillator, signal generator, audio oscillator, circuit design calculator' }
  ]
})
</script>

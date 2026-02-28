<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔌 Full-Wave Bridge Rectifier Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive full-wave bridge rectifier simulation with real-time waveform visualization, filtering effects, and efficiency calculations.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FullWaveBridgeRectifier />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import FullWaveBridgeRectifier from '~/components/FullWaveBridgeRectifier.vue'

// SEO
useHead({
  title: 'Full-Wave Bridge Rectifier Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive full-wave bridge rectifier simulation with real-time AC to DC conversion visualization. Learn about diode bridge rectification, filtering, and ripple voltage.' },
    { name: 'keywords', content: 'bridge rectifier, full-wave rectifier, AC to DC, diode bridge, power supply, ripple voltage, capacitor filter' }
  ]
})
</script>

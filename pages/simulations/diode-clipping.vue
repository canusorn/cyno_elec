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
            🔌 Diode Clipping Circuits
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how diode clipping circuits modify waveforms by removing portions of the signal above or below threshold levels.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DiodeClippingSimulator />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import DiodeClippingSimulator from '~/components/DiodeClippingSimulator.vue'

// SEO
useHead({
  title: 'Diode Clipping Circuits - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive diode clipping circuit simulator. Learn how series and parallel clippers work with real-time waveform visualization and circuit diagrams.' },
    { name: 'keywords', content: 'diode clipper, waveform shaping, signal conditioning, series clipper, parallel clipper, biased clipper' }
  ]
})
</script>

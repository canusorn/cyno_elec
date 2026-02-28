<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔺 Delta-Wye (Δ-Y) Transformation Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Convert between Delta (Δ) and Wye (Y) resistor configurations with interactive visualizations and step-by-step calculations.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DeltaWyeCalculator />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import DeltaWyeCalculator from '~/components/DeltaWyeCalculator.vue'

// SEO
useHead({
  title: 'Delta-Wye (Δ-Y) Transformation Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Delta-Wye resistor transformation calculator. Convert between Delta (Δ) and Wye (Y) configurations with step-by-step calculations and circuit diagrams.' },
    { name: 'keywords', content: 'delta wye transformation, star delta conversion, resistor network, circuit analysis, Y-Δ transformation' }
  ]
})
</script>

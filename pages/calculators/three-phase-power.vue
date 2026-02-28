<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔌 Three-Phase Power Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate power in three-phase electrical systems with support for Star (Y) and Delta (Δ) connections, balanced and unbalanced loads.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThreePhasePowerCalculator />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import ThreePhasePowerCalculator from '~/components/ThreePhasePowerCalculator.vue'

// SEO
useHead({
  title: 'Three-Phase Power Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate three-phase electrical power with Star (Y) and Delta (Δ) connections. Support for balanced and unbalanced loads with real-time calculations and circuit diagrams.' },
    { name: 'keywords', content: 'three-phase power, star connection, delta connection, balanced load, unbalanced load, electrical power calculator, industrial power' }
  ]
})
</script>

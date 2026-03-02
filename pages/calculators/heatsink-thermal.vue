<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🌡️ Heatsink Thermal Design Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate thermal resistance, temperature rise, and heatsink requirements for electronic components and power devices.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeatsinkThermalCalculator />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import HeatsinkThermalCalculator from '~/components/HeatsinkThermalCalculator.vue'

// SEO
useHead({
  title: 'Heatsink Thermal Design Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate heatsink thermal requirements, temperature rise, and thermal resistance for electronic components. Includes junction temperature analysis and thermal management design.' },
    { name: 'keywords', content: 'heatsink calculator, thermal design, thermal resistance, junction temperature, heat dissipation, power electronics cooling' }
  ]
})
</script>

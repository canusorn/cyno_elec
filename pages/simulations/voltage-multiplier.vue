<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Voltage Multiplier Circuit
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how voltage multipliers convert AC to higher DC voltages using capacitors and diodes
          </p>
          
          <!-- Voltage Multiplier Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">V</span>
              <span class="text-gray-400">out</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">N</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary">V</span>
              <span class="text-gray-400">peak</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VoltageMultiplierSimulator />
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
import VoltageMultiplierSimulator from '~/components/VoltageMultiplierSimulator.vue'

const colorMode = useColorMode()

// SEO
useHead({
  title: 'Voltage Multiplier Circuit Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive voltage multiplier circuit simulator. Learn how half-wave rectifiers and voltage doublers work to convert AC to higher DC voltages.' },
    { name: 'keywords', content: 'voltage multiplier, voltage doubler, half-wave rectifier, charge pump, DC-DC converter, circuit simulation' }
  ]
})
</script>

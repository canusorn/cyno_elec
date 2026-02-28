<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-500/5 dark:to-blue-500/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔌 Half-Bridge Motor Driver Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive H-bridge motor control simulation with PWM speed control, direction switching, and real-time power calculations.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HalfBridgeMotorDriver />
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import HalfBridgeMotorDriver from '~/components/HalfBridgeMotorDriver.vue'

// SEO
useHead({
  title: 'Half-Bridge Motor Driver Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive half-bridge motor driver simulation with PWM speed control, direction switching, animated circuit diagrams, and real-time power calculations.' },
    { name: 'keywords', content: 'half-bridge, H-bridge, motor driver, PWM control, DC motor, motor speed control, MOSFET driver' }
  ]
})
</script>

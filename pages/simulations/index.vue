<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Circuit Simulations
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            จำลองวงจรไฟฟ้าแบบ interactive ปรับค่า R, V, I ได้แบบ real-time
          </p>
        </div>
      </div>
    </section>

    <!-- Simulations -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8">
          <!-- Ohm's Law Simulator -->
          <CircuitSimulator />

          <!-- More simulators coming soon -->
          <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div class="text-6xl mb-4">🔧</div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              เร็วๆ นี้
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Series Circuit Simulator • Parallel Circuit Simulator • RC/RL Circuits
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
import CircuitSimulator from '~/components/CircuitSimulator.vue'
</script>

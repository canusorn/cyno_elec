<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            — Series Circuit Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how voltage divides across series components while current remains constant
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SeriesCircuit />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Series Circuits
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Series Circuit?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a series circuit, components are connected end-to-end in a single path. The same current flows through each component,
              and the total voltage is divided among them proportionally to their resistance.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Current is the same</strong> through all components (I_total = I_1 = I_2 = ...)</li>
              <li><strong>Voltage divides</strong> across components based on resistance (V_total = V_1 + V_2 + ...)</li>
              <li><strong>Total resistance</strong> is the sum of all resistances (R_total = R_1 + R_2 + ...)</li>
              <li><strong>Single path</strong> for current flow - if one component fails, the entire circuit opens</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>String lights (old Christmas decorations)</li>
              <li>Battery banks (cells in series increase voltage)</li>
              <li>Voltage dividers for sensor circuits</li>
              <li>Fuses and circuit breakers (safety devices)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Voltage Divider Rule:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The voltage across a specific resistor is proportional to its resistance:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              V_n = V_source × (R_n ÷ R_total)
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Ohm's Law in Series:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              I = V_source ÷ R_total
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Dissipation:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Each resistor dissipates power based on the current flowing through it:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              P_n = I² × R_n
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series vs Parallel:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">✅ Series Advantages:</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Simple to design</li>
                  <li>• Same current everywhere</li>
                  <li>• Easy to add voltages</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 class="font-bold text-red-800 dark:text-red-300 mb-2">❌ Series Disadvantages:</h4>
                <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                  <li>• One failure breaks everything</li>
                  <li>• Total resistance increases</li>
                  <li>• Harder to control individual components</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              If you have three 100Ω resistors in series with a 12V battery:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Total resistance: 100 + 100 + 100 = 300Ω</li>
              <li>Current: 12V ÷ 300Ω = 0.04A (40mA)</li>
              <li>Voltage across each resistor: 0.04A × 100Ω = 4V</li>
              <li>Power in each resistor: (0.04A)² × 100Ω = 0.16W</li>
            </ul>
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
import SeriesCircuit from '~/components/SeriesCircuit.vue'

// SEO
useHead({
  title: 'Series Circuit Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive series circuit simulator. Learn how voltage divides across components and visualize current flow in series circuits.' },
    { name: 'keywords', content: 'series circuit, voltage divider, circuit simulator, electrical engineering' }
  ]
})

const colorMode = useColorMode()
</script>

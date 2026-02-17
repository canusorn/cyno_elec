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
            ∥ Parallel Circuit Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how current divides between parallel branches while voltage remains constant
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallelCircuit />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Parallel Circuits
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Parallel Circuit?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a parallel circuit, components are connected across common points, creating multiple paths for current flow. 
              Each branch operates independently - if one fails, others continue working.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage is the same</strong> across all branches (V_total = V_1 = V_2 = ...)</li>
              <li><strong>Current divides</strong> among branches based on resistance (I_total = I_1 + I_2 + ...)</li>
              <li><strong>Total resistance</strong> is less than the smallest branch resistance</li>
              <li><strong>Multiple paths</strong> for current flow</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Household wiring (outlets, lights, appliances)</li>
              <li>Electronics power distribution</li>
              <li>Speaker systems</li>
              <li>Battery banks (cells in parallel increase capacity)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Current Divider Rule:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The current through a specific branch is inversely proportional to its resistance:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              I_n = V_total ÷ R_n
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Two-Resistor Shortcut:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              R_total = (R_1 × R_2) ÷ (R_1 + R_2)
            </div>
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
import ParallelCircuit from '~/components/ParallelCircuit.vue'

// SEO
useHead({
  title: 'Parallel Circuit Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive parallel circuit simulator. Learn how current divides between parallel branches and visualize circuit behavior.' },
    { name: 'keywords', content: 'parallel circuit, current divider, circuit simulator, electrical engineering' }
  ]
})

const colorMode = useColorMode()
</script>

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
            🔬 Differential Amplifier Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how differential amplifiers work with interactive visualization of input/output signals
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DifferentialAmplifier />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Differential Amplifiers
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Differential Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A differential amplifier amplifies the difference between two input signals while rejecting any signals that are common to both inputs. 
              This makes it extremely useful for amplifying small signals in noisy environments.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Concepts:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Differential Input (V_diff):</strong> V<sub>in1</sub> - V<sub>in2</sub> - the difference between the two inputs</li>
              <li><strong>Common-Mode Input (V_cm):</strong> (V<sub>in1</sub> + V<sub>in2</sub>) / 2 - the average of the two inputs</li>
              <li><strong>Differential Gain (A_d):</strong> Gain applied to the difference signal</li>
              <li><strong>Common-Mode Rejection (CMR):</strong> Ability to reject signals common to both inputs</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>V_out = A_d × (V<sub>in1</sub> - V<sub>in2</sub>)</p>
              <p>V_diff = V<sub>in1</sub> - V<sub>in2</sub></p>
              <p>V_cm = (V<sub>in1</sub> + V<sub>in2</sub>) / 2</p>
              <p>CMRR (dB) = 20 × log₁₀(A_d / A_cm)</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Instrumentation amplifiers for sensors</li>
              <li>Audio equipment for noise cancellation</li>
              <li>Analog-to-digital converter input stages</li>
              <li>Biomedical signal processing (ECG, EEG)</li>
              <li>Communication systems</li>
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
import DifferentialAmplifier from '~/components/DifferentialAmplifier.vue'

// SEO
useHead({
  title: 'Differential Amplifier Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive differential amplifier simulator. Learn how differential amplifiers work with real-time visualization of input/output signals.' },
    { name: 'keywords', content: 'differential amplifier, op-amp, CMRR, common-mode rejection, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

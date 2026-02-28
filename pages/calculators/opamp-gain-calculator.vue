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
            🧮 Op-Amp Gain Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate gains for various operational amplifier configurations with real-time results
          </p>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OpAmpGainCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Op-Amp Gain Configurations
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an Operational Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An operational amplifier (op-amp) is a high-gain electronic voltage amplifier with a differential input. 
              Op-amps are among the most widely used electronic devices today, being used in a vast array of consumer, industrial, and scientific devices.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Configurations:</h3>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-3">
              <div>
                <p class="font-bold text-purple-600 dark:text-purple-400">Inverting Amplifier:</p>
                <p>A_v = -R_f / R_in</p>
              </div>
              <div>
                <p class="font-bold text-green-600 dark:text-green-400">Non-Inverting Amplifier:</p>
                <p>A_v = 1 + (R_f / R_in)</p>
              </div>
              <div>
                <p class="font-bold text-blue-600 dark:text-blue-400">Differential Amplifier:</p>
                <p>A_v = R_f / R_in (for matched resistors)</p>
              </div>
              <div>
                <p class="font-bold text-orange-600 dark:text-orange-400">Voltage Follower:</p>
                <p>A_v = 1 (unity gain)</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Gain-Bandwidth Product:</strong> Higher gain reduces available bandwidth</li>
              <li><strong>Slew Rate:</strong> Limits how fast the output can change</li>
              <li><strong>Input Impedance:</strong> Varies by configuration (non-inverting has higher Z_in)</li>
              <li><strong>Offset Voltage:</strong> Small DC offset can be amplified</li>
              <li><strong>Stability:</strong> Some configurations may require compensation</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">When to Use Each Configuration:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Inverting:</strong> When you need signal inversion and impedance transformation</li>
              <li><strong>Non-Inverting:</strong> When you need high input impedance and no inversion</li>
              <li><strong>Differential:</strong> When measuring the difference between two signals</li>
              <li><strong>Voltage Follower:</strong> As a buffer to isolate stages</li>
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
import OpAmpGainCalculator from '~/components/OpAmpGainCalculator.vue'

// SEO
useHead({
  title: 'Op-Amp Gain Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate operational amplifier gains for inverting, non-inverting, differential, and voltage follower configurations.' },
    { name: 'keywords', content: 'op-amp calculator, operational amplifier, gain calculator, inverting amplifier, non-inverting amplifier' }
  ]
})

const colorMode = useColorMode()
</script>

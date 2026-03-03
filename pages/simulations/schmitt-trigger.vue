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
            📊 Schmitt Trigger Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Understand hysteresis and noise immunity in Schmitt Trigger circuits
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SchmittTrigger />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Schmitt Triggers
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Schmitt Trigger?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A Schmitt Trigger is a comparator circuit with positive feedback that implements hysteresis. 
              Unlike a standard comparator which has a single threshold, a Schmitt Trigger has two different threshold 
              voltages for rising and falling edges, providing excellent noise immunity.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How Hysteresis Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Upper Threshold (V_UT):</strong> Input voltage must rise above this level to switch output HIGH</li>
              <li><strong>Lower Threshold (V_LT):</strong> Input voltage must fall below this level to switch output LOW</li>
              <li><strong>Hysteresis Voltage:</strong> The difference between V_UT and V_LT creates the noise immunity band</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas (Non-Inverting Configuration):</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>V_UT = V_CC × (R₂ ÷ (R₁ + R₂))</p>
              <p>V_LT = V_CC × (R₂ ÷ (R₁ + R₂))</p>
              <p>V_hysteresis = V_UT - V_LT</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Noise Immunity Benefits:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Debouncing:</strong> Eliminates multiple switching from noisy signals</li>
              <li><strong>Clean Transitions:</strong> Provides sharp, well-defined output edges</li>
              <li><strong>Signal Conditioning:</strong> Converts slowly changing or noisy signals into clean digital pulses</li>
              <li><strong>Oscillator Circuits:</strong> Creates stable square wave generators</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Switch debouncing for mechanical buttons and switches</li>
              <li>Signal conditioning for sensor inputs</li>
              <li>Square wave and pulse generator circuits</li>
              <li>Level detection and threshold detection systems</li>
              <li>Relaxation oscillators and function generators</li>
              <li>Power supply monitoring and brown-out detection</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Transfer Characteristic:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Schmitt Trigger has a unique transfer characteristic with hysteresis. As the input voltage increases, 
              the output switches from LOW to HIGH at V_UT. As the input decreases, it switches from HIGH to LOW at V_LT. 
              This creates two different switching paths, preventing rapid oscillation when the input is near the threshold.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Resistor Ratio:</strong> The R₁/R₂ ratio determines the hysteresis width</li>
              <li><strong>Supply Voltage:</strong> V_CC affects the absolute threshold values</li>
              <li><strong>Speed vs. Noise:</strong> Larger hysteresis = better noise immunity but slower response</li>
              <li><strong>Op-Amp Selection:</strong> Choose op-amps with sufficient slew rate and output current</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
              <p class="text-blue-800 dark:text-blue-300 mb-2">
                <strong>Temperature Thermostat:</strong> A heating system uses a Schmitt Trigger to control a furnace. 
                With hysteresis set to ±2°C, the furnace turns ON when temperature drops below 18°C and stays ON 
                until it reaches 22°C, preventing rapid cycling that would waste energy and wear out components.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Experiment with the Simulator:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting the input voltage slowly across the threshold points and observe how the output state 
              changes at different voltage levels depending on whether you're going up or down. Notice how noise 
              in the middle of the hysteresis band doesn't cause unwanted switching!
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
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import SchmittTrigger from '~/components/SchmittTrigger.vue'

// SEO
useHead({
  title: 'Schmitt Trigger Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Schmitt Trigger simulator. Learn about hysteresis, noise immunity, and positive feedback in comparator circuits.' },
    { name: 'keywords', content: 'Schmitt trigger, hysteresis, comparator, noise immunity, signal conditioning, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

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
            🔌 Transistor Switch Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how NPN transistors work as electronic switches with interactive visualization
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TransistorSwitch />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Transistor Switches
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Transistor Switch?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A transistor can be used as an electronic switch to control devices like LEDs, motors, relays, and other components. 
              When the base receives sufficient current, the transistor switches ON, allowing current to flow from collector to emitter.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">NPN Transistor Operation:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Cutoff (OFF):</strong> When base current is zero or below threshold, no current flows from collector to emitter</li>
              <li><strong>Active (ON):</strong> When base current is sufficient, the transistor conducts current from collector to emitter</li>
              <li><strong>Saturation:</strong> Maximum collector current flows, transistor fully ON (V_CE ≈ 0.2V)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>I_B = (V_in - V_BE) / R_B</p>
              <p>I_C = h_FE × I_B</p>
              <p>V_out = V_CC - (I_C × R_L)</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Driving high-power loads (motors, relays, solenoids)</li>
              <li>Logic gates and digital circuits</li>
              <li>LED dimming and control</li>
              <li>Amplifier circuits</li>
              <li>Switching power supplies</li>
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
import TransistorSwitch from '~/components/TransistorSwitch.vue'

// SEO
useHead({
  title: 'Transistor Switch Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive NPN transistor switch simulator. Learn how transistors work as electronic switches with real-time visualization.' },
    { name: 'keywords', content: 'transistor switch, NPN transistor, BJT, electronic switch, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

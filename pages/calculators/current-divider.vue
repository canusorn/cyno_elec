<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Current Divider Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate how current splits in parallel circuits with interactive visualization
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">I<sub>n</sub></span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">I<sub>total</sub></span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">(R<sub>eq</sub></span>
              <span class="text-gray-400">/</span>
              <span class="text-primary-highlight">R<sub>n</sub>)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Branch Current = Total Current × (Equivalent Resistance ÷ Branch Resistance)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurrentDivider />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Current Division
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Current Division?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a parallel circuit, the total current from the source divides among the parallel branches. 
              The current divider rule allows us to calculate how much current flows through each branch based on its resistance.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Principles:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Inverse Relationship:</strong> Lower resistance branches draw MORE current</li>
              <li><strong>Current Conservation:</strong> The sum of branch currents equals total current (Kirchhoff's Current Law)</li>
              <li><strong>Equal Voltages:</strong> All parallel branches have the same voltage across them</li>
              <li><strong>Power Distribution:</strong> Lower resistance branches dissipate more power</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Current Divider Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-3">
              <p><strong>For two resistors:</strong></p>
              <p class="ml-4">I₁ = I_total × [R₂ / (R₁ + R₂)]</p>
              <p class="ml-4">I₂ = I_total × [R₁ / (R₁ + R₂)]</p>
              
              <p class="mt-3"><strong>General form (for any branch n):</strong></p>
              <p class="ml-4">Iₙ = I_total × (R_eq / Rₙ)</p>
              <p class="ml-4">where R_eq = (1/R₁ + 1/R₂ + ... + 1/Rₙ)⁻¹</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Voltage Divider:</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Voltage Divider (Series):</strong> Voltage divides proportionally to resistance
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Current Divider (Parallel):</strong> Current divides inversely to resistance
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Think of it this way: Current takes the path of least resistance!
              </p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Current Limiting:</strong> Designing parallel LED arrays with balanced brightness</li>
              <li><strong>Power Distribution:</strong> Splitting current between multiple loads</li>
              <li><strong>Sensor Networks:</strong> Parallel sensor circuits with current sharing</li>
              <li><strong>Audio Systems:</strong> Splitting audio signals to multiple speakers</li>
              <li><strong>Battery Management:</strong> Parallel battery cell current balancing</li>
              <li><strong>Current Mirrors:</strong> Copying a reference current in integrated circuits</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>For equal current sharing, use equal resistance values in all branches</li>
              <li>To make one branch dominant, use much lower resistance in that branch</li>
              <li>Always verify that branch currents don't exceed component ratings</li>
              <li>Consider power dissipation: P = I²R for each branch</li>
              <li>Use the current divider rule with Thevenin equivalent circuits for complex networks</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Problem:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Problem:</strong> A 12V source connects to two parallel resistors: R₁ = 10Ω and R₂ = 20Ω. Calculate the current through each resistor.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-2 mt-3">
                <strong>Solution:</strong>
              </p>
              <p class="text-gray-600 dark:text-gray-400 ml-4">
                R_eq = (1/10 + 1/20)⁻¹ = (0.1 + 0.05)⁻¹ = 6.67Ω<br>
                I_total = 12V / 6.67Ω = 1.8A<br>
                I₁ = 1.8A × (6.67Ω / 10Ω) = 1.2A<br>
                I₂ = 1.8A × (6.67Ω / 20Ω) = 0.6A
              </p>
              <p class="text-gray-600 dark:text-gray-400 ml-4 mt-2">
                ✓ Check: 1.2A + 0.6A = 1.8A ✓
              </p>
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
import CurrentDivider from '~/components/CurrentDivider.vue'

// SEO
useHead({
  title: 'Current Divider Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate current distribution in parallel circuits with the Current Divider Rule. Interactive visualization with real-time calculations.' },
    { name: 'keywords', content: 'current divider, parallel circuit, electrical calculator, current division, Ohm\'s law' }
  ]
})

const colorMode = useColorMode()
</script>

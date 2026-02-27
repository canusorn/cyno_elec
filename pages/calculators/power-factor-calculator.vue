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
            ⚡ Power Factor Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Understand AC power systems with interactive power triangle visualization
          </p>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PowerFactorCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Power Factor
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Power Factor?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Power factor is the ratio of real power (P) to apparent power (S) in an AC electrical system. 
              It represents how efficiently electrical power is being converted into useful work output.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Power Triangle:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Real Power (P):</strong> Measured in Watts (W) - the actual power that does useful work</li>
              <li><strong>Reactive Power (Q):</strong> Measured in Volt-Amperes Reactive (VAR) - power stored and released by inductors and capacitors</li>
              <li><strong>Apparent Power (S):</strong> Measured in Volt-Amperes (VA) - the combination of real and reactive power</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>S = √(P² + Q²)</p>
              <p>PF = P / S = cos(φ)</p>
              <p>φ = arccos(PF)</p>
              <p>Q = S × sin(φ)</p>
              <p>Efficiency Loss = (1 - PF) × 100%</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Factor Values:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">PF Range</th>
                    <th class="text-left py-2">Rating</th>
                    <th class="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0.95 - 1.0</td>
                    <td class="py-2 text-green-600 font-semibold">Excellent</td>
                    <td class="py-2">Minimal reactive power, highly efficient</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0.85 - 0.95</td>
                    <td class="py-2 text-blue-600 font-semibold">Good</td>
                    <td class="py-2">Acceptable for most applications</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0.75 - 0.85</td>
                    <td class="py-2 text-yellow-600 font-semibold">Fair</td>
                    <td class="py-2">May need correction for large systems</td>
                  </tr>
                  <tr>
                    <td class="py-2">< 0.75</td>
                    <td class="py-2 text-red-600 font-semibold">Poor</td>
                    <td class="py-2">Requires power factor correction</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Leading vs Lagging Power Factor:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Lagging PF:</strong> Current lags voltage (inductive loads like motors, transformers)</li>
              <li><strong>Leading PF:</strong> Current leads voltage (capacitive loads)</li>
              <li><strong>Unity PF:</strong> Current and voltage are in phase (resistive loads)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Power Factor Matters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Reduced Efficiency:</strong> Low PF increases current flow for the same power output</li>
              <li><strong>Higher Energy Costs:</strong> Utilities may charge penalties for low PF</li>
              <li><strong>Increased Losses:</strong> More current means more I²R losses in conductors</li>
              <li><strong>Larger Equipment:</strong> Oversized conductors and transformers needed</li>
              <li><strong>Voltage Drop:</strong> Poor PF causes excessive voltage drop in systems</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Factor Correction:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Power factor can be improved by adding capacitors to counteract inductive loads. 
              This reduces reactive power and brings PF closer to unity (1.0). Common methods include:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Capacitor banks installed at motor terminals</li>
              <li>Automatic power factor correction units</li>
              <li>Synchronous condensers</li>
              <li>Phase advancing equipment</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Industrial:</strong> Large motor loads, induction furnaces, welding equipment</li>
              <li><strong>Commercial:</strong> HVAC systems, lighting ballasts, office equipment</li>
              <li><strong>Residential:</strong> Refrigerators, air conditioners, washing machines</li>
              <li><strong>Renewable Energy:</strong> Inverter systems, grid-tied solar installations</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Calculation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 space-y-2 text-sm">
              <p><strong>Given:</strong> P = 1000W, Q = 500VAR</p>
              <p><strong>Solution:</strong></p>
              <p>S = √(1000² + 500²) = √1,250,000 = 1,118 VA</p>
              <p>PF = 1000 / 1118 = 0.894 (Good)</p>
              <p>φ = arccos(0.894) = 26.6°</p>
              <p>Efficiency Loss = (1 - 0.894) × 100 = 10.6%</p>
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
import PowerFactorCalculator from '~/components/PowerFactorCalculator.vue'

// SEO
useHead({
  title: 'Power Factor Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive power factor calculator. Learn about AC power systems, power triangle, real/reactive/apparent power with real-time visualization.' },
    { name: 'keywords', content: 'power factor, AC power, electrical calculator, reactive power, apparent power, power triangle' }
  ]
})

const colorMode = useColorMode()
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <ChartBarIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Wheatstone Bridge Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate bridge balance and output voltage for precise resistance measurements
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Balance:</span> R1 × R4 = R2 × R3 &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">Vout</span> = VB - VA
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Wheatstone Bridge Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WheatstoneBridgeCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding the Wheatstone Bridge
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Wheatstone Bridge?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Wheatstone bridge is an electrical circuit used to measure an unknown electrical resistance 
              by balancing two legs of a bridge circuit, one leg of which includes the unknown component. 
              It was invented by Samuel Hunter Christie in 1833 and improved by Sir Charles Wheatstone in 1843.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Bridge Circuit:</strong> Four resistors arranged in a diamond configuration</li>
              <li><strong>Voltage Divider:</strong> Two voltage dividers (R1-R3 and R2-R4) create comparison voltages</li>
              <li><strong>Balance Condition:</strong> When R1 × R4 = R2 × R3, the bridge is balanced (Vout = 0)</li>
              <li><strong>Measurement:</strong> Small resistance changes create measurable output voltage</li>
              <li><strong>High Sensitivity:</strong> Can detect resistance changes as small as 0.01%</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Analysis:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Node A Voltage:</strong> VA = Vin × R3 / (R1 + R3)</li>
              <li><strong>Node B Voltage:</strong> VB = Vin × R4 / (R2 + R4)</li>
              <li><strong>Output Voltage:</strong> Vout = VB - VA</li>
              <li><strong>At Balance:</strong> Vout = 0 when the ratio condition is met</li>
              <li><strong>Sensitivity:</strong> ΔVout depends on the ratio of resistance changes</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Description</th>
                    <th class="text-left py-2">Sensor Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Strain Measurement</td>
                    <td class="py-2">Detects mechanical deformation</td>
                    <td class="py-2">Strain gauge</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Temperature Sensing</td>
                    <td class="py-2">Precise temperature measurement</td>
                    <td class="py-2">PT100 RTD</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Pressure Sensors</td>
                    <td class="py-2">Measures pressure changes</td>
                    <td class="py-2">Piezoresistive</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Force Measurement</td>
                    <td class="py-2">Load cells and scales</td>
                    <td class="py-2">Load cell</td>
                  </tr>
                  <tr>
                    <td class="py-2">Resistance Measurement</td>
                    <td class="py-2">Precision resistance testing</td>
                    <td class="py-2">Unknown resistor</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Strain Gauge Application:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              One of the most common applications is strain measurement. A strain gauge changes resistance slightly 
              when stretched or compressed (typically 120Ω with ~2% maximum change). The Wheatstone bridge converts 
              this tiny resistance change into a measurable voltage. This is the principle behind load cells used 
              in digital scales and industrial weighing systems.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Temperature Measurement (RTD):</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Resistance Temperature Detectors (RTDs) like PT100 use the Wheatstone bridge for precise temperature 
              measurement. PT100 has 100Ω resistance at 0°C and increases approximately 0.385Ω per °C. The bridge 
              configuration allows detection of these small resistance changes with high accuracy.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Bridge Configurations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Quarter Bridge:</strong> One active element (one strain gauge)</li>
              <li><strong>Half Bridge:</strong> Two active elements (two strain gauges in adjacent arms)</li>
              <li><strong>Full Bridge:</strong> Four active elements (all four arms are strain gauges)</li>
              <li><strong>Full Bridge Benefits:</strong> Maximum sensitivity, temperature compensation, 4× output</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Input Voltage:</strong> Higher Vin increases sensitivity but also self-heating</li>
              <li><strong>Resistance Values:</strong> Lower resistances allow higher current but more power dissipation</li>
              <li><strong>Temperature Effects:</strong> All resistors change with temperature (use matched sensors)</li>
              <li><strong>Lead Resistance:</strong> Long wires add resistance (use 3-wire or 4-wire compensation)</li>
              <li><strong>Bridge Excitation:</strong> Can be DC or AC (AC helps with noise reduction)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advantages of Wheatstone Bridge:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Sensitivity:</strong> Detects very small resistance changes</li>
              <li><strong>Ratiometric Measurement:</strong> Independent of absolute supply voltage variations</li>
              <li><strong>Temperature Compensation:</strong> Can be designed to reject common-mode temperature effects</li>
              <li><strong>Simple Construction:</strong> Uses only passive components (resistors)</li>
              <li><strong>Wide Applications:</strong> From precision measurement to industrial sensors</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Calculations:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Scenario</th>
                    <th class="text-left py-2">R1</th>
                    <th class="text-left py-2">R2</th>
                    <th class="text-left py-2">R3</th>
                    <th class="text-left py-2">R4</th>
                    <th class="text-left py-2">Vout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Balanced</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">0.000V</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Strain (+1%)</td>
                    <td class="py-2">120Ω</td>
                    <td class="py-2">120Ω</td>
                    <td class="py-2">120Ω</td>
                    <td class="py-2">121.2Ω</td>
                    <td class="py-2">0.0125V</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Unbalanced</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">220Ω</td>
                    <td class="py-2">330Ω</td>
                    <td class="py-2">470Ω</td>
                    <td class="py-2">0.656V</td>
                  </tr>
                  <tr>
                    <td class="py-2">PT100 @ 100°C</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">100Ω</td>
                    <td class="py-2">138.5Ω</td>
                    <td class="py-2">0.471V</td>
                  </tr>
                </tbody>
              </table>
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
import WheatstoneBridgeCalculator from '~/components/WheatstoneBridgeCalculator.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Wheatstone Bridge Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Wheatstone bridge calculator. Learn bridge balance conditions, calculate output voltage, and understand resistance measurement techniques.' },
    { name: 'keywords', content: 'Wheatstone bridge, resistance measurement, strain gauge, RTD, bridge circuit, voltage divider, calculator' }
  ]
})

const colorMode = useColorMode()
</script>

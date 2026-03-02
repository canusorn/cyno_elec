<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            7805 Voltage Regulator Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate component values and thermal requirements for the classic 7805 linear voltage regulator
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary-highlight">Vout</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">5.0V</span>
              <span class="text-gray-400">±</span>
              <span class="text-primary-highlight">0.2V</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Fixed positive voltage regulator</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Regulator7805Calculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding the 7805 Regulator
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is the 7805?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The 7805 is a classic <strong>linear voltage regulator</strong> that provides a fixed +5V output from a higher input voltage. 
              It's part of the 78xx series of voltage regulators and has been a staple in electronics since the 1970s.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Specifications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Output Voltage:</strong> +5V ± 0.2V (4.8V - 5.2V)</li>
              <li><strong>Maximum Input Voltage:</strong> 35V (typically 25V recommended)</li>
              <li><strong>Maximum Output Current:</strong> 1.5A (with proper heatsinking)</li>
              <li><strong>Dropout Voltage:</strong> ~2V (input must be at least 7V)</li>
              <li><strong>Ripple Rejection:</strong> 60-80dB</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Design:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The 7805 requires only two external capacitors for stable operation:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">Input Capacitor (Cin)</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Typically 0.33µF ceramic capacitor. Placed close to the input pin to stabilize the regulator and prevent oscillation.</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-purple-700 dark:text-purple-300 mb-2">Output Capacitor (Cout)</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Typically 0.1µF ceramic capacitor. Improves transient response and reduces output ripple.</p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Dissipation & Thermal Management:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The 7805 is a <strong>linear regulator</strong>, meaning it dissipates excess power as heat. The power dissipation is:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Power Dissipation:</strong> P = (Vin - Vout) × Iout</div>
              <div><strong>Example:</strong> P = (12V - 5V) × 0.5A = 3.5W</div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Heatsink Requirements:</strong>
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Power &lt; 0.5W: No heatsink needed (TO-220 package)</li>
              <li>Power 0.5W - 2W: Small heatsink recommended</li>
              <li>Power &gt; 2W: Large heatsink required</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Efficiency Considerations:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Linear regulators are simple and provide clean output, but they're not efficient:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div>Efficiency = (Vout × Iout) ÷ (Vin × Iout) × 100%</div>
              <div>Efficiency = Vout ÷ Vin × 100%</div>
            </div>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 my-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                <strong>Note:</strong> At 12V input, efficiency is only 42% (5V ÷ 12V). For higher efficiency applications, consider a switching regulator like a buck converter.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Ideal For:</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Low power circuits (&lt;100mA)</li>
                  <li>• Prototyping and breadboarding</li>
                  <li>• Noise-sensitive analog circuits</li>
                  <li>• Battery-powered devices</li>
                  <li>• Simple power supplies</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Not Ideal For:</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• High current applications (&gt;500mA)</li>
                  <li>• High voltage differentials</li>
                  <li>• Battery-operated devices (efficiency)</li>
                  <li>• Compact designs (heatsink space)</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Package Types:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Package</th>
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Max Current</th>
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Thermal RθJA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <td class="py-2 text-gray-600 dark:text-gray-400">TO-220</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">1.5A</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">65°C/W (no heatsink)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <td class="py-2 text-gray-600 dark:text-gray-400">TO-92</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">100mA</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">160°C/W</td>
                  </tr>
                  <tr>
                    <td class="py-2 text-gray-600 dark:text-gray-400">SOT-223</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">500mA</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">100°C/W</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Alternatives:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>7805 variants:</strong> 78L05 (100mA), 78M05 (500mA), 78S05 (2A)</li>
              <li><strong>Adjustable regulators:</strong> LM317 (1.25-37V adjustable)</li>
              <li><strong>Low-dropout (LDO):</strong> AMS1117-5.0 (dropout ~1.1V)</li>
              <li><strong>Switching regulators:</strong> Buck converters for high efficiency</li>
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
import Regulator7805Calculator from '~/components/Regulator7805Calculator.vue'

// SEO
useHead({
  title: '7805 Voltage Regulator Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate component values, power dissipation, and thermal requirements for 7805 linear voltage regulator circuits. Includes input/output capacitor sizing and heatsink calculations.' },
    { name: 'keywords', content: '7805, voltage regulator, linear regulator, power supply, heatsink calculator, capacitor sizing' }
  ]
})

const colorMode = useColorMode()
</script>

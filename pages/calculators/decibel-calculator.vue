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
            <SpeakerWaveIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Decibel Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Convert between linear ratios and decibels for power, voltage, and current
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">dB</span> = <span class="text-primary-highlight">10</span> × log₁₀(<span class="text-primary-highlight">P₂</span>/<span class="text-primary-highlight">P₁</span>)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Power Ratio Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DecibelCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Decibels
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Decibel?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The decibel (dB) is a logarithmic unit used to express the ratio of two values of power or field quantity. 
              Unlike linear ratios, decibels compress a wide range of values into a more manageable scale, making them 
              ideal for representing signals that vary over many orders of magnitude.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Use Decibels?</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Compresses wide ranges:</strong> 1:1,000,000 becomes 60 dB</li>
              <li><strong>Multiplicative becomes additive:</strong> Gains in series can be added instead of multiplied</li>
              <li><strong>Matches human perception:</strong> Hearing and vision respond logarithmically</li>
              <li><strong>Industry standard:</strong> Used in audio, RF, telecommunications, and acoustics</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power vs Voltage/Current:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Power:</strong> dB = 10 × log₁₀(P₂/P₁) — Power is proportional to the square of voltage</li>
              <li><strong>Voltage/Current:</strong> dB = 20 × log₁₀(V₂/V₁) — Field quantities use 20 as the multiplier</li>
              <li><strong>The factor of 2:</strong> Because power ∝ V², doubling voltage quadruples power</li>
              <li><strong>Equal impedance:</strong> Voltage/current formulas assume Z₁ = Z₂</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common dB Values:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">dB</th>
                    <th class="text-left py-2">Power Ratio</th>
                    <th class="text-left py-2">Voltage Ratio</th>
                    <th class="text-left py-2">Practical Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">0</td>
                    <td class="py-2">1:1</td>
                    <td class="py-2">1:1</td>
                    <td class="py-2">Unity gain</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">+3</td>
                    <td class="py-2">2:1</td>
                    <td class="py-2">1.41:1</td>
                    <td class="py-2">Double power</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">+6</td>
                    <td class="py-2">4:1</td>
                    <td class="py-2">2:1</td>
                    <td class="py-2">Double voltage</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">+10</td>
                    <td class="py-2">10:1</td>
                    <td class="py-2">3.16:1</td>
                    <td class="py-2">One decade (power)</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-mono">+20</td>
                    <td class="py-2">100:1</td>
                    <td class="py-2">10:1</td>
                    <td class="py-2">One decade (voltage)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Engineering:</strong> Amplifier gain, speaker levels, mixer faders</li>
              <li><strong>RF/Telecommunications:</strong> Signal strength, antenna gain, path loss</li>
              <li><strong>Acoustics:</strong> Sound pressure level (SPL), noise measurement</li>
              <li><strong>Control Systems:</strong> Bode plots, frequency response, filter characteristics</li>
              <li><strong>Signal Processing:</strong> Dynamic range, SNR, THD measurements</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Reference Levels:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Notation</th>
                    <th class="text-left py-2">Reference</th>
                    <th class="text-left py-2">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">dBm</td>
                    <td class="py-2">1 mW</td>
                    <td class="py-2">RF power, radio</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">dBW</td>
                    <td class="py-2">1 W</td>
                    <td class="py-2">High power systems</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">dBu</td>
                    <td class="py-2">0.775 V</td>
                    <td class="py-2">Professional audio</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-mono">dBV</td>
                    <td class="py-2">1 V</td>
                    <td class="py-2">Consumer audio</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-mono">dB SPL</td>
                    <td class="py-2">20 μPa</td>
                    <td class="py-2">Sound pressure level</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Quick Rules of Thumb:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>+3 dB:</strong> Double power, 1.41× voltage</li>
              <li><strong>+6 dB:</strong> 4× power, 2× voltage</li>
              <li><strong>+10 dB:</strong> 10× power</li>
              <li><strong>+20 dB:</strong> 100× power, 10× voltage</li>
              <li><strong>-3 dB:</strong> Half power (half-power point/ -3dB bandwidth)</li>
              <li><strong>-6 dB:</strong> Quarter power, half voltage</li>
              <li><strong>-10 dB:</strong> 1/10 power</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Notes:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Decibels are ratios, not absolute values (unless referenced to a standard)</li>
              <li>Gain > 0 dB amplifies, loss < 0 dB attenuates</li>
              <li>Cascaded gains add together: 10 dB + 6 dB = 16 dB</li>
              <li>For unequal impedances, use power ratio formula: P = V²/R</li>
              <li>Logarithms of zero or negative numbers are undefined</li>
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
import DecibelCalculator from '~/components/DecibelCalculator.vue'
import { SpeakerWaveIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Decibel Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Convert between linear ratios and decibels for power, voltage, and current calculations. Interactive dB calculator with reference tables and formulas.' },
    { name: 'keywords', content: 'decibel calculator, dB converter, power ratio, voltage ratio, gain calculator, attenuation, audio dB' }
  ]
})

const colorMode = useColorMode()
</script>

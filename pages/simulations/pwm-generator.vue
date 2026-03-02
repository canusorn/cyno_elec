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
            ⚡ PWM Generator Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore Pulse Width Modulation (PWM) signals and understand how duty cycle controls power delivery
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary-highlight">Duty Cycle</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">(T_on ÷ T_total)</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PWMGenerator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding PWM
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is PWM?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Pulse Width Modulation (PWM) is a technique for controlling analog devices with digital signals. It works by rapidly turning a signal on and off, where the <strong>percentage of "on" time</strong> determines the average power delivered to the load.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Concepts:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Duty Cycle:</strong> Percentage of time the signal is HIGH (0% = always off, 100% = always on)</li>
              <li><strong>Frequency:</strong> How fast the signal cycles (Hz = cycles per second)</li>
              <li><strong>Period:</strong> Time for one complete cycle (T = 1/frequency)</li>
              <li><strong>Average Voltage:</strong> Proportional to duty cycle (V_avg = V_max × Duty Cycle)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Use PWM?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              PWM is highly efficient because it doesn't waste power as heat like linear voltage regulators. The switching transistor is either fully ON (low resistance) or fully OFF (no current), minimizing power loss.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-purple-700 dark:text-purple-300 mb-2">💡 LED Dimming</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Vary brightness by adjusting duty cycle. Human eye perceives the average light level.</p>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-blue-700 dark:text-blue-300 mb-2">🔌 Motor Speed Control</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Control DC motor speed by varying average voltage. Essential for robotics and electric vehicles.</p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-green-700 dark:text-green-300 mb-2">🎮 Servo Control</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Position hobby servos using 1-2ms pulses at 50Hz. Used in RC planes, robots, and automation.</p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-semibold text-orange-700 dark:text-orange-300 mb-2">🔊 Audio & Power</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Class D audio amplifiers and switching power supplies use PWM for high efficiency.</p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">PWM Frequency Guidelines:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Application</th>
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Frequency Range</th>
                    <th class="text-left py-2 text-gray-800 dark:text-gray-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <td class="py-2 text-gray-600 dark:text-gray-400">LED Dimming</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">100 Hz - 1 kHz</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">Above flicker fusion threshold</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <td class="py-2 text-gray-600 dark:text-gray-400">Motor Control</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">10 kHz - 20 kHz</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">Above audible range</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <td class="py-2 text-gray-600 dark:text-gray-400">Servo Control</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">50 Hz</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">Standard RC protocol</td>
                  </tr>
                  <tr>
                    <td class="py-2 text-gray-600 dark:text-gray-400">Power Supplies</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">50 kHz - 500 kHz</td>
                    <td class="py-2 text-gray-600 dark:text-gray-400">High efficiency, smaller components</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Calculations:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Period:</strong> T = 1 ÷ f (seconds)</div>
              <div><strong>Duty Cycle:</strong> D = (T_on ÷ T) × 100%</div>
              <div><strong>Average Voltage:</strong> V_avg = V_max × (D ÷ 100)</div>
              <div><strong>On Time:</strong> T_on = T × (D ÷ 100)</div>
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
import PWMGenerator from '~/components/PWMGenerator.vue'

// SEO
useHead({
  title: 'PWM Generator Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive PWM (Pulse Width Modulation) generator simulator. Learn about duty cycle, frequency, and applications in LED dimming, motor control, and servo control.' },
    { name: 'keywords', content: 'PWM, pulse width modulation, duty cycle, frequency, LED dimming, motor control, servo control' }
  ]
})

const colorMode = useColorMode()
</script>

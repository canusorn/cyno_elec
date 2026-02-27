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
            <CpuChipIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            555 Timer Astable Multivibrator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Generate square waves and pulses with the legendary 555 timer IC
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">f</span> = 1.44 / ((<span class="text-primary-highlight">R1</span> + 2×<span class="text-primary-highlight">R2</span>) × <span class="text-primary-highlight">C</span>)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Astable Frequency Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Timer555Astable />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding the 555 Timer
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is the 555 Timer?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The 555 timer is one of the most popular integrated circuits ever made. It can be used as a timer, 
              pulse generator, and oscillator. In astable mode, it continuously produces a square wave output 
              without any external triggering signal.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How Astable Mode Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Charging Phase:</strong> Capacitor C charges through R1+R2 until voltage reaches 2/3 Vcc</li>
              <li><strong>Discharging Phase:</strong> Capacitor C discharges through R2 until voltage drops to 1/3 Vcc</li>
              <li><strong>Output:</strong> Produces a continuous square wave at pin 3</li>
              <li><strong>Duty Cycle:</strong> Always >50% in astable mode (cannot reach exactly 50%)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Connections:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Pin 2 (Trigger):</strong> Connected to pin 6 (threshold)</li>
              <li><strong>Pin 4 (Reset):</strong> Connected to Vcc (always enabled)</li>
              <li><strong>Pin 5 (Control Voltage):</strong> Bypassed with 10nF capacitor to ground</li>
              <li><strong>Pin 7 (Discharge):</strong> Connected between R1 and R2</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Clock signals for digital circuits</li>
              <li>LED flashing circuits</li>
              <li>Audio tone generation</li>
              <li>Pulse width modulation (PWM)</li>
              <li>Timing delays and intervals</li>
              <li>Motor speed control</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Keep R1 ≥ 1kΩ to limit current from Vcc</li>
              <li>Use R2 >> R1 for duty cycle closer to 50%</li>
              <li>For precise 50% duty cycle, add a diode across R2</li>
              <li>Maximum frequency typically ~100kHz-1MHz depending on manufacturer</li>
              <li>CMOS versions (LMC555, TLC555) offer lower power consumption</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Component Selection Guide:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Typical Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">LED Blinker (1Hz)</td>
                    <td class="py-2">R1=47kΩ, R2=47kΩ, C=10μF</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Audio Tone (440Hz)</td>
                    <td class="py-2">R1=1kΩ, R2=1kΩ, C=100nF</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Clock Signal (10kHz)</td>
                    <td class="py-2">R1=1kΩ, R2=1kΩ, C=47nF</td>
                  </tr>
                  <tr>
                    <td class="py-2">Short Pulse (high freq)</td>
                    <td class="py-2">R1=1kΩ, R2=10kΩ, C=1nF</td>
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
import Timer555Astable from '~/components/Timer555Astable.vue'
import { CpuChipIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: '555 Timer Astable Multivibrator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive 555 timer astable multivibrator simulator. Learn to generate square waves and pulses with adjustable frequency and duty cycle.' },
    { name: 'keywords', content: '555 timer, astable multivibrator, square wave generator, pulse generator, oscillator, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

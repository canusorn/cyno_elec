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
            🎛️ Filter Design Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Design RC, RL, and LC filters for your circuits. Calculate component values for low-pass, high-pass, band-pass, and band-stop filters.
          </p>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterDesignCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Electronic Filters
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an Electronic Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An electronic filter is a circuit that allows signals of certain frequencies to pass through while attenuating signals of other frequencies. 
              Filters are fundamental building blocks in electronics, used in audio systems, communication systems, power supplies, and signal processing.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Types of Filters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Low-Pass Filter (LPF):</strong> Allows frequencies below the cutoff frequency to pass</li>
              <li><strong>High-Pass Filter (HPF):</strong> Allows frequencies above the cutoff frequency to pass</li>
              <li><strong>Band-Pass Filter (BPF):</strong> Allows frequencies within a specific range to pass</li>
              <li><strong>Band-Stop Filter (BSF):</strong> Attenuates frequencies within a specific range</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Filter Circuits:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>RC Filters:</strong> Use resistors and capacitors. Simple, low-cost, suitable for low-frequency applications</li>
              <li><strong>RL Filters:</strong> Use resistors and inductors. Less common due to inductor size and cost</li>
              <li><strong>LC Filters:</strong> Use inductors and capacitors. Higher Q factor, steeper roll-off, used in RF applications</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>RC Filter Cutoff Frequency:</strong></p>
              <p>fc = 1 / (2π × R × C)</p>
              <br>
              <p><strong>RL Filter Cutoff Frequency:</strong></p>
              <p>fc = R / (2π × L)</p>
              <br>
              <p><strong>LC Filter Resonant Frequency:</strong></p>
              <p>fc = 1 / (2π × √(L × C))</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Cutoff Frequency?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The cutoff frequency (fc) is the frequency at which the output power drops to half (-3dB) of the input power. 
              At this frequency, the output voltage is 70.7% (√2/2) of the input voltage.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Roll-off Rate:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The roll-off rate determines how quickly the filter attenuates frequencies beyond the cutoff:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>First-order filters (RC, RL):</strong> 20 dB/decade or 6 dB/octave</li>
              <li><strong>Second-order filters (LC):</strong> 40 dB/decade or 12 dB/octave</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Systems:</strong> Tone controls, crossovers, equalizers</li>
              <li><strong>Communication Systems:</strong> Channel selection, noise reduction</li>
              <li><strong>Power Supplies:</strong> Smoothing filters, ripple reduction</li>
              <li><strong>Signal Processing:</strong> Anti-aliasing filters, DSP preprocessing</li>
              <li><strong>Radio Frequency (RF):</strong> Band selection, image rejection</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Choose capacitor values from standard ranges (1pF to 100µF typically)</li>
              <li>For audio frequencies (20Hz-20kHz), RC filters are commonly used</li>
              <li>For RF applications, LC filters are preferred for higher performance</li>
              <li>Multiple filter stages can be cascaded for steeper roll-off</li>
              <li>Consider component tolerances and their effect on filter accuracy</li>
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
import FilterDesignCalculator from '~/components/FilterDesignCalculator.vue'

// SEO
useHead({
  title: 'Filter Design Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design RC, RL, and LC filters online. Calculate component values for low-pass, high-pass, band-pass, and band-stop filters with frequency response visualization.' },
    { name: 'keywords', content: 'filter design, RC filter, RL filter, LC filter, low-pass filter, high-pass filter, band-pass filter, electronic filter' }
  ]
})

const colorMode = useColorMode()
</script>

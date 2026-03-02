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
            💎 Crystal Oscillator Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how piezoelectric crystals create precise oscillations for clocks, microcontrollers, and radios
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CrystalOscillatorSimulator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Crystal Oscillators
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Crystal Oscillator?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A crystal oscillator is an electronic circuit that uses the mechanical resonance of a vibrating crystal
              of piezoelectric material to create an electrical signal with a very precise frequency. This frequency
              is commonly used to keep track of time, provide a stable clock signal for digital integrated circuits,
              and to stabilize frequencies for radio transmitters and receivers.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How Piezoelectric Crystals Work:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Piezoelectric Effect:</strong> When voltage is applied to a crystal, it mechanically deforms</li>
              <li><strong>Reverse Effect:</strong> When mechanical stress is applied, it generates voltage</li>
              <li><strong>Resonance:</strong> Crystals have a natural resonant frequency based on their physical dimensions</li>
              <li><strong>High Q Factor:</strong> Very high quality factor (Q) results in excellent frequency stability</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Frequency Range:</strong> Typically 32 kHz to several hundred MHz</li>
              <li><strong>Frequency Stability:</strong> Excellent (±10 to ±100 ppm)</li>
              <li><strong>Temperature Stability:</strong> Varies with crystal cut (AT, AT SC, BT cuts)</li>
              <li><strong>Aging:</strong> Frequency slowly changes over time (±3 to ±5 ppm/year)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Crystal Equivalent Circuit:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A crystal can be modeled as an electrical circuit with both series and parallel resonant frequencies:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div>Lm = Motional Inductance (very high, typically 1-100 Henrys)</div>
              <div>Cm = Motional Capacitance (very small, typically 0.01-0.1 pF)</div>
              <div>Rm = Motional Resistance (typically 10-100 Ω)</div>
              <div>C0 = Shunt Capacitance (typically 2-5 pF)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Microcontroller Clocks:</strong> Most MCUs use 32.768 kHz or 8-16 MHz crystals</li>
              <li><strong>Real-Time Clocks:</strong> 32.768 kHz crystals for timekeeping (2^15 Hz)</li>
              <li><strong>RF Systems:</strong> Local oscillators in radios and communication devices</li>
              <li><strong>Computers:</strong> System clocks and CPU timing</li>
              <li><strong>Watches & Timers:</strong> Quartz watches for accurate timekeeping</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series vs Parallel Resonance:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Crystals have two resonant frequencies:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Series Resonance:</strong> fs = 1/(2π√(Lm×Cm))</div>
              <div><strong>Parallel Resonance:</strong> fp = fs × √(1 + Cm/C0) ≈ fs + (fs × Cm)/(2×C0)</div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The parallel resonant frequency is typically 0.1% to 0.5% higher than the series frequency.
              Most oscillator circuits operate in the parallel resonant mode.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Oscillator Circuit Types:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Pierce Oscillator:</strong> Most common, uses inverter and feedback capacitors</li>
              <li><strong>Colpitts Oscillator:</strong> Uses capacitive voltage divider</li>
              <li><strong>Butler Oscillator:</strong> For high-frequency VHF applications</li>
              <li><strong>CMOS Inverter:</strong> Simple, widely used in microcontrollers</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Crystal Cuts and Temperature Performance:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div><strong>AT Cut:</strong> Most common, parabolic temp curve, 0°C turnover</div>
              <div><strong>AT SC Cut:</strong> Improved temperature stability, 5ppm vs 20ppm</div>
              <div><strong>BT Cut:</strong> Different frequency range</div>
              <div><strong>XY Cut:</strong> For tuning fork crystals (32.768 kHz)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Keep crystal traces short and minimize stray capacitance</li>
              <li>Use proper load capacitors (typically 18-22 pF for parallel mode)</li>
              <li>Avoid mechanical stress on the crystal PCB</li>
              <li>Match drive level to crystal specifications (usually 100 μW max)</li>
              <li>Consider startup time for low-power applications</li>
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
import CrystalOscillatorSimulator from '~/components/CrystalOscillatorSimulator.vue'

// SEO
useHead({
  title: 'Crystal Oscillator Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive crystal oscillator simulator. Learn how piezoelectric crystals create precise oscillations for clocks, microcontrollers, and radios.' },
    { name: 'keywords', content: 'crystal oscillator, piezoelectric, frequency stability, quartz crystal, clock oscillator, Pierce oscillator' }
  ]
})

const colorMode = useColorMode()
</script>

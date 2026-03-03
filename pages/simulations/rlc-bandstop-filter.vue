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
            Series RLC Bandstop Filter Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how series RLC circuits can block specific frequency bands - essential for noise filtering and audio applications
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RLCBandstopFilter />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RLC Bandstop Filters
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Bandstop Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A bandstop filter (also called a notch filter or band-reject filter) is a circuit that attenuates (reduces) 
              frequencies within a specific range while allowing frequencies outside that range to pass with minimal loss. 
              The series RLC configuration is one of the simplest ways to implement this filter.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a series RLC bandstop filter, the inductor (L) and capacitor (C) are connected in series along with the resistor (R). 
              At the resonant frequency, the inductive reactance (XL) equals the capacitive reactance (XC), causing them to cancel each other out. 
              This creates a low impedance path that diverts current away from the output, creating a "notch" in the frequency response.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div class="mb-2"><strong>Resonant Frequency:</strong> f₀ = 1/(2π√LC)</div>
              <div class="mb-2"><strong>Bandwidth:</strong> BW = R/L</div>
              <div class="mb-2"><strong>Quality Factor:</strong> Q = f₀/BW = (1/R)√(L/C)</div>
              <div><strong>Cutoff Frequencies:</strong> f₁,₂ = f₀ ± BW/2</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Parameters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Center Frequency (f₀):</strong> The frequency at which maximum attenuation occurs</li>
              <li><strong>Bandwidth (BW):</strong> The range of frequencies that are significantly attenuated (between -3 dB points)</li>
              <li><strong>Quality Factor (Q):</strong> Higher Q means narrower bandwidth and sharper notch</li>
              <li><strong>Attenuation:</strong> How much the signal is reduced at the center frequency</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Q (>10):</strong> Narrow notch, good for removing single-frequency interference</li>
              <li><strong>Low Q (<1):</strong> Wide notch, good for broadband noise rejection</li>
              <li><strong>Component Tolerance:</strong> Affects the accuracy of the center frequency</li>
              <li><strong>Load Effects:</strong> Connected load can shift the filter response</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Systems:</strong> Remove 50/60 Hz hum from power lines</li>
              <li><strong>Communications:</strong> Eliminate interfering signals at specific frequencies</li>
              <li><strong>Instrumentation:</strong> Reject noise at known frequencies</li>
              <li><strong>Biomedical:</strong> Remove power line interference from ECG/EEG signals</li>
              <li><strong>RF Systems:</strong> Filter out unwanted frequency bands</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series vs Parallel RLC Filters:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Series (Bandstop):</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Components in series with signal</li>
                  <li>• Low impedance at resonance</li>
                  <li>• Shunts signal to ground at f₀</li>
                  <li>• Used for notch filtering</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Parallel (Bandpass):</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• Components in parallel topology</li>
                  <li>• High impedance at resonance</li>
                  <li>• Blocks signal at f₀</li>
                  <li>• Different application</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Component Selection Guide:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Resistor (R)</h4>
                  <p class="text-gray-600 dark:text-gray-300">Controls bandwidth and Q. Lower R = higher Q (narrower notch)</p>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Inductor (L)</h4>
                  <p class="text-gray-600 dark:text-gray-300">Along with C, sets center frequency. Larger L = lower f₀</p>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Capacitor (C)</h4>
                  <p class="text-gray-600 dark:text-gray-300">Along with L, sets center frequency. Larger C = lower f₀</p>
                </div>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              To remove 60 Hz hum from an audio signal:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Target: f₀ = 60 Hz (center frequency)</li>
              <li>Choose L = 100 mH (inductor)</li>
              <li>Calculate C = 1/(4π²f₀²L) ≈ 70 µF (capacitor)</li>
              <li>Choose R = 50 Ω for moderate Q (Q ≈ 7.5)</li>
              <li>Result: Bandwidth ≈ 8 Hz (blocks 56-64 Hz)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use inductors with low resistance for best Q factor</li>
              <li>Capacitor tolerance affects accuracy - use 1% or better for precise filtering</li>
              <li>Consider using op-amp active filters for better performance</li>
              <li>Shield inductors to prevent electromagnetic interference</li>
              <li>Test with actual signals to verify performance</li>
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
import RLCBandstopFilter from '~/components/RLCBandstopFilter.vue'

// SEO
useHead({
  title: 'RLC Bandstop Filter Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive series RLC bandstop filter simulator. Learn how notch filters work, visualize frequency response, and design filters for noise removal.' },
    { name: 'keywords', content: 'RLC filter, bandstop filter, notch filter, frequency response, circuit simulator, electrical engineering' }
  ]
})

const colorMode = useColorMode()
</script>

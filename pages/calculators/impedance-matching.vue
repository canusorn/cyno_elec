<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Impedance Matching Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design matching networks for maximum power transfer and minimal reflections
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-primary-highlight">Z</span>
              <sub class="text-sm">source</sub>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">Z</span>
              <sub class="text-sm">load</sub>
              <span class="text-gray-400">*</span>
              <span class="text-green-500">✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImpedanceMatchingCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Impedance Matching
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Match Impedances?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Impedance matching is crucial for maximum power transfer and minimal signal reflection in RF circuits,
              transmission lines, audio systems, and antenna systems. When source and load impedances are matched:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Maximum Power Transfer:</strong> All available power is delivered to the load</li>
              <li><strong>Minimal Reflections:</strong> Signal reflections are eliminated in transmission lines</li>
              <li><strong>Better Signal Integrity:</strong> Preserves waveform shape and reduces distortion</li>
              <li><strong>Improved Efficiency:</strong> Reduces power loss and heat generation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Maximum Power Transfer Theorem:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Maximum power is transferred from source to load when the load impedance equals the complex conjugate
              of the source impedance:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div class="mb-2"><strong>For resistive loads:</strong></div>
              <div>R<sub>load</sub> = R<sub>source</sub></div>
              <div class="mt-3 mb-2"><strong>For complex impedances:</strong></div>
              <div>Z<sub>load</sub> = Z<sub>source</sub>* (complex conjugate)</div>
              <div class="mt-3">R<sub>load</sub> = R<sub>source</sub> and X<sub>load</sub> = -X<sub>source</sub></div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Matching Network Types:</h3>

            <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">1. L-Network (Two-Element)</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Simplest matching network using 2 reactive elements</li>
              <li>8 possible configurations (series/parallel combinations)</li>
              <li>Limited bandwidth (narrowband matching)</li>
              <li>Best for single-frequency applications</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">2. Pi-Network (Three-Element)</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Three reactive elements in Π (pi) configuration</li>
              <li>Wider bandwidth than L-network</li>
              <li>Provides harmonic filtering</li>
              <li>Common in RF power amplifiers</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">3. T-Network (Three-Element)</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Three reactive elements in T configuration</li>
              <li>Similar bandwidth to Pi-network</li>
              <li>Useful when source/load need shunt elements</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">4. Transmission Line Transformer</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Uses quarter-wavelength transmission lines</li>
              <li>Excellent for very high frequencies (VHF/UHF)</li>
              <li>Z<sub>in</sub> = Z₀² / Z<sub>load</sub></li>
              <li>Bandwidth limited by line length</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">5. Transformer Matching</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Magnetic coupling between windings</li>
              <li>Impedance ratio = turns ratio squared: Z<sub>p</sub>/Z<sub>s</sub> = (N<sub>p</sub>/N<sub>s</sub>)²</li>
              <li>Wide bandwidth (audio to RF)</li>
              <li>Provides DC isolation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Mismatches and Reflections:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When impedances are not matched, some power is reflected back toward the source:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Reflection Coefficient:</strong></div>
              <div>Γ = (Z<sub>load</sub> - Z<sub>source</sub>) / (Z<sub>load</sub> + Z<sub>source</sub>)</div>
              <div class="mt-3"><strong>VSWR (Voltage Standing Wave Ratio):</strong></div>
              <div>VSWR = (1 + |Γ|) / (1 - |Γ|)</div>
              <div class="mt-3"><strong>Return Loss:</strong></div>
              <div>RL<sub>dB</sub> = -20 × log<sub>10</sub>(|Γ|)</div>
              <div class="mt-3"><strong>Mismatch Loss:</strong></div>
              <div>ML<sub>dB</sub> = -10 × log<sub>10</sub>(1 - |Γ|²)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Frequency Range:</strong> L-networks for narrowband, transformer for wideband</li>
              <li><strong>Power Handling:</strong> Components must handle expected power levels</li>
              <li><strong>Component Q:</strong> Higher Q means lower loss but narrower bandwidth</li>
              <li><strong>Realizability:</strong> Component values should be practical (available values)</li>
              <li><strong>Tuning:</strong> Consider if variable components are needed for adjustment</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>RF Amplifiers:</strong> Input and output matching for maximum gain</li>
              <li><strong>Antenna Systems:</strong> Matching antenna feedlines to transmitters/receivers</li>
              <li><strong>Audio Systems:</strong> Matching power amplifiers to speakers</li>
              <li><strong>Transmission Lines:</strong> Matching coax, microstrip, waveguide</li>
              <li><strong>RF Filters:</strong> Impedance matching at filter ports</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Always measure actual impedances when possible (VNA is ideal)</li>
              <li>Consider parasitic effects at high frequencies (lead inductance, capacitance)</li>
              <li>Use high-Q capacitors and inductors for better efficiency</li>
              <li>Prototype with variable components before finalizing values</li>
              <li>Test VSWR across the entire operating frequency range</li>
              <li>Consider using a matching network tuner for multi-band applications</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Standard Impedances:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div><strong>RF Systems:</strong> 50Ω (most common), 75Ω (video/cable TV)</div>
              <div><strong>Audio:</strong> 600Ω (professional), 4-16Ω (speakers)</div>
              <div><strong>Video:</strong> 75Ω (coaxial cable)</div>
              <div><strong>Differential:</strong> 100Ω, 120Ω (twisted pair)</div>
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
import ImpedanceMatchingCalculator from '~/components/ImpedanceMatchingCalculator.vue'

// SEO
useHead({
  title: 'Impedance Matching Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design impedance matching networks for maximum power transfer. Calculate L-network, Pi-network, T-network, and transformer matching circuits.' },
    { name: 'keywords', content: 'impedance matching, Smith chart, VSWR, reflection coefficient, RF matching, L-network, transformer matching' }
  ]
})

const colorMode = useColorMode()
</script>

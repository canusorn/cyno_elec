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
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductor Magnetic Field Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate magnetic field strength for solenoids and inductors
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">B</span> = μ₀nI &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">B</span> ≈ μ₀NI/L
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Solenoid Magnetic Field Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InductorMagneticFieldCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Magnetic Fields in Inductors
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Solenoid?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A solenoid is a coil of wire designed to create a magnetic field when electric current flows through it. 
              The magnetic field is strongest inside the solenoid and relatively uniform throughout its length.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Factors Affecting Magnetic Field:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Number of turns (N):</strong> More turns create a stronger magnetic field</li>
              <li><strong>Current (I):</strong> Higher current increases field strength linearly</li>
              <li><strong>Core material:</strong> Ferromagnetic cores (μr > 1) dramatically increase the field</li>
              <li><strong>Geometry:</strong> Length and diameter affect field uniformity</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Core Materials:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Air Core (μr = 1):</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• No ferromagnetic material</li>
                <li>• Linear response (no saturation)</li>
                <li>• Used in high-frequency applications</li>
                <li>• Lower inductance and field strength</li>
              </ul>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Ferrite Core (μr = 100-10,000):</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• Ferromagnetic material (iron powder, ferrite)</li>
                <li>• Can saturate at high currents</li>
                <li>• Greatly increases inductance and field strength</li>
                <li>• Used in power inductors and transformers</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Magnetic Field Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p class="mb-2"><strong>Inside solenoid (long):</strong> B = μ₀μr × n × I</p>
              <p class="mb-2"><strong>At center point:</strong> B ≈ μ₀μr × N × I / L</p>
              <p><strong>On axis at distance z:</strong> B(z) = (μ₀μr × N × I / 2L) × [(z+L/2)/√((z+L/2)² + a²) - (z-L/2)/√((z-L/2)² + a²)]</p>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where μ₀ = 4π × 10⁻⁷ H/m (permeability of free space), μr is relative permeability, 
              n = N/L is turn density, I is current, L is length, and a is radius.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Electromagnets:</strong> Solenoids for lifting magnetic materials</li>
              <li><strong>Relays and contactors:</strong> Solenoid actuators for switching</li>
              <li><strong>Inductors:</strong> Energy storage in switching power supplies</li>
              <li><strong>Transformers:</strong> Coupled solenoids for voltage conversion</li>
              <li><strong>Electric motors:</strong> Rotating magnetic fields from windings</li>
              <li><strong>Magnetic sensors:</strong> Hall effect sensors measure field strength</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Ampere-Turns (NI):</strong> The product of current and turns determines field strength</li>
              <li><strong>Saturation:</strong> Ferrite cores saturate at high fields (typically 0.3-0.5 Tesla)</li>
              <li><strong>Temperature:</strong> Core permeability decreases with temperature</li>
              <li><strong>Frequency:</strong> Core losses increase with frequency (eddy currents, hysteresis)</li>
              <li><strong>Geometry:</strong> Longer solenoids have more uniform internal fields</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Typical Field Strengths:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Field Strength</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Earth's magnetic field</td>
                    <td class="py-2">~50 μT</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Small electromagnet</td>
                    <td class="py-2">10-100 mT</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Industrial electromagnet</td>
                    <td class="py-2">0.5-2 T</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">MRI machine</td>
                    <td class="py-2">1.5-7 T</td>
                  </tr>
                  <tr>
                    <td class="py-2">Research magnet</td>
                    <td class="py-2">up to 45 T</td>
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
import InductorMagneticFieldCalculator from '~/components/InductorMagneticFieldCalculator.vue'

// SEO
useHead({
  title: 'Inductor Magnetic Field Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate magnetic field strength for solenoids and inductors. Support for air core and ferrite core configurations.' },
    { name: 'keywords', content: 'magnetic field, solenoid, inductor, electromagnet, magnetic flux, ferrite core, air core' }
  ]
})

const $colorMode = useColorMode()
</script>

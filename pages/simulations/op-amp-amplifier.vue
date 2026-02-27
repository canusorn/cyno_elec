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
            Operational Amplifier
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore inverting and non-inverting amplifier configurations
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Inverting:</span> Gain = -R₂/R₁ &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">Non-Inverting:</span> Gain = 1 + R₂/R₁
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Voltage Gain Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OpAmpAmplifier />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Operational Amplifiers
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an Operational Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An operational amplifier (op-amp) is a high-gain electronic voltage amplifier with a differential input 
              and, usually, a single-ended output. In its ordinary usage, the output of the op-amp is controlled by 
              negative feedback, which largely determines the magnitude of its output voltage.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Ideal Op-Amp Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Infinite Voltage Gain:</strong> The output is determined solely by the feedback network</li>
              <li><strong>Infinite Input Impedance:</strong> No current flows into the input terminals</li>
              <li><strong>Zero Output Impedance:</strong> The output can drive any load without voltage drop</li>
              <li><strong>Infinite Bandwidth:</strong> Works equally well at all frequencies</li>
              <li><strong>Zero Offset:</strong> Output is zero when both inputs are at the same voltage</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Inverting Amplifier Configuration:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Input:</strong> Applied to the inverting (-) terminal through R1</li>
              <li><strong>Non-inverting (+):</strong> Connected to ground</li>
              <li><strong>Gain Formula:</strong> Gain = -R2/R1 (negative sign indicates inversion)</li>
              <li><strong>Input Impedance:</strong> Approximately equal to R1</li>
              <li><strong>Applications:</strong> Audio mixing, signal conditioning, analog computing</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Non-Inverting Amplifier Configuration:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Input:</strong> Applied directly to the non-inverting (+) terminal</li>
              <li><strong>Feedback:</strong> Voltage divider from output to inverting (-) terminal</li>
              <li><strong>Gain Formula:</strong> Gain = 1 + R2/R1 (always positive, ≥1)</li>
              <li><strong>Input Impedance:</strong> Very high (ideal: infinite)</li>
              <li><strong>Applications:</strong> Instrumentation amplifiers, buffers, active filters</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Understanding Saturation:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Real op-amps cannot output voltages beyond their supply rails (Vcc and -Vee). When the ideal output 
              voltage exceeds these limits, the amplifier saturates and the output is clipped at approximately 
              ±(Vcc - 0.5V). This simulator shows a warning when saturation occurs.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Gain-Bandwidth Product:</strong> Higher gain reduces available bandwidth</li>
              <li><strong>Slew Rate:</strong> Maximum rate of change of output voltage (V/μs)</li>
              <li><strong>Input Bias Current:</strong> Small currents that flow into input terminals</li>
              <li><strong>Offset Voltage:</strong> Small voltage difference between inputs at zero output</li>
              <li><strong>Common-Mode Rejection:</strong> Ability to reject signals common to both inputs</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Op-Amp Applications:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Configuration</th>
                    <th class="text-left py-2">Key Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Audio Preamplifier</td>
                    <td class="py-2">Non-inverting</td>
                    <td class="py-2">High input impedance</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Summing Amplifier</td>
                    <td class="py-2">Inverting</td>
                    <td class="py-2">Add multiple signals</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Active Filter</td>
                    <td class="py-2">Either</td>
                    <td class="py-2">Frequency shaping</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Voltage Follower</td>
                    <td class="py-2">Non-inverting (R2=0)</td>
                    <td class="py-2">Buffer/isolation</td>
                  </tr>
                  <tr>
                    <td class="py-2">Differential Amplifier</td>
                    <td class="py-2">Both</td>
                    <td class="py-2">Measure difference</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Popular Op-Amp ICs:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>LM741:</strong> Classic general-purpose op-amp (beginner-friendly)</li>
              <li><strong>LM358:</strong> Dual op-amp, single-supply operation</li>
              <li><strong>TL072:</strong> Low-noise JFET input, audio applications</li>
              <li><strong>OPA2134:</strong> High-quality audio op-amp</li>
              <li><strong>LM318:</strong> High-speed op-amp</li>
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
import OpAmpAmplifier from '~/components/OpAmpAmplifier.vue'
import { CpuChipIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Operational Amplifier Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive operational amplifier simulator. Learn about inverting and non-inverting configurations, voltage gain, and op-amp circuits.' },
    { name: 'keywords', content: 'op-amp, operational amplifier, inverting amplifier, non-inverting amplifier, voltage gain, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

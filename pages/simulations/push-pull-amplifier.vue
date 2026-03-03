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
            🔊 Push-Pull Amplifier Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how Class B push-pull amplifiers work with interactive waveform visualization and crossover distortion analysis
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PushPullAmplifier />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Push-Pull Amplifiers
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Push-Pull Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A push-pull amplifier uses two transistors (or tubes) to amplify alternating current signals. 
              One transistor handles the positive half-cycles while the other handles negative half-cycles, 
              then the outputs are combined. This Class B configuration is much more efficient than single-ended Class A amplifiers.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>NPN Transistor (Q1):</strong> Conducts during positive half-cycles of the input signal</li>
              <li><strong>PNP Transistor (Q2):</strong> Conducts during negative half-cycles of the input signal</li>
              <li><strong>Output Combiner:</strong> The two half-cycles are combined at the output to reconstruct the full waveform</li>
              <li><strong>Bias Circuit:</strong> Diodes or bias resistors provide a small voltage to reduce crossover distortion</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Crossover Distortion:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In an ideal Class B amplifier, there's a small "dead zone" where neither transistor conducts because 
              the input signal hasn't exceeded the base-emitter voltage threshold (V_BE ≈ 0.7V). This creates distortion 
              near the zero-crossing point of the waveform.
            </p>
            <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg my-4">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Problem:</strong> When the input signal is between -0.7V and +0.7V, neither transistor turns on, creating a flat spot in the output.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Solution:</strong> Add a small bias voltage (using diodes or resistors) to keep both transistors slightly conducting, eliminating the dead zone.
              </p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>Maximum Efficiency:</strong></p>
              <p class="ml-4">η_max = π/4 ≈ 78.5% (theoretical for Class B)</p>
              
              <p class="mt-3"><strong>Output Power:</strong></p>
              <p class="ml-4">P_out = (V_out_rms)² / R_L</p>
              
              <p class="mt-3"><strong>Voltage Gain:</strong></p>
              <p class="ml-4">A_v ≈ 1 (emitter follower configuration)</p>
              
              <p class="mt-3"><strong>Crossover Dead Zone:</strong></p>
              <p class="ml-4">Dead Zone = V_BE - V_bias</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Amplifier Classes Comparison:</h3>
            <div class="overflow-x-auto my-4">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Conduction Angle</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Efficiency</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Linearity</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Class A</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">360°</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">≤ 25%</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-green-500">Excellent</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Class B</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">180°</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">≈ 78.5%</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-yellow-500">Good (with bias)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Class AB</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">> 180°</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">50-70%</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-green-500">Very Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Power Amplifiers:</strong> Most stereo and home theater amplifiers use push-pull output stages</li>
              <li><strong>RF Power Amplifiers:</strong> Radio transmitters use Class B/AB for efficiency</li>
              <li><strong>Servo Motor Drivers:</strong> PWM amplifiers for motor control</li>
              <li><strong>Operational Amplifiers:</strong> Many op-amps use push-pull output stages</li>
              <li><strong>Line Drivers:</strong> High-speed digital and analog signal drivers</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Matching:</strong> Transistors should be matched for similar characteristics</li>
              <li><strong>Thermal Stability:</strong> Use emitter resistors for thermal feedback</li>
              <li><strong>Bias Stability:</strong> Diode bias tracks temperature changes</li>
              <li><strong>Heat Sinking:</strong> Even with high efficiency, power dissipation requires cooling</li>
              <li><strong>Protection:</strong> Add short-circuit and over-temperature protection</li>
              <li><strong>Supply Rejection:</strong> Good power supply decoupling is essential</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Experiment Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Set bias voltage to 0V to see maximum crossover distortion</li>
              <li>Increase bias voltage gradually to see distortion reduce</li>
              <li>Try different input amplitudes to see clipping at supply limits</li>
              <li>Adjust load resistance to see power and efficiency changes</li>
              <li>Compare frequency effects on waveform display</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Audio Amplifier Design:</strong>
              </p>
              <p class="text-gray-600 dark:text-gray-400 ml-4">
                A typical 100W per channel stereo amplifier might use:<br>
                • Supply: ±50V rails<br>
                • Output: Complementary pair of 2N3055 (NPN) and MJ2955 (PNP)<br>
                • Bias: Two diodes in series (≈1.4V bias)<br>
                • Emitter resistors: 0.47Ω each for thermal stability<br>
                • Result: Class AB operation with low distortion and high efficiency
              </p>
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
import PushPullAmplifier from '~/components/PushPullAmplifier.vue'

// SEO
useHead({
  title: 'Push-Pull Amplifier Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Class B push-pull amplifier simulator. Learn about crossover distortion, efficiency, and audio amplifier design with real-time waveform visualization.' },
    { name: 'keywords', content: 'push-pull amplifier, Class B amplifier, crossover distortion, audio amplifier, transistor amplifier, circuit simulator' }
  ]
})

const colorMode = useColorMode()
</script>

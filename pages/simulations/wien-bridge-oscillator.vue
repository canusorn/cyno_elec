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
            Wien Bridge Oscillator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Generate pure sinusoidal waves with feedback circuit analysis
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Resonant Freq:</span> fo = 1/(2πRC) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">Gain Required:</span> ≥ 3.0
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Barkhausen Criterion for Oscillation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WienBridgeOscillator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Wien Bridge Oscillators
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Wien Bridge Oscillator?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Wien Bridge oscillator is a type of electronic oscillator that generates sine waves. It uses a 
              Wien bridge network (series and parallel RC combinations) as a frequency-selective feedback network 
              combined with an amplifier. It's known for producing very low-distortion sinusoidal outputs and is 
              widely used in audio frequency generation and test equipment.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Frequency Selection:</strong> The Wien bridge network (series RC + parallel RC) creates a band-pass filter</li>
              <li><strong>Resonant Frequency:</strong> At fo = 1/(2πRC), feedback ratio is exactly 1/3 with zero phase shift</li>
              <li><strong>Amplifier Gain:</strong> The op-amp provides gain of (1 + R4/R3) to compensate the 1/3 feedback</li>
              <li><strong>Barkhausen Criterion:</strong> Loop gain must be ≥ 1, so amplifier gain must be ≥ 3</li>
              <li><strong>Stable Oscillation:</strong> At exactly gain = 3, the circuit produces pure sine waves</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Wien Bridge Network</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The frequency-determining network consists of two RC combinations:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Series RC (R1, C1):</strong> Connected to the non-inverting input</li>
              <li><strong>Parallel RC (R2, C2):</strong> Forms feedback to ground</li>
              <li><strong>Matched Values:</strong> Typically R1 = R2 = R and C1 = C2 = C for simplicity</li>
              <li><strong>Feedback Ratio:</strong> At resonance, the network attenuates by exactly 1/3</li>
              <li><strong>Phase Shift:</strong> Zero phase shift at the resonant frequency</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Barkhausen Stability Criterion</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-gray-700 dark:text-gray-200 font-mono text-sm mb-2">
                |Aβ| ≥ 1 and ∠Aβ = 0°
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Where A = amplifier gain and β = feedback ratio
              </p>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For sustained oscillations:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Magnitude Condition:</strong> Loop gain |Aβ| must equal 1</li>
              <li><strong>Phase Condition:</strong> Total phase shift around loop must be 0° (or 360°)</li>
              <li><strong>Start-up:</strong> Initially, gain must be > 3 to build up oscillations from noise</li>
              <li><strong>Stabilization:</strong> Gain reduces to exactly 3 once oscillations reach desired amplitude</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Amplitude Stabilization</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In practice, maintaining exact gain = 3 is difficult. Several methods are used for automatic amplitude control:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">💡 Incandescent Lamp</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  A small lamp (often #327) replaces R4. Resistance increases with temperature (current), providing negative feedback that stabilizes amplitude
                </p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🔥 Thermistor</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  NTC thermistor resistance decreases with temperature. Used in feedback network to reduce gain as amplitude increases
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">⚡ Diode Limiter</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Back-to-back diodes in feedback path soft-clip the output, preventing excessive amplitude
                </p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🎛️ JFET Attenuator</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  JFET acts as voltage-controlled resistor. Gate voltage adjusts dynamically to maintain constant output
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Frequency Range</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Wien Bridge oscillators typically operate from a few Hz to about 1 MHz:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Range (20 Hz - 20 kHz):</strong> Most common application with RC values 1kΩ-100kΩ and 1nF-100nF</li>
              <li><strong>Low Frequency (< 20 Hz):</strong> Requires larger R and C values, practical down to ~1 Hz</li>
              <li><strong>High Frequency (> 100 kHz):</strong> Stray capacitance and op-amp bandwidth become limitations</li>
              <li><strong>Wide Range:</strong> Switching different R or C values provides frequency range selection</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold">Audio Generators</td>
                    <td class="py-2">Function generators for testing audio equipment</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold">Test Equipment</td>
                    <td class="py-2">Signal sources for oscilloscopes and analyzers</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold">Musical Instruments</td>
                    <td class="py-2">Theremin and electronic synthesizers</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold">Sensor Excitation</td>
                    <td class="py-2">AC excitation for LVDT and other sensors</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-semibold">Frequency Standards</td>
                    <td class="py-2">Low-frequency reference sources</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Equations</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 font-mono text-sm">
              <p class="mb-2"><strong>Resonant Frequency:</strong></p>
              <p class="ml-4 mb-3">fo = 1 / (2πRC)</p>
              
              <p class="mb-2"><strong>Feedback Ratio at Resonance:</strong></p>
              <p class="ml-4 mb-3">β = 1/3</p>
              
              <p class="mb-2"><strong>Required Amplifier Gain:</strong></p>
              <p class="ml-4 mb-3">A = 1 + R4/R3 ≥ 3</p>
              
              <p class="mb-2"><strong>Component Values (for gain = 3):</strong></p>
              <p class="ml-4">R4 = 2 × R3</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Use low-tolerance components:</strong> 1% resistors and 5% capacitors for accurate frequency</li>
              <li><strong>NPO/COG capacitors:</strong> Stable dielectric for minimal drift with temperature</li>
              <li><strong>Op-amp selection:</strong> Use op-amps with sufficient bandwidth (GBW > 20× fo) and low distortion</li>
              <li><strong>Power supply decoupling:</strong> Add bypass capacitors near the op-amp supply pins</li>
              <li><strong>Start-up margin:</strong> Design for gain ≈ 3.2 initially, let amplitude control reduce to 3.0</li>
              <li><strong>Output buffer:</strong> Add a voltage follower if driving low-impedance loads</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Historical Note</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Wien Bridge oscillator was developed by Max Wien in 1891 and later improved by William Hewlett 
              (co-founder of Hewlett-Packard) in 1939. Hewlett's use of a light bulb for amplitude stabilization 
              in his HP200A audio oscillator was key to HP's first product and the company's success.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { CpuChipIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import WienBridgeOscillator from '~/components/WienBridgeOscillator.vue'
import Footer from '~/components/Footer.vue'

useHead({
  title: 'Wien Bridge Oscillator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Wien Bridge oscillator simulation. Learn sinusoidal wave generation, Barkhausen criterion, and feedback circuits.' }
  ]
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RC High-Pass Filter
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore how RC high-pass filters block low frequencies and pass high frequencies
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-orange-500">f<sub>c</sub></span> = 1 / (2π<span class="text-orange-500">RC</span>) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-orange-500">Gain</span> = f/f<sub>c</sub> / √(1 + (f/f<sub>c</sub>)²)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Cutoff Frequency & Gain Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RCHighPassFilter />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RC High-Pass Filters
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a High-Pass Filter?</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              An RC high-pass filter allows high-frequency signals to pass through while attenuating low-frequency signals. It's the opposite of a low-pass filter and is commonly used for:
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>DC Blocking:</strong> Removing DC offset from AC signals</li>
              <li><strong>Audio Coupling:</strong> Passing audio while blocking DC bias</li>
              <li><strong>RF Applications:</strong> Selecting high-frequency radio signals</li>
              <li><strong>Differentiator Circuits:</strong> Converting square waves to spikes</li>
              <li><strong>Crossover Networks:</strong> Separating tweeter from woofer signals</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The filter consists of a capacitor in series with the input signal, followed by a resistor to ground. The capacitor's reactance decreases as frequency increases:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-orange-600 dark:text-orange-400 font-mono">
                X<sub>C</sub> = 1 / (2πfC)
              </code>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              At low frequencies, X<sub>C</sub> is large, blocking the signal. At high frequencies, X<sub>C</sub> is small, allowing the signal to pass through to the output across the resistor.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Cutoff Frequency</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The cutoff frequency (f<sub>c</sub>) is where the output power is half the input power (-3dB). This occurs when:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-orange-600 dark:text-orange-400 font-mono">
                X<sub>C</sub> = R &nbsp;&nbsp;→&nbsp;&nbsp; f<sub>c</sub> = 1 / (2πRC)
              </code>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              At f<sub>c</sub>, the output voltage is 70.7% of the input, and the phase shift is +45° (output leads input).
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Frequency Regions</h3>
            <div class="grid md:grid-cols-3 gap-4 my-6">
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <h4 class="font-bold text-red-700 dark:text-red-300 mb-2">Stop Band (f ≪ fc)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Signals are heavily attenuated at 20dB/decade. Output approaches zero.
                </p>
              </div>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <h4 class="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Transition (f ≈ fc)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Gradual transition around -3dB point with 45° phase lead.
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">Pass Band (f ≫ fc)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Signals pass through with minimal attenuation (~0dB).
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Phase Response</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The high-pass filter introduces a phase shift where the output leads the input:
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>At low frequencies: +90° phase lead</li>
              <li>At f<sub>c</sub>: +45° phase lead</li>
              <li>At high frequencies: 0° phase shift (in phase)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Low-Pass Filter</h3>
            <div class="overflow-x-auto my-6">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase">Characteristic</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase">High-Pass</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-orange-800 dark:text-orange-200 uppercase">Low-Pass</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Component Order</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">C then R</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">R then C</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Passes</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">High frequencies</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Low frequencies</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Blocks</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">DC and low frequencies</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">High frequencies</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Phase at f<sub>c</sub></td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">+45° (lead)</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-45° (lag)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Applications</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">DC blocking, tweeter, RF</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Anti-aliasing, woofer, smoothing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Choose R for impedance matching:</strong> For 50Ω systems, use R = 50Ω</li>
              <li><strong>Calculate C from desired f<sub>c</sub>:</strong> C = 1 / (2πRf<sub>c</sub>)</li>
              <li><strong>Use standard values:</strong> E6 series for capacitors, E96 for resistors</li>
              <li><strong>Consider load effects:</strong> Connected load R<sub>L</sub> appears in parallel with filter R</li>
              <li><strong>Cascading:</strong> Multiple RC sections give steeper roll-off (20dB/decade per section)</li>
              <li><strong>Component tolerance:</strong> Affects f<sub>c</sub> accuracy, use 1% or better for precise filters</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Applications</h3>
            <div class="grid md:grid-cols-2 gap-4 my-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">🎵 Audio Systems</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Coupling capacitors between amplifier stages block DC while passing audio signals (typically 10-100µF).
                </p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">📡 RF Circuits</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Matching networks and bias tees use high-pass filters to pass RF while blocking DC bias.
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">🔊 Speaker Crossover</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Tweeters use high-pass filters (typically 2-5kHz) to reproduce high frequencies only.
                </p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <h4 class="font-bold text-orange-700 dark:text-orange-300 mb-2">⚡ Pulse Circuits</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Differentiators convert square waves to spikes by passing edges and blocking DC levels.
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Design Examples</h3>
            <div class="space-y-4">
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Audio Coupling (f<sub>c</sub> = 20Hz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  R = 10kΩ, C = 800nF → Pass audio (20Hz-20kHz) while blocking DC
                </p>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">RF Preselector (f<sub>c</sub> = 10MHz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  R = 50Ω, C = 318pF → Match 50Ω impedance while blocking low frequencies
                </p>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Tweeter Crossover (f<sub>c</sub> = 3kHz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  R = 8Ω, C = 6.6µF → Pass high frequencies to tweeter while protecting it from bass
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Learn electronics through interactive simulations
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import RCHighPassFilter from '~/components/simulations/RCHighPassFilter.vue'
import NavigationBar from '~/components/NavigationBar.vue'
</script>

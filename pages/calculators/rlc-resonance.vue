<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RLC Resonance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate resonant frequency, bandwidth, and Q factor for Series and Parallel RLC circuits
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-purple-500">f₀</span> = 1 / (2π√<span class="text-purple-500">LC</span>) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-purple-500">Q</span> = f₀ / BW
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Resonant Frequency & Quality Factor</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RLCResonanceCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RLC Resonance
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Resonance?</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Resonance occurs in an RLC circuit when the inductive reactance (X<sub>L</sub>) equals the capacitive reactance (X<sub>C</sub>). At this frequency, called the resonant frequency (f₀), the circuit exhibits special properties:
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Series RLC:</strong> Impedance is minimum (equal to resistance), current is maximum</li>
              <li><strong>Parallel RLC:</strong> Impedance is maximum, current is minimum</li>
              <li>Energy oscillates between the inductor and capacitor</li>
              <li>The circuit is purely resistive (no reactive component)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Resonant Frequency</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The resonant frequency depends only on the inductance (L) and capacitance (C):
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                f₀ = 1 / (2π√LC) &nbsp;&nbsp;&nbsp;&nbsp; ω₀ = 1/√LC
              </code>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              This is the frequency at which X<sub>L</sub> = X<sub>C</sub>:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                2πfL = 1 / (2πfC)
              </code>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Quality Factor (Q)</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The quality factor Q measures the sharpness of resonance. Higher Q means narrower bandwidth and more selective filtering:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                Series: Q = (1/R)√(L/C) &nbsp;&nbsp;&nbsp;&nbsp; Parallel: Q = R√(C/L)
              </code>
            </div>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Q > 10:</strong> High Q - Narrow bandwidth, sharp resonance peak</li>
              <li><strong>0.5 < Q < 10:</strong> Medium Q - Moderate bandwidth</li>
              <li><strong>Q < 0.5:</strong> Low Q - Overdamped, no distinct resonance</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Bandwidth</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bandwidth (BW) is the range of frequencies between the -3dB points (half-power points):
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                BW = f₀ / Q = f₂ - f₁
              </code>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Where f₁ is the lower -3dB frequency and f₂ is the upper -3dB frequency.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series vs Parallel RLC</h3>
            <div class="overflow-x-auto my-6">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase">Property</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase">Series RLC</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-purple-800 dark:text-purple-200 uppercase">Parallel RLC</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">At Resonance</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Z = R (minimum)</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Z = R (maximum)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Current</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">I = V/R (maximum)</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">I = V/R (minimum)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Resonance</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Voltage resonance</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Current resonance</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Q Formula</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Q = (1/R)√(L/C)</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Q = R√(C/L)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Applications</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Band-pass filters, tuning</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Band-stop filters, traps</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Damping Ratio</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              The damping ratio (ζ) indicates how quickly oscillations decay:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                ζ = 1 / (2Q)
              </code>
            </div>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>ζ < 1:</strong> Underdamped - Oscillates before settling</li>
              <li><strong>ζ = 1:</strong> Critically damped - Fastest settling without oscillation</li>
              <li><strong>ζ > 1:</strong> Overdamped - Slow settling without oscillation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Reactances at Resonance</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              At resonance, inductive and capacitive reactances are equal:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-sm text-purple-600 dark:text-purple-400 font-mono">
                X<sub>L</sub> = 2πf₀L = √(L/C) &nbsp;&nbsp;&nbsp;&nbsp; X<sub>C</sub> = 1 / (2πf₀C) = √(L/C)
              </code>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              These reactances cancel each other out, leaving only the resistance to limit current in series circuits.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Considerations</h3>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Component Tolerance:</strong> Affects f₀ accuracy. Use 1% or better for precise filters</li>
              <li><strong>Parasitic Elements:</strong> Real inductors have capacitance, real capacitors have inductance</li>
              <li><strong>Q Factor:</strong> Higher Q gives better selectivity but narrower bandwidth</li>
              <li><strong>Temperature Coefficient:</strong> L and C values change with temperature, affecting f₀</li>
              <li><strong>Loading:</strong> Connected loads affect the effective R and change Q</li>
              <li><strong>Cascading:</strong> Multiple resonant stages can achieve steeper roll-off</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Applications</h3>
            <div class="grid md:grid-cols-2 gap-4 my-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">📻 Radio Tuning</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  LC tank circuits select specific frequencies in AM/FM radios, typically using series RLC for impedance matching.
                </p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">🔊 Band-Pass Filters</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Audio crossovers and communication filters use RLC circuits to pass specific frequency ranges.
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">⚡ Wireless Power</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Resonant inductive coupling uses high-Q parallel RLC circuits for efficient power transfer.
                </p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <h4 class="font-bold text-orange-700 dark:text-orange-300 mb-2">🔌 EMI Filters</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Noise suppression filters use parallel RLC circuits to trap specific interference frequencies.
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Examples</h3>
            <div class="space-y-4">
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">AM Radio IF Transformer (455 kHz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  L = 600 µH, C = 200 pF, R = 50 kΩ (parallel) → Q ≈ 50, BW ≈ 9 kHz
                </p>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">WiFi Matching Network (2.4 GHz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  L = 2.2 nH, C = 2 pF, R = 50 Ω (series) → Q ≈ 7, BW ≈ 340 MHz
                </p>
              </div>
              <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2">Power Line Filter (100 kHz)</h4>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  L = 100 µH, C = 25 nF, R = 1 kΩ (parallel) → Q ≈ 5, BW ≈ 20 kHz
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Tips for High-Q Resonance</h3>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Use low-loss inductors with high core permeability</li>
              <li>Choose capacitors with low ESR (equivalent series resistance)</li>
              <li>Minimize parasitic resistance in connections</li>
              <li>Use air-core inductors for very high frequencies</li>
              <li>Keep components close to reduce lead inductance</li>
              <li>Consider temperature effects on L and C values</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Learn electronics through interactive calculations
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import RLCResonanceCalculator from '~/components/calculators/RLCResonanceCalculator.vue'
import NavigationBar from '~/components/NavigationBar.vue'
</script>

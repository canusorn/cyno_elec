<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-500/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RC Low-Pass Filter Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design RC low-pass filters with interactive Bode plot visualization
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-blue-500">f<sub>c</sub></span> = 1 / (2π<span class="text-blue-500">RC</span>) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-blue-500">τ</span> = <span class="text-blue-500">RC</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Cutoff Frequency & Time Constant</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RCLowPassFilterCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RC Low-Pass Filters
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Low-Pass Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A low-pass filter allows low-frequency signals to pass through while attenuating high-frequency signals. 
              The RC (resistor-capacitor) low-pass filter is the simplest and most common type, consisting of just 
              two passive components.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Circuit Operation:</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• <strong>Low frequencies:</strong> Capacitor has high reactance (XC = 1/2πfC), so most voltage drops across it</li>
                <li>• <strong>High frequencies:</strong> Capacitor has low reactance, shunting signal to ground</li>
                <li>• <strong>Cutoff frequency:</strong> Where XC = R, output is 0.707 of input (-3dB point)</li>
                <li>• <strong>Output:</strong> Taken across the capacitor (shunt configuration)</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="space-y-3 mb-6">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p class="font-semibold text-blue-900 dark:text-blue-300">Cutoff Frequency:</p>
                <p class="text-blue-800 dark:text-blue-200 font-mono text-sm mt-2">
                  f<sub>c</sub> = 1 / (2πRC)
                </p>
                <p class="text-blue-700 dark:text-blue-300 text-xs mt-1">
                  The frequency where output power is half the input power (-3dB)
                </p>
              </div>
              
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p class="font-semibold text-purple-900 dark:text-purple-300">Gain (Magnitude Response):</p>
                <p class="text-purple-800 dark:text-purple-200 font-mono text-sm mt-2">
                  |V<sub>out</sub>/V<sub>in</sub>| = 1 / √(1 + (f/f<sub>c</sub>)²)
                </p>
                <p class="text-purple-700 dark:text-purple-300 text-xs mt-1">
                  Output amplitude decreases as frequency increases
                </p>
              </div>
              
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="font-semibold text-green-900 dark:text-green-300">Phase Shift:</p>
                <p class="text-green-800 dark:text-green-200 font-mono text-sm mt-2">
                  φ = -arctan(f/f<sub>c</sub>)
                </p>
                <p class="text-green-700 dark:text-green-300 text-xs mt-1">
                  Output lags input, approaching -90° at high frequencies
                </p>
              </div>
              
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <p class="font-semibold text-orange-900 dark:text-orange-300">Time Constant:</p>
                <p class="text-orange-800 dark:text-orange-200 font-mono text-sm mt-2">
                  τ = RC
                </p>
                <p class="text-orange-700 dark:text-orange-300 text-xs mt-1">
                  Time to reach 63.2% of final value in step response
                </p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Frequency Response Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Passband (f << fc):</strong> Gain ≈ 1 (0dB), minimal attenuation, phase shift ≈ 0°</li>
              <li><strong>At fc (f = fc):</strong> Gain = 0.707 (-3dB), phase shift = -45°</li>
              <li><strong>Stopband (f >> fc):</strong> Gain ≈ fc/f, -20dB/decade roll-off, phase shift ≈ -90°</li>
              <li><strong>Roll-off rate:</strong> -20dB per decade (or -6dB per octave) - first-order filter</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
              <p class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">💡 Design Tips:</p>
              <ul class="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                <li>• <strong>Impedance matching:</strong> Choose R to match source/load impedance (typically 50Ω, 600Ω, etc.)</li>
                <li>• <strong>Component availability:</strong> Use standard E6/E12 capacitor values, then calculate R</li>
                <li>• <strong>Load effects:</strong> Load resistance should be much greater than R (≥10x) to avoid loading the filter</li>
                <li>• <strong>Tolerance:</strong> Component tolerance affects fc accuracy (use 1% or better for precision)</li>
                <li>• <strong>Op-amp buffer:</strong> For heavy loads, add a voltage follower after the capacitor</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio systems:</strong> Subsonic filters, rumble filters, tone controls</li>
              <li><strong>Signal conditioning:</strong> Removing high-frequency noise from sensors</li>
              <li><strong>Anti-aliasing:</strong> Pre-filtering before ADC sampling</li>
              <li><strong>Power supplies:</strong> Smoothing rectified AC to DC</li>
              <li><strong>Communication:</strong> Bandlimiting signals to reduce bandwidth</li>
              <li><strong>Biomedical:</strong> ECG/EEG signal filtering (0.05-100Hz passband)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advantages & Limitations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="font-semibold text-green-900 dark:text-green-300 mb-2">✅ Advantages</p>
                <ul class="text-green-800 dark:text-green-200 text-sm space-y-1">
                  <li>• Simple and inexpensive</li>
                  <li>• Only 2 components needed</li>
                  <li>• No power supply required</li>
                  <li>• Easy to design and build</li>
                  <li>• Wide frequency range</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <p class="font-semibold text-red-900 dark:text-red-300 mb-2">❌ Limitations</p>
                <ul class="text-red-800 dark:text-red-200 text-sm space-y-1">
                  <li>• Gentle roll-off (-20dB/decade)</li>
                  <li>• Affected by source/load impedance</li>
                  <li>• No amplification available</li>
                  <li>• Component tolerances affect accuracy</li>
                  <li>• Limited Q factor</li>
                </ul>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Higher-Order Filters:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For steeper roll-off, multiple RC filter stages can be cascaded. Each additional stage adds another 
              -20dB/decade to the attenuation rate:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>1st order:</strong> -20dB/decade (single RC)</li>
              <li><strong>2nd order:</strong> -40dB/decade (two cascaded RC sections)</li>
              <li><strong>3rd order:</strong> -60dB/decade (three cascaded RC sections)</li>
              <li><strong>n-th order:</strong> -20n dB/decade</li>
            </ul>
            <p class="text-gray-600 dark:text-gray-300">
              For optimal performance, use active filters with op-amps or LC filters for higher-order designs.
            </p>
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
import RCLowPassFilterCalculator from '~/components/RCLowPassFilterCalculator.vue'

// SEO
useHead({
  title: 'RC Low-Pass Filter Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design RC low-pass filters with interactive Bode plot visualization. Calculate cutoff frequency, component values, and frequency response.' },
    { name: 'keywords', content: 'RC filter, low-pass filter, cutoff frequency, Bode plot, frequency response, passive filter, filter design' }
  ]
})

const $colorMode = useColorMode()
</script>

<script setup lang="ts">
import LEDArrayCalculator from '~/components/calculators/LEDArrayCalculator.vue'
import NavigationBar from '~/components/NavigationBar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'LED Array Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate resistor values and power requirements for series, parallel, and mixed LED arrays' }
  ]
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            LED Array Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design series, parallel, and mixed LED arrays with proper resistor values and power ratings
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-yellow-500">R</span> = (Vsource - Vled) / Iled &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-yellow-500">P</span> = I²R
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Ohm's Law for LED Current Limiting</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LEDArrayCalculator />
      </div>
    </section>

    <!-- Additional Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Deep Dive: LED Circuit Design
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why LEDs Need Current Limiting</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              LEDs are current-driven devices, not voltage-driven. Once the forward voltage (Vf) is reached, 
              the LED conducts heavily, and small voltage changes cause large current changes. Without current 
              limiting, the LED can draw excessive current and overheat. A series resistor limits the current 
              to a safe value by dropping the excess voltage.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">LED Characteristics by Color</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Different LED colors have different forward voltages due to their semiconductor bandgap:
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div class="bg-red-100 dark:bg-red-900/30 rounded p-3 text-center">
                <p class="font-semibold text-red-600 dark:text-red-400">Red</p>
                <p class="text-sm text-red-500 dark:text-red-500">1.8-2.2V</p>
              </div>
              <div class="bg-yellow-100 dark:bg-yellow-900/30 rounded p-3 text-center">
                <p class="font-semibold text-yellow-600 dark:text-yellow-400">Yellow/Amber</p>
                <p class="text-sm text-yellow-600 dark:text-yellow-500">2.0-2.4V</p>
              </div>
              <div class="bg-green-100 dark:bg-green-900/30 rounded p-3 text-center">
                <p class="font-semibold text-green-600 dark:text-green-400">Green</p>
                <p class="text-sm text-green-600 dark:text-green-500">2.0-3.1V</p>
              </div>
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded p-3 text-center">
                <p class="font-semibold text-blue-600 dark:text-blue-400">Blue/White</p>
                <p class="text-sm text-blue-600 dark:text-blue-500">3.0-3.3V</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Dissipation in Resistors</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The current-limiting resistor dissipates power as heat. Always choose a resistor with a power 
              rating higher than the calculated dissipation. A good rule of thumb is to use at least 2× the 
              calculated power for reliability and to keep the resistor cool.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Standard Power Ratings:</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• 1/8W (0.125W) - Signal LEDs, low power</li>
                <li>• 1/4W (0.25W) - Most common, general use</li>
                <li>• 1/2W (0.5W) - Higher current or voltage drop</li>
                <li>• 1W - High power arrays, significant voltage drop</li>
                <li>• 2W+ - High voltage, high current applications</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Choosing the Right Configuration</h3>
            <div class="space-y-3">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p class="font-semibold text-blue-700 dark:text-blue-300 mb-2">🔗 Use Series When:</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• You have sufficient source voltage</li>
                  <li>• You want minimum component count</li>
                  <li>• All LEDs should have identical brightness</li>
                  <li>• Efficiency is important (only one resistor loss)</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p class="font-semibold text-green-700 dark:text-green-300 mb-2">🔌 Use Parallel When:</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Source voltage is limited (e.g., 3.3V or 5V)</li>
                  <li>• You want redundancy (one LED fails, others stay lit)</li>
                  <li>• LED count is small (1-4 LEDs)</li>
                  <li>• Higher current draw is acceptable</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p class="font-semibold text-purple-700 dark:text-purple-300 mb-2">🔲 Use Mixed When:</p>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• You need many LEDs (>6)</li>
                  <li>• You want to balance voltage and current</li>
                  <li>• Building LED matrices or panels</li>
                  <li>• Scalability is important</li>
                </ul>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advanced Topics</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Constant Current Drivers:</strong> For high-power LEDs (>1W), use dedicated CC drivers instead of resistors for better efficiency and regulation</li>
              <li><strong>PWM Dimming:</strong> Pulse-width modulation controls brightness without changing color, unlike analog dimming</li>
              <li><strong>Thermal Management:</strong> LED forward voltage decreases with temperature (negative Vf coefficient), which can cause thermal runaway without proper current limiting</li>
              <li><strong>Efficiency:</strong> Series configurations are most efficient (only one resistor). Parallel wastes power in multiple resistors</li>
              <li><strong>Multiplexing:</strong> For large displays, multiplexing reduces wiring by scanning rows/columns rapidly</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Examples</h3>
            <div class="space-y-3">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">5V Indicator LED (Red)</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Vsource = 5V, Vled = 2.1V, Iled = 20mA<br>
                  R = (5 - 2.1) / 0.02 = 145Ω (use 150Ω)<br>
                  P = (0.02)² × 150 = 0.06W (1/4W resistor)
                </p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">12V LED Strip (3 LEDs in series)</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Vsource = 12V, Vled = 3V per LED, Iled = 20mA<br>
                  Vtotal = 3 × 3V = 9V<br>
                  R = (12 - 9) / 0.02 = 150Ω<br>
                  This is how commercial LED strips are designed!
                </p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">12V White LED Array (4 parallel strings of 3)</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  12 LEDs total: 4 strings × 3 LEDs each<br>
                  Each string: R = 150Ω, P = 60mW<br>
                  Total current: 4 × 20mA = 80mA<br>
                  Total power: 12V × 80mA = 0.96W
                </p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Safety Considerations</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Never connect LEDs directly to voltage sources without current limiting</li>
              <li>Always check LED polarity - reverse connection won't damage but won't light</li>
              <li>High-power LEDs require heatsinking to prevent thermal damage</li>
              <li>Blue and white LEDs can emit UV - avoid direct eye exposure at close range</li>
              <li>When using AC mains power, always use proper isolation and safety-rated components</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-500 dark:text-gray-400">
          <p class="text-sm">
            Part of the <span class="font-semibold text-yellow-500">Cyno Electric</span> interactive learning platform
          </p>
          <p class="text-xs mt-2">
            Built with Nuxt.js, Vue 3, and TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

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
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Level Converter Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate resistor values for bidirectional logic level conversion between different voltage domains
          </p>
          
          <!-- Quick Info -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="flex items-center gap-6 text-sm font-mono">
              <div>
                <span class="text-gray-500">Common Conversions:</span>
                <span class="ml-2 text-green-600 font-bold">3.3V ↔ 5V</span>
                <span class="mx-2 text-gray-400">|</span>
                <span class="text-blue-600 font-bold">1.8V ↔ 3.3V</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <VoltageLevelConverter />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Logic Level Conversion
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Level Shifting is Necessary</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Modern electronics use different logic voltage levels. Connecting a 5V Arduino directly to a 3.3V ESP8266 
              can damage the latter. Similarly, 3.3V signals may not be recognized as HIGH by 5V devices. 
              Level shifters safely translate signals between voltage domains.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How MOSFET Level Shifters Work</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The bidirectional MOSFET level shifter uses a single N-channel MOSFET and a pull-up resistor. 
              When the low-voltage side drives LOW, it pulls the gate LOW through the MOSFET's body diode, 
              causing the MOSFET to conduct and pull the high-voltage side LOW. When either side is HIGH, 
              the MOSFET is OFF, and the pull-up resistor maintains the HIGH level.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>R_pullup selection: 1kΩ to 10kΩ (typically 4.7kΩ)</p>
              <p>I_max = V_HV / R_pullup</p>
              <p>f_max ≈ 1 / (2π × R_pullup × C_gate)</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Choosing Pull-up Resistor Value:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Lower values (1kΩ - 2.2kΩ):</strong> Faster signal edges, higher current consumption, better for high-speed signals</li>
              <li><strong>Medium values (4.7kΩ):</strong> Good balance of speed and power (most common)</li>
              <li><strong>Higher values (10kΩ+):</strong> Lower power consumption, slower signal edges, may limit maximum frequency</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Logic Levels:</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">1.8V Logic</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Modern microcontrollers</li>
                  <li>• Low-power applications</li>
                  <li>• Mobile devices</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">3.3V Logic</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• ARM microcontrollers</li>
                  <li>• ESP8266/ESP32</li>
                  <li>• Raspberry Pi GPIO</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-bold text-orange-800 dark:text-orange-300 mb-2">5V Logic</h4>
                <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>• Classic Arduino (AVR)</li>
                  <li>• Many sensors</li>
                  <li>• Legacy systems</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Examples:</h3>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="font-bold text-gray-800 dark:text-gray-200 mb-2">Example 1: Arduino to ESP8266 (UART)</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Arduino TX (5V) → Level Shifter HV → ESP8266 RX (3.3V)<br/>
                Arduino RX (5V) ← Level Shifter LV ← ESP8266 TX (3.3V)
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                R_pullup = 4.7kΩ, Bidirectional communication
              </p>
            </div>

            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="font-bold text-gray-800 dark:text-gray-200 mb-2">Example 2: Raspberry Pi to Arduino (I2C)</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Raspberry Pi (3.3V) ↔ Level Shifter ↔ Arduino (5V)<br/>
                Bidirectional on both SDA and SCL lines
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                R_pullup = 4.7kΩ on each line, Standard mode (100kHz)
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Speed:</strong> For high-speed signals (SPI, fast I2C), use lower pull-up values (1kΩ - 2.2kΩ)</li>
              <li><strong>Power:</strong> Lower pull-up values consume more current; consider power constraints</li>
              <li><strong>MOSFET Selection:</strong> Use logic-level MOSFETs with low gate-source threshold voltage (V_gs(th) < 1.5V)</li>
              <li><strong>Bidirectional vs Unidirectional:</strong> This circuit works bidirectionally, making it ideal for open-drain protocols like I2C</li>
              <li><strong>Multiple Channels:</strong> Use dedicated level shifter ICs (TXS0108E, 74LVC245) for multiple signals</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Alternative Level Shifter Types:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage Divider:</strong> Simple, unidirectional only (HV → LV)</li>
              <li><strong>Diode Clamp:</strong> Basic protection, limited to LV → HV</li>
              <li><strong>Dedicated ICs:</strong> TXS0108E, 74LVC245, PCA9306 (multi-channel, bidirectional)</li>
              <li><strong>Optocouplers:</strong> Provides galvanic isolation for noisy environments</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Experiment with the Calculator:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Try different voltage combinations and observe how the pull-up resistor affects signal speed and current consumption. 
              Use the presets for common scenarios like 3.3V to 5V conversion or 1.8V to 3.3V conversion.
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
import { BoltIcon } from '@heroicons/vue/24/outline'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import VoltageLevelConverter from '~/components/VoltageLevelConverter.vue'

// SEO
useHead({
  title: 'Voltage Level Converter Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate resistor values for bidirectional logic level conversion. Interface 5V, 3.3V, and 1.8V logic devices safely.' },
    { name: 'keywords', content: 'level shifter, logic converter, voltage translator, MOSFET, bidirectional, Arduino, ESP8266, Raspberry Pi' }
  ]
})

const colorMode = useColorMode()
</script>

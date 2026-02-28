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
            LM317 Voltage Regulator Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design adjustable power supplies with the classic LM317 regulator
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Vout</span> = 1.25 × (1 + R2/R1)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Output Voltage Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LM317Calculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding the LM317
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is the LM317?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The LM317 is a popular adjustable positive voltage regulator that can supply more than 1.5A 
              of load current with output voltage adjustable from 1.25V to 37V. It's one of the most widely 
              used voltage regulators due to its simplicity, reliability, and ease of use. The LM317 is ideal 
              for DIY power supplies, battery chargers, and laboratory bench power supplies.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Features:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Output Voltage Range:</strong> 1.25V to 37V (adjustable)</li>
              <li><strong>Output Current:</strong> Up to 1.5A (with proper heatsinking)</li>
              <li><strong>Line Regulation:</strong> 0.01% typical (excellent stability)</li>
              <li><strong>Load Regulation:</strong> 0.1% typical (maintains voltage under load)</li>
              <li><strong>Ripple Rejection:</strong> 80dB (filters input noise)</li>
              <li><strong>Internal Protection:</strong> Short-circuit current limiting, thermal overload protection, safe-area compensation</li>
              <li><strong>Dropout Voltage:</strong> Typically 2V (Vin must be ≥ 2V above Vout)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The LM317 maintains a constant 1.25V reference voltage between the Output (pin 2) and 
              Adjust (pin 1) pins. By connecting two resistors as a voltage divider between the output 
              and ground, the regulator adjusts its output to maintain this 1.25V across the lower resistor (R1).
            </p>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="font-semibold mb-2">Circuit Connections:</p>
              <ul class="text-sm space-y-1">
                <li>• <strong>Pin 1 (Adjust):</strong> Connected to the junction of R1 and R2</li>
                <li>• <strong>Pin 2 (Output):</strong> Connected to one end of R1 (other end goes to Adjust)</li>
                <li>• <strong>Pin 3 (Input):</strong> Connected to unregulated DC input voltage</li>
                <li>• <strong>R2:</strong> Connected between Output and Adjust (provides feedback)</li>
                <li>• <strong>Capacitors:</strong> C1 (input) and C2 (output) improve stability and reduce noise</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Output Voltage Formula:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="text-center text-lg font-mono font-bold">
                Vout = 1.25 × (1 + R2/R1)
              </div>
              <div class="text-center text-sm mt-2">
                Where:<br>
                Vout = Desired output voltage<br>
                1.25V = Internal reference voltage<br>
                R1 = Resistor from Output to Adjust (typically 240Ω)<br>
                R2 = Resistor from Adjust to Ground (sets output voltage)
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Solving for R2 when you know the desired output voltage:
            </p>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="text-center text-lg font-mono font-bold">
                R2 = R1 × (Vout/1.25 - 1)
              </div>
              <div class="text-center text-sm mt-2">
                Example: For 5V output with R1 = 240Ω<br>
                R2 = 240 × (5/1.25 - 1) = 240 × 3 = 720Ω
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Component Selection:</h3>
            
            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Resistor R1:</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Typical Value:</strong> 240Ω (standard value, good compromise)</li>
              <li><strong>Range:</strong> 100Ω to 1000Ω (higher values reduce quiescent current but may affect regulation)</li>
              <li><strong>Power Rating:</strong> 1/4W is sufficient (I²R = (0.01A)² × 240Ω = 0.024W)</li>
              <li><strong>Tolerance:</strong> 1% for accurate output voltage</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Resistor R2:</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Value:</strong> Calculated based on desired output voltage</li>
              <li><strong>Standard Values:</strong> Use E24 series resistors for best availability</li>
              <li><strong>Adjustment:</strong> Can use a potentiometer (trimpot) for fine-tuning</li>
              <li><strong>Power Rating:</strong> Usually 1/4W is sufficient for low-current applications</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Input Capacitor (C1):</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Value:</strong> 0.1µF ceramic (typical)</li>
              <li><strong>Purpose:</strong> Improves stability and ripple rejection</li>
              <li><strong>Placement:</strong> Close to the Input pin</li>
              <li><strong>Optional:</strong> Add 10µF-47µF electrolytic for better filtering</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Output Capacitor (C2):</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Value:</strong> 1µF to 10µF (typically 1µF tantalum or 10µF electrolytic)</li>
              <li><strong>Purpose:</strong> Improves transient response and reduces output noise</li>
              <li><strong>Placement:</strong> Close to the Output pin</li>
              <li><strong>Important:</strong> Use at least 1µF for stability</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Adjust Pin Capacitor (Optional):</h4>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Value:</strong> 10µF electrolytic from Adjust to ground</li>
              <li><strong>Purpose:</strong> Dramatically improves ripple rejection (to 80dB)</li>
              <li><strong>Effect:</strong> Can improve output voltage accuracy</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Dissipation & Heatsinking:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The LM317 dissipates power as heat based on the voltage drop and load current:
            </p>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="text-center text-lg font-mono font-bold">
                P = (Vin - Vout) × Iout
              </div>
              <div class="text-center text-sm mt-2">
                Where:<br>
                P = Power dissipation in watts<br>
                Vin = Input voltage<br>
                Vout = Output voltage<br>
                Iout = Load current in amps
              </div>
            </div>

            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Power Dissipation</th>
                    <th class="text-left py-2">Heatsink Required</th>
                    <th class="text-left py-2">Thermal Resistance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0 - 0.5W</td>
                    <td class="py-2">No heatsink needed</td>
                    <td class="py-2">Use PCB copper</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0.5 - 1W</td>
                    <td class="py-2">Small heatsink</td>
                    <td class="py-2">Small TO-220 heatsink</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">1 - 2W</td>
                    <td class="py-2">Medium heatsink</td>
                    <td class="py-2">Medium TO-220 heatsink</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">2 - 5W</td>
                    <td class="py-2">Large heatsink</td>
                    <td class="py-2">Large TO-220 heatsink with fins</td>
                  </tr>
                  <tr>
                    <td class="py-2">> 5W</td>
                    <td class="py-2">Consider switching regulator</td>
                    <td class="py-2">Too inefficient for linear</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Input Voltage Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Minimum Dropout:</strong> Vin must be at least 2V higher than Vout (3V recommended)</li>
              <li><strong>Maximum Input:</strong> 40V absolute maximum (derate for high temperature)</li>
              <li><strong>Optimal Drop:</strong> Keep Vin - Vout between 3V and 10V for best efficiency</li>
              <li><strong>High Vin:</strong> Large voltage drops waste power and require large heatsinks</li>
              <li><strong>Ripple:</strong> Input ripple will be reduced but not eliminated (80dB rejection)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Example - 5V, 1A Supply:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="font-semibold mb-2">Specifications:</p>
              <ul class="text-sm space-y-1">
                <li>• Output: 5V at 1A</li>
                <li>• Input: 12V DC (from adapter or battery)</li>
                <li>• Voltage drop: 12V - 5V = 7V</li>
                <li>• Power dissipation: 7V × 1A = 7W (needs large heatsink!)</li>
              </ul>
              <p class="font-semibold mt-4 mb-2">Components:</p>
              <ul class="text-sm space-y-1">
                <li>• R1 = 240Ω, 1/4W</li>
                <li>• R2 = 720Ω, 1/4W (or 680Ω + 39Ω in series, or 750Ω trimmer)</li>
                <li>• C1 = 0.1µF ceramic + 10µF electrolytic</li>
                <li>• C2 = 10µF tantalum or 47µF electrolytic</li>
                <li>• Heatsink: Medium to large TO-220 heatsink</li>
              </ul>
              <p class="font-semibold mt-4 mb-2">Note:</p>
              <p class="text-sm">For high-current applications, consider using a switching pre-regulator or a buck converter to reduce the voltage drop across the LM317.</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Tips for Better Performance:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Use 1% Resistors:</strong> For accurate output voltage, use 1% tolerance metal film resistors</li>
              <li><strong>Star Ground:</strong> Connect R1, R2, and C2 grounds at a single point near the Adjust pin</li>
              <li><strong>Keep Wires Short:</strong> Long wires can pick up noise and cause instability</li>
              <li><strong>Add Protection Diode:</strong> For high capacitance loads (>25µF), add a diode from output to input</li>
              <li><strong>Remote Sensing:</strong> For better load regulation at high currents, sense voltage at the load</li>
              <li><strong>Parallel Operation:</strong> Use multiple LM317s in parallel for currents >1.5A</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Bench Power Supply:</strong> Adjustable voltage for testing and prototyping</li>
              <li><strong>Battery Charger:</strong> Constant voltage charging with current limiting</li>
              <li><strong>Arduino Power:</strong> Clean 5V or 3.3V for microcontrollers</li>
              <li><strong>Amplifier Supply:</strong> Low-noise voltage for audio preamps</li>
              <li><strong>Sensor Excitation:</strong> Stable reference voltage for precision sensors</li>
              <li><strong>Motor Controller:</strong> Logic-level supply from higher voltage battery</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">LM317 vs Other Regulators:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Regulator</th>
                    <th class="text-left py-2">Type</th>
                    <th class="text-left py-2">Adjustable?</th>
                    <th class="text-left py-2">Max Current</th>
                    <th class="text-left py-2">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">LM317</td>
                    <td class="py-2">Linear</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">1.5A</td>
                    <td class="py-2">General use, low noise</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">LM7805</td>
                    <td class="py-2">Linear</td>
                    <td class="py-2">No (fixed 5V)</td>
                    <td class="py-2">1A</td>
                    <td class="py-2">Simple 5V supply</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">LM350</td>
                    <td class="py-2">Linear</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">3A</td>
                    <td class="py-2">Higher current</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">LM338</td>
                    <td class="py-2">Linear</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">5A</td>
                    <td class="py-2">Very high current</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Buck Converter</td>
                    <td class="py-2">Switching</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">Varies</td>
                    <td class="py-2">High efficiency (>90%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">When to Use Switching Regulators:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Voltage Drop:</strong> When Vin - Vout > 10V (significant power waste)</li>
              <li><strong>High Current:</strong> When load current > 1A (large heatsinks needed)</li>
              <li><strong>Battery Powered:</strong> When efficiency matters for battery life</li>
              <li><strong>Limited Space:</strong> When you can't fit a large heatsink</li>
              <li><strong>Heat Sensitive:</strong> When other components are nearby and temperature-sensitive</li>
            </ul>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Consider using a buck converter (switching regulator) for the main voltage drop, followed by 
              an LM317 for final regulation and noise filtering. This gives you the best of both worlds: 
              high efficiency AND low noise.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Troubleshooting:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Output Too High:</strong> Check resistor values, verify connections, ensure R1 is not open</li>
              <li><strong>Output Too Low:</strong> Check Vin is ≥ 3V above desired Vout, check for excessive load</li>
              <li><strong>Oscillating Output:</strong> Add output capacitor (≥1µF), check capacitor is close to pins</li>
              <li><strong>Overheating:</strong> Verify power calculation, add heatsink, reduce load or Vin-Vout difference</li>
              <li><strong>Poor Regulation:</strong> Check resistor tolerance (use 1%), verify ground connections</li>
              <li><strong>No Output:</strong> Verify Vin is present, check for short circuit, test with no load</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Topics -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔗 Related Topics
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink 
              to="/calculators/voltage-divider"
              class="flex items-center p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              <BoltIcon class="h-8 w-8 text-primary mr-3" />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Voltage Divider</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Calculate voltage division</div>
              </div>
            </NuxtLink>
            <NuxtLink 
              to="/simulations/buck-converter"
              class="flex items-center p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              <CpuChipIcon class="h-8 w-8 text-primary mr-3" />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Buck Converter</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Efficient step-down regulator</div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-600 dark:text-gray-400">
      <p>Learn electronics through interactive simulation</p>
    </footer>
  </div>
</template>

<script setup>
import { CpuChipIcon, BoltIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'LM317 Voltage Regulator Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive LM317 voltage regulator calculator. Design adjustable power supplies, calculate resistor values, power dissipation, and heatsink requirements.' }
  ]
})
</script>

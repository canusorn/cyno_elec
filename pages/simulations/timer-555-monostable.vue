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
            <ClockIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            555 Timer Monostable Mode
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Generate precise single pulses with the classic 555 timer IC
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Pulse Width</span> = 1.1 × R × C
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Monostable Timing Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Timer555Monostable />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Monostable Mode
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Monostable Mode?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The monostable mode (also called "one-shot") produces a single output pulse of fixed duration 
              when triggered. Unlike the astable mode which oscillates continuously, the monostable mode is 
              stable in one state (low) and temporarily switches to the other state (high) when triggered, 
              then automatically returns to the stable state.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Initial State (Stable):</strong> Output is LOW, capacitor is discharged</li>
              <li><strong>Trigger:</strong> A negative pulse on pin 2 (Trigger) starts the timing cycle</li>
              <li><strong>Timing Phase:</strong> Capacitor charges through resistor R</li>
              <li><strong>Threshold Detection:</strong> When capacitor voltage reaches 2/3 Vcc, output goes LOW</li>
              <li><strong>Reset:</strong> Capacitor rapidly discharges, ready for next trigger</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Configuration:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Pin 2 (Trigger):</strong> Normally held HIGH, pulled LOW to trigger (must be < 1/3 Vcc)</li>
              <li><strong>Pin 6 (Threshold) & Pin 7 (Discharge):</strong> Connected together to the capacitor</li>
              <li><strong>Resistor (R):</strong> Connects Vcc to capacitor, controls charging rate</li>
              <li><strong>Capacitor (C):</strong> Connected to ground, determines timing with R</li>
              <li><strong>Pin 3 (Output):</strong> Goes HIGH during timing pulse</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Pulse Width Formula:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="text-center text-lg font-mono font-bold">
                t = 1.1 × R × C
              </div>
              <div class="text-center text-sm mt-2">
                Where: t = pulse width in seconds<br>
                R = resistance in ohms<br>
                C = capacitance in farads
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The factor 1.1 comes from the time it takes the capacitor to charge from 0V to 2/3 of Vcc 
              through the resistor. In one time constant (τ = RC), the capacitor charges to about 63.2% of Vcc. 
              To reach 66.7% (2/3 Vcc), it takes approximately 1.1 time constants.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Triggering Requirements:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Trigger Voltage:</strong> Must drop below 1/3 of Vcc (typically 1.67V for 5V supply)</li>
              <li><strong>Trigger Pulse Width:</strong> Should be shorter than the output pulse width</li>
              <li><strong>Trigger Timing:</strong> Can only re-trigger after current timing cycle completes</li>
              <li><strong>Trigger Source:</strong> Push button, oscillator, microcontroller, or other logic</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Component Selection:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Pulse Width</th>
                    <th class="text-left py-2">Resistance (R)</th>
                    <th class="text-left py-2">Capacitance (C)</th>
                    <th class="text-left py-2">Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">1ms - 100ms</td>
                    <td class="py-2">1kΩ - 100kΩ</td>
                    <td class="py-2">0.01µF - 1µF</td>
                    <td class="py-2">Switch debounce</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">100ms - 1s</td>
                    <td class="py-2">10kΩ - 100kΩ</td>
                    <td class="py-2">1µF - 10µF</td>
                    <td class="py-2">Timer delays</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">1s - 60s</td>
                    <td class="py-2">100kΩ - 1MΩ</td>
                    <td class="py-2">10µF - 100µF</td>
                    <td class="py-2">Long delays</td>
                  </tr>
                  <tr>
                    <td class="py-2">1min+</td>
                    <td class="py-2">1MΩ+</td>
                    <td class="py-2">100µF+</td>
                    <td class="py-2">Extended timing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Switch Debouncing:</strong> Generate clean pulses from mechanical switches</li>
              <li><strong>Time Delay:</strong> Turn on devices after a set delay (e.g., power-on delay)</li>
              <li><strong>Pulse Width Modulation:</strong> Create variable width pulses</li>
              <li><strong>Missing Pulse Detector:</strong> Detect if regular pulses stop arriving</li>
              <li><strong>Frequency Dividers:</strong> Divide input frequency by integer ratio</li>
              <li><strong>Touch Sensors:</strong> Create timing pulses for capacitive touch</li>
              <li><strong>Camera Shutter Control:</strong> Precise exposure timing</li>
              <li><strong>Motor Control:</strong> Generate precise control pulses</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Capacitor Type:</strong> Use ceramic or film capacitors for stability, avoid electrolytic for precision timing</li>
              <li><strong>Resistor Tolerance:</strong> Use 1% or better resistors for accurate timing</li>
              <li><strong>Power Supply:</strong> Stable Vcc improves timing accuracy (use regulated supply)</li>
              <li><strong>Temperature:</strong> RC values drift with temperature; critical timing may need compensation</li>
              <li><strong>Reset Pin (4):</strong> Connect to Vcc or use to abort timing early</li>
              <li><strong>Control Voltage (5):</strong> Leave open for standard timing, or apply voltage to adjust threshold</li>
              <li><strong>Output Current:</strong> 555 can source/sink up to 200mA, sufficient for LEDs and small relays</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Calculations:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="font-semibold mb-2">For a 1-second pulse:</p>
              <ul class="text-sm space-y-1">
                <li>• Using 10µF capacitor: R = 1s / (1.1 × 10µF) = 90.9kΩ → use 91kΩ</li>
                <li>• Using 100µF capacitor: R = 1s / (1.1 × 100µF) = 9.09kΩ → use 9.1kΩ</li>
                <li>• Using 1µF capacitor: R = 1s / (1.1 × 1µF) = 909kΩ → use 910kΩ</li>
              </ul>
              <p class="font-semibold mt-4 mb-2">For a 100ms pulse:</p>
              <ul class="text-sm space-y-1">
                <li>• Using 10µF capacitor: R = 0.1s / (1.1 × 10µF) = 9.09kΩ → use 9.1kΩ</li>
                <li>• Using 1µF capacitor: R = 0.1s / (1.1 × 1µF) = 90.9kΩ → use 91kΩ</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Monostable vs Astable Mode:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Feature</th>
                    <th class="text-left py-2">Monostable</th>
                    <th class="text-left py-2">Astable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Output</td>
                    <td class="py-2">Single pulse on trigger</td>
                    <td class="py-2">Continuous oscillation</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Trigger Required</td>
                    <td class="py-2">Yes</td>
                    <td class="py-2">No (self-oscillating)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Duty Cycle</td>
                    <td class="py-2">Very short (one pulse)</td>
                    <td class="py-2">Adjustable</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Components</td>
                    <td class="py-2">R and C</td>
                    <td class="py-2">R1, R2, and C</td>
                  </tr>
                  <tr>
                    <td class="py-2">Applications</td>
                    <td class="py-2">Timing, delays, one-shot</td>
                    <td class="py-2">Clocks, blinkers, PWM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advanced Techniques:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Retriggerable Monostable:</strong> Add diode to allow retriggering during timing cycle</li>
              <li><strong>Long Period Timing:</strong> Use larger capacitor values or cascade multiple 555 timers</li>
              <li><strong>Pulse Stretching:</strong> Extend short input pulses to longer output pulses</li>
              <li><strong>Delay ON Circuit:</strong> Use output to enable relay or load after delay</li>
              <li><strong>Missing Pulse Detection:</strong> Monitor periodic pulses; if missing, trigger alarm</li>
              <li><strong>Frequency-to-Voltage:</strong> Convert pulse frequency to proportional voltage</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Troubleshooting:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>No Output Pulse:</strong> Check trigger polarity (needs negative edge), verify pin 2 is normally HIGH</li>
              <li><strong>Wrong Pulse Width:</strong> Measure R and C values with multimeter, check for tolerance errors</li>
              <li><strong>Multiple Triggers:</strong> Add capacitor debounce circuit on trigger input</li>
              <li><strong>Unstable Timing:</strong> Use stable power supply, quality capacitor, proper resistor</li>
              <li><strong>Output Won't Turn Off:</strong> Check capacitor charging, verify threshold pin (6) connection</li>
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
              to="/simulations/timer-555-astable"
              class="flex items-center p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              <ClockIcon class="h-8 w-8 text-primary mr-3" />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">555 Astable Mode</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Continuous oscillator</div>
              </div>
            </NuxtLink>
            <NuxtLink 
              to="/calculators/rc-time-constant"
              class="flex items-center p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-lg transition-shadow"
            >
              <BoltIcon class="h-8 w-8 text-primary mr-3" />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">RC Time Constant</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Calculate τ = R × C</div>
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
import { ClockIcon, BoltIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: '555 Timer Monostable Mode - Circuit Simulation',
  meta: [
    { name: 'description', content: 'Interactive 555 timer monostable circuit simulator. Learn single-pulse generation, timing calculations, and circuit design.' }
  ]
})
</script>

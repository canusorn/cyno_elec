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
            🔌 MOSFET Switching Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn how MOSFETs work as electronic switches with interactive visualization
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MOSFETSwitching />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding MOSFET Switching
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a MOSFET?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) is a voltage-controlled device 
              that acts as a switch. Unlike BJTs which are current-controlled, MOSFETs are controlled by 
              the gate-source voltage (V_GS), making them ideal for high-power applications.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">N-Channel Enhancement MOSFET:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Gate (G):</strong> Control terminal - insulated from channel by oxide layer</li>
              <li><strong>Drain (D):</strong> Current enters through this terminal (like NPN collector)</li>
              <li><strong>Source (S):</strong> Current exits through this terminal (like NPN emitter)</li>
              <li><strong>Body/Substrate:</strong> Usually connected to source in discrete devices</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Operating Regions:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Region</th>
                    <th class="text-left py-2">Condition</th>
                    <th class="text-left py-2">Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold text-gray-700 dark:text-gray-300">Cutoff (OFF)</td>
                    <td class="py-2">V_GS < V_th</td>
                    <td class="py-2">No channel formed, I_D = 0 (switch open)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 font-semibold text-gray-700 dark:text-gray-300">Linear (Triode)</td>
                    <td class="py-2">V_GS > V_th AND V_DS < V_GS - V_th</td>
                    <td class="py-2">Channel partially formed, acts as variable resistor</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-semibold text-gray-700 dark:text-gray-300">Saturation (ON)</td>
                    <td class="py-2">V_GS > V_th AND V_DS ≥ V_GS - V_th</td>
                    <td class="py-2">Channel fully formed, current constant (switch closed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>Overdrive Voltage:</strong> V_ov = V_GS - V_th</p>
              <p><strong>Cutoff Region:</strong> I_D = 0 (when V_GS < V_th)</p>
              <p><strong>Linear Region:</strong> I_D = K[(2×V_ov×V_DS) - V_DS²]</p>
              <p><strong>Saturation Region:</strong> I_D = K × V_ov²</p>
              <p><strong>Saturation Boundary:</strong> V_DS(sat) = V_ov = V_GS - V_th</p>
              <p><strong>Power Dissipation:</strong> P = I_D × V_DS</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">MOSFET as a Switch:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>OFF State:</strong> V_GS = 0V, no current flows (I_D = 0), V_DS = V_DD</li>
              <li><strong>ON State:</strong> V_GS >> V_th, maximum current flows, V_DS ≈ 0.2V (low resistance)</li>
              <li><strong>Switching Speed:</strong> Very fast (nanoseconds to microseconds)</li>
              <li><strong>Gate Current:</strong> Nearly zero (only capacitive charging current)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advantages of MOSFETs over BJTs:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage Controlled:</strong> Requires almost no gate current (high input impedance)</li>
              <li><strong>Fast Switching:</strong> Can switch at very high frequencies</li>
              <li><strong>Low ON Resistance:</strong> R_DS(on) can be milliohms (less power loss)</li>
              <li><strong>Negative Temperature Coefficient:</strong> Less prone to thermal runaway</li>
              <li><strong>Easy to Parallel:</strong> Multiple MOSFETs can be connected in parallel</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Power Switching:</strong> DC-DC converters, motor drives, relay replacements</li>
              <li><strong>Amplifiers:</strong> Audio amplifiers, RF power amplifiers</li>
              <li><strong>Digital Logic:</strong> CMOS logic gates, microcontrollers</li>
              <li><strong>Load Switches:</strong> Battery management, power distribution</li>
              <li><strong>Inverters:</strong> Solar inverters, UPS systems, VFDs</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Logic-Level vs Standard MOSFETs:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Type</th>
                    <th class="text-left py-2">V_th</th>
                    <th class="text-left py-2">Drive Voltage</th>
                    <th class="text-left py-2">Applications</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Logic-Level</td>
                    <td class="py-2">1-2V</td>
                    <td class="py-2">3.3V or 5V logic</td>
                    <td class="py-2">Microcontrollers, Arduino, Raspberry Pi</td>
                  </tr>
                  <tr>
                    <td class="py-2">Standard</td>
                    <td class="py-2">2-4V</td>
                    <td class="py-2">10V for full enhancement</td>
                    <td class="py-2">High power, automotive, industrial</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Parameters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>V_DSS:</strong> Maximum drain-source voltage (breakdown voltage)</li>
              <li><strong>I_D(max):</strong> Maximum continuous drain current</li>
              <li><strong>R_DS(on):</strong> On-resistance when fully turned on</li>
              <li><strong>V_GS(th):</strong> Gate threshold voltage</li>
              <li><strong>Q_g:</strong> Total gate charge (affects switching speed)</li>
              <li><strong>P_D:</strong> Maximum power dissipation</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Popular MOSFET Families:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4 space-y-2 text-sm">
              <p><strong>IRF Series (International Rectifier):</strong> IRF540N (100V, 33A), IRFZ44N (55V, 49A)</p>
              <p><strong>AO Series (Alpha & Omega):</strong> AO3400 (30V, 5.8A, logic-level)</p>
              <p><strong>IRL Series (Logic-Level):</strong> IRLZ44N (55V, 47A), IRLZ34N (30V, 30A)</p>
              <p><strong>STP Series (STMicroelectronics):</strong> STP55NF06L (60V, 50A)</p>
              <p><strong>SiC & GaN MOSFETs:</strong> For high-frequency and high-temperature applications</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use a gate resistor (10-100Ω) to prevent ringing and limit peak current</li>
              <li>Add a flyback diode across inductive loads (motors, relays)</li>
              <li>Ensure adequate heatsinking for high-power applications</li>
              <li>Consider gate charge (Q_g) when calculating drive requirements</li>
              <li>Use pull-down resistor (10kΩ) on gate to ensure OFF state when floating</li>
              <li>Check V_GS(max) rating (typically ±20V) - never exceed!</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Circuit Analysis:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 space-y-2 text-sm">
              <p><strong>Given:</strong> V_DD = 12V, R_L = 100Ω, V_th = 4V, K = 100mA/V², V_GS = 8V</p>
              <p><strong>Solution:</strong></p>
              <p>V_ov = 8V - 4V = 4V</p>
              <p>I_D(sat) = 0.1 × 4² = 1.6A</p>
              <p>V_DS(sat) = 4V</p>
              <p>Since V_DD (12V) > V_DS(sat) (4V), MOSFET is in SATURATION</p>
              <p>I_D = 1.6A (constant)</p>
              <p>V_DS = 12V - (1.6A × 100Ω) = 12V - 160V = negative!</p>
              <p><strong>Correction:</strong> I_D limited by load resistor: I_D(max) = 12V/100Ω = 0.12A = 120mA</p>
              <p>Therefore, V_DS = 12V - (0.12A × 100Ω) ≈ 0V (fully ON)</p>
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
import MOSFETSwitching from '~/components/MOSFETSwitching.vue'

// SEO
useHead({
  title: 'MOSFET Switching Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive MOSFET switching simulator. Learn how N-channel MOSFETs work as electronic switches with real-time visualization of operating regions.' },
    { name: 'keywords', content: 'MOSFET, field effect transistor, electronic switch, power electronics, circuit simulator, MOSFET switching' }
  ]
})

const colorMode = useColorMode()
</script>

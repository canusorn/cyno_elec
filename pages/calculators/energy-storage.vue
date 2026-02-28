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
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Energy Storage Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate energy stored in capacitors and inductors
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Capacitor:</span> E = ½CV² &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-primary-highlight">Inductor:</span> E = ½LI²
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Energy Storage Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EnergyStorageCalculator />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Energy Storage
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Energy Storage Matters</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Energy storage is fundamental to electrical engineering. Capacitors and inductors store energy in electric 
              and magnetic fields, respectively. This stored energy can be released quickly, making these components 
              essential for countless applications from power supplies to signal processing.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Capacitor Energy Storage</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Electric Field:</strong> Energy stored in the electric field between charged plates</li>
              <li><strong>Formula:</strong> E = ½CV² — Energy increases with voltage squared</li>
              <li><strong>Fast Release:</strong> Can discharge almost instantly (flash photography, defibrillators)</li>
              <li><strong>Applications:</strong> Power supply filtering, energy harvesting, pulse circuits, memory backup</li>
              <li><strong>Supercapacitors:</strong> Very high capacitance (1-1000F) for energy storage applications</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Inductor Energy Storage</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Magnetic Field:</strong> Energy stored in the magnetic field around the coil</li>
              <li><strong>Formula:</strong> E = ½LI² — Energy increases with current squared</li>
              <li><strong>Current Inertia:</strong> Opposes changes in current (Lenz's law)</li>
              <li><strong>Applications:</strong> Switching power supplies, motors, transformers, wireless charging</li>
              <li><strong>Relays & Solenoids:</strong> Use stored magnetic energy to do mechanical work</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Differences</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Property</th>
                    <th class="text-left py-2">Capacitor</th>
                    <th class="text-left py-2">Inductor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Energy Field</td>
                    <td class="py-2">Electric</td>
                    <td class="py-2">Magnetic</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Cannot Change Instantly</td>
                    <td class="py-2">Voltage</td>
                    <td class="py-2">Current</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">DC Behavior</td>
                    <td class="py-2">Open circuit</td>
                    <td class="py-2">Short circuit</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Energy Proportional To</td>
                    <td class="py-2">V²</td>
                    <td class="py-2">I²</td>
                  </tr>
                  <tr>
                    <td class="py-2">Typical Energy Density</td>
                    <td class="py-2">Lower (except supercaps)</td>
                    <td class="py-2">Higher (for similar size)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">⚡ Camera Flash</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  A capacitor charges slowly from a battery, then releases all energy instantly through a xenon flash tube
                </p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🔋 Defibrillator</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Stores hundreds of joules in a capacitor, delivers controlled shock to restore heart rhythm
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🔄 Switching Power Supply</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Inductor stores energy during switch ON, releases during OFF for efficient voltage conversion
                </p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📡 RFID Tags</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Small capacitor powers the chip briefly from harvested RF energy for data transmission
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Energy vs Power</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Energy (Joules)</strong> is the capacity to do work — how much is stored. <strong>Power (Watts)</strong> 
              is the rate of energy transfer — how fast it's delivered. A capacitor can store a lot of energy but release 
              it slowly (low power) or instantly (high power).
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Safety Considerations</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Voltage Capacitors:</strong> Can retain lethal charge even after power is removed</li>
              <li><strong>Always Discharge:</strong> Use a resistor to safely discharge capacitors before handling</li>
              <li><strong>Inductor Flyback:</strong> Opening an inductive circuit creates high voltage spikes (use flyback diodes)</li>
              <li><strong>Short Circuit Danger:</strong> Large capacitors can deliver thousands of amps if shorted</li>
              <li><strong>Supercapacitors:</strong> Low voltage but extremely high energy — treat like batteries</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Choose voltage rating 2-3× operating voltage</strong> for reliability and margin</li>
              <li><strong>ESR matters:</strong> Lower equivalent series resistance means less energy loss as heat</li>
              <li><strong>Temperature effects:</strong> Capacitance drops with temperature; inductance can vary too</li>
              <li><strong>Inductor saturation:</strong> High current can saturate the core, reducing inductance</li>
              <li><strong>Parallel/series combinations:</strong> Combine to get desired energy storage and voltage rating</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { BoltIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import EnergyStorageCalculator from '~/components/EnergyStorageCalculator.vue'
import Footer from '~/components/Footer.vue'

useHead({
  title: 'Energy Storage Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate energy stored in capacitors and inductors. Understand electric and magnetic field energy storage with interactive calculators.' }
  ]
})
</script>

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
            🔀 Current Divider Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how current divides through parallel branches based on resistance values
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurrentDivider />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Current Division
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Current Divider?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a parallel circuit, the total current divides among the branches. Each branch gets a portion 
              of the total current based on its resistance relative to the other branches. This is called 
              current division, and it's the dual of voltage division in series circuits.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Principle:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2 text-center">
                Current divides <strong>inversely proportional</strong> to resistance
              </p>
              <p class="text-gray-600 dark:text-gray-400 text-center text-sm">
                Lower resistance → Higher current<br>
                Higher resistance → Lower current
              </p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Current Divider Formula:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For any branch in a parallel circuit, the current through that branch is:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              I<sub>n</sub> = I<sub>total</sub> × (R<sub>eq</sub> / R<sub>n</sub>)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>I<sub>n</sub> = Current through branch n</li>
              <li>I<sub>total</sub> = Total current from source</li>
              <li>R<sub>eq</sub> = Equivalent resistance of all parallel branches</li>
              <li>R<sub>n</sub> = Resistance of branch n</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Two-Branch Special Case:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When there are only two branches in parallel, the formula simplifies to:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              I<sub>1</sub> = I<sub>total</sub> × [R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)]<br>
              I<sub>2</sub> = I<sub>total</sub> × [R<sub>1</sub> / (R<sub>1</sub> + R<sub>2</sub>)]
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Does This Work?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a parallel circuit, all branches have the same voltage across them (the source voltage). 
              Using Ohm's Law (I = V/R), the current through each branch depends on its resistance:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Branch with lower resistance allows more current to flow</li>
              <li>Branch with higher resistance restricts current flow</li>
              <li>The sum of all branch currents equals the total current</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Current limiting:</strong> Branch resistors limit current to specific components</li>
              <li><strong>Current sensing:</strong> Measure current by sampling a fraction through a sense resistor</li>
              <li><strong>LED arrays:</strong> Balance current through multiple LED strings</li>
              <li><strong>Load sharing:</strong> Distribute power among parallel loads</li>
              <li><strong>Analog circuits:</strong> Create current ratios for amplifiers and filters</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Voltage Divider:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Voltage Divider (Series):</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• Voltage divides proportionally to resistance</li>
                <li>• Higher resistance gets more voltage</li>
                <li>• Current is same through all components</li>
              </ul>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Current Divider (Parallel):</p>
              <ul class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                <li>• Current divides inversely proportional to resistance</li>
                <li>• Lower resistance gets more current</li>
                <li>• Voltage is same across all branches</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Tips for Using Current Dividers:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Always verify that KCL (Kirchhoff's Current Law) is satisfied: ΣI<sub>in</sub> = ΣI<sub>out</sub></li>
              <li>The branch with the smallest resistance will carry the largest current</li>
              <li>If one branch has very low resistance, most current will flow through it (short circuit path)</li>
              <li>Current dividers are often used with current mirrors in integrated circuits</li>
            </ul>
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
import CurrentDivider from '~/components/CurrentDivider.vue'

// SEO
useHead({
  title: 'Current Divider Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive current divider simulator. Learn how current divides in parallel circuits and visualize current flow through multiple branches.' },
    { name: 'keywords', content: 'current divider, parallel circuit, current division, circuit simulator, electrical engineering' }
  ]
})

const colorMode = useColorMode()
</script>

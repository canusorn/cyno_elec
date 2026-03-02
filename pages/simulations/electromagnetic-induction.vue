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
            ⚡ Electromagnetic Induction Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore Faraday's Law and Lenz's Law through interactive simulations. See how changing magnetic fields induce electrical current.
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ElectromagneticInduction />
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Electromagnetic Induction
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Electromagnetic Induction?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Electromagnetic induction is the process of generating an electric current from a changing magnetic field. 
              Discovered by Michael Faraday in 1831, this phenomenon is the foundation of most modern electrical technology, 
              from power plants to wireless chargers.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Faraday's Law of Induction:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              ε = -N × (dΦ/dt)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>ε (epsilon):</strong> Induced electromotive force (EMF) in volts</li>
              <li><strong>N:</strong> Number of turns in the coil</li>
              <li><strong>Φ (phi):</strong> Magnetic flux measured in Webers (Wb)</li>
              <li><strong>dΦ/dt:</strong> Rate of change of magnetic flux</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Magnetic Flux:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              Φ = B × A × cos(θ)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>B:</strong> Magnetic field strength (Tesla)</li>
              <li><strong>A:</strong> Area of the coil (m²)</li>
              <li><strong>θ (theta):</strong> Angle between magnetic field and coil normal</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Lenz's Law:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Lenz's law states that the direction of the induced current is such that it creates a magnetic field 
              that opposes the change in magnetic flux that produced it. This is why Faraday's law has a negative sign.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              This law is a consequence of the conservation of energy - if the induced field reinforced the change 
              instead of opposing it, it would create a positive feedback loop leading to infinite energy!
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Three Experiments:</h3>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">1. Faraday's Law - Rotating Coil:</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                A coil rotates in a constant magnetic field. As it rotates, the angle θ changes, causing the magnetic flux to vary sinusoidally.
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                This generates an AC voltage: ε = N × B × A × ω × sin(ωt), where ω is the angular velocity.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">2. Lenz's Law - Opposing Field:</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                When magnetic flux through a coil changes, the induced current creates its own magnetic field that opposes the change.
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                If flux increases, the induced field opposes the external field. If flux decreases, it reinforces it.
              </p>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">3. Moving Magnet:</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                A magnet moves toward or away from a stationary coil. The relative motion causes the magnetic flux through the coil to change.
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                The faster the magnet moves, the greater the rate of change of flux, and the larger the induced EMF.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Electrical Generators:</strong> Convert mechanical energy to electrical energy using rotating coils</li>
              <li><strong>Transformers:</strong> Transfer energy between circuits through electromagnetic induction</li>
              <li><strong>Induction Cooktops:</strong> Heat metal cookware using eddy currents</li>
              <li><strong>Wireless Charging:</strong> Transfer power without physical connections</li>
              <li><strong>Magnetic Stripe Cards:</strong> Read data using induced currents</li>
              <li><strong>Guitar Pickups:</strong> Convert string vibrations to electrical signals</li>
              <li><strong>Induction Motors:</strong> Create rotation using rotating magnetic fields</li>
              <li><strong>Metal Detectors:</strong> Detect metal objects through induced eddy currents</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Concepts to Remember:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Changing flux induces EMF:</strong> Static magnetic fields don't induce voltage - the change is what matters</li>
              <li><strong>Faster change = larger EMF:</strong> The rate of change (dΦ/dt) determines the induced voltage</li>
              <li><strong>More turns = more voltage:</strong> Each turn contributes to the total EMF</li>
              <li><strong>Energy is conserved:</strong> Lenz's law ensures we can't get free energy from induction</li>
              <li><strong>Relative motion counts:</strong> Whether the magnet moves or the coil moves, the effect is the same</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Historical Context:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Michael Faraday discovered electromagnetic induction in 1831, building on earlier work by Hans Christian Ørsted. 
              This discovery revolutionized the world, making possible the generation and distribution of electrical power on a massive scale. 
              Without induction, we wouldn't have power plants, electric motors, or most modern electronics.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              At the same time, Joseph Henry independently discovered similar phenomena in America. The unit of inductance (Henry) 
              is named after him, while the unit of capacitance (Farad) is named after Faraday.
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
import ElectromagneticInduction from '~/components/ElectromagneticInduction.vue'

// SEO
useHead({
  title: 'Electromagnetic Induction Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive electromagnetic induction simulation. Explore Faraday\'s Law and Lenz\'s Law with visualizations of rotating coils, moving magnets, and induced currents.' },
    { name: 'keywords', content: 'electromagnetic induction, Faraday\'s law, Lenz\'s law, magnetic flux, induced EMF, generator simulation' }
  ]
})

const colorMode = useColorMode()
</script>

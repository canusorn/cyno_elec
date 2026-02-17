<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Circuit Simulations
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive circuit simulators with real-time visualization. Learn electrical concepts through hands-on exploration!
          </p>
        </div>
      </div>
    </section>

    <!-- Simulations Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Basic Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <circle cx="40" cy="60" r="30" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="120" y="45" width="30" height="30" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="70" y1="60" x2="120" y2="60" stroke="#94A3B8" stroke-width="3"/>
                <line x1="40" y1="90" x2="40" y2="110" stroke="#94A3B8" stroke-width="3"/>
                <line x1="135" y1="75" x2="135" y2="110" stroke="#94A3B8" stroke-width="3"/>
                <line x1="40" y1="110" x2="135" y2="110" stroke="#94A3B8" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Basic Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Simple voltage source with a single resistor. Adjust voltage and resistance to see current changes.
              </p>
              <NuxtLink 
                to="/simulations" 
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Series Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <rect x="60" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <rect x="110" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <rect x="160" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Series Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Multiple resistors in series. Learn how voltage divides across components.
              </p>
              <NuxtLink 
                to="/simulations/series-circuit" 
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Parallel Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="45" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="75" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="30" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <line x1="70" y1="20" x2="70" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="70" y1="80" x2="70" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="65" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
                <line x1="120" y1="20" x2="120" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="80" x2="120" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="115" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
                <line x1="170" y1="20" x2="170" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="170" y1="80" x2="170" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="165" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Parallel Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Multiple branches in parallel. See how current divides between paths.
              </p>
              <NuxtLink 
                to="/simulations/parallel-circuit" 
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Coming Soon: RC Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden opacity-75">
            <div class="h-48 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">🔧</div>
                <div class="text-gray-500 dark:text-gray-400 text-sm">Coming Soon</div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RC Circuit Transient
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Capacitor charging and discharging curves with time constant visualization.
              </p>
              <div class="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </div>

          <!-- Coming Soon: LED Designer -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden opacity-75">
            <div class="h-48 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">💡</div>
                <div class="text-gray-500 dark:text-gray-400 text-sm">Coming Soon</div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                LED Circuit Designer
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Design circuits with multiple LEDs in series or parallel configurations.
              </p>
              <div class="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </div>

          <!-- Coming Soon: More -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden opacity-75">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">🚧</div>
                <div class="text-gray-500 dark:text-gray-400 text-sm">More Coming Soon</div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Advanced Simulators
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                RL circuits, RLC circuits, and more advanced electrical simulations.
              </p>
              <div class="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg font-semibold cursor-not-allowed">
                Planned
              </div>
            </div>
          </div>

        </div>

        <!-- Tips Section -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            💡 How to Use These Simulators
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Adjust Parameters</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Use sliders to change voltage, resistance, and other values</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Observe Changes</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Watch real-time updates in circuit diagrams and calculations</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Add/Remove Components</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Experiment with different circuit configurations</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">4</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Learn the Theory</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Read explanations below each simulator for deeper understanding</p>
                </div>
              </div>
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
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Circuit Simulations - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive electrical circuit simulators. Explore series and parallel circuits with real-time visualization.' },
    { name: 'keywords', content: 'circuit simulator, series circuit, parallel circuit, electrical simulation' }
  ]
})
</script>

<style scoped>
.simulation-card {
  transition: all 0.3s ease;
}

.simulation-card:hover {
  transform: translateY(-4px);
}
</style>

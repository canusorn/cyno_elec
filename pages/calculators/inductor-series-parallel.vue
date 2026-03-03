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
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductor Series/Parallel Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent inductance for inductors in series and parallel combinations
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Formulas:</div>
            <div class="space-y-2">
              <div class="flex items-center gap-3 text-lg font-mono font-bold flex-wrap justify-center">
                <span class="text-primary-highlight">L_series</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">L₁</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">L₂</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div class="flex items-center gap-3 text-lg font-mono font-bold flex-wrap justify-center">
                <span class="text-primary-highlight">L_parallel</span>
                <span class="text-gray-400">=</span>
                <span class="text-gray-400">1/</span>
                <span class="text-gray-400">(</span>
                <span class="text-gray-400">1/</span>
                <span class="text-primary-highlight">L₁</span>
                <span class="text-gray-400">+</span>
                <span class="text-gray-400">1/</span>
                <span class="text-primary-highlight">L₂</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
                <span class="text-gray-400">)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Inductor Circuit Visualization
          </h3>

          <!-- SVG Circuit Diagram -->
          <div class="flex justify-center mb-6">
            <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <defs>
                <filter id="glowInductor">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <!-- Series Circuit (Top) -->
              <g v-if="configuration === 'series'">
                <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#F59E0B">Series Configuration</text>

                <!-- Main circuit loop -->
                <line x1="100" y1="60" x2="700" y2="60" stroke="#6B7280" stroke-width="3"/>
                <line x1="700" y1="60" x2="700" y2="180" stroke="#6B7280" stroke-width="3"/>
                <line x1="700" y1="180" x2="100" y2="180" stroke="#6B7280" stroke-width="3"/>
                <line x1="100" y1="180" x2="100" y2="60" stroke="#6B7280" stroke-width="3"/>

                <!-- L1 -->
                <g transform="translate(200, 60)">
                  <path d="M 0 0 L 0 -10 L 10 -5 L -10 5 L 10 15 L -10 25 L 10 35 L -10 45 L 0 50 L 0 60"
                    fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <text x="0" y="-15" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">
                    L₁ = {{ inductors[0] }}µH
                  </text>
                </g>

                <!-- L2 -->
                <g transform="translate(350, 60)">
                  <path d="M 0 0 L 0 -10 L 10 -5 L -10 5 L 10 15 L -10 25 L 10 35 L -10 45 L 0 50 L 0 60"
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <text x="0" y="-15" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">
                    L₂ = {{ inductors[1] }}µH
                  </text>
                </g>

                <!-- L3 (if present) -->
                <g v-if="numInductors >= 3" transform="translate(500, 60)">
                  <path d="M 0 0 L 0 -10 L 10 -5 L -10 5 L 10 15 L -10 25 L 10 35 L -10 45 L 0 50 L 0 60"
                    fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <text x="0" y="-15" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">
                    L₃ = {{ inductors[2] }}µH
                  </text>
                </g>

                <!-- Current indicator -->
                <g>
                  <rect x="330" y="105" width="140" height="25" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" stroke-width="2"/>
                  <text x="400" y="123" text-anchor="middle" font-size="11" font-weight="bold" fill="#D97706">
                    I (same everywhere)
                  </text>
                </g>

                <!-- Result box -->
                <g>
                  <rect x="250" y="220" width="300" height="60" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" stroke-width="2"/>
                  <text x="400" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#D97706">
                    L_total (Series) = {{ (equivalentInductance / 1000).toFixed(3) }} mH
                  </text>
                  <text x="400" y="265" text-anchor="middle" font-size="11" fill="#F59E0B">
                    {{ equivalentInductance.toFixed(2) }} µH
                  </text>
                </g>
              </g>

              <!-- Parallel Circuit (Bottom) -->
              <g v-if="configuration === 'parallel'">
                <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#8B5CF6">Parallel Configuration</text>

                <!-- Main circuit lines -->
                <line x1="100" y1="60" x2="700" y2="60" stroke="#6B7280" stroke-width="3"/>
                <line x1="100" y1="60" x2="100" y2="180" stroke="#6B7280" stroke-width="3"/>
                <line x1="700" y1="60" x2="700" y2="180" stroke="#6B7280" stroke-width="3"/>
                <line x1="100" y1="180" x2="700" y2="180" stroke="#6B7280" stroke-width="3"/>

                <!-- Branch 1 - L1 -->
                <g transform="translate(200, 60)">
                  <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <path d="M 0 15 L 0 25 L 10 30 L -10 40 L 10 50 L -10 60 L 10 70 L -10 80 L 0 85 L 0 95"
                    fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <line x1="0" y1="95" x2="0" y2="120" stroke="#6B7280" stroke-width="2"/>
                  <text x="0" y="135" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">
                    L₁ = {{ inductors[0] }}µH
                  </text>
                </g>

                <!-- Branch 2 - L2 -->
                <g transform="translate(350, 60)">
                  <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <path d="M 0 15 L 0 25 L 10 30 L -10 40 L 10 50 L -10 60 L 10 70 L -10 80 L 0 85 L 0 95"
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <line x1="0" y1="95" x2="0" y2="120" stroke="#6B7280" stroke-width="2"/>
                  <text x="0" y="135" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">
                    L₂ = {{ inductors[1] }}µH
                  </text>
                </g>

                <!-- Branch 3 - L3 (if present) -->
                <g v-if="numInductors >= 3" transform="translate(500, 60)">
                  <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <path d="M 0 15 L 0 25 L 10 30 L -10 40 L 10 50 L -10 60 L 10 70 L -10 80 L 0 85 L 0 95"
                    fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowInductor)"/>
                  <line x1="0" y1="95" x2="0" y2="120" stroke="#6B7280" stroke-width="2"/>
                  <text x="0" y="135" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                    L₃ = {{ inductors[2] }}µH
                  </text>
                </g>

                <!-- Voltage indicator -->
                <g>
                  <rect x="330" y="105" width="140" height="25" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" stroke-width="2"/>
                  <text x="400" y="123" text-anchor="middle" font-size="11" font-weight="bold" fill="#7C3AED">
                    V (same across all)
                  </text>
                </g>

                <!-- Result box -->
                <g>
                  <rect x="250" y="220" width="300" height="60" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" stroke-width="2"/>
                  <text x="400" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#7C3AED">
                    L_total (Parallel) = {{ (equivalentInductance / 1000).toFixed(3) }} mH
                  </text>
                  <text x="400" y="265" text-anchor="middle" font-size="11" fill="#8B5CF6">
                    {{ equivalentInductance.toFixed(2) }} µH
                  </text>
                </g>
              </g>

              <!-- Ground symbol -->
              <g transform="translate(400, 180)">
                <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                <line x1="-15" y1="15" x2="15" y2="15" stroke="#6B7280" stroke-width="2"/>
                <line x1="-10" y1="20" x2="10" y2="20" stroke="#6B7280" stroke-width="2"/>
                <line x1="-5" y1="25" x2="5" y2="25" stroke="#6B7280" stroke-width="2"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Controls -->
    <section class="pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎛️ Calculator Controls
          </h3>

          <!-- Configuration Selection -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Circuit Configuration
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="configuration = 'series'"
                :class="[
                  'p-4 rounded-xl font-semibold transition-all',
                  configuration === 'series'
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <div class="text-2xl mb-1">📏</div>
                <div>Series</div>
              </button>
              <button
                @click="configuration = 'parallel'"
                :class="[
                  'p-4 rounded-xl font-semibold transition-all',
                  configuration === 'parallel'
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                <div class="text-2xl mb-1">🔀</div>
                <div>Parallel</div>
              </button>
            </div>
          </div>

          <!-- Number of Inductors -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Number of Inductors: {{ numInductors }}
            </label>
            <input
              v-model.number="numInductors"
              type="range"
              min="2"
              max="6"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
            >
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>

          <!-- Inductor Values -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-for="(inductor, index) in inductors" :key="index" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Inductor L{{ index + 1 }}
              </label>
              <div class="flex items-center gap-2">
                <input
                  v-model.number="inductors[index]"
                  type="number"
                  min="1"
                  max="100000"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                <span class="text-sm text-gray-600 dark:text-gray-400">µH</span>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Results</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Equivalent Inductance</div>
                <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {{ (equivalentInductance / 1000).toFixed(3) }} mH
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ equivalentInductance.toFixed(2) }} µH
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Configuration</div>
                <div class="text-2xl font-bold capitalize" :class="configuration === 'series' ? 'text-amber-600 dark:text-amber-400' : 'text-purple-600 dark:text-purple-400'">
                  {{ configuration }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ numInductors }} inductors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Inductor Combinations
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Inductors in Series</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When inductors are connected in series, the total inductance is the sum of all individual inductances.
              This is because the magnetic flux from each inductor adds together.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              L_total = L₁ + L₂ + L₃ + ...
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Key points:</strong>
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Total inductance is always greater than the largest individual inductor</li>
              <li>Current is the same through all inductors</li>
              <li>Voltage divides across inductors proportionally to their inductance</li>
              <li>Similar to resistors in series</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Inductors in Parallel</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When inductors are connected in parallel, the reciprocal of the total inductance equals the sum of the reciprocals
              of individual inductances. The total inductance is always less than the smallest individual inductor.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              1/L_total = 1/L₁ + 1/L₂ + 1/L₃ + ...
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>For two inductors in parallel:</strong>
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              L_total = (L₁ × L₂) / (L₁ + L₂)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Key points:</strong>
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Total inductance is always less than the smallest individual inductor</li>
              <li>Voltage is the same across all inductors</li>
              <li>Current divides among inductors inversely proportional to their inductance</li>
              <li>Similar to resistors in parallel</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Mutual Inductance Consideration</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The formulas above assume inductors are placed far apart so that mutual inductance is negligible.
              If inductors are placed close together, their magnetic fields interact, causing mutual inductance (M).
            </p>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 my-4">
              <p class="text-sm text-blue-800 dark:text-blue-300 font-semibold mb-2">⚠️ Important Note:</p>
              <p class="text-sm text-blue-700 dark:text-blue-400">
                When inductors are magnetically coupled, the total inductance depends on whether fields aid or oppose each other.
                This calculator assumes no magnetic coupling between inductors.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>LC filters:</strong> Multiple inductors in combination with capacitors</li>
              <li><strong>RF circuits:</strong> Impedance matching networks</li>
              <li><strong>Power supplies:</strong> Filter chokes and smoothing inductors</li>
              <li><strong>Audio crossovers:</strong> Speaker frequency division networks</li>
              <li><strong>Motor control:</strong> Multi-winding transformers and inductors</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Keep inductors separated to minimize unwanted mutual coupling</li>
              <li>Mount inductors at right angles to reduce magnetic interaction</li>
              <li>Consider core saturation when inductors carry DC current</li>
              <li>Account for ESR (Equivalent Series Resistance) in real applications</li>
              <li>Use shielded inductors for sensitive circuits</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Calculation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-sm font-mono mb-2"><strong>Series:</strong> L₁ = 100µH, L₂ = 220µH</p>
              <p class="text-sm font-mono mb-4">L_total = 100 + 220 = 320µH</p>
              <p class="text-sm font-mono mb-2"><strong>Parallel:</strong> L₁ = 100µH, L₂ = 220µH</p>
              <p class="text-sm font-mono">L_total = (100 × 220) / (100 + 220) = 68.75µH</p>
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

// SEO
useHead({
  title: 'Inductor Series/Parallel Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate equivalent inductance for inductors in series and parallel combinations with interactive visualization.' },
    { name: 'keywords', content: 'inductor calculator, series inductance, parallel inductance, LC filter, inductor combination' }
  ]
})

const colorMode = useColorMode()

// Reactive state
const configuration = ref<'series' | 'parallel'>('series')
const numInductors = ref(2)
const inductors = ref([100, 220, 47, 100, 150, 330])

// Calculate equivalent inductance
const equivalentInductance = computed(() => {
  const activeInductors = inductors.value.slice(0, numInductors.value)

  if (configuration.value === 'series') {
    // Series: L_total = L1 + L2 + L3 + ...
    return activeInductors.reduce((sum, L) => sum + L, 0)
  } else {
    // Parallel: 1/L_total = 1/L1 + 1/L2 + 1/L3 + ...
    const reciprocalSum = activeInductors.reduce((sum, L) => sum + (1 / L), 0)
    return 1 / reciprocalSum
  }
})

// Watch numInductors to ensure array is large enough
watch(numInductors, (newVal) => {
  while (inductors.value.length < newVal) {
    inductors.value.push(100)
  }
}, { immediate: true })
</script>

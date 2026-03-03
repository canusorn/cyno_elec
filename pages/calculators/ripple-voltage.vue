<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Ripple Voltage Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate ripple voltage for power supply filtering
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-2xl font-mono">
              <span class="text-primary">V<sub>ripple</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> = </span>
              <span class="text-primary">I<sub>load</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> / </span>
              <span class="text-primary">f × C</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8">
        <!-- Rectifier Type Selection -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Rectifier Type
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="rectifierType = 'full-wave'"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                rectifierType === 'full-wave'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <svg class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Full-Wave</span>
                <div class="text-xs mt-1 opacity-75">f = 100Hz (50Hz) / 120Hz (60Hz)</div>
              </div>
            </button>
            <button
              @click="rectifierType = 'half-wave'"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                rectifierType === 'half-wave'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <svg class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
                </svg>
                <span>Half-Wave</span>
                <div class="text-xs mt-1 opacity-75">f = 50Hz / 60Hz</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Mains Frequency -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Mains Frequency
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="mainsFreq = 50"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                mainsFreq === 50
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <span class="text-2xl">50 Hz</span>
                <div class="text-xs mt-1 opacity-75">Europe, Asia, Africa</div>
              </div>
            </button>
            <button
              @click="mainsFreq = 60"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                mainsFreq === 60
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <span class="text-2xl">60 Hz</span>
                <div class="text-xs mt-1 opacity-75">North America, parts of South America</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Load Current -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Load Current: <span class="text-primary">{{ loadCurrent }}</span> A
          </label>
          <input
            v-model.number="loadCurrent"
            type="range"
            min="0.001"
            max="10"
            step="0.001"
            class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>1 mA</span>
            <span>10 A</span>
          </div>
        </div>

        <!-- Capacitance -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Filter Capacitance: <span class="text-primary">{{ formatCapacitance(capacitance) }}</span>
          </label>
          <input
            v-model.number="capacitance"
            type="range"
            min="0.000001"
            max="0.1"
            step="0.000001"
            class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>1 µF</span>
            <span>100,000 µF</span>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Quick Presets
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              @click="applyPreset('arduino')"
              class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Arduino (5V, 50mA)
            </button>
            <button
              @click="applyPreset('raspberry')"
              class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Raspberry Pi (5V, 1A)
            </button>
            <button
              @click="applyPreset('amplifier')"
              class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Audio Amp (12V, 2A)
            </button>
            <button
              @click="applyPreset('motor')"
              class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              Motor Driver (24V, 5A)
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Results</h2>
        
        <!-- Ripple Voltage -->
        <div class="bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-lg p-6 mb-6">
          <div class="text-center">
            <div class="text-gray-600 dark:text-gray-400 mb-2">Ripple Voltage (Peak-to-Peak)</div>
            <div class="text-5xl font-bold text-primary mb-2">
              {{ formatVoltage(rippleVoltage) }}
            </div>
            <div class="text-gray-600 dark:text-gray-400">
              {{ formatPercentage(ripplePercentage) }}
            </div>
          </div>
        </div>

        <!-- Additional Parameters -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="text-gray-600 dark:text-gray-400 text-sm">Ripple Frequency</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">
              {{ rectifierFrequency }} Hz
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="text-gray-600 dark:text-gray-400 text-sm">Time Between Peaks</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">
              {{ formatTime(timeBetweenPeaks) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Waveform Visualization -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Ripple Waveform</h2>
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <svg viewBox="0 0 800 300" class="w-full h-auto">
            <!-- Grid -->
            <defs>
              <pattern id="rippleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5" class="dark:stroke-gray-700"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rippleGrid)" />
            
            <!-- Axes -->
            <line x1="60" y1="150" x2="760" y2="150" stroke="#9CA3AF" stroke-width="2" />
            <line x1="60" y1="30" x2="60" y2="270" stroke="#9CA3AF" stroke-width="2" />
            
            <!-- Labels -->
            <text x="40" y="40" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-sm">Vmax</text>
            <text x="40" y="155" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-sm">Vavg</text>
            <text x="40" y="270" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-sm">Vmin</text>
            
            <!-- DC Average Line -->
            <line x1="60" y1="150" x2="760" y2="150" stroke="#10B981" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Ripple Waveform -->
            <path
              :d="generateRipplePath()"
              fill="none"
              stroke="#9333EA"
              stroke-width="3"
            />
            
            <!-- Ripple Indicators -->
            <line x1="700" y1="50" x2="700" y2="250" stroke="#EF4444" stroke-width="2" marker-end="url(#arrowhead2)" />
            <line x1="700" y1="250" x2="700" y2="50" stroke="#EF4444" stroke-width="2" marker-end="url(#arrowhead2)" />
            <text x="710" y="150" class="fill-red-500 text-sm font-bold">Vripple</text>
            
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Understanding Ripple Voltage</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold text-primary mb-3">What is Ripple Voltage?</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Ripple voltage is the AC component superimposed on the DC output of a power supply. It occurs because 
              the filter capacitor charges and discharges between peaks of the rectified AC waveform. Lower ripple 
              voltage means cleaner DC power for your circuits.
            </p>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold text-primary mb-3">Ripple Voltage Formula</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-center">
              <div class="text-lg mb-2">
                V<sub>ripple</sub> = I<sub>load</sub> / (f × C)
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Where:<br>
                I<sub>load</sub> = Load current (Amperes)<br>
                f = Ripple frequency (Hz) - 2× mains frequency for full-wave, 1× for half-wave<br>
                C = Filter capacitance (Farads)
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold text-primary mb-3">Design Tips</h3>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Full-wave rectifiers</strong> produce half the ripple of half-wave for the same capacitor</li>
              <li><strong> Larger capacitors</strong> reduce ripple but increase size and cost</li>
              <li><strong>Add a voltage regulator</strong> (like 7805 or LM317) for ultra-low ripple</li>
              <li><strong>Consider ESR</strong> - capacitors have equivalent series resistance that affects performance</li>
              <li><strong>Low-ESR capacitors</strong> are better for switching power supplies</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold text-primary mb-3">Typical Ripple Requirements</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Application</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Max Ripple</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Digital Logic (5V)</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">&lt; 100mV</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Audio Amplifiers</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">&lt; 10mV</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">RF Circuits</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">&lt; 1mV</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Motor Control</td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">&lt; 500mV</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-800 py-8">
      <div class="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2026 Cyno Electric - Teaching Electricity Through Interactive Tools</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input parameters
const rectifierType = ref('full-wave')
const mainsFreq = ref(50)
const loadCurrent = ref(0.05) // 50mA default
const capacitance = ref(0.00047) // 470µF default

// Computed values
const rectifierFrequency = computed(() => {
  return rectifierType.value === 'full-wave' ? mainsFreq.value * 2 : mainsFreq.value
})

const rippleVoltage = computed(() => {
  // Vripple = Iload / (f * C)
  return loadCurrent.value / (rectifierFrequency.value * capacitance.value)
})

const ripplePercentage = computed(() => {
  // Assuming typical DC output voltage
  const typicalDC = rectifierType.value === 'full-wave' ? 12 : 6
  return (rippleVoltage.value / typicalDC) * 100
})

const timeBetweenPeaks = computed(() => {
  return 1 / rectifierFrequency.value
})

// Formatting functions
const formatVoltage = (v) => {
  if (v < 0.001) return `${(v * 1000000).toFixed(2)} µV`
  if (v < 1) return `${(v * 1000).toFixed(2)} mV`
  return `${v.toFixed(3)} V`
}

const formatPercentage = (p) => {
  return p < 1 ? `${p.toFixed(3)}%` : `${p.toFixed(2)}%`
}

const formatCapacitance = (c) => {
  if (c < 0.000001) return `${(c * 1000000000).toFixed(0)} nF`
  if (c < 0.001) return `${(c * 1000000).toFixed(0)} µF`
  return `${(c * 1000).toFixed(2)} mF`
}

const formatTime = (t) => {
  if (t < 0.001) return `${(t * 1000000).toFixed(1)} µs`
  if (t < 1) return `${(t * 1000).toFixed(2)} ms`
  return `${t.toFixed(3)} s`
}

// Preset configurations
const applyPreset = (preset) => {
  switch (preset) {
    case 'arduino':
      loadCurrent.value = 0.05 // 50mA
      capacitance.value = 0.0001 // 100µF
      mainsFreq.value = 50
      rectifierType.value = 'full-wave'
      break
    case 'raspberry':
      loadCurrent.value = 1 // 1A
      capacitance.value = 0.0022 // 2200µF
      mainsFreq.value = 50
      rectifierType.value = 'full-wave'
      break
    case 'amplifier':
      loadCurrent.value = 2 // 2A
      capacitance.value = 0.01 // 10,000µF
      mainsFreq.value = 50
      rectifierType.value = 'full-wave'
      break
    case 'motor':
      loadCurrent.value = 5 // 5A
      capacitance.value = 0.022 // 22,000µF
      mainsFreq.value = 50
      rectifierType.value = 'full-wave'
      break
  }
}

// Generate ripple waveform SVG path
const generateRipplePath = () => {
  const points = []
  const cycles = 3
  const pointsPerCycle = 50
  const width = 700
  const height = 200
  const baseY = 150
  const amplitude = 80
  
  for (let i = 0; i <= cycles * pointsPerCycle; i++) {
    const x = 60 + (i / (cycles * pointsPerCycle)) * width
    const cyclePos = (i % pointsPerCycle) / pointsPerCycle
    
    // Sawtooth-like discharge curve
    let y
    if (cyclePos < 0.1) {
      // Charging phase
      y = baseY - amplitude * 0.9 + amplitude * 0.9 * (cyclePos / 0.1)
    } else {
      // Discharging phase (exponential decay approximated)
      const dischargePos = (cyclePos - 0.1) / 0.9
      y = baseY - amplitude * 0.9 * (1 - dischargePos * 0.8)
    }
    
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  
  return points.join(' ')
}

// Watch for changes to update URL hash (optional)
watch([rectifierType, mainsFreq, loadCurrent, capacitance], () => {
  // Could update URL hash here for bookmarkable configurations
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}

.bg-primary\/10 {
  background-color: color-mix(in srgb, var(--tw-color-primary) 10%, transparent);
}

.bg-primary\/20 {
  background-color: color-mix(in srgb, var(--tw-color-primary) 20%, transparent);
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.border-primary\/50 {
  border-color: color-mix(in srgb, var(--tw-color-primary) 50%, transparent);
}

.hover\:bg-primary\/20:hover {
  background-color: color-mix(in srgb, var(--tw-color-primary) 20%, transparent);
}

.hover\:border-primary\/50:hover {
  border-color: color-mix(in srgb, var(--tw-color-primary) 50%, transparent);
}

input[type="range"] {
  accent-color: var(--tw-color-primary);
}
</style>

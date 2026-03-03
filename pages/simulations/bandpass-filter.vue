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
            <ChartBarIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RLC Bandpass Filter
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore frequency response and resonance in RLC bandpass filter circuits
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">f₀</span> = 1/(2π√LC) &nbsp;|&nbsp; 
              <span class="text-primary-highlight">BW</span> = R/L &nbsp;|&nbsp; 
              <span class="text-primary-highlight">Q</span> = f₀/BW
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Center Frequency, Bandwidth, and Q Factor</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          
          <!-- Controls Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            <!-- Resistance Control -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-lg font-semibold text-gray-900 dark:text-white">
                  Resistance (R)
                </label>
                <span class="text-2xl font-bold text-primary-highlight">{{ resistance }} Ω</span>
              </div>
              <input
                v-model.number="resistance"
                type="range"
                min="10"
                max="1000"
                step="10"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>10 Ω</span>
                <span>1000 Ω</span>
              </div>
            </div>

            <!-- Inductance Control -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-lg font-semibold text-gray-900 dark:text-white">
                  Inductance (L)
                </label>
                <span class="text-2xl font-bold text-primary-highlight">{{ inductance }} mH</span>
              </div>
              <input
                v-model.number="inductance"
                type="range"
                min="1"
                max="100"
                step="1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>1 mH</span>
                <span>100 mH</span>
              </div>
            </div>

            <!-- Capacitance Control -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-lg font-semibold text-gray-900 dark:text-white">
                  Capacitance (C)
                </label>
                <span class="text-2xl font-bold text-primary-highlight">{{ capacitance }} μF</span>
              </div>
              <input
                v-model.number="capacitance"
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>0.1 μF</span>
                <span>10 μF</span>
              </div>
            </div>
          </div>

          <!-- Calculated Parameters -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Center Frequency</div>
              <div class="text-2xl font-bold text-primary-highlight">{{ centerFrequency.toFixed(2) }} Hz</div>
            </div>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Bandwidth</div>
              <div class="text-2xl font-bold text-primary-highlight">{{ bandwidth.toFixed(2) }} Hz</div>
            </div>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Q Factor</div>
              <div class="text-2xl font-bold text-primary-highlight">{{ qFactor.toFixed(2) }}</div>
            </div>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak Gain</div>
              <div class="text-2xl font-bold text-primary-highlight">{{ (peakGain * 100).toFixed(1) }}%</div>
            </div>
          </div>

          <!-- Frequency Response Chart -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequency Response (Bode Plot)</h3>
            <svg viewBox="0 0 800 400" class="w-full h-auto">
              <!-- Background Grid -->
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5" class="dark:stroke-gray-700"/>
                </pattern>
              </defs>
              <rect width="800" height="400" fill="url(#grid)" />
              
              <!-- Axes -->
              <line x1="60" y1="350" x2="780" y2="350" stroke="#374151" stroke-width="2" />
              <line x1="60" y1="350" x2="60" y2="30" stroke="#374151" stroke-width="2" />
              
              <!-- Frequency Labels -->
              <text x="60" y="375" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-xs">0 Hz</text>
              <text x="235" y="375" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-xs">{{ (centerFrequency * 0.5).toFixed(0) }} Hz</text>
              <text x="420" y="375" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-xs">{{ centerFrequency.toFixed(0) }} Hz</text>
              <text x="605" y="375" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-xs">{{ (centerFrequency * 2).toFixed(0) }} Hz</text>
              <text x="780" y="375" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-xs">{{ (centerFrequency * 3).toFixed(0) }} Hz</text>
              
              <!-- Gain Labels -->
              <text x="50" y="350" text-anchor="end" class="fill-gray-600 dark:fill-gray-400 text-xs">0%</text>
              <text x="50" y="270" text-anchor="end" class="fill-gray-600 dark:fill-gray-400 text-xs">25%</text>
              <text x="50" y="190" text-anchor="end" class="fill-gray-600 dark:fill-gray-400 text-xs">50%</text>
              <text x="50" y="110" text-anchor="end" class="fill-gray-600 dark:fill-gray-400 text-xs">75%</text>
              <text x="50" y="30" text-anchor="end" class="fill-gray-600 dark:fill-gray-400 text-xs">100%</text>
              
              <!-- Passband Highlight -->
              <rect
                :x="60 + (centerFrequency - bandwidth/2) * (720 / (centerFrequency * 3))"
                y="30"
                :width="bandwidth * (720 / (centerFrequency * 3))"
                height="320"
                fill="rgba(147, 51, 234, 0.1)"
              />
              
              <!-- Center Frequency Line -->
              <line
                :x1="60 + centerFrequency * (720 / (centerFrequency * 3))"
                y1="30"
                :x2="60 + centerFrequency * (720 / (centerFrequency * 3))"
                y2="350"
                stroke="#9333ea"
                stroke-width="1"
                stroke-dasharray="5,5"
              />
              
              <!-- Frequency Response Curve -->
              <path
                :d="frequencyResponsePath"
                fill="none"
                stroke="#9333ea"
                stroke-width="3"
              />
              
              <!-- -3dB Points -->
              <circle
                v-for="point in cutoffPoints"
                :key="point.x"
                :cx="point.x"
                :cy="point.y"
                r="5"
                fill="#ef4444"
              />
              
              <!-- Axis Labels -->
              <text x="420" y="395" text-anchor="middle" class="fill-gray-900 dark:fill-white text-sm font-semibold">Frequency (Hz)</text>
              <text x="20" y="190" text-anchor="middle" transform="rotate(-90, 20, 190)" class="fill-gray-900 dark:fill-white text-sm font-semibold">Gain (%)</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Diagram -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Diagram</h2>
          <svg viewBox="0 0 600 300" class="w-full h-auto">
            <!-- Input -->
            <text x="30" y="155" class="fill-gray-900 dark:fill-white text-lg font-semibold">Vin</text>
            
            <!-- Resistor -->
            <rect x="80" y="140" width="100" height="30" fill="none" stroke="#374151" stroke-width="2" />
            <path d="M80 140 L90 130 L110 170 L130 130 L150 170 L170 130 L180 140" fill="none" stroke="#374151" stroke-width="2" />
            <text x="130" y="125" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-sm">R = {{ resistance }}Ω</text>
            
            <!-- Inductor -->
            <path d="M200 155 L220 155 M240 155 L260 155 M280 155 L300 155 M320 155 L340 155" fill="none" stroke="#374151" stroke-width="2" />
            <path d="M220 155 Q230 135 240 155 Q250 175 260 155 Q270 135 280 155 Q290 175 300 155 Q310 135 320 155" fill="none" stroke="#374151" stroke-width="2" />
            <text x="280" y="125" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-sm">L = {{ inductance }}mH</text>
            
            <!-- Capacitor -->
            <line x1="360" y1="135" x2="360" y2="175" stroke="#374151" stroke-width="2" />
            <line x1="370" y1="135" x2="370" y2="175" stroke="#374151" stroke-width="2" />
            <line x1="340" y1="155" x2="360" y2="155" stroke="#374151" stroke-width="2" />
            <line x1="370" y1="155" x2="390" y2="155" stroke="#374151" stroke-width="2" />
            <text x="365" y="125" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-sm">C = {{ capacitance }}μF</text>
            
            <!-- Output -->
            <text x="550" y="155" class="fill-gray-900 dark:fill-white text-lg font-semibold">Vout</text>
            
            <!-- Ground -->
            <line x1="300" y1="200" x2="300" y2="250" stroke="#374151" stroke-width="2" />
            <line x1="280" y1="250" x2="320" y2="250" stroke="#374151" stroke-width="2" />
            <line x1="290" y1="260" x2="310" y2="260" stroke="#374151" stroke-width="2" />
            <line x1="295" y1="270" x2="305" y2="270" stroke="#374151" stroke-width="2" />
            
            <!-- Connection lines -->
            <line x1="180" y1="155" x2="200" y2="155" stroke="#374151" stroke-width="2" />
            <line x1="340" y1="155" x2="390" y2="155" stroke="#374151" stroke-width="2" />
            <line x1="390" y1="155" x2="550" y2="155" stroke="#374151" stroke-width="2" />
            <line x1="80" y1="155" x2="30" y2="155" stroke="#374151" stroke-width="2" />
            <line x1="300" y1="200" x2="300" y2="175" stroke="#374151" stroke-width="2" />
            <line x1="365" y1="175" x2="365" y2="200" stroke="#374151" stroke-width="2" />
            <line x1="130" y1="170" x2="130" y2="200" stroke="#374151" stroke-width="2" />
            <line x1="130" y1="200" x2="300" y2="200" stroke="#374151" stroke-width="2" />
            <line x1="365" y1="200" x2="300" y2="200" stroke="#374151" stroke-width="2" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding RLC Bandpass Filters
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Bandpass Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A bandpass filter allows signals within a specific frequency range (the "passband") to pass through 
              while attenuating signals outside this range. It's essentially a combination of a high-pass filter 
              and a low-pass filter that work together to create a "band" of frequencies that can pass.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series RLC Bandpass Filter:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Configuration:</strong> Resistor, inductor, and capacitor connected in series</li>
              <li><strong>Output:</strong> Taken across the resistor</li>
              <li><strong>Center Frequency (f₀):</strong> The frequency where the filter has maximum output</li>
              <li><strong>Bandwidth (BW):</strong> The range of frequencies between -3dB points</li>
              <li><strong>Q Factor:</strong> Quality factor - ratio of center frequency to bandwidth (selectivity)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="font-mono text-sm space-y-2">
                <div><strong>Center Frequency:</strong> f₀ = 1/(2π√LC)</div>
                <div><strong>Bandwidth:</strong> BW = R/L</div>
                <div><strong>Q Factor:</strong> Q = f₀/BW = (1/R)√(L/C)</div>
                <div><strong>Cutoff Frequencies:</strong> f₁,₂ = f₀√(1 + 1/(4Q²)) ∓ 1/(2Q)</div>
                <div><strong>Impedance at f₀:</strong> Z = R (minimum)</div>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Radio Receivers:</strong> Select specific radio stations from the radio spectrum</li>
              <li><strong>Audio Systems:</strong> Equalizers and tone controls isolate frequency bands</li>
              <li><strong>Communications:</strong> Filter out noise and interference in transmission systems</li>
              <li><strong>Instrumentation:</strong> Isolate signals of interest in measurement equipment</li>
              <li><strong>Biomedical:</strong> Extract specific biological signals (like ECG or EEG)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Understanding the Parameters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Higher Resistance (R):</strong> Increases bandwidth, lowers Q (less selective, wider passband)</li>
              <li><strong>Higher Inductance (L):</strong> Lowers center frequency, narrows bandwidth</li>
              <li><strong>Higher Capacitance (C):</strong> Lowers center frequency, affects Q factor</li>
              <li><strong>Q > 10:</strong> Narrow bandpass filter (highly selective)</li>
              <li><strong>Q < 1:</strong> Wide bandpass filter (broad passband)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Filter Characteristics:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The -3dB points (cutoff frequencies) mark the edges of the passband where the output power is 
              half the maximum power. A higher Q factor means a narrower bandwidth and more selective filtering. 
              The center frequency is where the inductive and capacitive reactances cancel each other out, 
              leaving only the resistance to limit the current.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Experiment with the Simulation:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Adjust R, L, and C to see how the frequency response changes</li>
              <li>Notice how higher resistance creates a wider, flatter passband</li>
              <li>Try to achieve a Q factor of 10 (narrow bandpass) or 1 (wide bandpass)</li>
              <li>Observe how the -3dB points (red dots) define the bandwidth</li>
              <li>The shaded purple region shows the passband where signals are allowed through</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'

useHead({
  title: 'RLC Bandpass Filter Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive RLC bandpass filter simulation with frequency response visualization, center frequency, bandwidth, and Q factor calculations.' }
  ]
})

const colorMode = useColorMode()

// Component parameters
const resistance = ref(100)
const inductance = ref(10)  // mH
const capacitance = ref(1)  // μF

// Calculated parameters
const centerFrequency = computed(() => {
  const L = inductance.value * 1e-3  // Convert to H
  const C = capacitance.value * 1e-6  // Convert to F
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

const bandwidth = computed(() => {
  const L = inductance.value * 1e-3  // Convert to H
  return resistance.value / L
})

const qFactor = computed(() => {
  return centerFrequency.value / bandwidth.value
})

const peakGain = computed(() => {
  // At resonance, impedance is minimum (just R), so current is maximum
  // For series RLC with output across R, gain at resonance is 1
  return 1.0
})

// Frequency response curve
const frequencyResponsePath = computed(() => {
  const points = []
  const maxFreq = centerFrequency.value * 3
  
  for (let i = 0; i <= 100; i++) {
    const freq = (i / 100) * maxFreq
    const L = inductance.value * 1e-3  // H
    const C = capacitance.value * 1e-6  // F
    const R = resistance.value  // Ω
    
    // Calculate impedance
    const XL = 2 * Math.PI * freq * L
    const XC = 1 / (2 * Math.PI * freq * C)
    const Z = Math.sqrt(R * R + (XL - XC) * (XL - XC))
    
    // Current magnitude (relative)
    const I = R / Z
    
    // Output voltage across R
    const Vout = I
    
    // Convert to coordinates
    const x = 60 + (freq / maxFreq) * 720
    const y = 350 - Vout * 320
    
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

// -3dB cutoff points
const cutoffPoints = computed(() => {
  const points = []
  const maxFreq = centerFrequency.value * 3
  const gainThreshold = peakGain.value / Math.sqrt(2)  // -3dB point
  
  // Find lower cutoff frequency
  for (let i = 0; i <= 50; i++) {
    const freq = (i / 100) * maxFreq
    const L = inductance.value * 1e-3
    const C = capacitance.value * 1e-6
    const R = resistance.value
    
    const XL = 2 * Math.PI * freq * L
    const XC = 1 / (2 * Math.PI * freq * C)
    const Z = Math.sqrt(R * R + (XL - XC) * (XL - XC))
    const gain = R / Z
    
    if (gain >= gainThreshold) {
      points.push({
        x: 60 + (freq / maxFreq) * 720,
        y: 350 - gain * 320
      })
      break
    }
  }
  
  // Find upper cutoff frequency
  for (let i = 50; i <= 100; i++) {
    const freq = (i / 100) * maxFreq
    const L = inductance.value * 1e-3
    const C = capacitance.value * 1e-6
    const R = resistance.value
    
    const XL = 2 * Math.PI * freq * L
    const XC = 1 / (2 * Math.PI * freq * C)
    const Z = Math.sqrt(R * R + (XL - XC) * (XL - XC))
    const gain = R / Z
    
    if (gain <= gainThreshold) {
      points.push({
        x: 60 + (freq / maxFreq) * 720,
        y: 350 - gain * 320
      })
      break
    }
  }
  
  return points
})
</script>

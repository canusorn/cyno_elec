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
            Thermal Noise Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate Johnson-Nyquist noise in resistors for low-noise circuit design
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Vₙ</span> = √(<span class="text-primary-highlight">4kTRB</span>)
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Johnson-Nyquist Noise Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Input Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🔧 Input Parameters
            </h2>
            
            <!-- Resistance -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Resistance (R): {{ resistance }} Ω
              </label>
              <input
                v-model.number="resistance"
                type="range"
                min="1"
                max="10000000"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 Ω</span>
                <span>10 MΩ</span>
              </div>
              <div class="mt-2 flex gap-2">
                <button @click="resistance = 50" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">50 Ω</button>
                <button @click="resistance = 1000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">1 kΩ</button>
                <button @click="resistance = 10000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">10 kΩ</button>
                <button @click="resistance = 100000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">100 kΩ</button>
                <button @click="resistance = 1000000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">1 MΩ</button>
              </div>
            </div>

            <!-- Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Temperature (T): {{ temperature }} K ({{ (temperature - 273.15).toFixed(1) }}°C)
              </label>
              <input
                v-model.number="temperature"
                type="range"
                min="0"
                max="500"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>0 K (-273°C)</span>
                <span>500 K (227°C)</span>
              </div>
              <div class="mt-2 flex gap-2">
                <button @click="temperature = 77" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">77 K (LN₂)</button>
                <button @click="temperature = 290" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">290 K</button>
                <button @click="temperature = 300" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">300 K</button>
                <button @click="temperature = 350" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">350 K</button>
                <button @click="temperature = 400" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">400 K</button>
              </div>
            </div>

            <!-- Bandwidth -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Bandwidth (B): {{ formatBandwidth(bandwidth) }}
              </label>
              <input
                v-model.number="bandwidth"
                type="range"
                min="1"
                max="1000000000"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 Hz</span>
                <span>1 GHz</span>
              </div>
              <div class="mt-2 flex gap-2 flex-wrap">
                <button @click="bandwidth = 20" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">20 Hz (Audio)</button>
                <button @click="bandwidth = 20000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">20 kHz</button>
                <button @click="bandwidth = 1000000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">1 MHz (RF)</button>
                <button @click="bandwidth = 10000000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">10 MHz</button>
                <button @click="bandwidth = 100000000" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">100 MHz</button>
              </div>
            </div>

            <!-- Number of Resistors -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of Resistors (N): {{ numResistors }}
              </label>
              <input
                v-model.number="numResistors"
                type="range"
                min="1"
                max="10"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                For parallel/series resistors, noise adds as √N (uncorrelated)
              </p>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="space-y-6">
            
            <!-- Main Result -->
            <div class="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white">
              <h3 class="text-lg font-semibold mb-4 opacity-90">Thermal Noise Voltage</h3>
              <div class="text-5xl font-bold mb-2">
                {{ formatNoise(noiseVoltage) }}
              </div>
              <p class="text-sm opacity-80">RMS noise voltage</p>
              
              <div class="mt-6 pt-6 border-t border-white/20">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="opacity-80">Noise Power</p>
                    <p class="text-xl font-semibold">{{ formatPower(noisePower) }}</p>
                  </div>
                  <div>
                    <p class="opacity-80">Noise Current</p>
                    <p class="text-xl font-semibold">{{ formatNoiseCurrent(noiseCurrent) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Noise Details -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                📊 Noise Analysis
              </h3>
              
              <div class="space-y-4">
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Noise Density</span>
                  <span class="font-mono font-bold text-primary-highlight">{{ formatNoiseDensity(noiseDensity) }}</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Noise per √Hz</span>
                  <span class="font-mono font-bold text-primary-highlight">{{ formatNoiseDensity(noiseVoltage / Math.sqrt(bandwidth)) }}/√Hz</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Peak-to-Peak (6.6×)</span>
                  <span class="font-mono font-bold text-primary-highlight">{{ formatNoise(noiseVoltage * 6.6) }}</span>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span class="text-gray-700 dark:text-gray-300">Signal Level for 80dB SNR</span>
                  <span class="font-mono font-bold text-primary-highlight">{{ formatNoise(noiseVoltage * 10000) }}</span>
                </div>
              </div>
            </div>

            <!-- Noise Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📈 Noise vs Resistance
              </h3>
              <canvas ref="noiseChart" class="w-full h-48"></canvas>
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
            📚 Understanding Thermal Noise
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Thermal Noise?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Thermal noise (also called Johnson-Nyquist noise) is the electronic noise generated by the thermal agitation 
              of charge carriers (electrons) in an electrical conductor at equilibrium. This noise is present in all resistors 
              and conducting materials, regardless of their quality or construction.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>White noise:</strong> Equal power per unit frequency across the spectrum</li>
              <li><strong>Gaussian:</strong> Amplitude follows a normal distribution</li>
              <li><strong>Temperature dependent:</strong> Increases with √T (higher temperature → more agitation)</li>
              <li><strong>Resistance dependent:</strong> Increases with √R</li>
              <li><strong>Bandwidth dependent:</strong> Increases with √B</li>
              <li><strong>Fundamental limit:</strong> Cannot be eliminated, only minimized</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Johnson-Nyquist Formula:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Vₙ = √(4kTRB)
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where:<br>
              • Vₙ = RMS noise voltage (V)<br>
              • k = Boltzmann constant (1.380649×10⁻²³ J/K)<br>
              • T = Absolute temperature (K)<br>
              • R = Resistance (Ω)<br>
              • B = Bandwidth (Hz)
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Noise Density:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Vₙ/√Hz = √(4kTR) ≈ 0.13√R nV/√Hz at 300K
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Noise density is independent of bandwidth and represents the noise per square root Hz. 
              This is useful for comparing noise performance across different bandwidths.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Examples:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Resistance</th>
                    <th class="text-left py-2">Noise Density @ 300K</th>
                    <th class="text-left py-2">20 kHz Bandwidth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">50 Ω</td>
                    <td class="py-2">0.91 nV/√Hz</td>
                    <td class="py-2">129 nV</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">1 kΩ</td>
                    <td class="py-2">4.07 nV/√Hz</td>
                    <td class="py-2">575 nV</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">10 kΩ</td>
                    <td class="py-2">12.9 nV/√Hz</td>
                    <td class="py-2">1.82 μV</td>
                  </tr>
                  <tr>
                    <td class="py-2">100 kΩ</td>
                    <td class="py-2">40.7 nV/√Hz</td>
                    <td class="py-2">5.75 μV</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Noise in Multiple Resistors:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Series resistors:</strong> Noise adds as √(R₁ + R₂ + ...)</li>
              <li><strong>Parallel resistors:</strong> Noise adds as √(R₁‖R₂)</li>
              <li><strong>Uncorrelated noise:</strong> Powers add, voltages add in quadrature</li>
              <li><strong>N equal resistors:</strong> Noise increases by √N</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Minimizing Thermal Noise:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Reduce resistance:</strong> Use lower value resistors where possible</li>
              <li><strong>Limit bandwidth:</strong> Filter to only required frequency range</li>
              <li><strong>Cool the circuit:</strong> Lower temperature reduces noise (cryogenic for extreme cases)</li>
              <li><strong>Use low-noise materials:</strong> Metal film vs carbon composition</li>
              <li><strong>Parallel resistors:</strong> Can reduce equivalent resistance and noise</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Low-noise amplifiers:</strong> Critical for front-end design</li>
              <li><strong>RF receivers:</strong> Sensitivity limited by thermal noise</li>
              <li><strong>Instrumentation:</strong> Affects measurement accuracy</li>
              <li><strong>Audio preamps:</strong> Determines hiss and noise floor</li>
              <li><strong>Sensor interfaces:</strong> Limiting factor in weak signal detection</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Noise Figure & SNR:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Noise Figure (NF)</strong> quantifies how much a device degrades the SNR. It's the ratio of input SNR to output SNR, 
              expressed in dB. An ideal noiseless device has NF = 0 dB.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Signal-to-Noise Ratio (SNR)</strong> compares signal power to noise power. For an 80 dB SNR, 
              the signal must be 10,000× larger than the noise power (100× voltage ratio).
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Historical Context:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Discovered by John B. Johnson at Bell Labs in 1928 and theoretically explained by Harry Nyquist the same year. 
              This discovery confirmed the thermodynamic nature of electrical noise and established fundamental limits in 
              electronic communication and measurement.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Thermal Noise Calculator - Cyno Electric</p>
        <p class="text-sm mt-2">Understanding the fundamental limits of electronic noise</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useColorMode } from '#app'

const colorMode = useColorMode()

// Constants
const BOLTZMANN = 1.380649e-23  // J/K

// Input parameters
const resistance = ref(1000)  // Ohms
const temperature = ref(300)  // Kelvin
const bandwidth = ref(20000)  // Hz
const numResistors = ref(1)   // Number of resistors

// Chart canvas reference
const noiseChart = ref<HTMLCanvasElement | null>(null)

// Calculated values
const noiseVoltage = computed(() => {
  const rTotal = resistance.value * numResistors.value
  return Math.sqrt(4 * BOLTZMANN * temperature.value * rTotal * bandwidth.value)
})

const noisePower = computed(() => {
  return (noiseVoltage.value ** 2) / resistance.value
})

const noiseCurrent = computed(() => {
  return noiseVoltage.value / resistance.value
})

const noiseDensity = computed(() => {
  const rTotal = resistance.value * numResistors.value
  return Math.sqrt(4 * BOLTZMANN * temperature.value * rTotal)
})

// Format functions
function formatNoise(volts: number): string {
  if (volts < 1e-9) return (volts * 1e12).toFixed(3) + ' pV'
  if (volts < 1e-6) return (volts * 1e9).toFixed(3) + ' nV'
  if (volts < 1e-3) return (volts * 1e6).toFixed(3) + ' μV'
  if (volts < 1) return (volts * 1e3).toFixed(3) + ' mV'
  return volts.toFixed(3) + ' V'
}

function formatPower(watts: number): string {
  if (watts < 1e-12) return (watts * 1e15).toFixed(3) + ' fW'
  if (watts < 1e-9) return (watts * 1e12).toFixed(3) + ' pW'
  if (watts < 1e-6) return (watts * 1e9).toFixed(3) + ' nW'
  if (watts < 1e-3) return (watts * 1e6).toFixed(3) + ' μW'
  if (watts < 1) return (watts * 1e3).toFixed(3) + ' mW'
  return watts.toFixed(3) + ' W'
}

function formatNoiseCurrent(amps: number): string {
  if (amps < 1e-12) return (amps * 1e15).toFixed(3) + ' fA'
  if (amps < 1e-9) return (amps * 1e12).toFixed(3) + ' pA'
  if (amps < 1e-6) return (amps * 1e9).toFixed(3) + ' nA'
  if (amps < 1e-3) return (amps * 1e6).toFixed(3) + ' μA'
  if (amps < 1) return (amps * 1e3).toFixed(3) + ' mA'
  return amps.toFixed(3) + ' A'
}

function formatNoiseDensity(volts: number): string {
  if (volts < 1e-9) return (volts * 1e12).toFixed(2) + ' nV/√Hz'
  if (volts < 1e-6) return (volts * 1e9).toFixed(2) + ' nV/√Hz'
  return (volts * 1e6).toFixed(2) + ' μV/√Hz'
}

function formatBandwidth(hz: number): string {
  if (hz < 1000) return hz + ' Hz'
  if (hz < 1000000) return (hz / 1000).toFixed(1) + ' kHz'
  if (hz < 1000000000) return (hz / 1000000).toFixed(1) + ' MHz'
  return (hz / 1000000000).toFixed(2) + ' GHz'
}

// Draw noise chart
function drawNoiseChart() {
  if (!noiseChart.value) return
  
  const canvas = noiseChart.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // Set canvas size
  canvas.width = canvas.offsetWidth * 2
  canvas.height = canvas.offsetHeight * 2
  ctx.scale(2, 2)
  
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  const padding = 40
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Background
  ctx.fillStyle = colorMode.value === 'dark' ? '#1f2937' : '#f9fafb'
  ctx.fillRect(0, 0, width, height)
  
  // Draw noise vs resistance curve
  ctx.beginPath()
  ctx.strokeStyle = colorMode.value === 'dark' ? '#818cf8' : '#6366f1'
  ctx.lineWidth = 2
  
  const rBase = resistance.value
  const points: [number, number][] = []
  
  for (let i = 0; i <= width - 2 * padding; i++) {
    const rLog = (i / (width - 2 * padding)) * 7  // 0 to 7 (1 to 10M)
    const r = Math.pow(10, rLog)
    const noise = Math.sqrt(4 * BOLTZMANN * temperature.value * r * bandwidth.value)
    
    // Normalize noise for display
    const maxNoise = Math.sqrt(4 * BOLTZMANN * temperature.value * 1e7 * bandwidth.value)
    const normalized = noise / maxNoise
    
    const x = padding + i
    const y = height - padding - normalized * (height - 2 * padding)
    points.push([x, y])
  }
  
  ctx.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1])
  }
  ctx.stroke()
  
  // Mark current resistance
  const currentRLog = Math.log10(rBase)
  const currentX = padding + (currentRLog / 7) * (width - 2 * padding)
  const currentNoise = noiseVoltage.value
  const maxNoise = Math.sqrt(4 * BOLTZMANN * temperature.value * 1e7 * bandwidth.value)
  const currentY = height - padding - (currentNoise / maxNoise) * (height - 2 * padding)
  
  ctx.beginPath()
  ctx.fillStyle = colorMode.value === 'dark' ? '#f472b6' : '#ec4899'
  ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI)
  ctx.fill()
  
  // Labels
  ctx.fillStyle = colorMode.value === 'dark' ? '#9ca3af' : '#6b7280'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  
  // X axis labels
  ctx.fillText('1 Ω', padding, height - 10)
  ctx.fillText('10 kΩ', padding + (width - 2 * padding) * 4 / 7, height - 10)
  ctx.fillText('1 MΩ', width - padding, height - 10)
  
  // Y axis labels
  ctx.textAlign = 'right'
  ctx.fillText('0', padding - 5, height - padding)
  ctx.fillText('Max', padding - 5, padding + 10)
  
  // Current value label
  ctx.textAlign = 'left'
  ctx.fillStyle = colorMode.value === 'dark' ? '#f472b6' : '#ec4899'
  ctx.fillText(`${rBase >= 1000 ? (rBase/1000).toFixed(0) + 'kΩ' : rBase + 'Ω'}: ${formatNoise(currentNoise)}`, currentX + 10, currentY)
}

// Watch for changes and redraw chart
watch([resistance, temperature, bandwidth, colorMode], () => {
  drawNoiseChart()
})

onMounted(() => {
  drawNoiseChart()
  window.addEventListener('resize', drawNoiseChart)
})

// SEO
useHead({
  title: 'Thermal Noise Calculator - Johnson-Nyquist Noise Calculator',
  meta: [
    { name: 'description', content: 'Calculate thermal (Johnson-Nyquist) noise in resistors. Essential tool for low-noise circuit design, RF engineering, and instrumentation.' }
  ]
})
</script>

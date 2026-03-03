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
            — Op-Amp Differentiator Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how an operational amplifier differentiator circuit computes the derivative of input signals
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Controls -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
                ⚙️ Circuit Controls
              </h2>

              <!-- Input Signal Type -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Input Signal Type
                </label>
                <select
                  v-model="signalType"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="sine">Sine Wave</option>
                  <option value="triangle">Triangle Wave</option>
                  <option value="square">Square Wave</option>
                  <option value="sawtooth">Sawtooth Wave</option>
                </select>
              </div>

              <!-- Input Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Input Frequency: {{ frequency }} Hz
                </label>
                <input
                  v-model.number="frequency"
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 Hz</span>
                  <span>10 Hz</span>
                  <span>20 Hz</span>
                </div>
              </div>

              <!-- Input Amplitude -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Input Amplitude: {{ amplitude }} V
                </label>
                <input
                  v-model.number="amplitude"
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.5 V</span>
                  <span>2.5 V</span>
                  <span>5 V</span>
                </div>
              </div>

              <!-- Feedback Resistor -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Feedback Resistor (Rf): {{ rf }} kΩ
                </label>
                <input
                  v-model.number="rf"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 kΩ</span>
                  <span>50 kΩ</span>
                  <span>100 kΩ</span>
                </div>
              </div>

              <!-- Input Capacitor -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Input Capacitor (Cin): {{ cin }} nF
                </label>
                <input
                  v-model.number="cin"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 nF</span>
                  <span>50 nF</span>
                  <span>100 nF</span>
                </div>
              </div>

              <!-- Animation Speed -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Animation Speed: {{ animationSpeed }}x
                </label>
                <input
                  v-model.number="animationSpeed"
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.25"
                  class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.25x</span>
                  <span>1.5x</span>
                  <span>3x</span>
                </div>
              </div>

              <!-- Play/Pause Button -->
              <button
                @click="toggleAnimation"
                class="w-full py-3 px-6 rounded-lg font-bold text-white transition-all transform hover:scale-105"
                :class="isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'"
              >
                {{ isPlaying ? '⏸️ Pause' : '▶️ Play' }}
              </button>
            </div>
          </div>

          <!-- Visualization -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                🔌 Differentiator Circuit
              </h3>

              <svg viewBox="0 0 700 350" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Op-Amp Triangle -->
                <path d="M 250 100 L 250 250 L 400 175 Z" 
                  fill="white" stroke="#3B82F6" stroke-width="3"/>

                <!-- Op-Amp Labels -->
                <text x="265" y="145" font-size="14" font-weight="bold" fill="#3B82F6">-</text>
                <text x="265" y="210" font-size="14" font-weight="bold" fill="#3B82F6">+</text>
                <text x="300" y="180" font-size="12" font-weight="bold" fill="#3B82F6">OP-AMP</text>

                <!-- Input Capacitor -->
                <g>
                  <line x1="80" y1="130" x2="180" y2="130" stroke="#10B981" stroke-width="3"/>
                  <line x1="180" y1="115" x2="180" y2="145" stroke="#10B981" stroke-width="3"/>
                  <line x1="185" y1="115" x2="185" y2="145" stroke="#10B981" stroke-width="3"/>
                  <line x1="185" y1="130" x2="250" y2="130" stroke="#10B981" stroke-width="3"/>
                  
                  <text x="182" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">
                    Cin = {{ cin }} nF
                  </text>
                </g>

                <!-- Input Label -->
                <text x="60" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">
                  Vin
                </text>

                <!-- Feedback Resistor -->
                <g>
                  <path d="M 250 130 L 290 130 L 300 120 L 280 140 L 300 160 L 280 180 L 300 200 L 290 210 L 250 210"
                    fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  
                  <text x="275" y="90" text-anchor="middle" font-size="11" font-weight="bold" fill="#F59E0B">
                    Rf = {{ rf }} kΩ
                  </text>
                </g>

                <!-- Ground at non-inverting input -->
                <g>
                  <line x1="250" y1="210" x2="220" y2="210" stroke="#6B7280" stroke-width="3"/>
                  <line x1="205" y1="210" x2="235" y2="210" stroke="#6B7280" stroke-width="3"/>
                  <line x1="210" y1="215" x2="230" y2="215" stroke="#6B7280" stroke-width="3"/>
                  <line x1="215" y1="220" x2="225" y2="220" stroke="#6B7280" stroke-width="3"/>
                  <text x="220" y="240" text-anchor="middle" font-size="10" fill="#6B7280">GND</text>
                </g>

                <!-- Output -->
                <g>
                  <line x1="400" y1="175" x2="500" y2="175" stroke="#8B5CF6" stroke-width="3"/>
                  <text x="520" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">
                    Vout
                  </text>
                </g>

                <!-- Current arrow -->
                <g>
                  <defs>
                    <marker id="currentArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#EC4899"/>
                    </marker>
                  </defs>
                  <line x1="140" y1="120" x2="160" y2="120" stroke="#EC4899" stroke-width="2" marker-end="url(#currentArrow)"/>
                  <text x="150" y="110" text-anchor="middle" font-size="9" font-weight="bold" fill="#EC4899">
                    i(t)
                  </text>
                </g>

                <!-- Formula Display -->
                <g>
                  <rect x="420" y="260" width="260" height="70" fill="white" stroke="#9333EA" stroke-width="2" rx="5"/>
                  <text x="550" y="285" text-anchor="middle" font-size="11" font-weight="bold" fill="#9333EA">
                    Output Voltage:
                  </text>
                  <text x="550" y="305" text-anchor="middle" font-size="14" font-weight="bold" fill="#9333EA">
                    Vout = -Rf × Cin × dVin/dt
                  </text>
                </g>

                <!-- Circuit Type Badge -->
                <rect x="20" y="20" width="180" height="40" fill="#3B82F6" rx="5"/>
                <text x="110" y="47" text-anchor="middle" font-size="14" font-weight="bold" fill="white">
                  INVERTING DIFFERENTIATOR
                </text>
              </svg>
            </div>

            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📊 Waveforms (Real-time)
              </h3>
              
              <canvas ref="waveformCanvas" class="w-full rounded-lg" height="300"></canvas>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-red-500"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Input (Vin)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-purple-500"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Output (Vout)</span>
                </div>
              </div>
            </div>

            <!-- Calculated Values -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📈 Circuit Analysis
              </h3>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 text-center">
                  <div class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Gain (DC)</div>
                  <div class="text-2xl font-bold text-blue-900 dark:text-blue-100">{{ dcGain }}</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400">V/V</div>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4 text-center">
                  <div class="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-1">Time Constant</div>
                  <div class="text-2xl font-bold text-purple-900 dark:text-purple-100">{{ timeConstant }}</div>
                  <div class="text-xs text-purple-600 dark:text-purple-400">μs</div>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4 text-center">
                  <div class="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">Cutoff Freq</div>
                  <div class="text-2xl font-bold text-green-900 dark:text-green-100">{{ cutoffFreq }}</div>
                  <div class="text-xs text-green-600 dark:text-green-400">Hz</div>
                </div>

                <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg p-4 text-center">
                  <div class="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Phase Shift</div>
                  <div class="text-2xl font-bold text-amber-900 dark:text-amber-100">{{ phaseShift }}</div>
                  <div class="text-xs text-amber-600 dark:text-amber-400">degrees</div>
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
            📚 Understanding Op-Amp Differentiators
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Differentiator?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An op-amp differentiator is a circuit that produces an output voltage proportional to the rate of change
              of the input voltage. It computes the mathematical derivative of the input signal over time.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Operation:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Input Element:</strong> Capacitor (blocks DC, passes AC based on rate of change)</li>
              <li><strong>Feedback Element:</strong> Resistor (converts current to voltage)</li>
              <li><strong>Input Current:</strong> i = Cin × dVin/dt</li>
              <li><strong>Output Voltage:</strong> Vout = -Rf × i = -Rf × Cin × dVin/dt</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Inverting:</strong> Output is 180° out of phase with input</li>
              <li><strong>High-Pass Filter:</strong> Blocks DC, passes high-frequency signals</li>
              <li><strong>Noise Sensitive:</strong> Amplifies high-frequency noise</li>
              <li><strong>Gain:</strong> Increases with frequency (|Gain| = 2πf × Rf × Cin)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Waveform Transformations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Sine Wave Input → Cosine Output</h4>
                <p class="text-sm text-blue-700 dark:text-blue-400">
                  d/dt(sin(ωt)) = ω × cos(ωt)<br>
                  Amplitude scales with frequency
                </p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Triangle Input → Square Output</h4>
                <p class="text-sm text-purple-700 dark:text-purple-400">
                  d/dt(linear ramp) = constant<br>
                  Produces positive/negative DC levels
                </p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">Square Input → Spike Output</h4>
                <p class="text-sm text-green-700 dark:text-green-400">
                  d/dt(step) = impulse<br>
                  Very large spikes at transitions
                </p>
              </div>
              <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h4 class="font-bold text-amber-800 dark:text-amber-300 mb-2">Ramp Input → DC Output</h4>
                <p class="text-sm text-amber-700 dark:text-amber-400">
                  d/dt(ramp) = constant<br>
                  Constant positive/negative voltage
                </p>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Noise:</strong> Differentiators amplify high-frequency noise</li>
              <li><strong>Stability:</strong> Can oscillate at high frequencies</li>
              <li><strong>Bandwidth Limiting:</strong> Often add a small resistor in series with Cin</li>
              <li><strong>Frequency Range:</strong> Limited by op-amp bandwidth and slew rate</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Rate Sensors:</strong> Accelerometers, tachometers</li>
              <li><strong>Edge Detection:</strong> Pulse generators, trigger circuits</li>
              <li><strong>Control Systems:</strong> PD (Proportional-Derivative) controllers</li>
              <li><strong>Signal Processing:</strong> High-pass filters, waveform shaping</li>
              <li><strong>Instrumentation:</strong> Rate-of-change indicators</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Formula Summary:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p>Output Voltage: Vout(t) = -Rf × Cin × (dVin/dt)</p>
              <p>Gain (magnitude): |A| = 2πf × Rf × Cin</p>
              <p>Time Constant: τ = Rf × Cin</p>
              <p>Cutoff Frequency: fc = 1/(2π × Rf × Cin)</p>
              <p>Phase Shift: φ = -90° (output lags input)</p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Improving the Differentiator:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A practical differentiator often includes a small resistor in series with the input capacitor to limit
              high-frequency gain and reduce noise sensitivity. This creates a "lossy integrator" with:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>- Stable at high frequencies</p>
              <p>- Reduced noise amplification</p>
              <p>- Better immunity to fast transients</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const colorMode = useColorMode()

// Input parameters
const signalType = ref('sine')
const frequency = ref(2)
const amplitude = ref(2)
const rf = ref(50) // kΩ
const cin = ref(10) // nF
const animationSpeed = ref(1)

// Animation state
const isPlaying = ref(true)
const animationId = ref(null)
const time = ref(0)
const waveformCanvas = ref(null)

// Computed properties
const dcGain = computed(() => {
  // At DC, gain is 0 (capacitor blocks DC)
  return '0'
})

const timeConstant = computed(() => {
  const tau = rf.value * 1000 * cin.value * 1e-9 // Convert to seconds
  return (tau * 1e6).toFixed(2) // Display in μs
})

const cutoffFreq = computed(() => {
  const tau = rf.value * 1000 * cin.value * 1e-9
  const fc = 1 / (2 * Math.PI * tau)
  return fc.toFixed(2)
})

const phaseShift = computed(() => {
  return '-90°'
})

// Signal generation functions
const generateSignal = (t, type, freq, amp) => {
  const omega = 2 * Math.PI * freq
  
  switch (type) {
    case 'sine':
      return amp * Math.sin(omega * t)
    
    case 'triangle':
      // Triangle wave approximation
      const period = 1 / freq
      const phase = (t % period) / period
      if (phase < 0.25) {
        return amp * (4 * phase)
      } else if (phase < 0.75) {
        return amp * (2 - 4 * phase)
      } else {
        return amp * (-4 + 4 * phase)
      }
    
    case 'square':
      return amp * Math.sign(Math.sin(omega * t))
    
    case 'sawtooth':
      const sawPeriod = 1 / freq
      const sawPhase = (t % sawPeriod) / sawPeriod
      return amp * (2 * sawPhase - 1)
    
    default:
      return 0
  }
}

// Differentiate signal (numerical differentiation)
const differentiateSignal = (t, type, freq, amp) => {
  const dt = 0.0001 // Small time step
  const y1 = generateSignal(t - dt, type, freq, amp)
  const y2 = generateSignal(t + dt, type, freq, amp)
  return (y2 - y1) / (2 * dt)
}

// Draw waveforms
const drawWaveforms = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width = canvas.offsetWidth
  const height = canvas.height

  // Clear canvas
  ctx.fillStyle = colorMode.value === 'dark' ? '#1f2937' : '#ffffff'
  ctx.fillRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = colorMode.value === 'dark' ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1
  
  // Vertical lines
  for (let x = 0; x < width; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  // Horizontal lines
  for (let y = 0; y < height; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Center line
  ctx.strokeStyle = colorMode.value === 'dark' ? '#6b7280' : '#9ca3af'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()

  // Calculate scaling
  const displayTime = 2 / frequency.value // Show 2 complete cycles
  const timeSpan = displayTime
  const pixelsPerSecond = width / timeSpan
  const amplitudeScale = height / (amplitude.value * 4) // Leave room for differentiated signal

  // Draw input signal (Vin) - Red
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  for (let x = 0; x < width; x++) {
    const t = time.value + (x / pixelsPerSecond)
    const vin = generateSignal(t, signalType.value, frequency.value, amplitude.value)
    const y = height / 2 - vin * amplitudeScale
    
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()

  // Draw output signal (Vout) - Purple (differentiated)
  ctx.strokeStyle = '#8b5cf6'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  // Scale the output based on circuit gain
  const circuitGain = (rf.value * 1000) * (cin.value * 1e-9) * (2 * Math.PI * frequency.value)
  
  for (let x = 0; x < width; x++) {
    const t = time.value + (x / pixelsPerSecond)
    const dvdt = differentiateSignal(t, signalType.value, frequency.value, amplitude.value)
    const vout = -circuitGain * dvdt // Negative because inverting configuration
    
    // Clamp output to prevent overflow
    const clampedVout = Math.max(-amplitude.value * 2, Math.min(amplitude.value * 2, vout))
    const y = height / 2 - clampedVout * amplitudeScale
    
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()

  // Draw labels
  ctx.font = '14px sans-serif'
  ctx.fillStyle = '#ef4444'
  ctx.fillText('Vin (Input)', 10, 20)
  ctx.fillStyle = '#8b5cf6'
  ctx.fillText('Vout (Output)', 10, 40)
}

// Animation loop
const animate = () => {
  if (!isPlaying.value) return
  
  const dt = 0.016 * animationSpeed.value // ~60fps
  time.value += dt
  
  drawWaveforms()
  animationId.value = requestAnimationFrame(animate)
}

// Toggle animation
const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    animate()
  } else {
    cancelAnimationFrame(animationId.value)
  }
}

// Lifecycle hooks
onMounted(() => {
  animate()
  
  // Redraw on resize
  window.addEventListener('resize', drawWaveforms)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId.value)
  window.removeEventListener('resize', drawWaveforms)
})

// Watch for parameter changes
watch([signalType, frequency, amplitude, rf, cin, animationSpeed], () => {
  if (!isPlaying.value) {
    drawWaveforms()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
          ⚡ SCR Controlled Rectifier Simulation
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how Silicon Controlled Rectifiers (SCRs) enable controlled power conversion through phase-angle firing
        </p>

        <!-- Animated Formula -->
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mt-6">
          <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
            <span class="text-primary-highlight">V_avg</span>
            <span class="text-gray-400">=</span>
            <span class="text-primary-highlight">V_peak</span>
            <span class="text-gray-400">×</span>
            <span class="text-primary-highlight">(1 + cos(α))</span>
            <span class="text-gray-400">÷</span>
            <span class="text-gray-400">2π</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Average Voltage = (V_peak × (1 + cos(firing angle))) / 2π
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Input Parameters -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Input Parameters</h3>

            <div class="space-y-6">
              <!-- Peak Voltage -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Peak Voltage (V<sub>p</sub>): {{ vp }} V
                </label>
                <input
                  v-model.number="vp"
                  type="range"
                  min="10"
                  max="325"
                  step="5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="vp"
                  type="number"
                  min="10"
                  max="325"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Frequency -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Frequency: {{ frequency }} Hz
                </label>
                <input
                  v-model.number="frequency"
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="frequency"
                  type="number"
                  min="10"
                  max="60"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Firing Angle -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Firing Angle (α): {{ firingAngle }}°
                </label>
                <input
                  v-model.number="firingAngle"
                  type="range"
                  min="0"
                  max="180"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="firingAngle"
                  type="number"
                  min="0"
                  max="180"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Load Resistance -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistance: {{ loadResistance }} Ω
                </label>
                <input
                  v-model.number="loadResistance"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="loadResistance"
                  type="number"
                  min="10"
                  max="1000"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="applyPreset('full')"
                class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
              >
                Full Power (0°)
              </button>
              <button
                @click="applyPreset('half')"
                class="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors text-sm"
              >
                Half Power (90°)
              </button>
              <button
                @click="applyPreset('low')"
                class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm"
              >
                Low Power (120°)
              </button>
              <button
                @click="applyPreset('dim')"
                class="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
              >
                Dim (150°)
              </button>
            </div>
          </div>

          <!-- Animation Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Animation Controls</h3>
            <div class="space-y-4">
              <button
                @click="isRunning = !isRunning"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-semibold transition-all',
                  isRunning
                    ? 'bg-red-600 text-white shadow-lg hover:bg-red-700'
                    : 'bg-green-600 text-white shadow-lg hover:bg-green-700'
                ]"
              >
                {{ isRunning ? '⏸ Pause' : '▶ Play' }}
              </button>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Animation Speed: {{ animationSpeed }}×
                </label>
                <input
                  v-model.number="animationSpeed"
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.25"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Visualization & Results -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">SCR Circuit Diagram</h3>
            <svg viewBox="0 0 700 400" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <!-- Title -->
              <text x="350" y="30" text-anchor="middle" class="text-lg font-bold fill-gray-900 dark:fill-white">
                SCR Half-Wave Controlled Rectifier
              </text>

              <!-- AC Source -->
              <g transform="translate(80, 200)">
                <circle cx="0" cy="0" r="30" fill="white" stroke="#3B82F6" stroke-width="3"/>
                <path d="M-15 -8 Q 0 8 15 -8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <path d="M-15 8 Q 0 -8 15 8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <text x="0" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">
                  AC {{ vp }}V
                </text>
              </g>

              <!-- Main circuit lines -->
              <line x1="110" y1="200" x2="200" y2="200" stroke="#6B7280" stroke-width="3"/>
              <line x1="200" y1="200" x2="200" y2="100" stroke="#6B7280" stroke-width="3"/>
              <line x1="200" y1="100" x2="300" y2="100" stroke="#6B7280" stroke-width="3"/>
              <line x1="400" y1="100" x2="550" y2="100" stroke="#6B7280" stroke-width="3"/>
              <line x1="550" y1="100" x2="550" y2="200" stroke="#6B7280" stroke-width="3"/>
              <line x1="550" y1="200" x2="550" y2="320" stroke="#6B7280" stroke-width="3"/>
              <line x1="550" y1="320" x2="80" y2="320" stroke="#6B7280" stroke-width="3"/>
              <line x1="80" y1="320" x2="80" y2="230" stroke="#6B7280" stroke-width="3"/>

              <!-- SCR Symbol -->
              <g transform="translate(350, 100)">
                <!-- Anode -->
                <line x1="-50" y1="0" x2="-20" y2="0" stroke="#EF4444" stroke-width="3"/>
                <!-- Cathode -->
                <line x1="20" y1="0" x2="50" y2="0" stroke="#10B981" stroke-width="3"/>

                <!-- Diode triangle -->
                <polygon points="-20 -25 -20 25 20 0" fill="none" stroke="#8B5CF6" stroke-width="3"/>

                <!-- Cathode bar -->
                <line x1="20" y1="-20" x2="20" y2="20" stroke="#8B5CF6" stroke-width="3"/>

                <!-- Gate terminal -->
                <line x1="0" y1="0" x2="0" y2="40" stroke="#F59E0B" stroke-width="2"/>
                <line x1="0" y1="40" x2="30" y2="55" stroke="#F59E0B" stroke-width="2"/>

                <!-- Gate pulse animation -->
                <circle v-if="isTriggered && isRunning" cx="30" cy="55" r="6" fill="#F59E0B" filter="url(#glow)">
                  <animate attributeName="r" values="6;12;6" dur="0.5s" repeatCount="1"/>
                  <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="1"/>
                </circle>

                <!-- Labels -->
                <text x="-40" y="-35" font-size="11" font-weight="bold" fill="#EF4444">Anode</text>
                <text x="25" y="-35" font-size="11" font-weight="bold" fill="#10B981">Cathode</text>
                <text x="35" y="70" font-size="11" font-weight="bold" fill="#F59E0B">Gate</text>
              </g>

              <!-- Load Resistor -->
              <g transform="translate(550, 260)">
                <rect x="-15" y="-30" width="30" height="60" fill="white" stroke="#3B82F6" stroke-width="3"/>
                <path d="M-10 -20 L-5 -15 L-10 -10 L-5 -5 L-10 0 L-5 5 L-10 10 L-5 15 L-10 20"
                  fill="none" stroke="#3B82F6" stroke-width="2"/>
                <text x="0" y="50" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">
                  Load {{ loadResistance }}Ω
                </text>
              </g>

              <!-- Current flow animation -->
              <g v-if="isRunning && isConducting">
                <circle r="5" fill="#10B981" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
              </g>

              <!-- Current path (hidden) -->
              <path id="currentPath" d="M 80 200 L 200 200 L 200 100 L 300 100 L 400 100 L 550 100 L 550 200 L 550 320 L 80 320 L 80 200"
                fill="none" stroke="none"/>

              <!-- Firing angle indicator -->
              <g transform="translate(180, 80)">
                <text x="0" y="0" text-anchor="middle" font-size="14" font-weight="bold" :fill="firingAngleColor">
                  α = {{ firingAngle }}°
                </text>
              </g>

              <!-- Conduction status -->
              <g transform="translate(500, 50)">
                <rect x="-60" y="-15" width="120" height="30" rx="5" :fill="conductionColor"/>
                <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="bold" fill="white">
                  {{ conductionStatus }}
                </text>
              </g>
            </svg>
          </div>

          <!-- Waveform Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Waveforms</h3>
            <canvas ref="waveformCanvas" width="800" height="300" class="w-full h-auto bg-gray-900 rounded-lg"></canvas>
          </div>

          <!-- Results Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Results</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                <p class="text-sm text-blue-700 dark:text-blue-300 font-semibold">Peak Voltage</p>
                <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">{{ vp.toFixed(1) }} V</p>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                <p class="text-sm text-green-700 dark:text-green-300 font-semibold">Average Output</p>
                <p class="text-2xl font-bold text-green-900 dark:text-green-100">{{ vAvg.toFixed(2) }} V</p>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                <p class="text-sm text-purple-700 dark:text-purple-300 font-semibold">RMS Output</p>
                <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">{{ vRms.toFixed(2) }} V</p>
              </div>

              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg p-4">
                <p class="text-sm text-yellow-700 dark:text-yellow-300 font-semibold">Output Current</p>
                <p class="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{{ iAvg.toFixed(2) }} A</p>
              </div>

              <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-lg p-4">
                <p class="text-sm text-red-700 dark:text-red-300 font-semibold">Output Power</p>
                <p class="text-2xl font-bold text-red-900 dark:text-red-100">{{ pOut.toFixed(2) }} W</p>
              </div>

              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 rounded-lg p-4">
                <p class="text-sm text-indigo-700 dark:text-indigo-300 font-semibold">Power Control</p>
                <p class="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{{ powerControl }}%</p>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 How SCR Controlled Rectifiers Work</h3>

            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">What is an SCR?</h4>
                <p class="mb-2">
                  A <strong>Silicon Controlled Rectifier (SCR)</strong> is a four-layer semiconductor device (PNPN) that acts as a controlled switch.
                  Unlike a regular diode, an SCR only conducts current when triggered by a gate signal.
                </p>
              </div>

              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Operation Principle</h4>
                <ul class="list-disc pl-6 space-y-2">
                  <li><strong>Forward Blocking:</strong> Without gate trigger, SCR blocks current even with forward voltage</li>
                  <li><strong>Gate Trigger:</strong> A pulse at the gate turns ON the SCR (latches ON)</li>
                  <li><strong>Conduction:</strong> Once ON, SCR conducts like a diode until current drops below holding level</li>
                  <li><strong>Commutation:</strong> SCR turns OFF when current falls to zero (natural commutation)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Firing Angle Control (α)</h4>
                <p class="mb-2">
                  The <strong>firing angle</strong> determines when the SCR is triggered during each AC cycle:
                </p>
                <ul class="list-disc pl-6 space-y-1">
                  <li>α = 0°: Full power (triggered at zero crossing)</li>
                  <li>α = 90°: Half power (triggered at peak)</li>
                  <li>α = 180°: No power (never triggered)</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Key Formulas</h4>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                  <p>V<sub>avg</sub> = (V<sub>peak</sub> / 2π) × (1 + cos(α))</p>
                  <p>V<sub>rms</sub> = (V<sub>peak</sub> / 2) × √[(1/2π)(π - α + sin(2α)/2)]</p>
                  <p>P<sub>out</sub> = V<sub>avg</sub> × I<sub>avg</sub></p>
                  <p>Conduction Angle = 180° - α</p>
                </div>
              </div>

              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Applications</h4>
                <ul class="list-disc pl-6 space-y-1">
                  <li>Motor speed control (DC motors)</li>
                  <li>Light dimmers</li>
                  <li>Battery chargers</li>
                  <li>Welding controls</li>
                  <li>HVAC systems</li>
                  <li>Power supplies</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Pro Tips</h4>
                <ul class="list-disc pl-6 space-y-1">
                  <li>SCRs handle high power (up to MW range)</li>
                  <li>Once triggered, gate loses control (latching device)</li>
                  <li>Only turns OFF at current zero-crossing</li>
                  <li>Requires proper snubber circuits for protection</li>
                  <li>Gate pulses must be synchronized with AC line</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const vp = ref(170)
const frequency = ref(50)
const firingAngle = ref(90)
const loadResistance = ref(100)
const animationSpeed = ref(1)
const isRunning = ref(true)

const waveformCanvas = ref(null)
let animationFrameId = null
let time = 0

// Computed values
const vAvg = computed(() => {
  const alphaRad = (firingAngle.value * Math.PI) / 180
  return (vp.value / (2 * Math.PI)) * (1 + Math.cos(alphaRad))
})

const vRms = computed(() => {
  const alphaRad = (firingAngle.value * Math.PI) / 180
  const term = (Math.PI - alphaRad + Math.sin(2 * alphaRad) / 2) / (2 * Math.PI)
  return (vp.value / 2) * Math.sqrt(term)
})

const iAvg = computed(() => vAvg.value / loadResistance.value)

const pOut = computed(() => vAvg.value * iAvg.value)

const powerControl = computed(() => {
  const maxPower = (vp.value / Math.PI) * (vp.value / Math.PI) / loadResistance.value
  return ((pOut.value / maxPower) * 100).toFixed(1)
})

const conductionStatus = computed(() => {
  const currentPhase = (time * frequency.value * animationSpeed.value * 360) % 360
  const triggerPoint = firingAngle.value
  const isPositiveHalf = currentPhase >= 0 && currentPhase < 180

  if (isPositiveHalf && currentPhase >= triggerPoint) {
    return 'CONDUCTING'
  }
  return 'BLOCKING'
})

const conductionColor = computed(() => {
  return conductionStatus.value === 'CONDUCTING' ? '#10B981' : '#EF4444'
})

const firingAngleColor = computed(() => {
  const ratio = firingAngle.value / 180
  if (ratio < 0.33) return '#10B981'
  if (ratio < 0.66) return '#F59E0B'
  return '#EF4444'
})

// Animation state
const isTriggered = ref(false)
const isConducting = ref(false)

// Presets
const applyPreset = (preset) => {
  switch (preset) {
    case 'full':
      firingAngle.value = 0
      break
    case 'half':
      firingAngle.value = 90
      break
    case 'low':
      firingAngle.value = 120
      break
    case 'dim':
      firingAngle.value = 150
      break
  }
}

// Draw waveforms
const drawWaveforms = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // Clear canvas
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)

  // Grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    ctx.beginPath()
    ctx.moveTo(i * width / 10, 0)
    ctx.lineTo(i * width / 10, height)
    ctx.stroke()
  }
  for (let i = 0; i <= 6; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * height / 6)
    ctx.lineTo(width, i * height / 6)
    ctx.stroke()
  }

  // Center line
  ctx.strokeStyle = '#6B7280'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()

  // Parameters
  const scale = (height / 2 - 20) / vp.value
  const alphaRad = (firingAngle.value * Math.PI) / 180
  const triggerPoint = (firingAngle.value / 180) * (width / 2)

  // Draw input AC waveform (blue)
  ctx.strokeStyle = '#3B82F6'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const angle = (x / width) * 4 * Math.PI + time * 2 * Math.PI * frequency.value * animationSpeed.value
    const y = height / 2 - vp.value * scale * Math.sin(angle)
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()

  // Draw output waveform (green - controlled)
  ctx.strokeStyle = '#10B981'
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const phase = ((x / width) * 4 * Math.PI + time * 2 * Math.PI * frequency.value * animationSpeed.value) % (2 * Math.PI)
    let y = height / 2

    // Only conduct during positive half-cycle after firing angle
    const cycleProgress = (phase / (2 * Math.PI))
    const isPositive = cycleProgress < 0.5
    const localPhase = cycleProgress * 360
    const shouldConduct = isPositive && localPhase >= firingAngle.value

    if (shouldConduct) {
      const angle = phase
      y = height / 2 - vp.value * scale * Math.sin(angle)
    }

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()

  // Draw firing angle indicator
  ctx.strokeStyle = '#F59E0B'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  for (let cycle = 0; cycle < 2; cycle++) {
    const x = cycle * (width / 2) + triggerPoint
    ctx.beginPath()
    ctx.moveTo(x, 20)
    ctx.lineTo(x, height - 20)
    ctx.stroke()
  }
  ctx.setLineDash([])

  // Labels
  ctx.fillStyle = '#3B82F6'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText('Input AC', 20, 30)

  ctx.fillStyle = '#10B981'
  ctx.fillText('Output DC (Controlled)', 150, 30)

  ctx.fillStyle = '#F59E0B'
  ctx.fillText(`α = ${firingAngle.value}°`, width - 100, 30)

  // Trigger pulse indicator
  const currentPhase = (time * frequency.value * animationSpeed.value) % 1
  const triggerPhase = firingAngle.value / 360
  const showPulse = Math.abs(currentPhase - triggerPhase) < 0.05

  if (showPulse) {
    isTriggered.value = true
    isConducting.value = true
  } else {
    isTriggered.value = false
    const cyclePos = currentPhase * 360
    isConducting.value = cyclePos >= firingAngle.value && cyclePos < 180
  }

  // Time indicator
  ctx.fillStyle = '#9CA3AF'
  ctx.font = '12px sans-serif'
  ctx.fillText(`Time: ${time.toFixed(2)} s`, 20, height - 10)
}

// Animation loop
const animate = () => {
  if (isRunning.value) {
    time += 0.016 * animationSpeed.value
    drawWaveforms()
  }
  animationFrameId = requestAnimationFrame(animate)
}

// Lifecycle
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// Watch for parameter changes
watch([vp, frequency, firingAngle, loadResistance, animationSpeed], () => {
  if (!isRunning.value) {
    drawWaveforms()
  }
}, { deep: true })
</script>

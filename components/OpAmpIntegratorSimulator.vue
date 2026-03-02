<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Simulation state
const isRunning = ref(true)
const inputWaveform = ref<'square' | 'sine' | 'triangle'>('square')
const inputFrequency = ref(1) // Hz
const inputAmplitude = ref(5) // Volts
const resistance = ref(100000) // Ohms (100k)
const capacitance = ref(100) // nF

// Animation state
const animationId = ref<number | null>(null)
const startTime = ref(Date.now())
const canvasWidth = ref(800)
const canvasHeight = ref(400)

// Current values
const currentTime = ref(0)
const inputVoltage = ref(0)
const outputVoltage = ref(0)

// Calculate time constant
const timeConstant = computed(() => {
  return (resistance.value * capacitance.value * 1e-9) // Convert nF to F
})

// Integration factor (1/RC)
const integrationFactor = computed(() => {
  return 1 / timeConstant.value
})

// Get input voltage at time t
const getInputVoltage = (t: number): number => {
  const freq = inputFrequency.value * 2 * Math.PI
  const amp = inputAmplitude.value

  switch (inputWaveform.value) {
    case 'sine':
      return amp * Math.sin(freq * t)
    case 'square':
      return amp * (Math.sin(freq * t) >= 0 ? 1 : -1)
    case 'triangle':
      // Triangle wave: goes from -amp to +amp linearly
      const period = 1 / inputFrequency.value
      const phase = (t % period) / period
      if (phase < 0.25) {
        return amp * (4 * phase)
      } else if (phase < 0.75) {
        return amp * (2 - 4 * phase)
      } else {
        return amp * (-4 + 4 * phase)
      }
    default:
      return 0
  }
}

// Calculate integrated output voltage
const calculateOutput = (t: number): number => {
  // Numerical integration using the trapezoidal rule
  const dt = 0.001 // 1ms time step
  const numSteps = Math.floor(t / dt)
  
  let integral = 0
  let prevVin = getInputVoltage(0)
  
  for (let i = 1; i <= numSteps; i++) {
    const currentTimeStep = i * dt
    const vin = getInputVoltage(currentTimeStep)
    integral += (prevVin + vin) * dt / 2
    prevVin = vin
  }
  
  return -integrationFactor.value * integral
}

// Canvas refs
const inputCanvas = ref<HTMLCanvasElement | null>(null)
const outputCanvas = ref<HTMLCanvasElement | null>(null)

// Draw waveform on canvas
const drawWaveform = (
  canvas: HTMLCanvasElement | null,
  getData: (t: number) => number,
  color: string,
  label: string
) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const centerY = height / 2
  const timeWindow = 4 / inputFrequency.value // Show 4 cycles

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = (height / 4) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  for (let i = 0; i <= 8; i++) {
    const x = (width / 8) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  // Draw center line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()

  // Draw waveform
  ctx.strokeStyle = color
  ctx.lineWidth = 3
  ctx.beginPath()

  const timeOffset = currentTime.value
  const maxAmp = inputAmplitude.value * 1.5 // Scale for display

  for (let x = 0; x < width; x++) {
    const t = timeOffset + (x / width) * timeWindow
    const voltage = getData(t)
    const y = centerY - (voltage / maxAmp) * (height / 2 - 20)

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Draw labels
  ctx.fillStyle = 'white'
  ctx.font = '14px monospace'
  ctx.fillText(label, 10, 20)

  // Draw current value
  const currentV = getData(timeOffset)
  ctx.fillStyle = color
  ctx.font = 'bold 16px monospace'
  ctx.fillText(`${currentV.toFixed(2)} V`, 10, 40)
}

// Animation loop
const animate = () => {
  if (!isRunning.value) return

  const now = Date.now()
  currentTime.value = (now - startTime.value) / 1000 // Convert to seconds

  // Update current voltages
  inputVoltage.value = getInputVoltage(currentTime.value)
  outputVoltage.value = calculateOutput(currentTime.value)

  // Draw waveforms
  drawWaveform(
    inputCanvas.value,
    getInputVoltage,
    '#22d3ee',
    'Input (Vin)'
  )
  drawWaveform(
    outputCanvas.value,
    calculateOutput,
    '#f472b6',
    'Output (Vout)'
  )

  animationId.value = requestAnimationFrame(animate)
}

// Reset simulation
const resetSimulation = () => {
  startTime.value = Date.now()
  currentTime.value = 0
  outputVoltage.value = 0
}

// Toggle simulation
const toggleSimulation = () => {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    startTime.value = Date.now() - currentTime.value * 1000
    animate()
  } else if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
}

// Lifecycle hooks
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// Watch for parameter changes
watch([inputWaveform, inputFrequency, inputAmplitude, resistance, capacitance], () => {
  // Reset when parameters change to avoid discontinuities
  if (!isRunning.value) return
  resetSimulation()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Waveform Selection -->
        <div>
          <label class="block text-white font-semibold mb-2">Input Waveform</label>
          <div class="flex flex-wrap gap-2">
            <button
              @click="inputWaveform = 'square'"
              :class="[
                'py-2 px-4 rounded-lg font-semibold transition-all',
                inputWaveform === 'square'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              ]"
            >
              ⬜ Square
            </button>
            <button
              @click="inputWaveform = 'sine'"
              :class="[
                'py-2 px-4 rounded-lg font-semibold transition-all',
                inputWaveform === 'sine'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              ]"
            >
              〰️ Sine
            </button>
            <button
              @click="inputWaveform = 'triangle'"
              :class="[
                'py-2 px-4 rounded-lg font-semibold transition-all',
                inputWaveform === 'triangle'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              ]"
            >
              🔺 Triangle
            </button>
          </div>
        </div>

        <!-- Frequency -->
        <div>
          <label class="block text-white font-semibold mb-2">
            Frequency: {{ inputFrequency }} Hz
          </label>
          <input
            type="range"
            v-model.number="inputFrequency"
            min="0.1"
            max="5"
            step="0.1"
            class="w-full accent-cyan-500"
          />
        </div>

        <!-- Amplitude -->
        <div>
          <label class="block text-white font-semibold mb-2">
            Amplitude: {{ inputAmplitude }} V
          </label>
          <input
            type="range"
            v-model.number="inputAmplitude"
            min="1"
            max="10"
            step="0.5"
            class="w-full accent-cyan-500"
          />
        </div>

        <!-- Resistance -->
        <div>
          <label class="block text-white font-semibold mb-2">
            Resistance: {{ (resistance / 1000).toFixed(0) }} kΩ
          </label>
          <input
            type="range"
            v-model.number="resistance"
            min="10000"
            max="1000000"
            step="10000"
            class="w-full accent-cyan-500"
          />
        </div>

        <!-- Capacitance -->
        <div>
          <label class="block text-white font-semibold mb-2">
            Capacitance: {{ capacitance }} nF
          </label>
          <input
            type="range"
            v-model.number="capacitance"
            min="10"
            max="1000"
            step="10"
            class="w-full accent-cyan-500"
          />
        </div>

        <!-- Control Buttons -->
        <div class="flex items-end gap-2">
          <button
            @click="toggleSimulation"
            :class="[
              'flex-1 py-3 px-6 rounded-lg font-bold transition-all',
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
            ]"
          >
            {{ isRunning ? '⏸️ Pause' : '▶️ Play' }}
          </button>
          <button
            @click="resetSimulation"
            class="py-3 px-6 rounded-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
      <h3 class="text-xl font-bold text-white mb-4">Circuit Diagram</h3>
      <div class="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
        <svg viewBox="0 0 600 250" class="w-full max-w-3xl mx-auto">
          <!-- Input terminal -->
          <text x="20" y="125" fill="#22d3ee" font-size="16" font-weight="bold">Vin</text>
          <line x1="50" y1="120" x2="100" y2="120" stroke="#22d3ee" stroke-width="3"/>
          
          <!-- Input resistor R -->
          <line x1="100" y1="120" x2="120" y2="120" stroke="#22d3ee" stroke-width="3"/>
          <path d="M 120 110 L 125 130 L 135 110 L 145 130 L 155 110 L 165 130 L 170 120" stroke="#fbbf24" stroke-width="3" fill="none"/>
          <text x="145" y="90" fill="#fbbf24" font-size="14" text-anchor="middle">R</text>
          <line x1="170" y1="120" x2="220" y2="120" stroke="#22d3ee" stroke-width="3"/>
          
          <!-- Inverting input (-) -->
          <circle cx="220" cy="120" r="8" fill="none" stroke="#a855f7" stroke-width="2"/>
          <text x="220" y="105" fill="#a855f7" font-size="16" text-anchor="middle">-</text>
          
          <!-- Non-inverting input (+) to ground -->
          <line x1="220" y1="180" x2="220" y2="200" stroke="#a855f7" stroke-width="3"/>
          <circle cx="220" cy="180" r="8" fill="none" stroke="#a855f7" stroke-width="2"/>
          <text x="220" y="195" fill="#a855f7" font-size="16" text-anchor="middle">+</text>
          <line x1="220" y1="200" x2="220" y2="220" stroke="#22d3ee" stroke-width="3"/>
          <line x1="210" y1="220" x2="230" y2="220" stroke="#22d3ee" stroke-width="3"/>
          <line x1="215" y1="225" x2="225" y2="225" stroke="#22d3ee" stroke-width="3"/>
          <line x1="218" y1="230" x2="222" y2="230" stroke="#22d3ee" stroke-width="3"/>
          
          <!-- Op-amp triangle -->
          <polygon points="220,110 220,190 300,150" fill="none" stroke="#a855f7" stroke-width="3"/>
          <text x="255" y="155" fill="#a855f7" font-size="18" font-weight="bold">Op-Amp</text>
          
          <!-- Feedback capacitor C -->
          <line x1="220" y1="120" x2="220" y2="80" stroke="#22d3ee" stroke-width="3"/>
          <line x1="220" y1="80" x2="250" y2="80" stroke="#22d3ee" stroke-width="3"/>
          <line x1="250" y1="70" x2="250" y2="90" stroke="#fbbf24" stroke-width="4"/>
          <line x1="260" y1="70" x2="260" y2="90" stroke="#fbbf24" stroke-width="4"/>
          <text x="255" y="55" fill="#fbbf24" font-size="14" text-anchor="middle">C</text>
          <line x1="260" y1="80" x2="360" y2="80" stroke="#22d3ee" stroke-width="3"/>
          <line x1="360" y1="80" x2="360" y2="150" stroke="#22d3ee" stroke-width="3"/>
          
          <!-- Output -->
          <line x1="300" y1="150" x2="550" y2="150" stroke="#22d3ee" stroke-width="3"/>
          <text x="560" y="155" fill="#f472b6" font-size="16" font-weight="bold">Vout</text>
          
          <!-- Current arrow -->
          <path d="M 140 100 L 140 85" stroke="#fbbf24" stroke-width="2" fill="none"/>
          <path d="M 135 90 L 140 80 L 145 90" stroke="#fbbf24" stroke-width="2" fill="none"/>
          <text x="140" y="75" fill="#fbbf24" font-size="12" text-anchor="middle">I</text>
        </svg>
      </div>
    </div>

    <!-- Waveforms -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Input Waveform -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h3 class="text-xl font-bold text-white mb-4">Input Waveform</h3>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <canvas
            ref="inputCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
            class="w-full"
          ></canvas>
        </div>
        <div class="mt-4 text-center">
          <div class="text-3xl font-bold text-cyan-400">
            {{ inputVoltage.toFixed(2) }} V
          </div>
          <div class="text-sm text-cyan-200">Current Input Voltage</div>
        </div>
      </div>

      <!-- Output Waveform -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h3 class="text-xl font-bold text-white mb-4">Output Waveform (Integrated)</h3>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <canvas
            ref="outputCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
            class="w-full"
          ></canvas>
        </div>
        <div class="mt-4 text-center">
          <div class="text-3xl font-bold text-pink-400">
            {{ outputVoltage.toFixed(2) }} V
          </div>
          <div class="text-sm text-pink-200">Integrated Output Voltage</div>
        </div>
      </div>
    </div>

    <!-- Parameters Display -->
    <div class="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
      <h3 class="text-2xl font-bold text-white mb-4 text-center">📊 Circuit Parameters</h3>
      <div class="grid md:grid-cols-3 gap-6 text-center">
        <div class="bg-black/30 rounded-lg p-4">
          <div class="text-sm text-cyan-200 mb-1">Resistance</div>
          <div class="text-2xl font-bold text-cyan-400">
            {{ (resistance / 1000).toFixed(0) }} kΩ
          </div>
        </div>
        <div class="bg-black/30 rounded-lg p-4">
          <div class="text-sm text-cyan-200 mb-1">Capacitance</div>
          <div class="text-2xl font-bold text-cyan-400">
            {{ capacitance }} nF
          </div>
        </div>
        <div class="bg-black/30 rounded-lg p-4">
          <div class="text-sm text-cyan-200 mb-1">Time Constant (τ = RC)</div>
          <div class="text-2xl font-bold text-cyan-400">
            {{ (timeConstant * 1000).toFixed(2) }} ms
          </div>
        </div>
      </div>
      <div class="mt-4 bg-black/30 rounded-lg p-4 text-center">
        <div class="text-sm text-cyan-200 mb-1">Integration Factor (1/RC)</div>
        <div class="text-xl font-mono text-green-400">
          {{ integrationFactor.toFixed(2) }} s⁻¹
        </div>
      </div>
    </div>

    <!-- Quick Info -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
      <div class="grid md:grid-cols-2 gap-4 text-cyan-100">
        <div class="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
          <h4 class="font-bold text-purple-200 mb-2">💡 What's Happening</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Input current charges/discharges capacitor C</li>
            <li>Capacitor voltage = integral of current</li>
            <li>Output = negative of capacitor voltage</li>
            <li>R×C determines integration speed</li>
          </ul>
        </div>
        <div class="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
          <h4 class="font-bold text-cyan-200 mb-2">🎯 Try Different Waveforms</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong class="text-yellow-300">Square → Triangle:</strong> Constant input gives ramp output</li>
            <li><strong class="text-yellow-300">Sine → Shifted Cosine:</strong> 270° phase shift</li>
            <li><strong class="text-yellow-300">Triangle → Curved:</strong> Parabolic sections</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

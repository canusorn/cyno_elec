<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Circuit parameters
const vcc = ref(15)
const r1 = ref(47) // Base bias resistor 1 (kΩ)
const r2 = ref(47) // Base bias resistor 2 (kΩ)
const re = ref(0.47) // Emitter resistor (Ω)
const rl = ref(8) // Load resistor (Ω)
const beta = ref(100) // Transistor current gain
const vbe = ref(0.7) // Base-emitter voltage (V)

// Signal parameters
const inputAmplitude = ref(2)
const inputFrequency = ref(1000)

// Animation
const isRunning = ref(true)
const animationSpeed = ref(1)
const time = ref(0)
let animationId: number | null = null

// Canvas refs
const waveformCanvas = ref<HTMLCanvasElement | null>(null)
const transferCanvas = ref<HTMLCanvasElement | null>(null)

// Calculations
const baseVoltage = computed(() => {
  return (vcc.value * r2.value) / (r1.value + r2.value)
})

const biasCurrent = computed(() => {
  const ie = (baseVoltage.value - vbe.value) / re.value
  return Math.max(0, ie)
})

const crossoverVoltage = computed(() => {
  return vbe.value
})

const voltageGain = computed(() => {
  return 1 // Emitter follower has unity gain
})

const maxOutputSwing = computed(() => {
  return vcc.value - crossoverVoltage.value - (biasCurrent.value * re.value)
})

const maxPower = computed(() => {
  return (vcc.value * vcc.value) / (2 * rl.value)
})

const maxOutputCurrent = computed(() => {
  return maxOutputSwing.value / rl.value
})

const efficiency = computed(() => {
  const pOut = (maxOutputSwing.value * maxOutputSwing.value) / (2 * rl.value)
  const pIn = (2 * vcc.value * biasCurrent.value)
  if (pIn === 0) return 0
  return (pOut / pIn) * 100
})

const quiescentCurrent = computed(() => {
  return biasCurrent.value
})

const classABStatus = computed(() => {
  if (quiescentCurrent.value > 0.01) {
    return { text: 'Class AB', color: 'text-green-400', description: 'Small quiescent current eliminates crossover distortion' }
  }
  return { text: 'Class B', color: 'text-yellow-400', description: 'No bias - crossover distortion present' }
})

// Waveform generation
const generateWaveforms = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const centerY = height / 2

  // Clear canvas
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = '#1e293b'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let i = 0; i <= 8; i++) {
    const y = (height / 8) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw center line
  ctx.strokeStyle = '#334155'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()

  // Calculate scale
  const maxVolt = vcc.value * 1.2
  const scale = (height / 2 - 20) / maxVolt

  // Generate waveforms
  const inputPoints: number[] = []
  const outputPoints: number[] = []

  const samples = 1000
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * (2 * Math.PI)
    const phase = time.value

    // Input waveform (pure sine)
    const vin = inputAmplitude.value * Math.sin(t + phase)
    inputPoints.push(vin)

    // Class AB output (with crossover elimination)
    let vout
    const crossoverBias = quiescentCurrent.value * re.value * 0.01

    if (vin > crossoverBias) {
      // NPN conducts (positive half)
      vout = Math.max(0, vin - vbe.value / 2)
    } else if (vin < -crossoverBias) {
      // PNP conducts (negative half)
      vout = Math.min(0, vin + vbe.value / 2)
    } else {
      // Crossover region (smooth transition due to bias)
      vout = vin * (1 - (crossoverBias - Math.abs(vin)) / crossoverBias)
    }

    // Apply voltage limiting
    vout = Math.max(-maxOutputSwing.value, Math.min(maxOutputSwing.value, vout))
    outputPoints.push(vout)
  }

  // Draw input waveform
  ctx.strokeStyle = '#f97316' // Orange
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < samples; i++) {
    const x = (i / samples) * width
    const y = centerY - inputPoints[i] * scale
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Draw output waveform
  ctx.strokeStyle = '#ec4899' // Pink
  ctx.lineWidth = 3
  ctx.beginPath()
  for (let i = 0; i < samples; i++) {
    const x = (i / samples) * width
    const y = centerY - outputPoints[i] * scale
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Draw crossover region indicator
  const crossoverY = centerY - crossoverVoltage.value * scale
  ctx.strokeStyle = '#22c55e'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(0, crossoverY)
  ctx.lineTo(width, crossoverY)
  ctx.stroke()
  ctx.setLineDash([])

  // Labels
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#f97316'
  ctx.fillText('Input (Vin)', 10, 20)
  ctx.fillStyle = '#ec4899'
  ctx.fillText('Output (Vout)', 100, 20)
  ctx.fillStyle = '#94a3b8'
  ctx.fillText(`+${vcc.value}V`, width - 50, 15)
  ctx.fillText(`-${vcc.value}V`, width - 50, height - 5)
}

// Transfer characteristic
const drawTransferCharacteristic = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  // Clear
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Grid
  ctx.strokeStyle = '#1e293b'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let i = 0; i <= 8; i++) {
    const y = (height / 8) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Axes
  ctx.strokeStyle = '#334155'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()

  // Calculate scale
  const maxVolt = vcc.value
  const scaleX = (width / 2 - 30) / maxVolt
  const scaleY = (height / 2 - 30) / maxVolt

  // Draw transfer curve
  ctx.strokeStyle = '#8b5cf6' // Purple
  ctx.lineWidth = 3
  ctx.beginPath()

  const points = 200
  for (let i = 0; i <= points; i++) {
    const vin = -maxVolt + (2 * maxVolt * i / points)
    let vout

    // Class AB transfer function
    if (vin > vbe.value / 2) {
      vout = Math.max(0, vin - vbe.value / 2)
    } else if (vin < -vbe.value / 2) {
      vout = Math.min(0, vin + vbe.value / 2)
    } else {
      // Smooth crossover
      vout = vin
    }

    // Limit
    vout = Math.max(-maxOutputSwing.value, Math.min(maxOutputSwing.value, vout))

    const x = width / 2 + vin * scaleX
    const y = height / 2 - vout * scaleY

    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // Operating point indicator
  const opX = width / 2
  const opY = height / 2
  ctx.fillStyle = '#22c55e'
  ctx.beginPath()
  ctx.arc(opX, opY, 6, 0, 2 * Math.PI)
  ctx.fill()

  // Labels
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#94a3b8'
  ctx.fillText('Vin →', width - 40, height / 2 - 10)
  ctx.fillText('Vout ↑', width / 2 + 10, 20)
  ctx.fillText('Q-Point', width / 2 + 10, height / 2 + 20)

  // Dead zone indicator
  const deadZoneX = width / 2 - (vbe.value / 2) * scaleX
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 1
  ctx.setLineDash([3, 3])
  ctx.beginPath()
  ctx.moveTo(deadZoneX, 0)
  ctx.lineTo(deadZoneX, height)
  ctx.stroke()

  const deadZoneX2 = width / 2 + (vbe.value / 2) * scaleX
  ctx.beginPath()
  ctx.moveTo(deadZoneX2, 0)
  ctx.lineTo(deadZoneX2, height)
  ctx.stroke()
  ctx.setLineDash([])

  ctx.fillStyle = '#ef4444'
  ctx.fillText('Dead Zone', deadZoneX, height - 10)
}

// Animation loop
const animate = () => {
  if (!isRunning.value) return

  time.value += 0.05 * animationSpeed.value * (inputFrequency.value / 1000)

  if (waveformCanvas.value) {
    generateWaveforms(waveformCanvas.value)
  }
  if (transferCanvas.value) {
    drawTransferCharacteristic(transferCanvas.value)
  }

  animationId = requestAnimationFrame(animate)
}

// Controls
const toggleAnimation = () => {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    animate()
  }
}

const resetAnimation = () => {
  time.value = 0
}

// Lifecycle
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Class AB Amplifier Simulation
      </h1>
      <p class="text-gray-400">Explore push-pull amplifiers with reduced crossover distortion</p>
    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Controls Panel -->
      <div class="space-y-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold text-purple-400 mb-4">🎛️ Circuit Parameters</h2>

        <!-- Power Supply -->
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Supply Voltage (V<sub>CC</sub>): ±{{ vcc }}V
            </label>
            <input
              v-model.number="vcc"
              type="range"
              min="5"
              max="50"
              step="1"
              class="w-full accent-purple-500"
            />
          </div>
        </div>

        <!-- Bias Network -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-gray-300 mb-3">Bias Network</h3>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                R1: {{ r1 }}kΩ
              </label>
              <input
                v-model.number="r1"
                type="range"
                min="10"
                max="100"
                step="1"
                class="w-full accent-cyan-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                R2: {{ r2 }}kΩ
              </label>
              <input
                v-model.number="r2"
                type="range"
                min="10"
                max="100"
                step="1"
                class="w-full accent-cyan-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Emitter Resistor (R<sub>E</sub>): {{ re }}Ω
              </label>
              <input
                v-model.number="re"
                type="range"
                min="0.1"
                max="2"
                step="0.01"
                class="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <!-- Transistor Parameters -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-gray-300 mb-3">Transistor</h3>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Current Gain (β): {{ beta }}
              </label>
              <input
                v-model.number="beta"
                type="range"
                min="50"
                max="300"
                step="10"
                class="w-full accent-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                V<sub>BE</sub>: {{ vbe }}V
              </label>
              <input
                v-model.number="vbe"
                type="range"
                min="0.5"
                max="1.2"
                step="0.05"
                class="w-full accent-green-500"
              />
            </div>
          </div>
        </div>

        <!-- Signal Parameters -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-gray-300 mb-3">Input Signal</h3>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Amplitude: {{ inputAmplitude }}V
              </label>
              <input
                v-model.number="inputAmplitude"
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                class="w-full accent-orange-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Frequency: {{ inputFrequency }}Hz
              </label>
              <input
                v-model.number="inputFrequency"
                type="range"
                min="100"
                max="5000"
                step="100"
                class="w-full accent-orange-500"
              />
            </div>
          </div>
        </div>

        <!-- Animation Controls -->
        <div class="border-t border-slate-700 pt-4">
          <h3 class="text-sm font-medium text-gray-300 mb-3">Animation</h3>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Speed: {{ animationSpeed }}x
              </label>
              <input
                v-model.number="animationSpeed"
                type="range"
                min="0.25"
                max="3"
                step="0.25"
                class="w-full accent-pink-500"
              />
            </div>

            <div class="flex gap-2">
              <button
                @click="toggleAnimation"
                class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
              >
                {{ isRunning ? '⏸ Pause' : '▶ Play' }}
              </button>
              <button
                @click="resetAnimation"
                class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg text-white font-medium transition-colors"
              >
                ↺ Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Visualizations -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Waveform Display -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-pink-400 mb-4">📊 Waveform Display</h2>
          <div class="flex justify-center">
            <canvas
              ref="waveformCanvas"
              width="700"
              height="300"
              class="w-full rounded-lg border border-slate-600"
            ></canvas>
          </div>
          <div class="flex justify-center gap-6 mt-4 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-orange-500 rounded"></div>
              <span class="text-gray-400">Input (Vin)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 bg-pink-500 rounded"></div>
              <span class="text-gray-400">Output (Vout)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-1 border-t border-dashed border-green-500"></div>
              <span class="text-gray-400">Crossover</span>
            </div>
          </div>
        </div>

        <!-- Transfer Characteristic -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-purple-400 mb-4">📈 Transfer Characteristic</h2>
          <div class="flex justify-center">
            <canvas
              ref="transferCanvas"
              width="500"
              height="300"
              class="w-full max-w-lg rounded-lg border border-slate-600"
            ></canvas>
          </div>
        </div>

        <!-- Analysis Panel -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 class="text-xl font-semibold text-cyan-400 mb-4">🔬 Circuit Analysis</h2>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- Class Type -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Amplifier Class</div>
              <div class="text-2xl font-bold" :class="classABStatus.color">
                {{ classABStatus.text }}
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ classABStatus.description }}</div>
            </div>

            <!-- Quiescent Current -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Quiescent Current</div>
              <div class="text-2xl font-bold text-cyan-400">
                {{ quiescentCurrent.toFixed(3) }}A
              </div>
              <div class="text-xs text-gray-500 mt-1">
                I<sub>Q</sub> = (V<sub>B</sub> - V<sub>BE</sub>) / R<sub>E</sub>
              </div>
            </div>

            <!-- Max Output Swing -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Max Output Swing</div>
              <div class="text-2xl font-bold text-green-400">
                ±{{ maxOutputSwing.toFixed(1) }}V
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Peak-to-peak: {{ (2 * maxOutputSwing).toFixed(1) }}V
              </div>
            </div>

            <!-- Max Power -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Max Output Power</div>
              <div class="text-2xl font-bold text-orange-400">
                {{ maxPower.toFixed(2) }}W
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Theoretical into {{ rl }}Ω load
              </div>
            </div>

            <!-- Efficiency -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Efficiency</div>
              <div class="text-2xl font-bold text-purple-400">
                {{ efficiency.toFixed(1) }}%
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Class AB: typically 50-70%
              </div>
            </div>

            <!-- Voltage Gain -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Voltage Gain</div>
              <div class="text-2xl font-bold text-pink-400">
                {{ voltageGain.toFixed(2) }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Emitter follower ≈ 1
              </div>
            </div>

            <!-- Base Voltage -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Base Bias Voltage</div>
              <div class="text-2xl font-bold text-blue-400">
                {{ baseVoltage.toFixed(2) }}V
              </div>
              <div class="text-xs text-gray-500 mt-1">
                V<sub>B</sub> = V<sub>CC</sub> × R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)
              </div>
            </div>

            <!-- Crossover Voltage -->
            <div class="bg-slate-700/50 rounded-lg p-4">
              <div class="text-sm text-gray-400 mb-1">Crossover Point</div>
              <div class="text-2xl font-bold text-yellow-400">
                ±{{ crossoverVoltage.toFixed(2) }}V
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Region where neither transistor conducts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">🔌 Class AB Push-Pull Circuit</h2>
      <div class="flex justify-center">
        <svg viewBox="0 0 900 350" class="w-full max-w-5xl">
          <!-- Background -->
          <rect width="900" height="350" fill="#1e293b"/>

          <!-- Title -->
          <text x="450" y="30" fill="white" font-size="18" font-weight="bold" text-anchor="middle">
            Class AB Push-Pull Amplifier
          </text>

          <!-- VCC+ -->
          <text x="100" y="70" fill="#22c55e" font-size="14" font-weight="bold">+VCC</text>
          <text x="70" y="90" fill="#22c55e" font-size="12">(+{{ vcc }}V)</text>
          <circle cx="100" cy="100" r="8" fill="none" stroke="#22c55e" stroke-width="2"/>

          <!-- VCC- -->
          <text x="100" y="310" fill="#ef4444" font-size="14" font-weight="bold">-VCC</text>
          <text x="70" y="330" fill="#ef4444" font-size="12">(-{{ vcc }}V)</text>
          <circle cx="100" cy="300" r="8" fill="none" stroke="#ef4444" stroke-width="2"/>

          <!-- Bias Network (Voltage Divider) -->
          <line x1="100" y1="100" x2="200" y2="100" stroke="#22c55e" stroke-width="3"/>
          <line x1="200" y1="100" x2="200" y2="140" stroke="#22c55e" stroke-width="3"/>
          <line x1="200" y1="100" x2="300" y2="100" stroke="#22c55e" stroke-width="3"/>

          <!-- R1 -->
          <rect x="190" y="105" width="20" height="30" fill="#374151" stroke="#6b7280" stroke-width="2"/>
          <text x="200" y="125" fill="white" font-size="10" text-anchor="middle">R1</text>
          <text x="200" y="155" fill="#94a3b8" font-size="10" text-anchor="middle">{{ r1 }}kΩ</text>

          <!-- R2 -->
          <line x1="200" y1="170" x2="200" y2="200" stroke="#22c55e" stroke-width="3"/>
          <rect x="190" y="175" width="20" height="30" fill="#374151" stroke="#6b7280" stroke-width="2"/>
          <text x="200" y="195" fill="white" font-size="10" text-anchor="middle">R2</text>
          <text x="200" y="220" fill="#94a3b8" font-size="10" text-anchor="middle">{{ r2 }}kΩ</text>

          <!-- Ground reference -->
          <line x1="200" y1="200" x2="200" y2="230" stroke="#94a3b8" stroke-width="2"/>
          <line x1="185" y1="230" x2="215" y2="230" stroke="#94a3b8" stroke-width="2"/>
          <line x1="190" y1="235" x2="210" y2="235" stroke="#94a3b8" stroke-width="2"/>

          <!-- Bias to NPN base -->
          <line x1="200" y1="140" x2="350" y2="140" stroke="#22c55e" stroke-width="2"/>
          <line x1="350" y1="140" x2="350" y2="160" stroke="#22c55e" stroke-width="2"/>

          <!-- NPN Transistor (Q1) -->
          <circle cx="350" cy="180" r="25" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
          <text x="350" y="185" fill="white" font-size="12" font-weight="bold" text-anchor="middle">Q1</text>
          <text x="350" y="220" fill="#94a3b8" font-size="10" text-anchor="middle">NPN</text>

          <!-- NPN collector to VCC+ -->
          <line x1="350" y1="100" x2="350" y2="155" stroke="#22c55e" stroke-width="3"/>

          <!-- NPN emitter -->
          <line x1="350" y1="205" x2="350" y2="250" stroke="#22c55e" stroke-width="3"/>

          <!-- Emitter resistor RE -->
          <rect x="340" y="250" width="20" height="20" fill="#374151" stroke="#6b7280" stroke-width="2"/>
          <text x="350" y="265" fill="white" font-size="10" text-anchor="middle">RE</text>
          <text x="350" y="285" fill="#94a3b8" font-size="10" text-anchor="middle">{{ re }}Ω</text>

          <!-- To output -->
          <line x1="350" y1="270" x2="350" y2="290" stroke="#22c55e" stroke-width="3"/>

          <!-- Output node -->
          <circle cx="550" cy="290" r="8" fill="none" stroke="#ec4899" stroke-width="2"/>
          <text x="550" y="320" fill="#ec4899" font-size="12" font-weight="bold" text-anchor="middle">Output</text>

          <!-- PNP Transistor (Q2) - Mirror below -->
          <line x1="200" y1="140" x2="350" y2="140" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
          <line x1="350" y1="140" x2="750" y2="140" stroke="#ef4444" stroke-width="2"/>
          <line x1="750" y1="140" x2="750" y2="160" stroke="#ef4444" stroke-width="2"/>

          <circle cx="750" cy="180" r="25" fill="#5f1e1e" stroke="#ef4444" stroke-width="2"/>
          <text x="750" y="185" fill="white" font-size="12" font-weight="bold" text-anchor="middle">Q2</text>
          <text x="750" y="220" fill="#94a3b8" font-size="10" text-anchor="middle">PNP</text>

          <!-- PNP emitter to output -->
          <line x1="750" y1="205" x2="750" y2="290" stroke="#ef4444" stroke-width="3"/>

          <!-- PNP collector to VCC- -->
          <line x1="750" y1="205" x2="750" y2="300" stroke="#ef4444" stroke-width="3"/>

          <!-- Connect emitters to output -->
          <line x1="350" y1="290" x2="550" y2="290" stroke="#ec4899" stroke-width="3"/>
          <line x1="550" y1="290" x2="750" y2="290" stroke="#ec4899" stroke-width="3"/>

          <!-- Load resistor -->
          <line x1="550" y1="290" x2="550" y2="240" stroke="#ec4899" stroke-width="3"/>
          <rect x="540" y="200" width="20" height="40" fill="#374151" stroke="#6b7280" stroke-width="2"/>
          <text x="550" y="225" fill="white" font-size="10" text-anchor="middle">RL</text>
          <text x="550" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">{{ rl }}Ω</text>

          <!-- Input -->
          <circle cx="550" cy="140" r="8" fill="none" stroke="#f97316" stroke-width="2"/>
          <text x="550" y="125" fill="#f97316" font-size="12" font-weight="bold" text-anchor="middle">Input</text>

          <!-- Annotations -->
          <text x="450" y="40" fill="#94a3b8" font-size="12">
            Bias Voltage: {{ baseVoltage.toFixed(2) }}V | Quiescent Current: {{ quiescentCurrent.toFixed(3) }}A
          </text>

          <!-- Class AB indicator -->
          <text x="450" y="340" fill="#22c55e" font-size="14" font-weight="bold" text-anchor="middle">
            {{ classABStatus.text }} - {{ classABStatus.description }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h2 class="text-xl font-semibold text-purple-400 mb-4">📚 Class AB Amplifiers</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">How Class AB Works</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Class AB amplifiers combine the best of Class A and Class B. A small bias current keeps both transistors slightly conducting, eliminating crossover distortion while maintaining good efficiency. One transistor handles the positive half-cycle, the other handles the negative half-cycle.
            </p>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Crossover Distortion Elimination</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              In Class B amplifiers, there's a "dead zone" where neither transistor conducts near 0V. Class AB adds a small quiescent current (typically 5-50mA) to keep both transistors partially on, creating a smooth transition through zero.
            </p>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-blue-400 mb-2">Bias Network</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Resistors R1 and R2 form a voltage divider that sets the base bias voltage. The emitter resistor RE provides stability and helps set the quiescent current. The bias is adjusted to achieve the desired idle current.
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-green-400 mb-2">Advantages</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Near- Class A linearity</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Better efficiency than Class A (50-70%)</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">No crossover distortion</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Simple design</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-green-400">✓</span>
                <span class="text-gray-300">Good thermal balance</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-red-400 mb-2">Disadvantages</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-red-400">✗</span>
                <span class="text-gray-300">More complex than Class B</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400">✗</span>
                <span class="text-gray-300">Some quiescent power wasted</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-red-400">✗</span>
                <span class="text-gray-300">Thermal runaway risk (needs RE)</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-cyan-400 mb-2">Applications</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-purple-900/50 rounded text-xs text-gray-300">Audio Power Amps</span>
              <span class="px-2 py-1 bg-purple-900/50 rounded text-xs text-gray-300">RF Power Stages</span>
              <span class="px-2 py-1 bg-purple-900/50 rounded text-xs text-gray-300">Servo Drivers</span>
              <span class="px-2 py-1 bg-purple-900/50 rounded text-xs text-gray-300">Headphone Amps</span>
              <span class="px-2 py-1 bg-purple-900/50 rounded text-xs text-gray-300">Guitar Amps</span>
            </div>
          </div>

          <div class="bg-slate-700/30 rounded-lg p-4">
            <h3 class="font-semibold text-cyan-400 mb-2">Design Tips</h3>
            <div class="space-y-1 text-sm text-gray-300">
              <p>• Set quiescent current to 5-10% of max output</p>
              <p>• Use emitter resistors for thermal stability</p>
              <p>• Match transistor characteristics (β, VBE)</p>
              <p>• Include thermal protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

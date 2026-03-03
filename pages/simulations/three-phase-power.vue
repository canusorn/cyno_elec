<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Animation state
const isRunning = ref(true)
const animationFrame = ref(0)
const rotationAngle = ref(0)

// Input parameters
const voltage = ref(400) // Line-to-line voltage in volts
const frequency = ref(50) // Hz
const powerFactor = ref(0.85) // Lagging
const loadType = ref<'balanced' | 'unbalanced'>('balanced')
const phaseSequence = ref<'ABC' | 'ACB'>('ABC')
const animationSpeed = ref(1)

// Canvas setup
const canvasRef = ref<HTMLCanvasElement | null>(null)
const waveformCanvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let waveformCtx: CanvasRenderingContext2D | null = null
let animationId: number | null = null

// Computed values
const phaseVoltage = computed(() => voltage.value / Math.sqrt(3))
const lineCurrent = ref(10) // Amperes (balanced load)

// Calculate instantaneous voltage for each phase
const getPhaseVoltage = (phase: number, angle: number) => {
  const phaseShift = phaseSequence.value === 'ABC' ? [0, -2 * Math.PI / 3, 2 * Math.PI / 3] : [0, 2 * Math.PI / 3, -2 * Math.PI / 3]
  const phaseAngle = phaseShift[phase] + angle * (Math.PI / 180)
  return phaseVoltage.value * Math.cos(phaseAngle)
}

// Calculate power values
const apparentPower = computed(() => {
  const vl = voltage.value
  const il = lineCurrent.value
  return Math.sqrt(3) * vl * il / 1000 // kVA
})

const realPower = computed(() => {
  return apparentPower.value * powerFactor.value // kW
})

const reactivePower = computed(() => {
  const pf = powerFactor.value
  const q = apparentPower.value * Math.sqrt(1 - pf * pf)
  return q // kVAR
})

// Draw phasor diagram
const drawPhasorDiagram = () => {
  if (!ctx || !canvasRef.value) return

  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.35

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Draw background grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(centerX, 0)
  ctx.lineTo(centerX, height)
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()

  // Draw unit circle
  ctx.strokeStyle = '#4B5563'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()

  // Phase colors
  const colors = ['#EF4444', '#22C55E', '#3B82F6'] // Red, Green, Blue for phases A, B, C
  const phases = ['A', 'B', 'C']
  const phaseShifts = phaseSequence.value === 'ABC' 
    ? [0, -2 * Math.PI / 3, 2 * Math.PI / 3] 
    : [0, 2 * Math.PI / 3, -2 * Math.PI / 3]

  // Draw phasors
  phaseShifts.forEach((shift, i) => {
    const angle = shift + rotationAngle.value * (Math.PI / 180)
    const endX = centerX + radius * Math.cos(angle)
    const endY = centerY - radius * Math.sin(angle) // Flip Y for canvas

    // Draw phasor line
    ctx.strokeStyle = colors[i]
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // Draw arrow head
    const arrowSize = 15
    const arrowAngle = Math.atan2(centerY - endY, endX - centerX)
    ctx.fillStyle = colors[i]
    ctx.beginPath()
    ctx.moveTo(endX, endY)
    ctx.lineTo(
      endX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
      endY + arrowSize * Math.sin(arrowAngle - Math.PI / 6)
    )
    ctx.lineTo(
      endX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
      endY + arrowSize * Math.sin(arrowAngle + Math.PI / 6)
    )
    ctx.closePath()
    ctx.fill()

    // Draw phase label
    ctx.fillStyle = colors[i]
    ctx.font = 'bold 20px sans-serif'
    ctx.textAlign = 'center'
    const labelX = centerX + (radius + 30) * Math.cos(angle)
    const labelY = centerY - (radius + 30) * Math.sin(angle)
    ctx.fillText(`V${phases[i]}`, labelX, labelY)
  })

  // Draw voltage labels
  ctx.fillStyle = '#9CA3AF'
  ctx.font = '14px sans-serif'
  ctx.fillText(`${phaseVoltage.value.toFixed(0)}V (phase)`, centerX, height - 20)
  ctx.fillText(`${voltage.value}V (line)`, centerX, 20)
}

// Draw waveform diagram
const drawWaveforms = () => {
  if (!waveformCtx || !waveformCanvasRef.value) return

  const canvas = waveformCanvasRef.value
  const width = canvas.width
  const height = canvas.height
  const centerY = height / 2
  const amplitude = height * 0.35

  // Clear canvas
  waveformCtx.clearRect(0, 0, width, height)

  // Draw grid
  waveformCtx.strokeStyle = '#374151'
  waveformCtx.lineWidth = 1
  waveformCtx.beginPath()
  waveformCtx.moveTo(0, centerY)
  waveformCtx.lineTo(width, centerY)
  waveformCtx.stroke()

  // Draw center time line
  waveformCtx.strokeStyle = '#4B5563'
  waveformCtx.setLineDash([5, 5])
  waveformCtx.beginPath()
  waveformCtx.moveTo(width / 2, 0)
  waveformCtx.lineTo(width / 2, height)
  waveformCtx.stroke()
  waveformCtx.setLineDash([])

  const colors = ['#EF4444', '#22C55E', '#3B82F6']
  const phaseShifts = phaseSequence.value === 'ABC' 
    ? [0, -2 * Math.PI / 3, 2 * Math.PI / 3] 
    : [0, 2 * Math.PI / 3, -2 * Math.PI / 3]

  // Draw waveforms
  phaseShifts.forEach((shift, phaseIndex) => {
    waveformCtx.strokeStyle = colors[phaseIndex]
    waveformCtx.lineWidth = 2
    waveformCtx.beginPath()

    for (let x = 0; x < width; x++) {
      const angle = (x / width) * 4 * Math.PI + shift + rotationAngle.value * (Math.PI / 180)
      const y = centerY - amplitude * Math.sin(angle)
      
      if (x === 0) {
        waveformCtx.moveTo(x, y)
      } else {
        waveformCtx.lineTo(x, y)
      }
    }
    
    waveformCtx.stroke()
  })

  // Draw time labels
  waveformCtx.fillStyle = '#9CA3AF'
  waveformCtx.font = '12px sans-serif'
  waveformCtx.textAlign = 'center'
  waveformCtx.fillText('0', width / 2, height - 5)
  waveformCtx.fillText('-T', width * 0.25, height - 5)
  waveformCtx.fillText('+T', width * 0.75, height - 5)
}

// Animation loop
const animate = () => {
  if (isRunning.value) {
    rotationAngle.value = (rotationAngle.value + frequency.value * animationSpeed.value * 0.05) % 360
    drawPhasorDiagram()
    drawWaveforms()
  }
  animationId = requestAnimationFrame(animate)
}

// Lifecycle
onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    // Set canvas size for high DPI
    const dpr = window.devicePixelRatio || 1
    canvasRef.value.width = canvasRef.value.offsetWidth * dpr
    canvasRef.value.height = canvasRef.value.offsetHeight * dpr
    ctx.scale(dpr, dpr)
    canvasRef.value.width = canvasRef.value.offsetWidth
    canvasRef.value.height = canvasRef.value.offsetHeight
  }
  
  if (waveformCanvasRef.value) {
    waveformCtx = waveformCanvasRef.value.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    waveformCanvasRef.value.width = waveformCanvasRef.value.offsetWidth * dpr
    waveformCanvasRef.value.height = waveformCanvasRef.value.offsetHeight * dpr
    waveformCtx.scale(dpr, dpr)
    waveformCanvasRef.value.width = waveformCanvasRef.value.offsetWidth
    waveformCanvasRef.value.height = waveformCanvasRef.value.offsetHeight
  }

  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const toggleAnimation = () => {
  isRunning.value = !isRunning.value
}

const resetAnimation = () => {
  rotationAngle.value = 0
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Three-Phase Power System
        </h1>
        <p class="text-gray-400">Interactive visualization of balanced three-phase electrical systems</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Controls Panel -->
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-4 text-yellow-400">⚙️ Parameters</h2>
          
          <!-- Line Voltage -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Line Voltage (VLL)</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="voltage" 
                type="range" 
                min="208" 
                max="480" 
                step="1"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[80px] text-center">{{ voltage }}V</span>
            </div>
          </div>

          <!-- Frequency -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Frequency</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="frequency" 
                type="range" 
                min="50" 
                max="60" 
                step="1"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[80px] text-center">{{ frequency }}Hz</span>
            </div>
          </div>

          <!-- Line Current -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Line Current</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="lineCurrent" 
                type="range" 
                min="1" 
                max="100" 
                step="0.5"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[80px] text-center">{{ lineCurrent }}A</span>
            </div>
          </div>

          <!-- Power Factor -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Power Factor</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="powerFactor" 
                type="range" 
                min="0.5" 
                max="1" 
                step="0.01"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[80px] text-center">{{ powerFactor.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ powerFactor < 1 ? 'Lagging' : 'Unity' }}</p>
          </div>

          <!-- Phase Sequence -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-2">Phase Sequence</label>
            <div class="flex gap-2">
              <button 
                @click="phaseSequence = 'ABC'"
                :class="['flex-1 py-2 px-4 rounded-lg transition-all', phaseSequence === 'ABC' ? 'bg-yellow-500 text-black font-semibold' : 'bg-gray-700 hover:bg-gray-600']"
              >
                ABC
              </button>
              <button 
                @click="phaseSequence = 'ACB'"
                :class="['flex-1 py-2 px-4 rounded-lg transition-all', phaseSequence === 'ACB' ? 'bg-yellow-500 text-black font-semibold' : 'bg-gray-700 hover:bg-gray-600']"
              >
                ACB
              </button>
            </div>
          </div>

          <!-- Animation Speed -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Animation Speed</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="animationSpeed" 
                type="range" 
                min="0.25" 
                max="2" 
                step="0.25"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[80px] text-center">{{ animationSpeed }}x</span>
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="flex gap-2 mb-4">
            <button 
              @click="toggleAnimation"
              class="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-semibold"
            >
              {{ isRunning ? '⏸️ Pause' : '▶️ Play' }}
            </button>
            <button 
              @click="resetAnimation"
              class="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-500 transition-all font-semibold"
            >
              🔄 Reset
            </button>
          </div>

          <!-- Live Calculations -->
          <div class="border-t border-gray-600 pt-4">
            <h3 class="text-lg font-semibold mb-3 text-green-400">📊 Power Calculations</h3>
            
            <div class="space-y-3">
              <div class="bg-gray-700/50 rounded-lg p-3">
                <div class="text-sm text-gray-400">Phase Voltage (VP)</div>
                <div class="text-2xl font-bold text-yellow-400">{{ phaseVoltage.toFixed(1) }}V</div>
                <div class="text-xs text-gray-500">VLL ÷ √3</div>
              </div>

              <div class="bg-gray-700/50 rounded-lg p-3">
                <div class="text-sm text-gray-400">Apparent Power (S)</div>
                <div class="text-2xl font-bold text-blue-400">{{ apparentPower.toFixed(2) }} kVA</div>
                <div class="text-xs text-gray-500">√3 × VLL × IL</div>
              </div>

              <div class="bg-gray-700/50 rounded-lg p-3">
                <div class="text-sm text-gray-400">Real Power (P)</div>
                <div class="text-2xl font-bold text-green-400">{{ realPower.toFixed(2) }} kW</div>
                <div class="text-xs text-gray-500">S × PF</div>
              </div>

              <div class="bg-gray-700/50 rounded-lg p-3">
                <div class="text-sm text-gray-400">Reactive Power (Q)</div>
                <div class="text-2xl font-bold text-purple-400">{{ reactivePower.toFixed(2) }} kVAR</div>
                <div class="text-xs text-gray-500">S × sin(θ)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visualization Area -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Phasor Diagram -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📐 Phasor Diagram</h2>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <canvas 
                ref="canvasRef" 
                class="w-full"
                style="height: 400px;"
              ></canvas>
            </div>
            <div class="mt-3 flex justify-center gap-6 text-sm">
              <span class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500"></span> Phase A
              </span>
              <span class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-green-500"></span> Phase B
              </span>
              <span class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-500"></span> Phase C
              </span>
            </div>
          </div>

          <!-- Waveform Diagram -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">🌊 Waveform Display</h2>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <canvas 
                ref="waveformCanvasRef" 
                class="w-full"
                style="height: 250px;"
              ></canvas>
            </div>
            <p class="text-xs text-gray-500 mt-2 text-center">Three-phase sinusoidal voltages showing 120° phase separation</p>
          </div>

          <!-- Power Triangle -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📐 Power Triangle</h2>
            <div class="flex justify-center items-center py-4">
              <svg width="300" height="250" viewBox="0 0 300 250">
                <!-- Grid background -->
                <defs>
                  <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="300" height="250" fill="url(#smallGrid)" opacity="0.3"/>
                
                <!-- Power triangle -->
                <!-- P (Real Power) - Horizontal -->
                <line x1="50" y1="200" x2="250" y2="200" stroke="#22C55E" stroke-width="4" stroke-linecap="round"/>
                <text x="150" y="225" text-anchor="middle" fill="#22C55E" font-size="14" font-weight="bold">P = {{ realPower.toFixed(2) }} kW</text>
                
                <!-- Q (Reactive Power) - Vertical -->
                <line x1="250" y1="200" x2="250" y2="50" stroke="#A855F7" stroke-width="4" stroke-linecap="round"/>
                <text x="270" y="125" text-anchor="middle" fill="#A855F7" font-size="14" font-weight="bold" transform="rotate(90, 270, 125)">Q = {{ reactivePower.toFixed(2) }} kVAR</text>
                
                <!-- S (Apparent Power) - Hypotenuse -->
                <line x1="50" y1="200" x2="250" y2="50" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>
                <text x="160" y="115" text-anchor="middle" fill="#3B82F6" font-size="14" font-weight="bold">S = {{ apparentPower.toFixed(2) }} kVA</text>
                
                <!-- Angle theta -->
                <path d="M 100 200 A 50 50 0 0 0 95 173" fill="none" stroke="#FBBF24" stroke-width="2"/>
                <text x="110" y="190" fill="#FBBF24" font-size="12">θ = {{ (Math.acos(powerFactor) * 180 / Math.PI).toFixed(1) }}°</text>
                
                <!-- Power factor label -->
                <text x="150" y="30" text-anchor="middle" fill="#FBBF24" font-size="12">PF = cos(θ) = {{ powerFactor.toFixed(3) }}</text>
              </svg>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📚 Three-Phase Theory</h2>
            
            <div class="space-y-4 text-sm">
              <div>
                <h3 class="font-semibold text-green-400 mb-1">What is Three-Phase Power?</h3>
                <p class="text-gray-300">
                  Three-phase electric power is a common method of alternating current electric power generation, transmission, and distribution. It uses three conductors (or four with neutral) carrying three sinusoidal voltages that are 120° out of phase with each other.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-green-400 mb-1">Key Relationships</h3>
                <ul class="text-gray-300 space-y-1 ml-4">
                  <li>• <strong>Phase Voltage:</strong> VP = VLL ÷ √3 (for Wye connection)</li>
                  <li>• <strong>Line Current = Phase Current</strong> (for Wye connection)</li>
                  <li>• <strong>Apparent Power:</strong> S = √3 × VLL × IL</li>
                  <li>• <strong>Real Power:</strong> P = √3 × VLL × IL × PF</li>
                  <li>• <strong>Reactive Power:</strong> Q = √3 × VLL × IL × sin(θ)</li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-green-400 mb-1">Advantages of Three-Phase</h3>
                <ul class="text-gray-300 space-y-1 ml-4">
                  <li>• More efficient power transmission than single-phase</li>
                  <li>• Constant power transfer (smoother torque in motors)</li>
                  <li>• Less conductor material for the same power capacity</li>
                  <li>• Self-starting for three-phase motors</li>
                  <li>• Two voltages available (line-to-line and line-to-neutral)</li>
                </ul>
              </div>

              <div>
                <h3 class="font-semibold text-green-400 mb-1">Phase Sequence</h3>
                <p class="text-gray-300">
                  The order in which the voltages reach their peak values is called phase sequence. ABC sequence means Phase A peaks first, followed by B (120° later), then C (another 120°). ACB is the reverse sequence. Phase sequence is critical for proper motor rotation.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-green-400 mb-1">Common Applications</h3>
                <ul class="text-gray-300 space-y-1 ml-4">
                  <li>• Industrial motors and machinery</li>
                  <li>• Power transmission and distribution grids</li>
                  <li>• Large commercial buildings</li>
                  <li>• Data centers and server farms</li>
                  <li>• Electric vehicle charging stations</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

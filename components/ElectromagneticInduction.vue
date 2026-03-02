<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <svg class="w-7 h-7 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      Electromagnetic Induction Simulator
    </h2>

    <!-- Experiment Type Selection -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Select Experiment
      </label>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          v-for="exp in experiments"
          :key="exp.value"
          @click="experimentType = exp.value"
          :class="[
            'px-4 py-3 rounded-lg font-medium transition-all text-left',
            experimentType === exp.value
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          <div class="font-bold">{{ exp.label }}</div>
          <div class="text-xs opacity-75">{{ exp.description }}</div>
        </button>
      </div>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Number of Turns -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Number of Turns (N): {{ numTurns }}
        </label>
        <input
          v-model.number="numTurns"
          type="range"
          min="1"
          max="100"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <!-- Magnetic Field Strength -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Magnetic Field (B): {{ magneticField }} T
        </label>
        <input
          v-model.number="magneticField"
          type="range"
          min="0"
          max="2"
          step="0.01"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <!-- Area -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Area (A): {{ area }} m²
        </label>
        <input
          v-model.number="area"
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <!-- Angular Velocity -->
      <div v-if="experimentType === 'faraday'">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Angular Velocity (ω): {{ angularVelocity }} rad/s
        </label>
        <input
          v-model.number="angularVelocity"
          type="range"
          min="0"
          max="20"
          step="0.5"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <!-- Velocity (for moving magnet) -->
      <div v-if="experimentType === 'movingMagnet'">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Velocity (v): {{ velocity }} m/s
        </label>
        <input
          v-model.number="velocity"
          type="range"
          min="0"
          max="10"
          step="0.1"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>

    <!-- Animation Controls -->
    <div class="flex gap-4 mb-6">
      <button
        @click="toggleAnimation"
        :class="[
          'px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2',
          isAnimating
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        ]"
      >
        <svg v-if="!isAnimating" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        {{ isAnimating ? 'Pause' : 'Start Animation' }}
      </button>

      <button
        @click="resetSimulation"
        class="px-6 py-3 rounded-lg font-bold bg-gray-500 hover:bg-gray-600 text-white transition-all"
      >
        Reset
      </button>
    </div>

    <!-- Real-time Results -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Calculated Values -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Real-time Measurements</h3>

        <div class="space-y-4">
          <div v-if="experimentType === 'faraday'">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Induced EMF (ε):</span>
              <span class="text-2xl font-bold text-primary">{{ inducedEMF.toFixed(4) }} V</span>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ε = N × B × A × ω × sin(ωt)
            </div>
          </div>

          <div v-if="experimentType === 'lenz'">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Change in Flux (dΦ/dt):</span>
              <span class="text-2xl font-bold text-primary">{{ fluxChange.toFixed(6) }} Wb/s</span>
            </div>
            <div class="flex justify-between items-center mt-3">
              <span class="text-gray-700 dark:text-gray-300">Induced Current Direction:</span>
              <span :class="['text-lg font-bold', currentDirectionColor]">
                {{ currentDirection }}
              </span>
            </div>
          </div>

          <div v-if="experimentType === 'movingMagnet'">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Induced EMF (ε):</span>
              <span class="text-2xl font-bold text-primary">{{ movingEMF.toFixed(4) }} V</span>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ε = -N × (dΦ/dt) = -N × B × L × v
            </div>
          </div>

          <div class="border-t border-gray-300 dark:border-gray-600 pt-4 mt-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Magnetic Flux (Φ):</span>
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ magneticFlux.toFixed(4) }} Wb</span>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Φ = B × A × cos(θ)
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Time:</span>
              <span class="text-lg font-mono text-gray-900 dark:text-white">{{ time.toFixed(2) }} s</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Formula Reference -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📚 Key Formulas</h3>

        <div class="space-y-3 text-sm">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div class="font-bold text-gray-900 dark:text-white mb-1">Faraday's Law:</div>
            <div class="font-mono text-gray-700 dark:text-gray-300">
              ε = -N × (dΦ/dt)
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div class="font-bold text-gray-900 dark:text-white mb-1">Magnetic Flux:</div>
            <div class="font-mono text-gray-700 dark:text-gray-300">
              Φ = B × A × cos(θ)
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div class="font-bold text-gray-900 dark:text-white mb-1">Lenz's Law:</div>
            <div class="text-gray-700 dark:text-gray-300">
              The induced current creates a magnetic field that opposes the change in flux.
            </div>
          </div>

          <div v-if="experimentType === 'faraday'" class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div class="font-bold text-gray-900 dark:text-white mb-1">Rotating Coil:</div>
            <div class="font-mono text-gray-700 dark:text-gray-300">
              ε = N × B × A × ω × sin(ωt)
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualization Canvas -->
    <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🎬 Simulation Visualization</h3>
      <div class="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <canvas ref="simCanvas" class="w-full" style="height: 400px;"></canvas>
      </div>
    </div>

    <!-- Waveform Chart -->
    <div v-if="experimentType === 'faraday'" class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 EMF Waveform</h3>
      <div class="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <canvas ref="waveCanvas" class="w-full" style="height: 250px;"></canvas>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Understanding Electromagnetic Induction</h3>

      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div v-if="experimentType === 'faraday'">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🔄 Faraday's Law - Rotating Coil</h4>
          <p class="text-sm mb-2">
            When a coil rotates in a magnetic field, the magnetic flux through it changes continuously. 
            This changing flux induces an electromotive force (EMF) in the coil.
          </p>
          <p class="text-sm">
            The EMF is sinusoidal, reaching maximum when the coil cuts through magnetic field lines perpendicularly, 
            and zero when the coil is parallel to the field. This is the principle behind AC generators!
          </p>
        </div>

        <div v-if="experimentType === 'lenz'">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🧲 Lenz's Law - Opposing Change</h4>
          <p class="text-sm mb-2">
            Lenz's law states that the direction of induced current is such that it creates a magnetic field 
            that opposes the change in magnetic flux that produced it.
          </p>
          <p class="text-sm">
            This is a consequence of conservation of energy. If the induced field reinforced the change, 
            it would create more current, which would create more field, leading to infinite energy!
          </p>
        </div>

        <div v-if="experimentType === 'movingMagnet'">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">⚡ Moving Magnet</h4>
          <p class="text-sm mb-2">
            When a magnet moves towards or away from a coil, the magnetic flux through the coil changes. 
            The faster the magnet moves, the greater the induced EMF.
          </p>
          <p class="text-sm">
            This is how induction sensors, guitar pickups, and many other devices work. 
            The relative motion between the magnet and conductor is what matters!
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🎯 Key Concepts:</h4>
          <ul class="list-disc pl-6 text-sm space-y-1">
            <li><strong>Magnetic Flux (Φ):</strong> Measure of magnetic field through a surface</li>
            <li><strong>Induced EMF (ε):</strong> Voltage generated by changing magnetic flux</li>
            <li><strong>Faraday's Law:</strong> ε = -N(dΦ/dt) - the magnitude depends on rate of change</li>
            <li><strong>Lenz's Law:</strong> The negative sign means induced effects oppose the change</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🔌 Real-World Applications:</h4>
          <ul class="list-disc pl-6 text-sm space-y-1">
            <li>Electrical generators (power plants)</li>
            <li>Transformers (voltage conversion)</li>
            <li>Induction cooktops</li>
            <li>Wireless charging pads</li>
            <li>Magnetic stripe cards</li>
            <li>Guitar pickups and microphones</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const experimentType = ref('faraday')
const numTurns = ref(50)
const magneticField = ref(0.5)
const area = ref(0.1)
const angularVelocity = ref(5)
const velocity = ref(2)

const isAnimating = ref(false)
const time = ref(0)
const angle = ref(0)

const simCanvas = ref(null)
const waveCanvas = ref(null)
let animationId = null
let simCtx = null
let waveCtx = null
const waveformData = []

const experiments = [
  { value: 'faraday', label: 'Faraday\'s Law', description: 'Rotating coil generator' },
  { value: 'lenz', label: 'Lenz\'s Law', description: 'Opposing magnetic field' },
  { value: 'movingMagnet', label: 'Moving Magnet', description: 'Relative motion induction' }
]

const magneticFlux = computed(() => {
  return magneticField.value * area.value * Math.cos(angle.value)
})

const inducedEMF = computed(() => {
  if (experimentType.value === 'faraday') {
    // ε = N × B × A × ω × sin(ωt)
    return numTurns.value * magneticField.value * area.value * angularVelocity.value * Math.sin(angle.value)
  }
  return 0
})

const fluxChange = computed(() => {
  // Rate of change of flux
  return numTurns.value * magneticField.value * area.value * angularVelocity.value * Math.sin(angle.value)
})

const currentDirection = computed(() => {
  const emf = inducedEMF.value
  if (Math.abs(emf) < 0.001) return 'No current'
  return emf > 0 ? 'Clockwise ↻' : 'Counter-clockwise ↺'
})

const currentDirectionColor = computed(() => {
  const emf = inducedEMF.value
  if (Math.abs(emf) < 0.001) return 'text-gray-500'
  return emf > 0 ? 'text-green-500' : 'text-red-500'
})

const movingEMF = computed(() => {
  if (experimentType.value === 'movingMagnet') {
    // Simplified model: ε ∝ B × v
    return numTurns.value * magneticField.value * area.value * velocity.value
  }
  return 0
})

function toggleAnimation() {
  isAnimating.value = !isAnimating.value
  if (isAnimating.value) {
    animate()
  } else {
    cancelAnimationFrame(animationId)
  }
}

function resetSimulation() {
  time.value = 0
  angle.value = 0
  waveformData.length = 0
  drawSimulation()
}

function animate() {
  if (!isAnimating.value) return

  const dt = 0.016 // ~60fps
  time.value += dt
  angle.value += angularVelocity.value * dt

  // Store waveform data
  if (experimentType.value === 'faraday') {
    waveformData.push({ t: time.value, emf: inducedEMF.value })
    if (waveformData.length > 300) {
      waveformData.shift()
    }
  }

  drawSimulation()
  drawWaveform()

  animationId = requestAnimationFrame(animate)
}

function drawSimulation() {
  if (!simCanvas.value) return

  const canvas = simCanvas.value
  const ctx = simCtx || canvas.getContext('2d')
  if (!simCtx) simCtx = ctx

  const width = canvas.width = canvas.offsetWidth
  const height = canvas.height = 400

  // Clear canvas
  ctx.fillStyle = '#1f2937'
  ctx.fillRect(0, 0, width, height)

  if (experimentType.value === 'faraday') {
    drawFaradayExperiment(ctx, width, height)
  } else if (experimentType.value === 'lenz') {
    drawLenzExperiment(ctx, width, height)
  } else {
    drawMovingMagnetExperiment(ctx, width, height)
  }
}

function drawFaradayExperiment(ctx, width, height) {
  const centerX = width / 2
  const centerY = height / 2

  // Draw magnetic field lines (background)
  ctx.strokeStyle = '#4b5563'
  ctx.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    const y = centerY - 150 + i * 35
    ctx.beginPath()
    ctx.moveTo(centerX - 200, y)
    ctx.lineTo(centerX + 200, y)
    ctx.stroke()

    // Arrow heads
    ctx.fillStyle = '#6b7280'
    for (let x = centerX - 150; x < centerX + 150; x += 100) {
      ctx.beginPath()
      ctx.moveTo(x + 10, y)
      ctx.lineTo(x, y - 5)
      ctx.lineTo(x, y + 5)
      ctx.fill()
    }
  }

  // Field labels
  ctx.fillStyle = '#9ca3af'
  ctx.font = '14px sans-serif'
  ctx.fillText('B (Magnetic Field)', centerX - 50, 30)

  // Draw rotating coil
  const coilWidth = 120
  const coilHeight = 80 * Math.cos(angle.value)

  ctx.strokeStyle = '#9FA8DA'
  ctx.lineWidth = 4
  ctx.beginPath()

  // Coil as ellipse viewed from side
  const perspective = 0.3
  const rx = coilWidth / 2
  const ry = Math.abs(coilHeight / 2)

  ctx.ellipse(centerX, centerY, rx, Math.max(ry, 10), 0, 0, 2 * Math.PI)
  ctx.stroke()

  // Draw turns
  ctx.strokeStyle = '#7986CB'
  ctx.lineWidth = 2
  for (let i = 0; i < Math.min(numTurns.value, 20); i++) {
    const offset = (i - 10) * 3
    ctx.beginPath()
    ctx.ellipse(centerX + offset, centerY, rx, Math.max(ry, 10), 0, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // Draw rotation arrow
  const emf = inducedEMF.value
  const arrowColor = Math.abs(emf) > 0.01 ? (emf > 0 ? '#10b981' : '#ef4444') : '#6b7280'

  ctx.strokeStyle = arrowColor
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(centerX + rx + 30, centerY, 25, -Math.PI / 2, angle.value - Math.PI / 2)
  ctx.stroke()

  // Arrow head
  const arrowX = centerX + rx + 30 + 25 * Math.cos(angle.value - Math.PI / 2)
  const arrowY = centerY + 25 * Math.sin(angle.value - Math.PI / 2)
  ctx.fillStyle = arrowColor
  ctx.beginPath()
  ctx.moveTo(arrowX, arrowY)
  ctx.lineTo(arrowX - 10 * Math.cos(angle.value - Math.PI / 2 - 0.3), arrowY - 10 * Math.sin(angle.value - Math.PI / 2 - 0.3))
  ctx.lineTo(arrowX - 10 * Math.cos(angle.value - Math.PI / 2 + 0.3), arrowY - 10 * Math.sin(angle.value - Math.PI / 2 + 0.3))
  ctx.fill()

  // Labels
  ctx.fillStyle = '#f3f4f6'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('Rotating Coil', centerX - 50, centerY - 100)

  // Draw induced EMF indicator
  ctx.fillStyle = arrowColor
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(`ε = ${emf.toFixed(3)} V`, centerX - 50, centerY + 120)

  // Draw angle indicator
  ctx.fillStyle = '#9ca3af'
  ctx.font = '14px sans-serif'
  ctx.fillText(`θ = ${(angle.value % (2 * Math.PI)).toFixed(2)} rad`, centerX - 40, centerY + 150)
}

function drawLenzExperiment(ctx, width, height) {
  const centerX = width / 2
  const centerY = height / 2

  // Draw coil (top view)
  ctx.strokeStyle = '#9FA8DA'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(centerX, centerY, 80, 0, 2 * Math.PI)
  ctx.stroke()

  // Draw turns
  ctx.strokeStyle = '#7986CB'
  ctx.lineWidth = 2
  for (let i = 1; i < Math.min(numTurns.value / 5, 10); i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 80 + i * 5, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // Draw magnetic field (changing)
  const fieldIntensity = (Math.sin(time.value * 2) + 1) / 2
  const fieldColor = `rgba(75, 85, 99, ${fieldIntensity})`

  ctx.fillStyle = fieldColor
  ctx.beginPath()
  ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI)
  ctx.fill()

  // Draw field direction indicator
  ctx.fillStyle = '#f3f4f6'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('B Field (Changing)', centerX - 60, centerY - 100)

  // Draw induced current direction
  const emf = fluxChange.value
  const currentColor = Math.abs(emf) > 0.01 ? (emf > 0 ? '#10b981' : '#ef4444') : '#6b7280'

  // Current arrow around coil
  ctx.strokeStyle = currentColor
  ctx.lineWidth = 4
  ctx.setLineDash([10, 5])
  ctx.beginPath()
  ctx.arc(centerX, centerY, 100, 0, emf > 0 ? Math.PI * 1.5 : -Math.PI * 0.5, emf > 0 ? false : true)
  ctx.stroke()
  ctx.setLineDash([])

  // Arrow head
  const arrowAngle = emf > 0 ? Math.PI * 1.5 : -Math.PI * 0.5
  const arrowX = centerX + 100 * Math.cos(arrowAngle)
  const arrowY = centerY + 100 * Math.sin(arrowAngle)
  ctx.fillStyle = currentColor
  ctx.beginPath()
  ctx.moveTo(arrowX, arrowY)
  const headAngle = emf > 0 ? arrowAngle - 0.3 : arrowAngle + 0.3
  ctx.lineTo(arrowX - 15 * Math.cos(headAngle), arrowY - 15 * Math.sin(headAngle))
  ctx.lineTo(arrowX - 15 * Math.cos(headAngle + (emf > 0 ? 0.6 : -0.6)), arrowY - 15 * Math.sin(headAngle + (emf > 0 ? 0.6 : -0.6)))
  ctx.fill()

  // Labels
  ctx.fillStyle = currentColor
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(currentDirection.value, centerX - 50, centerY + 130)

  ctx.fillStyle = '#9ca3af'
  ctx.font = '14px sans-serif'
  ctx.fillText('Induced current opposes change', centerX - 80, centerY + 160)
}

function drawMovingMagnetExperiment(ctx, width, height) {
  const centerX = width / 2
  const centerY = height / 2

  // Draw coil (side view)
  ctx.strokeStyle = '#9FA8DA'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.ellipse(centerX, centerY + 50, 60, 20, 0, 0, 2 * Math.PI)
  ctx.stroke()

  // Draw turns
  ctx.strokeStyle = '#7986CB'
  ctx.lineWidth = 2
  for (let i = 0; i < Math.min(numTurns.value / 3, 10); i++) {
    ctx.beginPath()
    ctx.ellipse(centerX, centerY + 50 - i * 3, 60, 20, 0, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // Draw magnet (moving)
  const magnetX = centerX - 150 + 50 * Math.sin(time.value * velocity.value)
  const magnetY = centerY + 50

  // Magnet body
  ctx.fillStyle = '#ef4444'
  ctx.fillRect(magnetX - 40, magnetY - 15, 40, 30)
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(magnetX, magnetY - 15, 40, 30)

  // Magnet labels
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('N', magnetX - 30, magnetY + 5)
  ctx.fillText('S', magnetX + 10, magnetY + 5)

  // Motion arrow
  const motionDir = Math.cos(time.value * velocity.value)
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(magnetX - 60, magnetY)
  ctx.lineTo(magnetX - 60 + motionDir * 40, magnetY)
  ctx.stroke()

  // Arrow head
  ctx.fillStyle = '#fbbf24'
  ctx.beginPath()
  const arrowX = magnetX - 60 + motionDir * 40
  ctx.moveTo(arrowX, magnetY)
  ctx.lineTo(arrowX - motionDir * 10, magnetY - 8)
  ctx.lineTo(arrowX - motionDir * 10, magnetY + 8)
  ctx.fill()

  // Draw magnetic field lines from magnet
  ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)'
  ctx.lineWidth = 1
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath()
    ctx.moveTo(magnetX + 40, magnetY + i * 10)
    ctx.quadraticCurveTo(centerX, magnetY + i * 20, centerX + 60, magnetY + 50)
    ctx.stroke()
  }

  // Labels
  ctx.fillStyle = '#f3f4f6'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText('Moving Magnet', magnetX - 40, magnetY - 40)

  ctx.fillStyle = '#10b981'
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(`ε = ${movingEMF.value.toFixed(3)} V`, centerX - 50, centerY + 130)

  ctx.fillStyle = '#9ca3af'
  ctx.font = '14px sans-serif'
  ctx.fillText(`v = ${velocity.value} m/s`, centerX - 30, centerY + 160)
}

function drawWaveform() {
  if (!waveCanvas.value || waveformData.length < 2) return

  const canvas = waveCanvas.value
  const ctx = waveCtx || canvas.getContext('2d')
  if (!waveCtx) waveCtx = ctx

  const width = canvas.width = canvas.offsetWidth
  const height = canvas.height = 250

  // Clear canvas
  ctx.fillStyle = '#1f2937'
  ctx.fillRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  for (let y = 0; y < height; y += 50) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Find time range
  const minTime = waveformData[0].t
  const maxTime = waveformData[waveformData.length - 1].t
  const timeRange = maxTime - minTime || 1

  // Find max EMF for scaling
  const maxEMF = Math.max(...waveformData.map(d => Math.abs(d.emf)), 0.1)

  // Draw waveform
  ctx.strokeStyle = '#9FA8DA'
  ctx.lineWidth = 3
  ctx.beginPath()

  waveformData.forEach((point, i) => {
    const x = ((point.t - minTime) / timeRange) * (width - 40) + 20
    const y = height / 2 - (point.emf / maxEMF) * (height / 2 - 20)

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw center line
  ctx.strokeStyle = '#6b7280'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(20, height / 2)
  ctx.lineTo(width - 20, height / 2)
  ctx.stroke()
  ctx.setLineDash([])

  // Labels
  ctx.fillStyle = '#9ca3af'
  ctx.font = '12px sans-serif'
  ctx.fillText('Time →', width - 60, height - 10)

  ctx.save()
  ctx.translate(10, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('EMF (V)', 0, 0)
  ctx.restore()
}

onMounted(() => {
  drawSimulation()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})

watch([experimentType, numTurns, magneticField, area, angularVelocity, velocity], () => {
  if (!isAnimating.value) {
    drawSimulation()
  }
})
</script>

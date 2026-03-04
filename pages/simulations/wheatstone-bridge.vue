<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const animationId = ref<number | null>(null)
const isRunning = ref(true)
const time = ref(0)

// Bridge resistors (Ohms)
const r1 = ref(100)
const r2 = ref(100)
const r3 = ref(100)
const r4 = ref(100)

// Source voltage
const vSource = ref(10)

// Animation speed
const animSpeed = ref(1)

// Galvanometer sensitivity
const sensitivity = ref(50) // μA per volt imbalance

// Calculate bridge parameters
const ratioLeft = computed(() => r1.value / r2.value)
const ratioRight = computed(() => r4.value / r3.value)
const isBalanced = computed(() => {
  return Math.abs(ratioLeft.value - ratioRight.value) < 0.001
})

// Bridge voltage (Vb - Va)
const vBridge = computed(() => {
  const va = vSource.value * r2.value / (r1.value + r2.value)
  const vb = vSource.value * r3.value / (r4.value + r3.value)
  return vb - va
})

// Galvanometer current (assuming internal resistance of galvanometer)
const galvanometerCurrent = computed(() => {
  const rGalvanometer = 100 // Internal resistance
  return vBridge.value / rGalvanometer * 1e6 // Convert to μA
})

// Galvanometer deflection (-50 to +50 degrees)
const deflection = computed(() => {
  const maxDeflection = 50
  const current = galvanometerCurrent.value
  const defl = current * sensitivity.value / 1000
  return Math.max(-maxDeflection, Math.min(maxDeflection, defl))
})

// Bridge currents
const iTotal = computed(() => {
  const rLeft = r1.value + r2.value
  const rRight = r4.value + r3.value
  const rParallel = (rLeft * rRight) / (rLeft + rRight)
  return vSource.value / rParallel
})

const iLeft = computed(() => vSource.value / (r1.value + r2.value))
const iRight = computed(() => vSource.value / (r4.value + r3.value))

// Voltage at each node
const va = computed(() => vSource.value * r2.value / (r1.value + r2.value))
const vb = computed(() => vSource.value * r3.value / (r4.value + r3.value))

// Canvas setup
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

function initCanvas() {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()
  }
}

function resizeCanvas() {
  if (canvasRef.value) {
    canvasRef.value.width = canvasRef.value.offsetWidth * 2
    canvasRef.value.height = 400 * 2
  }
}

function animate() {
  if (!isRunning.value || !ctx.value || !canvasRef.value) return
  
  const context = ctx.value
  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  
  // Clear canvas
  context.fillStyle = '#1a1a2e'
  context.fillRect(0, 0, width, height)
  
  // Draw grid
  context.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  context.lineWidth = 1
  for (let i = 0; i < width; i += 40) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, height)
    context.stroke()
  }
  for (let i = 0; i < height; i += 40) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(width, i)
    context.stroke()
  }
  
  time.value += 0.016 * animSpeed.value
  
  // Bridge layout coordinates
  const topY = centerY - 120
  const bottomY = centerY + 120
  const leftX = centerX - 200
  const rightX = centerX + 200
  
  // Draw bridge circuit
  context.lineWidth = 3
  context.lineCap = 'round'
  context.lineJoin = 'round'
  
  // Left branch (R1 top, R2 bottom)
  context.strokeStyle = '#3b82f6'
  context.beginPath()
  context.moveTo(leftX, topY)
  context.lineTo(leftX, centerY)
  context.stroke()
  
  context.strokeStyle = '#8b5cf6'
  context.beginPath()
  context.moveTo(leftX, centerY)
  context.lineTo(leftX, bottomY)
  context.stroke()
  
  // Right branch (R4 top, R3 bottom)
  context.strokeStyle = '#f59e0b'
  context.beginPath()
  context.moveTo(rightX, topY)
  context.lineTo(rightX, centerY)
  context.stroke()
  
  context.strokeStyle = '#10b981'
  context.beginPath()
  context.moveTo(rightX, centerY)
  context.lineTo(rightX, bottomY)
  context.stroke()
  
  // Top and bottom connections (voltage source)
  context.strokeStyle = '#ef4444'
  context.beginPath()
  context.moveTo(leftX, topY)
  context.lineTo(centerX - 40, topY)
  context.stroke()
  
  context.beginPath()
  context.moveTo(rightX, topY)
  context.lineTo(centerX + 40, topY)
  context.stroke()
  
  context.strokeStyle = '#6b7280'
  context.beginPath()
  context.moveTo(leftX, bottomY)
  context.lineTo(centerX - 40, bottomY)
  context.stroke()
  
  context.beginPath()
  context.moveTo(rightX, bottomY)
  context.lineTo(centerX + 40, bottomY)
  context.stroke()
  
  // Draw voltage source symbol
  context.strokeStyle = '#ef4444'
  context.lineWidth = 3
  // Positive terminal
  context.beginPath()
  context.moveTo(centerX - 15, topY - 25)
  context.lineTo(centerX - 15, topY - 15)
  context.stroke()
  // Negative terminal
  context.lineWidth = 5
  context.beginPath()
  context.moveTo(centerX + 15, topY - 35)
  context.lineTo(centerX + 15, topY - 5)
  context.stroke()
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(centerX + 15, topY - 28)
  context.lineTo(centerX + 15, topY - 12)
  context.stroke()
  
  // Source voltage label
  context.fillStyle = '#ef4444'
  context.font = 'bold 24px Inter, sans-serif'
  context.textAlign = 'center'
  context.fillText(`${vSource.value}V DC`, centerX, topY - 50)
  
  // Draw galvanometer in the middle
  const galvanometerX = centerX
  const galvanometerY = centerY + 30
  
  // Galvanometer circle
  context.strokeStyle = isBalanced.value ? '#10b981' : '#f59e0b'
  context.lineWidth = 3
  context.beginPath()
  context.arc(galvanometerX, galvanometerY, 50, 0, Math.PI * 2)
  context.stroke()
  
  // Galvanometer scale
  context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  context.lineWidth = 2
  for (let i = -5; i <= 5; i++) {
    const angle = (i * Math.PI / 6) - Math.PI / 2
    const innerR = i === 0 ? 35 : 40
    context.beginPath()
    context.moveTo(
      galvanometerX + Math.cos(angle) * innerR,
      galvanometerY + Math.sin(angle) * innerR
    )
    context.lineTo(
      galvanometerX + Math.cos(angle) * 48,
      galvanometerY + Math.sin(angle) * 48
    )
    context.stroke()
  }
  
  // Galvanometer needle
  const needleAngle = (deflection.value * Math.PI / 180) - Math.PI / 2
  context.strokeStyle = isBalanced.value ? '#10b981' : '#ef4444'
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(galvanometerX, galvanometerY + 15)
  context.lineTo(
    galvanometerX + Math.cos(needleAngle) * 45,
    galvanometerY + Math.sin(needleAngle) * 45
  )
  context.stroke()
  
  // Needle pivot
  context.fillStyle = '#ffffff'
  context.beginPath()
  context.arc(galvanometerX, galvanometerY + 15, 5, 0, Math.PI * 2)
  context.fill()
  
  // Galvanometer label
  context.fillStyle = '#9ca3af'
  context.font = '18px Inter, sans-serif'
  context.fillText('G', galvanometerX, galvanometerY + 70)
  
  // Draw current flow animation
  const flowOffset = (time.value * 50) % 40
  const currentIntensity = Math.min(1, Math.abs(galvanometerCurrent.value) / 100)
  
  // Animated dots on bridge connections
  if (currentIntensity > 0.01) {
    context.fillStyle = isBalanced.value ? 'rgba(16, 185, 129, 0.8)' : `rgba(239, 68, 68, ${currentIntensity})`
    
    // Left to center
    for (let i = 0; i < 3; i++) {
      const dotX = leftX + (centerX - leftX) * ((i * 0.3 + flowOffset / 100) % 1)
      context.beginPath()
      context.arc(dotX, centerY, 4, 0, Math.PI * 2)
      context.fill()
    }
    
    // Right to center
    for (let i = 0; i < 3; i++) {
      const dotX = rightX - (rightX - centerX) * ((i * 0.3 + flowOffset / 100) % 1)
      context.beginPath()
      context.arc(dotX, centerY, 4, 0, Math.PI * 2)
      context.fill()
    }
  }
  
  // Draw resistor labels
  context.font = 'bold 20px Inter, sans-serif'
  context.textAlign = 'center'
  
  // R1
  context.fillStyle = '#3b82f6'
  context.fillText('R₁', leftX - 30, centerY - 50)
  context.font = '16px Inter, sans-serif'
  context.fillText(`${r1.value}Ω`, leftX - 30, centerY - 30)
  
  // R2
  context.fillStyle = '#8b5cf6'
  context.font = 'bold 20px Inter, sans-serif'
  context.fillText('R₂', leftX - 30, centerY + 70)
  context.font = '16px Inter, sans-serif'
  context.fillText(`${r2.value}Ω`, leftX - 30, centerY + 90)
  
  // R4
  context.fillStyle = '#f59e0b'
  context.font = 'bold 20px Inter, sans-serif'
  context.fillText('R₄', rightX + 30, centerY - 50)
  context.font = '16px Inter, sans-serif'
  context.fillText(`${r4.value}Ω`, rightX + 30, centerY - 30)
  
  // R3
  context.fillStyle = '#10b981'
  context.font = 'bold 20px Inter, sans-serif'
  context.fillText('R₃', rightX + 30, centerY + 70)
  context.font = '16px Inter, sans-serif'
  context.fillText(`${r3.value}Ω`, rightX + 30, centerY + 90)
  
  // Node voltages
  context.fillStyle = '#ffffff'
  context.font = '16px Inter, sans-serif'
  context.textAlign = 'left'
  context.fillText(`Va: ${va.value.toFixed(2)}V`, leftX + 20, centerY - 10)
  context.fillText(`Vb: ${vb.value.toFixed(2)}V`, rightX - 100, centerY - 10)
  
  // Bridge voltage
  context.textAlign = 'center'
  const bridgeColor = isBalanced.value ? '#10b981' : '#f59e0b'
  context.fillStyle = bridgeColor
  context.font = 'bold 18px Inter, sans-serif'
  context.fillText(`Vbridge: ${vBridge.value.toFixed(4)}V`, centerX, centerY - 20)
  
  animationId.value = requestAnimationFrame(animate)
}

function toggleAnimation() {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    animate()
  } else if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
}

function resetAnimation() {
  time.value = 0
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  window.removeEventListener('resize', resizeCanvas)
})

// Quick presets
function setPreset(type: string) {
  switch(type) {
    case 'balanced':
      r1.value = 100
      r2.value = 100
      r3.value = 100
      r4.value = 100
      break
    case 'slight-unbalance':
      r1.value = 100
      r2.value = 100
      r3.value = 100
      r4.value = 95
      break
    case 'strain-gauge':
      r1.value = 120
      r2.value = 120
      r3.value = 120
      r4.value = 118
      break
    case 'temperature-sensor':
      r1.value = 1000
      r2.value = 1000
      r3.value = 1000
      r4.value = 1100
      break
  }
  resetAnimation()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Wheatstone Bridge Simulation
        </h1>
        <p class="text-lg text-gray-300 max-w-3xl mx-auto">
          Interactive bridge circuit for precise resistance measurements
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Canvas Visualization -->
        <div class="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-blue-400">Bridge Circuit</h2>
            <div class="flex gap-2">
              <button 
                @click="toggleAnimation"
                class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                {{ isRunning ? '⏸ Pause' : '▶ Play' }}
              </button>
              <button 
                @click="resetAnimation"
                class="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition font-medium"
              >
                ↺ Reset
              </button>
            </div>
          </div>
          
          <canvas 
            ref="canvasRef" 
            class="w-full rounded-lg border border-slate-600"
            style="height: 400px;"
          ></canvas>
          
          <!-- Balance Status -->
          <div class="mt-4 p-4 rounded-lg text-center font-bold text-xl"
               :class="isBalanced ? 'bg-green-900/50 text-green-400' : 'bg-amber-900/50 text-amber-400'">
            {{ isBalanced ? '✓ BRIDGE BALANCED' : '⚠ BRIDGE UNBALANCED' }}
          </div>
        </div>

        <!-- Controls Panel -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h2 class="text-xl font-bold text-purple-400 mb-4">Bridge Controls</h2>
          
          <!-- Bridge Resistors -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                R₁ (Top Left): {{ r1 }}Ω
              </label>
              <input 
                type="range" 
                v-model.number="r1" 
                min="10" 
                max="1000" 
                step="10"
                class="w-full accent-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                R₂ (Bottom Left): {{ r2 }}Ω
              </label>
              <input 
                type="range" 
                v-model.number="r2" 
                min="10" 
                max="1000" 
                step="10"
                class="w-full accent-purple-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                R₃ (Bottom Right): {{ r3 }}Ω
              </label>
              <input 
                type="range" 
                v-model.number="r3" 
                min="10" 
                max="1000" 
                step="10"
                class="w-full accent-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
                R₄ (Top Right): {{ r4 }}Ω
              </label>
              <input 
                type="range" 
                v-model.number="r4" 
                min="10" 
                max="1000" 
                step="10"
                class="w-full accent-amber-500"
              >
            </div>
          </div>
          
          <!-- Source Voltage -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Source Voltage: {{ vSource }}V
            </label>
            <input 
              type="range" 
              v-model.number="vSource" 
              min="1" 
              max="24" 
              step="1"
              class="w-full accent-red-500"
            >
          </div>
          
          <!-- Sensitivity -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Galvanometer Sensitivity: {{ sensitivity }} μA/V
            </label>
            <input 
              type="range" 
              v-model.number="sensitivity" 
              min="10" 
              max="100" 
              step="5"
              class="w-full accent-cyan-500"
            >
          </div>
          
          <!-- Animation Speed -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-1">
              Animation Speed: {{ animSpeed }}x
            </label>
            <input 
              type="range" 
              v-model.number="animSpeed" 
              min="0.25" 
              max="3" 
              step="0.25"
              class="w-full accent-pink-500"
            >
          </div>
          
          <!-- Quick Presets -->
          <div>
            <h3 class="text-sm font-medium text-gray-300 mb-2">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="setPreset('balanced')"
                class="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-medium"
              >
                Balanced
              </button>
              <button 
                @click="setPreset('slight-unbalance')"
                class="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 transition text-sm font-medium"
              >
                Slight Unbalance
              </button>
              <button 
                @click="setPreset('strain-gauge')"
                class="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
              >
                Strain Gauge
              </button>
              <button 
                @click="setPreset('temperature-sensor')"
                class="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-sm font-medium"
              >
                Temperature
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Analysis Panel -->
      <div class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <h3 class="text-sm font-medium text-gray-400 mb-1">Ratio Left (R₁/R₂)</h3>
          <p class="text-2xl font-bold text-blue-400">{{ ratioLeft.toFixed(3) }}</p>
        </div>
        
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <h3 class="text-sm font-medium text-gray-400 mb-1">Ratio Right (R₄/R₃)</h3>
          <p class="text-2xl font-bold text-amber-400">{{ ratioRight.toFixed(3) }}</p>
        </div>
        
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <h3 class="text-sm font-medium text-gray-400 mb-1">Bridge Voltage</h3>
          <p class="text-2xl font-bold" :class="isBalanced ? 'text-green-400' : 'text-red-400'">
            {{ vBridge.toFixed(4) }}V
          </p>
        </div>
        
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <h3 class="text-sm font-medium text-gray-400 mb-1">Galvanometer Current</h3>
          <p class="text-2xl font-bold" :class="isBalanced ? 'text-green-400' : 'text-purple-400'">
            {{ galvanometerCurrent.toFixed(2) }}μA
          </p>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
        <h2 class="text-2xl font-bold text-blue-400 mb-4">Understanding the Wheatstone Bridge</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-purple-400 mb-2">What is a Wheatstone Bridge?</h3>
            <p class="text-gray-300 mb-4">
              A Wheatstone Bridge is an electrical circuit used to measure unknown resistance by balancing two legs of a bridge circuit. When the bridge is balanced, the ratio of resistances in each leg is equal:
            </p>
            <div class="bg-slate-900/50 p-3 rounded-lg mb-4">
              <code class="text-green-400 text-lg">R₁ / R₂ = R₄ / R₃</code>
            </div>
            <p class="text-gray-300">
              When balanced, the voltage difference between the midpoint nodes (Va and Vb) is zero, and no current flows through the galvanometer.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-purple-400 mb-2">Key Principles</h3>
            <ul class="list-disc list-inside text-gray-300 space-y-2">
              <li><strong class="text-blue-400">Balance Condition:</strong> When R₁/R₂ = R₄/R₃, the bridge is balanced</li>
              <li><strong class="text-blue-400">Sensitivity:</strong> Higher source voltage = greater sensitivity</li>
              <li><strong class="text-blue-400">Measurement:</strong> Measure unknown resistance by balancing the bridge</li>
              <li><strong class="text-blue-400">Precision:</strong> Can detect very small resistance changes</li>
            </ul>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-purple-400 mb-2">Real-World Applications</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-400 mb-1">🔧 Strain Gauges</h4>
              <p class="text-sm text-gray-300">Measure mechanical strain and stress in materials by detecting resistance changes in deformed conductors</p>
            </div>
            
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-400 mb-1">🌡️ Temperature Sensors</h4>
              <p class="text-sm text-gray-300">RTDs (Resistance Temperature Detectors) use bridge circuits for precise temperature measurement</p>
            </div>
            
            <div class="bg-slate-900/50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-400 mb-1">⚡ Sensor Systems</h4>
              <p class="text-sm text-gray-300">Pressure sensors, accelerometers, and load cells often use bridge configurations</p>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-purple-400 mb-2">Key Formulas</h3>
          <div class="bg-slate-900/50 p-4 rounded-lg font-mono text-sm">
            <p class="text-green-400 mb-2">Balance Condition: R₁/R₂ = R₄/R₃</p>
            <p class="text-green-400 mb-2">Unknown Rₓ = R₂ × (R₄/R₁) (if R₃ is unknown)</p>
            <p class="text-green-400 mb-2">Vₐ = Vₛ × (R₂ / (R₁ + R₂))</p>
            <p class="text-green-400 mb-2">Vբ = Vₛ × (R₃ / (R₄ + R₃))</p>
            <p class="text-green-400 mb-2">Vbridge = Vբ - Vₐ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

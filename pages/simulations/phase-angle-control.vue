<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const isRunning = ref(true)
const firingAngle = ref(90)
const loadType = ref<'resistive' | 'inductive'>('resistive')
const inductance = ref(100) // mH for inductive load
const peakVoltage = ref(325) // 230V RMS = 325V peak

// Animation
const animationFrame = ref<number | null>(null)
const time = ref(0)
const waveSpeed = 0.02

// Canvas refs
const inputCanvas = ref<HTMLCanvasElement | null>(null)
const outputCanvas = ref<HTMLCanvasElement | null>(null)

// Computed
const rmsVoltage = computed(() => {
  const alpha = (firingAngle.value * Math.PI) / 180
  const vp = peakVoltage.value
  
  // For resistive load: Vrms = Vp * sqrt((1/2π) * (π - α + sin(2α)/2))
  const term1 = Math.PI - alpha
  const term2 = Math.sin(2 * alpha) / 2
  const vrms = vp * Math.sqrt((term1 + term2) / (2 * Math.PI))
  
  return vrms
})

const rmsCurrent = computed(() => {
  if (loadType.value === 'resistive') {
    const R = 100 // 100 ohm load
    return rmsVoltage.value / R
  } else {
    // Simplified for inductive - actual calculation is more complex
    const R = 100 // 100 ohm load resistance
    return rmsVoltage.value / R * 0.8 // Approximation
  }
})

const powerFactor = computed(() => {
  if (loadType.value === 'resistive') {
    // For resistive load with phase control
    const alpha = (firingAngle.value * Math.PI) / 180
    const pf = Math.sqrt((Math.PI - firingAngle.value * Math.PI / 180 + Math.sin(2 * firingAngle.value * Math.PI / 180) / 2) / (2 * Math.PI))
    return pf
  } else {
    // Inductive load has lagging PF
    return 0.6 + (firingAngle.value / 180) * 0.3
  }
})

const averagePower = computed(() => {
  return rmsVoltage.value * rmsCurrent.value * powerFactor.value
})

// Drawing functions
const drawWaveform = (canvas: HTMLCanvasElement | null, isOutput: boolean) => {
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.width
  const height = canvas.height
  const centerY = height / 2
  
  // Clear
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#2a2a4e'
  ctx.lineWidth = 1
  
  // Vertical grid lines (time)
  for (let i = 0; i <= 8; i++) {
    const x = (i / 8) * width
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  // Horizontal grid lines (voltage)
  for (let i = -2; i <= 2; i++) {
    const y = centerY + (i * height / 5)
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  // Draw center line
  ctx.strokeStyle = '#4a4a6e'
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()
  
  // Draw waveform
  ctx.strokeStyle = isOutput ? '#10b981' : '#6366f1'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  const alpha = (firingAngle.value * Math.PI) / 180
  const vp = peakVoltage.value
  const scale = (height / 2) * 0.8 / vp
  
  for (let x = 0; x < width; x++) {
    const angle = (x / width) * 4 * Math.PI + time.value
    const normalizedAngle = angle % (2 * Math.PI)
    
    let voltage = 0
    
    if (!isOutput) {
      // Input: pure sine wave
      voltage = vp * Math.sin(angle)
    } else {
      // Output: phase-controlled
      let phaseAngle = normalizedAngle
      if (phaseAngle < 0) phaseAngle += 2 * Math.PI
      
      // Check if SCR is conducting
      if (loadType.value === 'resistive') {
        if (phaseAngle >= alpha && phaseAngle <= Math.PI) {
          voltage = vp * Math.sin(angle)
        } else if (phaseAngle >= Math.PI + alpha && phaseAngle <= 2 * Math.PI) {
          voltage = vp * Math.sin(angle)
        } else {
          voltage = 0
        }
      } else {
        // Inductive load - current continues past zero crossing
        const conductionAngle = Math.min(Math.PI + 0.5, Math.PI - alpha + 0.5) // Extended conduction
        
        if (phaseAngle >= alpha && phaseAngle <= alpha + conductionAngle) {
          voltage = vp * Math.sin(angle)
        } else if (phaseAngle + 2 * Math.PI >= alpha && phaseAngle + 2 * Math.PI <= alpha + conductionAngle) {
          voltage = vp * Math.sin(angle)
        } else {
          voltage = 0
        }
      }
    }
    
    const y = centerY - voltage * scale
    
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  
  ctx.stroke()
  
  // Draw firing angle indicator
  if (!isOutput) {
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    
    const fireX = (alpha / (2 * Math.PI)) * width
    ctx.beginPath()
    ctx.moveTo(fireX, 0)
    ctx.lineTo(fireX, height)
    ctx.stroke()
    
    ctx.setLineDash([])
  }
  
  // Labels
  ctx.fillStyle = '#e2e8f0'
  ctx.font = '12px sans-serif'
  ctx.fillText(isOutput ? 'Output Voltage' : 'Input Voltage', 10, 20)
  
  if (!isOutput) {
    ctx.fillStyle = '#f59e0b'
    ctx.fillText(`α = ${firingAngle.value}°`, 10, 40)
  }
}

const animate = () => {
  if (isRunning.value) {
    time.value += waveSpeed
  }
  
  drawWaveform(inputCanvas.value, false)
  drawWaveform(outputCanvas.value, true)
  
  animationFrame.value = requestAnimationFrame(animate)
}

// Lifecycle
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})

// Control functions
const toggleSimulation = () => {
  isRunning.value = !isRunning.value
}

const resetSimulation = () => {
  time.value = 0
  firingAngle.value = 90
  loadType.value = 'resistive'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          Phase Angle Control Simulation
        </h1>
        <p class="text-slate-400 text-lg">
          SCR/Triac-Based AC Power Control
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Input Waveform -->
        <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
          <h2 class="text-xl font-semibold text-white mb-4">Input Voltage (Sine Wave)</h2>
          <canvas 
            ref="inputCanvas" 
            width="500" 
            height="300"
            class="w-full rounded-lg"
          ></canvas>
          <div class="mt-4 text-center">
            <p class="text-slate-400">
              Peak Voltage: <span class="text-emerald-400 font-semibold">{{ peakVoltage }} V</span>
            </p>
          </div>
        </div>

        <!-- Output Waveform -->
        <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
          <h2 class="text-xl font-semibold text-white mb-4">Output Voltage (Phase-Controlled)</h2>
          <canvas 
            ref="outputCanvas" 
            width="500" 
            height="300"
            class="w-full rounded-lg"
          ></canvas>
          <div class="mt-4 text-center">
            <p class="text-slate-400">
              RMS Output: <span class="text-emerald-400 font-semibold">{{ rmsVoltage.toFixed(1) }} V</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-white mb-6">Controls</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Firing Angle -->
          <div>
            <label class="block text-slate-300 mb-2 font-medium">
              Firing Angle (α): {{ firingAngle }}°
            </label>
            <input 
              type="range" 
              v-model.number="firingAngle"
              min="0" 
              max="180" 
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            >
          </div>

          <!-- Peak Voltage -->
          <div>
            <label class="block text-slate-300 mb-2 font-medium">
              Peak Voltage: {{ peakVoltage }} V
            </label>
            <input 
              type="range" 
              v-model.number="peakVoltage"
              min="100" 
              max="500" 
              step="5"
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            >
          </div>

          <!-- Load Type -->
          <div>
            <label class="block text-slate-300 mb-2 font-medium">Load Type</label>
            <select 
              v-model="loadType"
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-emerald-500 focus:outline-none"
            >
              <option value="resistive">Resistive</option>
              <option value="inductive">Inductive</option>
            </select>
          </div>

          <!-- Inductance (for inductive load) -->
          <div v-if="loadType === 'inductive'">
            <label class="block text-slate-300 mb-2 font-medium">
              Inductance: {{ inductance }} mH
            </label>
            <input 
              type="range" 
              v-model.number="inductance"
              min="10" 
              max="500" 
              class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            >
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="flex gap-4 mt-6">
          <button 
            @click="toggleSimulation"
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {{ isRunning ? '⏸ Pause' : '▶ Play' }}
          </button>
          <button 
            @click="resetSimulation"
            class="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <!-- Calculated Values -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-white mb-6">Calculated Values</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-slate-700 rounded-lg p-4">
            <p class="text-slate-400 text-sm mb-1">RMS Voltage</p>
            <p class="text-2xl font-bold text-emerald-400">{{ rmsVoltage.toFixed(1) }} V</p>
          </div>
          
          <div class="bg-slate-700 rounded-lg p-4">
            <p class="text-slate-400 text-sm mb-1">RMS Current</p>
            <p class="text-2xl font-bold text-blue-400">{{ rmsCurrent.toFixed(2) }} A</p>
          </div>
          
          <div class="bg-slate-700 rounded-lg p-4">
            <p class="text-slate-400 text-sm mb-1">Power Factor</p>
            <p class="text-2xl font-bold text-purple-400">{{ (powerFactor * 100).toFixed(1) }}%</p>
          </div>
          
          <div class="bg-slate-700 rounded-lg p-4">
            <p class="text-slate-400 text-sm mb-1">Average Power</p>
            <p class="text-2xl font-bold text-amber-400">{{ averagePower.toFixed(1) }} W</p>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
        <h2 class="text-2xl font-semibold text-white mb-6">How Phase Angle Control Works</h2>
        
        <div class="space-y-6 text-slate-300">
          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">🔧 Basic Principle</h3>
            <p>
              Phase angle control uses thyristors (SCRs or Triacs) to control AC power by 
              switching on the device at a specific point in each half-cycle. The firing 
              angle (α) determines when the device turns on, controlling the average 
              voltage delivered to the load.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">⚡ Operation Steps</h3>
            <ol class="list-decimal list-inside space-y-2">
              <li>AC voltage applied to the thyristor</li>
              <li>Trigger circuit waits for the firing angle (α)</li>
              <li>At angle α, gate pulse triggers the thyristor</li>
              <li>Thyristor turns ON and conducts current</li>
              <li>Current continues until the cycle ends (natural commutation)</li>
              <li>Process repeats for each half-cycle</li>
            </ol>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">📊 Load Types</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">Resistive Load</h4>
                <p class="text-sm">
                  Current and voltage are in phase. Conduction stops when voltage 
                  crosses zero. Simpler to control with better power factor.
                </p>
              </div>
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">Inductive Load</h4>
                <p class="text-sm">
                  Current lags voltage. Conduction continues beyond zero crossing. 
                  Requires more careful gate timing and has lower power factor.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">📐 Key Formulas</h3>
            <div class="bg-slate-700 rounded-lg p-4 font-mono text-sm">
              <p class="mb-2"><strong>RMS Voltage (Resistive):</strong></p>
              <p class="ml-4 mb-4">V<sub>rms</sub> = V<sub>p</sub> × √[(π - α + sin(2α)/2) / 2π]</p>
              
              <p class="mb-2"><strong>Power Factor:</strong></p>
              <p class="ml-4 mb-4">PF = V<sub>rms</sub> / V<sub>source</sub></p>
              
              <p class="mb-2"><strong>Average Power:</strong></p>
              <p class="ml-4">P = V<sub>rms</sub> × I<sub>rms</sub> × PF</p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">🎯 Common Applications</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>Motor speed control (fans, pumps, tools)</li>
              <li>Light dimmers (incandescent, halogen)</li>
              <li>Heater temperature control</li>
              <li>Industrial power controllers</li>
              <li>Soft starters for motors</li>
              <li>Welding equipment</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">⚠️ Important Considerations</h3>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Harmonics:</strong> Phase control generates electrical harmonics that can affect other equipment</li>
              <li><strong>Power Factor:</strong> Decreases as firing angle increases, requiring correction for large loads</li>
              <li><strong>EMI:</strong> Rapid switching creates electromagnetic interference</li>
              <li><strong>Load Compatibility:</strong> Not suitable for all load types (e.g., electronic devices)</li>
              <li><strong>Heat Dissipation:</strong> Thyristors require proper heat sinking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Simulation parameters
const clockFrequency = ref(10000) // Hz
const capacitanceC1 = ref(1e-9) // Farads (1nF)
const capacitanceC2 = ref(1e-9) // Farads (1nF)
const inputFrequency = ref(1000) // Hz (for frequency response)
const isRunning = ref(true)
const phaseState = ref<'phase1' | 'phase2'>('phase1')
const animationSpeed = ref(1)

// Canvas and animation state
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasCanvasRenderingContext2D | null = null
let animationId: number | null = null
let time = 0
const voltageHistory = ref<Array<{ t: number; vin: number; vout: number }>>([])
const maxHistoryLength = 500

// Computed values
const clockPeriod = computed(() => 1 / clockFrequency.value)
const switchPeriod = computed(() => clockPeriod.value / 2)
const emulatedResistance = computed(() => 1 / (clockFrequency.value * capacitanceC1.value))
const timeConstant = computed(() => emulatedResistance.value * capacitanceC2.value)
const cutoffFrequency = computed(() => 1 / (2 * Math.PI * timeConstant.value))

// Charge calculations
const chargeTransferredPerCycle = computed(() => {
  const Vpeak = 1 // Assume 1V peak for visualization
  return capacitanceC1.value * Vpeak
})

const averageCurrent = computed(() => {
  return chargeTransferredPerCycle.value * clockFrequency.value
})

// Frequency response calculation (1st order low-pass)
const frequencyResponse = computed(() => {
  const omega = 2 * Math.PI * inputFrequency.value
  const omegaC = 2 * Math.PI * cutoffFrequency.value
  const gain = omegaC / Math.sqrt(omega * omega + omegaC * omegaC)
  const phase = -Math.atan(omega / omegaC) * (180 / Math.PI)
  return { gain, phase }
})

// Bode plot data
const bodeData = computed(() => {
  const data: Array<{ freq: number; gain: number; phase: number }> = []
  for (let i = 0; i <= 8; i++) {
    const freq = 10 * Math.pow(10, i / 8) // 10 Hz to 100 kHz
    const omega = 2 * Math.PI * freq
    const omegaC = 2 * Math.PI * cutoffFrequency.value
    const gain = omegaC / Math.sqrt(omega * omega + omegaC * omegaC)
    const phase = -Math.atan(omega / omegaC) * (180 / Math.PI)
    data.push({ freq, gain, phase })
  }
  return data
})

// Draw circuit diagram
const drawCircuit = () => {
  if (!canvas || !ctx) return

  const width = canvas.width
  const height = canvas.height
  ctx.clearRect(0, 0, width, height)

  // Background
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, width, height)

  // Draw switched capacitor circuit
  ctx.strokeStyle = '#22d3ee'
  ctx.lineWidth = 2

  // Input terminal
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 14px Arial'
  ctx.fillText('Vin', 30, 100)
  ctx.beginPath()
  ctx.arc(50, 100, 5, 0, Math.PI * 2)
  ctx.fill()

  // Switch 1 (single-pole double-throw)
  const switch1Y = 100
  const switch1X = 100
  
  // Switch state visualization
  ctx.strokeStyle = phaseState.value === 'phase1' ? '#22d3ee' : '#475569'
  ctx.beginPath()
  ctx.moveTo(50, switch1Y)
  ctx.lineTo(switch1X, switch1Y)
  ctx.stroke()

  // Switch arm
  ctx.strokeStyle = phaseState.value === 'phase1' ? '#22d3ee' : '#475569'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(switch1X, switch1Y)
  if (phaseState.value === 'phase1') {
    ctx.lineTo(switch1X + 30, switch1Y - 30)
  } else {
    ctx.lineTo(switch1X + 30, switch1Y + 30)
  }
  ctx.stroke()

  // Phase 1: Vin -> C1 -> Ground
  ctx.strokeStyle = phaseState.value === 'phase1' ? '#22d3ee' : '#475569'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(switch1X + 30, switch1Y - 30)
  ctx.lineTo(switch1X + 60, switch1Y - 30)
  ctx.stroke()

  // C1 in Phase 1
  if (phaseState.value === 'phase1') {
    ctx.fillStyle = '#a855f7'
    ctx.fillRect(switch1X + 70, switch1Y - 45, 40, 30)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 12px Arial'
    ctx.fillText('C₁', switch1X + 85, switch1Y - 26)
    ctx.fillText(`${(capacitanceC1.value * 1e9).toFixed(1)}nF`, switch1X + 75, switch1Y - 55)
  }

  // Phase 2: C1 -> C2 -> Ground
  ctx.strokeStyle = phaseState.value === 'phase2' ? '#22d3ee' : '#475569'
  ctx.beginPath()
  ctx.moveTo(switch1X + 30, switch1Y + 30)
  ctx.lineTo(switch1X + 60, switch1Y + 30)
  ctx.stroke()

  // C1 and C2 in Phase 2
  if (phaseState.value === 'phase2') {
    // C1 (transfer)
    ctx.fillStyle = '#a855f7'
    ctx.fillRect(switch1X + 70, switch1Y + 15, 40, 30)
    ctx.fillStyle = '#fff'
    ctx.fillText('C₁', switch1X + 85, switch1Y + 34)
    
    // C2 (storage)
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(switch1X + 140, switch1Y + 15, 40, 30)
    ctx.fillStyle = '#fff'
    ctx.fillText('C₂', switch1X + 155, switch1Y + 34)
    ctx.fillText(`${(capacitanceC2.value * 1e9).toFixed(1)}nF`, switch1X + 140, switch1Y + 60)
  }

  // Switch 2
  const switch2X = 200
  ctx.strokeStyle = phaseState.value === 'phase2' ? '#22d3ee' : '#475569'
  ctx.beginPath()
  ctx.moveTo(switch2X, switch1Y + 30)
  ctx.lineTo(switch2X + 30, switch1Y)
  ctx.stroke()

  // Output terminal
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 14px Arial'
  ctx.fillText('Vout', switch2X + 40, switch1Y)
  ctx.beginPath()
  ctx.arc(switch2X + 30, switch1Y, 5, 0, Math.PI * 2)
  ctx.fill()

  // Ground symbols
  ctx.strokeStyle = '#64748b'
  ctx.lineWidth = 2
  for (let i = 0; i < 3; i++) {
    const y = switch1Y - 30 + i * 30
    ctx.beginPath()
    ctx.moveTo(switch1X + 120, y)
    ctx.lineTo(switch1X + 120, y + 10)
    ctx.stroke()
  }

  // Draw clock signal
  const clockX = 300
  const clockY = 50
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 12px Arial'
  ctx.fillText('Clock', clockX, clockY - 10)
  
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(clockX, clockY)
  for (let i = 0; i < 100; i++) {
    const y = clockY + (i % 20 < 10 ? 0 : 20)
    ctx.lineTo(clockX + i * 2, y)
  }
  ctx.stroke()

  ctx.fillStyle = '#fbbf24'
  ctx.font = 'bold 10px Arial'
  ctx.fillText(`${(clockFrequency.value / 1000).toFixed(1)}kHz`, clockX + 100, clockY + 10)
  ctx.fillText('Φ₁', clockX + 20, clockY - 10)
  ctx.fillText('Φ₂', clockX + 60, clockY + 25)

  // Draw phase indicator
  ctx.fillStyle = phaseState.value === 'phase1' ? '#22d3ee' : '#f59e0b'
  ctx.font = 'bold 16px Arial'
  ctx.fillText(`Phase: ${phaseState.value === 'phase1' ? '1 (Sample)' : '2 (Transfer)'}`, 300, 150)
}

// Draw voltage waveforms
const drawWaveforms = () => {
  if (!canvas || !ctx) return

  const waveX = 400
  const waveY = 200
  const waveWidth = 350
  const waveHeight = 150

  // Background
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(waveX, waveY, waveWidth, waveHeight)

  // Grid
  ctx.strokeStyle = '#334155'
  ctx.lineWidth = 1
  for (let i = 0; i <= 5; i++) {
    ctx.beginPath()
    ctx.moveTo(waveX, waveY + (i * waveHeight) / 5)
    ctx.lineTo(waveX + waveWidth, waveY + (i * waveHeight) / 5)
    ctx.stroke()
  }

  // Labels
  ctx.fillStyle = '#94a3b8'
  ctx.font = '10px Arial'
  ctx.fillText('Time', waveX + waveWidth / 2, waveY + waveHeight + 15)
  ctx.save()
  ctx.translate(waveX - 15, waveY + waveHeight / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Voltage (V)', 0, 0)
  ctx.restore()

  // Vin waveform (sine wave input)
  ctx.strokeStyle = '#22d3ee'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < waveWidth; i++) {
    const t = (time + i * 0.01) * inputFrequency.value / 1000
    const v = Math.sin(2 * Math.PI * t)
    const y = waveY + waveHeight / 2 - v * waveHeight * 0.4
    if (i === 0) {
      ctx.moveTo(waveX + i, y)
    } else {
      ctx.lineTo(waveX + i, y)
    }
  }
  ctx.stroke()

  // Vout waveform (filtered, stepped response)
  ctx.strokeStyle = '#f59e0b'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < waveWidth; i++) {
    const t = (time + i * 0.01) * inputFrequency.value / 1000
    const vin = Math.sin(2 * Math.PI * t)
    
    // Stepped response due to switching
    const phase = Math.floor(t * clockFrequency.value / inputFrequency.value) % 2
    let vout = 0
    
    if (phase === 0) {
      // Sample phase: output holds previous value
      vout = voltageHistory.value[Math.max(0, voltageHistory.value.length - 2)]?.vout || 0
    } else {
      // Transfer phase: output approaches input with filtering
      const alpha = 1 - Math.exp(-1 / (cutoffFrequency.value / inputFrequency.value))
      vout = voltageHistory.value[Math.max(0, voltageHistory.value.length - 1)]?.vout || 0
      vout = vout + alpha * (vin - vout)
    }
    
    const y = waveY + waveHeight / 2 - vout * waveHeight * 0.4
    if (i === 0) {
      ctx.moveTo(waveX + i, y)
    } else {
      ctx.lineTo(waveX + i, y)
    }
  }
  ctx.stroke()

  // Legend
  ctx.fillStyle = '#22d3ee'
  ctx.fillRect(waveX + 10, waveY + 10, 15, 3)
  ctx.fillStyle = '#fff'
  ctx.font = '10px Arial'
  ctx.fillText('Vin', waveX + 30, waveY + 15)

  ctx.fillStyle = '#f59e0b'
  ctx.fillRect(waveX + 60, waveY + 10, 15, 3)
  ctx.fillStyle = '#fff'
  ctx.fillText('Vout (filtered)', waveX + 80, waveY + 15)
}

// Draw Bode plot
const drawBodePlot = () => {
  if (!canvas || !ctx) return

  const bodeX = 400
  const bodeY = 30
  const bodeWidth = 350
  const bodeHeight = 150

  // Background
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(bodeX, bodeY, bodeWidth, bodeHeight)

  // Labels
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 12px Arial'
  ctx.fillText('Bode Plot (Frequency Response)', bodeX + 10, bodeY + 15)

  // Frequency markers
  ctx.fillStyle = '#94a3b8'
  ctx.font = '9px Arial'
  const freqLabels = ['10Hz', '100Hz', '1kHz', '10kHz', '100kHz']
  freqLabels.forEach((label, i) => {
    ctx.fillText(label, bodeX + 20 + i * 70, bodeY + bodeHeight - 5)
  })

  // Draw frequency response curve
  ctx.strokeStyle = '#a855f7'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  bodeData.value.forEach((point, i) => {
    const x = bodeX + 20 + (i / (bodeData.value.length - 1)) * (bodeWidth - 40)
    const y = bodeY + bodeHeight - 20 - point.gain * (bodeHeight - 40)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Current frequency marker
  const currentFreqIndex = bodeData.value.findIndex(
    point => point.freq >= inputFrequency.value
  )
  if (currentFreqIndex >= 0) {
    const point = bodeData.value[currentFreqIndex]
    const x = bodeX + 20 + (currentFreqIndex / (bodeData.value.length - 1)) * (bodeWidth - 40)
    const y = bodeY + bodeHeight - 20 - point.gain * (bodeHeight - 40)
    
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  // Cutoff frequency line
  ctx.strokeStyle = '#4ade80'
  ctx.setLineDash([5, 5])
  ctx.lineWidth = 1
  ctx.beginPath()
  const cutoffX = bodeX + 20 + (Math.log10(cutoffFrequency.value / 10) / 8) * (bodeWidth - 40)
  ctx.moveTo(cutoffX, bodeY + 20)
  ctx.lineTo(cutoffX, bodeY + bodeHeight - 20)
  ctx.stroke()
  ctx.setLineDash([])

  ctx.fillStyle = '#4ade80'
  ctx.font = '9px Arial'
  ctx.fillText(`fc = ${(cutoffFrequency.value / 1000).toFixed(2)}kHz`, cutoffX + 5, bodeY + 30)
}

// Animation loop
const animate = () => {
  if (!isRunning.value) return

  time += 0.016 * animationSpeed.value

  // Toggle phases based on clock
  const phase = Math.floor(time * clockFrequency.value) % 2
  phaseState.value = phase === 0 ? 'phase1' : 'phase2'

  // Calculate voltages
  const t = time * inputFrequency.value / 1000
  const vin = Math.sin(2 * Math.PI * t)
  
  // Simple low-pass filter response
  const omega = 2 * Math.PI * inputFrequency.value
  const omegaC = 2 * Math.PI * cutoffFrequency.value
  const gain = omegaC / Math.sqrt(omega * omega + omegaC * omegaC)
  const vout = vin * gain

  // Update voltage history
  voltageHistory.value.push({ t, vin, vout })
  if (voltageHistory.value.length > maxHistoryLength) {
    voltageHistory.value.shift()
  }

  // Draw everything
  drawCircuit()
  drawWaveforms()
  drawBodePlot()

  animationId = requestAnimationFrame(animate)
}

// Initialize canvas
onMounted(() => {
  canvas = document.getElementById('simulationCanvas') as HTMLCanvasElement
  if (canvas) {
    canvas.width = 760
    canvas.height = 400
    ctx = canvas.getContext('2d')
    animate()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

// Control functions
const toggleSimulation = () => {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    animate()
  }
}

const resetSimulation = () => {
  time = 0
  voltageHistory.value = []
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Switched Capacitor Filter
        </h1>
        <p class="text-xl text-gray-300">
          Analog/digital hybrid filtering with charge transfer
        </p>
      </div>

      <!-- Main Simulation Canvas -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 mb-6">
        <canvas 
          id="simulationCanvas" 
          class="w-full rounded-xl"
          :style="{ height: '400px' }"
        ></canvas>
      </div>

      <!-- Controls -->
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <!-- Circuit Parameters -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
          <h2 class="text-xl font-bold mb-4 text-cyan-400">Circuit Parameters</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Clock Frequency: {{ (clockFrequency / 1000).toFixed(1) }} kHz
              </label>
              <input 
                v-model.number="clockFrequency" 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                class="w-full"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 kHz</span>
                <span>100 kHz</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Capacitor C₁: {{ (capacitanceC1 * 1e9).toFixed(1) }} nF
              </label>
              <input 
                v-model.number="capacitanceC1" 
                type="range" 
                min="0.1e-9" 
                max="10e-9" 
                step="0.1e-9"
                class="w-full"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Capacitor C₂: {{ (capacitanceC2 * 1e9).toFixed(1) }} nF
              </label>
              <input 
                v-model.number="capacitanceC2" 
                type="range" 
                min="0.1e-9" 
                max="10e-9" 
                step="0.1e-9"
                class="w-full"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Input Frequency: {{ (inputFrequency / 1000).toFixed(2) }} kHz
              </label>
              <input 
                v-model.number="inputFrequency" 
                type="range" 
                min="10" 
                max="20000" 
                step="10"
                class="w-full"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Animation Speed: {{ animationSpeed }}x
              </label>
              <input 
                v-model.number="animationSpeed" 
                type="range" 
                min="0.1" 
                max="3" 
                step="0.1"
                class="w-full"
              >
            </div>
          </div>
        </div>

        <!-- Real-time Results -->
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-xl font-bold mb-4 text-purple-400">Real-time Analysis</h2>
          
          <div class="space-y-4">
            <div class="bg-slate-900/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Emulated Resistance</div>
              <div class="text-2xl font-bold text-cyan-400">
                {{ (emulatedResistance / 1000).toFixed(2) }} kΩ
              </div>
              <div class="text-xs text-gray-500 mt-1">
                R = 1/(f_clk × C₁)
              </div>
            </div>

            <div class="bg-slate-900/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Cutoff Frequency (fc)</div>
              <div class="text-2xl font-bold text-purple-400">
                {{ (cutoffFrequency / 1000).toFixed(2) }} kHz
              </div>
              <div class="text-xs text-gray-500 mt-1">
                fc = 1/(2π × R × C₂)
              </div>
            </div>

            <div class="bg-slate-900/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Current Gain at {{ (inputFrequency / 1000).toFixed(2) }} kHz</div>
              <div class="text-2xl font-bold text-yellow-400">
                {{ (frequencyResponse.gain * 100).toFixed(1) }}%
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Phase: {{ frequencyResponse.phase.toFixed(1) }}°
              </div>
            </div>

            <div class="bg-slate-900/50 rounded-xl p-4">
              <div class="text-gray-400 text-sm mb-1">Switch State</div>
              <div class="text-2xl font-bold" 
                   :class="phaseState === 'phase1' ? 'text-cyan-400' : 'text-orange-400'">
                {{ phaseState === 'phase1' ? 'Φ₁ (Sample)' : 'Φ₂ (Transfer)' }}
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {{ (switchPeriod * 1000).toFixed(1) }} ms per phase
              </div>
            </div>
          </div>

          <!-- Control buttons -->
          <div class="flex gap-3 mt-6">
            <button 
              @click="toggleSimulation"
              class="flex-1 py-3 rounded-lg font-semibold transition-all"
              :class="isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
            >
              {{ isRunning ? '⏸ Pause' : '▶ Play' }}
            </button>
            <button 
              @click="resetSimulation"
              class="flex-1 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition-all"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Frequency Response Table -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 mb-6">
        <h2 class="text-xl font-bold mb-4 text-yellow-400">Frequency Response Data</h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-2 px-3 text-gray-400">Frequency</th>
                <th class="text-left py-2 px-3 text-gray-400">Gain (dB)</th>
                <th class="text-left py-2 px-3 text-gray-400">Gain (%)</th>
                <th class="text-left py-2 px-3 text-gray-400">Phase (°)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(point, index) in bodeData.slice(0, 5)" :key="index" 
                  class="border-b border-gray-800"
                  :class="point.freq >= inputFrequency - 100 && point.freq <= inputFrequency + 100 ? 'bg-yellow-900/20' : ''">
                <td class="py-2 px-3 font-mono">{{ point.freq >= 1000 ? (point.freq / 1000).toFixed(1) + ' kHz' : point.freq + ' Hz' }}</td>
                <td class="py-2 px-3 font-mono">{{ (20 * Math.log10(point.gain)).toFixed(1) }} dB</td>
                <td class="py-2 px-3 font-mono">{{ (point.gain * 100).toFixed(1) }}%</td>
                <td class="py-2 px-3 font-mono">{{ point.phase.toFixed(1) }}°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <h2 class="text-2xl font-bold mb-4 text-white">📚 Understanding Switched Capacitor Filters</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-cyan-400 mb-2">🔬 Core Principle</h3>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Switched capacitors emulate resistors using rapid charge/discharge cycles. The equivalent resistance is:</p>
              <p class="font-mono bg-slate-900/50 p-2 rounded text-cyan-400">R = 1/(f_clock × C)</p>
              <p>By switching faster than the signal frequency, the discrete charge transfers create an <strong class="text-white">average current flow</strong> equivalent to a resistor.</p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-purple-400 mb-2">⚡ Two-Phase Operation</h3>
            <div class="text-gray-300 text-sm space-y-2">
              <p><strong class="text-cyan-400">Phase 1 (Φ₁ - Sample):</strong> C₁ charges to input voltage</p>
              <p><strong class="text-orange-400">Phase 2 (Φ₂ - Transfer):</strong> C₁ transfers charge to C₂</p>
              <p>This creates a <strong class="text-white">stepped approximation</strong> of analog filtering, with the effective cutoff determined by clock frequency and capacitor values.</p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-900/50 rounded-xl">
          <h3 class="text-lg font-semibold text-yellow-400 mb-2">🎯 Key Advantages</h3>
          <div class="text-gray-300 text-sm grid md:grid-cols-2 gap-4">
            <div>
              <p class="mb-2"><strong class="text-white">CMOS Compatible:</strong> No resistors needed - uses only capacitors and switches (MOSFETs)</p>
              <p class="mb-2"><strong class="text-white">Precise Control:</strong> Cutoff frequency set by stable clock frequency</p>
            </div>
            <div>
              <p class="mb-2"><strong class="text-white">Tunable:</strong> Adjust filter characteristics by changing clock frequency</p>
              <p><strong class="text-white">Small Area:</strong> Capacitors smaller than equivalent resistors in ICs</p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl">
          <h3 class="text-lg font-semibold text-blue-400 mb-2">💡 Applications</h3>
          <div class="text-gray-300 text-sm">
            <ul class="list-disc list-inside space-y-1">
              <li>Anti-aliasing filters in data converters (ADCs/DACs)</li>
              <li>Audio processing in mixed-signal ICs</li>
              <li>Programmable filters in communication systems</li>
              <li>On-chip filtering where precision resistors are impractical</li>
              <li>Biomedical signal processing (portable devices)</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl">
          <h3 class="text-lg font-semibold text-red-400 mb-2">⚠️ Important Considerations</h3>
          <div class="text-gray-300 text-sm">
            <p class="mb-2"><strong class="text-white">Clock Feedthrough:</strong> Some clock signal leaks into the output</p>
            <p class="mb-2"><strong class="text-white">Aliasing:</strong> Clock frequency must be much higher (10-100x) than signal frequency</p>
            <p class="mb-2"><strong class="text-white">Non-ideal Effects:</strong> Switch resistance, capacitor parasitics affect performance</p>
            <p><strong class="text-white">Noise:</strong> Switching introduces kT/C noise from charge transfer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

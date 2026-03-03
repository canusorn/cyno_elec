<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// State
const resistance = ref(100) // Ohms
const inductance = ref(100) // mH
const capacitance = ref(100) // µF
const initialVoltage = ref(10) // Volts
const isRunning = ref(true)
const time = ref(0)
const animationFrame = ref<number | null>(null)

// Canvas refs
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

// Constants
const timeScale = 0.016 // Time step per frame
const displayDuration = 5 // Seconds to display

// Calculations
const L = computed(() => inductance.value / 1000) // Convert mH to H
const C = computed(() => capacitance.value / 1000000) // Convert µF to F
const R = computed(() => resistance.value)
const V0 = computed(() => initialVoltage.value)

// Natural frequency (ω₀ = 1/√LC)
const naturalFrequency = computed(() => {
  return 1 / Math.sqrt(L.value * C.value)
})

// Damping ratio (ζ = R/2√(L/C))
const dampingRatio = computed(() => {
  return R.value / (2 * Math.sqrt(L.value / C.value))
})

// Damped frequency (ωd = ω₀√(1-ζ²))
const dampedFrequency = computed(() => {
  const zeta = dampingRatio.value
  if (zeta >= 1) return 0 // Overdamped or critically damped
  return naturalFrequency.value * Math.sqrt(1 - zeta * zeta)
})

// Damping type
const dampingType = computed(() => {
  const zeta = dampingRatio.value
  if (zeta < 1) return 'underdamped'
  if (zeta === 1) return 'critically-damped'
  return 'overdamped'
})

// Damping type display info
const dampingInfo = computed(() => {
  const zeta = dampingRatio.value
  const type = dampingType.value
  
  if (type === 'underdamped') {
    return {
      label: 'Underdamped',
      color: 'text-green-400',
      bgColor: 'bg-green-400',
      description: 'Oscillates with decaying amplitude',
      equation: 'V(t) = V₀ × e^(-ζω₀t) × cos(ωdt)'
    }
  } else if (type === 'critically-damped') {
    return {
      label: 'Critically Damped',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400',
      description: 'Fastest return without oscillation',
      equation: 'V(t) = V₀ × (1 + ω₀t) × e^(-ω₀t)'
    }
  } else {
    return {
      label: 'Overdamped',
      color: 'text-red-400',
      bgColor: 'bg-red-400',
      description: 'Slow return without oscillation',
      equation: 'V(t) = V₀ × (e^(s₁t) - e^(s₂t)) / (s₁ - s₂)'
    }
  }
})

// Calculate voltage at time t
const calculateVoltage = (t: number) => {
  const zeta = dampingRatio.value
  const omega0 = naturalFrequency.value
  const omegaD = dampedFrequency.value
  const v0 = V0.value

  if (zeta < 1) {
    // Underdamped
    const envelope = Math.exp(-zeta * omega0 * t)
    const oscillation = Math.cos(omegaD * t)
    return v0 * envelope * oscillation
  } else if (zeta === 1) {
    // Critically damped
    return v0 * (1 + omega0 * t) * Math.exp(-omega0 * t)
  } else {
    // Overdamped
    const s1 = -zeta * omega0 + omega0 * Math.sqrt(zeta * zeta - 1)
    const s2 = -zeta * omega0 - omega0 * Math.sqrt(zeta * zeta - 1)
    return v0 * (Math.exp(s1 * t) - Math.exp(s2 * t)) / (s1 - s2)
  }
}

// Get peak values for display
const peaks = computed(() => {
  const peaks: { time: number, voltage: number }[] = []
  const zeta = dampingRatio.value
  
  if (zeta >= 1) {
    // No peaks for overdamped/critically damped (just initial point)
    peaks.push({ time: 0, voltage: V0.value })
  } else {
    // Calculate peaks (when cos(ωdt) = ±1)
    const omegaD = dampedFrequency.value
    const omega0 = naturalFrequency.value
    const period = (2 * Math.PI) / omegaD
    
    for (let i = 0; i < 5; i++) {
      const t = i * period
      const v = calculateVoltage(t)
      if (Math.abs(v) > 0.01) { // Only significant peaks
        peaks.push({ time: t, voltage: v })
      }
    }
  }
  
  return peaks
})

// Additional calculations
const settlingTime = computed(() => {
  const zeta = dampingRatio.value
  const omega0 = naturalFrequency.value
  
  // Time to reach 2% of initial value
  if (zeta >= 1) {
    return 4 / (zeta * omega0) // Approximation
  } else {
    return 4 / (zeta * omega0)
  }
})

const qualityFactor = computed(() => {
  const zeta = dampingRatio.value
  if (zeta === 0) return Infinity
  return 1 / (2 * zeta)
})

// Draw the graph
const draw = () => {
  if (!ctx.value || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const context = ctx.value
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  context.fillStyle = '#0f172a'
  context.fillRect(0, 0, width, height)
  
  // Graph parameters
  const padding = { top: 40, right: 40, bottom: 60, left: 70 }
  const graphWidth = width - padding.left - padding.right
  const graphHeight = height - padding.top - padding.bottom
  
  // Draw grid
  context.strokeStyle = '#334155'
  context.lineWidth = 1
  
  // Vertical grid lines (time)
  for (let i = 0; i <= 10; i++) {
    const x = padding.left + (graphWidth * i / 10)
    context.beginPath()
    context.moveTo(x, padding.top)
    context.lineTo(x, padding.top + graphHeight)
    context.stroke()
    
    // Time labels
    context.fillStyle = '#64748b'
    context.font = '12px monospace'
    context.textAlign = 'center'
    const timeLabel = (displayDuration * i / 10).toFixed(1)
    context.fillText(`${timeLabel}s`, x, height - 20)
  }
  
  // Horizontal grid lines (voltage)
  const maxVoltage = V0.value * 1.2
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (graphHeight * i / 4)
    context.beginPath()
    context.moveTo(padding.left, y)
    context.lineTo(padding.left + graphWidth, y)
    context.stroke()
    
    // Voltage labels
    context.fillStyle = '#64748b'
    context.font = '12px monospace'
    context.textAlign = 'right'
    const voltageLabel = (maxVoltage * (4 - i) / 4).toFixed(1)
    context.fillText(`${voltageLabel}V`, padding.left - 10, y + 4)
  }
  
  // Draw axes
  context.strokeStyle = '#94a3b8'
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(padding.left, padding.top)
  context.lineTo(padding.left, padding.top + graphHeight)
  context.lineTo(padding.left + graphWidth, padding.top + graphHeight)
  context.stroke()
  
  // Axis labels
  context.fillStyle = '#94a3b8'
  context.font = '14px sans-serif'
  context.textAlign = 'center'
  context.fillText('Time (s)', padding.left + graphWidth / 2, height - 10)
  
  context.save()
  context.translate(15, padding.top + graphHeight / 2)
  context.rotate(-Math.PI / 2)
  context.fillText('Voltage (V)', 0, 0)
  context.restore()
  
  // Draw the waveform
  const zeta = dampingRatio.value
  const type = dampingType.value
  
  let waveColor: string
  if (type === 'underdamped') waveColor = '#4ade80' // green
  else if (type === 'critically-damped') waveColor = '#facc15' // yellow
  else waveColor = '#f87171' // red
  
  context.strokeStyle = waveColor
  context.lineWidth = 3
  context.beginPath()
  
  const points = 500
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * displayDuration
    const v = calculateVoltage(t)
    
    const x = padding.left + (t / displayDuration) * graphWidth
    const y = padding.top + graphHeight - ((v + maxVoltage) / (2 * maxVoltage)) * graphHeight
    
    if (i === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  }
  context.stroke()
  
  // Draw envelope for underdamped
  if (type === 'underdamped') {
    const omega0 = naturalFrequency.value
    context.strokeStyle = 'rgba(74, 222, 128, 0.3)'
    context.lineWidth = 2
    context.setLineDash([5, 5])
    
    // Upper envelope
    context.beginPath()
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * displayDuration
      const v = V0.value * Math.exp(-zeta * omega0 * t)
      
      const x = padding.left + (t / displayDuration) * graphWidth
      const y = padding.top + graphHeight - ((v + maxVoltage) / (2 * maxVoltage)) * graphHeight
      
      if (i === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.stroke()
    
    // Lower envelope
    context.beginPath()
    for (let i = 0; i <= points; i++) {
      const t = (i / points) * displayDuration
      const v = -V0.value * Math.exp(-zeta * omega0 * t)
      
      const x = padding.left + (t / displayDuration) * graphWidth
      const y = padding.top + graphHeight - ((v + maxVoltage) / (2 * maxVoltage)) * graphHeight
      
      if (i === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.stroke()
    context.setLineDash([])
  }
  
  // Draw current position indicator
  if (isRunning.value) {
    const currentT = (time.value % displayDuration)
    const currentV = calculateVoltage(currentT)
    
    const x = padding.left + (currentT / displayDuration) * graphWidth
    const y = padding.top + graphHeight - ((currentV + maxVoltage) / (2 * maxVoltage)) * graphHeight
    
    context.fillStyle = waveColor
    context.beginPath()
    context.arc(x, y, 8, 0, 2 * Math.PI)
    context.fill()
    
    context.fillStyle = '#ffffff'
    context.font = '12px monospace'
    context.textAlign = 'left'
    context.fillText(`V: ${currentV.toFixed(2)}V`, x + 15, y - 10)
    context.fillText(`t: ${currentT.toFixed(2)}s`, x + 15, y + 5)
  }
  
  // Draw title
  context.fillStyle = waveColor
  context.font = 'bold 16px sans-serif'
  context.textAlign = 'center'
  context.fillText(dampingInfo.value.label.toUpperCase(), width / 2, 25)
}

// Animation loop
const animate = () => {
  if (isRunning.value) {
    time.value += timeScale
  }
  draw()
  animationFrame.value = requestAnimationFrame(animate)
}

// Reset animation
const reset = () => {
  time.value = 0
}

// Lifecycle
onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = 800
    canvasRef.value.height = 400
    ctx.value = canvasRef.value.getContext('2d')
    animate()
  }
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})

// Redraw when parameters change
watch([resistance, inductance, capacitance, initialVoltage], () => {
  time.value = 0
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        RLC Damped Oscillation Simulation
      </h1>
      <p class="text-slate-400">Visualize underdamped, critically damped, and overdamped circuits</p>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-800 rounded-xl p-6 space-y-6">
        <h2 class="text-xl font-semibold text-cyan-400">Circuit Parameters</h2>
        
        <!-- Resistance -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-300">Resistance (R)</label>
            <span class="text-amber-400 font-mono">{{ resistance }} Ω</span>
          </div>
          <input 
            v-model.number="resistance" 
            type="range" 
            min="10" 
            max="1000" 
            step="10"
            class="w-full accent-amber-500"
          >
        </div>

        <!-- Inductance -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-300">Inductance (L)</label>
            <span class="text-cyan-400 font-mono">{{ inductance }} mH</span>
          </div>
          <input 
            v-model.number="inductance" 
            type="range" 
            min="1" 
            max="500" 
            step="1"
            class="w-full accent-cyan-500"
          >
        </div>

        <!-- Capacitance -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-300">Capacitance (C)</label>
            <span class="text-green-400 font-mono">{{ capacitance }} µF</span>
          </div>
          <input 
            v-model.number="capacitance" 
            type="range" 
            min="1" 
            max="500" 
            step="1"
            class="w-full accent-green-500"
          >
        </div>

        <!-- Initial Voltage -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-slate-300">Initial Voltage</label>
            <span class="text-violet-400 font-mono">{{ initialVoltage }} V</span>
          </div>
          <input 
            v-model.number="initialVoltage" 
            type="range" 
            min="1" 
            max="50" 
            step="1"
            class="w-full accent-violet-500"
          >
        </div>

        <!-- Controls -->
        <div class="flex gap-4">
          <button 
            @click="isRunning = !isRunning"
            :class="['flex-1 py-2 px-4 rounded-lg font-semibold transition-all', 
              isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500']"
          >
            {{ isRunning ? '⏸ Pause' : '▶ Play' }}
          </button>
          <button 
            @click="reset"
            class="flex-1 py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-semibold transition-all"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <!-- Calculations -->
      <div class="bg-slate-800 rounded-xl p-6 space-y-4">
        <h2 class="text-xl font-semibold text-cyan-400">Circuit Analysis</h2>
        
        <!-- Damping Type -->
        <div class="bg-slate-900 rounded-lg p-4">
          <div class="text-sm text-slate-400 mb-1">Damping Type</div>
          <div :class="['text-2xl font-bold', dampingInfo.color]">
            {{ dampingInfo.label }}
          </div>
          <div class="text-sm text-slate-500">{{ dampingInfo.description }}</div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Damping Ratio (ζ)</div>
            <div class="text-xl font-bold text-amber-400 font-mono">
              {{ dampingRatio.toFixed(3) }}
            </div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Natural Freq (ω₀)</div>
            <div class="text-xl font-bold text-cyan-400 font-mono">
              {{ (naturalFrequency / (2 * Math.PI)).toFixed(2) }} Hz
            </div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Damped Freq (ωd)</div>
            <div class="text-xl font-bold text-green-400 font-mono">
              {{ dampingType === 'underdamped' ? (dampedFrequency / (2 * Math.PI)).toFixed(2) + ' Hz' : 'N/A' }}
            </div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Quality Factor (Q)</div>
            <div class="text-xl font-bold text-violet-400 font-mono">
              {{ qualityFactor === Infinity ? '∞' : qualityFactor.toFixed(2) }}
            </div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Settling Time (2%)</div>
            <div class="text-xl font-bold text-pink-400 font-mono">
              {{ settlingTime.toFixed(3) }} s
            </div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400 mb-1">Time Constant (τ)</div>
            <div class="text-xl font-bold text-orange-400 font-mono">
              {{ (2 * L / R).toFixed(3) }} s
            </div>
          </div>
        </div>

        <!-- Equation -->
        <div class="bg-slate-900 rounded-lg p-4">
          <div class="text-sm text-slate-400 mb-2">Voltage Equation</div>
          <div class="text-lg font-mono text-slate-300 break-all">
            {{ dampingInfo.equation }}
          </div>
        </div>

        <!-- Peaks -->
        <div v-if="peaks.length > 1" class="bg-slate-900 rounded-lg p-4">
          <div class="text-sm text-slate-400 mb-2">Peak Values</div>
          <div class="space-y-1 max-h-32 overflow-y-auto">
            <div v-for="(peak, index) in peaks" :key="index" class="text-sm font-mono">
              <span class="text-slate-400">t{{ index }}:</span>
              <span class="text-cyan-400">{{ peak.time.toFixed(3) }}s</span>
              <span class="text-slate-400">|</span>
              <span class="text-green-400">{{ peak.voltage.toFixed(2) }}V</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Graph -->
    <div class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">Oscillation Graph</h2>
      <div class="flex justify-center">
        <canvas 
          ref="canvasRef" 
          class="w-full max-w-4xl rounded-lg"
          style="height: 400px;"
        ></canvas>
      </div>
      <div class="flex justify-center gap-6 mt-4 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-green-500"></div>
          <span class="text-slate-400">Underdamped (ζ &lt; 1)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-yellow-500"></div>
          <span class="text-slate-400">Critically Damped (ζ = 1)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-red-500"></div>
          <span class="text-slate-400">Overdamped (ζ &gt; 1)</span>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">Circuit Diagram</h2>
      <div class="flex justify-center">
        <svg viewBox="0 0 600 300" class="w-full max-w-3xl h-auto bg-slate-900 rounded-lg">
          <!-- Title -->
          <text x="300" y="30" text-anchor="middle" class="fill-cyan-400 text-lg font-bold">
            Series RLC Circuit (Step Response)
          </text>

          <!-- Main circuit loop -->
          <rect x="100" y="60" width="400" height="180" fill="none" stroke="#475569" stroke-width="3"/>

          <!-- Voltage Source -->
          <circle cx="300" cy="240" r="25" fill="none" stroke="#22d3ee" stroke-width="3"/>
          <text x="300" y="235" text-anchor="middle" class="fill-cyan-400 text-sm font-bold">V₀</text>
          <text x="300" y="255" text-anchor="middle" class="fill-cyan-400 text-xs">{{ initialVoltage }}V</text>
          <line x1="300" y1="215" x2="300" y2="200" stroke="#475569" stroke-width="3"/>
          <line x1="300" y1="265" x2="300" y2="280" stroke="#475569" stroke-width="3"/>

          <!-- Resistor (top) -->
          <line x1="150" y1="60" x2="170" y2="60" stroke="#f59e0b" stroke-width="3"/>
          <line x1="170" y1="45" x2="175" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="175" y1="45" x2="180" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="180" y1="45" x2="185" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="185" y1="45" x2="190" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="190" y1="45" x2="195" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="195" y1="45" x2="200" y2="75" stroke="#f59e0b" stroke-width="3"/>
          <line x1="200" y1="60" x2="220" y2="60" stroke="#f59e0b" stroke-width="3"/>
          <text x="185" y="40" text-anchor="middle" class="fill-amber-400 text-sm font-bold">R</text>
          <text x="185" y="30" text-anchor="middle" class="fill-amber-400 text-xs">{{ resistance }}Ω</text>

          <!-- Inductor (left) -->
          <line x1="100" y1="120" x2="100" y2="100" stroke="#22d3ee" stroke-width="3"/>
          <path d="M 90 100 Q 85 90, 90 80 Q 95 70, 90 60 Q 85 50, 90 40 Q 95 30, 90 20 Q 85 10, 100 10 Q 115 10, 110 20 Q 105 30, 110 40 Q 115 50, 110 60 Q 105 70, 110 80 Q 115 90, 110 100" 
                fill="none" stroke="#22d3ee" stroke-width="3"/>
          <line x1="100" y1="100" x2="100" y2="120" stroke="#22d3ee" stroke-width="3"/>
          <text x="70" y="60" text-anchor="middle" class="fill-cyan-400 text-sm font-bold">L</text>
          <text x="70" y="75" text-anchor="middle" class="fill-cyan-400 text-xs">{{ inductance }}mH</text>

          <!-- Capacitor (right) -->
          <line x1="500" y1="120" x2="500" y2="135" stroke="#4ade80" stroke-width="3"/>
          <line x1="475" y1="135" x2="525" y2="135" stroke="#4ade80" stroke-width="3"/>
          <line x1="475" y1="145" x2="525" y2="145" stroke="#4ade80" stroke-width="3"/>
          <line x1="500" y1="145" x2="500" y2="160" stroke="#4ade80" stroke-width="3"/>
          <text x="545" y="145" text-anchor="middle" class="fill-green-400 text-sm font-bold">C</text>
          <text x="545" y="160" text-anchor="middle" class="fill-green-400 text-xs">{{ capacitance }}µF</text>

          <!-- Current direction arrow -->
          <path d="M 130 70 L 130 50 L 125 55 M 130 50 L 135 55" fill="#8b5cf6" stroke="#8b5cf6" stroke-width="2"/>
          <text x="130" y="90" text-anchor="middle" class="fill-violet-400 text-xs">i(t)</text>

          <!-- Damping indicator -->
          <rect x="20" y="250" width="560" height="40" rx="5" :fill="dampingType === 'underdamped' ? '#4ade80' : dampingType === 'critically-damped' ? '#facc15' : '#f87171'" opacity="0.2"/>
          <text x="300" y="275" text-anchor="middle" :class="['text-lg font-bold', dampingInfo.color]">
            {{ dampingInfo.label }} - ζ = {{ dampingRatio.toFixed(3) }}
          </text>
        </svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-slate-800 rounded-xl p-6 space-y-6">
      <h2 class="text-xl font-semibold text-cyan-400">Understanding Damped Oscillations</h2>
      
      <div class="space-y-4">
        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🌊 What is Damping?</h3>
          <p class="text-slate-300 leading-relaxed">
            In an RLC circuit, energy oscillates between the inductor (magnetic field) and capacitor 
            (electric field). The resistor dissipates this energy as heat, causing the oscillations to 
            decay over time. The rate of decay depends on the damping ratio (ζ).
          </p>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">📊 Damping Types</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-green-900/30 rounded-lg p-4 border border-green-700">
              <div class="font-bold text-green-400 mb-2">Underdamped (ζ &lt; 1)</div>
              <p class="text-sm text-slate-300">
                Circuit oscillates with decaying amplitude. Common in radio circuits, filters, and 
                applications where resonance is desired. The system rings like a bell.
              </p>
            </div>
            <div class="bg-yellow-900/30 rounded-lg p-4 border border-yellow-700">
              <div class="font-bold text-yellow-400 mb-2">Critically Damped (ζ = 1)</div>
              <p class="text-sm text-slate-300">
                Fastest return to equilibrium without oscillation. Ideal for control systems, 
                door closers, and measuring instruments where overshoot is unacceptable.
              </p>
            </div>
            <div class="bg-red-900/30 rounded-lg p-4 border border-red-700">
              <div class="font-bold text-red-400 mb-2">Overdamped (ζ &gt; 1)</div>
              <p class="text-sm text-slate-300">
                Slow return to equilibrium without oscillation. Energy is dissipated so quickly 
                that the system can't complete even one cycle. Used in some power supplies.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🧮 Key Formulas</h3>
          <div class="space-y-2 text-slate-300 font-mono text-sm">
            <div>• Natural Frequency: <span class="text-cyan-400">ω₀ = 1/√(LC)</span></div>
            <div>• Damping Ratio: <span class="text-amber-400">ζ = R / (2√(L/C))</span></div>
            <div>• Damped Frequency: <span class="text-green-400">ωd = ω₀√(1-ζ²)</span> (underdamped only)</div>
            <div>• Quality Factor: <span class="text-violet-400">Q = 1/(2ζ)</span></div>
            <div>• Time Constant: <span class="text-pink-400">τ = 2L/R</span></div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🔬 Physical Analogies</h3>
          <p class="text-slate-300 leading-relaxed mb-3">
            RLC circuits behave similarly to mechanical spring-mass-damper systems:
          </p>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <div><span class="text-cyan-400">Inductor (L)</span> ↔ Mass (inertia)</div>
              <div><span class="text-green-400">Capacitor (C)</span> ↔ Spring (compliance)</div>
              <div><span class="text-amber-400">Resistor (R)</span> ↔ Damper (friction)</div>
            </div>
            <div class="space-y-2">
              <div><span class="text-cyan-400">Current (i)</span> ↔ Velocity</div>
              <div><span class="text-green-400">Voltage (v)</span> ↔ Force</div>
              <div><span class="text-violet-400">Charge (q)</span> ↔ Position</div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">💡 Practical Applications</h3>
          <ul class="space-y-2 text-slate-300">
            <li>• <strong>Radio Tuners:</strong> Underdamped RLC circuits select specific frequencies</li>
            <li>• <strong>Power Supplies:</strong> Critically damped filters reduce ripple without ringing</li>
            <li>• <strong>Oscilloscopes:</strong> Probes designed for critical damping for accurate measurements</li>
            <li>• <strong>Automotive Suspension:</strong> Shock absorbers provide damping (mechanical analog)</li>
            <li>• <strong>Audio Crossovers:</strong> RLC networks separate frequency bands</li>
          </ul>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🎯 Design Tips</h3>
          <ul class="space-y-2 text-slate-300">
            <li>• <strong>For resonance:</strong> Use low R relative to √(L/C) to achieve underdamping</li>
            <li>• <strong>For fast settling:</strong> Adjust R to achieve critical damping (ζ ≈ 1)</li>
            <li>• <strong>For high Q:</strong> Minimize R in the circuit (low resistance = sharper resonance)</li>
            <li>• <strong>For bandwidth:</strong> BW = f₀/Q (higher Q = narrower bandwidth)</li>
            <li>• <strong>Avoid parasitic effects:</strong> All real components have R, L, and C properties</li>
          </ul>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">📈 Energy Transfer</h3>
          <p class="text-slate-300 leading-relaxed">
            In an underdamped circuit, energy continuously transfers between the inductor's magnetic field 
            (E = ½Li²) and the capacitor's electric field (E = ½CV²). The resistor dissipates this energy 
            as heat (P = I²R), causing the total energy to decay exponentially. The system is completely 
            settled when all energy has been dissipated.
          </p>
        </div>
      </div>
    </div>

    <!-- Interactive Experiment -->
    <div class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">🔬 Try These Experiments</h2>
      <div class="grid md:grid-cols-2 gap-4">
        <button 
          @click="resistance = 10; inductance = 100; capacitance = 100"
          class="bg-green-600 hover:bg-green-500 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div class="font-bold text-white mb-1">Underdamped Example</div>
          <div class="text-sm text-green-200">R=10Ω, L=100mH, C=100µF</div>
          <div class="text-xs text-green-300 mt-1">Watch the oscillations decay slowly</div>
        </button>

        <button 
          @click="resistance = 63; inductance = 100; capacitance = 100"
          class="bg-yellow-600 hover:bg-yellow-500 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div class="font-bold text-white mb-1">Critically Damped Example</div>
          <div class="text-sm text-yellow-200">R≈63Ω, L=100mH, C=100µF</div>
          <div class="text-xs text-yellow-300 mt-1">Fastest return without overshoot</div>
        </button>

        <button 
          @click="resistance = 500; inductance = 100; capacitance = 100"
          class="bg-red-600 hover:bg-red-500 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div class="font-bold text-white mb-1">Overdamped Example</div>
          <div class="text-sm text-red-200">R=500Ω, L=100mH, C=100µF</div>
          <div class="text-xs text-red-300 mt-1">Very slow, no oscillation</div>
        </button>

        <button 
          @click="resistance = 1; inductance = 200; capacitance = 50"
          class="bg-violet-600 hover:bg-violet-500 rounded-lg p-4 text-left transition-all hover:scale-105"
        >
          <div class="font-bold text-white mb-1">High Q Resonance</div>
          <div class="text-sm text-violet-200">R=1Ω, L=200mH, C=50µF</div>
          <div class="text-xs text-violet-300 mt-1">Very sharp, long-lasting oscillation</div>
        </button>
      </div>
    </div>
  </div>
</template>

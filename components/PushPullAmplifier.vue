<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🔊 Push-Pull Amplifier Simulator (Class B)
    </h3>

    <!-- Canvas for Waveform Display -->
    <div class="mb-8">
      <div class="relative bg-gray-900 rounded-lg overflow-hidden">
        <canvas ref="waveformCanvas" class="w-full" style="height: 350px;"></canvas>
        
        <!-- Overlay Labels -->
        <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded px-3 py-2">
          <div class="flex items-center gap-2 text-xs">
            <span class="w-3 h-0.5 bg-cyan-400"></span>
            <span class="text-white">Input</span>
          </div>
          <div class="flex items-center gap-2 text-xs mt-1">
            <span class="w-3 h-0.5 bg-yellow-400"></span>
            <span class="text-white">Output</span>
          </div>
          <div class="flex items-center gap-2 text-xs mt-1">
            <span class="w-3 h-0.5 bg-red-400"></span>
            <span class="text-white">Crossover</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="mb-8">
      <svg viewBox="0 0 800 400" class="w-full h-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-lg">
        <!-- Title -->
        <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="currentColor" class="text-gray-800 dark:text-gray-200">
          Push-Pull Class B Amplifier Circuit
        </text>

        <!-- Supply Rails -->
        <line x1="150" y1="60" x2="650" y2="60" stroke="#ef4444" stroke-width="3" />
        <text x="160" y="55" font-size="12" fill="#ef4444" font-weight="bold">+Vcc</text>
        
        <line x1="150" y1="340" x2="650" y2="340" stroke="#3b82f6" stroke-width="3" />
        <text x="160" y="355" font-size="12" fill="#3b82f6" font-weight="bold">-Vcc</text>

        <!-- NPN Transistor (Top) -->
        <g>
          <!-- Base -->
          <line x1="350" y1="180" x2="380" y2="180" stroke="#22c55e" stroke-width="3" />
          <circle cx="390" cy="180" r="3" fill="#22c55e" />
          
          <!-- Collector -->
          <line x1="400" y1="160" x2="400" y2="60" stroke="#ef4444" stroke-width="2" />
          
          <!-- Emitter -->
          <line x1="400" y1="200" x2="400" y2="240" stroke="#fbbf24" stroke-width="2" />
          
          <!-- Transistor symbol -->
          <line x1="380" y1="160" x2="380" y2="200" stroke="#22c55e" stroke-width="3" />
          <line x1="380" y1="170" x2="410" y2="150" stroke="#22c55e" stroke-width="2" />
          <line x1="380" y1="190" x2="410" y2="210" stroke="#22c55e" stroke-width="2" />
          
          <text x="420" y="175" font-size="11" fill="#22c55e" font-weight="bold">Q1 (NPN)</text>
        </g>

        <!-- PNP Transistor (Bottom) -->
        <g>
          <!-- Base -->
          <line x1="350" y1="220" x2="380" y2="220" stroke="#22c55e" stroke-width="3" />
          <circle cx="390" cy="220" r="3" fill="#22c55e" />
          
          <!-- Emitter -->
          <line x1="400" y1="240" x2="400" y2="340" stroke="#fbbf24" stroke-width="2" />
          
          <!-- Collector -->
          <line x1="400" y1="200" x2="400" y2="160" stroke="#ef4444" stroke-width="2" />
          
          <!-- Transistor symbol -->
          <line x1="380" y1="200" x2="380" y2="240" stroke="#22c55e" stroke-width="3" />
          <line x1="380" y1="210" x2="410" y2="190" stroke="#22c55e" stroke-width="2" />
          <line x1="380" y1="230" x2="410" y2="250" stroke="#22c55e" stroke-width="2" />
          
          <text x="420" y="235" font-size="11" fill="#22c55e" font-weight="bold">Q2 (PNP)</text>
        </g>

        <!-- Input Signal -->
        <g>
          <circle cx="280" cy="200" r="25" fill="white" stroke="#9333ea" stroke-width="2" />
          <text x="280" y="195" text-anchor="middle" font-size="10" fill="#9333ea" font-weight="bold">~</text>
          <text x="280" y="208" text-anchor="middle" font-size="8" fill="#666">AC</text>
          <text x="280" y="245" text-anchor="middle" font-size="10" fill="#9333ea">Input</text>
          <line x1="305" y1="200" x2="350" y2="200" stroke="#22c55e" stroke-width="2" stroke-dasharray="4" />
        </g>

        <!-- Output Connection -->
        <line x1="400" y1="240" x2="520" y2="240" stroke="#fbbf24" stroke-width="3" />
        <circle cx="520" cy="240" r="5" fill="#fbbf24" />
        <text x="520" y="265" text-anchor="middle" font-size="11" fill="#fbbf24" font-weight="bold">Output</text>

        <!-- Load -->
        <g>
          <rect x="570" y="225" width="60" height="30" fill="white" stroke="#fbbf24" stroke-width="2" rx="3" />
          <text x="600" y="238" text-anchor="middle" font-size="10" fill="#fbbf24" font-weight="bold">LOAD</text>
          <text x="600" y="250" text-anchor="middle" font-size="9" fill="#fbbf24">{{ loadResistance }}Ω</text>
          <line x1="525" y1="240" x2="570" y2="240" stroke="#fbbf24" stroke-width="2" />
          <line x1="630" y1="240" x2="650" y2="240" stroke="#fbbf24" stroke-width="2" />
          <line x1="650" y1="240" x2="650" y2="300" stroke="#fbbf24" stroke-width="2" />
          <line x1="650" y1="300" x2="400" y2="300" stroke="#fbbf24" stroke-width="2" />
        </g>

        <!-- Ground reference -->
        <line x1="400" y1="300" x2="400" y2="340" stroke="#fbbf24" stroke-width="2" />

        <!-- Bias Diodes -->
        <g>
          <line x1="330" y1="180" x2="330" y2="220" stroke="#22c55e" stroke-width="2" />
          <polygon points="330,185 325,190 335,195" fill="#22c55e" />
          <polygon points="330,215 325,205 335,210" fill="#22c55e" />
          <text x="315" y="205" text-anchor="end" font-size="9" fill="#22c55e">D1, D2</text>
          <text x="315" y="217" text-anchor="end" font-size="8" fill="#666">(Bias)</text>
        </g>

        <!-- Crossover Distortion Indicator -->
        <g v-if="crossoverDistortion > 0.05">
          <circle cx="680" cy="100" r="40" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" />
          <text x="680" y="95" text-anchor="middle" font-size="10" fill="#ef4444" font-weight="bold">⚠️ Crossover</text>
          <text x="680" y="108" text-anchor="middle" font-size="9" fill="#ef4444">Distortion</text>
          <text x="680" y="125" text-anchor="middle" font-size="11" fill="#ef4444" font-weight="bold">{{ (crossoverDistortion * 100).toFixed(1) }}%</text>
        </g>
      </svg>
    </div>

    <!-- Controls -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Input Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          📊 Input Amplitude: {{ inputVoltage.toFixed(1) }}V
        </label>
        <SliderInput
          v-model="inputVoltage"
          :min="0.5"
          :max="5"
          :step="0.1"
          unit="V"
        />
      </div>

      <!-- Supply Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          ⚡ Supply Voltage: ±{{ supplyVoltage }}V
        </label>
        <SliderInput
          v-model="supplyVoltage"
          :min="5"
          :max="25"
          :step="1"
          unit="V"
        />
      </div>

      <!-- Load Resistance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          🔌 Load Resistance: {{ loadResistance }}Ω
        </label>
        <SliderInput
          v-model="loadResistance"
          :min="4"
          :max="32"
          :step="2"
          unit="Ω"
        />
      </div>

      <!-- Frequency -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          〰️ Frequency: {{ frequency }}Hz
        </label>
        <SliderInput
          v-model="frequency"
          :min="20"
          :max="2000"
          :step="10"
          unit="Hz"
        />
      </div>

      <!-- Bias Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          🔋 Bias Voltage: {{ biasVoltage.toFixed(2) }}V
        </label>
        <SliderInput
          v-model="biasVoltage"
          :min="0"
          :max="1.5"
          :step="0.05"
          unit="V"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Reduces crossover distortion
        </p>
      </div>

      <!-- Animation Speed -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          ▶️ Animation Speed
        </label>
        <SliderInput
          v-model="animationSpeed"
          :min="0.25"
          :max="2"
          :step="0.25"
        />
      </div>
    </div>

    <!-- Playback Controls -->
    <div class="flex justify-center gap-4 mb-8">
      <button
        @click="toggleAnimation"
        class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
      >
        <span v-if="isPlaying">⏸️ Pause</span>
        <span v-else>▶️ Play</span>
      </button>
      <button
        @click="resetSimulation"
        class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
      >
        🔄 Reset
      </button>
    </div>

    <!-- Statistics Display -->
    <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Amplifier Statistics</h4>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-primary-highlight">{{ (efficiency * 100).toFixed(1) }}%</div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Efficiency</div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-500">{{ voltageGain.toFixed(2) }}×</div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Voltage Gain</div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold" :class="crossoverDistortion > 0.05 ? 'text-red-500' : 'text-green-500'">
            {{ (crossoverDistortion * 100).toFixed(2) }}%
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Crossover Distortion</div>
        </div>
        
        <div class="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-500">{{ outputPower.toFixed(2) }}W</div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Output Power</div>
        </div>
      </div>
    </div>

    <!-- Presets -->
    <div>
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🎯 Quick Presets</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="loadPreset('minimal')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          ⚡ Minimal Bias
        </button>
        <button
          @click="loadPreset('optimal')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          ✅ Optimal Bias
        </button>
        <button
          @click="loadPreset('highPower')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🔊 High Power
        </button>
        <button
          @click="loadPreset('lowDistortion')"
          class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors"
        >
          🎵 Low Distortion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import SliderInput from './SliderInput.vue'

// Component references
const waveformCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let phase = 0

// Input parameters
const inputVoltage = ref(2.0)
const supplyVoltage = ref(15)
const loadResistance = ref(8)
const frequency = ref(440)
const biasVoltage = ref(0.7)
const animationSpeed = ref(1)

// Animation state
const isPlaying = ref(true)

// Calculated values
const crossoverDistortion = ref(0.15)
const voltageGain = ref(0.95)
const efficiency = ref(0.785)
const outputPower = ref(2.5)

// Initialize canvas
onMounted(() => {
  if (waveformCanvas.value) {
    ctx = waveformCanvas.value.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    startAnimation()
  }
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', resizeCanvas)
})

const resizeCanvas = () => {
  if (waveformCanvas.value) {
    const rect = waveformCanvas.value.getBoundingClientRect()
    waveformCanvas.value.width = rect.width * window.devicePixelRatio
    waveformCanvas.value.height = rect.height * window.devicePixelRatio
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  }
}

// Calculate crossover distortion
const calculateCrossoverDistortion = () => {
  const vbe = 0.7 // Base-emitter voltage drop
  const deadZone = vbe - biasVoltage.value
  
  if (deadZone <= 0) {
    crossoverDistortion.value = 0
  } else {
    // Distortion is proportional to dead zone relative to input amplitude
    crossoverDistortion.value = Math.min(deadZone / inputVoltage.value, 0.5)
  }
}

// Calculate efficiency
const calculateEfficiency = () => {
  // Class B theoretical max efficiency is 78.5% (π/4)
  // Real efficiency depends on output swing and losses
  const voltageSwing = Math.min(inputVoltage.value * voltageGain.value, supplyVoltage.value * 0.9)
  const theoreticalMax = Math.PI / 4
  const swingRatio = voltageSwing / supplyVoltage.value
  efficiency.value = theoreticalMax * swingRatio * (1 - crossoverDistortion.value * 0.3)
}

// Calculate voltage gain
const calculateVoltageGain = () => {
  // Push-pull follower has gain slightly less than 1
  voltageGain.value = 0.95 - crossoverDistortion.value * 0.2
}

// Calculate output power
const calculateOutputPower = () => {
  const vout = inputVoltage.value * voltageGain.value
  const vrms = vout / Math.sqrt(2)
  outputPower.value = (vrms * vrms) / loadResistance.value
}

// Watch for parameter changes
watch([inputVoltage, supplyVoltage, loadResistance, frequency, biasVoltage], () => {
  calculateCrossoverDistortion()
  calculateEfficiency()
  calculateVoltageGain()
  calculateOutputPower()
}, { immediate: true })

// Animation loop
const animate = () => {
  if (!ctx || !waveformCanvas.value) return
  
  const canvas = waveformCanvas.value
  const width = canvas.width / window.devicePixelRatio
  const height = canvas.height / window.devicePixelRatio
  
  // Clear canvas
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 0.5
  for (let i = 0; i < width; i += 50) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }
  for (let i = 0; i < height; i += 50) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(width, i)
    ctx.stroke()
  }
  
  // Draw center line
  ctx.strokeStyle = '#4B5563'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  
  const centerY = height / 2
  const amplitudeScale = Math.min(height * 0.35, 120)
  
  // Draw input waveform (cyan)
  ctx.strokeStyle = '#22d3ee'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + phase
    const input = Math.sin(t)
    const y = centerY - input * amplitudeScale * 0.7
    
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Draw output waveform with crossover distortion (yellow)
  ctx.strokeStyle = '#facc15'
  ctx.lineWidth = 2
  ctx.beginPath()
  
  const vbe = 0.7
  const deadZone = Math.max(0, vbe - biasVoltage.value)
  const normalizedDeadZone = deadZone / inputVoltage.value
  
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + phase
    const input = Math.sin(t)
    let output = input
    
    // Apply crossover distortion
    if (Math.abs(input) < normalizedDeadZone) {
      output = 0
    } else if (input > 0) {
      output = (input - normalizedDeadZone) / (1 - normalizedDeadZone)
    } else {
      output = (input + normalizedDeadZone) / (1 - normalizedDeadZone)
    }
    
    // Apply gain
    output *= voltageGain.value
    
    // Clip at supply voltage
    const maxOutput = supplyVoltage.value / inputVoltage.value
    output = Math.max(-maxOutput, Math.min(maxOutput, output))
    
    const y = centerY - output * amplitudeScale * 0.7
    
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Highlight crossover distortion regions (red)
  if (crossoverDistortion.value > 0.05) {
    ctx.strokeStyle = 'rgba(248, 113, 113, 0.6)'
    ctx.lineWidth = 3
    ctx.beginPath()
    
    for (let x = 0; x < width; x++) {
      const t = (x / width) * 4 * Math.PI + phase
      const input = Math.sin(t)
      let output = input
      
      if (Math.abs(input) < normalizedDeadZone) {
        output = 0
      } else if (input > 0) {
        output = (input - normalizedDeadZone) / (1 - normalizedDeadZone)
      } else {
        output = (input + normalizedDeadZone) / (1 - normalizedDeadZone)
      }
      
      output *= voltageGain.value
      const maxOutput = supplyVoltage.value / inputVoltage.value
      output = Math.max(-maxOutput, Math.min(maxOutput, output))
      
      // Only draw distorted regions
      if (Math.abs(input) < normalizedDeadZone * 1.2) {
        const y = centerY - output * amplitudeScale * 0.7
        
        if (x === 0 || Math.abs(Math.sin((x-1) / width * 4 * Math.PI + phase)) >= normalizedDeadZone * 1.2) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
    }
    ctx.stroke()
  }
  
  // Update phase
  phase += 0.05 * animationSpeed.value * (frequency.value / 440)
  
  // Continue animation
  if (isPlaying.value) {
    animationId = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (animationId === null) {
    isPlaying.value = true
    animate()
  }
}

const stopAnimation = () => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
    isPlaying.value = false
  }
}

const toggleAnimation = () => {
  if (isPlaying.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

const resetSimulation = () => {
  inputVoltage.value = 2.0
  supplyVoltage.value = 15
  loadResistance.value = 8
  frequency.value = 440
  biasVoltage.value = 0.7
  phase = 0
  calculateCrossoverDistortion()
  calculateEfficiency()
  calculateVoltageGain()
  calculateOutputPower()
}

const loadPreset = (type: string) => {
  switch (type) {
    case 'minimal':
      inputVoltage.value = 2.0
      supplyVoltage.value = 15
      loadResistance.value = 8
      frequency.value = 440
      biasVoltage.value = 0.0
      break
    case 'optimal':
      inputVoltage.value = 2.0
      supplyVoltage.value = 15
      loadResistance.value = 8
      frequency.value = 440
      biasVoltage.value = 0.7
      break
    case 'highPower':
      inputVoltage.value = 4.0
      supplyVoltage.value = 25
      loadResistance.value = 4
      frequency.value = 1000
      biasVoltage.value = 0.8
      break
    case 'lowDistortion':
      inputVoltage.value = 1.5
      supplyVoltage.value = 12
      loadResistance.value = 8
      frequency.value = 440
      biasVoltage.value = 1.2
      break
  }
  phase = 0
}
</script>

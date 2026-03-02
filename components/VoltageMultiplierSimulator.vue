<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// Reactive state
const peakVoltage = ref(10)
const frequency = ref(50)
const loadResistance = ref(1000)
const numStages = ref(2)
const animationSpeed = ref(1)
const isRunning = ref(true)

// Animation state
const phase = ref(0)
const chargingStates = ref({
  c1: 0,
  c2: 0
})

// Computed values
const period = computed(() => 1 / frequency.value)
const angularFrequency = computed(() => 2 * Math.PI * frequency.value)
const timeScale = computed(() => period.value / 200) // 200 points per cycle

// Input voltage at current phase
const inputVoltage = computed(() => {
  return peakVoltage.value * Math.sin(phase.value)
})

// Output voltage (simplified model for voltage doubler)
const outputVoltage = computed(() => {
  const vPeak = peakVoltage.value
  const vDrop = (vPeak / loadResistance.value) * 100 // Diode drop approximation
  
  if (numStages.value === 1) {
    // Half-wave rectifier
    return Math.max(0, inputVoltage.value) - vDrop
  } else {
    // Voltage doubler (simplified)
    const base = vPeak * 0.95 // Efficiency factor
    const ripple = (vPeak / loadResistance.value) * 50 * frequency.value / 1000
    return base - ripple + Math.sin(phase.value) * ripple * 0.3
  }
})

// Theoretical output (DC)
const theoreticalOutput = computed(() => {
  const vPeak = peakVoltage.value
  const drop = 0.7 // Diode forward voltage
  
  if (numStages.value === 1) {
    return vPeak - drop
  } else {
    return 2 * vPeak - 2 * drop
  }
})

// Ripple voltage
const rippleVoltage = computed(() => {
  const iLoad = theoreticalOutput.value / loadResistance.value
  const c = 100e-6 // 100µF capacitor
  const t = 1 / frequency.value
  return (iLoad * t) / c
})

// Voltage gain
const voltageGain = computed(() => {
  return theoreticalOutput.value / peakVoltage.value
})

// Waveform data for chart
const waveformPoints = computed(() => {
  const points = []
  for (let i = 0; i < 360; i += 2) {
    const rad = (i * Math.PI) / 180
    const vin = peakVoltage.value * Math.sin(rad)
    let vout
    
    if (numStages.value === 1) {
      vout = Math.max(0, vin) - 0.7
    } else {
      const base = peakVoltage.value * 1.9
      vout = base + Math.sin(rad) * 0.1
    }
    
    points.push({ x: i, vin: vin, vout: Math.max(0, vout) })
  }
  return points
})

// SVG Path for input waveform
const inputWaveformPath = computed(() => {
  const width = 300
  const height = 120
  const centerY = height / 2
  const scale = (height / 2 - 10) / peakVoltage.value
  
  let path = 'M '
  waveformPoints.value.forEach((point, i) => {
    const x = (point.x / 360) * width
    const y = centerY - point.vin * scale
    path += `${x.toFixed(1)},${y.toFixed(1)} `
  })
  
  return path
})

// SVG Path for output waveform
const outputWaveformPath = computed(() => {
  const width = 300
  const height = 120
  const maxV = peakVoltage.value * 2.2
  const scale = (height - 20) / maxV
  
  let path = 'M '
  waveformPoints.value.forEach((point, i) => {
    const x = (point.x / 360) * width
    const y = height - 5 - point.vout * scale
    path += `${x.toFixed(1)},${y.toFixed(1)} `
  })
  
  return path
})

// Current indicator for animation
const currentFlow = computed(() => {
  const vin = inputVoltage.value
  const vout = outputVoltage.value
  
  // Determine current flow direction based on phase
  const sinPhase = Math.sin(phase.value)
  
  if (numStages.value === 1) {
    return sinPhase > 0.7 ? 'charging' : 'discharging'
  } else {
    // Voltage doubler
    const normalizedPhase = ((phase.value % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    if (normalizedPhase < Math.PI) {
      return 'charging-c1'
    } else {
      return 'charging-c2'
    }
  }
})

// Capacitor charge levels (0-1)
const capacitorCharges = computed(() => {
  const sinPhase = Math.sin(phase.value)
  
  return {
    c1: numStages.value >= 1 ? Math.max(0, sinPhase) / peakVoltage.value : 0,
    c2: numStages.value >= 2 ? Math.min(1, (outputVoltage.value / peakVoltage.value) / 2) : 0
  }
})

// Presets
const presets = [
  { name: 'Standard Doubler', peakVoltage: 10, frequency: 50, loadResistance: 1000, numStages: 2 },
  { name: 'Low Voltage', peakVoltage: 5, frequency: 60, loadResistance: 500, numStages: 2 },
  { name: 'High Voltage', peakVoltage: 20, frequency: 50, loadResistance: 2000, numStages: 2 },
  { name: 'Heavy Load', peakVoltage: 12, frequency: 50, loadResistance: 100, numStages: 2 }
]

const applyPreset = (preset: typeof presets[0]) => {
  peakVoltage.value = preset.peakVoltage
  frequency.value = preset.frequency
  loadResistance.value = preset.loadResistance
  numStages.value = preset.numStages
}

// Animation loop
let animationId: number | null = null

const animate = () => {
  if (!isRunning.value) return
  
  phase.value += 0.05 * animationSpeed.value
  if (phase.value > 2 * Math.PI) {
    phase.value -= 2 * Math.PI
  }
  
  animationId = requestAnimationFrame(animate)
}

watch(isRunning, (running) => {
  if (running) {
    animate()
  } else if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

onMounted(() => {
  animate()
})

// Cleanup
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Voltage Multiplier Simulator</h3>
    
    <!-- Presets -->
    <div class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="preset in presets"
        :key="preset.name"
        @click="applyPreset(preset)"
        class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary/20 dark:hover:bg-primary/30 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
      >
        {{ preset.name }}
      </button>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Controls -->
      <div class="space-y-6">
        <!-- Peak Voltage -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Peak Voltage (Vₚ)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="peakVoltage"
              type="number" 
              step="0.5"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
          <input 
            v-model.number="peakVoltage"
            type="range"
            min="1"
            max="30"
            step="0.5"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Frequency -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Frequency
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="frequency"
              type="number" 
              step="5"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Hz</span>
          </div>
          <input 
            v-model.number="frequency"
            type="range"
            min="10"
            max="100"
            step="5"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Load Resistance -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Load Resistance
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="loadResistance"
              type="number" 
              step="50"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
          </div>
          <input 
            v-model.number="loadResistance"
            type="range"
            min="50"
            max="5000"
            step="50"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Number of Stages -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Configuration
          </label>
          <div class="flex gap-2">
            <button
              @click="numStages = 1"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                numStages === 1
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Half-Wave
            </button>
            <button
              @click="numStages = 2"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                numStages === 2
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Doubler
            </button>
          </div>
        </div>
        
        <!-- Animation Speed -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Animation Speed
          </label>
          <div class="flex items-center gap-4">
            <button
              @click="isRunning = !isRunning"
              class="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              {{ isRunning ? '⏸ Pause' : '▶ Play' }}
            </button>
            <input 
              v-model.number="animationSpeed"
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
            />
          </div>
        </div>
      </div>
      
      <!-- Circuit Diagram -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Circuit Diagram</h4>
          
          <!-- SVG Circuit Diagram -->
          <svg viewBox="0 0 400 250" class="w-full h-auto">
            <!-- Title -->
            <text x="200" y="20" text-anchor="middle" class="text-sm font-semibold" fill="currentColor">
              {{ numStages === 1 ? 'Half-Wave Rectifier' : 'Voltage Doubler' }}
            </text>
            
            <!-- AC Source -->
            <circle cx="50" cy="180" r="25" fill="white" stroke="#9FA8DA" stroke-width="2"/>
            <path d="M40 180 Q 50 165, 60 180 Q 50 195, 40 180" fill="none" stroke="#9FA8DA" stroke-width="2"/>
            <text x="50" y="185" text-anchor="middle" font-size="12" fill="currentColor">AC</text>
            
            <!-- Ground connection -->
            <line x1="50" y1="205" x2="50" y2="220" stroke="#94A3B8" stroke-width="2"/>
            <line x1="40" y1="220" x2="60" y2="220" stroke="#94A3B8" stroke-width="2"/>
            <line x1="45" y1="225" x2="55" y2="225" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Main circuit paths -->
            <line x1="75" y1="180" x2="100" y2="180" stroke="#94A3B8" stroke-width="2"/>
            <line x1="100" y1="180" x2="100" y2="80" stroke="#94A3B8" stroke-width="2"/>
            <line x1="100" y1="80" x2="150" y2="80" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Diode D1 -->
            <g transform="translate(150, 70)">
              <polygon points="0,0 0,20 15,10" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
              <line x1="15" y1="0" x2="15" y2="20" stroke="#1D4ED8" stroke-width="2"/>
              <text x="7" y="-5" font-size="12" fill="currentColor">D1</text>
            </g>
            
            <line x1="165" y1="80" x2="220" y2="80" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Capacitor C1 -->
            <g transform="translate(220, 65)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#94A3B8" stroke-width="2"/>
              <line x1="-10" y1="10" x2="10" y2="10" stroke="#22C55E" stroke-width="2"/>
              <line x1="-10" y1="16" x2="10" y2="16" stroke="#22C55E" stroke-width="2"/>
              <line x1="0" y1="16" x2="0" y2="30" stroke="#94A3B8" stroke-width="2"/>
              <text x="15" y="18" font-size="12" fill="currentColor">C1</text>
              
              <!-- Charge level indicator -->
              <rect x="-8" y="11" width="16" height="4" :fill="`rgba(34, 197, 94, ${capacitorCharges.c1})`"/>
            </g>
            
            <!-- Output node -->
            <line x1="220" y1="95" x2="220" y2="130" stroke="#94A3B8" stroke-width="2"/>
            <line x1="220" y1="130" x2="350" y2="130" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Load resistor -->
            <rect x="290" y="125" width="40" height="10" fill="white" stroke="#F59E0B" stroke-width="2"/>
            <text x="310" y="120" text-anchor="middle" font-size="12" fill="currentColor">Load</text>
            
            <!-- Return path -->
            <line x1="330" y1="130" x2="380" y2="130" stroke="#94A3B8" stroke-width="2"/>
            <line x1="380" y1="130" x2="380" y2="220" stroke="#94A3B8" stroke-width="2"/>
            <line x1="50" y1="220" x2="380" y2="220" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Second diode path (for doubler) -->
            <g v-if="numStages === 2">
              <line x1="220" y1="80" x2="220" y2="50" stroke="#94A3B8" stroke-width="2"/>
              <line x1="220" y1="50" x2="280" y2="50" stroke="#94A3B8" stroke-width="2"/>
              
              <!-- Diode D2 -->
              <g transform="translate(280, 40)">
                <polygon points="0,0 0,20 15,10" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
                <line x1="15" y1="0" x2="15" y2="20" stroke="#1D4ED8" stroke-width="2"/>
                <text x="7" y="-5" font-size="12" fill="currentColor">D2</text>
              </g>
              
              <line x1="295" y1="50" x2="350" y2="50" stroke="#94A3B8" stroke-width="2"/>
              
              <!-- Capacitor C2 -->
              <g transform="translate(350, 35)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#94A3B8" stroke-width="2"/>
                <line x1="-10" y1="10" x2="10" y2="10" stroke="#22C55E" stroke-width="2"/>
                <line x1="-10" y1="16" x2="10" y2="16" stroke="#22C55E" stroke-width="2"/>
                <line x1="0" y1="16" x2="0" y2="95" stroke="#94A3B8" stroke-width="2"/>
                <text x="15" y="18" font-size="12" fill="currentColor">C2</text>
                
                <!-- Charge level indicator -->
                <rect x="-8" y="11" width="16" height="4" :fill="`rgba(34, 197, 94, ${capacitorCharges.c2})`"/>
              </g>
              
              <!-- Connection point -->
              <circle cx="220" cy="80" r="4" fill="#9FA8DA"/>
            </g>
            
            <!-- Current flow indicators -->
            <g v-if="isRunning">
              <circle :cx="120" cy="80" r="4" :fill="currentFlow.includes('charging') ? '#3B82F6' : '#94A3B8'">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
              </circle>
              <circle :cx="190" cy="80" r="4" :fill="currentFlow.includes('charging') ? '#3B82F6' : '#94A3B8'">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s"/>
              </circle>
            </g>
            
            <!-- Voltage indicators -->
            <text x="50" y="250" font-size="11" fill="currentColor">
              Vin: {{ inputVoltage.toFixed(1) }}V
            </text>
            <text x="350" y="250" font-size="11" fill="currentColor" text-anchor="end">
              Vout: {{ outputVoltage.toFixed(1) }}V
            </text>
          </svg>
        </div>
        
        <!-- Waveform Display -->
        <div class="bg-white dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Waveforms</h4>
          
          <svg viewBox="0 0 320 140" class="w-full h-auto">
            <!-- Grid -->
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="320" height="120" fill="url(#grid)"/>
            
            <!-- Zero line -->
            <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
            
            <!-- Input waveform (blue) -->
            <path 
              :d="inputWaveformPath" 
              fill="none" 
              stroke="#3B82F6" 
              stroke-width="1.5"
              opacity="0.5"
            />
            
            <!-- Output waveform (green) -->
            <path 
              :d="outputWaveformPath" 
              fill="none" 
              stroke="#22C55E" 
              stroke-width="2"
            />
            
            <!-- Legend -->
            <g transform="translate(5, 10)">
              <line x1="0" y1="0" x2="20" y2="0" stroke="#3B82F6" stroke-width="1.5" opacity="0.5"/>
              <text x="25" y="4" font-size="10" fill="currentColor">Input</text>
              
              <line x1="60" y1="0" x2="80" y2="0" stroke="#22C55E" stroke-width="2"/>
              <text x="85" y="4" font-size="10" fill="currentColor">Output</text>
            </g>
          </svg>
        </div>
        
        <!-- Real-time Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ theoreticalOutput.toFixed(1) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">DC Output (V)</div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ voltageGain.toFixed(1) }}x
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Voltage Gain</div>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {{ rippleVoltage.toFixed(2) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Ripple (V)</div>
          </div>
          
          <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {{ (theoreticalOutput ** 2 / loadResistance).toFixed(1) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Power (mW)</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Educational Content -->
    <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Voltage Multipliers Work</h4>
      
      <div class="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Half-Wave Rectifier</h5>
          <ul class="space-y-1 list-disc list-inside">
            <li>Converts AC to pulsating DC</li>
            <li>Output: Vₚ - V₍diode₎</li>
            <li>Single diode, simple design</li>
            <li>Used in basic power supplies</li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Voltage Doubler</h5>
          <ul class="space-y-1 list-disc list-inside">
            <li>Doubles peak input voltage</li>
            <li>Output: 2×Vₚ - 2×V₍diode₎</li>
            <li>Uses 2 diodes, 2 capacitors</li>
            <li>Applications: CRT displays, ion generators</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Key Formulas:</p>
        <div class="font-mono text-sm space-y-1">
          <p>Half-Wave: V₍dc₎ = Vₚ - V₍diode₎</p>
          <p>Doubler: V₍dc₎ = 2×Vₚ - 2×V₍diode₎</p>
          <p>Ripple: V₍ripple₎ = I₍load₎ × T / C</p>
          <p>Gain = V₍out₎ / V₍in₎</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #9FA8DA;
  cursor: pointer;
  border-radius: 50%;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #9FA8DA;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

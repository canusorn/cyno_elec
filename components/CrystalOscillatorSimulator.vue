<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      🔮 Crystal Oscillator Interactive Simulator
    </h3>

    <!-- Control Panel -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Crystal Selection -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Crystal Frequency
          </label>
          <select v-model.number="crystalFreq" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="32.768">32.768 kHz (Watch Crystal)</option>
            <option value="100">100 kHz</option>
            <option value="1">1 MHz</option>
            <option value="8">8 MHz</option>
            <option value="16">16 MHz</option>
            <option value="20">20 MHz</option>
            <option value="25">25 MHz</option>
            <option value="50">50 MHz</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Temperature: {{ temperature }}°C
          </label>
          <input type="range" v-model.number="temperature" min="-40" max="85" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>-40°C</span>
            <span>25°C</span>
            <span>85°C</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Load Capacitance: {{ loadCap }} pF
          </label>
          <input type="range" v-model.number="loadCap" min="5" max="50" step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer">
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>5 pF</span>
            <span>25 pF</span>
            <span>50 pF</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Circuit Type
          </label>
          <select v-model="circuitType"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="pierce">Pierce Oscillator</option>
            <option value="colpitts">Colpitts Oscillator</option>
            <option value="inverter">CMOS Inverter</option>
          </select>
        </div>
      </div>

      <!-- Quick Presets -->
      <div class="space-y-4">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Quick Presets
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button @click="applyPreset('watch')"
            class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
            ⌚ Watch (32 kHz)
          </button>
          <button @click="applyPreset('mcu')"
            class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
            🔌 MCU (16 MHz)
          </button>
          <button @click="applyPreset('usb')"
            class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
            📡 USB (24 MHz)
          </button>
          <button @click="applyPreset('rf')"
            class="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium">
            📶 RF (50 MHz)
          </button>
        </div>

        <!-- Status Display -->
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            <span :class="oscillationStatus.color" class="font-bold">{{ oscillationStatus.text }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-gray-400">Mode:</span>
            <span class="font-semibold text-gray-900 dark:text-white">{{ resonanceMode }}</span>
          </div>
        </div>

        <!-- Temperature Info -->
        <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4">
          <div class="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Temperature Deviation
          </div>
          <div class="text-lg font-bold text-gray-900 dark:text-white">
            {{ tempDeviation.toFixed(2) }} ppm
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Frequency error: {{ freqError.toFixed(6) }} Hz
          </div>
        </div>
      </div>
    </div>

    <!-- Crystal Visualization -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crystal Equivalent Circuit</h4>
      <svg viewBox="0 0 800 300" class="w-full h-auto">
        <!-- Background -->
        <rect width="800" height="300" fill="transparent"/>

        <!-- Circuit Wires -->
        <!-- Main series path -->
        <line x1="50" y1="150" x2="120" y2="150" stroke="#3B82F6" stroke-width="3"/>
        <line x1="180" y1="150" x2="250" y2="150" stroke="#3B82F6" stroke-width="3"/>
        <line x1="310" y1="150" x2="380" y2="150" stroke="#3B82F6" stroke-width="3"/>
        <line x1="440" y1="150" x2="750" y2="150" stroke="#3B82F6" stroke-width="3"/>

        <!-- Shunt capacitor connection -->
        <line x1="390" y1="150" x2="390" y2="100" stroke="#3B82F6" stroke-width="3"/>
        <line x1="390" y1="100" x2="450" y2="100" stroke="#3B82F6" stroke-width="3"/>
        <line x1="510" y1="100" x2="570" y2="100" stroke="#3B82F6" stroke-width="3"/>
        <line x1="570" y1="100" x2="570" y2="150" stroke="#3B82F6" stroke-width="3"/>

        <!-- Inductor Lm -->
        <g class="inductor">
          <rect x="120" y="130" width="60" height="40" fill="white" stroke="#8B5CF6" stroke-width="3" rx="5"/>
          <text x="150" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">Lm</text>
          <text x="150" y="160" text-anchor="middle" font-size="10" fill="#666">{{ Lm.toFixed(1) }} H</text>
          <!-- Inductor coil symbol -->
          <path d="M 125 135 Q 135 125, 145 135 Q 155 145, 165 135 Q 175 125, 185 135" fill="none" stroke="#8B5CF6" stroke-width="2" opacity="0.3"/>
        </g>

        <!-- Motional Capacitor Cm -->
        <g class="cm-capacitor">
          <line x1="250" y1="130" x2="250" y2="170" stroke="#EC4899" stroke-width="3"/>
          <line x1="260" y1="130" x2="260" y2="170" stroke="#EC4899" stroke-width="3"/>
          <line x1="240" y1="150" x2="250" y2="150" stroke="#3B82F6" stroke-width="3"/>
          <line x1="260" y1="150" x2="270" y2="150" stroke="#3B82F6" stroke-width="3"/>
          <text x="255" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#EC4899">Cm</text>
          <text x="255" y="185" text-anchor="middle" font-size="10" fill="#666">{{ (Cm * 1e12).toFixed(3) }} pF</text>
        </g>

        <!-- Motional Resistance Rm -->
        <g class="resistor">
          <rect x="380" y="135" width="60" height="30" fill="white" stroke="#F59E0B" stroke-width="3" rx="3"/>
          <text x="410" y="153" text-anchor="middle" font-size="12" font-weight="bold" fill="#F59E0B">Rm</text>
          <text x="410" y="175" text-anchor="middle" font-size="10" fill="#666">{{ Rm.toFixed(1) }} Ω</text>
          <!-- Zigzag -->
          <polyline points="385,150 390,145 395,155 400,145 405,155 410,145 415,155 420,145 425,155 430,150" fill="none" stroke="#F59E0B" stroke-width="2" opacity="0.3"/>
        </g>

        <!-- Shunt Capacitor C0 -->
        <g class="c0-capacitor">
          <line x1="450" y1="80" x2="450" y2="120" stroke="#10B981" stroke-width="3"/>
          <line x1="460" y1="80" x2="460" y2="120" stroke="#10B981" stroke-width="3"/>
          <text x="455" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">C₀</text>
          <text x="510" y="85" text-anchor="middle" font-size="10" fill="#666">{{ (C0 * 1e12).toFixed(1) }} pF</text>
        </g>

        <!-- Labels -->
        <text x="730" y="140" text-anchor="end" font-size="11" fill="#3B82F6" font-weight="bold">Crystal</text>

        <!-- Frequency Display -->
        <g transform="translate(620, 50)">
          <rect width="160" height="200" rx="10" fill="white" stroke="#9CA3AF" stroke-width="2" opacity="0.95"/>
          <text x="80" y="25" text-anchor="middle" font-size="11" font-weight="bold" fill="#374151">FREQUENCY</text>

          <!-- Nominal Frequency -->
          <text x="80" y="55" text-anchor="middle" font-size="10" fill="#6B7280">Nominal</text>
          <text x="80" y="75" text-anchor="middle" font-size="16" font-weight="bold" fill="#3B82F6">{{ formatFreq(crystalFreq * 1e6) }}</text>

          <!-- Actual Frequency -->
          <text x="80" y="105" text-anchor="middle" font-size="10" fill="#6B7280">Actual ({{ temperature }}°C)</text>
          <text x="80" y="125" text-anchor="middle" font-size="16" font-weight="bold" :fill="tempDeviation < 50 ? '#10B981' : '#EF4444'">
            {{ formatFreq(actualFreq) }}
          </text>

          <!-- Frequency Difference -->
          <line x1="20" y1="135" x2="140" y2="135" stroke="#E5E7EB" stroke-width="1"/>
          <text x="80" y="155" text-anchor="middle" font-size="10" fill="#6B7280">ΔF</text>
          <text x="80" y="175" text-anchor="middle" font-size="14" font-weight="bold" :fill="tempDeviation < 50 ? '#10B981' : '#EF4444'">
            {{ freqError > 0 ? '+' : '' }}{{ freqError.toFixed(2) }} Hz
          </text>
        </g>

        <!-- Legend -->
        <g transform="translate(50, 220)">
          <text x="0" y="0" font-size="11" font-weight="bold" fill="#374151">Components:</text>

          <circle cx="10" cy="20" r="5" fill="#8B5CF6"/>
          <text x="20" y="24" font-size="10" fill="#6B7280">Lm: Motional Inductance</text>

          <circle cx="200" cy="20" r="5" fill="#EC4899"/>
          <text x="210" y="24" font-size="10" fill="#6B7280">Cm: Motional Capacitance</text>

          <circle cx="10" cy="45" r="5" fill="#F59E0B"/>
          <text x="20" y="49" font-size="10" fill="#6B7280">Rm: Motional Resistance</text>

          <circle cx="200" cy="45" r="5" fill="#10B981"/>
          <text x="210" y="49" font-size="10" fill="#6B7280">C₀: Shunt Capacitance</text>
        </g>
      </svg>
    </div>

    <!-- Waveform Visualization -->
    <div class="mb-8">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Output Waveform (Real-time)</h4>
      <svg viewBox="0 0 800 250" class="w-full h-auto bg-gray-50 dark:bg-gray-900 rounded-lg">
        <!-- Grid -->
        <defs>
          <pattern id="waveGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CA3AF" stroke-width="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="800" height="250" fill="url(#waveGrid)"/>

        <!-- Center line -->
        <line x1="0" y1="125" x2="800" y2="125" stroke="#9CA3AF" stroke-width="1" stroke-dasharray="5,5"/>

        <!-- Animated Sine Wave -->
        <path :d="generateWavePath()" fill="none" stroke="#3B82F6" stroke-width="3"/>

        <!-- Frequency label -->
        <g transform="translate(620, 30)">
          <rect width="160" height="50" rx="5" fill="white" stroke="#3B82F6" stroke-width="2" opacity="0.95"/>
          <text x="80" y="20" text-anchor="middle" font-size="10" fill="#6B7280">Output Frequency</text>
          <text x="80" y="38" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">{{ formatFreq(actualFreq) }}</text>
        </g>

        <!-- Animation info -->
        <text x="20" y="230" font-size="11" fill="#6B7280">
          Waveform is animated based on crystal frequency (slowed down for visualization)
        </text>
      </svg>
    </div>

    <!-- Calculated Parameters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div class="text-sm text-blue-700 dark:text-blue-300 mb-1">Series Resonant Frequency</div>
        <div class="text-2xl font-bold text-blue-900 dark:text-blue-100">{{ formatFreq(fs) }}</div>
      </div>
      <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <div class="text-sm text-purple-700 dark:text-purple-300 mb-1">Parallel Resonant Frequency</div>
        <div class="text-2xl font-bold text-purple-900 dark:text-purple-100">{{ formatFreq(fp) }}</div>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div class="text-sm text-green-700 dark:text-green-300 mb-1">Q Factor</div>
        <div class="text-2xl font-bold text-green-900 dark:text-green-100">{{ QFactor.toFixed(0) }}</div>
      </div>
    </div>

    <!-- Oscillator Analysis -->
    <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Oscillator Analysis</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Startup Time</h5>
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ startupTime.toFixed(2) }} ms</div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Time for oscillations to stabilize
          </p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Phase Noise (at 1kHz offset)</h5>
          <div class="text-xl font-bold text-gray-900 dark:text-white">-{{ (90 + Math.random() * 20).toFixed(1) }} dBc/Hz</div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Typical value for {{ crystalFreq < 1 ? 'kHz' : 'MHz' }} crystal
          </p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Power Dissipation</h5>
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ drivePower.toFixed(3) }} mW</div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Should be < 1 mW for most crystals
          </p>
        </div>
        <div>
          <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency Pulling</h5>
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ pullingRange.toFixed(1) }} ppm</div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            From load capacitance variation
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Input parameters
const crystalFreq = ref(16) // MHz
const temperature = ref(25) // °C
const loadCap = ref(18) // pF
const circuitType = ref('pierce')

// Animation
const animationPhase = ref(0)
let animationId: number | null = null

// Crystal equivalent circuit parameters (scaled for frequency)
const Lm = computed(() => {
  // Higher frequency crystals have lower inductance
  const base = 10 // Henries
  return base / Math.sqrt(crystalFreq.value)
})

const Cm = computed(() => {
  // Motional capacitance (very small)
  const base = 0.03 // pF
  return base * 1e-12 / Math.sqrt(crystalFreq.value)
})

const Rm = computed(() => {
  // Motional resistance (varies with frequency and cut)
  const base = 50 // Ohms
  return base * Math.sqrt(crystalFreq.value)
})

const C0 = computed(() => {
  // Shunt capacitance (typically 2-5 pF)
  return 3e-12
})

// Calculated resonant frequencies
const fs = computed(() => {
  // Series resonant frequency
  return 1 / (2 * Math.PI * Math.sqrt(Lm.value * Cm.value))
})

const fp = computed(() => {
  // Parallel resonant frequency
  const ratio = Cm.value / C0.value
  return fs.value * Math.sqrt(1 + ratio)
})

const QFactor = computed(() => {
  // Quality factor
  return (2 * Math.PI * fs.value * Lm.value) / Rm.value
})

const resonanceMode = computed(() => {
  // Most oscillators operate in parallel mode
  return circuitType.value === 'pierce' || circuitType.value === 'inverter' ? 'Parallel' : 'Series'
})

// Temperature effects (AT-cut crystal parabolic curve)
const tempDeviation = computed(() => {
  // Parabolic curve with turnover at 25°C
  // Typical AT-cut: ±20 ppm over -40 to +85°C
  const deltaT = temperature.value - 25
  const curvature = -0.04 // ppm/°C² (negative parabola)
  return curvature * deltaT * deltaT
})

const freqError = computed(() => {
  // Frequency error in Hz
  const nominalFreq = crystalFreq.value * 1e6
  return (tempDeviation.value / 1e6) * nominalFreq
})

const actualFreq = computed(() => {
  const nominalFreq = crystalFreq.value * 1e6
  return nominalFreq + freqError.value
})

const oscillationStatus = computed(() => {
  if (temperature.value > 85 || temperature.value < -40) {
    return { text: '⚠️ Out of Spec', color: 'text-red-600 dark:text-red-400' }
  }
  if (loadCap.value < 5 || loadCap.value > 50) {
    return { text: '⚠️ Check Load Cap', color: 'text-yellow-600 dark:text-yellow-400' }
  }
  return { text: '✅ Oscillating', color: 'text-green-600 dark:text-green-400' }
})

const startupTime = computed(() => {
  // Startup time depends on Q and drive level
  // Higher Q = longer startup
  const baseStartup = 5 // ms
  return baseStartup * (QFactor.value / 10000)
})

const drivePower = computed(() => {
  // Simulated drive power (typically < 1mW)
  return 0.1 + (crystalFreq.value / 100) + (temperature.value / 1000)
})

const pullingRange = computed(() => {
  // Frequency pulling range from load capacitance
  const nominal = 18 // pF
  const deltaC = loadCap.value - nominal
  return Math.abs(deltaC) * 2 // ppm/pF approximation
})

// Waveform generation
const generateWavePath = () => {
  const points = []
  const width = 800
  const height = 250
  const centerY = height / 2
  const amplitude = 80

  // Frequency scaled for visualization
  const freq = crystalFreq.value < 1 ? 0.5 : 2
  const phase = animationPhase.value

  for (let x = 0; x < width; x++) {
    const t = x / width
    const y = centerY + amplitude * Math.sin(2 * Math.PI * freq * t + phase)
    points.push(`${x},${y}`)
  }

  return `M ${points.join(' L ')}`
}

// Formatting helpers
const formatFreq = (freq: number) => {
  if (freq >= 1e6) {
    return `${(freq / 1e6).toFixed(4)} MHz`
  } else if (freq >= 1e3) {
    return `${(freq / 1e3).toFixed(3)} kHz`
  } else {
    return `${freq.toFixed(2)} Hz`
  }
}

// Presets
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'watch':
      crystalFreq.value = 0.032768
      temperature.value = 25
      loadCap.value = 12
      circuitType.value = 'inverter'
      break
    case 'mcu':
      crystalFreq.value = 16
      temperature.value = 25
      loadCap.value = 22
      circuitType.value = 'pierce'
      break
    case 'usb':
      crystalFreq.value = 24
      temperature.value = 25
      loadCap.value = 18
      circuitType.value = 'pierce'
      break
    case 'rf':
      crystalFreq.value = 50
      temperature.value = 25
      loadCap.value = 10
      circuitType.value = 'colpitts'
      break
  }
}

// Animation loop
const animate = () => {
  animationPhase.value -= 0.05
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Mode Selection -->
    <div class="mb-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Amplifier Configuration
      </label>
      <div class="grid grid-cols-2 gap-4">
        <button
          @click="mode = 'inverting'"
          :class="[
            'px-4 py-3 rounded-lg font-semibold transition-all',
            mode === 'inverting'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Inverting Amplifier
        </button>
        <button
          @click="mode = 'non-inverting'"
          :class="[
            'px-4 py-3 rounded-lg font-semibold transition-all',
            mode === 'non-inverting'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          Non-Inverting Amplifier
        </button>
      </div>
    </div>

    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Input Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Input Voltage (Vin): {{ vin }} V
        </label>
        <input
          type="range"
          v-model.number="vin"
          min="-5"
          max="5"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>-5V</span>
          <span>0V</span>
          <span>5V</span>
        </div>
      </div>

      <!-- Supply Voltage -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Supply Voltage (Vcc): {{ vcc }} V
        </label>
        <input
          type="range"
          v-model.number="vcc"
          min="5"
          max="18"
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>5V</span>
          <span>12V</span>
          <span>18V</span>
        </div>
      </div>

      <!-- R1 (Input Resistor) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R1 ({{ mode === 'inverting' ? 'Input' : 'Ground' }}): {{ formatResistance(r1) }}
        </label>
        <input
          type="range"
          v-model.number="r1"
          min="100"
          max="100000"
          :step="getR1Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>10kΩ</span>
          <span>100kΩ</span>
        </div>
      </div>

      <!-- R2 (Feedback Resistor) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          R2 (Feedback): {{ formatResistance(r2) }}
        </label>
        <input
          type="range"
          v-model.number="r2"
          min="100"
          max="1000000"
          :step="getR2Step()"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>100Ω</span>
          <span>100kΩ</span>
          <span>1MΩ</span>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          @click="setPreset('unity')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Unity Gain
        </button>
        <button
          @click="setPreset('gain10')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Gain = 10
        </button>
        <button
          @click="setPreset('gain100')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Gain = 100
        </button>
        <button
          @click="setPreset('inverting10')"
          class="px-3 py-2 bg-white dark:bg-gray-800 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all"
        >
          Inverting -10
        </button>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-primary mb-1">{{ gain.toFixed(2) }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Voltage Gain</div>
      </div>
      <div class="bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{{ vout.toFixed(2) }} V</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Output Voltage</div>
      </div>
      <div class="bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 rounded-lg p-4 text-center">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ (vout / vin).toFixed(2) }}×</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Amplification</div>
      </div>
    </div>

    <!-- Op-Amp Circuit Diagram -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Circuit Diagram</h3>
      <div class="flex justify-center">
        <svg viewBox="0 0 500 250" class="w-full max-w-2xl">
          <!-- Op-Amp Triangle -->
          <polygon 
            points="220,80 220,170 320,125" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="3"
            class="text-gray-800 dark:text-gray-200"
          />
          
          <!-- Inverting Input (-) -->
          <text x="205" y="105" text-anchor="end" class="text-sm font-semibold fill-current text-gray-800 dark:text-gray-200">-</text>
          <line x1="160" y1="100" x2="220" y2="100" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="150" y="95" text-anchor="end" class="text-xs fill-current text-gray-600 dark:text-gray-400">
            {{ mode === 'inverting' ? 'Vin' : 'GND' }}
          </text>
          <text x="150" y="108" text-anchor="end" class="text-xs fill-current text-primary">
            {{ mode === 'inverting' ? vin.toFixed(2) + 'V' : '0V' }}
          </text>
          
          <!-- Non-inverting Input (+) -->
          <text x="205" y="155" text-anchor="end" class="text-sm font-semibold fill-current text-gray-800 dark:text-gray-200">+</text>
          <line x1="160" y1="150" x2="220" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="150" y="145" text-anchor="end" class="text-xs fill-current text-gray-600 dark:text-gray-400">
            {{ mode === 'non-inverting' ? 'Vin' : 'GND' }}
          </text>
          <text x="150" y="158" text-anchor="end" class="text-xs fill-current text-primary">
            {{ mode === 'non-inverting' ? vin.toFixed(2) + 'V' : '0V' }}
          </text>
          
          <!-- Output -->
          <line x1="320" y1="125" x2="380" y2="125" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="390" y="130" text-anchor="start" class="text-xs fill-current text-gray-600 dark:text-gray-400">Vout</text>
          <text x="390" y="143" text-anchor="start" class="text-xs font-semibold fill-current text-green-600">{{ vout.toFixed(2) }}V</text>
          
          <!-- Vcc and Vee -->
          <line x1="260" y1="80" x2="260" y2="40" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="260" y="30" text-anchor="middle" class="text-xs fill-current text-red-600">+Vcc ({{ vcc }}V)</text>
          
          <line x1="260" y1="170" x2="260" y2="210" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
          <text x="260" y="225" text-anchor="middle" class="text-xs fill-current text-blue-600">-Vee ({{ -vcc }}V)</text>
          
          <!-- R1 Resistor (Input/Ground) -->
          <rect x="170" y="95" width="40" height="10" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="190" y="85" text-anchor="middle" class="text-xs font-semibold fill-current text-amber-600">R1</text>
          <text x="190" y="90" text-anchor="middle" class="text-xs fill-current text-amber-600">{{ formatResistance(r1) }}</text>
          
          <!-- R2 Feedback Resistor -->
          <rect x="235" y="50" width="10" height="40" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-600"/>
          <text x="255" y="65" text-anchor="start" class="text-xs font-semibold fill-current text-amber-600">R2</text>
          <text x="255" y="78" text-anchor="start" class="text-xs fill-current text-amber-600">{{ formatResistance(r2) }}</text>
          <line x1="180" y1="100" x2="180" y2="55" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="180" y1="55" x2="240" y2="55" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="360" y1="125" x2="360" y2="55" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="360" y1="55" x2="250" y2="55" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          
          <!-- Ground connection for non-inverting mode input -->
          <line x1="190" y1="150" x2="190" y2="190" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="180" y1="190" x2="200" y2="190" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="185" y1="195" x2="195" y2="195" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          <line x1="188" y1="200" x2="192" y2="200" stroke="currentColor" stroke-width="2" class="text-gray-400"/>
          
          <!-- Saturation Warning -->
          <g v-if="isSaturated">
            <rect x="330" y="100" width="140" height="50" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.5)" stroke-width="1"/>
            <text x="400" y="120" text-anchor="middle" class="text-xs font-semibold fill-current text-red-600">⚠️ SATURATED</text>
            <text x="400" y="138" text-anchor="middle" class="text-xs fill-current text-red-600">Output limited to ±{{ vcc }}V</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Waveform Visualization -->
    <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Input/Output Waveforms</h3>
      <div class="flex justify-center">
        <svg viewBox="0 0 400 150" class="w-full max-w-xl">
          <!-- Grid -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-600"/>
            </pattern>
          </defs>
          <rect width="400" height="150" fill="url(#grid)" />
          
          <!-- Center line (0V) -->
          <line x1="0" y1="75" x2="400" y2="75" stroke="currentColor" stroke-width="1" class="text-gray-400"/>
          
          <!-- Input waveform (blue) -->
          <path 
            :d="generateWaveform(vin, 1)"
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            class="text-blue-500"
          />
          
          <!-- Output waveform (green) -->
          <path 
            :d="generateWaveform(vin, Math.min(Math.max(gain, -20), 20))"
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
            class="text-green-500"
            :stroke-dasharray="isSaturated ? '5,5' : '0'"
          />
          
          <!-- Labels -->
          <text x="10" y="20" class="text-xs fill-current text-blue-500 font-semibold">Input (Vin)</text>
          <text x="10" y="40" class="text-xs fill-current text-green-500 font-semibold">Output (Vout)</text>
          
          <!-- Saturation indicator -->
          <g v-if="isSaturated">
            <text x="10" y="60" class="text-xs fill-current text-red-500 font-semibold">⚠️ Saturated</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// State
const mode = ref<'inverting' | 'non-inverting'>('inverting')
const vin = ref(1.0)
const vcc = ref(12)
const r1 = ref(1000)
const r2 = ref(10000)

// Computed
const gain = computed(() => {
  if (mode.value === 'inverting') {
    return -(r2.value / r1.value)
  } else {
    return 1 + (r2.value / r1.value)
  }
})

const vout = computed(() => {
  const idealOutput = vin.value * gain.value
  // Clamp to supply voltage (saturation)
  return Math.max(-vcc.value + 0.5, Math.min(vcc.value - 0.5, idealOutput))
})

const isSaturated = computed(() => {
  const idealOutput = vin.value * gain.value
  return idealOutput > (vcc.value - 0.5) || idealOutput < (-vcc.value + 0.5)
})

// Methods
const formatResistance = (ohms: number): string => {
  if (ohms >= 1000000) {
    return `${(ohms / 1000000).toFixed(1)} MΩ`
  } else if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(1)} kΩ`
  }
  return `${ohms.toFixed(0)} Ω`
}

const getR1Step = (): number => {
  if (r1.value < 1000) return 100
  if (r1.value < 10000) return 500
  return 1000
}

const getR2Step = (): number => {
  if (r2.value < 1000) return 100
  if (r2.value < 10000) return 500
  if (r2.value < 100000) return 5000
  return 10000
}

const setPreset = (preset: string) => {
  switch (preset) {
    case 'unity':
      mode.value = 'non-inverting'
      r1.value = 10000
      r2.value = 0
      break
    case 'gain10':
      mode.value = 'non-inverting'
      r1.value = 1000
      r2.value = 9000
      break
    case 'gain100':
      mode.value = 'non-inverting'
      r1.value = 100
      r2.value = 9900
      break
    case 'inverting10':
      mode.value = 'inverting'
      r1.value = 1000
      r2.value = 10000
      break
  }
}

const generateWaveform = (amplitude: number, gainFactor: number): string => {
  const points = []
  const centerY = 75
  const scale = 10 // pixels per volt
  
  for (let x = 0; x <= 400; x += 5) {
    const angle = (x / 400) * Math.PI * 4 // 2 full cycles
    const y = centerY - (amplitude * gainFactor * Math.sin(angle) * scale)
    // Clamp to view
    const clampedY = Math.max(10, Math.min(140, y))
    points.push(`${x === 0 ? 'M' : 'L'} ${x} ${clampedY}`)
  }
  
  return points.join(' ')
}
</script>

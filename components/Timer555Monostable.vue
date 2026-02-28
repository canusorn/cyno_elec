<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
      ⏱️ 555 Timer Monostable Simulator
    </h3>

    <!-- Circuit Diagram -->
    <div class="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 700 400" class="w-full h-auto">
        <!-- Background Grid -->
        <defs>
          <pattern id="grid555" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
          </pattern>
          <filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="700" height="400" fill="url(#grid555)" />

        <!-- 555 Timer IC -->
        <rect x="280" y="120" width="140" height="160" fill="#1f2937" stroke="#374151" stroke-width="3" rx="5"/>
        <text x="350" y="155" text-anchor="middle" fill="white" font-size="24" font-weight="bold">555</text>
        <text x="350" y="180" text-anchor="middle" fill="#9ca3af" font-size="14">Timer</text>
        
        <!-- IC Pins Labels -->
        <text x="230" y="145" fill="#60a5fa" font-size="12" font-weight="bold">TRIG (2)</text>
        <text x="230" y="175" fill="#10b981" font-size="12" font-weight="bold">OUT (3)</text>
        <text x="230" y="235" fill="#f59e0b" font-size="12" font-weight="bold">THR (6)</text>
        <text x="230" y="265" fill="#ef4444" font-size="12" font-weight="bold">DIS (7)</text>

        <!-- VCC and GND -->
        <text x="350" y="110" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">VCC (8) - +V</text>
        <text x="350" y="300" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">GND (1)</text>

        <!-- Trigger Circuit (Left Side) -->
        <!-- Push Button -->
        <rect x="60" y="170" width="80" height="40" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
        <text x="100" y="195" text-anchor="middle" fill="#b45309" font-size="14" font-weight="bold">TRIGGER</text>
        
        <!-- Trigger wire to pin 2 -->
        <line x1="140" y1="190" x2="220" y2="190" stroke="#60a5fa" stroke-width="3"/>
        <line x1="220" y1="190" x2="220" y2="140" stroke="#60a5fa" stroke-width="3"/>
        <line x1="220" y1="140" x2="280" y2="140" stroke="#60a5fa" stroke-width="3"/>

        <!-- Timing Components (Top) -->
        <!-- Resistor R -->
        <rect x="330" y="40" width="100" height="25" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
        <text x="380" y="58" text-anchor="middle" fill="#b45309" font-size="12" font-weight="bold">R = {{ resistance }}kΩ</text>
        <!-- Wire from VCC to R -->
        <line x1="350" y1="120" x2="350" y2="90" stroke="#22c55e" stroke-width="3"/>
        <line x1="350" y1="90" x2="330" y2="90" stroke="#22c55e" stroke-width="3"/>
        <line x1="330" y1="90" x2="330" y2="65" stroke="#22c55e" stroke-width="3"/>

        <!-- Capacitor C -->
        <g transform="translate(430, 60)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#374151" stroke-width="3"/>
          <line x1="-15" y1="10" x2="15" y2="10" stroke="#374151" stroke-width="3"/>
          <line x1="-15" y1="18" x2="15" y2="18" stroke="#374151" stroke-width="3"/>
          <line x1="0" y1="18" x2="0" y2="30" stroke="#374151" stroke-width="3"/>
          <text x="25" y="18" fill="#374151" font-size="12" font-weight="bold">C = {{ capacitance }}µF</text>
        </g>

        <!-- Wire from R to C to pins 6 and 7 -->
        <line x1="430" y1="52" x2="430" y2="100" stroke="#f59e0b" stroke-width="3"/>
        <line x1="430" y1="100" x2="480" y2="100" stroke="#f59e0b" stroke-width="3"/>
        <line x1="480" y1="100" x2="480" y2="230" stroke="#f59e0b" stroke-width="3"/>
        <line x1="480" y1="230" x2="420" y2="230" stroke="#f59e0b" stroke-width="3"/>
        <line x1="480" y1="230" x2="480" y2="260" stroke="#f59e0b" stroke-width="3"/>
        <line x1="480" y1="260" x2="420" y2="260" stroke="#f59e0b" stroke-width="3"/>
        <line x1="430" y1="52" x2="380" y2="52" stroke="#f59e0b" stroke-width="3"/>
        <line x1="380" y1="52" x2="380" y2="65" stroke="#f59e0b" stroke-width="3"/>

        <!-- Capacitor to GND -->
        <line x1="430" y1="90" x2="430" y2="350" stroke="#374151" stroke-width="3"/>
        <line x1="100" y1="350" x2="600" y2="350" stroke="#374151" stroke-width="3"/>
        <line x1="350" y1="280" x2="350" y2="350" stroke="#374151" stroke-width="3"/>

        <!-- Output Circuit (Right Side) -->
        <line x1="420" y1="170" x2="520" y2="170" stroke="#10b981" stroke-width="3"/>
        
        <!-- LED -->
        <g transform="translate(550, 150)">
          <polygon points="0,0 20,20 20,40 0,60 -20,40 -20,20" 
            :fill="ledColor" :stroke="ledStroke" stroke-width="3"/>
          <line x1="-20" y1="20" x2="-40" y2="0" :stroke="outputWireColor" stroke-width="3"/>
          <line x1="-20" y1="40" x2="-40" y2="60" :stroke="outputWireColor" stroke-width="3"/>
          <!-- LED arrows -->
          <g v-if="outputActive">
            <polygon points="25,10 35,5 35,15" fill="#fbbf24"/>
            <polygon points="35,25 45,20 45,30" fill="#fbbf24"/>
            <polygon points="25,50 35,45 35,55" fill="#fbbf24"/>
            <polygon points="35,35 45,30 45,40" fill="#fbbf24"/>
          </g>
          <text x="0" y="85" text-anchor="middle" fill="#374151" font-size="12" font-weight="bold">LED Output</text>
        </g>

        <!-- Output wire continuation -->
        <line x1="520" y1="170" x2="550" y2="170" stroke="#10b981" stroke-width="3"/>

        <!-- GND symbol -->
        <g transform="translate(350, 350)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#374151" stroke-width="3"/>
          <line x1="-12" y1="8" x2="12" y2="8" stroke="#374151" stroke-width="3"/>
          <line x1="-4" y1="16" x2="4" y2="16" stroke="#374151" stroke-width="3"/>
        </g>

        <!-- Status Badge -->
        <g v-if="outputActive">
          <rect x="560" y="50" width="120" height="40" rx="5" fill="#22c55e"/>
          <text x="620" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">PULSE ON</text>
        </g>
        <g v-else>
          <rect x="560" y="50" width="120" height="40" rx="5" fill="#6b7280"/>
          <text x="620" y="75" text-anchor="middle" fill="white" font-size="14" font-weight="bold">OFF</text>
        </g>

        <!-- Pulse Duration Display -->
        <rect x="560" y="110" width="120" height="50" rx="5" fill="white" stroke="#374151" stroke-width="2"/>
        <text x="620" y="130" text-anchor="middle" fill="#374151" font-size="11">Pulse Width</text>
        <text x="620" y="150" text-anchor="middle" fill="#1f2937" font-size="16" font-weight="bold">{{ pulseWidth }}s</text>
      </svg>
    </div>

    <!-- Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Resistance Control -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Resistance (R): {{ resistance }} kΩ
        </label>
        <input 
          type="range" 
          v-model.number="resistance" 
          min="1" 
          max="100" 
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1kΩ</span>
          <span>100kΩ</span>
        </div>
      </div>

      <!-- Capacitance Control -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Capacitance (C): {{ capacitance }} µF
        </label>
        <input 
          type="range" 
          v-model.number="capacitance" 
          min="1" 
          max="100" 
          step="1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>1µF</span>
          <span>100µF</span>
        </div>
      </div>
    </div>

    <!-- Trigger Button -->
    <div class="text-center mb-8">
      <button 
        @click="triggerPulse"
        :disabled="outputActive"
        class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        🔔 Trigger Pulse
      </button>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Click to generate a single pulse
      </p>
    </div>

    <!-- Calculated Values -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Calculations</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ pulseWidth }}s</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Pulse Width</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ timeConstant.toFixed(3) }}s</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Time Constant (τ = RC)</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">1.1 × τ</div>
          <div class="text-sm text-gray-600 dark:text-gray-300">Formula</div>
        </div>
      </div>
    </div>

    <!-- Timing Waveform -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 Output Waveform</h4>
      <div class="relative h-48 bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
        <svg viewBox="0 0 800 150" class="w-full h-full">
          <!-- Grid -->
          <defs>
            <pattern id="waveGrid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
            </pattern>
          </defs>
          <rect width="800" height="150" fill="url(#waveGrid)" />

          <!-- Axes -->
          <line x1="50" y1="75" x2="750" y2="75" stroke="#374151" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="760" y="80" fill="#374151" font-size="12">Time</text>
          <text x="20" y="40" fill="#374151" font-size="12">High</text>
          <text x="20" y="130" fill="#374151" font-size="12">Low</text>

          <!-- Waveform -->
          <path 
            :d="waveformPath" 
            fill="none" 
            :stroke="outputActive ? '#10b981' : '#6b7280'" 
            stroke-width="3"
          />

          <!-- Trigger point marker -->
          <circle v-if="outputActive || pulseTriggered" cx="100" cy="120" r="8" fill="#3b82f6"/>
          <text v-if="outputActive || pulseTriggered" x="100" y="140" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">Trigger</text>

          <!-- Pulse duration label -->
          <g v-if="outputActive || pulseTriggered">
            <line x1="100" y1="40" x2="100" y2="50" stroke="#10b981" stroke-width="2"/>
            <line x2="pulseEndX" y1="40" y2="50" stroke="#10b981" stroke-width="2"/>
            <line x1="100" y1="45" x2="pulseEndX" y2="45" stroke="#10b981" stroke-width="2"/>
            <text :x="(100 + pulseEndX) / 2" y="35" text-anchor="middle" fill="#10b981" font-size="12" font-weight="bold">
              {{ pulseWidth }}s
            </text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Quick Presets</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button 
          @click="setPreset(10, 100)"
          class="px-4 py-3 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg font-semibold transition-colors text-sm"
        >
          1.1s (10kΩ, 100µF)
        </button>
        <button 
          @click="setPreset(47, 10)"
          class="px-4 py-3 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg font-semibold transition-colors text-sm"
        >
          517ms (47kΩ, 10µF)
        </button>
        <button 
          @click="setPreset(100, 10)"
          class="px-4 py-3 bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg font-semibold transition-colors text-sm"
        >
          1.1s (100kΩ, 10µF)
        </button>
        <button 
          @click="setPreset(4.7, 47)"
          class="px-4 py-3 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-lg font-semibold transition-colors text-sm"
        >
          242ms (4.7kΩ, 47µF)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'

const resistance = ref(10)
const capacitance = ref(100)
const outputActive = ref(false)
const pulseTriggered = ref(false)
const pulseStartTime = ref(0)
const pulseDuration = ref(0)

let pulseTimeout = null
let animationFrame = null
const elapsed = ref(0)

// Calculations
const timeConstant = computed(() => {
  return (resistance.value * 1000) * (capacitance.value * 0.000001)
})

const pulseWidth = computed(() => {
  return (1.1 * timeConstant.value).toFixed(3)
})

const ledColor = computed(() => {
  return outputActive.value ? '#22c55e' : '#d1d5db'
})

const ledStroke = computed(() => {
  return outputActive.value ? '#16a34a' : '#9ca3af'
})

const outputWireColor = computed(() => {
  return outputActive.value ? '#10b981' : '#6b7280'
})

const pulseEndX = computed(() => {
  const scale = 600 / 2000 // Scale factor for display (max 2 seconds)
  return Math.min(100 + (parseFloat(pulseWidth.value) * 1000 * scale), 700)
})

const waveformPath = computed(() => {
  const basePath = 'M 50 120 L 100 120'
  
  if (!outputActive.value && !pulseTriggered.value) {
    return basePath
  }

  const scale = 600 / 2000
  const pulseWidthMs = parseFloat(pulseWidth.value) * 1000
  const endX = Math.min(100 + pulseWidthMs * scale, 700)
  
  if (outputActive.value) {
    // Currently active - show animation
    const currentX = Math.min(100 + elapsed.value * scale, endX)
    if (currentX >= endX) {
      return `${basePath} L 100 30 L ${endX} 30 L ${endX} 120 L 750 120`
    }
    return `${basePath} L 100 30 L ${currentX} 30`
  } else if (pulseTriggered.value) {
    // Completed - show full pulse
    return `${basePath} L 100 30 L ${endX} 30 L ${endX} 120 L 750 120`
  }
  
  return basePath
})

const triggerPulse = () => {
  if (outputActive.value) return
  
  outputActive.value = true
  pulseTriggered.value = true
  pulseStartTime.value = Date.now()
  pulseDuration.value = parseFloat(pulseWidth.value) * 1000
  elapsed.value = 0
  
  // Animate pulse
  const startTime = Date.now()
  
  const animate = () => {
    elapsed.value = Date.now() - startTime
    
    if (elapsed.value >= pulseDuration.value) {
      outputActive.value = false
      elapsed.value = pulseDuration.value
      
      // Reset trigger after animation
      setTimeout(() => {
        pulseTriggered.value = false
        elapsed.value = 0
      }, 1000)
      
      return
    }
    
    animationFrame = requestAnimationFrame(animate)
  }
  
  animationFrame = requestAnimationFrame(animate)
}

const setPreset = (r, c) => {
  resistance.value = r
  capacitance.value = c
}

// Cleanup
onUnmounted(() => {
  if (pulseTimeout) clearTimeout(pulseTimeout)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

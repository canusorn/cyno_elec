<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const resistance = ref(100)
const inductance = ref(10)
const time = ref(0)
const isCharging = ref(true)

// Computed values
const timeConstant = computed(() => {
  return inductance.value / resistance.value // τ = L/R
})

const initialCurrent = computed(() => {
  return 0 // Starting from 0
})

const finalCurrent = computed(() => {
  return 10 // Assuming 10V source with final current
})

// Current at time t
const currentAtTime = computed(() => {
  const I0 = finalCurrent.value
  const tau = timeConstant.value
  
  if (isCharging.value) {
    // Charging: I(t) = (V/R) × (1 - e^(-t/τ))
    return I0 * (1 - Math.exp(-time.value / tau))
  } else {
    // Discharging: I(t) = I0 × e^(-t/τ)
    return I0 * Math.exp(-time.value / tau)
  }
})

// Voltage across inductor
const inductorVoltage = computed(() => {
  const tau = timeConstant.value
  const V = 10 // Source voltage
  
  if (isCharging.value) {
    // VL(t) = V × e^(-t/τ)
    return V * Math.exp(-time.value / tau)
  } else {
    // VL(t) = -V × e^(-t/τ)
    return -V * Math.exp(-time.value / tau)
  }
})

// Voltage across resistor
const resistorVoltage = computed(() => {
  const tau = timeConstant.value
  const V = 10 // Source voltage
  
  if (isCharging.value) {
    // VR(t) = V × (1 - e^(-t/τ))
    return V * (1 - Math.exp(-time.value / tau))
  } else {
    // VR(t) = V × e^(-t/τ)
    return V * Math.exp(-time.value / tau)
  }
})

// Energy stored in inductor
const energyStored = computed(() => {
  const L = inductance.value / 1000 // Convert mH to H
  const I = currentAtTime.value
  return 0.5 * L * I * I // E = 0.5 × L × I²
})

// Time to reach percentage of final value
const timeToReach = (percentage: number) => {
  const tau = timeConstant.value
  // t = -τ × ln(1 - percentage)
  return -tau * Math.log(1 - percentage / 100)
}

// Percentages for reference
const percentages = [63.2, 86.5, 95, 98.2, 99.3]

// Generate data points for the time response curve
const timeResponseData = computed(() => {
  const points = []
  const maxTime = timeConstant.value * 5
  const steps = 100
  
  for (let i = 0; i <= steps; i++) {
    const t = (maxTime * i) / steps
    let current
    
    if (isCharging.value) {
      current = finalCurrent.value * (1 - Math.exp(-t / timeConstant.value))
    } else {
      current = finalCurrent.value * Math.exp(-t / timeConstant.value)
    }
    
    points.push({ x: t, y: current })
  }
  
  return points
})

// SVG path for the time response curve
const timeResponsePath = computed(() => {
  const width = 280
  const height = 120
  const padding = 10
  const maxTime = timeConstant.value * 5
  const maxCurrent = finalCurrent.value
  
  let path = 'M '
  
  timeResponseData.value.forEach((point, i) => {
    const x = padding + (point.x / maxTime) * (width - 2 * padding)
    const y = height - padding - (point.y / maxCurrent) * (height - 2 * padding)
    path += `${x.toFixed(1)},${y.toFixed(1)} `
  })
  
  return path
})

// Current point on the curve
const currentPoint = computed(() => {
  const width = 280
  const height = 120
  const padding = 10
  const maxTime = timeConstant.value * 5
  const maxCurrent = finalCurrent.value
  
  const x = padding + (time.value / maxTime) * (width - 2 * padding)
  const y = height - padding - (currentAtTime.value / maxCurrent) * (height - 2 * padding)
  
  return { x, y }
})

// Presets
const presets = [
  { name: 'Fast Response', resistance: 1000, inductance: 10 },
  { name: 'Medium', resistance: 100, inductance: 100 },
  { name: 'Slow Response', resistance: 10, inductance: 1000 },
  { name: 'High Inductance', resistance: 50, inductance: 500 }
]

const applyPreset = (preset: typeof presets[0]) => {
  resistance.value = preset.resistance
  inductance.value = preset.inductance
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">RL Time Constant Calculator</h3>
    
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
        <!-- Resistance -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resistance (R)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="resistance"
              type="number" 
              step="1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
          </div>
          <input 
            v-model.number="resistance"
            type="range"
            min="1"
            max="1000"
            step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Inductance -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inductance (L)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="inductance"
              type="number" 
              step="1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">mH</span>
          </div>
          <input 
            v-model.number="inductance"
            type="range"
            min="1"
            max="1000"
            step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time (t)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="time"
              type="number" 
              step="0.1"
              class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">ms</span>
          </div>
          <input 
            v-model.number="time"
            type="range"
            min="0"
            max="100"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Mode -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Circuit Mode
          </label>
          <div class="flex gap-2">
            <button
              @click="isCharging = true"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                isCharging
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Charging
            </button>
            <button
              @click="isCharging = false"
              :class="[
                'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
                !isCharging
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              ]"
            >
              Discharging
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results and Visualization -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Time Constant Display -->
        <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 text-center">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Time Constant (τ)</div>
          <div class="text-5xl font-bold text-primary mb-2">
            {{ timeConstant.toFixed(3) }}
          </div>
          <div class="text-lg text-gray-700 dark:text-gray-300">milliseconds</div>
          <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            τ = L / R = {{ (inductance / 1000).toFixed(3) }}H / {{ resistance }}Ω = {{ timeConstant.toFixed(3) }}ms
          </div>
        </div>
        
        <!-- Time Response Curve -->
        <div class="bg-white dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Time Response Curve</h4>
          
          <svg viewBox="0 0 300 140" class="w-full h-auto">
            <!-- Grid -->
            <defs>
              <pattern id="grid-rl" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect x="10" y="10" width="280" height="120" fill="url(#grid-rl)"/>
            
            <!-- Axes -->
            <line x1="10" y1="130" x2="290" y2="130" stroke="currentColor" stroke-width="1"/>
            <line x1="10" y1="10" x2="10" y2="130" stroke="currentColor" stroke-width="1"/>
            
            <!-- Labels -->
            <text x="150" y="138" text-anchor="middle" font-size="10" fill="currentColor">Time (t)</text>
            <text x="20" y="25" font-size="10" fill="currentColor">I(t)</text>
            
            <!-- Time constant markers -->
            <g v-for="i in 5" :key="i">
              <line 
                :x1="10 + (i / 5) * 280" 
                y1="130" 
                :x2="10 + (i / 5) * 280" 
                y2="10" 
                stroke="currentColor" 
                stroke-width="0.5" 
                opacity="0.2"
                stroke-dasharray="5,5"
              />
              <text 
                :x="10 + (i / 5) * 280" 
                y="145" 
                text-anchor="middle" 
                font-size="9" 
                fill="currentColor"
                opacity="0.6"
              >
                {{ i }}τ
              </text>
            </g>
            
            <!-- Current level markers -->
            <g v-for="(percent, index) in percentages" :key="percent">
              <line 
                x1="10" 
                :y1="130 - (percent / 100) * 115" 
                x2="290" 
                :y2="130 - (percent / 100) * 115" 
                stroke="currentColor" 
                stroke-width="0.5" 
                opacity="0.2"
                stroke-dasharray="3,3"
              />
              <text 
                x="295" 
                :y="133 - (percent / 100) * 115" 
                font-size="8" 
                fill="currentColor"
                opacity="0.6"
              >
                {{ percent }}%
              </text>
            </g>
            
            <!-- Response curve -->
            <path 
              :d="timeResponsePath" 
              fill="none" 
              :stroke="isCharging ? '#22C55E' : '#EF4444'" 
              stroke-width="2.5"
            />
            
            <!-- Current point indicator -->
            <g v-if="time >= 0">
              <circle 
                :cx="currentPoint.x" 
                :cy="currentPoint.y" 
                r="5" 
                fill="#9FA8DA"
                stroke="white"
                stroke-width="2"
              />
              <line 
                :x1="currentPoint.x" 
                :y1="currentPoint.y" 
                :x2="currentPoint.x" 
                y2="130" 
                stroke="#9FA8DA" 
                stroke-width="1" 
                stroke-dasharray="3,3"
              />
              <line 
                :x1="currentPoint.x" 
                :y1="currentPoint.y" 
                x2="10" 
                :y2="currentPoint.y" 
                stroke="#9FA8DA" 
                stroke-width="1" 
                stroke-dasharray="3,3"
              />
            </g>
          </svg>
        </div>
        
        <!-- Real-time Values -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ currentAtTime.toFixed(2) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Current (A)</div>
          </div>
          
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ resistorVoltage.toFixed(2) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">VR (V)</div>
          </div>
          
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {{ inductorVoltage.toFixed(2) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">VL (V)</div>
          </div>
          
          <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {{ energyStored.toFixed(2) }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Energy (mJ)</div>
          </div>
        </div>
        
        <!-- Reference Times -->
        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Time to Reach Percentage of Final Value</h4>
          <div class="grid grid-cols-5 gap-2 text-center text-xs">
            <div v-for="percent in percentages" :key="percent" class="bg-white dark:bg-gray-800 rounded p-2">
              <div class="font-semibold text-primary">{{ percent }}%</div>
              <div class="text-gray-600 dark:text-gray-400">{{ timeToReach(percent).toFixed(2) }}ms</div>
              <div class="text-gray-500 dark:text-gray-500">{{ (timeToReach(percent) / timeConstant).toFixed(1) }}τ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Educational Content -->
    <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Understanding RL Time Constants</h4>
      
      <div class="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Charging Phase</h5>
          <ul class="space-y-1 list-disc list-inside">
            <li>Current builds up exponentially</li>
            <li>Formula: I(t) = (V/R) × (1 - e^(-t/τ))</li>
            <li>Reaches 63.2% in 1 time constant</li>
            <li>Reaches 99.3% in 5 time constants</li>
            <li>Inductor opposes change in current</li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-semibold text-gray-900 dark:text-white mb-2">Discharging Phase</h5>
          <ul class="space-y-1 list-disc list-inside">
            <li>Current decays exponentially</li>
            <li>Formula: I(t) = I₀ × e^(-t/τ)</li>
            <li>Decays to 36.8% in 1 time constant</li>
            <li>Decays to 0.7% in 5 time constants</li>
            <li>Inductor releases stored energy</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">Key Formulas:</p>
        <div class="font-mono text-sm space-y-1">
          <p>Time Constant: τ = L / R</p>
          <p>Charging Current: I(t) = (V/R) × (1 - e^(-t/τ))</p>
          <p>Discharging Current: I(t) = I₀ × e^(-t/τ)</p>
          <p>Inductor Voltage: VL(t) = L × (di/dt)</p>
          <p>Stored Energy: E = ½ × L × I²</p>
        </div>
      </div>
      
      <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h5 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Practical Applications</h5>
        <ul class="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• Motor start-up current limiting</li>
          <li>• Relay delay circuits</li>
          <li>• Filter design in power supplies</li>
          <li>• Speaker crossover networks</li>
          <li>• Switching power supply magnetics</li>
        </ul>
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

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <span class="text-3xl mr-3">🔌</span>
      Half-Bridge Motor Driver Simulator
    </h2>

    <!-- Control Panel -->
    <div class="grid lg:grid-cols-3 gap-6 mb-8">
      <!-- Direction Control -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5">
        <h3 class="font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <span class="text-xl mr-2">🧭</span>
          Direction Control
        </h3>
        <div class="flex gap-3">
          <button
            @click="direction = 'forward'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200',
              direction === 'forward'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            ]"
          >
            ⬆️ Forward
          </button>
          <button
            @click="direction = 'reverse'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-200',
              direction === 'reverse'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            ]"
          >
            ⬇️ Reverse
          </button>
        </div>
      </div>

      <!-- PWM Duty Cycle -->
      <div class="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-5">
        <h3 class="font-bold text-gray-800 dark:text-white mb-2 flex items-center">
          <span class="text-xl mr-2">⚡</span>
          PWM Duty Cycle
        </h3>
        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">
          {{ dutyCycle }}%
        </div>
        <input
          type="range"
          v-model.number="dutyCycle"
          min="0"
          max="100"
          step="1"
          class="w-full h-2 bg-purple-200 dark:bg-purple-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Voltage & Motor Parameters -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-5">
        <h3 class="font-bold text-gray-800 dark:text-white mb-3 flex items-center">
          <span class="text-xl mr-2">⚙️</span>
          Parameters
        </h3>
        
        <div class="space-y-3">
          <div>
            <label class="text-sm text-gray-600 dark:text-gray-400">Supply Voltage (V)</label>
            <div class="flex items-center gap-2">
              <input
                type="range"
                v-model.number="supplyVoltage"
                min="5"
                max="48"
                step="1"
                class="flex-1 h-2 bg-orange-200 dark:bg-orange-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <span class="font-mono text-orange-600 dark:text-orange-400 font-bold w-12 text-right">{{ supplyVoltage }}V</span>
            </div>
          </div>
          
          <div>
            <label class="text-sm text-gray-600 dark:text-gray-400">Motor Resistance (Ω)</label>
            <div class="flex items-center gap-2">
              <input
                type="range"
                v-model.number="motorResistance"
                min="1"
                max="50"
                step="0.5"
                class="flex-1 h-2 bg-amber-200 dark:bg-amber-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <span class="font-mono text-amber-600 dark:text-amber-400 font-bold w-12 text-right">{{ motorResistance }}Ω</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram & Visualization -->
    <div class="grid lg:grid-cols-2 gap-8 mb-8">
      <!-- Circuit Diagram -->
      <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">Circuit Diagram</h3>
        
        <svg viewBox="0 0 400 300" class="w-full">
          <!-- Supply rails -->
          <line x1="50" y1="40" x2="350" y2="40" stroke="#dc2626" stroke-width="3"/>
          <text x="360" y="45" fill="#dc2626" font-size="12" font-weight="bold">V+ ({{ supplyVoltage }}V)</text>
          
          <line x1="50" y1="260" x2="350" y2="260" stroke="#1f2937" stroke-width="3"/>
          <text x="360" y="265" fill="#1f2937" font-size="12" font-weight="bold">GND</text>
          
          <!-- Half-bridge legs -->
          <!-- High-side MOSFETs (P-channel for simplicity) -->
          <g id="high-side-mosfet-1">
            <rect x="85" y="60" width="50" height="40" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" rx="4"/>
            <text x="110" y="85" fill="#1f2937" font-size="10" font-weight="bold" text-anchor="middle">Q1</text>
            <text x="110" y="55" fill="mosfet1State.color" font-size="10" font-weight="bold" text-anchor="middle">{{ mosfet1State.text }}</text>
          </g>
          
          <g id="high-side-mosfet-2">
            <rect x="265" y="60" width="50" height="40" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" rx="4"/>
            <text x="290" y="85" fill="#1f2937" font-size="10" font-weight="bold" text-anchor="middle">Q2</text>
            <text x="290" y="55" fill="mosfet2State.color" font-size="10" font-weight="bold" text-anchor="middle">{{ mosfet2State.text }}</text>
          </g>
          
          <!-- Low-side MOSFETs (N-channel) -->
          <g id="low-side-mosfet-1">
            <rect x="85" y="180" width="50" height="40" fill="#60a5fa" stroke="#3b82f6" stroke-width="2" rx="4"/>
            <text x="110" y="205" fill="#1f2937" font-size="10" font-weight="bold" text-anchor="middle">Q3</text>
            <text x="110" y="235" fill="mosfet3State.color" font-size="10" font-weight="bold" text-anchor="middle">{{ mosfet3State.text }}</text>
          </g>
          
          <g id="low-side-mosfet-2">
            <rect x="265" y="180" width="50" height="40" fill="#60a5fa" stroke="#3b82f6" stroke-width="2" rx="4"/>
            <text x="290" y="205" fill="#1f2937" font-size="10" font-weight="bold" text-anchor="middle">Q4</text>
            <text x="290" y="235" fill="mosfet4State.color" font-size="10" font-weight="bold" text-anchor="middle">{{ mosfet4State.text }}</text>
          </g>
          
          <!-- Motor connection -->
          <line x1="110" y1="100" x2="110" y2="140" stroke="#059669" stroke-width="3"/>
          <line x1="290" y1="100" x2="290" y2="140" stroke="#059669" stroke-width="3"/>
          
          <!-- Motor symbol -->
          <circle cx="200" cy="150" r="35" fill="none" stroke="#059669" stroke-width="2"/>
          <text x="200" y="145" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle">M</text>
          <text x="200" y="160" fill="#059669" font-size="10" text-anchor="middle">{{ motorResistance }}Ω</text>
          
          <!-- Current flow arrows -->
          <g v-if="isRunning && dutyCycle > 0">
            <!-- Forward current -->
            <path v-if="direction === 'forward'"
              d="M 110 120 L 160 140"
              stroke="#fbbf24" stroke-width="3" fill="none"
              :stroke-dasharray="currentAnimationOffset"
              class="animate-pulse"
            />
            <path v-if="direction === 'forward'"
              d="M 240 140 L 290 130"
              stroke="#fbbf24" stroke-width="3" fill="none"
              :stroke-dasharray="currentAnimationOffset"
              class="animate-pulse"
            />
            
            <!-- Reverse current -->
            <path v-if="direction === 'reverse'"
              d="M 290 120 L 240 140"
              stroke="#fbbf24" stroke-width="3" fill="none"
              :stroke-dasharray="currentAnimationOffset"
              class="animate-pulse"
            />
            <path v-if="direction === 'reverse'"
              d="M 160 140 L 110 130"
              stroke="#fbbf24" stroke-width="3" fill="none"
              :stroke-dasharray="currentAnimationOffset"
              class="animate-pulse"
            />
          </g>
          
          <!-- PWM Indicator -->
          <rect x="170" y="250" width="60" height="30" fill="#8b5cf6" rx="4"/>
          <text x="200" y="270" fill="white" font-size="11" font-weight="bold" text-anchor="middle">PWM</text>
          
          <!-- Gate signals -->
          <line x1="110" y1="220" x2="110" y2="250" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="4"/>
          <line x1="290" y1="220" x2="290" y2="250" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="4"/>
        </svg>
      </div>

      <!-- PWM Waveform -->
      <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">PWM Waveform</h3>
        
        <svg viewBox="0 0 400 200" class="w-full">
          <!-- Grid -->
          <line x1="40" y1="100" x2="380" y2="100" stroke="#d1d5db" stroke-width="1" stroke-dasharray="4"/>
          
          <!-- PWM Wave -->
          <path
            :d="pwmWaveformPath"
            fill="none"
            stroke="#8b5cf6"
            stroke-width="2"
          />
          
          <!-- Labels -->
          <text x="20" y="50" fill="#059669" font-size="11" font-weight="bold">HIGH</text>
          <text x="15" y="105" fill="#dc2626" font-size="11" font-weight="bold">LOW</text>
          
          <!-- Duty cycle indicator -->
          <line x1="40" y1="30" x2="40 + onTime * 3" y2="30" stroke="#059669" stroke-width="3"/>
          <line x1="40 + onTime * 3" y1="30" x2="380" y2="30" stroke="#dc2626" stroke-width="3" stroke-dasharray="4"/>
          
          <text x="210" y="25" fill="#374151" font-size="11" font-weight="bold" text-anchor="middle">
            {{ dutyCycle }}% ON / {{ 100 - dutyCycle }}% OFF
          </text>
          
          <!-- Time axis -->
          <text x="210" y="190" fill="#6b7280" font-size="10" text-anchor="middle">Time →</text>
        </svg>
        
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Frequency: <span class="font-bold text-purple-600 dark:text-purple-400">{{ pwmFrequency }} Hz</span> | 
            Period: <span class="font-bold text-purple-600 dark:text-purple-400">{{ (1000 / pwmFrequency).toFixed(2) }} ms</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Real-time Calculations -->
    <div class="grid md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
        <div class="text-sm font-medium opacity-90 mb-1">Motor Voltage</div>
        <div class="text-3xl font-bold">{{ averageVoltage.toFixed(1) }}V</div>
        <div class="text-xs opacity-75 mt-1">{{ (dutyCycle / 100 * supplyVoltage).toFixed(1) }}V average</div>
      </div>
      
      <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
        <div class="text-sm font-medium opacity-90 mb-1">Motor Current</div>
        <div class="text-3xl font-bold">{{ motorCurrent.toFixed(2) }}A</div>
        <div class="text-xs opacity-75 mt-1">I = V / R</div>
      </div>
      
      <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white">
        <div class="text-sm font-medium opacity-90 mb-1">Motor Power</div>
        <div class="text-3xl font-bold">{{ motorPower.toFixed(1) }}W</div>
        <div class="text-xs opacity-75 mt-1">P = V × I</div>
      </div>
      
      <div class="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-5 text-white">
        <div class="text-sm font-medium opacity-90 mb-1">Efficiency</div>
        <div class="text-3xl font-bold">{{ efficiency.toFixed(1) }}%</div>
        <div class="text-xs opacity-75 mt-1">Theoretical max</div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <span class="text-xl mr-2">🎯</span>
        Quick Presets
      </h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          @click="loadPreset('low-speed')"
          class="py-3 px-4 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors"
        >
          🐢 Low Speed<br><span class="text-xs opacity-75">30% PWM</span>
        </button>
        
        <button
          @click="loadPreset('medium-speed')"
          class="py-3 px-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-800/60 transition-colors"
        >
          🚶 Medium Speed<br><span class="text-xs opacity-75">60% PWM</span>
        </button>
        
        <button
          @click="loadPreset('high-speed')"
          class="py-3 px-4 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-lg font-medium hover:bg-orange-200 dark:hover:bg-orange-800/60 transition-colors"
        >
          🐇 High Speed<br><span class="text-xs opacity-75">90% PWM</span>
        </button>
        
        <button
          @click="loadPreset('stop')"
          class="py-3 px-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors"
        >
          🛑 Stop<br><span class="text-xs opacity-75">0% PWM</span>
        </button>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span class="text-2xl mr-2">📚</span>
        Understanding Half-Bridge Motor Drivers
      </h3>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
          <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-3">🔌 What is a Half-Bridge?</h4>
          <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            A half-bridge motor driver uses two switching elements (MOSFETs) in a totem-pole configuration to control current flow through a motor. By switching the high-side and low-side MOSFETs alternately, you can control both speed and direction.
          </p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• High-side MOSFET connects motor to V+</li>
            <li>• Low-side MOSFET connects motor to GND</li>
            <li>• PWM controls average voltage to motor</li>
            <li>• Direction control with H-bridge configuration</li>
          </ul>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
          <h4 class="font-bold text-green-900 dark:text-green-300 mb-3">⚡ PWM Speed Control</h4>
          <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            Pulse Width Modulation (PWM) controls motor speed by rapidly switching the power on and off. The duty cycle (percentage of ON time) determines the average voltage seen by the motor.
          </p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Duty cycle = ON time / Period × 100%</li>
            <li>• Higher duty cycle = faster speed</li>
            <li>• Typical PWM frequency: 1-20 kHz</li>
            <li>• Motor inertia smooths out PWM pulses</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h4 class="font-bold text-indigo-900 dark:text-indigo-300 mb-3">📐 Key Formulas</h4>
        
        <div class="grid md:grid-cols-2 gap-4 text-sm">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Average Voltage:</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">Vavg = DutyCycle × Vsupply</p>
            <p class="text-gray-600 dark:text-gray-400 text-xs mt-1">Example: 50% duty at 24V = 12V average</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Motor Current:</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">I = Vavg / Rmotor</p>
            <p class="text-gray-600 dark:text-gray-400 text-xs mt-1">Example: 12V / 10Ω = 1.2A</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Motor Power:</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">P = Vavg × I</p>
            <p class="text-gray-600 dark:text-gray-400 text-xs mt-1">Example: 12V × 1.2A = 14.4W</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">PWM Period:</p>
            <p class="text-gray-600 dark:text-gray-400 font-mono text-xs">T = 1 / Frequency</p>
            <p class="text-gray-600 dark:text-gray-400 text-xs mt-1">Example: 1/1000Hz = 1ms period</p>
          </div>
        </div>

        <div class="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <p class="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>💡 Pro Tip:</strong> Real half-bridge drivers include protection features like dead-time insertion (prevents shoot-through current), over-current protection, and thermal shutdown. This simulator shows the ideal behavior for educational purposes.
          </p>
        </div>

        <div class="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <p class="text-sm text-red-800 dark:text-red-300">
            <strong>⚠️ Safety Note:</strong> Never turn on both high-side and low-side MOSFETs on the same side simultaneously - this creates a direct short circuit (shoot-through) and can destroy the MOSFETs! Proper drivers include dead-time to prevent this.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const direction = ref<'forward' | 'reverse'>('forward')
const dutyCycle = ref(50)
const supplyVoltage = ref(24)
const motorResistance = ref(10)
const pwmFrequency = ref(1000) // Hz

const isRunning = ref(true)
const currentAnimationOffset = ref(0)

let animationFrame: number | null = null

// MOSFET states
const mosfet1State = computed(() => {
  if (direction.value === 'forward') {
    return dutyCycle.value > 0 ? { text: 'ON', color: '#059669' } : { text: 'OFF', color: '#dc2626' }
  } else {
    return { text: 'OFF', color: '#dc2626' }
  }
})

const mosfet2State = computed(() => {
  if (direction.value === 'reverse') {
    return dutyCycle.value > 0 ? { text: 'ON', color: '#059669' } : { text: 'OFF', color: '#dc2626' }
  } else {
    return { text: 'OFF', color: '#dc2626' }
  }
})

const mosfet3State = computed(() => {
  if (direction.value === 'reverse') {
    return dutyCycle.value > 0 ? { text: 'ON', color: '#059669' } : { text: 'OFF', color: '#dc2626' }
  } else {
    return { text: 'OFF', color: '#dc2626' }
  }
})

const mosfet4State = computed(() => {
  if (direction.value === 'forward') {
    return dutyCycle.value > 0 ? { text: 'ON', color: '#059669' } : { text: 'OFF', color: '#dc2626' }
  } else {
    return { text: 'OFF', color: '#dc2626' }
  }
})

// Calculations
const averageVoltage = computed(() => {
  return (dutyCycle.value / 100) * supplyVoltage.value
})

const motorCurrent = computed(() => {
  return averageVoltage.value / motorResistance.value
})

const motorPower = computed(() => {
  return averageVoltage.value * motorCurrent.value
})

const efficiency = computed(() => {
  // Ideal efficiency (simplified - doesn't account for switching losses)
  return dutyCycle.value > 0 ? 95 : 0
})

// PWM waveform
const onTime = computed(() => {
  return (dutyCycle.value / 100) * 340 // 340 is the width of our waveform
})

const pwmWaveformPath = computed(() => {
  const width = 340
  const onWidth = (dutyCycle.value / 100) * width
  const offWidth = width - onWidth
  
  // Create 3 PWM cycles
  let path = 'M 40 150'
  const startX = 40
  
  for (let cycle = 0; cycle < 3; cycle++) {
    const cycleStart = startX + cycle * (width / 3)
    path += ` L ${cycleStart} 50 L ${cycleStart + onWidth / 3} 50 L ${cycleStart + onWidth / 3} 150 L ${cycleStart + (width / 3)} 150`
  }
  
  return path
})

// Animation
function animate() {
  currentAnimationOffset.value = (currentAnimationOffset.value + 1) % 20
  animationFrame = requestAnimationFrame(animate)
}

function loadPreset(type: string) {
  switch (type) {
    case 'low-speed':
      dutyCycle.value = 30
      break
    case 'medium-speed':
      dutyCycle.value = 60
      break
    case 'high-speed':
      dutyCycle.value = 90
      break
    case 'stop':
      dutyCycle.value = 0
      break
  }
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

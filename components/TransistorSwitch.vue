<template>
  <div class="transistor-switch-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🔌 NPN Transistor Switch
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Adjust base current to switch the transistor ON and OFF
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 relative overflow-hidden">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <!-- V_CC Label -->
        <text x="400" y="30" text-anchor="middle" :font-size="16" font-weight="bold" fill="#3B82F6">
          V_CC = {{ vcc }}V
        </text>
        
        <!-- Power rail (top) -->
        <line x1="100" y1="50" x2="700" y2="50" :stroke="wireColor" stroke-width="4"/>
        <circle cx="400" cy="50" r="8" fill="#3B82F6" stroke="none"/>
        
        <!-- Ground rail (bottom) -->
        <line x1="100" y1="350" x2="700" y2="350" :stroke="wireColor" stroke-width="4"/>
        <text x="400" y="375" text-anchor="middle" :font-size="14" font-weight="bold" fill="#666">GND</text>
        
        <!-- Load resistor and LED (left side) -->
        <line x1="200" y1="50" x2="200" y2="100" :stroke="wireColor" stroke-width="4"/>
        
        <!-- Load resistor -->
        <rect x="175" y="100" width="50" height="40" fill="white" :stroke="resistorColor" stroke-width="3" rx="5"/>
        <polyline points="180,120 190,110 200,130 210,110 220,130" fill="none" :stroke="resistorColor" stroke-width="2"/>
        <text x="200" y="85" text-anchor="middle" :font-size="12" font-weight="bold" :fill="resistorColor">
          R_L = {{ loadResistor }}Ω
        </text>
        
        <!-- LED -->
        <line x1="200" y1="140" x2="200" y2="170" :stroke="wireColor" stroke-width="4"/>
        <g transform="translate(200, 200)">
          <polygon points="0,-15 15,0 0,15" :fill="ledOn ? '#FBBF24' : '#9CA3AF'" stroke="#6B7280" stroke-width="2"/>
          <line x1="15" y1="-15" x2="15" y2="15" :stroke="ledOn ? '#FBBF24' : '#9CA3AF'" stroke-width="3"/>
          <!-- Light rays when ON -->
          <g v-if="ledOn">
            <line x1="-8" y1="-25" x2="-15" y2="-35" stroke="#FBBF24" stroke-width="3"/>
            <line x1="23" y1="-25" x2="30" y2="-35" stroke="#FBBF24" stroke-width="3"/>
            <line x1="-8" y1="25" x2="-15" y2="35" stroke="#FBBF24" stroke-width="3"/>
            <line x1="23" y1="25" x2="30" y2="35" stroke="#FBBF24" stroke-width="3"/>
          </g>
        </g>
        <text x="260" y="205" text-anchor="middle" :font-size="12" font-weight="bold" :fill="ledOn ? '#F59E0B' : '#9CA3AF'">
          LED {{ ledOn ? 'ON' : 'OFF' }}
        </text>
        
        <!-- Wire from LED to collector -->
        <line x1="200" y1="230" x2="200" y2="280" :stroke="wireColor" stroke-width="4"/>
        <line x1="200" y1="280" x2="350" y2="280" :stroke="wireColor" stroke-width="4"/>
        
        <!-- Transistor -->
        <g transform="translate(350, 280)">
          <!-- Base terminal -->
          <line x1="-100" y1="0" x2="-50" y2="0" :stroke="wireColor" stroke-width="4"/>
          
          <!-- Base resistor -->
          <rect x="-140" y="-15" width="40" height="30" fill="white" :stroke="resistorColor" stroke-width="3" rx="5"/>
          <polyline points="-135,0 -125,-10 -115,10 -105,-10 -95,10 -85,0" fill="none" :stroke="resistorColor" stroke-width="2"/>
          <text x="-120" y="-30" text-anchor="middle" :font-size="12" font-weight="bold" :fill="resistorColor">
            R_B = {{ baseResistor }}Ω
          </text>
          
          <!-- NPN Symbol -->
          <rect x="-50" y="-30" width="10" height="60" fill="#4B5563" stroke="#1F2937" stroke-width="2"/>
          
          <!-- Collector terminal -->
          <line x1="-40" y1="-20" x2="0" y2="-20" :stroke="wireColor" stroke-width="4"/>
          <line x1="0" y1="-20" x2="50" y2="-80" :stroke="wireColor" stroke-width="4"/>
          <polygon points="45,-75 55,-85 50,-70" :fill="wireColor" stroke="none"/>
          
          <!-- Emitter terminal with arrow -->
          <line x1="-40" y1="20" x2="0" y2="20" :stroke="wireColor" stroke-width="4"/>
          <line x1="0" y1="20" x2="50" y2="80" :stroke="wireColor" stroke-width="4"/>
          <polygon points="45,75 55,85 50,70" :fill="wireColor" stroke="none"/>
          <!-- Arrow pointing OUT for NPN -->
          <polygon points="30,50 45,85 55,80" fill="none" :stroke="ledOn ? '#22C55E' : '#9CA3AF'" stroke-width="3"/>
          
          <!-- Labels -->
          <text x="-70" y="-15" text-anchor="middle" :font-size="14" font-weight="bold" fill="#3B82F6">B</text>
          <text x="20" y="-50" text-anchor="middle" :font-size="14" font-weight="bold" fill="#EF4444">C</text>
          <text x="20" y="70" text-anchor="middle" :font-size="14" font-weight="bold" fill="#22C55E">E</text>
          
          <!-- Transistor label -->
          <text x="0" y="100" text-anchor="middle" :font-size="14" font-weight="bold" fill="#1F2937">
            NPN (Q1)
          </text>
        </g>
        
        <!-- Wire from collector junction -->
        <line x1="400" y1="200" x2="400" y2="350" :stroke="wireColor" stroke-width="4"/>
        
        <!-- Emitter to ground -->
        <line x1="400" y1="350" x2="400" y2="360" :stroke="wireColor" stroke-width="4"/>
        
        <!-- Input source -->
        <circle cx="50" cy="280" r="35" fill="white" :stroke="inputColor" stroke-width="3"/>
        <text x="50" y="275" text-anchor="middle" :font-size="12" font-weight="bold" :fill="inputColor">
          V_in
        </text>
        <text x="50" y="295" text-anchor="middle" :font-size="14" font-weight="bold" :fill="inputColor">
          {{ inputVoltage }}V
        </text>
        
        <!-- Wire from input to base resistor -->
        <line x1="85" y1="280" x2="210" y2="280" :stroke="wireColor" stroke-width="4"/>
        
        <!-- Current flow arrows -->
        <g v-if="ledOn">
          <!-- Base current -->
          <polygon points="150,275 160,280 150,285" :fill="wireColor" stroke="none"/>
          <text x="170" y="275" :font-size="12" font-weight="bold" fill="#3B82F6">
            I_B = {{ formatNumber(baseCurrent) }}A
          </text>
          
          <!-- Collector current -->
          <polygon points="210,180 220,185 210,190" :fill="wireColor" stroke="none"/>
          <text x="230" y="195" :font-size="12" font-weight="bold" fill="#EF4444">
            I_C = {{ formatNumber(collectorCurrent) }}A
          </text>
          
          <!-- Emitter current -->
          <polygon points="410,330 420,335 410,340" :fill="wireColor" stroke="none"/>
          <text x="430" y="340" :font-size="12" font-weight="bold" fill="#22C55E">
            I_E = {{ formatNumber(emitterCurrent) }}A
          </text>
        </g>
        
        <!-- Status indicator -->
        <g>
          <rect x="580" y="50" width="180" height="80" :fill="ledOn ? '#DCFCE7' : '#FEE2E2'" :stroke="ledOn ? '#22C55E' : '#EF4444'" stroke-width="2" rx="10"/>
          <text x="670" y="85" text-anchor="middle" :font-size="20" font-weight="bold" :fill="ledOn ? '#166534' : '#991B1B'">
            {{ ledOn ? '✓ ON' : '✗ OFF' }}
          </text>
          <text x="670" y="110" text-anchor="middle" :font-size="14" :fill="ledOn ? '#166534' : '#991B1B'">
            {{ ledOn ? 'Conducting' : 'Cutoff' }}
          </text>
        </g>
        
        <!-- V_CE display -->
        <g>
          <rect x="580" y="150" width="180" height="50" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="10"/>
          <text x="670" y="180" text-anchor="middle" :font-size="14" font-weight="bold" fill="#B45309">
            V_CE = {{ formatNumber(voltageCE) }}V
          </text>
        </g>
      </svg>
    </div>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Controls -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
        
        <!-- Input Voltage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Voltage (V_in)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="inputVoltage"
              type="number" 
              step="0.1"
              min="0"
              max="12"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
          <input 
            v-model.number="inputVoltage"
            type="range"
            min="0"
            max="12"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Base Resistor -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Base Resistor (R_B)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="baseResistor"
              type="number" 
              step="100"
              min="100"
              max="100000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
          </div>
          <input 
            v-model.number="baseResistor"
            type="range"
            min="100"
            max="100000"
            step="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Load Resistor -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Load Resistor (R_L)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="loadResistor"
              type="number" 
              step="10"
              min="10"
              max="10000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
          </div>
          <input 
            v-model.number="loadResistor"
            type="range"
            min="10"
            max="10000"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Transistor Gain -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Transistor Gain (h_FE)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="transistorGain"
              type="number" 
              step="10"
              min="10"
              max="1000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">β</span>
          </div>
          <input 
            v-model.number="transistorGain"
            type="range"
            min="10"
            max="1000"
            step="10"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
        </div>
        
        <!-- Preset Buttons -->
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets:</p>
          <div class="grid grid-cols-2 gap-2">
            <button @click="applyPreset('led')" 
              class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
              LED Driver
            </button>
            <button @click="applyPreset('motor')" 
              class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
              Motor Control
            </button>
            <button @click="applyPreset('relay')" 
              class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium">
              Relay Driver
            </button>
            <button @click="resetValues" 
              class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
              Reset
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results Display -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculated Values</h3>
        
        <div class="space-y-4">
          <!-- Base Current -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Base Current (I_B)</p>
            <p class="text-2xl font-bold text-blue-600">
              {{ formatNumber(baseCurrent) }} A
            </p>
            <p class="text-xs text-gray-500 mt-1">
              I_B = (V_in - V_BE) / R_B
            </p>
          </div>
          
          <!-- Collector Current -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Collector Current (I_C)</p>
            <p class="text-2xl font-bold text-red-600">
              {{ formatNumber(collectorCurrent) }} A
            </p>
            <p class="text-xs text-gray-500 mt-1">
              I_C = h_FE × I_B (limited by circuit)
            </p>
          </div>
          
          <!-- Emitter Current -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Emitter Current (I_E)</p>
            <p class="text-2xl font-bold text-green-600">
              {{ formatNumber(emitterCurrent) }} A
            </p>
            <p class="text-xs text-gray-500 mt-1">
              I_E = I_C + I_B
            </p>
          </div>
          
          <!-- V_CE -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Collector-Emitter Voltage (V_CE)</p>
            <p class="text-2xl font-bold" :class="ledOn ? 'text-purple-600' : 'text-gray-600'">
              {{ formatNumber(voltageCE) }} V
            </p>
            <p class="text-xs text-gray-500 mt-1">
              V_CE = V_CC - (I_C × R_L)
            </p>
          </div>
          
          <!-- Transistor State -->
          <div class="rounded-lg p-4" :class="ledOn ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'">
            <p class="text-sm" :class="ledOn ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'">
              <strong>Transistor State:</strong> {{ ledOn ? 'SATURATED (ON)' : 'CUTOFF (OFF)' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const vcc = ref(5) // V_CC voltage
const inputVoltage = ref(0)
const baseResistor = ref(10000)
const loadResistor = ref(220)
const transistorGain = ref(100)

const vbe = 0.7 // Base-emitter voltage drop
const vceSat = 0.2 // Saturation voltage

// Presets
const presets = {
  led: { inputVoltage: 5, baseResistor: 1000, loadResistor: 220, transistorGain: 100 },
  motor: { inputVoltage: 5, baseResistor: 500, loadResistor: 50, transistorGain: 100 },
  relay: { inputVoltage: 5, baseResistor: 2200, loadResistor: 120, transistorGain: 100 }
}

function applyPreset(type) {
  const preset = presets[type]
  if (preset) {
    inputVoltage.value = preset.inputVoltage
    baseResistor.value = preset.baseResistor
    loadResistor.value = preset.loadResistor
    transistorGain.value = preset.transistorGain
  }
}

function resetValues() {
  inputVoltage.value = 0
  baseResistor.value = 10000
  loadResistor.value = 220
  transistorGain.value = 100
}

// Calculated values
const baseCurrent = computed(() => {
  if (inputVoltage.value <= vbe) return 0
  return (inputVoltage.value - vbe) / baseResistor.value
})

const theoreticalCollectorCurrent = computed(() => {
  return transistorGain.value * baseCurrent.value
})

const maxCollectorCurrent = computed(() => {
  return (vcc.value - vceSat) / loadResistor.value
})

const collectorCurrent = computed(() => {
  if (theoreticalCollectorCurrent.value >= maxCollectorCurrent.value) {
    return maxCollectorCurrent.value
  }
  return theoreticalCollectorCurrent.value
})

const emitterCurrent = computed(() => {
  return collectorCurrent.value + baseCurrent.value
})

const voltageCE = computed(() => {
  if (collectorCurrent.value === 0) {
    return vcc.value
  }
  const vce = vcc.value - (collectorCurrent.value * loadResistor.value)
  return Math.max(vceSat, vce)
})

const ledOn = computed(() => {
  return voltageCE.value <= vceSat + 0.1 // Add small threshold
})

// Colors
const wireColor = computed(() => {
  return ledOn.value ? '#22C55E' : '#94A3B8'
})

const inputColor = computed(() => {
  return inputVoltage.value > 0 ? '#3B82F6' : '#94A3B8'
})

const resistorColor = computed(() => {
  return '#8B5CF6'
})

function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0.0000'
  if (num < 0.001) return (num * 1000000).toFixed(2) + ' μ'
  if (num < 1) return (num * 1000).toFixed(2) + ' m'
  return num.toFixed(4)
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
}

.slider-primary {
  -webkit-appearance: none;
  appearance: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

.slider-primary::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider-primary::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

@media (prefers-color-scheme: dark) {
  .slider-primary::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}
</style>

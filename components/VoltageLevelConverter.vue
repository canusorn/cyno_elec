<template>
  <div class="voltage-level-converter bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🔌 Voltage Level Converter Calculator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Calculate resistor values for bidirectional logic level conversion
      </p>
    </div>

    <!-- Circuit Visualization -->
    <div class="circuit-visual mb-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 900 400" class="w-full h-auto">
        <!-- Background Grid -->
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
          </pattern>
        </defs>
        <rect width="900" height="400" fill="url(#grid2)" />

        <!-- Low Voltage Side (Left) -->
        <g transform="translate(50, 100)">
          <rect x="0" y="0" width="200" height="200" fill="#DCFCE7" stroke="#22C55E" stroke-width="3" rx="10"/>
          <text x="100" y="30" text-anchor="middle" :font-size="16" font-weight="bold" fill="#166534">
            LOW VOLTAGE SIDE
          </text>
          <text x="100" y="55" text-anchor="middle" :font-size="14" fill="#166534">
            ({{ lowVoltage }}V Logic)
          </text>
          
          <!-- LV Pin -->
          <circle cx="100" cy="150" r="25" fill="white" stroke="#22C55E" stroke-width="2"/>
          <text x="100" y="145" text-anchor="middle" :font-size="11" font-weight="bold" fill="#22C55E">
            LV
          </text>
          <text x="100" y="165" text-anchor="middle" :font-size="10" fill="#666">
            Pin
          </text>
        </g>

        <!-- High Voltage Side (Right) -->
        <g transform="translate(650, 100)">
          <rect x="0" y="0" width="200" height="200" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3" rx="10"/>
          <text x="100" y="30" text-anchor="middle" :font-size="16" font-weight="bold" fill="#B45309">
            HIGH VOLTAGE SIDE
          </text>
          <text x="100" y="55" text-anchor="middle" :font-size="14" fill="#B45309">
            ({{ highVoltage }}V Logic)
          </text>
          
          <!-- HV Pin -->
          <circle cx="100" cy="150" r="25" fill="white" stroke="#F59E0B" stroke-width="2"/>
          <text x="100" y="145" text-anchor="middle" :font-size="11" font-weight="bold" fill="#F59E0B">
            HV
          </text>
          <text x="100" y="165" text-anchor="middle" :font-size="10" fill="#666">
            Pin
          </text>
        </g>

        <!-- Level Shifter Module (Center) -->
        <g transform="translate(350, 80)">
          <rect x="0" y="0" width="200" height="240" fill="#E0E7FF" stroke="#6366F1" stroke-width="3" rx="10"/>
          <text x="100" y="30" text-anchor="middle" :font-size="14" font-weight="bold" fill="#4338CA">
            LEVEL SHIFTER
          </text>
          
          <!-- LV Pin -->
          <circle cx="60" cy="70" r="20" fill="white" stroke="#22C55E" stroke-width="2"/>
          <text x="60" y="75" text-anchor="middle" :font-size="10" font-weight="bold" fill="#22C55E">
            LV1
          </text>
          
          <!-- HV Pin -->
          <circle cx="140" cy="70" r="20" fill="white" stroke="#F59E0B" stroke-width="2"/>
          <text x="140" y="75" text-anchor="middle" :font-size="10" font-weight="bold" fill="#F59E0B">
            HV1
          </text>
          
          <!-- MOSFET Symbol -->
          <g transform="translate(100, 140)">
            <!-- MOSFET body -->
            <rect x="-5" y="-30" width="10" height="60" fill="#4B5563" stroke="#1F2937" stroke-width="2"/>
            
            <!-- Gate connection -->
            <line x1="-5" y1="-30" x2="-5" y2="-50" :stroke="wireColor" stroke-width="3"/>
            
            <!-- Drain connection (top) -->
            <line x1="5" y1="-30" x2="5" y2="-50" :stroke="wireColor" stroke-width="3"/>
            <line x1="5" y1="-50" x2="-30" y2="-50" :stroke="wireColor" stroke-width="3"/>
            
            <!-- Source connection (bottom) -->
            <line x1="5" y1="30" x2="5" y2="50" :stroke="wireColor" stroke-width="3"/>
            <line x1="5" y1="50" x2="-30" y2="50" :stroke="wireColor" stroke-width="3"/>
            
            <!-- Substrate arrow -->
            <polygon points="-5,0 -15,10 -5,10" fill="none" :stroke="wireColor" stroke-width="2"/>
            
            <!-- Labels -->
            <text x="-5" y="-60" text-anchor="start" :font-size="11" font-weight="bold" fill="#6366F1">G</text>
            <text x="-35" y="-55" text-anchor="start" :font-size="11" font-weight="bold" fill="#6366F1">D</text>
            <text x="-35" y="55" text-anchor="start" :font-size="11" font-weight="bold" fill="#6366F1">S</text>
          </g>
          
          <!-- Pull-up Resistor -->
          <rect x="145" y="80" width="30" height="15" fill="white" :stroke="resistorColor" stroke-width="2" rx="2"/>
          <polyline points="147,87 151,84 155,90 159,84 163,90 167,84 171,90 175,87" fill="none" :stroke="resistorColor" stroke-width="1.5"/>
          <text x="160" y="70" text-anchor="middle" :font-size="9" font-weight="bold" :fill="resistorColor">
            R_pullup
          </text>
          
          <!-- Ground connection -->
          <line x1="100" y1="220" x2="100" y2="230" :stroke="wireColor" stroke-width="2"/>
          <line x1="90" y1="230" x2="110" y2="230" :stroke="wireColor" stroke-width="2"/>
          <line x1="95" y1="235" x2="105" y2="235" :stroke="wireColor" stroke-width="2"/>
          <text x="100" y="248" text-anchor="middle" :font-size="10" fill="#666">GND</text>
        </g>

        <!-- Connection Lines -->
        <!-- LV to LV1 -->
        <line x1="150" y1="250" x2="150" y2="280" :stroke="lvColor" stroke-width="3"/>
        <line x1="150" y1="280" x2="410" y2="280" :stroke="lvColor" stroke-width="3"/>
        <line x1="410" y1="280" x2="410" y2="150" :stroke="lvColor" stroke-width="3"/>
        <text x="280" y="275" text-anchor="middle" :font-size="11" font-weight="bold" :fill="lvColor">
          LV Signal ({{ lowVoltage }}V)
        </text>

        <!-- HV to HV1 -->
        <line x1="750" y1="250" x2="750" y2="280" :stroke="hvColor" stroke-width="3"/>
        <line x1="750" y1="280" x2="490" y2="280" :stroke="hvColor" stroke-width="3"/>
        <line x1="490" y1="280" x2="490" y2="150" :stroke="hvColor" stroke-width="3"/>
        <text x="620" y="275" text-anchor="middle" :font-size="11" font-weight="bold" :fill="hvColor">
          HV Signal ({{ highVoltage }}V)
        </text>

        <!-- Data Flow Arrows -->
        <g v-if="direction === 'both' || direction === 'lv-to-hv'">
          <polygon points="330,195 350,200 330,205" :fill="lvColor" stroke="none"/>
          <text x="320" y="220" text-anchor="middle" :font-size="9" fill="#22C55E">LV→HV</text>
        </g>
        <g v-if="direction === 'both' || direction === 'hv-to-lv'">
          <polygon points="570,195 550,200 570,205" :fill="hvColor" stroke="none"/>
          <text x="580" y="220" text-anchor="middle" :font-size="9" fill="#F59E0B">HV→LV</text>
        </g>

        <!-- Voltage Labels -->
        <text x="100" y="340" text-anchor="middle" :font-size="14" font-weight="bold" fill="#166534">
          V_LV = {{ lowVoltage }}V
        </text>
        <text x="800" y="340" text-anchor="middle" :font-size="14" font-weight="bold" fill="#B45309">
          V_HV = {{ highVoltage }}V
        </text>
      </svg>
    </div>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Controls -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Voltage Levels</h3>
        
        <!-- Low Voltage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Low Voltage Level (V_LV)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="lowVoltage"
              type="number" 
              step="0.1"
              min="1.8"
              max="5"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <button 
              @click="setLowVoltage(1.8)"
              class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800"
            >
              1.8V
            </button>
            <button 
              @click="setLowVoltage(3.3)"
              class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800"
            >
              3.3V
            </button>
          </div>
        </div>

        <!-- High Voltage -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            High Voltage Level (V_HV)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="highVoltage"
              type="number" 
              step="0.1"
              min="3.3"
              max="5"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
          </div>
          <div class="flex flex-wrap gap-2 mt-2">
            <button 
              @click="setHighVoltage(3.3)"
              class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded text-sm hover:bg-orange-200 dark:hover:bg-orange-800"
            >
              3.3V
            </button>
            <button 
              @click="setHighVoltage(5)"
              class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded text-sm hover:bg-orange-200 dark:hover:bg-orange-800"
            >
              5V
            </button>
          </div>
        </div>

        <!-- Pull-up Resistor -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pull-up Resistor (R_pullup)
          </label>
          <div class="flex items-center gap-4 mb-2">
            <input 
              v-model.number="pullupResistor"
              type="number" 
              step="100"
              min="1000"
              max="100000"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
          </div>
          <input 
            v-model.number="pullupResistor"
            type="range"
            min="1000"
            max="47000"
            step="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-primary"
          />
          <div class="flex flex-wrap gap-2 mt-2">
            <button 
              @click="pullupResistor = 1000"
              class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-800"
            >
              1kΩ
            </button>
            <button 
              @click="pullupResistor = 4700"
              class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-800"
            >
              4.7kΩ
            </button>
            <button 
              @click="pullupResistor = 10000"
              class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-800"
            >
              10kΩ
            </button>
          </div>
        </div>

        <!-- Direction -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Signal Direction
          </label>
          <div class="flex flex-wrap gap-2">
            <button 
              @click="direction = 'lv-to-hv'"
              :class="direction === 'lv-to-hv' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
              class="px-4 py-2 rounded font-medium transition-colors"
            >
              LV → HV
            </button>
            <button 
              @click="direction = 'hv-to-lv'"
              :class="direction === 'hv-to-lv' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
              class="px-4 py-2 rounded font-medium transition-colors"
            >
              HV → LV
            </button>
            <button 
              @click="direction = 'both'"
              :class="direction === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
              class="px-4 py-2 rounded font-medium transition-colors"
            >
              Bidirectional
            </button>
          </div>
        </div>
      </div>

      <!-- Calculations Display -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculated Values</h3>
        
        <div class="space-y-4">
          <!-- Pull-up Resistor -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Pull-up Resistor</span>
              <span class="text-2xl font-bold text-purple-600">
                {{ formatResistance(pullupResistor) }}
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Recommended: 1kΩ - 10kΩ
            </p>
          </div>

          <!-- Voltage Levels Summary -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Voltage Conversion</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-600">LOW Level:</span>
              <span class="font-bold">{{ lowVoltage }}V → {{ highVoltage }}V</span>
            </div>
            <div class="flex justify-between items-center text-sm mt-1">
              <span class="text-orange-600">HIGH Level:</span>
              <span class="font-bold">{{ highVoltage }}V → {{ lowVoltage }}V</span>
            </div>
          </div>

          <!-- MOSFET Type -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Recommended MOSFET</span>
              <span class="text-lg font-bold text-blue-600">
                N-Channel
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Logic-level MOSFET with low V_gs(th)
            </p>
          </div>

          <!-- Max Frequency -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Max Signal Frequency</span>
              <span class="text-xl font-bold text-red-600">
                ~{{ maxFrequency }} MHz
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Estimated based on RC time constant
            </p>
          </div>

          <!-- Current Limit -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300 font-medium">Max Current</span>
              <span class="text-xl font-bold text-yellow-600">
                {{ maxCurrent }} mA
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              I_max = V_HV / R_pullup
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Common Applications -->
    <div class="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Applications</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">📱 Arduino to ESP8266/ESP32</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">5V Arduino → 3.3V WiFi module</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">💻 Raspberry Pi to Arduino</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">3.3V Pi → 5V Arduino (bidirectional)</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">🔌 I2C Bus Level Shifting</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Multi-voltage I2C communication</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 class="font-bold text-gray-900 dark:text-white mb-2">📡 SPI Level Conversion</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">High-speed SPI interface translation</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Reactive state
const lowVoltage = ref(3.3)
const highVoltage = ref(5)
const pullupResistor = ref(4700)  // 4.7kΩ default
const direction = ref<'lv-to-hv' | 'hv-to-lv' | 'both'>('both')

// Computed properties
const maxFrequency = computed(() => {
  // Estimate based on RC time constant (rough approximation)
  // f_max ≈ 1 / (2π × R × C) where C ≈ 10pF for MOSFET gate
  const capacitance = 10e-12  // 10pF
  const rc = pullupResistor.value * capacitance
  const freq = 1 / (2 * Math.PI * rc)
  return Math.round(freq / 1e6)  // Convert to MHz
})

const maxCurrent = computed(() => {
  // I_max = V_HV / R_pullup
  const current = highVoltage.value / pullupResistor.value
  return Math.round(current * 1000)  // Convert to mA
})

const lvColor = computed(() => {
  return '#22C55E'
})

const hvColor = computed(() => {
  return '#F59E0B'
})

const resistorColor = computed(() => {
  return '#9CA3AF'
})

const wireColor = computed(() => {
  return '#6B7280'
})

// Helper functions
const formatResistance = (ohms: number) => {
  if (ohms >= 1000000) {
    return `${(ohms / 1000000).toFixed(1)}MΩ`
  } else if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(1)}kΩ`
  }
  return `${ohms}Ω`
}

const setLowVoltage = (voltage: number) => {
  lowVoltage.value = voltage
}

const setHighVoltage = (voltage: number) => {
  highVoltage.value = voltage
}
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
}
</style>

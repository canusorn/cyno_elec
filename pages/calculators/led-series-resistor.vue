<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const supplyVoltage = ref(5)
const ledCount = ref(1)
const ledColor = ref('red')
const forwardCurrent = ref(20)
const powerRating = ref(0.25)

// LED forward voltages (typical values)
const ledVoltages = {
  red: 2.0,
  green: 2.2,
  blue: 3.3,
  yellow: 2.1,
  white: 3.3,
  amber: 2.1,
  infrared: 1.2,
  uv: 3.6,
  pink: 3.2,
  rgb_red: 2.0,
  rgb_green: 3.3,
  rgb_blue: 3.3
}

// Standard resistor values (E24 series)
const standardResistors = [
  0.1, 0.12, 0.15, 0.18, 0.22, 0.27, 0.33, 0.39, 0.47, 0.56, 0.68, 0.82,
  1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2,
  10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
  100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
  1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200,
  10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000,
  100000, 120000, 150000, 180000, 220000, 270000, 330000, 390000, 470000, 560000, 680000, 820000,
  1000000
]

// Computed
const ledForwardVoltage = computed(() => {
  return ledVoltages[ledColor.value as keyof typeof ledVoltages] || 2.0
})

const totalLedDrop = computed(() => {
  return ledForwardVoltage.value * ledCount.value
})

const voltageAcrossResistor = computed(() => {
  return supplyVoltage.value - totalLedDrop.value
})

const calculatedResistance = computed(() => {
  if (voltageAcrossResistor.value <= 0) return 0
  return voltageAcrossResistor.value / (forwardCurrent.value / 1000)
})

const standardResistance = computed(() => {
  const r = calculatedResistance.value
  if (r <= 0) return 0
  
  // Find nearest standard value
  let closest = standardResistors[0]
  let minDiff = Math.abs(r - closest)
  
  for (const value of standardResistors) {
    const diff = Math.abs(r - value)
    if (diff < minDiff) {
      minDiff = diff
      closest = value
    }
  }
  
  // Prefer higher value for safety
  if (closest < r) {
    const idx = standardResistors.indexOf(closest)
    if (idx < standardResistors.length - 1) {
      const nextHigher = standardResistors[idx + 1]
      if (Math.abs(nextHigher - r) < Math.abs(closest - r)) {
        closest = nextHigher
      }
    }
  }
  
  return closest
})

const actualCurrent = computed(() => {
  if (standardResistance.value === 0) return 0
  return (voltageAcrossResistor.value / standardResistance.value) * 1000 // mA
})

const powerDissipation = computed(() => {
  if (standardResistance.value === 0) return 0
  return (Math.pow(actualCurrent.value / 1000, 2) * standardResistance.value) * 1000 // mW
})

const powerPercentage = computed(() => {
  if (powerRating.value === 0) return 0
  return (powerDissipation.value / (powerRating.value * 1000)) * 100
})

const efficiency = computed(() => {
  const ledPower = totalLedDrop.value * (actualCurrent.value / 1000)
  const totalPower = supplyVoltage.value * (actualCurrent.value / 1000)
  if (totalPower === 0) return 0
  return (ledPower / totalPower) * 100
})

const warning = computed(() => {
  if (voltageAcrossResistor.value <= 0) {
    return '⚠️ Supply voltage is too low for the number of LEDs!'
  }
  if (powerPercentage.value > 100) {
    return '⚠️ Resistor power rating exceeded! Use a higher power rating.'
  }
  if (powerPercentage.value > 80) {
    return '⚠️ Resistor operating near maximum power. Consider higher rating.'
  }
  if (actualCurrent.value > forwardCurrent.value * 1.1) {
    return '⚠️ Current exceeds LED rating. Reduce supply voltage or increase resistance.'
  }
  return ''
})

const circuitStatus = computed(() => {
  if (voltageAcrossResistor.value <= 0) return 'invalid'
  if (warning.value) return 'warning'
  return 'ok'
})

// Format functions
const formatResistance = (ohms: number): string => {
  if (ohms >= 1000000) {
    return `${(ohms / 1000000).toFixed(2)} MΩ`
  } else if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(1)} kΩ`
  } else if (ohms >= 1) {
    return `${ohms.toFixed(1)} Ω`
  } else {
    return `${(ohms * 1000).toFixed(0)} mΩ`
  }
}

const formatPower = (mw: number): string => {
  if (mw >= 1000) {
    return `${(mw / 1000).toFixed(3)} W`
  }
  return `${mw.toFixed(1)} mW`
}

const getColorCode = (ohms: number) => {
  // Simplified color code for 4-band resistors
  const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
  
  // Convert to ohms
  let value = ohms
  let multiplier = 0
  
  while (value >= 1000 && multiplier < 6) {
    value /= 10
    multiplier++
  }
  
  const digit1 = Math.floor(value / 10)
  const digit2 = Math.floor(value % 10)
  const band3 = multiplier
  
  return {
    band1: colors[digit1] || 'black',
    band2: colors[digit2] || 'black',
    band3: colors[Math.min(band3, 9)] || 'black'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          LED Series Resistor Calculator
        </h1>
        <p class="text-slate-400 text-lg">
          Calculate the correct resistor for your LED circuit
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Input Parameters -->
        <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
          <h2 class="text-2xl font-semibold text-white mb-6">Input Parameters</h2>
          
          <div class="space-y-6">
            <!-- Supply Voltage -->
            <div>
              <label class="block text-slate-300 mb-2 font-medium">
                Supply Voltage: {{ supplyVoltage }} V
              </label>
              <input 
                type="range" 
                v-model.number="supplyVoltage"
                min="1" 
                max="48" 
                step="0.1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              >
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>1V</span>
                <span>48V</span>
              </div>
            </div>

            <!-- LED Count -->
            <div>
              <label class="block text-slate-300 mb-2 font-medium">
                Number of LEDs (in series): {{ ledCount }}
              </label>
              <input 
                type="range" 
                v-model.number="ledCount"
                min="1" 
                max="10" 
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              >
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <!-- LED Color -->
            <div>
              <label class="block text-slate-300 mb-2 font-medium">LED Color</label>
              <select 
                v-model="ledColor"
                class="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-emerald-500 focus:outline-none"
              >
                <option value="red">Red (2.0V)</option>
                <option value="green">Green (2.2V)</option>
                <option value="blue">Blue (3.3V)</option>
                <option value="yellow">Yellow (2.1V)</option>
                <option value="white">White (3.3V)</option>
                <option value="amber">Amber (2.1V)</option>
                <option value="infrared">Infrared (1.2V)</option>
                <option value="uv">UV (3.6V)</option>
                <option value="pink">Pink (3.2V)</option>
              </select>
              <p class="text-sm text-slate-400 mt-1">
                Forward Voltage: {{ ledForwardVoltage }} V
              </p>
            </div>

            <!-- Forward Current -->
            <div>
              <label class="block text-slate-300 mb-2 font-medium">
                LED Forward Current: {{ forwardCurrent }} mA
              </label>
              <input 
                type="range" 
                v-model.number="forwardCurrent"
                min="1" 
                max="100" 
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              >
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>1mA</span>
                <span>100mA</span>
              </div>
            </div>

            <!-- Power Rating -->
            <div>
              <label class="block text-slate-300 mb-2 font-medium">Resistor Power Rating</label>
              <select 
                v-model="powerRating"
                class="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-emerald-500 focus:outline-none"
              >
                <option :value="0.125">1/8 W (0.125W)</option>
                <option :value="0.25">1/4 W (0.25W)</option>
                <option :value="0.5">1/2 W (0.5W)</option>
                <option :value="1">1 W</option>
                <option :value="2">2 W</option>
                <option :value="5">5 W</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
          <h2 class="text-2xl font-semibold text-white mb-6">Results</h2>
          
          <!-- Status Alert -->
          <div v-if="warning" class="bg-amber-900/50 border border-amber-500 rounded-lg p-4 mb-6">
            <p class="text-amber-200 font-medium">{{ warning }}</p>
          </div>
          
          <div v-else-if="circuitStatus === 'ok'" class="bg-emerald-900/50 border border-emerald-500 rounded-lg p-4 mb-6">
            <p class="text-emerald-200 font-medium">✓ Circuit parameters are within safe limits!</p>
          </div>

          <!-- Calculated Values -->
          <div class="space-y-4">
            <div class="bg-slate-700 rounded-lg p-4">
              <p class="text-slate-400 text-sm mb-1">Voltage Across Resistor</p>
              <p class="text-2xl font-bold text-blue-400">{{ voltageAcrossResistor.toFixed(2) }} V</p>
            </div>

            <div class="bg-slate-700 rounded-lg p-4">
              <p class="text-slate-400 text-sm mb-1">Calculated Resistance</p>
              <p class="text-2xl font-bold text-purple-400">{{ formatResistance(calculatedResistance) }}</p>
            </div>

            <div class="bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border border-emerald-500 rounded-lg p-4">
              <p class="text-emerald-300 text-sm mb-1">🎯 Standard Resistor Value</p>
              <p class="text-3xl font-bold text-emerald-400">{{ formatResistance(standardResistance) }}</p>
            </div>

            <div class="bg-slate-700 rounded-lg p-4">
              <p class="text-slate-400 text-sm mb-1">Actual LED Current</p>
              <p class="text-2xl font-bold text-cyan-400">{{ actualCurrent.toFixed(1) }} mA</p>
            </div>

            <div class="bg-slate-700 rounded-lg p-4">
              <p class="text-slate-400 text-sm mb-1">Power Dissipation</p>
              <p class="text-2xl font-bold" :class="powerPercentage > 80 ? 'text-amber-400' : 'text-orange-400'">
                {{ formatPower(powerDissipation) }}
              </p>
              <p class="text-sm mt-1" :class="powerPercentage > 80 ? 'text-amber-300' : 'text-slate-400'">
                {{ powerPercentage.toFixed(1) }}% of {{ powerRating }}W rating
              </p>
            </div>

            <div class="bg-slate-700 rounded-lg p-4">
              <p class="text-slate-400 text-sm mb-1">Circuit Efficiency</p>
              <p class="text-2xl font-bold text-teal-400">{{ efficiency.toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Circuit Diagram -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-white mb-6">Circuit Diagram</h2>
        
        <div class="flex justify-center">
          <svg width="100%" height="200" viewBox="0 0 800 200" class="max-w-3xl">
            <!-- Background -->
            <rect width="800" height="200" fill="#1a1a2e"/>
            
            <!-- Positive rail -->
            <line x1="50" y1="50" x2="750" y2="50" stroke="#10b981" stroke-width="3"/>
            <text x="60" y="40" fill="#10b981" font-size="16" font-weight="bold">+{{ supplyVoltage }}V</text>
            
            <!-- Negative rail -->
            <line x1="50" y1="150" x2="750" y2="150" stroke="#6366f1" stroke-width="3"/>
            <text x="60" y="175" fill="#6366f1" font-size="16" font-weight="bold">GND</text>
            
            <!-- Resistor -->
            <g transform="translate(150, 50)">
              <line x1="0" y1="0" x2="0" y2="30" stroke="#10b981" stroke-width="3"/>
              <rect x="-15" y="30" width="30" height="60" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"/>
              <text x="-10" y="55" fill="#1a1a2e" font-size="12" font-weight="bold">{{ standardResistance >= 1000 ? (standardResistance/1000).toFixed(0) + 'k' : standardResistance.toFixed(0) }}Ω</text>
              <text x="-10" y="70" fill="#1a1a2e" font-size="10">{{ formatPower(powerDissipation) }}</text>
              <line x1="0" y1="90" x2="0" y2="100" stroke="#10b981" stroke-width="3"/>
            </g>
            
            <!-- LEDs -->
            <g v-for="i in ledCount" :transform="`translate(${250 + (i * 50)}, 50)`">
              <line x1="0" y1="0" x2="0" y2="30" stroke="#10b981" stroke-width="3"/>
              <!-- LED triangle -->
              <polygon points="0,30 -15,50 15,50" fill="none" stroke="#ec4899" stroke-width="2"/>
              <!-- LED line -->
              <line x1="-15" y1="70" x2="15" y2="70" stroke="#ec4899" stroke-width="2"/>
              <!-- LED arrows -->
              <line x1="8" y1="40" x2="18" y2="30" stroke="#ec4899" stroke-width="2"/>
              <polygon points="18,30 15,32 17,35" fill="#ec4899"/>
              <line x1="8" y1="75" x2="18" y2="65" stroke="#ec4899" stroke-width="2"/>
              <polygon points="18,65 15,67 17,70" fill="#ec4899"/>
              <line x1="0" y1="70" x2="0" y2="100" stroke="#10b981" stroke-width="3"/>
            </g>
            
            <!-- Connection to GND -->
            <line x1="250 + (ledCount * 50)" y1="150" x2="250 + (ledCount * 50)" y2="150" stroke="#6366f1" stroke-width="3"/>
          </svg>
        </div>
      </div>

      <!-- Color Code -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-white mb-6">Resistor Color Code</h2>
        
        <div class="flex justify-center items-center gap-4 mb-6">
          <div class="text-center">
            <div class="w-16 h-24 rounded-lg mb-2" :style="{ backgroundColor: getColorCode(standardResistance).band1 }"></div>
            <p class="text-slate-400 text-sm">Band 1</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-24 rounded-lg mb-2" :style="{ backgroundColor: getColorCode(standardResistance).band2 }"></div>
            <p class="text-slate-400 text-sm">Band 2</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-24 rounded-lg mb-2" :style="{ backgroundColor: getColorCode(standardResistance).band3 }"></div>
            <p class="text-slate-400 text-sm">Multiplier</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-24 rounded-lg mb-2 bg-gradient-to-b from-amber-400 to-amber-600"></div>
            <p class="text-slate-400 text-sm">Tolerance</p>
          </div>
        </div>
        
        <p class="text-center text-slate-300">
          Standard 4-band resistor code (±5% tolerance)
        </p>
      </div>

      <!-- Educational Content -->
      <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
        <h2 class="text-2xl font-semibold text-white mb-6">How to Calculate LED Resistor</h2>
        
        <div class="space-y-6 text-slate-300">
          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">🔧 The Formula</h3>
            <div class="bg-slate-700 rounded-lg p-4 font-mono text-sm">
              <p class="mb-2">R = (V<sub>supply</sub> - V<sub>LED</sub> × N) / I<sub>LED</sub></p>
              <p class="text-slate-400 mt-4">Where:</p>
              <ul class="ml-4 list-disc">
                <li>R = Resistance (Ohms)</li>
                <li>V<sub>supply</sub> = Supply voltage (Volts)</li>
                <li>V<sub>LED</sub> = LED forward voltage (Volts)</li>
                <li>N = Number of LEDs in series</li>
                <li>I<sub>LED</sub> = LED current (Amperes)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">⚡ Why Do You Need a Resistor?</h3>
            <ul class="list-disc list-inside space-y-2">
              <li>LEDs have a non-linear I-V characteristic</li>
              <li>Small voltage changes cause large current changes</li>
              <li>Without limiting, LED draws excessive current and burns out</li>
              <li>Resistor limits current to safe operating range</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">💡 Design Tips</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">Power Rating</h4>
                <p class="text-sm">
                  Always use a resistor with at least 2× the calculated power dissipation 
                  for reliability and to prevent overheating.
                </p>
              </div>
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">Standard Values</h4>
                <p class="text-sm">
                  Resistors come in standard values (E24 series). Always round UP to the 
                  nearest standard value to protect the LED.
                </p>
              </div>
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">LED Forward Voltage</h4>
                <p class="text-sm">
                  Different LED colors have different forward voltages. Check your LED 
                  datasheet for the exact value.
                </p>
              </div>
              <div class="bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-white mb-2">Multiple LEDs</h4>
                <p class="text-sm">
                  For multiple LEDs, connect them in series to share the current. 
                  Ensure supply voltage exceeds total LED drop.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">🎯 Common Applications</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>Indicator lights on panels and PCBs</li>
              <li>Display backlighting</li>
              <li>Status indicators for electronics</li>
              <li>Automotive lighting</li>
              <li>Decorative and accent lighting</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-emerald-400 mb-2">⚠️ Safety Notes</h3>
            <ul class="list-disc list-inside space-y-1">
              <li>Never connect LED directly to voltage source without resistor</li>
              <li>LEDs are polarity-sensitive - observe anode (+) and cathode (-)</li>
              <li>High-power LEDs may require constant current drivers instead of resistors</li>
              <li>Consider using PWM for brightness control instead of varying resistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

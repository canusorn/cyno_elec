<script setup lang="ts">
import { ref, computed } from 'vue'

const motorVoltage = ref(12)
const motorCurrent = ref(2)
const pwmFrequency = ref(1000)
const dutyCycle = ref(75)
const motorDirection = ref<'forward' | 'reverse' | 'brake' | 'coast'>('forward')

const motorState = computed(() => {
  switch (motorDirection.value) {
    case 'forward':
      return {
        q1: 'ON',
        q4: 'ON',
        q2: 'OFF',
        q3: 'OFF',
        currentPath: 'Q1 → Motor → Q4'
      }
    case 'reverse':
      return {
        q1: 'OFF',
        q4: 'OFF',
        q2: 'ON',
        q3: 'ON',
        currentPath: 'Q2 → Motor → Q3'
      }
    case 'brake':
      return {
        q1: 'ON',
        q4: 'ON',
        q2: 'ON',
        q3: 'ON',
        currentPath: 'Braking (all MOSFETs ON)'
      }
    case 'coast':
      return {
        q1: 'OFF',
        q4: 'OFF',
        q2: 'OFF',
        q3: 'OFF',
        currentPath: 'Coasting (all MOSFETs OFF)'
      }
  }
})

const effectiveVoltage = computed(() => {
  return (motorVoltage.value * dutyCycle.value / 100).toFixed(2)
})

const averageCurrent = computed(() => {
  return (motorCurrent.value * dutyCycle.value / 100).toFixed(2)
})

const motorPower = computed(() => {
  return ((effectiveVoltage.value as unknown as number) * (averageCurrent.value as unknown as number)).toFixed(2)
})

const powerPerMOSFET = computed(() => {
  if (motorDirection.value === 'coast') return 0
  if (motorDirection.value === 'brake') {
    return ((motorVoltage.value * motorCurrent.value) / 4).toFixed(2)
  }
  return ((effectiveVoltage.value as unknown as number) * (motorCurrent.value / 2)).toFixed(2)
})

const regenerationEnergy = computed(() => {
  if (motorDirection.value === 'brake') {
    return ((motorVoltage.value * motorCurrent.value * 0.3).toFixed(2)) // 30% recovery
  }
  return 0
})

const applyPreset = (preset: any) => {
  motorVoltage.value = preset.voltage
  motorCurrent.value = preset.current
  pwmFrequency.value = preset.frequency
  dutyCycle.value = preset.duty
}

const presets = [
  { name: 'Small DC Motor', voltage: 6, current: 0.5, frequency: 500, duty: 70 },
  { name: 'Hobby Servo', voltage: 5, current: 1, frequency: 50, duty: 50 },
  { name: 'Rover Motor', voltage: 12, current: 5, frequency: 1000, duty: 75 },
  { name: 'Industrial Motor', voltage: 24, current: 10, frequency: 2000, duty: 80 }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🔧 H-Bridge Motor Driver Simulation</h1>
      <p class="text-gray-600">Interactive bidirectional DC motor control with PWM speed regulation</p>
    </div>

    <!-- Controls Section -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Motor Parameters -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">⚡ Motor Parameters</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Motor Voltage: {{ motorVoltage }}V
            </label>
            <input 
              type="range" 
              v-model.number="motorVoltage" 
              min="1" max="48" step="0.5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Motor Current: {{ motorCurrent }}A
            </label>
            <input 
              type="range" 
              v-model.number="motorCurrent" 
              min="0.1" max="20" step="0.1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              PWM Frequency: {{ pwmFrequency }}Hz
            </label>
            <input 
              type="range" 
              v-model.number="pwmFrequency" 
              min="100" max="20000" step="100"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Duty Cycle: {{ dutyCycle }}%
            </label>
            <input 
              type="range" 
              v-model.number="dutyCycle" 
              min="0" max="100" step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>
        </div>
      </div>

      <!-- Direction Control -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🎮 Direction Control</h2>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <button 
            @click="motorDirection = 'forward'"
            :class="[
              'py-4 px-6 rounded-lg font-semibold transition-all duration-200',
              motorDirection === 'forward' 
                ? 'bg-green-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            ⬆️ Forward
          </button>
          
          <button 
            @click="motorDirection = 'reverse'"
            :class="[
              'py-4 px-6 rounded-lg font-semibold transition-all duration-200',
              motorDirection === 'reverse' 
                ? 'bg-blue-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            ⬇️ Reverse
          </button>
          
          <button 
            @click="motorDirection = 'brake'"
            :class="[
              'py-4 px-6 rounded-lg font-semibold transition-all duration-200',
              motorDirection === 'brake' 
                ? 'bg-yellow-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            🛑 Brake
          </button>
          
          <button 
            @click="motorDirection = 'coast'"
            :class="[
              'py-4 px-6 rounded-lg font-semibold transition-all duration-200',
              motorDirection === 'coast' 
                ? 'bg-purple-500 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            🌊 Coast
          </button>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm font-medium text-gray-700 mb-2">Current State:</p>
          <p class="text-lg font-bold" :class="{
            'text-green-600': motorDirection === 'forward',
            'text-blue-600': motorDirection === 'reverse',
            'text-yellow-600': motorDirection === 'brake',
            'text-purple-600': motorDirection === 'coast'
          }">
            {{ motorDirection.toUpperCase() }}
          </p>
          <p class="text-sm text-gray-600 mt-2">
            Path: {{ motorState.currentPath }}
          </p>
        </div>
      </div>
    </div>

    <!-- H-Bridge Circuit Diagram -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔌 H-Bridge Circuit</h2>
      
      <div class="flex justify-center">
        <svg width="400" height="300" viewBox="0 0 400 300" class="border rounded-lg bg-gray-50">
          <!-- Power Rails -->
          <line x1="50" y1="30" x2="350" y2="30" stroke="#dc2626" stroke-width="3"/>
          <text x="360" y="35" class="text-red-600 font-bold">V+</text>
          
          <line x1="50" y1="270" x2="350" y2="270" stroke="#1f2937" stroke-width="3"/>
          <text x="360" y="275" class="text-gray-700 font-bold">GND</text>
          
          <!-- Left Side (Q1, Q2) -->
          <g transform="translate(100, 0)">
            <!-- Q1 (High-side left) -->
            <rect x="0" y="50" width="40" height="30" :fill="motorState.q1 === 'ON' ? '#22c55e' : '#d1d5db'" stroke="#374151" stroke-width="2"/>
            <text x="20" y="70" text-anchor="middle" class="fill-white text-xs font-bold">Q1</text>
            <text x="-10" y="70" class="fill-gray-600 text-xs">{{ motorState.q1 }}</text>
            <line x1="20" y1="30" x2="20" y2="50" stroke="#374151" stroke-width="2"/>
            
            <!-- Q2 (Low-side left) -->
            <rect x="0" y="120" width="40" height="30" :fill="motorState.q2 === 'ON' ? '#22c55e' : '#d1d5db'" stroke="#374151" stroke-width="2"/>
            <text x="20" y="140" text-anchor="middle" class="fill-white text-xs font-bold">Q2</text>
            <text x="-10" y="140" class="fill-gray-600 text-xs">{{ motorState.q2 }}</text>
            <line x1="20" y1="150" x2="20" y2="270" stroke="#374151" stroke-width="2"/>
          </g>
          
          <!-- Right Side (Q3, Q4) -->
          <g transform="translate(260, 0)">
            <!-- Q3 (High-side right) -->
            <rect x="0" y="50" width="40" height="30" :fill="motorState.q3 === 'ON' ? '#22c55e' : '#d1d5db'" stroke="#374151" stroke-width="2"/>
            <text x="20" y="70" text-anchor="middle" class="fill-white text-xs font-bold">Q3</text>
            <text x="50" y="70" class="fill-gray-600 text-xs">{{ motorState.q3 }}</text>
            <line x1="20" y1="30" x2="20" y2="50" stroke="#374151" stroke-width="2"/>
            
            <!-- Q4 (Low-side right) -->
            <rect x="0" y="120" width="40" height="30" :fill="motorState.q4 === 'ON' ? '#22c55e' : '#d1d5db'" stroke="#374151" stroke-width="2"/>
            <text x="20" y="140" text-anchor="middle" class="fill-white text-xs font-bold">Q4</text>
            <text x="50" y="140" class="fill-gray-600 text-xs">{{ motorState.q4 }}</text>
            <line x1="20" y1="150" x2="20" y2="270" stroke="#374151" stroke-width="2"/>
          </g>
          
          <!-- Motor -->
          <g transform="translate(200, 150)">
            <circle cx="0" cy="0" r="40" :fill="motorDirection !== 'coast' ? '#3b82f6' : '#d1d5db'" stroke="#1e40af" stroke-width="2">
              <animate 
                v-if="motorDirection !== 'coast' && motorDirection !== 'brake'"
                attributeName="stroke-dasharray"
                values="0,251;251,0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="0" y="5" text-anchor="middle" class="fill-white text-sm font-bold">M</text>
          </g>
          
          <!-- Motor Connections -->
          <line x1="120" y1="80" x2="160" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="120" y1="135" x2="160" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="280" y1="80" x2="240" y2="150" stroke="#374151" stroke-width="2"/>
          <line x1="280" y1="135" x2="240" y2="150" stroke="#374151" stroke-width="2"/>
          
          <!-- PWM Indicator -->
          <g transform="translate(50, 200)">
            <text x="0" y="0" class="fill-gray-700 font-bold">PWM:</text>
            <rect x="0" y="10" width="100" height="40" fill="#f3f4f6" stroke="#374151" stroke-width="1"/>
            <rect x="0" y="10" :width="dutyCycle" height="40" fill="#3b82f6"/>
            <text x="110" y="35" class="fill-gray-600">{{ dutyCycle }}%</text>
          </g>
          
          <!-- Current Flow Arrows -->
          <g v-if="motorDirection === 'forward' && dutyCycle > 0">
            <polygon points="190,130 200,120 210,130" fill="#22c55e">
              <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite"/>
            </polygon>
          </g>
          <g v-if="motorDirection === 'reverse' && dutyCycle > 0">
            <polygon points="210,170 200,180 190,170" fill="#22c55e">
              <animate attributeName="opacity" values="1;0;1" dur="0.5s" repeatCount="indefinite"/>
            </polygon>
          </g>
        </svg>
      </div>
    </div>

    <!-- Real-time Calculations -->
    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Effective Voltage</h3>
        <p class="text-4xl font-bold">{{ effectiveVoltage }}V</p>
        <p class="text-sm mt-2 opacity-80">V_eff = V_in × duty_cycle</p>
      </div>
      
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Motor Power</h3>
        <p class="text-4xl font-bold">{{ motorPower }}W</p>
        <p class="text-sm mt-2 opacity-80">P = V_eff × I_avg</p>
      </div>
      
      <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Power/MOSFET</h3>
        <p class="text-4xl font-bold">{{ powerPerMOSFET }}W</p>
        <p class="text-sm mt-2 opacity-80">Per active MOSFET</p>
      </div>
    </div>

    <!-- Regeneration Energy -->
    <div v-if="regenerationEnergy > 0" class="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-8">
      <div class="flex items-center">
        <span class="text-2xl mr-2">🔋</span>
        <div>
          <p class="font-semibold text-yellow-800">Regenerative Braking</p>
          <p class="text-yellow-700">Recovering ~{{ regenerationEnergy }}W back to the supply</p>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">⚡ Quick Presets</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          v-for="preset in presets" 
          :key="preset.name"
          @click="applyPreset(preset)"
          class="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 border border-indigo-200"
        >
          <p class="font-semibold text-gray-800">{{ preset.name }}</p>
          <p class="text-sm text-gray-600">{{ preset.voltage }}V @ {{ preset.current }}A</p>
        </button>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">📚 H-Bridge Theory</h2>
      
      <div class="space-y-6">
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">What is an H-Bridge?</h3>
          <p class="text-gray-700">
            An H-Bridge is an electronic circuit that enables a voltage to be applied across a load in either direction. 
            It's the fundamental circuit for bidirectional motor control, allowing DC motors to run forward and reverse.
          </p>
        </div>

        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-green-800 mb-2">H-Bridge Truth Table</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-green-100">
                <tr>
                  <th class="px-4 py-2 text-left">Q1</th>
                  <th class="px-4 py-2 text-left">Q2</th>
                  <th class="px-4 py-2 text-left">Q3</th>
                  <th class="px-4 py-2 text-left">Q4</th>
                  <th class="px-4 py-2 text-left">Motor State</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t">
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2 font-semibold">Forward ⬆️</td>
                </tr>
                <tr class="border-t">
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2 font-semibold">Reverse ⬇️</td>
                </tr>
                <tr class="border-t">
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2">ON</td>
                  <td class="px-4 py-2 font-semibold">Brake 🛑</td>
                </tr>
                <tr class="border-t">
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2">OFF</td>
                  <td class="px-4 py-2 font-semibold">Coast 🌊</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-yellow-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-yellow-800 mb-2">⚠️ Shoot-Through Protection</h3>
          <p class="text-gray-700">
            Shoot-through occurs when both MOSFETs on the same side (Q1+Q2 or Q3+Q4) turn ON simultaneously, 
            creating a direct short circuit from V+ to GND. This can destroy the MOSFETs due to excessive current. 
            Always implement dead-time delay in PWM signals to prevent this condition.
          </p>
        </div>

        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-purple-800 mb-2">PWM Speed Control</h3>
          <p class="text-gray-700">
            Pulse Width Modulation (PWM) controls motor speed by rapidly switching the voltage on and off. 
            The duty cycle determines the average voltage seen by the motor: <br>
            <code class="bg-purple-100 px-2 py-1 rounded">V_eff = V_in × duty_cycle</code><br>
            Higher PWM frequencies (1-20kHz) provide smoother motor operation and reduce audible noise.
          </p>
        </div>

        <div class="bg-orange-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-orange-800 mb-2">🔄 Regenerative Braking</h3>
          <p class="text-gray-700">
            When braking, a spinning DC motor acts as a generator. In brake mode, the generated energy can be 
            fed back to the power supply (regenerative braking) or dissipated as heat through the MOSFETs. 
            This feature is particularly useful in electric vehicles to extend battery life.
          </p>
        </div>

        <div class="bg-indigo-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-indigo-800 mb-2">🔧 Applications</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Robotics:</strong> Wheel drive control, arm positioning</li>
            <li><strong>Electric Vehicles:</strong> Main traction motor control</li>
            <li><strong>Industrial Automation:</strong> Conveyor belts, actuators</li>
            <li><strong>Drones:</strong> Brushless motor ESCs use 3-phase bridges</li>
            <li><strong>RC Vehicles:</strong> Forward/reverse/brake control</li>
          </ul>
        </div>

        <div class="bg-gray-100 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">💡 Pro Tips</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Use MOSFETs with low R_DS(on) to minimize conduction losses</li>
            <li>Add flyback diodes (or use MOSFET body diodes) to handle inductive kickback</li>
            <li>Implement dead-time (100-500ns) to prevent shoot-through</li>
            <li>Use gate drivers with sufficient current to switch MOSFETs quickly</li>
            <li>Consider using dedicated H-bridge ICs (L298N, L293D, DRV8871)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

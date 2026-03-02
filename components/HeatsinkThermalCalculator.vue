<template>
  <div class="space-y-8">
    <!-- Control Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>⚙️</span> Component Parameters
      </h2>

      <!-- Component Selection -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Component Type
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="type in componentTypes"
            :key="type.id"
            @click="componentType = type.id"
            :class="[
              'px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm',
              componentType === type.id
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ type.name }}
          </button>
        </div>
      </div>

      <!-- Input Parameters -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Power Dissipation -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Power & Temperature</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Power Dissipation: {{ powerDissipation.toFixed(2) }}W
            </label>
            <input
              type="range"
              v-model.number="powerDissipation"
              min="0.1"
              max="100"
              step="0.1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.1W</span>
              <span>100W</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ambient Temperature: {{ ambientTemp }}°C
            </label>
            <input
              type="range"
              v-model.number="ambientTemp"
              min="0"
              max="100"
              step="1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0°C</span>
              <span>100°C</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Junction Temperature: {{ maxJunctionTemp }}°C
            </label>
            <input
              type="range"
              v-model.number="maxJunctionTemp"
              min="80"
              max="200"
              step="5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>80°C</span>
              <span>200°C</span>
            </div>
          </div>
        </div>

        <!-- Thermal Resistances -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Thermal Resistance</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Junction-to-Case (Rθjc): {{ junctionToCase.toFixed(2) }}°C/W
            </label>
            <input
              type="range"
              v-model.number="junctionToCase"
              min="0.1"
              max="10"
              step="0.1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.1°C/W</span>
              <span>10°C/W</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Case-to-Heatsink (Rθcs): {{ caseToHeatsink.toFixed(2) }}°C/W
            </label>
            <input
              type="range"
              v-model.number="caseToHeatsink"
              min="0"
              max="5"
              step="0.05"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0°C/W</span>
              <span>5°C/W</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Heatsink-to-Ambient (Rθsa): {{ heatsinkToAmbient.toFixed(2) }}°C/W
            </label>
            <input
              type="range"
              v-model.number="heatsinkToAmbient"
              min="0.1"
              max="50"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.1°C/W</span>
              <span>50°C/W</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Presets -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📊</span> Thermal Analysis Results
      </h2>

      <!-- Temperature Gauge -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 mb-6">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Temperature Gauge -->
          <div class="relative w-64 h-64 flex-shrink-0">
            <svg viewBox="0 0 200 200" class="w-full h-full">
              <!-- Background circle -->
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="currentColor"
                stroke-width="12"
                class="text-gray-200 dark:text-gray-700"
              />
              
              <!-- Temperature arc -->
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                :stroke="gaugeColor"
                stroke-width="12"
                stroke-linecap="round"
                :stroke-dasharray="gaugeCircumference"
                :stroke-dashoffset="gaugeOffset"
                transform="rotate(-90 100 100)"
              />
              
              <!-- Temperature text -->
              <text
                x="100"
                y="90"
                text-anchor="middle"
                class="text-4xl font-bold fill-current"
                :class="gaugeColor"
                font-size="40"
              >
                {{ junctionTemp.toFixed(1) }}°C
              </text>
              
              <text
                x="100"
                y="115"
                text-anchor="middle"
                class="text-sm fill-current text-gray-600 dark:text-gray-400"
                font-size="12"
              >
                Junction Temp
              </text>
              
              <!-- Max temp marker -->
              <text
                x="100"
                y="140"
                text-anchor="middle"
                class="text-xs fill-current text-gray-500 dark:text-gray-500"
                font-size="10"
              >
                Max: {{ maxJunctionTemp }}°C
              </text>
            </svg>
          </div>

          <!-- Temperature Details -->
          <div class="flex-1 space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border-2" :class="statusBorder">
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">{{ statusIcon }}</span>
                <span class="text-lg font-bold" :class="statusColor">{{ statusText }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ statusDescription }}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Temp Rise</div>
                <div class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ tempRise.toFixed(1) }}°C
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Margin</div>
                <div class="text-lg font-bold" :class="marginColor">
                  {{ tempMargin.toFixed(1) }}°C
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Rθ</div>
                <div class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ totalThermalResistance.toFixed(2) }}°C/W
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Case Temp</div>
                <div class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ caseTemp.toFixed(1) }}°C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Required Heatsink -->
      <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Required Heatsink Performance</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Max Heatsink Rθ (required)</div>
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {{ requiredHeatsinkResistance.toFixed(2) }}°C/W
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Current: {{ heatsinkToAmbient.toFixed(2) }}°C/W
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Without Heatsink</div>
            <div class="text-2xl font-bold" :class="withoutHeatsinkSafe ? 'text-green-600' : 'text-red-600'">
              {{ junctionTempNoHeatsink.toFixed(1) }}°C
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ withoutHeatsinkSafe ? 'Safe' : 'Unsafe!' }}
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Heatsink Effectiveness</div>
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ heatsinkEffectiveness.toFixed(0) }}%
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ (junctionTempNoHeatsink - junctionTemp).toFixed(1) }}°C reduction
            </div>
          </div>
        </div>
      </div>

      <!-- Thermal Resistance Breakdown -->
      <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thermal Resistance Breakdown</h3>
        
        <!-- Bar Chart -->
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-700 dark:text-gray-300">Junction-to-Case (Rθjc)</span>
              <span class="font-semibold text-gray-900 dark:text-white">{{ junctionToCase.toFixed(2) }}°C/W</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: Math.min((junctionToCase / totalThermalResistance) * 100, 100) + '%' }"
              ></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ ((junctionToCase / totalThermalResistance) * 100).toFixed(1) }}% of total • {{ (junctionToCase * powerDissipation).toFixed(1) }}°C rise
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-700 dark:text-gray-300">Case-to-Heatsink (Rθcs)</span>
              <span class="font-semibold text-gray-900 dark:text-white">{{ caseToHeatsink.toFixed(2) }}°C/W</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="bg-purple-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: Math.min((caseToHeatsink / totalThermalResistance) * 100, 100) + '%' }"
              ></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ ((caseToHeatsink / totalThermalResistance) * 100).toFixed(1) }}% of total • {{ (caseToHeatsink * powerDissipation).toFixed(1) }}°C rise
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-700 dark:text-gray-300">Heatsink-to-Ambient (Rθsa)</span>
              <span class="font-semibold text-gray-900 dark:text-white">{{ heatsinkToAmbient.toFixed(2) }}°C/W</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="bg-orange-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: Math.min((heatsinkToAmbient / totalThermalResistance) * 100, 100) + '%' }"
              ></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {{ ((heatsinkToAmbient / totalThermalResistance) * 100).toFixed(1) }}% of total • {{ (heatsinkToAmbient * powerDissipation).toFixed(1) }}°C rise
            </div>
          </div>

          <div class="pt-2 border-t border-gray-300 dark:border-gray-600">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-900 dark:text-white font-semibold">Total Thermal Resistance</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ totalThermalResistance.toFixed(2) }}°C/W</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="bg-gray-800 dark:bg-gray-500 h-3 rounded-full transition-all duration-300"
                style="width: 100%"
              ></div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              100% • {{ tempRise.toFixed(1) }}°C total rise
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📚</span> Understanding Thermal Design
      </h2>

      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">What is Thermal Resistance?</h3>
          <p class="leading-relaxed">
            Thermal resistance (Rθ or Rth) measures how difficult it is for heat to flow through a material or interface. 
            It's analogous to electrical resistance: higher thermal resistance means more temperature rise for a given power flow.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Thermal Circuit Model</h3>
          <p class="leading-relaxed mb-3">
            Heat flow from semiconductor junction to ambient follows a thermal circuit similar to electrical circuits:
          </p>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
            <p><strong>Total Rθ:</strong> Rθ<sub>ja</sub> = Rθ<sub>jc</sub> + Rθ<sub>cs</sub> + Rθ<sub>sa</sub></p>
            <p><strong>Temp Rise:</strong> ΔT = P × Rθ<sub>ja</sub></p>
            <p><strong>Junction Temp:</strong> T<sub>j</sub> = T<sub>a</sub> + (P × Rθ<sub>ja</sub>)</p>
            <p><strong>Case Temp:</strong> T<sub>c</sub> = T<sub>a</sub> + [P × (Rθ<sub>cs</sub> + Rθ<sub>sa</sub>)]</p>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Parameters</h3>
          <ul class="space-y-2 list-disc list-inside">
            <li><strong>Rθ<sub>jc</sub> (Junction-to-Case):</strong> Internal thermal resistance from chip to package case. Fixed by device design.</li>
            <li><strong>Rθ<sub>cs</sub> (Case-to-Heatsink):</strong> Interface thermal resistance. Reduced with thermal paste and proper mounting.</li>
            <li><strong>Rθ<sub>sa</sub> (Heatsink-to-Ambient):</strong> Heatsink effectiveness. Lower values mean better cooling.</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Design Guidelines</h3>
          <ul class="space-y-2 list-disc list-inside">
            <li><strong>Keep Tj Safe:</strong> Maintain junction temperature below maximum rating (usually 125-175°C)</li>
            <li><strong>Add Margin:</strong> Design for 20-30°C below maximum for reliability and longevity</li>
            <li><strong>Minimize Rθcs:</strong> Use quality thermal interface material and proper mounting pressure</li>
            <li><strong>Consider Airflow:</strong> Forced air can significantly reduce effective heatsink thermal resistance</li>
            <li><strong>Power Derating:</strong> Reduce power handling at high ambient temperatures</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Typical Values</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th class="px-4 py-2 text-left text-gray-900 dark:text-white">Component</th>
                  <th class="px-4 py-2 text-left text-gray-900 dark:text-white">Rθjc (°C/W)</th>
                  <th class="px-4 py-2 text-left text-gray-900 dark:text-white">Typical Use</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-4 py-2">TO-220 Transistor</td>
                  <td class="px-4 py-2">1.5 - 5.0</td>
                  <td class="px-4 py-2">Medium power (10-50W)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">TO-3 Transistor</td>
                  <td class="px-4 py-2">0.8 - 2.0</td>
                  <td class="px-4 py-2">High power (50-200W)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">TO-92 Transistor</td>
                  <td class="px-4 py-2">83 - 150</td>
                  <td class="px-4 py-2">Low power (<1W)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">SMD DPAK</td>
                  <td class="px-4 py-2">2.5 - 6.0</td>
                  <td class="px-4 py-2">Surface mount, medium power</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const componentType = ref('transistor')
const powerDissipation = ref(5)          // Watts
const ambientTemp = ref(25)              // °C
const maxJunctionTemp = ref(150)         // °C
const junctionToCase = ref(1.5)          // °C/W
const caseToHeatsink = ref(0.5)          // °C/W
const heatsinkToAmbient = ref(10)        // °C/W

// Component type options
const componentTypes = [
  { id: 'transistor', name: 'Transistor' },
  { id: 'diode', name: 'Diode' },
  { id: 'ic', name: 'IC' },
  { id: 'mosfet', name: 'MOSFET' }
]

// Presets
const presets = [
  {
    name: 'TO-220 (5W)',
    settings: { 
      powerDissipation: 5, 
      ambientTemp: 25, 
      maxJunctionTemp: 150, 
      junctionToCase: 3, 
      caseToHeatsink: 0.5, 
      heatsinkToAmbient: 8,
      componentType: 'transistor'
    }
  },
  {
    name: 'TO-3 (50W)',
    settings: { 
      powerDissipation: 50, 
      ambientTemp: 30, 
      maxJunctionTemp: 175, 
      junctionToCase: 1.5, 
      caseToHeatsink: 0.3, 
      heatsinkToAmbient: 1.5,
      componentType: 'transistor'
    }
  },
  {
    name: 'CPU Heatsink',
    settings: { 
      powerDissipation: 15, 
      ambientTemp: 25, 
      maxJunctionTemp: 100, 
      junctionToCase: 0.5, 
      caseToHeatsink: 0.2, 
      heatsinkToAmbient: 2.5,
      componentType: 'ic'
    }
  },
  {
    name: 'High Temp Ambient',
    settings: { 
      powerDissipation: 10, 
      ambientTemp: 60, 
      maxJunctionTemp: 150, 
      junctionToCase: 2, 
      caseToHeatsink: 0.5, 
      heatsinkToAmbient: 4,
      componentType: 'mosfet'
    }
  }
]

// Calculated values
const totalThermalResistance = computed(() => {
  return junctionToCase.value + caseToHeatsink.value + heatsinkToAmbient.value
})

const tempRise = computed(() => {
  return powerDissipation.value * totalThermalResistance.value
})

const junctionTemp = computed(() => {
  return ambientTemp.value + tempRise.value
})

const caseTemp = computed(() => {
  return ambientTemp.value + (powerDissipation.value * (caseToHeatsink.value + heatsinkToAmbient.value))
})

const junctionTempNoHeatsink = computed(() => {
  const resistanceNoHeatsink = junctionToCase.value + 50 // Assume 50°C/W without heatsink
  return ambientTemp.value + (powerDissipation.value * resistanceNoHeatsink)
})

const tempMargin = computed(() => {
  return maxJunctionTemp.value - junctionTemp.value
})

const requiredHeatsinkResistance = computed(() => {
  const maxAllowedRise = maxJunctionTemp.value - ambientTemp.value
  const maxTotalResistance = maxAllowedRise / powerDissipation.value
  const requiredRsa = maxTotalResistance - junctionToCase.value - caseToHeatsink.value
  return Math.max(0, requiredRsa)
})

const heatsinkEffectiveness = computed(() => {
  const riseWithHeatsink = tempRise.value
  const riseWithoutHeatsink = powerDissipation.value * (junctionToCase.value + 50)
  return ((riseWithoutHeatsink - riseWithHeatsink) / riseWithoutHeatsink) * 100
})

// Status calculations
const withoutHeatsinkSafe = computed(() => {
  return junctionTempNoHeatsink.value < maxJunctionTemp.value
})

// Gauge calculations
const gaugeCircumference = 2 * Math.PI * 85
const gaugeOffset = computed(() => {
  const percentage = Math.min(junctionTemp.value / maxJunctionTemp.value, 1)
  return gaugeCircumference * (1 - percentage)
})

const gaugeColor = computed(() => {
  if (junctionTemp.value < maxJunctionTemp.value * 0.7) return '#10B981' // Green
  if (junctionTemp.value < maxJunctionTemp.value * 0.9) return '#F59E0B' // Orange
  return '#EF4444' // Red
})

const statusIcon = computed(() => {
  if (tempMargin.value > 30) return '✅'
  if (tempMargin.value > 10) return '⚠️'
  return '🔥'
})

const statusText = computed(() => {
  if (tempMargin.value > 30) return 'Excellent'
  if (tempMargin.value > 10) return 'Acceptable'
  if (tempMargin.value > 0) return 'Marginal'
  return 'Overheating!'
})

const statusColor = computed(() => {
  if (tempMargin.value > 30) return 'text-green-600 dark:text-green-400'
  if (tempMargin.value > 10) return 'text-yellow-600 dark:text-yellow-400'
  if (tempMargin.value > 0) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
})

const statusBorder = computed(() => {
  if (tempMargin.value > 30) return 'border-green-500'
  if (tempMargin.value > 10) return 'border-yellow-500'
  if (tempMargin.value > 0) return 'border-orange-500'
  return 'border-red-500'
})

const statusDescription = computed(() => {
  if (tempMargin.value > 30) return 'Excellent thermal margin. Heatsink is more than adequate.'
  if (tempMargin.value > 10) return 'Acceptable design with reasonable safety margin.'
  if (tempMargin.value > 0) return 'Minimal safety margin. Consider improving cooling.'
  return 'Component will overheat! Immediate design changes required.'
})

const marginColor = computed(() => {
  if (tempMargin.value > 30) return 'text-green-600 dark:text-green-400'
  if (tempMargin.value > 10) return 'text-yellow-600 dark:text-yellow-400'
  if (tempMargin.value > 0) return 'text-orange-600 dark:text-orange-400'
  return 'text-red-600 dark:text-red-400'
})

const applyPreset = (preset: any) => {
  powerDissipation.value = preset.settings.powerDissipation
  ambientTemp.value = preset.settings.ambientTemp
  maxJunctionTemp.value = preset.settings.maxJunctionTemp
  junctionToCase.value = preset.settings.junctionToCase
  caseToHeatsink.value = preset.settings.caseToHeatsink
  heatsinkToAmbient.value = preset.settings.heatsinkToAmbient
  componentType.value = preset.settings.componentType
}
</script>

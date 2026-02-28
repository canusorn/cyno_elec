<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Input Section -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transformer Parameters</h3>
        
        <!-- Calculation Mode -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Calculation Mode
          </label>
          <select
            v-model="calculationMode"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="primary-to-secondary">Primary → Secondary</option>
            <option value="secondary-to-primary">Secondary → Primary</option>
            <option value="turns-ratio">Calculate Turns Ratio</option>
            <option value="impedance">Impedance Matching</option>
          </select>
        </div>

        <!-- Primary Side -->
        <div class="mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-4">Primary Side (Input)</h4>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Voltage (V₁)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="primaryVoltage"
                type="number"
                step="any"
                placeholder="Enter primary voltage"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">V</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Current (I₁)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="primaryCurrent"
                type="number"
                step="any"
                placeholder="Enter primary current"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">A</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Turns (N₁)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="primaryTurns"
                type="number"
                step="any"
                placeholder="Enter primary turns"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">turns</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Impedance (Z₁)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="primaryImpedance"
                type="number"
                step="any"
                placeholder="Enter primary impedance"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">Ω</span>
            </div>
          </div>
        </div>

        <!-- Secondary Side -->
        <div class="mb-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-green-900 dark:text-green-300 mb-4">Secondary Side (Output)</h4>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Voltage (V₂)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="secondaryVoltage"
                type="number"
                step="any"
                placeholder="Enter secondary voltage"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">V</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Current (I₂)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="secondaryCurrent"
                type="number"
                step="any"
                placeholder="Enter secondary current"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">A</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Turns (N₂)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="secondaryTurns"
                type="number"
                step="any"
                placeholder="Enter secondary turns"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">turns</span>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Impedance (Z₂)
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="secondaryImpedance"
                type="number"
                step="any"
                placeholder="Enter secondary impedance"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
              />
              <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">Ω</span>
            </div>
          </div>
        </div>

        <!-- Quick Presets -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Presets</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="setPreset('step-down')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              Step-Down (230V→12V)
            </button>
            <button
              @click="setPreset('step-up')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              Step-Up (12V→230V)
            </button>
            <button
              @click="setPreset('isolation')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              Isolation (1:1)
            </button>
            <button
              @click="setPreset('impedance-match')"
              class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary dark:text-primary-light rounded-lg text-sm transition-colors">
              Impedance Match
            </button>
          </div>
        </div>

        <!-- Clear Button -->
        <button
          @click="clearAll"
          class="w-full px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300 rounded-lg font-medium transition-colors">
          Clear All Values
        </button>
      </div>

      <!-- Results & Visualization Section -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calculation Results</h3>

        <!-- Turns Ratio -->
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 mb-6">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-4">Turns Ratio (a)</h4>
          <div class="text-center mb-4">
            <div class="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {{ turnsRatioDisplay }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              a = N₁ / N₂ = {{ primaryTurns || '—' }} / {{ secondaryTurns || '—' }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="text-center">
              <div class="text-gray-600 dark:text-gray-300">Voltage Ratio</div>
              <div class="font-bold text-purple-600 dark:text-purple-400">
                {{ voltageRatioDisplay }}
              </div>
            </div>
            <div class="text-center">
              <div class="text-gray-600 dark:text-gray-300">Current Ratio</div>
              <div class="font-bold text-purple-600 dark:text-purple-400">
                {{ currentRatioDisplay }}
              </div>
            </div>
          </div>
        </div>

        <!-- Calculated Values -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <!-- Primary Power -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Primary Power</div>
            <div class="text-xl font-bold text-blue-600 dark:text-blue-400">
              {{ primaryPowerDisplay }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              P₁ = V₁ × I₁
            </div>
          </div>

          <!-- Secondary Power -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Secondary Power</div>
            <div class="text-xl font-bold text-green-600 dark:text-green-400">
              {{ secondaryPowerDisplay }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              P₂ = V₂ × I₂
            </div>
          </div>

          <!-- Reflected Impedance -->
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Reflected Z₂ → Primary</div>
            <div class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {{ reflectedZ1Display }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Z₂' = Z₂ / a²
            </div>
          </div>

          <!-- Reflected Impedance -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Reflected Z₁ → Secondary</div>
            <div class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {{ reflectedZ2Display }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Z₁' = Z₁ × a²
            </div>
          </div>
        </div>

        <!-- Transformer Diagram -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-center">Transformer Diagram</h4>
          <div class="flex justify-center">
            <svg width="300" height="280" viewBox="0 0 300 280" class="text-primary">
              <!-- Primary Coil (Left) -->
              <g class="primary-coil">
                <!-- Core -->
                <rect x="110" y="80" width="80" height="120" fill="none" stroke="currentColor" stroke-width="2" class="core"/>
                <line x1="110" y1="100" x2="190" y2="100" stroke="currentColor" stroke-width="1"/>
                <line x1="110" y1="120" x2="190" y2="120" stroke="currentColor" stroke-width="1"/>
                <line x1="110" y1="140" x2="190" y2="140" stroke="currentColor" stroke-width="1"/>
                <line x1="110" y1="160" x2="190" y2="160" stroke="currentColor" stroke-width="1"/>
                <line x1="110" y1="180" x2="190" y2="180" stroke="currentColor" stroke-width="1"/>
                
                <!-- Primary Windings -->
                <ellipse cx="90" cy="90" rx="15" ry="8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <ellipse cx="90" cy="105" rx="15" ry="8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <ellipse cx="90" cy="120" rx="15" ry="8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <ellipse cx="90" cy="135" rx="15" ry="8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <ellipse cx="90" cy="150" rx="15" ry="8" fill="none" stroke="#3B82F6" stroke-width="2"/>
                
                <!-- Primary Labels -->
                <text x="30" y="90" class="text-xs fill-current font-bold">V₁</text>
                <text x="30" y="125" class="text-xs fill-current font-bold">I₁</text>
                <text x="70" y="185" class="text-xs fill-current text-center">N₁</text>
                <text x="70" y="200" class="text-xs fill-current text-center">{{ primaryTurns || '—' }}</text>
                
                <!-- Primary Connection Lines -->
                <line x1="20" y1="90" x2="75" y2="90" stroke="#3B82F6" stroke-width="2"/>
                <line x1="20" y1="125" x2="75" y2="125" stroke="#3B82F6" stroke-width="2"/>
              </g>

              <!-- Secondary Coil (Right) -->
              <g class="secondary-coil">
                <!-- Secondary Windings -->
                <ellipse cx="210" cy="90" rx="15" ry="8" fill="none" stroke="#10B981" stroke-width="2"/>
                <ellipse cx="210" cy="105" rx="15" ry="8" fill="none" stroke="#10B981" stroke-width="2"/>
                <ellipse cx="210" cy="120" rx="15" ry="8" fill="none" stroke="#10B981" stroke-width="2"/>
                <ellipse cx="210" cy="135" rx="15" ry="8" fill="none" stroke="#10B981" stroke-width="2"/>
                <ellipse cx="210" cy="150" rx="15" ry="8" fill="none" stroke="#10B981" stroke-width="2"/>
                
                <!-- Secondary Labels -->
                <text x="250" y="90" class="text-xs fill-current font-bold">V₂</text>
                <text x="250" y="125" class="text-xs fill-current font-bold">I₂</text>
                <text x="220" y="185" class="text-xs fill-current text-center">N₂</text>
                <text x="220" y="200" class="text-xs fill-current text-center">{{ secondaryTurns || '—' }}</text>
                
                <!-- Secondary Connection Lines -->
                <line x1="225" y1="90" x2="280" y2="90" stroke="#10B981" stroke-width="2"/>
                <line x1="225" y1="125" x2="280" y2="125" stroke="#10B981" stroke-width="2"/>
              </g>

              <!-- Voltage Indicators -->
              <g class="voltage-indicators">
                <text x="30" y="105" class="text-xs fill-current">{{ primaryVoltage ? primaryVoltage + 'V' : '—' }}</text>
                <text x="250" y="105" class="text-xs fill-current">{{ secondaryVoltage ? secondaryVoltage + 'V' : '—' }}</text>
              </g>

              <!-- Transformer Type -->
              <text x="150" y="240" class="text-sm fill-current text-center font-bold">
                {{ transformerType }}
              </text>
              
              <!-- Ratio Display -->
              <text x="150" y="260" class="text-xs fill-current text-center">
                Ratio: {{ turnsRatioDisplay }}
              </text>
            </svg>
          </div>
        </div>

        <!-- Calculation Steps -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Calculation Steps</h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-start" v-for="(step, index) in calculationSteps" :key="index">
              <span class="text-primary font-bold mr-2">{{ index + 1 }}.</span>
              <span class="text-gray-700 dark:text-gray-300">{{ step }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Transformers</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Principles -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-blue-900 dark:text-blue-300 mb-2">Basic Principles</h4>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Transformers transfer electrical energy between circuits through electromagnetic induction.
          </p>
          <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <strong>Faraday's Law:</strong> Changing magnetic flux induces voltage</p>
            <p>• <strong>Ideal Transformer:</strong> Power in = Power out (P₁ = P₂)</p>
            <p>• <strong>Turns Ratio:</strong> Determines voltage transformation</p>
            <p>• <strong>Isolation:</strong> Separates primary and secondary circuits</p>
          </div>
        </div>

        <!-- Key Formulas -->
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-green-900 dark:text-green-300 mb-2">Key Formulas</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>Turns Ratio:</strong> a = N₁ / N₂</p>
            <p><strong>Voltage Ratio:</strong> V₁ / V₂ = N₁ / N₂ = a</p>
            <p><strong>Current Ratio:</strong> I₁ / I₂ = N₂ / N₁ = 1/a</p>
            <p><strong>Power:</strong> P = V × I (P₁ = P₂ for ideal)</p>
            <p><strong>Impedance Reflection:</strong> Z₂' = Z₂ / a²</p>
          </div>
        </div>

        <!-- Transformer Types -->
        <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Transformer Types</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p>• <strong>Step-Down:</strong> N₁ > N₂, V₁ > V₂ (e.g., 230V → 12V)</p>
            <p>• <strong>Step-Up:</strong> N₁ < N₂, V₁ < V₂ (e.g., 12V → 230V)</p>
            <p>• <strong>Isolation:</strong> N₁ = N₂, V₁ = V₂ (same voltage, isolated)</p>
            <p>• <strong>Autotransformer:</strong> Single winding, tap output</p>
          </div>
        </div>

        <!-- Applications -->
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 class="font-semibold text-purple-900 dark:text-purple-300 mb-2">Applications</h4>
          <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
            <p>• <strong>Power Distribution:</strong> Step-up/down for transmission</p>
            <p>• <strong>AC Adapters:</strong> Converting mains to low voltage</p>
            <p>• <strong>Impedance Matching:</strong> Audio amplifiers, RF circuits</p>
            <p>• <strong>Isolation:</strong> Safety, noise reduction</p>
            <p>• <strong>Voltage Conversion:</strong> International power supplies</p>
          </div>
        </div>
      </div>

      <!-- Efficiency and Losses -->
      <div class="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <h4 class="font-semibold text-red-900 dark:text-red-300 mb-2">Real-World Considerations</h4>
        <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
          <p>• <strong>Efficiency:</strong> Real transformers have losses (typically 85-98%)</p>
          <p>• <strong>Copper Losses:</strong> I²R losses in windings</p>
          <p>• <strong>Core Losses:</strong> Eddy currents and hysteresis</p>
          <p>• <strong>Leakage Flux:</strong> Not all flux couples both windings</p>
          <p>• <strong>Magnetizing Current:</strong> Small current even at no load</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const calculationMode = ref('primary-to-secondary')
const primaryVoltage = ref(null)
const primaryCurrent = ref(null)
const primaryTurns = ref(null)
const primaryImpedance = ref(null)
const secondaryVoltage = ref(null)
const secondaryCurrent = ref(null)
const secondaryTurns = ref(null)
const secondaryImpedance = ref(null)

// Computed values
const turnsRatio = computed(() => {
  if (primaryTurns.value && secondaryTurns.value) {
    return primaryTurns.value / secondaryTurns.value
  }
  if (primaryVoltage.value && secondaryVoltage.value) {
    return primaryVoltage.value / secondaryVoltage.value
  }
  if (secondaryCurrent.value && primaryCurrent.value) {
    return secondaryCurrent.value / primaryCurrent.value
  }
  return null
})

const turnsRatioDisplay = computed(() => {
  if (turnsRatio.value === null) return '— : 1'
  return `${turnsRatio.value.toFixed(3)} : 1`
})

const voltageRatio = computed(() => {
  if (primaryVoltage.value && secondaryVoltage.value) {
    return primaryVoltage.value / secondaryVoltage.value
  }
  return turnsRatio.value
})

const voltageRatioDisplay = computed(() => {
  if (voltageRatio.value === null) return '— : 1'
  return `${voltageRatio.value.toFixed(3)} : 1`
})

const currentRatio = computed(() => {
  if (secondaryCurrent.value && primaryCurrent.value) {
    return primaryCurrent.value / secondaryCurrent.value
  }
  return turnsRatio.value ? 1 / turnsRatio.value : null
})

const currentRatioDisplay = computed(() => {
  if (currentRatio.value === null) return '— : 1'
  return `${currentRatio.value.toFixed(3)} : 1`
})

const primaryPower = computed(() => {
  if (primaryVoltage.value && primaryCurrent.value) {
    return primaryVoltage.value * primaryCurrent.value
  }
  return null
})

const primaryPowerDisplay = computed(() => {
  if (primaryPower.value === null) return '—'
  return `${primaryPower.value.toFixed(2)} VA`
})

const secondaryPower = computed(() => {
  if (secondaryVoltage.value && secondaryCurrent.value) {
    return secondaryVoltage.value * secondaryCurrent.value
  }
  return null
})

const secondaryPowerDisplay = computed(() => {
  if (secondaryPower.value === null) return '—'
  return `${secondaryPower.value.toFixed(2)} VA`
})

const reflectedZ1 = computed(() => {
  if (secondaryImpedance.value && turnsRatio.value) {
    return secondaryImpedance.value / (turnsRatio.value ** 2)
  }
  return null
})

const reflectedZ1Display = computed(() => {
  if (reflectedZ1.value === null) return '—'
  return `${reflectedZ1.value.toFixed(2)} Ω`
})

const reflectedZ2 = computed(() => {
  if (primaryImpedance.value && turnsRatio.value) {
    return primaryImpedance.value * (turnsRatio.value ** 2)
  }
  return null
})

const reflectedZ2Display = computed(() => {
  if (reflectedZ2.value === null) return '—'
  return `${reflectedZ2.value.toFixed(2)} Ω`
})

const transformerType = computed(() => {
  if (turnsRatio.value === null) return 'Unknown Type'
  
  if (Math.abs(turnsRatio.value - 1) < 0.01) {
    return 'Isolation Transformer (1:1)'
  } else if (turnsRatio.value > 1) {
    return `Step-Down Transformer (${turnsRatio.value.toFixed(1)}:1)`
  } else {
    return `Step-Up Transformer (1:${(1/turnsRatio.value).toFixed(1)})`
  }
})

const calculationSteps = computed(() => {
  const steps = []
  
  if (turnsRatio.value !== null) {
    steps.push(`Calculate turns ratio: a = N₁ / N₂ = ${turnsRatio.value.toFixed(4)}`)
  }
  
  if (primaryVoltage.value && turnsRatio.value) {
    const calcV2 = primaryVoltage.value / turnsRatio.value
    steps.push(`Calculate secondary voltage: V₂ = V₁ / a = ${primaryVoltage.value} / ${turnsRatio.value.toFixed(4)} = ${calcV2.toFixed(2)}V`)
  }
  
  if (secondaryVoltage.value && turnsRatio.value) {
    const calcI2 = (primaryVoltage.value || 0) / turnsRatio.value / (secondaryImpedance.value || 1)
    steps.push(`Calculate secondary current: I₂ = V₂ / Z₂ = ${secondaryVoltage.value} / ${(secondaryImpedance.value || 1).toFixed(2)} = ${calcI2.toFixed(2)}A`)
  }
  
  if (primaryPower.value !== null) {
    steps.push(`Calculate primary power: P₁ = V₁ × I₁ = ${primaryPower.value.toFixed(2)} VA`)
  }
  
  if (secondaryImpedance.value && turnsRatio.value) {
    const refZ = secondaryImpedance.value / (turnsRatio.value ** 2)
    steps.push(`Calculate reflected impedance: Z₂' = Z₂ / a² = ${secondaryImpedance.value} / ${turnsRatio.value.toFixed(4)}² = ${refZ.toFixed(2)} Ω`)
  }
  
  if (steps.length === 0) {
    steps.push('Enter values in any field to see calculation steps')
  }
  
  return steps
})

// Methods
const setPreset = (preset) => {
  switch (preset) {
    case 'step-down':
      primaryVoltage.value = 230
      primaryCurrent.value = 0.5
      primaryTurns.value = 2300
      secondaryVoltage.value = 12
      secondaryTurns.value = 120
      secondaryCurrent.value = null
      secondaryImpedance.value = null
      primaryImpedance.value = null
      break
    case 'step-up':
      primaryVoltage.value = 12
      primaryCurrent.value = 10
      primaryTurns.value = 120
      secondaryVoltage.value = 230
      secondaryTurns.value = 2300
      secondaryCurrent.value = null
      secondaryImpedance.value = null
      primaryImpedance.value = null
      break
    case 'isolation':
      primaryVoltage.value = 120
      primaryCurrent.value = 2
      primaryTurns.value = 500
      secondaryVoltage.value = 120
      secondaryTurns.value = 500
      secondaryCurrent.value = null
      secondaryImpedance.value = null
      primaryImpedance.value = null
      break
    case 'impedance-match':
      primaryVoltage.value = null
      primaryCurrent.value = null
      primaryTurns.value = 20
      secondaryTurns.value = 40
      primaryImpedance.value = 600
      secondaryImpedance.value = 2400
      secondaryVoltage.value = null
      secondaryCurrent.value = null
      break
  }
}

const clearAll = () => {
  primaryVoltage.value = null
  primaryCurrent.value = null
  primaryTurns.value = null
  primaryImpedance.value = null
  secondaryVoltage.value = null
  secondaryCurrent.value = null
  secondaryTurns.value = null
  secondaryImpedance.value = null
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
}

.core {
  animation: coreGlow 3s ease-in-out infinite;
}

@keyframes coreGlow {
  0%, 100% {
    stroke-width: 2;
    opacity: 1;
  }
  50% {
    stroke-width: 2.5;
    opacity: 0.9;
  }
}

.primary-coil ellipse,
.secondary-coil ellipse {
  transition: all 0.3s ease;
}

.primary-coil ellipse:hover,
.secondary-coil ellipse:hover {
  stroke-width: 3;
  filter: drop-shadow(0 0 3px currentColor);
}
</style>

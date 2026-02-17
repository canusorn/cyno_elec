<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']"
  >
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <LightBulbIcon class="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Power Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate electrical power using voltage and current
          </p>
          
          <!-- Animated Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg">
            <div class="animated-formula">
              <span class="formula-part" :class="{ 'highlight': highlightedVar === 'power' }">P</span>
              <span class="formula-operator">=</span>
              <span class="formula-part" :class="{ 'highlight': highlightedVar === 'voltage' }">V</span>
              <span class="formula-operator">×</span>
              <span class="formula-part" :class="{ 'highlight': highlightedVar === 'current' }">I</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- LEFT COLUMN: Interactive Circuit & Inputs -->
          <div class="space-y-6">
            
            <!-- Interactive Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>⚡</span>
                <span>Power Circuit Diagram</span>
              </h3>
              
              <!-- Power Circuit SVG -->
              <svg viewBox="0 0 600 300" class="w-full h-auto" :class="{ 'dark-mode': colorMode === 'dark' }">
                <defs>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="bulbGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" :stop-color="bulbColor1" />
                    <stop offset="100%" :stop-color="bulbColor2" />
                  </linearGradient>
                </defs>
                
                <!-- Background -->
                <rect width="600" height="300" fill="rgba(255,255,255,0.05)" rx="8"/>
                
                <!-- Wires -->
                <line x1="100" y1="100" x2="300" y2="100" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="100" y1="200" x2="300" y2="200" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="400" y1="100" x2="500" y2="100" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="400" y1="200" x2="500" y2="200" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="100" y1="100" x2="100" y2="200" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="500" y1="100" x2="500" y2="200" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
                
                <!-- Voltage Source -->
                <circle cx="100" cy="150" r="40" fill="white" :stroke="voltageColor" stroke-width="3"/>
                <line x1="85" y1="140" x2="115" y2="140" :stroke="voltageColor" stroke-width="4"/>
                <line x1="90" y1="160" x2="110" y2="160" :stroke="voltageColor" stroke-width="2"/>
                <text x="100" y="190" text-anchor="middle" :font-size="12" font-weight="bold" :fill="voltageColor">
                  {{ displayVoltage }}V
                </text>
                
                <!-- Load (Light bulb representation) -->
                <g @click="highlightedVar = 'power'; setTimeout(() => highlightedVar = null, 1000)" class="cursor-pointer">
                  <circle cx="350" cy="150" r="50" fill="white" :stroke="bulbStrokeColor" stroke-width="4"/>
                  <circle cx="350" cy="150" r="40" :fill="bulbFillColor" opacity="0.8"/>
                  <!-- Filament -->
                  <path d="M330,135 L370,165 M330,165 L370,135" :stroke="filamentColor" stroke-width="3" stroke-linecap="round"/>
                  
                  <!-- Power waves animation -->
                  <g v-if="displayPower > 0">
                    <circle cx="350" cy="150" r="55" fill="none" :stroke="bulbStrokeColor" stroke-width="2" opacity="0.6">
                      <animate attributeName="r" values="55;75;55" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                  
                  <text x="350" y="220" text-anchor="middle" :font-size="12" font-weight="bold" :fill="bulbStrokeColor">
                    Load
                  </text>
                </g>
                
                <!-- Current flow electrons -->
                <g v-if="showCurrentAnimation">
                  <circle 
                    v-for="electron in electrons" 
                    :key="electron.id"
                    :r="electronRadius"
                    :fill="electronColor"
                    filter="url(#glow2)"
                  >
                    <animateMotion
                      :dur="animationDuration"
                      :begin="electron.delay"
                      repeatCount="indefinite"
                      path="M 100 100 L 300 100 L 300 150 L 400 150 L 400 200 L 100 200 L 100 100"
                    />
                  </circle>
                </g>
                
                <!-- Current label -->
                <text x="200" y="80" text-anchor="middle" :font-size="12" font-weight="bold" :fill="currentColor">
                  I = {{ currentLabel }}
                </text>
                
                <!-- Power display -->
                <g class="power-indicator">
                  <rect x="420" y="130" width="130" height="40" rx="8" :fill="powerBgColor" opacity="0.95"/>
                  <text x="485" y="155" text-anchor="middle" :font-size="14" font-weight="bold" :fill="powerTextColor">
                    ⚡ P = {{ displayPower }}W
                  </text>
                </g>
              </svg>
            </div>

            <!-- Input Sliders -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>🎛️</span>
                <span>Input Controls</span>
              </h3>
              
              <div class="space-y-6">
                <!-- Voltage Slider -->
                <SliderInput
                  v-model="inputs.voltage"
                  label="Voltage"
                  unit="V"
                  icon="🔋"
                  :min="0"
                  :max="240"
                  :step="0.1"
                  min-label="0V"
                  max-label="240V"
                  mid-label="120V"
                  slider-color="blue"
                  :is-dark="colorMode === 'dark'"
                  :format-decimals="2"
                  :presets="voltagePresets"
                  :show-number-input="true"
                  @input="onVoltageInput"
                />
                
                <!-- Current Slider -->
                <SliderInput
                  v-model="inputs.current"
                  label="Current"
                  unit="A"
                  icon="⚡"
                  :min="0"
                  :max="20"
                  :step="0.01"
                  min-label="0A"
                  max-label="20A"
                  mid-label="10A"
                  slider-color="orange"
                  :is-dark="colorMode === 'dark'"
                  :format-decimals="3"
                  :presets="currentPresets"
                  :show-number-input="true"
                  @input="onCurrentInput"
                />
                
                <!-- Power Slider (calculated) -->
                <SliderInput
                  v-model="inputs.power"
                  label="Power"
                  unit="W"
                  icon="⚡"
                  :min="0"
                  :max="5000"
                  :step="0.1"
                  min-label="0W"
                  max-label="5kW"
                  mid-label="1kW"
                  slider-color="yellow"
                  :is-dark="colorMode === 'dark'"
                  :format-decimals="2"
                  :presets="powerPresets"
                  :show-number-input="true"
                  @input="onPowerInput"
                />
              </div>
              
              <!-- Quick Actions -->
              <div class="mt-6 flex flex-wrap gap-2">
                <button 
                  @click="resetInputs" 
                  class="action-btn-secondary"
                  type="button"
                >
                  🔄 Reset All
                </button>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: Results & Calculations -->
          <div class="space-y-6">
            
            <!-- Main Result Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>📊</span>
                <span>Calculated Result</span>
              </h3>
              
              <div class="result-card">
                <div class="result-label">{{ calculatedVariable.label }}</div>
                <div class="result-value-wrapper">
                  <div class="result-value" :class="resultValueClass">
                    {{ calculatedVariable.value !== null ? calculatedVariable.value : '---' }}
                  </div>
                  <div class="result-unit">{{ calculatedVariable.unit }}</div>
                </div>
                
                <!-- Additional Info -->
                <div v-if="calculatedVariable.value !== null" class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="text-sm text-gray-600 dark:text-gray-300">
                    {{ calculatedVariable.formula }}
                  </div>
                </div>
              </div>
              
              <!-- Status Message -->
              <div class="mt-4 text-center">
                <div v-if="calculatedVariable.value === null && hasAnyInput" class="status-message info">
                  <span class="icon">ℹ️</span>
                  <span>Enter any two values to calculate the third</span>
                </div>
                <div v-else-if="calculatedVariable.value !== null" class="status-message success">
                  <span class="icon">✅</span>
                  <span>Calculation complete!</span>
                </div>
              </div>
            </div>

            <!-- Calculation Steps -->
            <CalculationSteps
              v-if="calculatedVariable.value !== null"
              :formula="formula"
              :steps="calculationSteps"
              :final-result="finalResultText"
              :show-comparison="showComparison"
              :previous-value="previousResult"
              :current-value="calculatedVariable.value + ' ' + calculatedVariable.unit"
              :is-dark="colorMode === 'dark'"
            />

            <!-- Theory & Tips -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>📚</span>
                <span>Power Law Theory</span>
              </h3>
              
              <div class="theory-content">
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  Electrical power (P) is the rate at which electrical energy is transferred by an electric circuit. It's calculated using the formula: P = V × I
                </p>
                
                <div class="formula-grid">
                  <div class="formula-item">
                    <div class="formula-title">Power</div>
                    <div class="formula-eq">P = V × I</div>
                    <div class="formula-desc">Watts (W)</div>
                  </div>
                  <div class="formula-item">
                    <div class="formula-title">Voltage</div>
                    <div class="formula-eq">V = P ÷ I</div>
                    <div class="formula-desc">Volts (V)</div>
                  </div>
                  <div class="formula-item">
                    <div class="formula-title">Current</div>
                    <div class="formula-eq">I = P ÷ V</div>
                    <div class="formula-desc">Amperes (A)</div>
                  </div>
                </div>
                
                <div class="tips-box mt-4">
                  <div class="tips-title">💡 Quick Tips:</div>
                  <ul class="tips-list">
                    <li>Higher voltage = More power (for same current)</li>
                    <li>Higher current = More power (for same voltage)</li>
                    <li>Power is measured in Watts (W)</li>
                    <li>1 kW = 1000 W (kilowatt)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { LightBulbIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'
import SliderInput from '~/components/SliderInput.vue'
import CalculationSteps from '~/components/CalculationSteps.vue'

// SEO
useHead({
  title: 'Power Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate electrical power using voltage and current (P = V × I). Professional electrical engineering calculator.' },
    { name: 'keywords', content: 'power calculator, electrical power, watt calculator, voltage current calculator' }
  ]
})

// Color mode
const colorMode = useColorMode()

// Input state
const inputs = ref({
  voltage: null as number | null,
  current: null as number | null,
  power: null as number | null
})

// UI state
const highlightedVar = ref<string | null>(null)
const previousResult = ref<string>('')
const showComparison = ref(false)

// Presets
const voltagePresets = [
  { label: '1.5V', value: 1.5 },
  { label: '5V', value: 5 },
  { label: '12V', value: 12 },
  { label: '24V', value: 24 },
  { label: '120V', value: 120 },
  { label: '240V', value: 240 }
]

const currentPresets = [
  { label: '100mA', value: 0.1 },
  { label: '500mA', value: 0.5 },
  { label: '1A', value: 1 },
  { label: '2A', value: 2 },
  { label: '5A', value: 5 }
]

const powerPresets = [
  { label: '1W', value: 1 },
  { label: '10W', value: 10 },
  { label: '60W', value: 60 },
  { label: '100W', value: 100 },
  { label: '500W', value: 500 },
  { label: '1kW', value: 1000 }
]

// Display values
const displayVoltage = computed(() => inputs.value.voltage || 0)
const displayCurrent = computed(() => inputs.value.current || 0)
const displayPower = computed(() => inputs.value.power || 0)

const currentLabel = computed(() => {
  const i = inputs.value.current || 0
  return i < 0.001 ? '0A' : i < 1 ? `${(i * 1000).toFixed(0)}mA` : `${i.toFixed(2)}A`
})

const showCurrentAnimation = computed(() => (inputs.value.current || 0) > 0)

// Circuit colors based on values
const voltageColor = computed(() => {
  const v = inputs.value.voltage || 0
  if (v < 12) return '#22C55E'
  if (v < 120) return '#3B82F6'
  return '#EF4444'
})

const currentColor = computed(() => {
  const i = inputs.value.current || 0
  if (i < 1) return '#22C55E'
  if (i < 5) return '#F59E0B'
  return '#EF4444'
})

const electronColor = computed(() => currentColor.value)
const wireColor = computed(() => {
  const i = inputs.value.current || 0
  return i > 0 ? '#94A3B8' : '#6B7280'
})

const bulbColor1 = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#FEF3C7'
  if (p < 100) return '#FDE68A'
  return '#FCD34D'
})

const bulbColor2 = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#FDE68A'
  if (p < 100) return '#FCD34D'
  return '#FBBF24'
})

const bulbStrokeColor = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#F59E0B'
  if (p < 100) return '#D97706'
  return '#B45309'
})

const bulbFillColor = computed(() => {
  const p = inputs.value.power || 0
  const intensity = Math.min(p / 100, 1)
  return p < 10 ? '#FEF3C7' : `rgba(253, 230, 138, ${0.3 + intensity * 0.5})`
})

const filamentColor = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#92400E'
  if (p < 100) return '#78350F'
  return '#451A03'
})

const powerBgColor = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#D1FAE5'
  if (p < 100) return '#FEF3C7'
  if (p < 500) return '#FED7AA'
  return '#FEE2E2'
})

const powerTextColor = computed(() => {
  const p = inputs.value.power || 0
  if (p < 10) return '#065F46'
  if (p < 100) return '#92400E'
  if (p < 500) return '#9A3412'
  return '#991B1B'
})

// Animation
const animationDuration = computed(() => {
  const current = inputs.value.current || 0.1
  const baseDuration = 4
  return `${baseDuration / Math.max(0.1, Math.sqrt(current))}s`
})

const electronRadius = computed(() => {
  const current = inputs.value.current || 0
  return Math.min(6, 3 + current)
})

const electrons = computed(() => {
  const count = Math.min(8, Math.max(3, Math.ceil((inputs.value.current || 0) * 2)))
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: `${(i * 100) / count}%`
  }))
})

// Computed: Check for valid inputs
const hasValidNumber = (val: number | null): boolean => {
  return val !== null && val !== '' && !isNaN(val) && isFinite(val)
}

const hasAnyInput = computed(() => {
  return hasValidNumber(inputs.value.voltage) ||
         hasValidNumber(inputs.value.current) ||
         hasValidNumber(inputs.value.power)
})

// Computed: Calculate the missing variable
const calculatedVariable = computed(() => {
  const { voltage, current, power } = inputs.value
  const hasVoltage = hasValidNumber(voltage)
  const hasCurrent = hasValidNumber(current)
  const hasPower = hasValidNumber(power)
  
  // Calculate power when voltage and current are provided
  if (hasVoltage && hasCurrent && !hasPower) {
    const calculatedPower = voltage! * current!
    return {
      label: 'Power (P)',
      value: calculatedPower.toFixed(4),
      unit: 'W',
      formula: `P = ${voltage}V × ${current}A = ${calculatedPower.toFixed(4)}W`,
      variable: 'power'
    }
  }
  
  // Calculate voltage when power and current are provided
  if (hasPower && hasCurrent && !hasVoltage) {
    const calculatedVoltage = power! / current!
    return {
      label: 'Voltage (V)',
      value: calculatedVoltage.toFixed(4),
      unit: 'V',
      formula: `V = ${power}W ÷ ${current}A = ${calculatedVoltage.toFixed(4)}V`,
      variable: 'voltage'
    }
  }
  
  // Calculate current when power and voltage are provided
  if (hasPower && hasVoltage && !hasCurrent) {
    const calculatedCurrent = power! / voltage!
    return {
      label: 'Current (I)',
      value: calculatedCurrent.toFixed(4),
      unit: 'A',
      formula: `I = ${power}W ÷ ${voltage}V = ${calculatedCurrent.toFixed(4)}A`,
      variable: 'current'
    }
  }
  
  return {
    label: 'Result',
    value: null,
    unit: '',
    formula: '',
    variable: null
  }
})

// Computed: Formula and steps
const formula = computed(() => calculatedVariable.value.formula)

const calculationSteps = computed(() => {
  const { voltage, current, power } = inputs.value
  const result = calculatedVariable.value
  
  if (result.value === null) return []
  
  const steps = []
  
  // Step 1: Identify known values
  const knownValues = []
  if (hasValidNumber(voltage)) knownValues.push(`V = ${voltage}V`)
  if (hasValidNumber(current)) knownValues.push(`I = ${current}A`)
  if (hasValidNumber(power)) knownValues.push(`P = ${power}W`)
  
  steps.push({
    description: 'Identify known values',
    calculation: knownValues.join(', '),
    note: 'We have two known values, need to find the third'
  })
  
  // Step 2: Show formula
  steps.push({
    description: 'Apply Power Law formula',
    calculation: result.formula,
    note: 'The relationship between power, voltage, and current'
  })
  
  // Step 3: Show calculation
  if (result.variable === 'power') {
    steps.push({
      description: 'Substitute values and calculate',
      calculation: `P = ${voltage} × ${current}`,
      result: `${result.value}W`
    })
  } else if (result.variable === 'voltage') {
    steps.push({
      description: 'Substitute values and calculate',
      calculation: `V = ${power} ÷ ${current}`,
      result: `${result.value}V`
    })
  } else if (result.variable === 'current') {
    steps.push({
      description: 'Substitute values and calculate',
      calculation: `I = ${power} ÷ ${voltage}`,
      result: `${result.value}A`
    })
  }
  
  return steps
})

const finalResultText = computed(() => {
  const result = calculatedVariable.value
  if (result.value === null) return ''
  return `${result.label} = ${result.value} ${result.unit}`
})

const resultValueClass = computed(() => {
  const result = calculatedVariable.value
  if (!result.variable) return ''
  
  const classMap = {
    power: 'text-yellow-600 dark:text-yellow-400',
    voltage: 'text-blue-600 dark:text-blue-400',
    current: 'text-orange-600 dark:text-orange-400'
  }
  
  return classMap[result.variable] || 'text-primary'
})

// Input handlers
const onVoltageInput = () => {
  highlightedVar.value = 'voltage'
  setTimeout(() => highlightedVar.value = null, 1000)
}

const onCurrentInput = () => {
  highlightedVar.value = 'current'
  setTimeout(() => highlightedVar.value = null, 1000)
}

const onPowerInput = () => {
  highlightedVar.value = 'power'
  setTimeout(() => highlightedVar.value = null, 1000)
}

// Actions
const resetInputs = () => {
  inputs.value = { voltage: null, current: null, power: null }
  previousResult.value = ''
  showComparison.value = false
}

// Watch for result changes
watch(() => calculatedVariable.value.value, (newValue, oldValue) => {
  if (oldValue !== null && newValue !== null && newValue !== oldValue) {
    previousResult.value = `${oldValue} ${calculatedVariable.value.unit}`
    showComparison.value = true
  }
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

/* Animated Formula */
.animated-formula {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.formula-part {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.formula-part.highlight {
  background-color: var(--tw-color-primary);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(159, 168, 218, 0.5);
}

.formula-operator {
  color: var(--tw-color-primary);
  font-size: 1.5rem;
}

/* Result Card */
.result-card {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(159, 168, 218, 0.1) 0%, rgba(121, 134, 203, 0.1) 100%);
  border-radius: 1rem;
  border: 2px solid rgba(159, 168, 218, 0.2);
}

.result-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.dark-mode .result-label {
  color: #9CA3AF;
}

.result-value-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.result-value {
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
}

.result-unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6B7280;
}

.dark-mode .result-unit {
  color: #9CA3AF;
}

/* Status Messages */
.status-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.status-message.info {
  background: rgba(59, 130, 246, 0.1);
  color: #1D4ED8;
}

.status-message.success {
  background: rgba(16, 185, 129, 0.1);
  color: #065F46;
}

/* Action Buttons */
.action-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode .action-btn-secondary {
  color: #9CA3AF;
  background: rgba(55, 65, 81, 0.5);
  border-color: #4B5563;
}

.action-btn-secondary:hover {
  border-color: var(--tw-color-primary);
  color: var(--tw-color-primary);
  transform: translateY(-1px);
}

/* Theory Content */
.theory-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.formula-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.formula-item {
  padding: 0.75rem;
  background: rgba(159, 168, 218, 0.1);
  border-radius: 0.5rem;
  text-align: center;
}

.dark-mode .formula-item {
  background: rgba(159, 168, 218, 0.05);
}

.formula-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.dark-mode .formula-title {
  color: #9CA3AF;
}

.formula-eq {
  font-size: 1.125rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: #4338CA;
}

.dark-mode .formula-eq {
  color: #A5B4FC;
}

.formula-desc {
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 0.25rem;
}

.dark-mode .formula-desc {
  color: #9CA3AF;
}

/* Tips Box */
.tips-box {
  padding: 1rem;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-radius: 0.75rem;
  border: 1px solid #F59E0B;
}

.dark-mode .tips-box {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
  border-color: #FBBF24;
}

.tips-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 0.5rem;
}

.dark-mode .tips-title {
  color: #FCD34D;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  font-size: 0.875rem;
  color: #78350F;
  padding-left: 1.25rem;
  position: relative;
  margin-bottom: 0.25rem;
}

.dark-mode .tips-list li {
  color: #FDE68A;
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0.5rem;
  color: #F59E0B;
}

/* Responsive */
@media (max-width: 1024px) {
  .formula-grid {
    grid-template-columns: 1fr;
  }
  
  .result-value {
    font-size: 2.5rem;
  }
}

@media (max-width: 640px) {
  .result-value {
    font-size: 2rem;
  }
  
  .result-unit {
    font-size: 1.25rem;
  }
  
  .animated-formula {
    font-size: 1.5rem;
  }
}
</style>

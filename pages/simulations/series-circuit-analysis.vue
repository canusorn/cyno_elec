<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Series Circuit Analysis</h1>
      <p class="text-gray-400">Interactive exploration of series circuits with multiple resistors</p>
    </div>

    <!-- Main Controls -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 class="text-2xl font-semibold text-white">Circuit Configuration</h2>
        <div class="flex gap-2">
          <button
            @click="addResistor"
            class="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition-colors"
          >
            + Add Resistor
          </button>
          <button
            @click="removeResistor"
            :disabled="resistors.length <= 2"
            class="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
          >
            - Remove Resistor
          </button>
        </div>
      </div>

      <!-- Voltage Source Control -->
      <div class="mb-6 bg-gray-900 rounded-lg p-4">
        <label class="text-white font-medium mb-2 block">Source Voltage (V)</label>
        <div class="flex items-center gap-4">
          <input
            v-model.number="voltage"
            type="range"
            min="1"
            max="120"
            step="1"
            class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <input
            v-model.number="voltage"
            type="number"
            min="1"
            max="120"
            class="w-24 bg-gray-700 text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span class="text-gray-400">V</span>
        </div>
      </div>

      <!-- Resistor Controls -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(resistor, index) in resistors"
          :key="index"
          class="bg-gray-900 rounded-lg p-4 border-2"
          :class="getResistorColorClass(index)"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-medium text-white">R{{ index + 1 }}</h3>
            <span class="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
              {{ getResistorColorCode(resistor.value) }}
            </span>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="text-gray-400 text-sm">Resistance (Ω)</label>
              <div class="flex items-center gap-2 mt-1">
                <input
                  v-model.number="resistor.value"
                  type="range"
                  min="1"
                  max="10000"
                  step="10"
                  class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="resistor.value"
                  type="number"
                  min="1"
                  max="10000"
                  class="w-20 bg-gray-700 text-white rounded px-2 py-1 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <!-- Voltage Drop -->
            <div class="bg-gray-800 rounded p-2">
              <p class="text-gray-400 text-xs">Voltage Drop</p>
              <p class="text-white font-mono">{{ formatValue(voltageDrops[index]) }} V</p>
            </div>
            
            <!-- Power Dissipation -->
            <div class="bg-gray-800 rounded p-2">
              <p class="text-gray-400 text-xs">Power Dissipation</p>
              <p class="text-white font-mono">{{ formatValue(powerDissipation[index]) }} W</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Circuit Diagram</h2>
      <div class="bg-gray-900 rounded-lg p-6 overflow-x-auto">
        <svg viewBox="0 0 900 350" class="w-full h-auto" style="min-width: 600px;">
          <!-- Background grid -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5"/>
            </pattern>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#34D399" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <!-- Main circuit path -->
          <g class="circuit-path">
            <!-- Wire from voltage source to first resistor -->
            <line x1="150" y1="175" x2="250" y2="175" stroke="#60A5FA" stroke-width="3" />
            
            <!-- Resistor connections -->
            <line x1="350" y1="175" x2="400" y2="175" stroke="#60A5FA" stroke-width="3" />
            <line x1="500" y1="175" x2="550" y2="175" stroke="#60A5FA" stroke-width="3" />
            <line x1="650" y1="175" x2="700" y2="175" stroke="#60A5FA" stroke-width="3" />
            
            <!-- Return wire -->
            <line x1="800" y1="175" x2="850" y2="175" stroke="#60A5FA" stroke-width="3" />
            <line x1="850" y1="175" x2="850" y2="275" stroke="#60A5FA" stroke-width="3" />
            <line x1="850" y1="275" x2="150" y2="275" stroke="#60A5FA" stroke-width="3" />
            <line x1="150" y1="275" x2="150" y2="225" stroke="#60A5FA" stroke-width="3" />
          </g>
          
          <!-- Voltage Source -->
          <g transform="translate(150, 200)">
            <circle cx="0" cy="0" r="25" fill="#1F2937" stroke="#60A5FA" stroke-width="2" />
            <text x="0" y="5" text-anchor="middle" fill="#60A5FA" font-size="20" font-weight="bold">V</text>
            <text x="0" y="45" text-anchor="middle" fill="#60A5FA" font-size="14">{{ voltage }}V</text>
            <line x1="0" y1="-25" x2="0" y2="-50" stroke="#60A5FA" stroke-width="3" />
            <line x1="0" y1="25" x2="0" y2="50" stroke="#60A5FA" stroke-width="3" />
          </g>
          
          <!-- Current indicator -->
          <g transform="translate(50, 175)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#34D399" stroke-width="2" marker-end="url(#arrowhead-green)" />
            <text x="30" y="-10" text-anchor="middle" fill="#34D399" font-size="14" font-weight="bold">
              I = {{ formatValue(totalCurrent) }}A
            </text>
          </g>
          
          <!-- Resistors -->
          <g v-for="(resistor, index) in resistors" :key="'resistor-' + index">
            <g :transform="`translate(${300 + index * 150}, 175)`">
              <!-- Resistor zigzag -->
              <path
                d="M -50 0 L -40 0 L -35 -15 L -25 15 L -15 -15 L -5 15 L 5 -15 L 15 15 L 25 -15 L 35 15 L 40 0 L 50 0"
                fill="none"
                :stroke="getResistorColor(index)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Resistor label -->
              <text x="0" y="-30" text-anchor="middle" :fill="getResistorColor(index)" font-size="16" font-weight="bold">
                R{{ index + 1 }}
              </text>
              <text x="0" y="40" text-anchor="middle" :fill="getResistorColor(index)" font-size="14">
                {{ formatValue(resistor.value) }}Ω
              </text>
              
              <!-- Voltage drop indicator -->
              <text x="0" y="60" text-anchor="middle" fill="#9CA3AF" font-size="12">
                V{{ index + 1 }} = {{ formatValue(voltageDrops[index]) }}V
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- Analysis Results -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Total Circuit Values -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Total Circuit Values</h2>
        <div class="space-y-3">
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Total Resistance (R_total)</p>
            <p class="text-3xl font-bold text-blue-400 font-mono">{{ formatValue(totalResistance) }} Ω</p>
            <p class="text-gray-500 text-xs mt-1">R_total = R1 + R2 + ... + Rn</p>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Total Current (I)</p>
            <p class="text-3xl font-bold text-green-400 font-mono">{{ formatValue(totalCurrent) }} A</p>
            <p class="text-gray-500 text-xs mt-1">I = V_source / R_total</p>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm">Total Power (P_total)</p>
            <p class="text-3xl font-bold text-yellow-400 font-mono">{{ formatValue(totalPower) }} W</p>
            <p class="text-gray-500 text-xs mt-1">P_total = V_source × I</p>
          </div>
        </div>
      </div>

      <!-- Voltage Distribution -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white mb-4">Voltage Distribution</h2>
        <div class="space-y-3">
          <div
            v-for="(drop, index) in voltageDrops"
            :key="'voltage-' + index"
            class="bg-gray-900 rounded-lg p-4"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-white font-medium">R{{ index + 1 }} Voltage Drop</span>
              <span class="text-white font-mono">{{ formatValue(drop) }} V</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-4">
              <div
                class="h-4 rounded-full transition-all duration-300"
                :class="getProgressBarClass(index)"
                :style="{ width: (drop / voltage * 100) + '%' }"
              ></div>
            </div>
            <p class="text-gray-500 text-xs mt-1">
              {{ formatValue((drop / voltage) * 100) }}% of source voltage
            </p>
          </div>
          
          <div class="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-700">
            <p class="text-blue-400 font-medium text-center">
              Σ V_drops = {{ formatValue(voltageDrops.reduce((a, b) => a + b, 0)) }} V = V_source ✓
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Power Distribution Chart -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Power Distribution</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div
          v-for="(power, index) in powerDissipation"
          :key="'power-' + index"
          class="bg-gray-900 rounded-lg p-4 text-center"
        >
          <h3 class="text-lg font-medium text-white mb-2">R{{ index + 1 }}</h3>
          <div class="relative h-40 flex items-end justify-center">
            <div
              class="w-full rounded-t transition-all duration-300"
              :class="getPowerBarClass(index)"
              :style="{ height: Math.min((power / Math.max(...powerDissipation)) * 100, 100) + '%' }"
            ></div>
          </div>
          <p class="text-white font-mono mt-2">{{ formatValue(power) }} W</p>
          <p class="text-gray-500 text-xs">{{ formatValue((power / totalPower) * 100) }}% of total</p>
        </div>
      </div>
    </div>

    <!-- Kirchhoff's Laws Verification -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Kirchhoff's Laws Verification</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- KVL -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-blue-400 mb-3">Kirchhoff's Voltage Law (KVL)</h3>
          <p class="text-gray-300 mb-3">The sum of voltage drops around a closed loop equals the source voltage.</p>
          <div class="bg-gray-800 rounded p-3 font-mono text-sm">
            <p class="text-green-400">V_source = V_R1 + V_R2 + ... + V_Rn</p>
            <p class="text-white mt-2">{{ voltage }}V = {{ voltageDrops.map((v, i) => `V_R${i + 1}(${formatValue(v)}V)`).join(' + ') }}</p>
            <p class="text-white mt-2">{{ voltage }}V ≈ {{ formatValue(voltageDrops.reduce((a, b) => a + b, 0)) }}V ✓</p>
          </div>
        </div>
        
        <!-- Current is same everywhere -->
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-green-400 mb-3">Series Current</h3>
          <p class="text-gray-300 mb-3">In a series circuit, current is the same through all components.</p>
          <div class="bg-gray-800 rounded p-3 font-mono text-sm">
            <p class="text-green-400">I_total = I_R1 = I_R2 = ... = I_Rn</p>
            <p class="text-white mt-2">{{ formatValue(totalCurrent) }}A flows through every resistor</p>
            <p class="text-gray-400 mt-2 text-xs">Current depends only on total resistance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Preset Configurations -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Preset Configurations</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          @click="applyPreset('equal')"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105"
        >
          <h3 class="font-bold mb-1">Equal Resistors</h3>
          <p class="text-sm opacity-90">3 × 100Ω</p>
        </button>
        
        <button
          @click="applyPreset('voltage-divider')"
          class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105"
        >
          <h3 class="font-bold mb-1">Voltage Divider</h3>
          <p class="text-sm opacity-90">1kΩ + 2kΩ + 3kΩ</p>
        </button>
        
        <button
          @click="applyPreset('high-power')"
          class="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105"
        >
          <h3 class="font-bold mb-1">High Power</h3>
          <p class="text-sm opacity-90">Low resistance</p>
        </button>
        
        <button
          @click="applyPreset('unbalanced')"
          class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg p-4 transition-all duration-200 transform hover:scale-105"
        >
          <h3 class="font-bold mb-1">Unbalanced</h3>
          <p class="text-sm opacity-90">Mixed values</p>
        </button>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Understanding Series Circuits</h2>
      
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-yellow-400 mb-2">What is a Series Circuit?</h3>
          <p class="text-gray-300">
            In a series circuit, components are connected end-to-end in a single path. Electric current flows 
            through each component sequentially. There's only one path for current to flow.
          </p>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-blue-400 mb-2">Key Characteristics</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Same Current:</strong> Current is identical through all components (I = I₁ = I₂ = ... = Iₙ)</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Added Resistance:</strong> Total resistance is the sum of individual resistances (R_total = R₁ + R₂ + ... + Rₙ)</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Voltage Division:</strong> Source voltage divides among components proportional to their resistance</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>KVL Applies:</strong> Sum of voltage drops equals source voltage (KVL)</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-green-400 mb-2">Formulas</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-gray-800 rounded p-3">
              <p class="text-gray-400 mb-1">Total Resistance:</p>
              <p class="text-white font-mono">R_total = R₁ + R₂ + ... + Rₙ</p>
            </div>
            <div class="bg-gray-800 rounded p-3">
              <p class="text-gray-400 mb-1">Total Current (Ohm's Law):</p>
              <p class="text-white font-mono">I = V_source / R_total</p>
            </div>
            <div class="bg-gray-800 rounded p-3">
              <p class="text-gray-400 mb-1">Voltage Drop:</p>
              <p class="text-white font-mono">V_R = I × R</p>
            </div>
            <div class="bg-gray-800 rounded p-3">
              <p class="text-gray-400 mb-1">Power Dissipation:</p>
              <p class="text-white font-mono">P = I² × R = V_R × I</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-purple-400 mb-2">Practical Applications</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <span class="text-purple-400 mr-2">•</span>
              <span><strong>Voltage Dividers:</strong> Creating reference voltages from a higher source</span>
            </li>
            <li class="flex items-start">
              <span class="text-purple-400 mr-2">•</span>
              <span><strong>Battery Packs:</strong> Multiple cells connected in series for higher voltage</span>
            </li>
            <li class="flex items-start">
              <span class="text-purple-400 mr-2">•</span>
              <span><strong>LED Strings:</strong> Multiple LEDs with current-limiting resistor</span>
            </li>
            <li class="flex items-start">
              <span class="text-purple-400 mr-2">•</span>
              <span><strong>Fuse Protection:</strong> Series fuse protects the entire circuit</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-red-400 mb-2">Limitations & Considerations</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <span class="text-red-400 mr-2">•</span>
              <span><strong>Single Point of Failure:</strong> If one component fails open, entire circuit stops working</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">•</span>
              <span><strong>Higher Resistance:</strong> Adding components increases total resistance, reducing current</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">•</span>
              <span><strong>Voltage Reduction:</strong> Each component drops voltage, leaving less for later components</span>
            </li>
            <li class="flex items-start">
              <span class="text-red-400 mr-2">•</span>
              <span><strong>Not Independent:</strong> Changing one component affects all others</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Circuit parameters
const voltage = ref(12)
const resistors = ref([
  { value: 100 },
  { value: 220 },
  { value: 330 }
])

// Color classes for resistors
const resistorColors = [
  { border: 'border-red-500', bar: 'bg-red-500', text: '#EF4444' },
  { border: 'border-blue-500', bar: 'bg-blue-500', text: '#3B82F6' },
  { border: 'border-green-500', bar: 'bg-green-500', text: '#10B981' },
  { border: 'border-yellow-500', bar: 'bg-yellow-500', text: '#F59E0B' },
  { border: 'border-purple-500', bar: 'bg-purple-500', text: '#8B5CF6' }
]

// Calculate total resistance
const totalResistance = computed(() => {
  return resistors.value.reduce((sum, r) => sum + r.value, 0)
})

// Calculate total current (Ohm's law)
const totalCurrent = computed(() => {
  return voltage.value / totalResistance.value
})

// Calculate voltage drops across each resistor
const voltageDrops = computed(() => {
  return resistors.value.map(r => totalCurrent.value * r.value)
})

// Calculate power dissipation for each resistor
const powerDissipation = computed(() => {
  return resistors.value.map(r => {
    const current = totalCurrent.value
    return current * current * r // P = I²R
  })
})

// Calculate total power
const totalPower = computed(() => {
  return voltage.value * totalCurrent.value
})

// Add a new resistor
const addResistor = () => {
  if (resistors.value.length < 5) {
    resistors.value.push({ value: 100 })
  }
}

// Remove the last resistor
const removeResistor = () => {
  if (resistors.value.length > 2) {
    resistors.value.pop()
  }
}

// Get resistor color class
const getResistorColorClass = (index) => {
  const colorIndex = index % resistorColors.length
  return resistorColors[colorIndex].border
}

// Get resistor color for SVG
const getResistorColor = (index) => {
  const colorIndex = index % resistorColors.length
  return resistorColors[colorIndex].text
}

// Get progress bar class
const getProgressBarClass = (index) => {
  const colorIndex = index % resistorColors.length
  return resistorColors[colorIndex].bar
}

// Get power bar class
const getPowerBarClass = (index) => {
  const colorIndex = index % resistorColors.length
  return `bg-gradient-to-t ${resistorColors[colorIndex].bar.replace('bg-', 'from-')} to-transparent`
}

// Get resistor color code (simplified)
const getResistorColorCode = (value) => {
  // Simplified color code for display
  const colors = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White']
  const digits = value.toString().split('').map(Number)
  return digits.map(d => colors[d] || 'Black').join('-')
}

// Format values for display
const formatValue = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '---'
  
  if (val < 0.001) {
    return (val * 1000000).toFixed(2) + ' μ'
  } else if (val < 0.01) {
    return (val * 1000).toFixed(2) + ' m'
  } else if (val >= 1000000) {
    return (val / 1000000).toFixed(2) + ' M'
  } else if (val >= 1000) {
    return (val / 1000).toFixed(2) + ' k'
  } else {
    return val.toFixed(2)
  }
}

// Preset configurations
const applyPreset = (preset) => {
  switch (preset) {
    case 'equal':
      voltage.value = 12
      resistors.value = [
        { value: 100 },
        { value: 100 },
        { value: 100 }
      ]
      break
    case 'voltage-divider':
      voltage.value = 12
      resistors.value = [
        { value: 1000 },
        { value: 2000 },
        { value: 3000 }
      ]
      break
    case 'high-power':
      voltage.value = 24
      resistors.value = [
        { value: 10 },
        { value: 20 },
        { value: 30 }
      ]
      break
    case 'unbalanced':
      voltage.value = 12
      resistors.value = [
        { value: 100 },
        { value: 1000 },
        { value: 4700 }
      ]
      break
  }
}
</script>

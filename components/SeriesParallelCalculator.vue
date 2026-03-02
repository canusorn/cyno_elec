<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const circuitType = ref<'series' | 'parallel'>('series')
const componentType = ref<'resistor' | 'capacitor' | 'inductor'>('resistor')
const componentCount = ref(2)
const componentValues = ref<number[]>([1000, 2200, 3300, 4700, 5600, 6800, 8200, 10000, 12000, 15000])

// Available unit prefixes
const unitPrefixes = [
  { value: 1e-12, label: 'p', name: 'pico' },
  { value: 1e-9, label: 'n', name: 'nano' },
  { value: 1e-6, label: 'µ', name: 'micro' },
  { value: 1e-3, label: 'm', name: 'milli' },
  { value: 1, label: '', name: 'base' },
  { value: 1e3, label: 'k', name: 'kilo' },
  { value: 1e6, label: 'M', name: 'mega' },
  { value: 1e9, label: 'G', name: 'giga' }
]

const selectedUnit = ref(1e3) // Default to kΩ

// Unit symbols
const unitSymbols = {
  resistor: 'Ω',
  capacitor: 'F',
  inductor: 'H'
}

// Calculate total value
const totalValue = computed(() => {
  const values = componentValues.value.slice(0, componentCount.value).filter(v => v > 0)

  if (values.length === 0) return 0

  if (circuitType.value === 'series') {
    // Series: add all values (for R and L), reciprocal sum for C
    if (componentType.value === 'capacitor') {
      // 1/C_total = 1/C1 + 1/C2 + ...
      const reciprocalSum = values.reduce((sum, val) => sum + (val > 0 ? 1 / val : 0), 0)
      return reciprocalSum > 0 ? 1 / reciprocalSum : 0
    } else {
      // R and L: just add
      return values.reduce((sum, val) => sum + val, 0)
    }
  } else {
    // Parallel: reciprocal sum for R and L, add all for C
    if (componentType.value === 'capacitor') {
      // C_total = C1 + C2 + ...
      return values.reduce((sum, val) => sum + val, 0)
    } else {
      // 1/R_total = 1/R1 + 1/R2 + ... (same for L)
      const reciprocalSum = values.reduce((sum, val) => sum + (val > 0 ? 1 / val : 0), 0)
      return reciprocalSum > 0 ? 1 / reciprocalSum : 0
    }
  }
})

// Format value with appropriate unit
const formatValue = (value: number): string => {
  if (value === 0) return '0'

  // Find appropriate unit
  for (let i = unitPrefixes.length - 1; i >= 0; i--) {
    const prefix = unitPrefixes[i]
    if (Math.abs(value) >= prefix.value) {
      const num = value / prefix.value
      return `${num >= 100 ? num.toFixed(0) : num >= 10 ? num.toFixed(1) : num.toFixed(2)}${prefix.label}`
    }
  }
  return value.toExponential(2)
}

// Get display unit
const displayUnit = computed(() => {
  const value = totalValue.value
  if (value === 0) return selectedUnit.value

  for (let i = unitPrefixes.length - 1; i >= 0; i--) {
    const prefix = unitPrefixes[i]
    if (Math.abs(value) >= prefix.value) {
      return prefix.value
    }
  }
  return 1
})

// Get unit label
const getUnitLabel = (unit: number): string => {
  const prefix = unitPrefixes.find(p => p.value === unit)
  return prefix ? prefix.label : ''
}

// Component SVG diagram
const circuitDiagram = computed(() => {
  const count = Math.min(componentCount.value, 6) // Show max 6 components
  const type = circuitType.value
  const compType = componentType.value

  // Get component symbols
  const getComponentSymbol = (index: number) => {
    if (compType === 'resistor') {
      return `M ${index * 80} 50 L ${index * 80 + 10} 50 L ${index * 80 + 15} 40 L ${index * 80 + 25} 60 L ${index * 80 + 35} 40 L ${index * 80 + 45} 60 L ${index * 80 + 50} 50 L ${index * 80 + 60} 50`
    } else if (compType === 'capacitor') {
      return `M ${index * 80} 50 L ${index * 80 + 25} 50 M ${index * 80 + 25} 30 L ${index * 80 + 25} 70 M ${index * 80 + 35} 30 L ${index * 80 + 35} 70 M ${index * 80 + 35} 50 L ${index * 80 + 60} 50`
    } else {
      // Inductor
      let path = `M ${index * 80} 50 `
      for (let i = 0; i < 4; i++) {
        path += `Q ${index * 80 + 12 + i * 12} 30, ${index * 80 + 18 + i * 12} 50 `
      }
      path += `L ${index * 80 + 60} 50`
      return path
    }
  }

  if (type === 'series') {
    // Series circuit diagram
    let svgContent = `
      <svg viewBox="0 0 ${count * 80 + 40} 100" class="w-full h-32">
        <!-- Main wire -->
        <line x1="10" y1="50" x2="${count * 80 + 30}" y2="50" stroke="#a855f7" stroke-width="3" fill="none"/>
    `

    // Draw components
    for (let i = 0; i < count; i++) {
      svgContent += `
        <path d="${getComponentSymbol(i)}" stroke="#22d3ee" stroke-width="3" fill="none"/>
        <text x="${i * 80 + 30}" y="85" fill="#fbbf24" font-size="12" text-anchor="middle">${String.fromCharCode(65 + i)}</text>
        <text x="${i * 80 + 30}" y="100" fill="#a5b4fc" font-size="10" text-anchor="middle">${formatValue(componentValues.value[i] * selectedUnit.value)}</text>
      `
    }

    svgContent += `
      </svg>
    `
    return svgContent
  } else {
    // Parallel circuit diagram
    let svgContent = `
      <svg viewBox="0 0 200 ${count * 50 + 60}" class="w-full">
        <!-- Top wire -->
        <line x1="30" y1="20" x2="170" y2="20" stroke="#a855f7" stroke-width="3" fill="none"/>
        <!-- Bottom wire -->
        <line x1="30" y1="${count * 50 + 40}" x2="170" y2="${count * 50 + 40}" stroke="#a855f7" stroke-width="3" fill="none"/>
    `

    // Draw parallel branches
    for (let i = 0; i < count; i++) {
      const yPos = 30 + i * 50
      svgContent += `
        <!-- Vertical wires -->
        <line x1="50" y1="20" x2="50" y2="${yPos}" stroke="#a855f7" stroke-width="2" fill="none"/>
        <line x1="150" y1="20" x2="150" y2="${yPos}" stroke="#a855f7" stroke-width="2" fill="none"/>
        <line x1="50" y1="${yPos + 20}" x2="50" y2="${count * 50 + 40}" stroke="#a855f7" stroke-width="2" fill="none"/>
        <line x1="150" y1="${yPos + 20}" x2="150" y2="${count * 50 + 40}" stroke="#a855f7" stroke-width="2" fill="none"/>
        <!-- Component -->
        <line x1="50" y1="${yPos + 10}" x2="70" y2="${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>
      `

      if (compType === 'resistor') {
        svgContent += `<path d="M 70 ${yPos + 10} L 75 ${yPos + 10} L 80 ${yPos} L 90 ${yPos + 20} L 100 ${yPos} L 110 ${yPos + 20} L 115 ${yPos + 10} L 130 ${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>`
      } else if (compType === 'capacitor') {
        svgContent += `
          <line x1="70" y1="${yPos + 10}" x2="95" y2="${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>
          <line x1="95" y1="${yPos}" x2="95" y2="${yPos + 20}" stroke="#22d3ee" stroke-width="3" fill="none"/>
          <line x1="105" y1="${yPos}" x2="105" y2="${yPos + 20}" stroke="#22d3ee" stroke-width="3" fill="none"/>
          <line x1="105" y1="${yPos + 10}" x2="130" y2="${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>
        `
      } else {
        // Inductor
        svgContent += `<path d="M 70 ${yPos + 10} Q 80 ${yPos}, 85 ${yPos + 10} Q 90 ${yPos + 20}, 95 ${yPos + 10} Q 100 ${yPos}, 105 ${yPos + 10} Q 110 ${yPos + 20}, 115 ${yPos + 10} L 130 ${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>`
      }

      svgContent += `
        <line x1="130" y1="${yPos + 10}" x2="150" y2="${yPos + 10}" stroke="#22d3ee" stroke-width="3" fill="none"/>
        <text x="100" y="${yPos + 35}" fill="#fbbf24" font-size="11" text-anchor="middle">${String.fromCharCode(65 + i)}</text>
        <text x="100" y="${yPos + 48}" fill="#a5b4fc" font-size="9" text-anchor="middle">${formatValue(componentValues.value[i] * selectedUnit.value)}</text>
      `
    }

    svgContent += `
      </svg>
    `
    return svgContent
  }
})

// Formula display
const formulaDisplay = computed(() => {
  const comp = componentType.value === 'resistor' ? 'R' : componentType.value === 'capacitor' ? 'C' : 'L'
  const type = circuitType.value

  if (type === 'series') {
    if (componentType.value === 'capacitor') {
      return `1/${comp}_total = 1/${comp}₁ + 1/${comp}₂ + 1/${comp}₃ + ...`
    } else {
      return `${comp}_total = ${comp}₁ + ${comp}₂ + ${comp}₃ + ...`
    }
  } else {
    if (componentType.value === 'capacitor') {
      return `${comp}_total = ${comp}₁ + ${comp}₂ + ${comp}₃ + ...`
    } else {
      return `1/${comp}_total = 1/${comp}₁ + 1/${comp}₂ + 1/${comp}₃ + ...`
    }
  }
})

// Update component count
const updateComponentCount = (count: number) => {
  componentCount.value = count
  // Ensure we have enough values
  while (componentValues.value.length < count) {
    componentValues.value.push(1000)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Circuit Type -->
        <div>
          <label class="block text-white font-semibold mb-2">Circuit Type</label>
          <div class="flex gap-2">
            <button
              @click="circuitType = 'series'"
              :class="[
                'flex-1 py-2 px-4 rounded-lg font-semibold transition-all',
                circuitType === 'series'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              ]"
            >
              ⚡ Series
            </button>
            <button
              @click="circuitType = 'parallel'"
              :class="[
                'flex-1 py-2 px-4 rounded-lg font-semibold transition-all',
                circuitType === 'parallel'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              ]"
            >
              🔀 Parallel
            </button>
          </div>
        </div>

        <!-- Component Type -->
        <div>
          <label class="block text-white font-semibold mb-2">Component Type</label>
          <select
            v-model="componentType"
            class="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-purple-400/30 focus:border-purple-400 focus:outline-none"
          >
            <option value="resistor">Resistor (Ω)</option>
            <option value="capacitor">Capacitor (F)</option>
            <option value="inductor">Inductor (H)</option>
          </select>
        </div>

        <!-- Component Count -->
        <div>
          <label class="block text-white font-semibold mb-2">Number of Components: {{ componentCount }}</label>
          <input
            type="range"
            :value="componentCount"
            @input="updateComponentCount(Number(($event.target as HTMLInputElement).value))"
            min="2"
            max="10"
            class="w-full accent-purple-500"
          />
        </div>
      </div>

      <!-- Unit Selection -->
      <div class="mt-6">
        <label class="block text-white font-semibold mb-2">Unit Prefix</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="prefix in unitPrefixes"
            :key="prefix.value"
            @click="selectedUnit = prefix.value"
            :class="[
              'py-2 px-4 rounded-lg font-semibold transition-all',
              selectedUnit === prefix.value
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            ]"
          >
            {{ prefix.label || 'base' }}{{ unitSymbols[componentType] }}
          </button>
        </div>
      </div>
    </div>

    <!-- Component Values -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
      <h3 class="text-xl font-bold text-white mb-4">Component Values</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="(value, index) in componentCount"
          :key="index"
          class="bg-slate-800/50 rounded-lg p-3 border border-purple-400/20"
        >
          <label class="block text-purple-200 text-sm mb-1">
            {{ String.fromCharCode(65 + index) }} ({{ getUnitLabel(selectedUnit) }}{{ unitSymbols[componentType] }})
          </label>
          <input
            type="number"
            v-model.number="componentValues[index]"
            min="0"
            step="any"
            class="w-full bg-slate-900 text-white px-3 py-2 rounded border border-purple-400/30 focus:border-purple-400 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
      <h3 class="text-xl font-bold text-white mb-4">Circuit Diagram</h3>
      <div class="bg-slate-900/50 rounded-lg p-4 overflow-x-auto" v-html="circuitDiagram"></div>
    </div>

    <!-- Result -->
    <div class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
      <h3 class="text-2xl font-bold text-white mb-4 text-center">📊 Total {{ circuitType === 'series' ? 'Series' : 'Parallel' }} {{ componentType === 'resistor' ? 'Resistance' : componentType === 'capacitor' ? 'Capacitance' : 'Inductance' }}</h3>
      <div class="text-center">
        <div class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mb-4">
          {{ formatValue(totalValue) }}{{ getUnitLabel(displayUnit) }}{{ unitSymbols[componentType] }}
        </div>
        <div class="bg-black/30 rounded-lg p-4 inline-block">
          <p class="text-purple-200 text-sm mb-2">Formula Used:</p>
          <p class="text-xl font-mono text-green-400">{{ formulaDisplay }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Info -->
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
      <div class="grid md:grid-cols-2 gap-4 text-purple-100">
        <div v-if="circuitType === 'series'" class="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
          <h4 class="font-bold text-yellow-200 mb-2">Series Characteristics</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Same current through all components</li>
            <li>Voltage divides across components</li>
            <li v-if="componentType !== 'capacitor'">Total = SUM of all values</li>
            <li v-else>Total is LESS than smallest value</li>
          </ul>
        </div>
        <div v-else class="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
          <h4 class="font-bold text-cyan-200 mb-2">Parallel Characteristics</h4>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Same voltage across all components</li>
            <li>Current divides among branches</li>
            <li v-if="componentType === 'capacitor'">Total = SUM of all values</li>
            <li v-else>Total is LESS than smallest value</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

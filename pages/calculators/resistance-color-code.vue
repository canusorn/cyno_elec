<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Resistor Color Code Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Decode resistor color bands and calculate resistance with visual representation
          </p>
        </div>
      </div>
    </section>

    <!-- Resistor Visual -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎨 Resistor Visualization
          </h3>
          
          <!-- Resistor SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 700 180" class="w-full max-w-5xl h-auto">
              <!-- Resistor body -->
              <defs>
                <linearGradient id="resistorBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#FAEBD7;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#F5F5DC;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="resistorBodyDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#D2B48C;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#C4A574;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#D2B48C;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Left lead -->
              <line x1="50" y1="90" x2="150" y2="90" stroke="#9CA3AF" stroke-width="8"/>
              
              <!-- Resistor body -->
              <rect x="150" y="55" width="400" height="70" :fill="$colorMode === 'dark' ? 'url(#resistorBodyDark)' : 'url(#resistorBody)'" stroke="#8B7355" stroke-width="2" rx="5"/>
              
              <!-- Color bands -->
              <!-- Band 1 -->
              <rect :x="180" y="55" width="25" height="70" :fill="band1Color.color" stroke="#666" stroke-width="1"/>
              <!-- Band 2 -->
              <rect :x="230" y="55" width="25" height="70" :fill="band2Color.color" stroke="#666" stroke-width="1"/>
              <!-- Band 3 (multiplier) -->
              <rect :x="280" y="55" width="25" height="70" :fill="band3Color.color" stroke="#666" stroke-width="1"/>
              <!-- Band 4 (tolerance) -->
              <rect :x="510" y="55" width="25" height="70" :fill="band4Color.color" stroke="#666" stroke-width="1"/>
              
              <!-- Right lead -->
              <line x1="550" y1="90" x2="650" y2="90" stroke="#9CA3AF" stroke-width="8"/>
              
              <!-- Band labels -->
              <text x="192" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Band 1</text>
              <text x="242" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Band 2</text>
              <text x="292" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Band 3</text>
              <text x="522" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Tolerance</text>
              
              <!-- Resistance value display -->
              <text x="350" y="95" text-anchor="middle" font-size="28" font-weight="bold" :fill="resultColor">
                {{ displayResistance }}
              </text>
            </svg>
          </div>
          
          <!-- Quick presets -->
          <div class="flex flex-wrap justify-center gap-3 mb-6">
            <button @click="applyPreset(0, 2, 2, 'brown')" 
              class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
              1kΩ (brown, black, red, brown)
            </button>
            <button @click="applyPreset(2, 7, 3, 'gold')" 
              class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
              27kΩ (red, violet, orange, gold)
            </button>
            <button @click="applyPreset(4, 7, 2, 'gold')" 
              class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
              4.7kΩ (yellow, violet, red, gold)
            </button>
            <button @click="applyPreset(1, 0, 4, 'gold')" 
              class="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium">
              100kΩ (brown, black, yellow, gold)
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Band Selection -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Color Bands</h3>
              
              <!-- Band 1 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Band 1 (First Digit)
                </label>
                <div class="grid grid-cols-5 gap-2">
                  <button 
                    v-for="color in digitColors" 
                    :key="color.name"
                    @click="band1 = color.name"
                    :class="[
                      'w-full h-12 rounded-lg border-4 transition-all duration-200 flex items-center justify-center text-xs font-bold',
                      band1 === color.name ? 'border-gray-900 dark:border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    ]"
                    :style="{ backgroundColor: color.color, color: getTextColor(color.name) }"
                  >
                    {{ color.value }}
                  </button>
                </div>
              </div>

              <!-- Band 2 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Band 2 (Second Digit)
                </label>
                <div class="grid grid-cols-5 gap-2">
                  <button 
                    v-for="color in digitColors" 
                    :key="color.name"
                    @click="band2 = color.name"
                    :class="[
                      'w-full h-12 rounded-lg border-4 transition-all duration-200 flex items-center justify-center text-xs font-bold',
                      band2 === color.name ? 'border-gray-900 dark:border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    ]"
                    :style="{ backgroundColor: color.color, color: getTextColor(color.name) }"
                  >
                    {{ color.value }}
                  </button>
                </div>
              </div>

              <!-- Band 3 (Multiplier) -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Band 3 (Multiplier)
                </label>
                <div class="grid grid-cols-5 gap-2">
                  <button 
                    v-for="color in multiplierColors" 
                    :key="color.name"
                    @click="band3 = color.name"
                    :class="[
                      'w-full h-12 rounded-lg border-4 transition-all duration-200 flex items-center justify-center text-xs font-bold',
                      band3 === color.name ? 'border-gray-900 dark:border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    ]"
                    :style="{ backgroundColor: color.color, color: getTextColor(color.name) }"
                  >
                    {{ color.label }}
                  </button>
                </div>
              </div>

              <!-- Band 4 (Tolerance) -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Band 4 (Tolerance)
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="color in toleranceColors" 
                    :key="color.name"
                    @click="band4 = color.name"
                    :class="[
                      'w-full h-12 rounded-lg border-4 transition-all duration-200 flex items-center justify-center text-xs font-bold',
                      band4 === color.name ? 'border-gray-900 dark:border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    ]"
                    :style="{ backgroundColor: color.color, color: getTextColor(color.name) }"
                  >
                    {{ color.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              
              <!-- Resistance Value -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">Resistance Value</p>
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ displayResistance }}
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-xl">
                    Tolerance: ±{{ tolerancePercentage }}%
                  </p>
                </div>
              </div>

              <!-- Value Range -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Resistance Range:</h4>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Min:</span>
                  <span class="text-lg font-bold text-green-600 dark:text-green-400">{{ minResistance }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 my-2">
                  <div class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" 
                       :style="{ width: '100%' }"></div>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Max:</span>
                  <span class="text-lg font-bold text-red-600 dark:text-red-400">{{ maxResistance }}</span>
                </div>
              </div>

              <!-- Calculation Breakdown -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📐 Calculation:</h4>
                <div class="space-y-2 text-sm font-mono">
                  <p class="text-gray-700 dark:text-gray-300">
                    Digit 1: <span class="font-bold text-primary">{{ band1Color.value }}</span> ({{ band1 }})
                  </p>
                  <p class="text-gray-700 dark:text-gray-300">
                    Digit 2: <span class="font-bold text-primary">{{ band2Color.value }}</span> ({{ band2 }})
                  </p>
                  <p class="text-gray-700 dark:text-gray-300">
                    Base Value: <span class="font-bold">{{ baseValue }}</span> Ω
                  </p>
                  <p class="text-gray-700 dark:text-gray-300">
                    Multiplier: <span class="font-bold">×10{{ toSuperscript(band3Color.multiplier) }}</span> ({{ band3 }})
                  </p>
                  <p class="text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                    Final: <span class="font-bold text-primary">{{ calculatedResistance }}</span> Ω
                  </p>
                </div>
              </div>

              <!-- Color Code Reference -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📖 Color Code Reference:</h4>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-gray-300 dark:border-gray-600">
                        <th class="py-2 text-left">Color</th>
                        <th class="py-2 text-center">Digit</th>
                        <th class="py-2 text-center">Multiplier</th>
                        <th class="py-2 text-center">Tolerance</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-700 dark:text-gray-300">
                      <tr v-for="color in colorReference" :key="color.name" class="border-b border-gray-200 dark:border-gray-700">
                        <td class="py-2">
                          <span class="inline-block w-4 h-4 rounded mr-2 align-middle" 
                                :style="{ backgroundColor: color.color, border: '1px solid #666' }"></span>
                          {{ color.name.charAt(0).toUpperCase() + color.name.slice(1) }}
                        </td>
                        <td class="py-2 text-center">{{ color.digit !== undefined ? color.digit : '-' }}</td>
                        <td class="py-2 text-center">{{ color.multiplierLabel || '-' }}</td>
                        <td class="py-2 text-center">{{ color.tolerance || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 How to Read Resistor Color Codes
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">4-Band Resistor Color Code</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Most resistors use a 4-band color code system. The first two bands represent digits, the third is the multiplier, 
              and the fourth indicates tolerance.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Reading the Bands:</h3>
            <ol class="list-decimal pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Band 1 (First Digit):</strong> Represents the first significant digit of the resistance value</li>
              <li><strong>Band 2 (Second Digit):</strong> Represents the second significant digit</li>
              <li><strong>Band 3 (Multiplier):</strong> Indicates the power of 10 to multiply the digits by</li>
              <li><strong>Band 4 (Tolerance):</strong> Shows the accuracy percentage of the resistor</li>
            </ol>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Calculation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p>Colors: Yellow (4), Violet (7), Red (×100), Gold (±5%)</p>
              <p class="mt-2">Calculation: 47 × 100 = 4,700Ω = 4.7kΩ ±5%</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Tips for Reading Resistors:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Hold the resistor with the tolerance band (gold/silver) on the right</li>
              <li>Read the bands from left to right</li>
              <li>The tolerance band is usually wider or has a larger gap</li>
              <li>Gold (±5%) and silver (±10%) are only used for tolerance</li>
              <li>Use a multimeter to verify the resistance value</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

// SEO
useHead({
  title: 'Resistor Color Code Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Decode resistor color bands and calculate resistance values instantly. Visual representation with 4-band resistor color code calculator.' },
    { name: 'keywords', content: 'resistor color code, color code calculator, resistance calculator, electronics, 4-band resistor' }
  ]
})

const $colorMode = useColorMode()

// Selected bands
const band1 = ref('brown')
const band2 = ref('black')
const band3 = ref('red')
const band4 = ref('brown')

// Color definitions
const digitColors = [
  { name: 'black', color: '#000000', value: 0 },
  { name: 'brown', color: '#8B4513', value: 1 },
  { name: 'red', color: '#DC143C', value: 2 },
  { name: 'orange', color: '#FF8C00', value: 3 },
  { name: 'yellow', color: '#FFD700', value: 4 },
  { name: 'green', color: '#228B22', value: 5 },
  { name: 'blue', color: '#0000FF', value: 6 },
  { name: 'violet', color: '#9400D3', value: 7 },
  { name: 'gray', color: '#808080', value: 8 },
  { name: 'white', color: '#FFFFFF', value: 9 }
]

const multiplierColors = [
  { name: 'black', color: '#000000', label: '×1Ω', multiplier: 0 },
  { name: 'brown', color: '#8B4513', label: '×10Ω', multiplier: 1 },
  { name: 'red', color: '#DC143C', label: '×100Ω', multiplier: 2 },
  { name: 'orange', color: '#FF8C00', label: '×1kΩ', multiplier: 3 },
  { name: 'yellow', color: '#FFD700', label: '×10kΩ', multiplier: 4 },
  { name: 'green', color: '#228B22', label: '×100kΩ', multiplier: 5 },
  { name: 'blue', color: '#0000FF', label: '×1MΩ', multiplier: 6 },
  { name: 'violet', color: '#9400D3', label: '×10MΩ', multiplier: 7 },
  { name: 'gold', color: '#FFD700', label: '×0.1Ω', multiplier: -1 },
  { name: 'silver', color: '#C0C0C0', label: '×0.01Ω', multiplier: -2 }
]

const toleranceColors = [
  { name: 'brown', color: '#8B4513', label: '±1%', tolerance: 1 },
  { name: 'red', color: '#DC143C', label: '±2%', tolerance: 2 },
  { name: 'gold', color: '#FFD700', label: '±5%', tolerance: 5 },
  { name: 'silver', color: '#C0C0C0', label: '±10%', tolerance: 10 }
]

// Color reference table
const colorReference = [
  { name: 'black', color: '#000000', digit: 0, multiplierLabel: '×1Ω', tolerance: '-' },
  { name: 'brown', color: '#8B4513', digit: 1, multiplierLabel: '×10Ω', tolerance: '±1%' },
  { name: 'red', color: '#DC143C', digit: 2, multiplierLabel: '×100Ω', tolerance: '±2%' },
  { name: 'orange', color: '#FF8C00', digit: 3, multiplierLabel: '×1kΩ', tolerance: '-' },
  { name: 'yellow', color: '#FFD700', digit: 4, multiplierLabel: '×10kΩ', tolerance: '-' },
  { name: 'green', color: '#228B22', digit: 5, multiplierLabel: '×100kΩ', tolerance: '±0.5%' },
  { name: 'blue', color: '#0000FF', digit: 6, multiplierLabel: '×1MΩ', tolerance: '±0.25%' },
  { name: 'violet', color: '#9400D3', digit: 7, multiplierLabel: '×10MΩ', tolerance: '±0.1%' },
  { name: 'gray', color: '#808080', digit: 8, multiplierLabel: '-', tolerance: '±0.05%' },
  { name: 'white', color: '#FFFFFF', digit: 9, multiplierLabel: '-', tolerance: '-' },
  { name: 'gold', color: '#FFD700', digit: '-', multiplierLabel: '×0.1Ω', tolerance: '±5%' },
  { name: 'silver', color: '#C0C0C0', digit: '-', multiplierLabel: '×0.01Ω', tolerance: '±10%' }
]

// Computed: Get color objects
const band1Color = computed(() => digitColors.find(c => c.name === band1.value) || digitColors[0])
const band2Color = computed(() => digitColors.find(c => c.name === band2.value) || digitColors[0])
const band3Color = computed(() => multiplierColors.find(c => c.name === band3.value) || multiplierColors[2])
const band4Color = computed(() => toleranceColors.find(c => c.name === band4.value) || toleranceColors[2])

// Computed: Calculate resistance
const baseValue = computed(() => {
  return (band1Color.value.value * 10) + band2Color.value.value
})

const calculatedResistance = computed(() => {
  const base = baseValue.value
  const multiplier = Math.pow(10, band3Color.value.multiplier)
  return base * multiplier
})

const tolerancePercentage = computed(() => {
  return band4Color.value.tolerance
})

const minResistance = computed(() => {
  const min = calculatedResistance.value * (1 - tolerancePercentage.value / 100)
  return formatResistance(min)
})

const maxResistance = computed(() => {
  const max = calculatedResistance.value * (1 + tolerancePercentage.value / 100)
  return formatResistance(max)
})

const displayResistance = computed(() => {
  return formatResistance(calculatedResistance.value)
})

const resultColor = computed(() => {
  const value = calculatedResistance.value
  if (value < 1000) return '#000000'
  if (value < 1000000) return '#8B4513'
  return '#DC143C'
})

// Helper functions
function formatResistance(ohms) {
  if (ohms >= 1000000) {
    return (ohms / 1000000).toFixed(2).replace(/\.00$/, '') + 'MΩ'
  }
  if (ohms >= 1000) {
    return (ohms / 1000).toFixed(2).replace(/\.00$/, '') + 'kΩ'
  }
  return ohms.toFixed(2).replace(/\.00$/, '') + 'Ω'
}

function toSuperscript(num) {
  const superscripts = {
    '-2': '⁻²',
    '-1': '⁻¹',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷'
  }
  return superscripts[num.toString()] || num
}

function getTextColor(colorName) {
  const lightColors = ['white', 'yellow', 'orange', 'gold', 'silver']
  return lightColors.includes(colorName) ? '#000000' : '#FFFFFF'
}

function applyPreset(b1, b2, b3, b4) {
  band1.value = digitColors[b1].name
  band2.value = digitColors[b2].name
  band3.value = multiplierColors.find(c => c.multiplier === b3)?.name || 'red'
  band4.value = b4
}
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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}
</style>

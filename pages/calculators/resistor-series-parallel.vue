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
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Resistor Series/Parallel Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent resistance for resistors in series or parallel configurations
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col items-center gap-3 text-xl font-mono font-bold">
              <div v-if="mode === 'series'" class="flex items-center gap-3">
                <span class="text-primary-highlight">R_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">R1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">R2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div v-else class="flex items-center gap-3">
                <span class="text-primary-highlight">1/R_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">1/R1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">1/R2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          
          <!-- Mode Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select Configuration</h3>
            <div class="flex gap-4">
              <button 
                @click="mode = 'series'"
                :class="mode === 'series' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Series
              </button>
              <button 
                @click="mode = 'parallel'"
                :class="mode === 'parallel' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Parallel
              </button>
            </div>
          </div>

          <!-- Resistor Input Section -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Resistors</h3>
              <div class="flex gap-2">
                <button 
                  @click="addResistor"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Resistor
                </button>
                <button 
                  @click="resetResistors"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <!-- Resistor Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(resistor, index) in resistors" 
                :key="resistor.id"
                class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border-2 transition-all duration-200"
                :class="getResistorBorderClass(index)"
              >
                <!-- Remove button -->
                <button 
                  @click="removeResistor(index)"
                  :disabled="resistors.length <= 2"
                  class="absolute top-2 right-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <!-- Resistor Label -->
                <div class="flex items-center gap-2 mb-3">
                  <div 
                    class="w-4 h-4 rounded-full transition-colors duration-300"
                    :style="{ backgroundColor: getResistorColor(index) }"
                  ></div>
                  <span class="font-bold text-gray-900 dark:text-white">Resistor {{ index + 1 }}</span>
                </div>

                <!-- Resistor Input -->
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="resistor.value"
                    type="number"
                    min="0.1"
                    step="0.1"
                    @input="updateResistorColor(index)"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                    placeholder="Enter value"
                  />
                  <select 
                    v-model="resistor.unit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                  </select>
                </div>

                <!-- Preset Buttons -->
                <div class="flex gap-1 mt-2 flex-wrap">
                  <button 
                    v-for="preset in commonValues" 
                    :key="preset"
                    @click="setResistorValue(index, preset)"
                    class="text-xs px-2 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                  >
                    {{ preset }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Add Common Circuits -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Quick Add Common Circuits:</h4>
              <div class="flex gap-2 flex-wrap">
                <button 
                  @click="loadPreset('voltageDivider')"
                  class="text-sm px-3 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                >
                  Voltage Divider (2 resistors)
                </button>
                <button 
                  @click="loadPreset('threeSeries')"
                  class="text-sm px-3 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                >
                  3 in Series
                </button>
                <button 
                  @click="loadPreset('threeParallel')"
                  class="text-sm px-3 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                >
                  3 in Parallel
                </button>
                <button 
                  @click="loadPreset('ledLimiting')"
                  class="text-sm px-3 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                >
                  LED Current Limiting
                </button>
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Equivalent Resistance Display -->
            <div class="bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Equivalent Resistance</h3>
              
              <div class="text-center py-6">
                <div class="text-6xl font-bold text-primary-dark dark:text-primary mb-2">
                  {{ formatResistance(equivalentResistance) }}
                </div>
                <div class="text-gray-600 dark:text-gray-300 text-lg">
                  {{ mode === 'series' ? 'Series' : 'Parallel' }} Combination
                </div>
              </div>

              <!-- Calculation Breakdown -->
              <div class="mt-6 pt-6 border-t border-primary/30">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Calculation:</h4>
                <div class="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div v-if="mode === 'series'">
                    R<sub>total</sub> = {{ getOhmsValues().join(' + ') }} = {{ formatResistance(equivalentResistance) }}
                  </div>
                  <div v-else>
                    <div>1/R<sub>total</sub> = {{ getReciprocalValues().join(' + ') }}</div>
                    <div class="mt-2">R<sub>total</sub> = {{ formatResistance(equivalentResistance) }}</div>
                  </div>
                </div>
              </div>

              <!-- Comparison -->
              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-300">Min Value</div>
                  <div class="text-xl font-bold text-green-600 dark:text-green-400">
                    {{ formatResistance(minResistance) }}
                  </div>
                </div>
                <div class="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-300">Max Value</div>
                  <div class="text-xl font-bold text-red-600 dark:text-red-400">
                    {{ formatResistance(maxResistance) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Circuit Visualization -->
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
              
              <!-- Series Circuit Visualization -->
              <svg v-if="mode === 'series'" viewBox="0 0 500 200" class="w-full h-auto bg-white dark:bg-gray-700 rounded-lg">
                <!-- Wire path -->
                <rect x="50" y="90" width="400" height="20" fill="#94A3B8"/>
                
                <!-- Resistor blocks -->
                <g v-for="(resistor, index) in resistors.slice(0, 6)" :key="resistor.id">
                  <g :transform="`translate(${getResistorPosition(index)}, 100)`">
                    <rect x="-30" y="-15" width="60" height="30" fill="white" :stroke="getResistorColor(index)" stroke-width="3" rx="3"/>
                    <polyline points="-20,0 -10,-8 0,8 10,-8 20,0" fill="none" :stroke="getResistorColor(index)" stroke-width="2"/>
                    <text x="0" y="30" text-anchor="middle" font-size="12" font-weight="bold" :fill="getResistorColor(index)">R{{ index + 1 }}</text>
                    <text x="0" y="45" text-anchor="middle" font-size="10" fill="#666">{{ formatResistance(getResistorValueInOhms(resistor)) }}</text>
                  </g>
                </g>

                <!-- Current flow arrow -->
                <g v-if="equivalentResistance > 0">
                  <path id="currentPath" d="M 50 70 L 450 70" stroke="#fbbf24" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
                  <polygon points="460,70 450,65 450,75" fill="#fbbf24"/>
                  <text x="250" y="60" text-anchor="middle" font-size="12" fill="#fbbf24" font-weight="bold">Current I →</text>
                </g>
              </svg>

              <!-- Parallel Circuit Visualization -->
              <svg v-else viewBox="0 0 500 250" class="w-full h-auto bg-white dark:bg-gray-700 rounded-lg">
                <!-- Main wires -->
                <line x1="50" y1="50" x2="50" y2="200" stroke="#94A3B8" stroke-width="3"/>
                <line x1="450" y1="50" x2="450" y2="200" stroke="#94A3B8" stroke-width="3"/>
                <line x1="50" y1="50" x2="450" y2="50" stroke="#94A3B8" stroke-width="3"/>
                <line x1="50" y1="200" x2="450" y2="200" stroke="#94A3B8" stroke-width="3"/>
                
                <!-- Resistor branches -->
                <g v-for="(resistor, index) in resistors.slice(0, 5)" :key="resistor.id">
                  <line :x1="getParallelResistorX(index)" :y1="50" :x2="getParallelResistorX(index)" :y2="90" stroke="#94A3B8" stroke-width="2"/>
                  <line :x1="getParallelResistorX(index)" :y1="160" :x2="getParallelResistorX(index)" :y2="200" stroke="#94A3B8" stroke-width="2"/>
                  
                  <g :transform="`translate(${getParallelResistorX(index)}, 125)`">
                    <rect x="-25" y="-35" width="50" height="70" fill="white" :stroke="getResistorColor(index)" stroke-width="3" rx="3"/>
                    <polyline points="-15,0 -5,-10 5,10 15,-10 15,10 5,-10 -5,10 -15,0" fill="none" :stroke="getResistorColor(index)" stroke-width="2"/>
                    <text x="0" y="-50" text-anchor="middle" font-size="11" font-weight="bold" :fill="getResistorColor(index)">R{{ index + 1 }}</text>
                    <text x="0" y="50" text-anchor="middle" font-size="9" fill="#666">{{ formatResistance(getResistorValueInOhms(resistor)) }}</text>
                  </g>
                </g>

                <!-- Voltage indicators -->
                <text x="30" y="45" font-size="14" fill="#22c55e" font-weight="bold">+</text>
                <text x="30" y="210" font-size="14" fill="#ef4444" font-weight="bold">−</text>
              </svg>

              <!-- Insight Card -->
              <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 class="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Key Insight</h4>
                <p class="text-sm text-blue-800 dark:text-blue-300">
                  <span v-if="mode === 'series'">
                    In <strong>series</strong>, resistances add directly. Total resistance is <strong>always greater</strong> than any individual resistor.
                  </span>
                  <span v-else>
                    In <strong>parallel</strong>, total resistance is <strong>always less</strong> than the smallest resistor. Current divides among parallel paths.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Series & Parallel Resistors</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Series Circuits</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Same current flows through all resistors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Total resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + ...</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Voltage divides across resistors proportionally</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-yellow-500">!</span>
                  <span>If one resistor fails (opens), entire circuit is broken</span>
                </li>
              </ul>
              <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm">
                V<sub>total</sub> = V<sub>1</sub> + V<sub>2</sub> + ...<br>
                I<sub>total</sub> = I<sub>1</sub> = I<sub>2</sub> = ...
              </div>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Parallel Circuits</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Same voltage across all resistors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Total resistance: 1/R<sub>total</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + ...</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>Current divides among parallel branches</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500">✓</span>
                  <span>If one path fails, other paths still work</span>
                </li>
              </ul>
              <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm">
                V<sub>total</sub> = V<sub>1</sub> = V<sub>2</sub> = ...<br>
                I<sub>total</sub> = I<sub>1</sub> + I<sub>2</sub> + ...
              </div>
            </div>
          </div>

          <!-- Practical Examples -->
          <div class="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">🔧 Practical Applications</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 class="font-semibold text-gray-800 dark:text-gray-200">Series Uses:</h5>
                <ul class="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Voltage dividers</li>
                  <li>• Current limiting</li>
                  <li>• Impedance matching</li>
                  <li>• Multiple LED chains</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-gray-800 dark:text-gray-200">Parallel Uses:</h5>
                <ul class="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Power distribution</li>
                  <li>• Reducing resistance</li>
                  <li>• Backup/redundant paths</li>
                  <li>• Independent loads</li>
                </ul>
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

<script>
import { useColorMode } from '@vueuse/core'
import { BoltIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'ResistorSeriesParallelCalculator',
  components: {
    BoltIcon,
    NavigationBar,
    Footer
  },
  setup() {
    const colorMode = useColorMode()
    
    useHead({
      title: 'Resistor Series/Parallel Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate equivalent resistance for resistors in series or parallel. Interactive calculator with visual circuit diagrams.' }
      ]
    })
    
    return { colorMode }
  },
  data() {
    return {
      mode: 'series', // 'series' or 'parallel'
      resistors: [
        { id: 1, value: 100, unit: 'Ω', color: '#3B82F6' },
        { id: 2, value: 220, unit: 'Ω', color: '#22C55E' }
      ],
      resistorIdCounter: 3,
      commonValues: [10, 22, 33, 47, 68, 100, 220, 330, 470, 680, 1000, 2200, 4700, 10000]
    }
  },
  computed: {
    equivalentResistance() {
      const values = this.resistors.map(r => this.getResistorValueInOhms(r))
      
      if (this.mode === 'series') {
        return values.reduce((sum, val) => sum + val, 0)
      } else {
        // Parallel: 1/Rtotal = 1/R1 + 1/R2 + ...
        const reciprocalSum = values.reduce((sum, val) => sum + (1 / val), 0)
        return reciprocalSum > 0 ? (1 / reciprocalSum) : 0
      }
    },
    minResistance() {
      const values = this.resistors.map(r => this.getResistorValueInOhms(r))
      return Math.min(...values)
    },
    maxResistance() {
      const values = this.resistors.map(r => this.getResistorValueInOhms(r))
      return Math.max(...values)
    }
  },
  methods: {
    getResistorValueInOhms(resistor) {
      const value = resistor.value || 0
      switch (resistor.unit) {
        case 'MΩ': return value * 1000000
        case 'kΩ': return value * 1000
        default: return value
      }
    },
    formatResistance(ohms) {
      if (ohms === 0) return '0 Ω'
      if (ohms >= 1000000) {
        return (ohms / 1000000).toFixed(2) + ' MΩ'
      } else if (ohms >= 1000) {
        return (ohms / 1000).toFixed(2) + ' kΩ'
      } else if (ohms >= 1) {
        return ohms.toFixed(2) + ' Ω'
      } else {
        return (ohms * 1000).toFixed(2) + ' mΩ'
      }
    },
    getResistorColor(index) {
      return this.resistors[index]?.color || '#94A3B8'
    },
    getResistorBorderClass(index) {
      const color = this.getResistorColor(index)
      return {
        'border-blue-500': color === '#3B82F6',
        'border-green-500': color === '#22C55E',
        'border-purple-500': color === '#A855F7',
        'border-orange-500': color === '#F97316',
        'border-pink-500': color === '#EC4899',
        'border-cyan-500': color === '#06B6D4'
      }
    },
    updateResistorColor(index) {
      const colors = ['#3B82F6', '#22C55E', '#A855F7', '#F97316', '#EC4899', '#06B6D4', '#EAB308', '#EF4444']
      if (!this.resistors[index].color || this.resistors[index].color === '#94A3B8') {
        this.resistors[index].color = colors[index % colors.length]
      }
    },
    addResistor() {
      const colors = ['#3B82F6', '#22C55E', '#A855F7', '#F97316', '#EC4899', '#06B6D4', '#EAB308', '#EF4444']
      this.resistors.push({
        id: this.resistorIdCounter++,
        value: 100,
        unit: 'Ω',
        color: colors[this.resistors.length % colors.length]
      })
    },
    removeResistor(index) {
      if (this.resistors.length > 2) {
        this.resistors.splice(index, 1)
      }
    },
    resetResistors() {
      this.resistors = [
        { id: this.resistorIdCounter++, value: 100, unit: 'Ω', color: '#3B82F6' },
        { id: this.resistorIdCounter++, value: 220, unit: 'Ω', color: '#22C55E' }
      ]
    },
    setResistorValue(index, value) {
      this.resistors[index].value = value
      if (value >= 1000000) {
        this.resistors[index].unit = 'MΩ'
        this.resistors[index].value = value / 1000000
      } else if (value >= 1000) {
        this.resistors[index].unit = 'kΩ'
        this.resistors[index].value = value / 1000
      } else {
        this.resistors[index].unit = 'Ω'
      }
    },
    getOhmsValues() {
      return this.resistors.map(r => this.formatResistance(this.getResistorValueInOhms(r)))
    },
    getReciprocalValues() {
      return this.resistors.map(r => {
        const ohms = this.getResistorValueInOhms(r)
        return `1/${this.formatResistance(ohms)}`
      })
    },
    getResistorPosition(index) {
      const startX = 100
      const spacing = 65
      return startX + (index * spacing)
    },
    getParallelResistorX(index) {
      const startX = 100
      const spacing = 70
      return startX + (index * spacing)
    },
    loadPreset(type) {
      switch (type) {
        case 'voltageDivider':
          this.mode = 'series'
          this.resistors = [
            { id: 1, value: 10, unit: 'kΩ', color: '#3B82F6' },
            { id: 2, value: 10, unit: 'kΩ', color: '#22C55E' }
          ]
          break
        case 'threeSeries':
          this.mode = 'series'
          this.resistors = [
            { id: 1, value: 100, unit: 'Ω', color: '#3B82F6' },
            { id: 2, value: 220, unit: 'Ω', color: '#22C55E' },
            { id: 3, value: 330, unit: 'Ω', color: '#A855F7' }
          ]
          break
        case 'threeParallel':
          this.mode = 'parallel'
          this.resistors = [
            { id: 1, value: 1, unit: 'kΩ', color: '#3B82F6' },
            { id: 2, value: 1, unit: 'kΩ', color: '#22C55E' },
            { id: 3, value: 1, unit: 'kΩ', color: '#A855F7' }
          ]
          break
        case 'ledLimiting':
          this.mode = 'series'
          this.resistors = [
            { id: 1, value: 220, unit: 'Ω', color: '#3B82F6' },
            { id: 2, value: 0.01, unit: 'Ω', color: '#22C55E' }
          ]
          this.resistors[1].unit = 'Ω'
          this.resistors[1].value = 0
          this.resistors[1].value = 10
          break
      }
      this.resistorIdCounter = this.resistors.length + 1
    }
  }
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-dark {
  color: var(--tw-color-primary-dark) !important;
}

.text-primary-highlight {
  color: var(--tw-color-primary-dark);
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}
</style>

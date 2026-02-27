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
            <CpuChipIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Capacitance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent capacitance for capacitors in series or parallel configurations
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col items-center gap-3 text-xl font-mono font-bold">
              <div v-if="mode === 'series'" class="flex items-center gap-3">
                <span class="text-primary-highlight">1/C_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">1/C1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">1/C2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div v-else class="flex items-center gap-3">
                <span class="text-primary-highlight">C_total</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">C1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">C2</span>
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
                @click="setMode('series')"
                :class="mode === 'series' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Series
              </button>
              <button 
                @click="setMode('parallel')"
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

          <!-- Capacitor Input Section -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Capacitors</h3>
              <div class="flex gap-2">
                <button 
                  @click="addCapacitor"
                  :disabled="capacitors.length >= 10"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Capacitor
                </button>
                <button 
                  @click="resetCapacitors"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <!-- Capacitor Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div 
                v-for="(cap, index) in capacitors" 
                :key="index"
                class="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 transition-all"
                :class="getCapacitorColor(index)"
              >
                <button 
                  v-if="capacitors.length > 2"
                  @click="removeCapacitor(index)"
                  class="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitor {{ index + 1 }}
                </label>
                
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="cap.value"
                    type="number"
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    @input="updateCapacitorUnit(index)"
                  />
                  
                  <select 
                    v-model="cap.unit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="pF">pF</option>
                    <option value="nF">nF</option>
                    <option value="μF">μF</option>
                    <option value="mF">mF</option>
                    <option value="F">F</option>
                  </select>
                </div>
                
                <!-- Quick preset buttons -->
                <div class="flex flex-wrap gap-1 mt-2">
                  <button 
                    v-for="preset in getCommonPresets()" 
                    :key="preset.value"
                    @click="setPreset(index, preset.value, preset.unit)"
                    class="px-2 py-1 text-xs bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                  >
                    {{ preset.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Circuit Presets -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Circuit Presets</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                @click="loadPreset('timing')"
                class="px-4 py-3 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg font-semibold transition-colors"
              >
                ⏱️ Timing Circuit
              </button>
              <button 
                @click="loadPreset('filter')"
                class="px-4 py-3 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-lg font-semibold transition-colors"
              >
                🔌 Filter Circuit
              </button>
              <button 
                @click="loadPreset('decoupling')"
                class="px-4 py-3 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg font-semibold transition-colors"
              >
                🔋 Decoupling
              </button>
              <button 
                @click="loadPreset('custom')"
                class="px-4 py-3 bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-lg font-semibold transition-colors"
              >
                ⚡ Power Supply
              </button>
            </div>
          </div>

          <!-- Results Section -->
          <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">📊 Results</h3>
            
            <!-- Equivalent Capacitance -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-6 mb-4">
              <div class="text-center">
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Equivalent Capacitance</p>
                <p class="text-4xl font-bold text-primary mb-2">
                  {{ formattedTotalCapacitance }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ totalCapacitanceFarads.toFixed(2) }} F
                </p>
              </div>
            </div>

            <!-- Calculation Breakdown -->
            <div class="bg-white dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Calculation Breakdown</h4>
              <div class="space-y-2 text-sm font-mono">
                <div class="text-gray-700 dark:text-gray-300">
                  <span class="text-gray-500 dark:text-gray-400">Input values:</span>
                  <br />
                  <span v-for="(cap, index) in capacitors" :key="index">
                    C{{ index + 1 }} = {{ formatCapacitance(cap.value, cap.unit) }}
                    <span v-if="index < capacitors.length - 1">, </span>
                  </span>
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                  <span class="text-gray-500 dark:text-gray-400">Formula:</span>
                  <br />
                  <span v-if="mode === 'series'">
                    1/C_total = 1/C1 + 1/C2 + ...
                  </span>
                  <span v-else>
                    C_total = C1 + C2 + ...
                  </span>
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                  <span class="text-gray-500 dark:text-gray-400">Calculation:</span>
                  <br />
                  <span v-if="mode === 'series'">
                    1/C_total = {{ seriesReciprocals }} = {{ seriesSum.toFixed(6) }}
                  </span>
                  <span v-else>
                    C_total = {{ parallelSum }}
                  </span>
                </div>
                <div class="text-primary-highlight font-bold">
                  C_total = {{ formattedTotalCapacitance }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Circuit Diagram -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Diagram</h3>
          <div class="flex justify-center">
            <svg viewBox="0 0 400 200" class="w-full max-w-2xl">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
                </pattern>
              </defs>
              
              <!-- Grid background -->
              <rect width="400" height="200" fill="url(#grid)" />
              
              <!-- Series Circuit -->
              <g v-if="mode === 'series'">
                <!-- Main loop -->
                <rect x="50" y="50" width="300" height="100" fill="none" stroke="#94A3B8" stroke-width="3"/>
                
                <!-- Capacitors in series on top -->
                <g v-for="(cap, index) in capacitors.slice(0, Math.min(capacitors.length, 4))" :key="index">
                  <g :transform="`translate(${100 + index * 60}, 50)`">
                    <!-- Capacitor symbol -->
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#9FA8DA" stroke-width="3"/>
                    <line x1="10" y1="0" x2="10" y2="10" stroke="#9FA8DA" stroke-width="3"/>
                    <text x="5" y="-10" text-anchor="middle" class="text-xs font-semibold" :fill="getCapacitorTextColor(index)">
                      C{{ index + 1 }}
                    </text>
                  </g>
                </g>
                
                <!-- Connection dots -->
                <circle cx="50" cy="100" r="4" fill="#94A3B8"/>
                <circle cx="350" cy="100" r="4" fill="#94A3B8"/>
                
                <!-- Label -->
                <text x="200" y="180" text-anchor="middle" class="text-sm font-bold" fill="#9FA8DA">
                  Series Configuration
                </text>
              </g>
              
              <!-- Parallel Circuit -->
              <g v-else>
                <!-- Main lines -->
                <line x1="50" y1="30" x2="350" y2="30" stroke="#94A3B8" stroke-width="3"/>
                <line x1="50" y1="170" x2="350" y2="170" stroke="#94A3B8" stroke-width="3"/>
                <line x1="50" y1="30" x2="50" y2="170" stroke="#94A3B8" stroke-width="3"/>
                <line x1="350" y1="30" x2="350" y2="170" stroke="#94A3B8" stroke-width="3"/>
                
                <!-- Capacitors in parallel -->
                <g v-for="(cap, index) in capacitors.slice(0, Math.min(capacitors.length, 4))" :key="index">
                  <g :transform="`translate(${100 + index * 60}, 100)`">
                    <!-- Vertical lines -->
                    <line x1="0" y1="-70" x2="0" y2="-5" stroke="#94A3B8" stroke-width="2"/>
                    <line x1="10" y1="-70" x2="10" y2="-5" stroke="#94A3B8" stroke-width="2"/>
                    <line x1="0" y1="5" x2="0" y2="70" stroke="#94A3B8" stroke-width="2"/>
                    <line x1="10" y1="5" x2="10" y2="70" stroke="#94A3B8" stroke-width="2"/>
                    
                    <!-- Capacitor plates -->
                    <line x1="0" y1="-5" x2="0" y2="5" :stroke="getCapacitorStrokeColor(index)" stroke-width="3"/>
                    <line x1="10" y1="-5" x2="10" y2="5" :stroke="getCapacitorStrokeColor(index)" stroke-width="3"/>
                    
                    <text x="5" y="-80" text-anchor="middle" class="text-xs font-semibold" :fill="getCapacitorTextColor(index)">
                      C{{ index + 1 }}
                    </text>
                  </g>
                </g>
                
                <!-- Label -->
                <text x="200" y="195" text-anchor="middle" class="text-sm font-bold" fill="#9FA8DA">
                  Parallel Configuration
                </text>
              </g>
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Capacitor Combinations</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Series Connection</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-sm font-mono font-bold text-center">
                  1/C_total = 1/C1 + 1/C2 + 1/C3 + ...
                </p>
              </div>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Equivalent capacitance is <strong>less than</strong> the smallest individual capacitor</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Same charge (Q) on all capacitors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Voltage divides across capacitors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Used when you need a smaller capacitance than available values</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Parallel Connection</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-sm font-mono font-bold text-center">
                  C_total = C1 + C2 + C3 + ...
                </p>
              </div>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Equivalent capacitance is the <strong>sum of all</strong> capacitances</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Same voltage across all capacitors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Charge divides between capacitors</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary">•</span>
                  <span>Most common configuration for increasing total capacitance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-2">💡 Practical Applications</h4>
            <ul class="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
              <li>• <strong>Series:</strong> High-voltage applications, voltage dividers, non-standard values</li>
              <li>• <strong>Parallel:</strong> Power supply filtering, energy storage, decoupling, increasing capacitance</li>
            </ul>
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
import { CpuChipIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'CapacitanceCalculator',
  components: {
    CpuChipIcon,
    NavigationBar,
    Footer
  },
  setup() {
    useHead({
      title: 'Capacitance Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate equivalent capacitance for capacitors in series or parallel configurations. Interactive calculator with circuit diagrams.' }
      ]
    })
    
    const $colorMode = useColorMode()
    return { $colorMode }
  },
  data() {
    return {
      mode: 'parallel', // 'series' or 'parallel'
      capacitors: [
        { value: 100, unit: 'μF' },
        { value: 220, unit: 'μF' },
        { value: 47, unit: 'μF' }
      ]
    }
  },
  computed: {
    $colorMode() {
      return this.$colorMode?.value || 'light'
    },
    
    // Convert all capacitors to Farads
    capacitorsInFarads() {
      return this.capacitors.map(cap => {
        const multiplier = {
          'pF': 1e-12,
          'nF': 1e-9,
          'μF': 1e-6,
          'mF': 1e-3,
          'F': 1
        }[cap.unit] || 1e-6
        return cap.value * multiplier
      })
    },
    
    // Calculate total capacitance
    totalCapacitanceFarads() {
      const values = this.capacitorsInFarads
      
      if (this.mode === 'series') {
        // Series: 1/C_total = 1/C1 + 1/C2 + ...
        const sumReciprocals = values.reduce((sum, val) => sum + (1 / val), 0)
        return sumReciprocals > 0 ? 1 / sumReciprocals : 0
      } else {
        // Parallel: C_total = C1 + C2 + ...
        return values.reduce((sum, val) => sum + val, 0)
      }
    },
    
    // Format total capacitance with appropriate unit
    formattedTotalCapacitance() {
      return this.formatCapacitance(this.totalCapacitanceFarads, 'F')
    },
    
    // Series calculation breakdown
    seriesReciprocals() {
      return this.capacitorsInFarads
        .map((val, i) => `1/${this.formatCapacitance(val, 'F')}`)
        .join(' + ')
    },
    
    seriesSum() {
      return this.capacitorsInFarads.reduce((sum, val) => sum + (1 / val), 0)
    },
    
    // Parallel calculation breakdown
    parallelSum() {
      return this.capacitorsInFarads
        .map((val, i) => this.formatCapacitance(val, 'F'))
        .join(' + ')
    }
  },
  methods: {
    setMode(newMode) {
      this.mode = newMode
    },
    
    addCapacitor() {
      if (this.capacitors.length < 10) {
        this.capacitors.push({ value: 100, unit: 'μF' })
      }
    },
    
    removeCapacitor(index) {
      if (this.capacitors.length > 2) {
        this.capacitors.splice(index, 1)
      }
    },
    
    resetCapacitors() {
      this.capacitors = [
        { value: 100, unit: 'μF' },
        { value: 220, unit: 'μF' },
        { value: 47, unit: 'μF' }
      ]
    },
    
    setPreset(index, value, unit) {
      this.capacitors[index].value = value
      this.capacitors[index].unit = unit
    },
    
    getCommonPresets() {
      return [
        { value: 10, unit: 'pF', label: '10pF' },
        { value: 100, unit: 'pF', label: '100pF' },
        { value: 1, unit: 'nF', label: '1nF' },
        { value: 10, unit: 'nF', label: '10nF' },
        { value: 100, unit: 'nF', label: '100nF' },
        { value: 1, unit: 'μF', label: '1μF' },
        { value: 10, unit: 'μF', label: '10μF' },
        { value: 100, unit: 'μF', label: '100μF' }
      ]
    },
    
    loadPreset(type) {
      const presets = {
        timing: [
          { value: 10, unit: 'nF' },
          { value: 100, unit: 'nF' }
        ],
        filter: [
          { value: 100, unit: 'nF' },
          { value: 100, unit: 'nF' },
          { value: 10, unit: 'μF' }
        ],
        decoupling: [
          { value: 100, unit: 'nF' },
          { value: 10, unit: 'μF' },
          { value: 100, unit: 'μF' }
        ],
        custom: [
          { value: 47, unit: 'μF' },
          { value: 220, unit: 'μF' },
          { value: 1000, unit: 'μF' }
        ]
      }
      
      if (presets[type]) {
        this.capacitors = JSON.parse(JSON.stringify(presets[type]))
      }
    },
    
    // Helper to format capacitance with appropriate unit
    formatCapacitance(valueInFarads, currentUnit = 'F') {
      // If value is already in a specific unit and we want to keep it
      if (currentUnit !== 'F') {
        const multiplier = {
          'pF': 1e-12,
          'nF': 1e-9,
          'μF': 1e-6,
          'mF': 1e-3,
          'F': 1
        }[currentUnit] || 1
        
        const value = valueInFarads / multiplier
        return `${value.toFixed(2)} ${currentUnit}`
      }
      
      // Auto-select best unit
      const absValue = Math.abs(valueInFarads)
      
      if (absValue >= 1) {
        return `${valueInFarads.toFixed(2)} F`
      } else if (absValue >= 1e-3) {
        return `${(valueInFarads / 1e-3).toFixed(2)} mF`
      } else if (absValue >= 1e-6) {
        return `${(valueInFarads / 1e-6).toFixed(2)} μF`
      } else if (absValue >= 1e-9) {
        return `${(valueInFarads / 1e-9).toFixed(2)} nF`
      } else {
        return `${(valueInFarads / 1e-12).toFixed(2)} pF`
      }
    },
    
    updateCapacitorUnit(index) {
      // Auto-adjust unit if value is extreme
      const cap = this.capacitors[index]
      if (cap.value >= 1000000 && cap.unit === 'F') {
        cap.value = cap.value / 1000000
        cap.unit = 'MF'
      } else if (cap.value >= 1000 && cap.unit === 'F') {
        cap.value = cap.value / 1000
        cap.unit = 'kF'
      }
    },
    
    getCapacitorColor(index) {
      const colors = [
        'border-red-300 dark:border-red-600',
        'border-blue-300 dark:border-blue-600',
        'border-green-300 dark:border-green-600',
        'border-yellow-300 dark:border-yellow-600',
        'border-purple-300 dark:border-purple-600',
        'border-pink-300 dark:border-pink-600',
        'border-indigo-300 dark:border-indigo-600',
        'border-teal-300 dark:border-teal-600',
        'border-orange-300 dark:border-orange-600',
        'border-cyan-300 dark:border-cyan-600'
      ]
      return colors[index % colors.length]
    },
    
    getCapacitorStrokeColor(index) {
      const colors = [
        '#EF4444', // red
        '#3B82F6', // blue
        '#22C55E', // green
        '#EAB308', // yellow
        '#A855F7', // purple
        '#EC4899', // pink
        '#6366F1', // indigo
        '#14B8A6', // teal
        '#F97316', // orange
        '#06B6D4'  // cyan
      ]
      return colors[index % colors.length]
    },
    
    getCapacitorTextColor(index) {
      const colors = [
        '#EF4444', // red
        '#3B82F6', // blue
        '#22C55E', // green
        '#EAB308', // yellow
        '#A855F7', // purple
        '#EC4899', // pink
        '#6366F1', // indigo
        '#14B8A6', // teal
        '#F97316', // orange
        '#06B6D4'  // cyan
      ]
      return colors[index % colors.length]
    }
  }
}
</script>

<style scoped>
.text-primary-highlight {
  color: var(--tw-color-primary) !important;
}
</style>

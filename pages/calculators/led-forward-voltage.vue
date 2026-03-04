<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <nav class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <svg class="h-8 sm:h-10 mr-2 hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
                <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
                <circle cx="20" cy="20" r="3" fill="#7986CB"/>
                <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
              </svg>
              <span class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Cyno Electric</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Home</NuxtLink>
            <NuxtLink to="/calculators" class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Calculators</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Contact</NuxtLink>
            <button @click="toggleDark" class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              <svg v-if="colorMode === 'dark'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 dark:text-gray-200 hover:text-primary focus:outline-none focus:text-primary transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Home</NuxtLink>
            <NuxtLink to="/calculators" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Calculators</NuxtLink>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Contact</NuxtLink>
            <div class="px-3 py-2">
              <button @click="toggleDark" class="w-full text-left text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Toggle Dark Mode</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            LED Forward Voltage & Current Analysis
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Analyze LED characteristics, V-I curves, and optimize your LED circuits
          </p>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid lg:grid-cols-2 gap-8">
        
        <!-- Controls Panel -->
        <div class="space-y-6">
          
          <!-- LED Configuration -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              LED Configuration
            </h2>

            <!-- LED Color -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">LED Color</label>
              <select v-model="ledColor" class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="red">Red (1.8-2.2V)</option>
                <option value="green">Green (2.0-3.0V)</option>
                <option value="blue">Blue (3.0-3.4V)</option>
                <option value="white">White (3.0-3.4V)</option>
                <option value="yellow">Yellow (2.0-2.4V)</option>
                <option value="amber">Amber (2.0-2.4V)</option>
                <option value="ir">Infrared (1.2-1.8V)</option>
                <option value="uv">Ultraviolet (3.0-4.0V)</option>
              </select>
            </div>

            <!-- Forward Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Forward Voltage (Vf): {{ forwardVoltage.toFixed(2) }} V
              </label>
              <input v-model.number="forwardVoltage" type="range" :min="ledSpecs.vfMin" :max="ledSpecs.vfMax" step="0.01" class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{{ ledSpecs.vfMin }}V</span>
                <span>{{ ledSpecs.vfMax }}V</span>
              </div>
            </div>

            <!-- Forward Current -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Forward Current (If): {{ forwardCurrent }} mA
              </label>
              <input v-model.number="forwardCurrent" type="range" :min="1" :max="30" step="0.5" class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 mA</span>
                <span>30 mA</span>
              </div>
            </div>

            <!-- Configuration Type -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Configuration</label>
              <select v-model="configType" class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="single">Single LED</option>
                <option value="series">Series LEDs</option>
                <option value="parallel">Parallel LEDs</option>
              </select>
            </div>

            <!-- Number of LEDs -->
            <div v-if="configType !== 'single'" class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Number of LEDs: {{ numLeds }}
              </label>
              <input v-model.number="numLeds" type="range" min="2" max="10" step="1" class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>2</span>
                <span>10</span>
              </div>
            </div>

            <!-- Supply Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Supply Voltage: {{ supplyVoltage }} V
              </label>
              <input v-model.number="supplyVoltage" type="range" min="1" max="48" step="0.1" class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1V</span>
                <span>48V</span>
              </div>
            </div>

            <!-- LED Preview -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">LED Preview</h3>
              <div class="flex items-center justify-center gap-2">
                <div v-for="i in displayLeds" :key="i" 
                     class="w-8 h-8 rounded-full transition-all duration-300 shadow-lg"
                     :style="{ backgroundColor: ledColorHex, opacity: ledBrightness, boxShadow: `0 0 ${ledGlow}px ${ledColorHex}` }">
                </div>
              </div>
              <p class="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                Brightness: {{ Math.round(ledBrightness * 100) }}%
              </p>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h2>
            <div class="grid grid-cols-2 gap-3">
              <button v-for="(preset, name) in presets" :key="name" @click="applyPreset(preset)"
                      class="px-4 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-lg transition-all transform hover:scale-105 text-sm font-medium">
                {{ name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          
          <!-- Calculated Results -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculated Results
            </h2>

            <div class="space-y-4">
              <!-- Required Resistor -->
              <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
                <span class="font-medium text-gray-700 dark:text-gray-300">Required Resistor</span>
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ requiredResistor < 0 ? 'N/A' : requiredResistor.toFixed(1) + ' Ω' }}</span>
              </div>

              <!-- Resistor Power -->
              <div class="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
                <span class="font-medium text-gray-700 dark:text-gray-300">Resistor Power</span>
                <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ resistorPower.toFixed(3) }} W</span>
              </div>

              <!-- LED Power -->
              <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
                <span class="font-medium text-gray-700 dark:text-gray-300">LED Power</span>
                <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ ledPower.toFixed(3) }} W</span>
              </div>

              <!-- Total Power -->
              <div class="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl">
                <span class="font-medium text-gray-700 dark:text-gray-300">Total Power</span>
                <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ totalPower.toFixed(3) }} W</span>
              </div>

              <!-- Efficiency -->
              <div class="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 rounded-xl">
                <span class="font-medium text-gray-700 dark:text-gray-300">Efficiency</span>
                <span class="text-2xl font-bold text-teal-600 dark:text-teal-400">{{ efficiency.toFixed(1) }}%</span>
              </div>
            </div>

            <!-- Warning -->
            <div v-if="requiredResistor < 0" class="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg">
              <p class="text-red-800 dark:text-red-300 font-medium">⚠️ Warning: Supply voltage too low for this LED configuration!</p>
            </div>

            <div v-else-if="resistorPower > 0.5" class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
              <p class="text-yellow-800 dark:text-yellow-300 font-medium">⚡ High power dissipation! Use a resistor rated for at least {{ (resistorPower * 2).toFixed(2) }}W</p>
            </div>
          </div>

          <!-- V-I Characteristic Curve -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              V-I Characteristic Curve
            </h2>
            
            <div class="relative">
              <svg viewBox="0 0 400 300" class="w-full h-auto">
                <!-- Grid -->
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="1"/>
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#grid)" />
                
                <!-- Axes -->
                <line x1="40" y1="260" x2="380" y2="260" stroke="#374151" stroke-width="2"/>
                <line x1="40" y1="260" x2="40" y2="20" stroke="#374151" stroke-width="2"/>
                
                <!-- Axis Labels -->
                <text x="210" y="295" text-anchor="middle" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">Voltage (V)</text>
                <text x="15" y="140" text-anchor="middle" transform="rotate(-90, 15, 140)" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">Current (mA)</text>
                
                <!-- V-I Curve -->
                <path :d="viCurvePath" fill="none" stroke="#9333ea" stroke-width="3"/>
                
                <!-- Operating Point -->
                <circle :cx="operatingPointX" :cy="operatingPointY" r="6" fill="#dc2626" stroke="#fff" stroke-width="2"/>
                
                <!-- Operating Point Labels -->
                <text :x="operatingPointX + 10" :y="operatingPointY - 10" class="text-xs font-semibold fill-gray-900 dark:fill-gray-100">
                  ({{ forwardVoltage.toFixed(2) }}V, {{ forwardCurrent }}mA)
                </text>
              </svg>
            </div>
            
            <div class="mt-4 flex items-center justify-center gap-6 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-4 h-1 bg-purple-600 rounded"></div>
                <span class="text-gray-600 dark:text-gray-400">LED Curve</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                <span class="text-gray-600 dark:text-gray-400">Operating Point</span>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Understanding LED Characteristics
            </h2>
            
            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 class="font-bold text-lg mb-2">Forward Voltage (Vf)</h3>
                <p class="text-sm">The voltage drop across an LED when it's conducting current. Different LED colors have different Vf due to their semiconductor bandgap energy. Blue and white LEDs have higher Vf than red LEDs.</p>
              </div>
              
              <div>
                <h3 class="font-bold text-lg mb-2">Forward Current (If)</h3>
                <p class="text-sm">The current flowing through the LED when forward-biased. Standard indicator LEDs typically operate at 20mA. Higher current = brighter but also more heat and shorter lifespan.</p>
              </div>
              
              <div>
                <h3 class="font-bold text-lg mb-2">V-I Curve</h3>
                <p class="text-sm">LEDs have exponential current-voltage characteristics. Small voltage changes cause large current changes, which is why current-limiting resistors are essential.</p>
              </div>
              
              <div>
                <h3 class="font-bold text-lg mb-2">Series vs Parallel</h3>
                <p class="text-sm"><strong>Series:</strong> Same current through all LEDs, voltages add. <strong>Parallel:</strong> Same voltage across all LEDs, currents add. Series is preferred for consistent brightness.</p>
              </div>
              
              <div>
                <h3 class="font-bold text-lg mb-2">Efficiency</h3>
                <p class="text-sm">LED efficiency = LED Power / Total Power × 100%. Higher is better. Use lower voltage supplies or series configurations to improve efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p class="mb-2">LED Forward Voltage & Current Analysis Calculator</p>
          <p class="text-sm">Part of Cyno Electric - Interactive Electrical Engineering Learning Tools</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Color mode
const colorMode = ref('light')
const mobileMenuOpen = ref(false)

const toggleDark = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

// LED specifications
const ledSpecsMap = {
  red: { vfMin: 1.8, vfMax: 2.2, color: '#ff0000' },
  green: { vfMin: 2.0, vfMax: 3.0, color: '#00ff00' },
  blue: { vfMin: 3.0, vfMax: 3.4, color: '#0000ff' },
  white: { vfMin: 3.0, vfMax: 3.4, color: '#ffffff' },
  yellow: { vfMin: 2.0, vfMax: 2.4, color: '#ffff00' },
  amber: { vfMin: 2.0, vfMax: 2.4, color: '#ffbf00' },
  ir: { vfMin: 1.2, vfMax: 1.8, color: '#8b0000' },
  uv: { vfMin: 3.0, vfMax: 4.0, color: '#8b00ff' }
}

// Input values
const ledColor = ref('red')
const forwardVoltage = ref(2.0)
const forwardCurrent = ref(20)
const configType = ref('single')
const numLeds = ref(3)
const supplyVoltage = ref(5)

// Computed LED specs
const ledSpecs = computed(() => ledSpecsMap[ledColor.value])

// Update forward voltage when color changes
watch(ledColor, (newColor) => {
  const specs = ledSpecsMap[newColor]
  forwardVoltage.value = (specs.vfMin + specs.vfMax) / 2
})

// LED display properties
const ledColorHex = computed(() => ledSpecs.value.color)
const ledBrightness = computed(() => Math.min(forwardCurrent.value / 20, 1))
const ledGlow = computed(() => Math.round(forwardCurrent.value * 2))

const displayLeds = computed(() => {
  if (configType.value === 'single') return 1
  return numLeds.value
})

// Calculated values
const totalForwardVoltage = computed(() => {
  if (configType.value === 'single') return forwardVoltage.value
  if (configType.value === 'series') return forwardVoltage.value * numLeds.value
  return forwardVoltage.value
})

const totalForwardCurrent = computed(() => {
  if (configType.value === 'single') return forwardCurrent.value
  if (configType.value === 'series') return forwardCurrent.value
  return forwardCurrent.value * numLeds.value
})

const requiredResistor = computed(() => {
  const voltageDrop = supplyVoltage.value - totalForwardVoltage.value
  if (voltageDrop <= 0) return -1
  return (voltageDrop / (totalForwardCurrent.value / 1000))
})

const resistorPower = computed(() => {
  if (requiredResistor.value < 0) return 0
  const current = totalForwardCurrent.value / 1000
  return current * current * requiredResistor.value
})

const ledPower = computed(() => {
  return (totalForwardVoltage.value * totalForwardCurrent.value) / 1000
})

const totalPower = computed(() => {
  if (requiredResistor.value < 0) return 0
  return ledPower.value + resistorPower.value
})

const efficiency = computed(() => {
  if (totalPower.value === 0) return 0
  return (ledPower.value / totalPower.value) * 100
})

// V-I Curve
const viCurvePath = computed(() => {
  const vf = forwardVoltage.value
  const ifRef = forwardCurrent.value
  
  let path = 'M 40 260'
  
  for (let v = 0; v <= 4; v += 0.1) {
    const x = 40 + (v / 4) * 340
    const normalizedV = v / vf
    const current = ifRef * Math.exp(3 * (normalizedV - 1))
    const clampedCurrent = Math.max(0, Math.min(current, ifRef * 2))
    const y = 260 - (clampedCurrent / (ifRef * 2)) * 240
    path += ` L ${x} ${y}`
  }
  
  return path
})

const operatingPointX = computed(() => {
  return 40 + (forwardVoltage.value / 4) * 340
})

const operatingPointY = computed(() => {
  return 260 - (forwardCurrent.value / (forwardCurrent.value * 2)) * 240
})

// Presets
const presets = {
  'Red 5V': { ledColor: 'red', forwardVoltage: 2.0, forwardCurrent: 20, configType: 'single', supplyVoltage: 5 },
  'Blue 12V': { ledColor: 'blue', forwardVoltage: 3.2, forwardCurrent: 20, configType: 'series', numLeds: 3, supplyVoltage: 12 },
  'RGB 5V': { ledColor: 'green', forwardVoltage: 2.5, forwardCurrent: 20, configType: 'parallel', numLeds: 3, supplyVoltage: 5 },
  'White 24V': { ledColor: 'white', forwardVoltage: 3.2, forwardCurrent: 20, configType: 'series', numLeds: 6, supplyVoltage: 24 }
}

const applyPreset = (preset) => {
  ledColor.value = preset.ledColor
  forwardVoltage.value = preset.forwardVoltage
  forwardCurrent.value = preset.forwardCurrent
  configType.value = preset.configType
  if (preset.numLeds) numLeds.value = preset.numLeds
  supplyVoltage.value = preset.supplyVoltage
}

// Watch function
const watch = (source, callback) => {
  onMounted(() => {
    const unwatch = computed(source)
    callback(unwatch.value)
  })
}
</script>

<style scoped>
.animated-formula {
  transition: all 0.3s ease;
}

.formula-part {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.formula-part:hover {
  background-color: rgba(147, 51, 234, 0.1);
  transform: scale(1.05);
}

.formula-operator {
  margin: 0 0.5rem;
  font-weight: bold;
}

/* Dark mode grid adjustment */
.dark :deep(#grid) path {
  stroke: #4b5563;
}
</style>

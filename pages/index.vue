<template>
  <div
    :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <nav class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <svg class="h-8 sm:h-10 mr-2 hover:scale-105 transition-transform" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="4"
                class="text-primary animate-pulse" />
              <path d="M30 50 L45 35 L55 65 L70 50" stroke="currentColor" stroke-width="3" class="text-primary-dark" />
            </svg>
            <span
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Cyno
              Electric</span>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/calculators"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Calculators</NuxtLink>
            <a href="#formulas"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Formulas</a>
            <a href="#tools"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Tools</a>
            <NuxtLink to="/contact"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Contact</NuxtLink>
            <a href="#about"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">About</a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-600 dark:text-gray-200 hover:text-primary focus:outline-none focus:text-primary transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="mobileMenuOpen"
          class="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <NuxtLink to="/calculators" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Calculators</NuxtLink>
            <a href="#formulas" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Formulas</a>
            <a href="#tools" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Tools</a>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Contact</NuxtLink>
            <a href="#about" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">About</a>
            <div class="px-3 py-2">
              <button @click="toggleDark(); mobileMenuOpen = false"
                class="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full font-medium transition-all">{{
                  $colorMode === 'dark' ? '☀️ Light' : '🌙 Dark' }}</button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-8 relative">
        <div class="flex-1 text-center md:text-left">
          <h1
            class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Master Electrical Calculations with <span class="text-primary dark:text-primary-light">Cyno Electric</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your comprehensive platform for electrical engineering calculations, formulas, and interactive tools. From
            Ohm's Law to complex power analysis.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#calculators"
              class="inline-block bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-lg text-lg">
              Start Calculating
            </a>
            <a href="#formulas"
              class="inline-block bg-white dark:bg-gray-800 text-primary dark:text-primary-light px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg border-2 border-primary dark:border-primary-light text-lg">
              View Formulas
            </a>
          </div>
        </div>
        <div class="flex-1 flex justify-center mt-12 md:mt-0">
          <div
            class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500 hover:shadow-primary/20">
            <!-- Animated Circuit Diagram -->
            <svg viewBox="0 0 400 300" class="w-full h-auto">
              <!-- Circuit Background -->
              <rect width="400" height="300" fill="transparent" />

              <!-- Voltage Source -->
              <circle cx="50" cy="150" r="25" fill="none" stroke="currentColor" stroke-width="2" class="text-primary" />
              <text x="50" y="155" text-anchor="middle" class="text-sm font-bold fill-current text-primary">V</text>

              <!-- Resistor -->
              <rect x="150" y="140" width="40" height="20" fill="none" stroke="currentColor" stroke-width="2"
                class="text-primary-dark" />
              <text x="170" y="135" text-anchor="middle"
                class="text-xs fill-current text-gray-600 dark:text-gray-300">R</text>

              <!-- Current Flow Animation -->
              <g class="animate-pulse">
                <circle cx="100" cy="150" r="3" fill="currentColor" class="text-red-500">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <path d="M 0,0 L 100,0 L 100,-50 L 100,0 L 100,50 L 100,0 L -100,0 Z" />
                  </animateMotion>
                </circle>
              </g>

              <!-- Wires -->
              <line x1="75" y1="150" x2="150" y2="150" stroke="currentColor" stroke-width="2"
                class="text-gray-700 dark:text-gray-300" />
              <line x1="190" y1="150" x2="350" y2="150" stroke="currentColor" stroke-width="2"
                class="text-gray-700 dark:text-gray-300" />
              <line x1="350" y1="150" x2="350" y2="100" stroke="currentColor" stroke-width="2"
                class="text-gray-700 dark:text-gray-300" />
              <line x1="350" y1="100" x2="50" y2="100" stroke="currentColor" stroke-width="2"
                class="text-gray-700 dark:text-gray-300" />
              <line x1="50" y1="100" x2="50" y2="125" stroke="currentColor" stroke-width="2"
                class="text-gray-700 dark:text-gray-300" />

              <!-- Formula Display -->
              <text x="200" y="50" text-anchor="middle" class="text-lg font-bold fill-current text-primary">V = I ×
                R</text>
              <text x="200" y="250" text-anchor="middle"
                class="text-sm fill-current text-gray-600 dark:text-gray-300">Ohm's Law</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculators Section -->
    <section id="calculators" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Electrical Calculators</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Interactive tools for all your electrical engineering
            calculations</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(calculator, index) in calculators" :key="index"
            class="group flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 cursor-pointer"
            @click="openCalculator(calculator.type)">
            <component :is="calculator.icon"
              class="h-12 w-12 text-primary group-hover:text-primary-dark transition-colors mb-6" />
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ calculator.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-4">{{ calculator.description }}</p>
            <div class="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">{{ calculator.formula }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulas Section -->
    <section id="formulas" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Essential Electrical Formulas</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Master the fundamental equations that power electrical
            engineering</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div v-for="(formula, index) in mainFormulas" :key="index"
            class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 group cursor-pointer"
            @click="animateFormula(index)">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ formula.name }}</h3>
            <div class="text-center">
              <div
                class="text-3xl font-bold text-primary dark:text-primary-light mb-2 font-mono group-hover:scale-110 transition-transform">
                {{ formula.equation }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ formula.description }}</div>
            </div>
          </div>
        </div>
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
          <!-- Interactive Formula Calculator -->
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Calculator</h3>
            <p class="text-gray-600 dark:text-gray-300">Select a formula above to start calculating</p>
          </div>

          <!-- Calculator Interface -->
          <div v-if="selectedFormula" class="max-w-md mx-auto">
            <div class="bg-primary/10 rounded-lg p-6 mb-6">
              <div class="text-2xl font-bold text-center text-primary mb-4 font-mono">{{ selectedFormula.equation }}
              </div>
              <div class="text-center text-gray-600 dark:text-gray-400">{{ selectedFormula.description }}</div>
            </div>

            <div class="space-y-4">
              <div v-for="(input, key) in selectedFormula.inputs" :key="key" class="flex items-center space-x-4">
                <label class="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">{{ input.label }}:</label>
                <input v-model.number="calculatorInputs[key]" :placeholder="input.placeholder"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  type="number" step="any">
                <span class="text-sm text-gray-500 dark:text-gray-400 w-12">{{ input.unit }}</span>
              </div>
            </div>

            <div v-if="calculatorResult !== null"
              class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div class="text-center">
                <div class="text-lg font-semibold text-green-800 dark:text-green-200">Result:</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ calculatorResult }} {{
                  selectedFormula.resultUnit }}</div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">⚡</div>
            <p class="text-gray-500 dark:text-gray-400">Click on a formula above to start calculating</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section id="tools" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Electrical Engineering Tools</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Professional tools and resources for electrical engineers
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div v-for="(tool, index) in engineeringTools" :key="index"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 border-2 border-primary/30 dark:border-primary-light/30 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 cursor-pointer"
            @click="openTool(tool.type)">
            <div
              class="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary-light/10 absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
            </div>
            <div class="relative">
              <div class="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 mx-auto">
                <component :is="tool.icon" class="h-8 w-8 text-primary" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">{{ tool.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-center mb-6">{{ tool.description }}</p>
              <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li v-for="feature in tool.features" :key="feature" class="flex items-center">
                  <CheckCircleIcon class="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {{ feature }}
                </li>
              </ul>
              <div class="mt-6 text-center">
                <span class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{{
                  tool.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-8">
          About Cyno Electric
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Cyno Electric is your comprehensive platform for electrical engineering calculations and tools.
          Whether you're a student learning the fundamentals or a professional engineer working on complex projects,
          our interactive calculators and formula references make electrical calculations simple and accurate.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2">50+</div>
            <div class="text-gray-600 dark:text-gray-300">Electrical Formulas</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2">15+</div>
            <div class="text-gray-600 dark:text-gray-300">Interactive Calculators</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-primary mb-2">100%</div>
            <div class="text-gray-600 dark:text-gray-300">Free to Use</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <svg class="h-12 w-12 mr-3 text-primary" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="4" class="animate-pulse" />
              <path d="M30 50 L45 35 L55 65 L70 50" stroke="currentColor" stroke-width="3" />
            </svg>
            <span class="text-2xl font-bold text-white">Cyno Electric</span>
          </div>
          <p class="text-base text-gray-400 mb-4">Empowering electrical engineers with powerful calculation tools</p>
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import {
  CalculatorIcon,
  BoltIcon,
  CpuChipIcon,
  LightBulbIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

const $colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const selectedFormula = ref(null)
const calculatorInputs = ref({})
const calculatorResult = ref(null)

const toggleDark = () => {
  $colorMode.value = $colorMode.value === 'dark' ? 'light' : 'dark'
}

// Calculator data
const calculators = [
  {
    icon: BoltIcon,
    title: "Ohm's Law",
    description: 'Calculate voltage, current, or resistance using the fundamental electrical law',
    formula: 'V = I × R',
    type: 'ohms-law'
  },
  {
    icon: LightBulbIcon,
    title: 'Power Calculator',
    description: 'Calculate electrical power using various combinations of V, I, and R',
    formula: 'P = V × I',
    type: 'power'
  },
  {
    icon: CpuChipIcon,
    title: 'Capacitor Calculator',
    description: 'Calculate capacitive reactance and impedance in AC circuits',
    formula: 'Xc = 1/(2πfC)',
    type: 'capacitor'
  },
  {
    icon: CalculatorIcon,
    title: 'Inductor Calculator',
    description: 'Calculate inductive reactance and impedance in AC circuits',
    formula: 'XL = 2πfL',
    type: 'inductor'
  }
]

// Main formulas for the formulas section
const mainFormulas = [
  {
    name: "Ohm's Law",
    equation: 'V = I × R',
    description: 'Voltage equals current times resistance',
    inputs: {
      current: { label: 'Current', placeholder: 'Enter current', unit: 'A' },
      resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' }
    },
    resultUnit: 'V',
    calculate: (inputs) => inputs.current * inputs.resistance
  },
  {
    name: 'Power Formula',
    equation: 'P = V × I',
    description: 'Power equals voltage times current',
    inputs: {
      voltage: { label: 'Voltage', placeholder: 'Enter voltage', unit: 'V' },
      current: { label: 'Current', placeholder: 'Enter current', unit: 'A' }
    },
    resultUnit: 'W',
    calculate: (inputs) => inputs.voltage * inputs.current
  },
  {
    name: 'Capacitive Reactance',
    equation: 'Xc = 1/(2πfC)',
    description: 'Reactance of a capacitor in AC circuits',
    inputs: {
      frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' },
      capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' }
    },
    resultUnit: 'Ω',
    calculate: (inputs) => 1 / (2 * Math.PI * inputs.frequency * inputs.capacitance)
  }
]

// Engineering tools
const engineeringTools = [
  {
    icon: CalculatorIcon,
    title: 'Circuit Analyzer',
    description: 'Analyze complex electrical circuits with multiple components',
    category: 'Analysis',
    features: ['Node voltage analysis', 'Mesh current analysis', 'Thevenin equivalent', 'Norton equivalent'],
    type: 'circuit-analyzer'
  },
  {
    icon: ChartBarIcon,
    title: 'Load Calculator',
    description: 'Calculate electrical loads for residential and commercial applications',
    category: 'Design',
    features: ['Demand factor calculation', 'Diversity factor', 'Load scheduling', 'Peak demand analysis'],
    type: 'load-calculator'
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Wire Sizing Tool',
    description: 'Determine proper wire gauge for electrical installations',
    category: 'Installation',
    features: ['Voltage drop calculation', 'Ampacity tables', 'Conduit fill', 'Temperature derating'],
    type: 'wire-sizing'
  },
  {
    icon: BoltIcon,
    title: 'Motor Calculator',
    description: 'Calculate motor parameters and performance characteristics',
    category: 'Motors',
    features: ['Starting current', 'Full load current', 'Efficiency calculation', 'Power factor'],
    type: 'motor-calculator'
  },
  {
    icon: LightBulbIcon,
    title: 'Lighting Design',
    description: 'Design lighting systems with proper illumination levels',
    category: 'Lighting',
    features: ['Lumen calculation', 'Fixture spacing', 'Energy efficiency', 'Daylight integration'],
    type: 'lighting-design'
  },
  {
    icon: DocumentTextIcon,
    title: 'Code Reference',
    description: 'Quick reference to electrical codes and standards',
    category: 'Reference',
    features: ['NEC articles', 'IEC standards', 'Safety requirements', 'Installation guidelines'],
    type: 'code-reference'
  }
]

// Methods
const openCalculator = (type) => {
  console.log('Opening calculator:', type)
  // Future implementation for opening specific calculators
}

const openTool = (type) => {
  console.log('Opening tool:', type)
  // Future implementation for opening specific tools
}

const animateFormula = (index) => {
  selectedFormula.value = mainFormulas[index]
  calculatorInputs.value = {}
  calculatorResult.value = null
}

// Watch for input changes and calculate result
watch(calculatorInputs, (newInputs) => {
  if (selectedFormula.value && Object.keys(newInputs).length > 0) {
    const requiredInputs = Object.keys(selectedFormula.value.inputs)
    const hasAllInputs = requiredInputs.every(key => newInputs[key] && !isNaN(newInputs[key]))

    if (hasAllInputs) {
      try {
        const result = selectedFormula.value.calculate(newInputs)
        calculatorResult.value = isFinite(result) ? result.toFixed(4) : 'Invalid'
      } catch (error) {
        calculatorResult.value = 'Error'
      }
    } else {
      calculatorResult.value = null
    }
  }
}, { deep: true })
</script>

<style>
html {
  scroll-behavior: smooth;
}

:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-dark {
  color: var(--tw-color-primary-dark) !important;
}

.text-primary-light {
  color: var(--tw-color-primary-light) !important;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.bg-primary-dark {
  background-color: var(--tw-color-primary-dark) !important;
}

.bg-primary-light {
  background-color: var(--tw-color-primary-light) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.border-primary-dark {
  border-color: var(--tw-color-primary-dark) !important;
}

.border-primary-light {
  border-color: var(--tw-color-primary-light) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary {
  --tw-gradient-to: var(--tw-color-primary) !important;
}

.from-primary-dark {
  --tw-gradient-from: var(--tw-color-primary-dark) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}
</style>
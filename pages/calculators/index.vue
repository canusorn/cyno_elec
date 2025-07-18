<template>
  <div
    :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <nav class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <!-- Cyno Electric SVG Icon -->
              <svg class="h-8 sm:h-10 mr-2 hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
                <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
                <circle cx="20" cy="20" r="3" fill="#7986CB"/>
                <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
              </svg>
              <span
                class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Cyno Electric</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Home</NuxtLink>
            <NuxtLink to="/calculators" class="text-primary dark:text-primary-light font-semibold transition-colors">
              Calculators</NuxtLink>
            <NuxtLink to="/contact"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Contact</NuxtLink>
            <button @click="toggleDark"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              <svg v-if="$colorMode === 'dark'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
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
            <NuxtLink to="/" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Home</NuxtLink>
            <NuxtLink to="/calculators" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-primary dark:text-primary-light font-semibold transition-colors rounded-md">
              Calculators</NuxtLink>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Contact</NuxtLink>
            <div class="px-3 py-2">
              <button @click="toggleDark"
                class="w-full text-left text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
                Toggle Dark Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Electrical Calculators
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional electrical engineering calculators for voltage, current, power, and circuit analysis
          </p>

          <!-- Filter Buttons -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="[
              'px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105',
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700'
            ]">
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculators Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="calculator in filteredCalculators" :key="calculator.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 flex flex-col">

            <!-- Calculator Icon/Visual -->
            <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
              <component :is="calculator.icon" class="w-24 h-24 text-primary group-hover:text-primary-dark transition-colors duration-300" />
              <div class="absolute top-4 left-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  calculator.difficulty === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    calculator.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]">
                  {{ calculator.difficulty }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span
                  class="bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  {{calculator.categoryId.map(catId => categories.find(cat => cat.id === catId)?.name || catId).join(', ')}}
                </span>
              </div>
              <!-- Formula Display -->
              <div class="absolute bottom-4 left-4 right-4">
                <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 text-center">
                  <span class="text-lg font-mono font-bold text-gray-900 dark:text-white">{{ calculator.formula }}</span>
                </div>
              </div>
            </div>

            <!-- Calculator Content -->
            <div class="p-6 flex flex-col flex-grow">
              <h3
                class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {{ calculator.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ calculator.description }}
              </p>

              <!-- Input/Output Units -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="unit in calculator.units" :key="unit"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                  {{ unit }}
                </span>
              </div>

              <!-- Calculator Stats -->
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 mt-auto">
                <div class="flex items-center">
                  <span class="text-xs">{{ calculator.type }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-xs">{{ calculator.category }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2 items-center">
                <NuxtLink :to="`/calculators/${calculator.type}`"
                  class="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-2 px-4 rounded-lg font-medium transition-all text-center">
                  Open Page
                </NuxtLink>
                <button @click="openCalculator(calculator.type)"
                  class="flex-1 bg-white dark:bg-gray-700 text-primary dark:text-primary-light border border-primary dark:border-primary-light py-2 px-4 rounded-lg font-medium transition-all hover:bg-primary/10 dark:hover:bg-primary/20 text-center">
                  Quick Calc
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCalculators.length === 0" class="text-center py-16">
          <CalculatorIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No calculators found in this category</h3>
          <p class="text-gray-600 dark:text-gray-300">Try selecting a different category or view all calculators</p>
        </div>
      </div>
    </section>

    <!-- Calculator Modal -->
    <div v-if="selectedCalculator" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click="closeCalculator">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedCalculator.title }}</h3>
          <button @click="closeCalculator" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center mb-4">
            <span class="text-2xl font-mono font-bold text-primary">{{ selectedCalculator.formula }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">{{ selectedCalculator.description }}</p>
        </div>

        <div class="space-y-4">
          <div v-for="(input, key) in selectedCalculator.inputs" :key="key">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ input.label }} ({{ input.unit }})
            </label>
            <input 
              v-model.number="calculatorInputs[key]"
              type="number" 
              step="any"
              :placeholder="input.placeholder"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div v-if="calculatorResult !== null" class="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg">
          <div class="text-center">
            <span class="text-sm text-gray-600 dark:text-gray-300">Result:</span>
            <div class="text-2xl font-bold text-primary mt-1">
              {{ calculatorResult }} {{ selectedCalculator.resultUnit }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <svg class="mx-auto h-12 mb-4 hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
            <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
            <circle cx="20" cy="20" r="3" fill="#7986CB"/>
            <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
          </svg>
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useColorMode } from '@vueuse/core'
import {
  CalculatorIcon,
  BoltIcon,
  CpuChipIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CogIcon,
  BeakerIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'CalculatorsPage',
  components: {
    CalculatorIcon,
    BoltIcon,
    CpuChipIcon,
    LightBulbIcon,
    WrenchScrewdriverIcon,
    ChartBarIcon,
    CogIcon,
    BeakerIcon
  },
  setup() {
    // SEO
    useHead({
      title: 'Electrical Calculators - Cyno Electric',
      meta: [
        { name: 'description', content: 'Professional electrical engineering calculators for voltage, current, power, and circuit analysis. Calculate Ohm\'s Law, power consumption, and more.' },
        { name: 'keywords', content: 'electrical calculator, ohms law, power calculator, voltage calculator, current calculator, electrical engineering' }
      ]
    })

    const $colorMode = useColorMode()
    
    return {
      $colorMode
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      selectedCategory: 'all',
      selectedCalculator: null,
      calculatorInputs: {},
      calculatorResult: null,
      
      // Categories
      categories: [
        { id: 'all', name: 'All' },
        { id: 'basic', name: 'Basic Laws' },
        { id: 'power', name: 'Power' },
        { id: 'ac-circuits', name: 'AC Circuits' },
        { id: 'dc-circuits', name: 'DC Circuits' },
        { id: 'motors', name: 'Motors' },
        { id: 'transformers', name: 'Transformers' },
        { id: 'lighting', name: 'Lighting' }
      ],
      
      // Calculator data
      calculators: [
        {
          id: 1,
          title: "Ohm's Law Calculator",
          description: 'Calculate voltage, current, or resistance using the fundamental electrical law V = I × R',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Basic',
          category: 'Fundamental',
          type: 'ohms-law',
          path: '/calculators/ohms-law',
          formula: 'V = I × R',
          icon: 'BoltIcon',
          units: ['V', 'A', 'Ω'],
          inputs: {
            current: { label: 'Current', placeholder: 'Enter current', unit: 'A' },
            resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' }
          },
          resultUnit: 'V',
          calculate: (inputs) => inputs.current * inputs.resistance
        },
        {
          id: 2,
          title: 'Power Calculator',
          description: 'Calculate electrical power using various combinations of voltage, current, and resistance',
          categoryId: ['power', 'basic'],
          difficulty: 'Basic',
          category: 'Power',
          type: 'power',
          path: '/calculators/power',
          formula: 'P = V × I',
          icon: 'LightBulbIcon',
          units: ['W', 'V', 'A'],
          inputs: {
            voltage: { label: 'Voltage', placeholder: 'Enter voltage', unit: 'V' },
            current: { label: 'Current', placeholder: 'Enter current', unit: 'A' }
          },
          resultUnit: 'W',
          calculate: (inputs) => inputs.voltage * inputs.current
        },
        {
          id: 3,
          title: 'Capacitive Reactance',
          description: 'Calculate the reactance of a capacitor in AC circuits',
          categoryId: ['ac-circuits'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'capacitive-reactance',
          path: '/calculators/capacitive-reactance',
          formula: 'Xc = 1/(2πfC)',
          icon: 'CpuChipIcon',
          units: ['Ω', 'Hz', 'F'],
          inputs: {
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' }
          },
          resultUnit: 'Ω',
          calculate: (inputs) => 1 / (2 * Math.PI * inputs.frequency * inputs.capacitance)
        },
        {
          id: 4,
          title: 'Inductive Reactance',
          description: 'Calculate the reactance of an inductor in AC circuits',
          categoryId: ['ac-circuits'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'inductive-reactance',
          path: '/calculators/inductive-reactance',
          formula: 'XL = 2πfL',
          icon: 'CogIcon',
          units: ['Ω', 'Hz', 'H'],
          inputs: {
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' },
            inductance: { label: 'Inductance', placeholder: 'Enter inductance', unit: 'H' }
          },
          resultUnit: 'Ω',
          calculate: (inputs) => 2 * Math.PI * inputs.frequency * inputs.inductance
        },
        {
          id: 5,
          title: 'Voltage Divider',
          description: 'Calculate output voltage in a voltage divider circuit',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Basic',
          category: 'Circuit Analysis',
          type: 'voltage-divider',
          path: '/calculators/voltage-divider',
          formula: 'Vout = Vin × (R2/(R1+R2))',
          icon: 'ChartBarIcon',
          units: ['V', 'Ω'],
          inputs: {
            inputVoltage: { label: 'Input Voltage', placeholder: 'Enter input voltage', unit: 'V' },
            r1: { label: 'Resistor 1', placeholder: 'Enter R1', unit: 'Ω' },
            r2: { label: 'Resistor 2', placeholder: 'Enter R2', unit: 'Ω' }
          },
          resultUnit: 'V',
          calculate: (inputs) => inputs.inputVoltage * (inputs.r2 / (inputs.r1 + inputs.r2))
        },
        {
          id: 6,
          title: 'LED Current Calculator',
          description: 'Calculate the required resistor value for LED circuits',
          categoryId: ['lighting', 'dc-circuits'],
          difficulty: 'Basic',
          category: 'Lighting',
          type: 'led-resistor',
          path: '/calculators/led-resistor',
          formula: 'R = (Vs - Vf) / If',
          icon: 'LightBulbIcon',
          units: ['Ω', 'V', 'A'],
          inputs: {
            supplyVoltage: { label: 'Supply Voltage', placeholder: 'Enter supply voltage', unit: 'V' },
            forwardVoltage: { label: 'LED Forward Voltage', placeholder: 'Enter LED Vf', unit: 'V' },
            forwardCurrent: { label: 'LED Forward Current', placeholder: 'Enter LED If', unit: 'A' }
          },
          resultUnit: 'Ω',
          calculate: (inputs) => (inputs.supplyVoltage - inputs.forwardVoltage) / inputs.forwardCurrent
        }
      ]
    }
  },
  computed: {
    filteredCalculators() {
      if (this.selectedCategory === 'all') {
        return this.calculators
      }
      return this.calculators.filter(calculator => calculator.categoryId.includes(this.selectedCategory))
    }
  },
  watch: {
    calculatorInputs: {
      handler(newInputs) {
        if (this.selectedCalculator && Object.keys(newInputs).length > 0) {
          const requiredInputs = Object.keys(this.selectedCalculator.inputs)
          const hasAllInputs = requiredInputs.every(key => newInputs[key] && !isNaN(newInputs[key]))
          
          if (hasAllInputs) {
            try {
              const result = this.selectedCalculator.calculate(newInputs)
              this.calculatorResult = isFinite(result) ? result.toFixed(4) : 'Invalid'
            } catch (error) {
              this.calculatorResult = 'Error'
            }
          } else {
            this.calculatorResult = null
          }
        }
      },
      deep: true
    }
  },
  methods: {
    toggleDark() {
      this.$colorMode = this.$colorMode === 'dark' ? 'light' : 'dark'
    },
    openCalculator(type) {
      const calculator = this.calculators.find(calc => calc.type === type)
      if (calculator) {
        this.selectedCalculator = calculator
        this.calculatorInputs = {}
        this.calculatorResult = null
      }
    },
    closeCalculator() {
      this.selectedCalculator = null
      this.calculatorInputs = {}
      this.calculatorResult = null
    },
    showFormula(calculator) {
      this.openCalculator(calculator.type)
    }
  }
}
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
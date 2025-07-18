<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

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
          <CategoryFilter 
            :categories="categories" 
            :selected-category="selectedCategory" 
            @category-changed="selectedCategory = $event" 
          />
        </div>
      </div>
    </section>

    <!-- Calculators Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CalculatorCard 
            v-for="calculator in filteredCalculators" 
            :key="calculator.id"
            :calculator="calculator"
            :categories="categories"
            @open-calculator="openCalculator"
          />
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
    <CalculatorModal 
      :calculator="selectedCalculator" 
      @close="closeCalculator" 
    />

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
  CogIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import CategoryFilter from '~/components/CategoryFilter.vue'
import CalculatorCard from '~/components/CalculatorCard.vue'
import CalculatorModal from '~/components/CalculatorModal.vue'

export default {
  name: 'CalculatorsIndex',
  components: {
    BoltIcon,
    LightBulbIcon,
    CpuChipIcon,
    CogIcon,
    ChartBarIcon,
    CalculatorIcon,
    NavigationBar,
    CategoryFilter,
    CalculatorCard,
    CalculatorModal
  },
  setup() {
    useHead({
      title: 'Electrical Calculators - Cyno Electric',
      meta: [
        { name: 'description', content: 'Comprehensive collection of electrical engineering calculators for Ohm\'s Law, power calculations, reactance, and more.' }
      ]
    })
    
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      selectedCategory: 'all',
      selectedCalculator: null,
      
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

  methods: {
    openCalculator(type) {
      const calculator = this.calculators.find(calc => calc.type === type)
      if (calculator) {
        this.selectedCalculator = calculator
      }
    },
    closeCalculator() {
      this.selectedCalculator = null
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
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

          <!-- Search Input -->
          <div class="mb-8 max-w-md mx-auto">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search calculators..."
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
            </div>
          </div>

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
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ searchQuery.trim() ? 'No calculators found for your search' : 'No calculators found in this category' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ searchQuery.trim() ? 'Try different search terms or clear the search to view all calculators' : 'Try selecting a different category or view all calculators' }}
          </p>
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
  ChartBarIcon,
  ClockIcon
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
    ClockIcon,
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
      searchQuery: '',
      
      // Categories
      categories: [
        { id: 'all', name: 'All' },
        { id: 'basic', name: 'Basic Laws' },
        { id: 'power', name: 'Power' },
        { id: 'ac-circuits', name: 'AC Circuits' },
        { id: 'dc-circuits', name: 'DC Circuits' },
        { id: 'motors', name: 'Motors' },
        { id: 'transformers', name: 'Transformers' },
        { id: 'lighting', name: 'Lighting' },
        { id: 'measurement', name: 'Measurement' }
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
        },
        {
          id: 7,
          title: 'Resistance Color Code',
          description: 'Decode resistor color bands and calculate resistance values',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Basic',
          category: 'Components',
          type: 'resistance-color-code',
          path: '/calculators/resistance-color-code',
          formula: 'Color Bands → Resistance',
          icon: 'BoltIcon',
          units: ['Ω', 'kΩ', 'MΩ'],
          inputs: {
            band1: { label: 'Band 1', placeholder: 'First digit' },
            band2: { label: 'Band 2', placeholder: 'Second digit' },
            band3: { label: 'Multiplier', placeholder: 'Multiplier' },
            band4: { label: 'Tolerance', placeholder: 'Tolerance' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 8,
          title: 'Resistor Series/Parallel',
          description: 'Calculate equivalent resistance for resistors in series or parallel configurations',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'resistor-series-parallel',
          path: '/calculators/resistor-series-parallel',
          formula: 'R_total = R1 + R2 + ... (series) | 1/R_total = 1/R1 + 1/R2 + ... (parallel)',
          icon: 'ChartBarIcon',
          units: ['Ω', 'kΩ', 'MΩ'],
          inputs: {
            resistors: { label: 'Resistors', placeholder: 'Enter resistor values' },
            mode: { label: 'Configuration', placeholder: 'Series or Parallel' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 9,
          title: 'Capacitance Calculator',
          description: 'Calculate equivalent capacitance for capacitors in series or parallel configurations',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'capacitance-calculator',
          path: '/calculators/capacitance-calculator',
          formula: 'C_total = C1 + C2 + ... (parallel) | 1/C_total = 1/C1 + 1/C2 + ... (series)',
          icon: 'CpuChipIcon',
          units: ['pF', 'nF', 'μF', 'mF', 'F'],
          inputs: {
            capacitors: { label: 'Capacitors', placeholder: 'Enter capacitor values' },
            mode: { label: 'Configuration', placeholder: 'Series or Parallel' }
          },
          resultUnit: 'F',
          calculate: () => 0
        },
        {
          id: 10,
          title: 'Impedance Calculator',
          description: 'Calculate total impedance in AC circuits with resistance, inductance, and capacitance',
          categoryId: ['ac-circuits'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'impedance-calculator',
          path: '/calculators/impedance-calculator',
          formula: 'Z = √(R² + (XL - XC)²)',
          icon: 'ChartBarIcon',
          units: ['Ω', 'Hz', 'H', 'F'],
          inputs: {
            resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' },
            inductance: { label: 'Inductance', placeholder: 'Enter inductance', unit: 'H' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' },
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 11,
          title: 'Inductance Calculator',
          description: 'Calculate equivalent inductance for inductors in series or parallel configurations',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'inductance-calculator',
          path: '/calculators/inductance-calculator',
          formula: 'L_total = L1 + L2 + ... (series) | 1/L_total = 1/L1 + 1/L2 + ... (parallel)',
          icon: 'CogIcon',
          units: ['pH', 'nH', 'μH', 'mH', 'H'],
          inputs: {
            inductors: { label: 'Inductors', placeholder: 'Enter inductor values' },
            mode: { label: 'Configuration', placeholder: 'Series or Parallel' }
          },
          resultUnit: 'H',
          calculate: () => 0
        },
        {
          id: 12,
          title: 'Battery Life Calculator',
          description: 'Calculate battery runtime and life based on capacity and current draw',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Basic',
          category: 'Components',
          type: 'battery-life',
          path: '/calculators/battery-life',
          formula: 'Battery Life = Capacity / Load Current',
          icon: 'LightBulbIcon',
          units: ['mAh', 'Ah', 'h', 'days'],
          inputs: {
            capacity: { label: 'Battery Capacity', placeholder: 'Enter capacity', unit: 'mAh' },
            current: { label: 'Load Current', placeholder: 'Enter current draw', unit: 'mA' },
            dutyCycle: { label: 'Duty Cycle', placeholder: 'Active time percentage' }
          },
          resultUnit: 'hours',
          calculate: () => 0
        },
        {
          id: 13,
          title: 'RC Time Constant Calculator',
          description: 'Calculate RC time constant and visualize capacitor charging/discharging curves',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'rc-time-constant',
          path: '/calculators/rc-time-constant',
          formula: 'τ = R × C',
          icon: 'ClockIcon',
          units: ['Ω', 'μF', 's', 'ms', 'μs'],
          inputs: {
            resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'μF' },
            voltage: { label: 'Source Voltage', placeholder: 'Enter voltage', unit: 'V' }
          },
          resultUnit: 'seconds',
          calculate: () => 0
        },
        {
          id: 14,
          title: 'Decibel Calculator',
          description: 'Convert between linear ratios and decibels for power, voltage, and current',
          categoryId: ['ac-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'decibel-calculator',
          path: '/calculators/decibel-calculator',
          formula: 'dB = 10×log₁₀(P₂/P₁) or dB = 20×log₁₀(V₂/V₁)',
          icon: 'ChartBarIcon',
          units: ['dB', 'W', 'V', 'A'],
          inputs: {
            input1: { label: 'Input Value', placeholder: 'Enter reference value' },
            input2: { label: 'Output Value', placeholder: 'Enter measured value' },
            type: { label: 'Calculator Type', placeholder: 'Power/Voltage/Current' }
          },
          resultUnit: 'dB',
          calculate: () => 0
        },
        {
          id: 15,
          title: 'Wheatstone Bridge Calculator',
          description: 'Calculate bridge balance and output voltage for precise resistance measurements',
          categoryId: ['basic', 'dc-circuits', 'measurement'],
          difficulty: 'Intermediate',
          category: 'Measurement',
          type: 'wheatstone-bridge',
          path: '/calculators/wheatstone-bridge',
          formula: 'Balance: R1×R4 = R2×R3',
          icon: 'ChartBarIcon',
          units: ['V', 'Ω'],
          inputs: {
            vin: { label: 'Input Voltage', placeholder: 'Enter Vin', unit: 'V' },
            r1: { label: 'R1 (Top Left)', placeholder: 'Enter R1', unit: 'Ω' },
            r2: { label: 'R2 (Top Right)', placeholder: 'Enter R2', unit: 'Ω' },
            r3: { label: 'R3 (Bottom Left)', placeholder: 'Enter R3', unit: 'Ω' },
            r4: { label: 'R4 (Bottom Right)', placeholder: 'Enter R4', unit: 'Ω' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 16,
          title: 'Power Factor Calculator',
          description: 'Calculate power factor, apparent power, and reactive power in AC systems with power triangle visualization',
          categoryId: ['ac-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'power-factor-calculator',
          path: '/calculators/power-factor-calculator',
          formula: 'PF = P/S = cos(φ)',
          icon: 'LightBulbIcon',
          units: ['W', 'VAR', 'VA'],
          inputs: {
            realPower: { label: 'Real Power', placeholder: 'Enter P', unit: 'W' },
            reactivePower: { label: 'Reactive Power', placeholder: 'Enter Q', unit: 'VAR' },
            frequency: { label: 'Frequency', placeholder: '50/60 Hz', unit: 'Hz' }
          },
          resultUnit: 'PF',
          calculate: () => 0
        },
        {
          id: 17,
          title: 'Energy Storage Calculator',
          description: 'Calculate energy stored in capacitors and inductors with visual diagrams and practical examples',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Components',
          type: 'energy-storage',
          path: '/calculators/energy-storage',
          formula: 'E = ½CV² (capacitor) | E = ½LI² (inductor)',
          icon: 'BoltIcon',
          units: ['J', 'mJ', 'μJ', 'Wh'],
          inputs: {
            voltage: { label: 'Voltage', placeholder: 'Enter voltage', unit: 'V' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' },
            current: { label: 'Current', placeholder: 'Enter current', unit: 'A' },
            inductance: { label: 'Inductance', placeholder: 'Enter inductance', unit: 'H' }
          },
          resultUnit: 'J',
          calculate: () => 0
        },
        {
          id: 18,
          title: 'Inductor Energy Calculator',
          description: 'Calculate energy stored in inductor magnetic fields with E=½LI² and flux visualization',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Components',
          type: 'inductor-energy',
          path: '/calculators/inductor-energy',
          formula: 'E = ½LI² | Φ = LI',
          icon: 'CogIcon',
          units: ['J', 'mJ', 'Wb', 'µH', 'mH', 'H'],
          inputs: {
            inductance: { label: 'Inductance', placeholder: 'Enter inductance', unit: 'H' },
            current: { label: 'Current', placeholder: 'Enter current', unit: 'A' },
            voltage: { label: 'Voltage', placeholder: 'Enter voltage', unit: 'V' },
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' }
          },
          resultUnit: 'J',
          calculate: () => 0
        }
      ]
    }
  },
  computed: {
    filteredCalculators() {
      let filtered = this.calculators
      
      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        filtered = filtered.filter(calculator => 
          calculator.title.toLowerCase().includes(query) ||
          calculator.description.toLowerCase().includes(query)
        )
      }
      
      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(calculator => calculator.categoryId.includes(this.selectedCategory))
      }
      
      return filtered
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
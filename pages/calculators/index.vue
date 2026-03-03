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
        { id: 'measurement', name: 'Measurement' },
        { id: 'rf', name: 'RF Engineering' }
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
        },
        {
          id: 19,
          title: 'Capacitor Series/Parallel',
          description: 'Calculate equivalent capacitance for capacitors in series or parallel with interactive circuit diagrams',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'capacitor-series-parallel',
          path: '/calculators/capacitor-series-parallel',
          formula: 'C_total = C₁ + C₂ + ... (parallel) | 1/C_total = 1/C₁ + 1/C₂ + ... (series)',
          icon: 'CpuChipIcon',
          units: ['pF', 'nF', 'µF', 'mF', 'F'],
          inputs: {
            capacitors: { label: 'Capacitors', placeholder: 'Enter capacitor values' },
            mode: { label: 'Configuration', placeholder: 'Series or Parallel' }
          },
          resultUnit: 'F',
          calculate: () => 0
        },
        {
          id: 20,
          title: 'Wire Gauge & Ampacity Calculator',
          description: 'Calculate wire properties, current capacity (ampacity), resistance, and voltage drop for electrical wiring',
          categoryId: ['basic', 'dc-circuits', 'measurement'],
          difficulty: 'Intermediate',
          category: 'Components',
          type: 'wire-gauge-calculator',
          path: '/calculators/wire-gauge-calculator',
          formula: 'AWG → Diameter, Area, Resistance, Ampacity',
          icon: 'ChartBarIcon',
          units: ['AWG', 'mm', 'mm²', 'Ω', 'A'],
          inputs: {
            awg: { label: 'Wire Gauge', placeholder: 'Select AWG' },
            material: { label: 'Material', placeholder: 'Copper/Aluminum' },
            length: { label: 'Length', placeholder: 'Enter wire length' },
            current: { label: 'Current', placeholder: 'Enter current' }
          },
          resultUnit: 'A',
          calculate: () => 0
        },
        {
          id: 21,
          title: 'Delta-Wye (Δ-Y) Transformation',
          description: 'Convert between Delta (Δ) and Wye (Y) resistor configurations for circuit simplification',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Advanced',
          category: 'Circuit Analysis',
          type: 'delta-wye',
          path: '/calculators/delta-wye',
          formula: 'Ra = (Rab×Rca)/(Rab+Rbc+Rca) | Rab = (Ra×Rb+Rb×Rc+Rc×Ra)/Rc',
          icon: 'ChartBarIcon',
          units: ['Ω', 'kΩ', 'MΩ'],
          inputs: {
            rab: { label: 'Rab', placeholder: 'Enter Rab', unit: 'Ω' },
            rbc: { label: 'Rbc', placeholder: 'Enter Rbc', unit: 'Ω' },
            rca: { label: 'Rca', placeholder: 'Enter Rca', unit: 'Ω' },
            ra: { label: 'Ra', placeholder: 'Enter Ra', unit: 'Ω' },
            rb: { label: 'Rb', placeholder: 'Enter Rb', unit: 'Ω' },
            rc: { label: 'Rc', placeholder: 'Enter Rc', unit: 'Ω' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 22,
          title: 'Three-Phase Power Calculator',
          description: 'Calculate power in three-phase systems with Star (Y) and Delta (Δ) connections for balanced and unbalanced loads',
          categoryId: ['power', 'ac-circuits'],
          difficulty: 'Advanced',
          category: 'AC Analysis',
          type: 'three-phase-power',
          path: '/calculators/three-phase-power',
          formula: 'P = √3 × VL × IL × PF',
          icon: 'BoltIcon',
          units: ['kW', 'kVA', 'kVAR', 'V', 'A'],
          inputs: {
            lineVoltage: { label: 'Line Voltage', placeholder: 'Enter line voltage', unit: 'V' },
            current: { label: 'Line Current', placeholder: 'Enter line current', unit: 'A' },
            powerFactor: { label: 'Power Factor', placeholder: 'Enter power factor', unit: 'pf' },
            connectionType: { label: 'Connection', placeholder: 'Star or Delta' }
          },
          resultUnit: 'kW',
          calculate: () => 0
        },
        {
          id: 23,
          title: 'LM317 Voltage Regulator Calculator',
          description: 'Design adjustable power supplies with the classic LM317 regulator. Calculate resistor values, output voltage, power dissipation, and heatsink requirements.',
          categoryId: ['dc-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'Power Supply',
          type: 'lm317-regulator',
          path: '/calculators/lm317-regulator',
          formula: 'Vout = 1.25 × (1 + R2/R1)',
          icon: 'CpuChipIcon',
          units: ['V', 'Ω', 'A', 'W'],
          inputs: {
            outputVoltage: { label: 'Output Voltage', placeholder: 'Enter desired output voltage', unit: 'V' },
            inputVoltage: { label: 'Input Voltage', placeholder: 'Enter input voltage', unit: 'V' },
            r1: { label: 'R1 (Program Resistor)', placeholder: 'Enter R1 value', unit: 'Ω' },
            loadCurrent: { label: 'Load Current', placeholder: 'Enter load current', unit: 'mA' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 24,
          title: 'AC Power Calculator',
          description: 'Calculate real power (P), reactive power (Q), apparent power (S), and power factor in AC circuits. Visualize power triangle and understand phase relationships.',
          categoryId: ['ac-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'ac-power-calculator',
          path: '/calculators/ac-power-calculator',
          formula: 'S² = P² + Q², PF = cos(φ)',
          icon: 'LightBulbIcon',
          units: ['W', 'VAR', 'VA', 'PF'],
          inputs: {
            voltageRMS: { label: 'RMS Voltage', placeholder: 'Enter RMS voltage', unit: 'V' },
            currentRMS: { label: 'RMS Current', placeholder: 'Enter RMS current', unit: 'A' },
            phaseAngle: { label: 'Phase Angle', placeholder: 'Enter phase angle', unit: 'degrees' }
          },
          resultUnit: 'W',
          calculate: () => 0
        },
        {
          id: 25,
          title: 'Op-Amp Gain Calculator',
          description: 'Calculate voltage gain for inverting, non-inverting, differential, and voltage follower op-amp configurations with interactive circuit diagrams.',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'opamp-gain-calculator',
          path: '/calculators/opamp-gain-calculator',
          formula: 'A_v = -R_f/R_in (inv) | A_v = 1+R2/R1 (non-inv)',
          icon: 'CpuChipIcon',
          units: ['V/V', 'dB', 'Ω'],
          inputs: {
            config: { label: 'Configuration', placeholder: 'Select amplifier type' },
            rin: { label: 'R_in / R1', placeholder: 'Enter input resistor', unit: 'Ω' },
            rf: { label: 'R_f / R2', placeholder: 'Enter feedback resistor', unit: 'Ω' }
          },
          resultUnit: 'V/V',
          calculate: () => 0
        },
        {
          id: 26,
          title: 'Filter Design Calculator',
          description: 'Design RC, RL, and LC filters. Calculate component values for low-pass, high-pass, band-pass, and band-stop filters with frequency response visualization.',
          categoryId: ['ac-circuits', 'basic'],
          difficulty: 'Intermediate',
          category: 'AC Analysis',
          type: 'filter-design-calculator',
          path: '/calculators/filter-design-calculator',
          formula: 'fc = 1/(2πRC) | fc = R/(2πL) | fc = 1/(2π√LC)',
          icon: 'ChartBarIcon',
          units: ['Hz', 'Ω', 'F', 'H'],
          inputs: {
            filterType: { label: 'Filter Type', placeholder: 'LPF, HPF, BPF, BSF' },
            circuitType: { label: 'Circuit', placeholder: 'RC, RL, LC' },
            cutoffFreq: { label: 'Cutoff Frequency', placeholder: 'Enter fc', unit: 'Hz' },
            component: { label: 'C or L', placeholder: 'Enter C or L', unit: 'F/H' }
          },
          resultUnit: 'Ω/F',
          calculate: () => 0
        },
        {
          id: 27,
          title: '7805 Voltage Regulator Calculator',
          description: 'Design power supplies with the classic 7805 linear regulator. Calculate component values, power dissipation, efficiency, and thermal requirements for 5V regulation.',
          categoryId: ['dc-circuits', 'power'],
          difficulty: 'Beginner',
          category: 'Power Supply',
          type: 'regulator-7805',
          path: '/calculators/regulator-7805',
          formula: 'P = (Vin - Vout) × Iout',
          icon: 'BoltIcon',
          units: ['V', 'mA', 'W', '°C'],
          inputs: {
            inputVoltage: { label: 'Input Voltage', placeholder: 'Enter input voltage (7-24V)', unit: 'V' },
            outputCurrent: { label: 'Output Current', placeholder: 'Enter load current', unit: 'mA' }
          },
          resultUnit: 'W',
          calculate: () => 0
        },
        {
          id: 28,
          title: 'LED Array Calculator',
          description: 'Design series, parallel, and mixed LED arrays with proper current-limiting resistors. Calculate resistor values, power ratings, and total power consumption for any LED configuration.',
          categoryId: ['lighting', 'dc-circuits'],
          difficulty: 'Beginner',
          category: 'Lighting',
          type: 'led-array',
          path: '/calculators/led-array',
          formula: 'R = (Vsource - Vled) / Iled',
          icon: 'LightBulbIcon',
          units: ['Ω', 'V', 'mA', 'W'],
          inputs: {
            voltageSource: { label: 'Source Voltage', placeholder: 'Enter source voltage', unit: 'V' },
            ledForwardVoltage: { label: 'LED Forward Voltage', placeholder: 'Enter LED Vf', unit: 'V' },
            ledCurrent: { label: 'LED Current', placeholder: 'Enter LED current', unit: 'mA' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 29,
          title: 'LED Series Resistor Calculator',
          description: 'Calculate the correct series resistor for single or multiple LEDs in series. Supports multiple LED colors, automatic standard resistor value selection, power dissipation calculation, and efficiency analysis.',
          categoryId: ['lighting', 'dc-circuits'],
          difficulty: 'Beginner',
          category: 'Lighting',
          type: 'led-series-resistor',
          path: '/calculators/led-series-resistor',
          formula: 'R = (Vs - Vf × N) / If',
          icon: 'LightBulbIcon',
          units: ['Ω', 'V', 'mA', 'W'],
          inputs: {
            supplyVoltage: { label: 'Supply Voltage', placeholder: 'Enter supply voltage', unit: 'V' },
            ledCount: { label: 'LED Count', placeholder: 'Number of LEDs in series', unit: '' },
            ledColor: { label: 'LED Color', placeholder: 'Select LED color', unit: '' },
            forwardCurrent: { label: 'Forward Current', placeholder: 'Enter LED current', unit: 'mA' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 30,
          title: 'RMS & Peak Voltage Calculator',
          description: 'Bidirectional conversion between RMS, Peak, and Peak-to-Peak voltages for sine, square, triangle, and sawtooth waveforms.',
          categoryId: ['measurement', 'ac-circuits'],
          difficulty: 'Intermediate',
          category: 'Measurement',
          type: 'rms-peak-calculator',
          path: '/calculators/rms-peak-calculator',
          formula: 'Vrms = Vpeak/√2 (sine)',
          icon: 'ChartBarIcon',
          units: ['V', 'Hz'],
          inputs: {
            voltage: { label: 'Voltage', placeholder: 'Enter voltage value', unit: 'V' },
            inputType: { label: 'Input Type', placeholder: 'RMS, Peak, or Peak-to-Peak' },
            waveform: { label: 'Waveform', placeholder: 'Sine, Square, Triangle, Sawtooth' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 31,
          title: 'Heatsink Thermal Design Calculator',
          description: 'Calculate thermal resistance, temperature rise, and heatsink requirements for electronic components and power devices with junction temperature analysis.',
          categoryId: ['power', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Power',
          type: 'heatsink-thermal',
          path: '/calculators/heatsink-thermal',
          formula: 'ΔT = P × Rθja',
          icon: 'BoltIcon',
          units: ['W', '°C', '°C/W'],
          inputs: {
            powerDissipation: { label: 'Power Dissipation', placeholder: 'Enter power', unit: 'W' },
            ambientTemp: { label: 'Ambient Temperature', placeholder: 'Enter ambient temp', unit: '°C' },
            thermalResistance: { label: 'Thermal Resistance', placeholder: 'Enter Rθ', unit: '°C/W' }
          },
          resultUnit: '°C',
          calculate: () => 0
        },
        {
          id: 32,
          title: 'RL Time Constant Calculator',
          description: 'Calculate the time constant and analyze transient response of resistor-inductor (RL) circuits including charging and discharging phases.',
          categoryId: ['dc-circuits', 'basic'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'rl-time-constant',
          path: '/calculators/rl-time-constant',
          formula: 'τ = L / R',
          icon: 'ClockIcon',
          units: ['ms', 'Ω', 'mH'],
          inputs: {
            resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' },
            inductance: { label: 'Inductance', placeholder: 'Enter inductance', unit: 'mH' },
            time: { label: 'Time', placeholder: 'Enter time', unit: 'ms' }
          },
          resultUnit: 'ms',
          calculate: () => 0
        },
        {
          id: 33,
          title: 'Impedance Matching Calculator',
          description: 'Design matching networks (L, Pi, T, transformer) for maximum power transfer. Calculate reflection coefficient, VSWR, return loss, and component values.',
          categoryId: ['ac-circuits', 'rf'],
          difficulty: 'Advanced',
          category: 'RF Engineering',
          type: 'impedance-matching',
          path: '/calculators/impedance-matching',
          formula: 'Γ = (Zl-Zs)/(Zl+Zs)',
          icon: 'ChartBarIcon',
          units: ['Ω', 'nH', 'pF'],
          inputs: {
            sourceImpedance: { label: 'Source Z', placeholder: 'Enter source impedance', unit: 'Ω' },
            loadImpedance: { label: 'Load Z', placeholder: 'Enter load impedance', unit: 'Ω' },
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'MHz' },
            networkType: { label: 'Network Type', placeholder: 'L, Pi, T, Transformer' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 34,
          title: 'Series/Parallel Calculator',
          description: 'Calculate total resistance, capacitance, and inductance for components in series or parallel configurations with interactive circuit diagrams.',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'series-parallel-calculator',
          path: '/calculators/series-parallel-calculator',
          formula: 'R_total = R₁ + R₂ + ... (series) | 1/R_total = 1/R₁ + 1/R₂ + ... (parallel)',
          icon: 'ChartBarIcon',
          units: ['Ω', 'F', 'H'],
          inputs: {
            circuitType: { label: 'Circuit Type', placeholder: 'Series or Parallel' },
            componentType: { label: 'Component Type', placeholder: 'Resistor/Capacitor/Inductor' },
            components: { label: 'Component Values', placeholder: 'Enter values' }
          },
          resultUnit: 'Ω/F/H',
          calculate: () => 0
        },
        {
          id: 41,
          title: 'Inductor Series/Parallel Calculator',
          description: 'Calculate equivalent inductance for inductors in series and parallel combinations with interactive visualization',
          categoryId: ['basic', 'dc-circuits', 'inductors'],
          difficulty: 'Intermediate',
          category: 'Inductors',
          type: 'inductor-series-parallel',
          path: '/calculators/inductor-series-parallel',
          formula: 'L_series = L₁ + L₂ + ... | L_parallel = 1/(1/L₁ + 1/L₂ + ...)',
          icon: 'LightningBoltIcon',
          units: ['pH', 'nH', 'μH', 'mH', 'H'],
          inputs: {
            inductors: { label: 'Inductors', placeholder: 'Enter inductor values' },
            configuration: { label: 'Configuration', placeholder: 'Series or Parallel' }
          },
          resultUnit: 'H',
          calculate: () => 0
        },
        {
          id: 42,
          title: 'Antenna Resonant Frequency Calculator',
          description: 'Calculate resonant length and frequency for various antenna types (dipole, monopole, loop) with amateur radio band reference',
          categoryId: ['rf', 'ac-circuits'],
          difficulty: 'Intermediate',
          category: 'RF Engineering',
          type: 'antenna-resonant-frequency',
          path: '/calculators/antenna-resonant-frequency',
          formula: 'λ = c/f | L = λ × VF × multiplier',
          icon: 'ChartBarIcon',
          units: ['Hz', 'kHz', 'MHz', 'GHz', 'm', 'cm'],
          inputs: {
            frequency: { label: 'Frequency', placeholder: 'Enter frequency' },
            antennaType: { label: 'Antenna Type', placeholder: 'Dipole/Monopole/Loop' },
            velocityFactor: { label: 'Velocity Factor', placeholder: '0.5-1.0' }
          },
          resultUnit: 'm',
          calculate: () => 0
        },
        {
          id: 43,
          title: 'Current Divider Calculator',
          description: 'Calculate how current splits in parallel circuits using the Current Divider Rule with real-time visualization and multiple branch support',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Circuit Analysis',
          type: 'current-divider',
          path: '/calculators/current-divider',
          formula: 'Iₙ = I_total × (R_eq / Rₙ)',
          icon: 'ChartBarIcon',
          units: ['A', 'Ω', 'V'],
          inputs: {
            voltage: { label: 'Source Voltage', placeholder: 'Enter voltage', unit: 'V' },
            branches: { label: 'Branch Resistances', placeholder: 'Enter resistances', unit: 'Ω' }
          },
          resultUnit: 'A',
          calculate: () => 0
        },
        {
          id: 44,
          title: 'Rectifier Performance Calculator',
          description: 'Analyze rectifier circuits with precision - calculate DC voltage, ripple factor, and efficiency for half-wave and full-wave rectifiers with filter capacitors',
          categoryId: ['ac-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'Power Electronics',
          type: 'rectifier-performance',
          path: '/calculators/rectifier-performance',
          formula: 'V_dc = V_m/π (half-wave) | V_dc = 2V_m/π (full-wave)',
          icon: 'BoltIcon',
          units: ['V', 'A', 'Ω', 'µF'],
          inputs: {
            rectifierType: { label: 'Rectifier Type', placeholder: 'Half-wave/Full-wave' },
            peakVoltage: { label: 'Peak Voltage (V_m)', placeholder: 'Enter peak voltage', unit: 'V' },
            diodeDrop: { label: 'Diode Forward Voltage', placeholder: 'Enter voltage drop', unit: 'V' },
            loadResistance: { label: 'Load Resistance', placeholder: 'Enter load resistance', unit: 'Ω' },
            capacitorFilter: { label: 'Filter Capacitor', placeholder: 'Enter capacitance', unit: 'µF' },
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 45,
          title: 'Voltage Level Converter Calculator',
          description: 'Calculate resistor values for bidirectional logic level conversion between different voltage domains (1.8V, 3.3V, 5V)',
          categoryId: ['dc-circuits', 'basic'],
          difficulty: 'Intermediate',
          category: 'Digital Logic',
          type: 'voltage-level-converter',
          path: '/calculators/voltage-level-converter',
          formula: 'MOSFET Bidirectional Level Shifter',
          icon: 'BoltIcon',
          units: ['V', 'Ω', 'mA'],
          inputs: {
            lowVoltage: { label: 'Low Voltage (V_LV)', placeholder: 'Enter low voltage', unit: 'V' },
            highVoltage: { label: 'High Voltage (V_HV)', placeholder: 'Enter high voltage', unit: 'V' },
            pullupResistor: { label: 'Pull-up Resistor', placeholder: 'Enter resistance', unit: 'Ω' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 46,
          title: 'RC Low Pass Filter Calculator',
          description: 'Calculate cutoff frequency, time constant, and frequency response for RC low pass filters with interactive Bode plot',
          categoryId: ['ac-circuits', 'basic'],
          difficulty: 'Intermediate',
          category: 'Filter Design',
          type: 'rc-low-pass-filter',
          path: '/calculators/rc-low-pass-filter',
          formula: 'fc = 1 / (2πRC)',
          icon: 'ChartBarIcon',
          units: ['Hz', 'Ω', 'F'],
          inputs: {
            resistance: { label: 'Resistance', placeholder: 'Enter resistance', unit: 'Ω' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' }
          },
          resultUnit: 'Hz',
          calculate: () => 0
        },
        {
          id: 47,
          title: '78xx Regulator Design Calculator',
          description: 'Complete design tool for 78xx series linear voltage regulators with component selection and thermal analysis',
          categoryId: ['dc-circuits', 'power'],
          difficulty: 'Intermediate',
          category: 'Power Supply',
          type: '78xx-regulator-design',
          path: '/calculators/78xx-regulator-design',
          formula: 'P = (Vin - Vout) × Iout',
          icon: 'BoltIcon',
          units: ['V', 'A', 'W'],
          inputs: {
            inputVoltage: { label: 'Input Voltage', placeholder: 'Enter input voltage', unit: 'V' },
            outputCurrent: { label: 'Output Current', placeholder: 'Enter output current', unit: 'A' }
          },
          resultUnit: 'W',
          calculate: () => 0
        },
        {
          id: 48,
          title: 'Period ↔ Frequency Converter',
          description: 'Convert between period (T) and frequency (f) with real-time calculation and waveform visualization',
          categoryId: ['basic', 'ac-circuits'],
          difficulty: 'Basic',
          category: 'Fundamental',
          type: 'period-frequency-converter',
          path: '/calculators/period-frequency-converter',
          formula: 'f = 1 / T, T = 1 / f',
          icon: 'ClockIcon',
          units: ['Hz', 's'],
          inputs: {
            frequency: { label: 'Frequency', placeholder: 'Enter frequency', unit: 'Hz' },
            period: { label: 'Period', placeholder: 'Enter period', unit: 's' }
          },
          resultUnit: 'Hz/s',
          calculate: () => 0
        },
        {
          id: 49,
          title: 'Ripple Voltage Calculator',
          description: 'Calculate ripple voltage for power supply filtering in full-wave and half-wave rectifier circuits with waveform visualization',
          categoryId: ['power', 'ac-circuits', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Power Supply',
          type: 'ripple-voltage',
          path: '/calculators/ripple-voltage',
          formula: 'Vripple = Iload / (f × C)',
          icon: 'BoltIcon',
          units: ['V', 'A', 'F', 'Hz'],
          inputs: {
            loadCurrent: { label: 'Load Current', placeholder: 'Enter load current', unit: 'A' },
            capacitance: { label: 'Capacitance', placeholder: 'Enter capacitance', unit: 'F' },
            rectifierType: { label: 'Rectifier Type', placeholder: 'Full-wave or Half-wave' },
            frequency: { label: 'Mains Frequency', placeholder: '50Hz or 60Hz', unit: 'Hz' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 50,
          title: 'Voltage Sag Calculator',
          description: 'Calculate voltage drop in power lines and ensure proper voltage regulation for electrical installations',
          categoryId: ['power', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Power Distribution',
          type: 'voltage-sag',
          path: '/calculators/voltage-sag',
          formula: 'Vdrop = I × (ρ × L / A)',
          icon: 'BoltIcon',
          units: ['V', 'A', 'Ω', 'm', 'mm²'],
          inputs: {
            sourceVoltage: { label: 'Source Voltage', placeholder: 'Enter source voltage', unit: 'V' },
            current: { label: 'Load Current', placeholder: 'Enter load current', unit: 'A' },
            material: { label: 'Wire Material', placeholder: 'Copper, Aluminum, etc.' },
            length: { label: 'Wire Length', placeholder: 'Enter wire length', unit: 'm' },
            awg: { label: 'Wire Gauge', placeholder: 'AWG number', unit: 'AWG' },
            powerFactor: { label: 'Power Factor', placeholder: '0.5 - 1.0', unit: '' }
          },
          resultUnit: 'V',
          calculate: () => 0
        },
        {
          id: 51,
          title: 'Motor HP & Torque Calculator',
          description: 'Calculate motor horsepower, torque, RPM, efficiency, and current draw with interactive motor visualization',
          categoryId: ['motors', 'power'],
          difficulty: 'Intermediate',
          category: 'Motors',
          type: 'motor-hp-torque',
          path: '/calculators/motor-hp-torque',
          formula: 'HP = (Torque × RPM) ÷ 5252',
          icon: 'CogIcon',
          units: ['HP', 'lb-ft', 'RPM', 'A', 'V'],
          inputs: {
            torque: { label: 'Torque', placeholder: 'Enter torque', unit: 'lb-ft' },
            rpm: { label: 'Speed', placeholder: 'Enter RPM', unit: 'RPM' },
            voltage: { label: 'Voltage', placeholder: 'Enter voltage', unit: 'V' },
            efficiency: { label: 'Efficiency', placeholder: '85', unit: '%' }
          },
          resultUnit: 'HP',
          calculate: () => 0
        },
        {
          id: 52,
          title: 'Battery Pack Designer',
          description: 'Design series and parallel battery pack configurations. Calculate voltage, capacity, energy, and runtime for custom battery packs',
          categoryId: ['power', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Power Storage',
          type: 'battery-pack',
          path: '/calculators/battery-pack',
          formula: 'V_series = V_cell × N | Ah_parallel = Ah_cell × N',
          icon: 'BoltIcon',
          units: ['V', 'Ah', 'Wh', 'cells'],
          inputs: {
            cellType: { label: 'Cell Type', placeholder: '18650, 21700, etc.', unit: '' },
            seriesCells: { label: 'Series Cells', placeholder: 'Number of cells in series', unit: 'S' },
            parallelCells: { label: 'Parallel Cells', placeholder: 'Number of cells in parallel', unit: 'P' },
            loadCurrent: { label: 'Load Current', placeholder: 'For runtime calculation', unit: 'A' }
          },
          resultUnit: 'Wh',
          calculate: () => 0
        },
        {
          id: 53,
          title: 'Transmission Line Calculator',
          description: 'Calculate characteristic impedance, propagation delay, and electrical length for microstrip and stripline PCB transmission lines. Support for FR-4 and high-frequency materials.',
          categoryId: ['rf', 'measurement'],
          difficulty: 'Advanced',
          category: 'RF Engineering',
          type: 'transmission-line',
          path: '/calculators/transmission-line',
          formula: 'Z₀ ≈ 87/√(εr+1.41) × ln(5.98H/(0.8W+T))',
          icon: 'ChartBarIcon',
          units: ['Ω', 'mils', 'ps/in', 'εr'],
          inputs: {
            lineType: { label: 'Line Type', placeholder: 'Microstrip or Stripline', unit: '' },
            traceWidth: { label: 'Trace Width', placeholder: 'Width of trace', unit: 'mils' },
            substrateHeight: { label: 'Substrate Height', placeholder: 'Distance to ground', unit: 'mils' },
            dielectricConstant: { label: 'Dielectric Constant', placeholder: 'εr (FR-4 ≈ 4.3)', unit: 'εr' }
          },
          resultUnit: 'Ω',
          calculate: () => 0
        },
        {
          id: 54,
          title: 'Power Factor Correction Calculator',
          description: 'Calculate the required capacitor size for power factor correction in AC electrical systems. Determine kVAR requirements, capacitance values, current reduction, and potential cost savings from improved power factor.',
          categoryId: ['power', 'ac-circuits'],
          difficulty: 'Intermediate',
          category: 'Power Systems',
          type: 'power-factor-correction',
          path: '/calculators/power-factor-correction',
          formula: 'Qc = P × (tan θ₁ - tan θ₂)',
          icon: 'LightBulbIcon',
          units: ['kW', 'kVAR', 'µF', 'A'],
          inputs: {
            realPower: { label: 'Real Power', placeholder: 'Load power', unit: 'kW' },
            currentPF: { label: 'Current PF', placeholder: '0.5 - 0.95', unit: '' },
            targetPF: { label: 'Target PF', placeholder: '0.85 - 0.99', unit: '' },
            systemVoltage: { label: 'System Voltage', placeholder: 'Line-to-line', unit: 'V' },
            frequency: { label: 'Frequency', placeholder: '50 or 60 Hz', unit: 'Hz' }
          },
          resultUnit: 'kVAR',
          calculate: () => 0
        },
        {
          id: 59,
          title: 'Diode Forward Bias Calculator',
          description: 'Calculate diode current, voltage drop, and power dissipation using the Shockley equation. Support for Silicon, Germanium, Schottky, and various LED types.',
          categoryId: ['basic', 'dc-circuits'],
          difficulty: 'Intermediate',
          category: 'Semiconductors',
          type: 'diode-forward-bias',
          path: '/calculators/diode-forward-bias',
          formula: 'I = Is(e^(Vd/nVt) - 1)',
          icon: 'BoltIcon',
          units: ['A', 'V', 'Ω', '°C'],
          inputs: {
            supplyVoltage: { label: 'Supply Voltage', placeholder: 'Enter supply voltage', unit: 'V' },
            seriesResistance: { label: 'Series Resistance', placeholder: 'Enter resistance', unit: 'Ω' },
            diodeType: { label: 'Diode Type', placeholder: 'Select diode type' },
            temperature: { label: 'Temperature', placeholder: 'Enter temperature', unit: '°C' }
          },
          resultUnit: 'A',
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
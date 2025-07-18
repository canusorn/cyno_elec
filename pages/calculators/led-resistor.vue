<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
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
            <NuxtLink to="/calculators"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Calculators</NuxtLink>
            <NuxtLink to="/contact"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Contact</NuxtLink>
            <button @click="toggleDark"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
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
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
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
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <LightBulbIcon class="h-16 w-16 text-primary" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            LED Current Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate the required resistor value for LED circuits
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="animated-formula" ref="formulaContainer">
              <span class="formula-part resistor" ref="resistorElement">R</span>
              <span class="formula-operator">=</span>
              <span class="formula-part fraction">(</span>
              <span class="formula-part supply" ref="supplyElement">Vs</span>
              <span class="formula-operator">-</span>
              <span class="formula-part forward" ref="forwardElement">Vf</span>
              <span class="formula-part fraction">)</span>
              <span class="formula-operator">/</span>
              <span class="formula-part current" ref="currentElement">If</span>
            </div>
          </div>
          
          <!-- Animated LED Circuit Visualization -->
          <div class="mt-8 flex justify-center">
            <div class="led-animation" ref="ledContainer">
              <svg width="400" height="300" viewBox="0 0 400 300" class="text-primary">
                <!-- Supply voltage source -->
                <g class="voltage-source">
                  <rect x="50" y="120" width="40" height="60" fill="none" stroke="currentColor" stroke-width="3"/>
                  <text x="70" y="155" class="text-sm fill-current text-center font-bold">Vs</text>
                  <text x="70" y="200" class="text-xs fill-current text-center voltage-value" ref="vsDisplay">9V</text>
                </g>
                
                <!-- Wires -->
                <line x1="90" y1="130" x2="180" y2="130" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="50" y1="170" x2="20" y2="170" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="20" y1="170" x2="20" y2="250" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="20" y1="250" x2="320" y2="250" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Current limiting resistor -->
                <g class="current-resistor">
                  <rect x="180" y="120" width="80" height="20" fill="none" stroke="currentColor" stroke-width="3" class="resistor-body"/>
                  <path d="M185,130 L195,120 L205,140 L215,120 L225,140 L235,120 L245,140 L255,120" 
                        stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="220" y="110" class="text-xs fill-current text-center">R</text>
                  <text x="220" y="155" class="text-xs fill-current text-center resistor-value" ref="rDisplay">330Ω</text>
                </g>
                
                <line x1="260" y1="130" x2="320" y2="130" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- LED -->
                <g class="led-symbol">
                  <!-- LED body -->
                  <circle cx="320" cy="190" r="30" fill="none" stroke="currentColor" stroke-width="3" class="led-body"/>
                  <!-- LED triangle (diode symbol) -->
                  <path d="M305,190 L335,175 L335,205 Z" fill="currentColor" opacity="0.3" class="led-triangle"/>
                  <line x1="335" y1="175" x2="335" y2="205" stroke="currentColor" stroke-width="3"/>
                  
                  <!-- Light rays -->
                  <g class="light-rays">
                    <path d="M350,170 L365,155" stroke="#FFD700" stroke-width="2" class="light-ray">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
                    </path>
                    <path d="M350,190 L370,190" stroke="#FFD700" stroke-width="2" class="light-ray">
                      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.3s"/>
                    </path>
                    <path d="M350,210 L365,225" stroke="#FFD700" stroke-width="2" class="light-ray">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" begin="0.6s"/>
                    </path>
                  </g>
                  
                  <text x="320" y="235" class="text-xs fill-current text-center">LED</text>
                  <text x="320" y="250" class="text-xs fill-current text-center led-voltage" ref="vfDisplay">2V</text>
                </g>
                
                <line x1="320" y1="130" x2="320" y2="160" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="320" y1="220" x2="320" y2="250" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Current flow indicators -->
                <g class="current-flow">
                  <circle r="3" fill="#FFD700" class="current-particle">
                    <animateMotion dur="3s" repeatCount="indefinite" 
                      path="M90,130 L180,130 L260,130 L320,130 L320,250 L20,250 L20,170 L50,170"/>
                  </circle>
                  <text x="150" y="115" class="text-xs fill-current current-label" ref="currentDisplay">If = 20mA</text>
                </g>
                
                <!-- Voltage drop indicators -->
                <g class="voltage-drops">
                  <!-- Voltage across resistor -->
                  <path d="M180,100 Q220,80 260,100" stroke="#FF6B6B" stroke-width="2" fill="none" class="voltage-arc"/>
                  <text x="220" y="75" class="text-xs fill-current voltage-label" ref="vrDisplay">VR = 7V</text>
                  
                  <!-- Voltage across LED -->
                  <path d="M290,190 Q320,170 350,190" stroke="#4CAF50" stroke-width="2" fill="none" class="voltage-arc"/>
                  <text x="320" y="165" class="text-xs fill-current voltage-label">Vf</text>
                </g>
                
                <!-- Power dissipation indicator -->
                <g class="power-indicator">
                  <rect x="180" y="160" width="80" height="15" fill="#FF6B6B" opacity="0.3" class="power-bar">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
                  </rect>
                  <text x="220" y="185" class="text-xs fill-current power-label" ref="powerDisplay">P = 0.14W</text>
                </g>
                
                <!-- Labels -->
                <text x="200" y="25" class="text-sm fill-current text-center font-bold">LED Current Limiting Circuit</text>
                <text x="200" y="285" class="text-xs fill-current text-center">R = (Vs - Vf) / If</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Values</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Supply Voltage (Vs) - Volts
                  </label>
                  <input 
                    v-model.number="inputs.supplyVoltage"
                    type="number" 
                    step="any"
                    placeholder="Enter supply voltage (e.g., 5, 12)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LED Forward Voltage (Vf) - Volts
                  </label>
                  <input 
                    v-model.number="inputs.forwardVoltage"
                    type="number" 
                    step="any"
                    placeholder="Enter LED forward voltage (e.g., 2.1, 3.3)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Typical values: Red LED ~2.0V, Green/Blue LED ~3.0-3.3V, White LED ~3.0-3.6V
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LED Forward Current (If) - Amperes
                  </label>
                  <input 
                    v-model.number="inputs.forwardCurrent"
                    type="number" 
                    step="any"
                    placeholder="Enter LED forward current (e.g., 0.02 for 20mA)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Typical values: Standard LED ~0.02A (20mA), High-power LED ~0.35A (350mA)
                  </p>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              <div class="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg p-6">
                <div class="text-center">
                  <span class="text-lg text-gray-600 dark:text-gray-300">Required Resistor (R)</span>
                  <div class="text-4xl font-bold text-primary mt-2">
                    {{ result !== null ? result : '---' }} Ω
                  </div>
                  <div v-if="result !== null" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    ({{ inputs.supplyVoltage }} - {{ inputs.forwardVoltage }}) / {{ inputs.forwardCurrent }} = {{ result }} Ω
                  </div>
                  <div v-if="powerDissipation !== null" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Power dissipation: {{ powerDissipation }} W
                  </div>
                </div>
              </div>

              <!-- Circuit Diagram -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-center">Circuit Diagram</h4>
                <div class="flex justify-center">
                  <svg width="200" height="200" viewBox="0 0 200 200" class="text-primary">
                    <!-- Supply voltage -->
                    <text x="10" y="20" class="text-sm fill-current">Vs</text>
                    <line x1="50" y1="30" x2="150" y2="30" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Resistor -->
                    <rect x="70" y="40" width="60" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
                    <text x="95" y="55" class="text-sm fill-current text-center">R</text>
                    <line x1="100" y1="30" x2="100" y2="40" stroke="currentColor" stroke-width="2"/>
                    <line x1="100" y1="60" x2="100" y2="80" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- LED Symbol -->
                    <polygon points="85,90 115,90 100,110" fill="none" stroke="currentColor" stroke-width="2"/>
                    <line x1="85" y1="110" x2="115" y2="110" stroke="currentColor" stroke-width="2"/>
                    <line x1="100" y1="80" x2="100" y2="90" stroke="currentColor" stroke-width="2"/>
                    <line x1="100" y1="110" x2="100" y2="130" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- LED light rays -->
                    <line x1="110" y1="85" x2="125" y2="70" stroke="currentColor" stroke-width="1"/>
                    <line x1="120" y1="75" x2="130" y2="65" stroke="currentColor" stroke-width="1"/>
                    <polygon points="125,70 130,65 130,70 125,75" fill="currentColor"/>
                    <polygon points="130,65 135,60 135,65 130,70" fill="currentColor"/>
                    
                    <text x="120" y="100" class="text-xs fill-current">LED</text>
                    
                    <!-- Ground -->
                    <line x1="50" y1="130" x2="150" y2="130" stroke="currentColor" stroke-width="2"/>
                    <line x1="90" y1="140" x2="110" y2="140" stroke="currentColor" stroke-width="2"/>
                    <line x1="95" y1="145" x2="105" y2="145" stroke="currentColor" stroke-width="2"/>
                    <line x1="98" y1="150" x2="102" y2="150" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Vertical connections -->
                    <line x1="50" y1="30" x2="50" y2="130" stroke="currentColor" stroke-width="2"/>
                    <line x1="150" y1="30" x2="150" y2="130" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Current direction arrow -->
                    <polygon points="25,70 35,75 35,65" fill="currentColor"/>
                    <text x="10" y="75" class="text-xs fill-current">I</text>
                  </svg>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formula Explanation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  The current-limiting resistor drops the excess voltage (Vs - Vf) to limit the current through the LED 
                  to its safe operating value. Without this resistor, the LED would draw too much current and burn out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
import { LightBulbIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'LEDResistorCalculator',
  components: {
    LightBulbIcon
  },
  setup() {
    // SEO
    useHead({
      title: 'LED Current Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate the required resistor value for LED circuits using supply voltage, forward voltage, and forward current.' },
        { name: 'keywords', content: 'LED resistor calculator, LED current limiting resistor, LED circuit design, forward voltage, forward current' }
      ]
    })

    const colorMode = useColorMode()
    
    return {
      colorMode
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      inputs: {
        supplyVoltage: null,
        forwardVoltage: null,
        forwardCurrent: null
      },
      animationSpeed: 1
    }
  },
  computed: {
    result() {
      if (this.inputs.supplyVoltage && this.inputs.forwardVoltage && this.inputs.forwardCurrent && 
          !isNaN(this.inputs.supplyVoltage) && !isNaN(this.inputs.forwardVoltage) && !isNaN(this.inputs.forwardCurrent) &&
          this.inputs.supplyVoltage > this.inputs.forwardVoltage && this.inputs.forwardCurrent > 0) {
        const resistance = (this.inputs.supplyVoltage - this.inputs.forwardVoltage) / this.inputs.forwardCurrent
        return isFinite(resistance) ? resistance.toFixed(2) : null
      }
      return null
    },
    powerDissipation() {
      if (this.result && this.inputs.forwardCurrent) {
        const voltageDrop = this.inputs.supplyVoltage - this.inputs.forwardVoltage
        const power = voltageDrop * this.inputs.forwardCurrent
        return isFinite(power) ? power.toFixed(4) : null
      }
      return null
    }
  },
  mounted() {
    this.initializeAnimations()
  },
  watch: {
    'inputs.supplyVoltage'() {
      this.updateCircuitAnimation()
      this.animateResult()
    },
    'inputs.forwardVoltage'() {
      this.updateCircuitAnimation()
      this.animateResult()
    },
    'inputs.forwardCurrent'() {
      this.updateCircuitAnimation()
      this.animateResult()
    },
    result() {
      this.animateResult()
    }
  },
  methods: {
    toggleDark() {
      this.colorMode = this.colorMode === 'dark' ? 'light' : 'dark'
    },
    initializeAnimations() {
      // Initialize formula animations
      if (this.$refs.formulaContainer) {
        const elements = this.$refs.formulaContainer.querySelectorAll('.formula-part, .formula-operator')
        elements.forEach((element, index) => {
          element.style.animationDelay = `${index * 0.2}s`
          element.classList.add('fade-in')
        })
      }
      
      // Initialize circuit animation
      this.updateCircuitAnimation()
    },
    animateFormulaHighlight(element) {
      if (element) {
        element.classList.add('highlight')
        setTimeout(() => {
          element.classList.remove('highlight')
        }, 1000)
      }
    },
    updateCircuitAnimation() {
      // Update voltage displays
      if (this.$refs.vsDisplay) {
        this.$refs.vsDisplay.textContent = `${this.inputs.supplyVoltage || 9}V`
        this.animateFormulaHighlight(this.$refs.supplyElement)
      }
      
      if (this.$refs.vfDisplay) {
        this.$refs.vfDisplay.textContent = `${this.inputs.forwardVoltage || 2}V`
        this.animateFormulaHighlight(this.$refs.forwardElement)
      }
      
      if (this.$refs.currentDisplay) {
        const current = (this.inputs.forwardCurrent || 0.02) * 1000
        this.$refs.currentDisplay.textContent = `If = ${current}mA`
        this.animateFormulaHighlight(this.$refs.currentElement)
      }
      
      // Update calculated values
      const supplyV = this.inputs.supplyVoltage || 9
      const forwardV = this.inputs.forwardVoltage || 2
      const forwardI = this.inputs.forwardCurrent || 0.02
      const resistorVoltage = supplyV - forwardV
      const power = resistorVoltage * forwardI
      
      if (this.$refs.rDisplay) {
        const resistance = this.result || ((supplyV - forwardV) / forwardI).toFixed(2)
        this.$refs.rDisplay.textContent = `${resistance}Ω`
        this.animateFormulaHighlight(this.$refs.resistorElement)
      }
      
      if (this.$refs.vrDisplay) {
        this.$refs.vrDisplay.textContent = `VR = ${resistorVoltage.toFixed(1)}V`
      }
      
      if (this.$refs.powerDisplay) {
        this.$refs.powerDisplay.textContent = `P = ${power.toFixed(4)}W`
      }
      
      // Update LED brightness based on current
      this.updateLEDBrightness()
      
      // Update current flow speed
      this.updateCurrentFlow()
    },
    updateLEDBrightness() {
      const ledBody = document.querySelector('.led-body')
      const lightRays = document.querySelectorAll('.light-ray')
      
      if (ledBody && lightRays.length > 0) {
        const current = this.inputs.forwardCurrent || 0.02
        const brightness = Math.min(current / 0.02, 1)
        ledBody.style.filter = `brightness(${0.5 + brightness * 0.5})`
        
        lightRays.forEach(ray => {
          ray.style.opacity = brightness
        })
      }
    },
    updateCurrentFlow() {
      const currentParticle = document.querySelector('.current-particle')
      if (currentParticle) {
        const current = this.inputs.forwardCurrent || 0.02
        const speed = Math.max(0.5, 3 - (current / 0.02) * 2)
        const animateMotion = currentParticle.querySelector('animateMotion')
        if (animateMotion) {
          animateMotion.setAttribute('dur', `${speed}s`)
        }
      }
    },
    animateResult() {
      const resultElement = document.querySelector('.result-value')
      if (resultElement) {
        resultElement.classList.add('pulse-result')
        setTimeout(() => {
          resultElement.classList.remove('pulse-result')
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
/* Animated Formula Styles */
.animated-formula {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.formula-part {
  transition: all 0.3s ease;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  opacity: 0;
  transform: translateY(20px);
}

.formula-part.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.formula-part.highlight {
  background-color: rgba(59, 130, 246, 0.2);
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.formula-part.resistor {
  color: #ef4444;
}

.formula-part.supply {
  color: #3b82f6;
}

.formula-part.forward {
  color: #10b981;
}

.formula-part.current {
  color: #f59e0b;
}

.formula-operator {
  color: #6b7280;
  font-weight: normal;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.formula-operator.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

/* LED Animation Styles */
.led-animation {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 1rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.wire {
  filter: drop-shadow(0 0 3px currentColor);
}

.current-particle {
  filter: drop-shadow(0 0 5px #FFD700);
}

.led-body {
  transition: filter 0.3s ease;
}

.light-ray {
  filter: drop-shadow(0 0 3px #FFD700);
  transition: opacity 0.3s ease;
}

.resistor-body {
  transition: all 0.3s ease;
}

.voltage-arc {
  stroke-dasharray: 5,5;
  animation: dashMove 2s linear infinite;
}

.power-bar {
  transition: all 0.3s ease;
}

.voltage-value, .resistor-value, .led-voltage, .current-label, .voltage-label, .power-label {
  transition: all 0.3s ease;
  text-anchor: middle;
}

/* Input Field Animations */
.input-field {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: scale(1.02);
}

.result-value {
  transition: all 0.3s ease;
}

.result-value.pulse-result {
  animation: pulseResult 1s ease;
}

/* Keyframe Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dashMove {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 10;
  }
}

@keyframes pulseResult {
  0%, 100% {
    transform: scale(1);
    background-color: transparent;
  }
  50% {
    transform: scale(1.05);
    background-color: rgba(59, 130, 246, 0.1);
  }
}

/* Dark mode adjustments */
.dark .led-animation {
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
  border-color: rgba(255,255,255,0.1);
}

.dark .formula-part.highlight {
  background-color: rgba(59, 130, 246, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .animated-formula {
    font-size: 1.5rem;
  }
  
  .led-animation svg {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 640px) {
  .animated-formula {
    font-size: 1.2rem;
  }
}

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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}
</style>
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
            <NuxtLink to="/calculators"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
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
            <ChartBarIcon class="h-16 w-16 text-primary" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Divider Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate output voltage in a voltage divider circuit
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="animated-formula" ref="formulaContainer">
              <span class="formula-part output" ref="outputElement">Vout</span>
              <span class="formula-operator">=</span>
              <span class="formula-part input" ref="inputElement">Vin</span>
              <span class="formula-operator">×</span>
              <span class="formula-part fraction">(</span>
              <span class="formula-part r2" ref="r2Element">R2</span>
              <span class="formula-operator">/</span>
              <span class="formula-part denominator">(</span>
              <span class="formula-part r1" ref="r1Element">R1</span>
              <span class="formula-operator">+</span>
              <span class="formula-part r2" ref="r2Element2">R2</span>
              <span class="formula-part denominator">))</span>
            </div>
          </div>
          
          <!-- Animated Voltage Divider Visualization -->
          <div class="mt-8 flex justify-center">
            <div class="divider-animation" ref="dividerContainer">
              <svg width="300" height="350" viewBox="0 0 300 350" class="text-primary">
                <!-- Input voltage source -->
                <g class="voltage-source">
                  <rect x="50" y="50" width="30" height="60" fill="none" stroke="currentColor" stroke-width="3"/>
                  <text x="65" y="85" class="text-sm fill-current text-center font-bold">Vin</text>
                  <text x="65" y="130" class="text-xs fill-current text-center voltage-value" ref="vinDisplay">12V</text>
                </g>
                
                <!-- Wires -->
                <line x1="80" y1="60" x2="150" y2="60" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="50" y1="100" x2="20" y2="100" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="20" y1="100" x2="20" y2="280" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="20" y1="280" x2="150" y2="280" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- R1 Resistor -->
                <g class="resistor-r1">
                  <rect x="150" y="50" width="60" height="20" fill="none" stroke="currentColor" stroke-width="3" class="resistor-body"/>
                  <path d="M155,60 L160,55 L165,65 L170,55 L175,65 L180,55 L185,65 L190,55 L195,65 L200,55 L205,60" 
                        stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="180" y="45" class="text-xs fill-current text-center">R1</text>
                  <text x="180" y="85" class="text-xs fill-current text-center resistor-value" ref="r1Display">1kΩ</text>
                </g>
                
                <!-- Connection point -->
                <circle cx="150" cy="150" r="4" fill="currentColor" class="connection-point"/>
                <line x1="150" y1="70" x2="150" y2="150" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- R2 Resistor -->
                <g class="resistor-r2">
                  <rect x="150" y="180" width="60" height="20" fill="none" stroke="currentColor" stroke-width="3" class="resistor-body"/>
                  <path d="M155,190 L160,185 L165,195 L170,185 L175,195 L180,185 L185,195 L190,185 L195,195 L200,185 L205,190" 
                        stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="180" y="175" class="text-xs fill-current text-center">R2</text>
                  <text x="180" y="215" class="text-xs fill-current text-center resistor-value" ref="r2Display">1kΩ</text>
                </g>
                
                <line x1="150" y1="150" x2="150" y2="180" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="150" y1="200" x2="150" y2="280" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Output connection -->
                <line x1="150" y1="150" x2="220" y2="150" stroke="currentColor" stroke-width="3" class="wire"/>
                <circle cx="220" cy="150" r="4" fill="currentColor" class="output-point"/>
                <text x="230" y="150" class="text-sm fill-current font-bold">Vout</text>
                <text x="230" y="165" class="text-xs fill-current voltage-value" ref="voutDisplay">6V</text>
                
                <!-- Voltage indicators -->
                <g class="voltage-indicators">
                  <!-- V1 across R1 -->
                  <path d="M120,60 Q110,110 120,150" stroke="#FF6B6B" stroke-width="2" fill="none" class="voltage-arc"/>
                  <text x="100" y="105" class="text-xs fill-current voltage-label" ref="v1Display">V1</text>
                  
                  <!-- V2 across R2 -->
                  <path d="M120,150 Q110,215 120,280" stroke="#4CAF50" stroke-width="2" fill="none" class="voltage-arc"/>
                  <text x="100" y="215" class="text-xs fill-current voltage-label" ref="v2Display">V2</text>
                </g>
                
                <!-- Current flow -->
                <g class="current-flow">
                  <circle r="2" fill="#FFD700" class="current-particle">
                    <animateMotion dur="3s" repeatCount="indefinite" 
                      path="M80,60 L150,60 L150,150 L150,280 L20,280 L20,100 L50,100"/>
                  </circle>
                  <text x="250" y="60" class="text-xs fill-current current-label">I</text>
                </g>
                
                <!-- Labels -->
                <text x="150" y="25" class="text-sm fill-current text-center font-bold">Voltage Divider</text>
                <text x="150" y="320" class="text-xs fill-current text-center">Vout = Vin × R2/(R1+R2)</text>
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
                    Input Voltage (Vin) - Volts
                  </label>
                  <input 
                    v-model.number="inputs.inputVoltage"
                    type="number" 
                    step="any"
                    placeholder="Enter input voltage in volts"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resistor 1 (R1) - Ohms
                  </label>
                  <input 
                    v-model.number="inputs.r1"
                    type="number" 
                    step="any"
                    placeholder="Enter R1 in ohms (top resistor)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resistor 2 (R2) - Ohms
                  </label>
                  <input 
                    v-model.number="inputs.r2"
                    type="number" 
                    step="any"
                    placeholder="Enter R2 in ohms (bottom resistor)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              <div class="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg p-6">
                <div class="text-center">
                  <span class="text-lg text-gray-600 dark:text-gray-300">Output Voltage (Vout)</span>
                  <div class="text-4xl font-bold text-primary mt-2">
                    {{ result !== null ? result : '---' }} V
                  </div>
                  <div v-if="result !== null" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {{ inputs.inputVoltage }} × ({{ inputs.r2 }}/({{ inputs.r1 }}+{{ inputs.r2 }})) = {{ result }} V
                  </div>
                </div>
              </div>

              <!-- Circuit Diagram -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-center">Circuit Diagram</h4>
                <div class="flex justify-center">
                  <svg width="200" height="250" viewBox="0 0 200 250" class="text-primary">
                    <!-- Input voltage source -->
                    <text x="10" y="20" class="text-sm fill-current">Vin</text>
                    <line x1="50" y1="30" x2="150" y2="30" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- R1 -->
                    <rect x="70" y="40" width="60" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
                    <text x="95" y="55" class="text-sm fill-current text-center">R1</text>
                    <line x1="100" y1="30" x2="100" y2="40" stroke="currentColor" stroke-width="2"/>
                    <line x1="100" y1="60" x2="100" y2="80" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Output point -->
                    <circle cx="100" cy="80" r="3" fill="currentColor"/>
                    <text x="110" y="85" class="text-sm fill-current">Vout</text>
                    <line x1="100" y1="80" x2="150" y2="80" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- R2 -->
                    <rect x="70" y="90" width="60" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
                    <text x="95" y="105" class="text-sm fill-current text-center">R2</text>
                    <line x1="100" y1="80" x2="100" y2="90" stroke="currentColor" stroke-width="2"/>
                    <line x1="100" y1="110" x2="100" y2="130" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Ground -->
                    <line x1="50" y1="130" x2="150" y2="130" stroke="currentColor" stroke-width="2"/>
                    <line x1="90" y1="140" x2="110" y2="140" stroke="currentColor" stroke-width="2"/>
                    <line x1="95" y1="145" x2="105" y2="145" stroke="currentColor" stroke-width="2"/>
                    <line x1="98" y1="150" x2="102" y2="150" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Vertical connections -->
                    <line x1="50" y1="30" x2="50" y2="130" stroke="currentColor" stroke-width="2"/>
                    <line x1="150" y1="30" x2="150" y2="130" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formula Explanation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  A voltage divider uses two resistors to create a fraction of the input voltage. 
                  The output voltage is proportional to the ratio of R2 to the total resistance (R1+R2).
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
import { ChartBarIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'VoltageDividerCalculator',
  components: {
    ChartBarIcon
  },
  setup() {
    // SEO
    useHead({
      title: 'Voltage Divider Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate output voltage in a voltage divider circuit using input voltage and resistor values. Professional circuit analysis tool.' },
        { name: 'keywords', content: 'voltage divider calculator, resistor divider, circuit analysis, voltage ratio, electrical engineering' }
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
      inputs: {
        inputVoltage: null,
        r1: null,
        r2: null
      },
      animationSpeed: 1
    }
  },
  computed: {
    result() {
      if (this.inputs.inputVoltage && this.inputs.r1 && this.inputs.r2 && 
          !isNaN(this.inputs.inputVoltage) && !isNaN(this.inputs.r1) && !isNaN(this.inputs.r2) &&
          this.inputs.r1 > 0 && this.inputs.r2 > 0) {
        const outputVoltage = this.inputs.inputVoltage * (this.inputs.r2 / (this.inputs.r1 + this.inputs.r2))
        return isFinite(outputVoltage) ? outputVoltage.toFixed(4) : null
      }
      return null
    }
  },
  mounted() {
    this.initializeAnimations()
  },
  watch: {
    'inputs.inputVoltage'() {
      this.animateFormulaHighlight('input')
      this.updateVoltageDisplay()
    },
    'inputs.r1'() {
      this.animateFormulaHighlight('r1')
      this.updateResistorDisplay()
    },
    'inputs.r2'() {
      this.animateFormulaHighlight('r2')
      this.updateResistorDisplay()
    },
    result() {
      this.animateResult()
      this.updateVoltageDivision()
    }
  },
  methods: {
    toggleDark() {
      this.$colorMode = this.$colorMode === 'dark' ? 'light' : 'dark'
    },
    initializeAnimations() {
      // Animate formula parts on load
      setTimeout(() => {
        const parts = ['outputElement', 'inputElement', 'r1Element', 'r2Element']
        parts.forEach((part, index) => {
          setTimeout(() => {
            if (this.$refs[part]) {
              this.$refs[part].classList.add('fade-in')
            }
          }, index * 200)
        })
      }, 500)
    },
    animateFormulaHighlight(type) {
      const elementMap = {
        input: 'inputElement',
        r1: 'r1Element',
        r2: 'r2Element',
        output: 'outputElement'
      }
      
      const element = this.$refs[elementMap[type]]
      if (element) {
        element.classList.add('highlight')
        setTimeout(() => {
          element.classList.remove('highlight')
        }, 600)
      }
    },
    updateVoltageDisplay() {
      const vinDisplay = this.$refs.vinDisplay
      const inputVoltage = parseFloat(this.inputs.inputVoltage) || 0
      
      if (vinDisplay) {
        vinDisplay.textContent = `${inputVoltage}V`
      }
    },
    updateResistorDisplay() {
      const r1Display = this.$refs.r1Display
      const r2Display = this.$refs.r2Display
      const r1 = parseFloat(this.inputs.r1) || 0
      const r2 = parseFloat(this.inputs.r2) || 0
      
      if (r1Display) {
        r1Display.textContent = r1 >= 1000 ? `${(r1/1000).toFixed(1)}kΩ` : `${r1}Ω`
      }
      if (r2Display) {
        r2Display.textContent = r2 >= 1000 ? `${(r2/1000).toFixed(1)}kΩ` : `${r2}Ω`
      }
    },
    updateVoltageDivision() {
      const voutDisplay = this.$refs.voutDisplay
      const v1Display = this.$refs.v1Display
      const v2Display = this.$refs.v2Display
      
      const vin = parseFloat(this.inputs.inputVoltage) || 0
      const r1 = parseFloat(this.inputs.r1) || 1
      const r2 = parseFloat(this.inputs.r2) || 1
      const vout = parseFloat(this.result) || 0
      
      const v1 = vin - vout // Voltage across R1
      const v2 = vout // Voltage across R2
      
      if (voutDisplay) {
        voutDisplay.textContent = `${vout.toFixed(2)}V`
      }
      if (v1Display) {
        v1Display.textContent = `V1: ${v1.toFixed(2)}V`
      }
      if (v2Display) {
        v2Display.textContent = `V2: ${v2.toFixed(2)}V`
      }
      
      // Update voltage arc colors based on voltage levels
      const voltageArcs = document.querySelectorAll('.voltage-arc')
      if (voltageArcs.length >= 2) {
        const v1Intensity = Math.min(1, v1 / vin)
        const v2Intensity = Math.min(1, v2 / vin)
        
        voltageArcs[0].style.opacity = 0.3 + (v1Intensity * 0.7)
        voltageArcs[1].style.opacity = 0.3 + (v2Intensity * 0.7)
      }
    },
    animateResult() {
      const resultElement = document.querySelector('.result-display')
      if (resultElement) {
        resultElement.classList.add('result-pulse')
        setTimeout(() => {
          resultElement.classList.remove('result-pulse')
        }, 600)
      }
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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

/* Animation Styles */
.animated-formula {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  flex-wrap: wrap;
  justify-content: center;
}

.formula-part {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

.formula-part.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.formula-part.highlight {
  background-color: var(--tw-color-primary);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(159, 168, 218, 0.5);
}

.formula-operator {
  color: var(--tw-color-primary);
  font-size: 1.2rem;
  margin: 0 0.25rem;
}

.divider-animation {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.wire {
  stroke-dasharray: 5, 5;
  animation: wireFlow 2s linear infinite;
}

.voltage-source {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 3px currentColor);
}

.resistor-body {
  transition: all 0.3s ease;
}

.connection-point, .output-point {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 4px currentColor);
}

.voltage-arc {
  transition: all 0.5s ease;
  filter: drop-shadow(0 0 2px currentColor);
}

.voltage-label {
  font-weight: bold;
  transition: all 0.3s ease;
}

.voltage-value {
  font-weight: bold;
  transition: all 0.3s ease;
}

.resistor-value {
  transition: all 0.3s ease;
}

.current-particle {
  filter: drop-shadow(0 0 6px #FFD700);
}

.current-label {
  font-weight: bold;
  animation: pulse 2s ease-in-out infinite;
}

.result-pulse {
  animation: resultPulse 0.6s ease;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wireFlow {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 10;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes resultPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    color: #FFD700;
  }
  100% {
    transform: scale(1);
  }
}

/* Input animation effects */
input:focus {
  animation: inputGlow 0.3s ease;
}

@keyframes inputGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(159, 168, 218, 0.4);
  }
  100% {
    box-shadow: 0 0 0 4px rgba(159, 168, 218, 0.1);
  }
}
</style>
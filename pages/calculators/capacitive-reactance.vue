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
            <CpuChipIcon class="h-16 w-16 text-primary" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Capacitive Reactance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate the reactance of a capacitor in AC circuits
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="animated-formula" ref="formulaContainer">
              <span class="formula-part reactance" ref="reactanceElement">Xc</span>
              <span class="formula-operator">=</span>
              <span class="formula-part fraction">1/(2π</span>
              <span class="formula-part frequency" ref="frequencyElement">f</span>
              <span class="formula-part capacitance" ref="capacitanceElement">C</span>
              <span class="formula-part fraction">)</span>
            </div>
          </div>
          
          <!-- Animated Capacitive Reactance Visualization -->
          <div class="mt-8 flex justify-center">
            <div class="reactance-animation" ref="reactanceContainer">
              <svg width="350" height="250" viewBox="0 0 350 250" class="text-primary">
                <!-- AC Source -->
                <circle cx="50" cy="125" r="25" fill="none" stroke="currentColor" stroke-width="3" class="ac-source"/>
                <path d="M40,125 Q45,115 50,125 Q55,135 60,125" stroke="currentColor" stroke-width="2" fill="none"/>
                <text x="50" y="160" class="text-xs fill-current text-center">AC</text>
                
                <!-- Wires -->
                <line x1="75" y1="125" x2="150" y2="125" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="200" y1="125" x2="275" y2="125" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Capacitor -->
                <g class="capacitor-symbol">
                  <line x1="170" y1="100" x2="170" y2="150" stroke="currentColor" stroke-width="4"/>
                  <line x1="180" y1="100" x2="180" y2="150" stroke="currentColor" stroke-width="4"/>
                  <text x="175" y="175" class="text-xs fill-current text-center">C</text>
                </g>
                
                <!-- Current waves -->
                <g class="current-waves">
                  <path d="M100,125 Q110,115 120,125 Q130,135 140,125" stroke="#FFD700" stroke-width="3" fill="none" class="current-wave">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                  </path>
                  <path d="M210,125 Q220,115 230,125 Q240,135 250,125" stroke="#FFD700" stroke-width="3" fill="none" class="current-wave">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                <!-- Frequency indicator -->
                <g class="frequency-indicator">
                  <circle cx="100" cy="50" r="3" fill="#00FF00" class="freq-pulse">
                    <animate attributeName="r" values="3;8;3" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="35" class="text-xs fill-current text-center">f</text>
                </g>
                
                <!-- Reactance visualization -->
                <g class="reactance-bars">
                  <rect x="300" y="50" width="20" height="150" fill="none" stroke="currentColor" stroke-width="2" class="reactance-bar-bg"/>
                  <rect x="300" y="125" width="20" height="75" fill="#FF6B6B" class="reactance-bar" opacity="0.7">
                    <animate attributeName="height" values="75;25;75" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="y" values="125;175;125" dur="2s" repeatCount="indefinite"/>
                  </rect>
                  <text x="310" y="220" class="text-xs fill-current text-center">Xc</text>
                </g>
                
                <!-- Labels -->
                <text x="175" y="30" class="text-sm fill-current text-center font-bold">Capacitive Reactance</text>
                <text x="175" y="240" class="text-xs fill-current text-center">Xc ∝ 1/(f×C)</text>
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
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Enter any two values to calculate the third variable.
              </p>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacitive Reactance (Xc) - Ohms
                  </label>
                  <input 
                    v-model.number="inputs.reactance"
                    type="number" 
                    step="any"
                    placeholder="Enter reactance in Ω"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency (f) - Hertz
                  </label>
                  <input 
                    v-model.number="inputs.frequency"
                    type="number" 
                    step="any"
                    placeholder="Enter frequency in Hz"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Capacitance (C) - Farads
                  </label>
                  <input 
                    v-model.number="inputs.capacitance"
                    type="number" 
                    step="any"
                    placeholder="Enter capacitance in F (e.g., 0.000001 for 1µF)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Common units: 1µF = 0.000001F, 1nF = 0.000000001F, 1pF = 0.000000000001F
                  </p>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              <div class="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg p-6">
                <div class="text-center">
                  <span v-if="calculatedVariable" class="text-lg text-gray-600 dark:text-gray-300">{{ calculatedVariable.label }}</span>
                  <span v-else class="text-lg text-gray-600 dark:text-gray-300">Result</span>
                  <div class="text-4xl font-bold text-primary mt-2">
                    {{ calculatedVariable ? calculatedVariable.value : '---' }} {{ calculatedVariable ? calculatedVariable.unit : '' }}
                  </div>
                  <div v-if="calculatedVariable" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {{ calculatedVariable.formula }}
                  </div>
                  <div v-if="!calculatedVariable && hasAnyInput" class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Please enter two values to calculate the third.
                  </div>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formula Explanation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  This calculator can determine any of the three variables (reactance, frequency, or capacitance) when the other two are provided. 
                  Capacitive reactance decreases with increasing frequency and capacitance.
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
import { CpuChipIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'CapacitiveReactanceCalculator',
  components: {
    CpuChipIcon
  },
  setup() {
    // SEO
    useHead({
      title: 'Capacitive Reactance Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate capacitive reactance using frequency and capacitance (Xc = 1/(2πfC)). Professional AC circuit analysis tool.' },
        { name: 'keywords', content: 'capacitive reactance calculator, AC circuits, capacitor reactance, frequency capacitance, electrical engineering' }
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
        reactance: null,
        frequency: null,
        capacitance: null
      },
      animationSpeed: 1
    }
  },
  computed: {
    hasAnyInput() {
      return this.inputs.reactance || this.inputs.frequency || this.inputs.capacitance
    },
    calculatedVariable() {
      const { reactance, frequency, capacitance } = this.inputs
      
      // Count non-null inputs
      const inputCount = [reactance, frequency, capacitance].filter(val => 
        val !== null && val !== undefined && val !== '' && !isNaN(val) && val > 0
      ).length
      
      if (inputCount !== 2) return null
      
      // Calculate missing variable based on Xc = 1/(2πfC)
      if (!reactance && frequency && capacitance) {
        // Calculate reactance: Xc = 1/(2πfC)
        const calc = 1 / (2 * Math.PI * frequency * capacitance)
        return {
          label: 'Capacitive Reactance (Xc)',
          value: calc.toFixed(4),
          unit: 'Ω',
          formula: `1/(2π × ${frequency} × ${capacitance}) = ${calc.toFixed(4)} Ω`
        }
      } else if (!frequency && reactance && capacitance) {
        // Calculate frequency: f = 1/(2πXcC)
        const calc = 1 / (2 * Math.PI * reactance * capacitance)
        return {
          label: 'Frequency (f)',
          value: calc.toFixed(4),
          unit: 'Hz',
          formula: `1/(2π × ${reactance} × ${capacitance}) = ${calc.toFixed(4)} Hz`
        }
      } else if (!capacitance && reactance && frequency) {
        // Calculate capacitance: C = 1/(2πXcf)
        const calc = 1 / (2 * Math.PI * reactance * frequency)
        return {
          label: 'Capacitance (C)',
          value: calc.toExponential(4),
          unit: 'F',
          formula: `1/(2π × ${reactance} × ${frequency}) = ${calc.toExponential(4)} F`
        }
      }
      
      return null
    }
  },
  mounted() {
    this.initializeAnimations()
  },
  watch: {
    'inputs.reactance'() {
      this.animateFormulaHighlight('reactance')
    },
    'inputs.frequency'() {
      this.animateFormulaHighlight('frequency')
      this.updateFrequencyAnimation()
    },
    'inputs.capacitance'() {
      this.animateFormulaHighlight('capacitance')
      this.updateCapacitanceAnimation()
    },
    calculatedVariable() {
      if (this.calculatedVariable) {
        this.animateResult()
        this.updateReactanceVisualization()
      }
    }
  },
  methods: {
    toggleDark() {
      this.colorMode = this.colorMode === 'dark' ? 'light' : 'dark'
    },
    initializeAnimations() {
      // Animate formula parts on load
      setTimeout(() => {
        const formulaParts = document.querySelectorAll('.formula-part, .formula-operator')
        formulaParts.forEach((part, index) => {
          setTimeout(() => {
            part.classList.add('fade-in')
          }, index * 200)
        })
      }, 500)
    },
    animateFormulaHighlight(type) {
      const elementMap = {
        frequency: 'frequencyElement',
        capacitance: 'capacitanceElement',
        reactance: 'reactanceElement'
      }
      
      const element = this.$refs[elementMap[type]]
      if (element) {
        element.classList.add('highlight')
        setTimeout(() => {
          element.classList.remove('highlight')
        }, 600)
      }
    },
    updateFrequencyAnimation() {
      const freqPulse = document.querySelector('.freq-pulse')
      const currentWaves = document.querySelectorAll('.current-wave')
      
      const frequency = parseFloat(this.inputs.frequency) || 1
      const speed = Math.max(0.2, Math.min(3, frequency / 1000)) // Normalize frequency
      
      // Update frequency pulse speed
      if (freqPulse) {
        const animations = freqPulse.querySelectorAll('animate')
        animations.forEach(anim => {
          anim.setAttribute('dur', `${1 / speed}s`)
        })
      }
      
      // Update current wave speed
      currentWaves.forEach(wave => {
        const animation = wave.querySelector('animate')
        if (animation) {
          animation.setAttribute('dur', `${1 / speed}s`)
        }
      })
    },
    updateCapacitanceAnimation() {
      const capacitorLines = document.querySelectorAll('.capacitor-symbol line')
      const capacitance = parseFloat(this.inputs.capacitance) || 1
      
      // Visual representation of capacitance (plate separation)
      const separation = Math.max(8, Math.min(20, 10 + (capacitance * 1000000))) // Convert to visual scale
      
      if (capacitorLines.length >= 2) {
        capacitorLines[0].setAttribute('x1', 175 - separation/2)
        capacitorLines[0].setAttribute('x2', 175 - separation/2)
        capacitorLines[1].setAttribute('x1', 175 + separation/2)
        capacitorLines[1].setAttribute('x2', 175 + separation/2)
      }
    },
    updateReactanceVisualization() {
      const reactanceBar = document.querySelector('.reactance-bar')
      let reactanceValue = null
      
      if (this.calculatedVariable) {
        if (this.calculatedVariable.label.includes('Reactance')) {
          reactanceValue = parseFloat(this.calculatedVariable.value)
        } else {
          // If calculating other variables, use reactance input if available
          reactanceValue = this.inputs.reactance
        }
      }
      
      if (reactanceBar && reactanceValue > 0) {
        // Inverse relationship visualization
        const maxHeight = 150
        const normalizedHeight = Math.max(20, Math.min(maxHeight, maxHeight / Math.log10(reactanceValue + 1)))
        
        reactanceBar.setAttribute('height', normalizedHeight)
        reactanceBar.setAttribute('y', 200 - normalizedHeight)
        
        // Color based on reactance value
        const hue = Math.max(0, Math.min(120, 120 - (reactanceValue / 1000) * 120)) // Red to green
        reactanceBar.setAttribute('fill', `hsl(${hue}, 70%, 60%)`)
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
  font-size: 1.8rem;
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
  font-size: 1.5rem;
  margin: 0 0.25rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.formula-operator.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.formula-part.fraction {
  color: var(--tw-color-primary);
  font-size: 1.5rem;
}

.reactance-animation {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.wire {
  stroke-dasharray: 5, 5;
  animation: wireFlow 2s linear infinite;
}

.ac-source {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px #00FF00);
}

.capacitor-symbol {
  transition: all 0.3s ease;
}

.current-wave {
  filter: drop-shadow(0 0 4px #FFD700);
}

.freq-pulse {
  filter: drop-shadow(0 0 6px #00FF00);
}

.reactance-bar {
  transition: all 0.5s ease;
}

.reactance-bar-bg {
  opacity: 0.3;
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
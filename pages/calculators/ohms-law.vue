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
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Ohm's Law Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate voltage, current, or resistance using the fundamental electrical law
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="animated-formula" ref="formulaContainer">
              <span class="formula-part voltage" ref="voltageElement">V</span>
              <span class="formula-operator">=</span>
              <span class="formula-part current" ref="currentElement">I</span>
              <span class="formula-operator">×</span>
              <span class="formula-part resistance" ref="resistanceElement">R</span>
            </div>
          </div>
          
          <!-- Animated Circuit Visualization -->
          <div class="mt-8 flex justify-center">
            <div class="circuit-animation" ref="circuitContainer">
              <svg width="300" height="150" viewBox="0 0 300 150" class="text-primary">
                <!-- Circuit wires -->
                <line x1="50" y1="75" x2="100" y2="75" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="200" y1="75" x2="250" y2="75" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Resistor -->
                <rect x="100" y="65" width="100" height="20" fill="none" stroke="currentColor" stroke-width="3" class="resistor-body"/>
                <text x="150" y="80" class="text-sm fill-current text-center resistor-label">R</text>
                
                <!-- Current flow animation -->
                <circle r="4" fill="#FFD700" class="current-particle">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M50,75 L100,75 L200,75 L250,75"/>
                </circle>
                
                <!-- Voltage indicators -->
                <text x="25" y="70" class="text-xs fill-current voltage-label">+</text>
                <text x="25" y="85" class="text-xs fill-current voltage-label">V</text>
                <text x="275" y="70" class="text-xs fill-current voltage-label">-</text>
                
                <!-- Current arrow -->
                <polygon points="150,50 160,55 160,45" fill="#FFD700" class="current-arrow">
                  <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="1s" repeatCount="indefinite"/>
                </polygon>
                <text x="165" y="55" class="text-xs fill-current">I</text>
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
                    Current (I) - Amperes
                  </label>
                  <input 
                    v-model.number="inputs.current"
                    type="number" 
                    step="any"
                    placeholder="Enter current in amperes"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resistance (R) - Ohms
                  </label>
                  <input 
                    v-model.number="inputs.resistance"
                    type="number" 
                    step="any"
                    placeholder="Enter resistance in ohms"
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
                  <span class="text-lg text-gray-600 dark:text-gray-300">Voltage (V)</span>
                  <div class="text-4xl font-bold text-primary mt-2">
                    {{ result !== null ? result : '---' }} V
                  </div>
                  <div v-if="result !== null" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {{ inputs.current }} A × {{ inputs.resistance }} Ω = {{ result }} V
                  </div>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formula Explanation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Ohm's Law states that the voltage across a conductor is directly proportional to the current flowing through it, 
                  provided the temperature remains constant. The constant of proportionality is the resistance.
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
import { BoltIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'OhmsLawCalculator',
  components: {
    BoltIcon
  },
  setup() {
    // SEO
    useHead({
      title: "Ohm's Law Calculator - Cyno Electric",
      meta: [
        { name: 'description', content: "Calculate voltage, current, or resistance using Ohm's Law (V = I × R). Professional electrical engineering calculator." },
        { name: 'keywords', content: "ohms law calculator, voltage calculator, current calculator, resistance calculator, electrical engineering" }
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
        current: null,
        resistance: null
      },
      animationSpeed: 2
    }
  },
  mounted() {
    this.initializeAnimations()
  },
  watch: {
    'inputs.current': {
      handler() {
        this.animateFormulaHighlight('current')
        this.updateCurrentAnimation()
      }
    },
    'inputs.resistance': {
      handler() {
        this.animateFormulaHighlight('resistance')
        this.updateResistorAnimation()
      }
    },
    result: {
      handler() {
        if (this.result !== null) {
          this.animateFormulaHighlight('voltage')
          this.animateResult()
        }
      }
    }
  },
  computed: {
    result() {
      if (this.inputs.current && this.inputs.resistance && 
          !isNaN(this.inputs.current) && !isNaN(this.inputs.resistance)) {
        const voltage = this.inputs.current * this.inputs.resistance
        return isFinite(voltage) ? voltage.toFixed(4) : null
      }
      return null
    }
  },
  methods: {
    toggleDark() {
      this.colorMode = this.colorMode === 'dark' ? 'light' : 'dark'
    },
    initializeAnimations() {
      // Initialize formula animations
      this.$nextTick(() => {
        const formulaParts = this.$refs.formulaContainer?.querySelectorAll('.formula-part')
        formulaParts?.forEach((part, index) => {
          part.style.animationDelay = `${index * 0.2}s`
          part.classList.add('fade-in')
        })
      })
    },
    animateFormulaHighlight(type) {
      const element = this.$refs[`${type}Element`]
      if (element) {
        element.classList.remove('highlight')
        setTimeout(() => {
          element.classList.add('highlight')
        }, 10)
      }
    },
    updateCurrentAnimation() {
      const particles = this.$refs.circuitContainer?.querySelectorAll('.current-particle')
      const speed = this.inputs.current ? Math.max(0.5, 3 - this.inputs.current * 0.5) : 2
      particles?.forEach(particle => {
        const animation = particle.querySelector('animateMotion')
        if (animation) {
          animation.setAttribute('dur', `${speed}s`)
        }
      })
    },
    updateResistorAnimation() {
      const resistor = this.$refs.circuitContainer?.querySelector('.resistor-body')
      if (resistor && this.inputs.resistance) {
        const intensity = Math.min(this.inputs.resistance / 100, 1)
        resistor.style.strokeWidth = `${3 + intensity * 2}`
        resistor.style.opacity = `${0.7 + intensity * 0.3}`
      }
    },
    animateResult() {
      const resultElement = document.querySelector('.text-4xl.font-bold.text-primary')
      if (resultElement) {
        resultElement.classList.remove('result-pulse')
        setTimeout(() => {
          resultElement.classList.add('result-pulse')
        }, 10)
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
  gap: 0.5rem;
  font-size: 2rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
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
}

.circuit-animation {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.wire {
  stroke-dasharray: 5, 5;
  animation: wireFlow 2s linear infinite;
}

.resistor-body {
  transition: all 0.3s ease;
}

.current-particle {
  filter: drop-shadow(0 0 6px #FFD700);
}

.current-arrow {
  filter: drop-shadow(0 0 4px #FFD700);
}

.voltage-label {
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
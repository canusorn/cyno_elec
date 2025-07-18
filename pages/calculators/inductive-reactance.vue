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
            <CogIcon class="h-16 w-16 text-primary" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Inductive Reactance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate the reactance of an inductor in AC circuits
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="animated-formula" ref="formulaContainer">
              <span class="formula-part reactance" ref="reactanceElement">XL</span>
              <span class="formula-operator">=</span>
              <span class="formula-part constant">2π</span>
              <span class="formula-part frequency" ref="frequencyElement">f</span>
              <span class="formula-part inductance" ref="inductanceElement">L</span>
            </div>
          </div>
          
          <!-- Animated Inductive Reactance Visualization -->
          <div class="mt-8 flex justify-center">
            <div class="reactance-animation" ref="reactanceContainer">
              <svg width="350" height="250" viewBox="0 0 350 250" class="text-primary">
                <!-- AC Source -->
                <circle cx="50" cy="125" r="25" fill="none" stroke="currentColor" stroke-width="3" class="ac-source"/>
                <path d="M40,125 Q45,115 50,125 Q55,135 60,125" stroke="currentColor" stroke-width="2" fill="none"/>
                <text x="50" y="160" class="text-xs fill-current text-center">AC</text>
                
                <!-- Wires -->
                <line x1="75" y1="125" x2="140" y2="125" stroke="currentColor" stroke-width="3" class="wire"/>
                <line x1="210" y1="125" x2="275" y2="125" stroke="currentColor" stroke-width="3" class="wire"/>
                
                <!-- Inductor (coil) -->
                <g class="inductor-symbol">
                  <path d="M140,125 Q150,115 160,125 Q170,135 180,125 Q190,115 200,125 Q210,135 210,125" 
                        stroke="currentColor" stroke-width="4" fill="none" class="inductor-coil"/>
                  <text x="175" y="175" class="text-xs fill-current text-center">L</text>
                </g>
                
                <!-- Magnetic field lines -->
                <g class="magnetic-field">
                  <ellipse cx="175" cy="105" rx="30" ry="8" fill="none" stroke="#00BFFF" stroke-width="2" opacity="0.6" class="field-line">
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="175" cy="145" rx="30" ry="8" fill="none" stroke="#00BFFF" stroke-width="2" opacity="0.6" class="field-line">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="175" cy="125" rx="40" ry="12" fill="none" stroke="#00BFFF" stroke-width="1" opacity="0.4" class="field-line">
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                  </ellipse>
                </g>
                
                <!-- Current flow -->
                <g class="current-flow">
                  <circle r="3" fill="#FFD700" class="current-particle">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M75,125 Q140,125 175,125 Q210,125 275,125"/>
                  </circle>
                  <text x="120" y="110" class="text-xs fill-current current-label">I →</text>
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
                  <rect x="300" y="150" width="20" height="50" fill="#4CAF50" class="reactance-bar" opacity="0.7">
                    <animate attributeName="height" values="50;100;50" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="y" values="150;100;150" dur="2s" repeatCount="indefinite"/>
                  </rect>
                  <text x="310" y="220" class="text-xs fill-current text-center">XL</text>
                </g>
                
                <!-- Labels -->
                <text x="175" y="30" class="text-sm fill-current text-center font-bold">Inductive Reactance</text>
                <text x="175" y="240" class="text-xs fill-current text-center">XL ∝ f×L</text>
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
                    Inductance (L) - Henries
                  </label>
                  <input 
                    v-model.number="inputs.inductance"
                    type="number" 
                    step="any"
                    placeholder="Enter inductance in H (e.g., 0.001 for 1mH)"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                  />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Common units: 1mH = 0.001H, 1µH = 0.000001H, 1nH = 0.000000001H
                  </p>
                </div>
              </div>
            </div>

            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Result</h3>
              <div class="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg p-6">
                <div class="text-center">
                  <span class="text-lg text-gray-600 dark:text-gray-300">Inductive Reactance (XL)</span>
                  <div class="text-4xl font-bold text-primary mt-2">
                    {{ result !== null ? result : '---' }} Ω
                  </div>
                  <div v-if="result !== null" class="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    2π × {{ inputs.frequency }} × {{ inputs.inductance }} = {{ result }} Ω
                  </div>
                </div>
              </div>

              <!-- Formula Explanation -->
              <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formula Explanation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Inductive reactance is the opposition that an inductor offers to alternating current. 
                  It increases with increasing frequency and inductance. At DC (f=0), reactance is zero.
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
import { CogIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'InductiveReactanceCalculator',
  components: {
    CogIcon
  },
  setup() {
    // SEO
    useHead({
      title: 'Inductive Reactance Calculator - Cyno Electric',
      meta: [
        { name: 'description', content: 'Calculate inductive reactance using frequency and inductance (XL = 2πfL). Professional AC circuit analysis tool.' },
        { name: 'keywords', content: 'inductive reactance calculator, AC circuits, inductor reactance, frequency inductance, electrical engineering' }
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
        frequency: null,
        inductance: null
      },
      animationSpeed: 1
    }
  },
  computed: {
    result() {
      if (this.inputs.frequency && this.inputs.inductance && 
          !isNaN(this.inputs.frequency) && !isNaN(this.inputs.inductance) &&
          this.inputs.frequency > 0 && this.inputs.inductance > 0) {
        const reactance = 2 * Math.PI * this.inputs.frequency * this.inputs.inductance
        return isFinite(reactance) ? reactance.toFixed(4) : null
      }
      return null
    }
  },
  mounted() {
    this.initializeAnimations()
  },
  watch: {
    'inputs.frequency'() {
      this.animateFormulaHighlight('frequency')
      this.updateFrequencyAnimation()
    },
    'inputs.inductance'() {
      this.animateFormulaHighlight('inductance')
      this.updateInductanceAnimation()
    },
    result() {
      this.animateResult()
      this.updateReactanceVisualization()
    }
  },
  methods: {
    toggleDark() {
      this.colorMode = this.colorMode === 'dark' ? 'light' : 'dark'
    },
    initializeAnimations() {
      // Animate formula parts on load
      setTimeout(() => {
        const parts = ['reactanceElement', 'frequencyElement', 'inductanceElement']
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
        frequency: 'frequencyElement',
        inductance: 'inductanceElement',
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
      const magneticField = document.querySelectorAll('.field-line')
      
      const frequency = parseFloat(this.inputs.frequency) || 1
      const speed = Math.max(0.2, Math.min(3, frequency / 1000)) // Normalize frequency
      
      // Update frequency pulse speed
      if (freqPulse) {
        const animations = freqPulse.querySelectorAll('animate')
        animations.forEach(anim => {
          anim.setAttribute('dur', `${1 / speed}s`)
        })
      }
      
      // Update magnetic field animation speed
      magneticField.forEach(field => {
        const animation = field.querySelector('animate')
        if (animation) {
          animation.setAttribute('dur', `${1.5 / speed}s`)
        }
      })
    },
    updateInductanceAnimation() {
      const inductorCoil = document.querySelector('.inductor-coil')
      const magneticField = document.querySelectorAll('.field-line')
      const inductance = parseFloat(this.inputs.inductance) || 1
      
      // Visual representation of inductance (coil thickness and field strength)
      const strokeWidth = Math.max(2, Math.min(6, 4 + (inductance * 1000)))
      
      if (inductorCoil) {
        inductorCoil.setAttribute('stroke-width', strokeWidth)
      }
      
      // Update magnetic field intensity
      const fieldIntensity = Math.max(0.2, Math.min(1, inductance * 1000))
      magneticField.forEach((field, index) => {
        const baseOpacity = [0.6, 0.6, 0.4][index] || 0.4
        field.style.opacity = baseOpacity * fieldIntensity
      })
    },
    updateReactanceVisualization() {
      const reactanceBar = document.querySelector('.reactance-bar')
      const reactance = this.result
      
      if (reactanceBar && reactance > 0) {
        // Direct relationship visualization (higher reactance = higher bar)
        const maxHeight = 150
        const normalizedHeight = Math.max(20, Math.min(maxHeight, (reactance / 1000) * maxHeight))
        
        reactanceBar.setAttribute('height', normalizedHeight)
        reactanceBar.setAttribute('y', 200 - normalizedHeight)
        
        // Color based on reactance value
        const hue = Math.max(60, Math.min(120, 60 + (reactance / 1000) * 60)) // Yellow to green
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
  font-size: 2rem;
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

.inductor-coil {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 3px currentColor);
}

.field-line {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 2px #00BFFF);
}

.current-particle {
  filter: drop-shadow(0 0 6px #FFD700);
}

.current-label {
  font-weight: bold;
  animation: pulse 2s ease-in-out infinite;
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
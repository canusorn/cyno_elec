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
            <span class="text-3xl font-mono font-bold text-primary">R = (Vs - Vf) / If</span>
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

    const $colorMode = useColorMode()
    
    return {
      $colorMode
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      inputs: {
        supplyVoltage: null,
        forwardVoltage: null,
        forwardCurrent: null
      }
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
  methods: {
    toggleDark() {
      this.$colorMode = this.$colorMode === 'dark' ? 'light' : 'dark'
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
</style>
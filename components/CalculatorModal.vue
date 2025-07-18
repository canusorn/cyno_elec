<template>
  <div v-if="calculator" 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
    @click="$emit('close')"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`calculator-modal-title`">
    
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6" 
      @click.stop
      ref="modalContent">
      
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 id="calculator-modal-title" 
          class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ calculator.title }}
        </h3>
        <button @click="$emit('close')" 
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close calculator modal">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Formula Display -->
      <div class="mb-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center mb-4">
          <span class="text-2xl font-mono font-bold text-primary">{{ calculator.formula }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 text-sm">{{ calculator.description }}</p>
      </div>

      <!-- Input Fields -->
      <div class="space-y-4">
        <div v-for="(input, key) in calculator.inputs" :key="key">
          <label :for="`input-${key}`" 
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ input.label }} ({{ input.unit }})
          </label>
          <input 
            :id="`input-${key}`"
            v-model.number="inputs[key]"
            type="number" 
            step="any"
            :placeholder="input.placeholder"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            :class="{
              'border-red-500 focus:ring-red-500': errors[key],
              'border-green-500 focus:ring-green-500': inputs[key] && !errors[key]
            }"
            @input="validateInput(key)"
          />
          <p v-if="errors[key]" 
            class="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert">
            {{ errors[key] }}
          </p>
        </div>
      </div>

      <!-- Result Display -->
      <div v-if="result !== null" 
        class="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg border border-primary/20">
        <div class="text-center">
          <span class="text-sm text-gray-600 dark:text-gray-300">Result:</span>
          <div class="text-2xl font-bold text-primary mt-1" 
            :class="{
              'text-red-500': result === 'Error' || result === 'Invalid',
              'text-primary': result !== 'Error' && result !== 'Invalid'
            }">
            {{ result }} {{ result !== 'Error' && result !== 'Invalid' ? calculator.resultUnit : '' }}
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="hasErrors" 
        class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-sm text-red-600 dark:text-red-400">
          Please correct the errors above to calculate the result.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" 
        class="mt-6 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span class="ml-2 text-gray-600 dark:text-gray-300">Calculating...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorModal',
  props: {
    calculator: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  data() {
    return {
      inputs: {},
      result: null,
      errors: {},
      loading: false
    }
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).some(key => this.errors[key])
    },
    hasAllRequiredInputs() {
      if (!this.calculator) return false
      const requiredInputs = Object.keys(this.calculator.inputs)
      return requiredInputs.every(key => 
        this.inputs[key] !== undefined && 
        this.inputs[key] !== null && 
        this.inputs[key] !== '' &&
        !isNaN(this.inputs[key])
      )
    }
  },
  watch: {
    calculator: {
      handler(newCalculator) {
        if (newCalculator) {
          this.resetModal()
          this.$nextTick(() => {
            this.focusFirstInput()
          })
        }
      },
      immediate: true
    },
    inputs: {
      handler() {
        this.calculateResult()
      },
      deep: true
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    resetModal() {
      this.inputs = {}
      this.result = null
      this.errors = {}
      this.loading = false
    },
    focusFirstInput() {
      const firstInput = this.$el.querySelector('input[type="number"]')
      if (firstInput) {
        firstInput.focus()
      }
    },
    validateInput(key) {
      const value = this.inputs[key]
      const input = this.calculator.inputs[key]
      
      // Clear previous error
      this.$set(this.errors, key, null)
      
      if (value === undefined || value === null || value === '') {
        this.$set(this.errors, key, `${input.label} is required`)
        return false
      }
      
      if (isNaN(value)) {
        this.$set(this.errors, key, `${input.label} must be a valid number`)
        return false
      }
      
      if (value <= 0) {
        this.$set(this.errors, key, `${input.label} must be greater than 0`)
        return false
      }
      
      return true
    },
    validateAllInputs() {
      if (!this.calculator) return false
      
      let isValid = true
      Object.keys(this.calculator.inputs).forEach(key => {
        if (!this.validateInput(key)) {
          isValid = false
        }
      })
      
      return isValid
    },
    async calculateResult() {
      if (!this.calculator || !this.hasAllRequiredInputs || this.hasErrors) {
        this.result = null
        return
      }
      
      this.loading = true
      
      try {
        // Simulate async calculation for better UX
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const calculationResult = this.calculator.calculate(this.inputs)
        
        if (!isFinite(calculationResult)) {
          this.result = 'Invalid'
        } else {
          this.result = parseFloat(calculationResult.toFixed(4))
        }
      } catch (error) {
        console.error('Calculation error:', error)
        this.result = 'Error'
      } finally {
        this.loading = false
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--tw-color-primary) !important;
}

.from-primary\/10 {
  --tw-gradient-from: rgba(159, 168, 218, 0.1) !important;
}

.to-primary-dark\/10 {
  --tw-gradient-to: rgba(121, 134, 203, 0.1) !important;
}

.border-primary\/20 {
  border-color: rgba(159, 168, 218, 0.2) !important;
}
</style>
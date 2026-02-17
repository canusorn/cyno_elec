<template>
  <div class="calculation-steps" :class="{ 'dark-mode': isDark }">
    <div class="steps-header">
      <h3 class="steps-title">
        <span class="icon">📐</span>
        Calculation Steps
      </h3>
      <button 
        v-if="steps.length > 0"
        @click="toggleExpand" 
        class="toggle-btn"
        type="button"
      >
        {{ isExpanded ? 'Hide' : 'Show' }}
        <svg 
          class="chevron" 
          :class="{ 'rotated': isExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <transition name="expand">
      <div v-show="isExpanded" class="steps-content">
        <!-- Formula Display -->
        <div v-if="formula" class="formula-box">
          <div class="formula-label">Formula:</div>
          <div class="formula-text">{{ formula }}</div>
        </div>

        <!-- Steps List -->
        <div class="steps-list">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-item"
            :class="{ 'result-step': index === steps.length - 1 }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-description">{{ step.description }}</div>
              <div v-if="step.calculation" class="step-calculation">
                <span class="calc-expression">{{ step.calculation }}</span>
                <span v-if="step.result" class="calc-result"> = {{ step.result }}</span>
              </div>
              <div v-if="step.note" class="step-note">{{ step.note }}</div>
            </div>
          </div>
        </div>

        <!-- Final Result -->
        <div v-if="finalResult" class="final-result">
          <div class="result-label">Final Answer:</div>
          <div class="result-value">{{ finalResult }}</div>
        </div>

        <!-- Comparison (if previous value available) -->
        <div v-if="showComparison && previousValue !== undefined" class="comparison-box">
          <div class="comparison-header">
            <span class="comparison-icon">📊</span>
            <span>Before vs After</span>
          </div>
          <div class="comparison-values">
            <div class="comparison-item">
              <span class="comparison-label">Before:</span>
              <span class="comparison-value">{{ previousValue }}</span>
            </div>
            <div class="comparison-arrow">→</div>
            <div class="comparison-item">
              <span class="comparison-label">After:</span>
              <span class="comparison-value highlighted">{{ currentValue }}</span>
            </div>
          </div>
          <div v-if="percentChange !== null" class="percent-change" :class="percentChangeClass">
            {{ percentChangeText }}
          </div>
        </div>

        <!-- Copy Result Button -->
        <div class="actions">
          <button 
            @click="copyResult" 
            class="action-btn copy-btn"
            type="button"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            {{ copyButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Interfaces
interface CalculationStep {
  description: string
  calculation?: string
  result?: string
  note?: string
}

interface Props {
  formula?: string
  steps: CalculationStep[]
  finalResult?: string
  showComparison?: boolean
  previousValue?: string
  currentValue?: string
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  formula: '',
  steps: () => [],
  finalResult: '',
  showComparison: false,
  previousValue: undefined,
  currentValue: '',
  isDark: false
})

// State
const isExpanded = ref(true)
const copyButtonText = ref('Copy Result')

// Computed
const percentChange = computed(() => {
  if (!props.showComparison || props.previousValue === undefined) return null
  
  const prev = parseFloat(props.previousValue.replace(/[^\d.-]/g, ''))
  const curr = parseFloat(props.currentValue.replace(/[^\d.-]/g, ''))
  
  if (isNaN(prev) || isNaN(curr) || prev === 0) return null
  
  return ((curr - prev) / prev) * 100
})

const percentChangeClass = computed(() => {
  if (percentChange.value === null) return ''
  const change = Math.abs(percentChange.value)
  if (percentChange.value > 0) return 'positive'
  if (percentChange.value < 0) return 'negative'
  if (change < 1) return 'neutral'
  return ''
})

const percentChangeText = computed(() => {
  if (percentChange.value === null) return ''
  
  const change = Math.abs(percentChange.value)
  const direction = percentChange.value > 0 ? 'increased' : 'decreased'
  
  if (change < 0.1) return 'Almost no change'
  if (change < 1) return `Slight ${direction} (${change.toFixed(2)}%)`
  if (change < 10) return `Moderate ${direction} (${change.toFixed(1)}%)`
  return `Significant ${direction} (${change.toFixed(0)}%)`
})

// Methods
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyResult = async () => {
  if (!props.finalResult) return
  
  try {
    await navigator.clipboard.writeText(props.finalResult)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy Result'
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = props.finalResult
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy Result'
    }, 2000)
  }
}
</script>

<style scoped>
.calculation-steps {
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%);
  border-radius: 1rem;
  padding: 1.25rem;
  margin-top: 1.5rem;
  border: 1px solid rgba(159, 168, 218, 0.2);
  transition: all 0.3s ease;
}

.dark-mode {
  background: linear-gradient(135deg, rgba(55,65,81,0.7) 0%, rgba(31,41,55,0.4) 100%);
  border-color: rgba(159, 168, 218, 0.1);
}

.steps-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.steps-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.dark-mode .steps-title {
  color: #E5E7EB;
}

.icon {
  font-size: 1.25rem;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6B7280;
  background: transparent;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode .toggle-btn {
  color: #9CA3AF;
  border-color: #4B5563;
}

.toggle-btn:hover {
  background: #F3F4F6;
  color: #374151;
}

.dark-mode .toggle-btn:hover {
  background: #374151;
  color: #E5E7EB;
}

.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* Expand Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.steps-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Formula Box */
.formula-box {
  background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
  border-radius: 0.75rem;
  padding: 1rem;
  border-left: 4px solid #7986CB;
}

.dark-mode .formula-box {
  background: linear-gradient(135deg, rgba(49, 46, 129, 0.5) 0%, rgba(30, 27, 75, 0.5) 100%);
  border-left-color: #9FA8DA;
}

.formula-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.dark-mode .formula-label {
  color: #9CA3AF;
}

.formula-text {
  font-size: 1.125rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: #4338CA;
}

.dark-mode .formula-text {
  color: #A5B4FC;
}

/* Steps List */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
  transition: all 0.2s ease;
}

.dark-mode .step-item {
  background: rgba(55, 65, 81, 0.5);
  border-color: #4B5563;
}

.step-item:hover {
  border-color: #9FA8DA;
  box-shadow: 0 2px 8px rgba(159, 168, 218, 0.1);
}

.step-item.result-step {
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
  border-color: #10B981;
}

.dark-mode .step-item.result-step {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
  border-color: #34D399;
}

.step-number {
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9FA8DA;
  color: white;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 600;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.step-description {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.dark-mode .step-description {
  color: #E5E7EB;
}

.step-calculation {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #6B7280;
}

.dark-mode .step-calculation {
  color: #9CA3AF;
}

.calc-expression {
  font-weight: 500;
}

.calc-result {
  font-weight: 600;
  color: #4338CA;
}

.dark-mode .calc-result {
  color: #A5B4FC;
}

.step-note {
  font-size: 0.75rem;
  color: #9CA3AF;
  font-style: italic;
}

/* Final Result */
.final-result {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  border: 2px solid #F59E0B;
}

.dark-mode .final-result {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
  border-color: #FBBF24;
}

.result-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #92400E;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.dark-mode .result-label {
  color: #FCD34D;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: #92400E;
}

.dark-mode .result-value {
  color: #FCD34D;
}

/* Comparison Box */
.comparison-box {
  background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #C4B5FD;
}

.dark-mode .comparison-box {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
  border-color: #A78BFA;
}

.comparison-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6B21A8;
  margin-bottom: 0.75rem;
}

.dark-mode .comparison-header {
  color: #C4B5FD;
}

.comparison-icon {
  font-size: 1rem;
}

.comparison-values {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comparison-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.comparison-label {
  font-size: 0.75rem;
  color: #7C3AED;
}

.dark-mode .comparison-label {
  color: #A78BFA;
}

.comparison-value {
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: #5B21B6;
}

.dark-mode .comparison-value {
  color: #C4B5FD;
}

.comparison-value.highlighted {
  color: #7C3AED;
  font-size: 1.125rem;
}

.dark-mode .comparison-value.highlighted {
  color: #DDD6FE;
}

.comparison-arrow {
  font-size: 1.25rem;
  color: #A78BFA;
}

.percent-change {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
}

.percent-change.positive {
  background: #D1FAE5;
  color: #065F46;
}

.percent-change.negative {
  background: #FEE2E2;
  color: #991B1B;
}

.percent-change.neutral {
  background: #F3F4F6;
  color: #6B7280;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
  border-top: 1px solid #E5E7EB;
}

.dark-mode .actions {
  border-top-color: #4B5563;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4338CA;
  background: white;
  border: 2px solid #7986CB;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode .action-btn {
  color: #A5B4FC;
  background: rgba(55, 65, 81, 0.5);
  border-color: #9FA8DA;
}

.action-btn:hover {
  background: #EEF2FF;
  border-color: #4338CA;
  transform: translateY(-1px);
}

.dark-mode .action-btn:hover {
  background: rgba(49, 46, 129, 0.5);
  border-color: #7986CB;
}

.action-btn .icon {
  width: 1rem;
  height: 1rem;
}

/* Responsive */
@media (max-width: 640px) {
  .calculation-steps {
    padding: 1rem;
  }

  .step-item {
    padding: 0.5rem;
  }

  .result-value {
    font-size: 1.25rem;
  }
}
</style>

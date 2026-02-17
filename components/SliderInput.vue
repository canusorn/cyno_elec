<template>
  <div class="slider-input-group" :class="{ 'dark-mode': isDark }">
    <!-- Label and Value Display -->
    <div class="flex justify-between items-center mb-2">
      <label class="label-text" :for="inputId">
        {{ icon }} {{ label }}
      </label>
      <div class="value-display">
        <span class="value-text" :style="{ color: valueColor }">{{ formattedValue }}</span>
        <span class="unit-text">{{ unit }}</span>
      </div>
    </div>

    <!-- Slider Input -->
    <div class="slider-container">
      <input
        :id="inputId"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="onInput"
        @change="onChange"
        class="slider"
        :class="sliderClass"
        :disabled="disabled"
      />
    </div>

    <!-- Range Labels -->
    <div class="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
      <span>{{ minLabel }}</span>
      <span v-if="midLabel">{{ midLabel }}</span>
      <span>{{ maxLabel }}</span>
    </div>

    <!-- Preset Buttons (optional) -->
    <div v-if="presets && presets.length > 0" class="preset-buttons mt-3 flex flex-wrap gap-2">
      <button
        v-for="preset in presets"
        :key="preset.value"
        @click="selectPreset(preset.value)"
        class="preset-btn"
        :class="{ 'active': isPresetActive(preset.value) }"
        :disabled="disabled"
        type="button"
      >
        {{ preset.label }}
      </button>
    </div>

    <!-- Input Field (optional, for precise input) -->
    <div v-if="showNumberInput" class="number-input-container mt-3">
      <input
        type="number"
        :value="modelValue"
        @input="onNumberInput"
        :min="min"
        :max="max"
        :step="step"
        :placeholder="placeholder"
        class="number-input"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Preset {
  label: string
  value: number
}

interface Props {
  modelValue: number
  label: string
  unit?: string
  icon?: string
  min?: number
  max?: number
  step?: number
  minLabel?: string
  maxLabel?: string
  midLabel?: string
  presets?: Preset[]
  showNumberInput?: boolean
  placeholder?: string
  disabled?: boolean
  sliderColor?: 'blue' | 'purple' | 'green' | 'orange' | 'red'
  isDark?: boolean
  formatDecimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  icon: '',
  min: 0,
  max: 100,
  step: 1,
  minLabel: '',
  maxLabel: '',
  midLabel: '',
  presets: () => [],
  showNumberInput: false,
  placeholder: 'Enter value...',
  disabled: false,
  sliderColor: 'blue',
  isDark: false,
  formatDecimals: 2
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: number]
  'input': [value: number]
  'change': [value: number]
}>()

// Computed
const inputId = computed(() => `slider-${Math.random().toString(36).substr(2, 9)}`)

const formattedValue = computed(() => {
  if (props.formatDecimals === 0) {
    return Math.round(props.modelValue).toString()
  }
  return props.modelValue.toFixed(props.formatDecimals)
})

const valueColor = computed(() => {
  const ratio = (props.modelValue - props.min) / (props.max - props.min)
  
  // Color gradient from green (low) to red (high)
  if (ratio < 0.25) return '#22C55E'
  if (ratio < 0.5) return '#3B82F6'
  if (ratio < 0.75) return '#F59E0B'
  return '#EF4444'
})

const sliderClass = computed(() => `slider-${props.sliderColor}`)

// Methods
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  emit('update:modelValue', value)
  emit('input', value)
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  emit('change', value)
}

const onNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  if (!isNaN(value)) {
    emit('update:modelValue', value)
    emit('input', value)
  }
}

const selectPreset = (value: number) => {
  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
}

const isPresetActive = (value: number) => {
  return Math.abs(props.modelValue - value) < 0.001
}
</script>

<style scoped>
.slider-input-group {
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%);
  transition: all 0.3s ease;
}

.dark-mode {
  background: linear-gradient(135deg, rgba(55,65,81,0.5) 0%, rgba(31,41,55,0.3) 100%);
}

.label-text {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  transition: color 0.3s ease;
}

.dark-mode .label-text {
  color: #E5E7EB;
}

.value-display {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.value-text {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
}

.unit-text {
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.dark-mode .unit-text {
  color: #9CA3AF;
}

.slider-container {
  position: relative;
  width: 100%;
  padding: 0.5rem 0;
}

/* Custom Slider Styling */
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E5E7EB 0%, #D1D5DB 100%);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dark-mode .slider {
  background: linear-gradient(to right, #4B5563 0%, #374151 100%);
}

/* Slider Thumb Styles */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid currentColor;
  transition: all 0.2s ease;
  margin-top: -8px; /* Align thumb with track */
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid currentColor;
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slider::-webkit-slider-thumb:active {
  transform: scale(1.05);
}

.slider::-moz-range-thumb:active {
  transform: scale(1.05);
}

/* Color Variants */
.slider-blue::-webkit-slider-thumb {
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-color: #3B82F6;
}

.slider-blue::-moz-range-thumb {
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-color: #3B82F6;
}

.slider-blue::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #DBEAFE, #3B82F6);
}

.slider-purple::-webkit-slider-thumb {
  background: linear-gradient(135deg, #8B5CF6, #6D28D9);
  border-color: #8B5CF6;
}

.slider-purple::-moz-range-thumb {
  background: linear-gradient(135deg, #8B5CF6, #6D28D9);
  border-color: #8B5CF6;
}

.slider-purple::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #EDE9FE, #8B5CF6);
}

.slider-green::-webkit-slider-thumb {
  background: linear-gradient(135deg, #22C55E, #16A34A);
  border-color: #22C55E;
}

.slider-green::-moz-range-thumb {
  background: linear-gradient(135deg, #22C55E, #16A34A);
  border-color: #22C55E;
}

.slider-green::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #D1FAE5, #22C55E);
}

.slider-orange::-webkit-slider-thumb {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  border-color: #F59E0B;
}

.slider-orange::-moz-range-thumb {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  border-color: #F59E0B;
}

.slider-orange::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #FEF3C7, #F59E0B);
}

.slider-red::-webkit-slider-thumb {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  border-color: #EF4444;
}

.slider-red::-moz-range-thumb {
  background: linear-gradient(135deg, #EF4444, #DC2626);
  border-color: #EF4444;
}

.slider-red::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #FEE2E2, #EF4444);
}

/* Preset Buttons */
.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 2px solid #E5E7EB;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-mode .preset-btn {
  border-color: #4B5563;
  background: #374151;
  color: #E5E7EB;
}

.preset-btn:hover:not(:disabled) {
  border-color: #9FA8DA;
  background: #F3F4F6;
  transform: translateY(-1px);
}

.dark-mode .preset-btn:hover:not(:disabled) {
  border-color: #7986CB;
  background: #4B5563;
}

.preset-btn.active {
  border-color: #7986CB;
  background: #EEF2FF;
  color: #4338CA;
}

.dark-mode .preset-btn.active {
  border-color: #9FA8DA;
  background: #312E81;
  color: #C5CAE9;
}

.preset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Number Input */
.number-input-container {
  margin-top: 0.75rem;
}

.number-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  color: #374151;
  transition: all 0.2s ease;
}

.dark-mode .number-input {
  border-color: #4B5563;
  background: #374151;
  color: #E5E7EB;
}

.number-input:focus {
  outline: none;
  border-color: #7986CB;
  box-shadow: 0 0 0 3px rgba(121, 134, 203, 0.1);
}

.dark-mode .number-input:focus {
  border-color: #9FA8DA;
  box-shadow: 0 0 0 3px rgba(159, 168, 218, 0.2);
}

/* Responsive */
@media (max-width: 640px) {
  .slider-input-group {
    padding: 0.75rem;
  }

  .slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }

  .slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
  }

  .value-text {
    font-size: 1.25rem;
  }
}
</style>

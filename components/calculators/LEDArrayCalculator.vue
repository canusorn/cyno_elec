<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const configuration = ref<'series' | 'parallel' | 'mixed'>('series')
const voltageSource = ref(12) // Volts
const ledForwardVoltage = ref(2.1) // Volts (typical red LED)
const ledCurrent = ref(20) // mA
const ledsPerString = ref(3)
const numberOfStrings = ref(1)

// Series calculations
const seriesTotalVoltage = computed(() => {
  return ledsPerString.value * ledForwardVoltage.value
})

const seriesResistor = computed(() => {
  const voltageDrop = voltageSource.value - seriesTotalVoltage.value
  if (voltageDrop <= 0) return 0
  return voltageDrop / (ledCurrent.value / 1000)
})

const seriesResistorPower = computed(() => {
  const voltageDrop = voltageSource.value - seriesTotalVoltage.value
  if (voltageDrop <= 0) return 0
  return Math.pow(voltageDrop, 2) / seriesResistor.value
})

const seriesTotalCurrent = computed(() => {
  return ledCurrent.value / 1000 // Amperes
})

const seriesTotalPower = computed(() => {
  return voltageSource.value * seriesTotalCurrent.value
})

// Parallel calculations (each LED has its own resistor)
const parallelResistor = computed(() => {
  const voltageDrop = voltageSource.value - ledForwardVoltage.value
  if (voltageDrop <= 0) return 0
  return voltageDrop / (ledCurrent.value / 1000)
})

const parallelResistorPower = computed(() => {
  const voltageDrop = voltageSource.value - ledForwardVoltage.value
  if (voltageDrop <= 0) return 0
  return Math.pow(voltageDrop, 2) / parallelResistor.value
})

const parallelTotalCurrent = computed(() => {
  return (ledsPerString.value * ledCurrent.value) / 1000 // Amperes
})

const parallelTotalPower = computed(() => {
  return voltageSource.value * parallelTotalCurrent.value
})

// Mixed calculations (multiple parallel strings)
const mixedVoltageDrop = computed(() => {
  return voltageSource.value - (ledsPerString.value * ledForwardVoltage.value)
})

const mixedStringResistor = computed(() => {
  if (mixedVoltageDrop.value <= 0) return 0
  return mixedVoltageDrop.value / (ledCurrent.value / 1000)
})

const mixedStringResistorPower = computed(() => {
  if (mixedVoltageDrop.value <= 0) return 0
  return Math.pow(mixedVoltageDrop.value, 2) / mixedStringResistor.value
})

const mixedTotalCurrent = computed(() => {
  return (numberOfStrings.value * ledCurrent.value) / 1000 // Amperes
})

const mixedTotalPower = computed(() => {
  return voltageSource.value * mixedTotalCurrent.value
})

const totalLEDs = computed(() => {
  if (configuration.value === 'series') {
    return ledsPerString.value
  } else if (configuration.value === 'parallel') {
    return ledsPerString.value
  } else {
    return ledsPerString.value * numberOfStrings.value
  }
})

// Validation
const voltageWarning = computed(() => {
  if (configuration.value === 'series') {
    return seriesTotalVoltage.value >= voltageSource.value
  } else if (configuration.value === 'parallel') {
    return ledForwardVoltage.value >= voltageSource.value
  } else {
    return (ledsPerString.value * ledForwardVoltage.value) >= voltageSource.value
  }
})

// Common LED forward voltages
const ledTypes = [
  { name: 'Red (1.8-2.2V)', voltage: 2.1, color: 'red' },
  { name: 'Green (2.0-3.1V)', voltage: 2.2, color: 'green' },
  { name: 'Blue (3.0-3.3V)', voltage: 3.2, color: 'blue' },
  { name: 'White (3.0-3.3V)', voltage: 3.2, color: 'white' },
  { name: 'Yellow (2.0-2.4V)', voltage: 2.2, color: 'yellow' },
  { name: 'Amber (2.0-2.2V)', voltage: 2.1, color: 'orange' },
  { name: 'IR (1.2-1.6V)', voltage: 1.4, color: 'gray' },
  { name: 'UV (3.1-3.6V)', voltage: 3.3, color: 'purple' }
]

const setLEDType = (voltage: number) => {
  ledForwardVoltage.value = voltage
}

// Common voltage sources
const voltagePresets = [
  { name: '3.3V', voltage: 3.3 },
  { name: '5V', voltage: 5 },
  { name: '9V', voltage: 9 },
  { name: '12V', voltage: 12 },
  { name: '24V', voltage: 24 },
  { name: 'USB 5V', voltage: 5 },
  { name: 'Automotive', voltage: 13.8 }
]

const setVoltage = (voltage: number) => {
  voltageSource.value = voltage
}

// Common current settings
const currentPresets = [
  { name: '5 mA', current: 5 },
  { name: '10 mA', current: 10 },
  { name: '20 mA (Standard)', current: 20 },
  { name: '25 mA', current: 25 },
  { name: '30 mA (High Power)', current: 30 }
]

const setCurrent = (current: number) => {
  ledCurrent.value = current
}

// Format functions
const formatResistance = (ohms: number) => {
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(2)} kΩ`
  if (ohms === 0) return '0 Ω'
  return `${ohms.toFixed(1)} Ω`
}

const formatPower = (watts: number) => {
  if (watts >= 1) return `${watts.toFixed(2)} W`
  return `${(watts * 1000).toFixed(1)} mW`
}

const formatCurrent = (amps: number) => {
  if (amps >= 1) return `${amps.toFixed(2)} A`
  return `${(amps * 1000).toFixed(1)} mA`
}

// Standard resistor values (E12 series)
const findStandardResistor = (ohms: number) => {
  if (ohms <= 0) return { value: 0, power: 'N/A' }
  
  const e12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2]
  
  // Find the decade
  let decade = 1
  while (ohms / decade > 10) {
    decade *= 10
  }
  
  const normalized = ohms / decade
  let closest = e12[0]
  let minDiff = Math.abs(normalized - e12[0])
  
  for (const value of e12) {
    const diff = Math.abs(normalized - value)
    if (diff < minDiff) {
      minDiff = diff
      closest = value
    }
  }
  
  const standardValue = closest * decade
  
  // Determine power rating (at least 2x actual power)
  let actualPower = 0
  if (configuration.value === 'series') {
    actualPower = seriesResistorPower.value
  } else if (configuration.value === 'parallel') {
    actualPower = parallelResistorPower.value
  } else {
    actualPower = mixedStringResistorPower.value
  }
  
  let powerRating = '0.125W'
  if (actualPower > 1) {
    powerRating = '2W or higher'
  } else if (actualPower > 0.5) {
    powerRating = '1W'
  } else if (actualPower > 0.25) {
    powerRating = '0.5W'
  } else if (actualPower > 0.125) {
    powerRating = '0.25W'
  }
  
  return { value: standardValue, power: powerRating }
}

// Calculate LED visual positions
const ledPositions = computed(() => {
  const positions = []
  const total = totalLEDs.value
  
  if (configuration.value === 'mixed') {
    // Grid layout for mixed
    for (let i = 0; i < numberOfStrings.value; i++) {
      for (let j = 0; j < ledsPerString.value; j++) {
        positions.push({
          x: (j * 60) + 40,
          y: (i * 40) + 40,
          row: i,
          col: j
        })
      }
    }
  } else {
    // Single row for series/parallel
    for (let i = 0; i < total; i++) {
      positions.push({
        x: (i * 60) + 40,
        y: 60,
        row: 0,
        col: i
      })
    }
  }
  
  return positions
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
      💡 LED Array Calculator
    </h2>

    <!-- Controls Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Configuration Selection -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Circuit Configuration
          </h3>
          
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button @click="configuration = 'series'"
              class="px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2"
              :class="configuration === 'series' 
                ? 'bg-yellow-500 text-white border-yellow-500' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-yellow-400'">
              Series
            </button>
            <button @click="configuration = 'parallel'"
              class="px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2"
              :class="configuration === 'parallel' 
                ? 'bg-yellow-500 text-white border-yellow-500' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-yellow-400'">
              Parallel
            </button>
            <button @click="configuration = 'mixed'"
              class="px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2"
              :class="configuration === 'mixed' 
                ? 'bg-yellow-500 text-white border-yellow-500' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-yellow-400'">
              Mixed
            </button>
          </div>
          
          <!-- Voltage Source -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source Voltage: <span class="text-yellow-500 font-bold">{{ voltageSource }}V</span>
            </label>
            <input type="range" v-model.number="voltageSource" min="1" max="48" step="0.1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-500">
            <div class="flex gap-2 mt-2">
              <button v-for="preset in voltagePresets" :key="preset.name" @click="setVoltage(preset.voltage)"
                class="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- LED Forward Voltage -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LED Forward Voltage: <span class="text-yellow-500 font-bold">{{ ledForwardVoltage }}V</span>
            </label>
            <input type="range" v-model.number="ledForwardVoltage" min="1.2" max="3.6" step="0.1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-500">
            <div class="flex flex-wrap gap-2 mt-2">
              <button v-for="type in ledTypes" :key="type.name" @click="setLEDType(type.voltage)"
                class="px-2 py-1 text-xs rounded transition-colors border"
                :style="`background-color: ${type.color}20; border-color: ${type.color}60; color: ${type.color}`">
                {{ type.name }}
              </button>
            </div>
          </div>

          <!-- LED Current -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LED Current: <span class="text-yellow-500 font-bold">{{ ledCurrent }} mA</span>
            </label>
            <input type="range" v-model.number="ledCurrent" min="1" max="50" step="1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-500">
            <div class="flex gap-2 mt-2">
              <button v-for="preset in currentPresets" :key="preset.name" @click="setCurrent(preset.current)"
                class="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- LEDs Per String (for Series/Mixed) or Total LEDs (for Parallel) -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span v-if="configuration === 'parallel'">Total LEDs</span>
              <span v-else>LEDs Per String</span>: 
              <span class="text-yellow-500 font-bold">{{ ledsPerString }}</span>
            </label>
            <input type="range" v-model.number="ledsPerString" min="1" max="12" step="1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>12</span>
            </div>
          </div>

          <!-- Number of Strings (for Mixed only) -->
          <div v-if="configuration === 'mixed'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Parallel Strings: <span class="text-yellow-500 font-bold">{{ numberOfStrings }}</span>
            </label>
            <input type="range" v-model.number="numberOfStrings" min="1" max="8" step="1" 
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-500">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>8</span>
            </div>
          </div>
        </div>

        <!-- Circuit Diagram -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Circuit Diagram
          </h3>
          <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-700">
            <svg viewBox="0 0 400 200" class="w-full h-auto">
              <!-- Source voltage symbol -->
              <circle cx="50" cy="100" r="15" fill="none" stroke="#F59E0B" stroke-width="2" />
              <text x="50" y="105" text-anchor="middle" fill="#F59E0B" font-size="10" font-weight="bold">V</text>
              <text x="50" y="130" text-anchor="middle" fill="#F59E0B" font-size="10">{{ voltageSource }}V</text>
              
              <!-- LEDs -->
              <g v-if="configuration === 'series'">
                <line x1="65" y1="100" x2="90" y2="100" stroke="#F59E0B" stroke-width="2" />
                <g v-for="(led, index) in Math.min(ledsPerString, 6)" :key="index">
                  <line :x1="90 + (index * 40)" y1="100" :x2="100 + (index * 40)" y2="100" stroke="#F59E0B" stroke-width="2" />
                  <!-- LED symbol -->
                  <polygon :points="`${100 + (index * 40)},90 ${110 + (index * 40)},100 ${100 + (index * 40)},110`" fill="#EAB308" opacity="0.6" />
                  <line :x1="100 + (index * 40)" y1="90" :x2="100 + (index * 40)" y2="110" stroke="#F59E0B" stroke-width="2" />
                  <line :x1="110 + (index * 40)" y1="90" :x2="110 + (index * 40)" y2="110" stroke="#F59E0B" stroke-width="2" />
                  <line :x1="98 + (index * 40)" y1="86" :x2="106 + (index * 40)" y2="78" stroke="#F59E0B" stroke-width="1.5" />
                  <line :x1="106 + (index * 40)" y1="78" :x2="108 + (index * 40)" y2="76" stroke="#F59E0B" stroke-width="1.5" />
                  <line :x1="110 + (index * 40)" y1="90" :x2="120 + (index * 40)" y2="100" stroke="#F59E0B" stroke-width="2" />
                </g>
                <text v-if="ledsPerString > 6" x="250" y="105" fill="#6B7280" font-size="10">... ({{ ledsPerString }} total)</text>
                
                <!-- Resistor -->
                <rect x="300" y="95" width="30" height="10" fill="#8B5CF6" opacity="0.6" />
                <text x="315" y="85" text-anchor="middle" fill="#8B5CF6" font-size="9">{{ formatResistance(seriesResistor) }}</text>
                <line x1="270" y1="100" x2="300" y2="100" stroke="#F59E0B" stroke-width="2" />
                <line x1="330" y1="100" x2="360" y2="100" stroke="#F59E0B" stroke-width="2" />
                
                <!-- Return path -->
                <line x1="50" y1="115" x2="50" y2="180" stroke="#F59E0B" stroke-width="2" />
                <line x1="360" y1="100" x2="380" y2="100" stroke="#F59E0B" stroke-width="2" />
                <line x1="380" y1="100" x2="380" y2="180" stroke="#F59E0B" stroke-width="2" />
                <line x1="380" y1="180" x2="50" y2="180" stroke="#F59E0B" stroke-width="2" />
              </g>
              
              <g v-else-if="configuration === 'parallel'">
                <line x1="65" y1="100" x2="100" y2="100" stroke="#F59E0B" stroke-width="2" />
                <line x1="100" y1="100" x2="100" y2="50" stroke="#F59E0B" stroke-width="2" />
                <line x1="100" y1="100" x2="100" y2="150" stroke="#F59E0B" stroke-width="2" />
                
                <!-- Branch 1 -->
                <g v-for="i in Math.min(ledsPerString, 3)" :key="i">
                  <line x1="100" y1="{{50 + (i-1) * 50}}" x2="140" y2="{{50 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="2" />
                  <polygon :points="`140,${40 + (i-1) * 50} 150,${50 + (i-1) * 50} 140,${60 + (i-1) * 50}`" fill="#EAB308" opacity="0.6" />
                  <line x1="140" y1="{{40 + (i-1) * 50}}" x2="140" y2="{{60 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="2" />
                  <line x1="150" y1="{{40 + (i-1) * 50}}" x2="150" y2="{{60 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="2" />
                  <line x1="138" y1="{{36 + (i-1) * 50}}" x2="146" y2="{{28 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="1.5" />
                  <line x1="146" y1="{{28 + (i-1) * 50}}" x2="148" y2="{{26 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="1.5" />
                  <line x1="150" y1="{{50 + (i-1) * 50}}" x2="180" y2="{{50 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="2" />
                  
                  <!-- Resistor for each branch -->
                  <rect x="180" y="{{45 + (i-1) * 50}}" width="25" height="10" fill="#8B5CF6" opacity="0.6" />
                  <line x1="205" y1="{{50 + (i-1) * 50}}" x2="230" y2="{{50 + (i-1) * 50}}" stroke="#F59E0B" stroke-width="2" />
                </g>
                
                <!-- Return -->
                <line x1="230" y1="50" x2="230" y2="150" stroke="#F59E0B" stroke-width="2" />
                <line x1="100" y1="150" x2="230" y2="150" stroke="#F59E0B" stroke-width="2" />
                <line x1="50" y1="115" x2="50" y2="150" stroke="#F59E0B" stroke-width="2" />
                <line x1="50" y1="150" x2="100" y2="150" stroke="#F59E0B" stroke-width="2" />
              </g>
              
              <g v-else>
                <!-- Mixed configuration -->
                <text x="200" y="30" text-anchor="middle" fill="#6B7280" font-size="10">{{ numberOfStrings }} strings × {{ ledsPerString }} LEDs</text>
                <!-- Simplified representation -->
                <rect x="100" y="60" width="200" height="80" fill="#FEF3C7" fill-opacity="0.3" stroke="#F59E0B" stroke-width="2" rx="5" />
                <text x="200" y="105" text-anchor="middle" fill="#F59E0B" font-size="12" font-weight="bold">{{ numberOfStrings }} Parallel Strings</text>
                <text x="200" y="125" text-anchor="middle" fill="#F59E0B" font-size="10">{{ ledsPerString }} LEDs per string</text>
                <line x1="65" y1="100" x2="100" y2="100" stroke="#F59E0B" stroke-width="2" />
                <line x1="300" y1="100" x2="360" y2="100" stroke="#F59E0B" stroke-width="2" />
                <!-- Resistor -->
                <rect x="330" y="95" width="25" height="10" fill="#8B5CF6" opacity="0.6" />
                <!-- Return -->
                <line x1="50" y1="115" x2="50" y2="180" stroke="#F59E0B" stroke-width="2" />
                <line x1="360" y1="100" x2="380" y2="100" stroke="#F59E0B" stroke-width="2" />
                <line x1="380" y1="100" x2="380" y2="180" stroke="#F59E0B" stroke-width="2" />
                <line x1="380" y1="180" x2="50" y2="180" stroke="#F59E0B" stroke-width="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- Results Display -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculation Results
          </h3>
          
          <!-- Warning message -->
          <div v-if="voltageWarning" class="mb-4 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-red-700 dark:text-red-400 font-semibold">Insufficient voltage!</p>
            </div>
            <p class="text-sm text-red-600 dark:text-red-400 mt-1">
              Source voltage is too low for the LED configuration. Increase voltage or reduce LEDs.
            </p>
          </div>
          
          <!-- Series Results -->
          <div v-if="configuration === 'series'" class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Total LED Voltage:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ seriesTotalVoltage.toFixed(1) }} V</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Current Limiting Resistor:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatResistance(seriesResistor) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resistor Power:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(seriesResistorPower) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Circuit Current:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatCurrent(seriesTotalCurrent) }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Total Power:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(seriesTotalPower) }}</span>
            </div>
          </div>
          
          <!-- Parallel Results -->
          <div v-else-if="configuration === 'parallel'" class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resistor Per LED:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatResistance(parallelResistor) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resistor Power (each):</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(parallelResistorPower) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Total Current:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatCurrent(parallelTotalCurrent) }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Total Power:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(parallelTotalPower) }}</span>
            </div>
          </div>
          
          <!-- Mixed Results -->
          <div v-else class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resistor Per String:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatResistance(mixedStringResistor) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Resistor Power (each):</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(mixedStringResistorPower) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Total Current:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatCurrent(mixedTotalCurrent) }}</span>
            </div>
            
            <div class="flex justify-between items-center border-b border-yellow-200 dark:border-yellow-700 pb-2">
              <span class="text-gray-700 dark:text-gray-300">Total Power:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ formatPower(mixedTotalPower) }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Total LEDs:</span>
              <span class="font-mono font-semibold text-yellow-600 dark:text-yellow-400">{{ totalLEDs }}</span>
            </div>
          </div>
        </div>

        <!-- Standard Resistor Value -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Standard Resistor Value (E12)
          </h3>
          <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-700">
            <div class="flex justify-between items-center">
              <span class="text-gray-700 dark:text-gray-300">Nearest Standard Value:</span>
              <span class="font-mono font-bold text-xl text-yellow-600 dark:text-yellow-400">
                {{ formatResistance(findStandardResistor(
                  configuration === 'series' ? seriesResistor :
                  configuration === 'parallel' ? parallelResistor : mixedStringResistor
                ).value) }}
              </span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-700 dark:text-gray-300">Recommended Power Rating:</span>
              <span class="font-mono font-semibold text-purple-600 dark:text-purple-400">
                {{ findStandardResistor(
                  configuration === 'series' ? seriesResistor :
                  configuration === 'parallel' ? parallelResistor : mixedStringResistor
                ).power }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Summary -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Summary
          </h3>
          <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700">
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-yellow-500 mr-2">💡</span>
                <span><strong>{{ totalLEDs }} LED(s)</strong> configured in {{ configuration }} mode</span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-500 mr-2">⚡</span>
                <span>Operating at <strong>{{ ledCurrent }} mA</strong> per LED</span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-500 mr-2">🔋</span>
                <span>Power consumption: <strong>{{ formatPower(
                  configuration === 'series' ? seriesTotalPower :
                  configuration === 'parallel' ? parallelTotalPower : mixedTotalPower
                ) }}</strong></span>
              </li>
              <li class="flex items-start">
                <span class="text-yellow-500 mr-2">✅</span>
                <span v-if="!voltageWarning" class="text-green-600 dark:text-green-400">Configuration is safe! ✓</span>
                <span v-else class="text-red-600 dark:text-red-400">Warning: Check voltage! ⚠️</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📚 Understanding LED Array Configurations
      </h3>
      
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Series Configuration</h4>
          <p class="text-sm mb-2">
            In series, LEDs share the same current. The forward voltages add up, so you need higher source voltage 
            for more LEDs. Only one current-limiting resistor is needed for the entire string.
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-3 text-sm font-mono">
            <span class="text-yellow-600 dark:text-yellow-400">R = (Vsource - N × Vled) / Iled</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ✓ Simple, efficient. ✗ One failed LED breaks the entire circuit.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Parallel Configuration</h4>
          <p class="text-sm mb-2">
            Each LED has its own resistor and operates independently. Currents add up, so the total current can be high. 
            Works well with low source voltages.
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-3 text-sm font-mono">
            <span class="text-yellow-600 dark:text-yellow-400">R = (Vsource - Vled) / Iled</span>
            <br>
            <span class="text-yellow-600 dark:text-yellow-400">Itotal = N × Iled</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ✓ Redundant, one failure doesn't affect others. ✗ Higher component count, more current.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Mixed (Series-Parallel) Configuration</h4>
          <p class="text-sm mb-2">
            Combine series strings in parallel for the best of both worlds. Each string needs its own resistor. 
            Ideal for LED arrays, matrices, and lighting panels.
          </p>
          <div class="bg-white dark:bg-gray-800 rounded p-3 text-sm font-mono">
            <span class="text-yellow-600 dark:text-yellow-400">Rstring = (Vsource - Nseries × Vled) / Iled</span>
            <br>
            <span class="text-yellow-600 dark:text-yellow-400">Itotal = Nstrings × Iled</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ✓ Scalable, efficient, good for large arrays. ✗ More complex wiring.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Design Tips</h4>
          <ul class="list-disc pl-5 text-sm space-y-1">
            <li>Always use a current-limiting resistor to prevent LED burnout</li>
            <li>Choose resistor power rating at least 2× the calculated power dissipation</li>
            <li>Standard resistor values (E12 series) may not give exact current - stay within ±10%</li>
            <li>LED forward voltage varies with color and temperature - design for worst case</li>
            <li>For high-power LEDs, consider constant current drivers instead of resistors</li>
            <li>Heat dissipation is critical - LEDs get less efficient at high temperatures</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Common Applications</h4>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <p class="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">Indicator Lights</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Single series LED, 5-20mA</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <p class="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">LED Strips</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Series groups in parallel, 12V/24V</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <p class="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">Displays</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Matrix arrays, multiplexed</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded p-3">
              <p class="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">Lighting</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">High-power arrays, constant current</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

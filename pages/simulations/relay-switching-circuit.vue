<script setup lang="ts">
import { ref, computed } from 'vue'

const coilVoltage = ref(12)
const supplyVoltage = ref(12)
const contactType = ref('spdt')
const contactRatingCurrent = ref(10)
const contactRatingVoltage = ref(250)
const loadResistance = ref(120)
const coilResistance = ref(400)
const showFlybackDiode = ref(true)
const contactBounce = ref(true)
const bounceDuration = ref(5)
const relayState = ref(false)

const contactTypes = [
  { value: 'spdt', name: 'SPDT', poles: 1, throws: 2, description: 'Single Pole Double Throw - One common, one normally open, one normally closed' },
  { value: 'dpdt', name: 'DPDT', poles: 2, throws: 2, description: 'Double Pole Double Throw - Two independent SPDT switches' },
  { value: 'no', name: 'NO Only', poles: 1, throws: 1, description: 'Normally Open - Contact closes when energized' },
  { value: 'nc', name: 'NC Only', poles: 1, throws: 1, description: 'Normally Closed - Contact opens when energized' }
]

const coilCurrent = computed(() => {
  return (supplyVoltage.value / coilResistance.value * 1000).toFixed(2)
})

const coilPower = computed(() => {
  return ((supplyVoltage.value * supplyVoltage.value) / coilResistance.value * 1000).toFixed(2)
})

const loadCurrent = computed(() => {
  if (!relayState.value) return '0.00'
  return ((supplyVoltage.value / loadResistance.value) * 1000).toFixed(2)
})

const loadPower = computed(() => {
  if (!relayState.value) return '0.00'
  return ((supplyVoltage.value * supplyVoltage.value) / loadResistance.value * 1000).toFixed(2)
})

const contactStress = computed(() => {
  const current = parseFloat(loadCurrent.value)
  const percentage = (current / contactRatingCurrent.value) * 100
  return percentage.toFixed(1)
})

const contactStatus = computed(() => {
  const stress = parseFloat(contactStress.value)
  if (stress > 90) return { text: 'OVERLOADED', color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300' }
  if (stress > 75) return { text: 'HIGH STRESS', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300' }
  if (stress > 50) return { text: 'MODERATE', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300' }
  return { text: 'NORMAL', color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300' }
})

const kickbackVoltage = computed(() => {
  // Simplified calculation: V = L × di/dt
  // Assuming coil inductance proportional to resistance
  const coilInductance = coilResistance.value * 0.1 // Henry
  const di_dt = (supplyVoltage.value / coilResistance.value) / (bounceDuration.value / 1000)
  const kickback = coilInductance * di_dt
  
  if (showFlybackDiode.value) {
    // With flyback diode, clamped to ~0.7V above supply
    return supplyVoltage.value + 0.7
  }
  return (kickback + supplyVoltage.value).toFixed(1)
})

const kickbackDanger = computed(() => {
  const voltage = parseFloat(kickbackVoltage.value)
  if (voltage > 100) return { text: 'DANGEROUS', color: 'text-red-600' }
  if (voltage > 50) return { text: 'WARNING', color: 'text-orange-600' }
  return { text: 'SAFE', color: 'text-green-600' }
})

const toggleRelay = () => {
  relayState.value = !relayState.value
}

const presetConfigs = [
  {
    name: 'Automotive Relay',
    config: {
      coilVoltage: 12,
      supplyVoltage: 12,
      coilResistance: 400,
      contactRatingCurrent: 30,
      contactRatingVoltage: 250,
      loadResistance: 40,
      contactType: 'spdt'
    }
  },
  {
    name: 'Industrial Relay',
    config: {
      coilVoltage: 24,
      supplyVoltage: 24,
      coilResistance: 1200,
      contactRatingCurrent: 10,
      contactRatingVoltage: 250,
      loadResistance: 240,
      contactType: 'dpdt'
    }
  },
  {
    name: 'Signal Relay',
    config: {
      coilVoltage: 5,
      supplyVoltage: 5,
      coilResistance: 125,
      contactRatingCurrent: 1,
      contactRatingVoltage: 30,
      loadResistance: 500,
      contactType: 'spdt'
    }
  },
  {
    name: 'Power Relay',
    config: {
      coilVoltage: 24,
      supplyVoltage: 24,
      coilResistance: 600,
      contactRatingCurrent: 20,
      contactRatingVoltage: 250,
      loadResistance: 12,
      contactType: 'dpdt'
    }
  }
]

const applyPreset = (preset: typeof presetConfigs[0]) => {
  coilVoltage.value = preset.config.coilVoltage
  supplyVoltage.value = preset.config.supplyVoltage
  coilResistance.value = preset.config.coilResistance
  contactRatingCurrent.value = preset.config.contactRatingCurrent
  contactRatingVoltage.value = preset.config.contactRatingVoltage
  loadResistance.value = preset.config.loadResistance
  contactType.value = preset.config.contactType
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Relay Switching Circuit Simulator
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Learn electromagnetic relay switching, contact bounce, and flyback protection
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Relay Configuration -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              Relay Configuration
            </h2>

            <!-- Contact Type -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contact Type
              </label>
              <select v-model="contactType" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option v-for="type in contactTypes" :key="type.value" :value="type.value">
                  {{ type.name }} - {{ type.description }}
                </option>
              </select>
            </div>

            <!-- Coil Voltage -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Coil Voltage Rating: {{ coilVoltage }}V
              </label>
              <input type="range" v-model.number="coilVoltage" min="5" max="24" step="1" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>5V</span>
                <span>24V</span>
              </div>
            </div>

            <!-- Supply Voltage -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supply Voltage: {{ supplyVoltage }}V
              </label>
              <input type="range" v-model.number="supplyVoltage" min="5" max="24" step="1" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>5V</span>
                <span>24V</span>
              </div>
            </div>

            <!-- Coil Resistance -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Coil Resistance: {{ coilResistance }}Ω
              </label>
              <input type="range" v-model.number="coilResistance" min="50" max="2000" step="50" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>50Ω</span>
                <span>2kΩ</span>
              </div>
            </div>
          </div>

          <!-- Load Configuration -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Load Configuration
            </h2>

            <!-- Load Resistance -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Load Resistance: {{ loadResistance }}Ω
              </label>
              <input type="range" v-model.number="loadResistance" min="10" max="1000" step="10" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>10Ω</span>
                <span>1kΩ</span>
              </div>
            </div>

            <!-- Contact Ratings -->
            <div class="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Current
                </label>
                <input type="number" v-model.number="contactRatingCurrent" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Amps</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Voltage
                </label>
                <input type="number" v-model.number="contactRatingVoltage" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Volts</p>
              </div>
            </div>
          </div>

          <!-- Protection Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              Protection Settings
            </h2>

            <!-- Flyback Diode -->
            <div class="mb-4">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" v-model="showFlybackDiode" class="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Flyback Diode</span>
              </label>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">Protects circuit from inductive kickback</p>
            </div>

            <!-- Contact Bounce -->
            <label class="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" v-model="contactBounce" class="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Simulate Contact Bounce</span>
            </label>
            
            <div v-if="contactBounce" class="mt-3">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bounce Duration: {{ bounceDuration }}ms
              </label>
              <input type="range" v-model.number="bounceDuration" min="1" max="20" step="1" class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
            </div>
          </div>

          <!-- Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Quick Presets
            </h2>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="preset in presetConfigs" :key="preset.name" @click="applyPreset(preset)" class="px-3 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors text-sm font-medium">
                {{ preset.name }}
              </button>
            </div>
          </div>

        </div>

        <!-- Visualization Panel -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              Interactive Circuit Diagram
            </h2>

            <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-700">
              
              <!-- SVG Circuit Diagram -->
              <svg viewBox="0 0 500 350" class="w-full h-auto">
                
                <!-- Supply Voltage Source -->
                <g transform="translate(50, 175)">
                  <circle cx="0" cy="0" r="30" fill="none" :stroke="relayState ? '#10B981' : '#6B7280'" stroke-width="2"/>
                  <text x="0" y="5" text-anchor="middle" class="text-sm font-semibold" :fill="relayState ? '#10B981' : '#6B7280'">{{ supplyVoltage }}V</text>
                  <text x="0" y="50" text-anchor="middle" class="text-xs" fill="#6B7280">Supply</text>
                </g>

                <!-- Control Circuit (Coil) -->
                <g>
                  <!-- Wire from supply to switch -->
                  <line x1="80" y1="175" x2="120" y2="175" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                  
                  <!-- Control Switch -->
                  <g transform="translate(140, 175)">
                    <line x1="-20" y1="0" x2="-15" y2="0" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                    <circle cx="0" cy="0" r="4" fill="none" :stroke="relayState ? '#10B981' : '#6B7280'" stroke-width="2"/>
                    <line x1="4" y1="-8" x2="20" y2="0" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2" :transform="relayState ? 'rotate(30)' : 'rotate(-30)'"/>
                    <circle cx="25" cy="0" r="4" fill="none" :stroke="relayState ? '#10B981' : '#6B7280'" stroke-width="2"/>
                    <line x1="29" y1="0" x2="50" y2="0" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                    <text x="0" y="-20" text-anchor="middle" class="text-xs" fill="#6B7280">SW1</text>
                  </g>

                  <!-- Wire to coil -->
                  <line x1="190" y1="175" x2="230" y2="175" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>

                  <!-- Relay Coil -->
                  <g transform="translate(250, 175)">
                    <rect x="-30" y="-15" width="60" height="30" fill="none" :stroke="relayState ? '#10B981' : '#6B7280'" stroke-width="2" rx="3"/>
                    <!-- Coil windings -->
                    <line x1="-20" y1="-8" x2="-20" y2="8" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="1"/>
                    <line x1="-10" y1="-8" x2="-10" y2="8" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="1"/>
                    <line x1="0" y1="-8" x2="0" y2="8" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="1"/>
                    <line x1="10" y1="-8" x2="10" y2="8" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="1"/>
                    <line x1="20" y1="-8" x2="20" y2="8" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="1"/>
                    <text x="0" y="35" text-anchor="middle" class="text-xs" fill="#6B7280">Coil</text>
                    <text x="0" y="48" text-anchor="middle" class="text-xs" :fill="relayState ? '#10B981' : '#6B7280'">{{ coilResistance }}Ω</text>
                    
                    <!-- Magnetic field indicator when energized -->
                    <g v-if="relayState">
                      <circle cx="0" cy="0" r="45" fill="none" stroke="#10B981" stroke-width="1" stroke-dasharray="5,5" opacity="0.5">
                        <animate attributeName="r" from="35" to="50" dur="1s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="0.8" to="0.2" dur="1s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  </g>

                  <!-- Flyback Diode -->
                  <g v-if="showFlybackDiode" transform="translate(250, 230)">
                    <line x1="-30" y1="0" x2="30" y2="0" stroke="#6B7280" stroke-width="1"/>
                    <line x1="0" y1="0" x2="0" y2="-25" stroke="#6B7280" stroke-width="1"/>
                    <line x1="0" y1="-25" x2="30" y2="0" stroke="#10B981" stroke-width="2"/>
                    <line x1="30" y1="-25" x2="0" y2="0" stroke="#10B981" stroke-width="2"/>
                    <line x1="30" y1="-25" x2="30" y2="-32" stroke="#10B981" stroke-width="2"/>
                    <line x1="34" y1="-28" x2="26" y2="-32" stroke="#10B981" stroke-width="2"/>
                    <text x="40" y="-15" class="text-xs" fill="#10B981">D1</text>
                    <text x="0" y="15" text-anchor="middle" class="text-xs" fill="#6B7280">Flyback</text>
                  </g>

                  <!-- Return path -->
                  <line x1="280" y1="175" x2="350" y2="175" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                  <line x1="350" y1="175" x2="350" y2="280" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                  <line x1="350" y1="280" x2="50" y2="280" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                  <line x1="50" y1="280" x2="50" y2="205" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                </g>

                <!-- Power Circuit (Contacts) -->
                <g transform="translate(150, 80)">
                  <!-- Power input -->
                  <line x1="-50" y1="0" x2="0" y2="0" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                  
                  <!-- COM terminal -->
                  <circle cx="0" cy="0" r="5" fill="#6B7280"/>
                  <text x="0" y="-15" text-anchor="middle" class="text-xs font-bold" fill="#6B7280">COM</text>

                  <!-- Contact arm -->
                  <g v-if="relayState">
                    <!-- Connected to NO -->
                    <line x1="5" y1="0" x2="45" y2="-30" stroke="#10B981" stroke-width="3"/>
                    <circle cx="50" cy="-30" r="5" fill="#10B981"/>
                    <text x="50" y="-45" text-anchor="middle" class="text-xs font-bold" fill="#10B981">NO</text>
                    
                    <!-- To load -->
                    <line x1="55" y1="-30" x2="120" y2="-30" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                    
                    <!-- Load symbol -->
                    <g transform="translate(150, -30)">
                      <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="#6B7280" stroke-width="2"/>
                      <text x="0" y="5" text-anchor="middle" class="text-xs" fill="#6B7280">Load</text>
                      <text x="0" y="40" text-anchor="middle" class="text-xs" :fill="relayState ? '#F59E0B' : '#6B7280'">{{ loadResistance }}Ω</text>
                    </g>
                    
                    <!-- Current flow indicator -->
                    <circle cx="90" cy="-30" r="8" fill="none" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="2">
                      <animate v-if="relayState" attributeName="r" from="6" to="10" dur="0.5s" repeatCount="indefinite"/>
                      <animate v-if="relayState" attributeName="opacity" from="1" to="0.3" dur="0.5s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                  
                  <g v-else>
                    <!-- Connected to NC -->
                    <line x1="5" y1="0" x2="45" y2="30" stroke="#EF4444" stroke-width="3"/>
                    <circle cx="50" cy="30" r="5" fill="#EF4444"/>
                    <text x="50" y="45" text-anchor="middle" class="text-xs font-bold" fill="#EF4444">NC</text>
                  </g>

                  <!-- NO terminal (open when relay off) -->
                  <circle cx="50" cy="-30" r="5" fill="none" :stroke="relayState ? '#10B981' : '#9CA3AF'" stroke-width="2"/>
                  <text x="50" y="-45" text-anchor="middle" class="text-xs font-bold" :fill="relayState ? '#10B981' : '#9CA3AF'">NO</text>

                  <!-- NC terminal (open when relay on) -->
                  <circle cx="50" cy="30" r="5" fill="none" :stroke="relayState ? '#9CA3AF' : '#EF4444'" stroke-width="2"/>
                  <text x="50" y="45" text-anchor="middle" class="text-xs font-bold" :fill="relayState ? '#9CA3AF' : '#EF4444'">NC</text>

                  <!-- Return path -->
                  <line x1="165" y1="-30" x2="250" y2="-30" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                  <line x1="250" y1="-30" x2="250" y2="60" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                  <line x1="250" y1="60" x2="-50" y2="60" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                  <line x1="-50" y1="60" x2="-50" y2="0" :stroke="relayState ? '#F59E0B' : '#9CA3AF'" stroke-width="3"/>
                </g>

                <!-- Contact Bounce Animation -->
                <g v-if="contactBounce && relayState">
                  <text x="380" y="30" class="text-xs" fill="#F59E0B">Contact Bounce!</text>
                  <g transform="translate(400, 50)">
                    <line x1="0" y1="0" x2="0" y2="40" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,3">
                      <animate attributeName="y1" values="0;10;0;5;0" dur="{{bounceDuration/1000}}s" repeatCount="indefinite"/>
                    </line>
                  </g>
                </g>

                <!-- Legend -->
                <g transform="translate(350, 280)">
                  <rect x="0" y="0" width="12" height="12" fill="#10B981"/>
                  <text x="18" y="10" class="text-xs" fill="#6B7280">Energized</text>
                  
                  <rect x="0" y="20" width="12" height="12" fill="#F59E0B"/>
                  <text x="18" y="30" class="text-xs" fill="#6B7280">Load Current</text>
                </g>
              </svg>

              <!-- Control Button -->
              <div class="mt-6 flex justify-center">
                <button @click="toggleRelay" 
                  class="px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                  :class="relayState 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'">
                  {{ relayState ? 'DEACTIVATE RELAY' : 'ACTIVATE RELAY' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Real-time Calculations -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              Real-time Calculations
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Coil Current -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-blue-600 dark:text-blue-300 font-medium">Coil Current</p>
                    <p class="text-2xl font-bold text-blue-900 dark:text-blue-100">{{ coilCurrent }} mA</p>
                  </div>
                  <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p class="text-xs text-blue-700 dark:text-blue-400 mt-2">I = V / R = {{ supplyVoltage }}V / {{ coilResistance }}Ω</p>
              </div>

              <!-- Coil Power -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-purple-600 dark:text-purple-300 font-medium">Coil Power</p>
                    <p class="text-2xl font-bold text-purple-900 dark:text-purple-100">{{ coilPower }} mW</p>
                  </div>
                  <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <p class="text-xs text-purple-700 dark:text-purple-400 mt-2">P = V² / R = {{ supplyVoltage }}² / {{ coilResistance }}</p>
              </div>

              <!-- Load Current -->
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-amber-600 dark:text-amber-300 font-medium">Load Current</p>
                    <p class="text-2xl font-bold text-amber-900 dark:text-amber-100">{{ loadCurrent }} mA</p>
                  </div>
                  <svg class="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <p class="text-xs text-amber-700 dark:text-amber-400 mt-2">I = V / R = {{ supplyVoltage }}V / {{ loadResistance }}Ω</p>
              </div>

              <!-- Load Power -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-green-600 dark:text-green-300 font-medium">Load Power</p>
                    <p class="text-2xl font-bold text-green-900 dark:text-green-100">{{ loadPower }} mW</p>
                  </div>
                  <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <p class="text-xs text-green-700 dark:text-green-400 mt-2">P = V² / R = {{ supplyVoltage }}² / {{ loadResistance }}</p>
              </div>

            </div>

            <!-- Contact Status -->
            <div class="mt-4 p-4 rounded-lg" :class="contactStatus.color">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium">Contact Stress Level</p>
                  <p class="text-xs mt-1">{{ contactStress }}% of rated capacity ({{ contactRatingCurrent }}A)</p>
                </div>
                <p class="text-lg font-bold">{{ contactStatus.text }}</p>
              </div>
            </div>
          </div>

          <!-- Inductive Kickback Analysis -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              Inductive Kickback Analysis
            </h2>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Peak Kickback Voltage</p>
                  <p class="text-3xl font-bold" :class="kickbackDanger.color">{{ kickbackVoltage }}V</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium px-3 py-1 rounded-full" :class="kickbackDanger.color">
                    {{ kickbackDanger.text }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {{ showFlybackDiode ? 'With Diode Protection' : 'Without Protection' }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center text-sm">
                  <svg class="w-5 h-5 mr-2" :class="showFlybackDiode ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">
                    <strong>Coil Inductance:</strong> ~{{ (coilResistance * 0.1).toFixed(0) }}H (estimated)
                  </span>
                </div>
                <div class="flex items-center text-sm">
                  <svg class="w-5 h-5 mr-2" :class="showFlybackDiode ? 'text-green-500' : 'text-orange-500'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">
                    <strong>di/dt:</strong> ~{{ ((supplyVoltage / coilResistance) / (bounceDuration / 1000)).toFixed(0) }} A/s
                  </span>
                </div>
                <div class="flex items-center text-sm">
                  <svg class="w-5 h-5 mr-2" :class="showFlybackDiode ? 'text-green-500' : 'text-red-500'" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">
                    <strong>Protection:</strong> {{ showFlybackDiode ? 'Flyback diode clamps voltage to ~0.7V above supply' : 'No protection - voltage can exceed 100V!' }}
                  </span>
                </div>
              </div>

              <!-- Warning -->
              <div v-if="!showFlybackDiode" class="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <p class="text-sm text-red-800 dark:text-red-200">
                    <strong>Warning:</strong> Without a flyback diode, inductive kickback can damage switching components and cause voltage spikes!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Learn About Relay Switching
            </h2>

            <div class="space-y-6 text-gray-700 dark:text-gray-300">
              
              <!-- What is a Relay -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is a Relay?</h3>
                <p class="text-sm leading-relaxed">
                  A relay is an electrically operated switch that uses an electromagnet to mechanically operate switching contacts. 
                  It allows a low-power control circuit to switch a high-power load circuit, providing electrical isolation between the two circuits.
                </p>
              </div>

              <!-- How Relays Work -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">How Relays Work</h3>
                <ul class="text-sm space-y-2">
                  <li class="flex items-start">
                    <span class="text-primary mr-2">1.</span>
                    <span>When current flows through the coil, it creates a magnetic field</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">2.</span>
                    <span>The magnetic field attracts an armature, mechanically moving the contacts</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">3.</span>
                    <span>NO (Normally Open) contacts close when the relay is energized</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">4.</span>
                    <span>NC (Normally Closed) contacts open when the relay is energized</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">5.</span>
                    <span>When power is removed, a spring returns the contacts to their default state</span>
                  </li>
                </ul>
              </div>

              <!-- Contact Bounce -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Bounce</h3>
                <p class="text-sm leading-relaxed">
                  When relay contacts close, they don't make perfect contact immediately. Instead, they bounce off each other 
                  for a few milliseconds, creating multiple make/break cycles. This can cause false triggers in digital circuits. 
                  Solutions include:
                </p>
                <ul class="text-sm space-y-1 mt-2 ml-4">
                  <li>• Software debouncing (ignore transitions for ~10ms)</li>
                  <li>• RC filter circuits (low-pass filter on the signal)</li>
                  <li>• SR latch circuits (hardware debouncing)</li>
                  <li>• Solid-state relays (no moving parts)</li>
                </ul>
              </div>

              <!-- Inductive Kickback -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Inductive Kickback & Flyback Protection</h3>
                <p class="text-sm leading-relaxed">
                  When current flowing through the relay coil is suddenly interrupted, the collapsing magnetic field induces 
                  a large voltage spike (kickback) according to the formula:
                </p>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 my-2 text-center">
                  <code class="text-lg font-mono">V = L × (di/dt)</code>
                </div>
                <p class="text-sm leading-relaxed">
                  Where L is coil inductance and di/dt is the rate of current change. This voltage can reach hundreds of volts, 
                  enough to damage switching transistors or ICs.
                </p>
                <div class="mt-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p class="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">🛡️ Flyback Diode Protection</p>
                  <p class="text-xs text-green-700 dark:text-green-300">
                    A diode placed in reverse bias across the coil provides a safe path for the induced current to circulate, 
                    clamping the voltage to ~0.7V above the supply. This protects switching components from damage.
                  </p>
                </div>
              </div>

              <!-- Applications -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Common Applications</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Automotive</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Horns, lights, motors, fans</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Industrial Control</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Motor starters, solenoids, heaters</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Home Automation</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Lighting, appliances, HVAC</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p class="font-medium text-sm text-gray-900 dark:text-white">Telecommunications</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Signal switching, routing</p>
                  </div>
                </div>
              </div>

              <!-- Key Formulas -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Formulas</h3>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <p class="text-sm"><strong>Coil Current:</strong> I = V_supply / R_coil</p>
                  <p class="text-sm"><strong>Coil Power:</strong> P = V_supply² / R_coil</p>
                  <p class="text-sm"><strong>Load Current:</strong> I_load = V_supply / R_load</p>
                  <p class="text-sm"><strong>Kickback Voltage:</strong> V_kickback = L × (di/dt)</p>
                  <p class="text-sm"><strong>Contact Stress:</strong> % = (I_load / I_rated) × 100%</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>

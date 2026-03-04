<script setup lang="ts">
import { ref, computed } from 'vue'

const batteryChemistry = ref<'li-ion' | 'lipo' | 'lead-acid' | 'nimh'>('li-ion')
const ratedCapacity = ref(2500)
const currentVoltage = ref(3.7)
const loadCurrent = ref(0.5)
const batteryTemp = ref(25)
const initialSoC = ref(100)

// Chemistry-specific parameters
const chemistryParams = computed(() => {
  switch (batteryChemistry.value) {
    case 'li-ion':
      return {
        name: 'Li-Ion',
        minVoltage: 2.5,
        maxVoltage: 4.2,
        nominalVoltage: 3.7,
        curve: [
          { v: 4.2, soc: 100 }, { v: 4.1, soc: 90 }, { v: 4.0, soc: 80 },
          { v: 3.9, soc: 70 }, { v: 3.8, soc: 60 }, { v: 3.7, soc: 50 },
          { v: 3.6, soc: 40 }, { v: 3.5, soc: 25 }, { v: 3.4, soc: 15 },
          { v: 3.3, soc: 8 }, { v: 3.2, soc: 4 }, { v: 3.1, soc: 2 },
          { v: 3.0, soc: 1 }, { v: 2.5, soc: 0 }
        ]
      }
    case 'lipo':
      return {
        name: 'LiPo',
        minVoltage: 3.0,
        maxVoltage: 4.2,
        nominalVoltage: 3.7,
        curve: [
          { v: 4.2, soc: 100 }, { v: 4.15, soc: 95 }, { v: 4.1, soc: 90 },
          { v: 4.0, soc: 80 }, { v: 3.9, soc: 70 }, { v: 3.85, soc: 60 },
          { v: 3.8, soc: 50 }, { v: 3.75, soc: 40 }, { v: 3.7, soc: 30 },
          { v: 3.65, soc: 20 }, { v: 3.6, soc: 15 }, { v: 3.5, soc: 10 },
          { v: 3.4, soc: 5 }, { v: 3.3, soc: 2 }, { v: 3.0, soc: 0 }
        ]
      }
    case 'lead-acid':
      return {
        name: 'Lead-Acid',
        minVoltage: 10.5,
        maxVoltage: 12.8,
        nominalVoltage: 12.0,
        curve: [
          { v: 12.8, soc: 100 }, { v: 12.6, soc: 90 }, { v: 12.5, soc: 80 },
          { v: 12.42, soc: 70 }, { v: 12.32, soc: 60 }, { v: 12.2, soc: 50 },
          { v: 12.06, soc: 40 }, { v: 11.9, soc: 30 }, { v: 11.75, soc: 20 },
          { v: 11.58, soc: 10 }, { v: 11.31, soc: 5 }, { v: 10.5, soc: 0 }
        ]
      }
    case 'nimh':
      return {
        name: 'NiMH',
        minVoltage: 0.9,
        maxVoltage: 1.4,
        nominalVoltage: 1.2,
        curve: [
          { v: 1.4, soc: 100 }, { v: 1.35, soc: 90 }, { v: 1.3, soc: 80 },
          { v: 1.28, soc: 70 }, { v: 1.25, soc: 60 }, { v: 1.23, soc: 50 },
          { v: 1.2, soc: 40 }, { v: 1.18, soc: 30 }, { v: 1.15, soc: 20 },
          { v: 1.1, soc: 10 }, { v: 1.0, soc: 5 }, { v: 0.9, soc: 0 }
        ]
      }
  }
})

// Voltage-based SoC estimation
const voltageBasedSoC = computed(() => {
  const params = chemistryParams.value
  const curve = params.curve
  
  // Find the two points that bracket our current voltage
  for (let i = 0; i < curve.length - 1; i++) {
    if (currentVoltage.value >= curve[i + 1].v) {
      const v1 = curve[i].v
      const v2 = curve[i + 1].v
      const soc1 = curve[i].soc
      const soc2 = curve[i + 1].soc
      
      // Linear interpolation
      const soc = soc1 + (soc2 - soc1) * ((currentVoltage.value - v1) / (v2 - v1))
      return Math.max(0, Math.min(100, soc)).toFixed(1)
    }
  }
  
  return currentVoltage.value >= curve[0].v ? 100 : 0
})

// Temperature compensation factor
const tempFactor = computed(() => {
  // Optimal temperature is around 20-25°C
  // Capacity decreases at low temperatures
  if (batteryTemp.value >= 20 && batteryTemp.value <= 25) return 1.0
  if (batteryTemp.value < 0) return 0.5 // 50% capacity at freezing
  if (batteryTemp.value < 10) return 0.75
  if (batteryTemp.value > 40) return 0.9 // High temp reduces life
  
  // Linear interpolation between 10-20°C
  if (batteryTemp.value < 20) {
    return 0.75 + 0.25 * ((batteryTemp.value - 10) / 10)
  }
  // Linear interpolation between 25-40°C
  if (batteryTemp.value > 25) {
    return 1.0 - 0.1 * ((batteryTemp.value - 25) / 15)
  }
  return 1.0
})

// Coulomb counting (simplified - assumes initial SoC)
const coulombCountSoC = computed(() => {
  // In real implementation, this would integrate current over time
  // For this calculator, we'll use the initial SoC with temperature effect
  return (initialSoC.value * tempFactor.value).toFixed(1)
})

// Combined SoC estimate (weighted average)
const combinedSoC = computed(() => {
  const vWeight = 0.5
  const cWeight = 0.5
  const soc = (parseFloat(voltageBasedSoC.value) * vWeight + 
               parseFloat(coulombCountSoC.value) * cWeight)
  return soc.toFixed(1)
})

// Remaining capacity
const remainingCapacity = computed(() => {
  const cap = (ratedCapacity.value * parseFloat(combinedSoC.value) / 100) * tempFactor.value
  return cap.toFixed(0)
})

// Remaining energy
const remainingEnergy = computed(() => {
  const energy = (parseFloat(remainingCapacity.value) / 1000) * chemistryParams.value.nominalVoltage
  return energy.toFixed(2)
})

// Remaining time estimation
const remainingTime = computed(() => {
  if (loadCurrent.value <= 0) return '∞'
  const capacityMah = parseFloat(remainingCapacity.value)
  const currentMa = loadCurrent.value * 1000
  const hours = capacityMah / currentMa
  return hours.toFixed(1)
})

// Battery health indicator
const batteryHealth = computed(() => {
  const soc = parseFloat(combinedSoC.value)
  const v = currentVoltage.value
  const params = chemistryParams.value
  
  // Check for dangerous conditions
  if (v < params.minVoltage || soc < 10) return { status: 'critical', color: 'red', text: 'Critical - Charge Now!' }
  if (v < params.minVoltage * 1.1 || soc < 20) return { status: 'warning', color: 'orange', text: 'Low Battery' }
  if (soc < 40) return { status: 'caution', color: 'yellow', text: 'Moderate' }
  return { status: 'good', color: 'green', text: 'Good' }
})

// Voltage curve for chart
const voltageCurve = computed(() => {
  return chemistryParams.value.curve.map(p => ({
    x: p.soc,
    y: p.v
  }))
})

// Current voltage point
const currentPoint = computed(() => ({
  x: parseFloat(combinedSoC.value),
  y: currentVoltage.value
}))

const applyPreset = (preset: any) => {
  batteryChemistry.value = preset.chemistry
  ratedCapacity.value = preset.capacity
  currentVoltage.value = preset.voltage
  loadCurrent.value = preset.current
  batteryTemp.value = preset.temp
  initialSoC.value = preset.initialSoc
}

const presets = [
  { 
    name: '18650 Li-ion Cell', 
    chemistry: 'li-ion' as const, 
    capacity: 2500, 
    voltage: 3.8, 
    current: 0.5, 
    temp: 25,
    initialSoc: 100
  },
  { 
    name: 'LiPo 3S Drone', 
    chemistry: 'lipo' as const, 
    capacity: 2200, 
    voltage: 11.4, 
    current: 15, 
    temp: 30,
    initialSoc: 90
  },
  { 
    name: 'Car Battery', 
    chemistry: 'lead-acid' as const, 
    capacity: 50000, 
    voltage: 12.6, 
    current: 5, 
    temp: 20,
    initialSoc: 100
  },
  { 
    name: 'AA NiMH', 
    chemistry: 'nimh' as const, 
    capacity: 2000, 
    voltage: 1.25, 
    current: 0.5, 
    temp: 20,
    initialSoc: 80
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🔋 Battery State of Charge Estimator</h1>
      <p class="text-gray-600">Estimate remaining battery capacity using voltage-based and coulomb counting methods</p>
    </div>

    <!-- Controls Section -->
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <!-- Battery Parameters -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">⚙️ Battery Parameters</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Battery Chemistry</label>
            <select 
              v-model="batteryChemistry"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="li-ion">Li-Ion</option>
              <option value="lipo">LiPo</option>
              <option value="lead-acid">Lead-Acid</option>
              <option value="nimh">NiMH</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Rated Capacity: {{ ratedCapacity }}mAh
            </label>
            <input 
              type="range" 
              v-model.number="ratedCapacity" 
              min="100" max="100000" step="100"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Current Voltage: {{ currentVoltage }}V
            </label>
            <input 
              type="range" 
              v-model.number="currentVoltage" 
              min="0" max="60" step="0.01"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <p class="text-xs text-gray-500 mt-1">
              Range: {{ chemistryParams.minVoltage }}V - {{ chemistryParams.maxVoltage }}V
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Load Current: {{ loadCurrent }}A
            </label>
            <input 
              type="range" 
              v-model.number="loadCurrent" 
              min="0" max="50" step="0.1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Battery Temperature: {{ batteryTemp }}°C
            </label>
            <input 
              type="range" 
              v-model.number="batteryTemp" 
              min="-10" max="60" step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <p class="text-xs text-gray-500 mt-1">
              Temp Factor: {{ (tempFactor * 100).toFixed(0) }}%
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Initial SoC: {{ initialSoC }}%
            </label>
            <input 
              type="range" 
              v-model.number="initialSoC" 
              min="0" max="100" step="1"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            >
            <p class="text-xs text-gray-500 mt-1">For coulomb counting method</p>
          </div>
        </div>
      </div>

      <!-- Results Display -->
      <div class="space-y-6">
        <!-- Battery Visual -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">📊 Battery Status</h2>
          
          <div class="flex justify-center mb-6">
            <svg width="200" height="280" viewBox="0 0 200 280">
              <!-- Battery body -->
              <rect x="50" y="30" width="100" height="220" rx="10" fill="#f3f4f6" stroke="#374151" stroke-width="3"/>
              
              <!-- Battery terminal -->
              <rect x="85" y="10" width="30" height="20" fill="#374151"/>
              
              <!-- Battery fill -->
              <rect 
                x="53" 
                :y="33 + (220 - (220 * parseFloat(combinedSoC) / 100))" 
                width="94" 
                height="220 * parseFloat(combinedSoC) / 100"
                :fill="batteryHealth.color === 'red' ? '#ef4444' : 
                      batteryHealth.color === 'orange' ? '#f97316' : 
                      batteryHealth.color === 'yellow' ? '#eab308' : '#22c55e'"
                rx="8"
              >
                <animate 
                  attributeName="opacity"
                  values="1;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              
              <!-- Percentage text -->
              <text x="100" y="150" text-anchor="middle" class="fill-white text-2xl font-bold" 
                    :fill="parseFloat(combinedSoC) > 50 ? '#ffffff' : '#000000'">
                {{ combinedSoC }}%
              </text>
              
              <!-- Lightning icon if charging -->
              <text x="100" y="180" text-anchor="middle" class="fill-white text-4xl">⚡</text>
            </svg>
          </div>

          <div class="text-center">
            <div class="inline-flex items-center px-4 py-2 rounded-full"
                 :class="{
                   'bg-red-100 text-red-800': batteryHealth.status === 'critical',
                   'bg-orange-100 text-orange-800': batteryHealth.status === 'warning',
                   'bg-yellow-100 text-yellow-800': batteryHealth.status === 'caution',
                   'bg-green-100 text-green-800': batteryHealth.status === 'good'
                 }">
              <span class="text-2xl mr-2">
                {{ batteryHealth.status === 'critical' ? '🔴' : 
                   batteryHealth.status === 'warning' ? '🟠' : 
                   batteryHealth.status === 'caution' ? '🟡' : '🟢' }}
              </span>
              <span class="font-semibold">{{ batteryHealth.text }}</span>
            </div>
          </div>
        </div>

        <!-- SoC Estimates -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-blue-600 font-medium">Voltage-based</p>
            <p class="text-2xl font-bold text-blue-800">{{ voltageBasedSoC }}%</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4">
            <p class="text-sm text-purple-600 font-medium">Coulomb Count</p>
            <p class="text-2xl font-bold text-purple-800">{{ coulombCountSoC }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Metrics -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Combined SoC</h3>
        <p class="text-4xl font-bold">{{ combinedSoC }}%</p>
        <p class="text-sm mt-2 opacity-80">Weighted average</p>
      </div>
      
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Remaining Capacity</h3>
        <p class="text-4xl font-bold">{{ remainingCapacity }}mAh</p>
        <p class="text-sm mt-2 opacity-80">At current temp</p>
      </div>
      
      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Remaining Energy</h3>
        <p class="text-4xl font-bold">{{ remainingEnergy }}Wh</p>
        <p class="text-sm mt-2 opacity-80">{{ chemistryParams.nominalVoltage }}V nominal</p>
      </div>
      
      <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2">Runtime Remaining</h3>
        <p class="text-4xl font-bold">{{ remainingTime }}h</p>
        <p class="text-sm mt-2 opacity-80">At {{ loadCurrent }}A load</p>
      </div>
    </div>

    <!-- Voltage vs SoC Curve -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">📈 Voltage vs SoC Curve</h2>
      
      <div class="h-80 relative">
        <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines -->
          <g stroke="#e5e7eb" stroke-width="1">
            <!-- Horizontal grid lines -->
            <line x1="60" y1="20" x2="780" y2="20"/>
            <line x1="60" y1="80" x2="780" y2="80"/>
            <line x1="60" y1="140" x2="780" y2="140"/>
            <line x1="60" y1="200" x2="780" y2="200"/>
            <line x1="60" y1="260" x2="780" y2="260"/>
            
            <!-- Vertical grid lines -->
            <line x1="60" y1="20" x2="60" y2="260"/>
            <line x1="235" y1="20" x2="235" y2="260"/>
            <line x1="410" y1="20" x2="410" y2="260"/>
            <line x1="585" y1="20" x2="585" y2="260"/>
            <line x1="760" y1="20" x2="760" y2="260"/>
          </g>
          
          <!-- Axis labels -->
          <text x="400" y="295" text-anchor="middle" class="fill-gray-600 font-semibold">State of Charge (%)</text>
          <text x="20" y="140" text-anchor="middle" transform="rotate(-90, 20, 140)" class="fill-gray-600 font-semibold">Voltage (V)</text>
          
          <!-- Y-axis labels -->
          <text x="50" y="25" text-anchor="end" class="fill-gray-600 text-xs">{{ chemistryParams.maxVoltage.toFixed(1) }}</text>
          <text x="50" y="145" text-anchor="end" class="fill-gray-600 text-xs">{{ ((chemistryParams.maxVoltage + chemistryParams.minVoltage) / 2).toFixed(1) }}</text>
          <text x="50" y="265" text-anchor="end" class="fill-gray-600 text-xs">{{ chemistryParams.minVoltage.toFixed(1) }}</text>
          
          <!-- X-axis labels -->
          <text x="60" y="280" text-anchor="middle" class="fill-gray-600 text-xs">0</text>
          <text x="235" y="280" text-anchor="middle" class="fill-gray-600 text-xs">25</text>
          <text x="410" y="280" text-anchor="middle" class="fill-gray-600 text-xs">50</text>
          <text x="585" y="280" text-anchor="middle" class="fill-gray-600 text-xs">75</text>
          <text x="760" y="280" text-anchor="middle" class="fill-gray-600 text-xs">100</text>
          
          <!-- Voltage curve -->
          <polyline 
            :points="voltageCurve.map(p => {
              const x = 60 + (p.x / 100) * 700
              const y = 20 + ((chemistryParams.maxVoltage - p.y) / (chemistryParams.maxVoltage - chemistryParams.minVoltage)) * 240
              return `${x},${y}`
            }).join(' ')"
            fill="none"
            stroke="#3b82f6"
            stroke-width="3"
          />
          
          <!-- Current operating point -->
          <g>
            <circle 
              :cx="60 + (parseFloat(combinedSoC) / 100) * 700"
              :cy="20 + ((chemistryParams.maxVoltage - currentVoltage) / (chemistryParams.maxVoltage - chemistryParams.minVoltage)) * 240"
              r="10"
              fill="#ef4444"
            >
              <animate 
                attributeName="r"
                values="10;15;10"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <text 
              :x="60 + (parseFloat(combinedSoC) / 100) * 700 + 20"
              :y="20 + ((chemistryParams.maxVoltage - currentVoltage) / (chemistryParams.maxVoltage - chemistryParams.minVoltage)) * 240 - 10"
              class="fill-red-600 font-bold"
            >
              {{ currentVoltage }}V @ {{ combinedSoC }}%
            </text>
          </g>
          
          <!-- Color-coded zones -->
          <rect x="60" y="180" width="140" height="80" fill="#22c55e" opacity="0.1"/>
          <text x="130" y="225" text-anchor="middle" class="fill-green-600 font-bold">Good</text>
          
          <rect x="200" y="180" width="140" height="80" fill="#eab308" opacity="0.1"/>
          <text x="270" y="225" text-anchor="middle" class="fill-yellow-600 font-bold">Moderate</text>
          
          <rect x="340" y="180" width="140" height="80" fill="#f97316" opacity="0.1"/>
          <text x="410" y="225" text-anchor="middle" class="fill-orange-600 font-bold">Low</text>
          
          <rect x="480" y="180" width="280" height="80" fill="#ef4444" opacity="0.1"/>
          <text x="620" y="225" text-anchor="middle" class="fill-red-600 font-bold">Critical</text>
        </svg>
      </div>
    </div>

    <!-- Temperature Effect -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">🌡️ Temperature Compensation</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <p class="text-gray-700 mb-4">
            Battery capacity is affected by temperature. The temperature compensation factor 
            adjusts the effective capacity based on current conditions.
          </p>
          
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm text-blue-600 font-medium">Temperature Factor</p>
            <p class="text-3xl font-bold text-blue-800">{{ (tempFactor * 100).toFixed(0) }}%</p>
            <p class="text-sm text-blue-600 mt-2">
              Effective Capacity: {{ (ratedCapacity * tempFactor).toFixed(0) }}mAh
            </p>
          </div>
        </div>
        
        <div>
          <div class="relative h-48">
            <svg width="100%" height="100%" viewBox="0 0 400 180">
              <!-- Temperature zones -->
              <rect x="0" y="20" width="100" height="140" fill="#3b82f6" opacity="0.2"/>
              <text x="50" y="100" text-anchor="middle" class="fill-blue-600 font-semibold">Too Cold</text>
              <text x="50" y="120" text-anchor="middle" class="fill-blue-600 text-sm">&lt;10°C</text>
              
              <rect x="100" y="20" width="150" height="140" fill="#22c55e" opacity="0.2"/>
              <text x="175" y="100" text-anchor="middle" class="fill-green-600 font-semibold">Optimal</text>
              <text x="175" y="120" text-anchor="middle" class="fill-green-600 text-sm">10-25°C</text>
              
              <rect x="250" y="20" width="150" height="140" fill="#f97316" opacity="0.2"/>
              <text x="325" y="100" text-anchor="middle" class="fill-orange-600 font-semibold">Too Hot</text>
              <text x="325" y="120" text-anchor="middle" class="fill-orange-600 text-sm">&gt;40°C</text>
              
              <!-- Current temperature indicator -->
              <g>
                <polygon 
                  :points="`${batteryTemp * 6.5},140 ${batteryTemp * 6.5 - 10},160 ${batteryTemp * 6.5 + 10},160`"
                  fill="#ef4444"
                >
                  <animate 
                    attributeName="transform"
                    values="translateY(0);translateY(-5);translateY(0)"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </polygon>
                <text :x="batteryTemp * 6.5" y="175" text-anchor="middle" class="fill-gray-700 font-bold">
                  {{ batteryTemp }}°C
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">⚡ Quick Presets</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          v-for="preset in presets" 
          :key="preset.name"
          @click="applyPreset(preset)"
          class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 border border-green-200"
        >
          <p class="font-semibold text-gray-800">{{ preset.name }}</p>
          <p class="text-sm text-gray-600">{{ preset.capacity }}mAh @ {{ preset.voltage }}V</p>
        </button>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">📚 SoC Estimation Methods</h2>
      
      <div class="space-y-6">
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">🔋 Battery Chemistries</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="font-semibold text-gray-800">Li-Ion / LiPo</p>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                <li>High energy density (200-265 Wh/kg)</li>
                <li>Nominal voltage: 3.7V per cell</li>
                <li>Flat discharge curve</li>
                <li>No memory effect</li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-gray-800">Lead-Acid</p>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                <li>Low cost, reliable</li>
                <li>Nominal voltage: 12V (6 cells)</li>
                <li>Heavy (30-40 Wh/kg)</li>
                <li>Limited cycle life</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-green-800 mb-2">📊 SoC Estimation Methods</h3>
          <div class="space-y-4">
            <div>
              <p class="font-semibold text-gray-800">1. Voltage-Based SoC</p>
              <p class="text-gray-700 text-sm">
                Uses open circuit voltage (OCV) to estimate SoC by comparing against a known discharge curve.
                Each battery chemistry has a characteristic voltage vs SoC relationship.
                Simple but affected by load, temperature, and battery age.
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-800">2. Coulomb Counting</p>
              <p class="text-gray-700 text-sm">
                Integrates current over time to track charge flow: <code>SoC = (Initial capacity - ∫I dt) / Rated capacity</code>
                Accurate for short-term tracking but accumulates errors over time.
                Requires periodic recalibration (typically at full charge).
              </p>
            </div>
            <div>
              <p class="font-semibold text-gray-800">3. Combined Method</p>
              <p class="text-gray-700 text-sm">
                This calculator uses a weighted average of voltage-based and coulomb counting methods
                for improved accuracy. Real BMS systems use Kalman filters for even better estimates.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-yellow-800 mb-2">⚠️ Factors Affecting Accuracy</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Load Current:</strong> Voltage drops under load (IR drop), causing underestimation</li>
            <li><strong>Temperature:</strong> Cold temperatures reduce effective capacity</li>
            <li><strong>Battery Age:</strong> Internal resistance increases over time</li>
            <li><strong>Chemistry Variations:</strong> Different manufacturers have different curves</li>
            <li><strong>Hysteresis:</strong> Charge and discharge curves differ slightly</li>
          </ul>
        </div>

        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-purple-800 mb-2">🔄 Battery Management System (BMS)</h3>
          <p class="text-gray-700">
            Modern BMS systems use advanced algorithms like Kalman filters, neural networks, or 
            electrochemical models for accurate SoC estimation. They also provide:
          </p>
          <ul class="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Cell balancing (prevent overcharge of individual cells)</li>
            <li>Overcharge/over-discharge protection</li>
            <li>Temperature monitoring and protection</li>
            <li>State of Health (SoH) estimation</li>
            <li>Communication with host system</li>
          </ul>
        </div>

        <div class="bg-orange-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-orange-800 mb-2">💡 Best Practices for Battery Health</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Avoid deep discharge (keep above 20% when possible)</li>
            <li>Charge to 80% for daily use (100% only when needed)</li>
            <li>Store at 40-60% charge in cool, dry place</li>
            <li>Use manufacturer-approved chargers</li>
            <li>Avoid extreme temperatures (both hot and cold)</li>
            <li>Don't leave at 100% charge for extended periods</li>
          </ul>
        </div>

        <div class="bg-gray-100 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">📖 Glossary</h3>
          <dl class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="font-semibold">SoC (State of Charge)</dt>
              <dd class="text-gray-600">Current charge level as percentage of total capacity</dd>
            </div>
            <div>
              <dt class="font-semibold">SoH (State of Health)</dt>
              <dd class="text-gray-600">Battery's current capacity vs original capacity</dd>
            </div>
            <div>
              <dt class="font-semibold">DoD (Depth of Discharge)</dt>
              <dd class="text-gray-600">How much of the battery's capacity has been used</dd>
            </div>
            <div>
              <dt class="font-semibold">OCV (Open Circuit Voltage)</dt>
              <dd class="text-gray-600">Battery voltage when not under load</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

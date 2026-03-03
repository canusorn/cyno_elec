<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-white mb-2">Period ↔ Frequency Converter</h1>
      <p class="text-gray-400">Convert between period (T) and frequency (f) with real-time calculation</p>
    </div>

    <!-- Main Converter Card -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Period Input -->
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-white flex items-center">
            <span class="text-blue-400 mr-2">⟳</span> Period (T)
          </h2>
          
          <div class="flex items-center space-x-2">
            <input
              v-model.number="periodValue"
              type="number"
              step="any"
              min="0"
              placeholder="Enter period"
              class="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              @input="updateFrequency"
            />
            <select
              v-model="periodUnit"
              class="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              @change="updateFrequency"
            >
              <option value="ps">ps</option>
              <option value="ns">ns</option>
              <option value="μs">μs</option>
              <option value="ms">ms</option>
              <option value="s">s</option>
              <option value="min">min</option>
              <option value="hr">hr</option>
            </select>
          </div>

          <!-- Formula -->
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm mb-2">Formula:</p>
            <p class="text-white font-mono text-lg">T = 1 / f</p>
            <p class="text-gray-500 text-xs mt-2">Period = 1 / Frequency</p>
          </div>
        </div>

        <!-- Frequency Input -->
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold text-white flex items-center">
            <span class="text-green-400 mr-2">≋</span> Frequency (f)
          </h2>
          
          <div class="flex items-center space-x-2">
            <input
              v-model.number="frequencyValue"
              type="number"
              step="any"
              min="0"
              placeholder="Enter frequency"
              class="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              @input="updatePeriod"
            />
            <select
              v-model="frequencyUnit"
              class="bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              @change="updatePeriod"
            >
              <option value="Hz">Hz</option>
              <option value="kHz">kHz</option>
              <option value="MHz">MHz</option>
              <option value="GHz">GHz</option>
              <option value="THz">THz</option>
            </select>
          </div>

          <!-- Formula -->
          <div class="bg-gray-900 rounded-lg p-4">
            <p class="text-gray-400 text-sm mb-2">Formula:</p>
            <p class="text-white font-mono text-lg">f = 1 / T</p>
            <p class="text-gray-500 text-xs mt-2">Frequency = 1 / Period</p>
          </div>
        </div>
      </div>

      <!-- Conversion Arrow -->
      <div class="flex justify-center my-6">
        <div class="bg-gray-900 rounded-full p-4">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>

      <!-- Quick Convert Buttons -->
      <div class="space-y-3">
        <p class="text-gray-400 text-sm font-medium">Quick Convert:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-4 py-3 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div v-if="periodValue || frequencyValue" class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Conversion Results</h2>
      
      <!-- Period Results -->
      <div v-if="periodValue" class="mb-6">
        <h3 class="text-lg font-medium text-blue-400 mb-3">Period in All Units:</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div
            v-for="(value, unit) in periodConversions"
            :key="unit"
            class="bg-gray-900 rounded-lg p-3"
          >
            <p class="text-gray-400 text-xs mb-1">{{ unitLabels[unit] }}</p>
            <p class="text-white font-mono">{{ formatNumber(value) }}</p>
          </div>
        </div>
      </div>

      <!-- Frequency Results -->
      <div v-if="frequencyValue" class="mb-6">
        <h3 class="text-lg font-medium text-green-400 mb-3">Frequency in All Units:</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <div
            v-for="(value, unit) in frequencyConversions"
            :key="unit"
            class="bg-gray-900 rounded-lg p-3"
          >
            <p class="text-gray-400 text-xs mb-1">{{ unitLabels[unit] }}</p>
            <p class="text-white font-mono">{{ formatNumber(value) }}</p>
          </div>
        </div>
      </div>

      <!-- Waveform Visualization -->
      <div class="bg-gray-900 rounded-lg p-4">
        <h3 class="text-lg font-medium text-purple-400 mb-3">Waveform Visualization</h3>
        <svg viewBox="0 0 800 150" class="w-full h-auto">
          <!-- Grid lines -->
          <line v-for="i in 8" :key="'h'+i" 
                :x1="0" :y1="i*18.75" :x2="800" :y2="i*18.75" 
                stroke="#374151" stroke-width="1" />
          
          <!-- Center line -->
          <line x1="0" y1="75" x2="800" y2="75" stroke="#6B7280" stroke-width="2" />
          
          <!-- Sine wave -->
          <path
            :d="waveformPath"
            fill="none"
            stroke="#8B5CF6"
            stroke-width="3"
          />
          
          <!-- Period indicator -->
          <line
            v-if="displayFrequencyHz > 0 && displayFrequencyHz <= 100"
            :x1="100"
            :y1="20"
            :x2="100 + (displayFrequencyHz > 0 ? 800 / displayFrequencyHz : 800)"
            :y2="20"
            stroke="#60A5FA"
            stroke-width="2"
          />
          <line
            v-if="displayFrequencyHz > 0 && displayFrequencyHz <= 100"
            x1="100"
            y1="15"
            x2="100"
            y2="25"
            stroke="#60A5FA"
            stroke-width="2"
          />
          <line
            v-if="displayFrequencyHz > 0 && displayFrequencyHz <= 100"
            :x1="100 + (displayFrequencyHz > 0 ? 800 / displayFrequencyHz : 800)"
            y1="15"
            :x2="100 + (displayFrequencyHz > 0 ? 800 / displayFrequencyHz : 800)"
            y2="25"
            stroke="#60A5FA"
            stroke-width="2"
          />
          <text
            v-if="displayFrequencyHz > 0 && displayFrequencyHz <= 100"
            :x="100 + (displayFrequencyHz > 0 ? 400 / displayFrequencyHz : 400)"
            y="12"
            fill="#60A5FA"
            font-size="12"
            text-anchor="middle"
          >T = {{ formatNumber(displayPeriodS) }}s</text>
        </svg>
      </div>
    </div>

    <!-- Applications Reference -->
    <div class="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">Common Applications</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium text-blue-400 mb-3">Period Applications</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Pulse Width Modulation (PWM):</strong> Microseconds to milliseconds</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Memory Access Time:</strong> Nanoseconds</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Clock Cycle:</strong> Picoseconds to nanoseconds</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-400 mr-2">•</span>
              <span><strong>Signal Propagation:</strong> Microseconds</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-medium text-green-400 mb-3">Frequency Applications</h3>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-start">
              <span class="text-green-400 mr-2">•</span>
              <span><strong>Audio:</strong> 20 Hz - 20 kHz</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-400 mr-2">•</span>
              <span><strong>Radio:</strong> kHz to GHz range</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-400 mr-2">•</span>
              <span><strong>Wireless:</strong> 2.4 GHz, 5 GHz WiFi</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-400 mr-2">•</span>
              <span><strong>CPU Clock:</strong> GHz range</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-white mb-4">How It Works</h2>
      
      <div class="space-y-4">
        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-yellow-400 mb-2">The Relationship</h3>
          <p class="text-gray-300 mb-3">
            Period (T) and frequency (f) are inversely proportional. Period is the time for one complete cycle, 
            while frequency is the number of cycles per second.
          </p>
          <div class="bg-gray-800 rounded p-3 font-mono text-center text-white">
            <p class="text-lg">f = 1 / T</p>
            <p class="text-lg mt-2">T = 1 / f</p>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-purple-400 mb-2">Unit Conversions</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-400 mb-2">Period Units:</p>
              <ul class="space-y-1 text-gray-300">
                <li>1 picosecond (ps) = 10⁻¹² seconds</li>
                <li>1 nanosecond (ns) = 10⁻⁹ seconds</li>
                <li>1 microsecond (μs) = 10⁻⁶ seconds</li>
                <li>1 millisecond (ms) = 10⁻³ seconds</li>
              </ul>
            </div>
            <div>
              <p class="text-gray-400 mb-2">Frequency Units:</p>
              <ul class="space-y-1 text-gray-300">
                <li>1 kHz = 10³ Hz (kilohertz)</li>
                <li>1 MHz = 10⁶ Hz (megahertz)</li>
                <li>1 GHz = 10⁹ Hz (gigahertz)</li>
                <li>1 THz = 10¹² Hz (terahertz)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-4">
          <h3 class="text-lg font-medium text-blue-400 mb-2">Example Calculations</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center border-b border-gray-700 pb-2">
              <span class="text-gray-300">1 MHz signal:</span>
              <span class="text-white font-mono">T = 1 / 1,000,000 = 1 μs</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-700 pb-2">
              <span class="text-gray-300">60 Hz power:</span>
              <span class="text-white font-mono">T = 1 / 60 = 16.67 ms</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-700 pb-2">
              <span class="text-gray-300">1 ns period:</span>
              <span class="text-white font-mono">f = 1 / 10⁻⁹ = 1 GHz</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-300">440 Hz (A4 note):</span>
              <span class="text-white font-mono">T = 1 / 440 = 2.27 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Input values
const periodValue = ref(null)
const periodUnit = ref('ms')
const frequencyValue = ref(null)
const frequencyUnit = ref('kHz')

// Unit conversion factors to base units
const periodFactors = {
  ps: 1e-12,
  ns: 1e-9,
  μs: 1e-6,
  ms: 1e-3,
  s: 1,
  min: 60,
  hr: 3600
}

const frequencyFactors = {
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,
  GHz: 1e9,
  THz: 1e12
}

const unitLabels = {
  ps: 'picoseconds',
  ns: 'nanoseconds',
  μs: 'microseconds',
  ms: 'milliseconds',
  s: 'seconds',
  min: 'minutes',
  hr: 'hours',
  Hz: 'Hertz',
  kHz: 'kilohertz',
  MHz: 'megahertz',
  GHz: 'gigahertz',
  THz: 'terahertz'
}

// Presets
const presets = [
  { name: '60 Hz (Power)', frequency: 60, frequencyUnit: 'Hz' },
  { name: '1 kHz (Audio)', frequency: 1, frequencyUnit: 'kHz' },
  { name: '1 MHz (RF)', frequency: 1, frequencyUnit: 'MHz' },
  { name: '2.4 GHz (WiFi)', frequency: 2.4, frequencyUnit: 'GHz' }
]

// Calculate frequency from period
const updateFrequency = () => {
  if (periodValue.value && periodValue.value > 0) {
    const periodInSeconds = periodValue.value * periodFactors[periodUnit.value]
    const frequencyInHz = 1 / periodInSeconds
    
    // Auto-select appropriate frequency unit
    if (frequencyInHz >= 1e12) {
      frequencyUnit.value = 'THz'
      frequencyValue.value = frequencyInHz / 1e12
    } else if (frequencyInHz >= 1e9) {
      frequencyUnit.value = 'GHz'
      frequencyValue.value = frequencyInHz / 1e9
    } else if (frequencyInHz >= 1e6) {
      frequencyUnit.value = 'MHz'
      frequencyValue.value = frequencyInHz / 1e6
    } else if (frequencyInHz >= 1e3) {
      frequencyUnit.value = 'kHz'
      frequencyValue.value = frequencyInHz / 1e3
    } else {
      frequencyUnit.value = 'Hz'
      frequencyValue.value = frequencyInHz
    }
  } else {
    frequencyValue.value = null
  }
}

// Calculate period from frequency
const updatePeriod = () => {
  if (frequencyValue.value && frequencyValue.value > 0) {
    const frequencyInHz = frequencyValue.value * frequencyFactors[frequencyUnit.value]
    const periodInSeconds = 1 / frequencyInHz
    
    // Auto-select appropriate period unit
    if (periodInSeconds >= 3600) {
      periodUnit.value = 'hr'
      periodValue.value = periodInSeconds / 3600
    } else if (periodInSeconds >= 60) {
      periodUnit.value = 'min'
      periodValue.value = periodInSeconds / 60
    } else if (periodInSeconds >= 1) {
      periodUnit.value = 's'
      periodValue.value = periodInSeconds
    } else if (periodInSeconds >= 1e-3) {
      periodUnit.value = 'ms'
      periodValue.value = periodInSeconds / 1e-3
    } else if (periodInSeconds >= 1e-6) {
      periodUnit.value = 'μs'
      periodValue.value = periodInSeconds / 1e-6
    } else if (periodInSeconds >= 1e-9) {
      periodUnit.value = 'ns'
      periodValue.value = periodInSeconds / 1e-9
    } else {
      periodUnit.value = 'ps'
      periodValue.value = periodInSeconds / 1e-12
    }
  } else {
    periodValue.value = null
  }
}

// Display values in base units
const displayPeriodS = computed(() => {
  if (periodValue.value) {
    return periodValue.value * periodFactors[periodUnit.value]
  }
  return 0
})

const displayFrequencyHz = computed(() => {
  if (frequencyValue.value) {
    return frequencyValue.value * frequencyFactors[frequencyUnit.value]
  }
  return 0
})

// All period conversions
const periodConversions = computed(() => {
  const periodInSeconds = displayPeriodS.value
  if (!periodInSeconds) return {}
  
  return {
    ps: periodInSeconds / 1e-12,
    ns: periodInSeconds / 1e-9,
    μs: periodInSeconds / 1e-6,
    ms: periodInSeconds / 1e-3,
    s: periodInSeconds,
    min: periodInSeconds / 60,
    hr: periodInSeconds / 3600
  }
})

// All frequency conversions
const frequencyConversions = computed(() => {
  const frequencyInHz = displayFrequencyHz.value
  if (!frequencyInHz) return {}
  
  return {
    Hz: frequencyInHz,
    kHz: frequencyInHz / 1e3,
    MHz: frequencyInHz / 1e6,
    GHz: frequencyInHz / 1e9,
    THz: frequencyInHz / 1e12
  }
})

// Waveform path
const waveformPath = computed(() => {
  const freq = displayFrequencyHz.value
  if (freq <= 0 || freq > 100) {
    // Default waveform for display purposes
    const points = []
    for (let x = 0; x <= 800; x += 2) {
      const y = 75 + 50 * Math.sin((x / 800) * 4 * Math.PI)
      points.push(`${x},${y}`)
    }
    return 'M ' + points.join(' L ')
  }
  
  // Generate waveform based on actual frequency
  const points = []
  const cycles = Math.min(freq, 10) // Limit for visibility
  for (let x = 0; x <= 800; x += 2) {
    const y = 75 + 50 * Math.sin((x / 800) * cycles * 2 * Math.PI)
    points.push(`${x},${y}`)
  }
  return 'M ' + points.join(' L ')
})

// Format number for display
const formatNumber = (num) => {
  if (num === undefined || num === null || isNaN(num)) return '---'
  
  if (num === 0) return '0'
  
  if (num < 0.000001) {
    return num.toExponential(2)
  } else if (num < 0.001) {
    return num.toFixed(8)
  } else if (num < 1) {
    return num.toFixed(6)
  } else if (num >= 1000000) {
    return num.toExponential(2)
  } else if (num >= 1000) {
    return num.toFixed(2)
  } else {
    return num.toFixed(4)
  }
}

// Apply preset
const applyPreset = (preset) => {
  frequencyValue.value = preset.frequency
  frequencyUnit.value = preset.frequencyUnit
  updatePeriod()
}
</script>

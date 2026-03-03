<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const frequency = ref(100) // MHz
const frequencyUnit = ref('MHz')
const antennaType = ref('dipole')
const velocityFactor = ref(0.95) // Default for wire
const customLength = ref(0) // meters
const mode = ref('calculate-length') // 'calculate-length' or 'calculate-frequency'

// Velocity factor presets
const velocityPresets = [
  { name: 'Air/Open Wire', value: 0.98 },
  { name: 'Wire/Copper', value: 0.95 },
  { name: 'Coax (RG-213)', value: 0.66 },
  { name: 'Coax (RG-58)', value: 0.66 },
  { name: 'Coax (RG-8X)', value: 0.78 },
  { name: 'Twin Lead', value: 0.82 },
  { name: 'Custom', value: 0.95 }
]

// Antenna types
const antennaTypes = [
  { id: 'dipole', name: 'Dipole (½ wave)', multiplier: 0.5 },
  { id: 'monopole', name: 'Monopole/Vertical (¼ wave)', multiplier: 0.25 },
  { id: 'full-wave', name: 'Full Wave Loop', multiplier: 1.0 },
  { id: '5-8-wave', name: '5/8 Wave Vertical', multiplier: 0.625 }
]

// Speed of light in m/s
const c = 299792458

// Calculations
const frequencyHz = computed(() => {
  const f = frequency.value
  if (frequencyUnit.value === 'kHz') return f * 1000
  if (frequencyUnit.value === 'MHz') return f * 1000000
  if (frequencyUnit.value === 'GHz') return f * 1000000000
  return f
})

const wavelength = computed(() => {
  return (c / frequencyHz.value)
})

const antennaLength = computed(() => {
  const type = antennaTypes.find(t => t.id === antennaType.value)
  return wavelength.value * (type?.multiplier || 0.5) * velocityFactor.value
})

// Reverse calculation - frequency from length
const calculatedFrequency = computed(() => {
  if (customLength.value <= 0) return 0
  const type = antennaTypes.find(t => t.id === antennaType.value)
  const wave = customLength.value / ((type?.multiplier || 0.5) * velocityFactor.value)
  return c / wave
})

// Harmonics
const harmonics = computed(() => {
  const harm = []
  for (let i = 2; i <= 6; i++) {
    harm.push({
      harmonic: i,
      freq: frequencyHz.value * i,
      wavelength: wavelength.value / i,
      length: (wavelength.value / i) * 0.5 * velocityFactor.value
    })
  }
  return harm
})

// Amateur radio bands reference
const amateurBands = ref([
  { name: '160m', freq: 1.8, range: '1.8-2.0 MHz' },
  { name: '80m', freq: 3.5, range: '3.5-4.0 MHz' },
  { name: '60m', freq: 5.3, range: '5.3-5.4 MHz' },
  { name: '40m', freq: 7.0, range: '7.0-7.3 MHz' },
  { name: '30m', freq: 10.1, range: '10.1-10.15 MHz' },
  { name: '20m', freq: 14.0, range: '14.0-14.35 MHz' },
  { name: '17m', freq: 18.0, range: '18.0-18.17 MHz' },
  { name: '15m', freq: 21.0, range: '21.0-21.45 MHz' },
  { name: '12m', freq: 24.9, range: '24.89-24.99 MHz' },
  { name: '10m', freq: 28.0, range: '28.0-29.7 MHz' },
  { name: '6m', freq: 50.0, range: '50-54 MHz' },
  { name: '2m', freq: 145.0, range: '144-148 MHz' },
  { name: '70cm', freq: 433.0, range: '430-440 MHz' },
  { name: '23cm', freq: 1296.0, range: '1240-1300 MHz' }
])

const setBand = (freq: number, unit: string = 'MHz') => {
  frequency.value = freq
  frequencyUnit.value = unit
  mode.value = 'calculate-length'
}

// Format functions
const formatFrequency = (hz: number) => {
  if (hz >= 1e9) return `${(hz / 1e9).toFixed(3)} GHz`
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(3)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(3)} kHz`
  return `${hz.toFixed(2)} Hz`
}

const formatLength = (m: number) => {
  if (m >= 1000) return `${(m / 1000).toFixed(3)} km`
  if (m >= 1) return `${m.toFixed(3)} m`
  return `${(m * 100).toFixed(2)} cm`
}

// Antenna SVG visualization
const antennaSVG = computed(() => {
  const length = antennaLength.value
  const type = antennaType.value
  
  if (type === 'dipole') {
    return `
      <svg viewBox="0 0 400 300" class="w-full h-auto bg-slate-900 rounded-lg">
        <!-- Title -->
        <text x="200" y="30" text-anchor="middle" class="fill-cyan-400 text-lg font-bold">Dipole Antenna (½ Wave)</text>
        
        <!-- Feed line -->
        <line x1="200" y1="150" x2="200" y2="280" stroke="#f59e0b" stroke-width="3" />
        <text x="230" y="240" class="fill-amber-400 text-sm">Feed Line</text>
        
        <!-- Left element -->
        <line x1="200" y1="150" x2="40" y2="150" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" />
        <text x="120" y="135" class="fill-cyan-400 text-sm">λ/4</text>
        
        <!-- Right element -->
        <line x1="200" y1="150" x2="360" y2="150" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" />
        <text x="280" y="135" class="fill-cyan-400 text-sm">λ/4</text>
        
        <!-- Total length -->
        <line x1="40" y1="180" x2="360" y2="180" stroke="#f472b6" stroke-width="2" stroke-dasharray="5,5" />
        <line x1="40" y1="175" x2="40" y2="185" stroke="#f472b6" stroke-width="2" />
        <line x1="360" y1="175" x2="360" y2="185" stroke="#f472b6" stroke-width="2" />
        <text x="200" y="200" text-anchor="middle" class="fill-pink-400 text-sm">Total: λ/2 = ${formatLength(length)}</text>
        
        <!-- Center feed point -->
        <circle cx="200" cy="150" r="8" fill="none" stroke="#f59e0b" stroke-width="3" />
        <text x="200" y="270" text-anchor="middle" class="fill-amber-400 text-xs">Feed Point</text>
        
        <!-- Wave representation -->
        <path d="M 50 250 Q 75 230, 100 250 T 150 250 T 200 250 T 250 250 T 300 250 T 350 250" 
              fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.5" />
        <text x="200" y="295" text-anchor="middle" class="fill-violet-400 text-xs">Radio Wave</text>
      </svg>
    `
  } else if (type === 'monopole') {
    return `
      <svg viewBox="0 0 400 300" class="w-full h-auto bg-slate-900 rounded-lg">
        <text x="200" y="30" text-anchor="middle" class="fill-cyan-400 text-lg font-bold">Monopole/Vertical Antenna (¼ Wave)</text>
        
        <!-- Ground plane -->
        <line x1="80" y1="250" x2="320" y2="250" stroke="#10b981" stroke-width="4" />
        <line x1="100" y1="250" x2="140" y2="270" stroke="#10b981" stroke-width="3" />
        <line x1="150" y1="250" x2="190" y2="270" stroke="#10b981" stroke-width="3" />
        <line x1="210" y1="250" x2="250" y2="270" stroke="#10b981" stroke-width="3" />
        <line x1="260" y1="250" x2="300" y2="270" stroke="#10b981" stroke-width="3" />
        <text x="200" y="285" text-anchor="middle" class="fill-emerald-400 text-sm">Ground Plane</text>
        
        <!-- Vertical element -->
        <line x1="200" y1="250" x2="200" y2="80" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" />
        <text x="230" y="170" class="fill-cyan-400 text-sm">λ/4</text>
        
        <!-- Length dimension -->
        <line x1="250" y1="250" x2="250" y2="80" stroke="#f472b6" stroke-width="2" stroke-dasharray="5,5" />
        <line x1="245" y1="250" x2="255" y2="250" stroke="#f472b6" stroke-width="2" />
        <line x1="245" y1="80" x2="255" y2="80" stroke="#f472b6" stroke-width="2" />
        <text x="280" y="165" class="fill-pink-400 text-sm">${formatLength(length)}</text>
        
        <!-- Feed point -->
        <circle cx="200" cy="250" r="6" fill="none" stroke="#f59e0b" stroke-width="3" />
        <text x="150" y="240" class="fill-amber-400 text-xs">Feed</text>
        
        <!-- Radiation pattern hint -->
        <ellipse cx="200" cy="170" rx="60" ry="20" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3,3" opacity="0.5" />
        <text x="300" y="175" class="fill-violet-400 text-xs">Omnidirectional</text>
      </svg>
    `
  } else {
    return `
      <svg viewBox="0 0 400 300" class="w-full h-auto bg-slate-900 rounded-lg">
        <text x="200" y="30" text-anchor="middle" class="fill-cyan-400 text-lg font-bold">Full Wave Loop Antenna</text>
        
        <!-- Loop antenna (diamond shape) -->
        <polygon points="200,60 340,150 200,240 60,150" 
                 fill="none" stroke="#22d3ee" stroke-width="5" />
        
        <!-- Length labels -->
        <text x="200" y="50" text-anchor="middle" class="fill-cyan-400 text-xs">λ/4</text>
        <text x="350" y="155" class="fill-cyan-400 text-xs">λ/4</text>
        <text x="200" y="260" text-anchor="middle" class="fill-cyan-400 text-xs">λ/4</text>
        <text x="30" y="155" class="fill-cyan-400 text-xs">λ/4</text>
        
        <!-- Total circumference -->
        <text x="200" y="290" text-anchor="middle" class="fill-pink-400 text-sm">Total: 1λ = ${formatLength(length)}</text>
        
        <!-- Feed point -->
        <circle cx="200" cy="240" r="6" fill="#f59e0b" />
        <text x="140" y="245" class="fill-amber-400 text-xs">Feed Point</text>
        
        <!-- Radiation pattern -->
        <ellipse cx="200" cy="150" rx="80" ry="50" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3,3" opacity="0.5" />
        <text x="300" y="140" class="fill-violet-400 text-xs">Bidirectional</text>
      </svg>
    `
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Antenna Resonant Frequency Calculator
      </h1>
      <p class="text-slate-400">Calculate antenna dimensions for resonant frequencies</p>
    </div>

    <!-- Mode Selection -->
    <div class="bg-slate-800 rounded-xl p-4">
      <div class="flex gap-4 justify-center flex-wrap">
        <button 
          @click="mode = 'calculate-length'"
          :class="['px-4 py-2 rounded-lg transition-all', mode === 'calculate-length' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600']"
        >
          Frequency → Length
        </button>
        <button 
          @click="mode = 'calculate-frequency'"
          :class="['px-4 py-2 rounded-lg transition-all', mode === 'calculate-frequency' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600']"
        >
          Length → Frequency
        </button>
      </div>
    </div>

    <!-- Input Controls -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Frequency Input -->
      <div class="bg-slate-800 rounded-xl p-6 space-y-4">
        <h2 class="text-xl font-semibold text-cyan-400">Input Parameters</h2>
        
        <div v-if="mode === 'calculate-length'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Frequency: {{ frequency }} {{ frequencyUnit }}
            </label>
            <input 
              v-model.number="frequency" 
              type="range" 
              :min="frequencyUnit === 'kHz' ? 1 : frequencyUnit === 'GHz' ? 0.1 : 0.1"
              :max="frequencyUnit === 'kHz' ? 999 : frequencyUnit === 'GHz' ? 10 : 1000"
              step="0.1"
              class="w-full accent-cyan-500"
            >
            <div class="flex gap-2 mt-2">
              <button 
                v-for="unit in ['kHz', 'MHz', 'GHz']" 
                :key="unit"
                @click="frequencyUnit = unit"
                :class="['px-3 py-1 rounded text-sm', frequencyUnit === unit ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300']"
              >
                {{ unit }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Antenna Type</label>
            <select v-model="antennaType" class="w-full bg-slate-700 text-white rounded-lg px-3 py-2">
              <option v-for="type in antennaTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Velocity Factor: {{ velocityFactor.toFixed(2) }}</label>
            <input 
              v-model.number="velocityFactor" 
              type="range" 
              min="0.5" 
              max="1.0" 
              step="0.01"
              class="w-full accent-cyan-500"
            >
            <div class="flex flex-wrap gap-2 mt-2">
              <button 
                v-for="preset in velocityPresets" 
                :key="preset.name"
                @click="velocityFactor = preset.value"
                class="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Physical Length: {{ customLength.toFixed(2) }} meters
            </label>
            <input 
              v-model.number="customLength" 
              type="range" 
              min="0.1" 
              max="100" 
              step="0.1"
              class="w-full accent-cyan-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Antenna Type</label>
            <select v-model="antennaType" class="w-full bg-slate-700 text-white rounded-lg px-3 py-2">
              <option v-for="type in antennaTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Velocity Factor: {{ velocityFactor.toFixed(2) }}</label>
            <input 
              v-model.number="velocityFactor" 
              type="range" 
              min="0.5" 
              max="1.0" 
              step="0.01"
              class="w-full accent-cyan-500"
            >
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="bg-slate-800 rounded-xl p-6 space-y-4">
        <h2 class="text-xl font-semibold text-green-400">Results</h2>
        
        <div v-if="mode === 'calculate-length'" class="space-y-3">
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Target Frequency</div>
            <div class="text-2xl font-bold text-cyan-400">{{ formatFrequency(frequencyHz) }}</div>
          </div>
          
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Wavelength (λ)</div>
            <div class="text-2xl font-bold text-violet-400">{{ formatLength(wavelength) }}</div>
          </div>
          
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Antenna Length</div>
            <div class="text-3xl font-bold text-green-400">{{ formatLength(antennaLength) }}</div>
            <div class="text-xs text-slate-500 mt-1">{{ antennaTypes.find(t => t.id === antennaType)?.name }}</div>
          </div>

          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Each Element (Dipole)</div>
            <div class="text-xl font-bold text-amber-400" v-if="antennaType === 'dipole'">
              {{ formatLength(antennaLength / 2) }}
            </div>
            <div class="text-xs text-slate-500" v-else>N/A for selected type</div>
          </div>
        </div>

        <div v-else class="space-y-3">
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Physical Length</div>
            <div class="text-2xl font-bold text-cyan-400">{{ formatLength(customLength) }}</div>
          </div>
          
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Resonant Frequency</div>
            <div class="text-3xl font-bold text-green-400">{{ formatFrequency(calculatedFrequency) }}</div>
          </div>
          
          <div class="bg-slate-900 rounded-lg p-4">
            <div class="text-sm text-slate-400">Wavelength (λ)</div>
            <div class="text-2xl font-bold text-violet-400">{{ formatLength(wavelength) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Antenna Visualization -->
    <div class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">Antenna Visualization</h2>
      <div v-html="antennaSVG"></div>
    </div>

    <!-- Harmonics Table (Frequency → Length mode only) -->
    <div v-if="mode === 'calculate-length'" class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">Harmonics</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="text-left py-2 px-4 text-slate-400">Harmonic</th>
              <th class="text-left py-2 px-4 text-slate-400">Frequency</th>
              <th class="text-left py-2 px-4 text-slate-400">Wavelength</th>
              <th class="text-left py-2 px-4 text-slate-400">Dipole Length</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in harmonics" :key="h.harmonic" class="border-b border-slate-700/50">
              <td class="py-2 px-4 text-slate-300">{{ h.harmonic }}nd/3rd</td>
              <td class="py-2 px-4 text-cyan-400">{{ formatFrequency(h.freq) }}</td>
              <td class="py-2 px-4 text-violet-400">{{ formatLength(h.wavelength) }}</td>
              <td class="py-2 px-4 text-green-400">{{ formatLength(h.length) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Amateur Radio Bands Reference -->
    <div class="bg-slate-800 rounded-xl p-6">
      <h2 class="text-xl font-semibold text-cyan-400 mb-4">Amateur Radio Bands Reference</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
        <button 
          v-for="band in amateurBands" 
          :key="band.name"
          @click="setBand(band.freq)"
          class="bg-slate-700 hover:bg-slate-600 rounded-lg p-3 text-center transition-all hover:scale-105"
        >
          <div class="text-lg font-bold text-cyan-400">{{ band.name }}</div>
          <div class="text-xs text-slate-400">{{ band.range }}</div>
        </button>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-slate-800 rounded-xl p-6 space-y-6">
      <h2 class="text-xl font-semibold text-cyan-400">Learn About Antennas</h2>
      
      <div class="space-y-4">
        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">📡 What is Antenna Resonance?</h3>
          <p class="text-slate-300 leading-relaxed">
            An antenna is resonant when its length is a multiple of half-wavelengths (λ/2). At resonance, 
            the antenna presents a purely resistive impedance to the feed line, maximizing power transfer 
            and minimizing reflected power (SWR).
          </p>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🧮 Key Formulas</h3>
          <div class="space-y-2 text-slate-300 font-mono text-sm">
            <div>• Wavelength: <span class="text-cyan-400">λ = c / f</span> (c ≈ 300,000,000 m/s)</div>
            <div>• Dipole Length: <span class="text-cyan-400">L = 143 / f(MHz)</span> meters (½ wave)</div>
            <div>• Monopole Length: <span class="text-cyan-400">L = 71.5 / f(MHz)</span> meters (¼ wave)</div>
            <div>• With Velocity Factor: <span class="text-cyan-400">L = (λ × VF) / 2</span></div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🔄 Velocity Factor</h3>
          <p class="text-slate-300 leading-relaxed">
            Radio waves travel slower through materials than through free space. The velocity factor (VF) 
            is the ratio of the actual speed to the speed of light. Air has VF ≈ 0.98, while coaxial cables 
            typically have VF between 0.66-0.85 depending on the dielectric material.
          </p>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">📐 Antenna Types</h3>
          <div class="grid md:grid-cols-2 gap-4 text-slate-300">
            <div>
              <div class="font-semibold text-cyan-400">Dipole (½ wave)</div>
              <p class="text-sm">Most common wire antenna. Two quarter-wave elements. Balanced feed. ~73Ω impedance.</p>
            </div>
            <div>
              <div class="font-semibold text-cyan-400">Monopole (¼ wave)</div>
              <p class="text-sm">Vertical with ground plane. Omnidirectional. ~36Ω impedance. Needs ground system.</p>
            </div>
            <div>
              <div class="font-semibold text-cyan-400">Full Wave Loop</div>
              <p class="text-sm">Higher gain than dipole. ~100Ω impedance. Bidirectional pattern. Compact size.</p>
            </div>
            <div>
              <div class="font-semibold text-cyan-400">5/8 Wave Vertical</div>
              <p class="text-sm">Lower radiation angle. ~3dB gain over quarter-wave. Needs matching network.</p>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">💡 Design Tips</h3>
          <ul class="space-y-2 text-slate-300">
            <li>• <strong>Height matters:</strong> Raising your antenna improves range and reduces ground losses</li>
            <li>• <strong>Tune for SWR:</strong> Use an antenna analyzer to find the lowest SWR point</li>
            <li>• <strong>Baluns:</strong> Use a choke balun to prevent common-mode currents on feedlines</li>
            <li>• <strong>Safety first:</strong> Keep antennas away from power lines (minimum 2x total height distance)</li>
            <li>• <strong>Start simple:</strong> A wire dipole is easy to build and works great for beginners</li>
          </ul>
        </div>

        <div class="bg-slate-900 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-amber-400 mb-2">🌍 Applications</h3>
          <div class="space-y-2 text-slate-300">
            <div>• <strong>Amateur Radio:</strong> HF DX operations on 80m, 40m, 20m, 15m, 10m bands</div>
            <div>• <strong>FM Broadcast:</strong> 88-108 MHz (≈ 1.5m dipole)</div>
            <div>• <strong>TV Reception:</strong> UHF 470-862 MHz (≈ 30-50cm elements)</div>
            <div>• <strong>Wi-Fi:</strong> 2.4 GHz (≈ 3.1cm) and 5 GHz (≈ 1.5cm)</div>
            <div>• <strong>Cellular:</strong> 700 MHz - 3.5 GHz bands</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

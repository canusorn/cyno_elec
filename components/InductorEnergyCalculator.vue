<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🧲 Inductor Energy Storage Calculator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Calculate energy stored in inductor's magnetic field
      </p>
    </div>

    <!-- Inductor Visualization -->
    <div class="mb-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6">
      <svg viewBox="0 0 800 350" class="w-full h-auto">
        <!-- Inductor Coil -->
        <g transform="translate(400, 150)">
          <!-- Magnetic field lines (animated based on energy level) -->
          <g opacity="0.3">
            <ellipse v-for="i in 5" :key="i"
              :rx="100 + i * 40" 
              :ry="60 + i * 20" 
              fill="none" 
              stroke="#8B5CF6" 
              stroke-width="2"
              stroke-dasharray="5,5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                :dur="`${3 - i * 0.3}s`"
                from="0"
                to="360"
                repeatCount="indefinite"
              />
            </ellipse>
          </g>

          <!-- Core -->
          <rect x="-80" y="-40" width="160" height="80" fill="#4B5563" stroke="#1F2937" stroke-width="3" rx="5"/>
          
          <!-- Windings -->
          <g v-for="i in 8" :key="i">
            <ellipse
              :cx="-70 + (i - 1) * 20"
              cy="0"
              rx="15"
              ry="45"
              fill="none"
              :stroke="getCoilColor()"
              stroke-width="4"
            />
          </g>
          
          <!-- Energy level indicator -->
          <text x="0" y="70" text-anchor="middle" font-size="14" font-weight="bold" fill="#8B5CF6">
            E = {{ storedEnergy.toFixed(3) }} J
          </text>
        </g>

        <!-- Current flow indicator -->
        <g v-if="current > 0">
          <circle r="6" fill="#3B82F6" opacity="0.8">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M 100 150 L 320 150 L 320 250 L 480 250 L 480 150 L 700 150"
            />
          </circle>
        </g>

        <!-- Circuit connections -->
        <path d="M 100 150 L 320 150" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 480 150 L 700 150" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 100 150 L 100 250 L 320 250" stroke="#94A3B8" stroke-width="3" fill="none"/>
        <path d="M 700 150 L 700 250 L 480 250" stroke="#94A3B8" stroke-width="3" fill="none"/>

        <!-- Labels -->
        <g transform="translate(100, 200)">
          <circle r="30" fill="white" stroke="#3B82F6" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">
            V
          </text>
        </g>

        <text x="100" y="260" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">
          {{ voltage }}V
        </text>
      </svg>
    </div>

    <!-- Input Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Inductance -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Inductance (L): {{ formatInductance(inductance) }}
        </label>
        <input
          type="range"
          v-model.number="inductance"
          min="0.1"
          max="1000"
          :step="getStepSize(inductance)"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0.1µH</span>
          <span>10mH</span>
          <span>1H</span>
        </div>
      </div>

      <!-- Current -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Current (I): {{ current }}A
        </label>
        <input
          type="range"
          v-model.number="current"
          min="0"
          max="50"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0A</span>
          <span>25A</span>
          <span>50A</span>
        </div>
      </div>

      <!-- Voltage (for additional context) -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Voltage (V): {{ voltage }}V
        </label>
        <input
          type="range"
          v-model.number="voltage"
          min="0.1"
          max="1000"
          step="0.1"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0.1V</span>
          <span>500V</span>
          <span>1000V</span>
        </div>
      </div>
    </div>

    <!-- Results Display -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Stored Energy -->
      <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Stored Energy</div>
        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
          {{ storedEnergy.toFixed(4) }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Joules (J)</div>
      </div>

      <!-- Magnetic Flux -->
      <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Magnetic Flux</div>
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {{ magneticFlux.toFixed(3) }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">Webers (Wb)</div>
      </div>

      <!-- Reactive Power -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Reactive Power</div>
        <div class="text-3xl font-bold text-green-600 dark:text-green-400">
          {{ reactivePower.toFixed(1) }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">VAR (at {{ frequency }}Hz)</div>
      </div>

      <!-- Energy Density -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-5">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Time Constant</div>
        <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
          {{ timeConstant.toFixed(3) }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">seconds (L/R)</div>
      </div>
    </div>

    <!-- Energy vs Current Graph -->
    <div class="bg-white dark:bg-gray-700 rounded-xl p-6 mb-8">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Energy vs Current (E = ½LI²)</h3>
      <div class="h-64 relative">
        <svg viewBox="0 0 600 200" class="w-full h-full">
          <!-- Grid lines -->
          <g stroke="#E5E7EB" stroke-width="1">
            <line v-for="i in 5" :key="`h-${i}`" 
              x1="60" y1="20" x2="580" 
              :y2="20 + (i - 1) * 40"/>
            <line v-for="i in 10" :key="`v-${i}`" 
              :x1="60 + (i - 1) * 52" y1="20" 
              :x2="60 + (i - 1) * 52" y2="180"/>
          </g>
          
          <!-- Axes -->
          <line x1="60" y1="20" x2="60" y2="180" stroke="#374151" stroke-width="2"/>
          <line x1="60" y1="180" x2="580" y2="180" stroke="#374151" stroke-width="2"/>
          
          <!-- Energy curve -->
          <path 
            :d="getEnergyCurve()" 
            fill="none" 
            stroke="#8B5CF6" 
            stroke-width="3"
          />
          
          <!-- Current operating point -->
          <circle 
            :cx="getCurrentX()" 
            :cy="getCurrentY()" 
            r="6" 
            fill="#EF4444" 
            stroke="white" 
            stroke-width="2"
          />
          
          <!-- Labels -->
          <text x="320" y="195" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">
            Current (A)
          </text>
          <text x="25" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151" transform="rotate(-90, 25, 100)">
            Energy (J)
          </text>
        </svg>
      </div>
    </div>

    <!-- Presets -->
    <div class="mb-8">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Presets</h3>
      <div class="flex flex-wrap gap-2">
        <button
          @click="applyPreset('sm-inductor')"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          Small Inductor (10µH, 5A)
        </button>
        <button
          @click="applyPreset('power-inductor')"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          Power Inductor (100µH, 10A)
        </button>
        <button
          @click="applyPreset('filter-inductor')"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          Filter Choke (10mH, 1A)
        </button>
        <button
          @click="applyPreset('high-energy')"
          class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors text-sm"
        >
          High Energy (100mH, 20A)
        </button>
      </div>
    </div>

    <!-- Comparison Table -->
    <div class="bg-white dark:bg-gray-700 rounded-xl p-6 mb-8 overflow-x-auto">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Energy Comparison</h3>
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Application</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Inductance</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Energy</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600">
          <tr v-for="comp in comparisons" :key="comp.name">
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ comp.name }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ comp.l }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ comp.i }}</td>
            <td class="px-4 py-3 text-sm font-bold" :class="getComparisonColor(comp.energy)">
              {{ comp.energy }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 About Inductor Energy Storage</h3>
      
      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">How Inductors Store Energy</h4>
          <p class="text-sm mb-2">
            When current flows through an inductor, energy is stored in its magnetic field. 
            Unlike capacitors (which store energy in electric fields), inductors store energy magnetically.
          </p>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm font-mono">
            E = ½ × L × I²
          </div>
          <ul class="text-sm list-disc list-inside space-y-1 mt-2 ml-2">
            <li><strong>E</strong> = Energy in Joules (J)</li>
            <li><strong>L</strong> = Inductance in Henries (H)</li>
            <li><strong>I</strong> = Current in Amperes (A)</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Characteristics</h4>
          <ul class="text-sm list-disc list-inside space-y-1 ml-2">
            <li><strong>Quadratic Relationship:</strong> Energy ∝ I² (doubling current quadruples energy)</li>
            <li><strong>Instantaneous:</strong> Energy stored depends on instantaneous current</li>
            <li><strong>Released Quickly:</strong> Energy can be released rapidly when circuit opens</li>
            <li><strong>No Loss:</strong> Ideal inductors store energy without dissipation</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Magnetic Flux</h4>
          <p class="text-sm mb-2">
            The magnetic flux linkage (Φ) is proportional to current:
          </p>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm font-mono space-y-1">
            <div>Φ = L × I</div>
            <div>Φ = Magnetic flux in Webers (Wb)</div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Practical Applications</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div class="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">⚡ Energy Storage</div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• Switching power supplies</li>
                <li>• Boost/buck converters</li>
                <li>• SMPS circuits</li>
              </ul>
            </div>
            <div>
              <div class="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">🔧 Filtering</div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• EMI filters</li>
                <li>• Power line chokes</li>
                <li>• Noise suppression</li>
              </ul>
            </div>
            <div>
              <div class="font-semibold text-purple-700 dark:text-purple-400 text-sm mb-1">⚙️ Transformers</div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• Voltage conversion</li>
                <li>• Impedance matching</li>
                <li>• Isolation</li>
              </ul>
            </div>
            <div>
              <div class="font-semibold text-orange-700 dark:text-orange-400 text-sm mb-1">🔌 Motors & Generators</div>
              <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                <li>• Windings</li>
                <li>• Field coils</li>
                <li>• Starter motors</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Inductor Types & Energy Capacity</h4>
          <ul class="text-sm list-disc list-inside space-y-1 ml-2">
            <li><strong>Air Core:</strong> Low inductance, no saturation, high Q</li>
            <li><strong>Ferrite Core:</strong> High inductance, compact, frequency-dependent</li>
            <li><strong>Powdered Iron:</strong> Good for high current, moderate inductance</li>
            <li><strong>Laminated Steel:</strong> Power applications, low frequency, high energy</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Safety Considerations</h4>
          <div class="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 text-sm">
            <ul class="text-red-700 dark:text-red-400 space-y-1">
              <li>⚠️ <strong>High Voltage Spikes:</strong> Opening an inductive circuit can generate dangerous voltage spikes</li>
              <li>⚠️ <strong>Flyback Diodes:</strong> Always use protection diodes with relays and motors</li>
              <li>⚠️ <strong>Arc Hazards:</strong> Switched inductors can create sustained arcs</li>
              <li>⚠️ <strong>Energy Release:</strong> Large inductors can deliver stored energy rapidly</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Real-World Example</h4>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-sm">
            <div class="font-mono space-y-1">
              <div><strong>Problem:</strong> Calculate energy stored in a 100µH inductor carrying 10A</div>
              <div class="mt-2"><strong>Solution:</strong></div>
              <div class="ml-2">E = ½ × L × I²</div>
              <div class="ml-2">E = 0.5 × 100µH × (10A)²</div>
              <div class="ml-2">E = 0.5 × 0.0001H × 100</div>
              <div class="ml-2 font-bold text-purple-600">E = 0.005 J = 5 mJ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Input parameters
const inductance = ref(100) // µH
const current = ref(5) // A
const voltage = ref(12) // V
const frequency = ref(50) // Hz

// Computed values
const storedEnergy = computed(() => {
  const L = inductance.value * 1e-6 // Convert µH to H
  return 0.5 * L * Math.pow(current.value, 2)
})

const magneticFlux = computed(() => {
  const L = inductance.value * 1e-6 // Convert µH to H
  return L * current.value
})

const reactivePower = computed(() => {
  const L = inductance.value * 1e-6 // Convert µH to H
  const omega = 2 * Math.PI * frequency.value
  const XL = omega * L
  return Math.pow(current.value, 2) * XL
})

const timeConstant = computed(() => {
  const L = inductance.value * 1e-6 // Convert µH to H
  const R = voltage.value / current.value
  return L / R
})

// Comparison data
const comparisons = computed(() => {
  const currentEnergy = storedEnergy.value
  return [
    {
      name: 'Your Design',
      l: formatInductance(inductance.value),
      i: `${current.value}A`,
      energy: `${storedEnergy.toFixed(4)}J`,
      value: currentEnergy
    },
    {
      name: 'Small Signal (10µH, 0.1A)',
      l: '10µH',
      i: '0.1A',
      energy: '0.00000005J',
      value: 0.5 * 10e-6 * 0.01
    },
    {
      name: 'SMPS Inductor (100µH, 5A)',
      l: '100µH',
      i: '5A',
      energy: '0.00125J',
      value: 0.5 * 100e-6 * 25
    },
    {
      name: 'Power Choke (10mH, 10A)',
      l: '10mH',
      i: '10A',
      energy: '0.5J',
      value: 0.5 * 0.01 * 100
    },
    {
      name: 'Motor Winding (100mH, 20A)',
      l: '100mH',
      i: '20A',
      energy: '20J',
      value: 0.5 * 0.1 * 400
    }
  ]
})

// Methods
const formatInductance = (val: number): string => {
  if (val >= 1e6) return `${(val / 1e6).toFixed(2)}H`
  if (val >= 1e3) return `${(val / 1e3).toFixed(2)}mH`
  return `${val.toFixed(1)}µH`
}

const getStepSize = (val: number): number => {
  if (val >= 100) return 10
  if (val >= 10) return 1
  if (val >= 1) return 0.1
  return 0.01
}

const getCoilColor = (): string => {
  const energyRatio = Math.min(storedEnergy.value / 10, 1)
  if (energyRatio > 0.7) return '#EF4444'
  if (energyRatio > 0.4) return '#F59E0B'
  return '#8B5CF6'
}

const getEnergyCurve = (): string => {
  const maxCurrent = 50
  const maxEnergy = 0.5 * 0.1 * Math.pow(maxCurrent, 2) // Assuming max 100mH
  
  let path = 'M 60 180'
  
  for (let i = 0; i <= 100; i++) {
    const current = (i / 100) * maxCurrent
    const energy = 0.5 * 0.001 * Math.pow(current, 2) // Using 1mH reference
    
    const x = 60 + (i / 100) * 520
    const y = 180 - (energy / maxEnergy) * 160
    
    path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  
  return path
}

const getCurrentX = (): number => {
  const maxCurrent = 50
  return 60 + (current.value / maxCurrent) * 520
}

const getCurrentY = (): number => {
  const maxCurrent = 50
  const maxEnergy = 0.5 * 0.1 * Math.pow(maxCurrent, 2)
  const energy = storedEnergy.value
  return 180 - (energy / maxEnergy) * 160
}

const getComparisonColor = (energyStr: string): string => {
  const energy = parseFloat(energyStr)
  const currentEnergy = storedEnergy.value
  
  if (energy > currentEnergy * 1.5) return 'text-red-600 dark:text-red-400'
  if (energy < currentEnergy * 0.5) return 'text-green-600 dark:text-green-400'
  return 'text-gray-600 dark:text-gray-300'
}

const applyPreset = (preset: string) => {
  switch (preset) {
    case 'sm-inductor':
      inductance.value = 10
      current.value = 5
      voltage.value = 5
      break
    case 'power-inductor':
      inductance.value = 100
      current.value = 10
      voltage.value = 12
      break
    case 'filter-inductor':
      inductance.value = 10000
      current.value = 1
      voltage.value = 24
      break
    case 'high-energy':
      inductance.value = 100000
      current.value = 20
      voltage.value = 48
      break
  }
}
</script>

<style scoped>
input[type="range"] {
  accent-color: #9FA8DA;
}
</style>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <svg class="h-20 w-20 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Solar Cell I-V Characteristic</h1>
        <p class="text-xl text-blue-200">Interactive photovoltaic cell simulation with real-time I-V and P-V curves</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-3 gap-6">
        
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Cell Type Selection -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Solar Cell Type
            </h2>
            
            <div class="space-y-3">
              <button v-for="(spec, type) in cellSpecs" :key="type" @click="cellType = type"
                      :class="['w-full px-4 py-3 rounded-xl text-left transition-all', cellType === type ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg' : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700']">
                <div class="font-semibold">{{ spec.name }}</div>
                <div class="text-xs opacity-80">Efficiency: {{ spec.efficiency }}% | {{ spec.material }}</div>
              </button>
            </div>
          </div>

          <!-- Environmental Controls -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Environmental Conditions
            </h2>

            <!-- Irradiance -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Solar Irradiance: {{ irradiance }} W/m²
              </label>
              <input v-model.number="irradiance" type="range" min="100" max="1000" step="10" class="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500">
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>100</span>
                <span>1000 (STC)</span>
              </div>
              <p class="text-xs text-gray-400 mt-2">
                {{ irradiance >= 900 ? '☀️ Full sun' : irradiance >= 500 ? '🌤️ Partly cloudy' : '☁️ Cloudy' }}
              </p>
            </div>

            <!-- Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Cell Temperature: {{ temperature }}°C
              </label>
              <input v-model.number="temperature" type="range" min="-20" max="80" step="1" class="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500">
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>-20°C</span>
                <span>80°C</span>
              </div>
              <p class="text-xs text-gray-400 mt-2">
                {{ temperature <= 0 ? '❄️ Freezing' : temperature <= 25 ? '✅ Optimal (25°C)' : temperature <= 50 ? '⚠️ Warm' : '🔥 Hot' }}
              </p>
            </div>

            <!-- Operating Voltage -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Operating Voltage: {{ operatingVoltage.toFixed(2) }} V
              </label>
              <input v-model.number="operatingVoltage" type="range" min="0" max="0.8" step="0.01" class="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500">
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>0V (Short)</span>
                <span>Voc (Open)</span>
              </div>
            </div>
          </div>

          <!-- Quick Scenarios -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-lg font-bold text-white mb-4">Quick Scenarios</h2>
            <div class="space-y-2">
              <button v-for="(scenario, name) in scenarios" :key="name" @click="applyScenario(scenario)"
                      class="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-medium transition-all">
                {{ name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Visualization Panel -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Key Parameters Display -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ calculatedIsc.toFixed(3) }} A</div>
              <div class="text-xs text-gray-400 mt-1">Short Circuit (Isc)</div>
            </div>
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 text-center">
              <div class="text-2xl font-bold text-blue-400">{{ calculatedVoc.toFixed(3) }} V</div>
              <div class="text-xs text-gray-400 mt-1">Open Circuit (Voc)</div>
            </div>
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 text-center">
              <div class="text-2xl font-bold text-green-400">{{ calculatedImp.toFixed(3) }} A</div>
              <div class="text-xs text-gray-400 mt-1">MPP Current</div>
            </div>
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 text-center">
              <div class="text-2xl font-bold text-purple-400">{{ calculatedVmp.toFixed(3) }} V</div>
              <div class="text-xs text-gray-400 mt-1">MPP Voltage</div>
            </div>
          </div>

          <!-- I-V Curve -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center justify-between">
              <span>I-V Characteristic Curve</span>
              <span class="text-sm font-normal text-gray-400">Current vs Voltage</span>
            </h2>
            
            <div class="relative">
              <svg viewBox="0 0 500 350" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="solarGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" stroke-width="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="500" height="350" fill="url(#solarGrid)" />
                
                <!-- Axes -->
                <line x1="60" y1="300" x2="470" y2="300" stroke="#94a3b8" stroke-width="2"/>
                <line x1="60" y1="300" x2="60" y2="30" stroke="#94a3b8" stroke-width="2"/>
                
                <!-- Axis Labels -->
                <text x="265" y="340" text-anchor="middle" class="text-sm font-semibold fill-gray-300">Voltage (V)</text>
                <text x="25" y="165" text-anchor="middle" transform="rotate(-90, 25, 165)" class="text-sm font-semibold fill-gray-300">Current (A)</text>
                
                <!-- V Scale Labels -->
                <text x="60" y="320" text-anchor="middle" class="text-xs fill-gray-500">0</text>
                <text x="265" y="320" text-anchor="middle" class="text-xs fill-gray-500">Voc</text>
                
                <!-- I Scale Labels -->
                <text x="45" y="305" text-anchor="end" class="text-xs fill-gray-500">0</text>
                <text x="45" y="40" text-anchor="end" class="text-xs fill-gray-500">Isc</text>
                
                <!-- I-V Curve -->
                <path :d="ivCurvePath" fill="none" stroke="#22d3ee" stroke-width="3"/>
                
                <!-- MPP Point -->
                <circle :cx="mppX" :cy="mppY" r="8" fill="#22c55e" stroke="#fff" stroke-width="2"/>
                <text :x="mppX + 15" :cy="mppY - 10" class="text-xs font-bold fill-green-400">MPP</text>
                
                <!-- Operating Point -->
                <circle :cx="opX" :cy="opY" r="6" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
                <text :x="opX + 10" :cy="opY + 20" class="text-xs font-bold fill-yellow-400">OP</text>
                
                <!-- Load Line (optional) -->
                <line :x1="60" :y1="opY" :x2="opX" :y2="opY" stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
                <line :x1="opX" :y1="opY" :x2="opX" :y2="300" stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
              </svg>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-6 h-1 bg-cyan-400 rounded"></div>
                <span class="text-gray-400">I-V Curve</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span class="text-gray-400">Maximum Power Point (MPP)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span class="text-gray-400">Operating Point</span>
              </div>
            </div>
          </div>

          <!-- P-V Curve -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center justify-between">
              <span>P-V Characteristic Curve</span>
              <span class="text-sm font-normal text-gray-400">Power vs Voltage</span>
            </h2>
            
            <div class="relative">
              <svg viewBox="0 0 500 350" class="w-full h-auto">
                <!-- Background Grid -->
                <rect width="500" height="350" fill="url(#solarGrid)" />
                
                <!-- Axes -->
                <line x1="60" y1="300" x2="470" y2="300" stroke="#94a3b8" stroke-width="2"/>
                <line x1="60" y1="300" x2="60" y2="30" stroke="#94a3b8" stroke-width="2"/>
                
                <!-- Axis Labels -->
                <text x="265" y="340" text-anchor="middle" class="text-sm font-semibold fill-gray-300">Voltage (V)</text>
                <text x="25" y="165" text-anchor="middle" transform="rotate(-90, 25, 165)" class="text-sm font-semibold fill-gray-300">Power (W)</text>
                
                <!-- V Scale Labels -->
                <text x="60" y="320" text-anchor="middle" class="text-xs fill-gray-500">0</text>
                <text x="265" y="320" text-anchor="middle" class="text-xs fill-gray-500">Voc</text>
                
                <!-- P Scale Labels -->
                <text x="45" y="305" text-anchor="end" class="text-xs fill-gray-500">0</text>
                <text x="45" y="40" text-anchor="end" class="text-xs fill-gray-500">Pmax</text>
                
                <!-- P-V Curve -->
                <path :d="pvCurvePath" fill="none" stroke="#f472b6" stroke-width="3"/>
                
                <!-- MPP Point -->
                <circle :cx="mppX_PV" :cy="mppY_PV" r="8" fill="#22c55e" stroke="#fff" stroke-width="2"/>
                <text :x="mppX_PV + 15" :cy="mppY_PV - 10" class="text-xs font-bold fill-green-400">MPP ({{ calculatedPmax.toFixed(3) }}W)</text>
                
                <!-- Operating Point -->
                <circle :cx="opX_PV" :cy="opY_PV" r="6" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
                <text :x="opX_PV + 10" :cy="opY_PV + 20" class="text-xs font-bold fill-yellow-400">OP ({{ currentPower.toFixed(3) }}W)</text>
                
                <!-- Fill under curve (optional enhancement) -->
                <path :d="pvCurveFill" fill="url(#powerGradient)" opacity="0.3"/>
              </svg>
              
              <!-- Gradient Definition -->
              <defs>
                <linearGradient id="powerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#f472b6;stop-opacity:0.5" />
                  <stop offset="100%" style="stop-color:#f472b6;stop-opacity:0" />
                </linearGradient>
              </defs>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4">Performance Metrics</h2>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Current Power</div>
                <div class="text-2xl font-bold text-yellow-400">{{ currentPower.toFixed(3) }} W</div>
              </div>
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Max Power (Pmax)</div>
                <div class="text-2xl font-bold text-green-400">{{ calculatedPmax.toFixed(3) }} W</div>
              </div>
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Fill Factor</div>
                <div class="text-2xl font-bold text-purple-400">{{ fillFactor.toFixed(3) }}</div>
              </div>
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Efficiency</div>
                <div class="text-2xl font-bold text-cyan-400">{{ calculatedEfficiency.toFixed(1) }}%</div>
              </div>
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Operating Efficiency</div>
                <div class="text-2xl font-bold" :class="operatingEfficiencyColor">{{ operatingEfficiency.toFixed(1) }}%</div>
              </div>
              <div class="bg-slate-700/50 rounded-xl p-4">
                <div class="text-sm text-gray-400 mb-1">Temperature Coeff.</div>
                <div class="text-2xl font-bold text-orange-400">{{ currentSpecs.tempCoeffVoc }}%/°C</div>
              </div>
            </div>
            
            <!-- Efficiency Warning -->
            <div v-if="operatingEfficiency < 70" class="mt-4 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
              <p class="text-yellow-300 font-medium">⚡ Operating point far from MPP! Consider using MPPT for optimal power extraction.</p>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Understanding Solar Cell Characteristics
            </h2>
            
            <div class="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 class="font-bold text-white mb-2">I-V Characteristic Curve</h3>
                <p class="text-sm mb-2">Shows the relationship between current (I) and voltage (V) of a solar cell. Key points:</p>
                <ul class="text-xs space-y-1 text-gray-400">
                  <li>• <strong>Isc (Short-circuit current):</strong> Maximum current at V=0</li>
                  <li>• <strong>Voc (Open-circuit voltage):</strong> Maximum voltage at I=0</li>
                  <li>• <strong>MPP (Maximum Power Point):</strong> Optimal operating point (Vmp, Imp)</li>
                  <li>• Current decreases slowly with voltage until near Voc</li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-bold text-white mb-2">P-V Characteristic Curve</h3>
                <p class="text-sm mb-2">Power output vs voltage. Power = V × I, so it peaks at MPP:</p>
                <ul class="text-xs space-y-1 text-gray-400">
                  <li>• Zero power at both short-circuit and open-circuit</li>
                  <li>• Maximum power at MPP (Pmax = Vmp × Imp)</li>
                  <li>• Curve shape indicates cell quality</li>
                  <li>• MPPT controllers track this point dynamically</li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-bold text-white mb-2">Environmental Effects</h3>
                <p class="text-sm mb-2">Solar cell performance varies with conditions:</p>
                <ul class="text-xs space-y-1 text-gray-400">
                  <li>• <strong>Irradiance:</strong> Directly proportional to Isc and Pmax</li>
                  <li>• <strong>Temperature:</strong> Higher temp reduces Voc (≈ -0.3%/°C to -0.5%/°C)</li>
                  <li>• Standard Test Conditions (STC): 1000 W/m², 25°C</li>
                  <li>• Real-world conditions often differ from STC</li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-bold text-white mb-2">Fill Factor (FF)</h3>
                <p class="text-sm mb-2">Quality metric: FF = Pmax / (Voc × Isc)</p>
                <ul class="text-xs space-y-1 text-gray-400">
                  <li>• Higher FF = better cell quality (typically 0.7-0.85)</li>
                  <li>• Affected by series resistance (Rs) and shunt resistance (Rsh)</li>
                  <li>• Good cells have low Rs and high Rsh</li>
                  <li>• Degradation over time reduces FF</li>
                </ul>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-xl">
              <h3 class="font-bold text-white mb-2">Applications & MPP Tracking</h3>
              <p class="text-sm text-gray-300 mb-2">
                Solar cells are rarely operated at a fixed voltage. MPPT (Maximum Power Point Tracking) controllers 
                continuously adjust the operating point to extract maximum power as conditions change.
              </p>
              <div class="grid md:grid-cols-3 gap-2 text-xs">
                <div class="bg-slate-700/50 rounded-lg p-2">
                  <strong class="text-yellow-400">Off-Grid Systems</strong>
                  <p class="text-gray-400 mt-1">Battery charging with PWM or MPPT controllers</p>
                </div>
                <div class="bg-slate-700/50 rounded-lg p-2">
                  <strong class="text-green-400">Grid-Tied</strong>
                  <p class="text-gray-400 mt-1">Inverters with MPPT feed directly to grid</p>
                </div>
                <div class="bg-slate-700/50 rounded-lg p-2">
                  <strong class="text-cyan-400">Solar Water Pumping</strong>
                  <p class="text-gray-400 mt-1">Direct DC motor drives with MPP tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Cell specifications (at STC: 1000 W/m², 25°C)
const cellSpecs = {
  mono: {
    name: 'Monocrystalline Silicon',
    material: 'Single-crystal Si',
    efficiency: 22,
    isc: 9.5,      // Short-circuit current (A)
    voc: 0.72,     // Open-circuit voltage (V)
    vmp: 0.58,     // Voltage at MPP (V)
    imp: 8.9,      // Current at MPP (A)
    tempCoeffIsc: 0.0005,  // %/°C
    tempCoeffVoc: -0.35    // %/°C
  },
  poly: {
    name: 'Polycrystalline Silicon',
    material: 'Multi-crystal Si',
    efficiency: 17,
    isc: 9.0,
    voc: 0.68,
    vmp: 0.54,
    imp: 8.4,
    tempCoeffIsc: 0.0006,
    tempCoeffVoc: -0.38
  },
  thinFilm: {
    name: 'Thin Film (CdTe)',
    material: 'Cadmium Telluride',
    efficiency: 18,
    isc: 8.5,
    voc: 0.84,
    vmp: 0.66,
    imp: 7.8,
    tempCoeffIsc: 0.0004,
    tempCoeffVoc: -0.25
  }
}

// Input values
const cellType = ref('mono')
const irradiance = ref(1000)  // W/m²
const temperature = ref(25)   // °C
const operatingVoltage = ref(0.5)  // V (will scale based on Voc)

// Quick scenarios
const scenarios = {
  'Standard Test Conditions': { irradiance: 1000, temperature: 25, operatingVoltage: 0.58 },
  'Hot Summer Day': { irradiance: 900, temperature: 45, operatingVoltage: 0.52 },
  'Winter Morning': { irradiance: 600, temperature: 10, operatingVoltage: 0.60 },
  'Cloudy Day': { irradiance: 300, temperature: 20, operatingVoltage: 0.55 },
  'Desert High Temp': { irradiance: 1000, temperature: 65, operatingVoltage: 0.48 }
}

const applyScenario = (scenario) => {
  irradiance.value = scenario.irradiance
  temperature.value = scenario.temperature
  // Adjust operating voltage based on expected Voc
  const specs = cellSpecs[cellType.value]
  const tempFactor = 1 + (scenario.temperature - 25) * specs.tempCoeffVoc / 100
  const expectedVoc = specs.voc * tempFactor
  operatingVoltage.value = scenario.operatingVoltage * expectedVoc / specs.voc
}

// Current specs based on selected cell type
const currentSpecs = computed(() => cellSpecs[cellType.value])

// Calculate temperature correction factors
const tempFactorIsc = computed(() => {
  const deltaT = temperature.value - 25
  return 1 + (deltaT * currentSpecs.value.tempCoeffIsc / 100)
})

const tempFactorVoc = computed(() => {
  const deltaT = temperature.value - 25
  return 1 + (deltaT * currentSpecs.value.tempCoeffVoc / 100)
})

// Irradiance factor (linear approximation for current)
const irradianceFactor = computed(() => irradiance.value / 1000)

// Calculate actual parameters under current conditions
const calculatedIsc = computed(() => {
  return currentSpecs.value.isc * irradianceFactor.value * tempFactorIsc.value
})

const calculatedVoc = computed(() => {
  return currentSpecs.value.voc * tempFactorVoc.value
})

const calculatedImp = computed(() => {
  return currentSpecs.value.imp * irradianceFactor.value * tempFactorIsc.value
})

const calculatedVmp = computed(() => {
  return currentSpecs.value.vmp * tempFactorVoc.value
})

const calculatedPmax = computed(() => {
  return calculatedVmp.value * calculatedImp.value
})

const fillFactor = computed(() => {
  const vocIsc = calculatedVoc.value * calculatedIsc.value
  return vocIsc > 0 ? calculatedPmax.value / vocIsc : 0
})

const calculatedEfficiency = computed(() => {
  const inputPower = irradiance.value // Assuming 1 m² cell area
  return inputPower > 0 ? (calculatedPmax.value / inputPower) * 100 : 0
})

// Calculate current at operating point using single-diode model approximation
const calculateCurrent = (voltage) => {
  const Iph = calculatedIsc.value  // Photocurrent
  const I0 = calculatedIsc.value * 1e-10  // Reverse saturation current (simplified)
  const Vt = 0.0257 * (273.15 + temperature.value) / 298.15  // Thermal voltage
  const n = 1.5  // Ideality factor
  const Rs = 0.005  // Series resistance
  const Rsh = 100  // Shunt resistance
  
  // Single-diode equation (simplified)
  const I = Iph - I0 * (Math.exp(voltage / (n * Vt)) - 1) - voltage / Rsh
  return Math.max(0, I)
}

const currentAtOperatingPoint = computed(() => {
  return calculateCurrent(operatingVoltage.value)
})

const currentPower = computed(() => {
  return operatingVoltage.value * currentAtOperatingPoint.value
})

const operatingEfficiency = computed(() => {
  return calculatedPmax.value > 0 ? (currentPower.value / calculatedPmax.value) * 100 : 0
})

const operatingEfficiencyColor = computed(() => {
  const eff = operatingEfficiency.value
  if (eff >= 90) return 'text-green-400'
  if (eff >= 70) return 'text-yellow-400'
  return 'text-red-400'
})

// Update operating voltage range based on cell type
watch([cellType, temperature], () => {
  const maxV = calculatedVoc.value
  if (operatingVoltage.value > maxV) {
    operatingVoltage.value = maxV * 0.8
  }
})

// I-V Curve path
const ivCurvePath = computed(() => {
  const voc = calculatedVoc.value
  const isc = calculatedIsc.value
  const points = []
  
  // Generate points from V=0 to V=Voc
  for (let i = 0; i <= 100; i++) {
    const v = (i / 100) * voc
    const current = calculateCurrent(v)
    
    // Map to SVG coordinates
    const x = 60 + (v / voc) * 410
    const y = 300 - (current / isc) * 260
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

// P-V Curve path
const pvCurvePath = computed(() => {
  const voc = calculatedVoc.value
  const pmax = calculatedPmax.value
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    const v = (i / 100) * voc
    const current = calculateCurrent(v)
    const power = v * current
    
    const x = 60 + (v / voc) * 410
    const y = 300 - (pmax > 0 ? (power / pmax) * 260 : 0)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

const pvCurveFill = computed(() => {
  const basePath = pvCurvePath.value
  return basePath + ' L 470 300 L 60 300 Z'
})

// MPP coordinates
const mppX = computed(() => {
  const voc = calculatedVoc.value
  const vmp = calculatedVmp.value
  return 60 + (vmp / voc) * 410
})

const mppY = computed(() => {
  const isc = calculatedIsc.value
  const imp = calculatedImp.value
  return 300 - (imp / isc) * 260
})

const mppX_PV = computed(() => mppX.value)

const mppY_PV = computed(() => {
  const pmax = calculatedPmax.value
  return 300 - (pmax / pmax) * 260
})

// Operating point coordinates
const opX = computed(() => {
  const voc = calculatedVoc.value
  return 60 + (operatingVoltage.value / voc) * 410
})

const opY = computed(() => {
  const isc = calculatedIsc.value
  const current = currentAtOperatingPoint.value
  return 300 - (current / isc) * 260
})

const opX_PV = computed(() => opX.value)

const opY_PV = computed(() => {
  const pmax = calculatedPmax.value
  const power = currentPower.value
  return 300 - (pmax > 0 ? (power / pmax) * 260 : 0)
})
</script>

<style scoped>
/* Custom slider styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
}

input[type="range"]::-moz-range-track {
  height: 8px;
  border-radius: 4px;
}

/* Smooth transitions */
button, input {
  transition: all 0.2s ease;
}

/* Grid pattern for curves */
:deep(#solarGrid) {
  opacity: 0.5;
}
</style>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Series-Parallel Circuit Analysis
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore how current and voltage behave in combined series-parallel circuits
          </p>
          
          <!-- Key Formulas -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm font-mono space-y-1">
              <div><span class="text-blue-600">Series:</span> R_total = R1 + R2 + ...</div>
              <div><span class="text-green-600">Parallel:</span> 1/R_total = 1/R1 + 1/R2 + ...</div>
              <div><span class="text-purple-600">Ohm's Law:</span> V = I × R</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Interactive Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Interactive Series-Parallel Circuit
          </h3>
          
          <!-- Circuit Diagram SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 800 500" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Background -->
              <rect width="800" height="500" fill="transparent"/>
              
              <!-- Main circuit wires with current animation -->
              <g>
                <!-- Battery to R1 (series section) -->
                <path d="M 100 250 L 200 250" stroke="#6B7280" stroke-width="4" fill="none"/>
                
                <!-- Through R1 (series resistor) -->
                <path d="M 200 250 L 200 150 L 300 150" stroke="#3B82F6" stroke-width="4" fill="none" class="animate-pulse"/>
                
                <!-- Split to parallel branch -->
                <path d="M 300 150 L 400 150 L 400 100 L 550 100" stroke="#10B981" stroke-width="4" fill="none"/>
                <path d="M 300 150 L 400 150 L 400 350 L 550 350" stroke="#F59E0B" stroke-width="4" fill="none"/>
                
                <!-- Through R2 (top parallel) -->
                <path d="M 550 100 L 650 100 L 650 150 L 700 150" stroke="#10B981" stroke-width="4" fill="none"/>
                
                <!-- Through R3 (bottom parallel) -->
                <path d="M 550 350 L 650 350 L 650 250 L 700 250" stroke="#F59E0B" stroke-width="4" fill="none"/>
                
                <!-- Return path -->
                <path d="M 700 150 L 700 250" stroke="#6B7280" stroke-width="4" fill="none"/>
                <path d="M 700 250 L 100 250" stroke="#EF4444" stroke-width="4" fill="none"/>
              </g>
              
              <!-- Voltage Source -->
              <g>
                <rect x="50" y="220" width="50" height="60" fill="white" stroke="#EF4444" stroke-width="3" rx="5"/>
                <text x="75" y="245" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">{{ voltage }}V</text>
                <text x="75" y="265" text-anchor="middle" font-size="11" fill="#666">DC</text>
                <text x="60" y="210" font-size="16" fill="#22c55e" font-weight="bold">+</text>
                <text x="60" y="290" font-size="16" fill="#ef4444" font-weight="bold">−</text>
              </g>
              
              <!-- R1 - Series Resistor -->
              <g>
                <rect x="220" y="130" width="60" height="40" fill="white" stroke="#3B82F6" stroke-width="3" rx="5"/>
                <text x="250" y="155" text-anchor="middle" font-size="13" font-weight="bold" fill="#3B82F6">R1</text>
                <text x="250" y="185" text-anchor="middle" font-size="12" fill="#3B82F6">{{ r1 }}Ω</text>
                <text x="250" y="115" text-anchor="middle" font-size="10" fill="#3B82F6">{{ currentR1.toFixed(2) }}A</text>
              </g>
              
              <!-- R2 - Top Parallel Resistor -->
              <g>
                <rect x="550" y="80" width="60" height="40" fill="white" stroke="#10B981" stroke-width="3" rx="5"/>
                <text x="580" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#10B981">R2</text>
                <text x="580" y="135" text-anchor="middle" font-size="12" fill="#10B981">{{ r2 }}Ω</text>
                <text x="630" y="95" text-anchor="middle" font-size="10" fill="#10B981">{{ currentR2.toFixed(2) }}A</text>
              </g>
              
              <!-- R3 - Bottom Parallel Resistor -->
              <g>
                <rect x="550" y="330" width="60" height="40" fill="white" stroke="#F59E0B" stroke-width="3" rx="5"/>
                <text x="580" y="355" text-anchor="middle" font-size="13" font-weight="bold" fill="#F59E0B">R3</text>
                <text x="580" y="385" text-anchor="middle" font-size="12" fill="#F59E0B">{{ r3 }}Ω</text>
                <text x="630" y="345" text-anchor="middle" font-size="10" fill="#F59E0B">{{ currentR3.toFixed(2) }}A</text>
              </g>
              
              <!-- Junction labels -->
              <text x="300" y="130" text-anchor="middle" font-size="11" fill="#666" font-weight="bold">Junction A</text>
              <text x="720" y="180" text-anchor="middle" font-size="11" fill="#666" font-weight="bold">Junction B</text>
              
              <!-- Current flow arrows -->
              <g v-if="showCurrent">
                <!-- Total current from source -->
                <polygon points="180,245 190,250 180,255" fill="#EF4444"/>
                <text x="170" y="270" font-size="11" fill="#EF4444" font-weight="bold">I_total = {{ totalCurrent.toFixed(2) }}A</text>
                
                <!-- Current through R1 -->
                <polygon points="280,145 290,150 280,155" fill="#3B82F6"/>
                
                <!-- Current splitting -->
                <polygon points="450,95 460,100 450,105" fill="#10B981"/>
                <polygon points="450,345 460,350 450,355" fill="#F59E0B"/>
              </g>
            </svg>
          </div>
          
          <!-- Control Panel -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Voltage Control -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Voltage Source: {{ voltage }}V
              </label>
              <input type="range" v-model.number="voltage" min="1" max="48" step="1" 
                class="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1V</span>
                <span>48V</span>
              </div>
            </div>
            
            <!-- R1 Control (Series) -->
            <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                R1 (Series): {{ r1 }}Ω
              </label>
              <input type="range" v-model.number="r1" min="10" max="1000" step="10" 
                class="w-full h-2 bg-blue-300 dark:bg-blue-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-blue-600 dark:text-blue-400 mt-1">
                <span>10Ω</span>
                <span>1kΩ</span>
              </div>
            </div>
            
            <!-- R2 Control (Parallel Top) -->
            <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                R2 (Parallel): {{ r2 }}Ω
              </label>
              <input type="range" v-model.number="r2" min="10" max="1000" step="10" 
                class="w-full h-2 bg-green-300 dark:bg-green-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-green-600 dark:text-green-400 mt-1">
                <span>10Ω</span>
                <span>1kΩ</span>
              </div>
            </div>
            
            <!-- R3 Control (Parallel Bottom) -->
            <div class="bg-amber-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">
                R3 (Parallel): {{ r3 }}Ω
              </label>
              <input type="range" v-model.number="r3" min="10" max="1000" step="10" 
                class="w-full h-2 bg-amber-300 dark:bg-amber-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-amber-600 dark:text-amber-400 mt-1">
                <span>10Ω</span>
                <span>1kΩ</span>
              </div>
            </div>
            
            <!-- Show Current Toggle -->
            <div class="bg-purple-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <span class="text-sm font-semibold text-purple-700 dark:text-purple-300">Show Current Flow</span>
              <button @click="showCurrent = !showCurrent" 
                class="px-4 py-2 rounded-lg font-semibold transition-all"
                :class="showCurrent ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'">
                {{ showCurrent ? 'ON' : 'OFF' }}
              </button>
            </div>
            
            <!-- Animate Toggle -->
            <div class="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
              <span class="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Animate</span>
              <button @click="animate = !animate" 
                class="px-4 py-2 rounded-lg font-semibold transition-all"
                :class="animate ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300'">
                {{ animate ? 'ON' : 'OFF' }}
              </button>
            </div>
          </div>
          
          <!-- Results Panel -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Circuit Analysis Results</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <!-- Total Resistance -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Resistance</div>
                <div class="text-3xl font-bold text-blue-600">{{ totalResistance.toFixed(2) }}Ω</div>
              </div>
              
              <!-- Total Current -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Current</div>
                <div class="text-3xl font-bold text-red-600">{{ totalCurrent.toFixed(2) }}A</div>
              </div>
              
              <!-- Total Power -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Power</div>
                <div class="text-3xl font-bold text-purple-600">{{ totalPower.toFixed(2) }}W</div>
              </div>
            </div>
            
            <!-- Individual Component Values -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- R1 Values -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-blue-600 mb-2">R1 (Series Resistor)</div>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Current:</span>
                    <span class="font-bold text-blue-600">{{ currentR1.toFixed(2) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Voltage:</span>
                    <span class="font-bold text-blue-600">{{ voltageR1.toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Power:</span>
                    <span class="font-bold text-blue-600">{{ powerR1.toFixed(2) }}W</span>
                  </div>
                </div>
              </div>
              
              <!-- R2 Values -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-green-600 mb-2">R2 (Parallel Top)</div>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Current:</span>
                    <span class="font-bold text-green-600">{{ currentR2.toFixed(2) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Voltage:</span>
                    <span class="font-bold text-green-600">{{ voltageR2.toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Power:</span>
                    <span class="font-bold text-green-600">{{ powerR2.toFixed(2) }}W</span>
                  </div>
                </div>
              </div>
              
              <!-- R3 Values -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-amber-600 mb-2">R3 (Parallel Bottom)</div>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Current:</span>
                    <span class="font-bold text-amber-600">{{ currentR3.toFixed(2) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Voltage:</span>
                    <span class="font-bold text-amber-600">{{ voltageR3.toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Power:</span>
                    <span class="font-bold text-amber-600">{{ powerR3.toFixed(2) }}W</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Parallel Branch Info -->
            <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-3">
              <div class="text-xs font-semibold text-purple-600 mb-2">Parallel Branch (R2 || R3)</div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">R_parallel:</span>
                  <span class="font-bold text-purple-600">{{ parallelResistance.toFixed(2) }}Ω</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">V_parallel:</span>
                  <span class="font-bold text-purple-600">{{ parallelVoltage.toFixed(2) }}V</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">I_parallel:</span>
                  <span class="font-bold text-purple-600">{{ parallelCurrent.toFixed(2) }}A</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">P_parallel:</span>
                  <span class="font-bold text-purple-600">{{ parallelPower.toFixed(2) }}W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Series-Parallel Circuits</h3>
          
          <div class="space-y-6">
            <!-- What is Series-Parallel -->
            <div>
              <h4 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">What is a Series-Parallel Circuit?</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                A series-parallel circuit combines both series and parallel connections. In this circuit, R1 is connected 
                in series with a parallel combination of R2 and R3. This configuration is common in real-world applications 
                like audio systems, power distribution, and electronic circuits.
              </p>
            </div>
            
            <!-- Key Principles -->
            <div>
              <h4 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">Key Principles</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-blue-700 dark:text-blue-300 mb-2">Series Section (R1)</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Same current flows through R1 as the total current</li>
                    <li>• Voltage drops across R1 based on V = I × R</li>
                    <li>• Power dissipation: P = I² × R</li>
                  </ul>
                </div>
                <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-green-700 dark:text-green-300 mb-2">Parallel Section (R2 || R3)</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Same voltage across both R2 and R3</li>
                    <li>• Current divides based on resistance values</li>
                    <li>• Total parallel resistance: 1/Rp = 1/R2 + 1/R3</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Formulas -->
            <div>
              <h4 class="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">Formulas Used</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span class="text-blue-600">Parallel Resistance:</span> R_p = (R2 × R3) / (R2 + R3)</div>
                <div><span class="text-purple-600">Total Resistance:</span> R_total = R1 + R_p</div>
                <div><span class="text-red-600">Total Current:</span> I_total = V / R_total</div>
                <div><span class="text-green-600">Parallel Voltage:</span> V_p = I_total × R_p</div>
                <div><span class="text-amber-600">Current through R2:</span> I_R2 = V_p / R2</div>
                <div><span class="text-amber-600">Current through R3:</span> I_R3 = V_p / R3</div>
                <div><span class="text-indigo-600">Power:</span> P = V × I = I² × R = V² / R</div>
              </div>
            </div>
            
            <!-- Applications -->
            <div>
              <h4 class="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">Real-World Applications</h4>
              <ul class="text-gray-700 dark:text-gray-300 space-y-2">
                <li class="flex items-start">
                  <span class="text-2xl mr-2">🔊</span>
                  <span><strong>Audio Systems:</strong> Speakers connected in series-parallel for impedance matching</span>
                </li>
                <li class="flex items-start">
                  <span class="text-2xl mr-2">🏠</span>
                  <span><strong>Home Wiring:</strong> Lights and appliances on different circuits</span>
                </li>
                <li class="flex items-start">
                  <span class="text-2xl mr-2">🔋</span>
                  <span><strong>Battery Banks:</strong> Cells arranged for voltage and current requirements</span>
                </li>
                <li class="flex items-start">
                  <span class="text-2xl mr-2">📱</span>
                  <span><strong>Electronic Devices:</strong> Complex circuits with multiple loads</span>
                </li>
              </ul>
            </div>
            
            <!-- Current Division Rule -->
            <div class="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">💡 Current Division Rule</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                In parallel circuits, current divides inversely proportional to resistance. The branch with lower resistance 
                gets more current. Here: I_R2 : I_R3 = R3 : R2
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 py-8 mt-12">
      <div class="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>Interactive Series-Parallel Circuit Analysis | Learn Electronics Through Visualization</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const voltage = ref(12)
const r1 = ref(100)
const r2 = ref(220)
const r3 = ref(330)
const showCurrent = ref(true)
const animate = ref(true)

// Calculate parallel resistance (R2 || R3)
const parallelResistance = computed(() => {
  return (r2.value * r3.value) / (r2.value + r3.value)
})

// Total resistance (R1 + parallel)
const totalResistance = computed(() => {
  return r1.value + parallelResistance.value
})

// Total current from source
const totalCurrent = computed(() => {
  return voltage.value / totalResistance.value
})

// Current through R1 (same as total current - series)
const currentR1 = computed(() => {
  return totalCurrent.value
})

// Voltage across R1
const voltageR1 = computed(() => {
  return currentR1.value * r1.value
})

// Voltage across parallel section
const parallelVoltage = computed(() => {
  return voltage.value - voltageR1.value
})

// Current through R2
const currentR2 = computed(() => {
  return parallelVoltage.value / r2.value
})

// Current through R3
const currentR3 = computed(() => {
  return parallelVoltage.value / r3.value
})

// Parallel current (sum of R2 and R3)
const parallelCurrent = computed(() => {
  return currentR2.value + currentR3.value
})

// Power calculations
const powerR1 = computed(() => {
  return currentR1.value * currentR1.value * r1.value
})

const powerR2 = computed(() => {
  return currentR2.value * currentR2.value * r2.value
})

const powerR3 = computed(() => {
  return currentR3.value * currentR3.value * r3.value
})

const parallelPower = computed(() => {
  return powerR2.value + powerR3.value
})

const totalPower = computed(() => {
  return voltage.value * totalCurrent.value
})

// Voltage across individual parallel resistors
const voltageR2 = computed(() => {
  return parallelVoltage.value
})

const voltageR3 = computed(() => {
  return parallelVoltage.value
})

// SEO Meta
useHead({
  title: 'Series-Parallel Circuit Analysis - Interactive Simulation',
  meta: [
    { name: 'description', content: 'Learn about series-parallel circuits with interactive visualization. See how current and voltage behave in combined circuits.' }
  ]
})
</script>

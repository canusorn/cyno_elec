<script setup lang="ts">
import { ref, computed } from 'vue'

// Input parameters
const realPower = ref(100) // kW
const currentPF = ref(0.75) // Current power factor (lagging)
const targetPF = ref(0.95) // Target power factor
const systemVoltage = ref(400) // Volts (line-to-line)
const systemFrequency = ref(50) // Hz
const electricityCost = ref(0.15) // Currency per kWh

// Calculations
const currentAngle = computed(() => Math.acos(currentPF.value))
const targetAngle = computed(() => Math.acos(targetPF.value))

// Reactive power before correction (kVAR)
const currentReactivePower = computed(() => {
  return realPower.value * Math.tan(currentAngle.value)
})

// Reactive power after correction (kVAR)
const targetReactivePower = computed(() => {
  return realPower.value * Math.tan(targetAngle.value)
})

// Required capacitor reactive power (kVAR)
const requiredKVAR = computed(() => {
  return currentReactivePower.value - targetReactivePower.value
})

// Calculate required capacitance
const requiredCapacitance = computed(() => {
  const XL = (systemVoltage.value * systemVoltage.value) / (requiredKVAR.value * 1000)
  const Xc = XL / (2 * Math.PI * systemFrequency.value)
  const C = 1 / (2 * Math.PI * systemFrequency.value * Xc)
  return C * 1000000 // Convert to microfarads
})

// Line current before correction
const currentBefore = computed(() => {
  const apparentPower = realPower.value / currentPF.value
  return (apparentPower * 1000) / (Math.sqrt(3) * systemVoltage.value)
})

// Line current after correction
const currentAfter = computed(() => {
  const apparentPower = realPower.value / targetPF.value
  return (apparentPower * 1000) / (Math.sqrt(3) * systemVoltage.value)
})

// Current reduction
const currentReduction = computed(() => {
  return currentBefore.value - currentAfter.value
})

const currentReductionPercentage = computed(() => {
  return (currentReduction.value / currentBefore.value) * 100
})

// Apparent power before and after
const apparentPowerBefore = computed(() => {
  return realPower.value / currentPF.value
})

const apparentPowerAfter = computed(() => {
  return realPower.value / targetPF.value
})

// Calculate savings (assumed 10% penalty for poor PF)
const penaltyRate = 0.10 // 10% penalty
const penaltyBefore = computed(() => {
  if (currentPF.value >= 0.9) return 0
  return realPower.value * 1000 * electricityCost.value * (penaltyRate * (0.9 - currentPF.value))
})

const penaltyAfter = computed(() => {
  if (targetPF.value >= 0.9) return 0
  return realPower.value * 1000 * electricityCost.value * (penaltyRate * (0.9 - targetPF.value))
})

const monthlySavings = computed(() => {
  const hoursPerMonth = 730 // ~24 hours × 30.4 days
  return (penaltyBefore.value - penaltyAfter.value) * hoursPerMonth
})

const yearlySavings = computed(() => monthlySavings.value * 12)

// Status indicators
const getImprovementStatus = () => {
  const improvement = targetPF.value - currentPF.value
  if (improvement > 0.15) return { text: 'Significant', color: 'text-green-400' }
  if (improvement > 0.10) return { text: 'Moderate', color: 'text-yellow-400' }
  return { text: 'Minor', color: 'text-orange-400' }
}

const improvementStatus = computed(getImprovementStatus)

// SVG calculations for power triangle
const triangleSize = 250
const scaleP = (realPower.value / 200) * triangleSize
const scaleQ1 = (currentReactivePower.value / 150) * triangleSize
const scaleQ2 = (targetReactivePower.value / 150) * triangleSize
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-6">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          AC Power Factor Correction Calculator
        </h1>
        <p class="text-gray-400">Calculate capacitor sizing for power factor improvement</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Input Panel -->
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-4 text-yellow-400">⚙️ System Parameters</h2>
          
          <!-- Real Power -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Real Power (Load)</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="realPower" 
                type="range" 
                min="10" 
                max="500" 
                step="5"
                class="flex-1 accent-yellow-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">{{ realPower }} kW</span>
            </div>
          </div>

          <!-- Current Power Factor -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Current Power Factor</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="currentPF" 
                type="range" 
                min="0.5" 
                max="0.95" 
                step="0.01"
                class="flex-1 accent-red-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">{{ currentPF.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-red-400 mt-1">⚠️ Lagging (inductive load)</p>
          </div>

          <!-- Target Power Factor -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Target Power Factor</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="targetPF" 
                type="range" 
                min="0.85" 
                max="0.99" 
                step="0.01"
                class="flex-1 accent-green-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">{{ targetPF.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-green-400 mt-1">✅ Desired corrected value</p>
          </div>

          <!-- System Voltage -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">System Voltage (VLL)</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="systemVoltage" 
                type="range" 
                min="208" 
                max="480" 
                step="1"
                class="flex-1 accent-blue-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">{{ systemVoltage }}V</span>
            </div>
          </div>

          <!-- System Frequency -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">System Frequency</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="systemFrequency" 
                type="range" 
                min="50" 
                max="60" 
                step="1"
                class="flex-1 accent-blue-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">{{ systemFrequency }}Hz</span>
            </div>
          </div>

          <!-- Electricity Cost -->
          <div class="mb-4">
            <label class="block text-sm text-gray-300 mb-1">Electricity Cost</label>
            <div class="flex items-center gap-2">
              <input 
                v-model.number="electricityCost" 
                type="range" 
                min="0.05" 
                max="0.50" 
                step="0.01"
                class="flex-1 accent-purple-500"
              >
              <span class="bg-gray-700 px-3 py-1 rounded text-sm min-w-[100px] text-center">${{ electricityCost }}/kWh</span>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="border-t border-gray-600 pt-4">
            <h3 class="text-sm font-semibold mb-2 text-gray-400">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button 
                @click="currentPF = 0.70; targetPF = 0.95"
                class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-xs transition-all"
              >
                Heavy Industrial
                <br><span class="text-gray-400">0.70 → 0.95</span>
              </button>
              <button 
                @click="currentPF = 0.80; targetPF = 0.95"
                class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-xs transition-all"
              >
                Light Industrial
                <br><span class="text-gray-400">0.80 → 0.95</span>
              </button>
              <button 
                @click="currentPF = 0.85; targetPF = 0.95"
                class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-xs transition-all"
              >
                Commercial
                <br><span class="text-gray-400">0.85 → 0.95</span>
              </button>
              <button 
                @click="currentPF = 0.60; targetPF = 0.92"
                class="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-xs transition-all"
              >
                Very Poor
                <br><span class="text-gray-400">0.60 → 0.92</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Main Results -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📊 Correction Results</h2>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-purple-600/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
                <div class="text-sm text-gray-400 mb-1">Required kVAR</div>
                <div class="text-3xl font-bold text-purple-400">{{ requiredKVAR.toFixed(1) }}</div>
                <div class="text-xs text-gray-500">kVAR (reactive)</div>
              </div>

              <div class="bg-gradient-to-br from-blue-600/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/30">
                <div class="text-sm text-gray-400 mb-1">Capacitance</div>
                <div class="text-3xl font-bold text-blue-400">{{ requiredCapacitance.toFixed(1) }}</div>
                <div class="text-xs text-gray-500">microfarads (µF)</div>
              </div>

              <div class="bg-gradient-to-br from-green-600/30 to-green-800/30 rounded-lg p-4 border border-green-500/30">
                <div class="text-sm text-gray-400 mb-1">Current Reduction</div>
                <div class="text-3xl font-bold text-green-400">{{ currentReduction.toFixed(1) }}A</div>
                <div class="text-xs text-gray-500">{{ currentReductionPercentage.toFixed(1) }}% less</div>
              </div>

              <div class="bg-gradient-to-br from-yellow-600/30 to-yellow-800/30 rounded-lg p-4 border border-yellow-500/30">
                <div class="text-sm text-gray-400 mb-1">Improvement</div>
                <div class="text-3xl font-bold text-yellow-400" :class="improvementStatus.color">
                  {{ improvementStatus.text }}
                </div>
                <div class="text-xs text-gray-500">{{ (targetPF - currentPF).toFixed(2) }} PF gain</div>
              </div>
            </div>
          </div>

          <!-- Power Triangle Visualization -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📐 Power Triangle Visualization</h2>
            <div class="flex justify-center">
              <svg width="500" height="300" viewBox="0 0 500 300" class="max-w-full">
                <!-- Grid -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#grid)" opacity="0.3"/>
                
                <!-- Origin -->
                <g transform="translate(50, 250)">
                  
                  <!-- BEFORE CORRECTION (larger triangle) -->
                  <g opacity="0.6">
                    <!-- Real power (P) - horizontal -->
                    <line x1="0" y1="0" :x2="scaleP * 1.5" y2="0" stroke="#22C55E" stroke-width="3" stroke-dasharray="5,5"/>
                    
                    <!-- Reactive power (Q1) - vertical before -->
                    <line x1="0" y1="0" x2="0" y2="-scaleQ1 * 1.5" stroke="#A855F7" stroke-width="3" stroke-dasharray="5,5"/>
                    
                    <!-- Apparent power (S1) - hypotenuse before -->
                    <line x1="0" y1="0" :x2="scaleP * 1.5" :y2="-scaleQ1 * 1.5" stroke="#EF4444" stroke-width="3" stroke-dasharray="5,5"/>
                    
                    <!-- Angle theta1 -->
                    <path :d="`M 40 0 A 40 40 0 0 0 ${40 * Math.cos(-currentAngle)} ${40 * Math.sin(-currentAngle)}`" 
                          fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="3,3"/>
                  </g>
                  
                  <!-- AFTER CORRECTION (smaller triangle - solid) -->
                  <!-- Real power (P) - same horizontal -->
                  <line x1="0" y1="0" :x2="scaleP * 1.5" y2="0" stroke="#22C55E" stroke-width="4"/>
                  
                  <!-- Reactive power (Q2) - vertical after -->
                  <line x1="0" y1="0" x2="0" :y2="-scaleQ2 * 1.5" stroke="#A855F7" stroke-width="4"/>
                  
                  <!-- Apparent power (S2) - hypotenuse after -->
                  <line x1="0" y1="0" :x2="scaleP * 1.5" :y2="-scaleQ2 * 1.5" stroke="#3B82F6" stroke-width="4"/>
                  
                  <!-- Angle theta2 -->
                  <path :d="`M 40 0 A 40 40 0 0 0 ${40 * Math.cos(-targetAngle)} ${40 * Math.sin(-targetAngle)}`" 
                        fill="none" stroke="#3B82F6" stroke-width="2"/>
                  
                  <!-- Compensation arrow -->
                  <g v-if="requiredKVAR > 0">
                    <line x1="0" :y1="-scaleQ2 * 1.5" x2="0" :y2="-scaleQ1 * 1.5" 
                          stroke="#FBBF24" stroke-width="4" marker-end="url(#arrowhead)"/>
                    <text :x="-15" :y="-(scaleQ1 + scaleQ2) * 0.75" fill="#FBBF24" font-size="12" font-weight="bold">
                      -{{ requiredKVAR.toFixed(1) }} kVAR
                    </text>
                  </g>
                  
                  <!-- Labels -->
                  <text :x="scaleP * 0.75" y="20" fill="#22C55E" font-size="12" font-weight="bold" text-anchor="middle">
                    P = {{ realPower }} kW
                  </text>
                  
                  <text x="-10" :y="-scaleQ2 * 0.75" fill="#A855F7" font-size="12" font-weight="bold" text-anchor="end">
                    Q₂ = {{ targetReactivePower.toFixed(1) }} kVAR
                  </text>
                  
                  <text :x="scaleP * 0.6" :y="-scaleQ2 * 0.6 - 5" fill="#3B82F6" font-size="12" font-weight="bold">
                    S₂ = {{ apparentPowerAfter.toFixed(1) }} kVA
                  </text>
                  
                  <text :x="scaleP * 0.6" :y="-scaleQ1 * 0.6 + 15" fill="#EF4444" font-size="11" font-weight="bold">
                    S₁ = {{ apparentPowerBefore.toFixed(1) }} kVA
                  </text>
                  
                  <!-- Angle labels -->
                  <text x="50" y="-10" fill="#EF4444" font-size="10">
                    θ₁ = {{ (currentAngle * 180 / Math.PI).toFixed(1) }}°
                  </text>
                  <text x="50" y="-25" fill="#3B82F6" font-size="10">
                    θ₂ = {{ (targetAngle * 180 / Math.PI).toFixed(1) }}°
                  </text>
                </g>
                
                <!-- Arrow marker -->
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#FBBF24"/>
                  </marker>
                </defs>
                
                <!-- Legend -->
                <g transform="translate(350, 30)">
                  <rect x="0" y="0" width="130" height="90" fill="#1F2937" stroke="#374151" rx="5"/>
                  <line x1="10" y1="15" x2="30" y2="15" stroke="#22C55E" stroke-width="3"/>
                  <text x="35" y="18" fill="#9CA3AF" font-size="10">Real Power (P)</text>
                  
                  <line x1="10" y1="35" x2="30" y2="35" stroke="#A855F7" stroke-width="3"/>
                  <text x="35" y="38" fill="#9CA3AF" font-size="10">Reactive (Q)</text>
                  
                  <line x1="10" y1="55" x2="30" y2="55" stroke="#3B82F6" stroke-width="3"/>
                  <text x="35" y="58" fill="#9CA3AF" font-size="10">Apparent (S)</text>
                  
                  <line x1="10" y1="75" x2="30" y2="75" stroke="#FBBF24" stroke-width="3"/>
                  <text x="35" y="78" fill="#9CA3AF" font-size="10">Compensation</text>
                </g>
              </svg>
            </div>
            <p class="text-xs text-gray-500 mt-2 text-center">
              <span class="text-red-400">Dashed = Before</span> | 
              <span class="text-blue-400">Solid = After</span> | 
              <span class="text-yellow-400">Arrow = Capacitor compensation needed</span>
            </p>
          </div>

          <!-- Detailed Analysis -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Current Analysis -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold mb-4 text-red-400">❌ Before Correction</h3>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Apparent Power</span>
                  <span class="font-bold text-red-400">{{ apparentPowerBefore.toFixed(2) }} kVA</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Real Power</span>
                  <span class="font-bold text-green-400">{{ realPower }} kW</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Reactive Power</span>
                  <span class="font-bold text-purple-400">{{ currentReactivePower.toFixed(2) }} kVAR</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Line Current</span>
                  <span class="font-bold text-yellow-400">{{ currentBefore.toFixed(2) }} A</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Power Factor Angle</span>
                  <span class="font-bold text-blue-400">{{ (currentAngle * 180 / Math.PI).toFixed(1) }}°</span>
                </div>
                
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-400">Penalty Cost</span>
                  <span class="font-bold text-red-400">${{ penaltyBefore.toFixed(2) }}/hr</span>
                </div>
              </div>
            </div>

            <!-- Target Analysis -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold mb-4 text-green-400">✅ After Correction</h3>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Apparent Power</span>
                  <span class="font-bold text-blue-400">{{ apparentPowerAfter.toFixed(2) }} kVA</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Real Power</span>
                  <span class="font-bold text-green-400">{{ realPower }} kW</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Reactive Power</span>
                  <span class="font-bold text-purple-400">{{ targetReactivePower.toFixed(2) }} kVAR</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Line Current</span>
                  <span class="font-bold text-green-400">{{ currentAfter.toFixed(2) }} A</span>
                </div>
                
                <div class="flex justify-between items-center py-2 border-b border-gray-700">
                  <span class="text-gray-400">Power Factor Angle</span>
                  <span class="font-bold text-blue-400">{{ (targetAngle * 180 / Math.PI).toFixed(1) }}°</span>
                </div>
                
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-400">Penalty Cost</span>
                  <span class="font-bold text-green-400">${{ penaltyAfter.toFixed(2) }}/hr</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Cost Savings -->
          <div class="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30">
            <h2 class="text-xl font-semibold mb-4 text-green-400">💰 Estimated Savings</h2>
            
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-sm text-gray-400 mb-1">Monthly Savings</div>
                <div class="text-3xl font-bold text-green-400">${{ monthlySavings.toFixed(2) }}</div>
              </div>
              
              <div class="text-center">
                <div class="text-sm text-gray-400 mb-1">Yearly Savings</div>
                <div class="text-3xl font-bold text-green-400">${{ yearlySavings.toFixed(2) }}</div>
              </div>
              
              <div class="text-center">
                <div class="text-sm text-gray-400 mb-1">5-Year Savings</div>
                <div class="text-3xl font-bold text-green-400">${{ (yearlySavings * 5).toFixed(2) }}</div>
              </div>
            </div>
            
            <p class="text-xs text-gray-500 mt-3 text-center">
              * Based on 10% penalty for PF below 0.90 and 24/7 operation
            </p>
          </div>

          <!-- Educational Content -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-semibold mb-4 text-yellow-400">📚 Power Factor Correction Guide</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 class="font-semibold text-green-400 mb-2">What is Power Factor?</h3>
                <p class="text-gray-300 mb-3">
                  Power factor is the ratio of real power (P) to apparent power (S). It represents how effectively electrical power is being used. PF = cos(θ) where θ is the phase angle between voltage and current.
                </p>
                
                <h3 class="font-semibold text-green-400 mb-2">Why Correct Power Factor?</h3>
                <ul class="text-gray-300 space-y-1 ml-4">
                  <li>• Reduce utility penalties</li>
                  <li>• Increase system capacity</li>
                  <li>• Reduce I²R losses in conductors</li>
                  <li>• Improve voltage regulation</li>
                  <li>• Lower energy bills</li>
                </ul>
              </div>
              
              <div>
                <h3 class="font-semibold text-green-400 mb-2">How Correction Works</h3>
                <p class="text-gray-300 mb-3">
                  Capacitors supply reactive power (kVAR) locally, reducing the amount of reactive power drawn from the utility. This reduces the phase angle and increases power factor.
                </p>
                
                <h3 class="font-semibold text-green-400 mb-2">Key Formulas</h3>
                <ul class="text-gray-300 space-y-1 ml-4 font-mono text-xs">
                  <li>• S = √(P² + Q²)</li>
                  <li>• PF = P/S = cos(θ)</li>
                  <li>• Q_required = P × (tan θ₁ - tan θ₂)</li>
                  <li>• C = Q / (2πf × V²)</li>
                </ul>
              </div>
            </div>
            
            <div class="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <h3 class="font-semibold text-yellow-400 mb-1">⚠️ Important Considerations</h3>
              <ul class="text-gray-300 text-xs space-y-1">
                <li>• Never over-correct (PF > 1 can cause voltage rise)</li>
                <li>• Consider harmonics when installing capacitors</li>
                <li>• Use automatic switching for variable loads</li>
                <li>• Consult a licensed electrician for installation</li>
                <li>• Ensure proper sizing of protection devices</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

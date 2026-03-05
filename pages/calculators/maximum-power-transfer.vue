<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ Maximum Power Transfer Calculator
        </h1>
        <p class="text-orange-300 text-lg">Find optimal load for maximum power transfer</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Circuit Parameters
          </h2>

          <!-- Source Voltage -->
          <div class="mb-6 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>🔋 Source Voltage (Vₛ)</span>
              <span class="font-mono font-bold">{{ sourceVoltage }}V</span>
            </label>
            <input
              type="range"
              v-model.number="sourceVoltage"
              min="1"
              max="100"
              step="0.5"
              class="w-full h-3 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1V</span>
              <span>100V</span>
            </div>
          </div>

          <!-- Source Resistance -->
          <div class="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>📊 Source Resistance (Rₛ)</span>
              <span class="font-mono font-bold">{{ sourceResistance }}Ω</span>
            </label>
            <input
              type="range"
              v-model.number="sourceResistance"
              min="1"
              max="1000"
              step="1"
              class="w-full h-3 bg-purple-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1kΩ</span>
            </div>
          </div>

          <!-- Load Resistance -->
          <div class="mb-6 p-4 bg-orange-500/20 rounded-xl border border-orange-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>⚡ Load Resistance (Rₗ)</span>
              <span class="font-mono font-bold">{{ loadResistance }}Ω</span>
            </label>
            <input
              type="range"
              v-model.number="loadResistance"
              min="1"
              max="1000"
              step="1"
              class="w-full h-3 bg-orange-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1Ω</span>
              <span>1kΩ</span>
            </div>
            <div class="mt-2 p-2 bg-orange-600/30 rounded-lg text-center">
              <span class="text-orange-200 text-sm">Optimal: {{ sourceResistance }}Ω (Rₗ = Rₛ)</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-3">
            <button
              @click="setOptimalLoad"
              class="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl font-bold transition-all shadow-lg"
            >
              🎯 Set Rₗ = Rₛ (Max Power)
            </button>
            
            <h3 class="text-lg font-bold text-white mt-4">🎯 Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('audio')"
                class="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                🎵 Audio Amp
              </button>
              <button
                @click="loadPreset('battery')"
                class="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                🔋 Battery
              </button>
              <button
                @click="loadPreset('antenna')"
                class="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                📡 Antenna
              </button>
              <button
                @click="loadPreset('solar')"
                class="py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                ☀️ Solar Panel
              </button>
            </div>
          </div>
        </div>

        <!-- Real-time Results -->
        <div class="space-y-6">
          <!-- Key Results -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">📊 Real-time Results</h2>
            
            <!-- Power to Load -->
            <div class="mb-4 p-4 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-xl border border-orange-400/50">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-orange-200 text-sm">Power to Load</p>
                  <p class="text-3xl font-bold text-white">{{ powerLoad.toFixed(3) }}W</p>
                </div>
                <div class="text-right">
                  <p class="text-gray-300 text-xs">Max Possible</p>
                  <p class="text-xl font-mono text-orange-300">{{ maxPower.toFixed(3) }}W</p>
                </div>
              </div>
              <div class="mt-3">
                <div class="w-full bg-gray-700 rounded-full h-3">
                  <div
                    class="h-full bg-gradient-to-r from-orange-600 to-red-500 rounded-full transition-all duration-300"
                    :style="{ width: Math.min(powerPercentage, 100) + '%' }"
                  ></div>
                </div>
                <p class="text-right text-xs text-gray-400 mt-1">{{ powerPercentage.toFixed(1) }} of maximum</p>
              </div>
            </div>

            <!-- Grid of values -->
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/40">
                <p class="text-cyan-300 text-xs">Load Voltage</p>
                <p class="text-xl font-mono text-white">{{ loadVoltage.toFixed(2) }}V</p>
              </div>
              <div class="p-3 bg-green-500/20 rounded-lg border border-green-400/40">
                <p class="text-green-300 text-xs">Load Current</p>
                <p class="text-xl font-mono text-white">{{ loadCurrent.toFixed(3) }}A</p>
              </div>
              <div class="p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/40">
                <p class="text-yellow-300 text-xs">Efficiency (η)</p>
                <p class="text-xl font-mono text-white">{{ efficiency.toFixed(1) }}%</p>
              </div>
              <div class="p-3 bg-pink-500/20 rounded-lg border border-pink-400/40">
                <p class="text-pink-300 text-xs">Source Power</p>
                <p class="text-xl font-mono text-white">{{ powerSource.toFixed(3) }}W</p>
              </div>
            </div>

            <!-- Status Indicator -->
            <div class="mt-4 p-4 rounded-xl text-center" :class="statusClass">
              <p class="text-2xl mb-1">{{ statusIcon }}</p>
              <p class="font-bold">{{ statusText }}</p>
            </div>
          </div>

          <!-- Circuit Diagram -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">📐 Circuit Diagram</h2>
            <div class="bg-slate-900 rounded-xl p-4">
              <svg viewBox="0 0 300 200" class="w-full h-auto">
                <!-- Grid background -->
                <defs>
                  <pattern id="mpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="300" height="200" fill="url(#mpGrid)"/>
                
                <!-- Source voltage circle -->
                <circle cx="50" cy="100" r="20" fill="none" stroke="#06B6D4" stroke-width="3"/>
                <text x="50" y="105" text-anchor="middle" fill="#06B6D4" font-size="14" font-weight="bold">Vₛ</text>
                <text x="50" y="70" text-anchor="middle" fill="#06B6D4" font-size="11">{{ sourceVoltage }}V</text>
                
                <!-- Source resistance -->
                <rect x="100" y="95" width="40" height="10" fill="#A855F7" stroke="#9333EA" stroke-width="2"/>
                <text x="120" y="90" text-anchor="middle" fill="#A855F7" font-size="11" font-weight="bold">Rₛ={{ sourceResistance }}Ω</text>
                
                <!-- Load resistance -->
                <rect x="180" y="95" width="40" height="10" :fill="isOptimal ? '#22C55E' : '#F97316'" stroke="#EA580C" stroke-width="2"/>
                <text x="200" y="90" text-anchor="middle" :fill="isOptimal ? '#22C55E' : '#F97316'" font-size="11" font-weight="bold">Rₗ={{ loadResistance }}Ω</text>
                
                <!-- Wires -->
                <line x1="50" y1="80" x2="50" y2="50" stroke="#64748B" stroke-width="3"/>
                <line x1="50" y1="150" x2="50" y2="120" stroke="#64748B" stroke-width="3"/>
                <line x1="50" y1="50" x2="250" y2="50" stroke="#64748B" stroke-width="3"/>
                <line x1="50" y1="150" x2="250" y2="150" stroke="#64748B" stroke-width="3"/>
                <line x1="250" y1="50" x2="250" y2="95" stroke="#64748B" stroke-width="3"/>
                <line x1="250" y1="150" x2="250" y2="105" stroke="#64748B" stroke-width="3"/>
                
                <!-- Connection dots -->
                <circle cx="50" cy="50" r="4" fill="#F97316"/>
                <circle cx="50" cy="150" r="4" fill="#F97316"/>
                <circle cx="250" cy="50" r="4" fill="#F97316"/>
                <circle cx="250" cy="150" r="4" fill="#F97316"/>
                
                <!-- Ground symbol at source -->
                <line x1="50" y1="120" x2="50" y2="135" stroke="#06B6D4" stroke-width="2"/>
                <line x1="40" y1="135" x2="60" y2="135" stroke="#06B6D4" stroke-width="2"/>
                <line x1="43" y1="140" x2="57" y2="140" stroke="#06B6D4" stroke-width="2"/>
                <line x1="46" y1="145" x2="54" y2="145" stroke="#06B6D4" stroke-width="2"/>
                
                <!-- Current flow animation -->
                <g v-if="loadCurrent > 0">
                  <circle cx="150" cy="50" r="5" fill="#FBBF24">
                    <animate attributeName="cx" values="50;250" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="150" cy="150" r="5" fill="#FBBF24">
                    <animate attributeName="cx" values="250;50" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>
                
                <!-- Optimal indicator -->
                <g v-if="isOptimal">
                  <text x="200" y="130" text-anchor="middle" fill="#22C55E" font-size="10" font-weight="bold">★ OPTIMAL</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Power vs Load Resistance Graph -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📈 Power vs Load Resistance</h2>
        <div class="bg-slate-900 rounded-xl p-4">
          <svg viewBox="0 0 600 300" class="w-full h-auto">
            <!-- Grid lines -->
            <defs>
              <pattern id="graphGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#334155" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="600" height="300" fill="url(#graphGrid)"/>
            
            <!-- Axes -->
            <line x1="60" y1="20" x2="60" y2="260" stroke="#94A3B8" stroke-width="2"/>
            <line x1="60" y1="260" x2="580" y2="260" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Axis labels -->
            <text x="320" y="290" text-anchor="middle" fill="#94A3B8" font-size="12">Load Resistance (Ω)</text>
            <text x="25" y="140" text-anchor="middle" fill="#94A3B8" font-size="12" transform="rotate(-90, 25, 140)">Power (W)</text>
            
            <!-- Power curve -->
            <path
              :d="powerCurvePath"
              fill="none"
              stroke="#F97316"
              stroke-width="3"
              class="drop-shadow-lg"
            />
            
            <!-- Max power point -->
            <g>
              <circle :cx="maxPowerPoint.x" :cy="maxPowerPoint.y" r="6" fill="#EF4444" stroke="#FFF" stroke-width="2"/>
              <text :x="maxPowerPoint.x" :y="maxPowerPoint.y - 15" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="bold">
                Max: {{ maxPower.toFixed(3) }}W @ {{ sourceResistance }}Ω
              </text>
            </g>
            
            <!-- Current operating point -->
            <g>
              <circle :cx="currentPoint.x" :cy="currentPoint.y" r="8" fill="#22C55E" stroke="#FFF" stroke-width="2"/>
              <line :x1="currentPoint.x" :y1="currentPoint.y" :x2="currentPoint.x" :y2="260" stroke="#22C55E" stroke-width="1" stroke-dasharray="5,5"/>
              <line :x1="currentPoint.x" :y1="currentPoint.y" :x2="60" :y2="currentPoint.y" stroke="#22C55E" stroke-width="1" stroke-dasharray="5,5"/>
              <text :x="currentPoint.x" :y="currentPoint.y - 20" text-anchor="middle" fill="#22C55E" font-size="11" font-weight="bold">
                Current: {{ powerLoad.toFixed(3) }}W @ {{ loadResistance }}Ω
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Efficiency Graph -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📊 Efficiency vs Load Resistance</h2>
        <div class="bg-slate-900 rounded-xl p-4">
          <svg viewBox="0 0 600 300" class="w-full h-auto">
            <!-- Grid lines -->
            <rect width="600" height="300" fill="url(#graphGrid)"/>
            
            <!-- Axes -->
            <line x1="60" y1="20" x2="60" y2="260" stroke="#94A3B8" stroke-width="2"/>
            <line x1="60" y1="260" x2="580" y2="260" stroke="#94A3B8" stroke-width="2"/>
            
            <!-- Axis labels -->
            <text x="320" y="290" text-anchor="middle" fill="#94A3B8" font-size="12">Load Resistance (Ω)</text>
            <text x="25" y="140" text-anchor="middle" fill="#94A3B8" font-size="12" transform="rotate(-90, 25, 140)">Efficiency (%)</text>
            
            <!-- Efficiency curve -->
            <path
              :d="efficiencyCurvePath"
              fill="none"
              stroke="#8B5CF6"
              stroke-width="3"
              class="drop-shadow-lg"
            />
            
            <!-- Max power efficiency point -->
            <g>
              <circle :cx="maxPowerEfficiencyPoint.x" :cy="maxPowerEfficiencyPoint.y" r="6" fill="#EF4444" stroke="#FFF" stroke-width="2"/>
              <text :x="maxPowerEfficiencyPoint.x" :y="maxPowerEfficiencyPoint.y - 15" text-anchor="middle" fill="#EF4444" font-size="11" font-weight="bold">
                @ Max Power: 50%
              </text>
            </g>
            
            <!-- Current operating point -->
            <g>
              <circle :cx="currentEfficiencyPoint.x" :cy="currentEfficiencyPoint.y" r="8" fill="#22C55E" stroke="#FFF" stroke-width="2"/>
              <text :x="currentEfficiencyPoint.x" :y="currentEfficiencyPoint.y + 20" text-anchor="middle" fill="#22C55E" font-size="11" font-weight="bold">
                Current: {{ efficiency.toFixed(1) }}%
              </text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Detailed Calculations -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📋 Detailed Calculations</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Circuit Analysis -->
          <div class="p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <h3 class="text-lg font-bold text-cyan-300 mb-3">🔌 Circuit Analysis</h3>
            <div class="space-y-2 text-white text-sm">
              <div class="flex justify-between">
                <span>Total Resistance:</span>
                <span class="font-mono">{{ totalResistance.toFixed(2) }}Ω</span>
              </div>
              <div class="flex justify-between">
                <span>Circuit Current:</span>
                <span class="font-mono">{{ loadCurrent.toFixed(3) }}A</span>
              </div>
              <div class="flex justify-between">
                <span>Voltage Division:</span>
                <span class="font-mono">{{ voltageDivision.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Power Breakdown -->
          <div class="p-4 bg-orange-500/20 rounded-xl border border-orange-400/40">
            <h3 class="text-lg font-bold text-orange-300 mb-3">⚡ Power Breakdown</h3>
            <div class="space-y-2 text-white text-sm">
              <div class="flex justify-between">
                <span>Load Power:</span>
                <span class="font-mono">{{ powerLoad.toFixed(3) }}W</span>
              </div>
              <div class="flex justify-between">
                <span>Source Loss:</span>
                <span class="font-mono">{{ powerSourceLoss.toFixed(3) }}W</span>
              </div>
              <div class="flex justify-between">
                <span>Total Power:</span>
                <span class="font-mono">{{ powerSource.toFixed(3) }}W</span>
              </div>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <h3 class="text-lg font-bold text-purple-300 mb-3">📊 Performance</h3>
            <div class="space-y-2 text-white text-sm">
              <div class="flex justify-between">
                <span>Efficiency:</span>
                <span class="font-mono">{{ efficiency.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between">
                <span>Power Ratio:</span>
                <span class="font-mono">{{ powerRatio.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Match Status:</span>
                <span class="font-mono" :class="isOptimal ? 'text-green-400' : 'text-yellow-400'">
                  {{ isOptimal ? '✓ Matched' : '✗ Mismatched' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
        <h2 class="text-2xl font-bold text-white mb-6">📚 Maximum Power Transfer Theorem</h2>
        <div class="grid md:grid-cols-2 gap-6 text-white">
          <div>
            <h3 class="text-xl font-bold text-orange-300 mb-3">🎯 What is it?</h3>
            <p class="mb-4">
              The Maximum Power Transfer Theorem states that <strong class="text-orange-200">maximum power is transferred 
              to the load when the load resistance equals the source resistance</strong> (Rₗ = Rₛ).
            </p>
            
            <h3 class="text-xl font-bold text-orange-300 mb-3">⚙️ Key Formulas</h3>
            <div class="bg-slate-900 rounded-lg p-4 space-y-3 font-mono text-sm">
              <p><strong class="text-cyan-300">Load Power:</strong></p>
              <p class="text-gray-300 pl-4">Pₗ = Vₛ² × Rₗ / (Rₛ + Rₗ)²</p>
              <p class="mt-2"><strong class="text-green-300">At Max Power (Rₗ = Rₛ):</strong></p>
              <p class="text-gray-300 pl-4">Pₗ(max) = Vₛ² / (4 × Rₛ)</p>
              <p class="mt-2"><strong class="text-purple-300">Efficiency:</strong></p>
              <p class="text-gray-300 pl-4">η = Rₗ / (Rₛ + Rₗ) × 100%</p>
              <p class="text-yellow-300 mt-2">@ Max Power: η = 50%</p>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-orange-300 mb-3">💡 Key Insights</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li><strong class="text-white">Max power ≠ Max efficiency!</strong> At Rₗ = Rₛ, efficiency is only 50%</li>
              <li><strong class="text-white">Trade-off:</strong> Higher Rₗ increases efficiency but reduces power</li>
              <li><strong class="text-white">Power systems</strong> prioritize efficiency (Rₗ ≫ Rₛ)</li>
              <li><strong class="text-white">Signal systems</strong> prioritize power transfer (Rₗ = Rₛ)</li>
            </ul>
            
            <h3 class="text-xl font-bold text-orange-300 mb-3 mt-6">🔌 Applications</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="p-2 bg-orange-500/20 rounded">
                <strong class="text-orange-200">Audio Systems</strong>
                <p class="text-gray-400">Speaker matching</p>
              </div>
              <div class="p-2 bg-orange-500/20 rounded">
                <strong class="text-orange-200">RF Circuits</strong>
                <p class="text-gray-400">Antenna matching</p>
              </div>
              <div class="p-2 bg-orange-500/20 rounded">
                <strong class="text-orange-200">Battery Charging</strong>
                <p class="text-gray-400">Optimal charging</p>
              </div>
              <div class="p-2 bg-orange-500/20 rounded">
                <strong class="text-orange-200">Solar Panels</strong>
                <p class="text-gray-400">MPPT tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const sourceVoltage = ref(12)
const sourceResistance = ref(50)
const loadResistance = ref(50)

// Calculated values
const totalResistance = computed(() => sourceResistance.value + loadResistance.value)
const loadCurrent = computed(() => sourceVoltage.value / totalResistance.value)
const loadVoltage = computed(() => loadCurrent.value * loadResistance.value)
const powerLoad = computed(() => loadCurrent.value * loadCurrent.value * loadResistance.value)
const powerSourceLoss = computed(() => loadCurrent.value * loadCurrent.value * sourceResistance.value)
const powerSource = computed(() => sourceVoltage.value * loadCurrent.value)
const efficiency = computed(() => (powerLoad.value / powerSource.value) * 100)

// Maximum power conditions
const maxPower = computed(() => {
  return (sourceVoltage.value * sourceVoltage.value) / (4 * sourceResistance.value)
})

const powerRatio = computed(() => powerLoad.value / maxPower.value)
const powerPercentage = computed(() => powerRatio.value * 100)
const voltageDivision = computed(() => loadResistance.value / totalResistance.value)

// Status indicators
const isOptimal = computed(() => {
  return Math.abs(loadResistance.value - sourceResistance.value) < 1
})

const statusClass = computed(() => {
  if (isOptimal.value) return 'bg-green-500/20 border border-green-400/50'
  if (powerRatio.value > 0.8) return 'bg-yellow-500/20 border border-yellow-400/50'
  return 'bg-orange-500/20 border border-orange-400/50'
})

const statusIcon = computed(() => {
  if (isOptimal.value) return '🎯'
  if (powerRatio.value > 0.8) return '👍'
  return '⚡'
})

const statusText = computed(() => {
  if (isOptimal.value) return 'OPTIMAL - Maximum Power Transfer!'
  if (powerRatio.value > 0.8) return 'NEAR OPTIMAL - Good power transfer'
  if (loadResistance.value > sourceResistance.value) return 'High Efficiency, Lower Power'
  return 'Low Efficiency, Lower Power'
})

// Graph calculations
const graphWidth = 500
const graphHeight = 220
const graphXStart = 60
const graphYStart = 260

const maxResistance = computed(() => sourceResistance.value * 4)

const powerCurvePath = computed(() => {
  const points = []
  for (let r = 0; r <= maxResistance.value; r += maxResistance.value / 100) {
    const p = (sourceVoltage.value * sourceVoltage.value * r) / Math.pow(sourceResistance.value + r, 2)
    const x = graphXStart + (r / maxResistance.value) * graphWidth
    const y = graphYStart - (p / maxPower.value) * graphHeight * 0.9
    points.push(`${x},${y}`)
  }
  return 'M ' + points.join(' L ')
})

const maxPowerPoint = computed(() => {
  const x = graphXStart + (sourceResistance.value / maxResistance.value) * graphWidth
  const y = graphYStart - graphHeight * 0.9
  return { x, y }
})

const currentPoint = computed(() => {
  const x = graphXStart + Math.min(loadResistance.value / maxResistance.value, 1) * graphWidth
  const y = graphYStart - (powerLoad.value / maxPower.value) * graphHeight * 0.9
  return { x, y }
})

const efficiencyCurvePath = computed(() => {
  const points = []
  for (let r = 1; r <= maxResistance.value; r += maxResistance.value / 100) {
    const eff = (r / (sourceResistance.value + r)) * 100
    const x = graphXStart + (r / maxResistance.value) * graphWidth
    const y = graphYStart - (eff / 100) * graphHeight * 0.9
    points.push(`${x},${y}`)
  }
  return 'M ' + points.join(' L ')
})

const maxPowerEfficiencyPoint = computed(() => {
  const x = graphXStart + (sourceResistance.value / maxResistance.value) * graphWidth
  const y = graphYStart - graphHeight * 0.45 // 50% efficiency
  return { x, y }
})

const currentEfficiencyPoint = computed(() => {
  const x = graphXStart + Math.min(loadResistance.value / maxResistance.value, 1) * graphWidth
  const y = graphYStart - (efficiency.value / 100) * graphHeight * 0.9
  return { x, y }
})

// Actions
const setOptimalLoad = () => {
  loadResistance.value = sourceResistance.value
}

const loadPreset = (preset) => {
  switch (preset) {
    case 'audio':
      sourceVoltage.value = 10
      sourceResistance.value = 8
      loadResistance.value = 8
      break
    case 'battery':
      sourceVoltage.value = 12
      sourceResistance.value = 0.1
      loadResistance.value = 10
      break
    case 'antenna':
      sourceVoltage.value = 5
      sourceResistance.value = 50
      loadResistance.value = 50
      break
    case 'solar':
      sourceVoltage.value = 18
      sourceResistance.value = 5
      loadResistance.value = 5
      break
  }
}
</script>

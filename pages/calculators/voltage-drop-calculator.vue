<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavigationBar />
    
    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <LightningBoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Drop Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate voltage drop in conductors for proper electrical design
          </p>
          
          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Drop Formula</div>
            <div class="flex items-center justify-center gap-2 text-xl font-mono font-bold">
              <span class="text-primary-highlight">Vd</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">(√3 × I × L)</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary-highlight">(σ × A)</span>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              For 3-phase: Vd = (√3 × I × L) / (σ × A) | For 1-phase: Vd = (2 × I × L) / (σ × A)
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Left: Input Controls -->
          <div class="space-y-6">
            
            <!-- System Configuration -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CogIcon class="h-6 w-6 text-primary" />
                System Configuration
              </h2>
              
              <!-- Phase Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  System Type
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click="phaseType = '3phase'"
                    class="py-3 px-4 rounded-lg font-medium transition-all"
                    :class="phaseType === '3phase' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    3-Phase
                  </button>
                  <button
                    @click="phaseType = '1phase'"
                    class="py-3 px-4 rounded-lg font-medium transition-all"
                    :class="phaseType === '1phase' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    1-Phase
                  </button>
                </div>
              </div>

              <!-- System Voltage -->
              <div class="mb-6">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>System Voltage</span>
                  <span class="text-blue-500 font-bold">{{ voltage }} V</span>
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="v in [120, 230, 400, 480]"
                    :key="v"
                    @click="voltage = v"
                    class="py-2 rounded-lg font-medium transition-all text-sm"
                    :class="voltage === v 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    {{ v }}V
                  </button>
                </div>
                <input
                  v-model.number="voltage"
                  type="number"
                  min="1"
                  max="1000"
                  class="mt-2 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Custom voltage"
                />
              </div>

              <!-- Load Current -->
              <div class="mb-4">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Load Current (I)</span>
                  <span class="text-orange-500 font-bold">{{ current }} A</span>
                </label>
                <input
                  v-model.number="current"
                  type="range"
                  min="1"
                  max="500"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex items-center gap-2 mt-2">
                  <input
                    v-model.number="current"
                    type="number"
                    min="1"
                    max="1000"
                    class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span class="text-gray-500 dark:text-gray-400">A</span>
                </div>
              </div>
            </div>

            <!-- Conductor Configuration -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <WireIcon class="h-6 w-6 text-yellow-500" />
                Conductor Configuration
              </h2>
              
              <!-- Material Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Conductor Material
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click="material = 'copper'"
                    class="py-3 px-4 rounded-lg font-medium transition-all"
                    :class="material === 'copper' 
                      ? 'bg-orange-500 text-white shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    🔶 Copper
                  </button>
                  <button
                    @click="material = 'aluminum'"
                    class="py-3 px-4 rounded-lg font-medium transition-all"
                    :class="material === 'aluminum' 
                      ? 'bg-gray-400 text-white shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    ⬜ Aluminum
                  </button>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Conductivity: Copper = 58 IACS, Aluminum = 37 IACS
                </p>
              </div>

              <!-- Wire Length -->
              <div class="mb-6">
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Wire Length (one way)</span>
                  <span class="text-green-500 font-bold">{{ length }} m</span>
                </label>
                <input
                  v-model.number="length"
                  type="range"
                  min="1"
                  max="500"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex items-center gap-2 mt-2">
                  <input
                    v-model.number="length"
                    type="number"
                    min="1"
                    max="1000"
                    class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <span class="text-gray-500 dark:text-gray-400">m</span>
                </div>
              </div>

              <!-- Wire Size Selection -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wire Size
                </label>
                <select
                  v-model="wireSize"
                  class="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="0.5">0.5 mm² (20 AWG)</option>
                  <option value="0.75">0.75 mm² (18 AWG)</option>
                  <option value="1">1 mm² (17 AWG)</option>
                  <option value="1.5">1.5 mm² (15 AWG)</option>
                  <option value="2.5">2.5 mm² (13 AWG)</option>
                  <option value="4">4 mm² (11 AWG)</option>
                  <option value="6">6 mm² (9 AWG)</option>
                  <option value="10">10 mm² (7 AWG)</option>
                  <option value="16">16 mm² (5 AWG)</option>
                  <option value="25">25 mm² (4 AWG)</option>
                  <option value="35">35 mm² (2 AWG)</option>
                  <option value="50">50 mm² (1/0 AWG)</option>
                  <option value="70">70 mm² (2/0 AWG)</option>
                  <option value="95">95 mm² (3/0 AWG)</option>
                  <option value="120">120 mm² (4/0 AWG)</option>
                  <option value="150">150 mm² (250 kcmil)</option>
                  <option value="185">185 mm² (350 kcmil)</option>
                  <option value="240">240 mm² (500 kcmil)</option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Selected: {{ wireSize }} mm²
                </p>
              </div>

              <!-- Operating Temperature -->
              <div>
                <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span>Operating Temperature</span>
                  <span class="text-red-500 font-bold">{{ temperature }}°C</span>
                </label>
                <input
                  v-model.number="temperature"
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Higher temperature = higher resistance
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Results & Visualizations -->
          <div class="space-y-6">
            
            <!-- Results Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ChartBarIcon class="h-6 w-6 text-green-500" />
                Calculation Results
              </h3>
              
              <!-- Voltage Drop -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Drop</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                    {{ voltageDrop.toFixed(2) }}
                  </span>
                  <span class="text-2xl text-gray-600 dark:text-gray-400">V</span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {{ voltageDropPercent.toFixed(2) }}% of source voltage
                </p>
              </div>

              <!-- Grid of secondary results -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Final Voltage</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ finalVoltage.toFixed(1) }} V
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Power Loss</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ powerLoss.toFixed(1) }} W
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Resistance</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ totalResistance.toFixed(3) }} Ω
                  </p>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
                  <p class="text-2xl font-bold" :class="efficiencyColor">
                    {{ efficiency.toFixed(1) }}%
                  </p>
                </div>
              </div>

              <!-- Status Indicator -->
              <div class="mt-4 p-4 rounded-lg" :class="statusClass">
                <div class="flex items-center gap-3">
                  <component :is="statusIcon" class="h-6 w-6" />
                  <div>
                    <p class="font-semibold" :class="statusTextClass">{{ statusText }}</p>
                    <p class="text-sm opacity-80">{{ recommendationText }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visualization Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                📊 Voltage Drop Visualization
              </h3>
              
              <div class="flex justify-center mb-4">
                <svg viewBox="0 0 500 250" class="w-full h-auto">
                  <!-- Background -->
                  <defs>
                    <linearGradient id="voltageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#EF4444;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Title -->
                  <text x="250" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">
                    Source Voltage vs Load Voltage
                  </text>
                  
                  <!-- Voltage Bar - Source -->
                  <rect x="50" y="50" width="180" height="80" fill="#10B981" rx="5" />
                  <text x="140" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="white">
                    {{ voltage }} V
                  </text>
                  <text x="140" y="110" text-anchor="middle" font-size="12" fill="white">
                    Source
                  </text>
                  
                  <!-- Arrow -->
                  <path d="M 235 90 L 265 90" stroke="#6B7280" stroke-width="3" marker-end="url(#arrowhead)" />
                  
                  <!-- Voltage Drop Indicator -->
                  <rect x="245" y="55" width="10" height="70" fill="#F59E0B" rx="2" />
                  <text x="295" y="95" font-size="11" font-weight="bold" fill="#F59E0B">
                    -{{ voltageDrop.toFixed(1) }}V
                  </text>
                  <text x="295" y="110" font-size="10" fill="#F59E0B">
                    ({{ voltageDropPercent.toFixed(1) }}%)
                  </text>
                  
                  <!-- Voltage Bar - Load -->
                  <rect x="270" y="50" :width="loadBarWidth" height="80" :fill="loadBarColor" rx="5" />
                  <text :x="270 + loadBarWidth/2" y="90" text-anchor="middle" font-size="16" font-weight="bold" fill="white">
                    {{ finalVoltage.toFixed(1) }} V
                  </text>
                  <text :x="270 + loadBarWidth/2" y="110" text-anchor="middle" font-size="12" fill="white">
                    Load
                  </text>
                  
                  <!-- Conductor representation -->
                  <g transform="translate(50, 150)">
                    <text x="200" y="0" text-anchor="middle" font-size="13" font-weight="bold" fill="#374151">
                      Conductor: {{ material }} {{ wireSize }}mm²
                    </text>
                    
                    <!-- Wire line -->
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#6B7280" stroke-width="8" stroke-linecap="round" />
                    
                    <!-- Length markers -->
                    <line x1="0" y1="20" x2="0" y2="40" stroke="#374151" stroke-width="2" />
                    <line x1="400" y1="20" x2="400" y2="40" stroke="#374151" stroke-width="2" />
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#374151" stroke-width="1" stroke-dasharray="5,5" />
                    
                    <text x="200" y="55" text-anchor="middle" font-size="12" fill="#6B7280">
                      Length: {{ length }} m (one way)
                    </text>
                    <text x="200" y="72" text-anchor="middle" font-size="11" fill="#9CA3AF">
                      Total: {{ length * (phaseType === '3phase' ? 1 : 2) }} m
                    </text>
                  </g>
                  
                  <!-- Current flow -->
                  <g transform="translate(50, 235)">
                    <text x="0" y="0" font-size="12" fill="#374151">
                      Current: <tspan font-weight="bold">{{ current }} A</tspan>
                    </text>
                    <text x="150" y="0" font-size="12" fill="#374151">
                      Temp: <tspan font-weight="bold">{{ temperature }}°C</tspan>
                    </text>
                    <text x="300" y="0" font-size="12" fill="#374151">
                      Phase: <tspan font-weight="bold">{{ phaseType === '3phase' ? '3-Phase' : '1-Phase' }}</tspan>
                    </text>
                  </g>
                  
                  <!-- Arrow marker definition -->
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>

            <!-- NEC Guidelines -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Standard Guidelines</h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3">
                  <div class="mt-1">
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">NEC Recommendation</p>
                    <p class="text-gray-600 dark:text-gray-400">Maximum 3% voltage drop for branch circuits, 5% for feeders</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <div class="mt-1">
                    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">IEC Recommendation</p>
                    <p class="text-gray-600 dark:text-gray-400">Maximum 3% for consumer installations</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <div class="mt-1">
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">Critical Systems</p>
                    <p class="text-gray-600 dark:text-gray-400">Aim for ≤2% for sensitive equipment and motor loads</p>
                  </div>
                </div>
              </div>
              
              <!-- Suggested wire size -->
              <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p class="text-sm font-medium text-blue-800 dark:text-blue-300">
                  💡 For this load with &lt;3% drop, consider:
                  <span class="font-bold">{{ suggestedWireSize }} mm²</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'

// Icons (inline)
const LightningBoltIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>'
}

const CogIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>'
}

const WireIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>'
}

const ChartBarIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>'
}

const CheckCircleIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
}

const ExclamationIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>'
}

const XCircleIcon = {
  template: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
}

// Input values
const phaseType = ref('3phase')
const voltage = ref(400)
const current = ref(50)
const material = ref('copper')
const length = ref(100) // meters
const wireSize = ref(16) // mm²
const temperature = ref(75) // °C

// Constants
const COPPER_RESISTIVITY_20C = 0.01724 // Ω·mm²/m
const ALUMINUM_RESISTIVITY_20C = 0.02828 // Ω·mm²/m
const TEMP_COEFF_COPPER = 0.00393
const TEMP_COEFF_ALUMINUM = 0.00403

// Calculated values
const baseResistivity = computed(() => {
  return material.value === 'copper' ? COPPER_RESISTIVITY_20C : ALUMINUM_RESISTIVITY_20C
})

const tempCoeff = computed(() => {
  return material.value === 'copper' ? TEMP_COEFF_COPPER : TEMP_COEFF_ALUMINUM
})

const resistanceAtTemp = computed(() => {
  const R20 = baseResistivity.value
  const tempRise = temperature.value - 20
  return R20 * (1 + tempCoeff.value * tempRise)
})

const totalResistance = computed(() => {
  // For 3-phase: length is one way, current flows through one conductor
  // For 1-phase: length is one way, current flows through both conductors (out and back)
  const totalLength = phaseType.value === '3phase' ? length.value : length.value * 2
  return (resistanceAtTemp.value * totalLength) / wireSize.value
})

const voltageDrop = computed(() => {
  if (phaseType.value === '3phase') {
    // Vd = √3 × I × R
    return Math.sqrt(3) * current.value * totalResistance.value
  } else {
    // Vd = 2 × I × R (for single-phase, both conductors)
    return 2 * current.value * totalResistance.value
  }
})

const voltageDropPercent = computed(() => {
  return (voltageDrop.value / voltage.value) * 100
})

const finalVoltage = computed(() => {
  return voltage.value - voltageDrop.value
})

const powerLoss = computed(() => {
  // P_loss = I² × R
  return (current.value ** 2) * totalResistance.value
})

const efficiency = computed(() => {
  const inputPower = phaseType.value === '3phase' 
    ? Math.sqrt(3) * voltage.value * current.value
    : voltage.value * current.value
  const outputPower = inputPower - powerLoss.value
  return (outputPower / inputPower) * 100
})

// Status and recommendations
const statusText = computed(() => {
  if (voltageDropPercent.value < 2) return 'Excellent'
  if (voltageDropPercent.value < 3) return 'Acceptable'
  if (voltageDropPercent.value < 5) return 'Marginal'
  return 'Excessive'
})

const statusClass = computed(() => {
  if (voltageDropPercent.value < 2) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
  if (voltageDropPercent.value < 3) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
  if (voltageDropPercent.value < 5) return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
  return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
})

const statusTextClass = computed(() => {
  if (voltageDropPercent.value < 2) return 'text-green-800 dark:text-green-300'
  if (voltageDropPercent.value < 3) return 'text-yellow-800 dark:text-yellow-300'
  if (voltageDropPercent.value < 5) return 'text-orange-800 dark:text-orange-300'
  return 'text-red-800 dark:text-red-300'
})

const statusIcon = computed(() => {
  if (voltageDropPercent.value < 2) return CheckCircleIcon
  if (voltageDropPercent.value < 3) return CheckCircleIcon
  if (voltageDropPercent.value < 5) return ExclamationIcon
  return XCircleIcon
})

const recommendationText = computed(() => {
  if (voltageDropPercent.value < 2) return 'Within excellent range for sensitive equipment'
  if (voltageDropPercent.value < 3) return 'Meets NEC/IEC recommendations'
  if (voltageDropPercent.value < 5) return 'Consider increasing wire size for better efficiency'
  return 'Increase wire size or reduce length/load immediately'
})

const suggestedWireSize = computed(() => {
  // Calculate required wire size for 3% drop
  const targetDrop = voltage.value * 0.03
  const targetResistance = targetDrop / (phaseType.value === '3phase' ? Math.sqrt(3) * current.value : 2 * current.value)
  const totalLength = phaseType.value === '3phase' ? length.value : length.value * 2
  const requiredArea = (resistanceAtTemp.value * totalLength) / targetResistance
  
  // Find nearest standard size
  const standardSizes = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]
  for (const size of standardSizes) {
    if (size >= requiredArea) return size
  }
  return 240 // Max size
})

// Visualization colors
const efficiencyColor = computed(() => {
  if (efficiency.value >= 98) return 'text-green-500'
  if (efficiency.value >= 95) return 'text-yellow-500'
  return 'text-red-500'
})

const loadBarWidth = computed(() => {
  return Math.max(20, (finalVoltage.value / voltage.value) * 180)
})

const loadBarColor = computed(() => {
  const percent = (finalVoltage.value / voltage.value) * 100
  if (percent >= 97) return '#10B981'
  if (percent >= 95) return '#F59E0B'
  return '#EF4444'
})
</script>

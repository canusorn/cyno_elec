<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Joule Thief Circuit
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Extract energy from nearly "dead" batteries with this ingenious self-oscillating circuit
          </p>
          
          <!-- Joule Thief Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-primary">V_boost</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">V_batt</span>
              <span class="text-gray-400">+</span>
              <span class="text-primary">V_induced</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Battery Voltage Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Battery Voltage (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="batteryVoltage"
                    type="number" 
                    step="0.05"
                    min="0.5"
                    max="3"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="batteryVoltage"
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 mt-1">
                  💡 Dead AA battery: ~0.8V
                </p>
              </div>

              <!-- LED Forward Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LED Forward Voltage (V)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="ledVoltage"
                    type="number" 
                    step="0.1"
                    min="1.8"
                    max="3.6"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="ledVoltage"
                  type="range"
                  min="1.8"
                  max="3.6"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 mt-1">
                  💡 White LED: ~3.2V, Red LED: ~2.0V
                </p>
              </div>

              <!-- Transformer Turns Ratio -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Turns Ratio (N1:N2)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="turnsRatio"
                    type="number" 
                    step="1"
                    min="1"
                    max="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">:1</span>
                </div>
                <input 
                  v-model.number="turnsRatio"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 mt-1">
                  💡 Higher ratio = more voltage boost
                </p>
              </div>

              <!-- Base Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Resistor (Ω)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="baseResistor"
                    type="number" 
                    step="10"
                    min="100"
                    max="2000"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
                </div>
                <input 
                  v-model.number="baseResistor"
                  type="range"
                  min="100"
                  max="2000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3 mb-6">
                <button 
                  @click="toggleSimulation"
                  :class="['w-full px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2', 
                    isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700']"
                >
                  <svg v-if="!isRunning" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ isRunning ? 'Stop' : 'Start' }} Simulation
                </button>
                <button 
                  @click="resetSimulation"
                  class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>

              <!-- Oscillation Status -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Oscillation Status</p>
                <div class="flex items-center gap-2">
                  <div :class="['w-3 h-3 rounded-full', isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400']"></div>
                  <p class="font-bold text-primary">
                    {{ isRunning ? `Oscillating (${oscillationFreq.toFixed(1)} kHz)` : 'Off' }}
                  </p>
                </div>
              </div>

              <!-- Quick Presets -->
              <div class="mt-6">
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h4>
                <div class="space-y-2">
                  <button 
                    @click="applyPreset('deadBattery')"
                    class="w-full px-3 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    🪫 Dead Battery (0.8V)
                  </button>
                  <button 
                    @click="applyPreset('whiteLED')"
                    class="w-full px-3 py-2 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    💡 White LED (3.2V)
                  </button>
                  <button 
                    @click="applyPreset('highEfficiency')"
                    class="w-full px-3 py-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    ⚡ High Efficiency
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
              
              <svg viewBox="0 0 600 400" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#grid)" />
                
                <!-- Main Circuit Loop -->
                <path d="M 150 250 L 150 150 L 250 150 L 250 100" 
                  :stroke="wireColor" stroke-width="3" fill="none" class="transition-all duration-200"/>
                <path d="M 250 300 L 250 350 L 150 350 L 150 250" 
                  :stroke="wireColor" stroke-width="3" fill="none" class="transition-all duration-200"/>
                
                <!-- Battery (Left) -->
                <g class="battery">
                  <rect x="130" y="260" width="40" height="80" fill="#fff" :stroke="batteryColor" stroke-width="3" rx="5"/>
                  <text x="150" y="295" text-anchor="middle" font-size="14" font-weight="bold" :fill="batteryColor">
                    {{ batteryVoltage.toFixed(1) }}V
                  </text>
                  <text x="150" y="315" text-anchor="middle" font-size="12" fill="#666">Battery</text>
                  <!-- Battery terminals -->
                  <rect x="145" y="255" width="10" height="5" :fill="batteryColor"/>
                  <rect x="145" y="340" width="10" height="5" :fill="batteryColor"/>
                </g>
                
                <!-- Transformer (Center) -->
                <g class="transformer">
                  <!-- Primary coil -->
                  <ellipse cx="350" cy="200" rx="60" ry="40" fill="none" stroke="#f59e0b" stroke-width="3"/>
                  <ellipse cx="350" cy="200" rx="45" ry="30" fill="none" stroke="#f59e0b" stroke-width="2"/>
                  <!-- Secondary coil -->
                  <ellipse cx="350" cy="200" rx="30" ry="20" fill="none" stroke="#10b981" stroke-width="3"/>
                  <ellipse cx="350" cy="200" rx="20" ry="13" fill="none" stroke="#10b981" stroke-width="2"/>
                  <!-- Core -->
                  <rect x="340" y="190" width="20" height="20" fill="#6b7280" opacity="0.5"/>
                  <text x="350" y="270" text-anchor="middle" font-size="12" fill="#666">
                    T1 ({{ turnsRatio }}:1)
                  </text>
                </g>
                
                <!-- Transistor (Q1) -->
                <g class="transistor">
                  <circle cx="250" cy="350" r="25" fill="white" stroke="#8b5cf6" stroke-width="2"/>
                  <text x="250" y="345" text-anchor="middle" font-size="12" font-weight="bold" fill="#8b5cf6">Q1</text>
                  <text x="250" y="360" text-anchor="middle" font-size="10" fill="#666">NPN</text>
                </g>
                
                <!-- Base Resistor -->
                <g class="base-resistor">
                  <rect x="220" y="180" width="60" height="20" fill="white" stroke="#ec4899" stroke-width="2" rx="3"/>
                  <text x="250" y="195" text-anchor="middle" font-size="10" fill="#ec4899">{{ baseResistor }}Ω</text>
                </g>
                
                <!-- LED (Top Right) -->
                <g class="led">
                  <polygon :points="ledPoints" :fill="ledFill" stroke="#ef4444" stroke-width="2" class="transition-all duration-200"/>
                  <line x1="500" y1="100" x2="520" y2="80" stroke="#ef4444" stroke-width="2"/>
                  <line x1="500" y1="120" x2="520" y2="100" stroke="#ef4444" stroke-width="2"/>
                  <!-- LED glow effect when on -->
                  <circle v-if="ledOn" cx="510" cy="110" r="40" fill="#ef4444" opacity="0.2" class="animate-pulse"/>
                  <text x="510" y="140" text-anchor="middle" font-size="12" fill="#666">LED</text>
                </g>
                
                <!-- Current flow animation -->
                <circle v-if="isRunning" r="5" fill="#fbbf24" class="current-particle">
                  <animateMotion dur="1s" repeatCount="indefinite">
                    <mpath href="#circuitPath"/>
                  </animateMotion>
                </circle>
                <circle v-if="isRunning" r="5" fill="#fbbf24" class="current-particle">
                  <animateMotion dur="1s" repeatCount="indefinite" begin="0.33s">
                    <mpath href="#circuitPath"/>
                  </animateMotion>
                </circle>
                <circle v-if="isRunning" r="5" fill="#fbbf24" class="current-particle">
                  <animateMotion dur="1s" repeatCount="indefinite" begin="0.66s">
                    <mpath href="#circuitPath"/>
                  </animateMotion>
                </circle>
                
                <!-- Invisible path for current flow -->
                <path id="circuitPath" d="M 150 250 L 150 150 L 250 150 L 250 100 L 510 100 L 510 120 L 250 120 L 250 350 L 150 350 L 150 250" 
                  fill="none" stroke="none"/>
              </svg>
            </div>

            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Oscilloscope Display</h3>
              <canvas ref="scopeCanvas" width="700" height="300" class="w-full h-auto bg-gray-900 rounded-lg"></canvas>
              <div class="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Yellow: Base Voltage</span>
                <span>Blue: Collector Voltage</span>
                <span>Red: LED Current</span>
              </div>
            </div>

            <!-- Real-time Measurements -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Real-time Measurements</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Battery Voltage</p>
                  <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ batteryVoltage.toFixed(2) }}V</p>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">LED Voltage</p>
                  <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ ledVoltage.toFixed(2) }}V</p>
                </div>
                
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak LED Current</p>
                  <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ peakCurrent.toFixed(1) }}mA</p>
                </div>
                
                <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-4">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Oscillation Freq</p>
                  <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ oscillationFreq.toFixed(1) }}kHz</p>
                </div>
              </div>
            </div>

            <!-- Energy Efficiency -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Energy Analysis</h3>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 dark:text-gray-300">Input Power</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ inputPower.toFixed(2) }}mW</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 dark:text-gray-300">LED Power</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ ledPower.toFixed(2) }}mW</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 dark:text-gray-300">Efficiency</span>
                  <span :class="['font-bold', efficiencyColor]">{{ efficiency.toFixed(1) }}%</span>
                </div>
                
                <div class="mt-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">Power Transfer</span>
                    <span class="text-gray-600 dark:text-gray-400">{{ efficiency.toFixed(1) }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      class="h-3 rounded-full transition-all duration-500"
                      :class="efficiencyBarColor"
                      :style="{ width: `${efficiency}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 How the Joule Thief Works</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Circuit Operation</h4>
              <ol class="space-y-3 text-gray-700 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                  <span><strong>Startup:</strong> Current flows through the base resistor, turning ON the transistor.</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                  <span><strong>Charging:</strong> Collector current rises, storing energy in the transformer's magnetic field.</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  <span><strong>Saturation:</strong> Transformer core saturates, feedback voltage reverses polarity.</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                  <span><strong>Turn-off:</strong> Transistor turns OFF, magnetic field collapses, inducing high voltage spike.</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                  <span><strong>LED Flash:</strong> Voltage spike powers the LED, even with low battery voltage.</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</span>
                  <span><strong>Repeat:</strong> Cycle repeats at high frequency (typically 20-100 kHz).</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Concepts</h4>
              <div class="space-y-3">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="font-semibold text-primary mb-1">⚡ Self-Oscillation</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300">The transformer provides positive feedback, creating automatic oscillation without external timing circuits.</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="font-semibold text-primary mb-1">🔄 Flyback Action</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300">When the transistor switches OFF, the collapsing magnetic field induces a voltage spike much higher than the battery voltage.</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="font-semibold text-primary mb-1">📈 Voltage Boost</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300">The turns ratio determines voltage multiplication: V_boost = V_batt × (1 + turns_ratio).</p>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p class="font-semibold text-primary mb-1">🔋 Energy Extraction</p>
                  <p class="text-sm text-gray-700 dark:text-gray-300">Extracts remaining energy from batteries considered "dead" by conventional circuits.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Applications -->
          <div class="mt-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Applications & Uses</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center">
                <p class="text-2xl mb-1">🔦</p>
                <p class="text-sm font-medium">Emergency Lights</p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-center">
                <p class="text-2xl mb-1">🪫</p>
                <p class="text-sm font-medium">Battery Extender</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center">
                <p class="text-2xl mb-1">💡</p>
                <p class="text-sm font-medium">LED Drivers</p>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg text-center">
                <p class="text-2xl mb-1">📡</p>
                <p class="text-sm font-medium">RF Circuits</p>
              </div>
            </div>
          </div>
          
          <!-- Pro Tips -->
          <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Design Tips</h4>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Use a ferrite toroid core for best efficiency (high permeability)</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Wind primary coil first, then secondary with proper phasing</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Adjust base resistor to control oscillation frequency</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Higher turns ratio increases voltage but reduces efficiency</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span>Works best with "dead" batteries (0.8-1.2V for AA cells)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Joule Thief Circuit Simulation - Cyno Electric © 2026</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input parameters
const batteryVoltage = ref(0.8)
const ledVoltage = ref(3.2)
const turnsRatio = ref(3)
const baseResistor = ref(1000)

// Simulation state
const isRunning = ref(false)
const ledOn = ref(false)
const animationFrame = ref(null)
const time = ref(0)
const scopeCanvas = ref(null)
let ctx = null

// Calculated values
const oscillationFreq = computed(() => {
  // Frequency depends on base resistor and transformer characteristics
  // Simplified model: f = k / (R_base × C_parasitic)
  // Using empirical approximation
  const baseFreq = 50 // kHz at 1kΩ
  return baseFreq * (1000 / baseResistor.value)
})

const peakCurrent = computed(() => {
  // Peak LED current (mA) based on boost factor
  const boostFactor = 1 + turnsRatio.value * 0.5
  const baseCurrent = (batteryVoltage.value * 1000) / baseResistor.value
  return baseCurrent * boostFactor * 10
})

const inputPower = computed(() => {
  // Input power in mW
  const avgCurrent = peakCurrent.value / 3 // Approximate average
  return batteryVoltage.value * avgCurrent
})

const ledPower = computed(() => {
  // LED power in mW (with losses)
  const efficiency = 0.4 + (turnsRatio.value * 0.05) // 40-70% efficiency
  return inputPower.value * efficiency
})

const efficiency = computed(() => {
  if (inputPower.value === 0) return 0
  return (ledPower.value / inputPower.value) * 100
})

const efficiencyColor = computed(() => {
  if (efficiency.value >= 60) return 'text-green-600 dark:text-green-400'
  if (efficiency.value >= 40) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
})

const efficiencyBarColor = computed(() => {
  if (efficiency.value >= 60) return 'bg-green-500'
  if (efficiency.value >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
})

// Wire color for animation
const wireColor = computed(() => {
  return isRunning.value ? '#22c55e' : '#9ca3af'
})

const batteryColor = computed(() => {
  if (batteryVoltage.value < 0.7) return '#ef4444'
  if (batteryVoltage.value < 1.0) return '#f59e0b'
  return '#22c55e'
})

// LED visualization
const ledPoints = computed(() => {
  return '500,100 520,110 500,120 480,110'
})

const ledFill = computed(() => {
  if (isRunning.value && ledOn.value) return '#ef4444'
  return '#fecaca'
})

// Presets
const applyPreset = (preset) => {
  switch (preset) {
    case 'deadBattery':
      batteryVoltage.value = 0.8
      ledVoltage.value = 3.2
      turnsRatio.value = 3
      baseResistor.value = 1000
      break
    case 'whiteLED':
      batteryVoltage.value = 1.2
      ledVoltage.value = 3.2
      turnsRatio.value = 4
      baseResistor.value = 820
      break
    case 'highEfficiency':
      batteryVoltage.value = 1.0
      ledVoltage.value = 2.0
      turnsRatio.value = 2
      baseResistor.value = 1200
      break
  }
}

// Simulation control
const toggleSimulation = () => {
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    startSimulation()
  } else {
    stopSimulation()
  }
}

const resetSimulation = () => {
  isRunning.value = false
  ledOn.value = false
  time.value = 0
  stopSimulation()
  drawWaveform()
}

const startSimulation = () => {
  if (animationFrame.value) return
  
  const animate = () => {
    if (!isRunning.value) return
    
    time.value += 0.016 // ~60fps
    ledOn.value = Math.sin(time.value * oscillationFreq.value * 0.1) > 0
    
    drawWaveform()
    animationFrame.value = requestAnimationFrame(animate)
  }
  
  animate()
}

const stopSimulation = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
}

// Oscilloscope drawing
const drawWaveform = () => {
  if (!scopeCanvas.value || !ctx) return
  
  const canvas = scopeCanvas.value
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    ctx.beginPath()
    ctx.moveTo(i * width / 10, 0)
    ctx.lineTo(i * width / 10, height)
    ctx.stroke()
  }
  for (let i = 0; i < 6; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * height / 6)
    ctx.lineTo(width, i * height / 6)
    ctx.stroke()
  }
  
  if (!isRunning.value) {
    // Show "Stopped" text
    ctx.fillStyle = '#9ca3af'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Simulation Stopped', width / 2, height / 2)
    return
  }
  
  // Draw waveforms
  const timePoints = 500
  const samplesPerPoint = 2
  
  // Base voltage (yellow) - square wave
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < timePoints; i++) {
    const t = time.value - (timePoints - i) * 0.001
    const phase = (t * oscillationFreq.value * 0.1) % (Math.PI * 2)
    const value = Math.sin(phase) > 0 ? 0.7 : 0.3
    const x = (i / timePoints) * width
    const y = height - (value * height * 0.8 + height * 0.1)
    
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  
  // Collector voltage (blue) - spike waveform
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < timePoints; i++) {
    const t = time.value - (timePoints - i) * 0.001
    const phase = (t * oscillationFreq.value * 0.1) % (Math.PI * 2)
    let value
    if (Math.sin(phase) > 0) {
      value = 0.2 // ON state (low voltage)
    } else {
      value = 0.2 + 0.7 * Math.exp(-((phase + Math.PI) % (Math.PI * 2)) * 3) // Spike
    }
    const x = (i / timePoints) * width
    const y = height - (value * height * 0.8 + height * 0.1)
    
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  
  // LED current (red) - pulsed current
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i < timePoints; i++) {
    const t = time.value - (timePoints - i) * 0.001
    const phase = (t * oscillationFreq.value * 0.1) % (Math.PI * 2)
    let value
    if (Math.sin(phase) < 0) {
      value = 0.1 + 0.8 * Math.exp(-((phase + Math.PI) % (Math.PI * 2)) * 5)
    } else {
      value = 0.1
    }
    const x = (i / timePoints) * width
    const y = height - (value * height * 0.8 + height * 0.1)
    
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

// Lifecycle hooks
onMounted(() => {
  if (scopeCanvas.value) {
    ctx = scopeCanvas.value.getContext('2d')
    drawWaveform()
  }
})

onUnmounted(() => {
  stopSimulation()
})

// Watch for parameter changes to redraw waveform
watch([batteryVoltage, ledVoltage, turnsRatio, baseResistor], () => {
  if (!isRunning.value) {
    drawWaveform()
  }
})
</script>

<style scoped>
.slider-primary {
  accent-color: #7986CB;
}

.current-particle {
  filter: drop-shadow(0 0 4px #fbbf24);
}
</style>

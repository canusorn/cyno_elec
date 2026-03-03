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
            LC Tank Circuit Oscillator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive simulation of energy oscillation between inductor and capacitor with real-time visualization
          </p>
          
          <!-- Resonance Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm font-mono text-center">
              <div class="text-primary-highlight font-bold mb-1">f₀ = 1 / (2π√LC)</div>
              <div class="text-gray-600 dark:text-gray-400 text-xs">
                Resonant frequency where inductive and capacitive reactances cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulation Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
              <!-- Inductance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inductance (L)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="inductance" 
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">mH</span>
                </div>
                <input 
                  v-model.number="inductance" 
                  type="range" 
                  min="0.1" 
                  max="100" 
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- Capacitance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitance (C)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="capacitance" 
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">µF</span>
                </div>
                <input 
                  v-model.number="capacitance" 
                  type="range" 
                  min="0.1" 
                  max="100" 
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Series Resistance (R)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="resistance" 
                    type="number" 
                    step="0.1"
                    min="0"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">Ω</span>
                </div>
                <input 
                  v-model.number="resistance" 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  R=0: Undamped, R>0: Damped oscillation
                </p>
              </div>
              
              <!-- Initial Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Initial Capacitor Voltage
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="initialVoltage" 
                    type="number" 
                    step="1"
                    min="1"
                    max="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">V</span>
                </div>
                <input 
                  v-model.number="initialVoltage" 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- Control Buttons -->
              <div class="flex gap-3 mb-6">
                <button 
                  @click="startSimulation"
                  :disabled="isRunning"
                  class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg v-if="!isRunning" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ isRunning ? 'Running...' : 'Start' }}</span>
                </button>
                <button 
                  @click="resetSimulation"
                  class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
              
              <!-- Simulation Speed -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Simulation Speed: {{ simulationSpeed }}x
                </label>
                <input 
                  v-model.number="simulationSpeed" 
                  type="range" 
                  min="0.1" 
                  max="2" 
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- Calculated Values -->
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Circuit Properties</h4>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Resonant Frequency:</span>
                  <span class="font-bold text-primary-highlight">{{ resonantFreq.toFixed(2) }} Hz</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Angular Frequency (ω₀):</span>
                  <span class="font-bold text-primary-highlight">{{ angularFreq.toFixed(2) }} rad/s</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Period (T):</span>
                  <span class="font-bold text-primary-highlight">{{ period.toFixed(4) }} s</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Damping Factor (α):</span>
                  <span class="font-bold text-primary-highlight">{{ dampingFactor.toFixed(4) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-300">Quality Factor (Q):</span>
                  <span class="font-bold text-primary-highlight">{{ qualityFactor.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                LC Tank Circuit
              </h3>
              
              <div class="flex justify-center">
                <svg viewBox="0 0 500 300" class="w-full max-w-2xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                  <!-- Circuit wires -->
                  <rect x="100" y="50" width="300" height="200" fill="none" stroke="#374151" stroke-width="3"/>
                  
                  <!-- Inductor (top) -->
                  <g transform="translate(200, 40)">
                    <path d="M0 10 Q12.5 0, 25 10 T50 10 T75 10 T100 10" fill="none" stroke="#8B5CF6" stroke-width="3"/>
                    <text x="50" y="-5" text-anchor="middle" font-size="14" font-weight="bold" fill="#8B5CF6">L = {{ inductance }} mH</text>
                  </g>
                  
                  <!-- Capacitor (bottom) -->
                  <g transform="translate(220, 250)">
                    <line x1="0" y1="-20" x2="0" y2="20" stroke="#22C55E" stroke-width="3"/>
                    <line x1="30" y1="-20" x2="30" y2="20" stroke="#22C55E" stroke-width="3"/>
                    <text x="15" y="40" text-anchor="middle" font-size="14" font-weight="bold" fill="#22C55E">C = {{ capacitance }} µF</text>
                  </g>
                  
                  <!-- Resistor (right) -->
                  <g transform="translate(390, 120)">
                    <path d="M0 0 L10 -10 L20 10 L30 -10 L40 10 L50 -10 L60 10 L70 -10 L80 10 L80 30 L-10 30 L-10 0" 
                      fill="none" stroke="#EF4444" stroke-width="2"/>
                    <text x="35" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">R = {{ resistance }}Ω</text>
                  </g>
                  
                  <!-- Current flow indicator -->
                  <g v-if="isRunning && Math.abs(current) > 0.01">
                    <circle cx="250" cy="50" r="8" fill="#F59E0B" opacity="0.8">
                      <animate 
                        :dur="`${(1 / resonantFreq).toFixed(3)}s`"
                        attributeName="opacity"
                        values="0.8;0.2;0.8"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text x="250" y="30" text-anchor="middle" font-size="11" font-weight="bold" fill="#F59E0B">
                      I = {{ current.toFixed(3) }} A
                    </text>
                  </g>
                  
                  <!-- Voltage indicators -->
                  <text x="80" y="155" text-anchor="end" font-size="12" font-weight="bold" fill="#3B82F6">
                    V_C = {{ capacitorVoltage.toFixed(2) }} V
                  </text>
                  <text x="420" y="90" text-anchor="start" font-size="12" font-weight="bold" fill="#8B5CF6">
                    V_L = {{ inductorVoltage.toFixed(2) }} V
                  </text>
                  
                  <!-- Energy bars -->
                  <g transform="translate(50, 80)">
                    <text x="0" y="0" font-size="10" fill="#22C55E">E_C</text>
                    <rect x="0" y="10" width="20" :height="capacitorEnergy * 2" fill="#22C55E" opacity="0.7"/>
                    <rect x="0" y="10" width="20" height="80" fill="none" stroke="#22C55E" stroke-width="1"/>
                  </g>
                  
                  <g transform="translate(50, 180)">
                    <text x="0" y="0" font-size="10" fill="#8B5CF6">E_L</text>
                    <rect x="0" y="10" width="20" :height="inductorEnergy * 2" fill="#8B5CF6" opacity="0.7"/>
                    <rect x="0" y="10" width="20" height="80" fill="none" stroke="#8B5CF6" stroke-width="1"/>
                  </g>
                  
                  <!-- Total energy indicator -->
                  <g transform="translate(430, 80)">
                    <text x="0" y="0" font-size="11" font-weight="bold" fill="#F59E0B">Total Energy</text>
                    <text x="0" y="20" font-size="14" font-weight="bold" fill="#F59E0B">{{ totalEnergy.toFixed(4) }} J</text>
                    <text x="0" y="40" font-size="10" fill="#F59E0B">{{ energyLossPercent.toFixed(1) }}% loss</text>
                  </g>
                </svg>
              </div>
            </div>
            
            <!-- Waveforms -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Voltage & Current Waveforms
              </h3>
              
              <div class="flex justify-center">
                <svg viewBox="0 0 800 350" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                  <!-- Grid -->
                  <defs>
                    <pattern id="waveGrid" width="40" height="35" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 35" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                    </pattern>
                  </defs>
                  <rect x="60" y="30" width="700" height="260" fill="url(#waveGrid)" />
                  
                  <!-- Axes -->
                  <line x1="60" y1="30" x2="60" y2="290" stroke="#374151" stroke-width="2"/>
                  <line x1="60" y1="160" x2="760" y2="160" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Y-axis labels -->
                  <text x="50" y="295" text-anchor="end" font-size="11" fill="#6B7280">-V₀</text>
                  <text x="50" y="225" text-anchor="end" font-size="11" fill="#6B7280">-V₀/2</text>
                  <text x="50" y="165" text-anchor="end" font-size="11" fill="#6B7280">0</text>
                  <text x="50" y="100" text-anchor="end" font-size="11" fill="#6B7280">+V₀/2</text>
                  <text x="50" y="35" text-anchor="end" font-size="11" fill="#6B7280">+V₀</text>
                  <text x="25" y="160" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151" transform="rotate(-90, 25, 160)">Voltage (V) / Current (mA)</text>
                  
                  <!-- X-axis labels -->
                  <text x="60" y="310" text-anchor="middle" font-size="11" fill="#6B7280">0</text>
                  <text x="235" y="310" text-anchor="middle" font-size="11" fill="#6B7280">T/4</text>
                  <text x="410" y="310" text-anchor="middle" font-size="11" fill="#6B7280">T/2</text>
                  <text x="585" y="310" text-anchor="middle" font-size="11" fill="#6B7280">3T/4</text>
                  <text x="760" y="310" text-anchor="middle" font-size="11" fill="#6B7280">T</text>
                  <text x="410" y="335" text-anchor="middle" font-size="12" font-weight="bold" fill="#374151">Time</text>
                  
                  <!-- Voltage waveform (Capacitor) -->
                  <path 
                    :d="voltageWaveform"
                    fill="none"
                    stroke="#22C55E"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  
                  <!-- Current waveform -->
                  <path 
                    :d="currentWaveform"
                    fill="none"
                    stroke="#3B82F6"
                    stroke-width="2.5"
                    stroke-dasharray="5,5"
                    stroke-linecap="round"
                    opacity="0.8"
                  />
                  
                  <!-- Current time indicator -->
                  <line v-if="isRunning" :x1="currentTimeX" y1="30" :x2="currentTimeX" y2="290" 
                    stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,5" opacity="0.7"/>
                  <circle v-if="isRunning" :cx="currentTimeX" :cy="currentVoltageY" r="5" fill="#22C55E" stroke="white" stroke-width="1"/>
                  
                  <!-- Legend -->
                  <g transform="translate(600, 45)">
                    <rect x="0" y="0" width="150" height="60" fill="white" fill-opacity="0.9" rx="5"/>
                    <line x1="10" y1="15" x2="40" y2="15" stroke="#22C55E" stroke-width="2.5"/>
                    <text x="50" y="20" font-size="11" font-weight="bold" fill="#374151">Voltage (V_C)</text>
                    <line x1="10" y1="40" x2="40" y2="40" stroke="#3B82F6" stroke-width="2.5" stroke-dasharray="5,5"/>
                    <text x="50" y="45" font-size="11" font-weight="bold" fill="#374151">Current (I×100)</text>
                  </g>
                </svg>
              </div>
            </div>
            
            <!-- Phasor Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Energy Phasor Diagram
              </h3>
              
              <div class="flex justify-center">
                <svg viewBox="0 0 400 400" class="w-full max-w-md h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                  <!-- Circle -->
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#374151" stroke-width="1" stroke-dasharray="5,5" opacity="0.5"/>
                  
                  <!-- Axes -->
                  <line x1="200" y1="70" x2="200" y2="330" stroke="#374151" stroke-width="1" opacity="0.3"/>
                  <line x1="70" y1="200" x2="330" y2="200" stroke="#374151" stroke-width="1" opacity="0.3"/>
                  
                  <!-- Capacitor Energy Phasor -->
                  <line x1="200" y1="200" :x2="capacitorPhasorX" :y2="capacitorPhasorY" 
                    stroke="#22C55E" stroke-width="4" stroke-linecap="round"/>
                  <circle :cx="capacitorPhasorX" :cy="capacitorPhasorY" r="8" fill="#22C55E"/>
                  <text :x="capacitorPhasorX + 15" :y="capacitorPhasorY" font-size="12" font-weight="bold" fill="#22C55E">
                    E_C
                  </text>
                  
                  <!-- Inductor Energy Phasor -->
                  <line x1="200" y1="200" :x2="inductorPhasorX" :y2="inductorPhasorY" 
                    stroke="#8B5CF6" stroke-width="4" stroke-linecap="round"/>
                  <circle :cx="inductorPhasorX" :cy="inductorPhasorY" r="8" fill="#8B5CF6"/>
                  <text :x="inductorPhasorX + 15" :y="inductorPhasorY" font-size="12" font-weight="bold" fill="#8B5CF6">
                    E_L
                  </text>
                  
                  <!-- Phase angle arc -->
                  <path d="M 250 200 A 50 50 0 0 1 246 180" fill="none" stroke="#F59E0B" stroke-width="2"/>
                  <text x="260" y="185" font-size="11" font-weight="bold" fill="#F59E0B">
                    {{ currentPhase.toFixed(0) }}°
                  </text>
                  
                  <!-- Center label -->
                  <text x="200" y="350" text-anchor="middle" font-size="12" fill="#6B7280">
                    Energy Exchange (90° phase shift)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Educational Content -->
        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            How LC Tank Circuits Work
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Energy Oscillation</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Capacitor stores energy</strong> in electric field: E = ½CV²</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Inductor stores energy</strong> in magnetic field: E = ½LI²</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Energy oscillates</strong> between C and L at resonant frequency</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>90° phase shift:</strong> When V_C is max, I is 0 (and vice versa)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Damping & Resistance</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>R > 0:</strong> Energy dissipates as heat (I²R losses)</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Damping factor α = R/(2L):</strong> Higher R → faster decay</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Q factor:</strong> Ratio of stored to dissipated energy per cycle</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Q > 10:</strong> Underdamped (oscillates with decay)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
            <div class="flex items-start gap-3">
              <svg class="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h5 class="font-semibold text-gray-900 dark:text-white mb-1">Applications</h5>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  LC tank circuits are fundamental in RF oscillators, filters, tuning circuits, and resonance-based sensors. 
                  The resonant frequency determines the selectivity and tuning range of the circuit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p class="mb-2">LC Tank Circuit Oscillator - Cyno Electric</p>
        <p class="text-sm">Interactive simulation of energy oscillation and resonance</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Circuit parameters
const inductance = ref(10) // mH
const capacitance = ref(100) // µF
const resistance = ref(1) // Ohms
const initialVoltage = ref(10) // Volts

// Simulation state
const isRunning = ref(false)
const simulationSpeed = ref(1)
const currentTime = ref(0)
const animationFrame = ref(null)
const lastTime = ref(0)

// Circuit state
const capacitorVoltage = ref(initialVoltage.value)
const current = ref(0)
const inductorVoltage = ref(0)

// Calculated circuit properties
const resonantFreq = computed(() => {
  const L = inductance.value * 1e-3 // Convert mH to H
  const C = capacitance.value * 1e-6 // Convert µF to F
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

const angularFreq = computed(() => {
  return 2 * Math.PI * resonantFreq.value
})

const period = computed(() => {
  return 1 / resonantFreq.value
})

const dampingFactor = computed(() => {
  const L = inductance.value * 1e-3
  return resistance.value / (2 * L)
})

const qualityFactor = computed(() => {
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const w0 = angularFreq.value
  return w0 * L / resistance.value
})

// Energy calculations
const capacitorEnergy = computed(() => {
  const C = capacitance.value * 1e-6
  return 0.5 * C * capacitorVoltage.value ** 2
})

const inductorEnergy = computed(() => {
  const L = inductance.value * 1e-3
  return 0.5 * L * current.value ** 2
})

const totalEnergy = computed(() => {
  return capacitorEnergy.value + inductorEnergy.value
})

const initialEnergy = computed(() => {
  const C = capacitance.value * 1e-6
  return 0.5 * C * initialVoltage.value ** 2
})

const energyLossPercent = computed(() => {
  return ((1 - totalEnergy.value / initialEnergy.value) * 100)
})

// Waveform generation for chart
const voltageWaveform = computed(() => {
  const points = []
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const R = resistance.value
  const V0 = initialVoltage.value
  const alpha = R / (2 * L)
  const omega = Math.sqrt(1 / (L * C) - alpha ** 2)
  
  for (let i = 0; i <= 700; i++) {
    const t = (i / 700) * period.value * 2 // Show 2 periods
    let v = 0
    
    if (R === 0) {
      // Undamped oscillation
      v = V0 * Math.cos(Math.sqrt(1 / (L * C)) * t)
    } else if (alpha < Math.sqrt(1 / (L * C))) {
      // Underdamped
      v = V0 * Math.exp(-alpha * t) * Math.cos(omega * t)
    } else {
      // Overdamped or critically damped
      v = V0 * Math.exp(-alpha * t)
    }
    
    const x = 60 + i
    const y = 160 - (v / V0) * 100
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

const currentWaveform = computed(() => {
  const points = []
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const R = resistance.value
  const V0 = initialVoltage.value
  const alpha = R / (2 * L)
  const omega = Math.sqrt(1 / (L * C) - alpha ** 2)
  const maxCurrent = V0 / Math.sqrt(L / C) // Approximate max current for scaling
  
  for (let i = 0; i <= 700; i++) {
    const t = (i / 700) * period.value * 2
    let i_val = 0
    
    if (R === 0) {
      i_val = -V0 / Math.sqrt(L / C) * Math.sin(Math.sqrt(1 / (L * C)) * t)
    } else if (alpha < Math.sqrt(1 / (L * C))) {
      i_val = -V0 * Math.exp(-alpha * t) * (omega * Math.sin(omega * t) + alpha * Math.cos(omega * t)) / (omega * L)
    }
    
    // Scale current to fit on chart (multiply by 100 for mA-like scale)
    const x = 60 + i
    const y = 160 - (i_val / maxCurrent) * 100
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
})

// Current time indicator position
const currentTimeX = computed(() => {
  const t = currentTime.value % (period.value * 2)
  return 60 + (t / (period.value * 2)) * 700
})

const currentVoltageY = computed(() => {
  const V0 = initialVoltage.value
  return 160 - (capacitorVoltage.value / V0) * 100
})

// Phasor calculations
const currentPhase = computed(() => {
  return (currentTime.value / period.value) * 360 % 360
})

const capacitorPhasorX = computed(() => {
  const angle = (currentPhase.value * Math.PI) / 180
  const magnitude = (capacitorEnergy.value / initialEnergy.value) * 100
  return 200 + magnitude * Math.cos(angle)
})

const capacitorPhasorY = computed(() => {
  const angle = (currentPhase.value * Math.PI) / 180
  const magnitude = (capacitorEnergy.value / initialEnergy.value) * 100
  return 200 - magnitude * Math.sin(angle)
})

const inductorPhasorX = computed(() => {
  const angle = ((currentPhase.value + 90) * Math.PI) / 180
  const magnitude = (inductorEnergy.value / initialEnergy.value) * 100
  return 200 + magnitude * Math.cos(angle)
})

const inductorPhasorY = computed(() => {
  const angle = ((currentPhase.value + 90) * Math.PI) / 180
  const magnitude = (inductorEnergy.value / initialEnergy.value) * 100
  return 200 - magnitude * Math.sin(angle)
})

// Simulation loop
const updateSimulation = (timestamp) => {
  if (!lastTime.value) lastTime.value = timestamp
  const deltaTime = (timestamp - lastTime.value) / 1000 // Convert to seconds
  lastTime.value = timestamp
  
  const L = inductance.value * 1e-3
  const C = capacitance.value * 1e-6
  const R = resistance.value
  const V0 = initialVoltage.value
  const alpha = R / (2 * L)
  
  // Advance time (scaled by simulation speed)
  currentTime.value += deltaTime * simulationSpeed.value
  
  // Calculate voltage and current at current time
  if (R === 0) {
    // Undamped oscillation
    const w0 = Math.sqrt(1 / (L * C))
    capacitorVoltage.value = V0 * Math.cos(w0 * currentTime.value)
    current.value = -V0 / Math.sqrt(L / C) * Math.sin(w0 * currentTime.value)
  } else if (alpha < Math.sqrt(1 / (L * C))) {
    // Underdamped
    const omega = Math.sqrt(1 / (L * C) - alpha ** 2)
    capacitorVoltage.value = V0 * Math.exp(-alpha * currentTime.value) * Math.cos(omega * currentTime.value)
    current.value = -V0 * Math.exp(-alpha * currentTime.value) * 
      (omega * Math.sin(omega * currentTime.value) + alpha * Math.cos(omega * currentTime.value)) / (omega * L)
  } else {
    // Overdamped or critically damped
    capacitorVoltage.value = V0 * Math.exp(-alpha * currentTime.value)
    current.value = 0
  }
  
  // Calculate inductor voltage (L * di/dt)
  inductorVoltage.value = -capacitorVoltage.value - current.value * R
  
  if (isRunning.value) {
    animationFrame.value = requestAnimationFrame(updateSimulation)
  }
}

const startSimulation = () => {
  if (!isRunning.value) {
    isRunning.value = true
    lastTime.value = 0
    if (currentTime.value >= period.value * 4) {
      // Reset if simulation has run for a while
      currentTime.value = 0
    }
    animationFrame.value = requestAnimationFrame(updateSimulation)
  }
}

const resetSimulation = () => {
  isRunning.value = false
  currentTime.value = 0
  capacitorVoltage.value = initialVoltage.value
  current.value = 0
  inductorVoltage.value = 0
  lastTime.value = 0
  
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
}

// Watch for parameter changes during simulation
watch([inductance, capacitance, resistance, initialVoltage], () => {
  if (isRunning.value) {
    // Reset simulation when parameters change
    resetSimulation()
  }
})

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-highlight {
  color: var(--tw-color-primary-dark) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

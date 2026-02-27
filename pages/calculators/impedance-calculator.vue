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
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Impedance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate total impedance in AC circuits with resistance, inductance, and capacitance
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">Z</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">√(</span>
              <span class="text-primary">R²</span>
              <span class="text-gray-400">+</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary">Xₗ</span>
              <span class="text-gray-400">−</span>
              <span class="text-primary">X꜀</span>
              <span class="text-gray-400">)²</span>
              <span class="text-gray-400">)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Input Controls -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
              <!-- Resistance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="resistance"
                    type="number" 
                    step="0.1"
                    min="0"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter resistance"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">Ω</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="0"
                  max="1000"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pure resistance of the circuit</p>
              </div>

              <!-- Inductance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inductance (L)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inductance"
                    type="number" 
                    step="0.1"
                    min="0"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter inductance"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">mH</span>
                </div>
                <input 
                  v-model.number="inductance"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Inductor value (0 if none)</p>
              </div>

              <!-- Capacitance Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitance (C)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="capacitance"
                    type="number" 
                    step="0.1"
                    min="0"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter capacitance"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">µF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Capacitor value (0 if none)</p>
              </div>

              <!-- Frequency Input -->
              <div class="mb-8">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency (f)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="frequency"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter frequency"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">Hz</span>
                </div>
                <input 
                  v-model.number="frequency"
                  type="range"
                  min="0.1"
                  max="1000"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">AC supply frequency</p>
              </div>

              <!-- Quick Presets -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setPreset('powerline')"
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                  >
                    🏠 Power Line
                  </button>
                  <button 
                    @click="setPreset('audio')"
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                  >
                    🎵 Audio
                  </button>
                  <button 
                    @click="setPreset('radio')"
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                  >
                    📻 Radio FM
                  </button>
                  <button 
                    @click="setPreset('rf')"
                    class="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-all"
                  >
                    📡 RF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results and Visualization -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Results Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Total Impedance -->
              <div class="bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 rounded-2xl shadow-xl p-6 border-2 border-primary/30">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Impedance (Z)</span>
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="text-4xl font-extrabold text-primary-dark mb-2">
                  {{ impedance > 0 ? impedance.toFixed(2) : '0.00' }} Ω
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Total opposition to current flow
                </div>
              </div>

              <!-- Phase Angle -->
              <div class="bg-gradient-to-br from-purple-500/20 to-purple-500/5 dark:from-purple-500/10 dark:to-purple-500/5 rounded-2xl shadow-xl p-6 border-2 border-purple-500/30">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Phase Angle (φ)</span>
                  <svg class="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div class="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">
                  {{ phaseAngle > 0 ? '+' : '' }}{{ phaseAngle.toFixed(1) }}°
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ phaseAngleText }}
                </div>
              </div>

              <!-- Inductive Reactance -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-green-500/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Inductive Reactance (Xₗ)</span>
                  <span class="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-semibold">+j</span>
                </div>
                <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {{ inductiveReactance > 0 ? inductiveReactance.toFixed(2) : '0.00' }} Ω
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Xₗ = 2πfL
                </div>
              </div>

              <!-- Capacitive Reactance -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-pink-500/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Capacitive Reactance (X꜀)</span>
                  <span class="text-xs px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 rounded-full font-semibold">-j</span>
                </div>
                <div class="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  {{ capacitiveReactance > 0 ? capacitiveReactance.toFixed(2) : '0.00' }} Ω
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  X꜀ = 1/(2πfC)
                </div>
              </div>
            </div>

            <!-- Phasor Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Phasor Diagram
              </h3>
              <div class="flex justify-center">
                <svg viewBox="0 0 400 300" class="w-full max-w-md">
                  <!-- Background -->
                  <rect x="0" y="0" width="400" height="300" fill="transparent"/>
                  
                  <!-- Grid -->
                  <defs>
                    <pattern id="phasorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                    </pattern>
                  </defs>
                  <rect x="50" y="30" width="300" height="240" fill="url(#phasorGrid)" />
                  
                  <!-- Axes -->
                  <line x1="50" y1="150" x2="350" y2="150" stroke="#4B5563" stroke-width="2"/>
                  <line x1="200" y1="30" x2="200" y2="270" stroke="#4B5563" stroke-width="2"/>
                  
                  <!-- Axis labels -->
                  <text x="350" y="165" text-anchor="end" class="text-xs font-semibold fill-gray-500">Resistance (R)</text>
                  <text x="210" y="40" text-anchor="start" class="text-xs font-semibold fill-gray-500">Reactance (X)</text>
                  
                  <!-- Origin -->
                  <circle cx="200" cy="150" r="3" fill="#6B7280"/>
                  
                  <!-- Resistance vector (horizontal) -->
                  <line 
                    x1="200" 
                    y1="150" 
                    :x2="200 + Math.min(resistance * 0.3, 130)" 
                    y2="150" 
                    stroke="#8B5CF6" 
                    stroke-width="3"
                    class="transition-all duration-300"
                  />
                  <text 
                    :x="200 + Math.min(resistance * 0.3, 130) / 2" 
                    y="140" 
                    text-anchor="middle" 
                    class="text-xs font-bold fill-purple-500"
                  >
                    R
                  </text>
                  
                  <!-- Net reactance vector (vertical) -->
                  <g v-if="Math.abs(netReactance) > 0.1">
                    <line 
                      x1="200" 
                      y1="150" 
                      x2="200" 
                      :y2="150 - Math.min(netReactance * 0.3, netReactance > 0 ? 100 : -100)" 
                      stroke="#EC4899" 
                      stroke-width="3"
                      stroke-dasharray="5,5"
                      class="transition-all duration-300"
                    />
                    <text 
                      x="210" 
                      :y="150 - Math.min(netReactance * 0.3, netReactance > 0 ? 100 : -100) / 2" 
                      text-anchor="start" 
                      class="text-xs font-bold"
                      :class="netReactance > 0 ? 'fill-green-500' : 'fill-pink-500'"
                    >
                      {{ netReactance > 0 ? 'Xₗ' : 'X꜀' }}
                    </text>
                  </g>
                  
                  <!-- Impedance vector (resultant) -->
                  <line 
                    v-if="impedance > 0"
                    x1="200" 
                    y1="150" 
                    :x2="200 + Math.min(resistance * 0.3, 130)" 
                    :y2="150 - Math.min(netReactance * 0.3, netReactance > 0 ? 100 : -100)" 
                    stroke="#9FA8DA" 
                    stroke-width="4"
                    class="transition-all duration-300"
                  />
                  
                  <!-- Phase angle arc -->
                  <path 
                    v-if="Math.abs(phaseAngle) > 1"
                    :d="generatePhaseArc()" 
                    fill="none" 
                    stroke="#F59E0B" 
                    stroke-width="2"
                    stroke-dasharray="3,3"
                  />
                  <text 
                    v-if="Math.abs(phaseAngle) > 1"
                    :x="220 + Math.min(resistance * 0.15, 50)" 
                    :y="140 - Math.min(netReactance * 0.1, netReactance > 0 ? 30 : -30)" 
                    class="text-xs font-bold fill-amber-500"
                  >
                    {{ phaseAngle > 0 ? '+' : '' }}{{ phaseAngle.toFixed(1) }}°
                  </text>
                  
                  <!-- Impedance label -->
                  <text 
                    v-if="impedance > 0"
                    :x="200 + Math.min(resistance * 0.3, 130) + 10" 
                    :y="150 - Math.min(netReactance * 0.3, netReactance > 0 ? 100 : -100) - 10" 
                    text-anchor="start" 
                    class="text-sm font-bold fill-primary"
                  >
                    Z = {{ impedance.toFixed(1) }}Ω
                  </text>
                </svg>
              </div>
            </div>

            <!-- Calculation Steps -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculation Steps
              </h3>
              
              <div class="space-y-4 font-mono text-sm">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-gray-600 dark:text-gray-400 mb-2">// Calculate reactances</div>
                  <div class="text-gray-900 dark:text-white">
                    Xₗ = 2π × {{ frequency }} Hz × {{ (inductance * 1e-3).toFixed(4) }} H
                  </div>
                  <div class="text-green-600 dark:text-green-400 font-semibold">
                    Xₗ = {{ inductiveReactance.toFixed(4) }} Ω
                  </div>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-gray-600 dark:text-gray-400 mb-2">// Calculate capacitive reactance</div>
                  <div class="text-gray-900 dark:text-white">
                    X꜀ = 1 / (2π × {{ frequency }} Hz × {{ (capacitance * 1e-6).toFixed(4) }} F)
                  </div>
                  <div class="text-pink-600 dark:text-pink-400 font-semibold">
                    X꜀ = {{ capacitiveReactance.toFixed(4) }} Ω
                  </div>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-gray-600 dark:text-gray-400 mb-2">// Calculate net reactance</div>
                  <div class="text-gray-900 dark:text-white">
                    X = Xₗ - X꜀ = {{ inductiveReactance.toFixed(4) }} - {{ capacitiveReactance.toFixed(4) }}
                  </div>
                  <div :class="netReactance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-pink-600 dark:text-pink-400'" class="font-semibold">
                    X = {{ netReactance.toFixed(4) }} Ω {{ netReactance >= 0 ? '(inductive)' : '(capacitive)' }}
                  </div>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-gray-600 dark:text-gray-400 mb-2">// Calculate impedance</div>
                  <div class="text-gray-900 dark:text-white">
                    Z = √(R² + X²) = √({{ resistance }}² + {{ netReactance.toFixed(4) }}²)
                  </div>
                  <div class="text-primary-dark dark:text-primary-light font-semibold">
                    Z = {{ impedance.toFixed(4) }} Ω
                  </div>
                </div>
                
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-gray-600 dark:text-gray-400 mb-2">// Calculate phase angle</div>
                  <div class="text-gray-900 dark:text-white">
                    φ = arctan(X/R) = arctan({{ netReactance.toFixed(4) }} / {{ resistance }})
                  </div>
                  <div class="text-purple-600 dark:text-purple-400 font-semibold">
                    φ = {{ phaseAngle > 0 ? '+' : '' }}{{ phaseAngle.toFixed(4) }}°
                  </div>
                </div>
              </div>
            </div>

            <!-- Circuit Info -->
            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl shadow-xl p-6 border border-blue-500/20">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Circuit Characteristics</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Circuit Type:</span>
                  <span class="ml-2 font-semibold" :class="circuitTypeColor">{{ circuitType }}</span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Power Factor:</span>
                  <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ powerFactor.toFixed(3) }}</span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">Current leads voltage:</span>
                  <span class="ml-2 font-semibold" :class="phaseAngle < 0 ? 'text-green-600' : 'text-red-600'">
                    {{ phaseAngle < 0 ? 'Yes' : 'No' }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-600 dark:text-gray-400">At resonance:</span>
                  <span class="ml-2 font-semibold" :class="Math.abs(netReactance) < 0.1 ? 'text-green-600' : 'text-gray-900 dark:text-white'">
                    {{ Math.abs(netReactance) < 0.1 ? 'Yes (Xₗ = X꜀)' : 'No' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Impedance
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Impedance?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Impedance (Z) is the total opposition a circuit offers to alternating current. It combines resistance (R) 
              and reactance (X) in a complex quantity that depends on frequency.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Concepts:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Resistance (R):</strong> Real component, independent of frequency, dissipates power as heat</li>
              <li><strong>Inductive Reactance (Xₗ):</strong> Imaginary component (+j), increases with frequency (Xₗ = 2πfL)</li>
              <li><strong>Capacitive Reactance (X꜀):</strong> Imaginary component (-j), decreases with frequency (X꜀ = 1/(2πfC))</li>
              <li><strong>Phase Angle (φ):</strong> Angle between voltage and current, positive = inductive, negative = capacitive</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Behaviors:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4 space-y-2">
              <div><strong>Inductive (φ > 0):</strong> Xₗ > X꜀, current lags voltage</div>
              <div><strong>Capacitive (φ < 0):</strong> X꜀ > Xₗ, current leads voltage</div>
              <div><strong>Resistive (φ = 0):</strong> Xₗ = X꜀, at resonance, Z = R (minimum)</div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Filter design (low-pass, high-pass, band-pass)</li>
              <li>Impedance matching in RF systems</li>
              <li>Power factor correction</li>
              <li>Audio crossover networks</li>
              <li>Motor control circuits</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Impedance Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate impedance in AC circuits with resistance, inductance, and capacitance. Interactive phasor diagram and step-by-step calculations.' },
    { name: 'keywords', content: 'impedance calculator, AC circuit, reactance, phase angle, phasor diagram' }
  ]
})

const colorMode = useColorMode()

// Input values
const resistance = ref(100)
const inductance = ref(10)  // mH
const capacitance = ref(10)  // µF
const frequency = ref(50)  // Hz

// Calculated values
const inductiveReactance = computed(() => {
  if (inductance.value === 0) return 0
  const L = inductance.value * 1e-3  // Convert to H
  return 2 * Math.PI * frequency.value * L
})

const capacitiveReactance = computed(() => {
  if (capacitance.value === 0) return Infinity
  const C = capacitance.value * 1e-6  // Convert to F
  return 1 / (2 * Math.PI * frequency.value * C)
})

const netReactance = computed(() => {
  const xc = capacitiveReactance.value === Infinity ? 0 : capacitiveReactance.value
  return inductiveReactance.value - xc
})

const impedance = computed(() => {
  return Math.sqrt(resistance.value ** 2 + netReactance.value ** 2)
})

const phaseAngle = computed(() => {
  if (resistance.value === 0) return netReactance.value > 0 ? 90 : -90
  return Math.atan(netReactance.value / resistance.value) * (180 / Math.PI)
})

const phaseAngleText = computed(() => {
  const absAngle = Math.abs(phaseAngle.value)
  if (absAngle < 1) return 'Purely resistive'
  if (phaseAngle.value > 0) return 'Inductive (current lags)'
  return 'Capacitive (current leads)'
})

const circuitType = computed(() => {
  const absAngle = Math.abs(phaseAngle.value)
  if (absAngle < 1) return 'Resistive'
  if (phaseAngle.value > 0) return 'Inductive'
  return 'Capacitive'
})

const circuitTypeColor = computed(() => {
  const type = circuitType.value
  if (type === 'Resistive') return 'text-purple-600 dark:text-purple-400'
  if (type === 'Inductive') return 'text-green-600 dark:text-green-400'
  return 'text-pink-600 dark:text-pink-400'
})

const powerFactor = computed(() => {
  if (impedance.value === 0) return 1
  return resistance.value / impedance.value
})

// Helper functions
const generatePhaseArc = () => {
  const angleRad = phaseAngle.value * (Math.PI / 180)
  const radius = 30
  const startAngle = 0
  const endAngle = -angleRad
  
  const x1 = 200 + radius * Math.cos(startAngle)
  const y1 = 150 - radius * Math.sin(startAngle)
  const x2 = 200 + radius * Math.cos(endAngle)
  const y2 = 150 - radius * Math.sin(endAngle)
  
  const largeArc = Math.abs(angleRad) > Math.PI ? 1 : 0
  const sweep = angleRad < 0 ? 1 : 0
  
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`
}

const setPreset = (preset: string) => {
  switch (preset) {
    case 'powerline':
      frequency.value = 50
      resistance.value = 100
      inductance.value = 50
      capacitance.value = 20
      break
    case 'audio':
      frequency.value = 1000
      resistance.value = 8
      inductance.value = 1
      capacitance.value = 50
      break
    case 'radio':
      frequency.value = 100000000
      resistance.value = 50
      inductance.value = 0.1
      capacitance.value = 0.01
      break
    case 'rf':
      frequency.value = 2450000000
      resistance.value = 50
      inductance.value = 0.01
      capacitance.value = 0.001
      break
  }
}
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

.text-primary-dark {
  color: var(--tw-color-primary-dark) !important;
}

.text-primary-light {
  color: var(--tw-color-primary-light) !important;
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
  background: var(--tw-color-primary);
  cursor: pointer;
  border-radius: 50%;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--tw-color-primary);
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>

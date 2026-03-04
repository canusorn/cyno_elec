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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RC Phase Shift Oscillator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore how cascaded RC networks create oscillation through phase shift and positive feedback
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-lg font-mono font-bold">
              <span class="text-primary">f₀</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">1</span>
              <span class="text-gray-400">/</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary">2πRC</span>
              <span class="text-gray-400">√</span>
              <span class="text-primary">6</span>
              <span class="text-gray-400">)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulation Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Control Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
              <!-- Resistance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="resistance"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    max="1000"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter R"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">kΩ</span>
                </div>
                <input 
                  v-model.number="resistance"
                  type="range"
                  min="1"
                  max="100"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">RC network resistance</p>
              </div>

              <!-- Capacitance -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacitance (C)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="capacitance"
                    type="number" 
                    step="0.1"
                    min="0.001"
                    max="100"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter C"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">nF</span>
                </div>
                <input 
                  v-model.number="capacitance"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">RC network capacitance</p>
              </div>

              <!-- Amplifier Gain -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amplifier Gain (A)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="amplifierGain"
                    type="number" 
                    step="0.1"
                    min="1"
                    max="50"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter gain"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12 text-lg font-semibold">××</span>
                </div>
                <input 
                  v-model.number="amplifierGain"
                  type="range"
                  min="1"
                  max="35"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be ≥ 29 for 3-stage oscillation</p>
              </div>

              <!-- Test Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Frequency
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="testFrequency"
                    type="number" 
                    step="10"
                    min="10"
                    max="10000"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter freq"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16 text-lg font-semibold">Hz</span>
                </div>
                <input 
                  v-model.number="testFrequency"
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Frequency to analyze (blue line)</p>
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Presets
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="preset in frequencyPresets"
                    :key="preset.name"
                    @click="applyPreset(preset)"
                    class="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-semibold transition-all"
                  >
                    {{ preset.name }}
                  </button>
                </div>
              </div>

              <!-- Animation Controls -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Animation Controls</h4>
                <div class="flex gap-3">
                  <button 
                    @click="toggleAnimation"
                    :class="isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                    class="flex-1 px-4 py-3 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <svg v-if="!isPlaying" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    {{ isPlaying ? 'Pause' : 'Play' }}
                  </button>
                  <button 
                    @click="resetAnimation"
                    class="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualizations -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Oscillator Status -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Oscillator Status
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Resonant Frequency -->
                <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Resonant Frequency</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ resonantFrequency }} Hz
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    f₀ = 1/(2πRC√6)
                  </div>
                </div>

                <!-- Oscillation Status -->
                <div class="rounded-xl p-6" :class="oscillationStatus.bg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Oscillation Status</div>
                  <div class="text-4xl font-bold mb-2" :class="oscillationStatus.text">
                    {{ oscillationStatus.label }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ oscillationStatus.detail }}
                  </div>
                </div>

                <!-- Phase Shift at f₀ -->
                <div class="bg-gradient-to-br from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Phase Shift at f₀</div>
                  <div class="text-4xl font-bold text-purple-500 mb-2">
                    180°
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Three RC stages × 60° each
                  </div>
                </div>

                <!-- Loop Gain -->
                <div class="rounded-xl p-6" :class="loopGainStatus.bg">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Loop Gain (A×β)</div>
                  <div class="text-4xl font-bold mb-2" :class="loopGainStatus.text">
                    {{ loopGain }}
                  </div>
                  <div class="text-sm" :class="loopGainStatus.textSub">
                    {{ loopGainStatus.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase Response Plot -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Phase Shift vs Frequency</h3>
              <div class="relative">
                <canvas ref="phaseCanvas" class="w-full rounded-xl" height="250"></canvas>
              </div>
              <div class="mt-4 flex items-center justify-center gap-6 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-orange-500 rounded"></div>
                  <span class="text-gray-600 dark:text-gray-400">Phase Shift</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-blue-500 rounded"></div>
                  <span class="text-gray-600 dark:text-gray-400">Test Frequency</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-red-500 rounded"></div>
                  <span class="text-gray-600 dark:text-gray-400">f₀ (180°)</span>
                </div>
              </div>
            </div>

            <!-- Output Waveform -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Output Waveform</h3>
              <div class="relative">
                <canvas ref="waveformCanvas" class="w-full rounded-xl" height="180"></canvas>
              </div>
              <div v-if="isOscillating" class="mt-4 text-center">
                <span class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Oscillating at {{ resonantFrequency }} Hz
                </span>
              </div>
              <div v-else class="mt-4 text-center">
                <span class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-semibold">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  Not oscillating - gain too low
                </span>
              </div>
            </div>

            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">RC Phase Shift Circuit</h3>
              <div class="flex justify-center">
                <svg viewBox="0 0 500 250" class="w-full max-w-2xl">
                  <!-- Background -->
                  <rect width="500" height="250" fill="transparent"/>
                  
                  <!-- Title -->
                  <text x="250" y="25" text-anchor="middle" class="text-lg font-bold" fill="currentColor">3-Stage RC Phase Shift Oscillator</text>
                  
                  <!-- Inverting Amplifier -->
                  <polygon points="100,110 100,150 160,130" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="115" y="135" class="text-xs font-bold" fill="currentColor" text-anchor="middle">-A</text>
                  <text x="130" y="165" class="text-xs" fill="currentColor" text-anchor="middle">A = {{ amplifierGain }}</text>
                  
                  <!-- Input to amplifier -->
                  <line x1="20" y1="130" x2="100" y2="130" stroke="currentColor" stroke-width="2"/>
                  <text x="60" y="120" class="text-xs" fill="currentColor" text-anchor="middle">V<sub>in</sub></text>
                  
                  <!-- Output from amplifier -->
                  <line x1="160" y1="130" x2="200" y2="130" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- RC Stage 1 -->
                  <circle cx="200" cy="130" r="4" fill="currentColor"/>
                  <line x1="200" y1="130" x2="200" y2="90" stroke="currentColor" stroke-width="2"/>
                  <rect x="192" y="70" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="200" y="60" class="text-xs font-bold" fill="currentColor" text-anchor="middle">R</text>
                  
                  <line x1="200" y1="70" x2="240" y2="70" stroke="currentColor" stroke-width="2"/>
                  <line x1="230" y1="65" x2="230" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="235" y1="65" x2="235" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="240" y1="70" x2="240" y2="90" stroke="currentColor" stroke-width="2"/>
                  <text x="235" y="55" class="text-xs font-bold" fill="currentColor" text-anchor="middle">C</text>
                  
                  <circle cx="240" cy="130" r="4" fill="currentColor"/>
                  <line x1="240" y1="90" x2="240" y2="130" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- RC Stage 2 -->
                  <line x1="240" y1="130" x2="270" y2="130" stroke="currentColor" stroke-width="2"/>
                  <circle cx="270" cy="130" r="4" fill="currentColor"/>
                  <line x1="270" y1="130" x2="270" y2="90" stroke="currentColor" stroke-width="2"/>
                  <rect x="262" y="70" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="270" y="60" class="text-xs font-bold" fill="currentColor" text-anchor="middle">R</text>
                  
                  <line x1="270" y1="70" x2="310" y2="70" stroke="currentColor" stroke-width="2"/>
                  <line x1="300" y1="65" x2="300" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="305" y1="65" x2="305" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="310" y1="70" x2="310" y2="90" stroke="currentColor" stroke-width="2"/>
                  <text x="305" y="55" class="text-xs font-bold" fill="currentColor" text-anchor="middle">C</text>
                  
                  <circle cx="310" cy="130" r="4" fill="currentColor"/>
                  <line x1="310" y1="90" x2="310" y2="130" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- RC Stage 3 -->
                  <line x1="310" y1="130" x2="340" y2="130" stroke="currentColor" stroke-width="2"/>
                  <circle cx="340" cy="130" r="4" fill="currentColor"/>
                  <line x1="340" y1="130" x2="340" y2="90" stroke="currentColor" stroke-width="2"/>
                  <rect x="332" y="70" width="16" height="8" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="340" y="60" class="text-xs font-bold" fill="currentColor" text-anchor="middle">R</text>
                  
                  <line x1="340" y1="70" x2="380" y2="70" stroke="currentColor" stroke-width="2"/>
                  <line x1="370" y1="65" x2="370" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="375" y1="65" x2="375" y2="75" stroke="currentColor" stroke-width="2"/>
                  <line x1="380" y1="70" x2="380" y2="90" stroke="currentColor" stroke-width="2"/>
                  <text x="375" y="55" class="text-xs font-bold" fill="currentColor" text-anchor="middle">C</text>
                  
                  <circle cx="380" cy="130" r="4" fill="currentColor"/>
                  <line x1="380" y1="90" x2="380" y2="130" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- Output -->
                  <line x1="380" y1="130" x2="450" y2="130" stroke="currentColor" stroke-width="2"/>
                  <text x="415" y="120" class="text-xs font-semibold" fill="currentColor" text-anchor="middle">V<sub>out</sub></text>
                  
                  <!-- Feedback path -->
                  <line x1="450" y1="130" x2="450" y2="180" stroke="currentColor" stroke-width="2"/>
                  <line x1="450" y1="180" x2="20" y2="180" stroke="currentColor" stroke-width="2"/>
                  <line x1="20" y1="180" x2="20" y2="130" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- Ground -->
                  <line x1="200" y1="150" x2="200" y2="170" stroke="currentColor" stroke-width="2"/>
                  <line x1="270" y1="150" x2="270" y2="170" stroke="currentColor" stroke-width="2"/>
                  <line x1="340" y1="150" x2="340" y2="170" stroke="currentColor" stroke-width="2"/>
                  
                  <line x1="195" y1="170" x2="205" y2="170" stroke="currentColor" stroke-width="2"/>
                  <line x1="265" y1="170" x2="275" y2="170" stroke="currentColor" stroke-width="2"/>
                  <line x1="335" y1="170" x2="345" y2="170" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- Phase shift labels -->
                  <text x="220" y="105" class="text-xs" fill="#f97316" text-anchor="middle">φ₁</text>
                  <text x="290" y="105" class="text-xs" fill="#f97316" text-anchor="middle">φ₂</text>
                  <text x="360" y="105" class="text-xs" fill="#f97316" text-anchor="middle">φ₃</text>
                  
                  <!-- Component values -->
                  <text x="490" y="240" class="text-xs font-mono" fill="currentColor" text-anchor="end">
                    R = {{ resistance }}kΩ | C = {{ capacitance }}nF
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding RC Phase Shift Oscillators
          </h3>

          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">How It Works</h4>
              <p class="mb-3">
                The RC phase shift oscillator uses cascaded RC high-pass filter stages to create a total phase shift of 180° at a specific frequency. Combined with an inverting amplifier (which provides another 180° phase shift), the total loop phase shift becomes 360°, satisfying the Barkhausen criterion for oscillation.
              </p>
              <p>
                Each RC stage contributes approximately 60° of phase shift at the oscillation frequency, so three stages are needed for the 180° shift. The feedback attenuation is 1/29, requiring an amplifier gain of at least 29 to maintain oscillations.
              </p>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Formulas</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><strong>Oscillation Frequency:</strong> f₀ = 1/(2πRC√6)</div>
                <div><strong>Phase Shift per Stage:</strong> φ = tan⁻¹(1/(ωRC))</div>
                <div><strong>Total Phase Shift (3 stages):</strong> φ_total = 3 × tan⁻¹(1/(ωRC)) = 180°</div>
                <div><strong>Feedback Attenuation:</strong> β = 1/29 at f₀</div>
                <div><strong>Required Gain:</strong> A ≥ 29</div>
                <div><strong>Loop Gain:</strong> A×β ≥ 1</div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Why Three Stages?</h4>
              <p class="mb-3">
                Each RC high-pass filter can provide a maximum phase shift of 90°, but only at infinite frequency. In practice, we use a finite frequency where each stage contributes 60°:
              </p>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>1 stage:</strong> Max 90° phase shift, insufficient for oscillation</li>
                <li><strong>2 stages:</strong> Max 180° phase shift, but attenuation is too high (A ≥ ∞)</li>
                <li><strong>3 stages:</strong> 180° at practical frequency, A ≥ 29 (achievable)</li>
                <li><strong>4+ stages:</strong> Possible but unnecessary; higher component count</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Design Considerations</h4>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Component matching:</strong> Use matched R and C values for each stage</li>
                <li><strong>Gain margin:</strong> Set gain slightly above 29 for reliable startup</li>
                <li><strong>Amplitude limiting:</strong> Add soft clipping or AGC for stable output</li>
                <li><strong>Buffer stages:</strong> Add op-amp buffers between stages to prevent loading</li>
                <li><strong>Frequency stability:</strong> Use temperature-stable components (NP0/C0G capacitors)</li>
                <li><strong>Frequency range:</strong> Suitable for low to medium frequencies (up to ~100 kHz)</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Applications</h4>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Audio oscillators:</strong> Function generators, musical instruments</li>
                <li><strong>Test equipment:</strong> Low-frequency signal sources</li>
                <li><strong>Electronics education:</strong> Demonstrating oscillator principles</li>
                <li><strong>Simple tone generators:</strong> Buzzers, alarms</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Advantages and Limitations</h4>
              <p class="mb-3"><strong>Advantages:</strong></p>
              <ul class="list-disc list-inside space-y-2 mb-3">
                <li>Simple circuit with common components</li>
                <li>Good frequency stability with quality components</li>
                <li>Low harmonic distortion with amplitude limiting</li>
                <li>Easy to implement with transistors or op-amps</li>
              </ul>
              <p class="mb-3"><strong>Limitations:</strong></p>
              <ul class="list-disc list-inside space-y-2">
                <li>Limited to low frequencies (component size limits high frequencies)</li>
                <li>High gain requirement (A ≥ 29) can cause stability issues</li>
                <li>Component loading effects affect frequency accuracy</li>
                <li>Frequency adjustment changes phase characteristics</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Comparison with Wien Bridge</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p class="font-semibold mb-2">Wien Bridge</p>
                  <ul class="list-disc list-inside text-sm space-y-1">
                    <li>Uses lead-lag network</li>
                    <li>Zero phase shift at f₀</li>
                    <li>Requires A ≥ 3</li>
                    <li>Better for low distortion</li>
                  </ul>
                </div>
                <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p class="font-semibold mb-2">RC Phase Shift</p>
                  <ul class="list-disc list-inside text-sm space-y-1">
                    <li>Uses cascaded high-pass</li>
                    <li>180° phase shift at f₀</li>
                    <li>Requires A ≥ 29</li>
                    <li>Simpler topology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// Component values
const resistance = ref(10) // kΩ
const capacitance = ref(10) // nF
const amplifierGain = ref(30)
const testFrequency = ref(100) // Hz

// Animation state
const isPlaying = ref(true)
const animationFrame = ref(0)
const phaseCanvas = ref<HTMLCanvasElement | null>(null)
const waveformCanvas = ref<HTMLCanvasElement | null>(null)
let phaseCtx: CanvasRenderingContext2D | null = null
let waveformCtx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let waveformPhase = 0

// Frequency presets
const frequencyPresets = [
  { name: '100 Hz', r: 6.5, c: 10, f: 100 },
  { name: '1 kHz', r: 6.5, c: 1, f: 1000 },
  { name: '10 kHz', r: 0.65, c: 1, f: 10000 },
]

// Calculated values
const resonantFrequency = computed(() => {
  const r = resistance.value * 1000 // Convert kΩ to Ω
  const c = capacitance.value * 1e-9 // Convert nF to F
  const f = 1 / (2 * Math.PI * r * c * Math.sqrt(6))
  return Math.round(f)
})

const isOscillating = computed(() => {
  return amplifierGain.value >= 29
})

const loopGain = computed(() => {
  const feedbackAttenuation = 1/29
  return (amplifierGain.value * feedbackAttenuation).toFixed(2)
})

const oscillationStatus = computed(() => {
  if (amplifierGain.value >= 29) {
    return {
      label: '✓ Oscillating',
      detail: 'Gain sufficient for oscillation',
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400'
    }
  } else if (amplifierGain.value >= 25) {
    return {
      label: '~ Marginal',
      detail: 'Close to threshold (need A ≥ 29)',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-600 dark:text-yellow-400'
    }
  } else {
    return {
      label: '✗ Not Oscillating',
      detail: 'Gain too low (need A ≥ 29)',
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400'
    }
  }
})

const loopGainStatus = computed(() => {
  const lg = amplifierGain.value * (1/29)
  if (lg >= 1) {
    return {
      label: '≥ 1 (Oscillating)',
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      textSub: 'text-green-700 dark:text-green-300'
    }
  } else if (lg >= 0.9) {
    return {
      label: '≈ 1 (Marginal)',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-600 dark:text-yellow-400',
      textSub: 'text-yellow-700 dark:text-yellow-300'
    }
  } else {
    return {
      label: '< 1 (Decaying)',
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      textSub: 'text-red-700 dark:text-red-300'
    }
  }
})

// Apply preset
const applyPreset = (preset: any) => {
  resistance.value = preset.r
  capacitance.value = preset.c
  testFrequency.value = preset.f
}

// Toggle animation
const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value
}

// Reset animation
const resetAnimation = () => {
  waveformPhase = 0
}

// Calculate phase shift at a given frequency (for 3 stages)
const phaseShift = (freq: number) => {
  const r = resistance.value * 1000
  const c = capacitance.value * 1e-9
  const omega = 2 * Math.PI * freq
  const phasePerStage = Math.atan(1 / (omega * r * c))
  return (phasePerStage * 3 * 180) / Math.PI // Convert to degrees
}

// Draw phase response plot
const drawPhasePlot = () => {
  if (!phaseCanvas.value || !phaseCtx) return
  
  const canvas = phaseCanvas.value
  const ctx = phaseCtx
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Background
  ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1f2937' : '#f9fafb'
  ctx.fillRect(0, 0, width, height)
  
  // Grid
  ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1
  
  // Vertical lines (frequency)
  const minFreq = 10
  const maxFreq = 10000
  
  for (let i = 0; i <= 10; i++) {
    const x = 60 + (i / 10) * (width - 100)
    ctx.beginPath()
    ctx.moveTo(x, 20)
    ctx.lineTo(x, height - 40)
    ctx.stroke()
    
    const freq = minFreq * Math.pow(maxFreq / minFreq, i / 10)
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(freq >= 1000 ? (freq/1000).toFixed(1) + 'k' : freq.toFixed(0), x, height - 15)
  }
  
  // Horizontal lines (phase)
  for (let i = 0; i <= 6; i++) {
    const y = 20 + (i / 6) * (height - 60)
    ctx.beginPath()
    ctx.moveTo(60, y)
    ctx.lineTo(width - 40, y)
    ctx.stroke()
    
    const phase = (6 - i) * 30
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(phase + '°', 50, y + 4)
  }
  
  // Axis labels
  ctx.save()
  ctx.translate(15, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.textAlign = 'center'
  ctx.font = '12px sans-serif'
  ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
  ctx.fillText('Phase Shift', 0, 0)
  ctx.restore()
  
  ctx.textAlign = 'center'
  ctx.fillText('Frequency (Hz)', width / 2, height - 5)
  
  // 180° reference line
  const y180 = 20 + (1 - 180 / 180) * (height - 60)
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  ctx.moveTo(60, y180)
  ctx.lineTo(width - 40, y180)
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.setLineDash([])
  
  // Draw phase response curve
  ctx.beginPath()
  ctx.strokeStyle = '#f97316'
  ctx.lineWidth = 3
  
  for (let i = 0; i <= 200; i++) {
    const freq = minFreq * Math.pow(maxFreq / minFreq, i / 200)
    const phase = phaseShift(freq)
    
    const x = 60 + (i / 200) * (width - 100)
    const y = 20 + (1 - phase / 180) * (height - 60)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Mark resonant frequency
  const f0 = resonantFrequency.value
  const x0 = 60 + (Math.log10(f0 / minFreq) / Math.log10(maxFreq / minFreq)) * (width - 100)
  
  ctx.beginPath()
  ctx.arc(x0, y180, 6, 0, 2 * Math.PI)
  ctx.fillStyle = '#ef4444'
  ctx.fill()
  
  // Mark test frequency
  const xt = 60 + (Math.log10(testFrequency.value / minFreq) / Math.log10(maxFreq / minFreq)) * (width - 100)
  const phaset = phaseShift(testFrequency.value)
  const yt = 20 + (1 - phaset / 180) * (height - 60)
  
  ctx.beginPath()
  ctx.setLineDash([5, 5])
  ctx.moveTo(xt, 20)
  ctx.lineTo(xt, height - 40)
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.setLineDash([])
  
  // Labels
  ctx.fillStyle = '#ef4444'
  ctx.font = 'bold 11px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`f₀ = ${f0} Hz (180°)`, x0, y180 - 10)
  
  ctx.fillStyle = '#3b82f6'
  ctx.fillText(`f = ${testFrequency.value} Hz`, xt, 30)
}

// Draw waveform
const drawWaveform = () => {
  if (!waveformCanvas.value || !waveformCtx) return
  
  const canvas = waveformCanvas.value
  const ctx = waveformCtx
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height)
  
  // Background
  ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1f2937' : '#f9fafb'
  ctx.fillRect(0, 0, width, height)
  
  // Grid
  ctx.strokeStyle = document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1
  
  // Center line
  ctx.beginPath()
  ctx.moveTo(40, height / 2)
  ctx.lineTo(width - 20, height / 2)
  ctx.stroke()
  
  // Calculate amplitude based on oscillation status
  const loopGainVal = amplifierGain.value / 29
  let amplitude = 0
  
  if (loopGainVal >= 1) {
    amplitude = 60
  } else if (loopGainVal > 0) {
    amplitude = 60 * loopGainVal
  }
  
  // Draw sine wave
  if (amplitude > 5) {
    ctx.beginPath()
    ctx.strokeStyle = isOscillating.value ? '#10b981' : '#ef4444'
    ctx.lineWidth = 3
    
    for (let i = 0; i < width - 60; i++) {
      const t = (i + waveformPhase) / 80
      const y = height / 2 - amplitude * Math.sin(2 * Math.PI * t)
      
      if (i === 0) {
        ctx.moveTo(40 + i, y)
      } else {
        ctx.lineTo(40 + i, y)
      }
    }
    ctx.stroke()
  }
}

// Animation loop
const animate = () => {
  if (isPlaying.value) {
    waveformPhase += 2
    drawWaveform()
  }
  
  animationId = requestAnimationFrame(animate)
}

// Initialize canvases
onMounted(() => {
  if (phaseCanvas.value) {
    phaseCtx = phaseCanvas.value.getContext('2d')
    phaseCanvas.value.width = phaseCanvas.value.offsetWidth * 2
    phaseCanvas.value.height = 250 * 2
    phaseCtx?.scale(2, 2)
  }
  
  if (waveformCanvas.value) {
    waveformCtx = waveformCanvas.value.getContext('2d')
    waveformCanvas.value.width = waveformCanvas.value.offsetWidth * 2
    waveformCanvas.value.height = 180 * 2
    waveformCtx?.scale(2, 2)
  }
  
  drawPhasePlot()
  drawWaveform()
  animate()
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
})

watch([resistance, capacitance, amplifierGain, testFrequency], () => {
  drawPhasePlot()
}, { deep: true })

// Color mode
const colorMode = ref('light')
if (process.client) {
  colorMode.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  
  const observer = new MutationObserver(() => {
    colorMode.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    drawPhasePlot()
    drawWaveform()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  transition: all 0.15s ease;
}

.slider-primary::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  transition: all 0.15s ease;
}

.slider-primary::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}
</style>

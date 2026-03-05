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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔄 Phase-Locked Loop Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore PLL dynamics, lock acquisition, and frequency synthesis with interactive visualization
          </p>
          
          <!-- PLL Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">f_out</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary">N</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary">f_ref</span>
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
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">PLL Parameters</h3>
              
              <!-- Reference Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reference Frequency (f_ref)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="refFrequency"
                    type="number" 
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">kHz</span>
                </div>
                <input 
                  v-model.number="refFrequency"
                  type="range"
                  min="1"
                  max="1000"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- VCO Free-running Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  VCO Free-running Freq
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="vcoFreeFreq"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">kHz</span>
                </div>
                <input 
                  v-model.number="vcoFreeFreq"
                  type="range"
                  min="100"
                  max="10000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Feedback Divider -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Feedback Divider (N)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="feedbackDivider"
                    type="number" 
                    step="1"
                    min="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">×</span>
                </div>
                <input 
                  v-model.number="feedbackDivider"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Phase Detector Gain -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phase Detector Gain (K_pd)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="phaseDetectorGain"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-20">V/rad</span>
                </div>
                <input 
                  v-model.number="phaseDetectorGain"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Loop Filter Time Constant -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Loop Filter τ (R×C)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="loopFilterTau"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">ms</span>
                </div>
                <input 
                  v-model.number="loopFilterTau"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- VCO Gain -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  VCO Gain (K_vco)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="vcoGain"
                    type="number" 
                    step="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-24">Hz/V</span>
                </div>
                <input 
                  v-model.number="vcoGain"
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Quick Scenarios -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Scenarios
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setScenario('basic')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Basic PLL
                  </button>
                  <button 
                    @click="setScenario('synth')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    Synthesizer
                  </button>
                  <button 
                    @click="setScenario('tight')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    Tight Loop
                  </button>
                  <button 
                    @click="setScenario('loose')"
                    class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    Loose Loop
                  </button>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="flex gap-3">
                <button 
                  @click="startSimulation"
                  :disabled="isRunning"
                  class="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isRunning ? 'Running...' : 'Start PLL' }}
                </button>
                <button 
                  @click="resetSimulation"
                  class="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Lock Status Indicator -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lock Status</h3>
                <div :class="[
                  'px-4 py-2 rounded-full font-bold text-sm',
                  isLocked 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                ]">
                  {{ isLocked ? '🔒 LOCKED' : '🔓 UNLOCKED' }}
                </div>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary">{{ (refFrequency).toFixed(1) }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">f_ref (kHz)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-500">{{ feedbackDivider }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Divider (N)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-purple-500">{{ targetOutputFrequency.toFixed(1) }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Target f_out (kHz)</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold" :class="isLocked ? 'text-green-500' : 'text-orange-500'">
                    {{ currentOutputFrequency.toFixed(1) }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Current f_out (kHz)</div>
                </div>
              </div>
            </div>

            <!-- Phase Error and Control Voltage -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Phase Error & Control Voltage</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Phase Error Gauge -->
                <div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Phase Error</div>
                  <div class="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="absolute top-0 h-full transition-all duration-300"
                      :class="phaseErrorColor"
                      :style="{ width: `${Math.min(Math.abs(phaseError) / 3.14 * 100, 100)}%`, left: phaseError < 0 ? 'auto' : '50%' }"
                    ></div>
                    <div class="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 dark:bg-gray-500 transform -translate-x-1/2"></div>
                  </div>
                  <div class="text-center mt-2 text-lg font-mono font-bold" :class="phaseErrorColor">
                    {{ (phaseError * 180 / Math.PI).toFixed(2) }}°
                  </div>
                </div>
                
                <!-- Control Voltage -->
                <div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">VCO Control Voltage</div>
                  <div class="h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">{{ controlVoltage.toFixed(3) }} V</span>
                  </div>
                  <div class="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Range: ±5V
                  </div>
                </div>
              </div>
            </div>

            <!-- Lock Acquisition Graph -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Lock Acquisition</h3>
              
              <svg viewBox="0 0 500 250" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="pllGrid" width="50" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 25" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200 dark:text-gray-700"/>
                  </pattern>
                </defs>
                <rect width="500" height="250" fill="url(#pllGrid)" />
                
                <!-- Target Frequency Line -->
                <line 
                  x1="50" 
                  y1="250 - (targetOutputFrequency / (vcoFreeFreq * 2)) * 200"
                  x2="500" 
                  y2="250 - (targetOutputFrequency / (vcoFreeFreq * 2)) * 200"
                  stroke="#22C55E"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
                
                <!-- Frequency Tracking Curve -->
                <path 
                  :d="frequencyTrackingCurve"
                  fill="none"
                  stroke="#9FA8DA"
                  stroke-width="2.5"
                />
                
                <!-- Current Point -->
                <circle 
                  :cx="50 + (simulationTime / 10) * 450"
                  :cy="250 - (currentOutputFrequency / (vcoFreeFreq * 2)) * 200"
                  r="6"
                  :fill="isLocked ? '#22C55E' : '#F97316'"
                />
                
                <!-- Lock Threshold Lines -->
                <line 
                  x1="50" 
                  y1="250 - ((targetOutputFrequency * 0.99) / (vcoFreeFreq * 2)) * 200"
                  x2="500" 
                  y2="250 - ((targetOutputFrequency * 0.99) / (vcoFreeFreq * 2)) * 200"
                  stroke="#F97316"
                  stroke-width="1"
                  stroke-dasharray="3,3"
                  opacity="0.5"
                />
                <line 
                  x1="50" 
                  y1="250 - ((targetOutputFrequency * 1.01) / (vcoFreeFreq * 2)) * 200"
                  x2="500" 
                  y2="250 - ((targetOutputFrequency * 1.01) / (vcoFreeFreq * 2)) * 200"
                  stroke="#F97316"
                  stroke-width="1"
                  stroke-dasharray="3,3"
                  opacity="0.5"
                />
                
                <!-- Axes Labels -->
                <text x="275" y="240" text-anchor="middle" class="text-xs fill-gray-500 dark:fill-gray-400">Time (ms)</text>
                <text x="20" y="125" text-anchor="middle" transform="rotate(-90, 20, 125)" class="text-xs fill-gray-500 dark:fill-gray-400">Frequency (kHz)</text>
                
                <!-- Legend -->
                <g transform="translate(350, 20)">
                  <rect width="130" height="60" fill="white" fill-opacity="0.9" rx="4" />
                  <line x1="10" y1="15" x2="40" y2="15" stroke="#22C55E" stroke-width="2" stroke-dasharray="5,5" />
                  <text x="50" y="18" class="text-xs fill-gray-600 dark:fill-gray-400">Target</text>
                  <line x1="10" y1="35" x2="40" y2="35" stroke="#9FA8DA" stroke-width="2" />
                  <text x="50" y="38" class="text-xs fill-gray-600 dark:fill-gray-400">Actual</text>
                  <circle cx="25" cy="53" r="4" :fill="isLocked ? '#22C55E' : '#F97316'" />
                  <text x="50" y="56" class="text-xs fill-gray-600 dark:fill-gray-400">{{ isLocked ? 'Locked' : 'Acquiring' }}</text>
                </g>
              </svg>
            </div>

            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Signal Waveforms</h3>
              
              <svg viewBox="0 0 500 200" class="w-full h-auto">
                <!-- Background -->
                <rect width="500" height="200" fill="#F8FAFC" class="dark:fill-gray-900" rx="8" />
                
                <!-- Reference Signal (Blue) -->
                <path 
                  :d="referenceWaveform"
                  fill="none"
                  stroke="#3B82F6"
                  stroke-width="1.5"
                />
                
                <!-- Feedback Signal (Red - phase shifted) -->
                <path 
                  :d="feedbackWaveform"
                  fill="none"
                  stroke="#EF4444"
                  stroke-width="1.5"
                  stroke-dasharray="4,4"
                />
                
                <!-- VCO Output (Purple - higher freq) -->
                <path 
                  :d="vcoOutputWaveform"
                  fill="none"
                  stroke="#9333EA"
                  stroke-width="1"
                  opacity="0.6"
                />
                
                <!-- Labels -->
                <text x="10" y="20" class="text-xs fill-blue-500">Reference (f_ref)</text>
                <text x="10" y="40" class="text-xs fill-red-500">Feedback (f_out/N)</text>
                <text x="10" y="60" class="text-xs fill-purple-500">VCO Output (f_out)</text>
              </svg>
            </div>

            <!-- Calculated Parameters -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Parameters</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Lock Range</div>
                  <div class="text-lg font-bold text-primary">{{ lockRange.toFixed(2) }} kHz</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Loop Bandwidth</div>
                  <div class="text-lg font-bold text-blue-500">{{ loopBandwidth.toFixed(2) }} Hz</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Damping Ratio</div>
                  <div class="text-lg font-bold" :class="dampingColor">{{ dampingRatio.toFixed(3) }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Natural Frequency</div>
                  <div class="text-lg font-bold text-purple-500">{{ naturalFrequency.toFixed(2) }} rad/s</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Settling Time</div>
                  <div class="text-lg font-bold text-green-500">{{ settlingTime.toFixed(1) }} ms</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Freq Error</div>
                  <div class="text-lg font-bold text-orange-500">{{ frequencyError.toFixed(2) }}%</div>
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
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding Phase-Locked Loops</h2>
          
          <div class="prose dark:prose-invert max-w-none">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a PLL?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A Phase-Locked Loop (PLL) is a feedback control system that generates an output signal whose phase is related to the phase of an input reference signal. It consists of:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Phase Detector:</strong> Compares the phase of the reference signal with the feedback signal and generates an error voltage proportional to the phase difference</li>
              <li><strong>Loop Filter:</strong> A low-pass filter that smooths the phase detector output and removes high-frequency components</li>
              <li><strong>VCO (Voltage-Controlled Oscillator):</strong> Produces an output signal whose frequency is proportional to the control voltage</li>
              <li><strong>Feedback Divider:</strong> Divides the VCO output frequency by N to create the feedback signal</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Lock Condition</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When the PLL is locked, the frequency and phase of the feedback signal match the reference signal:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-center my-4">
              f_out = N × f_ref
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The phase error approaches zero, and the VCO control voltage stabilizes at the value needed to maintain the desired output frequency.
            </p>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Parameters</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Lock Range:</strong> The range of frequencies over which the PLL can acquire and maintain lock</li>
              <li><strong>Capture Range:</strong> The initial frequency range where the PLL can acquire lock (typically smaller than lock range)</li>
              <li><strong>Loop Bandwidth:</strong> Determines how quickly the PLL responds to changes and tracks the reference</li>
              <li><strong>Damping Ratio:</strong> Controls the transient response (underdamped: oscillatory, overdamped: slow, critically damped: optimal)</li>
              <li><strong>Settling Time:</strong> Time required for the PLL to acquire lock after a frequency step</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Frequency Synthesis:</strong> Generate stable frequencies from a single reference oscillator</li>
              <li><strong>Clock Recovery:</strong> Extract timing information from data streams in communications</li>
              <li><strong>FM Demodulation:</strong> Recover audio signals from FM broadcasts</li>
              <li><strong>Motor Control:</strong> Synchronize motor speed with reference signals</li>
              <li><strong>Frequency Multipliers/Dividers:</strong> Generate harmonics or subharmonics of a reference</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Tighter loop bandwidth (smaller τ) → faster response but more phase noise</li>
              <li>Looser loop bandwidth (larger τ) → cleaner output but slower lock time</li>
              <li>Damping ratio around 0.7-1.0 provides optimal transient response</li>
              <li>Higher VCO gain increases lock range but may cause instability</li>
              <li>Loop filter design is critical for stability and performance</li>
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
import { ref, computed, watch, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Phase-Locked Loop Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive PLL simulator with lock acquisition visualization, frequency synthesis, and phase error analysis.' },
    { name: 'keywords', content: 'PLL, phase locked loop, frequency synthesis, VCO, phase detector, circuit simulation, electrical engineering' }
  ]
})

const colorMode = useColorMode()

// PLL parameters
const refFrequency = ref(100) // kHz
const vcoFreeFreq = ref(1000) // kHz
const feedbackDivider = ref(10) // N
const phaseDetectorGain = ref(1) // V/rad
const loopFilterTau = ref(1) // ms
const vcoGain = ref(50000) // Hz/V

// Simulation state
const isRunning = ref(false)
const isLocked = ref(false)
const simulationTime = ref(0)
const controlVoltage = ref(0)
const phaseError = ref(0)
const currentOutputFrequency = ref(0)

let animationFrame: number | null = null
let startTime: number = 0
const frequencyHistory = ref<Array<{time: number, freq: number}>>([])

// Computed: Target output frequency
const targetOutputFrequency = computed(() => {
  return refFrequency.value * feedbackDivider.value
})

// Computed: Lock range (approximate)
const lockRange = computed(() => {
  const tau_sec = loopFilterTau.value / 1000
  const loopGain = phaseDetectorGain.value * vcoGain.value
  return loopGain / (2 * Math.PI) // kHz
})

// Computed: Loop bandwidth (natural frequency)
const loopBandwidth = computed(() => {
  const tau_sec = loopFilterTau.value / 1000
  const K = phaseDetectorGain.value * vcoGain.value / feedbackDivider.value
  const wn = Math.sqrt(K / tau_sec)
  return wn / (2 * Math.PI) // Hz
})

// Computed: Damping ratio
const dampingRatio = computed(() => {
  const tau_sec = loopFilterTau.value / 1000
  const K = phaseDetectorGain.value * vcoGain.value / feedbackDivider.value
  return 0.5 * Math.sqrt(K * tau_sec)
})

// Computed: Natural frequency (rad/s)
const naturalFrequency = computed(() => {
  const tau_sec = loopFilterTau.value / 1000
  const K = phaseDetectorGain.value * vcoGain.value / feedbackDivider.value
  return Math.sqrt(K / tau_sec)
})

// Computed: Settling time (approx 4/ζωn)
const settlingTime = computed(() => {
  if (dampingRatio.value === 0) return 0
  return (4 / (dampingRatio.value * naturalFrequency.value)) * 1000 // ms
})

// Computed: Frequency error percentage
const frequencyError = computed(() => {
  if (targetOutputFrequency.value === 0) return 0
  return Math.abs((currentOutputFrequency.value - targetOutputFrequency.value) / targetOutputFrequency.value * 100)
})

// Computed: Phase error color
const phaseErrorColor = computed(() => {
  const absError = Math.abs(phaseError.value)
  if (absError < 0.1) return 'text-green-500'
  if (absError < 0.5) return 'text-yellow-500'
  return 'text-red-500'
})

// Computed: Damping color
const dampingColor = computed(() => {
  const zeta = dampingRatio.value
  if (zeta < 0.3) return 'text-red-500' // Underdamped
  if (zeta > 1.5) return 'text-blue-500' // Overdamped
  return 'text-green-500' // Good range
})

// Computed: Frequency tracking curve
const frequencyTrackingCurve = computed(() => {
  if (frequencyHistory.value.length === 0) return ''
  
  const maxFreq = vcoFreeFreq.value * 2
  const points = frequencyHistory.value.map((point, index) => {
    const x = 50 + (point.time / 10) * 450 // Scale to 10 seconds
    const y = 250 - (point.freq / maxFreq) * 200
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  })
  
  return points.join(' ')
})

// Computed: Reference waveform
const referenceWaveform = computed(() => {
  const points = []
  for (let i = 0; i <= 500; i += 5) {
    const t = (i / 500) * 4 * Math.PI
    const y = 100 + 30 * Math.sin(t)
    points.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`)
  }
  return points.join(' ')
})

// Computed: Feedback waveform (phase shifted)
const feedbackWaveform = computed(() => {
  const points = []
  for (let i = 0; i <= 500; i += 5) {
    const t = (i / 500) * 4 * Math.PI + phaseError.value
    const y = 100 + 30 * Math.sin(t)
    points.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`)
  }
  return points.join(' ')
})

// Computed: VCO output waveform (higher frequency)
const vcoOutputWaveform = computed(() => {
  const points = []
  const freqMult = feedbackDivider.value
  for (let i = 0; i <= 500; i += 2) {
    const t = (i / 500) * 4 * Math.PI * freqMult
    const y = 140 + 20 * Math.sin(t)
    points.push(`${i === 0 ? 'M' : 'L'} ${i} ${y}`)
  }
  return points.join(' ')
})

// Scenario presets
function setScenario(type: string) {
  switch(type) {
    case 'basic':
      refFrequency.value = 100
      vcoFreeFreq.value = 1000
      feedbackDivider.value = 10
      phaseDetectorGain.value = 1
      loopFilterTau.value = 1
      vcoGain.value = 50000
      break
    case 'synth':
      refFrequency.value = 10
      vcoFreeFreq.value = 500
      feedbackDivider.value = 50
      phaseDetectorGain.value = 2
      loopFilterTau.value = 2
      vcoGain.value = 100000
      break
    case 'tight':
      refFrequency.value = 100
      vcoFreeFreq.value = 1000
      feedbackDivider.value = 10
      phaseDetectorGain.value = 5
      loopFilterTau.value = 0.2
      vcoGain.value = 80000
      break
    case 'loose':
      refFrequency.value = 100
      vcoFreeFreq.value = 1000
      feedbackDivider.value = 10
      phaseDetectorGain.value = 0.5
      loopFilterTau.value = 5
      vcoGain.value = 30000
      break
  }
  resetSimulation()
}

function startSimulation() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isRunning.value = true
  isLocked.value = false
  simulationTime.value = 0
  controlVoltage.value = 0
  phaseError.value = Math.PI / 2 // Start with 90° phase error
  currentOutputFrequency.value = vcoFreeFreq.value
  frequencyHistory.value = [{ time: 0, freq: currentOutputFrequency.value }]
  startTime = performance.now()
  
  animate()
}

function resetSimulation() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  isRunning.value = false
  isLocked.value = false
  simulationTime.value = 0
  controlVoltage.value = 0
  phaseError.value = 0
  currentOutputFrequency.value = 0
  frequencyHistory.value = []
}

function animate() {
  const currentTime = performance.now()
  const deltaTime = (currentTime - startTime) / 1000 // seconds
  startTime = currentTime
  
  simulationTime.value += deltaTime
  
  // PLL dynamics simulation (simplified first-order model)
  const tau_sec = loopFilterTau.value / 1000
  const K_pd = phaseDetectorGain.value
  const K_vco = vcoGain.value / 1000 // Convert Hz/V to kHz/V
  const N = feedbackDivider.value
  
  // Phase detector output (proportional to phase error)
  const pdOutput = K_pd * Math.sin(phaseError.value)
  
  // Loop filter (first-order low-pass)
  const alpha = deltaTime / (tau_sec + deltaTime)
  controlVoltage.value = controlVoltage.value + alpha * (pdOutput - controlVoltage.value)
  
  // VCO frequency change
  const freqDeviation = controlVoltage.value * K_vco
  currentOutputFrequency.value = vcoFreeFreq.value + freqDeviation
  
  // Calculate phase error (simplified)
  const feedbackFreq = currentOutputFrequency.value / N
  const freqDiff = refFrequency.value - feedbackFreq
  phaseError.value = phaseError.value + freqDiff * deltaTime * 0.1
  
  // Lock detection
  const freqPercentError = Math.abs(freqDiff / refFrequency.value)
  isLocked.value = freqPercentError < 0.01 && Math.abs(phaseError.value) < 0.1
  
  // Record history every 50ms
  if (frequencyHistory.value.length === 0 || 
      simulationTime.value - frequencyHistory.value[frequencyHistory.value.length - 1].time >= 0.05) {
    frequencyHistory.value.push({ time: simulationTime.value, freq: currentOutputFrequency.value })
  }
  
  // Continue animation
  animationFrame = requestAnimationFrame(animate)
}

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}
</style>

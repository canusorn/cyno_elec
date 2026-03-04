<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Instrumentation Amplifier Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore the precision of three-op-amp instrumentation amplifiers
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-2xl font-mono">
              <span class="text-primary">V<sub>out</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> = </span>
              <span class="text-primary">(V<sub>in+</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> - </span>
              <span class="text-primary">V<sub>in-</sub>)</span>
              <span class="text-gray-700 dark:text-gray-300"> × (1 + </span>
              <span class="text-primary">2R/R<sub>G</sub></span>
              <span class="text-gray-700 dark:text-gray-300">)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulation Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Panel: Controls -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Input Controls
          </h2>

          <!-- Input Voltages -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Differential Input</h3>
            
            <div class="space-y-6">
              <!-- Vin+ -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-gray-700 dark:text-gray-300 font-medium">V<sub>in+</sub> (Non-inverting)</label>
                  <span class="text-primary font-mono font-bold">{{ vinPlus.toFixed(3) }} V</span>
                </div>
                <input
                  type="range"
                  v-model.number="vinPlus"
                  min="-5"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>-5V</span>
                  <span>0V</span>
                  <span>+5V</span>
                </div>
              </div>

              <!-- Vin- -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-gray-700 dark:text-gray-300 font-medium">V<sub>in-</sub> (Inverting)</label>
                  <span class="text-primary font-mono font-bold">{{ vinMinus.toFixed(3) }} V</span>
                </div>
                <input
                  type="range"
                  v-model.number="vinMinus"
                  min="-5"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>-5V</span>
                  <span>0V</span>
                  <span>+5V</span>
                </div>
              </div>

              <!-- Differential Voltage Display -->
              <div class="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4">
                <div class="text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Differential Voltage (V<sub>in+</sub> - V<sub>in-</sub>)</div>
                  <div class="text-3xl font-mono font-bold" :class="differentialVoltage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ differentialVoltage >= 0 ? '+' : '' }}{{ differentialVoltage.toFixed(3) }} V
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gain Control -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Gain Control</h3>
            
            <div class="space-y-4">
              <!-- Resistor R -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-gray-700 dark:text-gray-300 font-medium">R (Feedback Resistor)</label>
                  <span class="text-primary font-mono font-bold">{{ formatResistance(R) }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="R"
                  min="1000"
                  max="100000"
                  step="1000"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1kΩ</span>
                  <span>50kΩ</span>
                  <span>100kΩ</span>
                </div>
              </div>

              <!-- Resistor RG -->
              <div>
                <div class="flex justify-between mb-2">
                  <label class="text-gray-700 dark:text-gray-300 font-medium">R<sub>G</sub> (Gain Resistor)</label>
                  <span class="text-primary font-mono font-bold">{{ formatResistance(RG) }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="RG"
                  min="100"
                  max="50000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>25kΩ</span>
                  <span>50kΩ</span>
                </div>
              </div>

              <!-- Gain Display -->
              <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-4">
                <div class="text-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Differential Gain</div>
                  <div class="text-4xl font-mono font-bold text-green-600 dark:text-green-400">
                    {{ gain.toFixed(2) }}×
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    G = 1 + (2R / R<sub>G</sub>)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preset Configurations -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Preset Configurations</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="setPreset('low-gain')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Low Gain (2×)
              </button>
              <button
                @click="setPreset('medium-gain')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Medium Gain (10×)
              </button>
              <button
                @click="setPreset('high-gain')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                High Gain (100×)
              </button>
              <button
                @click="setPreset('sensor')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Strain Gauge
              </button>
              <button
                @click="setPreset('ecg')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                ECG Front-end
              </button>
              <button
                @click="setPreset('thermocouple')"
                class="p-3 rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Thermocouple
              </button>
            </div>
          </div>
        </div>

        <!-- Right Panel: Visualization -->
        <div class="space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Circuit Diagram
            </h2>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <svg viewBox="0 0 400 350" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-700" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect width="400" height="350" fill="url(#grid)" />

                <!-- Op-Amp 1 (Non-inverting input buffer) -->
                <g :transform="`translate(60, 80)`">
                  <polygon points="0,0 0,50 40,25" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
                  <text x="12" y="20" font-size="10" class="fill-gray-600 dark:fill-gray-400">-</text>
                  <text x="12" y="35" font-size="10" class="fill-gray-600 dark:fill-gray-400">+</text>
                  <text x="5" y="-8" font-size="12" font-weight="bold" class="fill-primary">A1</text>
                  <!-- Input labels -->
                  <text x="-35" y="30" font-size="10" class="fill-blue-600 dark:fill-blue-400">{{ vinPlus.toFixed(2) }}V</text>
                </g>

                <!-- Op-Amp 2 (Inverting input buffer) -->
                <g :transform="`translate(60, 220)`">
                  <polygon points="0,0 0,50 40,25" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
                  <text x="12" y="20" font-size="10" class="fill-gray-600 dark:fill-gray-400">+</text>
                  <text x="12" y="35" font-size="10" class="fill-gray-600 dark:fill-gray-400">-</text>
                  <text x="5" y="-8" font-size="12" font-weight="bold" class="fill-primary">A2</text>
                  <!-- Input labels -->
                  <text x="-35" y="30" font-size="10" class="fill-red-600 dark:fill-red-400">{{ vinMinus.toFixed(2) }}V</text>
                </g>

                <!-- Op-Amp 3 (Differential output) -->
                <g :transform="`translate(280, 150)`">
                  <polygon points="0,0 0,50 40,25" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-800 dark:text-gray-200"/>
                  <text x="12" y="20" font-size="10" class="fill-gray-600 dark:fill-gray-400">-</text>
                  <text x="12" y="35" font-size="10" class="fill-gray-600 dark:fill-gray-400">+</text>
                  <text x="5" y="-8" font-size="12" font-weight="bold" class="fill-primary">A3</text>
                </g>

                <!-- Resistors RG between A1 and A2 -->
                <g>
                  <line x1="100" y1="105" x2="100" y2="160" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <!-- RG resistor symbol -->
                  <rect x="95" y="145" width="10" height="30" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"/>
                  <text x="75" y="165" font-size="10" class="fill-primary font-mono">R<sub>G</sub></text>
                  <line x1="100" y1="175" x2="100" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                </g>

                <!-- Feedback resistors R -->
                <g>
                  <!-- R1 from A1 output -->
                  <line x1="100" y1="92" x2="140" y2="92" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <rect x="130" y="87" width="20" height="10" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"/>
                  <text x="125" y="82" font-size="10" class="fill-primary font-mono">R</text>
                  <line x1="160" y1="92" x2="190" y2="92" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <line x1="190" y1="92" x2="190" y2="130" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>

                  <!-- R2 from A2 output -->
                  <line x1="100" y1="258" x2="140" y2="258" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <rect x="130" y="253" width="20" height="10" fill="none" stroke="currentColor" stroke-width="2" class="text-primary"/>
                  <text x="125" y="275" font-size="10" class="fill-primary font-mono">R</text>
                  <line x1="160" y1="258" x2="190" y2="258" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <line x1="190" y1="258" x2="190" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>

                  <!-- Connections to A3 -->
                  <line x1="190" y1="130" x2="270" y2="130" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                  <line x1="190" y1="220" x2="270" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-600 dark:text-gray-400"/>
                </g>

                <!-- Output from A3 -->
                <line x1="320" y1="175" x2="380" y2="175" stroke="currentColor" stroke-width="2" class="text-green-600 dark:text-green-400"/>
                <text x="325" y="165" font-size="12" font-weight="bold" class="fill-green-600 dark:fill-green-400">Vout</text>

                <!-- Input signal indicators -->
                <circle cx="45" cy="105" r="5" :fill="vinPlus > vinMinus ? '#10B981' : '#EF4444'"/>
                <circle cx="45" cy="245" r="5" :fill="vinMinus > vinPlus ? '#10B981' : '#EF4444'"/>
              </svg>
            </div>
          </div>

          <!-- Output Display -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Output Analysis
            </h2>
            
            <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-6">
              <div class="text-center mb-4">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Voltage (V<sub>out</sub>)</div>
                <div class="text-5xl font-mono font-bold" :class="voltageOut >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ voltageOut >= 0 ? '+' : '' }}{{ voltageOut.toFixed(3) }} V
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-6">
                <div class="text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Input Range</div>
                  <div class="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">
                    ±5.0 V
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Max Output</div>
                  <div class="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">
                    ±{{ (5 * gain).toFixed(1) }} V
                  </div>
                </div>
              </div>
            </div>

            <!-- CMRR Display -->
            <div class="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-4">
              <div class="text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Common-Mode Rejection</div>
                <div class="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  100+ dB
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Ideal instrumentation amplifier
                </div>
              </div>
            </div>
          </div>

          <!-- Signal Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Signal Visualization</h2>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <svg viewBox="0 0 400 200" class="w-full h-auto">
                <!-- Grid lines -->
                <line x1="200" y1="20" x2="200" y2="180" stroke="currentColor" stroke-width="1" class="text-gray-300 dark:text-gray-700" stroke-dasharray="5,5"/>
                <line x1="20" y1="100" x2="380" y2="100" stroke="currentColor" stroke-width="1" class="text-gray-300 dark:text-gray-700" stroke-dasharray="5,5"/>
                
                <!-- Input signals (smaller amplitude) -->
                <path :d="generateWaveform(200, 100, differentialVoltage, 1, 'input')" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      class="text-blue-500 dark:text-blue-400"
                      opacity="0.6"/>
                
                <!-- Output signal (amplified) -->
                <path :d="generateWaveform(200, 100, voltageOut, 1, 'output')" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2.5" 
                      class="text-green-600 dark:text-green-400"/>
                
                <!-- Labels -->
                <text x="30" y="30" font-size="10" class="fill-blue-600 dark:fill-blue-400">Input</text>
                <text x="30" y="45" font-size="10" class="fill-green-600 dark:fill-green-400">Output (×{{ gain.toFixed(0) }})</text>
                
                <!-- Amplitude indicators -->
                <line x1="380" y1="100" x2="380" :y2="100 - differentialVoltage * 10" stroke="currentColor" stroke-width="1" class="text-blue-500"/>
                <line x1="370" y1="100" x2="370" :y2="100 - voltageOut * 2" stroke="currentColor" stroke-width="1" class="text-green-600"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Understanding Instrumentation Amplifiers
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- What is it? -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">What is an Instrumentation Amplifier?</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              An instrumentation amplifier (in-amp) is a type of differential amplifier that has been specifically designed for applications that require high input impedance, high common-mode rejection ratio (CMRR), and low noise.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              It consists of <strong>three operational amplifiers</strong> arranged in a special configuration that provides:
            </p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Very high input impedance (no loading of signal source)</li>
              <li>Excellent common-mode rejection (removes noise)</li>
              <li>Adjustable gain with a single resistor (R<sub>G</sub>)</li>
              <li>Low offset and drift</li>
            </ul>
          </div>

          <!-- Key Formula -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Formulas</h3>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 space-y-4">
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Differential Gain</div>
                <div class="text-xl font-mono text-gray-900 dark:text-white">
                  G = 1 + (2R / R<sub>G</sub>)
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Voltage</div>
                <div class="text-xl font-mono text-gray-900 dark:text-white">
                  V<sub>out</sub> = G × (V<sub>in+</sub> - V<sub>in-</sub>)
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">CMRR (Common-Mode Rejection Ratio)</div>
                <div class="text-xl font-mono text-gray-900 dark:text-white">
                  CMRR = 20log(A<sub>d</sub> / A<sub>c</sub>)
                </div>
              </div>
            </div>
          </div>

          <!-- Applications -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Common Applications</h3>
            <div class="space-y-3">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Medical Instrumentation</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">ECG, EEG, EMG where small signals must be extracted from noisy environments</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Sensor Interfaces</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Strain gauges, pressure sensors, thermocouples, and Wheatstone bridges</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Industrial Automation</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Process control, weighing scales, and data acquisition systems</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Audio Equipment</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Microphone preamps and balanced audio inputs</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Design Tips -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Design Considerations</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-primary pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white">Gain Resistor (R<sub>G</sub>)</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Use a low-tolerance resistor (1% or better) for R<sub>G</sub> as gain accuracy directly depends on it. For very high gains, consider using a precision potentiometer.
                </p>
              </div>
              <div class="border-l-4 border-primary pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white">Resistor Matching</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  The two R resistors must be well-matched for optimal CMRR. Mismatch reduces the common-mode rejection capability.
                </p>
              </div>
              <div class="border-l-4 border-primary pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white">Reference Voltage</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Most in-amps have a reference pin that allows you to level-shift the output. This is useful for single-supply applications.
                </p>
              </div>
              <div class="border-l-4 border-primary pl-4">
                <h4 class="font-semibold text-gray-900 dark:text-white">Input Protection</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Add diode clamps or resistors to protect the inputs if they might be exposed to voltages beyond the supply rails.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Example Calculation -->
        <div class="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Example Calculation</h3>
          <div class="text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>Given:</strong></p>
            <ul class="list-disc list-inside ml-4 space-y-1">
              <li>V<sub>in+</sub> = 2.5V (from strain gauge)</li>
              <li>V<sub>in-</sub> = 2.48V (reference)</li>
              <li>Differential voltage = 0.02V = 20mV</li>
              <li>R = 10kΩ</li>
              <li>R<sub>G</sub> = 1kΩ</li>
            </ul>
            <p class="mt-4"><strong>Calculate Gain:</strong></p>
            <p class="ml-4 font-mono">G = 1 + (2R / R<sub>G</sub>) = 1 + (2 × 10kΩ / 1kΩ) = 1 + 20 = 21</p>
            <p class="mt-4"><strong>Calculate Output:</strong></p>
            <p class="ml-4 font-mono">V<sub>out</sub> = G × (V<sub>in+</sub> - V<sub>in-</sub>) = 21 × 0.02V = 0.42V</p>
            <p class="mt-4 text-green-700 dark:text-green-400">
              ✅ The small 20mV signal is amplified to 420mV, making it suitable for ADC processing!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <svg class="mx-auto h-12 mb-4 hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
            <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
            <circle cx="20" cy="20" r="3" fill="#7986CB"/>
            <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
          </svg>
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  name: 'InstrumentationAmplifierSimulation',
  components: {
    NavigationBar
  },
  setup() {
    useHead({
      title: 'Instrumentation Amplifier Simulation - Cyno Electric',
      meta: [
        { name: 'description', content: 'Interactive simulation of three-op-amp instrumentation amplifier with adjustable gain and differential input analysis.' }
      ]
    })
    
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      vinPlus: 0.1,
      vinMinus: -0.1,
      R: 10000,  // 10kΩ
      RG: 1000   // 1kΩ → gain = 1 + 20k/1k = 21
    }
  },
  computed: {
    differentialVoltage() {
      return this.vinPlus - this.vinMinus
    },
    gain() {
      return 1 + (2 * this.R / this.RG)
    },
    voltageOut() {
      return this.differentialVoltage * this.gain
    }
  },
  methods: {
    formatResistance(ohms) {
      if (ohms >= 1000000) {
        return `${(ohms / 1000000).toFixed(1)} MΩ`
      } else if (ohms >= 1000) {
        return `${(ohms / 1000).toFixed(1)} kΩ`
      }
      return `${ohms.toFixed(0)} Ω`
    },
    setPreset(preset) {
      switch(preset) {
        case 'low-gain':
          this.R = 10000
          this.RG = 20000
          this.vinPlus = 0.5
          this.vinMinus = 0.0
          break
        case 'medium-gain':
          this.R = 10000
          this.RG = 2222
          this.vinPlus = 0.2
          this.vinMinus = 0.0
          break
        case 'high-gain':
          this.R = 10000
          this.RG = 202
          this.vinPlus = 0.05
          this.vinMinus = 0.0
          break
        case 'sensor':
          // Strain gauge: small differential signal
          this.R = 10000
          this.RG = 1000
          this.vinPlus = 2.5
          this.vinMinus = 2.48
          break
        case 'ecg':
          // ECG front-end: very small signals, high gain
          this.R = 10000
          this.RG = 400
          this.vinPlus = 0.005
          this.vinMinus = 0.0
          break
        case 'thermocouple':
          // Thermocouple: small voltage, medium gain
          this.R = 10000
          this.RG = 2000
          this.vinPlus = 0.04
          this.vinMinus = 0.0
          break
      }
    },
    generateWaveform(centerX, centerY, amplitude, frequency, type) {
      // Generate a simple sine wave path
      const points = []
      const cycles = 2
      const samples = 100
      
      for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * 360
        const angle = (x / 180) * Math.PI * frequency * cycles
        const y = Math.sin(angle) * amplitude
        
        // Scale for display
        const scaledX = 20 + (i / samples) * 360
        const scaledY = centerY - (y * 50) // Scale amplitude for visibility
        
        points.push(`${i === 0 ? 'M' : 'L'} ${scaledX} ${scaledY}`)
      }
      
      return points.join(' ')
    }
  }
}
</script>

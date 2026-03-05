<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Common Base Amplifier Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the BJT common base configuration with real-time analysis and waveform visualization
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Gain:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">A_v</span>
              <span class="text-gray-400">≈</span>
              <span class="text-primary-highlight">R_C</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">R'_E</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Circuit Diagram & Controls -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Circuit Schematic -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Circuit Schematic</h3>
              <svg viewBox="0 0 400 450" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- VCC -->
                <line x1="200" y1="20" x2="200" y2="50" stroke="#EF4444" stroke-width="3"/>
                <circle cx="200" cy="15" r="12" fill="white" stroke="#EF4444" stroke-width="2"/>
                <text x="200" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">VCC</text>

                <!-- RC resistor -->
                <rect x="185" y="50" width="30" height="60" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="230" y="85" font-size="10" fill="#3B82F6">RC</text>
                <text x="230" y="98" font-size="9" fill="#3B82F6">{{ rc }}Ω</text>

                <!-- Line to collector -->
                <line x1="200" y1="110" x2="200" y2="160" stroke="#6B7280" stroke-width="2"/>

                <!-- NPN Transistor symbol (vertical orientation) -->
                <g transform="translate(200, 200)">
                  <!-- Base terminal (horizontal input) -->
                  <line x1="-100" y1="0" x2="-15" y2="0" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Base bar (vertical) -->
                  <line x1="-15" y1="-30" x2="-15" y2="30" stroke="#10B981" stroke-width="3"/>
                  
                  <!-- Collector terminal (top) -->
                  <line x1="-15" y1="-20" x2="15" y2="-40" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="-40" x2="15" y2="-40" stroke="#10B981" stroke-width="2"/>
                  
                  <!-- Emitter terminal (bottom with arrow pointing OUT for common base) -->
                  <line x1="-15" y1="20" x2="15" y2="40" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="40" x2="15" y2="50" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Emitter arrow pointing OUT (away from base) -->
                  <line x1="12" y1="44" x2="18" y2="50" stroke="#10B981" stroke-width="2"/>
                  <polygon points="18,50 14,47 17,43" fill="#10B981"/>
                  
                  <text x="25" y="-35" font-size="10" fill="#10B981">C</text>
                  <text x="25" y="55" font-size="10" fill="#10B981">E</text>
                  <text x="-60" y="5" font-size="10" fill="#10B981">B</text>
                </g>

                <!-- Line from collector up to RC -->
                <line x1="200" y1="160" x2="215" y2="160" stroke="#6B7280" stroke-width="2"/>
                <line x1="215" y1="160" x2="215" y2="110" stroke="#6B7280" stroke-width="2"/>
                <line x1="215" y1="110" x2="200" y2="110" stroke="#6B7280" stroke-width="2"/>

                <!-- RE resistor -->
                <rect x="185" y="250" width="30" height="60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="230" y="285" font-size="10" fill="#8B5CF6">RE</text>
                <text x="230" y="298" font-size="9" fill="#8B5CF6">{{ re }}Ω</text>

                <!-- To ground -->
                <line x1="200" y1="310" x2="200" y2="350" stroke="#6B7280" stroke-width="2"/>
                
                <!-- Ground symbol -->
                <g transform="translate(200, 350)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-15" y1="10" x2="15" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-10" y1="15" x2="10" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-5" y1="20" x2="5" y2="20" stroke="#6B7280" stroke-width="2"/>
                </g>

                <!-- Input at Emitter (common base - input at emitter) -->
                <g>
                  <circle cx="270" cy="250" r="8" fill="white" stroke="#F59E0B" stroke-width="2"/>
                  <text x="270" y="254" text-anchor="middle" font-size="10" fill="#F59E0B">Cin</text>
                  <line x1="215" y1="250" x2="262" y2="250" stroke="#6B7280" stroke-width="2"/>
                  <line x1="278" y1="250" x2="320" y2="250" stroke="#6B7280" stroke-width="2"/>
                  <text x="325" y="255" font-size="11" fill="#F59E0B">Vin</text>
                </g>

                <!-- Output at Collector -->
                <g>
                  <circle cx="270" cy="160" r="8" fill="white" stroke="#EC4899" stroke-width="2"/>
                  <text x="270" y="164" text-anchor="middle" font-size="10" fill="#EC4899">Cout</text>
                  <line x1="215" y1="160" x2="262" y2="160" stroke="#6B7280" stroke-width="2"/>
                  <line x1="278" y1="160" x2="320" y2="160" stroke="#6B7280" stroke-width="2"/>
                  <text x="325" y="165" font-size="11" fill="#EC4899">Vout</text>
                </g>

                <!-- Base bias resistors -->
                <g transform="translate(100, 200)">
                  <rect x="-15" y="-20" width="30" height="40" fill="white" stroke="#9333EA" stroke-width="2"/>
                  <text x="-50" y="5" font-size="9" fill="#9333EA">R1,R2</text>
                  <text x="-50" y="18" font-size="8" fill="#9333EA">(bias)</text>
                </g>

                <!-- VEE label for emitter supply -->
                <circle cx="320" cy="310" r="12" fill="white" stroke="#F59E0B" stroke-width="2"/>
                <text x="320" y="315" text-anchor="middle" font-size="10" font-weight="bold" fill="#F59E0B">VEE</text>
                <line x1="320" y1="322" x2="320" y2="350" stroke="#F59E0B" stroke-width="2"/>
              </svg>
            </div>

            <!-- Component Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎛️ Component Values</h3>
              
              <div class="space-y-4">
                <!-- VCC -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>VCC (Collector Supply)</span>
                    <span class="text-primary">{{ vcc }}V</span>
                  </label>
                  <input
                    v-model.number="vcc"
                    type="range"
                    min="5"
                    max="24"
                    step="0.5"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>5V</span>
                    <span>24V</span>
                  </div>
                </div>

                <!-- VEE -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>VEE (Emitter Supply)</span>
                    <span class="text-primary">-{{ vee }}V</span>
                  </label>
                  <input
                    v-model.number="vee"
                    type="range"
                    min="5"
                    max="15"
                    step="0.5"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>-5V</span>
                    <span>-15V</span>
                  </div>
                </div>

                <!-- RC -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>RC (Collector Resistor)</span>
                    <span class="text-primary">{{ rc }}Ω</span>
                  </label>
                  <input
                    v-model.number="rc"
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>100Ω</span>
                    <span>10kΩ</span>
                  </div>
                </div>

                <!-- RE -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>RE (Emitter Resistor)</span>
                    <span class="text-primary">{{ re }}Ω</span>
                  </label>
                  <input
                    v-model.number="re"
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>100Ω</span>
                    <span>5kΩ</span>
                  </div>
                </div>

                <!-- Beta -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Transistor β (hFE)</span>
                    <span class="text-primary">{{ beta }}</span>
                  </label>
                  <input
                    v-model.number="beta"
                    type="range"
                    min="50"
                    max="300"
                    step="10"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>50</span>
                    <span>300</span>
                  </div>
                </div>

                <!-- Input Voltage -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Input Signal Amplitude</span>
                    <span class="text-primary">{{ vinAmplitude }}mV</span>
                  </label>
                  <input
                    v-model.number="vinAmplitude"
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1mV</span>
                    <span>50mV</span>
                  </div>
                </div>

                <!-- Frequency -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Signal Frequency</span>
                    <span class="text-primary">{{ frequency }}kHz</span>
                  </label>
                  <input
                    v-model.number="frequency"
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0.1kHz</span>
                    <span>10kHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Analysis & Waveforms -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Key Metrics -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Voltage Gain</div>
                <div class="text-2xl font-bold">{{ voltageGain.toFixed(2) }}</div>
                <div class="text-xs opacity-70 mt-1">A_v = V_out/V_in</div>
              </div>
              
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Current Gain</div>
                <div class="text-2xl font-bold">{{ currentGain.toFixed(3) }}</div>
                <div class="text-xs opacity-70 mt-1">A_i ≈ α</div>
              </div>
              
              <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Input Impedance</div>
                <div class="text-2xl font-bold">{{ (inputImpedance / 1000).toFixed(2) }}kΩ</div>
                <div class="text-xs opacity-70 mt-1">Low Z_in</div>
              </div>
              
              <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Output Impedance</div>
                <div class="text-2xl font-bold">{{ (outputImpedance / 1000).toFixed(2) }}kΩ</div>
                <div class="text-xs opacity-70 mt-1">High Z_out</div>
              </div>
            </div>

            <!-- Waveforms -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Input/Output Waveforms</h3>
              <svg viewBox="0 0 600 350" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Grid -->
                <defs>
                  <pattern id="grid2" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-600" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="600" height="350" fill="url(#grid2)" />
                
                <!-- Title -->
                <text x="300" y="25" font-size="14" font-weight="bold" fill="#374151" text-anchor="middle" class="dark:fill-gray-200">
                  In-Phase Output (Common Base Characteristic)
                </text>

                <!-- Input waveform (top) -->
                <g transform="translate(50, 100)">
                  <text x="-40" y="5" font-size="12" font-weight="bold" fill="#F59E0B">V_in</text>
                  <line x1="0" y1="0" x2="500" y2="0" stroke="#6B7280" stroke-width="1" stroke-dasharray="3,3"/>
                  
                  <!-- Sine wave input -->
                  <path
                    :d="generateInputWaveformPath(0, 0, 500, 60)"
                    fill="none"
                    stroke="#F59E0B"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  
                  <!-- Time labels -->
                  <text x="0" y="80" font-size="10" fill="#6B7280" text-anchor="middle">0</text>
                  <text x="125" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T/4</text>
                  <text x="250" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T/2</text>
                  <text x="375" y="80" font-size="10" fill="#6B7280" text-anchor="middle">3T/4</text>
                  <text x="500" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T</text>
                </g>

                <!-- Output waveform (bottom) -->
                <g transform="translate(50, 240)">
                  <text x="-40" y="5" font-size="12" font-weight="bold" fill="#EC4899">V_out</text>
                  <line x1="0" y1="0" x2="500" y2="0" stroke="#6B7280" stroke-width="1" stroke-dasharray="3,3"/>
                  
                  <!-- Sine wave output (amplified and in-phase) -->
                  <path
                    :d="generateOutputWaveformPath(0, 0, 500, 60)"
                    fill="none"
                    stroke="#EC4899"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  
                  <!-- Time labels -->
                  <text x="0" y="80" font-size="10" fill="#6B7280" text-anchor="middle">0</text>
                  <text x="125" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T/4</text>
                  <text x="250" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T/2</text>
                  <text x="375" y="80" font-size="10" fill="#6B7280" text-anchor="middle">3T/4</text>
                  <text x="500" y="80" font-size="10" fill="#6B7280" text-anchor="middle">T</text>
                </g>

                <!-- Phase indicator -->
                <g transform="translate(450, 170)">
                  <rect width="140" height="50" fill="white" fill-opacity="0.95" stroke="#E5E7EB" rx="5"/>
                  <text x="70" y="18" font-size="11" font-weight="bold" fill="#374151" text-anchor="middle">Phase Relationship</text>
                  <text x="70" y="35" font-size="10" fill="#10B981" text-anchor="middle">✓ IN PHASE (0°)</text>
                  <text x="70" y="47" font-size="9" fill="#6B7280" text-anchor="middle">Common base characteristic</text>
                </g>

                <!-- Gain indicator -->
                <g transform="translate(50, 320)">
                  <text font-size="11" fill="#374151" class="dark:fill-gray-200">
                    Gain: {{ voltageGain.toFixed(2) }}× | Output: ({{ vinAmplitude }}mV × {{ voltageGain.toFixed(2) }}) = {{ (vinAmplitude * voltageGain).toFixed(1) }}mV
                  </text>
                </g>
              </svg>
            </div>

            <!-- DC Operating Point -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 DC Operating Point (Q-Point)</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Emitter Current (I_E)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ (ie * 1000).toFixed(2) }}mA</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">DC bias current</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Collector Current (I_C)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ (ic * 1000).toFixed(2) }}mA</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">I_C ≈ I_E</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Collector Voltage (V_C)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ vc.toFixed(2) }}V</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">V_C = VCC - I_C × R_C</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Emitter Voltage (V_E)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ ve.toFixed(2) }}V</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">V_E ≈ -0.7V (for NPN)</div>
                </div>
              </div>
            </div>

            <!-- AC Analysis -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 AC Small Signal Analysis</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Transconductance (g_m)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ (gm * 1000).toFixed(2) }} mS</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">g_m = I_C / V_T</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">r'_e (Emitter Resistance)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ (rePrime * 1000).toFixed(2) }}mΩ</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">r'_e = 26mV / I_E</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power Gain (A_p)</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ powerGain.toFixed(2) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">A_p = A_v × A_i</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Bandwidth Product</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ (bandwidth / 1e6).toFixed(2) }}MHz</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Approximate f_T</div>
                </div>
              </div>
            </div>

            <!-- Load Line Analysis -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📉 DC Load Line</h3>
              <svg viewBox="0 0 500 300" class="w-full h-auto bg-gray-50 dark:bg-gray-700 rounded-lg">
                <!-- Axis -->
                <line x1="60" y1="20" x2="60" y2="250" stroke="#6B7280" stroke-width="2"/>
                <line x1="60" y1="250" x2="480" y2="250" stroke="#6B7280" stroke-width="2"/>
                
                <!-- Labels -->
                <text x="30" y="130" font-size="12" fill="#6B7280" font-weight="bold" transform="rotate(-90, 30, 130)">V_CE (V)</text>
                <text x="270" y="280" font-size="12" fill="#6B7280" font-weight="bold">I_C (mA)</text>
                
                <!-- V_CE scale -->
                <text x="55" y="30" font-size="9" fill="#6B7280" text-anchor="end">{{ vcc }}V</text>
                <text x="55" y="140" font-size="9" fill="#6B7280" text-anchor="end">{{ (vcc / 2).toFixed(1) }}V</text>
                <text x="55" y="250" font-size="9" fill="#6B7280" text-anchor="end">0V</text>
                
                <!-- I_C scale -->
                <text x="65" y="265" font-size="9" fill="#6B7280">0</text>
                <text x="470" y="265" font-size="9" fill="#6B7280" text-anchor="end">{{ (vcc / (rc / 1000) * 1000).toFixed(1) }}mA</text>
                
                <!-- Load line -->
                <line
                  x1="60"
                  y1="30"
                  x2="470"
                  y2="250"
                  stroke="#3B82F6"
                  stroke-width="2"
                />
                
                <!-- Q-point -->
                <circle
                  :cx="60 + (vc / vcc) * 410"
                  :cy="30 + ((vcc / (rc / 1000)) - (ic * 1000)) / (vcc / (rc / 1000)) * 220"
                  r="8"
                  fill="#EF4444"
                  stroke="white"
                  stroke-width="2"
                />
                
                <!-- Q-point label -->
                <text
                  :x="60 + (vc / vcc) * 410 + 15"
                  :cy="30 + ((vcc / (rc / 1000)) - (ic * 1000)) / (vcc / (rc / 1000)) * 220 - 5"
                  font-size="10"
                  fill="#EF4444"
                  font-weight="bold"
                >Q</text>
                
                <!-- Saturation and cutoff labels -->
                <text x="460" y="240" font-size="9" fill="#3B82F6" text-anchor="end">Saturation</text>
                <text x="70" y="40" font-size="9" fill="#3B82F6">Cutoff</text>
                
                <!-- Q-point coordinates -->
                <g transform="translate(350, 50)">
                  <rect width="130" height="70" fill="white" fill-opacity="0.95" stroke="#E5E7EB" rx="5"/>
                  <text x="65" y="18" font-size="10" font-weight="bold" fill="#374151" text-anchor="middle">Q-Point</text>
                  <text x="10" y="35" font-size="9" fill="#6B7280">V_CE = {{ vc.toFixed(2) }}V</text>
                  <text x="10" y="50" font-size="9" fill="#6B7280">I_C = {{ (ic * 1000).toFixed(2) }}mA</text>
                  <text x="10" y="65" font-size="9" fill="#10B981">✓ Active Region</text>
                </g>
              </svg>
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
            📚 Understanding Common Base Amplifiers
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Common Base?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a common base amplifier, the base terminal is shared between input and output circuits (usually grounded).
              The input signal is applied to the emitter, and the output is taken from the collector. 
              This configuration is characterized by very low input impedance and high output impedance.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage Gain:</strong> High, typically 50-200+ (A_v ≈ R_C / r'_e)</li>
              <li><strong>Current Gain:</strong> Less than 1 (A_i ≈ α ≈ 0.95-0.99)</li>
              <li><strong>Input Impedance:</strong> Very low, typically 10-100Ω</li>
              <li><strong>Output Impedance:</strong> Very high, typically 100kΩ - 1MΩ</li>
              <li><strong>Phase Relationship:</strong> Output is IN-PHASE with input</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>Voltage Gain:</strong> A_v = g_m × R_C ≈ R_C / r'_e</p>
              <p><strong>Current Gain:</strong> A_i ≈ α = β / (β + 1)</p>
              <p><strong>Input Impedance:</strong> Z_in = r'_e = V_T / I_E</p>
              <p><strong>Transconductance:</strong> g_m = I_C / V_T</p>
              <p><strong>Power Gain:</strong> A_p = A_v × A_i</p>
              <p><strong>Emitter Current:</strong> I_E ≈ (VEE - 0.7V) / R_E</p>
              <p><strong>Collector Voltage:</strong> V_C = VCC - I_C × R_C</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Other Configurations:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Parameter</th>
                    <th class="text-left py-2">Common Base</th>
                    <th class="text-left py-2">Common Emitter</th>
                    <th class="text-left py-2">Common Collector</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Voltage Gain</td>
                    <td class="py-2 text-green-600 font-semibold">High (50-200+)</td>
                    <td class="py-2">High (20-200)</td>
                    <td class="py-2 text-red-600">Low (&lt;1)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Current Gain</td>
                    <td class="py-2 text-red-600">Low (&lt;1)</td>
                    <td class="py-2 text-green-600">High (50-200)</td>
                    <td class="py-2 text-green-600">High (50-200)</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Input Z</td>
                    <td class="py-2 text-red-600">Very Low (10-100Ω)</td>
                    <td class="py-2">Medium (1k-5kΩ)</td>
                    <td class="py-2 text-green-600">High (50k-500kΩ)</td>
                  </tr>
                  <tr>
                    <td class="py-2">Output Z</td>
                    <td class="py-2 text-green-600">Very High (100k-1MΩ)</td>
                    <td class="py-2">Medium (1k-10kΩ)</td>
                    <td class="py-2 text-red-600">Low (10-100Ω)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="font-semibold text-blue-800 dark:text-blue-300 mb-2">📡 RF Applications</div>
                <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• RF amplifiers (VHF/UHF)</li>
                  <li>• Radio receivers</li>
                  <li>• Antenna preamps</li>
                  <li>• Mixers and oscillators</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="font-semibold text-green-800 dark:text-green-300 mb-2">⚡ Special Uses</div>
                <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Impedance matching</li>
                  <li>• Current buffers</li>
                  <li>• Cascode amplifiers</li>
                  <li>• Differential pairs</li>
                </ul>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Use Common Base?</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High Frequency Performance:</strong> Excellent bandwidth due to low base capacitance</li>
              <li><strong>Low Input Impedance:</strong> Perfect for matching with transmission lines (50Ω, 75Ω)</li>
              <li><strong>No Miller Effect:</strong> Minimal feedback capacitance at high frequencies</li>
              <li><strong>In-Phase Output:</strong> Useful in differential amplifiers and push-pull circuits</li>
              <li><strong>Good Isolation:</strong> High reverse isolation (low signal leakage from output to input)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Bias Stability:</strong> Requires careful bias design due to negative supply requirement</li>
              <li><strong>Input Matching:</strong> Low Z_in requires impedance matching networks</li>
              <li><strong>Thermal Stability:</strong> Emitter resistor provides negative feedback for stability</li>
              <li><strong>Coupling Capacitors:</strong> Must be sized appropriately for signal frequency</li>
              <li><strong>Cascode Configuration:</strong> Often paired with common emitter for improved performance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Component values
const vcc = ref(12)
const vee = ref(12)
const rc = ref(3300)
const re = ref(2200)
const beta = ref(150)
const vinAmplitude = ref(10)
const frequency = ref(1)

// Constants
const vt = 0.026 // Thermal voltage at room temperature (26mV)
const alpha = computed(() => beta.value / (beta.value + 1))

// DC Analysis
const ie = computed(() => {
  // I_E ≈ (VEE - V_BE) / R_E
  // Assuming V_BE ≈ 0.7V for NPN
  return (vee.value - 0.7) / re.value
})

const ic = computed(() => {
  return ie.value * alpha.value
})

const vc = computed(() => {
  return vcc.value - (ic.value * rc.value)
})

const ve = computed(() => {
  // Emitter is at approximately -0.7V relative to ground
  return -0.7
})

// AC Small Signal Analysis
const rePrime = computed(() => {
  // r'_e = 26mV / I_E
  return vt / ie.value
})

const gm = computed(() => {
  // g_m = I_C / V_T
  return ic.value / vt
})

const voltageGain = computed(() => {
  // A_v = g_m * R_C ≈ R_C / r'_e
  return gm.value * rc.value
})

const currentGain = computed(() => {
  // A_i ≈ α (slightly less than 1)
  return alpha.value
})

const inputImpedance = computed(() => {
  // Z_in ≈ r'_e (very low)
  return rePrime.value
})

const outputImpedance = computed(() => {
  // Z_out ≈ R_C (high)
  return rc.value
})

const powerGain = computed(() => {
  // A_p = A_v * A_i
  return voltageGain.value * currentGain.value
})

const bandwidth = computed(() => {
  // Approximate unity-gain frequency (simplified)
  // Real transistors have f_T in the hundreds of MHz
  return 300e6 // 300 MHz typical for small signal transistors
})

// Generate waveform paths
const generateInputWaveformPath = (offsetX, offsetY, width, amplitude) => {
  const points = []
  const cycles = 2 // Show 2 complete cycles
  
  for (let i = 0; i <= width; i += 2) {
    const angle = (i / width) * cycles * 2 * Math.PI
    const x = offsetX + i
    const y = offsetY + amplitude * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}

const generateOutputWaveformPath = (offsetX, offsetY, width, amplitude) => {
  const points = []
  const cycles = 2
  const gain = Math.min(voltageGain.value, 1.5) // Limit visual gain to prevent clipping
  
  for (let i = 0; i <= width; i += 2) {
    const angle = (i / width) * cycles * 2 * Math.PI
    const x = offsetX + i
    // Output is in-phase with input (common base characteristic)
    const y = offsetY + amplitude * gain * Math.sin(angle)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
}
</script>

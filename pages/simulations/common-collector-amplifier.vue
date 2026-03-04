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
            Common Collector Amplifier (Emitter Follower)
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the voltage follower configuration with high input impedance and current gain
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Gain:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">A_v</span>
              <span class="text-gray-400">≈</span>
              <span class="text-primary-highlight">1</span>
              <span class="text-gray-400">(unity)</span>
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
              <svg viewBox="0 0 400 450" class="w-full h-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- VCC -->
                <line x1="200" y1="20" x2="200" y2="50" stroke="#EF4444" stroke-width="3"/>
                <circle cx="200" cy="15" r="12" fill="white" stroke="#EF4444" stroke-width="2"/>
                <text x="200" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">VCC</text>

                <!-- Line to collector -->
                <line x1="200" y1="50" x2="200" y2="150" stroke="#6B7280" stroke-width="2"/>

                <!-- NPN Transistor symbol -->
                <g transform="translate(200, 190)">
                  <!-- Base terminal -->
                  <line x1="-70" y1="0" x2="-15" y2="0" stroke="#6B7280" stroke-width="2"/>
                  <!-- Base bar -->
                  <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#10B981" stroke-width="3"/>
                  <!-- Collector terminal (up) -->
                  <line x1="-15" y1="-12" x2="15" y2="-30" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="-40" x2="15" y2="-30" stroke="#6B7280" stroke-width="2"/>
                  <!-- Emitter terminal (down) with arrow pointing OUT -->
                  <line x1="-15" y1="12" x2="15" y2="30" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="30" x2="15" y2="40" stroke="#6B7280" stroke-width="2"/>
                  <!-- Emitter arrow (pointing out for NPN) -->
                  <polygon points="6,24 14,28 10,32" fill="#10B981"/>
                  <text x="25" y="-35" font-size="10" fill="#10B981">C</text>
                  <text x="25" y="45" font-size="10" fill="#10B981">E</text>
                  <text x="-60" y="5" font-size="10" fill="#10B981">B</text>
                </g>

                <!-- RE resistor (emitter resistor) -->
                <rect x="185" y="230" width="30" height="60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="230" y="265" font-size="10" fill="#8B5CF6">RE</text>
                <text x="230" y="278" font-size="9" fill="#8B5CF6">{{ re }}Ω</text>

                <!-- To ground -->
                <line x1="200" y1="290" x2="200" y2="330" stroke="#6B7280" stroke-width="2"/>
                
                <!-- Ground symbol -->
                <g transform="translate(200, 330)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-15" y1="10" x2="15" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-10" y1="15" x2="10" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-5" y1="20" x2="5" y2="20" stroke="#6B7280" stroke-width="2"/>
                </g>

                <!-- Input coupling capacitor -->
                <g>
                  <circle cx="50" cy="190" r="8" fill="white" stroke="#F59E0B" stroke-width="2"/>
                  <text x="50" y="194" text-anchor="middle" font-size="10" fill="#F59E0B">Cin</text>
                  <line x1="58" y1="190" x2="130" y2="190" stroke="#6B7280" stroke-width="2"/>
                  <line x1="10" y1="190" x2="42" y2="190" stroke="#6B7280" stroke-width="2"/>
                  <text x="10" y="185" font-size="11" fill="#F59E0B">Vin</text>
                </g>

                <!-- Output taken from emitter -->
                <g>
                  <circle cx="330" cy="255" r="8" fill="white" stroke="#EC4899" stroke-width="2"/>
                  <text x="330" y="259" text-anchor="middle" font-size="10" fill="#EC4899">Cout</text>
                  <line x1="215" y1="255" x2="322" y2="255" stroke="#6B7280" stroke-width="2"/>
                  <line x1="338" y1="255" x2="370" y2="255" stroke="#6B7280" stroke-width="2"/>
                  <text x="365" y="250" font-size="11" fill="#EC4899">Vout</text>
                </g>

                <!-- Load resistor -->
                <rect x="340" y="320" width="30" height="40" fill="white" stroke="#F59E0B" stroke-width="2"/>
                <text x="355" y="380" font-size="9" fill="#F59E0B" text-anchor="middle">RL</text>
                <line x1="355" y1="360" x2="355" y2="390" stroke="#6B7280" stroke-width="2"/>
                
                <!-- Ground for load -->
                <g transform="translate(355, 390)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-10" y1="10" x2="10" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-7" y1="14" x2="7" y2="14" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-4" y1="18" x2="4" y2="18" stroke="#6B7280" stroke-width="2"/>
                </g>
                <line x1="370" y1="255" x2="370" y2="320" stroke="#6B7280" stroke-width="2"/>
                <line x1="355" y1="320" x2="370" y2="320" stroke="#6B7280" stroke-width="2"/>

                <!-- Bias resistors labels -->
                <text x="100" y="70" font-size="9" fill="#6B7280">R1, R2</text>
                <text x="100" y="82" font-size="8" fill="#6B7280">(bias network)</text>
              </svg>
            </div>

            <!-- Component Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ⚡ Component Values
              </h3>

              <!-- VCC -->
              <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  VCC: {{ vcc }}V
                </label>
                <input
                  v-model.number="vcc"
                  type="range"
                  min="5"
                  max="24"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>5V</span>
                  <span>24V</span>
                </div>
              </div>

              <!-- RE (Emitter Resistor) -->
              <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  RE: {{ re }}Ω
                </label>
                <input
                  v-model.number="re"
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>10kΩ</span>
                </div>
              </div>

              <!-- RL (Load Resistor) -->
              <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  RL: {{ rl }}Ω
                </label>
                <input
                  v-model.number="rl"
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>10kΩ</span>
                </div>
              </div>

              <!-- Beta (Current Gain) -->
              <div class="mb-5">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  β (hFE): {{ beta }}
                </label>
                <input
                  v-model.number="beta"
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>50</span>
                  <span>500</span>
                </div>
              </div>

              <!-- Input Signal -->
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Input Amplitude: {{ inputAmplitude }}V
                </label>
                <input
                  v-model.number="inputAmplitude"
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1V</span>
                  <span>3V</span>
                </div>
              </div>

              <!-- Frequency -->
              <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Frequency: {{ frequency }}Hz
                </label>
                <input
                  v-model.number="frequency"
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Hz</span>
                  <span>5kHz</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Waveforms & Analysis -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">📊 Input/Output Waveforms</h3>
                <div class="flex gap-2">
                  <button 
                    @click="isRunning = !isRunning"
                    class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg v-if="!isRunning" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                    <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5zM8 7.5A.75.75 0 018.75 7h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 018 7.5zm0 4A.75.75 0 018.75 11h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 018 11.5z"/>
                    </svg>
                    {{ isRunning ? 'Pause' : 'Play' }}
                  </button>
                  <button 
                    @click="resetSimulation"
                    class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <canvas 
                ref="waveformCanvas" 
                class="w-full h-64 bg-gray-900 rounded-lg"
              ></canvas>
              
              <div class="flex justify-center gap-6 mt-4">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-orange-500 rounded"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Input (Vin)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-1 bg-pink-500 rounded"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Output (Vout)</span>
                </div>
              </div>
            </div>

            <!-- Live Analysis -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Circuit Parameters -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📈 Circuit Analysis
                </h3>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Voltage Gain</span>
                    <span class="font-mono font-bold text-primary-highlight">{{ voltageGain.toFixed(4) }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Current Gain (Ai)</span>
                    <span class="font-mono font-bold text-primary-highlight">{{ currentGain.toFixed(2) }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Input Impedance (Zin)</span>
                    <span class="font-mono font-bold text-primary-highlight">{{ inputImpedance.toFixed(0) }}Ω</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Output Impedance (Zout)</span>
                    <span class="font-mono font-bold text-primary-highlight">{{ outputImpedance.toFixed(1) }}Ω</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Emitter Current (IE)</span>
                    <span class="font-mono font-bold text-primary-highlight">{{ (emitterCurrent * 1000).toFixed(2) }}mA</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Phase Shift</span>
                    <span class="font-mono font-bold text-primary-highlight">0° (in-phase)</span>
                  </div>
                </div>
              </div>

              <!-- Key Characteristics -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  🎯 Key Characteristics
                </h3>
                
                <div class="space-y-3">
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p class="text-sm text-green-800 dark:text-green-300 font-semibold">✓ High Input Impedance</p>
                    <p class="text-xs text-green-600 dark:text-green-400 mt-1">
                      {{ (inputImpedance / 1000).toFixed(1) }}kΩ - Good for voltage sources
                    </p>
                  </div>
                  
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p class="text-sm text-blue-800 dark:text-blue-300 font-semibold">✓ Low Output Impedance</p>
                    <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {{ outputImpedance.toFixed(1) }}Ω - Can drive low-impedance loads
                    </p>
                  </div>
                  
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p class="text-sm text-purple-800 dark:text-purple-300 font-semibold">✓ Unity Voltage Gain</p>
                    <p class="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      Av ≈ 1 - Output follows input
                    </p>
                  </div>
                  
                  <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p class="text-sm text-yellow-800 dark:text-yellow-300 font-semibold">✓ Current Gain</p>
                    <p class="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Ai ≈ β + 1 = {{ (beta + 1).toFixed(0) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transfer Characteristic -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📉 Transfer Characteristic
              </h3>
              <canvas 
                ref="transferCanvas" 
                class="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg"
              ></canvas>
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
            📚 Understanding the Common Collector Amplifier
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Common Collector Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Common Collector (CC) amplifier, also known as an <strong>Emitter Follower</strong>, is a BJT configuration 
              where the collector is at AC ground, the input is applied to the base, and the output is taken from the emitter. 
              It's called a "follower" because the output voltage closely follows the input voltage.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage Gain ≈ 1:</strong> Output voltage is slightly less than input (typically 0.95-0.99)</li>
              <li><strong>High Input Impedance:</strong> Typically β × RE - doesn't load down the source</li>
              <li><strong>Low Output Impedance:</strong> Approximately (RE × signal_source_resistance)/β - good for driving loads</li>
              <li><strong>Current Gain:</strong> Approximately (β + 1) - provides significant current amplification</li>
              <li><strong>No Phase Inversion:</strong> Output is in-phase with input</li>
              <li><strong>Wide Bandwidth:</strong> Better high-frequency response than common emitter</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Voltage Gain Derivation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Av = Vout / Vin ≈ 1
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              More precisely:<br>
              <strong>Av = RE / (RE + re')</strong><br>
              Where re' = 25mV / IE (emitter diode resistance)<br><br>
              Since re' is typically small (26Ω at 1mA), Av is very close to unity.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Input Impedance:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Zin = (β + 1) × (RE || RL || re')
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The input impedance is high because looking into the base, you see the emitter resistance multiplied by (β + 1). 
              This makes it excellent for buffering high-impedance sources.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Output Impedance:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Zout ≈ (Rsource / β) + re'
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The output impedance is low, which means the amplifier can drive low-impedance loads without significant 
              voltage drop. This is why it's commonly used as a buffer.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Current Gain:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <code class="text-lg font-mono font-bold text-primary-highlight">
                Ai = Iout / Iin ≈ (β + 1)
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              While the voltage gain is approximately 1, the current gain is high (β + 1), making this configuration 
              useful for impedance transformation and power amplification.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Buffer Amplifier:</strong> Isolates stages prevents loading</li>
              <li><strong>Impedance Matching:</strong> Matches high impedance sources to low impedance loads</li>
              <li><strong>Output Stage:</strong> Final stage in audio amplifiers (can drive speakers)</li>
              <li><strong>Level Shifter:</strong> Can shift DC levels while maintaining AC signal</li>
              <li><strong>Driver Stage:</strong> Drives push-pull output stages in power amplifiers</li>
              <li><strong>Sensor Interface:</strong> High input impedance for weak signals</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Other Configurations:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Configuration</th>
                    <th class="text-left py-2">Voltage Gain</th>
                    <th class="text-left py-2">Current Gain</th>
                    <th class="text-left py-2">Input Z</th>
                    <th class="text-left py-2">Output Z</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Common Emitter</td>
                    <td class="py-2">High (-Rc/Re)</td>
                    <td class="py-2">Medium (β)</td>
                    <td class="py-2">Medium</td>
                    <td class="py-2">Medium</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Common Base</td>
                    <td class="py-2">High (Rc/Re)</td>
                    <td class="py-2">Low (&lt;1)</td>
                    <td class="py-2">Low</td>
                    <td class="py-2">High</td>
                  </tr>
                  <tr>
                    <td class="py-2 font-semibold">Common Collector</td>
                    <td class="py-2">~1 (unity)</td>
                    <td class="py-2">High (β+1)</td>
                    <td class="py-2">High</td>
                    <td class="py-2">Low</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Q-point Stability:</strong> Use voltage divider bias for stable DC operating point</li>
              <li><strong>Coupling Capacitors:</strong> Choose values that pass desired frequencies</li>
              <li><strong>Emitter Resistor:</strong> Larger RE increases input impedance but reduces output swing</li>
              <li><strong>Load Matching:</strong> For best power transfer, Zout should be much less than load</li>
              <li><strong>Temperature Effects:</strong> VBE decreases with temperature (~2mV/°C) - affects bias</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why "Emitter Follower"?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The output at the emitter "follows" the input at the base. If Vin increases by 0.5V, Vout also increases 
              by approximately 0.5V. The emitter voltage is always about 0.7V (VBE) below the base voltage, so AC 
              signals pass through with nearly unity gain.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Microphone Preamp Buffer:</strong> A microphone might have an output impedance of 10kΩ. If you connect 
              it directly to a 600Ω input, most of the signal is lost. A common collector amplifier with Zin = 100kΩ and 
              Zout = 100Ω can bridge this impedance mismatch, preserving signal amplitude.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Common Collector Amplifier Simulation - Cyno Electric</p>
        <p class="text-sm mt-2">Understanding the voltage follower configuration</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useColorMode, useHead } from '#app'

const colorMode = useColorMode()

// Component values
const vcc = ref(12)
const re = ref(1000)
const rl = ref(1000)
const beta = ref(100)
const inputAmplitude = ref(0.5)
const frequency = ref(1000)

// Canvas references
const waveformCanvas = ref<HTMLCanvasElement | null>(null)
const transferCanvas = ref<HTMLCanvasElement | null>(null)

// Animation state
const isRunning = ref(true)
const animationId = ref<number | null>(null)
const time = ref(0)

// Constants
const VT = 0.026  // Thermal voltage at room temperature

// Circuit analysis
const emitterCurrent = computed(() => {
  const vB = vcc.value / 2  // Assuming voltage divider sets Vbase ≈ VCC/2
  const vE = vB - 0.7  // VBE ≈ 0.7V
  return Math.max(0, vE / re.value)
})

const rePrime = computed(() => {
  return VT / Math.max(emitterCurrent.value, 0.000001)
})

const resistanceParallel = computed(() => {
  return (re.value * rl.value) / (re.value + rl.value)
})

const voltageGain = computed(() => {
  return resistanceParallel.value / (resistanceParallel.value + rePrime.value)
})

const currentGain = computed(() => {
  return beta.value + 1
})

const inputImpedance = computed(() => {
  return (beta.value + 1) * (resistanceParallel.value + rePrime.value)
})

const outputImpedance = computed(() => {
  // Assuming source resistance of 1kΩ
  const rSource = 1000
  return (rSource / (beta.value + 1)) + rePrime.value
})

// Animation loop
function animate() {
  if (!isRunning.value) return
  
  time.value += 1
  drawWaveforms()
  drawTransferCharacteristic()
  
  animationId.value = requestAnimationFrame(animate)
}

function drawWaveforms() {
  if (!waveformCanvas.value) return
  
  const canvas = waveformCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  canvas.width = width * 2
  canvas.height = height * 2
  ctx.scale(2, 2)
  
  // Clear
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)
  
  // Grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 0.5
  for (let i = 0; i < width; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }
  for (let i = 0; i < height; i += 40) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(width, i)
    ctx.stroke()
  }
  
  // Center line
  ctx.strokeStyle = '#6B7280'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  
  // Calculate actual output amplitude (slightly less than input)
  const outputAmplitude = inputAmplitude.value * voltageGain.value
  
  // Draw input waveform (orange)
  ctx.strokeStyle = '#F59E0B'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + (time.value * frequency.value / 10000)
    const y = height / 2 - (inputAmplitude.value / 3) * Math.sin(t) * (height / 2.5)
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Draw output waveform (pink)
  ctx.strokeStyle = '#EC4899'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0; x < width; x++) {
    const t = (x / width) * 4 * Math.PI + (time.value * frequency.value / 10000)
    const y = height / 2 - (outputAmplitude / 3) * Math.sin(t) * (height / 2.5)
    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Labels
  ctx.fillStyle = '#9CA3AF'
  ctx.font = '12px sans-serif'
  ctx.fillText(`Vin: ${inputAmplitude.toFixed(2)}V`, 10, 20)
  ctx.fillText(`Vout: ${outputAmplitude.toFixed(2)}V`, 10, 40)
  ctx.fillText(`Gain: ${voltageGain.value.toFixed(4)}`, 10, 60)
}

function drawTransferCharacteristic() {
  if (!transferCanvas.value) return
  
  const canvas = transferCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  canvas.width = width * 2
  canvas.height = height * 2
  ctx.scale(2, 2)
  
  // Clear
  ctx.fillStyle = colorMode.value === 'dark' ? '#111827' : '#F9FAFB'
  ctx.fillRect(0, 0, width, height)
  
  const padding = 50
  const graphWidth = width - 2 * padding
  const graphHeight = height - 2 * padding
  
  // Draw axes
  ctx.strokeStyle = colorMode.value === 'dark' ? '#6B7280' : '#9CA3AF'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)  // Y axis
  ctx.lineTo(width - padding, height - padding)  // X axis
  ctx.stroke()
  
  // Axis labels
  ctx.fillStyle = colorMode.value === 'dark' ? '#9CA3AF' : '#6B7280'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Input Voltage (V)', width / 2, height - 10)
  ctx.save()
  ctx.translate(15, height / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Output Voltage (V)', 0, 0)
  ctx.restore()
  
  // Draw transfer characteristic curve
  ctx.strokeStyle = '#8B5CF6'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  const vBE = 0.7
  const maxInput = 3
  const maxOutput = vcc.value - 0.5
  
  for (let i = 0; i <= graphWidth; i++) {
    const vin = (i / graphWidth) * maxInput
    let vout = 0
    
    if (vin > vBE) {
      vout = Math.min(vin - vBE, maxOutput)
    }
    
    const x = padding + i
    const y = height - padding - (vout / maxOutput) * graphHeight
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Draw ideal follower line (dashed)
  ctx.strokeStyle = colorMode.value === 'dark' ? '#4B5563' : '#D1D5DB'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(padding, height - padding)
  ctx.lineTo(padding + graphWidth, height - padding - graphWidth)
  ctx.stroke()
  ctx.setLineDash([])
  
  // Current operating point
  const currentVin = inputAmplitude.value
  const currentVout = Math.max(0, currentVin - vBE)
  
  const cx = padding + (currentVin / maxInput) * graphWidth
  const cy = height - padding - (currentVout / maxOutput) * graphHeight
  
  ctx.fillStyle = '#EC4899'
  ctx.beginPath()
  ctx.arc(cx, cy, 8, 0, 2 * Math.PI)
  ctx.fill()
  
  // Working point label
  ctx.fillStyle = colorMode.value === 'dark' ? '#F3F4F6' : '#1F2937'
  ctx.font = '11px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`(${currentVin.toFixed(2)}V, ${currentVout.toFixed(2)}V)`, cx + 12, cy - 5)
  
  // Tick labels
  ctx.textAlign = 'center'
  ctx.fillText('0', padding, height - padding + 15)
  ctx.fillText(maxInput.toFixed(0), width - padding, height - padding + 15)
  ctx.textAlign = 'right'
  ctx.fillText('0', padding - 5, height - padding)
  ctx.fillText(maxOutput.toFixed(1), padding - 5, padding)
}

function resetSimulation() {
  time.value = 0
  vcc.value = 12
  re.value = 1000
  rl.value = 1000
  beta.value = 100
  inputAmplitude.value = 0.5
  frequency.value = 1000
}

// Watch for parameter changes
watch([vcc, re, rl, beta, inputAmplitude, frequency, colorMode], () => {
  if (!isRunning.value) {
    drawWaveforms()
    drawTransferCharacteristic()
  }
})

onMounted(() => {
  animate()
  window.addEventListener('resize', () => {
    drawWaveforms()
    drawTransferCharacteristic()
  })
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// SEO
useHead({
  title: 'Common Collector Amplifier Simulator - Emitter Follower',
  meta: [
    { name: 'description', content: 'Interactive common collector amplifier (emitter follower) simulation. Learn voltage follower characteristics, impedance matching, and buffering applications.' }
  ]
})
</script>

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
            Common Emitter Amplifier Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the classic BJT amplifier configuration with real-time waveform visualization
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Gain:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">A_v</span>
              <span class="text-gray-400">≈</span>
              <span class="text-primary-highlight">-R_C</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">R_E</span>
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
              <svg viewBox="0 0 400 500" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- VCC -->
                <line x1="200" y1="20" x2="200" y2="50" stroke="#EF4444" stroke-width="3"/>
                <circle cx="200" cy="15" r="12" fill="white" stroke="#EF4444" stroke-width="2"/>
                <text x="200" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">VCC</text>

                <!-- RC resistor -->
                <rect x="185" y="50" width="30" height="60" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="230" y="85" font-size="10" fill="#3B82F6">RC</text>
                <text x="230" y="98" font-size="9" fill="#3B82F6">{{ rc }}Ω</text>

                <!-- Line to collector -->
                <line x1="200" y1="110" x2="200" y2="140" stroke="#6B7280" stroke-width="2"/>

                <!-- NPN Transistor symbol -->
                <g transform="translate(200, 180)">
                  <!-- Base terminal -->
                  <line x1="-50" y1="0" x2="-15" y2="0" stroke="#6B7280" stroke-width="2"/>
                  <!-- Base bar -->
                  <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#10B981" stroke-width="3"/>
                  <!-- Collector terminal -->
                  <line x1="-15" y1="-12" x2="15" y2="-30" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="-30" x2="15" y2="-40" stroke="#6B7280" stroke-width="2"/>
                  <!-- Emitter terminal with arrow -->
                  <line x1="-15" y1="12" x2="15" y2="30" stroke="#10B981" stroke-width="2"/>
                  <line x1="15" y1="30" x2="15" y2="40" stroke="#6B7280" stroke-width="2"/>
                  <!-- Emitter arrow -->
                  <line x1="6" y1="24" x2="14" y2="28" stroke="#10B981" stroke-width="2" marker-end="url(#arrowhead)"/>
                  <text x="25" y="-35" font-size="10" fill="#10B981">C</text>
                  <text x="25" y="45" font-size="10" fill="#10B981">E</text>
                  <text x="-40" y="5" font-size="10" fill="#10B981">B</text>
                </g>

                <!-- Line from collector up -->
                <line x1="200" y1="140" x2="215" y2="140" stroke="#6B7280" stroke-width="2"/>

                <!-- RE resistor -->
                <rect x="185" y="220" width="30" height="60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="230" y="255" font-size="10" fill="#8B5CF6">RE</text>
                <text x="230" y="268" font-size="9" fill="#8B5CF6">{{ re }}Ω</text>

                <!-- To ground -->
                <line x1="200" y1="280" x2="200" y2="320" stroke="#6B7280" stroke-width="2"/>
                
                <!-- Ground symbol -->
                <g transform="translate(200, 320)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-15" y1="10" x2="15" y2="10" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-10" y1="15" x2="10" y2="15" stroke="#6B7280" stroke-width="2"/>
                  <line x1="-5" y1="20" x2="5" y2="20" stroke="#6B7280" stroke-width="2"/>
                </g>

                <!-- Input coupling -->
                <g>
                  <circle cx="70" cy="180" r="8" fill="white" stroke="#F59E0B" stroke-width="2"/>
                  <text x="70" y="184" text-anchor="middle" font-size="10" fill="#F59E0B">Cin</text>
                  <line x1="78" y1="180" x2="150" y2="180" stroke="#6B7280" stroke-width="2"/>
                  <line x1="30" y1="180" x2="62" y2="180" stroke="#6B7280" stroke-width="2"/>
                  <text x="30" y="175" font-size="11" fill="#F59E0B">Vin</text>
                </g>

                <!-- Output coupling -->
                <g>
                  <circle cx="330" cy="140" r="8" fill="white" stroke="#EC4899" stroke-width="2"/>
                  <text x="330" y="144" text-anchor="middle" font-size="10" fill="#EC4899">Cout</text>
                  <line x1="215" y1="140" x2="322" y2="140" stroke="#6B7280" stroke-width="2"/>
                  <line x1="338" y1="140" x2="370" y2="140" stroke="#6B7280" stroke-width="2"/>
                  <text x="365" y="135" font-size="11" fill="#EC4899">Vout</text>
                </g>

                <!-- Bias resistors labels -->
                <text x="120" y="100" font-size="9" fill="#6B7280">R1, R2</text>
                <text x="120" y="112" font-size="8" fill="#6B7280">(bias)</text>
              </svg>
            </div>

            <!-- Component Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎛️ Component Values</h3>
              
              <div class="space-y-4">
                <!-- VCC -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>VCC (Supply Voltage)</span>
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

                <!-- Beta (hFE) -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Beta (hFE - Current Gain)</span>
                    <span class="text-primary">{{ beta }}</span>
                  </label>
                  <input
                    v-model.number="beta"
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>50</span>
                    <span>400</span>
                  </div>
                </div>

                <!-- Input Frequency -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Input Frequency</span>
                    <span class="text-primary">{{ frequency }} Hz</span>
                  </label>
                  <input
                    v-model.number="frequency"
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>100Hz</span>
                    <span>10kHz</span>
                  </div>
                </div>

                <!-- Input Amplitude -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Input Amplitude</span>
                    <span class="text-primary">{{ inputAmplitude }} mV</span>
                  </label>
                  <input
                    v-model.number="inputAmplitude"
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10mV</span>
                    <span>200mV</span>
                  </div>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="flex gap-3 mt-6">
                <button
                  @click="isRunning = !isRunning"
                  :class="[
                    'flex-1 py-2 px-4 rounded-lg font-semibold transition-all',
                    isRunning
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ isRunning ? '⏸️ Pause' : '▶️ Play' }}
                </button>
                <button
                  @click="resetSimulation"
                  class="flex-1 py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Waveforms & Results -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Input/Output Waveforms -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Waveform Visualization</h3>
              
              <div class="grid grid-cols-1 gap-4">
                <!-- Input Waveform -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-amber-600 dark:text-amber-400">Input (Vin)</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ inputAmplitude }} mV peak @ {{ frequency }} Hz</span>
                  </div>
                  <canvas ref="inputCanvas" class="w-full h-32 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-lg border border-amber-200 dark:border-amber-800"></canvas>
                </div>

                <!-- Output Waveform -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-pink-600 dark:text-pink-400">Output (Vout)</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ (outputAmplitude * 1000).toFixed(1) }} mV peak, {{ (voltageGain * 100).toFixed(1) }}% gain</span>
                  </div>
                  <canvas ref="outputCanvas" class="w-full h-32 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg border border-pink-200 dark:border-pink-800"></canvas>
                </div>
              </div>
            </div>

            <!-- Calculated Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Amplifier Analysis</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                  <div class="text-sm text-blue-600 dark:text-blue-400 mb-1">Voltage Gain</div>
                  <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {{ voltageGain.toFixed(2) }}
                  </div>
                  <div class="text-xs text-blue-500 dark:text-blue-400">Av = -RC/RE</div>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
                  <div class="text-sm text-green-600 dark:text-green-400 mb-1">Phase Shift</div>
                  <div class="text-2xl font-bold text-green-700 dark:text-green-300">
                    180°
                  </div>
                  <div class="text-xs text-green-500 dark:text-green-400">Inverted</div>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                  <div class="text-sm text-purple-600 dark:text-purple-400 mb-1">Output Amplitude</div>
                  <div class="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {{ (outputAmplitude * 1000).toFixed(1) }}
                  </div>
                  <div class="text-xs text-purple-500 dark:text-purple-400">mV peak</div>
                </div>

                <div class="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-4">
                  <div class="text-sm text-amber-600 dark:text-amber-400 mb-1">Quiescent Current</div>
                  <div class="text-2xl font-bold text-amber-700 dark:text-amber-300">
                    {{ quiescentCurrent.toFixed(2) }}
                  </div>
                  <div class="text-xs text-amber-500 dark:text-amber-400">mA (approx)</div>
                </div>
              </div>

              <!-- Additional Calculations -->
              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Input Impedance (approx)</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
                    {{ inputImpedance.toFixed(1) }} kΩ
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Output Impedance</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
                    ≈ {{ rc }}Ω
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Bandwidth</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Wide
                  </div>
                </div>
              </div>

              <!-- Operating Point Info -->
              <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">ℹ️ Operating Point Notes:</div>
                <ul class="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Quiescent point: V_C ≈ {{ (vcc / 2).toFixed(1) }}V (mid-rail for maximum swing)</li>
                  <li>• Negative phase: Output is inverted 180° from input</li>
                  <li>• Gain controlled by RC/RE ratio</li>
                  <li>• Emitter bypass capacitor can increase gain (not shown)</li>
                </ul>
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
            📚 Understanding Common Emitter Amplifiers
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Common Emitter Amplifier?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The common emitter (CE) amplifier is one of the most widely used transistor amplifier configurations.
              It provides good voltage gain, moderate current gain, and reverses the phase of the signal (180° phase shift).
              The emitter terminal is common to both input and output, hence the name.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Characteristics:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>High voltage gain:</strong> Typically 20-100 or more</li>
              <li><strong>Phase inversion:</strong> Output is 180° out of phase with input</li>
              <li><strong>Moderate input impedance:</strong> Around 1kΩ to 10kΩ</li>
              <li><strong>Moderate output impedance:</strong> Approximately equal to RC</li>
              <li><strong>Good frequency response:</strong> Suitable for audio and RF applications</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Voltage Gain Formula:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For a CE amplifier with an unbypassed emitter resistor:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              A_v = -R_C / R_E
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The negative sign indicates phase inversion. If the emitter resistor is bypassed with a capacitor,
              the gain increases to:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              A_v = -R_C / r_e
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where r_e ≈ 25mV / I_E is the emitter internal resistance.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Biasing the Amplifier:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Proper biasing is crucial for linear amplification. The voltage divider bias (R1 and R2) sets
              the base voltage, which establishes the quiescent collector current. This ensures the transistor
              operates in the active region, allowing it to amplify both positive and negative halves of the signal.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Gain vs. Stability:</strong> Higher RC increases gain but reduces output voltage swing</li>
              <li><strong>Emitter resistor:</strong> Provides negative feedback, stabilizing the operating point</li>
              <li><strong>Coupling capacitors:</strong> Block DC while allowing AC signals to pass</li>
              <li><strong>Bypass capacitor:</strong> Can be placed across RE for higher gain (not shown in this sim)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Audio preamplifiers</li>
              <li>Radio frequency (RF) amplifiers</li>
              <li>General-purpose signal amplification</li>
              <li>Pulse and digital signal conditioning</li>
              <li>Oscillator circuits</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Design:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For a 12V supply with voltage gain of 10:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Choose RC = 4.7kΩ (sets output impedance)</li>
              <li>Choose RE = 470Ω (provides gain of 10 and stability)</li>
              <li>Set bias for IC ≈ 1mA (quiescent point)</li>
              <li>Result: Av ≈ -10, output can swing ±5V</li>
            </ul>

            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 my-4">
              <p class="text-sm text-green-800 dark:text-green-300 font-semibold mb-2">✅ Advantages of CE Amplifier:</p>
              <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>• High voltage gain</li>
                <li>• Good power gain</li>
                <li>• Versatile and widely used</li>
                <li>• Simple design</li>
              </ul>
            </div>

            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 my-4">
              <p class="text-sm text-red-800 dark:text-red-300 font-semibold mb-2">⚠️ Limitations:</p>
              <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                <li>• Phase inversion (may not be desired in some applications)</li>
                <li>• Limited bandwidth at very high frequencies</li>
                <li>• Sensitive to temperature changes</li>
                <li>• Requires proper biasing for linear operation</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Related Configurations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Common Base:</strong> Non-inverting, low input impedance, high frequency response</li>
              <li><strong>Common Collector (Emitter Follower):</strong> Unity voltage gain, high current gain, low output impedance</li>
              <li><strong>Darlington Pair:</strong> Two CE stages cascaded for extremely high current gain</li>
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
  title: 'Common Emitter Amplifier Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive common emitter amplifier simulation. Explore BJT amplifier characteristics, voltage gain, and waveform visualization.' },
    { name: 'keywords', content: 'common emitter amplifier, BJT amplifier, transistor amplifier, voltage gain, circuit simulation' }
  ]
})

const colorMode = useColorMode()

// Canvas refs
const inputCanvas = ref<HTMLCanvasElement | null>(null)
const outputCanvas = ref<HTMLCanvasElement | null>(null)

// Circuit parameters
const vcc = ref(12)
const rc = ref(4700)
const re = ref(470)
const beta = ref(150)
const frequency = ref(1000)
const inputAmplitude = ref(50) // mV

// Simulation state
const isRunning = ref(true)
const animationId = ref<number | null>(null)
const time = ref(0)

// Calculated values
const voltageGain = computed(() => {
  return -(rc.value / re.value)
})

const outputAmplitude = computed(() => {
  const gainAbs = Math.abs(voltageGain.value)
  return (inputAmplitude.value / 1000) * gainAbs // Convert mV to V
})

const quiescentCurrent = computed(() => {
  // Approximate IC ≈ (VCC/2) / RC (assuming bias for mid-rail operation)
  return ((vcc.value / 2) / rc.value) * 1000 // Convert to mA
})

const inputImpedance = computed(() => {
  // Approximate input impedance: β × RE || R1 || R2
  // Simplified: assume β × RE dominates
  return (beta.value * re.value) / 1000 // Convert to kΩ
})

// Animation loop
const animate = () => {
  if (!isRunning.value) return
  
  time.value += 0.05
  drawWaveforms()
  animationId.value = requestAnimationFrame(animate)
}

const drawWaveforms = () => {
  if (!inputCanvas.value || !outputCanvas.value) return
  
  const inputCtx = inputCanvas.value.getContext('2d')
  const outputCtx = outputCanvas.value.getContext('2d')
  
  if (!inputCtx || !outputCtx) return
  
  // Set canvas size
  const width = inputCanvas.value.width = inputCanvas.value.offsetWidth * 2
  const height = inputCanvas.value.height = inputCanvas.value.offsetHeight * 2
  outputCanvas.value.width = outputCanvas.value.offsetWidth * 2
  outputCanvas.value.height = outputCanvas.value.offsetHeight * 2
  
  // Clear canvases
  inputCtx.clearRect(0, 0, width, height)
  outputCtx.clearRect(0, 0, width, height)
  
  // Draw input waveform (sine wave)
  inputCtx.strokeStyle = colorMode.value === 'dark' ? '#F59E0B' : '#D97706'
  inputCtx.lineWidth = 3
  inputCtx.beginPath()
  
  const inputAmp = inputAmplitude.value / 1000 // Convert to V
  const angularFreq = 2 * Math.PI * frequency.value / 1000 // Scaled for visualization
  
  for (let x = 0; x < width; x++) {
    const t = (x / width) * (2 * Math.PI * 2) + time.value // 2 cycles
    const y = height / 2 - (inputAmp * 50) * Math.sin(angularFreq * t * 0.5)
    
    if (x === 0) {
      inputCtx.moveTo(x, y)
    } else {
      inputCtx.lineTo(x, y)
    }
  }
  inputCtx.stroke()
  
  // Draw center line for input
  inputCtx.strokeStyle = colorMode.value === 'dark' ? '#4B5563' : '#D1D5DB'
  inputCtx.lineWidth = 1
  inputCtx.setLineDash([5, 5])
  inputCtx.beginPath()
  inputCtx.moveTo(0, height / 2)
  inputCtx.lineTo(width, height / 2)
  inputCtx.stroke()
  inputCtx.setLineDash([])
  
  // Draw output waveform (inverted sine wave)
  outputCtx.strokeStyle = colorMode.value === 'dark' ? '#EC4899' : '#DB2777'
  outputCtx.lineWidth = 3
  outputCtx.beginPath()
  
  const gain = Math.abs(voltageGain.value)
  
  for (let x = 0; x < width; x++) {
    const t = (x / width) * (2 * Math.PI * 2) + time.value // 2 cycles
    // Inverted output (180° phase shift) = +sin instead of -sin
    const y = height / 2 - (inputAmp * gain * 50) * Math.sin(angularFreq * t * 0.5)
    
    if (x === 0) {
      outputCtx.moveTo(x, y)
    } else {
      outputCtx.lineTo(x, y)
    }
  }
  outputCtx.stroke()
  
  // Draw center line for output
  outputCtx.strokeStyle = colorMode.value === 'dark' ? '#4B5563' : '#D1D5DB'
  outputCtx.lineWidth = 1
  outputCtx.setLineDash([5, 5])
  outputCtx.beginPath()
  outputCtx.moveTo(0, height / 2)
  outputCtx.lineTo(width, height / 2)
  outputCtx.stroke()
  outputCtx.setLineDash([])
  
  // Draw labels
  inputCtx.fillStyle = colorMode.value === 'dark' ? '#9CA3AF' : '#6B7280'
  inputCtx.font = '24px sans-serif'
  inputCtx.fillText('+', 10, 30)
  inputCtx.fillText('-', 10, height - 10)
  
  outputCtx.fillStyle = colorMode.value === 'dark' ? '#9CA3AF' : '#6B7280'
  outputCtx.font = '24px sans-serif'
  outputCtx.fillText('+', 10, 30)
  outputCtx.fillText('-', 10, height - 10)
}

const resetSimulation = () => {
  vcc.value = 12
  rc.value = 4700
  re.value = 470
  beta.value = 150
  frequency.value = 1000
  inputAmplitude.value = 50
  time.value = 0
}

// Lifecycle hooks
onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// Watch for running state changes
watch(isRunning, (running) => {
  if (running) {
    animate()
  } else if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

// Redraw when parameters change
watch([vcc, rc, re, beta, frequency, inputAmplitude, colorMode], () => {
  if (!isRunning.value) {
    drawWaveforms()
  }
})
</script>

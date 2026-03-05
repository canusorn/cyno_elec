<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Cascode Amplifier Simulation
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore the high-frequency performance advantages of the cascode configuration
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Circuit Parameters -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              Circuit Parameters
            </h3>

            <div class="space-y-5">
              <!-- VCC -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    VCC (V)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ vcc }}V</span>
                </div>
                <input
                  type="range"
                  v-model.number="vcc"
                  min="5"
                  max="24"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>5V</span>
                  <span>24V</span>
                </div>
              </div>

              <!-- Collector Resistor RC -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    RC (kΩ)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ rc }}kΩ</span>
                </div>
                <input
                  type="range"
                  v-model.number="rc"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1kΩ</span>
                  <span>10kΩ</span>
                </div>
              </div>

              <!-- Emitter Resistor RE -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    RE (kΩ)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ re }}kΩ</span>
                </div>
                <input
                  type="range"
                  v-model.number="re"
                  min="0.1"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1kΩ</span>
                  <span>5kΩ</span>
                </div>
              </div>

              <!-- Beta -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Transistor β (hFE)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ beta }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="beta"
                  min="50"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>50</span>
                  <span>500</span>
                </div>
              </div>

              <!-- Input Amplitude -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Input Amplitude (mV)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ inputAmplitude }}mV</span>
                </div>
                <input
                  type="range"
                  v-model.number="inputAmplitude"
                  min="1"
                  max="50"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1mV</span>
                  <span>50mV</span>
                </div>
              </div>

              <!-- Frequency -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Frequency (kHz)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ frequency }}kHz</span>
                </div>
                <input
                  type="range"
                  v-model.number="frequency"
                  min="0.1"
                  max="100"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1kHz</span>
                  <span>100kHz</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison Toggle -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔄 Comparison Mode</h3>
            <div class="space-y-2">
              <button
                @click="showComparison = !showComparison"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-medium transition-all',
                  showComparison
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                ]"
              >
                {{ showComparison ? '✅ Showing' : 'Show' }} CE vs Cascode
              </button>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Compare Common Emitter vs Cascode performance
              </p>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚡ Quick Presets</h3>
            <div class="space-y-2">
              <button
                v-for="preset in presets"
                :key="preset.name"
                @click="applyPreset(preset)"
                class="w-full px-3 py-2 text-sm bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 dark:from-primary/20 dark:to-primary/10 rounded-lg text-left transition-all"
              >
                <div class="font-medium text-gray-900 dark:text-white">{{ preset.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ preset.description }}</div>
              </button>
            </div>
          </div>

          <!-- Animation Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎬 Animation</h3>
            <div class="flex gap-2">
              <button
                @click="toggleAnimation"
                :class="[
                  'flex-1 px-4 py-2 rounded-lg font-medium transition-all',
                  isPlaying
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500 text-white'
                ]"
              >
                {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
              </button>
              <button
                @click="resetAnimation"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
              >
                ↺ Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Visualization and Results -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              Cascode Circuit Diagram
            </h3>
            <svg viewBox="0 0 700 400" class="w-full h-auto">
              <!-- Background -->
              <rect width="700" height="400" fill="#f9fafb" class="dark:fill-gray-900" rx="10"/>

              <!-- Title -->
              <text x="350" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#1f2937" class="dark:fill-white">
                Cascode Amplifier (CE-CB Configuration)
              </text>

              <!-- VCC line -->
              <line x1="100" y1="50" x2="600" y2="50" stroke="#dc2626" stroke-width="3"/>
              <text x="350" y="45" text-anchor="middle" font-size="14" fill="#dc2626" font-weight="bold">+VCC</text>

              <!-- RC resistor -->
              <rect x="420" y="50" width="40" height="80" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
              <text x="440" y="95" text-anchor="middle" font-size="11" font-family="monospace" fill="#92400e">RC</text>
              <text x="470" y="95" text-anchor="start" font-size="10" fill="#78716c">{{ rc }}kΩ</text>

              <!-- Q1 (Common Emitter) -->
              <circle cx="440" cy="180" r="35" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2"/>
              <text x="440" y="175" text-anchor="middle" font-size="14" font-weight="bold" fill="#4338ca">Q1</text>
              <text x="440" y="190" text-anchor="middle" font-size="10" fill="#4338ca">(CE)</text>

              <!-- Q1 connections -->
              <line x1="440" y1="145" x2="440" y2="130" stroke="#4f46e5" stroke-width="2"/> <!-- Collector -->
              <line x1="405" y1="180" x2="250" y2="180" stroke="#4f46e5" stroke-width="2"/> <!-- Base -->
              <line x1="440" y1="215" x2="440" y2="250" stroke="#4f46e5" stroke-width="2"/> <!-- Emitter -->

              <!-- Q2 (Common Base) -->
              <circle cx="440" cy="290" r="35" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
              <text x="440" y="285" text-anchor="middle" font-size="14" font-weight="bold" fill="#1d4ed8">Q2</text>
              <text x="440" y="300" text-anchor="middle" font-size="10" fill="#1d4ed8">(CB)</text>

              <!-- Q2 connections -->
              <line x1="440" y1="255" x2="440" y2="250" stroke="#3b82f6" stroke-width="2"/> <!-- Collector (connected to Q1 emitter) -->
              <line x1="475" y1="290" x2="550" y2="290" stroke="#3b82f6" stroke-width="2"/> <!-- Base (AC ground) -->
              <line x1="550" y1="290" x2="550" y2="350" stroke="#3b82f6" stroke-width="2"/> <!-- Base to ground -->
              <line x1="550" y1="350" x2="440" y2="350" stroke="#3b82f6" stroke-width="2"/>
              <line x1="440" y1="325" x2="440" y2="350" stroke="#3b82f6" stroke-width="2"/> <!-- Emitter to ground -->

              <!-- RE resistor -->
              <rect x="420" y="350" width="40" height="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
              <text x="440" y="370" text-anchor="middle" font-size="11" font-family="monospace" fill="#92400e">RE</text>
              <text x="440" y="395" text-anchor="middle" font-size="10" fill="#78716c">{{ re }}kΩ</text>

              <!-- Output -->
              <line x1="440" y1="50" x2="600" y2="50" stroke="#10b981" stroke-width="2"/>
              <line x1="600" y1="50" x2="600" y2="380" stroke="#10b981" stroke-width="2"/>
              <circle cx="600" cy="380" r="6" fill="#10b981"/>
              <text x="615" y="385" text-anchor="start" font-size="12" font-weight="bold" fill="#059669">VOUT</text>

              <!-- Input -->
              <circle cx="250" cy="180" r="6" fill="#ec4899"/>
              <text x="235" y="185" text-anchor="end" font-size="12" font-weight="bold" fill="#db2777">VIN</text>

              <!-- Coupling capacitors -->
              <rect x="300" y="172" width="20" height="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
              <text x="310" y="184" text-anchor="middle" font-size="10" fill="#92400e">Cin</text>

              <!-- AC ground symbol for Q2 base -->
              <line x1="540" y1="350" x2="560" y2="350" stroke="#6b7280" stroke-width="2"/>
              <line x1="545" y1="355" x2="555" y2="355" stroke="#6b7280" stroke-width="2"/>
              <line x1="550" y1="360" x2="550" y2="365" stroke="#6b7280" stroke-width="2"/>

              <!-- Labels -->
              <text x="490" y="160" font-size="10" fill="#6b7280">Reduced Miller Effect</text>
              <line x1="480" y1="165" x2="440" y2="175" stroke="#6b7280" stroke-width="1" stroke-dasharray="3,3"/>

              <text x="320" y="240" font-size="10" fill="#6b7280">High Input Impedance</text>
              <line x1="360" y1="235" x2="405" y2="200" stroke="#6b7280" stroke-width="1" stroke-dasharray="3,3"/>

              <text x="520" y="320" font-size="10" fill="#6b7280">Low Output Impedance</text>
              <line x1="515" y1="315" x2="475" y2="300" stroke="#6b7280" stroke-width="1" stroke-dasharray="3,3"/>

              <!-- Key points -->
              <g transform="translate(100, 100)">
                <rect width="130" height="85" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" rx="5"/>
                <text x="10" y="20" font-size="11" font-weight="bold" fill="#15803d">Key Benefits:</text>
                <text x="10" y="38" font-size="9" fill="#166534">✓ Higher bandwidth</text>
                <text x="10" y="53" font-size="9" fill="#166534">✓ Reduced Miller effect</text>
                <text x="10" y="68" font-size="9" fill="#166534">✓ Better high-freq</text>
                <text x="10" y="83" font-size="9" fill="#166534">✓ Stable gain</text>
              </g>
            </svg>
          </div>

          <!-- Waveform Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Input/Output Waveforms
            </h3>
            <canvas ref="waveformCanvas" class="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg"></canvas>
          </div>

          <!-- Frequency Response -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">📊 Frequency Response Comparison</h3>
            <canvas ref="bodeCanvas" class="w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg"></canvas>
          </div>

          <!-- Live Analysis -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">📈 Live Circuit Analysis</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Voltage Gain -->
              <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Voltage Gain</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ (analysis.gain).toFixed(2) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Av ≈ gm × RC</div>
              </div>

              <!-- Input Impedance -->
              <div class="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Input Impedance</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ formatImpedance(analysis.inputImpedance) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Zin ≈ β × re</div>
              </div>

              <!-- Output Impedance -->
              <div class="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Output Impedance</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ formatImpedance(analysis.outputImpedance) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Zout ≈ RC</div>
              </div>

              <!-- Bandwidth -->
              <div class="bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">-3dB Bandwidth</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ formatFrequency(analysis.bandwidth) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">High-frequency extension</div>
              </div>

              <!-- Miller Capacitance -->
              <div class="bg-gradient-to-br from-orange-500/10 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Miller Capacitance</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ (analysis.millerCapacitance * 1e12).toFixed(2) }} pF
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Reduced in cascode</div>
              </div>

              <!-- Transconductance -->
              <div class="bg-gradient-to-br from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/10 rounded-xl p-4">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Transconductance</div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ (analysis.gm * 1e3).toFixed(2) }} mS
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">gm = IC / VT</div>
              </div>
            </div>

            <!-- Comparison Table (if enabled) -->
            <div v-if="showComparison" class="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cascode vs Common Emitter</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Parameter</th>
                      <th class="text-center py-2 px-3 text-gray-700 dark:text-gray-300">Cascode</th>
                      <th class="text-center py-2 px-3 text-gray-700 dark:text-gray-300">Common Emitter</th>
                      <th class="text-center py-2 px-3 text-gray-700 dark:text-gray-300">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Bandwidth</td>
                      <td class="py-2 px-3 text-center font-mono text-primary">{{ formatFrequency(analysis.bandwidth) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-gray-500">{{ formatFrequency(analysis.ceBandwidth) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-green-500">{{ (analysis.bandwidth / analysis.ceBandwidth).toFixed(1) }}×</td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Miller Capacitance</td>
                      <td class="py-2 px-3 text-center font-mono text-primary">{{ (analysis.millerCapacitance * 1e12).toFixed(1) }} pF</td>
                      <td class="py-2 px-3 text-center font-mono text-gray-500">{{ (analysis.ceMillerCapacitance * 1e12).toFixed(1) }} pF</td>
                      <td class="py-2 px-3 text-center font-mono text-green-500">{{ (analysis.ceMillerCapacitance / analysis.millerCapacitance).toFixed(1) }}×</td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Voltage Gain</td>
                      <td class="py-2 px-3 text-center font-mono text-primary">{{ analysis.gain.toFixed(1) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-gray-500">{{ analysis.ceGain.toFixed(1) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-green-500">{{ (analysis.gain / analysis.ceGain).toFixed(2) }}×</td>
                    </tr>
                    <tr>
                      <td class="py-2 px-3 text-gray-600 dark:text-gray-400">Output Impedance</td>
                      <td class="py-2 px-3 text-center font-mono text-primary">{{ formatImpedance(analysis.outputImpedance) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-gray-500">{{ formatImpedance(analysis.ceOutputImpedance) }}</td>
                      <td class="py-2 px-3 text-center font-mono text-green-500">Higher</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">📚 Educational Content</h3>

            <div class="space-y-6">
              <!-- What is Cascode -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is a Cascode Amplifier?</h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  A cascode amplifier is a two-stage amplifier that combines a Common Emitter (CE) input stage with a Common Base (CB) output stage. The CE stage provides voltage gain, while the CB stage acts as a current buffer that significantly improves high-frequency performance by reducing the Miller effect.
                </p>
              </div>

              <!-- The Miller Effect -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">The Miller Effect Problem</h4>
                <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p class="text-gray-700 dark:text-gray-300 mb-2">
                    In a standard Common Emitter amplifier, the base-collector capacitance (Cμ) appears multiplied by the voltage gain (1 + Av) at the input due to the Miller effect:
                  </p>
                  <code class="block text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                    Cmiller = Cμ × (1 + Av)
                  </code>
                  <p class="text-gray-700 dark:text-gray-300">
                    This large effective capacitance creates a low-pass filter with the source resistance, severely limiting bandwidth at high frequencies.
                  </p>
                </div>
              </div>

              <!-- How Cascode Solves It -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">How Cascode Solves the Problem</h4>
                <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p class="text-gray-700 dark:text-gray-300 mb-2">
                    The cascode configuration dramatically reduces the Miller effect by:
                  </p>
                  <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    <li>The CB stage (Q2) keeps Q1's collector voltage nearly constant</li>
                    <li>Constant collector voltage means no voltage gain across Cμ of Q1</li>
                    <li>With no voltage gain, Cμ is not multiplied - it remains small</li>
                    <li>Result: Much higher bandwidth with the same gain</li>
                  </ul>
                </div>
              </div>

              <!-- Key Characteristics -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Characteristics</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ High Bandwidth</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Extends frequency response by 5-10× compared to CE</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ High Gain</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Maintains voltage gain similar to CE stage</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ High Input Impedance</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Like CE stage, doesn't load the source</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ Low Output Impedance</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Like CB stage, can drive heavy loads</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ Improved Isolation</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Better separation of input and output</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">✓ Stable Performance</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Less sensitive to load variations</p>
                  </div>
                </div>
              </div>

              <!-- Applications -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Applications</h4>
                <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>RF Amplifiers:</strong> Used in radio frequency stages where bandwidth is critical</li>
                  <li><strong>Video Amplifiers:</strong> High-frequency signal amplification for video signals</li>
                  <li><strong>Operational Amplifiers:</strong> Input stages of high-speed op-amps</li>
                  <li><strong>Digital Oscilloscopes:</strong> Front-end amplifiers for wide bandwidth</li>
                  <li><strong>Instrumentation:</strong> High-performance test and measurement equipment</li>
                  <li><strong>Communication Systems:</strong> IF and RF amplifiers in receivers</li>
                  <li><strong>Mixed-Signal ICs:</strong> High-speed analog front-ends</li>
                </ul>
              </div>

              <!-- Design Considerations -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">⚙️ Design Considerations</h4>
                <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Headroom:</strong> Requires higher VCC due to stacked transistors (two VCE drops)</li>
                  <li><strong>Power Consumption:</strong> Slightly higher due to additional bias current</li>
                  <li><strong>Matching:</strong> Q1 and Q2 should have similar characteristics for optimal performance</li>
                  <li><strong>Biasing:</strong> Critical to keep both transistors in active region</li>
                  <li><strong>Stability:</strong> May require compensation in some configurations</li>
                  <li><strong>Variants:</strong> Can be built with FETs (cascode) or mixed (BJT-FET)</li>
                </ul>
              </div>

              <!-- Key Formulas -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">📐 Key Formulas</h4>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Voltage Gain: Av ≈ -gm × RC
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Input Impedance: Zin ≈ β × (RE || re')
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Output Impedance: Zout ≈ RC
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Transconductance: gm = IC / VT (VT ≈ 26mV at room temp)
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Emitter Resistance: re' = VT / IE ≈ 26mV / IC
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Miller Capacitance (Cascode): Cmiller ≈ Cμ (almost no multiplication!)
                  </code>
                  <code class="block text-sm font-mono text-primary dark:text-primary">
                    Bandwidth: BW ≈ 1 / (2π × Rsource × Cmiller)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'

const colorMode = useColorMode()

// State
const vcc = ref(12)
const rc = ref(4.7)
const re = ref(1)
const beta = ref(150)
const inputAmplitude = ref(10)
const frequency = ref(1)
const showComparison = ref(true)
const isPlaying = ref(true)

const waveformCanvas = ref(null)
const bodeCanvas = ref(null)

let animationFrame = null
let animationTime = 0

// Presets
const presets = [
  {
    name: 'RF Amplifier',
    description: 'High-frequency gain stage',
    vcc: 12,
    rc: 2.2,
    re: 0.5,
    beta: 150,
    inputAmplitude: 5,
    frequency: 10
  },
  {
    name: 'Video Amplifier',
    description: 'Wide bandwidth for video',
    vcc: 15,
    rc: 1,
    re: 0.3,
    beta: 200,
    inputAmplitude: 10,
    frequency: 5
  },
  {
    name: 'General Purpose',
    description: 'Balanced performance',
    vcc: 12,
    rc: 4.7,
    re: 1,
    beta: 150,
    inputAmplitude: 10,
    frequency: 1
  }
]

const applyPreset = (preset) => {
  vcc.value = preset.vcc
  rc.value = preset.rc
  re.value = preset.re
  beta.value = preset.beta
  inputAmplitude.value = preset.inputAmplitude
  frequency.value = preset.frequency
}

const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value
}

const resetAnimation = () => {
  animationTime = 0
}

// Circuit analysis
const analysis = computed(() => {
  const VT = 0.026 // Thermal voltage at room temperature

  // Calculate DC operating point
  const IC = (vcc.value * 0.4) / (rc.value * 1000 + (re.value * 1000) / beta.value)
  const IE = IC * (1 + 1 / beta.value)

  // Small signal parameters
  const gm = IC / VT
  const re_prime = VT / IE
  const re_total = (re.value * 1000) + re_prime

  // Voltage gain
  const gain = -gm * (rc.value * 1000)

  // Input impedance
  const inputImpedance = beta.value * re_total

  // Output impedance (approximately RC)
  const outputImpedance = rc.value * 1000

  // Miller capacitance (dramatically reduced in cascode)
  const C_mu = 2e-12 // 2pF typical
  const C_pi = 10e-12 // 10pF typical
  const millerCapacitance = C_mu // Almost no multiplication!

  // Bandwidth (much higher due to reduced Miller effect)
  const Rsource = 1000 // 1kΩ source
  const bandwidth = 1 / (2 * Math.PI * Rsource * (C_pi + millerCapacitance))

  // Common emitter comparison
  const ceMillerCapacitance = C_mu * (1 + Math.abs(gain))
  const ceBandwidth = 1 / (2 * Math.PI * Rsource * (C_pi + ceMillerCapacitance))
  const ceGain = gain
  const ceOutputImpedance = outputImpedance

  return {
    gm,
    gain,
    inputImpedance,
    outputImpedance,
    millerCapacitance,
    bandwidth,
    ceMillerCapacitance,
    ceBandwidth,
    ceGain,
    ceOutputImpedance
  }
})

// Format functions
const formatImpedance = (ohms) => {
  if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(2)} MΩ`
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(1)} kΩ`
  return `${ohms.toFixed(0)} Ω`
}

const formatFrequency = (hz) => {
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(2)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(1)} kHz`
  return `${hz.toFixed(2)} Hz`
}

// Draw waveform
const drawWaveform = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  ctx.scale(dpr, dpr)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  // Clear
  ctx.clearRect(0, 0, width, height)

  // Background
  ctx.fillStyle = colorMode.value === 'dark' ? '#111827' : '#f9fafb'
  ctx.fillRect(0, 0, width, height)

  // Grid
  ctx.strokeStyle = colorMode.value === 'dark' ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1

  for (let x = 0; x < width; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += 30) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw input waveform (pink)
  const amplitude = height * 0.25
  const centerY = height / 2

  ctx.strokeStyle = '#ec4899'
  ctx.lineWidth = 2
  ctx.beginPath()

  for (let x = 0; x < width; x++) {
    const t = animationTime + x * 0.01
    const y = centerY - amplitude * Math.sin(2 * Math.PI * frequency.value * t)

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Label for input
  ctx.fillStyle = '#ec4899'
  ctx.font = '12px monospace'
  ctx.fillText('VIN (Input)', 10, 20)

  // Draw output waveform (blue)
  ctx.strokeStyle = '#4f46e5'
  ctx.lineWidth = 2
  ctx.beginPath()

  const outputAmplitude = amplitude * Math.abs(analysis.value.gain) * (inputAmplitude.value / 1000)

  for (let x = 0; x < width; x++) {
    const t = animationTime + x * 0.01
    const y = centerY + outputAmplitude * Math.sin(2 * Math.PI * frequency.value * t)

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Label for output
  ctx.fillStyle = '#4f46e5'
  ctx.font = '12px monospace'
  ctx.fillText('VOUT (Output)', 10, 40)

  // Center line
  ctx.strokeStyle = colorMode.value === 'dark' ? '#6b7280' : '#9ca3af'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(0, centerY)
  ctx.lineTo(width, centerY)
  ctx.stroke()
  ctx.setLineDash([])
}

// Draw Bode plot
const drawBode = () => {
  const canvas = bodeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  ctx.scale(dpr, dpr)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  // Clear
  ctx.clearRect(0, 0, width, height)

  // Background
  ctx.fillStyle = colorMode.value === 'dark' ? '#111827' : '#f9fafb'
  ctx.fillRect(0, 0, width, height)

  const padding = { top: 20, right: 20, bottom: 40, left: 60 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  // Draw grid
  ctx.strokeStyle = colorMode.value === 'dark' ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1

  // Vertical grid (frequency)
  for (let i = 0; i <= 6; i++) {
    const x = padding.left + (i / 6) * plotWidth
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, height - padding.bottom)
    ctx.stroke()

    // Frequency labels
    const freq = Math.pow(10, i) // 10^0 to 10^6 Hz
    const freqLabel = freq >= 1e6 ? `${freq / 1e6}M` : freq >= 1e3 ? `${freq / 1e3}k` : `${freq}`
    ctx.fillStyle = colorMode.value === 'dark' ? '#9ca3af' : '#6b7280'
    ctx.font = '10px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`${freqLabel}Hz`, x, height - padding.bottom + 15)
  }

  // Horizontal grid (gain)
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (i / 4) * plotHeight
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()

    // Gain labels
    const gain = 40 - i * 10 // 40dB to 0dB
    ctx.fillStyle = colorMode.value === 'dark' ? '#9ca3af' : '#6b7280'
    ctx.font = '10px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`${gain}dB`, padding.left - 10, y + 4)
  }

  // Axis labels
  ctx.fillStyle = colorMode.value === 'dark' ? '#e5e7eb' : '#374151'
  ctx.font = '11px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Frequency', padding.left + plotWidth / 2, height - 5)

  ctx.save()
  ctx.translate(15, padding.top + plotHeight / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Gain (dB)', 0, 0)
  ctx.restore()

  // Draw Cascode response (blue)
  const cascodeBandwidth = analysis.value.bandwidth
  ctx.strokeStyle = '#4f46e5'
  ctx.lineWidth = 3
  ctx.beginPath()

  for (let i = 0; i <= 100; i++) {
    const freq = Math.pow(10, (i / 100) * 6) // 1Hz to 1MHz
    const midbandGain = 20 * Math.log10(Math.abs(analysis.value.gain))
    const gain = midbandGain - 10 * Math.log10(1 + Math.pow(freq / cascodeBandwidth, 2))

    const x = padding.left + (i / 100) * plotWidth
    const y = padding.top + ((40 - gain) / 40) * plotHeight

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Draw CE response (red, dashed)
  const ceBandwidth = analysis.value.ceBandwidth
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.beginPath()

  for (let i = 0; i <= 100; i++) {
    const freq = Math.pow(10, (i / 100) * 6)
    const midbandGain = 20 * Math.log10(Math.abs(analysis.value.ceGain))
    const gain = midbandGain - 10 * Math.log10(1 + Math.pow(freq / ceBandwidth, 2))

    const x = padding.left + (i / 100) * plotWidth
    const y = padding.top + ((40 - gain) / 40) * plotHeight

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()
  ctx.setLineDash([])

  // Legend
  ctx.fillStyle = '#4f46e5'
  ctx.font = '11px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('━ Cascode', padding.left + 10, padding.top + 15)

  ctx.fillStyle = '#ef4444'
  ctx.setLineDash([5, 5])
  ctx.fillText('━ Common Emitter', padding.left + 10, padding.top + 30)
  ctx.setLineDash([])

  // Current frequency indicator
  const currentFreq = frequency.value * 1000
  const xPos = padding.left + (Math.log10(currentFreq) / 6) * plotWidth

  if (xPos >= padding.left && xPos <= width - padding.right) {
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(xPos, padding.top)
    ctx.lineTo(xPos, height - padding.bottom)
    ctx.stroke()

    ctx.fillStyle = '#10b981'
    ctx.font = '10px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('Current', xPos, padding.top - 5)
  }
}

const animate = () => {
  if (isPlaying.value) {
    animationTime += 0.016
  }

  drawWaveform()
  drawBode()
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

watch([vcc, rc, re, beta, inputAmplitude, frequency, showComparison], () => {
  // Animation loop handles redraws
}, { deep: true })
</script>

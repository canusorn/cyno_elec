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
            JFET Common-Source Amplifier
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore field-effect transistor amplification with high input impedance and voltage-controlled operation
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Voltage Gain:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">A_v</span>
              <span class="text-gray-400">≈</span>
              <span class="text-primary-highlight">-g_m</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">R_D</span>
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
              <svg viewBox="0 0 400 500" class="w-full h-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- VDD -->
                <line x1="200" y1="20" x2="200" y2="50" stroke="#EF4444" stroke-width="3"/>
                <circle cx="200" cy="15" r="12" fill="white" stroke="#EF4444" stroke-width="2"/>
                <text x="200" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">VDD</text>

                <!-- RD resistor -->
                <rect x="185" y="50" width="30" height="60" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="230" y="85" font-size="10" fill="#3B82F6">RD</text>
                <text x="230" y="98" font-size="9" fill="#3B82F6">{{ (rd/1000).toFixed(1) }}kΩ</text>

                <!-- Line to drain -->
                <line x1="200" y1="110" x2="200" y2="140" stroke="#6B7280" stroke-width="2"/>

                <!-- JFET symbol (N-channel) -->
                <g transform="translate(200, 180)">
                  <!-- Gate terminal -->
                  <line x1="-50" y1="0" x2="-20" y2="0" stroke="#6B7280" stroke-width="2"/>
                  <!-- Gate bar (isolated) -->
                  <line x1="-20" y1="-25" x2="-20" y2="25" stroke="#10B981" stroke-width="3"/>
                  <!-- Channel bar -->
                  <line x1="0" y1="-15" x2="0" y2="15" stroke="#10B981" stroke-width="2"/>
                  <!-- Drain terminal -->
                  <line x1="0" y1="-15" x2="0" y2="-40" stroke="#6B7280" stroke-width="2"/>
                  <!-- Source terminal -->
                  <line x1="0" y1="15" x2="0" y2="40" stroke="#6B7280" stroke-width="2"/>
                  <!-- Gate connection (no physical connection) -->
                  <line x1="-20" y1="0" x2="-25" y2="0" stroke="#6B7280" stroke-width="2"/>
                  
                  <text x="10" y="-35" font-size="10" fill="#10B981">D</text>
                  <text x="10" y="45" font-size="10" fill="#10B981">S</text>
                  <text x="-50" y="5" font-size="10" fill="#10B981">G</text>
                </g>

                <!-- RS resistor -->
                <rect x="185" y="220" width="30" height="60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="230" y="255" font-size="10" fill="#8B5CF6">RS</text>
                <text x="230" y="268" font-size="9" fill="#8B5CF6">{{ (rs/1000).toFixed(1) }}kΩ</text>

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
                  <text x="15" y="185" font-size="10" fill="#6B7280">Vin</text>
                </g>

                <!-- Voltage divider bias -->
                <g>
                  <line x1="200" y1="50" x2="280" y2="50" stroke="#6B7280" stroke-width="2"/>
                  <line x1="280" y1="50" x2="280" y2="90" stroke="#6B7280" stroke-width="2"/>
                  <line x1="280" y1="50" x2="320" y2="50" stroke="#6B7280" stroke-width="2"/>
                  
                  <rect x="265" y="90" width="30" height="40" fill="white" stroke="#EC4899" stroke-width="2"/>
                  <text x="300" y="115" font-size="9" fill="#EC4899">RG1</text>
                  
                  <line x1="280" y1="130" x2="280" y2="160" stroke="#6B7280" stroke-width="2"/>
                  <line x1="280" y1="160" x2="280" y2="200" stroke="#6B7280" stroke-width="2"/>
                  <line x1="280" y1="160" x2="180" y2="160" stroke="#6B7280" stroke-width="2"/>
                  <line x1="180" y1="160" x2="180" y2="180" stroke="#6B7280" stroke-width="2"/>
                  <line x1="180" y1="180" x2="150" y2="180" stroke="#6B7280" stroke-width="2"/>
                  
                  <rect x="265" y="200" width="30" height="40" fill="white" stroke="#EC4899" stroke-width="2"/>
                  <text x="300" y="225" font-size="9" fill="#EC4899">RG2</text>
                  
                  <line x1="280" y1="240" x2="280" y2="280" stroke="#6B7280" stroke-width="2"/>
                  <line x1="280" y1="280" x2="200" y2="280" stroke="#6B7280" stroke-width="2"/>
                </g>

                <!-- Output coupling -->
                <g>
                  <circle cx="330" cy="140" r="8" fill="white" stroke="#F59E0B" stroke-width="2"/>
                  <text x="330" y="144" text-anchor="middle" font-size="10" fill="#F59E0B">Cout</text>
                  <line x1="200" y1="140" x2="322" y2="140" stroke="#6B7280" stroke-width="2"/>
                  <line x1="338" y1="140" x2="370" y2="140" stroke="#6B7280" stroke-width="2"/>
                  <text x="375" y="145" font-size="10" fill="#6B7280">Vout</text>
                </g>

                <!-- Bypass capacitor -->
                <g>
                  <line x1="200" y1="240" x2="260" y2="240" stroke="#6B7280" stroke-width="2"/>
                  <line x1="260" y1="240" x2="260" y2="280" stroke="#6B7280" stroke-width="2"/>
                  <line x1="260" y1="280" x2="260" y2="320" stroke="#6B7280" stroke-width="2"/>
                  <line x1="260" y1="320" x2="200" y2="320" stroke="#6B7280" stroke-width="2"/>
                  
                  <line x1="250" y1="255" x2="270" y2="255" stroke="#F59E0B" stroke-width="2"/>
                  <line x1="250" y1="265" x2="270" y2="265" stroke="#F59E0B" stroke-width="2"/>
                  <line x1="260" y1="250" x2="260" y2="255" stroke="#F59E0B" stroke-width="2"/>
                  <line x1="260" y1="265" x2="260" y2="270" stroke="#F59E0B" stroke-width="2"/>
                  
                  <text x="280" y="265" font-size="9" fill="#F59E0B">CS</text>
                </g>
              </svg>
            </div>

            <!-- Controls -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎛️ Circuit Parameters</h3>
              
              <div class="space-y-4">
                <!-- VDD -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Supply Voltage (VDD)</span>
                    <span class="text-primary-highlight">{{ vdd }}V</span>
                  </label>
                  <input type="range" v-model.number="vdd" min="5" max="24" step="1" class="w-full">
                </div>

                <!-- RD -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Drain Resistor (RD)</span>
                    <span class="text-primary-highlight">{{ (rd/1000).toFixed(1) }}kΩ</span>
                  </label>
                  <input type="range" v-model.number="rd" min="1000" max="10000" step="500" class="w-full">
                </div>

                <!-- RS -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Source Resistor (RS)</span>
                    <span class="text-primary-highlight">{{ (rs/1000).toFixed(1) }}kΩ</span>
                  </label>
                  <input type="range" v-model.number="rs" min="500" max="5000" step="250" class="w-full">
                </div>

                <!-- RG1 -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Gate Resistor 1 (RG1)</span>
                    <span class="text-primary-highlight">{{ (rg1/1000000).toFixed(1) }}MΩ</span>
                  </label>
                  <input type="range" v-model.number="rg1" min="100000" max="5000000" step="100000" class="w-full">
                </div>

                <!-- RG2 -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Gate Resistor 2 (RG2)</span>
                    <span class="text-primary-highlight">{{ (rg2/1000000).toFixed(1) }}MΩ</span>
                  </label>
                  <input type="range" v-model.number="rg2" min="100000" max="5000000" step="100000" class="w-full">
                </div>

                <!-- IDSS -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>JFET IDSS</span>
                    <span class="text-primary-highlight">{{ idss }}mA</span>
                  </label>
                  <input type="range" v-model.number="idss" min="2" max="20" step="1" class="w-full">
                </div>

                <!-- VP -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Pinch-off Voltage (VP)</span>
                    <span class="text-primary-highlight">{{ vp }}V</span>
                  </label>
                  <input type="range" v-model.number="vp" min="-1" max="-6" step="0.5" class="w-full">
                </div>

                <!-- Input Amplitude -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Input Amplitude</span>
                    <span class="text-primary-highlight">{{ inputAmplitude }}V</span>
                  </label>
                  <input type="range" v-model.number="inputAmplitude" min="0.1" max="2" step="0.1" class="w-full">
                </div>

                <!-- Frequency -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Frequency</span>
                    <span class="text-primary-highlight">{{ frequency }}Hz</span>
                  </label>
                  <input type="range" v-model.number="frequency" min="100" max="5000" step="100" class="w-full">
                </div>
              </div>
            </div>
          </div>

          <!-- Waveforms & Analysis -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">📊 Waveforms</h3>
                <div class="flex gap-2">
                  <button @click="isRunning = !isRunning" class="px-4 py-2 bg-primary-highlight text-white rounded-lg hover:bg-primary transition-colors">
                    {{ isRunning ? '⏸️ Pause' : '▶️ Play' }}
                  </button>
                  <button @click="reset" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    🔄 Reset
                  </button>
                </div>
              </div>
              <canvas ref="waveformCanvas" width="800" height="300" class="w-full bg-gray-900 rounded-lg"></canvas>
            </div>

            <!-- Transfer Characteristic -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Transfer Characteristic</h3>
              <canvas ref="transferCanvas" width="800" height="250" class="w-full bg-gray-50 dark:bg-gray-900 rounded-lg"></canvas>
            </div>

            <!-- Analysis Results -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- DC Analysis -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ DC Analysis</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Gate Voltage (VG)</span>
                    <span class="font-bold text-green-600 dark:text-green-400">{{ (vg).toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Source Voltage (VS)</span>
                    <span class="font-bold text-blue-600 dark:text-blue-400">{{ (vs).toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Drain Current (ID)</span>
                    <span class="font-bold text-purple-600 dark:text-purple-400">{{ (id).toFixed(2) }}mA</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Drain Voltage (VD)</span>
                    <span class="font-bold text-orange-600 dark:text-orange-400">{{ (vd).toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">VGS (Q-point)</span>
                    <span class="font-bold text-pink-600 dark:text-pink-400">{{ (vgs).toFixed(2) }}V</span>
                  </div>
                </div>
              </div>

              <!-- AC Analysis -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📻 AC Analysis</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Voltage Gain (Av)</span>
                    <span class="font-bold text-red-600 dark:text-red-400">{{ voltageGain.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Transconductance (gm)</span>
                    <span class="font-bold text-cyan-600 dark:text-cyan-400">{{ (gm * 1000).toFixed(2) }}mS</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Input Impedance (Zin)</span>
                    <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ (zin/1000000).toFixed(2) }}MΩ</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Output Impedance (Zout)</span>
                    <span class="font-bold text-teal-600 dark:text-teal-400">{{ (rd/1000).toFixed(1) }}kΩ</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                    <span class="text-gray-700 dark:text-gray-300">Output Amplitude</span>
                    <span class="font-bold text-lime-600 dark:text-lime-400">{{ (inputAmplitude * Math.abs(voltageGain)).toFixed(2) }}V</span>
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
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding JFET Common-Source Amplifiers</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">🎯 What is a Common-Source Amplifier?</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                The common-source (CS) configuration is the JFET equivalent of the BJT common-emitter amplifier. It provides:
              </p>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li><strong>High input impedance</strong> - Typically megaohms, doesn't load the source</li>
                <li><strong>Voltage amplification</strong> - Gain controlled by transconductance and RD</li>
                <li><strong>Inverted output</strong> - 180° phase shift from input to output</li>
                <li><strong>Voltage-controlled operation</strong> - Gate voltage controls drain current</li>
              </ul>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">⚡ Key Characteristics</h3>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li><strong>JFET Operation:</strong> Voltage-controlled device with high Zin</li>
                <li><strong>No Gate Current:</strong> IG ≈ 0 (reverse-biased gate-channel junction)</li>
                <li><strong>Transconductance:</strong> gm = ID/|VGS| (controlled by bias point)</li>
                <li><strong>Pinch-off:</strong> Channel fully depleted at VGS = VP</li>
                <li><strong>Saturation Region:</strong> Active amplification region</li>
              </ul>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">🔧 Design Equations</h3>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                <p class="text-gray-800 dark:text-gray-200">Gate Voltage: VG = VDD × RG2/(RG1 + RG2)</p>
                <p class="text-gray-800 dark:text-gray-200">Source Voltage: VS = ID × RS</p>
                <p class="text-gray-800 dark:text-gray-200">Gate-Source: VGS = VG - VS</p>
                <p class="text-gray-800 dark:text-gray-200">Drain Current: ID = IDSS(1 - VGS/VP)²</p>
                <p class="text-gray-800 dark:text-gray-200">Voltage Gain: Av ≈ -gm × RD</p>
                <p class="text-gray-800 dark:text-gray-200">Transconductance: gm = 2×IDSS/|VP| × (1 - VGS/VP)</p>
                <p class="text-gray-800 dark:text-gray-200">Input Z: Zin ≈ RG1 || RG2</p>
                <p class="text-gray-800 dark:text-gray-200">Output Z: Zout ≈ RD</p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">🔬 JFET vs BJT Comparison</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-gray-600 dark:text-gray-400">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th class="p-3 text-left">Characteristic</th>
                      <th class="p-3 text-left">JFET (CS)</th>
                      <th class="p-3 text-left">BJT (CE)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Input Impedance</td>
                      <td class="p-3 text-green-600">Very High (>1MΩ)</td>
                      <td class="p-3">Medium (~kΩ)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Control</td>
                      <td class="p-3 text-green-600">Voltage (VGS)</td>
                      <td class="p-3">Current (IB)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Gate/Base Current</td>
                      <td class="p-3 text-green-600">~0 (leakage only)</td>
                      <td class="p-3">Significant</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Transconductance</td>
                      <td class="p-3">Lower</td>
                      <td class="p-3 text-green-600">Higher</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Linearity</td>
                      <td class="p-3">Good (square law)</td>
                      <td class="p-3 text-green-600">Excellent (exponential)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Noise</td>
                      <td class="p-3 text-green-600">Low</td>
                      <td class="p-3">Medium</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Max Frequency</td>
                      <td class="p-3 text-green-600">Very High</td>
                      <td class="p-3">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">💡 Applications</h3>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>High-impedance sources:</strong> Microphone preamps, instrument inputs</li>
                <li><strong>RF amplifiers:</strong> First stage in radio receivers</li>
                <li><strong>Analog switches:</strong> Low-leakage switching circuits</li>
                <li><strong>Mixers:</strong> RF mixing in communication systems</li>
                <li><strong>Constant current sources:</strong> Bias circuits and current mirrors</li>
                <li><strong>Voltage-controlled resistors:</strong> AGC circuits, attenuators</li>
              </ul>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">⚠️ Design Tips</h3>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Bias Point:</strong> Set ID at ~IDSS/4 to IDSS/2 for good linearity and gain</li>
                <li><strong>Source Resistor:</strong> RS provides stable bias and negative feedback</li>
                <li><strong>Bypass Capacitor:</strong> CS increases gain but reduces stability</li>
                <li><strong>Gate Resistors:</strong> Large values (MΩ) for high input impedance</li>
                <li><strong>Coupling Caps:</strong> Choose for low-frequency response: XC << Zin, Zout</li>
                <li><strong>VD Saturation:</strong> Ensure VD > VS + |VP| for saturation region</li>
                <li><strong>Temperature:</strong> IDSS increases with temperature, affecting bias</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Cyno Electric - JFET Common-Source Amplifier Simulation</p>
        <p class="mt-2 text-sm">Interactive electrical theory education platform</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'

const colorMode = ref('light')

// Circuit parameters
const vdd = ref(12)
const rd = ref(4700)      // Drain resistor (Ohms)
const rs = ref(1500)      // Source resistor (Ohms)
const rg1 = ref(2000000)  // Gate resistor 1 (Ohms)
const rg2 = ref(500000)   // Gate resistor 2 (Ohms)
const idss = ref(10)      // IDSS (mA)
const vp = ref(-4)        // Pinch-off voltage (V)
const inputAmplitude = ref(0.5)
const frequency = ref(1000)

// Animation state
const isRunning = ref(true)
const time = ref(0)
let animationFrame: number | null = null

// Canvas refs
const waveformCanvas = ref<HTMLCanvasElement | null>(null)
const transferCanvas = ref<HTMLCanvasElement | null>(null)

// DC Analysis calculations
const vg = computed(() => {
  return vdd.value * rg2.value / (rg1.value + rg2.value)
})

// Iteratively solve for ID and VS since they're interdependent
const id = computed(() => {
  let currentId = idss.value / 4 // Initial guess
  const iterations = 20
  
  for (let i = 0; i < iterations; i++) {
    const vs = currentId * rs.value / 1000 // Convert to volts
    const vgs = vg.value - vs
    
    // Shockley equation: ID = IDSS * (1 - VGS/VP)²
    let newId = idss.value * Math.pow(1 - vgs / vp.value, 2)
    
    // Clamp to valid range
    newId = Math.max(0, Math.min(newId, idss.value))
    
    // Damping for convergence
    currentId = currentId * 0.7 + newId * 0.3
  }
  
  return currentId
})

const vs = computed(() => {
  return id.value * rs.value / 1000 // Convert to volts
})

const vgs = computed(() => {
  return vg.value - vs.value
})

const vd = computed(() => {
  return vdd.value - (id.value * rd.value / 1000)
})

// AC Analysis calculations
const gm = computed(() => {
  // Transconductance: gm = 2*IDSS/|VP| * (1 - VGS/VP)
  const absVp = Math.abs(vp.value)
  return (2 * idss.value / absVp) * (1 - vgs.value / vp.value) / 1000 // Convert to S
})

const voltageGain = computed(() => {
  // Av ≈ -gm * RD
  return -gm.value * rd.value
})

const zin = computed(() => {
  // Input impedance ≈ RG1 || RG2
  return (rg1.value * rg2.value) / (rg1.value + rg2.value)
})

const zout = computed(() => {
  // Output impedance ≈ RD
  return rd.value
})

// Animation loop
const animate = () => {
  if (isRunning.value) {
    time.value += 0.016 // ~60fps
  }
  
  drawWaveforms()
  drawTransferCharacteristic()
  
  animationFrame = requestAnimationFrame(animate)
}

const drawWaveforms = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.fillStyle = '#111827'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
    
    const y = (height / 10) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  // Draw center line
  ctx.strokeStyle = '#6B7280'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  
  // Calculate waveforms
  const angularFreq = 2 * Math.PI * frequency.value
  const cycles = 3
  const pointsPerCycle = 200
  
  // Input waveform (orange)
  ctx.strokeStyle = '#F59E0B'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  for (let i = 0; i <= cycles * pointsPerCycle; i++) {
    const t = (i / pointsPerCycle) / frequency.value + time.value
    const amplitude = inputAmplitude.value
    const value = amplitude * Math.sin(angularFreq * t)
    
    const x = (i / (cycles * pointsPerCycle)) * width
    const y = height / 2 - (value / 3) * (height / 2 - 20)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Output waveform (pink)
  ctx.strokeStyle = '#EC4899'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  const outputAmp = inputAmplitude.value * Math.abs(voltageGain.value)
  
  for (let i = 0; i <= cycles * pointsPerCycle; i++) {
    const t = (i / pointsPerCycle) / frequency.value + time.value
    const amplitude = outputAmp
    const value = amplitude * Math.sin(angularFreq * t + Math.PI) // 180° phase shift
    
    const x = (i / (cycles * pointsPerCycle)) * width
    const y = height / 2 - (value / 3) * (height / 2 - 20)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Legend
  ctx.font = '14px sans-serif'
  ctx.fillStyle = '#F59E0B'
  ctx.fillText('Vin (Input)', 20, 30)
  ctx.fillStyle = '#EC4899'
  ctx.fillText('Vout (Output)', 150, 30)
}

const drawTransferCharacteristic = () => {
  const canvas = transferCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  ctx.fillStyle = colorMode.value === 'dark' ? '#111827' : '#F9FAFB'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = colorMode.value === 'dark' ? '#374151' : '#E5E7EB'
  ctx.lineWidth = 1
  for (let i = 0; i <= 10; i++) {
    const x = 50 + (width - 100) * (i / 10)
    ctx.beginPath()
    ctx.moveTo(x, 20)
    ctx.lineTo(x, height - 50)
    ctx.stroke()
    
    const y = 20 + (height - 70) * (i / 10)
    ctx.beginPath()
    ctx.moveTo(50, y)
    ctx.lineTo(width - 20, y)
    ctx.stroke()
  }
  
  // Draw axes
  ctx.strokeStyle = '#6B7280'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(50, 20)
  ctx.lineTo(50, height - 50)
  ctx.lineTo(width - 20, height - 50)
  ctx.stroke()
  
  // Axis labels
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#6B7280'
  ctx.textAlign = 'center'
  ctx.fillText('VGS (V)', width / 2 + 25, height - 15)
  
  ctx.save()
  ctx.translate(15, height / 2 - 15)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('ID (mA)', 0, 0)
  ctx.restore()
  
  // Draw transfer characteristic curve
  // ID = IDSS * (1 - VGS/VP)²
  ctx.strokeStyle = '#10B981'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  for (let vgsVal = vp.value; vgsVal <= 0; vgsVal += 0.1) {
    const idVal = idss.value * Math.pow(1 - vgsVal / vp.value, 2)
    
    const x = 50 + (width - 100) * ((vgsVal - vp.value) / Math.abs(vp.value))
    const y = (height - 50) - (height - 70) * (idVal / idss.value)
    
    if (vgsVal === vp.value) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Draw Q-point
  const qX = 50 + (width - 100) * ((vgs.value - vp.value) / Math.abs(vp.value))
  const qY = (height - 50) - (height - 70) * (id.value / idss.value)
  
  ctx.fillStyle = '#EF4444'
  ctx.beginPath()
  ctx.arc(qX, qY, 8, 0, 2 * Math.PI)
  ctx.fill()
  
  // Q-point label
  ctx.font = 'bold 12px sans-serif'
  ctx.fillStyle = '#EF4444'
  ctx.textAlign = 'left'
  ctx.fillText(`Q (${vgs.value.toFixed(2)}V, ${id.value.toFixed(2)}mA)`, qX + 15, qY)
  
  // Input signal indicator
  const inputVgsMin = vgs.value - inputAmplitude.value
  const inputVgsMax = vgs.value + inputAmplitude.value
  
  ctx.strokeStyle = '#F59E0B'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  
  const minX = 50 + (width - 100) * ((inputVgsMin - vp.value) / Math.abs(vp.value))
  ctx.beginPath()
  ctx.moveTo(minX, 20)
  ctx.lineTo(minX, height - 50)
  ctx.stroke()
  
  const maxX = 50 + (width - 100) * ((inputVgsMax - vp.value) / Math.abs(vp.value))
  ctx.beginPath()
  ctx.moveTo(maxX, 20)
  ctx.lineTo(maxX, height - 50)
  ctx.stroke()
  
  ctx.setLineDash([])
}

const reset = () => {
  time.value = 0
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    colorMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

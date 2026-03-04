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
            Voltage Regulator Design Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design LDO and switching regulators with component calculations and thermal analysis
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">η</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">V_out</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">V_in</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">100</span>
              <span class="text-gray-400">%</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Efficiency = Output Voltage ÷ Input Voltage × 100%</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔧 Regulator Design Parameters
          </h3>

          <!-- Regulator Type Selection -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Regulator Type
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                @click="regulatorType = 'ldo'"
                :class="[
                  'p-4 rounded-lg font-semibold transition-all duration-200',
                  regulatorType === 'ldo'
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
                ]"
              >
                🔋 LDO Regulator
                <div class="text-xs mt-1 opacity-80">Low Dropout, Linear</div>
              </button>
              <button
                @click="regulatorType = 'buck'"
                :class="[
                  'p-4 rounded-lg font-semibold transition-all duration-200',
                  regulatorType === 'buck'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
                ]"
              >
                ⬇️ Buck Converter
                <div class="text-xs mt-1 opacity-80">Step-Down, Switching</div>
              </button>
              <button
                @click="regulatorType = 'boost'"
                :class="[
                  'p-4 rounded-lg font-semibold transition-all duration-200',
                  regulatorType === 'boost'
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
                ]"
              >
                ⬆️ Boost Converter
                <div class="text-xs mt-1 opacity-80">Step-Up, Switching</div>
              </button>
            </div>
          </div>

          <!-- Input Parameters -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Input Voltage -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Input Voltage (V_in)
              </label>
              <div class="flex items-center gap-3">
                <input
                  type="number"
                  v-model.number="inputVoltage"
                  min="1"
                  max="100"
                  step="0.1"
                  class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                <span class="text-gray-600 dark:text-gray-400 font-semibold">V</span>
              </div>
              <input
                type="range"
                v-model.number="inputVoltage"
                min="1"
                max="100"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
            </div>

            <!-- Output Voltage -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Output Voltage (V_out)
              </label>
              <div class="flex items-center gap-3">
                <input
                  type="number"
                  v-model.number="outputVoltage"
                  min="0.8"
                  max="50"
                  step="0.1"
                  class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                <span class="text-gray-600 dark:text-gray-400 font-semibold">V</span>
              </div>
              <input
                type="range"
                v-model.number="outputVoltage"
                min="0.8"
                max="50"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
            </div>

            <!-- Output Current -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Output Current (I_out)
              </label>
              <div class="flex items-center gap-3">
                <input
                  type="number"
                  v-model.number="outputCurrent"
                  min="0.01"
                  max="50"
                  step="0.1"
                  class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                >
                <span class="text-gray-600 dark:text-gray-400 font-semibold">A</span>
              </div>
              <input
                type="range"
                v-model.number="outputCurrent"
                min="0.01"
                max="50"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
            </div>
          </div>

          <!-- LDO Specific Parameters -->
          <div v-if="regulatorType === 'ldo'" class="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-4">🔋 LDO Parameters</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Dropout Voltage (V_do)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    type="number"
                    v-model.number="dropoutVoltage"
                    min="0.1"
                    max="5"
                    step="0.05"
                    class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition"
                  >
                  <span class="text-blue-700 dark:text-blue-300 font-semibold">V</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Typical: 0.2-1.5V depending on device</p>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Ground Pin Current (I_gnd)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    type="number"
                    v-model.number="groundCurrent"
                    min="0.001"
                    max="0.1"
                    step="0.001"
                    class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition"
                  >
                  <span class="text-blue-700 dark:text-blue-300 font-semibold">mA</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Control current, typically 1-10mA</p>
              </div>
            </div>
          </div>

          <!-- Switching Regulator Parameters -->
          <div v-if="regulatorType === 'buck' || regulatorType === 'boost'" class="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
            <h4 class="text-lg font-bold text-green-900 dark:text-green-300 mb-4">⚡ Switching Parameters</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Switching Frequency (f_sw)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    type="number"
                    v-model.number="switchingFreq"
                    min="10"
                    max="5000"
                    step="10"
                    class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-green-300 dark:border-green-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-green-500 outline-none transition"
                  >
                  <span class="text-green-700 dark:text-green-300 font-semibold">kHz</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Typical: 100kHz - 2MHz</p>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Expected Efficiency (η)
                </label>
                <div class="flex items-center gap-3">
                  <input
                    type="number"
                    v-model.number="efficiency"
                    min="70"
                    max="98"
                    step="1"
                    class="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border-2 border-green-300 dark:border-green-600 rounded-lg font-mono text-lg font-bold text-gray-900 dark:text-white focus:border-green-500 outline-none transition"
                  >
                  <span class="text-green-700 dark:text-green-300 font-semibold">%</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">Buck: 85-95%, Boost: 80-92%</p>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Quick Presets
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                @click="setPreset('usb-5v')"
                class="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
              >
                🔌 USB 5V
                <div class="text-xs opacity-80">7-12V → 5V@2A</div>
              </button>
              <button
                @click="setPreset('mcu-3v3')"
                class="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
              >
                🎯 MCU 3.3V
                <div class="text-xs opacity-80">5V → 3.3V@500mA</div>
              </button>
              <button
                @click="setPreset('led-12v')"
                class="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
              >
                💡 LED 12V
                <div class="text-xs opacity-80">20-24V → 12V@3A</div>
              </button>
              <button
                @click="setPreset('lipo-boost')"
                class="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-semibold text-sm shadow-md hover:shadow-lg"
              >
                🔋 LiPo Boost
                <div class="text-xs opacity-80">3.7V → 5V@1A</div>
              </button>
            </div>
          </div>

          <!-- Calculated Results -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-8">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📊 Design Calculations
            </h4>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Power Dissipation -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power Dissipation</div>
                <div class="text-3xl font-mono font-bold" :class="powerDissipation > 5 ? 'text-red-500' : powerDissipation > 2 ? 'text-yellow-500' : 'text-green-500'">
                  {{ powerDissipation.toFixed(2) }}W
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ powerDissipation > 5 ? '⚠️ Requires heatsink' : powerDissipation > 2 ? '⚡ Consider heatsink' : '✅ SOT-223 OK' }}
                </div>
              </div>

              <!-- Efficiency -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficiency</div>
                <div class="text-3xl font-mono font-bold" :class="efficiencyCalc < 70 ? 'text-red-500' : efficiencyCalc < 85 ? 'text-yellow-500' : 'text-green-500'">
                  {{ efficiencyCalc.toFixed(1) }}%
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ regulatorType === 'ldo' ? 'Linear regulation' : 'Switching mode' }}
                </div>
              </div>

              <!-- Input Power -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Input Power</div>
                <div class="text-3xl font-mono font-bold text-blue-500">
                  {{ inputPower.toFixed(2) }}W
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ inputCurrent.toFixed(2) }}A draw
                </div>
              </div>

              <!-- Output Power -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Power</div>
                <div class="text-3xl font-mono font-bold text-green-500">
                  {{ outputPower.toFixed(2) }}W
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Delivered to load
                </div>
              </div>

              <!-- Thermal Status -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Temp Rise (no heatsink)</div>
                <div class="text-3xl font-mono font-bold" :class="tempRise > 80 ? 'text-red-500' : tempRise > 50 ? 'text-yellow-500' : 'text-green-500'">
                  {{ tempRise.toFixed(0) }}°C
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ tempRise > 80 ? '🔥 Heatsink required!' : tempRise > 50 ? '⚠️ Borderline' : '✅ Safe' }}
                </div>
              </div>

              <!-- Loss Percentage -->
              <div class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power Loss</div>
                <div class="text-3xl font-mono font-bold text-red-500">
                  {{ powerLossPercent.toFixed(1) }}%
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ (powerDissipation).toFixed(2) }}W wasted
                </div>
              </div>
            </div>
          </div>

          <!-- Component Recommendations -->
          <div class="mb-8">
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Recommended Components</h4>

            <div v-if="regulatorType === 'ldo'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- LDO Chip -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                <h5 class="font-bold text-blue-900 dark:text-blue-300 mb-3">🔋 LDO Regulator IC</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Requirements:</strong></div>
                  <ul class="list-disc list-inside text-blue-800 dark:text-blue-400 space-y-1">
                    <li>V_in_max ≥ {{ (inputVoltage * 1.2).toFixed(1) }}V</li>
                    <li>V_out = {{ outputVoltage }}V</li>
                    <li>I_out ≥ {{ outputCurrent }}A</li>
                    <li>V_do ≤ {{ dropoutVoltage }}V</li>
                  </ul>
                  <div class="mt-3"><strong>Examples:</strong></div>
                  <div class="text-xs text-blue-700 dark:text-blue-500">
                    {{ outputCurrent <= 0.1 ? 'AMS1117, LP2985, XC6206' : outputCurrent <= 0.5 ? 'AMS1117-ADJ, LT1086, LM317' : outputCurrent <= 1.5 ? 'LT1085, LM1084, AZ1117' : 'LT1083, LM1085, KSQ1084' }}
                  </div>
                </div>
              </div>

              <!-- Input/Output Caps -->
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800">
                <h5 class="font-bold text-green-900 dark:text-green-300 mb-3">⚡ Capacitors</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Input Capacitor:</strong></div>
                  <ul class="list-disc list-inside text-green-800 dark:text-green-400 space-y-1">
                    <li>C_in ≥ {{ (inputCurrent * 10).toFixed(0) }}µF</li>
                    <li>{{ (outputCurrent > 1) ? 'Low ESR electrolytic + 100nF ceramic' : '10µF ceramic or tantalum' }}</li>
                    <li>V_rating ≥ {{ (inputVoltage * 1.5).toFixed(1) }}V</li>
                  </ul>
                  <div class="mt-2"><strong>Output Capacitor:</strong></div>
                  <ul class="list-disc list-inside text-green-800 dark:text-green-400 space-y-1">
                    <li>C_out ≥ {{ (outputCurrent * 22).toFixed(0) }}µF</li>
                    <li>Low ESR for stability</li>
                    <li>V_rating ≥ {{ (outputVoltage * 1.5).toFixed(1) }}V</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-else-if="regulatorType === 'buck'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Buck Controller -->
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800">
                <h5 class="font-bold text-green-900 dark:text-green-300 mb-3">⬇️ Buck Converter IC</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Requirements:</strong></div>
                  <ul class="list-disc list-inside text-green-800 dark:text-green-400 space-y-1">
                    <li>V_in_max ≥ {{ (inputVoltage * 1.2).toFixed(1) }}V</li>
                    <li>V_out = {{ outputVoltage }}V</li>
                    <li>I_out ≥ {{ outputCurrent }}A</li>
                    <li>f_sw = {{ switchingFreq }}kHz</li>
                  </ul>
                  <div class="mt-3"><strong>Examples:</strong></div>
                  <div class="text-xs text-green-700 dark:text-green-500">
                    {{ outputCurrent <= 0.5 ? 'MP1584, AP3503, LMR14206' : outputCurrent <= 3 ? 'MP2307, LM2596, AOZ1284' : 'TPS5430, MP2303, LMR33630' }}
                  </div>
                </div>
              </div>

              <!-- Inductor -->
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800">
                <h5 class="font-bold text-purple-900 dark:text-purple-300 mb-3">🌀 Inductor</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Calculated Value:</strong></div>
                  <div class="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
                    L ≥ {{ buckInductance.toFixed(1) }}µH
                  </div>
                  <ul class="list-disc list-inside text-purple-800 dark:text-purple-400 space-y-1 mt-2">
                    <li>I_sat ≥ {{ (outputCurrent * 1.3).toFixed(2) }}A</li>
                    <li>DCR ≤ {{ (100 / outputCurrent).toFixed(2) }}mΩ</li>
                    <li>Shielded drum/core recommended</li>
                  </ul>
                </div>
              </div>

              <!-- Output Capacitor -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                <h5 class="font-bold text-blue-900 dark:text-blue-300 mb-3">⚡ Output Capacitor</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Minimum Value:</strong></div>
                  <div class="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    C_out ≥ {{ buckOutputCap.toFixed(0) }}µF
                  </div>
                  <ul class="list-disc list-inside text-blue-800 dark:text-blue-400 space-y-1 mt-2">
                    <li>Low ESR (&lt;{{ (100 / outputCurrent).toFixed(0) }}mΩ)</li>
                    <li>Ceramic (X5R/X7R) or polymer</li>
                    <li>V_rating ≥ {{ (outputVoltage * 1.5).toFixed(1) }}V</li>
                  </ul>
                </div>
              </div>

              <!-- Feedback Resistors -->
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-2 border-orange-200 dark:border-orange-800">
                <h5 class="font-bold text-orange-900 dark:text-orange-300 mb-3">📊 Feedback Resistors</h5>
                <div class="space-y-2 text-sm">
                  <div v-if="outputVoltage < 0.8" class="text-orange-800 dark:text-orange-400">
                    ⚠️ V_out below reference - use adjustable regulator
                  </div>
                  <div v-else>
                    <div class="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <div class="text-xs text-orange-600 dark:text-orange-500">R1 (top)</div>
                        <div class="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
                          {{ feedbackR1.toFixed(0) }}Ω
                        </div>
                      </div>
                      <div>
                        <div class="text-xs text-orange-600 dark:text-orange-500">R2 (bottom)</div>
                        <div class="text-lg font-mono font-bold text-orange-600 dark:text-orange-400">
                          {{ feedbackR2.toFixed(0) }}Ω
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-orange-700 dark:text-orange-500 mt-2">
                      Target V_ref = 0.8V (typical)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="regulatorType === 'boost'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Boost Controller -->
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800">
                <h5 class="font-bold text-purple-900 dark:text-purple-300 mb-3">⬆️ Boost Converter IC</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Requirements:</strong></div>
                  <ul class="list-disc list-inside text-purple-800 dark:text-purple-400 space-y-1">
                    <li>V_in_max ≥ {{ (inputVoltage * 1.2).toFixed(1) }}V</li>
                    <li>V_out = {{ outputVoltage }}V</li>
                    <li>I_out ≥ {{ outputCurrent }}A</li>
                    <li>f_sw = {{ switchingFreq }}kHz</li>
                  </ul>
                  <div class="mt-3"><strong>Examples:</strong></div>
                  <div class="text-xs text-purple-700 dark:text-purple-500">
                    {{ outputCurrent <= 0.5 ? 'MT3608, FP6276, ME2108' : outputCurrent <= 2 ? 'LM2577, XL6009, XLSEMI' : 'LT1370, TPS61070, LMR62421' }}
                  </div>
                </div>
              </div>

              <!-- Inductor -->
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800">
                <h5 class="font-bold text-green-900 dark:text-green-300 mb-3">🌀 Inductor</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Calculated Value:</strong></div>
                  <div class="text-xl font-mono font-bold text-green-600 dark:text-green-400">
                    L ≥ {{ boostInductance.toFixed(1) }}µH
                  </div>
                  <ul class="list-disc list-inside text-green-800 dark:text-green-400 space-y-1 mt-2">
                    <li>I_sat ≥ {{ (inputCurrent * 1.5).toFixed(2) }}A</li>
                    <li>DCR ≤ {{ (50 / outputCurrent).toFixed(2) }}mΩ</li>
                    <li>High saturation flux needed</li>
                  </ul>
                </div>
              </div>

              <!-- Output Capacitor -->
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
                <h5 class="font-bold text-blue-900 dark:text-blue-300 mb-3">⚡ Output Capacitor</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Minimum Value:</strong></div>
                  <div class="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    C_out ≥ {{ boostOutputCap.toFixed(0) }}µF
                  </div>
                  <ul class="list-disc list-inside text-blue-800 dark:text-blue-400 space-y-1 mt-2">
                    <li>Low ESR critical</li>
                    <li>Ceramic or polymer electrolytic</li>
                    <li>V_rating ≥ {{ (outputVoltage * 1.3).toFixed(1) }}V</li>
                  </ul>
                </div>
              </div>

              <!-- Input Current -->
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-2 border-red-200 dark:border-red-800">
                <h5 class="font-bold text-red-900 dark:text-red-300 mb-3">⚠️ Input Current Requirements</h5>
                <div class="space-y-2 text-sm">
                  <div><strong>Input Current Draw:</strong></div>
                  <div class="text-xl font-mono font-bold text-red-600 dark:text-red-400">
                    I_in ≥ {{ inputCurrent.toFixed(2) }}A
                  </div>
                  <ul class="list-disc list-inside text-red-800 dark:text-red-400 space-y-1 mt-2">
                    <li>Ensure battery/source can supply</li>
                    <li>Input cap: ≥{{ (inputCurrent * 15).toFixed(0) }}µF</li>
                    <li>Low ESR input capacitor critical</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Dropout Warning for LDO -->
          <div v-if="regulatorType === 'ldo' && (inputVoltage - outputVoltage) < dropoutVoltage"
            class="mb-8 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border-2 border-red-400 dark:border-red-700">
            <div class="flex items-start gap-3">
              <span class="text-3xl">⚠️</span>
              <div>
                <h4 class="font-bold text-red-900 dark:text-red-300">Headroom Voltage Error!</h4>
                <p class="text-sm text-red-800 dark:text-red-400 mt-1">
                  Input voltage ({{ inputVoltage }}V) minus output ({{ outputVoltage }}V) = {{ (inputVoltage - outputVoltage).toFixed(2) }}V is less than
                  dropout voltage ({{ dropoutVoltage }}V). The LDO will not regulate properly.
                  <strong>Increase input voltage to at least {{ (outputVoltage + dropoutVoltage).toFixed(2) }}V</strong>.
                </p>
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
            📚 Voltage Regulator Fundamentals
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">LDO vs Switching Regulators</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">🔋 LDO (Linear)</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>✅ Low noise, clean output</li>
                  <li>✅ Simple design, low cost</li>
                  <li>✅ Fast transient response</li>
                  <li>❌ Low efficiency (heat)</li>
                  <li>❌ V_in must be > V_out</li>
                  <li>Best for: Audio, RF, low power</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">⚡ Switching (Buck/Boost)</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>✅ High efficiency (85-95%)</li>
                  <li>✅ Less heat generation</li>
                  <li>✅ Can step-up or step-down</li>
                  <li>❌ Switching noise</li>
                  <li>❌ More complex design</li>
                  <li>Best for: Battery, high power</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Equations</h3>

            <div v-if="regulatorType === 'ldo'">
              <h4 class="font-bold text-gray-700 dark:text-gray-300">LDO Regulator</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
                <div>P_loss = (V_in - V_out) × I_out</div>
                <div>η = (V_out / V_in) × 100%</div>
                <div>V_headroom = V_in - V_out ≥ V_do</div>
                <div>T_rise = P_loss × R_θJA</div>
              </div>
            </div>

            <div v-if="regulatorType === 'buck'">
              <h4 class="font-bold text-gray-700 dark:text-gray-300">Buck Converter</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
                <div>D = V_out / V_in</div>
                <div>L_min = (V_out × (1 - D)) / (f_sw × ΔI_L)</div>
                <div>I_in = I_out × D × (1 / η)</div>
                <div>C_out ≥ ΔI_L / (8 × f_sw × ΔV_out)</div>
              </div>
            </div>

            <div v-if="regulatorType === 'boost'">
              <h4 class="font-bold text-gray-700 dark:text-gray-300">Boost Converter</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
                <div>D = 1 - (V_in / V_out)</div>
                <div>L_min = (V_in × D) / (f_sw × ΔI_L)</div>
                <div>I_in = I_out × (V_out / V_in) / η</div>
                <div>C_out ≥ I_out × D / (f_sw × ΔV_out)</div>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Thermal Management</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Junction Temperature:</strong> T_J = T_A + (P_loss × R_θJA)</li>
              <li><strong>Thermal Resistance:</strong> R_θJA = R_θJC + R_θCS + R_θSA</li>
              <li><strong>SOT-223 Package:</strong> ~60°C/W (no heatsink)</li>
              <li><strong>TO-220 Package:</strong> ~50°C/W (no heatsink), ~2°C/W (with large heatsink)</li>
              <li>Keep T_J < 125°C for reliable operation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use <strong>low-ESR capacitors</strong> for switching regulators</li>
              <li>Place input capacitor <strong>close to IC pins</strong></li>
              <li>Use <strong>star ground</strong> for high currents</li>
              <li>Add <strong>0.1µF ceramic</strong> caps in parallel with bulk capacitors</li>
              <li>Consider <strong>pre-regulation</strong> for high V_in to V_out differentials</li>
              <li>For low noise, add <strong>LC filter</strong> after switching regulator</li>
              <li>Check <strong>stability criteria</strong> - output capacitance and ESR matter</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Pitfalls</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>❌ Insufficient headroom voltage for LDOs</li>
              <li>❌ Undersized inductor saturation current</li>
              <li>❌ Input capacitor too far from regulator pins</li>
              <li>❌ Ignoring parasitic resistance (ESR, DCR)</li>
              <li>❌ Wrong capacitor type (high ESR causes instability)</li>
              <li>❌ Inadequate thermal management (overheating)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { colorMode } = useColorMode()

// Input parameters
const regulatorType = ref<'ldo' | 'buck' | 'boost'>('ldo')
const inputVoltage = ref(9)     // V
const outputVoltage = ref(5)    // V
const outputCurrent = ref(1)    // A

// LDO specific
const dropoutVoltage = ref(1.2) // V
const groundCurrent = ref(5)    // mA

// Switching specific
const switchingFreq = ref(500)  // kHz
const efficiency = ref(90)      // %

// Calculated values
const powerDissipation = computed(() => {
  if (regulatorType.value === 'ldo') {
    const vDrop = inputVoltage.value - outputVoltage.value
    return vDrop * outputCurrent.value + (groundCurrent.value / 1000 * inputVoltage.value)
  } else {
    const pOut = outputPower.value
    return pOut * (1 / (efficiency.value / 100) - 1)
  }
})

const efficiencyCalc = computed(() => {
  if (regulatorType.value === 'ldo') {
    const pIn = inputPower.value
    return pIn > 0 ? (outputPower.value / pIn) * 100 : 0
  } else {
    return efficiency.value
  }
})

const inputPower = computed(() => {
  if (regulatorType.value === 'ldo') {
    return inputVoltage.value * outputCurrent.value + (groundCurrent.value / 1000 * inputVoltage.value)
  } else {
    return outputPower.value / (efficiency.value / 100)
  }
})

const outputPower = computed(() => {
  return outputVoltage.value * outputCurrent.value
})

const inputCurrent = computed(() => {
  return inputPower.value / inputVoltage.value
})

const powerLossPercent = computed(() => {
  const pIn = inputPower.value
  return pIn > 0 ? ((pIn - outputPower.value) / pIn) * 100 : 0
})

const tempRise = computed(() => {
  // Assume SOT-223 package with ~60°C/W thermal resistance (no heatsink)
  const rThetaJA = 60 // °C/W
  return powerDissipation.value * rThetaJA
})

// Buck converter calculations
const dutyCycle = computed(() => {
  return outputVoltage.value / inputVoltage.value
})

const buckInductance = computed(() => {
  // Allow 30% current ripple
  const deltaI = outputCurrent.value * 0.3
  const Vout = outputVoltage.value
  const D = dutyCycle.value
  const fs = switchingFreq.value * 1000
  const L_min = (Vout * (1 - D)) / (fs * deltaI)
  return L_min * 1e6 // Convert to µH
})

const buckOutputCap = computed(() => {
  // Target 50mV ripple
  const deltaVout = 0.05
  const D = dutyCycle.value
  const fs = switchingFreq.value * 1000
  const Iout = outputCurrent.value
  const C_min = (Iout * D) / (fs * deltaVout)
  return C_min * 1e6 // Convert to µF
})

// Feedback resistors for buck (assuming 0.8V reference)
const feedbackR2 = ref(10000) // 10kΩ fixed bottom resistor
const feedbackR1 = computed(() => {
  const vRef = 0.8
  return feedbackR2.value * ((outputVoltage.value / vRef) - 1)
})

// Boost converter calculations
const boostDutyCycle = computed(() => {
  return 1 - (inputVoltage.value / outputVoltage.value)
})

const boostInductance = computed(() => {
  // Allow 40% current ripple
  const deltaI = inputCurrent.value * 0.4
  const Vin = inputVoltage.value
  const D = boostDutyCycle.value
  const fs = switchingFreq.value * 1000
  const L_min = (Vin * D) / (fs * deltaI)
  return L_min * 1e6 // Convert to µH
})

const boostOutputCap = computed(() => {
  // Target 100mV ripple (higher due to boost topology)
  const deltaVout = 0.1
  const D = boostDutyCycle.value
  const fs = switchingFreq.value * 1000
  const Iout = outputCurrent.value
  const C_min = (Iout * D) / (fs * deltaVout)
  return C_min * 1e6 // Convert to µF
})

// Presets
const setPreset = (type: string) => {
  switch (type) {
    case 'usb-5v':
      regulatorType.value = 'buck'
      inputVoltage.value = 12
      outputVoltage.value = 5
      outputCurrent.value = 2
      switchingFreq.value = 500
      efficiency.value = 92
      break
    case 'mcu-3v3':
      regulatorType.value = 'ldo'
      inputVoltage.value = 5
      outputVoltage.value = 3.3
      outputCurrent.value = 0.5
      dropoutVoltage.value = 0.5
      groundCurrent.value = 5
      break
    case 'led-12v':
      regulatorType.value = 'buck'
      inputVoltage.value = 24
      outputVoltage.value = 12
      outputCurrent.value = 3
      switchingFreq.value = 300
      efficiency.value = 90
      break
    case 'lipo-boost':
      regulatorType.value = 'boost'
      inputVoltage.value = 3.7
      outputVoltage.value = 5
      outputCurrent.value = 1
      switchingFreq.value = 1000
      efficiency.value = 85
      break
  }
}

useHead({
  title: 'Voltage Regulator Design Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design LDO and switching voltage regulators with component calculations' }
  ]
})
</script>

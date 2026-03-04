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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            RC Filter Attenuation Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate signal attenuation and frequency response for RC low-pass and high-pass filters
          </p>

          <!-- Animated Formulas -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col gap-3 text-xl font-mono font-bold">
              <div class="flex items-center gap-3 justify-center flex-wrap">
                <span class="text-primary-highlight">Cutoff Frequency:</span>
                <span class="text-gray-400">f_c =</span>
                <span class="text-primary-highlight">1</span>
                <span class="text-gray-400">÷</span>
                <span class="text-gray-400">(</span>
                <span class="text-primary-highlight">2πRC</span>
                <span class="text-gray-400">)</span>
              </div>
              <div class="flex items-center gap-3 justify-center flex-wrap">
                <span class="text-primary-highlight">Attenuation:</span>
                <span class="text-gray-400">A_dB =</span>
                <span class="text-gray-400">−10</span>
                <span class="text-gray-400">×</span>
                <span class="text-gray-400">log₁₀(</span>
                <span class="text-gray-400">1 + (f/f_c)²</span>
                <span class="text-gray-400">)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Type Selection -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔧 Filter Configuration
          </h3>

          <!-- Filter Type Toggle -->
          <div class="flex justify-center gap-4 mb-8">
            <button
              @click="filterType = 'lowpass'"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all',
                filterType === 'lowpass'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              🔽 Low-Pass Filter
            </button>
            <button
              @click="filterType = 'highpass'"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all',
                filterType === 'highpass'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              ]"
            >
              🔼 High-Pass Filter
            </button>
          </div>

          <!-- Component Controls -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Resistance Control -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🔵 Resistance (R)
              </label>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-3">
                  <input
                    type="number"
                    v-model.number="resistance"
                    min="100"
                    max="1000000"
                    step="100"
                    class="flex-1 px-4 py-3 text-lg font-mono bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white"
                  >
                  <span class="text-gray-600 dark:text-gray-400 font-bold text-lg">Ω</span>
                </div>
                <input
                  type="range"
                  v-model.number="resistance"
                  min="100"
                  max="100000"
                  step="100"
                  class="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                >
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {{ formatResistance(resistance) }}
                </div>
              </div>
            </div>

            <!-- Capacitance Control -->
            <div class="space-y-4">
              <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200">
                🟢 Capacitance (C)
              </label>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-3">
                  <input
                    type="number"
                    v-model.number="capacitance"
                    min="1e-12"
                    max="1e-3"
                    step="1e-12"
                    class="flex-1 px-4 py-3 text-lg font-mono bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-700 rounded-lg focus:outline-none focus:border-green-500 dark:focus:border-green-500 text-gray-900 dark:text-white"
                  >
                  <span class="text-gray-600 dark:text-gray-400 font-bold text-lg">F</span>
                </div>
                <input
                  type="range"
                  v-model.number="capacitance"
                  :min="1e-12"
                  :max="1e-6"
                  :step="capacitance * 0.1"
                  class="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                >
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {{ formatCapacitance(capacitance) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              ⚡ Quick Presets
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                @click="applyPreset('audio')"
                class="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 p-3 rounded-lg transition-colors"
              >
                <div class="font-bold">Audio LPF</div>
                <div class="text-xs mt-1">f_c ≈ 16kHz</div>
              </button>
              <button
                @click="applyPreset('subsonic')"
                class="bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-700 dark:text-green-300 p-3 rounded-lg transition-colors"
              >
                <div class="font-bold">Subsonic HPF</div>
                <div class="text-xs mt-1">f_c ≈ 20Hz</div>
              </button>
              <button
                @click="applyPreset('treble')"
                class="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 p-3 rounded-lg transition-colors"
              >
                <div class="font-bold">Treble HPF</div>
                <div class="text-xs mt-1">f_c ≈ 2kHz</div>
              </button>
              <button
                @click="applyPreset('rf')"
                class="bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800 text-orange-700 dark:text-orange-300 p-3 rounded-lg transition-colors"
              >
                <div class="font-bold">RF LPF</div>
                <div class="text-xs mt-1">f_c ≈ 1MHz</div>
              </button>
            </div>
          </div>

          <!-- Cutoff Frequency Display -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 mb-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Cutoff Frequency (f_c)</h4>
            <div class="text-center">
              <div class="text-5xl font-bold text-primary-highlight font-mono mb-2">
                {{ formatFrequency(cutoffFrequency) }}
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                f_c = 1 ÷ (2π × {{ formatResistance(resistance) }} × {{ formatCapacitance(capacitance) }})
              </div>
            </div>
          </div>

          <!-- Input Frequency Control -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              🎵 Input Signal Frequency
            </label>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-3">
                <input
                  type="range"
                  v-model.number="inputFrequency"
                  min="1"
                  max="10000000"
                  :step="inputFrequency * 0.1"
                  class="flex-1 h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                >
                <input
                  type="number"
                  v-model.number="inputFrequency"
                  min="1"
                  max="100000000"
                  class="w-32 px-3 py-2 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-700 rounded-lg text-center font-mono text-gray-900 dark:text-white focus:border-purple-500 focus:outline-none"
                >
                <span class="text-gray-600 dark:text-gray-400 font-semibold">Hz</span>
              </div>
              <div class="text-center text-sm text-gray-600 dark:text-gray-400">
                {{ formatFrequency(inputFrequency) }}
                <span class="mx-2">|</span>
                f/f_c = (inputFrequency / cutoffFrequency).toFixed(3)
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
              <div class="text-sm text-blue-700 dark:text-blue-400 mb-2">Output Voltage</div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                {{ (outputVoltageRatio * 100).toFixed(2) }}%
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-500 mt-2">
                {{ outputVoltageRatio.toFixed(4) }} × V_in
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div class="text-sm text-green-700 dark:text-green-400 mb-2">Attenuation</div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 font-mono">
                {{ attenuation.toFixed(2) }} dB
              </div>
              <div class="text-xs text-green-600 dark:text-green-500 mt-2">
                {{ attenuation < 0 ? 'Signal reduced' : 'Full signal' }}
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <div class="text-sm text-purple-700 dark:text-purple-400 mb-2">Phase Shift</div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 font-mono">
                {{ phaseShift.toFixed(1) }}°
              </div>
              <div class="text-xs text-purple-600 dark:text-purple-500 mt-2">
                {{ filterType === 'lowpass' ? 'Output lags input' : 'Output leads input' }}
              </div>
            </div>
          </div>

          <!-- Bode Plot -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📈 Frequency Response (Bode Plot)</h4>
            <div class="flex justify-center">
              <svg viewBox="0 0 900 400" class="w-full h-auto bg-white dark:bg-gray-800 rounded-lg">
                <!-- Background grid -->
                <defs>
                  <pattern id="bodeGrid" width="60" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bodeGrid)" />

                <!-- Axes -->
                <line x1="80" y1="200" x2="850" y2="200" stroke="#6B7280" stroke-width="2" />
                <line x1="80" y1="50" x2="80" y2="350" stroke="#6B7280" stroke-width="2" />

                <!-- Y-axis labels (dB) -->
                <g font-size="11" fill="#6B7280" text-anchor="end">
                  <text x="70" y="55">0 dB</text>
                  <text x="70" y="125">-20 dB</text>
                  <text x="70" y="195">-40 dB</text>
                  <text x="70" y="265">-60 dB</text>
                  <text x="70" y="335">-80 dB</text>
                </g>

                <!-- X-axis labels (Frequency) -->
                <g font-size="11" fill="#6B7280" text-anchor="middle">
                  <text x="80" y="370">1 Hz</text>
                  <text x="210" y="370">10 Hz</text>
                  <text x="340" y="370">100 Hz</text>
                  <text x="470" y="370">1 kHz</text>
                  <text x="600" y="370">10 kHz</text>
                  <text x="730" y="370">100 kHz</text>
                  <text x="860" y="370">1 MHz</text>
                </g>

                <!-- Response curve -->
                <path
                  :d="bodeCurvePath"
                  fill="none"
                  :stroke="filterType === 'lowpass' ? '#3B82F6' : '#8B5CF6'"
                  stroke-width="3"
                  stroke-linecap="round"
                />

                <!-- Current frequency marker -->
                <g v-if="inputFrequency > 0">
                  <line
                    :x1="frequencyToX(inputFrequency)"
                    y1="50"
                    :x2="frequencyToX(inputFrequency)"
                    y2="350"
                    stroke="#EF4444"
                    stroke-width="2"
                    stroke-dasharray="5,5"
                  />
                  <circle
                    :cx="frequencyToX(inputFrequency)"
                    :cy="attenuationToY(attenuation)"
                    r="8"
                    fill="#EF4444"
                    stroke="white"
                    stroke-width="2"
                  />
                  <text
                    :x="frequencyToX(inputFrequency)"
                    :y="attenuationToY(attenuation) - 15"
                    text-anchor="middle"
                    font-size="12"
                    font-weight="bold"
                    fill="#EF4444"
                  >
                    {{ attenuation.toFixed(1) }} dB
                  </text>
                </g>

                <!-- Cutoff frequency marker -->
                <g>
                  <line
                    :x1="frequencyToX(cutoffFrequency)"
                    y1="50"
                    :x2="frequencyToX(cutoffFrequency)"
                    y2="350"
                    stroke="#10B981"
                    stroke-width="2"
                    stroke-dasharray="8,4"
                  />
                  <text
                    :x="frequencyToX(cutoffFrequency)"
                    y="40"
                    text-anchor="middle"
                    font-size="12"
                    font-weight="bold"
                    fill="#10B981"
                  >
                    f_c = -3dB
                  </text>
                </g>

                <!-- Title -->
                <text x="450" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">
                  {{ filterType === 'lowpass' ? 'Low-Pass' : 'High-Pass' }} Filter Response
                </text>
              </svg>
            </div>
          </div>

          <!-- Circuit Diagram -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Circuit Diagram</h4>
            <div class="flex justify-center">
              <svg viewBox="0 0 600 250" class="w-full max-w-3xl h-auto bg-white dark:bg-gray-800 rounded-lg">
                <!-- Input terminal -->
                <circle cx="50" cy="125" r="8" fill="#3B82F6" />
                <text x="50" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">V_in</text>

                <g v-if="filterType === 'lowpass'">
                  <!-- Low-pass filter: R in series, C to ground -->
                  <!-- Wire from input to resistor -->
                  <line x1="58" y1="125" x2="180" y2="125" stroke="#6B7280" stroke-width="3" />

                  <!-- Resistor -->
                  <path d="M 180 125 L 190 115 L 200 135 L 210 115 L 220 135 L 230 115 L 240 135 L 250 115 L 260 135 L 270 125"
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <text x="225" y="100" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">R</text>

                  <!-- Wire from resistor to capacitor and output -->
                  <line x1="270" y1="125" x2="350" y2="125" stroke="#6B7280" stroke-width="3" />

                  <!-- Capacitor to ground -->
                  <line x1="350" y1="125" x2="350" y2="160" stroke="#6B7280" stroke-width="3" />
                  <line x1="340" y1="160" x2="360" y2="160" stroke="#10B981" stroke-width="3" />
                  <line x1="340" y1="170" x2="360" y2="170" stroke="#10B981" stroke-width="3" />
                  <line x1="350" y1="170" x2="350" y2="190" stroke="#6B7280" stroke-width="3" />
                  <text x="350" y="150" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">C</text>

                  <!-- Ground symbol -->
                  <line x1="350" y1="190" x2="350" y2="200" stroke="#6B7280" stroke-width="3" />
                  <line x1="330" y1="200" x2="370" y2="200" stroke="#6B7280" stroke-width="3" />
                  <line x1="340" y1="206" x2="360" y2="206" stroke="#6B7280" stroke-width="3" />
                  <line x1="345" y1="212" x2="355" y2="212" stroke="#6B7280" stroke-width="3" />

                  <!-- Output terminal -->
                  <circle cx="450" cy="125" r="8" fill="#8B5CF6" />
                  <text x="450" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">V_out</text>
                  <line x1="350" y1="125" x2="442" y2="125" stroke="#6B7280" stroke-width="3" />
                </g>

                <g v-else>
                  <!-- High-pass filter: C in series, R to ground -->
                  <!-- Wire from input to capacitor -->
                  <line x1="58" y1="125" x2="180" y2="125" stroke="#6B7280" stroke-width="3" />

                  <!-- Capacitor -->
                  <line x1="180" y1="115" x2="180" y2="135" stroke="#6B7280" stroke-width="3" />
                  <line x1="190" y1="115" x2="190" y2="135" stroke="#6B7280" stroke-width="3" />
                  <line x1="190" y1="125" x2="250" y2="125" stroke="#6B7280" stroke-width="3" />
                  <text x="185" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">C</text>

                  <!-- Wire from capacitor to resistor and output -->
                  <line x1="250" y1="125" x2="320" y2="125" stroke="#6B7280" stroke-width="3" />

                  <!-- Resistor to ground -->
                  <line x1="320" y1="125" x2="320" y2="145" stroke="#6B7280" stroke-width="3" />
                  <path d="M 320 145 L 310 150 L 330 155 L 310 160 L 330 165 L 310 170 L 330 175 L 320 180"
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <text x="340" y="165" font-size="12" font-weight="bold" fill="#3B82F6">R</text>
                  <line x1="320" y1="180" x2="320" y2="200" stroke="#6B7280" stroke-width="3" />

                  <!-- Ground symbol -->
                  <line x1="320" y1="200" x2="320" y2="210" stroke="#6B7280" stroke-width="3" />
                  <line x1="300" y1="210" x2="340" y2="210" stroke="#6B7280" stroke-width="3" />
                  <line x1="310" y1="216" x2="330" y2="216" stroke="#6B7280" stroke-width="3" />
                  <line x1="315" y1="222" x2="325" y2="222" stroke="#6B7280" stroke-width="3" />

                  <!-- Output terminal -->
                  <circle cx="450" cy="125" r="8" fill="#8B5CF6" />
                  <text x="450" y="155" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">V_out</text>
                  <line x1="320" y1="125" x2="442" y2="125" stroke="#6B7280" stroke-width="3" />
                </g>

                <!-- Component values -->
                <text x="550" y="50" text-anchor="start" font-size="11" fill="#6B7280">
                  <tspan x="550" dy="0">R = {{ formatResistance(resistance) }}</tspan>
                  <tspan x="550" dy="16">C = {{ formatCapacitance(capacitance) }}</tspan>
                  <tspan x="550" dy="16">f_c = {{ formatFrequency(cutoffFrequency) }}</tspan>
                </text>
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
            📚 Understanding RC Filter Attenuation
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an RC Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An RC filter is a simple circuit composed of a resistor (R) and capacitor (C) that filters signals based on frequency.
              It allows certain frequencies to pass while attenuating others, making it fundamental to audio processing, signal conditioning,
              and communications systems.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Capacitive reactance:</strong> X_C = 1 ÷ (2πfC) decreases as frequency increases</li>
              <li><strong>Low-pass filter:</strong> At low frequencies, X_C is high → most voltage drops across C → output high</li>
              <li><strong>High-pass filter:</strong> At high frequencies, X_C is low → most voltage drops across R → output high</li>
              <li><strong>Cutoff frequency:</strong> Where output power is half (-3dB) or voltage is 70.7% of input</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>Cutoff Frequency:</strong> f_c = 1 ÷ (2πRC)</div>
              <div><strong>Low-Pass Output:</strong> V_out = V_in × X_C ÷ √(R² + X_C²)</div>
              <div><strong>High-Pass Output:</strong> V_out = V_in × R ÷ √(R² + X_C²)</div>
              <div><strong>Attenuation (dB):</strong> A = -10 × log₁₀(1 + (f/f_c)²) [LP] or +10 × log₁₀(1 + (f_c/f)²) [HP]</div>
              <div><strong>Phase Shift:</strong> φ = -arctan(f/f_c) [LP] or +arctan(f_c/f) [HP]</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Frequency Response Analysis:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Low-Pass Filter</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• f « f_c: Pass band (0 dB attenuation)</li>
                  <li>• f = f_c: -3 dB (70.7% voltage)</li>
                  <li>• f » f_c: Stop band (-20dB/decade)</li>
                  <li>• Phase: 0° to -90° lag</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">High-Pass Filter</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• f » f_c: Pass band (0 dB attenuation)</li>
                  <li>• f = f_c: -3 dB (70.7% voltage)</li>
                  <li>• f « f_c: Stop band (+20dB/decade)</li>
                  <li>• Phase: +90° to 0° lead</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio systems:</strong> Subsonic filters (20Hz HPF), treble controls, crossover networks</li>
              <li><strong>Signal conditioning:</strong> Remove noise, anti-aliasing before ADC</li>
              <li><strong>Communications:</strong> Band-limiting signals, channel selection</li>
              <li><strong>Power supplies:</strong> Smoothing rectified voltage (low-pass)</li>
              <li><strong>Instrumentation:</strong> Sensor signal filtering, DC blocking</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Component tolerances:</strong> Use 1% or better resistors, 5% capacitors for precision</li>
              <li><strong>Load impedance:</strong> Ensure load resistance ≫ R for low-pass, ≪ R for high-pass</li>
              <li><strong>Source impedance:</strong> Keep source impedance ≪ R</li>
              <li><strong>Cascading:</strong> Multiple RC filters create steeper roll-off (-40dB/decade for 2nd order)</li>
              <li><strong>Op-amp buffers:</strong> Add voltage followers to prevent loading effects</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Designing a subsonic filter for audio (removes rumble below 20Hz):
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Target cutoff: f_c = 20 Hz</li>
              <li>Choose R = 100 kΩ (standard value, high input impedance)</li>
              <li>Calculate C: C = 1 ÷ (2π × 100kΩ × 20Hz) ≈ 79.6 nF (use 82 nF standard)</li>
              <li>Actual f_c: 1 ÷ (2π × 100kΩ × 82nF) ≈ 19.4 Hz (close enough!)</li>
              <li>At 10 Hz: Attenuation ≈ -6.4 dB (50% voltage reduction)</li>
              <li>At 5 Hz: Attenuation ≈ -12.3 dB (24% voltage remaining)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">💡 Pro Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Sharp roll-off:</strong> Cascade multiple RC filters for steeper attenuation</li>
              <li><strong>Bessel/Butterworth:</strong> Use these topologies for flatter passband response</li>
              <li><strong>Component selection:</strong> Film capacitors (polypropylene) offer better stability than electrolytic</li>
              <li><strong>Simulation:</strong> Always verify with SPICE simulation before building</li>
              <li><strong>Measurement:</strong> Use a function generator and oscilloscope to verify frequency response</li>
              <li><strong>Temperature:</strong> Capacitor values drift with temperature - account for this in precision applications</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">⚠️ Common Pitfalls:</h3>
            <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
              <ul class="text-sm text-red-700 dark:text-red-400 space-y-2">
                <li>• Forgetting to account for source/load impedance (loading effect)</li>
                <li>• Using electrolytic capacitors for high-frequency signals (poor HF performance)</li>
                <li>• Not considering capacitor ESR (equivalent series resistance)</li>
                <li>• Assuming ideal components (real components have parasitic effects)</li>
                <li>• Ignoring phase shift in feedback systems (can cause oscillation!)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const filterType = ref<'lowpass' | 'highpass'>('lowpass')
const resistance = ref(10000) // Ohms
const capacitance = ref(10e-9) // Farads (10 nF)
const inputFrequency = ref(1000) // Hz

// Computed properties
const cutoffFrequency = computed(() => {
  // f_c = 1 / (2πRC)
  return 1 / (2 * Math.PI * resistance.value * capacitance.value)
})

const capacitiveReactance = computed(() => {
  // X_C = 1 / (2πfC)
  return 1 / (2 * Math.PI * inputFrequency.value * capacitance.value)
})

const outputVoltageRatio = computed(() => {
  const ratio = inputFrequency.value / cutoffFrequency.value

  if (filterType.value === 'lowpass') {
    // V_out/V_in = X_C / sqrt(R^2 + X_C^2)
    // = 1 / sqrt(1 + (f/f_c)^2)
    return 1 / Math.sqrt(1 + ratio * ratio)
  } else {
    // V_out/V_in = R / sqrt(R^2 + X_C^2)
    // = (f/f_c) / sqrt(1 + (f/f_c)^2)
    return ratio / Math.sqrt(1 + ratio * ratio)
  }
})

const attenuation = computed(() => {
  // A (dB) = 20 * log10(V_out/V_in)
  return 20 * Math.log10(outputVoltageRatio.value)
})

const phaseShift = computed(() => {
  const ratio = inputFrequency.value / cutoffFrequency.value

  if (filterType.value === 'lowpass') {
    // φ = -arctan(f/f_c)
    return -(Math.atan(ratio) * 180 / Math.PI)
  } else {
    // φ = +arctan(f_c/f)
    return Math.atan(1 / ratio) * 180 / Math.PI
  }
})

// Bode plot helpers
const frequencyToX = (freq: number) => {
  // Map 1 Hz to 1 MHz logarithmically to 80-850 pixels
  const minFreq = 1
  const maxFreq = 1e6
  const minPixel = 80
  const maxPixel = 850

  const logFreq = Math.log10(freq)
  const logMin = Math.log10(minFreq)
  const logMax = Math.log10(maxFreq)

  return minPixel + ((logFreq - logMin) / (logMax - logMin)) * (maxPixel - minPixel)
}

const attenuationToY = (attn: number) => {
  // Map 0 to -80 dB to 50-350 pixels
  const minAttn = 0
  const maxAttn = -80
  const minPixel = 50
  const maxPixel = 350

  // Clamp attenuation
  const clampedAttn = Math.max(maxAttn, Math.min(minAttn, attn))

  return minPixel + ((clampedAttn - minAttn) / (maxAttn - minAttn)) * (maxPixel - minPixel)
}

const bodeCurvePath = computed(() => {
  const points: string[] = []

  // Generate points from 1 Hz to 1 MHz (logarithmic)
  for (let i = 0; i <= 100; i++) {
    const freq = Math.pow(10, i / 100 * 6) // 10^0 to 10^6
    const ratio = freq / cutoffFrequency.value

    let outputRatio: number
    if (filterType.value === 'lowpass') {
      outputRatio = 1 / Math.sqrt(1 + ratio * ratio)
    } else {
      outputRatio = ratio / Math.sqrt(1 + ratio * ratio)
    }

    const attn = 20 * Math.log10(outputRatio)
    const x = frequencyToX(freq)
    const y = attenuationToY(attn)

    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }

  return points.join(' ')
})

// Formatting helpers
const formatResistance = (r: number) => {
  if (r >= 1e6) return `${(r / 1e6).toFixed(2)} MΩ`
  if (r >= 1e3) return `${(r / 1e3).toFixed(2)} kΩ`
  return `${r.toFixed(1)} Ω`
}

const formatCapacitance = (c: number) => {
  if (c >= 1e-6) return `${(c * 1e6).toFixed(2)} µF`
  if (c >= 1e-9) return `${(c * 1e9).toFixed(2)} nF`
  if (c >= 1e-12) return `${(c * 1e12).toFixed(2)} pF`
  return `${c.toExponential(2)} F`
}

const formatFrequency = (f: number) => {
  if (f >= 1e6) return `${(f / 1e6).toFixed(2)} MHz`
  if (f >= 1e3) return `${(f / 1e3).toFixed(2)} kHz`
  if (f >= 1) return `${f.toFixed(2)} Hz`
  return `${(f * 1e3).toFixed(2)} mHz`
}

// Presets
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'audio':
      // Low-pass for audio, f_c ≈ 16kHz
      resistance.value = 1000
      capacitance.value = 1 / (2 * Math.PI * 16000 * 1000)
      filterType.value = 'lowpass'
      break
    case 'subsonic':
      // High-pass subsonic filter, f_c ≈ 20Hz
      resistance.value = 100000
      capacitance.value = 1 / (2 * Math.PI * 20 * 100000)
      filterType.value = 'highpass'
      break
    case 'treble':
      // High-pass treble filter, f_c ≈ 2kHz
      resistance.value = 10000
      capacitance.value = 1 / (2 * Math.PI * 2000 * 10000)
      filterType.value = 'highpass'
      break
    case 'rf':
      // Low-pass for RF, f_c ≈ 1MHz
      resistance.value = 50
      capacitance.value = 1 / (2 * Math.PI * 1e6 * 50)
      filterType.value = 'lowpass'
      break
  }
}

// SEO
useHead({
  title: 'RC Filter Attenuation Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate RC filter attenuation, frequency response, and phase shift. Interactive Bode plot visualization for low-pass and high-pass RC filters.' },
    { name: 'keywords', content: 'RC filter, attenuation calculator, frequency response, Bode plot, low-pass filter, high-pass filter, cutoff frequency' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
          ⚡ Diode Rectifier Simulation
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how diodes convert AC voltage to DC voltage through half-wave and full-wave rectification
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Rectifier Type -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Rectifier Type</h3>
            <div class="space-y-3">
              <button
                @click="rectifierType = 'half'"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-semibold transition-all',
                  rectifierType === 'half'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                Half-Wave Rectifier
              </button>
              <button
                @click="rectifierType = 'full-center'"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-semibold transition-all',
                  rectifierType === 'full-center'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                Full-Wave (Center-Tap)
              </button>
              <button
                @click="rectifierType = 'full-bridge'"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-semibold transition-all',
                  rectifierType === 'full-bridge'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                Full-Wave (Bridge)
              </button>
            </div>
          </div>

          <!-- Input Parameters -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Input Parameters</h3>
            
            <div class="space-y-6">
              <!-- Peak Voltage -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Peak Voltage (V<sub>p</sub>): {{ vp }} V
                </label>
                <input
                  v-model.number="vp"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="vp"
                  type="number"
                  min="1"
                  max="100"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Frequency -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Frequency: {{ frequency }} Hz
                </label>
                <input
                  v-model.number="frequency"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="frequency"
                  type="number"
                  min="10"
                  max="100"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Load Resistance -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistance: {{ loadResistance }} Ω
                </label>
                <input
                  v-model.number="loadResistance"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="loadResistance"
                  type="number"
                  min="10"
                  max="1000"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <!-- Diode Voltage Drop -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Diode Drop (V<sub>d</sub>): {{ diodeDrop }} V
                </label>
                <input
                  v-model.number="diodeDrop"
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  v-model.number="diodeDrop"
                  type="number"
                  min="0.1"
                  max="1"
                  step="0.1"
                  class="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="applyPreset('12v')"
                class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
              >
                12V Transformer
              </button>
              <button
                @click="applyPreset('24v')"
                class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
              >
                24V Transformer
              </button>
              <button
                @click="applyPreset('5v')"
                class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
              >
                5V USB
              </button>
              <button
                @click="applyPreset('120v')"
                class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg font-semibold hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm"
              >
                120V Mains
              </button>
            </div>
          </div>
        </div>

        <!-- Visualization & Results -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Circuit Diagram</h3>
            <svg viewBox="0 0 600 300" class="w-full h-auto">
              <!-- Title -->
              <text x="300" y="25" text-anchor="middle" class="text-lg font-bold fill-gray-900 dark:fill-white">
                {{ rectifierTypeTitle }}
              </text>

              <!-- AC Source -->
              <circle cx="60" cy="150" r="25" fill="none" stroke="#3B82F6" stroke-width="2"/>
              <path d="M 50 145 Q 55 140, 60 145 Q 65 150, 70 145" fill="none" stroke="#3B82F6" stroke-width="2"/>
              <text x="60" y="195" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">AC Input</text>
              <text x="60" y="210" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">{{ vp }}V<sub>p</sub></text>

              <!-- Half-Wave Rectifier -->
              <g v-if="rectifierType === 'half'">
                <line x1="85" y1="150" x2="180" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <g transform="translate(200, 150)">
                  <polygon points="0,-15 12,0 0,15" fill="none" stroke="#22C55E" stroke-width="3"/>
                  <line x1="12" y1="-15" x2="12" y2="15" stroke="#22C55E" stroke-width="3"/>
                </g>
                <text x="200" y="185" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">D1</text>
                <line x1="212" y1="150" x2="350" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <rect x="350" y="135" width="40" height="30" fill="none" stroke="#EF4444" stroke-width="2" rx="3"/>
                <text x="370" y="155" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">R<sub>L</sub></text>
                <line x1="390" y1="150" x2="450" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <line x1="450" y1="150" x2="450" y2="220" stroke="#94A3B8" stroke-width="2"/>
                <line x1="450" y1="220" x2="60" y2="220" stroke="#94A3B8" stroke-width="2"/>
                <line x1="60" y1="220" x2="60" y2="175" stroke="#94A3B8" stroke-width="2"/>
              </g>

              <!-- Full-Wave Center-Tap -->
              <g v-if="rectifierType === 'full-center'">
                <line x1="85" y1="150" x2="120" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="120" x2="120" y2="180" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="120" x2="150" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="180" x2="150" y2="200" stroke="#94A3B8" stroke-width="2"/>
                
                <!-- D1 -->
                <g transform="translate(165, 95)">
                  <polygon points="0,-10 10,0 0,10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                  <line x1="10" y1="-10" x2="10" y2="10" stroke="#22C55E" stroke-width="2.5"/>
                </g>
                <!-- D2 -->
                <g transform="translate(165, 205)">
                  <polygon points="0,-10 10,0 0,10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                  <line x1="10" y1="-10" x2="10" y2="10" stroke="#22C55E" stroke-width="2.5"/>
                </g>
                
                <line x1="175" y1="95" x2="220" y2="95" stroke="#94A3B8" stroke-width="2"/>
                <line x1="175" y1="205" x2="220" y2="205" stroke="#94A3B8" stroke-width="2"/>
                <line x1="220" y1="95" x2="220" y2="140" stroke="#94A3B8" stroke-width="2"/>
                <line x1="220" y1="205" x2="220" y2="160" stroke="#94A3B8" stroke-width="2"/>
                
                <rect x="220" y="140" width="40" height="20" fill="none" stroke="#EF4444" stroke-width="2" rx="3"/>
                <text x="240" y="155" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">R<sub>L</sub></text>
                
                <line x1="260" y1="150" x2="350" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <line x1="350" y1="150" x2="350" y2="220" stroke="#94A3B8" stroke-width="2"/>
                <line x1="350" y1="220" x2="120" y2="220" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="220" x2="120" y2="180" stroke="#94A3B8" stroke-width="2"/>
                
                <text x="165" y="80" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">D1</text>
                <text x="165" y="230" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">D2</text>
              </g>

              <!-- Full-Wave Bridge -->
              <g v-if="rectifierType === 'full-bridge'">
                <line x1="85" y1="150" x2="130" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <line x1="130" y1="150" x2="130" y2="110" stroke="#94A3B8" stroke-width="2"/>
                <line x1="130" y1="150" x2="130" y2="190" stroke="#94A3B8" stroke-width="2"/>
                
                <!-- Bridge Rectifier Diamond -->
                <g transform="translate(200, 150)">
                  <!-- Top D1 -->
                  <g transform="translate(0, -35)">
                    <polygon points="-8,-10 0,0 8,-10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                    <line x1="-8" y1="-10" x2="-8" y2="-20" stroke="#22C55E" stroke-width="2"/>
                    <line x1="8" y1="-10" x2="8" y2="0" stroke="#22C55E" stroke-width="2.5"/>
                  </g>
                  <!-- Right D2 -->
                  <g transform="translate(35, 0)">
                    <polygon points="-8,-10 0,0 8,-10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                    <line x1="8" y1="-10" x2="8" y2="0" stroke="#22C55E" stroke-width="2.5"/>
                  </g>
                  <!-- Bottom D3 -->
                  <g transform="translate(0, 35)">
                    <polygon points="-8,-10 0,0 8,-10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                    <line x1="8" y1="-10" x2="8" y2="0" stroke="#22C55E" stroke-width="2.5"/>
                  </g>
                  <!-- Left D4 -->
                  <g transform="translate(-35, 0)">
                    <polygon points="-8,-10 0,0 8,-10" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                    <line x1="-8" y1="-10" x2="-8" y2="0" stroke="#22C55E" stroke-width="2.5"/>
                  </g>
                </g>
                
                <line x1="200" y1="115" x2="200" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <line x1="200" y1="100" x2="280" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <line x1="280" y1="100" x2="280" y2="140" stroke="#94A3B8" stroke-width="2"/>
                
                <rect x="280" y="140" width="40" height="20" fill="none" stroke="#EF4444" stroke-width="2" rx="3"/>
                <text x="300" y="155" text-anchor="middle" class="text-xs fill-gray-600 dark:fill-gray-400">R<sub>L</sub></text>
                
                <line x1="320" y1="150" x2="380" y2="150" stroke="#94A3B8" stroke-width="2"/>
                <line x1="380" y1="150" x2="380" y2="200" stroke="#94A3B8" stroke-width="2"/>
                <line x1="380" y1="200" x2="200" y2="200" stroke="#94A3B8" stroke-width="2"/>
                <line x1="200" y1="200" x2="200" y2="185" stroke="#94A3B8" stroke-width="2"/>
              </g>

              <!-- Ground symbol -->
              <g transform="translate(300, 220)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#94A3B8" stroke-width="2"/>
                <line x1="-15" y1="10" x2="15" y2="10" stroke="#94A3B8" stroke-width="2"/>
                <line x1="-10" y1="15" x2="10" y2="15" stroke="#94A3B8" stroke-width="2"/>
                <line x1="-5" y1="20" x2="5" y2="20" stroke="#94A3B8" stroke-width="2"/>
              </g>
            </svg>
          </div>

          <!-- Waveform Display -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Voltage Waveforms</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Input AC -->
              <div>
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Input AC Voltage</h4>
                <svg viewBox="0 0 300 150" class="w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <g>
                    <!-- Grid -->
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="5,5"/>
                    <line x1="150" y1="0" x2="150" y2="150" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="5,5"/>
                    
                    <!-- Axes -->
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#9CA3AF" stroke-width="1"/>
                    <line x1="150" y1="0" x2="150" y2="150" stroke="#9CA3AF" stroke-width="1"/>
                    
                    <!-- Sine wave -->
                    <path :d="generateSineWave(150, 75, 70, 2)" fill="none" stroke="#3B82F6" stroke-width="2"/>
                    
                    <!-- Labels -->
                    <text x="10" y="15" class="text-xs fill-blue-600">+V<sub>p</sub></text>
                    <text x="10" y="145" class="text-xs fill-blue-600">-V<sub>p</sub></text>
                    <text x="280" y="70" class="text-xs fill-gray-600">t</text>
                  </g>
                </svg>
              </div>

              <!-- Output DC -->
              <div>
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Output DC Voltage</h4>
                <svg viewBox="0 0 300 150" class="w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <g>
                    <!-- Grid -->
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="5,5"/>
                    <line x1="150" y1="0" x2="150" y2="150" stroke="#E5E7EB" stroke-width="1" stroke-dasharray="5,5"/>
                    
                    <!-- Axes -->
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#9CA3AF" stroke-width="1"/>
                    <line x1="150" y1="0" x2="150" y2="150" stroke="#9CA3AF" stroke-width="1"/>
                    
                    <!-- Output waveform -->
                    <path :d="generateOutputWave(150, 75, 70, 2)" fill="none" stroke="#22C55E" stroke-width="2"/>
                    
                    <!-- Labels -->
                    <text x="10" y="15" class="text-xs fill-green-600">V<sub>dc</sub></text>
                    <text x="280" y="70" class="text-xs fill-gray-600">t</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Calculations -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Results</h3>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Peak Output</p>
                <p class="text-2xl font-bold text-blue-900 dark:text-white">{{ vPeakOut }} V</p>
              </div>
              
              <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">DC Output</p>
                <p class="text-2xl font-bold text-green-900 dark:text-white">{{ vdc }} V</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">RMS Output</p>
                <p class="text-2xl font-bold text-purple-900 dark:text-white">{{ vrms }} V</p>
              </div>
              
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1">Ripple Factor</p>
                <p class="text-2xl font-bold text-orange-900 dark:text-white">{{ rippleFactor }}</p>
              </div>
              
              <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-1">Output Current</p>
                <p class="text-2xl font-bold text-cyan-900 dark:text-white">{{ idc }} mA</p>
              </div>
              
              <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-pink-700 dark:text-pink-300 mb-1">Output Power</p>
                <p class="text-2xl font-bold text-pink-900 dark:text-white">{{ power }} mW</p>
              </div>
              
              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">Efficiency</p>
                <p class="text-2xl font-bold text-indigo-900 dark:text-white">{{ efficiency }}%</p>
              </div>
              
              <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-4">
                <p class="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-1">Diodes Used</p>
                <p class="text-2xl font-bold text-teal-900 dark:text-white">{{ diodeCount }}</p>
              </div>
            </div>

            <!-- Formulas -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Key Formulas:</h4>
              <div class="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <p><strong>Peak Output:</strong> V<sub>p(out)</sub> = V<sub>p(in)</sub> - V<sub>d</sub></p>
                <p v-if="rectifierType === 'half'"><strong>DC Output:</strong> V<sub>dc</sub> = V<sub>p(out)</sub> / π ≈ 0.318 × V<sub>p(out)</sub></p>
                <p v-else><strong>DC Output:</strong> V<sub>dc</sub> = 2 × V<sub>p(out)</sub> / π ≈ 0.637 × V<sub>p(out)</sub></p>
                <p v-if="rectifierType === 'half'"><strong>Ripple Factor:</strong> r = 1.21 (121%)</p>
                <p v-else><strong>Ripple Factor:</strong> r = 0.48 (48%)</p>
                <p><strong>Output Power:</strong> P<sub>out</sub> = V<sub>dc</sub> × I<sub>dc</sub></p>
              </div>
            </div>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Learn About Rectifiers</h3>
            
            <div class="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">What is a Rectifier?</h4>
                <p class="text-sm">
                  A rectifier is an electrical device that converts alternating current (AC) to direct current (DC). This process is called rectification. Diodes are used as rectifying elements because they allow current to flow in only one direction.
                </p>
              </div>

              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Types of Rectifiers</h4>
                <ul class="text-sm space-y-2 list-disc list-inside">
                  <li>
                    <strong>Half-Wave Rectifier:</strong> Uses one diode. Conducts during positive half-cycles only. 
                    Simple but inefficient (40.6% efficiency). High ripple factor.
                  </li>
                  <li>
                    <strong>Full-Wave Center-Tap:</strong> Uses two diodes and a center-tapped transformer. 
                    Both half-cycles are used. Better efficiency (81.2%). Lower ripple.
                  </li>
                  <li>
                    <strong>Full-Wave Bridge:</strong> Uses four diodes in a bridge configuration. 
                    No center tap needed. Most common in practical applications. Same efficiency as center-tap.
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Key Parameters</h4>
                <ul class="text-sm space-y-1 list-disc list-inside">
                  <li><strong>Peak Inverse Voltage (PIV):</strong> Maximum voltage a diode must withstand in reverse bias</li>
                  <li><strong>Ripple Factor:</strong> Ratio of AC component to DC component (lower is better)</li>
                  <li><strong>Efficiency:</strong> Ratio of DC output power to AC input power</li>
                  <li><strong>Transformer Utilization Factor (TUF):</strong> How effectively the transformer is used</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-2">Applications</h4>
                <p class="text-sm">
                  Rectifiers are used in power supplies for electronic devices, battery charging systems, DC motor drives, welding equipment, and many other applications where DC power is needed from an AC source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const rectifierType = ref<'half' | 'full-center' | 'full-bridge'>('half')
const vp = ref(12)        // Peak voltage in volts
const frequency = ref(50)  // Frequency in Hz
const loadResistance = ref(100)  // Load resistance in ohms
const diodeDrop = ref(0.7)  // Diode voltage drop in volts

// Computed properties
const rectifierTypeTitle = computed(() => {
  switch (rectifierType.value) {
    case 'half': return 'Half-Wave Rectifier'
    case 'full-center': return 'Full-Wave Center-Tap Rectifier'
    case 'full-bridge': return 'Full-Wave Bridge Rectifier'
    default: return 'Rectifier'
  }
})

const vPeakOut = computed(() => {
  const drop = rectifierType.value === 'half' ? diodeDrop.value : 
               rectifierType.value === 'full-center' ? diodeDrop.value : 
               2 * diodeDrop.value
  return Math.max(0, vp.value - drop).toFixed(2)
})

const vdc = computed(() => {
  const vpo = parseFloat(vPeakOut.value)
  if (rectifierType.value === 'half') {
    return (vpo / Math.PI).toFixed(2)
  } else {
    return (2 * vpo / Math.PI).toFixed(2)
  }
})

const vrms = computed(() => {
  const vpo = parseFloat(vPeakOut.value)
  if (rectifierType.value === 'half') {
    return (vpo / 2).toFixed(2)
  } else {
    return (vpo / Math.sqrt(2)).toFixed(2)
  }
})

const rippleFactor = computed(() => {
  if (rectifierType.value === 'half') {
    return '1.21'
  } else {
    return '0.48'
  }
})

const idc = computed(() => {
  const v = parseFloat(vdc.value)
  return ((v / loadResistance.value) * 1000).toFixed(1)
})

const power = computed(() => {
  const v = parseFloat(vdc.value)
  const i = parseFloat(idc.value) / 1000
  return (v * i * 1000).toFixed(1)
})

const efficiency = computed(() => {
  if (rectifierType.value === 'half') {
    return '40.6'
  } else {
    return '81.2'
  }
})

const diodeCount = computed(() => {
  if (rectifierType.value === 'half') return 1
  if (rectifierType.value === 'full-center') return 2
  return 4
})

// Generate sine wave path
const generateSineWave = (centerX: number, centerY: number, amplitude: number, cycles: number) => {
  let path = `M 0 ${centerY}`
  const points = 300
  
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * 300
    const angle = (i / points) * Math.PI * 2 * cycles
    const y = centerY + amplitude * Math.sin(angle)
    path += ` L ${x} ${y}`
  }
  
  return path
}

// Generate output waveform based on rectifier type
const generateOutputWave = (centerX: number, centerY: number, amplitude: number, cycles: number) => {
  let path = `M 0 ${centerY}`
  const points = 300
  
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * 300
    const angle = (i / points) * Math.PI * 2 * cycles
    let y = centerY
    
    if (rectifierType.value === 'half') {
      // Half-wave: Only positive cycles
      y = centerY + amplitude * Math.sin(angle)
      if (y < centerY) y = centerY
    } else {
      // Full-wave: Absolute value
      y = centerY + amplitude * Math.abs(Math.sin(angle))
    }
    
    path += ` L ${x} ${y}`
  }
  
  return path
}

// Presets
const applyPreset = (preset: string) => {
  switch (preset) {
    case '12v':
      vp.value = 17
      frequency.value = 50
      loadResistance.value = 100
      break
    case '24v':
      vp.value = 34
      frequency.value = 50
      loadResistance.value = 240
      break
    case '5v':
      vp.value = 7
      frequency.value = 50
      loadResistance.value = 50
      break
    case '120v':
      vp.value = 170
      frequency.value = 60
      loadResistance.value = 1000
      break
  }
}

// SEO
useHead({
  title: 'Diode Rectifier Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive diode rectifier simulation. Learn about half-wave and full-wave rectification, AC to DC conversion.' }
  ]
})
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #7986CB;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #7986CB;
}
</style>

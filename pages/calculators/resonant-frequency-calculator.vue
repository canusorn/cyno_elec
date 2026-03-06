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
            Resonant Frequency Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate resonant frequency and analyze RLC circuit behavior for series and parallel configurations
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Resonant Frequency:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">f₀</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">1</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">(2π√LC)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Circuit Configuration -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Circuit Configuration</h3>
              
              <div class="space-y-4">
                <!-- Circuit Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Circuit Type</label>
                  <select v-model="circuitType" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                    <option value="series">Series RLC</option>
                    <option value="parallel">Parallel RLC (Ideal)</option>
                    <option value="parallel-real">Parallel RLC (Real)</option>
                  </select>
                </div>

                <!-- Calculation Mode -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Mode</label>
                  <select v-model="calculationMode" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                    <option value="frequency">Find Frequency (from L, C)</option>
                    <option value="inductance">Find Inductance (from f, C)</option>
                    <option value="capacitance">Find Capacitance (from f, L)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Component Values -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Component Values</h3>
              
              <div class="space-y-4">
                <!-- Inductance -->
                <div v-if="calculationMode !== 'inductance'">
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Inductance (L)</span>
                    <span class="text-primary-highlight">{{ formatInductance(inductance) }}</span>
                  </label>
                  <input type="range" v-model.number="inductance" min="1" max="10000" step="1" class="w-full">
                  <div class="flex gap-2 mt-2">
                    <button @click="setInductance(10)" class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">10µH</button>
                    <button @click="setInductance(100)" class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">100µH</button>
                    <button @click="setInductance(1000)" class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">1mH</button>
                    <button @click="setInductance(10000)" class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">10mH</button>
                  </div>
                </div>

                <!-- Capacitance -->
                <div v-if="calculationMode !== 'capacitance'">
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Capacitance (C)</span>
                    <span class="text-primary-highlight">{{ formatCapacitance(capacitance) }}</span>
                  </label>
                  <input type="range" v-model.number="capacitance" min="1" max="100000" step="1" class="w-full">
                  <div class="flex gap-2 mt-2 flex-wrap">
                    <button @click="setCapacitance(10)" class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">10pF</button>
                    <button @click="setCapacitance(100)" class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">100pF</button>
                    <button @click="setCapacitance(1000)" class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">1nF</button>
                    <button @click="setCapacitance(10000)" class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">10nF</button>
                    <button @click="setCapacitance(100000)" class="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">100nF</button>
                  </div>
                </div>

                <!-- Target Frequency (for reverse calculation) -->
                <div v-if="calculationMode !== 'frequency'">
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Target Frequency</span>
                    <span class="text-primary-highlight">{{ formatFrequency(targetFrequency) }}</span>
                  </label>
                  <input type="range" v-model.number="targetFrequency" min="1" max="10000000" step="1" class="w-full">
                </div>

                <!-- Resistance -->
                <div>
                  <label class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <span>Resistance (R)</span>
                    <span class="text-primary-highlight">{{ formatResistance(resistance) }}</span>
                  </label>
                  <input type="range" v-model.number="resistance" min="1" max="10000" step="1" class="w-full">
                  <div class="flex gap-2 mt-2">
                    <button @click="setResistance(10)" class="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">10Ω</button>
                    <button @click="setResistance(100)" class="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">100Ω</button>
                    <button @click="setResistance(1000)" class="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">1kΩ</button>
                    <button @click="setResistance(10000)" class="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">10kΩ</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📻 Quick Presets</h3>
              <div class="grid grid-cols-2 gap-2">
                <button @click="loadPreset('am-radio')" class="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all text-sm font-medium">
                  AM Radio
                </button>
                <button @click="loadPreset('fm-radio')" class="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm font-medium">
                  FM Radio
                </button>
                <button @click="loadPreset('wifi')" class="px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all text-sm font-medium">
                  Wi-Fi 2.4GHz
                </button>
                <button @click="loadPreset('power-supply')" class="px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all text-sm font-medium">
                  Power Supply
                </button>
                <button @click="loadPreset('audio')" class="px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all text-sm font-medium">
                  Audio Filter
                </button>
                <button @click="loadPreset('rf-tuner')" class="px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all text-sm font-medium">
                  RF Tuner
                </button>
              </div>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Main Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Calculation Results</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Resonant Frequency -->
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Resonant Frequency (f₀)</div>
                  <div class="text-4xl font-bold text-primary-highlight mb-2">
                    {{ formatFrequency(resonantFrequency) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Period: {{ formatPeriod(period) }}
                  </div>
                </div>

                <!-- Angular Frequency -->
                <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Angular Frequency (ω₀)</div>
                  <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {{ angularFrequency.toFixed(2) }} rad/s
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    ω₀ = 2πf₀
                  </div>
                </div>

                <!-- Bandwidth -->
                <div class="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Bandwidth (BW)</div>
                  <div class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {{ formatFrequency(bandwidth) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Between -3dB points
                  </div>
                </div>

                <!-- Quality Factor -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Quality Factor (Q)</div>
                  <div class="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                    {{ qualityFactor.toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    {{ qualityFactorDescription }}
                  </div>
                </div>
              </div>

              <!-- Additional Parameters -->
              <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Inductive Reactance (XL)</div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {{ formatResistance(reactiveXL) }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Capacitive Reactance (XC)</div>
                  <div class="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {{ formatResistance(reactiveXC) }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Impedance at Resonance</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">
                    {{ formatResistance(impedanceAtResonance) }}
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Cutoff Frequencies</div>
                  <div class="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {{ formatFrequency(lowerCutoff) }} - {{ formatFrequency(upperCutoff) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Frequency Response Preview -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Frequency Response Preview</h3>
              <canvas ref="responseCanvas" width="800" height="300" class="w-full bg-gray-900 rounded-lg"></canvas>
            </div>

            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Circuit Diagram</h3>
              <svg viewBox="0 0 600 250" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Series RLC -->
                <g v-if="circuitType === 'series'">
                  <!-- Voltage source -->
                  <circle cx="80" cy="125" r="20" fill="white" stroke="#EF4444" stroke-width="2"/>
                  <text x="80" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">AC</text>
                  
                  <!-- R -->
                  <rect x="130" y="115" width="40" height="20" fill="white" stroke="#10B981" stroke-width="2"/>
                  <text x="150" y="110" text-anchor="middle" font-size="10" fill="#10B981">R</text>
                  <text x="150" y="150" text-anchor="middle" font-size="9" fill="#10B981">{{ formatResistance(resistance) }}</text>
                  
                  <!-- L -->
                  <line x1="200" y1="125" x2="210" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <path d="M 210 115 Q 220 105 230 115 Q 240 125 250 115 Q 260 105 270 115 Q 280 125 290 115" 
                        fill="none" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="290" y1="115" x2="290" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <text x="250" y="100" text-anchor="middle" font-size="10" fill="#3B82F6">L</text>
                  <text x="250" y="145" text-anchor="middle" font-size="9" fill="#3B82F6">{{ formatInductance(inductance) }}</text>
                  
                  <!-- C -->
                  <line x1="320" y1="125" x2="340" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <line x1="340" y1="110" x2="340" y2="140" stroke="#8B5CF6" stroke-width="2"/>
                  <line x1="350" y1="110" x2="350" y2="140" stroke="#8B5CF6" stroke-width="2"/>
                  <line x1="350" y1="125" x2="370" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <text x="345" y="100" text-anchor="middle" font-size="10" fill="#8B5CF6">C</text>
                  <text x="345" y="155" text-anchor="middle" font-size="9" fill="#8B5CF6">{{ formatCapacitance(capacitance) }}</text>
                  
                  <!-- Connection lines -->
                  <line x1="100" y1="125" x2="130" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <line x1="170" y1="125" x2="200" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <line x1="290" y1="125" x2="320" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <line x1="370" y1="125" x2="420" y2="125" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Return path -->
                  <line x1="420" y1="125" x2="420" y2="180" stroke="#6B7280" stroke-width="2"/>
                  <line x1="420" y1="180" x2="80" y2="180" stroke="#6B7280" stroke-width="2"/>
                  <line x1="80" y1="180" x2="80" y2="145" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Ground -->
                  <g transform="translate(250, 180)">
                    <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-15" y1="15" x2="15" y2="15" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-10" y1="20" x2="10" y2="20" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-5" y1="25" x2="5" y2="25" stroke="#6B7280" stroke-width="2"/>
                  </g>
                </g>

                <!-- Parallel RLC -->
                <g v-else>
                  <!-- Voltage source -->
                  <circle cx="80" cy="125" r="20" fill="white" stroke="#EF4444" stroke-width="2"/>
                  <text x="80" y="130" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">AC</text>
                  
                  <line x1="100" y1="125" x2="150" y2="125" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Top rail -->
                  <line x1="150" y1="125" x2="500" y2="125" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- R branch -->
                  <line x1="200" y1="125" x2="200" y2="90" stroke="#6B7280" stroke-width="2"/>
                  <rect x="185" y="70" width="30" height="20" fill="white" stroke="#10B981" stroke-width="2"/>
                  <line x1="200" y1="70" x2="200" y2="50" stroke="#6B7280" stroke-width="2"/>
                  <text x="210" y="85" font-size="10" fill="#10B981">R</text>
                  
                  <!-- L branch -->
                  <line x1="300" y1="125" x2="300" y2="90" stroke="#6B7280" stroke-width="2"/>
                  <path d="M 290 80 Q 300 70 310 80 Q 320 90 330 80 Q 340 70 350 80 Q 360 90 370 80" 
                        fill="none" stroke="#3B82F6" stroke-width="2" transform="translate(0, -10)"/>
                  <line x1="300" y1="50" x2="300" y2="60" stroke="#6B7280" stroke-width="2"/>
                  <text x="300" y="45" text-anchor="middle" font-size="10" fill="#3B82F6">L</text>
                  
                  <!-- C branch -->
                  <line x1="400" y1="125" x2="400" y2="90" stroke="#6B7280" stroke-width="2"/>
                  <line x1="390" y1="90" x2="390" y2="60" stroke="#8B5CF6" stroke-width="2"/>
                  <line x1="410" y1="90" x2="410" y2="60" stroke="#8B5CF6" stroke-width="2"/>
                  <line x1="400" y1="60" x2="400" y2="50" stroke="#6B7280" stroke-width="2"/>
                  <text x="410" y="80" font-size="10" fill="#8B5CF6">C</text>
                  
                  <!-- Bottom rail -->
                  <line x1="150" y1="50" x2="500" y2="50" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Vertical connections -->
                  <line x1="150" y1="50" x2="150" y2="125" stroke="#6B7280" stroke-width="2"/>
                  <line x1="500" y1="50" x2="500" y2="125" stroke="#6B7280" stroke-width="2"/>
                  
                  <!-- Ground -->
                  <g transform="translate(325, 50)">
                    <line x1="0" y1="0" x2="0" y2="15" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-15" y1="15" x2="15" y2="15" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-10" y1="20" x2="10" y2="20" stroke="#6B7280" stroke-width="2"/>
                    <line x1="-5" y1="25" x2="5" y2="25" stroke="#6B7280" stroke-width="2"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding RLC Resonance</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">🎯 What is Resonance?</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Resonance occurs when the inductive reactance (XL) equals the capacitive reactance (XC). At this frequency:
              </p>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li><strong>Series RLC:</strong> Impedance is minimum (= R), current is maximum</li>
                <li><strong>Parallel RLC:</strong> Impedance is maximum, current is minimum</li>
                <li><strong>XL = XC:</strong> Reactive components cancel out</li>
                <li><strong>Phase shift:</strong> Zero (voltage and current in phase)</li>
                <li><strong>Energy:</strong> Oscillates between L and C magnetic/electric fields</li>
              </ul>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">🔧 Key Formulas</h3>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                <p class="text-gray-800 dark:text-gray-200">Resonant Frequency: f₀ = 1/(2π√LC)</p>
                <p class="text-gray-800 dark:text-gray-200">Angular Frequency: ω₀ = 1/√LC</p>
                <p class="text-gray-800 dark:text-gray-200">Inductive Reactance: XL = 2πfL</p>
                <p class="text-gray-800 dark:text-gray-200">Capacitive Reactance: XC = 1/(2πfC)</p>
                <p class="text-gray-800 dark:text-gray-200">Series Q Factor: Q = ω₀L/R</p>
                <p class="text-gray-800 dark:text-gray-200">Parallel Q Factor: Q = R/(ω₀L)</p>
                <p class="text-gray-800 dark:text-gray-200">Bandwidth: BW = f₀/Q</p>
                <p class="text-gray-800 dark:text-gray-200">Lower Cutoff: f₁ = f₀ × √(1 + 1/(4Q²)) - 1/(2Q)</p>
                <p class="text-gray-800 dark:text-gray-200">Upper Cutoff: f₂ = f₀ × √(1 + 1/(4Q²)) + 1/(2Q)</p>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">📊 Series vs Parallel RLC</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-gray-600 dark:text-gray-400">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th class="p-3 text-left">Characteristic</th>
                      <th class="p-3 text-left">Series RLC</th>
                      <th class="p-3 text-left">Parallel RLC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Impedance at Resonance</td>
                      <td class="p-3 text-green-600">Minimum (R)</td>
                      <td class="p-3 text-blue-600">Maximum (R)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Current at Resonance</td>
                      <td class="p-3 text-green-600">Maximum</td>
                      <td class="p-3 text-blue-600">Minimum</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Q Factor</td>
                      <td class="p-3">Q = ω₀L/R</td>
                      <td class="p-3">Q = R/(ω₀L)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Bandwidth</td>
                      <td class="p-3">BW = R/L</td>
                      <td class="p-3">BW = 1/(RC)</td>
                    </tr>
                    <tr class="border-b dark:border-gray-700">
                      <td class="p-3">Applications</td>
                      <td class="p-3 text-green-600">Bandpass filters, tuning circuits</td>
                      <td class="p-3 text-blue-600">Bandstop filters, tank circuits</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">💡 Applications</h3>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Radio Tuning:</strong> Select specific frequencies (AM/FM radio)</li>
                <li><strong>Bandpass Filters:</strong> Allow a range of frequencies to pass</li>
                <li><strong>Bandstop Filters:</strong> Reject specific frequencies (notch filters)</li>
                <li><strong>Oscillators:</strong> Generate sine waves at precise frequencies</li>
                <li><strong>Impedance Matching:</strong> Match source/load for maximum power transfer</li>
                <li><strong>Power Supplies:</strong> Filter ripple from rectified AC</li>
                <li><strong>Wireless Communication:</strong> RF circuits, antennas, transmitters/receivers</li>
                <li><strong>Audio Systems:</strong> Crossover networks, equalizers</li>
              </ul>

              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 mt-6">⚠️ Design Considerations</h3>
              <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>High Q:</strong> Narrow bandwidth, sharp filtering (good for tuning)</li>
                <li><strong>Low Q:</strong> Wide bandwidth, gentle filtering (good for audio)</li>
                <li><strong>Component Tolerance:</strong> Affects resonant frequency accuracy</li>
                <li><strong>Parasitic Effects:</strong> Stray inductance/capacitance can shift resonance</li>
                <li><strong>Temperature:</strong> Component values change with temperature</li>
                <li><strong>Series vs Parallel:</strong> Choose based on desired impedance characteristic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Cyno Electric - Resonant Frequency Calculator</p>
        <p class="mt-2 text-sm">Interactive electrical theory education platform</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'

const colorMode = ref('light')

// Circuit configuration
const circuitType = ref<'series' | 'parallel' | 'parallel-real'>('series')
const calculationMode = ref<'frequency' | 'inductance' | 'capacitance'>('frequency')

// Component values (in base units)
const inductance = ref(1000)    // in microhenries (µH)
const capacitance = ref(100)    // in picofarads (pF)
const resistance = ref(100)     // in ohms (Ω)
const targetFrequency = ref(1000) // in kHz

// Canvas ref
const responseCanvas = ref<HTMLCanvasElement | null>(null)

// Helper functions for formatting
const formatInductance = (value: number): string => {
  if (value < 1000) return `${value}µH`
  if (value < 1000000) return `${(value/1000).toFixed(2)}mH`
  return `${(value/1000000).toFixed(2)}H`
}

const formatCapacitance = (value: number): string => {
  if (value < 1000000) return `${value}pF`
  if (value < 1000000000) return `${(value/1000).toFixed(2)}nF`
  return `${(value/1000000).toFixed(2)}µF`
}

const formatResistance = (value: number): string => {
  if (value < 1000) return `${value.toFixed(1)}Ω`
  if (value < 1000000) return `${(value/1000).toFixed(2)}kΩ`
  return `${(value/1000000).toFixed(2)}MΩ`
}

const formatFrequency = (value: number): string => {
  if (value < 1000) return `${value.toFixed(2)}Hz`
  if (value < 1000000) return `${(value/1000).toFixed(2)}kHz`
  return `${(value/1000000).toFixed(2)}MHz`
}

const formatPeriod = (value: number): string => {
  if (value >= 1) return `${value.toFixed(2)}s`
  if (value >= 0.001) return `${(value*1000).toFixed(2)}ms`
  return `${(value*1000000).toFixed(2)}µs`
}

// Setter functions
const setInductance = (value: number) => inductance.value = value
const setCapacitance = (value: number) => capacitance.value = value
const setResistance = (value: number) => resistance.value = value

// Calculated values
const resonantFrequency = computed(() => {
  const L = inductance.value * 1e-6  // Convert µH to H
  const C = capacitance.value * 1e-12 // Convert pF to F
  
  if (calculationMode.value === 'frequency') {
    return 1 / (2 * Math.PI * Math.sqrt(L * C))
  } else if (calculationMode.value === 'inductance') {
    const f = targetFrequency.value * 1000 // Convert kHz to Hz
    const C_fixed = capacitance.value * 1e-12
    const L_new = 1 / (4 * Math.PI * Math.PI * f * f * C_fixed)
    inductance.value = Math.round(L_new * 1e6) // Store in µH
    return f
  } else {
    const f = targetFrequency.value * 1000
    const L_fixed = inductance.value * 1e-6
    const C_new = 1 / (4 * Math.PI * Math.PI * f * f * L_fixed)
    capacitance.value = Math.round(C_new * 1e12) // Store in pF
    return f
  }
})

const angularFrequency = computed(() => {
  return 2 * Math.PI * resonantFrequency.value
})

const period = computed(() => {
  return 1 / resonantFrequency.value
})

const reactiveXL = computed(() => {
  return angularFrequency.value * (inductance.value * 1e-6)
})

const reactiveXC = computed(() => {
  return 1 / (angularFrequency.value * (capacitance.value * 1e-12))
})

const qualityFactor = computed(() => {
  if (circuitType.value === 'series') {
    return reactiveXL.value / resistance.value
  } else {
    return resistance.value / reactiveXL.value
  }
})

const qualityFactorDescription = computed(() => {
  const q = qualityFactor.value
  if (q < 1) return 'Very Low (Wide BW)'
  if (q < 5) return 'Low (Wide BW)'
  if (q < 10) return 'Medium'
  if (q < 50) return 'High (Narrow BW)'
  return 'Very High (Very Narrow BW)'
})

const bandwidth = computed(() => {
  return resonantFrequency.value / qualityFactor.value
})

const lowerCutoff = computed(() => {
  const Q = qualityFactor.value
  const f0 = resonantFrequency.value
  return f0 * Math.sqrt(1 + 1/(4*Q*Q)) - f0/(2*Q)
})

const upperCutoff = computed(() => {
  const Q = qualityFactor.value
  const f0 = resonantFrequency.value
  return f0 * Math.sqrt(1 + 1/(4*Q*Q)) + f0/(2*Q)
})

const impedanceAtResonance = computed(() => {
  if (circuitType.value === 'series') {
    return resistance.value
  } else {
    return resistance.value
  }
})

// Presets
const loadPreset = (preset: string) => {
  switch(preset) {
    case 'am-radio':
      // AM Radio: 530-1700 kHz, using ~1mH and ~100pF
      inductance.value = 1000 // 1mH
      capacitance.value = 100  // 100pF
      resistance.value = 50
      circuitType.value = 'series'
      break
    case 'fm-radio':
      // FM Radio: 88-108 MHz, using ~100nH and ~10pF
      inductance.value = 100   // 100µH
      capacitance.value = 10   // 10pF
      resistance.value = 50
      circuitType.value = 'series'
      break
    case 'wifi':
      // Wi-Fi 2.4GHz: using small L and C
      inductance.value = 10    // 10µH
      capacitance.value = 1    // 1pF
      resistance.value = 50
      circuitType.value = 'series'
      break
    case 'power-supply':
      // Power supply filter: 100Hz ripple, ~10mH and ~100µF
      inductance.value = 10000 // 10mH
      capacitance.value = 100000 // 100nF
      resistance.value = 100
      circuitType.value = 'series'
      break
    case 'audio':
      // Audio filter: ~1kHz
      inductance.value = 1000  // 1mH
      capacitance.value = 25000 // 25nF
      resistance.value = 1000
      circuitType.value = 'series'
      break
    case 'rf-tuner':
      // RF Tuner: ~1MHz
      inductance.value = 200   // 200µH
      capacitance.value = 100  // 100pF
      resistance.value = 100
      circuitType.value = 'series'
      break
  }
}

// Draw frequency response
const drawFrequencyResponse = () => {
  const canvas = responseCanvas.value
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
  
  // Calculate frequency response curve
  const f0 = resonantFrequency.value
  const Q = qualityFactor.value
  const span = 5 // Show 5 decades
  
  ctx.strokeStyle = circuitType.value === 'series' ? '#10B981' : '#3B82F6'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  for (let i = 0; i <= 500; i++) {
    const f = f0 * Math.pow(10, (i / 500 - 0.5) * span)
    
    let response: number
    const ratio = f / f0
    
    if (circuitType.value === 'series') {
      // Series RLC: current response (normalized)
      const z = Math.sqrt(resistance.value * resistance.value + Math.pow(ratio * reactiveXL.value - reactiveXC.value / ratio, 2))
      response = resistance.value / z
    } else {
      // Parallel RLC: impedance response (normalized)
      const xl = ratio * reactiveXL.value
      const xc = reactiveXC.value / ratio
      const z = Math.abs(1 / Math.sqrt(Math.pow(1/resistance.value, 2) + Math.pow(1/xc - 1/xl, 2)))
      response = z / resistance.value
    }
    
    // Convert to dB
    const responseDb = 20 * Math.log10(response)
    
    const x = (i / 500) * width
    const y = height / 2 - (responseDb / 40) * (height / 2 - 20)
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Mark resonant frequency
  const centerX = width / 2
  ctx.strokeStyle = '#F59E0B'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(centerX, 0)
  ctx.lineTo(centerX, height)
  ctx.stroke()
  ctx.setLineDash([])
  
  // -3dB markers
  ctx.strokeStyle = '#EF4444'
  ctx.setLineDash([5, 5])
  
  const f1Ratio = lowerCutoff.value / f0
  const f2Ratio = upperCutoff.value / f0
  
  const x1 = (Math.log10(f1Ratio) / span + 0.5) * width
  const x2 = (Math.log10(f2Ratio) / span + 0.5) * width
  
  ctx.beginPath()
  ctx.moveTo(x1, 0)
  ctx.lineTo(x1, height)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(x2, 0)
  ctx.lineTo(x2, height)
  ctx.stroke()
  
  ctx.setLineDash([])
  
  // Labels
  ctx.font = '12px sans-serif'
  ctx.fillStyle = '#F59E0B'
  ctx.textAlign = 'center'
  ctx.fillText('f₀ (Resonance)', centerX + 50, 20)
  
  ctx.fillStyle = '#EF4444'
  ctx.textAlign = 'right'
  ctx.fillText(`f₁ (${formatFrequency(lowerCutoff)})`, x1 - 10, height - 10)
  ctx.textAlign = 'left'
  ctx.fillText(`f₂ (${formatFrequency(upperCutoff)})`, x2 + 10, height - 10)
  
  // Legend
  ctx.fillStyle = '#10B981'
  ctx.textAlign = 'left'
  ctx.fillText('Response (dB)', 20, 20)
}

// Watch for changes and redraw
watch([circuitType, inductance, capacitance, resistance, calculationMode, targetFrequency], () => {
  drawFrequencyResponse()
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    colorMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  // Initial draw
  setTimeout(() => {
    drawFrequencyResponse()
  }, 100)
})
</script>

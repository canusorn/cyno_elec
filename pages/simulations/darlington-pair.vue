<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔄 Darlington Pair Circuit
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore high-gain transistor cascading with interactive Darlington pair simulation
          </p>
          
          <!-- Darlington Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold">
              <span class="text-primary">βtotal</span>
              <span class="text-gray-400"> = </span>
              <span class="text-primary">β1</span>
              <span class="text-gray-400"> × </span>
              <span class="text-primary">β2</span>
              <span class="text-gray-400"> ≈ </span>
              <span class="text-primary">{{ totalGain.toFixed(0) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Base Resistor -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Resistor (Rb)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="baseResistor"
                    type="number" 
                    step="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">kΩ</span>
                </div>
                <input 
                  v-model.number="baseResistor"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Input Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Input Voltage (Vin)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="inputVoltage"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="inputVoltage"
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Supply Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Supply Voltage (Vcc)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="supplyVoltage"
                    type="number" 
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="supplyVoltage"
                  type="range"
                  min="5"
                  max="24"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Load Resistor -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Resistor (Rl)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="loadResistor"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="loadResistor"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Transistor Gains -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Q1 Current Gain (β1)
                </label>
                <div class="flex items-center gap-4">
                  <input 
                    v-model.number="beta1"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-8">hFE</span>
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Q2 Current Gain (β2)
                </label>
                <div class="flex items-center gap-4">
                  <input 
                    v-model.number="beta2"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-8">hFE</span>
                </div>
              </div>

              <!-- Control Buttons -->
              <div class="space-y-3">
                <button 
                  @click="toggleSimulation"
                  :class="isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                  class="w-full px-4 py-3 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg v-if="!isRunning" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ isRunning ? 'Stop' : 'Start Simulation' }}
                </button>
                <button 
                  @click="resetSimulation"
                  class="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>

              <!-- Total Gain Display -->
              <div class="mt-6 bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Total Current Gain</h4>
                <div class="text-3xl font-bold text-primary mb-1">
                  βtotal ≈ {{ totalGain.toFixed(0) }}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  β1 × β2 = {{ beta1 }} × {{ beta2 }}
                </p>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Darlington Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Darlington Pair Circuit
              </h3>
              <svg viewBox="0 0 700 400" class="w-full h-auto">
                <!-- Background Grid -->
                <defs>
                  <pattern id="darlinggrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-10"/>
                  </pattern>
                </defs>
                <rect width="700" height="400" fill="url(#darlinggrid)" />
                
                <!-- VCC Rail -->
                <line x1="50" y1="40" x2="650" y2="40" :stroke="isPowered ? '#EF4444' : '#94A3B8'" stroke-width="4" class="transition-all duration-300"/>
                <text x="660" y="45" font-size="16" font-weight="bold" :fill="isPowered ? '#EF4444' : '#94A3B8'" class="transition-all duration-300">Vcc ({{ supplyVoltage }}V)</text>
                
                <!-- GND Rail -->
                <line x1="50" y1="360" x2="650" y2="360" :stroke="isPowered ? '#22C55E' : '#94A3B8'" stroke-width="4" class="transition-all duration-300"/>
                <text x="660" y="365" font-size="16" font-weight="bold" :fill="isPowered ? '#22C55E' : '#94A3B8'" class="transition-all duration-300">GND</text>
                
                <!-- Input Section -->
                <g transform="translate(80, 150)">
                  <circle cx="40" cy="0" r="25" fill="white" :stroke="inputVoltage > 0 ? '#3B82F6' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                  <text x="40" y="5" text-anchor="middle" font-size="12" font-weight="bold" :fill="inputVoltage > 0 ? '#3B82F6' : '#94A3B8'" class="transition-all duration-300">Vin</text>
                  <text x="40" y="40" text-anchor="middle" font-size="11" fill="#666">{{ inputVoltage }}V</text>
                  
                  <!-- Base resistor Rb -->
                  <rect x="80" y="-10" width="60" height="20" fill="white" :stroke="isPowered ? '#9FA8DA' : '#94A3B8'" stroke-width="2" class="transition-all duration-300"/>
                  <text x="110" y="5" text-anchor="middle" font-size="10" font-weight="bold" fill="#666">Rb</text>
                  <text x="110" y="25" text-anchor="middle" font-size="9" fill="#666">{{ baseResistor }}kΩ</text>
                </g>
                
                <!-- Q1 - First Transistor -->
                <g transform="translate(250, 150)">
                  <!-- Q1 Circle -->
                  <circle cx="0" cy="0" r="35" fill="white" :stroke="q1Active ? '#22C55E' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                  
                  <!-- Q1 NPN Symbol -->
                  <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#333" stroke-width="3"/> <!-- Base -->
                  <line x1="-10" y1="-8" x2="10" y2="-20" stroke="#333" stroke-width="3"/> <!-- Collector -->
                  <line x1="-10" y1="8" x2="10" y2="20" stroke="#333" stroke-width="3"/> <!-- Emitter -->
                  <polygon points="5, -18 10, -20 10, -12" fill="#333"/> <!-- Collector arrow -->
                  <polygon points="5, 18 10, 20 10, 12" fill="#333"/> <!-- Emitter arrow -->
                  
                  <!-- Q1 Labels -->
                  <text x="0" y="-45" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Q1</text>
                  <text x="0" y="50" text-anchor="middle" font-size="11" fill="#666">β1 = {{ beta1 }}</text>
                  
                  <!-- Q1 Current indicator -->
                  <g v-if="q1Active && isRunning">
                    <circle cx="0" cy="0" r="5" fill="#22C55E">
                      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </g>
                
                <!-- Connection Q1 to Q2 -->
                <path d="M 260 170 L 260 220 L 360 220 L 360 170" 
                  :stroke="q1Active ? '#EAB308' : '#94A3B8'" stroke-width="3" fill="none" class="transition-all duration-300"/>
                <text x="310" y="240" text-anchor="middle" font-size="10" fill="#666">Direct Connection</text>
                
                <!-- Q2 - Second Transistor -->
                <g transform="translate(430, 150)">
                  <!-- Q2 Circle -->
                  <circle cx="0" cy="0" r="35" fill="white" :stroke="q2Active ? '#22C55E' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                  
                  <!-- Q2 NPN Symbol -->
                  <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#333" stroke-width="3"/> <!-- Base -->
                  <line x1="-10" y1="-8" x2="10" y2="-20" stroke="#333" stroke-width="3"/> <!-- Collector -->
                  <line x1="-10" y1="8" x2="10" y2="20" stroke="#333" stroke-width="3"/> <!-- Emitter -->
                  <polygon points="5, -18 10, -20 10, -12" fill="#333"/> <!-- Collector arrow -->
                  <polygon points="5, 18 10, 20 10, 12" fill="#333"/> <!-- Emitter arrow -->
                  
                  <!-- Q2 Labels -->
                  <text x="0" y="-45" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">Q2</text>
                  <text x="0" y="50" text-anchor="middle" font-size="11" fill="#666">β2 = {{ beta2 }}</text>
                  
                  <!-- Q2 Current indicator -->
                  <g v-if="q2Active && isRunning">
                    <circle cx="0" cy="0" r="5" fill="#22C55E">
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </g>
                
                <!-- Load Resistor -->
                <g transform="translate(540, 80)">
                  <rect x="-10" y="0" width="20" height="70" fill="white" :stroke="isPowered ? '#9FA8DA' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                  <polyline points="-5,10 0,20 5,10 0,30 -5,20 0,40 5,30 0,50 -5,40 0,60 5,50" 
                    fill="none" :stroke="isPowered ? '#9FA8DA' : '#94A3B8'" stroke-width="2" class="transition-all duration-300"/>
                  <text x="25" y="35" font-size="11" font-weight="bold" fill="#666">Rl</text>
                  <text x="25" y="50" font-size="10" fill="#666">{{ loadResistor }}Ω</text>
                </g>
                
                <!-- Wire connections -->
                <!-- VCC to Load -->
                <line x1="540" y1="40" x2="540" y2="80" :stroke="isPowered ? '#EF4444' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                
                <!-- Load to Q2 Collector -->
                <line x1="540" y1="150" x2="540" y2="130" :stroke="q2Active ? '#EAB308' : '#94A3B8'" stroke-width="3" fill="none" class="transition-all duration-300"/>
                <line x1="540" y1="130" x2="440" y2="130" :stroke="q2Active ? '#EAB308' : '#94A3B8'" stroke-width="3" fill="none" class="transition-all duration-300"/>
                <line x1="440" y1="130" x2="440" y2="130" :stroke="q2Active ? '#EAB308' : '#94A3B8'" stroke-width="3" fill="none" class="transition-all duration-300"/>
                
                <!-- Q2 Emitter to GND -->
                <line x1="440" y1="170" x2="440" y2="360" :stroke="q2Active ? '#22C55E' : '#94A3B8'" stroke-width="3" class="transition-all duration-300"/>
                
                <!-- Current flow animations -->
                <g v-if="isRunning && q2Active">
                  <!-- Load current -->
                  <circle r="4" fill="#F59E0B">
                    <animateMotion dur="2s" repeatCount="indefinite">
                      <mpath href="#loadPath"/>
                    </animateMotion>
                  </circle>
                </g>
                
                <path id="loadPath" d="M 540 40 L 540 80 L 540 130 L 440 130 L 440 130 L 440 170 L 440 360" fill="none" stroke="none"/>
              </svg>
            </div>

            <!-- Current and Voltage Display -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Current Display -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Levels</h3>
                <div class="space-y-4">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Base Current (Ib):</span>
                      <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {{ baseCurrent.toFixed(6) }}A
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ (baseCurrent * 1000000).toFixed(2) }}µA
                    </div>
                  </div>
                  
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Q1 Current (Ic1):</span>
                      <span class="text-2xl font-bold text-green-600 dark:text-green-400">
                        {{ ic1.toFixed(4) }}A
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      β1 × Ib = {{ beta1 }} × {{ baseCurrent.toFixed(6) }}
                    </div>
                  </div>
                  
                  <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Q2 Current (Ic2):</span>
                      <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {{ ic2.toFixed(3) }}A
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      β2 × Ic1 ≈ {{ beta2 }} × {{ ic1.toFixed(4) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Voltage and Power Display -->
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Voltage & Power</h3>
                <div class="space-y-4">
                  <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Output Voltage:</span>
                      <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {{ outputVoltage.toFixed(2) }}V
                      </span>
                    </div>
                  </div>
                  
                  <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Load Power:</span>
                      <span class="text-2xl font-bold text-red-600 dark:text-red-400">
                        {{ loadPower.toFixed(3) }}W
                      </span>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-700 dark:text-gray-300 font-medium">Total Power:</span>
                      <span class="text-2xl font-bold text-gray-600 dark:text-gray-400">
                        {{ totalPower.toFixed(3) }}W
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Educational Content -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📘 Darlington Pair Explained</h3>
              <div class="space-y-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">What is a Darlington Pair?</h4>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    A Darlington pair consists of two bipolar junction transistors (BJTs) connected in such a way that 
                    the current amplified by the first transistor is amplified further by the second one. This configuration 
                    provides extremely high current gain, typically ranging from 1,000 to over 50,000.
                  </p>
                </div>
                
                <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Characteristics:</h4>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• <strong>High Current Gain:</strong> βtotal ≈ β1 × β2 (typically 1000-50000)</li>
                    <li>• <strong>High Input Impedance:</strong> Requires very small base current</li>
                    <li>• <strong>Low Switching Speed:</strong> Not suitable for high-frequency applications</li>
                    <li>• <strong>Higher Saturation Voltage:</strong> Typically ~1.5V vs 0.2V for single BJT</li>
                  </ul>
                </div>
                
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Common Applications:</h4>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Motor drivers and high-power load switching</li>
                    <li>• LED drivers for high-current LEDs</li>
                    <li>• Sensor amplifiers with weak input signals</li>
                    <li>• Power supply regulation circuits</li>
                    <li>• Audio amplifier output stages</li>
                  </ul>
                </div>
                
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Gain Calculation:</h4>
                  <div class="text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                    Ib = (Vin - 1.4V) / Rb<br>
                    Ic1 = β1 × Ib<br>
                    Ic2 ≈ β2 × Ic1<br>
                    Iout ≈ β1 × β2 × Ib
                  </div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Note: 1.4V accounts for two Vbe drops (~0.7V each)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

// SEO
useHead({
  title: "Darlington Pair Simulation - Cyno Electric",
  meta: [
    { name: 'description', content: "Interactive Darlington pair transistor circuit simulation. Explore high-gain BJT cascading with real-time visualization." },
    { name: 'keywords', content: "darlington pair, transistor simulation, BJT, current gain, electronics simulator, darlington transistor" }
  ]
})

const colorMode = useColorMode()

// Circuit parameters
const baseResistor = ref(10) // kΩ
const inputVoltage = ref(2.5) // V
const supplyVoltage = ref(12) // V
const loadResistor = ref(100) // Ω
const beta1 = ref(100)
const beta2 = ref(100)

// Simulation state
const isRunning = ref(false)

// Toggle simulation
function toggleSimulation() {
  isRunning.value = !isRunning.value
}

// Reset simulation
function resetSimulation() {
  isRunning.value = false
  baseResistor.value = 10
  inputVoltage.value = 2.5
  supplyVoltage.value = 12
  loadResistor.value = 100
  beta1.value = 100
  beta2.value = 100
}

// Computed: Total current gain
const totalGain = computed(() => {
  return beta1.value * beta2.value
})

// Computed: Base current (Ib)
const baseCurrent = computed(() => {
  const rb = baseResistor.value * 1000 // Convert to ohms
  const vbeDrop = 1.4 // Two Vbe drops
  const effectiveVin = Math.max(0, inputVoltage.value - vbeDrop)
  return effectiveVin / rb
})

// Computed: Q1 collector current (Ic1)
const ic1 = computed(() => {
  return baseCurrent.value * beta1.value
})

// Computed: Q2 collector current (Ic2) - output current
const ic2 = computed(() => {
  return ic1.value * beta2.value
})

// Computed: Output voltage
const outputVoltage = computed(() => {
  const maxCurrent = supplyVoltage.value / loadResistor.value
  const actualCurrent = Math.min(ic2.value, maxCurrent)
  return actualCurrent * loadResistor.value
})

// Computed: Load power
const loadPower = computed(() => {
  return (outputVoltage.value * outputVoltage.value) / loadResistor.value
})

// Computed: Total power
const totalPower = computed(() => {
  return supplyVoltage.value * ic2.value
})

// Computed: Is powered
const isPowered = computed(() => {
  return supplyVoltage.value > 0
})

// Computed: Q1 is active
const q1Active = computed(() => {
  return baseCurrent.value > 0 && inputVoltage.value > 1.4
})

// Computed: Q2 is active
const q2Active = computed(() => {
  return q1Active.value && ic1.value > 0
})
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

/* Slider Styles */
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
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

/* Dark mode slider */
@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}
</style>

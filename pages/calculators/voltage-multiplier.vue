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
            <svg class="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Voltage Multiplier Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design Cockcroft-Walton voltage multiplier circuits for high-voltage applications
          </p>
          
          <!-- Main Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold">
              <span class="text-primary">V_out</span> = <span class="text-blue-600">2</span> × <span class="text-purple-600">n</span> × <span class="text-green-600">V_peak</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Ideal output voltage for n-stage multiplier
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Cockcroft-Walton Voltage Multiplier
          </h3>
          
          <!-- Circuit Diagram -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 800 450" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Background -->
              <rect width="800" height="450" fill="transparent"/>
              
              <!-- Title -->
              <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#374151">
                {{ stages }}-Stage Cockcroft-Walton Multiplier
              </text>
              
              <!-- AC Input Source -->
              <g transform="translate(100, 225)">
                <circle cx="0" cy="0" r="35" fill="white" stroke="#EF4444" stroke-width="3"/>
                <path d="M -15 0 Q -7 -15, 0 0 Q 7 15, 15 0" stroke="#EF4444" stroke-width="2" fill="none"/>
                <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="bold" fill="#EF4444">AC</text>
                <text x="0" y="55" text-anchor="middle" font-size="13" fill="#EF4444">{{ inputVoltage }}V RMS</text>
                <text x="0" y="70" text-anchor="middle" font-size="11" fill="#666">{{ peakVoltage.toFixed(1) }}V peak</text>
              </g>
              
              <!-- Draw multiplier stages -->
              <g v-for="(stage, index) in Math.min(stages, 5)" :key="index">
                <g :transform="`translate(${200 + index * 100}, 0)`">
                  <!-- Vertical lines -->
                  <line x1="30" y1="150" x2="30" y2="300" stroke="#6B7280" stroke-width="3"/>
                  
                  <!-- Diode (going down) -->
                  <g transform="translate(30, 180)">
                    <polygon points="-10,-10 10,0 -10,10" fill="white" stroke="#10B981" stroke-width="2"/>
                    <line x1="-10" y1="0" x2="10" y2="0" stroke="#10B981" stroke-width="2"/>
                  </g>
                  
                  <!-- Capacitor (horizontal) -->
                  <line x1="0" y1="180" x2="15" y2="180" stroke="#3B82F6" stroke-width="3"/>
                  <line x1="25" y1="180" x2="30" y2="180" stroke="#3B82F6" stroke-width="3"/>
                  <line x1="15" y1="170" x2="15" y2="190" stroke="#3B82F6" stroke-width="3"/>
                  <line x1="25" y1="170" x2="25" y2="190" stroke="#3B82F6" stroke-width="3"/>
                  
                  <!-- Second capacitor (bottom) -->
                  <line x1="0" y1="240" x2="15" y2="240" stroke="#8B5CF6" stroke-width="3"/>
                  <line x1="25" y1="240" x2="30" y2="240" stroke="#8B5CF6" stroke-width="3"/>
                  <line x1="15" y1="230" x2="15" y2="250" stroke="#8B5CF6" stroke-width="3"/>
                  <line x1="25" y1="230" x2="25" y2="250" stroke="#8B5CF6" stroke-width="3"/>
                  
                  <!-- Stage label -->
                  <text x="30" y="130" text-anchor="middle" font-size="11" fill="#666" font-weight="bold">
                    Stage {{ index + 1 }}
                  </text>
                  
                  <!-- Stage output voltage -->
                  <text x="30" y="330" text-anchor="middle" font-size="10" fill="#10B981" font-weight="bold">
                    +{{ (2 * (index + 1) * peakVoltage).toFixed(0) }}V
                  </text>
                </g>
                
                <!-- Connection to next stage -->
                <line v-if="index < Math.min(stages, 5) - 1" 
                  :x1="230 + index * 100" y1="240" 
                  :x2="250 + index * 100" y2="240" 
                  stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
              </g>
              
              <!-- Ground symbol -->
              <g transform="translate(30, 320)">
                <line x1="-20" y1="0" x2="20" y2="0" stroke="#374151" stroke-width="3"/>
                <line x1="-12" y1="8" x2="12" y2="8" stroke="#374151" stroke-width="3"/>
                <line x1="-4" y1="16" x2="4" y2="16" stroke="#374151" stroke-width="3"/>
              </g>
              
              <!-- Output terminal -->
              <g transform="translate(230 + (Math.min(stages, 5) - 1) * 100, 180)">
                <circle cx="0" cy="0" r="25" fill="white" stroke="#EF4444" stroke-width="3"/>
                <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#EF4444">OUT</text>
                <text x="0" y="-35" text-anchor="middle" font-size="13" fill="#EF4444" font-weight="bold">
                  {{ idealOutputVoltage.toFixed(0) }}V
                </text>
                <text x="0" y="-50" text-anchor="middle" font-size="10" fill="#666">Ideal</text>
              </g>
              
              <!-- Legend -->
              <g transform="translate(600, 350)">
                <rect x="0" y="0" width="180" height="80" fill="white" stroke="#E5E7EB" rx="5"/>
                <text x="10" y="20" font-size="12" font-weight="bold" fill="#374151">Legend:</text>
                
                <line x1="10" y1="35" x2="40" y2="35" stroke="#10B981" stroke-width="3"/>
                <text x="50" y="38" font-size="10" fill="#374151">Diode</text>
                
                <line x1="10" y1="50" x2="40" y2="50" stroke="#3B82F6" stroke-width="3"/>
                <text x="50" y="53" font-size="10" fill="#374151">Capacitor</text>
                
                <line x1="10" y1="65" x2="40" y2="65" stroke="#EF4444" stroke-width="3"/>
                <text x="50" y="68" font-size="10" fill="#374151">Output</text>
              </g>
            </svg>
          </div>
          
          <!-- Input Controls -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Input Voltage -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                AC Input Voltage (RMS): {{ inputVoltage }}V
              </label>
              <input type="range" v-model.number="inputVoltage" min="6" max="240" step="6" 
                class="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>6V</span>
                <span>240V</span>
              </div>
            </div>
            
            <!-- Number of Stages -->
            <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Number of Stages: {{ stages }}
              </label>
              <input type="range" v-model.number="stages" min="1" max="12" step="1" 
                class="w-full h-2 bg-blue-300 dark:bg-blue-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-blue-600 dark:text-blue-400 mt-1">
                <span>1</span>
                <span>12</span>
              </div>
            </div>
            
            <!-- Output Current -->
            <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                Output Current: {{ outputCurrent }}mA
              </label>
              <input type="range" v-model.number="outputCurrent" min="0.1" max="100" step="0.1" 
                class="w-full h-2 bg-green-300 dark:bg-green-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-green-600 dark:text-green-400 mt-1">
                <span>0.1mA</span>
                <span>100mA</span>
              </div>
            </div>
            
            <!-- Capacitance -->
            <div class="bg-purple-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Capacitor Value: {{ capacitance }}nF
              </label>
              <input type="range" v-model.number="capacitance" min="1" max="1000" step="1" 
                class="w-full h-2 bg-purple-300 dark:bg-purple-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-purple-600 dark:text-purple-400 mt-1">
                <span>1nF</span>
                <span>1000nF</span>
              </div>
            </div>
            
            <!-- Frequency -->
            <div class="bg-amber-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">
                AC Frequency: {{ frequency }}Hz
              </label>
              <input type="range" v-model.number="frequency" min="50" max="1000" step="10" 
                class="w-full h-2 bg-amber-300 dark:bg-amber-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-amber-600 dark:text-amber-400 mt-1">
                <span>50Hz</span>
                <span>1kHz</span>
              </div>
            </div>
            
            <!-- Load Resistance -->
            <div class="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4">
              <label class="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                Load Resistance: {{ loadResistance }}kΩ
              </label>
              <input type="range" v-model.number="loadResistance" min="1" max="1000" step="1" 
                class="w-full h-2 bg-indigo-300 dark:bg-indigo-600 rounded-lg appearance-none cursor-pointer">
              <div class="flex justify-between text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                <span>1kΩ</span>
                <span>1MΩ</span>
              </div>
            </div>
          </div>
          
          <!-- Results Panel -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 Calculation Results</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <!-- Peak Voltage -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Peak Input Voltage</div>
                <div class="text-2xl font-bold text-blue-600">{{ peakVoltage.toFixed(1) }}V</div>
              </div>
              
              <!-- Ideal Output -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ideal Output (No Load)</div>
                <div class="text-2xl font-bold text-green-600">{{ idealOutputVoltage.toFixed(0) }}V</div>
              </div>
              
              <!-- Actual Output -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Actual Output (Loaded)</div>
                <div class="text-2xl font-bold text-purple-600">{{ actualOutputVoltage.toFixed(0) }}V</div>
              </div>
              
              <!-- Ripple Voltage -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ripple Voltage</div>
                <div class="text-2xl font-bold text-red-600">{{ rippleVoltage.toFixed(2) }}V</div>
              </div>
            </div>
            
            <!-- Additional Parameters -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Voltage Regulation -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-blue-600 mb-2">Voltage Regulation</div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  <div class="flex justify-between mb-1">
                    <span>Load Regulation:</span>
                    <span class="font-bold text-blue-600">{{ loadRegulation.toFixed(1) }}%</span>
                  </div>
                  <div class="text-xs text-gray-500">Output drops {{ (idealOutputVoltage - actualOutputVoltage).toFixed(0) }}V under load</div>
                </div>
              </div>
              
              <!-- Ripple Percentage -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-green-600 mb-2">Ripple Characteristics</div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  <div class="flex justify-between mb-1">
                    <span>Ripple %:</span>
                    <span class="font-bold text-green-600">{{ ripplePercentage.toFixed(3) }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Ripple Frequency:</span>
                    <span class="font-bold text-green-600">{{ frequency * 2 }}Hz</span>
                  </div>
                </div>
              </div>
              
              <!-- Output Power -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs font-semibold text-purple-600 mb-2">Output Power</div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  <div class="flex justify-between mb-1">
                    <span>Output Power:</span>
                    <span class="font-bold text-purple-600">{{ outputPower.toFixed(3) }}W</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Input Power:</span>
                    <span class="font-bold text-purple-600">{{ inputPower.toFixed(3) }}W</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Component Recommendations -->
            <div class="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 class="font-bold text-gray-900 dark:text-white mb-3">🔧 Component Recommendations</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div class="font-semibold text-blue-600 mb-1">Diodes:</div>
                  <ul class="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• PIV rating: > {{ (2 * peakVoltage).toFixed(0) }}V</li>
                    <li>• Current rating: > {{ (outputCurrent * 2).toFixed(1) }}mA</li>
                    <li>• Fast recovery or ultra-fast types recommended</li>
                    <li>• Examples: 1N4007 (for low freq), UF4007, HER108</li>
                  </ul>
                </div>
                <div>
                  <div class="font-semibold text-green-600 mb-1">Capacitors:</div>
                  <ul class="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Value: {{ capacitance }}nF (all stages)</li>
                    <li>• Voltage rating: > {{ (2 * peakVoltage).toFixed(0) }}V</li>
                    <li>• Low ESR and low loss types recommended</li>
                    <li>• Polypropylene or C0G/NP0 ceramic for best performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Voltage Multipliers</h3>
          
          <div class="space-y-6">
            <!-- What is it -->
            <div>
              <h4 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">What is a Cockcroft-Walton Multiplier?</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                The Cockcroft-Walton voltage multiplier is a circuit that converts AC voltage into high DC voltage. 
                It uses a ladder network of capacitors and diodes to generate DC output that can be many times the peak 
                AC input voltage. It was invented by John Cockcroft and Ernest Walton, who used it to power their 
                particle accelerator (winning them the 1951 Nobel Prize in Physics).
              </p>
            </div>
            
            <!-- How it Works -->
            <div>
              <h4 class="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">How It Works</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <div class="flex items-start">
                  <span class="text-2xl mr-3">1️⃣</span>
                  <div>
                    <strong class="text-gray-900 dark:text-white">First Half-Cycle:</strong>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      During positive half-cycle, capacitor C1 charges through diode D1 to the peak input voltage (V_peak)
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <span class="text-2xl mr-3">2️⃣</span>
                  <div>
                    <strong class="text-gray-900 dark:text-white">Second Half-Cycle:</strong>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      During negative half-cycle, C1's voltage adds to the input, charging C2 to 2×V_peak through D2
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <span class="text-2xl mr-3">3️⃣</span>
                  <div>
                    <strong class="text-gray-900 dark:text-white">Subsequent Stages:</strong>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Each additional stage adds another 2×V_peak to the output voltage
                    </p>
                  </div>
                </div>
                <div class="flex items-start">
                  <span class="text-2xl mr-3">⚡</span>
                  <div>
                    <strong class="text-gray-900 dark:text-white">Result:</strong>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      For n stages: V_out = 2n × V_peak (ideal, no-load condition)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Key Formulas -->
            <div>
              <h4 class="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">Key Formulas</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><span class="text-blue-600">Peak Voltage:</span> V_peak = V_RMS × √2</div>
                <div><span class="text-green-600">Ideal Output:</span> V_out = 2 × n × V_peak</div>
                <div><span class="text-purple-600">Loaded Output:</span> V_loaded = V_ideal - (I_load / (f × C))</div>
                <div><span class="text-red-600">Ripple Voltage:</span> V_ripple = I_load / (f × C)</div>
                <div><span class="text-amber-600">Regulation:</span> % = (V_ideal - V_loaded) / V_ideal × 100</div>
              </div>
            </div>
            
            <!-- Applications -->
            <div>
              <h4 class="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">Real-World Applications</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-blue-700 dark:text-blue-300 mb-2">🔬 Scientific Equipment</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Particle accelerators</li>
                    <li>• X-ray machines</li>
                    <li>• Electron microscopes</li>
                    <li>• Ion implantation systems</li>
                  </ul>
                </div>
                <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-green-700 dark:text-green-300 mb-2">📡 Industrial Applications</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Laser power supplies</li>
                    <li>• Photocopier chargers</li>
                    <li>• Air ionizers</li>
                    <li>• Electrostatic precipitators</li>
                  </ul>
                </div>
                <div class="bg-purple-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-purple-700 dark:text-purple-300 mb-2">🏠 Consumer Products</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• CRT television anode supplies</li>
                    <li>• Photomultiplier tube bias</li>
                    <li>• Geiger-Müller tubes</li>
                    <li>• Bug zappers</li>
                  </ul>
                </div>
                <div class="bg-amber-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 class="font-bold text-amber-700 dark:text-amber-300 mb-2">⚡ Testing Equipment</h5>
                  <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Insulation testers</li>
                    <li>• HV cable test sets</li>
                    <li>• Dielectric strength testers</li>
                    <li>• Van de Graaff generators</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Design Considerations -->
            <div class="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="font-bold text-indigo-700 dark:text-indigo-300 mb-3">💡 Design Considerations</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <h5 class="font-semibold mb-2">Advantages:</h5>
                  <ul class="space-y-1">
                    <li>✅ No transformer required for isolation</li>
                    <li>✅ Relatively simple and inexpensive</li>
                    <li>✅ Can achieve very high voltages</li>
                    <li>✅ Scalable by adding stages</li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-semibold mb-2">Limitations:</h5>
                  <ul class="space-y-1">
                    <li>⚠️ Poor voltage regulation under load</li>
                    <li>⚠️ High ripple at low frequencies</li>
                    <li>⚠️ Limited current output</li>
                    <li>⚠️ Efficiency decreases with more stages</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Safety Warning -->
            <div class="bg-red-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
              <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">⚠️ Safety Warning</h4>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Voltage multipliers can produce LETHAL voltages. Always follow proper safety procedures:
                <br>• Use proper insulation and isolation
                <br>• Never touch circuit while powered
                <br>• Discharge all capacitors before handling
                <br>• Use appropriate PPE (Personal Protective Equipment)
                <br>• Work with a partner when possible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 py-8 mt-12">
      <div class="max-w-6xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>Voltage Multiplier Calculator | Learn High-Voltage Electronics</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputVoltage = ref(120) // RMS voltage
const stages = ref(4)
const outputCurrent = ref(10) // mA
const capacitance = ref(100) // nF
const frequency = ref(60) // Hz
const loadResistance = ref(100) // kΩ

// Calculate peak voltage from RMS
const peakVoltage = computed(() => {
  return inputVoltage.value * Math.sqrt(2)
})

// Ideal output voltage (no load)
const idealOutputVoltage = computed(() => {
  return 2 * stages.value * peakVoltage.value
})

// Convert current to Amps and capacitance to Farads
const outputCurrentAmps = computed(() => {
  return outputCurrent.value / 1000 // mA to A
})

const capacitanceFarads = computed(() => {
  return capacitance.value * 1e-9 // nF to F
})

// Calculate ripple voltage
const rippleVoltage = computed(() => {
  return outputCurrentAmps.value / (frequency.value * capacitanceFarads.value)
})

// Actual output voltage under load
const actualOutputVoltage = computed(() => {
  const drop = (outputCurrentAmps.value * stages.value) / (frequency.value * capacitanceFarads.value)
  return Math.max(0, idealOutputVoltage.value - drop)
})

// Load regulation percentage
const loadRegulation = computed(() => {
  if (idealOutputVoltage.value === 0) return 0
  return ((idealOutputVoltage.value - actualOutputVoltage.value) / idealOutputVoltage.value) * 100
})

// Ripple percentage
const ripplePercentage = computed(() => {
  if (actualOutputVoltage.value === 0) return 0
  return (rippleVoltage.value / actualOutputVoltage.value) * 100
})

// Output power
const outputPower = computed(() => {
  const volts = actualOutputVoltage.value / 1000 // Convert to kV
  return (volts * volts) / loadResistance.value
})

// Input power (assuming ~70% efficiency)
const inputPower = computed(() => {
  return outputPower.value / 0.7
})

// SEO Meta
useHead({
  title: 'Voltage Multiplier Calculator - Cockcroft-Walton Design Tool',
  meta: [
    { name: 'description', content: 'Design Cockcroft-Walton voltage multiplier circuits. Calculate output voltage, ripple, and component values for high-voltage applications.' }
  ]
})
</script>

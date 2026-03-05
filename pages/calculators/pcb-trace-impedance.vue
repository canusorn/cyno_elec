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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            📡 PCB Trace Impedance Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate controlled impedance for microstrip and stripline transmission lines
          </p>
          
          <!-- Impedance Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold">
              <span class="text-primary">Z₀</span>
              <span class="text-gray-400">≈</span>
              <span class="text-primary">√(L/C)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Trace Parameters</h3>
              
              <!-- Transmission Line Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transmission Line Type
                </label>
                <select 
                  v-model="lineType"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="microstrip">Microstrip</option>
                  <option value="stripline">Stripline</option>
                </select>
              </div>

              <!-- Substrate Material -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Substrate Material
                </label>
                <select 
                  v-model="material"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="FR4">FR-4 (εr = 4.3)</option>
                  <option value="RO4003C">Rogers RO4003C (εr = 3.55)</option>
                  <option value="RO4350B">Rogers RO4350B (εr = 3.48)</option>
                  <option value="RT5870">Rogers RT5870 (εr = 2.33)</option>
                  <option value="Alumina">Alumina (εr = 9.8)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <!-- Dielectric Constant (Custom) -->
              <div v-if="material === 'custom'" class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dielectric Constant (εr)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="customEr"
                    type="number" 
                    step="0.1"
                    min="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <!-- Trace Width -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trace Width (W)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="traceWidth"
                    type="number" 
                    step="0.01"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mm</span>
                </div>
                <input 
                  v-model.number="traceWidth"
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Trace Thickness -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trace Thickness (T)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="traceThickness"
                    type="number" 
                    step="0.001"
                    min="0.001"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mm</span>
                </div>
                <select 
                  v-model="copperWeight"
                  @change="setCopperWeight"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option :value="0.035">0.5 oz (0.035mm)</option>
                  <option :value="0.070">1.0 oz (0.070mm)</option>
                  <option :value="0.105">1.5 oz (0.105mm)</option>
                  <option :value="0.140">2.0 oz (0.140mm)</option>
                </select>
              </div>

              <!-- Dielectric Height -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ lineType === 'microstrip' ? 'Substrate Height (H)' : 'Distance to Planes (H)' }}
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="dielectricHeight"
                    type="number" 
                    step="0.01"
                    min="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">mm</span>
                </div>
                <input 
                  v-model.number="dielectricHeight"
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.01"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Target Impedance (for reverse calculation) -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Impedance
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="targetImpedance"
                    type="number" 
                    step="1"
                    min="20"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">Ω</span>
                </div>
                <button 
                  @click="calculateRequiredWidth"
                  class="w-full px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  Calculate Required Width for {{ targetImpedance }}Ω
                </button>
              </div>

              <!-- Quick Presets -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Common Presets
                </label>
                <div class="grid grid-cols-1 gap-2">
                  <button 
                    @click="setPreset('usb')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    USB 2.0 Differential (90Ω)
                  </button>
                  <button 
                    @click="setPreset('hdmi')"
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    HDMI Differential (100Ω)
                  </button>
                  <button 
                    @click="setPreset('fr4_50')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    FR-4 Microstrip 50Ω
                  </button>
                  <button 
                    @click="setPreset('pcie')"
                    class="px-3 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                  >
                    PCIe Differential (85Ω)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Panel -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Impedance Result -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Characteristic Impedance</h3>
                <div :class="[
                  'px-4 py-2 rounded-full font-bold text-sm',
                  impedanceToleranceClass
                ]">
                  {{ impedanceTolerance }}
                </div>
              </div>
              
              <div class="flex items-center justify-center py-8">
                <div class="text-center">
                  <div class="text-7xl font-black" :class="impedanceColor">
                    {{ characteristicImpedance.toFixed(1) }}
                  </div>
                  <div class="text-2xl text-gray-500 dark:text-gray-400 mt-2">Ω (ohms)</div>
                </div>
              </div>
              
              <!-- Impedance Gauge -->
              <div class="mt-6">
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>40Ω</span>
                  <span>Target: {{ targetImpedance }}Ω</span>
                  <span>60Ω</span>
                </div>
                <div class="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    class="absolute top-0 h-full transition-all duration-300"
                    :class="impedanceColor.replace('text-', 'bg-')"
                    :style="{ left: `${((characteristicImpedance - 40) / 20) * 100}%`, width: '4px' }"
                  ></div>
                  <div 
                    class="absolute top-0 h-full transition-all duration-300 bg-yellow-400 dark:bg-yellow-600"
                    :style="{ left: `${((targetImpedance - 40) / 20) * 100}%`, width: '2px' }"
                  ></div>
                  <!-- Tolerance zones -->
                  <div 
                    class="absolute top-0 h-full bg-green-400 dark:bg-green-600 opacity-30"
                    :style="{ 
                      left: `${((targetImpedance * 0.95 - 40) / 20) * 100}%`, 
                      width: `${((targetImpedance * 1.1 - targetImpedance * 0.95) / 20) * 100}%` 
                    }"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <span>{{ (targetImpedance * 0.9).toFixed(1) }}Ω</span>
                  <span>{{ (targetImpedance * 1.1).toFixed(1) }}Ω</span>
                </div>
              </div>
            </div>

            <!-- PCB Cross-Section Visualization -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">PCB Cross-Section</h3>
              
              <svg viewBox="0 0 400 250" class="w-full h-auto">
                <!-- Substrate -->
                <rect x="20" y="80" width="360" :y="lineType === 'microstrip' ? 140 : 100" height="80" fill="#4ADE80" opacity="0.3" rx="4" />
                <text x="30" :y="lineType === 'microstrip' ? 190 : 150" class="text-xs fill-green-700 dark:fill-green-400">
                  {{ material === 'FR4' ? 'FR-4' : material }} (εr = {{ dielectricConstant.toFixed(2) }})
                </text>
                
                <!-- Ground Plane -->
                <rect x="20" :y="lineType === 'microstrip' ? 220 : 180" width="360" height="15" fill="#94A3B8" opacity="0.8" />
                <text x="30" :y="lineType === 'microstrip' ? 232 : 192" class="text-xs fill-gray-600 dark:fill-gray-400">GND Plane</text>
                
                <!-- Signal Trace -->
                <rect 
                  x="150" 
                  :y="lineType === 'microstrip' ? 70 : 90"
                  :width="traceWidth * 40" 
                  height="10" 
                  fill="#F59E0B" 
                  stroke="#D97706" 
                  stroke-width="1"
                />
                <text x="160" :y="lineType === 'microstrip' ? 65 : 85" class="text-xs fill-orange-600 dark:fill-orange-400">
                  Signal Trace ({{ traceWidth.toFixed(2) }}mm)
                </text>
                
                <!-- Dimensions -->
                <!-- Height dimension -->
                <line x1="380" y1="70" x2="380" :y2="lineType === 'microstrip' ? 220 : 180" stroke="#6366F1" stroke-width="2" marker-end="url(#arrowhead)" marker-start="url(#arrowhead)" />
                <text x="360" :y="lineType === 'microstrip' ? 150 : 130" class="text-xs fill-indigo-600 dark:fill-indigo-400">H = {{ dielectricHeight.toFixed(2) }}mm</text>
                
                <!-- Width dimension -->
                <line x1="150" y1="60" x2="150" :y2="lineType === 'microstrip' ? 220 : 180" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="4,4" opacity="0.5" />
                
                <!-- EM Field Visualization -->
                <path 
                  d="M 150 80 Q 170 150 150 220" 
                  fill="none" 
                  stroke="#EF4444" 
                  stroke-width="2" 
                  opacity="0.3"
                  stroke-dasharray="4,4"
                />
                <path 
                  :d="`M ${150 + traceWidth * 40} 80 Q ${170 + traceWidth * 40} 150 ${150 + traceWidth * 40} 220`" 
                  fill="none" 
                  stroke="#EF4444" 
                  stroke-width="2" 
                  opacity="0.3"
                  stroke-dasharray="4,4"
                />
                <text x="200" y="140" class="text-xs fill-red-500" opacity="0.6">EM Field</text>
                
                <!-- Top layer indicator for microstrip -->
                <line v-if="lineType === 'microstrip'" x1="20" y1="60" x2="380" y2="60" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="8,8" />
                <text v-if="lineType === 'microstrip'" x="340" y="55" class="text-xs fill-gray-400">Air (εr ≈ 1)</text>
                
                <!-- Arrow marker definition -->
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <polygon points="0 0, 10 5, 0 10" fill="#6366F1" />
                  </marker>
                </defs>
              </svg>
            </div>

            <!-- Additional Parameters -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculated Parameters</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Propagation Delay</div>
                  <div class="text-lg font-bold text-primary">{{ propagationDelay.toFixed(2) }} ps/in</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Effective εr</div>
                  <div class="text-lg font-bold text-blue-500">{{ effectiveDielectric.toFixed(2) }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">W/H Ratio</div>
                  <div class="text-lg font-bold text-purple-500">{{ (traceWidth / dielectricHeight).toFixed(3) }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Inductance/Unit</div>
                  <div class="text-lg font-bold text-green-500">{{ inductancePerUnit.toFixed(1) }} nH/in</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacitance/Unit</div>
                  <div class="text-lg font-bold text-orange-500">{{ capacitancePerUnit.toFixed(2) }} pF/in</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Resistance (DC)</div>
                  <div class="text-lg font-bold text-red-500">{{ dcResistance.toFixed(3) }} Ω/in</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Skin Depth @1GHz</div>
                  <div class="text-lg font-bold text-pink-500">{{ skinDepth.toFixed(2) }} μm</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Velocity Factor</div>
                  <div class="text-lg font-bold text-teal-500">{{ velocityFactor.toFixed(1) }}%</div>
                </div>
              </div>
            </div>

            <!-- Design Recommendations -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Design Recommendations</h3>
              
              <div class="space-y-3">
                <div v-if="impedanceError < -10" class="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span class="text-2xl">⚠️</span>
                  <div>
                    <div class="font-bold text-yellow-800 dark:text-yellow-200">Impedance Too Low</div>
                    <div class="text-sm text-yellow-700 dark:text-yellow-300">Decrease trace width or increase dielectric height</div>
                  </div>
                </div>
                
                <div v-if="impedanceError > 10" class="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span class="text-2xl">⚠️</span>
                  <div>
                    <div class="font-bold text-yellow-800 dark:text-yellow-200">Impedance Too High</div>
                    <div class="text-sm text-yellow-700 dark:text-yellow-300">Increase trace width or decrease dielectric height</div>
                  </div>
                </div>
                
                <div v-if="impedanceError >= -10 && impedanceError <= 10" class="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span class="text-2xl">✅</span>
                  <div>
                    <div class="font-bold text-green-800 dark:text-green-200">Within Tolerance</div>
                    <div class="text-sm text-green-700 dark:text-green-300">Impedance is within ±10% of target value</div>
                  </div>
                </div>
                
                <div class="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span class="text-2xl">💡</span>
                  <div>
                    <div class="font-bold text-blue-800 dark:text-blue-200">Manufacturing Note</div>
                    <div class="text-sm text-blue-700 dark:text-blue-300">
                      Typical PCB fabrication tolerance: ±10% for standard process, ±5% for controlled impedance
                    </div>
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
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding PCB Trace Impedance</h2>
          
          <div class="prose dark:prose-invert max-w-none">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Controlled Impedance?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Controlled impedance is crucial for high-speed signals to ensure signal integrity, minimize reflections, and maintain proper signal timing. When a signal travels through a PCB trace, it sees an impedance determined by the trace geometry and surrounding materials.
            </p>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Microstrip vs Stripline</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Microstrip:</strong> Trace on the outer layer with reference plane below. Faster signals, easier to fabricate, but more susceptible to external noise.</li>
              <li><strong>Stripline:</strong> Trace sandwiched between two reference planes. Better EMI performance, more consistent impedance, but harder to fabricate and troubleshoot.</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">When to Use Controlled Impedance</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>High-speed digital signals:</strong> USB, HDMI, PCIe, DDR, LVDS, etc.</li>
              <li><strong>RF circuits:</strong> WiFi, Bluetooth, cellular, GPS</li>
              <li><strong>Fast edge rates:</strong> When signal rise time is less than 2× propagation delay</li>
              <li><strong>Long traces:</strong> When trace length > 1/10 of signal wavelength</li>
              <li><strong>Differential pairs:</strong> USB, HDMI, Ethernet require precise differential impedance</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Impedance Values</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Application</th>
                    <th class="text-left py-2">Impedance</th>
                    <th class="text-left py-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Single-ended (general)</td>
                    <td class="py-2">50Ω</td>
                    <td class="py-2">Microstrip/Stripline</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">USB 2.0/3.x</td>
                    <td class="py-2">90Ω differential</td>
                    <td class="py-2">Differential pair</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">HDMI</td>
                    <td class="py-2">100Ω differential</td>
                    <td class="py-2">Differential pair</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">PCIe</td>
                    <td class="py-2">85Ω differential</td>
                    <td class="py-2">Differential pair</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Ethernet</td>
                    <td class="py-2">100Ω differential</td>
                    <td class="py-2">Differential pair</td>
                  </tr>
                  <tr>
                    <td class="py-2">RF (75Ω systems)</td>
                    <td class="py-2">75Ω</td>
                    <td class="py-2">Microstrip/Stripline</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Always specify controlled impedance requirements to your PCB fabricator</li>
              <li>Provide impedance test coupons in the PCB fabrication panel</li>
              <li>Maintain consistent spacing between differential pairs (no meandering within the pair)</li>
              <li>Avoid reference plane splits under high-speed traces</li>
              <li>Use via stitching to maintain reference plane integrity</li>
              <li>Consider the effect of solder mask on microstrip impedance (~3-5% change)</li>
              <li>For critical applications, use controlled impedance stackup from your fabricator</li>
            </ul>

            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-3">Impedance Formulas</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The calculator uses the IPC-2141 formulas for controlled impedance:
            </p>
            
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <p class="mb-2"><strong>Microstrip (simplified):</strong></p>
              <p class="mb-4">Z₀ ≈ (87 / √(εr + 1.41)) × ln(5.98H / (0.8W + T))</p>
              
              <p class="mb-2"><strong>Stripline (simplified):</strong></p>
              <p>Z₀ ≈ (60 / √εr) × ln(1.9B / (0.8W + T))</p>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300">
              Where: W = trace width, H = height to reference plane, T = trace thickness, B = total dielectric thickness, εr = dielectric constant
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'PCB Trace Impedance Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate controlled impedance for microstrip and stripline PCB traces. Includes cross-section visualization and design recommendations.' },
    { name: 'keywords', content: 'PCB, trace impedance, microstrip, stripline, controlled impedance, transmission line, signal integrity' }
  ]
})

const colorMode = useColorMode()

// Input parameters
const lineType = ref<'microstrip' | 'stripline'>('microstrip')
const material = ref('FR4')
const customEr = ref(4.3)
const traceWidth = ref(0.2) // mm
const traceThickness = ref(0.035) // mm
const dielectricHeight = ref(0.16) // mm (to reference plane)
const copperWeight = ref(0.035) // mm
const targetImpedance = ref(50) // ohms

// Material dielectric constants
const materialEr: Record<string, number> = {
  'FR4': 4.3,
  'RO4003C': 3.55,
  'RO4350B': 3.48,
  'RT5870': 2.33,
  'Alumina': 9.8,
  'custom': 4.3
}

// Computed: Dielectric constant
const dielectricConstant = computed(() => {
  return material.value === 'custom' ? customEr.value : materialEr[material.value] || 4.3
})

// Computed: Characteristic impedance (using IPC-2141 simplified formulas)
const characteristicImpedance = computed(() => {
  const W = traceWidth.value // mm
  const T = traceThickness.value // mm
  const H = dielectricHeight.value // mm
  const er = dielectricConstant.value
  
  if (lineType.value === 'microstrip') {
    // IPC-2141 Microstrip formula (simplified)
    // Z0 = (87 / sqrt(er + 1.41)) * ln(5.98H / (0.8W + T))
    const term1 = 87 / Math.sqrt(er + 1.41)
    const term2 = Math.log((5.98 * H) / (0.8 * W + T))
    return term1 * term2
  } else {
    // IPC-2141 Stripline formula (simplified)
    // Z0 = (60 / sqrt(er)) * ln(1.9(2H) / (0.8W + T))
    // Assuming centered between two planes (B = 2H)
    const B = 2 * H
    const term1 = 60 / Math.sqrt(er)
    const term2 = Math.log((1.9 * B) / (0.8 * W + T))
    return term1 * term2
  }
})

// Computed: Impedance error percentage
const impedanceError = computed(() => {
  return ((characteristicImpedance.value - targetImpedance.value) / targetImpedance.value) * 100
})

// Computed: Impedance tolerance class
const impedanceTolerance = computed(() => {
  const error = Math.abs(impedanceError.value)
  if (error <= 5) return '±5%'
  if (error <= 10) return '±10%'
  return 'Out of Spec'
})

// Computed: Impedance tolerance class for styling
const impedanceToleranceClass = computed(() => {
  const error = Math.abs(impedanceError.value)
  if (error <= 5) return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
  if (error <= 10) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
  return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
})

// Computed: Impedance color
const impedanceColor = computed(() => {
  const error = Math.abs(impedanceError.value)
  if (error <= 5) return 'text-green-500'
  if (error <= 10) return 'text-yellow-500'
  return 'text-red-500'
})

// Computed: Effective dielectric constant
const effectiveDielectric = computed(() => {
  if (lineType.value === 'microstrip') {
    const er = dielectricConstant.value
    const W = traceWidth.value
    const H = dielectricHeight.value
    // Effective dielectric for microstrip (partially in air)
    return 0.5 * (er + 1) + 0.5 * (er - 1) / Math.sqrt(1 + 12 * H / W)
  } else {
    return dielectricConstant.value
  }
})

// Computed: Propagation delay (ps/inch)
const propagationDelay = computed(() => {
  const er_eff = effectiveDielectric.value
  // Delay = sqrt(er_eff) / c * 1 inch in ps
  // c = 11.8 inches/ns
  return (Math.sqrt(er_eff) / 11.8) * 1000 // ps/in
})

// Computed: Velocity factor (percentage of c)
const velocityFactor = computed(() => {
  return 100 / Math.sqrt(effectiveDielectric.value)
})

// Computed: Inductance per unit length (nH/in)
const inductancePerUnit = computed(() => {
  const Z0 = characteristicImpedance.value
  const er_eff = effectiveDielectric.value
  const c = 11.8 // inches/ns
  // L = Z0 / v = Z0 * sqrt(er_eff) / c
  return (Z0 * Math.sqrt(er_eff) / c) * 1000 // nH/in
})

// Computed: Capacitance per unit length (pF/in)
const capacitancePerUnit = computed(() => {
  const Z0 = characteristicImpedance.value
  const er_eff = effectiveDielectric.value
  const c = 11.8 // inches/ns
  // C = 1 / (Z0 * v) = sqrt(er_eff) / (Z0 * c)
  return (Math.sqrt(er_eff) / (Z0 * c)) * 1000 // pF/in
})

// Computed: DC resistance per inch
const dcResistance = computed(() => {
  // Copper resistivity: 1.724e-8 ohm-m
  // Cross-sectional area: W * T (in mm^2)
  const area_mm2 = traceWidth.value * traceThickness.value
  const area_m2 = area_mm2 * 1e-6
  const length_m = 0.0254 // 1 inch
  const resistance = (1.724e-8 * length_m) / area_m2
  return resistance // ohms per inch
})

// Computed: Skin depth at 1GHz (micrometers)
const skinDepth = computed(() => {
  // Skin depth = sqrt(2 * rho / (omega * mu))
  // Copper: rho = 1.724e-8, mu = 4*pi*1e-7
  const rho = 1.724e-8
  const mu = 4 * Math.PI * 1e-7
  const f = 1e9 // 1 GHz
  const omega = 2 * Math.PI * f
  const depth = Math.sqrt(2 * rho / (omega * mu))
  return depth * 1e6 // convert to micrometers
})

// Set copper weight
function setCopperWeight() {
  traceThickness.value = copperWeight.value
}

// Calculate required width for target impedance
function calculateRequiredWidth() {
  // This is an iterative approach using the inverse of the impedance formula
  const er = dielectricConstant.value
  const H = dielectricHeight.value
  const T = traceThickness.value
  const Z_target = targetImpedance.value
  
  if (lineType.value === 'microstrip') {
    // Inverse of IPC-2141 microstrip formula
    // W = exp((Z_target * sqrt(er + 1.41) / 87)) * (0.8W + T) / 5.98H
    // Simplified iteration
    let W = H * 2 // Initial guess
    for (let i = 0; i < 100; i++) {
      const Z_calc = (87 / Math.sqrt(er + 1.41)) * Math.log((5.98 * H) / (0.8 * W + T))
      if (Math.abs(Z_calc - Z_target) < 0.1) break
      W += (Z_target - Z_calc) * 0.01
      if (W < 0.1) W = 0.1
    }
    traceWidth.value = Math.round(W * 100) / 100
  } else {
    // Inverse of IPC-2141 stripline formula
    let W = H // Initial guess
    for (let i = 0; i < 100; i++) {
      const B = 2 * H
      const Z_calc = (60 / Math.sqrt(er)) * Math.log((1.9 * B) / (0.8 * W + T))
      if (Math.abs(Z_calc - Z_target) < 0.1) break
      W += (Z_target - Z_calc) * 0.01
      if (W < 0.1) W = 0.1
    }
    traceWidth.value = Math.round(W * 100) / 100
  }
}

// Set preset configurations
function setPreset(type: string) {
  switch(type) {
    case 'usb':
      lineType.value = 'microstrip'
      material.value = 'FR4'
      traceThickness.value = 0.035
      dielectricHeight.value = 0.16
      targetImpedance.value = 45 // Single-ended for 90Ω differential
      calculateRequiredWidth()
      break
    case 'hdmi':
      lineType.value = 'microstrip'
      material.value = 'FR4'
      traceThickness.value = 0.035
      dielectricHeight.value = 0.16
      targetImpedance.value = 50 // Single-ended for 100Ω differential
      calculateRequiredWidth()
      break
    case 'fr4_50':
      lineType.value = 'microstrip'
      material.value = 'FR4'
      traceThickness.value = 0.035
      dielectricHeight.value = 0.16
      targetImpedance.value = 50
      calculateRequiredWidth()
      break
    case 'pcie':
      lineType.value = 'microstrip'
      material.value = 'FR4'
      traceThickness.value = 0.035
      dielectricHeight.value = 0.16
      targetImpedance.value = 42.5 // Single-ended for 85Ω differential
      calculateRequiredWidth()
      break
  }
}
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

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9FA8DA, #7986CB);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #E0E7FF, #9FA8DA);
}

@media (prefers-color-scheme: dark) {
  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(to right, #3730A3, #6366F1);
  }
}
</style>

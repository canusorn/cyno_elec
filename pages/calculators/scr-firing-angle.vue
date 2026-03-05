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
            ⚡ SCR Firing Angle Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calculate thyristor-controlled rectifier parameters with interactive waveform visualization
          </p>

          <!-- Formula Display -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Average Output Voltage:</div>
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">V_avg</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">V_m</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">(1 + cos(α))</span>
              <span class="text-gray-400">÷</span>
              <span class="text-primary-highlight">2π</span>
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
            <!-- Input Parameters -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎛️ Input Parameters</h3>
              
              <div class="space-y-5">
                <!-- RMS Voltage -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>RMS Input Voltage</span>
                    <span class="text-primary">{{ vrms }}V</span>
                  </label>
                  <input
                    v-model.number="vrms"
                    type="range"
                    min="10"
                    max="240"
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>10V</span>
                    <span>240V</span>
                  </div>
                </div>

                <!-- Firing Angle -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Firing Angle (α)</span>
                    <span class="text-primary">{{ firingAngle }}°</span>
                  </label>
                  <input
                    v-model.number="firingAngle"
                    type="range"
                    min="0"
                    max="180"
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0°</span>
                    <span>180°</span>
                  </div>
                </div>

                <!-- Circuit Type -->
                <div>
                  <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Circuit Type</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      @click="circuitType = 'half-wave'"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        circuitType === 'half-wave'
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      Half-Wave
                    </button>
                    <button
                      @click="circuitType = 'full-wave'"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        circuitType === 'full-wave'
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      Full-Wave
                    </button>
                  </div>
                </div>

                <!-- Load Type -->
                <div>
                  <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Load Type</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      @click="loadType = 'resistive'"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        loadType === 'resistive'
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      Resistive
                    </button>
                    <button
                      @click="loadType = 'inductive'"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        loadType === 'inductive'
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]"
                    >
                      Inductive
                    </button>
                  </div>
                </div>

                <!-- Load Resistance -->
                <div>
                  <label class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <span>Load Resistance</span>
                    <span class="text-primary">{{ loadResistance }}Ω</span>
                  </label>
                  <input
                    v-model.number="loadResistance"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                  >
                  <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1Ω</span>
                    <span>100Ω</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Quick Presets</h3>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="applyPreset('max-power')"
                  class="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Max Power<br><span class="text-xs opacity-80">α = 0°</span>
                </button>
                <button
                  @click="applyPreset('half-power')"
                  class="px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Half Power<br><span class="text-xs opacity-80">α = 90°</span>
                </button>
                <button
                  @click="applyPreset('low-power')"
                  class="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Low Power<br><span class="text-xs opacity-80">α = 120°</span>
                </button>
                <button
                  @click="applyPreset('min-power')"
                  class="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Min Power<br><span class="text-xs opacity-80">α = 180°</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Results & Visualization -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Waveform Display -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Output Waveform</h3>
              <svg viewBox="0 0 600 300" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Grid -->
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-600" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="600" height="300" fill="url(#grid)" />
                
                <!-- Axis -->
                <line x1="50" y1="150" x2="580" y2="150" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
                <line x1="50" y1="20" x2="50" y2="280" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5" opacity="0.5"/>
                
                <!-- Labels -->
                <text x="590" y="155" font-size="12" fill="#6B7280" font-weight="bold">ωt</text>
                <text x="30" y="20" font-size="12" fill="#6B7280" font-weight="bold">V</text>
                <text x="50" y="295" font-size="10" fill="#6B7280">0°</text>
                <text x="170" y="295" font-size="10" fill="#6B7280">90°</text>
                <text x="290" y="295" font-size="10" fill="#6B7280">180°</text>
                <text x="410" y="295" font-size="10" fill="#6B7280">270°</text>
                <text x="520" y="295" font-size="10" fill="#6B7280">360°</text>

                <!-- Input waveform (sinusoid - dashed gray) -->
                <path
                  :d="generateInputWaveform()"
                  fill="none"
                  stroke="#9CA3AF"
                  stroke-width="2"
                  stroke-dasharray="8,4"
                  opacity="0.6"
                />

                <!-- Output waveform (controlled) -->
                <path
                  :d="generateOutputWaveform()"
                  :stroke="circuitType === 'full-wave' ? '#3B82F6' : '#8B5CF6'"
                  fill="none"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Firing angle indicator -->
                <line
                  :x1="50 + (firingAngle / 360) * 520"
                  y1="20"
                  :x2="50 + (firingAngle / 360) * 520"
                  y2="280"
                  stroke="#EF4444"
                  stroke-width="2"
                  stroke-dasharray="5,5"
                />
                <text
                  :x="50 + (firingAngle / 360) * 520"
                  y="15"
                  font-size="11"
                  fill="#EF4444"
                  font-weight="bold"
                  text-anchor="middle"
                >α = {{ firingAngle }}°</text>

                <!-- Conduction angle indicator -->
                <line
                  :x1="50 + (firingAngle / 360) * 520"
                  y1="270"
                  :x2="50 + ((firingAngle + conductionAngle) / 360) * 520"
                  y2="270"
                  stroke="#10B981"
                  stroke-width="4"
                />
                <text
                  :x="50 + ((firingAngle + conductionAngle / 2) / 360) * 520"
                  y="285"
                  font-size="10"
                  fill="#10B981"
                  font-weight="bold"
                  text-anchor="middle"
                >θ = {{ conductionAngle.toFixed(1) }}°</text>

                <!-- Peak voltage markers -->
                <text x="50" y="45" font-size="10" fill="#3B82F6" font-weight="bold">+V_m</text>
                <text x="50" y="260" font-size="10" fill="#3B82F6" font-weight="bold">-V_m</text>

                <!-- Legend -->
                <g transform="translate(420, 20)">
                  <rect width="160" height="65" fill="white" fill-opacity="0.9" stroke="#E5E7EB" rx="5"/>
                  <line x1="10" y1="15" x2="40" y2="15" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="8,4"/>
                  <text x="50" y="19" font-size="10" fill="#374151">Input</text>
                  <line x1="10" y1="35" x2="40" y2="35" :stroke="circuitType === 'full-wave' ? '#3B82F6' : '#8B5CF6'" stroke-width="3"/>
                  <text x="50" y="39" font-size="10" fill="#374151">Output</text>
                  <line x1="10" y1="55" x2="40" y2="55" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5"/>
                  <text x="50" y="59" font-size="10" fill="#374151">Firing Angle</text>
                </g>
              </svg>
            </div>

            <!-- Calculated Results -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Peak Voltage</div>
                <div class="text-2xl font-bold">{{ peakVoltage.toFixed(2) }}V</div>
                <div class="text-xs opacity-70 mt-1">V_m = V_rms × √2</div>
              </div>
              
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">Avg. Output</div>
                <div class="text-2xl font-bold">{{ avgVoltage.toFixed(2) }}V</div>
                <div class="text-xs opacity-70 mt-1">DC Voltage</div>
              </div>
              
              <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">RMS Output</div>
                <div class="text-2xl font-bold">{{ rmsOutputVoltage.toFixed(2) }}V</div>
                <div class="text-xs opacity-70 mt-1">Effective Voltage</div>
              </div>
              
              <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                <div class="text-sm opacity-80 mb-1">DC Power</div>
                <div class="text-2xl font-bold">{{ dcPower.toFixed(2) }}W</div>
                <div class="text-xs opacity-70 mt-1">P = V²/R</div>
              </div>
            </div>

            <!-- Additional Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Additional Parameters</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Conduction Angle</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ conductionAngle.toFixed(1) }}°</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">θ = 180° - α</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power Factor</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ powerFactor.toFixed(3) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Displacement PF</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">RMS Current</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ rmsCurrent.toFixed(2) }}A</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">I = V/R</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Form Factor</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ formFactor.toFixed(3) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">FF = V_rms/V_avg</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Ripple Factor</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ rippleFactor.toFixed(3) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">RF = √(FF² - 1)</div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficiency</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ efficiency.toFixed(1) }}%</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">V_avg/V_m × 100</div>
                </div>
              </div>
            </div>

            <!-- Power Analysis -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Power Analysis</h3>
              <div class="space-y-4">
                <!-- Power vs Firing Angle Chart -->
                <div class="relative h-48 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 400 150" class="w-full h-full">
                    <!-- Grid lines -->
                    <line x1="40" y1="20" x2="40" y2="120" stroke="#9CA3AF" stroke-width="1"/>
                    <line x1="40" y1="120" x2="380" y2="120" stroke="#9CA3AF" stroke-width="1"/>
                    
                    <!-- Y-axis labels -->
                    <text x="35" y="25" font-size="9" fill="#6B7280" text-anchor="end">100%</text>
                    <text x="35" y="70" font-size="9" fill="#6B7280" text-anchor="end">50%</text>
                    <text x="35" y="115" font-size="9" fill="#6B7280" text-anchor="end">0%</text>
                    
                    <!-- X-axis labels -->
                    <text x="40" y="135" font-size="9" fill="#6B7280" text-anchor="middle">0°</text>
                    <text x="210" y="135" font-size="9" fill="#6B7280" text-anchor="middle">90°</text>
                    <text x="380" y="135" font-size="9" fill="#6B7280" text-anchor="middle">180°</text>
                    
                    <!-- Power curve -->
                    <path
                      :d="generatePowerCurve()"
                      fill="none"
                      stroke="#EF4444"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    
                    <!-- Current operating point -->
                    <circle
                      :cx="40 + (firingAngle / 180) * 340"
                      :cy="120 - (efficiency / 100) * 100"
                      r="6"
                      fill="#3B82F6"
                      stroke="white"
                      stroke-width="2"
                    />
                    
                    <!-- Operating point label -->
                    <text
                      :x="40 + (firingAngle / 180) * 340"
                      :y="120 - (efficiency / 100) * 100 - 10"
                      font-size="9"
                      fill="#3B82F6"
                      font-weight="bold"
                      text-anchor="middle"
                    >{{ efficiency.toFixed(1) }}%</text>
                  </svg>
                </div>
                
                <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Firing Angle: {{ firingAngle }}°</span>
                  <span class="font-semibold text-primary">Power Output: {{ efficiency.toFixed(1) }}% of maximum</span>
                </div>
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
            📚 Understanding SCR Firing Angle Control
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an SCR?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A Silicon Controlled Rectifier (SCR) is a four-layer solid-state semiconductor device that controls 
              current flow. It acts like a controlled diode that only conducts when triggered by a gate signal 
              and remains conducting until the current drops below a threshold level.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Firing Angle Control:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Firing Angle (α):</strong> The delay angle after the zero-crossing point at which the SCR is triggered</li>
              <li><strong>Conduction Angle (θ):</strong> The duration the SCR conducts, typically θ = 180° - α for half-wave</li>
              <li><strong>Control Principle:</strong> By varying α, we control the average DC output voltage</li>
              <li><strong>Power Range:</strong> From 0% power (α = 180°) to 100% power (α = 0°)</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <p><strong>Peak Voltage:</strong> V_m = V_rms × √2</p>
              <p><strong>Half-Wave Average:</strong> V_avg = V_m × (1 + cos(α)) / 2π</p>
              <p><strong>Full-Wave Average:</strong> V_avg = 2V_m × (1 + cos(α)) / 2π</p>
              <p><strong>Conduction Angle:</strong> θ = 180° - α</p>
              <p><strong>RMS Output (Half-Wave):</strong> V_rms = V_m × √((π - α + sin(2α)/2) / 2π)</p>
              <p><strong>Power Factor:</strong> PF = cos(α/2) (approximate for resistive load)</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Circuit Types:</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="text-left py-2">Type</th>
                    <th class="text-left py-2">Average Voltage</th>
                    <th class="text-left py-2">Applications</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">Half-Wave</td>
                    <td class="py-2">V_m(1+cosα)/2π</td>
                    <td class="py-2">Low power battery charging</td>
                  </tr>
                  <tr>
                    <td class="py-2">Full-Wave</td>
                    <td class="py-2">2V_m(1+cosα)/2π</td>
                    <td class="py-2">Motor control, heating</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Load Types:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Resistive Load:</strong> Current and voltage are in phase, simpler to analyze</li>
              <li><strong>Inductive Load:</strong> Current lags voltage, SCR may not turn off at voltage zero-crossing, requires freewheeling diode</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="font-semibold text-blue-800 dark:text-blue-300 mb-2">🏭 Industrial</div>
                <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• DC motor speed control</li>
                  <li>• Industrial heating</li>
                  <li>• Welding machines</li>
                  <li>• Electroplating</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="font-semibold text-green-800 dark:text-green-300 mb-2">🏠 Consumer</div>
                <ul class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Light dimmers</li>
                  <li>• Fan speed control</li>
                  <li>• Battery chargers</li>
                  <li>• Power supplies</li>
                </ul>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Harmonics:</strong> SCR control generates harmonics that can affect power quality</li>
              <li><strong>Power Factor:</strong> Decreases as firing angle increases, requiring correction for large installations</li>
              <li><strong>Gate Triggering:</strong> Requires proper pulse transformer or optocoupler isolation</li>
              <li><strong>Snubber Circuits:</strong> RC networks protect against voltage transients</li>
              <li><strong>Heat Sinking:</strong> SCRs dissipate significant heat during conduction</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input parameters
const vrms = ref(120)
const firingAngle = ref(60)
const circuitType = ref('half-wave')
const loadType = ref('resistive')
const loadResistance = ref(10)

// Computed values
const peakVoltage = computed(() => {
  return vrms.value * Math.sqrt(2)
})

const avgVoltage = computed(() => {
  const alphaRad = (firingAngle.value * Math.PI) / 180
  const vm = peakVoltage.value
  
  if (circuitType.value === 'half-wave') {
    return vm * (1 + Math.cos(alphaRad)) / (2 * Math.PI)
  } else {
    // Full-wave controlled rectifier
    return 2 * vm * (1 + Math.cos(alphaRad)) / (2 * Math.PI)
  }
})

const rmsOutputVoltage = computed(() => {
  const alphaRad = (firingAngle.value * Math.PI) / 180
  const vm = peakVoltage.value
  
  if (circuitType.value === 'half-wave') {
    // Half-wave RMS
    return vm * Math.sqrt((Math.PI - alphaRad + Math.sin(2 * alphaRad) / 2) / (2 * Math.PI))
  } else {
    // Full-wave RMS
    return vm * Math.sqrt((Math.PI - alphaRad + Math.sin(2 * alphaRad) / 2) / Math.PI)
  }
})

const conductionAngle = computed(() => {
  return 180 - firingAngle.value
})

const dcPower = computed(() => {
  return (avgVoltage.value * avgVoltage.value) / loadResistance.value
})

const rmsCurrent = computed(() => {
  return rmsOutputVoltage.value / loadResistance.value
})

const powerFactor = computed(() => {
  const alphaRad = (firingAngle.value * Math.PI) / 180
  // Approximate displacement power factor
  return Math.abs(Math.cos(alphaRad / 2))
})

const formFactor = computed(() => {
  return rmsOutputVoltage.value / avgVoltage.value
})

const rippleFactor = computed(() => {
  return Math.sqrt(formFactor.value * formFactor.value - 1)
})

const efficiency = computed(() => {
  const vm = peakVoltage.value
  const maxAvg = circuitType.value === 'half-wave' ? vm / Math.PI : 2 * vm / Math.PI
  return (avgVoltage.value / maxAvg) * 100
})

// Generate waveform paths
const generateInputWaveform = () => {
  const points = []
  for (let i = 0; i <= 360; i += 5) {
    const x = 50 + (i / 360) * 520
    const y = 150 - 100 * Math.sin((i * Math.PI) / 180)
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
}

const generateOutputWaveform = () => {
  const points = []
  const alpha = firingAngle.value
  const vm = peakVoltage.value
  const scale = 100 / vm
  
  if (circuitType.value === 'half-wave') {
    // Half-wave controlled rectifier
    for (let i = 0; i <= 360; i += 5) {
      const x = 50 + (i / 360) * 520
      let y
      
      if (i >= alpha && i <= 180) {
        // Conducting
        y = 150 - 100 * Math.sin((i * Math.PI) / 180)
      } else {
        // Not conducting
        y = 150
      }
      
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
    }
  } else {
    // Full-wave controlled rectifier
    for (let i = 0; i <= 360; i += 5) {
      const x = 50 + (i / 360) * 520
      let y
      
      if ((i >= alpha && i <= 180) || (i >= 180 + alpha && i <= 360)) {
        // Conducting (both positive and negative half-cycles)
        const angle = i <= 180 ? i : i - 180
        y = 150 - 100 * Math.abs(Math.sin((angle * Math.PI) / 180))
      } else {
        // Not conducting
        y = 150
      }
      
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
    }
  }
  
  return points.join(' ')
}

const generatePowerCurve = () => {
  const points = []
  for (let i = 0; i <= 180; i += 2) {
    const x = 40 + (i / 180) * 340
    const alphaRad = (i * Math.PI) / 180
    const vm = peakVoltage.value
    
    let avg
    if (circuitType.value === 'half-wave') {
      avg = vm * (1 + Math.cos(alphaRad)) / (2 * Math.PI)
    } else {
      avg = 2 * vm * (1 + Math.cos(alphaRad)) / (2 * Math.PI)
    }
    
    const maxAvg = circuitType.value === 'half-wave' ? vm / Math.PI : 2 * vm / Math.PI
    const eff = (avg / maxAvg) * 100
    
    const y = 120 - eff
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  return points.join(' ')
}

// Quick presets
const applyPreset = (preset) => {
  switch (preset) {
    case 'max-power':
      firingAngle.value = 0
      break
    case 'half-power':
      firingAngle.value = 90
      break
    case 'low-power':
      firingAngle.value = 120
      break
    case 'min-power':
      firingAngle.value = 180
      break
  }
}
</script>

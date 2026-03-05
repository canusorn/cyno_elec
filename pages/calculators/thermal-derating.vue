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
            Thermal Derating Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate component power derating at elevated temperatures with interactive derating curves
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-red-600">P_derated</span> = <span class="text-blue-600">P_rated</span> × (1 - <span class="text-amber-600">derate_factor</span> × (T - T_ref))
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Linear Derating Formula</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 mb-8">
          <!-- Input Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Component Parameters
            </h3>
            
            <!-- Component Type -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Component Type
              </label>
              <select
                v-model="componentType"
                @change="updatePreset"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="resistor">Resistor (Axial/Thin Film)</option>
                <option value="resistor_smd">Resistor (SMD)</option>
                <option value="capacitor_electrolytic">Capacitor (Electrolytic)</option>
                <option value="capacitor_ceramic">Capacitor (Ceramic)</option>
                <option value="diode_standard">Diode (Standard)</option>
                <option value="diode_power">Diode (Power)</option>
                <option value="transistor_small">Transistor (Small Signal)</option>
                <option value="transistor_power">Transistor (Power)</option>
                <option value="ic_linear">IC (Linear Regulator)</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <!-- Rated Power -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rated Power (Prated)
                <span class="text-gray-400 font-normal">- At reference temperature</span>
              </label>
              <div class="flex gap-3">
                <input
                  v-model.number="ratedPower"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="Enter rated power"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <select
                  v-model="powerUnit"
                  class="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="mW">mW</option>
                  <option value="W">W</option>
                  <option value="kW">kW</option>
                </select>
              </div>
              <input
                v-model.number="ratedPower"
                type="range"
                :min="componentType.includes('small') || componentType.includes('smd') ? 0.0625 : 0.1"
                :max="componentType.includes('power') ? 250 : 5"
                :step="componentType.includes('power') ? 10 : 0.125"
                @input="convertPowerUnit"
                class="w-full mt-2"
              >
            </div>

            <!-- Reference Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Reference Temperature (Tref)
                <span class="text-gray-400 font-normal">- Full power rating</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="referenceTemperature"
                  type="number"
                  step="1"
                  min="-55"
                  max="125"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">°C</span>
              </div>
              <input
                v-model.number="referenceTemperature"
                type="range"
                min="-55"
                max="125"
                step="1"
                class="w-full mt-2"
              >
            </div>

            <!-- Maximum Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Maximum Temperature (Tmax)
                <span class="text-gray-400 font-normal">- Zero power rating</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="maxTemperature"
                  type="number"
                  step="1"
                  min="50"
                  max="200"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">°C</span>
              </div>
              <input
                v-model.number="maxTemperature"
                type="range"
                min="50"
                max="200"
                step="1"
                class="w-full mt-2"
              >
            </div>

            <!-- Operating Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Operating Temperature (Top)
                <span class="text-gray-400 font-normal">- Current ambient temperature</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="operatingTemperature"
                  type="number"
                  step="1"
                  min="-55"
                  max="200"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">°C</span>
              </div>
              <input
                v-model.number="operatingTemperature"
                type="range"
                :min="referenceTemperature"
                :max="maxTemperature"
                step="1"
                class="w-full mt-2"
              >
            </div>

            <!-- Derating Type -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Derating Curve Type
              </label>
              <select
                v-model="deratingType"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="linear">Linear (Standard)</option>
                <option value="step">Step (Discrete)</option>
                <option value="exponential">Exponential</option>
              </select>
            </div>

            <!-- Reset Button -->
            <button
              @click="resetParameters"
              class="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Reset Parameters
            </button>
          </div>

          <!-- Results Panel -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Derating Results
            </h3>

            <!-- Derating Curve Visualization -->
            <div class="mb-8">
              <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Power Derating Curve</h4>
              <svg viewBox="0 0 500 300" class="w-full h-auto bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Grid -->
                <defs>
                  <pattern id="thermalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                  </pattern>
                </defs>
                <rect x="60" y="40" width="400" height="220" fill="url(#thermalGrid)" />
                
                <!-- Axes -->
                <line x1="60" y1="40" x2="60" y2="260" stroke="#374151" stroke-width="2"/>
                <line x1="60" y1="260" x2="460" y2="260" stroke="#374151" stroke-width="2"/>
                
                <!-- Y-axis labels (Power) -->
                <text x="50" y="265" text-anchor="end" :font-size="11" fill="#6B7280">0</text>
                <text x="50" y="160" text-anchor="end" :font-size="11" fill="#6B7280">50%</text>
                <text x="50" y="55" text-anchor="end" :font-size="11" fill="#6B7280">100%</text>
                <text x="30" y="150" text-anchor="middle" :font-size="12" font-weight="bold" fill="#374151" transform="rotate(-90, 30, 150)">Power (%)</text>
                
                <!-- X-axis labels (Temperature) -->
                <text x="60" y="280" text-anchor="middle" :font-size="11" fill="#6B7280">{{ referenceTemperature }}°C</text>
                <text x="260" y="280" text-anchor="middle" :font-size="11" fill="#6B7280">{{ Math.round((referenceTemperature + maxTemperature) / 2) }}°C</text>
                <text x="460" y="280" text-anchor="middle" :font-size="11" fill="#6B7280">{{ maxTemperature }}°C</text>
                <text x="260" y="295" text-anchor="middle" :font-size="12" font-weight="bold" fill="#374151">Temperature (°C)</text>
                
                <!-- Derating curve -->
                <path 
                  :d="deratingCurvePath"
                  fill="url(#deratingGradient)"
                  stroke="#EF4444"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                
                <!-- Operating point marker -->
                <line 
                  :x1="60 + ((operatingTemperature - referenceTemperature) / (maxTemperature - referenceTemperature)) * 400"
                  y1="260"
                  :x2="60 + ((operatingTemperature - referenceTemperature) / (maxTemperature - referenceTemperature)) * 400"
                  :y2="260 - (calculateDerating(operatingTemperature) / 100) * 220"
                  stroke="#3B82F6"
                  stroke-width="2"
                  stroke-dasharray="4,4"
                />
                
                <circle 
                  :cx="60 + ((operatingTemperature - referenceTemperature) / (maxTemperature - referenceTemperature)) * 400"
                  :cy="260 - (calculateDerating(operatingTemperature) / 100) * 220"
                  r="8"
                  fill="#3B82F6"
                  stroke="white"
                  stroke-width="2"
                  class="animate-pulse"
                />
                
                <!-- Operating point label -->
                <text 
                  :x="60 + ((operatingTemperature - referenceTemperature) / (maxTemperature - referenceTemperature)) * 400"
                  :y="260 - (calculateDerating(operatingTemperature) / 100) * 220 - 15"
                  text-anchor="middle"
                  :font-size="11"
                  fill="#3B82F6"
                  font-weight="bold"
                >
                  {{ operatingTemperature }}°C
                </text>
                
                <!-- Safe/Warning zone indicator -->
                <rect 
                  v-if="calculateDerating(operatingTemperature) < 50"
                  x="60"
                  y="40"
                  width="400"
                  height="220"
                  fill="url(#warningGradient)"
                  opacity="0.3"
                />
                
                <defs>
                  <linearGradient id="deratingGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#EF4444;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#22C55E;stop-opacity:0.6" />
                  </linearGradient>
                  <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#EF4444;stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <!-- Results Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div class="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">Rated Power</div>
                <div class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ formatPower(ratedPowerBase) }}</div>
                <div class="text-xs text-blue-500 dark:text-blue-400 mt-1">At {{ referenceTemperature }}°C</div>
              </div>
              
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <div class="text-sm text-red-600 dark:text-red-400 font-semibold mb-1">Derated Power</div>
                <div class="text-2xl font-bold text-red-700 dark:text-red-300">{{ formatPower(deratedPower) }}</div>
                <div class="text-xs text-red-500 dark:text-red-400 mt-1">At {{ operatingTemperature }}°C</div>
              </div>
              
              <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <div class="text-sm text-amber-600 dark:text-amber-400 font-semibold mb-1">Derating Percentage</div>
                <div class="text-2xl font-bold text-amber-700 dark:text-amber-300">{{ deratingPercentage.toFixed(1) }}%</div>
                <div class="text-xs text-amber-500 dark:text-amber-400 mt-1">Of rated power</div>
              </div>
              
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div class="text-sm text-green-600 dark:text-green-400 font-semibold mb-1">Temperature Margin</div>
                <div class="text-2xl font-bold text-green-700 dark:text-green-300">{{ temperatureMargin.toFixed(0) }}°C</div>
                <div class="text-xs text-green-500 dark:text-green-400 mt-1">To max temperature</div>
              </div>
            </div>

            <!-- Status Indicator -->
            <div class="mt-4" :class="getStatusClass()">
              <div class="text-sm font-semibold mb-1">{{ getStatusTitle() }}</div>
              <div class="text-xs">{{ getStatusMessage() }}</div>
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
            📚 Understanding Thermal Derating
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Thermal Derating?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Thermal derating is the practice of reducing the maximum power rating of electronic components as temperature increases. 
              This ensures reliable operation and prevents component failure due to excessive heat.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Derating is Necessary:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Reliability:</strong> Higher temperatures accelerate component aging and reduce lifespan</li>
              <li><strong>Performance:</strong> Component parameters drift with temperature, affecting circuit performance</li>
              <li><strong>Safety:</strong> Preventing thermal runaway and catastrophic failures</li>
              <li><strong>Warranty:</strong> Many manufacturers require derating for warranty coverage</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Derating Curve Types:</h3>
            <div class="grid md:grid-cols-3 gap-4 mb-4">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Linear</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Power decreases linearly from Tref to Tmax. Most common for resistors and semiconductors.</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Power reduces in discrete steps. Common for ICs with specific temperature ratings.</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Exponential</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Power decreases exponentially. Used for components with extreme temperature sensitivity.</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Typical Derating Values:</h3>
            <div class="overflow-x-auto mb-4">
              <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead class="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Component</th>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Tref</th>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Tmax</th>
                    <th class="px-4 py-2 text-left text-sm font-semibold text-gray-800 dark:text-gray-200">Derating</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-300 dark:divide-gray-600 text-sm">
                  <tr>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Resistor (Metal Film)</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">70°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">155°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Linear</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Resistor (SMD)</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">70°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">155°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Linear</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Capacitor (Electrolytic)</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">85°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">105°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Linear (20%/°C)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Diode (Power)</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">25°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">150°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Linear</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">IC (Linear)</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">50°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">125°C</td>
                    <td class="px-4 py-2 text-gray-600 dark:text-gray-300">Linear</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Guidelines:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Conservative Design:</strong> Derate components by 20-50% for critical applications</li>
              <li><strong>Temperature Margin:</strong> Keep at least 20°C margin below Tmax for reliable operation</li>
              <li><strong>Heatsinking:</strong> Use heatsinks to reduce junction temperature and improve power handling</li>
              <li><strong>Airflow:</strong> Ensure adequate airflow or forced cooling for high-power applications</li>
              <li><strong>Measurement:</strong> Measure actual component temperature under worst-case conditions</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Arrhenius Equation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <code class="text-sm">
                Life ∝ e^(-Ea/kT)
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Component life approximately doubles for every 10°C reduction in temperature (Rule of Thumb). 
              This is why thermal derating significantly improves reliability and longevity.
            </p>
            
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700 dark:text-yellow-300 font-semibold">
                    Design Tip
                  </p>
                  <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                    Always design for the worst-case temperature scenario, not just typical operating conditions. 
                    Consider ambient temperature, self-heating, and nearby heat sources when calculating derating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const componentType = ref('resistor')
const ratedPower = ref(0.25) // in watts
const powerUnit = ref('W')
const referenceTemperature = ref(70) // °C
const maxTemperature = ref(155) // °C
const operatingTemperature = ref(85) // °C
const deratingType = ref('linear')

// Component presets
const componentPresets: Record<string, any> = {
  resistor: { ratedPower: 0.25, referenceTemp: 70, maxTemp: 155 },
  resistor_smd: { ratedPower: 0.125, referenceTemp: 70, maxTemp: 155 },
  capacitor_electrolytic: { ratedPower: 0, referenceTemp: 85, maxTemp: 105 }, // Not power rated
  capacitor_ceramic: { ratedPower: 0, referenceTemp: 85, maxTemp: 125 },
  diode_standard: { ratedPower: 0.5, referenceTemp: 25, maxTemp: 150 },
  diode_power: { ratedPower: 5, referenceTemp: 25, maxTemp: 175 },
  transistor_small: { ratedPower: 0.625, referenceTemp: 25, maxTemp: 150 },
  transistor_power: { ratedPower: 125, referenceTemp: 25, maxTemp: 200 },
  ic_linear: { ratedPower: 1, referenceTemp: 50, maxTemp: 125 },
  custom: { ratedPower: 1, referenceTemp: 70, maxTemp: 155 }
}

// Update preset when component type changes
const updatePreset = () => {
  const preset = componentPresets[componentType.value]
  if (preset) {
    ratedPower.value = preset.ratedPower
    referenceTemperature.value = preset.referenceTemp
    maxTemperature.value = preset.maxTemp
  }
}

// Convert power unit to base (watts)
const convertPowerUnit = () => {
  // Slider always works in watts
  if (powerUnit.value === 'mW') {
    ratedPower.value = ratedPower.value * 1000
  }
}

// Base power in watts
const ratedPowerBase = computed(() => {
  if (powerUnit.value === 'kW') return ratedPower.value * 1000
  if (powerUnit.value === 'mW') return ratedPower.value / 1000
  return ratedPower.value
})

// Calculate derating percentage at given temperature
const calculateDerating = (temp: number): number => {
  if (temp <= referenceTemperature.value) return 100
  if (temp >= maxTemperature.value) return 0
  
  const range = maxTemperature.value - referenceTemperature.value
  const position = temp - referenceTemperature.value
  
  switch (deratingType.value) {
    case 'linear':
      return 100 * (1 - position / range)
    case 'step':
      const steps = Math.floor(position / (range / 4))
      return 100 * (1 - steps * 0.25)
    case 'exponential':
      return 100 * Math.exp(-3 * position / range)
    default:
      return 100 * (1 - position / range)
  }
}

// Derated power
const deratedPower = computed(() => {
  const deratingFactor = calculateDerating(operatingTemperature.value) / 100
  return ratedPowerBase.value * deratingFactor
})

// Derating percentage
const deratingPercentage = computed(() => {
  return calculateDerating(operatingTemperature.value)
})

// Temperature margin
const temperatureMargin = computed(() => {
  return maxTemperature.value - operatingTemperature.value
})

// Format power for display
const formatPower = (value: number): string => {
  if (value === 0) return 'N/A'
  if (value >= 1000) return `${(value / 1000).toFixed(2)} kW`
  if (value >= 1) return `${value.toFixed(3)} W`
  if (value >= 0.001) return `${(value * 1000).toFixed(1)} mW`
  return `${(value * 1000000).toFixed(0)} µW`
}

// Status functions
const getStatusClass = () => {
  const drating = deratingPercentage.value
  if (drating >= 80) return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-lg'
  if (drating >= 50) return 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg'
  return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg'
}

const getStatusTitle = () => {
  const drating = deratingPercentage.value
  if (drating >= 80) return '✅ Good'
  if (drating >= 50) return '⚠️ Warning'
  return '🔴 Critical'
}

const getStatusMessage = () => {
  const drating = deratingPercentage.value
  if (drating >= 80) return 'Component operating within safe limits with adequate margin.'
  if (drating >= 50) return 'Component approaching derating limits. Consider cooling or reducing power.'
  return 'Component operating near maximum temperature. Immediate action required.'
}

// Derating curve path for SVG
const deratingCurvePath = computed(() => {
  const points: [number, number][] = []
  const steps = 50
  const tempRange = maxTemperature.value - referenceTemperature.value
  
  for (let i = 0; i <= steps; i++) {
    const temp = referenceTemperature.value + (i / steps) * tempRange
    const derating = calculateDerating(temp)
    
    const x = 60 + (i / steps) * 400
    const y = 260 - (derating / 100) * 220
    
    points.push([x, y])
  }
  
  if (points.length === 0) return ''
  
  // Close the path
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  
  let path = `M ${firstPoint[0]} ${firstPoint[1]}`
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i][0]} ${points[i][1]}`
  }
  path += ` L ${lastPoint[0]} 260 L ${firstPoint[0]} 260 Z`
  
  return path
})

// Reset parameters
const resetParameters = () => {
  componentType.value = 'resistor'
  ratedPower.value = 0.25
  powerUnit.value = 'W'
  referenceTemperature.value = 70
  maxTemperature.value = 155
  operatingTemperature.value = 85
  deratingType.value = 'linear'
  updatePreset()
}

// Initialize
updatePreset()
</script>

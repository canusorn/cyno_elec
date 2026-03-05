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
            Diode Characteristic Curve
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Interactive simulation of diode V-I characteristics with forward and reverse bias analysis
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-green-600">Forward:</span> I = Is × (e^(Vd/nVt) - 1) &nbsp;&nbsp;|&nbsp;&nbsp; 
              <span class="text-red-600">Reverse:</span> I ≈ -Is
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Shockley Diode Equation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulation -->
    <section class="pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-8 mb-8">
          <!-- Control Panel -->
          <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Diode Parameters
            </h3>
            
            <!-- Diode Type -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Diode Type
              </label>
              <select
                v-model="diodeType"
                @change="updateDiodeParameters"
                class="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="silicon">Silicon (Si) - Vf ≈ 0.7V</option>
                <option value="germanium">Germanium (Ge) - Vf ≈ 0.3V</option>
                <option value="schottky">Schottky - Vf ≈ 0.3V</option>
                <option value="led_red">LED Red - Vf ≈ 1.8V</option>
                <option value="led_white">LED White - Vf ≈ 3.0V</option>
                <option value="zener">Zener Diode - Vz = 5.1V</option>
              </select>
            </div>

            <!-- Saturation Current -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Saturation Current (Is)
                <span class="text-gray-400 font-normal text-xs">- Reverse leakage current</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="saturationCurrent"
                  type="number"
                  step="any"
                  min="1e-15"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">A</span>
              </div>
              <input
                v-model.number="saturationCurrent"
                type="range"
                :min="diodeType === 'led_white' ? 1e-12 : 1e-15"
                :max="diodeType === 'led_white' ? 1e-9 : 1e-12"
                step="any"
                class="w-full mt-2"
              >
            </div>

            <!-- Thermal Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Thermal Voltage (Vt)
                <span class="text-gray-400 font-normal text-xs">- Temperature dependent</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="thermalVoltage"
                  type="number"
                  step="0.001"
                  min="0.01"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">V</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Vt = kT/q ≈ 25.85mV at 25°C (298K)
              </p>
            </div>

            <!-- Ideality Factor -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Ideality Factor (n)
                <span class="text-gray-400 font-normal text-xs">- Emission coefficient</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="idealityFactor"
                  type="number"
                  step="0.1"
                  min="1"
                  max="3"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
              </div>
              <input
                v-model.number="idealityFactor"
                type="range"
                min="1"
                max="3"
                step="0.1"
                class="w-full mt-2"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                n = 1 (ideal), n ≈ 1-2 (real diodes)
              </p>
            </div>

            <!-- Temperature -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Temperature (T)
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="temperature"
                  type="number"
                  step="1"
                  min="-50"
                  max="150"
                  @input="updateThermalVoltage"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">°C</span>
              </div>
              <input
                v-model.number="temperature"
                type="range"
                min="-50"
                max="150"
                step="1"
                @input="updateThermalVoltage"
                class="w-full mt-2"
              >
            </div>

            <!-- Zener Voltage (for Zener diode) -->
            <div v-if="diodeType === 'zener'" class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Zener Breakdown Voltage (Vz)
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="zenerVoltage"
                  type="number"
                  step="0.1"
                  min="1"
                  max="50"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">V</span>
              </div>
              <input
                v-model.number="zenerVoltage"
                type="range"
                min="1"
                max="50"
                step="0.1"
                class="w-full mt-2"
              >
            </div>

            <!-- Series Resistance -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Series Resistance (Rs)
                <span class="text-gray-400 font-normal text-xs">- Bulk resistance</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="seriesResistance"
                  type="number"
                  step="0.1"
                  min="0"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">Ω</span>
              </div>
              <input
                v-model.number="seriesResistance"
                type="range"
                min="0"
                max="10"
                step="0.1"
                class="w-full mt-2"
              >
            </div>

            <!-- Test Voltage -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Test Voltage (Vd)
                <span class="text-gray-400 font-normal text-xs">- Applied diode voltage</span>
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="testVoltage"
                  type="number"
                  step="0.01"
                  class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                <span class="text-sm text-gray-500 dark:text-gray-400">V</span>
              </div>
              <input
                v-model.number="testVoltage"
                type="range"
                :min="diodeType === 'zener' ? -10 : -2"
                :max="diodeType === 'led_white' ? 4 : 2"
                step="0.01"
                class="w-full mt-2"
              >
            </div>

            <!-- Reset Button -->
            <button
              @click="resetParameters"
              class="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Reset Parameters
            </button>
          </div>

          <!-- Graph Panel -->
          <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              V-I Characteristic Curve
            </h3>
            
            <!-- SVG Graph -->
            <svg viewBox="0 0 600 400" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <!-- Grid -->
              <defs>
                <pattern id="diodeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                </pattern>
                <linearGradient id="forwardGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#22C55E;stop-opacity:0.2" />
                  <stop offset="100%" style="stop-color:#22C55E;stop-opacity:0.6" />
                </linearGradient>
                <linearGradient id="reverseGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#EF4444;stop-opacity:0.2" />
                  <stop offset="100%" style="stop-color:#EF4444;stop-opacity:0.6" />
                </linearGradient>
              </defs>
              <rect x="60" y="40" width="480" height="300" fill="url(#diodeGrid)" />
              
              <!-- Axes -->
              <line x1="300" y1="40" x2="300" y2="340" stroke="#374151" stroke-width="2"/>
              <line x1="60" y1="190" x2="540" y2="190" stroke="#374151" stroke-width="2"/>
              
              <!-- Axis Labels -->
              <text x="300" y="30" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151">Current (I)</text>
              <text x="560" y="195" text-anchor="middle" :font-size="14" font-weight="bold" fill="#374151">Voltage (Vd)</text>
              
              <!-- Y-axis ticks -->
              <text x="290" y="50" text-anchor="end" :font-size="10" fill="#6B7280">+Imax</text>
              <text x="290" y="105" text-anchor="end" :font-size="10" fill="#6B7280">+0.75</text>
              <text x="290" y="147" text-anchor="end" :font-size="10" fill="#6B7280">+0.5</text>
              <text x="290" y="190" text-anchor="end" :font-size="10" fill="#6B7280">0</text>
              <text x="290" y="235" text-anchor="end" :font-size="10" fill="#6B7280">-0.5</text>
              <text x="290" y="280" text-anchor="end" :font-size="10" fill="#6B7280">-0.75</text>
              <text x="290" y="330" text-anchor="end" :font-size="10" fill="#6B7280">-Is</text>
              
              <!-- X-axis ticks -->
              <text x="540" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">+Vmax</text>
              <text x="480" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">+0.5</text>
              <text x="390" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">+0.25</text>
              <text x="300" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">0</text>
              <text x="210" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">-0.25</text>
              <text x="120" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">-0.5</text>
              <text x="60" y="205" text-anchor="middle" :font-size="10" fill="#6B7280">-Vmax</text>
              
              <!-- Forward bias curve -->
              <path 
                :d="forwardCurvePath"
                fill="none"
                stroke="#22C55E"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Reverse bias curve -->
              <path 
                :d="reverseCurvePath"
                fill="none"
                stroke="#EF4444"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              
              <!-- Operating point marker -->
              <circle 
                v-if="testVoltage >= 0"
                :cx="300 + (testVoltage / xMaxForward) * 240"
                :cy="190 - (calculateCurrent(testVoltage) / yMaxForward) * 150"
                r="8"
                fill="#3B82F6"
                stroke="white"
                stroke-width="2"
                class="animate-pulse"
              />
              <circle 
                v-else
                :cx="300 + (testVoltage / xMaxReverse) * 240"
                :cy="190 - (calculateCurrent(testVoltage) / yMaxReverse) * 140"
                r="8"
                fill="#3B82F6"
                stroke="white"
                stroke-width="2"
                class="animate-pulse"
              />
              
              <!-- Forward voltage indicator -->
              <line 
                x1="300"
                y1="190"
                :x2="300 + (testVoltage >= 0 ? (getForwardVoltage() / xMaxForward) * 240 : 0)"
                y2="190"
                stroke="#F59E0B"
                stroke-width="2"
                stroke-dasharray="4,4"
                v-if="testVoltage >= 0"
              />
              <text 
                v-if="testVoltage >= 0"
                :x="300 + (getForwardVoltage() / xMaxForward) * 120"
                y="180"
                text-anchor="middle"
                :font-size="11"
                fill="#F59E0B"
                font-weight="bold"
              >
                Vf ≈ {{ getForwardVoltage().toFixed(2) }}V
              </text>
              
              <!-- Breakdown voltage indicator for Zener -->
              <line 
                v-if="diodeType === 'zener'"
                :x1="300 + (-zenerVoltage / xMaxReverse) * 240"
                :y1="40"
                :x2="300 + (-zenerVoltage / xMaxReverse) * 240"
                y2="340"
                stroke="#8B5CF6"
                stroke-width="1"
                stroke-dasharray="4,4"
              />
              <text 
                v-if="diodeType === 'zener'"
                :x="300 + (-zenerVoltage / xMaxReverse) * 240"
                y="355"
                text-anchor="middle"
                :font-size="10"
                fill="#8B5CF6"
                font-weight="bold"
              >
                Vz = {{ zenerVoltage }}V
              </text>
              
              <!-- Legend -->
              <rect x="420" y="50" width="110" height="70" fill="white" fill-opacity="0.9" rx="5" />
              <line x1="430" y1="65" x2="460" y2="65" stroke="#22C55E" stroke-width="3" stroke-linecap="round"/>
              <text x="470" y="69" :font-size="11" fill="#22C55E" font-weight="bold">Forward Bias</text>
              
              <line x1="430" y1="85" x2="460" y2="85" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
              <text x="470" y="89" :font-size="11" fill="#EF4444" font-weight="bold">Reverse Bias</text>
              
              <circle cx="445" cy="105" r="5" fill="#3B82F6" stroke="white" stroke-width="1"/>
              <text x="470" y="109" :font-size="11" fill="#3B82F6" font-weight="bold">Operating Point</text>
            </svg>

            <!-- Current Values -->
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div class="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Test Voltage</div>
                <div class="text-lg font-bold text-blue-700 dark:text-blue-300">{{ testVoltage.toFixed(3) }} V</div>
              </div>
              
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div class="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Diode Current</div>
                <div class="text-lg font-bold text-green-700 dark:text-green-300">{{ formatCurrent(calculateCurrent(testVoltage)) }}</div>
              </div>
              
              <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                <div class="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">Forward Voltage</div>
                <div class="text-lg font-bold text-amber-700 dark:text-amber-300">{{ getForwardVoltage().toFixed(3) }} V</div>
              </div>
              
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <div class="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">Operating Mode</div>
                <div class="text-sm font-bold text-purple-700 dark:text-purple-300">{{ getOperatingMode() }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analysis Panel -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Diode Analysis
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Forward Bias Analysis -->
            <div class="border-l-4 border-green-500 pl-4">
              <h4 class="text-lg font-semibold text-green-700 dark:text-green-400 mb-3">Forward Bias Characteristics</h4>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• <strong>Knee Voltage:</strong> {{ getForwardVoltage().toFixed(2) }}V - Point where conduction begins</li>
                <li>• <strong>Forward Current:</strong> {{ formatCurrent(calculateCurrent(getForwardVoltage() * 1.5)) }} at 1.5×Vf</li>
                <li>• <strong>Dynamic Resistance:</strong> {{ calculateDynamicResistance().toFixed(2) }} Ω at operating point</li>
                <li>• <strong>Power Dissipation:</strong> {{ calculatePowerDissipation().toFixed(3) }} W</li>
              </ul>
            </div>
            
            <!-- Reverse Bias Analysis -->
            <div class="border-l-4 border-red-500 pl-4">
              <h4 class="text-lg font-semibold text-red-700 dark:text-red-400 mb-3">Reverse Bias Characteristics</h4>
              <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• <strong>Leakage Current:</strong> {{ formatCurrent(-saturationCurrent) }} (Is)</li>
                <li>• <strong>Breakdown Voltage:</strong> {{ diodeType === 'zener' ? zenerVoltage.toFixed(1) + 'V (Zener)' : 'PIV: ~' + (getForwardVoltage() * 10).toFixed(0) + 'V' }}</li>
                <li>• <strong>Reverse Resistance:</strong> {{ (1e6 / Math.abs(saturationCurrent) * 1e-9).toFixed(0) }} MΩ (approx.)</li>
                <li>• <strong>Temperature Effect:</strong> +2mV/°C for Vf, Is doubles every 10°C</li>
              </ul>
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
            📚 Understanding Diode Characteristics
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Diode?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A diode is a two-terminal semiconductor device that conducts current primarily in one direction (forward bias) 
              and blocks current in the opposite direction (reverse bias). This property makes it essential for rectification, 
              protection, and switching applications.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Shockley Diode Equation:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <code class="text-sm">
                I<sub>d</sub> = I<sub>s</sub> × (e<sup>(V<sub>d</sub> / nV<sub>t</sub>)</sup> - 1)
              </code>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>I<sub>d</sub>:</strong> Diode current</li>
              <li><strong>I<sub>s</sub>:</strong> Saturation (reverse leakage) current</li>
              <li><strong>V<sub>d</sub>:</strong> Voltage across the diode</li>
              <li><strong>n:</strong> Ideality factor (1 for ideal, 1-2 for real diodes)</li>
              <li><strong>V<sub>t</sub>:</strong> Thermal voltage = kT/q ≈ 25.85mV at 25°C</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Operating Regions:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong class="text-green-600">Forward Bias (V > Vf):</strong> Current increases exponentially with voltage. The diode conducts freely.</li>
              <li><strong class="text-red-600">Reverse Bias (V < 0):</strong> Small leakage current flows (approximately -Is). The diode blocks current.</li>
              <li><strong class="text-purple-600">Breakdown Region:</strong> At high reverse voltage, avalanche or Zener breakdown occurs, causing large reverse current.</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Diode Types and Properties:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Silicon (Si)</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Vf ≈ 0.7V, Is ≈ 10⁻¹² A</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Most common, good temperature stability</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Germanium (Ge)</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Vf ≈ 0.3V, Is ≈ 10⁻⁶ A</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Low Vf, high leakage, limited applications</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Schottky</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Vf ≈ 0.3V, fast switching</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Metal-semiconductor junction, high speed</p>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Zener</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Controlled breakdown (Vz = 1.8-200V)</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Voltage regulation, reference applications</p>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Temperature Effects:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Forward Voltage:</strong> Decreases ~2mV/°C as temperature increases</li>
              <li><strong>Saturation Current:</strong> Doubles approximately every 10°C increase</li>
              <li><strong>Breakdown Voltage:</strong> Zener voltage increases with temperature (positive tempco for Vz > 5V)</li>
              <li><strong>Leakage Current:</strong> Increases significantly with temperature</li>
            </ul>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Rectification:</strong> Converting AC to DC (power supplies)</li>
              <li><strong>Protection:</strong> Clamping, flyback protection, ESD protection</li>
              <li><strong>Switching:</strong> High-speed switching in digital circuits</li>
              <li><strong>Regulation:</strong> Zener diodes for voltage reference</li>
              <li><strong>Signal Processing:</strong> Mixers, detectors, clippers</li>
            </ul>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mt-6">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-700 dark:text-blue-300 font-semibold">
                    Interactive Learning Tips
                  </p>
                  <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    • Adjust the test voltage to see how current changes in different bias regions<br>
                    • Change temperature and observe how Vf shifts and leakage current increases<br>
                    • Compare different diode types to understand their unique characteristics<br>
                    • Use the Zener mode to explore voltage regulation behavior
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
import { ref, computed, watch } from 'vue'

// Reactive state
const diodeType = ref('silicon')
const saturationCurrent = ref(1e-12) // Is in Amps
const thermalVoltage = ref(0.02585) // Vt in Volts (25.85mV at 25°C)
const idealityFactor = ref(1.5) // n (ideality factor)
const temperature = ref(25) // Temperature in Celsius
const zenerVoltage = ref(5.1) // Zener breakdown voltage
const seriesResistance = ref(0.1) // Series resistance in Ohms
const testVoltage = ref(0.7) // Test voltage in Volts

// Graph scaling
const xMaxForward = ref(2.0)
const xMaxReverse = ref(-2.0)
const yMaxForward = ref(1.0)
const yMaxReverse = ref(-1e-9)

// Diode type presets
const diodePresets: Record<string, any> = {
  silicon: { saturationCurrent: 1e-12, forwardVoltage: 0.7 },
  germanium: { saturationCurrent: 1e-6, forwardVoltage: 0.3 },
  schottky: { saturationCurrent: 1e-9, forwardVoltage: 0.3 },
  led_red: { saturationCurrent: 1e-12, forwardVoltage: 1.8 },
  led_white: { saturationCurrent: 1e-12, forwardVoltage: 3.0 },
  zener: { saturationCurrent: 1e-10, forwardVoltage: 0.7 }
}

// Update diode parameters based on type
const updateDiodeParameters = () => {
  const preset = diodePresets[diodeType.value]
  if (preset) {
    saturationCurrent.value = preset.saturationCurrent
    if (diodeType.value === 'zener') {
      testVoltage.value = -5.1
      xMaxReverse.value = -10
    } else if (diodeType.value.startsWith('led')) {
      testVoltage.value = preset.forwardVoltage
      xMaxForward.value = preset.forwardVoltage * 1.5
    } else {
      testVoltage.value = preset.forwardVoltage
      xMaxForward.value = 2.0
      xMaxReverse.value = -2.0
    }
  }
}

// Update thermal voltage based on temperature
const updateThermalVoltage = () => {
  const tempK = temperature.value + 273.15
  // Vt = kT/q, where k = 1.380649e-23 J/K, q = 1.602176e-19 C
  thermalVoltage.value = (1.380649e-23 * tempK) / 1.602176e-19
}

// Calculate diode current using Shockley equation
const calculateCurrent = (voltage: number): number => {
  let current: number
  
  if (voltage >= 0) {
    // Forward bias
    current = saturationCurrent.value * (Math.exp(voltage / (idealityFactor.value * thermalVoltage.value)) - 1)
    
    // Apply series resistance
    if (seriesResistance.value > 0 && current > 0) {
      const voltageDrop = current * seriesResistance.value
      const voltageJunction = voltage - voltageDrop
      if (voltageJunction > 0) {
        current = saturationCurrent.value * (Math.exp(voltageJunction / (idealityFactor.value * thermalVoltage.value)) - 1)
      }
    }
  } else {
    // Reverse bias
    if (diodeType.value === 'zener' && Math.abs(voltage) >= zenerVoltage.value) {
      // Zener breakdown region
      const breakdownVoltage = -zenerVoltage.value
      const excessVoltage = Math.abs(voltage) - zenerVoltage.value
      current = -saturationCurrent.value * (1 + Math.exp(excessVoltage / thermalVoltage.value))
    } else {
      // Normal reverse bias
      current = -saturationCurrent.value
    }
  }
  
  return current
}

// Calculate forward voltage (knee voltage)
const getForwardVoltage = (): number => {
  const preset = diodePresets[diodeType.value]
  return preset ? preset.forwardVoltage : 0.7
}

// Get operating mode
const getOperatingMode = (): string => {
  if (testVoltage.value > getForwardVoltage() * 0.5) {
    return 'Forward Bias'
  } else if (testVoltage.value < -0.5) {
    if (diodeType.value === 'zener' && Math.abs(testVoltage.value) >= zenerVoltage.value) {
      return 'Breakdown'
    }
    return 'Reverse Bias'
  } else {
    return 'Transition'
  }
}

// Calculate dynamic resistance at operating point
const calculateDynamicResistance = (): number => {
  const v = testVoltage.value
  if (v <= 0) return 1e9 // Very high resistance in reverse bias
  
  const nVt = idealityFactor.value * thermalVoltage.value
  const current = calculateCurrent(v)
  if (current <= 0) return 1e9
  
  // Dynamic resistance rd = nVt / Id
  return (nVt / current) + seriesResistance.value
}

// Calculate power dissipation
const calculatePowerDissipation = (): number => {
  const v = Math.abs(testVoltage.value)
  const i = Math.abs(calculateCurrent(testVoltage.value))
  return v * i
}

// Format current for display
const formatCurrent = (current: number): string => {
  if (Math.abs(current) >= 1) return `${current.toFixed(3)} A`
  if (Math.abs(current) >= 1e-3) return `${(current * 1e3).toFixed(3)} mA`
  if (Math.abs(current) >= 1e-6) return `${(current * 1e6).toFixed(3)} µA`
  if (Math.abs(current) >= 1e-9) return `${(current * 1e9).toFixed(3)} nA`
  return `${current.toExponential(2)} A`
}

// Generate forward bias curve path
const forwardCurvePath = computed(() => {
  const points: [number, number][] = []
  const vMax = xMaxForward.value
  const steps = 100
  
  for (let i = 0; i <= steps; i++) {
    const v = (i / steps) * vMax
    const iVal = calculateCurrent(v)
    
    // Map to SVG coordinates
    const x = 300 + (v / vMax) * 240
    const y = Math.max(50, Math.min(190, 190 - (iVal / Math.max(yMaxForward.value, iVal)) * 150))
    
    points.push([x, y])
  }
  
  if (points.length === 0) return ''
  
  let path = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i][0]} ${points[i][1]}`
  }
  
  return path
})

// Generate reverse bias curve path
const reverseCurvePath = computed(() => {
  const points: [number, number][] = []
  const vMin = xMaxReverse.value
  const steps = 50
  
  for (let i = 0; i <= steps; i++) {
    const v = (i / steps) * vMin
    const iVal = calculateCurrent(v)
    
    // Map to SVG coordinates
    const x = 300 + (v / vMin) * 240
    const y = Math.max(190, Math.min(330, 190 - (iVal / Math.min(yMaxReverse.value, iVal)) * 140))
    
    points.push([x, y])
  }
  
  if (points.length === 0) return ''
  
  let path = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i][0]} ${points[i][1]}`
  }
  
  return path
})

// Reset parameters to default
const resetParameters = () => {
  diodeType.value = 'silicon'
  saturationCurrent.value = 1e-12
  thermalVoltage.value = 0.02585
  idealityFactor.value = 1.5
  temperature.value = 25
  zenerVoltage.value = 5.1
  seriesResistance.value = 0.1
  testVoltage.value = 0.7
  updateDiodeParameters()
  updateThermalVoltage()
}

// Initialize
watch(diodeType, () => {
  updateDiodeParameters()
})

watch(temperature, () => {
  updateThermalVoltage()
})

// Initial setup
updateDiodeParameters()
updateThermalVoltage()
</script>

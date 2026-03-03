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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Sallen-Key Low Pass Filter
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive 2nd-order active filter simulation with real-time Bode plot and circuit visualization
          </p>
          
          <!-- Transfer Function -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-sm font-mono text-center">
              <div class="text-primary-highlight font-bold mb-1">H(s) = K × ω₀² / (s² + s·ω₀/Q + ω₀²)</div>
              <div class="text-gray-600 dark:text-gray-400 text-xs">
                Where: K = DC gain, ω₀ = cutoff frequency, Q = quality factor
              </div>
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
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filter Parameters
              </h3>
              
              <!-- Filter Type Selector -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter Response Type
                </label>
                <select 
                  v-model="filterType"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="butterworth">Butterworth (Maximally Flat)</option>
                  <option value="bessel">Bessel (Linear Phase)</option>
                  <option value="chebyshev">Chebyshev (Steep Rolloff)</option>
                </select>
              </div>
              
              <!-- Cutoff Frequency -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cutoff Frequency (fc)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="cutoffFreq"
                    type="number" 
                    step="100"
                    min="100"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">Hz</span>
                </div>
                <input 
                  v-model.number="cutoffFreq"
                  type="range"
                  min="100"
                  max="100000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- DC Gain -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  DC Gain (K)
                </label>
                <div class="flex items-center gap-2 mb-2">
                  <input 
                    v-model.number="dcGain"
                    type="number" 
                    step="0.1"
                    min="0.1"
                    max="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 text-sm w-12">V/V</span>
                </div>
                <input 
                  v-model.number="dcGain"
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
              
              <!-- Quality Factor Display -->
              <div class="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Quality Factor (Q)</div>
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {{ Q.toFixed(3) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ QDescription }}
                </div>
              </div>
              
              <!-- Damping Ratio -->
              <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Damping Ratio (ζ = 1/2Q)</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ dampingRatio.toFixed(3) }}
                </div>
              </div>
              
              <!-- Component Values -->
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Calculated Component Values*
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">R1, R2:</span>
                    <span class="font-mono font-bold text-gray-900 dark:text-white">{{ calculatedR }} kΩ</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">C1:</span>
                    <span class="font-mono font-bold text-gray-900 dark:text-white">{{ calculatedC1 }} nF</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">C2:</span>
                    <span class="font-mono font-bold text-gray-900 dark:text-white">{{ calculatedC2 }} nF</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">R3, R4:</span>
                    <span class="font-mono font-bold text-gray-900 dark:text-white">{{ calculatedR3 }} kΩ</span>
                  </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  * Standard values may differ slightly
                </div>
              </div>
            </div>
          </div>
          
          <!-- Visualization Panel -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Bode Plot -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Bode Plot - Magnitude Response
              </h3>
              
              <!-- Interactive Bode Plot SVG -->
              <div class="flex justify-center">
                <svg viewBox="0 0 800 450" class="w-full h-auto bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                  <!-- Grid -->
                  <defs>
                    <pattern id="sallenGrid" width="80" height="45" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 45" fill="none" stroke="currentColor" stroke-width="0.5" class="opacity-20"/>
                    </pattern>
                  </defs>
                  <rect x="80" y="40" width="680" height="320" fill="url(#sallenGrid)" />
                  
                  <!-- Axes -->
                  <line x1="80" y1="40" x2="80" y2="360" stroke="#374151" stroke-width="2"/>
                  <line x1="80" y1="360" x2="760" y2="360" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Y-axis labels (Gain in dB) -->
                  <text x="70" y="365" text-anchor="end" :font-size="11" fill="#6B7280">-40</text>
                  <text x="70" y="293" text-anchor="end" :font-size="11" fill="#6B7280">-20</text>
                  <text x="70" y="221" text-anchor="end" :font-size="11" fill="#6B7280">0</text>
                  <text x="70" y="149" text-anchor="end" :font-size="11" fill="#6B7280">+20</text>
                  <text x="70" y="77" text-anchor="end" :font-size="11" fill="#6B7280">+40</text>
                  <text x="40" y="200" text-anchor="middle" :font-size="13" font-weight="bold" fill="#374151" transform="rotate(-90, 40, 200)">Gain (dB)</text>
                  
                  <!-- X-axis labels (Frequency - logarithmic) -->
                  <text x="80" y="380" text-anchor="middle" :font-size="11" fill="#6B7280">0.01fc</text>
                  <text x="250" y="380" text-anchor="middle" :font-size="11" fill="#6B7280">0.1fc</text>
                  <text x="420" y="380" text-anchor="middle" :font-size="11" fill="#EF4444" font-weight="bold">fc</text>
                  <text x="590" y="380" text-anchor="middle" :font-size="11" fill="#6B7280">10fc</text>
                  <text x="760" y="380" text-anchor="middle" :font-size="11" fill="#6B7280">100fc</text>
                  <text x="420" y="405" text-anchor="middle" :font-size="13" font-weight="bold" fill="#374151">Frequency (relative to fc)</text>
                  
                  <!-- -3dB line -->
                  <line x1="80" y1="226" x2="760" y2="226" stroke="#EF4444" stroke-width="1" stroke-dasharray="4,4" opacity="0.4"/>
                  <text x="765" y="230" :font-size="10" fill="#EF4444" font-weight="bold">-3dB</text>
                  
                  <!-- Cutoff frequency marker -->
                  <line x1="420" y1="40" x2="420" y2="360" stroke="#EF4444" stroke-width="2" stroke-dasharray="6,4" opacity="0.6"/>
                  <text x="420" y="35" text-anchor="middle" :font-size="11" fill="#EF4444" font-weight="bold">{{ cutoffFreq }} Hz</text>
                  
                  <!-- 0dB reference line (adjusted for DC gain) -->
                  <line x1="80" :y1="zeroDbY" x2="760" :y2="zeroDbY" stroke="#22C55E" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>
                  <text x="765" :y="zeroDbY + 4" :font-size="10" fill="#22C55E" font-weight="bold">0dB (input)</text>
                  
                  <!-- Frequency Response Curve -->
                  <path 
                    :d="bodeResponsePath"
                    fill="none"
                    :stroke="filterTypeColor"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  
                  <!-- Peaking indicator (for high Q) -->
                  <circle v-if="Q > 0.707" :cx="peakX" :cy="peakY" r="5" fill="#F59E0B" stroke="white" stroke-width="2"/>
                  <text v-if="Q > 0.707" :x="peakX" :y="peakY - 10" text-anchor="middle" :font-size="10" fill="#F59E0B" font-weight="bold">
                    +{{ peakingDb.toFixed(1) }}dB
                  </text>
                  
                  <!-- Cursor for current test frequency -->
                  <g v-if="testFrequency > 0">
                    <line :x1="cursorX" y1="40" :x2="cursorX" y2="360" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4,2"/>
                    <circle :cx="cursorX" :cy="cursorY" r="6" fill="#3B82F6" stroke="white" stroke-width="2"/>
                    <text :x="cursorX" :y="cursorY - 12" text-anchor="middle" :font-size="11" fill="#3B82F6" font-weight="bold">
                      {{ cursorGain.toFixed(1) }}dB
                    </text>
                  </g>
                </svg>
              </div>
              
              <!-- Test Frequency Slider -->
              <div class="mt-6 max-w-md mx-auto">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Frequency: {{ formatFrequency(testFrequency) }}
                </label>
                <input 
                  v-model.number="testFrequency"
                  type="range"
                  min="10"
                  :max="cutoffFreq * 100"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
            </div>
            
            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Circuit Diagram
              </h3>
              
              <!-- Sallen-Key Circuit SVG -->
              <div class="flex justify-center">
                <svg viewBox="0 0 700 350" class="w-full h-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                  <!-- Background -->
                  <rect width="700" height="350" fill="transparent"/>
                  
                  <!-- Input label -->
                  <text x="30" y="155" :font-size="14" font-weight="bold" fill="#374151" dark:fill="white">Vin</text>
                  
                  <!-- Input line -->
                  <line x1="60" y1="150" x2="120" y2="150" stroke="#374151" stroke-width="3"/>
                  
                  <!-- R1 -->
                  <rect x="120" y="140" width="60" height="20" fill="white" stroke="#374151" stroke-width="2"/>
                  <text x="150" y="155" text-anchor="middle" :font-size="12" font-weight="bold" fill="#374151">R1</text>
                  
                  <!-- Line to C1 junction -->
                  <line x1="180" y1="150" x2="220" y2="150" stroke="#374151" stroke-width="3"/>
                  
                  <!-- C1 (going down) -->
                  <line x1="220" y1="150" x2="220" y2="200" stroke="#374151" stroke-width="3"/>
                  <line x1="210" y1="200" x2="230" y2="200" stroke="#374151" stroke-width="2"/>
                  <line x1="210" y1="200" x2="210" y2="220" stroke="#374151" stroke-width="2"/>
                  <line x1="230" y1="200" x2="230" y2="220" stroke="#374151" stroke-width="2"/>
                  <line x1="207" y1="220" x2="233" y2="220" stroke="#374151" stroke-width="2"/>
                  <text x="220" y="240" text-anchor="middle" :font-size="12" font-weight="bold" fill="#374151">C1</text>
                  
                  <!-- Ground for C1 -->
                  <line x1="220" y1="220" x2="220" y2="260" stroke="#374151" stroke-width="2"/>
                  <line x1="210" y1="260" x2="230" y2="260" stroke="#374151" stroke-width="2"/>
                  <line x1="215" y1="260" x2="215" y2="270" stroke="#374151" stroke-width="2"/>
                  <line x1="225" y1="260" x2="225" y2="270" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Line from junction to R2 -->
                  <line x1="220" y1="150" x2="280" y2="150" stroke="#374151" stroke-width="3"/>
                  
                  <!-- R2 -->
                  <rect x="280" y="140" width="60" height="20" fill="white" stroke="#374151" stroke-width="2"/>
                  <text x="310" y="155" text-anchor="middle" :font-size="12" font-weight="bold" fill="#374151">R2</text>
                  
                  <!-- Line to op-amp non-inverting input -->
                  <line x1="340" y1="150" x2="380" y2="150" stroke="#374151" stroke-width="3"/>
                  
                  <!-- Op-Amp triangle -->
                  <polygon points="380,110 380,190 450,150" fill="white" stroke="#374151" stroke-width="3"/>
                  <text x="400" y="145" :font-size="11" fill="#374151">+</text>
                  <text x="400" y="165" :font-size="11" fill="#374151">-</text>
                  <text x="410" y="155" :font-size="10" fill="#6B7280">A</text>
                  
                  <!-- Feedback from op-amp output to C2 junction -->
                  <line x1="450" y1="150" x2="490" y2="150" stroke="#374151" stroke-width="3"/>
                  
                  <!-- C2 junction line -->
                  <line x1="490" y1="150" x2="490" y2="100" stroke="#374151" stroke-width="2"/>
                  
                  <!-- C2 (going up and back) -->
                  <line x1="470" y1="100" x2="510" y2="100" stroke="#374151" stroke-width="2"/>
                  <line x1="470" y1="100" x2="470" y2="80" stroke="#374151" stroke-width="2"/>
                  <line x1="510" y1="100" x2="510" y2="80" stroke="#374151" stroke-width="2"/>
                  <line x1="467" y1="80" x2="513" y2="80" stroke="#374151" stroke-width="2"/>
                  <text x="530" y="85" :font-size="12" font-weight="bold" fill="#374151">C2</text>
                  
                  <!-- C2 connect to R1-R2 junction -->
                  <line x1="490" y1="80" x2="220" y2="80" stroke="#374151" stroke-width="2"/>
                  <line x1="220" y1="80" x2="220" y2="130" stroke="#374151" stroke-width="2"/>
                  
                  <!-- DC Gain setting resistors (R3, R4) -->
                  <line x1="380" y1="150" x2="380" y2="200" stroke="#374151" stroke-width="2"/>
                  <rect x="370" y="200" width="20" height="40" fill="white" stroke="#374151" stroke-width="2"/>
                  <text x="400" y="225" :font-size="11" font-weight="bold" fill="#374151">R3</text>
                  
                  <line x1="380" y1="240" x2="380" y2="270" stroke="#374151" stroke-width="2"/>
                  <!-- Ground -->
                  <line x1="370" y1="270" x2="390" y2="270" stroke="#374151" stroke-width="2"/>
                  <line x1="375" y1="270" x2="375" y2="280" stroke="#374151" stroke-width="2"/>
                  <line x1="385" y1="270" x2="385" y2="280" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Feedback resistor (R4) -->
                  <line x1="450" y1="150" x2="520" y2="150" stroke="#374151" stroke-width="3"/>
                  <line x1="520" y1="150" x2="520" y2="200" stroke="#374151" stroke-width="2"/>
                  <rect x="510" y="200" width="20" height="50" fill="white" stroke="#374151" stroke-width="2"/>
                  <text x="545" y="230" :font-size="11" font-weight="bold" fill="#374151">R4</text>
                  
                  <line x1="520" y1="250" x2="520" y2="280" stroke="#374151" stroke-width="2"/>
                  <line x1="520" y1="280" x2="380" y2="280" stroke="#374151" stroke-width="2"/>
                  
                  <!-- Output line -->
                  <line x1="520" y1="150" x2="600" y2="150" stroke="#374151" stroke-width="3"/>
                  <text x="610" y="155" :font-size="14" font-weight="bold" fill="#374151" dark:fill="white">Vout</text>
                  
                  <!-- Component value display -->
                  <text x="150" y="180" text-anchor="middle" :font-size="10" fill="#6B7280">{{ calculatedR }}k</text>
                  <text x="310" y="180" text-anchor="middle" :font-size="10" fill="#6B7280">{{ calculatedR }}k</text>
                  <text x="255" y="95" text-anchor="middle" :font-size="10" fill="#6B7280">{{ calculatedC2 }}n</text>
                  <text x="425" y="95" text-anchor="middle" :font-size="10" fill="#6B7280">{{ calculatedC1 }}n</text>
                  <text x="410" y="270" text-anchor="middle" :font-size="9" fill="#6B7280">{{ calculatedR3 }}k</text>
                  <text x="540" y="265" text-anchor="middle" :font-size="9" fill="#6B7280">{{ calculatedR4 }}k</text>
                </svg>
              </div>
              
              <!-- Component Description -->
              <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="font-semibold text-gray-900 dark:text-white mb-1">R1 = R2</div>
                  <div class="text-gray-600 dark:text-gray-400">Set filter impedance level</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="font-semibold text-gray-900 dark:text-white mb-1">C1, C2 Ratio</div>
                  <div class="text-gray-600 dark:text-gray-400">Determine Q factor</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="font-semibold text-gray-900 dark:text-white mb-1">R3, R4</div>
                  <div class="text-gray-600 dark:text-gray-400">Set DC gain (K)</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="font-semibold text-gray-900 dark:text-white mb-1">Op-Amp</div>
                  <div class="text-gray-600 dark:text-gray-400">Unity gain buffer</div>
                </div>
              </div>
            </div>
            
            <!-- Educational Info -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Understanding Sallen-Key Filters
              </h3>
              
              <div class="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">🎯 What is a Sallen-Key Filter?</h4>
                  <p class="text-sm">
                    The Sallen-Key topology is one of the most popular 2nd-order active filter configurations. 
                    It uses an op-amp as a unity-gain buffer (or with gain) and provides excellent performance 
                    with minimal component count. It's widely used in audio, instrumentation, and communication systems.
                  </p>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📊 Filter Response Types</h4>
                  <ul class="text-sm space-y-1">
                    <li><strong class="text-purple-600">Butterworth (Q ≈ 0.707):</strong> Maximally flat passband, no ripple, good all-purpose choice</li>
                    <li><strong class="text-blue-600">Bessel (Q ≈ 0.577):</strong> Linear phase response, minimal overshoot, best for pulse signals</li>
                    <li><strong class="text-orange-600">Chebyshev (Q > 0.707):</strong> Steeper rolloff, some passband ripple/peaking, sharp cutoff</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">⚡ Key Parameters</h4>
                  <ul class="text-sm space-y-1">
                    <li><strong>Cutoff Frequency (fc):</strong> -3dB point where output is 70.7% of input</li>
                    <li><strong>Q Factor:</strong> Determines damping and peaking. Q < 0.707 = overdamped, Q > 0.707 = underdamped</li>
                    <li><strong>Rolloff Rate:</strong> -40dB/decade (2nd-order), twice as steep as 1st-order RC filter</li>
                  </ul>
                </div>
                
                <div class="p-3 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-2">💡 Design Tips</h4>
                  <ul class="text-sm space-y-1">
                    <li>• Use 1% tolerance resistors and 5% capacitors for predictable response</li>
                    <li>• Choose op-amp with GBW at least 100× your cutoff frequency</li>
                    <li>• For higher Q, watch component tolerances - small errors cause big response changes</li>
                    <li>• Cascade multiple stages for even steeper rolloff (4th, 6th, 8th order)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-gray-400">
          Sallen-Key Low Pass Filter Simulation • Cyno Electric • Interactive Educational Tool
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const colorMode = useColorMode()

// Filter parameters
const filterType = ref('butterworth')
const cutoffFreq = ref(1000)  // Hz
const dcGain = ref(1)         // V/V
const testFrequency = ref(1000)

// Quality factor based on filter type
const Q = computed(() => {
  switch (filterType.value) {
    case 'bessel': return 0.577
    case 'chebyshev': return 1.0
    default: return 0.707  // butterworth
  }
})

const QDescription = computed(() => {
  if (Q.value < 0.6) return 'Critically damped (Bessel)'
  if (Q.value < 0.75) return 'Maximally flat (Butterworth)'
  return 'Underdamped with peaking (Chebyshev)'
})

const dampingRatio = computed(() => {
  return 1 / (2 * Q.value)
})

// Filter type color for visualization
const filterTypeColor = computed(() => {
  switch (filterType.value) {
    case 'bessel': return '#3B82F6'      // blue
    case 'chebyshev': return '#F59E0B'   // orange
    default: return '#8B5CF6'            // purple (butterworth)
  }
})

// Calculate component values (simplified design)
const calculatedR = computed(() => {
  // Use R = 10k as standard
  return 10
})

const calculatedC1 = computed(() => {
  // For fc = 1000Hz, R = 10k
  // fc = 1 / (2π × R × √(C1 × C2))
  // For Butterworth: C2 = 2 × C1 (for Q = 0.707)
  // fc = 1 / (2π × R × C1 × √2)
  // C1 = 1 / (2π × R × fc × √2)
  const r = calculatedR.value * 1000
  const c1 = 1 / (2 * Math.PI * r * cutoffFreq.value * Math.sqrt(2))
  return (c1 * 1e9).toFixed(1)
})

const calculatedC2 = computed(() => {
  switch (filterType.value) {
    case 'bessel': return (parseFloat(calculatedC1.value) * 1.5).toFixed(1)
    case 'chebyshev': return (parseFloat(calculatedC1.value) * 1).toFixed(1)
    default: return (parseFloat(calculatedC1.value) * 2).toFixed(1)
  }
})

const calculatedR3 = computed(() => {
  // For unity gain: R3 = infinite (open)
  // For gain > 1: R3 = R4 / (K - 1)
  if (dcGain.value <= 1) return '∞'
  const r4 = 10000
  const r3 = r4 / (dcGain.value - 1)
  return (r3 / 1000).toFixed(1)
})

const calculatedR4 = computed(() => {
  // Feedback resistor, use 10k as reference
  return 10
})

// Calculate gain at a given frequency ratio
const calculateGainDb = (freqRatio) => {
  // Magnitude response for 2nd-order low pass:
  // |H(f)| = K / √((1 - (f/fc)²)² + (f/(fc×Q))²)
  const ratioSquared = freqRatio * freqRatio
  const numerator = dcGain.value
  const denominator = Math.sqrt(
    Math.pow(1 - ratioSquared, 2) + 
    Math.pow(freqRatio / Q.value, 2)
  )
  const magnitude = numerator / denominator
  return 20 * Math.log10(magnitude)
}

// Generate Bode plot curve path
const bodeResponsePath = computed(() => {
  let path = 'M'
  const points = []
  
  for (let i = 0; i <= 100; i++) {
    // Generate points from 0.01fc to 100fc
    const logRatio = -2 + (i / 100) * 4
    const ratio = Math.pow(10, logRatio)
    const db = calculateGainDb(ratio)
    
    // Map to SVG coordinates
    const xPos = 80 + (logRatio * 170)
    // 0dB is at y=221, -40dB is at y=365, so 3.6 pixels per dB
    const yPos = 221 - (db * 3.6)
    
    points.push(`${xPos.toFixed(1)},${yPos.toFixed(1)}`)
  }
  
  return path + points.join(' L')
})

// Calculate peaking (for high Q filters)
const peakingDb = computed(() => {
  if (Q.value <= 0.707) return 0
  
  // Peak occurs at frequency ratio < 1
  // For Q > 0.707, peak is at ratio = sqrt(1 - 1/(2Q²))
  const peakRatio = Math.sqrt(1 - 1 / (2 * Q.value * Q.value))
  const peakDb = calculateGainDb(peakRatio)
  const dcGainDb = 20 * Math.log10(dcGain.value)
  
  return peakDb - dcGainDb
})

const peakX = computed(() => {
  if (Q.value <= 0.707) return 420
  
  const peakRatio = Math.sqrt(1 - 1 / (2 * Q.value * Q.value))
  const logRatio = Math.log10(peakRatio)
  return 420 + (logRatio * 170)
})

const peakY = computed(() => {
  if (Q.value <= 0.707) return 221
  
  const peakRatio = Math.sqrt(1 - 1 / (2 * Q.value * Q.value))
  const peakDb = calculateGainDb(peakRatio)
  return 221 - (peakDb * 3.6)
})

// 0dB reference line position (adjusted for DC gain)
const zeroDbY = computed(() => {
  const dcGainDb = 20 * Math.log10(dcGain.value)
  return 221 - (dcGainDb * 3.6)
})

// Test frequency cursor position
const cursorX = computed(() => {
  if (testFrequency.value <= 0 || cutoffFreq.value <= 0) return 80
  
  const ratio = testFrequency.value / cutoffFreq.value
  const logRatio = Math.log10(ratio)
  const xPos = 420 + (logRatio * 170)
  
  return Math.max(80, Math.min(760, xPos))
})

const cursorY = computed(() => {
  if (testFrequency.value <= 0 || cutoffFreq.value <= 0) return 221
  
  const ratio = testFrequency.value / cutoffFreq.value
  const db = calculateGainDb(ratio)
  return 221 - (db * 3.6)
})

const cursorGain = computed(() => {
  if (testFrequency.value <= 0 || cutoffFreq.value <= 0) return 0
  
  const ratio = testFrequency.value / cutoffFreq.value
  return calculateGainDb(ratio)
})

// Format frequency for display
const formatFrequency = (hz) => {
  if (hz <= 0) return '0 Hz'
  if (hz < 1000) return `${hz.toFixed(0)} Hz`
  if (hz < 1000000) return `${(hz / 1000).toFixed(1)} kHz`
  return `${(hz / 1000000).toFixed(2)} MHz`
}

// SEO Meta
useHead({
  title: 'Sallen-Key Low Pass Filter Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Sallen-Key 2nd-order low pass filter simulation. Explore Butterworth, Bessel, and Chebyshev responses with real-time Bode plots and circuit visualization.' }
  ]
})
</script>

<style scoped>
.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: 2px solid #7986CB;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: 2px solid #7986CB;
}
</style>

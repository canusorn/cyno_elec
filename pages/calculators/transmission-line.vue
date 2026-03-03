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
            Transmission Line Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate characteristic impedance and propagation delay for PCB transmission lines
          </p>
          
          <!-- Key Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Z₀:</span> 50Ω typical &nbsp;|&nbsp; 
              <span class="text-primary-highlight">Microstrip:</span> Surface trace &nbsp;|&nbsp; 
              <span class="text-primary-highlight">Stripline:</span> Internal layer
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          
          <!-- Line Type Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transmission Line Type</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                @click="lineType = 'microstrip'"
                :class="lineType === 'microstrip' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="p-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                <div class="text-lg mb-2">📡 Microstrip</div>
                <div class="text-sm opacity-80">External layer trace (air above)</div>
              </button>
              <button
                @click="lineType = 'stripline'"
                :class="lineType === 'stripline' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="p-6 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                <div class="text-lg mb-2">🔌 Stripline</div>
                <div class="text-sm opacity-80">Internal layer trace (sandwiched)</div>
              </button>
            </div>
          </div>

          <!-- PCB Parameters -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">PCB Parameters</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Trace Width -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trace Width (W)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input
                    v-model.number="traceWidth"
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">mils</span>
                </div>
                <input
                  v-model.number="traceWidth"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Trace Thickness -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trace Thickness (T)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input
                    v-model.number="traceThickness"
                    type="number"
                    min="0.5"
                    max="4"
                    step="0.5"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">oz (copper)</span>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  1 oz = 1.37 mils (35 µm)
                </div>
              </div>

              <!-- Dielectric Constant -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dielectric Constant (εr)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input
                    v-model.number="dielectricConstant"
                    type="number"
                    min="2"
                    max="10"
                    step="0.1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">εr</span>
                </div>
                <select
                  v-model="dielectricConstant"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option :value="2.2">Rogers RO4003C (2.2)</option>
                  <option :value="3.5">Rogers RO4350B (3.5)</option>
                  <option :value="4.3">FR-4 Standard (4.3)</option>
                  <option :value="4.5">FR-4 High Frequency (4.5)</option>
                </select>
              </div>

              <!-- Substrate Height -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ lineType === 'microstrip' ? 'Substrate Height (H)' : 'Distance to Ground (H)' }}
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input
                    v-model.number="substrateHeight"
                    type="number"
                    min="1"
                    max="120"
                    step="1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-16">mils</span>
                </div>
                <input
                  v-model.number="substrateHeight"
                  type="range"
                  min="1"
                  max="120"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>
            </div>

            <!-- Stripline-specific parameter -->
            <div v-if="lineType === 'stripline'" class="mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distance to Second Ground Plane (H2)
              </label>
              <div class="flex items-center gap-4 mb-2">
                <input
                  v-model.number="substrateHeight2"
                  type="number"
                  min="1"
                  max="120"
                  step="1"
                  class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <span class="text-gray-500 dark:text-gray-400 w-16">mils</span>
              </div>
              <input
                v-model.number="substrateHeight2"
                type="range"
                min="1"
                max="120"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Calculation Results</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Characteristic Impedance -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Characteristic Impedance</span>
                <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {{ calculatedImpedance.toFixed(1) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">ohms</div>
              <div class="mt-3 text-sm">
                <span :class="impedanceStatus.color" class="px-2 py-1 rounded-full font-medium">
                  {{ impedanceStatus.text }}
                </span>
              </div>
            </div>

            <!-- Propagation Delay -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Propagation Delay</span>
                <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                {{ calculatedDelay.toFixed(2) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">ps/inch</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Time for signal to travel 1 inch
              </div>
            </div>

            <!-- Electrical Length -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Electrical Length @ 1 GHz</span>
                <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {{ electricalLength.toFixed(1) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">degrees/inch</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Phase shift per inch at 1 GHz
              </div>
            </div>

            <!-- Wavelength -->
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Wavelength @ 1 GHz</span>
                <svg class="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {{ wavelength.toFixed(2) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">inches</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                One full cycle at 1 GHz
              </div>
            </div>

            <!-- Velocity Factor -->
            <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Velocity Factor</span>
                <svg class="h-5 w-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                {{ (velocityFactor * 100).toFixed(1) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">% of c</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Relative to speed of light
              </div>
            </div>

            <!-- Effective Dielectric Constant -->
            <div class="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Effective εr</span>
                <svg class="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                {{ effectiveDielectric.toFixed(2) }}
              </div>
              <div class="text-lg text-gray-600 dark:text-gray-400">εeff</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Effective dielectric constant
              </div>
            </div>
          </div>
        </div>

        <!-- Cross-Section Visualization -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📐 Cross-Section View</h3>
          
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <svg viewBox="0 0 600 300" class="w-full max-w-2xl mx-auto" style="min-height: 200px;">
              <!-- Scale factors -->
              <defs>
                <pattern id="groundPlane" patternUnits="userSpaceOnUse" width="10" height="10">
                  <rect width="10" height="10" fill="url(#diagonalHatch)"/>
                </pattern>
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
                  <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#9CA3AF" stroke-width="1"/>
                </pattern>
              </defs>

              <template v-if="lineType === 'microstrip'">
                <!-- Air (top) -->
                <rect x="50" y="20" width="500" height="60" fill="#E0F2FE" opacity="0.5"/>
                <text x="300" y="55" text-anchor="middle" font-size="14" fill="#0369A1">Air (εr ≈ 1)</text>

                <!-- Substrate -->
                <rect x="50" y="80" width="500" height="150" fill="#FCD34D" opacity="0.4"/>
                <text x="300" y="160" text-anchor="middle" font-size="14" fill="#92400E">
                  Substrate (εr = {{ dielectricConstant }})
                </text>

                <!-- Ground Plane -->
                <rect x="50" y="230" width="500" height="20" fill="url(#groundPlane)" stroke="#6B7280" stroke-width="2"/>
                <text x="300" y="245" text-anchor="middle" font-size="12" fill="#374151">Ground Plane</text>

                <!-- Trace -->
                <rect x="150" y="77" width="300" height="6" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
                <text x="450" y="72" font-size="12" fill="#B45309">Signal Trace (W = {{ traceWidth }} mils)</text>

                <!-- Dimension: Substrate Height -->
                <line x1="470" y1="80" x2="470" y2="230" stroke="#DC2626" stroke-width="2"/>
                <line x1="465" y1="80" x2="475" y2="80" stroke="#DC2626" stroke-width="2"/>
                <line x1="465" y1="230" x2="475" y2="230" stroke="#DC2626" stroke-width="2"/>
                <text x="480" y="160" font-size="12" fill="#DC2626">H = {{ substrateHeight }} mils</text>

                <!-- Dimension: Trace Width -->
                <line x1="150" y1="60" x2="450" y2="60" stroke="#059669" stroke-width="2"/>
                <line x1="150" y1="55" x2="150" y2="65" stroke="#059669" stroke-width="2"/>
                <line x1="450" y1="55" x2="450" y2="65" stroke="#059669" stroke-width="2"/>
                <text x="300" y="52" text-anchor="middle" font-size="12" fill="#059669">W = {{ traceWidth }} mils</text>
              </template>

              <template v-else>
                <!-- Top Ground Plane -->
                <rect x="50" y="20" width="500" height="20" fill="url(#groundPlane)" stroke="#6B7280" stroke-width="2"/>
                <text x="300" y="35" text-anchor="middle" font-size="12" fill="#374151">Ground Plane</text>

                <!-- Top Substrate -->
                <rect x="50" y="40" width="500" height="80" fill="#FCD34D" opacity="0.4"/>
                <text x="300" y="85" text-anchor="middle" font-size="12" fill="#92400E">
                  Substrate (H1 = {{ substrateHeight }} mils)
                </text>

                <!-- Trace -->
                <rect x="150" y="117" width="300" height="6" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>

                <!-- Bottom Substrate -->
                <rect x="50" y="123" width="500" height="80" fill="#FCD34D" opacity="0.4"/>
                <text x="300" y="168" text-anchor="middle" font-size="12" fill="#92400E">
                  Substrate (H2 = {{ substrateHeight2 }} mils)
                </text>

                <!-- Bottom Ground Plane -->
                <rect x="50" y="203" width="500" height="20" fill="url(#groundPlane)" stroke="#6B7280" stroke-width="2"/>
                <text x="300" y="218" text-anchor="middle" font-size="12" fill="#374151">Ground Plane</text>

                <!-- Dimension: Total Height -->
                <line x1="470" y1="40" x2="470" y2="203" stroke="#DC2626" stroke-width="2"/>
                <text x="480" y="125" font-size="11" fill="#DC2626">Total</text>
              </template>
            </svg>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Transmission Lines</h3>
          
          <div class="space-y-6">
            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">What is a Transmission Line?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                A transmission line is a specialized cable or trace designed to carry high-frequency electrical signals with minimal distortion. 
                At high frequencies, the trace's electrical characteristics become significant and must be controlled.
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Characteristic Impedance (Z₀)</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Z₀</strong> is the ratio of voltage to current for a wave propagating along the line. It's determined by the line's geometry and materials, not the length.<br><br>
                <strong>Why 50Ω is common:</strong> 50Ω is a compromise between power handling (low Z) and low loss (high Z). It became the standard for RF and high-speed digital circuits.
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Microstrip vs Stripline</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Microstrip:</strong> Signal trace on outer layer with ground plane underneath. Easier to fabricate and troubleshoot, but emits more EMI. 
                Effective εr is lower because some field travels through air.<br><br>
                <strong>Stripline:</strong> Signal trace sandwiched between two ground planes in inner layers. Better shielding and controlled impedance, 
                but harder to fabricate. Slower signal speed due to higher effective εr.
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">When to Use Controlled Impedance?</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Controlled impedance is necessary when the signal rise time is comparable to or less than the propagation delay of the trace.
                General rule of thumb: When trace length > 1/10 of signal wavelength.<br><br>
                <strong>Examples:</strong><br>
                • USB, HDMI, Ethernet (all require controlled impedance)<br>
                • DDR memory interfaces<br>
                • High-speed ADC/DAC clocks<br>
                • RF circuits (WiFi, Bluetooth, cellular)
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Propagation Delay</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Propagation delay is the time it takes for a signal to travel along the transmission line. In a vacuum, electromagnetic waves travel at the speed of light (≈ 11.8 in/ns or 30 cm/ns).<br><br>
                In PCB materials, the signal slows down due to the dielectric constant. The velocity factor (VF) is the ratio of actual speed to speed of light.<br>
                Typical values: Microstrip ~60-70% of c, Stripline ~45-55% of c
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Design Tips</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                <strong>1. Match your impedance:</strong> Know what impedance your system requires (most common: 50Ω single-ended, 100Ω differential)<br>
                <strong>2. Use the right materials:</strong> FR-4 is economical but εr varies with frequency. High-frequency designs may use Rogers materials<br>
                <strong>3. Keep it short:</strong> Shorter traces have less loss and are less sensitive to impedance variations<br>
                <strong>4. Avoid discontinuities:</strong> Vias, bends, and connectors can cause impedance mismatches and reflections<br>
                <strong>5. Plan ahead:</strong> Calculate trace width during PCB layout, not after fabrication
              </p>
            </div>

            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Formulas Used</h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Microstrip Impedance (simplified):</strong><br>
                Z₀ ≈ (87 / √(εr + 1.41)) × ln(5.98H / (0.8W + T))<br><br>
                <strong>Stripline Impedance (symmetrical):</strong><br>
                Z₀ ≈ (60 / √εr) × ln(4H / (0.67π(0.8W + T)))<br><br>
                <strong>Propagation Delay:</strong><br>
                td = √εeff / c (where c = speed of light)
              </p>
            </div>
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

// Line type
const lineType = ref('microstrip')

// PCB parameters
const traceWidth = ref(10) // mils
const traceThickness = ref(1) // oz copper (converts to 1.37 mils)
const dielectricConstant = ref(4.3) // FR-4
const substrateHeight = ref(62) // mils (1.57mm standard)
const substrateHeight2 = ref(62) // For stripline

// Convert copper weight to thickness in mils
const copperThickness = computed(() => {
  // 1 oz = 1.37 mils (35 μm)
  return traceThickness.value * 1.37
})

// Calculate effective dielectric constant
const effectiveDielectric = computed(() => {
  const w = traceWidth.value
  const h = substrateHeight.value
  const er = dielectricConstant.value

  if (lineType.value === 'microstrip') {
    // Microstrip effective dielectric constant
    const wOverH = w / h
    let eEff = 0
    
    if (wOverH < 1) {
      eEff = (er + 1) / 2 + ((er - 1) / 2) * (1 / Math.sqrt(1 + 12 * h / w) + 0.04 * (1 - w / h) ** 2)
    } else {
      eEff = (er + 1) / 2 + ((er - 1) / 2) * (1 / Math.sqrt(1 + 12 * h / w))
    }
    
    return eEff
  } else {
    // Stripline uses full dielectric constant
    return er
  }
})

// Calculate characteristic impedance
const calculatedImpedance = computed(() => {
  const w = traceWidth.value
  const h = substrateHeight.value
  const t = copperThickness.value
  const er = dielectricConstant.value

  if (lineType.value === 'microstrip') {
    // Microstrip impedance (simplified IPC formula)
    const wOverH = w / h
    
    if (wOverH < 1) {
      const z0 = (60 / Math.sqrt(effectiveDielectric.value)) * 
        Math.log(8 * h / w + 0.25 * w / h)
      return z0
    } else {
      const z0 = (120 * Math.PI) / (Math.sqrt(effectiveDielectric.value) * 
        (w / h + 1.393 + 0.667 * Math.log(w / h + 1.444)))
      return z0
    }
  } else {
    // Symmetrical stripline impedance
    const h1 = h
    const h2 = substrateHeight2.value
    const b = h1 + h2 + t // Total distance between ground planes
    const wEff = w + (t / Math.PI) * (1 + Math.log(2 * b / t)) // Effective width
    
    const z0 = (60 / Math.sqrt(er)) * Math.log(1.9 * (2 * h + t) / (w + 0.8 * t))
    return z0
  }
})

// Velocity factor (ratio to speed of light)
const velocityFactor = computed(() => {
  return 1 / Math.sqrt(effectiveDielectric.value)
})

// Propagation delay in ps/inch
const calculatedDelay = computed(() => {
  // Speed of light = 11.8 inches per nanosecond
  const cInchesPerNs = 11.8
  const delay = 1 / (cInchesPerNs * velocityFactor.value)
  return delay * 1000 // Convert to ps/inch
})

// Electrical length at 1 GHz (degrees per inch)
const electricalLength = computed(() => {
  // At 1 GHz, period = 1 ns = 360 degrees
  // Delay in ns per inch = calculatedDelay / 1000
  const delayNs = calculatedDelay.value / 1000
  const degreesPerInch = delayNs * 360 // 360 degrees per ns at 1 GHz
  return degreesPerInch
})

// Wavelength at 1 GHz in inches
const wavelength = computed(() => {
  // wavelength = velocity / frequency
  // At 1 GHz: wavelength = (velocityFactor * c) / 1e9
  const cInchesPerNs = 11.8
  const velocity = velocityFactor.value * cInchesPerNs
  return velocity // inches at 1 GHz
})

// Impedance status
const impedanceStatus = computed(() => {
  const z0 = calculatedImpedance.value
  
  if (z0 >= 45 && z0 <= 55) {
    return { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', text: 'Good (≈50Ω)' }
  } else if (z0 >= 40 && z0 <= 60) {
    return { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', text: 'Acceptable' }
  } else {
    return { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', text: 'Adjust Parameters' }
  }
})

// SEO
useHead({
  title: 'Transmission Line Calculator - PCB Impedance Calculator',
  meta: [
    { name: 'description', content: 'Calculate characteristic impedance, propagation delay, and electrical length for microstrip and stripline PCB transmission lines. Support for FR-4 and high-frequency materials.' }
  ]
})
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
  appearance: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #9FA8DA;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

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

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}
</style>

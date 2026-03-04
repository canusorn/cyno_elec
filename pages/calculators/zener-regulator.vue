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
            Zener Diode Regulator Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Design Zener diode voltage regulator circuits with proper series resistor sizing
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-xl font-mono font-bold">
              <span class="text-primary">Rₛ</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary">Vᵢₙ</span>
              <span class="text-gray-400">−</span>
              <span class="text-primary">Vz</span>
              <span class="text-gray-400">)</span>
              <span class="text-gray-400">/</span>
              <span class="text-primary">Iz</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Input Controls -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Circuit Parameters
              </h3>
              
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
                    min="1"
                    max="100"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter Vin"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12 text-lg font-semibold">V</span>
                </div>
                <input 
                  v-model.number="inputVoltage"
                  type="range"
                  min="5"
                  max="50"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Unregulated DC input voltage</p>
              </div>

              <!-- Zener Voltage -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zener Voltage (Vz)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="zenerVoltage"
                    type="number" 
                    step="0.1"
                    min="1"
                    max="50"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter Vz"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12 text-lg font-semibold">V</span>
                </div>
                <div class="grid grid-cols-5 gap-2 mt-2">
                  <button 
                    v-for="v in commonZenerVoltages"
                    :key="v"
                    @click="zenerVoltage = v"
                    :class="zenerVoltage === v ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="px-2 py-1 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  >
                    {{ v }}V
                  </button>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Desired regulated output voltage</p>
              </div>

              <!-- Load Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Load Current (IL)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="loadCurrent"
                    type="number" 
                    step="1"
                    min="0"
                    max="1000"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter IL"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12 text-lg font-semibold">mA</span>
                </div>
                <input 
                  v-model.number="loadCurrent"
                  type="range"
                  min="0"
                  max="500"
                  step="5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Current drawn by the load</p>
              </div>

              <!-- Zener Current -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zener Bias Current (Iz)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="zenerCurrent"
                    type="number" 
                    step="0.1"
                    min="1"
                    max="100"
                    class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold transition-all"
                    placeholder="Enter Iz"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12 text-lg font-semibold">mA</span>
                </div>
                <input 
                  v-model.number="zenerCurrent"
                  type="range"
                  min="1"
                  max="50"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep zener in reverse breakdown (5-10 mA typical)</p>
              </div>

              <!-- Power Rating -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zener Power Rating
                </label>
                <div class="grid grid-cols-5 gap-2">
                  <button 
                    v-for="p in powerRatings"
                    :key="p"
                    @click="powerRating = p"
                    :class="powerRating === p ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                    class="px-2 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  >
                    {{ p }}W
                  </button>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Select zener diode power rating</p>
              </div>
            </div>
          </div>

          <!-- Results and Visualizations -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Main Results -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Design Results
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Series Resistor -->
                <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Series Resistor (Rs)</div>
                  <div class="text-4xl font-bold text-primary mb-2">
                    {{ calculatedRs }} Ω
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Nearest standard: {{ nearestStandardRs }} Ω
                  </div>
                </div>

                <!-- Resistor Power -->
                <div class="bg-gradient-to-br from-orange-500/10 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Resistor Power Dissipation</div>
                  <div class="text-4xl font-bold text-orange-500 mb-2">
                    {{ resistorPower }} W
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Use ≥ {{ recommendedResistorPower }}W resistor
                  </div>
                </div>

                <!-- Zener Power -->
                <div class="bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Zener Power Dissipation</div>
                  <div class="text-4xl font-bold" :class="zenerPowerSafe ? 'text-green-500' : 'text-red-500'">
                    {{ zenerPower }} W
                  </div>
                  <div class="text-sm" :class="zenerPowerSafe ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ zenerPowerSafe ? '✓ Safe' : '⚠ Exceeds rating!' }}
                  </div>
                </div>

                <!-- Regulation -->
                <div class="bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 rounded-xl p-6">
                  <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Output Voltage</div>
                  <div class="text-4xl font-bold text-blue-500 mb-2">
                    {{ zenerVoltage }} V
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Regulated (±5% typical)
                  </div>
                </div>
              </div>
            </div>

            <!-- Circuit Diagram -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Diagram</h3>
              <div class="flex justify-center">
                <svg viewBox="0 0 500 250" class="w-full max-w-2xl">
                  <!-- Background -->
                  <rect width="500" height="250" fill="transparent"/>
                  
                  <!-- Input line -->
                  <line x1="50" y1="100" x2="120" y2="100" stroke="currentColor" stroke-width="3"/>
                  <text x="50" y="80" class="text-sm font-semibold" fill="currentColor">Vin</text>
                  
                  <!-- Series Resistor -->
                  <rect x="120" y="85" width="60" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="140" y="105" class="text-sm font-bold" fill="currentColor" text-anchor="middle">Rs</text>
                  <text x="150" y="140" class="text-xs" fill="currentColor" text-anchor="middle">{{ nearestStandardRs }}Ω</text>
                  
                  <!-- Connection point -->
                  <circle cx="180" cy="100" r="4" fill="currentColor"/>
                  
                  <!-- Zener diode (vertical) -->
                  <line x1="200" y1="100" x2="200" y2="140" stroke="currentColor" stroke-width="3"/>
                  <line x1="185" y1="140" x2="215" y2="140" stroke="currentColor" stroke-width="3"/>
                  <line x1="190" y1="145" x2="190" y2="155" stroke="currentColor" stroke-width="2"/>
                  <line x1="210" y1="145" x2="210" y2="155" stroke="currentColor" stroke-width="2"/>
                  <line x1="185" y1="155" x2="215" y2="155" stroke="currentColor" stroke-width="2"/>
                  <text x="220" y="150" class="text-sm font-bold" fill="currentColor">Dz</text>
                  <text x="220" y="165" class="text-xs" fill="currentColor">{{ zenerVoltage }}V</text>
                  
                  <!-- Ground connection -->
                  <line x1="200" y1="155" x2="200" y2="190" stroke="currentColor" stroke-width="2"/>
                  <line x1="185" y1="190" x2="215" y2="190" stroke="currentColor" stroke-width="2"/>
                  <line x1="190" y1="195" x2="210" y2="195" stroke="currentColor" stroke-width="2"/>
                  
                  <!-- Output to load -->
                  <line x1="180" y1="100" x2="280" y2="100" stroke="currentColor" stroke-width="3"/>
                  <text x="230" y="80" class="text-sm font-semibold" fill="currentColor" text-anchor="middle">Vout</text>
                  
                  <!-- Load resistor -->
                  <rect x="280" y="85" width="60" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
                  <text x="310" y="105" class="text-sm font-bold" fill="currentColor" text-anchor="middle">RL</text>
                  <text x="310" y="140" class="text-xs" fill="currentColor" text-anchor="middle">{{ loadResistance }}Ω</text>
                  
                  <!-- Load ground -->
                  <line x1="340" y1="100" x2="370" y2="100" stroke="currentColor" stroke-width="3"/>
                  <text x="350" y="80" class="text-sm font-semibold" fill="currentColor" text-anchor="middle">GND</text>
                  
                  <!-- Current arrows -->
                  <g transform="translate(160, 70)">
                    <text class="text-xs" fill="currentColor" text-anchor="middle">I total</text>
                    <path d="M -5 10 L 5 10 L 0 15 Z" fill="currentColor"/>
                  </g>
                  <g transform="translate(250, 70)">
                    <text class="text-xs" fill="currentColor" text-anchor="middle">Iz</text>
                    <path d="M -5 10 L 5 10 L 0 15 Z" fill="currentColor"/>
                  </g>
                  <g transform="translate(320, 70)">
                    <text class="text-xs" fill="currentColor" text-anchor="middle">IL</text>
                    <path d="M -5 10 L 5 10 L 0 15 Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Analysis Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Circuit Analysis</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Current</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ totalCurrent }} mA</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Load Resistance</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ loadResistance }} Ω</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Efficiency</div>
                  <div class="text-xl font-bold text-gray-900 dark:text-white">{{ efficiency }}%</div>
                </div>
              </div>

              <!-- Warnings -->
              <div v-if="warnings.length > 0" class="space-y-2">
                <div v-for="(warning, index) in warnings" :key="index" 
                     class="flex items-start gap-2 p-3 rounded-lg"
                     :class="warning.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'">
                  <span class="text-xl">{{ warning.icon }}</span>
                  <span class="text-sm" :class="warning.type === 'error' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'">
                    {{ warning.message }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Design Presets</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  @click="applyPreset('5v')"
                  class="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 rounded-xl transition-all"
                >
                  <div class="font-bold text-gray-900 dark:text-white mb-1">5V Logic</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">9V → 5V @ 50mA</div>
                </button>
                <button 
                  @click="applyPreset('12v')"
                  class="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 rounded-xl transition-all"
                >
                  <div class="font-bold text-gray-900 dark:text-white mb-1">12V Supply</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">18V → 12V @ 100mA</div>
                </button>
                <button 
                  @click="applyPreset('3.3v')"
                  class="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 rounded-xl transition-all"
                >
                  <div class="font-bold text-gray-900 dark:text-white mb-1">3.3V MCU</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">5V → 3.3V @ 20mA</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Understanding Zener Diode Regulators
          </h3>

          <div class="space-y-6 text-gray-700 dark:text-gray-300">
            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">How It Works</h4>
              <p class="mb-3">
                A Zener diode voltage regulator uses the Zener diode's reverse breakdown characteristic to maintain a constant output voltage. When reverse-biased beyond its breakdown voltage (Vz), the Zener diode conducts current while maintaining a relatively constant voltage across its terminals.
              </p>
              <p>
                The series resistor (Rs) limits the current through the Zener diode and drops the excess voltage (Vin - Vz). The Zener diode acts as a variable load, adjusting its current to maintain Vz across the load.
              </p>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Formulas</h4>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm space-y-2">
                <div><strong>Series Resistor:</strong> Rs = (Vin - Vz) / Iz</div>
                <div><strong>Total Current:</strong> Itotal = Iz + IL</div>
                <div><strong>Load Resistance:</strong> RL = Vz / IL</div>
                <div><strong>Resistor Power:</strong> Prs = (Vin - Vz)² / Rs</div>
                <div><strong>Zener Power:</strong> Pz = Vz × Iz</div>
                <div><strong>Efficiency:</strong> η = (Vz × IL) / (Vin × Itotal)</div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Design Guidelines</h4>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Input voltage:</strong> Must be higher than Vz (typically 2-3V minimum headroom)</li>
                <li><strong>Zener current (Iz):</strong> Keep between 5-10 mA for stable regulation</li>
                <li><strong>Power rating:</strong> Choose zener with ≥ 2× expected power dissipation for reliability</li>
                <li><strong>Load variations:</strong> This simple regulator works best for constant loads</li>
                <li><strong>Ripple rejection:</strong> Limited compared to IC regulators; add capacitor for filtering</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Applications</h4>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Reference voltage:</strong> Provides stable voltage reference for comparators and ADCs</li>
                <li><strong>Simple supplies:</strong> Low-cost regulation for non-critical circuits</li>
                <li><strong>Protection:</strong> Voltage clipping and overvoltage protection</li>
                <li><strong>Biasing:</strong> Setting bias points in amplifier circuits</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Limitations</h4>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Efficiency:</strong> Low efficiency, especially at high Vin/Vz ratios</li>
                <li><strong>Load regulation:</strong> Output voltage varies with load current changes</li>
                <li><strong>Power dissipation:</strong> Excess power wasted as heat in Rs</li>
                <li><strong>Current limit:</strong> Not suitable for high-current applications</li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3">When to Use IC Regulators Instead</h4>
              <p class="mb-3">
                For better performance, consider using linear IC regulators (78xx series) or switching regulators for:
              </p>
              <ul class="list-disc list-inside space-y-2">
                <li>Higher output current requirements (>100mA)</li>
                <li>Better load and line regulation needed</li>
                <li>Higher efficiency required (use switching regulators)</li>
                <li>Thermal constraints (ICs often have thermal protection)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Input values
const inputVoltage = ref(12)
const zenerVoltage = ref(5.1)
const loadCurrent = ref(50)
const zenerCurrent = ref(10)
const powerRating = ref(0.5)

// Common zener voltages
const commonZenerVoltages = [2.4, 3.3, 3.9, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1, 10, 12, 15, 18, 24]

// Power ratings
const powerRatings = [0.25, 0.5, 1.0, 1.5, 2.0, 5.0]

// Standard resistor values (E24 series)
const standardResistors = [
  10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30,
  33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91,
  100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300,
  330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910,
  1000, 1100, 1200, 1300, 1500, 1600, 1800, 2000, 2200, 2400, 2700, 3000,
  3300, 3600, 3900, 4300, 4700, 5100, 5600, 6200, 6800, 7500, 8200, 9100,
  10000, 11000, 12000, 13000, 15000, 16000, 18000, 20000, 22000, 24000, 27000, 30000
]

// Calculated values
const calculatedRs = computed(() => {
  const voltageDrop = Math.max(0, inputVoltage.value - zenerVoltage.value)
  const totalCurrent = (loadCurrent.value + zenerCurrent.value) / 1000 // Convert mA to A
  if (totalCurrent === 0) return 0
  return Math.round(voltageDrop / totalCurrent)
})

const nearestStandardRs = computed(() => {
  const target = calculatedRs.value
  if (target === 0) return 0
  
  let nearest = standardResistors[0]
  let minDiff = Math.abs(standardResistors[0] - target)
  
  for (const r of standardResistors) {
    const diff = Math.abs(r - target)
    if (diff < minDiff) {
      minDiff = diff
      nearest = r
    }
  }
  
  return nearest
})

const resistorPower = computed(() => {
  const voltageDrop = Math.max(0, inputVoltage.value - zenerVoltage.value)
  const rs = nearestStandardRs.value
  if (rs === 0) return 0
  return ((voltageDrop ** 2) / rs).toFixed(3)
})

const recommendedResistorPower = computed(() => {
  const power = parseFloat(resistorPower.value)
  if (power <= 0.125) return 0.25
  if (power <= 0.25) return 0.5
  if (power <= 0.5) return 1
  if (power <= 1) return 2
  if (power <= 2) return 3
  return Math.ceil(power * 1.5)
})

const zenerPower = computed(() => {
  return ((zenerVoltage.value * zenerCurrent.value) / 1000).toFixed(3)
})

const zenerPowerSafe = computed(() => {
  return parseFloat(zenerPower.value) <= (powerRating.value * 0.8) // 80% safety margin
})

const totalCurrent = computed(() => {
  return (loadCurrent.value + zenerCurrent.value).toFixed(1)
})

const loadResistance = computed(() => {
  if (loadCurrent.value === 0) return '∞'
  return Math.round((zenerVoltage.value / loadCurrent.value) * 1000)
})

const efficiency = computed(() => {
  const pOut = zenerVoltage.value * (loadCurrent.value / 1000)
  const pIn = inputVoltage.value * ((loadCurrent.value + zenerCurrent.value) / 1000)
  if (pIn === 0) return 0
  return ((pOut / pIn) * 100).toFixed(1)
})

const warnings = computed(() => {
  const w = []
  
  if (inputVoltage.value <= zenerVoltage.value) {
    w.push({
      type: 'error',
      icon: '⚠️',
      message: 'Input voltage must be higher than Zener voltage for regulation'
    })
  }
  
  if ((inputVoltage.value - zenerVoltage.value) < 1) {
    w.push({
      type: 'warning',
      icon: '⚡',
      message: 'Low headroom: Keep Vin at least 2V above Vz for stable regulation'
    })
  }
  
  if (zenerCurrent.value < 5) {
    w.push({
      type: 'warning',
      icon: '📉',
      message: 'Zener current below 5mA: Regulation may be poor'
    })
  }
  
  if (!zenerPowerSafe.value) {
    w.push({
      type: 'error',
      icon: '🔥',
      message: `Zener power (${zenerPower.value}W) exceeds 80% of ${powerRating.value}W rating`
    })
  }
  
  if (parseFloat(efficiency.value) < 50) {
    w.push({
      type: 'warning',
      icon: '💡',
      message: 'Low efficiency: Consider a switching regulator for better efficiency'
    })
  }
  
  return w
})

// Apply preset
const applyPreset = (preset: string) => {
  switch (preset) {
    case '5v':
      inputVoltage.value = 9
      zenerVoltage.value = 5.1
      loadCurrent.value = 50
      zenerCurrent.value = 10
      powerRating.value = 0.5
      break
    case '12v':
      inputVoltage.value = 18
      zenerVoltage.value = 12
      loadCurrent.value = 100
      zenerCurrent.value = 15
      powerRating.value = 1.0
      break
    case '3.3v':
      inputVoltage.value = 5
      zenerVoltage.value = 3.3
      loadCurrent.value = 20
      zenerCurrent.value = 5
      powerRating.value = 0.25
      break
  }
}

// Color mode
const colorMode = ref('light')
if (process.client) {
  colorMode.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  
  // Watch for dark mode changes
  const observer = new MutationObserver(() => {
    colorMode.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}
</script>

<style scoped>
.slider-primary {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  transition: all 0.15s ease;
}

.slider-primary::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  transition: all 0.15s ease;
}

.slider-primary::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}
</style>

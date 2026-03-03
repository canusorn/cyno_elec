<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Resistor Wattage Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate power dissipation and determine the appropriate resistor wattage rating for safe operation
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col items-center gap-2 text-lg font-mono font-bold">
              <div class="flex items-center gap-2">
                <span class="text-primary-highlight">P</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">V²</span>
                <span class="text-gray-400">/</span>
                <span class="text-primary-highlight">R</span>
                <span class="text-gray-400 ml-2">or</span>
                <span class="text-primary-highlight">P</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">I²</span>
                <span class="text-gray-400">×</span>
                <span class="text-primary-highlight">R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          
          <!-- Calculation Mode -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calculate Using</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                @click="calcMode = 'voltage'"
                :class="calcMode === 'voltage' ? 'bg-primary text-white scale-105 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3"
              >
                <BoltIcon class="h-5 w-5" />
                Voltage & Resistance
              </button>
              <button 
                @click="calcMode = 'current'"
                :class="calcMode === 'current' ? 'bg-primary text-white scale-105 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Current & Resistance
              </button>
            </div>
          </div>

          <!-- Input Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Voltage Mode Inputs -->
            <div v-if="calcMode === 'voltage'" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Voltage (V)
                </label>
                <div class="flex items-center gap-3">
                  <input 
                    v-model.number="voltage" 
                    type="number" 
                    min="0" 
                    step="0.1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
                    placeholder="Enter voltage"
                  />
                  <div class="px-4 py-3 bg-gray-100 dark:bg-gray-600 rounded-lg font-mono text-gray-700 dark:text-gray-300 font-bold min-w-[60px]">
                    V
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-3">
                  <input 
                    v-model.number="resistance" 
                    type="number" 
                    min="0.1" 
                    step="0.1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
                    placeholder="Enter resistance"
                  />
                  <div class="flex gap-1">
                    <button 
                      v-for="unit in ['Ω', 'kΩ', 'MΩ']" 
                      :key="unit"
                      @click="resistanceUnit = unit"
                      :class="resistanceUnit === unit ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
                      class="px-3 py-3 rounded-lg font-semibold text-sm transition-colors min-w-[50px]"
                    >
                      {{ unit }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Current Mode Inputs -->
            <div v-else class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current (I)
                </label>
                <div class="flex items-center gap-3">
                  <input 
                    v-model.number="current" 
                    type="number" 
                    min="0" 
                    step="0.001"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
                    placeholder="Enter current"
                  />
                  <div class="flex gap-1">
                    <button 
                      v-for="unit in ['mA', 'A']" 
                      :key="unit"
                      @click="currentUnit = unit"
                      :class="currentUnit === unit ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
                      class="px-3 py-3 rounded-lg font-semibold text-sm transition-colors min-w-[50px]"
                    >
                      {{ unit }}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Resistance (R)
                </label>
                <div class="flex items-center gap-3">
                  <input 
                    v-model.number="resistance" 
                    type="number" 
                    min="0.1" 
                    step="0.1"
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-lg"
                    placeholder="Enter resistance"
                  />
                  <div class="flex gap-1">
                    <button 
                      v-for="unit in ['Ω', 'kΩ', 'MΩ']" 
                      :key="unit"
                      @click="resistanceUnit = unit"
                      :class="resistanceUnit === unit ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
                      class="px-3 py-3 rounded-lg font-semibold text-sm transition-colors min-w-[50px]"
                    >
                      {{ unit }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Safety Margin -->
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Safety Margin
                </label>
                <div class="flex items-center gap-3">
                  <input 
                    v-model.number="safetyMargin" 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="10"
                    class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div class="px-4 py-3 bg-gray-100 dark:bg-gray-600 rounded-lg font-mono text-gray-700 dark:text-gray-300 font-bold min-w-[80px]">
                    {{ safetyMargin }}%
                  </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Recommended: 50-100% for reliable operation
                </p>
              </div>

              <!-- Preset Buttons -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Quick Scenarios
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    @click="setPreset('led')"
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    LED Resistor (5V)
                  </button>
                  <button 
                    @click="setPreset('arduino')"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  >
                    Arduino I/O (5V)
                  </button>
                  <button 
                    @click="setPreset('power')"
                    class="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Power Supply (12V)
                  </button>
                  <button 
                    @click="setPreset('mains')"
                    class="px-3 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                  >
                    Mains Dropper (230V)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Reset Button -->
          <div class="flex justify-center">
            <button 
              @click="resetCalculator"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Calculator
            </button>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="powerDissipated > 0" class="space-y-6">
          
          <!-- Power Display -->
          <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 text-white">
            <div class="text-center">
              <div class="text-orange-100 text-lg font-semibold mb-2">Power Dissipated</div>
              <div class="text-6xl font-bold mb-4">
                {{ formatPower(powerDissipated) }}
              </div>
              <div class="bg-white/20 rounded-lg px-4 py-2 inline-block">
                <span v-if="calcMode === 'voltage'">
                  P = V²/R = {{ voltage }}² / {{ formatResistance(resistanceOhms) }} = {{ formatPower(powerDissipated) }}
                </span>
                <span v-else>
                  P = I²R = {{ formatCurrent(currentAmps) }}² × {{ formatResistance(resistanceOhms) }} = {{ formatPower(powerDissipated) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Power Visualization Bar -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Power vs Standard Ratings</h3>
            
            <div class="space-y-4">
              <div 
                v-for="rating in standardRatings" 
                :key="rating"
                class="relative"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-semibold text-gray-700 dark:text-gray-300">{{ rating }}W Resistor</span>
                  <span 
                    class="font-bold"
                    :class="getRatingColorClass(powerDissipated, rating)"
                  >
                    {{ ((powerDissipated / rating) * 100).toFixed(1) }}%
                  </span>
                </div>
                
                <div class="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <!-- Power bar -->
                  <div 
                    class="absolute left-0 top-0 h-full transition-all duration-300 ease-out flex items-center justify-end pr-3"
                    :class="getPowerBarClass(powerDissipated, rating)"
                    :style="{ width: Math.min((powerDissipated / rating) * 100, 100) + '%' }"
                  >
                    <span class="text-xs font-bold text-white">
                      {{ formatPower(powerDissipated) }}
                    </span>
                  </div>
                  
                  <!-- Rating marker -->
                  <div 
                    class="absolute top-0 h-full w-0.5 bg-gray-800 dark:bg-gray-300"
                    style="right: 0;"
                  ></div>
                </div>
                
                <!-- Recommendation -->
                <div class="mt-2 text-sm">
                  <span 
                    class="font-semibold"
                    :class="getRatingColorClass(powerDissipated, rating)"
                  >
                    {{ getRecommendation(powerDissipated, rating) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Wattage Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎯 Recommended Resistor Rating
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div :class="getRecommendationCardClass(recommendedWattage, 'conservative')">
                <div class="text-sm font-semibold mb-2 opacity-80">Conservative (2× Safety)</div>
                <div class="text-4xl font-bold mb-2">{{ recommendedWattage.conservative }}W</div>
                <div class="text-sm opacity-80">
                  {{ formatPower(powerDissipated * 2) }} capacity<br/>
                  Very safe, long lifespan
                </div>
              </div>
              
              <div :class="getRecommendationCardClass(recommendedWattage, 'standard')">
                <div class="text-sm font-semibold mb-2 opacity-80">Standard ({{ 100 + safetyMargin }}% Safety)</div>
                <div class="text-4xl font-bold mb-2">{{ recommendedWattage.standard }}W</div>
                <div class="text-sm opacity-80">
                  {{ formatPower(powerDissipated * (1 + safetyMargin / 100)) }} capacity<br/>
                  Adequate for most applications
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div class="flex items-start gap-3">
                <svg class="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <div class="font-bold text-gray-900 dark:text-white mb-1">Important Notes:</div>
                  <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Always use a resistor with a wattage rating higher than calculated power</li>
                    <li>• Higher temperatures reduce resistor lifespan - consider derating</li>
                    <li>• For high-power applications, consider using wirewound resistors</li>
                    <li>• Multiple resistors in series/parallel can share power dissipation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Calculations -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BoltIcon class="h-5 w-5 text-blue-500" />
                Current Flow
              </h3>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {{ formatCurrent(currentFlow) }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ calcMode === 'voltage' 
                  ? `I = V/R = ${voltage}V / ${formatResistance(resistanceOhms)} = ${formatCurrent(currentFlow)}`
                  : `From input: ${formatCurrent(currentAmps)}`
                }}
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg class="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Heat Generation
              </h3>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {{ heatGeneration }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Estimated temperature rise above ambient
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
          <BoltIcon class="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Enter Values to Calculate
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Provide voltage and resistance, or current and resistance to determine the required resistor wattage
          </p>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Resistor Wattage
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Wattage Rating?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The wattage rating of a resistor indicates the maximum amount of power it can safely dissipate as heat 
              without being damaged. Exceeding this rating can cause the resistor to overheat, change value, or even burn out.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>P = V × I</strong> (Power = Voltage × Current)</div>
              <div><strong>P = V² / R</strong> (Power = Voltage² ÷ Resistance)</div>
              <div><strong>P = I² × R</strong> (Power = Current² × Resistance)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Standard Wattage Ratings:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>1/8W (0.125W):</strong> Signal-level circuits, low-power applications</li>
              <li><strong>1/4W (0.25W):</strong> General purpose, most common through-hole size</li>
              <li><strong>1/2W (0.5W):</strong> Medium power applications</li>
              <li><strong>1W:</strong> Higher power circuits, power supplies</li>
              <li><strong>2W, 3W, 5W:</strong> Power applications, voltage regulators</li>
              <li><strong>10W and above:</strong> High-power applications, braking resistors</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Use Safety Margins?</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Resistors can fail prematurely when operated near maximum ratings</li>
              <li>Higher temperatures reduce resistor lifespan and can change resistance values</li>
              <li>Voltage spikes, surges, or transient currents can exceed normal operating conditions</li>
              <li>Poor ventilation or enclosed spaces increase operating temperature</li>
              <li>A 50-100% safety margin ensures reliable long-term operation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Types of Power Resistors:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">Wirewound</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• High power handling (2W to 100W+)</li>
                  <li>• Very stable and accurate</li>
                  <li>• Low temperature coefficient</li>
                  <li>• Inductive (not for RF)</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">Thick Film</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Medium power (0.5W to 3W)</li>
                  <li>• Low cost</li>
                  <li>• Good stability</li>
                  <li>• Non-inductive</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-bold text-orange-800 dark:text-orange-300 mb-2">Metal Oxide</h4>
                <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>• High power (1W to 5W)</li>
                  <li>• Good surge handling</li>
                  <li>• Stable at high temps</li>
                  <li>• Flame retardant</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">Ceramic</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• Very high power (10W+)</li>
                  <li>• Excellent heat dissipation</li>
                  <li>• Non-inductive</li>
                  <li>• High voltage capability</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For an LED with a 330Ω resistor connected to 5V:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Voltage across resistor: 5V - 2V (LED) = 3V</li>
              <li>Current: 3V ÷ 330Ω = 9.09 mA</li>
              <li>Power: (3V)² ÷ 330Ω = 0.027W (27mW)</li>
              <li>Recommended: 0.125W (1/8W) or 0.25W resistor</li>
              <li>A standard 1/4W resistor provides 9× safety margin</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { BoltIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Resistor Wattage Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate resistor power dissipation and determine the appropriate wattage rating. Includes safety margin recommendations for reliable circuit design.' },
    { name: 'keywords', content: 'resistor wattage, power rating, power calculator, ohms law, resistor safety, electrical power' }
  ]
})

const colorMode = useColorMode()

// Input values
const calcMode = ref<'voltage' | 'current'>('voltage')
const voltage = ref<number>(5)
const current = ref<number>(20)
const resistance = ref<number>(330)
const resistanceUnit = ref<'Ω' | 'kΩ' | 'MΩ'>('Ω')
const currentUnit = ref<'mA' | 'A'>('mA')
const safetyMargin = ref<number>(50)

// Standard wattage ratings
const standardRatings = [0.125, 0.25, 0.5, 1, 2, 3, 5]

// Computed values
const resistanceOhms = computed(() => {
  switch (resistanceUnit.value) {
    case 'kΩ': return resistance.value * 1000
    case 'MΩ': return resistance.value * 1000000
    default: return resistance.value
  }
})

const currentAmps = computed(() => {
  return currentUnit.value === 'mA' ? current.value / 1000 : current.value
})

const currentFlow = computed(() => {
  if (calcMode.value === 'voltage') {
    return voltage.value / resistanceOhms.value
  }
  return currentAmps.value
})

const powerDissipated = computed(() => {
  if (calcMode.value === 'voltage') {
    return (voltage.value * voltage.value) / resistanceOhms.value
  }
  return currentAmps.value * currentAmps.value * resistanceOhms.value
})

const heatGeneration = computed(() => {
  const watts = powerDissipated.value
  if (watts < 0.1) return 'Minimal'
  if (watts < 0.5) return 'Low'
  if (watts < 1) return 'Moderate'
  if (watts < 3) return 'Warm'
  return 'Hot - Use heatsink!'
})

const recommendedWattage = computed(() => {
  const conservative = powerDissipated.value * 2
  const standard = powerDissipated.value * (1 + safetyMargin.value / 100)
  
  return {
    conservative: findStandardRating(conservative),
    standard: findStandardRating(standard)
  }
})

function findStandardRating(watts: number): number {
  for (const rating of standardRatings) {
    if (rating >= watts) return rating
  }
  return Math.ceil(watts)
}

// Helper functions
function formatPower(watts: number): string {
  if (watts < 0.01) return (watts * 1000).toFixed(2) + ' mW'
  if (watts < 1) return (watts * 1000).toFixed(1) + ' mW'
  return watts.toFixed(3) + ' W'
}

function formatCurrent(amps: number): string {
  if (amps < 0.001) return (amps * 1000000).toFixed(2) + ' µA'
  if (amps < 1) return (amps * 1000).toFixed(2) + ' mA'
  return amps.toFixed(3) + ' A'
}

function formatResistance(ohms: number): string {
  if (ohms >= 1000000) return (ohms / 1000000).toFixed(2) + 'MΩ'
  if (ohms >= 1000) return (ohms / 1000).toFixed(2) + 'kΩ'
  return ohms.toFixed(1) + 'Ω'
}

function getRatingColorClass(power: number, rating: number): string {
  const percentage = (power / rating) * 100
  if (percentage > 100) return 'text-red-600 dark:text-red-400'
  if (percentage > 80) return 'text-orange-600 dark:text-orange-400'
  if (percentage > 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
}

function getPowerBarClass(power: number, rating: number): string {
  const percentage = (power / rating) * 100
  if (percentage > 100) return 'bg-gradient-to-r from-red-600 to-red-700'
  if (percentage > 80) return 'bg-gradient-to-r from-orange-500 to-orange-600'
  if (percentage > 50) return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
  return 'bg-gradient-to-r from-green-500 to-green-600'
}

function getRecommendation(power: number, rating: number): string {
  const percentage = (power / rating) * 100
  if (percentage > 100) return '❌ OVERLOAD - Too small!'
  if (percentage > 80) return '⚠️ Warning - Operates near limit'
  if (percentage > 50) return '✅ Adequate - Consider larger for safety'
  return '✅ Excellent - Plenty of headroom'
}

function getRecommendationCardClass(recommended: { conservative: number; standard: number }, type: 'conservative' | 'standard'): string {
  const rating = type === 'conservative' ? recommended.conservative : recommended.standard
  const percentage = (powerDissipated.value / rating) * 100
  
  let baseClass = 'rounded-xl p-6 text-white transition-all duration-300 '
  if (percentage > 80) {
    baseClass += 'bg-gradient-to-br from-orange-500 to-red-600'
  } else if (percentage > 50) {
    baseClass += 'bg-gradient-to-br from-yellow-500 to-orange-600'
  } else {
    baseClass += 'bg-gradient-to-br from-green-500 to-emerald-600'
  }
  return baseClass
}

function resetCalculator() {
  voltage.value = 5
  current.value = 20
  resistance.value = 330
  resistanceUnit.value = 'Ω'
  currentUnit.value = 'mA'
  safetyMargin.value = 50
  calcMode.value = 'voltage'
}

function setPreset(type: 'led' | 'arduino' | 'power' | 'mains') {
  calcMode.value = 'voltage'
  resistanceUnit.value = 'Ω'
  
  switch (type) {
    case 'led':
      voltage.value = 3 // 5V - 2V LED forward
      resistance.value = 330
      break
    case 'arduino':
      voltage.value = 5
      resistance.value = 220
      break
    case 'power':
      voltage.value = 12
      resistance.value = 1000
      break
    case 'mains':
      voltage.value = 230
      resistance.value = 47000
      break
  }
}
</script>

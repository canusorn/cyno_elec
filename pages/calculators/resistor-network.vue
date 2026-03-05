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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Resistor Network Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent resistance for complex networks including bridge, ladder, and delta-wye configurations
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex flex-col items-center gap-3 text-lg font-mono font-bold">
              <div v-if="networkType === 'series'" class="flex items-center gap-3">
                <span class="text-primary-highlight">R_eq</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">R1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">R2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div v-else-if="networkType === 'parallel'" class="flex items-center gap-3">
                <span class="text-primary-highlight">1/R_eq</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary-highlight">1/R1</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">1/R2</span>
                <span class="text-gray-400">+</span>
                <span class="text-primary-highlight">...</span>
              </div>
              <div v-else-if="networkType === 'wheatstone'" class="flex items-center gap-2">
                <span class="text-primary-highlight">Bridge Analysis</span>
              </div>
              <div v-else-if="networkType === 'ladder'" class="flex items-center gap-2">
                <span class="text-primary-highlight">Ladder Network</span>
              </div>
              <div v-else class="flex items-center gap-2">
                <span class="text-primary-highlight">Delta-Wye Transform</span>
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
          
          <!-- Network Type Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select Network Type</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <button 
                v-for="type in networkTypes" 
                :key="type.id"
                @click="networkType = type.id"
                :class="networkType === type.id ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-1 text-sm"
              >
                <span class="text-2xl">{{ type.icon }}</span>
                <span>{{ type.name }}</span>
              </button>
            </div>
          </div>

          <!-- Series/Parallel Network -->
          <div v-if="networkType === 'series' || networkType === 'parallel'" class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Resistors</h3>
              <div class="flex gap-2">
                <button 
                  @click="addResistor"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Resistor
                </button>
                <button 
                  @click="resetResistors"
                  class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <!-- Resistor Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div 
                v-for="(resistor, index) in resistors" 
                :key="resistor.id"
                class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border-2 transition-all duration-200"
                :class="getResistorBorderClass(index)"
              >
                <!-- Remove button -->
                <button 
                  @click="removeResistor(index)"
                  :disabled="resistors.length <= 2"
                  class="absolute top-2 right-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <!-- Resistor Label -->
                <div class="flex items-center gap-2 mb-3">
                  <div 
                    class="w-4 h-4 rounded-full transition-colors duration-300"
                    :style="{ backgroundColor: getResistorColor(index) }"
                  ></div>
                  <span class="font-bold text-gray-900 dark:text-white">Resistor {{ index + 1 }}</span>
                </div>

                <!-- Resistor Input -->
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="resistor.value"
                    type="number"
                    min="0.1"
                    step="0.1"
                    @input="updateResistorColor(index)"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                    placeholder="Enter value"
                  />
                  <select 
                    v-model="resistor.unit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                  </select>
                </div>

                <!-- Preset Buttons -->
                <div class="flex gap-1 mt-2 flex-wrap">
                  <button 
                    v-for="preset in commonValues" 
                    :key="preset"
                    @click="setResistorValue(index, preset)"
                    class="text-xs px-2 py-1 bg-white dark:bg-gray-600 hover:bg-primary hover:text-white dark:hover:bg-primary rounded transition-colors"
                  >
                    {{ preset }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Wheatstone Bridge -->
          <div v-if="networkType === 'wheatstone'" class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Wheatstone Bridge Configuration</h3>
            
            <!-- Bridge Diagram -->
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 400 300" class="w-full max-w-md h-auto">
                <!-- Background -->
                <rect x="0" y="0" width="400" height="300" :fill="$colorMode === 'dark' ? '#1f2937' : '#ffffff'" opacity="0"/>
                
                <!-- Diamond shape -->
                <polygon points="200,50 350,150 200,250 50,150" 
                  fill="none" 
                  :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" 
                  stroke-width="3"/>
                
                <!-- R1 (top) -->
                <rect x="180" y="60" width="40" height="30" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="200" y="80" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">R1</text>
                
                <!-- R2 (right) -->
                <rect x="300" y="140" width="30" height="40" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="315" y="165" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">R2</text>
                
                <!-- R3 (bottom) -->
                <rect x="180" y="210" width="40" height="30" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="200" y="230" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">R3</text>
                
                <!-- R4 (left) -->
                <rect x="70" y="140" width="30" height="40" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="85" y="165" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">R4</text>
                
                <!-- Galvanometer (center) -->
                <circle cx="200" cy="150" r="20" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>
                <text x="200" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">G</text>
                
                <!-- Input/Output labels -->
                <text x="200" y="30" text-anchor="middle" font-size="12" fill="#374151">Vin</text>
                <text x="200" y="280" text-anchor="middle" font-size="12" fill="#374151">Vout</text>
                
                <!-- Balance indicator -->
                <text x="200" y="150" text-anchor="middle" font-size="10" :fill="isBridgeBalanced ? '#10b981' : '#ef4444'">
                  {{ isBridgeBalanced ? 'BALANCED' : 'UNBALANCED' }}
                </text>
              </svg>
            </div>

            <!-- Bridge Resistors -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div v-for="(resistor, index) in bridgeResistors" :key="'bridge-' + index" 
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {{ resistor.name }}
                </label>
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="resistor.value"
                    type="number"
                    min="0.1"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                  <select 
                    v-model="resistor.unit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Ladder Network -->
          <div v-if="networkType === 'ladder'" class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ladder Network Configuration</h3>
            
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 600 200" class="w-full max-w-2xl h-auto">
                <!-- Background -->
                <rect x="0" y="0" width="600" height="200" :fill="$colorMode === 'dark' ? '#1f2937' : '#ffffff'" opacity="0"/>
                
                <!-- Main line -->
                <line x1="50" y1="100" x2="550" y2="100" :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" stroke-width="3"/>
                
                <!-- Series resistors -->
                <rect x="140" y="90" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="160" y="105" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Rs1</text>
                
                <rect x="300" y="90" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="320" y="105" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Rs2</text>
                
                <rect x="460" y="90" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="480" y="105" text-anchor="middle" font-size="10" font-weight="bold" fill="#92400e">Rs3</text>
                
                <!-- Shunt resistors (vertical) -->
                <rect x="215" y="60" width="20" height="40" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
                <text x="225" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Rp1</text>
                
                <rect x="375" y="60" width="20" height="40" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
                <text x="385" y="85" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">Rp2</text>
                
                <!-- Labels -->
                <text x="30" y="105" font-size="12" fill="#374151">In</text>
                <text x="560" y="105" font-size="12" fill="#374151">Out</text>
              </svg>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              <div v-for="(resistor, index) in ladderResistors" :key="'ladder-' + index" 
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {{ resistor.name }}
                </label>
                <div class="flex items-center gap-2">
                  <input 
                    v-model.number="resistor.value"
                    type="number"
                    min="0.1"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                  />
                  <select 
                    v-model="resistor.unit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="Ω">Ω</option>
                    <option value="kΩ">kΩ</option>
                    <option value="MΩ">MΩ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Delta-Wye Transform -->
          <div v-if="networkType === 'deltawye'" class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Delta (Δ) to Wye (Y) Transformation</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Delta Configuration -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-bold text-gray-900 dark:text-white mb-3 text-center">Delta (Δ) Configuration</h4>
                <div class="flex justify-center mb-4">
                  <svg viewBox="0 0 200 200" class="w-48 h-48">
                    <polygon points="100,30 170,150 30,150" 
                      fill="none" 
                      :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" 
                      stroke-width="3"/>
                    
                    <!-- Ra -->
                    <rect x="80" y="70" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                    <text x="100" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Ra</text>
                    
                    <!-- Rb -->
                    <rect x="130" y="120" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2" transform="rotate(-60, 150, 130)"/>
                    <text x="150" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Rb</text>
                    
                    <!-- Rc -->
                    <rect x="30" y="120" width="40" height="20" fill="#fef3c7" stroke="#92400e" stroke-width="2" transform="rotate(60, 50, 130)"/>
                    <text x="50" y="135" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Rc</text>
                  </svg>
                </div>
                
                <div class="space-y-3">
                  <div v-for="(resistor, index) in deltaResistors" :key="'delta-' + index" 
                    class="flex items-center gap-2">
                    <label class="w-12 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {{ resistor.name }}
                    </label>
                    <input 
                      v-model.number="resistor.value"
                      type="number"
                      min="0.1"
                      step="0.1"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                    />
                    <select 
                      v-model="resistor.unit"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Wye Configuration -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-bold text-gray-900 dark:text-white mb-3 text-center">Wye (Y) Configuration</h4>
                <div class="flex justify-center mb-4">
                  <svg viewBox="0 0 200 200" class="w-48 h-48">
                    <!-- Center point -->
                    <circle cx="100" cy="100" r="10" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>
                    
                    <!-- Arms -->
                    <line x1="100" y1="100" x2="100" y2="40" :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" stroke-width="3"/>
                    <line x1="100" y1="100" x2="160" y2="150" :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" stroke-width="3"/>
                    <line x1="100" y1="100" x2="40" y2="150" :stroke="$colorMode === 'dark' ? '#4b5563' : '#9ca3af'" stroke-width="3"/>
                    
                    <!-- R1 -->
                    <rect x="90" y="60" width="20" height="30" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
                    <text x="100" y="80" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">R1</text>
                    
                    <!-- R2 -->
                    <rect x="110" y="115" width="30" height="20" fill="#bfdbfe" stroke="#1e40af" stroke-width="2" transform="rotate(-60, 125, 125)"/>
                    <text x="135" y="130" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">R2</text>
                    
                    <!-- R3 -->
                    <rect x="60" y="115" width="30" height="20" fill="#bfdbfe" stroke="#1e40af" stroke-width="2" transform="rotate(60, 75, 125)"/>
                    <text x="65" y="130" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e40af">R3</text>
                  </svg>
                </div>
                
                <div class="space-y-3">
                  <div v-for="(resistor, index) in wyeResistors" :key="'wye-' + index" 
                    class="flex items-center gap-2">
                    <label class="w-12 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {{ resistor.name }}
                    </label>
                    <input 
                      :value="resistor.value"
                      type="text"
                      readonly
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                    />
                    <span class="text-sm text-gray-500 dark:text-gray-400">Ω</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📊 Results
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Equivalent Resistance -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Equivalent Resistance</div>
                <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {{ formatResistance(equivalentResistance) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ equivalentResistance.toFixed(2) }} Ω
                </div>
              </div>

              <!-- Bridge Status (if applicable) -->
              <div v-if="networkType === 'wheatstone'" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Bridge Status</div>
                <div class="text-2xl font-bold mb-2" :class="isBridgeBalanced ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ isBridgeBalanced ? '✓ BALANCED' : '✗ UNBALANCED' }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ isBridgeBalanced ? 'R1/R2 = R3/R4' : 'Ratio mismatch' }}
                </div>
              </div>

              <!-- Total Power (at 1V) -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Power at 1V</div>
                <div class="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {{ totalPower.toFixed(3) }} W
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  P = V²/R
                </div>
              </div>
            </div>

            <!-- Formula Display -->
            <div v-if="networkType === 'series' || networkType === 'parallel'" class="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 class="font-bold text-gray-900 dark:text-white mb-3">Formula Used:</h4>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm text-center">
                <span v-if="networkType === 'series'">
                  R_eq = {{ resistors.map((r, i) => `R${i + 1}`).join(' + ') }}
                </span>
                <span v-else>
                  1/R_eq = {{ resistors.map((r, i) => `1/R${i + 1}`).join(' + ') }}
                </span>
              </div>
            </div>

            <!-- Delta-Wye Formulas -->
            <div v-if="networkType === 'deltawye'" class="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 class="font-bold text-gray-900 dark:text-white mb-3">Delta → Wye Formulas:</h4>
              <div class="space-y-2 text-sm">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono">
                  R1 = (Ra × Rc) / (Ra + Rb + Rc)
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono">
                  R2 = (Ra × Rb) / (Ra + Rb + Rc)
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono">
                  R3 = (Rb × Rc) / (Ra + Rb + Rc)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Resistor Networks
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series and Parallel Circuits</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a <strong>series</strong> circuit, resistors are connected end-to-end, and the same current flows through each resistor. The total resistance is the sum of individual resistances.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In a <strong>parallel</strong> circuit, resistors are connected across the same voltage points, and the voltage across each resistor is the same. The reciprocal of the total resistance equals the sum of reciprocals of individual resistances.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Wheatstone Bridge</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A Wheatstone bridge is used to measure unknown resistances with high precision. When balanced (R1/R2 = R3/R4), no current flows through the galvanometer, and the bridge is in equilibrium.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Applications:</strong> Strain gauges, pressure sensors, temperature measurements, and precision resistance measurements.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Ladder Networks</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Ladder networks consist of alternating series and shunt resistors, forming a repeating pattern. They are commonly used in attenuators, filter design, and impedance matching networks.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Delta-Wye Transformation</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Delta-Wye (Δ-Y) transformation is used to simplify complex resistor networks that cannot be reduced using simple series/parallel rules. It converts three resistors in a delta configuration to three resistors in a wye configuration, or vice versa.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Applications:</strong> Three-phase power systems, bridge circuit analysis, and complex network reduction.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use series/parallel reduction first before applying Delta-Wye transformation</li>
              <li>When analyzing bridge circuits, check for balance conditions first</li>
              <li>Ladder networks can be analyzed iteratively from the load end back to the source</li>
              <li>Delta-Wye transformations preserve terminal behavior but change internal structure</li>
              <li>Always verify your calculations using simulation or measurement</li>
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
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Resistor Network Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate equivalent resistance for complex resistor networks including series, parallel, Wheatstone bridge, ladder networks, and delta-wye transformations.' },
    { name: 'keywords', content: 'resistor network, equivalent resistance, Wheatstone bridge, delta-wye, ladder network, circuit analysis' }
  ]
})

const networkTypes = [
  { id: 'series', name: 'Series', icon: '➕' },
  { id: 'parallel', name: 'Parallel', icon: '∥' },
  { id: 'wheatstone', name: 'Bridge', icon: '◇' },
  { id: 'ladder', name: 'Ladder', icon: '🪜' },
  { id: 'deltawye', name: 'Δ-Y', icon: '🔺' }
]

const networkType = ref('series')

// Common resistor values
const commonValues = ['1', '2.2', '4.7', '10', '22', '47', '100', '220', '470', '1k']

// Series/Parallel resistors
const resistors = ref([
  { id: 1, value: 100, unit: 'Ω' },
  { id: 2, value: 220, unit: 'Ω' },
  { id: 3, value: 330, unit: 'Ω' }
])

// Bridge resistors
const bridgeResistors = ref([
  { name: 'R1', value: 100, unit: 'Ω' },
  { name: 'R2', value: 100, unit: 'Ω' },
  { name: 'R3', value: 100, unit: 'Ω' },
  { name: 'R4', value: 100, unit: 'Ω' }
])

// Ladder resistors
const ladderResistors = ref([
  { name: 'Rs1', value: 100, unit: 'Ω' },
  { name: 'Rp1', value: 220, unit: 'Ω' },
  { name: 'Rs2', value: 100, unit: 'Ω' },
  { name: 'Rp2', value: 220, unit: 'Ω' },
  { name: 'Rs3', value: 100, unit: 'Ω' }
])

// Delta resistors
const deltaResistors = ref([
  { name: 'Ra', value: 100, unit: 'Ω' },
  { name: 'Rb', value: 100, unit: 'Ω' },
  { name: 'Rc', value: 100, unit: 'Ω' }
])

// Wye resistors (calculated)
const wyeResistors = ref([
  { name: 'R1', value: 0 },
  { name: 'R2', value: 0 },
  { name: 'R3', value: 0 }
])

// Convert to ohms
const toOhms = (value: number, unit: string): number => {
  switch (unit) {
    case 'MΩ': return value * 1e6
    case 'kΩ': return value * 1e3
    default: return value
  }
}

// Format resistance
const formatResistance = (ohms: number): string => {
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`
  return `${ohms.toFixed(2)} Ω`
}

// Calculate equivalent resistance
const equivalentResistance = computed(() => {
  switch (networkType.value) {
    case 'series':
      const seriesOhms = resistors.value.map(r => toOhms(r.value, r.unit))
      return seriesOhms.reduce((sum, r) => sum + r, 0)
      
    case 'parallel':
      const parallelOhms = resistors.value.map(r => toOhms(r.value, r.unit))
      const reciprocalSum = parallelOhms.reduce((sum, r) => sum + (1 / r), 0)
      return reciprocalSum > 0 ? 1 / reciprocalSum : 0
      
    case 'wheatstone':
      const bR1 = toOhms(bridgeResistors.value[0].value, bridgeResistors.value[0].unit)
      const bR2 = toOhms(bridgeResistors.value[1].value, bridgeResistors.value[1].unit)
      const bR3 = toOhms(bridgeResistors.value[2].value, bridgeResistors.value[2].unit)
      const bR4 = toOhms(bridgeResistors.value[3].value, bridgeResistors.value[3].unit)
      // Series combination of (R1+R2) and (R3+R4), then parallel
      const upperBranch = bR1 + bR2
      const lowerBranch = bR3 + bR4
      return (upperBranch * lowerBranch) / (upperBranch + lowerBranch)
      
    case 'ladder':
      const lRs1 = toOhms(ladderResistors.value[0].value, ladderResistors.value[0].unit)
      const lRp1 = toOhms(ladderResistors.value[1].value, ladderResistors.value[1].unit)
      const lRs2 = toOhms(ladderResistors.value[2].value, ladderResistors.value[2].unit)
      const lRp2 = toOhms(ladderResistors.value[3].value, ladderResistors.value[3].unit)
      const lRs3 = toOhms(ladderResistors.value[4].value, ladderResistors.value[4].unit)
      // Analyze from right to left
      const rightMost = lRs3
      const midStage = (rightMost * lRp2) / (rightMost + lRp2) + lRs2
      const leftStage = (midStage * lRp1) / (midStage + lRp1) + lRs1
      return leftStage
      
    case 'deltawye':
      // Delta to Wye transformation
      const dRa = toOhms(deltaResistors.value[0].value, deltaResistors.value[0].unit)
      const dRb = toOhms(deltaResistors.value[1].value, deltaResistors.value[1].unit)
      const dRc = toOhms(deltaResistors.value[2].value, deltaResistors.value[2].unit)
      const sum = dRa + dRb + dRc
      // Calculate wye values
      wyeResistors.value[0].value = (dRa * dRc) / sum
      wyeResistors.value[1].value = (dRa * dRb) / sum
      wyeResistors.value[2].value = (dRb * dRc) / sum
      // For wye configuration, equivalent resistance seen from any two terminals
      // This is a simplification - actual value depends on which terminals
      return (wyeResistors.value[0].value + wyeResistors.value[1].value) * wyeResistors.value[2].value / 
             (wyeResistors.value[0].value + wyeResistors.value[1].value + wyeResistors.value[2].value)
      
    default:
      return 0
  }
})

// Bridge balance check
const isBridgeBalanced = computed(() => {
  if (networkType.value !== 'wheatstone') return false
  const bR1 = toOhms(bridgeResistors.value[0].value, bridgeResistors.value[0].unit)
  const bR2 = toOhms(bridgeResistors.value[1].value, bridgeResistors.value[1].unit)
  const bR3 = toOhms(bridgeResistors.value[2].value, bridgeResistors.value[2].unit)
  const bR4 = toOhms(bridgeResistors.value[3].value, bridgeResistors.value[3].unit)
  // Check if R1/R2 = R3/R4 (within tolerance)
  const ratio1 = bR1 / bR2
  const ratio2 = bR3 / bR4
  return Math.abs(ratio1 - ratio2) < 0.0001
})

// Total power at 1V
const totalPower = computed(() => {
  if (equivalentResistance.value === 0) return 0
  return (1 * 1) / equivalentResistance.value // P = V²/R
})

// Resistor management
const addResistor = () => {
  resistors.value.push({
    id: Date.now(),
    value: 100,
    unit: 'Ω'
  })
}

const removeResistor = (index: number) => {
  if (resistors.value.length > 2) {
    resistors.value.splice(index, 1)
  }
}

const resetResistors = () => {
  resistors.value = [
    { id: 1, value: 100, unit: 'Ω' },
    { id: 2, value: 220, unit: 'Ω' },
    { id: 3, value: 330, unit: 'Ω' }
  ]
}

const setResistorValue = (index: number, value: string) => {
  if (value.includes('k')) {
    resistors.value[index].value = parseFloat(value.replace('k', ''))
    resistors.value[index].unit = 'kΩ'
  } else {
    resistors.value[index].value = parseFloat(value)
    resistors.value[index].unit = 'Ω'
  }
}

const updateResistorColor = (index: number) => {
  // Color is handled by getResistorColor
}

const getResistorColor = (index: number) => {
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}

const getResistorBorderClass = (index: number) => {
  const color = getResistorColor(index)
  return {
    'border-red-500': color === '#ef4444',
    'border-blue-500': color === '#3b82f6',
    'border-green-500': color === '#22c55e',
    'border-yellow-500': color === '#f59e0b',
    'border-purple-500': color === '#8b5cf6',
    'border-pink-500': color === '#ec4899'
  }
}
</script>

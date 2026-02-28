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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Capacitor Series/Parallel Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate equivalent capacitance for capacitors in series or parallel configurations
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="grid grid-cols-1 gap-2 text-base font-mono font-bold">
              <div>
                <span class="text-blue-600">Parallel:</span> 
                <span class="text-primary">C_total</span> = <span class="text-purple-600">C₁</span> + <span class="text-purple-600">C₂</span> + <span class="text-purple-600">C₃</span> + ...
              </div>
              <div>
                <span class="text-green-600">Series:</span> 
                1/<span class="text-primary">C_total</span> = 1/<span class="text-purple-600">C₁</span> + 1/<span class="text-purple-600">C₂</span> + 1/<span class="text-purple-600">C₃</span> + ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Circuit Diagrams -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔌 Circuit Configurations
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Parallel Circuit -->
            <div :class="['p-6 rounded-xl border-2 transition-all cursor-pointer', 
              configuration === 'parallel' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600']"
              @click="configuration = 'parallel'">
              <h4 class="text-xl font-bold text-center mb-4" :class="configuration === 'parallel' ? 'text-blue-600' : 'text-gray-600'">
                Parallel Connection
              </h4>
              <svg viewBox="0 0 300 200" class="w-full h-40">
                <!-- Wires -->
                <line x1="50" y1="30" x2="250" y2="30" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                <line x1="50" y1="170" x2="250" y2="170" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="3"/>
                
                <!-- Capacitor 1 -->
                <line x1="100" y1="30" x2="100" y2="80" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <line x1="90" y1="80" x2="110" y2="80" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="90" y1="100" x2="110" y2="100" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="100" y1="100" x2="100" y2="170" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <text x="100" y="150" text-anchor="middle" font-size="14" :fill="configuration === 'parallel' ? '#3B82F6' : '#666'">C₁</text>
                
                <!-- Capacitor 2 -->
                <line x1="150" y1="30" x2="150" y2="80" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <line x1="140" y1="80" x2="160" y2="80" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="140" y1="100" x2="160" y2="100" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="150" y1="100" x2="150" y2="170" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <text x="150" y="150" text-anchor="middle" font-size="14" :fill="configuration === 'parallel' ? '#3B82F6' : '#666'">C₂</text>
                
                <!-- Capacitor 3 -->
                <line x1="200" y1="30" x2="200" y2="80" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <line x1="190" y1="80" x2="210" y2="80" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="190" y1="100" x2="210" y2="100" :stroke="configuration === 'parallel' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="200" y1="100" x2="200" y2="170" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <text x="200" y="150" text-anchor="middle" font-size="14" :fill="configuration === 'parallel' ? '#3B82F6' : '#666'">C₃</text>
                
                <!-- Terminals -->
                <circle cx="50" cy="100" r="8" fill="white" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <text x="35" y="105" text-anchor="end" font-size="12" fill="#666">A</text>
                <circle cx="250" cy="100" r="8" fill="white" :stroke="configuration === 'parallel' ? '#3B82F6' : '#94A3B8'" stroke-width="2"/>
                <text x="265" y="105" text-anchor="start" font-size="12" fill="#666">B</text>
              </svg>
              <p class="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
                Capacitance adds up in parallel
              </p>
            </div>
            
            <!-- Series Circuit -->
            <div :class="['p-6 rounded-xl border-2 transition-all cursor-pointer',
              configuration === 'series' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600']"
              @click="configuration = 'series'">
              <h4 class="text-xl font-bold text-center mb-4" :class="configuration === 'series' ? 'text-green-600' : 'text-gray-600'">
                Series Connection
              </h4>
              <svg viewBox="0 0 300 200" class="w-full h-40">
                <!-- Main wire -->
                <line x1="50" y1="100" x2="90" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="3"/>
                
                <!-- Capacitor 1 -->
                <line x1="90" y1="100" x2="110" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="110" y1="70" x2="110" y2="60" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="90" y1="60" x2="130" y2="60" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="90" y1="80" x2="130" y2="80" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="110" y1="80" x2="110" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <text x="110" y="50" text-anchor="middle" font-size="14" :fill="configuration === 'series' ? '#22C55E' : '#666'">C₁</text>
                
                <line x1="130" y1="100" x2="170" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                
                <!-- Capacitor 2 -->
                <line x1="170" y1="100" x2="190" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="180" y1="70" x2="180" y2="60" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="160" y1="60" x2="200" y2="60" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="160" y1="80" x2="200" y2="80" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="180" y1="80" x2="180" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <text x="180" y="50" text-anchor="middle" font-size="14" :fill="configuration === 'series' ? '#22C55E' : '#666'">C₂</text>
                
                <line x1="200" y1="100" x2="240" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                
                <!-- Capacitor 3 -->
                <line x1="240" y1="100" x2="260" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="250" y1="70" x2="250" y2="60" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <line x1="230" y1="60" x2="270" y2="60" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="230" y1="80" x2="270" y2="80" :stroke="configuration === 'series' ? '#10B981' : '#94A3B8'" stroke-width="4"/>
                <line x1="250" y1="80" x2="250" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <text x="250" y="50" text-anchor="middle" font-size="14" :fill="configuration === 'series' ? '#22C55E' : '#666'">C₃</text>
                
                <line x1="270" y1="100" x2="310" y2="100" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="3"/>
                
                <!-- Terminals -->
                <circle cx="50" cy="100" r="8" fill="white" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <text x="35" y="105" text-anchor="end" font-size="12" fill="#666">A</text>
                <circle cx="310" cy="100" r="8" fill="white" :stroke="configuration === 'series' ? '#22C55E' : '#94A3B8'" stroke-width="2"/>
                <text x="325" y="105" text-anchor="start" font-size="12" fill="#666">B</text>
              </svg>
              <p class="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
                Reciprocal adds in series (less capacitance)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enter Capacitor Values</h3>
              
              <!-- Quick Add Presets -->
              <div class="mb-6">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Add:</p>
                <div class="flex flex-wrap gap-2">
                  <button @click="addPresetCapacitor(10)" 
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    +10 pF
                  </button>
                  <button @click="addPresetCapacitor(100)" 
                    class="px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium">
                    +100 pF
                  </button>
                  <button @click="addPresetCapacitor(1)" 
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    +1 nF
                  </button>
                  <button @click="addPresetCapacitor(10)" 
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    +10 nF
                  </button>
                  <button @click="addPresetCapacitor(100)" 
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                    +100 nF
                  </button>
                  <button @click="addPresetCapacitor(1)" 
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    +1 µF
                  </button>
                  <button @click="addPresetCapacitor(10)" 
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    +10 µF
                  </button>
                  <button @click="addPresetCapacitor(100)" 
                    class="px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    +100 µF
                  </button>
                </div>
              </div>
              
              <!-- Manual Add -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div class="grid grid-cols-3 gap-3">
                  <input 
                    v-model.number="newCapValue"
                    type="number" 
                    step="any"
                    placeholder="Value"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <select 
                    v-model="newCapUnit"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="pF">pF</option>
                    <option value="nF">nF</option>
                    <option value="µF">µF</option>
                    <option value="mF">mF</option>
                    <option value="F">F</option>
                  </select>
                  <button 
                    @click="addCapacitor"
                    class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <!-- Capacitor List -->
              <div class="space-y-2 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white">Capacitors ({{ capacitors.length }}):</h4>
                <div v-if="capacitors.length === 0" class="text-gray-500 dark:text-gray-400 text-sm italic">
                  No capacitors added yet. Add some capacitors to calculate.
                </div>
                <div v-for="(cap, index) in capacitors" :key="index" 
                  class="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary rounded-full font-bold text-sm">
                      {{ index + 1 }}
                    </span>
                    <span class="font-mono font-medium text-gray-900 dark:text-white">
                      {{ formatCapacitance(cap) }}
                    </span>
                  </div>
                  <button 
                    @click="removeCapacitor(index)"
                    class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Clear All -->
              <button 
                v-if="capacitors.length > 0"
                @click="clearAll"
                class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg font-semibold transition-colors"
              >
                Clear All Capacitors
              </button>
            </div>
            
            <!-- Result Section -->
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Equivalent Capacitance</h3>
              
              <!-- Result Display -->
              <div class="bg-gradient-to-r from-primary/20 to-primary-dark/20 rounded-lg p-6 mb-6">
                <div class="text-center">
                  <p class="text-gray-600 dark:text-gray-300 text-lg mb-2">
                    {{ configuration === 'parallel' ? 'Parallel' : 'Series' }} Total
                  </p>
                  <div class="text-5xl font-bold text-primary mb-2">
                    {{ formatCapacitance(totalCapacitance) }}
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    {{ totalCapacitance.toFixed(10) }} Farads
                  </p>
                </div>
              </div>
              
              <!-- Calculation Steps -->
              <div v-if="capacitors.length > 0" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📐 Calculation:</h4>
                <div class="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p v-if="configuration === 'parallel'">
                    <span class="font-mono">C_total = C₁ + C₂ + C₃ + ...</span>
                  </p>
                  <p v-else>
                    <span class="font-mono">1/C_total = 1/C₁ + 1/C₂ + 1/C₃ + ...</span>
                  </p>
                  <div class="bg-white dark:bg-gray-800 rounded p-3 mt-2 font-mono text-xs overflow-x-auto">
                    <template v-if="configuration === 'parallel'">
                      C_total = {{ capacitors.map(c => c.toExponential(2)).join(' + ') }} = {{ totalCapacitance.toExponential(4) }} F
                    </template>
                    <template v-else>
                      1/C_total = {{ capacitors.map(c => (1/c).toExponential(2)).join(' + ') }}<br>
                      C_total = 1/{{ (capacitors.reduce((sum, c) => sum + 1/c, 0)).toExponential(4) }} = {{ totalCapacitance.toExponential(4) }} F
                    </template>
                  </div>
                </div>
              </div>
              
              <!-- Comparison -->
              <div v-if="capacitors.length >= 2" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Configuration Comparison:</h4>
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Parallel Total</p>
                    <p class="text-xl font-bold text-blue-600">{{ formatCapacitance(parallelTotal) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Series Total</p>
                    <p class="text-xl font-bold text-green-600">{{ formatCapacitance(seriesTotal) }}</p>
                  </div>
                </div>
                <p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                  Parallel > Individual capacitors > Series (for same values)
                </p>
              </div>
              
              <!-- Formula Explanation -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">📘 Key Concepts:</h4>
                <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p v-if="configuration === 'parallel'">
                    <strong class="text-blue-600">Parallel:</strong> Capacitances add directly. 
                    More surface area = more capacitance.
                  </p>
                  <p v-else>
                    <strong class="text-green-600">Series:</strong> Reciprocals add. Effective distance 
                    between plates increases = less capacitance.
                  </p>
                  <p class="mt-2">
                    <strong>Tip:</strong> Use parallel for higher capacitance, series for higher 
                    voltage rating (total voltage rating = sum of individual ratings).
                  </p>
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
            📚 Understanding Capacitor Combinations
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Parallel Connection</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In parallel, capacitors are connected across the same two points. The total capacitance is 
              the sum of individual capacitances:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              C_total = C₁ + C₂ + C₃ + ... + C_n
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Why?</strong> Parallel connection increases effective plate area, which increases 
              capacitance. All capacitors have the same voltage across them.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series Connection</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              In series, capacitors are connected end-to-end in a single path. The reciprocal of total 
              capacitance equals the sum of reciprocals:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              1/C_total = 1/C₁ + 1/C₂ + 1/C₃ + ... + 1/C_n
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Why?</strong> Series connection increases effective distance between plates, 
              which decreases capacitance. However, voltage rating increases.
            </p>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Two Capacitor Special Case (Series)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For only two capacitors in series, the formula simplifies to:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              C_total = (C₁ × C₂) / (C₁ + C₂)
            </div>
            
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Parallel:</strong> Power supply filtering, timing circuits needing exact values</li>
              <li><strong>Series:</strong> High-voltage applications, creating non-standard values</li>
              <li><strong>Voltage divider:</strong> Series capacitors divide voltage proportionally to 1/C</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Capacitor Series/Parallel Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate equivalent capacitance for capacitors in series or parallel. Interactive calculator with circuit diagrams.' },
    { name: 'keywords', content: 'capacitor series parallel, capacitance calculator, capacitor combination' }
  ]
})

const colorMode = useColorMode()

// State
const configuration = ref('parallel')
const capacitors = ref([])
const newCapValue = ref(null)
const newCapUnit = ref('µF')

// Unit multipliers (to Farads)
const unitMultipliers = {
  'pF': 1e-12,
  'nF': 1e-9,
  'µF': 1e-6,
  'mF': 1e-3,
  'F': 1
}

// Computed: Total capacitance based on configuration
const totalCapacitance = computed(() => {
  if (capacitors.value.length === 0) return 0
  
  if (configuration.value === 'parallel') {
    // Parallel: sum all capacitances
    return capacitors.value.reduce((sum, cap) => sum + cap, 0)
  } else {
    // Series: sum of reciprocals
    const reciprocalSum = capacitors.value.reduce((sum, cap) => sum + (1 / cap), 0)
    return reciprocalSum > 0 ? 1 / reciprocalSum : 0
  }
})

// Computed: Parallel total (for comparison)
const parallelTotal = computed(() => {
  if (capacitors.value.length === 0) return 0
  return capacitors.value.reduce((sum, cap) => sum + cap, 0)
})

// Computed: Series total (for comparison)
const seriesTotal = computed(() => {
  if (capacitors.value.length === 0) return 0
  const reciprocalSum = capacitors.value.reduce((sum, cap) => sum + (1 / cap), 0)
  return reciprocalSum > 0 ? 1 / reciprocalSum : 0
})

// Methods
function formatCapacitance(farads) {
  if (farads === 0) return '0 F'
  
  const absValue = Math.abs(farads)
  
  if (absValue >= 1) {
    return `${farads.toFixed(2)} F`
  } else if (absValue >= 1e-3) {
    return `${(farads * 1e3).toFixed(2)} mF`
  } else if (absValue >= 1e-6) {
    return `${(farads * 1e6).toFixed(2)} µF`
  } else if (absValue >= 1e-9) {
    return `${(farads * 1e9).toFixed(2)} nF`
  } else if (absValue >= 1e-12) {
    return `${(farads * 1e12).toFixed(2)} pF`
  } else {
    return `${farads.toExponential(2)} F`
  }
}

function addCapacitor() {
  if (newCapValue.value === null || newCapValue.value <= 0) {
    return
  }
  
  const multiplier = unitMultipliers[newCapUnit.value]
  const valueInFarads = newCapValue.value * multiplier
  
  capacitors.value.push(valueInFarads)
  
  // Reset input
  newCapValue.value = null
  newCapUnit.value = 'µF'
}

function addPresetCapacitor(value) {
  // Determine unit based on context of button clicked
  // The buttons already have units in their labels
  // We'll infer from the button text
  const event = window.event
  const buttonText = event.target.textContent
  const unit = buttonText.split(' ')[1] // Get unit from "+10 µF" -> "µF"
  
  const multiplier = unitMultipliers[unit]
  capacitors.value.push(value * multiplier)
}

function removeCapacitor(index) {
  capacitors.value.splice(index, 1)
}

function clearAll() {
  capacitors.value = []
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

.bg-primary-dark {
  background-color: var(--tw-color-primary-dark) !important;
}

.bg-primary-light {
  background-color: var(--tw-color-primary-light) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}
</style>

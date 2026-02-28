<template>
  <div class="max-w-6xl mx-auto">
    <!-- Calculator Card -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        🔌 Three-Phase Power Calculator
      </h2>

      <!-- Configuration Selection -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Connection Type -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Connection Type
          </label>
          <div class="flex space-x-4">
            <button
              @click="connectionType = 'star'"
              :class="[
                'flex-1 py-3 px-4 rounded-lg font-semibold transition-all',
                connectionType === 'star'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              ⭐ Star (Y)
            </button>
            <button
              @click="connectionType = 'delta'"
              :class="[
                'flex-1 py-3 px-4 rounded-lg font-semibold transition-all',
                connectionType === 'delta'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              🔺 Delta (Δ)
            </button>
          </div>
        </div>

        <!-- Phase Type -->
        <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            System Type
          </label>
          <div class="flex space-x-4">
            <button
              @click="systemType = 'balanced'"
              :class="[
                'flex-1 py-3 px-4 rounded-lg font-semibold transition-all',
                systemType === 'balanced'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              ⚖️ Balanced
            </button>
            <button
              @click="systemType = 'unbalanced'"
              :class="[
                'flex-1 py-3 px-4 rounded-lg font-semibold transition-all',
                systemType === 'unbalanced'
                  ? 'bg-orange-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              ⚠️ Unbalanced
            </button>
          </div>
        </div>
      </div>

      <!-- Input Parameters -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Input Parameters</h3>
        
        <!-- Balanced System Inputs -->
        <div v-if="systemType === 'balanced'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Line Voltage -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Line Voltage (V<sub>L</sub>)
            </label>
            <div class="flex">
              <input
                v-model.number="balancedParams.lineVoltage"
                type="number"
                step="1"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="400"
              />
              <span class="px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 font-mono">
                V
              </span>
            </div>
          </div>

          <!-- Power Factor -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Power Factor (PF)
            </label>
            <div class="flex">
              <input
                v-model.number="balancedParams.powerFactor"
                type="number"
                step="0.01"
                min="0"
                max="1"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.85"
              />
              <span class="px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 font-mono">
                pf
              </span>
            </div>
            <input
              v-model.number="balancedParams.powerFactor"
              type="range"
              min="0"
              max="1"
              step="0.01"
              class="w-full mt-2"
            />
          </div>

          <!-- Current -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Line Current (I<sub>L</sub>)
            </label>
            <div class="flex">
              <input
                v-model.number="balancedParams.current"
                type="number"
                step="0.1"
                class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
              <span class="px-4 py-3 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 font-mono">
                A
              </span>
            </div>
          </div>
        </div>

        <!-- Unbalanced System Inputs -->
        <div v-else class="grid md:grid-cols-2 gap-6">
          <!-- Phase A -->
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h4 class="text-sm font-bold text-red-700 dark:text-red-400 mb-3">Phase A (Red)</h4>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Voltage</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.va"
                    type="number"
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="230"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">V</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Current</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.ia"
                    type="number"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="10"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">A</span>
                </div>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Power Factor</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.pfa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="0.85"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">pf</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase B -->
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h4 class="text-sm font-bold text-yellow-700 dark:text-yellow-400 mb-3">Phase B (Yellow)</h4>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Voltage</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.vb"
                    type="number"
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="230"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">V</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Current</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.ib"
                    type="number"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="10"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">A</span>
                </div>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Power Factor</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.pfb"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="0.85"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">pf</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase C -->
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 class="text-sm font-bold text-blue-700 dark:text-blue-400 mb-3">Phase C (Blue)</h4>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Voltage</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.vc"
                    type="number"
                    step="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="230"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">V</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Current</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.ic"
                    type="number"
                    step="0.1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="10"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">A</span>
                </div>
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Power Factor</label>
                <div class="flex">
                  <input
                    v-model.number="unbalancedParams.pfc"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    placeholder="0.85"
                  />
                  <span class="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-700 dark:text-gray-300 text-sm font-mono">pf</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Unbalanced Warning -->
          <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 flex items-start">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div>
              <h4 class="text-sm font-bold text-orange-700 dark:text-orange-400 mb-1">Unbalanced Load</h4>
              <p class="text-xs text-gray-600 dark:text-gray-400">Each phase has different current/power. Neutral current may flow in star connection.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Display -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Total Power -->
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium opacity-90">Total Active Power (P)</span>
            <svg class="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="text-3xl font-bold">{{ formatNumber(totalPower) }}</div>
          <div class="text-sm opacity-75">kW</div>
        </div>

        <!-- Reactive Power -->
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium opacity-90">Reactive Power (Q)</span>
            <svg class="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <div class="text-3xl font-bold">{{ formatNumber(reactivePower) }}</div>
          <div class="text-sm opacity-75">kVAR</div>
        </div>

        <!-- Apparent Power -->
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium opacity-90">Apparent Power (S)</span>
            <svg class="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div class="text-3xl font-bold">{{ formatNumber(apparentPower) }}</div>
          <div class="text-sm opacity-75">kVA</div>
        </div>

        <!-- Phase Voltage -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Phase Voltage (V<sub>ph</sub>)</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ phaseVoltage.toFixed(1) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Volts</div>
        </div>

        <!-- Phase Current -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Phase Current (I<sub>ph</sub>)</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ phaseCurrent.toFixed(2) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Amperes</div>
        </div>

        <!-- Power Factor -->
        <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-600">
          <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Power Factor</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ averagePowerFactor.toFixed(2) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ powerFactorLabel }}</div>
        </div>
      </div>

      <!-- Neutral Current (Star Unbalanced) -->
      <div v-if="connectionType === 'star' && systemType === 'unbalanced'" class="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-red-900 dark:text-red-300 mb-3">Neutral Current</h3>
        <div class="flex items-baseline">
          <span class="text-3xl font-bold text-red-700 dark:text-red-400">{{ neutralCurrent.toFixed(2) }}</span>
          <span class="ml-2 text-lg text-red-600 dark:text-red-500">A</span>
        </div>
        <p class="text-sm text-red-700 dark:text-red-400 mt-2">
          In unbalanced star systems, current flows through the neutral conductor. Size neutral wire accordingly.
        </p>
      </div>

      <!-- Circuit Diagram -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {{ connectionType === 'star' ? 'Star (Y) Connection' : 'Delta (Δ) Connection' }}
        </h3>
        <div class="flex justify-center">
          <svg viewBox="0 0 400 250" class="w-full max-w-lg">
            <!-- Star Connection -->
            <g v-if="connectionType === 'star'">
              <!-- Circle outline -->
              <circle cx="200" cy="125" r="80" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Neutral point -->
              <circle cx="200" cy="125" r="6" fill="#1F2937" stroke="#4B5563" stroke-width="2"/>
              <text x="200" y="145" text-anchor="middle" class="text-xs fill-gray-700 dark:fill-gray-300" font-size="11">N</text>
              
              <!-- Phase A (Red) -->
              <line x1="200" y1="125" x2="200" y2="55" stroke="#EF4444" stroke-width="3"/>
              <circle cx="200" cy="45" r="8" fill="#EF4444"/>
              <text x="215" y="50" class="text-sm font-semibold fill-red-600" font-size="12">A (R)</text>
              
              <!-- Phase B (Yellow) -->
              <line x1="200" y1="125" x2="269" y2="165" stroke="#EAB308" stroke-width="3"/>
              <circle cx="279" cy="171" r="8" fill="#EAB308"/>
              <text x="290" y="185" class="text-sm font-semibold fill-yellow-600" font-size="12">B (Y)</text>
              
              <!-- Phase C (Blue) -->
              <line x1="200" y1="125" x2="131" y2="165" stroke="#3B82F6" stroke-width="3"/>
              <circle cx="121" cy="171" r="8" fill="#3B82F6"/>
              <text x="90" y="185" class="text-sm font-semibold fill-blue-600" font-size="12">C (B)</text>
              
              <!-- Voltage labels -->
              <text x="320" y="50" class="text-xs fill-gray-600 dark:fill-gray-400" font-size="10">V<sub>L</sub> = √3 × V<sub>ph</sub></text>
              <text x="320" y="65" class="text-xs fill-gray-600 dark:fill-gray-400" font-size="10">I<sub>L</sub> = I<sub>ph</sub></text>
            </g>

            <!-- Delta Connection -->
            <g v-else>
              <!-- Delta triangle -->
              <polygon points="200,55 280,190 120,190" fill="none" stroke="#9CA3AF" stroke-width="3"/>
              
              <!-- Phase A (Red) -->
              <circle cx="200" cy="55" r="8" fill="#EF4444"/>
              <text x="215" y="50" class="text-sm font-semibold fill-red-600" font-size="12">A (R)</text>
              
              <!-- Phase B (Yellow) -->
              <circle cx="280" cy="190" r="8" fill="#EAB308"/>
              <text x="290" y="205" class="text-sm font-semibold fill-yellow-600" font-size="12">B (Y)</text>
              
              <!-- Phase C (Blue) -->
              <circle cx="120" cy="190" r="8" fill="#3B82F6"/>
              <text x="80" y="205" class="text-sm font-semibold fill-blue-600" font-size="12">C (B)</text>
              
              <!-- Voltage labels -->
              <text x="320" y="50" class="text-xs fill-gray-600 dark:fill-gray-400" font-size="10">V<sub>L</sub> = V<sub>ph</sub></text>
              <text x="320" y="65" class="text-xs fill-gray-600 dark:fill-gray-400" font-size="10">I<sub>L</sub> = √3 × I<sub>ph</sub></text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Calculation Steps -->
      <CalculationSteps :steps="calculationSteps" />
    </div>

    <!-- Educational Content -->
    <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Three-Phase Power Theory</h3>
      
      <!-- Key Formulas -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Formulas</h4>
        
        <div class="space-y-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Star (Y) Connection</div>
            <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div>• Line Voltage: V<sub>L</sub> = √3 × V<sub>ph</sub></div>
              <div>• Line Current: I<sub>L</sub> = I<sub>ph</sub></div>
              <div>• Power: P = √3 × V<sub>L</sub> × I<sub>L</sub> × PF</div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Delta (Δ) Connection</div>
            <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div>• Line Voltage: V<sub>L</sub> = V<sub>ph</sub></div>
              <div>• Line Current: I<sub>L</sub> = √3 × I<sub>ph</sub></div>
              <div>• Power: P = √3 × V<sub>L</sub> × I<sub>L</sub> × PF</div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Power Calculations</div>
            <div class="grid md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div>• Active Power: P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos(φ)</div>
              <div>• Reactive Power: Q = √3 × V<sub>L</sub> × I<sub>L</sub> × sin(φ)</div>
              <div>• Apparent Power: S = √3 × V<sub>L</sub> × I<sub>L</sub></div>
              <div>• Power Factor: PF = P/S = cos(φ)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Industrial Applications</h4>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div class="flex items-start">
            <span class="text-2xl mr-3">🏭</span>
            <div>
              <div class="font-semibold">Industrial Motors</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Three-phase induction motors for heavy machinery</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">⚡</span>
            <div>
              <div class="font-semibold">Power Transmission</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Efficient long-distance power distribution</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🔌</span>
            <div>
              <div class="font-semibold">Commercial Buildings</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">HVAC systems, elevators, large equipment</div>
            </div>
          </div>
          <div class="flex items-start">
            <span class="text-2xl mr-3">🔧</span>
            <div>
              <div class="font-semibold">Welding Equipment</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">High-power arc welding systems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalculationSteps from '~/components/CalculationSteps.vue'

// State
const connectionType = ref<'star' | 'delta'>('star')
const systemType = ref<'balanced' | 'unbalanced'>('balanced')

const balancedParams = ref({
  lineVoltage: 400,
  powerFactor: 0.85,
  current: 10
})

const unbalancedParams = ref({
  va: 230, ia: 10, pfa: 0.85,
  vb: 230, ib: 10, pfb: 0.85,
  vc: 230, ic: 10, pfc: 0.85
})

// Constants
const SQRT3 = Math.sqrt(3)

// Computed values
const phaseVoltage = computed(() => {
  if (systemType.value === 'balanced') {
    const vl = balancedParams.value.lineVoltage
    return connectionType.value === 'star' ? vl / SQRT3 : vl
  } else {
    // For unbalanced, show average phase voltage
    const { va, vb, vc } = unbalancedParams.value
    return (va + vb + vc) / 3
  }
})

const phaseCurrent = computed(() => {
  if (systemType.value === 'balanced') {
    const il = balancedParams.value.current
    return connectionType.value === 'star' ? il : il / SQRT3
  } else {
    const { ia, ib, ic } = unbalancedParams.value
    return (ia + ib + ic) / 3
  }
})

const lineVoltage = computed(() => {
  if (systemType.value === 'balanced') {
    return balancedParams.value.lineVoltage
  } else {
    const vph = (unbalancedParams.value.va + unbalancedParams.value.vb + unbalancedParams.value.vc) / 3
    return connectionType.value === 'star' ? vph * SQRT3 : vph
  }
})

const lineCurrent = computed(() => {
  if (systemType.value === 'balanced') {
    return balancedParams.value.current
  } else {
    const iph = (unbalancedParams.value.ia + unbalancedParams.value.ib + unbalancedParams.value.ic) / 3
    return connectionType.value === 'star' ? iph : iph * SQRT3
  }
})

const averagePowerFactor = computed(() => {
  if (systemType.value === 'balanced') {
    return balancedParams.value.powerFactor
  } else {
    const { pfa, pfb, pfc } = unbalancedParams.value
    return (pfa + pfb + pfc) / 3
  }
})

const totalPower = computed(() => {
  const vl = lineVoltage.value
  const il = lineCurrent.value
  const pf = averagePowerFactor.value
  return (SQRT3 * vl * il * pf) / 1000 // kW
})

const reactivePower = computed(() => {
  const vl = lineVoltage.value
  const il = lineCurrent.value
  const pf = averagePowerFactor.value
  const angle = Math.acos(pf)
  return (SQRT3 * vl * il * Math.sin(angle)) / 1000 // kVAR
})

const apparentPower = computed(() => {
  const vl = lineVoltage.value
  const il = lineCurrent.value
  return (SQRT3 * vl * il) / 1000 // kVA
})

const neutralCurrent = computed(() => {
  if (connectionType.value !== 'star' || systemType.value !== 'unbalanced') {
    return 0
  }
  
  const { ia, ib, ic } = unbalancedParams.value
  
  // Simplified calculation (assuming 120° phase shift)
  // In practice, this would require vector addition
  const vectorSum = Math.sqrt(
    Math.pow(ia, 2) + Math.pow(ib, 2) + Math.pow(ic, 2) -
    ia * ib - ib * ic - ic * ia
  )
  
  return vectorSum
})

const powerFactorLabel = computed(() => {
  const pf = averagePowerFactor.value
  if (pf >= 0.95) return 'Excellent'
  if (pf >= 0.90) return 'Good'
  if (pf >= 0.80) return 'Fair'
  if (pf >= 0.70) return 'Poor'
  return 'Very Poor'
})

const calculationSteps = computed(() => {
  const steps = []
  const vl = lineVoltage.value
  const il = lineCurrent.value
  const pf = averagePowerFactor.value
  const vph = phaseVoltage.value
  const iph = phaseCurrent.value
  
  steps.push({
    title: 'System Configuration',
    content: `${connectionType.value === 'star' ? 'Star (Y)' : 'Delta (Δ)'} connection, ${systemType.value} load`
  })
  
  steps.push({
    title: 'Phase Voltage',
    content: `Vph = ${connectionType.value === 'star' ? 'VL / √3' : 'VL'} = ${vph.toFixed(1)} V`
  })
  
  steps.push({
    title: 'Phase Current',
    content: `Iph = ${connectionType.value === 'delta' ? 'IL / √3' : 'IL'} = ${iph.toFixed(2)} A`
  })
  
  steps.push({
    title: 'Active Power (P)',
    content: `P = √3 × VL × IL × PF = √3 × ${vl.toFixed(1)} × ${il.toFixed(2)} × ${pf.toFixed(2)} = ${totalPower.value.toFixed(2)} kW`
  })
  
  steps.push({
    title: 'Apparent Power (S)',
    content: `S = √3 × VL × IL = √3 × ${vl.toFixed(1)} × ${il.toFixed(2)} = ${apparentPower.value.toFixed(2)} kVA`
  })
  
  steps.push({
    title: 'Reactive Power (Q)',
    content: `Q = √(S² - P²) = √(${apparentPower.value.toFixed(2)}² - ${totalPower.value.toFixed(2)}²) = ${reactivePower.value.toFixed(2)} kVAR`
  })
  
  if (connectionType.value === 'star' && systemType.value === 'unbalanced') {
    steps.push({
      title: 'Neutral Current',
      content: `In ≈ √(Ia² + Ib² + Ic² - Ia·Ib - Ib·Ic - Ic·Ia) = ${neutralCurrent.value.toFixed(2)} A`
    })
  }
  
  return steps
})

// Helper functions
const formatNumber = (num: number) => {
  if (Math.abs(num) >= 1000) {
    return (num / 1000).toFixed(2)
  }
  return num.toFixed(2)
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.dark input[type="range"] {
  background: #4b5563;
}
</style>

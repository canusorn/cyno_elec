<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          555 Timer Frequency Calculator
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Calculate frequencies and duty cycles for the versatile 555 timer IC in astable and monostable modes
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Mode Selection -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              Operating Mode
            </h3>
            <div class="space-y-2">
              <button
                @click="mode = 'astable'"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-medium transition-all',
                  mode === 'astable'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                🔄 Astable (Oscillator)
              </button>
              <button
                @click="mode = 'monostable'"
                :class="[
                  'w-full px-4 py-3 rounded-lg font-medium transition-all',
                  mode === 'monostable'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                ⚡ Monostable (One-Shot)
              </button>
            </div>
          </div>

          <!-- Component Values -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              Component Values
            </h3>

            <div class="space-y-5">
              <!-- R1 -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resistor R1 (Ω)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ formatNumber(r1) }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="r1"
                  min="100"
                  max="1000000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>1MΩ</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <button
                    v-for="val in [1000, 10000, 100000]"
                    :key="val"
                    @click="r1 = val"
                    class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {{ formatResistance(val) }}
                  </button>
                </div>
              </div>

              <!-- R2 -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resistor R2 (Ω)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ formatNumber(r2) }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="r2"
                  min="100"
                  max="1000000"
                  step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>100Ω</span>
                  <span>1MΩ</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <button
                    v-for="val in [1000, 10000, 100000]"
                    :key="val"
                    @click="r2 = val"
                    class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {{ formatResistance(val) }}
                  </button>
                </div>
              </div>

              <!-- C -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Capacitor C (F)
                  </label>
                  <span class="text-sm font-mono text-primary">{{ formatCapacitance(c) }}</span>
                </div>
                <input
                  type="range"
                  v-model.number="c"
                  min="1e-9"
                  max="1e-3"
                  step="1e-9"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1nF</span>
                  <span>1mF</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <button
                    v-for="val in [1e-9, 1e-8, 1e-7, 1e-6]"
                    :key="val"
                    @click="c = val"
                    class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {{ formatCapacitance(val) }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚡ Quick Presets</h3>
            <div class="space-y-2">
              <button
                v-for="preset in presets"
                :key="preset.name"
                @click="applyPreset(preset)"
                class="w-full px-3 py-2 text-sm bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 dark:from-primary/20 dark:to-primary/10 rounded-lg text-left transition-all"
              >
                <div class="font-medium text-gray-900 dark:text-white">{{ preset.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ preset.description }}</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Results and Visualization -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Main Results -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {{ mode === 'astable' ? 'Astable' : 'Monostable' }} Mode Results
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Frequency / Pulse Width -->
              <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {{ mode === 'astable' ? 'Frequency' : 'Pulse Width' }}
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ mode === 'astable' ? formatFrequency(calculations.frequency) : formatTime(calculations.pulseWidth) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ mode === 'astable' ? 'Output oscillation rate' : 'Output pulse duration' }}
                </div>
              </div>

              <!-- Duty Cycle / Period -->
              <div class="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {{ mode === 'astable' ? 'Duty Cycle' : 'Time Constant' }}
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ mode === 'astable' ? formatPercentage(calculations.dutyCycle) : formatTime(calculations.timeConstant) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ mode === 'astable' ? 'High time percentage' : 'τ = (R1 + R2) × C' }}
                </div>
              </div>

              <!-- Period (Astable only) -->
              <div v-if="mode === 'astable'" class="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Period (T)
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ formatTime(calculations.period) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Total cycle time
                </div>
              </div>

              <!-- High Time (Astable only) -->
              <div v-if="mode === 'astable'" class="bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  High Time (t₁)
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ formatTime(calculations.highTime) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Output HIGH duration
                </div>
              </div>

              <!-- Low Time (Astable only) -->
              <div v-if="mode === 'astable'" class="bg-gradient-to-br from-orange-500/10 to-orange-500/5 dark:from-orange-500/20 dark:to-orange-500/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Low Time (t₂)
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ formatTime(calculations.lowTime) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Output LOW duration
                </div>
              </div>

              <!-- Waiting Time (Monostable only) -->
              <div v-if="mode === 'monostable'" class="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6">
                <div class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Minimum Trigger Pulse
                </div>
                <div class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ formatTime(calculations.minTriggerPulse) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  For reliable triggering
                </div>
              </div>
            </div>
          </div>

          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Circuit Diagram</h3>
            <svg viewBox="0 0 600 300" class="w-full h-auto">
              <!-- Background grid -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200 dark:text-gray-700" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="600" height="300" fill="url(#grid)" />

              <!-- 555 Timer IC -->
              <rect x="220" y="80" width="160" height="140" rx="5" fill="#f3f4f6" stroke="#4f46e5" stroke-width="3"/>
              <text x="300" y="105" text-anchor="middle" class="text-lg font-bold" fill="#1f2937">555 TIMER</text>
              <text x="300" y="125" text-anchor="middle" class="text-sm" fill="#6b7280">{{ mode === 'astable' ? 'Astable' : 'Monostable' }}</text>

              <!-- Pin labels -->
              <text x="210" y="115" text-anchor="end" class="text-xs" fill="#374151">GND 1</text>
              <text x="210" y="135" text-anchor="end" class="text-xs" fill="#374151">TRG 2</text>
              <text x="210" y="155" text-anchor="end" class="text-xs" fill="#374151">OUT 3</text>
              <text x="210" y="175" text-anchor="end" class="text-xs" fill="#374151">RST 4</text>
              <text x="210" y="195" text-anchor="end" class="text-xs" fill="#374151">CV  5</text>
              <text x="390" y="115" text-anchor="start" class="text-xs" fill="#374151">THR 6</text>
              <text x="390" y="135" text-anchor="start" class="text-xs" fill="#374151">DIS 7</text>
              <text x="390" y="155" text-anchor="start" class="text-xs" fill="#374151">VCC 8</text>

              <!-- Pins -->
              <circle cx="220" cy="110" r="4" fill="#4f46e5"/>
              <circle cx="220" cy="130" r="4" fill="#4f46e5"/>
              <circle cx="220" cy="150" r="4" fill="#4f46e5"/>
              <circle cx="220" cy="170" r="4" fill="#4f46e5"/>
              <circle cx="220" cy="190" r="4" fill="#4f46e5"/>
              <circle cx="380" cy="110" r="4" fill="#4f46e5"/>
              <circle cx="380" cy="130" r="4" fill="#4f46e5"/>
              <circle cx="380" cy="150" r="4" fill="#4f46e5"/>

              <!-- R1 Resistor -->
              <rect x="380" y="80" width="80" height="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
              <text x="420" y="95" text-anchor="middle" class="text-xs font-mono" fill="#92400e">R1={{ formatResistance(r1) }}</text>
              <line x1="420" y1="100" x2="420" y2="80" stroke="#f59e0b" stroke-width="2"/>
              <line x1="420" y1="80" x2="420" y2="50" stroke="#f59e0b" stroke-width="2"/>
              <text x="425" y="40" text-anchor="start" class="text-xs" fill="#92400e">VCC</text>

              <!-- R2 Resistor -->
              <rect x="410" y="140" width="20" height="80" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="3"/>
              <text x="445" y="180" text-anchor="start" class="text-xs font-mono" fill="#92400e">R2={{ formatResistance(r2) }}</text>
              <line x1="420" y1="140" x2="420" y2="120" stroke="#f59e0b" stroke-width="2"/>
              <line x1="420" y1="120" x2="380" y2="110" stroke="#f59e0b" stroke-width="2"/>

              <!-- Capacitor C -->
              <line x1="420" y1="220" x2="420" y2="250" stroke="#0891b2" stroke-width="2"/>
              <line x1="400" y1="250" x2="440" y2="250" stroke="#0891b2" stroke-width="3"/>
              <line x1="400" y1="260" x2="440" y2="260" stroke="#0891b2" stroke-width="3"/>
              <text x="455" y="258" text-anchor="start" class="text-xs font-mono" fill="#0e7490">C={{ formatCapacitance(c) }}</text>
              <line x1="420" y1="260" x2="420" y2="280" stroke="#0891b2" stroke-width="2"/>
              <text x="420" y="295" text-anchor="middle" class="text-xs" fill="#0e7490">GND</text>

              <!-- Connection from R2 to capacitor -->
              <line x1="420" y1="220" x2="420" y2="250" stroke="#f59e0b" stroke-width="2"/>

              <!-- Discharge pin connection -->
              <line x1="380" y1="130" x2="420" y2="130" stroke="#4f46e5" stroke-width="2"/>

              <!-- Output -->
              <line x1="220" y1="150" x2="180" y2="150" stroke="#10b981" stroke-width="2"/>
              <circle cx="175" cy="150" r="5" fill="#10b981"/>
              <text x="165" y="155" text-anchor="end" class="text-xs font-bold" fill="#059669">OUTPUT</text>

              <!-- Trigger (Monostable) -->
              <g v-if="mode === 'monostable'">
                <line x1="150" y1="130" x2="220" y2="130" stroke="#ec4899" stroke-width="2"/>
                <circle cx="145" cy="130" r="5" fill="#ec4899"/>
                <text x="135" y="135" text-anchor="end" class="text-xs font-bold" fill="#db2777">TRIGGER</text>
              </g>

              <!-- Threshold connection (Astable) -->
              <g v-if="mode === 'astable'">
                <line x1="380" y1="110" x2="450" y2="110" stroke="#4f46e5" stroke-width="2"/>
                <line x1="450" y1="110" x2="450" y2="200" stroke="#4f46e5" stroke-width="2"/>
                <line x1="450" y1="200" x2="420" y2="200" stroke="#4f46e5" stroke-width="2"/>
                <circle cx="420" cy="200" r="4" fill="#4f46e5"/>
              </g>

              <!-- Control voltage (Monostable) -->
              <g v-if="mode === 'monostable'">
                <line x1="220" y1="190" x2="180" y2="190" stroke="#8b5cf6" stroke-width="2"/>
                <line x1="180" y1="190" x2="180" y2="210" stroke="#8b5cf6" stroke-width="2"/>
                <line x1="180" y1="210" x2="200" y2="210" stroke="#8b5cf6" stroke-width="2"/>
                <circle cx="200" cy="210" r="4" fill="#8b5cf6"/>
                <text x="170" y="225" text-anchor="end" class="text-xs" fill="#7c3aed">CV (10nF)</text>
              </g>

              <!-- Ground connection -->
              <line x1="220" y1="110" x2="180" y2="110" stroke="#6b7280" stroke-width="2"/>
              <line x1="180" y1="110" x2="180" y2="280" stroke="#6b7280" stroke-width="2"/>
              <line x1="180" y1="280" x2="420" y2="280" stroke="#6b7280" stroke-width="2"/>

              <!-- Reset pull-up -->
              <line x1="220" y1="170" x2="160" y2="170" stroke="#f97316" stroke-width="2"/>
              <line x1="160" y1="170" x2="160" y2="50" stroke="#f97316" stroke-width="2"/>
              <line x1="160" y1="50" x2="420" y2="50" stroke="#f97316" stroke-width="2"/>
              <line x1="420" y1="50" x2="420" y2="70" stroke="#f97316" stroke-width="2"/>
            </svg>
          </div>

          <!-- Waveform Visualization -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {{ mode === 'astable' ? 'Output Waveform' : 'Timing Diagram' }}
            </h3>
            <canvas ref="waveformCanvas" class="w-full h-48 bg-gray-50 dark:bg-gray-900 rounded-lg"></canvas>
          </div>

          <!-- Educational Content -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">📚 Educational Content</h3>

            <div class="space-y-6">
              <!-- Mode Explanation -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {{ mode === 'astable' ? 'Astable Mode' : 'Monostable Mode' }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ mode === 'astable' 
                    ? 'In astable mode, the 555 timer continuously oscillates between HIGH and LOW states without any external trigger. It generates a square wave output with adjustable frequency and duty cycle, making it ideal for clock signals, LED flashers, tone generators, and pulse-width modulation applications.'
                    : 'In monostable mode, the 555 timer produces a single output pulse of fixed duration when triggered by an external signal. It acts as a "one-shot" timer, returning to its stable state after the pulse completes. Useful for timing delays, switch debouncing, and pulse stretching.' 
                  }}
                </p>
              </div>

              <!-- Key Formulas -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Formulas</h4>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                  <template v-if="mode === 'astable'">
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Frequency: f = 1.44 / ((R1 + 2×R2) × C)
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Period: T = 0.693 × (R1 + 2×R2) × C
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      High Time: t₁ = 0.693 × (R1 + R2) × C
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Low Time: t₂ = 0.693 × R2 × C
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Duty Cycle: D = (R1 + R2) / (R1 + 2×R2) × 100%
                    </code>
                  </template>
                  <template v-else>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Pulse Width: t = 1.1 × R2 × C
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Time Constant: τ = (R1 + R2) × C
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Trigger: Negative pulse below VCC/3
                    </code>
                    <code class="block text-sm font-mono text-primary dark:text-primary">
                      Reset: Pull above 0.7V for normal operation
                    </code>
                  </template>
                </div>
              </div>

              <!-- How It Works -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">How It Works</h4>
                <div class="text-gray-600 dark:text-gray-300 space-y-2">
                  <template v-if="mode === 'astable'">
                    <p>• <strong>Capacitor Charging:</strong> C charges through R1 and R2 toward VCC</p>
                    <p>• <strong>Threshold:</strong> When voltage reaches 2/3 VCC, discharge pin activates</p>
                    <p>• <strong>Capacitor Discharging:</strong> C discharges through R2 to ground</p>
                    <p>• <strong>Trigger:</strong> When voltage drops to 1/3 VCC, discharge pin opens</p>
                    <p>• <strong>Cycle Repeats:</strong> Continuous oscillation between these thresholds</p>
                    <p>• <strong>Output:</strong> HIGH during charging, LOW during discharging</p>
                  </template>
                  <template v-else>
                    <p>• <strong>Stable State:</strong> Output LOW, capacitor discharged, waiting for trigger</p>
                    <p>• <strong>Trigger Event:</strong> Negative pulse on pin 2 below VCC/3 initiates timing</p>
                    <p>• <strong>Timing Cycle:</strong> Capacitor charges through R2 toward VCC</p>
                    <p>• <strong>Threshold:</strong> When voltage reaches 2/3 VCC, comparator resets output</p>
                    <p>• <strong>Discharge:</strong> Capacitor quickly discharges, ready for next trigger</p>
                    <p>• <strong>Output Pulse:</strong> HIGH for duration t = 1.1 × R2 × C</p>
                  </template>
                </div>
              </div>

              <!-- Practical Tips -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">💡 Practical Tips</h4>
                <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Component Tolerances:</strong> Capacitor tolerance (±10-20%) significantly affects frequency accuracy</li>
                  <li><strong>Duty Cycle Limit:</strong> In astable mode, duty cycle cannot go below 50% due to R2 charging path</li>
                  <li><strong>Frequency Range:</strong> Practical range: 0.1 Hz to 100 kHz (depends on C value)</li>
                  <li><strong>Temperature Stability:</strong> Use 1% metal film resistors and NPO/COG capacitors for stability</li>
                  <li><strong>Control Voltage:</strong> Pin 5 can modulate threshold voltage for PWM applications</li>
                  <li><strong>Reset Function:</strong> Pull pin 4 LOW to disable; connect to VCC with ≥1kΩ resistor</li>
                  <li><strong>Output Drive:</strong> Can source/sink up to 200mA for direct LED/relay driving</li>
                </ul>
              </div>

              <!-- Common Applications -->
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Common Applications</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div v-if="mode === 'astable'" class="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">LED Flashers</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Blinking indicators, warning lights</p>
                  </div>
                  <div v-if="mode === 'astable'" class="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Tone Generators</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Audio oscillators, buzzers, alarms</p>
                  </div>
                  <div v-if="mode === 'astable'" class="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Clock Signals</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Digital circuit timing, counters</p>
                  </div>
                  <div v-if="mode === 'astable'" class="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">PWM Generation</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Motor speed control, dimmers</p>
                  </div>
                  <div v-if="mode === 'monostable'" class="bg-gradient-to-r from-secondary/10 to-transparent dark:from-secondary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Switch Debouncing</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Clean digital pulses from mechanical switches</p>
                  </div>
                  <div v-if="mode === 'monostable'" class="bg-gradient-to-r from-secondary/10 to-transparent dark:from-secondary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Time Delay Relays</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">ON delay timers in industrial controls</p>
                  </div>
                  <div v-if="mode === 'monostable'" class="bg-gradient-to-r from-secondary/10 to-transparent dark:from-secondary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Pulse Stretching</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Extend short trigger pulses</p>
                  </div>
                  <div v-if="mode === 'monostable'" class="bg-gradient-to-r from-secondary/10 to-transparent dark:from-secondary/20 p-3 rounded-lg">
                    <strong class="text-gray-900 dark:text-white">Missing Pulse Detection</strong>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Heartbeat monitoring, tachometers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'

const colorMode = useColorMode()

// State
const mode = ref('astable')
const r1 = ref(1000)
const r2 = ref(10000)
const c = ref(10e-6)

const waveformCanvas = ref(null)
let animationFrame = null
let animationTime = 0

// Presets
const presets = [
  {
    name: '1 kHz Audio Oscillator',
    description: 'Standard audio frequency',
    r1: 1000,
    r2: 4700,
    c: 100e-9
  },
  {
    name: '1 Hz LED Flasher',
    description: 'Slow blinking LED',
    r1: 4700,
    r2: 47000,
    c: 10e-6
  },
  {
    name: '10 ms Pulse Timer',
    description: 'Switch debounce timing',
    r1: 1000,
    r2: 9100,
    c: 1e-6
  },
  {
    name: '38 kHz IR Carrier',
    description: 'Infrared remote control',
    r1: 470,
    r2: 4700,
    c: 10e-9
  }
]

// Apply preset
const applyPreset = (preset) => {
  r1.value = preset.r1
  r2.value = preset.r2
  c.value = preset.c
}

// Calculations
const calculations = computed(() => {
  if (mode.value === 'astable') {
    const frequency = 1.44 / ((r1.value + 2 * r2.value) * c.value)
    const period = 1 / frequency
    const highTime = 0.693 * (r1.value + r2.value) * c.value
    const lowTime = 0.693 * r2.value * c.value
    const dutyCycle = ((r1.value + r2.value) / (r1.value + 2 * r2.value)) * 100

    return {
      frequency,
      period,
      highTime,
      lowTime,
      dutyCycle,
      pulseWidth: null,
      timeConstant: null,
      minTriggerPulse: null
    }
  } else {
    const pulseWidth = 1.1 * r2.value * c.value
    const timeConstant = (r1.value + r2.value) * c.value
    const minTriggerPulse = timeConstant / 10

    return {
      frequency: null,
      period: null,
      highTime: null,
      lowTime: null,
      dutyCycle: null,
      pulseWidth,
      timeConstant,
      minTriggerPulse
    }
  }
})

// Format functions
const formatNumber = (num) => {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const formatResistance = (ohms) => {
  if (ohms >= 1000000) return `${(ohms / 1000000).toFixed(1)}MΩ`
  if (ohms >= 1000) return `${(ohms / 1000).toFixed(1)}kΩ`
  return `${ohms.toFixed(0)}Ω`
}

const formatCapacitance = (farads) => {
  if (farads >= 1e-3) return `${(farads * 1e3).toFixed(2)}mF`
  if (farads >= 1e-6) return `${(farads * 1e6).toFixed(2)}µF`
  if (farads >= 1e-9) return `${(farads * 1e9).toFixed(1)}nF`
  return `${(farads * 1e12).toFixed(1)}pF`
}

const formatFrequency = (hz) => {
  if (hz >= 1e6) return `${(hz / 1e6).toFixed(3)} MHz`
  if (hz >= 1e3) return `${(hz / 1e3).toFixed(2)} kHz`
  return `${hz.toFixed(2)} Hz`
}

const formatTime = (seconds) => {
  if (seconds >= 1) return `${seconds.toFixed(3)} s`
  if (seconds >= 1e-3) return `${(seconds * 1e3).toFixed(2)} ms`
  if (seconds >= 1e-6) return `${(seconds * 1e6).toFixed(1)} µs`
  return `${(seconds * 1e9).toFixed(1)} ns`
}

const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`
}

// Waveform animation
const drawWaveform = () => {
  const canvas = waveformCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  ctx.scale(dpr, dpr)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  // Clear
  ctx.clearRect(0, 0, width, height)

  // Draw grid
  ctx.strokeStyle = colorMode.value === 'dark' ? '#374151' : '#e5e7eb'
  ctx.lineWidth = 1

  for (let x = 0; x < width; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  for (let y = 0; y < height; y += 20) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // Draw waveform
  ctx.strokeStyle = '#4f46e5'
  ctx.lineWidth = 3
  ctx.beginPath()

  const timeScale = mode.value === 'astable' 
    ? (calculations.value.period * 2) / width 
    : (calculations.value.pulseWidth * 4) / width

  const amplitude = height * 0.35
  const centerY = height / 2

  for (let x = 0; x < width; x++) {
    const t = animationTime + x * timeScale
    let y

    if (mode.value === 'astable') {
      const { period, highTime } = calculations.value
      const phase = t % period
      y = phase < highTime ? centerY - amplitude : centerY + amplitude
    } else {
      const { pulseWidth } = calculations.value
      const cycleTime = pulseWidth * 4
      const phase = t % cycleTime
      y = phase < pulseWidth ? centerY - amplitude : centerY + amplitude
    }

    if (x === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  ctx.stroke()

  // Draw current time indicator
  ctx.strokeStyle = '#ef4444'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.stroke()
  ctx.setLineDash([])
}

const animate = () => {
  animationTime += 0.016
  drawWaveform()
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})

watch([mode, r1, r2, c], () => {
  // Redraw waveform when parameters change
}, { deep: true })
</script>

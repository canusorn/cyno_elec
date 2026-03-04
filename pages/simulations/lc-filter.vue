<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            — LC Filter Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Design and analyze LC filter circuits with interactive frequency response visualization
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">f_c</span>
              <span class="text-gray-400">=</span>
              <span class="text-gray-400">1</span>
              <span class="text-gray-400">÷</span>
              <span class="text-gray-400">(</span>
              <span class="text-primary-highlight">2π</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">√(LC)</span>
              <span class="text-gray-400">)</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Cutoff Frequency = 1 ÷ (2π × √(Inductance × Capacitance))</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔧 LC Filter Design Controls
          </h3>

          <!-- Filter Type Selection -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Filter Type
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="filterType = 'lowpass'"
                :class="[
                  'p-4 rounded-lg font-semibold transition-all duration-200',
                  filterType === 'lowpass'
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
                ]"
              >
                📉 Low-Pass Filter
              </button>
              <button
                @click="filterType = 'highpass'"
                :class="[
                  'p-4 rounded-lg font-semibold transition-all duration-200',
                  filterType === 'highpass'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
                ]"
              >
                📈 High-Pass Filter
              </button>
            </div>
          </div>

          <!-- Component Controls -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Inductance Control -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Inductance (L)
                </label>
                <span class="text-lg font-mono font-bold text-primary-highlight">
                  {{ formatInductance(inductance) }}
                </span>
              </div>
              <input
                type="range"
                v-model.number="inductance"
                min="1"
                max="100000"
                :step="inductance >= 1000 ? 100 : 10"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>1 µH</span>
                <span>{{ formatInductance(inductance) }}</span>
                <span>100 mH</span>
              </div>
            </div>

            <!-- Capacitance Control -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Capacitance (C)
                </label>
                <span class="text-lg font-mono font-bold text-primary-highlight">
                  {{ formatCapacitance(capacitance) }}
                </span>
              </div>
              <input
                type="range"
                v-model.number="capacitance"
                min="100"
                max="1000000000"
                :step="capacitance >= 1000000 ? 100000 : capacitance >= 10000 ? 1000 : 100"
                class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              >
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>100 pF</span>
                <span>{{ formatCapacitance(capacitance) }}</span>
                <span>1000 µF</span>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Quick Presets
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                @click="setPreset('audio')"
                class="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition font-semibold text-sm"
              >
                🔊 Audio (1kHz)
              </button>
              <button
                @click="setPreset('rf-if')"
                class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition font-semibold text-sm"
              >
                📡 RF IF (455kHz)
              </button>
              <button
                @click="setPreset('power')"
                class="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition font-semibold text-sm"
              >
                🔌 Power (100Hz)
              </button>
              <button
                @click="setPreset('rf-frontend')"
                class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition font-semibold text-sm"
              >
                📶 RF Frontend (10MHz)
              </button>
            </div>
          </div>

          <!-- Calculated Results -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
              📊 Filter Characteristics
            </h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Cutoff Frequency</div>
                <div class="text-2xl font-mono font-bold text-primary-highlight">
                  {{ formatFrequency(cutoffFreq) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Q Factor</div>
                <div class="text-2xl font-mono font-bold" :class="qFactor < 0.5 ? 'text-red-500' : qFactor < 1 ? 'text-yellow-500' : 'text-green-500'">
                  {{ qFactor.toFixed(2) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Characteristic Impedance</div>
                <div class="text-2xl font-mono font-bold text-blue-500">
                  {{ charImpedance.toFixed(1) }}Ω
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Damping Ratio</div>
                <div class="text-2xl font-mono font-bold text-purple-500">
                  {{ dampingRatio.toFixed(3) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Frequency Response Plot -->
          <div class="mb-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
              📈 Frequency Response (Bode Plot)
            </h4>
            <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700">
              <svg viewBox="0 0 800 400" class="w-full h-auto">
                <!-- Background -->
                <rect x="0" y="0" width="800" height="400" fill="#f9fafb" />
                <rect x="0" y="0" width="800" height="400" fill="#111827" class="dark:hidden" />

                <!-- Grid lines -->
                <g v-for="i in 10" :key="'grid-' + i">
                  <line
                    :x1="80 + (i * 68)"
                    y1="40"
                    :x2="80 + (i * 68)"
                    y2="340"
                    :stroke="colorMode === 'dark' ? '#374151' : '#e5e7eb'"
                    stroke-width="1"
                    stroke-dasharray="4,4"
                  />
                  <line
                    x1="80"
                    :y1="40 + (i * 30)"
                    x2="760"
                    :y2="40 + (i * 30)"
                    :stroke="colorMode === 'dark' ? '#374151' : '#e5e7eb'"
                    stroke-width="1"
                    stroke-dasharray="4,4"
                  />
                </g>

                <!-- Axes -->
                <line x1="80" y1="340" x2="760" y2="340" stroke="#6B7280" stroke-width="2" />
                <line x1="80" y1="340" x2="80" y2="40" stroke="#6B7280" stroke-width="2" />

                <!-- Frequency Response Curve -->
                <path
                  :d="frequencyResponsePath"
                  fill="none"
                  :stroke="filterType === 'lowpass' ? '#3B82F6' : '#10B981'"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- Cutoff Frequency Marker -->
                <line
                  :x1="cutoffX"
                  y1="40"
                  :x2="cutoffX"
                  y2="340"
                  stroke="#EF4444"
                  stroke-width="2"
                  stroke-dasharray="8,4"
                />
                <circle :cx="cutoffX" :cy="cutoffY" r="6" fill="#EF4444" />
                <text
                  :x="cutoffX"
                  y="30"
                  text-anchor="middle"
                  font-size="12"
                  font-weight="bold"
                  fill="#EF4444"
                >
                  -3dB
                </text>

                <!-- X-axis labels (frequency) -->
                <text x="80" y="360" text-anchor="middle" font-size="11" fill="#6B7280">10 Hz</text>
                <text x="250" y="360" text-anchor="middle" font-size="11" fill="#6B7280">100 Hz</text>
                <text x="420" y="360" text-anchor="middle" font-size="11" fill="#6B7280">1 kHz</text>
                <text x="590" y="360" text-anchor="middle" font-size="11" fill="#6B7280">10 kHz</text>
                <text x="760" y="360" text-anchor="middle" font-size="11" fill="#6B7280">100 kHz</text>

                <!-- Y-axis labels (gain) -->
                <text x="70" y="340" text-anchor="end" font-size="11" fill="#6B7280">-20 dB</text>
                <text x="70" y="265" text-anchor="end" font-size="11" fill="#6B7280">-10 dB</text>
                <text x="70" y="190" text-anchor="end" font-size="11" fill="#6B7280">0 dB</text>
                <text x="70" y="115" text-anchor="end" font-size="11" fill="#6B7280">+10 dB</text>
                <text x="70" y="40" text-anchor="end" font-size="11" fill="#6B7280">+20 dB</text>

                <!-- Axis Labels -->
                <text x="420" y="390" text-anchor="middle" font-size="13" font-weight="bold" fill="#374151">
                  Frequency (log scale)
                </text>
                <text x="20" y="190" text-anchor="middle" font-size="13" font-weight="bold" fill="#374151" transform="rotate(-90, 20, 190)">
                  Gain (dB)
                </text>
              </svg>
            </div>
          </div>

          <!-- Circuit Visualization -->
          <div class="mb-8">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
              ⚡ {{ filterType === 'lowpass' ? 'Low-Pass' : 'High-Pass' }} Filter Circuit
            </h4>
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg p-4">
              <svg viewBox="0 0 800 300" class="w-full h-auto">
                <!-- Input -->
                <circle cx="100" cy="150" r="30" fill="white" stroke="#EF4444" stroke-width="3"/>
                <text x="100" y="155" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">Vin</text>

                <!-- Wire to filter -->
                <line x1="130" y1="150" x2="200" y2="150" stroke="#6B7280" stroke-width="3"/>

                <!-- LC Filter Components -->
                <g v-if="filterType === 'lowpass'">
                  <!-- Series Inductor -->
                  <line x1="200" y1="150" x2="250" y2="150" stroke="#6B7280" stroke-width="3"/>
                  <path d="M 250 150 L 260 140 L 270 160 L 280 140 L 290 160 L 300 140 L 310 160 L 320 140 L 330 160 L 340 150 L 350 150"
                    fill="none" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="350" y1="150" x2="450" y2="150" stroke="#6B7280" stroke-width="3"/>

                  <!-- Shunt Capacitor -->
                  <line x1="450" y1="150" x2="450" y2="100" stroke="#6B7280" stroke-width="3"/>
                  <line x1="430" y1="100" x2="470" y2="100" stroke="#10B981" stroke-width="3"/>
                  <line x1="432" y1="95" x2="432" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="438" y1="95" x2="438" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="444" y1="95" x2="444" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="450" y1="95" x2="450" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="456" y1="95" x2="456" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="462" y1="95" x2="462" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="468" y1="95" x2="468" y2="105" stroke="#10B981" stroke-width="2"/>
                  <line x1="450" y1="100" x2="450" y2="80" stroke="#6B7280" stroke-width="3"/>
                  <circle cx="450" cy="70" r="5" fill="#10B981"/>
                  <line x1="450" y1="70" x2="450" y2="200" stroke="#6B7280" stroke-width="2" stroke-dasharray="4,4"/>
                  <line x1="450" y1="200" x2="100" y2="200" stroke="#6B7280" stroke-width="2"/>
                  <line x1="100" y1="200" x2="100" y2="180" stroke="#6B7280" stroke-width="2"/>

                  <!-- Wire to output -->
                  <line x1="450" y1="150" x2="550" y2="150" stroke="#6B7280" stroke-width="3"/>
                </g>

                <g v-else>
                  <!-- Series Capacitor -->
                  <line x1="200" y1="150" x2="250" y2="150" stroke="#6B7280" stroke-width="3"/>
                  <line x1="250" y1="130" x2="250" y2="170" stroke="#10B981" stroke-width="3"/>
                  <line x1="255" y1="130" x2="255" y2="170" stroke="#10B981" stroke-width="3"/>
                  <line x1="252" y1="125" x2="252" y2="128" stroke="#10B981" stroke-width="2"/>
                  <line x1="258" y1="125" x2="258" y2="128" stroke="#10B981" stroke-width="2"/>
                  <line x1="261" y1="125" x2="261" y2="128" stroke="#10B981" stroke-width="2"/>
                  <line x1="264" y1="125" x2="264" y2="128" stroke="#10B981" stroke-width="2"/>
                  <line x1="250" y1="150" x2="300" y2="150" stroke="#6B7280" stroke-width="3"/>
                  <line x1="255" y1="150" x2="300" y2="150" stroke="#6B7280" stroke-width="3"/>

                  <!-- Shunt Inductor -->
                  <line x1="300" y1="150" x2="350" y2="150" stroke="#6B7280" stroke-width="3"/>
                  <line x1="350" y1="150" x2="350" y2="100" stroke="#6B7280" stroke-width="3"/>
                  <path d="M 350 100 L 360 90 L 370 110 L 380 90 L 390 110 L 400 90 L 410 110 L 420 90 L 430 110 L 440 100"
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="440" y1="100" x2="440" y2="80" stroke="#6B7280" stroke-width="3"/>
                  <circle cx="440" cy="70" r="5" fill="#3B82F6"/>
                  <line x1="440" y1="70" x2="440" y2="200" stroke="#6B7280" stroke-width="2" stroke-dasharray="4,4"/>
                  <line x1="440" y1="200" x2="100" y2="200" stroke="#6B7280" stroke-width="2"/>
                  <line x1="100" y1="200" x2="100" y2="180" stroke="#6B7280" stroke-width="2"/>

                  <!-- Wire to output -->
                  <line x1="350" y1="150" x2="550" y2="150" stroke="#6B7280" stroke-width="3"/>
                </g>

                <!-- Output -->
                <circle cx="600" cy="150" r="30" fill="white" stroke="#10B981" stroke-width="3"/>
                <text x="600" y="155" text-anchor="middle" font-size="14" font-weight="bold" fill="#10B981">Vout</text>

                <!-- Component Labels -->
                <text x="300" y="60" text-anchor="middle" font-size="14" font-weight="bold" fill="#3B82F6">
                  L = {{ formatInductance(inductance) }}
                </text>
                <text x="450" y="250" text-anchor="middle" font-size="14" font-weight="bold" fill="#10B981">
                  C = {{ formatCapacitance(capacitance) }}
                </text>
              </svg>
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
            📚 Understanding LC Filters
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is an LC Filter?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              An LC filter uses inductors (L) and capacitors (C) to selectively pass or block certain frequencies.
              It's a second-order filter that provides steeper roll-off than first-order RC filters.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Parameters:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Cutoff Frequency (f_c)</strong>: The frequency at which output power is halved (-3dB)</li>
              <li><strong>Q Factor</strong>: Quality factor, determines filter sharpness and peaking</li>
              <li><strong>Characteristic Impedance</strong>: √(L/C), the natural impedance of the LC network</li>
              <li><strong>Damping Ratio</strong>: Controls transient response and frequency response shape</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Filter Types:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">📉 Low-Pass Filter</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Passes frequencies below f_c</li>
                  <li>• Attenuates high frequencies</li>
                  <li>• Inductor in series, capacitor in shunt</li>
                  <li>• Used for audio crossovers, power supplies</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">📈 High-Pass Filter</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Passes frequencies above f_c</li>
                  <li>• Attenuates low frequencies</li>
                  <li>• Capacitor in series, inductor in shunt</li>
                  <li>• Used for RF coupling, DC blocking</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Equations:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div>f_c = 1 / (2π × √(L × C))</div>
              <div>Q = R × √(C/L)  (for loaded filters)</div>
              <div>Z_0 = √(L/C)  (characteristic impedance)</div>
              <div>ζ = 1 / (2Q)  (damping ratio)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Q Factor Guide:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Q < 0.5</strong>: Overdamped - Slow response, no overshoot, gradual roll-off</li>
              <li><strong>Q = 0.5</strong>: Critically damped - Fastest response without overshoot</li>
              <li><strong>Q = 0.707</strong>: Butterworth response - Maximally flat passband</li>
              <li><strong>Q > 0.707</strong>: Underdamped - Peaking in response, faster roll-off</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Audio Systems</strong>: Crossover networks, tone controls</li>
              <li><strong>Power Supplies</strong>: Reducing ripple voltage, EMI filtering</li>
              <li><strong>RF Circuits</strong>: IF filters, image rejection, impedance matching</li>
              <li><strong>Communication</strong>: Channel selection, noise reduction</li>
              <li><strong>Signal Processing</strong>: Anti-aliasing, reconstruction filters</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Pro Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use high-Q components for better filter performance (low ESR capacitors, high-Q inductors)</li>
              <li>Consider source and load impedance - they affect the filter response</li>
              <li>Ceramic capacitors are good for RF, electrolytic for power supply filtering</li>
              <li>For sharp filters, cascade multiple LC stages</li>
              <li>Watch for parasitic effects at high frequencies (ESR, ESL, inter-winding capacitance)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { colorMode } = useColorMode()

// Component values
const inductance = ref(1000) // µH
const capacitance = ref(100000) // pF
const filterType = ref<'lowpass' | 'highpass'>('lowpass')

// Calculated values
const cutoffFreq = computed(() => {
  const L = inductance.value * 1e-6 // Convert to H
  const C = capacitance.value * 1e-12 // Convert to F
  return 1 / (2 * Math.PI * Math.sqrt(L * C))
})

const charImpedance = computed(() => {
  const L = inductance.value * 1e-6 // Convert to H
  const C = capacitance.value * 1e-12 // Convert to F
  return Math.sqrt(L / C)
})

const qFactor = computed(() => {
  // Assume 50Ω load for Q calculation
  const R = 50
  const L = inductance.value * 1e-6
  const C = capacitance.value * 1e-12
  return R * Math.sqrt(C / L)
})

const dampingRatio = computed(() => {
  return 1 / (2 * qFactor.value)
})

// Format functions
const formatInductance = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)} H`
  if (val >= 1000) return `${(val / 1000).toFixed(1)} mH`
  return `${val} µH`
}

const formatCapacitance = (val: number) => {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)} F`
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)} µF`
  if (val >= 1000) return `${(val / 1000).toFixed(1)} nF`
  return `${val} pF`
}

const formatFrequency = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)} MHz`
  if (val >= 1000) return `${(val / 1000).toFixed(2)} kHz`
  return `${val.toFixed(2)} Hz`
}

// Preset configurations
const setPreset = (type: string) => {
  switch (type) {
    case 'audio':
      inductance.value = 8200 // 8.2 mH
      capacitance.value = 3300000 // 3.3 µF → ~1kHz
      break
    case 'rf-if':
      inductance.value = 150 // 150 µH
      capacitance.value = 820 // 820 pF → ~455kHz
      break
    case 'power':
      inductance.value = 100000 // 100 mH
      capacitance.value = 47000000 // 47 µF → ~73Hz
      break
    case 'rf-frontend':
      inductance.value = 2 // 2 µH
      capacitance.value = 13 // 13 pF → ~31MHz
      break
  }
}

// Frequency response path generation
const frequencyResponsePath = computed(() => {
  const points: [number, number][] = []
  const freqMin = Math.log10(10)
  const freqMax = Math.log10(100000)

  for (let i = 0; i <= 100; i++) {
    const logFreq = freqMin + (i / 100) * (freqMax - freqMin)
    const freq = Math.pow(10, logFreq)

    let gain = 0
    if (filterType.value === 'lowpass') {
      // Low-pass filter response
      const ratio = freq / cutoffFreq.value
      gain = 1 / Math.sqrt(1 + Math.pow(ratio, 4))
    } else {
      // High-pass filter response
      const ratio = cutoffFreq.value / freq
      gain = 1 / Math.sqrt(1 + Math.pow(ratio, 4))
    }

    const gainDB = 20 * Math.log10(gain)

    // Map to SVG coordinates
    const x = 80 + ((i / 100) * 680)
    const y = 190 - (gainDB * 7.5) // Scale: 0dB = 190, each dB = 7.5px

    points.push([x, Math.max(40, Math.min(340, y))])
  }

  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
})

// Cutoff frequency marker position
const cutoffX = computed(() => {
  const freqLog = Math.log10(cutoffFreq.value)
  const freqMin = Math.log10(10)
  const freqMax = Math.log10(100000)
  return 80 + ((freqLog - freqMin) / (freqMax - freqMin)) * 680
})

const cutoffY = computed(() => {
  // At cutoff, gain is -3dB
  return 190 + 22.5 // -3dB * 7.5px/dB
})

useHead({
  title: 'LC Filter Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive LC filter design and frequency response analysis' }
  ]
})
</script>

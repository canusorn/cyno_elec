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
            ⚡ Inductive Kickback Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Witness the dangerous voltage spike when switching off inductive loads and see how a flyback diode protects your circuit
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔌 Interactive Circuit Simulator
          </h3>

          <!-- Controls -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <!-- Inductance -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                🌀 Inductance (L)
              </label>
              <input
                type="range"
                v-model.number="inductance"
                min="1"
                max="1000"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ inductance }}mH</span>
              </div>
            </div>

            <!-- Current -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                ⚡ Steady Current (I)
              </label>
              <input
                type="range"
                v-model.number="current"
                min="0.1"
                max="10"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ current }}A</span>
              </div>
            </div>

            <!-- Switch Resistance -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                🔌 Switch Resistance
              </label>
              <input
                type="range"
                v-model.number="switchResistance"
                min="1"
                max="100"
                step="1"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ switchResistance }}MΩ</span>
              </div>
            </div>

            <!-- Flyback Diode -->
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                🔴 Flyback Diode
              </label>
              <button
                @click="toggleDiode"
                :class="[
                  'w-full py-2 px-4 rounded-lg font-semibold transition-all',
                  hasFlybackDiode 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                ]"
              >
                {{ hasFlybackDiode ? '✓ Protected' : '✗ No Protection' }}
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-center gap-4 mb-8">
            <button
              @click="closeSwitch"
              :disabled="isSwitchClosed"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
            >
              ⚡ Close Switch (Establish Current)
            </button>
            <button
              @click="openSwitch"
              :disabled="!isSwitchClosed"
              class="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
            >
              🔓 Open Switch (Trigger Kickback!)
            </button>
          </div>

          <!-- Circuit Diagram -->
          <div class="mb-8">
            <svg viewBox="0 0 800 350" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#EF4444" />
                </marker>
              </defs>

              <!-- Voltage Source -->
              <g>
                <circle cx="100" cy="175" r="35" fill="white" stroke="#3B82F6" stroke-width="3"/>
                <text x="100" y="170" text-anchor="middle" font-size="12" font-weight="bold" fill="#3B82F6">DC</text>
                <text x="100" y="185" text-anchor="middle" font-size="10" fill="#3B82F6">{{ voltage }}V</text>
                <text x="100" y="225" text-anchor="middle" font-size="11" fill="#3B82F6">Voltage Source</text>
              </g>

              <!-- Main circuit loop -->
              <line x1="135" y1="175" x2="250" y2="175" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="250" y1="175" x2="250" y2="100" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              
              <!-- Switch -->
              <g>
                <line x1="250" y1="100" x2="350" y2="100" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
                <circle cx="300" cy="100" r="6" fill="#F59E0B"/>
                <line x1="300" y1="100" x2="300" :y2="isSwitchClosed ? 100 : 70" 
                      stroke="#EF4444" stroke-width="4" stroke-linecap="round">
                  <animate v-if="!isSwitchClosed && animating" 
                           attributeName="y2" 
                           values="100;70;70" 
                           dur="0.3s" 
                           fill="freeze"/>
                </line>
                <circle cx="350" cy="100" r="6" fill="#F59E0B"/>
                <text x="325" y="80" text-anchor="middle" font-size="11" fill="#EF4444">
                  {{ isSwitchClosed ? 'CLOSED' : 'OPEN' }}
                </text>
                <text x="325" y="130" text-anchor="middle" font-size="10" fill="#6B7280">Switch</text>
              </g>

              <line x1="350" y1="100" x2="500" y2="100" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="500" y1="100" x2="500" y2="175" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>

              <!-- Inductor/Coil -->
              <g>
                <path d="M 500 175 
                         L 500 195 
                         L 510 200 L 490 210 
                         L 510 220 L 490 230 
                         L 510 240 L 490 250 
                         L 500 255 
                         L 500 275" 
                      fill="none" 
                      stroke="#8B5CF6" 
                      stroke-width="4" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"
                      :filter="currentFlowing ? 'url(#glow)' : ''"/>
                <text x="540" y="225" font-size="11" fill="#8B5CF6">
                  L = {{ inductance }}mH
                </text>
                <text x="540" y="240" font-size="10" fill="#8B5CF6">
                  {{ current.toFixed(1) }}A
                </text>
              </g>

              <line x1="500" y1="275" x2="100" y2="275" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>
              <line x1="100" y1="275" x2="100" y2="210" stroke="#6B7280" stroke-width="4" stroke-linecap="round"/>

              <!-- Flyback Diode (parallel to inductor) -->
              <g v-if="hasFlybackDiode">
                <line x1="530" y1="180" x2="530" y2="270" stroke="#10B981" stroke-width="3" stroke-dasharray="5,3"/>
                <circle cx="550" cy="180" r="15" fill="white" stroke="#10B981" stroke-width="2"/>
                <path d="M 543 175 L 557 175 L 543 185 L 557 185" fill="none" stroke="#10B981" stroke-width="2"/>
                <line x1="550" y1="170" x2="550" y2="190" stroke="#10B981" stroke-width="2"/>
                <text x="580" y="180" font-size="10" fill="#10B981">Flyback</text>
                <text x="580" y="192" font-size="10" fill="#10B981">Diode</text>
              </g>

              <!-- Voltage spike indicator -->
              <g v-if="showSpike && !hasFlybackDiode">
                <path d="M 620 100 L 680 30 L 690 45 L 710 20 L 720 35 L 750 10" 
                      fill="none" 
                      stroke="#EF4444" 
                      stroke-width="3" 
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      filter="url(#glow)">
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>
                </path>
                <text x="685" y="60" text-anchor="middle" font-size="14" font-weight="bold" fill="#EF4444">
                  SPIKE!
                </text>
                <text x="685" y="75" text-anchor="middle" font-size="11" fill="#EF4444">
                  {{ spikeVoltage.toFixed(0) }}V
                </text>
              </g>

              <!-- Energy dissipated indicator -->
              <g v-if="hasFlybackDiode && energyDissipated > 0">
                <rect x="620" y="100" width="130" height="50" rx="5" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" stroke-width="2"/>
                <text x="685" y="120" text-anchor="middle" font-size="11" fill="#10B981">Energy Dissipated</text>
                <text x="685" y="138" text-anchor="middle" font-size="13" font-weight="bold" fill="#10B981">
                  {{ energyDissipated.toFixed(3) }}J
                </text>
              </g>

              <!-- Current flow indicator -->
              <g v-if="currentFlowing">
                <polygon points="200,165 210,175 200,185" fill="#3B82F6">
                  <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="300,90 310,100 300,110" fill="#3B82F6">
                  <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" begin="0.2s"/>
                </polygon>
                <polygon points="400,90 410,100 400,110" fill="#3B82F6">
                  <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" begin="0.4s"/>
                </polygon>
              </g>
            </svg>
          </div>

          <!-- Real-time Waveform -->
          <div class="bg-gray-900 dark:bg-black rounded-lg p-4">
            <h4 class="text-lg font-bold text-white mb-4">📈 Voltage vs Time Waveform</h4>
            <svg viewBox="0 0 800 200" class="w-full h-auto">
              <!-- Grid -->
              <defs>
                <pattern id="waveformGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="800" height="200" fill="url(#waveformGrid)" />

              <!-- Zero line -->
              <line x1="50" y1="100" x2="750" y2="100" stroke="#6B7280" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="760" y="105" font-size="10" fill="#9CA3AF">0V</text>

              <!-- Voltage scale -->
              <line x1="50" y1="20" x2="750" y2="20" stroke="#374151" stroke-width="1" stroke-dasharray="3,3"/>
              <text x="760" y="25" font-size="10" fill="#9CA3AF">+{{ (maxSpikeVoltage / 1000).toFixed(0) }}kV</text>

              <!-- Waveform trace -->
              <path :d="waveformPath" 
                    fill="none" 
                    :stroke="showSpike && !hasFlybackDiode ? '#EF4444' : '#3B82F6'" 
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>

              <!-- Current time marker -->
              <line :x1="50 + currentTime * 700" 
                    y1="10" 
                    :x2="50 + currentTime * 700" 
                    y2="190" 
                    stroke="#F59E0B" 
                    stroke-width="2" 
                    stroke-dasharray="5,5"/>

              <!-- Labels -->
              <text x="400" y="195" text-anchor="middle" font-size="11" fill="#9CA3AF">Time →</text>
              <text x="20" y="100" text-anchor="middle" font-size="11" fill="#9CA3AF" transform="rotate(-90, 20, 100)">Voltage →</text>
            </svg>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Analysis Results
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Stored Energy -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
              <div class="text-sm text-blue-600 dark:text-blue-400 mb-2">🔋 Stored Energy in Inductor</div>
              <div class="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {{ storedEnergy.toFixed(4) }}J
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-400 mt-2">
                E = ½ × L × I²
              </div>
            </div>

            <!-- Spike Voltage -->
            <div :class="[
              'rounded-lg p-6',
              showSpike && !hasFlybackDiode 
                ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600'
            ]">
              <div class="text-sm mb-2" :class="showSpike && !hasFlybackDiode ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'">
                ⚡ Peak Spike Voltage
              </div>
              <div class="text-3xl font-bold" :class="showSpike && !hasFlybackDiode ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'">
                {{ spikeVoltage.toFixed(1) }}V
              </div>
              <div class="text-xs mt-2" :class="showSpike && !hasFlybackDiode ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'">
                {{ hasFlybackDiode ? 'Clamped to ~0.7V by diode' : 'Can damage components!' }}
              </div>
            </div>

            <!-- Status -->
            <div :class="[
              'rounded-lg p-6',
              hasFlybackDiode 
                ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' 
                : 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
            ]">
              <div class="text-sm mb-2" :class="hasFlybackDiode ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                🛡️ Protection Status
              </div>
              <div class="text-2xl font-bold" :class="hasFlybackDiode ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'">
                {{ hasFlybackDiode ? 'PROTECTED' : 'UNPROTECTED' }}
              </div>
              <div class="text-xs mt-2" :class="hasFlybackDiode ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'">
                {{ hasFlybackDiode ? 'Diode safely dissipates energy' : 'High voltage risk!' }}
              </div>
            </div>
          </div>

          <!-- Calculations -->
          <div class="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">🧮 Calculations:</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
              <div>
                <div class="text-gray-600 dark:text-gray-400">Stored Energy:</div>
                <div class="text-gray-900 dark:text-gray-200">
                  E = 0.5 × {{ inductance }}mH × ({{ current }}A)² = {{ storedEnergy.toFixed(4) }}J
                </div>
              </div>
              <div>
                <div class="text-gray-600 dark:text-gray-400">Spike Voltage (no diode):</div>
                <div class="text-gray-900 dark:text-gray-200">
                  V ≈ {{ current }}A × {{ (switchResistance * 1e6).toFixed(0) }}MΩ = {{ spikeVoltage.toFixed(1) }}V
                </div>
              </div>
              <div v-if="hasFlybackDiode">
                <div class="text-gray-600 dark:text-gray-400">Diode Clamp Voltage:</div>
                <div class="text-gray-900 dark:text-gray-200">
                  V_diode ≈ 0.7V (forward voltage drop)
                </div>
              </div>
              <div v-if="hasFlybackDiode && energyDissipated > 0">
                <div class="text-gray-600 dark:text-gray-400">Decay Time Constant:</div>
                <div class="text-gray-900 dark:text-gray-200">
                  τ = L/R = {{ ((inductance * 1e-3) / 10).toFixed(3) }}s (approx)
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
            📚 Understanding Inductive Kickback
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is Inductive Kickback?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When current flowing through an inductor is suddenly interrupted, the inductor generates a large voltage spike
              in an attempt to maintain the current flow. This phenomenon is called <strong>inductive kickback</strong> or
              <strong>back EMF</strong> (Electromotive Force).
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Does It Happen?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Inductors resist changes in current. When you try to stop the current instantly, the inductor fights back
              by generating whatever voltage is necessary to keep the current flowing. This can create voltage spikes
              of hundreds or even thousands of volts!
            </p>

            <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
              <h4 class="font-bold text-red-800 dark:text-red-300 mb-2">⚠️ DANGER!</h4>
              <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                <li>• Can destroy switching components (transistors, MOSFETs, relays)</li>
                <li>• Causes arcing in mechanical switches and relays</li>
                <li>• Can generate electromagnetic interference (EMI)</li>
                <li>• May damage sensitive electronics nearby</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">The Physics:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div>V_L = -L × (dI/dt)</div>
              <div class="text-gray-600 dark:text-gray-400">Where: V_L = induced voltage, L = inductance, dI/dt = rate of current change</div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When current stops instantly (dI/dt → ∞), the voltage becomes theoretically infinite! In reality,
              it's limited by circuit resistance, parasitic capacitance, and breakdown voltages.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">🛡️ The Solution: Flyback Diode</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A flyback diode (also called a freewheeling diode or snubber diode) provides a safe path for the inductor
              current to flow when the switch opens. The diode is connected in reverse bias during normal operation,
              but becomes forward biased when the inductor tries to maintain current flow.
            </p>

            <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 my-4">
              <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">✓ Benefits of Flyback Diode:</h4>
              <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>• Clamps voltage spike to ~0.7V (diode forward voltage)</li>
                <li>• Protects switching components from damage</li>
                <li>• Reduces EMI and electrical noise</li>
                <li>• Allows inductor energy to dissipate safely</li>
              </ul>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Stored Energy:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div>E = ½ × L × I²</div>
              <div class="text-gray-600 dark:text-gray-400">Where: E = energy (Joules), L = inductance (Henries), I = current (Amps)</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Relay drivers:</strong> Protect transistor driving relay coil</li>
              <li><strong>Motor control:</strong> Suppress spikes from DC motors</li>
              <li><strong>Solenoid drivers:</strong> Safely switch inductive loads</li>
              <li><strong>Switching power supplies:</strong> Protect switching transistors</li>
              <li><strong>Automotive:</strong> Protect ignition switches and controls</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A 12V automotive relay with a 100mH coil drawing 100mA:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Stored energy: E = 0.5 × 0.1H × (0.1A)² = 0.0005J</li>
              <li>Without diode: Could generate spikes > 100V!</li>
              <li>With diode: Voltage clamped to ~0.7V</li>
              <li>Decay time: ~5ms (L/R time constant)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use diodes with current rating ≥ max inductor current</li>
              <li>Select diodes with reverse voltage rating ≥ supply voltage</li>
              <li>For fast switching, use Schottky diodes (lower forward voltage)</li>
              <li>Place diode as close to the inductor as possible</li>
              <li>Consider using Zener diodes for faster energy dissipation</li>
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
import { ref, computed, watch } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// State
const inductance = ref(100) // mH
const current = ref(2) // A
const switchResistance = ref(10) // MΩ
const hasFlybackDiode = ref(true)
const isSwitchClosed = ref(false)
const showSpike = ref(false)
const animating = ref(false)
const currentTime = ref(0)
const energyDissipated = ref(0)

// Computed properties
const voltage = ref(12)

const storedEnergy = computed(() => {
  const L = inductance.value * 1e-3 // Convert mH to H
  return 0.5 * L * Math.pow(current.value, 2)
})

const spikeVoltage = computed(() => {
  if (hasFlybackDiode.value) {
    return 0.7 // Diode forward voltage
  }
  // V = I × R (when switch opens with resistance R)
  const R = switchResistance.value * 1e6 // Convert MΩ to Ω
  return current.value * R
})

const maxSpikeVoltage = computed(() => {
  return Math.max(spikeVoltage.value, 1000)
})

const currentFlowing = computed(() => {
  return isSwitchClosed.value
})

// Waveform generation
const waveformPath = computed(() => {
  const points = []
  const numPoints = 100
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints
    const x = 50 + t * 700
    let y = 100
    
    // Switch closes at t = 0.2
    if (t < 0.2) {
      y = 100 // No voltage
    } else if (t < 0.3) {
      // Switch is closed, steady state
      y = 100 - (voltage.value / maxSpikeVoltage.value) * 80
    } else if (t < 0.35) {
      // Switch opens, spike!
      if (hasFlybackDiode.value) {
        y = 100 - (0.7 / maxSpikeVoltage.value) * 80
      } else {
        const spikeProgress = (t - 0.3) / 0.05
        y = 100 - (spikeVoltage.value / maxSpikeVoltage.value) * 80 * Math.sin(spikeProgress * Math.PI)
      }
    } else {
      // Decay
      if (hasFlybackDiode.value) {
        const decayTime = t - 0.35
        y = 100 - (0.7 / maxSpikeVoltage.value) * 80 * Math.exp(-decayTime * 10)
      } else {
        y = 100
      }
    }
    
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

// Methods
const closeSwitch = () => {
  isSwitchClosed.value = true
  showSpike.value = false
  energyDissipated.value = 0
  currentTime.value = 0.25 // After switch closes
}

const openSwitch = () => {
  isSwitchClosed.value = false
  showSpike.value = true
  animating.value = true
  
  // Animate the spike
  setTimeout(() => {
    if (hasFlybackDiode.value) {
      energyDissipated.value = storedEnergy.value
    }
  }, 500)
  
  // Reset spike display after animation
  setTimeout(() => {
    animating.value = false
  }, 2000)
  
  currentTime.value = 0.32 // During spike
}

const toggleDiode = () => {
  hasFlybackDiode.value = !hasFlybackDiode.value
  showSpike.value = false
  energyDissipated.value = 0
}

// SEO
useHead({
  title: 'Inductive Kickback Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive inductive kickback simulation. Learn how voltage spikes form when switching inductive loads and how flyback diodes protect your circuits.' },
    { name: 'keywords', content: 'inductive kickback, flyback diode, back EMF, inductor simulation, circuit protection' }
  ]
})
</script>

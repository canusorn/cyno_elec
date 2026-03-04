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
            Piezoelectric Effect Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore how mechanical stress generates electricity in piezoelectric materials
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-3 text-2xl font-mono font-bold flex-wrap justify-center">
              <span class="text-primary-highlight">V</span>
              <span class="text-gray-400">=</span>
              <span class="text-primary-highlight">g</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">t</span>
              <span class="text-gray-400">×</span>
              <span class="text-primary-highlight">F</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Voltage = Piezo Coefficient × Thickness × Applied Force</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Controls -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Piezoelectric Crystal Simulation
          </h3>

          <!-- Material Selection -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              🔬 Piezoelectric Material
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                v-for="material in materials"
                :key="material.name"
                @click="selectedMaterial = material"
                :class="[
                  'p-4 rounded-lg border-2 transition-all',
                  selectedMaterial.name === material.name
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                ]"
              >
                <div class="text-center">
                  <div class="text-2xl mb-2">{{ material.icon }}</div>
                  <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ material.name }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    d33: {{ material.d33 }} pC/N
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Interactive Crystal Visualization -->
          <div class="mb-8">
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <defs>
                  <filter id="glowCrystal">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:0.6" />
                    <stop offset="100%" style="stop-color:#A78BFA;stop-opacity:0.8" />
                  </linearGradient>
                </defs>

                <!-- Base plate -->
                <rect x="100" y="320" width="600" height="20" rx="3" fill="#374151" />
                <text x="400" y="355" text-anchor="middle" font-size="14" fill="#9CA3AF">Fixed Base Plate</text>

                <!-- Piezoelectric Crystal -->
                <g :transform="`translate(400, ${200 - compression})`">
                  <!-- Main crystal body - deforms with force -->
                  <rect
                    :x="-150"
                    :y="-80 - compression/2"
                    :width="300"
                    :height="160 + compression"
                    rx="10"
                    fill="url(#crystalGradient)"
                    stroke="#60A5FA"
                    stroke-width="3"
                    :transform="`scale(${1 - compression/800}, ${1 + compression/200})`"
                    filter="url(#glowCrystal)"
                  />

                  <!-- Internal dipole alignment arrows -->
                  <g :transform="`scale(${1 - compression/800}, ${1 + compression/200})`">
                    <g v-for="i in 5" :key="i">
                      <line
                        :x1="-120 + i * 50"
                        :y1="-30"
                        :x2="-120 + i * 50"
                        :y2="30"
                        :stroke="force > 0 ? '#10B981' : '#6B7280'"
                        stroke-width="2"
                        stroke-dasharray="5,3"
                      />
                      <polygon
                        :points="`${-120 + i * 50},30 ${-125 + i * 50},20 ${-115 + i * 50},20`"
                        :fill="force > 0 ? '#10B981' : '#6B7280'"
                      />
                    </g>
                  </g>

                  <!-- Top electrode -->
                  <rect
                    :x="-160"
                    :y="-90 - compression/2"
                    width="320"
                    height="15"
                    rx="3"
                    fill="#F59E0B"
                    :transform="`scale(${1 - compression/800}, ${1 + compression/200})`"
                  />
                </g>

                <!-- Force arrows -->
                <g v-if="force > 0">
                  <g transform="translate(400, 50)">
                    <line x1="0" y1="0" x2="0" y2="40" stroke="#EF4444" stroke-width="4" marker-end="url(#arrowForce)" />
                    <text x="20" y="30" font-size="16" font-weight="bold" fill="#EF4444">F = {{ force }}N</text>
                  </g>
                </g>

                <!-- Voltage indicators -->
                <g transform="translate(650, 150)">
                  <rect x="0" y="0" width="130" height="80" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" stroke-width="2" />
                  <text x="65" y="25" text-anchor="middle" font-size="12" fill="#10B981">Generated Voltage</text>
                  <text x="65" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="#10B981">
                    {{ generatedVoltage.toFixed(2) }}V
                  </text>
                  <text x="65" y="70" text-anchor="middle" font-size="10" fill="#6EE7B7">V = g × t × F</text>
                </g>

                <!-- Charge indicator -->
                <g transform="translate(20, 150)">
                  <rect x="0" y="0" width="130" height="80" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3B82F6" stroke-width="2" />
                  <text x="65" y="25" text-anchor="middle" font-size="12" fill="#3B82F6">Generated Charge</text>
                  <text x="65" y="50" text-anchor="middle" font-size="24" font-weight="bold" fill="#3B82F6">
                    {{ generatedCharge.toFixed(1) }}nC
                  </text>
                  <text x="65" y="70" text-anchor="middle" font-size="10" fill="#93C5FD">Q = d33 × F</text>
                </g>

                <!-- Electric field lines -->
                <g v-if="generatedVoltage > 0.1" opacity="0.6">
                  <line
                    v-for="i in 7"
                    :key="'field-' + i"
                    :x1="-100 + i * 30"
                    :y1="120 - compression"
                    :x2="-100 + i * 30"
                    :y2="280 - compression"
                    stroke="#F59E0B"
                    stroke-width="1"
                    stroke-dasharray="4,4"
                  />
                  <text x="400" y="310" text-anchor="middle" font-size="11" fill="#F59E0B">
                    Electric Field: {{ (generatedVoltage / (selectedMaterial.thickness * 0.001)).toFixed(1) }} V/m
                  </text>
                </g>

                <!-- Material info -->
                <g transform="translate(400, 380)">
                  <text text-anchor="middle" font-size="13" fill="#6B7280">
                    {{ selectedMaterial.name }} | Thickness: {{ selectedMaterial.thickness }}mm |
                    g33: {{ selectedMaterial.g33 }} mV/N | d33: {{ selectedMaterial.d33 }} pC/N
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <!-- Force Control -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              🔧 Applied Force (Newtons)
            </label>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <div class="flex items-center gap-4 mb-4">
                <input
                  type="range"
                  v-model.number="force"
                  min="0"
                  max="1000"
                  step="10"
                  class="flex-1 h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <input
                  type="number"
                  v-model.number="force"
                  min="0"
                  max="1000"
                  class="w-24 px-3 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center font-mono font-bold text-gray-900 dark:text-white focus:border-primary focus:outline-none"
                />
                <span class="text-gray-600 dark:text-gray-400 font-semibold">N</span>
              </div>

              <!-- Quick presets -->
              <div class="flex flex-wrap gap-2">
                <button
                  @click="force = 0"
                  class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  No Force (0N)
                </button>
                <button
                  @click="force = 50"
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  Light Touch (50N)
                </button>
                <button
                  @click="force = 200"
                  class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  Press (200N)
                </button>
                <button
                  @click="force = 500"
                  class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg text-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  Strong (500N)
                </button>
                <button
                  @click="force = 1000"
                  class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  Maximum (1000N)
                </button>
              </div>
            </div>
          </div>

          <!-- Results Display -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div class="text-sm text-green-700 dark:text-green-400 mb-2">Generated Voltage</div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400 font-mono">
                {{ generatedVoltage.toFixed(2) }}V
              </div>
              <div class="text-xs text-green-600 dark:text-green-500 mt-2">
                V = {{ selectedMaterial.g33 }} × {{ selectedMaterial.thickness }} × {{ force }}
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
              <div class="text-sm text-blue-700 dark:text-blue-400 mb-2">Generated Charge</div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                {{ generatedCharge.toFixed(1) }} nC
              </div>
              <div class="text-xs text-blue-600 dark:text-blue-500 mt-2">
                Q = {{ selectedMaterial.d33 }} × {{ force }}
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <div class="text-sm text-purple-700 dark:text-purple-400 mb-2">Electric Field</div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 font-mono">
                {{ electricField.toFixed(1) }} kV/m
              </div>
              <div class="text-xs text-purple-600 dark:text-purple-500 mt-2">
                E = V ÷ thickness
              </div>
            </div>
          </div>

          <!-- Power Output -->
          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">⚡ Power Output (with Load)</h4>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Load Resistance (Ω)
              </label>
              <input
                type="range"
                v-model.number="loadResistance"
                min="100"
                max="1000000"
                step="100"
                class="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div class="text-center font-mono text-lg text-gray-900 dark:text-white mt-2">
                {{ loadResistance.toLocaleString() }} Ω
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400">Current</div>
                <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400 font-mono">
                  {{ outputCurrent.toFixed(4) }} mA
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400">Power</div>
                <div class="text-lg font-bold text-orange-600 dark:text-orange-400 font-mono">
                  {{ outputPower.toFixed(4) }} mW
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400">Energy</div>
                <div class="text-lg font-bold text-red-600 dark:text-red-400 font-mono">
                  {{ outputEnergy.toFixed(2) }} µJ
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                <div class="text-xs text-gray-600 dark:text-gray-400">Capacitance</div>
                <div class="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">
                  {{ capacitance.toFixed(1) }} pF
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
            📚 Understanding the Piezoelectric Effect
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is the Piezoelectric Effect?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The piezoelectric effect is the ability of certain materials to generate an electric charge in response to
              applied mechanical stress. The word comes from Greek: "piezein" (to squeeze or press) and "electric".
              When you deform these materials, their crystal structure changes, creating a voltage difference.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Crystal structure:</strong> Piezoelectric materials have a non-symmetric crystal structure with electric dipoles</li>
              <li><strong>Mechanical deformation:</strong> When force is applied, the crystal structure deforms</li>
              <li><strong>Charge separation:</strong> Deformation causes positive and negative charge centers to separate</li>
              <li><strong>Voltage generation:</strong> This charge separation creates a measurable voltage across the material</li>
              <li><strong>Reversible:</strong> The effect works both ways - applying voltage creates mechanical deformation</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Parameters:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 space-y-2">
              <div><strong>d33</strong> (Charge coefficient) = Charge generated per unit force (pC/N)</div>
              <div><strong>g33</strong> (Voltage coefficient) = Voltage generated per unit stress (mV·m/N)</div>
              <div><strong>Voltage:</strong> V = g33 × thickness × Force</div>
              <div><strong>Charge:</strong> Q = d33 × Force</div>
              <div><strong>Capacitance:</strong> C = ε_r × ε_0 × Area / thickness</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Piezoelectric Materials:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-blue-800 dark:text-blue-300">PZT (Lead Zirconate Titanate)</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 mt-2 space-y-1">
                  <li>• Most common ceramic</li>
                  <li>• High d33 (300-500 pC/N)</li>
                  <li>• Used in: igniters, sensors, actuators</li>
                </ul>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-green-800 dark:text-green-300">Quartz (SiO₂)</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 mt-2 space-y-1">
                  <li>• Natural crystal</li>
                  <li>• Low d33 (2.3 pC/N)</li>
                  <li>• Used in: oscillators, watches, filters</li>
                </ul>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-purple-800 dark:text-purple-300">PVDF (Polymer Film)</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 mt-2 space-y-1">
                  <li>• Flexible polymer</li>
                  <li>• Medium d33 (20-30 pC/N)</li>
                  <li>• Used in: sensors, speakers, touch pads</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 class="font-bold text-orange-800 dark:text-orange-300">BaTiO₃ (Barium Titanate)</h4>
                <ul class="text-sm text-orange-700 dark:text-orange-400 mt-2 space-y-1">
                  <li>• Ceramic material</li>
                  <li>• Medium d33 (190 pC/N)</li>
                  <li>• Used in: capacitors, transducers</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Gas grill igniters:</strong> Single press creates high voltage spark</li>
              <li><strong>Microphones & speakers:</strong> Convert sound to electricity and vice versa</li>
              <li><strong>Accelerometers:</strong> Measure vibration and acceleration</li>
              <li><strong>Energy harvesting:</strong> Power small devices from vibrations</li>
              <li><strong>Ultrasound imaging:</strong> Generate and receive ultrasonic waves</li>
              <li><strong>Quartz watches:</strong> Precision timing using crystal oscillators</li>
              <li><strong>Printers:</strong> Inkjet printheads use piezo actuators</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Advantages & Limitations:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">✅ Advantages</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• No external power needed (generators)</li>
                  <li>• Fast response time (microseconds)</li>
                  <li>• Wide frequency range</li>
                  <li>• Compact and lightweight</li>
                  <li>• High precision and resolution</li>
                  <li>• Long lifetime (no wear)</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                <h4 class="font-bold text-red-800 dark:text-red-300 mb-2">⚠️ Limitations</h4>
                <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                  <li>• Small power output</li>
                  <li>• Temperature sensitive</li>
                  <li>• High output impedance</li>
                  <li>• Can depolarize over time</li>
                  <li>• Brittle (ceramics)</li>
                  <li>• Hysteresis effects</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Real-World Example:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A gas grill igniter using a PZT crystal:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Crystal thickness: 5mm, d33: 350 pC/N, g33: 25 mV·m/N</li>
              <li>Press force: 50N (typical button press)</li>
              <li>Generated charge: Q = 350 × 50 = 17,500 pC = 17.5 nC</li>
              <li>Generated voltage: V = 25 × 5 × 50 = 6,250 mV = 6.25 kV</li>
              <li>This high voltage creates a spark to ignite the gas!</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">💡 Pro Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Maximize voltage:</strong> Use thinner crystals (V is proportional to thickness)</li>
              <li><strong>Maximize charge:</strong> Use materials with higher d33 coefficients</li>
              <li><strong>Energy storage:</strong> Connect to a capacitor to store generated charge</li>
              <li><strong>Impedance matching:</strong> Use high-impedance amplifiers for signal conditioning</li>
              <li><strong>Temperature range:</strong> Most materials work best between -20°C to +150°C</li>
              <li><strong>Preloading:</strong> Apply constant bias force for better linearity</li>
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
import { ref, computed } from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// Material properties
interface Material {
  name: string
  icon: string
  d33: number  // Charge coefficient in pC/N
  g33: number  // Voltage coefficient in mV·m/N
  thickness: number  // Thickness in mm
  dielectricConstant: number
}

const materials: Material[] = [
  {
    name: 'PZT Ceramic',
    icon: '🔷',
    d33: 350,
    g33: 25,
    thickness: 5,
    dielectricConstant: 1200
  },
  {
    name: 'Quartz',
    icon: '💎',
    d33: 2.3,
    g33: 50,
    thickness: 2,
    dielectricConstant: 4.5
  },
  {
    name: 'PVDF Film',
    icon: '🎞️',
    d33: 25,
    g33: 200,
    thickness: 0.1,
    dielectricConstant: 12
  },
  {
    name: 'BaTiO₃',
    icon: '🟠',
    d33: 190,
    g33: 15,
    thickness: 3,
    dielectricConstant: 1700
  }
]

// State
const selectedMaterial = ref<Material>(materials[0])
const force = ref(0)
const loadResistance = ref(10000)

// Computed properties
const compression = computed(() => {
  // Visual compression in pixels (for animation)
  return (force.value / 1000) * 20
})

const generatedVoltage = computed(() => {
  // V = g33 × thickness × Force
  // g33 in mV·m/N, thickness in mm, Force in N
  const g33 = selectedMaterial.value.g33  // mV·m/N
  const thickness = selectedMaterial.value.thickness / 1000  // convert mm to m
  const voltage = (g33 * thickness * force.value) / 1000  // convert mV to V
  return voltage
})

const generatedCharge = computed(() => {
  // Q = d33 × Force
  // d33 in pC/N, Force in N
  return (selectedMaterial.value.d33 * force.value) / 1000  // convert pC to nC
})

const electricField = computed(() => {
  // E = V / thickness (in kV/m)
  const thickness = selectedMaterial.value.thickness / 1000  // convert mm to m
  return (generatedVoltage.value / thickness) / 1000  // convert V/m to kV/m
})

const capacitance = computed(() => {
  // C = ε_r × ε_0 × Area / thickness
  // Assuming 1cm² area for calculation
  const area = 0.0001  // m² (1cm²)
  const thickness = selectedMaterial.value.thickness / 1000  // m
  const epsilon0 = 8.854e-12  // F/m
  const capacitance = (selectedMaterial.value.dielectricConstant * epsilon0 * area) / thickness
  return capacitance * 1e12  // convert F to pF
})

const outputCurrent = computed(() => {
  // I = V / R
  const current = generatedVoltage.value / loadResistance.value
  return current * 1000  // convert A to mA
})

const outputPower = computed(() => {
  // P = V² / R
  const power = (generatedVoltage.value * generatedVoltage.value) / loadResistance.value
  return power * 1000  // convert W to mW
})

const outputEnergy = computed(() => {
  // E = 0.5 × C × V²
  const capacitanceFarads = capacitance.value * 1e-12  // convert pF to F
  const energy = 0.5 * capacitanceFarads * generatedVoltage.value * generatedVoltage.value
  return energy * 1e6  // convert J to µJ
})

// SEO
useHead({
  title: 'Piezoelectric Effect Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive simulation of the piezoelectric effect. Learn how mechanical stress generates electricity in piezoelectric materials like PZT, quartz, and PVDF.' },
    { name: 'keywords', content: 'piezoelectric, piezo effect, crystal, voltage generation, energy harvesting, sensors' }
  ]
})
</script>

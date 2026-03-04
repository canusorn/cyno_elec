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
            — Colpitts Oscillator Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the classic LC oscillator with capacitive feedback. Visualize oscillation, frequency response, and the role of component values.
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          
          <!-- Circuit Diagram -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📡 Colpitts Oscillator Circuit
            </h3>
            
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 500" class="w-full max-w-4xl h-auto">
                <!-- Background -->
                <rect x="0" y="0" width="800" height="500" :fill="colorMode === 'dark' ? '#1f2937' : '#ffffff'" opacity="0"/>
                
                <!-- Title -->
                <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" :fill="colorMode === 'dark' ? '#e5e7eb' : '#374151'">
                  Colpitts Oscillator (Common Base Configuration)
                </text>

                <!-- VCC Line -->
                <line x1="100" y1="60" x2="700" y2="60" stroke="#dc2626" stroke-width="3"/>
                <text x="720" y="65" font-size="14" font-weight="bold" fill="#dc2626">+VCC</text>
                
                <!-- Ground Line -->
                <line x1="100" y1="440" x2="700" y2="440" stroke="#374151" stroke-width="3"/>
                <text x="720" y="445" font-size="14" font-weight="bold" fill="#374151">GND</text>

                <!-- RC (Collector Resistor) -->
                <rect x="380" y="60" width="40" height="60" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <text x="400" y="95" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">Rc</text>
                
                <!-- Transistor Q1 (NPN) -->
                <circle cx="400" cy="180" r="30" fill="#dbeafe" stroke="#1e40af" stroke-width="2"/>
                <text x="400" y="185" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e40af">Q1</text>
                <!-- Transistor symbol -->
                <line x1="370" y1="170" x2="370" y2="190" stroke="#1e40af" stroke-width="2"/> <!-- Base -->
                <line x1="370" y1="180" x2="400" y2="180" stroke="#1e40af" stroke-width="2"/>
                <line x1="400" y1="160" x2="400" y2="200" stroke="#1e40af" stroke-width="3"/> <!-- Vertical bar -->
                <line x1="400" y1="165" x2="430" y2="150" stroke="#1e40af" stroke-width="2"/> <!-- Collector -->
                <line x1="400" y1="195" x2="430" y2="210" stroke="#1e40af" stroke-width="2"/> <!-- Emitter -->
                <polygon points="430,150 425,158 435,154" fill="#1e40af" stroke="#1e40af" stroke-width="1"/>
                
                <!-- Inductor L (Tank Circuit) -->
                <defs>
                  <linearGradient id="coilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#10b981;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path d="M 400 210 Q 410 220 420 210 Q 430 200 440 210 Q 450 220 460 210 Q 470 200 480 210 Q 490 220 500 210 Q 510 200 520 210" 
                  fill="none" stroke="url(#coilGrad)" stroke-width="3"/>
                <text x="460" y="235" text-anchor="middle" font-size="14" font-weight="bold" fill="#059669">L</text>
                
                <!-- C1 (Feedback Capacitor) -->
                <rect x="520" y="200" width="30" height="40" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <line x1="528" y1="205" x2="528" y2="235" stroke="#92400e" stroke-width="2"/>
                <line x1="542" y1="205" x2="542" y2="235" stroke="#92400e" stroke-width="2"/>
                <text x="535" y="255" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">C1</text>
                
                <!-- C2 (Feedback Capacitor) -->
                <rect x="520" y="320" width="30" height="40" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <line x1="528" y1="325" x2="528" y2="355" stroke="#92400e" stroke-width="2"/>
                <line x1="542" y1="325" x2="542" y2="355" stroke="#92400e" stroke-width="2"/>
                <text x="535" y="375" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">C2</text>
                
                <!-- Connecting wires -->
                <!-- Collector to VCC -->
                <line x1="400" y1="120" x2="400" y2="150" stroke="#374151" stroke-width="2"/>
                
                <!-- Emitter to tank -->
                <line x1="430" y1="210" x2="400" y2="210" stroke="#374151" stroke-width="2"/>
                
                <!-- Tank to capacitors -->
                <line x1="520" y1="210" x2="535" y2="210" stroke="#374151" stroke-width="2"/>
                <line x1="535" y1="210" x2="535" y2="200" stroke="#374151" stroke-width="2"/>
                <line x1="535" y1="240" x2="535" y2="320" stroke="#374151" stroke-width="2"/>
                <line x1="535" y1="360" x2="535" y2="440" stroke="#374151" stroke-width="2"/>
                
                <!-- Base connection (RF ground through bypass cap) -->
                <line x1="370" y1="180" x2="250" y2="180" stroke="#374151" stroke-width="2"/>
                <rect x="235" y="170" width="30" height="20" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
                <text x="250" y="200" text-anchor="middle" font-size="10" fill="#1e40af">C_bypass</text>
                <line x1="250" y1="190" x2="250" y2="440" stroke="#374151" stroke-width="2"/>
                
                <!-- Output tap point -->
                <circle cx="535" cy="280" r="5" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
                <line x1="540" y1="280" x2="650" y2="280" stroke="#374151" stroke-width="2"/>
                <text x="660" y="285" font-size="12" fill="#374151">Output</text>

                <!-- Feedback indicator -->
                <g v-if="isOscillating">
                  <circle cx="535" cy="280" r="35" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" opacity="0.7">
                    <animate attributeName="r" values="35;45;35" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <text x="600" y="250" font-size="14" font-weight="bold" fill="#10b981">
                    OSCILLATING
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
                  </text>
                </g>

                <!-- Current flow animation -->
                <circle cx="0" cy="0" r="6" fill="#fbbf24">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 400 150 L 400 210 L 520 210 L 535 210 L 535 440 L 250 440 L 250 180 L 370 180"/>
                </circle>
              </svg>
            </div>

            <!-- Component Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <!-- Inductance -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Inductance (L): {{ formatInductance(inductance) }}
                </label>
                <input type="range" v-model.number="inductance" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500">
                <input type="number" v-model.number="inductance" min="1" max="100000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>

              <!-- C1 -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Capacitor C1: {{ formatCapacitance(capacitance1) }}
                </label>
                <input type="range" v-model.number="capacitance1" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500">
                <input type="number" v-model.number="capacitance1" min="1" max="100000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>

              <!-- C2 -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Capacitor C2: {{ formatCapacitance(capacitance2) }}
                </label>
                <input type="range" v-model.number="capacitance2" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500">
                <input type="number" v-model.number="capacitance2" min="1" max="100000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>

              <!-- Rc -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Load Resistor (Rc): {{ formatResistance(loadResistance) }}Ω
                </label>
                <input type="range" v-model.number="loadResistance" min="100" max="100000" step="100"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500">
                <input type="number" v-model.number="loadResistance" min="100" max="1000000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>
            </div>

            <!-- Quick Presets -->
            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <button v-for="preset in presets" :key="preset.name"
                @click="applyPreset(preset)"
                class="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- Oscillation Results -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              📊 Oscillation Analysis
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Frequency -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Oscillation Frequency</div>
                <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {{ formattedFrequency }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ oscillationFrequency.toFixed(2) }} Hz
                </div>
              </div>

              <!-- Feedback Ratio -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Feedback Ratio (β)</div>
                <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {{ feedbackRatio.toFixed(2) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  C2 / C1 = {{ feedbackRatio }}
                </div>
              </div>

              <!-- Status -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">Oscillation Status</div>
                <div class="text-2xl font-bold mb-2" :class="isOscillating ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ isOscillating ? '✓ ACTIVE' : '✗ NO OSCILLATION' }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ isOscillating ? 'Barkhausen criterion met' : 'Check component values' }}
                </div>
              </div>
            </div>

            <!-- Output Waveform -->
            <div class="mt-8">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Output Waveform ({{ formattedFrequency }})
              </h4>
              <div class="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-inner" style="height: 200px;">
                <svg viewBox="0 0 800 200" class="w-full h-full">
                  <!-- Grid -->
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" :stroke="colorMode === 'dark' ? '#374151' : '#e5e7eb'" stroke-width="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="200" fill="url(#grid)"/>
                  
                  <!-- Center line -->
                  <line x1="0" y1="100" x2="800" y2="100" :stroke="colorMode === 'dark' ? '#4b5563' : '#9ca3af'" stroke-width="1" stroke-dasharray="10,5"/>
                  
                  <!-- Sine wave -->
                  <path v-if="isOscillating" 
                    :d="generateWaveform()" 
                    fill="none" 
                    stroke="#10b981" 
                    stroke-width="3"
                    stroke-linecap="round"/>
                  
                  <!-- Amplitude indicator -->
                  <text x="10" y="25" font-size="12" :fill="colorMode === 'dark' ? '#e5e7eb' : '#374151'">
                    Amplitude: {{ amplitude.toFixed(2) }}V
                  </text>
                  <text x="10" y="190" font-size="12" :fill="colorMode === 'dark' ? '#e5e7eb' : '#374151'">
                    Period: {{ (1 / oscillationFrequency).toFixed(6) }}s
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Key Parameters -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Tank Circuit -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h4 class="text-lg font-bold text-blue-900 dark:text-blue-300 mb-4">⚡ Tank Circuit</h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-blue-700 dark:text-blue-400">Total Capacitance:</span>
                  <span class="font-semibold text-blue-900 dark:text-blue-300">{{ formatCapacitance(totalCapacitance) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-blue-700 dark:text-blue-400">Reactance (XL @ f₀):</span>
                  <span class="font-semibold text-blue-900 dark:text-blue-300">{{ formatInductance(inductiveReactance) }}Ω</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-blue-700 dark:text-blue-400">Reactance (XC @ f₀):</span>
                  <span class="font-semibold text-blue-900 dark:text-blue-300">{{ formatInductance(capacitiveReactance) }}Ω</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-blue-700 dark:text-blue-400">Q Factor (est.):</span>
                  <span class="font-semibold text-blue-900 dark:text-blue-300">{{ qFactor.toFixed(1) }}</span>
                </div>
              </div>
            </div>

            <!-- Design Requirements -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h4 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-4">📐 Design Requirements</h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-purple-700 dark:text-purple-400">Gain × Feedback ≥ 1:</span>
                  <span class="font-semibold" :class="loopGain >= 1 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ loopGain.toFixed(3) }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-purple-700 dark:text-purple-400">Required Transistor Gain:</span>
                  <span class="font-semibold text-purple-900 dark:text-purple-300">
                    hFE ≥ {{ requiredGain.toFixed(1) }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-purple-700 dark:text-purple-400">Frequency Stability:</span>
                  <span class="font-semibold text-purple-900 dark:text-purple-300">
                    {{ qFactor > 10 ? 'Excellent' : qFactor > 5 ? 'Good' : 'Fair' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-purple-700 dark:text-purple-400">Optimal C1:C2 Ratio:</span>
                  <span class="font-semibold text-purple-900 dark:text-purple-300">1:1 to 1:10</span>
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
            📚 Understanding Colpitts Oscillators
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Colpitts Oscillator?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Colpitts oscillator is a type of LC oscillator that uses a capacitive voltage divider 
              to provide feedback. It was invented by Edwin H. Colpitts in 1918 and remains one of the most 
              popular oscillator configurations due to its excellent frequency stability and simplicity.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>LC Tank Circuit:</strong> An inductor (L) in parallel with two capacitors (C1, C2) creates a resonant circuit</li>
              <li><strong>Capacitive Divider:</strong> C1 and C2 form a voltage divider that feeds back a portion of the output</li>
              <li><strong>Positive Feedback:</strong> The feedback signal is in-phase with the input, sustaining oscillation</li>
              <li><strong>Amplification:</strong> A transistor (BJT or FET) provides gain to overcome losses</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Oscillation Frequency:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              f₀ = 1 / (2π × √(L × C_total))
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where C_total is the series combination of C1 and C2:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              C_total = (C1 × C2) / (C1 + C2)
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Barkhausen Criterion:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For oscillation to occur, two conditions must be met:
            </p>
            <ol class="list-decimal pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Loop Gain ≥ 1:</strong> The amplifier gain must compensate for losses in the tank circuit</li>
              <li><strong>Phase Shift = 0° (or 360°):</strong> The feedback must be positive (in-phase)</li>
            </ol>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Feedback Ratio:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The feedback ratio is determined by the capacitor values:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              β = C2 / C1
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The transistor must have a gain (hFE) of at least C1/C2 for oscillation to start.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">✅ Advantages:</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Simple circuit topology</li>
                  <li>• Excellent frequency stability</li>
                  <li>• Easy to tune with varactor diodes</li>
                  <li>• Low phase noise</li>
                  <li>• Wide frequency range</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-bold text-orange-800 dark:text-orange-300 mb-2">⚠️ Considerations:</h4>
                <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>• Limited power output</li>
                  <li>• Requires high-Q tank circuit</li>
                  <li>• Startup condition critical</li>
                  <li>• Harmonics may be present</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>RF Oscillators:</strong> Local oscillators in radio receivers (500kHz - 500MHz)</li>
              <li><strong>Voltage-Controlled Oscillators (VCO):</strong> Using varactor diodes for frequency synthesis</li>
              <li><strong>Function Generators:</strong> Producing sine waves and other waveforms</li>
              <li><strong>Crystal Oscillators:</strong> Colpitts configuration with crystal for high stability</li>
              <li><strong>Medical Devices:</strong> Diathermy and electrosurgical equipment</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Hartley Oscillator:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Colpitts:</strong> Uses capacitive divider (C1, C2) for feedback. Better for high frequencies.
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>Hartley:</strong> Uses tapped inductor for feedback. Easier to tune but limited at high frequencies.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use NP0/C0G capacitors for the tank circuit (low drift, high stability)</li>
              <li>Air core inductors provide the highest Q factor</li>
              <li>Keep parasitic capacitance to minimum for accurate frequency</li>
              <li>Start with C1 = C2 for equal feedback, then adjust as needed</li>
              <li>For VCO applications, replace C1 or C2 with a varactor diode</li>
              <li>Add buffering to prevent loading the oscillator</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Design:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              To design a 1MHz Colpitts oscillator:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Choose L = 100μH (reasonable inductor value)</li>
              <li>Calculate required C_total = 253pF (from f₀ formula)</li>
              <li>Split into C1 = 500pF, C2 = 500pF (equal division)</li>
              <li>Transistor gain (hFE) must be ≥ 1 (easily met by most BJTs)</li>
              <li>Set Rc = 1kΩ to 10kΩ depending on desired output amplitude</li>
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
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Colpitts Oscillator Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Colpitts oscillator simulation. Learn about LC oscillators, feedback networks, and frequency generation with visualizations.' },
    { name: 'keywords', content: 'Colpitts oscillator, LC oscillator, RF circuit, feedback, frequency synthesis, tank circuit' }
  ]
})

const colorMode = useColorMode()

// Component values (in base units: H, F, Ω)
const inductance = ref(100) // μH
const capacitance1 = ref(1000) // pF
const capacitance2 = ref(1000) // pF
const loadResistance = ref(5000) // Ω

// Presets
const presets = [
  { name: 'AM Radio (1MHz)', l: 100, c1: 1000, c2: 1000, rc: 5000 },
  { name: 'FM Tuner (100MHz)', l: 1, c1: 100, c2: 100, rc: 1000 },
  { name: 'Function Gen (10kHz)', l: 10000, c1: 10000, c2: 10000, rc: 10000 },
  { name: 'RF Local Osc (10MHz)', l: 10, c1: 500, c2: 500, rc: 2000 }
]

const applyPreset = (preset: any) => {
  inductance.value = preset.l
  capacitance1.value = preset.c1
  capacitance2.value = preset.c2
  loadResistance.value = preset.rc
}

// Convert to base units
const lBase = computed(() => inductance.value * 1e-6) // H
const c1Base = computed(() => capacitance1.value * 1e-12) // F
const c2Base = computed(() => capacitance2.value * 1e-12) // F

// Total capacitance (series combination)
const totalCapacitance = computed(() => {
  return (c1Base.value * c2Base.value) / (c1Base.value + c2Base.value)
})

// Oscillation frequency
const oscillationFrequency = computed(() => {
  return 1 / (2 * Math.PI * Math.sqrt(lBase.value * totalCapacitance.value))
})

// Feedback ratio (C2/C1)
const feedbackRatio = computed(() => {
  return c2Base.value / c1Base.value
})

// Required gain for oscillation (1/β = C1/C2)
const requiredGain = computed(() => {
  return c1Base.value / c2Base.value
})

// Loop gain (assuming typical transistor gain of 100 for common-base)
const transistorGain = 100
const loopGain = computed(() => {
  return transistorGain / (c1Base.value / c2Base.value)
})

// Q factor estimate
const qFactor = computed(() => {
  const xl = 2 * Math.PI * oscillationFrequency.value * lBase.value
  return xl / loadResistance.value
})

// Reactance at resonance
const inductiveReactance = computed(() => {
  return 2 * Math.PI * oscillationFrequency.value * lBase.value
})

const capacitiveReactance = computed(() => {
  return 1 / (2 * Math.PI * oscillationFrequency.value * totalCapacitance.value)
})

// Oscillation status
const isOscillating = computed(() => {
  return loopGain.value >= 1
})

// Amplitude (for visualization)
const amplitude = computed(() => {
  if (!isOscillating.value) return 0
  return Math.min(10, 5 + qFactor.value * 0.5)
})

// Format functions
const formatInductance = (value: number): string => {
  if (value >= 1) return `${value.toFixed(2)} H`
  if (value >= 1e-3) return `${(value * 1000).toFixed(2)} mH`
  if (value >= 1e-6) return `${(value * 1000000).toFixed(2)} μH`
  return `${(value * 1000000000).toFixed(2)} nH`
}

const formatCapacitance = (value: number): string => {
  if (value >= 1) return `${value.toFixed(2)} F`
  if (value >= 1e-6) return `${(value * 1000000).toFixed(2)} μF`
  if (value >= 1e-9) return `${(value * 1000000000).toFixed(2)} nF`
  return `${(value * 1000000000000).toFixed(2)} pF`
}

const formatResistance = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)} M`
  if (value >= 1000) return `${(value / 1000).toFixed(2)} k`
  return `${value.toFixed(0)}`
}

const formattedFrequency = computed(() => {
  const freq = oscillationFrequency.value
  if (freq >= 1e9) return `${(freq / 1e9).toFixed(3)} GHz`
  if (freq >= 1e6) return `${(freq / 1e6).toFixed(3)} MHz`
  if (freq >= 1e3) return `${(freq / 1e3).toFixed(3)} kHz`
  return `${freq.toFixed(3)} Hz`
})

// Generate SVG waveform path
const generateWaveform = () => {
  if (!isOscillating.value) return ''
  
  const points = []
  const freq = oscillationFrequency.value
  const amp = amplitude.value * 8 // Scale for SVG
  const period = 1 / freq
  
  for (let x = 0; x <= 800; x += 2) {
    const t = (x / 800) * period * 4 // Show 4 cycles
    const y = 100 + amp * Math.sin(2 * Math.PI * freq * t)
    points.push(`${x},${y}`)
  }
  
  return `M ${points.join(' L ')}`
}
</script>

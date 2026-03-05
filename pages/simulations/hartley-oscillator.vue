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
            — Hartley Oscillator Simulator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the classic LC oscillator with inductive feedback. Visualize oscillation, frequency response, and the role of tapped inductors.
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
              📡 Hartley Oscillator Circuit
            </h3>
            
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 500" class="w-full max-w-4xl h-auto">
                <!-- Background -->
                <rect x="0" y="0" width="800" height="500" :fill="colorMode === 'dark' ? '#1f2937' : '#ffffff'" opacity="0"/>
                
                <!-- Title -->
                <text x="400" y="30" text-anchor="middle" font-size="16" font-weight="bold" :fill="colorMode === 'dark' ? '#e5e7eb' : '#374151'">
                  Hartley Oscillator (Common Emitter Configuration)
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
                
                <!-- Tapped Inductor (Tank Circuit) -->
                <defs>
                  <linearGradient id="coilGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#10b981;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                  </linearGradient>
                </defs>
                
                <!-- L1 (Upper section of tapped inductor) -->
                <path d="M 400 210 Q 410 220 420 210 Q 430 200 440 210 Q 450 220 460 210 Q 470 200 480 210 Q 490 220 500 210 Q 510 200 515 210" 
                  fill="none" stroke="url(#coilGrad2)" stroke-width="3"/>
                <text x="460" y="235" text-anchor="middle" font-size="12" font-weight="bold" fill="#059669">L1</text>
                
                <!-- Tap point -->
                <circle cx="515" cy="210" r="4" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
                
                <!-- L2 (Lower section of tapped inductor) -->
                <path d="M 515 210 Q 520 220 525 230 Q 530 240 535 230 Q 540 220 545 230 Q 550 240 555 230 Q 560 220 565 230 Q 570 240 575 230 Q 580 220 585 230" 
                  fill="none" stroke="url(#coilGrad2)" stroke-width="3"/>
                <text x="550" y="255" text-anchor="middle" font-size="12" font-weight="bold" fill="#059669">L2</text>
                
                <!-- Capacitor C (Tank Circuit) -->
                <rect x="520" y="320" width="30" height="40" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
                <line x1="528" y1="325" x2="528" y2="355" stroke="#92400e" stroke-width="2"/>
                <line x1="542" y1="325" x2="542" y2="355" stroke="#92400e" stroke-width="2"/>
                <text x="535" y="375" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">C</text>
                
                <!-- Connecting wires -->
                <!-- Collector to VCC -->
                <line x1="400" y1="120" x2="400" y2="150" stroke="#374151" stroke-width="2"/>
                
                <!-- Emitter to tank -->
                <line x1="430" y1="210" x2="400" y2="210" stroke="#374151" stroke-width="2"/>
                
                <!-- Tank to capacitors -->
                <line x1="515" y1="210" x2="535" y2="210" stroke="#374151" stroke-width="2"/>
                <line x1="535" y1="210" x2="535" y2="230" stroke="#374151" stroke-width="2"/>
                <line x1="535" y1="360" x2="535" y2="440" stroke="#374151" stroke-width="2"/>
                
                <!-- Inductor continuation -->
                <line x1="585" y1="230" x2="620" y2="230" stroke="#374151" stroke-width="2"/>
                <line x1="620" y1="230" x2="620" y2="320" stroke="#374151" stroke-width="2"/>
                <line x1="620" y1="320" x2="550" y2="320" stroke="#374151" stroke-width="2"/>
                
                <!-- Base connection (RF ground through bypass cap) -->
                <line x1="370" y1="180" x2="250" y2="180" stroke="#374151" stroke-width="2"/>
                <rect x="235" y="170" width="30" height="20" fill="#bfdbfe" stroke="#1e40af" stroke-width="2"/>
                <text x="250" y="200" text-anchor="middle" font-size="10" fill="#1e40af">C_bypass</text>
                <line x1="250" y1="190" x2="250" y2="440" stroke="#374151" stroke-width="2"/>
                
                <!-- Output tap point -->
                <circle cx="535" cy="275" r="5" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
                <line x1="540" y1="275" x2="680" y2="275" stroke="#374151" stroke-width="2"/>
                <text x="690" y="280" font-size="12" fill="#374151">Output</text>

                <!-- Feedback indicator -->
                <g v-if="isOscillating">
                  <circle cx="535" cy="275" r="35" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" opacity="0.7">
                    <animate attributeName="r" values="35;45;35" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <text x="600" y="245" font-size="14" font-weight="bold" fill="#10b981">
                    OSCILLATING
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
                  </text>
                </g>

                <!-- Current flow animation -->
                <circle cx="0" cy="0" r="6" fill="#fbbf24">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M 400 150 L 400 210 L 515 210 L 535 210 L 535 320 L 620 320 L 620 230 L 585 230 L 535 230 L 535 360 L 535 440 L 250 440 L 250 180 L 370 180"/>
                </circle>
              </svg>
            </div>

            <!-- Component Controls -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <!-- L1 -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Inductor L1: {{ formatInductance(inductance1) }}
                </label>
                <input type="range" v-model.number="inductance1" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500">
                <input type="number" v-model.number="inductance1" min="1" max="100000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>

              <!-- L2 -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Inductor L2: {{ formatInductance(inductance2) }}
                </label>
                <input type="range" v-model.number="inductance2" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500">
                <input type="number" v-model.number="inductance2" min="1" max="100000"
                  class="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              </div>

              <!-- C -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Capacitor C: {{ formatCapacitance(capacitance) }}
                </label>
                <input type="range" v-model.number="capacitance" min="1" max="10000" step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500">
                <input type="number" v-model.number="capacitance" min="1" max="100000"
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
                  L1 / L2 = {{ feedbackRatio }}
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
                    <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" :stroke="colorMode === 'dark' ? '#374151' : '#e5e7eb'" stroke-width="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="200" fill="url(#grid2)"/>
                  
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
                  <span class="text-blue-700 dark:text-blue-400">Total Inductance:</span>
                  <span class="font-semibold text-blue-900 dark:text-blue-300">{{ formatInductance(totalInductance) }}</span>
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
                  <span class="text-purple-700 dark:text-purple-400">Optimal L1:L2 Ratio:</span>
                  <span class="font-semibold text-purple-900 dark:text-purple-300">1:1 to 10:1</span>
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
            📚 Understanding Hartley Oscillators
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Hartley Oscillator?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The Hartley oscillator is a type of LC oscillator that uses a tapped inductor to provide feedback. 
              It was invented by Ralph Hartley in 1915 and is known for its excellent frequency stability and ease of tuning.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How It Works:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>LC Tank Circuit:</strong> A tapped inductor (L1 + L2) in parallel with a capacitor (C) creates resonance</li>
              <li><strong>Inductive Tapping:</strong> The tap point divides the inductor, creating an inductive voltage divider</li>
              <li><strong>Positive Feedback:</strong> A portion of the output is fed back through the tap to sustain oscillation</li>
              <li><strong>Amplification:</strong> A transistor (BJT or FET) provides gain to overcome losses</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Oscillation Frequency:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              f₀ = 1 / (2π × √(L_total × C))
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where L_total is the sum of L1 and L2 (assuming mutual inductance is negligible):
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              L_total = L1 + L2
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
              The feedback ratio is determined by the inductor tap ratio:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4 text-center">
              β = L1 / L2
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The transistor must have sufficient gain to satisfy the oscillation condition. The feedback ratio determines how much of the output signal is fed back to the input.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">✅ Advantages:</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Easy to tune (single capacitor)</li>
                  <li>• Good frequency stability</li>
                  <li>• Wide frequency range</li>
                  <li>• Simple to implement</li>
                  <li>• Can use variable inductors</li>
                </ul>
              </div>
              <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 class="font-bold text-orange-800 dark:text-orange-300 mb-2">⚠️ Considerations:</h4>
                <ul class="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>• Mutual inductance effects</li>
                  <li>• Limited at high frequencies</li>
                  <li>• Inductor coupling critical</li>
                  <li>• Harmonics may be present</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>RF Oscillators:</strong> Local oscillators in radio receivers (100kHz - 100MHz)</li>
              <li><strong>Function Generators:</strong> Producing sine waves and other waveforms</li>
              <li><strong>Injectors:</strong> Test and measurement equipment</li>
              <li><strong>AM Transmitters:</strong> Carrier wave generation</li>
              <li><strong>Metal Detectors:</strong> Frequency-shift detection</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Comparison with Colpitts Oscillator:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Hartley:</strong> Uses tapped inductor (L1, L2) for feedback. Easier to tune with a single capacitor. Better for lower frequencies.
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <strong>Colpitts:</strong> Uses capacitive divider (C1, C2) for feedback. Better frequency stability at high frequencies. Uses two capacitors.
              </p>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Practical Tips:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Use air core inductors for the highest Q factor</li>
              <li>Minimize parasitic capacitance for accurate frequency</li>
              <li>Keep inductor coupling tight for best feedback</li>
              <li>Start with L1 = L2 for equal feedback, then adjust as needed</li>
              <li>For variable frequency, use a variable capacitor in the tank</li>
              <li>Add buffering to prevent loading the oscillator</li>
              <li>Shield the inductor to prevent unwanted coupling</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Example Design:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              To design a 1MHz Hartley oscillator:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Choose L_total = 100μH (split into L1 = 50μH, L2 = 50μH)</li>
              <li>Calculate required C = 253pF (from f₀ formula)</li>
              <li>Feedback ratio β = L1/L2 = 1 (equal split)</li>
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
  title: 'Hartley Oscillator Simulator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive Hartley oscillator simulation. Learn about LC oscillators with tapped inductors, feedback networks, and frequency generation with visualizations.' },
    { name: 'keywords', content: 'Hartley oscillator, LC oscillator, RF circuit, feedback, frequency synthesis, tank circuit, tapped inductor' }
  ]
})

const colorMode = useColorMode()

// Component values (in base units: H, F, Ω)
const inductance1 = ref(50) // μH
const inductance2 = ref(50) // μH
const capacitance = ref(253) // pF
const loadResistance = ref(5000) // Ω

// Presets
const presets = [
  { name: 'AM Radio (1MHz)', l1: 50, l2: 50, c: 253, rc: 5000 },
  { name: 'RF Osc (10MHz)', l1: 5, l2: 5, c: 50, rc: 2000 },
  { name: 'LF Generator (100kHz)', l1: 500, l2: 500, c: 5000, rc: 10000 },
  { name: 'VHF Tuner (50MHz)', l1: 1, l2: 1, c: 20, rc: 1000 }
]

const applyPreset = (preset: any) => {
  inductance1.value = preset.l1
  inductance2.value = preset.l2
  capacitance.value = preset.c
  loadResistance.value = preset.rc
}

// Convert to base units
const l1Base = computed(() => inductance1.value * 1e-6) // H
const l2Base = computed(() => inductance2.value * 1e-6) // H
const cBase = computed(() => capacitance.value * 1e-12) // F

// Total inductance (sum of L1 and L2)
const totalInductance = computed(() => {
  return l1Base.value + l2Base.value
})

// Oscillation frequency
const oscillationFrequency = computed(() => {
  return 1 / (2 * Math.PI * Math.sqrt(totalInductance.value * cBase.value))
})

// Feedback ratio (L1/L2)
const feedbackRatio = computed(() => {
  return l1Base.value / l2Base.value
})

// Required gain for oscillation
const requiredGain = computed(() => {
  return l2Base.value / l1Base.value
})

// Loop gain (assuming typical transistor gain)
const transistorGain = 100
const loopGain = computed(() => {
  return transistorGain * (l1Base.value / l2Base.value)
})

// Q factor estimate
const qFactor = computed(() => {
  const xl = 2 * Math.PI * oscillationFrequency.value * totalInductance.value
  return xl / loadResistance.value
})

// Reactance at resonance
const inductiveReactance = computed(() => {
  return 2 * Math.PI * oscillationFrequency.value * totalInductance.value
})

const capacitiveReactance = computed(() => {
  return 1 / (2 * Math.PI * oscillationFrequency.value * cBase.value)
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

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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Nodal Analysis Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Solve electrical circuits using nodal analysis method with interactive circuit diagrams
          </p>

          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-center text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">G</span> × <span class="text-primary-highlight">V</span> = <span class="text-primary-highlight">I</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Conductance Matrix × Node Voltages = Current Vector</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Circuit Type Selection -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🔧 Circuit Configuration
          </h3>

          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <button
              @click="circuitType = '2node'"
              :class="circuitType === '2node' ? 'ring-4 ring-primary-highlight bg-primary/10' : 'bg-gray-100 dark:bg-gray-700'"
              class="p-4 rounded-xl transition-all"
            >
              <div class="text-3xl mb-2">📍</div>
              <div class="font-semibold text-gray-900 dark:text-white">2-Node Circuit</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Simple parallel network</div>
            </button>

            <button
              @click="circuitType = '3node'"
              :class="circuitType === '3node' ? 'ring-4 ring-primary-highlight bg-primary/10' : 'bg-gray-100 dark:bg-gray-700'"
              class="p-4 rounded-xl transition-all"
            >
              <div class="text-3xl mb-2">🔗</div>
              <div class="font-semibold text-gray-900 dark:text-white">3-Node Circuit</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">T-network topology</div>
            </button>

            <button
              @click="circuitType = 'bridge'"
              :class="circuitType === 'bridge' ? 'ring-4 ring-primary-highlight bg-primary/10' : 'bg-gray-100 dark:bg-gray-700'"
              class="p-4 rounded-xl transition-all"
            >
              <div class="text-3xl mb-2">🌉</div>
              <div class="font-semibold text-gray-900 dark:text-white">Bridge Circuit</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Wheatstone bridge</div>
            </button>
          </div>

          <!-- Two-Node Circuit -->
          <div v-if="circuitType === '2node'" class="space-y-6">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Two-Node Parallel Circuit</h4>
            
            <!-- SVG Diagram -->
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Title -->
                <text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="white">
                  Two-Node Circuit
                </text>

                <!-- Top node line -->
                <line x1="100" y1="120" x2="700" y2="120" stroke="#6B7280" stroke-width="4"/>
                <text x="50" y="125" text-anchor="middle" font-size="16" font-weight="bold" fill="#FBBF24">Node 1</text>

                <!-- Bottom node line (ground) -->
                <line x1="100" y1="280" x2="700" y2="280" stroke="#6B7280" stroke-width="4"/>
                <text x="50" y="285" text-anchor="middle" font-size="16" font-weight="bold" fill="#10B981">GND</text>

                <!-- Current Source -->
                <g transform="translate(200, 200)">
                  <circle cx="0" cy="0" r="40" fill="white" stroke="#3B82F6" stroke-width="3"/>
                  <line x1="0" y1="-35" x2="0" y2="-15" stroke="#3B82F6" stroke-width="3"/>
                  <polygon points="0,-15 -8,-25 8,-25" fill="#3B82F6"/>
                  <text x="0" y="10" text-anchor="middle" font-size="16" font-weight="bold" fill="#3B82F6">{{ iSource }}A</text>
                  <line x1="0" y1="-80" x2="0" y2="-40" stroke="#6B7280" stroke-width="3"/>
                  <line x1="0" y1="40" x2="0" y2="80" stroke="#6B7280" stroke-width="3"/>
                </g>

                <!-- Resistor R1 -->
                <g transform="translate(350, 200)">
                  <path d="M 0 -80 L 0 -60 L 10 -50 L -10 -40 L 10 -30 L -10 -20 L 10 -10 L 0 0 L 0 20" 
                    fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="30" y="-30" font-size="14" font-weight="bold" fill="#EF4444">R1: {{ r1 }}Ω</text>
                </g>

                <!-- Resistor R2 -->
                <g transform="translate(480, 200)">
                  <path d="M 0 -80 L 0 -60 L 10 -50 L -10 -40 L 10 -30 L -10 -20 L 10 -10 L 0 0 L 0 20" 
                    fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="30" y="-30" font-size="14" font-weight="bold" fill="#10B981">R2: {{ r2 }}Ω</text>
                </g>

                <!-- Resistor R3 -->
                <g transform="translate(610, 200)">
                  <path d="M 0 -80 L 0 -60 L 10 -50 L -10 -40 L 10 -30 L -10 -20 L 10 -10 L 0 0 L 0 20" 
                    fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="30" y="-30" font-size="14" font-weight="bold" fill="#8B5CF6">R3: {{ r3 }}Ω</text>
                </g>

                <!-- Node voltage label -->
                <text x="400" y="100" text-anchor="middle" font-size="14" font-weight="bold" fill="#FBBF24">
                  V₁ = {{ nodeVoltage1 }}V
                </text>
              </svg>
            </div>

            <!-- Component Values -->
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Source (A)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="iSource"
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="iSource"
                      type="number"
                      step="0.5"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R1 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r1"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r1"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R2 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r2"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r2"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R3 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r3"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r3"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Three-Node Circuit -->
          <div v-if="circuitType === '3node'" class="space-y-6">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Three-Node T-Network</h4>
            
            <!-- SVG Diagram -->
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 450" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Title -->
                <text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="white">
                  Three-Node Circuit
                </text>

                <!-- Node 1 (top left) -->
                <circle cx="200" cy="120" r="25" fill="#FBBF24" stroke="#F59E0B" stroke-width="3"/>
                <text x="200" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="black">V₁</text>
                <text x="200" y="80" text-anchor="middle" font-size="12" fill="#FBBF24">{{ nodeVoltage1 }}V</text>

                <!-- Node 2 (top right) -->
                <circle cx="600" cy="120" r="25" fill="#3B82F6" stroke="#2563EB" stroke-width="3"/>
                <text x="600" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="white">V₂</text>
                <text x="600" y="80" text-anchor="middle" font-size="12" fill="#3B82F6">{{ nodeVoltage2 }}V</text>

                <!-- Ground node (bottom center) -->
                <circle cx="400" cy="350" r="25" fill="#10B981" stroke="#059669" stroke-width="3"/>
                <text x="400" y="355" text-anchor="middle" font-size="14" font-weight="bold" fill="white">GND</text>
                <text x="400" y="395" text-anchor="middle" font-size="12" fill="#10B981">0V</text>

                <!-- R1 between Node 1 and GND -->
                <line x1="200" y1="145" x2="200" y2="200" stroke="#6B7280" stroke-width="3"/>
                <g transform="translate(200, 240)">
                  <path d="M 0 -30 L 0 -20 L 8 -15 L -8 -10 L 8 -5 L -8 0 L 8 5 L -8 10 L 8 15 L 0 20 L 0 30" 
                    fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="25" y="5" font-size="12" font-weight="bold" fill="#EF4444">R1:{{ r1 }}Ω</text>
                </g>
                <line x1="200" y1="270" x2="200" y2="320" stroke="#6B7280" stroke-width="3"/>

                <!-- R2 between Node 2 and GND -->
                <line x1="600" y1="145" x2="600" y2="200" stroke="#6B7280" stroke-width="3"/>
                <g transform="translate(600, 240)">
                  <path d="M 0 -30 L 0 -20 L 8 -15 L -8 -10 L 8 -5 L -8 0 L 8 5 L -8 10 L 8 15 L 0 20 L 0 30" 
                    fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="25" y="5" font-size="12" font-weight="bold" fill="#10B981">R2:{{ r2 }}Ω</text>
                </g>
                <line x1="600" y1="270" x2="600" y2="320" stroke="#6B7280" stroke-width="3"/>

                <!-- R3 between Node 1 and Node 2 -->
                <line x1="225" y1="120" x2="350" y2="120" stroke="#6B7280" stroke-width="3"/>
                <g transform="translate(400, 120)">
                  <path d="M -40 0 L -30 0 L -25 -8 L -20 8 L -15 -8 L -10 8 L -5 -8 L 0 0 L 30 0" 
                    fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="0" y="-15" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">R3:{{ r3 }}Ω</text>
                </g>
                <line x1="450" y1="120" x2="575" y2="120" stroke="#6B7280" stroke-width="3"/>

                <!-- Current source I1 into Node 1 -->
                <g transform="translate(100, 120)">
                  <circle cx="0" cy="0" r="30" fill="white" stroke="#3B82F6" stroke-width="2"/>
                  <line x1="0" y1="-20" x2="0" y2="-10" stroke="#3B82F6" stroke-width="2"/>
                  <polygon points="0,-10 -5,-18 5,-18" fill="#3B82F6"/>
                  <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#3B82F6">{{ i1 }}A</text>
                </g>
                <line x1="130" y1="120" x2="175" y2="120" stroke="#6B7280" stroke-width="3"/>

                <!-- Current source I2 into Node 2 -->
                <g transform="translate(700, 120)">
                  <circle cx="0" cy="0" r="30" fill="white" stroke="#10B981" stroke-width="2"/>
                  <line x1="0" y1="-20" x2="0" y2="-10" stroke="#10B981" stroke-width="2"/>
                  <polygon points="0,-10 -5,-18 5,-18" fill="#10B981"/>
                  <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">{{ i2 }}A</text>
                </g>
                <line x1="670" y1="120" x2="625" y2="120" stroke="#6B7280" stroke-width="3"/>

                <!-- Ground connections -->
                <line x1="200" y1="320" x2="200" y2="335" stroke="#6B7280" stroke-width="3"/>
                <line x1="200" y1="335" x2="375" y2="335" stroke="#6B7280" stroke-width="3"/>
                <line x1="600" y1="335" x2="425" y2="335" stroke="#6B7280" stroke-width="3"/>
                <line x1="600" y1="320" x2="600" y2="335" stroke="#6B7280" stroke-width="3"/>
              </svg>
            </div>

            <!-- Component Values -->
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Source I1 (A)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="i1"
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="i1"
                      type="number"
                      step="0.5"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Source I2 (A)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="i2"
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="i2"
                      type="number"
                      step="0.5"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R1 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r1"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r1"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R2 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r2"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r2"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    R3 (Ω)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="r3"
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="r3"
                      type="number"
                      min="1"
                      max="100"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bridge Circuit -->
          <div v-if="circuitType === 'bridge'" class="space-y-6">
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Wheatstone Bridge</h4>
            
            <!-- SVG Diagram -->
            <div class="flex justify-center mb-6">
              <svg viewBox="0 0 800 450" class="w-full max-w-4xl h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                <!-- Title -->
                <text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="white">
                  Wheatstone Bridge Circuit
                </text>

                <!-- Diamond shape nodes -->
                <!-- Top node (A) -->
                <circle cx="400" cy="80" r="25" fill="#FBBF24" stroke="#F59E0B" stroke-width="3"/>
                <text x="400" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="black">A</text>
                <text x="400" y="45" text-anchor="middle" font-size="12" fill="#FBBF24">{{ nodeVoltage1 }}V</text>

                <!-- Left node (B) -->
                <circle cx="200" cy="220" r="25" fill="#3B82F6" stroke="#2563EB" stroke-width="3"/>
                <text x="200" y="225" text-anchor="middle" font-size="14" font-weight="bold" fill="white">B</text>
                <text x="150" y="225" text-anchor="middle" font-size="12" fill="#3B82F6">{{ nodeVoltage2 }}V</text>

                <!-- Right node (C) -->
                <circle cx="600" cy="220" r="25" fill="#10B981" stroke="#059669" stroke-width="3"/>
                <text x="600" y="225" text-anchor="middle" font-size="14" font-weight="bold" fill="white">C</text>
                <text x="650" y="225" text-anchor="middle" font-size="12" fill="#10B981">{{ nodeVoltage3 }}V</text>

                <!-- Bottom node (D - GND) -->
                <circle cx="400" cy="360" r="25" fill="#6B7280" stroke="#4B5563" stroke-width="3"/>
                <text x="400" y="365" text-anchor="middle" font-size="14" font-weight="bold" fill="white">D</text>
                <text x="400" y="400" text-anchor="middle" font-size="12" fill="#6B7280">GND (0V)</text>

                <!-- R1 (top left) -->
                <g transform="translate(280, 140)">
                  <path d="M 0 0 L 10 5 L -10 15 L 10 25 L -10 35 L 10 45 L 0 50" 
                    fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-35)"/>
                  <text x="-40" y="20" font-size="12" font-weight="bold" fill="#EF4444">R1:{{ r1 }}Ω</text>
                </g>

                <!-- R2 (top right) -->
                <g transform="translate(520, 140)">
                  <path d="M 0 0 L 10 5 L -10 15 L 10 25 L -10 35 L 10 45 L 0 50" 
                    fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(35)"/>
                  <text x="30" y="20" font-size="12" font-weight="bold" fill="#10B981">R2:{{ r2 }}Ω</text>
                </g>

                <!-- R3 (bottom left) -->
                <g transform="translate(280, 300)">
                  <path d="M 0 0 L 10 5 L -10 15 L 10 25 L -10 35 L 10 45 L 0 50" 
                    fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(35)"/>
                  <text x="-40" y="20" font-size="12" font-weight="bold" fill="#3B82F6">R3:{{ r3 }}Ω</text>
                </g>

                <!-- R4 (bottom right) -->
                <g transform="translate(520, 300)">
                  <path d="M 0 0 L 10 5 L -10 15 L 10 25 L -10 35 L 10 45 L 0 50" 
                    fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-35)"/>
                  <text x="30" y="20" font-size="12" font-weight="bold" fill="#8B5CF6">R4:{{ r4 }}Ω</text>
                </g>

                <!-- R5 (bridge - middle) -->
                <g transform="translate(400, 220)">
                  <path d="M -80 0 L -70 0 L -65 -8 L -60 8 L -55 -8 L -50 8 L -45 -8 L -40 0 L -10 0" 
                    fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M 10 0 L 40 0 L 45 -8 L 50 8 L 55 -8 L 60 8 L 65 -8 L 70 0 L 80 0" 
                    fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="0" y="-15" text-anchor="middle" font-size="12" font-weight="bold" fill="#F59E0B">R5:{{ r5 }}Ω</text>
                </g>

                <!-- Voltage source at top -->
                <g transform="translate(400, 0)">
                  <circle cx="0" cy="0" r="25" fill="white" stroke="#EF4444" stroke-width="2"/>
                  <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#EF4444" stroke-width="2"/>
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="#EF4444" stroke-width="2"/>
                  <line x1="-12" y1="8" x2="12" y2="8" stroke="#EF4444" stroke-width="2"/>
                  <text x="40" y="5" font-size="12" font-weight="bold" fill="#EF4444">{{ vSource }}V</text>
                </g>
                <line x1="400" y1="25" x2="400" y2="55" stroke="#6B7280" stroke-width="3"/>

                <!-- Connection lines -->
                <line x1="375" y1="92" x2="215" y2="205" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="425" y1="92" x2="585" y2="205" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="220" y1="240" x2="380" y2="345" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="580" y1="240" x2="420" y2="345" stroke="#6B7280" stroke-width="2" stroke-dasharray="5,5"/>
                <line x1="225" y1="220" x2="310" y2="220" stroke="#6B7280" stroke-width="3"/>
                <line x1="490" y1="220" x2="575" y2="220" stroke="#6B7280" stroke-width="3"/>
              </svg>
            </div>

            <!-- Component Values -->
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Voltage Source (V)
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model.number="vSource"
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      v-model.number="vSource"
                      type="number"
                      min="1"
                      max="50"
                      class="w-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      R1 (Ω)
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model.number="r1"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        v-model.number="r1"
                        type="number"
                        min="1"
                        max="100"
                        class="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-center text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      R2 (Ω)
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model.number="r2"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        v-model.number="r2"
                        type="number"
                        min="1"
                        max="100"
                        class="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      R3 (Ω)
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model.number="r3"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        v-model.number="r3"
                        type="number"
                        min="1"
                        max="100"
                        class="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      R4 (Ω)
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model.number="r4"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        v-model.number="r4"
                        type="number"
                        min="1"
                        max="100"
                        class="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>

                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      R5 - Bridge (Ω)
                    </label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model.number="r5"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        v-model.number="r5"
                        type="number"
                        min="1"
                        max="100"
                        class="w-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bridge Balance</h4>
                <div class="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/30">
                  <p class="text-gray-300 text-sm mb-3">A Wheatstone bridge is balanced when:</p>
                  <div class="bg-gray-900 rounded p-3 font-mono text-sm text-center text-yellow-400 mb-3">
                    R1/R2 = R3/R4
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Left Ratio (R1/R2):</span>
                      <span class="text-white font-mono">{{ (r1/r2).toFixed(3) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Right Ratio (R3/R4):</span>
                      <span class="text-white font-mono">{{ (r3/r4).toFixed(3) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-400">Bridge Status:</span>
                      <span :class="isBalanced ? 'text-green-400' : 'text-red-400'" class="font-mono">
                        {{ isBalanced ? 'BALANCED ✓' : 'UNBALANCED' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📊 Analysis Results
          </h3>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Node Voltages -->
            <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-5 border border-blue-500/30">
              <h4 class="text-lg font-semibold text-blue-400 mb-4">Node Voltages</h4>
              <div class="space-y-3">
                <div v-if="circuitType !== '2node'" class="flex justify-between items-center">
                  <span class="text-gray-300">Node A (V₁):</span>
                  <span class="text-white font-mono text-xl">{{ nodeVoltage1 }} V</span>
                </div>
                <div v-if="circuitType !== '2node'" class="flex justify-between items-center">
                  <span class="text-gray-300">Node B (V₂):</span>
                  <span class="text-white font-mono text-xl">{{ nodeVoltage2 }} V</span>
                </div>
                <div v-if="circuitType === 'bridge'" class="flex justify-between items-center">
                  <span class="text-gray-300">Node C (V₃):</span>
                  <span class="text-white font-mono text-xl">{{ nodeVoltage3 }} V</span>
                </div>
                <div v-if="circuitType === '2node'" class="flex justify-between items-center">
                  <span class="text-gray-300">Node 1 (V₁):</span>
                  <span class="text-white font-mono text-xl">{{ nodeVoltage1 }} V</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">Ground:</span>
                  <span class="text-white font-mono text-xl">0.00 V</span>
                </div>
              </div>
            </div>

            <!-- Branch Currents -->
            <div class="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-5 border border-green-500/30">
              <h4 class="text-lg font-semibold text-green-400 mb-4">Branch Currents</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">I_R1:</span>
                  <span class="text-white font-mono text-xl">{{ iR1 }} A</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">I_R2:</span>
                  <span class="text-white font-mono text-xl">{{ iR2 }} A</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType !== '2node'">
                  <span class="text-gray-300">I_R3:</span>
                  <span class="text-white font-mono text-xl">{{ iR3 }} A</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType === 'bridge'">
                  <span class="text-gray-300">I_R4:</span>
                  <span class="text-white font-mono text-xl">{{ iR4 }} A</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType === 'bridge'">
                  <span class="text-gray-300">I_R5 (Bridge):</span>
                  <span class="text-white font-mono text-xl">{{ iR5 }} A</span>
                </div>
              </div>
            </div>

            <!-- Power Dissipation -->
            <div class="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-5 border border-purple-500/30">
              <h4 class="text-lg font-semibold text-purple-400 mb-4">Power Dissipation</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">P_R1:</span>
                  <span class="text-white font-mono text-xl">{{ pR1 }} W</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">P_R2:</span>
                  <span class="text-white font-mono text-xl">{{ pR2 }} W</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType !== '2node'">
                  <span class="text-gray-300">P_R3:</span>
                  <span class="text-white font-mono text-xl">{{ pR3 }} W</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType === 'bridge'">
                  <span class="text-gray-300">P_R4:</span>
                  <span class="text-white font-mono text-xl">{{ pR4 }} W</span>
                </div>
                <div class="flex justify-between items-center font-semibold border-t border-purple-500/30 pt-2 mt-3">
                  <span class="text-gray-300">Total Power:</span>
                  <span class="text-yellow-400 font-mono text-xl">{{ totalPower }} W</span>
                </div>
              </div>
            </div>

            <!-- Equivalent Resistance -->
            <div class="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-5 border border-yellow-500/30">
              <h4 class="text-lg font-semibold text-yellow-400 mb-4">Circuit Summary</h4>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">Total Current:</span>
                  <span class="text-white font-mono text-xl">{{ totalCurrent }} A</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-300">Req (seen by source):</span>
                  <span class="text-white font-mono text-xl">{{ req }} Ω</span>
                </div>
                <div class="flex justify-between items-center" v-if="circuitType === 'bridge'">
                  <span class="text-gray-300">Bridge Voltage:</span>
                  <span class="text-white font-mono text-xl">{{ bridgeVoltage }} V</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Solution -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📝 Step-by-Step Solution
          </h3>

          <div class="space-y-4">
            <!-- Step 1 -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-primary-highlight mb-3">Step 1: Identify Nodes</h4>
              <p class="text-gray-700 dark:text-gray-300">
                {{ nodeDescription }}
              </p>
            </div>

            <!-- Step 2 -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-primary-highlight mb-3">Step 2: Write KCL Equations</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-3">
                Apply Kirchhoff's Current Law at each non-reference node (sum of currents leaving = 0):
              </p>
              <div class="bg-gray-800 dark:bg-gray-950 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                <pre class="text-green-400">{{ kclEquations }}</pre>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-primary-highlight mb-3">Step 3: Form Conductance Matrix</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-3">
                Convert to matrix form [G][V] = [I]:
              </p>
              <div class="bg-gray-800 dark:bg-gray-950 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                <pre class="text-yellow-400">{{ matrixForm }}</pre>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <h4 class="text-lg font-semibold text-primary-highlight mb-3">Step 4: Solve for Node Voltages</h4>
              <p class="text-gray-700 dark:text-gray-300">
                {{ solutionMethod }}
              </p>
            </div>
          </div>
        </div>

        <!-- Educational Content -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mt-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Nodal Analysis
          </h3>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-yellow-400 mb-3">Key Concepts</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-primary-highlight">•</span>
                  <span><strong>Reference Node:</strong> Choose one node as ground (0V). All other voltages are measured relative to this node.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-highlight">•</span>
                  <span><strong>KCL at Nodes:</strong> Sum of currents leaving each node = 0. Use conductance (G=1/R) for easier calculations.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-highlight">•</span>
                  <span><strong>Matrix Form:</strong> Systems of equations can be written as [G][V]=[I] and solved using matrix methods.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary-highlight">•</span>
                  <span><strong>Supernodes:</strong> When a voltage source connects two non-reference nodes, treat them as a supernode.</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-yellow-400 mb-3">When to Use Nodal Analysis</h4>
              <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                <li class="flex items-start gap-2">
                  <span class="text-green-400">✓</span>
                  <span>Circuits with many parallel branches</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">✓</span>
                  <span>Current sources (easier than mesh analysis)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">✓</span>
                  <span>Circuits with few nodes than loops</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-400">✓</span>
                  <span>Electronic circuits with multiple grounds</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-500/20">
            <h4 class="text-yellow-400 font-medium mb-2">💡 Pro Tips</h4>
            <ul class="text-gray-700 dark:text-gray-300 text-sm space-y-1">
              <li>• Always redraw the circuit with nodes clearly marked before starting</li>
              <li>• Use conductances (G=1/R) instead of resistances for simpler math</li>
              <li>• For voltage sources, use supernodes or source transformation</li>
              <li>• Verify your solution by checking KCL at each node</li>
              <li>• Computer solvers (like SPICE) use nodal analysis internally</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Circuit type
const circuitType = ref('2node')

// Component values
const iSource = ref(5)
const i1 = ref(3)
const i2 = ref(2)
const vSource = ref(12)
const r1 = ref(10)
const r2 = ref(20)
const r3 = ref(30)
const r4 = ref(40)
const r5 = ref(50)

// Computed node voltages
const nodeVoltage1 = computed(() => {
  if (circuitType.value === '2node') {
    // Simple parallel circuit: V = I * R_parallel
    const rp = 1 / (1/r1.value + 1/r2.value + 1/r3.value)
    return (iSource.value * rp).toFixed(2)
  } else if (circuitType.value === '3node') {
    // Solve 3-node circuit
    const g1 = 1/r1.value
    const g2 = 1/r2.value
    const g3 = 1/r3.value
    
    // Matrix form:
    // [(g1+g3)  -g3    ] [V1]   [I1]
    // [  -g3  (g2+g3)  ] [V2] = [I2]
    
    const det = (g1 + g3) * (g2 + g3) - g3 * g3
    const v1 = ((g2 + g3) * i1.value + g3 * i2.value) / det
    return v1.toFixed(2)
  } else {
    // Bridge circuit - solve using nodal analysis
    // This is simplified; full bridge requires more nodes
    const v1 = vSource.value * (r3.value + r4.value) / (r1.value + r2.value + r3.value + r4.value)
    return v1.toFixed(2)
  }
})

const nodeVoltage2 = computed(() => {
  if (circuitType.value === '3node') {
    const g1 = 1/r1.value
    const g2 = 1/r2.value
    const g3 = 1/r3.value
    
    const det = (g1 + g3) * (g2 + g3) - g3 * g3
    const v2 = (g3 * i1.value + (g1 + g3) * i2.value) / det
    return v2.toFixed(2)
  } else if (circuitType.value === 'bridge') {
    const v2 = vSource.value * r4.value / (r3.value + r4.value)
    return v2.toFixed(2)
  }
  return '0.00'
})

const nodeVoltage3 = computed(() => {
  if (circuitType.value === 'bridge') {
    const v3 = vSource.value * r2.value / (r1.value + r2.value)
    return v3.toFixed(2)
  }
  return '0.00'
})

// Branch currents
const iR1 = computed(() => {
  const v = parseFloat(nodeVoltage1.value)
  return (v / r1.value).toFixed(3)
})

const iR2 = computed(() => {
  if (circuitType.value === '2node') {
    const v = parseFloat(nodeVoltage1.value)
    return (v / r2.value).toFixed(3)
  } else {
    const v = parseFloat(nodeVoltage2.value)
    return (v / r2.value).toFixed(3)
  }
})

const iR3 = computed(() => {
  if (circuitType.value === '2node') {
    const v = parseFloat(nodeVoltage1.value)
    return (v / r3.value).toFixed(3)
  } else {
    const v1 = parseFloat(nodeVoltage1.value)
    const v2 = parseFloat(nodeVoltage2.value)
    return ((v1 - v2) / r3.value).toFixed(3)
  }
})

const iR4 = computed(() => {
  if (circuitType.value === 'bridge') {
    const v = parseFloat(nodeVoltage3.value)
    return (v / r4.value).toFixed(3)
  }
  return '0.000'
})

const iR5 = computed(() => {
  if (circuitType.value === 'bridge') {
    const v2 = parseFloat(nodeVoltage2.value)
    const v3 = parseFloat(nodeVoltage3.value)
    return ((v2 - v3) / r5.value).toFixed(3)
  }
  return '0.000'
})

// Power calculations
const pR1 = computed(() => {
  const i = parseFloat(iR1.value)
  return (i * i * r1.value).toFixed(3)
})

const pR2 = computed(() => {
  const i = parseFloat(iR2.value)
  return (i * i * r2.value).toFixed(3)
})

const pR3 = computed(() => {
  const i = parseFloat(iR3.value)
  return (i * i * r3.value).toFixed(3)
})

const pR4 = computed(() => {
  if (circuitType.value === 'bridge') {
    const i = parseFloat(iR4.value)
    return (i * i * r4.value).toFixed(3)
  }
  return '0.000'
})

const totalPower = computed(() => {
  let total = parseFloat(pR1.value) + parseFloat(pR2.value) + parseFloat(pR3.value)
  if (circuitType.value === 'bridge') {
    total += parseFloat(pR4.value)
  }
  return total.toFixed(3)
})

const totalCurrent = computed(() => {
  if (circuitType.value === '2node') {
    return iSource.value.toFixed(2)
  } else if (circuitType.value === '3node') {
    return (parseFloat(i1.value) + parseFloat(i2.value)).toFixed(2)
  } else {
    const v = parseFloat(nodeVoltage1.value)
    return (vSource.value / (r1.value + r2.value)).toFixed(3)
  }
})

const req = computed(() => {
  if (circuitType.value === '2node') {
    const rp = 1 / (1/r1.value + 1/r2.value + 1/r3.value)
    return rp.toFixed(2)
  } else {
    return parseFloat(nodeVoltage1.value) / parseFloat(totalCurrent.value)
  }
})

const bridgeVoltage = computed(() => {
  if (circuitType.value === 'bridge') {
    const v2 = parseFloat(nodeVoltage2.value)
    const v3 = parseFloat(nodeVoltage3.value)
    return (v2 - v3).toFixed(2)
  }
  return '0.00'
})

const isBalanced = computed(() => {
  if (circuitType.value === 'bridge') {
    return Math.abs((r1.value / r2.value) - (r3.value / r4.value)) < 0.001
  }
  return false
})

// Descriptions
const nodeDescription = computed(() => {
  if (circuitType.value === '2node') {
    return 'For this simple parallel circuit, we have 1 essential node (Node 1) plus the reference ground node. The current source feeds into Node 1, and current divides through R1, R2, and R3.'
  } else if (circuitType.value === '3node') {
    return 'This T-network has 2 essential nodes (V₁ at Node 1, V₂ at Node 2) plus the ground reference. Current sources I₁ and I₂ feed into their respective nodes, and R3 connects the two nodes.'
  } else {
    return 'The Wheatstone bridge has 3 essential nodes (A, B, C) plus the ground reference node D. Node A is connected to the voltage source, and nodes B and C are connected through the bridge resistor R5.'
  }
})

const kclEquations = computed(() => {
  if (circuitType.value === '2node') {
    return `At Node 1:
  I_source = I_R1 + I_R2 + I_R3
  I_source = V₁/R₁ + V₁/R₂ + V₁/R₃
  I_source = V₁(1/R₁ + 1/R₂ + 1/R₃)
  
  Therefore:
  V₁ = I_source / (1/R₁ + 1/R₂ + 1/R₃)
  V₁ = ${nodeVoltage1.value}V`
  } else if (circuitType.value === '3node') {
    return `At Node 1 (V₁):
  I₁ = (V₁/R₁) + ((V₁-V₂)/R₃)
  
At Node 2 (V₂):
  I₂ = (V₂/R₂) + ((V₂-V₁)/R₃)
  
Rearranging:
  V₁(1/R₁ + 1/R₃) - V₂(1/R₃) = I₁
  -V₁(1/R₃) + V₂(1/R₂ + 1/R₃) = I₂`
  } else {
    return `At Node A (input node):
  (V_A-V_B)/R₁ + (V_A-V_C)/R₂ = I_source
  
At Node B:
  (V_B-V_A)/R₁ + V_B/R₃ + (V_B-V_C)/R₅ = 0
  
At Node C:
  (V_C-V_A)/R₂ + V_C/R₄ + (V_C-V_B)/R₅ = 0`
  }
})

const matrixForm = computed(() => {
  if (circuitType.value === '2node') {
    return `Single equation (scalar):
  [G_total] [V₁] = [I_source]
  
  Where G_total = 1/R₁ + 1/R₂ + 1/R₃
  = ${(1/r1.value + 1/r2.value + 1/r3.value).toFixed(4)} S`
  } else if (circuitType.value === '3node') {
    const g1 = (1/r1.value + 1/r3.value).toFixed(4)
    const g2 = (1/r2.value + 1/r3.value).toFixed(4)
    const g3 = (1/r3.value).toFixed(4)
    
    return `Matrix equation [G][V] = [I]:
  
  [${g1}   ${(-1/r3.value).toFixed(4)}] [V₁]   [${i1.value}]
  [${g3}   ${g2}] [V₂] = [${i2.value}]
  
  Determinant = ${(g1 * g2 - g3 * g3).toFixed(4)}`
  } else {
    return `For the bridge circuit, we solve a 3×3 system:
  [G] [V_A, V_B, V_C]ᵀ = [I_source, 0, 0]ᵀ
  
  This is typically solved numerically or using
  Cramer's rule for larger systems.`
  }
})

const solutionMethod = computed(() => {
  if (circuitType.value === '2node') {
    return `For a single equation, we simply divide:
  V₁ = I_source / (1/R₁ + 1/R₂ + 1/R₃)
  
  This is equivalent to:
  V₁ = I_source × R_parallel
  
  Where R_parallel is the parallel combination
  of all three resistors.`
  } else if (circuitType.value === '3node') {
    return `Using Cramer's rule for 2×2 system:
  
  V₁ = det([[I₁, -G₃], [I₂, G₂+G₃]]) / det(G)
  V₁ = ${(nodeVoltage1.value)}V
  
  V₂ = det([[G₁+G₃, I₁], [-G₃, I₂]]) / det(G)
  V₂ = ${(nodeVoltage2.value)}V`
  } else {
    return `Bridge circuits are typically solved using:
  1. Delta-wye transformation
  2. Mesh analysis (may be simpler)
  3. Numerical methods (computer solvers)
  
  For balanced bridges (R₁/R₂ = R₃/R₄), 
  no current flows through R₅.`
  }
})
</script>

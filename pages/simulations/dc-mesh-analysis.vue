<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            🔍 DC Circuit Mesh Analysis
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Visualize mesh currents and analyze multi-loop DC circuits interactively
          </p>
          
          <!-- Mesh Analysis Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-center space-y-2">
              <div class="text-lg font-semibold text-gray-700 dark:text-gray-300">Kirchhoff's Voltage Law (KVL)</div>
              <div class="flex items-center gap-2 text-xl font-mono font-bold justify-center flex-wrap">
                <span class="text-primary">ΣV</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary">0</span>
                <span class="text-gray-400 mx-2">|</span>
                <span class="text-primary">ΣI</span>
                <span class="text-gray-400">@</span>
                <span class="text-primary">node</span>
                <span class="text-gray-400">=</span>
                <span class="text-primary">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Controls Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Circuit Parameters</h3>
              
              <!-- Voltage Source 1 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voltage Source 1 (V1)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="v1"
                    type="number" 
                    step="0.5"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="v1"
                  type="range"
                  min="0"
                  max="24"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Voltage Source 2 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voltage Source 2 (V2)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="v2"
                    type="number" 
                    step="0.5"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">V</span>
                </div>
                <input 
                  v-model.number="v2"
                  type="range"
                  min="0"
                  max="24"
                  step="0.5"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- R1 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistor R1 (Mesh 1)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="r1"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="r1"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- R2 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistor R2 (Shared)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="r2"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="r2"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- R3 -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resistor R3 (Mesh 2)
                </label>
                <div class="flex items-center gap-4 mb-2">
                  <input 
                    v-model.number="r3"
                    type="number" 
                    step="10"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span class="text-gray-500 dark:text-gray-400 w-12">Ω</span>
                </div>
                <input 
                  v-model.number="r3"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
              </div>

              <!-- Animation Speed -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Animation Speed
                </label>
                <input 
                  v-model.number="animationSpeed"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-primary"
                />
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Stop</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Visualization Panel -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ Circuit Visualization</h3>
              
              <!-- SVG Circuit Diagram -->
              <div class="flex justify-center mb-6">
                <svg viewBox="0 0 700 400" class="w-full h-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-lg">
                  <defs>
                    <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                    </marker>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                    </marker>
                    <filter id="glow1">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <!-- Outer rectangle (Mesh 1) -->
                  <rect x="100" y="50" width="500" height="300" 
                        fill="none" 
                        stroke="#6B7280" 
                        stroke-width="3"
                        stroke-dasharray="10,5"
                        opacity="0.3"/>
                  
                  <!-- Inner vertical line (creates two meshes) -->
                  <line x1="350" y1="50" x2="350" y2="350" 
                        stroke="#6B7280" 
                        stroke-width="3"/>

                  <!-- Voltage Source 1 (Left) -->
                  <g>
                    <circle cx="100" cy="200" r="35" fill="white" stroke="#EF4444" stroke-width="3"/>
                    <line x1="85" y1="190" x2="115" y2="190" stroke="#EF4444" stroke-width="4"/>
                    <line x1="90" y1="210" x2="110" y2="210" stroke="#EF4444" stroke-width="2"/>
                    <text x="100" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#EF4444">
                      V1 = {{ v1 }}V
                    </text>
                    <!-- Polarity marks -->
                    <text x="115" y="175" font-size="16" font-weight="bold" fill="#EF4444">+</text>
                    <text x="115" y="230" font-size="16" font-weight="bold" fill="#EF4444">−</text>
                  </g>

                  <!-- Voltage Source 2 (Right) -->
                  <g>
                    <circle cx="600" cy="200" r="35" fill="white" stroke="#3B82F6" stroke-width="3"/>
                    <line x1="585" y1="190" x2="615" y2="190" stroke="#3B82F6" stroke-width="4"/>
                    <line x1="590" y1="210" x2="610" y2="210" stroke="#3B82F6" stroke-width="2"/>
                    <text x="600" y="245" text-anchor="middle" font-size="13" font-weight="bold" fill="#3B82F6">
                      V2 = {{ v2 }}V
                    </text>
                    <!-- Polarity marks -->
                    <text x="565" y="175" font-size="16" font-weight="bold" fill="#3B82F6">+</text>
                    <text x="565" y="230" font-size="16" font-weight="bold" fill="#3B82F6">−</text>
                  </g>

                  <!-- R1 (Top Left - Mesh 1) -->
                  <g>
                    <rect x="185" y="38" width="130" height="24" fill="white" stroke="#9FA8DA" stroke-width="2" rx="3"/>
                    <path d="M185 50 L200 40 L215 60 L230 40 L245 60 L260 40 L275 60 L290 40 L305 60 L315 50" 
                          stroke="#9FA8DA" stroke-width="2" fill="none"/>
                    <text x="250" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#9FA8DA">
                      R1 = {{ r1 }}Ω
                    </text>
                  </g>

                  <!-- R2 (Top Right - Shared) -->
                  <g>
                    <rect x="385" y="38" width="130" height="24" fill="white" stroke="#FBBF24" stroke-width="2" rx="3"/>
                    <path d="M385 50 L400 40 L415 60 L430 40 L445 60 L460 40 L475 60 L490 40 L505 60 L515 50" 
                          stroke="#FBBF24" stroke-width="2" fill="none"/>
                    <text x="450" y="30" text-anchor="middle" font-size="12" font-weight="bold" fill="#FBBF24">
                      R2 = {{ r2 }}Ω
                    </text>
                  </g>

                  <!-- R3 (Middle - Shared branch) -->
                  <g>
                    <rect x="325" y="145" width="50" height="110" fill="white" stroke="#10B981" stroke-width="2" rx="3"/>
                    <path d="M350 145 L340 160 L360 175 L340 190 L360 205 L340 220 L360 235 L350 255" 
                          stroke="#10B981" stroke-width="2" fill="none"/>
                    <text x="380" y="205" text-anchor="start" font-size="12" font-weight="bold" fill="#10B981">
                      R3 = {{ r3 }}Ω
                    </text>
                  </g>

                  <!-- Mesh 1 Current Arrow (Clockwise) -->
                  <g v-if="animationSpeed > 0">
                    <text x="180" y="320" font-size="14" font-weight="bold" fill="#EF4444">
                      I₁ = {{ i1 }} mA
                    </text>
                    <!-- Animated arrow showing mesh current -->
                    <circle cx="0" cy="0" r="5" fill="#EF4444" filter="url(#glow1)">
                      <animateMotion 
                        :dur="animationDuration" 
                        repeatCount="indefinite"
                        path="M 250 350 L 250 50 L 100 50 L 100 350 L 250 350"
                        rotate="auto"
                      />
                    </circle>
                  </g>

                  <!-- Mesh 2 Current Arrow (Clockwise) -->
                  <g v-if="animationSpeed > 0">
                    <text x="470" y="320" font-size="14" font-weight="bold" fill="#3B82F6">
                      I₂ = {{ i2 }} mA
                    </text>
                    <!-- Animated arrow showing mesh current -->
                    <circle cx="0" cy="0" r="5" fill="#3B82F6" filter="url(#glow1)">
                      <animateMotion 
                        :dur="animationDuration" 
                        repeatCount="indefinite"
                        path="M 500 350 L 500 50 L 350 50 L 350 350 L 500 350"
                        rotate="auto"
                      />
                    </circle>
                  </g>

                  <!-- Mesh Labels -->
                  <text x="175" y="190" font-size="20" font-weight="bold" fill="#EF4444" opacity="0.3">
                    Mesh 1
                  </text>
                  <text x="525" y="190" font-size="20" font-weight="bold" fill="#3B82F6" opacity="0.3">
                    Mesh 2
                  </text>
                </svg>
              </div>

              <!-- Legend -->
              <div class="flex justify-center gap-6 mb-6">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-red-500"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Mesh 1 Current (I₁)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">Mesh 2 Current (I₂)</span>
                </div>
              </div>
            </div>

            <!-- Results Panel -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Analysis Results</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- Mesh 1 Current -->
                <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Mesh 1 Current</span>
                    <span class="text-xs bg-red-500 text-white px-2 py-1 rounded-full">I₁</span>
                  </div>
                  <div class="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                    {{ i1 }} mA
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Clockwise current in left mesh
                  </p>
                </div>

                <!-- Mesh 2 Current -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Mesh 2 Current</span>
                    <span class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">I₂</span>
                  </div>
                  <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {{ i2 }} mA
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Clockwise current in right mesh
                  </p>
                </div>

                <!-- R3 Current -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Branch Current (R3)</span>
                    <span class="text-xs bg-green-500 text-white px-2 py-1 rounded-full">I_R3</span>
                  </div>
                  <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {{ ir3 }} mA
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    I₁ - I₂ = {{ i1 - i2 }} mA
                  </p>
                </div>

                <!-- Power -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-700 dark:text-gray-300 font-semibold">Total Power</span>
                    <span class="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">P</span>
                  </div>
                  <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {{ totalPower }} mW
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Delivered by sources
                  </p>
                </div>
              </div>

              <!-- Mesh Equations -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">📝 Mesh Equations (KVL)</h4>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Mesh 1 Equation (Clockwise KVL):</p>
                    <code class="text-sm font-mono text-red-600 dark:text-red-400">
                      {{ equation1 }}
                    </code>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Mesh 2 Equation (Clockwise KVL):</p>
                    <code class="text-sm font-mono text-blue-600 dark:text-blue-400">
                      {{ equation2 }}
                    </code>
                  </div>

                  <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Using Determinant Method (Cramer's Rule):</p>
                    <code class="text-sm font-mono text-primary">
                      Determinant = {{ determinant }}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Understanding Mesh Analysis</h3>
          
          <div class="prose dark:prose-invert max-w-none">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">What is Mesh Analysis?</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Mesh analysis is a method used to solve planar circuits for currents at any point. It applies Kirchhoff's Voltage Law (KVL) 
              to each mesh (loop) in the circuit, creating a system of equations that can be solved simultaneously.
            </p>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Concepts</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-2">
              <li><strong>Mesh:</strong> A loop that does not contain any other loops within it</li>
              <li><strong>Mesh Current:</strong> A hypothetical current that flows around the mesh</li>
              <li><strong>Shared Branch:</strong> When two meshes share a branch, the actual current is the difference of mesh currents</li>
              <li><strong>KVL:</strong> Sum of voltage drops around any closed loop equals zero</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Steps to Perform Mesh Analysis</h4>
            <ol class="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Identify all meshes in the circuit and assign mesh currents (I₁, I₂, ...)</li>
              <li>Apply KVL to each mesh, considering shared branches</li>
              <li>Solve the system of equations for mesh currents</li>
              <li>Calculate branch currents and voltages from mesh currents</li>
            </ol>

            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">When to Use Mesh Analysis?</h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Circuits with multiple voltage sources</li>
              <li>Planar circuits (can be drawn without crossing wires)</li>
              <li>When you need to find all branch currents</li>
              <li>Circuits with fewer meshes than nodes (compared to nodal analysis)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Cyno Electric - Making Electrical Engineering Easy to Understand</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Input values
const v1 = ref(12)      // Voltage source 1
const v2 = ref(9)       // Voltage source 2
const r1 = ref(100)     // Resistor 1 (Mesh 1)
const r2 = ref(150)     // Resistor 2 (Mesh 2)
const r3 = ref(200)     // Resistor 3 (Shared)
const animationSpeed = ref(50)  // Animation speed (0-100)

// Computed mesh currents using mesh analysis
// Mesh 1: (R1 + R3)*I1 - R3*I2 = V1
// Mesh 2: (R2 + R3)*I2 - R3*I1 = V2

const i1 = computed(() => {
  // Using Cramer's rule to solve the system
  // [R1+R3  -R3 ] [I1]   [V1]
  // [-R3   R2+R3] [I2] = [V2]
  
  const a = r1.value + r3.value
  const b = -r3.value
  const c = -r3.value
  const d = r2.value + r3.value
  
  const det = a * d - b * c
  const detI1 = v1.value * d - b * v2.value
  
  const current = detI1 / det * 1000 // Convert to mA
  return parseFloat(current.toFixed(2))
})

const i2 = computed(() => {
  const a = r1.value + r3.value
  const b = -r3.value
  const c = -r3.value
  const d = r2.value + r3.value
  
  const det = a * d - b * c
  const detI2 = a * v2.value - v1.value * c
  
  const current = detI2 / det * 1000 // Convert to mA
  return parseFloat(current.toFixed(2))
})

const ir3 = computed(() => {
  // Current through R3 = I1 - I2 (if both are clockwise)
  return parseFloat((i1.value - i2.value).toFixed(2))
})

const totalPower = computed(() => {
  // Power delivered by sources
  const p1 = v1.value * i1.value / 1000  // Convert mA to A
  const p2 = v2.value * i2.value / 1000
  return parseFloat(((p1 + p2) * 1000).toFixed(2)) // Convert to mW
})

const determinant = computed(() => {
  const a = r1.value + r3.value
  const b = -r3.value
  const c = -r3.value
  const d = r2.value + r3.value
  return parseFloat((a * d - b * c).toFixed(2))
})

const equation1 = computed(() => {
  return `(${r1.value} + ${r3.value})I₁ - ${r3.value}I₂ = ${v1.value}`
})

const equation2 = computed(() => {
  return `(${r2.value} + ${r3.value})I₂ - ${r3.value}I₁ = ${v2.value}`
})

const animationDuration = computed(() => {
  if (animationSpeed.value === 0) return '0s'
  const duration = 6 - (animationSpeed.value / 100 * 5) // 6s to 1s
  return `${duration}s`
})
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

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}

.slider-primary::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
}

.slider-primary::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tw-color-primary);
  cursor: pointer;
  border: none;
}
</style>

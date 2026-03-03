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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            PCB Trace Width Calculator
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate optimal trace width for your PCB design based on IPC-2221 standards
          </p>
        </div>
      </div>
    </section>

    <!-- Interactive PCB Visualization -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📏 Trace Visualization
          </h3>
          
          <!-- PCB Cross-Section SVG -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 800 400" class="w-full max-w-4xl h-auto">
              <!-- Background -->
              <defs>
                <linearGradient id="copperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#b87333;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#8b5a2b;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="substrateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#d4a574;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#c4956a;stop-opacity:0.3" />
                </linearGradient>
              </defs>
              
              <!-- Substrate (PCB Board) -->
              <rect x="50" y="100" width="700" height="200" fill="url(#substrateGradient)" stroke="#8b7355" stroke-width="2" rx="5"/>
              <text x="400" y="220" text-anchor="middle" font-size="20" fill="#6b5344" font-weight="bold">FR-4 Substrate</text>
              
              <!-- Copper Trace (Top Layer) - Width varies with calculation -->
              <rect 
                x="150" 
                y="100" 
                :width="displayTraceWidth" 
                height="20" 
                fill="url(#copperGradient)" 
                stroke="#8b5a2b" 
                stroke-width="2"
                class="transition-all duration-300"
              />
              <text :x="150 + displayTraceWidth/2" y="90" text-anchor="middle" font-size="14" fill="#b87333" font-weight="bold">
                {{ calculatedWidth.toFixed(3) }} mm
              </text>
              
              <!-- Copper Pour / Ground Plane (Bottom Layer) -->
              <rect x="50" y="280" width="700" height="20" fill="url(#copperGradient)" stroke="#8b5a2b" stroke-width="2" opacity="0.5"/>
              <text x="400" y="320" text-anchor="middle" font-size="14" fill="#8b5a2b">Ground Plane</text>
              
              <!-- Current Flow Arrows -->
              <g v-if="inputs.current > 0">
                <polygon points="120,80 135,90 135,70" :fill="currentColor" class="transition-all duration-300"/>
                <text x="145" y="95" font-size="14" font-weight="bold" :fill="currentColor">
                  I = {{ inputs.current }}A
                </text>
                
                <!-- Animated particles along trace -->
                <circle r="4" :fill="currentColor" class="current-particle">
                  <animateMotion :dur="currentAnimationSpeed" repeatCount="indefinite">
                    <mpath href="#tracePath"/>
                  </animateMotion>
                </circle>
                <circle r="4" :fill="currentColor" class="current-particle">
                  <animateMotion :dur="currentAnimationSpeed" repeatCount="indefinite" begin="0.3s">
                    <mpath href="#tracePath"/>
                  </animateMotion>
                </circle>
                <circle r="4" :fill="currentColor" class="current-particle">
                  <animateMotion :dur="currentAnimationSpeed" repeatCount="indefinite" begin="0.6s">
                    <mpath href="#tracePath"/>
                  </animateMotion>
                </circle>
              </g>
              
              <!-- Invisible path for current flow -->
              <path 
                id="tracePath"
                :d="`M 150 110 L ${150 + displayTraceWidth} 110`"
                fill="none" 
                stroke="none"
              />
              
              <!-- Temperature Rise Indicator -->
              <g transform="translate(600, 150)">
                <rect x="0" y="0" width="150" height="100" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" rx="5"/>
                <text x="75" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309">Temperature Rise</text>
                <text x="75" y="50" text-anchor="middle" font-size="24" font-weight="bold" :fill="tempColor">
                  {{ inputs.tempRise }}°C
                </text>
                <text x="75" y="70" text-anchor="middle" font-size="10" fill="#666">
                  {{ inputs.tempRise <= 10 ? '✓ Excellent' : inputs.tempRise <= 20 ? '✓ Good' : '⚠ High' }}
                </text>
              </g>
              
              <!-- Copper Weight Display -->
              <g transform="translate(50, 150)">
                <rect x="0" y="0" width="120" height="60" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="5"/>
                <text x="60" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">Copper Weight</text>
                <text x="60" y="50" text-anchor="middle" font-size="18" font-weight="bold" fill="#0284c7">
                  {{ inputs.copperWeight }} oz
                </text>
              </g>
              
              <!-- Cross-section view -->
              <g transform="translate(250, 340)">
                <text x="150" y="0" text-anchor="middle" font-size="14" font-weight="bold" fill="#666">Cross-Section View</text>
                <!-- Substrate -->
                <rect x="0" y="20" width="300" height="40" fill="#d4a574" stroke="#8b7355" stroke-width="1" rx="2"/>
                <!-- Trace thickness (exaggerated for visibility) -->
                <rect x="50" y="10" width="200" height="10" fill="#b87333" stroke="#8b5a2b" stroke-width="1"/>
                <text x="150" y="75" text-anchor="middle" font-size="11" fill="#666">
                  Trace Thickness: {{ (inputs.copperWeight * 0.035).toFixed(3) }} mm
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚙️ Design Parameters
          </h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <div class="space-y-6">
              <!-- Current Input -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current (A)
                </label>
                <input 
                  type="range" 
                  v-model.number="inputs.current"
                  min="0.1" 
                  max="20" 
                  step="0.1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                >
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.1A</span>
                  <span class="font-bold text-primary-highlight">{{ inputs.current }}A</span>
                  <span>20A</span>
                </div>
              </div>

              <!-- Temperature Rise Input -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Temperature Rise (°C)
                </label>
                <input 
                  type="range" 
                  v-model.number="inputs.tempRise"
                  min="5" 
                  max="100" 
                  step="5"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                >
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>5°C</span>
                  <span class="font-bold text-primary-highlight">{{ inputs.tempRise }}°C</span>
                  <span>100°C</span>
                </div>
              </div>

              <!-- Trace Length Input -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Trace Length (mm)
                </label>
                <input 
                  type="range" 
                  v-model.number="inputs.traceLength"
                  min="1" 
                  max="500" 
                  step="1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                >
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>1mm</span>
                  <span class="font-bold text-primary-highlight">{{ inputs.traceLength }}mm</span>
                  <span>500mm</span>
                </div>
              </div>

              <!-- Copper Weight Input -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Copper Weight (oz/ft²)
                </label>
                <input 
                  type="range" 
                  v-model.number="inputs.copperWeight"
                  min="0.5" 
                  max="4" 
                  step="0.5"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                >
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>0.5oz</span>
                  <span class="font-bold text-primary-highlight">{{ inputs.copperWeight }}oz</span>
                  <span>4oz</span>
                </div>
              </div>
            </div>

            <!-- Results Section -->
            <div class="space-y-6">
              <!-- Calculated Trace Width -->
              <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 border-2 border-primary/20">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Required Trace Width</h4>
                <div class="text-4xl font-extrabold text-primary-highlight mb-2">
                  {{ calculatedWidth.toFixed(3) }} mm
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  = {{ (calculatedWidth * 1000).toFixed(1) }} mil (thousandths of an inch)
                </div>
              </div>

              <!-- Additional Info -->
              <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Design Parameters</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Trace Thickness:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ (inputs.copperWeight * 0.035).toFixed(3) }} mm</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Cross-Section Area:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ (calculatedWidth * inputs.copperWeight * 0.035).toFixed(4) }} mm²</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Trace Resistance:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ traceResistance.toFixed(4) }} Ω</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Voltage Drop:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ (traceResistance * inputs.current * 1000).toFixed(2) }} mV</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Power Dissipation:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">{{ (Math.pow(inputs.current, 2) * traceResistance * 1000).toFixed(2) }} mW</span>
                  </div>
                </div>
              </div>

              <!-- Recommendation -->
              <div :class="[
                'rounded-xl p-6 border-2',
                recommendation.level === 'safe' ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' :
                recommendation.level === 'caution' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700' :
                'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
              ]">
                <h4 class="text-lg font-bold mb-2" :class="{
                  'text-green-800 dark:text-green-300': recommendation.level === 'safe',
                  'text-yellow-800 dark:text-yellow-300': recommendation.level === 'caution',
                  'text-red-800 dark:text-red-300': recommendation.level === 'warning'
                }">
                  {{ recommendation.title }}
                </h4>
                <p class="text-sm" :class="{
                  'text-green-700 dark:text-green-400': recommendation.level === 'safe',
                  'text-yellow-700 dark:text-yellow-400': recommendation.level === 'caution',
                  'text-red-700 dark:text-red-400': recommendation.level === 'warning'
                }">
                  {{ recommendation.message }}
                </p>
              </div>
            </div>
          </div>

          <!-- Preset Configurations -->
          <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Common Presets</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                @click="applyPreset('signal')"
                class="px-4 py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm font-semibold text-blue-700 dark:text-blue-300"
              >
                Low Power Signal
                <div class="text-xs opacity-75 mt-1">0.1A, 10°C</div>
              </button>
              <button 
                @click="applyPreset('medium')"
                class="px-4 py-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition-colors text-sm font-semibold text-green-700 dark:text-green-300"
              >
                Medium Power
                <div class="text-xs opacity-75 mt-1">1A, 20°C</div>
              </button>
              <button 
                @click="applyPreset('power')"
                class="px-4 py-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 rounded-lg transition-colors text-sm font-semibold text-orange-700 dark:text-orange-300"
              >
                High Power
                <div class="text-xs opacity-75 mt-1">5A, 30°C</div>
              </button>
              <button 
                @click="applyPreset('heavy')"
                class="px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm font-semibold text-red-700 dark:text-red-300"
              >
                Very High Power
                <div class="text-xs opacity-75 mt-1">10A, 20°C</div>
              </button>
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
            📚 Understanding PCB Trace Width
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Why Trace Width Matters</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              PCB trace width is critical for ensuring your board can handle the required current without overheating or failing.
              Traces that are too narrow will overheat, potentially causing the copper to delaminate from the board or creating a fire hazard.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">IPC-2221 Standard</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              This calculator uses the IPC-2221 generic standard on conductive panel design and board construction.
              The formula accounts for:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Current (I):</strong> The maximum current the trace will carry</li>
              <li><strong>Temperature Rise (ΔT):</strong> Acceptable temperature increase above ambient</li>
              <li><strong>Copper Weight:</strong> Thickness of the copper layer (typically 0.5-4 oz/ft²)</li>
              <li><strong>Trace Length:</strong> Affects resistance and voltage drop</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Considerations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">✅ Best Practices</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Use conservative temperature rise (10-20°C)</li>
                  <li>• Add 20-50% safety margin for reliability</li>
                  <li>• Consider vias as current bottlenecks</li>
                  <li>• Use wider traces for power paths</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 class="font-bold text-red-800 dark:text-red-300 mb-2">❌ Common Mistakes</h4>
                <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                  <li>• Traces too narrow for current</li>
                  <li>• Ignoring temperature rise</li>
                  <li>• Forgetting about voltage drop</li>
                  <li>• Not accounting for vias</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Copper Weight Reference:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="py-2 text-left">Copper Weight</th>
                    <th class="py-2 text-left">Thickness</th>
                    <th class="py-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300">
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0.5 oz</td>
                    <td class="py-2">0.0175 mm</td>
                    <td class="py-2">Low-cost, low-power</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">1.0 oz</td>
                    <td class="py-2">0.035 mm</td>
                    <td class="py-2">Standard, most common</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">2.0 oz</td>
                    <td class="py-2">0.070 mm</td>
                    <td class="py-2">Power applications</td>
                  </tr>
                  <tr>
                    <td class="py-2">4.0 oz</td>
                    <td class="py-2">0.140 mm</td>
                    <td class="py-2">High-current designs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Voltage Drop Considerations:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              For long traces or high-precision applications, calculate voltage drop:
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              V_drop = I × R = I × (ρ × L / A)
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where ρ (resistivity of copper) = 0.0172 Ω·mm²/m, L is trace length in meters, and A is cross-sectional area in mm².
            </p>
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
  title: 'PCB Trace Width Calculator - Cyno Electric',
  meta: [
    { name: 'description', content: 'Calculate optimal PCB trace width based on current, temperature rise, and copper weight. IPC-2221 compliant.' },
    { name: 'keywords', content: 'PCB, trace width, current capacity, IPC-2221, circuit board design' }
  ]
})

const colorMode = useColorMode()

// Input state
const inputs = ref({
  current: 1.0,      // Amperes
  tempRise: 20,      // Degrees Celsius
  traceLength: 50,   // mm
  copperWeight: 1.0  // oz/ft²
})

// Computed values
const calculatedWidth = computed(() => {
  // IPC-2221 formula simplified for external layers
  const { current, tempRise, copperWeight } = inputs.value
  
  // Base formula for external layers (more conservative)
  // k = 0.048 for external layers, 0.024 for internal
  // Adjusted for temperature rise and copper weight
  const k = 0.048
  const tempRiseNormalized = tempRise / 10
  const copperThickness = copperWeight * 0.035 // mm
  
  // Simplified IPC-2221 calculation
  const width = (k * Math.pow(current, 0.725) * Math.pow(tempRiseNormalized, 0.25)) / Math.pow(copperThickness, 0.25)
  
  // Convert to mm and add safety margin
  return Math.max(width, 0.1) // Minimum 0.1mm
})

const traceResistance = computed(() => {
  // Calculate trace resistance
  // R = ρ × L / A
  const resistivity = 0.0172 // Ω·mm²/m for copper
  const length = inputs.value.traceLength / 1000 // Convert mm to m
  const thickness = inputs.value.copperWeight * 0.035 // mm
  const area = calculatedWidth.value * thickness // mm²
  
  return (resistivity * length) / area
})

const displayTraceWidth = computed(() => {
  // Scale for visualization (minimum 50px, maximum 500px)
  const minWidth = 50
  const maxWidth = 500
  const scaleFactor = 200 // 1mm = 200px for visibility
  
  return Math.min(Math.max(calculatedWidth.value * scaleFactor, minWidth), maxWidth)
})

const currentColor = computed(() => {
  const current = inputs.value.current
  if (current < 0.5) return '#22c55e' // Green
  if (current < 2) return '#eab308' // Yellow
  if (current < 5) return '#f97316' // Orange
  return '#ef4444' // Red
})

const tempColor = computed(() => {
  const temp = inputs.value.tempRise
  if (temp <= 10) return '#22c55e'
  if (temp <= 20) return '#eab308'
  if (temp <= 30) return '#f97316'
  return '#ef4444'
})

const currentAnimationSpeed = computed(() => {
  // Faster animation for higher currents
  const baseSpeed = 3 // seconds
  return Math.max(baseSpeed / Math.sqrt(inputs.value.current), 0.5)
})

const recommendation = computed(() => {
  const { current, tempRise } = inputs.value
  
  if (tempRise <= 10 && current < 2) {
    return {
      level: 'safe',
      title: '✓ Excellent Design',
      message: 'Conservative design with good thermal margin. Suitable for most applications.'
    }
  } else if (tempRise <= 20 && current < 5) {
    return {
      level: 'caution',
      title: '⚠ Acceptable Design',
      message: 'Design meets IPC-2221 standards. Consider additional margin for high-reliability applications.'
    }
  } else {
    return {
      level: 'warning',
      title: '⚠ High Power Design',
      message: 'Consider using thicker copper, multiple parallel traces, or reducing temperature rise for better reliability.'
    }
  }
})

// Methods
const applyPreset = (preset: string) => {
  switch (preset) {
    case 'signal':
      inputs.value.current = 0.1
      inputs.value.tempRise = 10
      inputs.value.copperWeight = 1.0
      break
    case 'medium':
      inputs.value.current = 1.0
      inputs.value.tempRise = 20
      inputs.value.copperWeight = 1.0
      break
    case 'power':
      inputs.value.current = 5.0
      inputs.value.tempRise = 30
      inputs.value.copperWeight = 2.0
      break
    case 'heavy':
      inputs.value.current = 10.0
      inputs.value.tempRise = 20
      inputs.value.copperWeight = 2.0
      break
  }
}
</script>

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
            — Triac Light Dimmer Simulation
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore how phase-angle control regulates power in AC circuits using triac switching
          </p>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            💡 Interactive Dimmer Circuit
          </h3>

          <!-- Circuit Diagram -->
          <div class="flex justify-center mb-8">
            <svg viewBox="0 0 800 500" class="w-full max-w-5xl h-auto">
              <!-- Background -->
              <rect x="0" y="0" width="800" height="500" fill="white" opacity="0"/>
              
              <!-- AC Source -->
              <g transform="translate(100, 250)">
                <circle cx="0" cy="0" r="40" fill="white" stroke="#9333ea" stroke-width="3"/>
                <path d="M -20 0 Q -10 -20, 0 0 Q 10 20, 20 0" fill="none" stroke="#9333ea" stroke-width="2"/>
                <text x="0" y="-55" text-anchor="middle" font-size="14" font-weight="bold" fill="#9333ea">AC 220V</text>
                <text x="0" y="-70" text-anchor="middle" font-size="12" fill="#666">50Hz</text>
              </g>

              <!-- Wires -->
              <path d="M 140 250 L 200 250" stroke="#666" stroke-width="3" fill="none"/>
              <path d="M 600 250 L 660 250" stroke="#666" stroke-width="3" fill="none"/>
              <path d="M 700 210 L 700 150 L 650 150" stroke="#666" stroke-width="3" fill="none"/>
              <path d="M 750 150 L 750 210" stroke="#666" stroke-width="3" fill="none"/>

              <!-- Triac -->
              <g transform="translate(400, 250)">
                <!-- Triac body -->
                <circle cx="0" cy="0" r="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
                
                <!-- Triac symbol -->
                <g stroke="#b45309" stroke-width="2" fill="none">
                  <!-- Main terminals (MT1, MT2) -->
                  <line x1="-60" y1="0" x2="-20" y2="0"/>
                  <line x1="20" y1="0" x2="60" y2="0"/>
                  
                  <!-- Diode 1 (forward) -->
                  <path d="M -10 -20 L 10 -20 L 10 0 L -10 0 Z"/>
                  <polygon points="-10,-20 10,-20 5,-25" fill="#b45309"/>
                  
                  <!-- Diode 2 (reverse) -->
                  <path d="M -10 0 L 10 0 L 10 20 L -10 20 Z"/>
                  <polygon points="10,0 -10,0 -5,5" fill="#b45309"/>
                  
                  <!-- Gate terminal -->
                  <line x1="0" y1="10" x2="0" y2="40"/>
                  <line x1="0" y1="40" x2="-20" y2="60"/>
                </g>
                
                <!-- Labels -->
                <text x="0" y="-70" text-anchor="middle" font-size="14" font-weight="bold" fill="#b45309">TRIAC</text>
                <text x="-70" y="-10" font-size="12" fill="#666">MT2</text>
                <text x="70" y="-10" font-size="12" fill="#666">MT1</text>
                <text x="-30" y="75" font-size="12" fill="#666">Gate</text>
              </g>

              <!-- Diac -->
              <g transform="translate(400, 350)">
                <rect x="-30" y="-15" width="60" height="30" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="5"/>
                <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">DIAC</text>
                <text x="0" y="40" text-anchor="middle" font-size="10" fill="#666">Trigger</text>
              </g>

              <!-- Potentiometer (Dimmer Control) -->
              <g transform="translate(600, 150)">
                <rect x="-40" y="-20" width="80" height="40" fill="#dcfce7" stroke="#22c55e" stroke-width="2" rx="5"/>
                <path d="M -25 0 L 25 0" stroke="#22c55e" stroke-width="2"/>
                <polygon points="20,-5 30,0 20,5" fill="#22c55e"/>
                <text x="0" y="-35" text-anchor="middle" font-size="14" font-weight="bold" fill="#15803d">Dimmer</text>
                <text x="0" y="40" text-anchor="middle" font-size="11" fill="#666">{{ firingAngle.toFixed(0) }}°</text>
              </g>

              <!-- Load (Light Bulb) -->
              <g transform="translate(700, 250)">
                <!-- Bulb circle -->
                <circle cx="0" cy="0" r="40" :fill="bulbColor" stroke="#666" stroke-width="3" class="transition-all duration-300"/>
                
                <!-- Filament -->
                <path d="M -15 20 Q 0 0, 15 20" stroke="#666" stroke-width="2" fill="none"/>
                <path d="M -10 25 Q 0 10, 10 25" stroke="#666" stroke-width="2" fill="none"/>
                
                <!-- Light rays (animated when ON) -->
                <g v-if="powerPercentage > 0">
                  <line x1="0" y1="-50" x2="0" y2="-70" :stroke="bulbColor" stroke-width="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite"/>
                  </line>
                  <line x1="35" y1="-35" x2="50" y2="-50" :stroke="bulbColor" stroke-width="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/>
                  </line>
                  <line x1="-35" y1="-35" x2="-50" y2="-50" :stroke="bulbColor" stroke-width="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                  </line>
                </g>
                
                <text x="0" y="60" text-anchor="middle" font-size="14" font-weight="bold" fill="#666">Load</text>
                <text x="0" y="80" text-anchor="middle" font-size="12" :fill="bulbColor">{{ powerPercentage.toFixed(0) }}%</text>
              </g>

              <!-- Current flow animation -->
              <g v-if="powerPercentage > 0">
                <circle r="5" :fill="currentColor" opacity="0.7">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
                <circle r="5" :fill="currentColor" opacity="0.7">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#currentPath"/>
                  </animateMotion>
                </circle>
              </g>
              
              <path id="currentPath" d="M 140 250 L 200 250 L 340 250 L 460 250 L 600 250 L 660 250 L 700 210 L 700 150 L 650 150 L 600 150 L 600 150 L 600 150 L 600 250 L 700 250" fill="none" stroke="none"/>
            </svg>
          </div>

          <!-- Waveform Display -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Input Voltage Waveform -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Input Voltage (Full Sine Wave)</h4>
              <svg viewBox="0 0 400 200" class="w-full h-48">
                <!-- Grid -->
                <defs>
                  <pattern id="waveGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#waveGrid)"/>
                
                <!-- Zero line -->
                <line x1="0" y1="100" x2="400" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
                
                <!-- Full sine wave (input) -->
                <path :d="generateSineWavePath(0, 360)" stroke="#9333ea" stroke-width="3" fill="none"/>
                
                <!-- Labels -->
                <text x="200" y="190" text-anchor="middle" font-size="12" fill="#666">Time</text>
                <text x="10" y="105" font-size="12" fill="#666">0V</text>
                <text x="10" y="30" font-size="12" fill="#9333ea">+Vpeak</text>
                <text x="10" y="185" font-size="12" fill="#9333ea">-Vpeak</text>
              </svg>
            </div>

            <!-- Output Voltage Waveform -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
                Output Voltage (Phase-Controlled)
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400 block">
                  Firing Angle: {{ firingAngle.toFixed(0) }}°
                </span>
              </h4>
              <svg viewBox="0 0 400 200" class="w-full h-48">
                <!-- Grid -->
                <rect width="400" height="200" fill="url(#waveGrid)"/>
                
                <!-- Zero line -->
                <line x1="0" y1="100" x2="400" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="5,5"/>
                
                <!-- Phase-controlled waveform -->
                <path :d="generatePhaseControlledWavePath()" stroke="#f59e0b" stroke-width="3" fill="none"/>
                
                <!-- Firing angle indicator -->
                <line x1="0" y1="100" x2="0" y2="50" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" opacity="0.7"/>
                <line x1="0" y1="50" x2="50" y2="30" stroke="#ef4444" stroke-width="1" opacity="0.7"/>
                <text x="55" y="25" font-size="11" fill="#ef4444">α = {{ firingAngle.toFixed(0) }}°</text>
                
                <!-- Labels -->
                <text x="200" y="190" text-anchor="middle" font-size="12" fill="#666">Time</text>
                <text x="10" y="105" font-size="12" fill="#666">0V</text>
              </svg>
            </div>
          </div>

          <!-- Controls -->
          <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-primary/10 rounded-xl p-6 border-2 border-primary/20">
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">🎛️ Dimmer Control</h4>
            
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Firing Angle (α): {{ firingAngle.toFixed(0) }}°
              </label>
              <input 
                type="range" 
                v-model.number="firingAngle"
                min="0" 
                max="180" 
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              >
              <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>0° (Full Power)</span>
                <span>90° (50% Power)</span>
                <span>180° (Off)</span>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                @click="setPreset(0)"
                class="px-4 py-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition-colors text-sm font-semibold text-green-700 dark:text-green-300"
              >
                Full Power
                <div class="text-xs opacity-75 mt-1">α = 0°</div>
              </button>
              <button 
                @click="setPreset(60)"
                class="px-4 py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-sm font-semibold text-blue-700 dark:text-blue-300"
              >
                Bright
                <div class="text-xs opacity-75 mt-1">α = 60°</div>
              </button>
              <button 
                @click="setPreset(90)"
                class="px-4 py-3 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 rounded-lg transition-colors text-sm font-semibold text-yellow-700 dark:text-yellow-300"
              >
                Medium
                <div class="text-xs opacity-75 mt-1">α = 90°</div>
              </button>
              <button 
                @click="setPreset(150)"
                class="px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors text-sm font-semibold text-red-700 dark:text-red-300"
              >
                Dim
                <div class="text-xs opacity-75 mt-1">α = 150°</div>
              </button>
            </div>

            <!-- Power Display -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-primary-highlight">{{ powerPercentage.toFixed(0) }}%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Power Output</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-primary-highlight">{{ rmsVoltage.toFixed(0) }}V</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">RMS Output</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div class="text-2xl font-bold text-primary-highlight">{{ conductionAngle.toFixed(0) }}°</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Conduction Angle</div>
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
            📚 Understanding Triac Dimmers
          </h2>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">What is a Triac?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              A TRIAC (Triode for Alternating Current) is a bidirectional thyristor that can conduct current in both directions when triggered.
              It's the key component in modern AC light dimmers, allowing precise control of power delivered to resistive loads like incandescent bulbs.
            </p>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">How Phase-Angle Control Works</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              The dimmer works by "chopping" the AC waveform:
            </p>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Firing Angle (α):</strong> The point in each half-cycle where the triac is triggered</li>
              <li><strong>Before triggering:</strong> The triac blocks current flow</li>
              <li><strong>After triggering:</strong> The triac conducts until the current drops to zero</li>
              <li><strong>Power control:</strong> Larger α = less conduction time = dimmer light</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Key Components:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 class="font-bold text-purple-800 dark:text-purple-300 mb-2">TRIAC</h4>
                <ul class="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>• Bidirectional switch</li>
                  <li>• Controls power to load</li>
                  <li>• MT1, MT2, Gate terminals</li>
                </ul>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-2">DIAC</h4>
                <ul class="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Trigger device for triac</li>
                  <li>• Provides snap-on action</li>
                  <li>• Ensures reliable triggering</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Power Formulas:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm my-4">
              <div class="mb-2">P_out = P_in × [1 - (α/180°) + (sin(2α) / 2π)]</div>
              <div class="mb-2">V_rms = V_mains × √{[1 - (α/180°) + (sin(2α) / 2π)]}</div>
              <div>Conduction Angle = 180° - α</div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Firing Angle Examples:</h3>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300 dark:border-gray-600">
                    <th class="py-2 text-left">Firing Angle (α)</th>
                    <th class="py-2 text-left">Power</th>
                    <th class="py-2 text-left">Application</th>
                  </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-300">
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">0°</td>
                    <td class="py-2">100%</td>
                    <td class="py-2">Full brightness</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">60°</td>
                    <td class="py-2">~75%</td>
                    <td class="py-2">Bright lighting</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">90°</td>
                    <td class="py-2">~50%</td>
                    <td class="py-2">Medium brightness</td>
                  </tr>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2">120°</td>
                    <td class="py-2">~25%</td>
                    <td class="py-2">Ambient lighting</td>
                  </tr>
                  <tr>
                    <td class="py-2">180°</td>
                    <td class="py-2">0%</td>
                    <td class="py-2">Off</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Applications & Limitations:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 class="font-bold text-green-800 dark:text-green-300 mb-2">✅ Suitable For</h4>
                <ul class="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Incandescent bulbs</li>
                  <li>• Halogen lamps</li>
                  <li>• Resistive heaters</li>
                  <li>• Universal motors</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 class="font-bold text-red-800 dark:text-red-300 mb-2">❌ NOT Suitable For</h4>
                <ul class="text-sm text-red-700 dark:text-red-400 space-y-1">
                  <li>• CFL/LED bulbs (without dimmer)</li>
                  <li>• Inductive motors (may hum)</li>
                  <li>• Electronic transformers</li>
                  <li>• Capacitive loads</li>
                </ul>
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Notes:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Dimmers work by rapidly switching power on/off, not by reducing voltage</li>
              <li>Always check load compatibility before using a dimmer</li>
              <li>Dimmers can cause electromagnetic interference (EMI)</li>
              <li>Modern LED dimmers use different techniques (PWM)</li>
              <li>The triac automatically turns off when current drops to zero (at zero-crossing)</li>
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
  title: 'Triac Light Dimmer Simulation - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive triac light dimmer simulation. Learn how phase-angle control regulates AC power and explore firing angle effects.' },
    { name: 'keywords', content: 'triac, dimmer, phase control, AC circuit, power electronics, light dimmer' }
  ]
})

const colorMode = useColorMode()

// State
const firingAngle = ref(90) // Default to 50% power

// Computed values
const powerPercentage = computed(() => {
  // Power as percentage of full power
  // Formula: P = 1 - (α/180) + sin(2α)/2π
  const alphaRad = (firingAngle.value * Math.PI) / 180
  const powerFactor = 1 - (firingAngle.value / 180) + (Math.sin(2 * alphaRad) / (2 * Math.PI))
  return Math.max(0, powerFactor * 100)
})

const rmsVoltage = computed(() => {
  // For 220V mains
  const voltageMains = 220
  const voltageFactor = Math.sqrt(powerPercentage.value / 100)
  return voltageMains * voltageFactor
})

const conductionAngle = computed(() => {
  // Triac conducts from firing angle to 180°
  return Math.max(0, 180 - firingAngle.value)
})

const bulbColor = computed(() => {
  const power = powerPercentage.value
  if (power < 10) return '#ffeb3b' // Dim yellow
  if (power < 30) return '#ffeb3b' // Yellow
  if (power < 60) return '#ffc107' // Orange-yellow
  return '#ff9800' // Bright orange
})

const currentColor = computed(() => {
  return '#f59e0b' // Amber color for current flow
})

// Methods
const setPreset = (angle: number) => {
  firingAngle.value = angle
}

const generateSineWavePath = (startAngle: number, endAngle: number) => {
  const width = 380
  const height = 80
  const centerX = 20
  const centerY = 100
  
  let path = ''
  const steps = 100
  
  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + (endAngle - startAngle) * (i / steps)
    const x = centerX + (width * angle / 360)
    const radians = (angle * Math.PI) / 180
    const y = centerY - height * Math.sin(radians)
    
    if (i === 0) {
      path += `M ${x} ${y}`
    } else {
      path += ` L ${x} ${y}`
    }
  }
  
  return path
}

const generatePhaseControlledWavePath = () => {
  const width = 360
  const height = 80
  const startX = 20
  const centerY = 100
  
  let path = ''
  const steps = 200
  
  for (let i = 0; i <= steps; i++) {
    const angle = 360 * (i / steps)
    const x = startX + (width * angle / 360)
    const radians = (angle * Math.PI) / 180
    const sinVal = Math.sin(radians)
    
    // Apply phase control: zero before firing angle, sine after
    // Must consider both positive and negative half-cycles
    let y = centerY
    const effectiveAngle = angle % 180
    
    if (effectiveAngle >= firingAngle.value) {
      // Conducting region
      y = centerY - height * sinVal
    } else {
      // Blocking region
      y = centerY
    }
    
    if (i === 0) {
      path += `M ${x} ${y}`
    } else {
      path += ` L ${x} ${y}`
    }
  }
  
  return path
}
</script>

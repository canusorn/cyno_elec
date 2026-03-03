<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          🔬 Magnetic Hysteresis Loop Simulation
        </h1>
        <p class="text-purple-200 text-lg">
          Explore magnetic material behavior, saturation, and hysteresis loss
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-2 gap-6 mb-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
            <span class="mr-2">⚙️</span> Parameters
          </h2>

          <!-- Material Selection -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              🧲 Core Material
            </label>
            <select v-model="material" @change="updateMaterial" 
                    class="w-full bg-slate-800 text-white rounded-lg px-4 py-3 border border-purple-500/50 focus:border-purple-400 focus:outline-none">
              <option value="siliconSteel">Silicon Steel (Transformer)</option>
              <option value="ferrite">Ferrite (High Frequency)</option>
              <option value="iron">Soft Iron (DC)</option>
              <option value="muMetal">Mu-Metal (Shielding)</option>
              <option value="neodymium">Neodymium (Permanent)</option>
            </select>
          </div>

          <!-- Saturation Flux Density -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              Saturation Flux Density (Bsat): {{ saturation.toFixed(3) }} T
            </label>
            <input type="range" v-model.number="saturation" min="0.5" max="2.5" step="0.1"
                   class="w-full accent-purple-500">
            <div class="flex justify-between text-sm text-purple-300 mt-1">
              <span>0.5 T</span>
              <span>2.5 T</span>
            </div>
          </div>

          <!-- Coercivity -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              Coercivity (Hc): {{ coercivity.toFixed(1) }} A/m
            </label>
            <input type="range" v-model.number="coercivity" min="10" max="1000" step="10"
                   class="w-full accent-purple-500">
            <div class="flex justify-between text-sm text-purple-300 mt-1">
              <span>10 A/m</span>
              <span>1000 A/m</span>
            </div>
          </div>

          <!-- Remanence -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              Remanence (Br): {{ remanence.toFixed(3) }} T
            </label>
            <input type="range" v-model.number="remanence" min="0.1" max="2.0" step="0.1"
                   class="w-full accent-purple-500">
            <div class="flex justify-between text-sm text-purple-300 mt-1">
              <span>0.1 T</span>
              <span>2.0 T</span>
            </div>
          </div>

          <!-- Relative Permeability -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              Relative Permeability (μr): {{ permeability.toFixed(0) }}
            </label>
            <input type="range" v-model.number="permeability" min="100" max="10000" step="100"
                   class="w-full accent-purple-500">
            <div class="flex justify-between text-sm text-purple-300 mt-1">
              <span>100</span>
              <span>10000</span>
            </div>
          </div>

          <!-- Frequency -->
          <div class="mb-4">
            <label class="block text-purple-200 mb-2 font-semibold">
              AC Frequency: {{ frequency.toFixed(1) }} Hz
            </label>
            <input type="range" v-model.number="frequency" min="0.5" max="10" step="0.5"
                   class="w-full accent-purple-500">
            <div class="flex justify-between text-sm text-purple-300 mt-1">
              <span>0.5 Hz</span>
              <span>10 Hz</span>
            </div>
          </div>

          <!-- Animation Controls -->
          <div class="flex gap-3 mt-6">
            <button @click="isRunning = !isRunning" 
                    :class="`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-all ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`">
              {{ isRunning ? '⏸️ Pause' : '▶️ Start' }}
            </button>
            <button @click="resetAnimation"
                    class="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-bold transition-all">
              🔄 Reset
            </button>
          </div>
        </div>

        <!-- Visualization Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
            <span class="mr-2">📊</span> B-H Hysteresis Loop
          </h2>

          <!-- SVG Hysteresis Curve -->
          <div class="relative bg-slate-900 rounded-xl p-4">
            <svg viewBox="0 0 400 400" class="w-full h-auto">
              <!-- Grid -->
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(168, 85, 247, 0.1)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />

              <!-- Axis Labels -->
              <text x="200" y="390" text-anchor="middle" class="fill-purple-300 text-sm font-semibold">
                Magnetic Field H (A/m)
              </text>
              <text x="20" y="200" text-anchor="middle" transform="rotate(-90, 20, 200)" 
                    class="fill-purple-300 text-sm font-semibold">
                Flux Density B (T)
              </text>

              <!-- Zero Lines -->
              <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(168, 85, 247, 0.5)" stroke-width="2" />
              <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(168, 85, 247, 0.5)" stroke-width="2" />

              <!-- Hysteresis Loop Path -->
              <path :d="hysteresisPath" fill="none" stroke="#a855f7" stroke-width="3" 
                    class="drop-shadow-lg" />
              
              <!-- Current Operating Point -->
              <circle :cx="200 + currentH * 0.15" :cy="200 - currentB * 60" r="8" 
                      fill="#fbbf24" class="drop-shadow-lg">
                <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
              </circle>

              <!-- Key Points Labels -->
              <text :x="200 + coercivity * 0.15" y="240" text-anchor="middle" 
                    class="fill-red-400 text-xs font-semibold">
                -Hc
              </text>
              <text :x="200 - coercivity * 0.15" y="240" text-anchor="middle" 
                    class="fill-red-400 text-xs font-semibold">
                +Hc
              </text>
              <text :x="235" y="205 - remanence * 60" 
                    class="fill-green-400 text-xs font-semibold">
                +Br
              </text>
              <text :x="235" y="205 + remanence * 60" 
                    class="fill-green-400 text-xs font-semibold">
                -Br
              </text>
            </svg>
          </div>

          <!-- Current Values Display -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="bg-slate-900/50 rounded-lg p-3 text-center">
              <p class="text-purple-300 text-sm">H (Field)</p>
              <p class="text-2xl font-bold text-white">{{ currentH.toFixed(1) }} A/m</p>
            </div>
            <div class="bg-slate-900/50 rounded-lg p-3 text-center">
              <p class="text-purple-300 text-sm">B (Flux)</p>
              <p class="text-2xl font-bold text-white">{{ currentB.toFixed(3) }} T</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics & Analysis -->
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
          <h3 class="text-orange-300 font-semibold mb-2">🔥 Hysteresis Loss</h3>
          <p class="text-3xl font-bold text-white">{{ hysteresisLoss.toFixed(3) }} J/m³</p>
          <p class="text-orange-200 text-sm mt-1">per cycle</p>
        </div>

        <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
          <h3 class="text-blue-300 font-semibold mb-2">⚡ Power Loss</h3>
          <p class="text-3xl font-bold text-white">{{ powerLoss.toFixed(2) }} W/m³</p>
          <p class="text-blue-200 text-sm mt-1">at {{ frequency }} Hz</p>
        </div>

        <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
          <h3 class="text-green-300 font-semibold mb-2">📐 Loop Area</h3>
          <p class="text-3xl font-bold text-white">{{ loopArea.toFixed(0) }} units²</p>
          <p class="text-green-200 text-sm mt-1">energy indicator</p>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">📚</span> Understanding Hysteresis
        </h2>

        <div class="space-y-4 text-purple-100">
          <div>
            <h3 class="text-lg font-bold text-purple-300 mb-2">🧮 What is Hysteresis?</h3>
            <p>
              Magnetic hysteresis is the lag between the application of a magnetic field (H) and the resulting 
              magnetization (B) in a ferromagnetic material. This creates a loop when plotted on a B-H graph.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-bold text-purple-300 mb-2">🔑 Key Parameters:</h3>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>Bsat (Saturation):</strong> Maximum flux density material can achieve</li>
              <li><strong>Hc (Coercivity):</strong> Reverse field needed to demagnetize (width of loop)</li>
              <li><strong>Br (Remanence):</strong> Remaining flux when H = 0 (height of loop)</li>
              <li><strong>μr (Permeability):</strong> How easily material magnetizes (slope in linear region)</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-purple-300 mb-2">⚡ Energy Loss:</h3>
            <p>
              The area inside the hysteresis loop represents energy loss per cycle as heat. This is why:
            </p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Transformers get warm during operation</li>
              <li>High-frequency cores need special materials (ferrite)</li>
              <li>Soft magnetic materials have narrow loops (less loss)</li>
              <li>Permanent magnets have wide loops (high coercivity)</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-purple-300 mb-2">🧲 Material Types:</h3>
            <div class="grid md:grid-cols-2 gap-3 mt-2">
              <div class="bg-slate-800/50 rounded-lg p-3">
                <strong class="text-green-400">Soft Magnetic:</strong>
                <p class="text-sm">Low coercivity, narrow loop → Transformers, inductors, motors</p>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-3">
                <strong class="text-blue-400">Hard Magnetic:</strong>
                <p class="text-sm">High coercivity, wide loop → Permanent magnets</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold text-purple-300 mb-2">📝 Applications:</h3>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><strong>Power Transformers:</strong> Silicon steel cores (low loss at 50/60Hz)</li>
              <li><strong>SMPS Transformers:</strong> Ferrite cores (low loss at high frequency)</li>
              <li><strong>Magnetic Shielding:</strong> Mu-metal (high permeability)</li>
              <li><strong>Permanent Magnets:</strong> Neodymium (high coercivity)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Formulas -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
        <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
          <span class="mr-2">🧮</span> Key Formulas
        </h2>

        <div class="space-y-4">
          <div class="bg-slate-900/50 rounded-lg p-4">
            <h3 class="text-purple-300 font-semibold mb-2">Hysteresis Loss (Steinmetz Equation)</h3>
            <div class="text-white font-mono text-lg">
              P_h = k_h × f × B_max^n
            </div>
            <p class="text-purple-200 text-sm mt-2">
              Where k_h and n are material constants, f is frequency, B_max is peak flux density
            </p>
          </div>

          <div class="bg-slate-900/50 rounded-lg p-4">
            <h3 class="text-purple-300 font-semibold mb-2">Permeability</h3>
            <div class="text-white font-mono text-lg">
              μ = μ_0 × μ_r = B / H
            </div>
            <p class="text-purple-200 text-sm mt-2">
              μ₀ = 4π × 10⁻⁷ H/m (permeability of free space)
            </p>
          </div>

          <div class="bg-slate-900/50 rounded-lg p-4">
            <h3 class="text-purple-300 font-semibold mb-2">Energy Loss per Cycle</h3>
            <div class="text-white font-mono text-lg">
              W = ∮ H dB
            </div>
            <p class="text-purple-200 text-sm mt-2">
              Area enclosed by the hysteresis loop (line integral around closed path)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Material presets
const materials = {
  siliconSteel: { saturation: 2.0, coercivity: 50, remanence: 1.2, permeability: 5000 },
  ferrite: { saturation: 0.4, coercivity: 15, remanence: 0.2, permeability: 2000 },
  iron: { saturation: 2.2, coercivity: 80, remanence: 1.0, permeability: 5000 },
  muMetal: { saturation: 0.8, coercivity: 4, remanence: 0.5, permeability: 10000 },
  neodymium: { saturation: 1.4, coercivity: 900, remanence: 1.2, permeability: 1000 }
}

// State variables
const material = ref('siliconSteel')
const saturation = ref(2.0)
const coercivity = ref(50)
const remanence = ref(1.2)
const permeability = ref(5000)
const frequency = ref(1.0)
const isRunning = ref(true)
const animationProgress = ref(0)
let animationFrame = null
let lastTime = 0

// Current operating point
const currentH = computed(() => {
  const angle = animationProgress.value * 2 * Math.PI
  return coercivity.value * 3 * Math.sin(angle)
})

const currentB = computed(() => {
  const angle = animationProgress.value * 2 * Math.PI
  const H = currentH.value
  const Hc = coercivity.value
  const Br = remanence.value
  const Bsat = saturation.value
  
  // Simplified hysteresis model
  const sign = Math.sin(angle) >= 0 ? 1 : -1
  const normalizedH = Math.abs(H) / (Hc * 3)
  const B = sign * (Br + (Bsat - Br) * Math.pow(1 - Math.exp(-normalizedH), 0.5))
  
  return B
})

// Hysteresis loop path for SVG
const hysteresisPath = computed(() => {
  const points = []
  const segments = 100
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI
    const H = coercivity.value * 3 * Math.sin(angle)
    const Hc = coercivity.value
    const Br = remanence.value
    const Bsat = saturation.value
    
    const sign = Math.sin(angle) >= 0 ? 1 : -1
    const normalizedH = Math.abs(H) / (Hc * 3)
    const B = sign * (Br + (Bsat - Br) * Math.pow(1 - Math.exp(-normalizedH), 0.5))
    
    const x = 200 + H * 0.15
    const y = 200 - B * 60
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`)
  }
  
  return points.join(' ')
})

// Calculated statistics
const hysteresisLoss = computed(() => {
  // Simplified area calculation (proportional to actual loss)
  return 4 * coercivity.value * remanence.value / 1000
})

const powerLoss = computed(() => {
  return hysteresisLoss.value * frequency.value
})

const loopArea = computed(() => {
  return coercivity.value * remanence.value * 10
})

// Material update
const updateMaterial = () => {
  const mat = materials[material.value]
  saturation.value = mat.saturation
  coercivity.value = mat.coercivity
  remanence.value = mat.remanence
  permeability.value = mat.permeability
}

// Animation loop
const animate = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const delta = (timestamp - lastTime) / 1000
  lastTime = timestamp

  if (isRunning.value) {
    animationProgress.value += frequency.value * delta * 0.5
    if (animationProgress.value >= 1) {
      animationProgress.value = 0
    }
  }

  animationFrame = requestAnimationFrame(animate)
}

const resetAnimation = () => {
  animationProgress.value = 0
  isRunning.value = false
  setTimeout(() => isRunning.value = true, 100)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

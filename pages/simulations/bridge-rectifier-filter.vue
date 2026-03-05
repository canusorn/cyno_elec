<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const acVoltage = ref(12)
const loadResistance = ref(100)
const capacitorValue = ref(1000)
const diodeDrop = ref(0.7)
const lineFrequency = ref(60)
const animationSpeed = ref(1)
const isRunning = ref(true)
const time = ref(0)

let animationFrame: number | null = null
let lastTimestamp = 0

const startAnimation = () => {
  isRunning.value = true
  lastTimestamp = performance.now()
  animate()
}

const stopAnimation = () => {
  isRunning.value = false
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const reset = () => {
  time.value = 0
}

const animate = (timestamp = 0) => {
  if (!isRunning.value) return
  
  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp
  
  time.value += (deltaTime / 1000) * animationSpeed.value
  
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})

const dcVoltage = computed(() => {
  return acVoltage.value * Math.sqrt(2) - 2 * diodeDrop.value
})

const rippleVoltage = computed(() => {
  const peakVoltage = acVoltage.value * Math.sqrt(2) - 2 * diodeDrop.value
  const freq = lineFrequency.value * 2
  const dischargeTime = 1 / freq
  const dischargeCurrent = peakVoltage / loadResistance.value
  const ripple = (dischargeCurrent * dischargeTime) / (capacitorValue.value * 1e-6)
  return Math.min(ripple, peakVoltage)
})

const avgDcVoltage = computed(() => {
  return dcVoltage.value - rippleVoltage.value / 2
})

const ripplePercentage = computed(() => {
  return (rippleVoltage.value / avgDcVoltage.value) * 100
})

const avgLoadCurrent = computed(() => {
  return avgDcVoltage.value / loadResistance.value
})

const peakDiodeCurrent = computed(() => {
  const peakVoltage = acVoltage.value * Math.sqrt(2)
  const rippleTime = (rippleVoltage.value * capacitorValue.value * 1e-6) / (avgDcVoltage.value / loadResistance.value)
  const capacitorCurrent = (capacitorValue.value * 1e-6 * 2 * Math.PI * lineFrequency.value * 2 * peakVoltage) / 1000
  return avgLoadCurrent.value + capacitorCurrent
})

const rmsDiodeCurrent = computed(() => {
  return peakDiodeCurrent.value * 0.5
})

const voltageRegulation = computed(() => {
  const peakVoltage = acVoltage.value * Math.sqrt(2) - 2 * diodeDrop.value
  const noLoadVoltage = peakVoltage
  return ((noLoadVoltage - avgDcVoltage.value) / noLoadVoltage) * 100
})

const dischargeTimeConstant = computed(() => {
  return loadResistance.value * capacitorValue.value * 1e-6
})

const waveformData = computed(() => {
  const points = []
  const samples = 300
  const period = 1 / lineFrequency.value
  const dt = (period * 2) / samples
  
  for (let i = 0; i < samples; i++) {
    const t = (time.value * 0.5) + (i * dt)
    const acInstant = acVoltage.value * Math.sqrt(2) * Math.sin(2 * Math.PI * lineFrequency.value * t)
    
    const rectifiedInstant = Math.abs(acInstant) - 2 * diodeDrop.value
    const freq = lineFrequency.value * 2
    const phase = (t * freq) % (1 / freq)
    
    let filteredInstant = 0
    const peakV = acVoltage.value * Math.sqrt(2) - 2 * diodeDrop.value
    
    if (capacitorValue.value > 0) {
      const dischargeStart = Math.asin(Math.max(0, (peakV - rippleVoltage.value) / peakV)) / (2 * Math.PI * freq)
      const timeInCycle = (t * freq) % (1 / freq)
      
      if (timeInCycle < dischargeStart) {
        filteredInstant = peakV
      } else {
        const dischargeTime = timeInCycle - dischargeStart
        filteredInstant = Math.max(peakV - rippleVoltage.value, peakV * Math.exp(-dischargeTime * freq * 3))
      }
    } else {
      filteredInstant = Math.max(0, rectifiedInstant)
    }
    
    points.push({
      t: i,
      ac: acInstant,
      rectified: Math.max(0, rectifiedInstant),
      filtered: Math.max(peakV - rippleVoltage.value, filteredInstant)
    })
  }
  
  return points
})

const svgPathAc = computed(() => {
  return waveformData.value.map((p, i) => {
    const x = 50 + (i / 300) * 700
    const y = 150 - (p.ac / (acVoltage.value * Math.sqrt(2) * 1.5)) * 60
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
})

const svgPathRectified = computed(() => {
  return waveformData.value.map((p, i) => {
    const x = 50 + (i / 300) * 700
    const y = 150 - (p.rectified / (acVoltage.value * Math.sqrt(2) * 1.5)) * 60
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
})

const svgPathFiltered = computed(() => {
  return waveformData.value.map((p, i) => {
    const x = 50 + (i / 300) * 700
    const base = 150
    const peak = acVoltage.value * Math.sqrt(2) - 2 * diodeDrop.value
    const y = base - (p.filtered / peak) * 100
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          Bridge Rectifier with Capacitor Filter
        </h1>
        <p class="text-slate-400">Interactive simulation of AC-to-DC power conversion with filtering</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 text-sm">⚡</span>
              Circuit Parameters
            </h2>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>AC Input Voltage (RMS)</span>
                <span class="text-blue-400">{{ acVoltage.toFixed(1) }}V</span>
              </label>
              <input
                type="range"
                v-model.number="acVoltage"
                min="5"
                max="24"
                step="0.5"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>5V</span>
                <span>24V</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Filter Capacitor</span>
                <span class="text-cyan-400">{{ capacitorValue.toFixed(0) }}µF</span>
              </label>
              <input
                type="range"
                v-model.number="capacitorValue"
                min="0"
                max="10000"
                step="100"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>0µF</span>
                <span>10000µF</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Load Resistance</span>
                <span class="text-green-400">{{ loadResistance.toFixed(0) }}Ω</span>
              </label>
              <input
                type="range"
                v-model.number="loadResistance"
                min="10"
                max="1000"
                step="10"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>10Ω</span>
                <span>1kΩ</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Diode Forward Voltage</span>
                <span class="text-yellow-400">{{ diodeDrop.toFixed(1) }}V</span>
              </label>
              <input
                type="range"
                v-model.number="diodeDrop"
                min="0.3"
                max="1.2"
                step="0.1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div class="flex justify-between text-xs text-slate-500 mt-1">
                <span>0.3V</span>
                <span>1.2V</span>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Line Frequency</span>
                <span class="text-purple-400">{{ lineFrequency.toFixed(0) }}Hz</span>
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="lineFrequency = 50"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                    lineFrequency === 50 ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  50Hz
                </button>
                <button
                  @click="lineFrequency = 60"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                    lineFrequency === 60 ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  60Hz
                </button>
              </div>
            </div>

            <div class="mb-5">
              <label class="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Animation Speed</span>
                <span class="text-orange-400">{{ animationSpeed.toFixed(1) }}x</span>
              </label>
              <input
                type="range"
                v-model.number="animationSpeed"
                min="0.1"
                max="3"
                step="0.1"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div class="flex gap-2">
              <button
                @click="isRunning ? stopAnimation() : startAnimation()"
                :class="[
                  'flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all',
                  isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                ]"
              >
                {{ isRunning ? '⏸ Pause' : '▶ Play' }}
              </button>
              <button
                @click="reset"
                class="flex-1 px-4 py-2 text-sm font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                ↺ Reset
              </button>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-3">Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="acVoltage = 12; loadResistance = 100; capacitorValue = 1000; diodeDrop = 0.7"
                class="px-3 py-2 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                🎯 Typical 12V
              </button>
              <button
                @click="acVoltage = 24; loadResistance = 500; capacitorValue = 4700; diodeDrop = 0.7"
                class="px-3 py-2 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                🎯 High V
              </button>
              <button
                @click="acVoltage = 9; loadResistance = 50; capacitorValue = 2200; diodeDrop = 0.7"
                class="px-3 py-2 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                🎯 Heavy Load
              </button>
              <button
                @click="capacitorValue = 0"
                class="px-3 py-2 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
              >
                🎯 No Filter
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur rounded-xl p-5 border border-blue-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-blue-300 text-sm font-medium">DC Output Voltage</span>
                <span class="text-2xl">📊</span>
              </div>
              <div class="text-3xl font-bold text-blue-400 mb-1">
                {{ avgDcVoltage.toFixed(2) }}V
              </div>
              <div class="text-xs text-slate-400">
                Average output voltage
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-900/40 to-orange-800/20 backdrop-blur rounded-xl p-5 border border-orange-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-orange-300 text-sm font-medium">Ripple Voltage</span>
                <span class="text-2xl">🌊</span>
              </div>
              <div class="text-3xl font-bold text-orange-400 mb-1">
                {{ rippleVoltage.toFixed(3) }}V
              </div>
              <div class="text-xs text-slate-400">
                Peak-to-peak ripple: {{ ripplePercentage.toFixed(1) }}%
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur rounded-xl p-5 border border-green-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-green-300 text-sm font-medium">Load Current</span>
                <span class="text-2xl">⚡</span>
              </div>
              <div class="text-3xl font-bold text-green-400 mb-1">
                {{ avgLoadCurrent.toFixed(2) }}A
              </div>
              <div class="text-xs text-slate-400">
                Average DC current
              </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 backdrop-blur rounded-xl p-5 border border-cyan-700/50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-cyan-300 text-sm font-medium">Voltage Regulation</span>
                <span class="text-2xl">📉</span>
              </div>
              <div class="text-3xl font-bold mb-1"
                   :class="voltageRegulation < 10 ? 'text-green-400' : voltageRegulation < 20 ? 'text-yellow-400' : 'text-red-400'">
                {{ voltageRegulation.toFixed(1) }}%
              </div>
              <div class="text-xs text-slate-400">
                Load regulation (lower is better)
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Waveform Visualization</h3>
            <div class="relative">
              <svg viewBox="0 0 800 200" class="w-full h-48">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="800" height="200" fill="url(#grid)" />
                
                <line x1="50" y1="150" x2="750" y2="150" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                
                <path :d="svgPathAc" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7"/>
                
                <path :d="svgPathRectified" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.7"/>
                
                <path :d="svgPathFiltered + ' L 750 200 L 50 200 Z'" fill="#22c55e" opacity="0.15"/>
                <path :d="svgPathFiltered" fill="none" stroke="#22c55e" stroke-width="2.5"/>
                
                <g transform="translate(580, 20)">
                  <rect x="0" y="0" width="200" height="90" fill="rgba(15, 23, 42, 0.8)" rx="8"/>
                  
                  <line x1="15" y1="20" x2="45" y2="20" stroke="#ef4444" stroke-width="2"/>
                  <text x="55" y="24" fill="#ef4444" font-size="11" font-weight="bold">AC Input</text>
                  
                  <line x1="15" y1="45" x2="45" y2="45" stroke="#3b82f6" stroke-width="2"/>
                  <text x="55" y="49" fill="#3b82f6" font-size="11" font-weight="bold">Rectified</text>
                  
                  <line x1="15" y1="70" x2="45" y2="70" stroke="#22c55e" stroke-width="2.5"/>
                  <text x="55" y="74" fill="#22c55e" font-size="11" font-weight="bold">Filtered DC</text>
                </g>
                
                <text x="400" y="195" text-anchor="middle" fill="#94a3b8" font-size="11">Time →</text>
                <text x="20" y="100" text-anchor="middle" fill="#94a3b8" font-size="11" transform="rotate(-90, 20, 100)">Voltage →</text>
              </svg>
            </div>
            
            <div class="flex justify-center gap-6 mt-3 text-xs">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-red-500"></div>
                <span class="text-slate-300">AC Input ({{ acVoltage }}V RMS)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-blue-500"></div>
                <span class="text-slate-300">Rectified</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded bg-green-500"></div>
                <span class="text-slate-300">Filtered DC ({{ avgDcVoltage.toFixed(1) }}V avg)</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Circuit Diagram</h3>
            <div class="flex justify-center">
              <svg viewBox="0 0 500 280" class="w-full max-w-lg">
                <circle cx="60" cy="140" r="30" fill="none" stroke="#ef4444" stroke-width="2"/>
                <path d="M 45 140 Q 52 130, 60 140 Q 68 150, 75 140" fill="none" stroke="#ef4444" stroke-width="2"/>
                <text x="60" y="105" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">AC</text>
                <text x="60" y="185" text-anchor="middle" fill="#ef4444" font-size="10">{{ acVoltage }}V</text>
                
                <line x1="90" y1="125" x2="110" y2="125" stroke="#f97316" stroke-width="2"/>
                <line x1="90" y1="155" x2="110" y2="155" stroke="#f97316" stroke-width="2"/>
                <circle cx="130" cy="125" r="15" fill="none" stroke="#f97316" stroke-width="2"/>
                <circle cx="130" cy="155" r="15" fill="none" stroke="#f97316" stroke-width="2"/>
                <line x1="150" y1="125" x2="170" y2="125" stroke="#f97316" stroke-width="2"/>
                <line x1="150" y1="155" x2="170" y2="155" stroke="#f97316" stroke-width="2"/>
                <text x="130" y="105" text-anchor="middle" fill="#f97316" font-size="10">Transformer</text>
                
                <g transform="translate(200, 100)">
                  <path d="M 0 40 L 40 0 L 80 40 L 40 80 Z" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
                  
                  <line x1="35" y1="5" x2="45" y2="5" stroke="#3b82f6" stroke-width="2"/>
                  <polygon points="45,0 45,10 55,5" fill="#3b82f6"/>
                  <line x1="55" y1="5" x2="60" y2="5" stroke="#3b82f6" stroke-width="2"/>
                  
                  <line x1="35" y1="75" x2="45" y2="75" stroke="#3b82f6" stroke-width="2"/>
                  <polygon points="45,70 45,80 55,75" fill="#3b82f6"/>
                  <line x1="55" y1="75" x2="60" y2="75" stroke="#3b82f6" stroke-width="2"/>
                  
                  <line x1="5" y1="35" x2="5" y2="45" stroke="#3b82f6" stroke-width="2"/>
                  <polygon points="0,45 10,45 5,55" fill="#3b82f6"/>
                  <line x1="5" y1="55" x2="5" y2="60" stroke="#3b82f6" stroke-width="2"/>
                  
                  <line x1="75" y1="35" x2="75" y2="45" stroke="#3b82f6" stroke-width="2"/>
                  <polygon points="70,45 80,45 75,55" fill="#3b82f6"/>
                  <line x1="75" y1="55" x2="75" y2="60" stroke="#3b82f6" stroke-width="2"/>
                  
                  <text x="40" y="-10" text-anchor="middle" fill="#3b82f6" font-size="10" font-weight="bold">Bridge</text>
                </g>
                
                <line x1="170" y1="125" x2="200" y2="125" stroke="#f97316" stroke-width="2"/>
                <line x1="170" y1="155" x2="200" y2="155" stroke="#f97316" stroke-width="2"/>
                
                <line x1="280" y1="140" x2="330" y2="140" stroke="#22c55e" stroke-width="2"/>
                <line x1="330" y1="120" x2="330" y2="160" stroke="#22c55e" stroke-width="3"/>
                <line x1="335" y1="120" x2="335" y2="160" stroke="#22c55e" stroke-width="3"/>
                <line x1="335" y1="140" x2="370" y2="140" stroke="#22c55e" stroke-width="2"/>
                <text x="332" y="110" text-anchor="middle" fill="#22c55e" font-size="10">{{ capacitorValue }}µF</text>
                
                <line x1="370" y1="140" x2="400" y2="140" stroke="#a855f7" stroke-width="2"/>
                <rect x="400" y="130" width="50" height="20" fill="none" stroke="#a855f7" stroke-width="2"/>
                <path d="M 405 130 L 410 135 L 415 125 L 420 135 L 425 125 L 430 135 L 435 125 L 440 135 L 445 130" fill="none" stroke="#a855f7" stroke-width="1.5"/>
                <line x1="450" y1="140" x2="480" y2="140" stroke="#a855f7" stroke-width="2"/>
                <text x="425" y="120" text-anchor="middle" fill="#a855f7" font-size="10">{{ loadResistance }}Ω</text>
                
                <line x1="425" y1="150" x2="425" y2="165" stroke="#94a3b8" stroke-width="2"/>
                <line x1="415" y1="165" x2="435" y2="165" stroke="#94a3b8" stroke-width="2"/>
                <line x1="418" y1="170" x2="432" y2="170" stroke="#94a3b8" stroke-width="2"/>
                <line x1="421" y1="175" x2="429" y2="175" stroke="#94a3b8" stroke-width="2"/>
                
                <text x="465" y="125" text-anchor="middle" fill="#22c55e" font-size="11" font-weight="bold">+ V_out</text>
              </svg>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <h3 class="text-lg font-semibold mb-4">Detailed Calculations</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-slate-300 mb-3">Voltage Analysis</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Peak AC voltage</span>
                    <span class="text-white font-mono">{{ (acVoltage * Math.sqrt(2)).toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Peak rectified</span>
                    <span class="text-white font-mono">{{ dcVoltage.toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Average DC output</span>
                    <span class="text-green-400 font-mono font-bold">{{ avgDcVoltage.toFixed(2) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Ripple voltage (p-p)</span>
                    <span class="text-orange-400 font-mono font-bold">{{ rippleVoltage.toFixed(3) }}V</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Ripple percentage</span>
                    <span class="text-white font-mono">{{ ripplePercentage.toFixed(2) }}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-slate-300 mb-3">Current Analysis</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Average load current</span>
                    <span class="text-white font-mono">{{ avgLoadCurrent.toFixed(3) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Peak diode current</span>
                    <span class="text-white font-mono">{{ peakDiodeCurrent.toFixed(3) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">RMS diode current</span>
                    <span class="text-white font-mono">{{ rmsDiodeCurrent.toFixed(3) }}A</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Discharge time constant</span>
                    <span class="text-white font-mono">{{ (dischargeTimeConstant * 1000).toFixed(2) }}ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-slate-700">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <span class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 text-sm">📚</span>
          Bridge Rectifier Fundamentals
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-medium text-blue-400 mb-3">How It Works</h3>
            <p class="text-slate-300 text-sm leading-relaxed mb-3">
              A bridge rectifier converts alternating current (AC) to direct current (DC) using four diodes arranged in a diamond configuration. During each half-cycle of the AC input, two diodes conduct, allowing current to flow through the load in the same direction.
            </p>
            <p class="text-slate-300 text-sm leading-relaxed mb-3">
              The filter capacitor stores energy during the peaks and releases it during the valleys, significantly reducing ripple. The capacitor charges when the rectified voltage exceeds the capacitor voltage and discharges through the load when the rectified voltage drops below.
            </p>
            <h4 class="text-md font-medium text-cyan-400 mb-2 mt-4">Key Characteristics:</h4>
            <ul class="text-slate-300 text-sm space-y-1">
              <li>• <strong class="text-white">Full-wave rectification:</strong> Uses both half-cycles of AC</li>
              <li>• <strong class="text-white">Higher efficiency:</strong> No dead zones like half-wave rectifiers</li>
              <li>• <strong class="text-white">Ripple frequency:</strong> 2× line frequency (100/120Hz)</li>
              <li>• <strong class="text-white">Diode drop:</strong> 2× forward voltage per half-cycle</li>
              <li>• <strong class="text-white">Smoother output:</strong> Easier to filter than half-wave</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-medium text-blue-400 mb-3">Key Formulas</h3>
            <div class="space-y-3 text-sm">
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">V_peak = V_RMS × √2 - 2×V_diode</div>
                <div class="text-slate-400 text-xs">Peak output voltage</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">V_ripple = I_load / (2 × f × C)</div>
                <div class="text-slate-400 text-xs">Approximate ripple voltage</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">V_dc ≈ V_peak - V_ripple/2</div>
                <div class="text-slate-400 text-xs">Average DC output voltage</div>
              </div>
              <div class="bg-slate-900/50 p-3 rounded-lg">
                <div class="text-cyan-400 font-mono mb-1">τ = R_load × C</div>
                <div class="text-slate-400 text-xs">Discharge time constant</div>
              </div>
            </div>

            <h4 class="text-md font-medium text-yellow-400 mb-2 mt-4">Design Considerations:</h4>
            <ul class="text-slate-300 text-sm space-y-1">
              <li>• Larger capacitors reduce ripple but increase cost and size</li>
              <li>• Capacitor value should provide τ ≫ 1/(2f) for good filtering</li>
              <li>• Diodes must handle peak forward current and reverse voltage</li>
              <li>• Diode PIV rating > V_peak RMS × √2</li>
              <li>• Consider low-ESR capacitors for high-current applications</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
          <h4 class="text-md font-medium text-orange-400 mb-2">💡 Practical Tips</h4>
          <ul class="text-slate-300 text-sm space-y-2">
            <li>• Add a small ceramic capacitor (0.1µF) in parallel with the electrolytic for high-frequency filtering</li>
            <li>• Use a voltage regulator after the rectifier for stable, regulated output</li>
            <li>• Include a bleeder resistor across the capacitor for safety when power is off</li>
            <li>• Consider the transformer's current rating - it should be ≥ 1.8× DC load current</li>
            <li>• For high-current applications, use Schottky diodes for lower voltage drop</li>
            <li>• Always check capacitor ripple current rating - it should exceed actual ripple current</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

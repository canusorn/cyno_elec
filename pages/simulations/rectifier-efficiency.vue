<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const rectifierType = ref<'half-wave' | 'full-wave-center' | 'bridge'>('bridge')
const acVoltage = ref(12)
const loadCurrent = ref(1)
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

  time.value += (deltaTime / 1000) * animationSpeed.value * 50

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})

const peakVoltage = computed(() => {
  return acVoltage.value * Math.sqrt(2)
})

const dcOutputVoltage = computed(() => {
  const Vpeak = peakVoltage.value
  switch (rectifierType.value) {
    case 'half-wave':
      return Vpeak - diodeDrop.value
    case 'full-wave-center':
      return Vpeak - diodeDrop.value
    case 'bridge':
      return Vpeak - 2 * diodeDrop.value
  }
})

const avgDcVoltage = computed(() => {
  const Vpeak = peakVoltage.value
  switch (rectifierType.value) {
    case 'half-wave':
      return (Vpeak - diodeDrop.value) / Math.PI
    case 'full-wave-center':
      return (2 * (Vpeak - diodeDrop.value)) / Math.PI
    case 'bridge':
      return (2 * (Vpeak - 2 * diodeDrop.value)) / Math.PI
  }
})

const rmsVoltage = computed(() => {
  const Vpeak = peakVoltage.value
  switch (rectifierType.value) {
    case 'half-wave':
      return Vpeak / 2
    case 'full-wave-center':
    case 'bridge':
      return Vpeak / Math.sqrt(2)
  }
})

const rippleFactor = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return 1.21
    case 'full-wave-center':
    case 'bridge':
      return 0.48
  }
})

const dcOutputPower = computed(() => {
  return avgDcVoltage.value * loadCurrent.value
})

const diodePowerLoss = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return diodeDrop.value * loadCurrent.value
    case 'full-wave-center':
      return 2 * diodeDrop.value * loadCurrent.value
    case 'bridge':
      return 2 * diodeDrop.value * loadCurrent.value
  }
})

const efficiency = computed(() => {
  const totalPower = dcOutputPower.value + diodePowerLoss.value
  return (dcOutputPower.value / totalPower) * 100
})

const transformerUtilizationFactor = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return 0.287
    case 'full-wave-center':
      return 0.693
    case 'bridge':
      return 0.812
  }
})

const rectificationEfficiency = computed(() => {
  const Vdc = avgDcVoltage.value
  const Vrms = rmsVoltage.value
  return ((Vdc / Vrms) ** 2) * 100
})

const peakInverseVoltage = computed(() => {
  const Vpeak = peakVoltage.value
  switch (rectifierType.value) {
    case 'half-wave':
      return Vpeak
    case 'full-wave-center':
      return 2 * Vpeak
    case 'bridge':
      return Vpeak
  }
})

const numberOfDiodes = computed(() => {
  switch (rectifierType.value) {
    case 'half-wave':
      return 1
    case 'full-wave-center':
      return 2
    case 'bridge':
      return 4
  }
})

const efficiencyRating = computed(() => {
  if (efficiency.value >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' }
  if (efficiency.value >= 85) return { text: 'Very Good', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-800' }
  if (efficiency.value >= 80) return { text: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' }
  if (efficiency.value >= 70) return { text: 'Fair', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900' }
  return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' }
})

const waveformPoints = computed(() => {
  const points: { x: number; y: number }[] = []
  const samples = 360
  const Vpeak = peakVoltage.value

  for (let i = 0; i < samples; i++) {
    const angle = (2 * Math.PI * i) / samples
    const timeVal = time.value / 1000
    const frequency = lineFrequency.value
    const angularFreq = 2 * Math.PI * frequency
    const phase = angularFreq * timeVal + angle
    const instantaneousVoltage = Vpeak * Math.sin(phase)

    let outputVoltage = 0
    switch (rectifierType.value) {
      case 'half-wave':
        outputVoltage = instantaneousVoltage > diodeDrop.value ? instantaneousVoltage - diodeDrop.value : 0
        break
      case 'full-wave-center':
        if (instantaneousVoltage > diodeDrop.value) {
          outputVoltage = instantaneousVoltage - diodeDrop.value
        } else if (instantaneousVoltage < -diodeDrop.value) {
          outputVoltage = -instantaneousVoltage - diodeDrop.value
        } else {
          outputVoltage = 0
        }
        break
      case 'bridge':
        if (instantaneousVoltage > 2 * diodeDrop.value) {
          outputVoltage = instantaneousVoltage - 2 * diodeDrop.value
        } else if (instantaneousVoltage < -2 * diodeDrop.value) {
          outputVoltage = -instantaneousVoltage - 2 * diodeDrop.value
        } else {
          outputVoltage = 0
        }
        break
    }

    points.push({ x: i, y: outputVoltage })
  }

  return points
})

const inputWaveformPoints = computed(() => {
  const points: { x: number; y: number }[] = []
  const samples = 360
  const Vpeak = peakVoltage.value

  for (let i = 0; i < samples; i++) {
    const angle = (2 * Math.PI * i) / samples
    const timeVal = time.value / 1000
    const frequency = lineFrequency.value
    const angularFreq = 2 * Math.PI * frequency
    const phase = angularFreq * timeVal + angle
    const voltage = Vpeak * Math.sin(phase)
    points.push({ x: i, y: voltage })
  }

  return points
})

const maxWaveformVoltage = computed(() => {
  return peakVoltage.value
})
</script>

<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <NavigationBar />

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
            Rectifier Efficiency Analyzer
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Compare different rectifier topologies with real-time efficiency analysis
          </p>

          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="flex items-center gap-4 text-xl font-mono font-bold">
              <span class="text-gray-600 dark:text-gray-400">Efficiency:</span>
              <span class="text-4xl text-primary-highlight">{{ efficiency.toFixed(1) }}%</span>
              <span :class="['px-3 py-1 rounded-full text-sm font-semibold', efficiencyRating.color, efficiencyRating.bg]">
                {{ efficiencyRating.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Rectifier Configuration</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              @click="rectifierType = 'half-wave'"
              :class="rectifierType === 'half-wave' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="p-4 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-2"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>Half-Wave</div>
              <div class="text-sm opacity-75">1 Diode</div>
            </button>
            <button
              @click="rectifierType = 'full-wave-center'"
              :class="rectifierType === 'full-wave-center' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="p-4 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-2"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>Full-Wave Center-Tap</div>
              <div class="text-sm opacity-75">2 Diodes</div>
            </button>
            <button
              @click="rectifierType = 'bridge'"
              :class="rectifierType === 'bridge' ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
              class="p-4 rounded-lg font-semibold transition-all duration-200 flex flex-col items-center gap-2"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>Bridge Rectifier</div>
              <div class="text-sm opacity-75">4 Diodes</div>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                AC Voltage (RMS): {{ acVoltage }} V
              </label>
              <input
                v-model.number="acVoltage"
                type="range"
                min="1"
                max="240"
                step="1"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1V</span>
                <span>240V</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Load Current: {{ loadCurrent }} A
              </label>
              <input
                v-model.number="loadCurrent"
                type="range"
                min="0.01"
                max="10"
                step="0.01"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>10mA</span>
                <span>10A</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Diode Drop: {{ diodeDrop }} V
              </label>
              <input
                v-model.number="diodeDrop"
                type="range"
                min="0.3"
                max="1.2"
                step="0.05"
                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
              />
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Schottky 0.3V</span>
                <span>Si 1.2V</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Line Frequency: {{ lineFrequency }} Hz
              </label>
              <div class="flex gap-2">
                <button
                  @click="lineFrequency = 50"
                  :class="lineFrequency === 50 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  50Hz
                </button>
                <button
                  @click="lineFrequency = 60"
                  :class="lineFrequency === 60 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  class="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  60Hz
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4 mt-6">
            <button
              @click="isRunning ? stopAnimation() : startAnimation()"
              class="px-6 py-3 bg-primary hover:bg-primary-highlight text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg v-if="isRunning" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ isRunning ? 'Pause' : 'Play' }}
            </button>
            <button
              @click="reset"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
              <select v-model.number="animationSpeed" class="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
                <option :value="0.25">0.25x</option>
                <option :value="0.5">0.5x</option>
                <option :value="1">1x</option>
                <option :value="2">2x</option>
                <option :value="4">4x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">AC Input Waveform</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <svg viewBox="0 0 400 200" class="w-full h-48">
                <defs>
                  <pattern id="gridInput" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-700" />
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#gridInput)" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" stroke-width="1" class="text-gray-400 dark:text-gray-600" stroke-dasharray="5,5" />
                <polyline
                  :points="inputWaveformPoints.map(p => {
                    const x = (p.x / 360) * 380 + 10
                    const y = 100 - (p.y / maxWaveformVoltage) * 80
                    return `${x},${y}`
                  }).join(' ')"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-primary"
                />
              </svg>
            </div>
            <div class="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              Input: {{ acVoltage }}V RMS ({{ peakVoltage.toFixed(1) }}V peak)
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Rectified Output Waveform</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <svg viewBox="0 0 400 200" class="w-full h-48">
                <defs>
                  <pattern id="gridOutput" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-700" />
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#gridOutput)" />
                <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" stroke-width="1" class="text-gray-400 dark:text-gray-600" stroke-dasharray="5,5" />
                <line
                  x1="0"
                  :y1="180 - (avgDcVoltage / maxWaveformVoltage) * 160"
                  x2="400"
                  :y2="180 - (avgDcVoltage / maxWaveformVoltage) * 160"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-green-500"
                  stroke-dasharray="10,5"
                />
                <polyline
                  :points="waveformPoints.map(p => {
                    const x = (p.x / 360) * 380 + 10
                    const y = 180 - (p.y / maxWaveformVoltage) * 160
                    return `${x},${y}`
                  }).join(' ')"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-pink-500"
                />
              </svg>
            </div>
            <div class="mt-3 flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Output: {{ avgDcVoltage.toFixed(2) }}V avg</span>
              <span class="text-gray-600 dark:text-gray-400">{{ rectifierType }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Analysis</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Efficiency</h4>
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-green-600 mb-2">{{ efficiency.toFixed(1) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">DC Power Output: {{ dcOutputPower.toFixed(2) }}W</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Diode Loss: {{ diodePowerLoss.toFixed(2) }}W</div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Rectification Efficiency</h4>
                <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-blue-600 mb-2">{{ rectificationEfficiency.toFixed(1) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">η = (Vdc/Vrms)² × 100</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Theoretical max efficiency</div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Transformer Utilization</h4>
                <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-purple-600 mb-2">{{ (transformerUtilizationFactor * 100).toFixed(1) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">TUF = Pdc / (Transformer VA rating)</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">How well transformer is used</div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">DC Output Voltage</h4>
                <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-orange-600 mb-2">{{ avgDcVoltage.toFixed(2) }}V</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Peak: {{ dcOutputVoltage.toFixed(2) }}V</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">RMS: {{ rmsVoltage.toFixed(2) }}V</div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl p-6 border-2 border-red-200 dark:border-red-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Ripple Factor</h4>
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-red-600 mb-2">{{ rippleFactor.toFixed(2) }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">γ = Vr(ms) / Vdc</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Lower is better</div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-700">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">Peak Inverse Voltage</h4>
                <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-teal-600 mb-2">{{ peakInverseVoltage.toFixed(1) }}V</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Max reverse voltage on diodes</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ numberOfDiodes }} diode(s) conducting</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Rectifier Efficiency</h3>

          <div class="space-y-8">
            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">📊</span> What is Rectifier Efficiency?
              </h4>
              <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                <p>Rectifier efficiency (η) measures how effectively a rectifier converts AC input power to DC output power. It's defined as:</p>
                <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 my-3 font-mono text-center text-lg">
                  η = (DC Power Output / AC Power Input) × 100%
                </div>
                <p>Higher efficiency means less power is lost as heat in the diodes, making the power supply more efficient and cooler-running.</p>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">⚖️</span> Rectifier Topology Comparison
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-gray-100 dark:bg-gray-900">
                      <th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Parameter</th>
                      <th class="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Half-Wave</th>
                      <th class="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Full-Wave Center-Tap</th>
                      <th class="px-4 py-3 text-center text-gray-700 dark:text-gray-300 font-semibold">Bridge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Number of Diodes</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">1</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">2</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">4</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">DC Output (avg)</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">Vpeak/π</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">2×Vpeak/π</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">2×Vpeak/π</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Ripple Factor</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">1.21 (high)</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">0.48 (moderate)</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">0.48 (moderate)</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Transformer Utilization</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">28.7%</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">69.3%</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">81.2%</td>
                    </tr>
                    <tr class="border-t border-gray-200 dark:border-gray-700">
                      <td class="px-4 py-3 text-gray-600 dark:text-gray-400">Peak Inverse Voltage</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">Vpeak</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">2×Vpeak</td>
                      <td class="px-4 py-3 text-center text-gray-800 dark:text-gray-200">Vpeak</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">🧮</span> Key Formulas
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">DC Output Voltage</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    Half-Wave: Vdc = Vpeak / π<br>
                    Full-Wave: Vdc = 2×Vpeak / π
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Rectification Efficiency</div>
                  <div class="font-mono text-sm text-gray-800 dark:text-gray-200">
                    η = (Vdc / Vrms)² × 100<br>
                    Max: Half-Wave 40.6%, Full-Wave 81.2%
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <span class="text-primary-highlight">🔌</span> Real-World Applications
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Power Supplies</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Converting AC mains to DC for electronic devices, computers, and appliances</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">Battery Chargers</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Converting AC to DC for charging batteries in phones, laptops, and EVs</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                  <h5 class="font-semibold text-gray-800 dark:text-gray-200 mb-2">DC Motor Drives</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Providing variable DC voltage to control motor speed in industrial applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-100 dark:bg-gray-900 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <p>Interactive educational tool for understanding rectifier efficiency and power conversion</p>
      </div>
    </footer>
  </div>
</template>

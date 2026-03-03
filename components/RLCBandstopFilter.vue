<template>
  <div class="space-y-8">
    <!-- Controls Section -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎛️ Filter Parameters</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Resistance -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Resistance (R)
          </label>
          <div class="flex items-center gap-2">
            <input 
              v-model.number="resistance" 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 min-w-[90px]">
              <input 
                v-model.number="resistance" 
                type="number" 
                min="10" 
                max="1000"
                class="w-full bg-transparent text-gray-900 dark:text-white font-mono text-sm focus:outline-none"
              />
              <span class="text-gray-500 dark:text-gray-400 text-sm">Ω</span>
            </div>
          </div>
        </div>

        <!-- Inductance -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Inductance (L)
          </label>
          <div class="flex items-center gap-2">
            <input 
              v-model.number="inductance" 
              type="range" 
              min="1" 
              max="100" 
              step="1"
              class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 min-w-[90px]">
              <input 
                v-model.number="inductance" 
                type="number" 
                min="1" 
                max="100"
                class="w-full bg-transparent text-gray-900 dark:text-white font-mono text-sm focus:outline-none"
              />
              <span class="text-gray-500 dark:text-gray-400 text-sm">mH</span>
            </div>
          </div>
        </div>

        <!-- Capacitance -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Capacitance (C)
          </label>
          <div class="flex items-center gap-2">
            <input 
              v-model.number="capacitance" 
              type="range" 
              min="0.1" 
              max="10" 
              step="0.1"
              class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 min-w-[90px]">
              <input 
                v-model.number="capacitance" 
                type="number" 
                min="0.1" 
              max="10"
              class="w-full bg-transparent text-gray-900 dark:text-white font-mono text-sm focus:outline-none"
              />
              <span class="text-gray-500 dark:text-gray-400 text-sm">µF</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Frequency Range -->
      <div class="mt-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Frequency Sweep Range
        </label>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Min</span>
            <div class="flex items-center gap-2 mt-1">
              <input 
                v-model.number="minFreq" 
                type="number" 
                min="10" 
                max="10000"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              <span class="text-gray-500 dark:text-gray-400">Hz</span>
            </div>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Max</span>
            <div class="flex items-center gap-2 mt-1">
              <input 
                v-model.number="maxFreq" 
                type="number" 
                min="100" 
                max="20000"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              />
              <span class="text-gray-500 dark:text-gray-400">Hz</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Presets -->
      <div class="mt-6 flex gap-2 flex-wrap">
        <button 
          @click="setPreset('low')"
          class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          Low Freq (50-500 Hz)
        </button>
        <button 
          @click="setPreset('mid')"
          class="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          Audio (100-10k Hz)
        </button>
        <button 
          @click="setPreset('high')"
          class="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          RF (1k-20k Hz)
        </button>
      </div>
    </div>

    <!-- Results Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-blue-100 text-sm font-medium">Center Frequency</span>
          <svg class="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div class="text-3xl font-bold">{{ formatFreq(centerFreq) }}</div>
        <div class="text-blue-100 text-sm mt-1">f₀ = 1/(2π√LC)</div>
      </div>

      <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-red-100 text-sm font-medium">Bandwidth</span>
          <svg class="h-5 w-5 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div class="text-3xl font-bold">{{ formatFreq(bandwidth) }}</div>
        <div class="text-red-100 text-sm mt-1">BW = R/L</div>
      </div>

      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-green-100 text-sm font-medium">Lower Cutoff</span>
          <svg class="h-5 w-5 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div class="text-3xl font-bold">{{ formatFreq(lowerCutoff) }}</div>
        <div class="text-green-100 text-sm mt-1">f₁ = f₀ - BW/2</div>
      </div>

      <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-purple-100 text-sm font-medium">Upper Cutoff</span>
          <svg class="h-5 w-5 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div class="text-3xl font-bold">{{ formatFreq(upperCutoff) }}</div>
        <div class="text-purple-100 text-sm mt-1">f₂ = f₀ + BW/2</div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📐 Circuit Diagram</h2>
      <div class="flex justify-center">
        <svg viewBox="0 0 800 300" class="w-full max-w-4xl" style="max-height: 400px;">
          <!-- Background -->
          <rect width="800" height="300" :fill="colorMode === 'dark' ? '#1f2937' : '#f9fafb'" rx="8"/>
          
          <!-- Title -->
          <text x="400" y="30" text-anchor="middle" :fill="colorMode === 'dark' ? '#fff' : '#1f2937'" font-size="16" font-weight="bold">
            Series RLC Bandstop Filter
          </text>
          
          <!-- Input -->
          <text x="50" y="150" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="14" font-weight="bold">
            Vin
          </text>
          
          <!-- Output -->
          <text x="750" y="150" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="14" font-weight="bold">
            Vout
          </text>
          
          <!-- Main circuit line -->
          <line x1="100" y1="150" x2="700" y2="150" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          
          <!-- Ground line -->
          <line x1="400" y1="150" x2="400" y2="250" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="350" y1="250" x2="450" y2="250" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="350" y1="250" x2="350" y2="260" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="450" y1="250" x2="450" y2="260" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="350" y1="260" x2="450" y2="260" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="380" y1="260" x2="420" y2="260" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          
          <!-- R (Resistor) -->
          <rect x="230" y="135" width="60" height="30" :fill="colorMode === 'dark' ? '#fef3c7' : '#fef3c7'" stroke="#f59e0b" stroke-width="2" rx="4"/>
          <text x="260" y="154" text-anchor="middle" fill="#92400e" font-size="12" font-weight="bold">R</text>
          <text x="260" y="125" text-anchor="middle" :fill="colorMode === 'dark' ? '#d1d5db' : '#374151'" font-size="10">
            {{ resistance }}Ω
          </text>
          
          <!-- L (Inductor) -->
          <circle cx="370" cy="150" r="25" :fill="colorMode === 'dark' ? '#dbeafe' : '#dbeafe'" stroke="#3b82f6" stroke-width="2"/>
          <text x="370" y="154" text-anchor="middle" fill="#1e40af" font-size="12" font-weight="bold">L</text>
          <text x="370" y="115" text-anchor="middle" :fill="colorMode === 'dark' ? '#d1d5db' : '#374151'" font-size="10">
            {{ inductance }}mH
          </text>
          
          <!-- C (Capacitor) -->
          <line x1="445" y1="120" x2="445" y2="180" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="455" y1="120" x2="455" y2="180" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <rect x="435" y="110" width="30" height="80" :fill="colorMode === 'dark' ? '#fce7f3' : '#fce7f3'" stroke="#ec4899" stroke-width="2" rx="2" fill-opacity="0.3"/>
          <text x="470" y="154" text-anchor="start" fill="#be185d" font-size="12" font-weight="bold">C</text>
          <text x="450" y="100" text-anchor="middle" :fill="colorMode === 'dark' ? '#d1d5db' : '#374151'" font-size="10">
            {{ capacitance }}µF
          </text>
          
          <!-- Connection lines -->
          <line x1="290" y1="150" x2="345" y2="150" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <line x1="395" y1="150" x2="445" y2="150" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          
          <!-- Frequency response indicator -->
          <text x="400" y="285" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="11">
            Blocks {{ formatFreq(centerFreq) }} (Bandwidth: {{ formatFreq(bandwidth) }})
          </text>
        </svg>
      </div>
    </div>

    <!-- Frequency Response Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Frequency Response</h2>
      
      <!-- Interactive chart -->
      <div class="relative" style="height: 350px;">
        <svg viewBox="0 0 800 350" class="w-full h-full">
          <!-- Background -->
          <rect width="800" height="350" :fill="colorMode === 'dark' ? '#374151' : '#f3f4f6'" rx="8"/>
          
          <!-- Grid lines (horizontal) -->
          <line x1="60" y1="50" x2="760" y2="50" :stroke="colorMode === 'dark' ? '#4b5563' : '#d1d5db'" stroke-width="1" stroke-dasharray="4"/>
          <line x1="60" y1="100" x2="760" y2="100" :stroke="colorMode === 'dark' ? '#4b5563' : '#d1d5db'" stroke-width="1" stroke-dasharray="4"/>
          <line x1="60" y1="150" x2="760" y2="150" :stroke="colorMode === 'dark' ? '#6b7280' : '#9ca3af'" stroke-width="1"/>
          <line x1="60" y1="200" x2="760" y2="200" :stroke="colorMode === 'dark' ? '#4b5563' : '#d1d5db'" stroke-width="1" stroke-dasharray="4"/>
          <line x1="60" y1="250" x2="760" y2="250" :stroke="colorMode === 'dark' ? '#4b5563' : '#d1d5db'" stroke-width="1" stroke-dasharray="4"/>
          
          <!-- Y-axis labels -->
          <text x="50" y="55" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">0 dB</text>
          <text x="50" y="105" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">-10 dB</text>
          <text x="50" y="155" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">-20 dB</text>
          <text x="50" y="205" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">-30 dB</text>
          <text x="50" y="255" text-anchor="end" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">-40 dB</text>
          
          <!-- Bandstop region highlight -->
          <rect 
            :x="freqToX(lowerCutoff)" 
            y="30" 
            :width="freqToX(upperCutoff) - freqToX(lowerCutoff)" 
            height="240" 
            :fill="colorMode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'"
          />
          
          <!-- Frequency response curve -->
          <path 
            :d="frequencyResponsePath" 
            fill="none" 
            :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" 
            stroke-width="3"
          />
          
          <!-- -3 dB cutoff markers -->
          <line 
            :x1="freqToX(lowerCutoff)" 
            y1="30" 
            :x2="freqToX(lowerCutoff)" 
            y2="270" 
            stroke="#10b981" 
            stroke-width="2" 
            stroke-dasharray="8,4"
          />
          <line 
            :x1="freqToX(upperCutoff)" 
            y1="30" 
            :x2="freqToX(upperCutoff)" 
            y2="270" 
            stroke="#10b981" 
            stroke-width="2" 
            stroke-dasharray="8,4"
          />
          
          <!-- Center frequency marker -->
          <line 
            :x1="freqToX(centerFreq)" 
            y1="30" 
            :x2="freqToX(centerFreq)" 
            y2="270" 
            stroke="#ef4444" 
            stroke-width="2" 
            stroke-dasharray="8,4"
          />
          
          <!-- X-axis labels (frequency) -->
          <text x="60" y="290" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">
            {{ formatFreqShort(minFreq) }}
          </text>
          <text x="235" y="290" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">
            {{ formatFreqShort(minFreq + (maxFreq - minFreq) * 0.25) }}
          </text>
          <text x="410" y="290" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">
            {{ formatFreqShort(minFreq + (maxFreq - minFreq) * 0.5) }}
          </text>
          <text x="585" y="290" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">
            {{ formatFreqShort(minFreq + (maxFreq - minFreq) * 0.75) }}
          </text>
          <text x="760" y="290" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="10">
            {{ formatFreqShort(maxFreq) }}
          </text>
          
          <!-- Labels -->
          <text x="400" y="315" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="11" font-weight="bold">
            Frequency (Hz)
          </text>
          <text x="25" y="150" text-anchor="middle" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="11" font-weight="bold" transform="rotate(-90, 25, 150)">
            Magnitude (dB)
          </text>
          
          <!-- Legend -->
          <rect x="620" y="40" width="160" height="80" :fill="colorMode === 'dark' ? '#1f2937' : '#fff'" :stroke="colorMode === 'dark' ? '#4b5563' : '#d1d5db'" rx="4"/>
          <line x1="635" y1="55" x2="655" y2="55" :stroke="colorMode === 'dark' ? '#60a5fa' : '#3b82f6'" stroke-width="3"/>
          <text x="665" y="58" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="9">Response</text>
          <line x1="635" y1="70" x2="655" y2="70" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>
          <text x="665" y="73" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="9">Center (f₀)</text>
          <line x1="635" y1="85" x2="655" y2="85" stroke="#10b981" stroke-width="2" stroke-dasharray="4,2"/>
          <text x="665" y="88" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="9">-3 dB Points</text>
          <rect x="635" y="98" width="20" height="10" :fill="colorMode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'"/>
          <text x="665" y="106" :fill="colorMode === 'dark' ? '#9ca3af' : '#4b5563'" font-size="9">Stopband</text>
        </svg>
        
        <!-- Current frequency indicator -->
        <div class="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
          <div class="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Center: {{ formatFreq(centerFreq) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="text-gray-700 dark:text-gray-300">Bandwidth: {{ formatFreq(bandwidth) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Q Factor -->
      <div class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Quality Factor (Q)</span>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ qFactor.toFixed(2) }}</div>
          </div>
          <div class="text-right">
            <span class="text-sm text-gray-600 dark:text-gray-400">Q = f₀ / BW</span>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ qFactor < 1 ? 'Wide band (low Q)' : qFactor > 10 ? 'Narrow band (high Q)' : 'Medium Q' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Component values
const resistance = ref(100)
const inductance = ref(10)
const capacitance = ref(2)

// Frequency range
const minFreq = ref(50)
const maxFreq = ref(5000)

// Computed values
const L = computed(() => inductance.value * 0.001) // Convert mH to H
const C = computed(() => capacitance.value * 0.000001) // Convert µF to F

const centerFreq = computed(() => {
  return 1 / (2 * Math.PI * Math.sqrt(L.value * C.value))
})

const bandwidth = computed(() => {
  return resistance.value / L.value
})

const lowerCutoff = computed(() => {
  return centerFreq.value - bandwidth.value / 2
})

const upperCutoff = computed(() => {
  return centerFreq.value + bandwidth.value / 2
})

const qFactor = computed(() => {
  return centerFreq.value / bandwidth.value
})

// Helper functions
function formatFreq(freq: number): string {
  if (freq >= 1000) {
    return (freq / 1000).toFixed(2) + ' kHz'
  }
  return freq.toFixed(1) + ' Hz'
}

function formatFreqShort(freq: number): string {
  if (freq >= 1000) {
    return (freq / 1000).toFixed(1) + 'k'
  }
  return Math.round(freq).toString()
}

function freqToX(freq: number): number {
  const range = maxFreq.value - minFreq.value
  const normalized = (freq - minFreq.value) / range
  return 60 + normalized * 700
}

function calculateGain(freq: number): number {
  const omega = 2 * Math.PI * freq
  const XL = omega * L.value
  const XC = 1 / (omega * C.value)
  
  // Impedance of series RLC
  const Z = Math.sqrt(Math.pow(resistance.value, 2) + Math.pow(XL - XC, 2))
  
  // Voltage gain (for series RLC as bandstop)
  const gain = resistance.value / Z
  
  // Convert to dB
  return 20 * Math.log10(gain)
}

const frequencyResponsePath = computed(() => {
  const points: [number, number][] = []
  const steps = 200
  
  for (let i = 0; i <= steps; i++) {
    const freq = minFreq.value + (maxFreq.value - minFreq.value) * (i / steps)
    const gainDb = calculateGain(freq)
    
    // Map dB to Y coordinate (0 dB = 50, -40 dB = 250)
    const y = 50 + (Math.abs(Math.min(0, gainDb)) / 40) * 200
    const x = freqToX(freq)
    
    points.push([x, y])
  }
  
  // Create SVG path
  if (points.length === 0) return ''
  
  let path = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i][0]} ${points[i][1]}`
  }
  
  return path
})

// Presets
function setPreset(type: 'low' | 'mid' | 'high') {
  switch (type) {
    case 'low':
      minFreq.value = 50
      maxFreq.value = 500
      resistance.value = 100
      inductance.value = 50
      capacitance.value = 5
      break
    case 'mid':
      minFreq.value = 100
      maxFreq.value = 10000
      resistance.value = 200
      inductance.value = 10
      capacitance.value = 1
      break
    case 'high':
      minFreq.value = 1000
      maxFreq.value = 20000
      resistance.value = 50
      inductance.value = 5
      capacitance.value = 0.5
      break
  }
}
</script>

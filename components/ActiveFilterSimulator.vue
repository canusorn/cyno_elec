<template>
  <div class="active-filter-simulator bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        🎚️ Active Filter Simulator
      </h2>
      <p class="text-gray-600 dark:text-gray-300">
        Explore op-amp based active filters with real-time frequency response visualization
      </p>
    </div>

    <!-- Filter Type Selection -->
    <div class="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Filter Type
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="type in filterTypes"
          :key="type.id"
          @click="filterType = type.id"
          :class="[
            'py-3 px-4 rounded-lg font-semibold transition-all text-sm',
            filterType === type.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          {{ type.icon }} {{ type.name }}
        </button>
      </div>
    </div>

    <!-- Parameters -->
    <div class="mb-8 grid md:grid-cols-2 gap-6">
      <!-- Cutoff Frequency -->
      <div class="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Cutoff Frequency (fc)
        </label>
        <div class="flex items-center space-x-3 mb-4">
          <input
            v-model.number="cutoffFreq"
            type="number"
            step="100"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 transition-all"
          />
          <span class="text-gray-600 dark:text-gray-300 font-semibold">Hz</span>
        </div>
        <input
          v-model.number="cutoffFreq"
          type="range"
          min="20"
          max="20000"
          step="10"
          class="w-full h-2 bg-gray-200 dark:bg-gray-500 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>20 Hz</span>
          <span>20 kHz</span>
        </div>
      </div>

      <!-- Filter Order -->
      <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Filter Order
        </label>
        <div class="flex space-x-3">
          <button
            v-for="order in [1, 2, 4]"
            :key="order"
            @click="filterOrder = order"
            :class="[
              'flex-1 py-3 rounded-lg font-semibold transition-all',
              filterOrder === order
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            ]"
          >
            {{ order }}{{ order === 1 ? 'st' : order === 2 ? 'nd' : 'th' }} Order
          </button>
        </div>
      </div>

      <!-- Gain -->
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Passband Gain (Av)
        </label>
        <div class="flex items-center space-x-3 mb-4">
          <input
            v-model.number="gain"
            type="number"
            step="0.5"
            min="0"
            max="20"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 transition-all"
          />
          <span class="text-gray-600 dark:text-gray-300 font-semibold">V/V</span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          = {{ (20 * Math.log10(gain || 1)).toFixed(1) }} dB
        </div>
      </div>

      <!-- Q Factor (for 2nd/4th order) -->
      <div v-if="filterOrder >= 2" class="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Q Factor / Damping
        </label>
        <div class="flex items-center space-x-3 mb-4">
          <input
            v-model.number="qFactor"
            type="number"
            step="0.1"
            min="0.3"
            max="10"
            class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-800 transition-all"
          />
        </div>
        <div class="flex space-x-2">
          <button
            @click="qFactor = 0.707"
            class="flex-1 py-2 text-sm rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-gray-700 transition-all"
          >
            Butterworth (Q=0.707)
          </button>
          <button
            @click="qFactor = 1.0"
            class="flex-1 py-2 text-sm rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-gray-700 transition-all"
          >
            Chebyshev (Q=1.0)
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="mb-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        📌 Quick Presets
      </label>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="preset in presets"
          :key="preset.name"
          @click="applyPreset(preset)"
          class="py-2 px-4 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-gray-700 transition-all text-sm font-medium"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Bode Plot -->
    <div class="mb-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📈 Frequency Response (Bode Plot)</h3>
      
      <!-- Magnitude Response -->
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Magnitude Response</h4>
        <svg viewBox="0 0 800 300" class="w-full h-auto bg-white dark:bg-gray-800 rounded-lg">
          <!-- Grid -->
          <defs>
            <pattern id="grid" width="80" height="30" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 30" fill="none" stroke="#E5E7EB" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="800" height="300" fill="url(#grid)" />

          <!-- Title -->
          <text x="400" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1F2937">
            {{ getFilterLabel() }} - Magnitude Response
          </text>

          <!-- Y-axis labels (dB) -->
          <g font-size="10" fill="#6B7280" text-anchor="end">
            <text x="45" y="55">+20 dB</text>
            <text x="45" y="105">0 dB</text>
            <text x="45" y="155">-20 dB</text>
            <text x="45" y="205">-40 dB</text>
            <text x="45" y="255">-60 dB</text>
          </g>

          <!-- X-axis labels (Frequency) -->
          <g font-size="10" fill="#6B7280" text-anchor="middle">
            <text x="60" y="290">20 Hz</text>
            <text x="200" y="290">100 Hz</text>
            <text x="340" y="290">500 Hz</text>
            <text x="480" y="290">1 kHz</text>
            <text x="620" y="290">5 kHz</text>
            <text x="760" y="290">20 kHz</text>
          </g>

          <!-- Cutoff frequency marker -->
          <line :x1="freqToX(cutoffFreq)" y1="50" :x2="freqToX(cutoffFreq)" y2="270" 
                stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5"/>
          <text :x="freqToX(cutoffFreq)" y="45" text-anchor="middle" font-size="10" font-weight="bold" fill="#EF4444">
            fc = {{ formatFreq(cutoffFreq) }}
          </text>

          <!-- Magnitude curve -->
          <path :d="magnitudePath" fill="none" stroke="#3B82F6" stroke-width="3"/>
          
          <!-- -3dB point -->
          <circle :cx="freqToX(cutoffFreq)" :cy="gainToY(gain, -3)" r="5" fill="#EF4444"/>
        </svg>
      </div>

      <!-- Phase Response -->
      <div>
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Phase Response</h4>
        <svg viewBox="0 0 800 300" class="w-full h-auto bg-white dark:bg-gray-800 rounded-lg">
          <!-- Grid -->
          <rect width="800" height="300" fill="url(#grid)" />

          <!-- Title -->
          <text x="400" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1F2937">
            {{ getFilterLabel() }} - Phase Response
          </text>

          <!-- Y-axis labels (degrees) -->
          <g font-size="10" fill="#6B7280" text-anchor="end">
            <text x="45" y="55">+90°</text>
            <text x="45" y="105">+45°</text>
            <text x="45" y="155">0°</text>
            <text x="45" y="205">-45°</text>
            <text x="45" y="255">-90°</text>
          </g>

          <!-- X-axis labels (Frequency) -->
          <g font-size="10" fill="#6B7280" text-anchor="middle">
            <text x="60" y="290">20 Hz</text>
            <text x="200" y="290">100 Hz</text>
            <text x="340" y="290">500 Hz</text>
            <text x="480" y="290">1 kHz</text>
            <text x="620" y="290">5 kHz</text>
            <text x="760" y="290">20 kHz</text>
          </g>

          <!-- Cutoff frequency marker -->
          <line :x1="freqToX(cutoffFreq)" y1="50" :x2="freqToX(cutoffFreq)" y2="270" 
                stroke="#EF4444" stroke-width="2" stroke-dasharray="5,5"/>

          <!-- Phase curve -->
          <path :d="phasePath" fill="none" stroke="#8B5CF6" stroke-width="3"/>
        </svg>
      </div>
    </div>

    <!-- Time Domain Response -->
    <div class="mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⏱️ Time Domain Response (Input vs Output)</h3>
      <svg viewBox="0 0 800 250" class="w-full h-auto bg-white dark:bg-gray-800 rounded-lg">
        <!-- Title -->
        <text x="400" y="25" text-anchor="middle" font-size="14" font-weight="bold" fill="#1F2937">
          Step Response ({{ getFilterLabel() }})
        </text>

        <!-- Grid -->
        <line x1="50" y1="125" x2="770" y2="125" stroke="#E5E7EB" stroke-width="1"/>
        <line x1="50" y1="50" x2="50" y2="200" stroke="#E5E7EB" stroke-width="1"/>

        <!-- Axis labels -->
        <text x="40" y="55" font-size="10" fill="#6B7280" text-anchor="end">Vin</text>
        <text x="40" y="200" font-size="10" fill="#6B7280" text-anchor="end">Vout</text>
        <text x="770" y="240" font-size="10" fill="#6B7280" text-anchor="end">Time →</text>

        <!-- Input waveform (step) -->
        <path d="M 50 200 L 200 200 L 200 50 L 770 50" 
              fill="none" stroke="#10B981" stroke-width="2"/>
        
        <!-- Input label -->
        <text x="210" y="45" font-size="11" font-weight="bold" fill="#10B981">Input (Step)</text>

        <!-- Output waveform (filtered response) -->
        <path :d="stepResponsePath" fill="none" stroke="#3B82F6" stroke-width="2"/>
        
        <!-- Output label -->
        <text x="210" y="215" font-size="11" font-weight="bold" fill="#3B82F6">Output (Filtered)</text>

        <!-- Legend -->
        <g transform="translate(600, 40)">
          <rect x="0" y="0" width="12" height="12" fill="#10B981"/>
          <text x="18" y="10" font-size="10" fill="#374151">Input</text>
          <rect x="0" y="20" width="12" height="12" fill="#3B82F6"/>
          <text x="18" y="30" font-size="10" fill="#374151">Output</text>
        </g>
      </svg>
    </div>

    <!-- Filter Specifications -->
    <div class="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Filter Specifications</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Filter Type</div>
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
            {{ getFilterLabel() }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Cutoff Frequency</div>
          <div class="text-lg font-bold text-green-600 dark:text-green-400">
            {{ formatFreq(cutoffFreq) }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Passband Gain</div>
          <div class="text-lg font-bold text-purple-600 dark:text-purple-400">
            {{ gain.toFixed(1) }} V/V
            <span class="text-sm">({{ (20 * Math.log10(gain || 1)).toFixed(1) }} dB)</span>
          </div>
        </div>
        <div v-if="filterOrder >= 2" class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Q Factor</div>
          <div class="text-lg font-bold text-orange-600 dark:text-orange-400">
            {{ qFactor.toFixed(2) }}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Roll-off Rate</div>
          <div class="text-lg font-bold text-cyan-600 dark:text-cyan-400">
            -{{ filterOrder * 20 }} dB/dec
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Stopband Attenuation</div>
          <div class="text-lg font-bold text-red-600 dark:text-red-400">
            ≈ -{{ filterOrder * 20 }} dB
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Circuit Diagram ({{ filterOrder === 1 ? '1st Order' : '2nd Order' }})</h3>
      <svg viewBox="0 0 700 350" class="w-full h-auto">
        <!-- Title -->
        <text x="350" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#3B82F6">
          {{ filterOrder === 1 ? 'First-Order' : 'Second-Order' }} Active {{ getFilterLabel() }}
        </text>

        <!-- Op-Amp -->
        <g transform="translate(320, 160)">
          <polygon points="-60,-60 -60,60 60,0" fill="white" stroke="#3B82F6" stroke-width="2"/>
          <text x="-35" y="-20" font-size="16" font-weight="bold" fill="#3B82F6">-</text>
          <text x="-35" y="35" font-size="16" font-weight="bold" fill="#3B82F6">+</text>
        </g>

        <!-- Input Components -->
        <g v-if="filterOrder === 1">
          <!-- Series resistor for all filters -->
          <line x1="100" y1="135" x2="160" y2="135" stroke="#10B981" stroke-width="3"/>
          <g transform="translate(130, 135)">
            <rect x="-15" y="-8" width="30" height="16" fill="white" stroke="#10B981" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#10B981">R1</text>
          </g>
          
          <!-- Feedback components -->
          <line x1="260" y1="160" x2="260" y2="220" stroke="#F59E0B" stroke-width="3"/>
          <line x1="260" y1="220" x2="360" y2="220" stroke="#F59E0B" stroke-width="3"/>
          <line x1="360" y1="220" x2="360" y2="170" stroke="#F59E0B" stroke-width="3"/>
          
          <!-- Feedback resistor -->
          <g transform="translate(310, 220)">
            <rect x="-15" y="-8" width="30" height="16" fill="white" stroke="#F59E0B" stroke-width="2"/>
            <text x="0" y="5" text-anchor="middle" font-size="11" font-weight="bold" fill="#F59E0B">Rf</text>
          </g>

          <!-- Filter capacitor (for LPF/HPF) -->
          <g v-if="filterType === 'lowpass' || filterType === 'highpass'" transform="translate(310, 190)">
            <line x1="-20" y1="0" x2="-10" y2="0" stroke="#8B5CF6" stroke-width="2"/>
            <line x1="-10" y1="-12" x2="-10" y2="12" stroke="#8B5CF6" stroke-width="2"/>
            <line x1="10" y1="-12" x2="10" y2="12" stroke="#8B5CF6" stroke-width="2"/>
            <line x1="10" y1="0" x2="20" y2="0" stroke="#8B5CF6" stroke-width="2"/>
            <text x="0" y="30" text-anchor="middle" font-size="11" font-weight="bold" fill="#8B5CF6">C1</text>
          </g>
        </g>

        <!-- Ground symbol -->
        <line x1="320" y1="220" x2="320" y2="250" stroke="#6B7280" stroke-width="2"/>
        <line x1="305" y1="250" x2="335" y2="250" stroke="#6B7280" stroke-width="2"/>
        <line x1="310" y1="255" x2="330" y2="255" stroke="#6B7280" stroke-width="2"/>
        <line x1="315" y1="260" x2="325" y2="260" stroke="#6B7280" stroke-width="2"/>

        <!-- Input/Output labels -->
        <circle cx="80" cy="135" r="6" fill="#10B981"/>
        <text x="80" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#10B981">Vin</text>

        <circle cx="440" cy="160" r="6" fill="#8B5CF6"/>
        <text x="440" y="145" text-anchor="middle" font-size="12" font-weight="bold" fill="#8B5CF6">Vout</text>

        <!-- Formula box -->
        <g transform="translate(350, 280)">
          <rect x="-120" y="-25" width="240" height="50" fill="white" stroke="#3B82F6" stroke-width="2" rx="8"/>
          <text x="0" y="-5" text-anchor="middle" font-size="13" font-weight="bold" fill="#3B82F6">
            {{ getFormula() }}
          </text>
          <text x="0" y="15" text-anchor="middle" font-size="11" fill="#6B7280">
            fc = {{ formatFreq(cutoffFreq) }}
          </text>
        </g>
      </svg>
    </div>

    <!-- Educational Content -->
    <div class="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Understanding Active Filters</h3>

      <div class="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">What are Active Filters?</h4>
          <p class="text-sm">
            Active filters use active components (op-amps, transistors) along with resistors and capacitors to filter signals.
            They provide gain and can achieve complex frequency responses that passive filters cannot.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Filter Types</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li><strong>Low-pass:</strong> Passes frequencies below fc, attenuates above</li>
            <li><strong>High-pass:</strong> Passes frequencies above fc, attenuates below</li>
            <li><strong>Band-pass:</strong> Passes frequencies in a range, attenuates outside</li>
            <li><strong>Band-stop (Notch):</strong> Attenuates frequencies in a range, passes outside</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Parameters</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li><strong>Cutoff Frequency (fc):</strong> The -3dB point where output is 70.7% of input</li>
            <li><strong>Filter Order:</strong> Determines roll-off rate (n×20 dB/decade)</li>
            <li><strong>Q Factor:</strong> Controls peaking and bandwidth (higher Q = sharper response)</li>
            <li><strong>Gain:</strong> Passband amplification (in V/V or dB)</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Applications</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li>Audio systems (crossover networks, tone controls)</li>
            <li>Communication systems (channel selection, noise reduction)</li>
            <li>Instrumentation (signal conditioning, anti-aliasing)</li>
            <li>Biomedical devices (ECG/EEG filtering)</li>
            <li>Power supply filtering (ripple rejection)</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Design Tips</h4>
          <ul class="text-sm space-y-1 list-disc pl-5">
            <li>Use Butterworth response (Q=0.707) for flat passband</li>
            <li>Use Chebyshev response (Q>0.707) for sharper roll-off</li>
            <li>Choose op-amp with sufficient bandwidth (GBW > 100× fc)</li>
            <li>For higher-order filters, cascade multiple 1st/2nd order stages</li>
            <li>Consider component tolerance effects on filter accuracy</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// State
const filterType = ref<'lowpass' | 'highpass' | 'bandpass' | 'bandstop'>('lowpass')
const cutoffFreq = ref(1000)
const filterOrder = ref(2)
const gain = ref(2)
const qFactor = ref(0.707)

// Filter types
const filterTypes = [
  { id: 'lowpass', name: 'Low-Pass', icon: '📉' },
  { id: 'highpass', name: 'High-Pass', icon: '📈' },
  { id: 'bandpass', name: 'Band-Pass', icon: '🔔' },
  { id: 'bandstop', name: 'Band-Stop', icon: '🔇' },
]

// Presets
const presets = [
  { name: 'Audio Low (80Hz)', type: 'lowpass', freq: 80, order: 2, gain: 2, q: 0.707 },
  { name: 'Audio High (1kHz)', type: 'highpass', freq: 1000, order: 2, gain: 2, q: 0.707 },
  { name: 'Anti-Aliasing', type: 'lowpass', freq: 22000, order: 4, gain: 1, q: 0.707 },
  { name: 'Voice Band', type: 'bandpass', freq: 1000, order: 2, gain: 5, q: 2.0 },
]

// Helper functions
const getFilterLabel = () => {
  const labels = {
    lowpass: 'Low-Pass Filter',
    highpass: 'High-Pass Filter',
    bandpass: 'Band-Pass Filter',
    bandstop: 'Band-Stop (Notch) Filter',
  }
  return labels[filterType.value]
}

const formatFreq = (freq: number) => {
  if (freq >= 1000) return (freq / 1000).toFixed(1) + ' kHz'
  return freq.toFixed(0) + ' Hz'
}

const freqToX = (freq: number) => {
  // Log scale from 20Hz to 20kHz (3 decades)
  const logFreq = Math.log10(freq)
  const logMin = Math.log10(20)
  const logMax = Math.log10(20000)
  const normalized = (logFreq - logMin) / (logMax - logMin)
  return 60 + normalized * 700 // Map to x-range [60, 760]
}

const gainToY = (gainValue: number, dbOffset: number) => {
  const gainDb = 20 * Math.log10(gainValue || 1)
  const finalDb = gainDb + dbOffset
  // Map -60 to +20 dB to y-range [255, 55]
  return 255 - ((finalDb + 60) / 80) * 200
}

const getMagnitude = (freq: number) => {
  const fc = cutoffFreq.value
  const s = freq / fc
  const g = gain.value
  const Q = qFactor.value
  const n = filterOrder.value

  let magnitude = 0

  if (filterType.value === 'lowpass') {
    if (n === 1) {
      magnitude = g / Math.sqrt(1 + s * s)
    } else if (n === 2) {
      magnitude = g / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
    } else {
      // 4th order = two 2nd order stages
      const stage1 = 1 / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
      const stage2 = 1 / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
      magnitude = g * stage1 * stage2
    }
  } else if (filterType.value === 'highpass') {
    if (n === 1) {
      magnitude = g * s / Math.sqrt(1 + s * s)
    } else if (n === 2) {
      magnitude = g * s * s / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
    } else {
      const stage1 = s * s / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
      const stage2 = s * s / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
      magnitude = g * stage1 * stage2
    }
  } else if (filterType.value === 'bandpass') {
    if (n === 1) {
      magnitude = g * (s / Q) / Math.sqrt(1 + (s / Q) ** 2)
    } else {
      magnitude = g * (s / Q) / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
    }
  } else if (filterType.value === 'bandstop') {
    if (n === 2) {
      magnitude = g * Math.abs(1 - s * s) / Math.sqrt((1 - s * s) ** 2 + (s / Q) ** 2)
    }
  }

  return magnitude
}

const getPhase = (freq: number) => {
  const fc = cutoffFreq.value
  const s = freq / fc
  const Q = qFactor.value
  const n = filterOrder.value

  let phase = 0

  if (filterType.value === 'lowpass') {
    if (n === 1) {
      phase = -Math.atan(s) * 180 / Math.PI
    } else if (n === 2) {
      phase = -Math.atan2(s / Q, 1 - s * s) * 180 / Math.PI
    } else {
      phase = -2 * Math.atan2(s / Q, 1 - s * s) * 180 / Math.PI
    }
  } else if (filterType.value === 'highpass') {
    if (n === 1) {
      phase = 90 - Math.atan(s) * 180 / Math.PI
    } else if (n === 2) {
      phase = 180 - Math.atan2(s / Q, 1 - s * s) * 180 / Math.PI
    } else {
      phase = 360 - 2 * Math.atan2(s / Q, 1 - s * s) * 180 / Math.PI
    }
  } else if (filterType.value === 'bandpass') {
    phase = 90 - Math.atan2(1, s / Q) * 180 / Math.PI
  } else if (filterType.value === 'bandstop') {
    phase = Math.atan2(s / Q, 1 - s * s) * 180 / Math.PI
  }

  // Wrap to -180 to 180
  while (phase > 180) phase -= 360
  while (phase < -180) phase += 360

  return phase
}

// Computed paths for SVG
const magnitudePath = computed(() => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const freq = 20 * Math.pow(1000, i / 100) // Log scale 20Hz to 20kHz
    const mag = getMagnitude(freq)
    const magDb = 20 * Math.log10(mag || 0.001)
    const x = freqToX(freq)
    const y = gainToY(1, magDb) // Reference to 0 dB

    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }
  return points.join(' ')
})

const phasePath = computed(() => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const freq = 20 * Math.pow(1000, i / 100)
    const phase = getPhase(freq)
    const x = freqToX(freq)
    const y = 155 - phase // Map -90° to 255, +90° to 55

    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }
  return points.join(' ')
})

const stepResponsePath = computed(() => {
  const points = []
  const tau = 1 / (2 * Math.PI * cutoffFreq.value) // Time constant
  const Q = qFactor.value

  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * (5 * tau) // 5 time constants
    const x = 200 + (i / 100) * 550

    let y = 0
    const normalizedT = t / tau

    if (filterType.value === 'lowpass') {
      if (filterOrder.value === 1) {
        y = 1 - Math.exp(-normalizedT)
      } else {
        // Underdamped 2nd order
        const alpha = 1 / (2 * Q)
        if (Q < 0.5) {
          // Overdamped
          const r1 = -alpha + Math.sqrt(alpha * alpha - 1)
          const r2 = -alpha - Math.sqrt(alpha * alpha - 1)
          y = 1 + (r2 * Math.exp(r1 * normalizedT) - r1 * Math.exp(r2 * normalizedT)) / (r2 - r1)
        } else {
          // Underdamped/critically damped
          const wd = Math.sqrt(1 - alpha * alpha)
          y = 1 - Math.exp(-alpha * normalizedT) * (Math.cos(wd * normalizedT) + (alpha / wd) * Math.sin(wd * normalizedT))
        }
      }
    } else if (filterType.value === 'highpass') {
      if (filterOrder.value === 1) {
        y = Math.exp(-normalizedT)
      } else {
        y = Math.exp(-normalizedT) * (Math.cos(normalizedT) + Math.sin(normalizedT))
      }
    } else {
      // For other filter types, show simplified response
      y = 1 - Math.exp(-normalizedT)
    }

    const yOut = 200 - y * 150 // Scale to output range

    if (i === 0) {
      points.push(`M ${x} ${yOut}`)
    } else {
      points.push(`L ${x} ${yOut}`)
    }
  }

  return points.join(' ')
})

const getFormula = () => {
  const fc = cutoffFreq.value
  const g = gain.value

  if (filterType.value === 'lowpass') {
    return filterOrder.value === 1 
      ? `H(s) = -${g} / (1 + sRC)`
      : `H(s) = -${g} / (1 + s/(Q·ω₀) + s²/ω₀²)`
  } else if (filterType.value === 'highpass') {
    return filterOrder.value === 1
      ? `H(s) = -${g}·sRC / (1 + sRC)`
      : `H(s) = -${g}·s²/ω₀² / (1 + s/(Q·ω₀) + s²/ω₀²)`
  } else if (filterType.value === 'bandpass') {
    return `H(s) = -${g}·s/(Q·ω₀) / (1 + s/(Q·ω₀) + s²/ω₀²)`
  } else {
    return `H(s) = -${g}·(1 + s²/ω₀²) / (1 + s/(Q·ω₀) + s²/ω₀²)`
  }
}

// Methods
const applyPreset = (preset: typeof presets[0]) => {
  filterType.value = preset.type as any
  cutoffFreq.value = preset.freq
  filterOrder.value = preset.order
  gain.value = preset.gain
  qFactor.value = preset.q
}
</script>

<template>
  <div class="space-y-8">
    <!-- Control Panel -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>⚙️</span> Circuit Configuration
      </h2>

      <!-- Clipper Type Selection -->
      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Clipper Type
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="type in clipperTypes"
            :key="type.id"
            @click="clipperType = type.id"
            :class="[
              'px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm',
              clipperType === type.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ type.name }}
          </button>
        </div>
      </div>

      <!-- Input Parameters -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Input Signal Controls -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Input Signal</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Peak Voltage: {{ inputVoltage.toFixed(1) }}V
            </label>
            <input
              type="range"
              v-model.number="inputVoltage"
              min="1"
              max="20"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frequency: {{ frequency }}Hz
            </label>
            <input
              type="range"
              v-model.number="frequency"
              min="1"
              max="100"
              step="1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <!-- Diode Parameters -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Diode Parameters</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Forward Voltage: {{ diodeVf.toFixed(2) }}V
            </label>
            <input
              type="range"
              v-model.number="diodeVf"
              min="0.3"
              max="1.5"
              step="0.05"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div v-if="clipperType.includes('biased')">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bias Voltage: {{ biasVoltage.toFixed(1) }}V
            </label>
            <input
              type="range"
              v-model.number="biasVoltage"
              min="0"
              max="10"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div v-if="clipperType.includes('double')">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reference Voltage: {{ refVoltage.toFixed(1) }}V
            </label>
            <input
              type="range"
              v-model.number="refVoltage"
              min="0"
              max="10"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>

      <!-- Quick Presets -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Waveform Display -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📊</span> Waveform Analysis
      </h2>

      <!-- SVG Waveform -->
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 mb-6">
        <svg viewBox="0 0 800 350" class="w-full h-auto">
          <!-- Grid -->
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-gray-700" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="800" height="350" fill="url(#smallGrid)" />

          <!-- Axis -->
          <line x1="50" y1="175" x2="750" y2="175" stroke="currentColor" stroke-width="2" class="text-gray-400 dark:text-gray-600" />
          <line x1="50" y1="25" x2="50" y2="325" stroke="currentColor" stroke-width="2" class="text-gray-400 dark:text-gray-600" />

          <!-- Labels -->
          <text x="760" y="180" class="text-sm fill-current text-gray-600 dark:text-gray-400" font-size="12">t</text>
          <text x="40" y="20" class="text-sm fill-current text-gray-600 dark:text-gray-400" font-size="12">V</text>

          <!-- Voltage markers -->
          <text x="10" y="80" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="10">+{{ inputVoltage }}V</text>
          <text x="10" y="270" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="10">-{{ inputVoltage }}V</text>
          <text x="15" y="180" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="10">0V</text>

          <!-- Input Waveform (Blue) -->
          <path
            :d="generateInputWaveform()"
            fill="none"
            stroke="#3B82F6"
            stroke-width="2.5"
            opacity="0.6"
          />

          <!-- Clipping Levels -->
          <line
            v-if="clipperType.includes('positive') || clipperType.includes('biased-positive') || clipperType.includes('double')"
            :x1="50"
            :y1="getClipLevelY(clipLevel)"
            :x2="750"
            :y2="getClipLevelY(clipLevel)"
            stroke="#EF4444"
            stroke-width="1.5"
            stroke-dasharray="8,4"
            opacity="0.7"
          />
          <line
            v-if="clipperType.includes('negative') || clipperType.includes('biased-negative') || clipperType.includes('double')"
            :x1="50"
            :y1="getClipLevelY(-clipLevelNeg)"
            :x2="750"
            :y2="getClipLevelY(-clipLevelNeg)"
            stroke="#EF4444"
            stroke-width="1.5"
            stroke-dasharray="8,4"
            opacity="0.7"
          />

          <!-- Output Waveform (Green) -->
          <path
            :d="generateOutputWaveform()"
            fill="none"
            stroke="#10B981"
            stroke-width="3"
          />

          <!-- Legend -->
          <g transform="translate(580, 20)">
            <rect x="0" y="0" width="200" height="70" fill="white" fill-opacity="0.9" rx="5" />
            <line x1="10" y1="15" x2="40" y2="15" stroke="#3B82F6" stroke-width="2.5" opacity="0.6" />
            <text x="50" y="19" class="text-xs fill-current text-gray-700" font-size="11">Input</text>
            
            <line x1="10" y1="35" x2="40" y2="35" stroke="#10B981" stroke-width="3" />
            <text x="50" y="39" class="text-xs fill-current text-gray-700" font-size="11">Output (Clipped)</text>
            
            <line x1="10" y1="55" x2="40" y2="55" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,2" />
            <text x="50" y="59" class="text-xs fill-current text-gray-700" font-size="11">Clip Level</text>
          </g>
        </svg>
      </div>

      <!-- Calculated Values -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Clip Level (+)</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ clipLevel.toFixed(2) }}V
          </div>
        </div>
        
        <div v-if="clipperType.includes('negative') || clipperType.includes('double')" class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Clip Level (-)</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ (-clipLevelNeg).toFixed(2) }}V
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Output V<sub>peak</sub></div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ outputPeak.toFixed(2) }}V
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Clipping %</div>
          <div class="text-2xl font-bold" :class="clippingPercentage > 30 ? 'text-red-600' : 'text-green-600'">
            {{ clippingPercentage.toFixed(1) }}%
          </div>
        </div>
      </div>
    </div>

    <!-- Circuit Diagram -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>🔌</span> Circuit Diagram: {{ getCurrentClipperName() }}
      </h2>

      <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6">
        <svg viewBox="0 0 600 300" class="w-full h-auto max-w-2xl mx-auto">
          <!-- Series Positive Clipper -->
          <g v-if="clipperType === 'series-positive'">
            <text x="300" y="30" text-anchor="middle" class="text-lg font-bold fill-current text-gray-800 dark:text-gray-200" font-size="16">Series Positive Clipper</text>
            
            <!-- Input -->
            <circle cx="80" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="80" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="80" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vin</text>
            
            <!-- Diode -->
            <line x1="95" y1="150" x2="180" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <polygon points="180,135 180,165 210,150" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-900 dark:text-gray-100" />
            <line x1="210" y1="135" x2="210" y2="165" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Resistor -->
            <line x1="210" y1="150" x2="250" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <path d="M 250 140 L 260 160 L 270 140 L 280 160 L 290 140 L 300 160 L 310 150" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="310" y1="150" x2="350" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="280" y="130" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">R</text>
            
            <!-- Output -->
            <line x1="350" y1="150" x2="480" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <circle cx="495" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="495" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="495" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vout</text>
            
            <!-- Ground connection -->
            <line x1="350" y1="150" x2="350" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="335" y1="220" x2="365" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="340" y1="226" x2="360" y2="226" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="345" y1="232" x2="355" y2="232" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
          </g>

          <!-- Parallel Positive Clipper -->
          <g v-else-if="clipperType === 'parallel-positive'">
            <text x="300" y="30" text-anchor="middle" class="text-lg font-bold fill-current text-gray-800 dark:text-gray-200" font-size="16">Parallel Positive Clipper</text>
            
            <!-- Input -->
            <circle cx="80" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="80" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="80" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vin</text>
            
            <!-- Resistor -->
            <line x1="95" y1="150" x2="140" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <path d="M 140 140 L 150 160 L 160 140 L 170 160 L 180 140 L 190 160 L 200 150" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="170" y="130" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">R</text>
            
            <!-- Diode (in parallel) -->
            <line x1="200" y1="150" x2="250" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="250" y1="150" x2="250" y2="100" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <polygon points="250,85 250,115 280,100" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-900 dark:text-gray-100" />
            <line x1="280" y1="85" x2="280" y2="115" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="280" y1="100" x2="310" y2="100" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="310" y1="100" x2="310" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="310" y1="150" x2="310" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Ground connection -->
            <line x1="250" y1="220" x2="310" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="255" y1="226" x2="305" y2="226" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="260" y1="232" x2="300" y2="232" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Output -->
            <line x1="310" y1="150" x2="480" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <circle cx="495" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="495" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="495" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vout</text>
          </g>

          <!-- Series Negative Clipper -->
          <g v-else-if="clipperType === 'series-negative'">
            <text x="300" y="30" text-anchor="middle" class="text-lg font-bold fill-current text-gray-800 dark:text-gray-200" font-size="16">Series Negative Clipper</text>
            
            <!-- Input -->
            <circle cx="80" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="80" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="80" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vin</text>
            
            <!-- Diode (reversed) -->
            <line x1="95" y1="150" x2="180" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="180" y1="135" x2="180" y2="165" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <polygon points="180,135 210,150 180,165" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-900 dark:text-gray-100" />
            
            <!-- Resistor -->
            <line x1="210" y1="150" x2="250" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <path d="M 250 140 L 260 160 L 270 140 L 280 160 L 290 140 L 300 160 L 310 150" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="310" y1="150" x2="350" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="280" y="130" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">R</text>
            
            <!-- Output -->
            <line x1="350" y1="150" x2="480" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <circle cx="495" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="495" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="495" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vout</text>
            
            <!-- Ground connection -->
            <line x1="350" y1="150" x2="350" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="335" y1="220" x2="365" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="340" y1="226" x2="360" y2="226" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="345" y1="232" x2="355" y2="232" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
          </g>

          <!-- Double Clipper -->
          <g v-else-if="clipperType === 'double-ended'">
            <text x="300" y="30" text-anchor="middle" class="text-lg font-bold fill-current text-gray-800 dark:text-gray-200" font-size="16">Double-Ended (Bi-directional) Clipper</text>
            
            <!-- Input -->
            <circle cx="80" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="80" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="80" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vin</text>
            
            <!-- Two diodes in parallel (opposing) -->
            <line x1="95" y1="150" x2="200" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Top diode -->
            <line x1="200" y1="150" x2="200" y2="100" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <polygon points="200,85 200,115 230,100" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-900 dark:text-gray-100" />
            <line x1="230" y1="85" x2="230" y2="115" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="230" y1="100" x2="250" y2="100" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Bottom diode -->
            <line x1="200" y1="150" x2="200" y2="200" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="200" y1="185" x2="200" y2="215" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <polygon points="200,185 230,200 200,215" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-900 dark:text-gray-100" />
            <line x1="250" y1="100" x2="250" y2="200" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="230" y1="200" x2="250" y2="200" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="250" y1="150" x2="350" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Ground connection -->
            <line x1="250" y1="200" x2="250" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="235" y1="220" x2="265" y2="220" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="240" y1="226" x2="260" y2="226" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <line x1="245" y1="232" x2="255" y2="232" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            
            <!-- Output -->
            <circle cx="495" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-700 dark:text-gray-300" />
            <text x="495" y="155" text-anchor="middle" class="text-sm fill-current text-gray-700 dark:text-gray-300" font-size="14">~</text>
            <text x="495" y="185" text-anchor="middle" class="text-xs fill-current text-gray-600 dark:text-gray-400" font-size="11">Vout</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Educational Content -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📚</span> Understanding Diode Clippers
      </h2>

      <div class="space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">What is a Diode Clipper?</h3>
          <p class="leading-relaxed">
            A diode clipper is a circuit that removes (clips) portions of a waveform above or below a specified threshold level. 
            The diode conducts when the input voltage exceeds its forward voltage drop in the forward direction, effectively 
            "clipping" the waveform at that level.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Types of Clippers</h3>
          <ul class="space-y-2 list-disc list-inside">
            <li><strong>Series Positive Clipper:</strong> Diode in series with load, clips positive half-cycles above Vf</li>
            <li><strong>Parallel Positive Clipper:</strong> Diode in parallel with load, clips positive half-cycles above Vf</li>
            <li><strong>Series Negative Clipper:</strong> Diode in series with load (reversed), clips negative half-cycles below -Vf</li>
            <li><strong>Double-Ended Clipper:</strong> Two diodes clip both positive and negative peaks</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Concepts</h3>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
            <p><strong>Clip Level:</strong> V<sub>clip</sub> = V<sub>f</sub> (for simple clippers)</p>
            <p><strong>With Bias:</strong> V<sub>clip</sub> = V<sub>bias</sub> + V<sub>f</sub></p>
            <p><strong>Output Voltage:</strong> V<sub>out</sub> = V<sub>in</sub> when diode is OFF</p>
            <p><strong>Clipped Output:</strong> V<sub>out</sub> ≈ V<sub>clip</sub> when diode conducts</p>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Applications</h3>
          <ul class="space-y-2 list-disc list-inside">
            <li><strong>Waveform Shaping:</strong> Creating square waves from sine waves</li>
            <li><strong>Protection Circuits:</strong> Limiting voltage to safe levels</li>
            <li><strong>AM Demodulation:</strong> Removing negative half-cycles</li>
            <li><strong>Noise Clipping:</strong> Removing amplitude spikes in audio</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// State
const clipperType = ref('series-positive')
const inputVoltage = ref(10)      // Peak voltage in volts
const frequency = ref(10)          // Frequency in Hz
const diodeVf = ref(0.7)          // Diode forward voltage
const biasVoltage = ref(2)         // Bias voltage for biased clippers
const refVoltage = ref(3)          // Reference voltage for double-ended clipper

// Clipper type options
const clipperTypes = [
  { id: 'series-positive', name: 'Series +' },
  { id: 'parallel-positive', name: 'Parallel +' },
  { id: 'series-negative', name: 'Series -' },
  { id: 'double-ended', name: 'Double' }
]

// Presets
const presets = [
  {
    name: 'Standard Silicon',
    settings: { inputVoltage: 10, frequency: 10, diodeVf: 0.7, biasVoltage: 2, refVoltage: 3, clipperType: 'series-positive' }
  },
  {
    name: 'Germanium Diode',
    settings: { inputVoltage: 5, frequency: 20, diodeVf: 0.3, biasVoltage: 1, refVoltage: 2, clipperType: 'series-positive' }
  },
  {
    name: 'High Voltage',
    settings: { inputVoltage: 20, frequency: 5, diodeVf: 0.7, biasVoltage: 5, refVoltage: 8, clipperType: 'double-ended' }
  },
  {
    name: 'Audio Waveform',
    settings: { inputVoltage: 2, frequency: 50, diodeVf: 0.7, biasVoltage: 0.5, refVoltage: 1, clipperType: 'parallel-positive' }
  }
]

// Computed clip levels
const clipLevel = computed(() => {
  if (clipperType.value.includes('biased')) {
    return biasVoltage.value + diodeVf.value
  } else if (clipperType.value === 'double-ended') {
    return refVoltage.value + diodeVf.value
  }
  return diodeVf.value
})

const clipLevelNeg = computed(() => {
  if (clipperType.value === 'double-ended') {
    return refVoltage.value + diodeVf.value
  }
  return diodeVf.value
})

// Generate waveform path
const generateInputWaveform = () => {
  const points = []
  const cycles = 2.5
  const pointsPerCycle = 100
  const totalPoints = cycles * pointsPerCycle
  
  for (let i = 0; i <= totalPoints; i++) {
    const angle = (i / pointsPerCycle) * 2 * Math.PI
    const x = 50 + (i / totalPoints) * 700
    const y = 175 - (inputVoltage.value / inputVoltage.value) * Math.sin(angle) * 95
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  
  return points.join(' ')
}

const generateOutputWaveform = () => {
  const points = []
  const cycles = 2.5
  const pointsPerCycle = 100
  const totalPoints = cycles * pointsPerCycle
  
  for (let i = 0; i <= totalPoints; i++) {
    const angle = (i / pointsPerCycle) * 2 * Math.PI
    const x = 50 + (i / totalPoints) * 700
    let voltage = Math.sin(angle) * inputVoltage.value
    
    // Apply clipping based on clipper type
    if (clipperType.value === 'series-positive' || clipperType.value === 'parallel-positive') {
      if (voltage > clipLevel.value) {
        voltage = clipLevel.value
      }
    } else if (clipperType.value === 'series-negative') {
      if (voltage < -clipLevelNeg.value) {
        voltage = -clipLevelNeg.value
      }
    } else if (clipperType.value === 'double-ended') {
      if (voltage > clipLevel.value) {
        voltage = clipLevel.value
      }
      if (voltage < -clipLevelNeg.value) {
        voltage = -clipLevelNeg.value
      }
    }
    
    const y = 175 - (voltage / inputVoltage.value) * 95
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  
  return points.join(' ')
}

const getClipLevelY = (level: number) => {
  return 175 - (level / inputVoltage.value) * 95
}

// Output peak voltage (after clipping)
const outputPeak = computed(() => {
  if (clipperType.value === 'series-positive' || clipperType.value === 'parallel-positive') {
    return Math.min(inputVoltage.value, clipLevel.value)
  } else if (clipperType.value === 'series-negative') {
    return inputVoltage.value // Positive half unaffected
  } else if (clipperType.value === 'double-ended') {
    return Math.min(inputVoltage.value, clipLevel.value)
  }
  return inputVoltage.value
})

// Clipping percentage
const clippingPercentage = computed(() => {
  const originalArea = inputVoltage.value * 4 // Proportional to peak
  let clippedArea = 0
  
  if (clipperType.value === 'series-positive' || clipperType.value === 'parallel-positive') {
    if (inputVoltage.value > clipLevel.value) {
      clippedArea = (inputVoltage.value - clipLevel.value) * 2
    }
  } else if (clipperType.value === 'series-negative') {
    if (inputVoltage.value > clipLevelNeg.value) {
      clippedArea = (inputVoltage.value - clipLevelNeg.value) * 2
    }
  } else if (clipperType.value === 'double-ended') {
    if (inputVoltage.value > clipLevel.value) {
      clippedArea = (inputVoltage.value - clipLevel.value) * 2
    }
    if (inputVoltage.value > clipLevelNeg.value) {
      clippedArea += (inputVoltage.value - clipLevelNeg.value) * 2
    }
  }
  
  return originalArea > 0 ? (clippedArea / originalArea) * 100 : 0
})

const getCurrentClipperName = () => {
  const names = {
    'series-positive': 'Series Positive Clipper',
    'parallel-positive': 'Parallel Positive Clipper',
    'series-negative': 'Series Negative Clipper',
    'double-ended': 'Double-Ended Clipper'
  }
  return names[clipperType.value] || clipperType.value
}

const applyPreset = (preset: any) => {
  inputVoltage.value = preset.settings.inputVoltage
  frequency.value = preset.settings.frequency
  diodeVf.value = preset.settings.diodeVf
  biasVoltage.value = preset.settings.biasVoltage
  refVoltage.value = preset.settings.refVoltage
  clipperType.value = preset.settings.clipperType
}
</script>

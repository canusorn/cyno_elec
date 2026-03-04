<template>
  <div :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <svg class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Comparator with Hysteresis
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Explore Schmitt Trigger behavior and noise immunity
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-2xl font-mono">
              <span class="text-primary">V<sub>UTP</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> ≠ </span>
              <span class="text-primary">V<sub>LTP</sub></span>
              <span class="text-gray-700 dark:text-gray-300"> → </span>
              <span class="text-primary">Noise Immunity</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Simulation Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Panel: Controls -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Circuit Parameters
          </h2>

          <!-- Reference Voltage -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Reference Voltage (V<sub>ref</sub>)</label>
              <span class="text-primary font-mono font-bold">{{ vRef }} V</span>
            </div>
            <input
              type="range"
              v-model.number="vRef"
              min="0"
              max="10"
              step="0.1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0V</span>
              <span>5V</span>
              <span>10V</span>
            </div>
          </div>

          <!-- Feedback Ratio (R1/R2) -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Feedback Ratio (β = R<sub>2</sub>/(R<sub>1</sub>+R<sub>2</sub>))</label>
              <span class="text-primary font-mono font-bold">{{ feedbackRatio.toFixed(2) }}</span>
            </div>
            <input
              type="range"
              v-model.number="feedbackRatio"
              min="0.01"
              max="0.5"
              step="0.01"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.01 (High)</span>
              <span>0.25</span>
              <span>0.5 (Low)</span>
            </div>
          </div>

          <!-- Output Voltage High -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Output High (V<sub>OH</sub>)</label>
              <span class="text-primary font-mono font-bold">{{ vOutHigh }} V</span>
            </div>
            <input
              type="range"
              v-model.number="vOutHigh"
              min="5"
              max="15"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5V</span>
              <span>10V</span>
              <span>15V</span>
            </div>
          </div>

          <!-- Output Voltage Low -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Output Low (V<sub>OL</sub>)</label>
              <span class="text-primary font-mono font-bold">{{ vOutLow }} V</span>
            </div>
            <input
              type="range"
              v-model.number="vOutLow"
              min="-5"
              max="2"
              step="0.5"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>-5V</span>
              <span>0V</span>
              <span>2V</span>
            </div>
          </div>

          <!-- Noise Level -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Input Noise Level</label>
              <span class="text-primary font-mono font-bold">{{ noiseLevel }} V</span>
            </div>
            <input
              type="range"
              v-model.number="noiseLevel"
              min="0"
              max="2"
              step="0.1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Clean</span>
              <span>1V</span>
              <span>Noisy</span>
            </div>
          </div>

          <!-- Input Signal Frequency -->
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <label class="text-gray-700 dark:text-gray-300 font-medium">Input Frequency</label>
              <span class="text-primary font-mono font-bold">{{ inputFreq }} Hz</span>
            </div>
            <input
              type="range"
              v-model.number="inputFreq"
              min="0.1"
              max="5"
              step="0.1"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0.1Hz</span>
              <span>2.5Hz</span>
              <span>5Hz</span>
            </div>
          </div>

          <!-- Hysteresis Presets -->
          <div class="mb-6">
            <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Quick Presets
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="setPreset('lowHysteresis')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Low Hysteresis</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">β = 0.45</div>
              </button>
              <button
                @click="setPreset('mediumHysteresis')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Medium</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">β = 0.25</div>
              </button>
              <button
                @click="setPreset('highHysteresis')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">High Hysteresis</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">β = 0.1</div>
              </button>
              <button
                @click="setPreset('noisy')"
                class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <div class="font-semibold text-primary mb-1">Noisy Input</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">High noise demo</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Panel: Results -->
        <div class="space-y-6">
          <!-- Threshold Display -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Hysteresis Thresholds</h3>
            
            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Upper Threshold (V<sub>UTP</sub>)</div>
                <div class="text-3xl font-mono font-bold text-green-600 dark:text-green-400">{{ upperThreshold.toFixed(2) }} V</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Switch LOW → HIGH</div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Lower Threshold (V<sub>LTP</sub>)</div>
                <div class="text-3xl font-mono font-bold text-red-600 dark:text-red-400">{{ lowerThreshold.toFixed(2) }} V</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Switch HIGH → LOW</div>
              </div>
            </div>

            <div class="mt-4 text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Hysteresis Voltage (V<sub>H</sub>)</div>
              <div class="text-4xl font-mono font-bold text-primary">{{ hysteresisVoltage.toFixed(2) }} V</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Noise Immunity: ±{{ (hysteresisVoltage / 2).toFixed(2) }} V
              </div>
            </div>
          </div>

          <!-- Circuit Diagram -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Non-Inverting Schmitt Trigger</h3>
            <svg viewBox="0 0 400 220" class="w-full h-auto">
              <!-- Background -->
              <rect x="0" y="0" width="400" height="220" fill="none"/>
              
              <!-- Comparator triangle -->
              <polygon :fill="colorMode === 'dark' ? '#3949AB' : '#9FA8DA'" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" 
                stroke-width="2" points="150,60 150,140 230,100"/>
              
              <!-- Input labels -->
              <text x="115" y="85" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">-</text>
              <text x="115" y="115" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="12" font-weight="bold">+</text>
              
              <!-- Input wire (Vin) -->
              <line x1="60" y1="110" x2="110" y2="110" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <text x="60" y="100" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="11" font-weight="bold">Vin</text>
              
              <!-- Feedback network -->
              <line x1="110" y1="110" x2="110" y2="170" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="110" y1="170" x2="350" y2="170" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- R1 (top feedback resistor) -->
              <rect x="180" y="163" width="40" height="14" :fill="colorMode === 'dark' ? '#5C6BC0' : '#7986CB'" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="1"/>
              <text x="185" y="156" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="11" font-weight="bold">R1</text>
              
              <!-- Connection from R1 to output -->
              <line x1="260" y1="170" x2="260" y2="130" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="260" y1="130" x2="300" y2="100" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              
              <!-- Output wire -->
              <line x1="230" y1="100" x2="350" y2="100" :stroke="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" stroke-width="2"/>
              <text x="330" y="90" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="11" font-weight="bold">Vout</text>
              
              <!-- R2 (bottom resistor to ground) -->
              <rect x="270" y="163" width="40" height="14" :fill="colorMode === 'dark' ? '#5C6BC0' : '#7986CB'" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="1"/>
              <text x="275" y="156" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="11" font-weight="bold">R2</text>
              
              <!-- Ground connection -->
              <line x1="330" y1="177" x2="330" y2="195" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <line x1="320" y1="195" x2="340" y2="195" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <line x1="325" y1="200" x2="335" y2="200" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              <line x1="328" y1="205" x2="332" y2="205" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2"/>
              
              <!-- Vref connection -->
              <line x1="130" y1="90" x2="80" y2="90" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <line x1="80" y1="90" x2="80" y2="50" :stroke="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" stroke-width="2"/>
              <circle cx="80" cy="45" r="5" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="2" :fill="colorMode === 'dark' ? '#3949AB' : '#E8EAF6'"/>
              <text x="60" y="35" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="10" font-weight="bold">Vref</text>
              
              <!-- Junction point -->
              <circle cx="260" cy="130" r="4" :fill="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'"/>
              <circle cx="110" cy="170" r="4" :fill="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'"/>
            </svg>
          </div>

          <!-- Transfer Characteristic -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transfer Characteristic</h3>
            <svg viewBox="0 0 400 200" class="w-full h-auto">
              <!-- Background -->
              <rect x="0" y="0" width="400" height="200" fill="none"/>
              
              <!-- Grid -->
              <defs>
                <pattern id="transferGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" :stroke="colorMode === 'dark' ? '#37474F' : '#E0E0E0'" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="url(#transferGrid)" />
              
              <!-- Axes -->
              <line x1="50" y1="100" x2="380" y2="100" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="1.5"/>
              <line x1="50" y1="20" x2="50" y2="180" :stroke="colorMode === 'dark' ? '#9FA8DA' : '#5C6BC0'" stroke-width="1.5"/>
              
              <!-- Axis labels -->
              <text x="360" y="115" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="11" font-weight="bold">Vin</text>
              <text x="20" y="30" :fill="colorMode === 'dark' ? '#E8EAF6' : '#37474F'" font-size="11" font-weight="bold">Vout</text>
              
              <!-- Vref line -->
              <line x1="50" y1="100" x2="380" y2="100" :stroke="colorMode === 'dark' ? '#757575' : '#BDBDBD'" stroke-width="1" stroke-dasharray="5,5"/>
              <text x="355" y="95" :fill="colorMode === 'dark' ? '#757575' : '#9E9E9E'" font-size="9">Vref</text>
              
              <!-- Hysteresis loop -->
              <!-- Upper path (LOW to HIGH transition) -->
              <path :d="upperPath" :stroke="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" stroke-width="2.5" fill="none"/>
              <!-- Arrow for upper transition -->
              <polygon :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" 
                :points="upperArrow"/>
              
              <!-- Lower path (HIGH to LOW transition) -->
              <path :d="lowerPath" :stroke="colorMode === 'dark' ? '#F44336' : '#D32F2F'" stroke-width="2.5" fill="none"/>
              <!-- Arrow for lower transition -->
              <polygon :fill="colorMode === 'dark' ? '#F44336' : '#D32F2F'" 
                :points="lowerArrow"/>
              
              <!-- Threshold markers -->
              <line x1="200" y1="20" x2="200" y2="180" :stroke="colorMode === 'dark' ? '#FF9800' : '#F57C00'" stroke-width="1" stroke-dasharray="3,3"/>
              <text x="195" y="195" :fill="colorMode === 'dark' ? '#FF9800' : '#F57C00'" font-size="9" font-weight="bold">VUTP</text>
              
              <line x1="120" y1="20" x2="120" y2="180" :stroke="colorMode === 'dark' ? '#9C27B0' : '#7B1FA2'" stroke-width="1" stroke-dasharray="3,3"/>
              <text x="105" y="195" :fill="colorMode === 'dark' ? '#9C27B0' : '#7B1FA2'" font-size="9" font-weight="bold">VLTP</text>
              
              <!-- Operating point (current state) -->
              <circle :cx="opX" :cy="opY" r="6" :fill="colorMode === 'dark' ? '#FFC107' : '#FFA000'" stroke="#FFF" stroke-width="2"/>
              <text :x="opX + 10" :y="opY - 10" :fill="colorMode === 'dark' ? '#FFC107' : '#FFA000'" font-size="9" font-weight="bold">Current</text>
            </svg>
          </div>

          <!-- Input/Output Waveform -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Input/Output Waveforms</h3>
            <svg viewBox="0 0 400 180" class="w-full h-auto">
              <!-- Background -->
              <rect x="0" y="0" width="400" height="180" fill="none"/>
              
              <!-- Grid -->
              <defs>
                <pattern id="waveformGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" :stroke="colorMode === 'dark' ? '#37474F' : '#E0E0E0'" stroke-width="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="180" fill="url(#waveformGrid)" />
              
              <!-- Threshold lines -->
              <line x1="30" y1="50" x2="390" y2="50" :stroke="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" stroke-width="1" stroke-dasharray="5,3"/>
              <text x="355" y="45" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="8">VUTP</text>
              
              <line x1="30" y1="110" x2="390" y2="110" :stroke="colorMode === 'dark' ? '#F44336' : '#D32F2F'" stroke-width="1" stroke-dasharray="5,3"/>
              <text x="355" y="125" :fill="colorMode === 'dark' ? '#F44336' : '#D32F2F'" font-size="8">VLTP</text>
              
              <!-- Input waveform (blue) -->
              <path :d="inputWaveformPath" :stroke="colorMode === 'dark' ? '#2196F3' : '#1976D2'" stroke-width="1.5" fill="none"/>
              <text x="10" y="85" :fill="colorMode === 'dark' ? '#2196F3' : '#1976D2'" font-size="9" font-weight="bold">Vin</text>
              
              <!-- Output waveform (green) -->
              <path :d="outputWaveformPath" :stroke="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" stroke-width="2" fill="none"/>
              <text x="10" y="25" :fill="colorMode === 'dark' ? '#4CAF50' : '#2E7D32'" font-size="9" font-weight="bold">Vout</text>
              
              <!-- Time labels -->
              <text x="30" y="175" :fill="colorMode === 'dark' ? '#757575' : '#9E9E9E'" font-size="8">0</text>
              <text x="190" y="175" :fill="colorMode === 'dark' ? '#757575' : '#9E9E9E'" font-size="8">Time</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <section class="mt-12">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Understanding Hysteresis</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-primary mb-3">What is Hysteresis?</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Hysteresis creates two different threshold voltages: one for switching from LOW to HIGH (Upper Threshold Point, V<sub>UTP</sub>) 
                and another for switching from HIGH to LOW (Lower Threshold Point, V<sub>LTP</sub>). This "dead band" prevents multiple switching 
                when the input signal has noise or oscillates near the threshold.
              </p>
              
              <h3 class="text-lg font-semibold text-primary mb-3">Key Formulas</h3>
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm mb-4">
                <div class="mb-2">V<sub>UTP</sub> = (1 + R<sub>1</sub>/R<sub>2</sub>) × V<sub>ref</sub> - (R<sub>1</sub>/R<sub>2</sub>) × V<sub>OL</sub></div>
                <div class="mb-2">V<sub>LTP</sub> = (1 + R<sub>1</sub>/R<sub>2</sub>) × V<sub>ref</sub> - (R<sub>1</sub>/R<sub>2</sub>) × V<sub>OH</sub></div>
                <div class="mb-2">V<sub>H</sub> = V<sub>UTP</sub> - V<sub>LTP</sub> = (R<sub>1</sub>/R<sub>2</sub>) × (V<sub>OH</sub> - V<sub>OL</sub>)</div>
                <div>Using feedback ratio: β = R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)</div>
              </div>

              <h3 class="text-lg font-semibold text-primary mb-3">Noise Immunity</h3>
              <p class="text-gray-600 dark:text-gray-300">
                The hysteresis voltage (V<sub>H</sub>) represents the noise margin. Any noise smaller than V<sub>H</sub>/2 will not cause false triggering. 
                This makes Schmitt triggers ideal for cleaning up noisy signals.
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-primary mb-3">Design Considerations</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Feedback Ratio:</strong> Lower β = higher hysteresis (more noise immunity, but less sensitive)</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Output Swing:</strong> Larger output swing increases hysteresis voltage</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Reference Voltage:</strong> Centers the hysteresis window around a desired voltage</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Resistor Values:</strong> Actual R1, R2 values affect impedance and power consumption</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Comparator Speed:</strong> Fast comparators needed for high-frequency signals</span>
                </li>
              </ul>
              
              <h3 class="text-lg font-semibold text-primary mb-3 mt-6">Applications</h3>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Debouncing switches and buttons</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Square wave generation from slow-changing signals</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Zero-crossing detectors with noise immunity</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Pulse width modulation (PWM) receivers</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span>Level shifters and signal conditioning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

// Circuit parameters
const vRef = ref(5)
const feedbackRatio = ref(0.25)
const vOutHigh = ref(10)
const vOutLow = ref(0)
const noiseLevel = ref(0.3)
const inputFreq = ref(1)
const outputState = ref(false) // false = LOW, true = HIGH

// Calculate thresholds
const hysteresisVoltage = computed(() => {
  const r1r2 = (1 - feedbackRatio.value) / feedbackRatio.value
  return r1r2 * (vOutHigh.value - vOutLow.value)
})

const upperThreshold = computed(() => {
  const r1r2 = (1 - feedbackRatio.value) / feedbackRatio.value
  return vRef.value + r1r2 * (vRef.value - vOutLow.value)
})

const lowerThreshold = computed(() => {
  const r1r2 = (1 - feedbackRatio.value) / feedbackRatio.value
  return vRef.value + r1r2 * (vRef.value - vOutHigh.value)
})

// Generate waveform paths
const inputWaveformPath = computed(() => {
  const centerX = 80
  const centerY = 80
  const amplitude = 40
  const noise = noiseLevel.value * 10
  
  let path = 'M 30 ' + centerY
  
  for (let i = 0; i <= 360; i += 2) {
    const x = 30 + i
    const angle = (i / 360) * (inputFreq.value * 2 * Math.PI)
    
    // Add noise
    const noiseSignal = (Math.random() - 0.5) * noise
    
    const y = centerY + amplitude * Math.sin(angle) + noiseSignal
    path += ` L ${x} ${y}`
  }
  
  return path
})

const outputWaveformPath = computed(() => {
  const highY = 35
  const lowY = 145
  const centerY = 80
  const amplitude = 40
  
  let path = 'M 30 ' + lowY
  let currentState = false
  
  for (let i = 0; i <= 360; i += 2) {
    const x = 30 + i
    const angle = (i / 360) * (inputFreq.value * 2 * Math.PI)
    const inputVal = centerY + amplitude * Math.sin(angle)
    
    // Check thresholds with hysteresis
    if (!currentState && inputVal > upperThreshold.value * 8) {
      currentState = true
    } else if (currentState && inputVal < lowerThreshold.value * 8) {
      currentState = false
    }
    
    const y = currentState ? highY : lowY
    path += ` L ${x} ${y}`
  }
  
  return path
})

// Transfer characteristic paths
const upperPath = computed(() => {
  // LOW to HIGH transition path
  const vutpX = 200 + (upperThreshold.value - 5) * 15
  const vltpX = 120 + (lowerThreshold.value - 5) * 15
  const highY = 40
  const lowY = 160
  
  return `M 50 ${lowY} L ${vutpX} ${lowY} L ${vutpX} ${highY} L 380 ${highY}`
})

const lowerPath = computed(() => {
  // HIGH to LOW transition path
  const vutpX = 200 + (upperThreshold.value - 5) * 15
  const vltpX = 120 + (lowerThreshold.value - 5) * 15
  const highY = 40
  const lowY = 160
  
  return `M 50 ${highY} L ${vltpX} ${highY} L ${vltpX} ${lowY} L 380 ${lowY}`
})

const upperArrow = computed(() => {
  const vutpX = 200 + (upperThreshold.value - 5) * 15
  return `${vutpX - 5},65 ${vutpX + 5},65 ${vutpX},75`
})

const lowerArrow = computed(() => {
  const vltpX = 120 + (lowerThreshold.value - 5) * 15
  return `${vltpX - 5},135 ${vltpX + 5},135 ${vltpX},125`
})

// Current operating point on transfer curve
const opX = computed(() => {
  // Simulate a moving operating point
  return 150 + Math.sin(Date.now() / 1000) * 80
})

const opY = computed(() => {
  const inputVal = 5 + Math.sin(Date.now() / 1000) * 2
  if (inputVal > upperThreshold.value) {
    return 40
  } else if (inputVal < lowerThreshold.value) {
    return 160
  }
  return outputState.value ? 40 : 160
})

// Preset configurations
function setPreset(preset) {
  switch(preset) {
    case 'lowHysteresis':
      vRef.value = 5
      feedbackRatio.value = 0.45
      vOutHigh.value = 10
      vOutLow.value = 0
      noiseLevel.value = 0.3
      break
    case 'mediumHysteresis':
      vRef.value = 5
      feedbackRatio.value = 0.25
      vOutHigh.value = 10
      vOutLow.value = 0
      noiseLevel.value = 0.5
      break
    case 'highHysteresis':
      vRef.value = 5
      feedbackRatio.value = 0.1
      vOutHigh.value = 10
      vOutLow.value = 0
      noiseLevel.value = 0.8
      break
    case 'noisy':
      vRef.value = 5
      feedbackRatio.value = 0.15
      vOutHigh.value = 10
      vOutLow.value = 0
      noiseLevel.value = 1.5
      break
  }
}
</script>

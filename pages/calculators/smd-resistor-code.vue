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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            SMD Resistor Code Decoder
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Decode surface mount device resistor markings instantly
          </p>
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div class="text-2xl font-mono">
              <span class="text-primary">103</span>
              <span class="text-gray-700 dark:text-gray-300"> → </span>
              <span class="text-primary">10kΩ</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Calculator Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8">
        <!-- Code Type Selection -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Code Format
          </label>
          <div class="grid grid-cols-3 gap-4">
            <button
              @click="codeFormat = '3-digit'"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                codeFormat === '3-digit'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <div class="text-2xl font-mono mb-1">103</div>
                <span>3-Digit EIA</span>
                <div class="text-xs mt-1 opacity-75">±5% tolerance</div>
              </div>
            </button>
            <button
              @click="codeFormat = '4-digit'"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                codeFormat === '4-digit'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <div class="text-2xl font-mono mb-1">1002</div>
                <span>4-Digit EIA</span>
                <div class="text-xs mt-1 opacity-75">±1% tolerance</div>
              </div>
            </button>
            <button
              @click="codeFormat = 'E96'"
              :class="[
                'p-4 rounded-lg border-2 transition-all font-medium',
                codeFormat === 'E96'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary/50'
              ]"
            >
              <div class="text-center">
                <div class="text-2xl font-mono mb-1">01F</div>
                <span>EIA-96</span>
                <div class="text-xs mt-1 opacity-75">±1% tolerance</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Code Input -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Enter SMD Code
          </label>
          <div class="flex items-center space-x-4">
            <input
              v-model="smdCode"
              type="text"
              :maxlength="codeFormat === 'E96' ? 3 : codeFormat === '4-digit' ? 4 : 3"
              :placeholder="codeFormat === 'E96' ? '01F' : codeFormat === '4-digit' ? '1002' : '103'"
              @input="decodeSMDCode"
              class="flex-1 px-4 py-3 text-2xl font-mono border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent uppercase text-center"
            />
            <button
              @click="clearCode"
              class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {{ codeFormat === 'E96' ? 'Enter 3-character code (e.g., 01F, 47D, 68C)' : codeFormat === '4-digit' ? 'Enter 4-digit code (e.g., 1002, 4701, 2003)' : 'Enter 3-digit code (e.g., 103, 472, 681)' }}
          </p>
        </div>

        <!-- Quick Examples -->
        <div class="mb-8">
          <label class="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Quick Examples
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              v-for="example in examples"
              :key="example.code"
              @click="selectExample(example)"
              class="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/5 transition-all text-sm"
            >
              <div class="font-mono font-bold text-primary">{{ example.code }}</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">{{ example.value }}</div>
            </button>
          </div>
        </div>

        <!-- Result Display -->
        <div v-if="decodedValue" class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-8">
          <div class="text-center mb-6">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Decoded Resistance Value</div>
            <div class="text-6xl font-mono font-bold text-green-600 dark:text-green-400 mb-2">
              {{ decodedValue }}
            </div>
            <div class="text-lg text-gray-700 dark:text-gray-300">
              Tolerance: <span class="font-semibold text-primary">{{ decodedTolerance }}</span>
            </div>
          </div>

          <!-- Value Breakdown -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Value Breakdown</h3>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Significant Digits</div>
                <div class="text-xl font-mono font-bold text-primary">{{ significantDigits }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Multiplier</div>
                <div class="text-xl font-mono font-bold text-primary">{{ multiplier }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Power of 10</div>
                <div class="text-xl font-mono font-bold text-primary">10<sup>{{ powerOfTen }}</sup></div>
              </div>
            </div>
          </div>

          <!-- Equivalent Values -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Equivalent Values</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="text-center">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Ohms (Ω)</div>
                <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ ohmsValue }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Kilohms (kΩ)</div>
                <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ kilohmsValue }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Megohms (MΩ)</div>
                <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ megohmsValue }}</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Milliohms (mΩ)</div>
                <div class="font-mono font-semibold text-gray-900 dark:text-white">{{ milliohmsValue }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Display -->
        <div v-else-if="smdCode && errorMessage" class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 rounded-xl p-8">
          <div class="flex items-start">
            <svg class="h-8 w-8 text-red-600 dark:text-red-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Invalid Code</h3>
              <p class="text-red-700 dark:text-red-400">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SMD Component Visualizer -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          SMD Component Visualization
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Component Size Reference -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Package Size Reference</h3>
            <div class="space-y-3">
              <div v-for="pkg in packageSizes" :key="pkg.name" 
                   class="flex items-center justify-between p-3 rounded-lg border"
                   :class="pkg.common ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-600'">
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ pkg.name }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{{ pkg.dimensions }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-600 dark:text-gray-400">Power Rating</div>
                  <div class="font-mono text-sm font-semibold text-primary">{{ pkg.power }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Component Diagram -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Component Diagram</h3>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <svg viewBox="0 0 300 150" class="w-full h-auto">
                <!-- SMD resistor body -->
                <rect x="50" y="50" width="200" height="50" rx="3" fill="#1a1a1a" stroke="#333" stroke-width="2"/>
                
                <!-- Metal end caps -->
                <rect x="45" y="45" width="10" height="60" rx="2" fill="#d4af37"/>
                <rect x="245" y="45" width="10" height="60" rx="2" fill="#d4af37"/>
                
                <!-- Code marking -->
                <text x="150" y="82" font-size="28" font-family="monospace" font-weight="bold" fill="white" text-anchor="middle">
                  {{ smdCode || (codeFormat === 'E96' ? '01F' : codeFormat === '4-digit' ? '1002' : '103') }}
                </text>
                
                <!-- Dimension labels -->
                <line x1="50" y1="110" x2="250" y2="110" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/>
                <text x="150" y="125" font-size="10" fill="#666" text-anchor="middle">Length (L)</text>
                
                <line x1="30" y1="50" x2="30" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="5,3"/>
                <text x="25" y="78" font-size="10" fill="#666" text-anchor="end">Width (W)</text>
                
                <!-- Terminals -->
                <rect x="35" y="60" width="10" height="30" fill="#c0c0c0" stroke="#999" stroke-width="1"/>
                <rect x="255" y="60" width="10" height="30" fill="#c0c0c0" stroke="#999" stroke-width="1"/>
                <text x="40" y="55" font-size="8" fill="#666" text-anchor="middle">1</text>
                <text x="260" y="55" font-size="8" fill="#666" text-anchor="middle">2</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Understanding SMD Resistor Codes
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- 3-Digit EIA Code -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3-Digit EIA Code (±5%)</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The 3-digit code is used for standard tolerance resistors (±5%). The first two digits are significant figures, and the third digit is the multiplier (power of 10).
            </p>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">103</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">10 × 10³ Ω</span>
                <span class="font-semibold text-primary">= 10kΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">472</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">47 × 10² Ω</span>
                <span class="font-semibold text-primary">= 4.7kΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">681</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">68 × 10¹ Ω</span>
                <span class="font-semibold text-primary">= 680Ω</span>
              </div>
            </div>
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Values below 10Ω use 'R' to indicate the decimal point (e.g., 4R7 = 4.7Ω, R22 = 0.22Ω)
            </div>
          </div>

          <!-- 4-Digit EIA Code -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4-Digit EIA Code (±1%)</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The 4-digit code is used for precision resistors (±1% tolerance). The first three digits are significant figures, and the fourth digit is the multiplier.
            </p>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">1002</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">100 × 10² Ω</span>
                <span class="font-semibold text-primary">= 10kΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">4701</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">470 × 10¹ Ω</span>
                <span class="font-semibold text-primary">= 4.7kΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">2003</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">200 × 10³ Ω</span>
                <span class="font-semibold text-primary">= 200kΩ</span>
              </div>
            </div>
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Provides better precision for values requiring 3 significant figures
            </div>
          </div>

          <!-- EIA-96 Code -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">EIA-96 Code (±1%)</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The EIA-96 system uses 2 digits for the value code and 1 letter for the multiplier. This allows marking very small precision resistors.
            </p>
            <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">01F</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">100 × 10⁵ Ω</span>
                <span class="font-semibold text-primary">= 10MΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">47D</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">301 × 10³ Ω</span>
                <span class="font-semibold text-primary">= 301kΩ</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-mono text-lg">68C</span>
                <span class="text-gray-600 dark:text-gray-400">=</span>
                <span class="font-mono">499 × 10² Ω</span>
                <span class="font-semibold text-primary">= 49.9kΩ</span>
              </div>
            </div>
            <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> The 2-digit code corresponds to E96 series values (01-96)
            </div>
          </div>

          <!-- Multiplier Letters -->
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">EIA-96 Multiplier Letters</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              The letter in EIA-96 codes indicates the power of 10 multiplier:
            </p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">Y</span>
                <span>× 10⁻²</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">X or R</span>
                <span>× 10⁻¹</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">A</span>
                <span>× 10⁰</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">B</span>
                <span>× 10¹</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">C</span>
                <span>× 10²</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">D</span>
                <span>× 10³</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">E</span>
                <span>× 10⁴</span>
              </div>
              <div class="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span class="font-mono font-bold">F</span>
                <span>× 10⁵</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Applications -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Common Applications</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Consumer Electronics</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">SMD resistors are used in smartphones, tablets, laptops, and other portable devices where space is at a premium.</p>
            </div>
            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Industrial Equipment</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Precision analog circuits, sensor interfaces, and control systems use 1% tolerance SMD resistors.</p>
            </div>
            <div class="border-l-4 border-primary pl-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Automotive</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Engine control units, safety systems, and infotainment systems rely on SMD resistors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <svg class="mx-auto h-12 mb-4 hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
            <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
            <circle cx="20" cy="20" r="3" fill="#7986CB"/>
            <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
          </svg>
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useColorMode } from '@vueuse/core'
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  name: 'SMDResistorCodeCalculator',
  components: {
    NavigationBar
  },
  setup() {
    useHead({
      title: 'SMD Resistor Code Decoder - Cyno Electric',
      meta: [
        { name: 'description', content: 'Decode surface mount device resistor codes with support for 3-digit EIA, 4-digit EIA, and EIA-96 marking systems.' }
      ]
    })
    
    const colorMode = useColorMode()
    return { colorMode }
  },
  data() {
    return {
      codeFormat: '3-digit',
      smdCode: '',
      decodedValue: '',
      decodedTolerance: '',
      significantDigits: '',
      multiplier: '',
      powerOfTen: 0,
      errorMessage: '',
      
      // EIA-96 value codes (standard 96 values)
      eia96Values: [
        100, 102, 105, 107, 110, 113, 115, 118, 121, 124,
        127, 130, 133, 137, 140, 143, 147, 150, 154, 158,
        162, 165, 169, 174, 178, 182, 187, 191, 196, 200,
        205, 210, 215, 221, 226, 232, 237, 243, 249, 255,
        261, 267, 274, 280, 287, 294, 301, 309, 316, 324,
        332, 340, 348, 357, 365, 374, 383, 392, 402, 412,
        422, 432, 442, 453, 464, 475, 487, 499, 511, 523,
        536, 549, 562, 576, 590, 604, 619, 634, 649, 665,
        681, 698, 715, 732, 750, 768, 787, 806, 825, 845,
        866, 887, 909, 931, 953, 976
      ],
      
      // EIA-96 multiplier codes
      eia96Multipliers: {
        'Y': -2, 'X': -1, 'R': -1, 'A': 0, 'B': 1, 'C': 2, 'D': 3,
        'E': 4, 'F': 5, 'G': 6, 'H': 7, 'J': 8, 'K': 9, 'L': 10
      },
      
      packageSizes: [
        { name: '0201', dimensions: '0.6mm × 0.3mm', power: '1/20W', common: false },
        { name: '0402', dimensions: '1.0mm × 0.5mm', power: '1/16W', common: true },
        { name: '0603', dimensions: '1.6mm × 0.8mm', power: '1/10W', common: true },
        { name: '0805', dimensions: '2.0mm × 1.25mm', power: '1/8W', common: true },
        { name: '1206', dimensions: '3.2mm × 1.6mm', power: '1/4W', common: true },
        { name: '2512', dimensions: '6.4mm × 3.2mm', power: '1W', common: false }
      ]
    }
  },
  computed: {
    examples() {
      if (this.codeFormat === '3-digit') {
        return [
          { code: '103', value: '10kΩ' },
          { code: '472', value: '4.7kΩ' },
          { code: '681', value: '680Ω' },
          { code: '333', value: '33kΩ' }
        ]
      } else if (this.codeFormat === '4-digit') {
        return [
          { code: '1002', value: '10kΩ' },
          { code: '4701', value: '4.7kΩ' },
          { code: '2003', value: '200kΩ' },
          { code: '1502', value: '15kΩ' }
        ]
      } else {
        return [
          { code: '01F', value: '10MΩ' },
          { code: '47D', value: '301kΩ' },
          { code: '68C', value: '49.9kΩ' },
          { code: '10E', value: '1.24MΩ' }
        ]
      }
    },
    ohmsValue() {
      if (!this.decodedValue) return '-'
      const match = this.decodedValue.match(/^[\d.]+/)
      if (match) {
        const num = parseFloat(match[0])
        if (this.decodedValue.includes('M')) {
          return (num * 1000000).toFixed(0)
        } else if (this.decodedValue.includes('k')) {
          return (num * 1000).toFixed(0)
        } else if (this.decodedValue.includes('m')) {
          return (num / 1000).toFixed(6).replace(/\.?0+$/, '')
        }
        return num.toFixed(0)
      }
      return '-'
    },
    kilohmsValue() {
      if (!this.decodedValue) return '-'
      const match = this.decodedValue.match(/^[\d.]+/)
      if (match) {
        const num = parseFloat(match[0])
        if (this.decodedValue.includes('M')) {
          return (num * 1000).toFixed(2)
        } else if (this.decodedValue.includes('k')) {
          return num.toFixed(2)
        } else if (this.decodedValue.includes('m')) {
          return (num / 1000000).toFixed(6).replace(/\.?0+$/, '')
        }
        return (num / 1000).toFixed(3)
      }
      return '-'
    },
    megohmsValue() {
      if (!this.decodedValue) return '-'
      const match = this.decodedValue.match(/^[\d.]+/)
      if (match) {
        const num = parseFloat(match[0])
        if (this.decodedValue.includes('M')) {
          return num.toFixed(2)
        } else if (this.decodedValue.includes('k')) {
          return (num / 1000).toFixed(4)
        } else if (this.decodedValue.includes('m')) {
          return (num / 1000000000).toFixed(8).replace(/\.?0+$/, '')
        }
        return (num / 1000000).toFixed(6)
      }
      return '-'
    },
    milliohmsValue() {
      if (!this.decodedValue) return '-'
      const match = this.decodedValue.match(/^[\d.]+/)
      if (match) {
        const num = parseFloat(match[0])
        if (this.decodedValue.includes('M')) {
          return (num * 1000000000).toFixed(0)
        } else if (this.decodedValue.includes('k')) {
          return (num * 1000000).toFixed(0)
        } else if (this.decodedValue.includes('m')) {
          return num.toFixed(0)
        }
        return (num * 1000).toFixed(0)
      }
      return '-'
    }
  },
  watch: {
    codeFormat() {
      this.smdCode = ''
      this.decodedValue = ''
      this.errorMessage = ''
    }
  },
  methods: {
    decodeSMDCode() {
      this.errorMessage = ''
      this.decodedValue = ''
      
      if (!this.smdCode) {
        return
      }
      
      const code = this.smdCode.toUpperCase().trim()
      
      if (this.codeFormat === '3-digit') {
        this.decode3Digit(code)
      } else if (this.codeFormat === '4-digit') {
        this.decode4Digit(code)
      } else if (this.codeFormat === 'E96') {
        this.decodeEIA96(code)
      }
    },
    
    decode3Digit(code) {
      // Check for R notation (e.g., 4R7, R22)
      if (code.includes('R')) {
        const parts = code.split('R')
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const intPart = parts[0] || '0'
          const decPart = parts[1] || '0'
          const value = parseFloat(`${intPart}.${decPart}`)
          this.decodedValue = value >= 1 ? `${value.toFixed(2).replace(/\.?0+$/, '')}Ω` : `${value}Ω`
          this.decodedTolerance = '±5%'
          this.significantDigits = intPart + decPart
          this.multiplier = '1'
          this.powerOfTen = 0
          return
        }
      }
      
      // Standard 3-digit code
      if (!/^\d{3}$/.test(code)) {
        this.errorMessage = 'Invalid 3-digit code format. Use format like "103" (10kΩ) or "4R7" (4.7Ω).'
        return
      }
      
      const digits = parseInt(code.substring(0, 2))
      const multiplier = parseInt(code.substring(2))
      const value = digits * Math.pow(10, multiplier)
      
      this.decodedValue = this.formatResistance(value)
      this.decodedTolerance = '±5%'
      this.significantDigits = digits.toString()
      this.multiplier = `10^${multiplier}`
      this.powerOfTen = multiplier
    },
    
    decode4Digit(code) {
      // Check for R notation
      if (code.includes('R')) {
        const parts = code.split('R')
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const intPart = parts[0] || '0'
          const decPart = parts[1] || '0'
          const value = parseFloat(`${intPart}.${decPart}`)
          this.decodedValue = value >= 1 ? `${value.toFixed(2).replace(/\.?0+$/, '')}Ω` : `${value}Ω`
          this.decodedTolerance = '±1%'
          this.significantDigits = intPart + decPart
          this.multiplier = '1'
          this.powerOfTen = 0
          return
        }
      }
      
      // Standard 4-digit code
      if (!/^\d{4}$/.test(code)) {
        this.errorMessage = 'Invalid 4-digit code format. Use format like "1002" (10kΩ) or "4R70" (4.7Ω).'
        return
      }
      
      const digits = parseInt(code.substring(0, 3))
      const multiplier = parseInt(code.substring(3))
      const value = digits * Math.pow(10, multiplier)
      
      this.decodedValue = this.formatResistance(value)
      this.decodedTolerance = '±1%'
      this.significantDigits = digits.toString()
      this.multiplier = `10^${multiplier}`
      this.powerOfTen = multiplier
    },
    
    decodeEIA96(code) {
      if (!/^\d{2}[A-Z]$/i.test(code)) {
        this.errorMessage = 'Invalid EIA-96 format. Use format like "01F" (value code + multiplier letter).'
        return
      }
      
      const valueCode = parseInt(code.substring(0, 2))
      const multiplierLetter = code.substring(2).toUpperCase()
      
      if (valueCode < 1 || valueCode > 96) {
        this.errorMessage = 'Invalid value code. Must be between 01 and 96.'
        return
      }
      
      if (!(multiplierLetter in this.eia96Multipliers)) {
        this.errorMessage = `Invalid multiplier letter: ${multiplierLetter}. Valid letters: Y, X, R, A-L.`
        return
      }
      
      const value = this.eia96Values[valueCode - 1]
      const multiplier = this.eia96Multipliers[multiplierLetter]
      const finalValue = value * Math.pow(10, multiplier)
      
      this.decodedValue = this.formatResistance(finalValue)
      this.decodedTolerance = '±1%'
      this.significantDigits = value.toString()
      this.multiplier = `10^${multiplier}`
      this.powerOfTen = multiplier
    },
    
    formatResistance(ohms) {
      if (ohms >= 1000000) {
        return `${(ohms / 1000000).toFixed(2).replace(/\.?0+$/, '')}MΩ`
      } else if (ohms >= 1000) {
        return `${(ohms / 1000).toFixed(2).replace(/\.?0+$/, '')}kΩ`
      } else if (ohms >= 1) {
        return `${ohms.toFixed(2).replace(/\.?0+$/, '')}Ω`
      } else {
        return `${(ohms * 1000).toFixed(2).replace(/\.?0+$/, '')}mΩ`
      }
    },
    
    selectExample(example) {
      this.smdCode = example.code
      this.decodeSMDCode()
    },
    
    clearCode() {
      this.smdCode = ''
      this.decodedValue = ''
      this.errorMessage = ''
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ Conductor Voltage Drop Calculator
        </h1>
        <p class="text-amber-300 text-lg">Calculate voltage drop in electrical conductors and wires</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Circuit Parameters
          </h2>

          <!-- Supply Voltage -->
          <div class="mb-6 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>🔋 Supply Voltage (V)</span>
              <span class="font-mono font-bold">{{ supplyVoltage }}V</span>
            </label>
            <input
              type="range"
              v-model.number="supplyVoltage"
              min="1"
              max="1000"
              step="1"
              class="w-full h-3 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1V</span>
              <span>1000V</span>
            </div>
          </div>

          <!-- Load Current -->
          <div class="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>📊 Load Current (A)</span>
              <span class="font-mono font-bold">{{ loadCurrent }}A</span>
            </label>
            <input
              type="range"
              v-model.number="loadCurrent"
              min="0.1"
              max="500"
              step="0.1"
              class="w-full h-3 bg-purple-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.1A</span>
              <span>500A</span>
            </div>
          </div>

          <!-- Conductor Length -->
          <div class="mb-6 p-4 bg-orange-500/20 rounded-xl border border-orange-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>📏 Conductor Length (m)</span>
              <span class="font-mono font-bold">{{ conductorLength }}m</span>
            </label>
            <input
              type="range"
              v-model.number="conductorLength"
              min="1"
              max="1000"
              step="1"
              class="w-full h-3 bg-orange-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1m</span>
              <span>1000m</span>
            </div>
          </div>

          <!-- Conductor Material -->
          <div class="mb-6 p-4 bg-green-500/20 rounded-xl border border-green-400/40">
            <label class="text-white text-sm mb-2 block">🔧 Conductor Material</label>
            <select
              v-model="material"
              class="w-full p-3 bg-slate-800 text-white rounded-lg border border-green-400/40 focus:outline-none focus:border-amber-400"
            >
              <option value="copper">Copper (Cu)</option>
              <option value="aluminum">Aluminum (Al)</option>
              <option value="gold">Gold (Au)</option>
              <option value="silver">Silver (Ag)</option>
            </select>
            <div class="mt-2 text-sm text-gray-300">
              Resistivity: {{ materialResistivity.toFixed(3) }} Ω·mm²/m
            </div>
          </div>

          <!-- Wire Size Selection -->
          <div class="mb-6 p-4 bg-pink-500/20 rounded-xl border border-pink-400/40">
            <label class="text-white text-sm mb-2 block">📐 Wire Size</label>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-gray-300 text-xs mb-1 block">AWG</label>
                <select
                  v-model="wireSizeAWG"
                  @change="updateWireSizeFromAWG"
                  class="w-full p-2 bg-slate-800 text-white rounded border border-pink-400/40 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="0000">0000 (4/0)</option>
                  <option value="000">000 (3/0)</option>
                  <option value="00">00 (2/0)</option>
                  <option value="0">0 (1/0)</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="22">22</option>
                  <option value="24">24</option>
                </select>
              </div>
              <div>
                <label class="text-gray-300 text-xs mb-1 block">Cross Section (mm²)</label>
                <input
                  type="number"
                  v-model.number="wireSizeMM2"
                  @input="updateAWGFromMM2"
                  step="0.1"
                  min="0.1"
                  class="w-full p-2 bg-slate-800 text-white rounded border border-pink-400/40 focus:outline-none focus:border-amber-400 text-sm"
                >
              </div>
            </div>
            <div class="mt-3 flex justify-between text-sm">
              <span class="text-gray-300">Diameter:</span>
              <span class="font-mono font-bold text-white">{{ wireDiameter.toFixed(2) }} mm</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-300">Circular Mils:</span>
              <span class="font-mono font-bold text-white">{{ circularMils.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Conductor Temperature -->
          <div class="mb-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>🌡️ Conductor Temperature (°C)</span>
              <span class="font-mono font-bold">{{ temperature }}°C</span>
            </label>
            <input
              type="range"
              v-model.number="temperature"
              min="-40"
              max="200"
              step="1"
              class="w-full h-3 bg-yellow-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>-40°C</span>
              <span>200°C</span>
            </div>
          </div>

          <!-- Phase Type -->
          <div class="mb-6 p-4 bg-indigo-500/20 rounded-xl border border-indigo-400/40">
            <label class="text-white text-sm mb-2 block">⚡ System Type</label>
            <select
              v-model="phaseType"
              class="w-full p-3 bg-slate-800 text-white rounded-lg border border-indigo-400/40 focus:outline-none focus:border-amber-400"
            >
              <option value="single-phase">Single-Phase (2-wire)</option>
              <option value="three-phase">Three-Phase (3-wire)</option>
            </select>
            <div class="mt-2 text-sm text-gray-300" v-if="phaseType === 'single-phase'">
              Voltage drop calculated for round trip (out + return)
            </div>
            <div class="mt-2 text-sm text-gray-300" v-else>
              Voltage drop calculated for single conductor in balanced system
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-6 p-4 bg-teal-500/20 rounded-xl border border-teal-400/40">
            <h3 class="text-lg font-bold text-teal-300 mb-4">⚡ Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('home')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                🏠 Home Wiring
              </button>
              <button
                @click="loadPreset('automotive')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                🚗 Automotive
              </button>
              <button
                @click="loadPreset('industrial')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                🏭 Industrial
              </button>
              <button
                @click="loadPreset('solar')"
                class="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-all"
              >
                ☀️ Solar PV
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          <!-- Voltage Drop Summary -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
            <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📊</span> Voltage Drop Results
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <!-- Voltage Drop -->
              <div class="bg-slate-800/50 rounded-lg p-4">
                <div class="text-gray-400 text-sm mb-1">Voltage Drop</div>
                <div class="text-3xl font-bold text-amber-400 font-mono">{{ voltageDrop.toFixed(2) }}V</div>
                <div class="text-gray-400 text-sm mt-1">{{ voltageDropPercent.toFixed(2) }}% of supply</div>
              </div>

              <!-- Final Voltage -->
              <div class="bg-slate-800/50 rounded-lg p-4">
                <div class="text-gray-400 text-sm mb-1">Final Voltage</div>
                <div class="text-3xl font-bold" :class="finalVoltageClass">{{ finalVoltage.toFixed(2) }}V</div>
                <div class="text-gray-400 text-sm mt-1">At load</div>
              </div>

              <!-- Resistance -->
              <div class="bg-slate-800/50 rounded-lg p-4">
                <div class="text-gray-400 text-sm mb-1">Conductor Resistance</div>
                <div class="text-3xl font-bold text-cyan-400 font-mono">{{ conductorResistance.toFixed(3) }}Ω</div>
                <div class="text-gray-400 text-sm mt-1">{{ temperature }}°C</div>
              </div>

              <!-- Power Loss -->
              <div class="bg-slate-800/50 rounded-lg p-4">
                <div class="text-gray-400 text-sm mb-1">Power Loss</div>
                <div class="text-3xl font-bold text-red-400 font-mono">{{ powerLoss.toFixed(2) }}W</div>
                <div class="text-gray-400 text-sm mt-1">Heat dissipated</div>
              </div>
            </div>

            <!-- Status Indicator -->
            <div class="mt-6 p-4 rounded-xl" :class="statusBgClass">
              <div class="flex items-center gap-3">
                <div class="text-4xl">{{ statusIcon }}</div>
                <div>
                  <div class="font-bold text-xl" :class="statusTextClass">{{ statusText }}</div>
                  <div class="text-sm opacity-80">{{ statusDescription }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Visual Representation -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🔌</span> Visual Representation
            </h3>
            <div class="bg-slate-900 rounded-xl p-6">
              <svg viewBox="0 0 400 250" class="w-full h-auto">
                <!-- Wire representation -->
                <defs>
                  <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" :style="{ stopColor: voltageDropPercent < 3 ? '#22c55e' : voltageDropPercent < 5 ? '#eab308' : '#ef4444' }" />
                    <stop offset="100%" :style="{ stopColor: voltageDropPercent < 3 ? '#86efac' : voltageDropPercent < 5 ? '#fde047' : '#fca5a5' }" />
                  </linearGradient>
                </defs>

                <!-- Supply source -->
                <rect x="30" y="80" width="40" height="90" rx="5" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
                <text x="50" y="130" text-anchor="middle" fill="white" font-size="12" font-weight="bold">AC</text>
                <text x="50" y="50" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ supplyVoltage }}V</text>

                <!-- Outgoing wire -->
                <line x1="70" y1="95" x2="200" y2="95" :stroke="voltageDropPercent < 3 ? '#22c55e' : voltageDropPercent < 5 ? '#eab308' : '#ef4444'" stroke-width="6"/>
                <text x="135" y="85" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ (conductorLength / 2).toFixed(0) }}m</text>

                <!-- Load -->
                <rect x="200" y="75" width="60" height="60" rx="5" fill="#8b5cf6" stroke="#5b21b6" stroke-width="2"/>
                <text x="230" y="110" text-anchor="middle" fill="white" font-size="11" font-weight="bold">LOAD</text>
                <text x="230" y="150" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ loadCurrent }}A</text>

                <!-- Return wire -->
                <line x1="260" y1="155" x2="70" y2="155" :stroke="voltageDropPercent < 3 ? '#22c55e' : voltageDropPercent < 5 ? '#eab308' : '#ef4444'" stroke-width="6"/>
                <text x="165" y="175" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="monospace">{{ (conductorLength / 2).toFixed(0) }}m</text>

                <!-- Voltage labels -->
                <text x="130" y="115" text-anchor="middle" fill="#94a3b8" font-size="9">{{ (supplyVoltage - voltageDrop / 2).toFixed(1) }}V</text>
                <text x="280" y="115" text-anchor="middle" fill="#94a3b8" font-size="9">{{ finalVoltage.toFixed(1) }}V</text>

                <!-- Current arrows -->
                <polygon points="100,70 105,80 95,80" fill="#22c55e"/>
                <polygon points="150,70 155,80 145,80" fill="#22c55e"/>
                <text x="125" y="65" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">I →</text>

                <!-- Voltage drop indicator -->
                <rect x="310" y="100" width="80" height="50" rx="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                <text x="350" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">Voltage Drop</text>
                <text x="350" y="138" text-anchor="middle" :fill="voltageDropPercent < 3 ? '#22c55e' : voltageDropPercent < 5 ? '#eab308' : '#ef4444'" font-size="14" font-weight="bold" font-family="monospace">{{ voltageDropPercent.toFixed(2) }}%</text>

                <!-- Power loss indicator -->
                <rect x="310" y="160" width="80" height="50" rx="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                <text x="350" y="178" text-anchor="middle" fill="#94a3b8" font-size="9">Power Loss</text>
                <text x="350" y="198" text-anchor="middle" fill="#ef4444" font-size="14" font-weight="bold" font-family="monospace">{{ powerLoss.toFixed(1) }}W</text>
              </svg>
            </div>
          </div>

          <!-- Detailed Calculations -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🧮</span> Detailed Calculations
            </h3>
            <div class="space-y-3 font-mono text-sm">
              <div class="bg-slate-900 rounded-lg p-3">
                <div class="text-amber-300 text-xs mb-1">Resistance at {{ temperature }}°C:</div>
                <div class="text-white">R = (ρ × L) / A</div>
                <div class="text-gray-400">R = ({{ materialResistivity.toFixed(3) }} × {{ conductorLength }}) / {{ wireSizeMM2.toFixed(2) }}</div>
                <div class="text-cyan-400 font-bold">R = {{ conductorResistance.toFixed(3) }}Ω</div>
              </div>

              <div class="bg-slate-900 rounded-lg p-3">
                <div class="text-amber-300 text-xs mb-1">Voltage Drop:</div>
                <div class="text-white" v-if="phaseType === 'single-phase'">V_drop = 2 × I × R</div>
                <div class="text-white" v-else>V_drop = √3 × I × R</div>
                <div class="text-gray-400" v-if="phaseType === 'single-phase'">V_drop = 2 × {{ loadCurrent }} × {{ conductorResistance.toFixed(3) }}</div>
                <div class="text-gray-400" v-else>V_drop = √3 × {{ loadCurrent }} × {{ conductorResistance.toFixed(3) }}</div>
                <div class="text-cyan-400 font-bold">V_drop = {{ voltageDrop.toFixed(3) }}V</div>
              </div>

              <div class="bg-slate-900 rounded-lg p-3">
                <div class="text-amber-300 text-xs mb-1">Power Loss:</div>
                <div class="text-white">P_loss = I² × R_total</div>
                <div class="text-gray-400">P_loss = {{ loadCurrent }}² × {{ totalResistance.toFixed(3) }}</div>
                <div class="text-red-400 font-bold">P_loss = {{ powerLoss.toFixed(3) }}W</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-amber-500/30">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📚</span> Understanding Voltage Drop
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- What is Voltage Drop -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-amber-300 mb-3">⚡ What is Voltage Drop?</h3>
            <p class="text-gray-300 mb-3">
              Voltage drop is the reduction in voltage as electrical current flows through a conductor due to
              the conductor's resistance. It's an unavoidable phenomenon that affects all electrical installations.
            </p>
            <p class="text-gray-300">
              Understanding voltage drop is crucial for ensuring proper operation of electrical equipment and
              maintaining efficiency in power distribution systems.
            </p>
          </div>

          <!-- Acceptable Limits -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-green-300 mb-3">✅ Acceptable Voltage Drop Limits</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="text-gray-300"><strong class="text-green-300">&lt;3%:</strong> Excellent (most applications)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span class="text-gray-300"><strong class="text-yellow-300">3-5%:</strong> Acceptable (generally acceptable)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <span class="text-gray-300"><strong class="text-red-300">&gt;5%:</strong> Problematic (may cause issues)</span>
              </div>
            </div>
            <p class="text-gray-400 text-sm mt-3">
              NEC recommends &lt;3% for branch circuits, &lt;5% total (feeder + branch)
            </p>
          </div>

          <!-- Factors Affecting Voltage Drop -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-purple-300 mb-3">🔍 Factors Affecting Voltage Drop</h3>
            <ul class="text-gray-300 space-y-2">
              <li><strong class="text-purple-300">Conductor Length:</strong> Longer wires = more resistance = more drop</li>
              <li><strong class="text-purple-300">Wire Size:</strong> Smaller cross-section = higher resistance</li>
              <li><strong class="text-purple-300">Current:</strong> Higher current = more voltage drop (V = IR)</li>
              <li><strong class="text-purple-300">Material:</strong> Copper vs Aluminum resistivity</li>
              <li><strong class="text-purple-300">Temperature:</strong> Higher temp = higher resistance</li>
            </ul>
          </div>

          <!-- Mitigation Strategies -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-cyan-300 mb-3">🔧 How to Reduce Voltage Drop</h3>
            <ul class="text-gray-300 space-y-2">
              <li>✅ <strong class="text-cyan-300">Use larger wire gauge</strong> (lower AWG number)</li>
              <li>✅ <strong class="text-cyan-300">Reduce conductor length</strong> (shorter runs)</li>
              <li>✅ <strong class="text-cyan-300">Use higher supply voltage</strong> (if acceptable)</li>
              <li>✅ <strong class="text-cyan-300">Use copper instead of aluminum</strong> (lower resistivity)</li>
              <li>✅ <strong class="text-cyan-300">Balance three-phase loads</strong> (for 3-phase systems)</li>
            </ul>
          </div>

          <!-- Key Formulas -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-orange-300 mb-3">📐 Key Formulas</h3>
            <div class="space-y-2 font-mono text-sm">
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">Resistance (Temperature Corrected):</div>
                <div class="text-white">R_T = R_20 × [1 + α(T - 20°C)]</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">Voltage Drop (Single-Phase):</div>
                <div class="text-white">V_drop = 2 × I × R × L</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">Voltage Drop (Three-Phase):</div>
                <div class="text-white">V_drop = √3 × I × R × L</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="text-orange-300 text-xs mb-1">Percentage Drop:</div>
                <div class="text-white">% = (V_drop / V_supply) × 100</div>
              </div>
            </div>
          </div>

          <!-- Applications -->
          <div class="bg-slate-800/50 rounded-xl p-5">
            <h3 class="text-xl font-bold text-pink-300 mb-3">🔌 Common Applications</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="bg-slate-900 rounded p-2">
                <div class="font-bold text-pink-300">🏠 Residential</div>
                <div class="text-gray-400">Home wiring, lighting, outlets</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="font-bold text-pink-300">🏭 Commercial</div>
                <div class="text-gray-400">Office buildings, retail</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="font-bold text-pink-300">🏗️ Industrial</div>
                <div class="text-gray-400">Motor loads, heavy equipment</div>
              </div>
              <div class="bg-slate-900 rounded p-2">
                <div class="font-bold text-pink-300">☀️ Renewable</div>
                <div class="text-gray-400">Solar PV, wind turbines</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Material Properties -->
        <div class="mt-6 bg-slate-800/50 rounded-xl p-5">
          <h3 class="text-xl font-bold text-yellow-300 mb-3">🔬 Material Properties</h3>
          <div class="grid md:grid-cols-4 gap-4">
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300">Copper (Cu)</div>
              <div class="text-gray-400 text-sm mt-1">
                <div>Resistivity: 0.0172 Ω·mm²/m</div>
                <div>α: 0.00393 /°C</div>
                <div class="text-green-400 mt-2">Most common</div>
              </div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300">Aluminum (Al)</div>
              <div class="text-gray-400 text-sm mt-1">
                <div>Resistivity: 0.0282 Ω·mm²/m</div>
                <div>α: 0.00429 /°C</div>
                <div class="text-blue-400 mt-2">Lightweight</div>
              </div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300">Gold (Au)</div>
              <div class="text-gray-400 text-sm mt-1">
                <div>Resistivity: 0.0222 Ω·mm²/m</div>
                <div>α: 0.00340 /°C</div>
                <div class="text-yellow-400 mt-2">Corrosion resistant</div>
              </div>
            </div>
            <div class="bg-slate-900 rounded-lg p-3">
              <div class="font-bold text-yellow-300">Silver (Ag)</div>
              <div class="text-gray-400 text-sm mt-1">
                <div>Resistivity: 0.0159 Ω·mm²/m</div>
                <div>α: 0.00380 /°C</div>
                <div class="text-purple-400 mt-2">Best conductor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Reactive state
const supplyVoltage = ref(120)
const loadCurrent = ref(10)
const conductorLength = ref(50)
const material = ref('copper')
const wireSizeAWG = ref('10')
const wireSizeMM2 = ref(5.26)
const temperature = ref(25)
const phaseType = ref('single-phase')

// Material properties
const materials = {
  copper: { resistivity: 0.0172, alpha: 0.00393 },
  aluminum: { resistivity: 0.0282, alpha: 0.00429 },
  gold: { resistivity: 0.0222, alpha: 0.00340 },
  silver: { resistivity: 0.0159, alpha: 0.00380 }
}

// AWG to mm² conversion table
const awgToMM2 = {
  '0000': 107.16, '000': 85.03, '00': 67.43, '0': 53.49,
  '2': 33.63, '4': 21.15, '6': 13.30, '8': 8.37,
  '10': 5.26, '12': 3.31, '14': 2.08, '16': 1.31,
  '18': 0.823, '20': 0.518, '22': 0.326, '24': 0.205
}

// Computed properties
const materialResistivity = computed(() => materials[material.value].resistivity)
const materialAlpha = computed(() => materials[material.value].alpha)

const wireDiameter = computed(() => {
  const area = wireSizeMM2.value
  return Math.sqrt((4 * area) / Math.PI)
})

const circularMils = computed(() => {
  // 1 circular mil = area of 1 mil diameter circle
  // 1 mm² = 1973.5 circular mils
  return Math.round(wireSizeMM2.value * 1973.5)
})

const conductorResistance = computed(() => {
  // R = (ρ × L) / A at 20°C
  const R20 = (materialResistivity.value * conductorLength.value) / wireSizeMM2.value

  // Temperature correction: R_T = R_20 × [1 + α(T - 20)]
  return R20 * (1 + materialAlpha.value * (temperature.value - 20))
})

const totalResistance = computed(() => {
  // For single-phase: round trip (out + return)
  // For three-phase: single conductor (balanced load)
  return phaseType.value === 'single-phase'
    ? 2 * conductorResistance.value
    : conductorResistance.value
})

const voltageDrop = computed(() => {
  if (phaseType.value === 'single-phase') {
    return 2 * loadCurrent.value * conductorResistance.value
  } else {
    return Math.sqrt(3) * loadCurrent.value * conductorResistance.value
  }
})

const voltageDropPercent = computed(() => {
  return (voltageDrop.value / supplyVoltage.value) * 100
})

const finalVoltage = computed(() => {
  return supplyVoltage.value - voltageDrop.value
})

const powerLoss = computed(() => {
  // P = I² × R_total
  return Math.pow(loadCurrent.value, 2) * totalResistance.value
})

// Status calculations
const statusText = computed(() => {
  if (voltageDropPercent.value < 3) return 'Excellent'
  if (voltageDropPercent.value < 5) return 'Acceptable'
  return 'Problematic'
})

const statusIcon = computed(() => {
  if (voltageDropPercent.value < 3) return '✅'
  if (voltageDropPercent.value < 5) return '⚠️'
  return '❌'
})

const statusDescription = computed(() => {
  if (voltageDropPercent.value < 3) return 'Voltage drop is within acceptable limits'
  if (voltageDropPercent.value < 5) return 'Voltage drop is acceptable but could be improved'
  return 'Voltage drop exceeds recommended limits - consider larger wire'
})

const statusBgClass = computed(() => {
  if (voltageDropPercent.value < 3) return 'bg-green-500/20 border border-green-400/40'
  if (voltageDropPercent.value < 5) return 'bg-yellow-500/20 border border-yellow-400/40'
  return 'bg-red-500/20 border border-red-400/40'
})

const statusTextClass = computed(() => {
  if (voltageDropPercent.value < 3) return 'text-green-300'
  if (voltageDropPercent.value < 5) return 'text-yellow-300'
  return 'text-red-300'
})

const finalVoltageClass = computed(() => {
  if (voltageDropPercent.value < 3) return 'text-green-400'
  if (voltageDropPercent.value < 5) return 'text-yellow-400'
  return 'text-red-400'
})

// Wire size conversion functions
const updateWireSizeFromAWG = () => {
  wireSizeMM2.value = awgToMM2[wireSizeAWG.value]
}

const updateAWGFromMM2 = () => {
  // Find closest AWG
  let closestAWG = wireSizeAWG.value
  let minDiff = Math.abs(awgToMM2[wireSizeAWG.value] - wireSizeMM2.value)

  for (const [awg, mm2] of Object.entries(awgToMM2)) {
    const diff = Math.abs(mm2 - wireSizeMM2.value)
    if (diff < minDiff) {
      minDiff = diff
      closestAWG = awg
    }
  }

  wireSizeAWG.value = closestAWG
}

// Preset loader
const loadPreset = (preset) => {
  switch (preset) {
    case 'home':
      supplyVoltage.value = 120
      loadCurrent.value = 15
      conductorLength.value = 30
      material.value = 'copper'
      wireSizeAWG.value = '12'
      updateWireSizeFromAWG()
      temperature.value = 25
      phaseType.value = 'single-phase'
      break
    case 'automotive':
      supplyVoltage.value = 12
      loadCurrent.value = 20
      conductorLength.value = 5
      material.value = 'copper'
      wireSizeAWG.value = '10'
      updateWireSizeFromAWG()
      temperature.value = 60
      phaseType.value = 'single-phase'
      break
    case 'industrial':
      supplyVoltage.value = 480
      loadCurrent.value = 100
      conductorLength.value = 150
      material.value = 'copper'
      wireSizeAWG.value = '2'
      updateWireSizeFromAWG()
      temperature.value = 75
      phaseType.value = 'three-phase'
      break
    case 'solar':
      supplyVoltage.value = 48
      loadCurrent.value = 25
      conductorLength.value = 20
      material.value = 'copper'
      wireSizeAWG.value = '8'
      updateWireSizeFromAWG()
      temperature.value = 70
      phaseType.value = 'single-phase'
      break
  }
}
</script>

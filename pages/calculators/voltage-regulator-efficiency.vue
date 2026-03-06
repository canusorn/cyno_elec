<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          ⚡ Voltage Regulator Efficiency Calculator
        </h1>
        <p class="text-indigo-300 text-lg">Compare efficiency across linear and switching regulators</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Controls Panel -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎛️</span> Input Parameters
          </h2>

          <!-- Input Voltage -->
          <div class="mb-6 p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>🔋 Input Voltage (V_in)</span>
              <span class="font-mono font-bold">{{ inputVoltage }}V</span>
            </label>
            <input
              type="range"
              v-model.number="inputVoltage"
              min="1"
              max="50"
              step="0.5"
              class="w-full h-3 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1V</span>
              <span>50V</span>
            </div>
          </div>

          <!-- Output Voltage -->
          <div class="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>⚡ Output Voltage (V_out)</span>
              <span class="font-mono font-bold">{{ outputVoltage }}V</span>
            </label>
            <input
              type="range"
              v-model.number="outputVoltage"
              min="0.5"
              max="48"
              step="0.5"
              class="w-full h-3 bg-purple-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.5V</span>
              <span>48V</span>
            </div>
          </div>

          <!-- Load Current -->
          <div class="mb-6 p-4 bg-orange-500/20 rounded-xl border border-orange-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>📊 Load Current (I_load)</span>
              <span class="font-mono font-bold">{{ loadCurrent }}A</span>
            </label>
            <input
              type="range"
              v-model.number="loadCurrent"
              min="0.01"
              max="10"
              step="0.01"
              class="w-full h-3 bg-orange-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>10mA</span>
              <span>10A</span>
            </div>
          </div>

          <!-- Switching Frequency (for Buck) -->
          <div class="mb-6 p-4 bg-green-500/20 rounded-xl border border-green-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>🔄 Switching Frequency (Buck)</span>
              <span class="font-mono font-bold">{{ switchingFrequency }}kHz</span>
            </label>
            <input
              type="range"
              v-model.number="switchingFrequency"
              min="10"
              max="1000"
              step="10"
              class="w-full h-3 bg-green-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>10kHz</span>
              <span>1MHz</span>
            </div>
          </div>

          <!-- Linear Regulator Quiescent Current -->
          <div class="mb-6 p-4 bg-pink-500/20 rounded-xl border border-pink-400/40">
            <label class="text-white text-sm mb-2 block flex justify-between">
              <span>💤 Linear Quiescent Current (I_q)</span>
              <span class="font-mono font-bold">{{ quiescentCurrent }}mA</span>
            </label>
            <input
              type="range"
              v-model.number="quiescentCurrent"
              min="1"
              max="50"
              step="1"
              class="w-full h-3 bg-pink-900 rounded-lg appearance-none cursor-pointer"
            >
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1mA</span>
              <span>50mA</span>
            </div>
          </div>

          <!-- Quick Presets -->
          <div>
            <h3 class="text-lg font-bold text-white mb-3">🎯 Quick Presets</h3>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="loadPreset('arduino')"
                class="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Arduino (12V→5V)
              </button>
              <button
                @click="loadPreset('microcontroller')"
                class="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                MCU (5V→3.3V)
              </button>
              <button
                @click="loadPreset('battery')"
                class="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                Li-ion Monitor
              </button>
              <button
                @click="loadPreset('highCurrent')"
                class="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all"
              >
                High Current
              </button>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="space-y-6">
          <!-- Comparison Table -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span> Regulator Comparison
            </h2>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-slate-600">
                    <th class="text-left py-2 px-3 text-gray-300 font-bold">Parameter</th>
                    <th class="text-center py-2 px-3 text-blue-300 font-bold">Linear (NPN)</th>
                    <th class="text-center py-2 px-3 text-green-300 font-bold">Buck</th>
                    <th class="text-center py-2 px-3 text-purple-300 font-bold">Zener</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-slate-700">
                    <td class="py-2 px-3 text-gray-300">Efficiency</td>
                    <td class="py-2 px-3 text-center font-mono font-bold" :class="linearEfficiency > 70 ? 'text-green-400' : 'text-red-400'">
                      {{ linearEfficiency.toFixed(1) }}%
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-green-400">
                      {{ buckEfficiency.toFixed(1) }}%
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold" :class="zenerEfficiency > 50 ? 'text-yellow-400' : 'text-red-400'">
                      {{ zenerEfficiency.toFixed(1) }}%
                    </td>
                  </tr>
                  <tr class="border-b border-slate-700">
                    <td class="py-2 px-3 text-gray-300">Power Dissipation</td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-orange-400">
                      {{ linearPowerDissipation.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-green-400">
                      {{ buckPowerDissipation.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-red-400">
                      {{ zenerPowerDissipation.toFixed(2) }}W
                    </td>
                  </tr>
                  <tr class="border-b border-slate-700">
                    <td class="py-2 px-3 text-gray-300">Output Power</td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-cyan-400">
                      {{ outputPower.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-cyan-400">
                      {{ outputPower.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-cyan-400">
                      {{ outputPower.toFixed(2) }}W
                    </td>
                  </tr>
                  <tr class="border-b border-slate-700">
                    <td class="py-2 px-3 text-gray-300">Input Power</td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-yellow-400">
                      {{ linearInputPower.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-yellow-400">
                      {{ buckInputPower.toFixed(2) }}W
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-yellow-400">
                      {{ zenerInputPower.toFixed(2) }}W
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-3 text-gray-300">Est. Junction Temp</td>
                    <td class="py-2 px-3 text-center font-mono font-bold" :class="linearJunctionTemp > 100 ? 'text-red-400' : 'text-green-400'">
                      {{ linearJunctionTemp.toFixed(0) }}°C
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-green-400">
                      {{ buckJunctionTemp.toFixed(0) }}°C
                    </td>
                    <td class="py-2 px-3 text-center font-mono font-bold text-red-400">
                      {{ zenerJunctionTemp.toFixed(0)}}°C
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Efficiency Chart -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📈</span> Efficiency Comparison
            </h2>

            <div class="space-y-4">
              <!-- Linear Regulator -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-blue-300 font-bold">Linear (NPN)</span>
                  <span class="text-white font-mono font-bold">{{ linearEfficiency.toFixed(1) }}%</span>
                </div>
                <div class="h-8 bg-slate-800 rounded-lg overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 flex items-center justify-end pr-3"
                    :style="{ width: Math.min(linearEfficiency, 100) + '%' }"
                  >
                    <span v-if="linearEfficiency < 100" class="text-white text-xs font-bold"></span>
                  </div>
                </div>
              </div>

              <!-- Buck Converter -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-green-300 font-bold">Buck Converter</span>
                  <span class="text-white font-mono font-bold">{{ buckEfficiency.toFixed(1) }}%</span>
                </div>
                <div class="h-8 bg-slate-800 rounded-lg overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 flex items-center justify-end pr-3"
                    :style="{ width: Math.min(buckEfficiency, 100) + '%' }"
                  >
                  </div>
                </div>
              </div>

              <!-- Zener Regulator -->
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-purple-300 font-bold">Zener Shunt</span>
                  <span class="text-white font-mono font-bold">{{ zenerEfficiency.toFixed(1) }}%</span>
                </div>
                <div class="h-8 bg-slate-800 rounded-lg overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 flex items-center justify-end pr-3"
                    :style="{ width: Math.min(zenerEfficiency, 100) + '%' }"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Power Breakdown Chart -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>⚡</span> Power Breakdown (Best: Buck)
            </h2>

            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-green-500/20 rounded-xl border border-green-400/40">
                <div class="text-green-300 text-sm mb-1">Useful Power</div>
                <div class="text-white font-mono font-bold text-2xl">{{ outputPower.toFixed(2) }}W</div>
                <div class="text-green-200 text-xs mt-1">{{ (outputPower / buckInputPower * 100).toFixed(1) }}% of input</div>
              </div>
              <div class="text-center p-4 bg-red-500/20 rounded-xl border border-red-400/40">
                <div class="text-red-300 text-sm mb-1">Wasted Power</div>
                <div class="text-white font-mono font-bold text-2xl">{{ buckPowerDissipation.toFixed(2) }}W</div>
                <div class="text-red-200 text-xs mt-1">{{ (buckPowerDissipation / buckInputPower * 100).toFixed(1) }}% loss</div>
              </div>
            </div>

            <div class="mt-4 p-3 bg-slate-800/50 rounded-lg">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-300">Thermal Warning:</span>
                <span :class="buckJunctionTemp > 100 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'">
                  {{ buckJunctionTemp > 100 ? '⚠️ Heat sink needed!' : '✓ Safe operating temp' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Calculations -->
      <div class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📐 Detailed Calculations</h2>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Linear Regulator Details -->
          <div class="bg-blue-500/10 rounded-xl p-4 border border-blue-400/40">
            <h3 class="text-lg font-bold text-blue-300 mb-3">Linear (NPN Pass)</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-300">Voltage Drop:</span>
                <span class="text-white font-mono">{{ linearVoltageDrop.toFixed(2) }}V</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Pass Transistor Current:</span>
                <span class="text-white font-mono">{{ loadCurrent.toFixed(3) }}A</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Quiescent Current:</span>
                <span class="text-white font-mono">{{ quiescentCurrent }}mA</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Total Input Current:</span>
                <span class="text-white font-mono">{{ (loadCurrent + quiescentCurrent/1000).toFixed(3) }}A</span>
              </div>
              <div class="mt-3 pt-3 border-t border-blue-400/30">
                <div class="flex justify-between">
                  <span class="text-gray-300">Efficiency Formula:</span>
                </div>
                <code class="text-blue-200 text-xs">η = V_out / V_in</code>
              </div>
            </div>
          </div>

          <!-- Buck Converter Details -->
          <div class="bg-green-500/10 rounded-xl p-4 border border-green-400/40">
            <h3 class="text-lg font-bold text-green-300 mb-3">Buck Converter</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-300">Duty Cycle:</span>
                <span class="text-white font-mono">{{ buckDutyCycle.toFixed(1) }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Switch Loss:</span>
                <span class="text-white font-mono">{{ buckSwitchLoss.toFixed(3) }}W</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Inductor Loss:</span>
                <span class="text-white font-mono">{{ buckInductorLoss.toFixed(3) }}W</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Other Losses:</span>
                <span class="text-white font-mono">{{ buckOtherLoss.toFixed(3) }}W</span>
              </div>
              <div class="mt-3 pt-3 border-t border-green-400/30">
                <div class="flex justify-between">
                  <span class="text-gray-300">Typical Efficiency:</span>
                  <span class="text-white font-mono">85-95%</span>
                </div>
                <div class="text-gray-400 text-xs mt-1">Assumes good design with proper components</div>
              </div>
            </div>
          </div>

          <!-- Zener Regulator Details -->
          <div class="bg-purple-500/10 rounded-xl p-4 border border-purple-400/40">
            <h3 class="text-lg font-bold text-purple-300 mb-3">Zener Shunt</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-300">Series Resistor:</span>
                <span class="text-white font-mono">{{ zenerSeriesR.toFixed(1) }}Ω</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Zener Current:</span>
                <span class="text-white font-mono">{{ zenerCurrent.toFixed(1) }}mA</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Zener Power:</span>
                <span class="text-white font-mono">{{ zenerPowerDissipation.toFixed(2) }}W</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-300">Total Current:</span>
                <span class="text-white font-mono">{{ (loadCurrent * 1000 + zenerCurrent).toFixed(1) }}mA</span>
              </div>
              <div class="mt-3 pt-3 border-t border-purple-400/30">
                <div class="flex justify-between">
                  <span class="text-gray-300">Best For:</span>
                </div>
                <div class="text-purple-200 text-xs">Low current, reference voltages only</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Content -->
      <div class="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">📚 Understanding Regulator Efficiency</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold text-indigo-300 mb-2">⚡ Linear Regulators</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li><strong class="text-white">Simple & Low Noise:</strong> Just a pass transistor + feedback</li>
              <li><strong class="text-white">Efficiency Formula:</strong> η = V_out / V_in (ratio of voltages)</li>
              <li><strong class="text-white">Power Dissipation:</strong> P_loss = (V_in - V_out) × I_out</li>
              <li><strong class="text-white">When to Use:</strong> Low power, low noise requirements, small Vin-Vout difference</li>
              <li><strong class="text-white">Heat Issue:</strong> Large voltage drops = lots of heat (needs heatsink)</li>
              <li><strong class="text-white">Examples:</strong> 7805, LM317, AMS1117, LDO regulators</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-indigo-300 mb-2">🔄 Switching Regulators (Buck)</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li><strong class="text-white">High Efficiency:</strong> Typically 85-95% (energy stored in inductor)</li>
              <li><strong class="text-white">How it Works:</strong> Switch on/off rapidly, inductor stores/releases energy</li>
              <li><strong class="text-white">Duty Cycle:</strong> D = V_out / V_in (controls output voltage)</li>
              <li><strong class="text-white">When to Use:</strong> High current, large voltage drops, battery-powered devices</li>
              <li><strong class="text-white">Trade-offs:</strong> More complex, switching noise, needs inductor/capacitor</li>
              <li><strong class="text-white">Examples:</strong> LM2596, MP1584, TPS5430, modern synchronous buck converters</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-indigo-300 mb-2">⚡ Zener Shunt Regulator</h3>
            <ul class="text-gray-300 space-y-2 text-sm">
              <li><strong class="text-white">Simplest Design:</strong> Just a zener diode + series resistor</li>
              <li><strong class="text-white">Very Inefficient:</strong> Zener always draws current (even at no load)</li>
              <li><strong class="text-white">Poor Regulation:</strong> Output voltage varies with load current</li>
              <li><strong class="text-white">When to Use:</strong> Voltage references, very low current (<10mA) applications only</li>
              <li><strong class="text-white">Limitations:</strong> Not suitable for power supply regulation</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold text-indigo-300 mb-2">🎯 Selection Guide</h3>
            <div class="space-y-3 text-sm">
              <div class="p-3 bg-green-500/20 rounded-lg border border-green-400/40">
                <div class="font-bold text-green-300 mb-1">Use Buck Converter When:</div>
                <ul class="text-gray-300 text-xs space-y-1">
                  <li>• High current (>100mA)</li>
                  <li>• Large voltage drop (>3V)</li>
                  <li>• Battery-powered (efficiency matters)</li>
                  <li>• Can tolerate some switching noise</li>
                </ul>
              </div>
              <div class="p-3 bg-blue-500/20 rounded-lg border border-blue-400/40">
                <div class="font-bold text-blue-300 mb-1">Use Linear Regulator When:</div>
                <ul class="text-gray-300 text-xs space-y-1">
                  <li>• Low current (<500mA)</li>
                  <li>• Small voltage drop (<2V)</li>
                  <li>• Low noise required (audio, RF)</li>
                  <li>• Simple design preferred</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-600/40">
          <h3 class="text-lg font-bold text-indigo-300 mb-2">📐 Key Formulas</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Linear Efficiency:</strong></p>
              <code class="text-indigo-200">η = (V_out × I_out) / (V_in × I_in) × 100%</code>
              <p class="text-xs mt-1">Simplifies to: η ≈ V_out / V_in</p>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Linear Power Loss:</strong></p>
              <code class="text-indigo-200">P_loss = (V_in - V_out) × I_out</code>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Buck Duty Cycle:</strong></p>
              <code class="text-indigo-200">D = V_out / V_in × 100%</code>
            </div>
            <div class="text-gray-300">
              <p class="mb-2"><strong class="text-white">Thermal Resistance:</strong></p>
              <code class="text-indigo-200">ΔT = P_loss × R_θJA</code>
              <p class="text-xs mt-1">Where R_θJA is junction-to-ambient thermal resistance</p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-600/40">
          <h3 class="text-lg font-bold text-indigo-300 mb-2">💡 Design Considerations</h3>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• <strong class="text-white">Heat Sinking:</strong> Linear regulators need heatsinks when P_loss > 1W</li>
            <li>• <strong class="text-white">Dropout Voltage:</strong> LDOs can work with smaller Vin-Vout difference (~0.2V)</li>
            <li>• <strong class="text-white">Switching Frequency:</strong> Higher frequency = smaller inductor but more switching loss</li>
            <li>• <strong class="text-white">Output Capacitor:</strong> Critical for stability (check datasheet recommendations)</li>
            <li>• <strong class="text-white">EMI Concerns:</strong> Switching regulators generate noise; may need filtering</li>
            <li>• <strong class="text-white">Cost:</strong> Linear regulators are cheaper; switching regulators need more components</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Input parameters
const inputVoltage = ref(12)
const outputVoltage = ref(5)
const loadCurrent = ref(0.5)
const switchingFrequency = ref(150)
const quiescentCurrent = ref(5)

// Constants
const AMBIENT_TEMP = 25 // °C
const THERMAL_RESISTANCE = 50 // °C/W (junction-to-ambient, no heatsink)

// Common calculations
const outputPower = computed(() => {
  return outputVoltage.value * loadCurrent.value
})

// Linear Regulator (NPN pass transistor)
const linearVoltageDrop = computed(() => {
  return inputVoltage.value - outputVoltage.value
})

const linearInputPower = computed(() => {
  const i_total = loadCurrent.value + (quiescentCurrent.value / 1000)
  return inputVoltage.value * i_total
})

const linearEfficiency = computed(() => {
  if (inputVoltage.value === 0) return 0
  return (outputPower.value / linearInputPower.value) * 100
})

const linearPowerDissipation = computed(() => {
  return linearInputPower.value - outputPower.value
})

const linearJunctionTemp = computed(() => {
  return AMBIENT_TEMP + (linearPowerDissipation.value * THERMAL_RESISTANCE)
})

// Buck Converter
const buckDutyCycle = computed(() => {
  if (inputVoltage.value === 0) return 0
  return (outputVoltage.value / inputVoltage.value) * 100
})

const buckEfficiency = computed(() => {
  // Base efficiency (typical for well-designed buck converter)
  let baseEff = 92
  
  // Reduce efficiency for very low duty cycles (< 10%)
  if (buckDutyCycle.value < 10) {
    baseEff -= (10 - buckDutyCycle.value) * 0.5
  }
  
  // Reduce efficiency for very high duty cycles (> 90%)
  if (buckDutyCycle.value > 90) {
    baseEff -= (buckDutyCycle.value - 90) * 0.3
  }
  
  // Reduce efficiency for very light loads (< 10% of rated)
  if (loadCurrent.value < 0.1) {
    baseEff -= (0.1 - loadCurrent.value) * 20
  }
  
  // Reduce efficiency for very high frequency (> 500kHz)
  if (switchingFrequency.value > 500) {
    baseEff -= (switchingFrequency.value - 500) * 0.01
  }
  
  return Math.max(70, Math.min(96, baseEff))
})

const buckInputPower = computed(() => {
  if (buckEfficiency.value === 0) return 0
  return outputPower.value / (buckEfficiency.value / 100)
})

const buckPowerDissipation = computed(() => {
  return buckInputPower.value - outputPower.value
})

const buckSwitchLoss = computed(() => {
  // Simplified switching loss calculation
  const v_sw = inputVoltage.value
  const i_sw = loadCurrent.value
  const t_sw = 10e-9 // 10ns switching time (typical)
  const f_sw = switchingFrequency.value * 1000
  return (v_sw * i_sw * t_sw * f_sw) / 2
})

const buckInductorLoss = computed(() => {
  // Simplified inductor DCR loss (assume 50mΩ DCR)
  const dcr = 0.05 // ohms
  const i_rms = loadCurrent.value * 0.9 // approximate
  return i_rms * i_rms * dcr
})

const buckOtherLoss = computed(() => {
  return buckPowerDissipation.value - buckSwitchLoss.value - buckInductorLoss.value
})

const buckJunctionTemp = computed(() => {
  // Buck converter dissipates much less power, so temp rise is lower
  return AMBIENT_TEMP + (buckPowerDissipation.value * THERMAL_RESISTANCE * 0.5)
})

// Zener Shunt Regulator
const zenerSeriesR = computed(() => {
  // Calculate series resistor for zener regulator
  // Allow 10mA zener current at full load
  const iz_min = 0.010 // 10mA minimum zener current
  const i_total = loadCurrent.value + iz_min
  const v_drop = inputVoltage.value - outputVoltage.value
  
  if (v_drop <= 0 || i_total <= 0) return 100
  
  return v_drop / i_total
})

const zenerCurrent = computed(() => {
  const v_drop = inputVoltage.value - outputVoltage.value
  if (zenerSeriesR.value === 0) return 0
  
  const i_total = v_drop / zenerSeriesR.value
  const iz = i_total - loadCurrent.value
  
  return Math.max(0, iz * 1000) // Convert to mA
})

const zenerPowerDissipation = computed(() => {
  const v_z = outputVoltage.value
  const i_z = zenerCurrent.value / 1000 // Convert mA to A
  return v_z * i_z
})

const zenerInputPower = computed(() => {
  const v_drop = inputVoltage.value - outputVoltage.value
  const i_total = loadCurrent.value + (zenerCurrent.value / 1000)
  return outputPower.value + (v_drop * i_total)
})

const zenerEfficiency = computed(() => {
  if (zenerInputPower.value === 0) return 0
  return (outputPower.value / zenerInputPower.value) * 100
})

const zenerJunctionTemp = computed(() => {
  // Zener dissipates significant power even at light load
  return AMBIENT_TEMP + (zenerPowerDissipation.value * THERMAL_RESISTANCE)
})

// Preset loader
const loadPreset = (preset) => {
  switch (preset) {
    case 'arduino':
      inputVoltage.value = 12
      outputVoltage.value = 5
      loadCurrent.value = 0.5
      switchingFrequency.value = 150
      quiescentCurrent.value = 5
      break
    case 'microcontroller':
      inputVoltage.value = 5
      outputVoltage.value = 3.3
      loadCurrent.value = 0.2
      switchingFrequency.value = 500
      quiescentCurrent.value = 3
      break
    case 'battery':
      inputVoltage.value = 4.2
      outputVoltage.value = 3.3
      loadCurrent.value = 0.1
      switchingFrequency.value = 1000
      quiescentCurrent.value = 1
      break
    case 'highCurrent':
      inputVoltage.value = 24
      outputVoltage.value = 12
      loadCurrent.value = 5
      switchingFrequency.value = 100
      quiescentCurrent.value = 10
      break
  }
}
</script>

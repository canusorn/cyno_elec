<script setup lang="ts">
import { ref } from 'vue'
import OpAmpIntegratorSimulator from '~/components/OpAmpIntegratorSimulator.vue'

const pageTitle = ref('Op-Amp Integrator Simulation')
const pageDescription = ref('Interactive op-amp integrator circuit with real-time visualization')

useHead({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          📐 Op-Amp Integrator
        </h1>
        <p class="text-xl text-cyan-200">
          Watch an op-amp integrate signals in real-time
        </p>
      </div>

      <!-- Main Simulator Component -->
      <OpAmpIntegratorSimulator />

      <!-- Educational Content -->
      <div class="mt-12 grid md:grid-cols-2 gap-6">
        <!-- What is Integration? -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            📚 What is Integration?
          </h2>
          <div class="text-cyan-100 space-y-3">
            <p>
              An <strong class="text-yellow-300">integrator</strong> is a circuit that performs the mathematical operation of integration. The output voltage is proportional to the integral of the input voltage over time.
            </p>
            <div class="bg-black/30 rounded-lg p-4 mt-4">
              <p class="text-sm text-cyan-200 mb-2">Mathematical Formula:</p>
              <p class="text-2xl font-mono text-green-400 text-center">
                V_out = - (1/RC) × ∫ V_in dt
              </p>
            </div>
            <p class="text-sm mt-4">
              The negative sign indicates phase inversion (180° phase shift) due to the op-amp's inverting configuration.
            </p>
          </div>
        </div>

        <!-- How It Works -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            ⚙️ How It Works
          </h2>
          <div class="text-cyan-100 space-y-3">
            <p>
              The op-amp integrator uses a capacitor in the feedback path instead of a resistor:
            </p>
            <div class="space-y-2 mt-4">
              <div class="flex items-start gap-2">
                <span class="text-yellow-300 font-bold">1.</span>
                <p>Input current flows through the input resistor (R)</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-yellow-300 font-bold">2.</span>
                <p>Capacitor (C) charges/discharges with this current</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-yellow-300 font-bold">3.</span>
                <p>Capacitor voltage is the integral of current</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-yellow-300 font-bold">4.</span>
                <p>Op-amp maintains virtual ground at inverting input</p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-yellow-300 font-bold">5.</span>
                <p>Output equals negative capacitor voltage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Time Constant -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">⏱️ Time Constant (τ)</h2>
        <div class="text-cyan-100 space-y-3">
          <p>
            The <strong class="text-pink-300">time constant</strong> τ = R × C determines how fast the integrator responds:
          </p>
          <div class="grid md:grid-cols-3 gap-4 mt-4">
            <div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4">
              <h3 class="font-bold text-green-200 mb-2">Small τ (Fast)</h3>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Quick response</li>
                <li>High gain</li>
                <li>Output reaches limits fast</li>
                <li>Good for high-frequency signals</li>
              </ul>
            </div>
            <div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4">
              <h3 class="font-bold text-yellow-200 mb-2">Medium τ</h3>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Balanced response</li>
                <li>Good for general use</li>
                <li>Stable integration</li>
                <li>Most applications</li>
              </ul>
            </div>
            <div class="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg p-4">
              <h3 class="font-bold text-red-200 mb-2">Large τ (Slow)</h3>
              <ul class="list-disc list-inside space-y-1 text-sm">
                <li>Slow response</li>
                <li>Low gain</li>
                <li>Long integration period</li>
                <li>Good for low-frequency signals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Signal Integration Examples -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">📊 Signal Integration Examples</h2>
        <div class="grid md:grid-cols-3 gap-4 text-cyan-100">
          <div class="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
            <h3 class="font-bold text-purple-200 mb-2">Square Wave → Triangle Wave</h3>
            <p class="text-sm mb-2">
              A constant input (square wave high) integrates to a ramp. Alternating high/low creates a triangle wave.
            </p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
              ∫ constant dt = ramp<br>
              ∫ ramp dt = parabola
            </div>
          </div>
          <div class="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
            <h3 class="font-bold text-cyan-200 mb-2">Sine Wave → Cosine Wave (shifted)</h3>
            <p class="text-sm mb-2">
              Integration of sine produces negative cosine (90° phase shift plus inversion = 270° total).
            </p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
              ∫ sin(ωt) dt = -(1/ω)cos(ωt)
            </div>
          </div>
          <div class="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
            <h3 class="font-bold text-yellow-200 mb-2">Triangle Wave → Sine-like</h3>
            <p class="text-sm mb-2">
              Integration of a triangle (alternating ramps) produces a waveform approaching a parabola/sine shape.
            </p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
              ∫ ramp dt = parabola
            </div>
          </div>
        </div>
      </div>

      <!-- Practical Considerations -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">🔧 Practical Considerations</h2>
        <div class="grid md:grid-cols-2 gap-6 text-cyan-100">
          <div>
            <h3 class="font-bold text-yellow-300 mb-2">DC Offset Problem</h3>
            <p class="text-sm mb-2">
              Pure integrators saturate due to DC offset. A resistor is added in parallel with the capacitor to limit DC gain.
            </p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
              Practical integrator: RF >> R<br>
              DC gain = -RF/R (finite)<br>
              AC gain ≈ -1/(sRC) at high freq
            </div>
          </div>
          <div>
            <h3 class="font-bold text-cyan-300 mb-2">Initial Conditions</h3>
            <p class="text-sm mb-2">
              The capacitor may have initial charge. A reset switch across the capacitor can discharge it at t=0.
            </p>
            <div class="bg-black/30 rounded-lg p-3 text-xs text-green-400">
              Add MOSFET/JFET switch across C for electronic reset
            </div>
          </div>
          <div>
            <h3 class="font-bold text-pink-300 mb-2">Frequency Response</h3>
            <p class="text-sm mb-2">
              Integrator works as integrator only when ω >> 1/RC. At low frequencies, it acts as a regular inverting amplifier.
            </p>
            <div class="bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
              Integrator range: f >> 1/(2πRC)
            </div>
          </div>
          <div>
            <h3 class="font-bold text-green-300 mb-2">Component Selection</h3>
            <p class="text-sm mb-2">
              Choose R and C to set desired integration time constant. Use low-leakage capacitors for best performance.
            </p>
            <div class="bg-black/30 rounded-lg p-3 text-xs text-green-400">
              Typical: R = 10kΩ - 1MΩ<br>
              C = 1nF - 10µF
            </div>
          </div>
        </div>
      </div>

      <!-- Applications -->
      <div class="mt-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">🎯 Common Applications</h2>
        <div class="grid md:grid-cols-2 gap-4 text-cyan-100">
          <div>
            <h3 class="font-bold text-yellow-200 mb-2">Analog Computers</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Solve differential equations</li>
              <li>Mathematical operations</li>
              <li>Simulate physical systems</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-cyan-200 mb-2">Waveform Generation</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Triangle wave from square</li>
              <li>Sweep generators</li>
              <li>Function generators</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-pink-200 mb-2">Signal Processing</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>Low-pass filters</li>
              <li>Velocity to position conversion</li>
              <li>Acceleration to velocity</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-green-200 mb-2">Control Systems</h3>
            <ul class="list-disc list-inside space-y-1 text-sm">
              <li>PID controllers (I term)</li>
              <li>Motor control</li>
              <li>Servo systems</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Key Formulas -->
      <div class="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-cyan-300/20">
        <h2 class="text-2xl font-bold text-white mb-4">📐 Key Formulas</h2>
        <div class="grid md:grid-cols-2 gap-4 text-cyan-100">
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-cyan-200 mb-2">Integrator Output:</p>
            <p class="text-lg font-mono text-green-400">V_out = -(1/RC) ∫ V_in dt</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-cyan-200 mb-2">Time Constant:</p>
            <p class="text-lg font-mono text-green-400">τ = R × C</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-cyan-200 mb-2">Corner Frequency:</p>
            <p class="text-lg font-mono text-green-400">f_c = 1/(2πRC)</p>
          </div>
          <div class="bg-black/30 rounded-lg p-4">
            <p class="text-sm text-cyan-200 mb-2">DC Gain (with RF):</p>
            <p class="text-lg font-mono text-green-400">A_DC = -R_F/R_in</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

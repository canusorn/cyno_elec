# Cyno Electric Workspace State

## Current Features

### Calculators (15)
1. battery-life
2. power
3. impedance-calculator
4. capacitance-calculator
5. ohms-law
6. resistor-series-parallel
7. inductance-calculator
8. capacitive-reactance
9. inductive-reactance
10. resistance-color-code
11. led-resistor
12. voltage-divider
13. rc-time-constant
14. decibel-calculator
15. **wheatstone-bridge** ✨ NEW

### Simulations (11)
1. led-circuit-designer
2. parallel-circuit
3. diode-rectifier
4. rc-circuit
5. rlc-resonance
6. transformer-basics
7. rl-circuit
8. series-circuit
9. transistor-switch
10. timer-555-astable
11. **op-amp-amplifier** ✨ NEW

## Recently Completed (2026-02-28 - Session 6)

### ✅ Operational Amplifier Simulation
- Interactive op-amp simulator with inverting and non-inverting configurations
- Real-time voltage gain calculation: Inverting Gain = -R2/R1, Non-Inverting Gain = 1 + R2/R1
- Input/output voltage controls with saturation detection
- SVG circuit diagram with component labeling
- Waveform visualization showing input vs output signals
- Quick presets: Unity Gain, Gain=10, Gain=100, Inverting -10
- Comprehensive educational content covering:
  * Ideal op-amp characteristics
  * Inverting vs non-inverting configurations
  * Saturation and supply voltage limits
  * Practical design considerations (gain-bandwidth, slew rate, input bias current)
  * Common applications (audio preamp, summing amplifier, active filter, voltage follower)
  * Popular op-amp ICs (LM741, LM358, TL072, OPA2134, LM318)
- Component: OpAmpAmplifier.vue (460 lines)
- Page: pages/simulations/op-amp-amplifier.vue (267 lines)

### ✅ Wheatstone Bridge Calculator
- Interactive Wheatstone bridge circuit calculator
- Real-time calculation of node voltages (VA, VB) and output voltage (Vout)
- Bridge balance detection with visual feedback (✓ balanced / ✗ unbalanced)
- Automatic calculation of R4 value for bridge balance
- Interactive diamond circuit diagram showing all four resistors
- Real-time display of voltages at each node
- Quick presets:
  * Balanced (all resistors equal)
  * Strain Gauge (1% resistance change simulation)
  * Temperature (PT100 at 100°C)
  * Unbalanced (different resistor values)
- Detailed calculation breakdown showing:
  * VA = Vin × R3 / (R1 + R3)
  * VB = Vin × R4 / (R2 + R4)
  * Vout = VB - VA
  * Balance condition: R1 × R4 = R2 × R3
  * R4 for balance = (R2 × R3) / R1
- Comprehensive educational content covering:
  * Wheatstone bridge theory and history
  * Circuit analysis and voltage divider principles
  * Practical applications (strain measurement, temperature sensing, pressure sensors, force measurement)
  * Bridge configurations (quarter, half, full bridge)
  * Design considerations (excitation voltage, resistance values, temperature effects)
  * Advantages of Wheatstone bridge measurement
- Example calculations table for various scenarios
- Component: WheatstoneBridgeCalculator.vue (471 lines)
- Page: pages/calculators/wheatstone-bridge.vue (357 lines)

## Implementation Details

**Op-Amp Amplifier:**
- Component: OpAmpAmplifier.vue (16,010 bytes)
- Page: pages/simulations/op-amp-amplifier.vue (9,764 bytes)
- Features: Mode switching (inverting/non-inverting), real-time gain calculation, saturation warning, waveform visualization
- Presets: Unity Gain, Gain=10, Gain=100, Inverting -10
- Educational: Ideal op-amp characteristics, configurations, saturation, design tips, IC options

**Wheatstone Bridge:**
- Component: WheatstoneBridgeCalculator.vue (17,044 bytes)
- Page: pages/calculators/wheatstone-bridge.vue (12,907 bytes)
- Features: Balance detection, node voltage calculation, interactive circuit diagram, calculation steps
- Presets: Balanced, Strain Gauge, Temperature, Unbalanced
- Educational: Bridge theory, applications, configurations, design considerations, examples

## Development Status
- Last Updated: 2026-02-28 (Session 6)
- Status: ✅ Complete - Two new features implemented
- Latest Commit: f5f9e52
- GitHub: https://github.com/canusorn/cyno_elec
- Build Status: ✅ PASSING (65 routes prerendered)

## Future Feature Ideas

### Potential Simulations:
- Wheatstone Bridge Visualization
- Operational Amplifier (Inverting/Non-Inverting) ✅ COMPLETED
- MOSFET Switching
- Thyristor/SCR Circuits
- Three-Phase Circuits
- 555 Timer Monostable Mode
- Current Mirror Circuits
- Differential Amplifier
- Active Filters (Low-pass, High-pass, Band-pass)

### Potential Calculators:
- Wheatstone Bridge Calculator ✅ COMPLETED
- Op-Amp Gain Calculator
- Power Factor Calculator
- Delta-Wye (Δ-Y) Transform Calculator
- Voltage Regulator Calculator
- Capacitor Energy Storage Calculator
- Inductor Energy Storage Calculator
- Kirchhoff's Laws Solver
- Thevenin/Norton Equivalent Calculator
- Bandwidth Calculator
- Heat Sink Calculator
- Wire Gauge and Current Capacity

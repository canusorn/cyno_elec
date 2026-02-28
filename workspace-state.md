# Cyno Electric Workspace State

## Current Features

### Calculators (21)
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
15. wheatstone-bridge
16. power-factor-calculator
17. energy-storage
18. inductor-energy
19. capacitor-series-parallel
20. wire-gauge-calculator
21. **transformer-calculator** ✨ NEW

### Simulations (17)
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
11. op-amp-amplifier
12. mosfet-switching
13. boost-converter
14. buck-converter
15. capacitor-charging
16. wien-bridge-oscillator
17. **buck-boost-converter** ✨ NEW

## Recently Completed (2026-02-28 - Session 9)

### ✅ Buck-Boost Converter Simulation
- Interactive DC-DC converter with step-up/down capability
- Inverted output voltage characteristic
- Animated circuit diagram with MOSFET switching
- Adjustable parameters:
  * Input voltage: 3-48V
  * Duty cycle: 10-90%
  * Inductance: 10-1000µH
  * Capacitance: 10-1000µF
  * Load resistance: 10-500Ω
  * Switching frequency: 10-500kHz
- Real-time calculations:
  * Output voltage: Vout = -Vin × D/(1-D)
  * Voltage gain: D/(1-D)
  * Output current: |Vout| / R_LOAD
  * Input current: Iout × D/(1-D)
  * Efficiency: Pout / Pin × 100%
  * Ripple voltage: Iout / (f × C)
- Switching waveforms visualization:
  * Gate control signal (square wave)
  * Inductor current (sawtooth waveform)
  * Animated phase indicator
- Quick presets:
  * USB 5V → ±12V
  * 12V → -5V (Automotive)
  * 3.3V → -3.3V (Logic Level)
  * High Gain (5V → -20V)
- Comprehensive educational content:
  * How buck-boost converters work (ON/OFF states)
  * Key formulas and calculations
  * Design considerations (duty cycle limits, component selection)
  * Common applications (battery-powered, op-amp supplies, LED drivers)
  * Advantages (step-up/down, simple, efficient)
  * Disadvantages (inverted polarity, switch stress, diode losses)
- Component: BuckBoostConverter.vue (28,574 bytes)
- Page: pages/simulations/buck-boost-converter.vue (10,478 bytes)

### ✅ Transformer Calculator
- Interactive transformer parameter calculator
- Visual transformer diagram with core and windings
- Real-time calculations:
  * Turns ratio: a = N₁ / N₂
  * Voltage ratio: V₁ / V₂ = a
  * Current ratio: I₁ / I₂ = 1/a
  * Power: P = V × I
  * Reflected impedance: Z' = Z / a²
- Input controls for primary/secondary:
  * Voltage (V)
  * Current (A)
  * Turns (N)
  * Impedance (Ω)
- Calculation modes:
  * Primary → Secondary
  * Secondary → Primary
  * Calculate Turns Ratio
  * Impedance Matching
- Quick presets:
  * Step-Down (230V → 12V)
  * Step-Up (12V → 230V)
  * Isolation (1:1)
  * Impedance Match (600Ω → 2400Ω)
- Visual features:
  * Animated transformer diagram
  * Primary coil (blue) and secondary coil (green)
  * Core with lamination lines
  * Real-time ratio display
- Comprehensive educational content:
  * Basic principles (Faraday's law, ideal transformer)
  * Key formulas (turns ratio, voltage/current ratios, impedance reflection)
  * Transformer types (step-down, step-up, isolation, autotransformer)
  * Applications (power distribution, AC adapters, impedance matching)
  * Real-world considerations (efficiency, copper losses, core losses)
- Component: TransformerCalculator.vue (28,694 bytes)
- Page: pages/calculators/transformer-calculator.vue (10,555 bytes)

## Implementation Details

**Buck-Boost Converter:**
- Component: BuckBoostConverter.vue (28,574 bytes)
- Page: pages/simulations/buck-boost-converter.vue (10,478 bytes)
- Features: Inverted output, switching animation, waveform visualization
- Presets: USB Boost, Automotive, Logic Level, High Gain
- Educational: ON/OFF states, design considerations, pros/cons

**Transformer Calculator:**
- Component: TransformerCalculator.vue (28,694 bytes)
- Page: pages/calculators/transformer-calculator.vue (10,555 bytes)
- Features: Multiple calculation modes, impedance matching, visual diagram
- Presets: Step-Down, Step-Up, Isolation, Impedance Match
- Educational: Transformer theory, types, applications, real-world considerations

## Development Status
- Last Updated: 2026-02-28 (Session 9)
- Status: ✅ Complete - Two new features implemented and tested
- Latest Commit: 9c461e7
- Build Status: ✅ Build successful
- GitHub: https://github.com/canusorn/cyno_elec

## Project Statistics
- Total Calculators: 21
- Total Simulations: 17
- Total Features: 38

## Future Feature Ideas

### Potential Simulations:
- Buck-Boost Converter ✅ COMPLETED
- Cuk Converter
- SEPIC Converter
- Flyback Converter
- Forward Converter
- Push-Pull Converter
- Half-Bridge Converter
- Full-Bridge Converter
- Three-Phase Circuits
- 555 Timer Monostable Mode
- Current Mirror Circuits
- Differential Amplifier
- Active Filters (Low-pass, High-pass, Band-pass)
- Sallen-Key Filters
- Phase-Locked Loop (PLL)

### Potential Calculators:
- Transformer Calculator ✅ COMPLETED
- Delta-Wye (Δ-Y) Transform Calculator
- Voltage Regulator Calculator (LM317, 7805)
- Kirchhoff's Laws Solver
- Thevenin/Norton Equivalent Calculator
- Bandwidth Calculator
- Heat Sink Calculator
- Resistor Divider Network (multiple taps)
- Battery Sizing Calculator
- Solar Panel Calculator
- Rectifier Calculator
- Filter Design Calculator
- Operational Amplifier Calculator
- Power Supply Design Calculator

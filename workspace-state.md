# Cyno Electric Workspace State

## Current Features

### Calculators (14)
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
14. **decibel-calculator** ✨ NEW

### Simulations (10)
1. led-circuit-designer
2. parallel-circuit
3. diode-rectifier
4. rc-circuit
5. rlc-resonance
6. transformer-basics
7. rl-circuit
8. series-circuit
9. transistor-switch
10. **timer-555-astable** ✨ NEW

## Recently Completed (2026-02-28 - Session 5)

### ✅ 555 Timer Astable Multivibrator Simulation
- Interactive 555 timer IC simulator with R1, R2, and C controls
- Real-time frequency calculation: f = 1.44 / ((R1 + 2×R2) × C)
- Duty cycle visualization with adjustable pulse width
- Square wave output display with animated waveform
- Quick presets: LED Blinker (1Hz), Audio Tone (440Hz), Short Pulse
- Comprehensive educational content about 555 timer operation
- Formula explanations for t1 (high time), t2 (low time), frequency, and duty cycle
- Component selection guide and design tips

### ✅ Decibel Calculator
- Power ratio calculator: dB = 10 × log₁₀(P₂/P₁)
- Voltage ratio calculator: dB = 20 × log₁₀(V₂/V₁)
- Current ratio calculator: dB = 20 × log₁₀(I₂/I₁)
- Common ratio presets (1:1, 2:1, 10:1, 100:1)
- Reference table with common dB values and applications
- Linear ratio display with gain/loss indication
- Detailed breakdown showing logarithm values
- Comprehensive educational content about decibels
- Reference levels (dBm, dBW, dBu, dBV, dB SPL)
- Practical applications in audio, RF, and telecommunications

## Implementation Details

**555 Timer Astable:**
- Component: Timer555Astable.vue (391 lines)
- Page: pages/simulations/timer-555-astable.vue (200 lines)
- Features: Interactive sliders, real-time calculations, SVG waveform visualization
- Presets: LED Blinker, Audio Tone, Short Pulse
- Educational: IC operation, timing formulas, design tips

**Decibel Calculator:**
- Component: DecibelCalculator.vue (458 lines)
- Page: pages/calculators/decibel-calculator.vue (339 lines)
- Features: Three calculator modes (power/voltage/current), ratio presets
- Reference table: Common dB values and their meanings
- Educational: When to use decibels, power vs voltage formulas, reference levels

## Development Status
- Last Updated: 2026-02-28 (Session 5)
- Status: ✅ Complete - Two new features implemented
- Latest Commit: 5cd7cbf
- GitHub: https://github.com/canusorn/cyno_elec
- Build Status: ✅ PASSING (61 routes prerendered)

## Future Feature Ideas

### Potential Simulations:
- Wheatstone Bridge
- Operational Amplifier Circuits
- MOSFET Switching
- Thyristor/SCR Circuits
- Three-Phase Circuits
- 555 Timer Monostable Mode

### Potential Calculators:
- Wheatstone Bridge Calculator
- Op-Amp Gain Calculator
- 555 Timer Frequency Calculator
- Power Factor Calculator
- Kirchhoff's Laws Solver
- Thevenin/Norton Equivalent Calculator
- Delta-Wye Transform Calculator
- Voltage Regulator Calculator

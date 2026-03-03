# Cyno Electric Workspace State

## Current Features

### Calculators (47)
1. 78xx-regulator-design ✨ NEW
2. ac-power-calculator
3. antenna-resonant-frequency
4. battery-life
5. capacitance-calculator
6. capacitive-reactance
7. capacitor-series-parallel
8. current-divider
9. decibel-calculator
10. delta-wye
11. energy-storage
12. filter-design-calculator
13. heatsink-thermal
14. impedance-calculator
15. impedance-matching
16. inductance-calculator
17. inductive-reactance
18. inductor-energy
19. inductor-series-parallel
20. led-array
21. led-resistor
22. led-series-resistor
23. lm317-regulator
24. max-power-transfer
25. ohms-law
26. opamp-gain-calculator
27. power
28. power-factor-calculator
29. **pcb-trace-width** ✨ NEW
30. rc-time-constant
31. resistance-color-code
32. resistor-series-parallel
33. resistor-wattage
34. resonant-frequency
35. rl-time-constant
36. rms-peak-calculator
37. rlc-resonance
38. series-parallel-calculator
39. three-phase-power
40. transformer-calculator
41. voltage-divider
42. voltage-level-converter
43. vswr-calculator
44. wheatstone-bridge
45. wire-gauge-calculator
46. wien-bridge-calculator

### Simulations (44)
1. ac-circuit
2. active-filter
3. boost-converter
4. buck-boost-converter
5. buck-converter
6. capacitor-charging
7. common-emitter-amplifier
8. crystal-oscillator
9. current-divider
10. differential-amplifier
11. diode-clipping
12. diode-rectifier
13. electromagnetic-induction
14. full-wave-bridge-rectifier
15. half-bridge-motor-driver
16. inductive-kickback
17. inductor-self-resonance
18. lc-tank-circuit
19. led-circuit-designer
20. **magnetic-hysteresis** ✨ NEW
21. mosfet-switching
22. op-amp-amplifier
23. op-amp-integrator
24. parallel-circuit
25. phase-angle-control
26. push-pull-amplifier
27. pwm-generator
28. rc-circuit
29. rc-high-pass-filter
30. rectifier-smoothing
31. rlc-bandstop-filter
32. rlc-damped-oscillation
33. rl-circuit
34. rlc-resonance
35. sallen-key-filter
36. schmitt-trigger
37. series-circuit
38. timer-555-astable
39. timer-555-monostable
40. transformer-basics
41. transistor-switch
42. **triac-dimmer** ✨ NEW
43. voltage-multiplier
44. wien-bridge-oscillator
45. zener-voltage-regulator

## Recently Completed (2026-03-03)

### ✅ PCB Trace Width Calculator
- Calculate trace width based on IPC-2221 standards
- Support for current (0.1-20A), temperature rise (5-100°C)
- Configurable trace length (1-500mm) and copper weight (0.5-4 oz/ft²)
- Real-time cross-section visualization showing trace and substrate
- Current flow animation with particle effects
- Trace resistance and voltage drop calculations
- Power dissipation and cross-sectional area analysis
- Preset configurations: Signal, Medium Power, High Power, Very High Power
- Copper thickness reference table (0.5oz to 4oz)
- Design recommendations with safety margins
- Comprehensive educational content on PCB design considerations

### ✅ Triac Light Dimmer Simulation
- Interactive phase-angle control demonstration (0-180° firing angle)
- Real-time waveform visualization (full sine vs phase-controlled output)
- Animated circuit diagram with triac, diac, potentiometer, and load
- Firing angle indicator on waveform display
- Power percentage calculation based on conduction angle
- RMS voltage output calculation
- Conduction angle display (180° - firing angle)
- Animated light bulb with brightness proportional to power output
- Current flow animation in the circuit
- Preset brightness levels: Full Power, Bright, Medium, Dim
- Comprehensive educational content on triacs and phase-angle control
- Applications and limitations guide (resistive vs non-resistive loads)
- Power formula explanations with examples

### ✅ Resonant Frequency Calculator
- Calculate resonant frequency for LC and RLC circuits (f₀ = 1 / 2π√LC)
- Support for both series and parallel resonance configurations
- Real-time frequency calculation with multiple units (Hz, kHz, MHz)
- Interactive reactance curve visualization showing XL and XC crossing
- Bandwidth and Q factor calculations for parallel RLC circuits
- Preset circuits: Radio Tuner, Tank Circuit, Filter Design, Oscillator
- Comprehensive formula reference and educational content

### ✅ Current Divider Simulation
- Interactive parallel circuit with 2-4 branches
- Real-time current distribution visualization based on resistance values
- Animated current flow with speed proportional to current magnitude
- Current bar chart showing percentage distribution
- Add/remove branches dynamically
- Preset configurations: Equal Split, Unbalanced, Dominant Path, Three-Way
- Educational content on current divider rule and applications

### ✅ Differential Amplifier Simulation
- Interactive differential amplifier visualization with op-amp circuit
- Real-time input/output waveform display
- Differential and common-mode signal analysis
- CMRR (Common-Mode Rejection Ratio) demonstration
- Adjustable gain (1-20x) and CMRR (40-120 dB) parameters
- Signal analysis with percentage breakdown
- Color-coded circuit diagram with SVG
- Comprehensive educational content on differential amplifiers

### ✅ Op-Amp Gain Calculator
- Multi-configuration support (Inverting, Non-Inverting, Differential, Voltage Follower)
- Interactive circuit diagrams for each configuration
- Real-time gain calculation in linear (V/V) and logarithmic (dB) scales
- Resistor value input with dynamic visualization
- Formula display and example outputs
- Educational content on practical considerations and applications

### ✅ Transistor Switch Simulation
- NPN transistor switching circuit visualization
- Interactive base current control
- Real-time ON/OFF state display
- LED load indicator with light rays animation
- Current flow visualization (I_B, I_C, I_E)
- Preset configurations (LED Driver, Motor Control, Relay Driver)
- Comprehensive educational content
- Color-coded circuit diagram with SVG

### ✅ RC Time Constant Calculator
- Calculate time constant (τ = R × C)
- Interactive charging/discharging mode selection
- Real-time exponential curve visualization
- Voltage percentage markers (63.2%, 86.5%, 95%, 98.2%, 99.3%)
- Interactive time point selection (1τ, 2τ, 3τ, 4τ, 5τ)
- Multiple time format display (ns, μs, ms, s, m)
- Preset circuits (LED Blinker, Audio Filter, Power Supply)
- Comprehensive formula explanations

## Future Feature Ideas

### Potential Simulations:
- Wheatstone Bridge
- Operational Amplifier Circuits
- 555 Timer Astable/Monostable
- MOSFET Switching
- Thyristor/SCR Circuits

### Potential Calculators:
- Wheatstone Bridge Calculator
- Op-Amp Gain Calculator
- 555 Timer Frequency Calculator
- Decibel Calculator
- Kirchhoff's Laws Solver
- Thevenin/Norton Equivalent Calculator

## Development Status
- Last Updated: 2026-03-03 17:32
- Status: ✅ Complete - PCB Trace Width Calculator & Triac Light Dimmer Simulation added
- Latest Commit: ada797a
- GitHub: https://github.com/canusorn/cyno_elec

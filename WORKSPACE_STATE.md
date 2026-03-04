# Cyno Electric Workspace State

## Current Features

### Calculators (53)
1. 78xx-regulator-design ✨ NEW
2. **ripple-voltage** ✨ NEW
3. **smd-resistor-code** ✨ NEW (3-digit, 4-digit EIA, EIA-96 decoder)
4. **wire-gauge** ✨ NEW
5. **cutoff-frequency-calculator** ✨ NEW
6. ac-power-calculator
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
27. **period-frequency-converter** ✨ NEW
28. power
29. power-factor-calculator
30. **pcb-trace-width** ✨ NEW
31. rc-time-constant
32. resistance-color-code
33. resistor-series-parallel
34. resistor-wattage
35. resonant-frequency
36. rl-time-constant
37. rms-peak-calculator
38. rlc-resonance
39. series-parallel-calculator
40. three-phase-power
41. transformer-calculator
42. voltage-divider
43. voltage-level-converter
44. vswr-calculator
45. wheatstone-bridge
46. wire-gauge-calculator
47. wien-bridge-calculator

### Simulations (51)
1. ac-circuit
2. active-filter
3. **colpitts-oscillator** ✨ NEW
4. **differential-pair** ✨ NEW
5. **instrumentation-amplifier** ✨ NEW (3-op-amp with gain control)
6. **joule-thief-circuit** ✨ NEW
7. boost-converter
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
38. **series-circuit-analysis** ✨ NEW
39. timer-555-astable
40. timer-555-monostable
41. transformer-basics
42. transistor-switch
43. **triac-dimmer** ✨ NEW
44. voltage-multiplier
45. wien-bridge-oscillator
46. zener-voltage-regulator

## Recently Completed (2026-03-04)

### ✅ Instrumentation Amplifier Simulation
- Three-op-amp differential amplifier with adjustable gain (1-100+)
- Interactive differential input control (Vin+ and Vin-)
- Real-time output voltage calculation: Vout = (Vin+ - Vin-) × (1 + 2R/RG)
- Gain control via RG resistor (100Ω to 50kΩ)
- SVG circuit diagram with animated current flow
- Signal visualization showing input vs amplified output
- CMRR display (100+ dB)
- Preset configurations: Low Gain (2×), Medium Gain (10×), High Gain (100×), Strain Gauge, ECG Front-end, Thermocouple
- Comprehensive educational content on instrumentation amplifiers
- Key applications: medical instrumentation, sensor interfaces, industrial automation, audio equipment
- Design considerations: RG resistor tolerance, resistor matching, reference voltage, input protection

### ✅ SMD Resistor Code Decoder Calculator
- Support for 3-digit EIA code (e.g., 103 = 10kΩ)
- Support for 4-digit EIA code (e.g., 1002 = 10kΩ)
- Support for EIA-96 code (e.g., 01F = 10MΩ)
- Real-time code validation and error messages
- Value breakdown showing significant digits, multiplier, and power of 10
- Equivalent values in Ω, kΩ, MΩ, and mΩ
- Package size reference (0201 to 2512) with power ratings
- Visual SMD component diagram with dimensions
- Quick examples for each code format
- Comprehensive educational content on SMD marking systems
- EIA-96 value codes table (01-96) and multiplier letters (Y, X, R, A-L)
- Applications: consumer electronics, industrial equipment, automotive

### ✅ Additional Features (Included in Push)
- Wire Gauge Calculator: Current capacity, voltage drop, material selection (copper, aluminum, gold, silver)
- Cutoff Frequency Calculator: Active and passive filter design
- Colpitts Oscillator: LC tank circuit simulation
- Joule Thief Circuit: Energy extraction from dead batteries

## Recently Completed (2026-03-03)

### ✅ Ripple Voltage Calculator
- Calculate ripple voltage for power supply filtering (V_ripple = I_load / (f × C))
- Support for full-wave and half-wave rectifiers
- Configurable mains frequency (50Hz/60Hz)
- Real-time calculation with multiple voltage formats (µV, mV, V)
- Interactive ripple waveform visualization with sawtooth approximation
- Load current control (1mA to 10A)
- Filter capacitance control (1µF to 100,000µF)
- Ripple frequency and time-between-peaks display
- Quick convert presets: Arduino, Raspberry Pi, Audio Amp, Motor Driver
- Comprehensive educational content on ripple voltage
- Design tips and typical ripple requirements table
- Formula explanations and practical applications

### ✅ Differential Pair Simulation
- Interactive differential pair amplifier with two matched NPN transistors
- Real-time current steering visualization based on differential input
- Adjustable input voltages (Vin+, Vin- from -2V to +2V)
- Tail current source control (0.1mA to 10mA)
- Collector resistance control (0.5kΩ to 10kΩ)
- Differential and common-mode input voltage display
- Transfer characteristic curve with operating point indicator
- Current distribution bar chart showing I_C1 and I_C2 split
- Animated circuit diagram with color-coded components
- SVG circuit visualization showing Q1, Q2, tail current, and collector resistors
- Output voltage analysis (Vout1, Vout2, differential output)
- Preset configurations: Balanced, Positive Diff, Negative Diff, Large Signal
- Comprehensive educational content on differential pairs
- Key equations: differential voltage, common-mode voltage, voltage gain
- Applications: op-amps, differential signaling, RF mixers, DACs
- Design considerations: transistor matching, emitter degeneration, load balancing

### ✅ Series Circuit Analysis Simulation
- Interactive series circuit explorer with multiple resistors (2-5)
- Real-time voltage drop visualization across each resistor
- Current flow animation with Ohm's law calculations
- Power dissipation analysis with bar charts showing distribution
- Kirchhoff's Voltage Law verification with live calculations
- SVG circuit diagram with color-coded components and animations
- Preset configurations: Equal Resistors, Voltage Divider, High Power, Unbalanced
- Comprehensive educational content on series circuits
- Formula explanations: R_total, Ohm's Law, voltage drops, power dissipation
- Practical applications and limitations guide

### ✅ Period-Frequency Converter Calculator
- Bidirectional conversion between period (T) and frequency (f)
- Support for multiple units: ps, ns, μs, ms, s, min, hr (period) and Hz, kHz, MHz, GHz, THz (frequency)
- Real-time calculation with automatic unit selection based on magnitude
- Results display in all available units simultaneously
- Waveform visualization with animated sine wave
- Period indicator showing T on waveform when frequency ≤ 100Hz
- Quick convert presets: 60Hz power, 1kHz audio, 1MHz RF, 2.4GHz WiFi
- Comprehensive educational content on the inverse relationship
- Common applications for period and frequency in electrical engineering
- Formula explanations and example calculations

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
- Last Updated: 2026-03-04 16:36
- Status: ✅ Complete - Instrumentation Amplifier Simulation & SMD Resistor Code Decoder added
- Latest Commit: ac4434b (feat: add instrumentation amplifier simulation and SMD resistor code decoder)
- Total Features: 53 Calculators + 51 Simulations = 104 total
- GitHub: https://github.com/canusorn/cyno_elec

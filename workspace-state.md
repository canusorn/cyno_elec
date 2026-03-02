# Cyno Electric Workspace State

## Current Features

### Calculators (31)
1. ac-power-calculator
2. battery-life
3. capacitance-calculator
4. capacitive-reactance
5. capacitor-series-parallel
6. decibel-calculator
7. delta-wye
8. energy-storage
9. **filter-design-calculator** ✨ NEW
10. impedance-calculator
11. inductance-calculator
12. inductive-reactance
13. inductor-energy
14. led-resistor
15. **lm317-regulator**
16. ohms-law
17. **opamp-gain-calculator**
18. power
19. power-factor-calculator
20. **rc-low-pass-filter** ✨ NEW
21. rc-time-constant
22. **regulator-7805** ✨ NEW
23. resistance-color-code
24. resistor-series-parallel
25. resonant-frequency
26. three-phase-power
27. transformer-calculator
28. voltage-divider
29. wheatstone-bridge
30. **wien-bridge-calculator** ✨ NEW
31. wire-gauge-calculator

### Simulations (27)
1. ac-circuit
2. **active-filter** ✨ NEW
3. boost-converter
4. buck-boost-converter
5. buck-converter
6. capacitor-charging
7. current-divider
8. differential-amplifier
9. diode-rectifier
10. **electromagnetic-induction** ✨ NEW
11. full-wave-bridge-rectifier
12. half-bridge-motor-driver
13. led-circuit-designer
14. mosfet-switching
15. op-amp-amplifier
16. parallel-circuit
17. **pwm-generator** ✨ NEW
18. rc-circuit
19. rl-circuit
20. rlc-resonance
21. series-circuit
22. timer-555-astable
23. timer-555-monostable
24. transformer-basics
25. transistor-switch
26. wien-bridge-oscillator
27. **inductor-self-resonance** ✨ NEW

## Recently Completed (2026-03-02 - Session 10)

### ✅ Inductor Self-Resonance Simulation
- Explore parasitic capacitance effects in real inductors
- Calculate self-resonant frequency (SRF = 1/2π√LCp)
- Visualize impedance vs frequency curve (log-log scale)
- Quality factor (Q) calculations at different frequencies
- Interactive circuit diagram showing parasitic capacitance model
- Quick presets for different inductor types:
  * Small RF inductors (1µH, 2pF)
  * Power inductors (100µH, 10pF)
  * High Q inductors (10mH, 5pF)
  * SMD 0805 inductors (22nH, 0.5pF)
- Frequency range: 1kHz to 100MHz
- Real-time impedance calculations showing:
  * Inductive region (below SRF)
  * Resistive region (at SRF)
  * Capacitive region (above SRF)
- Component: InductorSelfResonance.vue (19,886 bytes)
- Page: pages/simulations/inductor-self-resonance.vue (9,423 bytes)

### ✅ RC Low-Pass Filter Calculator
- Design RC low-pass filters with specific cutoff frequencies
- Interactive Bode plot visualization:
  * Magnitude response (dB vs frequency)
  * Phase response (degrees vs frequency)
  * -3dB cutoff point clearly marked
- Multiple design strategies:
  * Choose C, calculate R
  * Choose R, calculate C
  * Match impedance (Z = 50Ω)
- Real-time component value calculations
- Attenuation table showing:
  * Gain at 0.01fc, 0.1fc, fc, 10fc, 100fc
  * Phase shift at each frequency
- Standard component value recommendations:
  * E96 series for resistors
  * E6 series for capacitors
- Quick presets:
  * Audio 1kHz (R=15.9kΩ, C=10nF)
  * Audio 10kHz (R=15.9kΩ, C=1nF)
  * RF 1MHz (R=1.59kΩ, C=100pF)
  * DC 100Hz (R=15.9kΩ, C=100nF)
- Component: RCLowPassFilterCalculator.vue (25,026 bytes)
- Page: pages/calculators/rc-low-pass-filter.vue (11,995 bytes)

## Additional Features in This Session

### Active Filter Simulation
- First-order and second-order active filter simulations
- Sallen-Key topology implementation
- Cutoff frequency adjustment
- Component value suggestions

### Electromagnetic Induction Simulation
- Faraday's law visualization
- Lenz's law demonstration
- Induced EMF calculations
- Moving magnet through coil animation

### PWM Generator Simulation
- Pulse Width Modulation visualization
- Duty cycle control (0-100%)
- Frequency adjustment
- Output waveform display

### Filter Design Calculator
- Multiple filter types (Butterworth, Chebyshev, Bessel)
- Order selection (1st to 10th order)
- Component value calculations
- Frequency response preview

### Wien Bridge Calculator
- Wien bridge oscillator frequency calculation
- Component ratio requirements
- Gain requirements for oscillation
- Stability analysis

### 7805 Voltage Regulator Calculator
- Input voltage range
- Output voltage (5V fixed)
- Thermal calculations
- Dropout voltage considerations
- Heat sink requirements

## Implementation Details

**Inductor Self-Resonance:**
- Component: InductorSelfResonance.vue (19,886 bytes)
- Page: pages/simulations/inductor-self-resonance.vue (9,423 bytes)
- Features: Parasitic capacitance model, impedance curve, SRF calculation, Q factor
- Presets: Small RF, Power Inductor, High Q, SMD 0805
- Educational: Real inductor behavior, frequency regions, design guidelines

**RC Low-Pass Filter:**
- Component: RCLowPassFilterCalculator.vue (25,026 bytes)
- Page: pages/calculators/rc-low-pass-filter.vue (11,995 bytes)
- Features: Bode plot, design strategies, standard values, attenuation table
- Presets: Audio 1kHz, Audio 10kHz, RF 1MHz, DC 100Hz
- Educational: Filter theory, design considerations, applications

## Development Status
- Last Updated: 2026-03-02 (Session 10)
- Status: ✅ Complete - Eight new features implemented
- Latest Commit: 3c49bf9
- Build Status: ✅ Ready for deployment
- GitHub: https://github.com/canusorn/cyno_elec

## Project Statistics
- Total Calculators: 31
- Total Simulations: 27
- Total Features: 58

## Future Feature Ideas

### Potential Simulations:
- Cuk Converter
- SEPIC Converter
- Flyback Converter
- Forward Converter
- Push-Pull Converter
- Half-Bridge Converter
- Full-Bridge Converter
- Three-Phase Circuits
- Current Mirror Circuits
- Phase-Locked Loop (PLL)
- Schmitt Trigger
- Multivibrators
- Sample and Hold Circuit
- Instrumentation Amplifier
- Log/Antilog Amplifier

### Potential Calculators:
- Voltage Regulator Calculator (LM317, 7805) ✅ DONE
- Kirchhoff's Laws Solver
- Thevenin/Norton Equivalent Calculator
- Bandwidth Calculator
- Heat Sink Calculator ✅ DONE
- Resistor Divider Network (multiple taps)
- Battery Sizing Calculator
- Solar Panel Calculator
- Rectifier Calculator
- Operational Amplifier Calculator
- Power Supply Design Calculator
- Transmission Line Calculator
- Antenna Design Calculator

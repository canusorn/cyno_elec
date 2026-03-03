<template>
  <div :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />
    
    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <BoltIcon class="h-16 w-16 text-primary" />
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Battery Pack Designer
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Calculate series and parallel battery pack configurations for custom voltage and capacity
          </p>
          
          <!-- Animated Formula -->
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block mb-8">
            <div class="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
              <span class="text-primary-highlight">Series:</span> Voltage × N &nbsp;|&nbsp; 
              <span class="text-primary-highlight">Parallel:</span> Capacity × N &nbsp;|&nbsp; 
              <span class="text-primary-highlight">Energy:</span> V × Ah
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Series-Parallel Configuration Formulas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Section -->
    <section class="pb-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          
          <!-- Cell Type Selection -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Select Cell Type</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                v-for="type in cellTypes"
                :key="type.id"
                @click="selectCellType(type)"
                :class="selectedCellType.id === type.id ? 'bg-primary text-white scale-105 ring-4 ring-primary/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="p-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                <div class="text-lg">{{ type.name }}</div>
                <div class="text-sm opacity-80">{{ type.voltage }}V | {{ type.capacity }}Ah</div>
              </button>
            </div>
          </div>

          <!-- Custom Cell Configuration -->
          <div v-if="selectedCellType.id === 'custom'" class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cell Voltage (V)
              </label>
              <input
                v-model.number="customVoltage"
                type="number"
                min="1"
                max="5"
                step="0.1"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cell Capacity (Ah)
              </label>
              <input
                v-model.number="customCapacity"
                type="number"
                min="0.5"
                max="50"
                step="0.1"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <!-- Configuration Mode -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Configuration Mode</h3>
            <div class="flex gap-4">
              <button 
                @click="configMode = 'cells'"
                :class="configMode === 'cells' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200"
              >
                By Number of Cells
              </button>
              <button 
                @click="configMode = 'target'"
                :class="configMode === 'target' ? 'bg-primary text-white scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                class="flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200"
              >
                By Target Specs
              </button>
            </div>
          </div>

          <!-- Input by Number of Cells -->
          <div v-if="configMode === 'cells'" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Series Cells (Voltage)
              </label>
              <input
                v-model.number="seriesCells"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold"
              />
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Cells connected in series (+ to -)</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Parallel Cells (Capacity)
              </label>
              <input
                v-model.number="parallelCells"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold"
              />
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Cells connected in parallel (+ to +)</p>
            </div>
          </div>

          <!-- Input by Target Specifications -->
          <div v-if="configMode === 'target'" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Voltage (V)
              </label>
              <input
                v-model.number="targetVoltage"
                type="number"
                min="1"
                max="500"
                step="0.1"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Capacity (Ah)
              </label>
              <input
                v-model.number="targetCapacity"
                type="number"
                min="1"
                max="1000"
                step="0.1"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-semibold"
              />
            </div>
          </div>

          <!-- Load Current (for runtime calculation) -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Load Current (A) - Optional
            </label>
            <input
              v-model.number="loadCurrent"
              type="number"
              min="0"
              max="500"
              step="0.1"
              placeholder="Enter load current for runtime calculation"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
            />
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Leave empty to skip runtime calculation</p>
          </div>

          <!-- Results Display -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Voltage</div>
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ packVoltage.toFixed(1) }} V</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ seriesCells }} cells in series</div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Capacity</div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ packCapacity.toFixed(1) }} Ah</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ parallelCells }} cells in parallel</div>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Energy</div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ packEnergy.toFixed(1) }} Wh</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ (packEnergy / 1000).toFixed(2) }} kWh</div>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Cells</div>
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ totalCells }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ seriesCells }}S × {{ parallelCells }}P configuration</div>
            </div>
            <div v-if="loadCurrent > 0" class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Runtime at {{ loadCurrent }}A</div>
              <div class="text-3xl font-bold text-teal-600 dark:text-teal-400">{{ runtimeHours.toFixed(1) }} hours</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ runtimeMinutes }} minutes</div>
            </div>
            <div v-if="loadCurrent > 0" class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 rounded-lg p-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Power at {{ loadCurrent }}A</div>
              <div class="text-3xl font-bold text-red-600 dark:text-red-400">{{ powerOutput.toFixed(1) }} W</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ (powerOutput / 1000).toFixed(2) }} kW</div>
            </div>
          </div>

          <!-- Battery Pack Visualization -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Battery Pack Visualization ({{ seriesCells }}S {{ parallelCells }}P)</h3>
            <svg viewBox="0 0 800 400" class="w-full h-auto">
              <!-- Background -->
              <rect width="800" height="400" fill="#f9fafb" class="dark:fill-gray-800" rx="8" />
              
              <!-- Draw battery pack grid -->
              <g v-for="row in Math.min(parallelCells, 5)" :key="'row-' + row">
                <g v-for="col in Math.min(seriesCells, 10)" :key="'col-' + col">
                  <!-- Battery cell -->
                  <rect
                    :x="80 + (col - 1) * 65"
                    :y="40 + (row - 1) * 55"
                    width="50"
                    height="40"
                    :fill="row % 2 === 0 ? '#10b981' : '#059669'"
                    stroke="#374151"
                    stroke-width="2"
                    rx="4"
                  />
                  <!-- Positive terminal -->
                  <rect
                    :x="85 + (col - 1) * 65"
                    :y="34 + (row - 1) * 55"
                    width="8"
                    height="6"
                    fill="#dc2626"
                  />
                  <!-- Negative terminal -->
                  <rect
                    :x="117 + (col - 1) * 65"
                    :y="34 + (row - 1) * 55"
                    width="8"
                    height="6"
                    fill="#1f2937"
                  />
                </g>
              </g>

              <!-- More cells indicator -->
              <g v-if="parallelCells > 5 || seriesCells > 10">
                <text x="400" y="340" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-sm">
                  Showing {{ Math.min(parallelCells, 5) }} × {{ Math.min(seriesCells, 10) }} cells
                </text>
                <text x="400" y="360" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400 text-sm">
                  Total: {{ totalCells }} cells ({{ seriesCells }}S {{ parallelCells }}P)
                </text>
              </g>

              <!-- Legend -->
              <g transform="translate(680, 50)">
                <rect x="0" y="0" width="100" height="80" fill="white" stroke="#e5e7eb" rx="4" class="dark:fill-gray-700 dark:stroke-gray-600" />
                <text x="50" y="20" text-anchor="middle" class="fill-gray-900 dark:fill-white text-xs font-semibold">Legend</text>
                
                <rect x="10" y="30" width="15" height="15" fill="#10b981" stroke="#374151" stroke-width="1" />
                <text x="35" y="42" class="fill-gray-700 dark:fill-gray-300 text-xs">Cell</text>
                
                <rect x="10" y="50" width="8" height="6" fill="#dc2626" />
                <text x="35" y="57" class="fill-gray-700 dark:fill-gray-300 text-xs">Positive (+)</text>
                
                <rect x="10" y="65" width="8" height="6" fill="#1f2937" />
                <text x="35" y="72" class="fill-gray-700 dark:fill-gray-300 text-xs">Negative (-)</text>
              </g>

              <!-- Connection arrows (simplified) -->
              <g v-if="seriesCells <= 10 && parallelCells <= 5">
                <!-- Series connection indicators -->
                <text x="400" y="320" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-xs">
                  ← Series connection (+ to -) increases Voltage →
                </text>
                <!-- Parallel connection indicators -->
                <text x="400" y="380" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-xs">
                  ↑ Parallel connection (+ to +, - to -) increases Capacity ↑
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Configuration Examples -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Battery Pack Configurations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">3S 1P (11.1V)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">RC cars, drones</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">3 cells in series, 1 parallel</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">6S 1P (22.2V)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Larger drones, racing quads</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">6 cells in series, 1 parallel</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">10S 3P (111V, 15Ah)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">E-bike battery</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">10 series, 3 parallel groups</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">13S 4P (144V, 12Ah)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">E-scooter, small EV</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">13 series, 4 parallel groups</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">14S 8P (222V, 24Ah)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Solar storage</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">14 series, 8 parallel groups</p>
            </div>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary transition-colors">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">96S 50P (350V, 100Ah)</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Electric vehicle</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">96 series, 50 parallel groups</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Battery Pack Design
          </h2>
          
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series Connection (Increasing Voltage)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When batteries are connected in series (positive to negative), the voltages add up while the 
              capacity remains the same. For example, four 3.7V cells in series create a 14.8V pack, but 
              still only have the capacity of a single cell.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="font-mono text-sm">
                <strong>Series:</strong> V_total = V_cell × N_series<br>
                <strong>Capacity:</strong> Ah_total = Ah_cell (unchanged)<br>
                <strong>Energy:</strong> Wh_total = V_total × Ah_total
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Parallel Connection (Increasing Capacity)</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When batteries are connected in parallel (positive to positive, negative to negative), the 
              capacities add up while the voltage stays the same. This increases runtime and current handling. 
              For example, three 2Ah cells in parallel create a 6Ah pack at the same voltage.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="font-mono text-sm">
                <strong>Parallel:</strong> Ah_total = Ah_cell × N_parallel<br>
                <strong>Voltage:</strong> V_total = V_cell (unchanged)<br>
                <strong>Energy:</strong> Wh_total = V_total × Ah_total
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Series-Parallel Combinations</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Most battery packs use both series and parallel connections to achieve both higher voltage 
              AND higher capacity. The configuration is written as "XSY P" where X is the number of series 
              cells and Y is the number of parallel cells.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="font-mono text-sm">
                <strong>Example: 10S 3P (using 3.7V, 2Ah cells)</strong><br>
                Voltage: 3.7V × 10 = 37V<br>
                Capacity: 2Ah × 3 = 6Ah<br>
                Energy: 37V × 6Ah = 222Wh<br>
                Total cells: 10 × 3 = 30 cells
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Common Cell Types:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>18650:</strong> 18mm diameter, 65mm length. Most common Li-ion cell. 3.7V, 2-3.5Ah</li>
              <li><strong>21700:</strong> 21mm diameter, 70mm length. Higher capacity. 3.7V, 4-5Ah</li>
              <li><strong>26650:</strong> 26mm diameter, 65mm length. High power applications. 3.2V, 3-5Ah</li>
              <li><strong>LiFePO4 (26650):</strong> Safer chemistry. 3.2V, 3-3.5Ah</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Design Considerations:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li><strong>Voltage:</strong> Choose based on your motor/controller requirements</li>
              <li><strong>Capacity:</strong> Determines runtime. Higher capacity = longer runtime</li>
              <li><strong>Current:</strong> Parallel cells share current load. More parallel = more current capability</li>
              <li><strong>Balancing:</strong> Use a BMS (Battery Management System) for series connections</li>
              <li><strong>Safety:</strong> Li-ion cells need protection. Never short-circuit or overcharge</li>
              <li><strong>Matching:</strong> Always use cells of the same type, age, and capacity in a pack</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Energy Calculations:</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Energy is measured in Watt-hours (Wh) and represents the total energy stored in the battery pack. 
              This is calculated by multiplying voltage by capacity. For example, a 48V 10Ah pack contains 480Wh 
              of energy, which could power a 100W device for 4.8 hours theoretically.
            </p>
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 my-4">
              <div class="font-mono text-sm">
                <strong>Runtime Calculation:</strong><br>
                Runtime (hours) = Battery Capacity (Ah) ÷ Load Current (A)<br>
                <strong>Or:</strong><br>
                Runtime (hours) = Energy (Wh) ÷ Power (W)
              </div>
            </div>

            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">Important Safety Notes:</h3>
            <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Always use a BMS (Battery Management System) for packs with multiple series cells</li>
              <li>Never mix different cell types, brands, or capacities in the same pack</li>
              <li>Li-ion cells can be dangerous if mishandled. Fire and explosion risk exists</li>
              <li>Charge in a fire-safe area and never leave charging batteries unattended</li>
              <li>Use appropriate chargers designed for your pack voltage</li>
              <li>Consider LiFePO4 cells for safer (though heavier) alternatives</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { BoltIcon } from '@heroicons/vue/24/outline'
import NavigationBar from '~/components/NavigationBar.vue'

useHead({
  title: 'Battery Pack Designer - Cyno Electric',
  meta: [
    { name: 'description', content: 'Design series and parallel battery pack configurations. Calculate voltage, capacity, energy, and runtime for custom battery packs.' }
  ]
})

const colorMode = useColorMode()

// Cell type presets
const cellTypes = [
  { id: '18650', name: '18650 Li-ion', voltage: 3.7, capacity: 2.5 },
  { id: '21700', name: '21700 Li-ion', voltage: 3.7, capacity: 4.2 },
  { id: '26650-lifepo4', name: '26650 LiFePO4', voltage: 3.2, capacity: 3.2 },
  { id: 'custom', name: 'Custom Cell', voltage: 3.7, capacity: 2.5 }
]

const selectedCellType = ref(cellTypes[0])
const configMode = ref('cells')
const customVoltage = ref(3.7)
const customCapacity = ref(2.5)

// Configuration inputs
const seriesCells = ref(10)
const parallelCells = ref(3)
const targetVoltage = ref(37)
const targetCapacity = ref(7.5)
const loadCurrent = ref(null)

// Computed cell properties
const cellVoltage = computed(() => {
  return selectedCellType.value.id === 'custom' ? customVoltage.value : selectedCellType.value.voltage
})

const cellCapacity = computed(() => {
  return selectedCellType.value.id === 'custom' ? customCapacity.value : selectedCellType.value.capacity
})

// Calculate pack specifications
const packVoltage = computed(() => {
  if (configMode.value === 'target') {
    return Math.ceil(targetVoltage.value / cellVoltage.value) * cellVoltage.value
  }
  return seriesCells.value * cellVoltage.value
})

const packCapacity = computed(() => {
  if (configMode.value === 'target') {
    return Math.ceil(targetCapacity.value / cellCapacity.value) * cellCapacity.value
  }
  return parallelCells.value * cellCapacity.value
})

const calculatedSeriesCells = computed(() => {
  if (configMode.value === 'target') {
    return Math.ceil(targetVoltage.value / cellVoltage.value)
  }
  return seriesCells.value
})

const calculatedParallelCells = computed(() => {
  if (configMode.value === 'target') {
    return Math.ceil(targetCapacity.value / cellCapacity.value)
  }
  return parallelCells.value
})

// Use calculated values for display
const seriesCellsDisplay = computed(() => calculatedSeriesCells.value)
const parallelCellsDisplay = computed(() => calculatedParallelCells.value)

const totalCells = computed(() => {
  return seriesCellsDisplay.value * parallelCellsDisplay.value
})

const packEnergy = computed(() => {
  return packVoltage.value * packCapacity.value
})

const runtimeHours = computed(() => {
  if (loadCurrent.value && loadCurrent.value > 0) {
    return packCapacity.value / loadCurrent.value
  }
  return 0
})

const runtimeMinutes = computed(() => {
  return Math.round((runtimeHours.value % 1) * 60)
})

const powerOutput = computed(() => {
  if (loadCurrent.value && loadCurrent.value > 0) {
    return packVoltage.value * loadCurrent.value
  }
  return 0
})

// Methods
const selectCellType = (type) => {
  selectedCellType.value = type
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            ⚡ Circuit Simulations
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interactive circuit simulators with real-time visualization. Learn electrical concepts through hands-on exploration!
          </p>
        </div>
      </div>
    </section>

    <!-- Simulations Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Basic Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <circle cx="40" cy="60" r="30" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="120" y="45" width="30" height="30" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="70" y1="60" x2="120" y2="60" stroke="#94A3B8" stroke-width="3"/>
                <line x1="40" y1="90" x2="40" y2="110" stroke="#94A3B8" stroke-width="3"/>
                <line x1="135" y1="75" x2="135" y2="110" stroke="#94A3B8" stroke-width="3"/>
                <line x1="40" y1="110" x2="135" y2="110" stroke="#94A3B8" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Basic Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Simple voltage source with a single resistor. Adjust voltage and resistance to see current changes.
              </p>
              <NuxtLink 
                to="/simulations" 
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Series Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <rect x="60" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <rect x="110" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <rect x="160" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Series Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Multiple resistors in series. Learn how voltage divides across components.
              </p>
              <NuxtLink 
                to="/simulations/series-circuit" 
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Parallel Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="45" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="75" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="30" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <line x1="70" y1="20" x2="70" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="70" y1="80" x2="70" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="65" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
                <line x1="120" y1="20" x2="120" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="80" x2="120" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="115" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
                <line x1="170" y1="20" x2="170" y2="40" stroke="#94A3B8" stroke-width="2"/>
                <line x1="170" y1="80" x2="170" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <rect x="165" y="40" width="10" height="40" fill="white" stroke="#22C55E" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Parallel Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Multiple branches in parallel. See how current divides between paths.
              </p>
              <NuxtLink 
                to="/simulations/parallel-circuit" 
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- RC Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="60" y="35" width="40" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="140" y1="45" x2="140" y2="75" stroke="#22C55E" stroke-width="3"/>
                <line x1="155" y1="45" x2="155" y2="75" stroke="#22C55E" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RC Circuit Time Constant
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Capacitor charging and discharging curves with time constant visualization.
              </p>
              <NuxtLink
                to="/simulations/rc-circuit"
                class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Capacitor Charging/Discharging -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="60" y="35" width="40" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="140" y1="45" x2="140" y2="55" stroke="#10B981" stroke-width="4"/>
                <line x1="140" y1="65" x2="140" y2="75" stroke="#10B981" stroke-width="4"/>
                <path d="M 160 40 Q 170 50, 160 60" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <path d="M 160 60 Q 170 70, 160 80" fill="none" stroke="#F59E0B" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Capacitor Charging/Discharging
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive exponential curves showing voltage and current over time with live graphing.
              </p>
              <NuxtLink
                to="/simulations/capacitor-charging"
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- LED Circuit Designer -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="30" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="60" y="55" width="40" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <g transform="translate(120, 60)">
                  <polygon points="0,-10 8,0 0,10" fill="none" stroke="#22C55E" stroke-width="2"/>
                  <line x1="8" y1="-10" x2="8" y2="10" stroke="#22C55E" stroke-width="2"/>
                  <line x1="4" y1="-14" x2="4" y2="-20" stroke="#FBBF24" stroke-width="2"/>
                  <line x1="12" y1="-14" x2="12" y2="-20" stroke="#FBBF24" stroke-width="2"/>
                </g>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                LED Circuit Designer
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Design circuits with multiple LEDs in series or parallel configurations.
              </p>
              <NuxtLink 
                to="/simulations/led-circuit-designer" 
                class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- RL Circuit Transient -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="60" y="35" width="40" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <g transform="translate(140, 60)">
                  <path d="M0,-20 Q8,-18 8,-14 Q8,-10 0,-8 Q-8,-6 -8,-2 Q-8,2 0,4 Q8,6 8,10 Q8,14 0,20" fill="none" stroke="#06B6D4" stroke-width="2.5"/>
                </g>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RL Circuit Transient
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore inductor charging and discharging with time constant visualization.
              </p>
              <NuxtLink 
                to="/simulations/rl-circuit" 
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- RLC Circuit Resonance -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <path d="M 20 55 Q 25 50, 30 55 Q 35 60, 40 55" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <rect x="60" y="35" width="30" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <g transform="translate(140, 60)">
                  <path d="M0,-20 Q8,-18 8,-14 Q8,-10 0,-8 Q-8,-6 -8,-2 Q-8,2 0,4 Q8,6 8,10 Q8,14 0,20" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                </g>
                <g transform="translate(100, 80)">
                  <line x1="0" y1="-10" x2="0" y2="10" stroke="#EC4899" stroke-width="3"/>
                  <line x1="8" y1="-10" x2="8" y2="10" stroke="#EC4899" stroke-width="3"/>
                </g>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RLC Circuit Resonance
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore RLC circuits at resonant frequency with frequency response visualization.
              </p>
              <NuxtLink 
                to="/simulations/rlc-resonance" 
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Transformer Basics -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="70" y="45" width="60" height="30" fill="none" stroke="#92400E" stroke-width="3" rx="5"/>
                <g transform="translate(75, 60)">
                  <path d="M0,-10 Q4,-8, 4,-6 Q4,-4, 0,-2 Q-4,0, -4,2 Q-4,4, 0,6 Q4,8, 4,10" fill="none" stroke="#F59E0B" stroke-width="2"/>
                  <path d="M12,-10 Q16,-8, 16,-6 Q16,-4, 12,-2 Q8,0, 8,2 Q8,4, 12,6 Q16,8, 16,10" fill="none" stroke="#F59E0B" stroke-width="2"/>
                </g>
                <g transform="translate(110, 60)">
                  <path d="M0,-10 Q4,-8, 4,-6 Q4,-4, 0,-2 Q-4,0, -4,2 Q-4,4, 0,6 Q4,8, 4,10" fill="none" stroke="#3B82F6" stroke-width="2"/>
                  <path d="M12,-10 Q16,-8, 16,-6 Q16,-4, 12,-2 Q8,0, 8,2 Q8,4, 12,6 Q16,8, 16,10" fill="none" stroke="#3B82F6" stroke-width="2"/>
                </g>
                <rect x="155" y="55" width="20" height="10" fill="white" stroke="#EF4444" stroke-width="2" rx="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Transformer Basics
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how transformers change voltage levels with turns ratio visualization.
              </p>
              <NuxtLink
                to="/simulations/transformer-basics"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Transistor Switch -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="50" y="35" width="40" height="10" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <g transform="translate(130, 60)">
                  <rect x="-10" y="-15" width="8" height="30" fill="#4B5563" stroke="#1F2937" stroke-width="2"/>
                  <line x1="-20" y1="0" x2="-10" y2="0" stroke="#94A3B8" stroke-width="2"/>
                  <line x1="-2" y1="-10" x2="15" y2="-25" stroke="#94A3B8" stroke-width="2"/>
                  <line x1="-2" y1="10" x2="15" y2="25" stroke="#94A3B8" stroke-width="2"/>
                  <polygon points="10,20 20,28 15,13" fill="none" stroke="#22C55E" stroke-width="2"/>
                </g>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Transistor Switch
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how NPN transistors work as electronic switches with interactive visualization.
              </p>
              <NuxtLink
                to="/simulations/transistor-switch"
                class="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Diode Rectifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="20" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <path d="M 50 145 Q 55 140, 60 145 Q 65 150, 70 145" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <g transform="translate(70, 60)">
                  <polygon points="0,-12 10,0 0,12" fill="none" stroke="#22C55E" stroke-width="2.5"/>
                  <line x1="10" y1="-12" x2="10" y2="12" stroke="#22C55E" stroke-width="2.5"/>
                </g>
                <rect x="120" y="55" width="25" height="10" fill="white" stroke="#EF4444" stroke-width="2" rx="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Diode Rectifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn AC to DC conversion with half-wave and full-wave rectification.
              </p>
              <NuxtLink
                to="/simulations/diode-rectifier"
                class="inline-flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- 555 Timer Astable -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <rect x="70" y="35" width="60" height="50" fill="#1F2937" stroke="#4B5563" stroke-width="2" rx="4"/>
                <text x="100" y="58" text-anchor="middle" fill="white" font-size="9" font-weight="bold">555</text>
                <circle cx="85" cy="70" r="3" fill="#FBBF24"/>
                <circle cx="115" cy="70" r="3" fill="#3B82F6"/>
                <rect x="50" y="52" width="15" height="6" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="1"/>
                <rect x="135" y="52" width="15" height="6" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="1"/>
                <path d="M160,45 L170,55 L160,65" fill="none" stroke="#8B5CF6" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                555 Timer Astable
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Generate square waves and pulses with the legendary 555 timer IC.
              </p>
              <NuxtLink
                to="/simulations/timer-555-astable"
                class="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- 555 Timer Monostable -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="40" x2="180" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="80" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="40" x2="20" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="180" y1="40" x2="180" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <rect x="70" y="35" width="60" height="50" fill="#1F2937" stroke="#4B5563" stroke-width="2" rx="4"/>
                <text x="100" y="58" text-anchor="middle" fill="white" font-size="9" font-weight="bold">555</text>
                <text x="100" y="72" text-anchor="middle" fill="#9CA3AF" font-size="6">Mono</text>
                <rect x="35" y="52" width="20" height="8" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" rx="2"/>
                <text x="45" y="58" text-anchor="middle" fill="#B45309" font-size="5" font-weight="bold">TRIG</text>
                <rect x="140" y="47" width="8" height="26" fill="#22C55E" stroke="#16A34A" stroke-width="1.5" rx="1"/>
                <text x="144" y="63" text-anchor="middle" fill="white" font-size="5" font-weight="bold">LED</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                555 Timer Monostable
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Generate precise single pulses for timing and delay applications.
              </p>
              <NuxtLink
                to="/simulations/timer-555-monostable"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Op-Amp Amplifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <polygon points="80,40 80,80 140,60" fill="white" stroke="#0891B2" stroke-width="2"/>
                <text x="85" y="55" text-anchor="middle" fill="#0891B2" font-size="8" font-weight="bold">-</text>
                <text x="85" y="70" text-anchor="middle" fill="#0891B2" font-size="8" font-weight="bold">+</text>
                <line x1="40" y1="50" x2="80" y2="50" stroke="#94A3B8" stroke-width="2"/>
                <line x1="40" y1="70" x2="80" y2="70" stroke="#94A3B8" stroke-width="2"/>
                <line x1="140" y1="60" x2="180" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <rect x="45" y="47" width="20" height="6" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="1"/>
                <rect x="115" y="30" width="6" height="20" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="1"/>
                <text x="100" y="55" text-anchor="middle" fill="#EF4444" font-size="6">+</text>
                <text x="100" y="70" text-anchor="middle" fill="#3B82F6" font-size="6">-</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Op-Amp Amplifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore inverting and non-inverting amplifier configurations with real-time gain calculation.
              </p>
              <NuxtLink
                to="/simulations/op-amp-amplifier"
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- MOSFET Switching -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="100" y1="20" x2="100" y2="35" stroke="#94A3B8" stroke-width="2"/>
                <line x1="100" y1="55" x2="100" y2="65" stroke="#94A3B8" stroke-width="2"/>
                <line x1="100" y1="85" x2="100" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="35" stroke="#94A3B8" stroke-width="2"/>
                <rect x="30" y="35" width="40" height="30" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="30" y1="65" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <g transform="translate(100, 50)">
                  <line x1="0" y1="0" x2="0" y2="35" stroke="#374151" stroke-width="2"/>
                  <line x1="-15" y1="5" x2="-15" y2="30" stroke="#374151" stroke-width="2"/>
                  <line x1="10" y1="5" x2="10" y2="30" stroke="#374151" stroke-width="2" stroke-dasharray="3,2"/>
                  <line x1="-25" y1="10" x2="-15" y2="10" stroke="#374151" stroke-width="2"/>
                  <line x1="10" y1="10" x2="20" y2="10" stroke="#374151" stroke-width="2"/>
                  <line x1="20" y1="10" x2="20" y2="20" stroke="#374151" stroke-width="2"/>
                  <polygon points="15,20 25,20 20,25" fill="#374151"/>
                </g>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                MOSFET Switching
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how MOSFETs work as voltage-controlled switches for power electronics applications.
              </p>
              <NuxtLink
                to="/simulations/mosfet-switching"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Wien Bridge Oscillator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <polygon points="70,40 70,80 130,60" fill="white" stroke="#9333EA" stroke-width="2"/>
                <text x="75" y="55" text-anchor="middle" fill="#9333EA" font-size="6" font-weight="bold">-</text>
                <text x="75" y="70" text-anchor="middle" fill="#9333EA" font-size="6" font-weight="bold">+</text>
                <line x1="30" y1="50" x2="70" y2="50" stroke="#94A3B8" stroke-width="2"/>
                <line x1="30" y1="70" x2="70" y2="70" stroke="#94A3B8" stroke-width="2"/>
                <line x1="130" y1="60" x2="170" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <rect x="40" y="47" width="15" height="6" fill="white" stroke="#0891B2" stroke-width="1.5" rx="1"/>
                <rect x="40" y="67" width="15" height="6" fill="white" stroke="#0891B2" stroke-width="1.5" rx="1"/>
                <path d="M145,50 Q155,55, 145,60 Q135,65, 145,70" fill="none" stroke="#EC4899" stroke-width="2"/>
                <rect x="135" y="47" width="20" height="6" fill="white" stroke="#10B981" stroke-width="1.5" rx="1"/>
                <path d="M40,85 L60,85 M60,85 L60,95 M60,95 L40,95" stroke="#9333EA" stroke-width="1.5" fill="none"/>
                <circle cx="50" cy="90" r="8" fill="none" stroke="#9333EA" stroke-width="1.5"/>
                <line x1="50" y1="82" x2="50" y2="98" stroke="#9333EA" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Wien Bridge Oscillator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Generate pure sinusoidal waves with feedback circuit analysis and frequency response visualization.
              </p>
              <NuxtLink
                to="/simulations/wien-bridge-oscillator"
                class="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Buck Converter -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="40" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <rect x="80" y="45" width="15" height="15" fill="white" stroke="#10B981" stroke-width="2" rx="2"/>
                <path d="M 110 30 Q 118 25, 126 30 Q 134 35, 142 30 Q 150 25, 158 30" fill="none" stroke="#8B5CF6" stroke-width="3"/>
                <line x1="80" y1="60" x2="80" y2="75" stroke="#94A3B8" stroke-width="2"/>
                <line x1="80" y1="60" x2="80" y2="45" stroke="#94A3B8" stroke-width="2"/>
                <polygon points="75,80 85,85 80,90" fill="none" stroke="#EF4444" stroke-width="2"/>
                <rect x="140" y="55" width="20" height="30" fill="#4B5563" stroke="#1F2937" stroke-width="2" rx="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Buck Converter
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Step-down DC-DC converter with duty cycle control and output voltage regulation.
              </p>
              <NuxtLink
                to="/simulations/buck-converter"
                class="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Boost Converter -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="40" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <path d="M 70 30 Q 78 25, 86 30 Q 94 35, 102 30 Q 110 25, 118 30" fill="none" stroke="#8B5CF6" stroke-width="3"/>
                <rect x="130" y="45" width="15" height="30" fill="#4B5563" stroke="#1F2937" stroke-width="2" rx="2"/>
                <polygon points="155,45 165,60 155,75" fill="none" stroke="#22C55E" stroke-width="2"/>
                <line x1="165" y1="45" x2="165" y2="75" stroke="#22C55E" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Boost Converter
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Step-up DC-DC converter using inductive energy storage with duty cycle control.
              </p>
              <NuxtLink
                to="/simulations/boost-converter"
                class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Half-Bridge Motor Driver -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="100" cy="60" r="25" fill="white" stroke="#059669" stroke-width="2"/>
                <text x="100" y="55" text-anchor="middle" fill="#059669" font-size="10" font-weight="bold">M</text>
                <rect x="50" y="30" width="12" height="15" fill="white" stroke="#F59E0B" stroke-width="2" rx="2"/>
                <rect x="138" y="30" width="12" height="15" fill="white" stroke="#F59E0B" stroke-width="2" rx="2"/>
                <rect x="50" y="75" width="12" height="15" fill="white" stroke="#3B82F6" stroke-width="2" rx="2"/>
                <rect x="138" y="75" width="12" height="15" fill="white" stroke="#3B82F6" stroke-width="2" rx="2"/>
                <line x1="56" y1="45" x2="56" y2="55" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="144" y1="45" x2="144" y2="55" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="56" y1="90" x2="56" y2="100" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="144" y1="90" x2="144" y2="100" stroke="#8B5CF6" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Half-Bridge Motor Driver
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                H-bridge motor control with PWM speed control, direction switching, and real-time waveforms.
              </p>
              <NuxtLink
                to="/simulations/half-bridge-motor-driver"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- AC Circuit Analysis -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <path d="M 40 60 Q 60 30, 80 60 Q 100 90, 120 60" fill="none" stroke="#3B82F6" stroke-width="3"/>
                <path d="M 40 60 Q 60 90, 80 60 Q 100 30, 120 60" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="4"/>
                <circle cx="30" cy="60" r="15" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="30" y="64" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">AC</text>
                <rect x="140" y="45" width="20" height="30" fill="white" stroke="#8B5CF6" stroke-width="2" rx="2"/>
                <text x="150" y="65" text-anchor="middle" fill="#8B5CF6" font-size="8" font-weight="bold">R</text>
                <path d="M 155 30 Q 160 25, 165 30 Q 170 35, 175 30" fill="none" stroke="#22C55E" stroke-width="2"/>
                <line x1="150" y1="20" x2="150" y2="30" stroke="#22C55E" stroke-width="2"/>
                <line x1="150" y1="75" x2="150" y2="90" stroke="#94A3B8" stroke-width="2"/>
                <line x1="45" y1="60" x2="140" y2="60" stroke="#94A3B8" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AC Circuit Analysis
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore alternating current circuits with real-time waveform visualization, impedance analysis, and phasor diagrams.
              </p>
              <NuxtLink
                to="/simulations/ac-circuit"
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Differential Amplifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <polygon points="80,30 80,90 140,60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="90" y="55" text-anchor="middle" fill="#8B5CF6" font-size="10" font-weight="bold">-</text>
                <text x="90" y="70" text-anchor="middle" fill="#8B5CF6" font-size="10" font-weight="bold">+</text>
                <line x1="30" y1="45" x2="80" y2="45" stroke="#EF4444" stroke-width="2"/>
                <line x1="30" y1="75" x2="80" y2="75" stroke="#22C55E" stroke-width="2"/>
                <circle cx="25" cy="45" r="8" fill="#EF4444"/>
                <circle cx="25" cy="75" r="8" fill="#22C55E"/>
                <line x1="140" y1="60" x2="180" y2="60" stroke="#8B5CF6" stroke-width="3"/>
                <circle cx="185" cy="60" r="8" fill="#8B5CF6"/>
                <rect x="90" y="20" width="30" height="10" fill="white" stroke="#3B82F6" stroke-width="2" rx="2"/>
                <text x="105" y="18" text-anchor="middle" fill="#3B82F6" font-size="8">Rf</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Differential Amplifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how differential amplifiers work with interactive visualization of input/output signals and CMRR.
              </p>
              <NuxtLink
                to="/simulations/differential-amplifier"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

        </div>

        <!-- Tips Section -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            💡 How to Use These Simulators
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Adjust Parameters</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Use sliders to change voltage, resistance, and other values</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Observe Changes</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Watch real-time updates in circuit diagrams and calculations</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Add/Remove Components</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Experiment with different circuit configurations</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">4</div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">Learn the Theory</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Read explanations below each simulator for deeper understanding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
import Footer from '~/components/Footer.vue'

// SEO
useHead({
  title: 'Circuit Simulations - Cyno Electric',
  meta: [
    { name: 'description', content: 'Interactive electrical circuit simulators. Explore series and parallel circuits with real-time visualization.' },
    { name: 'keywords', content: 'circuit simulator, series circuit, parallel circuit, electrical simulation' }
  ]
})
</script>

<style scoped>
.simulation-card {
  transition: all 0.3s ease;
}

.simulation-card:hover {
  transform: translateY(-4px);
}
</style>

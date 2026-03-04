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

          <!-- Darlington Pair -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="20" x2="180" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <!-- Q1 -->
                <g transform="translate(60, 60)">
                  <circle cx="0" cy="0" r="18" fill="white" stroke="#7C3AED" stroke-width="2"/>
                  <line x1="-5" y1="-8" x2="-5" y2="8" stroke="#333" stroke-width="2"/>
                  <line x1="-5" y1="-4" x2="6" y2="-12" stroke="#333" stroke-width="2"/>
                  <line x1="-5" y1="4" x2="6" y2="12" stroke="#333" stroke-width="2"/>
                  <polygon points="3,-10 6,-12 6,-8" fill="#333"/>
                  <polygon points="3,10 6,12 6,8" fill="#333"/>
                </g>
                <!-- Q2 -->
                <g transform="translate(130, 60)">
                  <circle cx="0" cy="0" r="18" fill="white" stroke="#7C3AED" stroke-width="2"/>
                  <line x1="-5" y1="-8" x2="-5" y2="8" stroke="#333" stroke-width="2"/>
                  <line x1="-5" y1="-4" x2="6" y2="-12" stroke="#333" stroke-width="2"/>
                  <line x1="-5" y1="4" x2="6" y2="12" stroke="#333" stroke-width="2"/>
                  <polygon points="3,-10 6,-12 6,-8" fill="#333"/>
                  <polygon points="3,10 6,12 6,8" fill="#333"/>
                </g>
                <!-- Connection -->
                <line x1="78" y1="60" x2="112" y2="60" stroke="#F59E0B" stroke-width="2"/>
                <!-- VCC and GND -->
                <line x1="60" y1="20" x2="60" y2="42" stroke="#EF4444" stroke-width="2"/>
                <line x1="130" y1="20" x2="130" y2="42" stroke="#EF4444" stroke-width="2"/>
                <line x1="130" y1="78" x2="130" y2="100" stroke="#22C55E" stroke-width="2"/>
                <!-- Input -->
                <circle cx="20" cy="60" r="10" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <line x1="30" y1="60" x2="42" y2="60" stroke="#3B82F6" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Darlington Pair
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore high-gain transistor cascading. Learn how two transistors provide massive current amplification.
              </p>
              <NuxtLink
                to="/simulations/darlington-pair"
                class="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Joule Thief Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <rect x="20" y="50" width="30" height="20" fill="white" stroke="#EF4444" stroke-width="2" rx="2"/>
                <text x="35" y="64" text-anchor="middle" font-size="10" fill="#EF4444">BAT</text>
                <ellipse cx="100" cy="60" rx="25" ry="15" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <ellipse cx="100" cy="60" rx="18" ry="10" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <circle cx="150" cy="60" r="12" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="150" y="64" text-anchor="middle" font-size="8" fill="#8B5CF6">Q1</text>
                <polygon points="175,50 185,60 175,70" fill="#EF4444" stroke="#EF4444" stroke-width="2"/>
                <line x1="185" y1="60" x2="195" y2="55" stroke="#EF4444" stroke-width="2"/>
                <line x1="185" y1="60" x2="195" y2="65" stroke="#EF4444" stroke-width="2"/>
                <line x1="50" y1="60" x2="75" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <line x1="125" y1="60" x2="138" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <line x1="162" y1="60" x2="175" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <circle cx="5" cy="60" r="3" fill="#FBBF24"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Joule Thief Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Extract energy from "dead" batteries! Learn about self-oscillating circuits and voltage boost techniques.
              </p>
              <NuxtLink
                to="/simulations/joule-thief-circuit"
                class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
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

          <!-- Phase Angle Control -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <path d="M 30 60 Q 55 30, 80 60 Q 105 90, 130 60 T 180 60" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <path d="M 30 60 Q 55 30, 80 60" fill="none" stroke="#F59E0B" stroke-width="3"/>
                <path d="M 80 60 Q 105 90, 130 60 T 180 60" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="4"/>
                <line x1="80" y1="20" x2="80" y2="100" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4"/>
                <circle cx="80" cy="60" r="4" fill="#F59E0B"/>
                <text x="80" y="15" text-anchor="middle" fill="#F59E0B" font-size="10" font-weight="bold">α</text>
                <rect x="90" y="50" width="20" height="20" fill="white" stroke="#10B981" stroke-width="2" rx="2"/>
                <text x="100" y="64" text-anchor="middle" fill="#10B981" font-size="8" font-weight="bold">SCR</text>
                <line x1="30" y1="90" x2="180" y2="90" stroke="#94A3B8" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Phase Angle Control
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                SCR/Triac-based AC power control with adjustable firing angle, real-time waveforms, and load type analysis.
              </p>
              <NuxtLink
                to="/simulations/phase-angle-control"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
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

          <!-- Electromagnetic Induction -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="30" y1="20" x2="170" y2="20" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="100" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="20" x2="30" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="20" x2="170" y2="100" stroke="#94A3B8" stroke-width="3"/>
                <ellipse cx="70" cy="60" rx="40" ry="25" fill="none" stroke="#9FA8DA" stroke-width="3"/>
                <ellipse cx="70" cy="60" rx="30" ry="18" fill="none" stroke="#7986CB" stroke-width="2"/>
                <ellipse cx="70" cy="60" rx="20" ry="12" fill="none" stroke="#9FA8DA" stroke-width="2"/>
                <rect x="120" y="45" width="15" height="30" fill="#ef4444"/>
                <rect x="135" y="45" width="15" height="30" fill="#3b82f6"/>
                <text x="112" y="63" fill="white" font-size="7" font-weight="bold">N</text>
                <text x="142" y="63" fill="white" font-size="7" font-weight="bold">S</text>
                <path d="M 155 40 Q 165 35, 175 40 Q 185 45, 195 40" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,2"/>
                <path d="M 155 80 Q 165 85, 175 80 Q 185 75, 195 80" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Electromagnetic Induction
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore Faraday's Law and Lenz's Law with interactive visualizations of rotating coils and moving magnets.
              </p>
              <NuxtLink
                to="/simulations/electromagnetic-induction"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- PWM Generator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <line x1="20" y1="20" x2="180" y2="20" stroke="#94A3B8" stroke-width="2"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <line x1="20" y1="20" x2="20" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <line x1="180" y1="20" x2="180" y2="100" stroke="#94A3B8" stroke-width="2"/>
                <!-- PWM signal -->
                <path d="M 30 70 L 30 30 L 70 30 L 70 70 L 90 70 L 90 30 L 130 30 L 130 70 L 150 70 L 150 30 L 170 30" fill="none" stroke="#8B5CF6" stroke-width="3"/>
                <!-- Duty cycle indicator -->
                <line x1="30" y1="15" x2="70" y2="15" stroke="#EF4444" stroke-width="2"/>
                <line x1="30" y1="10" x2="30" y2="20" stroke="#EF4444" stroke-width="2"/>
                <line x1="70" y1="10" x2="70" y2="20" stroke="#EF4444" stroke-width="2"/>
                <text x="50" y="12" text-anchor="middle" fill="#EF4444" font-size="8">T_on</text>
                <!-- Frequency label -->
                <text x="100" y="113" text-anchor="middle" fill="#6B7280" font-size="8">Period (T)</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                PWM Generator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore Pulse Width Modulation signals and understand duty cycle, frequency, and applications.
              </p>
              <NuxtLink
                to="/simulations/pwm-generator"
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- LC Tank Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Tank circuit diagram -->
                <circle cx="50" cy="60" r="25" fill="none" stroke="#8B5CF6" stroke-width="2" opacity="0.6"/>
                <circle cx="150" cy="60" r="25" fill="none" stroke="#EC4899" stroke-width="2" opacity="0.6"/>
                <line x1="75" y1="60" x2="125" y2="60" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5"/>
                <text x="50" y="95" text-anchor="middle" fill="#8B5CF6" font-size="10" font-weight="bold">L</text>
                <text x="150" y="95" text-anchor="middle" fill="#EC4899" font-size="10" font-weight="bold">C</text>
                <text x="100" y="40" text-anchor="middle" fill="#10B981" font-size="8">Energy Flow</text>
                <!-- Coil representation -->
                <path d="M 40 55 Q 50 45, 60 55 Q 70 65, 80 55" fill="none" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Capacitor representation -->
                <line x1="140" y1="50" x2="140" y2="70" stroke="#EC4899" stroke-width="3"/>
                <line x1="160" y1="50" x2="160" y2="70" stroke="#EC4899" stroke-width="3"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                LC Tank Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Visualize energy oscillation between inductor and capacitor. Explore resonance, Q factor, and frequency response in parallel LC circuits.
              </p>
              <NuxtLink
                to="/simulations/lc-tank-circuit"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Diode Clipping Circuits -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Sine wave before clipping -->
                <path d="M 20 60 Q 40 30, 60 60 T 100 60" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4,2" opacity="0.6"/>
                <!-- Clipped waveform -->
                <path d="M 100 60 L 110 60 L 110 40 L 130 40 L 130 80 L 150 80 L 150 60 L 180 60" fill="none" stroke="#10B981" stroke-width="2.5"/>
                <!-- Diode symbol -->
                <polygon points="70,45 70,75 90,60" fill="white" stroke="#EF4444" stroke-width="2"/>
                <line x1="90" y1="45" x2="90" y2="75" stroke="#EF4444" stroke-width="2"/>
                <!-- Clip level indicator -->
                <line x1="100" y1="40" x2="180" y2="40" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
                <text x="60" y="30" fill="#3B82F6" font-size="8" font-weight="bold">Input</text>
                <text x="150" y="30" fill="#10B981" font-size="8" font-weight="bold">Output</text>
                <text x="140" y="35" fill="#EF4444" font-size="7">Clip Level</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Diode Clipping Circuits
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore how diode clipping circuits modify waveforms by removing portions above or below threshold levels. Learn series, parallel, and double-ended clippers.
              </p>
              <NuxtLink
                to="/simulations/diode-clipping"
                class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Diode Clamper Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Input waveform (centered at 0) -->
                <path d="M 20 60 Q 35 35, 50 60 T 80 60" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4,2" opacity="0.6"/>
                <!-- Output waveform (shifted up - positive clamper) -->
                <path d="M 100 35 L 100 50 Q 115 25, 130 50 T 160 50 L 160 35" fill="none" stroke="#10B981" stroke-width="2.5"/>
                <!-- Capacitor symbol -->
                <line x1="55" y1="55" x2="55" y2="65" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="48" y1="60" x2="62" y2="60" stroke="#9FA8DA" stroke-width="2"/>
                <line x1="48" y1="63" x2="62" y2="63" stroke="#9FA8DA" stroke-width="2"/>
                <!-- Diode symbol -->
                <polygon points="70,50 70,70 85,60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="85" y1="50" x2="85" y2="70" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Clamping level indicator -->
                <line x1="100" y1="50" x2="180" y2="50" stroke="#EF4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/>
                <text x="55" y="30" fill="#3B82F6" font-size="8" font-weight="bold">Input</text>
                <text x="140" y="30" fill="#10B981" font-size="8" font-weight="bold">Output</text>
                <text x="135" y="45" fill="#EF4444" font-size="7">Clamp Level</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Diode Clamper Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how clamper circuits shift DC levels of AC signals. Explore positive and negative clampers with adjustable capacitance, resistance, and diode types.
              </p>
              <NuxtLink
                to="/simulations/diode-clamper"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Voltage Multiplier Circuit -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Input AC waveform -->
                <path d="M 20 60 Q 30 40, 40 60 T 60 60" fill="none" stroke="#3B82F6" stroke-width="2" opacity="0.6"/>
                <!-- Diodes -->
                <polygon points="70,50 70,70 85,60" fill="white" stroke="#22C55E" stroke-width="1.5"/>
                <line x1="85" y1="50" x2="85" y2="70" stroke="#22C55E" stroke-width="1.5"/>
                <polygon points="70,85 70,105 85,95" fill="white" stroke="#22C55E" stroke-width="1.5"/>
                <line x1="85" y1="85" x2="85" y2="105" stroke="#22C55E" stroke-width="1.5"/>
                <!-- Capacitors -->
                <line x1="105" y1="55" x2="105" y2="65" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="95" y1="60" x2="115" y2="60" stroke="#F59E0B" stroke-width="2"/>
                <line x1="95" y1="65" x2="115" y2="65" stroke="#F59E0B" stroke-width="2"/>
                <line x1="105" y1="65" x2="105" y2="80" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="105" y1="85" x2="105" y2="95" stroke="#9CA3AF" stroke-width="2"/>
                <line x1="95" y1="90" x2="115" y2="90" stroke="#F59E0B" stroke-width="2"/>
                <line x1="95" y1="95" x2="115" y2="95" stroke="#F59E0B" stroke-width="2"/>
                <!-- Output DC level -->
                <line x1="125" y1="60" x2="180" y2="60" stroke="#EF4444" stroke-width="2.5"/>
                <text x="40" y="35" fill="#3B82F6" font-size="8" font-weight="bold">AC In</text>
                <text x="100" y="45" fill="#22C55E" font-size="7">D1</text>
                <text x="100" y="118" fill="#22C55E" font-size="7">D2</text>
                <text x="150" y="55" fill="#EF4444" font-size="9" font-weight="bold">2×V</text>
                <text x="155" y="80" fill="#10B981" font-size="8">DC Out</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Voltage Multiplier Circuit
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Convert AC to higher DC voltages using capacitors and diodes. Explore half-wave rectifiers and voltage doublers with real-time visualization.
              </p>
              <NuxtLink
                to="/simulations/voltage-multiplier"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Crystal Oscillator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Crystal symbol -->
                <rect x="85" y="40" width="30" height="40" fill="white" stroke="#0891B2" stroke-width="2" rx="3"/>
                <line x1="100" y1="40" x2="100" y2="30" stroke="#0891B2" stroke-width="2"/>
                <line x1="100" y1="80" x2="100" y2="90" stroke="#0891B2" stroke-width="2"/>
                <!-- Electrodes -->
                <line x1="90" y1="45" x2="110" y2="45" stroke="#0891B2" stroke-width="1" opacity="0.5"/>
                <line x1="90" y1="55" x2="110" y2="55" stroke="#0891B2" stroke-width="1" opacity="0.5"/>
                <line x1="90" y1="65" x2="110" y2="65" stroke="#0891B2" stroke-width="1" opacity="0.5"/>
                <line x1="90" y1="75" x2="110" y2="75" stroke="#0891B2" stroke-width="1" opacity="0.5"/>
                <!-- Output waveform -->
                <path d="M 130 60 Q 140 40, 150 60 Q 160 80, 170 60" fill="none" stroke="#8B5CF6" stroke-width="2.5"/>
                <circle cx="175" cy="60" r="3" fill="#8B5CF6"/>
                <!-- Circuit connection -->
                <line x1="30" y1="60" x2="85" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <line x1="115" y1="60" x2="130" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <!-- Labels -->
                <text x="100" y="25" text-anchor="middle" fill="#0891B2" font-size="9" font-weight="bold">Crystal</text>
                <text x="150" y="95" text-anchor="middle" fill="#8B5CF6" font-size="8">Output</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Crystal Oscillator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore piezoelectric crystal oscillators for precise frequency generation. Learn about equivalent circuits, resonance modes, and temperature effects.
              </p>
              <NuxtLink
                to="/simulations/crystal-oscillator"
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- RC Phase Shift Oscillator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Amplifier triangle -->
                <polygon points="30,50 30,70 60,60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <text x="35" y="58" text-anchor="middle" fill="#8B5CF6" font-size="6" font-weight="bold">-</text>
                <!-- RC stages -->
                <line x1="60" y1="60" x2="80" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <circle cx="80" cy="60" r="3" fill="#F59E0B"/>
                <rect x="80" y="45" width="4" height="8" fill="white" stroke="#3B82F6" stroke-width="1.5"/>
                <line x1="82" y1="53" x2="82" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="80" y1="58" x2="84" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="84" y1="58" x2="84" y2="53" stroke="#94A3B8" stroke-width="1.5"/>
                <circle cx="84" cy="60" r="3" fill="#F59E0B"/>
                <!-- Stage 2 -->
                <line x1="84" y1="60" x2="105" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <circle cx="105" cy="60" r="3" fill="#F59E0B"/>
                <rect x="105" y="45" width="4" height="8" fill="white" stroke="#3B82F6" stroke-width="1.5"/>
                <line x1="107" y1="53" x2="107" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="105" y1="58" x2="109" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="109" y1="58" x2="109" y2="53" stroke="#94A3B8" stroke-width="1.5"/>
                <circle cx="109" cy="60" r="3" fill="#F59E0B"/>
                <!-- Stage 3 -->
                <line x1="109" y1="60" x2="130" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <circle cx="130" cy="60" r="3" fill="#F59E0B"/>
                <rect x="130" y="45" width="4" height="8" fill="white" stroke="#3B82F6" stroke-width="1.5"/>
                <line x1="132" y1="53" x2="132" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="130" y1="58" x2="134" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
                <line x1="134" y1="58" x2="134" y2="53" stroke="#94A3B8" stroke-width="1.5"/>
                <circle cx="134" cy="60" r="3" fill="#F59E0B"/>
                <!-- Feedback path -->
                <line x1="134" y1="60" x2="160" y2="60" stroke="#F59E0B" stroke-width="2"/>
                <line x1="160" y1="60" x2="160" y2="80" stroke="#94A3B8" stroke-width="2"/>
                <line x1="160" y1="80" x2="20" y2="80" stroke="#94A3B8" stroke-width="2"/>
                <line x1="20" y1="80" x2="20" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <line x1="20" y1="60" x2="30" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <!-- Phase shift arrows -->
                <text x="85" y="40" text-anchor="middle" fill="#EC4899" font-size="8">60°</text>
                <text x="110" y="40" text-anchor="middle" fill="#EC4899" font-size="8">60°</text>
                <text x="135" y="40" text-anchor="middle" fill="#EC4899" font-size="8">60°</text>
                <!-- Output -->
                <text x="170" y="58" text-anchor="middle" fill="#10B981" font-size="9" font-weight="bold">180°</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RC Phase Shift Oscillator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how cascaded RC networks create 180° phase shift for oscillation. Visualize phase response and understand gain requirements.
              </p>
              <NuxtLink
                to="/simulations/rc-phase-shift-oscillator"
                class="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Op-Amp Integrator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Op-amp triangle -->
                <polygon points="80,40 80,80 130,60" fill="white" stroke="#EC4899" stroke-width="2"/>
                <text x="88" y="55" text-anchor="middle" fill="#EC4899" font-size="8" font-weight="bold">-</text>
                <text x="88" y="70" text-anchor="middle" fill="#EC4899" font-size="8" font-weight="bold">+</text>
                <!-- Input resistor -->
                <line x1="30" y1="50" x2="80" y2="50" stroke="#94A3B8" stroke-width="2"/>
                <rect x="45" y="47" width="20" height="6" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="1"/>
                <!-- Feedback capacitor -->
                <line x1="70" y1="50" x2="70" y2="30" stroke="#94A3B8" stroke-width="2"/>
                <line x1="70" y1="30" x2="90" y2="30" stroke="#94A3B8" stroke-width="2"/>
                <line x1="90" y1="25" x2="90" y2="35" stroke="#F59E0B" stroke-width="3"/>
                <line x1="100" y1="25" x2="100" y2="35" stroke="#F59E0B" stroke-width="3"/>
                <line x1="100" y1="30" x2="120" y2="30" stroke="#94A3B8" stroke-width="2"/>
                <line x1="120" y1="30" x2="120" y2="60" stroke="#94A3B8" stroke-width="2"/>
                <!-- Non-inverting input to ground -->
                <line x1="80" y1="70" x2="60" y2="70" stroke="#94A3B8" stroke-width="2"/>
                <line x1="60" y1="70" x2="60" y2="85" stroke="#94A3B8" stroke-width="2"/>
                <line x1="55" y1="85" x2="65" y2="85" stroke="#94A3B8" stroke-width="2"/>
                <line x1="57" y1="88" x2="63" y2="88" stroke="#94A3B8" stroke-width="2"/>
                <!-- Output -->
                <line x1="130" y1="60" x2="180" y2="60" stroke="#EC4899" stroke-width="2.5"/>
                <!-- Input and output waveforms -->
                <path d="M 25 95 Q 35 85, 45 95 T 65 95" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="3,2"/>
                <path d="M 135 95 Q 145 75, 155 95 Q 165 115, 175 95" fill="none" stroke="#EC4899" stroke-width="2"/>
                <text x="45" y="110" text-anchor="middle" fill="#3B82F6" font-size="7">Input</text>
                <text x="155" y="110" text-anchor="middle" fill="#EC4899" font-size="7">∫ Output</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Op-Amp Integrator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore op-amp integrator circuits with real-time visualization. Watch square waves integrate to triangles and learn about time constants.
              </p>
              <NuxtLink
                to="/simulations/op-amp-integrator"
                class="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Op-Amp Differentiator -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Op-amp triangle -->
                <path d="M 70 30 L 70 90 L 130 60 Z" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Input capacitor -->
                <line x1="20" y1="45" x2="50" y2="45" stroke="#10B981" stroke-width="2"/>
                <line x1="50" y1="38" x2="50" y2="52" stroke="#10B981" stroke-width="2"/>
                <line x1="55" y1="38" x2="55" y2="52" stroke="#10B981" stroke-width="2"/>
                <line x1="55" y1="45" x2="70" y2="45" stroke="#10B981" stroke-width="2"/>
                <!-- Feedback resistor -->
                <path d="M 70 45 L 85 45 L 90 40 L 80 50 L 90 60 L 80 70 L 85 75 L 70 75" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <!-- Output -->
                <line x1="130" y1="60" x2="170" y2="60" stroke="#EF4444" stroke-width="2"/>
                <!-- Ground -->
                <line x1="70" y1="75" x2="55" y2="75" stroke="#6B7280" stroke-width="2"/>
                <line x1="45" y1="75" x2="65" y2="75" stroke="#6B7280" stroke-width="2"/>
                <line x1="50" y1="78" x2="60" y2="78" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="53" y1="81" x2="57" y2="81" stroke="#6B7280" stroke-width="1.5"/>
                <!-- Labels -->
                <text x="20" y="30" text-anchor="middle" fill="#10B981" font-size="6" font-weight="bold">Vin</text>
                <text x="170" y="50" text-anchor="middle" fill="#EF4444" font-size="6" font-weight="bold">Vout</text>
                <text x="52" y="32" text-anchor="middle" fill="#10B981" font-size="5">Cin</text>
                <text x="85" y="32" text-anchor="middle" fill="#F59E0B" font-size="5">Rf</text>
                <!-- Waveforms hint -->
                <text x="145" y="48" fill="#8B5CF6" font-size="5">d/dt</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Op-Amp Differentiator
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore op-amp differentiator circuits computing the time derivative of input signals. Watch ramps become DC and sines become cosines.
              </p>
              <NuxtLink
                to="/simulations/op-amp-differentiator"
                class="inline-flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Common Emitter Amplifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- VCC line -->
                <line x1="100" y1="10" x2="100" y2="25" stroke="#EF4444" stroke-width="2"/>
                <circle cx="100" cy="8" r="6" fill="white" stroke="#EF4444" stroke-width="1.5"/>
                <text x="100" y="11" text-anchor="middle" fill="#EF4444" font-size="5" font-weight="bold">VCC</text>
                <!-- RC resistor -->
                <rect x="95" y="25" width="10" height="20" fill="white" stroke="#3B82F6" stroke-width="1.5"/>
                <!-- Wire to collector -->
                <line x1="100" y1="45" x2="100" y2="52" stroke="#6B7280" stroke-width="2"/>
                <!-- NPN transistor -->
                <g transform="translate(100, 65)">
                  <line x1="-12" y1="0" x2="-4" y2="0" stroke="#6B7280" stroke-width="1.5"/>
                  <line x1="-4" y1="-8" x2="-4" y2="8" stroke="#10B981" stroke-width="2"/>
                  <line x1="-4" y1="-5" x2="5" y2="-10" stroke="#10B981" stroke-width="1.5"/>
                  <line x1="5" y1="-10" x2="5" y2="-18" stroke="#6B7280" stroke-width="1.5"/>
                  <line x1="-4" y1="5" x2="5" y2="10" stroke="#10B981" stroke-width="1.5"/>
                  <line x1="5" y1="10" x2="5" y2="18" stroke="#6B7280" stroke-width="1.5"/>
                </g>
                <!-- RE resistor -->
                <rect x="95" y="83" width="10" height="15" fill="white" stroke="#8B5CF6" stroke-width="1.5"/>
                <!-- Ground -->
                <line x1="100" y1="98" x2="100" y2="105" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="95" y1="105" x2="105" y2="105" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="97" y1="108" x2="103" y2="108" stroke="#6B7280" stroke-width="1.5"/>
                <!-- Input -->
                <circle cx="60" cy="65" r="4" fill="white" stroke="#F59E0B" stroke-width="1.5"/>
                <line x1="40" y1="65" x2="56" y2="65" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="64" y1="65" x2="88" y2="65" stroke="#6B7280" stroke-width="1.5"/>
                <text x="35" y="68" text-anchor="middle" fill="#F59E0B" font-size="6">Vin</text>
                <!-- Output -->
                <circle cx="140" cy="55" r="4" fill="white" stroke="#EC4899" stroke-width="1.5"/>
                <line x1="105" y1="55" x2="136" y2="55" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="144" y1="55" x2="165" y2="55" stroke="#6B7280" stroke-width="1.5"/>
                <text x="160" y="58" text-anchor="middle" fill="#EC4899" font-size="6">Vout</text>
                <!-- Waveforms -->
                <path d="M 30 90 Q 40 82, 50 90 T 70 90" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2,1"/>
                <path d="M 130 90 Q 140 75, 150 90 Q 160 105, 170 90" fill="none" stroke="#EC4899" stroke-width="2"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Common Emitter Amplifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Classic BJT amplifier with real-time waveform visualization. Learn about voltage gain, phase inversion, and transistor biasing.
              </p>
              <NuxtLink
                to="/simulations/common-emitter-amplifier"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Common Collector Amplifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- VCC line -->
                <line x1="100" y1="10" x2="100" y2="25" stroke="#EF4444" stroke-width="2"/>
                <circle cx="100" cy="8" r="6" fill="white" stroke="#EF4444" stroke-width="1.5"/>
                <text x="100" y="11" text-anchor="middle" fill="#EF4444" font-size="5" font-weight="bold">VCC</text>
                <!-- Wire to collector (direct connection) -->
                <line x1="100" y1="25" x2="100" y2="52" stroke="#6B7280" stroke-width="2"/>
                <!-- NPN transistor -->
                <g transform="translate(100, 65)">
                  <line x1="-15" y1="0" x2="-4" y2="0" stroke="#6B7280" stroke-width="1.5"/>
                  <line x1="-4" y1="-8" x2="-4" y2="8" stroke="#14B8A6" stroke-width="2"/>
                  <line x1="-4" y1="-5" x2="5" y2="-10" stroke="#14B8A6" stroke-width="1.5"/>
                  <line x1="5" y1="-10" x2="5" y2="-18" stroke="#6B7280" stroke-width="1.5"/>
                  <line x1="-4" y1="5" x2="5" y2="10" stroke="#14B8A6" stroke-width="1.5"/>
                  <line x1="5" y1="10" x2="5" y2="18" stroke="#6B7280" stroke-width="1.5"/>
                  <!-- Emitter arrow pointing OUT -->
                  <polygon points="2,8 5,12 8,8" fill="#14B8A6"/>
                </g>
                <!-- RE resistor -->
                <rect x="95" y="83" width="10" height="15" fill="white" stroke="#06B6D4" stroke-width="1.5"/>
                <!-- Ground -->
                <line x1="100" y1="98" x2="100" y2="105" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="95" y1="105" x2="105" y2="105" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="97" y1="108" x2="103" y2="108" stroke="#6B7280" stroke-width="1.5"/>
                <!-- Input -->
                <circle cx="50" cy="65" r="4" fill="white" stroke="#F59E0B" stroke-width="1.5"/>
                <line x1="30" y1="65" x2="46" y2="65" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="54" y1="65" x2="85" y2="65" stroke="#6B7280" stroke-width="1.5"/>
                <text x="25" y="68" text-anchor="middle" fill="#F59E0B" font-size="6">Vin</text>
                <!-- Output (from emitter) -->
                <circle cx="150" cy="88" r="4" fill="white" stroke="#EC4899" stroke-width="1.5"/>
                <line x1="105" y1="88" x2="146" y2="88" stroke="#6B7280" stroke-width="1.5"/>
                <line x1="154" y1="88" x2="175" y2="88" stroke="#6B7280" stroke-width="1.5"/>
                <text x="170" y="91" text-anchor="middle" fill="#EC4899" font-size="6">Vout</text>
                <!-- Waveforms showing unity gain -->
                <path d="M 25 100 Q 35 95, 45 100 T 65 100" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <path d="M 125 100 Q 135 95, 145 100 T 165 100" fill="none" stroke="#EC4899" stroke-width="2"/>
                <text x="45" y="115" text-anchor="middle" fill="#F59E0B" font-size="6">Input</text>
                <text x="145" y="115" text-anchor="middle" fill="#EC4899" font-size="6">Output</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Common Collector Amplifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Emitter follower with unity voltage gain and high input impedance. Perfect for impedance matching and buffer applications.
              </p>
              <NuxtLink
                to="/simulations/common-collector-amplifier"
                class="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- RLC Damped Oscillation -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Damped sine wave -->
                <path d="M 20 60 Q 35 20, 50 60 Q 65 85, 80 60 Q 95 45, 110 60 Q 125 70, 140 60 Q 155 55, 170 60 Q 185 58, 200 60" 
                      fill="none" stroke="#22C55E" stroke-width="2.5"/>
                <!-- Envelope lines -->
                <path d="M 20 60 Q 50 30, 80 45 Q 110 52, 140 56 Q 170 58, 200 59" 
                      fill="none" stroke="#22C55E" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
                <path d="M 20 60 Q 50 90, 80 75 Q 110 68, 140 64 Q 170 62, 200 61" 
                      fill="none" stroke="#22C55E" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
                <!-- Axis -->
                <line x1="15" y1="60" x2="185" y2="60" stroke="#6B7280" stroke-width="1"/>
                <!-- Damping type indicators -->
                <circle cx="30" cy="25" r="5" fill="#22C55E"/>
                <text x="40" y="28" fill="#22C55E" font-size="8">Underdamped</text>
                <circle cx="100" cy="25" r="5" fill="#FACC15"/>
                <text x="110" y="28" fill="#FACC15" font-size="8">Critical</text>
                <circle cx="155" cy="25" r="5" fill="#F87171"/>
                <text x="165" y="28" fill="#F87171" font-size="8">Overdamped</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RLC Damped Oscillation
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Visualize underdamped, critically damped, and overdamped circuits with animated waveforms. Learn about damping ratio and natural frequency.
              </p>
              <NuxtLink
                to="/simulations/rlc-damped-oscillation"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Push-Pull Amplifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Output waveform -->
                <path d="M 30 60 L 50 60 L 60 30 L 80 30 L 90 60 L 110 60 L 120 90 L 140 90 L 150 60 L 170 60" 
                      fill="none" stroke="#F97316" stroke-width="2.5"/>
                <!-- Crossover distortion notch -->
                <circle cx="100" cy="60" r="3" fill="#EF4444"/>
                <text x="100" y="75" text-anchor="middle" fill="#EF4444" font-size="7">×-over</text>
                <!-- Axis -->
                <line x1="25" y1="60" x2="175" y2="60" stroke="#6B7280" stroke-width="1"/>
                <!-- Transistor symbols -->
                <rect x="20" y="10" width="20" height="15" fill="white" stroke="#3B82F6" stroke-width="1.5" rx="2"/>
                <text x="30" y="20" text-anchor="middle" fill="#3B82F6" font-size="7" font-weight="bold">NPN</text>
                <rect x="20" y="95" width="20" height="15" fill="white" stroke="#8B5CF6" stroke-width="1.5" rx="2"/>
                <text x="30" y="105" text-anchor="middle" fill="#8B5CF6" font-size="7" font-weight="bold">PNP</text>
                <!-- Efficiency badge -->
                <rect x="155" y="10" width="35" height="18" fill="#22C55E" rx="3"/>
                <text x="172.5" y="22" text-anchor="middle" fill="white" font-size="8" font-weight="bold">78.5%</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Push-Pull Amplifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Class B audio amplifier with real-time waveform visualization. Explore crossover distortion, bias effects, and efficiency.
              </p>
              <NuxtLink
                to="/simulations/push-pull-amplifier"
                class="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Inductive Kickback -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Voltage spike -->
                <path d="M 30 80 L 60 80 L 70 30 L 80 20 L 90 25 L 100 80 L 170 80" 
                      fill="none" stroke="#EF4444" stroke-width="2.5"/>
                <circle cx="80" cy="20" r="3" fill="#EF4444"/>
                <text x="80" y="12" text-anchor="middle" fill="#EF4444" font-size="9" font-weight="bold">SPIKE!</text>
                <!-- Inductor coil -->
                <path d="M 40 60 Q 50 55 60 60 Q 70 65 80 60" fill="none" stroke="#8B5CF6" stroke-width="2"/>
                <text x="60" y="75" text-anchor="middle" fill="#8B5CF6" font-size="7">L</text>
                <!-- Switch -->
                <line x1="100" y1="60" x2="120" y2="60" stroke="#6B7280" stroke-width="2"/>
                <circle cx="110" cy="60" r="3" fill="#F59E0B"/>
                <!-- Diode protection -->
                <path d="M 140 50 L 140 70" stroke="#10B981" stroke-width="2" stroke-dasharray="3,2"/>
                <circle cx="150" cy="50" r="8" fill="white" stroke="#10B981" stroke-width="1.5"/>
                <path d="M 146 47 L 154 47 L 146 53 L 154 53" fill="none" stroke="#10B981" stroke-width="1.5"/>
                <!-- Labels -->
                <text x="150" cy="105" text-anchor="middle" fill="#10B981" font-size="7">Protected</text>
                <text x="30" y="95" fill="#EF4444" font-size="7">No Protection</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Inductive Kickback
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Witness dangerous voltage spikes when switching inductive loads. Learn how flyback diodes protect your circuits from back EMF damage.
              </p>
              <NuxtLink
                to="/simulations/inductive-kickback"
                class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Schmitt Trigger -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Op-amp triangle -->
                <polygon points="80,30 80,90 140,60" fill="white" stroke="#22C55E" stroke-width="2"/>
                <!-- Input terminals -->
                <line x1="40" y1="45" x2="80" y2="45" stroke="#94A3B8" stroke-width="2"/>
                <line x1="40" y1="75" x2="80" y2="75" stroke="#94A3B8" stroke-width="2"/>
                <!-- Feedback path -->
                <line x1="140" y1="60" x2="170" y2="60" stroke="#22C55E" stroke-width="2"/>
                <line x1="170" y1="60" x2="170" y2="30" stroke="#22C55E" stroke-width="2"/>
                <line x1="170" y1="30" x2="100" y2="30" stroke="#22C55E" stroke-width="2"/>
                <line x1="100" y1="30" x2="100" y2="45" stroke="#22C55E" stroke-width="2"/>
                <!-- Hysteresis diagram -->
                <rect x="50" y="15" width="25" height="20" fill="white" stroke="#F59E0B" stroke-width="1"/>
                <path d="M 55,28 L 65,20 L 65,28" fill="none" stroke="#F59E0B" stroke-width="1"/>
                <!-- Labels -->
                <text x="100" y="25" fill="#22C55E" font-size="6">Hysteresis</text>
                <text x="85" y="55" fill="#3B82F6" font-size="6">-</text>
                <text x="85" y="80" fill="#3B82F6" font-size="6">+</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Schmitt Trigger
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore hysteresis and noise immunity in comparator circuits. Understand how positive feedback creates clean digital outputs from noisy analog signals.
              </p>
              <NuxtLink
                to="/simulations/schmitt-trigger"
                class="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Sallen-Key Filter -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Op-amp triangle -->
                <polygon points="100,30 100,90 160,60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Input -->
                <line x1="20" y1="50" x2="100" y2="50" stroke="#94A3B8" stroke-width="2"/>
                <!-- R1 -->
                <rect x="35" y="45" width="20" height="10" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <!-- C1 -->
                <line x1="65" y1="50" x2="65" y2="70" stroke="#94A3B8" stroke-width="2"/>
                <line x1="60" y1="70" x2="70" y2="70" stroke="#94A3B8" stroke-width="2"/>
                <line x1="60" y1="70" x2="60" y2="80" stroke="#94A3B8" stroke-width="2"/>
                <line x1="70" y1="70" x2="70" y2="80" stroke="#94A3B8" stroke-width="2"/>
                <!-- Output -->
                <line x1="160" y1="60" x2="190" y2="60" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Feedback network -->
                <line x1="160" y1="60" x2="175" y2="60" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="2,2"/>
                <line x1="175" y1="60" x2="175" y2="35" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="2,2"/>
                <line x1="175" y1="35" x2="65" y2="35" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="2,2"/>
                <line x1="65" y1="35" x2="65" y2="50" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="2,2"/>
                <!-- Bode curve hint -->
                <path d="M 130,95 Q 150,85 175,95" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <text x="145" y="110" fill="#F59E0B" font-size="8">fc</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sallen-Key Filter
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive 2nd-order active filter simulation. Explore Butterworth, Bessel, and Chebyshev responses with real-time Bode plots and circuit visualization.
              </p>
              <NuxtLink
                to="/simulations/sallen-key-filter"
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Series Circuit Analysis -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Battery/Voltage source -->
                <rect x="20" y="50" width="25" height="20" fill="white" stroke="#3B82F6" stroke-width="2" rx="2"/>
                <line x1="32" y1="45" x2="32" y2="50" stroke="#3B82F6" stroke-width="2"/>
                <line x1="32" y1="70" x2="32" y2="75" stroke="#3B82F6" stroke-width="2"/>
                <text x="32" y="63" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">V</text>
                
                <!-- Wire path -->
                <line x1="45" y1="50" x2="180" y2="50" stroke="#94A3B8" stroke-width="2"/>
                <line x1="180" y1="50" x2="180" y2="90" stroke="#94A3B8" stroke-width="2"/>
                <line x1="180" y1="90" x2="20" y2="90" stroke="#94A3B8" stroke-width="2"/>
                <line x1="20" y1="90" x2="20" y2="75" stroke="#94A3B8" stroke-width="2"/>
                
                <!-- Series resistors -->
                <rect x="60" y="45" width="20" height="10" fill="white" stroke="#EF4444" stroke-width="2" rx="1"/>
                <text x="70" y="40" text-anchor="middle" fill="#EF4444" font-size="7">R1</text>
                
                <rect x="100" y="45" width="20" height="10" fill="white" stroke="#10B981" stroke-width="2" rx="1"/>
                <text x="110" y="40" text-anchor="middle" fill="#10B981" font-size="7">R2</text>
                
                <rect x="140" y="45" width="20" height="10" fill="white" stroke="#F59E0B" stroke-width="2" rx="1"/>
                <text x="150" y="40" text-anchor="middle" fill="#F59E0B" font-size="7">R3</text>
                
                <!-- Current arrow -->
                <line x1="50" y1="50" x2="55" y2="50" stroke="#8B5CF6" stroke-width="2" marker-end="url(#arrowhead)"/>
                <text x="52" y="42" text-anchor="middle" fill="#8B5CF6" font-size="7" font-weight="bold">I</text>
                
                <!-- Voltage drops indicators -->
                <text x="70" y="105" text-anchor="middle" fill="#EF4444" font-size="6">V1</text>
                <text x="110" y="105" text-anchor="middle" fill="#10B981" font-size="6">V2</text>
                <text x="150" y="105" text-anchor="middle" fill="#F59E0B" font-size="6">V3</text>
                
                <!-- KVL indicator -->
                <text x="100" y="25" text-anchor="middle" fill="#6366F1" font-size="8" font-weight="bold">ΣV = 0</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Series Circuit Analysis
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive series circuit explorer with multiple resistors. Visualize voltage drops, current distribution, and power dissipation. Verify Kirchhoff's Voltage Law in real-time.
              </p>
              <NuxtLink
                to="/simulations/series-circuit-analysis"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Battery Charging Simulation -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Battery container -->
                <rect x="70" y="30" width="60" height="60" fill="none" stroke="#10B981" stroke-width="3" rx="5"/>
                <!-- Battery terminal -->
                <rect x="95" y="20" width="10" height="10" fill="#10B981" stroke="#10B981" stroke-width="2"/>
                <!-- Battery fill (animated) -->
                <rect x="73" y="33" width="54" height="40" fill="#10B981" opacity="0.6">
                  <animate attributeName="height" values="10;40;10" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="y" values="63;33;63" dur="3s" repeatCount="indefinite"/>
                </rect>
                <!-- Charging bolt -->
                <path d="M 100 40 L 100 55 M 93 47 L 107 47" stroke="#F59E0B" stroke-width="3"/>
                <!-- Voltage curves -->
                <path d="M 20 80 Q 40 40 60 80" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3,3"/>
                <path d="M 140 80 Q 160 40 180 80" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="3,3"/>
                <!-- Labels -->
                <text x="40" y="95" fill="#3B82F6" font-size="8">Charge</text>
                <text x="155" y="95" fill="#EF4444" font-size="8">Discharge</text>
                <!-- SOC percentage -->
                <text x="100" y="65" text-anchor="middle" fill="white" font-size="10" font-weight="bold">75%</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Battery Charging Simulation
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive battery charging and discharging with RC circuit model. Visualize voltage curves, state of charge, and time constant behavior.
              </p>
              <NuxtLink
                to="/simulations/battery-charging"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Bandpass Filter -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Frequency response curve -->
                <path d="M 20 100 Q 60 100 80 80 Q 100 20 120 80 Q 140 100 180 100" 
                      fill="none" stroke="#9333EA" stroke-width="3"/>
                <!-- Center frequency line -->
                <line x1="100" y1="20" x2="100" y2="100" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4"/>
                <!-- Passband highlight -->
                <rect x="70" y="15" width="60" height="85" fill="#9333EA" opacity="0.15"/>
                <!-- -3dB points -->
                <circle cx="70" cy="70" r="4" fill="#EF4444"/>
                <circle cx="130" cy="70" r="4" fill="#EF4444"/>
                <!-- Circuit symbols -->
                <rect x="30" y="50" width="15" height="20" fill="none" stroke="#374151" stroke-width="2"/>
                <path d="M 50 60 L 60 60 M 70 60 L 80 60 M 90 60 L 100 60" stroke="#374151" stroke-width="2"/>
                <path d="M 60 60 Q 65 50 70 60 Q 75 70 80 60" fill="none" stroke="#374151" stroke-width="2"/>
                <line x1="100" y1="60" x2="100" y2="45" stroke="#374151" stroke-width="2"/>
                <line x1="100" y1="75" x2="100" y2="90" stroke="#374151" stroke-width="2"/>
                <line x1="93" y1="45" x2="107" y2="45" stroke="#374151" stroke-width="2"/>
                <line x1="93" y1="90" x2="107" y2="90" stroke="#374151" stroke-width="2"/>
                <!-- Labels -->
                <text x="100" y="15" text-anchor="middle" fill="#F59E0B" font-size="8" font-weight="bold">f₀</text>
                <text x="70" y="82" fill="#EF4444" font-size="7">-3dB</text>
                <text x="125" y="82" fill="#EF4444" font-size="7">-3dB</text>
                <text x="10" y="50" fill="#374151" font-size="8">R</text>
                <text x="62" y="45" fill="#374151" font-size="8">L</text>
                <text x="98" y="40" fill="#374151" font-size="8">C</text>
                <!-- Frequency axis -->
                <line x1="20" y1="110" x2="180" y2="110" stroke="#94A3B8" stroke-width="1"/>
                <text x="100" y="118" text-anchor="middle" fill="#64748B" font-size="7">Frequency</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                RLC Bandpass Filter
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive frequency response analysis. Visualize center frequency, bandwidth, Q factor, and Bode plot for series RLC bandpass filters.
              </p>
              <NuxtLink
                to="/simulations/bandpass-filter"
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Oscilloscope Basics -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Oscilloscope screen -->
                <rect x="20" y="15" width="160" height="90" fill="#064E3B" stroke="#047857" stroke-width="2" rx="5"/>
                <!-- Grid -->
                <line x1="20" y1="60" x2="180" y2="60" stroke="#059669" stroke-width="0.5" opacity="0.5"/>
                <line x1="100" y1="15" x2="100" y2="105" stroke="#059669" stroke-width="0.5" opacity="0.5"/>
                <line x1="60" y1="15" x2="60" y2="105" stroke="#059669" stroke-width="0.5" opacity="0.3"/>
                <line x1="140" y1="15" x2="140" y2="105" stroke="#059669" stroke-width="0.5" opacity="0.3"/>
                <line x1="20" y1="37.5" x2="180" y2="37.5" stroke="#059669" stroke-width="0.5" opacity="0.3"/>
                <line x1="20" y1="82.5" x2="180" y2="82.5" stroke="#059669" stroke-width="0.5" opacity="0.3"/>
                <!-- Waveform -->
                <path d="M 30 60 Q 55 20 80 60 T 130 60 T 180 60" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round"/>
                <!-- Controls -->
                <rect x="185" y="25" width="12" height="8" fill="#374151" rx="1"/>
                <rect x="185" y="37" width="12" height="8" fill="#374151" rx="1"/>
                <rect x="185" y="49" width="12" height="8" fill="#374151" rx="1"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Oscilloscope Basics
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn to read waveforms, measure voltage, frequency, and period with interactive controls.
              </p>
              <NuxtLink
                to="/simulations/oscilloscope-basics"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Three-Phase Power System -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Three phasors -->
                <line x1="100" y1="60" x2="100" y2="20" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
                <line x1="100" y1="60" x2="65" y2="85" stroke="#22C55E" stroke-width="3" stroke-linecap="round"/>
                <line x1="100" y1="60" x2="135" y2="85" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
                <!-- Circle -->
                <circle cx="100" cy="60" r="40" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3"/>
                <!-- Center point -->
                <circle cx="100" cy="60" r="4" fill="#F59E0B"/>
                <!-- Phase labels -->
                <text x="100" y="15" text-anchor="middle" fill="#EF4444" font-size="10" font-weight="bold">A</text>
                <text x="55" y="95" text-anchor="middle" fill="#22C55E" font-size="10" font-weight="bold">B</text>
                <text x="145" y="95" text-anchor="middle" fill="#3B82F6" font-size="10" font-weight="bold">C</text>
                <!-- Angle annotations -->
                <text x="105" y="35" fill="#F59E0B" font-size="7">120°</text>
                <text x="85" y="75" fill="#F59E0B" font-size="7">120°</text>
                <!-- Waveforms hint -->
                <path d="M 10 110 Q 20 100 30 110 T 50 110" fill="none" stroke="#EF4444" stroke-width="1.5" opacity="0.6"/>
                <path d="M 60 110 Q 70 100 80 110 T 100 110" fill="none" stroke="#22C55E" stroke-width="1.5" opacity="0.6"/>
                <path d="M 110 110 Q 120 100 130 110 T 150 110" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity="0.6"/>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Three-Phase Power System
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive visualization of balanced three-phase electrical systems with animated phasor diagrams, waveforms, and power calculations.
              </p>
              <NuxtLink
                to="/simulations/three-phase-power"
                class="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- SCR Controlled Rectifier -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- SCR symbol -->
                <polygon points="85,40 85,80 115,60" fill="white" stroke="#8B5CF6" stroke-width="2"/>
                <line x1="115" y1="40" x2="115" y2="80" stroke="#8B5CF6" stroke-width="2"/>
                <!-- Gate terminal -->
                <line x1="100" y1="60" x2="100" y2="90" stroke="#F59E0B" stroke-width="2"/>
                <line x1="100" y1="90" x2="120" y2="100" stroke="#F59E0B" stroke-width="2"/>
                <!-- Input AC waveform -->
                <path d="M 20 60 Q 30 40 40 60 T 60 60" fill="none" stroke="#3B82F6" stroke-width="2"/>
                <!-- Output controlled waveform -->
                <path d="M 70 60 L 85 60 L 90 55 Q 95 40 105 60 Q 115 80 125 60 L 140 60 L 140 100" fill="none" stroke="#10B981" stroke-width="2.5"/>
                <!-- Firing pulse indicator -->
                <line x1="85" y1="60" x2="85" y2="20" stroke="#F59E0B" stroke-width="1" stroke-dasharray="3,2"/>
                <circle cx="85" cy="15" r="3" fill="#F59E0B"/>
                <!-- Angle marker -->
                <path d="M 85 70 A 15 15 0 0 1 100 85" fill="none" stroke="#EF4444" stroke-width="1.5"/>
                <text x="105" y="95" fill="#EF4444" font-size="8" font-weight="bold">α</text>
                <!-- Labels -->
                <text x="30" y="35" fill="#3B82F6" font-size="7">AC In</text>
                <text x="145" y="55" fill="#10B981" font-size="7">DC Out</text>
                <text x="100" y="15" fill="#F59E0B" font-size="6">Gate</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                SCR Controlled Rectifier
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Learn how Silicon Controlled Rectifiers enable controlled power conversion through phase-angle firing. Visualize gate triggering, conduction angles, and output waveforms.
              </p>
              <NuxtLink
                to="/simulations/thyristor-scr-rectifier"
                class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Wheatstone Bridge -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Diamond bridge shape -->
                <polygon points="100,20 160,60 100,100 40,60" fill="none" stroke="#F59E0B" stroke-width="2"/>
                <!-- Resistors -->
                <rect x="95" y="35" width="10" height="15" fill="white" stroke="#3B82F6" stroke-width="2" rx="1"/>
                <text x="100" y="32" text-anchor="middle" fill="#3B82F6" font-size="6">R1</text>
                
                <rect x="125" y="55" width="10" height="15" fill="white" stroke="#8B5CF6" stroke-width="2" rx="1"/>
                <text x="138" y="65" text-anchor="middle" fill="#8B5CF6" font-size="6">R2</text>
                
                <rect x="95" y="70" width="10" height="15" fill="white" stroke="#10B981" stroke-width="2" rx="1"/>
                <text x="100" y="95" text-anchor="middle" fill="#10B981" font-size="6">R3</text>
                
                <rect x="65" y="55" width="10" height="15" fill="white" stroke="#EF4444" stroke-width="2" rx="1"/>
                <text x="62" y="65" text-anchor="middle" fill="#EF4444" font-size="6">R4</text>
                
                <!-- Galvanometer in center -->
                <circle cx="100" cy="60" r="12" fill="white" stroke="#F59E0B" stroke-width="2"/>
                <line x1="100" y1="60" x2="108" y2="54" stroke="#F59E0B" stroke-width="2"/>
                <circle cx="100" cy="60" r="3" fill="#F59E0B"/>
                <text x="100" y="80" text-anchor="middle" fill="#F59E0B" font-size="7">G</text>
                
                <!-- Voltage source -->
                <circle cx="20" cy="60" r="12" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="20" y="63" text-anchor="middle" fill="#3B82F6" font-size="7" font-weight="bold">V</text>
                <line x1="32" y1="60" x2="40" y2="60" stroke="#3B82F6" stroke-width="2"/>
                
                <!-- Balance indicator -->
                <circle cx="180" cy="60" r="10" fill="#10B981"/>
                <path d="M 176 60 L 180 65 L 184 55" fill="none" stroke="white" stroke-width="2"/>
                <text x="180" y="85" text-anchor="middle" fill="#10B981" font-size="7">Balanced</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Wheatstone Bridge
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Interactive bridge circuit for precise resistance measurements. Adjust resistors to balance the bridge and explore real-world applications like strain gauges and temperature sensors.
              </p>
              <NuxtLink
                to="/simulations/wheatstone-bridge"
                class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- LC Filter -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- LC circuit diagram -->
                <line x1="30" y1="40" x2="170" y2="40" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="80" x2="170" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="30" y1="40" x2="30" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <line x1="170" y1="40" x2="170" y2="80" stroke="#94A3B8" stroke-width="3"/>
                <circle cx="30" cy="60" r="12" fill="white" stroke="#3B82F6" stroke-width="2"/>
                <text x="30" y="63" text-anchor="middle" fill="#3B82F6" font-size="7" font-weight="bold">Vin</text>
                <!-- Inductor -->
                <path d="M 70 40 L 75 35 L 80 45 L 85 35 L 90 45 L 95 35 L 100 45 L 105 35 L 110 45 L 115 35 L 120 40" fill="none" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="95" y="30" text-anchor="middle" fill="#6366F1" font-size="7" font-weight="bold">L</text>
                <!-- Capacitor to ground -->
                <line x1="130" y1="40" x2="130" y2="55" stroke="#94A3B8" stroke-width="2"/>
                <line x1="125" y1="55" x2="135" y2="55" stroke="#10B981" stroke-width="2.5"/>
                <line x1="125" y1="58" x2="135" y2="58" stroke="#10B981" stroke-width="2.5"/>
                <line x1="125" y1="61" x2="135" y2="61" stroke="#10B981" stroke-width="2.5"/>
                <line x1="130" y1="61" x2="130" y2="80" stroke="#94A3B8" stroke-width="2"/>
                <text x="142" y="60" fill="#10B981" font-size="7" font-weight="bold">C</text>
                <circle cx="170" cy="60" r="12" fill="white" stroke="#10B981" stroke-width="2"/>
                <text x="170" y="63" text-anchor="middle" fill="#10B981" font-size="7" font-weight="bold">Vout</text>
                <!-- Frequency response wave -->
                <path d="M 30 95 Q 60 95, 80 95 T 100 75 T 120 95 T 170 95" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
                <text x="100" y="110" text-anchor="middle" fill="#F59E0B" font-size="6">Frequency Response</text>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                LC Filter Design
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Design and analyze LC filter circuits with interactive Bode plot visualization. Explore low-pass and high-pass filters, Q factor, and frequency response for audio, RF, and power applications.
              </p>
              <NuxtLink
                to="/simulations/lc-filter"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Try Now →
              </NuxtLink>
            </div>
          </div>

          <!-- Piezoelectric Effect -->
          <div class="simulation-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center">
              <svg viewBox="0 0 200 120" class="w-40 h-24">
                <!-- Piezoelectric crystal -->
                <rect x="70" y="30" width="60" height="60" rx="5" fill="url(#crystalGrad)" stroke="#06B6D4" stroke-width="2"/>
                <!-- Crystal lattice/dipoles -->
                <line x1="80" y1="40" x2="80" y2="80" stroke="#0891B2" stroke-width="1.5" stroke-dasharray="3,2"/>
                <line x1="100" y1="40" x2="100" y2="80" stroke="#0891B2" stroke-width="1.5" stroke-dasharray="3,2"/>
                <line x1="120" y1="40" x2="120" y2="80" stroke="#0891B2" stroke-width="1.5" stroke-dasharray="3,2"/>
                <!-- Force arrows -->
                <line x1="100" y1="10" x2="100" y2="25" stroke="#EF4444" stroke-width="2" marker-end="url(#arrowForce)"/>
                <text x="105" y="18" fill="#EF4444" font-size="7" font-weight="bold">F</text>
                <!-- Voltage indicators -->
                <text x="100" y="55" text-anchor="middle" fill="#10B981" font-size="9" font-weight="bold">+ V -</text>
                <!-- Electrodes -->
                <line x1="65" y1="40" x2="65" y2="80" stroke="#F59E0B" stroke-width="2"/>
                <line x1="135" y1="40" x2="135" y2="80" stroke="#F59E0B" stroke-width="2"/>
                <!-- Output leads -->
                <line x1="65" y1="60" x2="45" y2="60" stroke="#F59E0B" stroke-width="2"/>
                <line x1="135" y1="60" x2="155" y2="60" stroke="#F59E0B" stroke-width="2"/>
                <!-- Labels -->
                <text x="100" y="105" text-anchor="middle" fill="#06B6D4" font-size="7">PZT Crystal</text>
                <text x="35" y="55" fill="#F59E0B" font-size="6">+</text>
                <text x="160" y="55" fill="#F59E0B" font-size="6">-</text>
                
                <defs>
                  <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#14B8A6;stop-opacity:0.5" />
                  </linearGradient>
                  <marker id="arrowForce" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#EF4444" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Piezoelectric Effect
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                Explore how mechanical stress generates electricity in piezoelectric materials. Interactive crystal deformation visualization with voltage/charge calculations for PZT, quartz, PVDF, and BaTiO₃.
              </p>
              <NuxtLink
                to="/simulations/piezoelectric-effect"
                class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors"
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

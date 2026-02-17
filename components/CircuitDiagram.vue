<template>
  <div class="circuit-diagram-wrapper">
    <svg 
      viewBox="0 0 600 300" 
      class="w-full h-auto"
      :class="{ 'dark-mode': isDark }"
    >
      <!-- Background Grid (optional, for educational purposes) -->
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" :stroke="gridColor" stroke-width="0.5" opacity="0.3"/>
        </pattern>
        
        <!-- Electron glow filter -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Gradient for voltage source -->
        <linearGradient id="voltageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="voltageColor1" />
          <stop offset="100%" :stop-color="voltageColor2" />
        </linearGradient>
      </defs>
      
      <!-- Grid background -->
      <rect width="600" height="300" fill="url(#grid)" opacity="0.5"/>
      
      <!-- Main Circuit Wires -->
      <g class="wires">
        <!-- Top wire -->
        <line x1="100" y1="80" x2="500" y2="80" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Bottom wire -->
        <line x1="100" y1="220" x2="500" y2="220" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Left wire (through voltage source) -->
        <line x1="100" y1="80" x2="100" y2="130" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="170" x2="100" y2="220" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
        <!-- Right wire (through load) -->
        <line x1="500" y1="80" x2="500" y2="220" :stroke="wireColor" stroke-width="4" stroke-linecap="round"/>
      </g>
      
      <!-- Voltage Source (Battery symbol) -->
      <g class="voltage-source" @click="$emit('component-click', 'voltage')">
        <circle cx="100" cy="150" r="45" fill="white" :stroke="voltageColor" stroke-width="3"/>
        <!-- Battery symbol -->
        <line x1="85" y1="135" x2="115" y2="135" :stroke="voltageColor" stroke-width="4" stroke-linecap="round"/>
        <line x1="90" y1="165" x2="110" y2="165" :stroke="voltageColor" stroke-width="2" stroke-linecap="round"/>
        <!-- Voltage label -->
        <text x="100" y="195" text-anchor="middle" :font-size="12" font-weight="bold" :fill="voltageColor">
          {{ voltageLabel }}
        </text>
        <!-- Polarity indicators -->
        <text x="70" y="140" text-anchor="middle" :font-size="14" font-weight="bold" fill="#EF4444">+</text>
        <text x="70" y="165" text-anchor="middle" :font-size="14" font-weight="bold" fill="#3B82F6">-</text>
      </g>
      
      <!-- Load Component (Resistor/LED/etc.) -->
      <g class="load-component" @click="$emit('component-click', 'load')">
        <!-- Resistor zigzag -->
        <path 
          d="M 500 80 L 500 100 L 485 110 L 515 120 L 485 130 L 515 140 L 485 150 L 515 160 L 485 170 L 515 180 L 500 190 L 500 220" 
          fill="none" 
          :stroke="loadColor" 
          stroke-width="4" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
        <!-- Load label -->
        <rect x="530" y="135" width="60" height="30" rx="4" fill="white" :stroke="loadColor" stroke-width="2" opacity="0.9"/>
        <text x="560" y="155" text-anchor="middle" :font-size="11" font-weight="bold" :fill="loadColor">
          {{ loadLabel }}
        </text>
      </g>
      
      <!-- Current Flow Animation (Electrons) -->
      <g class="current-flow" v-if="showCurrent">
        <!-- Multiple electrons for smoother animation -->
        <circle 
          v-for="electron in electrons" 
          :key="electron.id"
          :r="electronRadius"
          :fill="electronColor"
          filter="url(#glow)"
        >
          <animateMotion
            :dur="animationDuration"
            :begin="electron.delay"
            repeatCount="indefinite"
            :path="electronPath"
          />
        </circle>
        
        <!-- Current direction arrow -->
        <g class="current-arrow">
          <polygon 
            :points="arrowPoints" 
            :fill="electronColor"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              :values="arrowAnimation"
              :dur="animationDuration"
              repeatCount="indefinite"
            />
          </polygon>
          <text x="300" y="55" text-anchor="middle" :font-size="12" font-weight="bold" :fill="electronColor">
            I = {{ currentLabel }}
          </text>
        </g>
      </g>
      
      <!-- Voltage Drop Indicators -->
      <g class="voltage-drops" v-if="showVoltageDrops">
        <text x="100" y="50" text-anchor="middle" :font-size="11" :fill="voltageColor">
          V = {{ voltageValue }}V
        </text>
        <text x="500" y="50" text-anchor="middle" :font-size="11" :fill="loadColor">
          Vdrop = {{ voltageDrop }}V
        </text>
      </g>
      
      <!-- Power Indicator -->
      <g class="power-indicator" v-if="showPower">
        <rect x="250" y="250" width="100" height="35" rx="8" :fill="powerBgColor" opacity="0.9"/>
        <text x="300" y="273" text-anchor="middle" :font-size="12" font-weight="bold" :fill="powerTextColor">
          ⚡ P = {{ powerValue }}W
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  voltage?: number
  current?: number
  resistance?: number
  voltageLabel?: string
  loadLabel?: string
  currentLabel?: string
  loadType?: 'resistor' | 'led' | 'capacitor' | 'inductor'
  showCurrent?: boolean
  showVoltageDrops?: boolean
  showPower?: boolean
  isDark?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  voltage: 12,
  current: 1.2,
  resistance: 10,
  voltageLabel: 'V',
  loadLabel: 'R',
  currentLabel: '1.2A',
  loadType: 'resistor',
  showCurrent: true,
  showVoltageDrops: true,
  showPower: true,
  isDark: false
})

// Emits
defineEmits<{
  componentClick: [component: string]
}>()

// Computed properties for dynamic styling
const voltageValue = computed(() => props.voltage?.toFixed(1) || '0.0')
const currentLabel = computed(() => props.current?.toFixed(2) + 'A' || '0A')
const voltageDrop = computed(() => props.voltage?.toFixed(1) || '0.0')
const powerValue = computed(() => {
  const p = (props.voltage || 0) * (props.current || 0)
  return p.toFixed(2)
})

// Color coding based on values
const voltageColor = computed(() => {
  const v = props.voltage || 0
  if (v < 5) return '#22C55E' // Green - low voltage
  if (v < 12) return '#3B82F6' // Blue - normal
  if (v < 24) return '#F59E0B' // Orange - medium
  return '#EF4444' // Red - high voltage
})

const voltageColor1 = computed(() => voltageColor.value)
const voltageColor2 = computed(() => {
  const v = props.voltage || 0
  return v > 12 ? '#7C2D12' : '#1E40AF'
})

const loadColor = computed(() => {
  const r = props.resistance || 0
  if (r < 10) return '#22C55E' // Green - low resistance
  if (r < 100) return '#8B5CF6' // Purple - normal
  if (r < 1000) return '#F59E0B' // Orange - medium
  return '#EF4444' // Red - high resistance
})

const wireColor = computed(() => {
  const current = props.current || 0
  if (current < 0.1) return '#94A3B8' // Gray - no current
  if (current < 1) return '#22C55E' // Green - low current
  if (current < 5) return '#F59E0B' // Orange - medium
  return '#EF4444' // Red - high current
})

const electronColor = computed(() => {
  const current = props.current || 0
  if (current < 0.5) return '#60A5FA' // Blue
  if (current < 2) return '#FBBF24' // Yellow
  return '#EF4444' // Red
})

const powerBgColor = computed(() => {
  const p = (props.voltage || 0) * (props.current || 0)
  if (p < 1) return '#D1FAE5' // Light green
  if (p < 10) return '#FEF3C7' // Light yellow
  if (p < 50) return '#FED7AA' // Light orange
  return '#FECACA' // Light red
})

const powerTextColor = computed(() => {
  const p = (props.voltage || 0) * (props.current || 0)
  if (p < 1) return '#065F46'
  if (p < 10) return '#92400E'
  if (p < 50) return '#9A3412'
  return '#991B1B'
})

const gridColor = computed(() => props.isDark ? '#6B7280' : '#9CA3AF')

// Animation properties
const animationDuration = computed(() => {
  const current = props.current || 0.1
  const baseDuration = 4 // seconds
  const speedFactor = Math.max(0.1, current)
  return `${baseDuration / Math.sqrt(speedFactor)}s`
})

const electronRadius = computed(() => {
  const current = props.current || 0
  return Math.min(6, 3 + current * 0.5)
})

// Electron path (rectangular circuit)
const electronPath = computed(() => {
  return 'M 100 80 L 500 80 L 500 220 L 100 220 L 100 80'
})

// Generate electrons for animation
const electrons = computed(() => {
  const count = Math.min(8, Math.max(3, Math.ceil((props.current || 0) * 2)))
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: `${(i * 100) / count}%`
  }))
})

// Arrow animation
const arrowPoints = computed(() => '290,60 300,70 310,60 300,50')
const arrowAnimation = computed(() => '0,0; 10,0; 0,0')
</script>

<style scoped>
.circuit-diagram-wrapper {
  width: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 1rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.dark-mode {
  background: linear-gradient(135deg, rgba(31,41,55,0.5) 0%, rgba(17,24,39,0.5) 100%);
}

svg {
  display: block;
  margin: 0 auto;
}

/* Interactive hover effects */
.voltage-source, 
.load-component {
  cursor: pointer;
  transition: all 0.2s ease;
}

.voltage-source:hover circle,
.load-component:hover path {
  filter: drop-shadow(0 0 8px currentColor);
  transform: scale(1.02);
  transform-origin: center;
}

/* Smooth color transitions */
.wires line {
  transition: stroke 0.5s ease;
}

.current-arrow {
  animation: arrowFloat 0.5s ease-in-out infinite alternate;
}

@keyframes arrowFloat {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .circuit-diagram-wrapper {
    padding: 0.5rem;
  }
}
</style>

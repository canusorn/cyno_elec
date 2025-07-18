<template>
  <NuxtLink :to="`/calculators/${calculator.type}`"
    class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 flex flex-col block"
    :aria-label="`Open ${calculator.title} calculator`">
    
    <!-- Calculator Icon/Visual -->
    <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
      <component :is="iconComponent" class="w-24 h-24 text-primary group-hover:text-primary-dark transition-colors duration-300" />
      
      <!-- Difficulty Badge -->
      <div class="absolute top-4 left-4">
        <span :class="[
          'px-3 py-1 rounded-full text-sm font-medium',
          calculator.difficulty === 'Basic' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            calculator.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        ]">
          {{ calculator.difficulty }}
        </span>
      </div>
      
      <!-- Category Badge -->
      <div class="absolute top-4 right-4">
        <span
          class="bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
          {{ getCategoryNames(calculator.categoryId) }}
        </span>
      </div>
      
      <!-- Formula Display -->
      <div class="absolute bottom-4 left-4 right-4">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 text-center">
          <span class="text-lg font-mono font-bold text-gray-900 dark:text-white">{{ calculator.formula }}</span>
        </div>
      </div>
    </div>

    <!-- Calculator Content -->
    <div class="p-6 flex flex-col flex-grow">
      <h3
        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
        {{ calculator.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {{ calculator.description }}
      </p>

      <!-- Input/Output Units -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="unit in calculator.units" :key="unit"
          class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
          {{ unit }}
        </span>
      </div>

      <!-- Calculator Stats -->
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 mt-auto">
        <div class="flex items-center">
          <span class="text-xs">{{ calculator.type }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-xs">{{ calculator.category }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import {
  CalculatorIcon,
  BoltIcon,
  CpuChipIcon,
  LightBulbIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'CalculatorCard',
  components: {
    CalculatorIcon,
    BoltIcon,
    CpuChipIcon,
    LightBulbIcon,
    CogIcon,
    ChartBarIcon
  },
  props: {
    calculator: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  emits: ['open-calculator'],
  computed: {
    iconComponent() {
      const iconMap = {
        'BoltIcon': BoltIcon,
        'LightBulbIcon': LightBulbIcon,
        'CpuChipIcon': CpuChipIcon,
        'CogIcon': CogIcon,
        'ChartBarIcon': ChartBarIcon,
        'CalculatorIcon': CalculatorIcon
      }
      return iconMap[this.calculator.icon] || CalculatorIcon
    }
  },
  methods: {
    getCategoryNames(categoryIds) {
      return categoryIds
        .map(catId => this.categories.find(cat => cat.id === catId)?.name || catId)
        .join(', ')
    }
  }
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.text-primary {
  color: var(--tw-color-primary) !important;
}

.text-primary-dark {
  color: var(--tw-color-primary-dark) !important;
}

.text-primary-light {
  color: var(--tw-color-primary-light) !important;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.bg-primary-dark {
  background-color: var(--tw-color-primary-dark) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.border-primary-light {
  border-color: var(--tw-color-primary-light) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary {
  --tw-gradient-to: var(--tw-color-primary) !important;
}

.from-primary-dark {
  --tw-gradient-from: var(--tw-color-primary-dark) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
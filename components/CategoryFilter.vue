<template>
  <div class="flex flex-wrap justify-center gap-4 mb-12">
    <button 
      v-for="category in categories" 
      :key="category.id" 
      @click="$emit('category-changed', category.id)" 
      :class="[
        'px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105',
        selectedCategory === category.id
          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700'
      ]"
      :aria-pressed="selectedCategory === category.id"
      :aria-label="`Filter by ${category.name} category`"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedCategory: {
      type: String,
      required: true,
      default: 'all'
    }
  },
  emits: ['category-changed']
}
</script>

<style scoped>
:root {
  --tw-color-primary: #9FA8DA;
  --tw-color-primary-dark: #7986CB;
  --tw-color-primary-light: #C5CAE9;
}

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.bg-primary-dark {
  background-color: var(--tw-color-primary-dark) !important;
}

.from-primary {
  --tw-gradient-from: var(--tw-color-primary) !important;
}

.to-primary-dark {
  --tw-gradient-to: var(--tw-color-primary-dark) !important;
}
</style>
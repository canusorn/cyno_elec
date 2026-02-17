<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center mb-12">
          <h1
            class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            Electrical Engineering <span class="text-primary dark:text-primary-light">Chapters</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master electrical theory through interactive lessons. Start from basics and progress to advanced concepts with hands-on visualizations.
          </p>
        </div>

        <!-- Progress Overview -->
        <div class="max-w-4xl mx-auto mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
              <span class="text-sm text-gray-600 dark:text-gray-300">{{ completedCount }}/{{ chapters.length }} Completed</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                class="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full transition-all duration-500"
                :style="{ width: `${progressPercentage}%` }">
              </div>
            </div>
          </div>
        </div>

        <!-- Difficulty Filter -->
        <div class="flex justify-center gap-4 mb-12">
          <button
            v-for="level in difficultyLevels"
            :key="level.value"
            @click="selectedDifficulty = level.value"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              selectedDifficulty === level.value
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
            ]">
            {{ level.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Chapters Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="chapter in filteredChapters"
            :key="chapter.id"
            @click="navigateToChapter(chapter.slug)"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <!-- Chapter Header -->
            <div class="relative h-48 bg-gradient-to-br from-primary/20 to-primary-dark/20 dark:from-primary/10 dark:to-primary-dark/10 p-6 flex flex-col justify-between">
              <!-- Difficulty Badge -->
              <div class="absolute top-4 right-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    {
                      'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': chapter.difficulty === 'beginner',
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': chapter.difficulty === 'intermediate',
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': chapter.difficulty === 'advanced'
                    }
                  ]">
                  {{ chapter.difficulty }}
                </span>
              </div>

              <!-- Chapter Number -->
              <div class="text-6xl font-bold text-primary/30 dark:text-primary-light/30">
                {{ chapter.order }}
              </div>

              <!-- Chapter Title -->
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ chapter.title }}</h3>
                <p class="text-lg text-gray-600 dark:text-gray-300">{{ chapter.titleTh }}</p>
              </div>
            </div>

            <!-- Chapter Content -->
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {{ chapter.description }}
              </p>

              <!-- Topics -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="topic in chapter.topics.slice(0, 3)"
                  :key="topic"
                  class="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-light text-xs rounded-md">
                  {{ topic }}
                </span>
                <span v-if="chapter.topics.length > 3" class="text-xs text-gray-500 dark:text-gray-400">
                  +{{ chapter.topics.length - 3 }} more
                </span>
              </div>

              <!-- Chapter Meta -->
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ chapter.duration }}
                </div>
                <div v-if="isChapterCompleted(chapter.id)" class="flex items-center text-green-600 dark:text-green-400">
                  <svg class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Completed
                </div>
              </div>

              <!-- Start Button -->
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <span class="text-primary dark:text-primary-light font-semibold">
                    {{ isChapterCompleted(chapter.id) ? 'Review' : 'Start Learning' }}
                  </span>
                  <svg class="h-5 w-5 text-primary dark:text-primary-light transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <svg class="mx-auto h-12 mb-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#9FA8DA" stroke-width="2" fill="none"/>
            <path d="M15 12L25 20L15 28V12Z" fill="#9FA8DA"/>
            <circle cx="20" cy="20" r="3" fill="#7986CB"/>
            <path d="M12 8L28 32M28 8L12 32" stroke="#C5CAE9" stroke-width="1" opacity="0.6"/>
          </svg>
          <p class="text-base text-gray-400">&copy; 2025 Cyno Electric. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChapters } from '~/composables/useChapters'

// SEO
useHead({
  title: 'Electrical Engineering Chapters - Cyno Electric',
  meta: [
    { name: 'description', content: 'Learn electrical engineering through interactive chapters. From basics to advanced concepts.' },
    { name: 'keywords', content: 'electrical engineering, electricity, ohms law, circuits, AC circuits, power' }
  ]
})

const { chapters: allChapters, getChapterProgress } = useChapters()
const colorMode = useColorMode()
const selectedDifficulty = ref('all')

// Completed chapters (for demo purposes)
const completedChapters = ref([])

const difficultyLevels = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' }
]

// Filter chapters by difficulty
const filteredChapters = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return allChapters
  }
  return allChapters.filter(chapter => chapter.difficulty === selectedDifficulty.value)
})

// Calculate progress
const completedCount = computed(() => completedChapters.value.length)
const progressPercentage = computed(() => {
  if (allChapters.length === 0) return 0
  return Math.round((completedCount.value / allChapters.length) * 100)
})

// Check if chapter is completed
const isChapterCompleted = (chapterId) => {
  return completedChapters.value.includes(chapterId)
}

// Navigate to chapter
const navigateToChapter = (slug) => {
  navigateTo(`/chapters/${slug}`)
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

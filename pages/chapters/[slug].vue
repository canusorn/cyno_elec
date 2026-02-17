<template>
  <div
    :class="[colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <NavigationBar />

    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Loading chapter...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Chapter Not Found</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">The chapter you're looking for doesn't exist.</p>
        <NuxtLink
          to="/chapters"
          class="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all">
          Back to Chapters
        </NuxtLink>
      </div>
    </div>

    <!-- Chapter Content -->
    <div v-else-if="chapter">
      <!-- Header Section -->
      <section class="relative pt-24 pb-12">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <!-- Breadcrumb -->
          <nav class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
            <NuxtLink to="/chapters" class="hover:text-primary dark:hover:text-primary-light">Chapters</NuxtLink>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-900 dark:text-white font-medium">{{ chapter.title }}</span>
          </nav>

          <!-- Chapter Header -->
          <div class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-4">
              <!-- Difficulty Badge -->
              <span
                :class="[
                  'px-4 py-2 rounded-full text-sm font-semibold',
                  {
                    'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': chapter.difficulty === 'beginner',
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300': chapter.difficulty === 'intermediate',
                    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300': chapter.difficulty === 'advanced'
                  }
                ]">
                {{ chapter.difficulty }}
              </span>
              <!-- Duration -->
              <div class="flex items-center text-gray-600 dark:text-gray-300">
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ chapter.duration }}
              </div>
            </div>

            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              {{ chapter.title }}
            </h1>
            <p class="text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {{ chapter.titleTh }}
            </p>
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ chapter.description }}
            </p>

            <!-- Topics -->
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="topic in chapter.topics"
                :key="topic"
                class="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-light rounded-full text-sm">
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Demo Section -->
      <section v-if="chapter.interactiveComponents.length > 0" class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Demo</h2>
              <p class="text-gray-600 dark:text-gray-300">
                Experiment with the concepts you're learning. Hover over components and adjust values to see real-time changes.
              </p>
            </div>

            <!-- Dynamic Interactive Component -->
            <div class="flex justify-center">
              <CircuitDemo
                :chapter-slug="chapter.slug"
                :components="chapter.interactiveComponents" />
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="prose dark:prose-invert max-w-none">
            <!-- This will be loaded from markdown or content files -->
            <div v-html="chapterContent" class="chapter-content"></div>
          </div>
        </div>
      </section>

      <!-- Formulas Section -->
      <section v-if="chapter.formulas && chapter.formulas.length > 0" class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-br from-primary/10 to-primary-dark/10 dark:from-primary/5 dark:to-primary-dark/5 rounded-2xl p-8 backdrop-blur-sm">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Formulas</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(formula, index) in chapter.formulas"
                :key="index"
                class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div class="text-center">
                  <div class="text-2xl font-mono font-bold text-primary dark:text-primary-light mb-2">
                    {{ formula }}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Formula {{ index + 1 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Prerequisites -->
      <section v-if="chapter.prerequisites && chapter.prerequisites.length > 0" class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prerequisites</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="prereq in chapter.prerequisites"
              :key="prereq"
              :to="`/chapters/${prereq}`"
              class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all">
              <div class="flex-1">
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ getChapterBySlug(prereq)?.title || prereq }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ getChapterBySlug(prereq)?.titleTh || '' }}
                </div>
              </div>
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Chapter Navigation -->
      <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <!-- Previous Chapter -->
            <NuxtLink
              v-if="previousChapter"
              :to="`/chapters/${previousChapter.slug}`"
              class="flex-1 flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all mr-4 group">
              <svg class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Previous</div>
                <div class="font-semibold text-gray-900 dark:text-white">{{ previousChapter.title }}</div>
              </div>
            </NuxtLink>

            <!-- Mark as Complete Button -->
            <button
              @click="markAsComplete"
              :class="[
                'px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl',
                isCompleted
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-primary text-white hover:bg-primary-dark'
              ]">
              <div class="flex items-center">
                <svg v-if="isCompleted" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>{{ isCompleted ? 'Completed!' : 'Mark as Complete' }}</span>
              </div>
            </button>

            <!-- Next Chapter -->
            <NuxtLink
              v-if="nextChapter"
              :to="`/chapters/${nextChapter.slug}`"
              class="flex-1 flex items-center justify-end p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all ml-4 group">
              <div class="text-right">
                <div class="text-sm text-gray-600 dark:text-gray-300">Next</div>
                <div class="font-semibold text-gray-900 dark:text-white">{{ nextChapter.title }}</div>
              </div>
              <svg class="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChapters } from '~/composables/useChapters'

const route = useRoute()
const { getChapterBySlug, getNextChapter, getPreviousChapter } = useChapters()
const colorMode = useColorMode()

// Get chapter data
const { data: chapter, pending, error } = await useAsyncData(
  `chapter-${route.params.slug}`,
  () => Promise.resolve(getChapterBySlug(route.params.slug))
)

// Computed
const nextChapter = computed(() => {
  return chapter.value ? getNextChapter(chapter.value.slug) : null
})

const previousChapter = computed(() => {
  return chapter.value ? getPreviousChapter(chapter.value.slug) : null
})

const isCompleted = ref(false)

// Placeholder content - in production, load from markdown files
const chapterContent = computed(() => {
  if (!chapter.value) return ''

  // This is a placeholder. In production, you'd load markdown files
  // based on the chapter slug
  return `
    <h2>Introduction</h2>
    <p>
      Welcome to ${chapter.value.title}. This chapter will guide you through
      ${chapter.value.description}
    </p>
    <h2>What You'll Learn</h2>
    <ul>
      ${chapter.value.topics.map(topic => `<li>${topic}</li>`).join('')}
    </ul>
    <h2>Getting Started</h2>
    <p>
      Use the interactive demo above to experiment with the concepts.
      Hover over components to see their labels and click to interact.
    </p>
  `
})

// Methods
const markAsComplete = () => {
  isCompleted.value = !isCompleted.value
  // In production, save to localStorage or backend
  if (process.client) {
    const completed = JSON.parse(localStorage.getItem('completedChapters') || '[]')
    if (isCompleted.value) {
      completed.push(chapter.value.id)
    } else {
      const index = completed.indexOf(chapter.value.id)
      if (index > -1) completed.splice(index, 1)
    }
    localStorage.setItem('completedChapters', JSON.stringify(completed))
  }
}

// SEO
useHead({
  title: () => chapter.value ? `${chapter.value.title} - Cyno Electric` : 'Chapter - Cyno Electric',
  meta: () => chapter.value ? [
    { name: 'description', content: chapter.value.description },
    { name: 'keywords', content: chapter.value.topics.join(', ') }
  ] : []
})
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

.bg-primary {
  background-color: var(--tw-color-primary) !important;
}

.bg-primary-dark {
  background-color: var(--tw-color-primary-dark) !important;
}

.prose :deep(h2) {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.prose :deep(p) {
  @apply text-gray-700 dark:text-gray-300 mb-4 leading-relaxed;
}

.prose :deep(ul) {
  @apply list-disc list-inside text-gray-700 dark:text-gray-300 mb-4;
}

.prose :deep(li) {
  @apply mb-2;
}
</style>

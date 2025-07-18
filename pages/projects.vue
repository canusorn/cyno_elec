<template>
  <div
    :class="[$colorMode === 'dark' ? 'dark' : '', 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800']">
    <!-- Navigation -->
    <nav class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <img src="https://cynoiot.com/layout/images/cyno_banner.svg" alt="CynoIoT Logo"
                class="h-8 sm:h-10 mr-2 hover:scale-105 transition-transform" />
              <span
                class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-white">CynoIoT</span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Home</NuxtLink>
            <NuxtLink to="/projects" class="text-primary dark:text-primary-light font-semibold transition-colors">
              Projects</NuxtLink>
            <NuxtLink to="/contact"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">
              Contact</NuxtLink>
            <a href="https://cynoiot.com/docs/dev/" target="_blank"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Docs</a>
            <a href="https://cynoiot.com/auth/login" target="_blank">
              <button
                class="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-lg">Login</button>
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-600 dark:text-gray-200 hover:text-primary focus:outline-none focus:text-primary transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="mobileMenuOpen"
          class="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <NuxtLink to="/" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Home</NuxtLink>
            <NuxtLink to="/projects" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-primary dark:text-primary-light font-semibold transition-colors rounded-md">
              Projects</NuxtLink>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">
              Contact</NuxtLink>
            <a href="https://cynoiot.com/docs/dev/" target="_blank"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Docs</a>
            <div class="px-3 py-2">
              <a href="https://cynoiot.com/auth/login" target="_blank" class="block">
                <button
                  class="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full font-medium transition-all">Login</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Header Section -->
    <section class="relative pt-24 pb-16">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/5"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1
            class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
            โปรเจค IoT ตัวอย่าง
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            สำรวจโปรเจค IoT ที่หลากหลาย พร้อมโค้ดตัวอย่างและคำแนะนำการใช้งาน
          </p>

          <!-- Filter Buttons -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="[
              'px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105',
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700'
            ]">
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in filteredProjects" :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 flex flex-col">

            <!-- Project Image -->
            <div class="relative aspect-square overflow-hidden">
              <img :src="project.image" :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-4 left-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  project.difficulty === 'ง่าย' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    project.difficulty === 'ปานกลาง' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]">
                  {{ project.difficulty }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span
                  class="bg-purple-500 bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  {{project.categoryId.map(catId => categories.find(cat => cat.id === catId)?.name || catId).join(', ')}}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6 flex flex-col flex-grow">
              <h3
                class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tech in project.technologies" :key="tech"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                  {{ tech }}
                </span>
              </div>

              <!-- Project Stats -->
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 mt-auto">
                <div class="flex items-center">
                  <!-- <ClockIcon class="h-4 w-4 mr-1" />
                  {{ project.duration }} -->
                </div>
                <div class="flex items-center">
                  <UserIcon class="h-4 w-4 mr-1" />
                  {{ project.author }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-1 items-center">
                <a v-if="project.lazadaUrl" :href="project.lazadaUrl" target="_blank"
                  class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-all text-center">
                  Lazada
                </a>
                <a v-if="project.shopeeUrl" :href="project.shopeeUrl" target="_blank"
                  class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all text-center">
                  Shopee
                </a>
                <a :href="project.codeUrl" target="_blank"
                  class="flex-1 bg-white dark:bg-gray-700 text-primary dark:text-primary-light border border-primary dark:border-primary-light py-2 px-4 rounded-lg font-medium transition-all hover:bg-primary/10 dark:hover:bg-primary/20 text-center">
                  รายละเอียด
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <CubeTransparentIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">ไม่พบโปรเจคในหมวดหมู่นี้</h3>
          <p class="text-gray-600 dark:text-gray-300">ลองเลือกหมวดหมู่อื่นหรือดูโปรเจคทั้งหมด</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <img src="https://cynoiot.com/layout/images/cyno_banner.svg" alt="CynoIoT Logo"
            class="mx-auto h-12 mb-4 hover:scale-105 transition-transform" />
          <p class="text-base text-gray-400">&copy; 2025 CynoIoT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import {
  UserIcon,
  CubeTransparentIcon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'ตัวอย่างโปรเจค IoT - CynoIoT',
  meta: [
    { name: 'description', content: 'สำรวจโปรเจค IoT ที่หลากหลาย พร้อมโค้ดตัวอย่างและคำแนะนำการใช้งาน สำหรับ ESP32, ESP8266 และอุปกรณ์ IoT อื่นๆ' },
    { name: 'keywords', content: 'IoT projects, ESP32, ESP8266, สมาร์ทฟาร์ม, สมาร์ทโฮม, โปรเจค IoT, ตัวอย่างโค้ด' }
  ]
})

const $colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const selectedCategory = ref('all')

// Categories
const categories = [
  { id: 'all', name: 'ทั้งหมด' },
  { id: 'kit', name: 'ชุดสำเร็จ' },
  { id: 'ac-meter', name: 'ไฟฟ้า AC' },
  { id: 'dc-meter', name: 'ไฟฟ้า DC' },
  { id: 'smart-home', name: 'สมาร์ทโฮม' },
  { id: 'solar', name: 'โซลาร์เซลล์' },
  // { id: 'smart-farm', name: 'สมาร์ทฟาร์ม' },
  { id: 'industrial', name: 'อุตสาหกรรม' },
  { id: 'environmental', name: 'สิ่งแวดล้อม' },
  // { id: 'security', name: 'ความปลอดภัย' }
]

// Sample projects data
const projects = [
  {
    id: 1,
    title: 'PM meter วัดฝุ่น PM2.5 ด้วย PMS7003',
    description: 'ชุดวัดฝุ่น PM2.5 ด้วยเซ็นเซอร์ PMS7003,PM-G7 และโมดูล Wifi พร้อมอัพโหลดไว้และสามารถไปใช้งานได้บน cynoIoT ทันที',
    categoryId: ['kit', 'environmental'],
    difficulty: 'ง่าย',
    author: 'CynoIoT Team',
    technologies: ['ESP8266', 'PMS7003', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/pmmeter-DgvP5j6l.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i3514221311.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/16224035929',
    codeUrl: 'https://cynoiot.com/docs/project/pms7003.html'
  },
  {
    id: 2,
    title: 'DC power meter ด้วย MK-229',
    description: 'ชุดวัดไฟฟ้ากระแสตรง ใช้เซนเซอร์ MK-229 ที่สามารถแยกทิศทางของกระแสไฟฟ้าได้ และโมดูล ESP8266 พร้อมอัพโหลดไว้และสามารถไปใช้งานได้บน CynoIoT ทันที',
    categoryId: ['kit', 'dc-meter','smart-home','solar'],
    difficulty: 'ปานกลาง',
    author: 'CynoIoT Team',
    technologies: ['ESP8266', 'MK-229','RS485', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/mk229-BX3PsNUR.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i5550387118.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/28972624380/',
    codeUrl: 'https://cynoiot.com/docs/project/mk229.html'
  },
  {
    id: 3,
    title: 'DC meter ด้วย PZEM-017',
    description: 'ชุดวัดไฟฟ้ากระแสตรง ใช้เซนเซอร์ PZEM-017 และโมดูล ESP32 S2 mini พร้อมอัพโหลดไว้และสามารถไปใช้งานได้บน CynoIoT ทันที',
    categoryId: ['kit', 'dc-meter','smart-home','solar'],
    difficulty: 'ปานกลาง',
    author: 'CynoIoT Team',
    technologies: ['ESP32', 'PZEM-017','RS485', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/pzem017kit-OHV2UiRo.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i2211050395.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/7580448349/',
    codeUrl: 'https://cynoiot.com/docs/project/pzem017.html'
  },
  {
    id: 4,
    title: 'AC meter 1เฟส ด้วย DDS6111',
    description: 'ชุดวัดไฟฟ้าบ้าน กระแสสลับ 1เฟส ใช้เซนเซอร์ DDS6111 และโมดูล Wifi ESP32 S2 mini พร้อมอัพโหลดไว้และสามารถไปใช้งานได้บน CynoIoT',
    categoryId: ['kit', 'ac-meter','smart-home','solar'],
    difficulty: 'ปานกลาง',
    author: 'CynoIoT Team',
    technologies: ['ESP32', 'DDS6111','RS485', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/DDS6111-CEsYoOFA.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i5796072582.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/40107713705/',
    codeUrl: 'https://cynoiot.com/docs/project/dds6111.html'
  },
  {
    id: 5,
    title: 'AC meter 3เฟส ด้วย DTS6111',
    description: 'ชุดวัดไฟฟ้าบ้านกระแสสลับ 3 เฟสนี้ใช้เซนเซอร์ DTS6111 และโมดูล Wi-Fi ESP32 S2 mini ที่มาพร้อมเฟิร์มแวร์ที่อัปโหลดไว้แล้ว คุณสามารถนำไปใช้งานกับ CynoIoT',
    categoryId: ['kit', 'ac-meter','industrial','solar'],
    difficulty: 'ปานกลาง',
    author: 'CynoIoT Team',
    technologies: ['ESP32', 'DTS6111','RS485', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/DTS6111-BRC4PQFD.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i5796163515.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/40207742150/',
    codeUrl: 'https://cynoiot.com/docs/project/dts6111.html'
  },
  {
    id: 6,
    title: 'AC meter 3เฟส กระแสสูง 300A ด้วย DTS6111',
    description: 'ชุดวัดไฟฟ้าบ้านกระแสสลับ 3 เฟสนี้ใช้เซนเซอร์ DTS6111 กระแสสูง 300A และโมดูล Wi-Fi ESP32 S2 mini ที่มาพร้อมเฟิร์มแวร์ที่อัปโหลดไว้แล้ว คุณสามารถนำไปใช้งานกับ CynoIoT',
    categoryId: ['kit', 'ac-meter','industrial','solar'],
    difficulty: 'ปานกลาง',
    author: 'CynoIoT Team',
    technologies: ['ESP32', 'DTS6111','RS485', 'WiFi', 'CynoIoT'],
    image: 'https://cynoiot.com/docs/assets/DTS6111-300a-wyLM2-c0.png',
    lazadaUrl: 'https://www.lazada.co.th/products/i5796844423.html',
    shopeeUrl: 'https://shopee.co.th/product/45230808/40607777856/',
    codeUrl: 'https://cynoiot.com/docs/project/dts6111-300a.html'
  },
]

// Computed property for filtered projects
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }
  return projects.filter(project => project.categoryId.includes(selectedCategory.value))
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

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

.bg-primary-light {
  background-color: var(--tw-color-primary-light) !important;
}

.border-primary {
  border-color: var(--tw-color-primary) !important;
}

.border-primary-dark {
  border-color: var(--tw-color-primary-dark) !important;
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
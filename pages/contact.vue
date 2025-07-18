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
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Home</NuxtLink>
            <NuxtLink to="/projects"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Projects</NuxtLink>
            <NuxtLink to="/contact"
              class="text-primary dark:text-primary-light font-semibold transition-colors">Contact</NuxtLink>
            <a href="https://cynoiot.com/docs/dev/" target="_blank"
              class="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors">Docs</a>
            <a href="https://cynoiot.com/auth/login" target="_blank">
              <button class="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-lg">Login</button>
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 dark:text-gray-200 hover:text-primary focus:outline-none focus:text-primary transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <NuxtLink to="/" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Home</NuxtLink>
            <NuxtLink to="/projects" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Projects</NuxtLink>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-primary dark:text-primary-light font-semibold transition-colors rounded-md">Contact</NuxtLink>
            <a href="https://cynoiot.com/docs/dev/" target="_blank"
              class="block px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors rounded-md">Docs</a>
            <div class="px-3 py-2">
              <a href="https://cynoiot.com/auth/login" target="_blank" class="block">
                <button class="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-2 rounded-full font-medium transition-all">Login</button>
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
            ติดต่อเรา
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            พร้อมให้ความช่วยเหลือและรับฟังความคิดเห็นจากคุณ
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Methods Section -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Email -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="envelope" class="text-white text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">อีเมล</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ส่งข้อความหาเราได้ตลอดเวลา</p>
            <div class="text-center">
              <a href="mailto:iotbundlemail@gmail.com" class="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                iotbundlemail@gmail.com
              </a>
            </div>
          </div>

          <!-- Facebook -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <font-awesome-icon :icon="['fab', 'facebook']" class="text-white text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">Facebook</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ติดตามข่าวสารและอัพเดทล่าสุด</p>
            <div class="text-center">
              <a href="https://web.facebook.com/iotbundle" target="_blank" class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                IoTbundle Facebook
              </a>
            </div>
          </div>

          <!-- Line -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <font-awesome-icon :icon="['fab', 'line']" class="text-white text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">Line</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">แชทสดกับทีมงานได้ทันที</p>
            <div class="text-center">
              <a href="https://line.me/ti/p/@295qqbui" target="_blank" class="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                @295qqbui
              </a>
            </div>
          </div>

          <!-- YouTube -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <font-awesome-icon :icon="['fab', 'youtube']" class="text-white text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">YouTube</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ดูวิดีโอสอนและตัวอย่างการใช้งาน</p>
            <div class="text-center">
              <a href="https://www.youtube.com/channel/UCK4eJqY0hM6Vxl7vCyr7Sog" target="_blank" class="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                IoTbundle Channel
              </a>
            </div>
          </div>
          <!-- Feedback -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="comment-dots" class="text-white text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">ข้อเสนอแนะ</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ส่งความคิดเห็นและข้อเสนอแนะให้เรา</p>
            <div class="text-center">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScTN99Kj0v72iNCmjN8NJneX60eiKGbPuBxhes6wQy0HTQvlw/viewform?usp=dialog" class="inline-block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                ส่งข้อเสนอแนะ
              </a>
            </div>
          </div>

          <!-- Lazada -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
               <font-awesome-icon icon="shopping-cart" class="text-white text-2xl" />
             </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">Lazada</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ซื้อผลิตภัณฑ์ CynoIoT ผ่าน Lazada</p>
            <div class="text-center">
              <a href="https://www.lazada.co.th/shop/iotbundle" target="_blank" class="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                IoTbundle Store
              </a>
            </div>
          </div>

          <!-- Shopee -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
               <font-awesome-icon icon="store" class="text-white text-2xl" />
             </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">Shopee</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">ซื้อผลิตภัณฑ์ CynoIoT ผ่าน Shopee</p>
            <div class="text-center">
              <a href="https://shopee.co.th/canusorn" target="_blank" class="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                IoTbundle Shop
              </a>
            </div>
          </div>

          <!-- Official Website -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
               <font-awesome-icon icon="globe" class="text-white text-2xl" />
             </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">เว็บไซต์หลัก</h3>
            <p class="text-gray-600 dark:text-gray-300 text-center mb-6">เยี่ยมชมเว็บไซต์อย่างเป็นทางการ</p>
            <div class="text-center">
              <a href="https://iotbundle.com" target="_blank" class="inline-block bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105">
                IoTBundle.com
              </a>
            </div>
          </div>
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
import { ref } from 'vue'

// Color mode
const { $colorMode } = useNuxtApp()

// Mobile menu state
const mobileMenuOpen = ref(false)

// SEO Meta
useHead({
  title: 'ติดต่อเรา - CynoIoT',
  meta: [
    { name: 'description', content: 'ติดต่อทีม CynoIoT ผ่านอีเมล Facebook Line YouTube หรือส่งข้อเสนอแนะให้เรา' },
    { name: 'keywords', content: 'CynoIoT, ติดต่อ, สนับสนุน, IoT, Arduino, ESP32' }
  ]
})
</script>
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org'
  ],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },
  
  // SEO Configuration
  site: {
    url: 'https://www.cynoiot.com',
    name: 'CynoIoT',
    description: 'แพลตฟอร์ม IoT แบบครบวงจร รองรับอุปกรณ์หลากหลาย พร้อมระบบวิเคราะห์ข้อมูลแบบเรียลไทม์',
    defaultLocale: 'th'
  },
  
  // Sitemap Configuration
  sitemap: {
    urls: ['https://www.cynoiot.com']
  },
  
  // Robots Configuration
  robots: {
      sitemap: ['https://www.cynoiot.com/sitemap.xml'],
      groups: [
        {
          userAgent: '*',
          allow: '/'
        }
      ]
  },
  gtag: {
    id: 'G-E8YS8D5Z5X', // Replace with your GA4 Measurement ID (e.g., 'G-XXXXXXXXXX')
    config: {
      send_page_view: true, // Automatically track page views on route changes
    },
  },
  app: {
    head: {
      title: 'CynoIoT - แพลตฟอร์มบริหารจัดการอุปกรณ์ IoT',
      titleTemplate: '%s | CynoIoT',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'CynoIoT - แพลตฟอร์ม IoT แบบครบวงจร รองรับอุปกรณ์หลากหลาย พร้อมระบบวิเคราะห์ข้อมูลแบบเรียลไทม์' },
        { name: 'keywords', content: 'IoT, Internet of Things, แพลตฟอร์ม IoT, บริหารจัดการอุปกรณ์, ระบบวิเคราะห์ข้อมูล, Real-time data, Smart devices, IoT platform, Device management, Data analytics, ESP32, ESP8266, Arduino, สมาร์ทฟาร์ม, สมาร์ทโฮม' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'CynoIoT Team' },
        { name: 'language', content: 'th' },
        { name: 'theme-color', content: '#9FA8DA' },
        { name: 'msapplication-TileColor', content: '#9FA8DA' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // Open Graph
        { property: 'og:site_name', content: 'CynoIoT' },
        { property: 'og:title', content: 'CynoIoT - แพลตฟอร์มบริหารจัดการอุปกรณ์ IoT' },
        { property: 'og:description', content: 'CynoIoT - แพลตฟอร์มบริหารจัดการอุปกรณ์ IoT แบบครบวงจร รองรับอุปกรณ์หลากหลาย พร้อมระบบวิเคราะห์ข้อมูลแบบเรียลไทม์' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.cynoiot.com' },
        { property: 'og:image', content: 'https://cynoiot.com/demo/images/landing/dashboard.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'CynoIoT Dashboard - แพลตฟอร์มบริหารจัดการอุปกรณ์ IoT' },
        { property: 'og:locale', content: 'th_TH' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CynoIoT - แพลตฟอร์มบริหารจัดการอุปกรณ์ IoT' },
        { name: 'twitter:description', content: 'แพลตฟอร์ม IoT แบบครบวงจร รองรับอุปกรณ์หลากหลาย พร้อมระบบวิเคราะห์ข้อมูลแบบเรียลไทม์' },
        { name: 'twitter:image', content: 'https://cynoiot.com/demo/images/landing/dashboard.png' },
        { name: 'twitter:image:alt', content: 'CynoIoT Dashboard' },
        
        // Additional SEO
        { name: 'geo.region', content: 'TH' },
        { name: 'geo.country', content: 'Thailand' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.cynoiot.com' },
        { rel: 'alternate', hreflang: 'th', href: 'https://www.cynoiot.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://cynoiot.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CynoIoT',
            url: 'https://www.cynoiot.com',
            logo: 'https://cynoiot.com/layout/images/cyno_banner.svg',
            description: 'แพลตฟอร์ม IoT แบบครบวงจร รองรับอุปกรณ์หลากหลาย พร้อมระบบวิเคราะห์ข้อมูลแบบเรียลไทม์',
            foundingDate: '2020',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              url: 'https://www.cynoiot.com/contact'
            },
            sameAs: [
              'https://www.facebook.com/cynoiot',
              'https://www.youtube.com/@cynoiot',
              'https://line.me/ti/p/@cynoiot'
            ]
          })
        }
      ]
    }
  },
})

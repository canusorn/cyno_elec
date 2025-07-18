<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
// SEO Meta Tags
useHead({
  htmlAttrs: {
    lang: 'th'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-TileColor', content: '#3b82f6' },
    { name: 'theme-color', content: '#3b82f6' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'CynoIoT' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
  ]
})

// Structured Data for Organization
useSchemaOrg([
  defineOrganization({
    name: 'CynoIoT',
    url: 'https://cynoiot.com',
    logo: 'https://cynoiot.com/logo.png',
    description: 'แพลตฟอร์ม IoT ที่ครบครันสำหรับการจัดการอุปกรณ์อัจฉริยะ',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+66-XX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Thai', 'English']
    },
    sameAs: [
      'https://facebook.com/cynoiot',
      'https://twitter.com/cynoiot',
      'https://linkedin.com/company/cynoiot'
    ]
  })
])
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
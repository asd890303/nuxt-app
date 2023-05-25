// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    url: '/',
    port: 3333,
  },

  // buildDir: '/dist',
  app: {
    head: {
      title: 'NuxtApp-Demo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // proxy
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://data.epa.gov.tw/api/v2/',
        changeOrigin: true,
        // nuxt2
        // pathRewrite: {
        //   "^/api": "/",
        // },
      },
    },
  },

  modules: [
    // ...
    '@pinia/nuxt',

    '@element-plus/nuxt',
  ],

  elementPlus: {
    /** Options */
  },
});

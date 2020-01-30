export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/vue-sweetalert2', ssr: false },
        { src: '~/plugins/vue-datepicker', ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://buefy.github.io/#/documentation
        'nuxt-buefy',
        // 'vue-datepicker',
        'vue-sweetalert2/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios', [
            'nuxt-vuex-localstorage',
            {
                localStorage: ['bash'], //  If not entered, “localStorage” is the default value
                keyMixTimes: 64, // number of repetitions of the hash function. Default is set to 64
                KeyLength: 64 // length of the digest. Default is set to 64.
            }
        ]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    // build: {
    //     /*
    //      ** You can extend webpack config here
    //      */
    //     extend(config, ctx) {}
    // }

    build: {
        extend(config) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    }
}
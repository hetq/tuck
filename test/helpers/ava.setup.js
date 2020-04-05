require('browser-env')()
const hooks = require('require-extension-hooks')
const Vue = require('vue')
const Vuetify = require('vuetify')

Vue.config.productionTip = false

Vue.use(Vuetify)

// https://github.com/vuejs/vue-test-utils/issues/974
global.requestAnimationFrame = cb => cb()

// https://github.com/nuxt/create-nuxt-app/issues/180#issuecomment-463069941
window.Date = global.Date = Date

hooks('vue').plugin('vue').push()
hooks(['vue', 'js']).exclude(({ filename }) => filename.match(/\/node_modules\//)).plugin('babel').push()

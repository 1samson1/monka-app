import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'
import {setupI18n} from './i18n'
import lazyload from './plugins/lazyload'
import Initter from './modules/initter'

import './styles/main.css'

// Init locales

var userLang = () =>  navigator.language.substring(0,2) || navigator.userLanguage.substring(0,2) ; 

const i18n = setupI18n({
    locale: localStorage.monka_locale || userLang() || "en",
    fallbackLocale: 'en',
    silentTranslationWarn: true
})

// Init app

const app = createApp(App)

app.use(lazyload, { threshold: 0.25 })
app.use(i18n)   

// Init other

const init = new Initter(app, store)

window.monka = init

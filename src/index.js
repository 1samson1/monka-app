import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'
import {setupI18n} from './i18n'
import lazyload from './plugins/lazyload'

import './styles/main.css'

store.dispatch('fetchEmotes').then(() => {
    console.log('All emotes loaded')
})

var userLang = () =>  navigator.language.substring(0,2) || navigator.userLanguage.substring(0,2); 

const i18n = setupI18n({
    locale: localStorage.monka_locale || userLang() || "en",
    fallbackLocale: 'en',
    silentTranslationWarn: true
})

const createMonka = () => {
    const app = createApp(App)
    
    app.use(lazyload, { threshold: 0.25 })
    app.use(store)
    app.use(i18n)   
    
    return app
}

const mk = createMonka()

mk.mount('.mk-app')

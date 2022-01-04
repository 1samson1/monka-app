import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'
import {setupI18n} from './i18n'
import lazyload from './plugins/lazyload'

import './styles/main.css'

store.dispatch('fetchEmotes')
    .then(() => {
        //console.log(store);
        //console.log(JSON.stringify(store.getters.getEmotes));
        console.log('All emotes loaded')
    })

var userLang = () =>  navigator.language.substring(0,2) || navigator.userLanguage.substring(0,2) ; 

const i18n = setupI18n({
    locale: localStorage.monka_locale || userLang() || "en",
    fallbackLocale: 'en',
    silentTranslationWarn: true
})

const AppInstance = createApp(App)

AppInstance.use(lazyload, { threshold: 0.25 })
AppInstance.use(store)
AppInstance.use(i18n)

AppInstance.mount(".monka")

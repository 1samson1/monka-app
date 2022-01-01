import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'
import lazyload from './plugins/lazyload'

import './styles/main.css'

store.dispatch('fetchEmotes')
    .then(() => console.log('All emotes loaded'))

const AppInstance = createApp(App)

AppInstance.use(lazyload, { threshold: 0.25 })
AppInstance.use(store)

AppInstance.mount(".monka")
import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'

import './styles/main.css'

store.dispatch('fetchGlobalEmotes')

console.log(store)

console.log(PRODUCTION);


const AppInstance = createApp(App)

AppInstance.use(store)

AppInstance.mount(".monka")
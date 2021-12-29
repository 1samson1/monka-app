import {createApp} from 'vue'
import App from '@/App.vue'
import store from '@/store'

import './styles/main.css'

store.dispatch('fetchEmotes')
    .then(() => console.log('All emotes loaded'))

console.log(store)

const AppInstance = createApp(App)

AppInstance.use(store)

AppInstance.mount(".monka")
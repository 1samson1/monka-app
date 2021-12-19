import "@babel/polyfill"

import {createApp} from 'vue'
import App from '@/App.vue'

import './styles/main.css'

const AppInstance = createApp(App)

AppInstance.mount("#monka")
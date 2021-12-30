import Vuex from 'vuex'
import emotes from './modules/emotes.js'
import packs from './modules/packs.js'

export default new Vuex.Store({
    actions:{
        async onChangeActiveView({commit}, view){
            return await commit('changeView', view)
        }
    },
    mutations:{
        changeView(state, newview){
            state.currentView = newview
        }
    },
    state:{
        hostApi:'http://localhost',
        currentView: 'emotes',
    },
    getters:{
        getCurrentView(state){
            return state.currentView
        },
        getHostApi(state){
            return state.hostApi
        }
    },
    modules:{
        emotes, packs
    }
})
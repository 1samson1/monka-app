import Vuex from 'vuex'
import emotes from './modules/emotes.js'


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
        currentView: 'emotes',
    },
    getters:{
        getCurrentView(state){
            return state.currentView
        }
    },
    modules:{
        emotes
    }
})
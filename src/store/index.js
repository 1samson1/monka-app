import Vuex from 'vuex'
import emotes from './modules/emotes.js'


export default new Vuex.Store({
    actions:{
        onChangeActiveView({commit}, view){
            console.log(view);
            commit('changeView', view)
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
export default {
    actions:{
        onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
            commit('changeView', active)
        }
    },
    mutations:{
        changeActiveSection(state, active){
            state.activeSection = active
        }
    },
    state:{
        activeSection: 'emotes',
    },
    getters:{
        getActiveSection(state){
            return state.activeSection
        }
    },
}
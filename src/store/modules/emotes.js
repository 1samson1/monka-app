export default {
    actions:{
        onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
            commit('changeActiveSection', active)
        }
    },
    mutations:{
        changeActiveSection(state, active){
            state.activeSection = active
        }
    },
    state:{        
        activeSection: 'recently',
    },
    getters:{
        getActiveSection(state){
            return state.activeSection
        }
    },
}
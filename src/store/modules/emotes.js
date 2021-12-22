export default {
    actions:{
        onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
            commit('changeActiveSection', active)
        }
    },
    mutations:{
        toggleScrollOff(state, enable){
            state.scrollOff = enable
        },
        changeActiveSection(state, active){
            state.activeSection = active
        }
    },
    state:{    
        scrollOff: false,    
        activeSection: 'recently',
    },
    getters:{
        getActiveSection(state){
            return state.activeSection
        },
        getScrollOff(state){
            return state.scrollOff
        }
    },
}
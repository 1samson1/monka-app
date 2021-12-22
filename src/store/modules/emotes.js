export default {
    actions:{
        async onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
           return await commit('changeActiveSection', active)
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
export default {
    actions:{
        async onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
           return await commit('changeActiveSection', active)
        },
        async fetchGlobalEmotes({commit}){
            fetch('https://api.betterttv.net/3/cached/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalEmotes', j))

            fetch('https://api.betterttv.net/3/cached/frankerfacez/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalFrankerFacezEmotes', j))
        }

    },
    mutations:{
        setGlobalEmotes(state, emotes){
            state.emotes.global = {
                title: "BetterTTV Global",
                brand: "betterttv",
                emotes
            }
        },
        setGlobalFrankerFacezEmotes(state, emotes){
            state.emotes.globalFrankerFacez =  {
                title: "FrankerFacez Global",
                brand: 'frankerfacez',
                emotes
            }
        },        
        changeActiveSection(state, active){
            state.activeSection = active
        }
    },
    state:{    
        emotes: {
            recently:{
                icon: 'schedule',
                title: 'recently',
                emotes: [],
            },
            favorites:{
                icon: 'favorite',
                title: 'favorites',
                emotes: [],
            },
        },
        activeSection: 'recently',
    },
    getters:{
        getActiveSection(state){
            return state.activeSection
        },
        getEmoteSections(state){
            return state.emotes
        }
    },
}
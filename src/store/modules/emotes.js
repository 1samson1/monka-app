export default {
    actions:{
        async onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
           return await commit('changeActiveSection', active)
        },
        async fetchGlobalEmotes({commit, getters}){
            fetch('https://api.betterttv.net/3/cached/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalEmotes', j))

            fetch('https://api.betterttv.net/3/cached/frankerfacez/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalFrankerFacezEmotes', j))

            fetch(getters.getHostApi + '/emotes/twitch/global')
                .then(r => r.json())
                .then(j => commit('setGlobalTwitchEmotes', j.data))
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
        setGlobalTwitchEmotes(state, emotes){
            let _emotes = Array.from(emotes).map( item => {
                return item = {
                    id: item.id,
                    code: item.name,
                    images: {
                        "1x": item.images.url_1x,
                        "2x": item.images.url_2x,
                        "4x": item.images.url_4x,
                    }
                }
            })

            state.emotes.globalTwitch = {
                title: "Twitch Global",
                brand: "twitch_light",
                emotes: _emotes
            }
        },
        setGlobalFrankerFacezEmotes(state, emotes){
            console.log(emotes);
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
        },
    },
}
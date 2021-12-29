export default {
    actions:{
        async onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
           return await commit('changeActiveSection', active)
        },
        async fetchGlobalEmotes({commit, getters}){
            fetch('https://api.betterttv.net/3/cached/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalBetterTTVEmotes', j))

            fetch('https://api.betterttv.net/3/cached/frankerfacez/emotes/global')
                .then(r => r.json())
                .then(j => commit('setGlobalFrankerFacezEmotes', j))

            fetch(getters.getHostApi + '/emotes/twitch/global')
                .then(r => r.json())
                .then(j => commit('setGlobalTwitchEmotes', j.data))
        },
        async searchEmotes({commit}, search){
            if(search.trim() === '') return

            return await commit('setSearchEmotes', search)
        }

    },
    mutations:{
        setGlobalBetterTTVEmotes(state, emotes){
            emotes = Array.from(emotes).map( item => {
                item.images = {
                    "1x": `https://cdn.betterttv.net/emote/${item.id}/1x`,
                    "2x": `https://cdn.betterttv.net/emote/${item.id}/2x`,
                    "3x": `https://cdn.betterttv.net/emote/${item.id}/3x`,
                }
                
                return item 
            })
            
            state.emotes.push({
                title: "BetterTTV Global",
                brand: "betterttv",
                emotes
            })
        },
        setGlobalFrankerFacezEmotes(state, emotes){
            state.emotes.push({
                title: "FrankerFacez Global",
                brand: 'frankerfacez',
                emotes
            })
        },
        setGlobalTwitchEmotes(state, emotes){
            emotes = Array.from(emotes).map( item => {
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

            state.emotes.push({
                title: "Twitch Global",
                brand: "twitch_light",
                emotes: emotes
            })
        },     
        changeActiveSection(state, active){
            state.activeSection = active
        },
        setSearchEmotes(state, search){
            let emotes = []

            Array.from(state.emotes).forEach( section => {
                Array.from(section.emotes).forEach( emote => {
                    if(emote.code.indexOf(search) > -1) emotes.push(emote)
                })
            })

            state.searchEmotes = emotes
        }
    },
    state:{    
        searchEmotes: [],
        emotes: [
            {
                icon: 'schedule',
                title: 'recently',
                emotes: [],
            },
        ],
        activeSection: 'recently',
    },
    getters:{
        getActiveSection(state){
            return state.activeSection
        },
        getEmoteSections(state){
            return state.emotes
        },
        getSearchEmotes(state){
            return state.searchEmotes
        }
    },
}
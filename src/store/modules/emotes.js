export default {
    actions:{
        async onChangeActiveSection({commit}, {active}){
            if(!active) return;
            
           return await commit('changeActiveSection', active)
        },
        async fetchEmotes({commit, getters, dispatch}){
            const promises = [
                fetch('https://api.betterttv.net/3/cached/emotes/global')
                    .then(r => r.json())
                    .then(j => commit('setBetterTTVEmotes', {
                        id: "bttv",
                        title: "BetterTTV Global",
                        emotes: j
                    })),

                fetch('https://api.betterttv.net/3/cached/frankerfacez/emotes/global')
                    .then(r => r.json())
                    .then(j => commit('setFrankerFacezEmotes', {
                        id: "ffz",
                        title: "FrankerFacez Global",
                        emotes: j
                    })),

                fetch(getters.getHostApi + '/emotes/twitch/global')
                    .then(r => r.json())
                    .then(j => commit('setTwitchEmotes', {
                        id: "twitch",
                        title: "Twitch Global",
                        emotes: j.data
                    }))
            ]

            Array.from(getters.getPacks).forEach( pack => {
                promises.push(dispatch('fetchChannelEmotes', pack))
            })

            return promises
        },
        async fetchChannelEmotes({commit}, pack){
            const sets = {}

            sets.bttv = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${pack.id}`)
                .then( r => {
                    return new Promise((resolve, reject) => {
                        if(r.ok){
                            return resolve(r)
                        }
                        
                        return reject(r)
                    })
                })
                .then(r => r.json())
                .then(j => [...j.channelEmotes, ...j.sharedEmotes])
            sets.ffz = await fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${pack.id}`).then(r => r.json())
                
            commit('setBetterTTVEmotes', {
                id: `${pack.name}_bttv`,
                avatar: pack.avatar,
                title: pack.display_name,
                emotes: sets.bttv
            })

            commit('setFrankerFacezEmotes', {
                id: `${pack.name}_ffz`,
                avatar: pack.avatar,
                title: pack.display_name,
                emotes: sets.ffz
            })
        },
        async onRemoveEmotes({commit}, pack){
            return await commit('removeEmotes', pack)
        },
        async searchEmotes({commit}, search){
            if(search.trim() === '') return

            return await commit('setSearchEmotes', search.toLowerCase())
        }
    },
    mutations:{
        setBetterTTVEmotes(state, {id, avatar, title, emotes}){
            emotes = Array.from(emotes).map( item => {
                item.images = {
                    "1x": `https://cdn.betterttv.net/emote/${item.id}/1x`,
                    "2x": `https://cdn.betterttv.net/emote/${item.id}/2x`,
                    "3x": `https://cdn.betterttv.net/emote/${item.id}/3x`,
                }
                
                return item 
            })

            const set = {
                id,
                title,
                brand: "betterttv",
                emotes
            }

            if(avatar) set.avatar = avatar
            
            state.emoteSections.push(set)
        },
        setFrankerFacezEmotes(state, {id, avatar, title, emotes}){
            const set = {
                id,
                title,
                brand: 'frankerfacez',
                emotes
            }

            if(avatar) set.avatar = avatar

            state.emoteSections.push(set)
        },
        setTwitchEmotes(state, {id ,avatar, title, emotes}){
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

            const set = {
                id,
                title,
                brand: "twitch_light",
                emotes: emotes
            }

            if(avatar) set.avatar = avatar

            state.emoteSections.push(set)
        },        
        setSearchEmotes(state, search){
            let emotes = []

            Array.from(state.emoteSections).forEach( section => {
                Array.from(section.emotes).forEach( emote => {
                    if(emote.code.toLowerCase().indexOf(search) > -1) emotes.push(emote)
                })
            })

            state.searchEmotes = emotes
        },
        removeEmotes(state, pack){
            state.emoteSections = Array.from(state.emoteSections).filter( section => {
                const listProvide = [
                    `${pack.name}_bttv`,
                    `${pack.name}_ffz`
                ]

                return listProvide.indexOf(section.id) === -1
            })
        },
        changeActiveSection(state, active){
            state.activeSection = active
        }
    },
    state:{    
        searchEmotes: JSON.parse(localStorage.monka_recently || '[]'),
        emoteSections: [
            {
                id: "recently",
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
            return state.emoteSections
        },
        getSearchEmotes(state){
            return state.searchEmotes
        }
    },
}
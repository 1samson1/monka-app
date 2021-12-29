export default {
    actions: {
        async searchPacks({commit, getters}, search){
            return fetch(getters.getHostApi + '/channels/search/?query=' + search)
                .then(res => res.json())
                .then(j => commit('setSearchPacks', j.data))
        },
        onAddPack({commit}, pack){
            pack = {
                id: pack.id,
                display_name: pack.display_name,
                name: pack.name,
                avatar: pack.avatar,
                url: pack.url
            }

            commit('addPack', pack)
        },
        onRemovePack({commit}, pack){
            commit('removePack', pack)
        }
    },
    mutations: {
        setSearchPacks(state, packs){
            packs = Array.from(packs).map( pack => {
                return {
                    id: pack.id,
                    display_name: pack.display_name,
                    name: pack.broadcaster_login,
                    avatar: pack.thumbnail_url,
                    title: pack.title,
                    url: `https://twitch.tv/${pack.broadcaster_login}`
                }
            })

            state.searchPacks = packs
        },
        addPack(state, pack){
            state.packs.push(pack)
            localStorage.monka_packs = JSON.stringify(state.packs)
        },
        removePack(state, pack){
            state.packs = Array.from(state.packs).filter( item => item.id !== pack.id)
            localStorage.monka_packs = JSON.stringify(state.packs)
        }
    },
    state: {
        searchPacks: [],
        packs: JSON.parse(localStorage.monka_packs || '[]')
    },
    getters: {
        getSearchPacks(state){
            return state.searchPacks
        },
        getPacks(state){
            return Array.from(state.packs).reverse()
        }
    }
}
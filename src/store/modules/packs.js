export default {
    actions: {
        searchPacks({commit, getters}, search){
            fetch(getters.getHostApi + '/channels/search/?query=' + search)
                .then(res => res.json())
                .then(j => commit('setSearchPacks', j.data))
        }
    },
    mutations: {
        setSearchPacks(state, packs){
            console.log(packs);

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
        }
    },
    state: {
        searchPacks: [],
        packs: JSON.parse(localStorage.monka_packs || '[]')
    },
    getters: {
        getSearchPacks(state){
            return state.searchPacks
        }
    }
}
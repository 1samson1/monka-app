<template>
    <Navigation @changeActive="onChangeActiveView" />
    <component :is="views[getCurrentView]"></component>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

import Emotes from '@/views/Emotes.vue'
import Search from '@/views/Search.vue'
import Settings from '@/views/Settings.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            views:{
                emotes: Emotes,
                settings: Settings,
                search: Search,
            }
        }
    },
    methods:{
        ...mapActions([
            'onChangeActiveView'
        ])
    },
    computed:{
        ...mapGetters([
            'getCurrentView'
        ])
    },
    
    components: {Navigation, Emotes}

}
</script>
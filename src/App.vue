<template>
    <Navigation @scrollSection="onScrollSection" />
    <div class="containerView">
        <keep-alive>
            <transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
            >
                <component class="view" ref="view" :is="getView"></component>
            </transition> 
        </keep-alive>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

import Emotes from '@/views/Emotes.vue'
import Search from '@/views/Search.vue'
import Settings from '@/views/Settings.vue'
import {mapGetters} from 'vuex'

export default {
    methods:{
        onScrollSection(active){
            this.$refs.view.scrollTo(active);
        }
    },
    computed:{
        getView() {
            return this.getCurrentView.toLowerCase()
        },
        ...mapGetters([
            'getCurrentView'
        ])
    },
    
    components: {Navigation, Emotes, Search, Settings}

}
</script>
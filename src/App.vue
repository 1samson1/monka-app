<template>
    <Navigation @scroll-section="onScrollSection" @change-view="onChangeView" />
    <div class="containerView">
        <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
        >
            <keep-alive>
                <component :is="getView" ref="view" class="view" />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"

import Emotes from "@/views/Emotes.vue"
import Packs from "@/views/Packs.vue"
import Settings from "@/views/Settings.vue"
import { mapGetters } from "vuex"

export default {    
    components: { Navigation, Emotes, Packs, Settings },
    computed: {
        getView() {
            return this.getCurrentView.toLowerCase()
        },
        ...mapGetters(["getCurrentView"]),
    },
    methods: {
        onChangeView(){
            if(this.$refs.view.clearSearch) this.$refs.view.clearSearch()
        },
        onScrollSection(active) {            
            this.$refs.view.scrollTo(active)
        },
    },
}
</script>

<template>
    <Navigation @scroll-section="onScrollSection" />
    <div class="containerView">
        <keep-alive>
            <transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
            >
                <component :is="getView" ref="view" class="view" />
            </transition>
        </keep-alive>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue"

import Emotes from "@/views/Emotes.vue"
import Search from "@/views/Search.vue"
import Settings from "@/views/Settings.vue"
import { mapGetters } from "vuex"

export default {
    components: { Navigation, Emotes, Search, Settings },
    computed: {
        getView() {
            return this.getCurrentView.toLowerCase()
        },
        ...mapGetters(["getCurrentView"]),
    },
    methods: {
        async onScrollSection(active) {
            await this.$refs.view.clearSearch()
            await this.$refs.view.scrollTo(active)
        },
    },
}
</script>

<template>
    <div class="section" :data-section="section.id" >
        <div class="section__header">
            <div class="section__brand">
                <div v-if="section.avatar" class="section__channel">
                    <img class="channel_image" :src="section.avatar" />
                    <img class="channel_image brand" :src="getBrandLogo" />
                </div>
                <img v-else-if="section.brand" class="channel_image" :src="getBrandLogo" />
                <div v-else class="material-icons md-18">
                    {{ section.icon }}
                </div>
            </div>
            <div class="section__title">
                {{ section.title }}
            </div>
        </div>
        <div class="section__content" v-if="isShow">
            <Emote
                v-for="emote in section.emotes"
                :key="emote._id"
                :emote="emote"
            />
        </div>
    </div>
</template>

<script>
import assets from "@/assets/index.js"
import Emote from "./Emote.vue"
import { mapGetters } from "vuex"

export default {
    name: "EmoteSection",
    components: {
        Emote,
    },
    props: {
        section: Object,
    },
    computed: {
        isShow(){
            return this.section.emotes.length > 0
        },
        getBrandLogo() {
            return this.getHostApi + assets.logos[this.section.brand]
        },
        ...mapGetters(["getHostApi"]),
    },
}
</script>

<template>
    <div class="section" :data-section="section.title">
        <div class="section__header">
            <div class="section__brand">
                <div v-if="section.avatar" class="section__channel">
                    <img class="channel_image" :src="section.avatar">
                    <img class="channel_image brand" :src="getLogos[section.brand]">
                </div>
                <img v-else-if="section.brand" class="channel_image" :src="getLogos[section.brand]">
                <div v-else class="material-icons md-18">{{section.icon}}</div>
            </div>
            <div class="section__title">{{section.title}}</div>
        </div>
        <div class="section__content">
            <Emote v-for="emote in section.emotes" :key="emote.id" :emote="emote" /> 
        </div>
    </div>
</template>

<script>
import assets from '@/assets/index.js'
import Emote from './Emote.vue'

export default {
    props:{
        section: Object
    },
    computed:{
        getLogos(){
            return assets.logos
        }
    },
    components:{
        Emote
    }
}
</script>

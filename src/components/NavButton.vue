<template>
    <button :class="getClasses" type="button" class="to-section">
        <div v-if="avatar" class="section__channel">
            <img class="channel_image" :src="avatar">
            <img class="channel_image brand" :src="getLogos[brand]">
        </div>
        <img v-else-if="brand" class="channel_image" :src="getLogos[brand]">
        <div v-else class="material-icons">{{icon}}</div>
    </button>
</template>

<script>
import assets from '@/assets/index.js'

export default {    
    props:{
        brand: String,
        avatar: String,
        active: Boolean,
        icon: String,
    }, 
    computed:{
        getLogos(){
            return assets.logos
        },
        getClasses(){
            return {
                "active": this.active
            }
        }
    },
}
</script>

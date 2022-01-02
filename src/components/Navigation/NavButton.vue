<template>
    <button 
        type="button" 
        class="to-section"

        ref="button"

        :class="getClasses"

        @mouseover="onHover"
        @mouseleave="onLeave"
    >
        <div v-if="avatar" class="section__channel">
            <img class="channel_image" :src="avatar" />
            <img class="channel_image brand" :src="getBrandLogo" />
        </div>
        <img v-else-if="brand" class="channel_image" :src="getBrandLogo" />
        <div v-else class="material-icons">
            {{ icon }}
        </div>
    </button>
</template>

<script>
import assets from "@/assets"
import { mapGetters } from "vuex"

export default {
    props: {
        id: String,
        brand: String,
        avatar: String,
        active: Boolean,
        title: String,
        translate: {
            type: Boolean,
            default: true
        },
        translatePath: {
            type: String,
            default: ""
        },
        icon: String,
    },
    emits: ['nav-button-hover', 'nav-button-leave'],
    computed: {
        getBrandLogo() {
            return this.getHostApi + assets.logos[this.brand]
        },
        getClasses() {
            return {
                active: this.active,
            }
        },
        getTitle(){
            if(this.translate){
                return this.$t(`${this.translatePath}.${this.title}`)
            }
            return this.title
        },
        getId() {
            return this.id
        },
        ...mapGetters(["getHostApi"]),
    },
    methods: {
        onHover(){
            this.$emit('nav-button-hover', {
                el: this.$refs.button,
                text: this.getTitle
            })
        },
        onLeave(){
            this.$emit('nav-button-leave')
        }
    }
}
</script>

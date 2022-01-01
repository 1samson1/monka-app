<template>
    <div class="recent__info">
        <img :src="image" alt="" class="recent__img">
        <div class="recent__description">
            <div class="recent__name">{{ getRecentEmote.code }}</div>
            <div class="recent__from">{{ from }}</div>
        </div>
    </div>
</template>

<script>
import assets from '@/assets'
import { mapGetters } from 'vuex'

export default {
    name: "EmoteInfo",    
    computed: {
        image() {
            if("images" in this.getRecentEmote){
                 if(this.getRecentEmote.images['2x']){
                    return this.getRecentEmote.images["2x"];
                }
                if(this.getRecentEmote.images["1x"]){
                    return this.getRecentEmote.images["1x"];
                }
            }

            return assets.thumbs.sqrt;
        },
        from(){
            return `from ${this.getRecentEmote.from}`
        },
        ...mapGetters(["getRecentEmote"])
    }
}
</script>

<template>
    <div class="emote" @mouseover="onHover" @click="onClick">
        <img v-lazy :src="thumb" :data-src="image" :alt="emote.code" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import assets from '@/assets'

export default {
    name: "EmoteItem",
    props: {
        emote: Object,
    },
    computed: {
        image() {
            return this.emote.images["1x"];
        },
        thumb() {
            return assets.thumbs.sqrt
        }
    },
    methods: {
        onClick(){
            this.onAddRecentlyEmote(this.emote)
        },
        onHover(){
            this.onChangeRecentEmote(this.emote)
        },
        ...mapActions(['onChangeRecentEmote', 'onAddRecentlyEmote'])
    }
};
</script>

<template>
    <div class="emote" @mouseover="onHover" @click="onClick">
        <img :src="image" :alt="emote.code" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "EmoteItem",
    props: {
        emote: Object,
    },
    computed: {
        image() {
            return this.emote.images["1x"];
        },
    },
    methods: {
        onClick(){
            console.log(this.emote.code);
        },
        onHover(){
            this.onChangeRecentEmote(this.emote)
        },
        ...mapActions(['onChangeRecentEmote'])
    }
};
</script>

<template>
    <div class="emote">
        <img :src="image" :alt="emote.code" />
    </div>
</template>

<script>
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
};
</script>

<style scoped>
.emote {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
}

.emote img {
    max-width: 100%;
    max-height: 100%;
    display: block;
}
</style>

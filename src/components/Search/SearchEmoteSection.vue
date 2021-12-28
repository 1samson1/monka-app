<template>
    <div class="section">
        <div class="section__content">
            <Emote
                v-for="emote in emotes"
                :key="emote.id"
                :emote="emote"
            />
        </div>
    </div>
</template>

<script>
import Emote from "@/components/Emotes/Emote.vue"

export default {
    name: 'SearchEmoteSection',
    props: {
        emotes: Array
    },
    components: { Emote }
}
</script>

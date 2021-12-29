<template>
    <div class="section empty">
        <Loader v-show="loading" />
        <div v-show="!loading" class="empty__text">{{ title }}</div>
     </div>
</template>

<script>
import Loader from '@/components/Other/Loader.vue'

export default {
    name: 'EmptySection',
    components: { Loader },
    props: {
        title: {
            type: String,
            default: 'empty'
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

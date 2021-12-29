<template>
    <div class="section">
        <div class="pack__header">
            <img class="pack__avatar" :src="pack.avatar" >
            <a :href="pack.url" class="pack__name">{{ pack.display_name }}</a>
        </div>
        <div v-show="pack.title" class="pack__content">{{ pack.title }}</div>
    </div>
</template>

<script>
export default {
    name: "PackSection",
    props: {
        pack: Object,
    }
}
</script>

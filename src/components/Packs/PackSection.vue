<template>
    <div class="section">
        <div class="pack__header">
            <img class="pack__avatar" :src="pack.avatar" >
            <a :href="pack.url" class="pack__name">{{ pack.display_name }}</a>
            <button type="button" class="pack__toggle" :class="toggleClasses" @click="togglePack">
                <div class="material-icons md-18">{{ toggleIcon }}</div>
            </button>
        </div>
        <div v-show="pack.title" class="pack__content">{{ pack.title }}</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "PackSection",
    props: {
        pack: Object,
    },
    computed: {
        isInclude(){
            return Array.from(this.getPacks).some( pack => pack.id === this.pack.id)
        },
        toggleClasses(){
            return {
                delete: this.isInclude
            }
        },
        toggleIcon(){
            return this.isInclude ? 'delete_outline' : 'add'
        },
        ...mapGetters(['getPacks'])
    },
    methods: {
        togglePack(){
            if(this.isInclude){
                return this.onRemovePack(this.pack)
            }

            return this.onAddPack(this.pack)
        },
        ...mapActions(['onAddPack', 'onRemovePack'])
    }
}
</script>

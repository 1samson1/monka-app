<template>
    <div class="bg-none">
        <SearchInput v-model:value="search" :large="true" placeholder="Search packs" />
        <div class="sections scroll">
            <PackSection 
                v-for="pack in getSearchPacks"
                :key="pack.id"
                :pack="pack"
            />
        </div>
    </div>
</template>

<script>
import SearchInput from '@/components/Search/SearchInput.vue'
import SearchEmoteSection from '@/components/Search/SearchEmoteSection.vue'
import SearchEmpty from '@/components/Search/SearchEmpty.vue'
import PackSection from '@/components/Packs/PackSection.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "PacksView",
    components: {
        PackSection, SearchInput, SearchEmoteSection, SearchEmpty
    },
    data(){
        return {
            search: '',
            searching: false,
            searchTimer: null,
        }
    },
    watch:{
        search(newVal){
            if(this.searchTimer) clearTimeout(this.searchTimer)

            if(newVal.trim() === '') return this.searching = false

            this.searchTimer = setTimeout(() => {
                this.searchPacks(newVal)
                this.searching = true
            }, 500);
        }
    },
    computed:{
        ...mapGetters(['getSearchPacks'])
    },
    methods:{
        ...mapActions(['searchPacks'])
    }
};
</script>

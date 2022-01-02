<template>
    <div class="bg-none">
        <SearchInput v-model:value="search" :large="true" :placeholder="$t('search.packs')" />
        <div v-show="!searching" class="sections scroll">
            <div class="packs" v-if="getPacks.length > 0">
                <PackSection
                    v-for="pack in getPacks"
                    :key="pack.id"
                    :pack="pack"
                />
            </div>
            <EmptySection :title="$t('empty.packs')" v-else />
        </div>
        <div v-show="searching" class="sections scroll">
            <div class="searched" v-if="getSearchPacks.length > 0">
                <PackSection 
                    v-for="pack in getSearchPacks"
                    :key="pack.id"
                    :pack="pack"
                />
            </div>
            <EmptySection :loading="loading" :title="$t('notfound.packs')" v-else />
        </div>
    </div>
</template>

<script>
import SearchInput from '@/components/Search/SearchInput.vue'
import SearchEmoteSection from '@/components/Search/SearchEmoteSection.vue'
import EmptySection from '@/components/Other/EmptySection.vue'
import PackSection from '@/components/Packs/PackSection.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "PacksView",
    components: {
        PackSection, SearchInput, SearchEmoteSection, EmptySection
    },
    data(){
        return {
            search: '',
            searching: false,
            loading: false,
            searchTimer: null,
        }
    },
    watch:{
        search(newVal){
            if(this.searchTimer) clearTimeout(this.searchTimer)

            if(newVal.trim() === '') return this.searching = false

            this.searchTimer = setTimeout(() => {
                this.loading = true
                this.searching = true
                this.searchPacks(newVal)
                    .then(() => this.loading = false)
            }, 500);
        }
    },
    computed:{
        ...mapGetters(['getSearchPacks', 'getPacks'])
    },
    methods:{
        clearSearch(){
            this.search = '';
            this.searching = false;
        },
        ...mapActions(['searchPacks'])
    }
};
</script>

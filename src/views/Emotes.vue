<template>
    <div class="bg-none">
        <SearchInput v-model:value="search" :large="true" :placeholder="$t('search.emotes')" />
        <div ref="boxSections" v-show="!searching" class="sections scroll" @scroll="onScroll">
            <EmoteSection
                ref="sections"
                v-for="section in getEmoteSections"
                :key="section.title"
                :section="section"
            />
        </div>
        <div v-show="searching" class="search scroll">
            <SearchEmoteSection
                v-if="getSearchEmotes.length > 0"
                :emotes="getSearchEmotes"
            />
            <EmptySection :title="$t('notfound.emotes')" v-else />
        </div>
        <EmoteInfo />
    </div>
</template>

<script>
import SearchInput from '@/components/Search/SearchInput.vue'
import SearchEmoteSection from '@/components/Search/SearchEmoteSection.vue'
import EmoteSection from "@/components/Emotes/EmoteSection.vue"
import EmoteInfo from "@/components/Emotes/EmoteInfo.vue"
import EmptySection from '@/components/Other/EmptySection.vue'
import { mapGetters, mapActions } from "vuex"
import { gsap } from "gsap"

export default {
    name: "EmotesView",
    components: {
        EmoteSection, EmoteInfo, SearchEmoteSection, EmptySection, SearchInput
    },
    data() {
        return {
            search: '',
            searching: false,
            scrollOff: false,
        };
    },
    watch:{
        search(newVal){
            if(newVal.trim() === '') return this.searching = false 

            this.searchEmotes(newVal)

            this.searching = true
        }
    },
    computed: {
        ...mapGetters(["getActiveSection", "getEmoteSections", "getSearchEmotes"]),
    },
    methods: {
        onScroll(e) {
            if (this.scrollOff) return;

            let el = e.target,
                cur_pos = el.scrollTop

            Array.from(this.$refs.sections).forEach((sec) => {
                let top = sec.$el.offsetTop - 30,
                    bottom = top + sec.$el.offsetHeight;

                if (
                    top <= cur_pos &&
                    cur_pos < bottom &&
                    this.getActiveSection != sec.getId
                ) {
                    this.onChangeActiveSection(sec.getId);
                }
            });
        },
        scrollTo(active) {
            let section = this.$refs.sections.find( sec => sec.getId === active).$el

            this.scrollOff = true;

            gsap.to(this.$refs.boxSections, {
                duration: 0.8,
                scrollTop: section.offsetTop,
                ease: "power2.out",
                onComplete: () => {
                    this.scrollOff = false;
                },
            });
        },
        clearSearch(){
            this.search = '';
            this.searching = false;
        },
        ...mapActions(["onChangeActiveSection", "searchEmotes"]),
    }
};
</script>

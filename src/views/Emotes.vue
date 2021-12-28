<template>
    <div class="container-emotes">
        <SearchInput v-model:value="search" :large="true" placeholder="Search" icon="search" />
        <div ref="sections" v-if="!searching" class="sections scroll" @scroll="onScroll">
            <EmoteSection
                v-for="section in getEmoteSections"
                :key="section.title"
                :section="section"
            />
        </div>
        <div v-else class="search scroll">
             <SearchEmoteSection
                :emotes="getSearchEmotes"/>
        </div>
    </div>
</template>

<script>
import SearchInput from '@/components/Search/SearchInput.vue'
import SearchEmoteSection from '@/components/Search/SearchEmoteSection.vue'
import EmoteSection from "@/components/Emotes/EmoteSection.vue"
import { mapGetters, mapActions } from "vuex"
import { gsap } from "gsap"

export default {
    name: "EmotesView",
    components: {
        EmoteSection, SearchInput, SearchEmoteSection
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

            if(newVal.trim() === ''){
                this.searching = false 
                return this.onChangeActiveSection({ active: 'recently'})
            } 

            this.searchEmotes(newVal)

            this.onChangeActiveSection({ active: "search"});

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
                cur_pos = el.scrollTop,
                sections = el.childNodes;

            Array.from(sections).forEach((el) => {
                let top = el.offsetTop - 30,
                    bottom = top + el.offsetHeight;

                if (
                    top <= cur_pos &&
                    cur_pos < bottom &&
                    this.getActiveSection != el.dataset.section
                ) {
                    this.onChangeActiveSection({
                        active: el.dataset.section,
                    });
                }
            });
        },
        scrollTo(active) {
            let section = this.$refs.sections.querySelector(
                `[data-section="${active}"]`
            );

            this.scrollOff = true;

            gsap.to(this.$refs.sections, {
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

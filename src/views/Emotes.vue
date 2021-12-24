<template>
    <div ref="sections" class="sections scroll" @scroll="onScroll">
        <EmoteSection  
            v-for="section in getEmoteSections"
            :key="section.title"
            :section="section"
        />
    </div>
</template>

<script>
import {gsap} from 'gsap'
import EmoteSection from '@/components/Emotes/EmoteSection.vue'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    data(){
        return {
            scrollOff: false,
        }
    },
    methods:{
        onScroll(e){
            if(this.scrollOff) return; 

            let el = e.target, 
                cur_pos = el.scrollTop,
                sections = el.childNodes        

            Array.from(sections).forEach( el => {
                let top = el.offsetTop - 30,
                    bottom = top + el.offsetHeight;
                
                if (top <= cur_pos && cur_pos < bottom && this.getActiveSection != el.dataset.section){
                    this.onChangeActiveSection({
                        active: el.dataset.section
                    })                
                }
            })
        },
        scrollTo(active){
            let section = this.$refs.sections.querySelector(`[data-section="${active}"]`);

            this.scrollOff = true

            gsap.to( this.$refs.sections, {
                duration: 0.5,
                scrollTop: section.offsetTop,
                onComplete: () => {this.scrollOff = false},
            })
        },
        ...mapActions([
            'onChangeActiveSection'
        ]),        
    },
    computed:{
        ...mapGetters([
            'getActiveSection',
            'getEmoteSections',
        ])
    },
    components:{
        EmoteSection
    }
}
</script>

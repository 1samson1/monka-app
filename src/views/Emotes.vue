<template>
    <div ref="sections" class="sections scroll" @scroll="onScroll">
        <div class="section" data-section="recently">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="3">Recently</div>
        <div class="section" data-section="favorites">Favorites</div>
    </div>
</template>

<script>
import {gsap} from 'gsap'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    mounted(){

    },   
    methods:{
        onScroll(e){
            if(this.getScrollOff) return; 

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

            this.toggleScrollOff(true)

            gsap.to( this.$refs.sections, {
                duration: 0.5,
                scrollTop: section.offsetTop,
                onComplete: () => this.toggleScrollOff(false),
            })
        },
        ...mapActions([
            'onChangeActiveSection'
        ]),
        ...mapMutations([
            'toggleScrollOff'
        ])
    },
    computed:{
        ...mapGetters([
            'getActiveSection',
            'getScrollOff',
        ])
    }

}
</script>

<template>
    <div class="sections scroll" @scroll="onScroll">
        <div class="section" data-section="recently">Recently</div>
        <div class="section" data-section="favorites">Favorites</div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    mounted(){

    },   
    methods:{
        onScroll(e){
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
        ...mapActions([
            'onChangeActiveSection'
        ]),
    },
    computed:{
        ...mapGetters([
            'getActiveSection'
        ])
    }

}
</script>

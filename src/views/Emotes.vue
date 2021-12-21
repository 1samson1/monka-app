<template>
    <div class="sections scroll" @scroll="onScroll">
        <div class="section" data-section="first">First</div>
        <div class="section" data-section="second">Second</div>
        <div class="section" data-section="third">Third</div>
        <div class="section" data-section="fourth">Fourth</div>
        <div class="section" data-section="fifth">Fifth</div>
    </div>
</template>

<script>
export default {
    mounted(){

    },
    data(){
        return {
            name: 'emotes',
            currentActive: 'gg',
        }
    },
    methods:{
        onScroll(e){
            let el = e.target, 
                cur_pos = el.scrollTop,
                sections = el.childNodes        

            Array.from(sections).forEach( el => {
                let top = el.offsetTop - 30,
                    bottom = top + el.offsetHeight;
                
                if (top <= cur_pos && cur_pos < bottom && this.currentActive != el.dataset.section){
                    this.currentActive = el.dataset.section

                    this.$emit('changeActiveSection', {
                        active: this.currentActive,
                        view: this.name    
                    })                    
                }
            })
        }
    }
}
</script>

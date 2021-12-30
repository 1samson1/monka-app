<template>
    <div class="tooltip" :style="styleObj" :class="classList">
        <div class="pointer"></div>
        <div class="tooltip__text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: "NavTooltip",
    data(){
        return{
            visible: false,
            text: '',
            top: 0,
        }
    },
    computed: {
        styleObj(){
            return {
                top: `${this.top}px`
            }
        },
        classList(){
            return {
                show: this.visible
            }
        }
    },
    methods: {
        show({text, el, offset}){
            this.top = el.offsetTop + el.offsetWidth / 2

            if(offset){
                this.top -= offset
            }

            this.text = text
            this.visible = true
        },
        hide(){
            this.visible = false
        }
    }
}
</script>

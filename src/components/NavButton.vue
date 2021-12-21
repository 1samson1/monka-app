<template>
    <button :class="getClasses" type="button" data-to-section="first" class="to-section">
        <span class="material-icons">{{icon}}</span>
    </button>
</template>

<script>
export default {
    props:{
        value: String,
        active: Boolean,
        icon: String,
    },    
    computed:{
        getClasses(){
            return {
                "active": this.active
            }
        }
    },
}
</script>

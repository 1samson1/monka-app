<template>
    <div class="form-group">
        <div class="icon">
            <div class="material-icons">search</div>
        </div>
        <input 
            class="form-control icon-item" 
            type="text"

            :placeholder="placeholder"
            :class="classList" 

            @input="updateValue($event.target.value)"
            
            :value="value"            
        />
        <button v-show="value" type="button" class="delete" @click="onDelete">
            <div class="material-icons md-18">close</div>
        </button>
    </div>
</template>

<script>
export default {
    name: "SearchInput",
    props: {
        large: {
            type: Boolean,
            default: false
        },        
        placeholder: String,
        value: String
    },
    computed:{
        classList(){
            return {
                large: this.large
            }
        }
    },
    methods:{
        updateValue(value){
            this.$emit('update:value', value)
        },    
        onDelete(){
            this.$emit('update:value', '')
        }
    }
}
</script>

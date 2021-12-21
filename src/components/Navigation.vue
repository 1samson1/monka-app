<template>
    <div class="navigation">
        <div class="nav-section emotes" 
            @click="onChangeActiveView('emotes')
        ">
            <NavButton icon="schedule" />
            <NavButton icon="favorite" />
        </div>
        <div class="nav-section">
            <NavButton  
                v-for="item in buttons"

                :key="item.icon"
                :value="icon"
                :icon="item.icon"
                :active="getCurrentView === item.icon"

                @click="onChangeActiveView(item.icon)"
            />
            
        </div>
    </div>
</template>

<script>
import NavButton from './NavButton.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            buttons:[
                {
                    icon: 'search'
                },
                {
                    icon: 'settings'
                },
            ]
        }
    },
    methods: {
        onClickButton(e, t){
            console.log(e, t);
        },
        ...mapActions([
            'onChangeActiveView'
        ])
    },
    computed:{
        ...mapGetters([
            'getCurrentView'
        ])
    },
    components: {
        NavButton,
    }
}
</script>

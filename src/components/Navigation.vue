<template>
    <div class="navigation">
        <div class="nav-section emotes" >
            <NavButton  
                v-for="item in sections"

                :key="item.icon"                
                :icon="item.icon"
                :active="getActiveSection === item.value && isEmoteSection"

                @click="onClickButtonSection(item.value)"
            />
        </div>
        <div class="nav-section">
            <NavButton  
                v-for="item in buttons"

                :key="item.icon"                
                :icon="item.icon"
                :active="getCurrentView === item.icon"

                @click="onChangeActiveView(item.icon)"
            />
            
        </div>
    </div>
</template>

<script>
import { eventBus } from '@/index.js'
import NavButton from './NavButton.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    data(){
        return {
            sections: [
                {
                    icon: 'schedule',
                    value: 'recently'
                },
                {
                    icon: 'favorite',
                    value: 'favorites'
                },
            ],
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
        onClickButtonSection(active){
            this.onChangeActiveView('emotes')
            this.onChangeActiveSection({active})
        },
        ...mapActions([
            'onChangeActiveView',
            'onChangeActiveSection',
        ])
    },
    computed:{
        isEmoteSection(){
            return this.getCurrentView === 'emotes'
        },
        ...mapGetters([
            'getCurrentView',
            'getActiveSection',
        ])
    },
    components: {
        NavButton,
    }
}
</script>

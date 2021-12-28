<template>
  <div class="navigation">
    <div class="nav-section emotes">
      <NavButton  
        v-for="item in getEmoteSections"

        :key="item.icon"                
        :icon="item.icon"
        :brand="item.brand"
        :avatar="item.avatar"
        :active="getActiveSection === item.title && isEmoteSection"

        @click="onClickButtonSection(item.title)"
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
import NavButton from './NavButton.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "NavigationBar",
    components: {
        NavButton,
    },
    emits:['scroll-section'],
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
    computed:{
        isEmoteSection(){
            return this.getCurrentView === 'emotes'
        },
        ...mapGetters([
            'getEmoteSections',
            'getCurrentView',
            'getActiveSection',
        ])
    },
    methods: {
        onClickButtonSection(active){
            this.onChangeActiveView('emotes')
                .then(() => this.$emit('scroll-section', active))
            this.onChangeActiveSection({active})
        },
        ...mapActions([
            'onChangeActiveView',
            'onChangeActiveSection',
        ])
    }
}
</script>

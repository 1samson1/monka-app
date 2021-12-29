<template>
  <div class="navigation">
    <div class="nav-section emotes">
        <NavButton  
            v-for="item in getEmoteSections"

            :key="item.icon"                
            :icon="item.icon"
            :brand="item.brand"
            :avatar="item.avatar"
            :active="getActiveSection === item.id && isEmoteSection"

            @click="onClickButtonSection(item.id)"
        />
    </div>
    <div class="nav-section">
      <NavButton  
        v-for="item in buttons"

        :key="item.icon"                
        :icon="item.icon"
        :active="getCurrentView === item.view"

        @click="onChangeView(item.view)"
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
    emits:['scroll-section', 'change-view'],
    data(){
        return {
            buttons:[
                {
                    icon: 'auto_awesome_motion',
                    view: 'packs'
                },
                {
                    icon: 'settings',
                    view: 'settings'
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
            this.onChangeView('emotes')
                .then(() => this.$emit('scroll-section', active))
            this.onChangeActiveSection({active})
        },
        async onChangeView(active){
            await this.onChangeActiveView(active)
            await this.$emit('change-view', active)
        },
        ...mapActions([
            'onChangeActiveView',
            'onChangeActiveSection',
        ])
    }
}
</script>

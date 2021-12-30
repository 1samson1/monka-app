<template>
  <div class="navigation">
    <div class="nav-section emotes" ref="navEmotes">
        <NavButton  
            v-for="item in getEmoteSections"

            :key="item.id"                
            :icon="item.icon"
            :title="item.title"
            :brand="item.brand"
            :avatar="item.avatar"
            :active="getActiveSection === item.id && isEmoteSection"

            @click="onClickButtonSection(item.id)"
            @nav-button-hover="onNavHover($event, true)"
            @nav-button-leave="onNavLeave"
        />
    </div>
    <div class="nav-section">
        <NavButton  
            v-for="item in buttons"

            :key="item.icon"                
            :icon="item.icon"
            :title="item.title"
            :active="getCurrentView === item.view"

            @click="onChangeView(item.view)"
            @nav-button-hover="onNavHover($event, false)"
            @nav-button-leave="onNavLeave"
        />
    </div>
    <NavTooltip ref="tooltip" />
  </div>
</template>

<script>
import NavButton from './NavButton.vue'
import NavTooltip from './NavTooltip.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "NavigationBar",
    components: {
        NavButton, NavTooltip
    },
    emits:['scroll-section', 'change-view'],
    data(){
        return {
            buttons:[
                {
                    title: 'Packs',
                    icon: 'auto_awesome_motion',
                    view: 'packs'
                },
                {
                    title: 'Settings',
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
        onNavHover(e, offset){
            if(offset) e.offset = this.$refs.navEmotes.scrollTop

            this.$refs.tooltip.show(e)
        },
        onNavLeave(){
            this.$refs.tooltip.hide()
        },
        onClickButtonSection(active){
            this.onChangeView('emotes')
                .then(() => this.$emit('scroll-section', active))
            this.onChangeActiveSection(active)
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

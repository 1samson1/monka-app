<template>
  <div class="navigation">
    <div class="nav-section emotes" ref="navEmotes">
        <NavButton  
            ref="navEmoteBtns"

            v-for="item in getEmoteSections"

            :key="item.id"                
            :id = item.id
            :icon="item.icon"
            :title="item.title"
            :translate="item.translateTitle"
            translatePath="sections"
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
            :id="item.view"            
            :icon="item.icon"
            :title="item.view"
            translatePath="views"
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
import {gsap} from 'gsap'

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
    watch: {
        getActiveSection(newVal){
            let navEmoteScrollBottom = this.$refs.navEmotes.scrollTop + this.$refs.navEmotes.offsetHeight,
                navBtn = this.$refs.navEmoteBtns.find( btn => btn.getId === newVal).$el,
                navBtnOffsetBottom = navBtn.offsetTop + navBtn.offsetHeight

            if(this.$refs.navEmotes.scrollTop > navBtn.offsetTop){
                this.scrollTo(navBtn.offsetTop)
            }

            if(navEmoteScrollBottom  < navBtnOffsetBottom){
                this.scrollTo(navBtnOffsetBottom - navEmoteScrollBottom + this.$refs.navEmotes.scrollTop)
            }
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
        scrollTo(offset){
            gsap.to(this.$refs.navEmotes, {
                duration: 0.8,
                scrollTop: offset,
                ease: "power2.out",
            });
        },
        onNavHover(e, offset){
            if(offset) e.offset = this.$refs.navEmotes.scrollTop - this.$refs.navEmotes.offsetTop

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

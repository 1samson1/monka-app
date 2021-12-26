<template>
  <button
    :class="getClasses"
    type="button"
    class="to-section"
  >
    <div
      v-if="avatar"
      class="section__channel"
    >
      <img
        class="channel_image"
        :src="avatar"
      >
      <img
        class="channel_image brand"
        :src="getBrandLogo"
      >
    </div>
    <img
      v-else-if="brand"
      class="channel_image"
      :src="getBrandLogo"
    >
    <div
      v-else
      class="material-icons"
    >
      {{ icon }}
    </div>
  </button>
</template>

<script>
import assets from '@/assets/index.js'
import { mapGetters } from 'vuex'

export default {    
    props:{
        brand: String,
        avatar: String,
        active: Boolean,
        icon: String,
    }, 
    computed:{
        getBrandLogo(){            
            return this.getHostApi + assets.logos[this.brand]
        },
        getClasses(){
            return {
                "active": this.active
            }
        },
        ...mapGetters([
            'getHostApi'
        ]),
    },
}
</script>

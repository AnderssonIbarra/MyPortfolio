<template>
  <section>
    <Buttons v-if="animationToolsComplete" @clickButtonLeft="clickButtonLeft = true, clickButtonRight = false" @clickButtonRight="clickButtonRight = true, clickButtonLeft = false"></Buttons>
    <Info v-if="clickButtonLeft" @animationInfoComplete="animationInfoComplete = true"></Info>
    <Tools v-if="animationInfoComplete && clickButtonLeft" @animationToolsComplete="animationToolsComplete = true"></Tools>
    <Experience v-if="clickButtonRight"></Experience>
  </section>
</template>

<script>
import Info from '@/components/Info.vue'
import Tools from '@/components/Tools.vue'
import Buttons from '@/components/Buttons.vue'
import Experience from '../components/Experience.vue'

export default{
    name: 'about',
    components: {
        Info,
        Tools,
        Buttons,
        Experience
    },
    data() {
      return {
        animationInfoComplete: false,
        animationToolsComplete: false,
        clickButtonLeft: true,
        clickButtonRight: false
      }
    },
}
</script>
<template>
    <button v-if="activateButtonLeft" class="arrow absolute top-1/2 left-33 w-25 h-25 transform -translate-y-1/2 rotate-180 cursor-pointer hover:scale-105 z-10" @click="clickButtonLeft">
        <img src="/images/arrow.png" id="arrow" alt="Flecha izquierda">
    </button>
    <button v-if="activateButtonRight" class="arrow absolute top-1/2 right-33 w-25 h-25 transform -translate-y-1/2 cursor-pointer hover:scale-105 z-10" @click="clickButtonRight">
        <img src="/images/arrow.png" id="arrow" alt="Flecha derecha">
    </button>
</template>

<script>
import gsap from 'gsap'

export default {
    name: 'Buttons',
    data(){
        return {
            activateButtonLeft: false,
            activateButtonRight: true,
        }
    },
    mounted(){
      if(this.animationInfoComplete){
      }
      this.animationButton();
    },
    methods: {
      animationButton(){
        gsap.from("#arrow", {
          opacity: 0,
          duration: 0.5,
          scale: 0.8,
        })
      },
      clickButtonRight(){
        this.activateButtonLeft = true;
        this.activateButtonRight = false;
        this.$emit("clickButtonRight");
      },
      clickButtonLeft(){
        this.activateButtonLeft = false;
        this.activateButtonRight = true;
        this.$emit("clickButtonLeft");
      }
    }
}
</script>
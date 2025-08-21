<template>
  <section>
    <video class="fixed inset-0 w-full h-full object-cover" muted autoplay loop>
        <source src="/video_body.webm" type="video/webm">
    </video>
    <div class="relative flex items-center justify-center h-screen">
      <div v-if="isloading" class="absolute inset-0 flex flex-col items-center justify-center">
        <h1 id="text-loading" class="text-black font-Conthrax font-bold text-6xl">CARGANDO ...</h1>
        <div class="w-1/2 h-1/10 border-4 border-black p-1">
          <div class="h-full bg-black animate-loading"></div>
        </div>
      </div>
      <div id="main-container" class="bg-black/90 m-5 p-2 rounded-xl overflow-hidden">
        <div class="border-2 border-white/50 w-full h-full rounded-xl p-2">
          <Navbar v-if="isNavbarVisible" @animationComplete="animationComplete = true"/>
          <router-view v-if="animationComplete"></router-view>
        </div>
      </div>
    </div>
  </section>

  
</template>

<script>
  import gsap from 'gsap'
  import Navbar from '@/components/Navbar.vue'
  import { SplitText } from 'gsap/SplitText';

  gsap.registerPlugin(SplitText);

  export default {
    name: 'App',
    components: {
      Navbar
    },
    data() {
      return {
        isloading: true, // valor para mostrar el texto de carga
        isNavbarVisible: false, //valor para controlar la visibilidad de la barra de navegación
        animationComplete: false, //valor para controlar si la animación ha terminado y activar el contenido
      }
    },
    methods: {
      //Animación del contenido principal y el texto de carga
      animateContent() {
        let tl = gsap.timeline();
        const loading = document.getElementsByClassName("animate-loading")
        const textLoading = new SplitText('#text-loading', { type: "chars"});


        tl.from(textLoading.chars, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.05,
          ease: "power1.out",
        })
        tl.from(loading, {
          width: "0%",
          duration: 1,
          onComplete: () => {
            this.isloading = false;
          }
        }, ">")
        tl.fromTo("#main-container",{
          opacity: 0,
          width: "0%",
        },{
          opacity: 1,
          width: "80%",
          duration: 0.3,
        }, ">");
        tl.to("#main-container", {
          height: "90%",
          duration: 0.8,
          onComplete: () => {
            this.isNavbarVisible = true;
          }
        }, ">");
      }
    },
    mounted() {
      //Cargar animaciones del texto de carga y el contenido después de que carguen las fuentes
      document.fonts.ready.then(() => {
        this.animateContent()
       })
    }
  }
</script>


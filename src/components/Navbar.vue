<template>
    <nav class="flex flex-col items-center py-4">
        <ul class="flex w-1/2 mb-5 justify-between font-Conthrax">
            <li v-for="link in links" :key="link.name">
                <router-link :to="{ name: link.to }" :class="link.class +' text-white text-lg'">{{ link.name }}</router-link>
            </li>
        </ul>
        <div id="navbar-border" class="border-1 border-white/50"></div>
    </nav>
</template>

<script>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin)


export default {
  name: 'Navbar',
  data(){
    return {
      links: [
        { name: 'Sobre mí', to: 'about', class: 'sobre-mi' },
        { name: 'Proyectos', to: 'projects', class: 'proyectos' },
        { name: 'Contacto', to: 'contact', class: 'contacto' }
      ]
    }
  },
  mounted(){
    //Cargue de animación de los links esperando a las fuentes
    document.fonts.ready.then(() => {
      this.animateText();
    });
    //Activar animación de hover
    this.activateHoverAnimation();
  },
  methods: {
    //Función para animar el texto de los links
    animateText() {
      this.links.forEach(link => {
        //Se crea una instancia de SplitText para cada link
        const mySplitText = new SplitText(`.${link.class}`, { type: "lines"});
        //se crea un timeline
        let tl = gsap.timeline();

        tl.to("#navbar-border", {
          width: "80%",
          opacity: 1,
          duration: 1,
        });
        tl.fromTo(mySplitText.lines, 
        {
          opacity: 0,
        },
        {
          scrambleText: {
            text: link.name,
            chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
            speed: 0.5,
            revealDelay: 0.5,
          },
          opacity: 1,
          duration: 2,
          stagger: {
            amount: 0.5,
            from: "start"
          },
          onComplete: () => {
            //Emitir valor al padre para informar que la animación termino
            this.$emit('animationComplete', true)
          }
        }, ">");
        
      });
    },

    //Función para activar la animación con el hover
    activateHoverAnimation() {
      this.links.forEach(link => {
        const mySplitText = document.querySelector(`.${link.class}`)

        //Función del efecto de scramble si no hay animación en curso
        function scrambleEffect(){
          if (!gsap.isTweening(mySplitText)) {
          gsap.to(mySplitText, {
            scrambleText: {
              text: link.name,
              chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
              speed: 0.5,
              revealDelay: 0.5,
            },
            duration: 0.8,
            stagger: {
              amount: 0.5,
              from: "start"
            },
          });
          }
        }
        //se agrega el evento de mouseenter
        mySplitText.addEventListener("mouseenter", scrambleEffect);
      })
    }
  },
}
</script>
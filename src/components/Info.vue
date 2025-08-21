<template>
    <section class="flex justify-between items-center text-white py-5 px-20">
        <div class="w-1/3 items-center justify-center flex">
            <img src="/images/Photo.png" alt="Foto de perfil" id="profile-photo" class="w-50 object-cover mask-b-from-85%">
        </div>
        <div  class="w-2/3">
            <span id="info-text" class="font-Quantico text-lg">Hola, me llamo <strong>Andersson Stiven Ibarra Mora</strong>, soy Ingeniero de Software y desarrollador Full Stack con una gran pasión por crear experiencias web completas y funcionales. Mi objetivo es construir soluciones robustas y escalables que combinen un diseño atractivo con una funcionalidad impecable. </span><span id="cursor">|</span>
        </div>
    </section>
</template>

<script>
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default{
    name: 'info',
    data(){
        return {
            showInfo: false,
        }
    },
    mounted() {
        this.animateText();
    },
    methods: {
        animateText(){
            let tl = gsap.timeline({repeat: -1, repeatDelay: 1});
            let infoText = new SplitText("#info-text", { type: "words, chars" });
            const cursor = document.getElementById("cursor");
            const photoPerfil = document.getElementById("profile-photo")

            //Animación de la imagen
            tl.from(photoPerfil, {
                opacity: 0,
                scale: 0.8,
                duration: 0.7
            });
            // Animación del texto
            tl.from(infoText.chars, {
                opacity: 0,
                y: 20,
                duration: 0.05,
                stagger: 0.02,
                ease: "power1.out",
                onComplete: () => {
                    infoText.revert();
                    this.$emit('animationInfoComplete', true) //Emitir final de animación a About.vue
                }
                
            }, ">")
            //Animación del cursor que parpadea
            tl.from(cursor, {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            }, ">")
        }
    }
}
</script>
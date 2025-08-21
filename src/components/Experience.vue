<template>
    <div class="flex flex-col w-full text-white items-center align-center">
        <h1 class="title text-3xl font-Conthrax">Experiencia Laboral</h1>
        <ul class="list-disc pl-5">
            <li v-for="exp in experiences" :key="exp.id" class="exp mt-5">
                <h2 class="text-xl font-Conthrax font-bold">{{ exp.company }}</h2>
                <p class="text-md font-Quantico font-bold">{{ exp.role }}</p>
                <p class="text-md font-Quantico">{{ exp.duration }}</p>
                <p class="text-md font-Quantico">{{ exp.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default {
    name: 'Experience',
    data() {
        return {
            experiences: [
                { id: 1, company: 'Universidad Surcolombiana', role: 'Estudiante de ingeniería de software', duration: 'Jul 2017 - Dic 2022', description: 'Participé en proyectos académicos y desarrollé habilidades en programación y diseño de software.' },
                { id: 2, company: 'Conexiones Empresariales S.A.S', role: 'Desarrollador Fullstack', duration: 'Ene 2023 - Presente', description: 'Desarrollador de aplicaciones web utilizando tecnologías como Vue.js y Node.js.' },
            ]
        }
    },
    mounted() {
        this.animateExperience();
    },
    methods: {
        animateExperience() {
            let tl = gsap.timeline();
            let title = new SplitText(".title", { type: "chars"})
            let exp = document.querySelectorAll(".exp")

            tl.from(title.chars, {
                scrambleText:{
                    text: title.innerText,
                    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
                    speed: 0.5,
                    revealDelay: 0.5,
                },
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power1.out",
                onComplete: () => {
                    title.revert();
                }
            });
            tl.from(exp, {
                opacity: 0,
                duration: 0.8,
                y: 20,
                stagger: 0.5
            }, ">");
        }
    }
}
</script>
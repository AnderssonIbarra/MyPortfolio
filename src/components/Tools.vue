<template>
    <div class="tools-container text-white w-full flex flex-col justify-center items-center">
        <h2 id="tools-title" class="text-2xl font-Conthrax font-bold mb-4">Herramientas</h2>
        <div class="flex justify-between w-9/10 gap-2">
            <div v-for="tool in tools" :id="'tool-' + tool.id" :key="tool.id" class="p-2 flex flex-col items-center">
                <img :src="tool.logo" :alt="'Logo de ' + tool.name" class="w-15 h-15 mb-1">
                <h3 class="text-lg font-Quantico">{{ tool.name }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default {
    name: 'Tools',
    data(){
        return {
            tools: [
                { id: 1, name: 'Astro', logo: '/svg/astro.svg'},
                { id: 2, name: 'Vue', logo: '/svg/vuejs.svg'},
                { id: 3, name: 'React', logo: '/svg/react.svg'},
                { id: 4, name: 'CSS', logo: '/svg/css3.svg'},
                { id: 5, name: 'Github', logo: '/svg/github.svg'},
                { id: 6, name: 'JavaScript', logo: '/svg/javascript.svg'},
                { id: 7, name: 'Html5', logo: '/svg/html.svg'},
            ],
            BASE: import.meta.env.VITE_BASE_URL,
        }
    },
    mounted(){
        this.animateTools();
    },
    methods: {
        
        //Animación de los Tools y el titulo
        animateTools() {
            const tl = gsap.timeline();
            const toolTitle = document.getElementById("tools-title");
            const splitTitle = new SplitText(toolTitle, { type: "chars" });
            const lengthTools = this.tools.length;

            tl.from(splitTitle.chars, {
                scrambleText:{
                    text: toolTitle.innerText,
                    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()",
                    speed: 0.5,
                    revealDelay: 0.5,
                },
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power1.out",
            });
            this.tools.forEach((tool, index) => {
                const toolElement = document.getElementById(`tool-${tool.id}`);
                tl.from(toolElement, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: "power1.out",
                    onComplete: () => {
                        if(lengthTools === index + 1) {
                            this.$emit("animationToolsComplete", true);
                        }
                    }
                }, ">");
            });
            
        },
    }
}
</script>
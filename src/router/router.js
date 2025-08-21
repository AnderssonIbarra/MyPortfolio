import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: `/`, component: () => import('@/views/About.vue'), name: 'about' },
    { path: `/projects`, component: () => import('@/views/Projects.vue'), name: 'projects' },
    { path: `/contact`, component: () => import('@/views/Contact.vue'), name: 'contact' },
    { path: `/:pathMatch(.*)*`, component: () => import('@/views/404.vue'), name: '404' }
]

const router = createRouter({ 
    routes,
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
})

export default router
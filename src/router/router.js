import { createRouter, createWebHistory } from 'vue-router'
const BASE = import.meta.env.BASE || ''

const routes = [
    { path: `${BASE}/`, component: () => import('@/views/About.vue'), name: 'about' },
    { path: `${BASE}/projects`, component: () => import('@/views/Projects.vue'), name: 'projects' },
    { path: `${BASE}/contact`, component: () => import('@/views/Contact.vue'), name: 'contact' },
    { path: `${BASE}/:pathMatch(.*)*`, component: () => import('@/views/404.vue'), name: '404' }
]

const router = createRouter({ 
    routes,
    history: createWebHistory(),
})

export default router
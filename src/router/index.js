import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), 
    routes: [ 
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/admin/',
            name: 'Admin',
            component: () => import('../views/Admin.vue')
        },
        {
            path: '/student/',
            name: 'Student',
            component: () => import('../views/Student.vue')
        },
        {
            path: '/teacher/',
            name: 'Teacher',
            component: () => import('../views/Teacher.vue')
        },
        {
            path: '/:pathMatch(.*)*', // '/:catchAll(.*)'
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router

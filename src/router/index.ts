import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'emptyForms',
        component: () => import('@/pages/EmptyFormPage.vue')
    },
    {
        path: '/filledForms',
        name: 'filledForms',
        component: () => import('@/pages/FilledFormsPage.vue')
    },
    {
        path: '/slotForms',
        name: 'slotForms',
        component: () => import('@/pages/SlotFormsPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
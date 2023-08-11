import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/index.vue'),
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

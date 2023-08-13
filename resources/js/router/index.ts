import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStores } from "../store/store";
import { storeToRefs } from "pinia";
// const { isAuth } = storeToRefs(stores);
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/index.vue'),
        beforeEnter: (to, from, next) => {
            const stores = useStores();
            const { auth } = storeToRefs(stores);
            if (!auth.value) {
                // redirect the user to the login page
                router.push('/auth/login');
            } else {
                next();
            }
        },
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "about" */ '../pages/auth/Login.vue'),
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/Register.vue'),
    },
    // {
    //     path: '/:NotFound(.*)*',
    //     component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue')
    // },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

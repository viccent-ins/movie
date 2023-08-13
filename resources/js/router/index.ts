import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStores } from "../store/store";
import { storeToRefs } from "pinia";
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/index.vue'),
        beforeEnter: (to, from, next) => {
            const { isAuth } = storeToRefs(useStores());
            if (!isAuth.value) {
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
        meta: { layout: 'BlankLayout' },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/auth/Login.vue'),
        beforeEnter: (to, from, next) => {
            const { isAuth } = storeToRefs(useStores());
            if (isAuth.value) {
                // redirect the user to the login page
                router.push('/');
            } else {
                next();
            }
        },
    },
    {
        path: '/auth/register',
        name: 'register',
        meta: { layout: 'BlankLayout' },
        component: () =>
            import(/* webpackChunkName: "about" */ '@/pages/auth/Register.vue'),
        beforeEnter: (to, from, next) => {
            const { isAuth } = storeToRefs(useStores());
            if (isAuth.value) {
                // redirect the user to the login page
                router.push('/');
            } else {
                next();
            }
        },
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

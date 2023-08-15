import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStores } from "../store/store";
import { storeToRefs } from "pinia";
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'quest corridor',
        meta: {
            needAuths: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/index.vue'),
    },
    {
        path: '/active-member',
        name: 'active-member',
        meta: {
            needAuths: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/active-member.vue'),
    },
    {
        path: '/cooperate-film',
        name: 'cooperate-film',
        meta: {
            needAuths: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/cooperate-film.vue'),
    },
    {
        path: '/auth/login',
        name: 'login',
        meta: {
            layout: 'BlankLayout'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/auth/login.vue'),

    },
    {
        path: '/auth/register',
        name: 'register',
        meta: {
            layout: 'BlankLayout'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/auth/Register.vue'),
    },
    // {
    //     path: '/:NotFound(.*)*',
    //     component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue')
    // },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});
router.beforeEach((to, from, next) => {
    // only redirect to 'Home'
    // if we're not already on it
    const { isAuth } = storeToRefs(useStores());
    if (to.meta.needAuths) {
      if (isAuth.value) {
          next();
      } else {
          next('/auth/login');
      }
    } else {
       next();
    }
})
export default router;

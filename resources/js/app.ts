import { createApp } from 'vue';
import App from './App.vue'
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import i18n from './i18n';
import router from './router';
import piniaPersist from 'pinia-plugin-persist';
const pinia = createPinia()
import fontAwesome from './font-awesome';
createApp(App)
    .use(ElementPlus)
    .use(i18n)
    .component('font-awesome-icon', fontAwesome)
    .use(pinia.use(piniaPersist)).use(router)
    .mount('#app');

import { createApp } from 'vue';
import App from './App.vue'
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
const pinia = createPinia()
pinia.use(piniaPersist)
import fontAwesome from './font-awesome';
import i18n from './i18n';
import router from './router';
createApp(App).use(pinia).use(router)
    .use(ElementPlus)
    .use(i18n)
    .component('font-awesome-icon', fontAwesome)
    .mount('#app');

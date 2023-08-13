import { createApp } from 'vue';
import App from './App.vue'
import '../css/colorConfig.scss';
import { createPinia } from 'pinia';
import i18n from './i18n';
import router from './router';
import piniaPersist from 'pinia-plugin-persist';
const pinia = createPinia()
import fontAwesome from './font-awesome';
createApp(App)
    .use(i18n)
    .component('font-awesome-icon', fontAwesome)
    .use(pinia.use(piniaPersist)).use(router)
    .mount('#app');

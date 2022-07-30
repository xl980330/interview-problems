import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'uno.css';
import router from '@/router/index';

createApp(App).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

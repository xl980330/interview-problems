import { createApp } from 'vue';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'uno.css';
import router from '@/router/index';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
const store = createPinia();

createApp(App)
.use(router)
.use(store.use(piniaPluginPersist))
.use(ElementPlus, { size: 'small', zIndex: 3000 })
.mount('#app')

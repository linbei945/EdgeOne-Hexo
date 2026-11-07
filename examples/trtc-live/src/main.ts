import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { Button, Dialog, Input, Alert } from 'tdesign-vue-next';
import router from './router/index';
import i18n from './locales';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(router);
app.use(Button)
app.use(Dialog)
app.use(Input)
app.use(Alert)
app.use(i18n);
app.use(createPinia());
app.mount('#app');

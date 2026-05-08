import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import clickOutside from './directives/clickOutside';
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.directive('click-outside', clickOutside);
app.use(createPinia());
app.mount('#app')

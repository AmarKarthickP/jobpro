import './index.css'

import { createApp } from 'vue'
import router from './router'
import clickOutside from './directives/clickOutside';
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.directive('click-outside', clickOutside);
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')

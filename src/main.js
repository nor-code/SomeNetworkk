import Vue from 'vue'
import App from './App.vue'

import router from './router.js'
import {store} from './store/store.js'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

window.vue = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#myapp')

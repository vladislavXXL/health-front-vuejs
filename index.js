import Vue from 'vue'
import App from './src/components/App.vue'
//import router from './router'
//import store from './store'

new Vue({
    el: "#app",
    render: h => h(App)
});

Vue.config.productionTip = false

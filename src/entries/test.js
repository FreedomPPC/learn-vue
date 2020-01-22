import 'css/common';
import Vue from 'vue';
import App from '../pages/Test.vue';

Vue.config.productionTip = false;

new Vue({
    render: h=> h(App)
}).$mount('#app');

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: ()=> import('@/pages/Index.vue')
        },
        {
            path: '/functional-page',
            name: 'FunctionalPage',
            component: ()=> import('@/pages/FunctionalPage.vue')
        }
    ]
});

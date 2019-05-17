import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: (resolve) => require(['../views/Home.vue'], resolve),
            meta: {
                title: '早起打卡赚现金',
            },
        },
        {
            path: '/detail',
            name: 'detail',
            component: (resolve) => require(['../views/Detail.vue'], resolve),
            meta: {
                title: '我的战绩',
            },
        },
        {
            path: '/prayDetail',
            name: 'prayDetail',
            component: (resolve) => require(['../views/PrayDetail.vue'], resolve),
            meta: {
                title: '收支明细',
            },
        },
        {
            path: '/rule',
            name: 'rule',
            component: (resolve) => require(['../views/Rule.vue'], resolve),
            meta: {
                title: '活动规则',
            },
        },
        {
            path: '/pray',
            name: 'pray',
            component: (resolve) => require(['../views/Pray.vue'], resolve),
            meta: {
                title: '支付收银台',
            },
        },
        {
            path: '/prayResult',
            name: 'prayResult',
            component: (resolve) => require(['../views/PrayResult.vue'], resolve),
            meta: {
                title: '支付成功',
            },
        },
        {
            path: '/forward',
            name: 'forward',
            component: (resolve) => require(['../views/Forward.vue'], resolve),
            meta: {
                title: '提现',
            },
        },
        {
            path: '/alipray',
            name: 'alipray',
            component: (resolve) => require(['../views/Alipray.vue'], resolve),
            meta: {
                title: '支付宝提现',
            },
        },
        {
            path: '/aliprayResult',
            name: 'aliprayResult',
            component: (resolve) => require(['../views/AliprayResult.vue'], resolve),
            meta: {
                title: '提现结果详情',
            },
        },
        {
            path: '/selfSelect',
            name: 'selfSelect',
            component: (resolve) => require(['../views/SelfSelect.vue'], resolve),
            meta: {
                title: '确认支付结果',
            },
        },
        {
            path: '/prayFailed',
            name: 'prayFailed',
            component: (resolve) => require(['../views/PrayFailed.vue'], resolve),
            meta: {
                title: '支付失败',
            },
        },
        {
            path: '/freeJoin',
            name: 'freeJoin',
            component: (resolve) => require(['../views/FreeJoin.vue'], resolve),
            meta: {
                title: '支付收银台',
            },
        },
    ],
});

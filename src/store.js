import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        userId: '',
        appId: '',
        orderId: '',
        deviceType: window.navigator.userAgent.includes('Android') ? 'Android' : 'IOS',
    },
    mutations: {
        updateToken(state, p) {
            state.token = p;
        },
        updateUserId(state, p) {
            state.userId = p;
        },
        updateAppId(state, p) {
            state.appId = p;
        },
        updateOrderId(state, p) {
            state.orderId = p;
        },
    },
    actions: {},
});

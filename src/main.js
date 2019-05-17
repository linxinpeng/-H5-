import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import MessageBox from 'element-ui';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();


//import 'element-ui/lib/theme-chalk/index.css';

// Vue.prototype.$alert = MessageBox.alert;
// Vue.use(MessageBox);

Vue.config.productionTip = false;
let arr = window.location.href.split('?')[1].split('&');
arr.map((item, index) => {
  if (item.includes('userid')) {
    store.commit('updateUserId', item.split('=')[1]);
  }
  if (item.includes('token')) {
    store.commit('updateToken', item.split('=')[1]);
  }
  if (item.includes('appid')) {
    store.commit('updateAppId', item.split('=')[1]);
  }
  if (item.includes('orderid')) {
    store.commit('updateOrderId', item.split('=')[1]);
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const hackIframe = document.createElement('iframe');
      hackIframe.style.display = 'none';
      hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
      document.body.appendChild(hackIframe);
      setTimeout(_ => {
        document.body.removeChild(hackIframe)
      }, 300)
    }
    var iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    };
    document.body.appendChild(iframe);
  }
  // console.log(from)
    next();

});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

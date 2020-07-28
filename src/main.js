import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AWS from "aws-sdk";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import VCalendar from "v-calendar";

AWS.config.update({
  accessKeyId: "AKIAYBOEYGIAND3EWQJ4",
  secretAccessKey: "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",
  region: "ap-northeast-1",
});

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(AWS);
Vue.use(VueToast);
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

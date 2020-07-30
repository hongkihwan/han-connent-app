import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AWS from "aws-sdk";
import vueMoment from "vue-moment";
import moment from "moment";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import VueSweetalert2 from 'vue-sweetalert2';

AWS.config.update({
  accessKeyId: "AKIAYBOEYGIAND3EWQJ4",
  secretAccessKey: "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",
  region: "ap-northeast-1",
});

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(AWS);
Vue.use(VueToast);
Vue.use(VueSweetalert2);
Vue.use(vueMoment, moment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

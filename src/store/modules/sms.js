import Vue from "vue";
import Vuex from "vuex";

import { fetchSms } from '@/api/sms.js'

Vue.use(Vuex);

const state = () => ({
  counter: 34,
});

const getters = {
  getCounter(state) {
    console.log("[campaign/geters] getCounter : ", state.counter);
    return state.counter;
  },
};

const mutations = {
  
};

const actions = {
  // api 처리할때,
  async actionSmsApi({commmit, state}, payload) {
    console.log("========== [sms/actions/actionSmsApi] ==========");
      await fetchSms(payload).catch((error) => {
        console.log("[API ERROR] sms/actionSmsApi : ", error);
      });
    return context.commmit("increments");
  },
  minusCounter(context) {
    console.log("========== [campaing/actions/minusCounter] ==========");
    return context.commmit("decrements");
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

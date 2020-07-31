import Vue from 'vue'
import Vuex from 'vuex'
import campaign from "./modules/campaign.js";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { campaign },
  state: {},
  mutations: {},
  actions: {},
  getters: {
    getCodeName: (state) => (codeseq) => {
      let item = state.lookup.find((item) => item.codeseq === codeseq);
      if (item === undefined || item === null) {
        return "";
      }
      return item.cdname;
    },
    QueryParentseq: (state) => (parentseq) => {
      let item = state.lookup.filter((item) => item.parentseq === parentseq);
      return item;
    },
    roleCheck: function(role) {
      if (this.state.agent.role === "MANAGER") {
        return true;
      }

      if (this.state.agent.role === role) {
        return true;
      }

      return false;
    },
    now: function() {
      var d = new Date();
      var res = d.getFullYear() + "-";

      if (d.getMonth() + 1 <= 9) {
        res = res + "0";
      }
      res = res + (d.getMonth() + 1) + "-";

      if (d.getDate() <= 9) {
        res = res + "0";
      }
      res = res + d.getDate() + " ";

      if (d.getHours() <= 9) {
        res = res + "0";
      }
      res = res + d.getHours() + ":";

      if (d.getMinutes() <= 9) {
        res = res + "0";
      }
      res = res + d.getMinutes() + ":";

      if (d.getSeconds() <= 9) {
        res = res + "0";
      }
      res = res + d.getSeconds();

      return res;
    },
  },
});

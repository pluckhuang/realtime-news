import Vue from "vue";
import VueHead from "vue-head";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueHead);

new Vue({
  render: function (h) {
    return h(App);
  }
}).$mount("#app");

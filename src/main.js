// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import api from "./api/api";
import store from "./store/index";
import "../theme/index.css";

Vue.use(ElementUI);
// Vue.prototype.TWebLive = TWebLive
Vue.config.productionTip = false;

Vue.prototype.api = api;

/* eslint-disable no-new */
let vm = new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
export default vm;

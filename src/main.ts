import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "@/Firebase";
import bootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
//eslint-disable-next-line
// @ts-ignore 
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);

Vue.config.productionTip = false;
let app: unknown;

Vue.use(bootstrapVue);

auth.onAuthStateChanged(user => {
  if (user) store.dispatch("fetchUser");
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { auth } from "@/Firebase";

Vue.config.productionTip = false;
let app: unknown;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});

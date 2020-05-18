import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "@/Firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      access: "all"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/Login.vue"),
    meta: {
      access: "guest",
      layout: "Auth"
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/user/Signup.vue"),
    meta: {
      access: "guest",
      layout: "Auth"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const access = to.meta.access;
  const user = auth.currentUser;
  if (user && access == "guest") next("/");
  else if (!user && access == "user") next("/login");
  else next();
});

export default router;

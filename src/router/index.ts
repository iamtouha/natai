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
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      access: "all"
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/user/Dashboard.vue"),
    meta: {
      access: "user"
    }
  },
  {
    path: "/users/:id",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/user/Profile.vue"),
    meta: {
      access: "all"
    }
  },
  {
    path: "/new-article",
    name: "NewArticle",
    component: () =>
      import(/* webpackChunkName: "new_article" */ "../views/posts/Create.vue"),
    meta: {
      access: "user"
    }
  },
  {
    path: "/edit/:id",
    name: "EditArticle",
    component: () =>
      import(/* webpackChunkName: "new_article" */ "../views/posts/Edit.vue"),
    meta: {
      access: "user"
    }
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () =>
      import(/* webpackChunkName: "article" */ "../views/posts/Article.vue"),
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const access = to.meta.access;
  const user = auth.currentUser;

  if (access == "all") next();
  else if (user && access == "guest") next("/");
  else if (!user && access == "user") next("/login");
  else next();
});

export default router;

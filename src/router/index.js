import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import store from "@/store/index.js";
console.log(store);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true, isShow: true },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { requiresAuth: false, isShow: true },
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("../views/MenuView.vue"),
      meta: { requiresAuth: true, isShow: true },
      children: [
        {
          path: ":id",
          name: "menu-category",
          component: () => import("../views/CategoryView.vue"),
          meta: { disableScroll: true },
        },
      ],
    },
    {
      path: "/meal/:id",
      name: "meal",
      component: () => import("../views/MealView.vue"),
      meta: { requiresAuth: true, isShow: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/auth/LoginForm.vue"),
      meta: { requiresAuth: true, isShow: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/auth/RegisterForm.vue"),
      meta: { requiresAuth: true, isShow: false },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (!to.meta.disableScroll) {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // console.log(isAuth);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;

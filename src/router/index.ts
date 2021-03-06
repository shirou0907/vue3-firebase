import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: true, isShow: true },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: { requiresAuth: true, isShow: true },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue"),
      meta: { requiresAuth: true, isShow: true },
      children: [
        {
          path: "profile",
          name: "profile",
          component: () => import("../components/user/UserSetting.vue"),
        },
        {
          path: "liked",
          name: "liked",
          component: () => import("../components/user/UserMeal.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { requiresAuth: true, isShow: true },
      children: [
        {
          path: ":id",
          name: "menu-country",
          component: () => import("../components/country/MealList.vue"),
          meta: { disableScroll: true },
        },
      ],
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
          component: () => import("../components/menu/MealList.vue"),
          meta: { disableScroll: true },
        },
      ],
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
      meta: { requiresAuth: true, isShow: true },
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
  scrollBehavior(to) {
    if (!to.meta.disableScroll) {
      return { top: 0 };
    }
  },
});

// router.beforeEach((to, from, next) => {
//   if (!store.getters.getStatus) router.push({ path: "login" });
//   else next();
// });

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          name: "login",
          path: "login",
          component: () => import("@/components/auth/LoginForm.vue"),
        },
        {
          name: "register",
          path: "register",
          component: () => import("@/components/auth/RegisterForm.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      children: [
        {
          name: "about-us",
          path: "us",
          component: () => import("../views/AboutUsView.vue"),
        },
        {
          name: "about-us2",
          path: "us2",
          component: () => import("../views/AboutUsView2.vue"),
        },
      ],
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

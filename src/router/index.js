import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "signup",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.getLoggedIn) {
          next();
          return;
        }
        next("/");
      },
    },
    {
      path: "/qr",
      name: "QrPage",
      component: () => import("../views/QrPage.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.getLoggedIn) {
          next();
          return;
        }
        next("/");
      },
    },
  ],
});

export default router;

/*
 * @Descripttion: 路由配置文件
 * @Date: 2021-05-26 20:33:07
 */
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 路由信息
const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/work",
        name: "Work",
        component: () => import("@/pages/work/index.vue"),
      },
      {
        path: "/book",
        name: "Book",
        component: () => import("@/pages/book/index.vue"),
      },
      {
        path: "/sys",
        name: "Sys",
        component: () => import("@/pages/sys/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/index.vue"),
  },
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

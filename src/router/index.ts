/*
 * @Descripttion: 路由配置文件
 * @Date: 2021-05-26 20:33:07
 */
import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

//静态路由
const defaultRouter = [
  {
    path: "/",
    name: "首页",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/pages/login/index.vue"),
  },
];

const asyncRouter = [
  {
    path: "/",
    name: "首页",
    redirect: "/work",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        code: 100,
        path: "/work",
        name: "工作台",
        meta: { icon: "HomeOutlined" },
        component: () => import("@/pages/work/index.vue"),
      },
      {
        code: 200,
        path: "/book",
        name: "图书管理",
        meta: { icon: "CalendarOutlined" },
        redirect: "/book/list",
        component: () => import("@/pages/book/index.vue"),
        children: [],
      },
      {
        code: 201,
        path: "/book/list",
        name: "图书列表",
        meta: { icon: "BookOutlined" },
        component: () => import("@/pages/book/index.vue"),
      },
      {
        code: 300,
        path: "/sys",
        name: "系统管理",
        meta: { icon: "SettingOutlined" },
        redirect: "/sys/list",
        component: () => import("@/pages/sys/user/index.vue"),
        children: [],
      },
      {
        code: 301,
        path: "/sys/list",
        name: "用户列表",
        meta: { icon: "UserOutlined" },
        component: () => import("@/pages/sys/user/index.vue"),
      },
      {
        code: 302,
        path: "/sys/role",
        name: "角色列表",
        meta: { icon: "UserSwitchOutlined" },
        component: () => import("@/pages/sys/role/index.vue"),
      },
      {
        code: 303,
        path: "/sys/permission",
        name: "权限管理",
        meta: { icon: "SolutionOutlined" },
        component: () => import("@/pages/sys/permission/index.vue"),
      },
    ],
  },
];

// 路由信息
const routes = [...defaultRouter];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // to表示将要访问的路径
  // form表示从那个页面跳转而来
  // next表示允许跳转到指定位置
  if (to.path === "/login") return next();
  // 获取用户本地的token, 如果token不存在则跳转到登录页
  const tokenStr = localStorage.getItem("token");
  if (!tokenStr) {
    return next("/login");
  }
  if (!(store as any).state.router.routers) {
    // 请求路由
    store.dispatch("router/fetchRouters");
    // 触发重定向
    return next();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export { asyncRouter, router };

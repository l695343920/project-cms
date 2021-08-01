/*
 * @Descripttion: main
 * @Date: 2021-05-03 10:15:41
 * @LastEditTime: 2021-07-31 16:56:14
 */
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import store from "@/store";
import ant from "ant-design-vue";
import "@/styles/global.less";
import * as antIcons from "@ant-design/icons-vue";
import "nprogress/nprogress.css";

const app = createApp(App);
app.use(ant).use(router).use(store);
app.mount("#app");

// 注册组件
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key as keyof typeof antIcons]);
});
// 添加到全局
app.config.globalProperties.$antIcons = antIcons;

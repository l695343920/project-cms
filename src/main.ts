/*
 * @Descripttion: main
 * @Date: 2021-05-03 10:15:41
 * @LastEditTime: 2021-06-21 23:00:55
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/utils/normalize.css";
import * as antIcons from "@ant-design/icons-vue";

//改变主题色
const initThemeBgColor = (color: string) => {
  const root = document.documentElement;
  root.style.setProperty("--theme-bg-color", color);
};

const app = createApp(App);
app.use(ant).use(router);
app.mount("#app");
// 注册组件
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key]);
});
// 添加到全局
app.config.globalProperties.$antIcons = antIcons;
// 设置全局
app.config.globalProperties.$initThemeBgColor = initThemeBgColor;

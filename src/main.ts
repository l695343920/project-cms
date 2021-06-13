/*
 * @Descripttion: main
 * @Date: 2021-05-03 10:15:41
 * @LastEditTime: 2021-05-26 20:44:10
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);
app.use(ant).use(router);
app.mount("#app");

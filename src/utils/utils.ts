/*
 * @Descripttion: 工具类
 * @Date: 2021-07-10 16:00:17
 */
import { router } from "@/router";
import store from "@/store";

//用户退出
export const signOut = () => {
  router.push("/login");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  store.commit("setRouters", []);
};

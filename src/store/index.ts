/*
 * @Descripttion: 状态管理
 * @Date: 2021-06-26 12:52:42
 */
import { createStore } from "vuex";
import layout from "./modules/layout";
import router from "./modules/router";
import permission from "./modules/permission";

export default createStore({
  state: {},
  modules: {
    layout,
    router,
    permission,
  },
});

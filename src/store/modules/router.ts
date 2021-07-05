/*
 * @Descripttion: 路由状态
 * @Date: 2021-06-27 20:44:30
 */
import { getList } from "@/service/mean";
import { asyncRouter } from "@/router/index";
import { router } from "@/router/index";

export default {
  namespaced: true,
  state: {
    routers: null,
  },
  actions: {
    async fetchRouters(options: any) {
      const { commit } = options;

      const res: any = await getList();
      let defaultMap: any = new Object();
      let routerMap: any = new Object();
      router.addRoute(asyncRouter[0]);
      asyncRouter[0].children.forEach((obj: any) => {
        defaultMap[obj.code] = obj;
      });
      res.data.forEach((obj: any) => {
        let value = defaultMap[obj.code];
        if (value) {
          value.children = [];
          value.permission = obj.permission;
          value.parentId = obj.parentId;
          value.id = obj.id;
          routerMap[obj.id] = value;
        }
      });
      Object.values(routerMap).forEach((obj: any) => {
        let value = routerMap[obj.parentId];
        if (value && obj.id !== obj.parentId) {
          value.children.push(obj);
          delete routerMap[obj.id];
        }
        routerMap[obj.id] && router.addRoute("首页", routerMap[obj.id]);
      });
      let data: any = Object.values(routerMap);
      commit("setRouters", data);
      router.replace(router.currentRoute.value.fullPath)
    },
  },
  mutations: {
    setRouters(state: any, res: any) {
      state.routers = res;
    },
  },
  getters: {
    getRouters: (state: any) => {
      return state.routers;
    },
  },
};

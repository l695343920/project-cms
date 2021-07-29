/*
 * @Descripttion: 权限状态
 * @Date: 2021-07-22 22:50:29
 */
import { permissionProps } from "@/router/index.d";

export default {
  namespaced: true,
  state: {
    data: null, //当前页面对应的权限
  },
  actions: {
    fetchPermission(options: any, value: string) {
      const { commit } = options;
      commit("setPermission", value);
    },
  },
  mutations: {
    setPermission(state: any, value: string) {
      state.data = value;
    },
  },
  getters: {
    getPermission: (state: any) => (id: number) => {
      if (Array.isArray(state.data)) {
        return state.data.some((obj: permissionProps) => id === obj.id);
      }
      return false;
    },
  },
};

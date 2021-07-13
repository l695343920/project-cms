/*
 * @Descripttion: layout公共状态
 * @Date: 2021-06-26 13:03:55
 */
export default {
  namespaced: true,
  state: {
    theme: "dark", //侧边栏菜单的主题
  },
  actions: {
    fetchTheme(options: any, name: string) {
      const { commit } = options;
      commit("setTheme", name);
    },
  },
  mutations: {
    setTheme(state: any, name: string) {
      state.theme = name;
    },
  },
  getters: {
    getTheme: (state: any) => {
      return state.theme;
    },
  },
};

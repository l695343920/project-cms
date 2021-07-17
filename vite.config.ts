/*
 * @Descripttion:vite配置文件
 * @Date: 2021-05-03 10:15:41
 * @LastEditTime: 2021-07-15 22:17:58
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteThemePlugin } from "vite-plugin-theme";

export default ({ mode }) => {
  //是否是开发环境
  const __DEV__ = mode === "development";

  return defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "primary-color": "#1890ff",
          },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts"],
      alias: {
        "@": resolve(__dirname, "src"),
      },
    }, //设置加载顺序
    plugins: [
      vue(),
      viteThemePlugin({
        // Match the color to be modified
        colorVariables: ["#1890ff"],
      }),
    ],
    server: {
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: "0.0.0.0",
      // 服务器端口号
      port: 3000,
      // boolean | string 启动项目时自动在浏览器打开应用程序；如果为string，比如"/index.html"，会打开http://localhost:3000/index.html
      open: true,
      // 自定义代理规则
      proxy: {
        "/api": {
          target: 
            "http://121.5.152.57:3001",
        },
      },
    },
  });
};

/*
 * @Descripttion: 工具类
 * @Date: 2021-07-10 16:00:17
 */
import { useRouter } from "vue-router";

const router = useRouter();

//用户退出
export const signOut = () => {
  router.push("/login");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
};

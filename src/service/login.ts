/*
 * @Descripttion: 登录页面接口
 * @Date: 2021-06-05 19:54:11
 */

import { post } from "@/utils/request";

/**
 * @name:用户登录
 */
export function loginUser(params: any) {
  return post("user/login", params);
}

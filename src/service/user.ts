/*
 * @Descripttion: 系统管理-用户列表
 * @Date: 2021-06-16 22:08:15
 */
import { get, post } from "@/utils/request";

/**
 * @name:查看用户信息
 */
 export function detailUser(params: any) {
  return get("user/detail", params);
}

/**
 * @name:新增用户信息
 */
export function addUser(params: any) {
  return post("user/add", params);
}

/**
 * @name:修改用户信息
 */
export function editUser(params: any) {
  return post("user/edit", params);
}

/**
 * @name:删除用户信息
 */
export function delUser(params: any) {
  return post("user/del", params);
}

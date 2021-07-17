/*
 * @Descripttion: 系统管理-角色列表
 * @Date: 2021-06-16 22:08:15
 */
import { get, post } from "@/utils/request";

/**
 * @name:角色列表
 */
export function getRole(params?: any) {
  return get("role/list", params);
}

/**
 * @name:查看角色信息
 */
export function detailRole(params: any) {
  return get("role/detail", params);
}

/**
 * @name:新增角色信息
 */
export function addRole(params: any) {
  return post("role/add", params);
}

/**
 * @name:修改角色信息
 */
export function editRole(params: any) {
  return post("role/edit", params);
}

/**
 * @name:删除角色信息
 */
export function delRole(params: any) {
  return post("role/del", params);
}

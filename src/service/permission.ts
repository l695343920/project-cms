/*
 * @Descripttion: 权限接口
 * @Date: 2021-07-03 22:47:05
 */
import { get, post } from "@/utils/request";

/**
 * @name:获取权限列表
 */
export function getList(params: any) {
  return get("permission/list", params);
}

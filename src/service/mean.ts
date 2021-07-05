/*
 * @Descripttion: 菜单接口
 * @Date: 2021-07-03 22:47:05
 */
import { get, post } from "@/utils/request";

/**
 * @name:获取菜单
 */
export function getList(params?: any) {
  return get("mean/list", params);
}

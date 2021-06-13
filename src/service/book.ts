/*
 * @Descripttion: book页面接口
 * @Date: 2021-05-03 17:11:18
 * @LastEditTime: 2021-05-25 22:49:23
 */
import { get, post } from "@/utils/request";

/**
 * @name:查看图书内容
 */
export function detailBook(params: any) {
  return get("book/detail", params);
}

/**
 * @name:新增图书内容
 */
export function addBook(params: any) {
  return post("book/add", params);
}

/**
 * @name:修改图书内容
 */
export function editBook(params: any) {
  return post("book/edit", params);
}

/**
 * @name:删除图书内容
 */
export function delBook(params: any) {
  return post("book/del", params);
}

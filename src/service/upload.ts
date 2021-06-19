/*
 * @Descripttion: 上传接口
 * @Date: 2021-06-17 22:39:23
 */
import { post } from "@/utils/request";

/**
 * @name:上传
 */
export function uploadFile(params: any) {
  return post("public/upload", params);
}

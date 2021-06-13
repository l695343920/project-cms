/*
 * @Descripttion: index.d.ts
 * @Date: 2021-05-20 14:44:52
 * @LastEditTime: 2021-05-23 00:56:38
 */
import { TableStateFilters } from "ant-design-vue/es/table/interface";

export interface ParamsState {
  pageIndex: number;
  pageSize: number;
}

export type Pagination = {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
};

export type Filters = TableStateFilters;

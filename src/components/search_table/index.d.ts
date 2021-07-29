/*
 * @Descripttion: index.d.ts
 * @Date: 2021-05-20 14:44:52
 * @LastEditTime: 2021-07-24 10:47:10
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

export interface toolProps {
  type: string;
  label: string;
  onClick: () => void;
}

export type Filters = TableStateFilters;

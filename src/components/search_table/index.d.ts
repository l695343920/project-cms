/*
 * @Descripttion: index.d.ts
 * @Date: 2021-05-20 14:44:52
 * @LastEditTime: 2021-08-01 14:08:48
 */
import {
  TableState,
  TableStateFilters,
} from "ant-design-vue/es/table/interface";

export interface ParamsState {
  pageIndex: number;
  pageSize: number;
  [propName: string]: string | number;
}

export type Pagination = TableState["pagination"];

export interface toolProps {
  type: string;
  label: string;
  class?: string;
  onClick?: () => void;
}

export type Filters = TableStateFilters;

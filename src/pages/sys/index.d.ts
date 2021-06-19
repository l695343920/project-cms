/*
 * @Descripttion: index.d.ts
 * @Date: 2021-05-20 14:44:52
 * @LastEditTime: 2021-06-17 21:54:53
 */
export interface formState {
  name: string;
  create_time: string;
}

export interface formConfigState {
  type: string;
  name: string;
  initialValue: string;
  placeholder: string;
  label: string;
  maxLength?: number;
  action?: string;
  list_type?: string;
  accept?: string;
}

export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

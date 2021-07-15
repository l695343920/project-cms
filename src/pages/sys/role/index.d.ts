/*
 * @Descripttion: index.d.ts
 * @Date: 2021-05-20 14:44:52
 * @LastEditTime: 2021-07-06 01:39:26
 */
export interface formState {
  name: string;
  create_time: string;
}

interface optionItem {
  label: string;
  value: string;
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
  options?: optionItem[];
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

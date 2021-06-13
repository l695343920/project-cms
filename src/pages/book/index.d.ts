/*
 * @Descripttion: Book.d.ts
 * @Date: 2021-05-23 22:27:11
 * @LastEditTime: 2021-05-25 23:02:51
 */
export interface formState {
  name: string;
  content: string;
}

export interface formConfigState {
  type: string;
  name: string;
  initialValue: string;
  placeholder: string;
  label: string;
  maxLength: number;
}

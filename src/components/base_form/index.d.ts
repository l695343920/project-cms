/*
 * @Descripttion: index.d.ts
 * @Date: 2021-07-17 10:21:33
 */
interface optionItem {
  label: string;
  value: string;
}

export interface formStateProps {
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
  optionLabelName?: string;
  optionValueName?: string;
}

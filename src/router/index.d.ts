/*
 * @Descripttion: 路由泛型
 * @Date: 2021-07-24 09:31:54
 */
interface metaProps {
  icon: string;
}

export interface permissionProps {
  id: number;
  name: string;
  meanId: string;
  disabled: boolean;
  children?: any[];
  key?: object;
  parentId?: number;
}

export interface routerProps {
  id: number;
  parentId: number;
  code: number;
  path: string;
  name: string;
  meta: metaProps;
  redirect?: string;
  component: () => void;
  children: routerProps[];
  permission: permissionProps;
}

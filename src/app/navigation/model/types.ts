import { AuthPermission } from '~app/modules/auth';

export interface MenuItem {
  id: number;
  title: string;
  icon?: string;
  group: string;
  children?: MenuItem[] | null;
  permissions?: AuthPermission;
}

export interface MenuItemAttributes {
  [key: string]: string;
}

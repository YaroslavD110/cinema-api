export interface IPayload {
  id?: number;
  username?: string;
  iat: number;
  exp: number;
}

export type PermissionNamesType =
  | 'write_general'
  | 'read_general'
  | 'delete_general'
  | 'write_system'
  | 'read_system'
  | 'delete_system'
  | 'admin_access';

export interface IPermission {
  name: PermissionNamesType;
  description: string;
  user: any[];
}

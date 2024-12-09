export type UserRole = 'STORE_OWNER' | 'SELLER' | 'RESELLER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  storeId?: string;
  parentId?: string; // ID of the store owner or seller who created this user
}
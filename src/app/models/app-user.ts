
export interface AppUser {
  readonly uid: string;
  name?: string;
  email?: string;
  lastLogin?: string;
  isAdmin?: boolean;
}

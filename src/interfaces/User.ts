export interface User {
  id?: string;
  displayName?: string | null;
  email?: string | null;
  uid?: string;
  photoURL?: string | null;
  keywords?: string[];
  providerId?: string,
}
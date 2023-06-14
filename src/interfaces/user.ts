export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: number | string;
  accessToken?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

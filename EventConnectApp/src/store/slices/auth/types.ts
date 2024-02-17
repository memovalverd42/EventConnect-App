
export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: Token;
}

export interface Token {
  access: string;
  refresh: string;
}
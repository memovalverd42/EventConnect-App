export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  token: Token
}

export interface Token {
  access: string;
  refresh: string;
}
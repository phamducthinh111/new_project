import http from "@/configs/AxiosClient";

export interface LoginForm {
  username: string;
  password: string;
}

export interface Me {
  username: string;
  role: string;
}

export interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  address: string;
}

export interface User {
  email: string;
  role: string;
  username: string;
  phone: string;
  address: string;
}

export const login = async (req: LoginForm) => {
  const response = await http.post("auth/login", { body: req });
  return response.data;
};

export const register = async (req: RegisterForm) => {
  const response = await http.post("users", { body: req });
  return response.data;
};

export const me = async () => {
  const response = await http.get("auth/profile");
  return response.data;
};

export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Logout failed');
  }
  return response;
};

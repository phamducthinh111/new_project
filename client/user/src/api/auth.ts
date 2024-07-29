import { LoginForm, RegisterForm } from "@/interface/user.interface";
import http from "../../configs/AxiosClient";

export const login = async (req: LoginForm) => {
  const response = await http.post("auth/login-user", { body: req });
  return response.data;
};

export const register = async (req: RegisterForm) => {
  const response = await http.post("users", { body: req });
  return response.data;
};

export const getMe = async () => {
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

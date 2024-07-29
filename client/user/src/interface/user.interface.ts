export interface UserProfile {
    userId: number;
    username: string;
    email: string;
    phone: string;
    address: string;
    role?: string;
    birthday?: Date;
    sex?: string;
    fullname?: string
  }
  
  export interface UserState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
  }

  export interface RegisterForm {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
    phone: string;
    address: string;
  }

  export interface LoginForm {
    username: string;
    password: string;
  }

  export interface PasswordForm {
    currentPassword: string;
    newPassword: string;
  }
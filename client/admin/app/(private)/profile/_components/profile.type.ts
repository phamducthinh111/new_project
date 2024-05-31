export interface UserProfile {
    userId?: number;
    username: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    birthday?: Date;
    sex?: string;
    fullname?: string
  }

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
}
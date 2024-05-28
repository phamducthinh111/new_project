export interface UserProfile {
    userId?: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    birthday?: Date;
    sex?: string;
    fullname?: string
  }
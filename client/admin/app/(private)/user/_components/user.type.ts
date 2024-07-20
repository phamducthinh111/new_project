export interface ListUser {
    userId: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    createDate: string;
    updateDate: string;
    createUser: string;
    updateUser: string;
    delFlag?: boolean;
}

export enum Role {
    admin = 'ADMIN',
    manager = 'MANAGER',
    user = 'USER',
    employess = 'EMPLOYEE'
}

export const defaultPassword = '1111'

export interface CreateEmpForm {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
    address: string;
    role: string
}

export const roleOptions = [
    {
      value: "ADMIN",
      label: "ADMIN",
    },
    {
      value: "MANAGER",
      label: "MANAGER",
    },
    {
      value: "EMPLOYEE",
      label: "EMPLOYEE",
    },
    {
      value: "USER",
      label: "USER",
    },
  ];
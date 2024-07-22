import { UserProfile } from "@/app/(private)/profile/_components/profile.type";
import { CreateEmpForm, Role } from "@/app/(private)/user/_components/user.type";
import http from "@/configs/AxiosClient";


export const getAllUser = async (username?: string, role?: Role, delFlag? :boolean) => {
    const response = await http.get("users", {
      params: {
        username: username,
        role: role,
        delFlag: delFlag
    }
    });
    return response.data;
};

export const createEmp = async (req: CreateEmpForm) => {
  const response = await http.post("users/emloyess", { body: req });
  return response.data;
}

export const updateRoleEmp = async (usrId: any, req:string) => {
  const response = await http.put(`users/update/role/${usrId}`, { body: req });
  return response;
}

export const removeUser = async (usrId: any) => {
  const response = await http.delete(`users/remove/${usrId}`);
  return response;
}

export const rollbackUser = async (usrId: any) => {
  const response = await http.put(`users/rollback/${usrId}`);
  return response;
}

export const deleteUser = async (usrId: any) => {
  const response = await http.delete(`users/delete/${usrId}`);
  return response;
}

export const resetPassword = async (usrId: any) => {
  const response = await http.put(`users/resetPassword/${usrId}`);
  return response;
}


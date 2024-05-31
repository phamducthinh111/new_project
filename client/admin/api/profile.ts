import { PasswordForm, UserProfile } from "@/app/(private)/profile/_components/profile.type";
import http from "@/configs/AxiosClient";

export const updateProfile = async (req: Partial<UserProfile>) => {
    const response = await http.put("users/update", { body: req });
    return response.data;
}

export const changePassword = async (req: PasswordForm) => {
    const response = await http.put("users/update/password", { body: req });
    return response.data;
}
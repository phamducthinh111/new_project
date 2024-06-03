import http from "@/configs/AxiosClient";

export const getAllProduct = async () => {
    const response = await http.get("product");
    return response.data;
}
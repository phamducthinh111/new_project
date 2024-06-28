import http from "@/configs/AxiosClient";

export const getAllProduct = async () => {
    const response = await http.get("product");
    return response.data;
}

export const getProductDentail = async (productId: number) => {
    const response = await http.get(`product/${productId}`);
    return response.data;
}
import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Xử lý lỗi từ phản hồi AxiosError
const handleAxiosError = (error: AxiosError) => {
  console.error('Error:', error);
  throw error;
};

// Thêm token vào header nếu cần thiết
const addTokenToHeaders = (headers: any, token?: string) => {
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Hàm tổng quát cho các phương thức HTTP
const sendRequest = async (method: string, url: string, data?: any, tokenNeeded: boolean = true, token?: string) => {
  const headers = tokenNeeded ? addTokenToHeaders({}, token) : {};
  try {
    const response = await axiosClient.request({
      method,
      url,
      data,
      headers
    });
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
  }
};

// Các hàm gửi request tương ứng với các phương thức HTTP
export const get = async (url: string, token: string) => {
  return sendRequest('GET', url, undefined, true, token);
};

export const post = async (url: string, data: any, token?: string) => {
  return sendRequest('POST', url, data, true, token);
};

export const put = async (url: string, data: any, token: string) => {
  return sendRequest('PUT', url, data, true, token);
};

export const del = async (url: string, token: string) => {
  return sendRequest('DELETE', url, undefined, true, token);
};

// Hàm gửi yêu cầu không cần token
export const sendRequestWithoutToken = async (method: string, url: string, data?: any) => {
  return sendRequest(method, url, data, false);
};

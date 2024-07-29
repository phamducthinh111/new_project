import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface CustomOptions extends AxiosRequestConfig {
  baseUrl?: string;
  body?: any;
  headers?: Record<string, string>;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class SessionToken {
  private token = '';
  get value() {
    return this.token;
  }
  set value(token: any) {
    this.token = token;
  }
}

export const sessionToken = new SessionToken();

// Interceptor để thêm token vào headers
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      if (sessionToken.value) {
        config.headers['Authorization'] = `Bearer ${sessionToken.value}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để kiểm tra phản hồi từ máy chủ
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { response, config } = error;

//     // Kiểm tra xem có phản hồi từ server không và mã lỗi là 401
//     if (response && response.status === 401) {
//       const loginUrl = 'auth/login'; // URL của API đăng nhập

//       // Nếu yêu cầu không phải là yêu cầu đăng nhập
//       if (config.url !== loginUrl) {
//         try {
//           await fetch('/api/auth/logout', { method: 'POST' });
//           sessionToken.value = '';
//           window.location.href = '/log-in'; // Điều hướng tới trang đăng nhập
//         } catch (err) {
//           console.error('Error during logout:', err);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// Xử lý lỗi từ phản hồi AxiosError
const handleAxiosError = (error: AxiosError) => {
  console.error(error);
  throw error.response?.data;
};

// Hàm tổng quát cho các phương thức HTTP
const sendRequest = async (
  method: string,
  url: string,
  options?: CustomOptions
) => {
  let body;
  const headers = {
    ...options?.headers,
  };

  if (options?.body instanceof FormData) {
    body = options.body;
  } else {
    body = options?.body ? JSON.stringify(options.body) : undefined;
    headers['Content-Type'] = 'application/json';
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : options.baseUrl === ''
      ? window.location.origin
      : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${url}`;

  try {
    const response = await axiosClient.request({
      ...options,
      method,
      url: fullUrl,
      data: body,
      headers,
    });
    return response.data;
  } catch (error: any) {
    handleAxiosError(error);
  }
};


// Định nghĩa CustomOptions
interface CustomOptions {
  baseUrl?: string;
  body?: any;
  headers?: Record<string, string>;
}

export const http = {
  get: (url: string, options?: CustomOptions) => sendRequest('GET', url, options),
  post: (url: string, options?: CustomOptions) => sendRequest('POST', url, options),
  put: (url: string, options?: CustomOptions) => sendRequest('PUT', url, options),
  delete: (url: string, options?: CustomOptions) => sendRequest('DELETE', url, options),
  upload: (url: string, formData: FormData, options?: CustomOptions) => sendRequest('POST', url, { ...options, body: formData }),
};

export default http;

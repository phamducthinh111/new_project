import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
// import { URLPrefixEnum } from '@/constants/url.constant';
// import { handleSignOut } from '@/utils';

// const updateRefreshToken = async () => {
//   const refreshToken = Cookies.get('refreshToken');
//   try {
//     const res = await axios.post<{
//       data: { result: { accessToken: string } };
//     }>(URLPrefixEnum.REFRESH, undefined, {
//       baseURL: process.env.NEXT_PUBLIC_WAP_ENDPOINT,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(refreshToken && { Authorization: `Bearer ${refreshToken}` })
//       }
//     });
//     cookies.set('accessToken', res.data.data.result.accessToken);

//     return res.data.data.result.accessToken;
//   } catch (err) {
//     handleSignOut();
//   }
// };

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  async (value) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      value.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return value;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalConfig = error.config;
//     if (error?.response?.status === 401) {
//       if (
//         error.response.href === URLPrefixEnum.REFRESH ||
//         !Cookies.get('refreshToken')
//       ) {
//         handleSignOut();

//         return;
//       }
//       if (originalConfig && !originalConfig.sent) {
//         try {
//           originalConfig.sent = true;
//           await updateRefreshToken();

//           return axiosClient(originalConfig);
//         } catch (err) {
//           handleSignOut();

//           return Promise.reject(err);
//         }
//       }
//     }

//     if (isAxiosError(error)) {
//       const errorMgs =
//         typeof error.response.data.data.message === 'string'
//           ? error.response.data.data.message
//           : error.response.data.data.message[0];

//       return Promise.reject(new Error(errorMgs));
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;

export const isAxiosError = (
  err: unknown
): err is AxiosError & {
  response: {
    data: {
      data: {
        message: string | string[];
      };
    };
  };
} => !!(err instanceof AxiosError && err?.response?.data);


// import { Dayjs } from "dayjs";
// import http from "../../configs/AxiosClient";

// export const getAllOrders = async (status?: string, delFlag?: boolean, fromDate?: Dayjs, toDate?: Dayjs) => {
//   const response = await http.get("order", {
//     params: {
//       status: status,
//       delFlag: delFlag,
//       fromDate: fromDate,
//       toDate: toDate
//     },

//   });
//   return response.data;
// };

// export const getOrderDentail = async (orderId: number) => {
//   const response = await http.get(`order/${orderId}`);
//   return response.data;
// }

// export const updatechangeOrderStatus = async (orderId: number, req: OrderStatus) => {
//   const response = await http.put(`order/${orderId}`, {body: req});
//   return response.data
// }

// export const removeOrder = async (orderId: number, req: DeleteForm) => {
//   const response = await http.put(`order/remove/${orderId}`, {body: req});
//   return response.data
// }

// export const getOrderSummary = async () => {
//   const response = await http.get(`order/dashboard/summary`);
//   return response.data;
// }

// export const getOrderRevenue = async () => {
//   const response = await http.get(`order/dashboard/revenue`);
//   return response.data;
// }

// export const getStatusOrderSummary = async () => {
//   const response = await http.get(`order/dashboard/status-summary`);
//   return response.data;
// }

// export const rollbackOrder = async (orderId?: number) => {
//   const response = await http.put(`order/rollback/${orderId}`);
//   return response;
// }

// export const deleteOrder = async (orderId?: number) => {
//   const response = await http.delete(`order/delete/${orderId}`);
//   return response;
// }

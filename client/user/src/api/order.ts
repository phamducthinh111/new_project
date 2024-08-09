import { OrderList } from "@/interface/order.interface";
import http from "../../configs/AxiosClient";


// export const getOrderDentail = async (orderId: number) => {
//   const response = await http.get(`order/${orderId}`);
//   return response.data;
// }

// export const updatechangeOrderStatus = async (orderId: number, req: OrderStatus) => {
//   const response = await http.put(`order/${orderId}`, {body: req});
//   return response.data
// }

export const order = async ( req: OrderList) => {
  const response = await http.post(`order/`, {body: req});
  return response.data
}

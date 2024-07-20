import { DeleteForm, OrderStatus } from "@/app/(private)/order/_components/order.type";
import http from "@/configs/AxiosClient";
import { Dayjs } from "dayjs";

export const getAllOrders = async (status?: string, delFlag?: boolean, fromDate?: Dayjs, toDate?: Dayjs) => {
  const response = await http.get("order", {
    params: {
      status: status,
      delFlag: delFlag,
      fromDate: fromDate,
      toDate: toDate
    },

  });
  return response.data;
};

export const getOrderDentail = async (orderId: number) => {
  const response = await http.get(`order/${orderId}`);
  return response.data;
}

export const updatechangeOrderStatus = async (orderId: number, req: OrderStatus) => {
  const response = await http.put(`order/${orderId}`, {body: req});
  return response.data
}

export const removeOrder = async (orderId: number, req: DeleteForm) => {
  const response = await http.put(`order/remove/${orderId}`, {body: req});
  return response.data
}

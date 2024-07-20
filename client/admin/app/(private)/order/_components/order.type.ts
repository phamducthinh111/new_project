import { ProductDetail } from "../../product/_components/product.type";
import { UserProfile } from "../../profile/_components/profile.type";

export interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  product: ProductDetail;
}

export interface OrderDentail {
  createDate: string;
  createUser: string;
  updateDate: string;
  updateUser: string;
  delFlag: boolean;
  orderId: number;
  status: string;
  totalPrice: number;
  desc: string | null;
  user: UserProfile,
  orderItems: OrderItem[];
}

export enum OrderStatus {
    Pending  = 'pending',
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled',
}

export const StatusOptions = [
  {
    value: OrderStatus.Pending,
    label: "PENDING",
  },
  {
    value: OrderStatus.Processing,
    label: "PROCESSING",
  },
  {
    value: OrderStatus.Shipped,
    label: "SHIPPED",
  },
  {
    value: OrderStatus.Delivered,
    label: "DELIVERED",
  },
  {
    value: OrderStatus.Cancelled,
    label: "CANCELLED",
  },
];

export interface DeleteForm {
  desc: string
}

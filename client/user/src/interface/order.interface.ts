export interface OrderItems {
    productId: number;
    quantity: number;
}

export interface OrderList {
    orderItemsData: OrderItems[];
    note: string;
}
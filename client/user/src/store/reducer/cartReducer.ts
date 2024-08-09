import { ProductDetail } from "@/interface/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  productItem: ProductDetail;
  count: number;
}

export interface CartState {
  orderItems: OrderItem[];
  totalCount: number;
  totalProduct: number;
  totalPrice: number;
  note: string;
}

const initialState: CartState = {
  orderItems: [],
  totalCount: 0,
  totalProduct: 0,
  totalPrice: 0,
  note:''
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart(
      state,
      action: PayloadAction<{ productItem: ProductDetail; count: number }>
    ) {
      const { productItem, count } = action.payload;
      const existingItem = state.orderItems.find(
        (item) => item.productItem.productId === productItem.productId
      );

      if (existingItem) {
        if (count === 0) {
          // Nếu count bằng 0 thì xóa sản phẩm ra khỏi orderItems
          state.orderItems = state.orderItems.filter(
            (item) => item.productItem.productId !== productItem.productId
          );
        } else {
          // Cập nhật count nếu khác 0
          existingItem.count = count;
        }
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới vào orderItems
        if (count > 0) {
          state.orderItems.push({ productItem, count });
        }
      }

      // Cập nhật totalCount
      state.totalCount = state.orderItems.reduce(
        (total, item) => total + item.count,
        0
      );

      // Cập nhật totalProduct (số sản phẩm duy nhất)
      state.totalProduct = state.orderItems.length; // Số sản phẩm duy nhất trong orderItems

      // Cập nhật totalPrice
      state.totalPrice = state.orderItems.reduce(
        (total, item) => total + item.count * item.productItem.price,
        0
      );
    },
    removeOrderItems(
      state,
      action: PayloadAction<{ productItem: ProductDetail }>
    ) {
      const { productItem } = action.payload;

      // Xoá sản phẩm ra khỏi orderItems
      state.orderItems = state.orderItems.filter(
        (item) => item.productItem.productId !== productItem.productId
      );
      // Cập nhật totalCount
      state.totalCount = state.orderItems.reduce(
        (total, item) => total + item.count,
        0
      );
      // Cập nhật totalProduct (số sản phẩm duy nhất)
      state.totalProduct = state.orderItems.length;
      // Cập nhật totalPrice
      state.totalPrice = state.orderItems.reduce(
        (total, item) => total + item.count * item.productItem.price,
        0
      );
    },
    addNoteOrder(
      state,
      action: PayloadAction<string>) 
      {
        state.note = action.payload
      },
    clearOrder(state) {
      state.orderItems = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.totalProduct = 0;
      state.note = ''
    }
  },
});

export const { updateCart, removeOrderItems, clearOrder, addNoteOrder } = cartSlice.actions;
export default cartSlice.reducer;

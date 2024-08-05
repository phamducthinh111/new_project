import { ProductDetail, TypeProduct } from "@/interface/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  selectedType: TypeProduct | undefined;
  productName: string;
  minPrice: number;
  maxPrice: number;
}

const initialState: ProductState = {
  selectedType: undefined,
  productName: "",
  minPrice: 0,
  maxPrice: 500,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedType(state, action: PayloadAction<TypeProduct | undefined>) {
      state.selectedType = action.payload;
    },
    setProductName(state, action: PayloadAction<string>) {
      state.productName = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
  },
});

export const { setSelectedType, setProductName, setMinPrice, setMaxPrice } =
  filterSlice.actions;

export default filterSlice.reducer;

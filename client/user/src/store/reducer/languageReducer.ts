// store/slices/languageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  language: string;
  loading: boolean;
}

const initialState: LanguageState = {
  language: 'vn', // Ngôn ngữ mặc định
  loading: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
  },
});

export const { setLanguage, setLoading } = languageSlice.actions;
export default languageSlice.reducer;

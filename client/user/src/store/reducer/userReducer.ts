import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/interface/user.interface';
import { fetchUserProfile, logoutUser, updateProfileAction, } from '../action/user.action';

export interface UserState {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userProfile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userProfile = null;
      })
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAction.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.userProfile = action.payload; // Cập nhật thông tin người dùng
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
;

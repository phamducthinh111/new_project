import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/interface/user.interface';
import { fetchUserProfile, logoutUser } from '../action/user.action';

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
      .addCase(logoutUser.fulfilled, (state) => {
        state.userProfile = null;
      })
  },
});

export default userSlice.reducer;
;

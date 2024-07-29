import { getMe, logout } from "@/api/auth";
import { updateProfile } from "@/api/profile";
import { UserProfile } from "@/interface/user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMe();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateProfileAction = createAsyncThunk(
  'user/updateProfile',
  async (changedValues: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await updateProfile(changedValues);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
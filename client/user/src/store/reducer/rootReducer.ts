import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // thêm reducers khác nếu cần
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

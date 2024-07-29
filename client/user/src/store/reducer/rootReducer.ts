import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // thêm reducers khác nếu cần
  languege: languageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storageSession from "redux-persist/lib/storage/session";
import languageReducer from "./reducer/languageReducer";
import productReducer from "./reducer/productReducer";

// const persistConfig = {
//   key: 'root',
//   storage: storageSession,
// };

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
};

const languagePersistConfig = {
  key: 'language',
  storage: storageSession,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const languagePersistedReducer = persistReducer(languagePersistConfig, languageReducer);


const rootReducer = combineReducers({
  user: userPersistedReducer,
  languege: languagePersistedReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    })
});

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
        </PersistGate>
    </Provider>
  );
};

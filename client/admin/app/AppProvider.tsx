"use client";

import { me } from "@/api/auth";
import { sessionToken } from "@/configs/AxiosClient";
import { createContext, useContext, useLayoutEffect, useState, } from "react";

const AppContext = createContext<{
  userProfile: any;
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

export const useAppContetxt = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = ''
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) {
  const [userProfile, setUserProfile] = useState(null);

  useState(() => {
    sessionToken.value = initialSessionToken
  });

  useLayoutEffect(() => {
    const fetchProfile = async () => {
      const result = await me();
      setUserProfile(result);
    };
    fetchProfile();
  }, []);
  
  return (
    <AppContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </AppContext.Provider>
  )
}

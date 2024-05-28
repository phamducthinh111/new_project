"use client";

import { me } from "@/api/auth";
import { sessionToken } from "@/configs/AxiosClient";
import { createContext, useContext, useEffect, useLayoutEffect, useState, } from "react";

const AppContext = createContext<{
  userProfile: any;
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
  refetchProfile: () => void;
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
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  useState(() => {
    sessionToken.value = initialSessionToken
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await me();
      if(result) {
        setUserProfile(result);
        setTriggerRefetch(false)
      }
    };
    fetchProfile();
  }, [triggerRefetch]);

  const refetchProfile = () => {
    setTriggerRefetch(true);
  };
  
  return (
    <AppContext.Provider value={{ userProfile, setUserProfile, refetchProfile }}>
      {children}
    </AppContext.Provider>
  )
}

"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Profile() {
    const userProfile = useSelector((state: RootState) => state.user.userProfile);
    
    return (
        <div className="bg-slate-500">
        {userProfile?.username}
        </div>
    );
  }
"use client";

import { me } from "@/api/auth";
import { sessionToken } from "@/configs/AxiosClient";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState('')
  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     const result = await me();
  //     setUsername(result.username)
  //   } ;
  //   fetchRequest();

  // }, [username])
  return (
    <div>
      <span>
        {username}
        </span>
    </div>
  );
}

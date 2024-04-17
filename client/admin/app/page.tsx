"use client"

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
     <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin/>} />
    </div>
  );
}

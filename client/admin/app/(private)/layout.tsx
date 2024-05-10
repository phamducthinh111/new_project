import Dashbroad from "@/components/menu/dashbroad";
import { PropsWithChildren } from "react";
import AppProvider from "../AppProvider";
import { cookies } from "next/headers";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <AppProvider initialSessionToken={sessionToken?.value}>
      <Dashbroad>{children}</Dashbroad>
    </AppProvider>
  );
}

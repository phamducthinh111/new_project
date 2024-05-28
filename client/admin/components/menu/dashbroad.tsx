import { Layout } from "antd";
import { PropsWithChildren } from "react";
import SideBar from "./sidebar/sidebar";
import MenuContent from "./content/content";

const Dashbroad = ({ children }: Readonly<PropsWithChildren>) => {
  const currentPath = '/'; // Đường dẫn hiện tại
    return (
        <Layout style={{ backgroundColor: "white" }}>
          <SideBar />
          <MenuContent currentPath ={currentPath}>{children}</MenuContent>
        </Layout>
    );
};

export default Dashbroad;

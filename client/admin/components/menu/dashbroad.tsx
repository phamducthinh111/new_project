import { Layout } from "antd";
import { PropsWithChildren } from "react";
import SideBar from "./sidebar/sidebar";
import MenuContent from "./content/content";

const Dashbroad = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <Layout style={{ backgroundColor: "white", minHeight:'100vh' }}>
          <SideBar />
          <Layout style={{ backgroundColor: "white"}}>
            <MenuContent>{children}</MenuContent>
          </Layout>
        </Layout>
    );
};

export default Dashbroad;

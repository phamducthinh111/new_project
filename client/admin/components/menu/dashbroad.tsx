import { Layout } from "antd";
import { PropsWithChildren } from "react";
import SideBar from "./sidebar/sidebar";
import MenuContent from "./content/content";

const Dashbroad = ({ children }: Readonly<PropsWithChildren>) => {
    return (
        <Layout style={{ backgroundColor: "white" }}>
          <SideBar />
          <MenuContent>{children}</MenuContent>
        </Layout>
    );
};

export default Dashbroad;

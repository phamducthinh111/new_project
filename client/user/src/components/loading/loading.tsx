import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const PageLoading = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      );
}

export default PageLoading
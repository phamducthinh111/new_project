import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
    </div>
  );
};

export default Loading;

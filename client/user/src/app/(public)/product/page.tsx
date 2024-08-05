import { Col, Row } from "antd";
import ProductFilter from "./_components/ProductFilter";
import ProductList from "./_components/ProductList";
import { RootState, useAppSelector } from "@/store/store";
import IconProductFilterForMobile from "./_components/iconFilterForMobile";

export default function Product() {

  return (
    <div className="container mx-auto my-10 px-4">
      <Row gutter={[16, 16]}>
        {/* Menu Items for larger screens */}
        <Col
          className="bg-stone-700 bg-opacity-60 backdrop-blur-lg p-5 px-2 mr-10 rounded-lg hidden lg:block" // Ẩn trên màn hình nhỏ hơn
          xs={24}
          sm={24}
          md={5}
          lg={5}
        >
          <ProductFilter />
        </Col>
         {/* Menu Items for mobile screens */}
         <Col
          className="bg-stone-700 bg-opacity-60 backdrop-blur-lg p-2 px-2 rounded-lg lg:hidden" // Ẩn trên màn hình lớn
          xs={24}
          sm={24}
          md={24}
          lg={24}
        >
          <IconProductFilterForMobile />
        </Col>
        <Col
          className="bg-stone-700 bg-opacity-60 p-5 flex flex-wrap gap-4 rounded-lg"
          xs={24}
          sm={24}
          md={18}
          lg={18}
        >
          <ProductList />
        </Col>
      </Row>
    </div>
  );
}

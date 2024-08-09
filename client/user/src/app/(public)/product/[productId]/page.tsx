import { getProductDentail } from "@/api/product";
import { ProductDetail } from "@/interface/product.interface";
import BreadcrumbProduct from "./_components/breadcrumb";
import { Col, Row } from "antd";
import ProductImage from "./_components/productImg";
import ProductInfomation from "./_components/productInfo";

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: number };
}) {
  const { productId } = params;
  const productDetail: ProductDetail = await getProductDentail(productId);
  return (
    <div className=" mx-auto bg-stone-700 bg-opacity-80 rounded-lg p-10 mb-10">
      <div className="container mx-auto lg:w-2/3">
        <div className="mb-5">
          <BreadcrumbProduct productName={productDetail.name} />
        </div>
        <Row>
          <Col xs={24} sm={24} md={12} lg={13}>
            <ProductImage imageUrl={productDetail.imageUrl} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={11}>
            <ProductInfomation productDetail={productDetail} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

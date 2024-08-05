"use client";

import { getAllProduct } from "@/api/product";
import { ProductDetail } from "@/interface/product.interface";
import { Col, Row } from "antd";
import ProductCard from "./productCard";
import { RootState, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";

const ProductList = () => {
  const { selectedType, productName, minPrice, maxPrice } = useAppSelector(
    (state: RootState) => state.product
  );
  const [productsData, setProductsData] = useState<ProductDetail[]>([]);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct(
        productName,
        selectedType,
        minPrice,
        maxPrice
      );
      if (response) {
        setProductsData(response);
        setRefreshData(false);
      }
    };
    fetchData();
  }, [selectedType, productName, minPrice, maxPrice, refreshData]);
  return (
    <div className="lg:px-5 w-full">
      <Row gutter={[16, 16]} justify="center">
        {productsData.map((product, index) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            key={index}
            className="p-2 flex justify-center"
          >
            <ProductCard key={product.productId} productDetail={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;

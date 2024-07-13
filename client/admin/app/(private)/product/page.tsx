"use client";

import Image from "next/image";
import ProductCard from "./_components/productCard";
import { useMutation } from "react-query";
import { getAllProduct } from "@/api/product";
import { useEffect, useState } from "react";
import { Col, Row, message } from "antd";
import { ProductDetail } from "./_components/product.type";

export default function Product() {
  const [productData, setProductData] = useState<ProductDetail[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const activeProduct = true;

  
  // const { mutate, isLoading } = useMutation(getAllProduct, {
  //   onSuccess: (response) => {
  //     setProductData(response);
  //   },
  //   onError: (error) => {
  //     message.error("Failed to fetch users");
  //     console.error(error);
  //   },
  // });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct();
      if (response) {
        setProductData(response);
        setRefreshData(false);
      }
    };
    fetchData();
  }, [refreshData]);

  return (
    <div className="mt-5">
      <Row justify={'center'}>
        {productData &&
          productData.map((product: any, index: number) => (
            <Col span={8} key={index} className="p-2">
              <ProductCard productDentail={product} refreshData={()=>setRefreshData(true)} />
            </Col>
          ))}
      </Row>
    </div>
  );
}

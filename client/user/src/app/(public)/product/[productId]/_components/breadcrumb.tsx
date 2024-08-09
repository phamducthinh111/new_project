"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  productName: string;
}

const BreadcrumbProduct = (props: BreadcrumbProps) => {
  const { productName } = props;
  const pathname = usePathname();
  const pathSnippets = pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link href="/">
        <HomeOutlined className=" hover:text-orange-800 text-gray-300" />
      </Link>
    </Breadcrumb.Item>,
  ].concat(
    pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const isLast = index === pathSnippets.length - 1;
      return (
        <Breadcrumb.Item key={url}>
          {isLast ? (
            <span className=" font-medium text-gray-300">
              {productName}
            </span>
          ) : (
            <Link href={url}>
              <span className="font-medium hover:text-orange-800 text-gray-300">
                {decodeURIComponent(
                  snippet.charAt(0).toUpperCase() + snippet.slice(1)
                )}
              </span>
            </Link>
          )}
        </Breadcrumb.Item>
      );
    })
  );

  return (
    <>
      <Breadcrumb separator="/ " className="text-gray-300">
        {breadcrumbItems}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbProduct;

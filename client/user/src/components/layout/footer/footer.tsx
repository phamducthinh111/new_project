"use client";

import { Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import ImageFooter from "../../../../public/image/footer-coofee.jpg";
import Logo from "../../../../public/image/logo-coffee.png";
import { useAppSelector } from "@/store/store";

export default function PageFooter() {
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  return (
    <div className="bg-stone-700 bg-opacity-80 backdrop-blur-lg pt-5 text-slate-50 px-5">
      <div className="container mx-auto">
        <Row justify="space-between" align="top" gutter={[16, 16]} className="mb-5">
          {/* Thông tin liên hệ */}
          <Col xs={24} sm={12} lg={6}>
          {isLanguageVN ?
                 <>
                 <h4 className="text-lg font-semibold mb-3">Liên hệ với chúng tôi</h4>
       <p>123 Street Name, City, Country</p>
       <p>Phone: (123) 456-7890</p>
       <p>Email: info@example.com</p>
       </>
           :
          <>
                      <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <p>123 Street Name, City, Country</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@example.com</p>
            </>}
          </Col>

          {/* Liên kết nhanh */}
          <Col xs={24} sm={12} lg={6}>
          {isLanguageVN ?
          <>
                      <h4 className="text-lg font-semibold mb-3">Liên kết nhanh</h4>
            <ul className="list-none p-0">
              <li>
                <Link href="/" className="hover:text-orange-800">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-800">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-orange-800">
                 Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-800">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </> :
          <>
                      <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="list-none p-0">
              <li>
                <Link href="/" className="hover:text-orange-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-800">
                  About
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-orange-800">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-800">
                  Contact
                </Link>
              </li>
            </ul>
          </>
          }

          </Col>

          {/* Mạng xã hội */}
          <Col xs={24} sm={12} lg={6}>
            {isLanguageVN ? <h4 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h4>:<h4 className="text-lg font-semibold mb-3">Follow Us</h4>}
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-orange-800">
                <FacebookOutlined />
              </Link>
              <Link href="#" className="hover:text-orange-800">
                <TwitterOutlined />
              </Link>
              <Link href="#" className="hover:text-orange-800">
                <LinkedinOutlined />
              </Link>
              <Link href="#" className="hover:text-orange-800">
                <InstagramOutlined />
              </Link>
            </div>
          </Col>

          {/* Đăng ký nhận tin tức */}
          <Col xs={24} sm={12} lg={6}>
            <div className="w-3/5">
              <Image src={ImageFooter} alt="Imagefooter" />
            </div>
          </Col>
        </Row>

        {/* Bản quyền */}
        <Row justify="center" className="border-t border-gray-700 pt-4">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

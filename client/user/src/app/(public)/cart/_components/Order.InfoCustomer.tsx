"use client";

import { addNoteOrder } from "@/store/reducer/cartReducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Card, Descriptions, Input, Typography } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
const { Text } = Typography;

const OrderInfoCustomer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const {note} = useAppSelector((state) => state.cart);
  const isLanguageVN = activeLanguage === "vn";
  return (
    <div className="text-black text-center shadow-xl mx-auto md:w-3/4 bg-white rounded-lg p-5 mb-5">
      <div className="mb-5">
        <b className="text-xl block">
          {isLanguageVN ? "THÔNG TIN KHÁCH HÀNG" : "CUSTOMER INFORMATION"}
        </b>
        <Button onClick={() => router.push("/profile")} type="link">
          {isLanguageVN ? "(Chỉnh sửa)" : "(Edit)"}
        </Button>
      </div>
      {/* SCREEN LARGE */}
      <div className="hidden sm:flex">
              <Descriptions bordered>
        <Descriptions.Item
          label={
            <div>
              <b className="sm:text-base">
                {isLanguageVN ? "Họ và tên: " : "Fullname:"}
              </b>
            </div>
          }
          span={3}
        >
          <span className="sm:text-base">
            {userProfile?.fullname ? (
              userProfile?.fullname
            ) : (
              <span className="italic text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              <b className="sm:text-base">
                {isLanguageVN ? "Số điện thoại: " : "Phone:"}
              </b>
            </div>
          }
          span={3}
        >
          <span className="sm:text-base">
            {userProfile?.phone ? (
              userProfile?.phone
            ) : (
              <span className="italic text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              <b className="sm:text-base">
                {isLanguageVN ? "Email: " : "Email:"}
              </b>
            </div>
          }
          span={3}
        >
          <span className="">
            {userProfile?.email ? (
              userProfile?.email
            ) : (
              <span className="text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              <b className="sm:text-base">
                {isLanguageVN ? "Ngày sinh: " : "Birthday:"}
              </b>
            </div>
          }
          span={3}
        >
          <span className="sm:text-base">
            {" "}
            {userProfile?.birthday ? (
              dayjs(userProfile?.birthday).format("DD-MM-YYYY")
            ) : (
              <span className="italic text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div>
              <b className="sm:text-base">
                {isLanguageVN ? "Địa chỉ: " : "Address:"}
              </b>
            </div>
          }
          span={3}
        >
          <span>{userProfile?.address}</span>
        </Descriptions.Item>
      </Descriptions>
      </div>


      {/* MOBIE */}
      <div className="sm:hidden">
        <div className="flex justify-between mt-5 border-black pb-1 items-center">
          <b className="sm:text-xl">
            {isLanguageVN ? "Họ và tên: " : "Fullname:"}
          </b>
          <span className="sm:text-base">
            {userProfile?.fullname ? (
              userProfile?.fullname
            ) : (
              <span className="italic text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between mt-5  border-black pb-1 items-center">
          <b className="sm:text-xl">
            {isLanguageVN ? "Số điện thoại: " : "Phone:"}
          </b>
          <span className="sm:text-base">{userProfile?.phone}</span>
        </div>
        <div className="flex justify-between mt-5  border-black pb-1 items-center">
          <b className="sm:text-xl">{isLanguageVN ? "Email: " : "Email:"}</b>
          <span className="sm:text-base">{userProfile?.email}</span>
        </div>
        <div className="flex justify-between mt-5  border-black pb-1 items-center">
          <b className="sm:text-xl">
            {isLanguageVN ? "Ngày sinh: " : "Birthday:"}
          </b>
          <span className="sm:text-base">
            {" "}
            {userProfile?.birthday ? (
              dayjs(userProfile?.birthday).format("DD-MM-YYYY")
            ) : (
              <span className="italic text-gray-400">
                {isLanguageVN ? "Chưa có thông tin" : "No information"}
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between mt-5  border-black pb-1 items-start">
          <b className="sm:text-xl">
            {isLanguageVN ? "Địa chỉ: " : "Address:"}
          </b>
          <span className="sm:text-base w-3/4 text-end">
            {userProfile?.address}
          </span>
        </div>
      </div>
      <div className="mt-5  border-black pb-1 text-start">
        <b className="sm:text-xl">{isLanguageVN ? "Ghi chú: " : "Note:"}</b>
        <Input.TextArea
          placeholder={
            isLanguageVN
              ? "Ghi chú về đơn hàng. Ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              : "Notes about the order. For example, more detailed delivery time or location instructions."
          }
          value={note}
          onChange={(e) => dispatch(addNoteOrder(e.target.value))}
          rows={4}
          className="mt-2 sm:text-base bg-gray-100"
        />
      </div>
    </div>
  );
};

export default OrderInfoCustomer;

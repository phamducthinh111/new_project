import { formatVND } from "@/constants/formatVND.constants";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { BellOutlined } from "@ant-design/icons";
import { StyledButtonDelOrder } from "./order.style";
import "../_components/order.css";
import CustomModal from "@/components/Modal/Modal";
import { useState } from "react";
import OrderConfirmationModal from "./ModalConfirmOrder";
import OrderSuccessModal from "./ModalSuccess";
import { order } from "@/api/order";
import { OrderItems, OrderList } from "@/interface/order.interface";
import { useRouter } from "next/navigation";
import { clearOrder } from "@/store/reducer/cartReducer";

const OrderTotal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  const { orderItems, totalPrice, note } = useAppSelector((state) => state.cart);
  const [isOpenPopupOrder, setIsOpenPopupOrder] = useState<boolean>(false);
  const [isOpenPopupSuccess, setIsOpenPopupSuccess] = useState<boolean>(false);

  const handleOpenModalOrder = () => {
    setIsOpenPopupOrder(true);
  };
  const handleCancelModalOrder = () => {
    setIsOpenPopupOrder(false);
  };

  const handleOkModalOrder = async () => {
    const orderItemsData: OrderItems[] = orderItems.map((item) => ({
      productId: item.productItem.productId,
      quantity: item.count,
    }));
    try {
      const response = await order({
        orderItemsData: orderItemsData,
        note: note
      });
      if (response) {
        setIsOpenPopupOrder(false);
        setIsOpenPopupSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelModalSuccess = () => {
    dispatch(clearOrder());
    setIsOpenPopupSuccess(false);
    router.push('/profile')
  };

  const handleOkModalSuccess = () => {
    dispatch(clearOrder());
    router.push('/product')
    setIsOpenPopupSuccess(false);
  };

  return (
    <div className="text-black text-center shadow-xl mx-auto md:w-3/4 bg-[#eeeff1] rounded-lg p-5 ">
      <b className="sm:text-xl mb-5">
        {isLanguageVN ? "GIÁ TRỊ ĐƠN HÀNG" : "ORDER VALUE"}
      </b>
      <div className="flex justify-between mt-5 border-b border-dotted border-black pb-1">
        <b className="sm:text-base">
          {isLanguageVN ? "Tạm tính: " : "Provisional:"}
        </b>
        <span>{formatVND(totalPrice)}</span>
      </div>
      <div className="flex justify-between mt-5 border-b border-dotted border-black pb-1">
        <b className="sm:text-base">
          {isLanguageVN ? "Vận chuyển: " : "Delivery:"}
        </b>
        <span>{formatVND(0)}</span>
      </div>
      <div className="flex justify-between mt-5 border-b border-dotted border-black pb-1">
        <b className="sm:text-xl">{isLanguageVN ? "TỔNG TIỀN: " : "TOTAL:"}</b>
        <b className="text-base">{formatVND(totalPrice)}</b>
      </div>
      <div className="bg-[#FF4B4B] mt-5 p-1 text-white flex items-center justify-center">
        <BellOutlined className="pr-2 animate-shake" style={{ fontSize: 20 }} />
        <b>
          {" "}
          {isLanguageVN
            ? "ĐƠN HÀNG ĐÃ ĐƯỢC MIỄN PHÍ VẬN CHUYỂN!"
            : "ORDER IS FREE SHIPPING!"}{" "}
        </b>
      </div>
      <div className=" mt-5 italic">
        {isLanguageVN ? (
          <span>
            Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có
            thể<b> đổi trả lại sản phẩm trong 15 ngày.</b>
          </span>
        ) : (
          <span>
            If you are not satisfied with our product
            <b> You can return it within 15 days.</b>
          </span>
        )}
      </div>
      <div className="my-5">
        <StyledButtonDelOrder
          onClick={handleOpenModalOrder}
          block
          size="large"
          className=""
        >
          <span className="text-base font-medium">
            {isLanguageVN ? "ĐẶT HÀNG" : "ORDER"}
          </span>
        </StyledButtonDelOrder>
      </div>
      <CustomModal
        title={isLanguageVN ? "XÁC NHẬN ĐẶT HÀNG" : "ORDER CONFIRMATION"}
        visible={isOpenPopupOrder}
        onCancel={handleCancelModalOrder}
        cancelButtonProps={{ size: "large" }}
        onOk={handleOkModalOrder}
        okText={isLanguageVN ? "Xác nhận" : "Confirm"}
        cancelText={isLanguageVN ? "Hủy bỏ" : " Cancel"}
        okButtonProps={{ danger: true, size: "large" }}
      >
        <OrderConfirmationModal />
      </CustomModal>
      <CustomModal
        title={isLanguageVN ? "XÁC NHẬN ĐẶT HÀNG" : "ORDER CONFIRMATION"}
        visible={isOpenPopupSuccess}
        onCancel={handleCancelModalSuccess}
        cancelText={isLanguageVN ? "Lịch sử mua hàng" : " Order history"}
        cancelButtonProps={{ size: "large" }}
        onOk={handleOkModalSuccess}
        okText={isLanguageVN ? "Tiếp tục mua sắm" : "Continue shopping"}
        okButtonProps={{ danger: true, size: "large", ghost: true }}
      >
        <OrderSuccessModal />
      </CustomModal>
    </div>
  );
};

export default OrderTotal;

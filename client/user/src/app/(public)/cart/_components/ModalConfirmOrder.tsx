import { formatVND } from "@/constants/formatVND.constants";
import { useAppSelector } from "@/store/store";
import Link from "next/link";

const OrderConfirmationModal = () => {
    const activeLanguage = useAppSelector((state) => state.languege.language);
    const {totalPrice} = useAppSelector((state) => state.cart);
    const isLanguageVN = activeLanguage === "vn";
    return(
        <div className="text-center">
            <div className="my-4">
          <p className="text-base">
            {isLanguageVN ? "Tổng giá trị đơn hàng của quý khách là: " : "The total value of your order is:"}
            <b> {formatVND(totalPrice)}</b>
          </p>
          {isLanguageVN ?
            <p className="italic text-gray-600 mt-1">
            Nếu quý khách có bất kỳ thắc mắc nào, xin vui lòng liên hệ với chúng tôi.
            (Bấm vào <Link className="text-orange-800" href='/about'>đây</Link> để xem cách thức liên hệ)
          </p>
            :
            <p className="italic text-gray-600">
            If you have any questions please contact us.
            (Click <Link className="text-orange-800" href='/about'>here</Link> to see how to contact)
          </p>
            }
          <p className="text-base mt-5">
            {isLanguageVN
              ? "Quý khách có chắc chắn muốn đặt đơn hàng này không?"
              : "Are you sure you want to place this order?"}
          </p>
        </div>
        </div>
    )
}
export default OrderConfirmationModal

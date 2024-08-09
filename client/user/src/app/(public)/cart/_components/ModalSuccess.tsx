import { useAppSelector } from "@/store/store";

const OrderSuccessModal = () => {
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-green-100 p-4 mb-4 relative">
        <div className="bg-green-700 rounded-full p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="absolute w-32 h-32 bg-green-200 opacity-50 animate-ping rounded-full"></div>
      </div>
      <h2 className="text-xl font-semibold text-green-700 mb-2">{isLanguageVN?'Cảm ơn quý khách đã đặt hàng!':'Thank you for ordering!'}</h2>
      <p className="text-gray-500 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      {/* <div className="flex space-x-4">
          <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            View Order
          </Button>
          <Button type="primary" className="bg-orange-500 hover:bg-orange-600">
            Continue Shopping
          </Button>
        </div> */}
    </div>
  );
};
export default OrderSuccessModal;

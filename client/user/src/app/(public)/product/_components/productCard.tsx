import { Card } from "antd";
import { ProductDetail } from "@/interface/product.interface";
import Image from "next/image";
import { formatVND } from "@/constants/formatVND.constants";
import { useAppSelector } from "@/store/store";

const { Meta } = Card;

interface ProductCardProps {
  productDetail: ProductDetail;
}

const ProductCard: React.FC<ProductCardProps> = ({ productDetail }) => {
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  return (
    <Card
      key={productDetail.productId}
      title={
        <div className="text-center">
          <p className="text-base">{productDetail.name}</p>
        </div>
      }
      className="border-2 border-gray-300 rounded-lg w-80 flex flex-col transition-transform duration-300 transform hover:scale-105"
      hoverable
      cover={
        productDetail.imageUrl &&
        productDetail.imageUrl.filter((img) => img.imageType === "thumbnail")
          .length > 0 ? (
          productDetail.imageUrl
            .filter((img) => img.imageType === "thumbnail")
            .map((img) => (
              <div
                key={img.imageId}
                className="flex justify-center items-center p-2"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${img.imageUrl}`}
                  alt={`Product Image ${img.imageId}`}
                  layout="responsive"
                  width={500}
                  height={500}
                  className="transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center p-2">
            <Image
              src="https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              alt="Default Image"
              layout="responsive"
              width={500}
              height={500}
              className="transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        )
      }
    >
      <div className="text-center">
      <span className={`text-xl italic ${productDetail.quantity === 0 && ' text-red-500' }`}>
  {productDetail.quantity !== 0 ? formatVND(productDetail.price) : (isLanguageVN ? 'Hết hàng' : 'Stockout')}
</span>
      </div>
    </Card>
  );
};

export default ProductCard;

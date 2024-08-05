"use client";

import { formatVND } from "@/constants/formatVND.constants";
import { IconSliderProps, TypeProduct } from "@/interface/product.interface";
import {
  setMaxPrice,
  setMinPrice,
  setProductName,
  setSelectedType,
} from "@/store/reducer/productReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import {
  ArrowDownOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { Col, Select, Input, Button, Slider, SliderSingleProps } from "antd";
import { useState } from "react";

const { Option } = Select;
const marks: SliderSingleProps["marks"] = {
  0: {
    label: <span className="text-white pl-5">{formatVND(0)}</span>,
  },
  500: {
    label: <span className="text-white pr-12">{formatVND(500)}</span>,
  },
};

const ProductFilter = () => {
  const dispatch = useAppDispatch();
  const { selectedType, productName, minPrice, maxPrice } = useAppSelector(
    (state: RootState) => state.product
  );
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const isLanguageVN = activeLanguage === "vn";
  const [isOpenInputName, setIsOpenInputName] = useState<Boolean>(false);
  const [isOpenSelectType, setIsOpenSelectType] = useState<Boolean>(false);
  const [isOpenSelectPrice, setIsOpenSelectPrice] = useState<Boolean>(false);

  const handleButtonClickInputname = () => {
    setIsOpenInputName(!isOpenInputName);
  };

  const handleButtonClickSelectType = () => {
    setIsOpenSelectType(!isOpenSelectType);
  };

  const handleButtonClickSelectPrice = () => {
    setIsOpenSelectPrice(!isOpenSelectPrice);
  };

  const handleOptionTypeClick = (type: TypeProduct) => {
    if (selectedType === type) {
      dispatch(setSelectedType(undefined)); // hoặc undefined nếu bạn muốn
    } else {
      dispatch(setSelectedType(type));
    }
  };

  const handlePriceChange = (value: [number, number]) => {
    dispatch(setMinPrice(value[0]));
    dispatch(setMaxPrice(value[1]));
  };

  return (
    <div className="px-5">
      <h2 className="text-white text-xl mb-4">
        {isLanguageVN ? "Bộ Lọc Sản Phẩm" : "Product Filter"}
      </h2>
      <div className="mb-4 pb-2 border-b">
        <Button
          className="text-white text-base"
          type="link"
          onClick={handleButtonClickInputname}
        >
          {isOpenInputName ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
          {isLanguageVN ? "Tên Sản Phẩm" : "Product Name"}
        </Button>
        <div
          className={`transition-max-height duration-1000 ease-in-out overflow-hidden ${
            isOpenInputName ? "max-h-40" : "max-h-0"
          }`}
        >
          <Input
            className="w-full mt-2 mb-3"
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChange={(e) => dispatch(setProductName(e.target.value))}
          />
        </div>
      </div>

      <div className="mb-4 pb-2 border-b">
        <Button
          className="text-white text-base"
          type="link"
          onClick={handleButtonClickSelectType}
        >
          {isOpenSelectType ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
          {isLanguageVN ? "Loại Sản Phẩm" : "Product Type"}
        </Button>
        <div
          className={`pl-5 flex-row justify-center transition-max-height duration-1000 ease-in-out overflow-hidden ${
            isOpenSelectType ? "max-h-[300px]" : "max-h-0"
          }`}
        >
          {Object.values(TypeProduct).map((type) => (
            <div
              key={type}
              className={`p-2 w-1/2 font-medium rounded-lg hover:text-orange-800 hover:bg-[#B89D64] cursor-pointer ${
                selectedType === type
                  ? "border-2 border-[#513826] bg-[#B89D64] text-orange-800"
                  : ""
              }`}
              onClick={() => handleOptionTypeClick(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 pb-2 border-b">
        <Button
          className="text-white text-base"
          type="link"
          onClick={handleButtonClickSelectPrice}
        >
          {isOpenSelectPrice ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
          {isLanguageVN ? "Giá Sản Phẩm" : "Product Price"}
        </Button>
        <div
          className={`transition-max-height duration-1000 ease-in-out overflow-hidden ${
            isOpenSelectPrice ? "max-h-40" : "max-h-0"
          }`}
        >
          <Slider
            range
            min={0}
            max={500}
            step={50}
            tooltip={{
              placement: "bottom",
              formatter: (value) =>
                value !== undefined ? formatVND(value) : "",
            }}
            marks={marks}
            className="text-white mx-2"
            defaultValue={[minPrice, maxPrice]}
            onChange={(value) => handlePriceChange([value[0], value[1]])}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

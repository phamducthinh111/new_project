import { useAppSelector } from "@/store/store";
import { Button, Row, Typography } from "antd";
import convertSexToVietnamese from "./convertSex";
import dayjs from "dayjs";

interface AccountInfomationProps {
  setIsEditAccount: () => void;
  setIsDisableSave: () => void
}
const AccountInfomation = (props: AccountInfomationProps) => {
  const { setIsEditAccount, setIsDisableSave } = props;
  const activeLanguage = useAppSelector((state) => state.languege.language);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const isLanguageVN = activeLanguage === "vn";
  const { Text } = Typography;

  const handleBtnEditAccount = () => {
    setIsEditAccount();
    setIsDisableSave()
  }

  // Chuyển đổi giới tính nếu là tiếng Việt
  const displaySex = userProfile?.sex ? (
    isLanguageVN ? (
      convertSexToVietnamese(userProfile.sex)
    ) : (
      userProfile.sex
    )
  ) : (
    <span className="italic text-gray-400">
      {isLanguageVN ? "Chưa có thông tin" : "No information"}
    </span>
  );

  return (
    userProfile &&
    (<div className="lg:px-10">
      <Row className="mb-5 flex items-center">
        <Text className="text-xl text-slate-50 ">
          {isLanguageVN ? "THÔNG TIN TÀI KHOẢN" : "ACCOUNT INFORMATION"}
        </Text>
        <Button
          onClick={handleBtnEditAccount}
          className=" font-medium"
          type="link"
        >
          {isLanguageVN ? "(Cập nhật)" : "(Edit)"}
        </Button>
      </Row>
      <Row className="flex-col">
        <Text className="text-slate-50 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Tên tài khoản : " : "Username: "}
          </strong>
          {userProfile?.username}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Họ và tên : " : "Fullname: "}
          </strong>
          {userProfile?.fullname ? (
            userProfile?.fullname
          ) : (
            <span className="italic text-gray-400">
              {isLanguageVN ? "Chưa có thông tin" : "No information"}
            </span>
          )}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">{"Email : "}</strong>
          {userProfile?.email}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Số điện thoại : " : "Phone: "}
          </strong>
          {userProfile?.phone}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Giới tính : " : "Sex: "}
          </strong>
          {displaySex}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Ngày sinh : " : "Birthday: "}
          </strong>
          {userProfile?.birthday ? (
            dayjs(userProfile?.birthday).format("DD-MM-YYYY")
          ) : (
            <span className="italic text-gray-400">
              {isLanguageVN ? "Chưa có thông tin" : "No information"}
            </span>
          )}
        </Text>
        <Text className="text-slate-50 pt-2 text-base">
          <strong className="text-[#E8CA72]">
            {isLanguageVN ? "Địa chỉ : " : "Address: "}
          </strong>
          {userProfile?.address}
        </Text>
      </Row>
    </div>)
  );
};

export default AccountInfomation;

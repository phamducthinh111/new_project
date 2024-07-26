"use client";

import { Button, Card, Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Image1 from "../../../public/image/home/image1.jpg";
import Image2 from "../../../public/image/home/image2.jpg";
import Image3 from "../../../public/image/home/image3.jpg";
import Image4 from "../../../public/image/home/image4.jpg";

const { Meta } = Card;
export default function Home() {
  const router = useRouter();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="text-center  bg-stone-700 bg-opacity-50 lg:p-20 p-10 pb-10">
        <strong className="text-4xl font-mono text-[#D8CFB5]">
          Hãng Cà Phê Bách Nhà cung cấp giải pháp Cà phê Việt.
        </strong>
        <p className="py-5 text-xl text-[#c2983c] font-mono">
          Đối với <strong className="italic">PĐT Coffee</strong>, chất lượng
          không phải là 'được kiểm soát' mà là 'được xây dựng'. Đó là sự nỗ lực
          được lặp đi lặp lại mỗi ngày , liên quan đến tất cả mọi người, và nó
          là một phần tất yếu của mọi công đoạn sản xuất. Rất đơn giản, đó là
          cách làm việc duy nhất mà chúng tôi biết được!
        </p>
        <Button
          onClick={() => router.push("/about")}
          className="bg-[#B89D64] border-[#B89D64] mt-10 p-5 text-xl hover:bg-transparent hover:text-[#B89D64] hover:border-[#B89D64]"
        >
          Xem thêm
        </Button>
      </div>
      <Row className="justify-center xl:m-20 ">
        <Col
          xs={24}
          sm={12}
          md={5}
          lg={5}
          className="bg-stone-700 rounded-md flex items-center mx-2 mb-4 lg:mb-0"
        >
          <Card
            className="w-full m-5 bg-stone-700 border-stone-700"
            cover={<Image src={Image1} alt="image1" />}
          >
            <Meta
              title={
                <p className="text-[#D8CFB5] italic text-center">Lịch sử</p>
              }
              description={
                <div className="text-slate-50 italic text-justify">
                  <b className="text-[#D8CFB5] underline">Cà phê</b> bắt nguồn
                  từ tiếng Pháp: café là một loại thức uống được ủ từ hạt cà phê
                  rang, lấy từ quả của cây cà phê. Các giống cây cà phê được bắt
                  nguồn từ vùng nhiệt đới châu Phi và các vùng Madagascar,
                  Comoros, Mauritius và Réunion trên các khu vực thuộc đường
                  xích đạo. Giống cây này được xuất khẩu từ châu Phi tới các
                  nước trên thế giới và hiện nay đã được trồng tại tổng cộng hơn{" "}
                  <span className="underline">70 quốc gia</span>, chủ yếu là các
                  khu vực nằm gần đường xích đạo thuộc{" "}
                  <span className="underline">Châu Mỹ, Đông Nam Á, Ấn Độ</span>{" "}
                  và <span className="underline">Châu Phi</span>.
                </div>
              }
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={5}
          lg={5}
          className="bg-[#B89D64] rounded-md flex items-center mx-2 mb-4 lg:mb-0"
        >
          <Card
            className="w-full m-5 bg-[#B89D64] border-[#B89D64]"
            cover={<Image src={Image2} alt="image2"  />}
          >
            <Meta
              title={
                <h2 className="text-[#29231a] italic text-center">Lợi ích</h2>
              }
              description={
                <div className="text-black italic text-justify">
                  Cafe là loại đồ uống phổ biến hàng đầu trên thế giới với nhiều
                  lợi ích cho sức khỏe. Một tách cafe mỗi sáng không chỉ giúp
                  bạn cảm thấy tràn đầy năng lượng, đốt cháy lượng mỡ thừa và
                  nâng cao thể chất mà còn có thể làm giảm nguy cơ mắc một số
                  bệnh như đái tháo đường tuýp 2, ung thư, bệnh Alzheimer và
                  bệnh Parkinson.
                </div>
              }
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={5}
          lg={5}
          className="bg-[#513826] rounded-md flex items-center mx-2 mb-4 lg:mb-0"
        >
          <Card
            className="w-full m-5 bg-[#513826] border-[#513826]"
            cover={<Image src={Image3} alt="image3"  />}
          >
            <Meta
              title={
                <p className="text-[#D8CFB5] italic text-center">Sản lượng</p>
              }
              description={
                <div className="text-[#FFA500] italic text-justify">
                  Brasil là nước sản xuất cà phê lớn nhất trên thế giới với sản
                  lượng trên 1,7 triệu tấn hàng năm, chiếm 25% thị trường quốc
                  tế.
                  <br /> <br />
                  Các nước xuất khẩu lớn khác là Việt Nam, Colombia, Indonesia,
                  Côte d'Ivoire, México, Ấn Độ, Guatemala, Ethiopia, Uganda,
                  Costa Rica, Peru và El Salvador. Những nước tiêu thụ cà phê
                  lớn nhất là Hoa Kỳ, Đức, Pháp, Nhật Bản và Ý.
                </div>
              }
            />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={5}
          lg={5}
          className="bg-[#846149] rounded-md flex items-center mx-2 mb-4 lg:mb-0"
        >
          <Card
            className="w-full m-5 bg-[#846149] border-[#846149]"
            cover={<Image src={Image4} alt="image4"  />}
          >
            <Meta
              title={
                <p className="text-[#FFD700] italic text-center">Tiêu thụ</p>
              }
              description={
                <div className="text-slate-50 italic text-justify">
                  - Người <b className="text-[#eed075]">Phần Lan</b> uống nhiều
                  cà phê nhất thế giới. <br />- Nước tiêu thụ cà phê lớn nhất
                  thế giới là <b className="text-[#eed075]">Hoa Kỳ</b>. Trung
                  bình mỗi người Mỹ tiêu thụ 4,8 kg hay 646 tách một năm (1,8
                  tách một ngày). <br />- Mỗi người{" "}
                  <b className="text-[#eed075]">Đức</b> uống trung bình 4 tách
                  cà phê một ngày. Vì vậy cà phê là thức uống được ưa thích nhất
                  của người Đức đứng trước bia. <br />- Ở{" "}
                  <b className="text-[#eed075]">Việt Nam</b> lượng cà phê tiêu
                  thụ nội địa còn rất khiêm tốn. Mỗi người Việt Nam một năm chỉ
                  dùng hết khoảng nửa kg cà phê, bằng một phần mười các nước
                  châu Âu.
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

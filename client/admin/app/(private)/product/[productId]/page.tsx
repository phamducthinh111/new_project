import Image from "next/image";

export default function Product({params}:any) {

  return (
    <div >
      <span>product{params.productId}</span>
    </div>
  );
}

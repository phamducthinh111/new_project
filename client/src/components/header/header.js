import Link from 'next/link';
// import Logo from '../../../public/logo/logo1.png'
import Logo from '../../../public/logo/logo.png'
import Image from 'next/image';
import { Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
function Header() {
  const headerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ (màu đen với độ trong suốt 50%)
  };
  return (
    <header className=" py-2 text-white" style={headerStyle}>
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center font-serif text-xl">
        <div className="logo">
          <Link href="/">
            <Image
              src={Logo}
              width={100}
            />
          </Link>
        </div>
        <div className="menu ">
          <nav className="flex ">
            <Link className='px-4 hover:underline' href="/dashboard">
              Dashboard
            </Link>
            <Link className='px-4 hover:underline' href="/shop">
              Shop
            </Link>
            <Link className='px-4 hover:underline' href="/menu">
              Menu
            </Link>
            <Link className='px-4 hover:underline' href="/blog">
              Blog
            </Link>
          </nav>
        </div>
        <div className="user-actions mb-2 text-2xl">
          <Link className='px-5 hover:text-yellow-400' href="/account">
            <UserOutlined />
          </Link>
          <Link href="/cart" className='hover:text-yellow-400'>
            <ShoppingCartOutlined />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

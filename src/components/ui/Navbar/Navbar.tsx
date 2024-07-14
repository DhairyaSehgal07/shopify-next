import { FC } from "react";
import Container from "../Container/Container";
import Link from "next/link";
import Usernav from "../Usernav/Usernav";

const Navbar: FC = () => {
  return (
    <>
      <Container>
        <div className="flex flex-row md:py-6 gap-8 ">
          <div className="flex flex-1 items-center ">
            <Link href="/">
              <h1 className="text-2xl font-bold">SHOPIFY_STORE</h1>
            </Link>
            <nav className="ml-8 mt-[0.4px] space-x-6">
              <Link
                className="text-gray-600 leading-6 font-medium transition; hover:text-gray-400 "
                href="/"
              >
                <span>All</span>
              </Link>
              <Link
                className="text-gray-600 leading-6 font-medium transition; hover:text-gray-400"
                href="/"
              >
                <span>Clothes</span>
              </Link>
              <Link
                className="text-gray-600 leading-6 font-medium transition duration-200 hover:text-gray-400"
                href="/"
              >
                <span>Accesories</span>
              </Link>
              <Link
                className="text-gray-600 leading-6 font-medium transition duration-200 hover:text-gray-400"
                href="/"
              >
                <span>Shoes</span>
              </Link>
            </nav>
            <div className="flex flex-1 justify-end space-x-8">
              <Usernav />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;

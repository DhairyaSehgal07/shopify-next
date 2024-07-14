import { FC } from "react";
import Link from "next/link";
import Container from "../Container/Container";

interface Props {
  headline: string;
  description: string;
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <>
      <div className="bg-black text-white p-4">
        <Container>
          <div className="flex flex-col gap-24 py-32 justify-center md:flex-row">
            <h2
              className="w-full text-center mt-6  text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none
         sm:tracking-tight lg:text-6xl"
            >
              {headline}
            </h2>
            <div>
              <p className="mt-5 text-xl leading-7 text-white;">
                {description}
              </p>
              <Link
                className="block text-white pt-3 font-bold hover:underline cursor-pointer"
                href="/"
              >
                Read it here
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;

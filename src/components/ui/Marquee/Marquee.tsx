import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode[];
}

const Marquee: FC<Props> = ({ children }) => {
  return (
    <>
      <div className=" h-[320px]">
        <div className="flex flex-row mx-auto items-center justify-center">{children}</div>
      </div>
    </>
  );
};

export default Marquee;

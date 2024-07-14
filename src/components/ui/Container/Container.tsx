import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const Container: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="max-w-[1920px] px-6 mx-auto">{children}</div>
    </>
  );
};

export default Container;

import { FC, ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

const Grid: FC<GridProps> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 my-8 mx-2">{children}</div>
    </>
  );
};

export default Grid;

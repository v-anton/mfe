import React from "react";

type Props = {
  white?: boolean;
  className?: string;
};

export const Logo: React.FunctionComponent<Props> = ({ white, className }) => (
  <div className={className}>
    {white && <img src="/HS-Logo-Horizontal_Blanc.png" alt="logo" />}
    {!white && <img src="/HS-Logo-Horizontal.png" alt="logo" />}
  </div>
);

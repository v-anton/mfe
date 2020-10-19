import React, { ReactChildren, ReactChild } from "react";
import cn from "classnames";

import css from "./headling.module.css";

type Props = {
  children: ReactChild | ReactChildren;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  color?: string;
};

export const Headling: React.FC<Props> = ({
  level,
  className,
  children,
  color,
}) => {
  const Tag = level;

  return (
    <Tag
      className={cn(
        className,
        css.headling,
        css[Tag],
        color || "text-hs-black",
      )}
    >
      {children}
    </Tag>
  );
};

import React, { ReactChildren, ReactChild } from "react";
import cn from "classnames";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import css from "./button.module.css";
import { TODO_ANY } from "../../../types/common";

type Props = {
  children: ReactChild | ReactChildren;
  className?: string;
  light?: boolean;
  small?: boolean;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: TODO_ANY;
  color?: "darkblue" | "yellow" | "red" | "green";
  icon?: IconDefinition;
};

export const Button: React.FC<Props> = ({
  children,
  className,
  light,
  small,
  disabled,
  type,
  onClick,
  color,
  icon,
}: Props) => (
  <button
    className={cn(
      css.button,
      light ? css.light : css.dark,
      small ? css.small : css.big,
      color ? `bg-hs-${color}` : "bg-hs-darkblue",
      className,
    )}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    <>
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
          <FontAwesomeIcon icon={icon} size="2x" className="p-1" />
        </div>
      )}
      <div>{children}</div>
    </>
  </button>
);

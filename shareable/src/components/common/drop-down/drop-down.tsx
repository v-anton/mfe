import React, {
  ReactChildren,
  ReactChild,
  useRef,
  useState,
  useCallback,
} from "react";
import cn from "classnames";
import { useClickAway } from "react-use";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
  label: string;
  children: ReactChild | ReactChildren;
};

export const DropDown: React.FC<Props> = ({
  className,
  label,
  children,
}: Props) => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useClickAway(ref, () => {
    setOpen(false);
  });

  const toggleDropDown = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        className="outline-none focus:outline-none flex flex-no-wrap items-center"
        onClick={toggleDropDown}
      >
        {label}
        <FontAwesomeIcon className="ml-2" icon={faChevronDown} size="xs" />
      </button>
      {open && (
        <div ref={ref} className={cn("absolute mt-6", className)}>
          {children}
        </div>
      )}
    </>
  );
};

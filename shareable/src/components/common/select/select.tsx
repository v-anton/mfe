import { useState, useCallback, useRef, useEffect } from "react";
import { useClickAway } from "react-use";
import cn from "classnames";

import {
  faChevronDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TODO_ANY } from "../../../types/common";

export type SelectOptionType = {
  value: string;
  label: string;
  icon?: IconDefinition;
  img?: string;
};

type Props = {
  name: string;
  label?: string;
  options: TODO_ANY;
  value: SelectOptionType;
};

export const Select: React.FC<Props> = ({ name, label, options }: Props) => {
  const [opened, setOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    SelectOptionType | undefined
  >(undefined);

  const ref = useRef(null);

  useEffect(() => {
    setSelectedValue(options[0]);
  }, [options]);

  useClickAway(ref, () => {
    setOpened(false);
  });

  const toggleSelect = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  const selectOption = useCallback(
    (index: number) => {
      setSelectedValue(options[index]);
      setOpened(false);
    },
    [setSelectedValue, options],
  );

  return (
    <div className="flex flex-col my-2 w-full">
      {label && (
        <label htmlFor={name} className="ml-4 mb-1 text-hs-black text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            onClick={toggleSelect}
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="px-4 py-2 rounded-md shadow-md block w-full appearance-none leading-normal text-hs-black border-hs-lightgray border focus:outline-none"
          >
            <div className="flex pr-6">
              {selectedValue?.img && (
                <img
                  src={selectedValue.img}
                  alt={selectedValue.label || selectedValue.value}
                  className="flex-shrink-0 w-8 h-6"
                />
              )}
              {selectedValue?.label && (
                <span className="block truncate pr-6">
                  {selectedValue?.label}
                </span>
              )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <FontAwesomeIcon icon={faChevronDown} size="1x" />
            </div>
          </button>
        </span>

        {opened && (
          <div
            ref={ref}
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 overflow-x-hidden max-h-hs-300px"
          >
            <ul className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
              {options.map((option: SelectOptionType, index: number) => (
                <li
                  key={`select-${option.value}`}
                  className="text-hs-black cursor-default select-none relative hover:bg-hs-yellow"
                >
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center space-x-3 py-2 px-3 pr-9 focus:outline-none",
                      {
                        "justify-center": !option.label,
                      },
                    )}
                    onClick={() => selectOption(index)}
                  >
                    {option.img && (
                      <img
                        src={option.img}
                        alt={option.label || option.value}
                        className="flex-shrink-0 w-8"
                      />
                    )}
                    {option.label && (
                      <span className="font-normal block truncate">
                        {option.label}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

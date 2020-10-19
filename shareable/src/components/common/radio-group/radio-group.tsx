import React from "react";

import { TODO_ANY } from "../../../types/common";

export type OptionType = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  className?: string;
  disabled?: boolean;
  onClick?: TODO_ANY;
  options: OptionType[];
  value: OptionType;
  label?: string;
};

export const RadioGroup: React.FC<Props> = ({
  name,
  options,
  label,
  // value,
}) => (
  <div className="my-2 w-full">
    {label && (
      <label htmlFor={name} className="ml-4 mb-1 text-hs-black text-sm">
        {label}
      </label>
    )}
    <div className="flex flex-wrap px-2">
      {options.map((option: OptionType) => (
        <div key={`${name}-${option.value}`} className="mr-2 flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked
            className="shadow-inner w-6 h-6 bg-white border border-hs-yellow appearance-none rounded-full checked:bg-hs-yellow focus:outline-none cursor-pointer checked:shadow-xs"
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="m-4 text-hs-black cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

import React from "react";

import css from "./input.module.css";
import { TODO_ANY } from "../../../types/common";

type Props = {
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onChange: (
    eventOrPath: string | React.ChangeEvent<TODO_ANY>,
  ) =>
    | void
    | ((eventOrTextValue: string | React.ChangeEvent<TODO_ANY>) => void);
  onBlur: (eventOrString: TODO_ANY) => void | ((e: TODO_ANY) => void);
};

export const Input: React.FC<Props> = ({
  name,
  type,
  value,
  placeholder,
  label,
  disabled,
  onChange,
  onBlur,
}: Props) => (
  <div className={css.wrapper}>
    {label && (
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
    )}
    <input
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={css.input}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
    />
  </div>
);

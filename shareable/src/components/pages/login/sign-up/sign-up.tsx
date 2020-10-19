import React from "react";

import css from "./sign-up.module.css";

type Props = {
  name: string;
};

export const SignUp: React.FC<Props> = ({ name }: Props) => (
  <div className={css.wrapper}>
    <div className={css.label}>SIGN UP TO OUR NEWSLETTER</div>
    <div className={css.container}>
      <input className={css.input} name={name} placeholder="Email address" />
      <button disabled={false} type="submit" className={css.submit}>
        SIGN UP
      </button>
    </div>
  </div>
);

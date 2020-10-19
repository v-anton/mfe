import { useFormik } from "formik";
import * as yup from "yup";
import { Auth } from "@aws-amplify/auth";
import { AuthState } from "@aws-amplify/ui-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage, useIntl } from "react-intl";

import { Logo } from "../../logo";
import { Input } from "../../common/input/input";
import { Button } from "../../common/button";
import { dispatchAuthStateChangeEvent } from "../../../utils/amplify-helpers";

import { messages } from "./forgot-password.messages";
import css from "./forgot-password.module.css";

const resetScheme = yup.object({
  username: yup.string().min(1).required(),
});

export const ForgotPassword: React.FC = () => {
  const { formatMessage } = useIntl();

  const formik = useFormik({
    validationSchema: resetScheme,
    initialValues: {
      username: "",
      email: "",
    },
    initialStatus: {
      success: false,
      error: null,
    },
    onSubmit: async (values, { setStatus }) => {
      try {
        await Auth.forgotPassword(values.username);
        setStatus({ success: true });
      } catch (error) {
        setStatus({ error });
      }
    },
  });

  return (
    <>
      <div
        className="absolute w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url(sam-mgrdichian-4Aev9YjxTrU-unsplash@2x.png)",
        }}
      />
      <div className={css.wrapper}>
        <div className={css.container}>
          <a
            href="#"
            onClick={() => dispatchAuthStateChangeEvent(AuthState.SignIn)}
          >
            <FontAwesomeIcon icon={faTimes} className={css["close-button"]} />
          </a>
          <Logo />
          {!formik.status.success && (
            <>
              <h1 className={css.header}>
                <FormattedMessage {...messages.header} />
              </h1>
              <form onSubmit={formik.handleSubmit} className={css.form}>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="username"
                  type="text"
                  value={formik.values.username}
                  label={formatMessage(messages["username.label"])}
                />
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  type="text"
                  value={formik.values.email}
                  label={formatMessage(messages["password.label"])}
                />
                <Button
                  disabled={false}
                  type="submit"
                  className={css["reset-btn"]}
                >
                  <FormattedMessage {...messages["reset-btn.label"]} />
                </Button>
                {formik.status.error && (
                  <p className="text-red-500">
                    Error: {formik.status.error.message}
                  </p>
                )}
              </form>
            </>
          )}
          {formik.status.success && (
            <p>
              <FormattedMessage {...messages["success.text"]} />
            </p>
          )}
        </div>
      </div>
    </>
  );
};

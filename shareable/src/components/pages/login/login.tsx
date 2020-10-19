import { FormattedMessage, useIntl } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faYoutube,
  faInstagram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { Auth } from "@aws-amplify/auth";
import { AuthState } from "@aws-amplify/ui-components";

import css from "./login.module.css";
import { Logo } from "../../logo";
import { Input } from "../../common/input/input";
import { Button } from "../../common/button";
import { SignUp } from "./sign-up/sign-up";
import { DropDown } from "../../common/drop-down/drop-down";
import { dispatchAuthStateChangeEvent } from "../../../utils/amplify-helpers";

import { messages } from "./login.messages";

const loginScheme = yup.object({
  username: yup.string().min(1).required(),
  password: yup.string().min(1).required(),
});

const LINKS = {
  TEAMVIEWER: "https://www.teamviewer.com/en/download",
  FACEBOOK: "https://www.facebook.com/hotelspider/",
  YOUTUBE: "https://www.youtube.com/channel/UCE7ylbBtM9wJsPcBqR6KF0g",
  LINKEDIN: "https://www.linkedin.com/company/hotel-spider/",
  INSTAGRAM: "https://www.instagram.com/hotel_spider/",
};

const SOCIAL_ICON_SIZE = "2x";

export const Login: React.FC = () => {
  const { formatMessage } = useIntl();

  const formik = useFormik({
    validationSchema: loginScheme,
    initialValues: {
      username: "",
      password: "",
    },
    initialStatus: { error: null },
    onSubmit: async (values, { setStatus }) => {
      try {
        await Auth.signIn(values.username, values.password);
      } catch (error) {
        setStatus({ error });
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values: { username, password },
    isSubmitting,
    status: { error },
  } = formik;

  return (
    <>
      <div
        style={{
          backgroundImage: "url(sam-mgrdichian-4Aev9YjxTrU-unsplash@2x.png)",
        }}
        className="absolute w-full h-full bg-cover bg-center z-0"
      />
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css["container-inner-left"]}>
            <Logo />
            <h1 className={css["login-title"]}>
              <FormattedMessage {...messages.header} />
            </h1>
            <form onSubmit={handleSubmit} className={css["login-form"]}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                type="text"
                value={username}
                label={formatMessage(messages["username.label"])}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                value={password}
                label={formatMessage(messages["password.label"])}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className={css["login-btn"]}
              >
                <FormattedMessage {...messages["login-btn.label"]} />
              </Button>
              <button
                type="button"
                onClick={() =>
                  dispatchAuthStateChangeEvent(AuthState.ForgotPassword)
                }
                className={css["forgot-password-text"]}
              >
                <FormattedMessage {...messages["forgot.label"]} />
              </button>
              {error && <p className={css.error}>Error: {error.message}</p>}
              <div className={css.footer}>
                <DropDown
                  label={formatMessage(messages["help.label"])}
                  className={css["drop-down"]}
                >
                  <>
                    <h1 className={css.underline}>
                      <FormattedMessage {...messages["help.write.label"]} />
                    </h1>
                    <h1 className="py-1">
                      <a
                        href={`mailto:${formatMessage(
                          messages["help.email.label"],
                        )}`}
                      >
                        <FormattedMessage {...messages["help.email.label"]} />
                      </a>
                    </h1>
                    <h1 className={css.underline}>
                      <FormattedMessage {...messages["help.call.label"]} />
                    </h1>
                    <h1 className="pt-1">
                      <FormattedMessage {...messages["help.phone1.label"]} />
                    </h1>
                    <h1>
                      <FormattedMessage {...messages["help.phone2.label"]} />
                    </h1>
                    <h1>
                      <FormattedMessage {...messages["help.phone3.label"]} />
                    </h1>
                  </>
                </DropDown>
                <div className="border-r border-hs-yellow mx-4" />
                <a
                  href={LINKS.TEAMVIEWER}
                  className="outline-none focus:outline-none"
                >
                  <FormattedMessage {...messages["teamviewer.label"]} />
                </a>
              </div>
            </form>
          </div>
          <div className={css["container-inner-right"]}>
            <h1>
              <FormattedMessage {...messages["join.label"]} />
            </h1>
            <span>
              <FormattedMessage {...messages["join.text"]} />
            </span>
            <div className={css["social-links-wrapper"]}>
              <a href={LINKS.LINKEDIN}>
                <FontAwesomeIcon
                  className={css.link}
                  icon={faLinkedin}
                  size={SOCIAL_ICON_SIZE}
                />
              </a>
              <a href={LINKS.YOUTUBE}>
                <FontAwesomeIcon
                  className={css.link}
                  icon={faYoutube}
                  size={SOCIAL_ICON_SIZE}
                />
              </a>
              <a href={LINKS.INSTAGRAM}>
                <FontAwesomeIcon
                  className={css.link}
                  icon={faInstagram}
                  size={SOCIAL_ICON_SIZE}
                />
              </a>
              <a href={LINKS.FACEBOOK}>
                <FontAwesomeIcon
                  className={css.link}
                  icon={faFacebookF}
                  size={SOCIAL_ICON_SIZE}
                />
              </a>
            </div>
            <SignUp name="sign-up" />
          </div>
        </div>
      </div>
    </>
  );
};

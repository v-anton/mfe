import * as yup from "yup";
import { useFormik } from "formik";
import { FormattedMessage } from "react-intl";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { PersonalInformation } from "./partials/personal-information";
import { ContactInformation } from "./partials/contact-information";
import { Headling } from "../../common/headling";
import { Localisation } from "./partials/localisation";
import { ExtranetPreferences } from "./partials/extranet-preferences";
import { Button } from "../../common/button";

import { useGetProfileQuery } from "../../../generated/graphql";

const userSettingsScheme = yup.object({
  username: yup.string().min(1).required(),
});

export const UserSettings: React.FC = () => {
  const query = useGetProfileQuery();
  console.log(query);

  const formik = useFormik({
    validationSchema: userSettingsScheme,
    initialValues: {
      username: "",
      prefix: { value: "", label: "" },
      firstname: "",
      lastname: "",
      companyname: "",
      jobtitle: "",
      email: "",
      phoneCountryCode: { value: "", label: "" },
      faxCountryCode: { value: "", label: "" },
      language: { value: "", label: "" },
      dateformat: { value: "", label: "" },
      defaulthomepage: { value: "", label: "" },
    },
    initialStatus: { error: null },
    onSubmit: async (/* values, { setStatus } */) => {
      //
    },
  });

  const {
    // handleSubmit,
    handleChange,
    handleBlur,
    values: {
      username,
      prefix,
      firstname,
      lastname,
      companyname,
      jobtitle,
      email,
      phoneCountryCode,
      faxCountryCode,
      language,
      dateformat,
      defaulthomepage,
    },
    // isSubmitting,
    // status: { error },
  } = formik;

  return (
    <div className="px-16">
      <div className="py-10 px-16">
        <Headling level="h5" className="uppercase font-black text-hs-black">
          <FormattedMessage
            id="user-settings-page.profile.label"
            defaultMessage="Profile"
          />
        </Headling>
        <div className="px-10">
          <div className="flex justify-between flex-wrap">
            <PersonalInformation
              usernameValue={username}
              prefixValue={prefix}
              firstnameValue={firstname}
              lastnameValue={lastname}
              companynameValue={companyname}
              jobtitleValue={jobtitle}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ContactInformation
              emailValue={email}
              phoneCountryCodeValue={phoneCountryCode}
              faxCountryCodeValue={faxCountryCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <hr className="border-hs-yellow my-12" />
        <Headling level="h5" className="uppercase font-black text-hs-black">
          <FormattedMessage
            id="user-settings-page.extranet.label"
            defaultMessage="Extranet"
          />
        </Headling>
        <div className="px-10">
          <div className="flex justify-between flex-wrap">
            <Localisation
              languageValue={language}
              dateformatValue={dateformat}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ExtranetPreferences
              defaulthomepageValue={defaulthomepage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <hr className="border-hs-darkgray mb-4" />
      <div className="flex justify-between pb-6">
        <Button type="button" light>
          <FormattedMessage
            id="user-settings-page.cancel-btn.label"
            defaultMessage="Cancel"
          />
        </Button>
        <Button type="button" color="green" icon={faUpload}>
          <FormattedMessage
            id="user-settings-page.save-btn.label"
            defaultMessage="Save"
          />
        </Button>
      </div>
    </div>
  );
};

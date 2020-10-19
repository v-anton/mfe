import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffectOnce } from "react-use";

import { TODO_ANY } from "../../../../types/common";
import { Headling } from "../../../common/headling";
import { Input } from "../../../common/input";
import { Select, SelectOptionType } from "../../../common/select";
import { getCountriesData } from "../../../../utils/countries-helper";

type Props = {
  emailValue: string;
  phoneCountryCodeValue: SelectOptionType;
  faxCountryCodeValue: SelectOptionType;
  onChange: (
    eventOrPath: string | React.ChangeEvent<TODO_ANY>,
  ) =>
    | void
    | ((eventOrTextValue: string | React.ChangeEvent<TODO_ANY>) => void);
  onBlur: (eventOrString: TODO_ANY) => void | ((e: TODO_ANY) => void);
};

type CountryData = {
  name: string;
  code: string;
  flag: string;
};

export const ContactInformation: React.FC<Props> = ({
  emailValue,
  phoneCountryCodeValue,
  faxCountryCodeValue,
  onChange,
  onBlur,
}) => {
  const { formatMessage } = useIntl();
  const [countryFlags, setCountryFlags] = useState([]);

  useEffectOnce(() => {
    const countriesOptions = getCountriesData().map((country: CountryData) => ({
      value: country.code,
      img: country.flag,
    }));

    setCountryFlags(countriesOptions as []);
  });

  return (
    <div className="flex flex-col w-full max-w-md mt-10">
      <Headling
        level="h6"
        className="px-4 border-b border-hs-darkgray mb-6 uppercase"
      >
        <FormattedMessage
          id="user-settings-page.contact-information.label"
          defaultMessage="Contact Information"
        />
      </Headling>
      <div className="flex flex-col">
        <Input
          name="email"
          type="text"
          label={formatMessage({
            id: "user-settings-page.email.label",
            defaultMessage: "Email",
          })}
          value={emailValue}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="flex">
          <div className="w-32">
            <Select
              value={phoneCountryCodeValue}
              label={formatMessage({
                id: "user-settings-page.phone-country-code.label",
                defaultMessage: "Country",
              })}
              name="phone-country-code"
              options={countryFlags}
            />
          </div>
          <div className="w-8" />
          <Input
            name="phone"
            type="text"
            label={formatMessage({
              id: "user-settings-page.phone.label",
              defaultMessage: "Phone",
            })}
            value={emailValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <div className="flex">
          <div className="w-32">
            <Select
              value={faxCountryCodeValue}
              label={formatMessage({
                id: "user-settings-page.fax-country-code.label",
                defaultMessage: "Country",
              })}
              name="fax-country-code"
              options={countryFlags}
            />
          </div>
          <div className="w-8" />
          <Input
            name="fax"
            type="text"
            label={formatMessage({
              id: "user-settings-page.fax.label",
              defaultMessage: "Fax",
            })}
            value={emailValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};

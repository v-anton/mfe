import { FormattedMessage, useIntl } from "react-intl";
import { TODO_ANY } from "../../../../types/common";
import { Headling } from "../../../common/headling";
import { Input } from "../../../common/input";
import { Select, SelectOptionType } from "../../../common/select";

type Props = {
  usernameValue: string;
  prefixValue: SelectOptionType;
  firstnameValue: string;
  lastnameValue: string;
  companynameValue: string;
  jobtitleValue: string;
  onChange: (
    eventOrPath: string | React.ChangeEvent<TODO_ANY>,
  ) =>
    | void
    | ((eventOrTextValue: string | React.ChangeEvent<TODO_ANY>) => void);
  onBlur: (eventOrString: TODO_ANY) => void | ((e: TODO_ANY) => void);
};

export const PersonalInformation: React.FC<Props> = ({
  usernameValue,
  prefixValue,
  firstnameValue,
  lastnameValue,
  companynameValue,
  jobtitleValue,
  onChange,
  onBlur,
}) => {
  const { formatMessage } = useIntl();

  const prefixes = [
    { value: "mr", label: "Mr" },
    { value: "mrs", label: "Mrs" },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mt-10">
      <Headling
        level="h6"
        className="px-4 border-b border-hs-darkgray mb-6 uppercase "
      >
        <FormattedMessage
          id="user-settings-page.personal-information.label"
          defaultMessage="Personal Information"
        />
      </Headling>
      <div className="flex flex-col">
        <Input
          name="username"
          type="text"
          label={formatMessage({
            id: "user-settings-page.username.label",
            defaultMessage: "Username",
          })}
          value={usernameValue}
          onChange={onChange}
          onBlur={onBlur}
          disabled
        />
        <div className="flex">
          <div className="w-32">
            <Select
              value={prefixValue}
              label={formatMessage({
                id: "user-settings-page.prefix.label",
                defaultMessage: "Prefix",
              })}
              name="prefixes"
              options={prefixes}
            />
          </div>
          <div className="w-8" />
          <Input
            name="firstname"
            type="text"
            label={formatMessage({
              id: "user-settings-page.firstname.label",
              defaultMessage: "First name",
            })}
            value={firstnameValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <Input
          name="lastname"
          type="text"
          label={formatMessage({
            id: "user-settings-page.lastname.label",
            defaultMessage: "Last name",
          })}
          value={lastnameValue}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="flex">
          <Input
            name="companyname"
            type="text"
            label={formatMessage({
              id: "user-settings-page.companyname.label",
              defaultMessage: "Company name",
            })}
            value={companynameValue}
            onChange={onChange}
            onBlur={onBlur}
          />
          <div className="w-12" />
          <Input
            name="jobtitle"
            type="text"
            label={formatMessage({
              id: "user-settings-page.jobtitle.label",
              defaultMessage: "Job title",
            })}
            value={jobtitleValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};

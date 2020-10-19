import { FormattedMessage, useIntl } from "react-intl";
import { TODO_ANY } from "../../../../types/common";
import { Select, SelectOptionType } from "../../../common/select";
import { Headling } from "../../../common/headling";

type Props = {
  languageValue: SelectOptionType;
  dateformatValue: SelectOptionType;
  onChange: (
    eventOrPath: string | React.ChangeEvent<TODO_ANY>,
  ) =>
    | void
    | ((eventOrTextValue: string | React.ChangeEvent<TODO_ANY>) => void);
  onBlur: (eventOrString: TODO_ANY) => void | ((e: TODO_ANY) => void);
};

export const Localisation: React.FC<Props> = ({
  languageValue,
  dateformatValue,
  // onChange,
  // onBlur,
}) => {
  const { formatMessage } = useIntl();

  const languages = [
    { value: "en", label: "English" },
    { value: "de", label: "German" },
    { value: "fr", label: "French" },
  ];

  const dateFormats = [
    { value: "1", label: "DD.MM.YYYY" },
    { value: "2", label: "MM-DD-YYYY" },
    { value: "3", label: "DD/MM/YYYY" },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mt-10">
      <Headling
        level="h6"
        className="px-4 border-b border-hs-darkgray mb-6 uppercase"
      >
        <FormattedMessage
          id="user-settings-page.localisation.label"
          defaultMessage="Localisation"
        />
      </Headling>
      <div className="flex flex-col">
        <div className="flex">
          <Select
            name="language"
            value={languageValue}
            label={formatMessage({
              id: "user-settings-page.language.label",
              defaultMessage: "Language",
            })}
            options={languages}
          />
          <div className="w-12" />
          <Select
            name="dateformat"
            value={dateformatValue}
            label={formatMessage({
              id: "user-settings-page.dateformat.label",
              defaultMessage: "Date Format",
            })}
            options={dateFormats}
          />
        </div>
      </div>
    </div>
  );
};

import { FormattedMessage, useIntl } from "react-intl";
import { TODO_ANY } from "../../../../types/common";
import { Headling } from "../../../common/headling";
import { Select, SelectOptionType } from "../../../common/select";
import { RadioGroup } from "../../../common/radio-group";

type Props = {
  defaulthomepageValue: SelectOptionType;
  onChange: (
    eventOrPath: string | React.ChangeEvent<TODO_ANY>,
  ) =>
    | void
    | ((eventOrTextValue: string | React.ChangeEvent<TODO_ANY>) => void);
  onBlur: (eventOrString: TODO_ANY) => void | ((e: TODO_ANY) => void);
};

const pages = [{ value: "en", label: "Dashboard" }];

export const ExtranetPreferences: React.FC<Props> = ({
  defaulthomepageValue,
  // onChange,
  // onBlur,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex flex-col w-full max-w-md mt-10">
      <Headling
        level="h6"
        className="px-4 border-b border-hs-darkgray mb-6 uppercase"
      >
        <FormattedMessage
          id="user-settings-page.extranet-preferences.label"
          defaultMessage="Extranet Preferences"
        />
      </Headling>
      <div className="flex flex-col">
        <Select
          name="defaulthomepage"
          value={defaulthomepageValue}
          label={formatMessage({
            id: "user-settings-page.defaulthomepage.label",
            defaultMessage: "Default Homepage",
          })}
          options={pages}
        />
        <RadioGroup
          name="test"
          label={formatMessage({
            id: "user-settings-page.displaytype.label",
            defaultMessage: "Display Type",
          })}
          value={{ value: "val1", label: "test 1" }}
          options={[
            {
              value: "val1",
              label: formatMessage({
                id: "user-settings-page.displaytype.normal.label",
                defaultMessage: "Normal",
              }),
            },
            {
              value: "val2",
              label: formatMessage({
                id: "user-settings-page.displaytype.compressed.label",
                defaultMessage: "Compressed",
              }),
            },
          ]}
        />
      </div>
    </div>
  );
};

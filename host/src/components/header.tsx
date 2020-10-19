import React from "react";
import {
  faPowerOff,
  faChevronRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from "@aws-amplify/auth";
import { FormattedMessage, MessageDescriptor } from "react-intl";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { Button } from "./common/button/button";
import { getMessagesByPath } from "./menu/menu-items";
import { Headling } from "./common/headling";

type Props = {
  title: string;
  connectivityStatus: number;
};

const connectivityColors = ["darkgray", "green", "red", "yellow", "blue"];

export const Header: React.FC<Props> = ({ title, connectivityStatus }) => {
  const location = useLocation();
  const titleMessages = getMessagesByPath(location.pathname);

  return (
    <header className="shadow-md w-full py-6 px-12 flex justify-between items-center sticky top-0 z-10 bg-white">
      <div className="flex items-center">
        {titleMessages.map((message: MessageDescriptor, index: number) => (
          <>
            <Headling level="h4">
              <FormattedMessage {...message} key={`label-${message.id}`} />
            </Headling>
            {index < titleMessages.length - 1 && (
              <FontAwesomeIcon className="mx-2" icon={faChevronRight} />
            )}
          </>
        ))}
      </div>

      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faCircle}
          className={cn(
            "mx-4",
            `text-hs-${connectivityColors[connectivityStatus]}`,
          )}
        />
        <Headling level="h5">{title}</Headling>
        <div className="mx-4 border-r border-hs-yellow h-10" />
        <Button type="button" light small onClick={() => Auth.signOut()}>
          <>
            <FontAwesomeIcon
              className="mr-4 text-hs-yellow"
              icon={faPowerOff}
            />
            <FormattedMessage
              id="appshell.header.logout.label"
              defaultMessage="Logout"
            />
          </>
        </Button>
      </div>
    </header>
  );
};

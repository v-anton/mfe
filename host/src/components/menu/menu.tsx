import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FormattedMessage } from "react-intl";

import { Logo } from "../logo";
import { menu } from "./menu-items";
import { TODO_ANY } from "../../types/common";
import { Headling } from "../common/headling";

type Props = {
  visibleItems?: TODO_ANY;
};

const MENU_FONT_SIZE = "base";

const showMenuGroup = (item: TODO_ANY, visibleItems: TODO_ANY) => {
  return (
    menu.filter(
      (menuItem) =>
        menuItem.parent === item.id && visibleItems[menuItem.id as string],
    ).length > 0
  );
};

export const Menu: React.FC<Props> = ({ visibleItems }) => (
  <div className="flex-col bg-hs-darkblue h-screen fixed w-hs-280px pt-hs-28 flex overflow-x-hidden">
    <Logo className="my-2 top-0 absolute border-b mx-10 pb-2" white />
    <div className="bg-hs-darkblue overflow-scroll h-screen">
      <ul className="px-4 mt-4 pb-6">
        {menu.map((item) => (
          <>
            {item.type === "item" && visibleItems[item.id as string] && (
              <li
                className={`text-white p-2 text-${MENU_FONT_SIZE}`}
                key={item.message.id}
              >
                <NavLink
                  to={item.href}
                  activeClassName="text-hs-yellow"
                  end={item.end}
                >
                  {item.icon && (
                    <FontAwesomeIcon
                      className="mr-4"
                      icon={item.icon as IconProp}
                      fixedWidth
                    />
                  )}
                  <FormattedMessage {...item.message} />
                </NavLink>
              </li>
            )}
            {item.type === "group" && showMenuGroup(item, visibleItems) && (
              <>
                <li
                  className={`text-white p-2 text-${MENU_FONT_SIZE}`}
                  key={item.message.id}
                >
                  <>
                    {item.icon && (
                      <FontAwesomeIcon
                        className="mr-4"
                        icon={item.icon as IconProp}
                        fixedWidth
                      />
                    )}
                    <FormattedMessage {...item.message} />
                  </>
                </li>
                {menu
                  .filter(
                    (menuItem) =>
                      menuItem.parent === item.id &&
                      visibleItems[menuItem.id as string],
                  )
                  .map((subItem) => (
                    <li
                      className={`text-white p-2 ml-12 list-disc text-${MENU_FONT_SIZE}`}
                      key={subItem.id}
                    >
                      <NavLink
                        to={subItem.href}
                        activeClassName="text-hs-yellow"
                      >
                        <FormattedMessage {...subItem.message} />
                      </NavLink>
                    </li>
                  ))}
              </>
            )}
            {item.type === "label" && (
              <li className="pt-6 p-2">
                <Headling
                  level="h5"
                  className="uppercase"
                  color="text-hs-darkgray"
                >
                  <FormattedMessage {...item.message} />
                </Headling>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  </div>
);

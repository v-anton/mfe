import { findFlagUrlByIso2Code } from "country-flags-svg";
import { getData } from "country-list";

import { TODO_ANY } from "../types/common";

export const getFlag: TODO_ANY = (countryCode: string) =>
  findFlagUrlByIso2Code(countryCode);

export const getCountriesData = () => {
  const data = getData();

  return data.map((item) => ({ ...item, flag: getFlag(item.code) }));
};

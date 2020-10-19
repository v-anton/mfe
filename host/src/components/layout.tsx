import React, { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Menu } from "./menu";
import { Header } from "./header";

const Layout: FC = ({ children }) => {
  const { hotelId } = useParams();
  const { data, isLoading, error } = useQuery(
    ["acl", hotelId],
    async (_, id) => {
      const raw = await fetch(
        `${process.env.NEXT_PUBLIC_HSV4_HOST}/webservices/extranet/getHotelInfo.php?hotelId=${id}`,
      );
      return raw.json();
    },
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error occured</>;
  }
  return (
    <div className="flex">
      <Menu visibleItems={data.showMenu} />
      <div className="flex-col w-full pl-hs-280px">
        <Header
          title={data.name}
          connectivityStatus={data.connectivityStatus}
        />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

import { FC, useMemo } from "react";
import IframeResizer from "iframe-resizer-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import resolveRewrites from "next/dist/next-server/lib/router/utils/resolve-rewrites";

const hash = "#";
const hashReplacer = "dies";
const rewrites = [
  {
    source: "/hotel/:hotelId",
    destination: `/hotel/${hashReplacer}/home`,
  },
  {
    source: "/hotel/:hotelId/rooms",
    destination: `/hotel/${hashReplacer}/rooms`,
  },
  {
    source: `/hotel/:hotelId/my-property`,
    destination: `/hotel/${hashReplacer}/hotel`,
  },
  {
    source: "/hotel/:hotelId/rateplans",
    destination: `/hotel/${hashReplacer}/rateplans`,
  },
  {
    source: "/hotel/:hotelId/products",
    destination: `/hotel/${hashReplacer}/sellableproducts`,
  },
  {
    source: "/hotel/:hotelId/services",
    destination: `/hotel/${hashReplacer}/services`,
  },
  {
    source: "/hotel/:hotelId/services/:serviceId",
    destination: `/hotel/${hashReplacer}/services/:serviceId`,
  },
  {
    source: "/hotel/:hotelId/offers",
    destination: `/hotel/${hashReplacer}/offers`,
  },
  {
    source: "/hotel/:hotelId/connectivity",
    destination: `/hotel/${hashReplacer}/bookingchannels`,
  },
  {
    source: "/hotel/:hotelId/overview",
    destination: `/hotel/${hashReplacer}/custombigtable`,
  },
  {
    source: "/hotel/:hotelId/availabilities",
    destination: `/hotel/${hashReplacer}/inventories`,
  },
  {
    source: "/hotel/:hotelId/booking-rules/hotel",
    destination: `/hotel/${hashReplacer}/bookingrules/hotel`,
  },
  {
    source: "/hotel/:hotelId/booking-rules/rooms",
    destination: `/hotel/${hashReplacer}/bookingrules/guestrooms`,
  },
  {
    source: "/hotel/:hotelId/booking-rules/rates",
    destination: `/hotel/${hashReplacer}/bookingrules/rateplans`,
  },
  {
    source: "/hotel/:hotelId/booking-rules/products",
    destination: `/hotel/${hashReplacer}/bookingrules/sellableproducts`,
  },
  {
    source: "/hotel/:hotelId/prices",
    destination: `/hotel/${hashReplacer}/rates`,
  },
  {
    source: "/hotel/:hotelId/reservations/new",
    destination: `/hotel/${hashReplacer}/reservations/new`,
  },
  {
    source: "/hotel/:hotelId/reservations/search",
    destination: `/hotel/${hashReplacer}/reservations/search`,
  },
  {
    source: "/hotel/:hotelId/history",
    destination: `/hotel/${hashReplacer}/logs`,
  },
  {
    source: "/hotel/:hotelId/settings",
    destination: `/hotel/${hashReplacer}/settings`,
  },
  {
    source: "/hotel/:hotelId/support",
    destination: `/hotel/${hashReplacer}/support`,
  },
];

const oldToNew = rewrites.map((item) => ({
  source: `${item.destination}`,
  destination: item.source,
}));

const getIframeSource = ({
  pathname,
  rewrites: someRewrites,
}: {
  pathname: string;
  rewrites: { source: string; destination: string }[];
}) => {
  return resolveRewrites(pathname, [], "", someRewrites, {}, (p) => p);
};

const AngularFrame: FC<{ legacyPath?: string }> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.warn(location.pathname);
  const src = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_HSV4_HOST}${getIframeSource({
      pathname: location.pathname,
      rewrites,
    }).replace(hashReplacer, hash)}`;
  }, [location.pathname]);

  return (
    <IframeResizer
      src={src}
      name="frame"
      title="HotelSpider v4 Extranet"
      style={{
        width: "1px",
        minWidth: "100%",
        minHeight: "900px",
      }}
      checkOrigin={false}
      sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation"
      onMessage={({ message }) => {
        const { action, payload } = JSON.parse(message);
        switch (action) {
          case "hashchange": {
            const newURL = payload?.newURL;
            if (newURL) {
              const newURLInstance = new URL(newURL);
              const newIframeSrc = getIframeSource({
                pathname: newURLInstance.href
                  .replace(newURLInstance.origin, "")
                  .replace(`/hotel/${hash}`, `/hotel/${params.hotelId}`),
                rewrites: oldToNew.map((item) => ({
                  ...item,
                  source: item.source.replace(
                    `/hotel/${hashReplacer}`,
                    `/hotel/:hotelId`,
                  ),
                })),
              });
              if (newIframeSrc !== window.location.pathname) {
                navigate(newIframeSrc);
              }
            }
            break;
          }

          default:
            break;
        }
      }}
    />
  );
};

export default AngularFrame;

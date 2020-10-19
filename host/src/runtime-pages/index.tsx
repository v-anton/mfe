import dynamic from "next/dynamic";
import { loadComponent } from "../utils/common";

const loadable = loadComponent("hotelpackages_service_frontend", "./app");

export const PackagesPage = dynamic(loadable);

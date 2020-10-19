import dynamic from "next/dynamic";

const AsyncApp = dynamic(() => import("../app"), { ssr: false });

export default AsyncApp;

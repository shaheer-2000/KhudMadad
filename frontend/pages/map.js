import dynamic from "next/dynamic";

const Map = dynamic(() => import("../src/components/Map"), {
    ssr: false,
});
export default Map;

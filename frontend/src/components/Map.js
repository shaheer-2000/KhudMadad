import * as react from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constant";
import useGeoLocation from "react-hook-geolocation";
import dynamic from "next/dynamic";
import StyledAppBar from "./AppBar";

export default function Map() {
    const center = [];

    const items = JSON.parse(
        localStorage.getItem("clusters")
    )[0].clusterReports.map((r) => ({
        latitude: r.report.latitude,
        longitude: r.report.longitude,
    }));

    console.log(items);

    const [Center, setCenter] = react.useState([]);
    const [markers, setMarker] = react.useState([]);
    const [showMap, setShowMap] = react.useState(false);

    const position = [24.8614622, 67.00993879999999];

    const getCluster = async () => {
        const token = localStorage.getItem("token");
        let result = await fetch(
            `https://khudmadad.up.railway.app/clusters?latitude=${location.latitude}&longitude=${location.longitude}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        result = await result.json();
        setMarker(result);
    };
    //setTimeout(()=>{
    const location = useGeoLocation();

    function getLocation() {
        center.push(location.latitude);
        center.push(location.longitude);

        setCenter(center);
        setShowMap(true);
    }

    react.useEffect(() => {
        setTimeout(() => {
            getLocation();
        }, 2000);
    });

    //  setCenter([location.coordinates.lat,location.coordinates.lng])

    return (
        <>
            <StyledAppBar title="Map" />
            <div className="flex justify-center items-center h-screen">
                {showMap && (
                    <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={11}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {items && (
                            <>
                                {items.map(({ latitude, longitude }) => (
                                    <Marker
                                        position={[latitude, longitude]}
                                        icon={icon}
                                    ></Marker>
                                ))}
                            </>
                        )}
                    </MapContainer>
                )}
            </div>
        </>
    );
}

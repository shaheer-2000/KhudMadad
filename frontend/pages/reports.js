import axios from "axios";
import Box from "@mui/material/Box";
import ReportCards from "../src/components/ReportCards";
import StyledAppBar from "../src/components/AppBar";
import { useEffect, useState } from "react";

export default function Reports() {
    const [clusters, setClusters] = useState("");

    useEffect(() => {
        let instance = axios.create({
            baseURL: "https://khudmadad.up.railway.app",
            headers: {
                post: {
                    "Content-Type": "application/json",
                },
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        async function fetchUser() {
            try {
                let res = await instance.get(`/users/shaheer`);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();

        async function fetchCluster() {
            try {
                let res = await instance.get(
                    `/clusters?latitude=${localStorage.getItem(
                        "lat"
                    )}&longitude=${localStorage.getItem("long")}`
                );

                setClusters(res.data);
                console.log(re.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCluster();

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
        getLocation();
    }, []);

    function showPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}
        >
            <StyledAppBar title="Reports" />
            <Box>
                <ReportCards clusters={clusters} />
            </Box>
        </Box>
    );
}

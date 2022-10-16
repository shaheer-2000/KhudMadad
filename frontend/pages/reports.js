import axios from "axios";
import Box from "@mui/material/Box";
import ReportCards from "../src/components/ReportCards";
import StyledAppBar from "../src/components/AppBar";
import { useEffect } from "react";

export default function Reports() {
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
    }, []);

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
                <ReportCards />
            </Box>
        </Box>
    );
}

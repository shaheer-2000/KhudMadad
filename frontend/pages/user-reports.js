import Box from "@mui/material/Box";
import ReportCards from "../src/components/ReportCards";
import StyledAppBar from "../src/components/AppBar";
import { useEffect, useState } from "react";

export default function Reports() {
    const [userId, setUserId] = useState();
    const [title, setTitle] = useState("");

    useEffect(() => {
        setUserId(JSON.parse(localStorage.getItem("userId")));
        setTitle(localStorage.getItem("reporter"));
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
            <StyledAppBar title={title} />
            <Box>
                <ReportCards />
            </Box>
        </Box>
    );
}

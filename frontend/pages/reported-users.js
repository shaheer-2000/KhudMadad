import { Box } from "@mui/material";
import StyledAppBar from "../src/components/AppBar";
import UserCards from "../src/components/UserCards";

export default function UserReports() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
            <StyledAppBar title="Reported Users" />
            <Box>
                <UserCards />
            </Box>
        </Box>
    );
}

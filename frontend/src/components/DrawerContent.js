import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import HeadingFont from "../theme/Font";
import { GreyOutlinedButton, GreyTextButton } from "./StyledButton";
import TableRowsIcon from "@mui/icons-material/TableRows";
import MapIcon from "@mui/icons-material/Map";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function DrawerContent() {
    const router = useRouter();

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <ThemeProvider theme={HeadingFont}>
                    <Typography
                        sx={{
                            marginBottom: "16px",
                            paddingX: "16px",
                            paddingY: "7px",
                            color: "white",
                            backgroundColor: "#000",
                            boxShadow: "0 0 12px #424242",
                            textAlign: "center",
                            fontSize: "28px",
                            fontWeight: "bold",
                        }}
                    >
                        KhudMadad
                    </Typography>
                </ThemeProvider>
                <GreyTextButton
                    onClick={() => router.push("/reports")}
                    sx={{
                        paddingX: "24px",
                        fontSize: "18px",
                        textTransform: "uppercase",
                    }}
                    style={{ justifyContent: "flex-start" }}
                    startIcon={<TableRowsIcon />}
                >
                    Reports
                </GreyTextButton>
                <GreyTextButton
                    onClick={() => router.push("/reports")}
                    sx={{
                        paddingX: "24px",
                        fontSize: "18px",
                        textTransform: "uppercase",
                    }}
                    style={{ justifyContent: "flex-start" }}
                    startIcon={<MapIcon />}
                >
                    Map
                </GreyTextButton>
                <GreyTextButton
                    onClick={() => router.push("/user-reports")}
                    sx={{
                        paddingX: "24px",
                        fontSize: "18px",
                        textTransform: "uppercase",
                    }}
                    style={{ justifyContent: "flex-start" }}
                    startIcon={<PostAddIcon />}
                >
                    My Posts
                </GreyTextButton>
            </Box>
            <Box
                sx={{
                    marginBottom: "12px",
                    paddingX: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <GreyOutlinedButton
                    onClick={() => router.replace("/")}
                    fullWidth
                >
                    Logout
                </GreyOutlinedButton>
            </Box>
        </Box>
    );
}

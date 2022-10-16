import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { GreyTextButton } from "./StyledButton";

export default function UserCards() {
    const [users, setUsers] = useState([
        { id: 1, name: "Naveed" },
        { id: 2, name: "Ali" },
        { id: 3, name: "Shaheer" },
    ]);

    let router = useRouter();

    return (
        <Box
            sx={{
                width: "100vw",
                paddingX: "12px",
                backgroundColor: "#efefef",
                position: "absolute",
                top: "62px",
            }}
        >
            {users?.map((user, index) => (
                <Card
                    key={index}
                    sx={{
                        marginY: "12px",
                        position: "relative",
                    }}
                >
                    <CardContent sx={{ paddingBottom: "0" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography>{user.name}</Typography>
                            <GreyTextButton
                                onClick={() => {
                                    localStorage.setItem("reporterId", user.id);
                                    localStorage.setItem("reporter", user.name);
                                    router.push("/user-reports");
                                }}
                                sx={{
                                    color: "#424242",
                                    textDecoration: "underline",
                                }}
                            >
                                View all reports
                            </GreyTextButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

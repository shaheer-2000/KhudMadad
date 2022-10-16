import axios from "axios";
import { Box, ThemeProvider, Typography } from "@mui/material";
import {
    OrangeContainedButton,
    GreyTextButton,
} from "../src/components/StyledButton";
import { useRouter } from "next/router";
import GreyTextField from "../src/components/StyledTextField";
import HeadingFont from "../src/theme/Font";
import { useState, useEffect, forwardRef } from "react";

let instance = axios.create({
    baseURL: "https://khudmadad.up.railway.app",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export default function Landing() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let router = useRouter();

    const handleSubmit = async () => {
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if ((username == "") | (password == "")) {
            alert("Enter username and password!");
            return;
        } else {
            try {
                let res = await instance.post("/login", {
                    username,
                    password,
                });
                console.log(res);

                localStorage.setItem("username", username);
                localStorage.setItem("token", res.data.token);

                router.replace("/reports");
            } catch (e) {}
        }
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh" }}>
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#FFFFFF",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='.5' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23424242'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23424242'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(15.3) translate(-934.64 -700.98)'%3E%3Cg fill='%23424242'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    zIndex: "0",
                }}
            ></Box>
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                }}
            >
                <ThemeProvider theme={HeadingFont}>
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: "122px",
                            color: "#424242",
                            backgroundColor: "white",
                            borderRadius: "12px",
                            fontSize: "38px",
                            fontWeight: "bold",
                        }}
                    >
                        KhudMadad
                    </Typography>
                </ThemeProvider>
            </Box>
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    paddingX: "42px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <GreyTextField
                    id="username"
                    type="text"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                />
                <GreyTextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginTop: "12px" }}
                />
                <OrangeContainedButton
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ marginTop: "12px" }}
                >
                    Login
                </OrangeContainedButton>
                <GreyTextButton fullWidth sx={{ marginTop: "12px" }}>
                    Signup
                </GreyTextButton>
            </Box>
            <Box
                sx={{
                    width: "100vw",
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "0",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "#777",
                        fontSize: "14px",
                    }}
                >
                    HackFest | 2022
                </Typography>
            </Box>
        </Box>
    );
}

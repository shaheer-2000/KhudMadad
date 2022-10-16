import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import DrawerContent from "./DrawerContent";
import HeadingFont from "../theme/Font";
import { ThemeProvider } from "@mui/material";

export default function StyledAppBar({ title }) {
    const [openDrawer, setDrawerOpen] = React.useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ background: "#000" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ThemeProvider theme={HeadingFont}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
            <Drawer
                open={openDrawer}
                onBackdropClick={() => setDrawerOpen(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: "70vw",
                    },
                }}
            >
                <DrawerContent />
            </Drawer>
        </Box>
    );
}

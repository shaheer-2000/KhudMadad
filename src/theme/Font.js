import { createTheme } from "@mui/material";
import { purple, orange } from "@mui/material/colors";

const HeadingFont = createTheme({
    typography: {
        fontFamily: ["Syne", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: purple[600],
        },
        secondary: {
            main: orange[600],
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

export default HeadingFont;

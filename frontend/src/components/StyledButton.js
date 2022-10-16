import { Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const GreyTextButton = styled(Button)(({ theme }) => ({
    color: grey[700],
    backgroundColor: "transparent",
    textTransform: "capitalize",
}));

const OrangeContainedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[800]),
    backgroundImage: `linear-gradient(90deg, ${grey[800]}, ${grey[900]})`,
    "&:hover": {
        backgroundImage: `linear-gradient(90deg, ${grey[800]}, ${grey[900]})`,
    },
    textTransform: "capitalize",
}));

const GreyOutlinedButton = styled(Button)(({ theme }) => ({
    color: grey[700],
    outline: "none",
    backgroundColor: "transparent",
    backdropFilter: "blur(10px)",
    border: `1px solid ${grey[700]}`,
    "&:hover": {
        backgroundColor: "#ddd",
        outline: "none",
        border: `1px solid ${grey[800]}`,
    },
    textTransform: "capitalize",
}));

export { GreyTextButton, OrangeContainedButton, GreyOutlinedButton };

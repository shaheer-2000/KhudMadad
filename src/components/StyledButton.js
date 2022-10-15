import { Button } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const GreyTextButton = styled(Button)(({ theme }) => ({
    color: grey[700],
    backgroundColor: "transparent",
    textTransform: "capitalize",
}));

const OrangeContainedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[700]),
    backgroundImage: `linear-gradient(90deg, ${orange[600]}, ${orange[700]})`,
    "&:hover": {
        backgroundImage: `linear-gradient(90deg, ${orange[700]}, ${orange[800]})`,
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
        backgroundColor: "#6a1b9a20",
        outline: "none",
        border: `1px solid ${grey[800]}`,
    },
    textTransform: "capitalize",
}));

export { GreyTextButton, OrangeContainedButton, GreyOutlinedButton };

import { styled, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const GreyTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: grey[600],
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "divider",
        },
        "&:hover fieldset": {
            borderColor: grey[600],
        },
        "&.Mui-focused fieldset": {
            borderColor: grey[600],
        },
    },
    backdropFilter: "blur(3px)",
});

export default GreyTextField;

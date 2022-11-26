import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#03e9f4"
  },
  "& input": {
    color: "gray"
  },
  "& label": {
    color: "#03e9f4"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#03e9f4"
  },
  "& .MuiInput-underline": {
    borderBottomColor: "#03e9f4"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#03e9f4"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#03e9f4"
    }
  }
});
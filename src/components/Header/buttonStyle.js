import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

export const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "\"Segoe UI\"",
    "Roboto",
    "\"Helvetica Neue\"",
    "Arial",
    "sans-serif",
    "\"Apple Color Emoji\"",
    "\"Segoe UI Emoji\"",
    "\"Segoe UI Symbol\""
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf"
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
  }
});

export const ColorButton = styled(Button)(({ theme }) => ({
  //color: theme.palette.getContrastText(purple[500]),
  color: "#03e9f4",
  border: "1px solid #03e9f4",
  //backgroundColor: purple[500],
  //backgroundColor: 'linear-gradient(#141e30,#243b55)',
  "&:hover": {
    // backgroundColor: purple[700]
    color: "#fff",
    borderColor: "#03e9f4",
    boxShadow: "0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,0 0 100px #03e9f4"
  }

}));
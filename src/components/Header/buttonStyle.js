import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";

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
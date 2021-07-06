import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#828282",
    },
    secondary: {
      main: "#ff8f34",
      contrastText: "white",
    },
    error: {
      main: "#ed4444",
      contrastText: "white",
      light: "#ed5e5e",
    },
    success: {
      main: "#27AE60",
      contrastText: "white",
      light: "#2cc96b",
    },

    background: {
      default: "#4F4F4F",
      paper: "#333333",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeightRegular: 200,
    allVariants: {
      color: "white",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 100px #333333 inset",
          "-webkit-text-fill-color": "#fff",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;

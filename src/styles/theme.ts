import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#969688",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#E2D4B7",
      contrastText: "#424242",
    },
    info: {
      main: "#4A5859",
      contrastText: "#E2D4B7",
    },
    background: {
      default: "#4A5859",
      paper: "#FAFAFA",
    },
    text: {
      primary: "#4A5859",
      secondary: "#E2D4B7",
    },
    error: {
      main: "#D32F2F",
    },
    grey: {
      500: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#4A5859",
          color: "#5D4037",
          "&:hover": {
            backgroundColor: "#969688",
          },
        },
        root: {
          borderRadius: "6px",
          height: "42px",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            transform: "scale(1.1)",
            transition: "transform 0.2s",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: "#5D4037",
          backgroundColor: "#EAE8E3",
          '&[data-focus="true"]': {
            backgroundColor: "#EFEBE9",
          },
          '&[aria-selected="true"]': {
            backgroundColor: "#EAE8E3",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            "&:-webkit-autofill": {
              WebkitTextFillColor: "#5D4037",
              WebkitBoxShadow: "0 0 0 100px #EAE8E3 inset",
            },
          },
        },
      },
    },
  },
});

export default theme;

import { ThemeProvider } from "@mui/material/styles";
import {mdTheme} from "../layouts/Dashboard";
// import { createMuiTheme } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/core/styles";

function MockTheme({ children }: any) {
//   const theme = createTheme({ mdTheme });
  return <ThemeProvider theme={mdTheme}>{children}</ThemeProvider>;
}

export default MockTheme;

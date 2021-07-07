import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/muiTheme";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
);

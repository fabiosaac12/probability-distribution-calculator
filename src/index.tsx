import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Poisson } from "./components/Poisson";
import { Exponential } from "./components/Exponential";
import { WaitingLinesOneServer } from "./components/WaitingLinesOneServer";
import { WaitingLinesMultipleServer } from "./components/WaitingLinesMultipleServer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const router = createBrowserRouter([
  {
    path: "/poisson",
    element: <Poisson />,
  },
  {
    path: "/exponential",
    element: <Exponential />,
  },
  {
    path: "/waiting-lines-one-server",
    element: <WaitingLinesOneServer />,
  },
  {
    path: "/waiting-lines-multiple-server",
    element: <WaitingLinesMultipleServer />,
  },
  {
    path: "*",
    element: <Navigate to="/poisson" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

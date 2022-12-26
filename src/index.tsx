import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/contact";
import ErrorPage from "./error-page";
import styled, { createGlobalStyle } from "styled-components";

// Called once somewhere in the root of the app

import { init } from "@noriginmedia/norigin-spatial-navigation";

init({
  // debug: true,
  // visualDebug: true,
});

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // element: <App />,
    // element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

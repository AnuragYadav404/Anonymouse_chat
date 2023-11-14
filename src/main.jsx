import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import LoginPage from "./components/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  { path: "/accounts/login", element: <LoginPage /> },
  { path: "/accounts/logout", element: <h1>logout Page!!</h1> },
  { path: "/accounts/signup", element: <h1>signup Page!!</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

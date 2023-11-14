import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import LoginPage from "./components/LoginPage.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import LogoutPage from "./components/LogoutPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import Chat from "./Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "accounts/login", element: <LoginPage /> },
      { path: "accounts/logout", element: <LogoutPage /> },
      { path: "accounts/signup", element: <SignupPage /> },
      { path: "accounts/chat", element: <Chat /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

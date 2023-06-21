import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NoteProvider from "./context/NoteContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <LoginProvider>
        <ThemeProvider>
            <NoteProvider>
                <RouterProvider router={router} />
            </NoteProvider>
        </ThemeProvider>
    </LoginProvider>
);

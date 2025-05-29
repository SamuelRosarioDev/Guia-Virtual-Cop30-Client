import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom"

import { Register } from "../pages/Register/Users";
import { Login } from "../pages/Login";

export const RoutesSystem = createBrowserRouter([
    { path: "/login", element: createElement(Login) },
    { path: "/register", element: createElement(Register) }
])
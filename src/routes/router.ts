import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom"

import { Login } from "../pages/Login";
import { TraderRegister } from "../pages/Register/Traders";
import { Register } from "../pages/Register/Users";

export const RoutesSystem = createBrowserRouter([
    { path: "/log-in", element: createElement(Login) },
    { path: "/register", element: createElement(Register) },
    { path: "/register/traders", element: createElement(TraderRegister) },
])
import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom"

import { Login } from "../pages/Login";
import { TraderRegister } from "../pages/Register/Traders";
import { Register } from "../pages/Register/Users";
import { Home } from "../pages/Home";
import { HotelierRegister } from "../pages/Register/Hoteliers";
import { Dashboard } from "../pages/Dashboard";
import { Profile } from "../pages/Profile";
import { MapPoints } from "../pages/MapPoints";

export const RoutesSystem = createBrowserRouter([
    { path: "/log-in", element: createElement(Login) },
    { path: "/register", element: createElement(Register) },
    { path: "/register/trader", element: createElement(TraderRegister) },
    { path: "/register/hotelier", element: createElement(HotelierRegister) },

    { path: "/", element: createElement(Home) },
    { path: "/dashboard", element: createElement(Dashboard) },
    { path: "/Profile", element: createElement(Profile) },
    { path: "/mappoints", element: createElement(MapPoints) }
])
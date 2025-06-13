import { createElement } from "react";
import { createBrowserRouter } from "react-router-dom"

import { Login } from "../pages/Client/Login";
import { TraderRegister } from "../pages/Client/Register/Traders";
import { Register } from "../pages/Client/Register/Users";
import { Home } from "../pages/Client/Home";
import { HotelierRegister } from "../pages/Client/Register/Hoteliers";
import { Dashboard } from "../pages/Client/Dashboard";
import { Profile } from "../pages/Client/Profile";
import { MapPoints } from "../pages/Client/MapPoints";
import { DashboardAdmin } from "../pages/Admin/Dashboard";

export const RoutesSystem = createBrowserRouter([
    { path: "/log-in", element: createElement(Login) },
    { path: "/register", element: createElement(Register) },
    { path: "/register/trader", element: createElement(TraderRegister) },
    { path: "/register/hotelier", element: createElement(HotelierRegister) },

    { path: "/", element: createElement(Home) },
    { path: "/dashboard", element: createElement(Dashboard) },
    { path: "/Profile", element: createElement(Profile) },
    { path: "/mappoints", element: createElement(MapPoints) },

    {path: "/admin/dashboard", element: createElement(DashboardAdmin)}
])